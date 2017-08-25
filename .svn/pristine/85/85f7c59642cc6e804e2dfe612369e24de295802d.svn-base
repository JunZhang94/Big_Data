//历史过车查询功能JS
Ext.ns("oneNumManyCarQuery");

var dataCount = 0;
var viewPortObj = null;
var downPictureWindow = null;
var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
var historyTime;
Ext.onReady(function() {
	var resultScript = document.getElementById("resultScript"); 
	resultScript.src="http://" + ipAdress + "/PGISViewer/PGISViewer.html";//域B的链接 
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport( {
		layout : 'border',
		items : [ {
			//查询表单
			region : 'north',
			border : false,
			height : 45,
			xtype : 'northFormPanel'
		}, {
			//列表数据
			region : 'center',
			border : false,
			xtype : 'gisDataPanel'
		} ]
	});
});


//查询表单
oneNumManyCarQuery.NorthFormPanel = Ext.extend(Ext.Panel,{
	id : 'formPanel',
	initComponent : function() {
		var _panel = this;
		Ext.apply(this,{
			items : [ {
				// form表单
				xtype : 'form',
				id : 'QueryConditionForm',
				border : false,
				frame : true,
				cls : 'blue-button-ct',
				layout : 'table',
				defaults : {
					layout : 'form',
					width : 350
				},
//				layoutConfig : {
//					columns : 3
//				},
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;margin-left:-10px;',
				items : [{
					items :[{
						xtype : 'textfield',
						name : 'carNumStr',
						id : 'carNumStr',
						fieldLabel : '&nbsp;车牌号码',
						allowBlank : false,
						emptyText : "请输入车牌号码",
						blankText : "请输入标准的车牌号码",
						vtype : 'exactCarNum',
						anchor : '94%'
					}]
				},{
					items : [{
						xtype : 'textfield',
						fieldLabel : '开始时间',
						id : 'startTime',
						allowBlank : false,
	                    editable : false,
						name : 'startTime',
						//value : (new Date()).setHours((new Date()).getHours() - 1).format('Y-m-d H:i:s'),
						value : new Date().format('Y-m-d')+' 00:00:00',
						anchor : '94%',
						style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
						listeners  : {   
			            	'focus':function(field){  
								var endTime = Ext.util.Format.date(
										new Date(), 'Y-m-d H:i:s');
								var endTime = Ext.getCmp("endTime").getValue();
								//  日期时间的默认参数      
							    var defaultDateTimeParams = new function()   
							    {   
							        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
							        this.startTime  = endTime;    //  开始时间   
							        //this.maxDate = endTime;
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
						name : 'endTime',
						id : 'endTime',
						value : new Date().format('Y-m-d') + ' 23:59:59',
						anchor : '94%',
						style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center',width:100}, 
						listeners  : {   
			            	'focus':function(field){  
								var endTime = Ext.util.Format.date(
										new Date(), 'Y-m-d H:i:s');
								var startTime = Ext.getCmp("startTime").getValue();
								//  日期时间的默认参数      
							    var defaultDateTimeParams = new function()   
							    {   
							        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
							        this.startTime  = endTime;    //  开始时间   
							        this.minDate = startTime;
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
					xtype : 'compositefield',
					items : [{
						xtype : 'button',
						flex : 31,
						id : "searchBut",
						text : '&nbsp;&nbsp;&nbsp;分析&nbsp;&nbsp;&nbsp;',
						handler : this.historyQueryMethod
					}, {
						flex : 31,
						xtype : 'button',
						id : "resetBut",
						text : '&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;',
						handler : this.resetMethod
					}]
				}]
			} ]
		});
		oneNumManyCarQuery.NorthFormPanel.superclass.initComponent.apply(this);
	},
	//查询
	historyQueryMethod : function() {
		var form = Ext.getCmp('QueryConditionForm');
		if (form.getForm().isValid()) {
			var grid = Ext.getCmp('resultGridPanel');
			grid.store.baseParams = {};// 重置
			dataCount = 20 //一次性加载页面数据量
			//将参数传入后台
			var baseparams = {
				"carNumStr" : Ext.getCmp('carNumStr').getValue(),
				"startTime" : Ext.getCmp('startTime').getValue(),
				"endTime" : Ext.getCmp('endTime').getValue(),
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
	},
	resetMethod : function() {
		Ext.getCmp('QueryConditionForm').getForm().reset();
		document.getElementById("ifrm").contentWindow.hidPage();
	}
});

//GisPanel区域
oneNumManyCarQuery.GisDataPanel = Ext.extend(Ext.Panel,{
	frame:true,
    collapsible:true,
    layout:'fit',
	initComponent : function() {
		var hh = Ext.getBody().getHeight() - 48;
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
					columnWidth : 0.35,
					xtype : 'gridCenterDataPanel'
				}, {
					columnWidth : 0.65,
					id : 'gisShow',
					xtype : 'panel',
					items : [{
						html : "<iframe id='gisIframe' class='gisIframe' src='http://" + ipAdress + "/PGISViewer/PGISViewer.html' width='99.5%' height='" + hh + "' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
					}]
				}]
			}]
		});
		oneNumManyCarQuery.GisDataPanel.superclass.initComponent.apply(this);
	}
});

//所需数据
var resultStore = new Ext.data.JsonStore({
	url : rootpath + "/oneNumManyCar/queryOneNumManyCar.mvc",
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
	      {name : 'ssdq'},
	      {name : 'clzl'}]
});

//中心右区域数据
oneNumManyCarQuery.gridCenterDataPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'resultGridPanel',
	border : false,
	frame : true,
	height :  Ext.getBody().getHeight() - 48,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		Ext.apply(this,{
			store : resultStore,
			cm : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false,
				},
				columns : [
						new Ext.ux.grid.PagingRowNumberer({width : 40}),
						{
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
							header : '车牌号码',
							dataIndex : 'hphm'
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
						} ]

			}),
			bbar : new Jinpeng.widget.PagingToolbar( {
				id : 'PagingToolbar',
				store : resultStore,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			}),
			listeners : {
				/*双击查看*/
				rowdblclick : function(grid, rowIndex, e ) {
					var data = grid.store.getAt(rowIndex);
					var win = new oneNumManyCarQuery.detailWindow();
					win.recode = data;
					//将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
					win.loadId = data.get("xxbh");
					win.tx1 = data.get("tx1");
					win.show();
				},
				rowclick : function(grid, rowIndex, e) {
					var data = grid.store.getAt(rowIndex);
					var kkbh = data.get("kkbh");
					var kkmc = data.get("kkmc");
					if (kkmc != null && kkmc != '') {
						window.gisIframe.GIS_Clear();//清除选择
						window.gisIframe.GIS_ZoomTo(kkbh);
					}
				}
			}
		});
		oneNumManyCarQuery.gridCenterDataPanel.superclass.initComponent.apply(this);
	}
});

