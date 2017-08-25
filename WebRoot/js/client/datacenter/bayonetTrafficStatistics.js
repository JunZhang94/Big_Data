/**
 * 卡口车流量统计
 */
Ext.ns('Jinpeng.bayonet');

var viewPort = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'north',
			height : 75,
			border : false,
			xtype : 'trafficStatisticsFormPanel'
		}, {
			region : 'center',
			border : false,
			xtype : 'trafficStatisticsGridPanel'
		}]
	});
});

/**
 * 卡口车流量统计--Form
 */
Jinpeng.bayonet.trafficStatisticsFormPanel = Ext.extend(Ext.Panel, {
	initComponent : function() {
		var acceptWays = [ [ '0', '时' ],[ '1', '日' ], [ '2', '月' ]];
		var comboBoxTree = new Ext.ux.OrgComboBoxTree({
			fieldLabel : '组织结构',
			name : 'orgName',
			allowBlank:false,
			width : 200,
			height : 300,
			emptyText : '请选择...',
			blankText : '请选择组织结构',
			anchor : '94%',
			editable : false,
			treeUrl : '',
			dataType : 'device',
			callback : function(id, text, coding, orgType) {
				Ext.getCmp('trafficStatisticsFormPanel').form.findField('orgId').setValue(id);
				Ext.getCmp('trafficStatisticsFormPanel').form.findField('orgType').setValue(orgType);
			}
		});
		var time = new Date();
		var endTime = Date.parseDate(Ext.util.Format.date(
				new Date(), 'Y-m-d')
				+ " " + "23:59:59", 'Y-m-d H:i:s');
		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'trafficStatisticsFormPanel',
				border : false,
				frame : true,
				labelAlign : 'right',
				cls : 'blue-button-ct',
				
				layout : 'table',
				defaults : {
					width : 380,
					layout : 'form'
				},
				layoutConfig : {
					columns : 3
				},
				
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
					items : [comboBoxTree]
				},{
					items : [ {
						
						fieldLabel : '时间类型',
						allowBlank:false,
						blankText:'请选择时间类型',
						xtype : 'tcombo',
						name : 'dates',
						id : 'dates',
						selectOnFocus : true,
						forceSelection : true,
						triggerAction : 'all',
						emptyText : '请选择',
						anchor : '94%',
						value:1,
						store : acceptWays.clone(),
						listeners:{
						//选中的监听处理
					         'select':function(){
								var name = Ext.getCmp("dates").getValue();
							    if(name==1){
							    	
							    	var sdate = new Date(time.getYear(),time.getMonth(), time.getDate(),'00');
									sdate.setTime(sdate.getTime()-24*1000*60*60);
									var edate = new Date(time.getYear(),time.getMonth(), time.getDate(),'23');
									edate.setTime(edate.getTime()+29*24*1000*60*60);
									//对开始和结束时间的处理
									var endDateString = dealDateTypeInEndTime(edate);
									var beginDateString = dealDateTypeInStartTime(sdate); 
									//给予开始和结束时间赋值
									Ext.getCmp("startdate").setValue(beginDateString);
									Ext.getCmp("enddate").setValue(endDateString);
							    }
							    if(name==2){
							    	//对时间类型选择为"月"的处理
							    	var lasttime=new Date(time.getYear(),time.getMonth(),(time.getDate()-1),'23');
							    	lasttime.setTime(lasttime.getTime()+12*30*24*1000*60*60);
							    	var beginTime = new Date();
							    	beginTime.setTime(beginTime.getTime()-24*1000*60*60);
							    	if(beginTime.getMonth()<=9){
										Ext.getCmp("startdate").setValue(beginTime.getYear()+'-0'+(beginTime.getMonth()+1));
									}
									if(beginTime.getMonth()>9 ){
										Ext.getCmp("startdate").setValue(beginTime.getYear()+'-'+(beginTime.getMonth()+1));
									}
							    	Ext.getCmp("enddate").setValue(lasttime.getYear()+'-'+(lasttime.getMonth()+1));
							    }
							    if(name == 0){
							    	var sdate = new Date(time.getYear(),time.getMonth(),time.getDate(),'00');
							    	sdate.setTime(sdate.getTime()-24*1000*60*60);
							    	var st = dealDateTypeInStartTime(sdate);
									Ext.getCmp("startdate").setValue(st+" 00");
							    	var et = dealDate(sdate);
							    	et = et.substring(0,et.lastIndexOf(' '))+" 23";
							    	Ext.getCmp("enddate").setValue(et);
							    }
					         }
					    }
					} ]
				},{
					xtype : 'spacer'
				},
			
				{
					items : [ {
//						xtype : 'datetimefield',
//						name : 'startdate',
//						id : 'startdate',
//						fieldLabel : '开始时间',
//						editable : false,
//						value : new Date().format('Y-m-d'),
//						vtype: 'beginEndDate',
//						endDateField : 'enddate',
//						anchor : '94%'
						
						xtype : 'textfield',
						name : 'startdate',
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
								//当结束时间的值为空的时候就给予他默认的最大值
								if(enddate==''){
									enddate=endTimes;
								}
							    //获取时间类型
								var dateType = Ext.getCmp("dates").getValue();
								var btime = Ext.getCmp("startdate").getValue();
			                     if(dateType==0){
			                    	 var year,moth,day,hour,starttime ;
			                    	 if(btime!=''){
				                    		 year = btime.substring(0,btime.indexOf('-'));
										     moth = btime.substring((btime.indexOf('-')+1),btime.lastIndexOf('-'))-1;
										     day = btime.substring((btime.lastIndexOf('-')+1),btime.lastIndexOf(' '));
										   	 hour = btime.substring((btime.lastIndexOf(' ')+1));
										     starttime =new Date(year,moth,day,hour);
										     starttime.setTime(starttime.getTime()+24*1000*60*60);
										     enddate=dealDate(starttime);
										     Ext.getCmp("enddate").setValue(enddate);
				                    	 }
			                    		 
							    	
							    };
							    //这是时间类型为"日"
			                    if(dateType==1){
			                    	 if(btime!=''){
		                    	         year = btime.substring(0,btime.indexOf('-'));
									     moth = btime.substring((btime.indexOf('-')+1),btime.lastIndexOf('-'))-1;
									     day = btime.substring((btime.lastIndexOf('-')+1));
									   	 hour = '00';
									     starttime =new Date(year,moth,day,hour);
									    	
									     starttime.setTime(starttime.getTime()+30*24*1000*60*60);
									     enddate=dealDate(starttime);
									     enddate = enddate.substring(0,enddate.lastIndexOf(' '));
				                    	 Ext.getCmp("enddate").setValue(enddate);
			                    	 }
			                    }
			                    //这是时间类型为"月"
			                    if(dateType == 2){
			                    	 if(btime!=''){
				                    	 year = btime.substring(0,btime.indexOf('-'));
									     moth = btime.substring((btime.indexOf('-')+1))-1;
									     day = '01';
									   	 hour = '00';
									     starttime =new Date(year,moth,day,hour);
									    	
									     starttime.setTime(starttime.getTime()+12*30*24*1000*60*60);
									     enddate=dealDate(starttime);
									     enddate = enddate.substring(0,enddate.lastIndexOf('-'));
				                    	 Ext.getCmp("enddate").setValue(enddate);
			                    	 }
			                    }
								//  日期时间的默认参数      
							    var defaultDateTimeParams = new function()   
							    {   
							        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
							        //根据不同的时间类型做出不同的处理
							        //处理如下
							        if(dateType==''){
//							            this.maxDate = enddate+" 23:59:59";
							            this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';
							        }else if(dateType==1){  
//							            this.maxDate = enddate+" 23:59:59";
							            this.dateFmt    = 'yyyy-MM-dd';
							        }else if(dateType==2){
//							            this.maxDate = enddate+" 23:59:59";
							            this.dateFmt    = 'yyyy-MM';
							        }else if(dateType==0){
							            this.dateFmt    = 'yyyy-MM-dd HH';
							        }
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
//						name : 'enddate',
//						id : 'enddate',
//						fieldLabel : '结束时间',
//						editable : false,
//						value : endTime,
//						vtype: 'beginEndDate',
//						startDateField : 'startdate',
//						anchor : '94%'
						
						xtype : 'textfield',
						name : 'enddate',
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
								//获取时间类型
								var dateType = Ext.getCmp("dates").getValue();
								//当时间类型为"时"的时候时间只能选择一天以内的小时数
								var hours='';
								var year,moth,day,hour,starttime ;
								var stime = startdate;
							    if(dateType==0){
							    	var endtime = Ext.getCmp("enddate").getValue();
							    	
							    	if(stime!=''|| stime==endtime){
							    		 year = stime.substring(0,stime.indexOf('-'));
									     moth = stime.substring((stime.indexOf('-')+1),stime.lastIndexOf('-'))-1;
									     day = stime.substring((stime.lastIndexOf('-')+1),stime.lastIndexOf(' '));
									   	 hour = stime.substring((stime.lastIndexOf(' ')+1));
									     var bdate =new Date(year,moth,day,hour);
										 bdate.setTime(bdate.getTime()+24*1000*60*60);
							    		 
							    		 //确保结束时间和开始时间保持有24小时可选
							    		 var years = endtime.substring(0,endtime.indexOf('-'));
							    		 var moths = endtime.substring((endtime.indexOf('-')+1),endtime.lastIndexOf('-'))-1;
							    		 var date = endtime.substring((endtime.lastIndexOf('-')+1),endtime.lastIndexOf(' '));
							    		 var hours = endtime.substring((endtime.lastIndexOf(' ')+1));
							    		 var lastTime = new Date(years,moths,date,hours);
                             			 if(bdate>=lastTime){
                             				 year = stime.substring(0,stime.indexOf('-'));
										     moth = stime.substring((stime.indexOf('-')+1),stime.lastIndexOf('-'))-1;
										     day = stime.substring((stime.lastIndexOf('-')+1),stime.lastIndexOf(' '));
										   	 hour = stime.substring((stime.lastIndexOf(' ')+1));
										     starttime =new Date(year,moth,day,hour);
										    	
											 starttime.setTime(starttime.getTime()+24*1000*60*60);
											 var ldate = new Date(year,moth,day,hour);
											 var lastMinDate = ldate.getYear()+"-"+(ldate.getMonth()+1)+"-"+ldate.getDate()+" "+ldate.getHours()+":00:00"
								    		 hours =  starttime.getYear()+"-"+(starttime.getMonth()+1)+"-"+starttime.getDate()+" "+starttime.getHours()+":59:59";
                             			 }
							    	}else{
							    		hours =  endtime;
							    	}
							    	
							    };
							     if(dateType==1){
							    	 year = stime.substring(0,stime.indexOf('-'));
								     moth = stime.substring((stime.indexOf('-')+1),stime.lastIndexOf('-'))-1;
								     day = stime.substring((stime.lastIndexOf('-')+1));
								   	 hour = '00';
								     var bdate =new Date(year,moth,day);
									 bdate.setTime(bdate.getTime()+30*24*1000*60*60);
									 hours =  bdate.getYear()+"-"+(bdate.getMonth()+1)+"-"+bdate.getDate()+" "+bdate.getHours()+":59:59";
                             			
							    }
							    if(dateType==2){
							    	 year = stime.substring(0,stime.indexOf('-'));
								     moth = stime.substring((stime.indexOf('-')+1));
								     day = "01";
								   	 hour = '00';
								     var bdate =new Date(year,moth,day);
									 bdate.setTime(bdate.getTime()+12*30*24*1000*60*60);
									 hours =  bdate.getYear()+"-"+(bdate.getMonth()+1)+"-"+bdate.getDate()+" "+bdate.getHours()+":59:59";
                             			
							    }
								//  日期时间的默认参数      
							    var defaultDateTimeParams = new function()   
							    {   
							        this.readOnly   = true;           //  不允许在文本输入框中修改时间 
							        //对不同时间类型做出的处理
							        //处理如下
							       if(dateType==''){
							        	//this.startDate  = startdate;    //  开始时间   
								        this.minDate = stime;
								        this.maxDate=hours;//设置最大时钟
								        this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';  //  格式化时间   
							        }else if(dateType==1){
							        	//this.startDate  = startdate;    //  开始时间   
								        this.minDate = stime;
								        this.maxDate=hours;//设置最大时钟
								        this.dateFmt = 'yyyy-MM-dd'; 
							        }else if(dateType==2){
							        	//this.startDate  = startdate;    //  开始时间   
								        this.minDate = stime;
								        this.maxDate=hours;//设置最大时钟
								        this.dateFmt    = 'yyyy-MM'; 
							        }else if(dateType==0){
							        //	this.startDate  = startdate;    //  开始时间   
								        this.minDate = stime;
								        this.maxDate=hours;//设置最大时钟
								        this.dateFmt    = 'yyyy-MM-dd HH'; 
							        }
							        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
							        this.alwaysUseStartDate = false;           //  默认使用初始时间   
							       };
//							       
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
			}],
			listeners : {
			 //这是默认的开始监听是加载整个form表单后执行
			 //也就一开始就给开始时间和结束时间设置了默认处理
				afterrender : function() {
					if(Ext.getCmp("dates").getValue()==1){
						var sdate = new Date();
						sdate.setTime(sdate.getTime()-24*1000*60*60);
						var edate = new Date();
						edate.setTime(edate.getTime()+29*24*1000*60*60);
						
						//对开始和结束时间的处理
						var endDateString = dealDateTypeInStartTime(edate); 
						var beginDateString = dealDateTypeInEndTime(sdate);
						//给予开始和结束时间赋值
						Ext.getCmp("startdate").setValue(beginDateString);
						Ext.getCmp("enddate").setValue(endDateString);
					}
				}
			}
		});
		Jinpeng.bayonet.trafficStatisticsFormPanel.superclass.initComponent.apply(this);
	},
	deviceCheck : function() {
		var form = Ext.getCmp('trafficStatisticsFormPanel');
		if(form.getForm().isValid()) {
			var grid = Ext.getCmp('licenseRecognitionRateDataGrid');
			grid.store.baseParams = {};
			var baseparams = {
				'orgId' : Ext.getCmp('orgId').getValue(),
				'orgType' : Ext.getCmp('orgType').getValue(),
				'dates' : Ext.getCmp('dates').getValue(),
				'startdate': Ext.getCmp('startdate').getValue(), // Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'),
				'enddate'   : Ext.getCmp('enddate').getValue(), // Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d H:i:s'),
			};
			grid.store.baseParams = baseparams;
			grid.store.load({
				params : {'page.start' : 0, 'page.limit' : Jinpeng.PageSize}
			});
//			commuServerStore.load({
//				params : {
//					'page.start' : 0,
//					'page.limit' : 10
//				}
//			});
		}
	}
});

