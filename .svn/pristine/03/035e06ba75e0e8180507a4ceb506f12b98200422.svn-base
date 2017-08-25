/**
 * 这里是Teon所需要用到的基础控件
 * 
 * @ignore
 */

Ext.ns('Ext.twidget.layout');
Ext.ns('Jinpeng.twidget');
Ext.ns('Jinpeng.menu');
Ext.ns('Jinpeng.system.user');

var parts = [];

Ext.twidget.layout.TTableLayout = Ext.extend(Ext.layout.TableLayout, {
	type : 'ttable',
	labelSeparator : ':',
	noLabelElementStyle : 'padding-left:0;',
	setContainer : function(ct) {
		Ext.twidget.layout.TTableLayout.superclass.setContainer.call(this, ct);
		ct.labelAlign = ct.labelAlign || this.labelAlign;
		if (ct.labelAlign) {
			ct.addClass('x-form-label-' + ct.labelAlign);
		}

		if (ct.hideLabels || this.hideLabels) {
			Ext.apply(this, {
				labelStyle : 'display:none',
				elementStyle : 'padding-left:0;',
				labelAdjust : 0
			});
		} else {
			this.labelSeparator = Ext.isDefined(ct.labelSeparator) ? ct.labelSeparator : this.labelSeparator;
			ct.labelWidth = ct.labelWidth || this.labelWidth || 100;
			if (Ext.isNumber(ct.labelWidth)) {
				var pad = ct.labelPad || this.labelPad;
				var requiredTextWidth = 10;
				pad = Ext.isNumber(pad) ? pad : 5;
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
	fieldTpl : (function() {
//		var t = new Ext.Template('<div class="x-form-item {itemCls}" tabIndex="-1">', '<label for="{id}" style="{labelStyle}" class="{labelCls}">', '{label}{labelSeparator}</label>',
		var t = new Ext.Template('<div class="x-form-item {itemCls}" tabIndex="-1">', '<label style="{labelStyle}" class="{labelCls}">', '{label}{labelSeparator}</label>',
				'<span class="{requiredStyle}">{requiredText}</span>', '<div class="x-form-element" id="x-form-el-{id}" style="{elementStyle}">', '</div><div class="{clearCls}"></div>', '</div>');
		t.disableFormats = true;
		return t.compile();
	})(),
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
			labelCls : field.fieldLabel ? 'x-form-item-label' : '',
			labelStyle : this.getLabelStyle(field.labelStyle),
			elementStyle : field.fieldLabel ? this.elementStyle || '' : this.noLabelElementStyle || '',
			labelSeparator : noLabelSep ? '' : (Ext.isDefined(field.labelSeparator) ? field.labelSeparator : this.labelSeparator)
		};
	},
	getLabelStyle : function(s) {
		var ls = '', items = [ this.labelStyle, s ];
		for ( var i = 0, len = items.length; i < len; ++i) {
			if (items[i]) {
				ls += items[i];
				if (ls.substr(-1, 1) != ';') {
					ls += ';';
				}
			}
		}
		return ls;
	},
	renderItem : function(c, position, target) {
		// Ensure we have our inner table to get cells to render
		// into.
		if (!this.table) {
			this.table = target.createChild(Ext.apply({
				tag : 'table',
				cls : 'x-table-layout',
				cellspacing : 0,
				cn : {
					tag : 'tbody'
				}
			}, this.tableAttrs), null, true);
		}

		if (c && !c.rendered) {

			//
			var nextCell = this.getNextCell(c);

			var itemCt = null;
			if (c && (c.isFormField || c.fieldLabel) && c.inputType != 'hidden') {
				var args = this.getTemplateArgs(c);
				c.itemCt = this.fieldTpl.append(nextCell, args, true);
				if (!c.getItemCt) {
					Ext.apply(c, {
						getItemCt : function() {
							return c.itemCt;
						},
						customItemCt : true
					});
				}
				c.label = c.getItemCt().child('label.x-form-item-label');
				if (!c.rendered) {
					c.render('x-form-el-' + c.id);
				} else {
					Ext.fly('x-form-el-' + c.id).appendChild(c.getPositionEl());
				}
				if (this.trackLabels) {
					if (c.hidden) {
						this.onFieldHide(c);
					}
					c.on({
						scope : this,
						show : this.onFieldShow,
						hide : this.onFieldHide
					});
				}
				this.configureItem(c);
			} else {
				c.render(nextCell);
				this.configureItem(c);
			}

		} else if (c && !this.isValidParent(c, target)) {
			var container = this.getNextCell(c);
			container.insertBefore(c.getPositionEl().dom, null);
			c.container = Ext.get(container);
			this.configureItem(c);
		}

	},
	isValidParent : function(c, target) {
		try {
			return c.getPositionEl().up('table', 10).dom.parentNode === (target.dom || target);
		} catch (e) {
			return false;
		}
	},
	getNextCell : function(c) {
		var cell = this.getNextNonSpan(this.currentColumn, this.currentRow);
		var curCol = this.currentColumn = cell[0], curRow = this.currentRow = cell[1];
		for ( var rowIndex = curRow; rowIndex < curRow + (c.rowspan || 1); rowIndex++) {
			if (!this.cells[rowIndex]) {
				this.cells[rowIndex] = [];
			}
			for ( var colIndex = curCol; colIndex < curCol + (c.colspan || 1); colIndex++) {
				this.cells[rowIndex][colIndex] = true;
			}
		}
		var td = document.createElement('td');
		if (c.cellId) {
			td.id = c.cellId;
		}
		var cls = 'x-table-layout-cell';
		if (c.cellCls) {
			cls += ' ' + c.cellCls;
		}
		td.className = cls;
		if (c.colspan) {
			td.colSpan = c.colspan;
		}
		if (c.rowspan) {
			td.rowSpan = c.rowspan;
		}
		if (c.cellWidth) {
			td.width = c.cellWidth;
		}
		if (c.cellAlign) {
			td.align = c.cellAlign;
		}
		if (c.cellValign) {
			td.valign = c.cellValign;
		}
		this.getRow(curRow).appendChild(td);
		return td;
	}
});

Ext.Container.LAYOUTS['ttable'] = Ext.twidget.layout.TTableLayout;

/**
 * @class Jinpeng.system.user.UserChooseWindow
 * @extends Ext.Viewport
 * @author Teon
 * 
 * 选择用户窗口
 * 
 * @constructor 创建一个UserChooseWindow
 * @param {Object} [config] 配置信息
 */
Jinpeng.system.user.UserChooseWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	/**
	 * @cfg {String} [title=选择账号] 标题
	 */
	title : '选择账号',
	/**
	 * @cfg {Number} [width=400] 宽度
	 */
	width : 400,
	/**
	 * @cfg {Number} [height=450] 高度
	 */
	height : 450,
	/**
	 * @cfg {String} [layout=border] 布局
	 */
	layout : 'border',
	/**
	 * @cfg {Function} [callback] 窗口关闭的回调函数，参数如下
	 * 
	 * <div class="mdetail-params">
	 * <ul>
	 * <li><code>result</code> : Object <div class="sub-desc">选中的记录</div></li>
	 * </ul>
	 * </div>
	 */
	callback : null,
	buttons : [ {
		text : '确定',
		handler : function(btn, event) {
			var window = btn.ownerCt.ownerCt;
			var aaa = window.get(0).selections;
			window.closeWindow(window.get(0).selections);
		}
	}, {
		text : '取消',
		handler : function(btn, event) {
			btn.ownerCt.ownerCt.closeWindow(false);
		}
	} ],
	constructor : function(config) {
		Ext.apply(this, config);
		this.items = [ this.chooser = new Jinpeng.system.user.UserChoosePanel({
			margins : '5',
			region : 'center'
		}) ];
		Jinpeng.system.user.UserChooseWindow.superclass.constructor.apply(this, arguments);
	},
	/**
	 * 初始化数据
	 */
	init : function(data) {
		this.chooser.init(data);
	},
	/**
	 * 关闭窗口，并执行回调函数
	 */
	closeWindow : function(returnValue) {
		if (typeof this.callback == 'function') {
			this.callback({
				data : returnValue
			});
		}
		this.close();
	}
});

