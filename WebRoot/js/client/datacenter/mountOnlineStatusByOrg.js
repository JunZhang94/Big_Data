/**
 * 卡口在线状态状态
 */
Ext.ns('Jinpeng.online');

/**
 * 图表配置,柱状图
 * @type
 */
Jinpeng.online.ChartCulumnConfig = {
	url : rootpath + "/mountOnline/mountOnlineChartCulumn.mvc",
	root : 'data',
	fields : ['PERIOD', 'COUNT']
};

/**
 * 图表配置，曲线图
 * @type
 */
Jinpeng.online.ChartLineConfig = {
	url : rootpath + "/mountOnline/mountOnlineTrendChar.mvc",
	root : 'data',
	fields : ['PERIOD', 'COUNT', 'DWMC']
};

Jinpeng.online.startTimeCulumn = {
//	xtype : 'datetimefield',
//	name : 'startTime_culumn',
//	id : 'startdate_culumn',
//	fieldLabel : '开始时间',
//	editable : false,
//	value : new Date().format('Y-m-d'),
//	vtype: 'beginEndDate',
//	endDateField : 'enddate_culumn',
//	anchor : '94%',
//	format:'Y-m-d'
	
	xtype : 'textfield',
		fieldLabel : '开始时间',
		id : 'startdate_culumn',
		allowBlank : false,
        editable : false,
		name : 'startTime_culumn',
		value : new Date().format('Y-m-d') + ' 00',
		anchor : '94%',
		style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
		listeners  : {   
        	'focus':function(field){  
				var endTime = Ext.util.Format.date(
						new Date(), 'Y-m-d H:i:s');
				var enddate = Ext.getCmp("enddate_culumn").getValue();
				//  日期时间的默认参数      
			    var defaultDateTimeParams = new function()   
			    {   
			        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
			        this.startDate  = endTime;    //  开始时间   
			        //this.maxDate = enddate;
			        this.dateFmt    = 'yyyy-MM-dd HH';  //  格式化时间   
			        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
			        this.alwaysUseStartDate = false;           //  默认使用初始时间   
			    };  
                WdatePicker(defaultDateTimeParams);   
                field.blur();
         	}   
		}
};

Jinpeng.online.startTimeLine = {
		xtype : 'datetimefield',
		name : 'startTime_line',
		id : 'startdate_line',
		fieldLabel : '开始时间',
		editable : false,
		value : new Date().format('Y-m-d'),
		vtype: 'beginEndDate',
		endDateField : 'enddate_line',
		anchor : '94%',
		format:'Y-m-d'
	
	};

var endTime = Date.parseDate(Ext.util.Format.date(
	new Date(), 'Y-m-d')
	+ " " + "23:59:59", 'Y-m-d H:i:s');

Jinpeng.online.endTimeCulumn = {
//	xtype : 'datetimefield',
//	name : 'endTime_culumn',
//	id : 'enddate_culumn',
//	fieldLabel : '结束时间',
//	editable : false,
//	value : new Date().format('Y-m-d')+' 23',
//	vtype: 'beginEndDate',
//	startDateField : 'startdate_culumn',
//	anchor : '94%',
//	format:'Y-m-d'
	
	xtype : 'textfield',
	fieldLabel : '结束时间',
	allowBlank : false,
    editable : false,
	id : 'enddate_culumn',
	name : 'endTime_culumn',
	value : new Date().format('Y-m-d') + ' 23',
	anchor : '94%',
	style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
	listeners  : {   
    	'focus':function(field){  
			var endTime = Ext.util.Format.date(
					new Date(), 'Y-m-d H:i:s');
			var startdate = Ext.getCmp("startdate_culumn").getValue();
			//  日期时间的默认参数      
		    var defaultDateTimeParams = new function()   
		    {   
		        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
		        //this.startDate  = endTime;    //  开始时间  
		        this.minDate = startdate;
		        this.dateFmt    = 'yyyy-MM-dd HH';  //  格式化时间   
		        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
		        this.alwaysUseStartDate = false;           //  默认使用初始时间   
		    };  
            WdatePicker(defaultDateTimeParams);   
            field.blur();
     	}   
	} 
};

