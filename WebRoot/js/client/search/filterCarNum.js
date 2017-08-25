Ext.ns('Jinpeng.carNum');

/**
 * 车牌选择
 * 
 * @class Jinpeng.carNum.HistoryCarSelector
 */
Jinpeng.carNum.HistoryCarSelector = Ext.extend(Ext.form.TriggerField, {
	hideTrigger : true,
	editable : false,
	callBackFun : null,
	/**
	 * @cfg 弹出窗口的Title
	 * @type String
	 */
	winTitle : '筛选车牌号码',
	
	onTriggerClick : function() {
		var placeSelector = this;
		this.placeContentWindow = new Ext.Window({
			title : this.winTitle,
			closable : true,
			x : 121,
			y : 29,
			width : 900,
			height : 500,
			closeAction : "close",
			layout : 'fit',
			padding : 10,
			callback : null,
			draggable : false,
			modal : true,
			items : [  this.chooser = new Jinpeng.carNum.CarNumFormPanel({
				margins : '5',
				region : 'center',
				callBackFun : function() {
					var records = Ext.getCmp('carNumRecordGridPanel').getSelectionModel().getSelections();
					if (records.length > 10) {
						var win = new Jinpeng.widget.MessageWindow();
						win.msg = "最多只能选十个车牌，请重新选择！";
						win.show();
						return;
					}
					var carNums = [];
					for ( var i = 0; i < records.length; i++) {
						carNums[carNums.length] = records[i].get('HPHM');
					}
					placeSelector.placeContentWindow.close.defer(100, placeSelector.placeContentWindow);
					// 这里不能马上关闭，否则上面的树会被销毁 找不到
					placeSelector.setValues(carNums);
				}
			}) ],
			bbar : {
				cls : 'blue-button-ct',
				buttonAlign : 'center',
				buttons : [ {
					xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;',
					handler : function(btn, event) {
						var window = btn.ownerCt.ownerCt.get(0);
						window.callBackFun();
					}
				}, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', {
					xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;',
					handler : function(btn, event) {
						btn.ownerCt.ownerCt.closeWindow(false);
					}
				} ]
			},
			/**
			 * 关闭窗口，并执行回调函数
			 */
			closeWindow : function(returnValue) {
				this.close();
			}
		});
		this.placeContentWindow.show();
	},
	setValues : function(returnValue) {
		this.callBackFun({
			data : returnValue
		});
	}
});

/**
 * north区域表单部份
 */
