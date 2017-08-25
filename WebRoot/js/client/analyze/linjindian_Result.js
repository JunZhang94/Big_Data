Ext.ns("Jinpeng.resultQuery");

var praParams;//查询条件
var conditions;//页面查询组件
var config = {
	queryUrl : rootpath + parent.window.opener.queryUrl,
};
Ext.onReady(function() {
	var resultScript = document.getElementById("resultScript"); 
	resultScript.src="http://" + ipAdress + "/PGISViewer/PGISViewer.html";//域B的链接 
	praParams = parent.window.opener.params;
	conditions = parent.window.opener.conditions;
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport( {
		layout : 'border',
		id : 'portBody',
		items : [ {
			//表单
			region : 'north',
			border : false,
			height : 110,
			xtype : 'northFormPanel'
		}, {
			//列表数据
			region : 'center',
			border : false,
			xtype : 'DataPanel'
		}]
	});
});

//表单
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
						width : 600,
						layout : 'form'
					},
					layoutConfig : {
						columns : 2
					},
					bodystyle:'white-space : nowrap'
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
					_panel.resultQueryMethod();
				}
			}
		});
		Jinpeng.resultQuery.NorthFormPanel.superclass.initComponent.apply(this);
	},
	//查询
	resultQueryMethod : function() {
		var grid = Ext.getCmp('nearPointGrid');
		grid.store.baseParams = {};// 重置
		//将参数传入后台
		var baseparams = praParams;
		grid.store.baseParams = baseparams;
		/*刷新选中*/
		this.publish("clearGridSelections",[]);
		grid.store.load({
			params : {
				'page.start' : 0,
				'page.limit' : 15
			},
			callback : function(o,response,success) {
				var mountOne = conditions[0].items[0].value;
				var mountTwo = conditions[1].items[0].value;
				var rowData = (mountOne+','+mountTwo+",车牌号码,品牌_型号_年款,车辆类别,车牌颜色,过车时间").split(",");
				var valueData=("kkmc1,kkmc2,hphm,pinpai,clzl,hpys,jgsj").split(",");
				var fields = new Array(rowData.length);
				var columns = new Array(rowData.length);
				var maxLength = rowData.length;
				var imageWH = 16*maxLength;
				var data = null;
				var filedO = {}, columnsO = {};
				for (var i = 0; i < rowData.length; i++) {
					columnsO.header = rowData[i];
					columnsO.dataIndex = valueData[i];
					columnsO.width = 50;
					fields[i] = filedO;
					columns[i] = columnsO;
					filedO = {}, columnsO = {}; //重置
				}
				var columns = columns;
				var fields = fields;
				colM.length = 0; //清空数组
				colM.push( new Ext.ux.grid.PagingRowNumberer({ width : 40, height : 50}));
				
				for ( var i = 0; i < fields.length; i++) {
					dataFields.push(fields[i]);
					colM.push(columns[i]);
				}
			    grid.reconfigure(nearPointStore, new Ext.grid.ColumnModel(colM));
			    if (o && o.length > 0) {
			    	var oneCounts = o[0].data.oneCounts;
				    var twoCounts = o[0].data.twoCounts;
				    var subtractCounts = Math.abs(twoCounts - oneCounts);
				    Ext.getCmp('nearPointGrid').setTitle("差异总数：" + subtractCounts + "，" + mountOne + "：" + oneCounts + "，" + mountTwo + "：" + twoCounts);
			    }
			}
	});
	}
});

var dataFields = [{
		name : 'kkmc1'
	}, {
		name : 'kkmc2'
	}, {
		name : 'hphm'
	}, {
		name : 'pinpai'
	}, {
		name : 'clzl'
	}, {
		name : 'hpys'
	}, {
		name : 'jgsj'
	}, {
		name : 'oneCounts'
	}, {
		name : 'twoCounts'
	},{
		name : 'xxbh'//隐藏
	}
];

var colM = [
	new Ext.ux.grid.PagingRowNumberer({ width : 40, height : 50}),
		{
			header : '卡口1',
			dataIndex : 'kkmc1'
		},{
			header : '卡口2',
			dataIndex : 'kkmc2'
		},{
			header : '车牌号码',
			dataIndex : 'hphm'
		},{
			header : '车辆种类',
			dataIndex : 'clzl'
		},{
			header : '品牌_型号_年款',
			dataIndex : 'pinpai'
		},{
			header : '车牌颜色',
			dataIndex : 'hpys'
		},{
			header : '过车时间',
			dataIndex : 'jgsj'
		}
];
//中心右区域数据显示中心
var nearPointStore = new Ext.data.JsonStore({
	url : config.queryUrl,
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	fields : dataFields
});

Jinpeng.resultQuery.DataPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'nearPointGrid',
   	border : false,
    pageSize : 15,
    autoScroll : true,
    width : 1000,
//    height :  Ext.getBody().getHeight() - 145,
    title : '比对列表',
	initComponent : function() {
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this,{
			store : nearPointStore,
			colModel :  new Ext.grid.ColumnModel({
				defaults : {
				sortable : false,
				autoHeight:true
			},
				columns :colM
			}),
			listeners : {
				/*双击查看*/
				rowdblclick : function(grid, rowIndex, e ) {
					var data = grid.store.getAt(rowIndex);
					var win = new Jinpeng.resultQuery.HistoryCarDetailWindow();
					win.recode = data;
					//将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
					win.loadId = data.get("xxbh");
					win.tx1 = data.get("tx1");
					win.show();
				}
			}
		});
		Jinpeng.resultQuery.DataPanel.superclass.initComponent.apply(this);
	}
});

