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
			xtype : 'serviceStatusPanel'
		}]
	});
});

/**
 * 整个界面用TabPanel分配
 */
Jinpeng.maintain.serviceStatusPanel = Ext.extend(Ext.TabPanel, {
	initComponent : function() {
		Ext.apply(this, {
			activeTab : 0,
			items : [{
				title : 'HDFS集群状态',
				layout : 'border',
				items : [{
					region : 'center',
					border : false,
					xtype : 'HDFSClusterStateTroubleGrid'
				}]
			},{
				title : 'MP集群状态',
				layout : 'border',
				items : [{
					region : 'center',
					border : false,
					xtype : 'MPClusterStateTroubleGrid'
				}]
			}, {
				title : 'HBase集群状态',
				layout : 'border',
				items : [{
					region : 'center',
					border : false,
					xtype : 'HBaseClusterStateTroubleGrid'
				}]
			}]
		});
		Jinpeng.maintain.serviceStatusPanel.superclass.initComponent.apply(this);
	}
});




/**
 * MP集群状态--Grid
 */
Jinpeng.maintain.MPClusterStateTroubleGrid = Ext.extend(Ext.grid.GridPanel, {
	id : 'MPClusterStateTroubleGrid',
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var commuDeviceStore = new Ext.data.JsonStore({
//			url : rootpath + "/device/queryDeviceTroubleState.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
	          {name : 'ZPTBM'},
	          {name : 'JSIPLB'},
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
			           {header : '子平台编码', dataIndex : 'ZPTBM'},
			           {header : '接收IP列表', dataIndex : 'JSIPLB'}
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
					commuDeviceStore.baseParams['device.org.id'] = Ext.getCmp('deviceOrgId').getValue();
					commuDeviceStore.load({
						params : {'page.start' : 0, 'page.limit' : this.pageSize}
					});
				}
			}
		});
		Jinpeng.maintain.MPClusterStateTroubleGrid.superclass.initComponent.apply(this);
	}
});
/**
 * HBase集群状态--Grid
 */
Jinpeng.maintain.HBaseClusterStateTroubleGrid = Ext.extend(Ext.grid.GridPanel, {
	id : 'HBaseClusterStateTroubleGrid',
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var commuDeviceStore = new Ext.data.JsonStore({
//			url : rootpath + "/device/queryDeviceTroubleState.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
	          {name : 'ZPTBM'},
	          {name : 'JSIPLB'}
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
			           {header : '子平台编码', dataIndex : 'ZPTBM'},
			           {header : '接收IP列表', dataIndex : 'JSIPLB'}
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
					commuDeviceStore.baseParams['device.org.id'] = Ext.getCmp('deviceOrgId').getValue();
					commuDeviceStore.load({
						params : {'page.start' : 0, 'page.limit' : this.pageSize}
					});
				}
			}
		});
		Jinpeng.maintain.HBaseClusterStateTroubleGrid.superclass.initComponent.apply(this);
	}
});
/**
 * HDFS集群状态--Grid
 */
Jinpeng.maintain.HDFSClusterStateTroubleGrid = Ext.extend(Ext.grid.GridPanel, {
	id : 'HDFSClusterStateTroubleGrid',
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var commuDeviceStore = new Ext.data.JsonStore({
//			url : rootpath + "/device/queryDeviceTroubleState.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
	          {name : 'IP'},
	          {name : 'NAME'},
	          {name : 'STATUS'},
	          {name : 'LOG'}
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
			           {header : 'IP', dataIndex : 'IP'},
			           {header : 'NAME', dataIndex : 'NAME'},
			           {header : 'STATUS', dataIndex : 'STATUS'},
			           {header : 'LOG', dataIndex : 'LOG'}
						
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
					commuDeviceStore.baseParams['device.org.id'] = Ext.getCmp('deviceOrgId').getValue();
					commuDeviceStore.load({
						params : {'page.start' : 0, 'page.limit' : this.pageSize}
					});
				}
			}
		});
		Jinpeng.maintain.HDFSClusterStateTroubleGrid.superclass.initComponent.apply(this);
	}
});

Ext.reg('serviceStatusPanel', Jinpeng.maintain.serviceStatusPanel);
Ext.reg('HBaseClusterStateTroubleGrid', Jinpeng.maintain.HBaseClusterStateTroubleGrid);
Ext.reg('MPClusterStateTroubleGrid', Jinpeng.maintain.MPClusterStateTroubleGrid)
Ext.reg('HDFSClusterStateTroubleGrid', Jinpeng.maintain.HDFSClusterStateTroubleGrid);