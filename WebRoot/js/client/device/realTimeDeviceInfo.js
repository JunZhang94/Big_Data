/**
 * 命名空间
 */
Ext.ns('Jinpeng.maintain');

var viewPort = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'center',
			border : false,
			xtype : 'realTimeDevicePanel'
		}]
	});
});

/**
 * 整个界面用TabPanel分配
 */
Jinpeng.maintain.realTimeDevicePanel = Ext.extend(Ext.TabPanel, {
	initComponent : function() {
		Ext.apply(this, {
			activeTab : 0,
			items : [{
				title : '设备实时状态',
				layout : 'border',
				items : [ {
					region : 'north',
					height : 45,
					border : false,
					xtype : 'deviceStateForm'
				}, {
					region : 'center',
					border : false,
					xtype : 'deviceStateGrid'
				}]
			}, {
				title : '设备实时故障',
				layout : 'border',
				items : [{
					region : 'north',
					height : 45,
					border : false,
					xtype : 'deviceTroubleForm'
				}, {
					region : 'center',
					border : false,
					xtype : 'deviceTroubleGrid'
				}]
			}]
		});
		Jinpeng.maintain.realTimeDevicePanel.superclass.initComponent.apply(this);
	}
});

/**
 * 设备状态实时信息--Form
 */
Jinpeng.maintain.deviceStateForm = Ext.extend(Ext.Panel, {
	initComponent : function() {
		/*运行状态*/
		var deviceStatusStore = new  Ext.data.JsonStore({
			url : rootpath+ "/dictionary/jsonDictsInCombo.mvc?code=DEVICE_STATUS",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false
		});
		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'deviceStateForm',
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
				items : [{
					items : [{
						fieldLabel : '设备编号',
                    	xtype : 'textfield',
                    	name : 'deviceStateNumber',
						id : 'deviceStateNumber',
						emptyText : '请输入编号'
					}]
				}, {
					items : [{
						xtype : 'tcombo',
						id : 'deviceState',
						fieldLabel : '设备状态',
						store : deviceStatusStore,
						mode : 'local',
						emptyText : '全部',
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'text',
						anchor : '94%'
					}]
				}, {
					items : [{
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
						id : 'stateBtn',
						handler : this.deviceCheck
					}]
				},{
					items : [{
						xtype : 'hidden',
						id : 'deviceOrgId'
					}]
				}]
			}],
			listeners : {
				afterrender : function() {
					deviceStatusStore.load();
				}
			}
		});
		Jinpeng.maintain.deviceStateForm.superclass.initComponent.apply(this);
	},
	deviceCheck : function() {
		var form = Ext.getCmp('deviceStateForm');
		if(form.getForm().isValid()) {
			var grid = Ext.getCmp('deviceStateDataGrid');
			grid.store.baseParams = {};
			var baseparams = {
				'deviceStateNumber' : Ext.getCmp('deviceStateNumber').getValue(),
				'deviceState' : Ext.getCmp('deviceState').getValue()
			};
			grid.store.baseParams = baseparams;
			grid.store.load({
				params : {'page.start' : 0, 'page.limit' : Jinpeng.PageSize}
			});
		}
	}
});

/**
 * 设备运行状态--Grid
 */
Jinpeng.maintain.deviceStateGrid = Ext.extend(Ext.grid.GridPanel, {
	id : 'deviceStateDataGrid',
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var commuServerStore = new Ext.data.JsonStore({
			url : rootpath+ "/device/queryDeviceState.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
		          {name : 'ZTXH'},
		          {name : 'SBBH'},
		          {name : 'SCSJ'},
		          {name : 'DQZT'}
	          ]
		});
		var sm = new Ext.grid.CheckboxSelectionModel();
		Ext.apply(this, {
			store :  commuServerStore,
			selModel : sm,
			colModel : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
			           new Ext.ux.grid.PagingRowNumberer({ width : 40 }),
			           //sm,
			           //{header : '序号', dataIndex : 'id'},
			           {header : '序号', dataIndex : 'ZTXH'},
			           {header : '设备编号', dataIndex : 'SBBH'},
			           {header : '上传时间', dataIndex : 'SCSJ',
			        	   renderer : function(value) {
			        	        return value.substring(0,value.indexOf("."));
						   }
			        	   },
			           {header : '当前状态', dataIndex : 'DQZT',
							renderer : function(key) {
								return window.dictionary
										.getValue("DEVICE_STATUS",key);
							}
			           }
	            ]
			}),
			bbar : new Jinpeng.widget.PagingToolbar({
				/* 添加样式所需id */
				id : "PagingToolbar1",
				cls :'PagingToolbar',
				store : commuServerStore,
				displayInfo : true,
				pageSize : this.pageSize
			}),
			listeners : {
				afterrender : function() {
					commuServerStore.load({
						params : {'page.start' : 0, 'page.limit' : this.pageSize}
					});
				}
			}
		});
		Jinpeng.maintain.deviceStateGrid.superclass.initComponent.apply(this);
	}
});

