/**
 * 数据接收率
 */
Ext.ns('Jinpeng.dataLine');

/**
 * 图表配置，曲线图
 * @type
 */
Jinpeng.dataLine.ChartLineConfig = {
	url : rootpath + "/dc/dataAcceptOnlyLine.mvc",
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
			xtype : 'dataAcceptPanel'
		}],
		listeners : {
			afterrender : function() {
				//var formPanel = new Jinpeng.dataLine.DataLineStatusFormPanel();
				//Ext.getCmp('dataAcceptPanelId').setActiveTab(0);
				lineChartStore.load({
					params : Jinpeng.dataLine.ChartLineConfig,
					callback : function() {
						lineChartStore.fireEvent('datachanged', lineChartStore);
					}
				});
			}
		}
	});
});

//线形图数据store
var lineChartStore;

/**
 * 数据列表和柱状图Panel
 * @class Jinpeng.dataLine.GatherStatisticsPanel
 */
Jinpeng.dataLine.DataLinePanel = Ext.extend(Ext.Panel, {
	id : "dataAcceptPanelId",
	initComponent : function() {
	
		var _panel = this;
		
		Jinpeng.dataLine.timeCombo = {
			xtype : 'combo',
			fieldLabel : '时间类型',
			name : 'timeType',
			id : 'timeType',
			width : 70,
			emptyText : '请选择...',
			editable : false,
			triggerAction : 'all',
			mode : "local",
			valueField : 'id',
			value : '1',
			displayField : 'text',
			store : new Ext.data.ArrayStore({
				fields : [ 'id', 'text' ],
				data : [ [ 1, '日' ], [ 2, '周' ], [ 3, '月' ], [ 4, '年' ]]
			}),
			listeners  : {   
				'select' :  function( option ) {
					//var values = Ext.getCmp('chartLineForm').form.findField('lineOline').inputValue;
					var orgId = Ext.getCmp('orgId').getValue();
					var orgType = Ext.getCmp('orgType').getValue();
					var timeType = Ext.getCmp('timeType').getValue();
					var param = {
						'culumnOline' : '1',
						'orgId' : orgId,
						'orgType' : orgType,
						'timeType' : timeType
					};
					_panel.mountQueryMethod(param);
				}
			}
		};
		
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
			},
			listeners  : {   
				'change' :  function( option ) {
					//var values = Ext.getCmp('chartLineForm').form.findField('lineOline').inputValue;
					var orgId = Ext.getCmp('orgId').getValue();
					var orgType = Ext.getCmp('orgType').getValue();
					var timeType = Ext.getCmp('timeType').getValue();
					var param = {
						'culumnOline' : '1',
						'orgId' : orgId,
						'orgType' : orgType,
						'timeType' : timeType
					};
					_panel.mountQueryMethod(param);
				}
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
							xtype : "label",
							text : "  时间类型："
						}, Jinpeng.dataLine.timeCombo, /*{
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
								name : 'lineOline'
							}, {
								boxLabel : '离线',
								xtype : 'radio',
								inputValue : '0',
								name : 'lineOline'
							}],
							listeners  : {   
								change :  function( option, checked ) {
									var values = option.getValue().getGroupValue();
									var orgId = Ext.getCmp('orgId').getValue();
									var orgType = Ext.getCmp('orgType').getValue();
									var timeType = Ext.getCmp('timeType').getValue();
									var param = {
										'culumnOline' : values,
										'orgId' : orgId,
										'orgType' : orgType,
										'timeType' : timeType
									};
									_panel.mountQueryMethod(param);
								}
							}
						},*/{
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
					xtype : 'myLineChart',
					ref:"hChart",
					chartIDPrefix : "dataAcceptLine",
					storeConfig : Jinpeng.dataLine.ChartLineConfig,
					id : 'dataAcceptLineChart'
				}
			} ]
		};
		Ext.apply(this, config);
		Jinpeng.dataLine.DataLinePanel.superclass.initComponent.apply(this, arguments);
	},
	confimSearchData : function() {
		alert(Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'));
	},
	mountQueryMethod : function(param) {
		lineChartStore.load({
			params : param,
			callback : function() {
				lineChartStore.fireEvent('datachanged', lineChartStore);
			}
		});
	},
	afterRender : function() {
		Jinpeng.dataLine.DataLinePanel.superclass.afterRender.apply(this, arguments);
		this.items.each(function(item, index, length) {
		});
	}
});

Ext.reg('dataAcceptPanel', Jinpeng.dataLine.DataLinePanel);
