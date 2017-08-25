/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  + 系统设备项目树												    +
  + author: hoojo												+
  + create date: 2010-8-9										+
  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
Ext.define("Ext.jp.tic.component.SystemTree", {
	extend: Ext.tree.TreePanel,
	
	title: "卡口设备菜单",
    lines: false, 
    useArrows: false,
    autoScroll: true,
    rootVisible: false,
    maskDisabled: false, 
   	
	initComponent: function() {
		Ext.apply(this, {
			
	        store: Ext.create('Ext.data.TreeStore', {
		        proxy: {
		            type: 'ajax',
		            url: Ext.jp.tic.component.SystemTree.TREE_DATA_URL
		        },
		        root: {
		            text: 'Ext JS',
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
	},
	filterTreeNode: function (field, vp) {
		var tree = vp;
		var text = field.getValue();
	
		// 先要显示上次隐藏掉的节点
		Ext.each(vp.hiddenPkgs, function(n) {
			n.show();
		});
		// 如果输入的数据不存在，就执行clear()
		if (!text) {
			tree.getStore().clearFilter(true);
			return;
		}
		
		var re = new RegExp(Ext.escapeRe(text), 'gi');
		tree.getStore().filter([{
			filterFn: function(item) { 
				console.log(item);
				return !item.get("leaf") || re.test(item.get("text"));; 
			}
		}]);
		//tree.expandAll();
		// 根据输入制作一个正则表达式，'i'代表不区分大小写
		tree.getStore().filterBy(function(n) {
			console.log(n);
			// 只过滤叶子节点，这样省去枝干被过滤的时候，底下的叶子都无法显示
			return !n.isLeaf() || re.test(n.text);//(n.text.indexOf(text) != -1);
		});
		
		// 如果这个节点不是叶子，而且下面没有子节点，就应该隐藏掉
		vp.hiddenPkgs = [];
		var view = this.getView();
		tree.getRootNode().cascade(function(n) {
			if (!n.isLeaf() /*&& n.ui.ctNode.offsetHeight < 3*/) {
				//n.ui.hide();
				var uiNode = view.getNodeByRecord(this);
				uiNode.hide();
				vp.hiddenPkgs.push(uiNode);
			}
		});
	}
});
Ext.jp.tic.component.SystemTree.TREE_DATA_URL = "./deviceinfo/navtree.mvc";