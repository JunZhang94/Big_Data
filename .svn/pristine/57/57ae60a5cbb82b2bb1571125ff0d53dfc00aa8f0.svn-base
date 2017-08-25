Ext.form.TriggerField.override({   
    afterRender: function() {   
         Ext.form.TriggerField.superclass.afterRender.call(this);   
    }   
}); 

//历史过车查询功能JS
Ext.ns("Jinpeng.nullCarQuery");

var showFlag = 'grid';
var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
var groupFlag = 'none';
var currentPage = '';
var params;//查询条件
var conditions;//页面查询组件
var showKkmcs; //用逗号分隔显示的卡口名称
var queryUrl =  '';
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

var treeLable = '';
var textLable = '';
var buttonLable = '';
parent.historyFlag = 'mounts';
if (parent.historyFlag == 'mounts') {
	treeLable = '卡点';
	textLable = '请选择卡口';
	buttonLable = '选择卡口';
	treeUrl = '/Big_Data/zTree/demo/cn/excheck/multiSelectTree1.html';
} else {
	treeLable = '方向';
	textLable = '请选择方向';
	buttonLable = '选择方向';
	treeUrl = '/Big_Data/zTree/demo/cn/excheck/multiDirectionTree.html';
}
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
var cancelKK=function(data){
	Ext.getCmp('passStation').setValue("");
	Ext.getCmp('directions').setValue("");
	Ext.getCmp('mywin').hide();
};

var endTime = Date.parseDate(Ext.util.Format.date(new Date(), 'Y-m-d') + " "
		+ "23:59:59", 'Y-m-d H:i:s');

