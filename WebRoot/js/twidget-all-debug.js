/*!
 * TWidget JS Library
 * Author: Teon
 * Mail: TeonBox@163.com
 */
/**
 * 这里是Teon所需要用到的基础控件
 * 
 * @ignore
 */

Ext.ns('Ext.twidget.layout');
Ext.ns('Jinpeng.twidget');
Ext.ns('Jinpeng.menu');
Ext.ns('Jinpeng.system.user');

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
	 * @cfg {String} [selectedLabel=选择的账户] “选中的用户”的标签
	 */
	selectedLabel : '选择的账户',
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
					'user.loginName' : keyword
				});
				this.init();
			},
			processResponseData : function(data) {
				fn(data, 'x-node-department');
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

function registerStartup(name, fn) {
	if (typeof window.startupScripts == 'undefined')
		window.startupScripts = {};
	window.startupScripts[name] = fn;
}

Ext.onReady(function() {
	if (typeof _startup != 'undefined')
		if (typeof window.startupScripts != 'undefined')
			if (typeof window.startupScripts[_startup] == 'function') {
				var fn = window.startupScripts[_startup];
				fn();
			}
});Ext.ns('Jinpeng.system.alarmsetting');

registerStartup('alarmsetting', function() {
	new Jinpeng.system.alarmsetting.AlarmSettingViewport({
		cls : 'system_mod'
	});
});

/**
 * @class Jinpeng.system.alarmsetting.AlarmSettingViewport
 * @extends Ext.Viewport
 * @author Teon
 * 
 * 告警设置的视图
 * 
 * @constructor 创建一个AlarmSettingViewport
 * @param {Object/String} [config] 配置信息
 */
Jinpeng.system.alarmsetting.AlarmSettingViewport = Ext.extend(Ext.Viewport, {

	/**
	 * @cfg {String} [id=warnViewport] 控件ID
	 */
	id : 'warnViewport',
	/**
	 * @cfg {String} [layout=border] 布局
	 */
	layout : 'fit',
	constructor : function(config) {

		Ext.apply(this, config);

		/* 主要工作区域 */
		this.main = new Jinpeng.system.alarmsetting.SettingPanel({});

		/* 视口元素 */
		this.items = [ this.main ];

		Jinpeng.system.alarmsetting.AlarmSettingViewport.superclass.constructor.apply(this, arguments);

	},
	/**
	 * 渲染后自动加载数据
	 * 
	 * @private
	 */
	afterRender : function() {
		Jinpeng.system.alarmsetting.AlarmSettingViewport.superclass.afterRender.apply(this, arguments);
		this.main.reload();
	}
});

/**
 * @class Jinpeng.system.alarmsetting.SettingPanel
 * @extends Ext.Panel
 * @author Teon
 * 
 * 告警设置的主面板
 * 
 * @constructor 创建一个SettingPanel
 * @param {Object/String} [config] 配置信息
 */
Jinpeng.system.alarmsetting.SettingPanel = Ext.extend(Ext.Panel, {
	/**
	 * @cfg {Boolean} [border=false] 是否具有边框
	 */
	border : false,
	/**
	 * @cfg {Number} [padidng=10] 内边距
	 */
	padding : '10',
	/**
	 * @cfg {Boolean} [autoScrool=true] 自动滚屏
	 */
	autoScroll : true,
	defaults : {
		border : false,
		bodyCssClass : 'area1',
		style : 'margin-bottom:10px;',
		padding : 5
	},
	constructor : function(config) {

		Ext.apply(this, config);

		var panel = this;

		sounds = [ [ 'sound1.mp3', 'Sound A' ], [ 'sound2.mp3', 'Sound B' ], [ 'sound3.mp3', 'Sound C' ], [ 'sound4.mp3', 'Sound D' ] ];

		window.soundManager.setup({
			debugMode : false,
			url : rootpath + '/content/resources/',
			onready : function() {
				panel.sounds = {};
				for ( var i = 0; i < sounds.length; i++) {
					var s = sounds[i];
					var val = s[0];
					panel.sounds[val] = window.soundManager.createSound({
						id : 'sound-' + val,
						url : rootpath + '/content/resources/' + val
					});
				}
			}
		});

		this.items = [ {
			border : false,
			layout : 'ttable',
			items : [ {
				xtype : 'checkbox',
				name : 'pop_window_on_alarm',
				boxLabel : '告警弹出框显示',
				cellWidth : 200
			}, {
				xtype : 'checkbox',
				name : 'always_warning_flicker_on_map',
				boxLabel : '电子地图总是显示闪烁告警灯',
				cellWidth : 200
			} ]
		}, {
			border : false,
			layout : 'ttable',
			style : 'margin-bottom:0px;',
			bodyCssClass : null,
			items : {
				xtype : 'checkbox',
				name : 'enable_related_notice',
				boxLabel : '关联卡口通知',
				cellWidth : 200
			}
		}, {
			border : false,
			layout : 'ttable',
			items : [ {
				xtype : 'radio',
				name : 'related_notice_mode',
				boxLabel : '卡口方向下一卡口',
				inputValue : 'next',
				cellWidth : 200
			}, {
				xtype : 'radio',
				name : 'related_notice_mode',
				boxLabel : '卡口方向下行所有卡口',
				inputValue : 'all',
				cellWidth : 200
			} ]
		}, {
			border : false,
			layout : 'ttable',
			style : 'margin-bottom:0px;',
			bodyCssClass : null,
			items : {
				xtype : 'checkbox',
				name : 'enable_sound',
				boxLabel : '启用声音',
				cellWidth : 200
			}
		}, {
			xtype : 'form',
			border : false,
			cls : 'blue-button-ct',
			items : [ {
				fieldLabel : '违法告警声音',
				border : false,
				layout : 'column',
				items : [ {
					xtype : 'tcombo',
					name : 'illegal_sound',
					selectOnFocus : true,
					forceSelection : true,
					triggerAction : 'all',
					emptyText : '请选择',
					store : sounds.clone()
				}, {
					xtype : 'button',
					name : 'illegal_sound_button',
					text : 'Play',
					scope : panel,
					handler : this.playIllegalSound
				} ]
			}, {
				fieldLabel : '系统告警声音',
				border : false,
				layout : 'column',
				items : [ {
					xtype : 'tcombo',
					name : 'warning_sound',
					selectOnFocus : true,
					forceSelection : true,
					triggerAction : 'all',
					emptyText : '请选择',
					store : sounds.clone()
				}, {
					xtype : 'button',
					name : 'warning_sound_button',
					text : 'Play',
					scope : panel,
					handler : this.playWarningSound
				} ]
			} ]
		}, {
			border : false,
			cls : 'blue-button-ct',
			bodyCssClass : null,
			items : [ {
				style : 'margin:auto auto;',
				xtype : 'button',
				name : 'ok',
				text : '保存',
				handler : this.doSaveAction
			} ]
		} ];

		Jinpeng.system.alarmsetting.SettingPanel.superclass.constructor.apply(this, arguments);

		this.relateComponents();

	},
	/**
	 * 关联各种控件实现启用、禁用效果
	 * 
	 * @private
	 */
	relateComponents : function() {
		var panel = this;
		this.find('name', 'enable_sound').first().on('check', function(node, checked) {
			var names = [ 'illegal_sound', 'warning_sound', 'illegal_sound_button', 'warning_sound_button' ];
			for ( var i = 0; i < names.length; i++) {
				var name = names[i];
				panel.find('name', name).first().setDisabled(!checked);
			}
		});
		this.find('name', 'enable_related_notice').first().on('check', function(node, checked) {
			Ext.each(panel.find('name', 'related_notice_mode'), function(node) {
				node.setDisabled(!checked);
			});
		});
	},
	/**
	 * 播放声音
	 * 
	 * @param id 声音ID
	 * @private
	 */
	playSound : function(id) {
		var soundObject = this.sounds[id];
		if (soundObject)
			soundObject.play();
	},
	/**
	 * 播放告警声音
	 * 
	 * @param btn 播放按钮
	 * @private
	 */
	playWarningSound : function(btn) {
		var val = this.find('name', 'warning_sound').first().getValue();
		this.playSound(val);
	},
	/**
	 * 播放非法声音
	 * 
	 * @param btn 播放按钮
	 * @private
	 */
	playIllegalSound : function(btn) {
		var val = this.find('name', 'illegal_sound').first().getValue();
		this.playSound(val);
	},
	/**
	 * 重新加载数据
	 */
	reload : function() {
		var panel = this;
		Ext.Ajax.request({
			url : rootpath + '/client/system/jsonLoadAlarmSetting.action',
			scope : this,
			success : function(response, options) {
				json = response.responseText;
				var o = response.responseData || Ext.decode(json);
				if (o && o.success) {
					panel.init(o.data || {});
				}
			}
		});
	},
	/**
	 * 初始化数据
	 * 
	 * @param data 待初始化的数据
	 */
	init : function(data) {
		var arr = [ 'warning_sound', 'illegal_sound', 'enable_sound', 'pop_window_on_alarm', 'always_warning_flicker_on_map', 'enable_related_notice', 'related_notice_mode' ];
		for ( var i = 0; i < arr.length; i++) {
			var key = arr[i];
			if (data && typeof data[key] != 'undefined')
				this.find('name', key).first().setValue(data[key]);
		}
		var node = this.find('name', 'enable_related_notice').first();
		node.fireEvent('check', node, node.getValue());
		var node = this.find('name', 'enable_sound').first();
		node.fireEvent('check', node, node.getValue());
	},
	/**
	 * 保存数据
	 * 
	 * @param btn 保存按钮
	 */
	doSaveAction : function(btn) {
		var panel = btn.ownerCt.ownerCt;
		var arr = [ 'warning_sound', 'illegal_sound', 'enable_sound', 'pop_window_on_alarm', 'always_warning_flicker_on_map', 'enable_related_notice' ];
		var params = {};
		var radio = panel.find('name', 'related_notice_mode').first();
		params.related_notice_mode = radio.getGroupValue();
		for ( var i = 0; i < arr.length; i++) {
			var key = arr[i];
			var val = panel.find('name', key).first().getValue();
			params[key] = val;
		}
		Ext.Ajax.request({
			url : rootpath + '/client/system/jsonUpdateAlarmSetting.action',
			params : params,
			success : function(response, options) {
				json = response.responseText;
				var o = response.responseData || Ext.decode(json);
				if (o && o.success) {
					panel.reload();
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = '操作成功';
					win.show();
				}
			}
		});
	}
});Ext.ns('Jinpeng.system.dictionary');

registerStartup('dictionary', function() {
	new Jinpeng.system.dictionary.DictionaryViewport({
		cls : 'system_mod'
	});
});

registerStartup('dictionary_category', function() {
	new Jinpeng.system.dictionary.DictionaryCategoryViewport({
		cls : 'system_mod'
	});
});

registerStartup('dictionary_item', function() {
	new Jinpeng.system.dictionary.DictionaryItemViewport({
		cls : 'system_mod'
	});
});

/**
 * @class Jinpeng.system.dictionary.DictionaryViewport
 * @extends Ext.Viewport
 * @author Teon
 * 
 * 字典视图
 * 
 * @constructor 创建一个DictionaryViewport
 * @param {Object/String} [config] 配置信息
 */
Jinpeng.system.dictionary.DictionaryViewport = Ext.extend(Ext.Viewport, {
	/**
	 * @cfg {String} [id=DictionaryViewport] 控件ID
	 */
	id : 'dictionaryViewport',
	/**
	 * @cfg {String} [layout=border] 布局
	 */
	layout : 'fit',
	constructor : function(config) {

		Ext.apply(this, config);

		/* 主要工作区域 */
		this.tab = new Ext.TabPanel({
			cls : 'system_mod',
			defaultType : 'iframepanel',
			activeTab : 0,
			border : false,
			plain : true,
			items : [ {
				title : '字典类别',
				defaultSrc : rootpath + "/client/system/dictCat.action"
			}, {
				title : '字典项目',
				defaultSrc : rootpath + "/client/system/dictItem.action"
			} ],
			listeners : {
				beforetabchange : function(tabpanel, newTab, currentTab) {
					if (currentTab) {
						var frame = currentTab.get(0);
						frame.resetFrame();
					}
					if (newTab) {
						var frame = newTab.get(0);
						frame.setLocation(frame.defaultSrc);
					}
				}
			}
		});

		/* 视口元素 */
		this.items = [ this.tab ];

		Jinpeng.system.dictionary.DictionaryViewport.superclass.constructor.apply(this, arguments);

	}
});

/**
 * @class Jinpeng.system.dictionary.DictionaryCategoryViewport
 * @extends Ext.Viewport
 * @author Teon
 * 
 * 字典视图
 * 
 * @constructor 创建一个DictionaryCategoryViewport
 * @param {Object/String} [config] 配置信息
 */
Jinpeng.system.dictionary.DictionaryCategoryViewport = Ext.extend(Ext.Viewport, {
	/**
	 * @cfg {String} [id=DictionaryCategoryViewport] 控件ID
	 */
	id : 'DictionaryCategoryViewport',
	/**
	 * @cfg {String} [layout=border] 布局
	 */
	layout : 'border',
	constructor : function(config) {

		Ext.apply(this, config);

		var vp = this;

		this.toolbar = new Ext.Toolbar({
			region : 'north',
			border : true,
			cls : 'toolbar',
			height : 40,
			defaults : {
				minWidth : 80
			},
			items : [ {
				xtype : 'button',
				text : '新增',
				cls : 'small_btn',
				handler : function(btn, event) {
					vp.doCreateAction();
				}
			}, {
				style : 'margin-left:5px',
				xtype : 'button',
				text : '修改',
				cls : 'small_btn',
				handler : function(btn, event) {
					vp.doUpdateAction();
				}
			}, {
				style : 'margin-left:5px',
				xtype : 'button',
				text : '删除',
				cls : 'small_btn',
				handler : function(btn, event) {
					vp.doDeleteAction();
				}
			} ]
		});

		this.grid = new Jinpeng.system.dictionary.DictCatList({
			region : 'center',
			updateHandler : function(id) {
				vp.doUpdateAction(id);
			},
			deleteHandler : function(id) {
				vp.doDeleteAction(id);
			}
		});

		this.items = [ this.toolbar, this.grid ];

		Jinpeng.system.dictionary.DictionaryCategoryViewport.superclass.constructor.apply(this, arguments);

	},
	reload : function() {
		this.grid.getStore().reload();
	},
	/**
	 * 处理字典类别新增行为
	 * 
	 * @private
	 */
	doCreateAction : function() {
		var vp = this;
		var win = new Jinpeng.system.dictionary.DictCatModifWindow({
			cls : 'system_mod',
			title : '新增字典类别',
			url : rootpath + '/client/system/jsonCreateDictCat.action',
			callback : function(btn) {
				if (btn == 'ok')
					vp.reload();
			}
		});
		win.init();
		win.show();
	},
	/**
	 * 处理字典类别更新行为
	 * 
	 * @param {Number} id 数据ID，参数为空时以列表中所选中的数据为准
	 * @private
	 */
	doUpdateAction : function(id) {

		var vp = this;

		if (!id) {
			var records = this.grid.getSelectionModel().getSelections();
			if (records.length > 1) {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '只能选择一条记录'
				win.show();
				return;
			} else
				id = records.length == 1 ? records[0].get('id') : null;
		}

		if (id) {
			/* 创建更新窗口 */
			var window = new Jinpeng.system.dictionary.DictCatModifWindow({
				cls : 'system_mod',
				title : '修改字典类别',
				url : rootpath + '/client/system/jsonUpdateDictCat.action',
				callback : function(btn) {
					if (btn == 'ok')
						vp.reload();
				}
			});
			window.init({
				id : id
			});
			window.show();
		} else
		var win = new Jinpeng.widget.MessageWindow();
		win.msg = '请选择需要修改的记录';
		win.show();

	},
	/**
	 * 处理字典类别删除行为
	 * 
	 * @param {Number} id 数据ID，参数为空时以列表中所选中的数据为准
	 * @private
	 */
	doDeleteAction : function(id) {

		var vp = this;

		var ids = [];
		if (!id) {
			var records = this.grid.getSelectionModel().getSelections();
			if (records)
				Ext.each(records, function(r) {
					ids.push(r.get('id'));
				});
		} else
			ids.push(id);

		if (ids && ids.length > 0) {

			var fn = function(btn, text, options) {
				if (btn == 'ok') {
					/* 确认删除则通过AJAX请求删除相应的数据 */
					Ext.Ajax.request({
						url : rootpath + '/client/system/jsonDeleteDictCat.action',
						params : {
							ids : ids
						},
						success : function(response, options) {
							json = response.responseText;
							var o = response.responseData || Ext.decode(json);
							if (o && o.success) {
								vp.reload();
							}
						}
					});
				}
			};

			/* 确认删除与否 */
			Ext.MessageBox.show({
				buttons : {
					ok : '确认',
					cancel : '取消'
				},
				title : "确认删除",
				msg : "你是否确定要删除该字典类别？",
				modal : false,
				fn : fn
			});

		} else
		var win = new Jinpeng.widget.MessageWindow();
		win.msg = '请选择需要删除的记录';
		win.show();
	}
});

/**
 * @class Jinpeng.system.dictionary.DictionaryItemViewport
 * @extends Ext.Viewport
 * @author Teon
 * 
 * 字典视图
 * 
 * @constructor 创建一个DictionaryItemViewport
 * @param {Object/String} [config] 配置信息
 */
Jinpeng.system.dictionary.DictionaryItemViewport = Ext.extend(Ext.Viewport, {
	/**
	 * @cfg {String} [id=DictionaryCategoryViewport] 控件ID
	 */
	id : 'DictionaryCategoryViewport',
	/**
	 * @cfg {String} [layout=border] 布局
	 */
	layout : 'border',
	border : false,
	constructor : function(config) {

		Ext.apply(this, config);

		var vp = this;

		this.toolbar = new Ext.Toolbar({
			region : 'north',
			border : true,
			cls : 'toolbar',
			height : 40,
			defaults : {
				minWidth : 80
			},
			items : [ {
				xtype : 'button',
				text : '新增',
				cls : 'small_btn',
				handler : function(btn, event) {
					vp.doCreateAction();
				}
			}, {
				style : 'margin-left:5px',
				xtype : 'button',
				text : '修改',
				cls : 'small_btn',
				handler : function(btn, event) {
					vp.doUpdateAction();
				}
			}, {
				style : 'margin-left:5px',
				xtype : 'button',
				text : '删除',
				cls : 'small_btn',
				handler : function(btn, event) {
					vp.doDeleteAction();
				}
			} ]
		});

		this.grid = new Jinpeng.system.dictionary.DictItemList({
			region : 'center',
			updateHandler : function(id) {
				vp.doUpdateAction(id);
			},
			deleteHandler : function(id) {
				vp.doDeleteAction(id);
			}
		});

		this.tree = new Jinpeng.system.dictionary.DictionaryCategoryTree({
			region : 'west',
			width : 200,
			title : '字典类别'
		});

		this.tree.getSelectionModel().on('selectionchange', function(sm, node) {
			var pid = vp.tree.getSelectedNodeId();
			vp.grid.reload(pid);
		});

		this.items = [ {
			region : 'center',
			layout : 'border',
			border : false,
			defaults : {
				border : false
			},
			items : [ this.tree, {
				region : 'center',
				margins : '0 0 0 10',
				layout : 'border',
				items : [ this.toolbar, this.grid ]
			} ]
		} ];

		Jinpeng.system.dictionary.DictionaryCategoryViewport.superclass.constructor.apply(this, arguments);

	},
	reload : function() {
		this.grid.getStore().reload();
	},
	/**
	 * 处理字典项目新增行为
	 * 
	 * @private
	 */
	doCreateAction : function() {
		var vp = this;
		var pid = vp.tree.getSelectionModel().getSelectedNode().id;
		var win = new Jinpeng.system.dictionary.DictItemModifWindow({
			cls : 'system_mod',
			title : '新增字典项目',
			url : rootpath + '/client/system/jsonCreateDictCat.action',
			callback : function(btn) {
				if (btn == 'ok')
					vp.reload();
			}
		});
		win.init({
			pid : pid
		});
		win.show();
	},
	/**
	 * 处理字典项目更新行为
	 * 
	 * @param {Number} id 数据ID，参数为空时以列表中所选中的数据为准
	 * @private
	 */
	doUpdateAction : function(id) {

		var vp = this;

		if (!id) {
			var records = this.grid.getSelectionModel().getSelections();
			if (records.length > 1) {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '只能选择一条记录';
				win.show();
				return;
			} else
				id = records.length == 1 ? records[0].get('id') : null;
		}

		if (id) {
			/* 创建更新窗口 */
			var window = new Jinpeng.system.dictionary.DictItemModifWindow({
				cls : 'system_mod',
				title : '修改字典项目',
				url : rootpath + '/client/system/jsonUpdateDictItem.action',
				callback : function(btn) {
					if (btn == 'ok')
						vp.reload();
				}
			});
			window.init({
				id : id
			});
			window.show();
		} else
		var win = new Jinpeng.widget.MessageWindow();
		win.msg = '请选择需要修改的记录';
		win.show();

	},
	/**
	 * 处理字典项目删除行为
	 * 
	 * @param {Number} id 数据ID，参数为空时以列表中所选中的数据为准
	 * @private
	 */
	doDeleteAction : function(id) {

		var vp = this;

		var ids = [];
		if (!id) {
			var records = this.grid.getSelectionModel().getSelections();
			if (records)
				Ext.each(records, function(r) {
					ids.push(r.get('id'));
				});
		} else
			ids.push(id);

		if (ids && ids.length > 0) {

			var fn = function(btn, text, options) {
				if (btn == 'ok') {
					/* 确认删除则通过AJAX请求删除相应的数据 */
					Ext.Ajax.request({
						url : rootpath + '/client/system/jsonDeleteDictItem.action',
						params : {
							ids : ids
						},
						success : function(response, options) {
							json = response.responseText;
							var o = response.responseData || Ext.decode(json);
							if (o && o.success) {
								vp.reload();
							}
						}
					});
				}
			};

			/* 确认删除与否 */
			Ext.MessageBox.show({
				buttons : {
					ok : '确认',
					cancel : '取消'
				},
				title : "确认删除",
				msg : "你是否确定要删除该字典类别？",
				modal : false,
				fn : fn
			});

		} else
		var win = new Jinpeng.widget.MessageWindow();
		win.msg = '请选择需要删除的记录';
		win.show();
	}
});

/**
 * @class Jinpeng.system.dictionary.DictCatModifWindow
 * @extends Jinpeng.widget.GeneralWindow
 * @author Teon
 * 
 * 字典类别新增/修改窗口
 * @constructor 创建一个DictCatModifWindow
 * @param {Object/String} [config] 配置信息
 */
Jinpeng.system.dictionary.DictCatModifWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	/**
	 * @cfg {Number} [width=400] 窗口宽度
	 */
	width : 300,
	/**
	 * @cfg {Number} [height=400] 窗口高度
	 */
	height : 150,
	/**
	 * @cfg {Function} [callback=Ext.emptyFn] 窗口关闭后的回调函数，参数如下：
	 * 
	 * <div class="mdetail-params">
	 * <ul>
	 * <li><code>type</code> : String <div class="sub-desc">触发的按钮名称，可选值：ok/cancel</div> </li>
	 * </ul>
	 * </div>
	 */
	callback : Ext.emptyFn,
	/**
	 * @ignore
	 */
	buttons : [ {
		text : '确定',
		handler : function(btn, event) {
			var window = btn.ownerCt.ownerCt;
			window.okHandler(btn, event);
		}
	}, {
		text : '关闭',
		handler : function(btn, event) {
			var window = btn.ownerCt.ownerCt;
			window.closeHandler(btn, event);
		}
	} ],
	constructor : function(config) {

		Ext.apply(this, config);

		this.fp = new Ext.form.FormPanel({
			region : 'center',
			border : false,
			padding : '5',
			labelWidth : 80,
			items : [ {
				xtype : 'hidden',
				name : 'id'
			}, {
				xtype : 'textfield',
				fieldLabel : '类别编号',
				allowBlank : false,
				maxLength :50,
				maxLengthText :'字符过长',
				name : 'code',
				anchor : '-30'
			}, {
				xtype : 'textarea',
				fieldLabel : '说明',
				maxLength :300,
				maxLengthText :'字符过长',
				name : 'remark',
				anchor : '-30 -30'
			} ]
		});

		this.items = this.fp;

		Jinpeng.system.dictionary.DictCatModifWindow.superclass.constructor.apply(this, arguments);
	},
	/**
	 * 初始化权限集数据
	 * 
	 * @param {Object} data
	 * 
	 * @private
	 * 
	 */
	init : function(data) {
		this.fp.getForm().load({
			url : rootpath + '/client/system/jsonLoadDictCat.action',
			params : data || null
		});
	},
	/**
	 * 确定处理器
	 * 
	 * @private
	 */
	okHandler : function() {

		var prefix = 'obj.';
		var window = this;
		var formPanel = window.fp;
		var form = formPanel.getForm();

		/* 若表单校验无误 */
		if (form.isValid()) {

			var p = form.getFieldValues();
			var params = {};

			/* 其他参数 */
			for ( var i in p)
				if (i != '-')
					params[prefix + i] = p[i];

			var url = p.id ? rootpath + '/client/system/jsonUpdateDictCat.action' : rootpath + '/client/system/jsonCreateDictCat.action';

			/* 手动提交表单 */
			Ext.Ajax.request({
				url : url,
				params : params,
				success : function(response, options) {
					json = response.responseText;
					var o = response.responseData || Ext.decode(json);
					if (o && o.success) {
						if (window)
							window.close();
						window.callback('ok');
					}
				}
			});
		}

	},
	/**
	 * 关闭处理
	 * 
	 * @private
	 */
	closeHandler : function() {
		var window = this;
		window.close();
		window.callback('cancel');
	}
});

