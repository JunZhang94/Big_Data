/*=======================主框架页面=====================*/
/*=======================author: hoojo===========================*/
Ext.ns("Ext.jp.tic.main");
var cookie = new Ext.state.CookieProvider();  
Ext.state.Manager.setProvider(cookie);  
cookie.set('destop-navs',flags);
cookie.set('search-navs',flags1);
cookie.set('help-navs',flags2);
cookie.set('judged-navs',flags3);
cookie.set('control-navs',flags4);
//cookie.set('flags5',flags5);
cookie.set('kkdevice-navs',flags6);
cookie.set('datacenter-navs',flags7);
cookie.set('system-manager-navs',flags8);
cookie.set('platform-monitor-navs',flags9);

var flags;
var flags1;
var flags2;
var flags3;
var flags4;
//var flags5;
var flags6;
var flags7;
var flags8;
var flags9;
Ext.jp.tic.main.MainViewport = Ext.extend(Ext.Viewport, {
	constructor: function() {
		var itemPanel;
		if (panelFlag == 'panel') {
			itemPanel = new Ext.jp.tic.main.ScrollPanel();
		} else if (panelFlag == 'portal') {
			itemPanel = new Ext.jp.tic.main.PortalPanel();
		} else {
			itemPanel = new Ext.jp.tic.main.FullTextSearchPanel();
		}
		Ext.jp.tic.main.MainViewport.superclass.constructor.call(this, {
			layout: "border",
			//hideBorders: true, 
			//cmargins: "5 5 5 5",
		    items: [{
		        region: "north",
		        height: 58,
		        baseCls: "plain",
		        contentEl: "north"
		    }, {
		        region: "west",
		        width: 200,
		        minSize: 175,
		        maxSize: 300,
		        layout: "fit",
        		animate: true,//动画效果
		        collapsible: true,//是否收缩关闭
		        autoScroll: false,
		        expanded:true,
		        animCollapse: true,//关闭是否带有动画
        		collapsible: true,
    			split: true,
		        margins: "2 0 5 5",
		        items: {
		        	xtype: "tabpanel",
		        	border: false,
           			activeTab: 0,
           			tabPosition: "bottom",
           			hideBorders: true, 
           			width: 150,
		        	items: [{
			        	title: "系统菜单",
			        	layout: "accordion",
			        	hideBorders: true, 
	                    layoutConfig: {
	                        animate: true
	                    },
	                    items: [{
	                        title: "车辆查询",
	                        iconCls: "nav",
	                        contentEl: "search-nav",
	                        hidden:flags1,
	                        collapsed:flags1
	                    },{
	                        title: "布控告警",
	                        iconCls: "nav",
	                        contentEl: "control-nav",
	                        hidden:flags4,
	                        collapsed:flags4
	                    }, {
	                        title: "分析研判",
	                        iconCls: "nav",
	                        contentEl: "judged-nav",
	                        hidden:flags3,
	                        collapsed:flags3
	                    }/*, {
	                        title: "卡口信息备案",
	                        iconCls: "nav",
	                        contentEl: "register-nav",
	                        hidden:flags5
	                    }*/, {
	                        title: "卡口设备管理",
	                        iconCls: "nav",
	                        contentEl: "kkdevice-nav",
	                        hidden:flags6,
	                        collapsed:flags6
	                    }, {
	                        title: "数据中心",
	                        iconCls: "nav",
	                        contentEl: "datacenter-nav",
	                        hidden:flags7,
	                        collapsed:flags7
	                    }, {
	                        title: "系统管理",
	                        iconCls: "nav",
	                        contentEl: "system-manager-nav",
	                        hidden:flags8,
	                        collapsed:flags8
	                    }, {
	                        title: "平台监控管理",
	                        iconCls: "nav",
	                        contentEl: "platform-monitor-nav",
	                        hidden:flags9,
	                        collapsed:flags9
	                    }]
		        	}, {
			        	title: "我的工作台",
			        	layout: "accordion",
			        	hideBorders: true, 
                        hidden:flags,
	                    layoutConfig: {
	                        animate: true
	                    },
	                    items: [{
	                        title: "我的工作台",
	                        iconCls: "nav",
	                        contentEl: "destop-nav",
	                        hidden:flags
	                    }]
		        	}, {
			        	title: "关于",
			        	layout: "accordion",
			        	hideBorders: true, 
	                    layoutConfig: {
	                        animate: true
	                    },
	                    items: [{
	                        title: "帮助",
	                        iconCls: "nav",
	                        contentEl: "help-nav",
	                        hidden:flags2
	                    }]
		        	}]
		        }
		    }, {
		        region: "center",
		        xtype: "tabpanel",
		        id: "main_tab_panel",
		        margins: "2 5 5 0",
		        activeTab: 0,
		        tabWidth: 140,
		        minTabWidth: 120,
		        resizeTabs: true,
		        animScroll: true,
		        enableTabScroll: true,//当tab卡过多时，自动出现滚动按钮
		        defaults: {closable: true},
		        plugins: new Ext.ux.TabCloseMenu (),
		        items: [{
		        	id: "firstTab",
		        	iconCls: "homeIcon",
		            title: "首页",
		            closable: false,
		            minTabWidth: 100,
		            layout: "fit",
		            items: [itemPanel]
		        }],
		        listeners : {
		        	afterrender : function( field ) {
		        		var view = field.ownerCt;
			        	var domHtml = view.createStopHtml();
			    		//Ext.DomHelper.insertAfter(field.edge, domHtml, true);
			    		//Ext.jp.tic.main.MainViewport.superclass.afterRender.apply(this, arguments);
		        	}
		        }
		    }]
		});
		//Ext.jp.tic.main.MainViewport.superclass.afterRender.apply(this, arguments);
	},
	createStopHtml : function() {
		var data = [];
		data.push('<div class="refresh_right" style="float: right;">');
		data.push('	 <div class="alarm_box" id="stopAndStartRefresh">');
		data.push('		<span class="alarm"><a id="stopRefresh" href="#"><font color="red" style="font-weight:bold">退出</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div id="stopImage"></div></a></span>');
		data.push('	 </div>');
		data.push('</div>');
		return data.join("");
	},
	getTabPanel: function () {
		//return this.items.getAt(3);
		return Ext.getCmp("main_tab_panel");
	},
	onAddTabItem: function (tabId, title, icon, url, type) {
		var tabItem = Ext.getCmp(tabId);
		if (!tabItem) {
		
			tabItem = {
				id: tabId,
				title: title,
				iconCls: icon,
				layout: "fit",
				autoWidth: true,
				autoScroll: true
			};
			
			if (type == "iframe") {
				Ext.apply(tabItem, {
					html: "<iframe src='" + url +"' width='100%' height='100%' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
				});
			} else if (type == "html") {
				Ext.apply(tabItem, {
					autoLoad: url
				});
			} else if (type == "script") {
				Ext.apply(tabItem, {
					loader: {
	                    url: url,
	                    contentType: 'html',
	                    loadMask: true,
	                    scripts: true
	                }
				});
			} else if (type == "xtype") {
				Ext.apply(tabItem, {
					items: {
						xtype: url
					}
				});
			} else if (type == "class") {
				Ext.apply(tabItem, {
					//items: Ext.create(url)
				});
			} else {
				Ext.apply(tabItem, {
					autoLoad: url
				});
			}
			this.getTabPanel().add(tabItem).show();
		} else {
			tabItem.show();
		}
	}
});

