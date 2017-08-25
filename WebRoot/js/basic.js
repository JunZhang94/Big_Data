//初始化页面加载时间
Ext.apply(Ext.Ajax, {
  timeout : 300000
});
Ext.Ajax.on('beforerequest', function(conn, opts) {
	if (opts.waitMsg) {
		_mask = new Ext.LoadMask(Ext.getBody(), {
			msg : opts.waitMsg
		});
		_mask.show();
	}
});

//页面禁用右键
/*if (document.layers)
{
    document.captureEvents(Event.MOUSEDOWN);
}
document.onmousedown = click;
document.oncontextmenu = new Function("return false;");
function click(e)
{
    e = e || event;
    if (e.button == 2)
    {
        var tag = e.srcElement || e.target;
        if (tag.type == "text" || tag.type == "textarea")
        {
            document.oncontextmenu = new Function("return true;");
        }
        else
        {
            document.oncontextmenu = new Function("return false;");
        }
    }
}*/

function forbidBackSpaceAndF5(e) {  
	var ev = e || window.event; // 获取event对象
	// 全局禁用F5,防止ocx刷新后不能使用
	if (window.event.keyCode == 116) {
		window.event.keyCode = 0;
		window.event.returnValue = false;
		return false;
	}
	// 禁止后退键（Backspace）密码或单行、多行文本框除外
     
    var obj = ev.target || ev.srcElement; //获取事件源   
    var t = obj.type || obj.getAttribute('type'); //获取事件源类型   
    //获取作为判断条件的事件类型   
    var vReadOnly = obj.readOnly;  
    var vDisabled = obj.disabled;  
    //处理undefined值情况   
    vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;  
    vDisabled = (vDisabled == undefined) ? true : vDisabled;  
    //当敲Backspace键时，事件源类型为密码或单行、多行文本的，   
    //并且readOnly属性为true或disabled属性为true的，则退格键失效   
    var flag1 = ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && (vReadOnly == true || vDisabled == true);  
    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效   
    var flag2 = ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea";  
    //判断   
    if (flag2 || flag1) return false;  
}  
//禁止后退键 作用于Firefox、Opera  
//document.onkeypress = forbidBackSpaceAndF5;  
//禁止后退键  作用于IE、Chrome  
document.onkeydown = forbidBackSpaceAndF5;  

/**
 * 全局网络与异常处理<br>
 * a.后台业务异常处理，如果有异常就不调用success<br>
 * b.添加msgCallback回调函数，当有后台有业务异常处理后的回调，解决Ext.Msg不同步处理问题
 */
Ext.Ajax.on('requestcomplete', function(connection, response, options) {
	if (options.waitMsg) {
		_mask.hide();
	}
	if (response && response.getResponseHeader && response.getResponseHeader('LoginRequired')) {
		Ext.Msg.confirm('系统提示', '登录已超时,请重新登录？', function(flag) {
			if (flag == 'yes') {
				location.href = location.href.split("/").slice(0, 4).join("/");
			} else
				return false;
		});
		return false;
	}
	if (response && response.responseText) {// 后台Exception处理
		try {
			var result = Ext.decode(response.responseText);
			if ((result.code == -1 || result.code == 0) && result.needAlert) {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = result.message;
				win.show();
				return false;
			}
		} catch (err) {
			// ingore error
			return false;
		}
	}
	return true;
});
Ext.Ajax.on('requestexception', function(connection, response, options) {
/**屏蔽js请求不成功的有好提示信息
	var win = new Jinpeng.widget.MessageWindow();
	win.msg = '请求超时，请检查服务器是否启动正常！';
	win.show();
	**/
});

/**
 * 重写原生当有业务异常时返回false就不走success或failure回调函数
 */
Ext.override(Ext.data.Connection, {
	handleResponse : function(response) {
		this.transId = false;
		var options = response.argument.options;
		response.argument = options ? options.argument : null;
		if (this.fireEvent('requestcomplete', this, response, options) == true) {
			if (options.success) {
				options.success.call(options.scope, response, options);
			}
		}
		if (options.callback) {
			options.callback.call(options.scope, options, true, response);
		}
	},

	// private
	handleFailure : function(response, e) {
		this.transId = false;
		var options = response.argument.options;
		response.argument = options ? options.argument : null;
		if (this.fireEvent('requestexception', this, response, options, e) == true) {
			if (options.failure) {
				options.failure.call(options.scope, response, options);
			}
		}
		if (options.callback) {
			options.callback.call(options.scope, options, false, response);
		}
	}
});

/**
 * 
 */
Ext.override(Ext.Window, {
	constrainHeader : true,
	shadow : false
});
/**
 * 重写button tip注册到infoTip中
 */
Ext.override(Ext.Button, {
	cls : 'btn',
	overCls : 'btn-over',
	width : 80,
	setTooltip : function(tooltip, /* private */initial) {
		if (this.rendered) {
			if (!initial) {
				this.clearTip();
			}
			if (Ext.isObject(tooltip)) {
				Ext.QuickTips.register(Ext.apply({
					target : this.btnEl.id
				}, tooltip));
				this.tooltip = tooltip;
			} else {
				// this.btnEl.dom[this.tooltipType] = tooltip;
				Ext.QuickTips.register(Ext.apply({
					target : this.btnEl.id
				}, {
					text : tooltip
				}));
				this.tooltip = tooltip;
			}
		} else {
			this.tooltip = tooltip;
		}
		return this;
	}
});
/**
 * 重写field tip注册到errTip中
 */
Ext.form.MessageTargets.side = {
	mark : function(field, msg) {
		field.el.addClass(field.invalidClass);
		if (!field.errorIcon) {
			var elp = field.getErrorCt();
			// field has no container el
			if (!elp) {
				field.el.dom.title = msg;
				return;
			}
			field.errorIcon = elp.createChild({
				cls : 'x-form-invalid-icon'
			});
			if (field.ownerCt) {
				field.ownerCt.on('afterlayout', field.alignErrorIcon, field);
				field.ownerCt.on('expand', field.alignErrorIcon, field);
			}
			field.on('resize', field.alignErrorIcon, field);
			field.on('destroy', function() {
				Ext.destroy(this.errorIcon);
			}, field);
		}
		field.alignErrorIcon();
		// field.errorIcon.dom.qtip = msg;
		field.errorIcon.dom.qclass = 'x-form-invalid-tip';
		field.errorIcon.show();
		Ext.QuickTips.register(Ext.apply({// 注册到errTip中
			target : field.errorIcon,
			tip : 'errTip'
		}, {
			text : msg
		}));
	},
	clear : function(field) {
		field.el.removeClass(field.invalidClass);
		if (field.errorIcon) {
			field.errorIcon.dom.qtip = '';
			field.errorIcon.hide();
		} else {
			field.el.dom.title = '';
		}
	}
};
Ext.BLANK_IMAGE_URL = rootpath + "/lib/ext/images/default/s.gif";
Ext.form.Field.prototype.msgTarget = 'side';
/**
 * 重写quicktips对象
 */
