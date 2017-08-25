//昼伏夜出分析结果集页面
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
			height : 130,
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
			var grid = Ext.getCmp('dataGridPanel');
			grid.store.baseParams = {};
			var baseparams = praParams;
			grid.store.baseParams = baseparams;
			/*刷新选中*/
			this.publish("clearGridSelections",[]);
			grid.store.load({
				params : {'page.start' : 0, 'page.limit' : Jinpeng.PageSize}
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
		var hh = Ext.getBody().getHeight() - 132;
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

var nightDazedStore;
Jinpeng.resultQuery.NightAndDazedGridPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'dataGridPanel',
	border : false,
	frame : false,
	height : Ext.getBody().getHeight() - 130,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		// 所需数据
		nightDazedStore = new Ext.data.JsonStore({
			url : config.queryUrl,
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			remoteSort : true,
			fields : [ {
				name : 'dazedCounts'
			}, {
				name : 'nightCounts'
			}, {
				name : 'kkmc'
			}, {
				name : 'hphm'
			}, {
				name : 'controlFlag'
			}, {
				name : 'alarmTimes'
			}]
		});
		Ext.apply(this,{
			store : nightDazedStore,
			cm : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
						new Ext.ux.grid.PagingRowNumberer({width : 40}),
						{
							header : '车牌号码',
							dataIndex : 'hphm',
							renderer: function(val, metaData, record) {
								var str = "";
								var counts = 10;
								if (val != '-' && val != '无车牌' && val != '无牌' && val != '车牌' && val != null && val != '—' && val != 'null') {
									str = "<a href='#' onclick=\"showCarPlace('" + val + "','" + counts + "')\">" + val + "</a>";
								} else {
									str = '无';
								}
								return str;
							}
						},{
							header : '白天出现次数',
							dataIndex : 'dazedCounts'
						},{
							header : '夜间出现次数',
							dataIndex : 'nightCounts'
						},{
							header : '是否布控车牌',
							width : 180,
							dataIndex : 'controlFlag',
							renderer: function(val, metaData, record) {
								var str = "";
								if (val == '1') {
									str = "是";
								} else {
									str = '否';
								}
								return str;
							}
						},{
							header : '告警次数',
							dataIndex : 'alarmTimes'
						} ]
			}),
			bbar : new Jinpeng.widget.PagingToolbarNoPage( {
				id : 'PagingToolbar',
				store : nightDazedStore,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			}),
		});
		Jinpeng.resultQuery.NightAndDazedGridPanel.superclass.initComponent.apply(this);
	}
});

function showCarPlace(carNum, counts) {
	var orgId ='';
	var orgType = '';
	var kkbhs = '';
	var startTime = Ext.getCmp('startdate').getValue() + " 00:00:00";
	var endTime = Ext.getCmp('enddate').getValue() + " 23:59:59";
	var mainParam = {
		'orgId' : orgId,
		'orgType' : orgType,
		'kkbhs' : kkbhs,
		'startTime' : startTime,
		'endTime' : endTime,
		'carNum' : carNum,
		'counts' : 500
	};
	var win = new Jinpeng.trackSearch.TrackSeachWindow({
		cls : 'system_mod',
		modal : true,
		mainParam : mainParam
	});
	win.init(mainParam);
	win.show();
}

Ext.reg('northFormPanel', Jinpeng.resultQuery.NorthFormPanel);
Ext.reg('gisDataPanel', Jinpeng.resultQuery.GisDataPanel);
Ext.reg('gisGridPanel', Jinpeng.resultQuery.NightAndDazedGridPanel);