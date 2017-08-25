Ext.form.TriggerField.override({   
    afterRender: function() {   
         Ext.form.TriggerField.superclass.afterRender.call(this);   
    }   
}); 

/**
 * 区域碰撞查询入口
 */
Ext.ns("Jinpeng.controlAlarm");

var viewPortObj = null;
var downPictureWindow = null;
var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
var kkStr = '';
var kkbhs = '';
var kkmcs = '';
var startTimes = '';
var endTimes = '';
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
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/Big_Data/zTree/demo/cn/excheck/multiSelectTree2.html"></iframe>'
});

var kwin2 =new Jinpeng.widget.GeneralWindow({
	id: "mywin2",
	title: "",
	constrain : true,
	constrainHeader : true,
	width: ww * 2 / 3,
	height: hh * 3 / 4,
	layout: "fit",
	//autoShow: true,
	closeAction:'hide',
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/iVMS_Business/zTree/demo/cn/excheck/multiSelectTree2.html"></iframe>'
});

var kwin3 =new Jinpeng.widget.GeneralWindow({
	id: "mywin3",
	title: "",
	constrain : true,
	constrainHeader : true,
	width: ww * 2 / 3,
	height: hh * 3 / 4,
	layout: "fit",
	//autoShow: true,
	closeAction:'hide',
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/iVMS_Business/zTree/demo/cn/excheck/multiSelectTree2.html"></iframe>'
});


var setKKValue=function(data){
	Ext.getCmp('portId1').setValue(data.text);
	Ext.getCmp('kkbh').setValue((data.id).substring(3));
	Ext.getCmp('mywin1').hide();
};
Ext.onReady(function() {
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport({
		layout : 'border',
		items : [ {
			// north区域表单
			region : 'north',
			border : false,
			height : 120,
			// 自定标签
			xtype : 'alarmSearchNorthFormPanel'
		}, {
			region : 'center',
			border : false,
			// 自定标签
			xtype : 'alarmSearchCenterDataPanel'
		} ]
	});
});

/**
 * north区域表单部份
 */