Ext.QuickTips = function() {
	var tips, disabled = false;
	return {
		/**
		 * Initialize the global QuickTips instance and prepare any quick tips.
		 * 
		 * @param {Boolean} autoRender True to render the QuickTips container immediately to preload images. (Defaults to true)
		 */
		init : function(autoRender) {
			if (!tips) {
				if (!Ext.isReady) {
					Ext.onReady(function() {
						Ext.QuickTips.init(autoRender);
					});
					return;
				}
				tips = {};
				tips['infoTip'] = new Ext.QuickTip({
					id : 'infoTip',
					elements : 'header,body',
					disabled : disabled,
					shadow : false
				});
				tips['errTip'] = new Ext.QuickTip({
					id : 'errTip',
					elements : 'header,body',
					disabled : disabled,
					shadow : false
				});
				if (autoRender !== false) {
					tips['infoTip'].render(Ext.getBody());
					tips['errTip'].render(Ext.getBody());
				}
			}
		},

		// Protected method called by the dd classes
		ddDisable : function(key) {
			var tip = arguments[0] ? (arguments[0].tip || 'infoTip') : 'infoTip';
			// don't disable it if we don't need to
			if (tips[tip] && !disabled) {
				tips[tip].disable();
			}
		},

		// Protected method called by the dd classes
		ddEnable : function(key) {
			var tip = arguments[0] ? (arguments[0].tip || 'infoTip') : 'infoTip';
			// only enable it if it hasn't been disabled
			if (tips[tip] && !disabled) {
				tips[tip].enable();
			}
		},

		/**
		 * Enable quick tips globally.
		 */
		enable : function(key) {
			var tip = arguments[0].tip || 'infoTip';
			if (tips[tip]) {
				tips[tip].enable();
			}
			disabled = false;
		},

		/**
		 * Disable quick tips globally.
		 */
		disable : function(key) {
			var tip = arguments[0].tip || 'infoTip';
			if (tips[tip]) {
				tips[tip].disable();
			}
			disabled = true;
		},

		/**
		 * Returns true if quick tips are enabled, else false.
		 * 
		 * @return {Boolean}
		 */
		isEnabled : function(key) {
			var tip = arguments[0].tip || 'infoTip';
			return tips[tip] !== undefined && !tips[tip].disabled;
		},

		/**
		 * Gets the single {@link Ext.QuickTip QuickTip} instance used to show tips from all registered elements.
		 * 
		 * @return {Ext.QuickTip}
		 */
		getQuickTip : function(key) {
			var tip = arguments[0].tip || 'infoTip';
			return tips[tip];
		},

		/**
		 * Configures a new quick tips[key] instance and assigns it to a target element. See {@link Ext.QuickTip#register} for details.
		 * 
		 * @param {Object} config The config object
		 */
		register : function(key) {
			var tip = arguments[0].tip || 'infoTip';
			tips[tip].register.apply(tips[tip], arguments);
		},

		/**
		 * Removes any registered quick tips[key] from the target element and destroys it.
		 * 
		 * @param {String/HTMLElement/Element} el The element from which the quick tips[key] is to be removed.
		 */
		unregister : function(key) {
			var tip = arguments[0].tip || 'infoTip';
			tips[tip].unregister.apply(tips[tip], arguments);
		},

		/**
		 * Alias of {@link #register}.
		 * 
		 * @param {Object} config The config object
		 */
		tips : function(key) {
			var tip = arguments[0].tip || 'infoTip';
			tips[tip].register.apply(tips[tip], arguments);
		}
	};
}();
Ext.QuickTips.init(false);
Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

/** 实现组件之间pubsub模式 */
Ext.namespace('Ext.ux');

Ext.override(Ext.util.Observable, {

	subscribe : function(eventName, fn, scope, o) {
		Ext.ux.PubSub.addEvents(eventName);
		Ext.ux.PubSub.on(eventName, fn, scope, o);
	},

	unsubscribe : function(eventName, fn, scope, o) {
		Ext.ux.PubSub.un(eventName, fn, scope, o);
	},

	publish : function(eventName, event) {
		if (Ext.ux.PubSub.eventsSuspended === true)
			return true;
		if (!Ext.ux.PubSub.events)
			return false;

		// a global event listener
		var glob = Ext.ux.PubSub.events['*'];
		if (glob)
			if (glob.fire.call(glob, event, eventName) === false)
				return true;

		if (eventName.substr(0, 1) == '/' && eventName.length > 1) {
			var chans = eventName.substr(1).split('/');
			var matched = false;
			for ( var i = 0, len = chans.length; i <= len; i++) {
				var fn = Ext.ux.PubSub.events['/' + chans.slice(0, i).join('/').toLowerCase()];
				if (fn) {
					matched = true;
					if (fn.fire.call(fn, event, eventName) === false)
						return true;
				}
			}
			return matched;
		} else {
			var fn = Ext.ux.PubSub.events[eventName.toLowerCase()];
			if (fn) {
				fn.fire.call(fn, event, eventName);
				return true;
			}
		}
		return false;
	},

	removeSubcribers : function(eventName) {
		for ( var evt in Ext.ux.PubSub.events) {
			if ((evt == eventName) || (!eventName)) {
				var fn = Ext.ux.PubSub.events[evt];
				if (fn)
					Ext.ux.PubSub.events[evt].clearListeners();
			}
		}
	}

});

Ext.ux.PubSub = new Ext.util.Observable();

/**
 * 
 */
Ext.override(Ext.grid.GridPanel, {
	loadMask : true,
	columnLines : true,
	enableHdMenu : false,
	enableColumnMove : false
});
/**
 * 重写当没有数据显示的逻辑
 */
Ext.override(Ext.grid.GridView, {

	emptyText : '没有数据显示',
	forceFit : true,
	deferEmptyText : false
//	,
//
//	applyEmptyText : function() {
//		if (this.emptyText && !this.hasRows()) {
//			/*this.mainBody.update('<div class="x-grid-empty">' + this.emptyText + '</div>');
//			this.mainBody.child('div').alignTo(this.el, 'c-c');*/
//		}
//	}
});

