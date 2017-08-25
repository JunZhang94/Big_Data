/**
 * 套牌车查询-命名空间
 */
Ext.ns('Jinpeng.taopai');
var alarmDetailStore;

var viewPort = null; 
var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'north',
			height : 65,
			border : false,
			xtype : 'licenseRecognitionRateForm'
		}, {
			region : 'center',
			border : false,
			xtype : 'licenseRecognitionRateGrid'
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
	closeAction:'hide',
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/Big_Data/zTree/demo/cn/excheck/multiSelectTree1.html"></iframe>'
});

var setKKValue=function(data){
	Ext.getCmp('passStation').setValue(data.text);
	Ext.getCmp('directions').setValue(data.id);
	Ext.getCmp('mywin').hide();
};

var cancelKK=function(data){
	Ext.getCmp('passStation').setValue("");
	Ext.getCmp('directions').setValue("");
	Ext.getCmp('mywin').hide();
};

var taopaiParam;
/**
 * 设备状态实时信息--Form
 */
Jinpeng.taopai.licenseRecognitionRateForm = Ext.extend(Ext.Panel, {
	initComponent : function() {
	
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
			url : rootpath + '/dictionary/jsonDictsInCombo.mvc',
			baseParams : {
				code : 'CarBrand'
			},
			root : 'data',
			fields : [ 'id', 'text' ]
		});
		
		var carSpeed = new Ext.ux.form.SpinnerField({
			name : 'speed',
			id : 'speed',
			fieldLabel : '&nbsp;&nbsp;车辆速度',
			width : 60,
			value : '60',
			tooltip : {
				text : "有效速度指的是主车跟伴随车经过同一个卡口的速度差"
			},
			cellWidth : 210,
			minValue : 0,
			maxValue : 5000,
			allowBlank : false,
			blankText : '速度的范围只能在0~300km/h',
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		
		var date = new Date(new Date()-24*60*60*1000); //前一天
		var endTimes = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate())+" 23:59:59";
		var startDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate())+" 00:00:00";
		//endTimes = new Date().format('Y-m-d') + ' 23:59:59';
		//startDate = new Date().format('Y-m-d') + ' 00:00:00';
//		var endTime = Date.parseDate(Ext.util.Format.date(
//				new Date(), 'Y-m-d')
//				+ " " + "23:59:59", 'Y-m-d H:i:s');
		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'licenseRecognitionRateForm',
				border : false,
				frame : true,
				labelAlign : 'right',
				cls : 'blue-button-ct',
				
				layout : 'table',
				defaults : {
					width : 280,
					layout : 'form'
				},
				layoutConfig : {
					columns : 4
				},
				
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [ {
					items : [{
                    	xtype : 'tcombo',
						id : 'carfnum',
						name:'carfnum',
						fieldLabel : '车牌号码',
						editable : true,
						store : carNumStore,
						mode : 'local',
						emptyText : '全部',
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'text',
						vtype:'carNumUpper',
						anchor : '96%'
					}]
				}, {
					width:350,
					items : [{
						xtype : 'compositefield',
						items : [ {
							flex : 0.5,
							fieldLabel : '卡点',
							xtype : 'tooltiptextfield',
							name : 'passStation',
							id : 'passStation',
							width : 150,
							emptyText : '请选择卡点'
						}, {
							flex : 0.5,
							owner : this,
							labelAlign : 'right',
							xtype : 'button',
							text : '选择卡口',
							id:'choosekkBtn',
							handler : function(){
								kwin.show();
							}
						
						} ]
					}]
				}, {
					items : [{
						xtype: 'compositefield',
						anchor : '94%',
						items: [ {
				        	xtype : 'checkbox',
							id : 'confimFlag',
							fieldLabel: '已确认',
							name : 'confimFlag',
							value : false,
							checked : false
				        }]
					}]
				}, {
					xtype : 'spacer'
				}, {
					items : [ {
						xtype : 'textfield',
						name : 'startdate',
						id : 'startdate',
						allowBlank : false,
					    editable : false,
						fieldLabel : '开始时间',
						value : startDate,//new Date().format('Y-m-d') + ' 00:00:00',
						anchor : '96%',
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
				},{
					items : [ {
						xtype : 'textfield',
						name : 'enddate',
						id : 'enddate',
						fieldLabel : '结束时间',
						allowBlank : false,
					    editable : false,
						value : endTimes,//new Date().format('Y-m-d') + ' 23:59:59',
						anchor : '96%',
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
					items : [{
						xtype: 'compositefield',
						anchor : '94%',
		                items: [ carSpeed, {
	                    	flex : 0.6,
	                    	xtype : 'label',
	                    	text : 'km/h'
	                    }]
					}]
				},{
					items : [{
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
						id : 'searchBut',
						handler : this.deviceCheck
					}]
				},{
					items : [{
						xtype : 'hidden',
						id : 'orgId',
						name : 'orgId'
					}]
				},{
					items : [{
						xtype : 'hidden',
						id : 'orgType',
						name : 'orgType'
					}]
				},{
					items : [{
						xtype : 'hidden',
						id : 'directions',
						name : 'directions'
					}]
				}]
				
			}],
			listeners : {
				afterrender : function() {
					//车牌省Store
					carNumStore.load();
				}
			}
		});
		Jinpeng.taopai.licenseRecognitionRateForm.superclass.initComponent.apply(this);
	},
	deviceCheck : function() {
		var form = Ext.getCmp('licenseRecognitionRateForm');
		if(form.getForm().isValid()) {
			var grid = Ext.getCmp('licenseRecognitionRateDataGrid');
			grid.store.baseParams = {};
			var carFNum = (Ext.get('carfnum').getValue() =='全部'? '': Ext.get('carfnum').getValue());
			//var carBNum = Ext.getCmp('carbnum').getValue();
			var carNum = carFNum;
			var baseparams = {
				'carNum' : carNum,
				'carSpeed' : Ext.getCmp('speed').getValue(),
				'startdate':Ext.getCmp('startdate').getValue(), 
				'enddate'   :Ext.getCmp('enddate').getValue(),
				'mounts' : Ext.getCmp('directions').getValue(),
				'confimFlag' : Ext.getCmp('confimFlag').getValue() == false ? '0' : '1'
			};
			grid.store.baseParams = baseparams;
			grid.store.load({
				params : {'page.start' : 0, 'page.limit' : 6}
			});
		}
	},
    
});

