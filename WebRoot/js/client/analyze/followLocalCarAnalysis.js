/**
 * 跟随车分析查询条件页面
 */
Ext.ns('Jinpeng.followCar');

var viewPort = null;
var currentPage = '';
var params;//查询条件
var queryUrl = '';
Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'north',
			height : 70,
			border : false,
			xtype : 'searchFollowCarForm'
		}, {
			region : 'center',
			border : false,
			xtype: 'taskStatisticsGrid'
		}]
	});
});

/**
 * 伴随车查询--Form
 */
Jinpeng.followCar.searchFollowCarForm = Ext.extend(Ext.Panel, {
	initComponent : function() {
	  
		//车牌号
		var carNumStore = new Ext.data.JsonStore({
			url : rootpath
					+ "/dictionary/jsonDictsInCombo.mvc?code=LicPlate",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false
		});
		
		var testStore = new Ext.data.JsonStore({
	        url: rootpath + "/dictionary/jsonDictsInCombo.mvc?code=ApprovalState",   
	        root: 'data',   
	        fields: ['id','text'],
	        autoLoad : false
		});
		
		var timeSpinner = new Ext.ux.form.SpinnerField({
			name : 'vilidTime',
			id : 'vilidTime',
			fieldLabel : '&nbsp;&nbsp;有效时间',
			width : 60,
			value : '5',
			tooltip : {
				text : "有效时间指的是主车跟伴随车经过同一个卡口的时间差"
			},
			cellWidth : 210,
			minValue : 1,
			maxValue : 30,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		
		var kakouSpinner = new Ext.ux.form.SpinnerField({
			name : 'kakouTimes',
			id : 'kakouTimes',
			fieldLabel : '&nbsp;&nbsp;跟随卡口数',
			width : 60,
			value : '3',
			tooltip : {
				text : "跟随卡口数指的是跟随车跟随主车所经过的卡口总数"
			},
			cellWidth : 210,
			minValue : 2,
			maxValue : 8,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		
		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'searchFollowCarForm',
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
					columns : 3
				},
				
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;border-bottom-color:#F7F7F7;',
				items : [{
					items : [{
                    	xtype : 'tcombo',
						id : 'carfnum',
						name:'carfnum',
						fieldLabel : '车牌号码',
						editable : true,
						store : carNumStore,
						mode : 'local',
						emptyText : '全部',
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'text',
						vtype : 'exactCarNum',
						anchor : '94%'
					}]
				},{
					items : [ {
						xtype : 'textfield',
						name : 'startTime',
						id : 'startdate',
						fieldLabel : '开始时间',
						value : new Date().format('Y-m-d') + ' 00:00:00',
						anchor : '96%',
						allowBlank : false,
						editable : false,
						style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
						listeners  : {   
			            	'focus':function(field){  
							    var endDate = Ext.getCmp("enddate").getValue();
								var endTime = Ext.util.Format.date(
										new Date(), 'Y-m-d H:i:s');
								//alert(endTime);
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
						
					} ]
				},{
					items : [ {
						xtype : 'textfield',
						name : 'endTime',
						id : 'enddate',
						fieldLabel : '结束时间',
						allowBlank : false,
						editable : false,
						value : new Date().format('Y-m-d') + ' 23:59:59',
						anchor : '96%',
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
						xtype: 'compositefield',
						anchor : '94%',
		                items: [ timeSpinner, {
	                    	flex : 0.6,
	                    	xtype : 'label',
	                    	text : '分钟'
	                    }]
					}]
				}, {
					items : [{
						xtype: 'compositefield',
						anchor : '94%',
		                items: [ kakouSpinner, {
	                    	flex : 0.6,
	                    	xtype : 'label',
	                    	text : '个'
	                    }]
					}]
				}, {
					bodyStyle : 'padding-left:10px',
					xtype : 'compositefield',
					items : [{
						flex : 31,
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
						id : "searchBut",
						handler : this.followCarTaskSearch
					},{
						flex : 31,
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;提交任务&nbsp;&nbsp;&nbsp;',
						id : "commitBut",
						handler : this.followCarCheck
					},{
						flex : 31,
						xtype : 'button',
						id : "resetBut",
						text : '&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;',
						handler : this.resetMethod
					}]
				},{
					items : [{
						xtype : 'hidden',
						id : 'kkmcs',
						name : 'kkmcs'
					}]
				},{
					items : [{
						xtype : 'hidden',
						id : 'kkbhs',
						name : 'kkbhs'
					}]
				}]
			}],
			listeners : {
				afterrender : function() {
					//车牌省Store
					carNumStore.load();
				}
			}
		});
		Jinpeng.followCar.searchFollowCarForm.superclass.initComponent.apply(this);
	},
	followCarTaskSearch : function(){
       	var grid = Ext.getCmp('taskInfoGridPael');
		grid.store.baseParams = {};
		var baseparams = {
			'car_num':(Ext.get('carfnum').getValue() =='全部'? '': Ext.get('carfnum').getValue()),
			'valid_time':Ext.getCmp('vilidTime').getValue(),
			'follow_times':Ext.getCmp('kakouTimes').getValue(),
			'taskName':'跟随车分析',
			'startTime' : Ext.getCmp('startdate').getValue(), //Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'),
			'endTime' : Ext.getCmp('enddate').getValue(), //Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d H:i:s'),
			'page.start':0,
			'page.limit': Jinpeng.PageSize 
			
		};
		grid.store.baseParams = baseparams;
		grid.store.load({
		});
	},
	followCarCheck : function() {
		var form = Ext.getCmp('searchFollowCarForm');
		var carNum = (Ext.get('carfnum').getValue() =='全部'? '': Ext.get('carfnum').getValue()).toUpperCase();
		if (carNum == '') {
			Ext.Msg.alert("提示","分析跟随车任务,车牌号码不能为空！");
			return false;
		}
		if(form.getForm().isValid()) {
			Ext.Msg.confirm('系统提示', '是否执行跟随车辆分析？', function(flag) {
				if (flag == 'yes') {
					commitTaskStore.baseParams = {};
					var baseparams = {
						"carFNum" : (Ext.get('carfnum').getValue() =='全部'? '': Ext.get('carfnum').getValue()).toUpperCase(),
						"startTime" : Ext.getCmp('startdate').getValue(), //Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'),
						"endTime" : Ext.getCmp('enddate').getValue(), //Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d H:i:s'),
						"vilidTime" : Ext.getCmp('vilidTime').getValue(),
						"kakouTimes" : Ext.getCmp('kakouTimes').getValue()
					};
					commitTaskStore.baseParams = baseparams;
					commitTaskStore.load({
						callback : function(o,response,success) {
							if (o != null && o != 'undefined' && o.length > 0) {
								saveFlag = o[0].data.saveFlag;
								var win = new Jinpeng.widget.MessageWindow();
								if (saveFlag == '1') {
									win.msg = '任务提交成功，请耐心等待分析结果完成后再查询！';
								} else {
									win.msg = '任务提交失败，请重新提交或者咨询管理员！';
								}
								var grid = Ext.getCmp('taskInfoGridPael');
								if(grid){
									grid.store.reload();
								}
								win.show();
							}
						}
					}); 
				} else {
					return false;
				}
			});
		}
	},
	resetMethod :  function() {
		Ext.getCmp("searchFollowCarForm").getForm().reset();
	}
});

var commitTaskdataFields = [
  {name : 'id'},
  {name : 'carNum'},
  {name : 'placeAndTime'},
  {name : 'image1'},
  {name : 'image2'},
  {name : 'image3'},
  {name : 'image4'},
  {name : 'image5'},
  {name : 'image6'},
  {name : 'image7'},
  {name : 'image8'},
  {name : 'image9'},
  {name : 'saveFlag'}
];


var dataFields = [
  {name : 'id'},
  {name : 'FOLLOW_CAR_NUM'},
  {name : 'placeAndTime'},
  {name : 'followTimes'},
  {name : 'image1'},
  {name : 'image2'},
  {name : 'image3'},
  {name : 'image4'},
  {name : 'image5'},
  {name : 'image6'},
  {name : 'image7'},
  {name : 'image8'},
  {name : 'image9'}
];

var commitTaskStore = new Ext.data.JsonStore({
	url : rootpath+ "/followCarLocal/commitTask.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	fields : commitTaskdataFields
});

/**
 * 定时任务管理统计Grid
 */
Jinpeng.followCar.TaskInfoGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'taskInfoGridPael',
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
		          {name : 'TASK_UPDATE_TIME'},
		          {name : 'TASK_PARAM'},
		          {name : 'CAR_NUM'},
		          {name : 'VALID_TIME'},
		          {name : 'FOLLOW_TIMES'},
		          {name : 'START_TIME'},
		          {name : 'END_TIME'},
		          {name : 'MOUNTS_NUMBER'},
		          {name : 'MOUNTS_NAME'},
		          {name : 'RESULT'},
		          {name : 'HAVEING_FLAG'},
		          {name : 'TASK_UPDATE_TIME_END'},
		          {name : 'alanyzeTime'}
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
		           {header : '车牌号码', dataIndex : 'CAR_NUM',
		        	   renderer : function(value, metaData, record, rowIndex, colIndex, store) {
		        	   		var str = value;
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
		        	   		var havingFlag = record.data.HAVEING_FLAG;
		        	   		if (str != null && result == '分析完成' && havingFlag == '1') {
		        	   			if (state == '完成' || state == '结束' ) {
		        	   				str = "<a href='#' onclick=\"showFollowPage('" + id + "','" + carNum + "','" + validTimes + "','" + followTimes + "','" + startTime + "','" + endTime + "','" + kkbhs + "','" + kkmcs + "')\">" + str + "</a>"
		        	   			}
		        	   		}
		        	        return str;
					   } 
		           },
		           {header : '分析状态', dataIndex : 'RESULT'},
		           {header : '开始时间', dataIndex : 'FOLLOW_START_TIME',
		        	   renderer : function(value) {
		          			return value.substring(0,value.indexOf("."));
				   }},
		           {header : '结束时间', dataIndex : 'FOLLOW_END_TIME',
					   renderer : function(value) {
	          			  return value.substring(0,value.indexOf("."));
				   }},
		           {header : '分析耗时', dataIndex : 'alanyzeTime',
					   renderer : function(value, metadata, record) {
					   	   var timeStr = "";
					   	   var startTime = record.get('TASK_UPDATE_TIME').split('.')[0];
					   	   var endTime = record.get('TASK_UPDATE_TIME_END');
					   	   if (endTime != null) {
					   		   endTime = endTime.split('.')[0];
					   		   var endDate = new Date(endTime.replace(/-/g,"/"));
		   	                   var startDate = new Date(startTime.replace(/-/g,"/"));
		   	                   //计算出相差天数
		   	                   var times = endDate.valueOf() - startDate.valueOf();
		   	                   var day = Math.floor(times/(1 * 24 * 60 * 60 * 1000)); //天
		   	                   //计算出小时数
		   	                   var leave1 = times%(1 * 24 * 60 * 60 * 1000)    //计算天数后剩余的毫秒数
		   	                   var hours = Math.floor(Math.floor(leave1/(3600*1000))); //时
		   	                   //计算相差分钟数
		   	                   var leave2 = leave1%(3600*1000)        //计算小时数后剩余的毫秒数
		   	                   var minutes = Math.floor(leave2/(60*1000))
		   	                   //计算相差秒数
		   	                   var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
		   	                   var seconds=Math.round(leave3/1000)
		   	                   if (day == 0) {
		   	                	   if (hours == 0) {
		   	                		   if (minutes == 0) {
		   	                			   timeStr = seconds + "秒";
		   	                		   } else {
		   	                			   timeStr = minutes + "分" + seconds + "秒";
		   	                		   }
		   	                	   } else {
		   	                		   timeStr = hours + "时" + minutes + "分" + seconds + "秒";
		   	                	   }
		   	                   } else {
	 	                		   timeStr = day + "天" + hours + "时" + minutes + "分" + seconds + "秒";
		   	                   }
					   	   }
	   	                   return timeStr;
	          		   }
		           }
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
						params : {'taskName':'跟随车分析', 'page.start' : 0, 'page.limit' : this.pageSize}
					});
					
				}
			}
		});
		Jinpeng.followCar.TaskInfoGridPanel.superclass.initComponent.apply(this);
	}
});

