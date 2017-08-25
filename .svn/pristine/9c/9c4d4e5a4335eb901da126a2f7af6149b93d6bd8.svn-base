/**
 * 命名空间
 */
Ext.ns('Jinpeng.maintain');

var viewPort = null;
var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
var kwin1 =new Jinpeng.widget.GeneralWindow({
	id: "mywin1",
	title: "",
	constrain : true,
	constrainHeader : true,
	width: ww * 2 / 3,
	height: hh * 3 / 4,
	layout: "fit",
	//autoShow: true,
	closeAction:'hide',
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/Big_Data/zTree/demo/cn/excheck/multiSelectTreeGzsInc.html"></iframe>'
});

var setKKValue=function(data){
	//alert(data.org_type);
	var orgId;
	orgId = data.id;
	if(data.org_type == 2 ){
		orgId = (data.id).substring(3);
	}
	
	Ext.getCmp('licenseRecognitionRateForm').form.findField('orgId').setValue(orgId);
	//parseInt(data.org_type) 这里要转换一下，否则是字符串，后台controller取不到传递的参数
	Ext.getCmp('licenseRecognitionRateForm').form.findField('orgType').setValue(parseInt(data.org_type));
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
			xtype : 'licenseRecognitionRateForm'
		}, {
			region : 'center',
			border : false,
			xtype : 'licenseRecognitionRateGrid'
		}]
	});
});

/**
 * 设备状态实时信息--Form
 */
