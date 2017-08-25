/**
 * 过车数据后台下载管理
 */
Ext.ns('Jinpeng.download');

var viewPort = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'center',
			border : false,
			xtype : 'carDataTabPanel'
		}]
	});
});

/**
 * 整个界面用TabPanel分配
 */
Jinpeng.download.CarDataTabPanel = Ext.extend(Ext.TabPanel, {
	initComponent : function() {
		Ext.apply(this, {
			activeTab : 0,
			items : [{
				title : '数据导出管理',
				layout : 'border',
				items : [ {
					region : 'center',
					border : false,
					xtype : 'carDataGridPanel'
				}]
			}, {
				title : '图片下载管理',
				layout : 'border',
				items : [{
					region : 'center',
					border : false,
					xtype : 'imageDataGridPanel'
				}]
			}]
		});
		Jinpeng.download.CarDataTabPanel.superclass.initComponent.apply(this);
	}
});

/**
 * 下载管理数据列表--Grid
 */
Jinpeng.download.CarDataGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'carDataGrid',
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var _panel = this;
		var commuServerStore = new Ext.data.JsonStore({
			url : rootpath+ "/car/exportManger.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
			  {name:'ID'},
	          {name : 'USER_ID'},
	          {name : 'START_TIME'},
	          {name : 'END_TIME'},
	          {
					name : 'statusText',
					mapping:'STATUS',
					convert:function(v, record){
						if (v==1) {
							return "导出完成";
						} else if(v==0){
							return "正在导出";
						} else if(v==3){
							return "用户取消";
						} else if (v==2) {
							return "导出失败";
						} else {
							return record.msg;
						}
					}
			  },
	          {name : 'STATUS'},
	          {name : 'MSG'},
	          {name : 'TYPE'},
	          {name : 'FILE_NAME'},
	          {
					name : 'url',
					mapping:'FILE_NAME',
					convert:function(v, record){
						return  rootpath +"/content/resources/download/"+v;
					}
			   },
			   {
				   name : 'operate',
				   mapping:'STATUS',
				   convert:function(value, record){
					   if (value == 1) {
							return 'export';
						} else if(value == 1 || value == 2 || value == 3){
							return 'delete';
						} else if(value == 0){
							return 'stop';
						}
			   	   }
			   }
            ]
		});
		
		var sm = new Ext.grid.CheckboxSelectionModel();
		Ext.apply(this, {
			store :  commuServerStore,
			selModel : sm,
			colModel : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
		           new Ext.ux.grid.PagingRowNumberer({ width : 40 }),
		           sm,
		           {header : '名称', dataIndex : 'FILE_NAME', width : .35},
		           {header : '导出开始时间', dataIndex : 'START_TIME', width : .2, renderer : function(value) {
		        	   var time = '';
					   if (value != '' && value != null && value != undefined) {
						   time = value.substring(0,value.indexOf("."));
					   }
       				   return time;
				   }},
		           {header : '导出结束时间', dataIndex : 'END_TIME', width : .2, renderer : function(value) {
					   var time = '';
					   if (value != '' && value != null && value != undefined) {
						   time = value.substring(0,value.indexOf("."));
					   }
       				   return time;
				   }},
		           {header : '状态', dataIndex : 'statusText', width : .1},
		           /*{header : '类型', dataIndex : 'FILE_NAME', width : .05, renderer : function(key) {
						var index = key.lastIndexOf(".");
						if(index ==-1 || index == key.length-1){
							return "";
						}
						return key.substring(index+1);
					}},*/
					{header : '操作', dataIndex : 'operate', width : .15, renderer : function(key) {
						if (key == 'export') {
							return '<a href="#">下载</a>';
						} else if(key == 'delete'){
							return '<a href="#">删除</a>';
						} else if(key == 'stop'){
							return '<a href="#">取消</a>';
						} else {
							return '';
						}
					}}
	            ]
			}),
			tbar : {
				cls : 'blue-button-ct',
				items : [ {
					xtype : 'button',
					id : 'refreshRecordBtn',
					text : '&nbsp;&nbsp;&nbsp;刷新&nbsp;&nbsp;&nbsp;',
					handler : this.refreshQueryData
				}, {
					xtype : 'tbspacer',
					width : 10
				}, {
					xtype : 'button',
					id : 'clearnRecordBtn',
					text : '&nbsp;&nbsp;&nbsp;清空&nbsp;&nbsp;&nbsp;',
					handler : this.clearnData
				} ]
			},
			bbar : new Jinpeng.widget.PagingToolbar( {
				id : 'PagingToolbar',
				store : commuServerStore,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			}),
			listeners : {
				afterrender : function(list) {
					// 加载数据
					commuServerStore.load({
						params : {
							'page.start' : 0,
							'page.limit' : this.pageSize
						}
					});
					list.initIframe();
				}
			},
			initIframe:function(){
				var downloadFrame=document.getElementById("downloadFileFrame");
				if(!downloadFrame){
					downloadFrame = Ext.DomHelper.append(Ext.getBody(), "<iframe name='downloadFileFrame' id='downloadFileFrame' style='display:none'></iframe>");
				}
			}
		});
		//最后一列查看点击事件 
		this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
			var recode = grid.store.getAt(rowIndex);
			var opetate = recode.get('operate');
			var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
			if (fieldName == 'operate') {
				if (opetate == 'export') {
					_panel.onDownloadHandler(grid, rowIndex)
				} else if (opetate == 'delete') {
					_panel.onDeleteHandler(grid, rowIndex)
				} else if (opetate == 'stop') {
					_panel.onStopHandler(grid, rowIndex)
				}
			}
		});
		Jinpeng.download.CarDataGridPanel.superclass.initComponent.apply(this);
	},
	onDownloadHandler : function(grid, rowIndex, colIndex, item, event) {
		var recode = grid.store.getAt(rowIndex);
		var url = recode.get("url");
		window.open(url);
	},
	refreshQueryData : function() {
		var grid = Ext.getCmp('carDataGrid');
		grid.store.load({
			params : {
				'page.start' : 0,
				'page.limit' : Jinpeng.PageSize
			}
		});
	},
	onDeleteHandler : function(grid, rowIndex, colIndex, item, event) {
		var recode = grid.store.getAt(rowIndex);
		var id = recode.get("ID");
		var _this = this;
		Ext.Msg.confirm("系统提示", "确定删除该条记录?", function(flag) {
			if (flag == "yes") {
				Ext.Ajax.request({
					url : rootpath + "/car/deleteExport.mvc?id="+id,
					success : function(response, options) {
						json = response.responseText;
						var r = response.responseData || Ext.decode(json);
						if(!r.data){
							Ext.Msg.show({
								title : '提示',
								msg : "删除失败！",
								minWidth : 250,
								buttons : Ext.MessageBox.OK
							});
						}
						_this.store.reload({callback :function(){
							_this.fireEvent("afterrender",_this);
						}});
					}
				});
			} 
		});
	},
	onStopHandler : function(grid, rowIndex, colIndex, item, event) {
		var recode = grid.store.getAt(rowIndex);
		var id = recode.get("ID");
		var _this = this;
		Ext.Msg.confirm("系统提示", "确定取消?", function(flag) {
			if (flag == "yes") {
				Ext.Ajax.request({
					url : rootpath + "/car/stopExport.mvc?id="+id,
					success : function(response, options) {
						json = response.responseText;
						var r = response.responseData || Ext.decode(json);
						if(r.data){
							Ext.Msg.show({
								title : '提示',
								msg : r.data.msg,
								minWidth : 250,
								buttons : Ext.MessageBox.OK
							});
						}
						_this.store.reload({callback :function(){
							_this.fireEvent("afterrender",_this);
						}});
					}
				});
			} 
		});
	},
	clearnData : function() {
		var grid = Ext.getCmp('carDataGrid');
		var recodes = Ext.getCmp('carDataGrid').getSelectionModel().getSelections();
		this.ownerCt.ownerCt.clearnSelectData(recodes);
	},
	clearnSelectData : function(recodes) {
		var idstr = '';
		var msg = "";
		if (recodes.length != 0) {
			Ext.each(recodes, function(item, index) {
				if (idstr) {
					idstr = idstr + ",";
				}
				idstr= idstr + item.data.ID;
			});
			msg = "确定要清空选择的记录?";
		} else {
			msg = "确定要清空所有的记录?";
		}
		Ext.Msg.confirm("系统提示", msg, function(flag) {
			if (flag == "yes") {
				Ext.Ajax.request({
					url : rootpath + "/car/clearnExport.mvc?ids="+idstr,
					success : function(response, options) {
						json = response.responseText;
						var r = response.responseData || Ext.decode(json);
						if(r.data){
							Ext.Msg.show({
								title : '提示',
								msg : '清空完成！',
								minWidth : 250,
								buttons : Ext.MessageBox.OK
							});
						}
						Ext.getCmp('carDataGrid').store.reload({callback :function(){
							_this.fireEvent("afterrender",_this);
						}});
					}
				});
			} 
		});
	}
});

