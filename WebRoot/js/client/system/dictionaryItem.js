/**
 * \ * 入口
 */
Ext.ns("Jinpeng.dictionary");

var viewPortObj = null;
var zhi='';
var recode='';
var downPictureWindow = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport({
		layout : 'border',
		items : [ {
			// 数据显示区域
			region : 'center',
			border : false,
			// 自定标签
			xtype : 'dictionaryInfoDataPanel'
		} ]
	});
});

/**
 * @class Jinpeng.TabPanel 工作区标签页组件
 */
/**
 * north区域表单部份
 */
Jinpeng.dictionary.DictionaryInfoDataPanel = Ext.extend(Ext.Panel,{
		initComponent : function() {
			
			/** 设定参数 */
			Ext.apply(	this,{
				layout : 'border',
				border : false,
				defaults : {
					margins : '0 0 0 0'
				},
				items : [ {
					region : 'north',
					height : 45,
					xtype : 'form',
					id : 'searchDictionaryForm',
					ref : "../formPanel",
					labelWidth : 85,
					border : false,
					cls : 'blue-button-ct',
					frame : true,
					bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;',
					items : [ {
						layout : 'column',
						bodyStyle : 'margin-top: 5px;',
						items : [ {
							columnWidth : 0.3,
							layout : 'form',

							border : false,
							items : [ {
								xtype : 'tooltiptextfield',
								tooltip : {
									text : "关键字"
								},
								fieldLabel : '&nbsp;&nbsp;关键字',
								name : 'dictionaryName',
								id : 'dictionaryName'
							} ]
						}, {
							columnWidth : 0.7,
							layout : 'form',
							border : false,
							items : [ {
								xtype : 'button',
								text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
								id : 'searchBut',
								handler : this.advanceSearch,
								scope : this
							} ]
						} ]
					} ]
				}, {
					region : 'center',
					margins:'10 0 0 0',
					xtype : 'dictionaryInfoCenterGridPanel',
					ref : "../grid"
				}]
			});
			Jinpeng.dictionary.DictionaryInfoDataPanel.superclass.initComponent.apply(this);
		},
		afterRender : function(ct, position) {
			Jinpeng.dictionary.DictionaryInfoDataPanel.superclass.afterRender.apply(this, arguments);
		},
		/* 响应查询按钮 */
		advanceSearch : function() {
			var form = Ext.getCmp('searchDictionaryForm');
			if (form.getForm().isValid()) {
				var grid = Ext.getCmp('dictionaryRecordGridPanel');
				grid.store.baseParams = {};// 重置
				/** 将参数传入后台 */
				var baseparams = {
					"dictionaryName" : Ext.getCmp('dictionaryName').getValue()
				};
				grid.store.baseParams = baseparams;
				/*刷新选中*/
				this.publish("clearGridSelections",[]);
				grid.store.load({
					params : {
						'page.start' : 0,
						'page.limit' : Jinpeng.PageSize
					}
				});
			}
		}
	});

/**
 * 列表数据Store
 */
var dictionaryInfoStore = new Ext.data.JsonStore({
	url : rootpath + "/dictionary/queryDictionary.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	remoteSort : true,
	fields : [
	      {name : 'ID'},
          {name : 'DISPLAYVALUE'},
          {name : 'NOTES'},
          {name : 'SETTINGNAME'},
          {name : 'STOREVALUE'}
      ]
});
/**
 * 中心右区域数据显示中心
 */ 