Ext.override(Ext.data.Store, {
	defaultParamNames : {
		start : 'page.start',
		limit : 'page.limit',
		sort : 'page.sort',
		dir : 'page.dir'
	}
});

Ext.ns('Ext.ux.grid');

// custom RowNumberer for use with paging GridPanels
Ext.ux.grid.PagingRowNumberer = Ext.extend(Ext.grid.RowNumberer, {
	width:40,
	renderer : function(v, p, record, rowIndex, colIndex, store) {
		if (this.rowspan) {
			p.cellAttr = 'rowspan="' + this.rowspan + '"';
		}

		var so = store.lastOptions;
		var sop = so ? so.params : null;
		return ((sop && sop[store.defaultParamNames.start]) ? sop[store.defaultParamNames.start] : 0) + rowIndex + 1;
	}
});

/**
 * 重写当不按ctrl时也可以多选
 */
Ext.override(Ext.tree.MultiSelectionModel, {

	onNodeClick : function(node, e) {
		if (this.isSelected(node)) {
			this.unselect(node);
		} else {// keep existing not clear selection
			this.select(node, e, true);
		}
	}
});

/**
 * 重写TreeNodeUI使支持三态
 */
Ext.override(Ext.tree.TreeNodeUI, {
	grayedValue : null,
	onDisableChange : function(node, state) {
		this.disabled = state;
		this[state ? 'addClass' : 'removeClass']("x-tree-node-disabled");
	},
	initEvents : function() {
		this.node.on("move", this.onMove, this);
		if (this.node.disabled) {
			this.disabled = true;
			this.addClass("x-tree-node-disabled");
		}
		if (this.node.hidden) {
			this.hide();
		}
		var ot = this.node.getOwnerTree();
		var dd = ot.enableDD || ot.enableDrag || ot.enableDrop;
		if (dd && (!this.node.isRoot || ot.rootVisible)) {
			Ext.dd.Registry.register(this.elNode, {
				node : this.node,
				handles : this.getDDHandles(),
				isHandle : false
			});
		}
	},
	onDblClick : function(e) {
		e.preventDefault();
		if (this.disabled) {
			return;
		}
		if (!this.animating && this.node.isExpandable() && !e.getTarget('.x-tree-checkbox', 1)) {
			this.node.toggle();
		}
		this.fireEvent("dblclick", this.node, e);
	},
	onCheckChange : function() {
		var checked = this.isChecked();
		if (checked !== this.node.attributes.checked) {
			this.node.attributes.checked = checked;
			this.fireEvent('checkchange', this.node, checked);
		}
	},
	toggleCheck : function(checked) {
		var cb = this.checkbox;
		if (!cb) {
			return false;
		}
		if (checked === undefined) {
			checked = this.isChecked() === false;
		}
		if (checked === true) {
			Ext.fly(cb).replaceClass('x-tree-node-grayed', 'x-tree-node-checked');
		} else if (checked !== false) {
			Ext.fly(cb).replaceClass('x-tree-node-checked', 'x-tree-node-grayed');
		} else {
			Ext.fly(cb).removeClass([ 'x-tree-node-checked', 'x-tree-node-grayed' ]);
		}
		this.onCheckChange();
		return checked;
	},
	onCheckboxClick : function() {
		if (!this.disabled) {
			this.toggleCheck();
			this.fireEvent('checkclick', this.node);
		}
	},
	onCheckboxOver : function() {
		this.addClass('x-tree-checkbox-over');
	},
	onCheckboxOut : function() {
		this.removeClass('x-tree-checkbox-over');
	},
	onCheckboxDown : function() {
		this.addClass('x-tree-checkbox-down');
	},
	onCheckboxUp : function() {
		this.removeClass('x-tree-checkbox-down');
	},
	renderElements : function(n, a, targetNode, bulkRender) {
		this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';
		var cb = a.checked !== undefined;
		var href = a.href ? a.href : Ext.isGecko ? "" : "#";
		var buf = [ '<li class="x-tree-node"><div ext:tree-node-id="', n.id, '" class="x-tree-node-el x-tree-node-leaf x-unselectable ', a.cls, '" unselectable="on">',
				'<span class="x-tree-node-indent">', this.indentMarkup, "</span>", '<img src="', this.emptyIcon, '" class="x-tree-ec-icon x-tree-elbow" />', '<img src="', a.icon || this.emptyIcon,
				'" class="x-tree-node-icon', (a.icon ? " x-tree-node-inline-icon" : ""), (a.iconCls ? " " + a.iconCls : ""), '" unselectable="on" />',
				cb ? ('<img src="' + this.emptyIcon + '" class="x-tree-checkbox' + (a.checked === true ? ' x-tree-node-checked' : (a.checked !== false ? ' x-tree-node-grayed' : '')) + '" />') : '',
				'<a hidefocus="on" class="x-tree-node-anchor" href="', href, '" tabIndex="1" ', a.hrefTarget ? ' target="' + a.hrefTarget + '"' : "", '><span unselectable="on">', n.text,
				"</span></a></div>", '<ul class="x-tree-node-ct" style="display:none;"></ul>', "</li>" ].join('');
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
	},
	isChecked : function() {
		return this.checkbox ? (Ext.fly(this.checkbox).hasClass('x-tree-node-checked') ? true : Ext.fly(this.checkbox).hasClass('x-tree-node-grayed') ? this.grayedValue : false) : false;
	},
	getChecked : function() {
		return this.node.attributes.checked;
	}
});
Ext.override(Ext.tree.TreeEventModel, {
	initEvents : function() {
		var el = this.tree.getTreeEl();
		el.on('click', this.delegateClick, this);
		if (this.tree.trackMouseOver !== false) {
			el.on('mouseover', this.delegateOver, this);
			el.on('mouseout', this.delegateOut, this);
		}
		el.on('mousedown', this.delegateDown, this);
		el.on('mouseup', this.delegateUp, this);
		el.on('dblclick', this.delegateDblClick, this);
		el.on('contextmenu', this.delegateContextMenu, this);
	},
	delegateOver : function(e, t) {
		if (!this.beforeEvent(e)) {
			return;
		}
		if (this.lastEcOver) {
			this.onIconOut(e, this.lastEcOver);
			delete this.lastEcOver;
		}
		if (this.lastCbOver) {
			this.onCheckboxOut(e, this.lastCbOver);
			delete this.lastCbOver;
		}
		if (e.getTarget('.x-tree-ec-icon', 1)) {
			this.lastEcOver = this.getNode(e);
			this.onIconOver(e, this.lastEcOver);
		} else if (e.getTarget('.x-tree-checkbox', 1)) {
			this.lastCbOver = this.getNode(e);
			this.onCheckboxOver(e, this.lastCbOver);
		}
		if (this.getNodeTarget(e)) {
			this.onNodeOver(e, this.getNode(e));
		}
	},
	delegateOut : function(e, t) {
		if (!this.beforeEvent(e)) {
			return;
		}
		var n;
		if (e.getTarget('.x-tree-ec-icon', 1)) {
			n = this.getNode(e);
			this.onIconOut(e, n);
			if (n == this.lastEcOver) {
				delete this.lastEcOver;
			}
		} else if (e.getTarget('.x-tree-checkbox', 1)) {
			n = this.getNode(e);
			this.onCheckboxOut(e, n);
			if (n == this.lastCbOver) {
				delete this.lastCbOver;
			}
		}
		t = this.getNodeTarget(e);
		if (t && !e.within(t, true)) {
			this.onNodeOut(e, this.getNode(e));
		}
	},
	delegateDown : function(e, t) {
		if (!this.beforeEvent(e)) {
			return;
		}
		if (e.getTarget('.x-tree-checkbox', 1)) {
			this.onCheckboxDown(e, this.getNode(e));
		}
	},
	delegateUp : function(e, t) {
		if (!this.beforeEvent(e)) {
			return;
		}
		if (e.getTarget('.x-tree-checkbox', 1)) {
			this.onCheckboxUp(e, this.getNode(e));
		}
	},
	delegateClick : function(e, t) {
		if (!this.beforeEvent(e)) {
			return;
		}
		if (e.getTarget('.x-tree-checkbox', 1)) {
			this.onCheckboxClick(e, this.getNode(e));
		} else if (e.getTarget('.x-tree-ec-icon', 1)) {
			this.onIconClick(e, this.getNode(e));
		} else if (this.getNodeTarget(e)) {
			if (!window.ActiveXObject)
				console.log(this.getNodeTarget(e));
			this.onNodeClick(e, this.getNode(e));
		}
	},
	onCheckboxClick : function(e, node) {
		node.ui.onCheckboxClick();
	},
	onCheckboxOver : function(e, node) {
		node.ui.onCheckboxOver();
	},
	onCheckboxOut : function(e, node) {
		node.ui.onCheckboxOut();
	},
	onCheckboxDown : function(e, node) {
		node.ui.onCheckboxDown();
	},
	onCheckboxUp : function(e, node) {
		node.ui.onCheckboxUp();
	}
});
Ext.override(Ext.tree.TreePanel, {
	getChecked : function(a, startNode) {
		startNode = startNode || this.root;
		var r = [];
		var f = function() {
			if (this.ui.getChecked()) {
				r.push(!a ? this : (a == 'id' ? this.id : this.attributes[a]));
			}
		};
		startNode.cascade(f);
		return r;
	}
});
/**
 * 重写TreeNodeUI使级联功能
 */
