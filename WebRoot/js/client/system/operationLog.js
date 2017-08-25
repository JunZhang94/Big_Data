/**
 * 用户操作日志管理
 */
Ext.ns('Jinpeng.operation');

var viewPort = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'north',
			height : 70,
			border : false,
			xtype : 'logForm'
		}, {
			region : 'center',
			border : false,
			xtype : 'logGrid'
		}]
	});
});

/**
 * 日志管理Form
 */
Jinpeng.operation.logForm = Ext.extend(Ext.Panel, {
	initComponent : function() {
		//日志操作类型
		var operationTypeStore = new Ext.data.JsonStore({
			url : rootpath + "/dictionary/jsonDictsInCombo.mvc?code=OPERATION_TYPE",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false
		});
		
		//结束时间格式，，默认最后时刻
		var endDateStore = Date.parseDate(Ext.util.Format
			.date(new Date(), 'Y-m-d')+ " " + "23:59:59", 'Y-m-d H:i:s');
		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'logForm',
				border : false,
				frame : true,
				labelAlign : 'right',
				cls : 'blue-button-ct',
				
				layout : 'table',
				defaults : {
					width : 280,
					layout : 'form'
				},
				layoutConfig : {
					columns : 4
				},
				
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
					items : [{
						xtype : 'textfield',
						id : 'userName',
						fieldLabel : '操作人员',
						emptyText : '请输入用户名',
						regex : /^[a-zA-Z0-9_\u4e00-\u9fa5]{0,20}$/,
						regexText : '文本内容允许中文、英文、数字、下划线，长度介于0--20之间！',
						anchor : '94%'
					}]
				}, {
					items : [{
						xtype : 'tcombo',
						id : 'operationType',
						fieldLabel : '操作类型',
						emptyText : '全部',
						store : operationTypeStore,
						mode : 'local',
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'text',
						anchor : '94%'
					}]
				}, {
					items : [{
						xtype: 'compositefield',
						anchor : '94%',
						items: [ {
				        	xtype : 'checkbox',
							id : 'unusualLog',
							fieldLabel: '异常日志',
							tooltip : {
								text : "异常日志功能可在系统设置里面设置！"
							},
							name : 'unusualLog',
							value : false,
							checked : false
				        }]
					}]
				}, {
					xtype : 'spacer'
				}, {
					items : [ {
//						xtype : 'datetimefield',
//						name : 'startTime',
//						id : 'startdate',
//						fieldLabel : '开始时间',
//						value : new Date().format('Y-m-d'),
//						editable : false,
//						vtype: 'beginEndDate',
//						endDateField : 'enddate',
//						anchor : '94%'
						
						xtype : 'textfield',
						name : 'startTime',
						id : 'startdate',
						fieldLabel : '开始时间',
						editable : false,
						value : new Date().format('Y-m-d') + ' 00:00:00',
						anchor : '94%',
						style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
						listeners  : {   
			            	'focus':function(field){  
								var endTime = Ext.util.Format.date(
										new Date(), 'Y-m-d H:i:s');
								var enddate = Ext.getCmp("enddate").getValue();
								//  日期时间的默认参数      
							    var defaultDateTimeParams = new function()   
							    {   
							        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
							        this.startDate  = endTime;    //  开始时间   
							        this.maxDate = enddate;
							        this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';  //  格式化时间   
							        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
							        this.alwaysUseStartDate = false;           //  默认使用初始时间   
							    };  
			                    WdatePicker(defaultDateTimeParams);   
			                    field.blur();
			             	}   
						}  
					} ]
				}, {
					items : [ {
//						xtype : 'datetimefield',
//						name : 'endTime',
//						id : 'enddate',
//						fieldLabel : '结束时间',
//						value : endDateStore,
//						editable : false,
//						vtype: 'beginEndDate',
//						startDateField : 'startdate',
//						anchor : '94%'
						
						xtype : 'textfield',
						name : 'endTime',
						id : 'enddate',
						fieldLabel : '结束时间',
						editable : false,
					//	allowBlank : false,
						value : new Date().format('Y-m-d') + ' 23:59:59',
						anchor : '94%',
						style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
						listeners  : {   
			            	'focus':function(field){  
								var endTime = Ext.util.Format.date(
										new Date(), 'Y-m-d H:i:s');
								var startdate = Ext.getCmp("startdate").getValue();
								//  日期时间的默认参数      
							    var defaultDateTimeParams = new function()   
							    {   
							        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
							        this.startDate  = endTime;    //  开始时间   
							        this.minDate = startdate;
							        this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';  //  格式化时间   
							        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
							        this.alwaysUseStartDate = false;           //  默认使用初始时间   
							    };  
			                    WdatePicker(defaultDateTimeParams);   
			                    field.blur();
			             	}   
						} 
					} ]
				}, {
					items : [{
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
						id : 'searchBut',
						handler : this.deviceCheck
					}]
				}]
			}],
			listeners : {
				afterrender : function() {
					operationTypeStore.load();
				}
			}
		});
		Jinpeng.operation.logForm.superclass.initComponent.apply(this);
		//this.disableComponents();
	},
	deviceCheck : function() {
		var form = Ext.getCmp('logForm');
		if(form.getForm().isValid()) {
			var grid = Ext.getCmp('logDataGrid');
			grid.store.baseParams = {};
			var baseparams = {
				'userName' : Ext.getCmp('userName').getValue(),
				'operationType' : Ext.getCmp('operationType').getValue(),
				'startTime' : Ext.getCmp('startdate').getValue(), //Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'),
				'endTime' : Ext.getCmp('enddate').getValue(), //Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d H:i:s'),
				'unusualLog' : (Ext.getCmp('unusualLog').getValue() == true ? 1: 0)
			};
			grid.store.baseParams = baseparams;
			grid.store.load({
				params : {'page.start' : 0, 'page.limit' : Jinpeng.PageSize}
			});
		}
	},
	disableComponents : function() {
		var panel = this;
		Ext.getCmp('unusualLog').on('check', function(node, checked) {
			Ext.getCmp('startdate').setDisabled(checked);
			Ext.getCmp('enddate').setDisabled(checked);
		});
	}
});