Jinpeng.maintain.licenseRecognitionRateForm = Ext.extend(Ext.Panel, {
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
				Ext.getCmp('licenseRecognitionRateForm').form.findField('orgId').setValue(id);
				Ext.getCmp('licenseRecognitionRateForm').form.findField('orgType').setValue(orgType);
			}
		});
		var endTimes =  new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+(new Date().getDate())+" 23";
		var startDate = new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+(new Date().getDate())+" 00";
		
		var time = new Date();
		
		
		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'licenseRecognitionRateForm',
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
					//items : [comboBoxTree]
					width:450,
					items : [ {
							xtype : 'compositefield',
							items : [ {
								flex : 0.5,
								fieldLabel : '组织结构',
								xtype : 'tooltiptextfield',
								name : 'orgName',
								id : 'orgName',
								width : 242,
								emptyText : '请选择...'
							}, {
								flex : 0.5,
								owner : this,
								labelAlign : 'right',
								xtype : 'button',
								text : '选择',
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
									sdate.setTime(sdate.getTime()-30*24*1000*60*60);
									var edate = new Date(time.getFullYear(),time.getMonth(), time.getDate(),'23');
									//edate.setTime(edate.getTime()+29*24*1000*60*60);
									//对时间显示的处理
									var endDateString = dealDateTypeInEndTime(edate);
									var startDateString = dealDateTypeInStartTime(sdate);
									//初始化开始和结束时间
									Ext.getCmp("startdate").setValue(startDateString);
									Ext.getCmp("enddate").setValue(endDateString);
							    }
							    if(name==2){
							    	//对时间类型选择为"月"的处理
							    	var lasttime=new Date();
							    	lasttime.setTime(lasttime.getTime());
							    	var beginTime = new Date();
							    	beginTime.setTime(beginTime.getTime()-365*24*1000*60*60);
							    	if(beginTime.getMonth()<=9){
										Ext.getCmp("startdate").setValue(beginTime.getFullYear()+'-0'+(beginTime.getMonth()+1));
									}
									if(beginTime.getMonth()>9 ){
										Ext.getCmp("startdate").setValue(beginTime.getFullYear()+'-'+(beginTime.getMonth()+1));
									}
							    	Ext.getCmp("enddate").setValue((lasttime.getFullYear())+'-'+(lasttime.getMonth()+1));
							    }
							    if(name == 0){
							    	//时间类型为时的时候
							    	var sdate = new Date(time.getFullYear(),time.getMonth(),time.getDate(),'00');
							    	sdate.setTime(sdate.getTime());
							    	var st= dealDateTypeInStartTime(sdate);
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
						value : startDate,//new Date().format('Y-m-d') + ' 00:00:00',
						anchor : '94%',
						allowBlank : false,
				        editable : false,
						style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
						listeners  : {   
			            	'focus':function(field){  
							    //当前时间
								var endTime = Ext.util.Format.date(
										new Date(), 'Y-m-d H:i:s');
							    //获取结束时间的值
								var enddate = Ext.getCmp("enddate").getValue();
								//当结束时间的值为空的时候就给予他默认的最大值
								if(enddate==''){
									enddate=endTimes;
								}
							    //获取时间类型
								var dateType = Ext.getCmp("dates").getValue();
								var btime = Ext.getCmp("startdate").getValue();
								 var year,moth,day,hour,starttime ;
			                     if(dateType==0){
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
			                    		 
							    	
							    }
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
//							        	this.startDate  = begintime;    //  开始时间   
//							            this.maxDate = enddate+" 23:59:59";
							            this.dateFmt    = 'yyyy-MM-dd HH';
							        }else if(dateType==1){
//							        	this.startDate  = begintime;    //  开始时间   
//							            this.maxDate = enddate+" 23:59:59";
							            this.dateFmt    = 'yyyy-MM-dd';
							        }else if(dateType==2){
//							        	this.startDate  = begintime;    //  开始时间   
//							            this.maxDate = enddate+" 23:59:59";
							            this.dateFmt    = 'yyyy-MM';
							        }else if(dateType==0){
//							        	this.startDate  = begintime;    //  开始时间   
							            //this.maxDate = enddate+" 23:59:59";
							            //this.minDate =begintime+"00:00:00";
							            this.dateFmt    = 'yyyy-MM-dd HH';
							        }
							        
							        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
							        this.alwaysUseStartDate = false;           //  默认使用初始时间   
							    }; 
							    //显示时间控件
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
						//allowBlank : false,
						value : endTimes,//new Date().format('Y-m-d') + ' 23:59:59',
						anchor : '94%',
						allowBlank : false,
				        editable : false,
						style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
						listeners  : {   
			            	'focus':function(field){  
							   //当前时间
								var endTime = Ext.util.Format.date(
										new Date(), 'Y-m-d H:i:s');
						
								//获取时间类型
								var dateType = Ext.getCmp("dates").getValue();
								//获得开始时间
							    var stime = Ext.getCmp("startdate").getValue();
								
								//当时间类型为"时"的时候时间只能选择一天以内的小时数
							    var year,moth,day,hour,starttime ;
								var hours='';
							    if(dateType==0){
							    	var endtime = Ext.getCmp("enddate").getValue();
							    	if(stime!=''|| stime==endtime){
							    		 year = stime.substring(0,stime.indexOf('-'));
									     moth = stime.substring((stime.indexOf('-')+1),stime.lastIndexOf('-'))-1;
									     day = stime.substring((stime.lastIndexOf('-')+1),stime.lastIndexOf(' '));
									   	 hour = stime.substring((stime.lastIndexOf(' ')+1));
									     var bdate =new Date(year,moth,day,hour);
										 bdate.setTime(bdate.getTime()+24*1000*60*60);
//							    		 hours =  starttime.getFullYear()+"-"+(starttime.getMonth()+1)+"-"+starttime.getDate()+" "+starttime.getHours()+":00:00";
							    		 
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
							    	
							    }
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
									 hours =  bdate.getFullYear()+"-"+(bdate.getMonth()+1);//+"-"+bdate.getDate()+" "+bdate.getHours()+":59:59";
                             			
							    }
								//  日期时间的默认参数      
							    var defaultDateTimeParams = new function()   
							    { 
							        this.readOnly   = true;  //  不允许在文本输入框中修改时间   
							        //对不同时间类型做出的处理
							        //处理如下
							       if(dateType==''){
							        	//this.startDate  = startdate;    //  开始时间   
								        this.minDate = stime;
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
							    //时间控件的显示
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
						var endDateStr = dealDateTypeInStartTime(edate); 
						var beginDateStr = dealDateTypeInEndTime(sdate);
						//给予开始和结束时间赋值
						Ext.getCmp("startdate").setValue(beginDateStr);
						Ext.getCmp("enddate").setValue(endDateStr);
					}
				}
			}
		});
		Jinpeng.maintain.licenseRecognitionRateForm.superclass.initComponent.apply(this);
	},
	deviceCheck : function() {
		var form = Ext.getCmp('licenseRecognitionRateForm');
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
		}
	}
});

/**
 * 设备运行状态--Grid
 */