Jinpeng.dictionary.DictionaryInfoCenterGridPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'dictionaryRecordGridPanel',
	frame : false,
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this,{
			store : dictionaryInfoStore,
			cm : new Ext.grid.ColumnModel({
				defaults : {
					sortable : true
				},
				columns : [
						new Ext.ux.grid.PagingRowNumberer({ width : 40}),
						sm,
						{
							header : "显示名称", dataIndex : 'DISPLAYVALUE'
						}, {
							header : "编码", dataIndex : 'SETTINGNAME'
						}, {
							header : "存储值", dataIndex : 'STOREVALUE'
						}, {
							header : "描述", dataIndex : 'NOTES'
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
					selModel : sm,
					tbar : {
						cls : 'blue-button-ct',
						items : [ {
							xtype : 'button',
							text : '&nbsp;&nbsp;&nbsp;新增&nbsp;&nbsp;&nbsp;',
							height : 20,
							id : 'addBtn',
							ref : '../btnAddNew'
						},  {
					  		  xtype : 'tbspacer',
					  		  width : 10
					  	}, {
							xtype : 'button',
							text : '&nbsp;&nbsp;&nbsp;修改&nbsp;&nbsp;&nbsp;',
							height : 20,
							id : 'editBtn',
							ref : '../btnModify'
						}, {
					  		  xtype : 'tbspacer',
					  		  width : 10
					  	}, {
							xtype : 'button',
							text : '&nbsp;&nbsp;&nbsp;删除&nbsp;&nbsp;&nbsp;',
							height : 20,
							id : 'deleteBtn',
							ref : '../btnDelete'
						}, {
					  		  xtype : 'tbspacer',
					  		  width : 10
					  	}, {
							xtype : 'button',
							id : 'exportRecordBtn',
							titletooltip : {
								text : Jinpeng.Message.EXPORT_BUTTON_TOOLTIP
							},
							text : '&nbsp;&nbsp;&nbsp;导出&nbsp;&nbsp;&nbsp;',
							handler : this.importExcelData
						} ]
					},
					bbar : new Jinpeng.widget.PagingToolbar({
						/* 添加样式所需id */
						id : "PagingToolbar",
						store : dictionaryInfoStore,
						displayInfo : true,
						emptyMsg : "无数据",
						pageSize : this.pageSize
					}),
					listeners : {
						afterrender : function() {
							// 加载数据
							dictionaryInfoStore.load({
									params : {
										'page.start' : 0,
										'page.limit' : this.pageSize
									}
								});
						},
						rowdblclick : function(grid, rowIndex, e ) {
							
							var recode = grid.store.getAt(rowIndex);
							if (recode) {
								var win,dictionaryId ;
								
								dictionaryId = recode.data.ID;
								
								win = new Jinpeng.dictionary.AddNewDictionaryWindow();
								
								win.loadRecordById(dictionaryId);
							}
					
						}
					}
		});
		// 响应最后一列查看点击事件 
		this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
			var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
			if (fieldName == 'operate') {
				if (typeof this.checkHref == 'function')
					/* 调用查看超链接方法 */
					this.checkHref(grid, rowIndex, columnIndex);
			}
		});
		Jinpeng.dictionary.DictionaryInfoCenterGridPanel.superclass.initComponent.apply(this);
		
		this.btnAddNew.on('click', this.onBtnAddNewHandler, this);
		this.btnModify.on('click', this.onBtnModifywHandler, this);
		this.btnDelete.on('click', this.onBtnDeleteHandler, this);
	},
	onBtnAddNewHandler : function() {
		var win = new Jinpeng.dictionary.AddNewDictionaryWindow({
			id : 'addNewDictionaryWin',
			addNewFlag : true,
			title : '新增字典信息'
		});
		win.show();
	},
	onBtnModifywHandler : function() {
		var records = Ext.getCmp('dictionaryRecordGridPanel').getSelectionModel().getSelections();
		if (records.length == 1) {
			this.modifyDictionaryInfo(records[0]);
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
	onBtnDeleteHandler : function() {
		var recodes = Ext.getCmp('dictionaryRecordGridPanel').getSelectionModel().getSelections();
		if (recodes.length > 0) {
			this.deleteDictionaryById(recodes);
		} else {
			var win = new Jinpeng.widget.MessageWindow();
			win.msg = '请选择需要删除的记录！';
			win.show();
		}
	},
	onModifyHandler : function(grid, rowIndex, colIndex, item, event) {
		event.stopEvent();
		var recode = grid.store.getAt(rowIndex);
		if (recode) {
			this.modifyDictionaryInfo(recode);
		}
	},
	modifyDictionaryInfo : function(dictionary) {
		var win,dictionaryId ;
		
		dictionaryId = dictionary.data.ID;
		
		win = new Jinpeng.dictionary.AddNewDictionaryWindow();
		
		win.loadRecordById(dictionaryId);
	},
	onDeleteHandler : function(grid, rowIndex, colIndex, item, event) {
		event.stopEvent();
		 recode = grid.store.getAt(rowIndex);
		if (recode) {
			this.deleteDictionaryById([ recode ]);
		}
	},
	deleteDictionaryById : function(records) {
		zhi=records;
		var win = new Jinpeng.dictionary.HistoryCarDetailWindows();
		win.msg = "确定删除？";	
		win.show();
	},
	/* 响应查看超链接的方法 */
	checkHref : function(grid, rowIndex, colIndex, item, event) {
		var record = grid.store.getAt(rowIndex);
		if (record) {
			// 创建一个window对象
			var win = new Jinpeng.dictionary.KakouShowHistoryDetailWindow();
			//将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
			win.loadId = record.get("id");
			win.show();
		}
	},
	//导出Excel格式数据方法 
	importExcelData : function() {
		var records = Ext.getCmp('dictionaryRecordGridPanel').getSelectionModel().getSelections();
		var config = {
			totalURL : rootpath + "/dictionary/countDictionaryItem.mvc",
			selectExportURL : rootpath + "/dictionary/exportDictionaryItem.mvc",
			queryExportURL : rootpath + "/dictionary/exportDictionaryItem.mvc"
		};
		// 得到选中的ids
		var ids = [];
		for ( var i = 0; i < records.length; i++) {
			ids[ids.length] = records[i].get('ID');
		}
		config.ids = ids;
		var param = [];
		param[param.length] = "dictionaryName=" + Ext.getCmp('dictionaryName').getValue();
		config.queryCondition = param.join("&");
		var ExportHelper = new Jinpeng.ExportHelper(config);
		ExportHelper.startExport(true);
	}
});