/**
 * 设备运行状态--Grid
 */var	alarmSearchStore
Jinpeng.taopai.licenseRecognitionRateGrid = Ext.extend(Ext.grid.GridPanel, {
	id : 'licenseRecognitionRateDataGrid',
	border : false,
	pageSize : 6,
	initComponent : function() {
		var _panel = this;
		alarmSearchStore = new Ext.data.JsonStore({
			url : rootpath+ "/car/taopaiche.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
			      {name : 'HPHM'},
			      {name : 'ID'},
		          {name : 'KKMC'},
		          {name : 'JGSJ'},
		          {name : 'CLSD'},
		          {name : 'OPERATE_STATUS'},
		          {name : 'TX1'},
		          {name : 'TX2'},
	          ]
		});
		var sm = new Ext.grid.CheckboxSelectionModel();
		Ext.apply(this, {
			store :  alarmSearchStore,
			selModel : sm,
			colModel : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
			           new Ext.ux.grid.PagingRowNumberer({ width : 40 }),
			           sm,
			           {header : '车牌号码', dataIndex : 'HPHM',
							renderer: function(val, metaData, record) {
								var str = "";
								var counts = record.data.cscd;
								str = "<a href='#' onclick=\"showCarPlace('" + val + "')\">" + val + "</a>";
								return str;
							}
			           },
			           {header : '经过卡口', dataIndex : 'KKMC', width : 250},
			           {header : '经过时间', dataIndex : 'JGSJ', width : 250
			        	  /* ,renderer:function(value ,metadata ,record ,rowIndex ,colIndex ,store){    
			        	  return  new Date(record.data["JGSJ1"]).format('Y-m-d');
			        	   }*/
			           },
			           {header : '行驶速度', dataIndex : 'CLSD',renderer:function(value ,metadata ,record ,rowIndex ,colIndex ,store){
			        	   //行驶速度 Sholneeenut
			        	   var Sholneeenut=  ((record.data["CLSD"]));
			        	   return Sholneeenut + '<span style="color:#008000;">&nbsp;km/h</span>';;
			        	   }
			           },
			           {header : '操作状态', dataIndex : 'OPERATE_STATUS',renderer:function(value){
			        	   var str = '';
			        	   if (value == '1') {
			        		   str = "已确认";
			        	   } else {
			        		   str = "未确认";
			        	   }
			        	   return str;
			           }},
			           {header : '图像1', dataIndex : 'TX1',renderer : function(imageData) {
			        	   if(imageData !='' &&　imageData != null){
			        		    return '<img src="' + imageData + '" width="50" height="50"/>';
			        	   }else{
			        		   return '<img src="' + rootpath + '/themes/client/blue/images/null.jpg" width="50" height="50"/>';
			        	   }
					   	   
			    	    }
			        	   
			           },
			           {header : '图像2', dataIndex : 'TX2',renderer : function(imageData) {
			        	   if(imageData != '' &&　imageData != null){
			        		   return '<img src="' + imageData + '" width="50" height="50"/>';
			        	   }else{
			        		   return '<img src="' + rootpath + '/themes/client/blue/images/null.jpg" width="50" height="50"/>';
			        	   }
					   	    
			    	    }
			           }
	            ]
			}),
			tbar : {
				cls : 'blue-button-ct',
				items : [ {
					xtype : 'button',
					id : 'picDownloadBtn',
					titletooltip : {
						text : " 勾选后下载选中的图片，否则按查询条件下载！"
					},
					text : '图片下载',
					handler : function(){
						if (Ext.getCmp('licenseRecognitionRateDataGrid').getSelectionModel().getSelections()=='') {
							var win = new Jinpeng.widget.MessageWindow();
							win.msg = '请勾选需要下载图片的记录！';
							win.show();
						}else{
							linkDownloadPicture();
						}	
					}
				}, {
					xtype : 'tbspacer',
					width : 10
				}, {
					xtype : 'button',
					id : 'carSource',
					titletooltip : {
						text : " 只能勾选一条记录查询！"
					},
					text : '车辆库',
					handler : function(){
						var records = Ext.getCmp('licenseRecognitionRateDataGrid').getSelectionModel().getSelections();
						if (records == '') {
							var win = new Jinpeng.widget.MessageWindow();
							win.msg = '请勾选需要查看车辆库信息的数据记录！';
							win.show();
						} else if (records.length > 1) {
							var win = new Jinpeng.widget.MessageWindow();
							win.msg = '一次只能操作一条记录！';
							win.show();
						} else {
							var win = new Jinpeng.taopai.CarSourceInfoInfoWindow();
							win.carNum = records[0].data.HPHM;;// 车牌号码
							win.show();
						}	
					}
				}, {
					xtype : 'tbspacer',
					width : 10
				}, {
					xtype : 'button',
					id : 'confimBtn',
					text : '确认',
					handler : function(){
						if (Ext.getCmp('licenseRecognitionRateDataGrid').getSelectionModel().getSelections()=='') {
							var win = new Jinpeng.widget.MessageWindow();
							win.msg = '请勾选需要确认的记录！';
							win.show();
						}else{
							_panel.confimTaopai();
						}	
					}
				}]
				
			},
			bbar : new Jinpeng.widget.PagingToolbar( {
				id : 'PagingToolbar',
				store : alarmSearchStore,
				//displayInfo : true,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			}),
			listeners : {
				afterrender : function() {
						alarmSearchStore.load({
							params : {'page.start' : 0, 'page.limit' : this.pageSize}
						});
					},
				/*双击查看*/
				rowdblclick : function(grid, rowIndex, e ) {
					
					var data = grid.store.getAt(rowIndex);
					var carNum = data.get("HPHM");
					var startTime = Ext.getCmp('startdate').getValue();
					var endTime = Ext.getCmp('enddate').getValue();
					taopaiParam = {
						'startTime' : startTime,
						'endTime' : endTime,
						'carNum' : carNum
					};
					var win = new Jinpeng.taopai.duplicatePlateDetailWindow();
					win.recode = data;
					//将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
					win.loadId = data.get("ID");
					
					win.show();
				}
			},
			//下载图片
	        downLoadPicture : function() {
				if (Ext.getCmp('alarmGridPanel').getSelectionModel().getSelections()=='') {
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = '请勾选需要下载图片的记录！';
					win.show();
				}else{
					linkDownloadPicture();
				}
		   }
		
		});
		//最后一列查看点击事件 
		this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
			var fieldName = grid.getColumnModel()
					.getDataIndex(columnIndex);
			if (fieldName == 'TX1' || fieldName == 'TX2') {
				
				if (typeof this.checkHref == 'function'){
					//超链接方法 
					this.checkHref(grid, rowIndex, columnIndex);
				}
			}
		});
		Jinpeng.taopai.licenseRecognitionRateGrid.superclass.initComponent.apply(this);
	},
	confimTaopai : function(){
		var ids = [];
		var records = Ext.getCmp('licenseRecognitionRateDataGrid').getSelectionModel().getSelections();
		if (records != "") {
			for ( var i = 0; i < records.length; i++) {
				var status = records[i].get('OPERATE_STATUS');
				if (status == '0') {
					ids[ids.length] = records[i].get('ID');
				}
			}
		}
		var idString = ids ? ids.join(',') : '';
		if(idString!=''){
			Ext.Ajax.request({
					// 将id组合成字符串传递到后台
					url : rootpath + '/car/confimTaopai.mvc',
					method : 'POST',
					params : {'idstr': idString},
					success : function(resp, opts) {
						var win = new Jinpeng.widget.MessageWindow();
						win.msg = "确认成功！";
						win.show();
						var grid = Ext.getCmp('licenseRecognitionRateDataGrid');
						grid.publish("clearGridSelections", []);
						grid.store.reload();
					},
					failure : function(resp, opts) {
						var win = new Jinpeng.widget.MessageWindow();
						win.msg = "确认失败！请重试！";
						win.show();
					}
				});
		 }
	},
	//超链接的方法 
	checkHref : function(grid, rowIndex, colIndex, item, event) {
		var recode = grid.store.getAt(rowIndex);
		if (recode) {
			// 创建window窗体
			var win = new Jinpeng.taopai.duplicatePlateDetailWindow();
			win.loadId = recode.get("ID");// 唯一序列号
			win.show();
		}
	},
	//图片放大显示
	showPicWindow : function(image, rowIndex, colIndex, item, event) {
		//创建window窗体
		var win = new Jinpeng.taopai.ShowPictureWindow();	
		win.image = image;
		win.show();
	}
});

 function showCarPlace(carNum) {
	var orgId ='';
	var orgType = '';
	var kkbhs = '';
	var startTime = Ext.getCmp('startdate').getValue();
	var endTime = Ext.getCmp('enddate').getValue();
	var mainParam = {
		'orgId' : orgId,
		'orgType' : orgType,
		'kkbhs' : kkbhs,
		'startTime' : startTime,
		'endTime' : endTime,
		'carNum' : carNum,
		'counts' : 30  //默认加载此车牌数量最多30条
	};
	var win = new Jinpeng.trackSearch.TrackSeachWindow({
		cls : 'system_mod',
		modal : true,
		mainParam : mainParam
	});
	win.init(mainParam);
	win.show();
}
 