Jinpeng.controlAlarm.AlarmSearchNorthFormPanel = Ext.extend(Ext.Panel,{
	initComponent : function() {
		var nowTime = new Date();
		var defaultEndTime = nowTime.format('Y-m-d H:i:s');	
		var previwStartTime = nowTime.getTime() - 1 * 60 * 60 * 1000;	
		var previwTime = new Date(previwStartTime);
		var defaultStartTime = Ext.util.Format.date(previwTime, 'Y-m-d H:i:s');
		Ext.apply(this,{
			items : [ {
				// form表单
				xtype : 'form',
				id : 'searchAlarmForm',
				border : false,
				cls : 'blue-button-ct',
				defaults : {
					margins : '5 2 5 2'
				},
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [ {
					layout : 'column',
					border : false,
					items : [ {
						columnWidth : 0.35,
						layout : 'form',
						border : false,
						bodyStyle : 'background-color: #F7F7F7',
						items : [ {
							width:248,
							xtype : 'compositefield',
							items : [ {
								flex : 0.5,
								fieldLabel : '卡口名称',
								readOnly : 'ture',
								xtype : 'tooltiptextfield',
								name : 'passStation1',
								id : 'portId1',
								width : 170,
								emptyText : '请选择卡口名称'
							}, {
								flex : 0.5,
								owner : this,
								//width : 150,
								labelAlign : 'right',
								xtype : 'button',
								text : '选择卡口',
								id:'choosekkBtn',
								handler : function(){
									kwin1.show();
								}
							}]
						}, {
							width:180,
							xtype : 'textfield',
							name : 'startdate',
							id : 'startdate',
							allowBlank : false,
				            editable : false,
							fieldLabel : '开始时间',
							value : defaultStartTime,
							anchor : '94%',
							style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
							listeners  : {   
				            	'focus':function(field){ 
									var endTime = Ext.getCmp("enddate").getValue();
									var startdate = Ext.getCmp("startdate").getValue();//获取表单开始时间str
									var end=Ext.getCmp('enddate').getValue();//获取表单结束时间str
									var previw=new Date(startdate.replace(/-/g,"/"));
									var back=new Date(end.replace(/-/g,"/"));
									if(back.getTime()-previw.getTime()>(60*60*1000*1)){
										var b=previw.getTime()+(60*60*1000*1);
										var bDate=new Date(b);
										var bDate_=Ext.util.Format.date(bDate, 'Y-m-d H:i:s');
										Ext.getCmp('enddate').setValue(bDate_);
									} else if (previw.getTime() - back.getTime() > 0) {
										var b=previw.getTime()+(60*60*1000*1);
										var bDate=new Date(b);
										var bDate_=Ext.util.Format.date(bDate, 'Y-m-d H:i:s');
										Ext.getCmp('enddate').setValue(bDate_);
									}
									//  日期时间的默认参数      
								    var defaultDateTimeParams = new function()   
								    {   
								        this.readOnly = true;           //  不允许在文本输入框中修改时间   
								        //this.maxDate = endTime;    //  开始时间   
								        this.dateFmt = 'yyyy-MM-dd HH:mm:ss';
								        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
								        this.alwaysUseStartDate = false;           //  默认使用初始时间   
								    };  
				                    WdatePicker(defaultDateTimeParams);   
				                    field.blur();
									/*var endTime = Ext.util.Format.date(
											new Date(), 'Y-m-d H:i:s');
									var enddate = Ext.getCmp("enddate").getValue();
									var selectDate = Ext.getCmp("startdate").getValue();
									var dd = selectDate.split(' ');
									var dd1 = dd[0].split('-');
									var dd2 = dd[1].split(':');
									var d1 = new Date(dd1[0],dd1[1] - 1,dd1[2],dd2[0],dd2[1],dd2[2]);
									var d2 = new Date(d1.getTime() + 1 * 60 * 60 * 1000);
									
									var ee = enddate.split(' ');
									var ee1 = ee[0].split('-');
									var ee2 = ee[1].split(':');
									var e1 = new Date(ee1[0],ee1[1] - 1,ee1[2],ee2[0],ee2[1],ee2[2]);
									var endDateStr = Ext.util.Format.date(d2, 'Y-m-d H:i:s');
									var times = (e1 - d1)/3600000;
									if (times > 1) {
										Ext.getCmp("enddate").setValue(endDateStr);
									}
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
				                    field.blur();*/
				             	}   
							}   
						}, {
							width:180,
							xtype : 'textfield',
							name : 'enddate',
							id : 'enddate',
							fieldLabel : '结束时间',
							allowBlank : false,
				            editable : false,
							value : defaultEndTime,
							anchor : '94%',
							style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
							listeners  : {   
				            	'focus':function(field){  
									var startdate = Ext.getCmp("startdate").getValue();
									var end=Ext.getCmp('enddate').getValue();
									var previw=new Date(startdate.replace(/-/g,"/"));
									var back=new Date(end.replace(/-/g,"/"));
									if(back.getTime()-previw.getTime()>(60*60*1000*1)){
										var s=back.getTime()-(60*60*1000*1);
										var sDate=new Date(s);
										var sDate_=Ext.util.Format.date(sDate, 'Y-m-d H:i:s');
										Ext.getCmp('startdate').setValue(sDate_);
									} else if (previw.getTime() - back.getTime() > 0) {
										var s=back.getTime()-(60*60*1000*1);
										var sDate=new Date(s);
										var sDate_=Ext.util.Format.date(sDate, 'Y-m-d H:i:s');
										Ext.getCmp('startdate').setValue(sDate_);
									}
									//  日期时间的默认参数      
								    var defaultDateTimeParams = new function()   
								    {   
								        this.readOnly = true;           //  不允许在文本输入框中修改时间 
								        //this.minDate = startdate;
								        this.dateFmt = 'yyyy-MM-dd HH:mm:ss'; 
								        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
								        this.alwaysUseStartDate = false;           //  默认使用初始时间   
							        };
				                    WdatePicker(defaultDateTimeParams);   
				                    field.blur();
									/*var endTime = Ext.util.Format.date(
											new Date(), 'Y-m-d H:i:s');
									var startdate = Ext.getCmp("startdate").getValue();
									var selectDate = Ext.getCmp("enddate").getValue();
									var dd = selectDate.split(' ');
									var dd1 = dd[0].split('-');
									var dd2 = dd[1].split(':');
									var d1 = new Date(dd1[0],dd1[1] - 1,dd1[2],dd2[0],dd2[1],dd2[2]);
									var d2 = new Date(d1.getTime() - 1 * 60 * 60 * 1000);
									
									var ee = startdate.split(' ');
									var ee1 = ee[0].split('-');
									var ee2 = ee[1].split(':');
									var e1 = new Date(ee1[0],ee1[1] - 1,ee1[2],ee2[0],ee2[1],ee2[2]);
									var times = (d1 - e1)/3600000;
									
									var endDateStr = Ext.util.Format.date(d2, 'Y-m-d H:i:s');
									if (times > 1) {
										Ext.getCmp("startdate").setValue(endDateStr);
									}
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
				                    field.blur();*/
				             	}   
							} 
						}, {
							xtype : 'hidden',
							id : 'kkbh'
						},{
							xtype : 'hidden',
							id : 'kkmc'
						}]
					}, {
						columnWidth : 0.65,
						//layout : 'form',
						border : false,
						layout : 'table',
						labelAlign : 'right',
						cls : 'blue-button-ct',
						bodyStyle : 'background-color: #F7F7F7',
						layoutConfig : {
							columns : 3
						},
						items : [{
							width : '70',
							anchor : '20%',
							items : [{
								xtype : 'button',
								text : '追加>>',
								tooltip : {
									text : '最多只能追加10个选项!'
								},
								id : "addBut",
								handler : this.addSelect
							}]
						}, {
							items : [{
								width : 20,
								xtype : 'spacer'
							}]
						}, {
							items : [{
								width : '600',
								xtype : 'textarea',
								readOnly : 'ture',
								fieldLabel : '',
								id : 'selectResult',
								height : '72',
								anchor : '100%',
								maxLength : 3000,
								renderer: function(value){
									return value.replace(/\n/gi, '<br/>');
								}
							}]
						}]
					}]
				}, {
					style : 'margin-left:60px;margin-bottom:4px;',
					xtype : 'compositefield',
					items : [{
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
						id : "searchBut",
						handler : this.chaxun
					},{
						xtype : 'button',
						id : "resetBut",
						text : '&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;',
						handler : this.resetMethod
					}]
				}]	
			} ]
		});
		Jinpeng.controlAlarm.AlarmSearchNorthFormPanel.superclass.initComponent.apply(this);
	},
	addSelect : function() {
		var kkbh = Ext.getCmp('kkbh').getValue();
		if (kkbh) {
			if (kkbhs == '' || (kkbhs && kkbhs.split(",").length <= 9)) {
				var kkmc = Ext.getCmp('portId1').getValue();
				var startdate = Ext.getCmp('startdate').getValue();
				var enddate = Ext.getCmp('enddate').getValue();
				kkStr += kkmc + "  " + startdate + "  " + enddate + "\n";
				if (kkbhs) {
					kkbhs += ',';
					kkmcs += ',';
					startTimes += ',';
					endTimes += ',';
				}
				kkbhs += kkbh;
				kkmcs += kkmc;
				startTimes += startdate;
				endTimes += enddate;
				var texts = Ext.getCmp('selectResult');
				texts.setValue(kkStr);
			} else {
				Ext.Msg.alert("提示","最多只能追加10个卡口！");
			}
		}
	},
	chaxun : function() {
		var form = Ext.getCmp('searchAlarmForm');
		if (kkbhs) {
			var length = kkbhs.split(',').length;
			if(length > 1 && form.getForm().isValid()) {
				var grid = Ext.getCmp('gridPanel');
				grid.store.baseParams = {};
				var baseparams = {
					'kkbhs' : kkbhs,
					'startTimes': startTimes,
					'endTimes' : endTimes
				};
				grid.store.baseParams = baseparams;
				//动态加载页面数据列
				grid.store.load({
					params : {'page.start' : 0, 'page.limit' : Jinpeng.PageSize},
					callback : function(o,response,success) {
						var kkmcArray = kkmcs.split(",");
						var fields = new Array(kkmcArray.length);
						var columns = new Array(kkmcArray.length);
						var data = null;
						var filedO = {}, columnsO = {};
						for (var i = 0; i < kkmcArray.length; i++) {
							columnsO.header = kkmcArray[i];
							columnsO.dataIndex = "kkmcTime" + (i + 1);
							columnsO.width = 50;
							filedO.name = "kkmcTime" + (i + 1);
							fields[i] = filedO;
							columns[i] = columnsO;
							filedO = {}, columnsO = {}; //重置
						}
						var columns = columns;
						var fields = fields;
						colM.length = 0; //清空数组
						dataFields.length = 0; //清空数组
						colM.push( new Ext.ux.grid.PagingRowNumberer({ width : 40, height : 50}));
						colM.push( {header : '车牌号码', dataIndex : 'carNum',width : 30});
						dataFields.push({name : 'carNum'});
						for ( var i = 0; i < fields.length; i++) {
							dataFields.push(fields[i]);
							colM.push(columns[i]);
						}
						colM.push( {header : '最后经过时间', dataIndex : 'lastJgsj',width : 30});
						colM.push( {header : '最后经过卡口', dataIndex : 'lastKkmc',width : 30});
					    grid.reconfigure(alarmSearchStore, new Ext.grid.ColumnModel(colM));
					}
				});
			} else {
				Ext.Msg.alert("提示","至少选择两个卡口进行查询！");
			}
		} else {
			Ext.Msg.alert("提示","卡口不能为空！");
		}
	},
	resetMethod :  function() {
		kkStr = '';
		kkbhs = '';
		kkmcs = '';
		startTimes = '';
		endTimes = '';
		Ext.getCmp("searchAlarmForm").getForm().reset();
	}
});

