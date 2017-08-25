
/**
 * 历史过车查询功能JS
 */
Ext.ns("Jinpeng.fullTextSearch");

var dataCount = 0;
var viewPortObj = null;
var downPictureWindow = null;
Ext.onReady(function() {
	Ext.useShims = true;
	var hh = Ext.getBody().getHeight();
	var carInfoHight = hh - 185;
	var carInfo2Hight = hh - 215;
	viewPortObj = new Ext.Viewport( {
		layout : 'border',
		items : [ {
			//查询表单
			region : 'north',
			border : false,
			height : 55,
			xtype : 'northFormPanel'
		}, {
			//列表数据
			xtype : 'panel',
			id : 'mainInfo',
			region : 'center',
			border : false,
			items : [ {
				xtype : 'panel',
				title : '卡口信息',
				height : 151,
				id : 'bayonetInfo',
				hidden : true,
				labelAlign : 'right',
				border : false,
				autoScroll : true,
				cls : 'blue-button-ct',
				items : [{
					xtype : 'bayonetSearchGridPanel'
				}]
			}, {
				xtype : 'panel',
				//title : '过车信息      <input type="button" value="&nbsp;&nbsp;&nbsp;导出&nbsp;&nbsp;&nbsp;" />',
				id : 'carInfo',
				height : carInfoHight,
				hidden : true,
				labelAlign : 'right',
				border : false,
				autoScroll : true,
				items : [{
					xtype : 'gridCenterDataPanel'
				}]
			}, {
				xtype : 'panel',
				title : '过车信息',
				id : 'carPathInfo',
				hidden : true,
				height : carInfo2Hight,
				labelAlign : 'right',
				border : false,
				autoScroll : true,
				cls : 'blue-button-ct',
				items : [{
					xtype : 'carPathGridPanel'
				}, {
					xtype : 'form',
					id : 'showDateForm',
					labelAlign : 'right',
					border : false,
					frame : true,
					cls : 'blue-button-ct',
					//设置默认
					layout : 'table',
					defaults : {
						layout : 'form',
						width : 520
					},
					layoutConfig : {
						columns : 1
					},
					bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD',
					items : [{
						cls : 'time-form-lable',
						items : [ {
							xtype : 'displayfield',
							fieldLabel : '查询时间范围',
							id : 'timeRange',
							name : 'timeRange',
							value : '',
							anchor : '96%'
						} ]
					}],
					loadTimeRange : function() {
						Ext.Ajax.request({
							method : "POST",
							url : rootpath + "/fullTextSearch/timeRange.mvc",
							success : function(response, options) {
								var txt = response.responseJSON.data;
								Ext.getCmp('timeRange').setValue(txt.timeDsc);
								/*if (txt.length != 0) {]
									
								}*/
							}
						});
					}
				}]
			}, {
				xtype : 'panel',
				id : 'carSourceInfo',
				hidden : true,
				labelAlign : 'right',
				border : false,
				cls : 'blue-button-ct',
				items : [{
					xtype : 'carSourseFormPanel'
				}]
			}]
		} ]
	});
});