/**
 * @class Jinpeng.system.user.UserChoosePanel
 * @extends Ext.Panel
 * @author Teon
 * 
 * 选择用户面板
 * 
 * @constructor 创建一个UserChoosePanel
 * @param {Object} [config] 配置信息
 */
Jinpeng.system.user.UserChoosePanel = Ext.extend(Ext.Panel, {
	/**
	 * @cfg {String} [layout=border] 布局
	 */
	layout : 'border',
	/**
	 * @cfg {Boolean} [border=false] 是否具有边框
	 */
	border : false,
	/**
	 * @cfg {String} [selectedLabel=已选] “选中的用户”的标签
	 */
	selectedLabel : '已选',
	/**
	 * @property {Array} selections 选中的记录
	 */
	selections : [],
	constructor : function(config) {

		Ext.apply(this, config);

		/* 当前面板 */
		var panel = this;

		/* 用户检索栏 */
		this.treeSearchPanel = new Ext.Panel({
			layout : 'column',
			region : 'north',
			autoHeight : true,
			border : false,
			bodyStyle : 'padding:5px 0',
			defaults : {
				border : false,
				autoHeight : true
			},
			items : [ {
				width : 32,
				layout : 'anchor',
				items : {
					xtype : 'label',
					anchor : '-5',
					text : '搜索:'
				}
			}, {
				columnWidth : 1,
				layout : 'anchor',
				items : {
					xtype : 'textfield',
					anchor : '-5',
					itemId : 'keyword'
				}
			}, {
				width : 70,
				layout : 'anchor',
				items : {
					xtype : 'button',
					anchor : '100%',
					bodyStyle : 'margin:0',
					text : '搜索',
					handler : function(btn, event) {
						try {
							var searchPanel = btn.ownerCt.ownerCt;
							var kwField = searchPanel.find('itemId', 'keyword').first();
							var keyword = kwField ? kwField.getValue() : null;
							panel.searchHandler(keyword);
						} catch (e) {
						}
					}
				}
			} ]
		});

		/* 用户检索栏 */
		this.gridSearchPanel = this.treeSearchPanel.cloneConfig();

		/* 用户列表 */
		this.userGrid = new Jinpeng.widget.SimpleUserGrid({
			itemId : 'usergrid',
			paging : false,
			rootOwner : panel,
			region : 'center',
			border : true,
			autoLoading : false,
			reload : function(keyword) {
				var store = this.getStore();
				Ext.apply(store.baseParams, {
					'user.loginName' : keyword
				});
				store.reload();
			}
		});

		var fn = function(node, cls) {
			var nodes = Ext.isArray(node) ? node : [ node ];
			for ( var i = 0; i < nodes.length; i++) {
				nodes[i].iconCls = cls;
				if (nodes[i].children && nodes[i].children.length > 0)
					fn(nodes[i].children, cls);
			}
		};

		/* 用户树 */
		this.userTree = new Jinpeng.widget.OrganizationTree({
			itemId : 'usertree',
			dataUrl : rootpath + '/client/system/allOrgTreeMap.action',
			cls : 'orgusertree',
			rootOwner : panel,
			region : 'center',
			border : true,
			showCheckbox : true,
			ignoreCheckStatus : true,
			extraUrl : rootpath + '/client/system/jsonUserList.action',
			extraParams : {
				textProperty : 'realname'
			},
			extraFk : 'orgId',
			reload : function(keyword) {
				var loader = this.getLoader();
				Ext.apply(loader.extraBaseParams, {
					'realName' : keyword
				});
				this.init();
			},
			processResponseData : function(data) {
				fn(data, 'icon-domain-normal');
				return data;
			},
			processExtraData : function(data) {
				fn(data, 'x-node-staff');
				return data;
			}
		});

		/* 选项卡面板 */
		this.tabPanel = new Ext.TabPanel({
			itemId : 'tab',
			rootOwner : panel,
			xtype : 'tabpanel',
			region : 'center',
			border : false,
			deferredRender:false,//lyj加 默认首次加载渲染所有tab
			activeTab : 0,
			items : [ {
				title : '账号列表',
				itemId : 'gridtab',
				autoShow : false,
				layout : 'border',
				border : false,
				items : [ this.gridSearchPanel, this.userGrid ]
			}, {
				title : '组织',
				itemId : 'treetab',
				layout : 'border',
				autoShow : false,
				border : false,
				items : [ this.treeSearchPanel, this.userTree ]
			} ]
		});

		/* 选项卡切换 */
		this.tabPanel.on('beforetabchange', function(tabpanel, newTab, currentTab) {

			var keyword = '';

			/* 同步关键字 */
			if (newTab && currentTab) {

				var currentKeywordField = currentTab.get(0).get(1).get(0);
				var newKeywordField = newTab.get(0).get(1).get(0);

				keyword = currentKeywordField.getValue();
				newKeywordField.setValue(keyword);

			}

			/* 重新加载数据 */
			if (newTab)
				newTab.get(1).reload(keyword);

		});

		/* 设置选中状态 */
		this.userGrid.getStore().on('load', function(store, records, options) {
			var grid = panel.userGrid;
			var sm = grid.getSelectionModel();
			var s = panel.selections;
			var sr = [];
			for ( var i = 0; i < records.length; i++)
				for ( var t = 0; t < s.length; t++)
					if (records[i].get('id') == s[t].id) {
						sr.push(records[i]);
						break;
					}
			sm.selectRecords(sr);
		});

		/* 选中状态被改变 */
		this.userGrid.getSelectionModel().on('selectionchange', function(sm) {

			var grid = sm.grid;
			var records = grid.getStore().getRange();

			/* 计算选中的数据 */
			var sr = [];
			var sms = sm.getSelections();

			for ( var i = 0; i < sms.length; i++)
				sr.push(sms[i].data);

			/* 计算未选中的数据 */
			var ur = [];
			for ( var i = 0; i < records.length; i++) {
				var find = false;
				for ( var t = 0; t < sr.length; t++)
					if (sr[t].id == records[i].get('id')) {
						find = true;
						break;
					}
				if (!find)
					ur.push(records[i].data);
			}
			panel.recalculateSelections(sr, ur);
		});
		
		//树的选中状态改变处理
        this.userTree.on('checkchange',function(node, checked){
        	var sr = [];//选中数据  
        	/*未选中的数据 */
			var ur = [];
        	var nodes=this.getChecked();
        	for ( var i= 0; i< nodes.length; i++) {
        		var iconCls=nodes[i].attributes.iconCls;
				if(iconCls=='x-node-staff'){
					sr.push(nodes[i].attributes);
				}
			}
        	if(!checked){
        		var iconCls=node.attributes.iconCls;
				if(iconCls=='x-node-staff'){
					ur.push(node.attributes);
				}
        	}
        	panel.recalculateSelections(sr, ur);
        });
		/* 设置选中状态 */
		this.userTree.on('load', function(node) {
			var tree = panel.userTree;
			var s = panel.selections;
			var fn = function(node) {
				for ( var i = 0; i < s.length; i++)			
					if (node.id == s[i].id) {
						node.getUI().toggleCheck(true);
						break;
					}
			}
			node.cascade(fn);
		});

		/* 控件元素 */
		this.items = [ this.tabPanel, {
			xtype : 'form',
			region : 'south',
			autoHeight : true,
			border : false,
			labelWidth : 80,
			labelAlign : 'right',
			margins : '5',
			items : this.selectedUsers = new Ext.form.TextField({
				fieldLabel : this.selectedLabel,
				itemId : 'selected_users',
				name : 'selected_users',
				anchor : '100%'
			})
		} ];

		Jinpeng.system.user.UserChoosePanel.superclass.constructor.apply(this, arguments);
	},
	/**
	 * 初始化数据
	 * 
	 * @param {Array} data 选中的数据（必须含有ID属性）
	 */
	init : function(data) {
		this.recalculateSelections(data, []);
	},
	/**
	 * 搜索行为处理器
	 * 
	 * @private
	 */
	searchHandler : function(keyword) {

		var tab = this.tabPanel.getActiveTab();
		var widget = tab.get(1);
		widget.reload(keyword);

	},
	/**
	 * 重新计算全局选中的数据，并且展示出结果
	 * 
	 * @param {Array} selecteds 选中的数据（必须含有ID属性）
	 * @param {Array} unselecteds 未选中的数据（必须含有ID属性）
	 * @private
	 */
	recalculateSelections : function(selecteds, unselecteds) {
		var rs = [];
		var s = this.selections;

		/* 已经选中的记录要选上 */
		for ( var t = 0; t < selecteds.length; t++) {
			var find = false;
			for ( var i = 0; i < s.length; i++)
				if (selecteds[t].id == s[i].id) {
					find = true;
					break;
				}
			if (!find)
				rs.push(selecteds[t]);
		}

		/* 未被选中的记录要剔除 */
		for ( var i = 0; i < s.length; i++) {
			var find = false;
			for ( var t = 0; t < unselecteds.length; t++)
				if (unselecteds[t].id == s[i].id) {
					find = true;
					break;
				}
			if (!find)
				rs.push(s[i]);
		}

		/* 排序 */
		for ( var i = 0; i < rs.length; i++)
			for ( var t = i + 1; t < rs.length; t++)
				if (rs[i].realName > rs[t].realName) {
					var tmp = rs[i];
					rs[i] = rs[t];
					rs[t] = tmp;
				}

		this.selections = rs;

		this.showSelections();

	},
	/**
	 * 显示选中的数据至文本框
	 * 
	 * @private
	 */
	showSelections : function() {

		var parts = [];
		for ( var i = 0; i < this.selections.length; i++)
			parts.push(this.selections[i].realName);
		var text = parts.join(';');

		this.selectedUsers.setValue(text);

	}
});

