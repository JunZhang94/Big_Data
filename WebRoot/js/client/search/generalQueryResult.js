//综合过车查询结果集页面
Ext.ns("Jinpeng.resultQuery");

var showFlag = 'grid';
var groupFlag = 'none';
var tabFlag='grid';
var praParams;// 查询条件
var conditions;// 页面查询组件
var taopaiParams;//即时分析套牌车所用 
var taopaiQueryUrl;//即时分析套牌车所用 
var taopaiConditions;//即时分析套牌车所用 
var config = {
	queryUrl : rootpath + parent.window.opener.queryUrl
};
var congtolCarNum = '';
var pageInfo = {
	pageNumber : 1,
	bbar : null,
	pageFlag : '',
	listShow : '',
	pigShow : '',
	gisShow : ''
};
Ext.onReady(function() {
	var resultScript = document.getElementById("resultScript"); 
	resultScript.src="http://" + ipAdress + "/PGISViewer/PGISViewer.html";// 域B的链接
	praParams = parent.window.opener.params;
	conditions = parent.window.opener.conditions;
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport( {
		layout : 'border',
		id : 'portBody',
		items : [ {
			// 表单
			region : 'north',
			border : false,
			height : 135,
			xtype : 'northFormPanel'
		}, {
			// 列表数据
			region : 'center',
			border : false,
			xtype : 'resultTabPanel'
		}],
		listeners : {
			afterrender : function() {
				pageInfo.bbar = Ext.getCmp('PagingToolbarCar');
				Ext.getCmp('resultTabPanel').setActiveTab(0);
			}
		}
	});
	// 默认加载查询功能
	// Ext.getCmp('resultPanel').resultQueryMethod();
});

/**
 * 列表展示，图表展示，地图展示TabPanel
 */
Jinpeng.resultQuery.ResultTabPanel = Ext.extend(Ext.TabPanel, {
	id : "resultTabPanel",
	initComponent : function() {
		var config = {
			items : [ {
				title : '列表展示',
				layout:'fit',
				listeners : {
					activate : this.handleListActivate
				},
				xtype : 'gridCenterDataPanel'

			}, {
				title : '图表展示',
				layout:'fit',
				listeners : {
					activate : this.handlePigActivate
				},
				xtype : 'dataPanel'
			}, {
				title : '地图展示',
				layout:'fit',
				listeners : {
					activate : this.handleGisActivate
				},
				xtype : 'gisDataPanel'
			} ]
		};
		Ext.apply(this, config);
		Jinpeng.resultQuery.ResultTabPanel.superclass.initComponent.apply(this, arguments);
	},
	/**
	 * 切换列表展示事件处理
	 */
	handleListActivate : function() {
		Ext.getCmp('gisShow').hide();
		var start = 0;
		//initMixOrMinNumner();
		pageInfo.pageNumber = pageInfo.bbar.getPageData().activePage;
		//alert(pageInfo.pageNumber + "= " +pageInfo.pageFlag);
		if (pageInfo.pageFlag == 'next') {
			start = (pageInfo.pageNumber - 1) * 15;
		} else if (pageInfo.pageFlag == 'pre') {
			start = (pageInfo.pageNumber - 1) * 15;
		}
		if (pageInfo.listShow != 'listdone') {
			var grid = Ext.getCmp('phones');
			grid.tpl = defaultTpl;
			showFlag = 'grid';
			Ext.getCmp('resultPanel').resultQueryMethod(start);
			pageInfo.listShow = 'listdone';
		}
		tabFlag='grid';
	},
	/**
	 * 切换图片展示事件处理
	 */
	handlePigActivate : function() {
		Ext.getCmp('gisShow').hide();
		//initMixOrMinNumner();
		var start = 0;
		pageInfo.pageNumber = pageInfo.bbar.getPageData().activePage;
		//alert(pageInfo.pageNumber + "= " +pageInfo.pageFlag);
		if (pageInfo.pageFlag == 'next') {
			start = (pageInfo.pageNumber - 1) * 15;
		} else if (pageInfo.pageFlag == 'pre') {
			start = (pageInfo.pageNumber - 1) * 15;
		}
		if (pageInfo.pigShow != 'pigdone') {
			var grid = Ext.getCmp('phones');
			grid.tpl = defaultTpl;
			showFlag = 'pig';
			Ext.getCmp('resultPanel').resultQueryMethod(start);
			pageInfo.pigShow = 'pigdone';
		}
		tabFlag='pig';
	},
	/**
	 * 切换Gis展示事件处理
	 */
	handleGisActivate : function() {
		var start = 0;
		//initMixOrMinNumner();
		pageInfo.pageNumber = pageInfo.bbar.getPageData().activePage;
		if (pageInfo.pageFlag == 'next') {
			start = (pageInfo.pageNumber - 1) * 15;
		} else if (pageInfo.pageFlag == 'pre') {
			start = (pageInfo.pageNumber - 1) * 15;
		}
		if (pageInfo.gisShow != 'gisdone') {
			showFlag = 'gis';
			Ext.getCmp('resultPanel').resultQueryMethod(start);
			pageInfo.gisShow = 'gisdone';
		}
		Ext.getCmp('gisShow').show();
		Ext.getCmp('gisShow').focus();
		tabFlag='gis';
	}
});

var initMixOrMinNumner = function() {
	var listNumber = Ext.getCmp('PagingToolbarCar').getPageNumber();
	var pigNumber = Ext.getCmp('PigPagingToolbarCar').getPageNumber();
	var smallNumber = Ext.getCmp('PagingToolbar').getPageNumber();
	var maxNumber = listNumber;
	if (maxNumber < pigNumber) {
		maxNumber = pigNumber;
	}
	if (maxNumber < smallNumber) {
		maxNumber = smallNumber;
	}
	var minNumber = listNumber;
	if (minNumber > pigNumber) {
		minNumber = pigNumber;
	}
	if (minNumber > smallNumber) {
		minNumber = smallNumber;
	}
	pageInfo.maxNumber = maxNumber;
	pageInfo.minNumber = minNumber;
}

// 表单
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
						columns : 4
					},
					bodyStyle : 'white-space : nowrap'
				}]
			} ],
			listeners : {
				afterrender : function() {
					// 定义查询条件
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
		Jinpeng.resultQuery.NorthFormPanel.superclass.initComponent.apply(this);
	},
	// 查询
	resultQueryMethod : function(start) {
		var grid;
		// 如果页面已经加载过了，就不需要再重新加载，这里是展示结果集的页面，查询条件是永远不变的
		if (showFlag == 'grid' || showFlag == 'pig' || showFlag == 'gis') {
			if (showFlag == 'grid') {
				grid = Ext.getCmp('resultGridPanel');
			} else if (showFlag == 'pig') {
				grid = Ext.getCmp('phones');
			} else {
				grid = Ext.getCmp('gisGridPanel');
			}
			grid.store.baseParams = {};// 重置
			// 将参数传入后台
			var baseparams = praParams;
			grid.store.baseParams = baseparams;
			/* 刷新选中 */
			this.publish("clearGridSelections",[]);
			var pageStart = 0;
			if (typeof(start) != 'undefined') {
				pageStart = start;
			}
			grid.store.load({
				params : {
					'page.start' : pageStart,
					'page.limit' : 15
				}
			});
		}
	}
});

// 所需数据
var resultQueryStore = new Ext.data.JsonStore({
	url : config.queryUrl,
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
	      {name : 'cscd'},
	      {name : 'ssdq'},
	      {name : 'brand'},
	      {name : 'type'},
	      {name : 'caryear'},
	      {name : 'rect'},
	      {name : 'clzl'}]
});

