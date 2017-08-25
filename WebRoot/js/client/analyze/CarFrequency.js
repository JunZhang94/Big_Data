Ext.ns('Jinpeng.carFrequency');

/**
 * center区域部份
 */
Jinpeng.carFrequency.CarFrequencyFormPanel = Ext.extend(Ext.Panel,{
	mainParam : null,
	initComponent : function() {
		Ext.apply(	this,{
			layout : 'border',
			border : false,
			defaults : {
				margins : '0 0 0 0'
			},
			items : [ {
				region : 'center',
				margins:'10 0 0 0',
				xtype : 'carFrequenGridPanel',
				ref : "../grid"
			}]
		});
		Jinpeng.carFrequency.CarFrequencyFormPanel.superclass.initComponent.apply(this);
	},
	afterRender : function(ct, position) {
		Jinpeng.carFrequency.CarFrequencyFormPanel.superclass.afterRender.apply(this, arguments);
	},
	init : function(data) {
		this.mainParam = data;
	}
});

/**
 * 列表数据Store
 */
var carFrequenInfoStore = new Ext.data.JsonStore({
	url : rootpath + "/car/carFrequencyDetail.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	remoteSort : false,
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
      {name : 'txsl'}
   ]
});

/**
 * 中心右区域数据显示中心
 */ 
Jinpeng.carFrequency.CarFrequencyGridPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'carFrequenRecordGridPanel',
	frame : false,
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var _panel = this;
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this,{
			store : carFrequenInfoStore,
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
					header : '单位名称',
					width : 180,
					dataIndex : 'dwmc'
				},
				{
					header : '经过时间',
					width : 180,
					dataIndex : 'jgsj',
			        renderer: function (val) {
			        	if (val) {
			        		return Ext.util.Format.date(new Date(Number(val)), 'Y-m-d H:i:s');
			        	}
			        	return "";
			        }
				}],
				selModel : sm,
				listeners : {
					afterrender : function() {
						_panel.store.data.length = 0;
						var conditions = _panel.ownerCt.get(0).ownerCt.mainParam;
						//页面初始数据需要按当前查询条件
						carFrequenInfoStore.baseParams["carNum"] = conditions.carNum;
						carFrequenInfoStore.baseParams["mounts"] = conditions.kkbhs;
						carFrequenInfoStore.baseParams["startTime"] = conditions.startTime;
						carFrequenInfoStore.baseParams["endTime"] = conditions.endTime;
						carFrequenInfoStore.baseParams["flag"] = 'query';
						carFrequenInfoStore.load({
							params : {
								'page.start' : 0,
								'page.limit' : conditions.counts
							}
						});
					},
					/*双击查看*/
					rowdblclick : function(grid, rowIndex, e ) {
						var data = grid.store.getAt(rowIndex);
						var win = new Jinpeng.carFrequency.carFilterWindow();
						win.recode = data;
						win.loadId = data.get("xxbh");// 唯一序列号
						win.show();
					}
				}
			}
		);
		Jinpeng.carFrequency.CarFrequencyGridPanel.superclass.initComponent.apply(this);
	}
});

//弹出窗口历史过车详细信息
Jinpeng.carFrequency.carFilterWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
	width : 950,
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
				layout : 'column',
				cls : 'blue-button-ct',
				items : [{
					columnWidth : .45,
					items : [{
						xtype : 'pictureShowBox',
						width : 420,
						height : 420
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
									fieldLabel : '卡口编号',
									name : 'kkbh',
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
									fieldLabel : '方向编号',
									name : 'fxbh',
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
						var data = carFrequenInfoStore.getAt(idNum);
						// 如果不为空，则进行数据加载
						if (data!= null) {
								this.loadRecordById(data);
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
						var data = carFrequenInfoStore.getAt(idNum);
						
						// 如果不为空，则进行数据加载
						if (data != null) {
								this.loadRecordById(data);
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
						var id = Ext.getCmp('xxbh').getValue()+'|'+Ext.getCmp('carNum').getValue();
						var httpUrl = Ext.getCmp('tx1').getValue();
						//根据Id下载图片
						DownloadPicture(id,httpUrl);
					}
				}, {
          	  		xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;',
					scope : this,
					handler : this.close
				} ]
			}
		});
		Jinpeng.carFrequency.carFilterWindow .superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Jinpeng.carFrequency.carFilterWindow .superclass.afterRender.call(this);
		//根据点击记录时设置的记录ID加载数据
		this.loadRecordById(this.recode);
		var xxbh = this.recode.get("xxbh");
		//同步"上一条","下一条"按钮状态.
		this.synchronUpOrDown(xxbh);
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
				for ( var i = 0; i < carFrequenInfoStore.getCount(); i++) {
					if (this.loadId == carFrequenInfoStore.getAt(i).get('xxbh')) {
						k = i;
						break;
					}
				}
			}
			if (upOrDown == false && k > 0) {
				nextId = (k-1)+"|"+carFrequenInfoStore.getAt(k - 1).get('xxbh');
			}
			if (upOrDown == true
					&& k < carFrequenInfoStore.getCount() - 1) {
				nextId = (k+1)+"|"+carFrequenInfoStore.getAt(k + 1).get('xxbh');
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
			var count = carFrequenInfoStore.getCount();
			var index = 0;
			for ( var i = 0; i < count; i++) {
				if (id == carFrequenInfoStore.getAt(i).get('xxbh')) {
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
//	 carFrequenInfoStore.load({
//		params : {'id' : id},
//		scope : this,
//		callback : function(records, options, success) {
			var record = {};
			// 加载数据		
			record.hphm = data.get("hphm");
			record.tx1 = data.get("tx1");
			record.xxbh = data.get("xxbh");
			record.kkbh = data.get("kkbh");
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
	    }
//		});
//	 }
 });

