/**
 * 卡口在线状态状态
 */
Ext.ns('Jinpeng.online');

/**
 * 图表配置,柱状图
 * @type
 */
Jinpeng.online.ChartCulumnConfig = {
	url : rootpath + "/mountOnline/mountOnlineChartCulumn.mvc",
	root : 'data',
	fields : ['PERIOD', 'COUNT']
};

/**
 * 图表配置，曲线图
 * @type
 */
Jinpeng.online.ChartLineConfig = {
	url : rootpath + "/mountOnline/mountOnlineTrendChar.mvc",
	root : 'data',
	fields : ['PERIOD', 'COUNT', 'DWMC']
};

Jinpeng.online.startTimeCulumn = {
	xtype : 'datetimefield',
	name : 'startTime_culumn',
	id : 'startdate_culumn',
	fieldLabel : '开始时间',
	editable : false,
	value : new Date().format('Y-m-d'),
	vtype: 'beginEndDate',
	endDateField : 'enddate_culumn',
	anchor : '94%',
	format:'Y-m-d'
};

Jinpeng.online.startTimeLine = {
		xtype : 'datetimefield',
		name : 'startTime_line',
		id : 'startdate_line',
		fieldLabel : '开始时间',
		editable : false,
		value : new Date().format('Y-m-d'),
		vtype: 'beginEndDate',
		endDateField : 'enddate_line',
		anchor : '94%',
		format:'Y-m-d'
	};

var endTime = Date.parseDate(Ext.util.Format.date(
	new Date(), 'Y-m-d')
	+ " " + "23:59:59", 'Y-m-d H:i:s');

Jinpeng.online.endTimeCulumn = {
	xtype : 'datetimefield',
	name : 'endTime_culumn',
	id : 'enddate_culumn',
	fieldLabel : '结束时间',
	editable : false,
	value : endTime,
	vtype: 'beginEndDate',
	startDateField : 'startdate_culumn',
	anchor : '94%',
	format:'Y-m-d'
};

Jinpeng.online.timeCombo = {
	xtype : 'combo',
	fieldLabel : '时间单位',
	name : 'timeType',
	id : 'timeType',
	width : 70,
	emptyText : '请选择...',
	editable : false,
	triggerAction : 'all',
	mode : "local",
	valueField : 'id',
	value : '11',
	displayField : 'text',
	store : new Ext.data.ArrayStore({
		fields : [ 'id', 'text' ],
		data : [ [ 1, '1月' ], [ 2, '2月' ], [ 3, '3月' ], [ 4, '4月' ], [ 5, '5月' ], [ 6, '6月' ], [ 7, '7月' ], [ 8, '8月' ]
		       , [ 9, '9月' ], [ 10, '10月' ], [ 11, '11月' ], [ 12, '12月' ]]
	})
};

var viewPort = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'north',
			height : 45,
			border : false,
			xtype : 'mountOnlineForm'
		}, {
			region : 'center',
			border : false,
			xtype : 'mountOnlineTabPanel'
		}],
		listeners : {
			afterrender : function() {
				Ext.getCmp('mountOnlienTabPanelId').setActiveTab(0);
				commuServerStore.load();
				columnChartStore.load({
					params : Jinpeng.online.DafaultParam
				});
				lineChartStore.load({
					params : Jinpeng.online.DafaultParam
				});
			}
		}
	});
	var formPanel = new Jinpeng.online.MountOnlienStatusFormPanel();
	setInterval(function() {
		formPanel.onlineSearch();
	}, 300000);
});

/**
 * 数据状态接收Form
 */
