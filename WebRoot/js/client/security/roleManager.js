/**
 *  角色管理入口
 */
Ext.ns("Jinpeng.roleMrg");
var zhi;
var parentId = '';
var viewPortObj = null;
var downPictureWindow = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport({
		layout : 'border',
		items : [ {
			// 数据显示区域
			region : 'center',
			border : false,
			// 自定标签
			xtype : 'roleMrgInfoDataPanel'
		} ]
	});
});

/**
 * @class Jinpeng.TabPanel 工作区标签页组件
 * north区域表单部份
 */
Jinpeng.roleMrg.DeviceInfoDataPanel = Ext.extend(Ext.Panel,{
	initComponent : function() {
		
		/** 设定参数 */
		Ext.apply(	this,{
			layout : 'border',
			border : false,
			defaults : {
				margins : '0 0 0 0'
			},
			items : [ {
				region : 'north',
				xtype : 'form',
				id : 'searchDeviceForm',
				ref : "../formPanel",
				labelWidth : 85,
				border : false,
				cls : 'blue-button-ct',
				frame : true,
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;',
				items : [ {
					layout : 'column',
					items : []
				} ]
			}, {
				region : 'center',
				margins:'10 0 0 0',
				xtype : 'roleMrgInfoCenterGridPanel',
				ref : "../grid"
			}]
		});
		Jinpeng.roleMrg.DeviceInfoDataPanel.superclass.initComponent.apply(this);
	},
	afterRender : function(ct, position) {
		Jinpeng.roleMrg.DeviceInfoDataPanel.superclass.afterRender.apply(this, arguments);
	}
});

/**
 * 列表数据Store
 */
var roleMrgInfoStore = new Ext.data.JsonStore({
	url :  "query/rolesNew.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	//remoteSort : true,
	fields : [
    	{name: 'roleId'},
    	{name: 'roleName'},
     	{name: 'roleCode'},
     	{name: 'createDate', dateFormat: 'n/j/Y'},
     	{name:'createUser'},
     	{name:'actions'}
    ]
});
/**
 * 中心右区域数据显示中心
 */ 
