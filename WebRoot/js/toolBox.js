Ext.ns('Jinpeng.widget');
var cp = new Ext.state.CookieProvider();
Ext.state.Manager.setProvider(cp);
cp.set("eng	",eng);
var eng;
var gisUrl="http://172.31.108.15:8080/PGISViewer/PGISViewer.html";
/**
 * @class Jinpeng.widget.JsonTreeLoader
 * @extends Ext.tree.TreeLoader
 * @author Teon
 * @constructor 创建一个JsonTreeLoader
 * @param {Object} [config] 配置信息
 */
Jinpeng.widget.JsonTreeLoader = Ext.extend(Ext.tree.TreeLoader, {
	/**
	 * @cfg {Boolean} [showCheckbox=false] 是否显示复选框，默认为false
	 */
	showCheckbox : false,
	/**
	 * @cfg {Boolean} [ignoreCheckStatus=false] 忽略初始化选中状态，即默认全部未选中
	 */
	ignoreCheckStatus : false,
	/**
	 * @cfg {String} [root=data] JSON数据的根属性名称
	 */
	root : 'data',
	/**
	 * @cfg {String} [dataUrl] (required) 异步请求URL
	 */
	dataUrl : null,
	/**
	 * @cfg {String} [extraUrl] 额外的异步请求URL
	 */
	extraUrl : null,
	/**
	 * @cfg {String} [extraRoot=root] 额外的JSON数据的根属性名称
	 */
	extraRoot : 'data',
	/**
	 * @cfg {String} [extraFk=ref] 额外的JSON数据的外键字段
	 */
	extraFk : 'ref',
	/**
	 * @cfg {Object} extraBaseParams 额外的异步请求所需要的基础参数
	 */
	extraBaseParams : {},
	constructor : function(config) {
		Ext.apply(this, config);
		this.addEvents('beforeextraload', 'extraload');
		Jinpeng.widget.JsonTreeLoader.superclass.constructor.apply(this, arguments);
	},
	/**
	 * 将指定数据挂载到总数据集合上
	 * 
	 * @param {Array} data 主要数据
	 * @param {Object} extraData 待挂载的数据
	 * @param {String} fk 外键属性名称
	 * @return {Boolean} 是否成功
	 * @private
	 */
	hookExtraData : function(data, extraData, fk) {
		try {
			if (extraData[fk] == data.id) {
				if (!data.children)
					data.children = [];
				data.children[data.children.length] = extraData;
				return true;
			} else if (data.children) {
				for ( var i = 0; i < data.children.length; i++) {
					var rs = this.hookExtraData(data.children[i], extraData, fk);
					if (rs)
						break;
				}
			}
			return false;
		} catch (e) {
			return false;
		}
	},
	/**
	 * 处理异步响应
	 * 
	 * @param {Object} response 响应对象
	 * @param {Ext.tree.TreeNode} node 异步通信所对应的节点
	 * @param {Function} callback 回调函数
	 * @param {Object} scope
	 * @private
	 */
	processResponse : function(response, node, callback, scope) {
		var json = response.responseText;
		try {
			var o = response.responseData || Ext.decode(json);
			o = o[this.root];

			if (typeof this.processResponseData == 'function') {
				o = this.processResponseData(o);
			}

			/* 处理ExtraData */
			if (o && this.extraData && this.extraFk) {
				for ( var i = 0; i < this.extraData.length; i++) {
					if (this.extraData[i][this.extraFk]) {
						for ( var t = 0; t < o.length; t++) {
							var rs = this.hookExtraData(o[t], this.extraData[i], this.extraFk);
							if (rs)
								break;
						}
					}
				}
			}
			//将树抽出与GIS共享
			//if(globalJsonTree == null){
			globalJsonTree = Ext.encode(o);
			//}
			
			node.beginUpdate();
			for ( var i = 0, len = o.length; i < len; i++) {
				var n = this.createNode(o[i]);
				if (n) {
					node.appendChild(n);
				}
			}
			node.endUpdate();
			this.runCallback(callback, scope || node, [ node ]);
		} catch (e) {
			this.handleFailure(response);
		}
	},
	processResponseData : function(data) {
		return data;
	},
	/**
	 * 创建树节点
	 * 
	 * @param {Object} attr 树节点属性信息
	 * @return {Ext.tree.TreeNode} 树节点
	 * @private
	 */
	createNode : function(attr) {

		if (this.baseAttrs) {
			Ext.applyIf(attr, this.baseAttrs);
		}
		if (this.applyLoader !== false && !attr.loader) {
			attr.loader = this;
		}
		if (Ext.isString(attr.uiProvider)) {
			attr.uiProvider = this.uiProviders[attr.uiProvider] || eval(attr.uiProvider);
		}
		var node = null;
		var children = attr.children && Ext.isArray(attr.children) ? attr.children : [];

		attr.leaf = children.length == 0 ? true : false;

		if (!this.showCheckbox) {
			if (attr.checked) {
				attr.allowSelected = attr.checked.toString();// 用户是否可以选中
			}
			delete attr.checked;
			delete attr.gray;
		} else if (this.ignoreCheckStatus) {
			attr.checked = false;
		} else {
			if (attr.checked == 2)
				attr.check = 'gray';
			else
				attr.checked = attr.checked ? true : false;
		}
		if (attr.iconCls == 'x-node-staff') {
			// 不错任何处理，已经在子类做了处理
			if (attr.kkzt == '1') { //故障
				attr.iconCls = 'x-node-staff-maintain';
			}
			if (attr.kkzt == '2') { //报废
				attr.iconCls = 'x-node-staff-scrap';
			}
			if (attr.kkzt == '3') { //故障
				attr.iconCls = 'x-node-staff-stop';
			}
			if (attr.orgType == Jinpeng.ChannelTreePanel.nodeType.DIRECTION_COPY) { //树经过改造新加方向节点后，起初使用卡口节点样式变成了附在了方向上
				attr.iconCls = 'icon-direction-copy';
			}
		} else {
			// 覆盖之前的图标
			/*if (attr.type == Jinpeng.ChannelTreePanel.nodeType.KAKOU) {
				attr.iconCls = "icon-kakou-normal";
			} else if (attr.type == Jinpeng.ChannelTreePanel.nodeType.DIRECTION) {
				attr.iconCls = "icon-direction-normal";
			} else {
				attr.iconCls = "icon-domain-normal";
			}*/
			if (attr.orgType == Jinpeng.ChannelTreePanel.nodeType.MOUNT) {
				if (attr.kkzt == '1') { //故障
					attr.iconCls = 'x-node-staff-maintain';
				} else if (attr.kkzt == '2') { //报废
					attr.iconCls = 'x-node-staff-scrap';
				} else if (attr.kkzt == '3') { //故障
					attr.iconCls = 'x-node-staff-stop';
				} else {
					attr.iconCls = 'icon-direction-normal';
				}
			} else if (attr.orgType == Jinpeng.ChannelTreePanel.nodeType.DEPT) {
				attr.iconCls = "icon-kakou-normal";
			} else if (attr.orgType == Jinpeng.ChannelTreePanel.nodeType.DEVICE_NEW) {
				attr.iconCls = "icon-device-normal";
			} else if (attr.orgType == Jinpeng.ChannelTreePanel.nodeType.AREA) {
				attr.iconCls = "icon-domain-normal";
			} else if (attr.orgType == Jinpeng.ChannelTreePanel.nodeType.DIRECTION_COPY) { //树经过改造新加方向节点后，起初使用卡口节点样式变成了附在了方向上
				attr.iconCls = "icon-direction-copy";
			} else {
				attr.iconCls = "icon-device-normal";
			}
		}

		if (attr.nodeType) {
			node = new Ext.tree.TreePanel.nodeTypes[attr.nodeType](attr);
		} else {
			node = attr.leaf ? new Ext.tree.TreeNode(attr) : new Ext.tree.AsyncTreeNode(attr);
		}
		node.attachment = attr;
		if (node && children.length > 0) {
			for ( var i = 0; i < children.length; i++) {
				var child = this.createNode(children[i]);
				if (child)
					node.appendChild(child);
			}
		}
		return node;
	},
	/**
	 * 处理待挂载数据
	 * 
	 * @param {Object} data 待挂载数据
	 * @return {Object} 处理后的挂载数据
	 * @private
	 */
	processExtraData : function(data) {
		return data;
	},
	listeners : {
		beforeload : function(loader, node, callback) {
			loader.extraData = [];
			if (loader.extraUrl)
				try {

					/* 触发事件 */
					loader.fireEvent('beforeextraload', conn, loader, node, callback);

					/* 加工参数 */
					var pArr = [];
					if (loader.extraBaseParams) {
						for ( var i in loader.extraBaseParams)
							pArr[pArr.length] = i + '=' + loader.extraBaseParams[i];
					}
					if (loader.extraParams) {
						for ( var i in loader.extraParams)
							pArr[pArr.length] = i + '=' + loader.extraParams[i];
					}
					var params = pArr.join('&');

					/* 准备通信 */
					var conn = Ext.lib.Ajax.getConnectionObject().conn;
					conn.open("POST", loader.extraUrl, false);
					conn.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");

					/* 通信 */
					conn.send(params);
					var response = conn.responseText;

					/* 触发事件 */
					loader.fireEvent('extraload', conn, loader, node, response);

					var o = Ext.decode(response);
					if (loader.extraRoot && o[loader.extraRoot]) {
						loader.extraData = o[loader.extraRoot];
					}

					if (typeof this.processExtraData == 'function')
						loader.extraData = this.processExtraData(loader.extraData);

				} catch (e) {
				}
		}
	}
});

/**
 * @class Jinpeng.widget.GeneralWindow
 * @extends Ext.Window
 * @author Teon
 * 
 * 一般性表格控件
 * 
 * @constructor 创建一个GeneralWindow
 * @param {Object/String} [config] 配置信息
 */
Jinpeng.widget.GeneralWindow = Ext.extend(Ext.Window, {
	/**
	 * @cfg {String} [layout=border] 布局
	 */
	layout : 'border',
	/**
	 * @cfg {Boolean} [border=false] 是否具有边框
	 */
	border : false,
	/**
	 * @cfg {Boolean} [modal=false] 是否模式窗口
	 */
	modal : true,
	/**
	 * @cfg {String} [buttonAlign=center] 窗口按钮对齐方式
	 */
	buttonAlign : 'center',
	/**
	 * @cfg {Boolean} [resizable=false] 是否可修改尺寸
	 */
	resizable : false,
	constructor : function(config) {

		Ext.apply(this, config);

		this.addEvents('storeready', 'allstoreready');

		Jinpeng.widget.GeneralWindow.superclass.constructor.apply(this, arguments);

		this.initStoreReady();

	},
	initStoreReady : function() {

		var window = this;
		var cmps = window.findByType(Ext.Component);

		var stores = [];
		Ext.each(cmps, function(cmp) {
			if (typeof cmp.getStore == 'function') {
				var store = cmp.getStore();
				if (typeof store != "undefined") {// xlg add
					stores.push(store);
				}
			}
		});

		window.unreadyStores = stores;

		Ext.each(stores, function(store) {
			store.on('load', function(st, rs, opt) {
				if (window.unreadyStores.indexOf(st) != -1) {
					window.fireEvent('storeready', window, st);
					window.unreadyStores.remove(st);
					if (window.unreadyStores.length == 0) {
						window.fireEvent('allstoreready', window);
					}
				}
			});
		});

	},
	show : function(animateTarget, cb, scope) {
		//try {
			if (!this.rendered) {
				var body = Ext.getBody();
				this.render(body);
			}
			if (this.hidden === false) {
				this.toFront();
				return this;
			}
			if (this.fireEvent('beforeshow', this) === false) {
				return this;
			}
			if (cb) {
				this.on('show', cb, scope, {
					single : true
				});
			}
			this.hidden = false;
			if (Ext.isDefined(animateTarget)) {
				this.setAnimateTarget(animateTarget);
			}
			this.beforeShow();
			if (this.animateTarget) {
				this.animShow();
			} else {
				this.afterShow();
			}
		//} catch (e) {
			//Ext.debug(e);
		//}
		return this;
	}
});

/**
 * @class Jinpeng.widget.GeneralGrid
 * @extends Ext.grid.GridPanel
 * @author Teon
 * 
 * 一般性表格控件
 * 
 * @constructor 创建一个GeneralGrid
 * @param {Object/String} [config] 配置信息
 */
Jinpeng.widget.GeneralGrid = Ext.extend(Ext.grid.GridPanel, {
	/**
	 * @cfg {Boolean} [border=false] 是否具有边框
	 */
	border : false,
	/**
	 * @cfg {Number} [pageSize=10] 分页容量
	 */
	pageSize : 10,
	/**
	 * @cfg {Boolean} [loadMask=false] 是否显示加载提示
	 */
	loadMask : true,
	/**
	 * @cfg {String} [smtype] 选择模型类别，可选值：checkbox - 复选框，其他值 - 普通
	 */
	smtype : 'checkbox',
	/**
	 * 是否显示复选框
	 */
	showCheck:true, 
	/**
	 * @cfg {Boolean} [paging=false] 是否显示分页栏
	 */
	paging : false,
	enableHdMenu : false,
	constructor : function(config) {

		Ext.apply(this, config);

		/* 选择模型 */
		if (!this.sm) {
			if (this.smtype == 'checkbox')
				this.sm = new Ext.grid.CheckboxSelectionModel({});
		}
		if (this.columns&&this.showCheck)
			this.columns.unshift(this.sm);

		/* 分页栏 */
		if (this.paging)
			this.bbar = new Jinpeng.widget.PagingToolbar({
				pageSize : this.pageSize,
				store : this.store
			});

		/* 调用父类构造函数 */
		Jinpeng.widget.GeneralGrid.superclass.constructor.apply(this, arguments);

	},
	/**
	 * 重新加载
	 * 
	 */
	reload : function() {
		var store = this.getStore();
		if (store)
			store.reload();
	}
});

