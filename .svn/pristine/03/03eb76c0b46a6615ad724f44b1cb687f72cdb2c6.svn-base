/**
 * 卡口在线统计
 */
Ext.ns('Jinpeng.mount');

var viewPort = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'north',
			height : 45,
			border : false,
			xtype : 'mountStatisticsForm'
		}, {
			region : 'center',
			border : false,
			xtype : 'mountStatisticsGrid'
		}]
	});
	var mountFormPanel = new Jinpeng.mount.MountOnlineStatisticsFormPanel();
	setInterval(function() {
		mountFormPanel.deviceCheck();
	}, 120000);
});

/**
 * 卡口在线统计Form
 */
Jinpeng.mount.MountOnlineStatisticsFormPanel = Ext.extend(Ext.Panel, {
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
				Ext.getCmp('mountOnlineStatisticsForm').form.findField('orgId').setValue(id);
				Ext.getCmp('mountOnlineStatisticsForm').form.findField('orgType').setValue(orgType);
			}
		});
		
		var endTime = Date.parseDate(Ext.util.Format.date(
			new Date(), 'Y-m-d')
			+ " " + "23:59:59", 'Y-m-d H:i:s');
	
		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'mountOnlineStatisticsForm',
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
		Jinpeng.mount.MountOnlineStatisticsFormPanel.superclass.initComponent.apply(this);
	},
	deviceCheck : function() {
		var form = Ext.getCmp('mountOnlineStatisticsForm');
		if(form.getForm().isValid()) {
			var grid = Ext.getCmp('mountOnlineStatisticsDataGrid');
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
 * 卡口在线统计Grid
 */
Jinpeng.mount.MountOnlineStatisticsGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'mountOnlineStatisticsDataGrid',
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var commuServerStore = new Ext.data.JsonStore({
			url : rootpath+ "/mountOnline/mountOnlineStatistics.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
		          {name : 'KKBH'},
		          {name : 'KKMC'},
		          {name : 'START_TIME'},
		          {name : 'END_TIME'},
		          {name : 'RECIEVE_COUNT'},
		          {name : 'RECIEVER_IP'},
		          {name : 'NON_HPHM_COUNT'},
		          {name : 'HPHM_COUNT'},
		          {name : 'ON_LINE_FLAG'}
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
		        	   if (key == '' || key == null) {
		        		   return '--'
		        	   } else {
		        		   return key.substring(0,key.indexOf("."));
		        	   }
				   }},
		           /*{header : '已识别数量', dataIndex : 'NON_HPHM_COUNT', renderer : function(key) {
		        	   if (key == '' || key == null) {
		        		   return '--'
		        	   } else {
		        		   return key; 
		        	   }
				   }},
		           {header : '未识别数量', dataIndex : 'HPHM_COUNT', renderer : function(key) {
		        	   if (key == '') {
		        		   return '--'
		        	   } else {
		        		   return key; 
		        	   }
				   }},
		           {header : '接收服务器IP', dataIndex : 'RECIEVER_IP', renderer : function(key) {
		        	   if (key == '') {
		        		   return '--'
		        	   } else {
		        		   return key; 
		        	   }
				   }},*/
		           {header : '在线状态', dataIndex : 'ON_LINE_FLAG', renderer : function(key) {
					   var value = '--';
		        	   if (key == '0') {
		        		   value = '<span style="color:red;">离线</span>';
		        	   } else if (key == '1') {
		        		   value = '<span style="color:green;">在线</span>';
		        	   } else {
		        		   value = key;
		        	   }
		        	   return value;
				   }}
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
		Jinpeng.mount.MountOnlineStatisticsGridPanel.superclass.initComponent.apply(this);
	}
});


Ext.reg('mountStatisticsForm', Jinpeng.mount.MountOnlineStatisticsFormPanel);
Ext.reg('mountStatisticsGrid', Jinpeng.mount.MountOnlineStatisticsGridPanel);
