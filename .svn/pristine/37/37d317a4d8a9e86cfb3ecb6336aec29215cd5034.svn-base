/**
 *  入口
 */
Ext.ns("Jinpeng.hotRecode");
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
			region : 'north',
			border : false,
			height : 45,
			// 自定标签
			xtype : 'hotRecodeInfoDataPanel'
		}, {
			region : 'center',
			border : false,
			// 自定标签
			xtype : 'hotRecodeInfoCenterGridPanel'
		} ]
	});
});

var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
var treeUrl = '/Big_Data/zTree/demo/cn/excheck/multiSelectTree1.html';
//多卡口选择树
var kwin =new Jinpeng.widget.GeneralWindow({
	id: "mywin",
	title: "",
	constrain : true,
	constrainHeader : true,
	width: ww * 2 / 3,
	height: hh * 3 / 4,
	layout: "fit",
	//autoShow: true,
	closeAction:'hide',
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="' + treeUrl + '"></iframe>'
});
var setKKValue=function(data){
	Ext.getCmp('passStation').setValue(data.text);
	Ext.getCmp('directions').setValue(data.id);
	Ext.getCmp('mywin').hide();
};
var cancelKK=function(data){
	Ext.getCmp('passStation').setValue("");
	Ext.getCmp('directions').setValue("");
	Ext.getCmp('mywin').hide();
};

/**
 * @class Jinpeng.TabPanel 工作区标签页组件
 * north区域表单部份
 */
Jinpeng.hotRecode.HotInfoDataPanel = Ext.extend(Ext.Panel,{
	initComponent : function() {
		//车牌号
		var carNumStore = new Ext.data.JsonStore({
			url : rootpath
					+ "/dictionary/HPHMDictsInComboHPHM.mvc?code=LicPlate",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false
		});
		/** 设定参数 */
		Ext.apply(	this,{
			items : [ {
				// form表单
				xtype : 'form',
				id : 'searchHotForm',
				border : false,
				frame : true,
				cls : 'blue-button-ct',
				layout : 'table',
				defaults : {
					layout : 'form',
					//统一宽度
					width : 320
				},
				layoutConfig : {
					columns : 4
				},
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
					// 第一行
					items :[{
						xtype : 'combo',
						id : 'carNum',
						name:'carNum',
						fieldLabel : '车牌号码',
						editable : true,
						store : carNumStore,
						mode : 'local',
						emptyText : '全部',
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'text',
						vtype:'carNumUpper',
						anchor : '94%',
						listeners : {
							select : function () {
									Ext.getCmp("carNum").focus(false, 100);   
								}
							}
						}]
					}, {
						width:450,
						items : [{
							xtype : 'compositefield',
							anchor : '94%',
							items : [ {
								flex : 0.5,
								fieldLabel : '卡口',
								xtype : 'tooltiptextfield',
								name : 'passStation',
								id : 'passStation',
								width : 180,
								emptyText : '请选择卡口'
							}, {
								flex : 0.5,
								owner : this,
								labelAlign : 'right',
								xtype : 'button',
								text : '选择卡口',
								id:'choosekkBtn',
								handler : function(){
									kwin.show();
								}
							} ]
						}]
					},{
						xtype : 'compositefield',
						items : [{
							flex : 31,
							xtype : 'button',
							text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
							id : "searchBut",
							handler : this.hotRecodeSearch
						},{
							flex : 31,
							xtype : 'button',
							id : "resetBut",
							text : '&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;',
							handler : this.resetMethod
						}]
					},{
						items : [{
							xtype : 'hidden',
							id : 'directions'
						}]
					}]
			} ],
			listeners : {
				afterrender : function() {
					/*车牌省Store*/
					carNumStore.load();
				}
			}
		});
		Jinpeng.hotRecode.HotInfoDataPanel.superclass.initComponent.apply(this);
	},
	afterRender : function(ct, position) {
		Jinpeng.hotRecode.HotInfoDataPanel.superclass.afterRender.apply(this, arguments);
	},
	/* 响应查询按钮 */
	hotRecodeSearch : function() {
		var form = Ext.getCmp('searchHotForm');
		if (form.getForm().isValid()) {
			var grid = Ext.getCmp('hotRecodeRecordGridPanel');
			grid.store.baseParams = {};// 重置
			/** 将参数传入后台 */
			var baseparams = {
				"carNum" : Ext.getCmp('carNum').getValue(),
				"mounts" : Ext.getCmp('directions').getValue(),
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
	},
	resetMethod :  function() {
		Ext.getCmp('searchHotForm').getForm().reset();
	}
});

/**
 * 列表数据Store
 */
var hotRecodeInfoStore = new Ext.data.JsonStore({
	url : rootpath + "/hotRecode/queryHotRecode.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	remoteSort : true,
	fields : [
	      {name : 'ID'},
          {name : 'CAR_NUM'},
          {name : 'START_DATE'},
          {name : 'END_DATE'},
          {name : 'KKBHS'},
          {name : 'KKMCS'},
      ]
});
/**
 * 中心右区域数据显示中心
 */ 
