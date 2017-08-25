//设备状态运维JSExt.ns("Jinpeng.deviceOperation");
var dataCount = 0;var viewPortObj = null;var downPictureWindow = null;var hh = Ext.getBody().getHeight();var ww = Ext.getBody().getWidth();var historyTime;var freshTme = 300000;var mounts; //卡口编号字符串集Ext.onReady(function() {	var resultScript = document.getElementById("resultScript"); 	resultScript.src="http://" + ipAdress + "/PGISViewer/PGISViewer.html";//域B的链接 	Ext.useShims = true;	viewPortObj = new Ext.Viewport( {		layout : 'border',		items : [ {			//查询表单			region : 'north',			border : false,			height : 45,			xtype : 'northFormPanel'		}, {			//列表数据			region : 'center',			border : false,			xtype : 'gisDataPanel'		} ]	});});
function freshTimeData() {	var formPanel = Ext.getCmp('formPanel');	historyTime = setInterval(function() {		formPanel.historyQueryMethod();	},freshTme);}
var kwin =new Ext.Window({	id: "mywin",	title: "",	constrain : true,	constrainHeader : true,	width: ww * 2 / 3,	height: hh * 3 / 4,	layout: "fit",	closeAction:'hide',	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/Big_Data/zTree/demo/cn/excheck/multiSelectTree1.html"></iframe>'});
var setKKValue=function(data){	Ext.getCmp('kkmcs').setValue(data.text);	Ext.getCmp('kkbhs').setValue(data.id);
	Ext.getCmp('mywin').hide();};
var cancelKK=function(data){	Ext.getCmp('kkmcs').setValue("");	Ext.getCmp('kkbhs').setValue("");	Ext.getCmp('mywin').hide();};
//查询表单Jinpeng.deviceOperation.NorthFormPanel = Ext.extend(Ext.Panel,{	id : 'formPanel',
	initComponent : function() {		var _panel = this;		Ext.apply(this,{			items : [ {				// form表单				xtype : 'form',				id : 'deviceQueryForm',				border : false,				frame : true,				cls : 'blue-button-ct',				layout : 'table',				defaults : {					layout : 'form',					width : 700				},				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;margin-left:-10px;',				items : [{					items : [ {						xtype : 'compositefield',						items : [ {							flex : 0.5,							fieldLabel : '卡点',							xtype : 'tooltiptextfield',							name : 'kkmcs',							id : 'kkmcs',							width : 445,							emptyText : '请选择卡点'						}, {							flex : 0.5,							owner : this,							labelAlign : 'right',							xtype : 'button',							text : '选择卡口',							id:'choosekkBtn',							handler : function(){								kwin.show();							}						} ]					} ]				},{
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
			} ]		});
		Jinpeng.deviceOperation.NorthFormPanel.superclass.initComponent.apply(this);
	},	//查询	historyQueryMethod : function() {		var form = Ext.getCmp('deviceQueryForm');
		if (form.getForm().isValid()) {
			var grid = Ext.getCmp('operationGridPanel');
			grid.store.baseParams = {};// 重置
			dataCount = 20 //一次性加载页面数据量
			//将参数传入后台			mounts = Ext.getCmp('kkbhs').getValue();			var baseparams = {
				"mounts" : mounts,
				"flag" : "query"
			};
			grid.store.baseParams = baseparams;
			/*刷新选中*/
			this.publish("clearGridSelections",[]);			grid.store.load({				params : {					'page.start' : 0,					'page.limit' : Jinpeng.PageSize				}			});		}
	},
	resetMethod : function() {
		Ext.getCmp('deviceQueryForm').getForm().reset();
		document.getElementById("ifrm").conten		tWindow.hidPage();
	}});//GisPanel区域Jinpeng.deviceOperation.GisDataPanel = Ext.extend(Ext.Panel,{	frame:true,    collapsible:true,    layout:'fit',	initComponent : function() {		var hh = Ext.getBody().getHeight() - 48;		Ext.apply(this,{			layout : 'border',			border : false,			defaults : {				margins : '0 0 0 0'			},			items : [ {				region : 'center',				layout : 'column',				items : [{					columnWidth : 0.35,					xtype : 'gridCenterDataPanel'				}, {					columnWidth : 0.65,					id : 'gisShow',					xtype : 'panel',					items : [{						html : "<iframe id='realTimeIframe' class='realTimeIframe' src='http://" + ipAdress + "/PGISViewer/PGISViewer.html' width='99.5%' height='" + hh + "' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"					}]				}]			}]		});		Jinpeng.deviceOperation.GisDataPanel.superclass.initComponent.apply(this);	}});

