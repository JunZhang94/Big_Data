Ext.define("Ext.jp.tic.component.SystemDeviceTreePanel", {
	extend: Ext.jp.tic.component.SystemTree,
	alias: "widget.systemdevicetreepanel",
	
	title: "设备信息",
	border: 0,
	width: 200,
	autoScroll: false,
	
	
	
	initComponent: function(){
        Ext.apply(this, {
		    tbar: [/*" ", {
		    	xtype: "textfield",
		    	enableKeyEvents: true,//启用键盘事件，默认是不开启的
		    	emptyText: "请输入查询内容",
		    	listeners: {
		       		'keyup': Ext.bind(this.onFilterTreeNode, this)
		        },
		    	width: 205
		    }, */{
		    	tooltip: "展开所有",
		    	iconCls: "expandIcon",
		    	handler: this.onExpendAllNode,
		    	scope: this//设置scope后，this指向MainViewport，不设置默认指向当前对象
		    }, "-", {
		    	tooltip: "收缩所有",
		    	iconCls: "collaspeIcon",
		    	listeners: {
		       		'click': Ext.bind(this.onCollspseAllNode, this)
		        },
		    	scope: this
		    }, "-", {
		    	tooltip: "刷新",
		    	iconCls: "refreshTree",
		    	handler: this.onRefreshHandler,
		    	scope: this
		    }]
        });
        this.callParent(arguments);
        
        //this.tbar.items.get(1).on('keyup', this.onFilterTreeNode, this);
    },
	onExpendAllNode: function () {
		this.onNodeExpandAll();
	},
	onCollspseAllNode: function () {
		this.onNodeCollapseAll();
	},
	onRefreshHandler: function () {
		this.onRefreshSystemTree();
	},
	timeLock: true,
	onFilterTreeNode: function (field) {
		var tm = this;
		if (this.timeLock) {
			tm.body.mask('数据加载中...', 'x-mask-loading');
			Ext.defer(function () {
				tm.filterTreeNode(field, tm);
				tm.body.unmask();
			}, 150);
			this.timeLock = false;
		} else {
			tm.filterTreeNode(field, tm);
		}
	}
});	