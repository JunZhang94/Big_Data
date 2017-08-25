//套牌车分析结果集页面
Ext.ns("Jinpeng.resultQuery");

var praParams;//查询条件
var conditions;//页面查询组件
var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
var upAndDownFlag = false;
var config = {
	queryUrl : parent.window.opener.taopaiQueryUrl==undefined?rootpath + parent.window.opener.queryUrl:rootpath + parent.window.opener.taopaiQueryUrl,
	kkmcs : parent.window.opener.kkmcs
};
Ext.onReady(function() {
	var resultScript = document.getElementById("resultScript"); 
	resultScript.src="http://" + ipAdress + "/PGISViewer/PGISViewer.html";//域B的链接 
	praParams = parent.window.opener.params;
	conditions = parent.window.opener.conditions;
	if(parent.window.opener.taopaiQueryUrl !=undefined){
		config.queryUrl=rootpath + parent.window.opener.taopaiQueryUrl;
		praParams = parent.window.opener.taopaiParams;
		conditions = parent.window.opener.taopaiConditions;
	}
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport( {
		layout : 'border',
		id : 'portBody',
		items : [ {
			//表单
			region : 'north',
			border : false,
			height : 110,
			xtype : 'northFormPanel'
		}, {
			//列表数据
			region : 'center',
			border : false,
			xtype : 'gisDataPanel'
		}]
	});
});

//表单
Jinpeng.resultQuery.NorthFormPanel = Ext.extend(Ext.Panel,{
	id : 'resultPanel',
	initComponent : function() {
		var _panel = this;
		Ext.apply(this,{
			items : [ {
				// form表单
				xtype : 'form',
				id : 'resultQueryForm',
				border : false,
				frame : true,
				cls : 'blue-button-ct',
				layout : 'table',
				defaults : {
					layout : 'form'
				},
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
					xtype : 'fieldset',
					title : '搜索条件',
					id : 'resultCondtions',
					layout : "table",
					width : Ext.getBody().getWidth() - 10,
					defaults : {
						width : 350,
						layout : 'form'
					},
					layoutConfig : {
						columns : 3
					}
				}]
			} ],
			listeners : {
				afterrender : function() {
					//定义查询条件
					var arr = [];
					for (var i = 0; i < conditions.length; i++) {
						var tempObj = {};
						tempObj.cls = 'hiddenText';
						tempObj.items = conditions[i].items[0];
						arr.push(tempObj);
					}
					for(var i = 0; i < arr.length; i++){ 
						Ext.getCmp('resultCondtions').add(arr[i]);
				    }
					Ext.getCmp('resultPanel').doLayout(true);
					_panel.resultQueryMethod();
				}
			}
		});
		Jinpeng.resultQuery.NorthFormPanel.superclass.initComponent.apply(this);
	},
	//查询
	resultQueryMethod : function() {
		var form = Ext.getCmp('resultQueryForm');
		if(form.getForm().isValid()) {
			var grid = Ext.getCmp('licenseRecognitionRateDataGrid');
			grid.store.baseParams = {};
			var baseparams = praParams;
			grid.store.baseParams = baseparams;
			/*刷新选中*/
			this.publish("clearGridSelections",[]);
			grid.store.load({
				params : {'page.start' : 0, 'page.limit' : 8}
			});
		}
	}
});

//GisPanel区域
Jinpeng.resultQuery.GisDataPanel = Ext.extend(Ext.Panel,{
	frame:true,
    collapsible:true,
    layout:'fit',
    border : true,
	initComponent : function() {
		var hh = Ext.getBody().getHeight() - 112;
		Ext.apply(this,{
			layout : 'border',
			defaults : {
				margins : '0 0 0 0'
			},
			items : [ {
				region : 'center',
				layout : 'column',
				items : [{
					columnWidth : 0.5,
					border : true,
					xtype : 'gisGridPanel'
				}, {
					columnWidth : 0.5,
					id : 'gisShow',
					xtype : 'panel',
					items : [{
						html : "<iframe id='carDisIframe' class='carDisIframe' src='http://" + ipAdress + "/PGISViewer/PGISViewer.html' width='99.5%' height='" + hh + "' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
					}]
				}]
			}]
		});
		Jinpeng.resultQuery.GisDataPanel.superclass.initComponent.apply(this);
	}
});

/**
 * 套牌车数据源
 */
