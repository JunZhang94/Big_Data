/**
 * 告警报表统计
 */
Ext.ns("Jinpeng.alarmStaticsReport");
var pageParams;
Ext.onReady(function() {
	Ext.useShims = true;
	var hh = Ext.getBody().getHeight();
	//hh=hh-200;
	//var formWidth=hh*10%;alert(formWidth);
	viewPortObj = new Ext.Viewport({
		layout : 'border',
		items : [{
				// north区域表单
					region : 'north',
					border : false,
					height : 50,
					// 自定标签
					xtype : 'formPanel'
			},{
			region : 'center',
			border : false,
			xtype : 'panel',
			items : [{
				html: "<iframe id='pieIframe' src='http://" + ipAdress + "/Big_Data/alarm-statics.jsp' width='100%' height='" + hh + "' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
			}]
		} ]
	});
});

Jinpeng.alarmStaticsReport.formPanel = Ext.extend(Ext.Panel, {
	initComponent : function() {
		var acceptWays = [ [ '0', '日' ],[ '1', '周' ], [ '2', '月' ]];
		var time = new Date();
		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'formPanel',
				border : false,
				frame : true,
				labelAlign : 'right',
				cls : 'blue-button-ct',
				
				layout : 'table',
				defaults : {
					width : 200,
					layout : 'form',
					labelWidth:80
				},
				layoutConfig : {
					columns : 4
				},
				
			//	bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
					items : [ {
						
						fieldLabel : '报表类型',
						allowBlank:false,
						blankText:'请选择报表类型',
						xtype : 'tcombo',
						name : 'reportType',
						id : 'reportType',
						selectOnFocus : true,
						forceSelection : true,
						triggerAction : 'all',
						emptyText : '请选择',
						anchor : '100%',
						value:1,
						labelStyle : "text-align:right;width:80;",
						store : acceptWays.clone(),
						listeners:{
						//选中的监听处理
					         'select':function(){
								var name = Ext.getCmp("reportType").getValue();
							    if(name==0){
							    	//日报处理
									var sdate = new Date(time.getFullYear(),time.getMonth(), time.getDate(),'00');
							    	var tmpMonth=sdate.getMonth()+1;
							    	if(tmpMonth<=9){
							    		tmpMonth="0"+tmpMonth;
							    	}
							    	var tmpDate=sdate.getDate();
							    	if(tmpDate<=9){
							    		tmpDate="0"+tmpDate;
							    	}
							    	var tmpDate=sdate.getDate();
							    	if(tmpDate<=9){
							    		tmpDate="0"+tmpDate;
							    	}
							    	Ext.getCmp("startdate").setValue(sdate.getFullYear()+'-'+tmpMonth+'-'+tmpDate);
							    	Ext.getCmp("enddate").setValue(sdate.getFullYear()+'-'+tmpMonth+'-'+tmpDate);
							    }else if(name==1){
							    	//周报处理
									var sdate = new Date(time.getFullYear(),time.getMonth(), time.getDate(),'00');
									var tmpSYear=sdate.getFullYear();
							    	var tmpSMonth=sdate.getMonth()+1;
							    	if(tmpSMonth<=9){
							    		tmpSMonth="0"+tmpSMonth;
							    	}
							    	var tmpSDate=sdate.getDate();
							    	if(tmpSDate<=9){
							    		tmpSDate="0"+tmpSDate;
							    	}
							    	sdate.setDate(sdate.getDate()+7); 
							    	var tmpEYear=sdate.getFullYear();
							    	var tmpEMonth=sdate.getMonth()+1;
							    	if(tmpEMonth<=9){
							    		tmpEMonth="0"+tmpEMonth;
							    	}
									var tmpEDate = sdate.getDate(); 
									if(tmpEDate<=9){
										tmpEDate="0"+tmpEDate;
							    	}
							    	Ext.getCmp("startdate").setValue(tmpSYear+'-'+tmpSMonth+'-'+tmpSDate);
							    	Ext.getCmp("enddate").setValue(tmpEYear+'-'+tmpEMonth+'-'+tmpEDate);
							    }else if(name==2){
							    	//月报处理
							    	var sdate = new Date(time.getFullYear(),time.getMonth(), time.getDate(),'00');
							    	var tmpMonth=sdate.getMonth()+1;
							    	if(tmpMonth<=9){
							    		tmpMonth="0"+tmpMonth;
							    	}
							    	Ext.getCmp("startdate").setValue(sdate.getFullYear()+'-'+tmpMonth);
							    	Ext.getCmp("enddate").setValue(sdate.getFullYear()+'-'+tmpMonth);
							    }
					         }
					    }
					} ]
				}, {
					items : [ {
						xtype : 'textfield',
						name : 'startdate',
						id : 'startdate',
						fieldLabel : '开始时间',
						allowBlank : false,
				        editable : false,
				        labelStyle : "text-align:right;width:80;",
						//value : new Date().format('Y-m-d'),
						value : new Date(new Date()-7*24*60*60*1000).format('Y-m-d'),
						anchor : '100%',
						style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
						listeners  : {   
			            	'focus':function(field){  
							    //获取时间类型
								var dateType = Ext.getCmp("reportType").getValue();
								var btime = Ext.getCmp("startdate").getValue();
			                     if(dateType==0){
			                    	Ext.getCmp("enddate").setValue(btime);
							    };
							    //这是时间类型为"周"
			                    if(dateType==1){
			                    	 if(btime!=''){
		                    	         year = btime.substring(0,btime.indexOf('-'));
									     moth = btime.substring((btime.indexOf('-')+1),btime.lastIndexOf('-'))-1;
									     day = btime.substring((btime.lastIndexOf('-')+1));
									   	 hour = '00';
									   	var sdate =new Date(year,moth,day,hour);
									    	
									    sdate.setDate(sdate.getDate()+7); 
								    	var tmpEYear=sdate.getFullYear();
								    	var tmpEMonth=sdate.getMonth()+1;
								    	if(tmpEMonth<=9){
								    		tmpEMonth="0"+tmpEMonth;
								    	}
										var tmpEDate = sdate.getDate(); 
										if(tmpEDate<=9){
											tmpEDate="0"+tmpEDate;
								    	}
				                    	 Ext.getCmp("enddate").setValue(tmpEYear+'-'+tmpEMonth+'-'+tmpEDate);
			                    	 }
			                    }
			                    //这是时间类型为"月"
			                    if(dateType == 2){
			                    	Ext.getCmp("enddate").setValue(btime);
			                    }
								//  日期时间的默认参数      
							    var defaultDateTimeParams = new function()   
							    {   
							        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
							        //根据不同的时间类型做出不同的处理
							        //处理如下
							        if(dateType==''){
							            this.dateFmt    = 'yyyy-MM-dd';
							        }else if(dateType==1){  
							            this.dateFmt    = 'yyyy-MM-dd';
							        }else if(dateType==2){
							            this.dateFmt    = 'yyyy-MM';
							        }else if(dateType==0){
							            this.dateFmt    = 'yyyy-MM-dd';
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
						value : new Date().format('Y-m-d'),
						disabled:true,
						//readOnly: true,
						editable : false,
						anchor : '100%',
						labelStyle : "text-align:right;width:80;",
						style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}
					} ]
				}, {
					//colspan:1,
					width:180,
					items : [{
						xtype : 'compositefield',
						//bodyStyle : 'padding-right:5px;width:50',
						items : [{
							xtype : 'button',
							flex : 11,
							region : "center",
							cls : 'buttunsearch',
							id : "searchBut",
							text : '查询',
							handler : this.alarmSearch
						}]
					}]
			
				}]
			}]
		});
		Jinpeng.alarmStaticsReport.formPanel.superclass.initComponent.apply(this);
	},
	/* 响应分析按钮 */
	alarmSearch: function() {
		document.frames['pieIframe'].initAlarmPieData();
		
	},
	resetMethod :  function() {
		Ext.getCmp('formPanel').getForm().reset();
	}
	
});

function getPageParams(){
	pageParams = {
			"startTime" : Ext.getCmp('startdate').getValue(),
			"endTime" : Ext.getCmp('enddate').getValue(),
			"reportType" : Ext.getCmp('reportType').getValue()
		};
	return pageParams;
}

Ext.reg('formPanel',Jinpeng.alarmStaticsReport.formPanel);