/**
 * 卡口车流量统计--Grid
 */
Jinpeng.bayonet.trafficStatisticsGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'licenseRecognitionRateDataGrid',
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var commuServerStore = new Ext.data.JsonStore({
			url : rootpath+ "/dc/trafficStatistics.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
		          {name : 'KKMC'},
		          {name : 'STATISTICAL_TIME'},
		          {name : 'COUNS'},
		          {name : 'NON_HPHM_COUNS'},
		          {name : 'HPHM_COUNS'}
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
		           sm,
		           {header : '卡口名称', dataIndex : 'KKMC', renderer : function(key) {
		        	   if (key == '' || key == null) {
		        		   return '--'
		        	   } else {
		        		   return key; 
		        	   }
				   }},
				   {header : '统计时间', dataIndex : 'STATISTICAL_TIME'},
		           {header : '接收数量', dataIndex : 'COUNS', renderer : function(key) {
		        	   if (key == '' || key == null) {
		        		   return '--'
		        	   } else {
		        		   return key; 
		        	   }
				   }},
		           {header : '已识别数量', dataIndex : 'NON_HPHM_COUNS', renderer : function(key) {
		        	   if (key == '' || key == null) {
		        		   return '--'
		        	   } else {
		        		   return key; 
		        	   }
				   }},
		           {header : '未识别数量', dataIndex : 'HPHM_COUNS', renderer : function(key) {
		        	   if (key == '') {
		        		   return '--'
		        	   } else {
		        		   return key; 
		        	   }
				   }}
	            ]
			}),
		bbar : new Jinpeng.widget.PagingToolbar( {
			id : 'PagingToolbar',
			store : commuServerStore,
			pageSize : this.pageSize,
			displayMsg : '{0} - {1} of 共{2}条',
			emptyMsg : "无数据"
		})
		});
		Jinpeng.bayonet.trafficStatisticsGridPanel.superclass.initComponent.apply(this);
	}
});

