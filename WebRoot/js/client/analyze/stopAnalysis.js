/**
 * 落脚点分析入口
 */
Ext.ns("Jinpeng.stopAnalysis");

var viewPortObj = null;
var downPictureWindow = null;

var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
var gisHeight = hh - 60;
var kwin1 =new Jinpeng.widget.GeneralWindow({
	id: "mywin1",
	title: "",
	constrain : true,
	constrainHeader : true,
	width: ww * 2 / 3,
	height: hh * 3 / 4,
	layout: "fit",
	//autoShow: true,
	closeAction:'hide',
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/Big_Data/zTree/demo/cn/excheck/multiSelectTreeGzsInc.html"></iframe>'
});

var setKKValue=function(data){
	//alert(data.org_type);
	var passport;
	passport = data.id;
	//alert(data['org_type']);
	if(data.org_type == "2" ){ //如果是卡口，卡口编号前三位要去掉
		passport = (data.id).substring(3);
	}
	Ext.getCmp('passport').setValue(passport);
	Ext.getCmp('passStation').setValue(data.text);
	Ext.getCmp('mywin1').hide();
};

Ext.onReady(function() {
	var hh = Ext.getBody().getHeight() - 120;
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport({
		layout : 'border',
		items : [{
				// north区域表单
				region : 'north',
				border : false,
				height : 120,
				// 自定标签
				xtype : 'stopAnalysisFormPanel'
			},{
			region : 'center',
			layout : 'column',
			items : [{
				columnWidth : 0.35,
				xtype : 'stopAnalysisDataPanel'
			}, {
				columnWidth : 0.65,
				id : 'gisShow',
				xtype : 'panel',
				items : [{
					html : "<iframe id='carDisIframe' src='http://" + ipAdress + "/PGISViewer/PGISViewer.html' width='100%' height='" + hh + "' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
				}]
			}]
		} ]
	});
});

var alarmSearchStore;
Jinpeng.stopAnalysis.StopAnalysisPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'stopAnalysisPanel',
	border : false,
	frame : true,
	height :  Ext.getBody().getHeight() - 120,
	pageSize : 15,
	initComponent : function() {
		// 所需数据
		alarmSearchStore = new Ext.data.JsonStore({
			url : rootpath + "//analyStopCar/doAnalyStopCar.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			remoteSort : true,
			fields : [ {
				name : 'xxbh'
			}, {
				name : 'jgsj'
			}, {
				name : 'kkbh'
			}, {
				name : 'kkmc'
			}, {
				name : 'hphm'
			}, {
				name : 'startCount'
			}, {
				name : 'stopCount'
			}, {
				name : 'cwhpys'
				}]
		});
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this,{
			store : alarmSearchStore,
			cm : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
						new Ext.ux.grid.PagingRowNumberer({width : 40}),
						sm,
						{
//							header : '卡口编号',
//							dataIndex : 'kkbh'
//						},{
							header : '卡口名称',
							dataIndex : 'kkmc'
						},{
							header : '出行次数',
							dataIndex : 'startCount',
							renderer: function(val, metaData, record) {
								var str = "";
								var kkmc = record.data.kkmc;
								var kkbh = record.data.kkbh;
								str = "<a href='#' onclick=\"showDetail('"+kkmc+"','" + kkbh +  "','start')\">" + val + "</a>";
								return str;
							}
						},{
							header : '落脚次数',
							dataIndex : 'stopCount',
							renderer: function(val, metaData, record) {
								var str = "";
								var kkmc = record.data.kkmc;
								var kkbh = record.data.kkbh;
								str = "<a href='#' onclick=\"showDetail('"+kkmc+"','" + kkbh +  "','stop')\">" + val + "</a>";
								return str;
							}
						} ]
			}),
			selModel : sm,
			bbar : new Jinpeng.widget.PagingToolbar( {
				id : 'PigPagingToolbarCar',
				store : alarmSearchStore,
				//displayInfo : true,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			}),
			listeners : {
//				rowclick : function(grid, rowIndex, e) {
//					var data = grid.store.getAt(rowIndex);
//					var kkbh = data.get("kkbh");
//					if (kkbh != null && kkbh != '') {
//						window.carDisIframe.GIS_Clear();//清除选择
//						window.carDisIframe.GIS_ZoomTo(kkbh);
//					}
//				}
				rowdblclick : function(grid, rowIndex, e ) {
				var data = grid.store.getAt(rowIndex);
				var kkbh = data.get("kkbh");
					if (kkbh != null && kkbh != '') {
						window.carDisIframe.GIS_Clear();//清除选择
						window.carDisIframe.GIS_ZoomTo(kkbh);
					}
				}
			}
			
		});
		Jinpeng.stopAnalysis.StopAnalysisPanel.superclass.initComponent.apply(this);
	}
});

