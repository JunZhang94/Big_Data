/**
 * 布控车辆
 */
Ext.ns("Jinpeng.controlVerify");
var config = {
	combURL : rootpath + '/dictionary/jsonDictsInCombo.mvc'
};

var firstQuery = true;

Jinpeng.controlVerify.DafaultParam = {
	'page.start' : 0,
	'page.limit' : Jinpeng.PageSize,
	'beginDate' : new Date().format('Y-m-d'),
	'endDate' : (new Date()).clearTime().add(Date.DAY, 1).add(Date.SECOND, -1),
};

function showCarPlace(carNum){
	var orgId = '';
	var orgType = '';
	var kkbhs = '';
	var startTime = Ext.getCmp('beginDate').getValue();
	var endTime = Ext.getCmp('endDate').getValue();
	var mainParam = {
		'orgId' : orgId,
		'orgType' : orgType,
		'kkbhs' : kkbhs,
		'startTime' : startTime,
		'endTime' : endTime,
		'carNum' : carNum
		};
	var win = new Jinpeng.carFrequency.CarFrequencyWindow({
		cls : 'system_mod',
		modal : true
		});
	win.init(mainParam);
	win.show();
	}

Ext.onReady(function() {
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'north',
			xtype : 'searchformpanel',
			border : false,
			height : 90
			},{
			region : 'center',
			border : false,
			xtype : 'querycontrolcargrid'
			}]
		});
	//默认加载查询功能
	Ext.getCmp('searchForm').queryDataByKeyword();
});

/**
 * @class 布控查询面板
 */
