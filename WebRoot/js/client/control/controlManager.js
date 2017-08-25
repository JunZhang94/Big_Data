/**
 * 布控功能。布控查询及布控设防
 */
Ext.ns("Jinpeng.control");

var firstQueryGlag = true;
var isExportAllowed = false;
var isImportAllowed = false;
var visible = false; //元素是否可见
var zhi='';
var recode='';

Jinpeng.control.DafaultParam = {
	'page.start' : 0,
	'page.limit' : Jinpeng.PageSize,
	'beginDate' : new Date().format('Y-m-d'),
	'endDate' : (new Date()).clearTime().add(Date.DAY, 1).add(Date.SECOND, -1),
};

var config = {
	dictUrl : rootpath + '/dictionary/jsonDictsInCombo.mvc'
};


function showCarPlace(carNum){
	var orgId = '';
	var orgType = '';
	var kkbhs = '';
	var startTime = Ext.getCmp('beginDate').getValue();
	var endTime = Ext.getCmp('endDate').getValue();
	var mainParam = {
		'orgId' : orgId,
		'orgType' : orgType,
		'kkbhs' : kkbhs,
		'startTime' : startTime,
		'endTime' : endTime,
		'carNum' : carNum
	};
	var win = new Jinpeng.carFrequency.CarFrequencyWindow({
		cls : 'system_mod',
		modal : true
	});
	win.init(mainParam);
	win.show();
}

Ext.onReady(function() {
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport({
		layout : 'border',
		items : [ {
			region : 'north',
			xtype : 'searchcontrolformpanel',
			border : false,
			height : 90
		}, {
			region : 'center',
			border : false,
			xtype : 'querycontrolcargrid'
		} ]
	});
	//默认加载查询功能
	Ext.getCmp('searchForm').searchData();
});

/**
 * 查询表格
 */
