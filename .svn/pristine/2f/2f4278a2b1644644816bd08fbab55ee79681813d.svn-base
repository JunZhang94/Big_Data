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
//标志是哪个卡口选择弹出框
var kwinFlag;
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
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/Big_Data/zTree/demo/cn/excheck/multiSelectTree2.html"></iframe>'
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
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/Big_Data/zTree/demo/cn/excheck/multiSelectTree2.html"></iframe>'
});


var setKKValue=function(data){
	//alert(kwinFlag);
	if(kwinFlag ==1){
		Ext.getCmp('portId1').setValue(data.text);
		Ext.getCmp('kkbh1').setValue((data.id).substring(3));
		Ext.getCmp('mywin1').hide();
	}else if(kwinFlag ==2){
		Ext.getCmp('portId2').setValue(data.text);
		Ext.getCmp('kkbh2').setValue((data.id).substring(3));
		Ext.getCmp('mywin2').hide();
	}else if(kwinFlag ==3){
		Ext.getCmp('portId3').setValue(data.text);
		Ext.getCmp('kkbh3').setValue((data.id).substring(3));
		Ext.getCmp('mywin3').hide();
	}
	
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
				frame : true,
				labelAlign : 'right',
				cls : 'blue-button-ct',
				layout : 'table',
				defaults : {
					//width : 300,
					layout : 'form'
				},
				layoutConfig : {
					columns : 3
				},
				
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
					/*
					items : [{
							//第一行
							fieldLabel : '卡口名称1',
							blankText:'请选择卡口1',
							id : 'portId1',
							selectOnFocus : true,
							forceSelection : true,
							editable : false,
							allowBlank:false,
							xtype : 'mountPlaceSelector',
							name : 'passStation1',
							emptyText : '请选择卡口1名称',
							anchor : '94%',
							callBackFun:function(data){				
                               if(data.id == 440100 || data.id==440100000000 || data.id==440100230000 || data.id==440113000000 || data.id==440114000000 || data.id==440115000000 || data.id==440116000000 || data.id==440183000000 || data.id==440184000000){
								   var win = new Jinpeng.widget.MessageWindow();
								   win.msg = '请正确选择卡口！';
								   win.show();
								   data.name ='';
								   Ext.getCmp('portId1').setValue(data.name);
								}else{
									Ext.getCmp('kkbh1').setValue(data.id);
								}
							}
						}]
						*/
						items : [ {
							width:250,
							xtype : 'compositefield',
							items : [ {
								flex : 0.5,
								fieldLabel : '卡口名称1',
								xtype : 'tooltiptextfield',
								name : 'passStation1',
								id : 'portId1',
								width : 150,
								emptyText : '请选择卡口1名称'
							}, {
								flex : 0.5,
								owner : this,
								//width : 150,
								labelAlign : 'right',
								xtype : 'button',
								text : '选择卡口',
								id:'choosekkBtn',
								handler : function(){
									kwinFlag  = 1;
									kwin1.show();
								}
							}]
						}]
					},{
						items : [ {
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
									var endTime = Ext.util.Format.date(
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
				                    field.blur();
				             	}   
							}   
						} ]
					},{
						items : [ {
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
									var endTime = Ext.util.Format.date(
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
				                    field.blur();
				             	}   
							} 
						} ]
					},/*{
						xtype : 'spacer'
					},*/{
						/*
						items : [{
							fieldLabel : '卡口名称2',
							blankText:'请选择卡口2',
							selectOnFocus : true,
							forceSelection : true,
							editable : false,
							allowBlank:false,
							xtype : 'mountPlaceSelector',
							name : 'passStation2',
							id : 'portId2',
							emptyText : '请选择卡口2名称',
							anchor : '94%',
							callBackFun:function(data){
								if(data.id == 440100 || data.id==440100000000 || data.id==440100230000 || data.id==440113000000 || data.id==440114000000 || data.id==440115000000 || data.id==440116000000 || data.id==440183000000 || data.id==440184000000){
									var win = new Jinpeng.widget.MessageWindow();
									win.msg = '请选择正确的卡口！';
									win.show();
								    data.name ='';
							        Ext.getCmp('portId2').setValue(data.name);
								}else{
									Ext.getCmp('kkbh2').setValue(data.id);
								}
							}
						}]
						*/
						items : [ {
							xtype : 'compositefield',
							items : [ {
								flex : 0.5,
								fieldLabel : '卡口名称2',
								xtype : 'tooltiptextfield',
								name : 'passStation2',
								id : 'portId2',
								width : 150,
								emptyText : '请选择卡口2名称'
							}, {
								flex : 0.5,
								owner : this,
								labelAlign : 'right',
								xtype : 'button',
								text : '选择卡口',
								id:'choosekkBtn',
								handler : function(){
									kwinFlag  = 2;
									kwin2.show();
								}
							}]
						}]						
					},{
						items : [ {
							width:180,
							xtype : 'textfield',
							name : 'startdate2',
							id : 'startdate2',
							allowBlank : false,
				            editable : false,
							fieldLabel : '开始时间',
							value : defaultStartTime,
							anchor : '94%',
							style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
							listeners  : {   
				            	'focus':function(field){  
									var endTime = Ext.util.Format.date(
											new Date(), 'Y-m-d H:i:s');
									var enddate = Ext.getCmp("enddate2").getValue();
									var selectDate = Ext.getCmp("startdate2").getValue();
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
										Ext.getCmp("enddate2").setValue(endDateStr);
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
				                    field.blur();
				             	}   
							}   
						} ]
					},{
						items : [ {
							width:180,
							xtype : 'textfield',
							name : 'enddate2',
							id : 'enddate2',
							fieldLabel : '结束时间',
							allowBlank : false,
				            editable : false,
							value : defaultEndTime,
							anchor : '94%',
							style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
							listeners  : {   
				            	'focus':function(field){  
									var endTime = Ext.util.Format.date(
											new Date(), 'Y-m-d H:i:s');
									var startdate = Ext.getCmp("startdate2").getValue();
									var selectDate = Ext.getCmp("enddate2").getValue();
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
										Ext.getCmp("startdate2").setValue(endDateStr);
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
				                    field.blur();
				             	}   
							} 
						} ]
					},/*{
						xtype : 'spacer'
					},*/{
						/*
						items : [{
							fieldLabel : '卡口名称3',
							blankText:'请选择卡口3',
							selectOnFocus : true,
							forceSelection : true,
							editable : false,
							xtype : 'mountPlaceSelector',
							name : 'passStation3',
							id : 'portId3',
							emptyText : '请选择卡口3名称',
							anchor : '94%',
							callBackFun:function(data){
								if(data.id == 440100 || data.id==440100000000 || data.id==440100230000 || data.id==440113000000 || data.id==440114000000 || data.id==440115000000 || data.id==440116000000 || data.id==440183000000 || data.id==440184000000){
									var win = new Jinpeng.widget.MessageWindow();
									win.msg = '请选择正确的卡口！';
									win.show();
								    data.name ='';
							        Ext.getCmp('portId3').setValue(data.name);
								}else{
									Ext.getCmp('kkbh3').setValue(data.id);
								}
							}
						}]
						*/
						items : [ {
							xtype : 'compositefield',
							items : [ {
								flex : 0.5,
								fieldLabel : '卡口名称3',
								xtype : 'tooltiptextfield',
								name : 'passStation3',
								id : 'portId3',
								width : 150,
								emptyText : '请选择卡口3名称'
							}, {
								flex : 0.5,
								owner : this,
								labelAlign : 'right',
								xtype : 'button',
								text : '选择卡口',
								id:'choosekkBtn',
								handler : function(){
									kwinFlag  = 3
									kwin3.show();
								}
							}]
						}]						
					},{
						items : [ {
							width:180,
							xtype : 'textfield',
							name : 'startdate3',
							id : 'startdate3',
							allowBlank : false,
				            editable : false,
							fieldLabel : '开始时间',
							value : defaultStartTime,
							anchor : '94%',
							style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
							listeners  : {   
				            	'focus':function(field){  
									var endTime = Ext.util.Format.date(
											new Date(), 'Y-m-d H:i:s');
									var enddate = Ext.getCmp("enddate3").getValue();
									var selectDate = Ext.getCmp("startdate3").getValue();
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
										Ext.getCmp("enddate3").setValue(endDateStr);
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
				                    field.blur();
				             	}   
							}   
						} ]
					},{
						items : [ {
							width:180,
							xtype : 'textfield',
							name : 'enddate3',
							id : 'enddate3',
							fieldLabel : '结束时间',
							allowBlank : false,
				            editable : false,
							value : defaultEndTime,
							anchor : '94%',
							style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
							listeners  : {   
				            	'focus':function(field){  
									var endTime = Ext.util.Format.date(
											new Date(), 'Y-m-d H:i:s');
									var startdate = Ext.getCmp("startdate3").getValue();
									var selectDate = Ext.getCmp("enddate3").getValue();
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
										Ext.getCmp("startdate3").setValue(endDateStr);
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
				                    field.blur();
				             	}   
							} 
						} ]
					},{
						//bodyStyle : 'padding-left:10px',
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
					},{
						xtype : 'hidden',
						id : 'kkbh1'
					},{
						xtype : 'hidden',
						id : 'kkbh2'
					},{
						xtype : 'hidden',
						id : 'kkbh3'
					},{
						xtype : 'hidden',
						id : 'k1mc'
					},{
						xtype : 'hidden',
						id : 'k2mc'
					},{
						xtype : 'hidden',
						id : 'k3mc'
					}]
			} ]
		});
		Jinpeng.controlAlarm.AlarmSearchNorthFormPanel.superclass.initComponent.apply(this);
	},
	chaxun : function() {
		var form = Ext.getCmp('searchAlarmForm');
		if(form.getForm().isValid()) {
			var searchFlag = true;
			/*if (Ext.getCmp('kkbh3').getValue() == '') {
				if (Ext.getCmp('kkbh1').getValue() == Ext.getCmp('kkbh2').getValue()) {
					searchFlag = false;
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = '不能包含相同的卡口名称！';
					win.show();
					return;
				}
			} else {
				if (Ext.getCmp('kkbh1').getValue() == Ext.getCmp('kkbh2').getValue() ||
						Ext.getCmp('kkbh1').getValue() == Ext.getCmp('kkbh3').getValue() ||
						Ext.getCmp('kkbh2').getValue() == Ext.getCmp('kkbh3').getValue()) {
					searchFlag = false;
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = '不能包含相同的卡口名称！';
					win.show();
					return;
				}
			}*/
			if (searchFlag) {
				var grid = Ext.getCmp('alarmGridPanel');
				grid.store.baseParams = {};
				var baseparams = {
					'kkbh1' : Ext.getCmp('kkbh1').getValue(),
					'kkbh2' : Ext.getCmp('kkbh2').getValue(),
					'kkbh3' : Ext.getCmp('kkbh3').getValue(),
					'startdate': Ext.getCmp('startdate').getValue(),
					'enddate'   :  Ext.getCmp('enddate').getValue(),
					'startdate2': Ext.getCmp('startdate2').getValue(),
					'enddate2'   :  Ext.getCmp('enddate2').getValue(),
					'startdate3': Ext.getCmp('startdate3').getValue(),
					'enddate3'   :  Ext.getCmp('enddate3').getValue()
				};
				grid.store.baseParams = baseparams;
				//动态加载页面数据列
				grid.store.load({
					params : {'page.start' : 0, 'page.limit' : Jinpeng.PageSize},
					callback : function(o,response,success) {
						var rowData = (Ext.getCmp("portId1").getValue() + ',' + Ext.getCmp("portId2").getValue()).split(",");
						if (Ext.getCmp("portId3").getValue() != '') {
							rowData = (Ext.getCmp("portId1").getValue() + ',' + Ext.getCmp("portId2").getValue() + ',' + Ext.getCmp("portId3").getValue()).split(",");
						}
						var fields = new Array(rowData.length);
						var columns = new Array(rowData.length);
						var maxLength = rowData.length;
						var imageWH = 16*maxLength;
						var data = null;
						var filedO = {}, columnsO = {};
							for (var i = 0; i < rowData.length; i++) {
								columnsO.header = rowData[i];
								columnsO.dataIndex = "kkmcTime" + (i + 1);
								columnsO.width = 50;
								fields[i] = filedO;
								columns[i] = columnsO;
								filedO = {}, columnsO = {}; //重置
							}
						var columns = columns;
						var fields = fields;
						colM.length = 0; //清空数组
						colM.push( new Ext.ux.grid.PagingRowNumberer({ width : 40, height : 50}));
						colM.push( {header : '车牌号码', dataIndex : 'carNum',width : 30});
						for ( var i = 0; i < fields.length; i++) {
							dataFields.push(fields[i]);
							colM.push(columns[i]);
						}
					    grid.reconfigure(alarmSearchStore, new Ext.grid.ColumnModel(colM));
						}
				});
			}
		}
	},
	
	resetMethod :  function() {
		Ext.getCmp("searchAlarmForm").getForm().reset();
	}
	
	
});

var dataFields = [{
		name : 'kkmcTime1'
	}, {
		name : 'kkmcTime2'
	}, {
		name : 'kkmcTime3'
	}, {
		name : 'carNum'
	}
];

var colM = [
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
	}
];

var alarmSearchStore = new Ext.data.JsonStore({
	url : rootpath + "/region/regionQuery.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	fields : dataFields
	
});

// 中心右区域数据显示中心
Jinpeng.controlAlarm.AlarmSearchCenterDataPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'alarmGridPanel',
   	border : false,
    pageSize : Jinpeng.PageSize,
    autoScroll : true,
    width : 1000,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
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