Jinpeng.controlVerify.SearchFormPanel = Ext.extend(Ext.Panel, {
	id:"searchForm",
	defaults : {
		margins : '0 0 0 4'
		},
	initComponent : function() {

		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'querCarSearchForm',
				ref : "../formPanel",
				labelWidth : 80,
				border : false,
				labelAlign : "right",
				cls : 'blue-button-ct',
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD',
				layout : "ttable",
				layoutConfig : {
					columns : 3
					},
				frame : true,
				items : [{
					xtype : 'compositefield',
					fieldLabel : '车牌号码',
					msgTarget : 'side',
					width : 145,
					cellWidth : 250,
					items : [{
						xtype : 'tcombo',
						flex : 0.4,
						editable : false,
						store : new Ext.data.JsonStore({
							url : config.combURL,
							baseParams : {
								code : 'LicPlate'
								},
							root : 'data',
							fields : [ 'id', 'text' ]
							}),
						mode : 'local',
						id : 'province',
						name : 'province',
						emptyText : '全部',
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'text',
						editable : false,
						anchor : '30%'
						},{
						xtype : 'textfield',
						name : 'carNumber',
						id:'carNumber',
						flex : 0.6,
						emptyText : '请输入车牌',
						vtype : 'carNumSuffix',
						anchor : '70%'
						}]
					},{
					xtype : 'surveytypecombo',
					name : 'surType',
					id : 'surType',
					fieldLabel : '&nbsp;&nbsp;布控类型',
					editable : false,
					mode : 'local',
					emptyText : '请选择布控类型',
					valueField : 'id',
					displayField : 'text',
					stateful : false,
					triggerAction : 'all',
					width : 145,
					store : new Ext.data.JsonStore({
						url : config.combURL,
						baseParams : {
							code : 'ControlType'
							},
						root : 'data',
						fields : [ 'id', 'text' ]
						})
					},{
					//xtype : 'spacer'
					xtype : 'tcombo',
					name : 'carBrand',
					id : 'carBrand',
					fieldLabel : '&nbsp;&nbsp;车辆品牌',
					width : 145,
					editable : false,
					mode : 'local',
					emptyText : '全部',
					valueField : 'id',
					displayField : 'text',
					stateful : false,
					triggerAction : 'all',
					store : new Ext.data.JsonStore({
						url : rootpath
						+ "/dictionary/jsonCarBrandInCombo.mvc",
						root : 'data',
						fields : [ 'id', 'text' ]
						}),
					listeners : {
					     select : function(combo, record2, index) {
							var cllxMode = new Ext.data.JsonStore({
								url : encodeURI(rootpath+"/dictionary/jsonCarTypeInCombo.mvc?carBrand="+record2.data['text']),
								root : "data",
								fields : [ 'id', 'text' ],
								autoLoad:false,
								autoSync:true
								});
							cllxMode.load({
							    scope: this,
								    callback: function(records, operation, success) {
								        var listRecord = new Array();
										if(cllxMode instanceof Ext.data.Store){  
											cllxMode.each(function(result){  
									        	listRecord.push(result.data['text']);  
									        	}); 
										 	}
										Ext.getCmp('carType').clearValue();
										Ext.getCmp('carYear').clearValue();
										Ext.getCmp('carType').getStore().loadData(listRecord);
								    	}
								});

					     	}
						}
					},{
					xtype : 'textfield',
					name : 'beginDate',
					id : 'beginDate',
					width:145,
					allowBlank : false,
				    editable : false,
				    fieldLabel : '开始时间',
					value : new Date().format('Y-m-d') + ' 00:00:00',
					anchor : '94%',
					style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
					listeners  : {   
		            	'focus':function(field){  
							var endTime = Ext.util.Format.date(
									new Date(), 'Y-m-d H:i:s');
							var endDate = Ext.getCmp("endDate").getValue();
							//  日期时间的默认参数      
						    var defaultDateTimeParams = new function()   
						    	{   
						        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
						        this.startDate  = endTime;    //  开始时间   
						        this.maxDate = endDate;
						        this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';  //  格式化时间   
						        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
						        this.alwaysUseStartDate = false;           //  默认使用初始时间   
						    	};  
		                    WdatePicker(defaultDateTimeParams);   
		                    field.blur();
		             		}   
						}   
					
					},{
					xtype : 'textfield',
					fieldLabel : '结束时间',
					allowBlank : false,
				    editable : false,
					width:145,
					name : 'endDate',
					id : 'endDate',
					value : new Date().format('Y-m-d') + ' 23:59:59',
					anchor : '94%',
					style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
					listeners  : {   
		            	'focus':function(field){  
							var endTime = Ext.util.Format.date(
									new Date(), 'Y-m-d H:i:s');
							var beginDate = Ext.getCmp("beginDate").getValue();
							//  日期时间的默认参数      
						    var defaultDateTimeParams = new function()   
						    	{   
						        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
						        this.startDate  = endTime;    //  开始时间   
						        this.minDate = beginDate;
						        this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';  //  格式化时间   
						        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
						        this.alwaysUseStartDate = false;           //  默认使用初始时间   
						    	};  
		                    WdatePicker(defaultDateTimeParams);   
		                    field.blur();
		             		}   
						} 
					},{
					bodyStyle : 'padding-left:10px',
					xtype : 'compositefield',
					items : [{
						flex : 31,
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
						id : "searchBut",
						handler : this.queryDataByKeyword
						},{
						flex : 31,
						xtype : 'button',
						id : "resetBut",
						text : '&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;',
						handler : this.resetMethod
						}]
					}]
				}]
			});
		Jinpeng.controlVerify.SearchFormPanel.superclass.initComponent.apply(this);
		// 初始化页面参数
		Ext.each([ "province", "surType","carBrand" ], function(item, index, allItems) {
			Ext.getCmp(item).store.load();
			});
		},
		queryDataByKeyword : function() {

			var grid = Ext.getCmp('ControlInfoGridPanel');
			if (grid) {
				var formPanel = Ext.getCmp("querCarSearchForm");
				firstQuery = false;
				grid.store.baseParams = {};// 重置getCarNum
				var names = [ "carNumber","surType", "beginDate", "endDate","carBrand"];
				Ext.each(names, function(item, index, items) {
					if ("carNumber" == item) {
						var province = formPanel.form.findField('province').getRawValue();
						var carNum = formPanel.form.findField(item).getRawValue();
						var carNumber="";
						if(province !="" && province.length>0){
							carNumber=carNumber+province;
						}
						if(carNum !="" && carNum.length>0){
							carNumber=carNumber+"*"+carNum+"*";
						}
						grid.store.baseParams[item] = carNumber;
					} else if ("beginDate" == item ) {
						grid.store.baseParams[item] = Ext.getCmp("beginDate").getValue();
					}else if ("endDate" == item) {
						grid.store.baseParams[item] = Ext.getCmp("endDate").getValue();
					}else {
						grid.store.baseParams[item] = formPanel.form.findField(item).getValue();
					}
				});
				this.publish("clearGridSelections", []);
				grid.store.load({
					params : {
						'page.start' : 0,
						'page.limit' : grid.pageSize
						}
					});
			}
		},
	resetMethod :  function() {
		Ext.getCmp("querCarSearchForm").getForm().reset();
		}
	});

