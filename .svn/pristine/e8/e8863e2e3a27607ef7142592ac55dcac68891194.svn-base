/**
 * 数据接收状态,按部门分组展示
 */
Ext.ns('Jinpeng.accept');

var viewPort = null;
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
	Ext.getCmp('acceptStatusForm').form.findField('orgId').setValue(orgId);
	Ext.getCmp('acceptStatusForm').form.findField('orgType').setValue(parseInt(data.org_type));
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
			xtype : 'acceptStatusForm'
		}, {
			region : 'center',
			border : false,
			xtype : 'acceptStatusGrid'
		}]
	});
	/*var dataFormPanel = new Jinpeng.accept.DataAcceptStatusFormPanel();
	setInterval(function() {
		dataFormPanel.deviceCheck();
	}, 120000);*/
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
					//items : [comboBoxTree]
					items : [ {
							xtype : 'compositefield',
							items : [ {
								flex : 0.5,
								fieldLabel : '组织结构',
								xtype : 'tooltiptextfield',
								name : 'orgName',
								id : 'orgName',
								width : 150,
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
	          {name : 'RECIEVER_IP'},
	          {name : 'STATUS'},
	          {name : 'END_TIME'},
	          {name : 'DWBH'},
	          {name : 'DWMC'}]
	    });
		dataAcceptStatusByOrgStore = new Ext.data.GroupingStore({
			url : rootpath+ "/dc/byOrgGroupping.mvc",
			//sortInfo: {field: 'KKMC', direction: 'ASC'},
			groupField: 'DWMC',
			reader:reader
		});
		// 加载数据
		Ext.apply(this, {
			layout : 'fit',
			stripeRows : true,
			store : dataAcceptStatusByOrgStore,
			colModel  : new Ext.grid.ColumnModel({
				columns : [ {
		            header: '部门',
		            dataIndex: 'DWMC'
	               
		        },{
					header : '卡口名称',
					dataIndex : 'KKMC',
		            summaryType: 'count',
		            summaryRenderer: function(v, params, data){
		        		var status = data.data.STATUS;
		        		var on = _panel.countInstances(status, '1')
				    	var out = _panel.countInstances(status, '0')
				    	var outTime = _panel.countInstances(status, '3')
				    	var outDatas = parseInt(out) - 1;
	                    return '卡口总数 ('+v+')，正常 (<span style="color:green;">'+on+'</span>)，异常 (<span style="color:red;">' + outDatas +'</span>)，超时 (<span style="color:purple;">' + outTime +'</span>)'; 
	                }
				},{
		            header: '最后接收时间',
		            dataIndex: 'END_TIME', renderer : function(key) {
		        	   if (key == '') {
		        		   return '--'
		        	   } else {
		        		   return key.substring(0,key.indexOf("."));
		        	   }
				    }/*,
		            summaryType: 'sum'*/
		        },{
		            header: '状态',
		            dataIndex: 'STATUS', renderer : function(key) {
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
		Jinpeng.accept.DataAcceptStatusGridPanel.superclass.initComponent.apply(this);
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


Ext.reg('acceptStatusForm', Jinpeng.accept.DataAcceptStatusFormPanel);
Ext.reg('acceptStatusGrid', Jinpeng.accept.DataAcceptStatusGridPanel);
