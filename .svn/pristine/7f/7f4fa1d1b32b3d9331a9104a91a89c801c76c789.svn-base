/**
 * 卡口车流量统计
 */
Ext.ns('Jinpeng.bayonet');

var viewPort = null;
var setKKValue=function(data){
	var orgId;
	orgId = data.id;
	if(data.org_type == 2 ){
		orgId = (data.id).substring(3);
	}
	Ext.getCmp('trafficStatisticsFormPanel').form.findField('orgId').setValue(orgId);
	//parseInt(data.org_type) 这里要转换一下，否则是字符串，后台controller取不到传递的参数
	Ext.getCmp('trafficStatisticsFormPanel').form.findField('orgType').setValue(parseInt(data.org_type));
	Ext.getCmp('orgName').setValue(data.text);
	Ext.getCmp('mywin1').hide();
};
var config = {
	deptFlag : false,
	mountFlag : false
};

Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'north',
			height : 65,
			border : false,
			xtype : 'trafficStatisticsFormPanel'
		}, {
			region : 'center',
			border : false,
			xtype : 'resultTabPanel'
		}],
		listeners : {
			afterrender : function() {
				Ext.getCmp('resultTabPanel').setActiveTab(0);
			}
		}
	});
});

/**
 * 列表展示，图表展示，地图展示TabPanel
 */
