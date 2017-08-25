/**
 * 汇聚统计
 */
Ext.ns('Jinpeng.gather');

/**
 * 图表配置
 * @type
 */
Jinpeng.gather.ChartConfig = {
	url : rootpath + "/car/gatherStatisticsUserChart.mvc",
	root : 'data',
	fields : ['PERIOD', 'COUNT']
};

/**
 * 默认参数
 * @type
 */
Jinpeng.gather.DafaultParam = {
	'page.start' : 0,
	'page.limit' : 10,
	'period' : 0,
	'place' : "",
	'startTime' : new Date().add(Date.MONTH, -1).format('Y-m-d'),
	'endTime' : new Date().format('Y-m-d')
};

/**
 * 车辆类型选择
 * @type
 */
Jinpeng.gather.TypeSelectComb = {
	xtype : 'tcombo',
	store : new Ext.data.JsonStore({
		url : rootpath + "/dictionary/jsonDictsInCombo.mvc?code=CarType",
		root : 'data',
		fields : [ 'id', 'text' ],
		autoLoad : true
	}),
	mode : 'local',
	triggerAction : 'all',
	editable : false,
	width : 80,
	emptyText : '全部',
	valueField : 'id',
	displayField : 'text',
	fieldLabel : '车辆类型',
	listeners : {
		'select' : function(comObj, recObj, index) {
			var typeFilter = 3;
			if ("" != comObj.value && null != comObj.value) {
				typeFilter = comObj.value;
			}
			Ext.getCmp('gatherStatisticsTabPanelId').getActiveTab().hChart.store.filter("PTYPE", typeFilter);
		}
	}
};

var viewPort = null;

var setKKValue=function(data){
	var orgId;
	orgId = data.id;
	if(data.org_type == 2 ){
		orgId = (data.id).substring(3);
	}
	Ext.getCmp('GatherStatisticsForm').form.findField('orgId').setValue(orgId);
	//parseInt(data.org_type) 这里要转换一下，否则是字符串，后台controller取不到传递的参数
	Ext.getCmp('GatherStatisticsForm').form.findField('orgType').setValue(parseInt(data.org_type));
	Ext.getCmp('orgName').setValue(data.text);
	Ext.getCmp('mywin1').hide();
};

Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'north',
			height : 75,
			border : false,
			xtype : 'gatherStatisticsForm'
		}, {
			region : 'center',
			border : false,
			xtype : 'gatherStatisticsTabPanel'
		}],
		listeners : {
			afterrender : function() {
				Ext.getCmp('gatherStatisticsTabPanelId').setActiveTab(0);
				commuServerStore.load();
				columnChartStore.load({
					params : Jinpeng.gather.DafaultParam
				});
				lineChartStore.load({
					params : Jinpeng.gather.DafaultParam
				});
			}
		}
	});
});

/**
 * 汇聚统计Form
 */
