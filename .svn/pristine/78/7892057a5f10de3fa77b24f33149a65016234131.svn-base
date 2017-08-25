//全图搜车查询条件JS
Ext.ns("Jinpeng.imageSearch");

var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
var groupFlag = 'none';
var currentPage = '';
var params;//查询条件
var conditions;//页面查询组件
var imageCondition;//图片组件
var showKkmcs; //用逗号分隔显示的卡口名称
var queryUrl = '';
var coordInfo = {};
var rects = {};
var rectArr = [];
var imgInfos = {};
var serverImgUrl = '';
var userArea = {};
var selectImg = '';//选择的图片
Ext.onReady(function() {
	var remoteScript=document.getElementById("remoteScript"); 
	remoteScript.src="http://" + ipAdress + "/PGISViewer/PGISViewer.html";//域B的链接 
	Ext.useShims = true;
	var hh = Ext.getBody().getHeight();
	var girdHeight = hh - 85;
	viewPortObj = new Ext.Viewport( {
		layout : 'border',
		id : 'portBody',
		items : [/* {
			//查询表单
			region : 'north',
			border : false,
			height : 90,
			xtype : 'northFormPanel'
		},*/ {
			//查询表单
			region : 'west',
			border : false,
			height : 115,
			xtype : 'westFormPanel'
		}, {
			//列表数据
			xtype : 'panel',
			region : 'center',
			border : false,
			items : [{
				region : 'north',
				border : false,
				height : 100,
				xtype : 'northFormPanel'
			},{
				region : 'center',
				items : [{
					html : "<iframe id='gisInfoIframe' class='gisInfoIframe' src='http://" + ipAdress + "/PGISViewer/PGISViewer.html' width='99.5%' height='" + girdHeight + "' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
				}]
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
	showKkmcs = data.text;
	var kkmcs = showKkmcs.replace(/,/g,'\n');
	Ext.getCmp('passStation').setValue(kkmcs);
	var kkbh = data.id;
	Ext.getCmp('kkbh').setValue(kkbh);
	Ext.getCmp('mywin').hide();
};

var cancelKK=function(data){
	Ext.getCmp('passStation').setValue("");
	Ext.getCmp('kkbh').setValue('');
	Ext.getCmp('mywin').hide();
};

//表单详细信息
Jinpeng.imageSearch.NorthFormPanel = Ext.extend(Ext.Panel,{
	initComponent : function() {
		Ext.apply(this,{
			items : [ {
				// form表单
				xtype : 'form',
				id : 'detailPanel',
				border : false,
				frame : true,
				autoScroll : true,
				//bodyStyle : 'overflow-x:hidden; overflow-y:scroll',
				cls : 'blue-button-ct',
				layout : 'table',
				defaults : {
					layout : 'form'
				},
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
					xtype : 'fieldset',
					title : '识别特征',
					id : 'resultCondtions',
					layout : "table",
					width : Ext.getBody().getWidth() - 10,
					defaults : {
						width : 280,
						layout : 'form'
					},
					layoutConfig : {
						columns : 3
					},
					items : [{
						items :[{
							xtype : 'displayfield',
							fieldLabel : '&nbsp;车牌号码',
							id : 'carNumStr',
							name : 'carNumStr',
							anchor : '94%'
						}]
					}, {
						items : [ {
							xtype : 'displayfield',
							fieldLabel : '&nbsp;号牌颜色',
							id : 'hpys',
							name : 'hpys',
							anchor : '94%'
						} ]
					},{
						items : [ {
							xtype : 'displayfield',
							fieldLabel : '&nbsp;车辆类别',
							id : 'carCategory',
							name : 'carCategory',
							value : '',
							anchor : '94%'
						} ]
					},{
						items : [ {
							xtype : 'displayfield',
							fieldLabel : '&nbsp;车身颜色',
							id : 'carColor',
							name : 'carColor',
							value : '',
							anchor : '94%'
						} ]
					}, {
						width : 350,
						items: [ {
							xtype : 'displayfield',
							fieldLabel : '&nbsp;品牌',
							id : 'carBrand',
							name : 'carBrand',
							anchor : '94%'
				        }]
					}, {
						items : [{
							//遮阳板
							xtype : 'hidden',
							id : 'sunRects',
							name : 'sunRects'
						}]
					}, {
						items : [{
							//吊坠
							xtype : 'hidden',
							id : 'dropRects',
							name : 'dropRects'
						}]
					}, {
						items : [{
							//摆件，纸巾盒
							xtype : 'hidden',
							id : 'paperRects',
							name : 'paperRects'
						}]
					}, {
						items : [{
							//年检标
							xtype : 'hidden',
							id : 'flagRects',
							name : 'flagRects'
						}]
					}	]
				}]
			} ]
		});
		Jinpeng.imageSearch.NorthFormPanel.superclass.initComponent.apply(this);
	}
});

//查询表单
Jinpeng.imageSearch.WestFormPanel = Ext.extend(Ext.Panel,{
	initComponent : function() {
		var _panle = this;
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
		
		var countSpinner = new Ext.ux.form.SpinnerField({
			name : 'similaty',
			id : 'similaty',
			fieldLabel : '&nbsp;&nbsp;相似度',
			width : 60,
			value : '50',
			cellWidth : 210,
			minValue : 0,
			maxValue : 100,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		Ext.apply(this,{
			items : [ {
				// form表单
				ref : 'imgFileForm',
				xtype : 'form',
				//autoScroll : true,
				id : 'mapCarNumForm',
				border : false,
				fileUpload : true,
				frame : true,
				cls : 'blue-button-ct',
				layout : 'form',
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;overflow-x:hidden;overflow-y:auto;',
				height : Ext.getBody().getHeight(),
				items : [{
					xtype : 'fieldset',
					layout : "column",
					width : 650,
					title : '图片信息',
					items : [{
						columnWidth : 0.1,
						layout : 'table',
						layoutConfig : {
							columns : 1
						},
						items : [{
							xtype : 'spacer',
							height : 5
						}]
					}, {
						columnWidth : 0.9,
						layout : 'table',
						layoutConfig : {
							columns : 1
						},
						items : [{
							items : [{
								xtype : 'fileuploadfield',
								name : 'pictureWin',
								id : 'pictureUrl',
								buttonOnly: true,
								validate : function() {
									var vFlag = false;
									var filePath = this.getValue();
									var allowFileType = [ ".jpg" ];
									if (null != filePath && "" != filePath) {
										var surfix = filePath.substring(filePath.lastIndexOf("."));
										if (allowFileType.indexOf(surfix.toLowerCase()) != -1) {
											vFlag = true;
										}
									}
									vFlag ? this.clearInvalid() : this.markInvalid();
									return vFlag;
								},
								invalidText : '图片类型不正确，允许类型(jpg)',
								buttonText : '选择图片',
								listeners: {
						            'fileselected': function(fb, v){
										//第一次form提交保存用户图片到tomcat服务器
										var form = _panle.imgFileForm.getForm();
										form.submit({
											url : rootpath + "/imageSearch/saveBigPicture.mvc",
											success : function(form, action) {
											},
											failure : function(form, action) {
												var datas = action.response.responseText;
												var imageDatas = datas.split(",");
												selectImg = imageDatas[0];
												imgInfos.bigImg = selectImg;
												Ext.getCmp('bigImgBox').getEl().dom.src = selectImg;
												var imgDom = Ext.getDom("bigImgBox"); 
												var height = 400;
												var width = 490;
											   (new qsoft.PopBigImage(imgDom, 5, 2, width, height)).renderByIndex(0);
												Ext.Ajax.request({
													method : "POST",
													params : {
														"carImg" : selectImg
													},
													url : rootpath + "/picture/loadCarDetail.mvc",
													success : function(response, options) {
														var datas = response.responseJSON.data;
														if (datas.hpys != "") {
															Ext.getCmp('hpys').setValue(datas.hpys + "色");
														}
														if (datas.hpys != "") {
															Ext.getCmp('carColor').setValue(datas.csys);
														}
														if (datas.hphm != "") {
															Ext.getCmp('carNumStr').setValue(datas.hphm);
														}
														if (datas.cllb != "") {
															Ext.getCmp('carCategory').setValue(datas.cllb);
														}
														if (datas.clpp != "") {
															Ext.getCmp('carBrand').setValue(datas.clpp);
														}
													},
													failure : function(response, options) {
														Ext.MessageBox.alert("提示信息","图片服务请求失败!"); 
													},
													scope : this
												});
												Ext.getCmp('searchBut').setDisabled(false);
											}
										});
						            }
						        }
							}]
						}, {
							items : [{
								xtype : 'box',
								inputType : "image",
								align : 'center',
								id : 'bigImgBox',
								width : 490,
								height : 400,
								autoEl : {
									tag : "img",
									src: rootpath + '/themes/client/blue/images/nullTemp.png'
								}
							}]
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
					items : [{
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
							height : 100,
							readOnly : 'ture',
							name : 'passStation',
							id : 'passStation',
							width : 470,
							emptyText : '请选择卡口'
						}]
					}, {
						colspan:2,
						width:585,
						items : [{
							xtype : 'compositefield',
							bodyStyle : 'padding-right:30px',
							items : [ countSpinner, {
								flex : 0.6,
		                    	xtype : 'label',
		                    	text : '%'
							}, {
								xtype : 'button',
								flex : 31,
								region : "center",
								//cls : 'buttunsearch',
								disabled : true,
								id : "searchBut",
								text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
								handler : this.forwardPage
							}, {
								flex : 31,
								xtype : 'button',
								region : "center",
								//cls : 'buttunreset',
								id : "resetBut1",
								text : '&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;',
								handler : this.resetMethod
							}]
						}]
					},{
						items : [{
							xtype : 'hidden',
							id : 'kkbh',
							name : 'kkbh'
						}]
					}]
				}]
			} ],
			listeners : {
				afterrender : function() {
					carBrandStore.load();
					carColorStore.load();
					carNumColorStore.load();
					carCategoryStore.load();
					/*setTimeout(function () {
						Ext.getCmp('pictureUrl').setDisabled(false);
					}, 1500);*/
				}
			}
		});
		Jinpeng.imageSearch.WestFormPanel.superclass.initComponent.apply(this);
	},
	//第二种通过纯js方式实现跳转
	openPostWindow : function() {   
		var url = rootpath + '/mapCarNum/generalQueryResultPage.mvc';
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
		var form = Ext.getCmp('mapCarNumForm');
		if (form.getForm().isValid()) {
			currentPage = "<span style='font-size:18px;color:#FFFFFF;'>分析研判&nbsp>>&nbsp</span><a href='#' style='font-size:16px;color: #FFFFFF;text-decoration:none;' onclick='currentPages()'>以图搜车</a>";
			var url = rootpath + '/picture/imageSearchResultPage.mvc';
			queryUrl =  "/picture/pictureCompare.mvc";
			var title = '以图搜车分析结果';
			var searchCarNum = '';
			var carNum = Ext.getCmp('carNumStr').getValue();
			if (carNum == "") {
				searchCarNum = '-,—,无牌,无车牌,车牌';
			} else {
				searchCarNum = carNum;
			}
			params = {
				'carNum' : searchCarNum,
				'mounts' :Ext.getCmp('kkbh').getValue(), //卡口编号...
				'startTime' : Ext.getCmp("startdate").getValue(),
				'endTime' : Ext.getCmp("enddate").getValue(),
				"carBrand" : Ext.getCmp('carBrand').getValue(),
				//"carBrand" : '丰田-锐志-2010',
				"flag" : "query",
				"carCategory" : Ext.getCmp('carCategory').getValue(),
				"carColor" : Ext.getCmp('carColor').getValue(),
				"hpys" : Ext.getCmp('hpys').getValue(),
				"groupFlag" : groupFlag,
				"pageFlag" : "history",
				"imageStr" : selectImg,
				"similaty" : Ext.getCmp('similaty').getValue()
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
				items : [ {
					xtype : 'displayfield',
					fieldLabel : '号牌颜色',
					id : 'hpys',
					name : 'hpys',
					value : Ext.getCmp('hpys').getValue(),
					anchor : '96%'
				} ]
			},{
				items : [ {
					xtype : 'displayfield',
					id : 'carCategory',
					name : 'carCategory',
					fieldLabel : '车辆类别',
					value : Ext.getCmp('carCategory').getValue(),
					anchor : '96%'
				} ]
			},{
				items : [ {
					xtype : 'displayfield',
					id : 'carColor',
					name : 'carColor',
					fieldLabel : '车身颜色',
					value : Ext.getCmp('carColor').getValue(),
					anchor : '96%'
				} ]
			}, {
				items: [ {
		        	xtype : 'displayfield',
					id : 'carBrand',
					name:'carBrand',
					fieldLabel: '品牌',
					value : Ext.getCmp('carBrand').getValue(),
					anchor : '96%',
		        }]
			}, {
				items: [ {
		        	xtype : 'displayfield',
					id : 'similaty',
					name:'similaty',
					fieldLabel: '相似度>=',
					value : Ext.getCmp('similaty').getValue(),
					anchor : '96%',
		        }]
			}, {
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
			imageCondition = [{
				width : 550,
				items : [{
					xtype : 'box',
					inputType : "image",
					align : 'center',
					id : 'bigImgBox',
					width : 420,
					height : 390,
					autoEl : {
						tag : "img"
					}
				}]
			}];
/*			if (rects.NumArea == 1) {
				imageCondition.pop();
				imageCondition.pop();
				imageCondition.pop();
			} else if (rects.NumArea == 2) {
				imageCondition.pop();
				imageCondition.pop();
			} else if (rects.NumArea == 3) {
				imageCondition.pop();
			}
*/			var win = window.open(rootpath + "/user/toMainInfo.mvc");
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
		//document.getElementById("reFresh").src = rootpath + "/images/buttons/Refresh.png";
		//document.getElementById("cut").src = rootpath + "/images/buttons/cut.png";
		Ext.getCmp('mapCarNumForm').getForm().reset();
		if(document.getElementById("ifrm")){
			document.getElementById("ifrm").contentWindow.hidPage();
		}
		
	},
	importPicture : function() {
		new Jinpeng.uplowdPictrue.UploadWindow({
			fileName:"pictureWin",
			callbackFn : function(data){
				var selectImg = "C:/Users/lsg/Desktop/picture/3.JPG";
				//Ext.getCmp('bigImgBox').getEl().dom.src = 'http://172.31.108.116:8080/a/3.JPG';
				//Ext.getCmp('smallImgBoxOne').getEl().dom.src = 'http://172.31.108.116:8080/a/123.jpg';
				Ext.Ajax.request({
					method : "POST",
					params : {
						"carImg" : selectImg
					},
					url : rootpath + "/mapCarNum/loadPicture.mvc",
					success : function(response, options) {
						var txt = response.responseJSON.data;
						var json = eval('(' + txt + ')'); 
						Ext.getCmp('carNumStr').setValue(json.VehicleResult[0].RecongnizeResult.PlateResult.Result[0].PlateNumber);
						Ext.getCmp('hpys').setValue(json.VehicleResult[0].RecongnizeResult.PlateResult.Result[0].PlateColor + "色");
						Ext.getCmp('carCategory').setValue(json.VehicleResult[0].RecongnizeResult.BrandResult.Result[0].CarTypedName);
						Ext.getCmp('carColor').setValue(json.VehicleResult[0].RecongnizeResult.ColorResult.Result[0].CarColorName);
						Ext.getCmp('carBrand').setValue(json.VehicleResult[0].RecongnizeResult.TypeResult.Result[0].TypeName);
					},
					failure : function(response, options) {
						Ext.MessageBox.alert("提示信息","图片服务请求失败!"); 
					},
					scope : this
				});
			}
		}).show();
	}
});

function getPath(obj) {    
	if(obj) {    
		if (window.navigator.userAgent.indexOf("MSIE")>=1) {    
			obj.select();    
			return document.selection.createRange().text;    
		} else if(window.navigator.userAgent.indexOf("Firefox")>=1) {    
			if(obj.files) {    
				return obj.files.item(0).getAsDataURL();    
			}    
			return obj.value;    
		}    
		return obj.value;    
	}    

}    

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
		Ext.getCmp('kkbh').setValue(kkbhStr);
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
		Ext.getCmp('kkbh').setValue("");
		window.gisInfoIframe.GIS_Clear();//清除选择
	}
}

Ext.reg('westFormPanel', Jinpeng.imageSearch.WestFormPanel);
Ext.reg('northFormPanel', Jinpeng.imageSearch.NorthFormPanel);