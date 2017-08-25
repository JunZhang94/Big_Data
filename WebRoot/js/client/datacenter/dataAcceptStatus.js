/**
 * 数据接收状态
 */
Ext.ns('Jinpeng.accept');

var viewPort = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'north',
			height : 45,
			border : false,
			xtype : 'acceptStatusForm'
		}, {
			region : 'center',
			border : false,
			xtype : 'acceptStatusGrid'
		}]
	});
	var dataFormPanel = new Jinpeng.accept.DataAcceptStatusFormPanel();
	setInterval(function() {
		dataFormPanel.deviceCheck();
	}, 120000);
});

/**
 * 数据状态接收Form
 */
Jinpeng.accept.DataAcceptStatusFormPanel = Ext.extend(Ext.Panel, {
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
			callback : function(id, text, coding, orgType) {
				Ext.getCmp('acceptStatusForm').form.findField('orgId').setValue(id);
				Ext.getCmp('acceptStatusForm').form.findField('orgType').setValue(orgType);
			}
		});
		
		var endTime = Date.parseDate(Ext.util.Format.date(
			new Date(), 'Y-m-d')
			+ " " + "23:59:59", 'Y-m-d H:i:s');
	
		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'acceptStatusForm',
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
				}]
			}]
		});
		Jinpeng.accept.DataAcceptStatusFormPanel.superclass.initComponent.apply(this);
	},
	deviceCheck : function() {
		var form = Ext.getCmp('acceptStatusForm');
		if(form.getForm().isValid()) {
			var grid = Ext.getCmp('acceptStatusGrid');
			grid.store.baseParams = {};
			var baseparams = {
				'orgId' : Ext.getCmp('orgId').getValue(),
				'orgType' : Ext.getCmp('orgType').getValue()
				//'startTime' : Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'),
				//'endTime' : Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d H:i:s'),
			};
			grid.store.baseParams = baseparams;
			grid.store.load({
				params : {'page.start' : 0, 'page.limit' : Jinpeng.PageSize}
			});
		}
	}
});

/**
 * 数据状态接收Grid
 */
Jinpeng.accept.DataAcceptStatusGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'acceptStatusGrid',
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var commuServerStore = new Ext.data.JsonStore({
			url : rootpath+ "/dc/dataRecieveStatus.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
		          {name : 'KKBH'},
		          {name : 'KKMC'},
		          {name : 'RECIEVER_IP'},
		          {name : 'STATUS'},
		          {name : 'END_TIME'}
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
		           {header : '最后接收时间', dataIndex : 'END_TIME', renderer : function(key) {
		        	   if (key == '') {
		        		   return '--'
		        	   } else {
		        		   return key.substring(0,key.indexOf("."));
		        	   }
				   }},
		           {header : '运行状态', dataIndex : 'STATUS', renderer : function(key) {
					   var value = '--';
		        	   if (key == '0') {
		        		   value = '<span style="color:red;">异常</span>';
		        	   }
	        		   if (key == '1') {
		        		   value = '<span style="color:green;">正常</span>';
		        	   }
	        		   if (key == '3') {
		        		   value = '<span style="color:#0909F7;">超时</span>';
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
		Jinpeng.accept.DataAcceptStatusGridPanel.superclass.initComponent.apply(this);
	}
});


Ext.reg('acceptStatusForm', Jinpeng.accept.DataAcceptStatusFormPanel);
Ext.reg('acceptStatusGrid', Jinpeng.accept.DataAcceptStatusGridPanel);
