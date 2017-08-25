/**
 * \ * 入口
 */
Ext.ns("Jinpeng.userMgr");
var zhi='' ;
var recode='';
var orgType = '';
var parentId = '';
var parentName = '';
var code = '';

var viewPortObj = null;
var downPictureWindow = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport({
		layout : 'border',
		items : [ {
			region : 'west',
			width : 300,
			layout : 'fit',
			border : false,
			xtype : 'menuwestpanel'
		}, {
			// 数据显示区域
			region : 'center',
			border : false,
			// 自定标签
			xtype : 'userMgrInfoDataPanel'
		} ]
	});
});

Jinpeng.userMgr.MenuWestPanel = Ext.extend(Jinpeng.widget.OrganizationTree, {
	id : 'orgTreeWestPanel',
	autoLoading : true,
	showCheckbox : false,
	autoExpandAll : false,
	animate : true,
	title : '组织机构',
	dataUrl : rootpath + '/systemOrg/onlyOrgTreeForUser.mvc', 
	initComponent : function() {
		this.on('beforeclick', this.onTreeNodeBeforeClick, this);
		this.on('click', this.onTreeNodeClick, this);

		Jinpeng.userMgr.MenuWestPanel.superclass.initComponent.apply(this);

	},
	afterRender : function(ct, position) {
		Jinpeng.userMgr.MenuWestPanel.superclass.afterRender.apply(this, arguments);
	},
	onTreeNodeClick : function(node, e) {
		code = node.attributes.id;
		parentId = code;
		orgType = node.attributes.orgType;
		var userMgrgrid = Ext.getCmp('userMgrRecordGridPanel');
		if (userMgrgrid) {
			userMgrgrid.store.baseParams = {};// 重置
			userMgrgrid.store.baseParams["code"] = code;
			userMgrgrid.store.baseParams["orgType"] = orgType;
			userMgrgrid.publish("clearGridSelections", []);
			userMgrgrid.store.load({
				params : {
					'page.start' : 0,
					'page.limit' : userMgrgrid.pageSize
				}
			});
		}
	},
	onTreeNodeBeforeClick : function(node, e) {
		if (node.id == -1) {

		} else {

		}
	},
	refresh : function() {
		var root = this.root;
		root.reload();
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
	},
	getSelectedOrgInfo : function() {
		var sm = this.getSelectionModel();
		var node = sm ? sm.getSelectedNode() : null;
		if (node) {
			var result = {
				'id' : node.id,
				'coding' : node.attributes['coding'],
				'text' : node.attributes['text'],
				'isDirection' : false,
				'longitude' : '',
				'latitude' : ''
			};
			var isDirection = node.attributes['type'] == Jinpeng.ChannelTreePanel.nodeType.DIRECTION ? true : false;
			var isCheckPoint = node.attributes['type'] == Jinpeng.ChannelTreePanel.nodeType.KAKOU ? true : false;
			if (isDirection) {
				result['isDirection'] = true;
				result['longitude'] = node.parentNode.attributes['longitude'];
				result['latitude'] = node.parentNode.attributes['latitude'];
			}
			if (isCheckPoint) {
				result['longitude'] = node.attributes['longitude'];
				result['latitude'] = node.attributes['latitude'];
			}
			return result;
		}
		return null;

	}
});

/**
 * 区域表单组件
 */