/**
 * @class Jinpeng.system.dictionary.DictItemModifWindow
 * @extends Jinpeng.widget.GeneralWindow
 * @author Teon
 * 
 * 字典项目新增/修改窗口
 * @constructor 创建一个DictItemModifWindow
 * @param {Object/String} [config] 配置信息
 */
Jinpeng.system.dictionary.DictItemModifWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	/**
	 * @cfg {Number} [width=400] 窗口宽度
	 */
	width : 300,
	/**
	 * @cfg {Number} [height=400] 窗口高度
	 */
	height : 200,
	/**
	 * @cfg {Function} [callback=Ext.emptyFn] 窗口关闭后的回调函数，参数如下：
	 * 
	 * <div class="mdetail-params">
	 * <ul>
	 * <li><code>type</code> : String <div class="sub-desc">触发的按钮名称，可选值：ok/cancel</div> </li>
	 * </ul>
	 * </div>
	 */
	callback : Ext.emptyFn,
	/**
	 * @ignore
	 */
	buttons : [ {
		text : '确定',
		handler : function(btn, event) {
			var window = btn.ownerCt.ownerCt;
			window.okHandler(btn, event);
		}
	}, {
		text : '关闭',
		handler : function(btn, event) {
			var window = btn.ownerCt.ownerCt;
			window.closeHandler(btn, event);
		}
	} ],
	constructor : function(config) {

		Ext.apply(this, config);

		this.fp = new Ext.form.FormPanel({
			region : 'center',
			border : false,
			padding : '5',
			labelWidth : 80,
			items : [ {
				xtype : 'hidden',
				name : 'id'
			}, {
				xtype : 'hidden',
				name : 'pid'
			}, {
				xtype : 'textfield',
				fieldLabel : '文字',
				allowBlank : false,
				name : 'text',
				anchor : '-30'
			}, {
				xtype : 'textfield',
				fieldLabel : '值',
				allowBlank : false,
				name : 'value',
				anchor : '-30'
			}, {
				xtype : 'textarea',
				fieldLabel : '说明',
				name : 'remark',
				anchor : '-30 -60'
			} ]
		});

		this.items = this.fp;

		Jinpeng.system.dictionary.DictItemModifWindow.superclass.constructor.apply(this, arguments);
	},
	/**
	 * 初始化权限集数据
	 * 
	 * @param {Object} data
	 * 
	 * @private
	 * 
	 */
	init : function(data) {
		if (data && data.id) {
			this.fp.getForm().load({
				url : rootpath + '/client/system/jsonLoadDictItem.action',
				params : data || null
			});
		} else if (data && data.pid) {
			var field = this.fp.getForm().findField('pid');
			field.setValue(data.pid);
		}
	},
	/**
	 * 确定处理器
	 * 
	 * @private
	 */
	okHandler : function() {

		var prefix = 'obj.';
		var window = this;
		var formPanel = window.fp;
		var form = formPanel.getForm();

		/* 若表单校验无误 */
		if (form.isValid()) {

			var p = form.getFieldValues();
			var params = {};

			/* 其他参数 */
			for ( var i in p)
				if (i != '-')
					params[prefix + i] = p[i];

			var url = p.id ? rootpath + '/client/system/jsonUpdateDictItem.action' : rootpath + '/client/system/jsonCreateDictItem.action';

			/* 手动提交表单 */
			Ext.Ajax.request({
				url : url,
				params : params,
				success : function(response, options) {
					json = response.responseText;
					var o = response.responseData || Ext.decode(json);
					if (o && o.success) {
						if (window)
							window.close();
						window.callback('ok');
					}
				}
			});
		}

	},
	/**
	 * 关闭处理
	 * 
	 * @private
	 */
	closeHandler : function() {
		var window = this;
		window.close();
		window.callback('cancel');
	}
});

/**
 * @class Jinpeng.system.dictionary.DictItemList
 * @extends Jinpeng.widget.GeneralGrid
 * @author Teon 字典项目表格
 * 
 * 字典项目表格
 * @constructor 创建一个DictItemList
 * @param {Object/String} [config] 配置信息
 * 
 */
Jinpeng.system.dictionary.DictItemList = Ext.extend(Jinpeng.widget.GeneralGrid, {
	/**
	 * @cfg {String} [autoExpandColumn=remark] 自动扩展的栏目名称
	 */
	autoExpandColumn : 'remark',
	/**
	 * @cfg {String} [smtype=checkbox] 选择模型类别
	 */
	smtype : 'checkbox',
	/**
	 * @cfg {Boolean} [paging=true] 是否进行分页
	 */
	paging : true,
	constructor : function(config) {

		Ext.apply(this, config);

		/* 表格中的修改操作 */
		var uHandler = {
			icon : rootpath + '/content/themes/client/blue/images/system/edit.gif',
			tooltip : '修改',
			handler : function(grid, rowIndex, colIndex) {
				var store = grid.getStore();
				var r = store.getAt(rowIndex);
				var id = r && r.get('id') || null;
				if (id && typeof grid.updateHandler == 'function')
					grid.updateHandler(id);
			}
		};

		/* 表格中的删除操作 */
		var dHandler = {
			icon : rootpath + '/content/themes/client/blue/images/system/delete.gif',
			tooltip : '删除',
			handler : function(grid, rowIndex, colIndex) {
				var store = grid.getStore();
				var r = store.getAt(rowIndex);
				var id = r && r.get('id') || null;
				if (id && typeof grid.deleteHandler == 'function')
					grid.deleteHandler(id);
			}
		};

		/* 表格栏目 */
		this.columns = [ {
			header : '文字',
			name : 'text',
			width : 50
		}, {
			header : '值',
			name : 'value',
			width : 50
		}, {
			header : "描述",
			name : 'remark'
		}, {
			header : "操作",
			xtype : 'actioncolumn',
			width : 50,
			items : [ uHandler, dHandler ]
		} ];

		this.store = new Ext.data.Store({
			url : rootpath + '/client/system/jsonPagedDictItems.action',
			baseParams : {
				'page.start' : 0,
				'page.limit' : this.pageSize
			},
			autoLoad : false,
			reader : new Jinpeng.widget.DataJsonReader({
				fields : [ 'id', 'text', 'value', 'remark' ]
			})
		});

		/* 调用父类构造函数 */
		Jinpeng.system.dictionary.DictItemList.superclass.constructor.apply(this, arguments);

	},
	reload : function(categoryId) {
		this.store.setBaseParam('pid', categoryId || null);
		this.store.load();
	},
	updateHandler : function(id) {
	},
	deleteHandler : function(id) {
	}
});

/**
 * @class Jinpeng.system.dictionary.DictCatList
 * @extends Jinpeng.widget.GeneralGrid
 * @author Teon 字典类别表格
 * 
 * 字典类别表格
 * @constructor 创建一个DictCatList
 * @param {Object/String} [config] 配置信息
 * 
 */
