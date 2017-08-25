//车辆特征查询JS
Ext.ns("Jinpeng.carFeatureAnalyzeQuery");

var dataCount = 0;
var viewPortObj = null;
var downPictureWindow = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport( {
		layout : 'border',
		items : [ {
			//查询表单
			region : 'north',
			border : false,
			height : 75,
			xtype : 'northFormPanel'
		}, {
			//列表数据
			region : 'center',
			border : false,
			xtype : 'gridCenterDataPanel'
		} ]
	});
});

var endTime = Date.parseDate(Ext.util.Format.date(new Date(), 'Y-m-d') + " "
		+ "23:59:59", 'Y-m-d H:i:s');

//查询表单
Jinpeng.carFeatureAnalyzeQuery.NorthFormPanel = Ext.extend(Ext.Panel,{
		initComponent : function() {
	
			//车牌颜色  
			var carNumColorStore = new Ext.data.JsonStore({
						url : rootpath
								+ "/dictionary/jsonDictsInCombo.mvc?code=CarColor",
						root : "data",
						fields : [ 'id', 'text' ],
						autoLoad : false
					});
	        //车辆品牌
			var carBrandStore = new Ext.data.JsonStore({
						url : rootpath
								+ "/dictionary/jsonDictsInCombo.mvc?code=CarBrand",
						root : "data",
						fields : [ 'id', 'text' ],
						autoLoad : false
					});
	        
	        //车辆类型
			var carTypeStore = new Ext.data.JsonStore({
						url : rootpath
								+ "/dictionary/jsonDictsInCombo.mvc?code=CarType",
						root : "data",
						fields : [ 'id', 'text' ],
						autoLoad : false
					});
			
			Ext.apply(this,{
				items : [ {
					// form表单
					xtype : 'form',
					id : 'carFeatureForm',
					//labelAlign : 'right',
					border : false,
					frame : true,
					cls : 'blue-button-ct',
				//	allowBlank : false,
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
						        items : [ {
									xtype : 'tcombo',
									id : 'csysNum',
									name : 'csys',
									fieldLabel : '车身颜色',
									store : carNumColorStore,
									mode : 'local',
									emptyText : '请选择车身颜色',
									triggerAction : 'all',
									valueField : 'id',
									displayField : 'text',
									anchor : '94%'
								} ]
							},{
								items : [ {
									xtype : 'tcombo',
									id : 'clppNum',
									name : 'clpp',
									fieldLabel : '车辆品牌',
									store : carBrandStore,
									mode : 'local',
									emptyText : '请选择车辆品牌',
									triggerAction : 'all',
									valueField : 'id',
									displayField : 'text',
									anchor : '94%'
								} ]
							},{
								items : [ {
									xtype : 'tcombo',
									id : 'cllxNum',
									name : 'cllx',
									fieldLabel : '车辆种类',
									store : carTypeStore,
									mode : 'local',
									emptyText : '请选择车辆种类',
									triggerAction : 'all',
									valueField : 'id',
									displayField : 'text',
									anchor : '94%'
								} ]
							},/*{
								xtype : 'spacer'
							},*/{
								// 第二行
								items : [ {
//									xtype : 'datetimefield',
//									name : 'startTime',
//									id : 'startdate',
//									fieldLabel : '经过时间',
//									editable : false,
//									// 默认时间为当天的0点
//									value : (new Date()).clearTime().add(Date.MONTH, -1),
//									vtype: 'beginEndDate',
//									endDateField : 'enddate',
//									anchor : '94%'
									
									xtype : 'textfield',
									name : 'startTime',
									allowBlank : false,
				                    editable : false,
									id : 'startdate',
								    fieldLabel : '开始时间',
									value : new Date().format('Y-m-d') + ' 00:00:00',
									anchor : '94%',
									style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
									listeners  : {   
						            	'focus':function(field){  
										    var endDate = Ext.getCmp("enddate").getValue();
											var endTime = Ext.util.Format.date(
													new Date(), 'Y-m-d H:i:s');
											
											//  日期时间的默认参数      
										    var defaultDateTimeParams = new function()   
										    {   
										        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
										        this.startDate  = endTime;    //  开始时间 
										        this.maxDate = endDate;    //最大时间是当前时间（即是开始时间不能超过结束时间）
										        this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';  //  格式化时间   
										        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
										        this.alwaysUseStartDate = false;           //  默认使用初始时间   
										    };  
						                    WdatePicker(defaultDateTimeParams);   
						                    field.blur();
						             	}   
									}   
								} ]
							},{
								items : [ {
									xtype : 'textfield',
									fieldLabel : '结束时间',
									name : 'endTime',
     								id : 'enddate',
     								allowBlank : false,
				                    editable : false,
									value : new Date().format('Y-m-d') + ' 23:59:59',
									anchor : '94%',
									style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
									listeners  : {   
						            	'focus':function(field){  
											var endTime = Ext.util.Format.date(
													new Date(), 'Y-m-d H:i:s');
											var startdate = Ext.getCmp("startdate").getValue();											
											//  日期时间的默认参数      
										    var defaultDateTimeParams = new function()   
										    {   
										        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
										        this.startDate  = endTime;    //  开始时间   
										        this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';  //  格式化时间   
										        this.minDate =   startdate; //结束时间不能小于开始时间
										        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
										        this.alwaysUseStartDate = false;           //  默认使用初始时间   
										    };  
						                    WdatePicker(defaultDateTimeParams);   
						                    field.blur();
						             	}   
									}   
//									xtype : 'datetimefield',
//									name : 'endTime',
//									id : 'enddate',
//									fieldLabel : '结束时间',
//									editable : false,
//									value : endTime,
//									vtype: 'beginEndDate',
//									startDateField : 'startdate',
//									anchor : '94%'
								} ]
							},{ 
//								items:[{
								    bodyStyle : 'margin-left:400px;',
									xtype : 'compositefield',
									items : [{
										xtype : 'button',
										flex : 31,
										id : "searchBut",
										text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
										handler : this.carFeatureAnalyzeQueryMethod
									},/* {
										flex : 38,
										xtype : 'button',
										text : '加载更多↓',
										id : "moreBut",
										handler : this.searchMoreMethod
									},*/ {
										flex : 31,
										xtype : 'button',
										id : "resetBut",
										text : '&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;',
										handler : this.resetMethod
									}]
//								}]
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
						//车身颜色
						carNumColorStore.load();
						//车辆品牌
						carBrandStore.load();
						//车辆种类
						carTypeStore.load();
					}
				}
			});
			Jinpeng.carFeatureAnalyzeQuery.NorthFormPanel.superclass.initComponent.apply(this);
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
							var win = new Jinpeng.widget.MessageWindow();
							win.msg = '超过十个车牌，建议选择十个车牌以内！';
							win.show();
						}
						Ext.getCmp('carNum').setValue(carNum);
					}
				}
			});
			chooser.show();
		},
		//查询
		carFeatureAnalyzeQueryMethod : function() {
			//获取表单
			var form = Ext.getCmp('carFeatureForm');
			//判断表当是否为空
			if (form.getForm().isValid()) {
				var grid = Ext.getCmp('historyGridPanel');
				grid.store.baseParams = {};// 重置
				dataCount = 20 //一次性加载页面数据量
				//将参数传入后台
				grid.store.baseParams = {};// 重置
				/** 将参数传入后台 */
				var baseparams = {
					"csys" : (Ext.getCmp('csysNum').getValue() ==''? '': Ext.getCmp('csysNum').getValue()),
					"clpp" : (Ext.getCmp('clppNum').getValue()=='' ? '':Ext.getCmp('clppNum').getValue()),
					"cllx" : (Ext.getCmp('cllxNum').getValue() == '' ? '': Ext.getCmp('cllxNum').getValue()),
					"startTime" : Ext.getCmp('startdate').getValue(),
					"endTime" : Ext.getCmp('enddate').getValue(), 
					"flag":'query'
				};
                grid.store.baseParams = baseparams;

				/*刷新选中*/
				this.publish("clearGridSelections",[]);
				grid.store.load({
					params : {
						'page.start' : 0,
						'page.limit' : Jinpeng.PageSize
					},
					callback : function(o,response,success) {
						//如果页面的信息没有20条，那么将加载更多按钮禁用
						/*
						if(o.length<20){
							Ext.getCmp("moreBut").disable();//按钮隐藏
						}else{
							Ext.getCmp("moreBut").enable();//按钮显示
						}*/
				    } 
				});
			}
		},
