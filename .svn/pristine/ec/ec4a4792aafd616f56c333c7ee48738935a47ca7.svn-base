Ext.ns('Jinpeng');
var _this;
var cobbeng;
var com;
var com1;
var com2;
var com3;
var com4;
var com5;
var com6;
/**
 * @class Jinpeng.ChannelTreePanel 对设备树进行封装，提供搜索，自动选择根结点,样式等功能
 */
/**
 * 通过vtype限制不能输入空格
 */
Ext.applyIf(Ext.form.VTypes, {
	"channelTree" : function() {
		return true;
	},
	"channelTreeMask" : /^\s*(\S+)\s*$/
});
Jinpeng.ChannelTreePanel = Ext.extend(Ext.tree.TreePanel, {

	lines : false,
	autoScroll : true,
	rootVisible : false,
	/**
	 * 设备树是否支持多选
	 * 
	 * @type {Boolean}
	 * @property multiSelect
	 */
	multiSelect : false,
	/**
	 * 设备树是否已开加完成
	 * 
	 * @type {Boolean}
	 * @property inited
	 */
	inited : false,
	bodyStyle : 'border-width:1px 0px;background-color:#F5FDFF',

	/**
	 * 设置树搜索框label文本
	 * 
	 * @type {String}
	 * @property searchLabel
	 */
	searchLabel : '搜&nbsp;&nbsp;索',
	searchInvalideText : '输入的关键字不允许超出32个字符且不能有特殊字符,请重新输入!',
	/**
	 * 设置是否显示搜索文本
	 * 
	 * @type {Boolean}
	 * @property displayLabel
	 */
	displayLabel : true,
	/**
	 * 设置是否显示搜索框
	 * 
	 * @type {Boolean}
	 * @property displayLabel
	 */
	showSearchInput : true,
	url : undefined,
	baseAttrs : undefined,
	curAsyncCount : 0,// private
	auto : false,// private
	/**
	 * 设备树数据是否全部完成
	 * 
	 * @type {Boolean}
	 * @property dataAllLoaded
	 */
	dataAllLoaded : false,
	/**
	 * 设备树数据是否支持checked功能,数据不用checked属性
	 * 
	 * @type {Boolean}
	 * @property checked
	 */
	checked : false,
	/**
	 * 设备树数据是否支持同步树的功能，即一次性加载
	 * 
	 * @type {Boolean}
	 * @property async
	 */
	async : true,
	root : {
		nodeType : 'async',
		text : 'Root',
		id : 'root',
		uiProvider : Ext.tree.RootTreeNodeUI
	},
	initComponent : function() {

		var items = [];
		if (this.displayLabel) {
			text : this.searchLabel + '：'
		}
		if (this.showSearchInput) {
			var arrItems = {
				style : 'padding:10px 0 5px 10px',
				cls : 'blue-button-ct',
				items : [ {
					xtype : 'tbtext',
					style : 'padding:5px 0 5px 0px',
					text : this.searchLabel + '：'
				},{
					width :160,
					cls : 'channeltree-text',
					ref : '../../txtFilter',
					xtype : 'textfield',
					regex : /^[A-Za-z0-9\u4E00-\u9FFF]{0,32}$/,
					regexText : this.searchInvalideText,
					enableKeyEvents : true,
					emptyText : '请输入关键字',
					vtype : 'channelTree',
					listeners : {
						keyup : {
							buffer : 150,
							scope : this,
							fn : function(field, e) {
								if (Ext.EventObject.ENTER == e.getKey()) {
									this.beforeSearch();// 异步处理，防止假死
								}
							}
						}
					}
				}, {
					cls : 'x-form-invalid-icon',
					xtype : 'tbspacer',
					width : 12,
					style : {
						width : '16px',
						height : '18px',
						position : 'relative'
					},
					listeners : {
						afterrender : function(obj) {
							obj.previousSibling().errorIcon = obj.getEl();
						}
					}
				}, {
					xtype : 'button',
					text : '查 询',
					width : 60,
					handler : this.beforeSearch,
					scope : this
				} ]
			};
			items.push(arrItems);
		}

		Ext.apply(this, {

			tbar : {
				xtype : 'container',
				defaultType : 'toolbar',
				items : items
			},
			treeFilter : new Ext.ux.tree.TreeFilterX(this)
		});

		if (this.multiSelect) {
			Ext.apply(this, {
				selModel : new Ext.tree.MultiSelectionModel()
			});
		}
		if (this.async) {
			Ext.apply(this, {
				loader : new Ext.tree.TreeLoader({
					url : this.url || _app.contextPath + '/client/realtime/displayDeviceTree.action',
					nodeParameter : 'menu.id',
					baseAttrs : {
						uiProvider : this.baseAttrs || Jinpeng.ChannelTreeUIProvider
					}
				})
			});
		}

		Jinpeng.ChannelTreePanel.superclass.initComponent.apply(this);
		/**
		 * @event inited 当树的组件加载并选择根结点完成后的事件
		 */
		this.addEvents('inited', 'checkclick');
		// bindEvents
		this.on('beforeload', this.onBeforeLoad);
		this.on('click', this.onClick, this);
		this.on('expandnode', this.onExpandNode, this);

	},
	/**
	 * 查询条件检索函数
	 */
	beforeSearch : function() {
		if (!this.txtFilter.isValid(false)) {
			var win = new Jinpeng.widget.MessageWindow();
			win.msg = this.searchInvalideTex;
			win.show();

			return false;
		}
		// this.queryMask.show();
		this.onSearch.defer(500, this);// 异步处理，防止假死
	},
	/**
	 * 查询响应函数
	 */
	onSearch : function() {
		var val = this.txtFilter.getRawValue().replace(".","\\.").replace("?","\\?");
		
		var re = new RegExp('.*' + val + '.*', 'i');
		this.treeFilter.clear();
		// this.queryMask.hide(this.queryMask);
		if (val.trim() == '') {
			// this.getRootNode().firstChild.reload();
			this.getRootNode().firstChild.collapseChildNodes();
		} else {
			this.expandAllWithCallback(true, true, function() {
				this.treeFilter.filter(re, 'text');
				if (!Ext.isEmpty(this.treeFilter.matchedPath)) {
					// this.expandPath(this.treeFilter.matchedPath);
					this.selectPath(this.treeFilter.matchedPath);
				} else {
					this.treeFilter.clear();
					this.txtFilter.setValue('');
					this.getRootNode().firstChild.reload();
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = "检索结果为空！检索条件已清除";
					win.show();

				}
				// this.queryMask.hide.defer(500,this.queryMask);
			});
		}
	},
	/**
	 * 
	 * @param ct
	 * @param position
	 */
	afterRender : function(ct, position) {
		Jinpeng.ChannelTreePanel.superclass.afterRender.apply(this, arguments);
		// this.queryMask = new Ext.LoadMask(this.getId());//添加查询loadmask
	},
	/**
	 * 
	 */
	onLoad : function() {
		if (this.getRootNode().firstChild)
			this.getRootNode().firstChild.reload();
	},

	/**
	 * 响应loader加载前的处理函数
	 * 
	 * @param node
	 */
	onBeforeLoad : function(node) {
		if (this.auto)
			++this.curAsyncCount;// 如果是自动加载就加1
		if (node.id == -1) {
			node.id = "root";
		}
	},
	/**
	 * 响应树结点展开的处理函数
	 * 
	 * @param node
	 */
	onExpandNode : function(node) {
		if (this.auto) {
			--this.curAsyncCount;
			if (this.curAsyncCount == -1) {
				if (this.expandAllCallback) {
					this.auto = false, this.expandAllCallback.defer(50, this);
				}
			}
		}
		if (!this.inited && node.id == "root") {
			// node.firstChild.fireEvent('click',node.firstChild,{scope:this});
			this.inited = true;
			if (!this.async) {// 加载远程数据到内存中，方便不用render也可查询
				if (this.getRootNode().firstChild)
					this.getRootNode().firstChild.reload();
				this.dataAllLoaded = true;
			}
			this.fireEvent('inited', this);
		}

		// 遍历子节点,如果对应的监视屏为打开则高亮显示该通道
		node.eachChild(function(n) {
			if (n.isLeaf() && n.attributes.type == Jinpeng.ChannelTreePanel.nodeType.DEVICE) {
				// 揭阳需求 只有设备 为兼容以前代码 还是用通道 但默认是0
				var channelNo = n.attributes.deviceID + "$0";
				if (typeof activeChannels != "undefined" && activeChannels.containsKey(channelNo)) {
					if(n.attributes.status == 1){
						n.setIconCls("icon-device-highlight");
					}
				}
			}
		}, this);
	},
	/**
	 * 当异步树全部展开后才回调
	 * 
	 * @param {Function} callback
	 */
	expandAllWithCallback : function(deep, anim, callback) {
		if (!this.dataAllLoaded) {// 如果未加载就加载，否则就返回
			this.auto = true;
			this.getRootNode().firstChild.expand(deep, anim);
			this.expandAllCallback = callback;
			this.dataAllLoaded = true;
		} else {
			if (callback)
				callback.apply(this);
		}
	},

	/**
	 * 
	 * @returns
	 */
	getSelectedNode : function() {
		return this.getSelectionModel().getSelectedNode();
	},
	/**
	 * 得到当前选择的结点并转为结点对象，方便使用
	 * 
	 * @returns
	 */
	getSelectedNodeObj : function(nodeInput) {
		var nodeType = Jinpeng.ChannelTreePanel.nodeType;
		var node = nodeInput || this.getSelectedNode();
		if (node) {
			var type = node.attributes.type;
			if (type == nodeType.DOMAIN) {// 域节点
				return {
					channelTypeId : -1,
					nodeType : nodeType.DOMAIN
				};
			} else if (type == nodeType.KAKOU)// 卡口节点
				return {
					channelTypeId : -1,
					nodeType : nodeType.KAKOU
				};
			else if (type == nodeType.DIRECTION)
				return {
					channelTypeId : -1,
					nodeType : nodeType.DIRECTION
				};
			else if (type == nodeType.DEVICE)// 设备节点
				return {
					channelTypeId : -1,
					nodeType : nodeType.DEVICE
				};
			else if (type == nodeType.CHANNEL) {// 通道节点
				return {
					channelTypeId : 101,
					nodeType : nodeType.CHANNEL
				};
			} else {// 告警通道节点
				return {
					channelTypeId : 102,
					nodeType : nodeType.ALARM
				};
			}
		}
	},
	/**
	 * 响应树结点单击的处理函数
	 * 
	 * @param node
	 * @param event
	 */
	onClick : function(node, event) {
		if (!this.multiSelect) {// 单选
			var nodeObj = this.getSelectedNodeObj(node);
			// this.clearAllCls(node,nodeObj.nodeType);
			// this.getSelectionModel().clearSelections();
			if (nodeObj.nodeType == Jinpeng.ChannelTreePanel.nodeType.DOMAIN) {
				// if(!node.leaf){
				// node.setIconCls('icon-domain-highlight');
				// }
			} else if (nodeObj.nodeType == Jinpeng.ChannelTreePanel.nodeType.DEVICE) {
				if (node.attributes.status == 1)
					node.setIconCls('icon-device-highlight');
			} else if (nodeObj.nodeType == Jinpeng.ChannelTreePanel.nodeType.CHANNEL) {
				if (node.attributes.status == 1)
					node.setIconCls('icon-camera-highlight');
			} else {
				// node.setIconCls('icon-ball-highlight');
			}
		} else {// 多选
			var nodeObj = this.getSelectedNodeObj(node);
			if (nodeObj.nodeType == Jinpeng.ChannelTreePanel.nodeType.DOMAIN) {
				if (node.attributes.iconCls == 'icon-domain-normal')
					node.setIconCls('icon-domain-highlight');
				else
					node.setIconCls('icon-domain-normal');
			} else if (nodeObj.nodeType == Jinpeng.ChannelTreePanel.nodeType.DEVICE) {
				if (node.attributes.iconCls == 'icon-device-normal')
					node.setIconCls('icon-device-highlight');
				else
					node.setIconCls('icon-device-normal');
			} else if (nodeObj.nodeType == Jinpeng.ChannelTreePanel.nodeType.CHANNEL) {
				if (node.attributes.iconCls == 'icon-camera-normal')
					node.setIconCls('icon-camera-highlight');
				else
					node.setIconCls('icon-camera-normal');
			} else {
				node.setIconCls('icon-ball-highlight');
			}
		}
	},
	/**
	 * 清除所有的cls
	 */
	// private
	clearAllCls : function(node, nodeType) {
		this.el.select("img.icon-domain-highlight").replaceClass("icon-domain-highlight", "icon-domain-normal");
		this.el.select("img.icon-device-highlight").replaceClass("icon-device-highlight", "icon-device-normal");
		this.el.select("img.icon-camera-highlight").replaceClass("icon-camera-highlight", "icon-camera-normal");
		this.el.select("img.icon-ball-highlight").replaceClass("icon-ball-highlight", "icon-ball-normal");
	},

	/**
	 * 
	 * @param nodeObj
	 */
	getNodeKeyByNodeObject : function(nodeObj) {
	},
	/**
	 * 当设备状态改变时 更新树节点的状态
	 * 
	 * @param param
	 */
	onDeviceStatusChange : function(param) {
		var node = this.getRootNode().findChild('deviceID', param.deviceID, true);
		if (node != null) {
			// 设备上线
			if (param.status == 1) {
				var channelNo = node.attributes.deviceID + "$0";
				if (typeof activeChannels != "undefined" && activeChannels.containsKey(channelNo)) {
					node.setIconCls("icon-device-highlight");
				}else{
					node.setIconCls("icon-device-normal");
				}
				node.attributes.status = 1;
//				// 更新设备下的通道状态
//				node.eachChild(function(channel) {
//					channel.attributes.status = 1;
//					channel.setIconCls("icon-camera-normal");
//				});

			} else {
				// 设备下线
				node.setIconCls("icon-device-error");
				node.attributes.status = param.status;
				// 更新设备下的通道状态
//				node.eachChild(function(channel) {
//					channel.attributes.status = 0;
//					channel.setIconCls("icon-camera-error");
//				});

			}
		}
	},
	refresh : function() {
		this.root.reload();
		var tree = this;
		// 异步加载 所以要等到树加载完才 展开 第一层
		var root = this.root;
		var runner = new Ext.util.TaskRunner();
		var expandTask = {
			run : function() {
				if (root.loaded) {
					root.firstChild.expand();
					if(tree.afterRefresh){
						tree.afterRefresh();
					}
					runner.stop(expandTask);
				}
			},
			interval : 200
		};
		runner.start(expandTask);
	},
	afterRefresh :Ext.emptyFn,
	onScreenClose : function(channel, screenID, node) {
		if (this.endTraverseFlag) {
			return;
		}
		if (!node) {
			node = this.root;
		}
		if (node.isLeaf()) {
			var channelNo = node.attributes.deviceID + "$0";
			if (channelNo == channel) {
				// 移除对应通道的高亮显示
				// node.setIconCls('icon-camera-normal');
				node.setIconCls('icon-device-normal');
				this.endTraverseFlag = true;
			}
		} else {
			var nodes = node.childNodes;
			for ( var i = 0; nodes && i < nodes.length; i++) {
				this.onScreenClose(channel, screenID, nodes[i]);
			}
		}
	}
});
Jinpeng.ChannelTreeUIProvider = Ext.extend(Ext.tree.AsynchTriStateNodeUI, {
	renderElements : function(n, a, targetNode, bulkRender) {

		this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';
		var nodeType = Jinpeng.ChannelTreePanel.nodeType;
		var tmpArr = a.id.split("_");
		var checked = n.getOwnerTree().checked;
		if (checked === true)
			a.checked = false;
		var cb = a.checked !== undefined;

		var href = a.href ? a.href : Ext.isGecko ? "" : "#";
		if (!a.leaf) {
			if (tmpArr[tmpArr.length - 1] == nodeType.DOMAIN)
				a.iconCls = "icon-domain-normal";
			else if (tmpArr[tmpArr.length - 1] == nodeType.DEVICE) {
				if (a.status != 1) {
					a.iconCls = "icon-device-error";
				} else {
					a.iconCls = "icon-device-normal";
				}
				// a.iconCls = "icon-device-normal";
			} else if (tmpArr[tmpArr.length - 1] == nodeType.CHANNEL) {
				if (a.status != 1) {
					a.iconCls = "icon-camera-error";
				} else {
					a.iconCls = "icon-camera-normal";
				}
				// a.iconCls = "icon-camera-normal";
			} else {

			}
			a.titleCls = "tree-text-bold";
		} else {
			if (tmpArr[tmpArr.length - 1] == nodeType.CHANNEL) {
				if (a.status != 1) {
					a.iconCls = "icon-camera-error";
				} else {
					a.iconCls = "icon-camera-normal";
					// a.titleCls = "tree-text-bold";
				}
			} else if (tmpArr[tmpArr.length - 1] == nodeType.ALARM || tmpArr[tmpArr.length - 1] == nodeType.ALARM_OUT) {
				a.iconCls = "icon-camera-alarm";
			}
			// 逻辑分组情况下，叶子节点是分组名称的情况
			else if (tmpArr[tmpArr.length - 1] == nodeType.DOMAIN)
				a.iconCls = "icon-domain-normal";
			/*
			 * if(tmpArr[tmpArr.length-1] == nodeType.CHANNEL) a.iconCls = "icon-camera-normal"; else if(tmpArr[tmpArr.length-1] == nodeType.DOMAIN) a.iconCls = "icon-domain-normal"; else a.iconCls =
			 * "icon-ball-normal";
			 */
		}
		var buf = [ '<li class="x-tree-node"><div ext:tree-node-id="', n.id, '" class="x-tree-node-el x-tree-node-leaf x-unselectable ', a.cls, '" unselectable="on">',
				'<span class="x-tree-node-indent">', this.indentMarkup, "</span>", '<img src="', this.emptyIcon, '" class="x-tree-ec-icon x-tree-elbow" />', '<img src="', a.icon || this.emptyIcon,
				'" class="x-tree-node-icon', (a.icon ? " x-tree-node-inline-icon" : ""), (a.iconCls ? " " + a.iconCls : ""), '" unselectable="on" />',
				cb ? ('<img src="' + this.emptyIcon + '" class="x-tree-checkbox' + (a.checked === true ? ' x-tree-node-checked' : (a.checked !== false ? ' x-tree-node-grayed' : '')) + '" />') : '',
				'<a hidefocus="on" class="x-tree-node-anchor" href="', href, '" tabIndex="1" ', a.hrefTarget ? ' target="' + a.hrefTarget + '"' : "", '><span',
				(a.titleCls ? ' class="tree-text-bold"' : " "), 'unselectable="on">', n.text, "</span></a></div>", '<ul class="x-tree-node-ct" style="display:none;"></ul>', "</li>" ].join('');
		var nel;
		if (bulkRender !== true && n.nextSibling && (nel = n.nextSibling.ui.getEl())) {
			this.wrap = Ext.DomHelper.insertHtml("beforeBegin", nel, buf);
		} else {
			this.wrap = Ext.DomHelper.insertHtml("beforeEnd", targetNode, buf);
		}
		this.elNode = this.wrap.childNodes[0];
		this.ctNode = this.wrap.childNodes[1];
		var cs = this.elNode.childNodes;
		this.indentNode = cs[0];
		this.ecNode = cs[1];
		this.iconNode = cs[2];
		var index = 3;
		if (cb) {
			this.checkbox = cs[3];
			index++;
		}
		this.anchor = cs[index];
		this.textNode = cs[index].firstChild;
	}
});
Jinpeng.ChannelTreePanel.nodeType = {
	AREA : "0",  //区域
	DEPT : "1",  //部门
	MOUNT : "2",  //卡口
	DEVICE_NEW : "3",  //设备
	DIRECTION_COPY : "4",  //方向
	
	MOUNT_MAINTAIN : "1", //故障卡口
	MOUNT_SCRAP : "2", //报废卡口
	MOUNT_STOP : "3", //停用卡口
	
	DIRECTION : 77,// 方向
	KAKOU : 88,// 卡口
	DOMAIN : 99,// 区域
	DEVICE : 100,// 设备
	CHANNEL : 101,// 通道
	ALARM : 102,// 告警通道
	ALARM_OUT : 103
// 告警通道
};
Ext.reg("channeltree", Jinpeng.ChannelTreePanel);