// 中心右区域数据
Jinpeng.resultQuery.gridCenterDataPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'resultGridPanel',
	border : false,
	frame : false,
	pageSize : 15,
	initComponent : function() {
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this,{
			store : resultQueryStore,
			cm : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
					new Ext.ux.grid.PagingRowNumberer({width : 40}),
					sm,/*
						  {header : '信息编号', dataIndex : 'xxbh'},
						*/ 
					{
						header : '车牌号码',
						dataIndex : 'hphm',
						renderer: function(val, metaData, record) {
							var str = "";
							var counts = record.data.cscd;
							if (val != '-' && val != '无车牌' && val != '无牌' && val != '车牌' && val != null && val != '—' && val != 'null') {
								//str = "<a href='#' onclick=\"showCarPlace('" + val + "','" + counts + "')\">" + val + "</a>";
								str = val;
							} else {
								str = '无';
							}
							return str;
							// return '<font ext:qtip="'+val+'"><a href="#">'+
							// val+'</a></font>';
						}
					},{
						header : '车牌颜色',
						dataIndex : 'hpysmc'
					}/*
						 * ,{ header : '号牌种类', dataIndex : 'hpzlmc' }
						 */,{
						header : '车辆速度',
						dataIndex : 'clsd',
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
						header : '违章类型',
						dataIndex : 'xszt',
						width : 250,
						hidden : praParams.hiddenFlag,
						renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
							// 当文字过多的时候，鼠标移上去就给悬浮狂提示
							var xszt = '';
							if (value != null) {
								xszt = '<font ext:qtip="'+value+'">'+value+'</font>';
							}
					     	return xszt;
					    }
					},{
						header : '卡口名称',
						dataIndex : 'kkmc',
						width : 250,
						renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
							// 当文字过多的时候，鼠标移上去就给悬浮狂提示
							var kkmcStr = '';
							if (value != null) {
								kkmcStr = '<font ext:qtip="'+value+'">'+value+'</font>';
							}
					     	return kkmcStr;
					    }
					},{
						header : '方向名称',
						dataIndex : 'fxmc',
						width : 200,
						renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
						     // 当文字过多的时候，鼠标移上去就给悬浮狂提示
							var fxmcStr = '';
							if (value != null) {
								fxmcStr = '<font ext:qtip="'+value+'">'+value+'</font>';
							}
					     	return fxmcStr;
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
						header : '车辆品牌',
						dataIndex : 'brand',
						width : 200,
						renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
						     // 当文字过多的时候，鼠标移上去就给悬浮狂提示
							var fxmcStr = '';
							if (value != null) {
								var type = record.data.type;
								var caryear = record.data.caryear;
								if (type != '') {
									value += "_" + type
									if (caryear != '') {
										value += "_" + caryear
									}
								}
								fxmcStr = '<font ext:qtip="'+value+'">'+value+'</font>';
							}
					     	return fxmcStr;
					    }
					}, {
						header : '操作', dataIndex : 'operate',
				    	xtype : 'actioncolumn',
                    	width : 300,
                    	align : 'center',
                    	scope : this,
                    	items : [{
							icon : rootpath + '/themes/client/blue/images/system/grid1.png',
							tooltip : '请点击过车详细',
							handler : function(grid, rowIndex, colIndex) {
                    			// 超链接方法
        						this.checkHref(grid, rowIndex);
                    		}
						}, {
							icon : rootpath + '/themes/client/blue/images/system/grid2.png',
							tooltip : '请点击行车轨迹',
							handler : function(grid, rowIndex, colIndex) {
								var recode = grid.store.getAt(rowIndex);
								var carNum = recode.get('hphm');
								showCarPlace(carNum);
							}
						}, {
							icon : rootpath + '/themes/client/blue/images/system/grid3.png',
							tooltip : '请点击加入布控',
							handler : function(grid, rowIndex, colIndex) {
								var recode = grid.store.getAt(rowIndex);
								var carNum = recode.get('hphm');
								inputControl(carNum);
							}
						}]
					} 
				]
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
						text : '最多只能导出5000条数据!'
					},
					text : '&nbsp;&nbsp;&nbsp;导出&nbsp;&nbsp;&nbsp;',
					handler : this.importExcelData
				},{
					xtype : 'tbspacer',
					width : 10
				},{
					xtype : 'button',
					id : 'picDownloadBtn',
					titletooltip : {
						text : " 勾选后下载选中的图片，否则按查询条件下载！"
					},
					text : '图片下载',
					handler : function(){
//						var httpUrl = Ext.getCmp("tx1");
//						var bjxxbh = Ext.getCmp("xxbh");
//						var carNum='' ;
						var records = Ext.getCmp('resultGridPanel').getSelectionModel().getSelections();
						if (records=='') {
							Ext.MessageBox.confirm("确认", "系统按查询条件下载如果多于15张图片，将启用后台下载！", function(v) {
								if ("yes" == v) {
									downloadPicture('search');
								}
							});
						}else{
							//linkDownloadPicture(bjxxbh,httpUrl,carNum);
							var ids = [];
						    var url = [];
						    var carNumB=[];
						    var jgsj=[];
						    var kkbh=[];
							for ( var i = 0; i < records.length; i++) {
								ids[ids.length] = records[i].get('xxbh');
								url[url.length] = records[i].get('tx1');
								carNumB[carNumB.length] = records[i].get('hphm');
								jgsj[jgsj.length]=Ext.util.Format.date(new Date(Number(records[i].get('jgsj'))), 'Y-m-d H:i:s');
								kkbh[kkbh.length] = records[i].get('kkbh');
							}
							var idString = ids ? ids.join(',') : '';
							var httpUrlString = url ? url.join(',') : '';
							var carNumber=carNumB ? carNumB.join(','):'';
							var jgsjString=jgsj ? jgsj.join(','):'';
							var kkbhString=kkbh ? kkbh.join(','):'';
							var params = {'idstr': idString,'url':httpUrlString,'carNum':carNumber,'jgsj':jgsjString,'kkbh':kkbhString};
							downloadPicture('select',params);
						}
					}
				}/*
					 * ,{ xtype : 'tbspacer', width : 10 },{ xtype : 'button',
					 * id : 'pigShowBtn', text : '图表展示', handler :
					 * this.pigShowData }
					 */,{
					xtype : 'tbspacer',
					width : 10
				},{
					xtype : 'button',
					id : 'exportMoreBtn',
					tooltip : {
						text : '导出大量数据，请到导出管理中心查询导出进度！'
					},
					text : '后台导出',
					handler : this.importMoreExcelData
				},{ 
					xtype : 'tbspacer',
					width : 10 
				},{ 
					xtype : 'button',
				    id : 'analyTaopaiBtn', 
				    text : '套牌车分析',
				    handler : this.analyTaopaiCar 
			    },{
					xtype : 'tbspacer',
					width : 100
				}, {
					xtype : 'form',
					cls : 'form-lable',
					items : [{
						xtype : 'displayfield',
						width : 450,
						fieldLabel : '多车牌或者多卡口条件下查询时间会比较慢，请耐心等待...',
						hidden : true,
						id : 'timeDesc',
						name : 'timeDesc'
					}]
				}]
			},
			bbar : new Jinpeng.widget.PagingHistoryToolbar( {
				id : 'PagingToolbarCar',
				store : resultQueryStore,
				// displayInfo : true,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据",
				moveFirst_re : function () {
					pageInfo.pageFlag = 'pre';
					pageInfo.pigShow = "";
					pageInfo.gisShow = "";
					pageInfo.bbar = Ext.getCmp('PagingToolbarCar');
					this.moveFirst();
				},
				movePrevious_re : function () {
					pageInfo.pageFlag = 'pre';
					pageInfo.pigShow = "";
					pageInfo.gisShow = "";
					pageInfo.bbar = Ext.getCmp('PagingToolbarCar');
					this.movePrevious();
				},
				moveNext_re : function () {
					pageInfo.pageFlag = 'next';
					pageInfo.pigShow = "";
					pageInfo.gisShow = "";
					pageInfo.bbar = Ext.getCmp('PagingToolbarCar');
					this.moveNext();
				},
				moveLast_re : function () {
					pageInfo.pageFlag = 'next';
					pageInfo.pigShow = "";
					pageInfo.gisShow = "";
					pageInfo.bbar = Ext.getCmp('PagingToolbarCar');
					this.moveLast();
				},
				goPage_re : function() {
					var bbre = Ext.getCmp('PagingToolbarCar');
					var goPageNumber = bbre.get(4).getValue();
					if (goPageNumber > bbre.getPageData().activePage) {
						pageInfo.pageFlag = 'next';
						pageInfo.pigShow = "";
						pageInfo.gisShow = "";
						pageInfo.bbar = Ext.getCmp('PagingToolbarCar');
						this.goPage();
					} else if (goPageNumber < bbre.getPageData().activePage) {
						pageInfo.pageFlag = 'pre';
						pageInfo.pigShow = "";
						pageInfo.gisShow = "";
						pageInfo.bbar = Ext.getCmp('PagingToolbarCar');
						this.goPage();
					}
				}
			}),
			listeners : {
				/* 双击查看 */
				rowdblclick : function(grid, rowIndex, e ) {
					grid.getSelectionModel().clearSelections();
					grid.getSelectionModel().selectRow(rowIndex);//选中指定行
					var data = grid.store.getAt(rowIndex);
					var win = new Jinpeng.resultQuery.ResultCarDetailWindow();
					win.recode = data;
					// 将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
					win.loadId = data.get("xxbh");
					win.tx1 = data.get("tx1");
					win.show();
				}
			}
		});
		// 最后一列查看点击事件
		/*this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
			var fieldName = grid.getColumnModel()
					.getDataIndex(columnIndex);
			if (fieldName == 'operate') {
				if (typeof this.checkHref == 'function')
					// 超链接方法
					this.checkHref(grid, rowIndex, columnIndex);
			}
		});*/
		Jinpeng.resultQuery.gridCenterDataPanel.superclass.initComponent.apply(this);
	},
	// 超链接的方法
	checkHref : function(grid, rowIndex, colIndex, item, event) {
		var recode = grid.store.getAt(rowIndex);
		if (recode) {
			// 创建window窗体
			var win = new Jinpeng.resultQuery.ResultCarDetailWindow();
			win.recode = recode;
			win.loadId = recode.get("xxbh");// 唯一序列号
			win.show();
		}
	},
	// 导出Excel格式数据方法
	importExcelData : function() {
		var records_length=Ext.getCmp('resultGridPanel').store.data.length;
		var records = Ext.getCmp('resultGridPanel').getSelectionModel().getSelections();
		var config = {
			selectExportURL : rootpath + "/car/exportHistoryData.mvc",
			queryExportURL : rootpath + "/car/exportHistoryData.mvc"
		};
		// 得到选中的ids
		var ids = [];
		var carNums = [];
		for ( var i = 0; i < records.length; i++) {
			ids[ids.length] = records[i].get('xxbh');
		}
		config.ids = ids;
		if (records_length > 0){
			if(ids.length>0) {
				config.count = ids.length; 
			} else {
				config.count = records_length;
				config.start = 0;
				config.limit = 5000;// 默认最大导出1000条
			}
		}else{
			config.count = 0;
		}
		var param = getQueryParams();
		config.queryCondition = param.join("&");
		var ExportHelper = new Jinpeng.HistoryExportHelper(config);
		ExportHelper.startExport(true);
	},
	importMoreExcelData : function() {
		var records = Ext.getCmp('resultGridPanel').store;
		/*
		 * if (records.data.items.length == 0) { var win = new
		 * Jinpeng.widget.MessageWindow(); win.msg = '页面无数据，请确保存在数据后再导出！';
		 * win.show(); return; }
		 */
		var config = {
			queryExportURL : rootpath + "/car/exportHistoryData.mvc"
		};
		var param = getQueryParams();// praParams
		config.queryCondition = param.join("&");
		var ExportHelper = new Jinpeng.HistoryMoreExportHelper(config);
		ExportHelper.startExport(true);
	},
	pigShowData : function() {
		var grid = Ext.getCmp('phones');
		grid.tpl = defaultTpl;
		// Ext.getCmp('listDataInfo').setVisible(false);
		// Ext.getCmp('pigDataInfo').setVisible(true);
		showFlag = 'pig';
		var panel = Ext.getCmp('resultPanel');
		panel.resultQueryMethod();
	},
	importCarNum : function() {
		new Jinpeng.carNum.UploadWindow({
			fileName:"carNumExcel",
			uploadURL : rootpath + "/car/importCarNumExcel.mvc",
			templateURL : rootpath+"/resources/car_num.xls",
			callbackFn : function(data){
				//Ext.getCmp('carNumStr').setValue(data);
			}
		}).show();
	},
	analyTaopaiCar : function() {
		var records = Ext.getCmp('resultGridPanel').getSelectionModel().getSelections();
		if(records.length ==0){
			Ext.Msg.alert("系统提示","请勾选要套牌车分析的数据！");
			return;
		}
		var carNums = [];
		for ( var i = 0; i < records.length; i++) {
			carNums[carNums.length] = records[i].get('hphm');
		}
		var carNumList=carNums ? carNums.join(','):'';
		var url = rootpath + '/car/taopaicheResultPage.mvc';
		taopaiQueryUrl =  "/car/taopaiLocalCar.mvc";
		var title = '套牌车分析结果';
		
		taopaiParams = {
			'carNumList' : carNumList,
			'carSpeed' :'',
			'startdate':Ext.getCmp('startdate').getValue(), 
			'enddate'   :Ext.getCmp('enddate').getValue(),
			'mounts' : '',
			'confimFlag' : '0'
		};
		//定义查询条件
		taopaiConditions = [{
			items :[{
				xtype : 'displayfield',
				fieldLabel : '车牌号码',
				name : 'carNumStr',
				id : 'carNumStr',
				value : carNumList,
				anchor : '96%'
			}]
		}, {
			items : [ {
				xtype : 'displayfield',
				fieldLabel : '车辆速度',
				id : 'speed',
				name : 'speed',
				value : '',
				anchor : '96%'
			} ]
		}, {
			items : [{
				xtype : 'displayfield',
				fieldLabel : '是否确认',
				id : 'confimFlag',
				name : 'confimFlag',
				value :'否',
				anchor : '96%'
			}]
		}, {
			items : [ {
				xtype : 'displayfield',
				fieldLabel : '开始时间',
				id : 'startdate',
				name : 'startTime',
				value : Ext.getCmp('startdate').getValue(),
				anchor : '96%'
			} ]
		},{
			items : [ {
				xtype : 'displayfield',
				fieldLabel : '结束时间',
				id : 'enddate',
				name : 'endTime',
				value : Ext.getCmp('enddate').getValue(),
				anchor : '96%'
			} ]
		},{
			items : [{
				xtype : 'displayfield',
				fieldLabel : '所选卡点',
				id : 'passStation',
				name : 'passStation',
				value : '',
				anchor : '96%'
			}]
		}];
		//Ext.util.Cookies.set("datas", Ext.encode(datas));
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
});