//结果跳转
function showFollowPage(id, carNum, validTimes, followTimes, startTime, endTime, kkbhs, kkmcs) {
	var form = Ext.getCmp('searchFollowCarForm');
	if (form.getForm().isValid()) {
		currentPage = "<span style='font-size:18px;color:#FFFFFF;'>分析研判&nbsp>>&nbsp</span><a href='#' style='font-size:16px;color: #FFFFFF;text-decoration:none;' onclick='currentPages()'>跟随车分析</a>";
		var url = rootpath + '/followCarLocal/followCarResultPage.mvc';
		queryUrl =  "/region/regionQueryNewTwo.mvc";
		var title = '跟随车分析结果';
		params = {
			'id' : id,
			'carNum' : carNum,
			'validTimes' : validTimes,
			'followTimes' : followTimes,
			'startTime' : startTime,
			'endTime' : endTime,
			'kkbhs' : kkbhs,
			'kkmcs' : kkmcs
		};
		var win = window.open(rootpath + "/user/toMainInfo.mvc");
		var bodyText = '<html><body>';  
		bodyText = '<form action="' + rootpath + '/user/toMainInfo.mvc" method="post">';  
		bodyText += '<input type="hidden" name="urlStr" value="'+ url +'" />';  
		bodyText += '<input type="hidden" name="title" value="'+ title +'" />';  
		bodyText += '</form></body></html>';  
		win.document.write(bodyText);  
		win.document.forms[0].submit(); //打开url新页面，然后直接post提交form，并且传递参数  
		win.focus();
	}
}

Ext.reg('searchFollowCarForm', Jinpeng.followCar.searchFollowCarForm);
Ext.reg('taskStatisticsGrid', Jinpeng.followCar.TaskInfoGridPanel);