Jinpeng.online.timeCombo = {
	xtype : 'combo',
	fieldLabel : '时间单位',
	name : 'timeType',
	id : 'timeType',
	width : 70,
	emptyText : '请选择...',
	editable : false,
	triggerAction : 'all',
	mode : "local",
	valueField : 'id',
	value : '11',
	displayField : 'text',
	store : new Ext.data.ArrayStore({
		fields : [ 'id', 'text' ],
		data : [ [ 1, '1月' ], [ 2, '2月' ], [ 3, '3月' ], [ 4, '4月' ], [ 5, '5月' ], [ 6, '6月' ], [ 7, '7月' ], [ 8, '8月' ]
		       , [ 9, '9月' ], [ 10, '10月' ], [ 11, '11月' ], [ 12, '12月' ]]
	})
};

var viewPort = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'north',
			height : 45,
			border : false,
			xtype : 'mountOnlineForm'
		}, {
			region : 'center',
			border : false,
			xtype : 'mountOnlineTabPanel'
		}],
		listeners : {
			afterrender : function() {
				Ext.getCmp('mountOnlienTabPanelId').setActiveTab(0);
				commuServerStore.load();
				/*columnChartStore.load({
					params : Jinpeng.online.DafaultParam
				});
				lineChartStore.load({
					params : Jinpeng.online.DafaultParam
				});*/
			}
		}
	});
	/*var formPanel = new Jinpeng.online.MountOnlienStatusFormPanel();
	setInterval(function() {
		formPanel.onlineSearch();
	}, 300000);*/
	initMq();
});

//初始化MQ
function initMq() {
	var amq = org.activemq.Amq;
	 
	amq.init({
	    uri: "amq",
	    logging: true,
		timeout: 20,
		clientId: (new Date()).getTime().toString()
	});
};

/**
 * 数卡口在线状态Form
 */