// 所需数据
var smallQueryStore = new Ext.data.JsonStore({
	url : config.queryUrl,
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
	      {name : 'cscd'},
	      {name : 'ssdq'},
	      {name : 'brand'},
	      {name : 'type'},
	      {name : 'caryear'},
	      {name : 'rect'},
	      {name : 'clzl'}
	]
});

// 与GIS结合的grid
Jinpeng.resultQuery.SmallGridDataPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'gisGridPanel',
	border : false,
	frame : false,
	height :  Ext.getBody().getHeight() - 165,
	pageSize : 15,
	initComponent : function() {
		Ext.apply(this,{
			store : smallQueryStore,
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
								var counts = record.data.cscd;
								if (val != '-' && val != '无车牌' && val != '无牌' && val != '车牌' && val != null && val != '—' && val != 'null') {
									str = "<a href='#' onclick=\"showCarPlace('" + val + "','" + counts + "')\">" + val + "</a>";
								} else {
									str = '无';
								}
								return str;
							}
						},{
							header : '卡口名称',
							dataIndex : 'kkmc',
							width : 200,
							renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
								// 当文字过多的时候，鼠标移上去就给悬浮狂提示
								var kkmcStr = '';
								if (value != null) {
									kkmcStr = '<font ext:qtip="'+value+'">'+value+'</font>';
								}
						     	return kkmcStr;
						    }
						},{
							header : '经过时间',
							width : 150,
							dataIndex : 'jgsj',
					        renderer: function (val) {
					        	if (val) {
					        		return Ext.util.Format.date(new Date(Number(val)), 'Y-m-d H:i:s');
					        	}
					        	return "";
					        }
						}]
			}),
			bbar : new Jinpeng.widget.PagingHistoryToolbar( {
				id : 'PagingToolbar',
				store : smallQueryStore,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据",
				moveFirst_re : function () {
					pageInfo.pageFlag = 'pre';
					pageInfo.pigShow = "";
					pageInfo.listShow = "";
					pageInfo.bbar = Ext.getCmp('PagingToolbar');
					this.moveFirst();
				},
				movePrevious_re : function () {
					pageInfo.pageFlag = 'pre';
					pageInfo.pigShow = "";
					pageInfo.listShow = "";
					pageInfo.bbar = Ext.getCmp('PagingToolbar');
					this.movePrevious();
				},
				moveNext_re : function () {
					pageInfo.pageFlag = 'next';
					pageInfo.pigShow = "";
					pageInfo.listShow = "";
					pageInfo.bbar = Ext.getCmp('PagingToolbar');
					this.moveNext();
				},
				moveLast_re : function () {
					pageInfo.pageFlag = 'next';
					pageInfo.pigShow = "";
					pageInfo.listShow = "";
					pageInfo.bbar = Ext.getCmp('PagingToolbar');
					this.moveLast();
				},
				goPage_re : function() {
					var bbre = Ext.getCmp('PagingToolbar');
					var goPageNumber = bbre.get(4).getValue();
					if (goPageNumber > bbre.getPageData().activePage) {
						pageInfo.pageFlag = 'next';
						pageInfo.pigShow = "";
						pageInfo.listShow = "";
						pageInfo.bbar = Ext.getCmp('PagingToolbar');
						this.goPage();
					} else if (goPageNumber < bbre.getPageData().activePage) {
						pageInfo.pageFlag = 'pre';
						pageInfo.pigShow = "";
						pageInfo.listShow = "";
						pageInfo.bbar = Ext.getCmp('PagingToolbar');
						this.goPage();
					}
				}
			}),
			listeners : {
				/* 双击查看 */
				rowdblclick : function(grid, rowIndex, e ) {
					var data = grid.store.getAt(rowIndex);
					var win = new Jinpeng.resultQuery.ResultCarDetailWindow();
					win.recode = data;
					// 将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
					win.loadId = data.get("xxbh");
					win.tx1 = data.get("tx1");
					win.show();
				},
				rowclick : function(grid, rowIndex, e) {
					var data = grid.store.getAt(rowIndex);
					var kkbh = data.get("kkbh");
					var kkmc = data.get("kkmc");
					if (kkmc != null && kkmc != '') {
						window.carDisIframe.GIS_Clear();// 清除选择
						window.carDisIframe.GIS_ZoomTo(kkbh);
					}
					Ext.getCmp('gisShow').focus();
				}
			}
		});
		// 最后一列查看点击事件
		this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
			var fieldName = grid.getColumnModel()
					.getDataIndex(columnIndex);
			if (fieldName == 'operate') {
				if (typeof this.checkHref == 'function')
					// 超链接方法
					this.checkHref(grid, rowIndex, columnIndex);
			}
		});
		// 数据加载完成后，组装json提交GIS服务进行响应
		this.store.on("load",function(store) {
		    var count=store.getCount();
			if(null!=store){ 
			    for(var i=0;i<count;i++){
			    	var record=store.data.items[i];
					var hphm=record.data.hphm;
					var kkmc=record.data.kkmc;
					var jgsj=record.data.jgsj;
					var img=record.data.tx1;
					
				}
			}
	    },this);
		Jinpeng.resultQuery.SmallGridDataPanel.superclass.initComponent.apply(this);
	},
	// 超链接的方法
	checkHref : function(grid, rowIndex, colIndex, item, event) {
		var recode = grid.store.getAt(rowIndex);
		if (recode) {
			// 创建window窗体
			var win = new Jinpeng.resultQuery.ResultCarDetailWindow();
			win.recode = recode;
			win.loadId = recode.get("xxbh");
			win.show();
		}
	}
});