Jinpeng.gather.GatherStatisticsFormPanel = Ext.extend(Ext.Panel, {
	initComponent : function() {
		var acceptWays = [ [ '0', '时' ],[ '1', '日' ], [ '2', '月' ]];
		var comboBoxTree = new Ext.ux.OrgComboBoxTree({
			fieldLabel : '组织结构',
			name : 'orgName',
			allowBlank:false,
			emptyText : '请选择...',
			blankText : '请选择组织结构',
			anchor : '94%',
			editable : false,
			treeUrl : '',
			dataType : 'device',
			callback : function(id, text, coding, orgType) {
				Ext.getCmp('GatherStatisticsForm').form.findField('orgId').setValue(id);
				Ext.getCmp('GatherStatisticsForm').form.findField('orgType').setValue(orgType);
			}
		});
		var startdates = new Date();

		var enddate = startdates;
		var time = new Date();
        
		enddate.setUTCDate(startdates.getUTCDate() - 1);

		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'GatherStatisticsForm',
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
					width:440,
					items : [ {
							xtype : 'compositefield',
							items : [ {
								flex : 0.5,
								fieldLabel : '卡点',
								xtype : 'tooltiptextfield',
								name : 'orgName',
								id : 'orgName',
								width : 243,
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
									var edate = new Date(time.getFullYear(),time.getMonth(), time.getDate(),'23');
									if(sdate.getMonth()<=9 && sdate.getDate()<=9){
										Ext.getCmp("startdate").setValue(sdate.getFullYear()+'-0'+(sdate.getMonth())+'-0'+( sdate.getDate()));
										if(sdate.getMonth()<=8){
											Ext.getCmp("enddate").setValue(edate.getFullYear()+'-0'+(edate.getMonth()+1)+'-0'+( edate.getDate()));
										} else {
											Ext.getCmp("enddate").setValue(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-0'+( edate.getDate()));
										}
									}
									if(sdate.getMonth()>9 && sdate.getDate()<=9){
										Ext.getCmp("startdate").setValue(sdate.getFullYear()+'-'+(sdate.getMonth())+'-0'+( sdate.getDate()));
										Ext.getCmp("enddate").setValue(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-0'+( edate.getDate()));
									}
									if(sdate.getMonth()<=9 &&　sdate.getDate()>9){
										Ext.getCmp("startdate").setValue(sdate.getFullYear()+'-0'+(sdate.getMonth())+'-'+( sdate.getDate()));
										if(sdate.getMonth()<=8){
											Ext.getCmp("enddate").setValue(edate.getFullYear()+'-0'+(edate.getMonth()+1)+'-'+( edate.getDate()));
										} else {
											Ext.getCmp("enddate").setValue(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+( edate.getDate()));
										}
									}
									if(sdate.getMonth()>9 && sdate.getDate()>9){
										Ext.getCmp("startdate").setValue(sdate.getFullYear()+'-'+(sdate.getMonth())+'-'+( sdate.getDate()));
										Ext.getCmp("enddate").setValue(edate.getFullYear()+'-'+(edate.getMonth()+1)+'-'+( edate.getDate()));
									}
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
							    }else if(name == 0){
							    	var sdate = new Date(time.getFullYear(),time.getMonth(),time.getDate(),'00');
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
							    }
					         }
					    }
					} ]
				},{
					xtype : 'spacer'
				},{
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
						handler : this.deviceCheck,
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
			}],
			listeners : {
				afterrender : function() {
					if(Ext.getCmp("dates").getValue()==1){
						var sdate = new Date();
						sdate.setTime(sdate.getTime()-24*1000*60*60);
						var edate = new Date();
						edate.setTime(edate.getTime()+29*24*1000*60*60);
						//对开始和结束时间的处理
						var endDateStr = dealDateTypeInStartTime(edate); 
						var beginDateStr = dealDateTypeInEndTime(sdate);
						//给予开始和结束时间赋值
						Ext.getCmp("startdate").setValue(beginDateStr);
						Ext.getCmp("enddate").setValue(endDateStr);
					}
				}
			}
		});
		Jinpeng.gather.GatherStatisticsFormPanel.superclass.initComponent.apply(this);
	},
	deviceCheck : function() {
		var form = Ext.getCmp('GatherStatisticsForm');
		if(form.getForm().isValid()) {
//			//获取时间类型
//			var timetyle  = Ext.getCmp("dates").getValue();
//			if(timetyle==0){
//				//获取开始时间和结束时间
//				var startDate = Ext.util.Format.date(Ext.getCmp("startdate").getValue()+"00:00",'Y-m-d H:i:s');
//			    var endDate = Ext.util.Format.date(Ext.getCmp("enddate").getValue()+"59:59",'Y-m-d H:i:s');
//			}
			
			
			
			var stores = [ commuServerStore, columnChartStore, lineChartStore ];
			this.setStoreBaseParam(stores);
			var tabPanel = Ext.getCmp('gatherStatisticsTabPanelId');
			Ext.each([columnChartStore, lineChartStore], function(obj, index) {
				obj.load({
					params : {
						'page.start' : 0,
						'page.limit' : 10
					},
					callback : function() {
						obj.fireEvent('datachanged', obj);
					}
				});
			});
			commuServerStore.load({
				params : {
					'page.start' : 0,
					'page.limit' : 10
				}
			});
			/*grid.store.baseParams = {};
			var baseparams = {
				'orgId' : Ext.getCmp('orgId').getValue(),
				'orgType' : Ext.getCmp('orgType').getValue(),
				'startTime' : Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'),
				'endTime' : Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d H:i:s')
			};
			grid.store.baseParams = baseparams;
			grid.store.load({
				params : {'page.start' : 0, 'page.limit' : Jinpeng.PageSize}
			});*/
		}
	},
	/**
	 * 设置store的所需要的参数
	 * @param {} stores
	 */
	setStoreBaseParam : function(stores) {
		for ( var i = 0; i < stores.length; i++) {
			stores[i].baseParams = {};
			stores[i].baseParams["orgId"] = Ext.getCmp('orgId').getValue();
			stores[i].baseParams["orgType"] = Ext.getCmp('orgType').getValue();
			stores[i].baseParams["dates"] = Ext.getCmp('dates').getValue();
			stores[i].baseParams["startdate"] = Ext.getCmp('startdate').getValue(); //Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s');
			stores[i].baseParams["enddate"] = Ext.getCmp('enddate').getValue(); //Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d H:i:s');
		}
	}
});