/**
 * @class Jinpeng.system.user.UserMyChooseWindow
 * @extends Ext.Viewport
 * @author Teon
 * 
 * 选择用户窗口
 * 
 * @constructor 创建一个UserMyChooseWindow
 * @param {Object} [config] 配置信息
 */
Jinpeng.system.user.UserMyChooseWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	/**
	 * @cfg {String} [title=选择账号] 标题
	 */
	title : '选择账号',
	/**
	 * @cfg {Number} [width=400] 宽度
	 */
	width : 400,
	/**
	 * @cfg {Number} [height=450] 高度
	 */
	height : 450,
	/**
	 * @cfg {String} [layout=border] 布局
	 */
	layout : 'border',
	/**
	 * @cfg {Function} [callback] 窗口关闭的回调函数，参数如下
	 * 
	 * <div class="mdetail-params">
	 * <ul>
	 * <li><code>result</code> : Object <div class="sub-desc">选中的记录</div></li>
	 * </ul>
	 * </div>
	 */
	callback : null,
	buttons : [ {
		text : '确定',
		handler : function(btn, event) {
			var window = btn.ownerCt.ownerCt;
			window.closeWindow(window.get(0).selections);
		}
	}, {
		text : '取消',
		handler : function(btn, event) {
			btn.ownerCt.ownerCt.closeWindow(false);
		}
	} ],
	constructor : function(config) {
		Ext.apply(this, config);
		this.items = [ this.chooser = new Jinpeng.system.user.UserMyChoosePanel({
			margins : '5',
			region : 'center'
		}) ];
		Jinpeng.system.user.UserMyChooseWindow.superclass.constructor.apply(this, arguments);
	},
	/**
	 * 初始化数据
	 */
	init : function(data) {
		this.chooser.init(data);
	},
	/**
	 * 关闭窗口，并执行回调函数
	 */
	closeWindow : function(returnValue) {
		if (typeof this.callback == 'function') {
			this.callback({
				data : returnValue
			});
		}
		this.close();
	}
});

