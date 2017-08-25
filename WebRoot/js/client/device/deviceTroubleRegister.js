/**
 *  入口
 */
Ext.ns("Jinpeng.deviceTrouble");
var zhi='';
var recode='';
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
			xtype : 'deviceTroubleInfoDataPanel'
		} ]
	});
});

/**
 * @class Jinpeng.TabPanel 工作区标签页组件
 * north区域表单部份
 */
Jinpeng.deviceTrouble.DeviceInfoDataPanel = Ext.extend(Ext.Panel,{
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
								name : 'deviceTroubleName',
								id : 'deviceTroubleName'
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
					xtype : 'deviceTroubleInfoCenterGridPanel',
					ref : "../grid"
				}]
			});
			Jinpeng.deviceTrouble.DeviceInfoDataPanel.superclass.initComponent.apply(this);
		},
		afterRender : function(ct, position) {
			Jinpeng.deviceTrouble.DeviceInfoDataPanel.superclass.afterRender.apply(this, arguments);
		},
		/* 响应查询按钮 */
		advanceSearch : function() {
			var form = Ext.getCmp('searchDeviceForm');
			if (form.getForm().isValid()) {
				var grid = Ext.getCmp('deviceTroubleRecordGridPanel');
				grid.store.baseParams = {};// 重置
				/** 将参数传入后台 */
				var baseparams = {
					"deviceTroubleName" : Ext.getCmp('deviceTroubleName').getValue()
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
var deviceTroubleInfoStore = new Ext.data.JsonStore({
	url : rootpath + "/device/queryDeviceTrouble.mvc",
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
Jinpeng.deviceTrouble.DeviceInfoCenterGridPanel = Ext.extend(Ext.grid.GridPanel,{
		id : 'deviceTroubleRecordGridPanel',
		frame : false,
		border : false,
		pageSize : Jinpeng.PageSize,
		initComponent : function() {
			var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
			Ext.apply(this,{
				store : deviceTroubleInfoStore,
				cm : new Ext.grid.ColumnModel({
					defaults : {
						sortable : true
					},
					columns : [
							new Ext.ux.grid.PagingRowNumberer({ width : 40}),
							sm,
							{
								header : "故障信息编号", dataIndex : 'SBBH',
								renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
										//当文字过多的时候，鼠标移上去就给悬浮狂提示
								     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
								}
							}, {
								header : "故障信息名称", dataIndex : 'DEVICE_NAME',
								renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
										//当文字过多的时候，鼠标移上去就给悬浮狂提示
								     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
								}
							}, {
								header : "故障类型", dataIndex : 'GZZT1',
								renderer : function(key,cellmeta,record,rowIndex,columnIndex,store) {
								    var gzlx = window.dictionary.getValue("FaultState", key);
									return '<font ext:qtip="'+gzlx+'">'+gzlx+'</font>';
								}
							}, {
								header : "故障时间", dataIndex : 'GZSJ',
								renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
										//当文字过多的时候，鼠标移上去就给悬浮狂提示
								         var gzsj = value.substring(0,value.indexOf("."));
								     	 return '<font ext:qtip="'+gzsj+'">'+gzsj+'</font>';
								}
							}, {
								header : "登记人", dataIndex : 'REGISTER_PERSON'
							}, {
								header : "登记时间", dataIndex : 'SCSJ',
								 renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
										//当文字过多的时候，鼠标移上去就给悬浮狂提示
								         var gzsj = value.substring(0,value.indexOf("."));
								     	 return '<font ext:qtip="'+gzsj+'">'+gzsj+'</font>';
								}
							}, {
								header : "联系电话", dataIndex : 'LINK_PHONE'
							}, {
								header : "处理状态", dataIndex : 'DEAL_WITH_FLAG',
								renderer : function(key) {
									var msg = "";
									if (key == 0) {
										msg = "未处理"
									}
									if (key == 1) {
										msg = "已处理"
									}
									return msg;
								}
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
							}, {
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
							} ]
						},
						bbar : new Jinpeng.widget.PagingToolbar({
							/* 添加样式所需id */
							id : "PagingToolbar",
							store : deviceTroubleInfoStore,
							displayInfo : true,
							emptyMsg : "无数据",
							pageSize : this.pageSize
						}),
						listeners : {
							afterrender : function() {
								// 加载数据
								deviceTroubleInfoStore.load({
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
									var win,deviceTroubleId ;
									
									deviceTroubleId = recode.data.ZTXH;
									
									win = new Jinpeng.deviceTrouble.AddNewDeviceTroubleWindow();
									
									win.loadRecordById(deviceTroubleId);
								}
							}
						}
			});
			// 响应最后一列查看点击事件 
			this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
				// var record =Ext.getCmp('deviceTroubleRecordGridPanel').getStore().getAt(rowIndex);
				var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
				if (fieldName == 'operate') {
					if (typeof this.checkHref == 'function')
						/* 调用查看超链接方法 */
						this.checkHref(grid, rowIndex, columnIndex);
				}
			});
			Jinpeng.deviceTrouble.DeviceInfoCenterGridPanel.superclass.initComponent.apply(this);
			
			this.btnAddNew.on('click', this.onBtnAddNewHandler, this);
			this.btnModify.on('click', this.onBtnModifywHandler, this);
			this.btnDelete.on('click', this.onBtnDeleteHandler, this);
		},
		onBtnAddNewHandler : function() {
			//var info = Ext.getCmp("orgTreeWestPanel").getSelectedOrgInfo();
			var win = new Jinpeng.deviceTrouble.AddNewDeviceTroubleWindow({
				id : 'addNewDeviceWin',
				addNewFlag : true,
				title : '新增故障信息故障信息'
			});
			win.show();
		},
		onBtnModifywHandler : function() {
			var records = Ext.getCmp('deviceTroubleRecordGridPanel').getSelectionModel().getSelections();
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
			var recodes = Ext.getCmp('deviceTroubleRecordGridPanel').getSelectionModel().getSelections();
			if (recodes.length > 0) {
				this.deleteDeviceById(recodes);
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
				this.modifyDeviceInfo(recode);
			}
		},
		modifyDeviceInfo : function(deviceTrouble) {
			var win,deviceTroubleId ;
			
			deviceTroubleId = deviceTrouble.data.ZTXH;
			
			win = new Jinpeng.deviceTrouble.AddNewDeviceTroubleWindow();
			
			win.loadRecordById(deviceTroubleId);
		},
		onDeleteHandler : function(grid, rowIndex, colIndex, item, event) {
			event.stopEvent();
			 recode = grid.store.getAt(rowIndex);
			if (recode) {
				this.deleteDeviceById([ recode ]);
			}
		},
		deleteDeviceById : function(records) {
			zhi = records;
			var win = new Jinpeng.deviceTrouble.HistoryCarDetailWindows();
			win.msg = "确定要删除？";	
			win.show();
		},
		/* 响应查看超链接的方法 */
		checkHref : function(grid, rowIndex, colIndex, item, event) {
			var record = grid.store.getAt(rowIndex);
			if (record) {
				// 创建一个window对象
				var win = new Jinpeng.deviceTrouble.KakouShowHistoryDetailWindow();
				//将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
				win.loadId = record.get("id");
				win.show();
			}
		}
	});

Jinpeng.deviceTrouble.HistoryCarDetailWindows = Ext.extend(Jinpeng.widget.GeneralWindow,{
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
		Jinpeng.deviceTrouble.HistoryCarDetailWindows .superclass.initComponent.apply(this);
	},fengshow : function(){
		var records;
		if(zhi!=''){
			records=zhi;
		}else if(recode!=''){
			records=recode;
		}
		this.close();
		var _this = this;
		var ids = [];
		var deviceTroublesIDS = [];
		var deviceTroubleNames = [];
		var isContinue = true;
		Ext.each(records, function(item, index, items) {
			ids.push(item.get("ZTXH"));
		});
		if (!isContinue)
			return;
		/* 确认删除与否 */
					/* 确认删除则通过AJAX请求删除相应的数据 */
					Ext.Ajax.request({
						url : rootpath + '/device/deleteDeviceTrouble.mvc',
						params : {
							idStr : ids.join(",")
						},
						success : function(response, options) {
							var o = response.responseData || Ext.decode(response.responseText);
							var result = o.data;
							
							var msg = "";
							if (result > 0) {
								var grid = Ext.getCmp('deviceTroubleRecordGridPanel');
								if(grid){
									grid.publish("clearGridSelections",[]);
									grid.store.reload();
								}
								msg = "删除故障信息成功！";
								//dispatchDeviceMessage(result[1]);
								//this.close();
							} else {
								msg = "删除故障信息失败！";
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
		Jinpeng.deviceTrouble.HistoryCarDetailWindows .superclass.afterRender.call(this);
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
Ext.reg('deviceTroubleInfoDataPanel', Jinpeng.deviceTrouble.DeviceInfoDataPanel);
Ext.reg('deviceTroubleInfoCenterGridPanel',Jinpeng.deviceTrouble.DeviceInfoCenterGridPanel);