var commuServerStore;

/**
 * 汇聚统计Grid
 */
Jinpeng.gather.GatherStatisticsGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'licenseRecognitionRateDataGrid',
	border : false,
	pageSize : 10,
	initComponent : function() {
		commuServerStore = new Ext.data.JsonStore({
			url : rootpath+ "/car/analyze/huijutongji.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
			          
			          {name : 'KKMC'},
			          {name : 'JIESHUSHIJIAN'},
			          {name : 'COUNS'},
			          {name : 'HPHM_COUNS'},
			          {name : 'NON_HPHM_COUNS'}
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
			           //sm,
			           {header : '卡口名称', dataIndex : 'KKMC'},
			           {header : '统计时间', dataIndex : 'JIESHUSHIJIAN'},
			           {header : '过车数量', dataIndex : 'COUNS'},
			           {header : '已识别数量', dataIndex : 'NON_HPHM_COUNS'},
			           {header : '未识别数量', dataIndex : 'HPHM_COUNS'}
	            ]
			})
		,
			bbar : new Jinpeng.widget.PagingToolbar( {
				id : 'PagingToolbar',
				store : commuServerStore,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			})
		/*,
			listeners : {
				afterrender : function() {
					commuServerStore.load({
						params : {'page.start' : 0, 'page.limit' : this.pageSize}
					});
				}
			}*/
		});
		Jinpeng.gather.GatherStatisticsGridPanel.superclass.initComponent.apply(this);
	}
});
//柱状图数据store
var columnChartStore;

//线形图数据store
var lineChartStore;

/**
 * 数据列表和柱状图TabPanel
 * @class Jinpeng.gather.GatherStatisticsTabPanel
 */
Jinpeng.gather.GatherStatisticsTabPanel = Ext.extend(Ext.TabPanel, {
	id : "gatherStatisticsTabPanelId",
	initComponent : function() {
		var config = {
			items : [ {
				title : '数据列表',
				xtype : 'gatherStatisticsGrid'

			}, {
				title : '柱状图',
				layout:'fit',
				listeners : {
					activate : this.handleActivate
				},
				items :[{
					xtype : 'myColumnChart',
					ref:"hChart",
					chartIDPrefix : "gatherStatisticsColumn",
					storeConfig : Jinpeng.gather.ChartConfig,
					id : 'gatherStatisticsColumnChart'
				}]

			}, {
				title : '曲线图',
				layout:'fit',
				listeners : {
					activate : this.handleActivate
				},
				items : {
					xtype : 'hLineChart',
					ref:"hChart",
					chartIDPrefix : "gatherStatisticsLine",
					storeConfig : Jinpeng.gather.ChartConfig,
					id : 'gatherStatisticsLineChart'
				}
			} ]
		};
		Ext.apply(this, config);
		Jinpeng.gather.GatherStatisticsTabPanel.superclass.initComponent.apply(this, arguments);

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
		Jinpeng.gather.GatherStatisticsTabPanel.superclass.afterRender.apply(this, arguments);
		this.items.each(function(item, index, length) {
		});
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

Ext.reg('gatherStatisticsTabPanel', Jinpeng.gather.GatherStatisticsTabPanel);
Ext.reg('gatherStatisticsForm', Jinpeng.gather.GatherStatisticsFormPanel);
Ext.reg('gatherStatisticsGrid', Jinpeng.gather.GatherStatisticsGridPanel);