/**
 * @class Jinpeng.system.user.UserMyChoosePanel
 * @extends Ext.Panel
 * @author Teon
 * 
 * 选择用户面板
 * 
 * @constructor 创建一个UserMyChoosePanel
 * @param {Object} [config] 配置信息
 */
Jinpeng.system.user.UserMyChoosePanel = Ext.extend(Ext.Panel, {
	/**
	 * @cfg {String} [layout=border] 布局
	 */
	layout : 'border',
	/**
	 * 回调函数
	 */
	callBackFun : null,
	/**
	 * @cfg {Boolean} [border=false] 是否具有边框
	 */
	border : false,
	/**
	 * @cfg {String} [selectedLabel=已选] “选中的用户”的标签
	 */
	selectedLabel : '已选',
	/**
	 * @property {Array} selections 选中的记录
	 */
	selections : [],
	constructor : function(config) {

		Ext.apply(this, config);

		/* 当前面板 */
		var panel = this;

		/* 用户检索栏 */
		this.treeSearchPanel = new Ext.Panel({
			layout : 'column',
			region : 'north',
			autoHeight : true,
			border : false,
			bodyStyle : 'padding:5px 0',
			defaults : {
				border : false,
				autoHeight : true
			},
			items : [ {
				width : 32,
				layout : 'anchor',
				items : {
					xtype : 'label',
					anchor : '-5',
					text : '搜索:'
				}
			}, {
				columnWidth : 1,
				layout : 'anchor',
				items : {
					xtype : 'textfield',
					anchor : '-5',
					itemId : 'keyword',
					//enableKeyEvents : true,
					listeners : { 
						change : function(field, e){
		                	try {
								var keyword = field.getValue() ? field.getValue() : '';
								panel.searchMethod(keyword);
								field.focus(false, 100); 
							} catch (e) {
							}
			            }
					}
				}
			}, {
				width : 70,
				layout : 'anchor',
				items : {
					xtype : 'button',
					anchor : '100%',
					text : '搜索',
					handler : function(btn, event) {
						try {
							var searchPanel = btn.ownerCt.ownerCt;
							var kwField = searchPanel.find('itemId', 'keyword').first();
							var keyword = kwField ? kwField.getValue() : null;
							panel.searchMethod(keyword);
						} catch (e) {
						}
					}
				}
			} ]
		});

		/* 用户检索栏 */
		this.gridSearchPanel = this.treeSearchPanel.cloneConfig();

		/* 用户列表 */
		this.userGrid = new Jinpeng.widget.SimpleUserGrid({
			itemId : 'usergrid',
			paging : false,
			rootOwner : panel,
			region : 'center',
			border : true,
			autoLoading : false,
			reload : function(keyword) {
				var store = this.getStore();
				Ext.apply(store.baseParams, {
					'user.loginName' : keyword
				});
				store.reload();
			}
		});
		
		this.textAreaPanel = new Ext.Panel({
			layout : 'column',
			autoHeight : true,
			border : false,
			labelWidth : 80,
			labelAlign : 'right',
			margins : '5',
			width : 320,
			height : 500,
			layoutConfig : {
				columns : 2
			},
			items : [this.selectedUsers = new Ext.form.TextArea({
				fieldLabel : this.selectedLabel,
				itemId : 'selected_users',
				name : 'selected_users',
				width : 320,
				height : 340,
				id : 'selected_datas',
				autoScroll : true,
				readOnly : true,
				anchor : '100%'
			}), {
				layout : 'column',
				columns : 3,
				region : 'center',
				items : [{
					items : [{
						xtype : 'normaltreebutton',
						id : "saveButTree",
						text : '&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;',
						handler : this.confimValue
					}]
				}, {
					items : [{
						xtype : 'normaltreebutton',
						id : "resetButTree",
						text : '&nbsp;&nbsp;&nbsp;清除&nbsp;&nbsp;&nbsp;',
						handler : this.resetMethod
					}]
				}]
			}]
		});

		var fn = function(node, cls) {
			var nodes = Ext.isArray(node) ? node : [ node ];
			for ( var i = 0; i < nodes.length; i++) {
				nodes[i].iconCls = cls;
				if (nodes[i].children && nodes[i].children.length > 0)
					fn(nodes[i].children, cls);
			}
		};

		/* 机构树 */
		this.userTree = new Jinpeng.widget.OrganizationTree({
			itemId : 'usertree',
			dataUrl : rootpath + '/systemOrg/onlyOrgTreeByKkmc.mvc',
			/*baseParams : {
				'kkmcStr' : Ext.getCmp('selected_users').getValue(), 
				'testa' : 'aaa'
			},*/
			cls : 'orgusertree',
			rootOwner : panel,
			region : 'center',
			border : true,
			height : 370,
			showCheckbox : true,
			ignoreCheckStatus : true,
			autoScroll : true,
			extraUrl : rootpath + '/systemOrg/jsonMountsTree.mvc',
			extraParams : {
				textProperty : 'realname'
			},
			extraFk : 'orgId',
			reload : function(keyword) {
				var loader = this.getLoader();
				Ext.apply(loader.baseParams, {
					'kkmcStr' : keyword
				});
				Ext.apply(loader.extraBaseParams, {
					'orgName' : keyword
				});
				this.init();
			},
			processResponseData : function(data) {
				fn(data, 'icon-domain-normal');
				return data;
			},
			processExtraData : function(data) {
				fn(data, 'x-node-staff');
				return data;
			}
		});

		/* 选项卡面板 */
		this.tabPanel = new Ext.TabPanel({
			itemId : 'tab',
			rootOwner : panel,
			xtype : 'tabpanel',
			region : 'center',
			border : false,
			deferredRender:false,//lyj加 默认首次加载渲染所有tab
			activeTab : 0,
			keys:[{
                key:13,  //13代表回车
                fn:function(){
                     document.getElementById("saveButTree").click();
                },
                scope:this
            }],
			items : [ {
				title : '组织机构',
				itemId : 'treetab',
				layout : 'fit',
				autoShow : false,
				border : false,
				items : [ this.treeSearchPanel, 
			        {
						region : 'center',
						layout : 'column',
						items : [{
							columnWidth : 0.5,
							id : 'treePanel',
							items: [this.userTree]
						},{
							columnWidth : 0.5,
							id : 'border',
							items: [this.textAreaPanel]
						}]
			        }
			
			          //this.userTree, this.textAreaPanel
		          ]
			} ]
		});

		/* 选项卡切换 */
		this.tabPanel.on('beforetabchange', function(tabpanel, newTab, currentTab) {

			var keyword = '';

			/* 同步关键字 */
			if (newTab && currentTab) {

				var currentKeywordField = currentTab.get(0).get(1).get(0);
				var newKeywordField = newTab.get(0).get(1).get(0);

				keyword = currentKeywordField.getValue();
				newKeywordField.setValue(keyword);

			}

			/* 重新加载数据 */
			if (newTab)
				//newTab.get(1).reload(keyword);
				newTab.get(1).get(0).get(0).reload(keyword);
		});

		/* 设置选中状态 */
		this.userGrid.getStore().on('load', function(store, records, options) {});

		/* 选中状态被改变 */
		this.userGrid.getSelectionModel().on('selectionchange', function(sm) {});
		
		//树的选中状态改变处理
        this.userTree.on('checkchange',function(node, checked){
        	var sr = [];//选中数据  
        	/*未选中的数据 */
			var ur = [];
        	var nodes=this.getChecked();
        	for ( var i= 0; i< nodes.length; i++) {
        		var iconCls=nodes[i].attributes.iconCls;
				if(iconCls=='x-node-staff'){
					sr.push(nodes[i].attributes);
					parts.push(nodes[i].attributes.realName);
				}
			}
        	if(!checked){
        		var iconCls=node.attributes.iconCls;
				if(iconCls=='x-node-staff'){
					ur.push(node.attributes);
				}
        	}
        	panel.recalculateSelections(sr, ur);
        });
		/* 设置选中状态 */
		this.userTree.on('load', function(node) {
			var tree = panel.userTree;
			var s = panel.selections;
			var newNode = [];
			var ids = node.id;
			var myfn = function(node) {
				for ( var i = 0; i < s.length; i++)	
					if (node.id == s[i].id) {
						//if (newNode == undefined) {
							newNode[newNode.length] = node;
						//}
					}
			}
			node.cascade(myfn);
			
			if (ids == '440100' || ids == 440100) {
				var event = 'load';
				var fn = arguments.callee;
				/* 取消监听 */
				tree.removeListener(event, fn);
				if (newNode.length > 0) {
					newNode[0].parentNode.parentNode.expand();
					for (var m = 0; m < newNode.length; m++) {
						if (newNode[m] != undefined && newNode[m].parentNode != null) {
							newNode[m].parentNode.loaded = true; //很重要
							newNode[m].parentNode.expand();
						}
					}
					
				}
				/* 恢复监听 */
				tree.addListener(event, fn);
			}
			
			var fn = function(node) {
				for ( var i = 0; i < s.length; i++)	
					if (node.id == s[i].id) {
						/*if (newNode == undefined) {
							newNode = node;
						}*/
						node.getUI().toggleCheck(true);
						break;
					}
			}
			node.cascade(fn);
		});

		/* 控件元素 */
		this.items = [ this.tabPanel/*, {
			xtype : 'form',
			region : 'east',
			autoHeight : true,
			border : false,
			labelWidth : 80,
			labelAlign : 'right',
			margins : '5',
			layoutConfig : {
				columns : 2
			},
			items : [this.selectedUsers = new Ext.form.TextArea({
				fieldLabel : this.selectedLabel,
				itemId : 'selected_users',
				name : 'selected_users',
				id : 'selected_users',
				anchor : '100%'
			}), {
				items : [ {
					xtype : 'button',
					align : 'center',
					text : '&nbsp;确定&nbsp;',
					id : "confimBut",
					handler : this.confimValue
				}]
			}]
		}*/ ];

		Jinpeng.system.user.UserMyChoosePanel.superclass.constructor.apply(this, arguments);
	},
	confimValue : function(btn) {
		btn.disable();
		var panel = btn.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt;
		var datas = panel.selections;
		if ( panel.callBackFun) {
			 panel.callBackFun(datas);
		}
		
	},
	resetMethod : function(btn) {
		var panel = btn.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt;
		panel.searchHandler('');
		panel.recalculateSelections([], [])
	},
	/**
	 * 初始化数据
	 * @param {Array} data 选中的数据（必须含有ID属性）
	 */
	init : function(data) {
		Ext.Ajax.request({
			url : rootpath + '/systemOrg/findHavingData.mvc',
			params : {'phones':data},
			success : function(response,options){
				var json = response.responseText;
				var o = response.responseData
				|| Ext.decode(json);
				this.recalculateSelections(o.data, []);
			},
			scope : this
		});
		//this.recalculateSelections(data, []);
	},
	/**
	 * 搜索行为处理器
	 * 
	 * @private
	 */
	searchHandler : function(keyword) {
		var tab = this.tabPanel.getActiveTab();
		var widget = tab.get(1);
		widget.get(0).get(0).reload(keyword);

	},
	searchMethod : function(keyword) {
		if (keyword == '') {
			return false;
		}
		//Ext.getCmp('selected_datas').setValue('');
		var tab = this.tabPanel.getActiveTab();
		var widget = tab.get(1);
		widget.get(0).get(0).reload(keyword);
		this.recalculateSelections([], []);

	},
	/**
	 * 重新计算全局选中的数据，并且展示出结果
	 * 
	 * @param {Array} selecteds 选中的数据（必须含有ID属性）
	 * @param {Array} unselecteds 未选中的数据（必须含有ID属性）
	 * @private
	 */
	recalculateSelections : function(selecteds, unselecteds) {
		var rs = [];
		var s = this.selections;

		rs = selecteds;
		/* 已经选中的记录要选上 */
		/*for ( var t = 0; t < selecteds.length; t++) {
			var find = false;
			for ( var i = 0; i < s.length; i++)
				if (selecteds[t].id == s[i].id) {
					find = true;
					break;
				}
			if (!find)
				rs.push(selecteds[t]);
		}*/

		/* 未被选中的记录要剔除 */
		/*for ( var i = 0; i < s.length; i++) {
			var find = false;
			for ( var t = 0; t < unselecteds.length; t++)
				if (unselecteds[t].id == s[i].id) {
					find = true;
					break;
				}
			if (!find)
				rs.push(s[i]);
		}*/

		/* 排序 */
		/*for ( var i = 0; i < rs.length; i++)
			for ( var t = i + 1; t < rs.length; t++)
				if (rs[i].realName > rs[t].realName) {
					var tmp = rs[i];
					rs[i] = rs[t];
					rs[t] = tmp;
				}*/

		this.selections = rs;

		this.showSelections();

	},
	/**
	 * 显示选中的数据至文本框
	 * 
	 * @private
	 */
	showSelections : function() {

		/*var parts = [];
		for ( var i = 0; i < this.selections.length; i++) {
			parts.push(this.selections[i].realName);
		}*/
		var text = parts.join(';\r\n');
		
		/*var textStr = '';
		var textArr = text.split(";");
		for (var i = 0; i < textArr.length; i++) {
			if (textStr != '') {
				textStr += ';\r\n';
			}
			textStr += textArr[i];
		}*/
		
		this.selectedUsers.setValue(text);
		
		parts.length = 0;
	}
});