/**
 * north区域表单部份
 */
Jinpeng.stopAnalysis.StopAnalysisFormPanel = Ext.extend(Ext.Panel,{
	initComponent : function() {
		var endTime = Date.parseDate(Ext.util.Format.date(
				new Date(), 'Y-m-d')
				+ " " + "23:59:59", 'Y-m-d H:i:s');
		//车牌号
		var carNumStore = new Ext.data.JsonStore({
			url : rootpath
					+ "/dictionary/HPHMDictsInComboHPHM.mvc?code=LicPlate",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false
		});
		//车辆品牌
		var carBrandStore = new Ext.data.JsonStore({
			url : rootpath
					+ "/dictionary/jsonCarBrandInCombo.mvc",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false           
		});
		//号牌颜色
		var carNumColorStore = new Ext.data.JsonStore({
			url : rootpath
					+ "/dictionary/jsonDictsInCombo.mvc?code=LicPlateColor",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false
		});
		Ext.apply(this,{
			items : [ {
				// form表单
				xtype : 'form',
				id : 'searchAlarmForm',
				//labelAlign : 'left',
				border : false,
				frame : true,
				cls : 'blue-button-ct',
				layout : 'table',
				defaults : {
					layout : 'form',
					//统一宽度
					width : 320
				},
				layoutConfig : {
					columns : 3
				},

				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
						// 第一行
					items :[{
						xtype : 'textfield',
						id : 'hphm',
						name : 'hphm',
						fieldLabel : '车牌号码',
						allowBlank : false,
						anchor : '94%',
						emptyText : '请输入车牌'
						}]
						},{
							colspan:2,
							items : [ {
								xtype : 'textfield',
								id : 'stopTimeLen',
								fieldLabel : '落脚时长(小时)',
								name : 'stopTimeLen',
								allowBlank : false,
								value:1,
								width : 185,
								emptyText : '请输入落脚时长',
								blankText : "请输入落脚时长"
							}]						
						},{
							items : [ {
								xtype : 'textfield',
								name : 'startTime',
								id : 'startdate',
								allowBlank : false,
					            editable : false,
							    fieldLabel : '开始时间',
								value : new Date().format('Y-m-d') + ' 00:00:00',
								anchor : '94%',
								width:145,
								style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
								listeners  : {   
					            	'focus':function(field){  
										var endTime = Ext.util.Format.date(
												new Date(), 'Y-m-d H:i:s');
										var enddate = Ext.getCmp("enddate").getValue();
										//  日期时间的默认参数      
									    var defaultDateTimeParams = new function()   
									    {   
									        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
									        this.startDate  = endTime;    //  开始时间   
									        this.maxDate = enddate;
									        this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';  //  格式化时间   
									        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
									        this.alwaysUseStartDate = false;           //  默认使用初始时间   
									    };  
					                    WdatePicker(defaultDateTimeParams);   
					                    field.blur();
					             	}   
								}
							} ]
						},
						{
							items : [ {
								xtype : 'textfield',
								fieldLabel : '结束时间',
								allowBlank : false,
								editable : false,
								name : 'endTime',
								id : 'enddate',
								value : new Date().format('Y-m-d') + ' 23:59:59',
								anchor : '94%',
								style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center',width:100}, 
								listeners  : {   
					            	'focus':function(field){  
										var endTime = Ext.util.Format.date(
												new Date(), 'Y-m-d H:i:s');
										var startdate = Ext.getCmp("startdate").getValue();
										//  日期时间的默认参数      
									    var defaultDateTimeParams = new function()   
									    {   
									        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
									        this.startDate  = endTime;    //  开始时间   
									        this.minDate = startdate;
									        this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';  //  格式化时间   
									        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
									        this.alwaysUseStartDate = false;           //  默认使用初始时间   
									    };  
					                    WdatePicker(defaultDateTimeParams);   
					                    field.blur();
					             	}   
								} 
							} ]
						},{
							items : [ {
								xtype : 'jplovcombo',
								id : 'hpys',
								name : 'hpys',
								fieldLabel : '号牌颜色',
								store : carNumColorStore,
								mode : 'local',
								emptyText : '全部',
								autoSelect : true,
								showSelectAll: true,
								triggerAction : 'all',
								valueField : 'id',
								displayField : 'text',
								anchor : '94%'
							} ]
						},{
							items: [ {
					        	xtype : 'jplovcombo',
								id : 'carBrand',
								name:'carBrand',
								emptyText:'请选择车辆品牌',
								fieldLabel: '品牌',
								store: carBrandStore,
								editable : false,
								selectOnFocus : true,
								forceSelection : true,
								displayField : 'text',
								valueField:'id',
								anchor : '94%',
								mode : 'local',
								triggerAction : 'all',
								listeners : {
								     select : function(combo, record2, index) {
										var values = Ext.getCmp('carBrand').getValue();
										if (values == '') {
											Ext.getCmp('carType').setDisabled(true);
											return;
										}
										var carTypeMode = new Ext.data.JsonStore({
											url : encodeURI(rootpath+"/dictionary/findCarTypeCombox.mvc?carBrand=" + values),
											root : "data",
											fields : [ 'ID', 'TEXT' ],
											autoLoad:false,
											autoSync:true
										});
										carTypeMode.load({
										    scope: this,
											    callback: function(records, operation, success) {
											        var listRecord = new Array();
													if(carTypeMode instanceof Ext.data.Store){  
														carTypeMode.each(function(result){  
												        	listRecord.push(result.data['TEXT']);  
												        }); 
													 }
													Ext.getCmp('carType').clearValue();
													Ext.getCmp('carYear').clearValue();
													Ext.getCmp('carType').getStore().loadData(listRecord);
											    }
										});
										Ext.getCmp('carType').setDisabled(false);
								     }
								}
					        }]
						}, {
							items: [ {
					        	xtype : 'jplovcombo',
								id : 'carType',
								name:'carType',
								fieldLabel: '型号',
								emptyText:'请选择车辆型号',
								editable : false,
								selectOnFocus : true,
								forceSelection : true,
								store: [],
								disabled : true,
								anchor : '94%',
								displayField : 'TEXT',
								valueField:'ID',
								mode : 'local',
								triggerAction : 'all',
								listeners : {
								     select : function(combo, record, index) {
										var values = Ext.getCmp('carType').getValue();
										if (values == '') {
											Ext.getCmp('carYear').setDisabled(true);
											return;
										}
										var carYearStore = new Ext.data.JsonStore({
											url : encodeURI(rootpath+"/dictionary/findCarYearCombox.mvc?carType="+values),
											root : "data",
											fields : [ 'ID', 'TEXT' ],
											autoLoad:false,
											autoSync:true
										});
										carYearStore.load({
										    scope: this,
											    callback: function(records, operation, success) {
											        var yearRecord = new Array();
													if(carYearStore instanceof Ext.data.Store){  
														carYearStore.each(function(result){  
												        	yearRecord.push(result.data['TEXT']);  
												        }); 
													 }
													Ext.getCmp('carYear').clearValue();
													Ext.getCmp('carYear').getStore().loadData(yearRecord);
											    }
										});
										Ext.getCmp('carYear').setDisabled(false);
								     }
								}
					        }]
						}, {
							items: [ {
					        	xtype : 'jplovcombo',
								id : 'carYear',
								name:'carYear',
								fieldLabel: '年款',
								anchor : '94%',
								editable : false,
								disabled : true,
								selectOnFocus : true,
								forceSelection : true,
								emptyText:'请选择车辆年款',
								store: [],
								displayField : 'TEXT',
								valueField:'ID',
								mode : 'local',
								triggerAction : 'all'
					        }]
						},{
							items :[{
								xtype: 'compositefield',
								//width : 330,
								anchor : '94%',
								items : [ {
									flex : 0.5,
									xtype : 'textfield',
									id : 'outHTime',
									fieldLabel : '界定出行时间',
									name : 'outHTime',
									allowBlank : true,
									width : 90,
									maxValue:24,
									allowNegative :false,
									emptyText : "小时"
								},{
									flex : 0.5,
									xtype : 'textfield',
									id : 'outMTime',
									name : 'outMTime',
									allowBlank : true,
									width : 90,
									maxValue:60,
									allowNegative :false,
									emptyText : '分钟'
								}]
							}]
						},{
							items :[{
								xtype: 'compositefield',
								//width : 330,
								anchor : '94%',
								items : [ {
									flex : 0.5,
									xtype : 'textfield',
									id : 'inHTime',
									fieldLabel : '界定返回时间',
									name : 'inHTime',
									allowBlank : true,
									width : 90,
									emptyText : "小时"
								},{
									flex : 0.5,
									xtype : 'textfield',
									id : 'inMTime',
									name : 'inMTime',
									allowBlank : true,
									width : 90,
									emptyText : '分钟'
								}]
							}]
						},{
							bodyStyle : 'padding-left:10px',
							xtype : 'compositefield',
							items : [{
								flex : 31,
								xtype : 'button',
								text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
								id : "searchBut",
								handler : this.alarmSearch
							},{
								flex : 31,
								xtype : 'button',
								text : '&nbsp;&nbsp;&nbsp;导出&nbsp;&nbsp;&nbsp;',
								id : "exportBut",
								handler : this.doExport
							},{
								flex : 31,
								xtype : 'button',
								id : "resetBut",
								text : '&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;',
								handler : this.resetMethod
							}]
						},{
							items : [{
								xtype : 'hidden',
								id : 'passport'
							}]
						}], 
						buttons: [{
				            text: 'test',
				            handler: function(){
							}
				        }]
			} ],
			listeners : {
				afterrender : function() {
					/*车牌省Store*/
					carNumStore.load();
					/**
					 * 车辆品牌加载
					 */
					carBrandStore.load();
					/**
					 * 号牌颜色加载
					 */
					carNumColorStore.load();
				}
			}
		});
		Jinpeng.stopAnalysis.StopAnalysisFormPanel.superclass.initComponent.apply(this);
	},
	/* 响应查询按钮 */
	alarmSearch : function() {
		var form = Ext.getCmp('searchAlarmForm');
		if (form.getForm().isValid()) {
			var grid = Ext.getCmp('stopAnalysisPanel');
			grid.store.baseParams = {};// 重置
			/** 将参数传入后台 */
			var baseparams = {
				"hphm" : Ext.getCmp('hphm').getValue(),
				"startdate" : Ext.getCmp('startdate').getValue(),
				"enddate" : Ext.getCmp('enddate').getValue(),
				"stopTimeLen":Ext.getCmp('stopTimeLen').getValue(),
				"carBrand" : Ext.getCmp('carBrand').getValue(),
				"carType" : Ext.getCmp('carType').getValue(),
				"carYear" : Ext.getCmp('carYear').getValue(),
				"hpys" : Ext.getCmp('hpys').getValue()
			};
			grid.store.baseParams = baseparams;
			/*刷新选中*/
			this.publish("clearGridSelections",[]);
			grid.store.load({
				params : {
					'page.start' : 0,
					'page.limit' : 15
				}
			});
		}
	},
	doExport:function(){
		var config = {
			queryExportURL : rootpath + "//analyStopCar/doExportStopCar.mvc"
		};
		config.start = 0;
		config.limit = 1000;//默认最大导出1000条
		config.count = 1000; //默认最大导出1000条
		var param = "";
		var records = Ext.getCmp('stopAnalysisPanel').getSelectionModel().getSelections();
		if(records.length>0){
			param=getSelectNodeIds(records);
			config.queryCondition = param;
		}else{
			param = getPageParms();
			config.queryCondition = param.join("&");
		}
		var ExportHelper = new Jinpeng.HistoryExportHelper(config);
		ExportHelper.startExport(true);
	},
	resetMethod :  function() {
		Ext.getCmp('searchAlarmForm').getForm().reset();
	}
});

