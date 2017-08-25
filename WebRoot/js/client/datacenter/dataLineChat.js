/**
 * 卡口在线状态趋势图
 */
Ext.ns("Jinpeng.lineStatus");

/**
 * 数据接收状态,趋势图
 * @type
 */
Jinpeng.lineStatus.DataLineConfig = {
	url : rootpath + "/chartStatus/dataAcceptLine.mvc",
	root : 'data',
	fields : ['PERIOD', 'COUNT', 'DWMC']
};

var viewPort = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'center',
			border : false,
			xtype : 'charDataPanel',
        	autoScroll : true
		}],
		listeners : {
			afterrender : function() {
				setTimeout(function() {
					dataChartStore.load({
						params : Jinpeng.lineStatus.DataLineConfig,
						callback : function() {
							dataChartStore.fireEvent('datachanged', dataChartStore);
						}
					});
				}, 700);
			}
		}
	});
});

/**
 * @class Jinpeng.TabPanel 工作区标签页组件
 * north区域表单部份
 */
Jinpeng.lineStatus.CharDataPanel = Ext.extend(Ext.Panel,{
	initComponent : function() {
		var h = Ext.getBody().getHeight();
		var w = Ext.getBody().getWidth();
		Ext.apply(	this,{
			border : false,
			items : [ {
				items : [ {
					layout : 'column',
					items : [ {
						columnWidth : 1.0,
						items : [ {
							xtype : 'dataLinePanel'
						}]
					}],
					anchor : '100%'
				}]
			}]
		});
		Jinpeng.lineStatus.CharDataPanel.superclass.initComponent.apply(this);
	},
	afterRender : function(ct, position) {
		Jinpeng.lineStatus.CharDataPanel.superclass.afterRender.apply(this, arguments);
	}
});

//线形图数据store
var dataChartStore;

/**
 * 数据接收状态趋势图Panel
 * @class Jinpeng.lineStatus.GatherStatisticsPanel
 */
Jinpeng.lineStatus.DataLinePanel = Ext.extend(Ext.Panel, {
	id : "dataAcceptPanelId",
	initComponent : function() {
		var _panel = this;
		var comboBoxTree = new Ext.ux.OrgComboBoxTree({
			fieldLabel : '组织结构',
			name : 'orgName',
			hiddenName : 'orgNameId',
			emptyText : '请选择...',
			blankText : '请选择组织结构',
			anchor : '95%',
			editable : false,
			treeUrl : '',
			value : '广州市',
			dataType : 'control',
			callback : function(id, text, coding, orgType) {
				Ext.getCmp('dataLineForm').form.findField('orgIdLine').setValue(id);
				Ext.getCmp('dataLineForm').form.findField('orgTypeLine').setValue(orgType);
				
				var orgId = Ext.getCmp('orgIdLine').getValue();
				var orgType = Ext.getCmp('orgTypeLine').getValue();
				var timeType = Ext.getCmp('queckLineSearch').getValue().getGroupValue();
				var param = {
					'culumnOline' : '1',
					'orgId' : orgId,
					'orgType' : orgType,
					'timeType' : timeType
				};
				_panel.mountQueryMethod(param);
			}
		});
		var config = {
			items : [ {
				gridflag : 'line',
				layout:'fit',
				tbar : new Ext.Toolbar({
					items : [{
						xtype : 'form',
						id : 'dataLineForm',
						border : false,
						frame : true,
						layout : 'table',
						cls : 'blue-button-ct',
						defaults : {
							layout : 'form',
							//统一宽度
							width : 230
						},
						layoutConfig : {
							columns : 8
						},
						items : [  {
							xtype : 'tbspacer',
							width : 50
						}, comboBoxTree, {
							xtype: 'radiogroup',
							id : 'queckLineSearch',
						    name:'queckLineSearch',
							fieldLabel: "时间类型",
							width : 200,
							anchor : '94%',
							items : [ {
								boxLabel : '日',
								xtype : 'radio',
								inputValue : '1',
								checked : true,
								name : 'timeTypeLine'
							}, {
								boxLabel : '周',
								xtype : 'radio',
								inputValue : '2',
								name : 'timeTypeLine'
							}, {
								boxLabel : '月',
								xtype : 'radio',
								inputValue : '3',
								name : 'timeTypeLine'
							}],
							listeners  : {   
								change :  function( option, checked ) {
									var orgId = Ext.getCmp('orgIdLine').getValue();
									var orgType = Ext.getCmp('orgTypeLine').getValue();
									var timeType = Ext.getCmp('queckLineSearch').getValue().getGroupValue();
									var param = {
										'culumnOline' : '1',
										'orgId' : orgId,
										'orgType' : orgType,
										'timeType' : timeType
									};
									_panel.mountQueryMethod(param);
								}
							}
						},{
							xtype : 'hidden',
							id : 'orgIdLine',
							name : 'orgIdLine'
						},{
							xtype : 'hidden',
							id : 'orgTypeLine',
							name : 'orgTypeLine'
						}]
					}]
				}),
				items : {
					xtype : 'dataLineChart',
					ref:"hChart",
					chartIDPrefix : "dataAcceptLine",
					storeConfig : Jinpeng.lineStatus.DataLineConfig,
					id : 'dataAcceptLineChart'
				}
			} ]
		};
		Ext.apply(this, config);
		Jinpeng.lineStatus.DataLinePanel.superclass.initComponent.apply(this, arguments);
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
		Jinpeng.lineStatus.DataLinePanel.superclass.afterRender.apply(this, arguments);
		this.items.each(function(item, index, length) {
		});
	}
});

Ext.reg('charDataPanel', Jinpeng.lineStatus.CharDataPanel);
Ext.reg('dataLinePanel', Jinpeng.lineStatus.DataLinePanel);