//		searchMoreMethod : function() {
//			dataCount = dataCount + 20;
//		
//			var form = Ext.getCmp('carFeatureForm');
//			
//			if (form.getForm().isValid()) {
//				var grid = Ext.getCmp('historyGridPanel');
//				//var pageSize = grid.pageSize;
////				if(!grid.getStore().endKey){
////	            	return;
////	            }
//                grid.store.baseParams = {};// 重置
//				/** 将参数传入后台 */
//				var baseparams = {
//					"csys" : (Ext.getCmp('csysNum').getValue() ==''? '': Ext.getCmp('csysNum').getValue()),
//					"clpp" : (Ext.getCmp('clppNum').getValue()=='' ? '':Ext.getCmp('clppNum').getValue()),
//					"cllx" : (Ext.getCmp('cllxNum').getValue() == '' ? '': Ext.getCmp('cllxNum').getValue()),
//					"startTime" :Ext.getCmp('startdate').getValue(),  
//					"endTime" : Ext.getCmp('enddate').getValue(),
//					"flag":'query'
//				};
//                grid.store.baseParams = baseparams;	
//                /*刷新选中*/
//				this.publish("clearGridSelections",[]);
//				grid.store.load({
//					params : {
//						'page.start' : 0,
//						'page.limit' : Jinpeng.PageSize
//					}
//				});
//			}
//		},
		//重置方法
		resetMethod :  function() {
			Ext.getCmp('carFeatureForm').getForm().reset();
		}
	});