Jinpeng.system.dictionary.DictCatList = Ext.extend(Jinpeng.widget.GeneralGrid, {
	/**
	 * @cfg {String} [autoExpandColumn=remark] 自动扩展的栏目名称
	 */
	autoExpandColumn : 'remark',
	/**
	 * @cfg {String} [smtype=checkbox] 选择模型类别
	 */
	smtype : 'checkbox',
	/**
	 * @cfg {Boolean} [paging=true] 是否进行分页
	 */
	paging : true,
	constructor : function(config) {

		Ext.apply(this, config);

		/* 表格中的修改操作 */
		var uHandler = {
			icon : rootpath + '/content/themes/client/blue/images/system/edit.gif',
			tooltip : '修改',
			handler : function(grid, rowIndex, colIndex) {
				var store = grid.getStore();
				var r = store.getAt(rowIndex);
				var id = r && r.get('id') || null;
				if (id && typeof grid.updateHandler == 'function')
					grid.updateHandler(id);
			}
		};

		/* 表格中的删除操作 */
		var dHandler = {
			icon : rootpath + '/content/themes/client/blue/images/system/delete.gif',
			tooltip : '删除',
			handler : function(grid, rowIndex, colIndex) {
				var store = grid.getStore();
				var r = store.getAt(rowIndex);
				var id = r && r.get('id') || null;
				if (id && typeof grid.deleteHandler == 'function')
					grid.deleteHandler(id);
			}
		};

		/* 表格栏目 */
		this.columns = [ {
			header : "类别编号",
			name : 'code',
			width : 50
		}, {
			header : "描述",
			name : 'remark'
		}, {
			header : "操作",
			xtype : 'actioncolumn',
			width : 50,
			items : [ uHandler, dHandler ]
		} ];

		this.store = new Ext.data.Store({
			url : rootpath + '/client/system/jsonPagedDictCats.action',
			baseParams : {
				'page.start' : 0,
				'page.limit' : this.pageSize
			},
			autoLoad : true,
			reader : new Jinpeng.widget.DataJsonReader({
				fields : [ 'id', 'code', 'remark' ]
			})
		});

		/* 调用父类构造函数 */
		Jinpeng.system.dictionary.DictCatList.superclass.constructor.apply(this, arguments);

	},
	updateHandler : function(id) {
	},
	deleteHandler : function(id) {
	}
});

Jinpeng.system.dictionary.DictionaryCategoryTree = Ext.extend(Jinpeng.widget.GeneralTree, {
	/**
	 * @cfg {String} [cls=dictcattree] 样式
	 */
	cls : 'dictcattree',
	/**
	 * @cfg {Boolean} [border=true] 是否具有边框
	 */
	border : true,
	/**
	 * @cfg {String} [dataUrl=内置的组织结构树URL] 数据请求URL
	 */
	dataUrl : rootpath + '/dictionary/jsonDictCatTreeMap.mvc',
	autoLoading : true,
	showCheckbox : false,
	listeners : {},
	constructor : function(config) {
		Ext.apply(this, config);

		Jinpeng.system.dictionary.DictionaryCategoryTree.superclass.constructor.apply(this, arguments);
	}
});
Ext.ns('Jinpeng.system.generalsetting');

registerStartup('generalsetting', function() {
	new Jinpeng.system.generalsetting.GeneralSettingViewport({
		cls : 'system_mod'
	});
});

/**
 * @class Jinpeng.system.generalsetting.GeneralSettingViewport
 * @extends Ext.Viewport
 * @author Teon
 * 
 * 基础设置的视图
 * 
 * @constructor 创建一个GeneralSettingViewport
 * @param {Object/String} [config] 配置信息
 */
Jinpeng.system.generalsetting.GeneralSettingViewport = Ext.extend(Ext.Viewport, {
	/**
	 * @cfg {String} [layout=border] 布局
	 */
	layout : 'fit',
	constructor : function(config) {

		Ext.apply(this, config);

		/* 主要工作区域 */
		this.main = new Jinpeng.system.generalsetting.SettingPanel({});

		/* 视口元素 */
		this.items = [ this.main ];

		Jinpeng.system.generalsetting.GeneralSettingViewport.superclass.constructor.apply(this, arguments);

	},
	/**
	 * 渲染后自动加载数据
	 * 
	 * @private
	 */
	afterRender : function() {
		Jinpeng.system.generalsetting.GeneralSettingViewport.superclass.afterRender.apply(this, arguments);
		this.main.reload();
	}
});

/**
 * @class Jinpeng.system.generalsetting.SettingPanel
 * @extends Ext.Panel
 * @author Teon
 * 
 * 基础设置的主面板
 * 
 * @constructor 创建一个SettingPanel
 * @param {Object/String} [config] 配置信息
 */