Jinpeng.dictionary.HistoryCarDetailWindows = Ext.extend(Jinpeng.widget.GeneralWindow,{
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
		Jinpeng.dictionary.HistoryCarDetailWindows .superclass.initComponent.apply(this);
	},fengshow : function(){
		var records;
		this.close();
		if(recode!=''){
			records= recode;
		}else if(zhi!=''){
			records=zhi;	
		}
		var _this = this;
		var ids = [];
		var dictionarysIDS = [];
		var dictionaryNames = [];
		var isContinue = true;
		Ext.each(records, function(item, index, items) {
			ids.push(item.get("ID"));
		});
		if (!isContinue)
			return;
					/* 确认删除则通过AJAX请求删除相应的数据 */
					Ext.Ajax.request({
						url : rootpath + '/dictionary/deleteDictionary.mvc',
						params : {
							ids : ids.join(",")
							//dictionaryNames : dictionaryNames.join(",")
						},
						success : function(response, options) {
							var o = response.responseData || Ext.decode(response.responseText);
							var result = o.data;
							
							var msg = "";
							if (result > 0) {
								msg = "删除字典项成功！";
								var grid = Ext.getCmp("dictionaryRecordGridPanel");
								if(grid){
									grid.publish("clearGridSelections",[]);
									grid.store.reload();
								}
								
								//dispatchDictionaryMessage(result[1]);
								//this.close();
							} else {
								msg = "删除字典项失败！";
							}
							var win = new Jinpeng.widget.MessageWindow();
							win.msg = msg;
							win.show();
						}
					});
		
	},
	afterRender : function() {
		Jinpeng.dictionary.HistoryCarDetailWindows .superclass.afterRender.call(this);
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
Ext.reg('dictionaryInfoDataPanel', Jinpeng.dictionary.DictionaryInfoDataPanel);
Ext.reg('dictionaryInfoCenterGridPanel',Jinpeng.dictionary.DictionaryInfoCenterGridPanel);