//所需数据
var carFeatureAnalyzeQueryStore = new Ext.data.JsonStore({
	url : rootpath + "/car/analyze/carfeature/dataResult.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	remoteSort : true,
	fields : [
		  {name : 'xxbh'},
		  {name : 'hphm'},
		  {name : 'hpys'},
		  {name : 'hpzl'}, 
		  {name : 'hpzlmc'}, 
		  {name : 'clsd'},
		  {name : 'kkmc'}, 
		  {name : 'dwmc'},
		  {name : 'clpp'},
		  {name : 'jgsj'},
	      {name : 'kkbh'},
	      {name : 'sbbh'},
	      {name : 'sbmc'},
	      {name : 'fxbh'},
	      {name : 'cdbh'},
	      {name : 'cwhphm'},
	      {name : 'cwhpys'},
	       {name : 'clpp'},
	       {name : 'wfzt'},
	      {name : 'hpyz'},
	      {name : 'clsd'},
	      {name : 'clxs'},
	      {name : 'cscd'},
	      {name : 'xszt'},
	      {name : 'wlpp'},
	      {name : 'cfzt'},
	      {name : 'clwx'},
	      {name : 'csys'},
	      {name : 'cllx'},
	      {name : 'hpzl'},
	      {name : 'tx1'},
	      {name : 'txsl'},
	      {name : 'tx1'},
	      {name : 'ssdq'}]
});