Ext.tree.TriStateNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
	onCheckChange : function() {
		Ext.tree.TriStateNodeUI.superclass.onCheckChange.apply(this, arguments);
		var p = this.node;
		while ((p = p.parentNode) && p.getUI().updateParent && p.getUI().checkbox && !p.getUI().isUpdating) {
			p.getUI().updateParent();
		}
	},
	toggleCheck : function() {
		var checked = Ext.tree.TriStateNodeUI.superclass.toggleCheck.apply(this, arguments);
		this.updateChild(checked);
		return checked;
	},
	renderElements : function(n, a, targetNode, bulkRender) {
		Ext.tree.TriStateNodeUI.superclass.renderElements.apply(this, arguments);
		this.updateChild(this.node.attributes.checked);
	},
	updateParent : function() {
		var checked;
		this.node.eachChild(function(n) {
			if (checked === undefined) {
				checked = n.attributes.checked;
			} else if (checked !== n.attributes.checked) {
				checked = this.grayedValue;
				return false;
			}
		}, this);
		this.toggleCheck(checked);
	},
	updateChild : function(checked) {
		if (typeof checked == 'boolean') {
			this.isUpdating = true;
			this.node.eachChild(function(n) {
				n.getUI().toggleCheck(checked);
			}, this);
			delete this.isUpdating;
		}
	}
});
/**
 * 重写使异步树支持级联功能
 */
Ext.tree.AsynchTriStateNodeUI = Ext.extend(Ext.tree.TriStateNodeUI, {
	updateChild : function(checked) {
		// if(this.checkbox){
		// if(checked === true){
		// Ext.fly(this.ctNode).replaceClass('x-tree-branch-unchecked', 'x-tree-branch-checked');
		// } else if(checked === false){
		// Ext.fly(this.ctNode).replaceClass('x-tree-branch-checked', 'x-tree-branch-unchecked');
		// } else {
		// Ext.fly(this.ctNode).removeClass(['x-tree-branch-checked', 'x-tree-branch-unchecked']);
		// }
		// }
		if (typeof checked == 'boolean') {
			this.isUpdating = true;
			this.node.eachChild(function(n) {
				n.getUI().render();
				n.getUI().toggleCheck(checked);
			}, this);
			delete this.isUpdating;
		}
	},
	getChecked : function() {
		var checked = this.node.parentNode ? this.node.parentNode.ui.getChecked() : this.grayedValue;
		return typeof checked == 'boolean' ? checked : Ext.tree.TriStateNodeUI.superclass.getChecked.call(this);
	}
});
/**
 * 通知扩展类,暂时只支持bottom-right方向，后面会扩展
 */
Ext.ux.NotificationMgr = {
	notifications : [],
	originalBodyOverflowY : null
};