//查询表单
Jinpeng.fullTextSearch.NorthFormPanel = Ext.extend(Ext.Panel,{
	initComponent : function() {
		var _panel = this;
		
		Ext.apply(this,{
			items : [ {
				// form表单
				xtype : 'form',
				id : 'fullTextSearchForm',
				//labelAlign : 'right',
				border : false,
				frame : true,
				cls : 'blue-button-ct',
				layout : 'table',
				height : 55,
				defaults : {
					layout : 'form',
					//统一宽度
					width : 350
				},
				layoutConfig : {
					columns : 4
				},
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
					xtype : 'spacer'
				}, {
					// 第一行
					bodyStyle : 'margin-top: 10px;',
					items :[{	
						xtype : 'textfield',
						fieldLabel : '全文检索',
						name : 'searchContext',
						id : 'searchContext',
						allowBlank : false,
						blankText : '请输入卡口名称或者完整的车牌号码',
						emptyText : '请输入查询内容...',
						maxLength : 50,
						enableKeyEvents : true,
						anchor : '90%',
						vtype:'carNumUpper',
						listeners : {
							specialKey : function(field, e) {  
								if (e.getKey() == Ext.EventObject.ENTER) {
									_panel.historyQueryMethod();
								}
							}
						}
					}]
				}, {
					bodyStyle : 'padding-left:30px; ',
					xtype : 'compositefield',
					cls : 'full-button-search',
					items : [{
						xtype : 'button',
						flex : 31,
						id : "searchBut",
						text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
						handler : this.historyQueryMethod
					}]
				}]
			} ]
		});
		Jinpeng.fullTextSearch.NorthFormPanel.superclass.initComponent.apply(this);
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
					if (j > 10) {
						Ext.Msg.alert('系统提示', '超过十个车牌，建议选择十个车牌以内！');
					}
					Ext.getCmp('carNumStr').setValue(carNum);
				}
			}
		});
		chooser.show();
	},
	//查询
	historyQueryMethod : function() {
		var formPanel = Ext.getCmp('fullTextSearchForm');
		var form = formPanel.getForm();
		var regCondition = new Jinpeng.CarNumValidatorClass();
		var searchValue = Ext.getCmp('searchContext').getValue();
		var value = searchValue.toUpperCase();
		var flag = regCondition.validateAll(value);
		var grid, params;
		if (form.isValid()) {
			if (flag) {
				Ext.getCmp('bayonetInfo').setVisible(false);
				Ext.getCmp('carInfo').setVisible(false);
				Ext.getCmp('carPathInfo').setVisible(true);
				Ext.getCmp('carSourceInfo').setVisible(true);
				grid = Ext.getCmp('carPathGrid');
				var curDate = new Date()
				var endTime = Ext.util.Format.date(curDate, 'Y-m-d H:i:s');
				var endTimeStr = Ext.util.Format.date(curDate, 'Y-m-d') + ' 23:59:59';
				var timeDateStr = endTime.split(" ");
				var pastDateStr = trans(timeDateStr[0],'0')
				var startTime = pastDateStr + " " + timeDateStr[1];
				params = {
					'startTime' : startTime,
					'endTime' : endTimeStr,
					'carNum' : Ext.getCmp('searchContext').getValue(),
					'page.start' : 0,
					'page.limit' : 100,
					'flag' : 'fullQuery',
				};
				
				var sourceGrid = Ext.getCmp('sourcePanel');
				sourceGrid.loadSourceByCarNum(Ext.getCmp('searchContext').getValue());
				var timeForm = Ext.getCmp('showDateForm');
				timeForm.loadTimeRange();
			} else {
				Ext.getCmp('bayonetInfo').setVisible(true);
				Ext.getCmp('carInfo').setVisible(true);
				Ext.getCmp('carPathInfo').setVisible(false);
				Ext.getCmp('carSourceInfo').setVisible(false);
				grid = Ext.getCmp('bayonetGridPanel');
				params = {
					'condition' : Ext.getCmp('searchContext').getValue()
				}
			}
			grid.store.load({
				params : params
			});
		}
	}
});

//所需数据
var carQueryStore = new Ext.data.JsonStore({
	url : rootpath + "/fullTextSearch/searCarData.mvc",
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
	      {name : 'txsl'},
	      {name : 'ssdq'}]
});