//中心右区域数据
Jinpeng.carFeatureAnalyzeQuery.gridCenterDataPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'historyGridPanel',
	border : false,
	frame : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this,{
			store : carFeatureAnalyzeQueryStore,
			cm : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false,
				},
				columns : [
						new Ext.ux.grid.PagingRowNumberer({width : 40}),
						sm,
						{
							header : '车牌号码',
							dataIndex : 'hphm'
						},{
							header : '号牌颜色',
							dataIndex : 'hpys',
							renderer : function(key) {
									return window.dictionary.getValue("LicPlateColor", key);
								}
						},{
							header : '号牌种类',
							dataIndex : 'hpzl',
							renderer : function(key) {
								return window.dictionary.getValue("LicPlate", key);
							}
						},{
							header : '车辆速度',
							dataIndex : 'clsd',
							renderer: function(val) {
						    	val = ~~val;
						        if (val > 20) {
						            return '<span style="color:green;">' + val + '&nbsp;&nbsp;km/h</span>';
						        } else if (val < 10) {
						            return '<span style="color:red;">' + val + '&nbsp;&nbsp;km/h</span>';
						        }
						        return val;
						    }
						},{
							header : '卡口名称',
							dataIndex : 'kkmc',
							renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
								 //当文字过多的时候，鼠标移上去就给悬浮狂提示
						     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
						    }
						},{
							header : '单位名称',
							dataIndex : 'dwmc',
							width : 230,
							renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
								 //当文字过多的时候，鼠标移上去就给悬浮狂提示
						     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
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
			selModel : sm,
			tbar : {
				cls : 'blue-button-ct',
				items : [ {
//					xtype : 'button',
//					id : 'exportRecordBtn',
//					tooltip : {
//						text : '最多只能导出1000条数据!'
//					},
//					text : '&nbsp;&nbsp;&nbsp;导出&nbsp;&nbsp;&nbsp;',
//					handler : this.importExcelData
//				},{
//						xtype : 'tbspacer',
//						width : 30
//					},{
						xtype : 'button',
						id : 'picDownloadBtn',
						titletooltip : {
							text : " 勾选后下载选中的图片，否则按查询条件下载！"
						},
						text : '图片下载',
						handler : function(){
							var httpUrl = Ext.getCmp("tx1");
							var bjxxbh = Ext.getCmp("xxbh");
							if (Ext.getCmp('historyGridPanel').getSelectionModel().getSelections()=='') {
								var win = new Jinpeng.widget.MessageWindow();
								win.msg = '请勾选需要下载图片的记录！';
								win.show();
							}else{
								linkDownloadPicture(bjxxbh,httpUrl);
							}
							
						}
					}]
			},
			bbar : new Jinpeng.widget.PagingToolbarForAll( {
				id : 'PagingToolbar',
				store : carFeatureAnalyzeQueryStore,
				//displayInfo : true,
				pageSize :this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			}),
			listeners : {
				/*双击查看*/
				rowdblclick : function(grid, rowIndex, e ) {
					var data = grid.store.getAt(rowIndex);
					var win = new Jinpeng.carFeatureAnalyzeQuery.HistoryCarDetailWindow();
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
		this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
			var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
			var orgId ='';
			var orgType = '';
			var kkbhs = '';
			var startTime = Ext.getCmp('startdate').getValue();
			var endTime = Ext.getCmp('enddate').getValue();
			var recode = grid.store.getAt(rowIndex);
			var mainParam = {
				'orgId' : orgId,
				'orgType' : orgType,
				'kkbhs' : kkbhs,
				'startTime' : startTime,
				'endTime' : endTime,
				'carNum' : recode.data.hphm,
				'counts' : recode.data.passTimes
			};
			if (fieldName=='hphm') {
				var win = new Jinpeng.carFrequency.CarFrequencyWindow({
					cls : 'system_mod',
					modal : true
				});
				win.init(mainParam);
				win.show();
			}
		});
		Jinpeng.carFeatureAnalyzeQuery.gridCenterDataPanel.superclass.initComponent.apply(this);
	},
	//超链接的方法 
	checkHref : function(grid, rowIndex, colIndex, item, event) {
		var recode = grid.store.getAt(rowIndex);
		if (recode) {
			//创建window窗体
			var win = new Jinpeng.carFeatureAnalyzeQuery.HistoryCarDetailWindow();
			win.recode = recode;
			win.loadId = recode.get("xxbh");// 唯一序列号
			win.show();
		}
	},
	
	//导出Excel格式数据方法 
//	importExcelData : function() {
//		var records = Ext.getCmp('historyGridPanel').getSelectionModel().getSelections();
//		var config = {
//			selectExportURL : rootpath + "/car/exportHistoryData.mvc",
//			queryExportURL : rootpath + "/car/exportHistoryData.mvc"
//		};
//		// 得到选中的ids
//		var ids = [];
//		for ( var i = 0; i < records.length; i++) {
//			ids[ids.length] = records[i].get('xxbh');
//		}
//		config.ids = ids;
//		if (ids.length > 0) {
//			config.start = records[0].get('txsl') == undefined ? 0 : records[0].get('txsl');
//			config.limit = this.ownerCt.ownerCt.pageSize;
//		} else {
//			config.start = 0;
//			config.limit = 1000;//默认最大导出1000条
//		}
//		config.count = 1000; //默认最大导出1000条
//		var param = getQueryParams();
//		config.queryCondition = param.join("&");
//		var ExportHelper = new Jinpeng.HistoryExportHelper(config);
//		ExportHelper.startExport(true);
//	}
});

