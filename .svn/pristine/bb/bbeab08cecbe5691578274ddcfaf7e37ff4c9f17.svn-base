Ext.form.TriggerField.override({   
    afterRender: function() {   
         Ext.form.TriggerField.superclass.afterRender.call(this);   
    }   
}); 

//历史过车查询功能JS
Ext.ns("Jinpeng.oneMount");

var dataCount = 0;
var viewPortObj = null;
var downPictureWindow = null;
var showFlag = 'grid';
var treeUrl = '';
var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
Ext.onReady(function() {
	Ext.useShims = true;
	var hh = Ext.getBody().getHeight();
	var girdHeight = hh - 75;
	viewPortObj = new Ext.Viewport( {
		layout : 'border',
		id : 'portBody',
		items : [ {
			//查询表单
			region : 'north',
			border : false,
			height : 75,
			xtype : 'northFormPanel'
		}, {
			//列表数据
			xtype : 'panel',
			region : 'center',
			border : false,
			items : [{
				id : 'listDataInfo',
				labelAlign : 'right',
				border : false,
				height : girdHeight,
				autoScroll : true,
				items : [{
					xtype : 'gridCenterDataPanel'
				}]
			},{
				id : 'pigDataInfo',
				labelAlign : 'right',
				hidden : true,
				height : girdHeight,
				border : false,
				autoScroll : true,
				items : [{
					xtype : 'dataPanel'
				}]
			}]
		} ]
	});
});

var treeLable = '';
var textLable = '';
var buttonLable = '';
treeLable = '卡点';
textLable = '请选择卡口';
buttonLable = '选择卡口';
treeUrl = '/Big_Data/zTree/demo/cn/excheck/multiSelectTree1.html';

var kwin1 =new Ext.Window({
	id: "mywin1",
	title: "",
	constrain : true,
	constrainHeader : true,
	width: ww * 2 / 3,
	height: hh * 3 / 4,
	layout: "fit",
	//autoShow: true,
	closeAction:'hide',
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="' + treeUrl + '"></iframe>'
});
var kwin =new Jinpeng.widget.GeneralWindow({
	id: "mywin",
	title: "",
	constrain : true,
	constrainHeader : true,
	width: ww * 2 / 3,
	height: hh * 3 / 4,
	layout: "fit",
	//autoShow: true,
	closeAction:'hide',
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="' + treeUrl + '"></iframe>'
});
var setKKValue=function(data){
	Ext.getCmp('passStation').setValue(data.text);
	Ext.getCmp('kkbhs').setValue(data.id);
	Ext.getCmp('mywin1').hide();
};
var cancelKK=function(data){
	Ext.getCmp('passStation').setValue("");
	Ext.getCmp('kkbhs').setValue("");
	Ext.getCmp('mywin1').hide();
};

var endTime = Date.parseDate(Ext.util.Format.date(new Date(), 'Y-m-d') + " "
		+ "23:59:59", 'Y-m-d H:i:s');

