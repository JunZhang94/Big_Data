/**
 * 隐匿车辆分析入口
 */
Ext.ns("Jinpeng.carHiddenAnalysis");

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
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport({
		layout : 'border',
		items : [{
				// north区域表单
					region : 'north',
					border : false,
					height : 95,
					// 自定标签
					xtype : 'carHiddenFormPanel'
			},{
			region : 'center',
			border : false,
			xtype : 'carHiddenDataPanel'
		} ]
	});
});


var alarmSearchStore;
Jinpeng.carHiddenAnalysis.CarHiddenAnalysisPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'carHiddenAnalysisPanel',
	border : false,
	frame : false,
	pageSize : 15,
	initComponent : function() {
		// 所需数据
		alarmSearchStore = new Ext.data.JsonStore({
			url : rootpath + "//carHiddenAnaly/doAnalyHiddenCar.mvc",
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
				name : 'beforeTimes'
			}, {
				name : 'afterTimes'
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
							header : '车牌号码',
							dataIndex : 'hphm',
							renderer: function(val, metaData, record) {
								var str = "";
								var counts = 10;
								if (val != '-' && val != '无车牌' && val != '无牌' && val != '车牌' && val != null && val != '—' && val != 'null') {
									str = "<a href='#' onclick=\"showCarPlace('" + val + "','" + counts + "')\">" + val + "</a>";
								} else {
									str = '无';
								}
								return str;
								//return '<font ext:qtip="'+val+'"><a href="#">'+ val+'</a></font>';
							}
						},{
							header : '潜伏期过车频度',
							dataIndex : 'beforeTimes'
						},{
							header : '逃逸期过车频度',
							dataIndex : 'afterTimes'
						},{
							header : '案发前抓拍时间',
							width : 180,
							dataIndex : 'jgsj'
						},{
							header : '案发前抓拍地点',
							dataIndex : 'kkmc'
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
			})
				
		});
		Jinpeng.carHiddenAnalysis.CarHiddenAnalysisPanel.superclass.initComponent.apply(this);
	}
});

/**
 * north区域表单部份
 */