/**
 * 设备故障实时信息--Form
 */
Jinpeng.maintain.deviceTroubleForm = Ext.extend(Ext.Panel, {
	initComponent : function() {
		/*故障状态*/
		var troubleStatusStore = new  Ext.data.JsonStore({
			url : rootpath+ "/dictionary/jsonDictsInCombo.mvc?code=FaultState",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false
		});
		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'deviceTroubleForm',
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
				items : [{
					items : [{
						fieldLabel : '设备编号',
                    	xtype : 'textfield',
                    	name : 'deviceNumber',
						id : 'deviceNumber',
						emptyText : '请输入编号'
					}]
				}, {
					items : [{
						xtype : 'tcombo',
						id : 'troubleState',
						fieldLabel : '设备状态',
						store : troubleStatusStore,
						mode : 'local',
						emptyText : '全部',
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'text',
						anchor : '94%'
					}]
				}, {
					items : [{
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
						id : 'troubleBtn',
						handler : this.deviceCheck
					}]
				},{
					items : [{
						xtype : 'hidden',
						id : 'deviceOrgId'
					}]
				}]
			}],
			listeners : {
				afterrender : function() {
					troubleStatusStore.load();
				}
			}
		});
		Jinpeng.maintain.deviceTroubleForm.superclass.initComponent.apply(this);
	},
	deviceCheck : function() {
		var form = Ext.getCmp('deviceTroubleForm');
		if(form.getForm().isValid()) {
			var grid = Ext.getCmp('deviceTroubleGrid');
			grid.store.baseParams = {};
			var baseparams = {
				'deviceNumber' : Ext.getCmp('deviceNumber').getValue(),
				'troubleState' : Ext.getCmp('troubleState').getValue()
			};
			grid.store.baseParams = baseparams;
			grid.store.load({
				params : {'page.start' : 0, 'page.limit' : Jinpeng.PageSize}
			});
		}
	}
});

/**
 * 设备故障实时信息--Grid
 */
Jinpeng.maintain.deviceTroubleGrid = Ext.extend(Ext.grid.GridPanel, {
	id : 'deviceTroubleGrid',
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var commuDeviceStore = new Ext.data.JsonStore({
			url : rootpath + "/device/queryDeviceTroubleState.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
	          {name : 'ZTXH'},
	          {name : 'SBBH'},
	          {name : 'SCSJ'},
	          {name : 'GZSJ'},
	          {name : 'GZZT1'}
	        ]
		});
		var sm = new Ext.grid.CheckboxSelectionModel();
		Ext.apply(this, {
			store :  commuDeviceStore,
			selModel : sm,
			colModel : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
			           new Ext.ux.grid.PagingRowNumberer({ width : 40 }),
			           //sm,
			           {header : '序号', dataIndex : 'ZTXH'},
			           {header : '设备编号', dataIndex : 'SBBH'},
			           {header : '上传时间', dataIndex : 'SCSJ'},
			           {header : '故障状态', dataIndex : 'GZZT1',
							renderer : function(key) {
								return window.dictionary
										.getValue("FaultState",key);
							}
			           },
			           {header : '故障时间', dataIndex : 'GZSJ'}
	            ]
			}),
			bbar : new Jinpeng.widget.PagingToolbar({
				/* 添加样式所需id */
				id : "PagingToolbar",
				store : commuDeviceStore,
				displayInfo : true,
				pageSize : this.pageSize
			}),
			listeners : {
				afterrender : function() {
					//commuDeviceStore.baseParams['device.title']='';
					commuDeviceStore.baseParams['device.org.id'] = Ext.getCmp('deviceOrgId').getValue();
					commuDeviceStore.load({
						params : {'page.start' : 0, 'page.limit' : this.pageSize}
					});
				}
			}
		});
		Jinpeng.maintain.deviceTroubleGrid.superclass.initComponent.apply(this);
	}
});

Ext.reg('realTimeDevicePanel', Jinpeng.maintain.realTimeDevicePanel);
Ext.reg('deviceStateForm', Jinpeng.maintain.deviceStateForm);
Ext.reg('deviceTroubleForm', Jinpeng.maintain.deviceTroubleForm);
Ext.reg('deviceStateGrid', Jinpeng.maintain.deviceStateGrid);
Ext.reg('deviceTroubleGrid', Jinpeng.maintain.deviceTroubleGrid);