Ext.ns('Ext.ux.tree');

/**
 * 树过滤器的扩展，修复原生过滤器当子结点满足过滤条件时也把父结点也过滤掉
 * 
 * @constructor
 * @param {Ext.tree.TreePanel} tree
 * @param {Object} config
 */
Ext.ux.tree.TreeFilterX = Ext.extend(Ext.tree.TreeFilter, {
	/**
	 * 用来储存匹配的节点路径
	 */
	matchedPathArray : new Array(),
	/**
	 * 当前path的索引
	 * 
	 * @type Number
	 */
	currentIndex : 0,
	/**
	 * 匹配的路径
	 * 
	 * @type String
	 */
	matchedPath : "",
	/**
	 * 前一个搜索条件
	 * 
	 * @type
	 */
	currentRegExp : null,

	/**
	 * Filter the data by a specific attribute.
	 * 
	 * @param {String/RegExp} value Either string that the attribute value should start with or a RegExp to test against the attribute
	 * @param {String} attr (optional) The attribute passed in your node's attributes collection. Defaults to "text".
	 */
	filter : function(value, attr, startNode) {

		if (this.currentRegExp == null || this.currentRegExp.source != value.source) {
			this.matchedPathArray.length = 0;// 清空
			this.matchedPath = "";
			this.currentIndex = 0;

			this.tree.collapseAll();
			Ext.ux.tree.TreeFilterX.superclass.filter.apply(this, arguments);

			this.currentRegExp = value;
		} else {
			this.currentIndex++;
			if (this.currentIndex == this.matchedPathArray.length) {
				this.currentIndex = 0;
			}
		}

		if (this.matchedPathArray.length > 0) {
			this.matchedPath = this.matchedPathArray[this.currentIndex];
		} else {
			this.matchedPath = "";
		}
	},

	/**
	 * Filter by a function. The passed function will be called with each node in the tree (or from the startNode). If the function returns true, the node is kept otherwise it is filtered. If a node
	 * is filtered, its children are also filtered. Shows parents of matching nodes.
	 * 
	 * @param {Function} fn The filter function
	 * @param {Object} scope (optional) The scope of the function (defaults to the current node)
	 */
	filterBy : function(fn, scope, startNode) {
		var _this = this;
		startNode = startNode || this.tree.root.childNodes[0];
		if (this.autoClear) {
			this.clear();
		}
		var f1 = function(n) {
			if (fn.call(scope || n, n)) {
				_this.matchedPathArray.push(n.getPath());
			}
			var cs = n.childNodes;
			for ( var i = 0, len = cs.length; i < len; i++) {
				f1(cs[i]);
			}
		};

		f1(startNode);
	}
});