//弹出窗口历史过车详细信息
oneNumManyCarQuery.detailWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
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
					items : [{
						//图形组件
						xtype : 'pictureShowBox',
						width : 420,
						height : 460
					} ]
				}, {
					columnWidth : .55,
					layout : 'form',
					items : [{
						xtype : 'fieldset',
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
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '设备名称',
								name : 'sbmc',
								anchor : '96%'
							} ]
						}]
					},{
						xtype : 'fieldset',
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
								fieldLabel : '车牌颜色',
								name : 'hpys',
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
					    var gridStore = resultStore;
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
					    var gridStore = resultStore;
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
			}
		});
		oneNumManyCarQuery.detailWindow.superclass.initComponent.apply(this);
	},
	afterRender : function() {
		oneNumManyCarQuery.detailWindow.superclass.afterRender.call(this);
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
		var gridStore = resultStore;
		if(carnum != undefined && carnum >0 ){
			carNumber = gridStore.getAt(carnum-1).get('hphm');
		}
		if(carnum ==0){
			carNumber = gridStore.getAt(carnum).get('hphm');
		}
		var record = {};
		// 加载数据		
//		record.hphm = data.get("hphm");
		record.hphm = data.json.hphm;
		record.tx1 = data.json.tx1;
		record.xxbh = data.json.xxbh;
		record.kkbh = data.json.kkbh;
		record.dwmc = data.json.dwmc;
		record.kkmc = data.json.kkmc;
		record.sbmc = data.sbmc;
		record.fxbh = data.fxbh;
		record.fxmc = data.fxmc;
		record.jgsj = Ext.util.Format.date(new Date(Number(data.get('jgsj'))), 'Y-m-d H:i:s');
		//record.cwhphm = data.get("cwhphm");
		record.hpys = data.json.hpysmc;
		record.hpyz = window.dictionary.getValue("LicenseVerfiy",data.json.hpyz);//号牌一致，
		record.clsd = Ext.util.Format.substr(data.get("clsd")==null?'':data.get("clsd"),0,3);
		record.clxs = Ext.util.Format.substr(data.get("clxs")==null?'':data.get("clxs"),0,3);	
		//record.xszt = window.dictionary.getValue("DriverType", data.get("xszt"));//行驶状态，
		var brand = data.json.brand;
		var type = data.json.type;
		if (type != '') {
			brand += "_" + type;
			var caryear = data.json.caryear;
			if (caryear != '') {
				brand += "_" + caryear;
			}
		}
		record.clpp = brand; //车辆品牌
		record.csys = window.dictionary.getValue("CarColor", data.get("csys"));
		record.cllx = window.dictionary.getValue("CarCategory", data.json.clzl);
		record.hpzl = window.dictionary.getValue("LicPlateType", data.json.hpzl);
		//反向将数据加载到form表单中
		Ext.getCmp('detailWindowForm').getForm().setValues(record);
		record.CARIMGURL = data.json.tx1;
		this.publish('loadPictures', record);
		/*视频网暂时屏蔽车辆信息功能 */
		if(carNumber != data.json.hphm){
			Ext.Ajax.request({
				method : "POST",
				params : {
					"carNum" : data.json.hphm
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
			for ( var i = 0; i < resultStore.getCount(); i++) {
				if (this.loadId == resultStore.getAt(i).get('xxbh')) {
					k = i;
					break;
				}
		    }
		}
		if (upOrDown == false && k > 0) {
			//测试用的
			//nextId = (rownum-k)+'|'+resultStore.getAt(k-1).get('xxbh');
			//信息编号唯一的情况下使用
			nextId = (k-1)+'|'+resultStore.getAt(k-1).get('xxbh');
		}
		if (upOrDown == true
				&& k < resultStore.getCount() - 1) {			
			//nextId = (k+rownum+1)+'|'+resultStore.getAt(k+1).get('xxbh');
			nextId = (k+1)+'|'+resultStore.getAt(k+1).get('xxbh');	
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
		var count = resultStore.getCount();
		var index = 0;
		for ( var i = 0; i < count; i++) {
			if (id == resultStore.getAt(i).get('xxbh')) {
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

Ext.reg('northFormPanel', oneNumManyCarQuery.NorthFormPanel);
Ext.reg('gridCenterDataPanel', oneNumManyCarQuery.gridCenterDataPanel);
Ext.reg('gisDataPanel', oneNumManyCarQuery.GisDataPanel);