var showFlag='';
//弹出窗口历史过车详细信息
Jinpeng.resultQuery.HistoryCarDetailWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
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
									id : 'jgsj',
									name : 'jgsj',
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
									fieldLabel : '方向名称',
									name : 'fxmc',
									anchor : '96%'
								} ]
							},{
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '卡口编号',
									name : 'kkbh',
									anchor : '96%'
								} ]
							},{
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '方向编号',
									name : 'fxbh',
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
									fieldLabel : '车牌颜色',
									name : 'hpys',
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
									fieldLabel : '车辆类别',
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
						gridStore = nearPointStore;
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
						gridStore = nearPointStore;
//						
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
						var carNum = Ext.getCmp('carNum_win').getValue();
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
			},
			keys:[
				    {
						key:[39,40], // 调用方法获取下一条记录id
						fn: function(){ 
							var id = this.getDetailRecordId(this.loadId, true);
							// 对值的截取操作
							var idNum = id.substring(0,id.indexOf('|'));
						    var idXxbh = id.substring((id.indexOf('|')+1));
						    var gridStore;
							if (showFlag == 'grid') {
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
				    	},
						scope:this
				    },{
						key:[37,38], // 调用方法获取下一条记录id
						fn: function(){
							var id = this.getDetailRecordId(this.loadId, false);
							
							var idNum = id.substring(0,id.indexOf('|'));
						    var idXxbh = id.substring((id.indexOf('|')+1));
						    var gridStore;
							if (showFlag == 'grid') {
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
				    	},
						scope:this
				    }
			]
		});
		Jinpeng.resultQuery.HistoryCarDetailWindow.superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Jinpeng.resultQuery.HistoryCarDetailWindow.superclass.afterRender.call(this);
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
		gridStore = nearPointStore;
		if(carnum != undefined && carnum >0 ){
			carNumber = gridStore.getAt(carnum-1).get('hphm');
		}
		if(carnum ==0){
			carNumber = gridStore.getAt(carnum).get('hphm');
		}
		var record = {};
		Ext.Ajax.request({
			method : "POST",
			params : {
				"idstr" : data.get("xxbh"),
				"page.start" : "0",
				"page.limit" : "1"
			},
			url : rootpath + "/carType/testCarSearch.mvc",
			success :function(response, options) {
				var rep = response.responseJSON.result[0];
				// 加载数据		
				record.hphm = rep.hphm;
				record.tx1 = rep.tx1;
				record.xxbh = rep.xxbh;
				record.kkbh = rep.kkbh;
				record.dwmc = rep.dwmc;
				record.kkmc = rep.kkmc;
				record.sbmc = rep.sbmc;
				record.fxbh = rep.fxbh;
				record.fxmc = rep.fxmc;
				record.jgsj = Ext.util.Format.date(new Date(Number(rep.jgsj)), 'Y-m-d H:i:s');
				record.hpys = window.dictionary.getValue("LicPlateColor",rep.hpys);
				record.cwhphm = rep.cwhphm;
				record.cwhpys = window.dictionary.getValue("LicPlateColor",rep.cwhpys);
				record.hpyz = window.dictionary.getValue("LicenseVerfiy",rep.gethpyz);//号牌一致，
				record.clsd = rep.clsd==undefined?"":Ext.util.Format.substr(rep.clxs,0,3);
				record.clxs = rep.clxs==undefined?"":Ext.util.Format.substr(rep.clxs,0,3);	
				record.xszt = window.dictionary.getValue("DriverType", rep.xszt);//行驶状态，
				record.clpp = window.dictionary.getValue("CarBrand", data.json.pinpai); //车辆厂牌编码（自行编码）。
				record.csys = window.dictionary.getValue("CarColor", rep.csys);
				record.cllx = window.dictionary.getValue("CarCategory", rep.clzl);
				record.hpzl = window.dictionary.getValue("LicPlateType", rep.hpzl);
				//反向将数据加载到form表单中
				Ext.getCmp('detailWindowForm').getForm().setValues(record);
				record.CARIMGURL = record.tx1;
				this.publish('loadPictures', record);
			},
			scope : this
		});
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
		gridStore = nearPointStore;
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
			//nextId = (rownum-k)+'|'+nearPointStore.getAt(k-1).get('xxbh');
			//信息编号唯一的情况下使用
			nextId = (k-1)+'|'+gridStore.getAt(k-1).get('xxbh');
		}
		if (upOrDown == true
				&& k < gridStore.getCount() - 1) {
			
			//nextId = (k+rownum+1)+'|'+nearPointStore.getAt(k+1).get('xxbh');
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
		gridStore = nearPointStore;
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

//所需数据
var dataViewStore = new Ext.data.JsonStore({
	url : rootpath + "/carType/testCarSearch.mvc",
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
	      {name : 'clzl'}]
});

Ext.reg('northFormPanel', Jinpeng.resultQuery.NorthFormPanel);
Ext.reg('DataPanel', Jinpeng.resultQuery.DataPanel);