Jinpeng.bayonet.ResultTabPanel = Ext.extend(Ext.TabPanel, {
	id : "resultTabPanel",
	initComponent : function() {
		var config = {
			items : [ {
				title : '按部门统计',
				layout:'fit',
				xtype : 'deptStatisticsGridPanel'

			}, {
				title : '按卡口统计',
				layout:'fit',
				xtype : 'trafficStatisticsGridPanel'
			}]
		};
		Ext.apply(this, config);
		Jinpeng.bayonet.ResultTabPanel.superclass.initComponent.apply(this, arguments);
	}
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
					width : 320,
					layout : 'form'
				},
				layoutConfig : {
					columns : 3
				},
				
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
				//	items : [comboBoxTree]
					width:380,
					items : [ {
							xtype : 'compositefield',
							items : [ {
								flex : 0.5,
								fieldLabel : '卡点',
								xtype : 'tooltiptextfield',
								name : 'orgName',
								id : 'orgName',
								width : 183,
								emptyText : '请选择卡点'
							}, {
								flex : 0.5,
								owner : this,
								labelAlign : 'right',
								xtype : 'button',
								text : '选择卡口',
								id:'choosekkBtn',
								handler : function(){
									kwin1.show();
								}
							}]
					}]
					
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
						value:0,
						store : acceptWays.clone(),
						listeners:{
						//选中的监听处理
					         'select':function(){
								var name = Ext.getCmp("dates").getValue();
							    if(name==1){
							    	var sdate = new Date(time.getFullYear(),time.getMonth(), time.getDate(),'00');
									//sdate.setTime(sdate.getTime()-24*1000*60*60);
									var edate = new Date(time.getFullYear(),time.getMonth(), time.getDate(),'23');
									//edate.setTime(edate.getTime()+30*24*1000*60*60);
							    	//var edate = new Date();
									if(sdate.getMonth()<=9 && sdate.getDate()<=9){
										Ext.getCmp("startdate").setValue(sdate.getFullYear()+'-0'+(sdate.getMonth())+'-0'+( sdate.getDate()));
									}
									if(sdate.getMonth()>9 && sdate.getDate()<=9){
										Ext.getCmp("startdate").setValue(sdate.getFullYear()+'-'+(sdate.getMonth())+'-0'+( sdate.getDate()));
									}
									if(sdate.getMonth()<=9 &&　sdate.getDate()>9){
										Ext.getCmp("startdate").setValue(sdate.getFullYear()+'-0'+(sdate.getMonth())+'-'+( sdate.getDate()));
									}
									if(sdate.getMonth()>9 && sdate.getDate()>9){
										Ext.getCmp("startdate").setValue(sdate.getFullYear()+'-'+(sdate.getMonth())+'-'+( sdate.getDate()));
									}
									Ext.getCmp("enddate").setValue(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+( edate.getDate()));
//							    	Ext.getCmp("startdate").setValue(time.getFullYear()+'-'+(time.getMonth()+1)+'-'+( time.getDate()-1));
//							    	Ext.getCmp("enddate").setValue(time.getFullYear()+'-'+(time.getMonth()+2)+'-'+( time.getDate()-1));
							    }else if(name==2){
							    	//对时间类型选择为"月"的处理
							    	var lasttime=new Date(time.getFullYear(),time.getMonth(),(time.getDate()-1),'23');
							    	//lasttime.setTime(lasttime.getTime()+12*30*24*1000*60*60);
							    	var beginTime = new Date();
							    	beginTime.setTime(beginTime.getTime()-24*1000*60*60);
							    	if(beginTime.getMonth()<=9){
										Ext.getCmp("startdate").setValue(beginTime.getFullYear()-1+'-0'+(beginTime.getMonth()+1));
									}
									if(beginTime.getMonth()>9 ){
										Ext.getCmp("startdate").setValue(beginTime.getFullYear()-1+'-'+(beginTime.getMonth()+1));
									}
							    	Ext.getCmp("enddate").setValue(lasttime.getFullYear()+'-'+(lasttime.getMonth()+1));
							    	
//							    	var lasttime=new Date(time.getFullYear(),time.getMonth(),(time.getDate()-1),'00');
//							    	lasttime.setTime(lasttime.getTime()+12*30*24*1000*60*60);
//							    	//var edate=dealDate(lasttime);
//							    	Ext.getCmp("startdate").setValue(time.getFullYear()+'-'+(time.getMonth()+1));
//							    	Ext.getCmp("enddate").setValue(lasttime.getFullYear()+'-'+(lasttime.getMonth()+1));
							    }else if(name == 0){
							    	var sdate = new Date(time.getFullYear(),time.getMonth(),time.getDate(),'00');
							    	//sdate.setTime(sdate.getTime()-24*1000*60*60);
							    	if(sdate.getMonth()<=9 && sdate.getDate()<=9){
										Ext.getCmp("startdate").setValue(sdate.getFullYear()+'-0'+(sdate.getMonth()+1)+'-0'+( sdate.getDate())+" 00");
									}
									if(sdate.getMonth()>9 && sdate.getDate()<=9){
										Ext.getCmp("startdate").setValue(sdate.getFullYear()+'-'+(sdate.getMonth()+1)+'-0'+( sdate.getDate())+" 00");
									}
									if(sdate.getMonth()<=9 &&　sdate.getDate()>9){
										Ext.getCmp("startdate").setValue(sdate.getFullYear()+'-0'+(sdate.getMonth()+1)+'-'+( sdate.getDate())+" 00");
									}
									if(sdate.getMonth()>9 && sdate.getDate()>9){
										Ext.getCmp("startdate").setValue(sdate.getFullYear()+'-'+(sdate.getMonth()+1)+'-'+( sdate.getDate()) +" 00");
									}
							    	var et = dealDate(sdate);
							    	et = et.substring(0,et.lastIndexOf(' '))+" 23";
							    	Ext.getCmp("enddate").setValue(et);
//							    	Ext.getCmp("startdate").setValue(time.getFullYear()+'-'+(time.getMonth()+1)+'-'+( time.getDate()-1)+" 00");
//							    	Ext.getCmp("enddate").setValue(time.getFullYear()+'-'+(time.getMonth()+1)+'-'+( time.getDate()-1)+" 23");
							    }
					         }
					    }
					} ]
				}, {
					items : [ {
						xtype : 'tcombo',
						id : 'carFlag',
						name : 'carFlag',
						fieldLabel : '外/本地车',
						store : [[ '1', '外地车' ], [ '2', '本地车' ]],
						mode : 'local',
						emptyText : '全部',
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'text',
						anchor : '94%'
					} ]
				}, {
					items : [ {
						xtype : 'textfield',
						name : 'startdate',
						id : 'startdate',
						fieldLabel : '开始时间',
						allowBlank : false,
				        editable : false,
						value : new Date().format('Y-m-d') + ' 00',
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
							            this.dateFmt    = 'yyyy-MM-dd HH';
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
						
						xtype : 'textfield',
						name : 'enddate',
						id : 'enddate',
						fieldLabel : '结束时间',
						editable : false,
						allowBlank : false,
						value : new Date().format('Y-m-d') + ' 23',
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
											 var lastMinDate = ldate.getFullYear()+"-"+(ldate.getMonth()+1)+"-"+ldate.getDate()+" "+ldate.getHours()+":00:00"
								    		 hours =  starttime.getFullYear()+"-"+(starttime.getMonth()+1)+"-"+starttime.getDate()+" "+starttime.getHours()+":59:59";
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
									 hours =  bdate.getFullYear()+"-"+(bdate.getMonth()+1)+"-"+bdate.getDate()+" "+bdate.getHours()+":59:59";
                             			
							    }
							    if(dateType==2){
							    	 year = stime.substring(0,stime.indexOf('-'));
								     moth = stime.substring((stime.indexOf('-')+1));
								     day = "01";
								   	 hour = '00';
								     var bdate =new Date(year,moth,day);
									 bdate.setTime(bdate.getTime()+12*30*24*1000*60*60);
									 hours =  bdate.getFullYear()+"-"+(bdate.getMonth()+1)+"-"+bdate.getDate()+" "+bdate.getHours()+":59:59";
                             			
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
								        this.dateFmt    = 'yyyy-MM-dd HH';  //  格式化时间   
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
						
						if(sdate.getMonth()<=9 && sdate.getDate()<=9){
							Ext.getCmp("startdate").setValue(sdate.getFullYear()+'-0'+(sdate.getMonth()+1)+'-0'+( sdate.getDate()));
						}
						if(sdate.getMonth()>9 && sdate.getDate()<=9){
							Ext.getCmp("startdate").setValue(sdate.getFullYear()+'-'+(sdate.getMonth()+1)+'-0'+( sdate.getDate()));
						}
						if(sdate.getMonth()<=9 &&　sdate.getDate()>9){
							Ext.getCmp("startdate").setValue(sdate.getFullYear()+'-0'+(sdate.getMonth()+1)+'-'+( sdate.getDate()));
						}
						if(sdate.getMonth()>9 && sdate.getDate()>9){
							Ext.getCmp("startdate").setValue(sdate.getFullYear()+'-'+(sdate.getMonth()+1)+'-'+( sdate.getDate()));
						}
						Ext.getCmp("enddate").setValue(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+( edate.getDate()));
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
			var deptGrid = Ext.getCmp('deptStatisticsGridGrid');
			grid.store.baseParams = {};
			deptGrid.store.baseParams = {};
			var baseparams = {
				'orgId' : Ext.getCmp('orgId').getValue(),
				'orgType' : Ext.getCmp('orgType').getValue(),
				'dates' : Ext.getCmp('dates').getValue(),
				'startdate' : Ext.getCmp('startdate').getValue(), // Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'),
				'enddate' : Ext.getCmp('enddate').getValue(),
				'carFlag' : Ext.getCmp('carFlag').getValue()
			};
			grid.store.baseParams = baseparams;
			deptGrid.store.baseParams = baseparams;
			grid.store.load();
			deptGrid.store.load();
		}
	}
	
});