function showCarPlace(carNum, counts) {
	var orgId ='';
	var orgType = '';
	var kkbhs = '';
	if(praParams.pageFlag=='carHidden'){
		carNum=carNum+";"+praParams.pageFlag
	}
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
//展现人车识别的照片
function showOperatorPic(srcPic,targetPic){
	Ext.getCmp('srcPic').getEl().dom.src=srcPic;
	Ext.getCmp('targetPic').getEl().dom.src=targetPic;
	Ext.getCmp('srcPicFrame').setVisible(true);
	Ext.getCmp('targetPicFrame').setVisible(true);
}

var win;
var inputControl = function(carNum) {
	win = new Jinpeng.resultQuery.ControlInputWindow({
		title : '车牌精确布控'
	});
	congtolCarNum = carNum;
	//win.setCarNum(carNum);
	win.show();
}

var closeControlWin = function() {
	win.close();
}

var triggerFlag = false;
var openDetailWin = function() {
	triggerFlag = true;
}

// 弹出窗口历史过车详细信息
Jinpeng.resultQuery.ResultCarDetailWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
	width : 1200,
	height : 700,
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
					columnWidth : .60,
					// bodyStyle : 'padding-left : 5px;',
					// layout : 'form',
					items : [{
						// 图形组件
						xtype : 'pictureShowBox',
						width : 680,
						height : 630
					} ]
				},
				{
					columnWidth : .40,
					layout : 'form',
					items : [{xtype : 'fieldset',
							title : '基本信息',
							layout : "table",
							bodyStyle : 'padding-top : 5px;',
							defaults : {
								width : 230,
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
							},{
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '经过时间',
									id : 'jgsj',
									name : 'jgsj',
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
							}]
						},{xtype : 'fieldset',
							title : '车辆信息',
							layout : "table",
							bodyStyle : 'padding-top : 5px;',
							defaults : {
								width : 230,
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
							}/*
								 * , { items : [ { xtype : 'displayfield',
								 * fieldLabel : '车身长度(cm)', name : 'cscd',
								 * anchor : '96%' } ] }
								 */, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车牌颜色',
									name : 'hpys',
									anchor : '96%'
								} ]
							}/*
								 * , { items : [ { xtype : 'displayfield',
								 * fieldLabel : '违法状态', name : 'wfzt', anchor :
								 * '96%' } ] }
								 */, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车辆品牌',
									name : 'clpp',
									anchor : '96%'
								} ]
							}/*
								 * , { items : [ { xtype : 'displayfield',
								 * fieldLabel : '车辆外形', name : 'clwx', anchor :
								 * '96%' } ] }
								 */, {
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
									name : 'kkbh',
									id:'kkbh',
									anchor : '96%'
								} ]
							},{
								items : [ {
									xtype : 'hidden',
									name : 'tx1',
									id:'tx1',
									anchor : '96%'
								} ]
							},{
								items : [ {
									xtype : 'hidden',
									name : 'rect',
									id:'rect',
									anchor : '96%'
								} ]
							}]
						},{
							xtype : 'fieldset',
							title : '车主信息',
							layout : "table",
							bodyStyle : 'padding-top : 5px;',
							defaults : {
								width : 230,
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
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '人车是否一致',
									id :'operatorFlag',
									name : 'operatorFlag',
									hidden:true,
									value:"加载中.....",
									anchor : '96%'
								} ]
							 },{
									xtype : 'spacer'
							  },{
								   items:[{
									   xtype : 'fieldset',
									   title : '驾驶人图片',
									   layout : "table",
									   id : 'targetPicFrame',
									   hidden:true,
									   defaults : {
										   width : 120,
										   layout : 'form'
									   },
								   items:[{
										xtype : 'box',
										inputType : "image",
										height : 150,
									//	width :120,
										id : 'targetPic',
										name : 'targetPic',
										autoEl : {tag : 'img'}
									}]
								   }]
							   }, {
								   items:[{
									   xtype : 'fieldset',
									   title : '车主图片',
									   layout : "form",
									   id : 'srcPicFrame',
									   hidden:true,
									   defaults : {
										   width : 120,
										   layout : 'form'
									   },
								   items:[{
										xtype : 'box',
										inputType : "image",
										height : 150,
									//	width :120,
										id : 'srcPic',
										name : 'srcPic',
										autoEl : {tag : 'img'}
									}]
								  }]
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
						if (showFlag == 'grid') {
							Ext.getCmp('resultGridPanel').getSelectionModel().selectRow(idNum);//选中指定行
							gridStore = resultQueryStore;
						} else {
							gridStore = dataViewStore;
						}
						// 获取选中的的行数-1
						var data = gridStore.getAt(idNum);
						// 如果不为空，则进行数据加载
						if (data!= null) {
							this.loadRecordById(data,idNum);
							// 同步"上一条","下一条"按钮状态.
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
						// 对值的截取操作
						var idNum = id.substring(0,id.indexOf('|'));
					    var idXxbh = id.substring((id.indexOf('|')+1));
					    var gridStore;
						if (showFlag == 'grid') {
							Ext.getCmp('resultGridPanel').getSelectionModel().selectRow(idNum);//选中指定行
							gridStore = resultQueryStore;
						} else {
							gridStore = dataViewStore;
						}
						// 获取选中的的行数+1
						var data = gridStore.getAt(idNum);
						
						// 如果不为空，则进行数据加载
						if (data != null) {
							this.loadRecordById(data,idNum);
							// 同步"上一条","下一条"按钮状态.
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
						// 获取当前记录的id
          	  			var kkbh = Ext.getCmp('kkbh').getValue();
          	  			var jgsj = Ext.getCmp('jgsj').getValue();
						var id = Ext.getCmp('xxbh').getValue();
						var httpUrl = Ext.getCmp('tx1').getValue();
						var carNum = Ext.getCmp('carNum_win').getValue();
						var params = {'idstr': id,'url':httpUrl,'carNum':carNum,'jgsj':jgsj,'kkbh':kkbh};
						downloadPicture('select',params);
					}
				},{
	          		  xtype : 'tbspacer',
	          		  width : 10
          	  	},{
          	  	xtype : 'button',
				text : '判定人车是否一致',
				id : 'operatorFlagbtn',
				hidden : true,
				handler : function() {
					// 获取当前记录的id
					var id = Ext.getCmp('xxbh').getValue();
					var httpUrl = Ext.getCmp('tx1').getValue();
					var carNum = Ext.getCmp('carNum_win').getValue();
					var jgsj = Ext.getCmp('jgsj').getValue();
					var sfzh=Ext.getCmp('detailWindowForm').getForm().findField('SFZH').getValue();
					var params = {'idstr': id,'url':httpUrl,'carNum':carNum,'sfzh':sfzh,'jgsj':jgsj};
					getOperatorFlag(params);
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
			},
			keys:[
			    {
					key:[39,40], // 调用方法获取下一条记录id
					fn: function(){ 
				    	var gridStore;
				    	var pagingToolbar;
				    	
				    	if (showFlag == 'grid') {//列表
				    		gridStore = resultQueryStore;
				    		pagingToolbar =Ext.getCmp('PagingToolbarCar'); 
				    	} else if(showFlag=='pig'){//图表
				    		gridStore = dataViewStore;
				    		pagingToolbar =Ext.getCmp('PigPagingToolbarCar'); 
				    	}else{
				    		gridStore = smallQueryStore;//GIS
				    		pagingToolbar =Ext.getCmp('PagingToolbar'); 
				    	}
				    	var currentPage=pagingToolbar.getPageData().activePage;
				    	var totalPage=pagingToolbar.getPageData().pages;
						var id = this.getDetailRecordId(this.loadId, true);
						var idNum = id.substring(0,id.indexOf('|'));
						if(idNum==0&&currentPage!=totalPage){
							pagingToolbar.moveNext();
							var data;
							var idXxbh;
							var array;
							Ext.Ajax.request({
								method : "POST",
								async:false,
								params : {
									"carNum" : (praParams.carNum==undefined?'':praParams.carNum),
									"mounts" : (praParams.mounts==undefined?'':praParams.mounts),
									"startTime" : praParams.startTime,
									"endTime" : praParams.endTime,
									"carColor" : (praParams.carColor==undefined?'':praParams.carColor),
									"hpys" : (praParams.hpys==undefined?'':praParams.hpys),
									"carBrand" : (praParams.carBrand==undefined?'':praParams.carBrand),
									"carType" : (praParams.carType==undefined?'':praParams.carType),
									"carYear" : (praParams.carYear==undefined?'':praParams.carYear),
									"carCategory" : (praParams.carCategory==undefined?'':praParams.carCategory),
									"dropNum" : (praParams.dropNum==undefined?'':praParams.dropNum),
									"boxNum" : (praParams.boxNum==undefined?'':praParams.boxNum),
									"tagNum" : (praParams.tagNum==undefined?'':praParams.tagNum),
									"sunflag" : (praParams.sunflag==undefined?'':praParams.sunflag),
									"groupFlag" : groupFlag,
									"pageFlag" : "history",
									"page.start" : Number(currentPage)*15,
									"page.limit" : 15
								},
								url : rootpath + "/carType/testCarSearch.mvc",
								success :function(response, options) {
									array=response.responseJSON;
									data=response.responseJSON.result[0];
									idXxbh = data.dataxxbh;
								}
							});
							if (data!= null) {
								this.loaddataById(data,idNum,array);
								// 同步"上一条","下一条"按钮状态.
								this.loadId=idNum+'|'+array.result[0].xxbh;
								this.synchronUpOrDown(idXxbh);
							}
							return;
						}
						if((idNum==""||idNum==0)&&currentPage==totalPage){
							return;
						}
						// 对值的截取操作
						// 获取选中的的行数+1
						var data = gridStore.getAt(idNum);
						var idXxbh = data.get('xxbh');
						this.loadId=idNum+'|'+idXxbh;
						// 如果不为空，则进行数据加载
						if (data != null) {
							this.loadRecordById(data,idNum);
							// 同步"上一条","下一条"按钮状态.
							this.synchronUpOrDown(idXxbh);
						}
			    	},
					scope:this
			    },{
					key:[37,38], // 调用方法获取上一条记录id
					fn: function(){
				    	var gridStore;
				    	var pagingToolbar;
				    	if (showFlag == 'grid') {//列表
				    		gridStore = resultQueryStore;
				    		pagingToolbar =Ext.getCmp('PagingToolbarCar'); 
				    	} else if(showFlag=='pig'){//图表
				    		gridStore = dataViewStore;
				    		pagingToolbar =Ext.getCmp('PigPagingToolbarCar'); 
				    	}else{
				    		gridStore = smallQueryStore;//GIS
				    		pagingToolbar =Ext.getCmp('PagingToolbar'); 
				    	}
				    	var currentPage=pagingToolbar.getPageData().activePage;
				    	var totalPage=pagingToolbar.getPageData().pages;
						var id = this.getDetailRecordId(this.loadId, false);
						var idNum = id.substring(0,id.indexOf('|'));
						if(idNum=="14"&&currentPage!=1){
							pagingToolbar.movePrevious();
							var data;
							var idXxbh;
							var array;
							Ext.Ajax.request({
								method : "POST",
								async:false,
								params : {
									"carNum" : (praParams.carNum==undefined?'':praParams.carNum),
									"mounts" : (praParams.mounts==undefined?'':praParams.mounts),
									"startTime" : praParams.startTime,
									"endTime" : praParams.endTime,
									"carColor" : (praParams.carColor==undefined?'':praParams.carColor),
									"hpys" : (praParams.hpys==undefined?'':praParams.hpys),
									"carBrand" : (praParams.carBrand==undefined?'':praParams.carBrand),
									"carType" : (praParams.carType==undefined?'':praParams.carType),
									"carYear" : (praParams.carYear==undefined?'':praParams.carYear),
									"carCategory" : (praParams.carCategory==undefined?'':praParams.carCategory),
									"dropNum" : (praParams.dropNum==undefined?'':praParams.dropNum),
									"boxNum" : (praParams.boxNum==undefined?'':praParams.boxNum),
									"tagNum" : (praParams.tagNum==undefined?'':praParams.tagNum),
									"sunflag" : (praParams.sunflag==undefined?'':praParams.sunflag),
									"groupFlag" : groupFlag,
									"pageFlag" : "history",
									"page.start" : (Number(currentPage)-2)*15,
									"page.limit" : 15
								},
								url : rootpath + "/carType/testCarSearch.mvc",
								success :function(response, options) {
									array=response.responseJSON;
									data=response.responseJSON.result[14];
									idXxbh = data.dataxxbh;
								}
							});
							if (data!= null) {
								this.loaddataById(data,idNum,array);
								// 同步"上一条","下一条"按钮状态.
								this.loadId=idNum+'|'+array.result[14].xxbh;
								this.synchronUpOrDown(idXxbh);
							}
							return;
						}
						if(idNum==""&&currentPage==1){
							return;
						}
						// 获取选中的的行数-1
						var data = gridStore.getAt(idNum);
						var idXxbh = data.get('xxbh');
//						this.loadId=idNum+'|'+idXxbh;
						// 如果不为空，则进行数据加载
						if (data!= null) {
							this.loadRecordById(data,idNum);
							// 同步"上一条","下一条"按钮状态.
							this.synchronUpOrDown(idXxbh);
						}
						
			    	},
					scope:this
			    }
			]
		});
		Jinpeng.resultQuery.ResultCarDetailWindow .superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Jinpeng.resultQuery.ResultCarDetailWindow .superclass.afterRender.call(this);
		// 根据点击记录时设置的记录ID加载数据
		this.loadRecordById(this.recode);
		var xxbh = this.recode.get('xxbh');
		// 同步"上一条","下一条"按钮状态.
		this.synchronUpOrDown(xxbh);
	},
	
	//测试
	loaddataById : function(data,carnum,array){
		var carNumber ;
		var gridStore;
		if(carnum != undefined){
			carNumber = array.result[carnum].hphm;
		}
		var record = {};
		// 加载数据
		record.hphm = data.hphm;
		record.tx1 = data.tx1;
		record.xxbh = data.xxbh;
		record.kkbh = data.kkbh;
		record.dwmc = data.dwmc;
		record.kkmc = data.kkmc;
		record.sbmc = data.sbmc;
		record.fxbh = data.fxbh;
		record.fxmc = data.fxmc;
		if(tabFlag=='pig'){
			record.jgsj = data.data.time;
		}else{
			record.jgsj = Ext.util.Format.date(new Date(Number(data.jgsj)), 'Y-m-d H:i:s');
		}
		record.hpys = data.hpysmc;
		record.hpyz = window.dictionary.getValue("LicenseVerfiy",data.hpyz);// 号牌一致，
		record.clsd = Ext.util.Format.substr(data.clsd,0,3);
		record.clxs = Ext.util.Format.substr(data.clxs,0,3);	
		// record.xszt = window.dictionary.getValue("DriverType",
		// data.get("xszt"));//行驶状态，
		var brand = data.brand;
		var type = data.type;
		if (type != '') {
			brand += "_" + type;
			var caryear = data.caryear;
			if (caryear != '') {
				brand += "_" + caryear;
			}
		}
		record.clpp = brand; // 车辆品牌
		record.csys = window.dictionary.getValue("CarColor", data.csys);
		record.cllx = window.dictionary.getValue("CarCategory", data.clzl);
		record.hpzl = window.dictionary.getValue("LicPlateType", data.hpzl);
		// 反向将数据加载到form表单中
		Ext.getCmp('detailWindowForm').getForm().setValues(record);
		//record.CARIMGURL = data.tx1;
		alert("data.rect=="+data.rect);
		record.CARIMGURL = rootpath + "/car/editImage.mvc?url="+data.tx1+"&rect="+data.rect;
		this.publish('loadPictures', record);
		/* 视频网暂时屏蔽车辆信息功能 */
		if(carNumber != data.hphm){
			Ext.Ajax.request({
			method : "POST",
			params : {
				"carNum" : data.hphm
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
//		if(data.hphm=='粤A22334'){
//			//设置人车识别按钮可见
//			Ext.getCmp('operatorFlagbtn').setVisible(true);
//		}
	
	},
	
	/**
	 * 根据ID，detailRegStore加载该条记录的信息。
	 * 
	 * @param xxbh
	 *            信息编号
	 */
	loadRecordById : function(data,carnum) {
		
		var carNumber ;
		var gridStore;
		if (showFlag == 'grid') {
			gridStore = resultQueryStore;
		} else {
			gridStore = dataViewStore;
		}
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
		record.kkbh = data.get("kkbh");
		record.dwmc = data.get("dwmc");
		record.kkmc = data.get("kkmc");
		record.sbmc = data.get("sbmc");
		record.fxbh = data.get("fxbh");
		record.fxmc = data.get("fxmc");
		if(tabFlag=='pig'){
			record.jgsj = data.data.time;
		}else{
			record.jgsj = Ext.util.Format.date(new Date(Number(data.get('jgsj'))), 'Y-m-d H:i:s');
		}
		record.hpys = data.get("hpysmc");
		record.hpyz = window.dictionary.getValue("LicenseVerfiy",data.get("hpyz"));// 号牌一致，
		record.clsd = Ext.util.Format.substr(data.get("clsd"),0,3);
		record.clxs = Ext.util.Format.substr(data.get("clxs"),0,3);	
		// record.xszt = window.dictionary.getValue("DriverType",
		// data.get("xszt"));//行驶状态，
		var brand = data.get("brand");
		var type = data.get("type");
		if (type != '') {
			brand += "_" + type;
			var caryear = data.get("caryear");
			if (caryear != '') {
				brand += "_" + caryear;
			}
		}
		record.clpp = brand; // 车辆品牌
		record.csys = window.dictionary.getValue("CarColor", data.get("csys"));
		record.cllx = window.dictionary.getValue("CarCategory", data.get("clzl"));
		record.hpzl = window.dictionary.getValue("LicPlateType", data.get("hpzl"));
		// 反向将数据加载到form表单中
		Ext.getCmp('detailWindowForm').getForm().setValues(record);
		//record.CARIMGURL = data.get("tx1");
	//	alert("data2=="+data.get("rect"));
		record.CARIMGURL =rootpath + "/car/editImage.mvc?url="+data.get("tx1")+"&rect="+data.get("rect");
		this.publish('loadPictures', record);
		/* 视频网暂时屏蔽车辆信息功能 ligf-20170313
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
		*/
		var driverFlag=window.dictionary.getValue("DriverFlag", "openFlag");
		if(driverFlag=="1"){
			//设置人车识别按钮可见
			Ext.getCmp('operatorFlagbtn').setVisible(true);
		}
	},
	/**
	 * 从grid的store获取详细信息id方法
	 * 
	 * @author jzxie
	 * @param id
	 * @param upOrDowm
	 *            true&false
	 */
	getDetailRecordId : function(id, upOrDown) {
		var nextId = null;
		// 拿该数据在当前store中的id数组所在的序号
		var k = 0;
		var rownum=0;
		var gridStore;
		if (showFlag == 'grid') {//列表
    		gridStore = resultQueryStore;
    		pagingToolbar =Ext.getCmp('PagingToolbarCar'); 
    	} else if(showFlag=='pig'){//图表
    		gridStore = dataViewStore;
    		pagingToolbar =Ext.getCmp('PigPagingToolbarCar'); 
    	}else{
    		gridStore = smallQueryStore;//GIS
    		pagingToolbar =Ext.getCmp('PagingToolbar'); 
    	}
		if(id!=null){
			if(id.indexOf('|')>0 && id.indexOf('|')!= 0){
				// 获取当前行数的Id
				this.loadId = id.substring((id.indexOf('|')+1));
				// 获取行数(测试的时候用)
				// rownum = parseInt(id.substring(0,(id.indexOf('|'))));
			}
			
			for ( var i = 0; i < gridStore.getCount(); i++) {
				if (this.loadId == gridStore.getAt(i).get('xxbh')) {
					k = i;
					break;
				   }
			}
			
		}
		var currentPage=pagingToolbar.getPageData().activePage;
    	var totalPage=pagingToolbar.getPageData().pages;
		if (upOrDown == false && k > 0) {
			// 测试用的
			// nextId = (rownum-k)+'|'+resultQueryStore.getAt(k-1).get('xxbh');
			// 信息编号唯一的情况下使用
			nextId = (k-1)+'|'+gridStore.getAt(k-1).get('xxbh');
		}
		if(upOrDown == false && k==0 && currentPage!=1){
			nextId = 14+'|'+gridStore.getAt(gridStore.getCount()-1).get('xxbh');
		}
		if (upOrDown == true && k < gridStore.getCount() - 1) {
			
			// nextId =
			// (k+rownum+1)+'|'+resultQueryStore.getAt(k+1).get('xxbh');
			nextId = (k+1)+'|'+gridStore.getAt(k+1).get('xxbh');
			
		}
		if (upOrDown == true && k == gridStore.getCount()-1 && currentPage!=totalPage) {
			nextId=0+'|'+gridStore.getAt(0).get('xxbh');
		}
		if(nextId) {
			this.loadId = nextId;
		}else{
			return this.loadId;
		}
		return nextId;
	},
	/**
	 * 同步"上一条","下一条"按钮状态.
	 */
	synchronUpOrDown : function(id) {
		var gridStore;
		var pagingToolbar;
    	if (showFlag == 'grid') {//列表
    		gridStore = resultQueryStore;
    		pagingToolbar =Ext.getCmp('PagingToolbarCar'); 
    	} else if(showFlag=='pig'){//图表
    		gridStore = dataViewStore;
    		pagingToolbar =Ext.getCmp('PigPagingToolbarCar'); 
    	}else{
    		gridStore = smallQueryStore;//GIS
    		pagingToolbar =Ext.getCmp('PagingToolbar'); 
    	}
    	var currentPage=pagingToolbar.getPageData().activePage;
		var totalPage=pagingToolbar.getPageData().pages;
		var count = gridStore.getCount();
		var index = 0;
		for ( var i = 0; i < count; i++) {
			if (id == gridStore.getAt(i).get('xxbh')) {
				index = i;
				break;
			}
		}
		// 更改状态
		if (count == 1&&(currentPage==totalPage)) {
			if(currentPage!=1){
				Ext.getCmp('nextButton').disable();
			}else{
				Ext.getCmp('nextButton').disable();
				Ext.getCmp('prevButton').disable();
			}
		} else if(index == 0&&(currentPage==1)) {
			Ext.getCmp('prevButton').disable();
			if(count == 2) {
				Ext.getCmp('nextButton').enable();
			}
		} else if (index == (count-1)&&(currentPage==totalPage)) {
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

// 获取当前查询条件参数，并封装为数组
function getQueryParams() {
	// 将查询参数传递到后台，并在后台获取要导出的数据
// var nullCarNum = Ext.getCmp('nullCarNum').getValue() == false ? '0' : '1';
// var searchCarNum = Ext.getCmp('carNumStr').getValue();
// if (nullCarNum == '1') {
// searchCarNum = '-,—,无牌,无车牌,车牌';
// }
	var param = [];
	// param[param.length] = "xxbh="+Ext.getCmp('xxbh').getValue();
	param[param.length] = "carNum=" + (praParams.carNum==undefined?'':praParams.carNum);
	param[param.length] = "mounts=" + (praParams.mounts==undefined?'':praParams.mounts);
	param[param.length] = "startTime=" + praParams.startTime;
	param[param.length] = "endTime=" + praParams.endTime;
	param[param.length] = "carColor=" + (praParams.carColor==undefined?'':praParams.carColor);
	param[param.length] = "hpys=" + (praParams.hpys==undefined?'':praParams.hpys);
	param[param.length] = "carBrand=" + (praParams.carBrand==undefined?'':praParams.carBrand);
	param[param.length] = "carType=" + (praParams.carType==undefined?'':praParams.carType);
	param[param.length] = "carYear=" + (praParams.carYear==undefined?'':praParams.carYear);
	param[param.length] = "carCategory=" + (praParams.carCategory==undefined?'':praParams.carCategory);
	param[param.length] = "dropNum=" + (praParams.dropNum==undefined?'':praParams.dropNum);
	param[param.length] = "boxNum=" + (praParams.boxNum==undefined?'':praParams.boxNum);
	param[param.length] = "tagNum=" + (praParams.tagNum==undefined?'':praParams.tagNum);
	param[param.length] = "sunflag=" + (praParams.sunflag==undefined?'':praParams.sunflag);
	param[param.length] = "modelExportType=" + (praParams.modelExportType==undefined?'':praParams.modelExportType);
	param[param.length] = 'flag=export';
	return param;
}

// 所需数据
var dataViewStore = new Ext.data.JsonStore({
	url : config.queryUrl,
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
			name : 'time',
			mapping:'jgsj',
			convert: function (val, record) {
	        	if (val) {
	        		return Ext.util.Format.date(new Date(Number(val)), 'Y-m-d H:i:s');
	        	}
	        	return "";
	        }
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
	      {
	    	  name : 'speed',
	    	  mapping:'clsd',
	    	  convert:function(val, record){
	    	  	val = ~~val;
		        if (val > 20) {
		            return val+'<span style="color:#008000;">&nbsp;&nbsp;km/h</span>';
		        } else if (val < 10) {
		            return '<span style="color:#FF0000;">' + val + '&nbsp;&nbsp;km/h</span>';
		        }
		        return val;
			}  
	      },
	      {name : 'clxs'},
	      {name : 'cscd'},
	      {name : 'xszt'},
	      {name : 'wfzt'},
	      {name : 'clpp'},
	      {name : 'clwx'},
	      {name : 'csys'},
	      {name : 'cllx'},
	      {name : 'hpzl'},
	      {
	    	  name : 'tx1',
	    	  mapping:'tx1',
	    	  convert:function(val, record){
		        if (val == '' || val == null || val == undefined) {
		        	return rootpath + '/themes/client/blue/images/null.jpg';
		        } else {
		        	return val;
		        }
			}  },
	      {name : 'txsl'},
	      {name : 'cscd'},
	      {name : 'ssdq'},
	      {name : 'brand'},
	      {name : 'type'},
	      {name : 'caryear'},
	      {name : 'rect'},
	      {name : 'clzl'}]
});

var defaultTpl = new Ext.XTemplate(
 '<ul>',
     '<tpl for=".">',
         '<li class="phone" style="float:left; list-style:none;">',
             '<img width="230" height="200" src="{tx1}" />',
             '<strong>车牌号码：{hphm}</strong>',
             '<strong>车辆速度：{speed}</strong>',
             '<strong>卡口名称：{kkmc}</strong>',
             '<strong>经过时间：{time}</strong>',
             '<strong><a href="#" onclick=\'openDetailWin()\'>详细信息</a>&nbsp;&nbsp;&nbsp;<a href="#" onclick=\'showCarPlace("{hphm}")\'>行车轨迹</a>&nbsp;&nbsp;&nbsp;<a href="#" onclick=\'inputControl("{hphm}")\'>加入布控</a></strong>',
         '</li>',
     '</tpl>',
 '</ul>'
);

var tpl = new Ext.XTemplate(
	 '<ul>',
	     '<tpl for=".">',
	     	 '<tpl if="this.compareIfInfos(hphm,ssdq) == true">',
	     	 '<li class="phone" style="float:left; list-style:none; margin-top:0px;">',
	             '<img width="230" height="200" src="{tx1}" />',
	             '<strong>车牌号码：{hphm}</strong>',
	             '<strong>车辆速度：{speed}</strong>',
	             '<strong>卡口名称：{kkmc}</strong>',
	             '<strong>经过时间：{time}</strong>',
	             '<strong><a href="#" onclick=\'openDetailWin()\'>详细信息</a>&nbsp;&nbsp;&nbsp;<a href="#" onclick=\'showCarPlace("{hphm}")\'>行车轨迹</a>&nbsp;&nbsp;&nbsp;<a href="#" onclick=\'inputControl("{hphm}")\'>加入布控</a></strong>',
	         '</li>',
	         '</tpl>',
	         '<tpl if="this.compareElseInfos(hphm,ssdq) == false">',
	     	 '<li class="phone">',
	             '<img width="230" height="200" src="{tx1}" />',
	             '<strong>车牌号码：{hphm}</strong>',
	             '<strong>车辆速度：{speed}</strong>',
	             '<strong>卡口名称：{kkmc}</strong>',
	             '<strong>经过时间：{time}</strong>',
	             '<strong><a href="#" onclick=\'openDetailWin()\'>详细信息</a>&nbsp;&nbsp;&nbsp;<a href="#" onclick=\'showCarPlace("{hphm}")\'>行车轨迹</a>&nbsp;&nbsp;&nbsp;<a href="#" onclick=\'inputControl("{hphm}")\'>加入布控</a></strong>',
	         '</li>',
	         '</tpl>',
	     '</tpl>',
	 '</ul>',{
	 compareIfInfos : function(data,ssdq) {
		 if (ssdq == 'equals') {
			 return true;
		 }
		 if (ssdq == 'notequals') {
			 return false;
		 }
		 return false;
	  },
	  compareElseInfos : function(data,ssdq) {
		   if (ssdq == 'equals') {
			   return true;
		   }
		   if (ssdq == 'notequals') {
			   return false;
		   }
		   return false;
	   }
   }
);

// DataView区域
Jinpeng.resultQuery.DataView = Ext.extend(Ext.DataView,{
	id: 'phones',
    itemSelector: 'li.phone',
    overClass   : 'phone-hover',
    singleSelect: true,
    loadingText:'努力加载中，请稍后...',
    multiSelect : true,
    autoScroll : true,
	initComponent : function() {
		var _this = this;
		Ext.apply(this,{
			store : dataViewStore,
			tpl : null,
			listeners : {
				dblclick : function(option, index, node, e) {
					var data = option.store.getAt(index);
					data.data.jgsj=data.get('time');
					var win = new Jinpeng.resultQuery.ResultCarDetailWindow();
					win.recode = data;
					// 将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
					win.loadId = data.get("xxbh");
					win.tx1 = data.get("tx1");
					win.show();
				},
				click :  function(option, index, node, e) {
					if (triggerFlag == true) {
						var data = option.store.getAt(index);
						data.data.jgsj=data.get('time');
						var win = new Jinpeng.resultQuery.ResultCarDetailWindow();
						win.recode = data;
						// 将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
						win.loadId = data.get("xxbh");
						win.tx1 = data.get("tx1");
						win.show();
						triggerFlag = false;
					}
				}
			}
		});
		Jinpeng.resultQuery.DataView.superclass.initComponent.apply(this);
	}
});

// panel区域
Jinpeng.resultQuery.DataPanel = Ext.extend(Ext.Panel,{
	frame:true,
    height : Ext.getBody().getHeight() - 115,
    collapsible:true,
    layout:'fit',
    pageSize : 15,
	initComponent : function() {
		Ext.apply(this,{
			items : [{
				xtype : 'resultDataView'
			}],	
			tbar : {
				cls : 'blue-button-ct',
				items : [ {
					xtype : 'button',
					id : 'exportRecordBtn2',
					tooltip : {
						text : '最多只能导出5000条数据!'
					},
					text : '&nbsp;&nbsp;&nbsp;导出&nbsp;&nbsp;&nbsp;',
					handler : this.importExcelData
				},{
					xtype : 'tbspacer',
					width : 10
				},{
					xtype : 'button',
					id : 'picDownloadBtn2',
					titletooltip : {
						text : " 勾选后下载选中的图片，否则按查询条件下载！"
					},
					text : '图片下载',
					handler : function(){
						var records = Ext.getCmp('phones').getSelectedNodes();
						if (records=='') {
							Ext.MessageBox.confirm("确认", "系统按查询条件下载如果多于15张图片，将启用后台下载！", function(v) {
								if ("yes" == v) {
									downloadPicture('search');
								}
							});
						}else{
							var ids = [];
						    var url = [];
						    var carNumB=[];
						    var jgsj=[];
						    var kkbh=[];
							for ( var i = 0; i < records.length; i++) {
								data = Ext.getCmp('phones').getRecord(records[i]);
								url[url.length] = data.get('tx1');
								carNumB[carNumB.length] = data.get('hphm');
								ids[ids.length] = data.get('xxbh');
								jgsj[jgsj.length]=data.get('time');
								kkbh[kkbh.length] = data.get('kkbh');
							}
							var idString = ids ? ids.join(',') : '';
							var httpUrlString = url ? url.join(',') : '';
							var carNumber=carNumB ? carNumB.join(','):'';
							var jgsjString=jgsj ? jgsj.join(','):'';
							var kkbhString=kkbh ? kkbh.join(','):'';
							if (httpUrlString.indexOf("null.jpg") != -1) {
								Ext.Msg.alert("系统提示","请选择有图片的数据进行下载！");
								return;
							}else{
								var params = {'idstr': idString,'url':httpUrlString,'carNum':carNumber,'jgsj':jgsjString,'kkbh':kkbhString};
								downloadPicture('select',params);
							}
						}
					}
				}/*
					 * ,{ xtype : 'tbspacer', width : 10 },{ xtype : 'button',
					 * id : 'listRecordBtn', text : '列表展示', handler :
					 * this.listDatas }
					 */,{
					xtype : 'tbspacer',
					width : 10
				},{
					xtype : 'button',
					id : 'exportMoreBtn2',
					tooltip : {
						text : '导出大量数据，请到导出管理中心查询导出进度！'
					},
					text : '后台导出',
					handler : this.importMoreExcelData
				}, {
					xtype : 'tbspacer',
					width : 100
				}, {
					xtype : 'button',
					id : 'defaultBtn',
					text : '默认分组',
					handler : this.groupByDefaut
				}, {
					xtype : 'tbspacer',
					width : 10
				}, {
					xtype : 'button',
					id : 'carNumBtn',
					text : '按车牌分组',
					handler : this.groupByCarNum
				}, {
					xtype : 'tbspacer',
					width : 10
				}, {
					xtype : 'button',
					id : 'carTypeBtn',
					text : '按车型分组',
					handler : this.groupByCarType
				}, {
					xtype : 'tbspacer',
					width : 10
				}, {
					xtype : 'button',
					id : 'mountsBtn',
					text : '按卡口分组',
					handler : this.groupByMounts
				}, {
					xtype : 'tbspacer',
					width : 10
				}, {
					xtype : 'button',
					id : 'brandsBtn',
					text : '按品牌分组',
					handler : this.groupByBrands
				}, {
					xtype : 'tbspacer',
					width : 150
				}, {
					xtype : 'form',
					cls : 'form-lable',
					items : [{
						xtype : 'displayfield',
						width : 450,
						fieldLabel : '多车牌或者多卡口条件下查询时间会比较慢，请耐心等待...',
						hidden : true,
						id : 'pigTimeDesc',
						name : 'pigTimeDesc'
					}]
				}]
			},
			bbar : new Jinpeng.widget.PagingHistoryToolbar( {
				id : 'PigPagingToolbarCar',
				store : dataViewStore,
				// displayInfo : true,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据",
				moveFirst_re : function () {
					pageInfo.pageFlag = 'pre';
					pageInfo.gisShow = "";
					pageInfo.listShow = "";
					pageInfo.bbar = Ext.getCmp('PigPagingToolbarCar');
					this.moveFirst();
				},
				movePrevious_re : function () {
					pageInfo.pageFlag = 'pre';
					pageInfo.gisShow = "";
					pageInfo.listShow = "";
					pageInfo.bbar = Ext.getCmp('PigPagingToolbarCar');
					this.movePrevious();
				},
				moveNext_re : function () {
					pageInfo.pageFlag = 'next';
					pageInfo.gisShow = "";
					pageInfo.listShow = "";
					pageInfo.bbar = Ext.getCmp('PigPagingToolbarCar');
					this.moveNext();
				},
				moveLast_re : function () {
					pageInfo.pageFlag = 'next';
					pageInfo.gisShow = "";
					pageInfo.listShow = "";
					pageInfo.bbar = Ext.getCmp('PigPagingToolbarCar');
					this.moveLast();
				},
				goPage_re : function() {
					var bbre = Ext.getCmp('PigPagingToolbarCar');
					var goPageNumber = bbre.get(4).getValue();
					if (goPageNumber > bbre.getPageData().activePage) {
						pageInfo.pageFlag = 'next';
						pageInfo.gisShow = "";
						pageInfo.listShow = "";
						pageInfo.bbar = Ext.getCmp('PigPagingToolbarCar');
						this.goPage();
					} else if (goPageNumber < bbre.getPageData().activePage) {
						pageInfo.pageFlag = 'pre';
						pageInfo.gisShow = "";
						pageInfo.listShow = "";
						pageInfo.bbar = Ext.getCmp('PigPagingToolbarCar');
						this.goPage();
					}
				}
			})
		});
		Jinpeng.resultQuery.DataPanel.superclass.initComponent.apply(this);
	},
	// 导出Excel格式数据方法
	importExcelData : function() {
		var records_length=Ext.getCmp('phones').store.data.length;
		var records = Ext.getCmp('phones').getSelectedNodes();
		var config = {
			selectExportURL : rootpath + "/car/exportHistoryData.mvc",
			queryExportURL : rootpath + "/car/exportHistoryData.mvc"
		};
		// 得到选中的ids
		var ids = [];
		var carNums = [];
		var data;
		for ( var i = 0; i < records.length; i++) {
			data = Ext.getCmp('phones').getRecord(records[i]);
			ids[ids.length] = data.get('xxbh');
		}
		config.ids = ids;
		config.carNums = carNums;
		if (records_length > 0){
			if(ids.length>0) {
				config.count = ids.length; 
			} else {
				config.count =records_length;
				config.start = 0;
				config.limit = 5000;// 默认最大导出1000条
			}
		}else{
			config.count = 0;
		}
		var param = getQueryParams();
		config.queryCondition = param.join("&");
		var ExportHelper = new Jinpeng.HistoryExportHelper(config);
		ExportHelper.startExport(true);
	},
	importMoreExcelData : function() {
		var records = Ext.getCmp('phones').store;
		if (records.data.items.length == 0) {
			var win = new Jinpeng.widget.MessageWindow();
			win.msg = '页面无数据，请确保存在数据后再导出！';
			win.show();
			return;
		}
		var config = {
			queryExportURL : rootpath + "/car/exportHistoryData.mvc"
		};
		var param = getQueryParams();
		config.queryCondition = param.join("&");
		var ExportHelper = new Jinpeng.HistoryMoreExportHelper(config);
		ExportHelper.startExport(true);
	},
	listDatas : function () {
		// Ext.getCmp('listDataInfo').setVisible(true);
		// Ext.getCmp('pigDataInfo').setVisible(false);
		showFlag = 'grid';
		praParams.groupFlag = '';
		var panel = Ext.getCmp('resultPanel');
		panel.resultQueryMethod();
		showFlag = 'done';
	},
	groupByCarNum : function() {
		var grid = Ext.getCmp('phones');
		grid.tpl = tpl;
		showFlag = 'pig';
		var panel = Ext.getCmp('resultPanel');
		praParams.groupFlag = 'carNum';
		panel.resultQueryMethod();
		showFlag = 'done';
	},
	groupByCarType : function() {
		var grid = Ext.getCmp('phones');
		grid.tpl = tpl;
		showFlag = 'pig';
		var panel = Ext.getCmp('resultPanel');
		praParams.groupFlag = 'carType';
		panel.resultQueryMethod();
		showFlag = 'done';
	},
	groupByMounts : function() {
		var grid = Ext.getCmp('phones');
		grid.tpl = tpl;
		showFlag = 'pig';
		var panel = Ext.getCmp('resultPanel');
		praParams.groupFlag = 'mounts';
		panel.resultQueryMethod();
		showFlag = 'done';
	},
	groupByBrands: function() {
		var grid = Ext.getCmp('phones');
		grid.tpl = tpl;
		showFlag = 'pig';
		var panel = Ext.getCmp('resultPanel');
		praParams.groupFlag = 'brands';
		panel.resultQueryMethod();
		showFlag = 'done';
	},
	groupByDefaut : function() {
		var grid = Ext.getCmp('phones');
		grid.tpl = defaultTpl;
		showFlag = 'pig';
		var panel = Ext.getCmp('resultPanel');
		praParams.groupFlag = 'jgsj';
		panel.resultQueryMethod();
		showFlag = 'done';
	}
});

// GisPanel区域
Jinpeng.resultQuery.GisDataPanel = Ext.extend(Ext.Panel,{
	frame:true,
    collapsible:true,
    layout:'fit',
	initComponent : function() {
		var hh = Ext.getBody().getHeight() - 165;
		Ext.apply(this,{
			layout : 'border',
			border : false,
			defaults : {
				margins : '0 0 0 0'
			},
			items : [ {
				region : 'center',
				layout : 'column',
				items : [{
					columnWidth : 0.349,
					xtype : 'gisGridPanel'
				}, {
					columnWidth : 0.65,
					id : 'gisShow',
					xtype : 'panel',
					items : [{
						html : "<iframe id='carDisIframe' src='http://" + ipAdress + "/PGISViewer/PGISViewer.html' width='100%' height='" + hh + "' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
					}]
				}]
			}]
		});
		Jinpeng.resultQuery.GisDataPanel.superclass.initComponent.apply(this);
	}
});

//下载图片方法
function downloadPicture(flag,param){
	var params="";
	if (flag == 'search') {
		//获取父页面的参数
		params=praParams;
		params.flag="query";
	} else {
		params =param;
	}
	Ext.Ajax.request({
		// 将id组合成字符串传递到后台
		url : rootpath + '/car/loadCarQueryAnalyzeImgUrlByIds.mvc',
		method : 'POST',
		params : params,
		success : function(resp, opts) {
			var txt = Ext.util.JSON.decode(resp.responseText);
			if(txt != "faild" && txt != "success"){
				window.open (txt,'_black');
			}else if(txt == "success") {
				Ext.Msg.alert("系统提示","图片过多，已启用后台下载功能，请到导出管理中查看下载进度！");
			}else{
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = "图片路径无法访问，下载失败！请重试！";
				win.show();
			}
	},
	failure : function(resp, opts) {
		var win = new Jinpeng.widget.MessageWindow();
		win.msg = "下载失败！请重试！";
		win.show();
	}
	});
}
//判定人车是否一致的方法
function getOperatorFlag(param){
	Ext.getCmp('operatorFlag').setVisible(true);
	var params=param;
	Ext.Ajax.request({
		// 将id组合成字符串传递到后台
		url : rootpath + '/car/query/getCarOperatorFlag.mvc',
		method : 'POST',
		params : params,
		success : function(resp, opts) {
		var resultData = resp.responseJSON.data;
		var operatorFlagContent="<a href='#' onclick=\"showOperatorPic('"+resultData.srcPicUrl+"','"+resultData.carUrl+"')\">" + resultData.operatorFlag + "</a>";
		Ext.getCmp('operatorFlag').setValue(operatorFlagContent);
	},
	failure : function(resp, opts) {
		Ext.getCmp('operatorFlag').setValue("加载失败");
	}
	});
}

Jinpeng.resultQuery.ControlInputWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
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
		Jinpeng.resultQuery.ControlInputWindow.superclass.initComponent.apply(this);
	}
});

var cotrolWin = new Jinpeng.resultQuery.ControlInputWindow();

Ext.reg('northFormPanel', Jinpeng.resultQuery.NorthFormPanel);
Ext.reg('gridCenterDataPanel', Jinpeng.resultQuery.gridCenterDataPanel);
Ext.reg('resultDataView', Jinpeng.resultQuery.DataView);
Ext.reg('dataPanel', Jinpeng.resultQuery.DataPanel);
Ext.reg('resultTabPanel', Jinpeng.resultQuery.ResultTabPanel);
Ext.reg('gisDataPanel', Jinpeng.resultQuery.GisDataPanel);
Ext.reg('gisGridPanel', Jinpeng.resultQuery.SmallGridDataPanel);