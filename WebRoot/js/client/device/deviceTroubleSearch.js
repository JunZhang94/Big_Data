/**
 *  入口
 */
Ext.ns("Jinpeng.deviceSearch");

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
			xtype : 'deviceSearchInfoDataPanel'
		} ]
	});
});

/**
 * @class Jinpeng.TabPanel 工作区标签页组件
 * north区域表单部份
 */
Jinpeng.deviceSearch.DeviceInfoDataPanel = Ext.extend(Ext.Panel,{
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
								name : 'deviceSearchName',
								id : 'deviceSearchName'
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
					xtype : 'deviceSearchInfoCenterGridPanel',
					ref : "../grid"
				}]
			});
			Jinpeng.deviceSearch.DeviceInfoDataPanel.superclass.initComponent.apply(this);
		},
		afterRender : function(ct, position) {
			Jinpeng.deviceSearch.DeviceInfoDataPanel.superclass.afterRender.apply(this, arguments);
		},
		/* 响应查询按钮 */
		advanceSearch : function() {
			var form = Ext.getCmp('searchDeviceForm');
			if (form.getForm().isValid()) {
				var grid = Ext.getCmp('deviceSearchRecordGridPanel');
				grid.store.baseParams = {};// 重置
				/** 将参数传入后台 */
				var baseparams = {
					"deviceSearchName" : Ext.getCmp('deviceSearchName').getValue()
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
var deviceSearchInfoStore = new Ext.data.JsonStore({
	url : rootpath + "/device/queryDeviceTrouble.mvc?queryType=autoAlarm",
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
Jinpeng.deviceSearch.DeviceInfoCenterGridPanel = Ext.extend(Ext.grid.GridPanel,{
		id : 'deviceSearchRecordGridPanel',
		frame : false,
		border : false,
		pageSize : Jinpeng.PageSize,
		initComponent : function() {
			var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
			Ext.apply(this,{
				store : deviceSearchInfoStore,
				cm : new Ext.grid.ColumnModel({
					defaults : {
						sortable : true
					},
					columns : [
						new Ext.ux.grid.PagingRowNumberer({ width : 40}),
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
							header : "故障时间", dataIndex : 'GZSJ',
							 renderer : function(value) {
			        	        return value.substring(0,value.indexOf("."));
						   }
						}, {
							header : "登记人", dataIndex : 'REGISTER_PERSON'
						}, {
							header : "登记时间", dataIndex : 'SCSJ',
							 renderer : function(value) {
			        	        return value.substring(0,value.indexOf("."));
						   }
						}, {
							header : "联系电话", dataIndex : 'LINK_PHONE'
						}, {
							header : "描述", dataIndex : 'REMARCK',
		                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
								//当文字过多的时候，鼠标移上去就给悬浮狂提示
						     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
							}
						} ]
						}),
						selModel : sm,
						bbar : new Jinpeng.widget.PagingToolbar({
							/* 添加样式所需id */
							id : "PagingToolbar",
							store : deviceSearchInfoStore,
							displayInfo : true,
							emptyMsg : "无数据",
							pageSize : this.pageSize
						}),
						listeners : {
							afterrender : function() {
								// 加载数据
								deviceSearchInfoStore.load({
										params : {
											'page.start' : 0,
											'page.limit' : this.pageSize
										}
									});
							}
						}
			});
			Jinpeng.deviceSearch.DeviceInfoCenterGridPanel.superclass.initComponent.apply(this);
		}
	});


Ext.reg('deviceSearchInfoDataPanel', Jinpeng.deviceSearch.DeviceInfoDataPanel);
Ext.reg('deviceSearchInfoCenterGridPanel',Jinpeng.deviceSearch.DeviceInfoCenterGridPanel);
