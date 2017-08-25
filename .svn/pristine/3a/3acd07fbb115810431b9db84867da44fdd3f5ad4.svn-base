/**
 * 卡口在线状态状态
 */
Ext.ns('Jinpeng.onlineLine');

/**
 * 图表配置，曲线图
 * @type
 */
Jinpeng.onlineLine.MountLineConfig = {
	url : rootpath + "/chartStatus/mountStatusLine.mvc",
	root : 'data',
	fields : ['PERIOD', 'COUNT', 'DWMC']
};

/**
 * 图表配置，曲线图
 * @type
 */
Jinpeng.onlineLine.DataLineConfig = {
	url : rootpath + "/chartStatus/dataAcceptLine.mvc",
	root : 'data',
	fields : ['PERIOD', 'COUNT', 'DWMC']
};

var viewPort = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		 height:300,
        width:600,
		items : [ {
			region : 'center',
			border : false,
			xtype : 'charDataPanel'
		}],
		listeners : {
			afterrender : function() {
				setTimeout(function() {
					mountChartStore.load({
						params : Jinpeng.onlineLine.MountLineConfig,
						callback : function() {
							mountChartStore.fireEvent('datachanged', mountChartStore);
						}
					});
				}, 300);
				setTimeout(function() {
					dataChartStore.load({
						params : Jinpeng.onlineLine.DataLineConfig,
						callback : function() {
							dataChartStore.fireEvent('datachanged', dataChartStore);
						}
					});
				}, 700);
				/*Ext.getCmp('mountGridPanel').store.load();
				Ext.getCmp('dataGridPanel').store.load();*/
			}
		}
	});
});

/**
 * @class Jinpeng.TabPanel 工作区标签页组件
 * north区域表单部份
 */
