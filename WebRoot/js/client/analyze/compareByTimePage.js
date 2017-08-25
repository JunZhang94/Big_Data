//历史过车查询功能JS
Ext.ns("Jinpeng.compareByTimeAnalyze");

var showFlag = 'grid';
var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
var groupFlag = 'none';
var currentPage = '';
var params;//查询条件
var conditions;//页面查询组件
var showKkmcs; //用逗号分隔显示的卡口名称
var queryUrl = '';
Ext.onReady(function() {
	var remoteScript=document.getElementById("remoteScript"); 
	remoteScript.src="http://" + ipAdress + "/PGISViewer/PGISViewer.html";//域B的链接 
	Ext.useShims = true;
	var hh = Ext.getBody().getHeight();
	var girdHeight = hh - 90;
	viewPortObj = new Ext.Viewport( {
		layout : 'border',
		id : 'portBody',
		items : [ {
			//查询表单
			region : 'west',
			border : false,
			height : 115,
			xtype : 'northFormPanel'
		}, {
			//列表数据
			xtype : 'panel',
			region : 'center',
			border : false,
			items : [{
				html: "<iframe id='gisIframe' src='http://" + ipAdress + "/PGISViewer/PGISViewer.html' width='100%' height='" + hh + "' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
			}]
		}]
	});
});

var kwinFlag;
var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
var kwin1 =new Jinpeng.widget.GeneralWindow({
	id: "mywin1",
	title: "",
	constrain : true,
	constrainHeader : true,
	width: ww * 2 / 3,
	height: hh * 3 / 4,
	layout: "fit",
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
	closeAction:'hide',
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/Big_Data/zTree/demo/cn/excheck/multiSelectTree2.html"></iframe>'
});

var kwin4 =new Jinpeng.widget.GeneralWindow({
	id: "mywin4",
	title: "",
	constrain : true,
	constrainHeader : true,
	width: ww * 2 / 3,
	height: hh * 3 / 4,
	layout: "fit",
	closeAction:'hide',
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/Big_Data/zTree/demo/cn/excheck/multiSelectTree2.html"></iframe>'
});

var kwin5 =new Jinpeng.widget.GeneralWindow({
	id: "mywin5",
	title: "",
	constrain : true,
	constrainHeader : true,
	width: ww * 2 / 3,
	height: hh * 3 / 4,
	layout: "fit",
	closeAction:'hide',
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/Big_Data/zTree/demo/cn/excheck/multiSelectTree2.html"></iframe>'
});

var kwin6 =new Jinpeng.widget.GeneralWindow({
	id: "mywin6",
	title: "",
	constrain : true,
	constrainHeader : true,
	width: ww * 2 / 3,
	height: hh * 3 / 4,
	layout: "fit",
	closeAction:'hide',
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/Big_Data/zTree/demo/cn/excheck/multiSelectTree2.html"></iframe>'
});

var setKKValue=function(data){
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
	}else if(kwinFlag ==4){
		Ext.getCmp('portId4').setValue(data.text);
		Ext.getCmp('kkbh4').setValue((data.id).substring(3));
		Ext.getCmp('mywin4').hide();
	}else if(kwinFlag ==5){
		Ext.getCmp('portId5').setValue(data.text);
		Ext.getCmp('kkbh5').setValue((data.id).substring(3));
		Ext.getCmp('mywin5').hide();
	}else if(kwinFlag ==6){
		Ext.getCmp('portId6').setValue(data.text);
		Ext.getCmp('kkbh6').setValue((data.id).substring(3));
		Ext.getCmp('mywin6').hide();
	}
	
};

var endTime = Date.parseDate(Ext.util.Format.date(new Date(), 'Y-m-d') + " "
		+ "23:59:59", 'Y-m-d H:i:s');

