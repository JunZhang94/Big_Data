/**
 * 落脚点清单展现
 */
Ext.ns("Jinpeng.stopAnalyList");


/**
 * @class Jinpeng.trackSearch.TrackSeachChooseWindow
 * @extends Ext.Viewport
 * @author Teon
 * 选择车牌号码窗口
 * @constructor 创建一个TrackSeachChooseWindow
 * @param {Object} [config] 配置信息
 */
Jinpeng.stopAnalyList.DetailWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	/**
	 * @cfg {String} [title=选择账号] 标题
	 */
	title : '车牌号码筛选',
	/**
	 * @cfg {Number} [width=400] 宽度
	 */
	width : 800,
	/**
	 * @cfg {Number} [height=450] 高度
	 */
	height : 500,
	/**
	 * @cfg {String} [layout=border] 布局
	 */
	layout : 'border',
	/**
	 * @cfg {Function} [callback] 窗口关闭的回调函数，参数如下
	 * <div class="mdetail-params">
	 * <ul>
	 * <li><code>result</code> : Object <div class="sub-desc">选中的记录</div></li>
	 * </ul>
	 * </div>
	 */
	mainParam : null,
	bbar : {
		cls : 'blue-button-ct',
		buttonAlign : 'center',
		buttons : [ {
			text : '&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;',
			xtype : 'button',
			handler : function(btn, event) {
				btn.ownerCt.ownerCt.closeWindow(false);
			}
		} ]
	},
	constructor : function(config) {
		var window = this;
		Ext.apply(this, config);
		this.items = [ this.chooser = new Jinpeng.stopAnalyList.FormPanel({
			margins : '5',
			region : 'center'
		}) ];
		Jinpeng.stopAnalyList.DetailWindow.superclass.constructor.apply(this, arguments);
	},
	/**
	 * 初始化数据
	 */
	init : function(data) {
//		var hphmStr=this.mainParam.carNum;
//		var hphm=hphmStr.split(";")[0];
		this.title = data.title ;
		this.chooser.init(data);
	},
	/**
	 * 关闭窗口，并执行回调函数
	 */
	closeWindow : function(returnValue) {
		/*if (typeof this.callback == 'function') {
			this.callback({
				data : returnValue
			});
		}*/
		this.close();
	}
});

/**
 * center区域部份
 */
Jinpeng.stopAnalyList.FormPanel = Ext.extend(Ext.Panel,{
	//title : '车牌号码：',
	id : 'FormPanel',
	mainParam : null,
	initComponent : function() {
		Ext.apply(	this,{
			layout : 'border',
			border : false,
			defaults : {
				margins : '0 0 0 0'
			},
			items : [ {
				region : 'center',
				layout : 'column',
				items : [{
					//columnWidth : 0.4,
					xtype : 'gridPanel'
				}]
			}]
		});
		Jinpeng.stopAnalyList.FormPanel.superclass.initComponent.apply(this);
	},
	afterRender : function(ct, position) {
		Jinpeng.stopAnalyList.FormPanel.superclass.afterRender.apply(this, arguments);
	},
	init : function(data) {
		
		this.mainParam = data;
	}
});

/**
 * 中心右区域数据显示中心
 */ 
Jinpeng.stopAnalyList.GridPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'gridPanel',
	frame : false,
	border : false,
	height : 420,
	pageSize : 3,
	initComponent : function() {
		var _panel = this;
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this,{
			store : trackSearchInfoStore,
			columns : [
				new Ext.ux.grid.PagingRowNumberer({ width : 40}),
				{
//					header : '卡口名称',
//					width : 180,
//					hidden : true,
//					dataIndex : 'kkmc'
//				},{
					header : '经过时间',
					width : 180,
					dataIndex : 'jgsj',
			        renderer: function (val) {
			        	if (val) {
			        		return Ext.util.Format.date(new Date(Number(val)), 'Y-m-d H:i:s');
			        	}
			        	return "";
			        }
				},{
					header : '过车图片',
					width : 180,
					dataIndex : 'tx1',
					 renderer: function (val) {
			        	if (val) {
			        		 return "<img src='"+val+"' width='200px' height='100px'/>";
			        	}
			        	return "";
			        }
				}],
				selModel : sm,
				bbar : new Jinpeng.widget.PagingToolbar( {
					id : 'PagingToolbarCar',
					store : trackSearchInfoStore,
					//displayInfo : true,
					pageSize : this.pageSize,
					displayMsg : '{0} - {1} of 共{2}条',
					emptyMsg : "无数据"
				}),
				listeners : {
					afterrender : function() {
						_panel.store.data.length = 0;
						var form = Ext.getCmp('FormPanel');
						var conditions = form.mainParam;
						//页面初始数据需要按当前查询条件
						trackSearchInfoStore.baseParams["kkbh"] = conditions.kkbh;
						trackSearchInfoStore.baseParams["flag"] = conditions.flag; 
						trackSearchInfoStore.load({
							params : {
								'page.start' : 0,
								'page.limit' : this.pageSize
							}
						});
					}
				}
			}
		);
		Jinpeng.stopAnalyList.GridPanel.superclass.initComponent.apply(this);
	}
});
/**
 * 列表数据Store
 */
var trackSearchInfoStore = new Ext.data.JsonStore({
	url : rootpath + "//analyStopCar/getCarList.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	remoteSort : false,
	fields : [
      {name : 'xxbh'},
      {name : 'hphm'},
      {name : 'hpys2'},
      {name : 'hpysmc'},
      {name : 'hpzlmc'},
      {name : 'clsd'}, 
      {name : 'kkmc'}, 
      {name : 'dwmc'}, 
      {name : 'jgsj'},
      {name : 'kkbh'},
      {name : 'sbbh'},
      {name : 'sbmc'},
      {name : 'fxbh'},
      {name : 'fxmc'},
      {name : 'cdbh'},
      {name : 'cwhphm'},
      {name : 'cwhpys'},
      {name : 'hpyz'},
      {name : 'clsd'},
      {name : 'clxs'},
      {name : 'cscd'},
      {name : 'xszt'},
      {name : 'wfzt'},
      {name : 'clpp'},
      {name : 'clwx'},
      {name : 'csys'},
      {name : 'cllx'},
      {name : 'hpzl'},
      {name : 'tx1'},
      {name : 'txsl'}
   ]
});


Ext.reg('gridPanel',Jinpeng.stopAnalyList.GridPanel);