Ext.jp.tic.main.FullTextSearchPanel = Ext.extend(Ext.Panel,{
	id : "mountScrookllPanel",
	initComponent : function() {
		var h = Ext.getBody().getHeight();
		var w = Ext.getBody().getWidth();
		var height = h - 115;
		var width = w - 220;
		var config = {
			items : [ {
				region:'center',
                items: [{
                    id : 'mountPanel',
                    html: "<iframe id='fullTextIframe' src='" + rootpath + "/fullTextSearch/fullTextSearchPage.mvc' width='100%' height='100%' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
                }]

			}]
		};
		Ext.apply(this, config);
		Ext.jp.tic.main.FullTextSearchPanel.superclass.initComponent.apply(this, arguments);
	}
});

Ext.jp.tic.main.ScrollPanel = Ext.extend(Ext.Panel,{
	id : "mountScrookllPanel",
	initComponent : function() {
		var h = Ext.getBody().getHeight();
		var w = Ext.getBody().getWidth();
		var height = h - 105;
		var width = w - 220;
		var config = {
			items : [ {
				region:'center',
                items: [{
                    id : 'mountPanel',
                    html: "<iframe id='scrollIframe' src='" + rootpath + "/mountOnline/mountChartStatusPage.mvc?maxFlag=min" + "' width='100%' height='" + height + "' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
                }]

			}]
		};
		Ext.apply(this, config);
		Ext.jp.tic.main.ScrollPanel.superclass.initComponent.apply(this, arguments);
	}
});