/**
 * 卡口车流量统计--按单位统计Grid
 */
Jinpeng.bayonet.DeptStatisticsGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'deptStatisticsGridGrid',
	border : false,
	height : Ext.getBody().getHeight() - 70,
	title : '按部门统计',
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var _panel = this;
		var summary = new Ext.ux.grid.GroupSummary();
		var reader = new Ext.data.JsonReader({
	        idProperty: 'deviceId',
	        root : 'data',
			fields : [
	          {name : 'DWMC'},
	          {name : 'STATISTICAL_TIME'},
	          {name : 'CAR_0_COUNS'},
	          {name : 'CAR_1_COUNS'},
	          {name : 'CAR_2_COUNS'},
	          {name : 'CAR_3_COUNS'},
	          {name : 'CAR_4_COUNS'},
	          {name : 'CAR_5_COUNS'},
	          {name : 'CAR_6_COUNS'},
	          {name : 'CAR_7_COUNS'},
	          {name : 'CAR_8_COUNS'},
	          {name : 'CAR_9_COUNS'},
	          {name : 'CAR_10_COUNS'},
	          {name : 'CAR_11_COUNS'},
	          {name : 'CAR_12_COUNS'},
	          {name : 'CAR_13_COUNS'},
	          {name : 'CAR_14_COUNS'},
	          {name : 'CAR_15_COUNS'},
	          {name : 'CAR_16_COUNS'},
	          {name : 'CAR_17_COUNS'},
	          {name : 'CAR_18_COUNS'},
	          {name : 'CAR_19_COUNS'},
	          {name : 'CAR_20_COUNS'},
	          {name : 'CAR_21_COUNS'},
	          {name : 'ALL_COUNTS'}]
	    });
		deptStatisticsStore = new Ext.data.GroupingStore({
			url : rootpath+ "/dataStatistics/deptDataStatistics.mvc",
			sortInfo: {field: 'STATISTICAL_TIME', direction: 'ASC'},
			groupField: 'DWMC',
			reader:reader
		});
		var sm = new Ext.grid.CheckboxSelectionModel();
		// 加载数据
		Ext.apply(this, {
			layout : 'fit',
			stripeRows : true,
			store : deptStatisticsStore,
			selModel : sm,
			colModel  : new Ext.grid.ColumnModel({
				columns : [sm, {
		            header: '单位名称',
		            dataIndex: 'DWMC'
		        },{
					header : '统计时间',
					dataIndex : 'STATISTICAL_TIME',
					//summaryType: 'count',
					width : 200,
					summaryRenderer: function(v, params, data){
			        	var all_counts = data.data.ALL_COUNTS;
	                    return '流量统计，总共' + all_counts + '条';
	                }
				},{
		            header: '轿车',dataIndex: 'CAR_1_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '越野车',dataIndex: 'CAR_2_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '商务车',dataIndex: 'CAR_3_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '面包车',dataIndex: 'CAR_4_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '皮卡',dataIndex: 'CAR_5_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '微型货车',dataIndex: 'CAR_6_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '轻型货车',dataIndex: 'CAR_7_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '货车',dataIndex: 'CAR_8_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '重型货车',dataIndex: 'CAR_9_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '轻型客车',dataIndex: 'CAR_10_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '客车',dataIndex: 'CAR_11_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '大型客车',dataIndex: 'CAR_12_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '公交车',dataIndex: 'CAR_13_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '三轮车',dataIndex: 'CAR_14_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '摩托车',dataIndex: 'CAR_15_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '校车',dataIndex: 'CAR_16_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '泥头车',dataIndex: 'CAR_17_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '黄标车',dataIndex: 'CAR_18_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '挂车',dataIndex: 'CAR_19_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '其他',dataIndex: 'CAR_0_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
                    	return ''; 
                	}
		        },{
		            header: '总量',dataIndex: 'ALL_COUNTS',summaryType: 'sum', summaryRenderer: function(v, params, data){
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
			plugins: summary,
			tbar : {
				cls : 'blue-button-ct',
				items : [ {
					xtype : 'tbspacer',
					width : 12
				}, {
					xtype : 'button',
					id : 'exportDeptBtn',
					text : '导出部门',
					handler : importDeptExcelData
				}]
			}
		});
		Jinpeng.bayonet.DeptStatisticsGridPanel.superclass.initComponent.apply(this);
	}
});

//导出Excel格式数据方法 
function importExcelData() {
	var records = Ext.getCmp('licenseRecognitionRateDataGrid').getSelectionModel().getSelections();
	var config = {
		selectExportURL : rootpath + "/dc/exportStatisticsData.mvc",
		queryExportURL : rootpath + "/dc/exportStatisticsData.mvc"
	};
	// 得到选中的ids
	var ids = [];
	var carNums = [];
	for ( var i = 0; i < records.length; i++) {
		ids[ids.length] = records[i].get('STATISTICAL_TIME');
		carNums[carNums.length] = records[i].get('KKMC');
	}
	config.carNums = carNums;
	config.ids = ids;
	config.count = 1000; //默认最大导出1000条
	var param = getQueryParams();
	config.queryCondition = param.join("&");
	var ExportHelper = new Jinpeng.HistoryExportHelper(config);
	ExportHelper.startExport(true);
}

//导出Excel格式数据方法 
function importDeptExcelData() {
	var records = Ext.getCmp('deptStatisticsGridGrid').getSelectionModel().getSelections();
	var config = {
		selectExportURL : rootpath + "/dc/exportDeptStatisticsData.mvc",
		queryExportURL : rootpath + "/dc/exportDeptStatisticsData.mvc"
	};
	// 得到选中的ids
	var ids = [];
	var carNums = [];
	for ( var i = 0; i < records.length; i++) {
		ids[ids.length] = records[i].get('STATISTICAL_TIME');
		carNums[carNums.length] = records[i].get('DWMC');
	}
	config.carNums = carNums;
	config.ids = ids;
	config.count = 1000; //默认最大导出1000条
	var param = getQueryParams();
	config.queryCondition = param.join("&");
	var ExportHelper = new Jinpeng.HistoryExportHelper(config);
	ExportHelper.startExport(true);
}


//获取当前查询条件参数，并封装为数组
function getQueryParams() {
	//将查询参数传递到后台，并在后台获取要导出的数据 
	var param = [];
	param[param.length] = "orgId=" + Ext.getCmp('orgId').getValue();
	param[param.length] = "orgType=" + Ext.getCmp('orgType').getValue();
	param[param.length] = "dates=" + Ext.getCmp('dates').getValue();
	param[param.length] = "startdate=" + Ext.getCmp('startdate').getValue();
	param[param.length] = "enddate=" + Ext.getCmp('enddate').getValue();
	return param;
}

/**
 * 卡口车流量统计--按卡口统计Grid
 */
Jinpeng.bayonet.trafficStatisticsGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'licenseRecognitionRateDataGrid',
	border : false,
	height : Ext.getBody().getHeight() - 70,
	title : '按卡口统计',
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var _panel = this;
		var summary = new Ext.ux.grid.GroupSummary();
		var reader = new Ext.data.JsonReader({
	        idProperty: 'deviceId',
	        root : 'data',
			fields : [
	          {name : 'KKMC'},
	          {name : 'STATISTICAL_TIME'},
	          {name : 'CAR_0_COUNS'},
	          {name : 'CAR_1_COUNS'},
	          {name : 'CAR_2_COUNS'},
	          {name : 'CAR_3_COUNS'},
	          {name : 'CAR_4_COUNS'},
	          {name : 'CAR_5_COUNS'},
	          {name : 'CAR_6_COUNS'},
	          {name : 'CAR_7_COUNS'},
	          {name : 'CAR_8_COUNS'},
	          {name : 'CAR_9_COUNS'},
	          {name : 'CAR_10_COUNS'},
	          {name : 'CAR_11_COUNS'},
	          {name : 'CAR_12_COUNS'},
	          {name : 'CAR_13_COUNS'},
	          {name : 'CAR_14_COUNS'},
	          {name : 'CAR_15_COUNS'},
	          {name : 'CAR_16_COUNS'},
	          {name : 'CAR_17_COUNS'},
	          {name : 'CAR_18_COUNS'},
	          {name : 'CAR_19_COUNS'},
	          {name : 'CAR_20_COUNS'},
	          {name : 'CAR_21_COUNS'},
	          {name : 'ALL_COUNTS'}]
	    });
		trafficStatisticsStore = new Ext.data.GroupingStore({
			url : rootpath+ "/dataStatistics/mountDataStatistics.mvc",
			sortInfo: {field: 'STATISTICAL_TIME', direction: 'ASC'},
			groupField: 'KKMC',
			reader:reader
		});
		var sm = new Ext.grid.CheckboxSelectionModel();
		// 加载数据
		Ext.apply(this, {
			layout : 'fit',
			stripeRows : true,
			store : trafficStatisticsStore,
			selModel : sm,
			colModel  : new Ext.grid.ColumnModel({
				columns : [sm, {
		            header: '卡口名称',
		            dataIndex: 'KKMC'
		        },{
					header : '统计时间',
					dataIndex : 'STATISTICAL_TIME',
					summaryType: 'count',
					width : 200,
		            summaryRenderer: function(v, params, data){
		        		var all_counts = data.data.ALL_COUNTS;
	                    return '流量统计，总共' + all_counts + '条';
	                }
				},{
		            header: '轿车',dataIndex: 'CAR_1_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
                    	return ''; 
					}
		        },{
		            header: '越野车',dataIndex: 'CAR_2_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '商务车',dataIndex: 'CAR_3_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '面包车',dataIndex: 'CAR_4_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '皮卡',dataIndex: 'CAR_5_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '微型货车',dataIndex: 'CAR_6_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '轻型货车',dataIndex: 'CAR_7_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '货车',dataIndex: 'CAR_8_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '重型货车',dataIndex: 'CAR_9_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '轻型客车',dataIndex: 'CAR_10_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '客车',dataIndex: 'CAR_11_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '大型客车',dataIndex: 'CAR_12_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '公交车',dataIndex: 'CAR_13_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '三轮车',dataIndex: 'CAR_14_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '摩托车',dataIndex: 'CAR_15_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '校车',dataIndex: 'CAR_16_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '泥头车',dataIndex: 'CAR_17_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '黄标车',dataIndex: 'CAR_18_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '挂车',dataIndex: 'CAR_19_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        },{
		            header: '其他',dataIndex: 'CAR_0_COUNS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                	return ''; 
	            	}
		        },{
		            header: '总量',dataIndex: 'ALL_COUNTS',summaryType: 'sum', summaryRenderer: function(v, params, data){
	                    return ''; 
	                }
		        }]
			}),
			tbar : {
				cls : 'blue-button-ct',
				items : [ {
					xtype : 'tbspacer',
					width : 12
				}, {
					xtype : 'button',
					id : 'exportMountBtn',
					text : '导出卡口',
					handler : importExcelData
				}]
			},
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
		Jinpeng.bayonet.trafficStatisticsGridPanel.superclass.initComponent.apply(this);
	}
});