Jinpeng.online.MountOnlienStatusFormPanel = Ext.extend(Ext.Panel, {
	initComponent : function() {
		var comboBoxTree = new Ext.ux.OrgComboBoxTree({
			fieldLabel : '组织结构',
			name : 'orgName',
			emptyText : '请选择...',
			blankText : '请选择组织结构',
			anchor : '95%',
			editable : false,
			treeUrl : '',
			dataType : 'control',
			callback : function(id, text, coding, orgType) {
				Ext.getCmp('mountOnlineForm').form.findField('orgId').setValue(id);
				Ext.getCmp('mountOnlineForm').form.findField('orgType').setValue(orgType);
			}
		});
		
		var endTime = Date.parseDate(Ext.util.Format.date(
			new Date(), 'Y-m-d')
			+ " " + "23:59:59", 'Y-m-d H:i:s');
	
		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'mountOnlineForm',
				border : false,
				frame : true,
				labelAlign : 'right',
				cls : 'blue-button-ct',
				
				layout : 'table',
				defaults : {
					width : 500,
					layout : 'form'
				},
				layoutConfig : {
					columns : 4
				},
				
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
					items : [comboBoxTree]
				}, {
					items : [{
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
						id : 'searchBut',
						handler : this.onlineSearch,
						scope : this
					}]
				},{
					items : [{
						xtype : 'hidden',
						id : 'orgId',
						name : 'orgId'
					}]
				},{
					items : [{
						xtype : 'hidden',
						id : 'orgType',
						name : 'orgType'
					}]
				}]
			}]
		});
		Jinpeng.online.MountOnlienStatusFormPanel.superclass.initComponent.apply(this);
	},
	onlineSearch : function() {
		var form = Ext.getCmp('mountOnlineForm');
		if(form.getForm().isValid()) {
			var grid = Ext.getCmp('mountOnlineGrid');
			var vitrulGrid = Ext.getCmp('vitrulMountOnlineGrid');
			var stores = [ commuServerStore, vitrulServerStore/*, columnChartStore, lineChartStore*/ ];
			var queryFlag = Ext.getCmp('mountOnlienTabPanelId').getActiveTab().gridflag;
			if (queryFlag == 'culumn' || queryFlag == 'line') {
				this.setChartStoreBaseParam(stores);
			} else {
				this.setDefaultStoreBaseParam(stores);
			}
			Ext.each(stores, function(store) {
				store.load();
			});
		}
	},
	/**
	 * 设置store的所需要的参数
	 * @param {} stores
	 */
	setDefaultStoreBaseParam : function(stores) {
		for ( var i = 0; i < stores.length; i++) {
			stores[i].baseParams = {};
			stores[i].baseParams["orgId"] = Ext.getCmp('orgId').getValue();
			stores[i].baseParams["orgType"] = Ext.getCmp('orgType').getValue();
			stores[i].baseParams["startTime"] = Ext.util.Format.date(Date.parseDate(Ext.util.Format.date(
					new Date(), 'Y-m-d')
					+ " " + "00:00:00", 'Y-m-d H:i:s'),'Y-m-d H:i:s');
			stores[i].baseParams["endTime"] = Ext.util.Format.date(endTime,'Y-m-d H:i:s');
			stores[i].baseParams["culumnOline"] = 1;
			stores[i].baseParams["lineOline"] = 1;
			/*stores[i].baseParams["timeType"] = Ext.getCmp('chartLineForm').form.findField('timeType').getValue();*/
		}
	},
	/**
	 * 设置store的所需要的参数
	 * 历史在线统计图
	 * @param {} stores
	 */
	setChartStoreBaseParam : function(stores) {
		for ( var i = 0; i < stores.length; i++) {
			stores[i].baseParams = {};
			stores[i].baseParams["orgId"] = Ext.getCmp('orgId').getValue();
			stores[i].baseParams["orgType"] = Ext.getCmp('orgType').getValue();
			stores[i].baseParams["startTime_culumn"] = Ext.getCmp('startdate_culumn').getValue()+":00:00";
			stores[i].baseParams["endTime_culumn"] = Ext.getCmp('enddate_culumn').getValue()+":59:59";
			stores[i].baseParams["culumnOline"] = Ext.getCmp('chartCulumnForm').form.findField('culumnOline').getValue() ? 1 : 0;
			stores[i].baseParams["lineOline"] = Ext.getCmp('chartLineForm').form.findField('lineOline').getValue() ? 1 : 0;
			stores[i].baseParams["timeType"] = Ext.getCmp('chartLineForm').form.findField('timeType').getValue();
			stores[i].baseParams["query"] = 'chart';
		}
	}
});

var commuServerStore;

/**
 * 真实卡口在线状态Grid
 */
