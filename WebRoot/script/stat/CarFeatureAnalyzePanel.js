/*###############车辆特征分析############*/
var CAR_COLOR_DATA_URL = "./car/query/wordbook.mvc?type=LicPlateColor";
var CAR_TYPE_DATA_URL = "./car/query/wordbook.mvc?type=LicPlateType";
var CAR_EXTERIOR_DATA_URL = "./car/query/wordbook.mvc?type=CarBrand";

var SUBMIT_RESULT_GRID_DATA_URL = "./car/analyze/carfeature/data.mvc";

var viewImg = function (target) {
	window.open(target.getAttribute("src"), "_blank");
};

Ext.define("Ext.jp.tic.stat.CarFeatureAnalyzePanel", {
	extend: Ext.container.Container,
	
	requireds: [ "Ext.jp.tic.stat.CarFeatureAnalyzeResultGrid" ],
	
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
				name      : 'csys',
                fieldLabel: '按号牌颜色筛选',
               	margin: '0 5 0 0',
               	editable: false,
               	emptyText: "号牌颜色",
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
           }, {
               xtype     : 'combo',
               name      : 'clpp',
               fieldLabel: '按车辆品牌筛选',
               margin: '0 5 0 0',
               editable: false,
               emptyText: "请选择车辆品牌",
               store: Ext.create('Ext.data.Store', {
					fields: [
				        {type: 'string', name: 'displayvalue'},
				        {type: 'string', name: 'storevalue'}
				    ],
				    proxy: {
				    	type: 'ajax',
				        url: CAR_EXTERIOR_DATA_URL,
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
               name      : 'hpzl',
               fieldLabel: '按号牌种类筛选',
               margin: '0 5 0 0',
               editable: false,
               emptyText: "请选择号牌种类",
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
            },{
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
	            	grid.body.mask('数据加载中...', 'x-mask-loading');
	            	
	            	var params = form.getValues(false);
	            	params.count = 30;
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
	            	win.msg = '没有更多数据!';
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
    Ext.create("Ext.jp.tic.stat.CarFeatureAnalyzeResultGrid")
    ],
	initComponent: function(){
		this.callParent(arguments);
	},
	doLoadResult: function (params, grid, append) {
		Ext.Ajax.request({  
		    url: SUBMIT_RESULT_GRID_DATA_URL,  
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
		    }  
		});
	}
});