Jinpeng.carHiddenAnalysis.CarHiddenAnalysisFormPanel = Ext.extend(Ext.Panel,{
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
					columns : 4
				},

				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
							items : [ {
								xtype : 'textfield',
								name : 'firstTime',
								id : 'firstTime',
								allowBlank : false,
					            editable : false,
							    fieldLabel : '潜伏开始时间',
								//value : new Date().format('Y-m-d') + ' 00:00:00',
							    value:new Date().add(Date.DAY, -1).format('Y-m-d')+' 00:00:00',
								anchor : '94%',
								width:145,
								style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
								listeners  : {   
					            	'focus':function(field){  
										var endTime = Ext.util.Format.date(
												new Date(), 'Y-m-d H:i:s');
										var firstTime = Ext.getCmp("firstTime").getValue();
										//  日期时间的默认参数      
									    var defaultDateTimeParams = new function()   
									    {   
									        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
									        this.firstTime  = endTime;    //  开始时间   
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
								xtype : 'textfield',
								name : 'secondTime',
								id : 'secondTime',
								allowBlank : false,
					            editable : false,
							    fieldLabel : '案发时间',
								value : new Date().format('Y-m-d') + ' 00:00:00',
								anchor : '94%',
								width:145,
								style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
								listeners  : {   
					            	'focus':function(field){  
										var endTime = Ext.util.Format.date(
												new Date(), 'Y-m-d H:i:s');
										var secondTime = Ext.getCmp("secondTime").getValue();
										//  日期时间的默认参数      
									    var defaultDateTimeParams = new function()   
									    {   
									        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
									        this.secondTime  = endTime;    //  开始时间   
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
								xtype : 'textfield',
								fieldLabel : '逃逸结束时间',
								allowBlank : false,
								editable : false,
								name : 'thirdTime',
								id : 'thirdTime',
								value : new Date().format('Y-m-d') + ' 23:59:59',
								anchor : '94%',
								style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center',width:100}, 
								listeners  : {   
					            	'focus':function(field){  
										var endTime = Ext.util.Format.date(
												new Date(), 'Y-m-d H:i:s');
										var thirdTime = Ext.getCmp("thirdTime").getValue();
										//  日期时间的默认参数      
									    var defaultDateTimeParams = new function()   
									    {   
									        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
									        this.thirdTime  = endTime;    //  开始时间   
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
								xtype : 'numberfield',
								id : 'beforeTimes',
								fieldLabel : '潜伏期频度(次)',
								name : 'beforeTimes',
								allowBlank : false,
								value:1,
								width : 185,
								emptyText : '最小值0',
								nanText:'请输入有效数字',
								blankText : "请输入车辆频度",
								allowNegative :false
							}]	
						},{
							items : [ {
								xtype : 'numberfield',
								id : 'afterTimes',
								fieldLabel : '逃逸期频度(次)',
								name : 'afterTimes',
								allowBlank : false,
								value:1,
								width : 185,
								emptyText : '最小值0',
								nanText:'请输入有效数字',
								blankText : "请输入车辆频度",
								allowNegative :false
							}]	
						},{
							items: [ {
					        	xtype : 'tcombo',
								id : 'carBrand',
								name:'carBrand',
								fieldLabel: '品牌',
								store: carBrandStore,
								//emptyText:'请选择车辆品牌',
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
										var carTypeMode = new Ext.data.JsonStore({
											url : encodeURI(rootpath+"/dictionary/jsonCarTypeInCombo.mvc?carBrand="+record2.data['text']),
											root : "data",
											fields : [ 'id', 'text' ],
											autoLoad:false,
											autoSync:true
										});
										carTypeMode.load({
										    scope: this,
											    callback: function(records, operation, success) {
											        var listRecord = new Array();
													if(carTypeMode instanceof Ext.data.Store){  
														carTypeMode.each(function(result){  
												        	listRecord.push(result.data['text']);  
												        }); 
													 }
													Ext.getCmp('carType').clearValue();
													Ext.getCmp('carYear').clearValue();
													Ext.getCmp('carType').getStore().loadData(listRecord);
											    }
										});
		
								     }
								}
					        }]
						}, {
							items: [ {
					        	xtype : 'tcombo',
								id : 'carType',
								name:'carType',
								fieldLabel: '型号',
								emptyText:'请选择车辆型号',
								editable : false,
								selectOnFocus : true,
								forceSelection : true,
								store: [],
								anchor : '94%',
								displayField : 'text',
								valueField:'id',
								mode : 'local',
								triggerAction : 'all',
								listeners : {
								     select : function(combo, record, index) {
										var carYearStore = new Ext.data.JsonStore({
											url : encodeURI(rootpath+"/dictionary/jsonCarYearInCombo.mvc?carType="+combo.value+"&carBrand="+Ext.getCmp('carBrand').value),
											root : "data",
											fields : [ 'id', 'text' ],
											autoLoad:false,
											autoSync:true
										});
										carYearStore.load({
										    scope: this,
											    callback: function(records, operation, success) {
											        var yearRecord = new Array();
													if(carYearStore instanceof Ext.data.Store){  
														carYearStore.each(function(result){  
												        	yearRecord.push(result.data['text']);  
												        }); 
													 }
													Ext.getCmp('carYear').clearValue();
													Ext.getCmp('carYear').getStore().loadData(yearRecord);
											    }
										});
										
								     }
								}
					        }]
						}, {
							items: [ {
					        	xtype : 'tcombo',
								id : 'carYear',
								name:'carYear',
								fieldLabel: '年款',
								anchor : '94%',
								editable : false,
								selectOnFocus : true,
								forceSelection : true,
								emptyText:'请选择车辆年款',
								store: [],
								displayField : 'text',
								valueField:'id',
								mode : 'local',
								triggerAction : 'all'
					        }]
						},{
						// 第一行
						//colspan:2,
						//colspan:3,
						width:450,
						items : [ {
								xtype : 'compositefield',
								items : [ {
									flex : 0.5,
									fieldLabel : '卡点',
									xtype : 'tooltiptextfield',
									name : 'passStation',
									id : 'passStation',
									width : 185,
									emptyText : '请选择卡点'
								}, {
									flex : 0.5,
									owner : this,
									labelAlign : 'right',
									xtype : 'button',
									text : '选择卡口',
									id:'choosekkBtn',
									handler : function(){
										kwin1.show();
									}
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
					/**
					 * 默认加载车辆品牌选项
					 */
					carBrandStore.load();
				}
			}
		});
		Jinpeng.carHiddenAnalysis.CarHiddenAnalysisFormPanel.superclass.initComponent.apply(this);
	},
	/* 响应查询按钮 */
	alarmSearch : function() {
		var form = Ext.getCmp('searchAlarmForm');
		if (form.getForm().isValid()) {
			var grid = Ext.getCmp('carHiddenAnalysisPanel');
			grid.store.baseParams = {};// 重置
			/** 将参数传入后台 */
			var baseparams = {
				"passStation" : Ext.getCmp('passport').getValue(),
				"firstTime" : Ext.getCmp('firstTime').getValue(),
				"secondTime" : Ext.getCmp('secondTime').getValue(),
				"thirdTime" : Ext.getCmp('thirdTime').getValue(),
				"carBrand" : Ext.getCmp('carBrand').getValue(),
				"carType" : Ext.getCmp('carType').getValue(),
				"carYear" : Ext.getCmp('carYear').getValue(),
				"beforeTimes" : Ext.getCmp('beforeTimes').getValue(),
				"afterTimes" : Ext.getCmp('afterTimes').getValue()
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
	resetMethod :  function() {
		Ext.getCmp('searchAlarmForm').getForm().reset();
	}
});
function showCarPlace(carNum, counts) {
	var orgId ='';
	var orgType = '';
	var kkbhs = '';
	var startTime = Ext.getCmp('firstTime').getValue();
	var endTime = Ext.getCmp('thirdTime').getValue();
	var mainParam = {
		'orgId' : orgId,
		'orgType' : orgType,
		'kkbhs' : kkbhs,
		'startTime' : startTime,
		'endTime' : endTime,
		'carNum' : carNum,
		'counts' : 500
	};
	var win = new Jinpeng.trackSearch.TrackSeachWindow({
		cls : 'system_mod',
		modal : true,
		mainParam : mainParam
	});
	win.init(mainParam);
	win.show();
}

Ext.reg('carHiddenFormPanel', Jinpeng.carHiddenAnalysis.CarHiddenAnalysisFormPanel);
Ext.reg('carHiddenDataPanel', Jinpeng.carHiddenAnalysis.CarHiddenAnalysisPanel);