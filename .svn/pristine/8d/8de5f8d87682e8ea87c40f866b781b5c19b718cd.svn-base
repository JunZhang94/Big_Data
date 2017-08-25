Ext.form.TriggerField.override({   
    afterRender: function() {   
         Ext.form.TriggerField.superclass.afterRender.call(this);   
    }   
}); 

//单卡口实时过车功能JS
Ext.ns("Jinpeng.historyQuery");

var dataCount = 0;
var viewPortObj = null;
var downPictureWindow = null;

var hh = Ext.getBody().getHeight();var ww = Ext.getBody().getWidth();var historyTime;var freshTme = 10000;var mounts; //卡口编号字符串集Ext.onReady(function() {	Ext.useShims = true;	viewPortObj = new Ext.Viewport( {		layout : 'border',		items : [ {			//查询表单			region : 'north',			border : false,			height : 45,			xtype : 'northFormPanel'		}, {			//列表数据			region : 'center',			border : false,			xtype : 'gridCenterDataPanel'		} ],		listeners : {			afterrender : function() {				freshTimeData()			}		}	});});
function freshTimeData() {	var formPanel = Ext.getCmp('formPanel');	historyTime = setInterval(function() {		formPanel.historyQueryMethod();	},freshTme);}
var kwin1 =new Ext.Window({	id: "mywin",	title: "",	constrain : true,	constrainHeader : true,	width: ww * 2 / 3,	height: hh * 3 / 4,	layout: "fit",	//autoShow: true,	closeAction:'hide',	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/Big_Data/zTree/demo/cn/excheck/multiSelectTree2.html"></iframe>'
});
var setKKValue=function(data){
	Ext.getCmp('kkmcs').setValue(data.text);
	Ext.getCmp('kkbhs').setValue(data.id);
	Ext.getCmp('mywin').hide();
};
var cancelKK=function(data){
	Ext.getCmp('kkmcs').setValue("");
	Ext.getCmp('kkbhs').setValue("");
	Ext.getCmp('mywin').hide();
};

var endTime = Date.parseDate(Ext.util.Format.date(new Date(), 'Y-m-d') + " "
		+ "23:59:59", 'Y-m-d H:i:s');

//查询表单
Jinpeng.historyQuery.NorthFormPanel = Ext.extend(Ext.Panel,{		id : 'formPanel',
		initComponent : function() {
			var _panel = this;
			Ext.apply(this,{
				items : [ {
					// form表单
					xtype : 'form',
					id : 'historyQueryForm',
					//labelAlign : 'right',
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
									name : 'kkmcs',
									id : 'kkmcs',
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
										kwin1.show();
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
			} ]
			});
			Jinpeng.historyQuery.NorthFormPanel.superclass.initComponent.apply(this);
		},		//查询		historyQueryMethod : function() {			var form = Ext.getCmp('historyQueryForm');
			if (form.getForm().isValid()) {
				var grid = Ext.getCmp('historyGridPanel');
				grid.store.baseParams = {};// 重置
				dataCount = 20 //一次性加载页面数据量
				//将参数传入后台				mounts = Ext.getCmp('kkbhs').getValue();				var baseparams = {
					"mounts" : mounts,
					"flag" : "query"
				};
				grid.store.baseParams = baseparams;
				/*刷新选中*/
				this.publish("clearGridSelections",[]);				grid.store.load({					params : {						'page.start' : 0,						'page.limit' : Jinpeng.PageSize					}				});			}
		},
		resetMethod : function() {
			Ext.getCmp('historyQueryForm').getForm().reset();
			document.getElementById("ifrm").contentWindow.hidPage();
		},
		getthedate : function(olddate,day) {
			var d = this.initDate(olddate); 
			d.setDate(d.getDate()-day); 
			var day = d.getDate(); 
			var year = d.getYear(); 
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
	      {name : 'txsl'},	      {name : 'ssdq'}]
});

