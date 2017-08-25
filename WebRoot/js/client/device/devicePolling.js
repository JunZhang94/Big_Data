/**
 * \ * 入口
 */
Ext.ns("Jinpeng.userMgr");

var orgType = '';
var parentId = '';
var parentName = '';
var code = '';
var zhi='';
var recode='';

var viewPortObj = null;
var downPictureWindow = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport({
		layout : 'border',
		items : [ {
			region : 'west',
			width : 240,
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
	dataUrl : rootpath + '/systemOrg/orgTreeMap.mvc?deviceFlag=devicePolling', 
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
		orgType = node.attributes.orgType;//判断选择的卡点还是市局和分局。0为市局，1为分局，2为卡点
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
					labelWidth : 85,
					border : false,
					cls : 'blue-button-ct',
					frame : true,
					bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;',
					items : [ {
						layout : 'column',
						bodyStyle : 'margin-top: 5px;',
						items : [ {
							columnWidth : 0.3,
							layout : 'form',

							border : false,
							items : [ {
								xtype : 'tooltiptextfield',
								tooltip : {
									text : "用户名称"
								},
								fieldLabel : '&nbsp;&nbsp;用户名称',
								name : 'userName',
								id : 'userName'
							} ]
						}, {
							columnWidth : 0.7,
							layout : 'form',
							border : false,
							items : [ {
								xtype : 'button',
								text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
								id : 'searchBtn',
								handler : this.advanceSearch,
								scope : this
							} ]
						} ]
					} ]
				}, {
					region : 'center',
					margins:'10 0 0 0',
					xtype : 'userMgrInfoCenterGridPanel',
					ref : "../grid"
				}]
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
					"orgType":orgType
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
	url : rootpath + "/devicePolling/queryDevicePolling.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	remoteSort : true,
	fields : [
	      {name : 'ID'},
          {name : 'DEVICE_ID'},
          {name : 'DEVICE_NAME'},
          {name : 'JOB_NUMBER'},
          {name : 'POLLING_NAME'},
          {name : 'POLLING_TIME'},
          {name : 'PHONE_NUMBER'},
          {name : 'CONTACT_ADDRESS'},
          {name : 'POLING_REMARCK'}
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
									header : "巡检信息编号", dataIndex : 'DEVICE_ID',
									renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
										//当文字过多的时候，鼠标移上去就给悬浮狂提示
								     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
									}
								}, {
									header : "巡检信息名称", dataIndex : 'DEVICE_NAME',
				                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
										//当文字过多的时候，鼠标移上去就给悬浮狂提示
								     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
									}
								}, {
									header : "巡检人", dataIndex : 'POLLING_NAME',
									renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
										//当文字过多的时候，鼠标移上去就给悬浮狂提示
								     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
									}
								}, {
									header : "工号", dataIndex : 'JOB_NUMBER'
								}, {
									header : "巡检日期", dataIndex : 'POLLING_TIME',
									renderer : function(key) {
										if (key == '' || key == null) {
											return '';
										} else {
											var array = key.split(" ");
											return array[0];
										}
									}
								}, {
									header : "联系方式", dataIndex : 'PHONE_NUMBER',
									renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
										if(value == null || value ==''){
										   var lxfs  = '&nbsp;';
								     	   return '<font ext:qtip="'+lxfs+'">'+lxfs+'</font>';
										}else{
											//当文字过多的时候，鼠标移上去就给悬浮狂提示
									     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
										}
										
									}
								}, {
									header : "联系地址", dataIndex : 'CONTACT_ADDRESS',
									renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
										//当文字过多的时候，鼠标移上去就给悬浮狂提示
								     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
									}
								}, {
									header : "巡检记录", dataIndex : 'POLING_REMARCK',
									renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
										if(value == null || value == ''){
											 var xjjl = '&nbsp;';
									     	 return '<font ext:qtip="'+xjjl+'">'+xjjl+'</font>';
										}else{
											//当文字过多的时候，鼠标移上去就给悬浮狂提示
									     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
										}
										
									}
								}, {
									header : '操作',
									xtype : 'actioncolumn',
									width : 70,
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
								} ]
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
							},{
						  		  xtype : 'tbspacer',
						  		  width : 10
						  },  {
								xtype : 'button',
								text : '&nbsp;&nbsp;&nbsp;修改&nbsp;&nbsp;&nbsp;',
								height : 20,
								id : 'updateBtn',
								ref : '../btnModify'
							},{
						  		  xtype : 'tbspacer',
						  		  width : 10
						  },  {
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
							},
							
							/*双击查看*/
							rowdblclick : function(grid, rowIndex, e ) {
								
								var recode = grid.store.getAt(rowIndex);
								if (recode) {
									var win,devicePollingId ;
									
									devicePollingId = recode.data.ID;
									
									win = new Jinpeng.devicePolling.AddNewDevicePollingWindow();
									
									win.loadRecordById(devicePollingId);
								}
						
							}
						}
			});
			Jinpeng.userMgr.UserInfoCenterGridPanel.superclass.initComponent.apply(this);
			
			this.btnAddNew.on('click', this.onBtnAddNewHandler, this);
			this.btnModify.on('click', this.onBtnModifywHandler, this);
			this.btnDelete.on('click', this.onBtnDeleteHandler, this);
		},
		onBtnAddNewHandler : function() {
			var win = new Jinpeng.devicePolling.AddNewDevicePollingWindow({
				id : 'addNewDeviceWin',
				addNewFlag : true,
				title : '新增人工巡检'
			});
			//win.loadEmptyRecord();
			win.show();
		},
		onBtnModifywHandler : function() {
			var records = Ext.getCmp('userMgrRecordGridPanel').getSelectionModel().getSelections();
			if (records.length == 1) {
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
			zhi = Ext.getCmp('userMgrRecordGridPanel').getSelectionModel().getSelections();
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
		modifyUserInfo : function(devicePolling) {
			var win,devicePollingId ;
			
			devicePollingId = devicePolling.data.ID;
			
			win = new Jinpeng.devicePolling.AddNewDevicePollingWindow();
			
			win.loadRecordById(devicePollingId);
			
//			userMgrId = userMgr.data.USER_ID;
//			win = new Jinpeng.userMgr.AddNewUserWindow();
//			win.loadRecordById(userMgrId);
//			cancelWindowBtnStyle();
		},
		onDeleteHandler : function(grid, rowIndex, colIndex, item, event) {
			event.stopEvent();
			 recode = grid.store.getAt(rowIndex);
			if (recode) {
				this.deleteUserById([ recode ]);
			}
		},
		deleteUserById : function(records) {
			var win = new Jinpeng.userMgr.HistoryCarDetailWindows();
			win.msg = "确定删除？";	
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
		var records = zhi;
		this.close();
		if(recode!=''){
			records = recode;
		}else if(zhi!=''){
		    records = zhi;	
		}
		var _this = this;
		var ids = [];
		var devicePollingsIDS = [];
		var devicePollingNames = [];
		var isContinue = true;
		Ext.each(records, function(item, index, items) {
			/*if (!_this.isAllowDeleteOrModify(item,true)) {
				isContinue = false;
				return false;
			}*/
			ids.push(item.get("ID"));
			//devicePollingsIDS.push(item.get("devicePollingId"));
			//devicePollingNames.push(item.get("title"));
		});
		if (!isContinue)
			return;
					/* 确认删除则通过AJAX请求删除相应的数据 */
					Ext.Ajax.request({
						url : rootpath + '/devicePolling/deleteDevicePolling.mvc',
						params : {
							idStr : ids.join(",")
							//devicePollingNames : devicePollingNames.join(",")
						},
						success : function(response, options) {
							var o = response.responseData || Ext.decode(response.responseText);
							var result = o.data;
							
							var msg = "";
							if (result > 0) {
								var grid  = Ext.getCmp("userMgrRecordGridPanel");
								if(grid){
									grid.publish("clearGridSelections",[]);
									grid.store.reload();
								}
								msg = "删除巡检信息成功！";
								//dispatchDeviceMessage(result[1]);
								//this.close();
							} else {
								msg = "删除巡检信息失败!";
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