//查询表单
Jinpeng.compareByTimeAnalyze.NorthFormPanel = Ext.extend(Ext.Panel,{
	id : 'queryConditionPanel',
	initComponent : function() {
		var endTime = Date.parseDate(Ext.util.Format.date(
				new Date(), 'Y-m-d')
				+ " " + "23:59:59", 'Y-m-d H:i:s');	
		var nowTime=new Date().getTime();
		var previwTime=nowTime-(60*60*1000);
		var previwDate=new Date(previwTime);
		var startDate=Ext.util.Format.date(previwDate, 'Y-m-d H:i:s');
		Ext.apply(this,{
			items : [ {
				// form表单
				xtype : 'form',
				id : 'compareQueryForm',
				border : false,
				frame : true,
				cls : 'blue-button-ct',
				layout : 'form',
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				height : Ext.getBody().getHeight(),
				items : [{
					xtype : 'fieldset',
					layout : "table",
					width : 650,
					title : '卡口1',
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
						items : [ {
							xtype : 'compositefield',
							items : [{
								flex : 0.5,
								fieldLabel : '卡口1',
								xtype : 'tooltiptextfield',
//								allowBlank : false,
								name : 'portId1',
								id : 'portId1',
								width : 345,
								emptyText : '请选择起始卡口名称'
							}, {
								flex : 0.2,
								owner : this,
								labelAlign : 'right',
								xtype : 'button',
								text : '选择卡口',
								id:'choosekkBtn',
								handler : function(){
									kwinFlag  = 1;
									kwin1.show();
								}
							},{
								flex : 0.1,
								xtype : 'displayfield',
								html : "<img id='selectPoitKKMC1' src='" + rootpath + "/images/buttons/select_point.png' onclick=\"rectSelectkkmc1(0)\">",
							}, {
								flex : 0.2,
								xtype : 'displayfield',
								html : "<img id='recycleKKMC1' src='" + rootpath + "/images/buttons/Select_Layer.png' onclick=\"clearSelectkkmc1()\">",
							}]
						}]
					},{
						items : [{
							xtype : 'textfield',
							fieldLabel : '开始时间',
							id : 'startdate1',
							allowBlank : false,
		                    editable : false,
							name : 'startTime1',
							value : startDate,
							anchor : '94%',
							style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
							listeners  : {   
				            	'focus':function(field){  
									var endTime = Ext.getCmp("enddate1").getValue();
									var startdate = Ext.getCmp("startdate1").getValue();//获取表单开始时间str
									var end=Ext.getCmp('enddate1').getValue();//获取表单结束时间str
									var previw=new Date(startdate.replace(/-/g,"/"));
									var back=new Date(end.replace(/-/g,"/"));
									if(back.getTime()-previw.getTime()>(60*60*1000*1)){
										var b=previw.getTime()+(60*60*1000*1);
										var bDate=new Date(b);
										var bDate_=Ext.util.Format.date(bDate, 'Y-m-d H:i:s');
										Ext.getCmp('enddate1').setValue(bDate_);
									} else if (previw.getTime() - back.getTime() > 0) {
										var b=previw.getTime()+(60*60*1000*1);
										var bDate=new Date(b);
										var bDate_=Ext.util.Format.date(bDate, 'Y-m-d H:i:s');
										Ext.getCmp('enddate1').setValue(bDate_);
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
				             	}   
							}   
						}]
					},{
						items : [{
							xtype : 'textfield',
							fieldLabel : '结束时间',
							allowBlank : false,
		                    editable : false,
							id : 'enddate1',
							name : 'endTime1',
							value : new Date().format('Y-m-d H:i:s'),
							anchor : '94%',
							style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
							listeners  : {   
				            	'focus':function(field){  
									var startdate = Ext.getCmp("startdate1").getValue();
									var end=Ext.getCmp('enddate1').getValue();
									var previw=new Date(startdate.replace(/-/g,"/"));
									var back=new Date(end.replace(/-/g,"/"));
									if(back.getTime()-previw.getTime()>(60*60*1000*1)){
										var s=back.getTime()-(60*60*1000*1);
										var sDate=new Date(s);
										var sDate_=Ext.util.Format.date(sDate, 'Y-m-d H:i:s');
										Ext.getCmp('startdate1').setValue(sDate_);
									} else if (previw.getTime() - back.getTime() > 0) {
										var s=back.getTime()-(60*60*1000*1);
										var sDate=new Date(s);
										var sDate_=Ext.util.Format.date(sDate, 'Y-m-d H:i:s');
										Ext.getCmp('startdate1').setValue(sDate_);
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
				             	}   
							}   
						}]
					}]
				},{
					xtype : 'fieldset',
					layout : "table",
					width : 650,
					title : '卡口2',
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
						items : [ {
							xtype : 'compositefield',
							items : [{
								flex : 0.5,
								fieldLabel : '卡口2',
								xtype : 'tooltiptextfield',
//								allowBlank : false,
								name : 'portId2',
								id : 'portId2',
								width : 345,
								emptyText : '请选择起始卡口名称'
							}, {
								flex : 0.2,
								owner : this,
								labelAlign : 'right',
								xtype : 'button',
								text : '选择卡口',
								id:'choosekkBtn',
								handler : function(){
									kwinFlag  = 2;
									kwin2.show();
								}
							},{
								flex : 0.1,
								xtype : 'displayfield',
								html : "<img id='selectPoitKKMC2' src='" + rootpath + "/images/buttons/select_point.png' onclick=\"rectSelectkkmc2(0)\">",
							}, {
								flex : 0.2,
								xtype : 'displayfield',
								html : "<img id='recycleKKMC2' src='" + rootpath + "/images/buttons/Select_Layer.png' onclick=\"clearSelectkkmc2()\">",
							}]
						}]
					},{
						items : [{
							xtype : 'textfield',
							fieldLabel : '开始时间',
							id : 'startdate2',
							allowBlank : false,
		                    editable : false,
							name : 'startTime2',
							value : startDate,
							anchor : '94%',
							style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
							listeners  : {   
				            	'focus':function(field){  
									var endTime = Ext.getCmp("enddate2").getValue();
									var startdate = Ext.getCmp("startdate2").getValue();//获取表单开始时间str
									var end=Ext.getCmp('enddate2').getValue();//获取表单结束时间str
									var previw=new Date(startdate.replace(/-/g,"/"));
									var back=new Date(end.replace(/-/g,"/"));
									if(back.getTime()-previw.getTime()>(60*60*1000*1)){
										var b=previw.getTime()+(60*60*1000*1);
										var bDate=new Date(b);
										var bDate_=Ext.util.Format.date(bDate, 'Y-m-d H:i:s');
										Ext.getCmp('enddate2').setValue(bDate_);
									} else if (previw.getTime() - back.getTime() > 0) {
										var b=previw.getTime()+(60*60*1000*1);
										var bDate=new Date(b);
										var bDate_=Ext.util.Format.date(bDate, 'Y-m-d H:i:s');
										Ext.getCmp('enddate2').setValue(bDate_);
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
				             	}   
							}   
						}]
					},{
						items : [{
							xtype : 'textfield',
							fieldLabel : '结束时间',
							allowBlank : false,
		                    editable : false,
							id : 'enddate2',
							name : 'endTime2',
							value : new Date().format('Y-m-d H:i:s'),
							anchor : '94%',
							style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
							listeners  : {   
				            	'focus':function(field){  
									var startdate = Ext.getCmp("startdate2").getValue();
									var end=Ext.getCmp('enddate2').getValue();
									var previw=new Date(startdate.replace(/-/g,"/"));
									var back=new Date(end.replace(/-/g,"/"));
									if(back.getTime()-previw.getTime()>(60*60*1000*1)){
										var s=back.getTime()-(60*60*1000*1);
										var sDate=new Date(s);
										var sDate_=Ext.util.Format.date(sDate, 'Y-m-d H:i:s');
										Ext.getCmp('startdate2').setValue(sDate_);
									} else if (previw.getTime() - back.getTime() > 0) {
										var s=back.getTime()-(60*60*1000*1);
										var sDate=new Date(s);
										var sDate_=Ext.util.Format.date(sDate, 'Y-m-d H:i:s');
										Ext.getCmp('startdate2').setValue(sDate_);
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
				             	}   
							}   
						}]
					}]
				},{
					xtype : 'fieldset',
					layout : "table",
					width : 650,
					title : '卡口3',
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
						items : [ {
							xtype : 'compositefield',
							items : [{
								flex : 0.5,
								fieldLabel : '卡口3',
								xtype : 'tooltiptextfield',
//								allowBlank : false,
								name : 'portId3',
								id : 'portId3',
								width : 345,
								emptyText : '请选择起始卡口名称'
							}, {
								flex : 0.2,
								owner : this,
								labelAlign : 'right',
								xtype : 'button',
								text : '选择卡口',
								id:'choosekkBtn',
								handler : function(){
									kwinFlag  = 3;
									kwin3.show();
								}
							},{
								flex : 0.1,
								xtype : 'displayfield',
								html : "<img id='selectPoitKKMC3' src='" + rootpath + "/images/buttons/select_point.png' onclick=\"rectSelectkkmc3(0)\">",
							}, {
								flex : 0.2,
								xtype : 'displayfield',
								html : "<img id='recycleKKMC3' src='" + rootpath + "/images/buttons/Select_Layer.png' onclick=\"clearSelectkkmc3()\">",
							}]
						}]
					},{
						items : [{
							xtype : 'textfield',
							fieldLabel : '开始时间',
							id : 'startdate3',
							allowBlank : false,
		                    editable : false,
							name : 'startTime3',
							value : startDate,
							anchor : '94%',
							style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
							listeners  : {   
				            	'focus':function(field){  
									var endTime = Ext.getCmp("enddate3").getValue();
									var startdate = Ext.getCmp("startdate3").getValue();//获取表单开始时间str
									var end=Ext.getCmp('enddate3').getValue();//获取表单结束时间str
									var previw=new Date(startdate.replace(/-/g,"/"));
									var back=new Date(end.replace(/-/g,"/"));
									if(back.getTime()-previw.getTime()>(60*60*1000*1)){
										var b=previw.getTime()+(60*60*1000*1);
										var bDate=new Date(b);
										var bDate_=Ext.util.Format.date(bDate, 'Y-m-d H:i:s');
										Ext.getCmp('enddate3').setValue(bDate_);
									} else if (previw.getTime() - back.getTime() > 0) {
										var b=previw.getTime()+(60*60*1000*1);
										var bDate=new Date(b);
										var bDate_=Ext.util.Format.date(bDate, 'Y-m-d H:i:s');
										Ext.getCmp('enddate3').setValue(bDate_);
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
				             	}   
							}   
						}]
					},{
						items : [{
							xtype : 'textfield',
							fieldLabel : '结束时间',
							allowBlank : false,
		                    editable : false,
							id : 'enddate3',
							name : 'endTime3',
							value : new Date().format('Y-m-d H:i:s'),
							anchor : '94%',
							style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
							listeners  : {   
				            	'focus':function(field){  
									var startdate = Ext.getCmp("startdate3").getValue();
									var end=Ext.getCmp('enddate3').getValue();
									var previw=new Date(startdate.replace(/-/g,"/"));
									var back=new Date(end.replace(/-/g,"/"));
									if(back.getTime()-previw.getTime()>(60*60*1000*1)){
										var s=back.getTime()-(60*60*1000*1);
										var sDate=new Date(s);
										var sDate_=Ext.util.Format.date(sDate, 'Y-m-d H:i:s');
										Ext.getCmp('startdate3').setValue(sDate_);
									} else if (previw.getTime() - back.getTime() > 0) {
										var s=back.getTime()-(60*60*1000*1);
										var sDate=new Date(s);
										var sDate_=Ext.util.Format.date(sDate, 'Y-m-d H:i:s');
										Ext.getCmp('startdate3').setValue(sDate_);
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
				             	}   
							}   
						}]
					}]
				},{
					xtype : 'fieldset',
					layout : "table",
					width : 650,
					title : '卡口4',
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
						items : [ {
							xtype : 'compositefield',
							items : [{
								flex : 0.5,
								fieldLabel : '卡口4',
								xtype : 'tooltiptextfield',
//								allowBlank : false,
								name : 'portId4',
								id : 'portId4',
								width : 345,
								emptyText : '请选择起始卡口名称'
							}, {
								flex : 0.2,
								owner : this,
								labelAlign : 'right',
								xtype : 'button',
								text : '选择卡口',
								id:'choosekkBtn',
								handler : function(){
									kwinFlag  = 4;
									kwin4.show();
								}
							},{
								flex : 0.1,
								xtype : 'displayfield',
								html : "<img id='selectPoitKKMC4' src='" + rootpath + "/images/buttons/select_point.png' onclick=\"rectSelectkkmc4(0)\">",
							}, {
								flex : 0.2,
								xtype : 'displayfield',
								html : "<img id='recycleKKMC4' src='" + rootpath + "/images/buttons/Select_Layer.png' onclick=\"clearSelectkkmc4()\">",
							}]
						}]
					},{
						items : [{
							xtype : 'textfield',
							fieldLabel : '开始时间',
							id : 'startdate4',
							allowBlank : false,
		                    editable : false,
							name : 'startTime4',
							value : startDate,
							anchor : '94%',
							style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
							listeners  : {   
				            	'focus':function(field){  
									var endTime = Ext.getCmp("enddate4").getValue();
									var startdate = Ext.getCmp("startdate4").getValue();//获取表单开始时间str
									var end=Ext.getCmp('enddate4').getValue();//获取表单结束时间str
									var previw=new Date(startdate.replace(/-/g,"/"));
									var back=new Date(end.replace(/-/g,"/"));
									if(back.getTime()-previw.getTime()>(60*60*1000*1)){
										var b=previw.getTime()+(60*60*1000*1);
										var bDate=new Date(b);
										var bDate_=Ext.util.Format.date(bDate, 'Y-m-d H:i:s');
										Ext.getCmp('enddate4').setValue(bDate_);
									} else if (previw.getTime() - back.getTime() > 0) {
										var b=previw.getTime()+(60*60*1000*1);
										var bDate=new Date(b);
										var bDate_=Ext.util.Format.date(bDate, 'Y-m-d H:i:s');
										Ext.getCmp('enddate4').setValue(bDate_);
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
				             	}   
							}   
						}]
					},{
						items : [{
							xtype : 'textfield',
							fieldLabel : '结束时间',
							allowBlank : false,
		                    editable : false,
							id : 'enddate4',
							name : 'endTime4',
							value : new Date().format('Y-m-d H:i:s'),
							anchor : '94%',
							style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
							listeners  : {   
				            	'focus':function(field){  
									var startdate = Ext.getCmp("startdate4").getValue();
									var end=Ext.getCmp('enddate4').getValue();
									var previw=new Date(startdate.replace(/-/g,"/"));
									var back=new Date(end.replace(/-/g,"/"));
									if(back.getTime()-previw.getTime()>(60*60*1000*1)){
										var s=back.getTime()-(60*60*1000*1);
										var sDate=new Date(s);
										var sDate_=Ext.util.Format.date(sDate, 'Y-m-d H:i:s');
										Ext.getCmp('startdate4').setValue(sDate_);
									} else if (previw.getTime() - back.getTime() > 0) {
										var s=back.getTime()-(60*60*1000*1);
										var sDate=new Date(s);
										var sDate_=Ext.util.Format.date(sDate, 'Y-m-d H:i:s');
										Ext.getCmp('startdate4').setValue(sDate_);
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
				             	}   
							}   
						}]
					}]
				},{
					xtype : 'fieldset',
					layout : "table",
					width : 650,
					title : '卡口5',
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
						items : [ {
							xtype : 'compositefield',
							items : [{
								flex : 0.5,
								fieldLabel : '卡口5',
								xtype : 'tooltiptextfield',
//								allowBlank : false,
								name : 'portId5',
								id : 'portId5',
								width : 345,
								emptyText : '请选择起始卡口名称'
							}, {
								flex : 0.2,
								owner : this,
								labelAlign : 'right',
								xtype : 'button',
								text : '选择卡口',
								id:'choosekkBtn',
								handler : function(){
									kwinFlag  = 5;
									kwin5.show();
								}
							},{
								flex : 0.1,
								xtype : 'displayfield',
								html : "<img id='selectPoitKKMC5' src='" + rootpath + "/images/buttons/select_point.png' onclick=\"rectSelectkkmc5(0)\">",
							}, {
								flex : 0.2,
								xtype : 'displayfield',
								html : "<img id='recycleKKMC5' src='" + rootpath + "/images/buttons/Select_Layer.png' onclick=\"clearSelectkkmc5()\">",
							}]
						}]
					},{
						items : [{
							xtype : 'textfield',
							fieldLabel : '开始时间',
							id : 'startdate5',
							allowBlank : false,
		                    editable : false,
							name : 'startTime5',
							value : startDate,
							anchor : '94%',
							style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
							listeners  : {   
				            	'focus':function(field){  
									var endTime = Ext.getCmp("enddate5").getValue();
									var startdate = Ext.getCmp("startdate5").getValue();//获取表单开始时间str
									var end=Ext.getCmp('enddate5').getValue();//获取表单结束时间str
									var previw=new Date(startdate.replace(/-/g,"/"));
									var back=new Date(end.replace(/-/g,"/"));
									if(back.getTime()-previw.getTime()>(60*60*1000*1)){
										var b=previw.getTime()+(60*60*1000*1);
										var bDate=new Date(b);
										var bDate_=Ext.util.Format.date(bDate, 'Y-m-d H:i:s');
										Ext.getCmp('enddate5').setValue(bDate_);
									} else if (previw.getTime() - back.getTime() > 0) {
										var b=previw.getTime()+(60*60*1000*1);
										var bDate=new Date(b);
										var bDate_=Ext.util.Format.date(bDate, 'Y-m-d H:i:s');
										Ext.getCmp('enddate5').setValue(bDate_);
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
				             	}   
							}   
						}]
					},{
						items : [{
							xtype : 'textfield',
							fieldLabel : '结束时间',
							allowBlank : false,
		                    editable : false,
							id : 'enddate5',
							name : 'endTime5',
							value : new Date().format('Y-m-d H:i:s'),
							anchor : '94%',
							style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
							listeners  : {   
				            	'focus':function(field){  
									var startdate = Ext.getCmp("startdate5").getValue();
									var end=Ext.getCmp('enddate5').getValue();
									var previw=new Date(startdate.replace(/-/g,"/"));
									var back=new Date(end.replace(/-/g,"/"));
									if(back.getTime()-previw.getTime()>(60*60*1000*1)){
										var s=back.getTime()-(60*60*1000*1);
										var sDate=new Date(s);
										var sDate_=Ext.util.Format.date(sDate, 'Y-m-d H:i:s');
										Ext.getCmp('startdate5').setValue(sDate_);
									} else if (previw.getTime() - back.getTime() > 0) {
										var s=back.getTime()-(60*60*1000*1);
										var sDate=new Date(s);
										var sDate_=Ext.util.Format.date(sDate, 'Y-m-d H:i:s');
										Ext.getCmp('startdate5').setValue(sDate_);
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
				             	}   
							}   
						}]
					}]
				},{
					xtype : 'fieldset',
					layout : "table",
					width : 650,
					title : '卡口6',
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
						items : [ {
							xtype : 'compositefield',
							items : [{
								flex : 0.5,
								fieldLabel : '卡口6',
								xtype : 'tooltiptextfield',
//								allowBlank : false,
								name : 'portId6',
								id : 'portId6',
								width : 345,
								emptyText : '请选择起始卡口名称'
							}, {
								flex : 0.2,
								owner : this,
								labelAlign : 'right',
								xtype : 'button',
								text : '选择卡口',
								id:'choosekkBtn',
								handler : function(){
									kwinFlag  = 6;
									kwin6.show();
								}
							},{
								flex : 0.1,
								xtype : 'displayfield',
								html : "<img id='selectPoitKKMC6' src='" + rootpath + "/images/buttons/select_point.png' onclick=\"rectSelectkkmc6(0)\">",
							}, {
								flex : 0.2,
								xtype : 'displayfield',
								html : "<img id='recycleKKMC6' src='" + rootpath + "/images/buttons/Select_Layer.png' onclick=\"clearSelectkkmc6()\">",
							}]
						}]
					},{
						items : [{
							xtype : 'textfield',
							fieldLabel : '开始时间',
							id : 'startdate6',
							allowBlank : false,
		                    editable : false,
							name : 'startTime6',
							value : startDate,
							anchor : '94%',
							style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
							listeners  : {   
				            	'focus':function(field){  
									var endTime = Ext.getCmp("enddate6").getValue();
									var startdate = Ext.getCmp("startdate6").getValue();//获取表单开始时间str
									var end=Ext.getCmp('enddate6').getValue();//获取表单结束时间str
									var previw=new Date(startdate.replace(/-/g,"/"));
									var back=new Date(end.replace(/-/g,"/"));
									if(back.getTime()-previw.getTime()>(60*60*1000*1)){
										var b=previw.getTime()+(60*60*1000*1);
										var bDate=new Date(b);
										var bDate_=Ext.util.Format.date(bDate, 'Y-m-d H:i:s');
										Ext.getCmp('enddate6').setValue(bDate_);
									} else if (previw.getTime() - back.getTime() > 0) {
										var b=previw.getTime()+(60*60*1000*1);
										var bDate=new Date(b);
										var bDate_=Ext.util.Format.date(bDate, 'Y-m-d H:i:s');
										Ext.getCmp('enddate6').setValue(bDate_);
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
				             	}   
							}   
						}]
					},{
						items : [{
							xtype : 'textfield',
							fieldLabel : '结束时间',
							allowBlank : false,
		                    editable : false,
							id : 'enddate6',
							name : 'endTime6',
							value : new Date().format('Y-m-d H:i:s'),
							anchor : '94%',
							style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
							listeners  : {   
				            	'focus':function(field){  
									var startdate = Ext.getCmp("startdate6").getValue();
									var end=Ext.getCmp('enddate6').getValue();
									var previw=new Date(startdate.replace(/-/g,"/"));
									var back=new Date(end.replace(/-/g,"/"));
									if(back.getTime()-previw.getTime()>(60*60*1000*1)){
										var s=back.getTime()-(60*60*1000*1);
										var sDate=new Date(s);
										var sDate_=Ext.util.Format.date(sDate, 'Y-m-d H:i:s');
										Ext.getCmp('startdate6').setValue(sDate_);
									} else if (previw.getTime() - back.getTime() > 0) {
										var s=back.getTime()-(60*60*1000*1);
										var sDate=new Date(s);
										var sDate_=Ext.util.Format.date(sDate, 'Y-m-d H:i:s');
										Ext.getCmp('startdate6').setValue(sDate_);
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
				             	}   
							}   
						}]
					}]
				},{
					colspan:2,
					width:650,
					bodyStyle : 'padding-left:100px',
					items : [{
						xtype : 'compositefield',
						items : [{
							xtype : 'button',
							flex : 31,
							region : "center",
							cls : 'buttunsearch',
							id : "searchBut",
							text : '&nbsp;&nbsp;&nbsp;分析&nbsp;&nbsp;&nbsp;',
							handler : this.forwardPage
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
					id : 'kkbh4'
				},{
					xtype : 'hidden',
					id : 'kkbh5'
				},{
					xtype : 'hidden',
					id : 'kkbh6'
				}]
			}],
		});
		Jinpeng.compareByTimeAnalyze.NorthFormPanel.superclass.initComponent.apply(this);
	},
	//新页面打开
	forwardPage : function(value) {
		var form = Ext.getCmp('compareQueryForm');
		if (form.getForm().isValid()) {
			currentPage = "<span style='font-size:18px;color:#FFFFFF;'>分析研判&nbsp>>&nbsp</span><a href='#' style='font-size:16px;color: #FFFFFF;text-decoration:none;' onclick='currentPages()'>时间比对</a>";
			var url = rootpath + '/compareByTime/compareByTimeResult.mvc';
			queryUrl =  "/compareByTime/compareByTimeQuery.mvc";
			var title = '时间比对结果';
			if(Ext.getCmp('kkbh1').getValue()==''&&Ext.getCmp('kkbh2').getValue()==''&&
					Ext.getCmp('kkbh3').getValue()==''&&Ext.getCmp('kkbh4').getValue()==''&&
					Ext.getCmp('kkbh5').getValue()==''&&Ext.getCmp('kkbh6').getValue()==''){
				Ext.MessageBox.alert('提示','<br/><font color=red>请至少选择两个卡口!</font><br/>');
				return ;
			}
			var kkbh1;
			var startdate1;
			var enddate1;
			var kkStr='';
			var count=0;
			if(Ext.getCmp('kkbh1').getValue()!=''){
				kkbh1=Ext.getCmp('kkbh1').getValue();
				startdate1=Ext.getCmp('startdate1').getValue();
				enddate1=Ext.getCmp('enddate1').getValue();
				count++;
				kkStr+=Ext.getCmp('portId1').getValue()+"  " + startdate1 + "  " + enddate1 + "\n";
			}
			var kkbh2;
			var startdate2;
			var enddate2;
			if(Ext.getCmp('kkbh2').getValue()!=''){
				kkbh2=Ext.getCmp('kkbh2').getValue();
				startdate2=Ext.getCmp('startdate2').getValue();
				enddate2=Ext.getCmp('enddate2').getValue();
				count++;
				kkStr+=Ext.getCmp('portId2').getValue()+"  " + startdate2 + "  " + enddate2 + "\n";
			}
			var kkbh3;
			var startdate3;
			var enddate3;
			if(Ext.getCmp('kkbh3').getValue()!=''){
				kkbh3=Ext.getCmp('kkbh3').getValue();
				startdate3=Ext.getCmp('startdate3').getValue();
				enddate3=Ext.getCmp('enddate3').getValue();
				count++;
				kkStr+=Ext.getCmp('portId3').getValue()+"  " + startdate3 + "  " + enddate3 + "\n";
			}
			var kkbh4;
			var startdate4;
			var enddate4;
			if(Ext.getCmp('kkbh4').getValue()!=''){
				kkbh4=Ext.getCmp('kkbh4').getValue();
				startdate4=Ext.getCmp('startdate4').getValue();
				enddate4=Ext.getCmp('enddate4').getValue();
				count++;
				kkStr+=Ext.getCmp('portId4').getValue()+"  " + startdate4 + "  " + enddate4 + "\n";
			}
			var kkbh5;
			var startdate5;
			var enddate5;
			if(Ext.getCmp('kkbh5').getValue()!=''){
				kkbh5=Ext.getCmp('kkbh5').getValue();
				startdate5=Ext.getCmp('startdate5').getValue();
				enddate5=Ext.getCmp('enddate5').getValue();
				count++;
				kkStr+=Ext.getCmp('portId5').getValue()+"  " + startdate5 + "  " + enddate5 + "\n";
			}
			var kkbh6;
			var startdate6;
			var enddate6;
			if(Ext.getCmp('kkbh6').getValue()!=''){
				kkbh6=Ext.getCmp('kkbh6').getValue();
				startdate6=Ext.getCmp('startdate6').getValue();
				enddate6=Ext.getCmp('enddate6').getValue();
				count++;
				kkStr+=Ext.getCmp('portId6').getValue()+"  " + startdate6 + "  " + enddate6 + "\n";
			}
			if(count<2){
				Ext.MessageBox.alert('提示','<br/><font color=red>请至少选择两个卡口!</font><br/>');
				return ;
			}
			params = {
					'kkbh1' : kkbh1,
					'startdate1': startdate1,
					'enddate1'  : enddate1,
					'kkbh2' : kkbh2,
					'startdate2': startdate2,
					'enddate2'  : enddate2,
					'kkbh3' : kkbh3,
					'startdate3': startdate3,
					'enddate3'  : enddate3,
					'kkbh4' : kkbh4,
					'startdate4': startdate4,
					'enddate4'  : enddate4,
					'kkbh5' : kkbh5,
					'startdate5': startdate5,
					'enddate5'  : enddate5,
					'kkbh6' : kkbh6,
					'startdate6': startdate6,
					'enddate6'  : enddate6,
					'modelExportType' : 'compareByTime'
			};
			//定义查询条件
			conditions = [{
				items : [{
					xtype : 'textarea',
					fieldLabel : '所选卡点信息',
					id : 'passStation',
					readOnly : 'ture',
					name : 'passStation',
					value : kkStr,
					height : '80',
					maxLength : 3000,
					width : 600,
					anchor : '96%',
					renderer: function(value){
						return value.replace(/\n/gi, '<br/>');
					}
				}]
			}];
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
	resetMethod : function() {
		clearSelectkkmc1();
		clearSelectkkmc2();
		clearSelectkkmc3();
		clearSelectkkmc4();
		clearSelectkkmc5();
		clearSelectkkmc6();
		Ext.getCmp('compareQueryForm').getForm().reset();
		if(document.getElementById("ifrm")){
			document.getElementById("ifrm").contentWindow.hidPage();
		}
		
	}
});

//卡口1选择
function rectSelectkkmc1(type) {
	document.getElementById("selectPoitKKMC2").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC3").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC4").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC5").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC6").src = rootpath + "/images/buttons/select_point.png";
	clearSelectkkmc1();
	document.getElementById("selectPoitKKMC1").src = rootpath + "/images/buttons/select_point2.png";
	window.gisIframe.GIS_StartSelectCamera(type,function(values) {
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
		Ext.getCmp('portId1').setValue(textKkmcs);
		Ext.getCmp('kkbh1').setValue(kkbhStr);
	});
}

//卡口2选择
function rectSelectkkmc2(type) {
	document.getElementById("selectPoitKKMC1").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC3").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC4").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC5").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC6").src = rootpath + "/images/buttons/select_point.png";
	clearSelectkkmc2();
	document.getElementById("selectPoitKKMC2").src = rootpath + "/images/buttons/select_point2.png";
	window.gisIframe.GIS_StartSelectCamera(type,function(values) {
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
		Ext.getCmp('portId2').setValue(textKkmcs);
		Ext.getCmp('kkbh2').setValue(kkbhStr);
	});
}

//卡口3选择
function rectSelectkkmc3(type) {
	document.getElementById("selectPoitKKMC1").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC2").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC4").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC5").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC6").src = rootpath + "/images/buttons/select_point.png";
	clearSelectkkmc3();
	document.getElementById("selectPoitKKMC3").src = rootpath + "/images/buttons/select_point2.png";
	window.gisIframe.GIS_StartSelectCamera(type,function(values) {
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
		Ext.getCmp('portId3').setValue(textKkmcs);
		Ext.getCmp('kkbh3').setValue(kkbhStr);
	});
}

