var DEPT_DATA_URL = "./car/query/dept.mvc?code=440100";
var MOUNT_DATA_URL = "./car/cascade.mvc";
var DEPT_MOUNT_COMBOBOX_TREE_URL = "./car/query/tree/data.mvc";
var CARQUERYRESULTGRID_DATA_URL = "./car/query/slicedata.mvc";

Ext.define("Ext.jp.tic.search.CarQueryPanel", {
	extend: Ext.container.Container,
	
	requireds: [ "Ext.jp.tic.search.CarQueryResultGrid" ],
	
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
                labelAlign: 'right',
                width: 266
            },
            items: [
            	Ext.create("Ext.jp.tic.component.CarPlatePicker", {
	           		name: "plateNo",
	                fieldLabel: '车牌号码',
	                labelAlign: 'right',
	                emptyText: "请输入车牌",
	                maxPickerWidth: 960
	          }),
           	  Ext.create("Ext.ux.ComboboxTree", {
	        	xtype: "comboboxtree",
	        	id: "mount",
	        	allowBlank: true,
	        	anchor: '100%',
	        	maxPickerHeight: 360,
	        	maxPickerWidth: 560,
	        	bodyWidth: 270,
                fieldLabel: '选择卡口',
                labelAlign: 'right',
                editable: false,
                emptyText: "请选择卡口",
                displayMode: "text",
	            store: Ext.create('Ext.data.TreeStore', {
			        proxy: {
			            type: 'ajax',
			            url: DEPT_MOUNT_COMBOBOX_TREE_URL
			        },
			        root: {
			        	id: 440100,
			            expanded: true
			        }
			    })
	        }), {
                xtype     : 'datefield',
                name      : 'startDate',
                fieldLabel: '开始日期', 
                format: 'Y-m-d H:i:s',
                allowBlank: false
            }, {
                xtype     : 'datefield',
                name      : 'endDate',
                format: 'Y-m-d H:i:s',
                fieldLabel: '结束日期',
                allowBlank: false
            }]
        }],
        buttons: [{
	        text: '查  询',
	        handler: function() {
	            var formEl = this.up('form');
	            var form = formEl.getForm();
	            if (form.isValid()) {
	            
	            	var grid = formEl.ownerCt.items.getAt(1);
	            	grid.body.mask('数据加载中...', 'x-mask-loading');
	            	
	            	var params = form.getValues(false);
	            	params.count = 30;
	            	params.mount = Ext.getCmp("mount").hideValue;
	            	formEl.ownerCt.doLoadResult(params, grid, false);
	            }
	        }
        }, {
	        text: '加载更多↓',
	        handler: function() {
	            var formEl = this.up('form');
	            var grid = formEl.ownerCt.items.getAt(1);
	            
	            if(!grid.getStore().endKey){
	            	var win = new Jinpeng.widget.MessageWindow();
	            	win.msg ='没有更多数据!';
	            	win.show();
	            	return;
	            }
            	
            	grid.body.mask('数据加载中...', 'x-mask-loading');
            	var params = {count: 30};
            	params.endKey = grid.getStore().endKey;
            	
            	formEl.ownerCt.doLoadResult(params, grid, true);
	        }
        }, {
	        text: '重  置',
	        handler: function() {
	            this.up('form').getForm().reset();
	        }
        }]
    },
    Ext.create("Ext.jp.tic.search.CarQueryResultGrid")
    ],
	initComponent: function(){
		this.callParent(arguments);
	},
	doLoadResult: function (params, grid, append) {
		Ext.Ajax.request({  
		    url: CARQUERYRESULTGRID_DATA_URL,  
		    actionMethods: {read: "POST"}, 
		    timeout: 30000,  
		    params: params,
		    success: function(response , options){  
		    	var data = Ext.decode(response.responseText);
		    	grid.getStore().endKey = data.endKey;
			    if (!append) {
				    grid.getStore().loadData(data.result, append);
			    } else {
				    grid.getStore().add(data.result);
			    }
		        grid.body.unmask();
		    },  
		    failure: function(response, options){  
		    	var win = new Jinpeng.widget.MessageWindow();
				win.msg = "数据加载出现错误，请检查你的网络和服务器或是尝试刷新页面！";
				win.show();
				grid.body.unmask();
		    }  
		});
	}
});