//中心右区域数据
Jinpeng.fullTextSearch.gridCenterDataPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'historyGridPanel',
	border : false,
	frame : false,
	height : Ext.getBody().getHeight() - 215,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this,{
			store : carQueryStore,
			cm : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false,
				},
				columns : [
						new Ext.ux.grid.PagingRowNumberer({width : 40}),
						sm,
						/*{header : '信息编号',
							dataIndex : 'xxbh'},*/
						{
							header : '车牌号码',
							dataIndex : 'hphm',
							width : 100
						},{
							header : '车牌颜色',
							dataIndex : 'hpysmc',
							width : 100
						}/*,{
							header : '号牌种类',
							dataIndex : 'hpzlmc'
						}*/,{
							header : '车辆速度',
							dataIndex : 'clsd',
							width : 100,
							renderer: function(val) {
							    val =~~val
						        if (val > 20) {
						            return val+'<span style="color:#008000;">&nbsp;&nbsp;km/h</span>';
						        } else if (val < 10) {
						            return '<span style="color:#FF0000;">' + val + '&nbsp;&nbsp;km/h</span>';
						        }
						        return val;
						    }
						},{
							header : '卡口名称',
							dataIndex : 'kkmc',
							width : 300,
							renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
								//当文字过多的时候，鼠标移上去就给悬浮狂提示
						     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
						    }
						}/*,{
							header : '单位名称',
							dataIndex : 'dwmc',
							width : 230,
							renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
							     //当文字过多的时候，鼠标移上去就给悬浮狂提示
						     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
						    }
						}*/,{
							header : '经过时间',
							width : 200,
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
			selModel : sm,
			tbar : {
				cls : 'blue-button-ct',
				items : [ {
					xtype : 'button',
					id : 'exportRecordBtn',
					tooltip : {
						text : '最多只能导出1000条数据!'
					},
					text : '&nbsp;&nbsp;&nbsp;导出&nbsp;&nbsp;&nbsp;',
					handler : this.importExcelData
				}]
			},
			bbar : new Jinpeng.widget.PagingToolbarForAll( {
				id : 'PagingToolbar',
				store : carQueryStore,
				//displayInfo : true,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			}),
			listeners : {
				/*双击查看*/
				rowdblclick : function(grid, rowIndex, e ) {
					var data = grid.store.getAt(rowIndex);
					var win = new Jinpeng.fullTextSearch.HistoryCarDetailWindow();
					win.recode = data;
					//将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
					win.loadId = data.get("xxbh");
					win.tx1 = data.get("tx1");
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
		Jinpeng.fullTextSearch.gridCenterDataPanel.superclass.initComponent.apply(this);
	},
	//超链接的方法 
	checkHref : function(grid, rowIndex, colIndex, item, event) {
		var recode = grid.store.getAt(rowIndex);
		if (recode) {
			//创建window窗体
			var win = new Jinpeng.fullTextSearch.HistoryCarDetailWindow();
			win.recode = recode;
			win.loadId = recode.get("xxbh");// 唯一序列号
			win.show();
		}
	},
	//导出Excel格式数据方法 
	importExcelData : function() {
		var records = Ext.getCmp('historyGridPanel').getSelectionModel().getSelections();
		var config = {
			selectExportURL : rootpath + "/fullTextSearch/exportCarData.mvc",
			queryExportURL : rootpath + "/fullTextSearch/exportCarData.mvc"
		};
		// 得到选中的ids
		var ids = [];
		var carNums = [];
		for ( var i = 0; i < records.length; i++) {
			if (i == 0) {
				carNums[carNums.length] = records[i].get('kkbh');
			}
			ids[ids.length] = records[i].get('xxbh');
		}
		config.ids = ids;
		config.carNums = carNums;
		config.start = 0;
		config.limit = 1000;//默认最大导出1000条
		config.count = 1000; //默认最大导出1000条
		var param = [];
		var grid = Ext.getCmp('historyGridPanel');
		var data = grid.store.baseParams;// 重置
		param[0] = "mounts=" + data.mounts;
		config.queryCondition = param.join("&");
		var ExportHelper = new Jinpeng.HistoryExportHelper(config);
		ExportHelper.startExport(true);
	}
});

//弹出窗口历史过车详细信息
Jinpeng.fullTextSearch.HistoryCarDetailWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
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
									id:'carNum',
									name : 'hphm',
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
									fieldLabel : '单位名称',
									name : 'dwmc',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '设备名称',
									name : 'sbmc',
									anchor : '96%'
								} ]
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
					text : '&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;',
					scope : this,
					handler : this.close
				} ]
			}
		});
		Jinpeng.fullTextSearch.HistoryCarDetailWindow .superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Jinpeng.fullTextSearch.HistoryCarDetailWindow .superclass.afterRender.call(this);
		//根据点击记录时设置的记录ID加载数据
		this.loadRecordById(this.recode);
		var xxbh = this.recode.get('xxbh');
		//同步"上一条","下一条"按钮状态.
		//this.synchronUpOrDown(xxbh);
	},
	/**
	 * 根据ID，detailRegStore加载该条记录的信息。
	 * @param xxbh 信息编号
	 */
	
	loadRecordById : function(data,carnum) {
		var carNumber ;
		if(carnum != undefined && carnum >0 ){
			carNumber = carQueryStore.getAt(carnum-1).get('hphm');
		}
		if(carnum ==0){
			carNumber = carQueryStore.getAt(carnum).get('hphm');
		}
		var record = {};
		// 加载数据		
		record.hphm = data.get("hphm");
		record.tx1 = data.get("tx1");
		record.xxbh = data.get("xxbh");
		record.kkbh = data.get("kkbh");
		record.dwmc = data.get("dwmc");
		record.kkmc = data.get("kkmc");
		record.sbmc = data.get("sbmc");
		record.fxbh = data.get("fxbh");
		record.fxmc = data.get("fxmc");
		record.cwhphm = data.get("cwhphm");
		record.cwhpys = window.dictionary.getValue("LicPlateColor",data.get("cwhpys"));
		record.hpyz = window.dictionary.getValue("LicenseVerfiy",data.get("hpyz"));//号牌一致，
		record.clsd = Ext.util.Format.substr(data.get("clsd"),0,3);
		record.clxs = Ext.util.Format.substr(data.get("clxs"),0,3);	
		record.xszt = window.dictionary.getValue("DriverType", data.get("xszt"));//行驶状态，
		record.clpp = window.dictionary.getValue("CarBrand", data.get("clpp")); //车辆厂牌编码（自行编码）。
		record.csys = window.dictionary.getValue("CarColor", data.get("csys"));
		record.cllx = window.dictionary.getValue("CarType", data.get("cllx"));
		record.hpzl = window.dictionary.getValue("LicPlateType", data.get("hpzl"));
		//反向将数据加载到form表单中
		Ext.getCmp('detailWindowForm').getForm().setValues(record);
		record.CARIMGURL = data.get("tx1");
		this.publish('loadPictures', record);
		
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
		if(id!=null){
			if(id.indexOf('|')>0 && id.indexOf('|')!= 0){
				//获取当前行数的Id
				this.loadId = id.substring((id.indexOf('|')+1));
				//获取行数(测试的时候用)
				//rownum = parseInt(id.substring(0,(id.indexOf('|'))));
			}
			for ( var i = 0; i < carQueryStore.getCount(); i++) {
				if (this.loadId == carQueryStore.getAt(i).get('xxbh')) {
					k = i;
					break;
				}
		    }
		}
		
		if (upOrDown == false && k > 0) {
			//测试用的
			//nextId = (rownum-k)+'|'+carQueryStore.getAt(k-1).get('xxbh');
			//信息编号唯一的情况下使用
			nextId = (k-1)+'|'+carQueryStore.getAt(k-1).get('xxbh');
		}
		if (upOrDown == true
				&& k < carQueryStore.getCount() - 1) {
			
			//nextId = (k+rownum+1)+'|'+carQueryStore.getAt(k+1).get('xxbh');
			nextId = (k+1)+'|'+carQueryStore.getAt(k+1).get('xxbh');
			
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
		var count = carQueryStore.getCount();
		var index = 0;
		for ( var i = 0; i < count; i++) {
			if (id == carQueryStore.getAt(i).get('xxbh')) {
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

//卡口信息所需数据
var bayonetQueryStore = new Ext.data.JsonStore({
	url : rootpath + '/bayonet/searchBayonetDetail.mvc',
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	remoteSort : true,
	fields : [ 
      {name : 'KKBH'},
		{name : 'KKMC'},
		{name : 'DWMC'},
		{name : 'XZQHMC'},
		{name : 'KKLX'},
		{name : 'KKLX2'},
		{name : 'LXDH'},
		{name : 'SJSCMS'},
		{name : 'KKXZ'},
		{name : 'GABH'},
		{name : 'KKJD'},
		{name : 'KKWD'},
		{name : 'DLLX'},
		{name : 'DLDM'},
		{name : 'KKZT'},
		{name : 'DLMS'},
		{name : 'DLMC'},
		{name : 'KKWZ'},
		{name : 'SBGYS'},
		{name : 'QGKDBH'},
		{name : 'RJKFS'},
		{name : 'SFLJ'},
		{name : 'SFTGTZCP'},
		{name : 'SFWFZP'},
		{name : 'SFBJKK'},
		{name : 'SFJBSPGN'},
		{name : 'SFCS'},
		{name : 'SFKH'},
		{name : 'SFJGKK'},
		{name : 'KKDZ'},
		{name : 'LXDZ'},
		{name : 'BZ'}
	]
});


//卡口信息数据列表
Jinpeng.fullTextSearch.BayonetGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'bayonetGridPanel',
	height : 125,
	border : false,
	frame : false,
	initComponent : function() {
		var devicePanel = this;
		Ext.apply(this,{
			store : bayonetQueryStore,
			cm : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false,
				},
				columns : [{
					header : "卡口编号", 
					dataIndex : 'KKBH', 	
					align:'center',
					width : 200,
					//处理内容太多时，当鼠标移上去是就给悬浮框提示
                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
						//当文字过多的时候，鼠标移上去就给悬浮狂提示
						var str = "<a href='#' onclick=\"searchCarInfo('" + value + "')\"><font ext:qtip='" + value + "'>" + value + "</font></a>"
				     	return str;
					}
				}, {
					header : "卡口名称",
					dataIndex : 'KKMC',
					align:'center',
					width : 200,
					//处理内容太多时，当鼠标移上去是就给悬浮框提示
                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
						//当文字过多的时候，鼠标移上去就给悬浮狂提示
				     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
					}
				}, {header : "卡口类型", dataIndex : 'KKLX', width : 80,
					align:'center',
					renderer : function(key) {
						//这里字典就是翻译不出来。。
						var value = '';
						if (key == 1) {
							value = '省际卡口';
						} else if (key == 2) {
							value = '市际卡口';
						} else if (key == 3) {
							value = '县际卡口';
						} else if (key == 4) {
							value = '公路主线卡口';
						} else if (key == 5) {
							value = '公路收费站卡口';
						} else if (key == 6) {
							value = '城区道路卡口';
						} else if (key == 7) {
							value = '城区路口卡口';
						} else {
							value = key;
						}
						return value;
					}
				}, {header : "卡口纬度", dataIndex : 'KKWD', width : 80,
					align:'center',
					renderer : function(key) {
						return devicePanel.parseFloatValue(key);
					}
				}, {header : "卡口经度", dataIndex : 'KKJD',width : 80,
					align:'center',
					renderer : function(key) {
						return devicePanel.parseFloatValue(key);
					}
				}, {header : "卡口状态", dataIndex : 'KKZT', width : 80,
					align:'center',
					renderer : function(key) {
						var str = '';
						if (key == '0') {
							str = '正常';
						} else if (key == '1') {
							str = '故障';
						} else if (key == '2') {
							str = '报废';
						} else if (key == '3') {
							str = '停用';
						} else {
							str = key;
						}
						return str;
					}
				}, {
					header : "备注",
					dataIndex : 'BZ',
					align:'center',
					width :260,
					//处理内容太多时，当鼠标移上去是就给悬浮框提示
                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
						if (value != null && value != 'null' && value != '') {
							//当文字过多的时候，鼠标移上去就给悬浮狂提示
					     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
						}
					}
				},{
					header : '操作', dataIndex : 'operate',
			    	xtype : 'actioncolumn',
                	width : 80,
                	align : 'center',
                	items : [{
						icon : rootpath + '/themes/client/blue/images/system/check.gif',
						tooltip : '查看'
					}]
				}]
			}),
			listeners : {
				/*双击查看*/
				rowdblclick : function(grid, rowIndex, e ) {
					var data = grid.store.getAt(rowIndex);
					var win = new Jinpeng.bayonet.BayonetDetailWindow;
					var kkbh = data.get("KKBH");
					win.loadRecordById(kkbh);
				}
			}
		});
		//最后一列查看点击事件 
		this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
			var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
			if (fieldName == 'operate') {
				if (typeof this.checkHref == 'function') {
					//超链接方法 
					this.checkHref(grid, rowIndex, columnIndex);
				}
			}
		});
		Jinpeng.fullTextSearch.BayonetGridPanel.superclass.initComponent.apply(this);
	},
	parseFloatValue : function (key) {
		var value = Math.round(key * 100)/100;
		return value;
	},
	//超链接的方法 
	checkHref : function(grid, rowIndex, colIndex, item, event) {
		var recode = grid.store.getAt(rowIndex);
		if (recode) {
			//创建window窗体
			var win = new Jinpeng.bayonet.BayonetDetailWindow;
			var kkbh = recode.get("KKBH");
			win.loadRecordById(kkbh);
			//win.show();
		}
	}
});