/**
 * @class Jinpeng.PagingToolbar 扩展原生PagingToolbar
 */
Jinpeng.PagingToolbar = Ext.extend(Ext.PagingToolbar, {

	emptyMsg : null,

	defaults : {
	// cls : 'paging-btn'
	},

	initComponent : function() {
		Jinpeng.PagingToolbar.superclass.initComponent.apply(this);
		var items = new Ext.util.MixedCollection();
		var oldItems = this.items.items;
		var len = this.items.items.length;
		items.addAll(oldItems.slice(len - 2));// ->
		items.addAll(oldItems.slice(len - 1));// display info
		items.addAll(oldItems.slice(3, 6));// display info
		items.add('ext-comp-' + (++Ext.Component.AUTO_ID), new Ext.Toolbar.TextItem({
			text : '&nbsp;&nbsp;&nbsp;'
		}));
		var firstBtn = oldItems.slice(0, 1);
		firstBtn[0].cls = 'paging-btn-first';
		firstBtn[0].overCls = 'paging-btn-first-over';
		items.addAll(firstBtn);// 导航条按钮除了刷新按钮与"-"
		items.add('ext-comp-' + (++Ext.Component.AUTO_ID), new Ext.Toolbar.TextItem({
			text : '&nbsp;&nbsp;&nbsp;'
		}));// 导航条按钮除了刷新按钮与"-"
		var prevBtn = oldItems.slice(1, 2);
		prevBtn[0].cls = 'paging-btn-prev';
		prevBtn[0].overCls = 'paging-btn-prev-over';
		items.addAll(oldItems.slice(1, 2));// 导航条按钮除了刷新按钮与"-"
		items.add('ext-comp-' + (++Ext.Component.AUTO_ID), new Ext.Toolbar.TextItem({
			text : '&nbsp;&nbsp;&nbsp;'
		}));// 导航条按钮除了刷新按钮与"-"
		var nextBtn = oldItems.slice(7, 8);
		nextBtn[0].cls = 'paging-btn-next';
		nextBtn[0].overCls = 'paging-btn-next-over';
		items.addAll(oldItems.slice(7, 8));// 导航条按钮除了刷新按钮与"-"
		items.add('ext-comp-' + (++Ext.Component.AUTO_ID), new Ext.Toolbar.TextItem({
			text : '&nbsp;&nbsp;&nbsp;'
		}));// 导航条按钮除了刷新按钮与"-"
		var lastBtn = oldItems.slice(8, 9);
		lastBtn[0].cls = 'paging-btn-last';
		lastBtn[0].overCls = 'paging-btn-last-over';
		items.addAll(oldItems.slice(8, 9));// 导航条按钮除了刷新按钮与"-"
		items.add('ext-comp-' + (++Ext.Component.AUTO_ID), new Ext.Toolbar.TextItem({
			text : '&nbsp;&nbsp;&nbsp;'
		}));
		this.items = items;
	}
});

