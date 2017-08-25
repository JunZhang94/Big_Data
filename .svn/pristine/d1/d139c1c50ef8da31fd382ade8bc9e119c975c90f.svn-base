/* =======================function: 过滤树菜单节点======================= */
/* =======================create Date: 2010-8-12====================== */
/* =======================author: hoojo=============================== */
Ext.ns("hhh");
Ext.hhh.FilterSystemTree = Ext.extend(Ext.tree.TreeFilter, {
	constructor : function(tree) {
		this.tree = tree;
		Ext.hhh.FilterSystemTree.superclass.constructor.call(tree, this, {
			clearBlank : true,
			autoClear : true
		});
	},
	onFilterTreeNode : function(field, vp) {
		var text = field.getValue();
		// 先要显示上次隐藏掉的节点
		Ext.each(vp.hiddenPkgs, function(n) {
			n.ui.show();
		});
		
		// 如果输入的数据不存在，就执行clear()
		if (!text) {
			this.clear();
			return;
		}
		vp.treeMenu.expandAll();
		
		// 根据输入制作一个正则表达式，'i'代表不区分大小写
		var re = new RegExp(Ext.escapeRe(text), 'g');
		this.filterBy(function(n) { // 只过滤叶子节点，这样省去枝干被过滤的时候，底下的叶子都无法显示 return
			!n.isLeaf() || (n.text.indexOf(text) != -1);//re.test(n.text);
		});
		
		// 如果这个节点不是叶子，而且下面没有子节点，就应该隐藏掉 
		vp.hiddenPkgs = [];
		this.tree.root.cascade(function(n) {
			if (!n.isLeaf() && n.ui.ctNode.offsetHeight < 3) {
				n.ui.hide();
				vp.hiddenPkgs.push(n);
			}
		});
	}
});