//所需数据
var operationQueryStore = new Ext.data.JsonStore({
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
	      {name : 'txsl'},	      {name : 'ssdq'},	      {name : 'clzl'}]
});
//中心右区域数据
Jinpeng.deviceOperation.gridCenterDataPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'operationGridPanel',
	border : false,
	frame : true,	height :  Ext.getBody().getHeight() - 48,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		Ext.apply(this,{
			store : operationQueryStore,
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
							    var now = new Date().getTime();
							    var space = 1800000;//半个小时
							    if(now - record.data.jgsj > space){
							    	return '<font ext:qtip="'+value+'" style="color:red;">'+value+'</font>';
							    }else{
							    	return '<font ext:qtip="'+value+'" style="color:green;">'+value+'</font>';
							    }
							}
						},{
							header : '车牌号码',
							dataIndex : 'hphm',
							renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
							    var now = new Date().getTime();
							    var space = 1800000;//半个小时							    if (value == null) {							    	return '<font style="color:green;">无</font>';							    }							    if(now - record.data.jgsj > space){							    	return '<font style="color:red;">'+value+'</font>';							    }else{							    	return '<font style="color:green;">'+value+'</font>';							    }							}						},{
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
						} ]
			}),			listeners : {
				/*双击查看*/
				rowdblclick : function(grid, rowIndex, e ) {
					var data = grid.store.getAt(rowIndex);
					var win = new Jinpeng.deviceOperation.DeviceStatusDetailWindow();
					win.recode = data;
					//将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
					win.loadId = data.get("xxbh");
					win.tx1 = data.get("tx1");
					win.show();
				}
			}
		});		//数据加载完成后，组装json提交GIS服务进行响应		this.store.on("load",function(datas) {		    var count = datas.getCount();		    var record;		    var now = new Date().getTime();		    var space = 1800000;//半个小时		    var statusDatas = [];			if(datas != null){ 			    for(var i = 0;i < count;i++){			    	record = datas.data.items[i];			    	var statusJson = {};			    	var status = 0;				    if(now - record.data.jgsj > space){				    	status = 0; //离线				    }else{				    	status = 1; //在线				    }				    statusJson.kkbh = record.kkbh;				    statusJson.status = status;				    statusDatas[statusDatas.length] = statusJson;				}			    //window.realTimeIframe.GIS_Clear();//清除前面一次查询的数据			    //window.realTimeIframe.GIS_ZoomTo(statusDatas); //把在线和离线的数据传到GIS			}	    });
		Jinpeng.deviceOperation.gridCenterDataPanel.superclass.initComponent.apply(this);
	}});//弹出窗口历史过车详细信息Jinpeng.deviceOperation.DeviceStatusDetailWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
	width : 940,
	height : 550,
	closeAction : "close",
	title : '详细信息',
	border : false,
	clickFlag : false,
	loadId : '',
	recode : null,
	initComponent : function() {		Ext.apply(this, {			items : [ {				xtype : 'form',				id : 'detailWindowForm',				region : 'center',				autoScroll : true,				labelAlign : 'right',				layout : 'column',				cls : 'blue-button-ct',				items : [{					columnWidth : .45,					items : [{						//图形组件						xtype : 'pictureShowBox',						width : 420,						height : 460					} ]				}, {					columnWidth : .55,					layout : 'form',					items : [{						xtype : 'fieldset',						title : '基本信息',						layout : "table",						bodyStyle : 'padding-top : 5px;',						defaults : {							width : 250,							layout : 'form'						},						layoutConfig : {							columns : 2						},						items : [{							items : [ {								xtype : 'displayfield',								fieldLabel : '车牌号码',								id:'carNum_win',								name : 'hphm',								anchor : '96%'							} ]						}, /*{							items : [ {								xtype : 'displayfield',								fieldLabel : '行驶状态',								name : 'xszt',								anchor : '96%'							} ]						}, */{							items : [ {								xtype : 'displayfield',								fieldLabel : '单位名称',								name : 'dwmc',								anchor : '96%'							} ]						}, {							items : [ {								xtype : 'displayfield',								fieldLabel : '卡口名称',								name : 'kkmc',								anchor : '96%'							} ]						}, {							items : [ {								xtype : 'displayfield',								fieldLabel : '方向名称',								name : 'fxmc',								anchor : '96%'							} ]						}, {							items : [ {								xtype : 'displayfield',								fieldLabel : '卡口编号',								name : 'kkbh',								anchor : '96%'							} ]						}, {							items : [ {								xtype : 'displayfield',								fieldLabel : '方向编号',								name : 'fxbh',								anchor : '96%'							} ]						}, {							items : [ {								xtype : 'displayfield',								fieldLabel : '设备名称',								name : 'sbmc',								anchor : '96%'							} ]						}]					},{						xtype : 'fieldset',						title : '车辆信息',						layout : "table",						bodyStyle : 'padding-top : 5px;',						defaults : {							width : 250,							layout : 'form'						},						layoutConfig : {							columns : 2						},						items : [{							items : [ {								xtype : 'displayfield',								fieldLabel : '车辆速度(km/h)',								name : 'clsd',								anchor : '96%'							} ]						}, {							items : [ {								xtype : 'displayfield',								fieldLabel : '车辆限速(km/h)',								name : 'clxs',								anchor : '96%'							} ]						}/*, {							items : [ {								xtype : 'displayfield',								fieldLabel : '车身长度(cm)',								name : 'cscd',								anchor : '96%'							} ]						}*/, {							items : [ {								xtype : 'displayfield',								fieldLabel : '车牌颜色',								name : 'hpys',								anchor : '96%'							} ]						}/*, {							items : [ {								xtype : 'displayfield',								fieldLabel : '违法状态',								name : 'wfzt',								anchor : '96%'							} ]						}*/, {							items : [ {								xtype : 'displayfield',								fieldLabel : '车辆品牌',								name : 'clpp',								anchor : '96%'							} ]						}/*, {							items : [ {								xtype : 'displayfield',								fieldLabel : '车辆外形',								name : 'clwx',								anchor : '96%'							} ]						}*/, {							items : [ {								xtype : 'displayfield',								fieldLabel : '车身颜色',								name : 'csys',								anchor : '96%'							} ]						}, {							items : [ {								xtype : 'displayfield',								fieldLabel : '车辆类型',								name : 'cllx',								anchor : '96%'							} ]						}, {							items : [ {								xtype : 'displayfield',								fieldLabel : '号牌种类',								name : 'hpzl',								anchor : '96%'							} ]						},{							items : [ {								xtype : 'hidden',								name : 'xxbh',								id:'xxbh',								anchor : '96%'							} ]						},{							items : [ {								xtype : 'hidden',								name : 'tx1',								id:'tx1',								anchor : '96%'							} ]						}]					},{						xtype : 'fieldset',						title : '车主信息',						layout : "table",						bodyStyle : 'padding-top : 5px;',						defaults : {							width : 250,							layout : 'form'						},						layoutConfig : {							columns : 2						},						items : [{							items : [ {								xtype : 'displayfield',								fieldLabel : '车主姓名',								name : 'JDCSYR',								anchor : '96%'							} ]						}, {							items : [ {								xtype : 'displayfield',								fieldLabel : '联系方式',								name : 'LXFS',								anchor : '96%'							} ]						}, {							items : [ {								xtype : 'displayfield',								fieldLabel : '身份证号',								name : 'SFZH',								anchor : '96%'							} ]						}, {							items : [ {								xtype : 'displayfield',								fieldLabel : '详细地址',								name : 'DJZZXZ',								anchor : '96%'							} ]						}]					}]				} ]			} ],			bbar : {				cls : 'blue-button-ct',				buttonAlign : 'center',				buttons : [{					xtype : 'button',	          	  	text : "上一条",					scope : this,					id : 'prevButton',					hidden : false,					handler : function() {						// 调用方法获取下一条记录id						var id = this.getDetailRecordId(this.loadId, false);												var idNum = id.substring(0,id.indexOf('|'));					    var idXxbh = id.substring((id.indexOf('|')+1));					    var gridStore = operationQueryStore;						//获取选中的的行数-1						var data = gridStore.getAt(idNum);						// 如果不为空，则进行数据加载						if (data!= null) {							this.loadRecordById(data,idNum);							//同步"上一条","下一条"按钮状态.							this.synchronUpOrDown(idXxbh);						}					}				},{	          		  xtype : 'tbspacer',	          		  width : 10	      	  	},{	      	  		xtype : 'button',	          	  	text : "下一条",					scope : this,					id : 'nextButton',					hidden : false,					handler : function() {						// 调用方法获取下一条记录id						var id = this.getDetailRecordId(this.loadId, true);						//对值的截取操作						var idNum = id.substring(0,id.indexOf('|'));					    var idXxbh = id.substring((id.indexOf('|')+1));					    var gridStore = operationQueryStore;						//获取选中的的行数+1						var data = gridStore.getAt(idNum);												// 如果不为空，则进行数据加载						if (data != null) {							this.loadRecordById(data,idNum);							//同步"上一条","下一条"按钮状态.							this.synchronUpOrDown(idXxbh);						}					}				},{	          		  xtype : 'tbspacer',	          		  width : 10	      	  	},{	      	  		xtype : 'button',					text : '下载图片',					id : 'picdownloadbtn',					handler : function() {						//获取当前记录的id						var id = Ext.getCmp('xxbh').getValue();						var httpUrl = Ext.getCmp('tx1').getValue();						var carNum = Ext.getCmp('carNum_win').getValue();						if (showFlag == 'grid') {							//根据Id下载图片							linkDownloadPicture(id,httpUrl,carNum);						} else {							//根据Id下载图片							pigDownloadPicture(id,httpUrl,carNum);						}					}				},{	          		  xtype : 'tbspacer',	          		  width : 10	      	  	},{	      	  		xtype : 'button',					text : '&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;',					scope : this,					handler : this.close				} ]			}		});		Jinpeng.deviceOperation.DeviceStatusDetailWindow.superclass.initComponent.apply(this);	},	afterRender : function() {
		Jinpeng.deviceOperation.DeviceStatusDetailWindow.superclass.afterRender.call(this);		//根据点击记录时设置的记录ID加载数据		this.loadRecordById(this.recode);		var xxbh = this.recode.get('xxbh');		//同步"上一条","下一条"按钮状态.		this.synchronUpOrDown(xxbh);	},
	/**
	 * 根据ID，detailRegStore加载该条记录的信息。
	 * @param xxbh 信息编号
	 */
	loadRecordById : function(data,carnum) {		var carNumber ;		var gridStore = operationQueryStore;		if(carnum != undefined && carnum >0 ){			carNumber = gridStore.getAt(carnum-1).get('hphm');		}		if(carnum ==0){			carNumber = gridStore.getAt(carnum).get('hphm');		}		var record = {};		// 加载数据				record.hphm = data.get("hphm");		record.tx1 = data.get("tx1");		record.xxbh = data.get("xxbh");		record.kkbh = data.get("kkbh");		record.dwmc = data.get("dwmc");		record.kkmc = data.get("kkmc");		record.sbmc = data.get("sbmc");		record.fxbh = data.get("fxbh");		record.fxmc = data.get("fxmc");		//record.cwhphm = data.get("cwhphm");		record.hpys = data.get("hpysmc");		record.hpyz = window.dictionary.getValue("LicenseVerfiy",data.get("hpyz"));//号牌一致，		record.clsd = Ext.util.Format.substr(data.get("clsd"),0,3);		record.clxs = Ext.util.Format.substr(data.get("clxs"),0,3);			//record.xszt = window.dictionary.getValue("DriverType", data.get("xszt"));//行驶状态，		var brand = data.get("brand");		var type = data.get("type");		if (type != '') {			brand += "_" + type;			var caryear = data.get("caryear");			if (caryear != '') {				brand += "_" + caryear;			}		}		record.clpp = brand; //车辆品牌		record.csys = window.dictionary.getValue("LicPlateColor", data.get("csys"));		record.cllx = window.dictionary.getValue("CarCategory", data.get("clzl"));		record.hpzl = window.dictionary.getValue("LicPlateType", data.get("hpzl"));		//反向将数据加载到form表单中		Ext.getCmp('detailWindowForm').getForm().setValues(record);		record.CARIMGURL = data.get("tx1");		this.publish('loadPictures', record);		/*视频网暂时屏蔽车辆信息功能 */		if(carNumber != data.get("hphm")){			Ext.Ajax.request({				method : "POST",				params : {					"carNum" : data.get("hphm")				},				url : rootpath + "/car/query/historyCarDetail.mvc",				success : function(response, options) {					var txt = response.responseJSON.data;					if (txt.length == 0) {						Ext.getCmp('detailWindowForm').getForm().findField('JDCSYR').setValue('加载失败');						Ext.getCmp('detailWindowForm').getForm().findField('SFZH').setValue('加载失败');						Ext.getCmp('detailWindowForm').getForm().findField('LXFS').setValue('加载失败');						Ext.getCmp('detailWindowForm').getForm().findField('DJZZXZ').setValue('加载失败');					} else {						Ext.getCmp('detailWindowForm').getForm().findField('JDCSYR').setValue(txt[0].JDCSYR);						Ext.getCmp('detailWindowForm').getForm().findField('LXFS').setValue(txt[0].LXFS);						Ext.getCmp('detailWindowForm').getForm().findField('SFZH').setValue(txt[0].SFZH);						Ext.getCmp('detailWindowForm').getForm().findField('DJZZXZ').setValue(txt[0].DJZZXZ);					}				},				failure : function(response, options) {					Ext.getCmp('detailWindowForm').getForm().findField('JDCSYR').setValue('加载失败');					Ext.getCmp('detailWindowForm').getForm().findField('SFZH').setValue('加载失败');					Ext.getCmp('detailWindowForm').getForm().findField('LXFS').setValue('加载失败');					Ext.getCmp('detailWindowForm').getForm().findField('DJZZXZ').setValue('加载失败');				},				scope : this			});		};	},
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
			for ( var i = 0; i < operationQueryStore.getCount(); i++) {
				if (this.loadId == operationQueryStore.getAt(i).get('xxbh')) {
					k = i;
					break;
				}
		    }
		}
		if (upOrDown == false && k > 0) {
			//测试用的
			//nextId = (rownum-k)+'|'+operationQueryStore.getAt(k-1).get('xxbh');
			//信息编号唯一的情况下使用
			nextId = (k-1)+'|'+operationQueryStore.getAt(k-1).get('xxbh');
		}
		if (upOrDown == true
				&& k < operationQueryStore.getCount() - 1) {			
			//nextId = (k+rownum+1)+'|'+operationQueryStore.getAt(k+1).get('xxbh');
			nextId = (k+1)+'|'+operationQueryStore.getAt(k+1).get('xxbh');	
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
		var count = operationQueryStore.getCount();
		var index = 0;
		for ( var i = 0; i < count; i++) {
			if (id == operationQueryStore.getAt(i).get('xxbh')) {
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
});Ext.reg('northFormPanel', Jinpeng.deviceOperation.NorthFormPanel);Ext.reg('gridCenterDataPanel', Jinpeng.deviceOperation.gridCenterDataPanel);Ext.reg('gisDataPanel', Jinpeng.deviceOperation.GisDataPanel);