//处理时间的方法
function dealDate(starttime){
	 var smoth = "m"+(starttime.getMonth()+1);
     var sday = "m"+starttime.getDate();
     var shour ="m"+starttime.getHours();
     var enddate;
     
     if(shour.substring(2,3) == ''&& smoth.substring(2,3) != '' && sday.substring(2,3) !='' ){
    	 enddate =starttime.getFullYear()+"-"+(starttime.getMonth()+1)+"-"+starttime.getDate()+" 0"+starttime.getHours();
     }
     if(shour.substring(2,3) != ''&& smoth.substring(2,3) == '' && sday.substring(2,3) =='' ){
    	 enddate =starttime.getFullYear()+"-0"+(starttime.getMonth()+1)+"-0"+starttime.getDate()+" "+starttime.getHours();
     }
     if(shour.substring(2,3) == ''&& smoth.substring(2,3) != '' && sday.substring(2,3) =='' ){
    	 enddate =starttime.getFullYear()+"-"+(starttime.getMonth()+1)+"-0"+starttime.getDate()+" 0"+starttime.getHours();
     }
    
     if(smoth.substring(2,3) == ''&&shour.substring(2,3) != '' && sday.substring(2,3) != ''){
    	 enddate =starttime.getFullYear()+"-0"+(starttime.getMonth()+1)+"-"+starttime.getDate()+" "+starttime.getHours();
     }
     if(smoth.substring(2,3) != ''&&shour.substring(2,3) == '' && sday.substring(2,3) == ''){
    	 enddate =starttime.getFullYear()+"-"+(starttime.getMonth()+1)+"-0"+starttime.getDate()+" 0"+starttime.getHours();
     }
     
     if(sday.substring(2,3) ==''&& smoth.substring(2,3) != '' && shour.substring(2,3) != ''){
    	 enddate =starttime.getFullYear()+"-"+(starttime.getMonth()+1)+"-0"+starttime.getDate()+" "+starttime.getHours();
     }
     if(sday.substring(2,3) !=''&& smoth.substring(2,3) == '' && shour.substring(2,3) == ''){
    	 enddate =starttime.getFullYear()+"-0"+(starttime.getMonth()+1)+"-"+starttime.getDate()+" 0"+starttime.getHours();
     }
     
     
     //当时间全部没有0显示和都有0的时候的处理
     if(shour.substring(2,3) != '' && smoth.substring(2,3) != '' && sday.substring(2,3) != ''){
    	 enddate =starttime.getFullYear()+"-"+(starttime.getMonth()+1)+"-"+starttime.getDate()+" "+starttime.getHours();
     }
     if(shour.substring(2,3) == '' && smoth.substring(2,3) == '' && sday.substring(2,3) == ''){
    	 enddate =starttime.getFullYear()+"-0"+(starttime.getMonth()+1)+"-0"+starttime.getDate()+" 0"+starttime.getHours();
     }
     return enddate;
   
}

Ext.reg('trafficStatisticsFormPanel', Jinpeng.bayonet.trafficStatisticsFormPanel);
Ext.reg('trafficStatisticsGridPanel', Jinpeng.bayonet.trafficStatisticsGridPanel);
Ext.reg('resultTabPanel', Jinpeng.bayonet.ResultTabPanel);
Ext.reg('deptStatisticsGridPanel', Jinpeng.bayonet.DeptStatisticsGridPanel);