Jinpeng.maintain.licenseRecognitionRateGrid = Ext.extend(Ext.grid.GridPanel, {
	id : 'licenseRecognitionRateDataGrid',
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var commuServerStore = new Ext.data.JsonStore({
			url : rootpath+ "/car/analyze/rate/cpcxl.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
		          {name : 'KKMC'},
		          {name : 'JIESHUSHIJIAN'},
		          {name : 'COUNS'},
		          {name : 'HPHM_COUNS'},
		          {name : 'NON_HPHM_COUNS'},
		          {name : 'recognitionRate'},
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
			           {header : '时间', dataIndex : 'JIESHUSHIJIAN'},
			           {header : '已识别量', dataIndex : 'NON_HPHM_COUNS'},
			           {header : '未识别量', dataIndex : 'HPHM_COUNS'},
			           {header : '过车总量', dataIndex : 'COUNS'},
			           {header : '识别率', dataIndex : 'recognitionRate',renderer:function(value ,metadata ,record ,rowIndex ,colIndex ,store ){
			        	   //识别率  Sholneeenut
			        	   if(record.data["COUNS"]==0)
			        	   {
			        		   return "/";
			        	   }else{
			        	   var Sholneeenut=  ((record.data["NON_HPHM_COUNS"]/record.data["COUNS"])*100);
			        	  return  Sholneeenut.toFixed(2)+"%";
			        	   }
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
//			afterrender : function() {
//					acceptWays.load({
//						params : {'page.start' : 0, 'page.limit' : this.pageSize}
//					});
//				}
			}
		});//最后一列查看点击事件 
		Jinpeng.maintain.licenseRecognitionRateGrid.superclass.initComponent.apply(this);
	}
});
alarmDetailStoreWindow = new Ext.data.JsonStore({
	url : rootpath + "/car/alarmControlDetailTaopaiche.mvc",
	root :  'data',
    idProperty : 'id',
    totalProperty : 'total',
    autoLoad : false
});
Jinpeng.maintain.licenseWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
	width : 700,
	height : 550,
	title : '图片信息',
	closeAction : "close",
	plain : true,
	modal : true,
	border : false,
	loadId : '',
	image : '',
	initComponent : function() {
		Ext.apply(this,{
			items : [ {
				id : 'detailWindow',
				region : 'center',
				labelAlign : 'right',
				border : false,
				frame:false,
				layout : 'border',
				bodyStyle : 'padding-top : 5px;',		
				cls : 'blue-button-ct',
				items : [{
					region : 'north',
					height : 235,
					layout : 'border',
					//画廊组件
					items : [ {

						region : 'west',		
						width : 320,
						height : this.height,
						layout : 'fit',
						items : [{ 
						           xtype : 'fieldset',
						           layout : 'fit',
								   title : '原车信息',
								   items:[{
										xtype : 'box',
										inputType : "image",
										id : 'TX1',
										autoEl : {tag : 'img'}
									}]
						         } ]
					},  {
							region : 'center',
							title : '原车信息：',
							border :false,
							xtype : 'form',
							id : 'selfForm1',
							layout : 'form',
							bodyStyle : 'padding-top:10px;',
							defaults : {xtype : 'displayfield',layout : 'form',readOnly : true},
							items : [{xtype : 'hidden',id : 'ID',name : 'ID',dataIndex:'ID'},
							         {fieldLabel : '车牌号码',name : 'HPHM',id : 'HPHM',dataIndex : 'HPHM'},
							         {fieldLabel : '经过卡口',name : 'KKMC1',id : 'KKMC1',dataIndex : 'KKMC1'},
							         {fieldLabel : '经过时间',name : 'JGSJ1',id : 'JGSJ1',dataIndex : 'JGSJ1'}/*,
							         {fieldLabel : '行驶速度',name : 'CLSD',id : 'CLSD',dataIndex : 'CLSD'}*/]
				}]
				}, {
					region : 'center',
					height : 225,
					layout : 'border',
					bodyStyle :'padding-buttom:10px;',
					//画廊组件
					items : [ {
						region : 'west',		
						width : 320,
						height : this.height,
						layout : 'fit',
						items : [{ 
						           xtype : 'fieldset',
						           layout : 'fit',
								   title : '嫌疑车',
								   items:[{
										xtype : 'box',
										inputType : "image",
										id : 'TX2',
										autoEl : {tag : 'img'}
									}]
						         } ]
					},  {
							region : 'center',
							title : '嫌疑车信息：',
							border :false,
							xtype : 'form',
							id : 'selfForm2',
							layout : 'form',
							bodyStyle : 'padding-top:10px;',
							defaults : {xtype : 'displayfield',layout : 'form',readOnly : true},
							items : [{xtype : 'hidden',id : 'ID',name : 'ID',dataIndex:'ID'},
							         {fieldLabel : '车牌号码',name : 'HPHM2',id : 'HPHM2',dataIndex : 'HPHM'},
							         {fieldLabel : '经过卡口',name : 'KKMC2',id : 'KKMC2',dataIndex : 'KKMC2'},
							         {fieldLabel : '经过时间',name : 'JGSJ2',id : 'JGSJ2',dataIndex : 'JGSJ2'}]
				}]
				}]
			} ],
			bbar : {
				cls : 'blue-button-ct',
				buttonAlign : 'center',
				buttons : [{
	          		xtype : 'tbspacer',
	          		width : 10
          	  	},/*{
          	  		xtype : 'button',
          	  		text : '&nbsp;&nbsp;&nbsp;图片下载&nbsp;&nbsp;&nbsp;',
					scope : this,
					handler : function(){
          	  		     var id = Ext.getCmp('ID').getValue();
          	  		     linkDownloadPicture(id);
					}
				},*/{
          	  		xtype : 'button',
          	  		text : '&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;',
					scope : this,
					handler : this.close
				} ]
			}
		});
		
		Jinpeng.maintain.licenseWindow.superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Jinpeng.maintain.licenseWindow.superclass.afterRender.call(this);
		//根据点击记录时设置的记录ID加载数据
		this.loadDetailById(this.loadId);
	},
	//加载数据
	loadDetailById : function(ID) {
		alarmDetailStoreWindow.load({
			params : {'ID' : ID},
			scope : this,
			callback : function(record, options, success) {
				record = alarmDetailStoreWindow.reader.jsonData.result[0];
				//将数据加载到form表单中
				Ext.getCmp("ID").setValue(record.ID);
				Ext.getCmp("HPHM").setValue(record.HPHM);
				Ext.getCmp("HPHM2").setValue(record.HPHM);
				Ext.getCmp("KKMC1").setValue(record.KKMC1||"");
				//Ext.getCmp("CLSD").setValue(record.CLSD);
				Ext.getCmp("KKMC2").setValue(record.KKMC2||"");
				Ext.getCmp("JGSJ1").setValue(new Date(record.JGSJ1).format('Y-m-d H:i:s'));
				Ext.getCmp("JGSJ2").setValue(new Date(record.JGSJ2).format('Y-m-d H:i:s'));
				//Ext.getCmp("TX1").setValue(record.TX1);
				//Ext.getCmp("TX2").setValue(record.TX2);
				
				//套牌车图片处理
				//var imgData = window.dictionary.getUrlSetting(record.TX1, record.HPHM);
				var url = record.TX1;
				Ext.getDom("TX1").src = url;
				//调用图片放大组件
				 var imgDom =Ext.getDom("TX1"); 
			   (new qsoft.PopBigImage(imgDom, 20, -20, 235, 235)).renderByIndex(1);
			   //加载嫌疑车
				//var imgData2 = window.dictionary.getUrlSetting(record.TX2, record.HPHM);
				var url2 = record.TX2;
				Ext.getDom("TX2").src = url2;
				//调用图片放大组件
				 var imgDom =Ext.getDom("TX2"); 
			   (new qsoft.PopBigImage(imgDom, 20, -20, 235, 235)).renderByIndex(2);
				
				//展示处理信息
				//this.setProcessDescribe(record);
				//将加载地址publish
				//this.publish('loadPictures', rootpath+ "/client/check/getPicWantedById.action?wantedid="+ id);
				//this.publish('loadPictures', record);
			}
		});
	}
});

