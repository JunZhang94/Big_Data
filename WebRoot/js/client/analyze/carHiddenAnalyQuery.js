/**
 * 初次入城
 */
Ext.ns("Jinpeng.carHiddenAnalysisQuery");

var params;//查询条件
var exportParams;//导出查询条件参数结构
var conditions;//页面查询组件
var showKkmcs; //用逗号分隔显示的卡口名称
var viewPortObj = null;
var treeLable = '';
var textLable = '';
var buttonLable = '';
var treeUrl = '/Big_Data/zTree/demo/cn/excheck/multiSelectTree1.html';
var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
var gisHeight = hh - 60;
var kwin =new Jinpeng.widget.GeneralWindow({
	id: "mywin",
	title: "",
	constrain : true,
	constrainHeader : true,
	width: ww * 2 / 3,
	height: hh * 3 / 4,
	layout: "fit",
	//autoShow: true,
	closeAction:'hide',
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="' + treeUrl + '"></iframe>'
});

var setKKValue=function(data){
	showKkmcs = data.text;
	var kkmcs = showKkmcs.replace(/,/g,'\n');
	Ext.getCmp('passStation').setValue(kkmcs);
	Ext.getCmp('directions').setValue(data.id);
	Ext.getCmp('mywin').hide();
};

Ext.onReady(function() { 
	Ext.useShims = true;
	var hh = Ext.getBody().getHeight();
	viewPortObj = new Ext.Viewport({
		layout : 'border',
		items : [{
				// north区域表单
					region : 'west',
					border : false,
					height : 115,
					// 自定标签
					xtype : 'FormPanel'
			},{
			region : 'center',
			border : false,
			xtype : 'panel',
			items : [{
				html: "<iframe id='gisInfoIframe' src='http://" + ipAdress + "/PGISViewer/PGISViewer.html' width='100%' height='" + hh + "' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
			}]
		} ]
	});
});
/**
 * north区域表单部份
 */
