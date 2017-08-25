/**
 * 卡口在线状态柱状图
 */
Ext.ns("Jinpeng.onlineColumn");

/**
 * 图表配置,柱状图
 * @type
 */
Jinpeng.onlineColumn.MountColumnConfig = {
	//url : rootpath + "/mountOnline/mountStatusOnlyCulumn.mvc",
	url : rootpath + "/chartStatus/mountCulumnStatus.mvc",
	root : 'data',
	fields : ['PERIOD', 'COUNT', 'OUT']
};

Jinpeng.onlineColumn.DataCulumnConfig = {
	//url : rootpath + "/dc/dataAcceptOnlyColumn.mvc",
	url : rootpath + "/chartStatus/dataColumnAccept.mvc",
	root : 'data',
	fields : ['PERIOD', 'COUNT', 'OUT']
};

var viewPort = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'center',
			border : false,
			xtype : 'charDataPanel'
		}],
		listeners : {
			afterrender : function() {
				//Ext.getCmp('mountOnlienPanelId').setActiveTab(0);
				mountColumnStore.load({
					params : Jinpeng.onlineColumn.MountColumnConfig,
					callback : function() {
						mountColumnStore.fireEvent('datachanged', mountColumnStore);
					}
				});
				setTimeout(function() {
					dataColumntStore.load({
						params : Jinpeng.onlineColumn.DataCulumnConfig,
						callback : function() {
							dataColumntStore.fireEvent('datachanged', dataColumntStore);
						}
					});
				}, 500);
				Ext.getCmp('mountGridPanel').store.load();
				Ext.getCmp('dataGridPanel').store.load();
			}
		}
	});
});

/**
 * @class Jinpeng.TabPanel 工作区标签页组件
 * north区域表单部份
 */
Jinpeng.onlineColumn.CharDataPanel = Ext.extend(Ext.Panel,{
	initComponent : function() {
		var leftWidth = 0;
		var rightWidth = 0;
		if (clickFlag == 'max') {
			leftWidth = 0.8;
			rightWidth = 0.2;
		} else {
			leftWidth = 0.6;
			rightWidth = 0.4;
		}
		var h = Ext.getBody().getHeight();
		var height = h / 2;
		Ext.apply(	this,{
			border : false,
			items : [ {
				items : [ {
					xtype : 'fieldset',
					title : '卡口在线状态柱状图',
					height : height - 15,
					items : [ {
						layout : 'column',
						items : [ {
							columnWidth : leftWidth,
							items : [ {
								xtype : 'mountOnlinePanel'
							}]
						}, {
							columnWidth : rightWidth,
							align : 'right',
							border : true,
							items : [ {
								xtype : 'mountColumnGridPanel'
							}]
						}],
						anchor : '100%'
					}]
				}, {
					xtype : 'fieldset',
					title : '数据接收状态柱状图',
					height : height,
					items : [ {
						layout : 'column',
						items : [ {
							columnWidth : leftWidth,
							items : [ {
								xtype : 'dataColumnPanel'
							}]
						}, {
							columnWidth : rightWidth,
							border : true,
							align : 'right',
							items : [ {
								xtype : 'dataColumnGridPanel'
							}]
						}],
						anchor : '100%'
					}]
				}]
			}/*,  {
				columnWidth : 0.5,
				xtype : 'panel',
				height : 300,
				items : [ {
					items : [ {
						xtype : 'dataColumnPanel'
					}]
				}]
			}*/]
		});
		Jinpeng.onlineColumn.CharDataPanel.superclass.initComponent.apply(this);
	},
	afterRender : function(ct, position) {
		Jinpeng.onlineColumn.CharDataPanel.superclass.afterRender.apply(this, arguments);
	}
});

//柱状图数据store
var mountColumnStore;

/**
 * 数据列表和柱状图Panel
 * @class Jinpeng.onlineColumn.GatherStatisticsPanel
 */
