var CAR_COLOR_DATA_URL = "./car/query/wordbook.mvc?type=CarColor";
var CAR_TYPE_DATA_URL = "./car/query/wordbook.mvc?type=CarType";
var GRID_DATA_URL = "./car/query/mulit/plate.mvc";

Ext.define("Ext.jp.tic.component.CarPlateCodeQueryComponent", {
	extend: Ext.Panel,
	border: 1,
	layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults:{margins:'0 0 5 0', border: 0},
    items:[{
        xtype:'form',
        autoHeight: true,
    	minSize: 100,
    	maxSize: 600,
        bodyPadding: 5,
		autoHeight: true,
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 100,
            anchor: '100%'
        },
		defaults:{
        	combineErrors: true,
            msgTarget: 'side',
            layout: 'hbox',
            defaults: {
                hideLabel: false,
                labelWidth: 90,
                labelAlign: 'right',
                width: 240
            }
		},
        items: [{
        	xtype: "fieldcontainer", 
            items: [{
                xtype     : 'textfield',
                name: "plateNo",
                fieldLabel: '车牌号码',
                emptyText: "请输入车牌"
            }, {
                xtype     : 'textfield',
                name: "plateNoCN",
                fieldLabel: '中文品牌',
                emptyText: "请输入中文品牌"
            }]
        }, {
        	xtype: "fieldcontainer", 
            items: [{
                xtype     : 'textfield',
                name: "idCard",
                fieldLabel: '身份证号码',
                emptyText: "请输入身份证号码"
            }, {
                xtype     : 'textfield',
                name: "carOwner",
                fieldLabel: '车主姓名',
                emptyText: "请输入车主姓名"
            }]
        }, {
        	xtype: "fieldcontainer", 
            items: [{
               xtype     : 'combo',
               name      : 'hpzl',
               fieldLabel: '车辆种类',
               editable: false,
               emptyText: "请选择车辆种类",
               store: Ext.create('Ext.data.Store', {
					fields: [
				        {type: 'string', name: 'displayvalue'},
				        {type: 'string', name: 'storevalue'}
				    ],
				    proxy: {
				    	type: 'ajax',
				        url: CAR_TYPE_DATA_URL,
				        reader: {
				        	type: 'json'
				        }
				    },
				    autoLoad: true
				}),
				valueField: 'storevalue',
				displayField: 'displayvalue',
				queryMode: 'local',
    			typeAhead: true
           }, {
            	xtype     : 'combo',
				name      : 'csys',
                fieldLabel: '车身颜色',
               	editable: false,
               	emptyText: "请选择车身颜色",
               	store: Ext.create('Ext.data.Store', {
					fields: [
				        {type: 'string', name: 'displayvalue'},
				        {type: 'string', name: 'storevalue'}
				    ],
				    proxy: {
				    	type: 'ajax',
				        url: CAR_COLOR_DATA_URL,
				        reader: {
				        	type: 'json'
				        }
				    },
				    autoLoad: true
				}),
				valueField: 'storevalue',
				displayField: 'displayvalue',
				queryMode: 'local',
    			typeAhead: true
           }]
        }],
        buttons: [{
	        text: '查  询',
	        handler: function() {
	            var formEl = this.up('form');
	            var form = formEl.getForm();
	            if (form.isValid()) {
	            
	            	var params = form.getValues(false);
	            	var grid = formEl.ownerCt.items.getAt(1);
	            	grid.body.mask('数据加载中...', 'x-mask-loading');
	            	
	            	Ext.Ajax.request({  
					    url: GRID_DATA_URL,  
					    method: 'POST',  
					    timeout: 10000,  
					    params: params,  
					    success: function(response , options){  
					        grid.getStore().loadData(Ext.decode(response.responseText));
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
	        }
        }, {
	        text: '重  置',
	        handler: function() {
	            this.up('form').getForm().reset();
	        }
        }]
    }, {
	    xtype: 'gridpanel',
	    height: 200,
	    minSize: 75,
	    maxSize: 250,
		store: Ext.create('Ext.data.ArrayStore', {
            fields: [
               {name: 'plateNumber'}, {name: 'plateColor'}
            ],
            data: [
		        ['粤A5846A', '蓝'],
		        ['粤A2846A', '蓝'],
		        ['粤A5811', '蓝'],
		        ['粤A5226A', '蓝'],
		        ['粤A53456', '蓝']
		    ]
        }),
        stripeRows: true,
        columnLines: true,
        selModel: Ext.create("Ext.selection.CheckboxModel", {
        	mode: "MULTI"
        }),
        columns: [{
            text   : '车牌号码',
            flex    : .5,
            sortable : true,
            dataIndex: 'plateNumber'
        },{
            text   : '车牌颜色',
            flex    : .5,
            sortable : true,
            dataIndex: 'plateColor'
        }]
	}]
});
