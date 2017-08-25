/**
 * 命名空间，车辆频度统计
 */
Ext.ns('Jinpeng.carRate');

var viewPort = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'north',
			height : 45,
			border : false,
			xtype : 'carRateStatisticsForm'
		}, {
			region : 'center',
			border : false,
			xtype : 'carRateStatisticsGrid'
		}]
	});
});

/**
 * 车辆频度FORM
 */
Jinpeng.carRate.carRateStatisticsForm = Ext.extend(Ext.Panel, {
	initComponent : function() {
		var comboBoxTree = new Ext.ux.OrgComboBoxTree({
			fieldLabel : '组织结构',
			name : 'orgName',
			emptyText : '请选择...',
			blankText : '请选择组织结构',
			anchor : '95%',
			editable : false,
			treeUrl : '',
			dataType : 'device',
			callback : function(id, text, coding, orgType,parentId) {
				Ext.getCmp('carRateStatisticsForm').form.findField('orgId').setValue(id);
				Ext.getCmp('carRateStatisticsForm').form.findField('orgType').setValue(orgType);
				Ext.getCmp('carRateStatisticsForm').form.findField('parentOrgId').setValue(orgType);
			}
		});
		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'carRateStatisticsForm',
				border : false,
				frame : true,
				labelAlign : 'right',
				cls : 'blue-button-ct',
				
				layout : 'table',
				defaults : {
					width : 280,
					layout : 'form'
				},
				layoutConfig : {
					columns : 4
				},
				
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
					items : [comboBoxTree]
				},{
					items : [ {
						xtype : 'datetimefield',
						name : 'startTime',
						id : 'startdate',
						fieldLabel : '开始时间',
						editable : false,
						vtype: 'beginEndDate',
						endDateField : 'enddate',
						anchor : '94%'
					} ]
				},{
					items : [ {
						xtype : 'datetimefield',
						name : 'endTime',
						id : 'enddate',
						fieldLabel : '结束时间',
						editable : false,
						vtype: 'beginEndDate',
						startDateField : 'startdate',
						anchor : '94%'
					} ]
				}, {
					items : [{
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
						id : 'searchBut',
						handler : this.deviceCheck
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
				},{
					items : [{
						xtype : 'hidden',
						id : 'parentOrgId',
						name : 'parentOrgId'
					}]
				}]
			}]
		});
		Jinpeng.carRate.carRateStatisticsForm.superclass.initComponent.apply(this);
	},
	deviceCheck : function() {
		var form = Ext.getCmp('carRateStatisticsForm');
		if(form.getForm().isValid()) {
			var grid = Ext.getCmp('carRateStatisticsDataGrid');
			grid.store.baseParams = {};
			var baseparams = {
				'orgId' : Ext.getCmp('orgId').getValue(),
				'orgType' : Ext.getCmp('orgType').getValue(),
				'dept' : Ext.getCmp('parentOrgId').getValue(),
				'startTime' : Ext.getCmp('startdate').getValue(),
				'endTime' : Ext.getCmp('enddate').getValue()
			};
			grid.store.baseParams = baseparams;
			grid.store.load({
				params : {'page.start' : 0, 'page.limit' : Jinpeng.PageSize}
			});
		}
	}
});

/**
 * 车辆频度数据GRID
 */
Jinpeng.carRate.carRateStatisticsGrid = Ext.extend(Ext.grid.GridPanel, {
	id : 'carRateStatisticsDataGrid',
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var commuServerStore = new Ext.data.JsonStore({
			url : rootpath+ "/car/analyze/rate.mvc?search=true",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
		          {name : 'carNum'},
		          {name : 'carType'},
		          {name : 'passTimes'}
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
			           {header : '车牌号码', dataIndex : 'carNum'},
			           {header : '车辆类型', dataIndex : 'carType'},
			           {header : '经过次数', dataIndex : 'passTimes'}
	            ]
			}),
			listeners : {
				afterrender : function() {
					commuServerStore.load({
						params : {'page.start' : 0, 'page.limit' : this.pageSize}
					});
				}
			}
		});
		Jinpeng.carRate.carRateStatisticsGrid.superclass.initComponent.apply(this);
	}
});


Ext.reg('carRateStatisticsForm', Jinpeng.carRate.carRateStatisticsForm);
Ext.reg('carRateStatisticsGrid', Jinpeng.carRate.carRateStatisticsGrid);
