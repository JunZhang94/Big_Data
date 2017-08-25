//历史过车查询功能JS
Ext.ns("Jinpeng.historyQuery");

var dataCount = 0;
var viewPortObj = null;
var downPictureWindow = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport({
		layout : 'border',
		items : [ {
			//查询表单
			region : 'north',
			border : false,
			height : 35,
			xtype : 'northFormPanel'
		}, {
			//列表数据
			region : 'center',
			border : false,
			xtype : 'gridCenterDataPanel'
		} ]
	});
});

var endTime = Date.parseDate(Ext.util.Format.date(
	new Date(), 'Y-m-d')
	+ " " + "23:59:59", 'Y-m-d H:i:s');


var kwin =new Ext.Window({
	id: "mywin",
	title: "",
	width: 800,
	height: 580,
	//layout: "fit",
	//autoShow: true,
	closeAction:'hide',
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/Big_Data/zTree/demo/cn/excheck/multiSelectTree1.html"></iframe>'
});
var setKKValue=function(data){
	Ext.getCmp('passStation').setValue(data.text);
	Ext.getCmp('kkbhs').setValue(data.id);
	Ext.getCmp('mywin').hide();
};
var cancelKK=function(data){
	Ext.getCmp('passStation').setValue("");
	Ext.getCmp('kkbhs').setValue("");
	Ext.getCmp('mywin').hide();
};
//查询表单
Jinpeng.historyQuery.NorthFormPanel = Ext.extend(Ext.Panel,{
		initComponent : function() {
			//车牌号
			var carNumStore = new Ext.data.JsonStore({
				url : rootpath
						+ "/dictionary/jsonDictsInCombo.mvc?code=LicPlate",
				root : "data",
				fields : [ 'id', 'text' ],
				autoLoad : false
			});
			
			Ext.apply(this,{
				items : [ {
					// form表单
					xtype : 'form',
					id : 'historyQueryForm',
					border : false,
					frame : true,
					cls : 'blue-button-ct',
					layout : 'table',
					defaults : {
						layout : 'form',
						//统一宽度
						width : 380
					},
					bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;margin-left:-10px;',
					items : [{
								items : [ {
									xtype : 'compositefield',
									items : [ {
										flex : 0.5,
										fieldLabel : '卡点',
										xtype : 'tooltiptextfield',
										name : 'passStation',
										id : 'passStation',
										width : 150,
										emptyText : '请选择卡点'
									}, {
										flex : 0.5,
										owner : this,
										labelAlign : 'right',
										xtype : 'button',
										text : '选择卡口',
										id:'choosekkBtn',
										handler : function(){
											kwin.show();
										}
									
									} ]
								} ]
							},{
									xtype : 'compositefield',
									items : [{
										xtype : 'button',
										flex : 31,
										id : "searchBut",
										text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
										handler : this.historyQueryMethod
									}, {
										flex : 31,
										xtype : 'button',
										id : "resetBut",
										text : '&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;',
										handler : this.resetMethod
									}]
							},{
								items : [{
									xtype : 'hidden',
									id : 'kkbhs',
									name : 'kkbhs'
								}]
							}]
				} ],
				listeners : {
					afterrender : function() {
						carNumStore.load();
					}
				}
			});
			Jinpeng.historyQuery.NorthFormPanel.superclass.initComponent.apply(this);
		},
		chooseCarNumHandler : function(btn, event) {
			var chooser = new Jinpeng.carNum.CarNumChooseWindow({
				cls : 'system_mod',
				modal : true,
				callback : function(result) {
					if (result.data) {
						var carNum = '';
						var j = 0;
						for ( var i = 0; i < result.data.length; i++) {
							if (carNum != '') {
								carNum += ',';
							}
							if (result.data[i] != '' && result.data[i] != 'null') {
								carNum += result.data[i];
							}
							j++;
						}
						/*if (j > 10) {
							Ext.Msg.alert('系统提示', '超过十个车牌，建议选择十个车牌以内！');
						}*/
						Ext.getCmp('carNum').setValue(carNum);
					}
				}
			});
			chooser.show();
		},
		//查询
		historyQueryMethod : function() {
			var form = Ext.getCmp('historyQueryForm');
			if (form.getForm().isValid()) {
				var grid = Ext.getCmp('historyGridPanel');
				grid.store.baseParams = {};// 重置
				dataCount = 30 //一次性加载页面数据量
				//将参数传入后台
				var baseparams = {
					"mounts" : Ext.getCmp('kkbhs').getValue(),
					"flag" : "query"
				};
				grid.store.baseParams = baseparams;
				/*刷新选中*/
				this.publish("clearGridSelections",[]);
				grid.store.load({
					params : {
						'page.start' : 0,
						'page.limit' : dataCount
					}
				});
			}
		},
		searchMoreMethod : function() {
			dataCount = dataCount + 30;
			var form = Ext.getCmp('historyQueryForm');
			if (form.getForm().isValid()) {
				var grid = Ext.getCmp('historyGridPanel');
				grid.store.baseParams = {};// 重置
				//将参数传入后台
				var baseparams = {
					"carNum" : Ext.getCmp('carNum').getValue(),
					"mounts" : Ext.getCmp('kkbhs').getValue(),
					"startTime" : Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'),
					"endTime" : Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d H:i:s'),
					"flag" : "query"
				};
				grid.store.baseParams = baseparams;
				/*刷新选中*/
				this.publish("clearGridSelections",[]);
				grid.store.load({
					params : {
						'page.start' : 0,
						'page.limit' : dataCount
					}
				});
			}
		},
		resetMethod :  function() {
			Ext.getCmp('carNum').setValue('');
			Ext.getCmp('passStation').setValue('');
			Ext.getCmp('kkbhs').setValue('');
			Ext.getCmp('startdate').setValue(new Date().format('Y-m-d'));
			Ext.getCmp('enddate').setValue(endTime);
		}
	});