Jinpeng.onlineLine.CharDataPanel = Ext.extend(Ext.Panel,{
	initComponent : function() {
		var leftWidth = 0;
		if (clickFlag == 'max') {
			leftWidth = 1.0;
		} else {
			leftWidth = 0.9;
		}
		var h = Ext.getBody().getHeight();
		var height = h / 2;
		/** 设定参数 */
		Ext.apply(	this,{
			border : false,
			items : [ {
				items : [ {
					xtype : 'fieldset',
					title : '卡口在线状态趋势图',
					height : height - 15,
					items : [ {
						layout : 'column',
						items : [ {
							columnWidth : leftWidth,
							items : [ {
								xtype : 'mountOnlinePanel'
							}]
						}/*, {
							columnWidth : 0.2,
							border : true,
							items : [ {
								xtype : 'mountLineGridPanel'
							}]
						}*/],
						anchor : '100%'
					}]
				}, {
					xtype : 'fieldset',
					title : '数据接收状态趋势图',
					height : height,
					items : [ {
						layout : 'column',
						items : [ {
							columnWidth : leftWidth,
							items : [ {
								xtype : 'dataAcceptPanel'
							}]
						}/*, {
							columnWidth : 0.2,
							border : true,
							items : [ {
								xtype : 'dataLineGridPanel'
							}]
						}*/],
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
		Jinpeng.onlineLine.CharDataPanel.superclass.initComponent.apply(this);
	},
	afterRender : function(ct, position) {
		Jinpeng.onlineLine.CharDataPanel.superclass.afterRender.apply(this, arguments);
	}
});

//线形图数据store
var mountChartStore;

/**
 * 数据列表和柱状图Panel
 * @class Jinpeng.onlineLine.GatherStatisticsPanel
 */
Jinpeng.onlineLine.MountOnlienPanel = Ext.extend(Ext.Panel, {
	id : "mountOnlienPanelId",
	initComponent : function() {
		var _panel = this;
		
		var comboBoxTree = new Ext.ux.OrgComboBoxTree({
			fieldLabel : '组织结构',
			name : 'orgName',
			emptyText : '请选择...',
			blankText : '请选择组织结构',
			anchor : '95%',
			editable : false,
			treeUrl : '',
			value : '广州市',
			dataType : 'control',
			callback : function(id, text, coding, orgType) {
				Ext.getCmp('chartLineForm').form.findField('orgId').setValue(id);
				Ext.getCmp('chartLineForm').form.findField('orgType').setValue(orgType);
				
				var orgId = Ext.getCmp('orgId').getValue();
				var orgType = Ext.getCmp('orgType').getValue();
				var timeType = Ext.getCmp('queckSearch').getValue().getGroupValue();
				var param = {
					'culumnOline' : '1',
					'orgId' : orgId,
					'orgType' : orgType,
					'timeType' : timeType
				};
				setTimeout(function() {
					_panel.mountQueryMethod(param);
				}, 300);
				setTimeout(function() {
					Ext.getCmp('dataAcceptPanelId').mountQueryMethod(param);
				}, 700);
				/*Ext.getCmp('mountGridPanel').store.load({
					params : param
				});
				Ext.getCmp('dataGridPanel').store.load({
					params : param
				});*/
			}
		});
		
		var config = {
			items : [ {
				gridflag : 'line',
				layout:'fit',
				tbar : new Ext.Toolbar({
					items : [{
						xtype : 'form',
						id : 'chartLineForm',
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
							columns : 8
						},
						items : [  {
							xtype : 'tbspacer',
							width : 50
						}, comboBoxTree, {
							xtype: 'radiogroup',
							id : 'queckSearch',
						    name:'queckSearch',
							fieldLabel: "时间类型",
							width : 200,
							anchor : '94%',
							items : [ {
								boxLabel : '日',
								xtype : 'radio',
								inputValue : '1',
								checked : true,
								name : 'timeType'
							}, {
								boxLabel : '周',
								xtype : 'radio',
								inputValue : '2',
								name : 'timeType'
							}, {
								boxLabel : '月',
								xtype : 'radio',
								inputValue : '3',
								name : 'timeType'
							}],
							listeners  : {   
								change :  function( option, checked ) {
									var orgId = Ext.getCmp('orgId').getValue();
									var orgType = Ext.getCmp('orgType').getValue();
									var timeType = Ext.getCmp('queckSearch').getValue().getGroupValue();
									var param = {
										'culumnOline' : '1',
										'orgId' : orgId,
										'orgType' : orgType,
										'timeType' : timeType
									};
									setTimeout(function() {
										_panel.mountQueryMethod(param);
									}, 300);
									setTimeout(function() {
										Ext.getCmp('dataAcceptPanelId').mountQueryMethod(param);
									}, 700);
									/*Ext.getCmp('mountGridPanel').store.load({
										params : param
									});
									Ext.getCmp('dataGridPanel').store.load({
										params : param
									});*/
								}
							}
						},{
							xtype : 'hidden',
							id : 'orgId',
							name : 'orgId'
						},{
							xtype : 'hidden',
							id : 'orgType',
							name : 'orgType'
						}]
					}]
				}),
				items : {
					xtype : 'mountLineChart',
					ref:"hChart",
					chartIDPrefix : "mountOnlineLine",
					storeConfig : Jinpeng.onlineLine.MountLineConfig,
					id : 'mountOnlineLineChart'
				}
			} ]
		};
		Ext.apply(this, config);
		Jinpeng.onlineLine.MountOnlienPanel.superclass.initComponent.apply(this, arguments);
	},
	confimSearchData : function() {
		alert(Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'));
	},
	mountQueryMethod : function(param) {
		mountChartStore.load({
			params : param,
			callback : function() {
				mountChartStore.fireEvent('datachanged', mountChartStore);
			}
		});
	},
	afterRender : function() {
		Jinpeng.onlineLine.MountOnlienPanel.superclass.afterRender.apply(this, arguments);
		this.items.each(function(item, index, length) {
		});
	}
});

//线形图数据store
var dataChartStore;

/**
 * 数据列表和柱状图Panel
 * @class Jinpeng.onlineLine.GatherStatisticsPanel
 */
Jinpeng.onlineLine.DataLinePanel = Ext.extend(Ext.Panel, {
	id : "dataAcceptPanelId",
	initComponent : function() {
	
		var config = {
			items : [ {
				gridflag : 'line',
				layout:'fit',
				items : {
					xtype : 'dataLineChart',
					ref:"hChart",
					chartIDPrefix : "dataAcceptLine",
					storeConfig : Jinpeng.onlineLine.DataLineConfig,
					id : 'dataAcceptLineChart'
				}
			} ]
		};
		Ext.apply(this, config);
		Jinpeng.onlineLine.DataLinePanel.superclass.initComponent.apply(this, arguments);
	},
	confimSearchData : function() {
		alert(Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'));
	},
	mountQueryMethod : function(param) {
		dataChartStore.load({
			params : param,
			callback : function() {
				dataChartStore.fireEvent('datachanged', dataChartStore);
			}
		});
	},
	afterRender : function() {
		Jinpeng.onlineLine.DataLinePanel.superclass.afterRender.apply(this, arguments);
		this.items.each(function(item, index, length) {
		});
	}
});

var mountGridStrore = new Ext.data.JsonStore({
	url : rootpath+ "/mountOnline/mountTrendChartQuery.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	fields : [
          {name : 'PERIOD'},
          {name : 'PERCENTAGE'}
      ]
});

/**
 * 卡口在线状态--Grid
 */
Jinpeng.onlineLine.MountLineGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'mountGridPanel',
	width : 200,
	height : Ext.getBody().getHeight() / 2 - 50,
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
		           {header : '时间', dataIndex : 'PERIOD', width : 60},
		           {header : '在线率', dataIndex : 'PERCENTAGE', width : 80}
	            ]
			})
		});
		Jinpeng.onlineLine.MountLineGridPanel.superclass.initComponent.apply(this);
	}
});

var dataGridStrore = new Ext.data.JsonStore({
	url : rootpath+ "/dc/dataTrendChartQuery.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	fields : [
          {name : 'PERIOD'},
          {name : 'PERCENTAGE'}
      ]
});

/**
 * 数据接收状态--Grid
 */
Jinpeng.onlineLine.DataLineGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'dataGridPanel',
	width : 200,
	height : Ext.getBody().getHeight() / 2 - 45,
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
		           {header : '时间', dataIndex : 'PERIOD', width : 60},
		           {header : '接收率', dataIndex : 'PERCENTAGE', width : 80}
	            ]
			})
		});
		Jinpeng.onlineLine.DataLineGridPanel.superclass.initComponent.apply(this);
	}
});

Ext.reg('dataAcceptPanel', Jinpeng.onlineLine.DataLinePanel);
Ext.reg('mountOnlinePanel', Jinpeng.onlineLine.MountOnlienPanel);
Ext.reg('charDataPanel', Jinpeng.onlineLine.CharDataPanel);
Ext.reg('mountLineGridPanel', Jinpeng.onlineLine.MountLineGridPanel);
Ext.reg('dataLineGridPanel', Jinpeng.onlineLine.DataLineGridPanel);