Jinpeng.control.SearchControlFormPanel = Ext.extend(Ext.Panel, {
	id:"searchForm",
	defaults : {
		margins : '0 0 0 4'
	},
	initComponent : function() {
		Ext.apply(this, {
			items : [ {
				xtype : 'form',
				id : 'searchControlForm',
				ref : "../formPanel",
				labelWidth : 80,
				border : false,
				labelAlign : "right",
				cls : 'blue-button-ct',
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD',
				layout : "ttable",
				layoutConfig : {
					columns : 4
				},
				frame : true,
				items : [ {
					xtype : 'compositefield',
					fieldLabel : '车牌号码',
					msgTarget : 'side',
					width : 200,
					cellWidth : 250,
					items : [ {
						xtype : 'tcombo',
						flex : 0.4,
						editable : false,
						store : new Ext.data.JsonStore({
							url : config.dictUrl,
							baseParams : {
								code : 'LicPlate'
							},
							root : 'data',
							fields : [ 'id', 'text' ]
						}),
						mode : 'local',
						id : 'province',
						name : 'province',
						emptyText : '全部',
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'text',
						editable : false,
						anchor : '30%'
					}, {
						xtype : 'textfield',
						name : 'carNumber',
						id:'carNumber',
						flex : 0.6,
						emptyText : '请输入车牌',
						vtype : 'carNumSuffix',
						anchor : '70%'
					} ]
				}, {
					xtype : 'tcombo',
					name : 'surLevel',
					id : 'surLevel',
					fieldLabel : '&nbsp;&nbsp;布控等级',
					editable : false,
					mode : 'local',
					emptyText : '请选择布控等级',
					valueField : 'id',
					displayField : 'text',
					stateful : false,
					triggerAction : 'all',
					width : 200,
					store : new Ext.data.JsonStore({
						url : config.dictUrl,
						baseParams : {
							code : 'ControlLevel'
						},
						root : 'data',
						fields : [ 'id', 'text' ]
					}),
					listeners : {
						'select' : function() {
							Ext.getCmp('surType').setValue("");
						}
					}
				}, {
					xtype : 'surveytypecombo',
					name : 'surType',
					id : 'surType',
					fieldLabel : '&nbsp;&nbsp;布控类型',
					editable : false,
					mode : 'local',
					emptyText : '请选择布控类型',
					valueField : 'id',
					displayField : 'text',
					stateful : false,
					triggerAction : 'all',
					width : 200,
					store : new Ext.data.JsonStore({
						url : config.dictUrl,
						baseParams : {
							code : 'ControlType'
						},
						root : 'data',
						fields : [ 'id', 'text' ]
					}),
					getControlLevel : function() {
						return Ext.getCmp("surLevel").getValue();
					}
				}/*, {
					xtype : 'tcombo',
					name : 'status',
					id : 'status',
					fieldLabel : '&nbsp;&nbsp;布控状态',
					width : 200,
					editable : false,
					mode : 'local',
					emptyText : '请选择布控状态',
					valueField : 'id',
					displayField : 'text',
					stateful : false,
					triggerAction : 'all',
					store : new Ext.data.JsonStore({
						url : config.dictUrl,
						baseParams : {
							code : 'ControlState'
						},
						root : 'data',
						fields : [ 'id', 'text' ]
					})
				}*/, {
					xtype : 'tcombo',
					cellWidth : 250,
					name : 'carNumColor',
					id : 'carNumColor',
					fieldLabel : '&nbsp;&nbsp;车牌颜色',
					editable : false,
					mode : 'local',
					width : 200,
					emptyText : '请选择车牌颜色',
					valueField : 'id',
					stateful : false,
					displayField : 'text',
					triggerAction : 'all',
					store : new Ext.data.JsonStore({
						url : config.dictUrl,
						baseParams : {
							code : 'LicPlateColor'
						},
						root : 'data',
						fields : [ 'id', 'text' ]
					})
				}, {
					xtype : 'tcombo',
					name : 'verifyStatus',
					id : 'verifyStatus',
					fieldLabel : '&nbsp;&nbsp;审核状态',
					width : 200,
					editable : false,
					mode : 'local',
					emptyText : '请选择审核状态',
					valueField : 'id',
					displayField : 'text',
					stateful : false,
					triggerAction : 'all',
					store : new Ext.data.JsonStore({
						url : config.dictUrl,
						baseParams : {
							code : 'ApprovalState'
						},
						root : 'data',
						fields : [ 'id', 'text' ]
					})
				}, {
					xtype : 'textfield',
					name : 'beginDate',
					id : 'beginDate',
				    fieldLabel : '开始时间',
				    width:200,
				    allowBlank : false,
				    editable : false,
					value : new Date().format('Y-m-d') + ' 00:00:00',
					anchor : '94%',
					style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
					listeners  : {   
		            	'focus':function(field){  
							var endTime = Ext.util.Format.date(
									new Date(), 'Y-m-d H:i:s');
							var endDate = Ext.getCmp("endDate").getValue();
							//  日期时间的默认参数      
						    var defaultDateTimeParams = new function()   
						    {   
						        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
						        this.startDate  = endTime;    //  开始时间   
						        this.maxDate  = endDate;
						        this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';  //  格式化时间   
						        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
						        this.alwaysUseStartDate = false;           //  默认使用初始时间   
						    };  
		                    WdatePicker(defaultDateTimeParams);   
		                    field.blur();
		             	}   
					}  
				}, {
					xtype : 'textfield',
					fieldLabel : '结束时间',
					name : 'endDate',
					id : 'endDate',
					allowBlank : false,
				    editable : false,
					value : new Date().format('Y-m-d') + ' 23:59:59',
					width:200,
					anchor : '94%',
					style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
					listeners  : {   
		            	'focus':function(field){  
							var endTime = Ext.util.Format.date(
									new Date(), 'Y-m-d H:i:s');
							var beginDate = Ext.getCmp("beginDate").getValue();
							//  日期时间的默认参数      
						    var defaultDateTimeParams = new function()   
						    {   
						        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
						        this.startDate  = endTime;    //  开始时间   
						        this.minDate = beginDate;
						        this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';  //  格式化时间   
						        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
						        this.alwaysUseStartDate = false;           //  默认使用初始时间   
						    };  
		                    WdatePicker(defaultDateTimeParams);   
		                    field.blur();
		             	}   
					} 
				}, {
					xtype : 'spacer'
				}, {
		        	xtype : 'tcombo',
					id : 'carBrand',
					name:'carBrand',
					fieldLabel: '车辆品牌',
					width : 200,
					store : new Ext.data.JsonStore({
						url : rootpath
							+ "/dictionary/jsonCarBrandInCombo.mvc",
						root : "data",
						fields : [ 'id', 'text' ],
						autoLoad : true    
					}),
					emptyText:'请选择车辆品牌',
					editable : false,
					selectOnFocus : true,
					forceSelection : true,
					displayField : 'text',
					valueField:'id',
					mode : 'local',
					triggerAction : 'all',
					listeners : {
					     select : function(combo, record2, index) {
							var carTypeMode = new Ext.data.JsonStore({
								url : encodeURI(rootpath+"/dictionary/jsonCarTypeInCombo.mvc?carBrand="+record2.data['text']),
								root : "data",
								fields : [ 'id', 'text' ],
								autoLoad:false,
								autoSync:true
							});
							carTypeMode.load({
							    scope: this,
								    callback: function(records, operation, success) {
								        var listRecord = new Array();
										if(carTypeMode instanceof Ext.data.Store){  
											carTypeMode.each(function(result){  
									        	listRecord.push(result.data['text']);  
									        }); 
										 }
										Ext.getCmp('brandType').clearValue();
										Ext.getCmp('carYear').clearValue();
										Ext.getCmp('brandType').getStore().loadData(listRecord);
								    }
							});

					     }
					}
				}, {
		        	xtype : 'tcombo',
					id : 'brandType',
					name:'brandType',
					fieldLabel: '型号',
					emptyText:'请选择车辆型号',
					editable : false,
					selectOnFocus : true,
					forceSelection : true,
					store: [],
					width : 200,
					displayField : 'text',
					valueField:'id',
					mode : 'local',
					triggerAction : 'all',
					listeners : {
					     select : function(combo, record, index) {
							var carYearStore = new Ext.data.JsonStore({
								url : encodeURI(rootpath+"/dictionary/jsonCarYearInCombo.mvc?carType="+combo.value+"&carBrand="+Ext.getCmp('carBrand').value),
								root : "data",
								fields : [ 'id', 'text' ],
								autoLoad:false,
								autoSync:true
							});
							carYearStore.load({
							    scope: this,
								    callback: function(records, operation, success) {
								        var yearRecord = new Array();
										if(carYearStore instanceof Ext.data.Store){  
											carYearStore.each(function(result){  
									        	yearRecord.push(result.data['text']);  
									        }); 
										 }
										Ext.getCmp('carYear').clearValue();
										Ext.getCmp('carYear').getStore().loadData(yearRecord);
								    }
							});
							
					     }
					}
				}, {
		        	xtype : 'tcombo',
					id : 'carYear',
					name:'carYear',
					fieldLabel: '年款',
					width : 200,
					editable : false,
					selectOnFocus : true,
					forceSelection : true,
					emptyText:'请选择车辆年款',
					store: [],
					displayField : 'text',
					valueField:'id',
					mode : 'local',
					triggerAction : 'all'
				}, {
					bodyStyle : 'padding-left:10px',
					xtype : 'compositefield',
					items : [{
						flex : 31,
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
						id : "searchBut",
						handler : this.searchData
					},{
						flex : 31,
						xtype : 'button',
						id : "resetBut",
						text : '&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;',
						handler : this.resetMethod
					}]
				} ]
			} ]
		});
		Jinpeng.control.SearchControlFormPanel.superclass.initComponent.apply(this);
		// 加载下拉框数据源
		Ext.each([ "province", "carNumColor", "surType", 
		           "surLevel", "verifyStatus" ], function(item, index, allItems) {
			Ext.getCmp(item).store.load();
		});
	},
	searchData : function() {
		//获取到grid
		var grid = Ext.getCmp('queryControlCarGridPanel');
		if (grid) {
			var formPanel = Ext.getCmp("searchControlForm");
			if (!formPanel.getForm().isValid()) {
				return;
			}
			//查询参数设置
			grid.store.baseParams = {
			};
			var names = [ "carNumber", "carNumColor", 
			              "surLevel", "surType", "beginDate", "endDate", "verifyStatus", "carBrand", "carType", "carYear"];
			firstQueryGlag = false;
			//参数赋值
			Ext.each(names, function(item, index, items) {
				if ("carNumber" == item) {
					var province = formPanel.form.findField('province').getRawValue();
					var carNum = formPanel.form.findField(item).getRawValue();
					grid.store.baseParams[item] = formPanel.form.findField("province").getValue() ? (province + "*" + carNum + "*") : "*" + carNum + "*";
				} else if ("beginDate" == item) {
					grid.store.baseParams[item] = Ext.getCmp("beginDate").getValue();//Ext.util.Format.date(formPanel.form.findField(item).getValue(), 'Y-m-d H:i:s');
				} else if("endDate" == item) {
					grid.store.baseParams[item] = Ext.getCmp("endDate").getValue();//Ext.util.Format.date(formPanel.form.findField(item).getValue(), 'Y-m-d H:i:s');
				} else if("carType" == item) {
					grid.store.baseParams[item] = Ext.getCmp("brandType").getValue();//Ext.util.Format.date(formPanel.form.findField(item).getValue(), 'Y-m-d H:i:s');
				} else {
					grid.store.baseParams[item] = formPanel.form.findField(item).getValue();
				}

			});
			this.publish("clearGridSelections", []);
			grid.store.load({
				params : {
					'page.start' : 0,
					'page.limit' : grid.pageSize
				}
			});
		}
	}
	,
	resetMethod :  function() {
		Ext.getCmp("searchControlForm").getForm().reset();
	}
});

