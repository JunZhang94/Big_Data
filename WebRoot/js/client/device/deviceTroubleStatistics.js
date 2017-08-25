/**
 * 命名空间
 */
Ext.ns('Jinpeng.maintain');

var viewPort = null;
var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
var kwin1 =new Jinpeng.widget.GeneralWindow({
	id: "mywin1",
	title: "",
	constrain : true,
	constrainHeader : true,
	width: ww * 2 / 3,
	height: hh * 3 / 4,
	layout: "fit",
	//autoShow: true,
	closeAction:'hide',
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/Big_Data/zTree/demo/cn/excheck/multiSelectTreeGzsInc.html"></iframe>'
});

var setKKValue=function(data){
	//alert(data.org_type);
	var orgId;
	orgId = data.id;
	if(data.org_type == 2 ){
		orgId = (data.id).substring(3);
	}
	Ext.getCmp('deviceTroubleStatisticsForm').form.findField('orgId').setValue(orgId);
	//parseInt(data.org_type) 这里要转换一下，否则是字符串，后台controller取不到传递的参数
	Ext.getCmp('deviceTroubleStatisticsForm').form.findField('orgType').setValue(parseInt(data.org_type));
	Ext.getCmp('orgName').setValue(data.text);
	Ext.getCmp('mywin1').hide();
};
Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'north',
			height : 45,
			border : false,
			xtype : 'deviceTroubleStatisticsForm'
		}, {
			region : 'center',
			border : false,
			xtype : 'deviceTroubleStatisticsGrid'
		}]
	});
});

/**
 * 设备状态实时信息--Form
 */
Jinpeng.maintain.deviceTroubleStatisticsForm = Ext.extend(Ext.Panel, {
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
				Ext.getCmp('deviceTroubleStatisticsForm').form.findField('orgId').setValue(id);
				Ext.getCmp('deviceTroubleStatisticsForm').form.findField('orgType').setValue(orgType);
			}
		});
		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'deviceTroubleStatisticsForm',
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
					//items : [comboBoxTree]
					items : [ {
							xtype : 'compositefield',
							items : [ {
								flex : 0.5,
								fieldLabel : '组织结构',
								xtype : 'tooltiptextfield',
								disabled : true,
								name : 'orgName',
								id : 'orgName',
								width : 250,
								emptyText : '请选择...'
							}, {
								flex : 0.5,
								owner : this,
								labelAlign : 'right',
								xtype : 'button',
								text : '选择',
								id:'choosekkBtn',
								handler : function(){
									kwin1.show();
								}
							}]
					}]						
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
		Jinpeng.maintain.deviceTroubleStatisticsForm.superclass.initComponent.apply(this);
	},
	deviceCheck : function() {
		var form = Ext.getCmp('deviceTroubleStatisticsForm');
		if(form.getForm().isValid()) {
			var grid = Ext.getCmp('deviceTroubleStatisticsDataGrid');
			grid.store.baseParams = {};
			var baseparams = {
				'orgId' : Ext.getCmp('orgId').getValue(),
				'orgType' : Ext.getCmp('orgType').getValue()
			};
			grid.store.baseParams = baseparams;
			grid.store.load({
				params : {'page.start' : 0, 'page.limit' : Jinpeng.PageSize}
			});
		}
	}
});

/**
 * 设备运行状态--Grid
 */
Jinpeng.maintain.deviceTroubleStatisticsGrid = Ext.extend(Ext.grid.GridPanel, {
	id : 'deviceTroubleStatisticsDataGrid',
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var commuServerStore = new Ext.data.JsonStore({
			url : rootpath+ "/device/queryTroubleStatistics.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
		          {name : 'KKMC'},
		          {name : 'UN_NORMAL'},
		          {name : 'NORMAL'},
		          {name : 'KKBH'}
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
			           {header : '卡口编号', dataIndex : 'KKBH'},
			           {header : '卡口名称', dataIndex : 'KKMC'},
			           {header : '正常', dataIndex : 'NORMAL'},
			           {header : '故障', dataIndex : 'UN_NORMAL'}
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
		Jinpeng.maintain.deviceTroubleStatisticsGrid.superclass.initComponent.apply(this);
	}
});


Ext.reg('deviceTroubleStatisticsForm', Jinpeng.maintain.deviceTroubleStatisticsForm);
Ext.reg('deviceTroubleStatisticsGrid', Jinpeng.maintain.deviceTroubleStatisticsGrid);