Jinpeng.userMgr.UserInfoDataPanel = Ext.extend(Ext.Panel,{
		initComponent : function() {
			
			//所属角色
			var userRoleStore = new Ext.data.JsonStore({
				url : rootpath + "/dictionary/jsonAllRoleInCombo.mvc",
				root : "data",
				fields : [ 'id', 'text' ],
				autoLoad : false
		    });
			/** 设定参数 */
			Ext.apply(	this,{
				layout : 'border',
				border : false,
				defaults : {
					margins : '0 0 0 0'
				},
				items : [ {
					region : 'north',
					height : 45,
					xtype : 'form',
					id : 'searchUserForm',
					ref : "../formPanel",
					layout : 'table',
					defaults : {
						layout : 'form',
						width : 320
					},
					layoutConfig : {
						columns : 3
					},
					labelWidth : 85,
					border : false,
					cls : 'blue-button-ct',
					frame : true,
					bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
					items : [ {
						items : [ {
							columnWidth : 0.6,
							layout : 'form',
							border : false,
							items : [ {
								xtype : 'tooltiptextfield',
								tooltip : {
									text : "用户名称"
								},
								fieldLabel : '&nbsp;&nbsp;用户名称',
								name : 'userName',
								id : 'userName',
								anchor : '94%'
							}]
						}]
					}, {
						items : [{
						    xtype : 'tcombo',
						    id : 'userRole',
						    name : 'userRole',
						    fieldLabel : '所属角色',
						    store : userRoleStore,
						    mode : 'local',
						    emptyText : '全部',
						    triggerAction : 'all',
						    valueField : 'id',
						  	displayField : 'text',
							anchor : '94%'
						} ]
					}, {
						items : [ {
							xtype : 'button',
							text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
							id : 'searchBtn',
							handler : this.advanceSearch,
							scope : this
						}]
					}]
				}, {
					region : 'center',
					margins:'10 0 0 0',
					xtype : 'userMgrInfoCenterGridPanel',
					ref : "../grid"
				}],
				listeners : {
					afterrender : function() {
						/*所属角色Store*/
						userRoleStore.load();
					}
				}
			});
			Jinpeng.userMgr.UserInfoDataPanel.superclass.initComponent.apply(this);
		},
		afterRender : function(ct, position) {
			Jinpeng.userMgr.UserInfoDataPanel.superclass.afterRender.apply(this, arguments);
		},
		/* 响应查询按钮 */
		advanceSearch : function() {
			var form = Ext.getCmp('searchUserForm');
			if (form.getForm().isValid()) {
				var grid = Ext.getCmp('userMgrRecordGridPanel');
				grid.store.baseParams = {};// 重置
				/** 将参数传入后台 */
				var baseparams = {
					"userName" : Ext.getCmp('userName').getValue(),
					"code" : code,
					"orgType" : orgType,
					"userRole" : Ext.getCmp('userRole').getValue()
				};
				grid.store.baseParams = baseparams;
				/*刷新选中*/
				this.publish("clearGridSelections",[]);
				grid.store.load({
					params : {
						'page.start' : 0,
						'page.limit' : Jinpeng.PageSize
					}
				});
			}
		}
	});

/**
 * 列表数据Store
 */
var userMgrInfoStore = new Ext.data.JsonStore({
	url : rootpath + "/user/queryUser.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	remoteSort : true,
	fields : [
          {name : 'USER_CODE'},
          {name : 'USER_NAME'},
          {name : 'SEX'},
          {name : 'POST'},
//          {name : 'ORGAN_ID'},
          {name : 'PHONE'},
          {name : 'VIDEO_CODE'},
          {name : 'VIDEO_PWD'},
          {name : 'ROLE_ID'},
          {name : 'USER_ID'},
          {name : 'IP'},
          {name : 'ID_CARD'},
          {name : 'ORGNAME'},
          {name : 'ROLE_NAME'},
          {name : 'UINT_NAME'}
      ]
});
/**
 * 中心右区域数据显示中心
 */ 