Jinpeng.system.generalsetting.SettingPanel = Ext.extend(Ext.Panel, {
	/**
	 * @cfg {Boolean} [border=false] 是否具有边框
	 */
	border : false,
	/**
	 * @cfg {Number} [padidng=10] 内边距
	 */
	padding : '10',
	/**
	 * @cfg {Boolean} [autoScrool=true] 自动滚屏
	 */
	autoScroll : true,
	defaults : {
		border : false,
		bodyCssClass : 'area1',
		style : 'margin-bottom:10px;',
		padding : 5
	},
	constructor : function(config) {

		Ext.apply(this, config);

		var panel = this;

		this.deviceAutoCodingsOptions = [ new Ext.form.Radio({
			name : 'enable_device_auto_coding',
			boxLabel : '是',
			inputValue : '1'
		}), new Ext.form.Radio({
			name : 'enable_device_auto_coding',
			boxLabel : '否',
			inputValue : '0'
		}) ];

		this.pictureMonitorScreenNumberOptions = [ new Ext.form.Radio({
			name : 'picture_monitor_screen_number',
			inputValue : 1
		}), new Ext.form.Radio({
			name : 'picture_monitor_screen_number',
			inputValue : 4
		}), new Ext.form.Radio({
			name : 'picture_monitor_screen_number',
			inputValue : 9
		}), new Ext.form.Radio({
			name : 'picture_monitor_screen_number',
			inputValue : 16
		}) ];

		var group1 = new Ext.Panel({
			title : '设备自动编号',
			layout : 'ttable',
			labelWidth : 120,
			labelAlign : 'right',
			items : [ this.deviceAutoCoding = new Ext.Panel({
				fieldLabel : '启用设备自动编号',
				border : false,
				cellWidth : 300,
				layout : 'ttable',
				defaults : {
					border : false,
					cellWidth : 70
				},
				items : [ {
					items : this.deviceAutoCodingsOptions[0]
				}, {
					items : this.deviceAutoCodingsOptions[1]
				} ]
			}), this.deviceCodingStartNumber = new Ext.form.TextField({
				name : 'device_coding_start_number',
				fieldLabel : '起始编号',
				cellWidth : 300
			}) ]
		});

		var group2 = new Ext.Panel({
			title : '图片监控默认分屏',
			layout : 'ttable',
			defaults : {
				border : false,
				cellWidth : 50
			},
			items : [ {
				cellAlign : 'right',
				items : this.pictureMonitorScreenNumberOptions[0]
			}, {
				cellAlign : 'left',
				html : '<img src="' + rootpath + '/content/themes/client/blue/images/system/screen1.jpg" width="24" height="24">'
			}, {
				cellAlign : 'right',
				items : this.pictureMonitorScreenNumberOptions[1]
			}, {
				cellAlign : 'left',
				html : '<img src="' + rootpath + '/content/themes/client/blue/images/system/screen4.jpg" width="24" height="24">'
			}, {
				cellAlign : 'right',
				items : this.pictureMonitorScreenNumberOptions[2]
			}, {
				cellAlign : 'left',
				html : '<img src="' + rootpath + '/content/themes/client/blue/images/system/screen9.jpg" width="24" height="24">'
			}, {
				cellAlign : 'right',
				items : this.pictureMonitorScreenNumberOptions[3]
			}, {
				cellAlign : 'left',
				html : '<img src="' + rootpath + '/content/themes/client/blue/images/system/screen16.jpg" width="24" height="24">'
			} ]
		});

		var group3 = new Ext.Panel({
			title : '数据信息最大保留时间',
			layout : 'ttable',
			labelWidth : 140,
			labelAlign : 'right',
			items : [ this.alarmMessageRetentionTime = new Ext.ux.form.SpinnerField({
				name : 'alarm_message_retention_time',
				fieldLabel : '告警信息最大保留时间',
				width : 45,
				cellWidth : 210,
				minValue : 0,
				maxValue : 100,
				allowDecimals : false,
				incrementValue : 1,
				accelerate : true
			}), {
				xtype : 'label',
				cellWidth : 200,
				text : '月'
			}, this.logMessageRetentionTime = new Ext.ux.form.SpinnerField({
				name : 'log_message_retention_time',
				fieldLabel : '日志信息最大保留时间',
				width : 45,
				cellWidth : 210,
				minValue : 0,
				maxValue : 100,
				allowDecimals : false,
				incrementValue : 1,
				accelerate : true
			}), {
				xtype : 'label',
				text : '月'
			} ]
		});

		var group4 = new Ext.Panel({
			title : '动态域名解释器（DDNS)',
			layout : 'ttable',
			labelWidth : 80,
			labelAlign : 'right',
			layoutConfig : {
				columns : 4
			},
			defaults : {
				cellWidth : 250
			},
			items : [ this.ddnsAddress1 = new Ext.form.TextField({
				name : 'ddsn_address1',
				fieldLabel : 'DDSN1',
				regex : /((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)/,
				regexText : '地址格式错误'
			}), this.ddnsPort1 = new Ext.form.TextField({
				name : 'ddsn_port1',
				fieldLabel : '端口'
			}), this.ddnsAddress2 = new Ext.form.TextField({
				name : 'ddsn_address2',
				fieldLabel : 'DDSN2',
				regex : /((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)/,
				regexText : '地址格式错误'
			}), this.ddnsPort2 = new Ext.form.TextField({
				name : 'ddsn_port2',
				fieldLabel : '端口'
			}), this.ddnsAddress3 = new Ext.form.TextField({
				name : 'ddsn_address3',
				fieldLabel : 'DDSN3',
				regex : /((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)/,
				regexText : '地址格式错误'
			}), this.ddnsPort3 = new Ext.form.TextField({
				name : 'ddsn_port3',
				fieldLabel : '端口'
			}), this.ddnsAddress4 = new Ext.form.TextField({
				name : 'ddsn_address4',
				fieldLabel : 'DDSN4',
				regex : /((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)/,
				regexText : '地址格式错误'
			}), this.ddnsPort4 = new Ext.form.TextField({
				name : 'ddsn_port4',
				fieldLabel : '端口'
			}) ]
		});

		var group5 = new Ext.Panel({
			title : 'WEB服务器IP地址',
			layout : 'ttable',
			labelWidth : 120,
			labelAlign : 'right',
			items : [ this.internalWebServerAddress = new Ext.form.TextField({
				name : 'internal_web_server_address',
				fieldLabel : '内部IP地址',
				cellWidth : 300,
				regex : /((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)/,
				regexText : 'IP地址格式错误'
			}), this.externalWebServerAddress = new Ext.form.TextField({
				name : 'external_web_server_address',
				fieldLabel : '外部IP地址',
				cellWidth : 300,
				regex : /((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)/,
				regexText : 'IP地址格式错误'
			}) ]
		});

		var group6 = new Ext.Panel({
			title : '网管服务器',
			layout : 'ttable',
			labelWidth : 120,
			labelAlign : 'right',
			items : [ this.webmasterServerAddress = new Ext.form.TextField({
				name : 'webmaster_server_address',
				fieldLabel : '网管服务器IP地址',
				cellWidth : 300
			}), this.webmasterServerPort = new Ext.form.TextField({
				name : 'webmaster_server_port',
				fieldLabel : '网管服务器端口',
				cellWidth : 300
			}) ]
		});

		this.items = [ group1, group2, group3, group4, group5, group6, {
			border : false,
			cls : 'blue-button-ct',
			bodyCssClass : null,
			items : [ {
				style : 'margin:auto auto;',
				xtype : 'button',
				name : 'ok',
				text : '保存',
				handler : this.doSaveAction
			} ]
		} ];

		Jinpeng.system.generalsetting.SettingPanel.superclass.constructor.apply(this, arguments);

		this.relateComponents();

	},
	/**
	 * 关联各种控件实现启用、禁用效果
	 * 
	 * @private
	 */
	relateComponents : function() {
		var panel = this;
		this.find('name', 'enable_device_auto_coding').first().on('check', function(node, checked) {
			var nodes = panel.find('name', 'device_coding_start_number');
			Ext.each(nodes, function(node) {
				node.setDisabled(!checked);
			});
		});
	},
	/**
	 * 重新加载数据
	 */
	reload : function() {
		var panel = this;
		Ext.Ajax.request({
			url : rootpath + '/client/system/jsonLoadGeneralSetting.action',
			scope : this,
			success : function(response, options) {
				json = response.responseText;
				var o = response.responseData || Ext.decode(json);
				if (o && o.success) {
					panel.init(o.data || {});
				}
			}
		});
	},
	/**
	 * 初始化数据
	 * 
	 * @param data 用于初始化的数据
	 */
	init : function(data) {
		var arr = [ 'enable_device_auto_coding', 'device_coding_start_number', 'picture_monitor_screen_number', 'alarm_message_retention_time', 'log_message_retention_time', 'ddsn_address1',
				'ddsn_port1', 'ddsn_address2', 'ddsn_port2', 'ddsn_address3', 'ddsn_port3', 'ddsn_address4', 'ddsn_port4', 'internal_web_server_address', 'external_web_server_address',
				'webmaster_server_address', 'webmaster_server_port' ];
		for ( var i = 0; i < arr.length; i++) {
			var key = arr[i];
			if (data && typeof data[key] != 'undefined') {
				var rs = this.find('name', key);
				if (rs)
					rs.first().setValue(data[key]);
			}
		}
		var node = this.find('name', 'enable_device_auto_coding').first();
		node.fireEvent('check', node, node.getValue());
	},
	/**
	 * 保存设置
	 * 
	 * @param btn 保存按钮
	 * @private
	 */
	doSaveAction : function(btn) {
		var panel = btn.ownerCt.ownerCt;
		var arr = [ 'device_coding_start_number', 'alarm_message_retention_time', 'log_message_retention_time', 'ddsn_address1', 'ddsn_port1', 'ddsn_address2', 'ddsn_port2', 'ddsn_address3',
				'ddsn_port3', 'ddsn_address4', 'ddsn_port4', 'internal_web_server_address', 'external_web_server_address', 'webmaster_server_address', 'webmaster_server_port' ];
		var params = {
			enable_device_auto_coding : panel.deviceAutoCodingsOptions[0].getGroupValue(),
			picture_monitor_screen_number : panel.pictureMonitorScreenNumberOptions[0].getGroupValue()
		};
		for ( var i = 0; i < arr.length; i++) {
			var key = arr[i];
			var val = panel.find('name', key).first().getValue();
			params[key] = val;
		}
		Ext.Ajax.request({
			url : rootpath + '/client/system/jsonUpdateGeneralSetting.action',
			params : params,
			success : function(response, options) {
				json = response.responseText;
				var o = response.responseData || Ext.decode(json);
				if (o && o.success) {
					panel.reload();
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = '操作成功';
					win.show();
				}
			}
		});
	}
});Ext.ns('Jinpeng.system.org');

registerStartup('organization', function() {
	new Jinpeng.system.org.OrganizationViewPort({
		cls : 'system_mod'
	});
});

/**
 * @class Jinpeng.system.org.OrganizationViewPort
 * @extends Ext.Viewport
 * @author Teon
 * 
 * 组织结构管理视口
 * 
 * @constructor 创建一个OrganizationViewPort
 * @param {Object} [config] 配置信息
 */
Jinpeng.system.org.OrganizationViewPort = Ext.extend(Ext.Viewport, {
	/**
	 * @cfg {String} [id=organizationViewport] 控件ID
	 */
	id : 'organizationViewport',
	/**
	 * @cfg {String} [layout=fit] 布局
	 */
	layout : 'fit',
	constructor : function(config) {

		var viewport = this;

		Ext.apply(this, config);

		/* 左侧组织结构树 */
		this.tree = new Jinpeng.widget.OrganizationTree({
			region : 'west',
			title : '组织结构',
			width : 200,
			margins : '0 5 0 0',
			autoLoading : true,
			showCheckbox : false
		});

		this.tree.getSelectionModel().on('selectionchange', function(sm, node) {
			var pid = viewport.tree.getSelectedNodeId();
			viewport.grid.reload();
		});

		/* 搜索栏 */
		this.searchbar = new Ext.Panel({
			border : false,
			layout : 'ttable',
			cls : 'filter_area',
			labelWidth : 70,
			labelAlign : 'right',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '关键字',
				name : 'keyword',
				width : 156
			}, {
				style : 'margin-left:5px',
				xtype : 'button',
				minWidth : 80,
				text : '查询',
				cls : 'small_btn',
				handler : function(btn, event) {
					viewport.grid.reload();
				}
			} ],
			getKeyword : function() {
				return this.find('name', 'keyword').first().getValue();
			}
		});

		/* 工具栏 */
		this.toolbar = new Ext.Toolbar({
			border : false,
			cls : 'toolbar',
			defaults : {
				minWidth : 80
			},
			items : [ {
				xtype : 'button',
				text : '新增',
				cls : 'small_btn',
				handler : function(btn, event) {
					viewport.doCreateAction();
				}
			}, {
				style : 'margin-left:5px',
				xtype : 'button',
				text : '修改',
				cls : 'small_btn',
				handler : function(btn, event) {
					viewport.doUpdateAction();
				}
			}, {
				style : 'margin-left:5px',
				xtype : 'button',
				text : '删除',
				cls : 'small_btn',
				handler : function(btn, event) {
					viewport.doDeleteAction();
				}
			} ]
		});

		/* 表格 */
		this.grid = new Jinpeng.system.org.OrganizationGrid({
			region : 'center',
			height : 300
		});

		/* 主要工作区 */
		this.main = new Ext.Panel({
			layout : 'border',
			border : false,
			cls : 'system_mod',
			items : [
			/* 左侧机构树 */
			this.tree,
			/* 右侧数据区域 */
			{
				region : 'center',
				border : false,
				layout : 'border',
				items : [ {
					region : 'north',
					border : false,
					autoHeight : true,
					items : [ this.searchbar, this.toolbar ]
				}, this.grid ]
			} ]
		});

		/* 视口元素 */
		this.items = [ this.main ];

		Jinpeng.system.org.OrganizationViewPort.superclass.constructor.apply(this, arguments);

	},
	/**
	 * 刷新控件数据
	 */
	refresh : function() {
		this.tree.reload();
	},
	/**
	 * 处理新增行为
	 * 
	 * @private
	 */
	doCreateAction : function() {

		var nodeId = this.tree.getSelectedNodeId();

		/* 创建更新窗口 */
		var window = new Jinpeng.system.org.OrganizationModificationWindow({
			cls : 'system_mod',
			title : '新增组织结构',
			callback : function(btn) {
				if (btn == 'ok') {
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = "新增组织成功！";
					win.show();
					var vp = Ext.getCmp('organizationViewport');
					vp.refresh();
				}
			}
		});
		window.init({
			orgId : nodeId
		});
		window.show();

	},
	/**
	 * 处理更新行为
	 * 
	 * @param {Number} id 数据ID，参数为空时以列表中所选中的数据为准
	 * @private
	 */
	doUpdateAction : function(id) {

		if (!id) {
			var records = this.grid.getSelectionModel().getSelections();
			if (records.length > 1) {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '只能选择一条记录';
				win.show();
				return;
			} else
				id = records.length == 1 ? records[0].get('id') : null;
		}

		if (id) {
			var nodeId = this.tree.getSelectedNodeId();

			/* 创建更新窗口 */
			var window = new Jinpeng.system.org.OrganizationModificationWindow({
				cls : 'system_mod',
				title : '修改组织结构',
				callback : function(btn) {
					if (btn == 'ok') {
						var win = new Jinpeng.widget.MessageWindow();
						win.msg = "修改信息成功！";
						win.show();
						var vp = Ext.getCmp('organizationViewport');
						vp.refresh();
					}
				}
			});
			window.init({
				id : id,
				orgId : nodeId
			});
			window.show();
		} else
		var win = new Jinpeng.widget.MessageWindow();
		win.msg = '请选择需要修改的记录';
		win.show();
	},
	/**
	 * 处理删除行为
	 * 
	 * @param {Number} id 数据ID，参数为空时以列表中所选中的数据为准
	 * @private
	 */
	doDeleteAction : function(id) {

		var ids = [];
		if (!id) {
			var records = this.grid.getSelectionModel().getSelections();
			if (records)
				Ext.each(records, function(r) {
					ids.push(r.get('id'));
				});
		} else
			ids.push(id);

		if (ids && ids.length > 0) {
			/* 确认删除与否 */
			Ext.MessageBox.show({
				buttons : {
					ok : '确认',
					cancel : '取消'
				},
				title : "确认删除",
				msg : "你是否确定要删除该组织？",
				modal : false,
				fn : function(btn, text, options) {
					if (btn == 'ok') {
						/* 确认删除则通过AJAX请求删除相应的数据 */
						Ext.Ajax.request({
							url : rootpath + '/client/system/deleteOrg.action',
							params : {
								ids : ids
							},
							success : function(response, options) {
								json = response.responseText;
								var o = response.responseData || Ext.decode(json);
								if (o && o.success) {
									var vp = Ext.getCmp('organizationViewport');
									vp.refresh();
									try {
										broadcastEvent('delOrgEvent', function() {
										}, {
											orgId : id
										});
									} catch (e) {
									}
								}
							}
						});
					}
				}
			});
		} else
			var win = new Jinpeng.widget.MessageWindow();
			win.msg = '请选择需要删除的记录';
			win.show();
	}
});

/**
 * @class Jinpeng.system.org.OrganizationGrid
 * @extends Jinpeng.widget.GeneralGrid
 * @author Teon
 * 
 * 组织结构列表
 * 
 * @constructor 创建一个OrganizationGrid
 * @param {Object} [config] 配置信息
 */
Jinpeng.system.org.OrganizationGrid = Ext.extend(Jinpeng.widget.GeneralGrid, {
	/**
	 * @cfg {Boolean} [paging=false] 是否显示分页栏
	 */
	paging : true,
	constructor : function(config) {

		Ext.apply(this, config);

		/* Store */
		this.store = new Ext.data.Store({
			pageSize : this.pageSize,
			remoteSort : true,
			autoLoad : this.autoLoading,
			url : rootpath + '/client/system/orgPage.action',
			reader : new Ext.data.JsonReader({
				fields : [ 'id', 'no', 'orgName', 'coding', 'enCode', 'parentOrgName', 'mem' ],
				idProperty : 'id',
				root : 'result',
				totalProperty : 'totalCount'
			}),
			listeners : {
				beforeload : function(store, options) {

					var vp = Ext.getCmp('organizationViewport');

					/* 计算检索参数 */
					var keyword = vp.searchbar.getKeyword();
					var pid = vp.tree.getSelectedNodeId();

					/* 合并参数 */
					if (!options.params)
						options.params = {};
					Ext.apply(options.params, {
						parentId : pid,
						keyword : keyword
					});
					Ext.applyIf(options.params, {
						'page.start' : 0,
						'page.limit' : this.pageSize
					});
				}
			}
		});

		/* 栏目 */
		this.columns = [ {
			header : "组织名称",
			dataIndex : 'orgName',
			width : 100
		}, {
			header : "组织编号别名",
			dataIndex : 'enCode',
			width : 100
		}, {
			header : "组织编号",
			dataIndex : 'coding',
			width : 100
		}, {
			header : "上级组织",
			dataIndex : 'parentOrgName',
			width : 100
		}, {
			header : "描述",
			dataIndex : 'mem',
			width : 100
		}, {
			header : "操作",
			xtype : 'actioncolumn',
			width : 100,
			items : [
			/* 修改操作 */
			{
				icon : rootpath + '/content/themes/client/blue/images/system/edit.gif',
				tooltip : '修改',
				handler : function(grid, rowIndex, colIndex) {
					var r = grid.getStore().getAt(rowIndex);
					var id = r && r.get('id') || null;
					var vp = Ext.getCmp('organizationViewport');
					if (id)
						vp.doUpdateAction(id);
				}
			},
			/* 删除操作 */
			{
				icon : rootpath + '/content/themes/client/blue/images/system/delete.gif',
				tooltip : '删除',
				handler : function(grid, rowIndex, colIndex) {
					var r = grid.getStore().getAt(rowIndex);
					var id = r && r.get('id') || null;
					var vp = Ext.getCmp('organizationViewport');
					if (id)
						vp.doDeleteAction(id);
				}
			} ]
		} ];

		Jinpeng.system.org.OrganizationGrid.superclass.constructor.apply(this, arguments);

	}
});

/**
 * @class Jinpeng.system.org.OrganizationModificationWindow
 * @extends Jinpeng.widget.GeneralWindow
 * @author Teon
 * 
 * 组织结构新增、修改窗口
 * 
 * @constructor 创建一个OrganizationModificationWindow
 * @param {Object} [config] 配置信息
 */
Jinpeng.system.org.OrganizationModificationWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	/**
	 * @cfg {Number} [width=400] 宽度
	 */
	width : 400,
	/**
	 * @cfg {Number} [height=200] 高度
	 */
	height : 200,
	constructor : function(config) {

		Ext.apply(this, config);

		/* 下拉框Store */
		var comboStore = new Ext.data.JsonStore({
			url : rootpath + '/client/system/allOrgsInCombo.action',
			baseParams : this.baseParams,
			root : 'data',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [ 'id', 'text' ]
		});

		/* 表单 */
		this.fp = new Ext.form.FormPanel({
			region : 'center',
			border : false,
			url : this.url,
			margins : '5',
			defaults : {
				xtype : 'textfield'
			},
			items : [ {
				name : 'id',
				xtype : 'hidden'
			}, {
				fieldLabel : '组织名称',
				name : 'orgName',
				anchor : '-30',
				allowBlank : false,
				blankText : '请填写组织名称',
				emptyText : '请填写组织名称',
				regex : /^.{2,100}$/,
				regexText : '组织名称限定为2~100个字符'
			}, {
				fieldLabel : '组织编号别名',
				name : 'enCode',
				anchor : '-30',
				regex : /^.{2,32}$/,
				regexText : '组织编号别名限定为2~32个字符'
			}, {
				xtype : 'tcombo',
				triggerAction : 'all',
				store : comboStore,
				mode : 'local',
				fieldLabel : '上级组织',
				name : 'pid',
				anchor : '-30',
				valueField : 'id',
				displayField : 'text',
				allowBlank : false,
				blankText : '请选择上级组织',
				emptyText : '请选择上级组织'
			}, {
				xtype : 'textarea',
				fieldLabel : '描述',
				name : 'mem',
				anchor : '-30 -80',
				regex : /^.{0,400}$/,
				regexText : '描述限定为400个字符'
			} ]
		});

		/* 按钮 */
		this.buttons = [ {
			text : '确定',
			handler : this.okHandler
		}, {
			text : '关闭',
			handler : this.closeHandler
		} ];

		/* 控件元素 */
		this.items = this.fp;

		Jinpeng.system.org.OrganizationModificationWindow.superclass.constructor.apply(this, arguments);

	},
	/**
	 * 初始化函数
	 * 
	 * @param {Object} options 配置信息，参数如下： <div class="mdetail-params">
	 *            <ul>
	 *            <li><code>id</code> : Number<div class="sub-desc">数据ID</div></li>
	 *            <li><code>orgId</code> : Number <div class="sub-desc">所属机构ID，id参数无效时此参数才有效</div></li>
	 *            </ul>
	 *            </div>
	 */
	init : function(options) {

		var window = this;
		var form = this.fp.getForm();
		var combo = form.findField('pid');

		var id = options.id || null;
		var cv = options.orgId || null;

		/* 加载下拉框数据 */
		combo.getStore().load({
			callback : function(store, records, options) {
				/* 加载表单数据 */
				if (id) {
					form.load({
						url : rootpath + '/client/system/loadOrg.action',
						params : {
							id : id
						},
						success:function(){
							//如果是根 组织则不允许修改
							if(combo.getValue()==-1){
								 combo.setDisabled(true) ;
							}
						}
					});
				}
				/* 设定下拉框初始数据 */
				else if (cv)
					combo.setValue(cv);
			}
		});

	},
	/**
	 * 表单确认按钮行为
	 * 
	 * @private
	 */
	okHandler : function() {

		var prefix = 'org.';
		var window = this.ownerCt.ownerCt;
		var formPanel = window.fp;
		var form = formPanel.getForm();

		/* 若表单校验无误 */
		if (form.isValid()) {
			var p = form.getFieldValues();
			var params = {};
			for ( var i in p)
				params[prefix + i] = p[i];

			var url = p.id ? rootpath + '/client/system/updateOrg.action' : rootpath + '/client/system/createOrg.action';

			/* 手动提交表单 */
			Ext.Ajax.request({
				url : url,
				params : params,
				success : function(response, options) {
					json = response.responseText;
					var o = response.responseData || Ext.decode(json);
					if (o && o.success) {
						if (window)
							window.close();
						try {
							if (!p.id)
								broadcastEvent('addOrgEvent', function() {
								}, {
									orgId : o.data
								});
							else
								broadcastEvent('modifyOrgEvent', function() {
								}, {
									orgId : o.data
								});
						} catch (e) {
						}
						window.callback('ok');
					}
				}
			});
		}

	},
	/**
	 * 表单关闭按钮行为
	 * 
	 * @private
	 */
	closeHandler : function() {
		var window = this.ownerCt.ownerCt;
		if (window)
			window.close();
	}
});Ext.ns('Jinpeng.system.permgroup');

registerStartup('permgroup', function() {
	new Jinpeng.system.permgroup.PermGroupViewPort({
		cls : 'system_mod'
	});
});

/**
 * @class Jinpeng.system.permgroup.PermGroupViewPort
 * @extends Ext.Viewport
 * @author Teon
 * 
 * 权限组管理视图
 * 
 * @constructor 创建一个PermGroupViewPort
 * @param {Object/String} [config] 配置信息
 */
Jinpeng.system.permgroup.PermGroupViewPort = Ext.extend(Ext.Viewport, {
	/**
	 * @cfg {String} [id=permGroupViewport] 控件ID
	 */
	id : 'permGroupViewport',
	/**
	 * @cfg {String} [layout=border] 布局
	 */
	layout : 'fit',
	constructor : function(config) {

		Ext.apply(this, config);

		/* 主要工作区域 */
		this.tab = new Jinpeng.system.permgroup.PermGroupTabPanel({
			id : 'system.permpanel',
			cls : 'system_mod'
		});

		/* 视口元素 */
		this.items = [ this.tab ];

		Jinpeng.system.permgroup.PermGroupViewPort.superclass.constructor.apply(this, arguments);

	},
	/**
	 * 处理新增行为
	 * 
	 * @param {String} type 权限组类型，可选值为func/org
	 * @private
	 */
	doCreateAction : function(type) {
		var win = new Jinpeng.system.permgroup.PermGroupModificationWindow({
			cls : 'system_mod',
			type : type,
			title : '新增权限集',
			callback : function(btn) {
				if (btn == 'ok')
					Ext.getCmp('system.permpanel').reload();
			}
		});
		win.init();
		win.show();
	},
	/**
	 * 处理更新行为
	 * 
	 * @param {String} type 权限组类型，可选值为func/org
	 * @param {Number} id 数据ID，参数为空时以列表中所选中的数据为准
	 * @private
	 */
	doUpdateAction : function(type, id) {

		if (!id) {
			var grid = this.tab.getActiveGrid();
			var records = grid.getSelectionModel().getSelections();
			if (records.length > 1) {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '只能选择一条记录';
				win.show();
				return;
			} else
				id = records.length == 1 ? records[0].get('id') : null;
		}

		if (id) {
			/* 创建更新窗口 */
			var window = new Jinpeng.system.permgroup.PermGroupModificationWindow({
				cls : 'system_mod',
				type : type,
				title : '修改权限集',
				callback : function(btn) {
					if (btn == 'ok')
						Ext.getCmp('system.permpanel').reload();
				}
			});
			window.init({
				id : id
			});
			window.show();
		} else
		var win = new Jinpeng.widget.MessageWindow();
		win.msg ='请选择需要修改的记录';
		win.show();
	},
	/**
	 * 处理删除行为
	 * 
	 * @param {String} type 权限组类型，可选值为func/org
	 * @param {Number} id 数据ID，参数为空时以列表中所选中的数据为准
	 * @private
	 */
	doDeleteAction : function(type, id) {

		var ids = [];
		if (!id) {
			var grid = this.tab.getActiveGrid();
			var records = grid.getSelectionModel().getSelections();
			if (records)
				Ext.each(records, function(r) {
					ids.push(r.get('id'));
				});
		} else
			ids.push(id);

		if (ids && ids.length > 0) {

			var url = null;

			/* 计算URL */
			if (type == 'func')
				url = rootpath + '/client/system/jsonDeleteRole.action';
			else if (type == 'org')
				url = rootpath + '/client/system/jsonDeleteOrgRole.action';

			/* 确认删除与否 */
			Ext.MessageBox.show({
				buttons : {
					ok : '确认',
					cancel : '取消'
				},
				title : "确认删除",
				msg : "你是否确定要删除该权限？",
				modal : false,
				fn : function(btn, text, options) {
					if (btn == 'ok') {
						/* 确认删除则通过AJAX请求删除相应的数据 */
						Ext.Ajax.request({
							url : url,
							params : {
								ids : ids
							},
							success : function(response, options) {
								json = response.responseText;
								var o = response.responseData || Ext.decode(json);
								if (o && o.success) {
									Ext.getCmp('system.permpanel').reload();
								}
							}
						});
					}
				}
			});

		} else
		var win = new Jinpeng.widget.MessageWindow();
		win.msg = '请选择需要删除的记录';
		win.show();
	}
});

/**
 * @class Jinpeng.system.permgroup.PermGroupTabPanel
 * @extends Ext.TabPanel
 * @author Teon
 * 
 * 权限组管理视图
 * 
 * @constructor 创建一个PermGroupTabPanel
 * @param {Object/String} [config] 配置信息
 */
Jinpeng.system.permgroup.PermGroupTabPanel = Ext.extend(Ext.TabPanel, {
	/**
	 * @cfg {Number} [activeTab=0] 默认激活的选项卡
	 */
	activeTab : 0,
	/**
	 * @cfg {Boolean} [border=false] 是否具有边框
	 */
	border : false,
	/**
	 * @cfg {Boolean} [plain=true] 是否平的
	 */
	plain : true,
	/**
	 * @cfg {Number} [pageSize=10] 分页容量
	 */
	pageSize : 10,
	/**
	 * @cfg {Number} {padding=5} 内边距
	 */
	padding : 5,
	listeners : {
		beforetabchange : function(tabpanel, newTab, currentTab) {
			if (newTab) {
				var itemId = newTab.getItemId();
				if (itemId == 'func') {
					this.funcList.reload();
				} else if (itemId == 'org') {
					this.orgList.reload();
				}
			}
		}
	},
	constructor : function(config) {

		Ext.apply(this, config);

		/* 功能权限集列表 */
		this.funcList = new Jinpeng.system.permgroup.PermGroupList({
			id : 'system.funcPGList',
			type : 'func',
			pageSize : this.pageSize,
			/* 更新权限组操作 */
			updateHandler : function(id) {
				var vp = Ext.getCmp('permGroupViewport');
				vp.doUpdateAction(this.type, id);
			},
			/* 删除权限组操作 */
			deleteHandler : function(id) {
				var vp = Ext.getCmp('permGroupViewport');
				vp.doDeleteAction(this.type, id);
			},
			/* 查看拥有的权限 */
			viewAssignedPermHandler : function(grid, rowIndex, colIndex) {
				var name = grid.getStore().getAt(rowIndex).get('name');
				var id = grid.getStore().getAt(rowIndex).get('id');
				new Jinpeng.system.permgroup.ViewAssignedPermGroupWindow({
					dataUrl : rootpath + '/client/system/jsonAllModuleTreeMap.action',
					baseParams : {
						roleId : id
					},
					title : '查看拥有权限'
				}).show();
			},
			/* 查看授权用户 */
			viewAssignedUserHandler : function(grid, rowIndex, colIndex) {
				var name = grid.getStore().getAt(rowIndex).get('name');
				var id = grid.getStore().getAt(rowIndex).get('id');
				new Jinpeng.system.permgroup.ViewAssignedUserWindow({
					dataUrl : rootpath + '/client/system/jsonLoadRole.action',
					baseParams : {
						id : id
					},
					title : '查看授权用户'
				}).show();
			},
			pageSize : this.pageSize
		});

		/* 功能权限集选项卡 */
		this.funcTab = new Ext.Panel({
			itemId : 'func',
			title : '功能权限集',
			autoHeight : true,
			autoScroll : true,
			items : [ {
				border : false,
				xtype : 'toolbar',
				cls : 'toolbar',
				defaults : {
					minWidth : 80
				},
				items : [ {
					xtype : 'button',
					text : '新增',
					cls : 'small_btn',
					handler : function(btn, event) {
						var vp = Ext.getCmp('permGroupViewport');
						vp.doCreateAction('func');
					}
				}, {
					style : 'margin-left:5px',
					xtype : 'button',
					text : '修改',
					cls : 'small_btn',
					handler : function(btn, event) {
						var vp = Ext.getCmp('permGroupViewport');
						vp.doUpdateAction('func');
					}
				}, {
					style : 'margin-left:5px',
					xtype : 'button',
					text : '删除',
					cls : 'small_btn',
					handler : function(btn, event) {
						var vp = Ext.getCmp('permGroupViewport');
						vp.doDeleteAction('func');
					}
				} ]
			}, this.funcList ]
		});

		/* 组织权限集列表 */
		this.orgList = new Jinpeng.system.permgroup.PermGroupList({
			id : 'system.orgPGList',
			type : 'org',
			pageSize : this.pageSize,
			updateHandler : function(id) {
				var vp = Ext.getCmp('permGroupViewport');
				vp.doUpdateAction(this.type, id);
			},
			deleteHandler : function(id) {
				var vp = Ext.getCmp('permGroupViewport');
				vp.doDeleteAction(this.type, id);
			},
			/* 查看拥有的权限 */
			viewAssignedPermHandler : function(grid, rowIndex, colIndex) {
				var name = grid.getStore().getAt(rowIndex).get('name');
				var id = grid.getStore().getAt(rowIndex).get('id');
				new Jinpeng.system.permgroup.ViewAssignedPermGroupWindow({
					dataUrl : rootpath + '/client/system/allOrgTreeMap.action',
					baseParams : {
						orgRoleId : id
					},
					title : '查看拥有权限'
				}).show();
			},
			/* 查看授权用户 */
			viewAssignedUserHandler : function(grid, rowIndex, colIndex) {
				var name = grid.getStore().getAt(rowIndex).get('name');
				var id = grid.getStore().getAt(rowIndex).get('id');
				new Jinpeng.system.permgroup.ViewAssignedUserWindow({
					dataUrl : rootpath + '/client/system/jsonLoadOrgRole.action',
					baseParams : {
						id : id
					},
					title : '查看授权用户'
				}).show();
			}
		});

		/* 组织权限集选项卡 */
		this.orgTab = new Ext.Panel({
			itemId : 'org',
			title : '组织权限集',
			autoHeight : true,
			autoScroll : true,
			items : [ {
				border : false,
				xtype : 'toolbar',
				cls : 'toolbar',
				defaults : {
					minWidth : 80
				},
				items : [ {
					xtype : 'button',
					text : '新增',
					cls : 'small_btn',
					handler : function(btn, event) {
						var vp = Ext.getCmp('permGroupViewport');
						vp.doCreateAction('org');
					}
				}, {
					style : 'margin-left:5px',
					xtype : 'button',
					text : '修改',
					cls : 'small_btn',
					handler : function(btn, event) {
						var vp = Ext.getCmp('permGroupViewport');
						vp.doUpdateAction('org');
					}
				}, {
					style : 'margin-left:5px',
					xtype : 'button',
					text : '删除',
					cls : 'small_btn',
					handler : function(btn, event) {
						var vp = Ext.getCmp('permGroupViewport');
						vp.doDeleteAction('org');
					}
				} ]
			}, this.orgList ]
		});

		/* 控件元素 */
		this.items = [ this.funcTab, this.orgTab ];

		Jinpeng.system.permgroup.PermGroupTabPanel.superclass.constructor.apply(this, arguments);

	},
	/**
	 * 刷新当前有效面板
	 * 
	 */
	reload : function() {
		var itemId = this.getActiveTab().getItemId();
		if (itemId == 'func')
			this.funcList.getStore().reload();
		else if (itemId == 'org')
			this.orgList.getStore().reload();
	},
	/**
	 * 获取当前有效的列表
	 */
	getActiveGrid : function() {
		var itemId = this.getActiveTab().getItemId();
		if (itemId == 'func')
			return this.funcList;
		else if (itemId == 'org')
			return this.orgList;
		else
			return null;
	}
});

/**
 * @class Jinpeng.system.permgroup.ViewAssignedUserWindow
 * @extends Jinpeng.widget.GeneralWindow
 * @author Teon
 * 
 * 查看所分配的用户的窗口
 * 
 * @constructor 创建一个ViewAssignedUserWindow
 * @param {Object/String} [config] 配置信息
 */
Jinpeng.system.permgroup.ViewAssignedUserWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	/**
	 * @cfg {Number} [width=400] 宽度
	 */
	width : 400,
	/**
	 * @cfg {Number} [height=300] 高度
	 */
	height : 300,
	/**
	 * @cfg {Object} [baseParams] 异步通信基础参数
	 */
	baseParams : {},
	/**
	 * 关闭窗口处理器
	 * 
	 * @private
	 */
	closeHandler : function() {
		this.close();
	},
	constructor : function(config) {

		Ext.apply(this, config);

		/* 用户表格 */
		this.grid = new Jinpeng.widget.SimpleUserGrid({
			anchor : '100% 100%',
			store : new Ext.data.JsonStore({
				url : this.dataUrl,
				baseParams : this.baseParams,
				root : 'data.users',
				idProperty : 'id',
				totalProperty : 'totalCount',
				autoLoad : true,
				fields : [ 'id', 'loginName', 'realName', 'orgName' ]
			}),
			paging : false,
			init : function(data) {
				var store = this.getStore();
				store.loadData({
					data : data
				});
			}
		});

		this.items = {
			xtype : 'fieldset',
			title : '所分配的用户',
			region : 'center',
			border : true,
			margins : '5',
			items : [ this.grid ]
		};
		
		this.buttons = [ {
			text : '关闭',
			handler : function(btn, event) {
				var window = btn.ownerCt.ownerCt;
				window.closeHandler(btn, event);
			}
		} ];

		Jinpeng.system.permgroup.ViewAssignedUserWindow.superclass.constructor.apply(this, arguments);

	}
});

