/**
 * 卡口在线状态柱状图
 */
Ext.ns("Jinpeng.onlineColumn");

/**
 * 卡口在线状态,柱状图
 * @type
 */
Jinpeng.onlineColumn.MountColumnConfig = {
	//url : rootpath + "/mountOnline/mountStatusOnlyCulumn.mvc",
	url : rootpath + "/mountOnline/firstPageStatus.mvc",
	root : 'data',
	fields : ['PERIOD', 'COUNT', 'OUT', 'COUNT_DESC', 'DATA_NUMBER', 'PERCENTAGE']
};

/*var viewPort = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'center',
			border : false,
			xtype : 'charDataPanel',
        	autoScroll : true
		}],
		listeners : {
			afterrender : function() {
				mountColumnStore.load({
					params : Jinpeng.onlineColumn.MountColumnConfig,
					callback : function(pDatas) {
						mountColumnStore.fireEvent('datachanged', mountColumnStore);
					}
				});
			}
		}
	});
});*/

/**
 * @class Jinpeng.TabPanel 工作区标签页组件
 * north区域表单部份
 */
Jinpeng.onlineColumn.CharDataPanel = Ext.extend(Ext.Panel,{
	initComponent : function() {
		Ext.apply(	this,{
			border : false,
			items : [ {
				layout : 'column',
				items : [ {
					xtype : 'mountOnlinePanel'
				}]
			}]
		});
		Jinpeng.onlineColumn.CharDataPanel.superclass.initComponent.apply(this);
	},
	afterRender : function(ct, position) {
		Jinpeng.onlineColumn.CharDataPanel.superclass.afterRender.apply(this, arguments);
	}
});

//柱状图数据store
var mountColumnStore;

/**
 * 数据列表和柱状图Panel
 * @class Jinpeng.onlineColumn.GatherStatisticsPanel
 */
Jinpeng.onlineColumn.MountOnlienPanel = Ext.extend(Ext.Panel, {
	id : "mountOnlienPanelId",
	initComponent : function() {
		var _panel = this;
		var config = {
			items : [ {
				gridflag : 'culumn',
				layout:'fit',
				items :[{
					xtype : 'mountColumnChart',
					ref:"hChart",
					chartIDPrefix : "mountOnlineColumn",
					storeConfig : Jinpeng.onlineColumn.MountColumnConfig,
					id : 'mountOnlineColumnChart'
				}]

			}]
		};
		Ext.apply(this, config);
		Jinpeng.onlineColumn.MountOnlienPanel.superclass.initComponent.apply(this, arguments);
	},
	mountQueryMethod : function(values) {
		mountColumnStore.load({
			params : {
				'culumnOline' : values
			},
			callback : function() {
				mountColumnStore.fireEvent('datachanged', mountColumnStore);
			}
		});
	},
	afterRender : function() {
		Jinpeng.onlineColumn.MountOnlienPanel.superclass.afterRender.apply(this, arguments);
		this.items.each(function(item, index, length) {
		});
	}
});

Ext.reg('mountOnlinePanel', Jinpeng.onlineColumn.MountOnlienPanel);
Ext.reg('charDataPanel', Jinpeng.onlineColumn.CharDataPanel);
