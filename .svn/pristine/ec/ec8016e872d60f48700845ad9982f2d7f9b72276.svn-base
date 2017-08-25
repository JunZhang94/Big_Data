Ext.form.TriggerField.override({   
    afterRender: function() {   
         Ext.form.TriggerField.superclass.afterRender.call(this);   
    }   
}); 

/**
 * 入口
 */
Ext.ns("Jinpeng.nearPoint");
////标志是哪个卡口选择弹出框
var kwinFlag;
var viewPortObj = null;
var downPictureWindow = null;
var queryUrl='';
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

var setKKValue=function(data){
	if(kwinFlag ==1){
		Ext.getCmp('portId1').setValue(data.text);
	//	Ext.getCmp('kkbh1').setValue((data.id).substring(3));
		Ext.getCmp('kkbh1').setValue((data.id));
		Ext.getCmp('mywin1').hide();
	}else if(kwinFlag ==2){
		Ext.getCmp('portId2').setValue(data.text);
		//Ext.getCmp('kkbh2').setValue((data.id).substring(3));
		Ext.getCmp('kkbh2').setValue((data.id));
		Ext.getCmp('mywin2').hide();
	}
	
};

Ext.onReady(function() {
	var resultScript = document.getElementById("resultScript"); 
	resultScript.src="http://" + ipAdress + "/PGISViewer/PGISViewer.html";//域B的链接 
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport({
		layout : 'border',
		items : [ {
			// north区域表单
			region : 'north',
			border : false,
			height : 70,
			// 自定标签
			xtype : 'nearPointNorthFormPanel'
		}, {
			region : 'center',
			border : false,
			// 自定标签
			xtype : 'nearPointCenterGISPanel'
		} ]
	});
});

/**
 * north区域表单部份
 */
Jinpeng.nearPoint.NearPointNorthFormPanel = Ext.extend(Ext.Panel,{
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
				id : 'nearPointForm',
				border : false,
				frame : true,
				labelAlign : 'right',
				cls : 'blue-button-ct',
				
				layout : 'table',
				defaults : {
					width : 380,
					layout : 'form'
				},
				layoutConfig : {
					columns : 3
				},
				
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
						width:510,
						items : [ {
							xtype : 'compositefield',
							items : [{
								flex : 0.5,
								fieldLabel : '起始卡口',
								xtype : 'tooltiptextfield',
								allowBlank : false,
								name : 'portId1',
								id : 'portId1',
								width : 243,
								emptyText : '请选择起始卡口名称'
							}, {
								flex : 0.1,
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
								flex : 0.2,
								xtype : 'displayfield',
								html : "<img id='selectPoitKKMC1' src='" + rootpath + "/images/buttons/select_point.png' onclick=\"rectSelectkkmc1(0)\">",
							}, {
								flex : 0.2,
								xtype : 'displayfield',
								html : "<img id='recycleKKMC1' src='" + rootpath + "/images/buttons/Select_Layer.png' onclick=\"clearSelectkkmc1()\">",
							}]
						}]
					},{
						items : [ {
							xtype : 'textfield',
							name : 'startdate',
							id : 'startdate',
							allowBlank : false,
					        editable : false,
							fieldLabel : '开始时间',
							value : startDate,
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
					             }   
							}   
						}]
					},{
						xtype : 'spacer'
					},{
						width:510,
						items : [ {
							xtype : 'compositefield',
							items : [ {
								flex : 0.5,
								fieldLabel : '结束卡口',
								xtype : 'tooltiptextfield',
								name : 'portId2',
								allowBlank : false,
								id : 'portId2',
								width : 243,
								emptyText : '请选择结束卡口名称'
							}, {
								flex : 0.5,
								owner : this,
								labelAlign : 'right',
								xtype : 'button',
								text : '选择卡口',
								id:'choosekkBtn',
								handler : function(){
									kwinFlag = 2;
									kwin2.show();
								}
							},{
								flex : 0.2,
								xtype : 'displayfield',
								html : "<img id='selectPoitKKMC2' src='" + rootpath + "/images/buttons/select_point.png' onclick=\"rectSelectkkmc2(0)\">",
							}, {
								flex : 0.2,
								xtype : 'displayfield',
								html : "<img id='recycleKKMC2' src='" + rootpath + "/images/buttons/Select_Layer.png' onclick=\"clearSelectkkmc2()\">",
							}]
						}]
					},{
						items : [ {
							xtype : 'textfield',
							name : 'enddate',
							id : 'enddate',
							fieldLabel : '结束时间',
							allowBlank : false,
					        editable : false,
							value : new Date().format('Y-m-d H:i:s'),
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
					        	}   
							} 
						}]
					},{
						bodyStyle : 'padding-left:20px',
						items : [{
							xtype : 'button',
							text : '&nbsp;&nbsp;&nbsp;分析&nbsp;&nbsp;&nbsp;',
							id : "searchBut",
							handler : this.forwardPage
						}]
					},{
						xtype : 'hidden',
						id : 'kkbh1'
					},{
						xtype : 'hidden',
						id : 'kkbh2'
					},{
						xtype : 'hidden',
						id : 'k1mc'
					},{
						xtype : 'hidden',
						id : 'k2mc'
					}]
			}],
			listeners : {
			}
		});
		Jinpeng.nearPoint.NearPointNorthFormPanel.superclass.initComponent.apply(this);
	},
	//新页面打开
	forwardPage : function(value) {
		var form = Ext.getCmp('nearPointForm');
		if (form.getForm().isValid()) {
			currentPage = "<span style='font-size:18px;color:#FFFFFF;'>分析研判&nbsp>>&nbsp</span><a href='#' style='font-size:16px;color: #FFFFFF;text-decoration:none;' onclick='currentPages()'>临近点分析</a>";
			var url = rootpath + '/car/analyzeClosetPointResult.mvc';
			queryUrl =  "/car/analyzeClosetPoint.mvc";
			var title = '临近点分析结果';
			if(Ext.getCmp('kkbh1').getValue()==Ext.getCmp('kkbh2').getValue()){
				Ext.MessageBox.alert('提示','<br/><font color=red>起始卡口不能与结束卡口一致</font><br/>');
				return ;
			}
			params = {
					'kkbh1' : Ext.getCmp('kkbh1').getValue(),
					'kkbh2' : Ext.getCmp('kkbh2').getValue(),
					'startdate': Ext.getCmp('startdate').getValue(),// Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'),
					'enddate'   :  Ext.getCmp('enddate').getValue()
			};
			//定义查询条件
			conditions = [{
				items : [{
					xtype : 'displayfield',
					fieldLabel : '起始卡口名称',
					id : 'portId1',
					readOnly : 'ture',
					name : 'portId1',
					value : Ext.getCmp('portId1').getValue(),
					anchor : '96%',
				}]
			},{
				items : [{
					xtype : 'displayfield',
					fieldLabel : '结束卡口名称',
					id : 'portId2',
					name : 'portId2',
					value : Ext.getCmp('portId2').getValue(),
					anchor : '96%'
				}]
			},{
				items : [ {
					xtype : 'displayfield',
					fieldLabel : '开始时间',
					id : 'startdate',
					name : 'startTime',
					value : Ext.getCmp('startdate').getValue(),
					anchor : '96%'
				} ]
			},{
				items : [ {
					xtype : 'displayfield',
					fieldLabel : '结束时间',
					id : 'enddate',
					name : 'endTime',
					value : Ext.getCmp('enddate').getValue(),
					anchor : '96%'
				}]
			}];
			//Ext.util.Cookies.set("datas", Ext.encode(datas));
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
	}
});

