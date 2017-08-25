/**
 * 初次入城
 */
Ext.ns("Jinpeng.carFirsttimeIncity");

var viewPortObj = null;
var downPictureWindow = null;

var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
var gisHeight = hh - 60;
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
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/Big_Data/zTree/demo/cn/excheck/multiSelectTreeGzsInc.html"></iframe>'
});

var setKKValue=function(data){
	//alert(data.org_type);
	var passport;
	passport = data.id;
	//alert(data['org_type']);
	if(data.org_type == "2" ){ //如果是卡口，卡口编号前三位要去掉
		passport = (data.id).substring(3);
	}
	Ext.getCmp('passport').setValue(passport);
	Ext.getCmp('passStation').setValue(data.text);
	Ext.getCmp('mywin1').hide();
};

Ext.onReady(function() { 
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport({
		layout : 'border',
		items : [{
				// north区域表单
					region : 'north',
					border : false,
					height : 95,
					// 自定标签
					xtype : 'firstTimeIncityFormPanel'
			},{
			region : 'center',
			border : false,
			xtype : 'firstTimeIncityDataPanel'
		} ]
	});
	//默认加载查询功能
	Ext.getCmp('formId').alarmSearch();
});

var alarmSearchStore;
Jinpeng.carFirsttimeIncity.FirstTimeIncityPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'firstTimeIncityPanel',
	border : false,
	frame : false,
	pageSize : 15,
	initComponent : function() { 
		// 所需数据
		alarmSearchStore = new Ext.data.JsonStore({
			url : rootpath + "//firstTimeInCity/doQueryFirstIncityCar.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			remoteSort : true,
			fields : [ {
				name : 'xxbh'
			}, {
				name : 'jgsj'
			}, {
				name : 'kkbh'
			}, {
				name : 'kkmc'
			}, {
				name : 'hphm'
			}, {
				name : 'hpysmc'
			}, {
				name : 'brand'
			}, {
				name : 'type'
			}, {
				name : 'caryear'
			}, {
				name : 'tx1'
			}, {
				name : 'cwhphm'
			},{name : 'hpyz'},
			{name : 'clsd'},
			{name : 'clxs'},
			{name : 'xszt'},
			{name : 'clpp'},
			{name : 'csys'},
			{name : 'cllx'},
			{name : 'hpzl'},
			{
				name : 'cwhpys'
				}]
		});
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this,{
			store : alarmSearchStore,
			cm : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
						new Ext.ux.grid.PagingRowNumberer({width : 40}),
						sm,
						{
							header : '车牌号',
							dataIndex : 'hphm'
						},{
							header : '初次入城时间',
							width : 180,
							dataIndex : 'jgsj',
							 renderer: function (val) {
					        	if (val) {
					        		return Ext.util.Format.date(new Date(Number(val)), 'Y-m-d H:i:s');
					        	}
					        	return "";
					        }
						},{
							header : '最新地点',
							dataIndex : 'kkmc'
						},{
							header : '品牌/型号/年款',
							dataIndex : 'brand'
						},{
							header : '颜色',
							dataIndex : 'hpysmc'
						},{
							header : '操作', dataIndex : 'operate',
					    	xtype : 'actioncolumn',
	                    	width : 100,
	                    	align : 'center',
	                    	items : [{
								icon : rootpath
										+ '/themes/client/blue/images/system/check.gif',
								tooltip : '查看'
							}]
						} ]
			}),
			selModel : sm,
			bbar : new Jinpeng.widget.PagingToolbar( {
				id : 'PigPagingToolbarCar',
				store : alarmSearchStore,
				//displayInfo : true,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			})
	
			
		});
		/* 响应最后一列查看点击事件 */
		this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
			// var record =
			// Ext.getCmp('alarmGridPanel').getStore().getAt(rowIndex);
			var fieldName = grid.getColumnModel()
					.getDataIndex(columnIndex);
			if (fieldName == 'operate') {
				if (typeof this.checkHref == 'function')
					/* 调用查看超链接方法 */
					this.checkHref(grid, rowIndex, columnIndex);
			}
		});
		Jinpeng.carFirsttimeIncity.FirstTimeIncityPanel.superclass.initComponent.apply(this);
	},
	/* 响应查看超链接的方法 */
	checkHref : function(grid, rowIndex, colIndex, item, event) {
		var recode = grid.store.getAt(rowIndex);
		if (recode) {
			// 创建一个window对象
			var win = new Jinpeng.carFirsttimeIncity.CarDetailWindow();
			//var win = new Jinpeng.historyQuery.HistoryCarDetailWindow();
			win.recode = recode;
			// 传入当前ID，并加载数据。
			win.loadId = recode.get("xxbh");
			win.queryStore=alarmSearchStore;
			win.show();
		}
	}
});