Ext.jp.tic.main.PortalPanel = Ext.extend(Ext.Panel,{
	id : "mountPortalPanle",
	width : Ext.getBody().getWidth() - 250,
	initComponent : function() {
		var tools = [{
	        id:'maximize',
	        handler: function(e, target, panel){
				var tabId = panel.id + 'Tab';
				var url = '';
				if (panel.id == 'mountColumn') {
					url = rootpath + "/mountOnline/mountStatusColumnPage.mvc?maxFlag=max";
				} else if (panel.id == 'mountLine') {
					url = rootpath + "/mountOnline/mountStatusLinePage.mvc?maxLineFlag=max";
				} else if (panel.id == 'dataColumn') {
					url = rootpath + "/dc/dataAcceptColumnPage.mvc";
				} else {
					url = rootpath + "/dc/dataAcceptLinePage.mvc";
				}
				var tabItems = Ext.getCmp(tabId);
				if (!tabItems) {
					tabItems = {
						id: tabId,
						title: panel.title,
						iconCls: 'viewIcon1',
						layout: "fit",
						autoWidth: true,
						autoScroll: true
					};
				} else {
					tabItems.show();
				}
				Ext.apply(tabItems, {
					html: "<iframe src='" + url + "' width='100%' height='100%' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
				});
				Ext.getCmp("main_tab_panel").add(tabItems).show();
				var test = '';
			}
	    },{
	        id:'refresh',
	        handler: function(e, target, option){
	    		if (option.id == 'mountColumn') {
	    			Ext.get('columnIframe').dom.src = rootpath + "/mountOnline/mountStatusColumnPage.mvc?maxFlag=min";
	    		}
	    		if (option.id == 'mountLine') {
	    			Ext.get('lineIframe').dom.src = rootpath + "/mountOnline/mountStatusLinePage.mvc?maxLineFlag=min";
	    		}
	        }
	    },{
	        id:'close',
	        handler: function(e, target, panel){
	            panel.ownerCt.remove(panel, true);
	        }
	    }];
		var h = Ext.getBody().getHeight();
		var w = Ext.getBody().getWidth();
		var height = h - 120;
		var width = (w - 130) / 2;
		var config = {
			items : [ {
            	xtype:'portal',
            	width : Ext.getBody().getWidth() - 220,
                region:'center',
                margins:'35 5 5 0',
                items: [{
                    columnWidth:.50,
                    style:'padding:3px 3px 3px 3px',
                    items: [{
                        title: '柱状图',
                        id : 'mountColumn',
                        tools: tools,
                        html: "<iframe id='columnIframe' src='" + rootpath + "/mountOnline/mountStatusColumnPage.mvc?maxFlag=min" + "' width='" + width + "' height='" + height + "' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
                    }]
                }, {
                    columnWidth:.50,
                    style:'padding:3px 3px 3px 3px',
                    items:[{
                        title: '趋势图',
                        id : 'mountLine',
                        tools: tools,
                        html: "<iframe id='lineIframe' src='" + rootpath + "/mountOnline/mountStatusLinePage.mvc?maxLineFlag=min" + "' width='" + width + "' height='" + height + "' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
                    }]
                }]
            }]
		};
		Ext.apply(this, config);
		Ext.jp.tic.main.PortalPanel.superclass.initComponent.apply(this, arguments);
	}
});