/**
 * @class Jinpeng.system.permgroup.PermGroupModificationWindow
 * @extends Jinpeng.widget.GeneralWindow
 * @author Teon
 * 
 * 权限组新增/修改窗口
 * @constructor 创建一个PermGroupModificationWindow
 * @param {Object/String} [config] 配置信息
 */
Jinpeng.system.permgroup.PermGroupModificationWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	/**
	 * @cfg {Number} [width=400] 窗口宽度
	 */
	width : 400,
	/**
	 * @cfg {Number} [height=400] 窗口高度
	 */
	height : 400,
	/**
	 * @cfg {Function} [callback=Ext.emptyFn] 窗口关闭后的回调函数，参数如下：
	 * 
	 * <div class="mdetail-params">
	 * <ul>
	 * <li><code>type</code> : String <div class="sub-desc">触发的按钮名称，可选值：ok/cancel</div> </li>
	 * </ul>
	 * </div>
	 */
	callback : Ext.emptyFn,
	/**
	 * @ignore
	 */
	buttons : [ {
		text : '确定',
		handler : function(btn, event) {
			var window = btn.ownerCt.ownerCt;
			window.okHandler(btn, event);
		}
	}, {
		text : '关闭',
		handler : function(btn, event) {
			var window = btn.ownerCt.ownerCt;
			window.closeHandler(btn, event);
		}
	} ],
	constructor : function(config) {

		Ext.apply(this, config);

		var window = this;

		/* 用户列表 */
		this.userGrid = new Jinpeng.widget.SimpleUserGrid({
			region : 'center',
			smtype : 'row',
			store : new Ext.data.JsonStore({
				root : 'data',
				idProperty : 'id',
				totalProperty : 'totalCount',
				autoLoad : false,
				fields : [ 'id', 'loginName', 'realName', 'orgName' ]
			}),
			paging : false,
			init : function(data) {
				var store = this.getStore();
				store.loadData({
					data : data
				});
			}
		});

		/* 权限树 */
		if (this.type == 'func') {
			this.mainComponent = this.moduleTree = new Jinpeng.widget.GeneralTree({
				region : 'center',
				dataUrl : rootpath + '/client/system/jsonAllModuleTreeMap.action',
				processResponseData : function(data) {
					try {
						var arr = data ? (Ext.isArray(data) ? data : [ data ]) : [];
						for ( var i = 0; i < arr.length; i++) {
							var node = arr[i];
							if (node.readonly)
								node.uiProvider = Jinpeng.widget.TTreeNodeUI;
						}
						return data;
					} catch (e) {
						Ext.debug("Exception occured : %o", e);
						return [];
					}
				}
			});
		} else if (this.type == 'org') {
			this.mainComponent = this.orgTree = new Jinpeng.widget.OrganizationTree({
				showCheckbox : true,
				dataUrl : rootpath + '/client/system/allOrgTreeMap.action',
				region : 'center'
			});
		}

		/* 选项卡 */
		this.tab = new Ext.TabPanel({
			region : 'center',
			border : true,
			margins : '5',
			activeTab : 0,
			items : [ {
				title : '拥有权限',
				layout : 'border',
				border : false,
				items : [ this.mainComponent ]
			}, {
				title : '授权账户',
				layout : 'border',
				border : false,
				items : [ {
					region : 'north',
					xtype : 'toolbar',
					border : false,
					autoHeight : true,
					margins : '5',
					items : [ '->', {
						owner : this,
						xtype : 'button',
						text : '选择用户',
						handler : this.chooseUserHandler
					} ]
				}, this.userGrid ]
			} ]
		});

		/* 表单 */
		this.fp = new Ext.form.FormPanel({
			xtype : 'form',
			region : 'north',
			border : false,
			autoHeight : 'auto',
			margins : '5',
			labelAlign : 'right',
			labelWidth : 100,
			items : [ {
				xtype : 'hidden',
				name : 'id'
			}, {
				fieldLabel : '功能权限名称',
				xtype : 'textfield',
				name : 'name',
				anchor : '-30',
				allowBlank : false,
				blankText : '请填写功能权限名称',
				emptyText : '请填写功能权限名称',
				regex : /^.{2,100}$/,
				regexText : '功能权限名称限定为2~100个字符'
			}, {
				fieldLabel : '描述',
				xtype : 'textarea',
				name : 'remark',
				height : 50,
				anchor : '-30',
				regex : /^.{0,500}$/,
				regexText : '功能权限名称限定为500个字符'
			} ]
		});

		/* 控件元素 */
		this.items = [ this.fp, this.tab ];

		Jinpeng.system.permgroup.PermGroupModificationWindow.superclass.constructor.apply(this, arguments);
	},
	/**
	 * 初始化权限集数据
	 * 
	 * @param {Object} data
	 * 
	 * @private
	 * 
	 */
	init : function(data) {

		var window = this;

		var mc = window.mainComponent;

		if (data) {

			var url = null;
			if (window.type == 'func')
				url = rootpath + '/client/system/jsonLoadRole.action';
			else if (window.type == 'org')
				url = rootpath + '/client/system/jsonLoadOrgRole.action';

			this.fp.getForm().load({
				url : url,
				params : data,
				success : function(form, action) {
					if (action && action.result && action.result.data) {

						var data = action.result.data;

						// 设定用户
						var users = data.users || [];
						window.userGrid.init(users);

						// 设定树数据
						var mainData = null;
						if (window.type == 'func')
							mainData = data.modules;
						else if (window.type == 'org')
							mainData = data.organizations;
						mc.init(mainData);

					}
				}
			});

		} else {
			mc.reload();
		}

	},
	/**
	 * 选择用户行为
	 * 
	 * @private
	 */
	chooseUserHandler : function(btn, event) {
		var window = btn.owner;
		var store = window.userGrid.getStore();
		var records = store.getRange();
		var data = [];
		if (records)
			for ( var i = 0; i < records.length; i++)
				data.push(records[i].data);
		var chooser = new Jinpeng.system.user.UserChooseWindow({
			cls : 'system_mod',
			modal : false,
			callback : function(result) {
				if (result.data) {
					var grid = window.userGrid;
					var store = grid.getStore();
					store.loadData(result);
				}
			}
		});
		chooser.init(data);
		chooser.show();
	},
	/**
	 * 确定处理器
	 * 
	 * @private
	 */
	okHandler : function() {

		var window = this;
		var formPanel = this.fp;
		var form = formPanel.getForm();

		var params = {};

		/* 计算选择的用户 */
		var records = window.userGrid.getStore().getRange();
		var uids = [];
		for ( var i = 0; i < records.length; i++)
			uids.push(records[i].get('id'));
		if (uids.length > 0)
			params.uids = uids;

		/* 计算选择的模块 */
		if (window.moduleTree) {
			mids = window.moduleTree.getChecked('id');
			if (mids.length > 0)
				params.mids = mids;
		}

		/* 计算选择的组织结构 */
		if (window.orgTree) {
			oids = window.orgTree.getChecked('id');
			if (oids.length > 0)
				params.oids = oids;
		}

		var p = form.getFieldValues();
		if (form.isValid()) {
			var p = form.getFieldValues();

			/* 重新封装参数 */
			{
				var prefix = '';
				if (this.type == 'func')
					prefix = 'role.';
				else if (this.type == 'org')
					prefix = 'orgRole.';
				for ( var i in p)
					params[prefix + i] = p[i];
			}

			var valid = true;
			/* 判断是否选择了模块 */
			if (this.type == 'func' && (!params.mids || params.mids.length == 0)) {
				valid = false;
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '请至少选择一个模块';
				win.show();
			}
			/* 判断是否选择了组织 */
			if (this.type == 'org' && (!params.oids || params.oids.length == 0)) {
				valid = false;
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '请至少选择一个组织';
				win.show();
			}

			/* 手动提交表单 */
			if (valid) {
				/* 分析URL */
				var url = null;
				if (this.type == 'func') {
					if (p.id)
						url = rootpath + '/client/system/jsonUpdateRole.action'
					else
						url = url = rootpath + '/client/system/jsonCreateRole.action';
				} else {
					if (p.id)
						url = rootpath + '/client/system/jsonUpdateOrgRole.action'
					else
						url = url = rootpath + '/client/system/jsonCreateOrgRole.action';
				}
				/* 提交数据 */
				Ext.Ajax.request({
					url : url,
					params : params,
					success : function(response, options) {
						json = response.responseText;
						var o = response.responseData || Ext.decode(json);
						if (o && o.success) {
							if (window)
								window.close();
							window.callback('ok');
						}
					}
				});
			}
		}

	},
	/**
	 * 关闭处理
	 * 
	 * @private
	 */
	closeHandler : function() {
		var window = this;
		window.close();
		window.callback('cancel');
	}
});