/**
 * north区域表单部份
 */
Jinpeng.carFirsttimeIncity.FirstTimeIncityFormPanel = Ext.extend(Ext.Panel,{
	id:'formId',
	initComponent : function() {
		var endTime = Date.parseDate(Ext.util.Format.date(
				new Date(), 'Y-m-d')
				+ " " + "23:59:59", 'Y-m-d H:i:s');
		//车牌号
		var carNumStore = new Ext.data.JsonStore({
			url : rootpath
					+ "/dictionary/HPHMDictsInComboHPHM.mvc?code=LicPlate",
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
		Ext.apply(this,{
			items : [ {
				// form表单
				xtype : 'form',
				id : 'searchAlarmForm',
				//labelAlign : 'left',
				border : false,
				frame : true,
				cls : 'blue-button-ct',
				layout : 'table',
				defaults : {
					layout : 'form',
					//统一宽度
					width : 320
				},
				layoutConfig : {
					columns : 3
				},

				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
							items : [ {
								xtype : 'textfield',
								name : 'startTime',
								id : 'startdate',
								allowBlank : false,
					            editable : false,
							    fieldLabel : '开始时间',
								value : new Date().format('Y-m-d') + ' 00:00:00',
							    //value:new Date().add(Date.MONTH, -1).format('Y-m-d')+' 00:00:00',
								anchor : '94%',
								width:145,
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
						},
						{
							items : [ {
								xtype : 'textfield',
								fieldLabel : '结束时间',
								allowBlank : false,
								editable : false,
								name : 'endTime',
								id : 'enddate',
								value : new Date().format('Y-m-d') + ' 23:59:59',
								anchor : '94%',
								style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center',width:100}, 
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
							items : [ {
								xtype : 'numberfield',
								id : 'backTimeLen',
								fieldLabel : '回溯时长(天)',
								name : 'backTimeLen',
								allowBlank : false,
								width : 185,
								value:1,
								maxValue:365,
								emptyText : '最大值365',
								nanText:'请输入有效数字',
								blankText : "请输入回溯时长",
								allowNegative :false
							}]	
						}, {
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
							items :[{
								xtype : 'textfield',
								id : 'hphm',
								name : 'hphm',
								fieldLabel : '车牌号码',
								anchor : '94%',
								emptyText : '请输入车牌'
								}]
							},{
								items :[{
									xtype : 'textfield',
									id : 'exceptHphm',
									name : 'exceptHphm',
									fieldLabel : '排除车牌',
									anchor : '94%',
									emptyText : '请输入车牌'
									}]
							},{
							colspan:4,
							bodyStyle : 'padding-left:10px',
							xtype : 'compositefield',
							items : [{
								flex : 31,
								xtype : 'button',
								text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
								id : "searchBut",
								handler : this.alarmSearch
							},{
								flex : 31,
								xtype : 'button',
								id : "resetBut",
								text : '&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;',
								handler : this.resetMethod
							}]
						},{
							items : [{
								xtype : 'hidden',
								id : 'passport'
							}]
						}], 
						buttons: [{
				            text: 'test',
				            handler: function(){
							}
				        }]
			} ],
			listeners : {
				afterrender : function() {
					/*车牌省Store*/
					carNumStore.load();
					carBrandStore.load();
				}
			}
		});
		Jinpeng.carFirsttimeIncity.FirstTimeIncityFormPanel.superclass.initComponent.apply(this);
	},
	/* 响应查询按钮 */
	alarmSearch : function() {
		var form = Ext.getCmp('searchAlarmForm');
		if (form.getForm().isValid()) {
			var grid = Ext.getCmp('firstTimeIncityPanel');
			grid.store.baseParams = {};// 重置
			/** 将参数传入后台 */
			var baseparams = {
				"startdate" : Ext.getCmp('startdate').getValue(),
				"enddate" : Ext.getCmp('enddate').getValue(),
				"backTimeLen":Ext.getCmp('backTimeLen').getValue(),
				"carBrand" : Ext.getCmp('carBrand').getValue(),
				"carType" : Ext.getCmp('carType').getValue(),
				"carYear" : Ext.getCmp('carYear').getValue(),
				"hphm" : Ext.getCmp('hphm').getValue(),
				"exceptHphm" : Ext.getCmp('exceptHphm').getValue()
			};
			grid.store.baseParams = baseparams;
			/*刷新选中*/
			this.publish("clearGridSelections",[]);
			grid.store.load({
				params : {
					'page.start' : 0,
					'page.limit' : 15
				}
			});
		}
	},
	resetMethod :  function() {
		Ext.getCmp('searchAlarmForm').getForm().reset();
	}
});
//弹出窗口历史过车详细信息
Jinpeng.carFirsttimeIncity.CarDetailWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
	width : 940,
	height : 550,
	closeAction : "close",
	title : '详细信息',
	border : false,
	clickFlag : false,
	loadId : '',
	recode : null,
	initComponent : function() {
		Ext.apply(this, {
			items : [ {
				xtype : 'form',
				id : 'detailWindowForm',
				region : 'center',
				autoScroll : true,
				labelAlign : 'right',
				layout : 'column',
				cls : 'blue-button-ct',
				items : [{
					columnWidth : .45,
					//bodyStyle : 'padding-left : 5px;',
					//layout : 'form',
					items : [{
						//图形组件
						xtype : 'pictureShowBox',
						width : 420,
						height : 460
					} ]
				},
				{
					columnWidth : .55,
					layout : 'form',
					items : [{xtype : 'fieldset',
							title : '基本信息',
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
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车牌号码',
									id:'carNum_win',
									name : 'hphm',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '行驶状态',
									name : 'xszt',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '单位名称',
									name : 'dwmc',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '设备名称',
									name : 'sbmc',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '卡口名称',
									name : 'kkmc',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '方向名称',
									name : 'fxmc',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '卡口编号',
									name : 'kkbh',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '方向编号',
									name : 'fxbh',
									anchor : '96%'
								} ]
							}]
						},{xtype : 'fieldset',
							title : '车辆信息',
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
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车辆速度(km/h)',
									name : 'clsd',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车辆限速(km/h)',
									name : 'clxs',
									anchor : '96%'
								} ]
							}/*, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车身长度(cm)',
									name : 'cscd',
									anchor : '96%'
								} ]
							}*/, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车尾号牌',
									name : 'cwhphm',
									anchor : '96%'
								} ]
							}/*, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '违法状态',
									name : 'wfzt',
									anchor : '96%'
								} ]
							}*/, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车辆品牌',
									name : 'clpp',
									anchor : '96%'
								} ]
							}/*, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车辆外形',
									name : 'clwx',
									anchor : '96%'
								} ]
							}*/, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车身颜色',
									name : 'csys',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车辆类型',
									name : 'cllx',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车尾号牌颜色',
									name : 'cwhpys',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '号牌种类',
									name : 'hpzl',
									anchor : '96%'
								} ]
							},{
								items : [ {
									xtype : 'hidden',
									name : 'xxbh',
									id:'xxbh',
									anchor : '96%'
								} ]
							},{
								items : [ {
									xtype : 'hidden',
									name : 'tx1',
									id:'tx1',
									anchor : '96%'
								} ]
							}]
						},{
							xtype : 'fieldset',
							title : '车主信息',
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
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车主姓名',
									name : 'JDCSYR',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '联系方式',
									name : 'LXFS',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '身份证号',
									name : 'SFZH',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '详细地址',
									name : 'DJZZXZ',
									anchor : '96%'
								} ]
							}]
						}]
				} ]
			} ],
			bbar : {
				cls : 'blue-button-ct',
				buttonAlign : 'center',
				buttons : [{
					xtype : 'button',
	          	  	text : "上一条",
					scope : this,
					id : 'prevButton',
					hidden : false,
					handler : function() {
						// 调用方法获取下一条记录id
						var id = this.getDetailRecordId(this.loadId, false);
						
						var idNum = id.substring(0,id.indexOf('|'));
					    var idXxbh = id.substring((id.indexOf('|')+1));
					    var gridStore;
					    gridStore=alarmSearchStore;
//						if (showFlag == 'grid') {
//							gridStore = historyQueryStore;
//						} else {
//							gridStore = dataViewStore;
//						}
						//获取选中的的行数-1
						var data = gridStore.getAt(idNum);
						// 如果不为空，则进行数据加载
						if (data!= null) {
							this.loadRecordById(data,alarmSearchStore,idNum);
							//同步"上一条","下一条"按钮状态.
							this.synchronUpOrDown(idXxbh);
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
						var id = this.getDetailRecordId(this.loadId, true);
						//对值的截取操作
						var idNum = id.substring(0,id.indexOf('|'));
					    var idXxbh = id.substring((id.indexOf('|')+1));
					    var gridStore;
					    gridStore=alarmSearchStore;
						//获取选中的的行数+1
						var data = gridStore.getAt(idNum);
						
						// 如果不为空，则进行数据加载
						if (data != null) {
							this.loadRecordById(data,alarmSearchStore,idNum);
							//同步"上一条","下一条"按钮状态.
							this.synchronUpOrDown(idXxbh);
						}
					}
				},{
	          		  xtype : 'tbspacer',
	          		  width : 10
          	  	},{
          	  		xtype : 'button',
					text : '下载图片',
					id : 'picdownloadbtn',
					handler : function() {
						//获取当前记录的id
						var id = Ext.getCmp('xxbh').getValue();
						var httpUrl = Ext.getCmp('tx1').getValue();
						var carNum = Ext.getCmp('carNum_win').getValue();
						linkDownloadPicture(id,httpUrl,carNum);
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
		Jinpeng.carFirsttimeIncity.CarDetailWindow.superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Jinpeng.carFirsttimeIncity.CarDetailWindow.superclass.afterRender.call(this);
		
		//根据点击记录时设置的记录ID加载数据
		this.loadRecordById(this.recode,alarmSearchStore);
		var xxbh = this.recode.get('xxbh');
		//同步"上一条","下一条"按钮状态.
		this.synchronUpOrDown(xxbh);
	},
	/**
	 * 根据ID，detailRegStore加载该条记录的信息。
	 * @param xxbh 信息编号
	 */
	loadRecordById : function(data,grid,carnum) {
		var carNumber ;
		var gridStore;
		gridStore = grid;
//		if (showFlag == 'grid') {
//			gridStore = historyQueryStore;
//		} else {
//			gridStore = dataViewStore;
//		}
		if(carnum != undefined && carnum >0 ){
			carNumber = gridStore.getAt(carnum-1).get('hphm');
		}
		if(carnum ==0){
			carNumber = gridStore.getAt(carnum).get('hphm');
		}
		var record = {};
		// 加载数据		
		record.hphm = data.get("hphm");
		record.tx1 = data.get("tx1");
		record.xxbh = data.get("xxbh");
		record.kkbh = data.get("kkbh");
		record.dwmc = data.get("dwmc");
		record.kkmc = data.get("kkmc");
		record.sbmc = data.get("sbmc");
		record.fxbh = data.get("fxbh");
		record.fxmc = data.get("fxmc");
		record.cwhphm = data.get("cwhphm");
		record.cwhpys = window.dictionary.getValue("LicPlateColor",data.get("cwhpys"));
		record.hpyz = window.dictionary.getValue("LicenseVerfiy",data.get("hpyz"));//号牌一致，
		record.clsd = Ext.util.Format.substr(data.get("clsd"),0,3);
		record.clxs = Ext.util.Format.substr(data.get("clxs"),0,3);	
		record.xszt = window.dictionary.getValue("DriverType", data.get("xszt"));//行驶状态，
		record.clpp = window.dictionary.getValue("CarBrand", data.get("clpp")); //车辆厂牌编码（自行编码）。
		record.csys = window.dictionary.getValue("CarColor", data.get("csys"));
		record.cllx = window.dictionary.getValue("CarType", data.get("cllx"));
		record.hpzl = window.dictionary.getValue("LicPlateType", data.get("hpzl"));
		//反向将数据加载到form表单中
		Ext.getCmp('detailWindowForm').getForm().setValues(record);
		record.CARIMGURL = data.get("tx1");
		this.publish('loadPictures', record);
		/*视频网暂时屏蔽车辆信息功能 */
		if(carNumber != data.get("hphm")){
			Ext.Ajax.request({
			method : "POST",
			params : {
				"carNum" : data.get("hphm")
			},
			url : rootpath + "/car/query/historyCarDetail.mvc",
			success : function(response, options) {
				var txt = response.responseJSON.data;
				if (txt.length == 0) {
					Ext.getCmp('detailWindowForm').getForm().findField('JDCSYR').setValue('加载失败');
					Ext.getCmp('detailWindowForm').getForm().findField('SFZH').setValue('加载失败');
					Ext.getCmp('detailWindowForm').getForm().findField('LXFS').setValue('加载失败');
					Ext.getCmp('detailWindowForm').getForm().findField('DJZZXZ').setValue('加载失败');
				} else {
					Ext.getCmp('detailWindowForm').getForm().findField('JDCSYR').setValue(txt[0].JDCSYR);
					Ext.getCmp('detailWindowForm').getForm().findField('LXFS').setValue(txt[0].LXFS);
					Ext.getCmp('detailWindowForm').getForm().findField('SFZH').setValue(txt[0].SFZH);
					Ext.getCmp('detailWindowForm').getForm().findField('DJZZXZ').setValue(txt[0].DJZZXZ);
				}
			},
			failure : function(response, options) {
				Ext.getCmp('detailWindowForm').getForm().findField('JDCSYR').setValue('加载失败');
				Ext.getCmp('detailWindowForm').getForm().findField('SFZH').setValue('加载失败');
				Ext.getCmp('detailWindowForm').getForm().findField('LXFS').setValue('加载失败');
				Ext.getCmp('detailWindowForm').getForm().findField('DJZZXZ').setValue('加载失败');
			},
			scope : this
		});
		};
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
		var gridStore;
		gridStore=alarmSearchStore;
//		if (showFlag == 'grid') {
//			gridStore = historyQueryStore;
//		} else {
//			gridStore = dataViewStore;
//		}
		if(id!=null){
			if(id.indexOf('|')>0 && id.indexOf('|')!= 0){
				//获取当前行数的Id
				this.loadId = id.substring((id.indexOf('|')+1));
				//获取行数(测试的时候用)
				//rownum = parseInt(id.substring(0,(id.indexOf('|'))));
			}
			for ( var i = 0; i < gridStore.getCount(); i++) {
				if (this.loadId == gridStore.getAt(i).get('xxbh')) {
					k = i;
					break;
				}
		    }
		}
		
		if (upOrDown == false && k > 0) {
			//测试用的
			//nextId = (rownum-k)+'|'+historyQueryStore.getAt(k-1).get('xxbh');
			//信息编号唯一的情况下使用
			nextId = (k-1)+'|'+gridStore.getAt(k-1).get('xxbh');
		}
		if (upOrDown == true
				&& k < gridStore.getCount() - 1) {
			
			//nextId = (k+rownum+1)+'|'+historyQueryStore.getAt(k+1).get('xxbh');
			nextId = (k+1)+'|'+gridStore.getAt(k+1).get('xxbh');
			
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
		var gridStore;
		gridStore=alarmSearchStore;
//		if (showFlag == 'grid') {
//			gridStore = historyQueryStore;
//		} else {
//			gridStore = dataViewStore;
//		}
		var count = gridStore.getCount();
		var index = 0;
		for ( var i = 0; i < count; i++) {
			if (id == gridStore.getAt(i).get('xxbh')) {
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

Ext.reg('firstTimeIncityFormPanel', Jinpeng.carFirsttimeIncity.FirstTimeIncityFormPanel);
Ext.reg('firstTimeIncityDataPanel', Jinpeng.carFirsttimeIncity.FirstTimeIncityPanel);
