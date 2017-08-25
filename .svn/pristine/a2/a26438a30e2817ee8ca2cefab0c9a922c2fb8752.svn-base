/**
 * \ * 入口
 */
Ext.ns("Jinpeng.device");
var orgType = '';
var parentId = '';
var parentName = '';
var code = '';
var shanchu;
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
			xtype : 'deviceInfoDataPanel'
		} ]
	});
	showOrgColumns();
});

Jinpeng.device.MenuWestPanel = Ext.extend(Jinpeng.widget.OrganizationTree, {
	id : 'orgTreeWestPanel',
	autoLoading : true,
	showCheckbox : false,
	autoExpandAll : false,
	animate : true,
	title : '组织机构',
	dataUrl : rootpath + '/systemOrg/orgDirectionTreeMap.mvc?deviceFlag=devicePolling', 
	initComponent : function() {
		this.on('beforeclick', this.onTreeNodeBeforeClick, this);
		this.on('click', this.onTreeNodeClick, this);
		Jinpeng.device.MenuWestPanel.superclass.initComponent.apply(this);

	},
	afterRender : function(ct, position) {
		Ext.getCmp('registerBtn').disable();
		Ext.getCmp('logoutBtn').disable();
		Jinpeng.device.MenuWestPanel.superclass.afterRender.apply(this, arguments);
	},
	onTreeNodeClick : function(node, e) {
		code = node.attributes.id;
		parentId = code;
		orgType = node.attributes.orgType;//判断选择的卡点还是市局和分局。0为市局，1为分局，2为卡点
		if (orgType == '0') {
			Ext.getCmp('addBtn').enable();
			Ext.getCmp('editBtn').enable();
			Ext.getCmp('deleteBtn').enable();
			
			Ext.getCmp('registerBtn').disable();
			Ext.getCmp('logoutBtn').disable();
			showOrgColumns();
			parentName = node.attributes.text;
			Ext.getCmp('queryType').setValue('0');
		}
		if (orgType === '1') {
			Ext.getCmp('addBtn').enable();
			Ext.getCmp('editBtn').enable();
			Ext.getCmp('deleteBtn').enable();
			
			Ext.getCmp('registerBtn').disable();
			Ext.getCmp('logoutBtn').disable();
			showBayonetColumns();
			parentName = node.attributes.text;
			Ext.getCmp('queryType').setValue('1');
		}
		if (orgType === '2') {
			Ext.getCmp('addBtn').enable();
			Ext.getCmp('editBtn').enable();
			Ext.getCmp('deleteBtn').enable();
			if (node.attributes.flag == '1') {
				Ext.getCmp('registerBtn').enable();
				Ext.getCmp('logoutBtn').enable();
			} else {
				Ext.getCmp('registerBtn').disable();
				Ext.getCmp('logoutBtn').disable();
			}
			//showKKDirectionColumns();
			showDeviceColumns();
			Ext.getCmp('queryType').setValue('2');
		} 
		//if(orgType==='4'){
		if(orgType==='3'){
			Ext.getCmp('addBtn').disable();
			Ext.getCmp('editBtn').disable();
			Ext.getCmp('deleteBtn').disable();
			Ext.getCmp('registerBtn').disable();
			Ext.getCmp('logoutBtn').disable();
			//showDeviceColumns();
		}
		var devicegrid = Ext.getCmp('deviceRecordGridPanel');
		if (devicegrid) {
			devicegrid.store.baseParams = {};// 重置
			devicegrid.store.baseParams["code"] = code;
			devicegrid.store.baseParams["orgType"] = orgType;
			devicegrid.publish("clearGridSelections", []);
			devicegrid.store.load({
				params : {
					'page.start' : 0,
					'page.limit' : devicegrid.pageSize
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
 * @class Jinpeng.TabPanel 工作区标签页组件
 */
/**
 * north区域表单部份
 */
Jinpeng.device.DeviceInfoDataPanel = Ext.extend(Ext.Panel,{
		initComponent : function() {
			//卡口状态
			var bayonetStatusStore = new Ext.data.JsonStore({
				root : 'data',
				fields : [ 'id', 'text' ],
				baseParams : {
					code : 'BAYONET_STATUS'
				},
				url : rootpath + '/dictionary/jsonDictsInCombo.mvc'
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
							layoutConfig : {
								columns : 3
							},
							border : false,
							items : [ {
								xtype : 'tooltiptextfield',
								tooltip : {
									text : "卡口信息"
								},
								fieldLabel : '&nbsp;&nbsp;卡口信息',
								name : 'deviceName',
								id : 'deviceName'
							} ]
						}, {
							columnWidth : 0.3,
							layout : 'form',
							border : false,
							items : [{xtype : 'combo',
								fieldLabel : '卡口状态',
								name : 'kakouStatus',
								id : 'kakouStatus',
								anchor : '90%',
								emptyText : '请选择...',
								editable : false,
								triggerAction : 'all',
								mode : "local",
								store : bayonetStatusStore,
								valueField : 'id',
								displayField : 'text'
							}]
						},{
							columnWidth : 0.3,
							layout : 'form',
							border : false,
							items :[{
								xtype : 'tcombo',
								store : new Ext.data.ArrayStore({
									fields : [ 'id', 'text' ],
									data : [ [ '0', '按部门' ], [ '1', '按卡口' ], [ '2', '按设备' ]]
								}),
								id : 'queryType',
								mode : 'local',
								name : 'queryType',
								value : '0',
								fieldLabel : '分类查询',
								triggerAction : 'all',
								editable : false,
								valueField : 'id',
								displayField : 'text',
								anchor : '94%'
							}]
						}, {
							columnWidth : 0.1,
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
					xtype : 'deviceInfoCenterGridPanel',
					ref : "../grid"
				}],
				listeners : {
					afterrender : function() {
						bayonetStatusStore.load();
					}
				}
			});
			Jinpeng.device.DeviceInfoDataPanel.superclass.initComponent.apply(this);
		},
		afterRender : function(ct, position) {
			Jinpeng.device.DeviceInfoDataPanel.superclass.afterRender.apply(this, arguments);
		},
		/* 响应查询按钮 */
		advanceSearch : function() {
			var form = Ext.getCmp('searchDeviceForm');
			if (form.getForm().isValid()) {
				var queryType = Ext.getCmp('queryType').getValue();
				if (queryType == '0') {
					showOrgColumns();	
					Ext.getCmp('registerBtn').disable();
					Ext.getCmp('logoutBtn').disable();
				} else if (queryType == '1') {
					showBayonetColumns();
					Ext.getCmp('registerBtn').disable();
					Ext.getCmp('logoutBtn').disable();
				} else {
					showDeviceColumns();
					Ext.getCmp('registerBtn').enable();
					Ext.getCmp('logoutBtn').enable();
				}
				var grid = Ext.getCmp('deviceRecordGridPanel');
				grid.store.baseParams = {};// 重置
				/** 将参数传入后台 */
				var baseparams = {
					"deviceName" : Ext.getCmp('deviceName').getValue(),
					"kakouStatus" : Ext.getCmp('kakouStatus').getValue(),
					"queryType" : queryType,
					"queryFlag" : "search",
					"code" : code,
					"orgType" : orgType
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

//显示组织信息
function showOrgColumns() {
	var orgGrid = Ext.getCmp('deviceRecordGridPanel');
	orgGrid.getColumnModel().setHidden(1,false);
	orgGrid.getColumnModel().setHidden(2,true);
	orgGrid.getColumnModel().setHidden(3,true);
	orgGrid.getColumnModel().setHidden(4,true);
	orgGrid.getColumnModel().setHidden(5,true);
	orgGrid.getColumnModel().setHidden(6,true);
	orgGrid.getColumnModel().setHidden(7,true);
	orgGrid.getColumnModel().setHidden(8,true);
	orgGrid.getColumnModel().setHidden(9,true);
	orgGrid.getColumnModel().setHidden(10,true);
	orgGrid.getColumnModel().setHidden(11,true);
	orgGrid.getColumnModel().setHidden(12,true);
	orgGrid.getColumnModel().setHidden(13,true);
	orgGrid.getColumnModel().setHidden(14,true);
	orgGrid.getColumnModel().setHidden(15,true);
	orgGrid.getColumnModel().setHidden(16,false);
	orgGrid.getColumnModel().setHidden(17,false);
	orgGrid.getColumnModel().setHidden(18,false);
	orgGrid.getColumnModel().setHidden(19,false);
	orgGrid.getColumnModel().setHidden(20,true);
	orgGrid.getColumnModel().setHidden(21,true);
	orgGrid.getColumnModel().setHidden(22,true);
	orgGrid.getColumnModel().setHidden(23,true);
	orgGrid.getColumnModel().setHidden(24,true);
	orgGrid.getColumnModel().setHidden(25,true);
	orgGrid.getColumnModel().setHidden(26,true);
	orgGrid.getColumnModel().setHidden(27,true);
	orgGrid.getColumnModel().setHidden(28,true);
}

//显示卡口列表
function showBayonetColumns() {
	var bayonetGrid = Ext.getCmp('deviceRecordGridPanel');
	bayonetGrid.getColumnModel().setHidden(1,false);
	bayonetGrid.getColumnModel().setHidden(2,true);
	bayonetGrid.getColumnModel().setHidden(3,true);
	bayonetGrid.getColumnModel().setHidden(4,true);
	bayonetGrid.getColumnModel().setHidden(5,true);
	bayonetGrid.getColumnModel().setHidden(6,true);
	bayonetGrid.getColumnModel().setHidden(7,true);
	bayonetGrid.getColumnModel().setHidden(8,true);
	bayonetGrid.getColumnModel().setHidden(9,false);
	bayonetGrid.getColumnModel().setHidden(10,false);
	bayonetGrid.getColumnModel().setHidden(11,false);
	bayonetGrid.getColumnModel().setHidden(12,false);
	bayonetGrid.getColumnModel().setHidden(13,false);
	bayonetGrid.getColumnModel().setHidden(14,false);
	bayonetGrid.getColumnModel().setHidden(15,false);
	bayonetGrid.getColumnModel().setHidden(16,true);
	bayonetGrid.getColumnModel().setHidden(17,true);
	bayonetGrid.getColumnModel().setHidden(18,true);
	bayonetGrid.getColumnModel().setHidden(19,true);
	bayonetGrid.getColumnModel().setHidden(20,true);
	bayonetGrid.getColumnModel().setHidden(21,true);
	bayonetGrid.getColumnModel().setHidden(22,true);
	bayonetGrid.getColumnModel().setHidden(23,true);
	bayonetGrid.getColumnModel().setHidden(24,true);
	bayonetGrid.getColumnModel().setHidden(25,true);
	bayonetGrid.getColumnModel().setHidden(26,true);
	bayonetGrid.getColumnModel().setHidden(27,true);
	bayonetGrid.getColumnModel().setHidden(28,true);
}

//显示设备列表
function showDeviceColumns() {
	var deviceGrid = Ext.getCmp('deviceRecordGridPanel');
	deviceGrid.getColumnModel().setHidden(1,false);
	deviceGrid.getColumnModel().setHidden(2,false);
	deviceGrid.getColumnModel().setHidden(3,false);
	deviceGrid.getColumnModel().setHidden(4,false);
	deviceGrid.getColumnModel().setHidden(5,false);
	deviceGrid.getColumnModel().setHidden(6,false);
	deviceGrid.getColumnModel().setHidden(7,false);
	deviceGrid.getColumnModel().setHidden(8,false);
	deviceGrid.getColumnModel().setHidden(9,true);
	deviceGrid.getColumnModel().setHidden(10,true);
	deviceGrid.getColumnModel().setHidden(11,true);
	deviceGrid.getColumnModel().setHidden(12,true);
	deviceGrid.getColumnModel().setHidden(13,true);
	deviceGrid.getColumnModel().setHidden(14,true);
	deviceGrid.getColumnModel().setHidden(15,true);
	deviceGrid.getColumnModel().setHidden(16,true);
	deviceGrid.getColumnModel().setHidden(17,true);
	deviceGrid.getColumnModel().setHidden(18,true);
	deviceGrid.getColumnModel().setHidden(19,true);
	deviceGrid.getColumnModel().setHidden(20,true);
	deviceGrid.getColumnModel().setHidden(21,true);
	deviceGrid.getColumnModel().setHidden(22,true);
	deviceGrid.getColumnModel().setHidden(23,true);
	deviceGrid.getColumnModel().setHidden(24,true);
	deviceGrid.getColumnModel().setHidden(25,true);
	deviceGrid.getColumnModel().setHidden(26,true);
	deviceGrid.getColumnModel().setHidden(27,true);
	deviceGrid.getColumnModel().setHidden(28,true);
}

//显示设备方向
function showKKDirectionColumns(){
	var kkDirectionGrid = Ext.getCmp('deviceRecordGridPanel');
	kkDirectionGrid.getColumnModel().setHidden(1,false);
	kkDirectionGrid.getColumnModel().setHidden(2,true);
	kkDirectionGrid.getColumnModel().setHidden(3,true);
	kkDirectionGrid.getColumnModel().setHidden(4,true);
	kkDirectionGrid.getColumnModel().setHidden(5,true);
	kkDirectionGrid.getColumnModel().setHidden(6,true);
	kkDirectionGrid.getColumnModel().setHidden(7,true);
	kkDirectionGrid.getColumnModel().setHidden(8,true);
	kkDirectionGrid.getColumnModel().setHidden(9,true);
	kkDirectionGrid.getColumnModel().setHidden(10,true);
	kkDirectionGrid.getColumnModel().setHidden(11,true);
	kkDirectionGrid.getColumnModel().setHidden(12,true);
	kkDirectionGrid.getColumnModel().setHidden(13,true);
	kkDirectionGrid.getColumnModel().setHidden(14,true);
	kkDirectionGrid.getColumnModel().setHidden(15,true);
	kkDirectionGrid.getColumnModel().setHidden(16,true);
	kkDirectionGrid.getColumnModel().setHidden(17,true);
	kkDirectionGrid.getColumnModel().setHidden(18,true);
	
	kkDirectionGrid.getColumnModel().setHidden(19,true);
	kkDirectionGrid.getColumnModel().setHidden(20,true);
	kkDirectionGrid.getColumnModel().setHidden(21,true);
	kkDirectionGrid.getColumnModel().setHidden(22,false);
	kkDirectionGrid.getColumnModel().setHidden(23,false);
	kkDirectionGrid.getColumnModel().setHidden(24,false);
	kkDirectionGrid.getColumnModel().setHidden(25,false);
	kkDirectionGrid.getColumnModel().setHidden(26,false);
	kkDirectionGrid.getColumnModel().setHidden(27,false);
	kkDirectionGrid.getColumnModel().setHidden(28,false);
	
	
}

/**
 * 列表数据Store
 */
var deviceInfoStore = new Ext.data.JsonStore({
	url : rootpath + "/device/queryDevice.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	remoteSort : true,
	fields : [
          {name : 'SBBH'},
          {name : 'SBMC'},
          {name : 'SBLX'},
          {name : 'SBZT'},
          {name : 'SBFX'},
          {name : 'SBCD'},
          {name : 'JD'},
          {name : 'WD'},
          {name : 'KKBH'},
          {name : 'KKMC'},
          {name : 'KKWZ'},
          {name : 'KKWD'},
          {name : 'KKJD'},
          {name : 'KKZT'},
          {name : 'BZ'},
          {name : 'KKLX'},
          {name : 'DWBH'},
          {name : 'DWMC'},
          {name : 'CZDM'},
          {name : 'IPDZ'},
          
          {name : 'DIRECTION_NUMBER'},
          {name : 'ID'},
          {name : 'DIRECTION_NAME'},
          {name : 'TYPE'},
          {name : 'CREATE_TIME'},
          {name : 'MOUNT_DEVICE_TYPE'},
          {name : 'MONITOR_STATE'},
          {name : 'REMARK'},
      ]
});
/**
 * 中心右区域数据显示中心
 */ 
Jinpeng.device.DeviceInfoCenterGridPanel = Ext.extend(Ext.grid.GridPanel,{
		id : 'deviceRecordGridPanel',
		frame : false,
		border : false,
		pageSize : Jinpeng.PageSize,
		initComponent : function() {
		    var devicePanel = this;
			var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
			Ext.apply(this,{
				store : deviceInfoStore,
				cm : new Ext.grid.ColumnModel({
					defaults : {
						sortable : true
					},
					columns : [
							new Ext.ux.grid.PagingRowNumberer({ width : 40}),
							sm,
							
							//这里是设备
							{
								header : "设备编号", dataIndex : 'SBBH',width : 50,
								renderer : function(key,cellmeta,record,rowIndex,columnIndex,store) {
									if(key === 'NULL' || key === 'null'){
										var sbbh = '无';
										return '<font ext:qtip="'+key+'">'+key+'</font>';
									} else {
										return '<font ext:qtip="'+key+'">'+key+'</font>';
									}
								}
							}, {
								header : "设备名称", dataIndex : 'SBMC',width : 80,
								renderer : function(key,cellmeta,record,rowIndex,columnIndex,store) {
									if(key === 'NULL' || key === 'null'){
										var sbmc = '无';
										return '<font ext:qtip="'+sbmc+'">'+sbmc+'</font>';
									} else {
										return '<font ext:qtip="'+key+'">'+key+'</font>';
									}
								}
							}, {
								header : "设备状态", dataIndex : 'SBZT',width : 50,
								renderer : function(key) {
									var value = '';
									if(key == ''){
										return "";
									} else {
										if (key == 0) {
											value = '正常';
										} else if (key == 1) {
											value = '故障';
										} else if (key == 2) {
											value = '报废';
										} else if (key == 3) {
											value = '停用';
										}
									}
									return value;
								}
							}/*, {
								header : "设备类型", dataIndex : 'SBLX',width : 50,
								renderer : function(key) {
									if(key === 'NULL' || key === 'null'){
										return "无";
									} else {
										return key;
									}
								}
							}*/, {
								header : "设备方向", dataIndex : 'SBFX',hidden : true,width : 50,
								renderer : function(key,cellmeta,record,rowIndex,columnIndex,store) {
									if(key === 'NULL' || key === 'null'){
										var sbfx = '无';
										return  '<font ext:qtip="'+sbfx+'">'+sbfx+'</font>';
									} else {
										return '<font ext:qtip="'+key+'">'+key+'</font>';
									}
								}
							}, {
								header : "设备车道", dataIndex : 'SBCD',hidden : false,width : 40,
								renderer : function(key,cellmeta,record,rowIndex,columnIndex,store) {
									if(key === 'NULL' || key === 'null'){
										var sbcs = '无';
										return '<font ext:qtip="'+sbcd+'">'+sbcd+'</font>';
									} else {
										return '<font ext:qtip="'+key+'">'+key+'</font>';
									}
								}
							}, {
								header : "经度", dataIndex : 'JD',width : 40, renderer : function(key) {
									return devicePanel.parseFloatValue(key);
								},
							}, {
								header : "纬度", dataIndex : 'WD',width : 40,renderer : function(key) {
									return devicePanel.parseFloatValue(key);
								}
							},
							
							//这里是卡口
							{
								header : "卡口编号", 
								dataIndex : 'KKBH', 
								hidden : true,
								width : 50,
								//处理内容太多时，当鼠标移上去是就给悬浮框提示
			                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
									//当文字过多的时候，鼠标移上去就给悬浮狂提示
							     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
								}
							}, {
								header : "卡口名称",
								dataIndex : 'KKMC',
								hidden : true,
								width : 80,
								//处理内容太多时，当鼠标移上去是就给悬浮框提示
			                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
									//当文字过多的时候，鼠标移上去就给悬浮狂提示
							     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
								}
							}, {header : "卡口类型", dataIndex : 'KKLX', hideable: false, width : 60,
								renderer : function(key) {
									//这里字典就是翻译不出来。。
									var value = '';
									if (key == 1) {
										value = '省际卡口';
									} else if (key == 2) {
										value = '市际卡口';
									} else if (key == 3) {
										value = '县际卡口';
									} else if (key == 4) {
										value = '公路主线卡口';
									} else if (key == 5) {
										value = '公路收费站卡口';
									} else if (key == 6) {
										value = '城区道路卡口';
									} else if (key == 7) {
										value = '城区路口卡口';
									} 
									return value;
								},
								hidden: true 
							}, {header : "卡口纬度", dataIndex : 'KKWD', hideable: false, width : 60,
								renderer : function(key) {
									return devicePanel.parseFloatValue(key);
								},
								hidden: true 

							}, {header : "卡口经度", dataIndex : 'KKJD', hideable: false,width : 60,
								renderer : function(key) {
									return devicePanel.parseFloatValue(key);
								},
								hidden: true 

							}, {header : "卡口状态", dataIndex : 'KKZT', hideable: false, width : 60,
								renderer : function(key) {
									return window.dictionary.getValue("BAYONET_STATUS", key);
								},
								hidden: true 

							}, {
								header : "备注",
								dataIndex : 'BZ',
								hideable: false, 
								width :110,
								hidden: true,
								//处理内容太多时，当鼠标移上去是就给悬浮框提示
			                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
									//当文字过多的时候，鼠标移上去就给悬浮狂提示
							     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
								}

							}, {header : "单位编号", dataIndex : 'DWBH', hideable: false, width : 80,
								hidden: true 

							}, {header : "单位名称", dataIndex : 'DWMC', hideable: false, width : 80,
								hidden: true 

							}, {header : "城镇名称", dataIndex : 'CZDM', hideable: false, width : 80,
								hidden: true 

							}, {header : "IP地址", dataIndex : 'IPDZ', hideable: false, width : 60,
								hidden: true 

							},
							
							//这里是卡口方向
							{header : "方向编号", dataIndex : 'ID', hideable: false, width : 60,
								hidden: false 

							},
							{header : "卡口编号", dataIndex : 'KKBH', hideable: false, width : 60,
								hidden: true ,renderer : function(value,cellmeta,record,rowIndex,columnIndex,store) {
									
									return '<font ext:qtip="'+value+'">'+value+'</font>';
									
								}

							}, {header : "卡口方向编号", dataIndex : 'DIRECTION_NUMBER', hideable: false, width : 60,
								hidden: true ,renderer : function(value,cellmeta,record,rowIndex,columnIndex,store) {
									
									return '<font ext:qtip="'+value+'">'+value+'</font>';
									
								}

							},
							{header : "卡口方向名称", dataIndex : 'DIRECTION_NAME', hideable: false, width : 60,
								hidden: true ,renderer : function(value,cellmeta,record,rowIndex,columnIndex,store) {
									return '<font ext:qtip="'+value+'">'+value+'</font>';
									
								}

							},
							{header : "方向类型", dataIndex : 'TYPE', hideable: false, width : 60,
								hidden: true,renderer : function(value,cellmeta,record,rowIndex,columnIndex,store) {
									if(value != null && value !=""){
//									    var val = directionType[value].toString()+'M';
//									    val = val.substring((val.indexOf(',')+1),val.lastIndexOf("M"));
										//DEVICE_STATUS
										var val =  window.dictionary.getValue("DIRECTION_TYPE", value);
										return '<font ext:qtip="'+val+'">'+val+'</font>';
									}else{
										return '<font ext:qtip=""></font>';
									}
								   
								}

							},
							{header : "更新时间", dataIndex : 'CREATE_TIME', hideable: false, width : 60,
								hidden: true ,
					        renderer: function (val) {
					        	if (val) {
					        		 var value =Ext.util.Format.date(new Date(Number(val)), 'Y-m-d H:i:s')
					        		 return '<font ext:qtip="'+value+'">'+value+'</font>';
					        	}
					        	return "";
					        }

							},
							{header : "设备类型", dataIndex : 'MOUNT_DEVICE_TYPE', hideable: false, width : 60,
								hidden: true ,renderer : function(value,cellmeta,record,rowIndex,columnIndex,store) {
									if(value != null && value !=""){
//									    var val = deviceType[value-1].toString()+"M";
//									    val = val.substring((val.indexOf(',')+1),val.lastIndexOf("M"));
										var val = window.dictionary.getValue("DeviceType", value);
										return '<font ext:qtip="'+val+'">'+val+'</font>';
									}else{
										return '<font ext:qtip=""></font>';
									}
								
								}

							},
							{header : "监控状态", dataIndex : 'MONITOR_STATE', hideable: false, width : 60,
								hidden: true  ,renderer : function(value,cellmeta,record,rowIndex,columnIndex,store) {
									if(value != null && value !=""){
//									    var val = lookingStart[value].toString()+"M";
//									    val = val.substring((val.indexOf(',')+1),val.lastIndexOf("M"));
										var val = window.dictionary.getValue("DEVICE_STATUS", value);
										return '<font ext:qtip="'+val+'">'+val+'</font>';
									}else{
										return '<font ext:qtip=""></font>';
									}
								}
							},
							{header : "备注", dataIndex : 'REMARK', hideable: false, width : 60,
								hidden: true ,renderer : function(value,cellmeta,record,rowIndex,columnIndex,store) {
									if(value != null || value !=''){
										return '<font ext:qtip="'+value+'">'+value+'</font>';
									}else{
										return '<font ext:qtip=""></font>';
									}
								}

							},
							
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
						  }, {
								xtype : 'button',
								text : '&nbsp;&nbsp;&nbsp;修改&nbsp;&nbsp;&nbsp;',
								height : 20,
								id : 'editBtn',
								ref : '../btnModify'
							}, {
						  		  xtype : 'tbspacer',
						  		  width : 10
						  },{
								xtype : 'button',
								text : '&nbsp;&nbsp;&nbsp;删除&nbsp;&nbsp;&nbsp;',
								height : 20,
								id : 'deleteBtn',
								ref : '../btnDelete'
						  }, {
					  		  xtype : 'tbspacer',
					  		  width : 10
						  },{
								xtype : 'button',
								text : '&nbsp;&nbsp;&nbsp;启动&nbsp;&nbsp;&nbsp;',
								height : 20,
								id : 'registerBtn',
								ref : '../btnRegister'
						  }, {
					  		  xtype : 'tbspacer',
					  		  width : 10
						  },{
								xtype : 'button',
								text : '&nbsp;&nbsp;&nbsp;注销&nbsp;&nbsp;&nbsp;',
								height : 20,
								id : 'logoutBtn',
								ref : '../btnLogout'
						  } ]
						},
						bbar : new Jinpeng.widget.PagingToolbar({
							/* 添加样式所需id */
							id : "PagingToolbar",
							store : deviceInfoStore,
							displayInfo : true,
							emptyMsg : "无数据",
							pageSize : this.pageSize
						}),
						listeners : {
							afterrender : function() {
								// 加载数据
								deviceInfoStore.load({
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
									var win,deviceId ;
									if (orgType === '0') {
										deviceId = recode.data.DWBH;
										win = new Jinpeng.organization.AddNewOrganizationWindow();
									}
									else if (orgType === '1') {
										deviceId = recode.data.KKBH;
										win = new Jinpeng.bayonet.AddNewBayonetWindow();
									}
									else if (orgType === '2') {
										deviceId = recode.data.ID;
										win=Jinpeng.kkDirection.AddNewKkDirectionWindow();
									}else if(orgType=='4'){
										deviceId = recode.data.SBBH;
										win = new Jinpeng.device.AddNewDeviceWindow();
									} else {
										deviceId = recode.data.DWBH;
										win = new Jinpeng.organization.AddNewOrganizationWindow();
									}
									win.loadRecordById(deviceId);
								}
						
							}
						}
			});
			// 响应最后一列查看点击事件 
			this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
				// var record =Ext.getCmp('deviceRecordGridPanel').getStore().getAt(rowIndex);
				var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
				if (fieldName == 'operate') {
					if (typeof this.checkHref == 'function')
						/* 调用查看超链接方法 */
						this.checkHref(grid, rowIndex, columnIndex);
				}
			});
			Jinpeng.device.DeviceInfoCenterGridPanel.superclass.initComponent.apply(this);
			
			this.btnAddNew.on('click', this.onBtnAddNewHandler, this);
			this.btnModify.on('click', this.onBtnModifywHandler, this);
			this.btnDelete.on('click', this.onBtnDeleteHandler, this);
			this.btnRegister.on('click', this.onBtnRegisterHandler, this);
			this.btnLogout.on('click', this.onBtnLogoutHandler, this);
		},
		onBtnAddNewHandler : function() {
			var queryType = Ext.getCmp('queryType').getValue();
			if (queryType == '0') {
				var win = new Jinpeng.organization.AddNewOrganizationWindow({
					id : 'addNewOrgWin',
					addNewFlag : true,
					title : '新增部门'
				});
				win.parentId = parentId;
				win.parentName = parentName;
				win.show();
			} else if (queryType == '1') {
				var win = new Jinpeng.bayonet.AddNewBayonetWindow({
					id : 'addNewBayonetWin',
					addNewFlag : true,
					title : '新增卡口'
				});
				win.parentId = parentId;
				win.parentName = parentName;
				win.show();
			} else if (queryType == '2') {
				var win = new Jinpeng.device.AddNewDeviceWindow({
					id : 'addNewDeviceWin',
					addNewFlag : true,
					title : '新增设备'
				});
				win.parentId = parentId;
				win.show();
			} else {
				var win = new Jinpeng.organization.AddNewOrganizationWindow({
					id : 'addNewOrgWin',
					addNewFlag : true,
					title : '新增部门'
				});
				//缺省值：顶级节点的ID和NAME,如广州市
				win.show();
			}
		},
		parseFloatValue : function (key) {
			var value = Math.round(key * 100)/100;
			return value;
		},
		onBtnModifywHandler : function() {
			var records = Ext.getCmp('deviceRecordGridPanel').getSelectionModel().getSelections();
			if (records.length == 1) {
				this.modifyDeviceInfo(records[0]);
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
			var recodes = Ext.getCmp('deviceRecordGridPanel').getSelectionModel().getSelections();
			if (recodes.length > 0) {
				this.deleteDeviceById(recodes);
			} else {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '请选择需要删除的记录！';
				win.show();
			}
		},
		onBtnRegisterHandler : function() {
			var recodes = Ext.getCmp('deviceRecordGridPanel').getSelectionModel().getSelections();
			if (recodes.length > 0) {
				this.registerDeviceById(recodes);
			} else {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '请选择需要启动的的记录！';
				win.show();
			}
		},
		onBtnLogoutHandler : function() {
			var recodes = Ext.getCmp('deviceRecordGridPanel').getSelectionModel().getSelections();
			if (recodes.length > 0) {
				this.logoutDeviceById(recodes);
			} else {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '请选择需要注销的记录！';
				win.show();
			}
		},
		registerDeviceById : function(records) {
			/* 确认启动与否 */
			var msg = "确定要启动设备？";
			var ids = [];
			var sbmcs = [];
			var jds = [];
			var wds = [];
			Ext.each(records, function(item, index, items) {
				ids.push(item.get("SBBH"));
				sbmcs.push(item.get("SBMC"));
				if (item.get("JD") != '') {
					jds.push(item.get("JD"));
				} else {
					jds.push('');
				}
				if (item.get("WD") != '') {
					wds.push(item.get("WD"));
				} else {
					ids.push('');
				}
			});
			
			var deleteurl = rootpath + '/device/registerDevice.mvc';
			Ext.Msg.confirm('系统提示', msg, function(flag) {
				if (flag == 'yes') {
					Ext.Ajax.request({
						url : deleteurl,
						params : {
							'SBBHS' : ids.join(","),
							'SBMCS' : sbmcs.join(","),
							'JDS' : jds.join(","),
							'WDS' : wds.join(",")
						},
						success : function(response, options) {
							var o = response.responseData || Ext.decode(response.responseText);
							var result = o.data;
							if (result == ids.length) {
								Ext.Msg.alert("系统提示","所选设备启动成功！");
								//刷新页面
								var grid = Ext.getCmp("deviceRecordGridPanel");
								var tree = Ext.getCmp("orgTreeWestPanel");
								if(grid){
									grid.publish("clearGridSelections",[]);
									grid.store.reload();
									tree.refresh();
								}
							}
						}
					});
				}
			});
		},
		logoutDeviceById : function(records) {
			/* 确认注销与否 */
			var msg = "确定要注销设备？";
			var ids = [];
			var sbmcs = [];
			var jds = [];
			var wds = [];
			Ext.each(records, function(item, index, items) {
				ids.push(item.get("SBBH"));
				sbmcs.push(item.get("SBMC"));
				if (item.get("JD") != '') {
					jds.push(item.get("JD"));
				} else {
					jds.push('');
				}
				if (item.get("WD") != '') {
					wds.push(item.get("WD"));
				} else {
					ids.push('');
				}
			});
			var deleteurl = rootpath + '/device/logoutDevice.mvc';
			Ext.Msg.confirm('系统提示', msg, function(flag) {
				if (flag == 'yes') {
					Ext.Ajax.request({
						url : deleteurl,
						params : {
							'SBBHS' : ids.join(","),
							'SBMCS' : sbmcs.join(","),
							'JDS' : jds.join(","),
							'WDS' : wds.join(",")
						},
						success : function(response, options) {
							var o = response.responseData || Ext.decode(response.responseText);
							var result = o.data;
							if (result == ids.length) {
								Ext.Msg.alert("系统提示","所选设备注销成功！");
								//刷新页面
								var grid = Ext.getCmp("deviceRecordGridPanel");
								var tree = Ext.getCmp("orgTreeWestPanel");
								if(grid){
									grid.publish("clearGridSelections",[]);
									grid.store.reload();
									tree.refresh();
								}
							}
						}
					});
				}
			});
		},
		onModifyHandler : function(grid, rowIndex, colIndex, item, event) {
			event.stopEvent();
			var recode = grid.store.getAt(rowIndex);
			if (recode) {
				this.modifyDeviceInfo(recode);
			}
		},
		modifyDeviceInfo : function(device) {
			var win,deviceId ;
			if (orgType === '0') {
				deviceId = device.data.DWBH;
				win = new Jinpeng.organization.AddNewOrganizationWindow();
			}
			else if (orgType === '1') {
				deviceId = device.data.KKBH;
				win = new Jinpeng.bayonet.AddNewBayonetWindow();
				win.parentId = parentId;
				win.parentName = parentName;
			}
			else if (orgType === '2') {
				deviceId = device.data.SBBH;
				win = new Jinpeng.device.AddNewDeviceWindow();
				/*deviceId=device.data.ID;
			    win = new Jinpeng.kkDirection.AddNewKkDirectionWindow();*/
			}else if(orgType==='4'){
				deviceId = device.data.SBBH;
				win = new Jinpeng.device.AddNewDeviceWindow();
			} else {
				deviceId = device.data.DWBH;
				win = new Jinpeng.organization.AddNewOrganizationWindow();
			}
			win.loadRecordById(deviceId);
		},
		onDeleteHandler : function(grid, rowIndex, colIndex, item, event) {
			event.stopEvent();
			recode = grid.store.getAt(rowIndex);
			if (recode) {
				this.deleteDeviceById([ recode ]);
			}
		},
		deleteDeviceById : function(records) {
			/* 确认删除与否 */
			var queryType = Ext.getCmp('queryType').getValue();
			zhi = records;
			var t ;
			if(queryType == '0'){
				t = "确定要删除部门？"
			}else if(queryType == '1'){
				t = "确定要删除卡口？"
			}else if(queryType == '2'){
				t = "确定要删除设备？"
				//t = "确定要删除卡口方向？"
			}else if(orgType==4){
				t = "确定要删除设备？"
			}
			var win = new Jinpeng.device.HistoryCarDetailWindows();
			win.msg = t	
			win.show();
		},
		/* 响应查看超链接的方法 */
		checkHref : function(grid, rowIndex, colIndex, item, event) {
			var record = grid.store.getAt(rowIndex);
			if (record) {
				// 创建一个window对象
				var win = new Jinpeng.device.KakouShowHistoryDetailWindow();
				//将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
				win.loadId = record.get("id");
				win.show();
			}
		}
	});

Jinpeng.device.HistoryCarDetailWindows = Ext.extend(Jinpeng.widget.GeneralWindow,{
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
				cls:'blue-button-ct',
				items : [
				{
					xtype : 'displayfield',
					fieldLabel : '',
					id:'carNum',
					name : 'carNum',
					anchor : '96%'
				} ],
				bbar : {
					buttonAlign : 'center',
					buttons : [ {
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
					} ]
				}
			} ]
		});
		Jinpeng.device.HistoryCarDetailWindows .superclass.initComponent.apply(this);
	},fengshow : function(){
		this.close();
		if(recode!=''){
			var records = recode;
		}else if(zhi!=''){
			var records = zhi;
		}
		var _this = this;
		var ids = [];
		var devicesIDS = [];
		var deviceNames = [];
		var isContinue = true;
		var deleteurl = '';
		var queryType = Ext.getCmp('queryType').getValue();
		Ext.each(records, function(item, index, items) {
			if (queryType === '0') {
				ids.push(item.get("DWBH"));
			}
			else if (queryType === '1') {
				ids.push(item.get("KKBH"));
			}
			else if (queryType === '2') {
				//ids.push(item.get("ID"));
				ids.push(item.get("SBBH"));
			}else if(queryType === '4'){
				//ids.push(item.get("SBBH"));
			} else {
				ids.push(item.get("DWBH"));
			}
		});
		if (queryType === '0') {
			deleteurl = rootpath + '/systemOrg/deleteOrganization.mvc';
		}
		else if (queryType === '1') {
			deleteurl = rootpath + '/bayonet/deleteBayonet.mvc';
		}
		else if (queryType === '2') {
			deleteurl = rootpath + '/device/deleteDevice.mvc';
			//deleteurl = rootpath + '/device/deleteDeviceDirInfo.mvc';
		}else if(queryType === '4'){
			//deleteurl = rootpath + '/device/deleteDevice.mvc';
		} else {
			deleteurl = rootpath + '/systemOrg/deleteOrganization.mvc';
		}
	
			/* 确认删除则通过AJAX请求删除相应的数据 */
			Ext.Ajax.request({
				url : deleteurl,
				params : {
					KKBHS : ids.join(",")
					//deviceNames : deviceNames.join(",")
				},
				success : function(response, options) {
					var o = response.responseData || Ext.decode(response.responseText);
					var result = o.data;
					
					var msg = "";
					if (result > 0) {
						//刷新页面
						var grid = Ext.getCmp("deviceRecordGridPanel");
						var tree = Ext.getCmp("orgTreeWestPanel");
						if(grid){
							grid.publish("clearGridSelections",[]);
							grid.store.reload();
							tree.refresh();
						}
						var t ;
						if(queryType==0){
							t = "删除部门成功！";
						}else if(queryType==1){
							t = "卡口进入待删除状态,请先对其审核！";
						}else if(queryType==2){
							t = "删除设备成功！";
							//t = "删除卡口方向成功！";
						}else if(queryType==4){
							//t = "删除设备成功！";
						}else{
							t="删除部门成功！";
						}
						
						msg = t;
						//dispatchDeviceMessage(result[1]);
						//this.close();
					} else {
						var t ;
						if(queryType==0){
							t = "删除部门失败！";
						}else if(queryType==1){
							t = "删除卡口失败！";
						}else if(queryType==2){
							t = "删除设备失败！";
							//t = "删除卡口方向失败！";
						}else if(queryType==4){
							//t = "删除设备失败！";
						}else{
							t="删除部门失败！";
						}
						msg = t;
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
		Jinpeng.device.HistoryCarDetailWindows .superclass.afterRender.call(this);
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
Ext.reg('menuwestpanel', Jinpeng.device.MenuWestPanel);
Ext.reg('deviceInfoDataPanel', Jinpeng.device.DeviceInfoDataPanel);
Ext.reg('deviceInfoCenterGridPanel',Jinpeng.device.DeviceInfoCenterGridPanel);
