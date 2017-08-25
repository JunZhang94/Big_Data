/**
 * 布控功能。布控查询及布控设防
 */
Ext.ns("Jinpeng.control");

var firstQueryGlag = true;
var isExportAllowed = false;
var isImportAllowed = false;
var visible = false; //元素是否可见

Jinpeng.control.DafaultParam = {
	'page.start' : 0,
	'page.limit' : Jinpeng.PageSize,
	'beginDate' : new Date().format('Y-m-d'),
	'endDate' : (new Date()).clearTime().add(Date.DAY, 1).add(Date.SECOND, -1),
	'flag' : 1
};

var config = {
	dictUrl : rootpath + '/dictionary/jsonDictsInCombo.mvc'
};


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
});

/**
 * 查询表格
 */
Jinpeng.control.SearchControlFormPanel = Ext.extend(Ext.Panel, {
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
					width : 145,
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
						name : 'carNum',
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
					width : 145,
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
					width : 145,
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
				}, {
					xtype : 'tcombo',
					cellWidth : 250,
					name : 'carType',
					id : 'carType',
					fieldLabel : '&nbsp;&nbsp;车辆类型',
					editable : false,
					mode : 'local',
					width : 145,
					emptyText : '请选择车辆类型',
					valueField : 'id',
					stateful : false,
					displayField : 'text',
					triggerAction : 'all',
					store : new Ext.data.JsonStore({
						url : config.dictUrl,
						baseParams : {
							code : 'CarType'
						},
						root : 'data',
						fields : [ 'id', 'text' ]
					})
				}, {
					xtype : 'tcombo',
					name : 'status',
					id : 'status',
					fieldLabel : '&nbsp;&nbsp;布控状态',
					width : 145,
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
				}, {
					xtype : 'tcombo',
					cellWidth : 250,
					name : 'carNumColor',
					id : 'carNumColor',
					fieldLabel : '&nbsp;&nbsp;车牌颜色',
					editable : false,
					mode : 'local',
					width : 145,
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
//					xtype : 'datetimefield',
//					fieldLabel : '&nbsp;&nbsp;布控时间',
//					width : 145,
//					editable : false,
//					name : 'beginDate',
//					id : 'beginDate',
//					vtype : 'beginEndDate',
//					endDateField : 'endDate',
//					value : Jinpeng.control.DafaultParam['beginDate']
					
					xtype : 'textfield',
				    allowBlank : false,
				    editable : false,
					name : 'beginDate',
					id : 'beginDate',
					width : 145,
				    fieldLabel : '开始时间',
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
						        this.maxDate = endDate;
						        this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';  //  格式化时间   
						        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
						        this.alwaysUseStartDate = false;           //  默认使用初始时间   
						    };  
		                    WdatePicker(defaultDateTimeParams);   
		                    field.blur();
		             	}   
					}  
				}, {
//					xtype : 'datetimefield',
//					editable : false,
//					fieldLabel : '至',
//					name : 'endDate',
//					id : 'endDate',
//					vtype : 'beginEndDate',
//					startDateField : 'beginDate',
//					width : 145,
//					value : Jinpeng.control.DafaultParam['endDate']
					
					xtype : 'textfield',
					fieldLabel : '结束时间',
					allowBlank : false,
					editable : false,
					name : 'endDate',
					id : 'endDate',
					width : 145,
					value : new Date().format('Y-m-d') + ' 23:59:59',
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
					xtype : 'tcombo',
					name : 'verifyStatus',
					id : 'verifyStatus',
					fieldLabel : '&nbsp;&nbsp;审核状态',
					width : 145,
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
					xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
					style : 'margin-left:30px',
					id : "searchBut",
					handler : this.searchData,
					scope : this
				} ]
			} ]
		});
		Jinpeng.control.SearchControlFormPanel.superclass.initComponent.apply(this);
		// 加载下拉框数据源
		Ext.each([ "province", "carType", "carNumColor", "status", "surType", 
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
			grid.store.baseParams = {};
			var names = [ "carNum", "carType", "carNumColor", "status", 
			              "surLevel", "surType", "beginDate", "endDate", "verifyStatus","flag","seachFlag" ];
			firstQueryGlag = false;
			//参数赋值
			Ext.each(names, function(item, index, items) {
				if ("carNum" == item) {
					var province = formPanel.form.findField('province').getRawValue();
					var carNum = formPanel.form.findField(item).getValue();
					grid.store.baseParams[item] = formPanel.form.findField("province").getValue() ? (province + "*" + carNum + "*") : "*" + carNum + "*";
				} else if ("beginDate" == item) {
					grid.store.baseParams[item] = Ext.getCmp("beginDate").getValue();//Ext.util.Format.date(formPanel.form.findField(item).getValue(), 'Y-m-d H:i:s');
				} else if ("endDate" == item) {
					grid.store.baseParams[item] = Ext.getCmp("endDate").getValue();
				} else if("flag" == item){
					grid.store.baseParams[item] =1;
				}else if ("seachFlag"==item){
					grid.store.baseParams[item] =2;
				}else {
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
					dataIndex : 'HPHM'
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
						return window.dictionary.getValue("ApprovalState", value);
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
					dataIndex : 'BKDW'
				}, {
					header : '布控人',
					width : 70,
					dataIndex : 'BKR'
				}, {
					header : '操作',
					xtype : 'actiontextcolumn',
					width : 60,
					align : 'center',
					items : [ {
						//icon : rootpath + '/themes/client/blue/images/system/edit.gif',
						tooltip : '操作',
						text : '操作',
						textStyle : 'color:blue;cursor:pointer',
						scope : this,
						handler : this.onDetailHandler
					} ]

				} ]
			}),
			
			bbar : new Jinpeng.widget.PagingToolbar({
				id : 'PagingToolbar',
				store : store,
				displayInfo : true,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			})
		});

		Jinpeng.control.QueryContorlCarGridPanel.superclass.initComponent.apply(this);
		
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
	onDetailHandler : function(grid, rowIndex, colIndex, item, event) {
		event.stopEvent();
		var record = grid.store.getAt(rowIndex);
		var statNum = record.get("SHZT");
		if(statNum == '1'){
			//布控审核
			var win = new Jinpeng.controlRevokeVerify.ControlRevokeVerifyDetailWindow({
				title : '布控详情',
				disableBtn : false,
				ControlID : record.get("BKXXBH")
			});
			win.loadRecordById(record.get("BKXXBH"));
		}else if (statNum == '2'){
			//布控撤销
			var win = new Jinpeng.check.ControlRevokeDetailWindow({
				id : 'detailControlInfoWin',
				title : '布控详细'
			});
			win.loadRecord(record.get("BKXXBH"),true);
			
		}else if(statNum == '4'){
			//撤销审核
			var win = new Jinpeng.controlVerify.ControlVerifyDetailWindow({
				title : '布控详情',
				disableBtn : false,
				ControlID : record.get("BKXXBH")
			});
			win.loadRecordById(record.get("BKXXBH"));
		}else{
			
		}
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
			param.push("beginDate=" + Ext.util.Format.date(Jinpeng.control.DafaultParam['beginDate'], 'Y-m-d H:i:s'));
			param.push("endDate=" + Ext.util.Format.date(Jinpeng.control.DafaultParam['endDate'], 'Y-m-d H:i:s'));
		} else {
			var names = [ "carNum", "carType", "carNumColor", "status", 
			              "surLevel", "surType", "beginDate", "endDate", "verifyStatus" ];
			Ext.each(names, function(item, index, allItems) {
				if ("carNum" == item) {
					var province = formPanel.form.findField('province').getRawValue();
					var carNum = formPanel.form.findField(item).getValue();
					param.push(item + "=" + (formPanel.form.findField("province").getValue() ? (province + "*" + carNum + "*") : "*" + carNum + "*"));
				} else if ("beginDate" == item || "endDate" == item) {
					param.push(item + "=" + Ext.util.Format.date(formPanel.form.findField(item).getValue(), 'Y-m-d H:i:s'));
				} else {
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
		var recode = grid.store.getAt(rowIndex);
		if (recode) {
			this.doModifyControlInfo(recode);
		}
	},
	/**
	 * 删除函数
	 */
	onDeleteHandler : function(grid, rowIndex, colIndex, item, event) {
		event.stopEvent();
		var recode = grid.store.getAt(rowIndex);
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
		win.loadRecordById(survey.get("BKXXBH"));
	},
	/**
	 * 删除操作
	 * @param surveyRecords 布控信息记录
	 */
	doDeleteControlInfo : function(surveyRecords) {
		var surveyId = [];
		var carNums = [];
		var continueDelFlag = true;
		Ext.each(surveyRecords, function(item, index, items) {
			// 只有本级 布控未审状态的可以删除
			if (!(item.data["BKZT"] == Jinpeng.control.status.UNVERIFIED)) {
				continueDelFlag = false;
				return false;
			}
			surveyId.push(item.get("BKXXBH"));
			carNums.push(item.get("carNum"));
		});
		if (!continueDelFlag) {
			var win = new Jinpeng.widget.MessageWindow();
			win.msg = '只能删除本级布控,且未审核状态的布控信息！';
			win.show();
			return;
		}

		/* 确认删除与否 */
		Ext.MessageBox.show({
			buttons : {
				ok : '确认',
				cancel : '取消'
			},
			title : "确认删除",
			msg : "是否要删除" + (surveyId.length > 1 ? "这" + surveyId.length : "该") + "条布控信息？",
			modal : true,
			fn : function(btn, text, options) {
				if (btn == 'ok') {
					/* 确认删除则通过AJAX请求删除相应的数据 */
					Ext.Ajax.request({
						url : rootpath + '/controlManager/deleteControl.mvc',
						params : {
							controlIds : surveyId.join(","),
							carNums : carNums.join(",")
						},
						success : function(response, options) {
							var win = new Jinpeng.widget.MessageWindow();
							win.msg = '删除布控信息成功';
							win.show();
							var grid = Ext.getCmp('queryControlCarGridPanel');
							grid.publish("clearGridSelections", []);
							grid.store.reload();
						}
					});
				}
			}
		});
	},
	//渲染数据
	afterRender : function() {
		Jinpeng.control.QueryContorlCarGridPanel.superclass.afterRender.apply(this);
		this.store.baseParams = Jinpeng.control.DafaultParam;
		this.store.load(); // 加载数据
	},
});


Ext.reg('searchcontrolformpanel', Jinpeng.control.SearchControlFormPanel);
Ext.reg('querycontrolcargrid', Jinpeng.control.QueryContorlCarGridPanel);