/**
 * @class Jinpeng.carFrequency.CarFrequencyChooseWindow
 * @extends Ext.Viewport
 * @author Teon
 * 选择车牌号码窗口
 * @constructor 创建一个CarFrequencyChooseWindow
 * @param {Object} [config] 配置信息
 */
Jinpeng.carFrequency.CarFrequencyWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	/**
	 * @cfg {String} [title=选择账号] 标题
	 */
	title : '车牌号码筛选',
	/**
	 * @cfg {Number} [width=400] 宽度
	 */
	width : 850,
	/**
	 * @cfg {Number} [height=450] 高度
	 */
	height : 500,
	/**
	 * @cfg {String} [layout=border] 布局
	 */
	layout : 'border',
	/**
	 * @cfg {Function} [callback] 窗口关闭的回调函数，参数如下
	 * <div class="mdetail-params">
	 * <ul>
	 * <li><code>result</code> : Object <div class="sub-desc">选中的记录</div></li>
	 * </ul>
	 * </div>
	 */
	mainParam : null,
	
	bbar : {
		cls : 'blue-button-ct',
		buttonAlign : 'center',
		buttons : [ {
		text : '&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;',
		xtype : 'button',
		handler : function(btn, event) {
			btn.ownerCt.ownerCt.closeWindow(false);
		}
	} ]
	},
	
	constructor : function(config) {
		var window = this;
		Ext.apply(this, config);
		this.items = [ this.chooser = new Jinpeng.carFrequency.CarFrequencyFormPanel({
			margins : '5',
			region : 'center'
		}) ];
		Jinpeng.carFrequency.CarFrequencyWindow.superclass.constructor.apply(this, arguments);
	},
	/**
	 * 初始化数据
	 */
	init : function(data) {
		this.chooser.init(data);
	},
	/**
	 * 关闭窗口，并执行回调函数
	 */
	closeWindow : function(returnValue) {
		if (typeof this.callback == 'function') {
			this.callback({
				data : returnValue
			});
		}
		this.close();
	}
});

//下载图片方法
function DownloadPicture(id,httpUrl){
	// 得到选中的ids
	var ids = [];
    var url = [];
    var hurl= httpUrl;
    if(hurl!=undefined){		
      url[url.length] =httpUrl;	
    }else if(hurl==undefined){
    	var records = Ext.getCmp('carFrequenRecordGridPanel').getSelectionModel().getSelections();
		if(records != ""){
			for ( var i = 0; i < records.length; i++) {
				url[url.length] = records[i].get('tx1');
			}
		}
    }
	if(id) {
		ids[ids.length] = id.substring(0,id.lastIndexOf('|'));
	} else {
		var records = Ext.getCmp('carFrequenRecordGridPanel').getSelectionModel().getSelections();
		if (records != "") {
			for ( var i = 0; i < records.length; i++) {
				ids[ids.length] = records[i].get('xxbh');
			}
		}
	}
	var idString = ids ? ids.join(',') : '';
	var httpUrlString = url ? url.join(',') : '';
	//号牌
	var carNumber = id.substring((id.lastIndexOf('|')+1));
	if(idString!='' &&　httpUrlString != ''){
		Ext.Ajax.request({
				// 将id组合成字符串传递到后台
				url : rootpath+'/car/loadCarQueryAnalyzeImgUrlByIds.mvc',
				method : 'POST',
				params : {'idstr': idString,'url':httpUrlString,'carNum':carNumber},
				success : function(resp, opts) {
					var txt = Ext.util.JSON.decode(resp.responseText);
					if(txt){
						window.open (txt,'_black');
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
Ext.reg('carFrequenGridPanel',Jinpeng.carFrequency.CarFrequencyGridPanel);