Ext.ux.Notification = Ext.extend(Ext.Window, {

	/**
	 * 设置是否显示
	 */
	notShow : false,//
	inited : false,

	initComponent : function() {
		Ext.apply(this, {
			iconCls : this.iconCls || 'x-icon-information',
			cls : 'x-notification',
			width : this.width || 200,
			autoHeight : true,
			plain : false,
			// draggable : false,
			shadow : false,
			bodyStyle : 'text-align:center'
		});
		if (this.autoDestroy) {
			this.task = new Ext.util.DelayedTask(this.hide, this);
		} else {
			this.closable = true;
		}
		Ext.ux.Notification.superclass.initComponent.apply(this);
	},
	setMessage : function(msg) {
		this.body.update(msg);
	},
	setTitle : function(title, iconCls) {
		Ext.ux.Notification.superclass.setTitle.call(this, title, iconCls || this.iconCls);
	},
	onDestroy : function() {
		Ext.ux.NotificationMgr.notifications.remove(this);
		Ext.ux.Notification.superclass.onDestroy.call(this);
	},
	cancelHiding : function() {
		this.addClass('fixed');
		if (this.autoDestroy) {
			this.task.cancel();
		}
	},
	afterShow : function() {
		Ext.ux.Notification.superclass.afterShow.call(this);
		Ext.fly(this.body.dom).on('click', this.cancelHiding, this);
		if (this.autoDestroy) {
			// this.task.delay(this.hideDelay || 5000);
		}
	},
	animShow : function() {
		if (!this.notShow) {
			// save original body overflowY
			// if (Ext.ux.NotificationMgr.originalBodyOverflowY == null) {
			// Ext.ux.NotificationMgr.originalBodyOverflowY = document.body.style.overflowY;
			// }

			// if the body haven't horizontal scrollbar it should
			// not appear
			if (document.body.clientHeight == document.body.scrollHeight) {
				document.body.style.overflowY = 'hidden';
			}

			this.setSize(this.width || 200, 100);
			var pos = [];
			if (this.inited) {
				pos = this.getPosition();
			} else {// 默认设为最右下角
				var viewSize = Ext.getBody().getViewSize();
				pos.push(viewSize.width - 260, viewSize.height - 150);
				this.setPosition(pos);
			}
			this.el.alignTo(document.body, "tl-tl", pos);

			// this.el.slideIn('b', {
			// duration : 1,
			// callback : this.afterShow,
			// scope : this
			// });//需要在ie中修复才行打开
			this.afterShow();
			this.inited = true;
		}
	},
	animHide : function() {
		// this.el.ghost("b",{
		// duration : 1,
		// remove : false,
		// callback : function() {
		// Ext.ux.NotificationMgr.notifications
		// .remove(this);
		//	
		// if (Ext.ux.NotificationMgr.notifications.length == 0) {
		// document.body.style.overflowY = Ext.ux.NotificationMgr.originalBodyOverflowY;
		// }

		// this.destroy();
		// this.hide();
		// }.createDelegate(this)

		// });
		this.el.hide();
		this.afterHide();

		// this.notShow = true;
	},
	show : function(animateTarget, cb, scope) {
		if (!this.rendered) {
			this.render(Ext.getBody());
		}
		// if(this.hidden === false){
		// this.toFront();
		// return this;
		// }
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
		return this;
	},
	focus : Ext.emptyFn
});
/**
 * 添加自定义的类型
 */
Ext.apply(Ext.form.VTypes, {
	/**
	 * 时间范围验证
	 * 
	 * @param val
	 * @param field
	 * @returns {Boolean}
	 */
	daterange : function(val, field) {

		var date = field.parseDate(val);

		// We need to force the picker to update values to recaluate the disabled dates display
		var dispUpd = function(picker) {
			var ad = picker.activeDate;
			picker.activeDate = null;
			picker.update(ad);
		};

		if (field.startDateField) {
			var sd = Ext.getCmp(field.startDateField);
			sd.maxValue = date;
			if (sd.menu && sd.menu.picker) {
				sd.menu.picker.maxDate = date;
				dispUpd(sd.menu.picker);
			}
		} else if (field.endDateField) {
			var ed = Ext.getCmp(field.endDateField);
			ed.minValue = date;
			if (ed.menu && ed.menu.picker) {
				ed.menu.picker.minDate = date;
				dispUpd(ed.menu.picker);
			}
		}
		return true;
	},
	/**
	 * 开始时间必须小于结束时间验证
	 * @param val
	 * @param field
	 * @returns {Boolean}
	 */
	beginAndEndDateCheck : function(val, field) {
		if (field.beginAndEndDateCheck) {
			//获取与之比较的对象
			var cmp = Ext.getCmp(field.beginAndEndDateCheck.targetCmpId);
			//标示为开始时间或者 结束时间
			var isEnd = field.beginAndEndDateCheck.isEnd;
			if (Ext.isEmpty(cmp)) { // 如果组件（表单）不存在，提示错误
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '发生异常错误，指定的组件未找到';
				win.show();
				return false;
			}
			if(isEnd){
				if (val >= Ext.util.Format.date(cmp.getValue(),'Y-m-d H:i:s')) {
					//清除提示
					cmp.clearInvalid();
					return true;
				} else {
					return false;
				}
			} else {
				if (val <= Ext.util.Format.date(cmp.getValue(),'Y-m-d H:i:s')) {
					cmp.clearInvalid();
					return true;
				} else {
					return false;
				}
			}
		}
	},
	beginAndEndDateCheckText : '开始时间必须小于结束时间'
});
/**
 * 修复验证时侯把当前的maxValue与minValue重置
 */
Ext.override(Ext.form.DateField, {
	getErrors : function(value) {
		var errors = Ext.form.DateField.superclass.getErrors.apply(this, arguments);

		value = this.formatDate(value || this.processValue(this.getRawValue()));

		if (value.length < 1) { // if it's blank and textfield didn't flag it then it's valid
			return errors;
		}

		var svalue = value;
		value = this.parseDate(value);
		if (!value) {
			errors.push(String.format(this.invalidText, svalue, this.format));
			return errors;
		}

		var time = value.getTime();
		if (this.minValue && time < this.minValue.getTime()) {// fix not clearTime
			errors.push(String.format(this.minText, this.formatDate(this.minValue)));
		}

		if (this.maxValue && time > this.maxValue.getTime()) {// fix not clearTime
			errors.push(String.format(this.maxText, this.formatDate(this.maxValue)));
		}

		if (this.disabledDays) {
			var day = value.getDay();

			for ( var i = 0; i < this.disabledDays.length; i++) {
				if (day === this.disabledDays[i]) {
					errors.push(this.disabledDaysText);
					break;
				}
			}
		}

		var fvalue = this.formatDate(value);
		if (this.disabledDatesRE && this.disabledDatesRE.test(fvalue)) {
			errors.push(String.format(this.disabledDatesText, fvalue));
		}

		return errors;
	}
});

/**
 * 重写FormPanel，使得默认下标签右对其
 */
Ext.override(Ext.form.FormPanel, {
	labelAlign : 'right'
});

/**
 * 重写FormLayout，使得必填项加星号格式统一
 */