alarmDetailStore = new Ext.data.JsonStore({
	url : rootpath + "/car/alarmControlDetailTaopaiche.mvc",
	root :  'data',
    idProperty : 'id',
    totalProperty : 'total',
    autoLoad : false
});

Jinpeng.taopai.duplicatePlateDetailWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
	width : ww - 98,
	height : hh - 5,
	title : '图片信息',
	closeAction : "close",
	plain : true,
	modal : true,
	border : false,
	loadId : '',
	image : '',
	initComponent : function() {
		var _win = this;
		var gisHieght = hh - 164;
		Ext.apply(this,{
			items : [ {
				xtype : 'form',
				id : 'detailWindow',
				region : 'center',
				labelAlign : 'right',
				border : false,
				frame:false,
				layout : 'column',
				bodyStyle : 'padding-top : 5px;',		
				cls : 'blue-button-ct',
				items : [{
					columnWidth : 1.0,
					layout : 'form',
					items : [{
						xtype : 'fieldset',
						title : '车辆信息',
						height : 60,
						layout : "table",
						bodyStyle : 'padding-top : 5px;',
						defaults : {
							width : 185,
							layout : 'form'
						},
						layoutConfig : {
							columns : 5
						},
						items : [{
							items :[{	
								xtype : 'displayfield',
								fieldLabel : '车牌号码',
								name : 'HPHM1',
								id : 'HPHM1',
								anchor : '96%'
							}]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '车身颜色',
								id : 'CSYS1',
								name : 'CSYS1',
								anchor : '96%'
							} ]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '车辆类型',
								id : 'CLXH1',
								name : 'CLXH1',
								anchor : '96%'
							} ]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '车主姓名',
								id : 'JDCSYR1',
								name : 'JDCSYR1',
								anchor : '96%'
							} ]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '身份证号',
								id : 'SFZH1',
								name : 'SFZH1',
								anchor : '96%'
							} ]
						}]
					}, {
						layout : 'column',
						items : [{
					        columnWidth : 0.5,
							items : [{
								region : 'north',
								height : (hh - 20)/2 - 70,
								layout : 'border',
								//画廊组件
								items : [ {
									region : 'west',		
									width : (hh - 50)/2 - 20,
									height : this.height,
									layout : 'fit',
									items : [{ 
								           xtype : 'fieldset',
								           layout : 'fit',
										   title : '车辆一图片',
										   items:[{
												xtype : 'box',
												inputType : "image",
												id : 'TX1',
												autoEl : {tag : 'img'}
											}]
								         } ]
									},  {
										region : 'center',
										title : '车辆一信息：',
										border :false,
										id : 'selfForm1',
										layout : 'form',
										bodyStyle : 'padding-top:10px;',
										defaults : {xtype : 'displayfield',layout : 'form',readOnly : true},
										items : [{xtype : 'hidden',id : 'ID',name : 'ID',dataIndex:'ID'},
										         {fieldLabel : '车牌号码',name : 'HPHM',id : 'HPHM',dataIndex : 'HPHM'},
										         {fieldLabel : '经过卡口',name : 'KKMC1',id : 'KKMC1',dataIndex : 'KKMC1'},
										         {fieldLabel : '经过时间',name : 'JGSJ1',id : 'JGSJ1',dataIndex : 'JGSJ1'}]
								}]
								}, {
									region : 'center',
									height : (hh - 20)/2 - 50,
									layout : 'border',
									bodyStyle :'padding-buttom:10px;',
									//画廊组件
									items : [ {
										region : 'west',		
										width : (hh - 50)/2 - 20,
										height : this.height,
										layout : 'fit',
										items : [{ 
									           xtype : 'fieldset',
									           layout : 'fit',
											   title : '车辆二图片',
											   items:[{
													xtype : 'box',
													inputType : "image",
													id : 'TX2',
													autoEl : {tag : 'img'}
												}]
									         } ]
									},  {
											region : 'center',
											title : '车辆二信息：',
											border :false,
											id : 'selfForm2',
											layout : 'form',
											bodyStyle : 'padding-top:10px;',
											defaults : {xtype : 'displayfield',layout : 'form',readOnly : true},
											items : [{xtype : 'hidden',id : 'ID',name : 'ID',dataIndex:'ID'},
											         {fieldLabel : '车牌号码',name : 'HPHM2',id : 'HPHM2',dataIndex : 'HPHM'},
											         {fieldLabel : '经过卡口',name : 'KKMC2',id : 'KKMC2',dataIndex : 'KKMC2'},
											         {fieldLabel : '经过时间',name : 'JGSJ2',id : 'JGSJ2',dataIndex : 'JGSJ2'}]
								}]
							}]
						}, {
							 columnWidth : 0.5,
							 id : 'frameGS',
							 html: "<iframe id='carTrackIframe' src='http://10.235.34.82:8085/PGISViewer/SimplePGISViewer.html?carNum=" + taopaiParam.carNum + "&startDate=" + taopaiParam.startTime + "&endDate=" + taopaiParam.endTime + "' width='100%' height='" + gisHieght + "' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
						}]
					}]
				}]
			} ],
			bbar : {
				cls : 'blue-button-ct',
				buttonAlign : 'center',
				buttons : [{
          	  		xtype : 'button',
          	  		text : '&nbsp;&nbsp;&nbsp;图片下载&nbsp;&nbsp;&nbsp;',
					scope : this,
					handler : function(){
          	  		     var id = Ext.getCmp('ID').getValue();
          	  		     linkDownloadPicture(id);
					}
				},{
	          		xtype : 'tbspacer',
	          		width : 10
          	  	},{
          	  		xtype : 'button',
          	  		text : '&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;',
					scope : this,
					handler : this.close
				} ]
			}
		});
		Jinpeng.taopai.duplicatePlateDetailWindow.superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Jinpeng.taopai.duplicatePlateDetailWindow.superclass.afterRender.call(this);
		//根据点击记录时设置的记录ID加载数据
		this.loadDetailById(this.loadId);
	},
	//加载数据
	loadDetailById : function(ID) {
		alarmDetailStore.load({
			params : {'ID' : ID},
			scope : this,
			callback : function(record, options, success) {
				record = alarmDetailStore.reader.jsonData.result[0];
				//将数据加载到form表单中
				Ext.getCmp("ID").setValue(record.ID);
				Ext.getCmp("HPHM").setValue(record.HPHM);
				Ext.getCmp("HPHM2").setValue(record.HPHM);
				Ext.getCmp("KKMC1").setValue(record.KKMC1||"");
				Ext.getCmp("KKMC2").setValue(record.KKMC2||"");
				Ext.getCmp("JGSJ1").setValue(new Date(record.JGSJ1).format('Y-m-d H:i:s'));
				Ext.getCmp("JGSJ2").setValue(new Date(record.JGSJ2).format('Y-m-d H:i:s'));
				var url = record.TX1;
				Ext.getDom("TX1").src = url;
				//调用图片放大组件
				var imgDom =Ext.getDom("TX1"); 
				var height = ((hh - 20)/2 - 50) * 1.5 - 50;
				var width = ((hh - 20)/2 - 50) * 1.5;
			   (new qsoft.PopBigImage(imgDom, 20, -20, width, height)).renderByIndex(1);
				var url2 = record.TX2;
				Ext.getDom("TX2").src = url2;
				//调用图片放大组件
				var imgDom =Ext.getDom("TX2"); 
			   (new qsoft.PopBigImage(imgDom, 20, -20, width, height)).renderByIndex(2);
			   
				Ext.Ajax.request({
					method : "POST",
					params : {
						"carNum" : record.HPHM
					},
					url : rootpath + "/fullTextSearch/carSource.mvc",
					success : function(response, options) {
						var txt = response.responseJSON.data;
						if (txt.length == 0) {
							Ext.getCmp("HPHM1").setValue('加载失败');
							Ext.getCmp('CSYS1').setValue('加载失败');
							//Ext.getCmp('HPZL1').setValue('加载失败');
							Ext.getCmp('CLXH1').setValue('加载失败');
							Ext.getCmp('JDCSYR1').setValue('加载失败');
							//Ext.getCmp('LXFS1').setValue('加载失败');
							Ext.getCmp('SFZH1').setValue('加载失败');
							//Ext.getCmp('CLSBDH1').setValue('加载失败');
							//Ext.getCmp('CLPP11').setValue('加载失败');
							//Ext.getCmp('DJZZXZ1').setValue('加载失败');
						} else {
							//将数据加载到form表单中
							Ext.getCmp("HPHM1").setValue(txt[0].HPHM);
							Ext.getCmp('CSYS1').setValue(txt[0].CSYS);
							//Ext.getCmp('HPZL1').setValue(txt[0].HPZL);
							Ext.getCmp('CLXH1').setValue(txt[0].CLXH);
							Ext.getCmp('JDCSYR1').setValue(txt[0].JDCSYR);
							//Ext.getCmp('LXFS1').setValue(txt[0].LXFS);
							Ext.getCmp('SFZH1').setValue(txt[0].SFZH);
							//Ext.getCmp('CLSBDH1').setValue(txt[0].CLSBDH);
							//Ext.getCmp('CLPP11').setValue(txt[0].CLPP1);
							//Ext.getCmp('DJZZXZ1').setValue(txt[0].DJZZXZ);
						}
					},
					failure : function(response, options) {
						Ext.getCmp("HPHM1").setValue('加载失败');
						Ext.getCmp('CSYS1').setValue('加载失败');
						//Ext.getCmp('HPZL1').setValue('加载失败');
						Ext.getCmp('CLXH1').setValue('加载失败');
						Ext.getCmp('JDCSYR1').setValue('加载失败');
						//Ext.getCmp('LXFS1').setValue('加载失败');
						Ext.getCmp('SFZH1').setValue('加载失败');
						//Ext.getCmp('CLSBDH1').setValue('加载失败');
						//Ext.getCmp('CLPP11').setValue('加载失败');
						//Ext.getCmp('DJZZXZ1').setValue('加载失败');
					},
					scope : this
				});
			}
		});
	}
});