Jinpeng.carNum.CarNumFormPanel = Ext.extend(Ext.Panel,{
	
	callBackFun : null,
	
	initComponent : function() {
	
		//车牌号
		var carNumStore = new Ext.data.JsonStore({
			url : rootpath
					+ "/dictionary/jsonDictsInCombo.mvc?code=LicPlate",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false
		});
		
		//号牌种类
		var carNumTypeStore =  new Ext.data.JsonStore({
			url : rootpath + '/dictionary/jsonDictsInCombo.mvc',
			baseParams : {
				code : 'LicPlateType'
			},
			root : 'data',
			fields : [ 'id', 'text' ]
		}); 
	
		//车辆颜色
		var carColorStore =  new Ext.data.JsonStore({
			url : rootpath + '/dictionary/jsonDictsInCombo.mvc',
			baseParams : {
				code : 'CarColor'
			},
			root : 'data',
			fields : [ 'id', 'text' ]
		}); 
		
		//车辆类型
		var carTypeStore = new Ext.data.JsonStore({
			url : rootpath + '/dictionary/jsonDictsInCombo.mvc',
			baseParams : {
				code : 'CarType'
			},
			root : 'data',
			fields : [ 'id', 'text' ]
		});
		
		/** 设定参数 */
		Ext.apply(	this,{
			layout : 'border',
			border : false,
			defaults : {
				margins : '0 0 0 0'
			},
			items : [ {
				region : 'north',
				height : 95,
				// form表单
				xtype : 'form',
				id : 'searchHistoryCarNumForm',
				border : false,
				frame : true,
				cls : 'blue-button-ct',
				layout : 'table',
				defaults : {
					layout : 'form',
					//统一宽度
					width : 280
				},
				layoutConfig : {
					columns : 3
				},
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
					items : [{
                    	xtype : 'tcombo',
						id : 'carfnum',
						name:'carfnum',
						fieldLabel : '车牌号码',
						editable : true,
						store : carNumStore,
						mode : 'local',
						emptyText : '全部',
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'text',
						vtype:'carNumUpper',
						anchor : '94%'
					}]
				}, {
					// 第一行
					items : [ {
						xtype : 'tcombo',
						id : 'HPZL',
						name : 'HPZL',
						fieldLabel : '号牌种类',
						store : carNumTypeStore,
						mode : 'local',
						emptyText : '全部',
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'text',
						anchor : '94%'
					} ]
				}, {
					items : [ {
						xtype : 'tcombo',
						id : 'carColor1',
						name : 'carColor1',
						fieldLabel : '车身颜色',
						store : carColorStore,
						mode : 'local',
						emptyText : '全部',
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'text',
						anchor : '94%'
					}]
				}, {
					// 第二行
					items : [ {
						xtype : 'tcombo',
						fieldLabel : '&nbsp;车辆类型',
						id : 'carType1',
						name : 'carType1',
						blankText : '请选择车辆类型',
						anchor : '94%',
						mode : 'local',
						editable : false,
						selectOnFocus : true,
						forceSelection : true,
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'text',
						emptyText : '请选择...',
						store : carTypeStore
					}]
				}, {
					items : [ {
						xtype : 'textfield',
						fieldLabel : '车辆品牌',
						name : 'CLPP1',
						id : 'CLPP1',
						anchor : '94%'
					} ]
				}, {
					items : [ {
						xtype : 'textfield',
						fieldLabel : '身份证号码',
						name : 'SFZH',
						id : 'SFZH',
						anchor : '94%'
					} ]
				}, {
					// 第三行
					items : [ {
						xtype : 'textfield',
						fieldLabel : '车主姓名',
						name : 'JDCSYR',
						id : 'JDCSYR',
						anchor : '94%'
					} ]
				},{
					items : [ {
						xtype : 'textfield',
						fieldLabel : '车辆识别代号',
						name : 'CLSBDH',
						id : 'CLSBDH',
						anchor : '94%'
					} ]
				},{
					items : [{
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
						id : "searchBut",
						handler : this.carNumSearch
					}]
				}], 
			}, {
				region : 'center',
				margins:'10 0 0 0',
				xtype : 'carNumGridPanel',
				ref : "../grid"
			}],
			listeners : {
				afterrender : function() {
					carNumStore.load();
					carNumTypeStore.load();
					carColorStore.load();
					carTypeStore.load();
				}
			}
		});
		Jinpeng.carNum.CarNumFormPanel.superclass.initComponent.apply(this);
	},
	afterRender : function(ct, position) {
		Jinpeng.carNum.CarNumFormPanel.superclass.afterRender.apply(this, arguments);
	},
	//响应查询按钮
	carNumSearch : function() {
		var form = Ext.getCmp('searchHistoryCarNumForm');
		if (form.getForm().isValid()) {
			var grid = Ext.getCmp('carNumRecordGridPanel');
			grid.store.baseParams = {};// 重置
			var carFNum = Ext.get('carfnum').getValue() =='全部'? '': Ext.get('carfnum').getValue();
			//var carBNum = Ext.getCmp('carbnum').getValue();
			var carNum = carFNum;
			/** 将参数传入后台 */
			var baseparams = {
				"carNum" : carNum,
				"CLPP1" : Ext.getCmp('CLPP1').getValue(),
				"carColor" : Ext.getCmp('carColor').getValue(),
				"carType" : Ext.getCmp('carType').getValue(),
				"SFZH" : Ext.getCmp('SFZH').getValue(),
				"JDCSYR" : Ext.getCmp('JDCSYR').getValue(),
				"HPZL" : (Ext.getCmp('HPZL').getValue() == '' ? -1 : Ext.getCmp('HPZL').getValue()),
				"CLSBDH" : Ext.getCmp('CLSBDH').getValue()
			};
			grid.store.baseParams = baseparams;
			/*刷新选中*/
			this.publish("clearGridSelections",[]);
			grid.store.load({
				params : {
					'page.start' : 0,
					'page.limit' : Jinpeng.PageSize
				}
			});
		}
	}
});


/**
 * 列表数据Store
 */
var carNumInfoStore = new Ext.data.JsonStore({
	url : rootpath + "/car/query/mulit/historyCarSource.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	remoteSort : true,
	fields : [
	      {name : 'HPHM'},
          {name : 'HPZL'},
          {name : 'JDCSYR'},
          {name : 'LXFS'},
          {name : 'SFZH'}
      ]
});
/**
 * 中心右区域数据显示中心
 */ 