function registerStartup(name, fn) {
	if (typeof window.startupScripts == 'undefined')
		window.startupScripts = {};
	window.startupScripts[name] = fn;
}

/**
 * 卡口选择
 * 
 * @class Jinpeng.twidget.MountSelector
 */
Jinpeng.twidget.MountSelector = Ext.extend(Ext.form.TriggerField, {
	hideTrigger : true,
	editable : false,
	callBackFun : null,
	/**
	 * @cfg 弹出窗口的Title
	 * @type String
	 */
	winTitle : '卡口名称',
	
	onTriggerClick : function() {
		var placeSelector = this;
		this.placeContentWindow = new Ext.Window({
			title : this.winTitle,
			closable : true,
			width : 700,
			height : 500,
			closeAction : "close",
			layout : 'fit',
			padding : 10,
			modal : true,
			items : [  this.chooser = new Jinpeng.system.user.UserMyChoosePanel({
				margins : '5',
				region : 'center',
				callBackFun : function(data) {
					if (placeSelector.callBackFun) {
						placeSelector.callBackFun(data);
					}
					placeSelector.placeContentWindow.close.defer(100, placeSelector.placeContentWindow);
					// 这里不能马上关闭，否则上面的树会被销毁 找不到
					var desplayTexts =  '';
					if (data) {
						for (var i = 0; i < data.length; i++) {
							if (desplayTexts != '') {
								desplayTexts +=',';
							}
							desplayTexts += data[i].text;
						}
					}
					placeSelector.setValue(desplayTexts);
				}
			}) ]
		});
		//私有数据，没办法了，只能通过这种方式传递数据
		var data = Ext.getCmp('kkbhs').getValue();
		this.init(data);
		this.placeContentWindow.show();
	},
	/**
	 * 初始化数据
	 */
	init : function(data) {
		this.chooser.init(data);
	}
});

Ext.reg("mountSelector", Jinpeng.twidget.MountSelector);

Ext.onReady(function() {
	if (typeof _startup != 'undefined')
		if (typeof window.startupScripts != 'undefined')
			if (typeof window.startupScripts[_startup] == 'function') {
				var fn = window.startupScripts[_startup];
				fn();
			}
});

