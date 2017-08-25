Ext.ns('Jinpeng.direction');

var parts = [];

/**
 * @class Jinpeng.direction.DirectionChoosePanel
 * @extends Ext.Panel
 * @author lsg
 * 选择方向面板
 * @constructor 创建一个UserMyChoosePanel
 * @param {Object} [config] 配置信息
 */
Jinpeng.direction.DirectionChoosePanel = Ext.extend(Ext.Panel, {
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
				anchor : '100%',
				enableKeyEvents: true 
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
			dataUrl : rootpath + '/systemOrg/loadMountTreeByDirection.mvc',
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
			extraUrl : rootpath + '/systemOrg/jsonDirectionsTree.mvc',
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
        		if (iconCls=='icon-direction-normal' && nodes[i].hasChildNodes() == false) {
        			sr.push(nodes[i].attributes);
					parts.push(nodes[i].attributes.text);
        		}
				if(iconCls=='icon-direction-copy'){
					sr.push(nodes[i].attributes);
					parts.push(nodes[i].attributes.text);
				}
			}
        	if(!checked){
        		var iconCls=node.attributes.iconCls;
        		if (iconCls=='icon-direction-normal' && node.hasChildNodes() == false) {
        			ur.push(nodes.attributes);
        		}
				if(iconCls=='icon-direction-copy'){
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
			var reIds = '';
			if (ids == '440100' || ids == 440100) {
				var event = 'load';
				var fn = arguments.callee;
				/* 取消监听 */
				tree.removeListener(event, fn);
				if (newNode.length > 0) {
					newNode[0].parentNode.parentNode.parentNode.expand();
					for (var m = 0; m < newNode.length; m++) {
						if (newNode[m] != undefined && newNode[m].parentNode.parentNode != null) {
							newNode[m].parentNode.parentNode.loaded = true; //很重要
							newNode[m].parentNode.parentNode.expand();
							newNode[m].parentNode.expand();
						}
					}
					/* 恢复监听 */
					tree.addListener(event, fn);
				}
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

		Jinpeng.direction.DirectionChoosePanel.superclass.constructor.apply(this, arguments);
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
			url : rootpath + '/systemOrg/findCheckedDirections.mvc',
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
 * @class Jinpeng.direction.MountSelector
 */
Jinpeng.direction.MountSelector = Ext.extend(Ext.form.TriggerField, {
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
			items : [  this.chooser = new Jinpeng.direction.DirectionChoosePanel({
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
		var data = Ext.getCmp('directions').getValue();
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

Ext.reg("mountSelector", Jinpeng.direction.MountSelector);