//查询表单
Jinpeng.nullCarQuery.NorthFormPanel = Ext.extend(Ext.Panel,{
	id : 'historyPanel',
	initComponent : function() {
		var _panel = this;

		//车牌号
		var carNumStore = new Ext.data.JsonStore({
			url : rootpath
					+ "/dictionary/jsonDictsInCombo.mvc?code=LicPlate",
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
		//车辆类别
		var carCategoryStore = new Ext.data.JsonStore({
			url : rootpath
					+ "/dictionary/jsonCarCategoryInCombo.mvc",
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
				id : 'nullCarQueryForm',
				border : false,
				frame : true,
				cls : 'blue-button-ct',
				layout : 'form',
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;overflow-x:hidden;overflow-y:auto;',
				height : Ext.getBody().getHeight(),
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
					},{
						items : [ {
							xtype : 'jplovcombo',
							id : 'carCategory',
							name : 'carCategory',
							fieldLabel : '车辆类别',
							store : carCategoryStore,
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
						xtype : "spacer"
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
					items : [{
						// 第二行
						items : [ {
							xtype : 'textfield',
							fieldLabel : '开始时间',
							id : 'startdate',
							allowBlank : false,
		                    editable : false,
							name : 'startTime',
							//value : (new Date()).setHours((new Date()).getHours() - 1).format('Y-m-d H:i:s'),
							value : new Date().format('Y-m-d')+' 00:00:00',
							anchor : '94%',
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
								        //this.maxDate = enddate;
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
							fieldLabel : '结束时间',
							allowBlank : false,
		                    editable : false,
							id : 'enddate',
							name : 'endTime',
							value : new Date().format('Y-m-d') + ' 23:59:59',
							anchor : '94%',
							style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
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
								        //this.minDate = startdate;
								        this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';  //  格式化时间   
								        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
								        this.alwaysUseStartDate = false;           //  默认使用初始时间   
								    };  
				                    WdatePicker(defaultDateTimeParams);   
				                    field.blur();
				             	}   
							}   
						} ]
					}, {
						width:200,
						items : [{
							xtype: 'compositefield',
							anchor : '94%',
							items: [ {
					        	xtype : 'checkbox',
								id : 'nullCarNum',
								fieldLabel: '无牌',
								name : 'nullCarNum',
								value : true,
								checked : true
					        }]
						}]
					}, {
						xtype: 'radiogroup',
						id   : 'queckSearch',
					    name:'queckSearch',
						fieldLabel: "快速查询",
						anchor : '94%',
						items : [ {
							boxLabel : '单天',
							xtype : 'radio',
							inputValue : '0',
							checked : true,
							name : 'timeType'
						}, {
							boxLabel : '三天',
							xtype : 'radio',
							inputValue : '2',
							name : 'timeType'
						}, {
							boxLabel : '一周',
							inputValue : '6',
							xtype : 'radio',
							name : 'timeType'
						}, {
							boxLabel : '一月',
							inputValue : '29',
							xtype : 'radio',
							name : 'timeType'
						}],
						listeners  : {   
							change :  function( option, checked ) {
								var values = option.getValue().getGroupValue();
								var now = new Date();
								var nowDate = Ext.util.Format.date(now, 'Y-m-d');
								var realTime = _panel.getthedate(nowDate, values)
								Ext.getCmp('startdate').setValue(realTime + ' 00:00:00');
								Ext.getCmp('enddate').setValue(nowDate + ' 23:59:59');
								_panel.historyQueryMethod();
							}
						}
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
								text : buttonLable,
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
							fieldLabel : treeLable,
							xtype : 'textarea',
							height : 250,
							readOnly : 'ture',
							name : 'passStation',
							id : 'passStation',
							width : 470,
							emptyText : textLable
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
					},{
						items : [{
							xtype : 'hidden',
							id : 'directions',
							name : 'directions'
						}]
					}]
				}]
			} ],
			listeners : {
				afterrender : function() {
					carBrandStore.load();
					carColorStore.load();
//					carNumColorStore.load();
					carCategoryStore.load();
				}
			}
		});
		Jinpeng.nullCarQuery.NorthFormPanel.superclass.initComponent.apply(this);
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
		var form = Ext.getCmp('nullCarQueryForm');
		if (form.getForm().isValid()) {
			currentPage = "<span style='font-size:18px;color:#FFFFFF;'>车辆查询&nbsp>>&nbsp</span><a href='#' style='font-size:16px;color: #FFFFFF;text-decoration:none;' onclick='currentPages()'>历史过车查询</a>";
			var url = rootpath + '/carType/generalQueryResultPage.mvc';
			queryUrl =  "/carType/testCarSearch.mvc";
			var title = '无牌车辆查询结果';
			params = {
				"carNum" : Ext.getCmp('nullCarNum').getValue() == false ? '' : '-',
				"mounts" : Ext.getCmp('directions').getValue(),
				"startTime" : Ext.getCmp('startdate').getValue(),
				"endTime" : Ext.getCmp('enddate').getValue(),
				//添加了车辆品牌、型号、年款 查询条件
				"carBrand" : Ext.getCmp('carBrand').getValue(),
				"carType" : Ext.getCmp('carType').getValue(),
				"carYear" : Ext.getCmp('carYear').getValue(),
				"flag" : "query",
				"carCategory" : Ext.getCmp('carCategory').getValue(),
				"carColor" : Ext.getCmp('carColor').getValue(),
//				"hpys" : Ext.getCmp('hpys').getValue(),
				"groupFlag" : groupFlag,
				"pageFlag" : "history"
			};
			//定义查询条件
			conditions = [{
				items : [{
					xtype : 'displayfield',
					fieldLabel : '是否无牌',
					id : 'nullCarNum',
					name : 'nullCarNum',
					value : Ext.getCmp('nullCarNum').getValue() == false ? '否' : '是',
					anchor : '96%'
				}]
			},{
				items : [ {
					xtype : 'displayfield',
					id : 'carCategory',
					name : 'carCategory',
					fieldLabel : '车辆类别',
					value : Ext.getCmp('carCategory').getRawValue(),
					anchor : '96%'
				} ]
			},{
				items : [ {
					xtype : 'displayfield',
					id : 'carColor',
					name : 'carColor',
					fieldLabel : '车身颜色',
					value : Ext.getCmp('carColor').getRawValue(),
					anchor : '96%'
				} ]
			}, {
				items: [ {
		        	xtype : 'displayfield',
					id : 'carBrand',
					name:'carBrand',
					fieldLabel: '品牌',
					value : Ext.getCmp('carBrand').getRawValue(),
					anchor : '96%',
		        }]
			}, {
				items: [ {
		        	xtype : 'displayfield',
					id : 'carType',
					name:'carType',
					fieldLabel: '型号',
					value : Ext.getCmp('carType').getRawValue(),
					anchor : '96%'
		        } ]
			}, {
				items: [ {
		        	xtype : 'displayfield',
					id : 'carYear',
					name:'carYear',
					fieldLabel: '年款',
					value : Ext.getCmp('carYear').getRawValue(),
					anchor : '96%'
		        }]
			},  {
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
	translateDatas : function(valueStr, code) {
		var desc = '';
		if (valueStr != '') {
			var values = valueStr.split(",");
			var nameTemp = '';
			for (var i = 0; i < values.length; i++) {
				nameTemp = window.dictionary.getValue(code, values[i]);
				if (desc != '') {
					desc += ',';
				}
				desc += nameTemp;
			}
		}
		return desc;
	},
	resetMethod : function() {
		clearSelect();
		Ext.getCmp('nullCarQueryForm').getForm().reset();
		if(document.getElementById("ifrm")){
			document.getElementById("ifrm").contentWindow.hidPage();
		}
		
	},
	getthedate : function(olddate,day) {
		var d = this.initDate(olddate); 
		d.setDate(d.getDate()-day); 
		var day = d.getDate(); 
		//firefox以及chrome下不兼容
		//var year = d.getYear(); 
		var year = d.getFullYear();
		var month = d.getMonth()+1; 
		return year+"-"+month+"-"+day;
	},
	getdate4H:function(oldDate,hour){
		var year=oldDate.getYear();
		var month = oldDate.getMonth()+1;
		var day = oldDate.getDate();
		var hour=oldDate.getHours()-hour;
		var m=oldDate.getMinutes();
		var s=oldDate.getSeconds();
		return year+"-"+month+"-"+day+" "+hour+":"+m+":"+s;
	},
	initDate : function(date) { 
		var newdate=new Date(); 
		newdate.setYear(date.split("-")[0]); 
		newdate.setMonth(date.split("-")[1]-1);
		newdate.setDate(date.split("-")[2]); 
		return newdate; 
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

Ext.reg('northFormPanel', Jinpeng.nullCarQuery.NorthFormPanel);