//中心右区域数据
Jinpeng.historyQuery.gridCenterDataPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'historyGridPanel',
	border : false,
	frame : false,
	pageSize : Jinpeng.PageSize,
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
						sm,/*{header : '信息编号',
							dataIndex : 'xxbh'},*/
						{
							header : '卡口名称',
							dataIndex : 'kkmc',
							width : 250,
							renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
							    var now = new Date().getTime();
							    var space = 1800000;//半个小时
							    if(now - record.data.jgsj > space){
							    	return '<font ext:qtip="'+value+'" style="color:red;">'+value+'</font>';
							    }else{
							    	return '<font ext:qtip="'+value+'" style="color:green;">'+value+'</font>';
							    }
							}
						},{							header : '方向名称',							dataIndex : 'fxmc',							width : 200,							renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 								var now = new Date().getTime();															    var space = 1800000;//半个小时							    							    if (value == null) {							    	return '';							    }								    if(now - record.data.jgsj > space){								    	return '<font ext:qtip="'+value+'" style="color:red;">'+value+'</font>';								    }else{								    	return '<font ext:qtip="'+value+'" style="color:green;">'+value+'</font>';								    }						    }						},
						{
							header : '单位名称',
							dataIndex : 'dwmc',
							width : 200,
							renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
							    var now = new Date().getTime();
							    var space = 1800000;//半个小时
							    if(now - record.data.jgsj > space){
							    	return '<font ext:qtip="'+value+'" style="color:red;">'+value+'</font>';
							    }else{
							    	return '<font ext:qtip="'+value+'" style="color:green;">'+value+'</font>';
							    }
							}
						},
						{
							header : '车牌号码',
							dataIndex : 'hphm',
							renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
							    var now = new Date().getTime();
							    var space = 1800000;//半个小时							    							    if (value == null) {							    	return '<font style="color:green;">无</font>';							    }
							    if(now - record.data.jgsj > space){
							    	return '<font style="color:red;">'+value+'</font>';
							    }else{
							    	return '<font style="color:green;">'+value+'</font>';
							    }
	//					     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
							}
						},{
							header : '车牌颜色',
							dataIndex : 'hpysmc',
							renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
							    var now = new Date().getTime();
							    var space = 1800000;//半个小时
							    if(now - record.data.jgsj > space){
							    	return '<font style="color:red;">'+value+'</font>';
							    }else{
							    	return '<font style="color:green;">'+value+'</font>';
							    }
							}
						}/*,{
							header : '号牌种类',
							dataIndex : 'hpzlmc'
						}*/,{
							header : '车辆速度',
							dataIndex : 'clsd',
							width : 80,
//							renderer: function(val) {
//							    val =~~val
//						        if (val > 20) {
//						            return '<span style="color:#008000;">'+val+'&nbsp;&nbsp;km/h</span>';
//						        } else if (val < 10) {
//						            return '<span style="color:#FF0000;">' + val + '&nbsp;&nbsp;km/h</span>';
//						        }
//						        return val;
//						    }
							renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
								value=~~value;
							    var now = new Date().getTime();
							    var space = 1800000;//半个小时
							    if(now - record.data.jgsj > space){
							    	return '<font style="color:red;">'+value+'&nbsp;&nbsp;km/h</font>';
							    }else{
							    	return '<font style="color:green;">'+value+'&nbsp;&nbsp;km/h</font>';
							    }
							}
						},{
							header : '经过时间',
							width : 180,
							dataIndex : 'jgsj',
							renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
							    var now = new Date().getTime();
							    var space = 1800000;//半个小时
							    if(now - record.data.jgsj > space){
							    	return '<font style="color:red;">'+Ext.util.Format.date(new Date(Number(value)), 'Y-m-d H:i:s')+'</font>';
							    }else{
							    	return '<font style="color:green;">'+Ext.util.Format.date(new Date(Number(value)), 'Y-m-d H:i:s')+'</font>';
							    }
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
		
			bbar : new Jinpeng.widget.PagingToolbarForAll( {
				id : 'PagingToolbar',
				store : historyQueryStore,
				//displayInfo : true,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			}),
			listeners : {
				/*双击查看*/
				rowdblclick : function(grid, rowIndex, e ) {
					var data = grid.store.getAt(rowIndex);
					var win = new Jinpeng.historyQuery.HistoryCarDetailWindow();
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
			var recode = grid.store.getAt(rowIndex);
			var mainParam = {
				'orgId' : orgId,
				'orgType' : orgType,
				'kkbhs' : kkbhs,
				'counts' : recode.data.passTimes
			};
			/*if (fieldName=='hphm') {
				var win = new Jinpeng.carFrequency.CarFrequencyWindow({
					cls : 'system_mod',
					modal : true
				});
				win.init(mainParam);
				win.show();
			}*/
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
	}
});

//下载图片方法
function linkDownloadPicture(id,httpUrl,carNum){
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
	if(idString!='' &&　httpUrlString != ''){
		Ext.Ajax.request({
				// 将id组合成字符串传递到后台
				url : rootpath+'/car/loadCarQueryAnalyzeImgUrlByIds.mvc',
				method : 'POST',
				params : {'idstr': idString,'url':httpUrlString,'carNum':carNumber},
				success : function(resp, opts) {
					var txt = Ext.util.JSON.decode(resp.responseText);
					//var data = txt.data;
					if(txt){
						window.open (txt,'_black');
//						downPictureWindow.close();
//						Ext.Msg.alert("系统提示","图片下载成功...");
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
Jinpeng.historyQuery.HistoryCarDetailWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
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
						//获取选中的的行数-1
						var data = historyQueryStore.getAt(idNum);
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
						//获取选中的的行数+1
						var data = historyQueryStore.getAt(idNum);
						
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
						//alert(carNum);
						//根据Id下载图片
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
	
	loadRecordById : function(data,carnum) {
		var carNumber ;
		if(carnum != undefined && carnum >0 ){
			carNumber = historyQueryStore.getAt(carnum-1).get('hphm');
		}
		if(carnum ==0){
			carNumber = historyQueryStore.getAt(carnum).get('hphm');
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
			for ( var i = 0; i < historyQueryStore.getCount(); i++) {
				if (this.loadId == historyQueryStore.getAt(i).get('xxbh')) {
					k = i;
					break;
				}
		    }
		}
		
		if (upOrDown == false && k > 0) {
			//测试用的
			//nextId = (rownum-k)+'|'+historyQueryStore.getAt(k-1).get('xxbh');
			//信息编号唯一的情况下使用
			nextId = (k-1)+'|'+historyQueryStore.getAt(k-1).get('xxbh');
		}
		if (upOrDown == true
				&& k < historyQueryStore.getCount() - 1) {
			
			//nextId = (k+rownum+1)+'|'+historyQueryStore.getAt(k+1).get('xxbh');
			nextId = (k+1)+'|'+historyQueryStore.getAt(k+1).get('xxbh');
			
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

//获取当前查询条件参数，并封装为数组
function getQueryParams() {
	//将查询参数传递到后台，并在后台获取要导出的数据 
	var param = [];
	//param[param.length] = "xxbh="+Ext.getCmp('xxbh').getValue();
	param[param.length] = "carNum=" + Ext.getCmp('carNumStr').getValue();;
	param[param.length] = "mounts=" + Ext.getCmp('directions').getValue();
	param[param.length] = "startTime=" + Ext.getCmp('startdate').getValue();
	param[param.length] = "endTime=" + Ext.getCmp('enddate').getValue();
	param[param.length] = 'flag=query';
	return param;
}

Ext.reg('northFormPanel', Jinpeng.historyQuery.NorthFormPanel);
Ext.reg('gridCenterDataPanel', Jinpeng.historyQuery.gridCenterDataPanel);