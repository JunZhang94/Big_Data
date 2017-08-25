Ext.ns('Jinpeng.trackSearch');

/**
 * center区域部份
 */
Jinpeng.trackSearch.TrackSeachFormPanel = Ext.extend(Ext.Panel,{
	//title : '车牌号码：',
	id : 'trackSeachFormPanel',
	mainParam : null,
	initComponent : function() {
		var carNum = this.mainParam.carNum;
		var startDate = this.mainParam.startTime;
		var endDate = this.mainParam.endTime;
		Ext.apply(	this,{
			layout : 'border',
			border : false,
			defaults : {
				margins : '0 0 0 0'
			},
			items : [ {
				region : 'center',
				layout : 'column',
				items : [{
					columnWidth : 0.4,
					xtype : 'trackSearchGridPanel'
				}, {
					columnWidth : 0.6,
					id : 'gisInfo',
					xtype : 'panel',
					items : [{
						html: "<iframe id='carTrackIframe' src='http://" + ipAdress + "/PGISViewer/SimplePGISViewer.html?carNum=" + carNum + "&startDate=" + startDate + "&endDate=" + endDate + "' width='100%' height='521' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
					}]
				}]
			}]
		});
		Jinpeng.trackSearch.TrackSeachFormPanel.superclass.initComponent.apply(this);
	},
	afterRender : function(ct, position) {
		Jinpeng.trackSearch.TrackSeachFormPanel.superclass.afterRender.apply(this, arguments);
	},
	init : function(data) {
		//this.title = '车牌号码：' + this.mainParam.carNum;
		this.mainParam = data;
	}
});

/**
 * 列表数据Store
 */
var trackSearchInfoStore = new Ext.data.JsonStore({
	url : rootpath + "/car/carFrequencyDetail.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	remoteSort : false,
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
      {name : 'clzl'}]
});

/**
 * 中心右区域数据显示中心
 */ 
Jinpeng.trackSearch.TrackSeachGridPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'trackSearchRecordGridPanel',
	frame : false,
	border : false,
	height : 521,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var _panel = this;
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this,{
			store : trackSearchInfoStore,
			columns : [
				new Ext.ux.grid.PagingRowNumberer({ width : 40}),
				{
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
				}],
				selModel : sm,
				items:[ 
				{
	                 xtype: 'radiogroup',
	                 id: 'job',
	                 columns: 3, 
	       	 		 vertical: true,
	                 items: [
	                     { boxLabel: '默认', name: 'time', inputValue: 'default', checked: true },
	                     { boxLabel: '一天', name: 'time', inputValue: 'oneday'},
	                     { boxLabel: '三天', name: 'time', inputValue: 'threeday'}
	                 ],
		             listeners:{ 
		             	 //通过change触发 
			             change: function(g , newValue ){ 
			            	 var key = 'inputValue';
			            	 if(newValue[key] == 'default'){
			            	 	_panel.defaultSearch();
			            	 }
			            	  else if(newValue[key] == 'oneday'){
			            	  //	alert("one day");
			            	 	_panel.oneDaySearch();
			            	 }
			            	 else if(newValue[key] == 'threeday'){
			            	 	_panel.threeDaySearch();
			            	 }
			            }
	 				}
 				}],
				listeners : {
					afterrender : function() {
						_panel.store.data.length = 0;
						var form = Ext.getCmp('trackSeachFormPanel');
						var conditions = form.mainParam;
						//页面初始数据需要按当前查询条件
						trackSearchInfoStore.baseParams["carNum"] = conditions.carNum;
						trackSearchInfoStore.baseParams["mounts"] = conditions.kkbhs;
						trackSearchInfoStore.baseParams["startTime"] = conditions.startTime;
						trackSearchInfoStore.baseParams["endTime"] = conditions.endTime;
						trackSearchInfoStore.baseParams["flag"] = 'query';
						trackSearchInfoStore.load({
							params : {
								'page.start' : 0,
								'page.limit' : conditions.counts
							}
						});
					},
					rowclick : function(grid, rowIndex, e) {
						var data = grid.store.getAt(rowIndex);
						var kkbh = data.get("kkbh");
						var kkmc = data.get("kkmc");
						if (kkmc != null && kkmc != '') {
							//window.carTrackIframe.GIS_ZoomTo(kkbh);
						}
						Ext.getCmp('gisShow').focus();
					}
				}
			}
		);
		Jinpeng.trackSearch.TrackSeachGridPanel.superclass.initComponent.apply(this);
	},
	defaultSearch : function() {
		var form = Ext.getCmp('trackSeachFormPanel');
		var conditions = form.mainParam;
		trackSearchInfoStore.baseParams["startTime"] = conditions.startTime;
		trackSearchInfoStore.baseParams["endTime"] = conditions.endTime;
		trackSearchInfoStore.load({
			params : {
				'page.start' : 0,
				'page.limit' : 500
			}
		});
		var carNum = conditions.carNum;
		var oldDateStr = conditions.startTime;
		var nowDateStr = conditions.endTime;
		var gisPage = Ext.getCmp('gisInfo');
		var url = "<iframe id='carTrackIframe' src='http://" + ipAdress + "/PGISViewer/SimplePGISViewer.html?carNum=" + carNum + "&startDate=" + oldDateStr + "&endDate=" + nowDateStr + "' width='100%' height='521' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
		gisPage.body.update(url);
	},
	oneDaySearch : function() {
		var nowDate = new Date();
		var nowDateStr = Ext.util.Format.date(nowDate, 'Y-m-d H:i:s');
		trackSearchInfoStore.baseParams["endTime"] = nowDateStr;
		nowDate.setDate(nowDate.getDate()-1);
		var oldDateStr = Ext.util.Format.date(nowDate, 'Y-m-d H:i:s');
		trackSearchInfoStore.baseParams["startTime"] = oldDateStr;
		trackSearchInfoStore.load({
			params : {
				'page.start' : 0,
				'page.limit' : 500
			}
		});
		var form = Ext.getCmp('trackSeachFormPanel');
		var conditions = form.mainParam;
		var carNum = conditions.carNum;
		var gisPage = Ext.getCmp('gisInfo');
		var url = "<iframe id='carTrackIframe' src='http://" + ipAdress + "/PGISViewer/SimplePGISViewer.html?carNum=" + carNum + "&startDate=" + oldDateStr + "&endDate=" + nowDateStr + "' width='100%' height='521' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
		gisPage.body.update(url);
	},
	threeDaySearch : function() {
		var nowDate = new Date();
		var nowDateStr = Ext.util.Format.date(nowDate, 'Y-m-d H:i:s');
		trackSearchInfoStore.baseParams["endTime"] = nowDateStr;
		nowDate.setDate(nowDate.getDate() - 2);
		var oldDateStr = Ext.util.Format.date(nowDate, 'Y-m-d H:i:s');
		trackSearchInfoStore.baseParams["startTime"] = oldDateStr;
		trackSearchInfoStore.load({
			params : {
				'page.start' : 0,
				'page.limit' : 500
			}
		});
		var form = Ext.getCmp('trackSeachFormPanel');
		var conditions = form.mainParam;
		var carNum = conditions.carNum;
		var gisPage = Ext.getCmp('gisInfo');
		var url = "<iframe id='carTrackIframe' src='http://" + ipAdress + "/PGISViewer/SimplePGISViewer.html?carNum=" + carNum + "&startDate=" + oldDateStr + "&endDate=" + nowDateStr + "' width='100%' height='521' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
		gisPage.body.update(url);
	}
});