/**
 * 查询数据列表
 */
Jinpeng.control.QueryContorlCarGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'queryControlCarGridPanel',
	autoLoad : false,
	stripeRows : true,
	enableHdMenu : false,
	pageSize : Jinpeng.PageSize,
	stateful : false,
	border : false,
	confirmUrl : rootpath + '/controlManager/queryControl.mvc',
	initComponent : function() {
		var store = new Ext.data.JsonStore({
			url : this.confirmUrl,
			root : 'result',
			totalProperty : 'totalCount',
			fields : [ {
				name : 'BKXXBH'
			}, {
				name : 'HPHM'
			}, {
				name : 'CLLX'
			}, {
				name : 'HPYS'
			}, {
				name : 'BKJB'
			}, {
				name : 'BKLB'
			}, {
				name : 'BKZT'
			}, {
				name : 'BKSK'
			}, {
				name : 'BKLEN'
			}, {
				name : 'BKDW'
			}, {
				name : 'BKR'
			}, {
				name : 'SHZT'
			} ]
		});
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this, {
			store : store,
			selModel : sm,
			colModel : new Ext.grid.ColumnModel({
				defaults : {
					// width : 100,
					sortable : false
				},
				columns : [ new Ext.ux.grid.PagingRowNumberer(), sm, {
					width : 60,
					header : '车牌号码',
					dataIndex : 'HPHM',
					renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
							var str = "";
							str = "<a href='#' onclick=\"showCarPlace('" + value + "','')\">" + value + "</a>";
							return str;
					}
				}, {
					header : '车辆类型',
					width : 60,
					dataIndex : 'CLLX',
					renderer : function(value, metadata, record, rowIndex, colIndex, store) {
						return window.dictionary.getValue("CarType", value);
					}
				}, {
					header : '车牌颜色',
					width : 60,
					dataIndex : 'HPYS',
					renderer : function(value, metadata, record, rowIndex, colIndex, store) {
						return window.dictionary.getValue("LicPlateColor", value);
					}
				}, {
					header : '布控等级',
					dataIndex : 'BKJB',
					width : 60,
					renderer : function(value, metadata, record, rowIndex, colIndex, store) {
						return window.dictionary.getValue("ControlLevel", value);
					}
				}, {
					header : '布控类型',
					width : 80,
					dataIndex : 'BKLB',
					renderer : function(value, metadata, record, rowIndex, colIndex, store) {
						return window.dictionary.getValue("ControlType", value);
					}
				}, {
					header : '审核状态',
					dataIndex : 'SHZT',
					width : 100,
					renderer : function(value, metadata, record, rowIndex, colIndex, store) {
						var shzt=window.dictionary.getValue("ApprovalState", value);
						if(shzt==null){
							return '<font ext:qtip=""></font>';
						}else{
							return '<font ext:qtip="'+shzt+'">'+shzt+'</font>';
						}
						 
					}
				}, {
					header : '布控时间',
					width : 120,
					dataIndex : 'BKSK',
					renderer : function(value) {
			          return value.substring(0,value.indexOf("."));
					}
				}, {
					header : '失效时间',
					width : 120,
					dataIndex : 'BKLEN',
					renderer : function(value) {
			          return value.substring(0,value.indexOf("."));
					}
				}, {
					header : '布控单位',
					dataIndex : 'BKDW',
					renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
						//当文字过多的时候，鼠标移上去就给悬浮狂提示
				     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
					}
				}, {
					header : '布控人',
					width : 70,
					dataIndex : 'BKR'
				}, {
					header : '操作',
					xtype : 'actioncolumn',
					width : 60,
					align : 'center',
					items : [ {
						icon : rootpath + '/themes/client/blue/images/system/edit.gif',
						tooltip : '修改',
						scope : this,
						handler : this.onModifyHandler
					}, {
						icon : rootpath + '/themes/client/blue/images/system/delete.gif',
						tooltip : '删除',
						scope : this,
						handler : this.onDeleteHandler
					} ]
				} ]
			}),
			tbar : {
				cls : 'blue-button-ct',
				items : [ {
					xtype : 'button',
					text : '添加布控',
					height : 20,
					id : 'exactBtn',
					hidden : visible,
					ref : '../btnAddControl'
				},{
	          		  xtype : 'tbspacer',
	          		  width : 10
          	  	}, {
					xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;修改&nbsp;&nbsp;&nbsp;',
					height : 20,
					id : 'editBtn',
					ref : '../btnModifyControl'
				},{
	          		  xtype : 'tbspacer',
	          		  width : 10
          	  	}, {
					xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;删除&nbsp;&nbsp;&nbsp;',
					id : 'deleteBtn',
					height : 20,
					ref : '../btnDeleteControl'
				},{
	          		  xtype : 'tbspacer',
	          		  width : 10
          	  	}, {
					xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;导出&nbsp;&nbsp;&nbsp;',
					id : 'exportBtn',
					height : 20,
					ref : '../btnExport'
				},{
	          		  xtype : 'tbspacer',
	          		  width : 10
          	  	}, {
					xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;刷新&nbsp;&nbsp;&nbsp;',
					id : 'refreshBtn',
					height : 20,
					ref : '../btnRefresh'
				} ]
			},
			bbar : new Jinpeng.widget.PagingToolbar({
				id : 'PagingToolbar',
				store : store,
				displayInfo : true,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			}),
			listeners : {
				afterrender : function() {
					}
				,
				/*双击查看*/
				rowdblclick : function(grid, rowIndex, e ) {
					var recode = grid.store.getAt(rowIndex).data;
					if (recode) {
						var win = new Jinpeng.control.ControlInputWindow({
							id : 'modifyControlWin',
							title : '修改布控',
							url : rootpath + '/controlManager/updateControl.mvc',
							updateFlag : true
						});
						//这个参数的传参方式是选择checkbox的时候才执行
						if(recode["BKXXBH"]==undefined){
							win.loadRecordById(recode.get("BKXXBH"));
						}else{
							//这个参数的传参方式是双击页面的一天信息的时候才执行
							win.loadRecordById(recode["BKXXBH"]);
						}
					}
				}
				}
		});
		
		/*
		this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
			var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
			var orgId = '';
			var orgType = '';
			var kkbhs = '';
			var startTime = Ext.getCmp('beginDate').getValue();
			var endTime = Ext.getCmp('endDate').getValue();
			var recode = grid.store.getAt(rowIndex);
			var carNum = recode.get("HPHM");
			var mainParam = {
				'orgId' : orgId,
				'orgType' : orgType,
				'kkbhs' : kkbhs,
				'startTime' : startTime,
				'endTime' : endTime,
				'carNum' : carNum,
				'counts' : recode.data.passTimes
			};
			if (fieldName=='HPHM') {
				var win = new Jinpeng.carFrequency.CarFrequencyWindow({
					cls : 'system_mod',
					modal : true
				});
				win.init(mainParam);
				win.show();
			}
		});
		*/
		Jinpeng.control.QueryContorlCarGridPanel.superclass.initComponent.apply(this);
		//通过事件绑定查询方法
		this.btnAddControl.on('click', this.onBtnAddNewHandler, this);
		this.btnModifyControl.on('click', this.onBtnModifyHandler, this);
		this.btnDeleteControl.on('click', this.onBtnDeleteHandler, this);
		this.btnRefresh.on('click', this.onBtnRefreshHandler, this);
		this.btnExport.on('click', this.onBtnExportHandler, this);
	},
	//添加
	onBtnAddNewHandler : function() {
		var win = new Jinpeng.control.ControlInputWindow({
			id : 'addNewControlWin',
			title : '精确布控'
		});
		win.loadLocalEmptyControl();
		win.show();
	},
	//修改函数
	onBtnModifyHandler : function() {
		var records = this.getSelectionModel().getSelections();
		if (records.length == 1) {
			this.doModifyControlInfo(records[0]);
		} else {
			var msg = "";
			if (records.length == 0) {
				msg = "请选择要修改的记录！";
			} else {
				msg = "一次只能修改一条记录！";
			}
			var win = new Jinpeng.widget.MessageWindow();
			win.msg = msg;
			win.show();
		}
	},
	//删除函数
	onBtnDeleteHandler : function() {
		var records = this.getSelectionModel().getSelections();
		if (records.length > 0) {
			this.doDeleteControlInfo(records);
		} else {
			var win = new Jinpeng.widget.MessageWindow();
			win.msg = '您没有选中数据，请先选择要删除的布控数据！';
			win.show();
		}
	},
	//刷新按钮事件处理
	onBtnRefreshHandler : function() {
		var grid = Ext.getCmp('queryControlCarGridPanel');
		grid.publish("clearGridSelections", []);
		grid.store.reload();
	},
	/**
	 * 导出处理函数
	 */
	onBtnExportHandler : function() {
		var records = this.getSelectionModel().getSelections();
		var config = {
			totalURL : rootpath + "/controlManager/countExports.mvc",
			selectExportURL : rootpath + "/controlManager/exportControlToExcel.mvc",
			queryExportURL : rootpath + "/controlManager/exportControlToExcel.mvc"
		};
		var formPanel = Ext.getCmp("searchControlForm");
		// 得到选中的id
		var idStrs = [];
		for ( var i = 0; i < records.length; i++) {
			idStrs[idStrs.length] = records[i].get('BKXXBH');
		}
		config.ids = idStrs;
		var param = [];
		if (firstQueryGlag) {
			param.push("beginDate=" + Jinpeng.control.DafaultParam['beginDate']);//Ext.util.Format.date(Jinpeng.control.DafaultParam['beginDate'], 'Y-m-d H:i:s'));
			param.push("endDate=" + Jinpeng.control.DafaultParam['endDate']);// Ext.util.Format.date(Jinpeng.control.DafaultParam['endDate'], 'Y-m-d H:i:s'));
		} else {
			var names = [ "carNum", "carNumColor", 
			              "surLevel", "surType", "beginDate", "endDate", "verifyStatus" ];
			Ext.each(names, function(item, index, allItems) {
				if ("carNum" == item) {
					var province = formPanel.form.findField('province').getRawValue();
					var carNum = Ext.getCmp("carNumber").getValue();//formPanel.form.findField(item).getValue();
					param.push(item + "=" + (formPanel.form.findField("province").getValue() ? (province + "*" + carNum + "*") : "*" + carNum + "*"));
				} else if ("beginDate" == item) {
					param.push(item + "=" +Ext.getCmp("beginDate").getValue());// Ext.util.Format.date(formPanel.form.findField(item).getValue(), 'Y-m-d H:i:s'));
				} else if ("endDate" == item) {
					param.push(item + "=" +Ext.getCmp("endDate").getValue());
				}else {
					param.push(item + "=" + formPanel.form.findField(item).getValue());
				}
			});
		}
		config.queryCondition = param.join("&");
		var ExportHelper = new Jinpeng.ExportHelper(config);
		ExportHelper.startExport(true);

	},
	/**
	 * 修改函数
	 */
	onModifyHandler : function(grid, rowIndex, colIndex, item, event) {
		event.stopEvent();
		var recode = grid.store.getAt(rowIndex).data;
		if (recode) {
			this.doModifyControlInfo(recode);
		}
	},
	/**
	 * 删除函数
	 */
	onDeleteHandler : function(grid, rowIndex, colIndex, item, event) {
		event.stopEvent();
		 recode = grid.store.getAt(rowIndex).data;
		if (recode) {
			this.doDeleteControlInfo([ recode ]);
		}
	},
	/**
	 * 弹出修改布控信息窗口
	 */
	doModifyControlInfo : function(survey) {
		var win = new Jinpeng.control.ControlInputWindow({
			id : 'modifyControlWin',
			title : '修改布控',
			url : rootpath + '/controlManager/updateControl.mvc',
			updateFlag : true
		});
		//这个参数的传参方式是选择checkbox的时候才执行
		if(survey["BKXXBH"]==undefined){
			win.loadRecordById(survey.get("BKXXBH"));
		}else{
			//这个参数的传参方式是双击页面的一天信息的时候才执行
			win.loadRecordById(survey["BKXXBH"]);
		}
		
		
		
	},
	/**
	 * 删除操作
	 * @param surveyRecords 布控信息记录
	 */
	doDeleteControlInfo : function(surveyRecords) {
		zhi = surveyRecords;
		var win = new Jinpeng.control.HistoryCarDetailWindows();
		win.msg = "确定要删除？";	
		win.show();
	},
	//渲染数据
	afterRender : function() {
		Jinpeng.control.QueryContorlCarGridPanel.superclass.afterRender.apply(this);
		this.store.baseParams = Jinpeng.control.DafaultParam;
		this.store.load(); // 加载数据
	},
});