/**
 * @class Jinpeng.widget.GeneralTree
 * @extends Ext.tree.TreePanel
 * @author Teon
 * 
 * 一般性树
 * 
 * @constructor 创建一个GeneralTree
 * @param {Object/String} [config] 配置信息
 */
Jinpeng.widget.GeneralTree = Ext.extend(Ext.tree.TreePanel, {
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
	autoExpandAll : false,
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
					var allChecked = true;
					for ( var i = 0; i < children.length; i++) {
						if (children[i].getUI().isChecked())
							allUnchecked = false;
						else
							allChecked = false;
					}
					if (!allChecked)
						node.getUI().toggleCheck(false);
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

		Jinpeng.widget.GeneralTree.superclass.constructor.apply(this, arguments);

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
		} else {
			root.firstChild.expand();
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
				node.expand(true);
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

/**
 * @class Jinpeng.widget.OrganizationTree
 * @extends Jinpeng.widget.GeneralTree
 * @xtype orgtree
 * @author Teon
 * @constructor 创建一个OrganizationTree
 * @param {Object/String} [config] 配置信息
 */
Jinpeng.widget.OrganizationTree = Ext.extend(Jinpeng.widget.GeneralTree, {
	/**
	 * @cfg {String} [cls=orgtree] 样式
	 */
	cls : 'orgtree',
	/**
	 * @cfg {Boolean} [border=true] 是否具有边框
	 */
	border : true,
	/**
	 * @cfg {String} [dataUrl=内置的组织结构树URL] 数据请求URL
	 */
	dataUrl : rootpath + '/systemOrg/orgTreeMap.mvc',
	listeners : {
		checkchange : function(node, checked) {
			var tree = node.getOwnerTree();
			var event = 'checkchange';
			var fn = arguments.callee;
			node.expand(true);
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
					var allChecked = true;
					for ( var i = 0; i < children.length; i++) {
						if (children[i].getUI().isChecked()) {
							allUnchecked = false;
							// allChecked = true;
						} else
							allChecked = false;
					}
					if (!allChecked)
						node.getUI().toggleCheck(false);
					else
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
		Jinpeng.widget.OrganizationTree.superclass.constructor.apply(this, arguments);
	}
});

/**
 * @class Jinpeng.widget.PagingToolbar
 * @extends Ext.PagingToolbar
 * @author Teon
 * 分页工具栏
 * @constructor 创建一个PagingToolbar
 * 
 */
Jinpeng.widget.PagingToolbar = Ext.extend(Ext.PagingToolbar, {
	displayPageMsg : '第{0}页  共{2}条 共{1}页', // displayPageMsg=第{0}页 共{2}条 共{1}页] 页码信息模板
	cls : 'paging', // CSS名称
	emptyMsg : "无数据", // 无数据时的显示信息
	goText : '跳转',
	firstText : '第一页',
	prevText : '上一页',
	nextText : '下一页',
	lastText : '最后页',
	/**
	 * 初始化控件
	 */
	initComponent : function() {
		Jinpeng.widget.PagingToolbar.superclass.initComponent.apply(this, arguments);
		this.removeAll(true);

		var pagingItems = [ '->', this.first = new Ext.Toolbar.Button({
			width : 20,
			tooltip : this.firstText,
			overflowText : this.firstText,
			iconCls : 'x-tbar-page-first',
			disabled : true,
			handler : this.moveFirst,
			scope : this
		}), this.prev = new Ext.Toolbar.Button({
			width : 20,
			tooltip : this.prevText,
			overflowText : this.prevText,
			iconCls : 'x-tbar-page-prev',
			disabled : true,
			handler : this.movePrevious,
			scope : this
		}), this.pageInfo = new Ext.Toolbar.TextItem({}), this.inputItem = new Ext.form.NumberField({
			cls : 'x-tbar-page-number',
			width : 30,
			allowDecimals : false,
			allowNegative : false,
			enableKeyEvents : true,
			selectOnFocus : true,
			submitValue : false,
			listeners : {
				scope : this,
				keydown : this.onPagingKeyDown
			}
		}), this.go = new Ext.Toolbar.Button({
			width : 20,
			tooltip : this.goText,
			overflowText : this.goText,
			iconCls : 'x-tbar-page-go',
			disabled : false,
			handler : this.goPage,
			scope : this
		}), this.next = new Ext.Toolbar.Button({
			width : 20,
			tooltip : this.nextText,
			overflowText : this.nextText,
			iconCls : 'x-tbar-page-next',
			disabled : true,
			handler : this.moveNext,
			scope : this
		}), this.last = new Ext.Toolbar.Button({
			width : 20,
			tooltip : this.lastText,
			overflowText : this.lastText,
			iconCls : 'x-tbar-page-last',
			disabled : true,
			handler : this.moveLast,
			scope : this
		}) ];

		var items = pagingItems;
		for ( var i = 0; i < items.length; i++)
			this.add(items[i]);
	},
	/**
	 * 跳转至页码，页码由页码跳转文本框提供
	 * 
	 * @private
	 */
	goPage : function() {
		var d = this.getPageData();
		pageNum = this.readPage(d);
		if (pageNum !== false) {
			pageNum = Math.min(Math.max(1, pageNum), d.pages) - 1;
			this.doLoad(pageNum * this.pageSize);
		}
	},
	/**
	 * On Load
	 */
	onLoad : function(store, r, o) {
		if (!this.rendered) {
			this.dsLoaded = [ store, r, o ];
			return;
		}
		var p = this.getParams();
		this.cursor = (o.params && o.params[p.start]) ? o.params[p.start] : 0;
		var d = this.getPageData(), ap = d.activePage, ps = d.pages;

		this.afterTextItem.setText(String.format(this.afterPageText, d.pages));

		this.pageInfo.setText(String.format(this.displayPageMsg, d.activePage, d.pages, this.store.getTotalCount()));

		this.inputItem.setValue(ap);
		this.first.setDisabled(ap == 1);
		this.prev.setDisabled(ap == 1);
		this.next.setDisabled(ap == ps);
		this.last.setDisabled(ap == ps);
		this.refresh.enable();
		this.updateInfo();
		this.fireEvent('change', this, d);
	},
	getPageNumber : function () {
		return this.inputItem.getValue(); 
	}
});

/**
 * @class Jinpeng.widget.PagingToolbarForAll
 * @extends Ext.PagingToolbar
 * @author Teon
 * 分页工具栏,提供没有总条数，及没有总页数使用
 * @constructor 创建一个PagingToolbarForAll
 * 
 */
Jinpeng.widget.PagingToolbarForAll = Ext.extend(Ext.PagingToolbar, {
	displayPageMsg : '第{0}页 ', // displayPageMsg=第{0}页 共{2}条 共{1}页] 页码信息模板
	cls : 'paging', // CSS名称
	emptyMsg : "无数据", // 无数据时的显示信息
	goText : '跳转',
	firstText : '第一页',
	prevText : '上一页',
	nextText : '下一页',
	lastText : '最后页',
	/**
	 * 初始化控件
	 */
	initComponent : function() {
		Jinpeng.widget.PagingToolbar.superclass.initComponent.apply(this, arguments);
		this.removeAll(true);

		var pagingItems = [ '->', this.first = new Ext.Toolbar.Button({
			width : 20,
			tooltip : this.firstText,
			overflowText : this.firstText,
			iconCls : 'x-tbar-page-first',
			disabled : true,
			handler : this.moveFirst,
			scope : this
		}), this.prev = new Ext.Toolbar.Button({
			width : 20,
			tooltip : this.prevText,
			overflowText : this.prevText,
			iconCls : 'x-tbar-page-prev',
			disabled : true,
			handler : this.movePrevious,
			scope : this
		}), this.pageInfo = new Ext.Toolbar.TextItem({}), this.next = new Ext.Toolbar.Button({
			width : 20,
			tooltip : this.nextText,
			overflowText : this.nextText,
			iconCls : 'x-tbar-page-next',
			disabled : true,
			handler : this.moveNext,
			scope : this
		}) ];

		var items = pagingItems;
		for ( var i = 0; i < items.length; i++)
			this.add(items[i]);
	},
	moveNext : function() {
		var store;
		if (showFlag == 'pig') {
			store = Ext.getCmp('phones').store;
		} else {
			store = Ext.getCmp('historyGridPanel').store;
		}
		var pageFlag = store.data.items[0].data.ssdq;
		if (pageFlag == 'data') {
			this.doLoad(this.cursor + this.pageSize);
		}
		//if (counts == this.pageSize) {
			//this.doLoad(this.cursor + this.pageSize);
		//}
	},
	/**
	 * 跳转至页码，页码由页码跳转文本框提供
	 * 
	 * @private
	 */
	goPage : function() {
		var d = this.getPageData();
		pageNum = this.readPage(d);
		if (pageNum !== false) {
			pageNum = Math.min(Math.max(1, pageNum), d.pages) - 1;
			this.doLoad(pageNum * this.pageSize);
		}
	},
	/**
	 * On Load
	 */
	onLoad : function(store, r, o) {
		if (!this.rendered) {
			this.dsLoaded = [ store, r, o ];
			return;
		}
		var p = this.getParams();
		this.cursor = (o.params && o.params[p.start]) ? o.params[p.start] : 0;
		var d = this.getPageData(), ap = d.activePage, ps = d.pages;

		this.afterTextItem.setText(String.format(this.afterPageText, d.pages));

		this.pageInfo.setText(String.format(this.displayPageMsg, d.activePage, d.pages, this.store.getTotalCount()));

		this.inputItem.setValue(ap);
		this.first.setDisabled(ap == 1);
		this.prev.setDisabled(ap == 1);
		this.next.setDisabled(ap == ps);
		this.last.setDisabled(ap == ps);
		this.refresh.enable();
		this.updateInfo();
		this.fireEvent('change', this, d);
	}
});

/**
 * @class Jinpeng.widget.PagingToolbarForAll
 * @extends Ext.PagingToolbar
 * @author Teon
 * 分页工具栏,提供没有总条数，及没有总页数使用
 * @constructor 创建一个PagingToolbarForAll
 * 
 */
Jinpeng.widget.PagingToolbarNoPage = Ext.extend(Ext.PagingToolbar, {
	displayPageMsg : '第{0}页 ', // displayPageMsg=第{0}页 共{2}条 共{1}页] 页码信息模板
	cls : 'paging', // CSS名称
	emptyMsg : "无数据", // 无数据时的显示信息
	goText : '跳转',
	firstText : '第一页',
	prevText : '上一页',
	nextText : '下一页',
	lastText : '最后页',
	/**
	 * 初始化控件
	 */
	initComponent : function() {
		Jinpeng.widget.PagingToolbar.superclass.initComponent.apply(this, arguments);
		this.removeAll(true);

		var pagingItems = [ '->', this.first = new Ext.Toolbar.Button({
			width : 20,
			tooltip : this.firstText,
			overflowText : this.firstText,
			iconCls : 'x-tbar-page-first',
			disabled : true,
			handler : this.moveFirst,
			scope : this
		}), this.prev = new Ext.Toolbar.Button({
			width : 20,
			tooltip : this.prevText,
			overflowText : this.prevText,
			iconCls : 'x-tbar-page-prev',
			disabled : true,
			handler : this.movePrevious,
			scope : this
		}), this.pageInfo = new Ext.Toolbar.TextItem({}), this.next = new Ext.Toolbar.Button({
			width : 20,
			tooltip : this.nextText,
			overflowText : this.nextText,
			iconCls : 'x-tbar-page-next',
			disabled : true,
			handler : this.moveNext,
			scope : this
		}) ];

		var items = pagingItems;
		for ( var i = 0; i < items.length; i++)
			this.add(items[i]);
	},
	moveNext : function() {
		var store = Ext.getCmp('gridPanel').store;
		var pageFlag = store.data.items[0].data.lastFlag;
		if (pageFlag == 'data') {
			this.doLoad(this.cursor + this.pageSize);
		}
		//if (counts == this.pageSize) {
			//this.doLoad(this.cursor + this.pageSize);
		//}
	},
	/**
	 * 跳转至页码，页码由页码跳转文本框提供
	 * 
	 * @private
	 */
	goPage : function() {
		var d = this.getPageData();
		pageNum = this.readPage(d);
		if (pageNum !== false) {
			pageNum = Math.min(Math.max(1, pageNum), d.pages) - 1;
			this.doLoad(pageNum * this.pageSize);
		}
	},
	/**
	 * On Load
	 */
	onLoad : function(store, r, o) {
		if (!this.rendered) {
			this.dsLoaded = [ store, r, o ];
			return;
		}
		var p = this.getParams();
		this.cursor = (o.params && o.params[p.start]) ? o.params[p.start] : 0;
		var d = this.getPageData(), ap = d.activePage, ps = d.pages;

		this.afterTextItem.setText(String.format(this.afterPageText, d.pages));

		this.pageInfo.setText(String.format(this.displayPageMsg, d.activePage, d.pages, this.store.getTotalCount()));

		this.inputItem.setValue(ap);
		this.first.setDisabled(ap == 1);
		this.prev.setDisabled(ap == 1);
		this.next.setDisabled(ap == ps);
		this.last.setDisabled(ap == ps);
		this.refresh.enable();
		this.updateInfo();
		this.fireEvent('change', this, d);
	}
});

/**
 * @class Jinpeng.widget.PagingToolbar
 * @extends Ext.PagingToolbar
 * @author Teon
 * 分页工具栏,只针对历史过车公分页页面使用
 * @constructor 创建一个PagingToolbar
 * 
 */
Jinpeng.widget.PagingHistoryToolbar = Ext.extend(Ext.PagingToolbar, {
	displayPageMsg : '第{0}页  共{2}条 共{1}页', // displayPageMsg=第{0}页 共{2}条 共{1}页] 页码信息模板
	cls : 'paging', // CSS名称
	emptyMsg : "无数据", // 无数据时的显示信息
	goText : '跳转',
	firstText : '第一页',
	prevText : '上一页',
	nextText : '下一页',
	lastText : '最后页',
	/**
	 * 初始化控件
	 */
	initComponent : function() {
		Jinpeng.widget.PagingToolbar.superclass.initComponent.apply(this, arguments);
		this.removeAll(true);

		var pagingItems = [ '->', this.first = new Ext.Toolbar.Button({
			width : 20,
			tooltip : this.firstText,
			overflowText : this.firstText,
			iconCls : 'x-tbar-page-first',
			disabled : true,
			handler : this.moveFirst_re,
			scope : this
		}), this.prev = new Ext.Toolbar.Button({
			width : 20,
			tooltip : this.prevText,
			overflowText : this.prevText,
			iconCls : 'x-tbar-page-prev',
			disabled : true,
			handler : this.movePrevious_re,
			scope : this
		}), this.pageInfo = new Ext.Toolbar.TextItem({}), this.inputItem = new Ext.form.NumberField({
			cls : 'x-tbar-page-number',
			width : 30,
			allowDecimals : false,
			allowNegative : false,
			enableKeyEvents : true,
			selectOnFocus : true,
			submitValue : false,
			listeners : {
				scope : this,
				keydown : this.onPagingKeyDown
			}
		}), this.go = new Ext.Toolbar.Button({
			width : 20,
			tooltip : this.goText,
			overflowText : this.goText,
			iconCls : 'x-tbar-page-go',
			disabled : false,
			handler : this.goPage_re,
			scope : this
		}), this.next = new Ext.Toolbar.Button({
			width : 20,
			tooltip : this.nextText,
			overflowText : this.nextText,
			iconCls : 'x-tbar-page-next',
			disabled : true,
			handler : this.moveNext_re,
			scope : this
		}), this.last = new Ext.Toolbar.Button({
			width : 20,
			tooltip : this.lastText,
			overflowText : this.lastText_re,
			iconCls : 'x-tbar-page-last',
			disabled : true,
			handler : this.moveLast,
			scope : this
		}) ];

		var items = pagingItems;
		for ( var i = 0; i < items.length; i++)
			this.add(items[i]);
	},
	/**
	 * 跳转至页码，页码由页码跳转文本框提供
	 * 
	 * @private
	 */
	goPage : function() {
		var d = this.getPageData();
		pageNum = this.readPage(d);
		if (pageNum !== false) {
			pageNum = Math.min(Math.max(1, pageNum), d.pages) - 1;
			this.doLoad(pageNum * this.pageSize);
		}
	},
	/**
	 * On Load
	 */
	onLoad : function(store, r, o) {
		if (!this.rendered) {
			this.dsLoaded = [ store, r, o ];
			return;
		}
		var p = this.getParams();
		this.cursor = (o.params && o.params[p.start]) ? o.params[p.start] : 0;
		var d = this.getPageData(), ap = d.activePage, ps = d.pages;

		this.afterTextItem.setText(String.format(this.afterPageText, d.pages));

		this.pageInfo.setText(String.format(this.displayPageMsg, d.activePage, d.pages, this.store.getTotalCount()));

		this.inputItem.setValue(ap);
		this.first.setDisabled(ap == 1);
		this.prev.setDisabled(ap == 1);
		this.next.setDisabled(ap == ps);
		this.last.setDisabled(ap == ps);
		this.refresh.enable();
		this.updateInfo();
		this.fireEvent('change', this, d);
	},
	getPageNumber : function () {
		return this.inputItem.getValue(); 
	}
});

/**
 * @class Jinpeng.widget.SimpleUserGrid
 * @extends Ext.grid.GridPanel
 * @xtype simpleusergrid
 * @author Teon
 * 
 * 简单的用户表格
 * 
 * @constructor 创建一个SimpleUserGrid
 * @param {Object} [config] 配置信息
 * 
 */
Jinpeng.widget.SimpleUserGrid = Ext.extend(Ext.grid.GridPanel, {
	/**
	 * @cfg {Number} [pageSize=10] 默认的分页容量
	 */
	pageSize : 10,
	/**
	 * @cfg {Boolean} [paging=true] 是否分页
	 */
	paging : true,
	/**
	 * @cfg {Boolean} [autoLoading=true] 是否自动加载数据
	 */
	autoLoading : true,
	/**
	 * @cfg {Boolean} loadMask 加载时是否显示提示信息
	 */
	loadMask : false,
	/**
	 * @cfg {String} [smtype=checkbox] 选择类型（checkbox-复选框/row-普通）
	 */
	smtype : 'checkbox',
	/**
	 * @cfg {String} [rootProperty] 异步请求数据根属性
	 */
	rootProperty : null,
	constructor : function(config) {

		/* 合并配置信息 */
		Ext.apply(this, config);

		/* 是否显示复选框 */
		if (this.smtype == 'checkbox') {
			this.sm = new Ext.grid.CheckboxSelectionModel({});
		}

		/* 栏目 */
		this.columns = [];
		if (this.sm)
			this.columns.push(this.sm);

		this.columns.push({
			header : "账号",
			dataIndex : 'loginName',
			width : 100
		});
		this.columns.push({
			header : "姓名",
			dataIndex : 'realName',
			width : 100
		});
		this.columns.push({
			header : "所属部门",
			dataIndex : 'orgName',
			width : 100
		});

		/* 数据Store */
		if (!this.store) {
			var url = this.paging ? rootpath + '/client/system/userPage.action' : rootpath + '/client/system/jsonUserList.action';
			var rootProperty = this.rootProperty ? this.rootProperty : (this.paging ? 'result' : 'data');
			this.store = new Ext.data.JsonStore({
				url : url,
				root : rootProperty,
				idProperty : 'id',
				totalProperty : 'totalCount',
				baseParams : {
					'page.limit' : this.pageSize
				},
				autoLoad : this.autoLoading,
				fields : [ 'id', 'loginName', 'realName', 'orgName' ]
			});
		}

		/* 分页栏 */
		if (this.paging)
			this.bbar = new Jinpeng.widget.PagingToolbar({
				pageSize : this.pageSize,
				store : this.store
			});

		/* 调用父类构造函数 */
		Jinpeng.widget.SimpleUserGrid.superclass.constructor.apply(this, arguments);
	}
});

/**
 * 归属地查询(即通道名称), 点击能道节点，以事件的方处理 使用: 1.加入content/js/widget.js文件 2.引入组件 xtyp:addressbychannelpanel 或者 new Jinpeng.widget.AddressByChannelPanel(); 3.增加监听事件获取返回值{id:XXX,name:XXX:type:XXX}：通过回调方法 callBackFun
 * 如果节点是通道（揭阳是设备）会有lane(车道号) 和 direct(方向) channelID(通道 id) 4.设置属性 showCheckbox，是否显示checkBox
 * 
 * @by xiaowan
 */
Jinpeng.widget.AddressByChannelPanel = Ext.extend(Ext.Panel, {
	border : false,
	/**
	 * 回调函数
	 * 
	 * @type
	 */
	callBackFun : null,
	showCheckbox : false,
	/**
	 * @cfg 是否下挂设备
	 * @type Boolean
	 */
	showChannel : true,
	/**
	 * @cfg 是否显示searchLabel
	 * @type Boolean
	 */
	showSearchLabel : true,
	/**
	 * 是否只显示组织,如果onlyOrg为true，在showChannel将会失效
	 */
	onlyOrg : false,

	/**
	 * @cfg Search Lable
	 * @type String
	 */
	searchLabel : '通过地点',

	initComponent : function() {
		if(this.onlyOrg){
			this.showChannel = false;
		}
		Ext.apply(this, {
			layout : 'fit',
			items : [ {
				ref : 'tree',
				xtype : 'channeltree',
				anchor : '100%',
				bodyStyle : 'background: #f5fdff;border: 1px solid #bdecf9;margin: 5px 0px;border-left: 0;border-right: 0;padding-top: 5px;',
				searchLabel : this.searchLabel,
				displayLabel : this.showSearchLabel,
				border : false,
				async : false,
				checked : this.showCheckbox || false,
				loadMask : {
					msg : '正在加载数据，请稍侯...'
				},
				root : {
					nodeType : 'async',
					id : 'root',
					loader : new Jinpeng.widget.JsonTreeLoader({
						url : rootpath + (this.onlyOrg?'/systemOrg/onlyOrgTreeMap.mvc':'/systemOrg/orgTreeMap.mvc'),
						extraUrl : this.showChannel ? rootpath + '/device/findAllDevice.mvc' : null,
						extraParams : {
							textProperty : 'text'
						},
						extraFk : 'orgId',
						processResponseData : function(data) {
							if (data) {
								transformTreeNodeType(data);
							}
							return data;
						},
						processExtraData : function(data) {
							if (data) {
								transformTreeNodeType(data);
							}
							return data;
						}
					})
				}
			} ]
		});

		Jinpeng.widget.AddressByChannelPanel.superclass.initComponent.apply(this);
		this.tree.on('click', this.onTreeClick, this);
	},
	setAutoScroll : function(scroll) {
		if (this.rendered) {
			this.getContentTarget().setStyle("overflow-y", "auto").setStyle("overflow-x", "hidden");
		}
		this.autoScroll = scroll;
		return this;
	},
	onTreeClick : function(node) {
		var param = {
			"type" : node.attributes.type,
			"orgType" : node.attributes.orgType,
			"name" : node.text
		};
		if (node.attributes.type == Jinpeng.ChannelTreePanel.nodeType.DOMAIN || node.attributes.type == Jinpeng.ChannelTreePanel.nodeType.KAKOU
				|| node.attributes.type == Jinpeng.ChannelTreePanel.nodeType.DIRECTION) {// 99 88 77
			param['id'] = node.attributes.id;
			param['type'] = Jinpeng.ChannelTreePanel.nodeType.DOMAIN;// 这三种情况都是组织！
		} else {// 100 101
			// 如果不是组织，id需要截取，后再在封装时为防止id一样导致树无法打开，加了前缀 device_,channel_
			param['id'] = node.attributes.id.substring(node.attributes.id.indexOf("_") + 1);
			param['direct'] = node.attributes.direct;
			param['lane'] = node.attributes.lane;
			param['channelID'] = node.attributes.channelPKId;
		}
		if (this.callBackFun) {
			this.callBackFun(param);
		}
		this.publish('/widget/getAddressNameEvent', param);
	},
	onTreeNodeBeforeClick : function(node) {
		if (!node.attributes.leaf) {
			return false;
		}
	}
});

/**
 * @class Jinpeng.widget.TTreeNodeUI
 * @extends Ext.tree.TreeNodeUI
 * @author Teon
 * 
 * 支持ReadOnly的树节点UI
 * 
 * @constructor 创建一个TTreeNodeUI
 * @param {Object/String} [config] 配置信息
 */
Jinpeng.widget.TTreeNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
	constructor : function(config) {
		delete config.readonly;
		Jinpeng.widget.TTreeNodeUI.superclass.constructor.apply(this, arguments);
	},
	/**
	 * 更改选中状态，只读则什么也不做
	 * 
	 * @param value 需要修改的状态值
	 */
	toggleCheck : function(value) {
		if (this.node.attributes && this.node.attributes.readonly)
			return;
		Jinpeng.widget.TTreeNodeUI.superclass.toggleCheck.apply(this, arguments);
	}
});

/**
 * @class Jinpeng.widget.DataJsonReader
 * @extends Ext.data.JsonReader
 * @author Teon
 * 
 * Jinpeng统一的JSON数据规范下的JsonReader
 * 
 * JinpengJSON数据规范为：{data: {result:[], totalCount: xxx}, ...}
 * 
 * @constructor 创建一个DataJsonReader
 * @param {Object/String} [config] 配置信息
 */
Jinpeng.widget.DataJsonReader = Ext.extend(Ext.data.JsonReader, {
	constructor : function(config) {
		Ext.applyIf(config, {
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount'
		});
		Jinpeng.widget.DataJsonReader.superclass.constructor.apply(this, arguments);
	},
	/**
	 * 读取响应
	 * 
	 * @param response 响应
	 * @returns 解析得到的数据
	 * @private
	 */
	read : function(response) {
		var json = response.responseText;
		var o = Ext.decode(json);
		if (!o) {
			throw {
				message : 'JsonReader.read: Json object not found'
			};
		}
		return this.readRecords(o.data);
	}
});

Jinpeng.widget.TComboBox = Ext.extend(Ext.form.ComboBox, {
	editable : false,
	selectOnFocus : false,
	forceSelection : false,
	constructor : function(config) {
		Ext.apply(this, config);
		Jinpeng.widget.TComboBox.superclass.constructor.apply(this, arguments);
	},
	initComponent : function() {
		Jinpeng.widget.TComboBox.superclass.initComponent.apply(this, arguments);
		this.emptyRecord = null;
		if (this.emptyText && this.emptyText.length > 0) {
			var obj = {};
			obj[this.displayField] = this.emptyText;
			obj[this.valueField] = '';
			this.emptyRecord = new Ext.data.Record(obj);
		}
	},
	findRecord : function(prop, value) {
		var record = null;
		var r = this.emptyRecord;
		if (r && r.data[prop] === value) {
			record = r;
		} else if (this.store.getCount() > 0) {
			this.store.each(function(r) {
				if (r.data[prop] == value) {
					record = r;
					return false;
				}
			});
		}
		return record;
	},
	initList : function() {
		if (!this.list) {
			var cls = 'x-combo-list', listParent = Ext.getDom(this.getListParent() || Ext.getBody());

			this.list = new Ext.Layer({
				parentEl : listParent,
				shadow : this.shadow,
				cls : [ cls, this.listClass ].join(' '),
				constrain : false,
				zindex : this.getZIndex(listParent)
			});

			var lw = this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);
			this.list.setSize(lw, 0);
			this.list.swallowEvent('mousewheel');
			this.assetHeight = 0;
			if (this.syncFont !== false) {
				this.list.setStyle('font-size', this.el.getStyle('font-size'));
			}
			if (this.title) {
				this.header = this.list.createChild({
					cls : cls + '-hd',
					html : this.title
				});
				this.assetHeight += this.header.getHeight();
			}

			this.innerList = this.list.createChild({
				cls : cls + '-inner'
			});
			this.mon(this.innerList, 'mouseover', this.onViewOver, this);
			this.mon(this.innerList, 'mousemove', this.onViewMove, this);
			this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));

			if (this.pageSize) {
				this.footer = this.list.createChild({
					cls : cls + '-ft'
				});
				this.pageTb = new Ext.PagingToolbar({
					store : this.store,
					pageSize : this.pageSize,
					renderTo : this.footer
				});
				this.assetHeight += this.footer.getHeight();
			}

			if (!this.tpl) {
				this.tpl = '<tpl for="."><div class="' + cls + '-item" ' + (this.tipField ? 'ext:qtip="{' + this.tipField + '}"' : "") + '>{' + this.displayField + '}</div></tpl>';
			}

			this.view = new Ext.DataView({
				emptyRecord : this.emptyRecord || null,
				applyTo : this.innerList,
				tpl : this.tpl,
				singleSelect : true,
				selectedClass : this.selectedClass,
				itemSelector : this.itemSelector || '.' + cls + '-item',
				emptyText : this.listEmptyText,
				deferEmptyText : false,
				refresh : function() {
					this.clearSelections(false, true);
					var el = this.getTemplateTarget(), records = this.store.getRange();

					if (this.emptyRecord)
						records.unshift(this.emptyRecord);

					el.update('');
					if (records.length < 1) {
						if (!this.deferEmptyText || this.hasSkippedEmptyText) {
							el.update(this.emptyText);
						}
						this.all.clear();
					} else {
						this.tpl.overwrite(el, this.collectData(records, 0));
						this.all.fill(Ext.query(this.itemSelector, el.dom));
						this.updateIndexes(0);
					}
					this.hasSkippedEmptyText = true;
				}
			});

			this.mon(this.view, {
				containerclick : this.onViewClick,
				click : this.onViewClick,
				scope : this
			});

			this.bindStore(this.store, true);

			if (this.resizable) {
				this.resizer = new Ext.Resizable(this.list, {
					pinned : true,
					handles : 'se'
				});
				this.mon(this.resizer, 'resize', function(r, w, h) {
					this.maxHeight = h - this.handleHeight - this.list.getFrameWidth('tb') - this.assetHeight;
					this.listWidth = w;
					this.innerList.setWidth(w - this.list.getFrameWidth('lr'));
					this.restrictHeight();
				}, this);

				this[this.pageSize ? 'footer' : 'innerList'].setStyle('margin-bottom', this.handleHeight + 'px');
			}
		}
	},
	onViewClick : function(doFocus) {
		var index = this.view.getSelectedIndexes()[0];
		var s = this.store;

		var r = null;
		if (this.emptyRecord) {
			if (index == 0)
				r = this.emptyRecord;
			else
				r = s.getAt(index - 1);
		} else
			r = s.getAt(index);

		if (r) {
			this.onSelect(r, index);
		} else {
			this.collapse();
		}
		if (this.editable && doFocus !== false) {
			this.el.focus();
		}
	}
});