//下载图片方法
function linkDownloadPicture(id,httpUrl,carNumbers){
	// 得到选中的ids
	var ids = [];
    var url = [];
    var carNumber = [];
    var hurl= httpUrl;
    if(hurl!=undefined){		
      url[url.length] =httpUrl;	
      carNumber[carNumber.length]=carNumbers;
    }else if(hurl==undefined){
    	var records = Ext.getCmp('historyGridPanel').getSelectionModel().getSelections();
		if(records != ""){
			for ( var i = 0; i < records.length; i++) {
				url[url.length] = records[i].get('tx1');
				carNumber[carNumber.length]=records[i].get('hphm');
			}
		}
    }
	if(id) {
		ids[ids.length] = id;
	} else {
		var records = Ext.getCmp('historyGridPanel').getSelectionModel().getSelections();
		if (records != "") {
			for ( var i = 0; i < records.length; i++) {
				ids[ids.length] = records[i].get('xxbh');
			}
		}
	}
	var idString = ids ? ids.join(',') : '';
	var httpUrlString = url ? url.join(',') : '';
	var carNum = carNumber ? carNumber.join(','):'';
	if(idString!='' &&　httpUrlString != ''){
		Ext.Ajax.request({
				// 将id组合成字符串传递到后台
				url : rootpath+'/car/loadCarQueryAnalyzeImgUrlByIds.mvc',
				method : 'POST',
				params : {'idstr': idString,'url':httpUrlString,'carNum':carNum},
				success : function(resp, opts) {
					var txt = Ext.util.JSON.decode(resp.responseText);
					//var data = txt.data;
					if(txt){
						window.open (txt,'_black');
						//downPictureWindow.close();
					}
				},
				failure : function(resp, opts) {
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = "下载失败！请重试！";
					win.show();
				}
			});
	}
	/*config.ids = ids;
	config.httpUrl=url;
	var param = getQueryParams();
	config.param = param.join("&");
	弹出框:调用图片下载	downPictureWindow = new Jinpeng.common.progressWindow();
	downPictureWindow.config = config;
	downPictureWindow.show();*/
	
}
/**
 * 详细信息store
 */