Ext.override(Ext.Element, {
	alignMiddle : function(parent) {
		if (Ext.isString(parent)) {
			parent = Ext.get(parent) || this.up(parent);
		}
		this.setStyle({
			'margin-top' : (parent.getHeight() / 2 - this.getHeight() / 2) + 'px'
		});
	}
});

/*Ext.override(Ext.ProgressBar, {
	setSize : Ext.ProgressBar.superclass.setSize,
	onResize : function(w, h) {
		var inner = Ext.get(this.el.child('.x-progress-inner')), bar = inner.child('.x-progress-bar'), pt = inner.child('.x-progress-text');
		ptInner = pt.child('*');
		ptb = inner.child('.x-progress-text-back'), ptbInner = ptb.child('*');
		Ext.ProgressBar.superclass.onResize.apply(this, arguments);
		inner.setHeight(h);
		bar.setHeight(h);
		this.textEl.setHeight('auto');
		pt.setHeight('auto');
		ptb.setHeight('auto');
		ptInner.alignMiddle(bar);
		ptbInner.alignMiddle(bar);
		this.syncProgressBar();
	}
});*/

// by xiaowan

Jinpeng.DeviceTreeUIProvider = Ext.extend(Ext.tree.AsynchTriStateNodeUI, {
	renderElements : function(n, a, targetNode, bulkRender) {
		this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';
		var nodeType = Jinpeng.ChannelTreePanel.nodeType;
		var type = a.type;
		if (!a.leaf) {
			if (type == nodeType.DOMAIN) {
				a.iconCls = "icon-domain-normal";
			} else if (type == nodeType.KAKOU) {
				a.iconCls = "icon-kakou-normal";
			} else if (type == nodeType.DEVICE) {
				if (a.status != 1) {
					a.iconCls = "icon-device-error";
				} else {
					a.iconCls = "icon-device-normal";
				}
			} else if (type == nodeType.CHANNEL) {
				if (a.status != 1) {
					a.iconCls = "icon-camera-error";
				} else {
					a.iconCls = "icon-camera-normal";
				}
			} else {

			}
			a.titleCls = "tree-text-bold";
		} else {
			if (type == nodeType.DOMAIN) {
				a.iconCls = "icon-domain-normal";
			} else if (type == nodeType.KAKOU) {
				a.iconCls = "icon-kakou-normal";
			} else if (type == nodeType.DEVICE) {
				a.qtip = "IP:"+a.ip +" 端口:"+a.port;
				if (a.status != 1) {
					a.iconCls = "icon-device-error";
				} else {
					a.iconCls = "icon-device-normal";
				}
			} else if (type == nodeType.CHANNEL) {
				if (a.status != 1) {
					a.iconCls = "icon-camera-error";
				} else {
					a.iconCls = "icon-camera-normal";
				}
			} else if (type == nodeType.ALARM || type == nodeType.ALARM_OUT) {
				a.iconCls = "icon-camera-alarm";
			}
		}
		
		(n.getOwnerTree().checked === true) && (a.checked = n.parentNode.getUI().isChecked());
		Jinpeng.DeviceTreeUIProvider.superclass.renderElements.apply(this, arguments);

		// var cb = a.checked !== undefined;
		// var href = a.href ? a.href :Ext.isGecko ? "" :"#";
		// var buf = ['<li class="x-tree-node"><div ext:tree-node-id="',n.id,'" class="x-tree-node-el x-tree-node-leaf x-unselectable ', a.cls,'" unselectable="on">',
		// '<span class="x-tree-node-indent">',this.indentMarkup,"</span>",
		// '<img src="', this.emptyIcon, '" class="x-tree-ec-icon x-tree-elbow" />',
		// '<img src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon',(a.icon ? " x-tree-node-inline-icon" :""),(a.iconCls ? " "+a.iconCls :""),'" unselectable="on" />',
		// cb ? ('<img src="'+this.emptyIcon+'" class="x-tree-checkbox'+(a.checked === true ? ' x-tree-node-checked' :(a.checked !== false ? ' x-tree-node-grayed' :''))+'" />') :'',
		// '<a hidefocus="on" class="x-tree-node-anchor" href="',href,'" tabIndex="1" ',
		// a.hrefTarget ? ' target="'+a.hrefTarget+'"' :"", '><span', (a.titleCls ? ' class="tree-text-bold"' : " "), 'unselectable="on">',n.text,"</span></a></div>",
		// '<ul class="x-tree-node-ct" style="display:none;"></ul>',
		// "</li>"].join('');
		// var nel;
		// if(bulkRender !== true && n.nextSibling && (nel = n.nextSibling.ui.getEl())){
		// this.wrap = Ext.DomHelper.insertHtml("beforeBegin", nel, buf);
		// }else{
		// this.wrap = Ext.DomHelper.insertHtml("beforeEnd", targetNode, buf);
		// }
		// this.elNode = this.wrap.childNodes[0];
		// this.ctNode = this.wrap.childNodes[1];
		// var cs = this.elNode.childNodes;
		// this.indentNode = cs[0];
		// this.ecNode = cs[1];
		// this.iconNode = cs[2];
		// var index = 3;
		// if(cb){
		// this.checkbox = cs[3];
		// index++;
		// }
		// this.anchor = cs[index];
		// this.textNode = cs[index].firstChild;
	}
});