/**
 * @class Jinpeng.widget.TextField
 * @extends Ext.form.TextField 带有提示信息的textfield tooltip{title:XXX,text:XXX}
 * @constructor 创建ToolTipTextField
 * @param {Object/String} [config] 配置信息
 */
Jinpeng.widget.ToolTipTextField = Ext.extend(Ext.form.TextField, {
	tooltip : {},
	onRender : function(ct, position) {
		Jinpeng.widget.ToolTipTextField.superclass.onRender.call(this, ct, position);
		if (this.tooltip.text)
			new Ext.ToolTip({
				target : this.id,
				trackMouse : false,
				draggable : true,
				maxWidth : 200,
				maxHeight : 300,
				minWidth : 100,
				title : this.tooltip.title || "信息提示",
				html : this.tooltip.text
			});
	}
});
Jinpeng.widget.ToolTipButton = Ext.extend(Ext.Button, {
	titletooltip : {},
	onRender : function(ct, position) {
		Jinpeng.widget.ToolTipButton.superclass.onRender.call(this, ct, position);
		if (this.titletooltip.text)
			new Ext.ToolTip({
				target : this.id,
				trackMouse : false,
				draggable : true,
				maxWidth : 200,
				minWidth : 100,
				title : this.titletooltip.title || "信息提示",
				html : this.titletooltip.text
			});
	}
});