Jinpeng.online.MountOnlienStatusFormPanel = Ext.extend(Ext.Panel, {
	initComponent : function() {
		var comboBoxTree = new Ext.ux.OrgComboBoxTree({
			fieldLabel : '组织结构',
			name : 'orgName',
			emptyText : '请选择...',
			blankText : '请选择组织结构',
			anchor : '95%',
			editable : false,
			treeUrl : '',
			dataType : 'control',
			callback : function(id, text, coding, orgType) {
				Ext.getCmp('mountOnlineForm').form.findField('orgId').setValue(id);
				Ext.getCmp('mountOnlineForm').form.findField('orgType').setValue(orgType);
			}
		});
		
		var endTime = Date.parseDate(Ext.util.Format.date(
			new Date(), 'Y-m-d')
			+ " " + "23:59:59", 'Y-m-d H:i:s');
	
		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'mountOnlineForm',
				border : false,
				frame : true,
				labelAlign : 'right',
				cls : 'blue-button-ct',
				
				layout : 'table',
				defaults : {
					width : 500,
					layout : 'form'
				},
				layoutConfig : {
					columns : 4
				},
				
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
					items : [comboBoxTree]
				}, {
					items : [{
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
						id : 'searchBut',
						handler : this.onlineSearch,
						scope : this
					}]
				},{
					items : [{
						xtype : 'hidden',
						id : 'orgId',
						name : 'orgId'
					}]
				},{
					items : [{
						xtype : 'hidden',
						id : 'orgType',
						name : 'orgType'
					}]
				}]
			}]
		});
		Jinpeng.online.MountOnlienStatusFormPanel.superclass.initComponent.apply(this);
	},
	onlineSearch : function() {
		var form = Ext.getCmp('mountOnlineForm');
		if(form.getForm().isValid()) {
			var grid = Ext.getCmp('mountOnlineGrid');
			//alert(Ext.getCmp('chartLineForm').form.findField('timeType').getValue());
			//alert(Ext.getCmp('chartCulumnForm').form.findField('culumnOline').getValue() ? 1 : 0);
			//alert(Ext.util.Format.date(Ext.getCmp('startdate_culumn').getValue(),'Y-m-d H:i:s'));
			var stores = [ commuServerStore, columnChartStore, lineChartStore ];
			var queryFlag = Ext.getCmp('mountOnlienTabPanelId').getActiveTab().gridflag;
			if (queryFlag == 'culumn' || queryFlag == 'line') {
				this.setChartStoreBaseParam(stores);
			} else {
				this.setDefaultStoreBaseParam(stores);
			}
			var tabPanel = Ext.getCmp('gatherStatisticsTabPanelId');
			Ext.each([columnChartStore, lineChartStore], function(obj, index) {
				obj.load({
					params : {
						'page.start' : 0,
						'page.limit' : 10
					},
					callback : function() {
						obj.fireEvent('datachanged', obj);
					}
				});
			});
			commuServerStore.load({
				params : {
					'page.start' : 0,
					'page.limit' : Jinpeng.PageSize
				}
			});
			/*grid.store.baseParams = {};
			var baseparams = {
				'orgId' : Ext.getCmp('orgId').getValue(),
				'orgType' : Ext.getCmp('orgType').getValue()
				//'startTime' : Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'),
				//'endTime' : Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d H:i:s'),
			};*/
			/*grid.store.baseParams = baseparams;
			grid.store.load({
				params : {'page.start' : 0, 'page.limit' : Jinpeng.PageSize}
			});*/
		}
	},
	/**
	 * 设置store的所需要的参数
	 * @param {} stores
	 */
	setDefaultStoreBaseParam : function(stores) {
		for ( var i = 0; i < stores.length; i++) {
			stores[i].baseParams = {};
			stores[i].baseParams["orgId"] = Ext.getCmp('orgId').getValue();
			stores[i].baseParams["orgType"] = Ext.getCmp('orgType').getValue();
			stores[i].baseParams["startTime"] = Ext.util.Format.date(Date.parseDate(Ext.util.Format.date(
					new Date(), 'Y-m-d')
					+ " " + "00:00:00", 'Y-m-d H:i:s'),'Y-m-d H:i:s');
			stores[i].baseParams["endTime"] = Ext.util.Format.date(endTime,'Y-m-d H:i:s');
			stores[i].baseParams["culumnOline"] = 1;
			stores[i].baseParams["lineOline"] = 1;
		}
	},
	/**
	 * 设置store的所需要的参数
	 * @param {} stores
	 */
	setChartStoreBaseParam : function(stores) {
		for ( var i = 0; i < stores.length; i++) {
			stores[i].baseParams = {};
			stores[i].baseParams["orgId"] = Ext.getCmp('orgId').getValue();
			stores[i].baseParams["orgType"] = Ext.getCmp('orgType').getValue();
			stores[i].baseParams["startTime_culumn"] = Ext.util.Format.date(Ext.getCmp('startdate_culumn').getValue(),'Y-m-d H:i:s');
			stores[i].baseParams["endTime_culumn"] = Ext.util.Format.date(Ext.getCmp('enddate_culumn').getValue(),'Y-m-d H:i:s');
			//stores[i].baseParams["startTime_line"] = Ext.util.Format.date(Ext.getCmp('startdate_line').getValue(),'Y-m-d H:i:s');
			//stores[i].baseParams["endTime_line"] = Ext.util.Format.date(Ext.getCmp('enddate_line').getValue(),'Y-m-d H:i:s');
			stores[i].baseParams["culumnOline"] = Ext.getCmp('chartCulumnForm').form.findField('culumnOline').getValue() ? 1 : 0;
			stores[i].baseParams["lineOline"] = Ext.getCmp('chartLineForm').form.findField('lineOline').getValue() ? 1 : 0;
			stores[i].baseParams["timeType"] = Ext.getCmp('chartLineForm').form.findField('timeType').getValue();
			stores[i].baseParams["query"] = 'chart';
		}
	}
});

var commuServerStore;

/**
 * 数据状态接收Grid
 */