/**
 * @class Jinpeng.system.permgroup.ViewAssignedPermGroupWindow
 * @extends Jinpeng.widget.GeneralWindow
 * @author Teon
 * 
 * 查看所分配的用户的窗口
 * @constructor 创建一个ViewAssignedPermGroupWindow
 * @param {Object/String} [config] 配置信息
 * 
 */
Jinpeng.system.permgroup.ViewAssignedPermGroupWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	/**
	 * @cfg {Number} [width=400] 窗口宽度
	 */
	width : 400,
	/**
	 * @cfg {Number} [height=400] 窗口高度
	 */
	height : 400,
	/**
	 * 关闭处理器
	 * 
	 * @private
	 */
	closeHandler : function() {
		this.close();
	},
	constructor : function(config) {

		Ext.apply(this, config);

		/* 当前树 */
		this.tree = new Jinpeng.widget.GeneralTree({
			dataUrl : this.dataUrl,
			showCheckbox : false,
			autoLoading : true,
			baseParams : this.baseParams,
			anchor : '100% 100%'
		});

		/* 控件元素 */
		this.items = {
			xtype : 'fieldset',
			title : '所拥有的权限',
			region : 'center',
			border : true,
			margins : '5',
			items : [ this.tree ]
		}

		this.buttons = [ {
			text : '关闭',
			handler : function(btn, event) {
				var window = btn.ownerCt.ownerCt;
				window.closeHandler(btn, event);
			}
		} ];
		Jinpeng.system.permgroup.ViewAssignedPermGroupWindow.superclass.constructor.apply(this, arguments);
	}
})

/**
 * @class Jinpeng.system.permgroup.PermGroupList
 * @extends Jinpeng.widget.GeneralGrid
 * @author Teon 功能权限集表格
 * 
 * 权限组表格
 * @constructor 创建一个PermGroupList
 * @param {Object/String} [config] 配置信息
 * 
 */
Jinpeng.system.permgroup.PermGroupList = Ext.extend(Jinpeng.widget.GeneralGrid, {
	/**
	 * @cfg {String} [type] (Required) 类别，可选值：func/org
	 */
	type : null,
	/**
	 * @cfg {Number} [height=320] 高度
	 */
	height : 320,
	/**
	 * @cfg {String} [autoExpandColumn=remark] 自动扩展的栏目名称
	 */
	autoExpandColumn : 'remark',
	/**
	 * @cfg {String} [smtype=checkbox] 选择模型类别
	 */
	smtype : 'checkbox',
	/**
	 * @cfg {Function} [updateHandler=Ext.emptyFn] 更新操作函数，参数如下：
	 * 
	 * <div class="mdetail-params">
	 * <ul>
	 * <li><code>id</code> : Number<div class="sub-desc">数据ID</div></li>
	 * </ul>
	 * </div>
	 */
	updateHandler : Ext.emptyFn,
	/**
	 * @cfg {Function} [deleteHandler=Ext.emptyFn] 删除操作函数，参数如下：
	 * 
	 * <div class="mdetail-params">
	 * <ul>
	 * <li><code>id</code> : Number<div class="sub-desc">数据ID</div></li>
	 * </ul>
	 * </div>
	 */
	deleteHandler : Ext.emptyFn,
	/**
	 * @cfg {Function} [viewAssignedPermHandler=Ext.emptyFn] 查看拥有权限操作函数，参数如下：
	 * 
	 * <div class="mdetail-params">
	 * <ul>
	 * <li><code>grid</code> : PGList<div class="sub-desc">当前Grid控件</div></li>
	 * <li><code>rowIndex</code> : Number<div class="sub-desc">所在行</div></li>
	 * <li><code>colIndex</code> : Number<div class="sub-desc">所在列</div></li>
	 * </ul>
	 * </div>
	 */
	viewAssignedPermHandler : Ext.emptyFn,
	/**
	 * @cfg {Function} [viewAssignedUserHandler=Ext.emptyFn] 查看分配的用户操作函数，参数如下：
	 * 
	 * <div class="mdetail-params">
	 * <ul>
	 * <li><code>grid</code> : PGList<div class="sub-desc">当前Grid控件</div></li>
	 * <li><code>rowIndex</code> : Number<div class="sub-desc">所在行</div></li>
	 * <li><code>colIndex</code> : Number<div class="sub-desc">所在列</div></li>
	 * </ul>
	 * </div>
	 */
	viewAssignedUserHandler : Ext.emptyFn,
	constructor : function(config) {

		Ext.apply(this, config);

		/* 表格中的修改操作 */
		var uHandler = {
			icon : rootpath + '/content/themes/client/blue/images/system/edit.gif',
			tooltip : '修改',
			handler : function(grid, rowIndex, colIndex) {
				var store = grid.getStore();
				var r = store.getAt(rowIndex);
				var id = r && r.get('id') || null;
				if (id && typeof grid.updateHandler == 'function')
					grid.updateHandler(id);
			}
		}

		/* 表格中的删除操作 */
		var dHandler = {
			icon : rootpath + '/content/themes/client/blue/images/system/delete.gif',
			tooltip : '删除',
			handler : function(grid, rowIndex, colIndex) {
				var store = grid.getStore();
				var r = store.getAt(rowIndex);
				var id = r && r.get('id') || null;
				if (id && typeof grid.deleteHandler == 'function')
					grid.deleteHandler(id);
			}
		}

		/* 表格栏目 */
		this.columns = [ {
			header : "名称",
			name : 'name',
			width : 100
		}, {
			header : "描述",
			name : 'remark'
		}, {
			header : "拥有权限",
			dataIndex : 'assignperm',
			width : 100,
			renderer : function() {
				return '查看';
			}
		}, {
			header : "授权用户",
			dataIndex : 'assignuser',
			width : 100,
			renderer : function() {
				return '查看';
			}
		}, {
			header : "操作",
			xtype : 'actioncolumn',
			width : 100,
			items : [ uHandler, dHandler ]
		} ];

		/* 根据类别选择不同的URL */
		var url = null;
		if (this.type == 'func')
			url = rootpath + '/client/system/jsonRolePage.action';
		else if (this.type == 'org')
			url = rootpath + '/client/system/jsonOrgRolePage.action';

		/* 权限集列表Store */
		this.store = new Ext.data.JsonStore({
			url : url,
			baseParams : {
				'start' : 0,
				'limit' : this.pageSize,
				type : this.type
			},
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [ 'id', 'name', 'remark' ]
		})

		/* 调用父类构造函数 */
		Jinpeng.system.permgroup.PermGroupList.superclass.constructor.apply(this, arguments);

	},
	listeners : {
		/* 点击单元格行为 */
		cellclick : function(grid, rowIndex, columnIndex, e) {
			var record = grid.getStore().getAt(rowIndex);
			var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
			/* 查看权限行为 */
			if (fieldName == 'assignperm') {
				if (typeof this.viewAssignedPermHandler == 'function')
					this.viewAssignedPermHandler(grid, rowIndex, columnIndex);
			}
			/* 查看用户行为 */
			else if (fieldName == 'assignuser') {
				if (typeof this.viewAssignedUserHandler == 'function')
					this.viewAssignedUserHandler(grid, rowIndex, columnIndex);
			}
		}
	}
});Ext.ns('Jinpeng.system.server');

registerStartup('server', function() {
	new Jinpeng.system.server.ServerViewport({
		cls : 'system_mod'
	});
});

/**
 * @class Jinpeng.system.server.ServerGrid
 * @extends Ext.grid.GridPanel
 * @author Teon
 * 
 * <p>
 * 服务Grid
 * </p>
 * 
 * @constructor 创建一个ServerGrid
 * @param {Object} [config] 配置信息
 */
Jinpeng.system.server.ServerGrid = Ext.extend(Ext.grid.GridPanel, {
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
	enableHdMenu :false,
	constructor : function(config) {

		Ext.apply(this, config);

		/* 复选框选择模型 */
		this.sm = new Ext.grid.CheckboxSelectionModel({});

		/* 栏目 */
		this.columns = [ this.sm, {
			header : "服务名称",
			dataIndex : 'title',
			width : 100
		}, {
			header : "服务编号",
			dataIndex : 'serverId',
			width : 100
		}, {
			header : "服务类型",
			dataIndex : 'typeText',
			width : 100
		}, {
			header : "所在目录",
			dataIndex : 'currPath',
			width : 100
		}, {
			header : "IP地址",
			dataIndex : 'ipAddress',
			width : 100
		}, {
			header : "端口",
			dataIndex : 'port',
			width : 100
		}, {
			header : "操作",
			xtype : 'actioncolumn',
			width : 100,
			items : [
			/* 修改操作 */
			{
				icon : rootpath + '/content/themes/client/blue/images/system/edit.gif',
				tooltip : '修改',
				handler : function(grid, rowIndex, colIndex) {
					var r = grid.getStore().getAt(rowIndex);
					var id = r && r.get('id') || null;
					var vp = Ext.getCmp('serverViewport');
					if (id)
						vp.doUpdateAction(id);
				}
			},
			/* 删除操作 */
			{
				icon : rootpath + '/content/themes/client/blue/images/system/delete.gif',
				tooltip : '删除',
				handler : function(grid, rowIndex, colIndex) {
					var r = grid.getStore().getAt(rowIndex);
					var id = r && r.get('id') || null;
					var vp = Ext.getCmp('serverViewport');
					if (id)
						vp.doDeleteAction(id);
				}
			} ]
		} ];

		/* Store */
		var url = this.paging ? rootpath + '/client/system/jsonPagedServers.action' : rootpath + '/client/system/jsonListedServers.action';
		var rootProperty = this.rootProperty ? this.rootProperty : (this.paging ? 'data.result' : 'data');
		this.store = new Ext.data.JsonStore({
			url : url,
			root : rootProperty,
			idProperty : 'id',
			totalProperty : 'totalCount',
			baseParams : {
				'page.limit' : this.pageSize
			},
			autoLoad : this.autoLoading,
			fields : [ 'id', 'title', 'serverId', 'currPath', 'ipAddress', 'port', 'type', 'typeText' ]
		});

		/* 分页栏 */
		if (this.paging)
			this.bbar = new Jinpeng.widget.PagingToolbar({
				pageSize : this.pageSize,
				store : this.store
			});

		Jinpeng.system.server.ServerGrid.superclass.constructor.apply(this, arguments);
	}
});

/**
 * @class Jinpeng.system.server.ToolBar
 * @extends Ext.Toolbar
 * @author Teon
 * 
 * <p>
 * 服务功能工具栏
 * </p>
 * 
 * @constructor 创建一个ToolBar
 * @param {Object} [config] 配置信息
 */
Jinpeng.system.server.ToolBar = Ext.extend(Ext.Toolbar, {
	/**
	 * @cfg {Function} [createHandler=Ext.emptyFn] 新增方法，参数如下：
	 * 
	 * <div class="mdetail-params">
	 * <ul>
	 * <li><code>panel</code> : Jinpeng.system.server.ToolBar<div class="sub-desc">当前面板</div></li>
	 * </ul>
	 * </div>
	 */
	createHandler : Ext.emptyFn,
	/**
	 * @cfg {Function} [updateHandler=Ext.emptyFn] 更新方法，参数如下：
	 * 
	 * <div class="mdetail-params">
	 * <ul>
	 * <li><code>panel</code> : Jinpeng.system.server.ToolBar<div class="sub-desc">当前面板</div></li>
	 * </ul>
	 * </div>
	 */
	updateHandler : Ext.emptyFn,
	/**
	 * @cfg {Function} [deleteHandler=Ext.emptyFn] 删除方法，参数如下：
	 * 
	 * <div class="mdetail-params">
	 * <ul>
	 * <li><code>panel</code> : Jinpeng.system.server.ToolBar<div class="sub-desc">当前面板</div></li>
	 * </ul>
	 * </div>
	 */
	deleteHandler : Ext.emptyFn,
	constructor : function(config) {

		var panel = this;

		Ext.apply(this, config);

		this.items = [ {
			text : '新增',
			minWidth : 80,
			handler : function(btn, event) {
				panel.createHandler(panel);
			}
		}, {
			text : '修改',
			minWidth : 80,
			handler : function(btn, event) {
				panel.updateHandler(panel);
			}
		}, {
			text : '删除',
			minWidth : 80,
			handler : function(btn, event) {
				panel.deleteHandler(panel);
			}
		} ];
		Jinpeng.system.server.ToolBar.superclass.constructor.apply(this, arguments);
	}
});

/**
 * @class Jinpeng.system.server.ModificationWindow
 * @extends Ext.Window
 * @author Teon
 * 
 * <p>
 * 新增/删除服务窗口
 * </p>
 * 
 * @constructor 创建一个ModificationWindow
 * @param {Object} [config] 配置信息
 */
Jinpeng.system.server.ModificationWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	/**
	 * @cfg {Number} [width=350] 窗口宽度
	 */
	width : 350,
	/**
	 * @cfg {Number} [height=220] 窗口高度
	 */
	height : 250,
	/**
	 * @cfg {Number} [padding=10] 内边距
	 */
	padding : 10,
	constructor : function(config) {

		Ext.apply(this, config);

		var window = this;

		this.readyStores = [];

		this.fp = new Ext.form.FormPanel({
			region : 'center',
			padding : '10',
			border : false,
			url : this.url,
			defaults : {
				xtype : 'textfield'
			},
			items : [ {
				xtype : 'hidden',
				name : 'id'
			}, {
				fieldLabel : '服务编号',
				name : 'serverId',
				anchor : '-30',
				allowBlank : false,
				blankText :'请填写服务编号',
				regex : /^\d*$/,
				regexText : '服务编号必须为数字形式'
			}, {
				fieldLabel : '服务名称',
				name : 'title',
				anchor : '-30',
				allowBlank : false,
				regex : /^.{2,100}$/,
				regexText : '服务名称限定为2~100个字符'
			}, {
				xtype : 'tcombo',
				fieldLabel : '服务类型',
				name : 'type',
				anchor : '-30',
				allowBlank : false,
				mode : 'local',
				triggerAction : 'all',
				valueField : 'id',
				displayField : 'text',
				blankText : '请选择服务类型',
				emptyText : '请选择',
				store : new Ext.data.JsonStore({
					itemId : 'serverType',
					url : rootpath + '/client/system/jsonDictsInCombo.action',
					baseParams : {
						code : 'SERVER_TYPE'
					},
					root : 'data',
					idProperty : 'id',
					totalProperty : 'totalCount',
					autoLoad : true,
					fields : [ 'id', 'text' ]
				})
			}, {
				fieldLabel : 'IP地址',
				name : 'ipAddress',
				anchor : '-30',
				allowBlank : false,
				blankText:'请填写IP地址',
				regex : /((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)/,
				regexText : 'IP地址格式错误'
			}, {
				fieldLabel : '端口',
				name : 'port',
				anchor : '-30',
				allowBlank : true,
				regex : /^\d*$/,
				regexText : '端口必须为数字形式'
			}, {
				fieldLabel : '所在目录',
				name : 'currPath',
				anchor : '-30',
				allowBlank : true
			} ]
		});

		this.items = [ this.fp ];
		this.buttons = [ {
			text : '确定',
			handler : this.okHandler
		}, {
			text : '关闭',
			handler : this.closeHandler
		} ];

		Jinpeng.system.server.ModificationWindow.superclass.constructor.apply(this, arguments);

	},
	/**
	 * OK按钮行为
	 * 
	 * @private
	 */
	okHandler : function(btn, event) {

		var prefix = 'server.';
		var window = btn.ownerCt.ownerCt;
		var formPanel = window.fp
		var form = formPanel.getForm();

		/* 若表单校验无误 */
		if (formPanel.url && form.isValid()) {

			/* 整合参数 */
			var p = form.getFieldValues();
			var params = {};
			for ( var i in p)
				if (i != '-')
					params[prefix + i] = p[i];

			/* 手动提交表单 */
			Ext.Ajax.request({
				url : formPanel.url,
				params : params,
				success : function(response, options) {
					json = response.responseText;
					var o = response.responseData || Ext.decode(json);
					if (o && o.success) {
						/* 刷新树与列表 */
						Ext.getCmp('serverViewport').refresh();

						try {
							if (!p.id)
								broadcastEvent('addserverevent', function() {
								}, {
									serverId : o.data
								});
							else
								broadcastEvent('modifyserverevent', function() {
								}, {
									serverId : o.data
								});
						} catch (e) {
						}

						if (window)
							window.close();
					}
				}
			});
		}

	},
	/**
	 * 关闭按钮行为
	 * 
	 * @private
	 */
	closeHandler : function(btn, event) {
		var window = btn.ownerCt.ownerCt;
		window.close();
	},
	/**
	 * 初始化窗口
	 * 
	 * @param {Object} opt (Required) 配置参数
	 * 
	 * <div class="mdetail-params">
	 * <ul>
	 * <li><code>id</code> : Number<div class="sub-desc">服务ID</div></li>
	 * </ul>
	 * </div>
	 * 
	 */
	init : function(opt) {
		var formPanel = this.fp;
		/* 初始化表单数据 */
		if (opt.id)
			formPanel.getForm().load({
				url : rootpath + '/client/system/jsonLoadServer.action',
				params : {
					id : opt.id
				},
				success : function(form, action) {
				}
			});
	}
});

