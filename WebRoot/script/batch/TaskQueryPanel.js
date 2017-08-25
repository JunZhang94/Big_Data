var JOB_DATA_URL = "./batch/job/query.mvc";
//var SUBMIT_RESULT_GRID_DATA_URL = "./batch/task/search.mvc";

Ext.define("Ext.jp.tic.batch.TaskQueryPanel", {
	extend: Ext.container.Container,
	
	requireds: [ "Ext.jp.tic.batch.TaskQueryResultGrid" ],
	
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
            	xtype     : 'combo',
				name      : 'job',
                fieldLabel: '选择任务',
               	margin: '0 5 0 0',
               	allowBlank: false,
               	editable: false,
               	emptyText: "请选择任务",
               	store: Ext.create('Ext.data.Store', {
					fields: [
				        {type: 'string', name: 'jobId'},
				        {type: 'string', name: 'jobName'}
				    ],
				    proxy: {
				    	type: 'ajax',
				        url: JOB_DATA_URL,
				        reader: {
				        	type: 'json'
				        }
				    },
				    autoLoad: true
				}),
				valueField: 'id',
				displayField: 'jobName',
				queryMode: 'local',
    			typeAhead: true				
           }
            ]}, {
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
                format: 'Y-m-d',
                margin: '0 5 0 0'
            }, {
                xtype     : 'datefield',
                name      : 'endDate',
                format: 'Y-m-d',
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
	            	var params = form.getValues(false);
	            	grid.getStore().load({params: params, method: "POST"});
	            }
	        }
        }, {
	        text: '重  置',
	        handler: function() {
	            this.up('form').getForm().reset();
	        }
        }]
    },
    Ext.create("Ext.jp.tic.batch.TaskQueryResultGrid")
    ],
	initComponent: function(){
		this.callParent(arguments);
	}
});