Jinpeng.online.MountOnlienStatusGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'mountOnlineGrid',
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		commuServerStore = new Ext.data.JsonStore({
			url : rootpath+ "/mountOnline/mountOnlienStatus.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
		          {name : 'KKBH'},
		          {name : 'KKMC'},
		          {name : 'ONLINE_STATUS'},
		          {name : 'JGSJ'}
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
		           //sm,
		           {header : '卡口名称', dataIndex : 'KKMC', renderer : function(key) {
		        	   if (key == '' || key == null) {
		        		   return '--'
		        	   } else {
		        		   return key; 
		        	   }
				   }},
		           {header : '最后经过时间', dataIndex : 'JGSJ', renderer : function(key) {
		        	   if (key == '' || key == 'null' || key == null) {
		        		   return '--'
		        	   } else {
		        		   return key.substring(0,key.indexOf("."));
		        	   }
				   }},
		           {header : '在线状态', dataIndex : 'ONLINE_STATUS', renderer : function(key) {
					   var value = '--';
		        	   if (key == '0' || key == 0) {
		        		   value = '<span style="color:red;">离线</span>';
		        	   }else if (key == '1' || key == 1) {
		        		   value = '<span style="color:green;">在线</span>';
		        	   } else {
		        		   value = key;
		        	   }
		        	   return value;
				   }}
	            ]
			}),
			viewConfig  : {
				getRowClass : function(record){
		 			if ('3' == record.data.STATUS) {
		 				return 'x-grid-record-yellow';
		 			} else {
		 				record.data.STATUS;
		 			}
				}
			},
			listeners : {
				afterrender : function() {
					commuServerStore.load({
						params : {'page.start' : 0, 'page.limit' : this.pageSize}
					});
				}
			}
		});
		Jinpeng.online.MountOnlienStatusGridPanel.superclass.initComponent.apply(this);
	}
});

//柱状图数据store
var columnChartStore;

//线形图数据store
var lineChartStore;

/**
 * 数据列表和柱状图TabPanel
 * @class Jinpeng.online.GatherStatisticsTabPanel
 */
Jinpeng.online.MountOnlienTabPanel = Ext.extend(Ext.TabPanel, {
	id : "mountOnlienTabPanelId",
	initComponent : function() {
		var config = {
			items : [ {
				title : '实时在线状态',
				xtype : 'mountOnlineGrid'

			}, {
				title : '历史在线状态统计图',
				gridflag : 'culumn',
				layout:'fit',
				listeners : {
					activate : this.handleActivate
				},
				tbar : new Ext.Toolbar({
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
							columns : 8
						},
						items : [  {
							xtype : 'tbspacer',
							width : 50
						}, {
							xtype : "label",
							text : "  时间："
						}, Jinpeng.online.startTimeCulumn, {
							xtype : "label",
							text : "  至："
						}, Jinpeng.online.endTimeCulumn, {
							boxLabel : '在线',
							xtype : 'radio',
							inputValue : '1',
							width : 50,
							name : 'culumnOline',
							checked : true
						}, {
							boxLabel : '离线',
							xtype : 'radio',
							width : 50,
							inputValue : '0',
							name : 'culumnOline'
						}]
					}]
				}),
				items :[{
					xtype : 'myColumnChart',
					ref:"hChart",
					chartIDPrefix : "mountOnlineColumn",
					storeConfig : Jinpeng.online.ChartCulumnConfig,
					id : 'mountOnlineColumnChart'
				}]

			}, {
				title : '历史在线状态趋势图',
				gridflag : 'line',
				layout:'fit',
				listeners : {
					activate : this.handleActivate
				},
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
						}, {
							xtype : "label",
							text : "  时间："
						}, Jinpeng.online.timeCombo, {
							boxLabel : '在线',
							xtype : 'radio',
							inputValue : '1',
							width : 50,
							name : 'lineOline',
							checked : true
						}, {
							boxLabel : '离线',
							xtype : 'radio',
							width : 50,
							inputValue : '0',
							name : 'lineOline'
						}]
					}]
				}),
				items : {
					xtype : 'myLineChart',
					ref:"hChart",
					chartIDPrefix : "mountOnlineLine",
					storeConfig : Jinpeng.online.ChartLineConfig,
					id : 'mountOnlineLineChart'
				}
			} ]
		};
		Ext.apply(this, config);
		Jinpeng.online.MountOnlienTabPanel.superclass.initComponent.apply(this, arguments);
	},
	confimSearchData : function() {
		alert(Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'));
	},
	/**
	 * 切换事件处理
	 * @param tab
	 * @return Boolean
	 */
	handleActivate : function(tab) {
		try{
			var chartStore = tab.hChart.store;
			chartStore.fireEvent('datachanged', chartStore);
		}catch(e){}
	},
	afterRender : function() {
		Jinpeng.online.MountOnlienTabPanel.superclass.afterRender.apply(this, arguments);
		this.items.each(function(item, index, length) {
		});
	}
});

Ext.reg('mountOnlineTabPanel', Jinpeng.online.MountOnlienTabPanel);
Ext.reg('mountOnlineForm', Jinpeng.online.MountOnlienStatusFormPanel);
Ext.reg('mountOnlineGrid', Jinpeng.online.MountOnlienStatusGridPanel);