//查询表单
Jinpeng.oneMount.NorthFormPanel = Ext.extend(Ext.Panel,{
		id : 'historyPanel',
		initComponent : function() {
			var _panel = this;
	
			//车牌号
			var carNumStore = new Ext.data.JsonStore({
				url : rootpath
						+ "/dictionary/jsonDictsInCombo.mvc?code=LicPlate",
				root : "data",
				fields : [ 'id', 'text' ],
				autoLoad : false
			});
			
			//车牌颜色
			var carNumColorStore = new Ext.data.JsonStore({
				url : rootpath
						+ "/dictionary/jsonDictsInCombo.mvc?code=LicPlateColor",
				root : "data",
				fields : [ 'id', 'text' ],
				autoLoad : false
			});
			
			Ext.apply(this,{
				items : [ {
					// form表单
					xtype : 'form',
					id : 'oneMountForm',
					//labelAlign : 'right',
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
						columns : 4
					},
					bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
					items : [{
						// 第一行
						width:280,
						items :[{
							fieldLabel : '车牌号码',
							xtype : 'carNumSelecter',
							name : 'carNumStr',
							id : 'carNumStr',
							emptyText : '请输入车牌号码',
							anchor : '94%',
							tooltip : {
								text : "多车牌号码以逗号分隔,最多为十个车牌！"
							},
							vtype:'carNumUpper',
							callBackFun:function(data){
								if (data.data) {
									var carNum = '';
									var j = 0;
									for ( var i = 0; i < data.data.length; i++) {
										if (carNum != '') {
											carNum += ',';
										}
										if (data.data[i] != '' && data.data[i] != 'null') {
											carNum += data.data[i];
										}
										j++;
									}
									Ext.getCmp('carNumStr').setValue(carNum);
								}
							}
						}]
					},{
						width:350,
						items : [ {
							xtype : 'compositefield',
							items : [ {
								flex : 0.5,
								fieldLabel : treeLable,
								xtype : 'tooltiptextfield',
								name : 'passStation',
								id : 'passStation',
								width : 150,
								emptyText : textLable
							}, {
								flex : 0.5,
								owner : this,
								labelAlign : 'right',
								xtype : 'button',
								text : buttonLable,
								id:'choosekkBtn',
								handler : function(){
									kwin.show();
								}
							} ]
						} ]
					}, {
//						items : [{
//							xtype: 'compositefield',
//							anchor : '94%',
//							items: [ {
//					        	xtype : 'checkbox',
//								id : 'nullCarNum',
//								fieldLabel: '无牌',
//								name : 'nullCarNum',
//								value : false,
//								checked : false
//					        }]
//						}]
//					},{
//						xtype : 'spacer'
					},{
						xtype : 'spacer'
					},{
						// 第二行
						items : [ {
							xtype : 'textfield',
							fieldLabel : '开始时间',
							id : 'startdate',
							allowBlank : false,
		                    editable : false,
							name : 'startTime',
							value : new Date().format('Y-m-d') + ' 00:00:00',
							anchor : '94%',
							style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
							listeners  : {   
				            	'focus':function(field){  
									var endTime = Ext.util.Format.date(
											new Date(), 'Y-m-d H:i:s');
									var enddate = Ext.getCmp("enddate").getValue();
									//  日期时间的默认参数      
								    var defaultDateTimeParams = new function()   
								    {   
								        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
								        this.startDate  = endTime;    //  开始时间   
								        //this.maxDate = enddate;
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
							allowBlank : false,
		                    editable : false,
							id : 'enddate',
							name : 'endTime',
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
								        //this.minDate = startdate;
								        this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';  //  格式化时间   
								        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
								        this.alwaysUseStartDate = false;           //  默认使用初始时间   
								    };  
				                    WdatePicker(defaultDateTimeParams);   
				                    field.blur();
				             	}   
							}   
						} ]
//					}, {
//						xtype: 'radiogroup',
//						id   : 'queckSearch',
//					    name:'queckSearch',
//						fieldLabel: "快速查询",
//						anchor : '94%',
//						items : [ {
//							boxLabel : '单天',
//							xtype : 'radio',
//							inputValue : '0',
//							checked : true,
//							name : 'timeType'
//						}, {
//							boxLabel : '三天',
//							xtype : 'radio',
//							inputValue : '2',
//							name : 'timeType'
//						}, {
//							boxLabel : '一周',
//							inputValue : '6',
//							xtype : 'radio',
//							name : 'timeType'
//						}, {
//							boxLabel : '一月',
//							inputValue : '29',
//							xtype : 'radio',
//							name : 'timeType'
//						}],
//						listeners  : {   
//							change :  function( option, checked ) {
//								var values = option.getValue().getGroupValue();
//								var now = new Date();
//								var nowDate = Ext.util.Format.date(now, 'Y-m-d');
//								var realTime = _panel.getthedate(nowDate, values)
//								Ext.getCmp('startdate').setValue(realTime + ' 00:00:00');
//								Ext.getCmp('enddate').setValue(nowDate + ' 23:59:59');
//								_panel.oneMountMethod();
//							}
//						}
					}, {
						bodyStyle : 'padding-left:30px',
							xtype : 'compositefield',
							items : [{
								xtype : 'button',
								flex : 31,
								id : "searchBut",
								text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
								handler : this.oneMountMethod
							}, {
								flex : 31,
								xtype : 'button',
								id : "resetBut1",
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
						/*车牌颜色Store*/
						carNumColorStore.load();
					}
				}
			});
			Jinpeng.oneMount.NorthFormPanel.superclass.initComponent.apply(this);
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
						Ext.getCmp('carNumStr').setValue(carNum);
					}
				}
			});
			chooser.show();
		},
		//查询
		oneMountMethod : function() {
			var form = Ext.getCmp('oneMountForm');
			if (form.getForm().isValid()) {
				if (showFlag == 'grid') {
					Ext.getCmp('timeDesc').setVisible(false);
				} else {
					Ext.getCmp('pigTimeDesc').setVisible(false);
				}
				var startTime1 = Ext.getCmp('startdate').getValue().replace("-","/").replace("-","/");
				var endTime1 = Ext.getCmp('enddate').getValue().replace("-","/").replace("-","/");
				var startDate1 = new Date(Date.parse(startTime1));    
				var endDate1 = new Date(Date.parse(endTime1));   
				if (startDate1 > endDate1) {
					return;
				}
				if (Ext.getCmp('carNumStr').getValue()) {
					if (Ext.getCmp('carNumStr').getValue().split(',').length > 1) {
						var seconds = (endDate1.getTime() - startDate1.getTime())/1000;
						if (seconds > (24 * 60 * 60)) {
							if (showFlag == 'grid') {
								Ext.getCmp('timeDesc').setVisible(true);
							} else {
								Ext.getCmp('pigTimeDesc').setVisible(true);
							}
						}
					}
				}
				var grid;
				if (showFlag == 'grid') {
					grid = Ext.getCmp('historyGridPanel');
				} else {
					grid = Ext.getCmp('phones');
				}
				grid.store.baseParams = {};// 重置
				dataCount = 20 //一次性加载页面数据量
				var nullCarNum = Ext.getCmp('nullCarNum').getValue() == false ? '0' : '1';
				var searchCarNum = Ext.getCmp('carNumStr').getValue();
				if (nullCarNum == '1') {
					searchCarNum = '-,—,无牌,无车牌,车牌';
				}
				//将参数传入后台
				var baseparams = {
					"carNum" : searchCarNum,
					"mounts" : Ext.getCmp('kkbhs').getValue(),
					"startTime" : Ext.getCmp('startdate').getValue(),
					"endTime" : Ext.getCmp('enddate').getValue(),
					//"carNumColor" : Ext.getCmp('carNumColor').getValue(),
					"flag" : "query"
				};
				grid.store.baseParams = baseparams;
				/*刷新选中*/
				this.publish("clearGridSelections",[]);
				grid.store.load({
					params : {
						'page.start' : 0,
						'page.limit' : 15
					},
					callback : function(o,response,success) {
						if (showFlag == 'grid') {
							Ext.getCmp('timeDesc').setVisible(false);
						} else {
							Ext.getCmp('pigTimeDesc').setVisible(false);
						}
					}
				});
			}
		},
		resetMethod : function() {
			Ext.getCmp('oneMountForm').getForm().reset();
			if(document.getElementById("ifrm")){
				document.getElementById("ifrm").contentWindow.hidPage();
			}
			
		},
		getthedate : function(olddate,day) {
			var d = this.initDate(olddate); 
			d.setDate(d.getDate()-day); 
			var day = d.getDate(); 
			//firefox以及chrome下不兼容 getYear返回的数据有问题 改为getfullyear函数
			//var year = d.getYear(); 
			var year = d.getFullYear();
			var month = d.getMonth()+1; 
			return year+"-"+month+"-"+day;
			//可以加上错误处理
			/*var a = new Date(dd)
			a = a.valueOf()
			a = a + dadd * 24 * 60 * 60 * 1000
			a = new Date(a);
			var m = a.getMonth() + 1;
			if(m.toString().length == 1){
			    m='0'+m;
			}
			var d = a.getDate();
			if(d.toString().length == 1){
			    d='0'+d;
			}
			return a.getFullYear() + "-" + m + "-" + d;*/
		},
		initDate : function(date) { 
			var newdate=new Date(); 
			newdate.setYear(date.split("-")[0]); 
			newdate.setMonth(date.split("-")[1]-1);
			newdate.setDate(date.split("-")[2]); 
			return newdate; 
		}
	});