/**
 * @class Jinpeng.system.server.ServerViewport
 * @extends Ext.Viewport
 * @author Teon
 * 
 * <p>
 * 服务视口
 * </p>
 * 
 * @constructor 创建一个ServerViewport
 * @param {Object} [config] 配置信息
 */
Jinpeng.system.server.ServerViewport = Ext.extend(Ext.Viewport, {
	/**
	 * @cfg {String} [id=serverViewport] 控件ID
	 */
	id : 'serverViewport',
	/**
	 * @cfg {String} [layout=fit] 布局
	 */
	layout : 'fit',
	constructor : function(config) {

		Ext.apply(this, config);

		/* 工具栏 */
		this.toolbar = new Jinpeng.system.server.ToolBar({
			region : 'north',
			defaults : {
				cls : 'small_btn',
				style : 'margin-left:5px'
			},
			autoHeight : true,
			height : 100,
			createHandler : function(panel) {
				var vp = Ext.getCmp('serverViewport');
				vp.doCreateAction();
			},
			updateHandler : function(panel) {
				var vp = Ext.getCmp('serverViewport');
				vp.doUpdateAction();
			},
			deleteHandler : function(panel) {
				var vp = Ext.getCmp('serverViewport');
				vp.doDeleteAction();
			}
		});
		/* 表格 */
		this.grid = new Jinpeng.system.server.ServerGrid({
			region : 'center',
			border : false
		});

		/* 视口控件 */
		this.items = [ {
			border : false,
			layout : 'border',
			items : [ this.toolbar, this.grid ]
		} ];

		Jinpeng.system.server.ServerViewport.superclass.constructor.apply(this, arguments);

	},
	/**
	 * 刷新视口
	 * 
	 */
	refresh : function() {
		this.grid.getStore().reload();
	},
	/**
	 * 处理新增行为
	 * 
	 * @private
	 */
	doCreateAction : function() {
		var win = new Jinpeng.system.server.ModificationWindow({
			title : '新增服务',
			url : rootpath + '/client/system/jsonCreateServer.action'
		});
		win.show();
	},
	/**
	 * 处理更新行为
	 * 
	 * @param {Number} id (Optional) 数据ID，参数为空时以列表中所选中的数据为准
	 * @private
	 */
	doUpdateAction : function(id) {
		if (!id) {
			var records = this.grid.getSelectionModel().getSelections();
			if (records.length > 1) {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '只能选择一条记录';
				win.show();
				return;
			} else
				id = records.length == 1 ? records[0].get('id') : null;
		}
		if (id) {
			var win = new Jinpeng.system.server.ModificationWindow({
				title : '修改服务',
				url : rootpath + '/client/system/jsonUpdateServer.action'
			});
			win.on('allstoreready', function() {
				win.init({
					id : id
				});
			});
			win.show();
		} else
		var win = new Jinpeng.widget.MessageWindow();
		win.msg = '请选择需要修改的记录';
		win.show();

	},
	/**
	 * 处理删除行为
	 * 
	 * @param {Number} id (Optional) 数据ID，参数为空时以列表中所选中的数据为准
	 * @private
	 */
	doDeleteAction : function(id) {

		var ids = [];
		if (!id) {
			var records = this.grid.getSelectionModel().getSelections();
			if (records)
				Ext.each(records, function(r) {
					ids.push(r.get('id'));
				});
		} else
			ids.push(id);

		if (ids && ids.length > 0) {
			Ext.MessageBox.show({
				buttons : {
					ok : '确认',
					cancel : '取消'
				},
				title : "确认删除",
				msg : "你是否确定要删除该服务？",
				modal : false,
				fn : function(btn, text, options) {
					if (btn == 'ok') {
						/* 确认删除则通过AJAX请求删除相应的数据 */
						Ext.Ajax.request({
							url : rootpath + '/client/system/jsonDeleteServer.action',
							params : {
								ids : ids
							},
							success : function(response, options) {
								json = response.responseText;
								var o = response.responseData || Ext.decode(json);
								if (o && o.success) {
									Ext.getCmp('serverViewport').refresh();
									for ( var i = 0; i < ids.length; i++) {
										broadcastEvent('delserverevent', function() {
										}, {
											serverId : ids[i]
										});
									}
								}
							}
						});
					}
				}
			});

		} else
		var win = new Jinpeng.widget.MessageWindow();
		win.msg ='请选择需要删除的记录';
		win.show();
	}
});Ext.ns('Jinpeng.system.user');
Ext.ns('Jinpeng.system.permgroup');

registerStartup('user', function() {
	new Jinpeng.system.user.UserViewPort({
		cls : 'system_mod'
	});
});

/**
 * @class Jinpeng.system.user.UserViewPort
 * @extends Ext.Viewport
 * @author Teon
 * 
 * 用户管理视口
 * 
 * @constructor 创建一个UserViewPort
 * @param {Object} [config] 配置信息
 */
Jinpeng.system.user.UserViewPort = Ext.extend(Ext.Viewport, {
	/**
	 * @cfg {String} [id=userViewport] 控件ID
	 */
	id : 'userViewport',
	/**
	 * @cfg {String} [layout=fit] 布局
	 */
	layout : 'fit',
	constructor : function(config) {

		var viewport = this;

		Ext.apply(this, config);

		/* 左侧组织结构树 */
		this.tree = new Jinpeng.widget.OrganizationTree({
			region : 'west',
			title : '组织结构',
			width : 200,
			margins : '0 5 0 0',
			autoLoading : true,
			showCheckbox : false
		});

		this.tree.getSelectionModel().on('selectionchange', function(sm, node) {
			var pid = viewport.tree.getSelectedNodeId();
			if (node)
				viewport.grid.reload();
		});

		/* 搜索栏 */
		this.searchbar = new Ext.Panel({
			border : false,
			layout : 'ttable',
			cls : 'filter_area',
			labelWidth : 70,
			labelAlign : 'right',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '人员编号',
				name : 'userCode',
				width : 156
			}, {
				xtype : 'textfield',
				fieldLabel : '用户别名',
				name : 'userName',
				width : 156
			}, {
				style : 'margin-left:5px',
				xtype : 'button',
				minWidth : 80,
				text : '查询',
				cls : 'small_btn',
				handler : function(btn, event) {
					viewport.grid.reload();
				}
			} ],
			getUserCode : function() {
				return this.find('name', 'userCode').first().getValue();
			},
			getUserName : function() {
				return this.find('name', 'userName').first().getValue();
			}
		});

		/* 工具栏 */
		this.toolbar = new Ext.Toolbar({
			border : false,
			cls : 'toolbar',
			defaults : {
				minWidth : 80
			},
			items : [ {
				xtype : 'button',
				text : '新增',
				cls : 'small_btn',
				handler : function(btn, event) {
					viewport.doCreateAction();
				}
			}, {
				style : 'margin-left:5px',
				xtype : 'button',
				text : '修改',
				cls : 'small_btn',
				handler : function(btn, event) {
					viewport.doUpdateAction();
				}
			}, {
				style : 'margin-left:5px',
				xtype : 'button',
				text : '删除',
				cls : 'small_btn',
				handler : function(btn, event) {
					viewport.doDeleteAction();
				}
			}, {
				style : 'margin-left:5px',
				xtype : 'button',
				text : '导入',
				cls : 'small_btn',
				handler : function(btn, event) {
					viewport.doImportAction();
				}
			}, {
				style : 'margin-left:5px',
				xtype : 'button',
				text : '导出',
				cls : 'small_btn',
				handler : function(btn, event) {
					viewport.doExportAction(true);
				}
			}, {
				style : 'margin-left:5px',
				xtype : 'button',
				text : '导出选中',
				cls : 'small_btn',
				handler : function(btn, event) {
					viewport.doExportAction(false);
				}
			} ]
		});

		/* 表格 */
		this.grid = new Jinpeng.system.user.UserGrid({
			region : 'center',
			height : 300
		});

		/* 主要工作区 */
		this.main = new Ext.Panel({
			layout : 'border',
			border : false,
			cls : 'system_mod',
			items : [
			/* 左侧机构树 */
			this.tree,
			/* 右侧数据区域 */
			{
				region : 'center',
				border : false,
				layout : 'border',
				items : [ {
					region : 'north',
					border : false,
					autoHeight : true,
					items : [ this.searchbar, this.toolbar ]
				}, this.grid ]
			} ]
		});

		/* 视口元素 */
		this.items = [ this.main ];

		Jinpeng.system.user.UserViewPort.superclass.constructor.apply(this, arguments);

	},
	/**
	 * 刷新控件数据
	 */
	refresh : function() {
		this.tree.reload();
	},
	/**
	 * 处理新增行为
	 * 
	 * @private
	 */
	doCreateAction : function() {

		var nodeId = this.tree.getSelectedNodeId();

		/* 创建更新窗口 */
		var window = new Jinpeng.system.user.UserModificationWindow({
			cls : 'system_mod',
			title : '新增用户',
			callback : function(btn) {
				if (btn == 'ok') {
					var vp = Ext.getCmp('userViewport');
					vp.refresh();
				}
			}
		});
		window.init({
			orgId : nodeId
		});
		window.show();
	},
	/**
	 * 处理更新行为
	 * 
	 * @param {Number} id 数据ID，参数为空时以列表中所选中的数据为准
	 * @private
	 */
	doUpdateAction : function(id) {

		if (!id) {
			var records = this.grid.getSelectionModel().getSelections();
			if (records.length > 1) {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '只能选择一条记录';
				win.show();
				return;
			} else
				id = records.length == 1 ? records[0].get('id') : null;
		}

		if (id) {

			var nodeId = this.tree.getSelectedNodeId();

			/* 创建更新窗口 */
			var window = new Jinpeng.system.user.UserModificationWindow({
				cls : 'system_mod',
				title : '修改用户',
				callback : function(btn) {
					if (btn == 'ok') {
						var vp = Ext.getCmp('userViewport');
						vp.refresh();
					}
				}
			});
			window.init({
				id : id,
				orgId : nodeId
			});
			window.show();
		} else
		var win = new Jinpeng.widget.MessageWindow();
		win.msg = '请选择需要修改的记录';
		win.show();
	},
	/**
	 * 处理删除行为
	 * 
	 * @param {Number} id 数据ID，参数为空时以列表中所选中的数据为准
	 * @private
	 */
	doDeleteAction : function(id) {

		var ids = [];
		if (!id) {
			var records = this.grid.getSelectionModel().getSelections();
			if (records)
				Ext.each(records, function(r) {
					ids.push(r.get('id'));
				});
		} else
			ids.push(id);

		if (ids && ids.length > 0) {
			/* 确认删除与否 */
			Ext.MessageBox.show({
				buttons : {
					ok : '确认',
					cancel : '取消'
				},
				title : "确认删除",
				msg : "你是否确定要删除该用户？",
				modal : false,
				fn : function(btn, text, options) {
					if (btn == 'ok') {
						/* 确认删除则通过AJAX请求删除相应的数据 */
						Ext.Ajax.request({
							url : rootpath + '/client/system/deleteUser.action',
							params : {
								ids : ids
							},
							success : function(response, options) {
								json = response.responseText;
								var o = response.responseData || Ext.decode(json);
								if (o && o.success) {
									var vp = Ext.getCmp('userViewport');
									vp.refresh();
									try {
										broadcastEvent('delUserEvent', function() {
										}, {
											userId : id
										});
									} catch (e) {
									}
								}
							}
						});
					}
				}
			});
		} else
			
		var win = new Jinpeng.widget.MessageWindow();
		win.msg = '请选择需要删除的记录';
		win.show();
	},
	/**
	 * 处理导入行为
	 * 
	 * @private
	 */
	doImportAction : function() {
		new Jinpeng.widget.GeneralWindow({
			title : '请选择上传文件',
			layout : 'border',
			width : 350,
			height : 100,
			modal : false,
			items : {
				itemId : 'form',
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
					name : 'file',
					anchor : '-30',
					emptyText : '请选择一个文件',
					allowBlank : false,
					buttonText : '选择文件'
				} ]
			},
			buttons : [ {
				text : '确定',
				handler : function(btn, event) {
					var window = btn.ownerCt.ownerCt;
					var form = window.getComponent('form').getForm();
					if (form.isValid()) {
						form.submit({
							url : rootpath + "/client/system/importUser.action",
							success : function(form, action) {
								window.close();
								var vp = Ext.getCmp('userViewport');
								vp.refresh();
							}
						});
					}
				}
			}, {
				text : '取消',
				handler : function(btn, even) {
					btn.ownerCt.ownerCt.close();
				}
			} ]
		}).show();
	},
	/**
	 * 处理导出行为
	 * 
	 * @param {Boolean} [exportAll=false] 是否导出全部数据，若FALSE，则导出选中的数据
	 * @private
	 */
	doExportAction : function(exportAll) {

		var url = '';

		/* 导出全部数据 */
		if (exportAll) {
			/* 计算检索参数 */
			var userName = this.searchbar.getUserName();
			var userCode = this.searchbar.getUserCode();
			var oid = this.tree.getSelectedNodeId();

			/* 合并参数 */
			var parts = [];
			if (userName && userName != '')
				parts[parts.length] = 'user.userName=' + userName;
			if (userCode && userCode != '')
				parts[parts.length] = 'user.userCode=' + userCode;
			if (oid && oid != '')
				parts[parts.length] = 'orgId=' + oid;
			/* 合成URL */
			var query = parts.join('&');
			url = rootpath + "/client/system/exportAllUser.action" + (query == '' ? '' : '?' + query);
		}
		/* 导出选中数据 */
		else {
			var records = this.grid.getSelectionModel().getSelections();
			var ids = [];
			if (records)
				for ( var i = 0; i < records.length; i++)
					ids[ids.length] = records[i].get('id');
			var idString = ids ? ids.join(',') : '';
			url = rootpath + "/client/system/exportGivenUser.action?idstr=" + idString;
		}
		if (url != '')
			window.open(url);
	}
});

/**
 * @class Jinpeng.system.user.UserModificationWindow
 * @extends Jinpeng.widget.GeneralWindow
 * @author Teon
 * 
 * 用户新增、修改窗口
 * 
 * @constructor 创建一个UserModificationWindow
 * @param {Object} [config] 配置信息
 */