var dataFields;

var colM;

var alarmSearchStore;

// 中心右区域数据显示中心
Jinpeng.controlAlarm.AlarmSearchCenterDataPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'gridPanel',
   	border : false,
    pageSize : Jinpeng.PageSize,
    autoScroll : true,
    width : 1000,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		dataFields = [{
				name : 'kkmcTime1'
			}, {
				name : 'kkmcTime2'
			}, {
				name : 'kkmcTime3'
			}, {
				name : 'kkmcTime4'
			}, {
				name : 'kkmcTime5'
			}, {
				name : 'kkmcTime6'
			}, {
				name : 'kkmcTime7'
			}, {
				name : 'kkmcTime8'
			}, {
				name : 'kkmcTime9'
			}, {
				name : 'kkmcTime10'
			}, {
				name : 'carNum'
			}, {
				name : 'lastJgsj'
			}, {
				name : 'lastKkmc'
			}
		];
		colM = [
	        new Ext.ux.grid.PagingRowNumberer({ width : 40, height : 50}),
	        {
	    		header : '车牌号码',
	    		dataIndex : 'carNum'
	    	},{
	    		header : '卡口1',
	    		dataIndex : 'kkmcTime1'
	    	},{
	    		header : '卡口2',
	    		dataIndex : 'kkmcTime2'
	    	},{
	    		header : '卡口3',
	    		dataIndex : 'kkmcTime3'
	    	},{
	    		header : '最后经过时间',
	    		dataIndex : 'lastJgsj'
	    	},{
	    		header : '最后经过卡口',
	    		dataIndex : 'lastKkmc'
	    	}
	    ];
		alarmSearchStore = new Ext.data.JsonStore({
			url : rootpath + "/region/regionQueryNewTwo.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : dataFields
			
		});
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this,{
			store : alarmSearchStore,
			colModel :  new Ext.grid.ColumnModel({
				defaults : {
				sortable : false,
				autoHeight:true,
			},
				columns :colM,
			})
		});
		Jinpeng.controlAlarm.AlarmSearchCenterDataPanel.superclass.initComponent.apply(this);
	},
	resetMethod :  function() {
	   Ext.getCmp("searchAlarmForm").getForm().reset();
    }
	
});

Ext.reg('alarmSearchNorthFormPanel', Jinpeng.controlAlarm.AlarmSearchNorthFormPanel);
Ext.reg('alarmSearchCenterDataPanel', Jinpeng.controlAlarm.AlarmSearchCenterDataPanel);