Jinpeng.widget.NormalButton = Ext.extend(Ext.Button, {
	cls : 'normal-btn-button'
});

Jinpeng.widget.NormalTreeButton = Ext.extend(Ext.Button, {
	cls : 'normal-tree-btn-button'
});

Jinpeng.widget.PageButton = Ext.extend(Ext.Button, {
	cls : 'page-btn-button'
});


/**
 * 地点选择,只定位到卡口
 * @class Jinpeng.widget.PlaceSelector
 */
Jinpeng.widget.PlaceSelector2 = Ext.extend(Ext.form.TriggerField, {
	hideTrigger : true,
	editable : false,
	callBackFun : null,
	/**
	 * @cfg 弹出窗口的Title
	 * @type String
	 */
	winTitle : '选择通过地点',
	/**
	 * @cfg 是否之能选中通道，默认false
	 * @type Boolean
	 */
	onlyChannel : false,
	/**
	 * @cfg 是否下挂通道
	 * @type Boolean
	 */
	showChannel : true,
	/**
	 * 是否显示search label
	 * 
	 * @type Boolean
	 */
	showSearchLabel : true,
	
	/**
	 * 是否只显示组织,如果onlyOrg为true，在showChannel将会失效
	 */
	onlyOrg : false,

	/**
	 * @cfg search label
	 * @type String
	 */
	searchLabel : "通过地点",

	onTriggerClick : function() {
		var placeSelector = this;
		this.placeContentWindow = new Ext.Window({
			title : this.winTitle,
			closable : true,
			width : 600,
			height : 600,
			closeAction : "close",
			layout : 'column',
			padding : 10,
			modal : true,
			items : [ new Jinpeng.widget.MountAddressByChannelPanel({
				columnWidth:1,
				height:600,
				searchLabel : placeSelector.searchLabel,
				showSearchLabel : placeSelector.showSearchLabel,
				onlyOrg : placeSelector.onlyOrg,
				ref : "addressByChannelPanel",
				showChannel : placeSelector.showChannel,
				callBackFun : function(data) {

					if (placeSelector.onlyChannel && data.type != Jinpeng.ChannelTreePanel.nodeType.DEVICE)
						return false;

					if (placeSelector.callBackFun) {
						placeSelector.callBackFun(data);
					}
					placeSelector.placeContentWindow.close.defer(100, placeSelector.placeContentWindow);
					// 这里不能马上关闭，否则上面的树会被销毁 找不到
					placeSelector.setValue(data.name);
				}
			}) ]
		});
		this.placeContentWindow.show();
	}

});


/**
 * 地点选择
 * 
 * @class Jinpeng.widget.PlaceSelector
 */
Jinpeng.widget.PlaceSelector = Ext.extend(Ext.form.TriggerField, {
	hideTrigger : true,
	editable : false,
	callBackFun : null,
	/**
	 * @cfg 弹出窗口的Title
	 * @type String
	 */
	winTitle : '选择通过地点',
	/**
	 * @cfg 是否之能选中通道，默认false
	 * @type Boolean
	 */
	onlyChannel : false,
	/**
	 * @cfg 是否下挂通道
	 * @type Boolean
	 */
	showChannel : true,
	/**
	 * 是否显示search label
	 * 
	 * @type Boolean
	 */
	showSearchLabel : true,
	
	/**
	 * 是否只显示组织,如果onlyOrg为true，在showChannel将会失效
	 */
	onlyOrg : false,

	/**
	 * @cfg search label
	 * @type String
	 */
	searchLabel : "通过地点",

	onTriggerClick : function() {
		var placeSelector = this;
		this.placeContentWindow = new Ext.Window({
			title : this.winTitle,
			closable : true,
			width : 330,
			height : 335,
			closeAction : "close",
			layout : 'column',
			padding : 10,
			modal : true,
			items : [ new Jinpeng.widget.AddressByChannelPanel({
				columnWidth:1,
				height:268,
				searchLabel : placeSelector.searchLabel,
				showSearchLabel : placeSelector.showSearchLabel,
				onlyOrg : placeSelector.onlyOrg,
				ref : "addressByChannelPanel",
				showChannel : placeSelector.showChannel,
				callBackFun : function(data) {

					if (placeSelector.onlyChannel && data.type != Jinpeng.ChannelTreePanel.nodeType.DEVICE)
						return false;

					if (placeSelector.callBackFun) {
						placeSelector.callBackFun(data);
					}
					placeSelector.placeContentWindow.close.defer(100, placeSelector.placeContentWindow);
					// 这里不能马上关闭，否则上面的树会被销毁 找不到
					placeSelector.setValue(data.name);
				}
			}) ]
		});
		this.placeContentWindow.show();
	}

});


/**
 * 地点选择,只定位到卡口
 * @class Jinpeng.widget.PlaceSelector
 */
Jinpeng.widget.MountPlaceSelector = Ext.extend(Ext.form.TriggerField, {
	hideTrigger : true,
	editable : false,
	callBackFun : null,
	/**
	 * @cfg 弹出窗口的Title
	 * @type String
	 */
	winTitle : '选择通过地点',
	/**
	 * @cfg 是否之能选中通道，默认false
	 * @type Boolean
	 */
	onlyChannel : false,
	/**
	 * @cfg 是否下挂通道
	 * @type Boolean
	 */
	showChannel : true,
	/**
	 * 是否显示search label
	 * 
	 * @type Boolean
	 */
	showSearchLabel : true,
	
	/**
	 * 是否只显示组织,如果onlyOrg为true，在showChannel将会失效
	 */
	onlyOrg : false,

	/**
	 * @cfg search label
	 * @type String
	 */
	searchLabel : "通过地点",

	onTriggerClick : function() {
		var placeSelector = this;
		this.placeContentWindow = new Ext.Window({
			title : this.winTitle,
			closable : true,
			width : 600,
			height : 600,
			closeAction : "close",
			layout : 'column',
			padding : 10,
			modal : true,
			items : [ new Jinpeng.widget.MountAddressByChannelPanel({
				columnWidth:1,
				height:600,
				searchLabel : placeSelector.searchLabel,
				showSearchLabel : placeSelector.showSearchLabel,
				onlyOrg : placeSelector.onlyOrg,
				ref : "addressByChannelPanel",
				showChannel : placeSelector.showChannel,
				callBackFun : function(data) {

					if (placeSelector.onlyChannel && data.type != Jinpeng.ChannelTreePanel.nodeType.DEVICE)
						return false;

					if (placeSelector.callBackFun) {
						placeSelector.callBackFun(data);
					}
					placeSelector.placeContentWindow.close.defer(100, placeSelector.placeContentWindow);
					// 这里不能马上关闭，否则上面的树会被销毁 找不到
					placeSelector.setValue(data.name);
				}
			}) ]
		});
		this.placeContentWindow.show();
	}

});

/**
 * 归属地查询(即通道名称), 点击能道节点，以事件的方处理 使用: 1.加入content/js/widget.js文件 2.引入组件 xtyp:addressbychannelpanel 或者 new Jinpeng.widget.AddressByChannelPanel(); 3.增加监听事件获取返回值{id:XXX,name:XXX:type:XXX}：通过回调方法 callBackFun
 * 如果节点是通道（揭阳是设备）会有lane(车道号) 和 direct(方向) channelID(通道 id) 4.设置属性 showCheckbox，是否显示checkBox
 * 
 * @by xiaowan
 */
Jinpeng.widget.MountAddressByChannelPanel = Ext.extend(Ext.Panel, {
	border : false,
	/**
	 * 回调函数
	 * 
	 * @type
	 */
	callBackFun : null,
	showCheckbox : false,
	/**
	 * @cfg 是否下挂设备
	 * @type Boolean
	 */
	showChannel : false,
	/**
	 * @cfg 是否显示searchLabel
	 * @type Boolean
	 */
	showSearchLabel : true,
	/**
	 * 是否只显示组织,如果onlyOrg为true，在showChannel将会失效
	 */
	onlyOrg : false,

	/**
	 * @cfg Search Lable
	 * @type String
	 */
	searchLabel : '通过地点',

	initComponent : function() {
		if(this.onlyOrg){
			this.showChannel = false;
		}
		Ext.apply(this, {
			layout : 'fit',
			items : [ {
				ref : 'tree',
				xtype : 'channeltree',
				anchor : '100%',
				bodyStyle : 'background: #f5fdff;border: 1px solid #bdecf9;margin: 5px 0px;border-left: 0;border-right: 0;padding-top: 5px;',
				searchLabel : this.searchLabel,
				displayLabel : this.showSearchLabel,
				border : false,
				async : false,
				checked : this.showCheckbox || false,
				loadMask : {
					msg : '正在加载数据，请稍侯...'
				},
				root : {
					nodeType : 'async',
					id : 'root',
					loader : new Jinpeng.widget.JsonTreeLoader({
						url : rootpath + (this.onlyOrg?'/systemOrg/onlyOrgTreeMap.mvc':'/systemOrg/orgTreeMountMap.mvc'),
						extraUrl : null,
						extraParams : {
							textProperty : 'text'
						},
						extraFk : 'orgId',
						processResponseData : function(data) {
							if (data) {
								transformTreeNodeType(data);
							}
							return data;
						},
						processExtraData : function(data) {
							if (data) {
								transformTreeNodeType(data);
							}
							return data;
						}
					})
				}
			} ]
		});

		Jinpeng.widget.MountAddressByChannelPanel.superclass.initComponent.apply(this);
		this.tree.on('click', this.onTreeClick, this);
	},
	setAutoScroll : function(scroll) {
		if (this.rendered) {
			this.getContentTarget().setStyle("overflow-y", "auto").setStyle("overflow-x", "hidden");
		}
		this.autoScroll = scroll;
		return this;
	},
	onTreeClick : function(node) {
		var param = {
			"type" : node.attributes.type,
			"orgType" : node.attributes.orgType,
			"name" : node.text
		};
		if (node.attributes.type == Jinpeng.ChannelTreePanel.nodeType.DOMAIN || node.attributes.type == Jinpeng.ChannelTreePanel.nodeType.KAKOU
				|| node.attributes.type == Jinpeng.ChannelTreePanel.nodeType.DIRECTION) {// 99 88 77
			param['id'] = node.attributes.id;
			param['type'] = Jinpeng.ChannelTreePanel.nodeType.DOMAIN;// 这三种情况都是组织！
		} else {// 100 101
			// 如果不是组织，id需要截取，后再在封装时为防止id一样导致树无法打开，加了前缀 device_,channel_
			param['id'] = node.attributes.id.substring(node.attributes.id.indexOf("_") + 1);
			param['direct'] = node.attributes.direct;
			param['lane'] = node.attributes.lane;
			param['channelID'] = node.attributes.channelPKId;
		}
		if (this.callBackFun) {
			this.callBackFun(param);
		}
		this.publish('/widget/getAddressNameEvent', param);
	},
	onTreeNodeBeforeClick : function(node) {
		if (!node.attributes.leaf) {
			return false;
		}
	}
});

