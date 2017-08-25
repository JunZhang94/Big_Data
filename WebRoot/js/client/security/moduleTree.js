Ext.ns('Jinpeng.twidget');

/**
 * @class Jinpeng.twidget.ModuleTree
 * @extends Ext.tree.TreePanel
 * @author Teon
 * 菜单树
 * @constructor 创建一个GeneralTree
 * @param {Object/String} [config] 配置信息
 */
Jinpeng.twidget.ModuleTree = Ext.extend(Ext.tree.TreePanel, {
	/**
	 * @cfg {Boolean} [border=false] 是否具有边框
	 */
	border : false,
	/**
	 * @cfg {String} [dataUrl] (Required) 异步通信URL
	 */
	dataUrl : null,
	/**
	 * @cfg 异步通信参数
	 */
	dataParam : {},
	/**
	 * @cfg {Boolean} [autoScroll=true] 自动出现滚动条
	 */
	autoScroll : true,
	
	containerScroll : true,
	/**
	 * @cfg {Boolean} [animate=false] 使用动画
	 */
	animate : false,
	/**
	 * @cfg {Boolean} [rootVisible=false] 是否显示根
	 */
	rootVisible : false,
	/**
	 * @cfg {Boolean} [autoExpandAll=true] 是否自动展开所有节点
	 */
	autoExpandAll : true,
	/**
	 * @cfg {Object} [baseParams] 异步通信的参数，供Loader使用
	 */
	baseParams : {},
	/**
	 * @cfg {Object} [extraParams] 二次异步通信的参数，供Loader使用
	 */
	extraParams : {},
	/**
	 * @cfg {String} [extraUrl] 二次异步通信的URL，供Loader使用
	 */
	extraUrl : null,
	/**
	 * @cfg {String} [extraFk=ref] 二次异步通信的外键名称，供Loader使用
	 */
	extraFk : 'ref',
	/**
	 * @cfg {String} [extraRoot=data] 待挂载异步通信数据根属性名称，供Loader使用，供Loader使用
	 */
	extraRoot : 'data',
	/**
	 * @cfg {String} [root=data] 异步通信数据根属性名称，供Loader使用，供Loader使用
	 */
	rootProperty : 'data',
	/**
	 * @cfg {Boolean} [showCheckbox=true] 是否显示复选框，供Loader使用
	 */
	showCheckbox : true,
	/**
	 * @cfg {Boolean} [ignoreCheckStatus=false] 忽略初始化选中状态，即默认全部未选中
	 */
	ignoreCheckStatus : false,
	/**
	 * @cfg {Boolean} [autoLoading=false] 是否自动加载数据
	 */
	autoLoading : false,
	/**
	 * @cfg {Fn} [processResponseData] 异步请求的数据可经过此函数进行一次加工
	 */
	processResponseData : null,
	/**
	 * @cfg {Fn} [processExtraData] 额外的异步请求得到的数据可经过此函数进行一次加工
	 */
	processExtraData : null,
	listeners : {
		checkchange : function(node, checked) {

			var tree = node.getOwnerTree();
			var event = 'checkchange';
			var fn = arguments.callee;

			/* 取消监听 */
			tree.removeListener(event, fn);

			/* 下级节点跟着当前节点的状态 */
			node.cascade(function(node) {
				node.getUI().toggleCheck(checked);
			});

			/* 设置上级节点勾选状态：仅当所有子节点都勾选，当前节点才勾选 */
			node.bubble(function(node) {
				var children = node.childNodes;
				if (children && children.length > 0) {
					var anyChecked = false;
					for ( var i = 0; i < children.length; i++) {
						if (children[i].getUI().isChecked())
							anyChecked = true;
					}
					if (anyChecked)
						node.getUI().toggleCheck(true);
					// if (node.getUI().isChecked() != allChecked)
					// node.getUI().toggleCheck(allChecked);
				}
			});

			/* 恢复监听 */
			tree.addListener(event, fn);

		}
	},
	constructor : function(config) {

		Ext.apply(this, config);

		this.root = new Ext.tree.TreeNode({
			text : ''
		});

		/* 使用JsonTreeLoader */
		if (!this.loader) {
			this.loader = new Jinpeng.widget.JsonTreeLoader({
				showCheckbox : this.showCheckbox,
				url : this.dataUrl,
				ignoreCheckStatus : this.ignoreCheckStatus,
				baseParams : this.baseParams,
				rootProperty : this.rootProperty,
				extraRoot : this.extraRoot,
				extraUrl : this.extraUrl,
				extraFk : this.extraFk,
				
				extraParams : this.extraParams,
				processResponseData : this.processResponseData || function(data) {
					return data;
				},
				processExtraData : this.processExtraData || function(data) {
					return data;
				}
			});
		}

		Jinpeng.twidget.ModuleTree.superclass.constructor.apply(this, arguments);

		if (this.autoLoading)
			this.reload();

	},
	/**
	 * 初始化数据
	 * 
	 * @param {Object} data 需要被选中的树节点数据列表，列表中的数据必须具有id属性
	 * 
	 */
	init : function(data) {
		/* 更换根节点 */
		var root = this.getRootNode();
		if (root.type != 'async') {
			root = new Ext.tree.AsyncTreeNode({
				text : ''
			});
			root.type = 'async';
			/* 自动展开所有节点 */
			if (this.autoExpandAll)
				root.on('load', function(node) {
					node.expand(true);
				});
			else {
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
			}
			this.setRootNode(root);
		}
		var selectedNode = this.getSelectionModel().getSelectedNode();

		/* 初始化 */
		root.reload(function(node) {
			if (data) {
				var fn = function(node) {
					for ( var i = 0; i < data.length; i++)
						if (node.id == data[i].id) {
							node.getUI().toggleCheck(true);
							break;
						}
				};
				node.cascade(fn);
			}

			/* 选中上次选中的节点 */
			if (selectedNode) {
				//node.expand(true);
				//node.lastChild.expand();
				var fn = function(node) {
					if (node.id == selectedNode.id)
						node.select();
				};
				root.cascade(fn);
			}
			/* 选中第一个节点 */
			else if (root.firstChild)
				root.firstChild.select();
		}, root);
	},
	/**
	 * 获取被选中的节点ID
	 * 
	 * @return 被选中的节点ID
	 */
	getSelectedNodeId : function() {
		var sm = this.getSelectionModel();
		var node = sm ? sm.getSelectedNode() : null;
		return node ? node.id : null;
	},
	/**
	 * 获取被选中的节点
	 * 
	 * @return 被选中的节点
	 */
	getSelectedNode : function() {
		var sm = this.getSelectionModel();
		return sm ? sm.getSelectedNode() : null;
	},
	/**
	 * 重新加载数据
	 */
	reload : function() {
		this.init();
	},
	/**
	 * 重新加载数据，同{@link #method-reload}
	 */
	refresh : function() {
		this.reload();
	}
});