Jinpeng.hotRecode.HotInfoCenterGridPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'hotRecodeRecordGridPanel',
	frame : false,
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this,{
			store : hotRecodeInfoStore,
			cm : new Ext.grid.ColumnModel({
				defaults : {
					sortable : true
				},
				columns : [
						new Ext.ux.grid.PagingRowNumberer({ width : 40}),
						sm,
						{
							header : "号牌号码", dataIndex : 'CAR_NUM'}, 
						{
							header : "有效开始时间", dataIndex : 'START_DATE',
							renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
								//当文字过多的时候，鼠标移上去就给悬浮狂提示
						         var gzsj = value.substring(0,value.indexOf("."));
						     	 return gzsj;
							}
						}, {
							header : "有效结束时间", dataIndex : 'END_DATE',
							renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
								//当文字过多的时候，鼠标移上去就给悬浮狂提示
						         var gzsj = value.substring(0,value.indexOf("."));
						     	 return gzsj;
								}
						}, {
							header : "卡口信息", dataIndex : 'KKMCS',
							renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
								//当文字过多的时候，鼠标移上去就给悬浮狂提示
								if (value == null) {
									return '';
								} else {
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
						store : hotRecodeInfoStore,
						displayInfo : true,
						emptyMsg : "无数据",
						pageSize : this.pageSize
					}),
					listeners : {
						afterrender : function() {
							// 加载数据
							hotRecodeInfoStore.load({
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
								var win,hotRecodeId ;
								
								hotRecodeId = recode.data.ID;
								
								win = new Jinpeng.hotRecode.AddNewHotRecodeWindow();
								
								win.loadRecordById(hotRecodeId);
							}
						}
					}
		});
		// 响应最后一列查看点击事件 
		this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
			// var record =Ext.getCmp('hotRecodeRecordGridPanel').getStore().getAt(rowIndex);
			var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
			if (fieldName == 'operate') {
				if (typeof this.checkHref == 'function')
					/* 调用查看超链接方法 */
					this.checkHref(grid, rowIndex, columnIndex);
			}
		});
		Jinpeng.hotRecode.HotInfoCenterGridPanel.superclass.initComponent.apply(this);
		
		this.btnAddNew.on('click', this.onBtnAddNewHandler, this);
		this.btnModify.on('click', this.onBtnModifywHandler, this);
		this.btnDelete.on('click', this.onBtnDeleteHandler, this);
	},
	onBtnAddNewHandler : function() {
		//var info = Ext.getCmp("orgTreeWestPanel").getSelectedOrgInfo();
		var win = new Jinpeng.hotRecode.AddNewHotRecodeWindow({
			id : 'addNewHotWin',
			addNewFlag : true,
			title : '新增红名单信息'
		});
		win.show();
	},
	onBtnModifywHandler : function() {
		var records = Ext.getCmp('hotRecodeRecordGridPanel').getSelectionModel().getSelections();
		if (records.length == 1) {
			this.modifyHotInfo(records[0]);
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
		var recodes = Ext.getCmp('hotRecodeRecordGridPanel').getSelectionModel().getSelections();
		if (recodes.length > 0) {
			this.deleteHotById(recodes);
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
			this.modifyHotInfo(recode);
		}
	},
	modifyHotInfo : function(hotRecode) {
		var win,hotRecodeId ;
		hotRecodeId = hotRecode.data.ID;
		win = new Jinpeng.hotRecode.AddNewHotRecodeWindow();
		win.loadRecordById(hotRecodeId);
	},
	onDeleteHandler : function(grid, rowIndex, colIndex, item, event) {
		event.stopEvent();
		recode = grid.store.getAt(rowIndex);
		if (recode) {
			this.deleteHotById([ recode ]);
		}
	},
	deleteHotById : function(records) {
		zhi = records;
		var win = new Jinpeng.hotRecode.HistoryCarDetailWindows();
		win.msg = "确定要删除？";	
		win.show();
	},
	/* 响应查看超链接的方法 */
	checkHref : function(grid, rowIndex, colIndex, item, event) {
		var record = grid.store.getAt(rowIndex);
		if (record) {
			// 创建一个window对象
			var win = new Jinpeng.hotRecode.KakouShowHistoryDetailWindow();
			//将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
			win.loadId = record.get("id");
			win.show();
		}
	}
});

Jinpeng.hotRecode.HistoryCarDetailWindows = Ext.extend(Jinpeng.widget.GeneralWindow,{
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
		Jinpeng.hotRecode.HistoryCarDetailWindows .superclass.initComponent.apply(this);
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
		var hotRecodesIDS = [];
		var hotRecodeNames = [];
		var isContinue = true;
		Ext.each(records, function(item, index, items) {
			ids.push(item.get("ID"));
		});
		if (!isContinue)
			return;
		/* 确认删除与否 */
		/* 确认删除则通过AJAX请求删除相应的数据 */
		Ext.Ajax.request({
			url : rootpath + '/hotRecode/deleteHotRecode.mvc',
			params : {
				idStr : ids.join(",")
			},
			success : function(response, options) {
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				
				var msg = "";
				if (result > 0) {
					var grid = Ext.getCmp('hotRecodeRecordGridPanel');
					if(grid){
						grid.publish("clearGridSelections",[]);
						grid.store.reload();
					}
					msg = "删除红名单信息成功！";
					//dispatchHotMessage(result[1]);
					//this.close();
				} else {
					msg = "删除红名单信息失败！";
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
		Jinpeng.hotRecode.HistoryCarDetailWindows .superclass.afterRender.call(this);
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
Ext.reg('hotRecodeInfoDataPanel', Jinpeng.hotRecode.HotInfoDataPanel);
Ext.reg('hotRecodeInfoCenterGridPanel',Jinpeng.hotRecode.HotInfoCenterGridPanel);