/**
 * 重写comboBox，实现下拉项可删功能。
 */
Jinpeng.widget.DeletableComboBox = Ext.extend(Ext.form.ComboBox, {
	initComponent : function() {
		Jinpeng.widget.DeletableComboBox.superclass.initComponent.call(this);

		this.emptyRecord = null;
		if (this.emptyText && this.emptyText.length > 0) {
			var obj = {};
			obj[this.displayField] = this.emptyText;
			obj[this.valueField] = '';
			this.emptyRecord = new Ext.data.Record(obj);
		}

		this.triggerConfig = {
			tag : 'span',
			cls : 'x-form-twin-triggers',
			style : 'padding-right : 0px', // padding needed to prevent IE from clipping 2nd trigger button
			cn : [ {
				tag : "img",
				src : Ext.BLANK_IMAGE_URL,
				cls : "x-form-trigger"
			}, {
				tag : "img",
				src : Ext.BLANK_IMAGE_URL,
				cls : "x-form-trigger x-form-clear-trigger"
			} ]
		};
	},

	initList : function() {
		if (!this.list) {
			var cls = 'x-combo-list', listParent = Ext.getDom(this.getListParent() || Ext.getBody());

			this.list = new Ext.Layer({
				parentEl : listParent,
				shadow : this.shadow,
				cls : [ cls, this.listClass ].join(' '),
				constrain : false,
				zindex : this.getZIndex(listParent)
			});

			var lw = this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);
			this.list.setSize(lw, 0);
			this.list.swallowEvent('mousewheel');
			this.assetHeight = 0;
			if (this.syncFont !== false) {
				this.list.setStyle('font-size', this.el.getStyle('font-size'));
			}
			if (this.title) {
				this.header = this.list.createChild({
					cls : cls + '-hd',
					html : this.title
				});
				this.assetHeight += this.header.getHeight();
			}

			this.innerList = this.list.createChild({
				cls : cls + '-inner'
			});
			this.mon(this.innerList, 'mouseover', this.onViewOver, this);
			this.mon(this.innerList, 'mousemove', this.onViewMove, this);
			this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));

			if (this.pageSize) {
				this.footer = this.list.createChild({
					cls : cls + '-ft'
				});
				this.pageTb = new Ext.PagingToolbar({
					store : this.store,
					pageSize : this.pageSize,
					renderTo : this.footer
				});
				this.assetHeight += this.footer.getHeight();
			}

			if (!this.tpl) {
				this.tpl = '<tpl for="."><div class="' + cls + '-item">{' + this.displayField + '} </div></tpl>';
			}

			this.view = new Ext.DataView({
				emptyRecord : this.emptyRecord || null,
				applyTo : this.innerList,
				tpl : this.tpl,
				singleSelect : true,
				selectedClass : this.selectedClass,
				itemSelector : this.itemSelector || '.' + cls + '-item',
				emptyText : this.listEmptyText,
				deferEmptyText : false,
				refresh : function() {
					this.clearSelections(false, true);
					var el = this.getTemplateTarget(), records = this.store.getRange();

					if (this.emptyRecord)
						records.unshift(this.emptyRecord);

					el.update('');
					if (records.length < 1) {
						if (!this.deferEmptyText || this.hasSkippedEmptyText) {
							el.update(this.emptyText);
						}
						this.all.clear();
					} else {
						this.tpl.overwrite(el, this.collectData(records, 0));
						this.all.fill(Ext.query(this.itemSelector, el.dom));
						this.updateIndexes(0);
					}
					this.hasSkippedEmptyText = true;
				}
			});

			this.mon(this.view, {
				containerclick : this.onViewClick,
				click : this.onViewClick,
				scope : this
			});

			this.bindStore(this.store, true);

			if (this.resizable) {
				this.resizer = new Ext.Resizable(this.list, {
					pinned : true,
					handles : 'se'
				});
				this.mon(this.resizer, 'resize', function(r, w, h) {
					this.maxHeight = h - this.handleHeight - this.list.getFrameWidth('tb') - this.assetHeight;
					this.listWidth = w;
					this.innerList.setWidth(w - this.list.getFrameWidth('lr'));
					this.restrictHeight();
				}, this);

				this[this.pageSize ? 'footer' : 'innerList'].setStyle('margin-bottom', this.handleHeight + 'px');
			}
		}
	},
	onViewClick : function(doFocus) {
		var index = this.view.getSelectedIndexes()[0];
		var s = this.store;

		var r = null;
		if (index == 0) {
			r = this.emptyRecord;
		} else {
			r = s.getAt(index - 1);
		}
		if (r) {
			this.onSelect(r, index - 1);
		} else {
			this.collapse();
		}
		if (this.editable && doFocus !== false) {
			this.el.focus();
		}
	},

	findRecord : function(prop, value) {
		var record = null;
		var r = this.emptyRecord;
		if (r && r.data[prop] === value) {
			record = r;
		} else if (this.store.getCount() > 0) {
			this.store.each(function(r) {
				if (r.data[prop] == value) {
					record = r;
					return false;
				}
			});
		}
		return record;
	},

	getTrigger : function(index) {
		return this.triggers[index];
	},

	initTrigger : function() {
		var ts = this.trigger.select('.x-form-trigger', true);
		this.wrap.setStyle('overflow', 'hidden');
		var triggerField = this;
		ts.each(function(t, all, index) {
			t.hide = function() {
				var w = triggerField.wrap.getWidth();
				this.dom.style.display = 'none';
				triggerField.el.setWidth(w - triggerField.trigger.getWidth());
			};
			t.show = function() {
				var w = triggerField.wrap.getWidth();
				this.dom.style.display = '';
				triggerField.el.setWidth(w - triggerField.trigger.getWidth());
			};
			var triggerIndex = 'Trigger' + (index + 1);

			if (this['hide' + triggerIndex]) {
				t.dom.style.display = 'none';
			}
			t.on("click", this['on' + triggerIndex + 'Click'], this, {
				preventDefault : true
			});
			t.addClassOnOver('x-form-trigger-over');
			t.addClassOnClick('x-form-trigger-click');
		}, this);
		this.triggers = ts.elements;
	},

	// pass to original combobox trigger handler
	onTrigger1Click : function() {
		this.onTriggerClick();
	},
	// clear contents of combobox
	onTrigger2Click : function() {

	}
});
/**
 * @class Jinpeng.widget.LovCombo
 * @extends Ext.form.ComboBox
 * @author Ing. Jozef Sakáloš
 * @copyright (c) 2008, by Ing. Jozef Sakáloš
 * @version 1.3
 * @date
 *          <ul>
 *          <li>16. April 2008</li>
 *          <li>2. February 2009</li>
 *          </ul>
 * 
 * @license Jinpeng.widget.LovCombo.js is licensed under the terms of the Open Source LGPL 3.0 license. Commercial use is permitted to the extent that the code/component(s) do NOT become part of another
 *          Open Source or Commercially licensed development library or toolkit without explicit permission.
 *          <p>
 *          License details: <a href="http://www.gnu.org/licenses/lgpl.html" target="_blank">http://www.gnu.org/licenses/lgpl.html</a>
 *          </p>
 */

if ('function' !== typeof RegExp.escape) {
	/**
	 * Escapes regular expression
	 * 
	 * @param {String} s
	 * @return {String} The escaped string
	 * @static
	 */
	RegExp.escape = function(s) {
		if ('string' !== typeof s) {
			return s;
		}
		return s.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g, '\\$1');
	};
}

/**
 * Creates new LovCombo
 * 
 * @constructor
 * @param {Object} config A config object
 */