function getPageParms(){
/** 将参数传入后台 */
	var param = [];
	param[param.length] ="hphm=" + Ext.getCmp('hphm').getValue()
	param[param.length] ="startdate=" + Ext.getCmp('startdate').getValue()
	param[param.length] ="enddate=" + Ext.getCmp('enddate').getValue()
	param[param.length] ="stopTimeLen=" + Ext.getCmp('stopTimeLen').getValue()
	param[param.length] ="carBrand=" + Ext.getCmp('carBrand').getValue()
	param[param.length] ="carType=" + Ext.getCmp('carType').getValue()
	param[param.length] ="carYear=" + Ext.getCmp('carYear').getValue()
	param[param.length] ="hpys=" + Ext.getCmp('hpys').getValue()
	
	return param;
}
/**
 * 获取页面选项ID信息
 * @param records
 * @return
 */
function getSelectNodeIds(records){
	var kkbh="kkbh=";
	for ( var i = 0; i < records.length; i++) {
		var data =Ext.getCmp('stopAnalysisPanel').getSelectionModel().getSelections()[i] ;
		if(i==0){
			kkbh+=data.get('kkbh');
		}else{
			kkbh+=","+data.get('kkbh');
		}
	}
	return kkbh;
}

function showDetail(kkmc,kkbh,flag){
	var hphm=Ext.getCmp('hphm').getValue();
	var title=hphm+"在卡点("+kkmc+")的出行明细";
	if(flag=='stop'){
		title=hphm+"在卡点("+kkmc+")的落脚明细";
	}
	var mainParam={'kkbh' :kkbh,'flag' :flag,'title':title};
	var win = new Jinpeng.stopAnalyList.DetailWindow();
	win.init(mainParam);
	win.show();
	
}
Ext.reg('stopAnalysisFormPanel', Jinpeng.stopAnalysis.StopAnalysisFormPanel);
Ext.reg('stopAnalysisDataPanel', Jinpeng.stopAnalysis.StopAnalysisPanel);