//所需数据
var oneMountStore = new Ext.data.JsonStore({
	url : rootpath + "/car/query/historyQuery.mvc",
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
	      {name : 'ssdq'}]
});

//中心右区域数据
Jinpeng.oneMount.gridCenterDataPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'historyGridPanel',
	border : false,
	frame : false,
	height : Ext.getBody().getHeight() - 75,
	pageSize : 15,
	initComponent : function() {
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this,{
			store : oneMountStore,
			cm : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false,
				},
				columns : [
						new Ext.ux.grid.PagingRowNumberer({width : 40}),
						sm,/*{header : '信息编号',
							dataIndex : 'xxbh'},*/
						{
							header : '车牌号码',
							dataIndex : 'hphm',
							renderer: function(val, metaData, record) {
								var str = "";
								var counts = record.data.cscd;
								if (val != '-' && val != '无车牌' && val != '无牌' && val != '车牌' && val != null && val != '—' && val != 'null') {
									str = "<a href='#' onclick=\"showCarOnePlace('" + val + "','" + counts + "')\">" + val + "</a>";
								} else {
									str = '无';
								}
								return str;
								//return '<font ext:qtip="'+val+'"><a href="#">'+ val+'</a></font>';
							}
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
							    val =~~val
						        if (val > 20) {
						            return '<span style="color:#008000;">' + val + '&nbsp;&nbsp;km/h</span>';
						        } else if (val < 10) {
						            return '<span style="color:#FF0000;">' + val + '&nbsp;&nbsp;km/h</span>';
						        }
						        return val;
						    }
						},{
							header : '卡口名称',
							dataIndex : 'kkmc',
							width : 250,
							renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
								//当文字过多的时候，鼠标移上去就给悬浮狂提示
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
							     //当文字过多的时候，鼠标移上去就给悬浮狂提示
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
					xtype : 'tbspacer',
					width : 12
				},{
					xtype : 'button',
					id : 'exportRecordBtn',
					tooltip : {
						text : '最多只能导出1000条数据!'
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
						var httpUrl = Ext.getCmp("tx1");
						var bjxxbh = Ext.getCmp("xxbh");
						var carNum='' ;
						if (Ext.getCmp('historyGridPanel').getSelectionModel().getSelections()=='') {
							Ext.MessageBox.confirm("确认", "系统按当前查询条件为你导出最多1000张图片，如果图片过多，将启用后台下载！", function(v) {
								if ("yes" == v) {
									linkDownloadPicture(bjxxbh,httpUrl,carNum,'search');
								}
							});
						}else{
							linkDownloadPicture(bjxxbh,httpUrl,carNum);
						}
						
					}
//				},{
//					xtype : 'tbspacer',
//					width : 10
//				},{
//					xtype : 'button',
//					id : 'pigShowBtn',
//					text : '图表展示',
//					handler : this.pigShowData
//				},{
//					xtype : 'tbspacer',
//					width : 10
//				},{
//					xtype : 'button',
//					id : 'exportMoreBtn',
//					tooltip : {
//						text : '导出大量数据，请到导出管理中心查询导出进度！'
//					},
//					text : '后台导出',
//					handler : this.importMoreExcelData
//				},{
//					xtype : 'tbspacer',
//					width : 10
//				},{
//					xtype : 'button',
//					id : 'importBut',
//					text : '车牌导入',
//					handler : this.importCarNum
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
			bbar : new Jinpeng.widget.PagingToolbarForAll( {
				id : 'PagingToolbar',
				store : oneMountStore,
				//displayInfo : true,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			}),
			listeners : {
				/*双击查看*/
				rowdblclick : function(grid, rowIndex, e ) {
					var data = grid.store.getAt(rowIndex);
					var win = new Jinpeng.oneMount.HistoryCarDetailWindow();
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
		Jinpeng.oneMount.gridCenterDataPanel.superclass.initComponent.apply(this);
	},
	//超链接的方法 
	checkHref : function(grid, rowIndex, colIndex, item, event) {
		var recode = grid.store.getAt(rowIndex);
		if (recode) {
			//创建window窗体
			var win = new Jinpeng.oneMount.HistoryCarDetailWindow();
			win.recode = recode;
			win.loadId = recode.get("xxbh");// 唯一序列号
			win.show();
		}
	},
	
	//导出Excel格式数据方法 
	importExcelData : function() {
		var records = Ext.getCmp('historyGridPanel').getSelectionModel().getSelections();
		var config = {
			selectExportURL : rootpath + "/car/exportHistoryData.mvc",
			queryExportURL : rootpath + "/car/exportHistoryData.mvc"
		};
		// 得到选中的ids
		var ids = [];
		var carNums = [];
		for ( var i = 0; i < records.length; i++) {
			carNums[carNums.length] = records[i].get('hphm');
			ids[ids.length] = records[i].get('xxbh');
		}
		config.ids = ids;
		config.carNums = carNums;
		if (ids.length > 0) {
			config.start = records[0].get('txsl') == undefined ? 0 : records[0].get('txsl');
			config.limit = this.ownerCt.ownerCt.pageSize;
		} else {
			config.start = 0;
			config.limit = 1000;//默认最大导出1000条
		}
		config.count = 1000; //默认最大导出1000条
		var param = getQueryParams();
		config.queryCondition = param.join("&");
		var ExportHelper = new Jinpeng.HistoryExportHelper(config);
		ExportHelper.startExport(true);
	},
	importMoreExcelData : function() {
		var records = Ext.getCmp('historyGridPanel').store;
		/*if (records.data.items.length == 0) {
			var win = new Jinpeng.widget.MessageWindow();
			win.msg = '页面无数据，请确保存在数据后再导出！';
			win.show();
			return;
		}*/
		var config = {
			queryExportURL : rootpath + "/car/exportHistoryData.mvc"
		};
		var param = getQueryParams();
		config.queryCondition = param.join("&");
		var ExportHelper = new Jinpeng.HistoryMoreExportHelper(config);
		ExportHelper.startExport(true);
	},
	pigShowData : function() {
		Ext.getCmp('listDataInfo').setVisible(false);
		Ext.getCmp('pigDataInfo').setVisible(true);
		showFlag = 'pig';
		var panel = Ext.getCmp('historyPanel');
		panel.oneMountMethod();
	},
	importCarNum : function() {
		new Jinpeng.carNum.UploadWindow({
			fileName:"carNumExcel",
			uploadURL : rootpath + "/car/importCarNumExcel.mvc",
			templateURL : rootpath+"/resources/car_num.xls",
			callbackFn : function(data){
				Ext.getCmp('carNumStr').setValue(data);
			}
		}).show();
	}
});

function showCarOnePlace(carNum, counts) {
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

//下载图片方法
function linkDownloadPicture(id,httpUrl,carNum, flag){
	// 得到选中的ids
	var ids = [];
    var url = [];
    var carNumB=[];
    var hurl= httpUrl;
    if(hurl!=undefined){		
      url[url.length] =httpUrl;	
      carNumB[carNumB.length] = carNum;
    }else if(hurl==undefined){
    	var records = Ext.getCmp('historyGridPanel').getSelectionModel().getSelections();
		if(records != ""){
			for ( var i = 0; i < records.length; i++) {
				url[url.length] = records[i].get('tx1');
				carNumB[carNumB.length] = records[i].get('hphm');
				
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
	var carNumber=carNumB ? carNumB.join(','):'';
	if((idString!='' &&　httpUrlString != '') || flag == 'search'){
		var params = {};
		if (flag == 'search') {
			var nullCarNum = Ext.getCmp('nullCarNum').getValue() == false ? '0' : '1';
			var searchCarNum = Ext.getCmp('carNumStr').getValue();
			if (nullCarNum == '1') {
				searchCarNum = '-,—,无牌,无车牌,车牌';
			}
			params = {
				"carNum" : searchCarNum,
				"mounts" : Ext.getCmp('kkbhs').getValue(),
				"startTime" : Ext.getCmp('startdate').getValue(),
				"endTime" : Ext.getCmp('enddate').getValue(),
				"flag" : "query"
			};
		} else {
			params = {'idstr': idString,'url':httpUrlString,'carNum':carNumber};
		}
		Ext.Ajax.request({
				// 将id组合成字符串传递到后台
				url : rootpath+'/car/loadCarQueryAnalyzeImgUrlByIds.mvc',
				method : 'POST',
				params : params,
				success : function(resp, opts) {
					var txt = Ext.util.JSON.decode(resp.responseText);
					//var data = txt.data;
					if(txt != "faild" && txt != "success"){
						window.open (txt,'_black');
//						downPictureWindow.close();
//						Ext.Msg.alert("系统提示","图片下载成功...");
					} else if(txt == "success") {
						/*var win = new Jinpeng.widget.MessageWindow();
						win.msg = "图片过多，已启用后台下载功能，请到导出管理中查看下载进度！";
						win.show();*/
					} else {
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
	
}

//弹出窗口历史过车详细信息
Jinpeng.oneMount.HistoryCarDetailWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
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
							gridStore = oneMountStore;
						} else {
							gridStore = dataViewStore;
						}
						//获取选中的的行数-1
						var data = gridStore.getAt(idNum);
						// 如果不为空，则进行数据加载
						if (data!= null) {
							this.loadRecordById(data,idNum);
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
						if (showFlag == 'grid') {
							gridStore = oneMountStore;
						} else {
							gridStore = dataViewStore;
						}
						//获取选中的的行数+1
						var data = gridStore.getAt(idNum);
						
						// 如果不为空，则进行数据加载
						if (data != null) {
							this.loadRecordById(data,idNum);
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
						var carNum = Ext.getCmp('carNum').getValue();
						if (showFlag == 'grid') {
							//根据Id下载图片
							linkDownloadPicture(id,httpUrl,carNum);
						} else {
							//根据Id下载图片
							pigDownloadPicture(id,httpUrl,carNum);
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
		Jinpeng.oneMount.HistoryCarDetailWindow .superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Jinpeng.oneMount.HistoryCarDetailWindow .superclass.afterRender.call(this);
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
		var carNumber ;
		var gridStore;
		if (showFlag == 'grid') {
			gridStore = oneMountStore;
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
		var gridStore;
		if (showFlag == 'grid') {
			gridStore = oneMountStore;
		} else {
			gridStore = dataViewStore;
		}
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
			//nextId = (rownum-k)+'|'+oneMountStore.getAt(k-1).get('xxbh');
			//信息编号唯一的情况下使用
			nextId = (k-1)+'|'+gridStore.getAt(k-1).get('xxbh');
		}
		if (upOrDown == true
				&& k < gridStore.getCount() - 1) {
			
			//nextId = (k+rownum+1)+'|'+oneMountStore.getAt(k+1).get('xxbh');
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
		if (showFlag == 'grid') {
			gridStore = oneMountStore;
		} else {
			gridStore = dataViewStore;
		}
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

//获取当前查询条件参数，并封装为数组
function getQueryParams() {
	//将查询参数传递到后台，并在后台获取要导出的数据 
	var nullCarNum = Ext.getCmp('nullCarNum').getValue() == false ? '0' : '1';
	var searchCarNum = Ext.getCmp('carNumStr').getValue();
	if (nullCarNum == '1') {
		searchCarNum = '-,—,无牌,无车牌,车牌';
	}
	var param = [];
	//param[param.length] = "xxbh="+Ext.getCmp('xxbh').getValue();
	param[param.length] = "carNum=" + searchCarNum;
	param[param.length] = "mounts=" + Ext.getCmp('kkbhs').getValue();
	param[param.length] = "startTime=" + Ext.getCmp('startdate').getValue();
	param[param.length] = "endTime=" + Ext.getCmp('enddate').getValue();
	//param[param.length] = "carNumColor=" + Ext.getCmp('carNumColor').getValue();
	param[param.length] = 'flag=query';
	return param;
}

//所需数据
var dataViewStore = new Ext.data.JsonStore({
	url : rootpath + "/car/query/historyQuery.mvc",
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
	      {name : 'ssdq'}]
});

var tpl = new Ext.XTemplate(
 '<ul>',
     '<tpl for=".">',
         '<li class="phone">',
             '<img width="150" height="130" src="{tx1}" />',
             '<strong>车牌号码：<a href="#" onclick=\'showCarOnePlace("{hphm}")\'>{hphm}</a></strong>',
             '<strong>车辆速度：{speed}</strong>',
             '<strong>卡口名称：{kkmc}</strong>',
             '<strong>经过时间：{time}</strong>',
         '</li>',
     '</tpl>',
 '</ul>'
);

//DataView区域
Jinpeng.oneMount.DataView = Ext.extend(Ext.DataView,{
	id: 'phones',
    itemSelector: 'li.phone',
    overClass   : 'phone-hover',
    loadingText:'努力加载中，请稍后...',
    singleSelect: true,
    multiSelect : true,
    autoScroll : true,
	initComponent : function() {
		var _this = this;
		Ext.apply(this,{
			store : dataViewStore,
			tpl : tpl,
			listeners : {
				dblclick : function(option, index, node, e) {
					var data = option.store.getAt(index);
					var win = new Jinpeng.oneMount.HistoryCarDetailWindow();
					win.recode = data;
					//将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
					win.loadId = data.get("xxbh");
					win.tx1 = data.get("tx1");
					win.show();
				}
			}
		});
		Jinpeng.oneMount.DataView.superclass.initComponent.apply(this);
	}
});

//panel区域
Jinpeng.oneMount.DataPanel = Ext.extend(Ext.Panel,{
	frame:true,
    //autoHeight:true,
    height : Ext.getBody().getHeight() - 75,
    collapsible:true,
    layout:'fit',
    pageSize : 15,
	initComponent : function() {
		Ext.apply(this,{
			items : [{
				xtype : 'historyDataView'
			}],	
			tbar : {
				cls : 'blue-button-ct',
				items : [ {
					xtype : 'button',
					id : 'exportRecordBtn2',
					tooltip : {
						text : '最多只能导出1000条数据!'
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
						var httpUrl = Ext.getCmp("tx1");
						var bjxxbh = Ext.getCmp("xxbh");
						var carNum='' ;
						if (Ext.getCmp('phones').getSelectedNodes().length==0) {
							Ext.MessageBox.confirm("确认", "系统按当前查询条件为你导出最多1000张图片，如果图片过多，将启用后台下载！", function(v) {
								if ("yes" == v) {
									pigDownloadPicture(bjxxbh,httpUrl,carNum,'search');
								}
							});
						}else{
							pigDownloadPicture(bjxxbh,httpUrl,carNum);
						}
					}
				},{
					xtype : 'tbspacer',
					width : 10
				},{
					xtype : 'button',
					id : 'listRecordBtn',
					text : '列表展示',
					handler : this.listDatas
				},{
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
			bbar : new Jinpeng.widget.PagingToolbarForAll( {
				id : 'PigPagingToolbarCar',
				store : dataViewStore,
				//displayInfo : true,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			})
		});
		Jinpeng.oneMount.DataPanel.superclass.initComponent.apply(this);
	},
	//导出Excel格式数据方法 
	importExcelData : function() {
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
			carNums[carNums.length] = data.get('hphm');
			ids[ids.length] = data.get('xxbh');
		}
		config.ids = ids;
		config.carNums = carNums;
		if (ids.length > 0) {
			var dataOne = Ext.getCmp('phones').getRecord(Ext.getCmp('phones').getSelectedNodes()[0]);
			config.start = dataOne.get('txsl') == undefined ? 0 : dataOne.get('txsl');
			config.limit = this.ownerCt.ownerCt.pageSize;
		} else {
			config.start = 0;
			config.limit = 1000;//默认最大导出1000条
		}
		config.count = 1000; //默认最大导出1000条
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
		Ext.getCmp('listDataInfo').setVisible(true);
		Ext.getCmp('pigDataInfo').setVisible(false);
		showFlag = 'grid';
		var panel = Ext.getCmp('historyPanel');
		panel.oneMountMethod();
	}
});

//下载图片方法
function pigDownloadPicture(id,httpUrl,carNum, flag){
	// 得到选中的ids
	var ids = [];
    var url = [];
    var carNumB=[];
    var hurl= httpUrl;
    if(hurl!=undefined){		
      url[url.length] =httpUrl;	
      carNumB[carNumB.length] = carNum;
    }else if(hurl==undefined){
    	var records = Ext.getCmp('phones').getSelectedNodes();
		if(records != ""){
			var data;
			for ( var i = 0; i < records.length; i++) {
				data = Ext.getCmp('phones').getRecord(records[i]);
				url[url.length] = data.get('tx1');
				carNumB[carNumB.length] = data.get('hphm');
				
			}
		}
    }
	if(id) {
		ids[ids.length] = id;
	} else {
		var records = Ext.getCmp('phones').getSelectedNodes();
		var data;
		if (records != "") {
			for ( var i = 0; i < records.length; i++) {
				data = Ext.getCmp('phones').getRecord(records[i]);
				ids[ids.length] = data.get('xxbh');
			}
		}
	}
	var idString = ids ? ids.join(',') : '';
	var httpUrlString = url ? url.join(',') : '';
	var carNumber=carNumB ? carNumB.join(','):'';
	if (httpUrlString.indexOf("null.jpg") != -1) {
		var win = new Jinpeng.widget.MessageWindow();
		win.msg = "请选择有图片的数据进行下载！";
		win.show();
	}
	if((idString!='' &&　httpUrlString != '') || flag == 'search'){
		var params = {};
		if (flag == 'search') {
			var nullCarNum = Ext.getCmp('nullCarNum').getValue() == false ? '0' : '1';
			var searchCarNum = Ext.getCmp('carNumStr').getValue();
			if (nullCarNum == '1') {
				searchCarNum = '-,—,无牌,无车牌,车牌';
			}
			params = {
				"carNum" : searchCarNum,
				"mounts" : Ext.getCmp('kkbhs').getValue(),
				"startTime" : Ext.getCmp('startdate').getValue(),
				"endTime" : Ext.getCmp('enddate').getValue(),
				"flag" : "query"
			};
		} else {
			params = {'idstr': idString,'url':httpUrlString,'carNum':carNumber};
		}
		Ext.Ajax.request({
				// 将id组合成字符串传递到后台
				url : rootpath+'/car/loadCarQueryAnalyzeImgUrlByIds.mvc',
				method : 'POST',
				params : params,
				success : function(resp, opts) {
					var txt = Ext.util.JSON.decode(resp.responseText);
					//var data = txt.data;
					if(txt != "faild" && txt != "success"){
						window.open (txt,'_black');
//						downPictureWindow.close();
//						Ext.Msg.alert("系统提示","图片下载成功...");
					} else if(txt == "success") {
						/*var win = new Jinpeng.widget.MessageWindow();
						win.msg = "图片过多，已启用后台下载功能，请到导出管理中查看下载进度！";
						win.show();*/
					} else {
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
	
}

Ext.reg('northFormPanel', Jinpeng.oneMount.NorthFormPanel);
Ext.reg('gridCenterDataPanel', Jinpeng.oneMount.gridCenterDataPanel);
Ext.reg('historyDataView', Jinpeng.oneMount.DataView);
Ext.reg('dataPanel', Jinpeng.oneMount.DataPanel);