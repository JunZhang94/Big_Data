/**
 * 初次入城
 */
Ext.ns("Jinpeng.carFirsttimeIncityResult");

var praParams;//查询条件
var exportParams;//导出结构查询参数
var conditions;//页面查询组件
Ext.onReady(function() {
	praParams = parent.window.opener.params;
	exportParams=parent.window.opener.exportParams;
	conditions = parent.window.opener.conditions;
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport( {
		layout : 'border',
		id : 'portBody',
		items : [ {
			//表单
			region : 'north',
			border : false,
			height : 150,
			xtype : 'firstTimeIncityFormPanel'
		}, {
			//列表数据
			region : 'center',
			border : false,
			xtype : 'firstTimeIncityDataPanel'
		}]
	});
	//默认加载查询功能
	Ext.getCmp('resultPanel').resultQueryMethod();
});

//表单
Jinpeng.carFirsttimeIncityResult.NorthFormPanel = Ext.extend(Ext.Panel,{
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
		Jinpeng.carFirsttimeIncityResult.NorthFormPanel.superclass.initComponent.apply(this);
	},
	//查询
	resultQueryMethod : function() {
		var grid = Ext.getCmp('firstTimeIncityPanel');
		grid.store.baseParams = {};// 重置
		grid.store.baseParams = praParams;
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
Jinpeng.carFirsttimeIncityResult.FirstTimeIncityPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'firstTimeIncityPanel',
	border : false,
	frame : false,
	pageSize : 15,
	initComponent : function() { 
		// 所需数据
		alarmSearchStore = new Ext.data.JsonStore({
			url : rootpath + "//firstTimeInCity/doQueryFirstIncityCar.mvc",
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
				name : 'hpysmc'
			}, {
				name : 'brand'
			}, {
				name : 'type'
			}, {
				name : 'caryear'
			}, {
				name : 'tx1'
			}, {
				name : 'cwhphm'
			},{name : 'hpyz'},
			{name : 'clsd'},
			{name : 'clxs'},
			{name : 'xszt'},
			{name : 'clpp'},
			{name : 'csys'},
			{name : 'cllx'},
			{name : 'hpzl'},
			{
				name : 'cwhpys'
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
						sm,
						{
							header : '车牌号',
							dataIndex : 'hphm'
						},{
							header : '初次入城时间',
							width : 180,
							dataIndex : 'jgsj',
							 renderer: function (val) {
					        	if (val) {
					        		return Ext.util.Format.date(new Date(Number(val)), 'Y-m-d H:i:s');
					        	}
					        	return "";
					        }
						},{
							header : '最新地点',
							dataIndex : 'kkmc'
						},{
							header : '品牌/型号/年款',
							dataIndex : 'brand'
						},{
							header : '颜色',
							dataIndex : 'hpysmc'
						},{
							header : '操作', dataIndex : 'operate',
					    	xtype : 'actioncolumn',
	                    	width : 100,
	                    	align : 'center',
	                    	items : [{
								icon : rootpath
										+ '/themes/client/blue/images/system/grid1.png',
								tooltip : '查看',
								handler :function(grid, rowIndex, colIndex) {
	                    		var recode = grid.store.getAt(rowIndex);
								var carNum = recode.get('hphm');
	                    			// 超链接方法
	        					//	this.checkHref(grid, rowIndex);
	        						checkHref(grid, rowIndex, colIndex);
	                    		}
	                    	}, {
								icon : rootpath + '/themes/client/blue/images/system/grid2.png',
								tooltip : '过车轨迹',
								handler : function(grid, rowIndex, colIndex) {
									var recode = grid.store.getAt(rowIndex);
									var carNum = recode.get('hphm');
									showCarPlace(carNum);
								}
							}, {
								icon : rootpath + '/themes/client/blue/images/system/grid3.png',
								tooltip : '加入布控',
								handler : function(grid, rowIndex, colIndex) {
									var recode = grid.store.getAt(rowIndex);
									var carNum = recode.get('hphm');
									inputControl(carNum);
								}
							}]
						} ]
			}),
			selModel : sm,
			tbar : {
				cls : 'blue-button-ct',
				items : [ {
					xtype : 'tbspacer',
					width : 12
				},{
					xtype : 'button',
					id : 'exportRecordBtn',
					tooltip : {
						text : '最多只能导出1000条数据!'
					},
					text : '&nbsp;&nbsp;&nbsp;导出&nbsp;&nbsp;&nbsp;',
					handler : this.doExport
				}]
				},
			bbar : new Jinpeng.widget.PagingToolbar( {
				id : 'PigPagingToolbarCar',
				store : alarmSearchStore,
				//displayInfo : true,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			})
	
			
		});
		/* 响应最后一列查看点击事件 */
//		this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
//			
//			var fieldName = grid.getColumnModel()
//					.getDataIndex(columnIndex);
//			if (fieldName == 'operate') {
//				if (typeof this.checkHref == 'function')
//					/* 调用查看超链接方法 */
//					this.checkHref(grid, rowIndex, columnIndex);
//			}
//		});
		Jinpeng.carFirsttimeIncityResult.FirstTimeIncityPanel.superclass.initComponent.apply(this);
	},
	/* 响应查看超链接的方法 */
	checkHref : function(grid, rowIndex, colIndex) {
		var recode = grid.store.getAt(rowIndex);
		if (recode) {
			// 创建一个window对象
			var win = new Jinpeng.carFirsttimeIncityResult.CarDetailWindow();
			//var win = new Jinpeng.historyQuery.HistoryCarDetailWindow();
			win.recode = recode;
			// 传入当前ID，并加载数据。
			win.loadId = recode.get("xxbh");
			win.queryStore=alarmSearchStore;
			win.show();
		}
	},
	doExport:function(){
		var config = {
			queryExportURL : rootpath + "//firstTimeInCity/doExportCarList.mvc"
		};
		config.start = 0;
		config.limit = 1000;//默认最大导出1000条
		config.count = 1000; //默认最大导出1000条
		var param = "";
		var records = Ext.getCmp('firstTimeIncityPanel').getSelectionModel().getSelections();
		if(records.length>0){
			param=getSelectNodes(records);
			config.nodeList=param;
		}else{
			param = exportParams;
			config.queryCondition = param.join("&");
		}
		var ExportHelper = new Jinpeng.HistoryExportHelper(config);
		ExportHelper.startExport(true);
	}
});
//弹出窗口历史过车详细信息
Jinpeng.carFirsttimeIncityResult.CarDetailWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
	width : 940,
	height : 550,
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
				autoScroll : true,
				labelAlign : 'right',
				layout : 'column',
				cls : 'blue-button-ct',
				items : [{
					columnWidth : .45,
					//bodyStyle : 'padding-left : 5px;',
					//layout : 'form',
					items : [{
						//图形组件
						xtype : 'pictureShowBox',
						width : 420,
						height : 460
					} ]
				},
				{
					columnWidth : .55,
					layout : 'form',
					items : [{xtype : 'fieldset',
							title : '基本信息',
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
									id:'carNum_win',
									name : 'hphm',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '经过时间',
									name : 'jgsj',
									anchor : '96%'
								} ]
//							}, {
//								items : [ {
//									xtype : 'displayfield',
//									fieldLabel : '单位名称',
//									name : 'dwmc',
//									anchor : '96%'
//								} ]
//							}, {
//								items : [ {
//									xtype : 'displayfield',
//									fieldLabel : '设备名称',
//									name : 'sbmc',
//									anchor : '96%'
//								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '卡口名称',
									name : 'kkmc',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '方向名称',
									name : 'fxmc',
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
								items : [{
									xtype : 'displayfield',
									fieldLabel : '设备名称',
									name : 'sbmc',
									anchor : '96%'
									}]
							}]
						},{xtype : 'fieldset',
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
							}/*, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车身长度(cm)',
									name : 'cscd',
									anchor : '96%'
								} ]
							}*/, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车尾号牌',
									name : 'cwhphm',
									anchor : '96%'
								} ]
							}/*, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '违法状态',
									name : 'wfzt',
									anchor : '96%'
								} ]
							}*/, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车辆品牌',
									name : 'clpp',
									anchor : '96%'
								} ]
							}/*, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车辆外形',
									name : 'clwx',
									anchor : '96%'
								} ]
							}*/, {
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
									fieldLabel : '车尾号牌颜色',
									name : 'cwhpys',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '号牌种类',
									name : 'hpzl',
									anchor : '96%'
								} ]
							},{
								items : [ {
									xtype : 'hidden',
									name : 'xxbh',
									id:'xxbh',
									anchor : '96%'
								} ]
							},{
								items : [ {
									xtype : 'hidden',
									name : 'tx1',
									id:'tx1',
									anchor : '96%'
								} ]
							}]
						},{
							xtype : 'fieldset',
							title : '车主信息',
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
									fieldLabel : '车主姓名',
									name : 'JDCSYR',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '联系方式',
									name : 'LXFS',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '身份证号',
									name : 'SFZH',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '详细地址',
									name : 'DJZZXZ',
									anchor : '96%'
								} ]
							}]
						}]
				} ]
			} ],
			bbar : {
				cls : 'blue-button-ct',
				buttonAlign : 'center',
				buttons : [{
					xtype : 'button',
	          	  	text : "上一条",
					scope : this,
					id : 'prevButton',
					hidden : false,
					handler : function() {
						// 调用方法获取下一条记录id
						var id = this.getDetailRecordId(this.loadId, false);
						
						var idNum = id.substring(0,id.indexOf('|'));
					    var idXxbh = id.substring((id.indexOf('|')+1));
					    var gridStore;
					    gridStore=alarmSearchStore;
//						if (showFlag == 'grid') {
//							gridStore = historyQueryStore;
//						} else {
//							gridStore = dataViewStore;
//						}
						//获取选中的的行数-1
						var data = gridStore.getAt(idNum);
						// 如果不为空，则进行数据加载
						if (data!= null) {
							this.loadRecordById(data,alarmSearchStore,idNum);
							//同步"上一条","下一条"按钮状态.
							this.synchronUpOrDown(idXxbh);
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
					hidden : false,
					handler : function() {
						// 调用方法获取下一条记录id
						var id = this.getDetailRecordId(this.loadId, true);
						//对值的截取操作
						var idNum = id.substring(0,id.indexOf('|'));
					    var idXxbh = id.substring((id.indexOf('|')+1));
					    var gridStore;
					    gridStore=alarmSearchStore;
						//获取选中的的行数+1
						var data = gridStore.getAt(idNum);
						
						// 如果不为空，则进行数据加载
						if (data != null) {
							this.loadRecordById(data,alarmSearchStore,idNum);
							//同步"上一条","下一条"按钮状态.
							this.synchronUpOrDown(idXxbh);
						}
					}
				},{
	          		  xtype : 'tbspacer',
	          		  width : 10
          	  	},{
          	  		xtype : 'button',
					text : '下载图片',
					id : 'picdownloadbtn',
					handler : function() {
						//获取当前记录的id
						var id = Ext.getCmp('xxbh').getValue();
						var httpUrl = Ext.getCmp('tx1').getValue();
						var carNum = Ext.getCmp('carNum_win').getValue();
						linkDownloadPicture(id,httpUrl,carNum);
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
		Jinpeng.carFirsttimeIncityResult.CarDetailWindow.superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Jinpeng.carFirsttimeIncityResult.CarDetailWindow.superclass.afterRender.call(this);
		
		//根据点击记录时设置的记录ID加载数据
		this.loadRecordById(this.recode,alarmSearchStore);
		var xxbh = this.recode.get('xxbh');
		//同步"上一条","下一条"按钮状态.
		this.synchronUpOrDown(xxbh);
	},
	/**
	 * 根据ID，detailRegStore加载该条记录的信息。
	 * @param xxbh 信息编号
	 */
	loadRecordById : function(data,grid,carnum) {
		var carNumber ;
		var gridStore;
		gridStore = grid;
		
		if(carnum != undefined && carnum >0 ){
			carNumber = gridStore.getAt(carnum-1).get('hphm');
		}
		if(carnum ==0){
			carNumber = gridStore.getAt(carnum).get('hphm');
		}
		var record = {};
		// 加载数据		
		record.hphm = data.get("hphm");
		record.tx1 = data.get("tx1");
		record.xxbh = data.get("xxbh");
		record.jgsj=Ext.util.Format.date(new Date(Number(data.get('jgsj'))), 'Y-m-d H:i:s');
		record.kkbh = data.get("kkbh");
		//record.dwmc = data.get("dwmc");
		record.kkmc = data.get("kkmc");
		record.sbmc = data.get("sbmc");
		record.fxbh = data.get("fxbh");
		record.fxmc = data.get("fxmc");
		record.cwhphm = data.get("cwhphm");
		record.cwhpys = window.dictionary.getValue("LicPlateColor",data.get("cwhpys"));
		record.hpyz = window.dictionary.getValue("LicenseVerfiy",data.get("hpyz"));//号牌一致
		if(data.get("clsd")){
			record.clsd = Ext.util.Format.substr(data.get("clsd"),0,3);
			}
		if(data.get("clxs")){
			record.clxs = Ext.util.Format.substr(data.get("clxs"),0,3);	
		}
		//record.xszt = window.dictionary.getValue("DriverType", data.get("xszt"));//行驶状态，
		record.clpp = window.dictionary.getValue("CarBrand", data.get("clpp")); //车辆厂牌编码（自行编码）。
		record.csys = window.dictionary.getValue("CarColor", data.get("csys"));
		record.cllx = window.dictionary.getValue("CarType", data.get("cllx"));
		record.hpzl = window.dictionary.getValue("LicPlateType", data.get("hpzl"));
		//反向将数据加载到form表单中
		Ext.getCmp('detailWindowForm').getForm().setValues(record);
		record.CARIMGURL = data.get("tx1");
		this.publish('loadPictures', record);
		/*视频网暂时屏蔽车辆信息功能 */
		if(carNumber != data.get("hphm")){
			Ext.Ajax.request({
			method : "POST",
			params : {
				"carNum" : data.get("hphm")
			},
			url : rootpath + "/car/query/historyCarDetail.mvc",
			success : function(response, options) {
				var txt = response.responseJSON.data;
				if (txt.length == 0) {
					Ext.getCmp('detailWindowForm').getForm().findField('JDCSYR').setValue('加载失败');
					Ext.getCmp('detailWindowForm').getForm().findField('SFZH').setValue('加载失败');
					Ext.getCmp('detailWindowForm').getForm().findField('LXFS').setValue('加载失败');
					Ext.getCmp('detailWindowForm').getForm().findField('DJZZXZ').setValue('加载失败');
				} else {
					Ext.getCmp('detailWindowForm').getForm().findField('JDCSYR').setValue(txt[0].JDCSYR);
					Ext.getCmp('detailWindowForm').getForm().findField('LXFS').setValue(txt[0].LXFS);
					Ext.getCmp('detailWindowForm').getForm().findField('SFZH').setValue(txt[0].SFZH);
					Ext.getCmp('detailWindowForm').getForm().findField('DJZZXZ').setValue(txt[0].DJZZXZ);
				}
			},
			failure : function(response, options) {
				Ext.getCmp('detailWindowForm').getForm().findField('JDCSYR').setValue('加载失败');
				Ext.getCmp('detailWindowForm').getForm().findField('SFZH').setValue('加载失败');
				Ext.getCmp('detailWindowForm').getForm().findField('LXFS').setValue('加载失败');
				Ext.getCmp('detailWindowForm').getForm().findField('DJZZXZ').setValue('加载失败');
			},
			scope : this
		});
		};
	},
	/**
	 * 从grid的store获取详细信息id方法
	 * @author jzxie
	 * @param id
	 * @param upOrDowm
	 *            true&false
	 */
	getDetailRecordId : function(id, upOrDown) {
		var nextId = null;
		//拿该数据在当前store中的id数组所在的序号
		var k = 0;
		var rownum=0;
		var gridStore;
		gridStore=alarmSearchStore;
//		if (showFlag == 'grid') {
//			gridStore = historyQueryStore;
//		} else {
//			gridStore = dataViewStore;
//		}
		if(id!=null){
			if(id.indexOf('|')>0 && id.indexOf('|')!= 0){
				//获取当前行数的Id
				this.loadId = id.substring((id.indexOf('|')+1));
				//获取行数(测试的时候用)
				//rownum = parseInt(id.substring(0,(id.indexOf('|'))));
			}
			for ( var i = 0; i < gridStore.getCount(); i++) {
				if (this.loadId == gridStore.getAt(i).get('xxbh')) {
					k = i;
					break;
				}
		    }
		}
		
		if (upOrDown == false && k > 0) {
			//测试用的
			//nextId = (rownum-k)+'|'+historyQueryStore.getAt(k-1).get('xxbh');
			//信息编号唯一的情况下使用
			nextId = (k-1)+'|'+gridStore.getAt(k-1).get('xxbh');
		}
		if (upOrDown == true
				&& k < gridStore.getCount() - 1) {
			
			//nextId = (k+rownum+1)+'|'+historyQueryStore.getAt(k+1).get('xxbh');
			nextId = (k+1)+'|'+gridStore.getAt(k+1).get('xxbh');
			
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
		var gridStore;
		gridStore=alarmSearchStore;
		
		var count = gridStore.getCount();
		var index = 0;
		for ( var i = 0; i < count; i++) {
			if (id == gridStore.getAt(i).get('xxbh')) {
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

/**
 * 获取页面选项ID信息
 * @param records
 * @return
 */
function getSelectNodes(records){
	var nodeList="nodeList=";
	for ( var i = 0; i < records.length; i++) {
		var data =Ext.getCmp('firstTimeIncityPanel').getSelectionModel().getSelections()[i] ;
		var jgsj=Ext.util.Format.date(new Date(Number(data.get('jgsj'))), 'Y-m-d H:i:s');
		if(i==0){
			nodeList+=data.get('hphm')+","+jgsj+","+data.get('kkmc')+","+data.get('brand')+","+data.get('hpysmc');
		}else{
			nodeList+=";"+data.get('hphm')+","+jgsj+","+data.get('kkmc')+","+data.get('brand')+","+data.get('hpysmc');
		}
	}
	return nodeList;
}
//明细
function checkHref(grid, rowIndex, colIndex) {
	var recode = grid.store.getAt(rowIndex);
	if (recode) {
		// 创建一个window对象
		var win = new Jinpeng.carFirsttimeIncityResult.CarDetailWindow();
		//var win = new Jinpeng.historyQuery.HistoryCarDetailWindow();
		win.recode = recode;
		// 传入当前ID，并加载数据。
		win.loadId = recode.get("xxbh");
		win.queryStore=alarmSearchStore;
		win.show();
	}
}
//展现车辆轨迹
function showCarPlace(carNum, counts) {
	var orgId ='';
	var orgType = '';
	var kkbhs = '';
	var startTime = Ext.getCmp('startdate').getValue();
	var endTime = Ext.getCmp('enddate').getValue();
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

var win;
var congtolCarNum = '';
var inputControl = function(carNum) {
	win = new Jinpeng.carFirsttimeIncityResult.ControlInputWindow({
		title : '车牌精确布控'
	});
	congtolCarNum = carNum;
	win.show();
}

var closeControlWin = function() {
	win.close();
}
Jinpeng.carFirsttimeIncityResult.ControlInputWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	layout : "fit",
	width : Ext.getBody().getWidth() - 200,
	height : Ext.getBody().getHeight() - 50,
	closeAction : "close",
	modal : true,
	border : false,
	initComponent : function() {
		var _window = this;
		var ww =  Ext.getBody().getWidth() - 200;
		var hh = Ext.getBody().getHeight() - 85;
		Ext.apply(this, {
			items : [ {
				xtype : 'panel',
				autoScroll : true,
				border : false,
				items : [ {
					html: "<iframe id='controlInfo' src='" + rootpath + "/controlManager/exactControlManagerPage.mvc' width='" + ww + "' height='" + hh +"' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
				} ]
			} ]
		});
		Jinpeng.carFirsttimeIncityResult.ControlInputWindow.superclass.initComponent.apply(this);
	}
});


Ext.reg('firstTimeIncityFormPanel', Jinpeng.carFirsttimeIncityResult.NorthFormPanel);
Ext.reg('firstTimeIncityDataPanel', Jinpeng.carFirsttimeIncityResult.FirstTimeIncityPanel);