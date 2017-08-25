/**
 * 数据上传及时率,按部门分组展示
 */
Ext.ns('Jinpeng.dataTimely');

var viewPort = null;
var setKKValue=function(data){
	//alert(data.org_type);
	var orgId;
	orgId = data.id;
	if(data.org_type == 2 ){
		orgId = (data.id).substring(3);
	}
	Ext.getCmp('dataTimelyForm').form.findField('orgId').setValue(orgId);
	//parseInt(data.org_type) 这里要转换一下，否则是字符串，后台controller取不到传递的参数
	Ext.getCmp('dataTimelyForm').form.findField('orgType').setValue(parseInt(data.org_type));
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
			xtype : 'dataTimelyForm'
		}, {
			region : 'center',
			border : false,
			xtype : 'dataTimelyGrid'
		}]
	});
});

/**
 * 数据上传及时率Form
 */
Jinpeng.dataTimely.DataTimelyFormPanel = Ext.extend(Ext.Panel, {
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
				Ext.getCmp('dataTimelyForm').form.findField('orgId').setValue(id);
				Ext.getCmp('dataTimelyForm').form.findField('orgType').setValue(orgType);
			}
		});
		
		var endTime = Date.parseDate(Ext.util.Format.date(
			new Date(), 'Y-m-d')
			+ " " + "23:59:59", 'Y-m-d H:i:s');
	
		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'dataTimelyForm',
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
		Jinpeng.dataTimely.DataTimelyFormPanel.superclass.initComponent.apply(this);
	},
	deviceCheck : function() {
		var form = Ext.getCmp('dataTimelyForm');
		if(form.getForm().isValid()) {
			var grid = Ext.getCmp('dataTimelyGrid');
			grid.store.baseParams = {};
			var baseparams = {
				'orgId' : Ext.getCmp('orgId').getValue(),
				'orgType' : Ext.getCmp('orgType').getValue()
			};
			grid.store.baseParams = baseparams;
			grid.store.load({
				params : {'page.start' : 0, 'page.limit' : Jinpeng.PageSize},
				callback : function(o,response,success) {
					if (Ext.getCmp('orgType').getValue() == 2) {
						grid.view.expandAllGroups();
					}
				}
			});
		}
	}
});

/**
 * 数据上传及时率Grid
 */
Jinpeng.dataTimely.DataTimelyGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'dataTimelyGrid',
	border : false,
	enableHdMenu : false,
	stateful:false,
	initComponent : function() {
		var _panel = this;
		var summary = new Ext.ux.grid.GroupSummary();
		var reader = new Ext.data.JsonReader({
	        idProperty: 'deviceId',
	        root : 'data',
			fields : [
	          {name : 'KKBH'},
	          {name : 'KKMC'},
	          {name : 'DATA_STATUS'},
	          {name : 'DWBH'},
	          {name : 'DWMC'}]
	    });
		dataTimelyStatusByOrgStore = new Ext.data.GroupingStore({
			url : rootpath+ "/dataTimely/dataTimelyGrouping.mvc",
			groupField: 'DWMC',
			reader:reader
		});
		// 加载数据
		Ext.apply(this, {
			layout : 'fit',
			stripeRows : true,
			store : dataTimelyStatusByOrgStore,
			colModel  : new Ext.grid.ColumnModel({
				columns : [ {
		            header: '部门',
		            dataIndex: 'DWMC'
	               
		        },{
					header : '卡口名称',
					dataIndex : 'KKMC',
		            summaryType: 'count',
		            summaryRenderer: function(v, params, data){
		        		var status = data.data.DATA_STATUS;
		        		var on = _panel.countInstances(status, '0') - 1;
				    	var out = _panel.countInstances(status, '1')
				    	var outTime = _panel.countInstances(status, '2')
	                    return '卡口总数 ('+v+')，正常 (<span style="color:green;">'+on+'</span>)，数据延迟 (<span style="color:#EEB422;">' + out +'</span>)，不及时 (<span style="color:red;">' + outTime +'</span>)'; 
	                }
				},{
		            header: '数据状态',
		            dataIndex: 'DATA_STATUS', renderer : function(key) {
					   var value = '--';
		        	   if (key == '0') {
		        		   value = '<span style="color:green;">正常</span>';
		        	   }
	        		   if (key == '1') {
		        		   value = '<span style="color:#EEB422;">数据延迟</span>';
		        	   }
	        		   if (key == '2') {
		        		   value = '<span style="color:red;">不及时</span>';
		        	   }
		        	   return value;
				    },
		            summaryType: 'sum',
		            summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        }]
			}),
			view: new Ext.grid.GroupingView({
				forceFit: true,
	            showGroupName: false,
	            enableNoGroups: false,
				enableGroupingMenu: false,
				startCollapsed:true,
	            hideGroupedColumn: true,
				groupTextTpl: '{text}'
			}),
			 plugins: summary
		});
		Jinpeng.dataTimely.DataTimelyGridPanel.superclass.initComponent.apply(this);
	},
	countInstances : function (mainStr, subStr) {
		var count = 0;
        var offset = 0;
        do
        {
            offset = mainStr.indexOf(subStr, offset);
            if(offset != -1)
            {
                count++;
                offset += subStr.length;
            }
        } while (offset != -1)
        	return count;
	}
});


Ext.reg('dataTimelyForm', Jinpeng.dataTimely.DataTimelyFormPanel);
Ext.reg('dataTimelyGrid', Jinpeng.dataTimely.DataTimelyGridPanel);