Jinpeng.roleMrg.DeviceInfoCenterGridPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'roleMrgRecordGridPanel',
	frame : false,
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this,{
			store : roleMrgInfoStore,
			cm : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
					new Ext.ux.grid.PagingRowNumberer({ width : 40}),
					sm,
					{
							header : "权限名称", dataIndex : 'roleName',id:'roleName'
					}/*, {
						header : "所属角色", dataIndex : 'roleCode',id:'roleCode',renderer : function(key) {
							return window.dictionary.getValue("PERMGROUP_ROLE", key);
						}
					}*/, {
						header : "更新时间", dataIndex : 'createDate',id:'createDate'
					}, {
						header : "创建用户", dataIndex : 'createUser',id:'createUser'
					}/*, {
						header : "权限", dataIndex : 'actions',id:'actions'
					}*/]
			}),
			selModel : sm,
			tbar : {
				cls : 'blue-button-ct',
				items : [ {
					xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;新增&nbsp;&nbsp;&nbsp;',
					height : 20,
					id : 'addBtn',
					ref : '../btnAddNew'
				},  {
	          		  xtype : 'tbspacer',
	          		  width : 10
          	  	},{
					xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;修改&nbsp;&nbsp;&nbsp;',
					height : 20,
					id : 'editBtn',
					ref : '../btnModify'
				}, {
	          		  xtype : 'tbspacer',
	          		  width : 10
          	  	}, {
					xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;删除&nbsp;&nbsp;&nbsp;',
					height : 20,
					id : 'deleteBtn',
					ref : '../btnDelete'
				} ]
			},
			bbar : new Jinpeng.widget.PagingToolbar({
				/* 添加样式所需id */
				id : "PagingToolbar",
				store : roleMrgInfoStore,
				displayInfo : true,
				emptyMsg : "无数据",
				pageSize : this.pageSize
			}),
			listeners : {
				afterrender : function() {
					// 加载数据
					roleMrgInfoStore.load({
							params : {
								'page.start' : 0,
								'page.limit' : this.pageSize
							}
						});
				},rowdblclick : function(grid, rowIndex, e ) {
					//alert("dddd");
					var recode = grid.store.getAt(rowIndex);
					if (recode) {
						roleMrgId = recode.data.roleId;
						win = new Jinpeng.roleMrg.AddNewUserWindow();
						win.init({
							id : roleMrgId
						});
						win.show();
					}
			
				}
			}
		});
	
		Jinpeng.roleMrg.DeviceInfoCenterGridPanel.superclass.initComponent.apply(this);
		this.btnAddNew.on('click', this.onBtnAddNewHandler, this);
		this.btnModify.on('click', this.onBtnModifywHandler, this);
		this.btnDelete.on('click', this.onBtnDeleteHandler, this);
	},
	onBtnAddNewHandler : function() {
		var win = new Jinpeng.roleMrg.AddNewUserWindow({
			id : 'addNewUserWin',
			addNewFlag : true,
			title : '新增角色'
		});
		win.parentId = parentId;
		win.init();
		win.show();
	},
	onBtnModifywHandler : function() {
		var records = Ext.getCmp('roleMrgRecordGridPanel').getSelectionModel().getSelections();
		if (records.length == 1) {
			this.modifyUserInfo(records[0]);
		} else  {
			var msg = "";
			if (records.length == 0) {
				msg = "请选择要修改的记录！";
			} else {
				msg = "一次只能修改一条记录！";
			}
			var win = new Jinpeng.widget.MessageWindow();
			win.msg = msg;
			win.show();
		}
	},
	onBtnDeleteHandler : function() {
		var recodes = Ext.getCmp('roleMrgRecordGridPanel').getSelectionModel().getSelections();
		zhi =  Ext.getCmp('roleMrgRecordGridPanel').getSelectionModel().getSelections();
		if (recodes.length > 0) {
			this.deleteUserById(recodes);
		} else {
			var win = new Jinpeng.widget.MessageWindow();
			win.msg = '请选择需要删除的记录！';
			win.show();
		}
	},
	modifyUserInfo : function(roleMrg) {
		roleMrgId = roleMrg.data.roleId;
		win = new Jinpeng.roleMrg.AddNewUserWindow();
		win.init({
			id : roleMrgId
		});
		win.show();
	},
	deleteUserById : function(records) {
		var win = new Jinpeng.roleMrg.HistoryCarDetailWindows();
		win.msg = "确定要删除角色？";	
		win.show();
	},
	/* 响应查看超链接的方法 */
	checkHref : function(grid, rowIndex, colIndex, item, event) {
		var record = grid.store.getAt(rowIndex);
		if (record) {
			// 创建一个window对象
			var win = new Jinpeng.roleMrg.duplicatePlateDetailWindow();
			//将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
			win.loadId = record.get("id");
			win.show();
			cancelWindowBtnStyle();
		}
	}
});