//卡口相关信息窗口
Ext.jp.tic.main.BayonetInfoWindow = Ext.extend(Ext.Window,{
	width : 920,
	height : 550,
	title : '卡口信息',
	closeAction : "close",
	id : 'bayonetWin',
	plain : true,
	modal : true,
	border : false,
	contidtion : '',
	buttonAlign : 'center',
	buttons : [ {
		text : '&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;',
		xtype : 'button',
		algin : 'center',
		handler : function(btn, event) {
			btn.ownerCt.ownerCt.close();
		},
		scope : this
	} ],
	initComponent : function() {
		Ext.apply(this,{
			items : [ {
				xtype : 'panel',
				width : 900,
				height : 500,
				id : 'bayonetInfo',
				labelAlign : 'right',
				border : false,
				cls : 'blue-button-ct',
				items : [{
					xtype : 'bayonetInfoGridPanel'
				}]
			} ]
		});
		Ext.jp.tic.main.BayonetInfoWindow.superclass.initComponent.apply(this);
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

var expander = new Ext.ux.grid.RowExpander({
	tpl : new Ext.Template(
			'<div class="x-grid-group-title" style="margin-left:3%">'  
			+ '<table class="displayTable">'  
			+ '<tr hight="30"><td align="right">卡口编号：</td><td>{KKBH}</td><td align="right">卡口名称：</td><td>{KKMC}</td><td align="right">行政区划：</td><td>{XZQHMC}</td></tr>'  
			+ '<tr hight="30"><td align="right">卡口类型1：</td><td>{KKLX}</td><td align="right">卡口类型2：</td><td>{KKLX2}</td><td align="right">联系电话：</td><td>{LXDH}</td></tr>'  
			+ '<tr><td align="right">数据上传模式：</td><td>{SJSCMS}</td><td align="right">卡口性质：</td><td>{KKXZ}</td><td align="right">公安编号：</td><td>{GABH}</td></tr>'  
			+ '<tr><td align="right">卡口经度：</td><td>{KKJD}</td><td align="right">卡口纬度：</td><td>{KKWD}</td><td align="right">路段类型：</td><td>{DLLX}</td></tr>'  
			+ '<tr><td align="right">道路代码：</td><td>{DLDM}</td><td align="right">卡口状态：</td><td>{KKZT}</td><td align="right">道路米数：</td><td>{DLMS}</td></tr>'  
			+ '<tr><td align="right">道路名称：</td><td>{DLMC}</td><td align="right">卡口所在位置：</td><td>{KKWZ}</td><td align="right">供应商：</td><td>{SBGYS}</td></tr>'  
			+ '<tr><td align="right">全国备案卡口编号：</td><td>{QGKDBH}</td><td align="right">上传软件开发商：</td><td>{RJKFS}</td><td align="right">单位名称：</td><td>{DWMC}</td></tr>'  
			+ '<tr><td align="right">是否具备拦截：</td><td>{SFLJ}</td><td align="right">是否提供特征车牌：</td><td>{SFTGTZCP}</td><td align="right">具备违法抓拍功能：</td><td>{SFWFZP}</td></tr>'  
			+ '<tr><td align="right">是否边界卡口：</td><td>{SFBJKK}</td><td align="right">是否具备视频功能：</td><td>{SFJBSPGN}</td><td align="right">具备测速功能：</td><td>{SFCS}</td></tr>'  
			+ '<tr><td align="right">是否纳入考核：</td><td>{SFKH}</td><td align="right">是否交管卡口：</td><td>{SFJGKK}</td><td></td></tr>'  
			+ '<tr><td align="right">卡口地址：</td><td colspan="5">{KKDZ}</td></tr>'  
			+ '<tr><td align="right">联系地址：</td><td colspan="5">{LXDZ}</td></tr>'  
			+ '<tr><td align="right">备注：</td><td colspan="5">{BZ}</td></tr>'  
			+ '</table></div>'

    )
});

//卡口信息数据列表
Ext.jp.tic.main.BayonetInfoGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'bayonetGridPanel',
	height : 500,
	border : false,
	frame : false,
	plugins: expander,
	collapsible: false,
    animCollapse: false,
	initComponent : function() {
		var devicePanel = this;
		Ext.apply(this,{
			store : bayonetQueryStore,
			cm : new Ext.grid.ColumnModel({
				columns : [expander,
	            {
					header : "卡口编号", 
					dataIndex : 'KKBH', 	
					align:'center',
					width : 200,
					//处理内容太多时，当鼠标移上去是就给悬浮框提示
                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
						//当文字过多的时候，鼠标移上去就给悬浮狂提示
				     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
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
				}]
			}),
	        viewConfig: {
	            forceFit:true
	        },
			listeners : {
				afterrender : function() {
					bayonetQueryStore.load({
						params : {
							'condition' : Ext.getCmp('bayonetWin').contidtion
						}
					});
				}
			}
		});
		Ext.jp.tic.main.BayonetInfoGridPanel.superclass.initComponent.apply(this);
	},
	parseFloatValue : function (key) {
		var value = Math.round(key * 100)/100;
		return value;
	}
});

//过车信息及告警窗口
Ext.jp.tic.main.CarInfoWindow = Ext.extend(Ext.Window,{
	width : 900,
	height : 570,
	title : '详细信息',
	id : 'carInfoWin',
	closeAction : "close",
	plain : true,
	modal : true,
	border : false,
	contidtion : '',
	buttonAlign : 'center',
	buttons : [ {
		text : '&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;',
		xtype : 'button',
		algin : 'center',
		handler : function(btn, event) {
			btn.ownerCt.ownerCt.close();
		},
		scope : this
	} ],
	initComponent : function() {
		Ext.apply(this,{
			items : [ {
				xtype : 'panel',
				width : 890,
				height : 250,
				id : 'carInfo',
				labelAlign : 'right',
				border : false,
				cls : 'blue-button-ct',
				items : [{
					xtype : 'carInfoGridPanel'
				}]
			}, {
				xtype : 'panel',
				width : 890,
				height : 250,
				id : 'alarmInfo',
				labelAlign : 'right',
				border : false,
				cls : 'blue-button-ct',
				items : [{
					xtype : 'alarmInfoGridPanel'
				}]
			} ]
		});
		Ext.jp.tic.main.CarInfoWindow.superclass.initComponent.apply(this);
	}
});

//过车信息所需数据
var carQueryStore = new Ext.data.JsonStore({
	url : rootpath + '/car/firstPageCarQuery.mvc',
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

//过车数据列表
Ext.jp.tic.main.CarInfoGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'carGridPanel',
	border : false,
	height : 250,
	title : '过车历史列表',
	collapsible: true,
	frame : false,
	initComponent : function() {
		Ext.apply(this,{
			store : carQueryStore,
			cm : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
					{
						header : '车牌号码',
						align:'center',
						width : 80,
						dataIndex : 'hphm'
					}, {
						header : '车牌颜色',
						align:'center',
						width : 80,
						dataIndex : 'hpysmc'
					}, {
						header : '车辆速度',
						dataIndex : 'clsd',
						width : 80,
						align:'center',
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
						width : 210,
						align:'center',
						renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
							//当文字过多的时候，鼠标移上去就给悬浮狂提示
					     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
					    }
					},{
						header : '单位名称',
						dataIndex : 'dwmc',
						align:'center',
						width : 180,
						renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
						     //当文字过多的时候，鼠标移上去就给悬浮狂提示
					     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
					    }
					},{
						header : '经过时间',
						width : 150,
						align:'center',
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
	                	width : 80,
	                	align : 'center',
	                	items : [{
							icon : rootpath + '/themes/client/blue/images/system/check.gif',
							tooltip : '查看'
						}]
					} ]
			}),
			listeners : {
				afterrender : function() {
					carQueryStore.load({
						params : {
							'carNum' : Ext.getCmp('carInfoWin').contidtion
						}
					});
				},
				/*双击查看*/
				rowdblclick : function(grid, rowIndex, e ) {
					var data = grid.store.getAt(rowIndex);
					var win = new Ext.jp.tic.main.CarDetailWindow();
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
		Ext.jp.tic.main.CarInfoGridPanel.superclass.initComponent.apply(this);
	},
	//超链接的方法 
	checkHref : function(grid, rowIndex, colIndex, item, event) {
		var recode = grid.store.getAt(rowIndex);
		if (recode) {
			//创建window窗体
			var win = new Ext.jp.tic.main.CarDetailWindow();
			win.recode = recode;
			win.loadId = recode.get("xxbh");// 唯一序列号
			win.show();
		}
	}
});

