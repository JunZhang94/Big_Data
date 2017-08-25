/**
 *  入口
 */
Ext.ns("Jinpeng.troubleDealWith");

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
			xtype : 'troubleDealWithInfoDataPanel'
		} ]
	});
});

/**
 * @class Jinpeng.TabPanel 工作区标签页组件
 * north区域表单部份
 */
Jinpeng.troubleDealWith.TroubleDealWithInfoDataPanel = Ext.extend(Ext.Panel,{
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
					id : 'searchDeviceForm',
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
									text : "卡口信息"
								},
								fieldLabel : '&nbsp;&nbsp;卡口信息',
								name : 'troubleDealWithName',
								id : 'troubleDealWithName'
							} ]
						}, {
							columnWidth : 0.7,
							layout : 'form',
							border : false,
							items : [ {
								xtype : 'button',
								text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
								id : 'searchBut',
								handler : this.advanceSearch,
								scope : this
							} ]
						} ]
					} ]
				}, {
					region : 'center',
					margins:'10 0 0 0',
					xtype : 'troubleDealWithInfoCenterGridPanel',
					ref : "../grid"
				}]
			});
			Jinpeng.troubleDealWith.TroubleDealWithInfoDataPanel.superclass.initComponent.apply(this);
		},
		afterRender : function(ct, position) {
			Jinpeng.troubleDealWith.TroubleDealWithInfoDataPanel.superclass.afterRender.apply(this, arguments);
		},
		/* 响应查询按钮 */
		advanceSearch : function() {
			var form = Ext.getCmp('searchDeviceForm');
			if (form.getForm().isValid()) {
				var grid = Ext.getCmp('troubleDealWithRecordGridPanel');
				grid.store.baseParams = {};// 重置
				/** 将参数传入后台 */
				var baseparams = {
					"troubleDealWithName" : Ext.getCmp('troubleDealWithName').getValue()
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
var troubleDealWithInfoStore = new Ext.data.JsonStore({
	url : rootpath + "/device/queryDeviceTrouble.mvc?queryType=dealWith",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	remoteSort : true,
	fields : [
	      {name : 'ZTXH'},
          {name : 'SBBH'},
          {name : 'SCSJ'},
          {name : 'GZSJ'},
          {name : 'GZZT1'},
          {name : 'DEVICE_NAME'},
          {name : 'DEAL_WITH_FLAG'},
          {name : 'DEAL_WITH_CONTENT'},
          {name : 'REGISTER_PERSON'},
          {name : 'LINK_PHONE'},
          {name : 'REGISTER_FLAG'},
          {name : 'REMARCK'}
      ]
});
/**
 * 中心右区域数据显示中心
 */ 
Jinpeng.troubleDealWith.TroubleDealWithInfoCenterGridPanel = Ext.extend(Ext.grid.GridPanel,{
		id : 'troubleDealWithRecordGridPanel',
		frame : false,
		border : false,
		pageSize : Jinpeng.PageSize,
		initComponent : function() {
			var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
			Ext.apply(this,{
				store : troubleDealWithInfoStore,
				cm : new Ext.grid.ColumnModel({
					defaults : {
						sortable : true
					},
					columns : [
							new Ext.ux.grid.PagingRowNumberer({ width : 40}),
							sm,
							{
								header : "设备编号", dataIndex : 'SBBH',
			                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
									//当文字过多的时候，鼠标移上去就给悬浮狂提示
							     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
								}
							}, {
								header : "设备名称", dataIndex : 'DEVICE_NAME',
			                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
									//当文字过多的时候，鼠标移上去就给悬浮狂提示
							     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
								}
							}, {
								header : "故障类型", dataIndex : 'GZZT1',
			                    renderer: function(key,cellmeta,record,rowIndex,columnIndex,store){ 
									//当文字过多的时候，鼠标移上去就给悬浮狂提示
								     var gzlx = window.dictionary.getValue("FaultState", key);
							     	 return '<font ext:qtip="'+gzlx+'">'+gzlx+'</font>';
								}
							}, {
								header : "故障时间", 
								dataIndex : 'GZSJ',
			                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
									//当文字过多的时候，鼠标移上去就给悬浮狂提示
								     var gzsj = value.substring(0,value.indexOf("."));
							     	 return '<font ext:qtip="'+gzsj+'">'+gzsj+'</font>';
								}
							}, {
								header : "登记人", dataIndex : 'REGISTER_PERSON'
							}, {
								header : "登记时间",
								dataIndex : 'SCSJ',
								renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
									//当文字过多的时候，鼠标移上去就给悬浮狂提示
								     var djsj = value.substring(0,value.indexOf("."));
							     	 return '<font ext:qtip="'+djsj+'">'+djsj+'</font>';
								} 
							}, {
								header : "联系电话", dataIndex : 'LINK_PHONE'
							}, {
								header : "描述", dataIndex : 'REMARCK',
			                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
									//当文字过多的时候，鼠标移上去就给悬浮狂提示
							     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
								}
							}, {
								header : '操作',
								xtype : 'actioncolumn',
								width : 60,
								align : 'center',
								items : [ {
									icon : rootpath + '/themes/client/blue/images/system/edit.gif',
									text : '确认',
									tooltip : '确认',
									scope : this,
									handler : this.onVerifyHandler
								} ]
							} ]
						}),
						selModel : sm,
						tbar : {
							cls : 'blue-button-ct',
							items : [ {
								xtype : 'button',
								text : '&nbsp;&nbsp;&nbsp;确认&nbsp;&nbsp;&nbsp;',
								id : 'confimBtn',
								height : 20,
								handler : this.onBtnVerifyHandler,
								scope : this
							} ]
						},
						bbar : new Jinpeng.widget.PagingToolbar({
							/* 添加样式所需id */
							id : "PagingToolbar",
							store : troubleDealWithInfoStore,
							displayInfo : true,
							emptyMsg : "无数据",
							pageSize : this.pageSize
						}),
						listeners : {
							afterrender : function() {
								// 加载数据
								troubleDealWithInfoStore.load({
										params : {
											'page.start' : 0,
											'page.limit' : this.pageSize
										}
									});
							},rowdblclick : function(grid, rowIndex, e ) {
								
								var recode = grid.store.getAt(rowIndex);
								if (recode) {
									var win,troubleDealWithId ;
									
									troubleDealWithId = recode.data.ZTXH;
									
									win = new Jinpeng.troubleDealWith.AddNewTroubleDealWithWindow();
									
									win.loadRecordById(troubleDealWithId);
								}
						
							}
						}
			});
			// 响应最后一列查看点击事件 
			this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
				// var record =Ext.getCmp('troubleDealWithRecordGridPanel').getStore().getAt(rowIndex);
				var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
				if (fieldName == 'operate') {
					if (typeof this.checkHref == 'function')
						/* 调用查看超链接方法 */
						this.checkHref(grid, rowIndex, columnIndex);
				}
			});
			Jinpeng.troubleDealWith.TroubleDealWithInfoCenterGridPanel.superclass.initComponent.apply(this);
			
		},
		onBtnVerifyHandler : function() {
			var records = Ext.getCmp('troubleDealWithRecordGridPanel').getSelectionModel().getSelections();
			if (records.length == 1) {
				this.troubleDealWithInfo(records[0]);
			} else {
				var msg = "";
				if (records.length == 0) {
					msg = "请选择要确认的记录！";
				} else {
					msg = "一次只能确认一条记录！";
				}
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = msg;
				win.show();
			}
		},
		onVerifyHandler : function(grid, rowIndex, colIndex, item, event) {
			event.stopEvent();
			var recode = grid.store.getAt(rowIndex);
			if (recode) {
				this.troubleDealWithInfo(recode);
			}
		},
		troubleDealWithInfo : function(troubleDealWith) {
			var win,troubleDealWithId ;
			
			troubleDealWithId = troubleDealWith.data.ZTXH;
			
			win = new Jinpeng.troubleDealWith.AddNewTroubleDealWithWindow();
			
			win.loadRecordById(troubleDealWithId);
		},
		/* 响应查看超链接的方法 */
		checkHref : function(grid, rowIndex, colIndex, item, event) {
			var record = grid.store.getAt(rowIndex);
			if (record) {
				// 创建一个window对象
				var win = new Jinpeng.troubleDealWith.KakouShowHistoryDetailWindow();
				//将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
				win.loadId = record.get("id");
				win.show();
			}
		}
	});

Ext.reg('troubleDealWithInfoDataPanel', Jinpeng.troubleDealWith.TroubleDealWithInfoDataPanel);
Ext.reg('troubleDealWithInfoCenterGridPanel',Jinpeng.troubleDealWith.TroubleDealWithInfoCenterGridPanel);