//所需数据
var historyQueryStore = new Ext.data.JsonStore({
	url : rootpath + "/car/query/realTimeQuery.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	remoteSort : true,
	fields : [ {
			name : 'xxbh'
		},{
			name : 'hphm'
		}, {
			name : 'hpys2'
		}, {
			name : 'hpysmc'
		}, {
			name : 'hpzlmc'
		}, {
			name : 'clsd'
		}, {
			name : 'kkmc'
		}, {
			name : 'dwmc'
		}, {
			name : 'jgsj'
		},
	      {name : 'kkbh'},
	      {name : 'sbbh'},
	      {name : 'fxbh'},
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
	      {name : 'ssdq'}]
});

//中心右区域数据
Jinpeng.historyQuery.gridCenterDataPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'historyGridPanel',
	border : false,
	frame : false,
	pageSize : 30,
	initComponent : function() {
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this,{
			store : historyQueryStore,
			cm : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false,
				},
				columns : [
						new Ext.ux.grid.PagingRowNumberer({width : 40}),
						{
							header : '卡口名称',
							dataIndex : 'kkmc',
							width : 230
						},{
							header : '单位名称',
							dataIndex : 'dwmc',
							width : 200
						},
						//sm,
						{
							header : '车牌号码',
							dataIndex : 'hphm'
						},{
							header : '车牌颜色',
							dataIndex : 'hpysmc'
						}/*,{
							header : '号牌种类',
							dataIndex : 'hpzlmc'
						}*/,{
							header : '车辆速度',
							dataIndex : 'clsd',
							renderer: function(val) {
						    	val = ~~val;
						        if (val > 20) {
						            return '<span style="color:green;">' + val + '</span>';
						        } else if (val < 10) {
						            return '<span style="color:red;">' + val + '</span>';
						        }
						        return val;
						    }
						},{
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
							header : '操作', dataIndex : 'operate',
					    	xtype : 'actioncolumn',
	                    	width : 100,
	                    	align : 'center',
	                    	items : [{
								icon : rootpath + '/themes/client/blue/images/system/check.gif',
								tooltip : '查看'
							}]
						} ]
			}),
			bbar : new Jinpeng.widget.PagingToolbarForAll( {
				id : 'PagingToolbar',
				store : historyQueryStore,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			}),
			listeners : {
				afterrender : function() {
					this.pageSize = 30;
					//页面初始数据需要按当前查询条件
					historyQueryStore.baseParams["startTime"] = Date.parseDate(Ext.util.Format
							.date(new Date(), 'Y-m-d')
							+ " " + "00:00:00", 'Y-m-d H:i:s');
					historyQueryStore.baseParams["endTime"] = Date.parseDate(Ext.util.Format
							.date(new Date(), 'Y-m-d')
							+ " " + "23:59:59", 'Y-m-d H:i:s');
					historyQueryStore.load({
						params : {
							'page.start' : 0,
							'page.limit' : this.pageSize
						}
					});
				},
				/*双击查看*/
				rowdblclick : function(grid, rowIndex, e ) {
					var data = grid.getStore().getAt(rowIndex).data;
					var win = new Jinpeng.historyQuery.CheckShowDetailWindow();
					//将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
					win.loadId = data.xxbh;
					win.show();
				}
			}
		});
		//最后一列查看点击事件 
		this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
			var fieldName = grid.getColumnModel()
					.getDataIndex(columnIndex);
			if (fieldName == 'operate') {
				if (typeof this.checkHref == 'function')
					//超链接方法 
					this.checkHref(grid, rowIndex, columnIndex);
			}
		});
		Jinpeng.historyQuery.gridCenterDataPanel.superclass.initComponent.apply(this);
	},
	//超链接的方法 
	checkHref : function(grid, rowIndex, colIndex, item, event) {
		var recode = grid.store.getAt(rowIndex);
		if (recode) {
			//创建window窗体
			var win = new Jinpeng.historyQuery.HistoryCarDetailWindow();
			win.recode = recode;
			win.loadId = recode.get("xxbh");// 唯一序列号
			win.show();
		}
	}
});