/**
 * 操作日志管理Grid
 */
Jinpeng.operation.logGrid = Ext.extend(Ext.grid.GridPanel, {
	id : 'logDataGrid',
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var operationStore = new Ext.data.JsonStore({
			url : rootpath+ "/operationLog/queryOperationLog.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
		          {name : 'ID'},
		          {name : 'USERCODE'},
		          {name : 'CONTENT'},
		          {name : 'GENERATETIME'},
		          {name : 'REMARK'},
		          {name : 'LOG_TYPE'},
		          {name : 'USER_IP'}
	          ]
		});
		var sm = new Ext.grid.CheckboxSelectionModel();
		Ext.apply(this, {
			store :  operationStore,
			selModel : sm,
			colModel : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
			           new Ext.ux.grid.PagingRowNumberer({ width : 40 }),
			           //sm,
			           {header : '操作用户', dataIndex : 'USERCODE',width : 30},
			           {header : 'IP地址', dataIndex : 'USER_IP',width : 40},
			           {header : '操作类型', dataIndex : 'LOG_TYPE',width : 20,
							renderer : function(key) {
							return window.dictionary.getValue("OPERATION_TYPE", key);
						}},
			           {header : '操作时间', dataIndex : 'GENERATETIME',width : 40
							, renderer : function(value) {
			        	        return value.substring(0,value.indexOf("."));
						   }
						},
			           {
							header : '主要内容',
							dataIndex : 'CONTENT',
							width : 80,
		                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
								//当文字过多的时候，鼠标移上去就给悬浮狂提示
							     var zynr = value.replace(/null/g,'&nbsp;&nbsp;&nbsp;无&nbsp;&nbsp;&nbsp;');
						     	 return '<font ext:qtip="'+zynr+'">'+zynr+'</font>';
							}
						},
			           {
							header : '描述', dataIndex : 'REMARK',width : 60,
		                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
								//当文字过多的时候，鼠标移上去就给悬浮狂提示
						     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
							}
					   }
	            ]
			}),
			bbar : new Jinpeng.widget.PagingToolbar({
				/* 添加样式所需id */
				id : "PagingToolbar",
				store : operationStore,
				displayInfo : true,
				emptyMsg : "无数据",
				pageSize : this.pageSize
			}),
			listeners : {
				afterrender : function() {
					operationStore.load({
						params : {'page.start' : 0, 'page.limit' : this.pageSize}
					});
				}
			}
		});
		Jinpeng.operation.logGrid.superclass.initComponent.apply(this);
	}
});


Ext.reg('logForm', Jinpeng.operation.logForm);
Ext.reg('logGrid', Jinpeng.operation.logGrid);