//卡口4选择
function rectSelectkkmc4(type) {
	document.getElementById("selectPoitKKMC1").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC2").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC3").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC5").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC6").src = rootpath + "/images/buttons/select_point.png";
	clearSelectkkmc4();
	document.getElementById("selectPoitKKMC4").src = rootpath + "/images/buttons/select_point2.png";
	window.gisIframe.GIS_StartSelectCamera(type,function(values) {
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
		Ext.getCmp('portId4').setValue(textKkmcs);
		Ext.getCmp('kkbh4').setValue(kkbhStr);
	});
}

//卡口5选择
function rectSelectkkmc5(type) {
	document.getElementById("selectPoitKKMC1").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC2").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC3").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC4").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC6").src = rootpath + "/images/buttons/select_point.png";
	clearSelectkkmc5();
	document.getElementById("selectPoitKKMC5").src = rootpath + "/images/buttons/select_point2.png";
	window.gisIframe.GIS_StartSelectCamera(type,function(values) {
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
		Ext.getCmp('portId5').setValue(textKkmcs);
		Ext.getCmp('kkbh5').setValue(kkbhStr);
	});
}

//卡口6选择
function rectSelectkkmc6(type) {
	document.getElementById("selectPoitKKMC1").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC2").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC3").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC4").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectPoitKKMC5").src = rootpath + "/images/buttons/select_point.png";
	clearSelectkkmc6();
	document.getElementById("selectPoitKKMC6").src = rootpath + "/images/buttons/select_point2.png";
	window.gisIframe.GIS_StartSelectCamera(type,function(values) {
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
		Ext.getCmp('portId6').setValue(textKkmcs);
		Ext.getCmp('kkbh6').setValue(kkbhStr);
	});
}