Jinpeng.control.HistoryCarDetailWindows = Ext.extend(Jinpeng.widget.GeneralWindow,{
	width : 300,
	height : 105,
	closeAction : "close",
	title : '提示',
	border : false,
	clickFlag : false,
	loadId : '',
	recode : null,
	initComponent : function() {
		Ext.apply(this, {
			items : [ {
				xtype : 'form',
				region : 'center',
				items : [
				{
					columnWidth : 85,
					layout : 'form',
					region : 'center',
					items : [{xtype : 'fieldset',
							layoutConfig : {
								columns : 1
							},
							items : [{
								region : 'center',
								items : [ {
									region : 'center',
									xtype : 'displayfield',
									fieldLabel : '',
									id:'carNum',
									name : 'carNum',
									anchor : '96%',
									cls:'qwqqq'
								} ]
							}]
						}]
				} ]
			} ],
				cls : 'blue-button-sadsact',
				buttonAlign : 'center',
				buttons : {
					cls : 'blue-button-cssst',
					items : [ {
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;',
						id:'id1',
						height : 20,
						width : 55,
						scope : this,
						handler : this.fengshow
					},{
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;',
						id:'id2',
						height : 20,
						width : 55,
						scope : this,
						handler : this.close
					}]
				}
				
		});
		Jinpeng.control.HistoryCarDetailWindows .superclass.initComponent.apply(this);
	},fengshow : function(){
		this.close();
		 var  surveyRecords ;
		if(zhi!=''){
		 surveyRecords = zhi;
		}else if(recode!=''){
			surveyRecords= recode;
		}
		var surveyId = [];
		var carNums = [];
		var continueDelFlag = true;
		Ext.each(surveyRecords, function(item, index, items) {
			// 只有本级 布控未审状态的可以删除
			if(item["BKZT"] != undefined){
				if ((item["BKZT"] == Jinpeng.control.status.UNVERIFIED.toString())) {
				  continueDelFlag = false;
				  return false;
			    } 
			}else if(item["BKZT"]==undefined){
				if ((item.get("BKZT") == Jinpeng.control.status.UNVERIFIED.toString())) {
				  continueDelFlag = false;
				  return false;
			    } 
			}
			
			if(item["BKXXBH"]==undefined){
				surveyId.push(item.get("BKXXBH"));
			}else{
				surveyId.push(item["BKXXBH"]);
			}
			carNums.push(item["carNum"]);
		});
		if (!continueDelFlag) {
			var win = new Jinpeng.widget.MessageWindow();
			win.msg = '只能删除本级布控,且未审核状态的布控信息！';
			win.show();
			return;
		}

		/* 确认删除与否 */
//		Ext.MessageBox.show({
//			buttons : {
//				ok : '确认',
//				cancel : '取消'
//			},
//			title : "确认删除",
//			msg : "是否要删除" + (surveyId.length > 1 ? "这" + surveyId.length : "该") + "条布控信息？",
//			modal : true,
//			fn : function(btn, text, options) {
//				if (btn == 'ok') {
					/* 确认删除则通过AJAX请求删除相应的数据 */
					Ext.Ajax.request({
						url : rootpath + '/controlManager/deleteControl.mvc',
						params : {
							controlIds : surveyId.join(","),
							carNums : carNums.join(",")
						},
						success : function(response, options) {
							recode='';
							zhi='';
							var win = new Jinpeng.widget.MessageWindow();
							win.msg = '删除布控信息成功';
							win.show();
							var grid = Ext.getCmp('queryControlCarGridPanel');
							grid.publish("clearGridSelections", []);
							grid.store.reload();
						}
					});
//				}
//			}
//		});
	},
	afterRender : function() {
		Jinpeng.control.HistoryCarDetailWindows .superclass.afterRender.call(this);
		//根据点击记录时设置的记录ID加载数据
		this.loadRecordById(this.msg);
	}
	,
	loadRecordById : function(msg) {
		var record = {};
		// 加载数据		
		record.carNum = msg;
		Ext.getCmp("carNum").setValue(msg);
	}
	
});
Ext.reg('searchcontrolformpanel', Jinpeng.control.SearchControlFormPanel);
Ext.reg('querycontrolcargrid', Jinpeng.control.QueryContorlCarGridPanel);
