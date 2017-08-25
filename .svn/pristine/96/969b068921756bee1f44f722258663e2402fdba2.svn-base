/**
 * 数据接收率柱状图
 */
Ext.ns('Jinpeng.dataColumn');

/**
 * 图表配置,柱状图
 * @type
 */
Jinpeng.dataColumn.ChartCulumnConfig = {
	url : rootpath + "/dc/dataAcceptOnlyColumn.mvc",
	root : 'data',
	fields : ['PERIOD', 'COUNT', 'TOTAL']
};

var viewPort = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [ {
			region : 'center',
			border : false,
			xtype : 'dataColumnPanel'
		}],
		listeners : {
			afterrender : function() {
				//Ext.getCmp('dataColumnPanelId').setActiveTab(0);
				columnChartStore.load({
					params : Jinpeng.dataColumn.ChartCulumnConfig,
					callback : function() {
						columnChartStore.fireEvent('datachanged', columnChartStore);
					}
				});
			}
		}
	});
});

//柱状图数据store
var columnChartStore;

/**
 * 数据列表和柱状图Panel
 * @class Jinpeng.dataColumn.GatherStatisticsPanel
 */
Jinpeng.dataColumn.DataColumnPanel = Ext.extend(Ext.Panel, {
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
					xtype : 'myColumnChart',
					ref:"hChart",
					chartIDPrefix : "dataAcceptColumn",
					storeConfig : Jinpeng.dataColumn.ChartCulumnConfig,
					id : 'dataAcceptColumnChart'
				}]

			}]
		};
		Ext.apply(this, config);
		Jinpeng.dataColumn.DataColumnPanel.superclass.initComponent.apply(this, arguments);
	},
	confimSearchData : function() {
		alert(Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'));
	},
	mountQueryMethod : function(values) {
		columnChartStore.load({
			params : {
				'culumnOline' : values
			},
			callback : function() {
				columnChartStore.fireEvent('datachanged', columnChartStore);
			}
		});
	},
	afterRender : function() {
		Jinpeng.dataColumn.DataColumnPanel.superclass.afterRender.apply(this, arguments);
		this.items.each(function(item, index, length) {
		});
	}
});

Ext.reg('dataColumnPanel', Jinpeng.dataColumn.DataColumnPanel);
