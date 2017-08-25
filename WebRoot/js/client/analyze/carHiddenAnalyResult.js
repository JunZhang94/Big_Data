/**
 * 隐匿车辆分析入口
 */
Ext.ns("Jinpeng.carHiddenAnalysisResult");

var viewPortObj = null;
var downPictureWindow = null;

var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
var gisHeight = hh - 60;
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
	var passport;
	passport = data.id;
	if(data.org_type == "2" ){ //如果是卡口，卡口编号前三位要去掉
		passport = (data.id).substring(3);
	}
	Ext.getCmp('passport').setValue(passport);
	Ext.getCmp('passStation').setValue(data.text);
	Ext.getCmp('mywin1').hide();
};
var params;//查询条件
var exportParams;//导出结构查询参数
var conditions;//页面查询组件
var queryUrl = '';
Ext.onReady(function() {
	params = parent.window.opener.params;
	exportParams=parent.window.opener.exportParams;
	conditions = parent.window.opener.conditions;
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport({
		layout : 'border',
		items : [{
				// north区域表单
					region : 'north',
					border : false,
					height : 120,
					// 自定标签
					xtype : 'FormPanel'
			},{
			region : 'center',
			border : false,
			xtype : 'DataPanel'
		} ]
	});
	//默认加载查询功能
	Ext.getCmp('resultPanel').resultQueryMethod();
});
//表单
Jinpeng.carHiddenAnalysisResult.FormPanel = Ext.extend(Ext.Panel,{
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
				}
			}
		});
		Jinpeng.carHiddenAnalysisResult.FormPanel.superclass.initComponent.apply(this);
	},
	//查询
	resultQueryMethod : function() {
		var grid = Ext.getCmp('carHiddenAnalysisPanel');
		grid.store.baseParams = {};// 重置
		grid.store.baseParams = params;
		/*刷新选中*/
		this.publish("clearGridSelections",[]);
		grid.store.load({
			params : {
				'page.start' : 0,
				'page.limit' : 15
			}
		});
	}
});

var alarmSearchStore;
Jinpeng.carHiddenAnalysisResult.DataPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'carHiddenAnalysisPanel',
	border : false,
	frame : false,
	pageSize : 15,
	initComponent : function() {
		// 所需数据
		alarmSearchStore = new Ext.data.JsonStore({
			url : rootpath + "//carHiddenAnaly/doAnalyHiddenCar.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			remoteSort : true,
			fields : [ {
				name : 'xxbh'
			}, {
				name : 'jgsj'
			}, {
				name : 'kkbh'
			}, {
				name : 'kkmc'
			}, {
				name : 'hphm'
			}, {
				name : 'beforeTimes'
			}, {
				name : 'afterTimes'
				}]
		});
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this,{
			store : alarmSearchStore,
			cm : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
						new Ext.ux.grid.PagingRowNumberer({width : 40}),
					//	sm,
						{
							header : '车牌号码',
							dataIndex : 'hphm'
						},{
							header : '案发前过车次数',
							dataIndex : 'beforeTimes'
						},{
							header : '案发后过车次数',
							dataIndex : 'afterTimes'
						},{
							header : '案发前抓拍时间',
							width : 180,
							dataIndex : 'jgsj'
						},{
							header : '案发前抓拍地点',
							dataIndex : 'kkmc'
						},{
							header : '操作',
							dataIndex : 'hphm',
	                    	width : 100,
	                    	align : 'center',
	                    	renderer:function(value,meta,record){
							var resultStr = "<a href='#' onclick=\"showCarDetail('" + value +"')\">" + "查看详情</a>";
							return resultStr;
						}
						} ]
			}),
			//selModel : sm,
			bbar : new Jinpeng.widget.PagingToolbar( {
				id : 'PigPagingToolbarCar',
				store : alarmSearchStore,
				//displayInfo : true,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			})
				
		});
		Jinpeng.carHiddenAnalysisResult.DataPanel.superclass.initComponent.apply(this);
	}
});
function showCarDetail(carNum) {
	params.carNum=carNum;
	params.pageFlag="carHidden";
	var url = rootpath + '/carType/generalQueryResultPage.mvc';
	queryUrl =  "/carType/testCarSearch.mvc";
	//var url = rootpath + '/carHiddenAnaly/carHiddenAnalyResult.mvc';
	var title = '隐匿车辆明细';
	var win = window.open(rootpath + "/user/toMainInfo.mvc");
	var bodyText = '<html><body>';  
	bodyText = '<form action="' + rootpath + '/user/toMainInfo.mvc" method="post">';  
	bodyText += '<input type="hidden" name="urlStr" value="'+ url +'" />';  
	bodyText += '<input type="hidden" name="title" value="'+ title +'" />';  
	bodyText += '</form></body></html>';  
	win.document.write(bodyText);  
	win.document.forms[0].submit(); //打开url新页面，然后直接post提交form，并且传递参数  
	win.focus();
}

Ext.reg('FormPanel', Jinpeng.carHiddenAnalysisResult.FormPanel);
Ext.reg('DataPanel', Jinpeng.carHiddenAnalysisResult.DataPanel);