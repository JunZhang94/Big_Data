var DEPT_DATA_URL = "./car/query/dept.mvc?code=440100";
var MOUNT_DATA_URL = "./car/cascade.mvc";
var SUBMIT_RESULT_GRID_DATA_URL = "./car/analyze/rate/data.mvc";

Ext.define("Ext.jp.tic.search.PlateQueryPanel", {
	extend: Ext.container.Container,
	
	requireds: [ "Ext.jp.tic.search.PlateQueryResultGrid" ],
	
	border: 0,
	layout: {
        type: 'vbox',
        padding: '5',
        align: 'stretch'
    },
    defaults:{margins:'0 0 5 0'},
    items:[{
        xtype:'form',
        autoHeight: true,
    	minSize: 100,
    	maxSize: 600,
        bodyPadding: 5,
        title: "搜索",
        collapsible: true,
		autoHeight: true,
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 50,
            anchor: '100%'
        },

        items: [{
			xtype: "fieldcontainer", 
        	combineErrors: true,
            msgTarget: 'side',
            layout: 'hbox',
            defaults: {
                hideLabel: false,
                labelAlign: 'right'
            },
            items: [{
                xtype     : 'textfield',
                name: "plateNo",
                fieldLabel: '车牌号码',
                emptyText: "请输入车牌",
                width: 266
            }, {
            	xtype     : 'combo',
				name      : 'dept',
                fieldLabel: '选择单位',
               	margin: '0 5 0 0',
               	allowBlank: false,
               	editable: false,
               	emptyText: "请选择单位",
               	store: Ext.create('Ext.data.Store', {
					fields: [
				        {type: 'string', name: 'dwbh'},
				        {type: 'string', name: 'dwmc'}
				    ],
				    proxy: {
				    	type: 'ajax',
				        url: DEPT_DATA_URL,
				        reader: {
				        	type: 'json'
				        }
				    },
				    autoLoad: true
				}),
				valueField: 'dwbh',
				displayField: 'dwmc',
				queryMode: 'local',
    			typeAhead: true,
    			listeners: {
    				"change": function (_this, current, old, opts) {
    					
    					_this.ownerCt.items.items[2].reset();
    					
						Ext.Ajax.request({  
						    url: MOUNT_DATA_URL,  
						    method: 'POST',  
						    timeout: 10000,  
						    params: { 
						    	code: current,
						    	type: "MOUNT"
						    },  
						    success: function(response , options){  
						        _this.ownerCt.items.items[2].getStore().loadData(Ext.decode(response.responseText));
						    },  
						    failure: function(response, options){  
						    	var win = new Jinpeng.widget.MessageWindow();
								win.msg = "数据加载出现错误，请检查你的网络和服务器或是尝试刷新页面！";
								win.show();
						    }  
						});
    				}
    			}
				
           }, {
               xtype     : 'combo',
               name      : 'mount',
               fieldLabel: '选择卡口',
               margin: '0 5 0 0',
               allowBlank: false,
               editable: false,
               emptyText: "请选择卡口",
               store: Ext.create('Ext.data.Store', {
					fields: [
				        {type: 'string', name: 'kkbh'},
				        {type: 'string', name: 'kkmc'}
				    ]
				}),
				valueField: 'kkbh',
				displayField: 'kkmc',
				queryMode: 'local',
    			typeAhead: true
           }]
        }, {
			xtype: "fieldcontainer", 
        	combineErrors: true,
            msgTarget: 'side',
            layout: 'hbox',
            defaults: {
                hideLabel: false,
                labelAlign: 'right'
            },
            items: [{
                xtype     : 'datefield',
                name      : 'startDate',
                fieldLabel: '开始日期', 
                format: 'Y-m-d H:i:s',
                margin: '0 5 0 0'
            }, {
                xtype     : 'datefield',
                name      : 'endDate',
                format: 'Y-m-d H:i:s',
                fieldLabel: '结束日期'
            }]
        }],
        buttons: [{
	        text: '查  询',
	        handler: function() {
	            var formEl = this.up('form');
	            var form = formEl.getForm();
	            if (form.isValid()) {
	            
	            	var grid = formEl.ownerCt.items.getAt(1);
	            	/*grid.body.mask('数据加载中...', 'x-mask-loading');*/
	            	
	            	var params = form.getValues(false);
	            	grid.getStore().load({params: params, method: "POST"});
	            	
	            	/*var params = form.getValues(false);
	            	Ext.Ajax.request({  
					    url: SUBMIT_RESULT_GRID_DATA_URL,  
					    method: 'POST',  
					    timeout: 30000,  
					    params: params,
					    form: "search_form",
					    success: function(response , options){  
					        grid.getStore().loadData(Ext.decode(response.responseText));
					        grid.body.unmask();
					    },  
					    failure: function(response, options){  
					       var win = new Jinpeng.widget.MessageWindow();
								win.msg = "数据加载出现错误，请检查你的网络和服务器或是尝试刷新页面！";
								win.show();
					    }  
					});*/
	            }
	        }
        }, {
	        text: '重  置',
	        handler: function() {
	            this.up('form').getForm().reset();
	        }
        }]
    },
    Ext.create("Ext.jp.tic.search.PlateQueryResultGrid")
    ],
	initComponent: function(){
		this.callParent(arguments);
	}
});
