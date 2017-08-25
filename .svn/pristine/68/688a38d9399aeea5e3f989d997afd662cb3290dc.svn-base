/**
 * \ * 入口
 */
Ext.ns("Jinpeng.monitoryDevice");

var viewPortObj = null;
var downPictureWindow = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport({
		layout : 'border',
		items : [ {
			region : 'west',
			width : 240,
			layout : 'fit',
			border : false,
			xtype : 'menuwestpanel'
		}, {
			// 数据显示区域
			region : 'center',
			border : false,
			// 自定标签
			xtype : 'monitoryDeviceDataPanel'
		} ]
	});
});

Jinpeng.monitoryDevice.MenuWestPanel = Ext.extend(Jinpeng.widget.OrganizationTree, {
	id : 'orgTreeWestPanel',
	autoLoading : true,
	showCheckbox : false,
	autoExpandAll : false,
	animate : true,
	title : '组织机构',
	initComponent : function() {
		this.on('beforeclick', this.onTreeNodeBeforeClick, this);
		this.on('click', this.onTreeNodeClick, this);

		Jinpeng.monitoryDevice.MenuWestPanel.superclass.initComponent.apply(this);

	},
	afterRender : function(ct, position) {
		Jinpeng.monitoryDevice.MenuWestPanel.superclass.afterRender.apply(this, arguments);
	},
	onTreeNodeClick : function(node, e) {
		var id = node.attributes.id;
		var orgType = node.attributes.orgType;//判断选择的卡口还是市局和分局。0为市局，1为分局，2为卡口
		var devicegrid = Ext.getCmp('monitoryDeviceGridPanel');
		if (devicegrid) {
			devicegrid.store.baseParams = {};// 重置
			devicegrid.store.baseParams["code"] = id;
			//devicegrid.store.baseParams["orgType"] = orgType;
			devicegrid.publish("clearGridSelections", []);
			devicegrid.store.load({
				params : {
					'page.start' : 0,
					'page.limit' : devicegrid.pageSize
				}
			});
		}
	},
	onTreeNodeBeforeClick : function(node, e) {
		if (node.id == -1) {

		} else {

		}
	},
	refresh : function() {
		var root = this.root;
		root.reload();
		var runner = new Ext.util.TaskRunner();
		var expandTask = {
			run : function() {
				if (root.loaded) {
					root.firstChild.expand();
					runner.stop(expandTask);
				}
			},
			interval : 200
		};
		runner.start(expandTask);
	},
	getSelectedOrgInfo : function() {
		var sm = this.getSelectionModel();
		var node = sm ? sm.getSelectedNode() : null;
		if (node) {
			var result = {
				'id' : node.id,
				'coding' : node.attributes['coding'],
				'text' : node.attributes['text'],
				'isDirection' : false,
				'longitude' : '',
				'latitude' : ''
			};
			var isDirection = node.attributes['type'] == Jinpeng.ChannelTreePanel.nodeType.DIRECTION ? true : false;
			var isCheckPoint = node.attributes['type'] == Jinpeng.ChannelTreePanel.nodeType.KAKOU ? true : false;
			if (isDirection) {
				result['isDirection'] = true;
				result['longitude'] = node.parentNode.attributes['longitude'];
				result['latitude'] = node.parentNode.attributes['latitude'];
			}
			if (isCheckPoint) {
				result['longitude'] = node.attributes['longitude'];
				result['latitude'] = node.attributes['latitude'];
			}
			return result;
		}
		return null;

	}
});

/**
 * @class Jinpeng.TabPanel 工作区标签页组件
 */
/**
 * north区域表单部份
 */