function transformTreeNodeType(treeData) {
	var childKey = "children";
	if (treeData instanceof Array) {
		for ( var i = 0, l = treeData.length; i < l; i++) {
			var node = treeData[i];
			if (!node.type) {
				node.type = Jinpeng.ChannelTreePanel.nodeType.DOMAIN;// 组织机构结点 添加样式区分类型
			}
			node.uiProvider = Jinpeng.DeviceTreeUIProvider;
			if (treeData[i][childKey]) {
				transformTreeNodeType(treeData[i][childKey]);
			}
		}
	} else {
		if (treeData[childKey]) {
			transformTreeNodeType(treeData[childKey]);
		}
	}
}

/**
 * 使用 1)传入参数 config 2) var ExportHelper =new Jinpeng.ExportHelper(config); ExportHelper.startExport();
 * 
 * @param config
 * @returns {Jinpeng.check.util.ExportHelper}
 */

Jinpeng.ExportHelper = function(config) {
	/**
	 * 
	 * config.totalURL 用来查询导出条数的url
	 * 
	 * config.selectExportURL 用来导出选中的记录的url
	 * 
	 * config.queryExportURL 用来按查询条件导出的记录的url
	 * 
	 * config.ids 要导出的记录id数组
	 * 
	 * config.queryCondition 要导出的记录的条件
	 */
	this.config = config;

	/**
	 * 开始导出
	 */
	this.startExport = function(newFlag) {
		 _this = this;// <font color='red' style:'font-size:20px;'>&nbsp"+data+"&nbsp</font>
		// 1.如果选中条数大于0,导出选中的条数
		if (config.ids && this.getSelectCount() > 0) {
			com1 = _this.config.selectExportURL + "?idstr=" + _this.config.ids.join(",");
			var win = new Jinpeng.HistoryCarDetailWindows();
			win.msg = "你确认要导出选中的这<font color='red' size = 3>&nbsp" + this.getSelectCount() + "&nbsp</font>条数据吗？";
			win.show();
		} else {
			// 2.1.先将当前条件全到后台 查询总共有多少条
			var count = this.getTotalCount();
			// 2.2.如果超过限定条数提示用户缩小范围
			if (count > 15000) {
				if(newFlag){
					var win = new Jinpeng.HistoryCarDetailWindowsssssss();
					win.msg = "当前查询条件检索出数据超过<font color='red' size = 3>&nbsp15000&nbsp</font>条，将为您异步导出，您可以到右上角下载中心查看进度并下载！";
					win.show();
				}else{
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = "当前查询条件检索出数据超过<font color='red' size = 3>&nbsp15000&nbsp</font>条，请减少数据量重新导出！";
					win.show();

				}
				
				
			} else if (count <= 0) {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = "没有数据可导出！";
				win.show();
			} else {
				// 2.3.如果没有超过限定条数,则下载当前条件下的所有记录
				com2 = _this.config.queryExportURL + "?" + encodeURI(_this.config.queryCondition);
				var win = new Jinpeng.HistoryCarDetailWindowss();
				win.msg = "系统按当前查询条件将为你导出<font color='red' size = 3>&nbsp" + count + "&nbsp</font>条数据,请确认？";
				win.show();
			}
		}
	};
	/**
	 * 得到要导出的条数
	 */
	this.getTotalCount = function() {
		var count = 0;
		Ext.Ajax.request({
			url : this.config.totalURL + "?" + encodeURI(this.config.queryCondition),
			method : 'POST',
			async : false,
			success : function(response, options) {
				var result = Ext.util.JSON.decode(response.responseText);
				count = result.data;
			}
		});
		return count;
	};
	/**
	 * 得到选中的条数
	 */
	this.getSelectCount = function() {
		return this.config.ids.length;
	};
	/**
	 * 下载
	 */
	this.downloadFile = function(url) {
		var downloadFrame = document.getElementById("downloadFileFrame");
		if (!downloadFrame) {
			downloadFrame = Ext.DomHelper.append(Ext.getBody(), "<iframe name='downloadFileFrame' id='downloadFileFrame' style='display:none'></iframe>");
		}
		// 尝试用隐藏的iframe下载
		if (downloadFrame) {
			downloadFrame.src = url;
		} else {
			window.open(url);
		}
	};
};

/**
 * 历史过车数据查询导出
 */
Jinpeng.HistoryExportHelper = function(config) {
	/**
	 * config.totalURL 用来查询导出条数的url
	 * config.selectExportURL 用来导出选中的记录的url
	 * config.queryExportURL 用来按查询条件导出的记录的url
	 * config.ids 要导出的记录id数组
	 * config.queryCondition 要导出的记录的条件
	 * config.count 默认初始化最大15000条。
	 */
	this.config = config;

	/**
	 * 开始导出
	 */
	this.startExport = function(newFlag) {
		 _this = this;// <font color='red' style:'font-size:20px;'>&nbsp"+data+"&nbsp</font>
		// 1.如果选中条数大于0,导出选中的条数
		if (config.ids && this.getSelectCount() > 0) {
			com= _this.config.selectExportURL + "?idstr=" + _this.config.ids.join(",") + "&exportType=noAsync&page.start=0&page.limit="+this.getSelectCount();
			var win = new Jinpeng.HistoryCarDetailWindow();
			win.msg = "你确认要导出选中的这<font color='red' size = 3>&nbsp" + this.getSelectCount() + "&nbsp</font>条数据吗？";
			win.show();
		} else if(config.nodeList){
			var nodeList=config.nodeList;
			var list=nodeList.split("=")[1]
			var count=list.split(";").length;                    
			com3 = _this.config.queryExportURL + "?" + encodeURI(_this.config.nodeList) + "&exportType=noAsync&page.start=" + _this.config.start + "&page.limit=" + _this.config.limit;
			var win = new Jinpeng.HistoryCarDetailWindowsss();
			win.msg = "系统按当前查询条件将为你导出最多<font color='red' size = 3>&nbsp "+count+"&nbsp</font>条数据,请确认？";
			win.show();
		} else{
			var count = this.config.count;
			// 2.2.如果超过限定条数提示用户缩小范围
			if (count <= 0) {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = "没有数据可导出！";
				win.show();
			} else {
				// 2.3.如果没有超过限定条数,则下载当前条件下的所有记录
				com3 = _this.config.queryExportURL + "?" + encodeURI(_this.config.queryCondition) + "&exportType=noAsync&page.start=" + _this.config.start + "&page.limit=" + _this.config.limit;
				var win = new Jinpeng.HistoryCarDetailWindowsss();
				win.msg = "系统按当前查询条件将为你导出最多<font color='red' size = 3>&nbsp 5000 &nbsp</font>条数据,请确认？";
				win.show();
			}
		}
	};
	/**
	 * 得到选中的条数
	 */
	this.getSelectCount = function() {
		return this.config.ids.length;
	};
	/**
	 * 下载
	 */
	this.downloadFile = function(url) {
		var downloadFrame = document.getElementById("downloadFileFrame");
		if (!downloadFrame) {
			downloadFrame = Ext.DomHelper.append(Ext.getBody(), "<iframe name='downloadFileFrame' id='downloadFileFrame' style='display:none'></iframe>");
		}
		// 尝试用隐藏的iframe下载
		if (downloadFrame) {
			downloadFrame.src = url;
		} else {
			window.open(url);
		}
	};
};

