/**
 *  卡口报备管理入口
 */
Ext.ns("Jinpeng.bayonetReport");

var viewPortObj = null;
var downPictureWindow = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport({
		layout : 'border',
		items : [ {
			// 数据显示区域
			region : 'center',
			border : false,
			// 自定标签
			xtype : 'bayonetReportInfoDataPanel'
		} ]
	});
});

var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
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
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/Big_Data/zTree/demo/cn/excheck/manyBeyonetSelectTree.html"></iframe>'
});
var setKKValue=function(data){
	Ext.getCmp('passStation').setValue(data.text);
	Ext.getCmp('directions').setValue(data.id);
	Ext.getCmp('mywin').hide();
};
var cancelKK=function(data){
	Ext.getCmp('passStation').setValue("");
	Ext.getCmp('directions').setValue("");
	Ext.getCmp('mywin').hide();
};

/**
 * @class Jinpeng.TabPanel 工作区标签页组件
 * north区域表单部份
 */
Jinpeng.bayonetReport.BayonetReportInfoDataPanel = Ext.extend(Ext.Panel,{
	initComponent : function() {
		/** 设定参数 */
		Ext.apply(	this,{
			layout : 'border',
			border : false,
			defaults : {
				margins : '0 0 0 0'
			},
			items : [ {
				region : 'north',
				height : 45,
				xtype : 'form',
				id : 'searchBayonetForm',
				ref : "../formPanel",
				labelWidth : 85,
				border : false,
				cls : 'blue-button-ct',
				frame : true,
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;',
				items : [ {
					layout : 'column',
					bodyStyle : 'margin-top: 5px;',
					items : [{
						columnWidth : 0.3,
						layout : 'form',
						border : false,
						items : [{
							xtype : 'compositefield',
							items : [ {
								flex : 0.7,
								fieldLabel : '卡口',
								xtype : 'tooltiptextfield',
								name : 'passStation',
								id : 'passStation',
								emptyText : '请选择卡口'
							}, {
								flex : 0.3,
								owner : this,
								labelAlign : 'right',
								xtype : 'button',
								text : '选择卡口',
								id:'choosekkBtn',
								handler : function(){
									kwin.show();
								}
							} ]
						}]
					},{
						columnWidth : 0.3,
						layout : 'form',
						border : false,
						items :[{
							xtype : 'tcombo',
							store : new Ext.data.ArrayStore({
								fields : [ 'id', 'text' ],
								data : [ ['', '全部' ], [ '0', '未报备' ], [ '1', '已报备' ], [ '2', '故障' ]]
							}),
							id : 'status',
							mode : 'local',
							name : 'status',
							value : '',
							width:180,
							fieldLabel : '分类查询',
							triggerAction : 'all',
							editable : false,
							valueField : 'id',
							displayField : 'text',
						}]
					}, {
						columnWidth : 0.3,
						layout : 'form',
						border : false,
						items : [ {
							xtype : 'button',
							text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
							id : 'searchBut',
							handler : this.advanceSearch,
							scope : this
						} ]
					}, {
						items : [{
							xtype : 'hidden',
							id : 'directions',
							name : 'directions'
						}]
					} ]
				} ]
				}, {
				region : 'center',
				margins:'10 0 0 0',
				xtype : 'bayonetReportInfoCenterGridPanel',
				ref : "../grid"
			}]
		});
		Jinpeng.bayonetReport.BayonetReportInfoDataPanel.superclass.initComponent.apply(this);
	},
	afterRender : function(ct, position) {
		Jinpeng.bayonetReport.BayonetReportInfoDataPanel.superclass.afterRender.apply(this, arguments);
	},
	/* 响应查询按钮 */
	advanceSearch : function() {
		var form = Ext.getCmp('searchBayonetForm');
		if (form.getForm().isValid()) {
			var grid = Ext.getCmp('bayonetReportRecordGridPanel');
			grid.store.baseParams = {};// 重置
			/** 将参数传入后台 */
			var baseparams = {
				"mounts" : Ext.getCmp('directions').getValue(),
				"status" : Ext.getCmp('status').getValue()
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
	}
});

/**
 * 中心右区域数据显示中心
 */ 
Jinpeng.bayonetReport.BayonetReportInfoCenterGridPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'bayonetReportRecordGridPanel',
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
		      {name : 'KKWD'},
		      {name : 'KKJD'},
		      {name : 'KKZT'},
		      {name : 'BZ'},
		      {name : 'KKLX'},
		      {name : 'DWBH'},
		      {name : 'BYZD2'},
		      {name : 'DWMC'},
		      {name : 'ONLINE_STATUS'}]
		});
		/**
		 * 列表数据Store
		 */
		var bayonetReportInfoStore = new Ext.data.GroupingStore({
			//url : rootpath+ "/bayonetReport/queryBayonetReport.mvc",
			url : rootpath+ "/mountOnline/loadBayonetReport.mvc",
			groupField: 'DWMC',
			reader:reader
		});
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this,{
			layout : 'fit',
			stripeRows : true,
			store : bayonetReportInfoStore,
			cm : new Ext.grid.ColumnModel({
				columns : [
					//new Ext.ux.grid.PagingRowNumberer({ width : 40}),
					sm,
					{
			            header: '部门',
			            dataIndex: 'DWMC'
			        }, {
						header : "卡口名称",
						dataIndex : 'KKMC',
						width : 250,
						//处理内容太多时，当鼠标移上去是就给悬浮框提示
	                    renderer: function(value,cellmeta,record){ 
							//当文字过多的时候，鼠标移上去就给悬浮狂提示
			        		if (record.data.BYZD2 == '0') {
			        			if (record.data.ONLINE_STATUS == '1') {
			        				return '<font ext:qtip="'+value+'" style="color:green;">'+value+'</font>';
			        			} else {
			        				return '<font ext:qtip="'+value+'" style="color:red;">'+value+'</font>';
			        			}
			        		} else {
			        			if (record.data.ONLINE_STATUS == '1') {
			        				return '<font ext:qtip="'+value+'">'+value+'</font>';
			        			} else {
			        				return '<font ext:qtip="'+value+'" style="color:red;">'+value+'</font>';
			        			}
			        		}
						},
						summaryType: 'count',
			            summaryRenderer: function(v, params, data){
				        	var status = data.data.BYZD2;
				        	var onlineStatus = data.data.ONLINE_STATUS;
			        		var on = _panel.countInstances(status, '1');
					    	var out = _panel.countInstances(status, '0');
					    	var down = _panel.countInstances(onlineStatus, '0');
					    	var outDatas = parseInt(out) - 1;
					    	var downDatas = parseInt(down) - 1;
		                    return '卡口总数 ('+v+')，已报备 ('+on+')，未报备(<span style="color:green;">' + outDatas +'</span>)，故障(<span style="color:red;">' + downDatas +'</span>)'; 
		                }
					}, {header : "卡口类型", dataIndex : 'KKLX', hideable: false, width : 60,
						renderer : function(key,cellmeta,record) {
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
							if (record.data.BYZD2 == '0') {
								if (record.data.ONLINE_STATUS == '1') {
									return '<font style="color:green;">'+value+'</font>';
			        			} else {
			        				return '<font style="color:red;">'+value+'</font>';
			        			}
			        		} else {
			        			if (record.data.ONLINE_STATUS == '1') {
			        				return '<font>'+value+'</font>';
			        			} else {
			        				return '<font style="color:red;">'+value+'</font>';
			        			}
			        		}
						}
					}, {header : "卡口纬度", dataIndex : 'KKWD', hideable: false, width : 60,
						renderer : function(key,cellmeta,record) {
							var value = _panel.parseFloatValue(key);
							if (record.data.BYZD2 == '0') {
								if (record.data.ONLINE_STATUS == '1') {
									return '<font style="color:green;">'+value+'</font>';
			        			} else {
			        				return '<font style="color:red;">'+value+'</font>';
			        			}
			        		} else {
			        			if (record.data.ONLINE_STATUS == '1') {
			        				return '<font>'+value+'</font>';
			        			} else {
			        				return '<font style="color:red;">'+value+'</font>';
			        			}
			        		}
						}
					}, {header : "卡口经度", dataIndex : 'KKJD', hideable: false,width : 60,
						renderer : function(key,cellmeta,record) {
							var value = _panel.parseFloatValue(key);
							if (record.data.BYZD2 == '0') {
								if (record.data.ONLINE_STATUS == '1') {
									return '<font style="color:green;">'+value+'</font>';
			        			} else {
			        				return '<font style="color:red;">'+value+'</font>';
			        			}
			        		} else {
			        			if (record.data.ONLINE_STATUS == '1') {
			        				return '<font>'+value+'</font>';
			        			} else {
			        				return '<font style="color:red;">'+value+'</font>';
			        			}
			        		}
						}
					}, {header : "卡口状态", dataIndex : 'KKZT', hideable: false, width : 60,
						renderer : function(key,cellmeta,record) {
							var value = '';
							if (key == '0') {
								value = '正常';
							} else if (key == '1') {
								value = '故障';
							} else if (key == '2') {
								value = '报废';
							} else {
								value = '停用';
							}
							if (record.data.BYZD2 == '0') {
								if (record.data.ONLINE_STATUS == '1') {
									return '<font style="color:green;">'+value+'</font>';
			        			} else {
			        				return '<font style="color:red;">'+value+'</font>';
			        			}
			        		} else {
			        			if (record.data.ONLINE_STATUS == '1') {
			        				return '<font>'+value+'</font>';
			        			} else {
			        				return '<font style="color:red;">'+value+'</font>';
			        			}
			        		}
						}
					}, {header : "报备状态", dataIndex : 'BYZD2', hideable: false, width : 60,
						renderer : function(key,cellmeta,record) {
							var value = '';
							if (key == '1') {
								value = '已报备';
							} else if (key == '0') {
								value = '未报备';
							} else {
								value = '故障';
							}
							if (record.data.BYZD2 == '0') {
								if (record.data.ONLINE_STATUS == '1') {
									return '<font style="color:green;">'+value+'</font>';
			        			} else {
			        				return '<font style="color:red;">'+value+'</font>';
			        			}
			        		} else {
			        			if (record.data.ONLINE_STATUS == '1') {
			        				return '<font>'+value+'</font>';
			        			} else {
			        				return '<font style="color:red;">'+value+'</font>';
			        			}
			        		}
						},
			            summaryType: 'sum',
			            summaryRenderer: function(v, params, data){
		                    return ''; 
		                }
					}, {header : "在线状态", dataIndex : 'ONLINE_STATUS', hideable: false, width : 20, 
						summaryType: 'sum',
						summaryRenderer: function(v, params, data){
                    		return ''; 
                		},
                		hidden: true 
					}, {
						header : "备注",
						dataIndex : 'BZ',
						width :110,
						//处理内容太多时，当鼠标移上去是就给悬浮框提示
	                    renderer: function(value,cellmeta,record){ 
							//当文字过多的时候，鼠标移上去就给悬浮狂提示
							var bzStr;
							if (value == '' || value == 'null' || value == null) {
								bzStr = '';
							} else {
								bzStr = value;
							}
							if (record.data.BYZD2 == '0') {
			        			if (record.data.ONLINE_STATUS == '1') {
			        				return '<font ext:qtip="'+bzStr+'" style="color:green;">'+bzStr+'</font>';
			        			} else {
			        				return '<font ext:qtip="'+bzStr+'" style="color:red;">'+bzStr+'</font>';
			        			}
			        		} else {
			        			if (record.data.ONLINE_STATUS == '1') {
			        				return '<font ext:qtip="'+bzStr+'">'+bzStr+'</font>';
			        			} else {
			        				return '<font ext:qtip="'+bzStr+'" style="color:red;">'+bzStr+'</font>';
			        			}
			        		}
						}
					} ]
				}),
				viewConfig  : {
					scope : this,
					getRowClass : function(record,rowIndex,rowParams,store){
						if (record.data.BYZD2 == '0') {
							return 'x-grid-record-yellow';
						}
					}
				},
				selModel : sm,
				view: new Ext.grid.GroupingView({
					forceFit: true,
		            showGroupName: false,
		            enableNoGroups: false,
					enableGroupingMenu: false,
					startCollapsed:true,
		            hideGroupedColumn: true,
					groupTextTpl: '{text}'
				}),
				plugins: summary,
				tbar : {
					cls : 'blue-button-ct',
					items : [ {
						xtype : 'button',
						text : '提交报备',
						height : 20,
						tooltip : {
							text : '如果不勾选，将按当前查询条执行查询到的所有记录!'
						},
						id : 'confimBtn',
						ref : '../btnCommitReport'
					},{
		          		  xtype : 'tbspacer',
		          		  width : 10
	          	  	}, {
						xtype : 'button',
						text : '取消报备',
						height : 20,
						tooltip : {
							text : '如果不勾选，将按当前查询条执行查询到的所有记录!'
						},
						id : 'cancelBtn',
						ref : '../btnCancelReport'
					} ]
				}
		});
		Jinpeng.bayonetReport.BayonetReportInfoCenterGridPanel.superclass.initComponent.apply(this);
		this.btnCommitReport.on('click', this.onBtnCommitHandler, this);
		this.btnCancelReport.on('click', this.onBtnCancelHandler, this);
	},
	onBtnCommitHandler : function() {
		this.onBtnReportHandler("commit");
	},
	onBtnCancelHandler : function() {
		this.onBtnReportHandler("cancel");
	},
	onBtnReportHandler : function(flag) {
		var records = Ext.getCmp('bayonetReportRecordGridPanel').getSelectionModel().getSelections();
		var kkbhs = '';
		var counts = 0;
		if (records.length > 0) {
			counts = records.length;
			for (var i = 0; i < records.length; i++) {
				if (kkbhs != '') {
					kkbhs = kkbhs + ',';
				}
				kkbhs = kkbhs + records[i].data.KKBH;
			}
			this.bayonetReportInfo(kkbhs, flag, counts);
		} else {
			var msg = "";
			if (records.length == 0) {
				msg = "请选择要操作的记录！";
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = msg;
				win.show();
			}
		}
	},
	parseFloatValue : function (key) {
		var value = Math.round(key * 100)/100;
		return value;
	},
	bayonetReportInfo : function(kkbhs, flag, counts) {
		var msg = "";
		if (counts != 0) {
			msg = "是否对选择的" + counts + "个卡口执行操作！";
		} else {
			msg = "不勾选情况下，系统将按当前查询条件查询到的记录执行操作！";
		}
		Ext.MessageBox.confirm("确认", msg, function(v) {
			if ("yes" == v) {
				var win = new Jinpeng.bayonetReport.AddBayonetReportWindow();
				win.flag = flag;
				win.loadRecordById(kkbhs);
				/*Ext.Ajax.request({
					method : "POST",
					params : {
						"mounts" : Ext.getCmp('directions').getValue(),
						"status" : Ext.getCmp('status').getValue(),
						"kkbhs" : kkbhs,
						"flag" : flag
					},
					url : rootpath + "/bayonetReport/commitReport.mvc",
					success : function(response, options) {
						var grid = Ext.getCmp('bayonetReportRecordGridPanel');
						if(grid){
							grid.publish("clearGridSelections",[]);
							grid.store.reload();
						}
					},
					failure : function(response, options) {
						var win = new Jinpeng.widget.MessageWindow();
						win.msg = '操作失败！';
						win.show();
					},
					scope : this
				});*/
			}
		});
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

//报备操作弹出窗口
Jinpeng.bayonetReport.AddBayonetReportWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	layout : "fit",
	width : 400,
	title : "报备提交窗口",
	height : 150,
	stateful : false,
	closeAction : "close",
	stateful : false,
	plain : true,
	modal : true,
	border : false,
	addNewFlag : false,
	flag : '',
	initComponent : function() {
		Ext.apply(this, {
			bodyStyle : {
				"padding-top" : '5px'
			},
			items : [ {
				xtype : 'panel',
				framse : true,
				autoScroll : true,
				labelAlign : 'right',
				items : [ {
					xtype : 'form',
					labelWidth : 120,
					id : 'bayonetReportDetailForm',
					defaults : {
						margins : '5 2 5 2'
					},
					items : [ {
						xtype : 'textarea',
						fieldLabel : '故障描述',
						name : 'remark',
						anchor : '97.5%',
						maxLength : 300,
						maxLengthText : '故障描述不能超过300个字符'
					}, {
						xtype : 'hidden',
						id : 'id'
					} ]
				} ]
			} ],
			bbar : {
				cls : 'blue-button-ct',
				buttonAlign : 'center',
				buttons : [ {
					xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;确认&nbsp;&nbsp;&nbsp;',
					scope : this,
					id : 'confirmBtn',
					handler : this.addBayonetReportHandler
				}, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', {
					xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;',
					scope : this,
					id : 'cancelBtn',
					handler : function() {
						this.close();
					}
				} ]
			}
		});
		Jinpeng.bayonetReport.AddBayonetReportWindow.superclass.initComponent.apply(this);
	},
	addBayonetReportHandler : function(btn) {
		var formPanel = Ext.getCmp('bayonetReportDetailForm');
		var datas = formPanel.getForm().getFieldValues();
		this.doAddBayonetReport(datas, btn);
	},
	doAddBayonetReport : function(datas, btn) {
		btn.disable();
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"remark" : datas.remark,
				"kkbhs" : datas.id,
				"flag" : this.flag
			}),
			url : rootpath + '/bayonetReport/commitReport.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				if (result > 0) {
					var grid = Ext.getCmp('bayonetReportRecordGridPanel');
					if(grid){
						grid.publish("clearGridSelections",[]);
						grid.store.reload();
					}
					this.close();
				}
			},
			failure : function(response, options) {
				msg = "卡口报备操作失败";
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = msg;
				win.show();
				btn.enable();
			},
			scope : this
		});
	},
	loadRecordById : function(kkbhs) {
		var detailForm = Ext.getCmp('bayonetReportDetailForm');
		detailForm.form.findField('id').setValue(kkbhs);
		this.show();
	}
});

Ext.reg('bayonetReportInfoDataPanel', Jinpeng.bayonetReport.BayonetReportInfoDataPanel);
Ext.reg('bayonetReportInfoCenterGridPanel',Jinpeng.bayonetReport.BayonetReportInfoCenterGridPanel);
