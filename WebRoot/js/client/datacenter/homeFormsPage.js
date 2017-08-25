Ext.ns('Jinpeng.home.page');

var hh = Ext.getBody().getHeight() / 2;
var ww = Ext.getBody().getWidth();
var wmount = ww - 400 - 400 - 15 - 10 - 10;
var wcar = ww / 2;

/**
 * 系统首页
 */
Ext.onReady(function(){
	new Jinpeng.home.page.HomePageViewport();
});

//function showAlarmWin(){
//	var childUrl=rootpath + "/controlAlarm/alarmWarnPage.mvc";
//	var win = new Ext.Window({
//		width:400,
//		height:300,
//		//layout: "fit",
//		title:"告警提醒",
//		maximizable:true,
//		minimizable: true,
//	//	plain:true,	  
//		html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src='+childUrl+'></iframe>'
//		});
//		//alert("height===="+document.documentElement.clientHeight+"/"+document.body.clientHeight);
//		win.setPagePosition(document.body.clientWidth-400,document.body.clientHeight-300);
//		win.show();
//}

/**
 * @class Jinpeng.home.page.HomePageViewport
 * @extends Ext.Viewport
 * @author lsg
 */
Jinpeng.home.page.HomePageViewport = Ext.extend(Ext.Viewport, {
	layout : 'fit',
	constructor : function(config) {
		Ext.apply(this, config);
		this.main = new Jinpeng.home.page.SettingPanel({});
		this.items = [ this.main ];
		Jinpeng.home.page.HomePageViewport.superclass.constructor.apply(this, arguments);
	},
	//渲染后加载数据
	afterRender : function() {
		Jinpeng.home.page.HomePageViewport.superclass.afterRender.apply(this, arguments);
		mountColumnStore.load({
			params : Jinpeng.onlineColumn.MountColumnConfig,
			callback : function(pDatas) {
				mountColumnStore.fireEvent('datachanged', mountColumnStore);
			}
		});
		dataChartStore.load({
			params : Jinpeng.lineStatus.DataLineConfig,
			callback : function() {
				dataChartStore.fireEvent('datachanged', dataChartStore);
			}
		});
	}
});

/**
 * @class Jinpeng.home.page.SettingPanel
 * @extends Ext.Panel
 * @author lsg
 */
Jinpeng.home.page.SettingPanel = Ext.extend(Ext.Panel, {
	//padding : '10',
	initComponent : function() {
		Ext.apply(	this,{
			border : false,
			bodyStyle:'background:#ffc;',
			items : [{
				layout : "column",
				anchor : '100%',
				items : [{
					items : [{
						xtype : 'panel',
						bodyStyle:'background:#4d4948;',
						layout : 'table',
						layoutConfig : {
							columns : 7
						},
						items : [{
							xtype : 'spacer',
							width : 5
						}, {
							xtype : 'fieldset',
							title : '&nbsp;异常信息&nbsp;',
							width : 400,
							height : hh - 30,
							items : [{
								layout : 'column',
								height : hh - 30,
								items : [{
									columnWidth : 1.0,
									padding : 30,
									layout : 'form',
									width : 250,
									bodyStyle : 'font-size: 17;',
									items : [{
										items : [{
											xtype : 'displayfield',
											value : '<a href="#">粤A12345</a> <img src="' + rootpath + '/themes/client/blue/images/alarm/linkCarNum.png" \>',
											labelStyle : "text-align:right;width:0;",
											anchor : '100%'
										}]
									}, {
										items : [{
											xtype : 'displayfield',
											value : '<a href="#">粤A12345</a> <img src="' + rootpath + '/themes/client/blue/images/alarm/linkCarNum.png" \>',
											labelStyle : "text-align:right;width:0;",
											anchor : '100%'
										}]
									}, {
										items : [{
											xtype : 'displayfield',
											value : '<a href="#">粤A12345</a> <img src="' + rootpath + '/themes/client/blue/images/alarm/linkCarNum.png" \>',
											labelStyle : "text-align:right;width:0;",
											anchor : '100%'
										}]
									}, {
										items : [{
											xtype : 'displayfield',
											value : '<a href="#">粤A12345</a> <img src="' + rootpath + '/themes/client/blue/images/alarm/linkCarNum.png" \>',
											labelStyle : "text-align:right;width:0;",
											anchor : '100%'
										}]
									}]
								}]
							}]
						}, {
							xtype : 'spacer',
							width : 10
						}, {
							xtype : 'fieldset',
							title : '&nbsp;卡口在线状态&nbsp;',
							width : wmount,
							height : hh  - 30,
							items : [{
								xtype : 'charDataPanel'
							}]
						}, {
							xtype : 'spacer',
							width : 10
						}, {
							xtype : 'fieldset',
							title : '&nbsp;我的工作台&nbsp;',
							width : 405,
							height : hh  - 30,
							items : [{
								layout : 'column',
								height : hh - 30,
								items : [{
									columnWidth : 1.0,
									padding : 30,
									layout : 'form',
									width : 250,
									bodyStyle : 'font-size: 17;',
									items : [{
										items : [{
											xtype : 'displayfield',
											value : '当前无任何数据需要您处理！',
											labelStyle : "text-align:right;width:0;",
											anchor : '100%'
										}]
									}]
								}]
							}]
						}, {
							xtype : 'spacer',
							width : 5
						}]
					}, {
						xtype : 'panel',
						bodyStyle:'background:#4d4948;',
						layout : 'table',
						layoutConfig : {
							columns : 4
						},
						items : [{
							xtype : 'spacer',
							width : 5
						}, {
							xtype : 'fieldset',
							title : '&nbsp;车流量统计&nbsp;',
							width : wcar - 15,
							height : hh,
							items : [{
								xtype : 'charLinePanel'
							}]
						}, {
							xtype : 'spacer',
							width : 10
						}, {
							xtype : 'fieldset',
							title : '&nbsp;布控及告警统计&nbsp;',
							width : wcar - 5,
							height : hh,
							items : [{
								html : "<iframe src='http://" + ipAdress + "/Big_Data/alarmStaticsReport.jsp' width='100%' height='" + hh + "' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
							}]
						}, {
							xtype : 'spacer',
							width : 5
						}/*, {
							xtype : 'spacer',
							width : 10
						}, {
							xtype : 'fieldset',
							title : '&nbsp;实时告警&nbsp;',
							width : 400,
							height : hh
						}*/]
					
					}]
				}]
			}]
		});
		Jinpeng.home.page.SettingPanel.superclass.initComponent.apply(this);
	}
});