Jinpeng.carHiddenAnalysisQuery.FormPanel = Ext.extend(Ext.Panel,{
	id:'formId',
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
		//车身颜色
		var carColorStore = new Ext.data.JsonStore({
			url : rootpath
					+ "/dictionary/jsonDictsInCombo.mvc?code=CarColor",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false
		});
		Ext.apply(this,{
			items : [ {
				// form表单
				xtype : 'form',
				id : 'searchAlarmForm',
				border : false,
				frame : true,
				cls : 'blue-button-ct',
				layout : 'form',
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				height : Ext.getBody().getHeight(),
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
					xtype : 'fieldset',
					layout : "table",
					width : 650,
					title : '车辆特征',
					defaults : {
						width : 300,
						layout : 'form'
					},
					layoutConfig : {
						columns : 2
					},
					items : [{
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
						items : [ {
							xtype : 'jplovcombo',
							id : 'carColor',
							name : 'carColor',
							fieldLabel : '车身颜色',
							store : carColorStore,
							mode : 'local',
							emptyText : '全部',
							autoSelect : true,
							showSelectAll: true,
							triggerAction : 'all',
							valueField : 'id',
							displayField : 'text',
							anchor : '94%'
						} ]
					}]
				},{
					xtype : 'fieldset',
					layout : "table",
					width : 650,
					title : '时间信息',
					defaults : {
						width : 300,
						layout : 'form'
					},
					layoutConfig : {
						columns : 2
					},
					items : [{
						items : [ {
							xtype : 'textfield',
							name : 'startTime',
							id : 'startdate',
							allowBlank : false,
				            editable : false,
						    fieldLabel : '案发时间',
							value : new Date().format('Y-m-d') + ' 00:00:00',
						    //value:new Date().add(Date.MONTH, -1).format('Y-m-d')+' 00:00:00',
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
							fieldLabel : '至',
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
						}]
				},{
					xtype : 'fieldset',
					layout : "table",
					width : 650,
					title : '空间信息',
					defaults : {
						width : 300,
						layout : 'form'
					},
					layoutConfig : {
						columns : 2
					},
					items : [{
						colspan:2,
						width:610,
						items : [{
							xtype : 'compositefield',
							items : [ {
								flex : 0.2,
								owner : this,
								xtype : 'button',
								text : '案发地点',
								id:'choosekkBtn',
								handler : function(){
									kwin.show();
								}
							}, {
								flex : 0.15,
								cls : 'labelalign2',
								xtype : 'displayfield',
								id : 'select_point',
								html : "<img id='selectPoint' onmouseover=\"IMG_INFO.overRepalceImg(0)\" onmouseout=\"IMG_INFO.outRepalceImg(0)\" onclick=\"rectSelect(0)\" src='" + rootpath + "/images/buttons/select_point.png'\>"
							}, {
								flex : 0.15,
								cls : 'labelalign3',
								xtype : 'displayfield',
								id : 'select_rect',
								html : "<img id='selectRect' onmouseover=\"IMG_INFO.overRepalceImg(1)\" onmouseout=\"IMG_INFO.outRepalceImg(1)\" onclick=\"rectSelect(2)\" src='" + rootpath + "/images/buttons/Select_Rect.png'>"
							}, {
								flex : 0.15,
								cls : 'labelalign4',
								xtype : 'displayfield',
								id : 'select_circle',
								html : "<img id='selectCircle' onmouseover=\"IMG_INFO.overRepalceImg(2)\" onmouseout=\"IMG_INFO.outRepalceImg(2)\" onclick=\"rectSelect(2)\" src='" + rootpath + "/images/buttons/Select_Circle.png'>"
							}, {
								flex : 0.15,
								cls : 'labelalign5',
								xtype : 'displayfield',
								id : 'select_multiRect',
								html : "<img id='selectMultiRect' onmouseover=\"IMG_INFO.overRepalceImg(3)\" onmouseout=\"IMG_INFO.outRepalceImg(3)\" onclick=\"rectSelect(1)\" src='" + rootpath + "/images/buttons/Select_MultiRect.png'>"
							}, {
								flex : 0.2,
								cls : 'labelalign6',
								xtype : 'displayfield',
								id : 'clear_select',
								html : "<img id='clearSelect' onmouseover=\"IMG_INFO.overRepalceImg(4)\" onmouseout=\"IMG_INFO.outRepalceImg(4)\" onclick=\"cleanSelect()\" src='" + rootpath + "/images/buttons/Select_Layer.png'>"
							}]
						}]
					}, {
						colspan:2,
						width:650,
						items : [{
							fieldLabel : treeLable,
							xtype : 'textarea',
							height : 250,
							readOnly : 'ture',
							name : 'passStation',
							id : 'passStation',
							width : 470,
							emptyText : textLable
							},{
							xtype : 'hidden',
							id : 'directions',
							name : 'directions'
							}]
						}]
					}, {
						width : 650,
						title : '',
						defaults : {
							width : 300,
							layout : 'form'
						},
						layoutConfig : {
							columns : 2
						},
						items : [{
							colspan:2,
							width:650,
							items : [{
								xtype : 'compositefield',
								bodyStyle : 'padding-right:30px',
								items : [{
									xtype : 'button',
									flex : 31,
									region : "center",
									cls : 'buttunsearch',
									id : "searchBut",
									text : '&nbsp;&nbsp;&nbsp;开始分析&nbsp;&nbsp;&nbsp;',
									handler : this.alarmSearch
								}, {
									flex : 31,
									xtype : 'button',
									cls : 'buttunreset',
									region : "center",
									id : "resetBut1",
									text : '&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;',
									handler : this.resetMethod
								}]
							 }]
				      }]
				}]
			}],
			listeners : {
				afterrender : function() {
					/*车牌省Store*/
					carNumStore.load();
					carBrandStore.load();
					carColorStore.load();
				}
			}
		});
		Jinpeng.carHiddenAnalysisQuery.FormPanel.superclass.initComponent.apply(this);
	},
	/* 响应分析按钮 */
	alarmSearch: function() {
		var form = Ext.getCmp('searchAlarmForm');
		if (form.getForm().isValid()) {
			//获取查询条件信息
			params=getFormParamsForSend();
			//获取导出结构的查询条件
		//	exportParams=getExportParms();
			//构造子页面的搜说条件展现信息
			conditions=getFormForCondictions();
			
			var url = rootpath + '/carHiddenAnaly/carHiddenAnalyResult.mvc';
			var title = '隐匿车辆查询结果';
			var win = window.open(rootpath + "/user/toMainInfo.mvc");
			var bodyText = '<html><body>';  
			bodyText = '<form action="' + rootpath + '/user/toMainInfo.mvc" method="post">';  
			bodyText += '<input type="hidden" name="urlStr" value="'+ url +'" />';  
			bodyText += '<input type="hidden" name="title" value="'+ title +'" />';  
			bodyText += '</form></body></html>';  
			win.document.write(bodyText);  
			win.document.forms[0].submit(); //打开url新页面，然后直接post提交form，并且传递参数  
			win.focus();
		}
	},
	resetMethod :  function() {
		Ext.getCmp('searchAlarmForm').getForm().reset();
	}
});
var IMG_INFO = {
		overRepalceImg : function(value) {
			if (value == 0) {
				var pic = Ext.getCmp('select_point');
				//pic.html = "<div id='selectRect' onmouseover=\"IMG_INFO.overRepalceImg(1)\" onmouseout=\"IMG_INFO.outRepalceImg(1)\" onclick=\"rectSelect(2)\"><img src='" + rootpath + "/images/buttons/Select_Rect.png'></div>";
				var a = '';
			}
		},
		outRepalceImg : function(value) {
			if (value == 0) {
				
			}
		}
	};