/**
 * 历史过车数据查询导出
 */
Jinpeng.HistoryMoreExportHelper = function(config) {
	this.config = config;
	/**
	 * 开始导出
	 */
	this.startExport = function(newFlag) {
		var _this = this;
		Ext.MessageBox.confirm = function(title, msg, fn) {  
			this.show({  
				title : title,  
				msg : msg,  
				buttons : {  
					yes : '确定',  
					no : '取消'  
				}
			});  
			return this;  
		};
		Ext.MessageBox.confirm("提示", "是否执行后台导出，导出数据可到管理中心查看进度并下载！", function(v) {
			if ("yes" == v) {
				Ext.Ajax.request({
					url : _this.config.queryExportURL + "?" + encodeURI(_this.config.queryCondition) + "&exportType=async&page.start=0&page.limit=2000",
					method : 'GET',
					async : false,
					success : function(response, options) {
						var r = Ext.util.JSON.decode(response.responseText);
						var data = r.data;
						top.Ext.Msg.show({
							title : '系统提示',
							msg : data.msg,
							minWidth : 250,
							buttons : Ext.MessageBox.OK
						});
					}
				});
			}
		});
	};
};

/**
 * 使用 1)传入参数 config 2) var ExportTrackCarHelper =new ExportTrackCarHelper(config); ExportTrackCarHelper.startExport();
 * 
 * @param config
 * @returns {Jinpeng.check.util.ExportTrackCarHelper}
 */

Jinpeng.ExportTrackCarHelper = function(config) {
	/**
	 * 
	 * config.totalURL 用来查询导出条数的url
	 * 
	 * config.selectExportURL 用来导出选中的记录的url
	 * 
	 * config.queryExportURL 用来按查询条件导出的记录的url
	 * 
	 * config.ids 要导出的记录id数组
	 * 
	 * config.queryCondition 要导出的记录的条件
	 */
	this.config = config;

	/**
	 * 开始导出
	 */
	this.startExport = function(newFlag) {
		var _this = this;// <font color='red' style:'font-size:20px;'>&nbsp"+data+"&nbsp</font>
		// 1.如果选中条数大于0,导出选中的条数
		if (config.ids && this.getSelectCount() > 0) {
			com4 = _this.config.selectExportURL + "?carNumstr=" + encodeURI(_this.config.ids.join(",")) + '&' + encodeURI(_this.config.queryCondition) + '&' + "idstr=" + _this.config.ids.join(",");
			var win = new Jinpeng.HistoryCarDetailWindowssss();
			win.msg = "你确认要导出选中的这<font color='red' size = 3>&nbsp" + this.getSelectCount() + "&nbsp</font>条数据吗？";
			win.show();
		} else {
			// 2.1.先将当前条件全到后台 查询总共有多少条
			var count = this.getTotalCount();
			// 2.2.如果超过限定条数提示用户缩小范围
			if (count > 15000) {
				if(newFlag){
					var win = new Jinpeng.HistoryCarDetailWindow1();
					win.msg = "当前查询条件检索出数据超过<font color='red' size = 3>&nbsp15000&nbsp</font>条，将为您异步导出，您可以到右上角下载中心查看进度并下载！";
					win.show();
					 cobbeng = _this.config.queryExportURL + "?" + encodeURI(_this.config.queryCondition) + "&exportType=async&historyAmount=" + count;

				}else{
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = "当前查询条件检索出数据超过<font color='red' size = 3>&nbsp15000&nbsp</font>条，请减少数据量重新导出！";
					win.show();

				}
				
				
			} else if (count <= 0) {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '没有数据可导出!';
				win.show();

			} else {
				// 2.3.如果没有超过限定条数,则下载当前条件下的所有记录
				com5 = _this.config.queryExportURL + "?" + encodeURI(_this.config.queryCondition) + "&historyAmount=" + count;
				var win = new Jinpeng.HistoryCarDetailWindowsssss();
				win.msg = "系统按当前查询条件将为你导出<font color='red' size = 3>&nbsp" + count + "&nbsp</font>条数据,请确认？";
				win.show();
			}
		}
	};
	/**
	 * 得到要导出的条数
	 */
	this.getTotalCount = function() {
		var count = 0;
		Ext.Ajax.request({
			url : this.config.totalURL + "?" + encodeURI(this.config.queryCondition),
			method : 'POST',
			async : false,
			success : function(response, options) {
				var result = Ext.util.JSON.decode(response.responseText);
				count = result.data;
			}
		});
		return count;
	};
	/**
	 * 得到选中的条数
	 */
	this.getSelectCount = function() {
		return this.config.ids.length;
	};
	/**
	 * 下载
	 */
	this.downloadFile = function(url) {
		var downloadFrame = document.getElementById("downloadFileFrame");
		if (!downloadFrame) {
			downloadFrame = Ext.DomHelper.append(Ext.getBody(), "<iframe name='downloadFileFrame' id='downloadFileFrame' style='display:none'></iframe>");
		}
		// 尝试用隐藏的iframe下载
		if (downloadFrame) {
			downloadFrame.src = url;
		} else {
			window.open(url);
		}
	};
};