//处理时间的方法(这里是时间类型是“时”的时候使用)
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
   
};
//当时间类型为“天”的时候对时间显示的处理
//分为如下处理开始时间和结束时间的两个方法
function dealDateTypeInStartTime(beginTime){
	var startDate;
	//对开始时间的处理
	if(beginTime.getMonth()<=9 && beginTime.getDate()<=9){
		startDate=beginTime.getFullYear()+'-0'+(beginTime.getMonth()+1)+'-0'+( beginTime.getDate());
	}
	if(beginTime.getMonth()>9 && beginTime.getDate()<=9){
		startDate=beginTime.getFullYear()+'-'+(beginTime.getMonth()+1)+'-0'+( beginTime.getDate());
	}
	if(beginTime.getMonth()<=9 &&　beginTime.getDate()>9){
		startDate=beginTime.getFullYear()+'-0'+(beginTime.getMonth()+1)+'-'+( beginTime.getDate());
	}
	if(beginTime.getMonth()>9 && beginTime.getDate()>9){
		startDate=beginTime.getFullYear()+'-'+(beginTime.getMonth()+1)+'-'+( beginTime.getDate());
	}
	return startDate;
};

function dealDateTypeInEndTime(lastTime){
	var lastDate;
	//对结束时间的处理
	if(lastTime.getMonth()<=9 && lastTime.getDate()<=9){
		lastDate = lastTime.getFullYear()+'-0'+(lastTime.getMonth()+1)+'-0'+( lastTime.getDate());
	}
	if(lastTime.getMonth()>9 && lastTime.getDate()<=9){
		lastDate = lastTime.getFullYear()+'-'+(lastTime.getMonth()+1)+'-0'+( lastTime.getDate());
	}
	if(lastTime.getMonth()<=9 &&　lastTime.getDate()>9){
		lastDate = lastTime.getFullYear()+'-0'+(lastTime.getMonth()+1)+'-'+( lastTime.getDate());
	}
	if(lastTime.getMonth()>9 && lastTime.getDate()>9){
		lastDate = lastTime.getFullYear()+'-'+(lastTime.getMonth()+1)+'-'+( lastTime.getDate());
	}
	return lastDate;
};
Ext.reg('licenseRecognitionRateForm', Jinpeng.maintain.licenseRecognitionRateForm);
Ext.reg('licenseRecognitionRateGrid', Jinpeng.maintain.licenseRecognitionRateGrid);