Jinpeng.widget.LovCombo = Ext.extend(Ext.form.ComboBox, {
	hideOnSelect : false,
	// configuration options
	/**
	 * @cfg {String} checkField Name of field used to store checked state. It is automatically added to existing fields. (defaults to "checked" - change it only if it collides with your normal field)
	 */
	checkField : 'checked'

	/**
	 * @cfg {String} separator Separator to use between values and texts (defaults to "," (comma))
	 */
	,
	separator : ','

	/**
	 * @cfg {String/Array} tpl Template for items. Change it only if you know what you are doing.
	 */
	,
	constructor : function(config) {
		config = config || {};
		config.listeners = config.listeners || {};
		Ext.applyIf(config.listeners, {
			scope : this,
			beforequery : this.onBeforeQuery,
			blur : this.onRealBlur
		});
		Jinpeng.widget.LovCombo.superclass.constructor.call(this, config);
	},
	initComponent : function() {
		// template with checkbox
		if (!this.tpl) {
			this.tpl = '<tpl for=".">' + '<tpl if="this.group != values.' + this.groupField + '">' + '<tpl exec="this.group = values.' + this.groupField + '"></tpl>'
					+ '<hr><h1><span style="color:gray;">{' + this.groupField + '}</span></h1><hr>' + '</tpl>' + '<div class="x-combo-list-item" ext:qtip="{' + (this.tipField || 'orgName')
					+ ':htmlEncode}">' + '<img src="' + Ext.BLANK_IMAGE_URL + '" ' + 'class="ux-lovcombo-icon x-grid3-check-col' + '{[values.' + this.checkField + '?"-on":""' + ']}">'
					+ '<div class="ux-lovcombo-item-text">{' + (this.displayField || 'text') + ':htmlEncode} </div>' + '</div>' + '</tpl>';
		}

		// call parent
		Jinpeng.widget.LovCombo.superclass.initComponent.apply(this, arguments);
		// remove selection from input field
		this.buttons = this.buttons || [ {
			text : '全选',
			enableToggle : true,
			scope : this,
			width : 15,
			handler : function(b, e) {
				if (b.pressed) {
					b.setText("取消");
					this.selectAll();
				} else {
					b.setText("全选");
					this.deselectAll();
				}
			}
		}, ' ', {
			text : '确定',
			scope : this,
			width : 15,
			handler : function() {
				this.onRealBlur();
			}
		} ];
		this.onLoad = this.onLoad.createSequence(function() {

			if (this.el) {
				var v = this.el.dom.value;
				this.el.dom.value = '';
				this.el.dom.value = v;
			}
		});

	}
	/**
	 * Disables default tab key bahavior
	 * 
	 * @private
	 */
	,
	initEvents : function() {
		Jinpeng.widget.LovCombo.superclass.initEvents.apply(this, arguments);

		// disable default tab handling - does no good
		this.keyNav.tab = false;

	}
	/**
	 * Clears value
	 */
	,
	clearValue : function() {
		this.value = '';
		this.setRawValue(this.value);
		this.store.clearFilter();
		this.store.each(function(r) {
			r.set(this.checkField, false);
		}, this);
		if (this.hiddenField) {
			this.hiddenField.value = '';
		}
		this.applyEmptyText();
	}
	/**
	 * @return {String} separator (plus space) separated list of selected displayFields
	 * @private
	 */
	,
	getCheckedDisplay : function() {
		var re = new RegExp(this.separator, "g");
		return this.getCheckedValue(this.displayField).replace(re, this.separator + ' ');
	}
	/**
	 * @return {String} separator separated list of selected valueFields
	 * @private
	 */
	,
	getCheckedValue : function(field) {
		field = field || this.valueField;
		var c = [];

		// store may be filtered so get all records
		var snapshot = this.store.snapshot || this.store.data;

		snapshot.each(function(r) {
			if (r.get(this.checkField)) {
				c.push(r.get(field));
			}
		}, this);

		return c.join(this.separator);
	}
	/**
	 * beforequery event handler - handles multiple selections
	 * 
	 * @param {Object} qe query event
	 * @private
	 */
	,
	onBeforeQuery : function(qe) {
		qe.query = qe.query.replace(new RegExp(RegExp.escape(this.getCheckedDisplay()) + '[ ' + this.separator + ']*'), '');
	}
	/**
	 * blur event handler - runs only when real blur event is fired
	 * 
	 * @private
	 */
	,
	onRealBlur : function() {
		this.list.hide();
		var rv = this.getRawValue();
		var rva = rv.split(new RegExp(RegExp.escape(this.separator) + ' *'));
		var va = [];
		var snapshot = this.store.snapshot || this.store.data;

		// iterate through raw values and records and check/uncheck items
		Ext.each(rva, function(v) {
			snapshot.each(function(r) {
				if (v === r.get(this.displayField)) {
					va.push(r.get(this.valueField));
				}
			}, this);
		}, this);
		this.setValue(va.join(this.separator));
		this.store.clearFilter();
	}
	/**
	 * Combo's onSelect override
	 * 
	 * @private
	 * @param {Ext.data.Record} record record that has been selected in the list
	 * @param {Number} index index of selected (clicked) record
	 */
	,
	onSelect : function(record, index) {
		if (this.fireEvent('beforeselect', this, record, index) !== false) {

			// toggle checked field
			record.set(this.checkField, !record.get(this.checkField));

			// display full list
			if (this.store.isFiltered()) {
				this.doQuery(this.allQuery);
			}

			// set (update) value and fire event
			this.setValue(this.getCheckedValue());
			this.fireEvent('select', this, record, index);
		}
	}
	/**
	 * Sets the value of the LovCombo. The passed value can by a falsie (null, false, empty string), in which case the combo value is cleared or separator separated string of values, e.g. '3,5,6'.
	 * 
	 * @param {Mixed} v value
	 */
	,
	setValue : function(v) {
		if (v) {
			v = '' + v;
			if (this.valueField) {
				this.store.clearFilter();
				this.store.each(function(r) {
					var checked = !(!v.match('(^|' + this.separator + ')' + RegExp.escape(r.get(this.valueField)) + '(' + this.separator + '|$)'));

					r.set(this.checkField, checked);
				}, this);
				this.value = this.getCheckedValue();
				this.setRawValue(this.getCheckedDisplay());
				if (this.hiddenField) {
					this.hiddenField.value = this.value;
				}
			} else {
				this.value = v;
				this.setRawValue(v);
				if (this.hiddenField) {
					this.hiddenField.value = v;
				}
			}
			if (this.el) {
				this.el.removeClass(this.emptyClass);
			}
		} else {
			this.clearValue();
		}
	} // 
	/**
	 * Selects all items
	 */
	,
	selectAll : function() {
		this.store.each(function(record) {
			// toggle checked field
			record.set(this.checkField, true);
		}, this);

		// display full list
		this.doQuery(this.allQuery);
		this.setValue(this.getCheckedValue());
	}
	/**
	 * Deselects all items. Synonym for clearValue
	 */
	,
	deselectAll : function() {
		this.clearValue();
	},
	initList : function() {
		if (!this.list) {
			var cls = 'x-combo-list', listParent = Ext.getDom(this.getListParent() || Ext.getBody());

			this.list = new Ext.Layer({
				parentEl : listParent,
				shadow : this.shadow,
				cls : [ cls, this.listClass ].join(' '),
				constrain : false,
				zindex : this.getZIndex(listParent)
			});

			var lw = this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);
			this.list.setSize(lw, 0);
			this.list.swallowEvent('mousewheel');
			this.assetHeight = 0;
			if (this.syncFont !== false) {
				this.list.setStyle('font-size', this.el.getStyle('font-size'));
			}
			if (this.title) {
				this.header = this.list.createChild({
					cls : cls + '-hd',
					html : this.title
				});
				this.assetHeight += this.header.getHeight();
			}

			this.innerList = this.list.createChild({
				cls : cls + '-inner'
			});
			this.mon(this.innerList, 'mouseover', this.onViewOver, this);
			this.mon(this.innerList, 'mousemove', this.onViewMove, this);
			this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));

			if (this.pageSize) {
				this.footer = this.list.createChild({
					cls : cls + '-ft'
				});
				this.pageTb = new Ext.PagingToolbar({
					store : this.store,
					pageSize : this.pageSize,
					renderTo : this.footer
				});
				this.assetHeight += this.footer.getHeight();
			}
			if (this.buttons) {
				this.footer = this.list.createChild({
					cls : cls + '-ft'
				});
				this.btnBar = new Ext.Toolbar({
					id : "lovcombo-btn-bar",
					buttonAlign : "right",
					items : this.buttons,
					renderTo : this.footer
				});
				this.assetHeight += this.footer.getHeight();
			}

			if (!this.tpl) {
				this.tpl = '<tpl for="."><div class="' + cls + '-item">{' + this.displayField + '}</div></tpl>';
			}

			/**
			 * The {@link Ext.DataView DataView} used to display the ComboBox's options.
			 * 
			 * @type Ext.DataView
			 */
			this.view = new Ext.DataView({
				applyTo : this.innerList,
				tpl : this.tpl,
				singleSelect : true,
				selectedClass : this.selectedClass,
				itemSelector : this.itemSelector || '.' + cls + '-item',
				emptyText : this.listEmptyText,
				deferEmptyText : false
			});

			this.mon(this.view, {
				containerclick : this.onViewClick,
				click : this.onViewClick,
				scope : this
			});

			this.bindStore(this.store, true);

			if (this.resizable) {
				this.resizer = new Ext.Resizable(this.list, {
					pinned : true,
					handles : 'se'
				});
				this.mon(this.resizer, 'resize', function(r, w, h) {
					this.maxHeight = h - this.handleHeight - this.list.getFrameWidth('tb') - this.assetHeight;
					this.listWidth = w;
					this.innerList.setWidth(w - this.list.getFrameWidth('lr'));
					this.restrictHeight();
				}, this);

				this[this.pageSize || this.buttons ? 'footer' : 'innerList'].setStyle('margin-bottom', this.handleHeight + 'px');
			}
		}
	},
	expand : function() {
		if (this.isExpanded() || !this.hasFocus) {
			return;
		}

		if (this.title || this.pageSize || this.buttons) {
			this.assetHeight = 0;
			if (this.title) {
				this.assetHeight += this.header.getHeight();
			}
			if (this.pageSize || this.buttons) {
				this.assetHeight += this.footer.getHeight();
			}
		}

		if (this.bufferSize) {
			this.doResize(this.bufferSize);
			delete this.bufferSize;
		}
		this.list.alignTo.apply(this.list, [ this.el ].concat(this.listAlign));

		// zindex can change, re-check it and set it if necessary
		this.list.setZIndex(this.getZIndex());
		this.list.show();
		if (Ext.isGecko2) {
			this.innerList.setOverflow('auto'); // necessary for FF 2.0/Mac
		}
		this.mon(Ext.getDoc(), {
			scope : this,
			mousewheel : this.collapseIf,
			mousedown : this.collapseIf
		});
		this.fireEvent('expand', this);
	},
	beforeBlur : Ext.emptyFn,
	// private
	onDestroy : function() {
		if (this.dqTask) {
			this.dqTask.cancel();
			this.dqTask = null;
		}
		this.bindStore(null);
		Ext.destroy(this.resizer, this.view, this.pageTb, this.list, this.btnBar);
		Ext.destroyMembers(this, 'hiddenField');
		Ext.form.ComboBox.superclass.onDestroy.call(this);
	},
	onViewClick : function(doFocus) {
		if (this.groupField && arguments.length == 2) {
			return;
		}
		var index = this.view.getSelectedIndexes()[0], s = this.store, r = s.getAt(index);
		if (r) {
			this.onSelect(r, index);
		} else {
			this.collapse();
		}
		if (doFocus !== false) {
			this.el.focus();
		}
	}
});

// /////////////////////////////////////////////////////////////////////////////////
/**
 * 图片放大组件
 */
var qsoft = {
	version : 0.35,
	isIE : document.all ? true : false,
	prefx : 'qsoft',
	__id : 0,
	nextId : function() {
		return this.prefx + this.__id++;
	}
};

qsoft.PopBigImage = function(origImage, dx, dy, mx, my, localFileSize) {

	// var type = typeof (origImage);
	// if (type.toLowerCase() == "string")
	// this.oim = document.getElementById(origImage);
	// else{
	this._document = origImage.ownerDocument;
	this.oim = origImage;
	// }

	if (typeof (this.oim.pbi) != "undefined")
		return this.oim.pbi;

	this.id = qsoft.nextId();
	this.oim.__maskid = this.id;
	this.oim.style.cursor = "crosshair";

	this.ow = this.oim.width;
	this.oh = this.oim.height;

	this.detaX = (typeof (dx) == "undefined") ? 30 : dx;
	this.detaY = (typeof (dy) == "undefined") ? 0 : dy;

	var getPos = function(o) // for chrome
	{
		var x = 0, y = 0;
		do {
			x += o.offsetLeft;
			y += o.offsetTop;
		} while ((o = o.offsetParent));
		return {
			left : x,
			top : y
		};
	};

	this.getPosition = function(o) {
		return this._document.documentElement.getBoundingClientRect && o.getBoundingClientRect() || getPos(o);
	};

	this.getMaskPostion = function() {
		var rect = this.getPosition(this.oim);
		this.ol = rect.left + this.detaX + this.ow - (qsoft.isIE ? 2 : 0);
		this.ot = rect.top + this.detaY - (qsoft.isIE ? 2 : 0);
	};
	this.getMaskPostion();

	this.src = this.oim.src;

	this.getImageSize = function(img) {
		var _this = this;
		// 如果加载本地文件
		if (localFileSize) {
			_this.w = localFileSize.width;
			_this.h = localFileSize.height;
		} else {
			var im = new Image();
			im.onreadystatechange = function() {
				_this.w = im.width;
				_this.h = im.height;
				im = null;
				delete im;
			};
			im.src = img.src;
		}
	};

	this.getImageSize(this.oim);
	this.maskX = (typeof (mx) == "undefined") ? this.ow : mx;
	this.maskY = (typeof (my) == "undefined") ? this.oh : my;
	if (this.maskX < 1)
		this.maskX = Math.ceil(this.w * this.maskX);
	else if (this.maskX < 10)
		this.maskX = Math.ceil(this.ow * this.maskX);
	if (this.maskY < 1)
		this.maskY = Math.ceil(this.h * this.maskY);
	else if (this.maskY < 10)
		this.maskY = Math.ceil(this.oh * this.maskY);
	this.maskX = this.maskX < this.ow ? this.ow : this.maskX;
	this.maskY = this.maskY < this.oh ? this.oh : this.maskY;
	this.maskX = this.maskX > this.w ? this.w : this.maskX;
	this.maskY = this.maskY > this.h ? this.h : this.maskY;

	var qObj = this;
	this.createMask = function() {
		if (typeof this.mask == "undefined") {
			this.mask = this._document.getElementById("qsoft.PopBigImgage_mask");
			this.layer = this._document.getElementById("qsoft.PopBigImgage_layer");
			if (!this.mask) {
				this.mask = this._document.createElement("div");
				this.mask.id = "qsoft.PopBigImgage_mask";

				this.layer = this._document.createElement("iframe");
				this.layer.id = "qsoft.PopBigImgage_layer";

				this._document.body.appendChild(this.mask);
				this._document.body.appendChild(this.layer);
			}

			// this.mask.id = this.oim.__maskid + "_mask";

			this.mask.style.backgroundImage = "url(" + this.src + ")";
			this.mask.style.backgroundRepeat = "no-repeat";
			this.mask.style.zIndex = 99999;
			this.setSharedAttributes(this.mask);

			this.layer.style.zIndex = 99990;
			this.layer.src = "about:blank";
			this.setSharedAttributes(this.layer);
		}
	};
	//Departed 
	this.createDoubleMask = function() {
		if (typeof this.mask == "undefined") {
			this.mask = this._document.getElementById("qsoft.PopBigImgage_mask");
			this.layer = this._document.getElementById("qsoft.PopBigImgage_layer");
			/* 因套牌车需要放大两图片，故将下面的判断去掉 */
			// if(!this.mask){
			this.mask = this._document.createElement("div");
			this.mask.id = "qsoft.PopBigImgage_mask";

			this.layer = this._document.createElement("iframe");
			this.layer.id = "qsoft.PopBigImgage_layer";

			this._document.body.appendChild(this.mask);
			this._document.body.appendChild(this.layer);
			// }

			this.mask.style.backgroundImage = "url(" + this.src + ")";
			this.mask.style.backgroundRepeat = "no-repeat";
			this.mask.style.zIndex = 99999;
			this.setSharedAttributes(this.mask);

			this.layer.style.zIndex = 99990;
			this.layer.src = "about:blank";
			this.setSharedAttributes(this.layer);
		}
	};
	
	this.createMaskByIndex = function(index) {
		if (typeof this.mask == "undefined") {
			this.mask = this._document.getElementById("qsoft.PopBigImgage_mask"+index);
			this.layer = this._document.getElementById("qsoft.PopBigImgage_layer"+index);
			if (!this.mask) {
				this.mask = this._document.createElement("div");
				this.mask.id = "qsoft.PopBigImgage_mask"+index;

				this.layer = this._document.createElement("iframe");
				this.layer.id = "qsoft.PopBigImgage_layer"+index;

				this._document.body.appendChild(this.mask);
				this._document.body.appendChild(this.layer);
			}

			// this.mask.id = this.oim.__maskid + "_mask";
			this.mask.style.backgroundImage = "url(" + this.src + ")";
			this.mask.style.backgroundRepeat = "no-repeat";
			this.mask.style.zIndex = 99999;
			this.setSharedAttributes(this.mask);

			this.layer.style.zIndex = 99990;
			this.layer.src = "about:blank";
			this.setSharedAttributes(this.layer);
		}
	};

	this.regEvent = function() {
		this.oim.onmousemove = function() {
			qObj.resetMaskPosition();
			var e = arguments[0] || qObj._document.parentWindow.event;
			var ct = e.target || e.srcElement;
			var sz = qObj.getPosition(ct);
			var ox = qsoft.isIE ? e.offsetX : (e.pageX - sz.left);
			var oy = qsoft.isIE ? e.offsetY : (e.pageY - sz.top);
			var x = Math.ceil(ox * qObj.w / qObj.ow) - qObj.maskX / 2;
			var y = Math.ceil(oy * qObj.h / qObj.oh) - qObj.maskY / 2;

			if (x < 0)
				x = 0;
			if (y < 0)
				y = 0;
			var maxx = Math.ceil((qObj.w - qObj.maskX));
			var maxy = Math.ceil((qObj.h - qObj.maskY));
			if (x > maxx)
				x = maxx;
			if (y > maxy)
				y = maxy;
			qObj.mask.style.backgroundPosition = -x + "px " + -y + "px";
		};

		this.oim.onmouseout = function() {
			qObj.mask.style.display = "none";
			qObj.layer ? qObj.layer.style.display = "none" : null;
		};

		this.oim.onmouseover = function() {
			qObj.mask.style.display = "block";
			qObj.layer ? qObj.layer.style.display = "block" : null;
		};

	};

	// 同一个页面需要放大多张图片方法
	//Departed 
	this.amplifyDouble = function() {
		this.createDoubleMask();
		this.regEvent();
		this.refresh();
	};

	// 一个页面仅需放大一张图片方法
	this.render = function() {
		this.createMask();
		this.regEvent();
		this.refresh();
	};

	this.renderByIndex = function(index) {
		this.createMaskByIndex(index);
		this.regEvent();
		this.refresh();
	};
	this.setSharedAttributes = function(obj) {
		obj.style.position = "absolute";
		obj.style.width = this.maskX + "px";
		obj.style.height = this.maskY + "px";
		obj.style.left = this.ol + "px";
		obj.style.top = this.ot + "px";
		obj.style.display = "none";
	};
	this.resetMaskPosition = function() {
		this.getMaskPostion();
		this.mask.style.left = qObj.ol + "px";
		this.mask.style.top = qObj.ot + "px";
		if (this.layer) {
			this.layer.style.left = qObj.ol + "px";
			this.layer.style.top = qObj.ot + "px";
		}

	};
	this.refresh = function() {
		this.mask.style.backgroundImage = "url(" + this.oim.src + ")";
	};
};