Jinpeng.userMgr.UserInfoCenterGridPanel = Ext.extend(Ext.grid.GridPanel,{
		id : 'userMgrRecordGridPanel',
		frame : false,
		border : false,
		pageSize : Jinpeng.PageSize,
		initComponent : function() {
			var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
			Ext.apply(this,{
				store : userMgrInfoStore,
				cm : new Ext.grid.ColumnModel({
					defaults : {
						sortable : true
					},
					columns : [
							new Ext.ux.grid.PagingRowNumberer({ width : 40}),
							sm,
							{
								header : "用户", dataIndex : 'USER_NAME',
			                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
									//当文字过多的时候，鼠标移上去就给悬浮狂提示
							     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
								}
							}, {
								header : '<div style="text-align:center;">所属部门</div>', dataIndex : 'UINT_NAME', width : 300, align : 'left',
			                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
									//当文字过多的时候，鼠标移上去就给悬浮狂提示
							     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
								}
//								renderer : function(value, metadata, record, rowIndex, colIndex, store) {
//								return window.dictionary.getValue("department", value);
//					}
							}, {
								header : "身份证号", dataIndex : 'ID_CARD',width : 170,
			                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
									//当文字过多的时候，鼠标移上去就给悬浮狂提示
							     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
								}
							},{
								header : "所属角色", dataIndex : 'ROLE_NAME',
			                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
									//当文字过多的时候，鼠标移上去就给悬浮狂提示
							     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
								}
							}, {
								header : "电话", dataIndex : 'PHONE',
			                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
									//当文字过多的时候，鼠标移上去就给悬浮狂提示
							     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
								}
							}/*,
							{
								header : '操作',
								xtype : 'actioncolumn',
								width : 60,
								align : 'center',
								items : [ {
									icon : rootpath + '/themes/client/blue/images/system/edit.gif',
									tooltip : '修改',
									scope : this,
									handler : this.onModifyHandler
								}, {
									icon : rootpath + '/themes/client/blue/images/system/delete.gif',
									tooltip : '删除',
									scope : this,
									handler : this.onDeleteHandler
								} ]
							}*/ ]
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
							}, {
								xtype : 'tbspacer',
								width : 10
							}, {
								xtype : 'button',
								text : '&nbsp;&nbsp;&nbsp;修改&nbsp;&nbsp;&nbsp;',
								height : 20,
								id : 'updateBtn',
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
							store : userMgrInfoStore,
							displayInfo : true,
							emptyMsg : "无数据",
							pageSize : this.pageSize
						}),
						listeners : {
							afterrender : function() {
								// 加载数据
								userMgrInfoStore.load({
									params : {
										'page.start' : 0,
										'page.limit' : this.pageSize
									}
								});
								this.button_control();
							},/*双击查看*/
							rowdblclick : function(grid, rowIndex, e ) {
								
								var recode = grid.store.getAt(rowIndex);
								if (recode) {
									var roleName = recode.data.ROLE_NAME;
									var userCode = recode.data.USER_CODE;
									var loginCode = loginUserCode;
									var loginRole = loginRoleName;
									if (loginRole != '超级管理员权限') {
										if (userCode == loginCode) {
											var msg = "普通管理员，不能修改自己的权限，请重新操作！";
											var win = new Jinpeng.widget.MessageWindow();
											win.msg = msg;
											win.show();
											return;
										}
										if (roleName.indexOf('管理员') != -1 && userCode != loginCode) {
											var msg = "普通管理员，不能修改其他管理员权限，请重新操作！";
											var win = new Jinpeng.widget.MessageWindow();
											win.msg = msg;
											win.show();
											return;
										}
									}
									userMgrId = recode.data.USER_ID;
									win = new Jinpeng.userMgr.AddNewUserWindow();
									win.loadRecordById(userMgrId);
									cancelWindowBtnStyle();
								}
						
							}
						}
			});
			// 响应最后一列查看点击事件 
			this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
				// var record =Ext.getCmp('userMgrRecordGridPanel').getStore().getAt(rowIndex);
				var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
				if (fieldName == 'operate') {
					if (typeof this.checkHref == 'function')
						/* 调用查看超链接方法 */
						this.checkHref(grid, rowIndex, columnIndex);
				}
			});
			Jinpeng.userMgr.UserInfoCenterGridPanel.superclass.initComponent.apply(this);
			
			this.btnAddNew.on('click', this.onBtnAddNewHandler, this);
			this.btnModify.on('click', this.onBtnModifywHandler, this);
			this.btnDelete.on('click', this.onBtnDeleteHandler, this);
		},
		/**
		 * 按钮权限控制
		 */
		button_control : function() {
			Ext.Ajax.request({
				url : rootpath + '/roleAction/findUserRoleInfo.mvc',
				params : {},
				success : function(response, options) {
					var o = response.responseData || Ext.decode(response.responseText);
					var result = o.data;
					var addValue = result[0].ADD_ROLE;
					var editValue = result[0].EDIT_ROLE;
					var deleteValue = result[0].DELETE_ROLE;
					if (addValue == '0') {
						Ext.getCmp('addBtn').setDisabled(true);
					}
					if (editValue == '0') {
						Ext.getCmp('updateBtn').setDisabled(true);
					}
					if (deleteValue == '0') {
						Ext.getCmp('deleteBtn').setDisabled(true);
					}
				}
			});
		},
		onBtnAddNewHandler : function() {
			var win = new Jinpeng.userMgr.AddNewUserWindow({
				id : 'addNewUserWin',
				addNewFlag : true,
				title : '新增用户'
			});
			win.parentId = parentId;
			win.show();
			cancelWindowBtnStyle();
		},
		onBtnModifywHandler : function() {
			var records = Ext.getCmp('userMgrRecordGridPanel').getSelectionModel().getSelections();
			if (records.length == 1) {
				var roleName = records[0].get("ROLE_NAME");
				var userCode = records[0].get("USER_CODE");
				var loginCode = loginUserCode;
				var loginRole = loginRoleName;
				if (loginRole != '超级管理员权限') {
					if (userCode == loginCode) {
						var msg = "普通管理员，不能修改自己的权限，请重新操作！";
						var win = new Jinpeng.widget.MessageWindow();
						win.msg = msg;
						win.show();
						return;
					}
					if (roleName.indexOf('管理员') != -1 && userCode != loginCode) {
						var msg = "普通管理员，不能修改其他管理员权限，请重新操作！";
						var win = new Jinpeng.widget.MessageWindow();
						win.msg = msg;
						win.show();
						return;
					}
				}
				this.modifyUserInfo(records[0]);
			} else {
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
			var recodes = Ext.getCmp('userMgrRecordGridPanel').getSelectionModel().getSelections();
			if (recodes.length > 0) {
				// this.deleteUserById(recode.get("id"),recode.get("userMgrId"));
				this.deleteUserById(recodes);
			} else {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '请选择需要删除的记录！';
				win.show();
			}
		},
		onModifyHandler : function(grid, rowIndex, colIndex, item, event) {
			event.stopEvent();
			var recode = grid.store.getAt(rowIndex);
			if (recode) {
				this.modifyUserInfo(recode);
			}
		},
		modifyUserInfo : function(userMgr) {
			userMgrId = userMgr.data.USER_ID;
			win = new Jinpeng.userMgr.AddNewUserWindow();
			win.loadRecordById(userMgrId);
			cancelWindowBtnStyle();
		},
		onDeleteHandler : function(grid, rowIndex, colIndex, item, event) {
			event.stopEvent();
			 recode = grid.store.getAt(rowIndex);
			if (recode) {
				this.deleteUserById([ recode ]);
			}
		},
		deleteUserById : function(records) {
			zhi=Ext.getCmp('userMgrRecordGridPanel').getSelectionModel().getSelections();
			var win = new Jinpeng.userMgr.HistoryCarDetailWindows();
			win.msg = "确定要删除用户？";	
			win.show();
		},
		/* 响应查看超链接的方法 */
		checkHref : function(grid, rowIndex, colIndex, item, event) {
			var record = grid.store.getAt(rowIndex);
			if (record) {
				// 创建一个window对象
				var win = new Jinpeng.userMgr.KakouShowHistoryDetailWindow();
				//将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
				win.loadId = record.get("id");
				win.show();
				cancelWindowBtnStyle();
			}
		}
	});