Ext.override(Ext.layout.FormLayout, {
	fieldTpl : (function() {
		// var t = new Ext.Template('<div class="x-form-item {itemCls}" tabIndex="-1">', '<label for="{id}" style="{labelStyle}" class="x-form-item-label">{label}{labelSeparator}</label>',
		var t = new Ext.Template('<div class="x-form-item {itemCls}" tabIndex="-1">', '<label style="{labelStyle}" class="x-form-item-label">{label}{labelSeparator}</label>',
				'<span class="{requiredStyle}">{requiredText}</span>', '<div class="x-form-element" id="x-form-el-{id}" style="{elementStyle}">', '</div><div class="{clearCls}"></div>', '</div>');
		t.disableFormats = true;
		return t.compile();
	})(),
	setContainer : function(ct) {
		Ext.layout.FormLayout.superclass.setContainer.call(this, ct);
		if (ct.labelAlign) {
			ct.addClass('x-form-label-' + ct.labelAlign);
		}

		if (ct.hideLabels) {
			Ext.apply(this, {
				labelStyle : 'display:none',
				elementStyle : 'padding-left:0;',
				labelAdjust : 0
			});
		} else {
			this.labelSeparator = Ext.isDefined(ct.labelSeparator) ? ct.labelSeparator : this.labelSeparator;
			ct.labelWidth = ct.labelWidth || 100;
			var requiredTextWidth = 10;
			if (Ext.isNumber(ct.labelWidth)) {
				var pad = Ext.isNumber(ct.labelPad) ? ct.labelPad : 5;
				Ext.apply(this, {
					labelAdjust : ct.labelWidth + pad + requiredTextWidth,
					labelStyle : 'width:' + ct.labelWidth + 'px;',
					elementStyle : 'padding-left:' + (ct.labelWidth + pad + requiredTextWidth) + 'px'
				});
			}
			if (ct.labelAlign == 'top') {
				Ext.apply(this, {
					labelStyle : 'width:auto;',
					labelAdjust : 0,
					elementStyle : 'padding-left:0;'
				});
			}
		}
	},
	getTemplateArgs : function(field) {
		var noLabelSep = !field.fieldLabel || field.hideLabel, itemCls = (field.itemCls || this.container.itemCls || '') + (field.hideLabel ? ' x-hide-label' : '');

		if (Ext.isIE9 && Ext.isIEQuirks && field instanceof Ext.form.TextField) {
			itemCls += ' x-input-wrapper';
		}

		var allowBlank = typeof field.allowBlank == 'undefined' || field.allowBlank;
		return {
			id : field.id,
			requiredText : allowBlank ? '&nbsp;' : '*',
			requiredStyle : allowBlank ? 'x-form-field-notrequired' : 'x-form-field-required',
			label : field.fieldLabel,
			itemCls : itemCls,
			clearCls : field.clearCls || 'x-form-clear-left',
			labelStyle : this.getLabelStyle(field.labelStyle),
			elementStyle : this.elementStyle || '',
			labelSeparator : noLabelSep ? '' : (Ext.isDefined(field.labelSeparator) ? field.labelSeparator : this.labelSeparator)
		};
	}
});

//Ext.debug = function() {
////	if (typeof console != 'undefined') {
////		if (typeof console.log == 'function')
////			console.log.apply(console, arguments);
////		else if (typeof console.log == 'object')
////			Function.prototype.apply.apply(console.log, [ console, arguments ]);
////	}
//};

Ext.override(Ext.form.CompositeField, {
	/**
 	* 覆盖CompositeField 只提示验证信息，不提示哪个字段
 	*/
	buildCombinedErrorMessage : function(errors) {
		var combined = [], error;
		for ( var i = 0, j = errors.length; i < j; i++) {
			error = errors[i];
			// combined.push(String.format("{0}: {1}", error.errorName, error.error));
			combined.push(error.error);
		}
		return combined.join("<br />");
	},
	/**
	 * 覆盖onRender方法，将label for 去掉
	 */
	onRender: function(ct, position) {
        if (!this.el) {
            /**
             * @property innerCt
             * @type Ext.Container
             * A container configured with hbox layout which is responsible for laying out the subfields
             */
            var innerCt = this.innerCt;
            innerCt.render(ct);
            this.innerCt.ownerCt = this;

            this.el = innerCt.getEl();

            //if we're combining subfield errors into a single message, override the markInvalid and clearInvalid
            //methods of each subfield and show them at the Composite level instead
            if (this.combineErrors) {
                this.eachItem(function(field) {
                    Ext.apply(field, {
                        markInvalid : this.onFieldMarkInvalid.createDelegate(this, [field], 0),
                        clearInvalid: this.onFieldClearInvalid.createDelegate(this, [field], 0)
                    });
                });
            }
            //set the label 'for' to the first item
            var l = this.el.parent().parent().child('label', true);
            if (l) {
//                l.setAttribute('for', this.items.items[0].id);
            }
        }
        Ext.form.CompositeField.superclass.onRender.apply(this, arguments);
    }
});
/**
 * 重写Viewport,修复在ie浏览器有时getBody引起布局问题
 */
Ext.override(Ext.Viewport, {
	initComponent : function() {
		Ext.Viewport.superclass.initComponent.call(this);
		document.getElementsByTagName('html')[0].className += ' x-viewport';
		this.el = Ext.select('body').item(0);// 修复在ie浏览器有时getBody引起布局问题
		this.el.setHeight = Ext.emptyFn;
		this.el.setWidth = Ext.emptyFn;
		this.el.setSize = Ext.emptyFn;
		this.el.dom.scroll = 'no';
		this.allowDomMove = false;
		this.autoWidth = true;
		this.autoHeight = true;
		Ext.EventManager.onWindowResize(this.fireResize, this);
		this.renderTo = this.el;
	}
});
//复写JsonReader的extractValues方法
Ext.override(Ext.data.JsonReader, {
	extractValues : function(data, items, len) {
        var f, values = {};
        for(var j = 0; j < len; j++){
            f = items[j];
            try{
            	//捕捉异常 null.xx.xx
            	var v = this.ef[j](data);
            }catch(e){v="";}
            values[f.name] = f.convert((v !== undefined) ? v : f.defaultValue, data);
        }
        return values;
    }
});
/**
 * 列默认居中
 */
Ext.override(Ext.grid.Column,{
	align:'center'
});
/**
 * 添加自动消失的提示框 
 */
Ext.apply(Ext.MessageBox,{
	/**
	 * 
	 * @param title
	 * @param msg
	 * @param fn
	 * @param scope
	 * @param duration 提示框持续显示时间 毫秒
	 */
	lightningShow:function(title, msg, fn, scope,duration){
		var job = Ext.createInterceptor(this.hide,fn||Ext.emptyFn).defer(duration||2000,this);
		fn = fn&&Ext.createInterceptor( fn, function(){clearTimeout(job);}, this);
		 this.show({
             title : title,
             msg : msg,
             buttons: this.OK,
             fn: fn,
             scope : scope,
             minWidth: this.minWidth
         });
         return this;
	}
});
/**
 * 新增车牌验证
 */