Jinpeng.online.MountOnlienStatusGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'mountOnlineGrid',
	border : false,
	enableHdMenu : false,
	stateful:false,
	initComponent : function() {
		var _panel = this;
		var summary = new Ext.ux.grid.GroupSummary();
		var reader = new Ext.data.JsonReader({
	        idProperty: 'deviceId',
	        root : 'data',
			fields : [
			  {name : 'KKBH'},
			  {name : 'KKMC'},
			  {name : 'LXDH'},
			  {name : 'LXDZ'},
			  {name : 'XNKK_STATUS'},
			  {name : 'ONLINE_STATUS'},
			  {name : 'JGSJ'},
	          {name : 'DWBH'},
	          {name : 'DWMC'}]
	    });
		commuServerStore = new Ext.data.GroupingStore({
			url : rootpath+ "/mountOnline/byOrgGroupping.mvc",
			groupField: 'DWMC',
			reader:reader
		});
		// 加载数据
		Ext.apply(this, {
			layout : 'fit',
			stripeRows : true,
			store : commuServerStore,
			colModel  : new Ext.grid.ColumnModel({
				columns : [ {
		            header: '部门',
		            dataIndex: 'DWMC'
	               
		        },{
					header : '卡口名称',
					dataIndex : 'KKMC',
		            summaryType: 'count',
		            summaryRenderer: function(v, params, data){
			        	var status = data.data.ONLINE_STATUS;
		        		var on = _panel.countInstances(status, '1')
				    	var out = _panel.countInstances(status, '0')
				    	var outDatas = parseInt(out) - 1;
	                    return '卡口总数 ('+v+')，在线 (<span style="color:green;">'+on+'</span>)，离线(<span style="color:red;">' + outDatas +'</span>)'; 
	                }
				},{
		            header: '最后经过时间',
		            dataIndex: 'JGSJ', renderer : function(key) {
					   if (key == '' || key == 'null' || key == null) {
		        		   return '--'
		        	   } else {
		        		   return key;
		        	   }
				    }/*,
		            summaryType: 'sum'*/
		        },{
		            header: '在线状态',
		            dataIndex: 'ONLINE_STATUS', renderer : function(key) {
		        	   var value = '--';
		        	   if (key == '0' || key == 0) {
		        		   value = '<span style="color:red;">离线</span>';
		        	   }else if (key == '1' || key == 1) {
		        		   value = '<span style="color:green;">在线</span>';
		        	   } else {
		        		   value = key;
		        	   }
		        	   return value;
				    },
		            summaryType: 'sum',
		            summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        }]
			}),
			view: new Ext.grid.GroupingView({
				forceFit: true,
	            showGroupName: false,
	            enableNoGroups: false,
				enableGroupingMenu: false,
				startCollapsed:true,
	            hideGroupedColumn: true,
				groupTextTpl: '{text}'
			}),
			 plugins: summary
		});
		Jinpeng.online.MountOnlienStatusGridPanel.superclass.initComponent.apply(this);
	},
	countInstances : function (mainStr, subStr) {
		var count = 0;
        var offset = 0;
        do
        {
            offset = mainStr.indexOf(subStr, offset);
            if(offset != -1)
            {
                count++;
                offset += subStr.length;
            }
        } while (offset != -1)
        	return count;
	}
});

var vitrulServerStore;
/**
 * 虚拟卡口在线状态Grid
 */