/**
 * @class 布控信息列表
 */
Jinpeng.controlVerify.QueryContorlCarGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'ControlInfoGridPanel',
	autoLoad : false,
	stripeRows : true,
	enableHdMenu : false,
	pageSize : Jinpeng.PageSize,
	stateful : false,
	border : false,
	initComponent : function() {
		var store = new Ext.data.JsonStore({
			url : rootpath + '/controlManager/queryControl.mvc?queryType=verify',
			root : 'result',
			totalProperty : 'totalCount',
			fields : [ {
				name : 'BKXXBH'
			}, {
				name : 'HPHM'
			}, {
				name : 'BKLX'
			},{
				name : 'BKLB'
			},{
				name : 'CLPP'
			},{
				name : 'CATEGORY'
			},{
				name : 'BKZT'
			}, {
				name : 'BKSK'
			}, {
				name : 'BKLEN'
			}, {
				name : 'BKDW'
			}, {
				name : 'BKR'
			}, {
				name : 'SHZT'
			}, {
				name : 'ORGNAME'
			} ]
		});
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this, {
			store : store,
			selModel : sm,
			colModel : new Ext.grid.ColumnModel({
				defaults : {
					align : 'center',
					sortable : false
					},
				columns : [ new Ext.ux.grid.PagingRowNumberer(), sm, {
					width : 60,
					header : '车牌号码',
					dataIndex : 'HPHM'
					},{
					header : '车辆品牌',
					width : 60,
					dataIndex : 'CLPP'
					},{
					header : '车辆类别',
					width : 60,
					dataIndex : 'CATEGORY'
					},{
					header : '布控类型',
					width : 80,
					dataIndex : 'BKLX',
					renderer : function(value, metadata, record, rowIndex, colIndex, store) {
						return window.dictionary.getValue("ControlType", value);
						}
					},{
					header : '布控类别',
					width : 80,
					dataIndex : 'BKLB',
					renderer : function(value, metadata, record, rowIndex, colIndex, store) {
						return window.dictionary.getValue("ControlCategory", value);
						}
					},{
					header : '布控时间',
					width : 120,
					dataIndex : 'BKSK',
					renderer : function(value) {
						return value.substring(0,value.indexOf("."));
						}
					
					},{
					header : '失效时间',
					width : 120,
					dataIndex : 'BKLEN',
					renderer : function(value) {
			          return value.substring(0,value.indexOf("."));
					}
						
					},{
					header : '布控单位',
					dataIndex : 'BKDW',
					renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
					    if(value==null || value ==''){
					    	//当文字过多的时候，鼠标移上去就给悬浮狂提示
					    	var bkdw = '&nbsp;';
				     	    return '<font ext:qtip="'+bkdw+'">'+bkdw+'</font>';
					    }else{
					    	//当文字过多的时候，鼠标移上去就给悬浮狂提示
				     	    return '<font ext:qtip="'+value+'">'+value+'</font>';
					    	}
						
						}
					},{
					header : '布控人',
					width : 70,
					dataIndex : 'BKR',
					renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
						//当文字过多的时候，鼠标移上去就给悬浮狂提示
				     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
						}
					},{

					header : '操作',
					xtype : 'actiontextcolumn',
					width : 60,
					align : 'center',
					items : [{
						tooltip : '审核',
						text : '审核',
						textStyle : 'color:blue;cursor:pointer',
						scope : this,
						handler : this.onDetailHandler
						}]

					}]
				}),
			tbar : {
				cls : 'blue-button-ct',
				style : 'margin-left:5px',
				items : [{
					xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;审核&nbsp;&nbsp;&nbsp;',
					id : 'verifyBtn',
					handler : this.onControlVerifyHandler,
					scope : this
					}]
				},
			bbar : new Jinpeng.widget.PagingToolbar({
				id : 'PagingToolbar',
				store : store,
				displayInfo : true,
				pageSize : this.pageSize

				}),
				listeners : {
					afterrender : function() {
					},
			/*双击查看*/
			rowdblclick : function(grid, rowIndex, e ) {
				var record = grid.store.getAt(rowIndex);
				var win = new Jinpeng.controlVerify.ControlVerifyDetailWindow({
					title : '布控详情',
					//disableBtn : (record.get('BKZT') != Jinpeng.control.status.UNVERIFIED && record.get('BKZT') != Jinpeng.control.status.REVOKE_UNVERIFIED),
					disableBtn : false,
					ControlID : record.get("BKXXBH")
					});
				win.loadRecordById(record.get("BKXXBH"));
				}
			}
		});
		Jinpeng.controlVerify.QueryContorlCarGridPanel.superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Jinpeng.controlVerify.QueryContorlCarGridPanel.superclass.afterRender.apply(this);
		this.store.baseParams = Jinpeng.controlVerify.DafaultParam;
		this.store.load(); // 加载数据
		},
	onControlVerifyHandler : function() {
		if (this.isNoRecordSelected()) {
			var win = new Jinpeng.widget.MessageWindow();
			win.msg = '请选择需要处理的记录！';
			win.show();
		}else if (!this.isSameStatus()) {
			var win = new Jinpeng.widget.MessageWindow();
			win.msg = '只能批量处理相同状态的记录！';
			win.show();
		} else {
			var carIDAndCarNums = Ext.getCmp('ControlInfoGridPanel').getSelectIDAndCarNums();
			var ids = carIDAndCarNums[0];
			var carNums = carIDAndCarNums[1];
			var record = Ext.getCmp('ControlInfoGridPanel').getSelectionModel().getSelected();

			if (ids.length == 1) {
				var win = new Jinpeng.controlVerify.ControlVerifyDetailWindow({
					id : 'detailControlInfoWin',
					title : '布控详情',
					//disableBtn : (record.get('BKZT') != Jinpeng.controlVerify.status.UNVERIFIED && record.get('BKZT') != Jinpeng.control.status.REVOKE_UNVERIFIED),
					disableBtn :  false,
					ControlID : ids[0]
				});
				win.loadRecordById(ids[0]);
			} else {
				var verifyWindow = new Jinpeng.controlVerify.ControlVerifyWindow({
					//disableBtn : (record.get('BKZT') != Jinpeng.control.status.UNVERIFIED && record.get('BKZT') != Jinpeng.control.status.REVOKE_UNVERIFIED)
					disableBtn : false
					});
				verifyWindow.init({
					ids : ids.join(","),
					carNums : carNums.join(",")
				}).show();
			}
		}
	},
	onDetailHandler : function(grid, rowIndex, colIndex, item, event) {
		var record = grid.store.getAt(rowIndex);
		var win = new Jinpeng.controlVerify.ControlVerifyDetailWindow({
			title : '布控详情',
			//disableBtn : (record.get('BKZT') != Jinpeng.control.status.UNVERIFIED && record.get('BKZT') != Jinpeng.control.status.REVOKE_UNVERIFIED),
			disableBtn : false,
			ControlID : record.get("BKXXBH")
			});
		win.loadRecordById(record.get("BKXXBH"));
		},
	getSelectIDAndCarNums : function() {
		var records = Ext.getCmp('ControlInfoGridPanel').getSelectionModel().getSelections();
		var ids = [];
		var carNums = [];
		for ( var i = 0; i < records.length; i++) {
			ids.push(records[i].get('BKXXBH'));
			carNums.push(records[i].get('HPHM'));
			}
		return [ ids, carNums ];
	},
	isSameStatus : function() {
		var records = Ext.getCmp('ControlInfoGridPanel').getSelectionModel().getSelections();
		var status = null;
		for ( var i = 0; i < records.length; i++) {
			if (status != null && status != records[i].get('SHZT')) {
				return false;
				}
			status = records[i].get('SHZT');
			}
		return true;
		},
	isNoRecordSelected : function() {
		var records = Ext.getCmp('ControlInfoGridPanel').getSelectionModel().getSelections();
		return records.length == 0 ? true : false;
		}

	});