Jinpeng.userMgr.HistoryCarDetailWindows = Ext.extend(Jinpeng.widget.GeneralWindow,{
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
		Jinpeng.userMgr.HistoryCarDetailWindows .superclass.initComponent.apply(this);
	},fengshow : function(){
		this.close();
					var records;
					if(recode!=''){
						records=recode;
					}else if(zhi!=''){
					records=zhi;	
					}
					var _this = this;
					var ids = [];
					var userMgrsIDS = [];
					var userMgrNames = [];
					var isContinue = true;
					var deleteurl = '';
					Ext.each(records, function(item, index, items) {
						ids.push(item.get("USER_ID"));
					});
					deleteurl = rootpath + '/user/deleteUser.mvc';
					if (!isContinue)
						return;
					/* 确认删除与否 */
								/* 确认删除则通过AJAX请求删除相应的数据 */
								Ext.Ajax.request({
									url : deleteurl,
									params : {
										USER_IDS : ids.join(",")
										//userMgrNames : userMgrNames.join(",")
									},
									success : function(response, options) {
										var o = response.responseData || Ext.decode(response.responseText);
										var result = o.data;
										
										var msg = "";
										if (result > 0) {
											var grid = Ext.getCmp("userMgrRecordGridPanel");
											if(grid){
												grid.publish("clearGridSelections",[]);
												grid.store.reload();
											}
											msg = "删除用户成功！";
											//dispatchUserMessage(result[1]);
											//this.close();
										} else {
											msg = "删除用户失败！";
										}
										recode='';
										zhi='';
										var win = new Jinpeng.widget.MessageWindow();
										win.msg = msg;
										win.show();
									}
								});
		
	},
	afterRender : function() {
		Jinpeng.userMgr.HistoryCarDetailWindows .superclass.afterRender.call(this);
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
Ext.reg('menuwestpanel', Jinpeng.userMgr.MenuWestPanel);
Ext.reg('userMgrInfoDataPanel', Jinpeng.userMgr.UserInfoDataPanel);
Ext.reg('userMgrInfoCenterGridPanel',Jinpeng.userMgr.UserInfoCenterGridPanel);