Jinpeng.CarNumValidatorClass = Ext.extend(Ext.util.Observable, {

	provinces : [ '粤', '京', '津', '沪', '渝', '冀', '云', '辽', '黑', '湘', '皖', '鲁', '新', '苏', '浙', '闽', '贵', '青', '豫', '藏', '川', '宁', '琼', '赣', '鄂', '桂', '甘', '晋', '蒙', '陕', '吉', '?' ],
	armys : [ '军', '海', '空', '北', '沈', '南', '兰', '广', '成', '济', '京', '?' ],
	specials : [ '警', '学', '领', '试', '挂', '港', '澳', '超', '使', '?' ],
	// 通用车牌正则 【汉字】【大写字母】XXXXX
	regex1 : /^[\u4E00-\u9FFF\?]{1}[A-Z\?]{1}[A-Z0-9\?]{5}$/,
	// 特殊车 警车 教练车 港澳车等 符合 【汉字】【大写字母】XXXX【汉字】
	regex2 : /^[\u4E00-\u9FFF\?]{1}[A-Z\?]{1}[A-Z0-9\?]{4}[\u4E00-\u9FFF\?]$/,
	// 武警
	regex3 : /^WJ(([0-2\?]{1}[0-9\?]{1})|([3\?]{1}[0-4\?]{1}))[A-Z0-9\?]{5}$/,
	// 新军车车牌
	regex4 : /^[A-Z\?]{2}[0-9\?]{5}$/,
	//新武警
	regex5 : /^WJ[\u4E00-\u9FFF\?][A-Z0-9\?]{5}$/,

	// 军车牌
	validateArmyCar : function(carNum) {
		if (this.regex4.test(carNum))
			return true;
		if (this.regex1.test(carNum)) {
			var firstChar = carNum.substr(0, 1);
			return (this.armys.indexOf(firstChar) > -1);
		}
		return false;
	},
	// 武警车
	validatePAPCar : function(carNum) {
		return this.regex3.test(carNum);
	},
	// 新武警车
	validateNewPAPCar : function(carNum) {
		if (this.regex5.test(carNum)) {
			var thirdChar = carNum.substr(2, 1);
			return (this.provinces.indexOf(thirdChar) > -1);
		}
		return false;
	},
	// 教练车
	validateCoachCar : function(carNum) {
		return validateSpecial(carNum);
	},
	// 警车
	validatePoliceCar : function(carNum) {
		return validateSpecial(carNum);
	},
	// 港澳入境
	validateInboundCar : function(carNum) {
		return validateSpecial(carNum);
	},
	// 普通
	validateCivilCar : function(carNum) {
		if (this.regex1.test(carNum)) {
			var firstChar = carNum.substr(0, 1);
			return (this.provinces.indexOf(firstChar) > -1);
		}
		return false;
	},
	validateSpecial : function(carNum) {
		if (this.regex2.test(carNum)) {
			var firstChar = carNum.substr(0, 1);
			var lastChar = carNum.substr(carNum.length - 1, 1);
			return (this.provinces.indexOf(firstChar) > -1 && this.specials.indexOf(lastChar) > -1);
		}
		return false;
	},
	validateAll : function(carNum) {
		return this.validateCivilCar(carNum) || this.validateSpecial(carNum) || this.validatePAPCar(carNum) || this.validateArmyCar(carNum)||this.validateNewPAPCar(carNum);
	}
});
Jinpeng.CarNumValidator = new Jinpeng.CarNumValidatorClass();

Jinpeng.FuzzyCarNumValidatorClass = Ext.extend(Ext.util.Observable, {

	provinces : [ '粤', '京', '津', '沪', '渝', '冀', '云', '辽', '黑', '湘', '皖', '鲁', '新', '苏', '浙', '闽', '贵', '青', '豫', '藏', '川', '宁', '琼', '赣', '鄂', '桂', '甘', '晋', '蒙', '陕', '吉', '?' ],
	armys : [ '军', '海', '空', '北', '沈', '南', '兰', '广', '成', '济', '京', '?' ],
	specials : [ '警', '学', '领', '试', '挂', '港', '澳', '超', '使', '?' ],
	// 通用车牌正则 【汉字】【大写字母】XXXXX
	regex1 : /^[\u4E00-\u9FFF\?]{1}[A-Z\?]{1}[A-Z0-9\?]{0-5}$/,
	// 特殊车 警车 教练车 港澳车等 符合 【汉字】【大写字母】XXXX【汉字】
	regex2 : /^[\u4E00-\u9FFF\?]{1}[A-Z\?]{1}[A-Z0-9\?]{0-4}[\u4E00-\u9FFF\?]$/,
	// 武警
	regex3 : /^WJ(([0-2\?]{1}[0-9\?]{1})|([3\?]{1}[0-4\?]{1}))[A-Z0-9\?]{0-5}$/,
	// 新军车车牌
	regex4 : /^[A-Z\?]{2}[0-9\?]{0-5}$/,
	//新武警
	regex5 : /^WJ[\u4E00-\u9FFF\?][A-Z0-9\?]{0-5}$/,

	// 军车牌
	validateArmyCar : function(carNum) {
		if (this.regex4.test(carNum))
			return true;
		if (this.regex1.test(carNum)) {
			var firstChar = carNum.substr(0, 1);
			return (this.armys.indexOf(firstChar) > -1);
		}
		return false;
	},
	// 武警车
	validatePAPCar : function(carNum) {
		return this.regex3.test(carNum);
	},
	// 新武警车
	validateNewPAPCar : function(carNum) {
		if (this.regex5.test(carNum)) {
			var thirdChar = carNum.substr(2, 1);
			return (this.provinces.indexOf(thirdChar) > -1);
		}
		return false;
	},
	// 教练车
	validateCoachCar : function(carNum) {
		return validateSpecial(carNum);
	},
	// 警车
	validatePoliceCar : function(carNum) {
		return validateSpecial(carNum);
	},
	// 港澳入境
	validateInboundCar : function(carNum) {
		return validateSpecial(carNum);
	},
	// 普通
	validateCivilCar : function(carNum) {
		if (this.regex1.test(carNum)) {
			var firstChar = carNum.substr(0, 1);
			return (this.provinces.indexOf(firstChar) > -1);
		}
		return false;
	},
	validateSpecial : function(carNum) {
		if (this.regex2.test(carNum)) {
			var firstChar = carNum.substr(0, 1);
			var lastChar = carNum.substr(carNum.length - 1, 1);
			return (this.provinces.indexOf(firstChar) > -1 && this.specials.indexOf(lastChar) > -1);
		}
		return false;
	},
	validateAll : function(carNum) {
		return this.validateCivilCar(carNum) || this.validateSpecial(carNum) || this.validatePAPCar(carNum) || this.validateArmyCar(carNum)||this.validateNewPAPCar(carNum);
	}
});

Jinpeng.FuzzyCarNumValidator = new Jinpeng.FuzzyCarNumValidatorClass();

//伴随车车牌验证
Jinpeng.TrackCarNumValidatorClass = Ext.extend(Ext.util.Observable, {
	specials : [ '警', '学', '领', '试', '挂', '港', '澳', '超', '使', '?' ],
	// 通用车牌正则 【汉字】【大写字母】XXXXX
	regex1 : /^[A-Z\?]{1}[A-Z0-9\?]{5}$/,
	// 特殊车 警车 教练车 港澳车等 符合 【汉字】【大写字母】XXXX【汉字】
	regex2 : /^[A-Z\?]{1}[A-Z0-9\?]{4}[\u4E00-\u9FFF\?]$/,
	// 普通
	validateCivilCar : function(carNum) {
		return this.regex1.test(carNum);
	},
	//特殊车
	validateSpecial : function(carNum) {
		if (this.regex2.test(carNum)) {
			//var firstChar = carNum.substr(0, 1);
			var lastChar = carNum.substr(carNum.length - 1, 1);
			return (this.specials.indexOf(lastChar) > -1);
		}
		return false;
	},
	validateTraceCar : function(carNum) {
		return this.validateCivilCar(carNum) || this.validateSpecial(carNum);
	}
});
Jinpeng.TrackCarNumValidator = new Jinpeng.TrackCarNumValidatorClass();

Jinpeng.Message = {
			EXPORT_BUTTON_TOOLTIP:"1) 默认按查询条件导出,如果选中则只导出选中的记录<br>2) 如果导出的记录超过15000条,将后台异步导出，您可以到下载中心查看进度并下载",
			CHECK_ALL_TITLE:"只对当前页内记录起作用"
};