Jinpeng.system.user.UserModificationWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	/**
	 * @cfg {Number} [width=650] 宽度
	 */
	width : 700,
	/**
	 * @cfg {Number} [height=500] 高度
	 */
	height : 500,
	constructor : function(config) {

		var window = this;

		Ext.apply(this, config);

		var comboStore = new Ext.data.JsonStore({
			url : rootpath + '/client/system/allOrgsInCombo.action',
			baseParams : this.baseParams,
			root : 'data',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [ 'id', 'text' ]
		});

		/* 账号信息 */
		this.fieldSet1 = new Ext.form.FieldSet({
			xtype : 'fieldset',
			title : '账号信息',
			border : true,
			layout : 'ttable',
			labelWidth : 90,
			layoutConfig : {
				columns : 3,
				tableAttrs : {
					style : {
						width : '100%'
					}
				}
			},
			defaults : {
				xtype : 'textfield',
				width : 160
			},
			items : [ {
				fieldLabel : '登录账号',
				name : 'loginName',
				cellWidth : 270,
				allowBlank : false,
				blankText : '请填写登录账号',
				emptyText : '请填写登录账号',
				regex : /^.{2,100}$/,
				regexText : '登录账号限定为2~100个字符'
			}, {
				fieldLabel : '登录密码',
				name : 'loginPass',
				cellWidth : 270,
				inputType : 'password',
				regex : /^.{2,32}$/,
				regexText : '登录密码限定为2~32个字符'
			}, {
				cellWidth : 70,
				width : 60,
				autoHeight : true,
				xtype : 'checkbox',
				name : 'reuse',
				boxLabel : '复用'
			}, {
				fieldLabel : '密码确认',
				name : 'repassword',
				inputType : 'password',
				anchor : '100%',
				validate : function() {
					var form = window.fp.getForm();
					var repassword = this.getValue();
					var password = form.findField('loginPass').getValue();
					var rs = repassword == password;
					if (!rs)
						this.markInvalid();
					else
						this.clearInvalid();
					return rs;
				},
				invalidText : '两次输入的密码不一致'
			}, {
				xtype : 'tooltiptextfield',
				fieldLabel : '固定登录IP',
				tooltip:{text:"只有勾选启用该功能才能生效！"},
				name : 'loginIP',
				regex : /^((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)$/,
				regexText : '固定登录IP格式错误'
			}, {
				width : 60,
				autoHeight : true,
				xtype : 'checkbox',
				name : 'enableLoginIP',
				boxLabel : '启用'
			} ]
		});

		/* 基本信息 */
		this.fieldSet2 = new Ext.form.FieldSet({
			xtype : 'fieldset',
			title : '基本信息',
			border : true,
			labelWidth : 80,
			layout : 'ttable',
			layoutConfig : {
				columns : 3,
				tableAttrs : {
					style : {
						width : '100%'
					}
				}
			},
			defaults : {
				xtype : 'textfield',
				width : 160
			},
			items : [ {
				fieldLabel : '人员名称',
				name : 'realName',
				cellWidth : 270,
				allowBlank : false,
				blankText : '请填写人员名称',
				emptyText : '请填写人员名称',
				regex : /^.{2,100}$/,
				regexText : '人员名称限定为2~100个字符'
			}, {
				fieldLabel : '身份证号码',
				name : 'identityCard',
				cellWidth : 270,
				allowBlank : false,
				blankText : '请填写身份证号码',
				emptyText : '请填写身份证号码',
				regex : /^.{2,20}$/,
				regexText : '身份证号码限定为2~20个字符'
			}, {
				cellWidth : 70,
				width : 60,
				xtype : 'spacer'
			}, {
				fieldLabel : '人员编号',
				name : 'userCode',
				regex : /^.{2,32}$/,
				regexText : '人员编号限定为2~32个字符'
			}, {
				fieldLabel : '单位编号',
				name : 'unitCode',
				regex : /^.{0,100}$/,
				regexText : '单位编号限定为100个字符'
			}, {
				width : 60,
				xtype : 'spacer'
			}, {
				fieldLabel : '单位名称',
				name : 'unitName',
				regex : /^.{0,100}$/,
				regexText : '单位名称限定为100个字符'
			}, {
				fieldLabel : '联系电话',
				name : 'phone',
				regex : /^.{0,100}$/,
				regexText : '联系电话限定为100个字符'
			}, {
				width : 60,
				xtype : 'spacer'
			}, {
				xtype : 'tcombo',
				editable : false,
				triggerAction : 'all',
				store : comboStore,
				mode : 'local',
				fieldLabel : '所属组织',
				name : 'orgId',
				valueField : 'id',
				displayField : 'text',
				allowBlank : false,
				blankText : '请选择所属组织',
				emptyText : '请选择所属组织'
			}, {
				xtype : 'tcombo',
				editable : false,
				triggerAction : 'all',
				store : new Ext.data.ArrayStore({
					fields : [ 'id', 'text' ],
					data : [ [ 0, '失效' ], [ 1, '在用' ] ]
				}),
				mode : 'local',
				fieldLabel : '使用状态',
				name : 'state',
				valueField : 'id',
				displayField : 'text',
				allowBlank : false,
				blankText : '请选择使用状态',
				emptyText : '请选择使用状态'
			} ]
		});

		/* 权限组设定区域 */
		this.pgs = new Jinpeng.system.user.PermGroupTabPanel({
			region : 'center'
		});

		/* 表单 */
		this.fp = new Ext.form.FormPanel({
			xtype : 'form',
			region : 'center',
			border : false,
			items : [ {
				name : 'id',
				xtype : 'hidden'
			}, this.fieldSet1, this.fieldSet2, {
				xtype : 'fieldset',
				anchor : '100% -250',
				title : '权限',
				border : true,
				layout : 'border',
				items : [ this.pgs ]
			} ]
		});

		/* 按钮 */
		this.buttons = [ {
			text : '确定',
			handler : this.okHandler
		}, {
			text : '关闭',
			handler : this.closeHandler
		} ];

		this.items = {
			region : 'center',
			layout : 'fit',
			border : false,
			padding : 5,
			items : this.fp
		}

		Jinpeng.system.user.UserModificationWindow.superclass.constructor.apply(this, arguments);

	},
	/**
	 * 初始化函数
	 * 
	 * @param {Object} options 配置信息，参数如下： <div class="mdetail-params">
	 *            <ul>
	 *            <li><code>id</code> : Number<div class="sub-desc">数据ID</div></li>
	 *            <li><code>orgId</code> : Number <div class="sub-desc">所属机构ID，id参数无效时此参数才有效</div></li>
	 *            </ul>
	 *            </div>
	 */
	init : function(options) {
		var window = this;
		var form = window.fp.getForm();
		var combo = form.findField('orgId');

		var id = options.id || null;
		var cv = options.orgId || null;

		/* 加载下拉框数据 */
		combo.getStore().load({
			callback : function(store, records, options) {
				/* 加载表单数据 */
				if (id) {
					form.load({
						url : rootpath + '/client/system/loadUser.action',
						params : {
							id : id
						},
						success : function(form, action) {
							var params = form.getFieldValues();
							form.findField('repassword').setValue(params.loginPass);
							form.findField('enableLoginIP').setValue(params.loginIP != null && params.loginIP.length > 0);
							if (action && action.result && action.result.data) {
								var data = action.result.data;
								window.pgs.init(data.fpgIds, data.opgIds);
							}
						}
					});
				}
				/* 设定下拉框初始数据 */
				else {
					if (cv)
						combo.setValue(cv);
					window.pgs.init();
				}
			}
		});

	},
	/**
	 * 表单确认按钮行为
	 * 
	 * @private
	 */
	okHandler : function() {

		var prefix = 'user.';
		var window = this.ownerCt.ownerCt;
		var formPanel = window.fp;
		var form = formPanel.getForm();

		/* 若表单校验无误 */
		if (form.isValid()) {

			var p = form.getFieldValues();
			var params = {};

			/* 登录IP */
			if (!p.enableLoginIP)
				p.loginIP = '';
			delete p.enableLoginIP;

			/* 复用 */
			p.reuse = p.reuse ? 1 : 0;

			/* 组织结构 */
			params.orgId = p.orgId;
			delete p.orgId;

			/* 密码 */
			delete p.repassword;

			/* 权限集 */
			var pgValues = window.pgs.getSelections();
			if (pgValues[0] && pgValues[0].length > 0)
				params.fpgIds = pgValues[0];
			if (pgValues[1] && pgValues[1].length > 0)
				params.opgIds = pgValues[1];

			/* 其他参数 */
			for ( var i in p)
				if (i != '-')
					params[prefix + i] = p[i];

			var url = p.id ? rootpath + '/client/system/updateUser.action' : rootpath + '/client/system/createUser.action';

			/* 手动提交表单 */
			Ext.Ajax.request({
				url : url,
				params : params,
				success : function(response, options) {
					json = response.responseText;
					var o = response.responseData || Ext.decode(json);
					if (o && o.success) {
						if (window)
							window.close();
						try {
							if (!p.id)
								broadcastEvent('addUserEvent', function() {
								}, {
									userId : o.data
								});
							else
								broadcastEvent('modifyUserEvent', function() {
								}, {
									userId : o.data
								});
						} catch (e) {
						}
						window.callback('ok');
					}
				}
			});
		}

	},
	/**
	 * 表单关闭按钮行为
	 * 
	 * @private
	 */
	closeHandler : function() {
		var window = this.ownerCt.ownerCt;
		if (window)
			window.close();
	}
});

/**
 * @class Jinpeng.system.user.UserGrid
 * @extends Jinpeng.widget.GeneralGrid
 * @author Teon
 * 
 * 用户管理列表
 * 
 * @constructor 创建一个UserGrid
 * @param {Object} [config] 配置信息
 */
Jinpeng.system.user.UserGrid = Ext.extend(Jinpeng.widget.GeneralGrid, {
	/**
	 * @cfg {Boolean} [paging=false] 是否显示分页栏
	 */
	paging : true,
	constructor : function(config) {

		Ext.apply(this, config);

		/* Store */
		this.store = new Ext.data.Store({
			pageSize : this.pageSize,
			remoteSort : true,
			autoLoad : this.autoLoading,
			url : rootpath + '/client/system/userPage.action',
			reader : new Ext.data.JsonReader({
				fields : [ 'id', 'userName', 'userCode', 'realName', 'loginName', 'orgName', 'state' ],
				idProperty : 'id',
				root : 'result',
				totalProperty : 'totalCount'
			}),
			listeners : {
				beforeload : function(store, options) {

					var vp = Ext.getCmp('userViewport');

					/* 计算检索参数 */
					var userName = vp.searchbar.getUserName();
					var userCode = vp.searchbar.getUserCode();
					var oid = vp.tree.getSelectedNodeId();

					/* 合并参数 */
					if (!options.params)
						options.params = {};
					Ext.apply(options.params, {
						orgId : oid,
						'user.userName' : userName,
						'user.userCode' : userCode
					});
					Ext.applyIf(options.params, {
						'page.start' : 0,
						'page.limit' : this.pageSize
					});
				}
			}
		});

		/* 栏目 */
		this.columns = [ {
			header : "用户名称",
			dataIndex : 'realName',
			width : 100
		}, {
			header : "用户别名",
			dataIndex : 'userName',
			width : 100
		}, {
			header : "人员编号",
			dataIndex : 'userCode',
			width : 100
		}, {
			header : "所属部门",
			dataIndex : 'orgName',
			width : 100
		}, {
			header : "账号",
			dataIndex : 'loginName',
			width : 100
		}, {
			header : "描述",
			dataIndex : 'remark',
			width : 100
		}, {
			header : "使用状态",
			dataIndex : 'state',
			width : 100,
			renderer : function(val) {
				return val == 0 ? '失效' : '在用';
			}
		}, {
			header : "操作",
			xtype : 'actioncolumn',
			width : 100,
			items : [
			/* 修改操作 */
			{
				icon : rootpath + '/content/themes/client/blue/images/system/edit.gif',
				tooltip : '修改',
				handler : function(grid, rowIndex, colIndex) {
					var r = grid.getStore().getAt(rowIndex);
					var id = r && r.get('id') || null;
					var vp = Ext.getCmp('userViewport');
					vp.doUpdateAction(id);
				}
			},
			/* 删除操作 */
			{
				icon : rootpath + '/content/themes/client/blue/images/system/delete.gif',
				tooltip : '删除',
				handler : function(grid, rowIndex, colIndex) {
					var r = grid.getStore().getAt(rowIndex);
					var id = r && r.get('id') || null;
					var vp = Ext.getCmp('userViewport');
					vp.doDeleteAction(id);
				}
			} ]
		} ];

		Jinpeng.system.user.UserGrid.superclass.constructor.apply(this, arguments);

	}
});

/**
 * @class Jinpeng.system.user.PermGroupTabPanel
 * @extends Ext.TabPanel
 * @author Teon
 * 
 * 用户权限组设置选项卡面板
 * 
 * @constructor 创建一个PermGroupTabPanel
 * @param {Object} [config] 配置信息
 */
Jinpeng.system.user.PermGroupTabPanel = Ext.extend(Ext.TabPanel, {
	/**
	 * @cfg {Number} [activeTab=0] 默认激活的选项卡索引
	 */
	activeTab : 0,
	/**
	 * @cfg {Boolean} [border=false] 是否具有边框
	 */
	border : false,
	constructor : function(config) {

		Ext.apply(this, config);

		/* 功能权限集选项卡 */
		this.funcTab = new Jinpeng.system.user.PermGroupGrid({
			title : '功能权限集',
			url : rootpath + '/client/system/jsonListedRoles.action'
		});

		/* 组织权限集选项卡 */
		this.orgTab = new Jinpeng.system.user.PermGroupGrid({
			title : '组织权限集',
			url : rootpath + '/client/system/jsonListedOrgRoles.action'
		});

		/* 控件元素 */
		this.items = [ this.funcTab, this.orgTab ];

		Jinpeng.system.user.PermGroupTabPanel.superclass.constructor.apply(this, arguments);

	},
	init : function(funcPGs, orgPGs) {

		this.funcTab.init(funcPGs);
		this.orgTab.init(orgPGs);

	},
	reload : function() {
		this.funcTab.reload();
		this.orgTab.reload();
	},
	getSelections : function() {
		var ids1 = this.funcTab.getSelectionIds();
		var ids2 = this.orgTab.getSelectionIds();
		return [ ids1, ids2 ];
	}
});

/**
 * @class Jinpeng.system.user.PermGroupGrid
 * @extends Jinpeng.widget.GeneralGrid
 * @author Teon
 * 
 * 权限组列表
 * 
 * @constructor 创建一个PermGroupGrid
 * @param {Object} [config] 配置信息
 */
Jinpeng.system.user.PermGroupGrid = Ext.extend(Jinpeng.widget.GeneralGrid, {
	/**
	 * @cfg {String} url 异步通信URL
	 */
	url : null,
	constructor : function(config) {

		Ext.apply(this, config);

		/* Store */
		this.store = new Ext.data.Store({
			pageSize : this.pageSize,
			remoteSort : true,
			autoLoad : this.autoLoading,
			url : this.url,
			reader : new Ext.data.JsonReader({
				fields : [ 'id', 'name', 'remark' ],
				idProperty : 'id',
				root : 'data',
				totalProperty : 'totalCount'
			})
		});

		this.sm = new Ext.grid.CheckboxSelectionModel({});

		/* 栏目 */
		this.columns = [ {
			header : "名称",
			dataIndex : 'name',
			width : 100
		}, {
			header : "说明",
			dataIndex : 'remark',
			width : 100
		} ];

		Jinpeng.system.user.PermGroupGrid.superclass.constructor.apply(this, arguments);

	},
	init : function(ids) {
		if (this.rendered)
			this.reload(ids);
		else {
			this.selectionIds = ids;
			this.on('render', function(self) {
				var fn = arguments.callee;
				self.init(this.selectionIds);
				self.removeListener('render', fn);
				delete this.selectionIds;
			});
		}
	},
	getSelectionIds : function() {
		if (this.rendered) {
			var records = this.getSelectionModel().getSelections();
			var selection = [];
			for ( var i = 0; i < records.length; i++)
				selection.push(records[i].get('id'));
			return selection;
		} else
			return this.selectionIds;
	},
	reload : function(ids) {

		if (!ids)
			ids = [];

		var grid = this;
		var store = this.getStore();
		var panel = this;
		store.reload({
			callback : function(records, option, success) {
				if (records && records.length > 0) {
					var selections = [];
					for ( var i = 0; i < records.length; i++) {
						var rid = records[i].get('id');
						var checked = false;
						for ( var t = 0; t < ids.length; t++)
							if (ids[t] == rid) {
								checked = true;
								break;
							}
						if (checked)
							selections.push(records[i]);
					}
					grid.getSelectionModel().selectRecords(selections);
				}
			}
		});
	}
});