//处理时间的方法(这里是时间类型是“时”的时候使用)
function dealDate(starttime){
	 var smoth = "m"+(starttime.getMonth()+1);
     var sday = "m"+starttime.getDate();
     var shour ="m"+starttime.getHours();
     var enddate;
     
     if(shour.substring(2,3) == ''&& smoth.substring(2,3) != '' && sday.substring(2,3) !='' ){
    	 enddate =starttime.getYear()+"-"+(starttime.getMonth()+1)+"-"+starttime.getDate()+" 0"+starttime.getHours();
     }
     if(shour.substring(2,3) != ''&& smoth.substring(2,3) == '' && sday.substring(2,3) =='' ){
    	 enddate =starttime.getYear()+"-0"+(starttime.getMonth()+1)+"-0"+starttime.getDate()+" "+starttime.getHours();
     }
     if(shour.substring(2,3) == ''&& smoth.substring(2,3) != '' && sday.substring(2,3) =='' ){
    	 enddate =starttime.getYear()+"-"+(starttime.getMonth()+1)+"-0"+starttime.getDate()+" 0"+starttime.getHours();
     }
    
     if(smoth.substring(2,3) == ''&&shour.substring(2,3) != '' && sday.substring(2,3) != ''){
    	 enddate =starttime.getYear()+"-0"+(starttime.getMonth()+1)+"-"+starttime.getDate()+" "+starttime.getHours();
     }
     if(smoth.substring(2,3) != ''&&shour.substring(2,3) == '' && sday.substring(2,3) == ''){
    	 enddate =starttime.getYear()+"-"+(starttime.getMonth()+1)+"-0"+starttime.getDate()+" 0"+starttime.getHours();
     }
     
     if(sday.substring(2,3) ==''&& smoth.substring(2,3) != '' && shour.substring(2,3) != ''){
    	 enddate =starttime.getYear()+"-"+(starttime.getMonth()+1)+"-0"+starttime.getDate()+" "+starttime.getHours();
     }
     if(sday.substring(2,3) !=''&& smoth.substring(2,3) == '' && shour.substring(2,3) == ''){
    	 enddate =starttime.getYear()+"-0"+(starttime.getMonth()+1)+"-"+starttime.getDate()+" 0"+starttime.getHours();
     }
     
     
     //当时间全部没有0显示和都有0的时候的处理
     if(shour.substring(2,3) != '' && smoth.substring(2,3) != '' && sday.substring(2,3) != ''){
    	 enddate =starttime.getYear()+"-"+(starttime.getMonth()+1)+"-"+starttime.getDate()+" "+starttime.getHours();
     }
     if(shour.substring(2,3) == '' && smoth.substring(2,3) == '' && sday.substring(2,3) == ''){
    	 enddate =starttime.getYear()+"-0"+(starttime.getMonth()+1)+"-0"+starttime.getDate()+" 0"+starttime.getHours();
     }
     return enddate;
   
};
//当时间类型为“天”的时候对时间显示的处理
//分为如下处理开始时间和结束时间的两个方法
function dealDateTypeInStartTime(beginTime){
	var startDate;
	//对开始时间的处理
	if(beginTime.getMonth()<=9 && beginTime.getDate()<=9){
		startDate=beginTime.getYear()+'-0'+(beginTime.getMonth()+1)+'-0'+( beginTime.getDate());
	}
	if(beginTime.getMonth()>9 && beginTime.getDate()<=9){
		startDate=beginTime.getYear()+'-'+(beginTime.getMonth()+1)+'-0'+( beginTime.getDate());
	}
	if(beginTime.getMonth()<=9 &&　beginTime.getDate()>9){
		startDate=beginTime.getYear()+'-0'+(beginTime.getMonth()+1)+'-'+( beginTime.getDate());
	}
	if(beginTime.getMonth()>9 && beginTime.getDate()>9){
		startDate=beginTime.getYear()+'-'+(beginTime.getMonth()+1)+'-'+( beginTime.getDate());
	}
	return startDate;
};

function dealDateTypeInEndTime(lastTime){
	var lastDate;
	//对结束时间的处理
	if(lastTime.getMonth()<=9 && lastTime.getDate()<=9){
		lastDate = lastTime.getYear()+'-0'+(lastTime.getMonth()+1)+'-0'+( lastTime.getDate());
	}
	if(lastTime.getMonth()>9 && lastTime.getDate()<=9){
		lastDate = lastTime.getYear()+'-'+(lastTime.getMonth()+1)+'-0'+( lastTime.getDate());
	}
	if(lastTime.getMonth()<=9 &&　lastTime.getDate()>9){
		lastDate = lastTime.getYear()+'-0'+(lastTime.getMonth()+1)+'-'+( lastTime.getDate());
	}
	if(lastTime.getMonth()>9 && lastTime.getDate()>9){
		lastDate = lastTime.getYear()+'-'+(lastTime.getMonth()+1)+'-'+( lastTime.getDate());
	}
	return lastDate;
};

Ext.reg('trafficStatisticsFormPanel', Jinpeng.bayonet.trafficStatisticsFormPanel);
Ext.reg('trafficStatisticsGridPanel', Jinpeng.bayonet.trafficStatisticsGridPanel);