Ext.apply(Ext.form.VTypes, {
	carNum : function(value,field) {
		value=value.toUpperCase();
		return Jinpeng.CarNumValidator.validateAll(value);
	},
	carNumText:'请输入正确的车牌号码'

});

/**
 * 车牌号码自动转大写
 */
Ext.apply(Ext.form.VTypes, {
	carNumUpper : function(value,field) {
		value=value.toUpperCase();
		return value;
	}

});

/**
 * 布控车牌验证，现在可以变模糊布控了，因此这里只自动大写吧
 */
Ext.apply(Ext.form.VTypes, {
	controlCarNum : function(value,field) {
	    carNum = value.toUpperCase();
		// 特殊车 警车 教练车 港澳车等 符合 【汉字】【大写字母】XXXX【汉字】
		var RE1 = /^[\u4E00-\u9FFF\?]{1}[A-Z\?]{1}[A-Z0-9\?]{4}[\u4E00-\u9FFF\?]$/;
		// 武警
		var RE2 = /^WJ(([0-2\?]{1}[0-9\?]{1})|([3\?]{1}[0-4\?]{1}))[A-Z0-9\?]{5}$/;
		// 新军车车牌
		var RE3 = /^[A-Z\?]{2}[0-9\?]{5}$/;
		//新武警
		var RE4 = /^WJ[\u4E00-\u9FFF\?][A-Z0-9\?]{0,5}$/;
	    //正常车牌正则
	    var regex = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
	    //这个是车牌带*或?的符号的正则
	    var RE5 = /^[\u4E00-\u9FFF\?]{1}[A-Z\?]{1}[A-Z_0-9\?]{5}$/;
	    var returnString = regex.test(carNum) || RE1.test(carNum) || RE2.test(carNum) || RE3.test(carNum) || RE4.test(carNum) || RE5.test(carNum);
	    return  returnString;

//		value = value.toUpperCase();
//		if(!Jinpeng.FuzzyCarNumValidator.validateAll(value)){
//			 field.regexText='请输入正确的车牌号码';
//		}
//		return Jinpeng.FuzzyCarNumValidator.validateAll(value);
	},
	controlCarNumText:'请输入正确的车牌号码'
});

/**
 * 布控车牌验证，现在可以变模糊布控了，因此这里只自动大写吧
 */
Ext.apply(Ext.form.VTypes, {
	exactCarNum : function(value,field) {
	    carNum = value.toUpperCase();
		// 特殊车 警车 教练车 港澳车等 符合 【汉字】【大写字母】XXXX【汉字】
		var RE1 = /^[\u4E00-\u9FFF]{1}[A-Z]{1}[A-Z0-9]{4}[\u4E00-\u9FFF]$/;
		// 武警
		var RE2 = /^WJ(([0-2]{1}[0-9]{1})|([3]{1}[0-4]{1}))[A-Z0-9]{5}$/;
		// 新军车车牌
		var RE3 = /^[A-Z]{2}[0-9]{5}$/;
		//新武警
		var RE4 = /^WJ[\u4E00-\u9FFF][A-Z0-9]{0,5}$/;
	    //正常车牌正则
	    var regex = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
	    var returnString = regex.test(carNum) || RE1.test(carNum) || RE2.test(carNum) || RE3.test(carNum) || RE4.test(carNum);
	    return  returnString;
	},
	exactCarNumText:'请输入标准的车牌号码'
});

/**
 * 新增车牌验证，没有前面的省级标示
 */
Ext.apply(Ext.form.VTypes, {
	carNumSuffix : function(value,field) {
        //'\u8b66','\u5b66','\u9886','\u8bd5','\u6302','\u6e2f','\u6fb3','\u8d85','\u4f7f'
		//将字段的值大写
		value=value.toUpperCase();
//		field.setRawValue(value);
		var regex =/^[A-Z0-9\u8b66\u5b66\u9886\u8bd5\u6302\u6e2f\u6fb3\u8d85\u4f7f\?\*]+$/;
		var regex1 = /([\u4E00-\u9FFF]{2,})|([\u4E00-\u9FFF]+[A-Z0-9\?\*]+)/;
		return regex.test(value) && !regex1.test(value) && (value.indexOf("**")==-1)&&(value.length<11);
	},
	carNumSuffixText:'请输入正确的车牌号码'

});
/**
 * 严格没带省级标识的车牌验证vytype
 */
Ext.apply(Ext.form.VTypes, {
	carNumVelidate : function(value,field) {
		var special=['警','学','领','试','挂','港','澳','超','使'];
		//将字段的值大写
		value=value.toUpperCase();
//		field.setRawValue(value);
		var regex =/^[A-Z\?]{1}[A-Z0-9\?]{4}[A-Z0-9\u4E00-\u9FFF\?]{1}$/;
		return regex.test(value)&&(special.indexOf(value.substr(value.length-1,1))>-1||/^[A-Z0-9\?]{1}$/.test(value.substr(value.length-1,1)));
	},
	carNumVelidateText:'请输入正确的车牌号码'

});
/**
 * 新增ip地址验证vtype
 */
Ext.apply(Ext.form.VTypes, {
	IP : function(value) {
		var regex =/^(([0-9]|([1-9][0-9])|(1[0-9][0-9])|([2][0-4][0-9])|(25[0-5]))\.){3}([0-9]|([1-9][0-9])|(1[0-9][0-9])|([2][0-4][0-9])|(25[0-5]))$/;
		return regex.test(value);
	},
	IPText:'IP地址格式不正确'
});

Ext.apply(Ext.form.VTypes, {
	memoTip : function(value) {
		var regex =/^\S{2,25}$/;
		return regex.test(value);
	},
	memoTipText:'输入标签必须介于2--25个字符之间'
});

Ext.apply(Ext.form.VTypes, {
	time_hh_mm : function(value) {
		var regex =/^(([01][0-9])|(2[0-3])):([0-5][0-9])$/;
		return regex.test(value);
	},
	time_hh_mmText:'请输入正确的时间！'
});
/**
 * 开始结束时间验证
 */
Ext.apply(Ext.form.VTypes, {
	beginEndDate : function(val, field) {
		//以下日期转换方法为日期型控件特有方法
		var date = field.parseDate(val);
		if (field.startDateField) {
			var startdate = Ext.getCmp(field.startDateField);
			if (startdate && startdate.getValue() >= date) {
				return false;
			} else {
				startdate.clearInvalid();
				return true;
			}
		} else if (field.endDateField) {
			var enddate = Ext.getCmp(field.endDateField);
			if (enddate && enddate.getValue() <= date) {
				return false;
			} else {
				enddate.clearInvalid();
				return true;
			}
		}
	},
	beginEndDateText : '结束时间必须大于开始时间'
});