Jinpeng.online.VitrulMountOnlienStatusGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'vitrulMountOnlineGrid',
	border : false,
	enableHdMenu : false,
	stateful:false,
	initComponent : function() {
		var _panel = this;
		var summary = new Ext.ux.grid.GroupSummary();
		var reader = new Ext.data.JsonReader({
	        idProperty: 'deviceId',
	        root : 'data',
			fields : [
			  {name : 'KKBH'},
			  {name : 'KKMC'},
			  {name : 'LXDH'},
			  {name : 'LXDZ'},
			  {name : 'XNKK_STATUS'},
			  {name : 'ONLINE_STATUS'},
			  {name : 'JGSJ'},
	          {name : 'DWBH'},
	          {name : 'DWMC'}, 
	          {name : 'operate'}]
	    });
		vitrulServerStore = new Ext.data.GroupingStore({
			url : rootpath+ "/mountOnline/byVitrulOrgGroupping.mvc",
			groupField: 'DWMC',
			reader:reader
		});
		// 加载数据
		Ext.apply(this, {
			layout : 'fit',
			stripeRows : true,
			store : vitrulServerStore,
			colModel  : new Ext.grid.ColumnModel({
				columns : [ {
		            header: '部门',
		            dataIndex: 'DWMC'
	               
		        },{
					header : '卡口名称',
					dataIndex : 'KKMC',
		            summaryType: 'count',
		            summaryRenderer: function(v, params, data){
			        	var status = data.data.ONLINE_STATUS;
		        		var on = _panel.countInstances(status, '1')
				    	var out = _panel.countInstances(status, '0')
				    	var outDatas = parseInt(out) - 1;
	                    return '卡口总数 ('+v+')，在线 (<span style="color:green;">'+on+'</span>)，离线(<span style="color:red;">' + outDatas +'</span>)'; 
	                }
				},{
		            header: '最后经过时间',
		            dataIndex: 'JGSJ', renderer : function(key) {
					   if (key == '' || key == 'null' || key == null) {
		        		   return '--'
		        	   } else {
		        		   return key;
		        	   }
				    }/*,
		            summaryType: 'sum'*/
		        },{
		            header: '在线状态',
		            dataIndex: 'ONLINE_STATUS', renderer : function(key) {
		        	   var value = '--';
		        	   if (key == '0' || key == 0) {
		        		   value = '<span style="color:red;">离线</span>';
		        	   }else if (key == '1' || key == 1) {
		        		   value = '<span style="color:green;">在线</span>';
		        	   } else {
		        		   value = key;
		        	   }
		        	   return value;
				    },
		            summaryType: 'sum',
		            summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '设备状态',
		            dataIndex: 'XNKK_STATUS', renderer : function(key) {
		        	   var value = '--';
		        	   if (key == '0' || key == 0) {
		        		   value = '<span style="color:red;">关闭</span>';
		        	   }else if (key == '1' || key == 1) {
		        		   value = '<span style="color:green;">开启</span>';
		        	   } else {
		        		   value = key;
		        	   }
		        	   return value;
				    },
		            summaryType: 'sum',
		            summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{header : '操作', dataIndex : 'operate', width : 60, renderer : function(value, metadata, record, rowIndex, colIndex, store) {
		        		var sbbh = record.get('LXDH');
		        		var tdbh=record.get('LXDZ');
		        		var kkState=record.get('XNKK_STATUS');
		        		if(kkState==1 || kkState=='1'){
		        			return "<a href='#' onclick=\"stopHandler('" + sbbh + "','"+tdbh+"')\">关闭</a>";
		        		}else{
		        			return "<a href='#' onclick=\"startHandler('" + sbbh + "','"+tdbh+"')\">启动</a>";
		        		}
		        		//return "<a href='#' onclick=\"stopHandler('" + sbbh + "','"+tdbh+"')\">暂停</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' onclick=\"startHandler('" + sbbh + "','"+tdbh+"')\">启动</a>";
					}
		        } ]
			}),
			view: new Ext.grid.GroupingView({
				forceFit: true,
	            showGroupName: false,
	            enableNoGroups: false,
				enableGroupingMenu: false,
				startCollapsed:true,
	            hideGroupedColumn: true,
				groupTextTpl: '{text}'
			}),
			plugins: summary
		});
		Jinpeng.online.VitrulMountOnlienStatusGridPanel.superclass.initComponent.apply(this);
	},
	countInstances : function (mainStr, subStr) {
		var count = 0;
        var offset = 0;
        do
        {
            offset = mainStr.indexOf(subStr, offset);
            if(offset != -1)
            {
                count++;
                offset += subStr.length;
            }
        } while (offset != -1)
        	return count;
	}
});

//暂停方法
function stopHandler(sbbh,tdbh) {
	var amq = org.activemq.Amq;
	var message="X01,"+sbbh+","+tdbh+",0";
	amq.sendMessage("topic://MountOperate",message);
}

//启动方法
function startHandler(sbbh,tdbh) {
	var amq = org.activemq.Amq;
	var message="X01,"+sbbh+","+tdbh+",1";
	amq.sendMessage("topic://MountOperate",message);
}

//柱状图数据store
var columnChartStore;

//线形图数据store
var lineChartStore;

/**
 * 数据列表和柱状图TabPanel
 * @class Jinpeng.online.GatherStatisticsTabPanel
 */
