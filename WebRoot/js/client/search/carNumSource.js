/**
 * 车辆库查询
 */
Ext.ns('Jinpeng.source');

var viewPort = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'north',
			height : 95,
			border : false,
			xtype : 'carNumSourceFormPanel'
		}, {
			region : 'center',
			border : false,
			xtype : 'carNumSourceGridPanel'
		}]
	});
});

/**
 * 车辆库查询--Form
 */
Jinpeng.source.CarNumSourceFormPanel = Ext.extend(Ext.Panel, {
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
		
		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'carNumSourceForm',
				border : false,
				frame : true,
				labelAlign : 'right',
				cls : 'blue-button-ct',
				
				layout : 'table',
				defaults : {
					width : 280,
					layout : 'form'
				},
				layoutConfig : {
					columns : 3
				},
				
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
					items : [{
                    	xtype : 'combo',
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
						anchor : '94%',
						value :'粤A',
						listeners : {
						select : function () {
								Ext.getCmp("carfnum").focus(false, 100);   
							}
						}
					}]
				},{
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
						id : 'carColor',
						name : 'carColor',
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
						id : 'carType',
						name : 'carType',
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
				},{
					items : [ {
						xtype : 'textfield',
						fieldLabel : '身份证号码',
						name : 'SFZH',
						id : 'SFZH',
						anchor : '94%'
					} ]
				},{
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
				}, {
					items : [{
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
						id : 'searchBut',
						handler : this.deviceCheck
					}]
				}]
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
		Jinpeng.source.CarNumSourceFormPanel.superclass.initComponent.apply(this);
	},
	deviceCheck : function() {
		var form = Ext.getCmp('carNumSourceForm');
		if(form.getForm().isValid()) {
			var grid = Ext.getCmp('carNumSourceDataGrid');
			grid.store.baseParams = {};
			var carFNum = Ext.get('carfnum').getValue() =='全部'? '': Ext.get('carfnum').getValue();
			//var carBNum = Ext.getCmp('carbnum').getValue();
			var carNum = carFNum;
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
			grid.store.load({
				params : {'page.start' : 0, 'page.limit' : Jinpeng.PageSize}
			});
		}
	}
});

/**
 * 车辆库查询--Grid
 */
Jinpeng.source.CarNumSourceGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'carNumSourceDataGrid',
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var commuServerStore = new Ext.data.JsonStore({
			url : rootpath+ "/car/query/carNumSource.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
		          {name : 'HPHM'},
		          {name : 'CSYS'},
		          {name : 'HPZL'},
		          {name : 'CLXH'},
		          {name : 'JDCSYR'},
		          {name : 'LXFS'},
		          {name : 'SFZH'},
		          {name : 'CLSBDH'},
		          {name : 'CLPP1'},
		          {name : 'DJZZXZ'}
	          ]
		});
		var sm = new Ext.grid.CheckboxSelectionModel();
		Ext.apply(this, {
			store :  commuServerStore,
			selModel : sm,
			colModel : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
			           new Ext.ux.grid.PagingRowNumberer({ width : 40 }),
			           //sm,
			           {header : '车牌号码', dataIndex : 'HPHM', renderer: function(val, metaData, record) {
							var str = "";
							str = "<a href='#' onclick=\"showCarPlace('" + val + "')\">" + val + "</a>";
							return str;
					   }},
			           {header : '车身颜色', dataIndex : 'CSYS', renderer : function(key) {
							return window.dictionary.getValue("CarColor", key);
						}},
			           {header : '号牌种类', dataIndex : 'HPZL', renderer : function(key) {
							return window.dictionary.getValue("LicPlateType", key);
						}},
			           {header : '车辆类型', dataIndex : 'CLXH', renderer : function(key) {
							var str = '';
							if (key == '' || key == null) {
								str = '';
							} else {
								str = window.dictionary.getValue("CarType", key);
							}
							return str;
						}},
			           {header : '车主姓名', dataIndex : 'JDCSYR'},
			           {header : '联系方式', dataIndex : 'LXFS'},
			           {header : '身份证号', dataIndex : 'SFZH'},
			           {header : '车辆识别代号', dataIndex : 'CLSBDH'},
			           {header : '车辆品牌', dataIndex : 'CLPP1'},
			           {header : '家庭住址', dataIndex : 'DJZZXZ'}
	            ]
			}),
			bbar : new Jinpeng.widget.PagingToolbar( {
				id : 'PagingToolbar',
				store : commuServerStore,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			})
		});
		Jinpeng.source.CarNumSourceGridPanel.superclass.initComponent.apply(this);
	}
});

function showCarPlace(carNum) {
	var orgId ='';
	var orgType = '';
	var kkbhs = '';
	var nowDate = new Date();
	var nowDateStr = Ext.util.Format.date(nowDate, 'Y-m-d') + ' 23:59:59';
	nowDate.setDate(nowDate.getDate() - 1);
	var oldDateStr = Ext.util.Format.date(nowDate, 'Y-m-d H:i:s');
	var mainParam = {
		'orgId' : orgId,
		'orgType' : orgType,
		'kkbhs' : kkbhs,
		'startTime' : oldDateStr,
		'endTime' : nowDateStr,
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

Ext.reg('carNumSourceFormPanel', Jinpeng.source.CarNumSourceFormPanel);
Ext.reg('carNumSourceGridPanel', Jinpeng.source.CarNumSourceGridPanel);