Jinpeng.carNum.CarNumGridPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'carNumRecordGridPanel',
	frame : false,
	border : false,
	pageSize : Jinpeng.PageSize,
	callBackFun : null,
	initComponent : function() {
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this,{
			store : carNumInfoStore,
			cm : new Ext.grid.ColumnModel({
				defaults : {
					sortable : true
				},
				columns : [
					new Ext.ux.grid.PagingRowNumberer({ width : 40}),
					sm,
					{
						header : "车牌号码", dataIndex : 'HPHM'
					}, {
						header : "车牌种类", dataIndex : 'HPZL',
						renderer : function(key) {
							return window.dictionary.getValue("CarNumType", key);
						}
					}, 
					{
						header : '车主姓名', dataIndex : 'JDCSYR'
					},
		            {
						header : '联系方式', dataIndex : 'LXFS'
					},
		            {
						header : '身份证号', dataIndex : 'SFZH'
					} ]
				}
			),
			selModel : sm,
			bbar : new Jinpeng.widget.PagingToolbar( {
				id : 'PagingToolbarCar',
				store : carNumInfoStore,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			})
		});
		Jinpeng.carNum.CarNumGridPanel.superclass.initComponent.apply(this);
	},
	confimSelect : function(btn) {
		var gridPanel = btn.ownerCt.ownerCt.ownerCt;
		var records = Ext.getCmp('carNumRecordGridPanel').getSelectionModel().getSelections();
		var carNums = [];
		for ( var i = 0; i < records.length; i++) {
			carNums[carNums.length] = records[i].get('HPHM');
		}
		if ( gridPanel.callBackFun) {
			gridPanel.callBackFun(carNums);
		}
	}
});

/**
 * @class Jinpeng.carNum.CarNumChooseWindow
 * @extends Ext.Viewport
 * @author Teon
 * 选择车牌号码窗口
 * @constructor 创建一个CarNumChooseWindow
 * @param {Object} [config] 配置信息
 */
Jinpeng.carNum.CarNumChooseWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	/**
	 * @cfg {String} [title=选择账号] 标题
	 */
	title : '车牌号码筛选',
	/**
	 * @cfg {Number} [width=400] 宽度
	 */
	width : 700,
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
	 * 
	 * <div class="mdetail-params">
	 * <ul>
	 * <li><code>result</code> : Object <div class="sub-desc">选中的记录</div></li>
	 * </ul>
	 * </div>
	 */
	callback : null,
	buttons : [ {
		text : '&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;',
		xtype : 'button',
		handler : function(btn, event) {
			var records = Ext.getCmp('carNumRecordGridPanel').getSelectionModel().getSelections();
			var carNums = [];
			for ( var i = 0; i < records.length; i++) {
				carNums[carNums.length] = records[i].get('HPHM');
			}
			var window = btn.ownerCt.ownerCt;
			window.closeWindow(carNums);
			//var window = btn.ownerCt.ownerCt;
			//window.closeWindow(window.get(0).selections);
		}
	}, {
		text : '&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;',
		xtype : 'button',
		handler : function(btn, event) {
			btn.ownerCt.ownerCt.closeWindow(false);
		}
	} ],
	constructor : function(config) {
		Ext.apply(this, config);
		this.items = [ this.chooser = new Jinpeng.carNum.CarNumFormPanel({
			margins : '5',
			region : 'center'
		}) ];
		Jinpeng.carNum.CarNumChooseWindow.superclass.constructor.apply(this, arguments);
	},
	/**
	 * 初始化数据
	 */
	init : function(data) {
		this.chooser.init(data);
	},
	/**
	 * 关闭窗口，并执行回调函数
	 */
	closeWindow : function(returnValue) {
		if (typeof this.callback == 'function') {
			this.callback({
				data : returnValue
			});
		}
		this.close();
	}
});

Ext.reg('carNumSelecter', Jinpeng.carNum.HistoryCarSelector);
Ext.reg('carNumFormPanel', Jinpeng.carNum.CarNumFormPanel);
Ext.reg('carNumGridPanel',Jinpeng.carNum.CarNumGridPanel);
Ext.reg('carNumChoose', Jinpeng.carNum.CarNumChooseWindow);