Jinpeng.online.MountOnlienTabPanel = Ext.extend(Ext.TabPanel, {
	id : "mountOnlienTabPanelId",
	initComponent : function() {
		var config = {
			items : [ {
				title : '实体卡口实时在线状态',
				xtype : 'mountOnlineGrid'

			}, {
				title : '虚拟卡口实时在线状态',
				xtype : 'vitrulMountOnlineGrid'
			}/*, {
				title : '历史在线状态统计图',
				gridflag : 'culumn',
				layout:'fit',
				listeners : {
					activate : this.handleActivate
				},
				tbar : new Ext.Toolbar({
					items : [{
						xtype : 'form',
						id : 'chartCulumnForm',
						border : false,
						frame : true,
						layout : 'table',
						cls : 'blue-button-ct',
						defaults : {
							layout : 'form',
							//统一宽度
							width : 200
						},
						layoutConfig : {
							columns : 8
						},
						items : [  {
							xtype : 'tbspacer',
							width : 50
						}, {
							xtype : "label",
							text : "  时间："
						}, Jinpeng.online.startTimeCulumn, {
							xtype : "label",
							text : "  至："
						}, Jinpeng.online.endTimeCulumn, {
							boxLabel : '在线',
							xtype : 'radio',
							inputValue : '1',
							width : 50,
							name : 'culumnOline',
							checked : true
						}, {
							boxLabel : '离线',
							xtype : 'radio',
							width : 50,
							inputValue : '0',
							name : 'culumnOline'
						}]
					}]
				}),
				items :[{
					xtype : 'myColumnChart',
					ref:"hChart",
					chartIDPrefix : "mountOnlineColumn",
					storeConfig : Jinpeng.online.ChartCulumnConfig,
					id : 'mountOnlineColumnChart'
				}]

			}, {
				title : '历史在线状态趋势图',
				gridflag : 'line',
				layout:'fit',
				listeners : {
					activate : this.handleActivate
				},
				tbar : new Ext.Toolbar({
					items : [{
						xtype : 'form',
						id : 'chartLineForm',
						border : false,
						frame : true,
						layout : 'table',
						cls : 'blue-button-ct',
						defaults : {
							layout : 'form',
							//统一宽度
							width : 200
						},
						layoutConfig : {
							columns : 8
						},
						items : [  {
							xtype : 'tbspacer',
							width : 50
						}, {
							xtype : "label",
							text : "  时间："
						}, Jinpeng.online.timeCombo, {
							boxLabel : '在线',
							xtype : 'radio',
							inputValue : '1',
							width : 50,
							name : 'lineOline',
							checked : true
						}, {
							boxLabel : '离线',
							xtype : 'radio',
							width : 50,
							inputValue : '0',
							name : 'lineOline'
						}]
					}]
				}),
				items : {
					xtype : 'myLineChart',
					ref:"hChart",
					chartIDPrefix : "mountOnlineLine",
					storeConfig : Jinpeng.online.ChartLineConfig,
					id : 'mountOnlineLineChart'
				}
			}*/ ]
		};
		Ext.apply(this, config);
		Jinpeng.online.MountOnlienTabPanel.superclass.initComponent.apply(this, arguments);
	},
	confimSearchData : function() {
		alert(Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'));
	},
	/**
	 * 切换事件处理
	 * @param tab
	 * @return Boolean
	 */
	handleActivate : function(tab) {
		try{
			var chartStore = tab.hChart.store;
			chartStore.fireEvent('datachanged', chartStore);
		}catch(e){}
	},
	afterRender : function() {
		Jinpeng.online.MountOnlienTabPanel.superclass.afterRender.apply(this, arguments);
		this.items.each(function(item, index, length) {
		});
	}
});

Ext.reg('mountOnlineTabPanel', Jinpeng.online.MountOnlienTabPanel);
Ext.reg('mountOnlineForm', Jinpeng.online.MountOnlienStatusFormPanel);
Ext.reg('mountOnlineGrid', Jinpeng.online.MountOnlienStatusGridPanel);
Ext.reg('vitrulMountOnlineGrid', Jinpeng.online.VitrulMountOnlienStatusGridPanel);