qsoft.PopBigImage.create = function(origImage, dx, dy, mx, my, bflag) {
	var q = new qsoft.PopBigImage(origImage, dx, dy, mx, my);
	q.render();
	if (bflag)
		q.mask.style.display = "block";
	return q;
};

//卡口管理画廊显示效果
Jinpeng.widget.PictureShowBox = Ext.extend(Ext.Panel, {
	width : 420,
	height : 465,
	initComponent : function() {
		Ext.apply(this, {
			layout : 'form',
			items : [ {
				xtype : 'fieldset',
				width : this.width,
				height : this.height,
				layout : 'fit',
				title : '图片',
				items : [
				{
					xtype : 'box',
					inputType : "image",
					align : 'center',
					id : 'imgBox',
					autoEl : {
						tag : 'img'
					}
				}]
			}]
		});
		Jinpeng.widget.PictureShowBox.superclass.initComponent.apply(this);
		//监听消息
		this.subscribe('loadPictures', this.refreshData, this);
	},
	// 取消监听,避免再次publish时,之前的subcribe仍然有效。
	destroy : function() {
		this.unsubscribe('loadPictures', this.refreshData, this);
		Jinpeng.widget.PictureShowBox.superclass.destroy.apply(this);
	},
	// 渲染图片，和放大图片
	refreshData : function(event, eventName) {
		var record = event;
		var url = Util.processEmptyImgUrl(record.CARIMGURL);
		Ext.getCmp('imgBox').getEl().dom.src = url;
		// 为大图片添加放大功能
		var imgDom = Ext.getCmp('imgBox').getEl().dom;
		(new qsoft.PopBigImage(imgDom, 10, 0, 450, 380)).render();
	}
});

Jinpeng.widget.OnlyShowBox = Ext.extend(Ext.Panel, {
	width : 420,
	height : 465,
	initComponent : function() {
		Ext.apply(this, {
			layout : 'form',
			items : [ {
				xtype : 'box',
				width : this.width,
				height : this.height,
				layout : 'fit',
				inputType : "image",
				align : 'center',
				id : 'imgBox',
				autoEl : {
					tag : 'img'
				}
			}]
		});
		Jinpeng.widget.OnlyShowBox.superclass.initComponent.apply(this);
		//监听消息
		this.subscribe('loadPictures', this.refreshData, this);
	},
	// 取消监听,避免再次publish时,之前的subcribe仍然有效。
	destroy : function() {
		this.unsubscribe('loadPictures', this.refreshData, this);
		Jinpeng.widget.OnlyShowBox.superclass.destroy.apply(this);
	},
	// 渲染图片，和放大图片
	refreshData : function(event, eventName) {
		var record = event;
		var url = Util.processEmptyImgUrl(record.CARIMGURL);
		Ext.getCmp('imgBox').getEl().dom.src = url;
		// 为大图片添加放大功能
		var imgDom = Ext.getCmp('imgBox').getEl().dom;
		(new qsoft.PopBigImage(imgDom, 20, 0, 450, 380)).render();
	}
});

Jinpeng.widget.UploadWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	/**
	 * 允许上传的文件类型
	 */
	allowFileType : [ ".xls" ],
	/**
	 * 上传地址
	 */
	uploadURL : null,
	/**
	 * 上传成功后回调
	 */
	callbackFn : Ext.emptyFn,
	/**
	 * 上传文件对应后台的字段名
	 */
	fileName : 'file',
	/**
	 * 模板下载URL
	 */
	templateURL : null,

	initComponent : function() {
		var _this = this;
		Ext.apply(this, {
			title : this.title || '请选择上传文件',
			layout : 'border',
			width : 350,
			cls : 'blue-button-ct',
			height : 100,
			modal : true,
			items : {
				ref : 'uploadFileForm',
				xtype : 'form',
				region : 'center',
				fileUpload : true,
				border : false,
				labelWidth : 65,
				labelAlign : 'right',
				padding : 5,
				items : [ {
					fieldLabel : '上传文件',
					xtype : 'fileuploadfield',
					name : this.fileName,
					anchor : '-30',
					emptyText : this.emptyText || '请选择要上传的文件',
					validate : function() {
						var vFlag = false;
						var filePath = this.getValue();
						if (null != filePath && "" != filePath) {
							var surfix = filePath.substring(filePath.lastIndexOf("."));
							if (_this.allowFileType.indexOf(surfix.toLowerCase()) != -1) {
								vFlag = true;
							}
						}
						vFlag ? this.clearInvalid() : this.markInvalid();
						return vFlag;
					},
					invalidText : '文件类型不正确，允许类型(' + _this.allowFileType.join("|") + ')',
					buttonText : '选择文件'
				} ]
			},
			buttons : [ {
				xtype : 'button',
				text : '确定',
				handler : function(btn, event) {
					var window = btn.ownerCt.ownerCt;
					var form = window.uploadFileForm.getForm();
					// debugger
					if (form.isValid()) {
						//btn.setDisabled(true);
						form.submit({
							url : _this.uploadURL,
							success : function() {
								alert("=======================");
								//btn.setDisabled(false);
								/*var result = action.result.data;
								var msg = result.msg || result;
								var win = new Jinpeng.widget.MessageWindow();
								win.msg = msg;
								win.show();
								window.close();
								// 回调
								_this.callbackFn(action.result.data);*/
							},
							failure : function() {
								alert("----------------");
								//btn.setDisabled(false);
							}
						});
					}
				}
			}, {
				xtype : 'button',
				text : '取消',
				handler : function(btn, even) {
					btn.ownerCt.ownerCt.close();
				}
			} ]
		});
		Jinpeng.widget.UploadWindow.superclass.initComponent.apply(this, arguments);
	},
	afterRender : function() {
		Jinpeng.widget.UploadWindow.superclass.afterRender.apply(this, arguments);
		if (this.templateURL) {
			this.getFooterToolbar().add("<span class='tpl_download'><a href='" + this.templateURL + "'>模板下载</a>");
		}
	}

});

/**
 * Grid支持翻页勾选
 */
Jinpeng.widget.CrosspageCheckboxSelectionMode = Ext.extend(Ext.grid.CheckboxSelectionModel, {
	header : '<div class="x-grid3-hd-checker" title="' + Jinpeng.Message.CHECK_ALL_TITLE + '">&#160;</div>',
	constructor : function() {
		Jinpeng.widget.CrosspageCheckboxSelectionMode.superclass.constructor.apply(this, arguments);
		this.subscribe('clearGridSelections', this.clearSelectionsProxy, this);
	},
	clearSelectionsProxy : function() {
		this.clearSelections(true);
	},
	onRefresh : function() {
		var ds = this.grid.store, s = this.getSelections(), i = 0, len = s.length, index, r;
		this.silent = true;
		// this.clearSelections(true);
		for (; i < len; i++) {
			r = s[i];
			if ((index = ds.indexOfId(r.id)) != -1) {
				this.selectRow(index, true);
			}
		}
		if (s.length != this.selections.getCount()) {
			this.fireEvent('selectionchange', this);
		}
		this.silent = false;
	},
	onHdMouseDown : function(e, t) {
		if (t.className == 'x-grid3-hd-checker') {
			e.stopEvent();
			var hd = Ext.fly(t.parentNode);
			var isChecked = hd.hasClass('x-grid3-hd-checker-on');
			if (isChecked) {
				hd.removeClass('x-grid3-hd-checker-on');
				// this.clearSelections();
				this.clearCurrentPageSelections();
			} else {
				hd.addClass('x-grid3-hd-checker-on');
				this.selectAll();
			}
		}
	},
	onMouseDown : function(e, t) {
		if (e.button === 0 && t.className == 'x-grid3-row-checker') { // Only fire if left-click
			e.stopEvent();
			var row = e.getTarget('.x-grid3-row');
			if (row) {
				var index = row.rowIndex;
				if (this.isSelected(index)) {
					this.deselectRow(index);
				} else {
					this.selectRow(index, true);
					this.grid.getView().focusRow(index);
				}
			}
		}
	},
	selectRow : function(index, keepExisting, preventViewNotify) {
		if (this.isLocked() || (index < 0 || index >= this.grid.store.getCount())) {
			return;
		}
		var r = this.grid.store.getAt(index);
		if (r && this.fireEvent('beforerowselect', this, index, keepExisting, r) !== false) {
			if (/* !keepExisting || */this.singleSelect) {
				this.clearSelections();
			}
			this.selections.add(r);
			this.last = this.lastActive = index;
			if (!preventViewNotify) {
				this.grid.getView().onRowSelect(index);
			}
			if (!this.silent) {
				this.fireEvent('rowselect', this, index, r);
				this.fireEvent('selectionchange', this);
			}
		}
	},
	selectAll : function() {
		if (this.isLocked()) {
			return;
		}
		// this.selections.clear();
		for ( var i = 0, len = this.grid.store.getCount(); i < len; i++) {
			this.selectRow(i, true);
		}
	},
	clearCurrentPageSelections : function() {
		var ds = this.grid.store;
		for ( var i = 0; i < ds.getTotalCount(); i++) {
			if (this.isSelected(i)) {
				this.deselectRow(i);
			}
		}
	}
	/*// private
	handleMouseDown : function(g, rowIndex, e) {
		if (e.button !== 0 || this.isLocked()) {
			return;
		}
		var view = this.grid.getView();
		if (e.shiftKey && !this.singleSelect && this.last !== false) {
			var last = this.last;
			this.selectRange(last, rowIndex, e.ctrlKey);
			this.last = last; // reset the last
			view.focusRow(rowIndex);
		} else {
			var isSelected = this.isSelected(rowIndex);
			if (e.ctrlKey && isSelected) {
				this.deselectRow(rowIndex);
			} else if (!isSelected || this.getCount() > 1) {
				// this.selectRow(rowIndex, e.ctrlKey || e.shiftKey);
				view.focusRow(rowIndex);
			}
		}
	}*/
});
Jinpeng.widget.SurveyTypeComb = Ext.extend(Jinpeng.widget.TComboBox, {
	/*
	 * 7 跟踪观察6 盘查车辆8 高危车辆2 超速车辆4 前后车牌不一致9 报废车辆11 未年检12 无牌10 临时布控5 盗抢车辆3 肇事车辆1 嫌疑车辆
	 */
	LEVEL_TYPE_MAPING : {
		LEVEL1 : [ 1, 3, 5, 10 ],// 拦截类
		LEVEL2 : [ 2, 4, 9, 11, 12 ],// 交通违法类
		LEVEL3 : [ 6, 7, 8 ]
	// 关注类
	},
	expand : function() {
		Jinpeng.widget.SurveyTypeComb.superclass.expand.apply(this, arguments);
		var level = this.getSurveyLevel();
		this.filterSurveyTypeByLevel(level);
	},
	filterSurveyTypeByLevel : function(level) {
		var filterFun = function(r, id) {
			if (level == "" || level == 'undefined' || this.LEVEL_TYPE_MAPING['LEVEL' + level].indexOf(parseInt(r.get("id"))) > -1)
				return true;
			return false;
		};
		this.store.filterBy(filterFun, this);
	},
	getSurveyLevel : function() {
		return '';
	}
});

Jinpeng.widget.PlateAttributionComb = Ext.extend(Ext.form.ComboBox, {

	initComponent : function() {
		this.pinyin = new Pinyin();
		
		var store = new Ext.data.JsonStore({
			fields : [ 'province', 'attributionValue', 'attributionName' ],
			url : rootpath + '/client/system/jsonDictsForPlateAttribution.action',
			root : 'data'
		});
		store.load();
		var tpl = '<tpl for=".">' + '<tpl if="this.group != values.province">' + '<tpl exec="this.group = values.province"></tpl>' + '<br><h1><span style="color:gray;">{province}</span></h1><br>'
				+ '</tpl>' + '<div class="x-combo-list-item" ext:qtip="{attributionName:htmlEncode}">'
				+ '<div class="ux-lovcombo-item-text">{attributionValue:htmlEncode} : {attributionName:htmlEncode} </div>' + '</div>' + '</tpl>';

		Ext.apply(this, {
			store : store,
			tpl : tpl,
			mode : 'local',
			triggerAction : 'all',
			valueField : 'attributionValue',
			displayField : 'attributionValue',
			value : '粤V',
			editable : true
		});
		Jinpeng.widget.PlateAttributionComb.superclass.initComponent.call(this);
	},
	 doQuery : function(q, forceAll){
	        q = Ext.isEmpty(q) ? '' : q;
	        var qe = {
	            query: q,
	            forceAll: forceAll,
	            combo: this,
	            cancel:false
	        };
	        if(this.fireEvent('beforequery', qe)===false || qe.cancel){
	            return false;
	        }
	        q = qe.query;
	        forceAll = qe.forceAll;
	        if(forceAll === true || (q.length >= this.minChars)){
	            if(this.lastQuery !== q){
	                this.lastQuery = q;
	                if(this.mode == 'local'){
	                    this.selectedIndex = -1;
	                    if(forceAll){
	                        this.store.clearFilter();
	                    }else{
//	                        this.store.filter(this.displayField, q);
	                    	this.store.filterBy( function(r,id){
//	                    		console.log(this.displayField+"   "+r.get(this.displayField));
	                    		q = this.pinyin.getFullChars(q).toLowerCase();
	                    		o = this.pinyin.getFullChars(r.get(this.displayField)).toLowerCase();
	                    		if(o.indexOf(q)==0){
	                    			return true;
	                    		}
	                    		return false;
	                    	},this);
//	                    	alert(this.pinyin.getFullChars(q));
	                    }
	                    this.onLoad();
	                }else{
	                    this.store.baseParams[this.queryParam] = q;
	                    this.store.load({
	                        params: this.getParams(q)
	                    });
	                    this.expand();
	                }
	            }else{
	                this.selectedIndex = -1;
	                this.onLoad();
	            }
	        }
	    }
});
/**
 * 带提示的标签组件
 */