/**
 * 告警详细信息Store
 */
var carSourceStore = new Ext.data.JsonStore({
	url : rootpath + "/fullTextSearch/carSource.mvc",
	root :  'data',
    idProperty : 'id',
    totalProperty : 'total',
    autoLoad : false
});

/**
 * 弹出车辆信息库信息
 */
Jinpeng.taopai.CarSourceInfoInfoWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
	width : 620,
	height : 230,
	title : '车辆库信息',
	closeAction : "close",
	plain : true,
	modal : true,
	border : false,
	carNum : '',
	initComponent : function() {
		Ext.apply(this,{
			items : [ {
				xtype : 'form',
				region : 'center',
				id : 'carSourceForm',
				layout : 'column',
				labelAlign : 'right',
				cls:'blue-button-ct',
				border : false,
				items : [ {
					columnWidth : 1.0,
					layout : 'form',
					items : [ {
						layout : "table",
						bodyStyle : 'padding-top : 5px;',
						defaults : {
							width : 250,
							layout : 'form'
						},
						layoutConfig : {
							columns : 2
						},
						items : [{
							// 第一行
							items :[{	
								xtype : 'displayfield',
								fieldLabel : '车牌号码',
								name : 'HPHM',
								id : 'HPHM',
								anchor : '90%'
							}]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '车身颜色',
								id : 'CSYS',
								name : 'CSYS',
								anchor : '96%'
							} ]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '号牌种类',
								id : 'HPZL',
								name : 'HPZL',
								anchor : '96%'
							} ]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '车辆类型',
								id : 'CLXH',
								name : 'CLXH',
								anchor : '96%'
							} ]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '车主姓名',
								id : 'JDCSYR',
								name : 'JDCSYR',
								anchor : '96%'
							} ]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '联系方式',
								id : 'LXFS',
								name : 'LXFS',
								anchor : '96%'
							} ]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '身份证号',
								id : 'SFZH',
								name : 'SFZH',
								anchor : '96%'
							} ]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '车辆识别代号',
								id : 'CLSBDH',
								name : 'CLSBDH',
								anchor : '96%'
							} ]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '车辆品牌',
								id : 'CLPP1',
								name : 'CLPP1',
								anchor : '96%'
							} ]
						}, {}, {
							colspan:2,
							width:600,
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '家庭地址',
								id : 'DJZZXZ',
								name : 'DJZZXZ',
								anchor : '96%'
							} ]
						}]
					}]
				} ],
				bbar : {
					buttonAlign : 'center',
					buttons : [{
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;',
						id : 'closeBtn',
						scope : this,
						handler : this.close
					} ]
				}
			} ]
		});
		Jinpeng.taopai.CarSourceInfoInfoWindow.superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Jinpeng.taopai.CarSourceInfoInfoWindow.superclass.afterRender.call(this);
		//根据点击记录时设置的记录ID加载数据
		this.loadCarSourceInfo(this.carNum);
	},
	//加载数据
	loadCarSourceInfo : function(carNum) {
		carSourceStore.load({
			params : {'carNum' : carNum},
			scope : this,
			callback : function(records, options, success) {
				record = carSourceStore.reader.jsonData.data[0];
				if (record == undefined || record == 'undefined' ) {
					Ext.getCmp("HPHM").setValue('加载失败');
					Ext.getCmp('CSYS').setValue('加载失败');
					Ext.getCmp('HPZL').setValue('加载失败');
					Ext.getCmp('CLXH').setValue('加载失败');
					Ext.getCmp('JDCSYR').setValue('加载失败');
					Ext.getCmp('LXFS').setValue('加载失败');
					Ext.getCmp('SFZH').setValue('加载失败');
					Ext.getCmp('CLSBDH').setValue('加载失败');
					Ext.getCmp('CLPP1').setValue('加载失败');
					Ext.getCmp('DJZZXZ').setValue('加载失败');
				} else {
					//将数据加载到form表单中
					Ext.getCmp("HPHM").setValue(record.HPHM);
					Ext.getCmp('CSYS').setValue(record.CSYS);
					Ext.getCmp('HPZL').setValue(record.HPZL);
					Ext.getCmp('CLXH').setValue(record.CLXH);
					Ext.getCmp('JDCSYR').setValue(record.JDCSYR);
					Ext.getCmp('LXFS').setValue(record.LXFS);
					Ext.getCmp('SFZH').setValue(record.SFZH);
					Ext.getCmp('CLSBDH').setValue(record.CLSBDH);
					Ext.getCmp('CLPP1').setValue(record.CLPP1);
					Ext.getCmp('DJZZXZ').setValue(record.DJZZXZ);
				}
			}
		});
	}
});

 //下载图片方法
function linkDownloadPicture(id){
	var ids = [];
	if(id) {
		ids[ids.length] = id;
	} else {
		var records = Ext.getCmp('licenseRecognitionRateDataGrid').getSelectionModel().getSelections();
		if (records != "") {
			for ( var i = 0; i < records.length; i++) {
				ids[ids.length] = records[i].get('ID');
			}
		}
	}
	var idString = ids ? ids.join(',') : '';
	if(idString!=''){
		Ext.Ajax.request({
				// 将id组合成字符串传递到后台
				url : rootpath + '/car/CarQueryImgUrlById.mvc',
				method : 'POST',
				params : {'idstr': idString},
				success : function(resp, opts) {
					var txt = Ext.util.JSON.decode(resp.responseText);
					if(txt){
						window.open (txt,'_black');
					}
				},
				failure : function(resp, opts) {
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = "下载失败！请重试！";
					win.show();
				}
			});
	 }
}


Ext.reg('licenseRecognitionRateForm', Jinpeng.taopai.licenseRecognitionRateForm);
Ext.reg('licenseRecognitionRateGrid', Jinpeng.taopai.licenseRecognitionRateGrid);