//清空选择的卡口1数据
function clearSelectkkmc1() {
	document.getElementById("selectPoitKKMC1").src = rootpath + "/images/buttons/select_point.png";
	//每次进行地图卡口选择的时候，这里给卡口选择显示框重置
	if (Ext.getCmp('portId1').getValue() != "") {
		showKkmcs = "";
		Ext.getCmp('portId1').setValue("");
		Ext.getCmp('kkbh1').setValue("");
		window.gisIframe.GIS_Clear();//清除选择
	}
}

//清空选择的卡口2数据
function clearSelectkkmc2() {
	document.getElementById("selectPoitKKMC2").src = rootpath + "/images/buttons/select_point.png";
	//每次进行地图卡口选择的时候，这里给卡口选择显示框重置
	if (Ext.getCmp('portId2').getValue() != "") {
		showKkmcs = "";
		Ext.getCmp('portId2').setValue("");
		Ext.getCmp('kkbh2').setValue("");
		window.gisIframe.GIS_Clear();//清除选择
	}
}

//清空选择的卡口3数据
function clearSelectkkmc3() {
	document.getElementById("selectPoitKKMC3").src = rootpath + "/images/buttons/select_point.png";
	//每次进行地图卡口选择的时候，这里给卡口选择显示框重置
	if (Ext.getCmp('portId3').getValue() != "") {
		showKkmcs = "";
		Ext.getCmp('portId3').setValue("");
		Ext.getCmp('kkbh3').setValue("");
		window.gisIframe.GIS_Clear();//清除选择
	}
}