/**
 * 图片下载管理数据列表--Grid
 */
Jinpeng.download.ImageDataGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'imageDataGrid',
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var _panel = this;
		var commuServerStore = new Ext.data.JsonStore({
			url : rootpath+ "/car/imageManger.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
			  {name:'ID'},
	          {name : 'USER_ID'},
	          {name : 'START_TIME'},
	          {name : 'END_TIME'},
	          {
					name : 'statusText',
					mapping:'STATUS',
					convert:function(v, record){
						if (v==1) {
							return "导出完成";
						} else if(v==0){
							return "正在导出";
						} else if(v==3){
							return "用户取消";
						} else if (v==2) {
							return "导出失败";
						} else {
							return record.msg;
						}
					}
			  },
	          {name : 'STATUS'},
	          {name : 'MSG'},
	          {name : 'TYPE'},
	          {name : 'FILE_NAME'},
	          {
					name : 'url',
					mapping:'FILE_NAME',
					convert:function(v, record){
						return  rootpath +"/image/download/"+v;
					}
			   },
			   {
				   name : 'operate',
				   mapping:'STATUS',
				   convert:function(value, record){
					   if (value == 1) {
							return 'export';
						} else if(value == 1 || value == 2 || value == 3){
							return 'delete';
						} else if(value == 0){
							return 'stop';
						}
			   	   }
			   }
            ]
		});
		
		var sm = new Ext.grid.CheckboxSelectionModel();
		Ext.apply(this, {
			store :  commuServerStore,
			selModel : sm,
			colModel : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
		           new Ext.ux.grid.PagingRowNumberer({ width : 40 }),
		           sm,
		           {header : '名称', dataIndex : 'FILE_NAME', width : .35},
		           {header : '导出开始时间', dataIndex : 'START_TIME', width : .2, renderer : function(value) {
		        	   var time = '';
					   if (value != '' && value != null && value != undefined) {
						   time = value.substring(0,value.indexOf("."));
					   }
       				   return time;
				   }},
		           {header : '导出结束时间', dataIndex : 'END_TIME', width : .2, renderer : function(value) {
					   var time = '';
					   if (value != '' && value != null && value != undefined) {
						   time = value.substring(0,value.indexOf("."));
					   }
       				   return time;
				   }},
		           {header : '状态', dataIndex : 'statusText', width : .1},
		           /*{header : '类型', dataIndex : 'FILE_NAME', width : .05, renderer : function(key) {
						var index = key.lastIndexOf(".");
						if(index ==-1 || index == key.length-1){
							return "";
						}
						return key.substring(index+1);
					}},*/
					{header : '操作', dataIndex : 'operate', width : .15, renderer : function(key) {
						if (key == 'export') {
							return '<a href="#">下载</a>';
						} else if(key == 'delete'){
							return '<a href="#">删除</a>';
						} else if(key == 'stop'){
							return '<a href="#">取消</a>';
						} else {
							return '';
						}
					}}
	            ]
			}),
			tbar : {
				cls : 'blue-button-ct',
				items : [ {
					xtype : 'button',
					id : 'refreshRecordBtn',
					text : '&nbsp;&nbsp;&nbsp;刷新&nbsp;&nbsp;&nbsp;',
					handler : this.refreshQueryData
				}, {
					xtype : 'tbspacer',
					width : 10
				}, {
					xtype : 'button',
					id : 'clearnRecordBtn',
					text : '&nbsp;&nbsp;&nbsp;清空&nbsp;&nbsp;&nbsp;',
					handler : this.clearnImageData
				} ]
			},
			bbar : new Jinpeng.widget.PagingToolbar( {
				id : 'PagingToolbar1',
				cls :'PagingToolbar',
				store : commuServerStore,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			}),
			listeners : {
				afterrender : function(list) {
					// 加载数据
					commuServerStore.load({
						params : {
							'page.start' : 0,
							'page.limit' : this.pageSize
						}
					});
					list.initIframe();
				}
			},
			initIframe:function(){
				var downloadFrame=document.getElementById("downloadFileFrame");
				if(!downloadFrame){
					downloadFrame = Ext.DomHelper.append(Ext.getBody(), "<iframe name='downloadFileFrame' id='downloadFileFrame' style='display:none'></iframe>");
				}
			}
		});
		//最后一列查看点击事件 
		this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
			var recode = grid.store.getAt(rowIndex);
			var opetate = recode.get('operate');
			var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
			if (fieldName == 'operate') {
				if (opetate == 'export') {
					_panel.onDownloadHandler(grid, rowIndex)
				} else if (opetate == 'delete') {
					_panel.onDeleteHandler(grid, rowIndex)
				} else if (opetate == 'stop') {
					_panel.onStopHandler(grid, rowIndex)
				}
			}
		});
		Jinpeng.download.ImageDataGridPanel.superclass.initComponent.apply(this);
	},
	onDownloadHandler : function(grid, rowIndex, colIndex, item, event) {
		var recode = grid.store.getAt(rowIndex);
		var url = recode.get("url");
		window.open(url);
	},
	refreshQueryData : function() {
		var grid = Ext.getCmp('imageDataGrid');
		grid.store.load({
			params : {
				'page.start' : 0,
				'page.limit' : Jinpeng.PageSize
			}
		});
	},
	onDeleteHandler : function(grid, rowIndex, colIndex, item, event) {
		var recode = grid.store.getAt(rowIndex);
		var id = recode.get("ID");
		var _this = this;
		Ext.Msg.confirm("系统提示", "确定删除该条记录?", function(flag) {
			if (flag == "yes") {
				Ext.Ajax.request({
					url : rootpath + "/car/deleteDownload.mvc?id="+id,
					success : function(response, options) {
						json = response.responseText;
						var r = response.responseData || Ext.decode(json);
						if(!r.data){
							Ext.Msg.show({
								title : '提示',
								msg : "删除失败！",
								minWidth : 250,
								buttons : Ext.MessageBox.OK
							});
						}
						_this.store.reload({callback :function(){
							_this.fireEvent("afterrender",_this);
						}});
					}
				});
			} 
		});
	},
	onStopHandler : function(grid, rowIndex, colIndex, item, event) {
		var recode = grid.store.getAt(rowIndex);
		var id = recode.get("ID");
		var _this = this;
		Ext.Msg.confirm("系统提示", "确定取消?", function(flag) {
			if (flag == "yes") {
				Ext.Ajax.request({
					url : rootpath + "/car/stopDownload.mvc?id="+id,
					success : function(response, options) {
						json = response.responseText;
						var r = response.responseData || Ext.decode(json);
						if(r.data){
							Ext.Msg.show({
								title : '提示',
								msg : r.data.msg,
								minWidth : 250,
								buttons : Ext.MessageBox.OK
							});
						}
						_this.store.reload({callback :function(){
							_this.fireEvent("afterrender",_this);
						}});
					}
				});
			} 
		});
	},
	clearnImageData : function() {
		var grid = Ext.getCmp('imageDataGrid');
		var recodes = Ext.getCmp('imageDataGrid').getSelectionModel().getSelections();
		this.ownerCt.ownerCt.clearnSelectData(recodes);
	},
	clearnSelectData : function(recodes) {
		var idstr = '';
		var msg = "";
		if (recodes.length != 0) {
			Ext.each(recodes, function(item, index) {
				if (idstr) {
					idstr = idstr + ",";
				}
				idstr= idstr + item.data.ID;
			});
			msg = "确定要清空选择的记录?";
		} else {
			msg = "确定要清空所有的记录?";
		}
		Ext.Msg.confirm("系统提示", msg, function(flag) {
			if (flag == "yes") {
				Ext.Ajax.request({
					url : rootpath + "/car/clearnDownload.mvc?ids="+idstr,
					success : function(response, options) {
						json = response.responseText;
						var r = response.responseData || Ext.decode(json);
						if(r.data){
							Ext.Msg.show({
								title : '提示',
								msg : '清空完成！',
								minWidth : 250,
								buttons : Ext.MessageBox.OK
							});
						}
						Ext.getCmp('imageDataGrid').store.reload({callback :function(){
							_this.fireEvent("afterrender",_this);
						}});
					}
				});
			} 
		});
	}
});

Ext.reg('carDataGridPanel', Jinpeng.download.CarDataGridPanel);
Ext.reg('carDataTabPanel', Jinpeng.download.CarDataTabPanel);
Ext.reg('imageDataGridPanel', Jinpeng.download.ImageDataGridPanel);
