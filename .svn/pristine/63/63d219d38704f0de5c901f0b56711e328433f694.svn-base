/**
 * 过车数据后台下载管理
 */
Ext.ns('Jinpeng.download');

var viewPort = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'center',
			border : false,
			xtype : 'dataGridPanel'
		}]
	});
});

/**
 * 下载管理数据列表--Grid
 */
Jinpeng.download.DataGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'dataGrid',
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var _panel = this;
		var commuServerStore = new Ext.data.JsonStore({
			url : rootpath+ "/systemConfig/downCenterData.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
			  {name : 'NAME'},
	          {name : 'REMARK'},
	          {name : 'TYPE'},
	          {name : 'URL'}
            ]
		});
		Ext.apply(this, {
			store :  commuServerStore,
			colModel : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
		           new Ext.ux.grid.PagingRowNumberer({ width : 40 }),
		           {header : '名称', dataIndex : 'NAME', width : 45},
		           {header : '描述', dataIndex : 'REMARK', width : 100},
		           {header : '类型', dataIndex : 'TYPE', width : 25},
		           {header : '操作', dataIndex : 'URL', width : 25, renderer : function(key) {
		        	   var url = rootpath + key;
		        	   return '<a href="' + url + '">下载</a>';
					}}
	            ]
			}),
			listeners : {
				afterrender : function(list) {
					// 加载数据
					commuServerStore.load({
					});
				}
			}
		});
		//最后一列查看点击事件 
		this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
			var recode = grid.store.getAt(rowIndex);
			var opetate = recode.get('operate');
			var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
			if (fieldName == 'operate') {
				if (opetate == 'export') {
					_panel.onDownloadHandler(grid, rowIndex)
				} else if (opetate == 'delete') {
					_panel.onDeleteHandler(grid, rowIndex)
				} else if (opetate == 'stop') {
					_panel.onStopHandler(grid, rowIndex)
				}
			}
		});
		Jinpeng.download.DataGridPanel.superclass.initComponent.apply(this);
	},
	onDownloadHandler : function(grid, rowIndex, colIndex, item, event) {
		var recode = grid.store.getAt(rowIndex);
		var url = recode.get("url");
		window.open(url);
	}
});

Ext.reg('dataGridPanel', Jinpeng.download.DataGridPanel);