function searchCarInfo(kkbh) {
	var grid = Ext.getCmp('historyGridPanel');
	grid.store.baseParams = {};// 重置
	dataCount = 20 //一次性加载页面数据量
	//将参数传入后台
	var baseparams = {
		"mounts" : kkbh
	};
	grid.store.baseParams = baseparams;
	grid.store.load({
		params : {
			'page.start' : 0,
			'page.limit' : Jinpeng.PageSize
		}
	});	
}

//所需数据
var carPathInfoStore = new Ext.data.JsonStore({
	url : rootpath + "/car/carFrequencyDetail.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	remoteSort : true,
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
       {name : 'txsl'}]
});

//根据车牌号码查询过车记录
Jinpeng.fullTextSearch.CarPathGridPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'carPathGrid',
	border : false,
	height : Ext.getBody().getHeight() - 270,
	frame : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var _panel = this;
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this,{
			store : carPathInfoStore,
			columns : [
				new Ext.ux.grid.PagingRowNumberer({ width : 40}),
				//sm,
				{
					header : '车牌号码',
					width : 100,
					dataIndex : 'hphm'
				},{
					header : '车辆速度',
					width : 70,
					dataIndex : 'clsd',
					renderer: function(val) {
				    	val = ~~val;
				        if (val > 20) {
				            return '<span style="color:green;">' + val + '<font style="color:#18374B;">&nbsp;km/h</font></span>';
				        } else if (val < 10) {
				            return '<span style="color:red;">' + val + '<font style="color:#18374B;">&nbsp;km/h</font></span>';
				        }
				        return val;
				    }
				},{
					header : '车牌颜色',
					width : 60,
					dataIndex : 'hpysmc'
				},{
					header : '卡口名称',
					width : 180,
					dataIndex : 'kkmc'
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
				}
			],
			selModel : sm,
			listeners : {
				/*双击查看*/
				rowdblclick : function(grid, rowIndex, e ) {
					var data = grid.store.getAt(rowIndex);
					var win = new Jinpeng.fullTextSearch.CarDetailInfoWindow();
					win.recode = data;
					win.loadId = data.get("xxbh");// 唯一序列号
					win.show();
				}
			}
		});
		Jinpeng.fullTextSearch.CarPathGridPanel.superclass.initComponent.apply(this);
	}
});

