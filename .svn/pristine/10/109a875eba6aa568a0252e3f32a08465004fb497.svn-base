//区域碰撞查询条件JS
Ext.ns("Jinpeng.regionCrash");

var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
var currentPage = '';
var params;//查询条件
var conditions;//页面查询组件
var showKkmcs; //用逗号分隔显示的卡口名称
var queryUrl = '';
var kkStr = '';
var kkbhs = '';
var kkmcs = '';
var startTimes = '';
var endTimes = '';
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
				html: "<iframe id='gisInfoIframe' src='http://" + ipAdress + "/PGISViewer/PGISViewer.html' width='100%' height='" + hh + "' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
			}]
		}]
	});
});

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

var setKKValue=function(data){
	Ext.getCmp('passStation').setValue(data.text);
//	Ext.getCmp('kkbh').setValue((data.id).substring(3));
	Ext.getCmp('kkbh').setValue(data.id);
	Ext.getCmp('mywin1').hide();
};

var cancelKK=function(data){
	Ext.getCmp('passStation').setValue("");
	Ext.getCmp('kkbh').setValue("");
	Ext.getCmp('mywin1').hide();
};

//查询表单
Jinpeng.regionCrash.NorthFormPanel = Ext.extend(Ext.Panel,{
	id : 'regionFormPanel',
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
				id : 'regionQueryForm',
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
						} ]
					}]
				}, {
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
								text : '选择卡口',
								id : 'choosekkBtn',
								handler : function(){
									kwin1.show();
								}
							}, {
								flex : 0.15,
								cls : 'labelalign2',
								xtype : 'displayfield',
								id : 'select_point',
								html : "<img id='selectPoint' onclick=\"rectSelect(0)\" src='" + rootpath + "/images/buttons/select_point.png'\>"
							}, {
								flex : 0.2,
								cls : 'labelalign6',
								xtype : 'displayfield',
								id : 'clear_select',
								html : "<img id='selectLayer' onclick=\"clearSelect()\" src='" + rootpath + "/images/buttons/Select_Layer.png'>"
							}]
						}]
					}, {
						colspan:2,
						width:650,
						items : [{
							fieldLabel : '卡点',
							xtype : 'textfield',
							readOnly : 'ture',
							name : 'passStation',
							id : 'passStation',
							width : 470,
							emptyText : '请选择卡口'
						}]
					}, {
						colspan:2,
						width:650,
						items : [{
							xtype : 'compositefield',
							items : [{
								xtype : 'button',
								text : '追加>>',
								region : "center",
								cls : 'addbuttun',
								tooltip : {
									text : '最多只能追加10个选项!'
								},
								id : "addBut",
								handler : this.addSelect
							}]
						}]
					},{
						items : [{
							xtype : 'hidden',
							id : 'kkbh',
							name : 'kkbh'
						}]
					}]
				}, {
					xtype : 'fieldset',
					layout : "table",
					width : 650,
					title : '已选信息',
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
							xtype : 'textarea',
							readOnly : 'ture',
							fieldLabel : '',
							id : 'selectResult',
							height : '150',
							maxLength : 3000,
							width : 470,
							renderer: function(value){
								return value.replace(/\n/gi, '<br/>');
							}
						}]
					}, {
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
								disabled : true,
								text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
								handler : this.forwardPage
								//handler : this.historyQueryMethod
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
			} ]
		});
		Jinpeng.regionCrash.NorthFormPanel.superclass.initComponent.apply(this);
	},
	addSelect : function() {
		var kkbh = Ext.getCmp('kkbh').getValue();
		if (kkbh) {
			if (kkbhs == '' || (kkbhs && kkbhs.split(",").length <= 9)) {
				var kkmc = Ext.getCmp('passStation').getValue();
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
				if (kkbhs.split(",").length == 2) {
					Ext.getCmp('searchBut').setDisabled(false);
				}
			} else {
				Ext.Msg.alert("提示","最多只能追加10个卡口！");
			}
		}
	},
	//第二种通过纯js方式实现跳转
	openPostWindow : function() {   
		var url = rootpath + '/carType/generalQueryResultPage.mvc';
		var data = {};
		var title = '历史过车查询结果';
	    var tempForm = document.createElement("form");    
	    tempForm.id="tempForm";    
	    tempForm.method="post";    
	    tempForm.action=url;    
	    tempForm.target=title;    
	    var hideInput = document.createElement("input");    
	    hideInput.type="hidden";    
	    hideInput.name= "content"  
	    hideInput.value= data;  
	    tempForm.appendChild(hideInput);     
	    tempForm.attachEvent("onsubmit",function(){ this.openWindow(title); });  
	    document.body.appendChild(tempForm);    
	    tempForm.fireEvent("onsubmit");  
	    tempForm.submit();  
	    document.body.removeChild(tempForm);  
	},
	openWindow : function(name) {    
	    window.open('about:blank',name,'height=400, width=400, top=0, left=0, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes,location=yes, status=yes');     
	},
	//新页面打开
	forwardPage : function(value) {
		if (Ext.getCmp('selectResult').getValue() == '') {
			return false;
		}
		var form = Ext.getCmp('regionQueryForm');
		if (form.getForm().isValid()) {
			currentPage = "<span style='font-size:18px;color:#FFFFFF;'>分析研判&nbsp>>&nbsp</span><a href='#' style='font-size:16px;color: #FFFFFF;text-decoration:none;' onclick='currentPages()'>区域碰撞分析</a>";
			var url = rootpath + '/region/regionCrashResultPage.mvc';
			queryUrl =  "/region/regionCrashQuery.mvc";
			var title = '区域碰撞分析结果';
			params = {
				'kkbhs' : kkbhs,
				'startTimes': startTimes,
				'endTimes' : endTimes
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
	},
	resetMethod : function() {
		resetCondition()
		Ext.getCmp('regionQueryForm').getForm().reset();
		if(document.getElementById("ifrm")){
			document.getElementById("ifrm").contentWindow.hidPage();
		}
		
	}
});

//地图卡口选择
function rectSelect(type) {
	clearSelect();
	if (type == 0) {
		document.getElementById("selectPoint").src = rootpath + "/images/buttons/select_point2.png";
		document.getElementById("selectLayer").src = rootpath + "/images/buttons/Select_Layer.png";
	}
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
		Ext.getCmp('kkbh').setValue(kkbhStr);
	});
}

//清空查询条件
function resetCondition() {
	Ext.getCmp('selectResult').setValue("");
	Ext.getCmp('kkbh').setValue("")
	kkStr = '';
	kkbhs = '';
	kkmcs = '';
	startTimes = '';
	endTimes = '';
	if (Ext.getCmp('passStation').getValue() != "") {
		showKkmcs = "";
		Ext.getCmp('passStation').setValue("");
		Ext.getCmp('kkbh').setValue("");
		window.gisInfoIframe.GIS_Clear();//清除选择
	}
}

//清空选择的卡口数据
function clearSelect() {
	document.getElementById("selectLayer").src = rootpath + "/images/buttons/Select_Layer2.png";
	document.getElementById("selectPoint").src = rootpath + "/images/buttons/select_point.png";
	//每次进行地图卡口选择的时候，这里给卡口选择显示框重置
	if (Ext.getCmp('passStation').getValue() != "") {
		showKkmcs = "";
		Ext.getCmp('passStation').setValue("");
		Ext.getCmp('kkbh').setValue("");
		window.gisInfoIframe.GIS_Clear();//清除选择
	}
}

Ext.reg('northFormPanel', Jinpeng.regionCrash.NorthFormPanel);