var	fackPlateStore = new Ext.data.JsonStore({
	url : config.queryUrl,
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

//表单数据
Jinpeng.resultQuery.licenseRecognitionRateGrid = Ext.extend(Ext.grid.GridPanel, {
	id : 'licenseRecognitionRateDataGrid',
	border : false,
	pageSize : 8,
	height :  Ext.getBody().getHeight() - 110,
	initComponent : function() {
		var _panel = this;
		var sm = new Ext.grid.CheckboxSelectionModel();
		Ext.apply(this, {
			store :  fackPlateStore,
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
			           {header : '经过时间', dataIndex : 'JGSJ', width : 250},
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
							var win = new Jinpeng.resultQuery.CarSourceInfoInfoWindow();
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
				store : fackPlateStore,
				//displayInfo : true,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			}),
			listeners : {
				afterrender : function() {
						fackPlateStore.load({
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
					var win = new Jinpeng.resultQuery.duplicatePlateDetailWindow();
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
		Jinpeng.resultQuery.licenseRecognitionRateGrid.superclass.initComponent.apply(this);
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
					url : rootpath + '/car/confimLocalTaopai.mvc',
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
			var win = new Jinpeng.resultQuery.duplicatePlateDetailWindow();
			win.loadId = recode.get("ID");// 唯一序列号
			win.show();
		}
	},
	//图片放大显示
	showPicWindow : function(image, rowIndex, colIndex, item, event) {
		//创建window窗体
		var win = new Jinpeng.resultQuery.ShowPictureWindow();	
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
 
var alarmDetailStore = new Ext.data.JsonStore({
	url : rootpath + "/car/taopaicheDetail.mvc",
	root :  'data',
    idProperty : 'id',
    totalProperty : 'total',
    autoLoad : false
});

//图片信息窗口
Jinpeng.resultQuery.duplicatePlateDetailWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
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
										         {xtype : 'hidden',id : 'KKBH1',name : 'KKBH1',dataIndex:'KKBH1'},
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
						var kkbh = Ext.getCmp('KKBH1').getValue();
	      	  			var jgsj = Ext.getCmp('JGSJ1').getValue();
          	  		     var id = Ext.getCmp('ID').getValue();
          	  		     var hphm=Ext.getCmp('HPHM').getValue();
          	  		     var idString = id+","+id;
          	  		     var httpUrlString = Ext.getDom("TX1").src+","+Ext.getDom("TX2").src;
          	  		     var carNumber=hphm+","+hphm;
          	  		     var params = {'idstr': idString,'url':httpUrlString,'carNum':carNumber,'jgsj':jgsj,'kkbh':kkbh};
          	  		     linkDownloadPicture(params);
					}
				},{
	          		xtype : 'tbspacer',
	          		width : 10
          	  	},{
					xtype : 'button',
	          	  	text : "上一条",
					scope : this,
					id : 'prevButton',
					hidden : false,
					handler : function() {
						// 调用方法获取下一条记录id
						var id = this.getDetailRecordId(this.loadId + "", false);
						upAndDownFlag = true;
						//var idNum = id.substring(0,id.indexOf('|'));
					    var idKey = id.substring((id.indexOf('|')+1));
					    var gridStore = fackPlateStore;
						//获取选中的的行数-1
						//var data = gridStore.getAt(idNum);
						// 如果不为空，则进行数据加载
						if (idKey!= null) {
							this.loadDetailById(idKey);
							//this.loadRecordById(data,idNum);
							//同步"上一条","下一条"按钮状态.
							this.synchronUpOrDown(idKey);
						}
					}
				},{
	          		  xtype : 'tbspacer',
	          		  width : 10
          	  	},{
          	  		xtype : 'button',
	          	  	text : "下一条",
					scope : this,
					id : 'nextButton',
					hidden : false,
					handler : function() {
						// 调用方法获取下一条记录id
						var id = this.getDetailRecordId(this.loadId + "", true);
						upAndDownFlag = true;
						//对值的截取操作
						//var idNum = id.substring(0,id.indexOf('|'));
					    var idKey = id.substring((id.indexOf('|')+1));
					    var gridStore = fackPlateStore;
						//获取选中的的行数+1
						//var data = gridStore.getAt(idNum);
						// 如果不为空，则进行数据加载
						if (idKey != null) {
							this.loadDetailById(idKey);
							//同步"上一条","下一条"按钮状态.
							this.synchronUpOrDown(idKey);
						}
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
		Jinpeng.resultQuery.duplicatePlateDetailWindow.superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Jinpeng.resultQuery.duplicatePlateDetailWindow.superclass.afterRender.call(this);
		//根据点击记录时设置的记录ID加载数据
		this.loadDetailById(this.loadId);
		//同步"上一条","下一条"按钮状态.
		this.synchronUpOrDown(this.loadId);
	},
	//加载数据
	loadDetailById : function(ID) {
		alarmDetailStore.load({
			params : {'ID' : ID},
			scope : this,
			callback : function(record, options, success) {
				record = alarmDetailStore.reader.jsonData.result[0];
				//将数据加载到form表单中
				taopaiParam.carNum = record.HPHM;
				if (upAndDownFlag) {
					upAndDownFlag = false;
					var frameGS = Ext.getCmp('frameGS');
					var gisHieght = hh - 164;
					var url = "<iframe id='carTrackIframe' src='http://10.235.34.82:8085/PGISViewer/SimplePGISViewer.html?carNum=" + taopaiParam.carNum + "&startDate=" + taopaiParam.startTime + "&endDate=" + taopaiParam.endTime + "' width='100%' height='" + gisHieght + "' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>";
					frameGS.body.update(url);
				}
				Ext.getCmp("ID").setValue(record.ID);
				Ext.getCmp("HPHM").setValue(record.HPHM);
				Ext.getCmp("HPHM2").setValue(record.HPHM);
				Ext.getCmp("KKMC1").setValue(record.KKMC1||"");
				Ext.getCmp("KKBH1").setValue(record.KKBH1||"");
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
	},
	/**
	 * 从grid的store获取详细信息id方法
	 * @author jzxie
	 * @param id
	 * @param upOrDowm
	 *            true&false
	 */
	getDetailRecordId : function(id, upOrDown) {
		var nextId = null;
		//拿该数据在当前store中的id数组所在的序号
		var k = 0;
		var rownum=0;
		var gridStore = fackPlateStore;
		if(id!=null){
			if(id.indexOf('|')>0 && id.indexOf('|')!= 0){
				//获取当前行数的Id
				this.loadId = id.substring((id.indexOf('|')+1));
				//获取行数(测试的时候用)
				//rownum = parseInt(id.substring(0,(id.indexOf('|'))));
			}
			for ( var i = 0; i < gridStore.getCount(); i++) {
				if (this.loadId == gridStore.getAt(i).get('ID')) {
					k = i;
					break;
				}
		    }
		}
		
		if (upOrDown == false && k > 0) {
			//测试用的
			//nextId = (rownum-k)+'|'+historyQueryStore.getAt(k-1).get('xxbh');
			//编号唯一的情况下使用
			nextId = (k-1)+'|'+gridStore.getAt(k-1).get('ID');
		}
		if (upOrDown == true && k < gridStore.getCount() - 1) {
			//nextId = (k+rownum+1)+'|'+historyQueryStore.getAt(k+1).get('xxbh');
			nextId = (k+1)+'|'+gridStore.getAt(k+1).get('ID');
		}
		if(nextId) {
			this.loadId = nextId;
		}
		return nextId;
	},
	/**
	 * 同步"上一条","下一条"按钮状态.
	 */
	synchronUpOrDown : function(id) {
		var gridStore = fackPlateStore;
		var count = gridStore.getCount();
		var index = 0;
		for ( var i = 0; i < count; i++) {
			if (id == gridStore.getAt(i).get('ID')) {
				index = i;
				break;
			}
		}
		//更改状态
		if (count == 1) {
			Ext.getCmp('nextButton').disable();
			Ext.getCmp('prevButton').disable();
		} else if(index == 0) {
			Ext.getCmp('prevButton').disable();
			if(count == 2) {
				Ext.getCmp('nextButton').enable();
			}
		} else if (index == (count-1)) {
			Ext.getCmp('nextButton').disable();
			if(count == 2) {
				Ext.getCmp('prevButton').enable();
			}
		} else {
			Ext.getCmp('prevButton').enable();
			Ext.getCmp('nextButton').enable();
		}
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
Jinpeng.resultQuery.CarSourceInfoInfoWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
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
		Jinpeng.resultQuery.CarSourceInfoInfoWindow.superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Jinpeng.resultQuery.CarSourceInfoInfoWindow.superclass.afterRender.call(this);
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
function linkDownloadPicture2(id){
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
//下载图片方法
function linkDownloadPicture(param){
	var params="";
	if(param){
		params=param;
	}else{
		var ids = [];
	    var url = [];
	    var carNumB=[];
		var records = Ext.getCmp('licenseRecognitionRateDataGrid').getSelectionModel().getSelections();
		if (records != "") {
			for ( var i = 0; i < records.length; i++) {
				//为共用图片下载接口,此处加了重复ID与hphm
				ids[ids.length] = records[i].get('ID');
				ids[ids.length] = records[i].get('ID');
				carNumB[carNumB.length] = records[i].get('HPHM');
				carNumB[carNumB.length] = records[i].get('HPHM');
				url[url.length] = records[i].get('TX1');
				url[url.length] = records[i].get('TX2');
			}
		}
		var idString = ids ? ids.join(',') : '';
		var httpUrlString = url ? url.join(',') : '';
		var carNumber=carNumB ? carNumB.join(','):'';
		params = {'idstr': idString,'url':httpUrlString,'carNum':carNumber};
	}

	Ext.Ajax.request({
		// 将id组合成字符串传递到后台
		url : rootpath + '/car/loadCarQueryAnalyzeImgUrlByIds.mvc',
		method : 'POST',
		params : params,
		success : function(resp, opts) {
			var txt = Ext.util.JSON.decode(resp.responseText);
			if(txt != "faild" && txt != "success"){
				window.open (txt,'_black');
			}else{
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = "图片路径无法访问，下载失败！请重试！";
				win.show();
			}
	},
	failure : function(resp, opts) {
		var win = new Jinpeng.widget.MessageWindow();
		win.msg = "下载失败！请重试！";
		win.show();
	}
	});
}

Ext.reg('northFormPanel', Jinpeng.resultQuery.NorthFormPanel);
Ext.reg('gisDataPanel', Jinpeng.resultQuery.GisDataPanel);
Ext.reg('gisGridPanel', Jinpeng.resultQuery.licenseRecognitionRateGrid);