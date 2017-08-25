//区域碰撞查询结果集页面
Ext.ns("Jinpeng.resultQuery");

var praParams;//查询条件
var conditions;//页面查询组件
var config = {
	queryUrl : rootpath + parent.window.opener.queryUrl,
	kkmcs : parent.window.opener.kkmcs
};
Ext.onReady(function() {
	var resultScript = document.getElementById("resultScript"); 
	resultScript.src="http://" + ipAdress + "/PGISViewer/PGISViewer.html";//域B的链接 
	praParams = parent.window.opener.params;
	conditions = parent.window.opener.conditions;
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport( {
		layout : 'border',
		id : 'portBody',
		items : [ {
			//表单
			region : 'north',
			border : false,
			height : 140,
			xtype : 'northFormPanel'
		}, {
			//列表数据
			region : 'center',
			border : false,
			xtype : 'gisDataPanel'
		}]
	});
});

//表单
Jinpeng.resultQuery.NorthFormPanel = Ext.extend(Ext.Panel,{
	id : 'resultPanel',
	initComponent : function() {
		var _panel = this;
		Ext.apply(this,{
			items : [ {
				// form表单
				xtype : 'form',
				id : 'resultQueryForm',
				border : false,
				frame : true,
				cls : 'blue-button-ct',
				layout : 'table',
				defaults : {
					layout : 'form'
				},
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
					xtype : 'fieldset',
					title : '搜索条件',
					id : 'resultCondtions',
					layout : "table",
					width : Ext.getBody().getWidth() - 10,
					defaults : {
						width : 800,
						layout : 'form'
					},
					layoutConfig : {
						columns : 4
					}
				}]
			} ],
			listeners : {
				afterrender : function() {
					//定义查询条件
					var arr = [];
					for (var i = 0; i < conditions.length; i++) {
						var tempObj = {};
						tempObj.cls = 'hiddenText';
						tempObj.items = conditions[i].items[0];
						arr.push(tempObj);
					}
					for(var i = 0; i < arr.length; i++){ 
						Ext.getCmp('resultCondtions').add(arr[i]);
				    }
					Ext.getCmp('resultPanel').doLayout(true);
					_panel.resultQueryMethod();
				}
			}
		});
		Jinpeng.resultQuery.NorthFormPanel.superclass.initComponent.apply(this);
	},
	//查询
	resultQueryMethod : function() {
		var grid = Ext.getCmp('resultGridPanel');
		grid.store.baseParams = {};// 重置
		//将参数传入后台
		var baseparams = praParams;
		grid.store.baseParams = baseparams;
		/*刷新选中*/
		this.publish("clearGridSelections",[]);
		grid.store.load({
			params : {
				'page.start' : 0,
				'page.limit' : 15
			},
			callback : function(o,response,success) {
				var kkmcArray = config.kkmcs.split(",");
				var fields = new Array(kkmcArray.length);
				var columns = new Array(kkmcArray.length);
				var data = null;
				var filedO = {}, columnsO = {};
				for (var i = 0; i < kkmcArray.length; i++) {
					columnsO.header = kkmcArray[i];
					columnsO.dataIndex = "kkmcTime" + (i + 1);
					columnsO.width = 50;
					filedO.name = "kkmcTime" + (i + 1);
					fields[i] = filedO;
					columns[i] = columnsO;
					filedO = {}, columnsO = {}; //重置
				}
				var columns = columns;
				var fields = fields;
				colM.length = 0; //清空数组
				dataFields.length = 0; //清空数组
				colM.push( new Ext.ux.grid.PagingRowNumberer({ width : 40, height : 50}));
				colM.push( {header : '车牌号码', dataIndex : 'carNum',width : 30});
				dataFields.push({name : 'carNum'});
				for ( var i = 0; i < fields.length; i++) {
					dataFields.push(fields[i]);
					colM.push(columns[i]);
				}
				colM.push( {header : '最后经过时间', dataIndex : 'lastJgsj',width : 30});
				colM.push( {header : '最后经过卡口', dataIndex : 'lastKkmc',width : 30});
			    grid.reconfigure(regionCrashStore, new Ext.grid.ColumnModel(colM));
			}
		});
	}
});

var dataFields;
var colM;
var regionCrashStore;
// 中心右区域数据显示中心
Jinpeng.resultQuery.RegionCrashGridPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'resultGridPanel',
   	border : false,
   	frame : true,
    pageSize : Jinpeng.PageSize,
    autoScroll : true,
    height :  Ext.getBody().getHeight() - 145,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		dataFields = [{
				name : 'kkmcTime1'
			}, {
				name : 'kkmcTime2'
			}, {
				name : 'kkmcTime3'
			}, {
				name : 'kkmcTime4'
			}, {
				name : 'kkmcTime5'
			}, {
				name : 'kkmcTime6'
			}, {
				name : 'kkmcTime7'
			}, {
				name : 'kkmcTime8'
			}, {
				name : 'kkmcTime9'
			}, {
				name : 'kkmcTime10'
			}, {
				name : 'carNum'
			}, {
				name : 'lastJgsj'
			}, {
				name : 'lastKkmc'
			}
		];
		colM = [
	        new Ext.ux.grid.PagingRowNumberer({ width : 40, height : 50}),
	        {
	    		header : '车牌号码',
	    		dataIndex : 'carNum'
	    	},{
	    		header : '卡口1',
	    		dataIndex : 'kkmcTime1'
	    	},{
	    		header : '卡口2',
	    		dataIndex : 'kkmcTime2'
	    	},{
	    		header : '卡口3',
	    		dataIndex : 'kkmcTime3'
	    	},{
	    		header : '最后经过时间',
	    		dataIndex : 'lastJgsj'
	    	},{
	    		header : '最后经过卡口',
	    		dataIndex : 'lastKkmc'
	    	}
	    ];
		regionCrashStore = new Ext.data.JsonStore({
			url : config.queryUrl,
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : dataFields
			
		});
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this,{
			store : regionCrashStore,
			colModel :  new Ext.grid.ColumnModel({
				defaults : {
				sortable : false,
				autoHeight:true,
			},
				columns :colM,
			})
		});
		Jinpeng.resultQuery.RegionCrashGridPanel.superclass.initComponent.apply(this);
	}
});

//GisPanel区域
Jinpeng.resultQuery.GisDataPanel = Ext.extend(Ext.Panel,{
	frame:true,
    collapsible:true,
    layout:'fit',
	initComponent : function() {
		var hh = Ext.getBody().getHeight() - 147;
		Ext.apply(this,{
			layout : 'border',
			border : false,
			defaults : {
				margins : '0 0 0 0'
			},
			items : [ {
				region : 'center',
				layout : 'column',
				items : [{
					columnWidth : 0.5,
					xtype : 'gisGridPanel'
				}, {
					columnWidth : 0.5,
					id : 'gisShow',
					xtype : 'panel',
					items : [{
						html : "<iframe id='carDisIframe' class='carDisIframe' src='http://" + ipAdress + "/PGISViewer/PGISViewer.html' width='99.5%' height='" + hh + "' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
					}]
				}]
			}]
		});
		Jinpeng.resultQuery.GisDataPanel.superclass.initComponent.apply(this);
	}
});

Ext.reg('northFormPanel', Jinpeng.resultQuery.NorthFormPanel);
Ext.reg('gisDataPanel', Jinpeng.resultQuery.GisDataPanel);
Ext.reg('gisGridPanel', Jinpeng.resultQuery.RegionCrashGridPanel);