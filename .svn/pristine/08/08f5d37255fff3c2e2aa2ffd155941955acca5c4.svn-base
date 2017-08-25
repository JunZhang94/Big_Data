/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  + 系统设备项目树												    +
  + author: hoojo												+
  + create date: 2010-8-9										+
  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
Ext.define("Ext.jp.tic.role.UserRoleTreePanel", {
	extend: Ext.tree.TreePanel,
	
	title: "选择用户权限",
	border: 0,
	width: 200,
    lines: false, 
    useArrows: false,
    autoScroll: true,
    rootVisible: false,
    maskDisabled: false, 
   	
   	
	initComponent: function() {
		Ext.apply(this, {
			tbar: [{
		    	tooltip: "展开所有",
		    	iconCls: "expandIcon",
		    	handler: this.onExpendAllNode
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
		    }],
	        store: Ext.create('Ext.data.TreeStore', {
		        proxy: {
		            type: 'ajax',
		            url: Ext.jp.tic.role.UserRoleTreePanel.TREE_DATA_URL
		        },
		        root: {
		        	id: -1,
		            text: '权限管理',
		            expanded: true
		        }
		    }),
	        listeners: {
	            click: function(node) {
	                //Ext.Msg.alert("Navigation Tree Click", "You clicked: " + node.attributes.nodeId + "," + node.text + ",");
	            },
	            check: function(node, checked){
	            	//alert(node.text+" = "+ checked);//注册"check"事件
	            },
	            checkchange : function(node, checked) {
				   if (checked == true) {
				    	node.checked = checked;
					    // console.dir(node.parentNode);
					    //alert(node.get("leaf"));
					
					    //获得父节点
					    pNode = node.parentNode;
					
					  //当checked == true通过循环将所有父节点选中
					    for (; pNode != null; pNode = pNode.parentNode) {
					     pNode.set("checked", true);
					    }
				   }
				
				  //当该节点有子节点时，将所有子节点选中删除
				   if (!node.get("leaf") && !checked) {
				      	node.cascade(function(node){
				     		node.set('checked', false);
				     
				    	});
					}
				} 
	        }
		});
		
		this.callParent(arguments);
		
        this.store.getProxy().on("exception", this.onLoadException, this); 
        this.store.on("load", function () {
        	this.body.unmask();
        }, this); 
	},
	onLoadException: function () {
		var win = new Jinpeng.widget.MessageWindow();
		win.msg = "数据加载出现错误，请检查你的网络和服务器或是尝试刷新页面！";
		win.show();
	},
	getCheckedNode: function () {
		var nodeIds = [];
		var parentNodeIds = [];
		Ext.each(this.getChecked(), function () {
			//console.log(this.raw.leaf);
			var id = this.raw.sbbh;
			if (this.raw.leaf) {
				nodeIds.push("'" + id + "'");
			} else {
				parentNodeIds.push(id);
			}
		});
		return {child: nodeIds, parent: parentNodeIds};
	},
	onNodeExpandAll: function () {
		this.body.mask('数据加载中...', 'x-mask-loading');
		var t = this;
		this.expandAll(function () {
			Ext.defer(function () {
				t.body.unmask();
			}, 1000);
		});
	},
	onNodeCollapseAll: function () {
		this.collapseAll();
	},	
	onRefreshSystemTree: function () {
		this.body.mask('数据加载中...', 'x-mask-loading');
		this.onNodeCollapseAll();
		
		this.store.reload();
	}
});
Ext.jp.tic.role.UserRoleTreePanel.TREE_DATA_URL = "./roleAction/tree.mvc?userId=1&roleId=13";