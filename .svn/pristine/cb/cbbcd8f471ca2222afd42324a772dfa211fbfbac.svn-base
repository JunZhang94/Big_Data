/**
 * 布控功能管理主页。布控查询及布控设防
 */
Ext.ns("Jinpeng.blackList");

Jinpeng.blackList.DafaultParam = {
	'page.start' : 0,
	'page.limit' : Jinpeng.PageSize,
	'beginDate' : new Date().format('Y-m-d'),
	'endDate' : (new Date()).clearTime().add(Date.DAY, 1).add(Date.SECOND, -1),
};

var config = {
	dictUrl : rootpath + '/dictionary/jsonDictsInCombo.mvc'
};

Ext.onReady(function() {
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'north',
			xtype : 'searchcontrolformpanel',
			border : false,
			height : 60
			},{
			region : 'center',
			border : false,
			xtype : 'querycontrolcargrid'
			}]
		});
		// 默认加载查询功能
		Ext.getCmp('searchForm').searchData();
});

/**
 * 查询表格
 */
Jinpeng.blackList.SearchControlFormPanel = Ext.extend(Ext.Panel, {
	id:"searchForm",
	defaults : {
		margins : '0 0 0 4'
		},
	initComponent : function(){
		//号牌颜色
		var carNumColorStore = new Ext.data.JsonStore({
			url : rootpath
					+ "/dictionary/jsonDictsInCombo.mvc?code=LicPlateColor",
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
		Ext.apply(this, {
			items : [{
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
				items : [{
					xtype : 'compositefield',
					fieldLabel : '车牌号码',
					msgTarget : 'side',
					width : 200,
					cellWidth : 250,
					items : [{
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
						anchor : '20%'
						},{
							xtype : 'textfield',
							name : 'carNumber',
							id:'carNumber',
							flex : 0.6,
							emptyText : '请输入车牌',
							vtype : 'carNumSuffix',
							anchor : '80%'
						}]
					},{
						xtype : 'tcombo',
						id : 'carNumColor',
						name : 'carNumColor',
						fieldLabel : '号牌颜色',
						store : carNumColorStore,
						mode : 'local',
						emptyText : '全部',
						width:200,
						autoSelect : true,
						showSelectAll: true,
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'text',
						anchor : '94%'
					},{
						xtype : 'tcombo',
						id : 'carColor',
						name : 'carColor',
						fieldLabel : '车身颜色',
						store : carColorStore,
						mode : 'local',
						emptyText : '全部',
						autoSelect : true,
						width:200,
						showSelectAll: true,
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'text',
						anchor : '94%'
					},{
						xtype : 'tcombo',
						id : 'cllx',
						name : 'cllx',
						fieldLabel : '车辆类别',
						store : carCategoryStore,
						mode : 'local',
						emptyText : '全部',
						autoSelect : true,
						width:200,
						showSelectAll: true,
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'text',
						anchor : '94%'
					},{
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
						listeners : {   
							'focus':function(field){  
								var endTime = Ext.util.Format.date(
										new Date(), 'Y-m-d H:i:s');
								var endDate = Ext.getCmp("endDate").getValue();
								// 日期时间的默认参数
							    var defaultDateTimeParams = new function(){   
							        this.readOnly   = true;           // 不允许在文本输入框中修改时间
							        this.startDate  = endTime;    // 开始时间
							        this.maxDate  = endDate;
							        this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';  // 格式化时间
							        this.autoPickDate = true; this.isShowWeek = false;                  // 默认不显示周
							        this.alwaysUseStartDate = false;           // 默认使用初始时间
							    	};  
			                    WdatePicker(defaultDateTimeParams);   
			                    field.blur();
		             		}   
						}  
					},{
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
								// 日期时间的默认参数
							    var defaultDateTimeParams = new function(){   
							        this.readOnly   = true;           // 不允许在文本输入框中修改时间
							        this.startDate  = endTime;    // 开始时间
							        this.minDate = beginDate;
							        this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';  // 格式化时间
							        this.autoPickDate = true; this.isShowWeek = false;                  // 默认不显示周
							        this.alwaysUseStartDate = false;           // 默认使用初始时间
							    	};  
			                    WdatePicker(defaultDateTimeParams);   
			                    field.blur();
		             		}   
						} 
					},{
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
						}
					]
				}]
			}],
			listeners : {
				afterrender : function() {
					carColorStore.load();
					carNumColorStore.load();
					carCategoryStore.load();
				}
			}
		});
		Jinpeng.blackList.SearchControlFormPanel.superclass.initComponent.apply(this);
		// 加载下拉框数据源
		Ext.each([ "province" ], function(item, index, allItems) {
			Ext.getCmp(item).store.load();
		});
	},
	searchData : function() {
		// 获取到grid
		var grid = Ext.getCmp('queryControlCarGridPanel');
		if (grid) {
			var formPanel = Ext.getCmp("searchControlForm");
			if (!formPanel.getForm().isValid()) {
				return;
				}
			// 查询参数设置
			grid.store.baseParams = {};
			var names = [ "carNumber","carNumColor", "beginDate", "endDate", "carColor", "cllx"];
			firstQueryGlag = false;
			// 参数赋值
			Ext.each(names, function(item, index, items) {
				if ("carNumber" == item) {
					var province = formPanel.form.findField('province').getRawValue();
					var carNum = formPanel.form.findField(item).getRawValue();
					var carNumber="";
					if(province !="" && province.length>0){
						carNumber=carNumber+province;
					}
					if(carNum !="" && carNum.length>0){
						carNumber=carNumber+"*"+carNum+"*";
					}
					grid.store.baseParams[item] = carNumber;
				} else if ("beginDate" == item) {
					grid.store.baseParams[item] = Ext.getCmp("beginDate").getValue();
				} else if("endDate" == item) {
					grid.store.baseParams[item] = Ext.getCmp("endDate").getValue();
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
		},
		resetMethod :  function() {
			Ext.getCmp("searchControlForm").getForm().reset();
		}
});

/**
 * 查询数据列表
 */
Jinpeng.blackList.QueryContorlCarGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'queryControlCarGridPanel',
	autoLoad : false,
	stripeRows : true,
	enableHdMenu : false,
	pageSize : Jinpeng.PageSize,
	stateful : false,
	border : false,
	confirmUrl : rootpath + '/controlManager/queryBlackList.mvc',
	initComponent : function() {
		var store = new Ext.data.JsonStore({
			url : this.confirmUrl,
			root : 'result',
			totalProperty : 'totalCount',
			fields : [ {
				name : 'BKXXBH'
			},{
				name : 'HPHM'
			},{
				name : 'CLPP'
			},{
				name : 'CSYS'
			},{
				name : 'HPYS'
			},{
				name : 'CLLX'
			},{
				name : 'BKSK'
			},{
				name : 'BKR'
			},{
				name : 'BK_TYPE'
			}]
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
					},{
						header : '车辆类别',
						width : 80,
						dataIndex : 'CLLX',
						renderer : function(value, metadata, record, rowIndex, colIndex, store) {
							return window.dictionary.getValue("CarCategory", value);
						}
					},{
						header : '车身颜色',
						width : 80,
						dataIndex : 'CSYS',
						renderer : function(value, metadata, record, rowIndex, colIndex, store) {
							return window.dictionary.getValue("CarColor", value);
						}
					},{
						header : '号牌颜色',
						width : 80,
						dataIndex : 'HPYS',
						renderer : function(value, metadata, record, rowIndex, colIndex, store) {
							return window.dictionary.getValue("LicPlateColor", value);
						}
					},{
						header : '车辆品牌',
						width : 80,
						dataIndex : 'CLPP'
					},{
						header : '数据类型',
						width : 120,
						dataIndex : 'BK_TYPE',
						renderer : function(value) {
							if (value == '1') {
								return '黑名单';
							} else if (value == '2') {
								return '白名单';
							} else {
								return '';
							}
						}
					},{
						header : '录入时间',
						width : 120,
						dataIndex : 'BKSK',
						renderer : function(value) {
				          return value.substring(0,value.indexOf("."));
						}
					},{
						header : '操作人员',
						width : 70,
						dataIndex : 'BKR'
					}]
				}),
				tbar : {
				cls : 'blue-button-ct',
				items : [{
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;删除&nbsp;&nbsp;&nbsp;',
						id : 'deleteBtn',
						height : 20,
						ref : '../btnDelete'
          	  		},{
			          	xtype : 'tbspacer',
			          	width : 10
          	  		},{
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;数据导入&nbsp;&nbsp;&nbsp;',
						id : 'exportBtn',
						height : 20,
						ref : '../btnExport'
          	  		}]
				},
				bbar : new Jinpeng.widget.PagingToolbar({
					id : 'PagingToolbar',
					store : store,
					displayInfo : true,
					pageSize : this.pageSize,
					displayMsg : '{0} - {1} of 共{2}条',
					emptyMsg : "无数据"
				})
			});
			Jinpeng.blackList.QueryContorlCarGridPanel.superclass.initComponent.apply(this);
			// 通过事件绑定查询方法
			this.btnDelete.on('click', this.onBtnDeleteHandler, this);
			this.btnExport.on('click', this.onBtnExportHandler, this);
		},
		//删除函数
		onBtnDeleteHandler : function() {
			var records = this.getSelectionModel().getSelections();
			if (records.length > 0) {
				this.doDeleteControlInfo(records);
			} else {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '您没有选中数据，请先选择要删除的数据！';
				win.show();
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
		 * 删除操作
		 * @param surveyRecords 布控信息记录
		 */
		doDeleteControlInfo : function(surveyRecords) {
			var surveyId = [];
			Ext.each(surveyRecords, function(item, index, items) {
				if(item["BKXXBH"]==undefined){
					surveyId.push(item.get("BKXXBH"));
				}else{
					surveyId.push(item["BKXXBH"]);
				}
			});
			Ext.MessageBox.confirm("提示", "确定要删除？", function(v) {
				if ("yes" == v) {
					Ext.Ajax.request({
						url : rootpath + '/controlManager/deleteControl.mvc',
						params : {
							controlIds : surveyId.join(",")
						},
						success : function(response, options) {
							recode='';
							zhi='';
							var win = new Jinpeng.widget.MessageWindow();
							win.msg = '删除信息成功';
							win.show();
							var grid = Ext.getCmp('queryControlCarGridPanel');
							grid.publish("clearGridSelections", []);
							grid.store.reload();
						}
					});
				}
			});
		},
		onBtnExportHandler : function() {
			new Jinpeng.blackFile.UploadWindow({
				fileName:"blackListExcel",
				uploadURL : rootpath + "/controlManager/importDataModel.mvc",
				//templateURL : rootpath + "/resources/黑板名单模板.xls",
				templateURL : rootpath + "/resources/whiteBlackModel.xls",
				callbackFn : function(data){
					//Ext.getCmp('carNumStr').setValue(data);
				}
			}).show();
		},
		// 渲染数据
		afterRender : function() {
			Jinpeng.blackList.QueryContorlCarGridPanel.superclass.afterRender.apply(this);
			this.store.baseParams = Jinpeng.blackList.DafaultParam;
			this.store.load(); // 加载数据
		}
});


Ext.reg('searchcontrolformpanel', Jinpeng.blackList.SearchControlFormPanel);
Ext.reg('querycontrolcargrid', Jinpeng.blackList.QueryContorlCarGridPanel);