var detailHistoryStore = new Ext.data.JsonStore({
	url : rootpath + "/car/analyze/carfeature/dataResult.mvc",
	root :  'data',
    idProperty : 'id',
    totalProperty : 'total',
    timeout: 30000,
    autoLoad : false,
	fields : [
      {name : 'xxbh'},
      {name : 'kkbh'},
      {name : 'kkmc'},
      {name : 'sbbh'},
      {name : 'sbmc'},
      {name : 'fxbh'},
      {name : 'cdbh'},
      {name : 'cwhphm'},
      {name : 'cwhpys'},
      {name : 'clpp'},
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

//弹出窗口车辆特征查询的详细信息
Jinpeng.carFeatureAnalyzeQuery.HistoryCarDetailWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
	width : 940,
	height : 420,
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
				layout : 'column',
				cls : 'blue-button-ct',
				items : [{
					columnWidth : .45,
				    bodyStyle : 'padding-left : 2px;',
				    layout : 'form',
					items : [{
						//图形组件
						xtype : 'pictureShowBox',
						//id : 'pictureshowbox',
						width : 420,
						height : 325
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
									name : 'hphm',
									id:'hphm',
									anchor : '96%'
								} ]
							},{
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车道编号',
									name : 'cdbh',
									anchor : '96%'
								} ]
							},{
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '卡口名称',
									name : 'kkmc',
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
									fieldLabel : '行驶状态',
									name : 'xszt',
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
							},{
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '违法状态',
									name : 'wfzt',
									anchor : '96%'
								} ]
							}]
						},
						{xtype : 'fieldset',
							title : '车辆信息',
							layout : "table",
							bodyStyle : 'padding-top : 2px;',
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
									fieldLabel : '号牌种类',
									name : 'hpzl',
									anchor : '96%'
								} ]
							},{
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
//						,{
//							xtype : 'fieldset',
//							title : '车主信息',
//							layout : "table",
//							bodyStyle : 'padding-top : 2px;',
//							defaults : {
//								width : 250,
//								layout : 'form'
//							},
//							layoutConfig : {
//								columns : 2
//							},
//							items : [{
//								items : [ {
//									xtype : 'displayfield',
//									fieldLabel : '车主姓名',
//									name : 'JDCSYR',
//									anchor : '96%'
//								} ]
//							}, {
//								items : [ {
//									xtype : 'displayfield',
//									fieldLabel : '联系方式',
//									name : 'LXFS',
//									anchor : '96%'
//								} ]
//							}, {
//								items : [ {
//									xtype : 'displayfield',
//									fieldLabel : '身份证号',
//									name : 'SFZH',
//									anchor : '96%'
//								} ]
//							}, {
//								items : [ {
//									xtype : 'displayfield',
//									fieldLabel : '详细地址',
//									name : 'DJZZXZ',
//									anchor : '96%'
//								} ]
//							}]
//						}]
				} ]
			} ],
			bbar : {
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
						//获取选中的的行数-1
						var date = carFeatureAnalyzeQueryStore.getAt(idNum);
						// 如果不为空，则进行数据加载
						if (date!= null) {
							this.loadRecordById(date,idNum);
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
						//获取选中的的行数+1
						var date = carFeatureAnalyzeQueryStore.getAt(idNum);
						
						// 如果不为空，则进行数据加载
						if (date != null) {
							this.loadRecordById(date,idNum);
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
						var carNum = Ext.getCmp('hphm').getValue();
						//根据Id下载图片						
						linkDownloadPicture(id,httpUrl,carNum)
					}
				},{
          	  		xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;',
					scope : this,
					handler : this.close
				} ]
			}
		});
		Jinpeng.carFeatureAnalyzeQuery.HistoryCarDetailWindow .superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Jinpeng.carFeatureAnalyzeQuery.HistoryCarDetailWindow .superclass.afterRender.call(this);
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
	loadRecordById : function(data,carnum) {
		var record = {};
		var carNumber ;
		if(carnum != undefined && carnum >0 ){
			carNumber = carFeatureAnalyzeQueryStore.getAt(carnum-1).get('hphm');
		}
		if(carnum ==0){
			carNumber = carFeatureAnalyzeQueryStore.getAt(carnum).get('hphm');
		}
		// 加载数据		
		record.hphm = data.get("hphm");
		record.tx1 = data.get("tx1");
		record.xxbh = data.get("xxbh");
		record.kkmc = data.get("kkmc");
		record.sbmc = data.get("sbmc");
		record.fxbh = data.get("fxbh");
		record.cdbh = data.get("cdbh");
		record.cwhphm = data.get("cwhphm");
		record.sbmc =data.get("sbmc");
		record.clpp =data.get("clpp");
		record.cwhpys = window.dictionary.getValue("LicPlateColor",data.get("cwhpys"));
		record.hpyz = window.dictionary.getValue("LicenseVerfiy",data.get("hpyz"));//号牌一致，
		record.sbmc =data.get("sbmc");
		record.clsd = Ext.util.Format.substr(data.get("clsd"),0,3);
		record.clxs = Ext.util.Format.substr(data.get("clxs"),0,3);	
			
		record.cscd = window.dictionary.getValue("CarLength",data.get("cscd")) ;
		record.xszt = window.dictionary.getValue("DriverType", data.get("xszt"));//行驶状态，
		record.wfzt = window.dictionary.getValue("IllegalType", data.get("wfzt"));//违法状态，待转字典
		record.clpp = window.dictionary.getValue("CarBrand", data.get("clpp")); //车辆厂牌编码（自行编码）。
		//record.clwx = window.dictionary.getValue("VehicleAppearance",data.get("clwx"));//车辆外形编码（自行编码）。
		record.csys = window.dictionary.getValue("CarColor", data.get("csys"));
		record.cllx = window.dictionary.getValue("CarType", data.get("cllx"));
		record.hpzl = window.dictionary.getValue("LicPlateType", data.get("hpzl"));
		//反向将数据加载到form表单中
		Ext.getCmp('detailWindowForm').getForm().setValues(record);
		record.CARIMGURL = data.get("tx1");
		this.publish('loadPictures', record);
//		if(carNumber != data.get("hphm")){
//			Ext.Ajax.request({
//				method : "POST",
//				params : {
//					"carNum" : data.get("hphm")
//				},
//				url : rootpath + "/car/analyze/carfeature/dataResult",
//				success : function(response, options) {
//					var txt = response.responseJSON.data;
//					if (txt.length == 0) {
//						Ext.getCmp('detailWindowForm').getForm().findField('JDCSYR').setValue('加载失败');
//						Ext.getCmp('detailWindowForm').getForm().findField('SFZH').setValue('加载失败');
//						Ext.getCmp('detailWindowForm').getForm().findField('LXFS').setValue('加载失败');
//						Ext.getCmp('detailWindowForm').getForm().findField('DJZZXZ').setValue('加载失败');
//					} else {
//						Ext.getCmp('detailWindowForm').getForm().findField('JDCSYR').setValue(txt[0].JDCSYR);
//						Ext.getCmp('detailWindowForm').getForm().findField('LXFS').setValue(txt[0].LXFS);
//						Ext.getCmp('detailWindowForm').getForm().findField('SFZH').setValue(txt[0].SFZH);
//						Ext.getCmp('detailWindowForm').getForm().findField('DJZZXZ').setValue(txt[0].DJZZXZ);
//					}
//				},
//				failure : function(response, options) {
//					Ext.getCmp('detailWindowForm').getForm().findField('JDCSYR').setValue('加载失败');
//					Ext.getCmp('detailWindowForm').getForm().findField('SFZH').setValue('加载失败');
//					Ext.getCmp('detailWindowForm').getForm().findField('LXFS').setValue('加载失败');
//					Ext.getCmp('detailWindowForm').getForm().findField('DJZZXZ').setValue('加载失败');
//				},
//				scope : this
//		});
//	 }
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
		var k = 0;
		if(id.indexOf('|')>0 && id.indexOf('|')!= 0){
				//获取当前行数的Id
				this.loadId = id.substring((id.indexOf('|')+1));
		}
		
		//拿该数据在当前store中的id数组所在的序号
		for ( var i = 0; i < carFeatureAnalyzeQueryStore.getCount(); i++) {
			if (this.loadId == carFeatureAnalyzeQueryStore.getAt(i).get('xxbh')) {
				k = i;
				break;
			}
		}
		if (upOrDown == false && k > 0) {
			nextId = (k-1)+'|'+carFeatureAnalyzeQueryStore.getAt(k - 1).get('xxbh');
		}
		if (upOrDown == true
				&& k < carFeatureAnalyzeQueryStore.getCount() - 1) {
			nextId = (k+1)+'|'+carFeatureAnalyzeQueryStore.getAt(k + 1).get('xxbh');
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
		var count = carFeatureAnalyzeQueryStore.getCount();
		var index = 0;
		for ( var i = 0; i < count; i++) {
			if (id == carFeatureAnalyzeQueryStore.getAt(i).get('xxbh')) {
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

//获取当前查询条件参数，并封装为数组
function getQueryParams() {
	//将查询参数传递到后台，并在后台获取要导出的数据 
	var param = [];
	param[param.length] = "carNum=" + Ext.getCmp('carNum').getValue();;
	param[param.length] = "mounts=" + Ext.getCmp('kkbhs').getValue();
	param[param.length] = "startTime=" + Ext.getCmp('startTime').getValue(),//Ext.util.Format.date(Ext.getCmp('startTime').getValue(),'Y-m-d H:i:s');
	param[param.length] = "endTime=" +Ext.getCmp('endTime').getValue(), // Ext.util.Format.date(Ext.getCmp('endTime').getValue(),'Y-m-d H:i:s');
	param[param.length] = 'flag=query';
	return param;
}

Ext.reg('northFormPanel', Jinpeng.carFeatureAnalyzeQuery.NorthFormPanel);
Ext.reg('gridCenterDataPanel', Jinpeng.carFeatureAnalyzeQuery.gridCenterDataPanel);