Jinpeng.controlVerify.ControlVerifyWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	width : 400,
	height : 200,
	disableBtn : true,
	cls : "blue-button-ct",
	constructor : function(config) {
		Ext.apply(this, config);
		this.fp = new Ext.form.FormPanel({
			region : 'center',
			border : false,
			url : this.url,
			margins : '5',
			defaults : {
				msgTarget : "side"
			},
			items : [ {
				xtype : 'compositefield',
				fieldLabel : '*',
				labelSeparator : "",
				labelStyle : 'color:red',
				blankText : "请选择同意或不同意",
				anchor : '-30',
				msgTarget : "side",
				defaults : {
					height : '20'
				},
				validateValue : function(value, preventMark) {
					var valid = false;
					this.eachItem(function(field) {
						if (field.getValue())
							valid = true;
					});
					if (!valid)
						this.markInvalid(this.blankText);
					return valid;
				},
				items : [ {
					boxLabel : '同意',
					xtype : 'radio',
					inputValue : '1',
					name : 'verifyResult'
				}, {
					boxLabel : '不同意',
					inputValue : '0',
					xtype : 'radio',
					name : 'verifyResult'
				} ]
			}, {
				xtype : 'textarea',
				name : 'suggestion',
				fieldLabel : '审核意见',
				anchor : '-30 50%',
				maxLength : 300,
				maxLengthText : '审核意见不能超过300个字符'
			} ]
		});
		this.buttons = [ {
			xtype : 'button',
			text : '&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;',
			handler : this.okHandler,
			id : 'confirmBtn',
			disabled : this.disableBtn
		}, {
			xtype : 'button',
			text : '&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;',
			id : 'closeBtn',
			handler : this.closeHandler
		} ];
		this.items = this.fp;
		Jinpeng.controlVerify.ControlVerifyWindow.superclass.constructor.apply(this, arguments);
	},
	init : function(options) {
		this.ids = options.ids || null;
		this.carNums = options.carNums || null;
		return this;
	},
	okHandler : function() {

		var window = this.ownerCt.ownerCt;
		var formPanel = window.fp;
		var form = formPanel.getForm();
		if (form.isValid()) {

			var params = form.getValues();
			params['ids'] = window.ids;
			params['carNums'] = window.carNums;

			Ext.Ajax.request({
				url : rootpath + '/controlManager/verifyControl.mvc',
				params : params,
				success : function(response, options) {
					window.close();
					json = response.responseText;
					var o = response.responseData || Ext.decode(json);
					var grid = Ext.getCmp('ControlInfoGridPanel');
					var records = grid.getSelectionModel().getSelections();
					var msg = "";
					if (o && o.data >= 1) {
						msg = "审核成功";
					} else {
						msg = "审核失败";
					}
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = msg;
					win.show();
					grid.publish("clearGridSelections", []);
					grid.store.reload();
				}
			});
		}
	},
	closeHandler : function() {
		var window = this.ownerCt.ownerCt;
		if (window)
			window.close();
	}
});

Ext.reg('searchformpanel', Jinpeng.controlVerify.SearchFormPanel);
Ext.reg('querycontrolcargrid', Jinpeng.controlVerify.QueryContorlCarGridPanel);