//告警所需数据
var alarmSearchStore = new Ext.data.JsonStore({
	url : rootpath + '/controlAlarm/firstPageAlarm.mvc',
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	remoteSort : true,
	fields : [ {
			name : 'BJXXBH'
		}, {
			name : 'JGSK'
		}, {
			name : 'HPHM'
		}, {
			name : 'HPYS'
		}, {
			name : 'CWHPHM'
		}, {
			name : 'CWHPYS'
		}, {
			name : 'HPYZ'
		}, {
			name : 'CLPP'
		}, {
			name : 'CLWX'
		}, {
			name : 'CSYS'
		}, {
			name : 'CLLX'
		}, {
			name : 'CLLX'
		}, {
			name : 'CLSD'
		}, {
			name : 'CLBJ'
		}, {
			name : 'BJLX'
		}, {
			name : 'BJDD'
		}, {
			name : 'QSBJ'
		}, {
			name : 'CARIMGURL'
		}]
});

//告警信息列表
Ext.jp.tic.main.AlarmInfoGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'alarmGridPanel',
	border : false,
	title : '报警信息列表',
	collapsible: true,
	height : 250,
	frame : false,
	initComponent : function() {
		Ext.apply(this,{
			store : alarmSearchStore,
			cm : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
					{
						header : '车牌号码',
						align:'center',
						dataIndex : 'HPHM',
						width : 100,
						renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
						 //当文字过多的时候，鼠标移上去就给悬浮狂提示
				     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
				       }
					},{
						header : '车牌颜色',
						align:'center',
						width : 100,
						dataIndex : 'HPYS',
						renderer : function(key) {
							return window.dictionary.getValue("LicPlateColor", key);
						}
					},{
						header : '通过时间',
						align:'center',
						width : 150,
						dataIndex : 'JGSK',
						renderer : function(value,cellmeta,record,rowIndex,columnIndex,store) {
	       				   var tgsj = value.substring(0,value.indexOf("."));
	       				    //当文字过多的时候，鼠标移上去就给悬浮狂提示
				     	 return '<font ext:qtip="'+tgsj+'">'+tgsj+'</font>';
					 	}
					},{
						header : '车辆类型',
						align:'center',
						width : 100,
						dataIndex : 'CLLX',
						renderer : function(key) {
							return window.dictionary.getValue("CarType", key);
						}
					},{
						header : '速度',
						align:'center',
						width : 100,
						dataIndex : 'CLSD'
					},{
						header : '告警地点',
						align:'center',
						width : 230,
						dataIndex : 'BJDD',
						renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
						  if(value==null || value ==''){
							  var gjdd = '&nbsp;';
							  return '<font ext:qtip="'+gjdd+'">'+gjdd+'</font>';
						  }else{
							  //当文字过多的时候，鼠标移上去就给悬浮狂提示
				     	      return '<font ext:qtip="'+value+'">'+value+'</font>';
						  }
						 
				        }
					},{
						header : '操作', 
						align:'center',
						dataIndex : 'operate',
				    	xtype : 'actioncolumn',
                    	width : 80,
                    	align : 'center',
                    	items : [{
							icon : rootpath
									+ '/themes/client/blue/images/system/check.gif',
							tooltip : '查看'
						}]
					} ]
			}),
			listeners : {
				afterrender : function() {
					alarmSearchStore.load({
						params : {
							'carNum' : Ext.getCmp('carInfoWin').contidtion
						}
					});
				},
				/*双击查看*/
				rowdblclick : function(grid, rowIndex, e ) {
					var data = grid.getStore().getAt(rowIndex).data;
					var win = new Ext.jp.tic.main.AlarmDetailWindow();
					//将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
					win.loadId = data.BJXXBH;
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
		Ext.jp.tic.main.AlarmInfoGridPanel.superclass.initComponent.apply(this);
	},
	//超链接的方法 
	checkHref : function(grid, rowIndex, colIndex, item, event) {
		var recode = grid.store.getAt(rowIndex);
		if (recode) {
			//创建window窗体
			var win = new Ext.jp.tic.main.AlarmDetailWindow();
			win.loadId = recode.get("BJXXBH");// 唯一序列号
			win.show();
		}
	}
});

Ext.reg('fullTextSearchPanel', Ext.jp.tic.main.FullTextSearchPanel);
Ext.reg('scrollPanel', Ext.jp.tic.main.ScrollPanel);
Ext.reg('portalPanel', Ext.jp.tic.main.PortalPanel);
Ext.reg('carInfoGridPanel', Ext.jp.tic.main.CarInfoGridPanel);
Ext.reg('alarmInfoGridPanel', Ext.jp.tic.main.AlarmInfoGridPanel);
Ext.reg('bayonetInfoGridPanel', Ext.jp.tic.main.BayonetInfoGridPanel);