Jinpeng.ActionTextColumn =  Ext.extend(Ext.grid.ActionColumn,{
	 constructor: function(cfg) {
	        var me = this,
	            items = cfg.items || (me.items = [me]),
	            l = items.length,
	            i,
	            item;

	        Jinpeng.ActionTextColumn.superclass.constructor.call(me, cfg);

//	      Renderer closure iterates through items creating an <img> element for each and tagging with an identifying 
//	      class name x-action-col-{n}
	        me.renderer = function(v, meta,record, rowIndex, colIndex, store) {
//	          Allow a configured renderer to create initial value (And set the other values in the "metadata" argument!)
	            v = Ext.isFunction(cfg.renderer) ? cfg.renderer.apply(this, arguments)||'' : '';

	            meta.css += ' x-action-col-cell';
	            for (i = 0; i < l; i++) {
	                item = items[i];
	                if(Ext.isFunction(item.textFunction) ){
	                	item.text =  item.textFunction.apply(this, [v, meta,record, rowIndex, colIndex, store]);
	                	item.tooltip = item.text;
	                }
	                
	                v += '<span style="'+item.textStyle+'" title="' + (item.altText || me.altText) +
	                    '" class="x-action-col-icon x-action-col-' + String(i) + ' ' + (item.iconCls || '') +
	                    ' ' + (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope||this.scope||this, arguments) : '') + '"' +
	                    ((item.tooltip) ? ' ext:qtip="' + item.tooltip + '"' : '') + ' >'+"&nbsp;"+item.text+"&nbsp;"+'<span>';
	            }
	            return v;
	        };
	    }
});

Jinpeng.PageSize = (function(){
	var h = window.screen.height;
	if( h < 800){
		return 15;
		//return 11;
	}
	if(h < 900){
		return 19;
	}
	if(h<1080){
		return 26;
		//return 16;
	}
	return 30;
})();
Jinpeng.Constants = {
		//告警信息处理状态
		ALARM_PROCESS_UNSIGNED : 0,
	    ALARM_PROCESS_PROCESSED :4,
	    ALARM_PROCESS_SIGNED :1,
	    ALARM_PROCESS_CANCEL :3,
	    ALARM_PROCESS_CONFIRMED: 2,
	    ALARM_PROCESS_FEEDBACK: 5	
};
Jinpeng.GeneralWindow = Ext.extend(Ext.Window, {
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

		Jinpeng.GeneralWindow.superclass.constructor.apply(this, arguments);

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
Jinpeng.HistoryCarDetailWindow = Ext.extend(Jinpeng.GeneralWindow,{
	width : 400,
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
				
				bbar : {
		cls : 'blue-button-ct',
		buttonAlign : 'center',
			buttons :[{
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;',
						id:'id1',
						height : 20,
						width : 55,
						scope : this,
						handler : this.fengshow
					},{
				  		  xtype : 'tbspacer',
				  		  width : 10
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
				
				/*
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
				*/
				
		});
		Jinpeng.HistoryCarDetailWindow .superclass.initComponent.apply(this);
	},fengshow : function(){
		this.close();
		_this.downloadFile(com);
	},
	afterRender : function() {
		Jinpeng.HistoryCarDetailWindow .superclass.afterRender.call(this);
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

Jinpeng.HistoryCarDetailWindows = Ext.extend(Jinpeng.GeneralWindow,{
	width : 400,
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
		Jinpeng.HistoryCarDetailWindows .superclass.initComponent.apply(this);
	},fengshow : function(){
		this.close();
		_this.downloadFile(com1);
	},
	afterRender : function() {
		Jinpeng.HistoryCarDetailWindows .superclass.afterRender.call(this);
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
Jinpeng.HistoryCarDetailWindowss = Ext.extend(Jinpeng.GeneralWindow,{
	width : 400,
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
					items : [ {
						region : 'center',
						xtype : 'displayfield',
						fieldLabel : '',
						id:'carNum',
						name : 'carNum',
						anchor : '96%'
					} ]
				} ]
			} ],
			bbar : {
				cls : 'blue-button-ct',
				buttonAlign : 'center',
				buttons : [{
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;',
						id:'id1',
						height : 20,
						width : 55,
						scope : this,
						handler : this.fengshow
					},{
						xtype : 'tbspacer',
						width : 10
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
		Jinpeng.HistoryCarDetailWindowss .superclass.initComponent.apply(this);
	},
	fengshow : function(){
		this.close();
		_this.downloadFile(com2);
	},
	afterRender : function() {
		Jinpeng.HistoryCarDetailWindowss .superclass.afterRender.call(this);
		//根据点击记录时设置的记录ID加载数据
		this.loadRecordById(this.msg);
	},
	loadRecordById : function(msg) {
		Ext.getCmp("carNum").setValue(msg);
	}
	
});

Jinpeng.HistoryCarDetailWindowsss = Ext.extend(Jinpeng.GeneralWindow,{
	width : 400,
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
					id:'id1',
					height : 20,
					width : 55,
					scope : this,
					handler : this.fengshow
				}, {
					xtype : 'tbspacer',
					width : 10
				}, {
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
		Jinpeng.HistoryCarDetailWindowsss .superclass.initComponent.apply(this);
	},fengshow : function(){
		this.close();
		_this.downloadFile(com3);
	},
	afterRender : function() {
		Jinpeng.HistoryCarDetailWindowsss .superclass.afterRender.call(this);
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
Jinpeng.HistoryCarDetailWindowsssss = Ext.extend(Jinpeng.GeneralWindow,{
	width : 400,
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
		Jinpeng.HistoryCarDetailWindowsssss .superclass.initComponent.apply(this);
	},fengshow : function(){
		this.close();
		_this.downloadFile(com4);
	},
	afterRender : function() {
		Jinpeng.HistoryCarDetailWindowsssss .superclass.afterRender.call(this);
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

Jinpeng.HistoryCarDetailWindowssssss = Ext.extend(Jinpeng.GeneralWindow,{
	width : 400,
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
		Jinpeng.HistoryCarDetailWindowssssss .superclass.initComponent.apply(this);
	},fengshow : function(){
		this.close();
		_this.downloadFile(com5);
	},
	afterRender : function() {
		Jinpeng.HistoryCarDetailWindowssssss .superclass.afterRender.call(this);
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

Jinpeng.HistoryCarDetailWindowsssssss = Ext.extend(Jinpeng.GeneralWindow,{
	width : 400,
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
		Jinpeng.HistoryCarDetailWindowsssssss .superclass.initComponent.apply(this);
	},fengshow : function(){
		this.close();
		Ext.Ajax.request({
			url : _this.config.queryExportURL + "?" + encodeURI(_this.config.queryCondition) + "&exportType=async",
			method : 'GET',
			async : false,
			success : function(response, options) {
				var r = Ext.util.JSON.decode(response.responseText);
				var data = r.data;
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = data.msg;
				win.show();
			}
		});
	},
	afterRender : function() {
		Jinpeng.HistoryCarDetailWindowsssssss .superclass.afterRender.call(this);
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

Jinpeng.HistoryCarDetailWindow1 = Ext.extend(Jinpeng.GeneralWindow,{
	width : 400,
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
		Jinpeng.HistoryCarDetailWindow1 .superclass.initComponent.apply(this);
	},fengshow : function(){
		this.close();
		Ext.Ajax.request({
			url : cobbeng,
			method : 'GET',
			async : false,
			success : function(response, options) {
				var r = Ext.util.JSON.decode(response.responseText);
				var data = r.data;
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = data.msg;
				win.show();

			}
		});
	},
	afterRender : function() {
		Jinpeng.HistoryCarDetailWindow1 .superclass.afterRender.call(this);
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
Ext.reg("actiontextcolumn", Jinpeng.ActionTextColumn);
Ext.grid.Column.types['actiontextcolumn'] = Jinpeng.ActionTextColumn;