//清空选择的卡口4数据
function clearSelectkkmc4() {
	document.getElementById("selectPoitKKMC4").src = rootpath + "/images/buttons/select_point.png";
	//每次进行地图卡口选择的时候，这里给卡口选择显示框重置
	if (Ext.getCmp('portId4').getValue() != "") {
		showKkmcs = "";
		Ext.getCmp('portId4').setValue("");
		Ext.getCmp('kkbh4').setValue("");
		window.gisIframe.GIS_Clear();//清除选择
	}
}

//清空选择的卡口2数据
function clearSelectkkmc5() {
	document.getElementById("selectPoitKKMC5").src = rootpath + "/images/buttons/select_point.png";
	//每次进行地图卡口选择的时候，这里给卡口选择显示框重置
	if (Ext.getCmp('portId5').getValue() != "") {
		showKkmcs = "";
		Ext.getCmp('portId5').setValue("");
		Ext.getCmp('kkbh5').setValue("");
		window.gisIframe.GIS_Clear();//清除选择
	}
}

//清空选择的卡口2数据
function clearSelectkkmc6() {
	document.getElementById("selectPoitKKMC6").src = rootpath + "/images/buttons/select_point.png";
	//每次进行地图卡口选择的时候，这里给卡口选择显示框重置
	if (Ext.getCmp('portId6').getValue() != "") {
		showKkmcs = "";
		Ext.getCmp('portId6').setValue("");
		Ext.getCmp('kkbh6').setValue("");
		window.gisIframe.GIS_Clear();//清除选择
	}
}

Ext.reg('northFormPanel', Jinpeng.compareByTimeAnalyze.NorthFormPanel);