//弹出窗口历史过车详细信息
Jinpeng.fullTextSearch.CarDetailInfoWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
	width : 950,
	height : 450,
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
				id : 'detailForm',
				region : 'center',
				labelAlign : 'right',
				layout : 'column',
				cls : 'blue-button-ct',
				items : [{
					columnWidth : .45,
					items : [{
						xtype : 'pictureShowBox',
						width : 420,
						height : 370
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
									id:'carNum',
									name : 'hphm',
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
									fieldLabel : '单位名称',
									name : 'dwmc',
									anchor : '96%'
								} ]
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
									fieldLabel : '设备名称',
									name : 'sbmc',
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
							}/*, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '号牌一致',
									name : 'hpyz',
									anchor : '96%'
								} ]
							}*/]
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
									fieldLabel : '车辆品牌',
									name : 'clpp',
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
						}]
				} ]
			} ],
			bbar : {
				cls : 'blue-button-ct',
				buttonAlign : 'center',
				buttons : [{
          	  		xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;',
					scope : this,
					handler : this.close
				} ]
			}
		});
		Jinpeng.fullTextSearch.CarDetailInfoWindow .superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Jinpeng.fullTextSearch.CarDetailInfoWindow .superclass.afterRender.call(this);
		//根据点击记录时设置的记录ID加载数据
		this.loadRecordById(this.recode);
		var xxbh = this.recode.get("xxbh");
		//同步"上一条","下一条"按钮状态.
		//this.synchronUpOrDown(xxbh);
	},
	/**
	 * 计算点击"上一条","下一条"按钮后，记录Id。
	 * @param id
	 * @param upOrDown
	 * @returns
	 */
	getDetailRecordId : function(id, upOrDown) {
		var nextId = null;
		//拿该数据在当前store中的id数组所在的序号
		var k = 0;
		var rownum=0;
	    if(id!=null){
			if(id.indexOf('|')>0 && id.indexOf('|')!= 0){
				//获取当前行数的Id
				this.loadId = id.substring((id.indexOf('|')+1));
				//获取行数(测试的时候用)
				//rownum = parseInt(id.substring(0,(id.indexOf('|'))));
			}
			for ( var i = 0; i < carPathInfoStore.getCount(); i++) {
				if (this.loadId == carPathInfoStore.getAt(i).get('xxbh')) {
					k = i;
					break;
				}
			}
		}
		if (upOrDown == false && k > 0) {
			nextId = (k-1)+"|"+carPathInfoStore.getAt(k - 1).get('xxbh');
		}
		if (upOrDown == true
				&& k < carPathInfoStore.getCount() - 1) {
			nextId = (k+1)+"|"+carPathInfoStore.getAt(k + 1).get('xxbh');
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
		var count = carPathInfoStore.getCount();
		var index = 0;
		for ( var i = 0; i < count; i++) {
			if (id == carPathInfoStore.getAt(i).get('xxbh')) {
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
	},
	/**
	 * 根据ID，detailRegStore加载该条记录的信息。
	 * @param xxbh 信息编号
	 */
	loadRecordById : function(data) {
		var record = {};
		// 加载数据		
		record.hphm = data.get("hphm");
		record.tx1 = data.get("tx1");
		record.xxbh = data.get("xxbh");
		record.kkbh = data.get("kkbh");
		record.dwmc = data.get("dwmc");
		record.kkmc = data.get("kkmc");
		record.sbmc = data.get("sbmc");
		record.fxbh = data.get("fxbh");
		record.fxmc = data.get("fxmc");
		record.cwhphm = data.get("cwhphm");
		record.cwhpys = window.dictionary.getValue("LicPlateColor",data.get("cwhpys"));
		//record.hpyz = window.dictionary.getValue("LicenseVerfiy",data.get("hpyz"));//号牌一致，
		record.clsd = Ext.util.Format.substr(data.get("clsd"),0,3);
		record.clxs = Ext.util.Format.substr(data.get("clxs"),0,3);	
		record.xszt = window.dictionary.getValue("DriverType", data.get("xszt"));//行驶状态，
		record.clpp = window.dictionary.getValue("CarBrand", data.get("clpp")); //车辆厂牌编码（自行编码）。
		record.csys = window.dictionary.getValue("CarColor", data.get("csys"));
		record.cllx = window.dictionary.getValue("CarType", data.get("cllx"));
		record.hpzl = window.dictionary.getValue("LicPlateType", data.get("hpzl"));
		//反向将数据加载到form表单中
		Ext.getCmp('detailForm').getForm().setValues(record);
		record.CARIMGURL = data.get("tx1");
		this.publish('loadPictures', record);
    }
});

//车辆信息库信息
Jinpeng.fullTextSearch.CarSourseFormPanel = Ext.extend(Ext.Panel,{
	id : 'sourcePanel',
	hight : 150,
	initComponent : function() {
		var _panel = this;
		Ext.apply(this,{
			items : [ {
				xtype : 'form',
				id : 'carInfoSourceForm',
				labelAlign : 'right',
				border : false,
				cls : 'blue-button-ct',
				items : [{
					xtype : 'fieldset',
					title : '车辆库信息',
					layout : "table",
					bodyStyle : 'padding-top : 5px;',
					defaults : {
						width : 350,
						layout : 'form'
					},
					layoutConfig : {
						columns : 3
					},
					items : [{
						// 第一行
						items :[{	
							xtype : 'displayfield',
							fieldLabel : '车牌号码',
							name : 'HPHM',
							id : 'HPHM',
							anchor : '90%'
						}]
					}, {
						items : [ {
							xtype : 'displayfield',
							fieldLabel : '车身颜色',
							id : 'CSYS',
							name : 'CSYS',
							anchor : '96%'
						} ]
					}, {
						items : [ {
							xtype : 'displayfield',
							fieldLabel : '号牌种类',
							id : 'HPZL',
							name : 'HPZL',
							anchor : '96%'
						} ]
					}, {
						items : [ {
							xtype : 'displayfield',
							fieldLabel : '车辆类型',
							id : 'CLXH',
							name : 'CLXH',
							anchor : '96%'
						} ]
					}, {
						items : [ {
							xtype : 'displayfield',
							fieldLabel : '车主姓名',
							id : 'JDCSYR',
							name : 'JDCSYR',
							anchor : '96%'
						} ]
					}, {
						items : [ {
							xtype : 'displayfield',
							fieldLabel : '联系方式',
							id : 'LXFS',
							name : 'LXFS',
							anchor : '96%'
						} ]
					}, {
						items : [ {
							xtype : 'displayfield',
							fieldLabel : '身份证号',
							id : 'SFZH',
							name : 'SFZH',
							anchor : '96%'
						} ]
					}, {
						items : [ {
							xtype : 'displayfield',
							fieldLabel : '车辆识别代号',
							id : 'CLSBDH',
							name : 'CLSBDH',
							anchor : '96%'
						} ]
					}, {
						items : [ {
							xtype : 'displayfield',
							fieldLabel : '车辆品牌',
							id : 'CLPP1',
							name : 'CLPP1',
							anchor : '96%'
						} ]
					}, {
						colspan:3,
						width:600,
						items : [ {
							xtype : 'displayfield',
							fieldLabel : '家庭地址',
							id : 'DJZZXZ',
							name : 'DJZZXZ',
							anchor : '96%'
						} ]
					}]
				}]
			} ]
		});
		Jinpeng.fullTextSearch.CarSourseFormPanel.superclass.initComponent.apply(this);
	},
	//加载车辆库详情信息
	loadSourceByCarNum : function(carNum) {
		var sourceForm = Ext.getCmp('carInfoSourceForm');
		Ext.Ajax.request({
			method : "POST",
			params : {
				"carNum" : carNum
			},
			url : rootpath + "/fullTextSearch/carSource.mvc",
			success : function(response, options) {
				var txt = response.responseJSON.data;
				if (txt.length == 0) {
					sourceForm.form.findField('HPHM').setValue('加载失败');
					sourceForm.form.findField('CSYS').setValue('加载失败');
					sourceForm.form.findField('HPZL').setValue('加载失败');
					sourceForm.form.findField('CLXH').setValue('加载失败');
					sourceForm.form.findField('JDCSYR').setValue('加载失败');
					sourceForm.form.findField('LXFS').setValue('加载失败');
					sourceForm.form.findField('SFZH').setValue('加载失败');
					sourceForm.form.findField('CLSBDH').setValue('加载失败');
					sourceForm.form.findField('CLPP1').setValue('加载失败');
					sourceForm.form.findField('DJZZXZ').setValue('加载失败');
				} else {
					sourceForm.form.findField('HPHM').setValue(txt[0].HPHM);
					sourceForm.form.findField('CSYS').setValue(txt[0].CSYS);
					sourceForm.form.findField('HPZL').setValue(txt[0].HPZL);
					sourceForm.form.findField('CLXH').setValue(txt[0].CLXH);
					sourceForm.form.findField('JDCSYR').setValue(txt[0].JDCSYR);
					sourceForm.form.findField('LXFS').setValue(txt[0].LXFS);
					sourceForm.form.findField('SFZH').setValue(txt[0].SFZH);
					sourceForm.form.findField('CLSBDH').setValue(txt[0].CLSBDH);
					sourceForm.form.findField('CLPP1').setValue(txt[0].CLPP1);
					sourceForm.form.findField('DJZZXZ').setValue(txt[0].DJZZXZ);
				}
			},
			failure : function(response, options) {
				sourceForm.form.findField('HPHM').setValue('加载失败');
				sourceForm.form.findField('CSYS').setValue('加载失败');
				sourceForm.form.findField('HPZL').setValue('加载失败');
				sourceForm.form.findField('CLXH').setValue('加载失败');
				sourceForm.form.findField('JDCSYR').setValue('加载失败');
				sourceForm.form.findField('LXFS').setValue('加载失败');
				sourceForm.form.findField('SFZH').setValue('加载失败');
				sourceForm.form.findField('CLSBDH').setValue('加载失败');
				sourceForm.form.findField('CLPP1').setValue('加载失败');
				sourceForm.form.findField('DJZZXZ').setValue('加载失败');
			}
		});
	}
});

Ext.reg('northFormPanel', Jinpeng.fullTextSearch.NorthFormPanel);
Ext.reg('gridCenterDataPanel', Jinpeng.fullTextSearch.gridCenterDataPanel);
Ext.reg('bayonetSearchGridPanel', Jinpeng.fullTextSearch.BayonetGridPanel);
Ext.reg('carPathGridPanel', Jinpeng.fullTextSearch.CarPathGridPanel);
Ext.reg('carSourseFormPanel', Jinpeng.fullTextSearch.CarSourseFormPanel);