Jinpeng.widget.tipLabel=Ext.extend(Ext.form.Label, {
	 tooltip:{},
    onRender : function(ct, position){
        if(!this.el){
            this.el = document.createElement('label');
            this.el.id = this.getId();
            this.el.innerHTML = this.text ? Ext.util.Format.htmlEncode(this.text) : (this.html || '');
            if(this.forId){
                this.el.setAttribute('for', this.forId);
            }
        }
        Ext.form.Label.superclass.onRender.call(this, ct, position);
        if(this.tooltip.text)      
            new Ext.ToolTip({   
                target:this.id,   
                trackMouse:false,   
                draggable:true, 
                anchor:this.tooltip.anchor,
                maxWidth:1000,   
                minWidth:100,   
                title:this.tooltip.title,   
                html:this.tooltip.text   
            });     
    }
});

/**
 * 多选下拉框主键
 */
Jinpeng.widget.MultiSelect = Ext.extend(Ext.form.ComboBox, {
    checkField: 'checked',
    multi: true,
    separator: ',',
    initComponent: function () {
        if (!this.tpl) {
            this.tpl = '<tpl for=".">' + '<div class="x-combo-list-item">'
                    + '<img src="' + Ext.BLANK_IMAGE_URL + '" '
                    + 'class="ux-MultiSelect-icon ux-MultiSelect-icon-'
                    + '{[values.' + this.checkField + '?"checked":"unchecked"'
                    + ']}">'
                    + '{[values.' + this.displayField + ']}'
                    + '</div>'
                    + '</tpl>';
        }

        Jinpeng.widget.MultiSelect.superclass.initComponent.apply(this, arguments);

        this.on({
            scope: this,
            beforequery: this.onBeforeQuery,
            blur: this.onRealBlur
        });

        this.onLoad = this.onLoad.createSequence(function () {
            if (this.el) {
                var v = this.el.dom.value;
                this.el.dom.value = '';
                this.el.dom.value = v;
            }
        });
    },
    initEvents: function () {
    	Jinpeng.widget.MultiSelect.superclass.initEvents.apply(this, arguments);
        this.keyNav.tab = false;
    },
    beforeBlur: function () {

    },
    postBlur: function () {

    },

    clearValue: function () {
        this.value = '';
        this.setRawValue(this.value);
        this.store.clearFilter();
        this.store.each(function (r) {
            r.set(this.checkField, false);
        }, this);
        if (this.hiddenField) {
            this.hiddenField.value = '';
        }
        this.applyEmptyText();
    },
    getCheckedDisplay: function () {
        var re = new RegExp(this.separator, "g");
        return this.getCheckedValue(this.displayField).replace(re, this.separator + ' ');
    },
    getCheckedValue: function (field) {
        field = field || this.valueField;
        var c = [];

        var snapshot = this.store.snapshot || this.store.data;
        snapshot.each(function (r) {
            if (r.get(this.checkField)) {
                c.push(r.get(field));
            }
        }, this);

        return c.join(this.separator);
    },
    onBeforeQuery: function (qe) {
        qe.query = qe.query.replace(
              new RegExp(RegExp.escape(this.getCheckedDisplay()) + '[ ' + this.separator + ']*'), '');
    },
    onRealBlur: function () {
        this.list.hide();
        var rv = this.getRawValue();
        var rva = rv.split(new RegExp(RegExp.escape(this.separator) + ' *'));
        var va = [];
        var snapshot = this.store.snapshot || this.store.data;

        Ext.each(rva, function (v) {
            snapshot.each(function (r) {
                if (v === r.get(this.displayField)) {
                    va.push(r.get(this.valueField));
                }
            }, this);
        }, this);
        this.setValue(va.join(this.separator));
        //this.store.clearFilter();
    },
    onSelect: function (record, index) {
        if (this.fireEvent('beforeselect', this, record, index) !== false) {

            record.set(this.checkField, !record.get(this.checkField));

            if (this.store.isFiltered()) {
                this.doQuery(this.allQuery);
            }

            if (this.multi) {
                if (record.get("key") == "---" && record.get(this.checkField)) {
                    this.setValue("---");
                }
                else {
                    this.setValue(this.getCheckedValue());
                }
            }
            else {
                this.clearValue();
                this.value = record.get(this.valueField);
                this.setRawValue(record.get(this.displayField));
                this.list.hide();
            }

            this.fireEvent('select', this, record, index);
        }
    },
    setValue: function (v) {
        if (v) {
            v = '' + v;
            if (this.valueField) {
                this.store.clearFilter();
                this.store.each(function (r) {
                    var checked = !(!v.match('(^|' + this.separator + ')'
                                + RegExp.escape(r.get(this.valueField))
                                + '(' + this.separator + '|$)'));
                    r.set(this.checkField, checked);
                }, this);
                this.value = this.getCheckedValue();
                this.setRawValue(this.getCheckedDisplay());
                if (this.hiddenField) {
                    this.hiddenField.value = this.value;
                }
            }
            else {
                this.value = v;
                this.setRawValue(v);
                if (this.hiddenField) {
                    this.hiddenField.value = v;
                }
            }
            if (this.el) {
                this.el.removeClass(this.emptyClass);
            }
        }
        else {
            this.clearValue();
        }
    },
    selectAll: function () {
        this.store.each(function (record) {
            record.set(this.checkField, true);
        }, this);
        this.doQuery(this.allQuery);
        this.setValue(this.getCheckedValue());
    },
    deselectAll: function () {
        this.clearValue();
    }
});

/**
 * 多选下拉框主键
 */
Jinpeng.widget.TipComboBox = Ext.extend(Ext.form.ComboBox, {
    checkField: 'checked',
    multi: true,
    separator: ',',
    initComponent: function () {
        if (!this.tpl) {
            this.tpl = '<tpl for=".">' + '<div class="x-combo-list-item">'
                    + '<img src="' + Ext.BLANK_IMAGE_URL + '" '
                    + 'class="ux-MultiSelect-icon ux-MultiSelect-icon-'
                    + '{[values.' + this.checkField + '?"checked":"unchecked"'
                    + ']}">'
                    + '{[values.' + this.displayField + ']}'
                    + '</div>'
                    + '</tpl>';
        }

        Jinpeng.widget.TipComboBox.superclass.initComponent.apply(this, arguments);

        this.on({
            scope: this,
            beforequery: this.onBeforeQuery,
            blur: this.onRealBlur
        });

        this.onLoad = this.onLoad.createSequence(function () {
            if (this.el) {
                var v = this.el.dom.value;
                this.el.dom.value = '';
                this.el.dom.value = v;
            }
        });
    },
    initEvents: function () {
    	Jinpeng.widget.TipComboBox.superclass.initEvents.apply(this, arguments);
        this.keyNav.tab = false;
    },
    beforeBlur: function () {

    },
    postBlur: function () {

    },

    clearValue: function () {
        this.value = '';
        this.setRawValue(this.value);
        this.store.clearFilter();
        this.store.each(function (r) {
            r.set(this.checkField, false);
        }, this);
        if (this.hiddenField) {
            this.hiddenField.value = '';
        }
        this.applyEmptyText();
    },
    getCheckedDisplay: function () {
        var re = new RegExp(this.separator, "g");
        return this.getCheckedValue(this.displayField).replace(re, this.separator + ' ');
    },
    getCheckedValue: function (field) {
        field = field || this.valueField;
        var c = [];

        var snapshot = this.store.snapshot || this.store.data;
        snapshot.each(function (r) {
            if (r.get(this.checkField)) {
                c.push(r.get(field));
            }
        }, this);

        return c.join(this.separator) + ",";
    },
    onBeforeQuery: function (qe) {
        qe.query = qe.query.replace(
              new RegExp(RegExp.escape(this.getCheckedDisplay()) + '[ ' + this.separator + ']*'), '');
    },
    onRealBlur: function () {
        this.list.hide();
        var rv = this.getRawValue();
        var rva = rv.split(new RegExp(RegExp.escape(this.separator) + ' *'));
        var va = [];
        var snapshot = this.store.snapshot || this.store.data;

        Ext.each(rva, function (v) {
            snapshot.each(function (r) {
                if (v === r.get(this.displayField)) {
                    va.push(r.get(this.valueField));
                }
            }, this);
        }, this);
        this.setValue(va.join(this.separator));
        this.store.clearFilter();
    },
    onSelect: function (record, index) {
        if (this.fireEvent('beforeselect', this, record, index) !== false) {

            record.set(this.checkField, !record.get(this.checkField));

            if (this.store.isFiltered()) {
                this.doQuery(this.allQuery);
            }

            if (this.multi) {
                if (record.get("key") == "---" && record.get(this.checkField)) {
                    this.setValue("---");
                }
                else {
                    this.setValue(this.getCheckedValue());
                }
            }
            else {
                this.clearValue();
                this.value = record.get(this.valueField);
                this.setRawValue(record.get(this.displayField));
                this.list.hide();
            }

            this.fireEvent('select', this, record, index);
        }
    },
    setValue: function (v) {
        if (v) {
            v = '' + v;
            if (this.valueField) {
                this.store.clearFilter();
                this.store.each(function (r) {
                    var checked = !(!v.match('(^|' + this.separator + ')'
                                + RegExp.escape(r.get(this.valueField))
                                + '(' + this.separator + '|$)'));
                    r.set(this.checkField, checked);
                }, this);
                this.value = this.getCheckedValue();
                this.setRawValue(this.getCheckedDisplay());
                if (this.hiddenField) {
                    this.hiddenField.value = this.value;
                }
            }
            else {
                this.value = v;
                this.setRawValue(v);
                if (this.hiddenField) {
                    this.hiddenField.value = v;
                }
            }
            if (this.el) {
                this.el.removeClass(this.emptyClass);
            }
        }
        else {
            this.clearValue();
        }
    },
    selectAll: function () {
        this.store.each(function (record) {
            record.set(this.checkField, true);
        }, this);
        this.doQuery(this.allQuery);
        this.setValue(this.getCheckedValue());
    },
    deselectAll: function () {
        this.clearValue();
    }
});

Jinpeng.widget.MessageWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
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
			bbar : {
				cls : 'blue-button-ct',
				buttonAlign : 'center',
				buttons : [{
					xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;',
					height : 20,
					width : 55,
					scope : this,
					handler : this.close
				}]
			}
		});
		Jinpeng.widget.MessageWindow .superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Jinpeng.widget.MessageWindow .superclass.afterRender.call(this);
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


Jinpeng.widget.MessageWindows = Ext.extend(Jinpeng.widget.GeneralWindow,{
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
		Jinpeng.widget.MessageWindows .superclass.initComponent.apply(this);
	},fengshow : function(){
		eng = 1;
		this.close();
	},
	afterRender : function() {
		Jinpeng.widget.MessageWindows .superclass.afterRender.call(this);
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
//重写ext的confirm-show功能 
Ext.MessageBox.confirm = function(title, msg, fn) {  
    this.show({  
                title : title,  
                msg : msg,  
                buttons : {  
                    yes : '确定',  
                    no : '取消'  
                },  
                multiline : false, 
                fn : fn  
            });  
    return this;  
} 
Ext.MessageBox.alert = function(title, msg, fn) {  
    this.show({  
                title : title,  
                msg : msg,  
                buttons : {  
                    yes : '确定' 
                }, 
                fn : fn  
            });  
    return this;  
} 

// register xtype
Ext.reg('orgtree', Jinpeng.widget.OrganizationTree);
Ext.reg('simpleusergrid', Jinpeng.widget.SimpleUserGrid);
Ext.reg('addressbychannelpanel', Jinpeng.widget.AddressByChannelPanel);
Ext.reg('tcombo', Jinpeng.widget.TComboBox);
Ext.reg("tooltiptextfield", Jinpeng.widget.ToolTipTextField);
Ext.reg("tooltipbutton", Jinpeng.widget.ToolTipButton);
Ext.reg("placeSelector", Jinpeng.widget.PlaceSelector);
Ext.reg("mountPlaceSelector", Jinpeng.widget.MountPlaceSelector);
Ext.reg('dcombo', Jinpeng.widget.DeletableComboBox);
Ext.reg('lovcombo', Jinpeng.widget.LovCombo);
Ext.reg('pictureShowBox', Jinpeng.widget.PictureShowBox);
Ext.reg('surveytypecombo', Jinpeng.widget.SurveyTypeComb);
Ext.reg('plateattributioncomb', Jinpeng.widget.PlateAttributionComb);
Ext.reg('tipLabel', Jinpeng.widget.tipLabel);
Ext.reg("normalbutton", Jinpeng.widget.NormalButton);
Ext.reg("normaltreebutton", Jinpeng.widget.NormalTreeButton);
Ext.reg("pagebutton", Jinpeng.widget.PageButton);
Ext.reg("multiSelect", Jinpeng.widget.MultiSelect);
Ext.reg("tipCombo", Jinpeng.widget.TipComboBox);
Ext.reg('onlyShowBox', Jinpeng.widget.OnlyShowBox);