//角色管理窗口
Jinpeng.roleMrg.AddNewUserWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
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
	 */
	callback : Ext.emptyFn,
	bbar : {
		cls : 'blue-button-ct',
		buttonAlign : 'center',
		buttons : [ {
		xtype : 'button',
		text : '&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;',
		id:'permGroupButton',
		handler : function(btn, event) {
			var window = btn.ownerCt.ownerCt;
			window.okHandler(btn, event);
		}
	}, {
  		  xtype : 'tbspacer',
  		  width : 10
  	}, {
		xtype : 'button',
		text : '&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;',
		id : 'closeBtn',
		handler : function(btn, event) {
			var window = btn.ownerCt.ownerCt;
			window.closeHandler(btn, event);
		}
	} ]
},
	
	constructor : function(config) {
		Ext.apply(this, config);
		var window = this;

		/* 权限树 */
		this.mainComponent = this.moduleTree = new Jinpeng.twidget.ModuleTree({
			region : 'center',
			dataUrl : rootpath + '/roleAction/loadAllModuleTree.mvc',
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
		/* 选项卡 */
		this.tab = new Ext.TabPanel({
			region : 'center',
			border : true,
			margins : '5',
			activeTab : 0,
			items : [ {
				title : '功能权限',
				layout : 'border',
				border : false,
				items : [ this.mainComponent ]
			}, {
				title : '用户按钮权限',
				layout : 'border',
				border : false,
				items : [{
					xtype : 'form',
					border : false,
					frame : true,
					layout : 'table',
					defaults : {
						layout : 'form',
						width : 150
					},
					layoutConfig : {
						columns : 2
					},
					region : 'center',
					items : [{
						items: [ {
				        	xtype : 'checkbox',
							id : 'add',
							fieldLabel: '新增',
							name : 'add',
							value : true,
							checked : true
				        }]
					}, {
						items: [ {
				        	xtype : 'checkbox',
							id : 'edit',
							fieldLabel: '修改',
							name : 'edit',
							value : true,
							checked : true
				        }]
					}, {
						items: [ {
				        	xtype : 'checkbox',
							id : 'delete',
							fieldLabel: '删除',
							name : 'delete',
							value : true,
							checked : true
				        }]
					}, {
						items: [ {
				        	xtype : 'checkbox',
							id : 'editVediao',
							fieldLabel: '编辑摄像机',
							name : 'editVediao',
							value : true,
							checked : true
				        }]
					}]
		        }]
			}]
		});
		/* 表单 */
		this.searchForm = new Ext.form.FormPanel({
			id:'permForm',
			xtype : 'form',
			region : 'north',
			border : false,
			autoHeight : 'auto',
			margins : '5',
			labelAlign : 'right',
			labelWidth : 100,
			items : [{
				layout : 'column',
				border : false,
				items : [{
					columnWidth : 0.7,
					layout : 'form',
					border : false,
					items : [ {
						xtype : 'hidden',
						name : 'id'
					}, {
						fieldLabel : '权限名称',
						xtype : 'textfield',
						name : 'name',
						id:'codeName',
						anchor : '-30',
						allowBlank : false,
						blankText : '请填写权限名称',
						emptyText : '请填写权限名称',
						regex : /^.{2,50}$/,
						regexText : '功能权限名称限定为2~50个字符'
					}, {
						xtype : 'hidden',
						name : 'coding'		
					} ]
				}, {
					columnWidth : 0.3,
					xtype: 'compositefield',
					items : [ {
						xtype : 'checkbox',
						id : 'unsingFlag',
						fieldLabel: '允许授权',
						name : 'unsingFlag',
						value : true,
						checked : true
					}, {
						cls : 'checkBoxLabl',
						xtype : 'label',
	                    text : '普通管理员授权'
					}]
				}]
			}]
		});
		/* 控件元素 */
		this.items = [ this.searchForm, this.tab ];
		Jinpeng.roleMrg.AddNewUserWindow.superclass.constructor.apply(this, arguments);
	},
	/**
	 * 初始化权限数据
	 * @param {Object} data
	 * @private
	 */
	init : function(data) {
		var window = this;
		var mc = window.mainComponent;
		if (data) {
			var url = rootpath + '/roleAction/findCheckedModule.mvc';
			this.searchForm.getForm().load({
				url : url,
				params : data,
				success : function(form, action) {
					if (action && action.result && action.result.data) {
						var data = action.result.data;
						// 设定用户
						var users = data.users || [];
						// 设定树数据
						var mainData = data.modules;
						mc.init(mainData);
						Ext.getCmp('add').setValue(data.addBtn == false ? '0' : '1');
						Ext.getCmp('edit').setValue(data.editBtn == false ? '0' : '1');
						Ext.getCmp('delete').setValue(data.deleteBtn == false ? '0' : '1');
						Ext.getCmp('unsingFlag').setValue(data.unsingFlag == false ? '0' : '1');
						Ext.getCmp('editVediao').setValue(data.editVediao == false ? '0' : '1');
					}
				}
			});
		} else {
			mc.reload();
		}
	},
	/**
	 * 确定处理器
	 * 
	 * @private
	 */
	okHandler : function() {
		var window = this;
		var formPanel = this.searchForm;
		var form = formPanel.getForm();
		var params = {};
		/* 计算选择的模块 */
		if (window.moduleTree) {
			mids = window.moduleTree.getChecked('id');
			var treeIdStr = mids.join(',');
			if (mids.length > 0)
				params.mids = treeIdStr;
		}

		if (form.isValid()) {
			var p = form.getFieldValues();
			delete p.orgName;
			Ext.getCmp('permGroupButton').setDisabled(true);  
			/* 重新封装参数 */
			{
				var prefix = 'role.';
				for ( var i in p)
					params[prefix + i] = p[i];
				 
			}
			var valid = true;
			/* 判断是否选择了模块 */
			if (!params.mids || params.mids.length == 0) {
				valid = false; 
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '请至少选择一个模块';
				Ext.getCmp('permGroupButton').setDisabled(false);  
				win.show();
			}
			params.addBut = Ext.getCmp('add').getValue() == false ? '0' : '1';
			params.editBut = Ext.getCmp('edit').getValue() == false ? '0' : '1';
			params.deleteBut = Ext.getCmp('delete').getValue() == false ? '0' : '1';
			params.unsingFlag = Ext.getCmp('unsingFlag').getValue() == false ? '0' : '1';
			params.editVediao = Ext.getCmp('editVediao').getValue() == false ? '0' : '1';
			/*alert(params.mids);
			return;*/
			/* 手动提交表单 */
			if (valid) {
				/* 分析URL */
				var url = null;
				if (p.id) {
					url = rootpath + '/roleAction/updateRole.mvc';
				} else {
					url = rootpath + '/roleAction/addRole.mvc';
				}
				/* 提交数据 */
				Ext.Ajax.request({
					url : url,
					params : params,
					success : function(response, options) {
						json = response.responseText;
						var o = response.responseData || Ext.decode(json);
						var result = o.data;
						var msg = "";
						if (result == 1) {
							msg = "操作成功！";
							window.close();
							var grid = Ext.getCmp('roleMrgRecordGridPanel');
							grid.publish("clearGridSelections",[]);
							grid.store.reload();
						} else {
							msg = "操作失败";
						}
						var win = new Jinpeng.widget.MessageWindow();
						win.msg = msg;
						win.show();
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

//还原窗口上的按钮为默认样式
function cancelWindowBtnStyle() {
	document.getElementById("confimBtn").className = "";
	document.getElementById("cancelBtn").className = "";
}

Jinpeng.roleMrg.HistoryCarDetailWindows = Ext.extend(Jinpeng.widget.GeneralWindow,{
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
		Jinpeng.roleMrg.HistoryCarDetailWindows .superclass.initComponent.apply(this);
	},fengshow : function(){
		this.close();
		var records = zhi;
		var _this = this;
		var ids = [];
		var roleMrgsIDS = [];
		var roleMrgNames = [];
		var isContinue = true;
		var deleteurl = '';
		Ext.each(records, function(item, index, items) {
			ids.push(item.get("roleId"));
		});
		deleteurl = rootpath + '/roleAction/roleDeletes.mvc';
		if (!isContinue)
			return;
		/* 确认删除与否 */
					/* 确认删除则通过AJAX请求删除相应的数据 */
					Ext.Ajax.request({
						url : deleteurl,
						params : {
							USER_IDS : ids.join(",")
						},
						success : function(response, options) {
							var o = response.responseData || Ext.decode(response.responseText);
							var result = o.data;
							
							var msg = "";
							if (result > 0) {
								msg = "删除角色成功！";
								//刷新页面
								var grid = Ext.getCmp("roleMrgRecordGridPanel");
								if(grid){
									grid.publish("clearGridSelections",[]);
									grid.store.reload();
								}
							} else {
								msg = "删除角色失败！";
							}
							var win = new Jinpeng.widget.MessageWindow();
							win.msg = msg;
							win.show();
						}
					});
	},
	afterRender : function() {
		Jinpeng.roleMrg.HistoryCarDetailWindows .superclass.afterRender.call(this);
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
Ext.reg('roleMrgInfoDataPanel', Jinpeng.roleMrg.DeviceInfoDataPanel);
Ext.reg('roleMrgInfoCenterGridPanel',Jinpeng.roleMrg.DeviceInfoCenterGridPanel);