/**
 * @class Jinpeng.trackSearch.TrackSeachChooseWindow
 * @extends Ext.Viewport
 * @author Teon
 * 选择车牌号码窗口
 * @constructor 创建一个TrackSeachChooseWindow
 * @param {Object} [config] 配置信息
 */
Jinpeng.trackSearch.TrackSeachWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	/**
	 * @cfg {String} [title=选择账号] 标题
	 */
	title : '车牌号码筛选',
	/**
	 * @cfg {Number} [width=400] 宽度
	 */
	width : 1200,
	/**
	 * @cfg {Number} [height=450] 高度
	 */
	height : 600,
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
		this.items = [ this.chooser = new Jinpeng.trackSearch.TrackSeachFormPanel({
			margins : '5',
			region : 'center',
			mainParam : this.mainParam
		}) ];
		Jinpeng.trackSearch.TrackSeachWindow.superclass.constructor.apply(this, arguments);
	},
	/**
	 * 初始化数据
	 */
	init : function(data) {
		var hphmStr=this.mainParam.carNum;
		var hphm=hphmStr.split(";")[0];
		this.title = '车牌号码：' + hphm;
		this.chooser.init(data);
	},
	/**
	 * 关闭窗口，并执行回调函数
	 */
	closeWindow : function(returnValue) {
		/*if (typeof this.callback == 'function') {
			this.callback({
				data : returnValue
			});
		}*/
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
    	var records = Ext.getCmp('trackSearchRecordGridPanel').getSelectionModel().getSelections();
		if(records != ""){
			for ( var i = 0; i < records.length; i++) {
				url[url.length] = records[i].get('tx1');
			}
		}
    }
	if(id) {
		ids[ids.length] = id.substring(0,id.lastIndexOf('|'));
	} else {
		var records = Ext.getCmp('trackSearchRecordGridPanel').getSelectionModel().getSelections();
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
Ext.reg('trackSearchGridPanel',Jinpeng.trackSearch.TrackSeachGridPanel);
