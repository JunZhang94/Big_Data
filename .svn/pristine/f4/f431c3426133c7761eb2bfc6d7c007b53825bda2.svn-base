//车辆频度统计结果集页面
Ext.ns("Jinpeng.resultQuery");

var praParams;//查询条件
var conditions;//页面查询组件
var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
var upAndDownFlag = false;
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
			height : 110,
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
						width : 350,
						layout : 'form'
					},
					layoutConfig : {
						columns : 2
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
		var form = Ext.getCmp('resultQueryForm');
		if(form.getForm().isValid()) {
			var grid = Ext.getCmp('gridPanel');
			grid.store.baseParams = {};
			var baseparams = praParams;
			grid.store.baseParams = baseparams;
			/*刷新选中*/
			this.publish("clearGridSelections",[]);
			grid.store.load({
				params : {'page.start' : 0, 'page.limit' : 8}
			});
		}
	}
});

//GisPanel区域
Jinpeng.resultQuery.GisDataPanel = Ext.extend(Ext.Panel,{
	frame:true,
    collapsible:true,
    layout:'fit',
    border : true,
	initComponent : function() {
		var hh = Ext.getBody().getHeight() - 112;
		Ext.apply(this,{
			layout : 'border',
			defaults : {
				margins : '0 0 0 0'
			},
			items : [ {
				region : 'center',
				layout : 'column',
				items : [{
					columnWidth : 0.5,
					border : true,
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

var commuServerStore;
/**
 * 车辆频度统计--Grid
 */
Jinpeng.resultQuery.FrequencyStatisticsGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'gridPanel',
	border : false,
	pageSize : 8,
	height : Ext.getBody().getHeight() - 110,
	initComponent : function() {
		var summary = new Ext.ux.grid.GroupSummary();
		var reader = new Ext.data.JsonReader({
	        idProperty: 'deviceId',
	        root : 'result',
			fields : [
				{name : 'carNum'},
				{name : 'carType'},
				{name : 'kkbh'},
				{name : 'kkmc'},
				{name : 'passTimes'},
				{name : 'lastFlag'}
	          ]
	    });
		commuServerStore = new Ext.data.GroupingStore({
			url : config.queryUrl,
			sortInfo: {field: 'passTimes', direction: 'DESC'},
			groupField: 'carNum',
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			reader:reader
		});
		var sm = new Ext.grid.CheckboxSelectionModel();
		Ext.apply(this, {
			layout : 'fit',
			stripeRows : true,
			store : commuServerStore,
			selModel : sm,
			colModel : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
		           new Ext.ux.grid.PagingRowNumberer({ width : 40 }),
		           sm,
		           {header : '车牌号码', dataIndex : 'carNum'/*,
			           renderer: function(val, metaData, record) {
							var str = "";
							str = "<a href='#' onclick=\"showCarPlace('" + val + "','"+record.data.passTimes+"','"+record.data.kkbh+"')\">" + val + "</a>";
							return str;
						}*/
		           },{
						header : '卡口名称',
						dataIndex : 'kkmc',
						summaryType: 'count',
						width : 250,
						summaryRenderer: function(v, params, data){
			        		var all_counts = data.data.passTimes;
			        		var showStr = '出现总次数：' + all_counts + ' 次';
		                    return showStr;
		                }
					},
		            {header : '经过次数', dataIndex : 'passTimes', summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                },renderer: function(val, metaData, record) {
						var str = "";
						str = "<a href='#' onclick=\"showCarPlace('" + val + "','"+record.data.carNum+"','"+record.data.kkbh+"')\">" + val + "</a>";
						return str;
					}
	               }
	            ]
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
			plugins: summary,
			tbar : {
				cls : 'blue-button-ct',
				items : [ {
					xtype : 'tbspacer',
					width : 12
				},{
					xtype : 'button',
					id : 'exportRecordBtn',
					text : '&nbsp;&nbsp;&nbsp;导出&nbsp;&nbsp;&nbsp;',
					handler : this.importExcelData
				}]
			},
			bbar : new Jinpeng.widget.PagingToolbarNoPage( {
				id : 'PagingToolbar',
				store : commuServerStore,
				//displayInfo : true,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			}),
			listeners : {
				/*双击查看*/
				/*rowdblclick : function(grid, rowIndex, e ) {
					var recode = grid.store.getAt(rowIndex);
					var mainParam = {
						'orgId' : Ext.getCmp('orgId').getValue(),
						'orgType' : Ext.getCmp('orgType').getValue(),
						'kkbhs' : Ext.getCmp('orgId').getValue(),
						'startTime' : Ext.getCmp('startdate').getValue(),
						'endTime' : Ext.getCmp('enddate').getValue(),
						'carNum' : recode.data.carNum,
						'counts' : recode.data.passTimes
					};
					var win = new Jinpeng.trackSearch.TrackSeachWindow({
							cls : 'system_mod',
							modal : true,
							mainParam : mainParam
						});
						win.init(mainParam);
						win.show();
				},*/
				rowclick : function(grid, rowIndex, e) {
					var data = grid.store.getAt(rowIndex);
					var kkbh = data.get("kkbh");
					var kkmc = data.get("kkmc");
					if (kkmc != null && kkmc != '') {
						window.carDisIframe.GIS_Clear();//清除选择
						window.carDisIframe.GIS_ZoomTo(kkbh);
					}
				}
			}
		});
		Jinpeng.resultQuery.FrequencyStatisticsGridPanel.superclass.initComponent.apply(this);
	},
	//导出Excel格式数据方法 
	importExcelData : function() {
		var records = Ext.getCmp('gridPanel').getSelectionModel().getSelections();
		var config = {
			selectExportURL : rootpath + "/car/exportFrequencyData.mvc",
			queryExportURL : rootpath + "/car/exportFrequencyData.mvc"
		};
		// 得到选中的ids
		var ids = [];
		var carNums = [];
		for ( var i = 0; i < records.length; i++) {
			ids[ids.length] = records[i].get('carNum');
			carNums[carNums.length] = records[i].get('carNum');
		}
		config.carNums = carNums;
		config.ids = ids;
		config.count = 1000; //默认最大导出1000条
		var param = getQueryParams();
		config.queryCondition = param.join("&");
		var ExportHelper = new Jinpeng.HistoryExportHelper(config);
		ExportHelper.startExport(true);
	}
});

function showCarPlace(count,carNum,kkbhs){
	//alert(carNum + " " + passTimes + " " + kkbhs);
	var orgId ='';
	var orgType = '';
	var startTime = Ext.getCmp('startdate').getValue();
	var endTime = Ext.getCmp('enddate').getValue();
	var mainParam = {
		'orgId' : orgId,
		'orgType' : orgType,
		'kkbhs' : kkbhs,
		'startTime' : startTime,
		'endTime' : endTime,
		'carNum' : carNum,
		'counts' : count
	};
	var win = new Jinpeng.trackSearch.TrackSeachWindow({
		cls : 'system_mod',
		modal : true,
		mainParam : mainParam
	});
	win.init(mainParam);
	win.show();
}

//获取当前查询条件参数，并封装为数组
function getQueryParams() {
	//将查询参数传递到后台，并在后台获取要导出的数据 
	var param = [];
	param[param.length] = "orgId=" + Ext.getCmp('orgId').getValue();
	param[param.length] = "orgType=" + Ext.getCmp('orgType').getValue();
	param[param.length] = "kkbhs=" + Ext.getCmp('orgId').getValue();
	param[param.length] = "carCounts=" + Ext.getCmp('carCounts').getValue();
	param[param.length] = "startTime=" + Ext.getCmp('startdate').getValue();
	param[param.length] = "endTime=" + Ext.getCmp('enddate').getValue();
	return param;
}

Ext.reg('northFormPanel', Jinpeng.resultQuery.NorthFormPanel);
Ext.reg('gisDataPanel', Jinpeng.resultQuery.GisDataPanel);
Ext.reg('gisGridPanel', Jinpeng.resultQuery.FrequencyStatisticsGridPanel);