//地图卡口选择
function rectSelect(type) {
	cleanSelect();
	window.gisInfoIframe.GIS_StartSelectCamera(type,function(values) {
		var datas = Ext.decode(values);
		var length = datas.length;
		var source = datas.source;
		var kkbhStr = "";
		var kkmcStr = "";
		for (var i = 0; i < length; i++) {
			if (kkbhStr != "") {
				kkbhStr += ",";
				kkmcStr += ",";
			}
			kkbhStr += source[i].kkbh;
			kkmcStr += source[i].kkmc;
		}
		showKkmcs = kkmcStr;
		var textKkmcs = showKkmcs.replace(/,/g,'\n');
		Ext.getCmp('passStation').setValue(textKkmcs);
		Ext.getCmp('directions').setValue(kkbhStr);
	});
};
//清空选择的卡口数据
function cleanSelect(){
	if (Ext.getCmp('passStation').getValue() != "") {
		showKkmcs = "";
		Ext.getCmp('passStation').setValue("");
		Ext.getCmp('directions').setValue("");
		window.gisInfoIframe.GIS_Clear();//清除选择
	}
};
//获取传入后台参数
function getFormParamsForSend(){
	
	/** 将参数传入后台 */
	var baseparams = {
		"startTime" : Ext.getCmp('startdate').getValue(),
		"endTime" : Ext.getCmp('enddate').getValue(),
		"carBrand" : Ext.getCmp('carBrand').getValue(),
		"carType" : Ext.getCmp('carType').getValue(),
		"carYear" : Ext.getCmp('carYear').getValue(),
		"carColor" : Ext.getCmp('carColor').getValue(),
		"mounts" : Ext.getCmp('directions').getValue()
	};
	return baseparams;
}
//构造导出传参结构
function getExportParms(){
	/** 将参数传入后台 */
		var param = [];
		param[param.length] ="startdate=" + Ext.getCmp('startdate').getValue()
		param[param.length] ="enddate=" + Ext.getCmp('enddate').getValue()
		param[param.length] ="backTimeLen=" + Ext.getCmp('backTimeLen').getValue()
		param[param.length] ="carBrand=" + Ext.getCmp('carBrand').getValue()
		param[param.length] ="carType=" + Ext.getCmp('carType').getValue()
		param[param.length] ="carYear=" + Ext.getCmp('carYear').getValue()
		param[param.length] ="hphm=" + Ext.getCmp('hphm').getValue()
		param[param.length] ="exceptHphm=" + Ext.getCmp('exceptHphm').getValue()
		param[param.length] ="mounts=" + Ext.getCmp('directions').getValue()
		
		return param;
	}
//构造子页面的搜索条件展现信息
function getFormForCondictions(){
	//定义查询条件
	var conditions = [{
		items : [ {
			xtype : 'displayfield',
			fieldLabel : '品牌',
			id : 'carBrand',
			name : 'carBrand',
			value : Ext.getCmp('carBrand').getValue(),
			anchor : '96%'
		} ]
	}, {
		items : [ {
			xtype : 'displayfield',
			fieldLabel : '型号',
			id : 'carType',
			name : 'carType',
			value : Ext.getCmp('carType').getValue(),
			anchor : '96%'
		} ]
	}, {
		items : [ {
			xtype : 'displayfield',
			fieldLabel : '年款',
			id : 'carYear',
			name : 'carYear',
			value : Ext.getCmp('carYear').getValue(),
			anchor : '96%'
		} ]
	}, {
		items : [ {
			xtype : 'displayfield',
			fieldLabel : '车身颜色',
			id : 'carColor',
			name : 'carColor',
			value : Ext.getCmp('carColor').getRawValue(),
			anchor : '96%'
		} ]
	}, {
		items : [ {
			xtype : 'displayfield',
			fieldLabel : '案发开始时间',
			id : 'startdate',
			name : 'startdate',
			value : Ext.getCmp('startdate').getValue(),
			anchor : '96%'
		} ]
	},{
		items : [ {
			xtype : 'displayfield',
			fieldLabel : '案发结束时间',
			id : 'enddate',
			name : 'enddate',
			value : Ext.getCmp('enddate').getValue(),
			anchor : '96%'
		} ]
	},{
		items : [ {
			xtype : 'displayfield',
			fieldLabel : '案发地点',
			id : 'kkmcList',
			name : 'kkmcList',
			value : showKkmcs,
			anchor : '96%'
		} ]
	}];
	return conditions;
};

Ext.reg('FormPanel', Jinpeng.carHiddenAnalysisQuery.FormPanel);
