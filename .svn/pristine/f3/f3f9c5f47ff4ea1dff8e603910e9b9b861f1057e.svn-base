/**
 * 卡口在线状态柱状图
 */
Ext.ns("Jinpeng.onlineColumn");

/**
 * 卡口在线状态,柱状图
 * @type
 */
Jinpeng.onlineColumn.MountColumnConfig = {
	//url : rootpath + "/mountOnline/mountStatusOnlyCulumn.mvc",
	url : rootpath + "/mountOnline/firstPageStatus.mvc",
	root : 'data',
	fields : ['PERIOD', 'COUNT', 'OUT', 'COUNT_DESC', 'DATA_NUMBER', 'PERCENTAGE']
};

/**
 * 卡口在线状态，趋势图
 * @type
 */
Jinpeng.onlineColumn.MountLineConfig = {
	url : rootpath + "/chartStatus/mountStatusLine.mvc",
	root : 'data',
	fields : ['PERIOD', 'COUNT', 'DWMC']
};

/**
 * 数据接收状态,柱状图
 * @type
 */
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
			xtype : 'charDataPanel',
        	autoScroll : true
		}],
		listeners : {
			afterrender : function() {
				//Ext.getCmp('mountOnlienPanelId').setActiveTab(0);
				mountColumnStore.load({
					params : Jinpeng.onlineColumn.MountColumnConfig,
					callback : function(pDatas) {
						if (pDatas != null && pDatas != 'undefined' && pDatas.length > 0) {
							var data= {"result":[{}],"totalCount":1,"success":true};
							var datas = [];
							for (var i = 0; i < pDatas.length; i++) {
								datas[i] = pDatas[i].data;
							}
							datas.sort(function(a,b){return a.DATA_NUMBER < b.DATA_NUMBER ? 1 : -1});//从大到小排序
							data.result = datas;
							Ext.getCmp('mountGridPanel').getStore().loadData(data, false);
						}
						mountColumnStore.fireEvent('datachanged', mountColumnStore);
					}
				});
				setTimeout(function() {
					mountChartStore.load({
						params : Jinpeng.onlineColumn.MountLineConfig,
						callback : function() {
							mountChartStore.fireEvent('datachanged', mountChartStore);
						}
					});
				}, 300);
				setTimeout(function() {
					dataColumntStore.load({
						params : Jinpeng.onlineColumn.DataCulumnConfig,
						callback : function() {
							dataColumntStore.fireEvent('datachanged', dataColumntStore);
						}
					});
				}, 500);
				//Ext.getCmp('mountGridPanel').store.load();
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
		var h = Ext.getBody().getHeight();
		var w = Ext.getBody().getWidth();
		var width = w - 38;
		Ext.apply(	this,{
			border : false,
			items : [ {
				items : [ {
					xtype : 'fieldset',
					title : '卡口在线状态柱状图',
					items : [ {
						layout : 'column',
						items : [ {
							columnWidth : 0.7,
							items : [ {
								xtype : 'mountOnlinePanel'
							}]
						}, {
							columnWidth : 0.3,
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
					title : '卡口在线状态趋势图',
					items : [ {
						layout : 'column',
						items : [ {
							columnWidth : 1.0,
							items : [ {
								xtype : 'mountLinePanel'
							}]
						}],
						anchor : '100%'
					}]
				}, {
					xtype : 'fieldset',
					title : '数据接收状态柱状图',
					items : [ {
						layout : 'column',
						items : [ {
							columnWidth : 0.7,
							items : [ {
								xtype : 'dataColumnPanel'
							}]
						}, {
							columnWidth : 0.3,
							border : true,
							align : 'right',
							items : [ {
								xtype : 'dataColumnGridPanel'
							}]
						}],
						anchor : '100%'
					}]
				}, {
					xtype : 'fieldset',
					title : '数据接收状态趋势图',
					items : [ {
						layout : 'column',
						items : [ {
							columnWidth : 1.0,
							items : [ {
								html : "<iframe src='" + rootpath + "/chartStatus/dataLineChat.mvc' width='100%' height='" + h + "' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
							}]
						}],
						anchor : '100%'
					}]
				}]
			}]
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

//线形图数据store
var mountChartStore;

/**
 * 卡口在线趋势图Panel
 * @class Jinpeng.onlineColumn.GatherStatisticsPanel
 */
Jinpeng.onlineColumn.MountOnlineLinePanel = Ext.extend(Ext.Panel, {
	id : "mountOnlineLinePanelId",
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
						id : 'chartLineForm',
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
									_panel.mountQueryMethod(param);
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
					storeConfig : Jinpeng.onlineColumn.MountLineConfig,
					id : 'mountOnlineLineChart'
				}
			} ]
		};
		Ext.apply(this, config);
		Jinpeng.onlineColumn.MountOnlineLinePanel.superclass.initComponent.apply(this, arguments);
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
		Jinpeng.onlineColumn.MountOnlineLinePanel.superclass.afterRender.apply(this, arguments);
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
          {name : 'COUNT_DESC'},
          {name : 'PERCENTAGE'}
      ]
});

/**
 * 卡口在线状态--Grid
 */
Jinpeng.onlineColumn.MountColumnGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'mountGridPanel',
	width : 300,
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
		           {header : '单位名称', dataIndex : 'PERIOD', width : 70},
		           {header : '总量(在线)个', dataIndex : 'COUNT_DESC', width : 80},
		           {header : '在线百分比', dataIndex : 'PERCENTAGE', width : 70}
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
          {name : 'COUNT_DESC'},
          {name : 'PERCENTAGE'}
      ]
});

/**
 * 数据接收状态--Grid
 */
Jinpeng.onlineColumn.DataColumnGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'dataGridPanel',
	width : 300,
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
		           {header : '单位名称', dataIndex : 'PERIOD', width : 70},
		           {header : '总量(正常)个', dataIndex : 'COUNT_DESC', width : 80},
		           {header : '正常百分比', dataIndex : 'PERCENTAGE', width : 70}
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
Ext.reg('mountLinePanel', Jinpeng.onlineColumn.MountOnlineLinePanel);