/**
 * 历史查询页面开始时间与结束时间验证,开始时间必须小于结束时间,且必须为相同月份！
 */
Ext.apply(Ext.form.VTypes, {
	beginEndDateLimit : function(value, field) {
		var date = field.parseDate(value);
		//Ext.debug("date:"+date);
		if (field.startDateField) {
			var sd = Ext.getCmp(field.startDateField);
			if(sd.getValue() > date) 
				return false;
			//结束时间减去开始时间，其值不能大于30天。
			//else if ((date-sd.getValue()) > 30*24*3600*1000)
			//	return false;
//			else if(date.getFullYear() != sd.getValue().getFullYear() || date.getMonth() != sd.getValue().getMonth())
//				return false;
			else 
				sd.clearInvalid();
		} else if (field.endDateField) {
			var ed = Ext.getCmp(field.endDateField);
			if(ed.getValue() < date) 
				return false;
			//结束时间减去开始时间，其值不能大于30天。
			//else if((ed.getValue()-date) > 30*24*3600*1000)
			//	return false;
//			else if(date.getFullYear() != ed.getValue().getFullYear() || date.getMonth() != ed.getValue().getMonth())
//				return false;
			else
				ed.clearInvalid();
		}
		return true;
	},
	beginEndDateLimitText:'开始时间必须小于结束时间,且必须为相同月份！'
});

/**
 * 车速0--300公里限制
 */
Ext.apply(Ext.form.VTypes, {
	carSpeedRange : function(value, field){
		reg = /^(0|([1-9])|([1-9][0-9])|([1-2][0-9][0-9])|300)$/;
		return reg.test(value);
	},
	carSpeedRangeText : '车速只能是数字,且必须介于0--300之间！'
});

/**
 * 结束时间需大于当前时间
 */
Ext.apply(Ext.form.VTypes, {
	overDate : function(value, field){
		var now =  Date.parseDate(Ext.util.Format
				.date(new Date(), 'Y-m-d')
				+ " " + "23:59:59", 'Y-m-d H:i:s');
		value = Date.parseDate(value, 'Y-m-d H:i:s');
		return value >= now;
	},
	overDateText : '结束时间必须大于开始时间'
});
//覆盖BasicForm的个体FieldValues 使其可以得到disabled的字段
Ext.override(Ext.form.BasicForm,{
	getFieldValues:function(dirtyOnly){
		  var o = {},
	      n,
	      key,
	      val;
	  this.items.each(function(f) {
	    //  if (!f.disabled && (dirtyOnly !== true || f.isDirty())) {
		  if (dirtyOnly !== true || f.isDirty()) {
	          n = f.getName();
	          key = o[n];
	          val = f.getValue();

	          if(Ext.isDefined(key)){
	              if(Ext.isArray(key)){
	                  o[n].push(val);
	              }else{
	                  o[n] = [key, val];
	              }
	          }else{
	              o[n] = val;
	          }
	      }
	  });
	  return o;
	}
});

/**
 * 伴随车功能车牌验证
 */
Ext.apply(Ext.form.VTypes, {
	trackCarNum : function(value,field) {
		value=value.toUpperCase();
//		field.setRawValue(value);
		return Jinpeng.TrackCarNumValidator.validateTraceCar(value);
	},
	trackCarNumText:'请输入正确的车牌号码'

});

//覆盖BasicForm的个体FieldValues 使其可以得到disabled的字段
Ext.override(Ext.form.TextField,{
	initComponent : function(){

		Ext.form.TextField.superclass.initComponent.call(this);
	    this.addEvents(
	        /**
	         * @event autosize
	         * Fires when the <tt><b>{@link #autoSize}</b></tt> function is triggered. The field may or
	         * may not have actually changed size according to the default logic, but this event provides
	         * a hook for the developer to apply additional logic at runtime to resize the field if needed.
	         * @param {Ext.form.Field} this This text field
	         * @param {Number} width The new field width
	         */
	        'autosize',

	        /**
	         * @event keydown
	         * Keydown input field event. This event only fires if <tt><b>{@link #enableKeyEvents}</b></tt>
	         * is set to true.
	         * @param {Ext.form.TextField} this This text field
	         * @param {Ext.EventObject} e
	         */
	        'keydown',
	        /**
	         * @event keyup
	         * Keyup input field event. This event only fires if <tt><b>{@link #enableKeyEvents}</b></tt>
	         * is set to true.
	         * @param {Ext.form.TextField} this This text field
	         * @param {Ext.EventObject} e
	         */
	        'keyup',
	        /**
	         * @event keypress
	         * Keypress input field event. This event only fires if <tt><b>{@link #enableKeyEvents}</b></tt>
	         * is set to true.
	         * @param {Ext.form.TextField} this This text field
	         * @param {Ext.EventObject} e
	         */
	        'keypress'
	    );
	    //如果是车牌验证，自动大写
	    if(this.vtype == 'carNumSuffix'||this.vtype == 'carNum'||this.vtype == 'carNumVelidate'||this.vtype == 'trackCarNum'||this.vtype == 'controlCarNum'||this.vtype == 'carNumUpper'||this.vtype == 'exactCarNum'){
	    	Ext.apply(this, {style:{textTransform: "uppercase"}});
	    }
	},
	 getValue : function(){
	        if(!this.rendered) {
	        	//如果是车牌验证，自动大写
	        	if(this.vtype == 'carNumSuffix'||this.vtype == 'carNum'||this.vtype == 'carNumVelidate'||this.vtype == 'trackCarNum'||this.vtype == 'controlCarNum'||this.vtype == 'carNumUpper'||this.vtype == 'exactCarNum'){
	        		return null == value?value:this.value.toUpperCase();
			    }
	            return this.value;
	        }
	        var v = this.el.getValue();
	        if(v === this.emptyText || v === undefined){
	            v = '';
	        }
	        if(this.vtype == 'carNumSuffix'||this.vtype == 'carNum'||this.vtype == 'carNumVelidate'||this.vtype == 'trackCarNum'||this.vtype == 'controlCarNum'||this.vtype == 'carNumUpper'||this.vtype == 'exactCarNum'){
        		return null == v?v:v.toUpperCase();
		    }
	        return v;
	 }

});

Ext.override(Ext.grid.CheckboxSelectionModel,{
	// private
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
	}
});
