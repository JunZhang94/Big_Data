/**
 *  卡口审核入口
 */
Ext.ns("Jinpeng.bayoneVerify");
var zhi ='';
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
			xtype : 'bayoneVerifyInfoFormPanel'
		} ]
	});
});

/**
 * @class Jinpeng.TabPanel 工作区标签页组件
 * north区域表单部份
 */
Jinpeng.bayoneVerify.bayoneVerifyInfoFormPanel = Ext.extend(Ext.Panel,{
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
					border : false,
					frame : true,
					labelAlign : 'right',
					cls : 'blue-button-ct',
					
					layout : 'table',
					defaults : {
						width : 280,
						layout : 'form'
					},
					layoutConfig : {
						columns : 2
					},
					bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
					items : [ {
						items : [ {
							xtype : 'textfield',
							fieldLabel : '&nbsp;&nbsp;卡口名称',
							name : 'kkmc',
							id : 'kkmc'
						} ]
					}, {
						items : [ {
							xtype : 'button',
							text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
							id : 'searchBut',
							handler : this.bayoneSearch,
							scope : this
						} ]
					} ]
				}, {
					region : 'center',
					margins:'10 0 0 0',
					xtype : 'bayoneVerifyInfoGridPanel',
					ref : "../grid"
				}]
			});
			Jinpeng.bayoneVerify.bayoneVerifyInfoFormPanel.superclass.initComponent.apply(this);
		},
		afterRender : function(ct, position) {
			Jinpeng.bayoneVerify.bayoneVerifyInfoFormPanel.superclass.afterRender.apply(this, arguments);
		},
		/* 响应查询按钮 */
		bayoneSearch : function() {
			var form = Ext.getCmp('searchDeviceForm');
			if (form.getForm().isValid()) {
				var grid = Ext.getCmp('bayoneVerifyRecordGridPanel');
				grid.store.baseParams = {};// 重置
				/** 将参数传入后台 */
				var baseparams = {
					"kkmc" : Ext.getCmp('kkmc').getValue()
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
var bayoneVerifyInfoStore = new Ext.data.JsonStore({
	url : rootpath + "/bayonet/queryBayonetVerify.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	remoteSort : true,
	fields : [
	      {name : 'KKBH'},
          {name : 'KKMC'},
          {name : 'OPTION_TYPE'},
          {name : 'KKZT'},
          {name : 'BZ'},
          {name : 'KKLX'},
          {name : 'VERIFY_STATUS'},
          {name : 'VERIFY_DESC'}
      ]
});
/**
 * 中心右区域数据显示中心
 */ 
Jinpeng.bayoneVerify.bayoneVerifyInfoGridPanel = Ext.extend(Ext.grid.GridPanel,{
		id : 'bayoneVerifyRecordGridPanel',
		frame : false,
		border : false,
		pageSize : Jinpeng.PageSize,
		initComponent : function() {
			var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
			Ext.apply(this,{
				store : bayoneVerifyInfoStore,
				cm : new Ext.grid.ColumnModel({
					defaults : {
						sortable : true
					},
					columns : [
							new Ext.ux.grid.PagingRowNumberer({ width : 40}),
							sm,
							{
								header : "卡口名称", dataIndex : 'KKMC'
							}, {
								header : "操作类型", dataIndex : 'OPTION_TYPE',
								renderer : function(key) {
									var value = '';
									if (key == 1) {
										value = '新增';
									} else if (key == 2) {
										value = '修改';
									} else if (key == 3) {
										value = '删除';
									}
									return value;
								}
							}, {
								header : "卡口类型", dataIndex : 'KKLX',
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
								}
							}, {
								header : "卡口状态", 
								dataIndex : 'KKZT',
								renderer : function(value) {
									return window.dictionary.getValue("BAYONET_STATUS", value);
							    } 
							}, {
								header : "审核状态", 
								dataIndex : 'VERIFY_STATUS',
								renderer : function(value) {
									var str = '';
									if (value == 0) {
										str = '未审核';
									}
									if (value == 2) {
										str = '审核不通过';
									}
									return str;
							    } 
							}, {
								header : "备注", dataIndex : 'BZ'
							}, {
								header : "审核意见", dataIndex : 'VERIFY_DESC'
							}, {
								header : '操作',
								xtype : 'actioncolumn',
								width : 60,
								align : 'center',
								items : [ {
									icon : rootpath + '/themes/client/blue/images/system/edit.gif',
									text : '审核',
									tooltip : '审核',
									scope : this,
									handler : this.onVerifyHandler
									},{
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
								text : '&nbsp;&nbsp;&nbsp;审核&nbsp;&nbsp;&nbsp;',
								id : 'confimBtn',
								height : 20,
								handler : this.onBtnVerifyHandler,
								scope : this
							}, {
							  		  xtype : 'tbspacer',
							  		  width : 10
							  },{
								xtype : 'button',
								text : '&nbsp;&nbsp;&nbsp;删除&nbsp;&nbsp;&nbsp;',
								id : 'deleteBtn',
								height : 20,
								handler : this.onBtnDeleteHandler,
								scope : this
							}]
						},
						bbar : new Jinpeng.widget.PagingToolbar({
							/* 添加样式所需id */
							id : "PagingToolbar",
							store : bayoneVerifyInfoStore,
							displayInfo : true,
							emptyMsg : "无数据",
							pageSize : this.pageSize
						}),
						listeners : {
							afterrender : function() {
								// 加载数据
								bayoneVerifyInfoStore.load({
										params : {
											'page.start' : 0,
											'page.limit' : this.pageSize
										}
									});
							},rowdblclick : function(grid, rowIndex, e ) {
								
								var recode = grid.store.getAt(rowIndex);
								if (recode) {
									var win,bayoneVerifyId,optionType ;
									
									bayoneVerifyId = recode.data.KKBH;
									
									optionType = recode.data.OPTION_TYPE;
									
									win = new Jinpeng.bayoneVerify.AddNewBayoneVerifyWindow();
									
									win.loadRecordById(bayoneVerifyId, optionType);
								}
						
							}
						}
			});
			// 响应最后一列查看点击事件 
			this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
				// var record =Ext.getCmp('bayoneVerifyRecordGridPanel').getStore().getAt(rowIndex);
				var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
				if (fieldName == 'operate') {
					if (typeof this.checkHref == 'function')
						/* 调用查看超链接方法 */
						this.checkHref(grid, rowIndex, columnIndex);
				}
			});
			Jinpeng.bayoneVerify.bayoneVerifyInfoGridPanel.superclass.initComponent.apply(this);
			
		},
		onBtnVerifyHandler : function() {
			var records = Ext.getCmp('bayoneVerifyRecordGridPanel').getSelectionModel().getSelections();
			if (records.length == 1) {
				this.bayoneVerifyInfo(records[0]);
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
		onBtnDeleteHandler : function() {
			var records = this.getSelectionModel().getSelections();
			if (records.length > 0) {
				this.deleteDeviceById(records);
			} else {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '您没有选中数据，请先选择要删除的卡口数据！';
				win.show();
			}
		},
		onVerifyHandler : function(grid, rowIndex, colIndex, item, event) {
			event.stopEvent();
			var recode = grid.store.getAt(rowIndex);
			if (recode) {
				this.bayoneVerifyInfo(recode);
			}
		},
		bayoneVerifyInfo : function(bayoneVerify) {
			var win,bayoneVerifyId,optionType ;
			
			bayoneVerifyId = bayoneVerify.data.KKBH;
			
			optionType = bayoneVerify.data.OPTION_TYPE;
			
			win = new Jinpeng.bayoneVerify.AddNewBayoneVerifyWindow();
			
			win.loadRecordById(bayoneVerifyId, optionType);
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
				var win = new Jinpeng.bayoneVerify.HistoryCarDetailWindows();
				win.msg = "确定删除？";
				win.show();
		},
		/* 响应查看超链接的方法 */
		checkHref : function(grid, rowIndex, colIndex, item, event) {
			var record = grid.store.getAt(rowIndex);
			if (record) {
				// 创建一个window对象
				var win = new Jinpeng.bayoneVerify.KakouShowHistoryDetailWindow();
				//将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
				win.loadId = record.get("KKBH");
				win.show();
			}
		}
	});


Jinpeng.bayoneVerify.HistoryCarDetailWindows = Ext.extend(Jinpeng.widget.GeneralWindow,{
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
		Jinpeng.bayoneVerify.HistoryCarDetailWindows .superclass.initComponent.apply(this);
	},fengshow : function(){
		this.close();
		var records ;
		if(zhi!=''){
			records = zhi;
		}else if(recode!=''){
			records = recode;
		}
		var _this = this;
		var ids = [];
		var deleteurl = '';
		Ext.each(records, function(item, index, items) {
			ids.push(item.get("KKBH"));
		});
		deleteurl = rootpath + '/bayonet/goDeleteBayonet.mvc';
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
								var grid = Ext.getCmp("bayoneVerifyRecordGridPanel");
								if(grid){
									grid.publish("clearGridSelections",[]);
									grid.store.reload();
								}
								msg = "删除卡口信息成功！";
								//dispatchDeviceMessage(result[1]);
								//this.close();
							} else {
								msg = "删除卡口信息失败！";
							}
							zhi='';
							recode='';
							var win = new Jinpeng.widget.MessageWindow();
							win.msg = msg;
							win.show();
						}
					});
		

	},
	afterRender : function() {
		Jinpeng.bayoneVerify.HistoryCarDetailWindows .superclass.afterRender.call(this);
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

Ext.reg('bayoneVerifyInfoFormPanel', Jinpeng.bayoneVerify.bayoneVerifyInfoFormPanel);
Ext.reg('bayoneVerifyInfoGridPanel',Jinpeng.bayoneVerify.bayoneVerifyInfoGridPanel);
