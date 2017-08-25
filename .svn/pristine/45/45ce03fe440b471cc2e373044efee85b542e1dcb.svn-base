/*###########################临近点位分析#############################*/

var DEPT_DATA_URL = "./car/query/dept.mvc?code=440100";
var MOUNT_DATA_URL = "./car/cascade.mvc";
var SUBMIT_RESULT_CHART_DATA_URL = "./car/analyze/pointposition/data.mvc";

Ext.define("Ext.jp.tic.stat.CarAnalyzePointPositionPanel", {
	extend: Ext.container.Container,
	
	requireds: [ "Ext.jp.tic.stat.CarAnalyzePointPositionChart" ],
	
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
            anchor: '100%'
        },

        items: [{
			xtype: "fieldcontainer", 
        	combineErrors: true,
            msgTarget: 'side',
            layout: 'hbox',
            defaults: {
                hideLabel: false,
                labelWidth: 70,
                width: 210,
                labelAlign: 'right'
            },
            items: [{
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
    					
    					_this.ownerCt.items.items[1].reset();
    					
						Ext.Ajax.request({  
						    url: MOUNT_DATA_URL,  
						    method: 'POST',  
						    timeout: 10000,  
						    params: { 
						    	code: current,
						    	type: "MOUNT"
						    },  
						    success: function(response , options){  
						        _this.ownerCt.items.items[1].getStore().loadData(Ext.decode(response.responseText));
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
           }, {
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
            }, {
               xtype     : 'combo',
               name      : 'type',
               fieldLabel: '统计类别',
               margin: '0 5 0 0',
               allowBlank: false,
               editable: false,
               emptyText: "请选择类别",
               store: Ext.create('Ext.data.Store', {
					fields: [
				        {type: 'string', name: 'val'},
				        {type: 'string', name: 'text'}
				    ],
				    data: [
				    	{val: 'hour', text: '按小时查询'},
				    	{val: 'day', text: '按每天查询'},
				    	{val: 'week', text: '按星期查询'},
				    	{val: 'month', text: '按月度查询'}
				    ]
				}),
				valueField: 'val',
				displayField: 'text'
           }]
        }],
        buttons: [{
	        text: '查  询',
	        handler: function() {
	            var formEl = this.up('form');
	            var form = formEl.getForm();
	            if (form.isValid()) {
	            
	            	var box = formEl.ownerCt.items.getAt(1);
	            	box.removeAll();
	            	box.add({ xtype: 'label', text: '点击统计: ', margin: '0 10 0 0' });
	            	var chart = formEl.ownerCt.items.getAt(2);
	            	
	            	var mask = new Ext.LoadMask(chart, {msg: '分析统计数据中……'});
					mask.show();
	            	
	            	var params = form.getValues(false);
	            	Ext.Ajax.request({  
					    url: SUBMIT_RESULT_CHART_DATA_URL,  
					    method: 'POST',  
					    timeout: 30000,  
					    params: params,
					    form: "search_form",
					    success: function(response , options){  
					    	mask.hide();
					    	
					        var data = Ext.decode(response.responseText);
					        if (params.type == "month") {
					        	chart.getStore().loadData(data[params.type]);
					        } else if (params.type == "week") {
					        	for (var item in data) {
					        		box.add({xtype: "button", text: item, weekData: data[item], handler: function () {
						        		//chart.getStore().removeAll();
						        		chart.getStore().loadData(this.weekData[params.type]);
					        		}});
					        	}
					        } else if (params.type == "day") {
					        	for (var item in data) {
					        		box.add({xtype: "button", text: item, record: data[item], handler: function () {
						        		//chart.getStore().removeAll();
						        		chart.getStore().loadData(this.record[params.type]);
					        		}});
					        	}
					        } else if (params.type == "hour") {
					        	for (var item in data) {
					        		for (var node in data[item]) {
					        		
						        		box.add({xtype: "button", text: item + " " + node, record: data[item][node], handler: function () {
							        		//chart.getStore().removeAll();
							        		chart.getStore().loadData(this.record[params.type]);
						        		}});
					        		}
					        	}
					        }
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
	        text: '重  置',
	        handler: function() {
	            this.up('form').getForm().reset();
	        }
        }, {
        	text: '导出图片',
        	handler: function () {
        		var _this = this;
        		Ext.MessageBox.confirm('下载提示', '确定要将到期图表导出为图片吗?', function(choice){
                    if(choice == 'yes'){
                        _this.up('form').ownerCt.items.getAt(2).save({
                            type: 'image/png'
                        });
                    }
                });
        	}
        }]
    }, {
    	xtype: "panel",
    	border: 1,
    	bodyPadding: 5,
    	defaults: {
    		margins: '5',
    		style: {
	            marginLeft: '10px'
	        }
        },
        items: [{
	        xtype: 'label',
	        text: '点击统计: ',
	        margin: '0 10 0 0'
	    }]
    },
   	Ext.create("Ext.jp.tic.stat.CarAnalyzePointPositionChart")
    ],
	initComponent: function(){
		this.callParent(arguments);
	}
});