/**
 * 详细信息store
 */
var detailHistoryStore = new Ext.data.JsonStore({
	url : rootpath + "/car/query/historyDetailQuery.mvc",
	root :  'data',
    idProperty : 'id',
    totalProperty : 'total',
    autoLoad : false,
	fields : [
      {name : 'xxbh'},
      {name : 'kkbh'},
      {name : 'sbbh'},
      {name : 'fxbh'},
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
      {name : 'tx1'}
   ]
});

//弹出窗口历史过车详细信息
Jinpeng.historyQuery.HistoryCarDetailWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
	width : 900,
	height : 500,
	closeAction : "close",
	title : '详细信息',
	border : false,
	clickFlag : false,
	loadId : '',
	recode : null,
	initComponent : function() {
		Ext.apply(this, {
			items : [ {
				xtype : 'form',
				id : 'detailWindowForm',
				region : 'center',
				labelAlign : 'right',
				border : false,
				layout : 'column',
				cls : 'blue-button-ct',
				items : [{
					columnWidth : .45,
					//bodyStyle : 'padding-left : 5px;',
					//layout : 'form',
					items : [{
						//图形组件
						xtype : 'pictureShowBox',
						//id : 'pictureshowbox',
						width : 420,
						height : 420
					} ]
				},
				{
					columnWidth : .55,
					layout : 'form',
					items : [{
							title : '车辆信息',
							layout : "table",
							bodyStyle : 'padding-top : 5px;',
							defaults : {
								width : 250,
								layout : 'form'
							},
							layoutConfig : {
								columns : 2
							},
							items : [{
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车牌号码',
									name : 'hphm',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车道编号',
									name : 'cdbh',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '卡口编号',
									name : 'kkbh',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '方向编号',
									name : 'fxbh',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '设备编号',
									name : 'sbbh',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车尾号牌',
									name : 'cwhphm',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车尾号牌颜色',
									name : 'cwhpys',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '号牌一致',
									name : 'hpyz',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车辆速度(km/h)',
									name : 'clsd',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车辆限速(km/h)',
									name : 'clxs',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车身长度(cm)',
									name : 'cscd',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '行驶状态',
									name : 'xszt',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '违法状态',
									name : 'wfzt',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车辆品牌',
									name : 'clpp',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车辆外形',
									name : 'clwx',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车身颜色',
									name : 'csys',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车辆类型',
									name : 'cllx',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '号牌种类',
									name : 'hpzl',
									anchor : '96%'
								} ]
							}]
						}]
				} ]
			} ],
			bbar : {
				buttonAlign : 'center',
				buttons : [{
					xtype : 'button',
	          	  	text : "上一条",
					scope : this,
					id : 'prevButton',
					hidden : true,
					handler : function() {
						// 调用方法获取下一条记录id
						var id = this.getDetailRecordId(this.loadId, false);
						// 如果不为空，则进行数据加载
						if (id != null) {
							this.loadRecordById(id);
							//同步"上一条","下一条"按钮状态.
							this.synchronUpOrDown(id);
						}
					}
				},{
	          		  xtype : 'tbspacer',
	          		  width : 10
          	  	},{
          	  		xtype : 'button',
	          	  	text : "下一条",
					scope : this,
					id : 'nextButton',
					hidden : true,
					handler : function() {
						// 调用方法获取下一条记录id
						var id = this.getDetailRecordId(this.loadId, true);
						// 如果不为空，则进行数据加载
						if (id != null) {
							this.loadRecordById(id);
							//同步"上一条","下一条"按钮状态.
							this.synchronUpOrDown(id);
						}
					}
				},{
	          		  xtype : 'tbspacer',
	          		  width : 10
          	  	},{
          	  		xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;',
					scope : this,
					handler : this.close
				} ]
			}
		});
		Jinpeng.historyQuery.HistoryCarDetailWindow .superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Jinpeng.historyQuery.HistoryCarDetailWindow .superclass.afterRender.call(this);
		//根据点击记录时设置的记录ID加载数据
		this.loadRecordById(this.recode);
		var xxbh = this.recode.get('xxbh');
		//同步"上一条","下一条"按钮状态.
		this.synchronUpOrDown(xxbh);
	},
	/**
	 * 根据ID，detailRegStore加载该条记录的信息。
	 * @param xxbh 信息编号
	 */
	loadRecordById : function(data) {
		var record = {};
		// 加载数据		
		record.hphm = data.get("hphm");
		record.xxbh = data.get("xxbh");
		record.kkbh = data.get("kkbh");
		record.sbbh = data.get("sbbh");
		record.fxbh = data.get("fxbh");
		record.cdbh = data.get("cdbh");
		record.cwhphm = data.get("cwhphm");
		record.cwhpys = window.dictionary.getValue("LicPlateColor",data.get("cwhpys"));
		record.hpyz = window.dictionary.getValue("LicenseVerfiy",data.get("hpyz"));//号牌一致，
		
		record.clsd = Ext.util.Format.substr(data.get("clsd"),0,3);
		record.clxs = Ext.util.Format.substr(data.get("clxs"),0,3);	
			
		record.cscd = window.dictionary.getValue("CarLength",data.get("cscd")) ;
		record.xszt = window.dictionary.getValue("DriverType", data.get("xszt"));//行驶状态，
		record.wfzt = window.dictionary.getValue("IllegalType", data.get("wfzt"));//违法状态，待转字典
		record.clpp = window.dictionary.getValue("CarBrand", data.get("clpp")); //车辆厂牌编码（自行编码）。
		record.clwx = window.dictionary.getValue("VehicleAppearance",data.get("clwx"));//车辆外形编码（自行编码）。
		record.csys = window.dictionary.getValue("CarColor", data.get("csys"));
		record.cllx = window.dictionary.getValue("CarType", data.get("cllx"));
		record.hpzl = window.dictionary.getValue("LicPlateType", data.get("hpzl"));
		//反向将数据加载到form表单中
		Ext.getCmp('detailWindowForm').getForm().setValues(record);
		record.CARIMGURL = data.get("tx1");
		this.publish('loadPictures', record);
	},
	/**
	 * 从grid的store获取详细信息id方法
	 * 
	 * @param id
	 * @param upOrDowm
	 *            true&false
	 */
	getDetailRecordId : function(id, upOrDown) {
		var nextId = null;
		//拿该数据在当前store中的id数组所在的序号
		var k = 0;
		for ( var i = 0; i < historyQueryStore.getCount(); i++) {
			if (this.loadId == historyQueryStore.getAt(i).get('xxbh')) {
				k = i;
				break;
			}
		}
		if (upOrDown == false && k > 0) {
			nextId = historyQueryStore.getAt(i - 1).get('xxbh');
		}
		if (upOrDown == true
				&& i < historyQueryStore.getCount() - 1) {
			nextId = historyQueryStore.getAt(i + 1).get('xxbh');
		}
		if(nextId) {
			this.loadId = nextId;
		}
		return nextId;
	},
	/**
	 * 同步"上一条","下一条"按钮状态.
	 */
	synchronUpOrDown : function(id) {
		var count = historyQueryStore.getCount();
		var index = 0;
		for ( var i = 0; i < count; i++) {
			if (id == historyQueryStore.getAt(i).get('xxbh')) {
				index = i;
				break;
			}
		}
		//更改状态
		if (count == 1) {
			Ext.getCmp('nextButton').disable();
			Ext.getCmp('prevButton').disable();
		} else if(index == 0) {
			Ext.getCmp('prevButton').disable();
			if(count == 2) {
				Ext.getCmp('nextButton').enable();
			}
		} else if (index == (count-1)) {
			Ext.getCmp('nextButton').disable();
			if(count == 2) {
				Ext.getCmp('prevButton').enable();
			}
		} else {
			Ext.getCmp('prevButton').enable();
			Ext.getCmp('nextButton').enable();
		}
	}
});

Ext.reg('northFormPanel', Jinpeng.historyQuery.NorthFormPanel);
Ext.reg('gridCenterDataPanel', Jinpeng.historyQuery.gridCenterDataPanel);