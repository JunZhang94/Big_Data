/**
 * 定时任务管理
 */
Ext.ns('Jinpeng.task');

var viewPort = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'north',
			height :70,
			border : false,
			xtype : 'taskStatisticsForm'
		}, {
			region : 'center',
			border : false,
			xtype : 'taskStatisticsGrid'
		}]
	});
});

/**
 * 定时任务管理Form
 */
Jinpeng.task.TaskStatisticsFormPanel = Ext.extend(Ext.Panel, {
	initComponent : function() {
	    //任务名称
		var taskTypeStore = new Ext.data.JsonStore({
						url : rootpath
								+ "/dictionary/jsonDictsInCombo.mvc?code=taskNameType",
						root : "data",
						fields : [ 'id', 'text' ],
						autoLoad : false
					});
		//状态
		var taskStatusStore = new Ext.data.JsonStore({
						url : rootpath
								+ "/dictionary/jsonDictsInCombo.mvc?code=taskStatus",
						root : "data",
						fields : [ 'id', 'text' ],
						autoLoad : false
					});
		var endTime = Date.parseDate(Ext.util.Format.date(
			new Date(), 'Y-m-d')
			+ " " + "23:59:59", 'Y-m-d H:i:s');
	 
		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'taskStatisticsForm',
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
					columns :4
				},
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
				  items : [{
							xtype : 'tcombo',
							id : 'taskNameType',
							name : 'taskNameType',
							fieldLabel : '任务名称',
							store : taskTypeStore,
							mode : 'local',
							emptyText : '------请选择任务------',
							triggerAction : 'all',
							valueField : 'id',
							displayField : 'text',
							anchor : '94%'
						}]
				},{
					 items : [{
							xtype : 'tcombo',
							id : 'taskStatus',
							name : 'taSkstatus',
							fieldLabel : '状态',
							store : taskStatusStore,
							mode : 'local',
							emptyText : '---请选择状态---',
							triggerAction : 'all',
							valueField : 'id',
							displayField : 'text',
							anchor : '94%'
						}]
				},{
					items : [{
									xtype : 'spacer'
							}]
				},{
					items : [{
									xtype : 'spacer'
							}]
				},{
					items : [ {
//						xtype : 'datetimefield',
//						name : 'startTime',
//						id : 'startdate',
//						fieldLabel : '开始时间',
//						editable : false,
//						value : new Date().format('Y-m-d'),
//						vtype: 'beginEndDate',
//						endDateField : 'enddate',
//						anchor : '94%'
						
						xtype : 'textfield',
						name : 'startTime',
						id : 'startdate',
						fieldLabel : '开始时间',
						allowBlank : false,
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
				},{
					items : [ {
//						xtype : 'datetimefield',
//						name : 'endTime',
//						id : 'enddate',
//						fieldLabel : '结束时间',
//						editable : false,
//						value : endTime,
//						vtype: 'beginEndDate',
//						startDateField : 'startdate',
//						anchor : '94%'
						
						xtype : 'textfield',
						name : 'endTime',
						id : 'enddate',
						fieldLabel : '结束时间',
						editable : false,
						allowBlank : false,
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
				},{
					bodyStyle : 'padding-left:10px',
						xtype : 'compositefield',
						items : [{
							xtype : 'button',
							flex : 31,
							id : "searchBut1",
							text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
							handler :  this.deviceCheck
						},{
							flex : 31,
							xtype : 'button',
							id : "resetBut1",
							text : '&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;',
							handler : function(){
							   Ext.getCmp('taskStatisticsForm').getForm().reset();
							}
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
			}],listeners : {
					afterrender : function() {
						//任务名称
						taskTypeStore.load();
						//任务状态
						taskStatusStore.load();
					}
				}
		});
		Jinpeng.task.TaskStatisticsFormPanel.superclass.initComponent.apply(this);
		
	},
	deviceCheck : function() {
		var form = Ext.getCmp('taskStatisticsForm');
		if(form.getForm().isValid()) {
			var grid = Ext.getCmp('TaskStatisticsFormPanel');
			grid.store.baseParams = {};
			var baseparams = {
				'orgId' : Ext.getCmp('orgId').getValue(),
				'orgType' : Ext.getCmp('orgType').getValue(),
				'taskName':(Ext.getCmp('taskNameType').getValue() == null ? -1 : Ext.getCmp('taskNameType').getValue()),
				'startTime' : Ext.getCmp('startdate').getValue(), //Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'),
				'endTime' : Ext.getCmp('enddate').getValue(), //Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d H:i:s'),
				'page.start':0,
				'status': Ext.getCmp('taskStatus').getValue()== null ? -1:Ext.getCmp('taskStatus').getValue(),
				'page.limit': Jinpeng.PageSize 
				
			};
			grid.store.baseParams = baseparams;
			grid.store.load({
				
			});
		}
	}
	
	
});

/**
 * 定时任务管理统计Grid
 */
Jinpeng.task.TaskStatisticsGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'TaskStatisticsFormPanel',
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var _panel = this;
		var commuServerStore = new Ext.data.JsonStore({
			url : rootpath+ "/dc/taskInfo.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
		          {name : 'ID'},
		          {name : 'TASK_NAME'},
		          {name : 'START_TIME'},
		          {name : 'END_TIME'},
		          {name : 'FOLLOW_START_TIME'},
		          {name : 'FOLLOW_END_TIME'},
		          {name : 'STATUS'},
		          {name : 'STATUS_UPDATE_TIME'},
		          {name : 'TASK_PARAM'},
		          {name : 'CAR_NUM'},
		          {name : 'VALID_TIME'},
		          {name : 'FOLLOW_TIMES'},
		          {name : 'START_TIME'},
		          {name : 'END_TIME'},
		          {name : 'MOUNTS_NUMBER'},
		          {name : 'MOUNTS_NAME'},
		          {name : 'RESULT'}
	          ]
		});
		var sm = new Ext.grid.CheckboxSelectionModel();
		Ext.apply(this, {
			store :  commuServerStore,
			selModel : sm,
			colModel : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
		           new Ext.ux.grid.PagingRowNumberer({ width : 40 }),
		           {
		        	   header : '任务名称', 
		        	   dataIndex : 'TASK_NAME',
		        	   renderer : function(value, metaData, record, rowIndex, colIndex, store) {
		        	   		var str = "";
		        	   		if (value == '跟随车分析') {
		        	   			str = value;
		        	   		} else {
		        	   			str = value.substring(0,value.indexOf(2));
		        	   		}
		        	   		var id = record.data.ID;
		        	   		var carNum = record.data.CAR_NUM;
		        	   		var validTimes = record.data.VALID_TIME;
		        	   		var followTimes = record.data.FOLLOW_TIMES;
		        	   		var startTime = record.data.FOLLOW_START_TIME;
		        	   		var endTime = record.data.FOLLOW_END_TIME;
		        	   		var kkmcs = record.data.MOUNTS_NAME;
		        	   		var kkbhs = record.data.MOUNTS_NUMBER;
		        	   		var state = record.data.STATUS;
		        	   		var result = record.data.RESULT;
		        	   		if (str == '跟随车分析' && result == '分析完成') {
		        	   			if (state == '完成' || state == '结束' ) {
		        	   			str = "<a href='#' onclick=\"showFollowPage('" + id + "','" + carNum + "','" + validTimes + "','" + followTimes + "','" + startTime + "','" + endTime + "','" + kkbhs + "','" + kkmcs + "')\">" + str + "</a>"
		        	   			}
	        	   			}
		        	        return str;
					   } 
		           },
		           {header : '分析车牌', dataIndex : 'CAR_NUM'},
		           {header : '状态', dataIndex : 'STATUS'},
		           {header : '分析状态', dataIndex : 'RESULT'},
		           {header : '开始时间', dataIndex : 'START_TIME',
		        	   renderer : function(value) {
		          			return value.substring(0,value.indexOf("."));
				   }},
		           {header : '结束时间', dataIndex : 'END_TIME',
					   renderer : function(value) {
	          			  return value.substring(0,value.indexOf("."));
				   }},
		           {header : '更新时间', dataIndex : 'STATUS_UPDATE_TIME',
					   renderer : function(value) {
	          		      return value.substring(0,value.indexOf("."));
	          		   }
		           }/*,
		           {
		        	   header : '执行参数', dataIndex : 'TASK_PARAM',
	                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
		        	   		var str = '';
		        	   		if (value != '' && value != null && value != 'null') {
								//当文字过多的时候，鼠标移上去就给悬浮狂提示
		        	   			str = '<font ext:qtip="'+value+'">'+value+'</font>';
		           			}
		        	   		return str;
						}
		        	   
		           }*/
	            ]
			}),
			bbar : new Jinpeng.widget.PagingToolbar( {
				id : 'PagingToolbar',
				store : commuServerStore,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			}),
			listeners : {
				afterrender : function() {
					var baseparams = {
						'startTime' : Ext.getCmp('startdate').getValue(),
						'endTime' : Ext.getCmp('enddate').getValue()
					};
					commuServerStore.baseParams = baseparams;
					commuServerStore.load({
						params : {'page.start' : 0, 'page.limit' : this.pageSize}
					});
				}
			}
		});
		Jinpeng.task.TaskStatisticsGridPanel.superclass.initComponent.apply(this);
	}
});

function showFollowPage(id, carNum, validTimes, followTimes, startTime, endTime, kkbhs, kkmcs) {
	var win = new Jinpeng.task.FollowCarWindow({
		id : 'followCarResult',
		title : '跟随车分析结果'
	});
	win.datas = {
		'id' : id,
		'carNum' : carNum,
		'validTimes' : validTimes,
		'followTimes' : followTimes,
		'startTime' : startTime,
		'endTime' : endTime,
		'kkbhs' : kkbhs,
		'kkmcs' : kkmcs
	};
	win.show();
}

Ext.reg('taskStatisticsForm', Jinpeng.task.TaskStatisticsFormPanel);
Ext.reg('taskStatisticsGrid', Jinpeng.task.TaskStatisticsGridPanel);