Jinpeng.monitoryDevice.MonitoryDeviceDataPanel = Ext.extend(Ext.Panel,{
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
					id : 'searchDeviceForm',
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
									text : "设备名称"
								},
								fieldLabel : '&nbsp;&nbsp;设备名称',
								name : 'deviceName',
								id : 'deviceName'
							} ]
						}, {
							columnWidth : 0.7,
							layout : 'form',
							border : false,
							items : [ {
								xtype : 'button',
								text : '查询',
								handler : this.advanceSearch,
								scope : this
							} ]
						} ]
					} ]
				}, {
					region : 'center',
					margins:'10 0 0 0',
					xtype : 'monitoryDeviceCenterGridPanel',
					ref : "../grid"
				}]
			});
			Jinpeng.monitoryDevice.MonitoryDeviceDataPanel.superclass.initComponent.apply(this);
		},
		afterRender : function(ct, position) {
			Jinpeng.monitoryDevice.MonitoryDeviceDataPanel.superclass.afterRender.apply(this, arguments);
		},
		/* 响应查询按钮 */
		advanceSearch : function() {
			var form = Ext.getCmp('searchDeviceForm');
			if (form.getForm().isValid()) {
				var grid = Ext.getCmp('monitoryDeviceGridPanel');
				grid.store.baseParams = {};// 重置
				/** 将参数传入后台 */
				var baseparams = {
					"deviceName" : Ext.getCmp('deviceName').getValue()
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
var deviceInfoStore = new Ext.data.JsonStore({
	url : rootpath + "/device/queryDevice.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	remoteSort : true,
	fields : [
          {name : 'SBBH'},
          {name : 'SBMC'},
          {name : 'SBLX'},
          {name : 'SBFX'},
          {name : 'SBCD'},
          {name : 'JD'},
          {name : 'WD'}
      ]
});
/**
 * 中心右区域数据显示中心
 */ 
Jinpeng.monitoryDevice.MonitoryDeivceCenterGridPanel = Ext.extend(Ext.grid.GridPanel,{
		id : 'monitoryDeviceGridPanel',
		frame : false,
		border : false,
		pageSize : Jinpeng.PageSize,
		initComponent : function() {
			var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
			Ext.apply(this,{
				store : deviceInfoStore,
				cm : new Ext.grid.ColumnModel({
					defaults : {
						sortable : true
					},
					columns : [
							new Ext.ux.grid.PagingRowNumberer({ width : 40}),
							sm,
							/*{
								id : 'index', header : "序号", dataIndex : 'id'
							}, */{
								header : "设备编号", dataIndex : 'SBBH',
								renderer : function(key) {
									if(key === 'NULL' || key === 'null'){
										return "无";
									} else {
										return key;
									}
								}
							}, {
								header : "设备名称", dataIndex : 'SBMC',
								renderer : function(key) {
									if(key === 'NULL' || key === 'null'){
										return "无";
									} else {
										return key;
									}
								}
							}, {
								header : "设备类型", dataIndex : 'SBLX',
								renderer : function(key) {
									if(key === 'NULL' || key === 'null'){
										return "无";
									} else {
										return key;
									}
								}
							}, {
								header : "设备方向", dataIndex : 'SBFX',
								renderer : function(key) {
									if(key === 'NULL' || key === 'null'){
										return "无";
									} else {
										return key;
									}
								}
							}, {
								header : "设备车道", dataIndex : 'SBCD',
								renderer : function(key) {
									if(key === 'NULL' || key === 'null'){
										return "无";
									} else {
										return key;
									}
								}
							}, {
								header : "经度", dataIndex : 'JD'
							}, {
								header : "纬度", dataIndex : 'WD'
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
								text : '新增',
								cls : 'btn1',
								height : 20,
								ref : '../btnAddNew'
							}, {
								text : '修改',
								cls : 'btn1',
								height : 20,
								ref : '../btnModify'
							}, {
								text : '删除',
								cls : 'btn1',
								height : 20,
								ref : '../btnDelete'
							} ]
						},
						bbar : new Jinpeng.widget.PagingToolbar({
							/* 添加样式所需id */
							id : "PagingToolbar",
							store : deviceInfoStore,
							displayInfo : true,
							emptyMsg : "无数据",
							pageSize : this.pageSize
						}),
						listeners : {
							afterrender : function() {
								// 加载数据
								deviceInfoStore.load({
										params : {
											'page.start' : 0,
											'page.limit' : this.pageSize
										}
									});
							},
							/*双击查看*/
							rowdblclick : function(grid, rowIndex, e ) {
								var data = grid.getStore().getAt(rowIndex).data;
								var win = new Jinpeng.monitoryDevice.KakouShowHistoryDetailWindow();
								//将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
								win.loadId = data.id;
								win.show();
							}
						}
			});
			// 响应最后一列查看点击事件 
			this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
				// var record =Ext.getCmp('monitoryDeviceGridPanel').getStore().getAt(rowIndex);
				var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
				if (fieldName == 'operate') {
					if (typeof this.checkHref == 'function')
						/* 调用查看超链接方法 */
						this.checkHref(grid, rowIndex, columnIndex);
				}
			});
			Jinpeng.monitoryDevice.MonitoryDeivceCenterGridPanel.superclass.initComponent.apply(this);
			
			this.btnAddNew.on('click', this.onBtnAddNewHandler, this);
			this.btnModify.on('click', this.onBtnModifywHandler, this);
			this.btnDelete.on('click', this.onBtnDeleteHandler, this);
		},
		onBtnAddNewHandler : function() {
			//var info = Ext.getCmp("orgTreeWestPanel").getSelectedOrgInfo();
			var win = new Jinpeng.monitoryDevice.AddNewDeviceWindow({
				id : 'addNewDeviceWin',
				addNewFlag : true,
				title : '新增设备'
			});
			//win.loadEmptyRecord();
			win.show();
		},
		onBtnModifywHandler : function() {
			var records = Ext.getCmp('monitoryDeviceGridPanel').getSelectionModel().getSelections();
			if (records.length == 1) {
				this.modifyDeviceInfo(records[0]);
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
			var recodes = Ext.getCmp('monitoryDeviceGridPanel').getSelectionModel().getSelections();
			if (recodes.length > 0) {
				// this.deleteDeviceById(recode.get("id"),recode.get("deviceId"));
				this.deleteDeviceById(recodes);
			} else {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = msg;
				win.show();
			}
		},
		onModifyHandler : function(grid, rowIndex, colIndex, item, event) {
			event.stopEvent();
			var recode = grid.store.getAt(rowIndex);
			if (recode) {
				this.modifyDeviceInfo(recode);
			}
		},
		modifyDeviceInfo : function(device) {
			var win,deviceId ;
			
			deviceId = device.data.SBBH;
			
			win = new Jinpeng.monitoryDevice.AddNewDeviceWindow();
			
			win.loadRecordById(deviceId);
		},
		onDeleteHandler : function(grid, rowIndex, colIndex, item, event) {
			event.stopEvent();
			var recode = grid.store.getAt(rowIndex);
			if (recode) {
				this.deleteDeviceById([ recode ]);
			}
		},
		deleteDeviceById : function(records) {
			var _this = this;
			var ids = [];
			var devicesIDS = [];
			var deviceNames = [];
			var isContinue = true;
			Ext.each(records, function(item, index, items) {
				/*if (!_this.isAllowDeleteOrModify(item,true)) {
					isContinue = false;
					return false;
				}*/
				ids.push(item.get("SBBH"));
				//devicesIDS.push(item.get("deviceId"));
				//deviceNames.push(item.get("title"));
			});
			if (!isContinue)
				return;
			/* 确认删除与否 */
			top.Ext.MessageBox.show({
				buttons : {
					ok : '确认',
					cancel : '取消'
				},
				title : "确认删除",
				msg : "确定要删除这" + (ids.length > 1 ? ids.length : "") + "个设备？",
				modal : true,
				fn : function(btn, text, options) {
					if (btn == 'ok') {
						/* 确认删除则通过AJAX请求删除相应的数据 */
						Ext.Ajax.request({
							url : rootpath + '/device/deleteDevice.mvc',
							params : {
								SBBHS : ids.join(",")
								//deviceNames : deviceNames.join(",")
							},
							success : function(response, options) {
								var o = response.responseData || Ext.decode(response.responseText);
								var result = o.data;
								
								var msg = "";
								if (result > 0) {
									msg = "删除设备成功！";
									//dispatchDeviceMessage(result[1]);
									//this.close();
								} else {
									msg = "删除设备失败！";
								}
								var win = new Jinpeng.widget.MessageWindow();
								win.msg = msg;
								win.show();
							}
						});
					}
				}
			});
		},
		/* 响应查看超链接的方法 */
		checkHref : function(grid, rowIndex, colIndex, item, event) {
			var record = grid.store.getAt(rowIndex);
			if (record) {
				// 创建一个window对象
				var win = new Jinpeng.monitoryDevice.KakouShowHistoryDetailWindow();
				//将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
				win.loadId = record.get("id");
				win.show();
			}
		}
	});

Ext.reg('menuwestpanel', Jinpeng.monitoryDevice.MenuWestPanel);
Ext.reg('monitoryDeviceDataPanel', Jinpeng.monitoryDevice.MonitoryDeviceDataPanel);
Ext.reg('monitoryDeviceCenterGridPanel',Jinpeng.monitoryDevice.MonitoryDeivceCenterGridPanel);