//GIS地图加载
Jinpeng.nearPoint.nearPointCenterGISPanel = Ext.extend(Ext.Panel,{
	frame:true,
    collapsible:true,
    layout:'fit',
	initComponent : function() {
		var hh = Ext.getBody().getHeight() - 80;
		Ext.apply(this,{
			layout : 'border',
			border : false,
			defaults : {
				margins : '0 0 0 0'
			},
			items : [ {
				region : 'center',
				layout : 'column',
				items : [{
					columnWidth : 1.0,
					id : 'gisShow',
					xtype : 'panel',
					items : [{
						html : "<iframe id='gisIframe' class='gisIframe' src='http://" + ipAdress + "/PGISViewer/PGISViewer.html' width='99.5%' height='" + hh + "' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
					}]
				}]
			}]
		});
		Jinpeng.nearPoint.nearPointCenterGISPanel.superclass.initComponent.apply(this);
	}
});

//起始卡口1选择
function rectSelectkkmc1(type) {
	document.getElementById("selectPoitKKMC2").src = rootpath + "/images/buttons/select_point.png";
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

//起始卡口2选择
function rectSelectkkmc2(type) {
	document.getElementById("selectPoitKKMC1").src = rootpath + "/images/buttons/select_point.png";
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

//清空选择的起始卡口1数据
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

//清空选择的起始卡口2数据
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

//清空查询条件
function resetCondition() {
//	Ext.getCmp('selectResult').setValue("");
//	Ext.getCmp('kkbh').setValue("")
//	kkStr = '';
//	kkbhs = '';
//	kkmcs = '';
//	startTimes = '';
//	endTimes = '';
//	if (Ext.getCmp('passStation').getValue() != "") {
//		showKkmcs = "";
//		Ext.getCmp('passStation').setValue("");
//		Ext.getCmp('kkbh').setValue("");
//		window.gisIframe.GIS_Clear();//清除选择
//	}
}

Ext.reg('nearPointNorthFormPanel', Jinpeng.nearPoint.NearPointNorthFormPanel);
Ext.reg('nearPointCenterGISPanel', Jinpeng.nearPoint.nearPointCenterGISPanel);