Jinpeng.onlineColumn.MountOnlienPanel = Ext.extend(Ext.Panel, {
	id : "mountOnlienPanelId",
	initComponent : function() {
		var _panel = this;
		var config = {
			items : [ {
				gridflag : 'culumn',
				layout:'fit',
				/*tbar : new Ext.Toolbar({
					items : [{
						xtype : 'form',
						id : 'chartCulumnForm',
						border : false,
						frame : true,
						layout : 'table',
						//cls : 'blue-button-ct',
						defaults : {
							layout : 'form',
							//统一宽度
							width : 200
						},
						layoutConfig : {
							columns : 4
						},
						items : [  {
							xtype : 'tbspacer',
							width : 50
						}, {
							xtype: 'radiogroup',
							id   : 'queckSearch',
						    name:'queckSearch',
						    width : 100,
							fieldLabel: "在线状态",
							anchor : '94%',
							items : [ {
								boxLabel : '在线',
								xtype : 'radio',
								inputValue : '1',
								checked : true,
								name : 'timeType'
							}, {
								boxLabel : '离线',
								xtype : 'radio',
								inputValue : '0',
								name : 'timeType'
							}],
							listeners  : {   
								change :  function( option, checked ) {
									var values = option.getValue().getGroupValue();
									_panel.mountQueryMethod(values);
								}
							}
						}]
					}]
				}),*/
				items :[{
					xtype : 'mountColumnChart',
					ref:"hChart",
					chartIDPrefix : "mountOnlineColumn",
					storeConfig : Jinpeng.onlineColumn.MountColumnConfig,
					id : 'mountOnlineColumnChart'
				}]

			}]
		};
		Ext.apply(this, config);
		Jinpeng.onlineColumn.MountOnlienPanel.superclass.initComponent.apply(this, arguments);
	},
	confimSearchData : function() {
		alert(Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'));
	},
	mountQueryMethod : function(values) {
		mountColumnStore.load({
			params : {
				'culumnOline' : values
			},
			callback : function() {
				mountColumnStore.fireEvent('datachanged', mountColumnStore);
			}
		});
	},
	afterRender : function() {
		Jinpeng.onlineColumn.MountOnlienPanel.superclass.afterRender.apply(this, arguments);
		this.items.each(function(item, index, length) {
		});
	}
});

//柱状图数据store
var dataColumntStore;

/**
 * 数据列表和柱状图Panel
 * @class Jinpeng.onlineColumn.GatherStatisticsPanel
 */
Jinpeng.onlineColumn.DataColumnPanel = Ext.extend(Ext.Panel, {
	id : "dataColumnPanelId",
	initComponent : function() {
		var _panel = this;
		var config = {
			items : [ {
				gridflag : 'culumn',
				layout:'fit',
				/*tbar : new Ext.Toolbar({
					items : [{
						xtype : 'form',
						id : 'chartCulumnForm',
						border : false,
						frame : true,
						layout : 'table',
						cls : 'blue-button-ct',
						defaults : {
							layout : 'form',
							//统一宽度
							width : 200
						},
						layoutConfig : {
							columns : 4
						},
						items : [  {
							xtype : 'tbspacer',
							width : 50
						}, {
							xtype: 'radiogroup',
							id   : 'queckSearch',
						    name:'queckSearch',
						    width : 100,
							fieldLabel: "在线状态",
							anchor : '94%',
							items : [ {
								boxLabel : '在线',
								xtype : 'radio',
								inputValue : '1',
								checked : true,
								name : 'timeType'
							}, {
								boxLabel : '离线',
								xtype : 'radio',
								inputValue : '0',
								name : 'timeType'
							}],
							listeners  : {   
								change :  function( option, checked ) {
									var values = option.getValue().getGroupValue();
									_panel.mountQueryMethod(values);
								}
							}
						}]
					}]
				}),*/
				items :[{
					xtype : 'dataColumnChart',
					ref:"hChart",
					chartIDPrefix : "dataAcceptColumn",
					storeConfig : Jinpeng.onlineColumn.DataCulumnConfig,
					id : 'dataAcceptColumnChart'
				}]

			}]
		};
		Ext.apply(this, config);
		Jinpeng.onlineColumn.DataColumnPanel.superclass.initComponent.apply(this, arguments);
	},
	confimSearchData : function() {
		alert(Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'));
	},
	mountQueryMethod : function(values) {
		dataColumntStore.load({
			params : {
				'culumnOline' : values
			},
			callback : function() {
				dataColumntStore.fireEvent('datachanged', dataColumntStore);
			}
		});
	},
	afterRender : function() {
		Jinpeng.onlineColumn.DataColumnPanel.superclass.afterRender.apply(this, arguments);
	}
});

var mountGridStrore = new Ext.data.JsonStore({
	url : rootpath+ "/chartStatus/mountColumnGridQuery.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	fields : [
          {name : 'PERIOD'},
          {name : 'COUNT_DESC'}
      ]
});

/**
 * 卡口在线状态--Grid
 */
Jinpeng.onlineColumn.MountColumnGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'mountGridPanel',
	width : 200,
	height : 26 * 9 - 5,
	border : true,
	scroll: true,
	frame : true,
	initComponent : function() {
		Ext.apply(this, {
			store :  mountGridStrore,
			colModel : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
		           {header : '单位名称', dataIndex : 'PERIOD', width : 60},
		           {header : '总量(在线)个', dataIndex : 'COUNT_DESC', width : 80}
	            ]
			})
		});
		Jinpeng.onlineColumn.MountColumnGridPanel.superclass.initComponent.apply(this);
	}
});

var dataGridStrore = new Ext.data.JsonStore({
	url : rootpath+ "/chartStatus/dataColumnGridQuery.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	fields : [
          {name : 'PERIOD'},
          {name : 'COUNT_DESC'}
      ]
});

/**
 * 数据接收状态--Grid
 */
Jinpeng.onlineColumn.DataColumnGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'dataGridPanel',
	width : 200,
	height : 26 * 9 - 5,
	border : true,
	scroll: true,
	frame : true,
	initComponent : function() {
		Ext.apply(this, {
			store :  dataGridStrore,
			colModel : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
		           {header : '单位名称', dataIndex : 'PERIOD', width : 60},
		           {header : '总量(正常)个', dataIndex : 'COUNT_DESC', width : 80}
	            ]
			})
		});
		Jinpeng.onlineColumn.DataColumnGridPanel.superclass.initComponent.apply(this);
	}
});

Ext.reg('dataColumnPanel', Jinpeng.onlineColumn.DataColumnPanel);
Ext.reg('mountOnlinePanel', Jinpeng.onlineColumn.MountOnlienPanel);
Ext.reg('charDataPanel', Jinpeng.onlineColumn.CharDataPanel);
Ext.reg('mountColumnGridPanel', Jinpeng.onlineColumn.MountColumnGridPanel);
Ext.reg('dataColumnGridPanel', Jinpeng.onlineColumn.DataColumnGridPanel);
