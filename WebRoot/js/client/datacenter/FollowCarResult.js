/*
 *跟随车弹出窗口 
 */

Jinpeng.task.FollowCarWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	layout : "fit",
	width : 950,
	height : 500,
	resizable : false,
	closeAction : "close",
	stateful:false,
	plain : true,
	modal : true,
	border : false,
	datas : {},
	initComponent : function() {
		Ext.apply(this, {
			items : [ {
				xtype : 'followCarFormPanel'
			} ]
		});
		Jinpeng.task.FollowCarWindow.superclass.initComponent.apply(this);
	}
});

/**
 * north区域表单部份
 */
Jinpeng.task.FollowCarFormPanel = Ext.extend(Ext.Panel,{
	callBackFun : null,
	height : 500,
	initComponent : function() {
	
		//车牌号
		var carNumStore = new Ext.data.JsonStore({
			url : rootpath
					+ "/dictionary/jsonDictsInCombo.mvc?code=LicPlate",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false
		});
		
		var testStore = new Ext.data.JsonStore({
			//storeId:'pigOwnerStore',   
	        url: rootpath + "/dictionary/jsonDictsInCombo.mvc?code=ApprovalState",   
	        root: 'data',   
	        //totalProperty: 'totalCount',   
	        //remoteSort: true,   
	        fields: ['id','text'],
	        autoLoad : false
		});
		
		var timeSpinner = new Ext.ux.form.SpinnerField({
			name : 'vilidTime',
			id : 'vilidTime',
			fieldLabel : '&nbsp;&nbsp;有效时间',
			disabled: true,
			width : 60,
			value : '5',
			tooltip : {
				text : "有效时间指的是主车跟伴随车经过同一个卡口的时间差"
			},
			cellWidth : 210,
			minValue : 1,
			maxValue : 30,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		
		var kakouSpinner = new Ext.ux.form.SpinnerField({
			name : 'kakouTimes',
			id : 'kakouTimes',
			fieldLabel : '&nbsp;&nbsp;跟随卡口数',
			disabled: true,
			width : 60,
			value : '3',
			tooltip : {
				text : "跟随卡口数指的是跟随车跟随主车所经过的卡口总数"
			},
			cellWidth : 210,
			minValue : 2,
			maxValue : 8,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
	
		/** 设定参数 */
		Ext.apply(	this,{
			layout : 'border',
			border : false,
			defaults : {
				margins : '0 0 0 0'
			},
			items : [{
				region : 'north',
				height : 95,
				xtype : 'form',
				id : 'searchFollowCarForm',
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
				
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;border-bottom-color:#F7F7F7;',
				items : [{
					items : [{
						xtype: 'compositefield',
						anchor : '94%',
		                items: [{
		                    	flex : 0.4,
		                    	xtype : 'tcombo',
								id : 'carfnum',
								name:'carfnum',
								fieldLabel : '车牌号码',
								disabled: true,
								store : carNumStore,
								mode : 'local',
								emptyText : '全部',
								allowBlank : false,
								triggerAction : 'all',
								valueField : 'id',
								displayField : 'text'
		                    }, {
		                    	flex : 0.6,
		                    	xtype : 'textfield',
		                    	disabled: true,
								id : 'carbnum',
								allowBlank : false,
								name : 'carbnum',
								emptyText : '请输入车牌'
		                    }]
					}]
				},{
					items : [ {
						xtype : 'textfield',
						name : 'startTime1',
						id : 'startdate1',
						fieldLabel : '开始时间',
						disabled: true,
						value : new Date().format('Y-m-d') + ' 00:00:00',
						anchor : '96%',
						allowBlank : false,
						editable : false,
						style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
						listeners  : {   
			            	'focus':function(field){  
							    var endDate = Ext.getCmp("enddate1").getValue();
								var endTime = Ext.util.Format.date(
										new Date(), 'Y-m-d H:i:s');
								//alert(endTime);
								//  日期时间的默认参数      
							    var defaultDateTimeParams = new function()   
							    {   
							        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
							        this.startDate  = endTime;    //  开始时间   
							        this.maxDate = endDate;
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
						name : 'endTime1',
						id : 'enddate1',
						fieldLabel : '结束时间',
						allowBlank : false,
						disabled: true,
						editable : false,
						value : new Date().format('Y-m-d') + ' 23:59:59',
						anchor : '96%',
						style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
						listeners  : {   
			            	'focus':function(field){  
								var endTime = Ext.util.Format.date(
										new Date(), 'Y-m-d H:i:s');
								var startdate = Ext.getCmp("startdate1").getValue();
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
				}, {
					items : [{
						xtype : 'spacer'
					}]
				}, {
					items : [{
						xtype: 'compositefield',
						anchor : '94%',
		                items: [ timeSpinner, {
	                    	flex : 0.6,
	                    	xtype : 'label',
	                    	text : '分钟'
	                    }]
					}]
				}, {
					items : [{
						xtype: 'compositefield',
						anchor : '94%',
		                items: [ kakouSpinner, {
	                    	flex : 0.6,
	                    	xtype : 'label',
	                    	text : '个'
	                    }]
					}]
				}, {
					items : [{
						xtype : 'spacer'
					}]
				}, {
					items : [{
						xtype : 'spacer'
					}]
				}, {
					colspan:2,
					width:620,
					items : [{
						fieldLabel : '卡口名称',
						xtype : 'mountSelector',
						name : 'passStation',
						id : 'passStation',
						allowBlank : false,
						disabled: true,
						colspan:2,
						width:640,
						editable : false,
						emptyText : '请选择卡口',
						defaults : {
							width : 580,
							layout : 'form'
						},
						anchor : '94%',
						callBackFun:function(data){
							var phones = '';
							var kkmcs= '';
							var dataLength = data.length;
							if (data.length > 8) {
								dataLength = 8;
							}
							for ( var i = 0; i < dataLength; i++) {
								if (phones != '') {
									phones += ',';
								}
								if (kkmcs != '') {
									kkmcs += ',';
								}
								if (data[i].id != '' && data[i].id != 'null') {
									phones += data[i].id;
									kkmcs += data[i].text;
								}
							}
							if (data.length > 8) {
								var win = new Jinpeng.widget.MessageWindow();
								win.msg = '超过八个卡口，建议选择八个卡口以内！';
								win.show();
							}
							Ext.getCmp('kkmcs').setValue(kkmcs);
							Ext.getCmp('kkbhs').setValue(phones);
						}
					}]
				}, {
					bodyStyle : 'padding-left:10px',
					xtype : 'compositefield',
					items : [{
						flex : 31,
						disabled: true,
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
						id : "searchBut"
					}]
				},{
					items : [{
						xtype : 'hidden',
						id : 'kkbhs',
						name : 'kkbhs'
					}]
				}]
			}, {
				region : 'center',
				margins:'10 0 0 0',
				height : 570,
				xtype : 'followCarGridPanel',
				ref : "../grid"
			}],
			listeners : {
				afterrender : function() {
					carNumStore.load();
					var datas = this.ownerCt.datas;
					var carfnum = datas.carNum.substring(0,1);
					var carbnum = datas.carNum.substring(1);
					Ext.getCmp('carfnum').setValue(carfnum);
					Ext.getCmp('carbnum').setValue(carbnum);
					Ext.getCmp('vilidTime').setValue(datas.validTimes);
					Ext.getCmp('kakouTimes').setValue(datas.followTimes);
					Ext.getCmp('startdate1').setValue(datas.startTime);
					Ext.getCmp('enddate1').setValue(datas.endTime);
					Ext.getCmp('passStation').setValue(datas.kkmcs);
					Ext.getCmp('kkbhs').setValue(datas.kkbhs);
					
				}
			}
		});
		Jinpeng.task.FollowCarFormPanel.superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Jinpeng.task.FollowCarFormPanel.superclass.afterRender.call(this);
	}
});


var dataFields = [
  {name : 'id'},
  {name : 'FOLLOW_CAR_NUM'},
  {name : 'placeAndTime'},
  {name : 'followTimes'},
  {name : 'image1'},
  {name : 'image2'},
  {name : 'image3'},
  {name : 'image4'},
  {name : 'image5'},
  {name : 'image6'},
  {name : 'image7'},
  {name : 'image8'},
  {name : 'image9'}
];

var commuServerStore = new Ext.data.JsonStore({
	url : rootpath+ "/followCar/query/findFollowCarFromDb.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	fields : dataFields
});

var colM = [
    new Ext.ux.grid.PagingRowNumberer({ width : 40, height : 50}),
    //sm,
    {header : '车牌号码', dataIndex : 'carNum',width : 30},
    {header : '卡口信息', dataIndex : 'placeAndTime',width : 100,align : 'left',
 	   renderer: function(val) {
 	   	   var datas = val.split(',');
 	   	   var newDada = "";
 	   	   for (var i = 0; i < datas.length; i++) {
 	   		   newDada += datas[i] + '<br>';
 	   	   }
 	   	   return newDada;
    	   }
    }
 ];

/**
 * 伴随车数据列表--Grid
 */
Jinpeng.task.searchFollowCarGrid = Ext.extend(Ext.grid.GridPanel, {
	id : 'searchFollowCarDataGrid',
	border : false,
	pageSize : 5,
	autoScroll : true,
	width : 1000,
	initComponent : function() {
		var _panel = this;
		var sm = new Ext.grid.CheckboxSelectionModel();
		Ext.apply(this, {
			store :  commuServerStore,
			selModel : sm,
			colModel :  new Ext.grid.ColumnModel({
					defaults : {
					sortable : false,
					autoHeight:true,
				},
				columns : colM
			}),
			bbar : new Jinpeng.widget.PagingToolbar( {
				id : 'PagingToolbarCar',
				store : commuServerStore,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			}),
			listeners : {
				afterrender : function() {
					_panel.store.data.length = 0;
					var datas = this.ownerCt.ownerCt.datas;
					var baseparams = {
						"taskId" : datas.id,
						"carNum" : Ext.getCmp('carfnum').getValue() + Ext.getCmp('carbnum').getValue(),
						"page.start" : 0,
						"page.limit" : 5
					};
					commuServerStore.baseParams = baseparams;
					commuServerStore.load({
						params : {'page.start' : 0, 'page.limit' : 5},
						callback : function(o,response,success) {
							if (o != null && o != 'undefined' && o.length > 0) {
								var rowData = o[0].data.placeAndTime.split(";");
								var carNum = Ext.getCmp('carfnum').getValue() + Ext.getCmp('carbnum').getValue();
								var realTimes = o[0].data.followTimes;
								var maxLength = Ext.getCmp('kkbhs').getValue().split(',').length;
								/*if (realTimes > maxLength) {
									maxLength = realTimes;
								}*/
								/*for (var i = 0; i < o.length; i++) {
									if (maxLength < o[i].data.placeAndTime.split(";").length && carNum != o[i].data.carNum) {
										maxLength = o[i].data.placeAndTime.split(";").length;
										rowData = o[i].data.placeAndTime.split(";");
									}
								}*/
								var fields = new Array(maxLength);
								var columns = new Array(maxLength);
								var imageWH = 16*maxLength;
								var imageData = '';
								var data = null;
								var filedO = {}, columnsO = {};
								for (var j = 0; j < o.length; j++) {
									for (var i = 0; i < maxLength; i++) {
										imageData = o[j].data.image + 'i';
										data = rowData[i].split(',');
										filedO.name = "image" + (i + 1) ; 	
										columnsO.header = data[0];
										columnsO.dataIndex = "image" + (i + 1);
										columnsO.width = 50;
										columnsO.renderer = function(imageData) {
											if (imageData != '' && imageData != null && imageData!= "null") {
												return '<img src="' + imageData + '" width="' + imageWH + '" height="' + imageWH + '"/>';
											} else {
												return '<img src="' + rootpath + '/themes/client/blue/images/null.jpg" width="' + imageWH + '" height="' + imageWH + '"/>';
											}
							    	    };
										fields[i] = filedO;
										columns[i] = columnsO;
										filedO = {}, columnsO = {}; //重置
									}
								}
								var columns = columns;
								var fields = fields;
								colM.length = 0; //清空数组
								colM.push( new Ext.ux.grid.PagingRowNumberer({ width : 40, height : 50}));
								colM.push( {header : '车牌号码', dataIndex : 'FOLLOW_CAR_NUM',width : 30,
									renderer: function(val) {
										var str = val;
										if (val == carNum) {
											str = '<span style="color:red;">' + val + '</span>';
										}
							            return str;
							      	}
								});
								colM.push( {header : '通过卡口及通过时间', dataIndex : 'placeAndTime',width : 100,align : 'left',
								 	   renderer: function(val) {
								 	   	   var datas = val.split(';');
								 	   	   var newDada = "";
								 	   	   for (var i = 0; i < datas.length; i++) {
								 	   		   newDada += datas[i] + '<br>';
								 	   	   }
								 	   	   return newDada;
							    	   }
							    });
								for ( var i = 0; i < fields.length; i++) {
									dataFields.push(fields[i]);
									colM.push(columns[i]);
								}
								Ext.getCmp('searchFollowCarDataGrid').reconfigure(commuServerStore, new Ext.grid.ColumnModel(colM));
							}
						}
					});
				}
			}
		});
		//图片放大事件 
		this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
			var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
			var recode = grid.store.getAt(rowIndex);
			var image = '';
			if (fieldName == 'image1' || fieldName == 'image2' || fieldName == 'image3' || fieldName == 'image4' 
				|| fieldName == 'image5' || fieldName == 'image6' || fieldName == 'image7' || fieldName == 'image8') {
				if (recode) {
					if (fieldName == 'image1' && recode.data.image1 != "null") {
						image = recode.get("image1");
					}
					if (fieldName == 'image2' && recode.data.image2 != "null") {
						image = recode.get("image2");
					}
					if (fieldName == 'image3' && recode.data.image3 != "null") {
						image = recode.get("image3");	
					}
					if (fieldName == 'image4' && recode.data.image4 != "null") {
						image = recode.get("image4");
					}
					if (fieldName == 'image5' && recode.data.image5 != "null") {
						image = recode.get("image5");
					}
					if (fieldName == 'image6' && recode.data.image6 != "null") {
						image = recode.get("image6");
					}
					if (fieldName == 'image7' && recode.data.image7 != "null") {
						image = recode.get("image7");
					}
					if (fieldName == 'image8' && recode.data.image8 != "null") {
						image = recode.get("image8");
					}
					this.showPicWindow(image, rowIndex, columnIndex);
				}
			}
		});
		Jinpeng.task.searchFollowCarGrid.superclass.initComponent.apply(this);
	},
	//图片放大显示
	showPicWindow : function(image, rowIndex, colIndex, item, event) {
		if (image != undefined && image != null && image != '') {
			//创建window窗体
			var win = new Jinpeng.task.ShowPictureWindow();
			win.image = image;
			win.show();
		}
	}
});

/**
 * 弹出窗口显示图片信息
 */
Jinpeng.task.ShowPictureWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
		width : 425,
		height : 480,
		title : '图片信息',
		closeAction : "close",
		plain : true,
		modal : true,
		border : false,
		image : '',
		initComponent : function() {
			var panels = this; 
			Ext.apply(this,{
				items : [ {
					xtype : 'form',
					region : 'center',
					id : 'pictureForm',
					layout : 'column',
					labelAlign : 'right',
					cls:'blue-button-ct',
					border : false,
					items : [ {
						//左边图片显示区域 
						columnWidth : 1.0,
						items : [ {
							//引用图片显示组件
							xtype : 'onlyShowBox',
							width : 420,
							height : 450
						}]
						
					}],
					
					bbar : {
						buttonAlign : 'center',
						buttons : [{
							xtype : 'button',
							text : '下载图片',
							id : 'picdownloadbtn',
							handler : function() {
								//获取当前记录的id
								var picUrl = panels.image;
								//根据Id下载图片
								linkDownloadPicture(picUrl);
								
								
							}
						}, {
							xtype : 'tbspacer',
							width : 10
						}, {
							xtype : 'button',
							text : '&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;',
							id : 'closeBtn',
							scope : this,
							handler : this.close
						} ]
					}
					
				} ]
				
			});
			Jinpeng.task.ShowPictureWindow.superclass.initComponent.apply(this);
		},
		afterRender : function() {
			Jinpeng.task.ShowPictureWindow.superclass.afterRender.call(this);
			this.loadDetailById();
		},
		//加载数据
		loadDetailById : function() {
			var record = {};
			record.CARIMGURL = this.image;
			this.publish('loadPictures', record);
		}
	});
//下载图片方法
function linkDownloadPicture(id){
	var ids=[];
	if(id){
		ids[ids.length]=id;
	}else{
		var records = Ext.getCmp('alarmGridPanel').getSelectionModel().getSelections();
		if (records != "") {
			for ( var i = 0; i < records.length; i++) {
				ids[ids.length] = records[i].get('BJXXBH');
			}
		}
	}
	var idString = ids ? ids.join(',') : '';
	if(idString!=''){
		Ext.Ajax.request({
				// 将id组合成字符串传递到后台
				url : rootpath +'/followCar/downLoadFollowCarImages.mvc',
				method : 'POST',
				params : {'idstr': idString},
				success : function(resp, opts) {
					var txt = Ext.util.JSON.decode(resp.responseText);
					//var data = txt.data;
					if(txt){
						window.open (txt,'_black');
						var win = new Jinpeng.widget.MessageWindow();
						win.msg = "图片下载成功...";
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
	
  }


Ext.reg('followCarFormPanel', Jinpeng.task.FollowCarFormPanel);
Ext.reg('followCarGridPanel',Jinpeng.task.searchFollowCarGrid);