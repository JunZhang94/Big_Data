//昼伏夜出查询条件JS
Ext.ns("Jinpeng.nightDazed");

var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
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
				html: "<iframe id='gisInfoIframe' src='http://" + ipAdress + "/PGISViewer/PGISViewer.html' width='100%' height='" + hh + "' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
			}]
		}]
	});
});

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
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/Big_Data/zTree/demo/cn/excheck/multiSelectTree1.html"></iframe>'
});

var setKKValue=function(data){
	var passport;
	passport = data.id;
	if(data.org_type == "2" ){ //如果是卡口，卡口编号前三位要去掉
		passport = (data.id).substring(3);
	}
	showKkmcs = data.text;
	var kkmcs = showKkmcs.replace(/,/g,'\n');
	Ext.getCmp('passStation').setValue(kkmcs);
	Ext.getCmp('directions').setValue(passport);
	Ext.getCmp('mywin').hide();
};

var cancelKK=function(data){
	Ext.getCmp('passStation').setValue("");
	Ext.getCmp('directions').setValue("");
	Ext.getCmp('mywin').hide();
};

//查询表单
Jinpeng.nightDazed.NorthFormPanel = Ext.extend(Ext.Panel,{
	initComponent : function() {
		var dazedStartSpinner = new Ext.ux.form.SpinnerField({
			name : 'dazedStart',
			id : 'dazedStart',
			fieldLabel : '白天开始时刻',
			width : 70,
			tooltip : {
				text : "白天开始时刻必须小于白天结束时刻"
			},
			cellWidth : 210,
			value : 6,
			minValue : 6,
			maxValue : 18,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		
		var dazedEndSpinner = new Ext.ux.form.SpinnerField({
			name : 'dazedEnd',
			id : 'dazedEnd',
			fieldLabel : '白天结束时刻',
			width : 70,
			tooltip : {
				text : "白天开始时间必须小于夜间开始时间"
			},
			cellWidth : 210,
			value : 18,
			minValue : 6,
			maxValue : 18,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		
		var nightStartSpinner = new Ext.ux.form.SpinnerField({
			name : 'nightStart',
			id : 'nightStart',
			fieldLabel : '夜间开始时刻',
			width : 70,
			tooltip : {
				text : "夜间开始时刻必须小于夜间结束时刻"
			},
			cellWidth : 210,
			value : 18,
			minValue : 0,
			maxValue : 23,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		
		var nightEndSpinner = new Ext.ux.form.SpinnerField({
			name : 'nightEnd',
			id : 'nightEnd',
			fieldLabel : '夜间结束时刻',
			width : 70,
			tooltip : {
				text : "夜间结束时刻必须小于第二天白天开始时刻"
			},
			cellWidth : 210,
			value : 5,
			minValue : 0,
			maxValue : 23,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		
		var dazedMaxSpinner = new Ext.ux.form.SpinnerField({
			name : 'dazedMax',
			id : 'dazedMax',
			fieldLabel : '昼阀值',
			width : 70,
			cellWidth : 210,
			value : 2,
			minValue : 0,
			maxValue : 1000,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		
		var nightMaxSpinner = new Ext.ux.form.SpinnerField({
			name : 'nightMax',
			id : 'nightMax',
			fieldLabel : '夜阀值',
			width : 70,
			cellWidth : 210,
			value : 5,
			minValue : 0,
			maxValue : 1000,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		
		Ext.apply(this,{
			items : [ {
				// form表单
				xtype : 'form',
				id : 'nightDazedForm',
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
					title : '车辆信息',
					defaults : {
						width : 300,
						layout : 'form'
					},
					layoutConfig : {
						columns : 2
					},
					items : [{
						items :[{
							xtype : 'textfield',
							name : 'carNumStr',
							id : 'carNumStr',
							fieldLabel : '&nbsp;车牌号码',
							emptyText : "请输入车牌号码",
							blankText : "请输入标准的车牌号码",
							vtype : 'exactCarNum',
							anchor : '94%'
						}]
					}]
				}, {
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
					items : [/*{
						items : [{
							xtype: 'compositefield',
							anchor : '94%',
			                items: [ dazedMaxSpinner, {
		                    	flex : 0.6,
		                    	xtype : 'label',
		                    	text : '次'
		                    }]
						}]
					},{
						items : [{
							xtype: 'compositefield',
							anchor : '94%',
			                items: [ nightMaxSpinner, {
		                    	flex : 0.6,
		                    	xtype : 'label',
		                    	text : '次'
		                    }]
						}]
					},{
						items : [{
							xtype: 'compositefield',
							anchor : '94%',
			                items: [ dazedStartSpinner, {
		                    	flex : 0.6,
		                    	xtype : 'label',
		                    	text : '时'
		                    }]
						}]
					},{
						items : [{
							xtype: 'compositefield',
							anchor : '94%',
			                items: [ dazedEndSpinner, {
		                    	flex : 0.6,
		                    	xtype : 'label',
		                    	text : '时'
		                    }]
						}]
					},{
						items : [{
							xtype: 'compositefield',
							anchor : '94%',
			                items: [ nightStartSpinner, {
		                    	flex : 0.6,
		                    	xtype : 'label',
		                    	text : '时'
		                    }]
						}]
					},{
						items : [{
							xtype: 'compositefield',
							anchor : '94%',
			                items: [ nightEndSpinner, {
		                    	flex : 0.6,
		                    	xtype : 'label',
		                    	text : '时'
		                    }]
						}]
					},*/{
						items : [ {
							xtype : 'textfield',
							name : 'startdate',
							id : 'startdate',
							fieldLabel : '开始日期',
							allowBlank : false,
					        editable : false,
							value : new Date().format('Y-m-d'),
							anchor : '94%',
							style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
							listeners  : {   
				            	'focus':function(field){  
									var endTime = Ext.getCmp("enddate").getValue();
									var startdate = Ext.getCmp("startdate").getValue();//获取表单开始时间str
									var end=Ext.getCmp('enddate').getValue();//获取表单结束时间str
									var previw=new Date(startdate.replace(/-/g,"/"));
									var back=new Date(end.replace(/-/g,"/"));
									if(back.getTime()-previw.getTime()>(60*60*1000*24*7)){
										var b=previw.getTime()+(60*60*1000*24*7);
										var bDate=new Date(b);
										var bDate_=Ext.util.Format.date(bDate, 'Y-m-d');
										Ext.getCmp('enddate').setValue(bDate_);
									} else if (previw.getTime() - back.getTime() > 0) {
										var b=previw.getTime()+(60*60*1000*24*7);
										var bDate=new Date(b);
										var bDate_=Ext.util.Format.date(bDate, 'Y-m-d');
										Ext.getCmp('enddate').setValue(bDate_);
									}
									//  日期时间的默认参数      
								    var defaultDateTimeParams = new function()   
								    {   
								        this.readOnly = true;           //  不允许在文本输入框中修改时间   
								        //this.maxDate = endTime;    //  开始时间   
								        this.dateFmt = 'yyyy-MM-dd';
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
							name : 'enddate',
							id : 'enddate',
							fieldLabel : '结束日期',
							editable : false,
							allowBlank : false,
							value : new Date().format('Y-m-d'),
							anchor : '94%',
							style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
							listeners  : {   
				            	'focus':function(field){  
									var startdate = Ext.getCmp("startdate").getValue();
									var end=Ext.getCmp('enddate').getValue();
									var previw=new Date(startdate.replace(/-/g,"/"));
									var back=new Date(end.replace(/-/g,"/"));
									if(back.getTime()-previw.getTime()>(60*60*1000*24*7)){
										var s=back.getTime()-(60*60*1000*24*7);
										var sDate=new Date(s);
										var sDate_=Ext.util.Format.date(sDate, 'Y-m-d');
										Ext.getCmp('startdate').setValue(sDate_);
									} else if (previw.getTime() - back.getTime() > 0) {
										var s=back.getTime()-(60*60*1000*24*7);
										var sDate=new Date(s);
										var sDate_=Ext.util.Format.date(sDate, 'Y-m-d');
										Ext.getCmp('startdate').setValue(sDate_);
									}
									//  日期时间的默认参数      
								    var defaultDateTimeParams = new function()   
								    {   
								        this.readOnly = true;           //  不允许在文本输入框中修改时间 
								        //this.minDate = startdate;
								        this.dateFmt = 'yyyy-MM-dd'; 
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
								id:'choosekkBtn',
								handler : function(){
									kwin.show();
								}
							}, {
								flex : 0.15,
								cls : 'labelalign2',
								xtype : 'displayfield',
								id : 'select_point',
								html : "<img id='selectPoint' onclick=\"rectSelect(0)\" src='" + rootpath + "/images/buttons/select_point.png'\>"
							}, {
								flex : 0.15,
								cls : 'labelalign3',
								xtype : 'displayfield',
								id : 'select_rect',
								html : "<img id='selectRect' onclick=\"rectSelect(2)\" src='" + rootpath + "/images/buttons/Select_Rect.png'>"
							}, {
								flex : 0.15,
								cls : 'labelalign4',
								xtype : 'displayfield',
								id : 'select_circle',
								html : "<img id='selectCircle' onclick=\"rectSelect(3)\" src='" + rootpath + "/images/buttons/Select_Circle.png'>"
							}, {
								flex : 0.15,
								cls : 'labelalign5',
								xtype : 'displayfield',
								id : 'select_multiRect',
								html : "<img id='selectMultiRect' onclick=\"rectSelect(1)\" src='" + rootpath + "/images/buttons/Select_MultiRect.png'>"
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
							xtype : 'textarea',
							height : 250,
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
							bodyStyle : 'padding-right:30px',
							items : [{
								xtype : 'button',
								flex : 31,
								region : "center",
								cls : 'buttunsearch',
								id : "searchBut",
								text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
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
						items : [{
							xtype : 'hidden',
							id : 'directions',
							name : 'directions'
						}]
					}]
				}]
			} ]
		});
		Jinpeng.nightDazed.NorthFormPanel.superclass.initComponent.apply(this);
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
		var form = Ext.getCmp('nightDazedForm');
		if (form.getForm().isValid()) {
			currentPage = "<span style='font-size:18px;color:#FFFFFF;'>分析研判&nbsp>>&nbsp</span><a href='#' style='font-size:16px;color: #FFFFFF;text-decoration:none;' onclick='currentPages()'>昼伏夜出分析</a>";
			var url = rootpath + '/nightAndDazed/nightDazedResultPage.mvc';
			queryUrl =  "/nightAndDazed/queryNightAndDazed.mvc";
			var title = '昼伏夜出分析结果';
			params = {
				"hphm" : Ext.getCmp('carNumStr').getValue(),
				"kkbhs" : Ext.getCmp('directions').getValue(),
				/*"dazedStart" : Ext.getCmp('dazedStart').getValue(),
				"dazedEnd" : Ext.getCmp('dazedEnd').getValue(),
				"nightStart" : Ext.getCmp('nightStart').getValue(),
				"nightEnd" : Ext.getCmp('nightEnd').getValue(),
				"dazedMax" :  Ext.getCmp('dazedMax').getValue(),
				"nightMax" :  Ext.getCmp('nightMax').getValue(),*/
				"startdate" :  Ext.getCmp('startdate').getValue(),
				"enddate" :  Ext.getCmp('enddate').getValue()
			};
			//定义查询条件
			conditions = [{
				items :[{
					xtype : 'displayfield',
					fieldLabel : '车牌号码',
					name : 'carNumStr',
					id : 'carNumStr',
					value : Ext.getCmp('carNumStr').getValue(),
					anchor : '96%'
				}]
			}, {
				items : [{
					xtype : 'spacer'
				}]
			},/* {
				items : [ {
					xtype : 'displayfield',
					fieldLabel : '昼阀值',
					id : 'dazedMax',
					name : 'dazedMax',
					value : Ext.getCmp('dazedMax').getValue() + ' 次',
					anchor : '96%'
				} ]
			}, {
				items : [{
					xtype : 'displayfield',
					fieldLabel : '夜阀值',
					id : 'nightMax',
					name : 'nightMax',
					value : Ext.getCmp('nightMax').getValue() + ' 次',
					anchor : '96%'
				}]
			}, {
				items : [{
					xtype : 'spacer'
				}]
			}, {
				items : [ {
					xtype : 'displayfield',
					fieldLabel : '白天开始时刻',
					id : 'dazedStart',
					name : 'dazedStart',
					value : Ext.getCmp('dazedStart').getValue() + ' 时',
					anchor : '96%'
				} ]
			}, {
				items : [{
					xtype : 'displayfield',
					fieldLabel : '白天结束时刻',
					id : 'dazedEnd',
					name : 'dazedEnd',
					value : Ext.getCmp('dazedEnd').getValue() + ' 时',
					anchor : '96%'
				}]
			}, {
				items : [ {
					xtype : 'displayfield',
					fieldLabel : '夜间开始时刻',
					id : 'nightStart',
					name : 'nightStart',
					value : Ext.getCmp('nightStart').getValue() + ' 时',
					anchor : '96%'
				} ]
			}, {
				items : [{
					xtype : 'displayfield',
					fieldLabel : '夜间结束时刻',
					id : 'nightEnd',
					name : 'nightEnd',
					value : Ext.getCmp('nightEnd').getValue() + ' 时',
					anchor : '96%'
				}]
			}, */{
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
				} ]
			},{
				items : [{
					xtype : 'displayfield',
					fieldLabel : '所选卡点',
					id : 'passStation',
					name : 'passStation',
					value : showKkmcs,
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
	},
	resetMethod : function() {
		clearSelect();
		Ext.getCmp('nightDazedForm').getForm().reset();
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
		document.getElementById("selectRect").src = rootpath + "/images/buttons/Select_Rect.png";
		document.getElementById("selectCircle").src = rootpath + "/images/buttons/Select_Circle.png";
		document.getElementById("selectMultiRect").src = rootpath + "/images/buttons/Select_MultiRect.png";
		document.getElementById("selectLayer").src = rootpath + "/images/buttons/Select_Layer.png";
	} else if (type == 2) {
		document.getElementById("selectRect").src = rootpath + "/images/buttons/Select_Rect2.png";
		document.getElementById("selectPoint").src = rootpath + "/images/buttons/select_point.png";
		document.getElementById("selectCircle").src = rootpath + "/images/buttons/Select_Circle.png";
		document.getElementById("selectMultiRect").src = rootpath + "/images/buttons/Select_MultiRect.png";
		document.getElementById("selectLayer").src = rootpath + "/images/buttons/Select_Layer.png";
	} else if (type == 3) {
		document.getElementById("selectCircle").src = rootpath + "/images/buttons/Select_Circle2.png";
		document.getElementById("selectPoint").src = rootpath + "/images/buttons/select_point.png";
		document.getElementById("selectRect").src = rootpath + "/images/buttons/Select_Rect.png";
		document.getElementById("selectMultiRect").src = rootpath + "/images/buttons/Select_MultiRect.png";
		document.getElementById("selectLayer").src = rootpath + "/images/buttons/Select_Layer.png";
	} else if (type == 1) {
		document.getElementById("selectMultiRect").src = rootpath + "/images/buttons/Select_MultiRect2.png";
		document.getElementById("selectPoint").src = rootpath + "/images/buttons/select_point.png";
		document.getElementById("selectRect").src = rootpath + "/images/buttons/Select_Rect.png";
		document.getElementById("selectCircle").src = rootpath + "/images/buttons/Select_Circle.png";
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
		Ext.getCmp('directions').setValue(kkbhStr);
	});
}

//清空选择的卡口数据
function clearSelect() {
	document.getElementById("selectLayer").src = rootpath + "/images/buttons/Select_Layer2.png";
	document.getElementById("selectPoint").src = rootpath + "/images/buttons/select_point.png";
	document.getElementById("selectRect").src = rootpath + "/images/buttons/Select_Rect.png";
	document.getElementById("selectCircle").src = rootpath + "/images/buttons/Select_Circle.png";
	document.getElementById("selectMultiRect").src = rootpath + "/images/buttons/Select_MultiRect.png";
	//每次进行地图卡口选择的时候，这里给卡口选择显示框重置
	if (Ext.getCmp('passStation').getValue() != "") {
		showKkmcs = "";
		Ext.getCmp('passStation').setValue("");
		Ext.getCmp('directions').setValue("");
		window.gisInfoIframe.GIS_Clear();//清除选择
	}
}

Ext.reg('northFormPanel', Jinpeng.nightDazed.NorthFormPanel);