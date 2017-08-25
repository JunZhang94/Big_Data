/**
 * \ * 入口
 */
Ext.ns("Jinpeng.provider");
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
			xtype : 'providerInfoDataPanel'
		} ]
	});
});

/**
 * @class Jinpeng.TabPanel 工作区标签页组件
 */
/**
 * north区域表单部份
 */
Jinpeng.provider.DeviceInfoDataPanel = Ext.extend(Ext.Panel,{
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
									text : "供应商名称"
								},
								fieldLabel : '&nbsp;&nbsp;供应商名称',
								name : 'providerName',
								id : 'providerName'
							} ]
						}, {
							columnWidth : 0.7,
							layout : 'form',
							border : false,
							items : [ {
								xtype : 'button',
								text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
								handler : this.advanceSearch,
								scope : this
							} ]
						} ]
					} ]
				}, {
					region : 'center',
					margins:'10 0 0 0',
					xtype : 'providerInfoCenterGridPanel',
					ref : "../grid"
				}]
			});
			Jinpeng.provider.DeviceInfoDataPanel.superclass.initComponent.apply(this);
		},
		afterRender : function(ct, position) {
			Jinpeng.provider.DeviceInfoDataPanel.superclass.afterRender.apply(this, arguments);
		},
		/* 响应查询按钮 */
		advanceSearch : function() {
			var form = Ext.getCmp('searchDeviceForm');
			if (form.getForm().isValid()) {
				var grid = Ext.getCmp('providerRecordGridPanel');
				grid.store.baseParams = {};// 重置
				/** 将参数传入后台 */
				var baseparams = {
					"providerName" : Ext.getCmp('providerName').getValue()
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
var providerInfoStore = new Ext.data.JsonStore({
	url : rootpath + "/provider/queryProvider.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	remoteSort : true,
	fields : [
	      {name : 'ID'},
          {name : 'NAME'},
          {name : 'CANTACT_WAY'},
          {name : 'CANTACT_ADREES'},
          {name : 'REMARK'},
          {name : 'OPERATE_TIME'}
      ]
});
/**
 * 中心右区域数据显示中心
 */ 
Jinpeng.provider.DeviceInfoCenterGridPanel = Ext.extend(Ext.grid.GridPanel,{
		id : 'providerRecordGridPanel',
		frame : false,
		border : false,
		pageSize : Jinpeng.PageSize,
		initComponent : function() {
			var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
			Ext.apply(this,{
				store : providerInfoStore,
				cm : new Ext.grid.ColumnModel({
					defaults : {
						sortable : true
					},
					columns : [
							new Ext.ux.grid.PagingRowNumberer({ width : 40}),
							sm,
							{
								header : "供应商名称", dataIndex : 'NAME',
								renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
									//当文字过多的时候，鼠标移上去就给悬浮狂提示
							     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
								}
							}, {
								header : "联系方式", dataIndex : 'CANTACT_WAY'
							}, {
								header : "联系地址", dataIndex : 'CANTACT_ADREES',
								renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
								    if(value == null || value == ''){
								    	var lxdz='';
								    	return '<font ext:qtip="'+lxdz+'">'+lxdz+'</font>';
								    }else{
										//当文字过多的时候，鼠标移上去就给悬浮狂提示
								     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
								    }
								}
							}, {
								header : "添加时间", dataIndex : 'OPERATE_TIME',
								renderer : function(value) {
			        	             return value.substring(0,value.indexOf("."));
						        }
							}, {
								header : "备注", dataIndex : 'REMARK',
								renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
								if(value==null || value==''){
									var bz='';
									return '<font ext:qtip="'+bz+'">'+bz+'</font>';
								}else{
									//当文字过多的时候，鼠标移上去就给悬浮狂提示
							     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
								}
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
								ref : '../btnAddNew'
							}, {
				          		  xtype : 'tbspacer',
				          		  width : 10
			          	  	},{
								xtype : 'button',
								text : '&nbsp;&nbsp;&nbsp;修改&nbsp;&nbsp;&nbsp;',
								height : 20,
								ref : '../btnModify'
							}, {
				          		  xtype : 'tbspacer',
				          		  width : 10
			          	  	},{
								xtype : 'button',
								text : '&nbsp;&nbsp;&nbsp;删除&nbsp;&nbsp;&nbsp;',
								height : 20,
								ref : '../btnDelete'
							} ]
						},
						bbar : new Jinpeng.widget.PagingToolbar({
							/* 添加样式所需id */
							id : "PagingToolbar",
							store : providerInfoStore,
							displayInfo : true,
							emptyMsg : "无数据",
							pageSize : this.pageSize
						}),
						listeners : {
							afterrender : function() {
								// 加载数据
								providerInfoStore.load({
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
								 var win,providerId ;
									
									providerId = recode.data.ID;
									
									win = new Jinpeng.provider.AddNewProviderWindow();
									
									win.loadRecordById(providerId);
								}
								
							}
						}
			});
			// 响应最后一列查看点击事件 
			this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
				// var record =Ext.getCmp('providerRecordGridPanel').getStore().getAt(rowIndex);
				var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
				if (fieldName == 'operate') {
					if (typeof this.checkHref == 'function')
						/* 调用查看超链接方法 */
						this.checkHref(grid, rowIndex, columnIndex);
				}
			});
			Jinpeng.provider.DeviceInfoCenterGridPanel.superclass.initComponent.apply(this);
			
			this.btnAddNew.on('click', this.onBtnAddNewHandler, this);
			this.btnModify.on('click', this.onBtnModifywHandler, this);
			this.btnDelete.on('click', this.onBtnDeleteHandler, this);
		},
		onBtnAddNewHandler : function() {
			//var info = Ext.getCmp("orgTreeWestPanel").getSelectedOrgInfo();
			var win = new Jinpeng.provider.AddNewProviderWindow({
				id : 'addNewDeviceWin',
				addNewFlag : true,
				title : '新增供应商信息'
			});
			//win.loadEmptyRecord();
			win.show();
		},
		onBtnModifywHandler : function() {
			var records = Ext.getCmp('providerRecordGridPanel').getSelectionModel().getSelections();
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
			var recodes = Ext.getCmp('providerRecordGridPanel').getSelectionModel().getSelections();
			if (recodes.length > 0) {
				// this.deleteDeviceById(recode.get("id"),recode.get("providerId"));
				zhi = recodes;
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
		modifyDeviceInfo : function(provider) {
			var win,providerId ;
			
			providerId = provider.data.ID;
			
			win = new Jinpeng.provider.AddNewProviderWindow();
			
			win.loadRecordById(providerId);
		},
		onDeleteHandler : function(grid, rowIndex, colIndex, item, event) {
			event.stopEvent();
			 recode = grid.store.getAt(rowIndex);
			if (recode) {
				this.deleteDeviceById([ recode ]);
			}
		},
		deleteDeviceById : function(records) {
			var win = new Jinpeng.provider.HistoryCarDetailWindows();
			win.msg = "确定要删除这个供应商？";	
			win.show();
		},
		/* 响应查看超链接的方法 */
		checkHref : function(grid, rowIndex, colIndex, item, event) {
			var record = grid.store.getAt(rowIndex);
			if (record) {
				// 创建一个window对象
				var win = new Jinpeng.provider.KakouShowHistoryDetailWindow();
				//将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
				win.loadId = record.get("id");
				win.show();
			}
		}
	});
Jinpeng.provider.HistoryCarDetailWindows = Ext.extend(Jinpeng.widget.GeneralWindow,{
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
		Jinpeng.provider.HistoryCarDetailWindows .superclass.initComponent.apply(this);
	},fengshow : function(){
		this.close();
		var records;
		if( recode!=''){
			records=recode;
		}else if(zhi!=''){
			records = zhi;
		}
		var _this = this;
		var ids = [];
		var providersIDS = [];
		var providerNames = [];
		var isContinue = true;
		Ext.each(records, function(item, index, items) {
			/*if (!_this.isAllowDeleteOrModify(item,true)) {
				isContinue = false;
				return false;
			}*/
			ids.push(item.get("ID"));
			//providersIDS.push(item.get("providerId"));
			//providerNames.push(item.get("title"));
		});
		if (!isContinue)
			return;
					/* 确认删除则通过AJAX请求删除相应的数据 */
					Ext.Ajax.request({
						url : rootpath + '/provider/deleteProvider.mvc',
						params : {
							idStr : ids.join(",")
							//providerNames : providerNames.join(",")
						},
						success : function(response, options) {
							var o = response.responseData || Ext.decode(response.responseText);
							var result = o.data;
							
							var msg = "";
							if (result > 0) {
								//添加之后就刷新页面
								var grid = Ext.getCmp("providerRecordGridPanel");
								if(grid){
									grid.publish("clearGridSlections",[]);
									grid.store.reload();
								}
								msg = "删除供应商成功！";
								//dispatchDeviceMessage(result[1]);
								//this.close();
							} else {
								msg = "删除供应商失败！";
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
		Jinpeng.provider.HistoryCarDetailWindows .superclass.afterRender.call(this);
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
Ext.reg('providerInfoDataPanel', Jinpeng.provider.DeviceInfoDataPanel);
Ext.reg('providerInfoCenterGridPanel',Jinpeng.provider.DeviceInfoCenterGridPanel);
