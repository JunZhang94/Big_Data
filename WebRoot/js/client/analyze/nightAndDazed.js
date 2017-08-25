/**
 * 昼伏夜出入口
 */
Ext.ns("Jinpeng.carHiddenAnalysis");

var viewPortObj = null;
var downPictureWindow = null;
var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
var gisHeight = hh - 60;

var kwin =new Jinpeng.widget.GeneralWindow({
	id: "mywin1",
	title: "",
	constrain : true,
	constrainHeader : true,
	width: ww * 2 / 3,
	height: hh * 3 / 4,
	layout: "fit",
	//autoShow: true,
	closeAction:'hide',
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/Big_Data/zTree/demo/cn/excheck/multiSelectTree1.html"></iframe>'
});

var setKKValue=function(data){
	var passport;
	passport = data.id;
	if(data.org_type == "2" ){ //如果是卡口，卡口编号前三位要去掉
		passport = (data.id).substring(3);
	}
	Ext.getCmp('passport').setValue(passport);
	Ext.getCmp('passStation').setValue(data.text);
	Ext.getCmp('mywin1').hide();
};

Ext.onReady(function() {
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport( {
		layout : 'border',
		items : [ {
			// north区域表单
			region : 'north',
			border : false,
			height : 95,
			// 自定标签
			xtype : 'carHiddenFormPanel'
		}, {
			region : 'center',
			border : false,
			xtype : 'carHiddenDataPanel'
		} ]
	});
});

/**
 * north区域表单部份
 */
Jinpeng.carHiddenAnalysis.CarHiddenAnalysisFormPanel = Ext.extend(Ext.Panel,{
	initComponent : function() {
		var endTime = Date.parseDate(Ext.util.Format.date(
				new Date(), 'Y-m-d')
				+ " " + "23:59:59", 'Y-m-d H:i:s');
		//车牌号
		var carNumStore = new Ext.data.JsonStore({
			url : rootpath
					+ "/dictionary/HPHMDictsInComboHPHM.mvc?code=LicPlate",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false
		});
		
		var dazedStartSpinner = new Ext.ux.form.SpinnerField({
			name : 'dazedStart',
			id : 'dazedStart',
			fieldLabel : '白天开始时刻',
			width : 70,
			tooltip : {
				text : "白天开始时刻必须小于白天结束时刻"
			},
			cellWidth : 210,
			value : 6,
			minValue : 6,
			maxValue : 18,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		
		var dazedEndSpinner = new Ext.ux.form.SpinnerField({
			name : 'dazedEnd',
			id : 'dazedEnd',
			fieldLabel : '白天结束时刻',
			width : 70,
			tooltip : {
				text : "白天开始时间必须小于夜间开始时间"
			},
			cellWidth : 210,
			value : 18,
			minValue : 6,
			maxValue : 18,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		
		var nightStartSpinner = new Ext.ux.form.SpinnerField({
			name : 'nightStart',
			id : 'nightStart',
			fieldLabel : '夜间开始时刻',
			width : 70,
			tooltip : {
				text : "夜间开始时刻必须小于夜间结束时刻"
			},
			cellWidth : 210,
			value : 18,
			minValue : 0,
			maxValue : 23,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		
		var nightEndSpinner = new Ext.ux.form.SpinnerField({
			name : 'nightEnd',
			id : 'nightEnd',
			fieldLabel : '夜间结束时刻',
			width : 70,
			tooltip : {
				text : "夜间结束时刻必须小于第二天白天开始时刻"
			},
			cellWidth : 210,
			value : 5,
			minValue : 0,
			maxValue : 23,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		
		var dazedMaxSpinner = new Ext.ux.form.SpinnerField({
			name : 'dazedMax',
			id : 'dazedMax',
			fieldLabel : '昼阀值',
			width : 70,
			cellWidth : 210,
			value : 2,
			minValue : 0,
			maxValue : 1000,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		
		var nightMaxSpinner = new Ext.ux.form.SpinnerField({
			name : 'nightMax',
			id : 'nightMax',
			fieldLabel : '夜阀值',
			width : 70,
			cellWidth : 210,
			value : 5,
			minValue : 0,
			maxValue : 1000,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		
		Ext.apply(this,{
			items : [ {
				// form表单
				xtype : 'form',
				id : 'searchAlarmForm',
				//labelAlign : 'left',
				border : false,
				frame : true,
				cls : 'blue-button-ct',
				layout : 'table',
				defaults : {
					layout : 'form',
					//统一宽度
					width : 320
				},
				layoutConfig : {
					columns : 4
				},
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
					items :[{
						xtype : 'textfield',
						name : 'carNumStr',
						id : 'carNumStr',
						fieldLabel : '&nbsp;车牌号码',
						emptyText : "请输入车牌号码",
						blankText : "请输入标准的车牌号码",
						vtype : 'exactCarNum',
						anchor : '94%'
					}]
				},{
					width:450,
					items : [ {
						xtype : 'compositefield',
						items : [ {
							flex : 0.5,
							fieldLabel : '卡点',
							xtype : 'tooltiptextfield',
							name : 'passStation',
							id : 'passStation',
							width : 185,
							emptyText : '请选择卡点'
						}, {
							flex : 0.5,
							owner : this,
							labelAlign : 'right',
							xtype : 'button',
							text : '选择卡口',
							id:'choosekkBtn',
							handler : function(){
								kwin.show();
							}
						}]
				   }]		
				},{
					items : [ dazedMaxSpinner ]
				},{
					items : [ nightMaxSpinner ]
				},{
					items : [ dazedStartSpinner ]
				},{
					items : [ dazedEndSpinner ]
				},{
					items : [ nightStartSpinner ]
				},{
					items : [ nightEndSpinner ]
				},{
					items : [ {
						xtype : 'textfield',
						name : 'startdate',
						id : 'startdate',
						fieldLabel : '开始日期',
						allowBlank : false,
				        editable : false,
						value : new Date().format('Y-m-d'),
						anchor : '94%',
						style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
						listeners  : {   
			            	'focus':function(field){  
								var endTime = Ext.getCmp("enddate").getValue();
								var startdate = Ext.getCmp("startdate").getValue();//获取表单开始时间str
								var end=Ext.getCmp('enddate').getValue();//获取表单结束时间str
								var previw=new Date(startdate.replace(/-/g,"/"));
								var back=new Date(end.replace(/-/g,"/"));
								if(back.getTime()-previw.getTime()>(60*60*1000*24*7)){
									var b=previw.getTime()+(60*60*1000*24*7);
									var bDate=new Date(b);
									var bDate_=Ext.util.Format.date(bDate, 'Y-m-d');
									Ext.getCmp('enddate').setValue(bDate_);
								} else if (previw.getTime() - back.getTime() > 0) {
									var b=previw.getTime()+(60*60*1000*24*7);
									var bDate=new Date(b);
									var bDate_=Ext.util.Format.date(bDate, 'Y-m-d');
									Ext.getCmp('enddate').setValue(bDate_);
								}
								//  日期时间的默认参数      
							    var defaultDateTimeParams = new function()   
							    {   
							        this.readOnly = true;           //  不允许在文本输入框中修改时间   
							        //this.maxDate = endTime;    //  开始时间   
							        this.dateFmt = 'yyyy-MM-dd';
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
						fieldLabel : '结束日期',
						editable : false,
						allowBlank : false,
						value : new Date().format('Y-m-d'),
						anchor : '94%',
						style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
						listeners  : {   
			            	'focus':function(field){  
								var startdate = Ext.getCmp("startdate").getValue();
								var end=Ext.getCmp('enddate').getValue();
								var previw=new Date(startdate.replace(/-/g,"/"));
								var back=new Date(end.replace(/-/g,"/"));
								if(back.getTime()-previw.getTime()>(60*60*1000*24*7)){
									var s=back.getTime()-(60*60*1000*24*7);
									var sDate=new Date(s);
									var sDate_=Ext.util.Format.date(sDate, 'Y-m-d');
									Ext.getCmp('startdate').setValue(sDate_);
								} else if (previw.getTime() - back.getTime() > 0) {
									var s=back.getTime()-(60*60*1000*24*7);
									var sDate=new Date(s);
									var sDate_=Ext.util.Format.date(sDate, 'Y-m-d');
									Ext.getCmp('startdate').setValue(sDate_);
								}
								//  日期时间的默认参数      
							    var defaultDateTimeParams = new function()   
							    {   
							        this.readOnly = true;           //  不允许在文本输入框中修改时间 
							        //this.minDate = startdate;
							        this.dateFmt = 'yyyy-MM-dd'; 
							        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
							        this.alwaysUseStartDate = false;           //  默认使用初始时间   
						        };
			                    WdatePicker(defaultDateTimeParams);   
			                    field.blur();
			             	}   
						} 
					} ]
				},{
					xtype : 'spacer'
				},{
					bodyStyle : 'padding-left:10px',
					xtype : 'compositefield',
					items : [{
						flex : 31,
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
						id : "searchBut",
						handler : this.alarmSearch
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
						id : 'passport'
					}]
				}]
			} ],
			listeners : {
				afterrender : function() {
					carNumStore.load();
				}
			}
		});
		Jinpeng.carHiddenAnalysis.CarHiddenAnalysisFormPanel.superclass.initComponent.apply(this);
	},
	/* 响应查询按钮 */
	alarmSearch : function() {
		var form = Ext.getCmp('searchAlarmForm');
		if (form.getForm().isValid()) {
			var grid = Ext.getCmp('carHiddenAnalysisPanel');
			grid.store.baseParams = {};// 重置
			/** 将参数传入后台 */
			var baseparams = {
				"hphm" : Ext.getCmp('carNumStr').getValue(),
				"kkbhs" : Ext.getCmp('passport').getValue(),
				"dazedStart" : Ext.getCmp('dazedStart').getValue(),
				"dazedEnd" : Ext.getCmp('dazedEnd').getValue(),
				"nightStart" : Ext.getCmp('nightStart').getValue(),
				"nightEnd" : Ext.getCmp('nightEnd').getValue(),
				"dazedMax" :  Ext.getCmp('dazedMax').getValue(),
				"nightMax" :  Ext.getCmp('nightMax').getValue(),
				"startdate" :  Ext.getCmp('startdate').getValue(),
				"enddate" :  Ext.getCmp('enddate').getValue()
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
	},
	resetMethod :  function() {
		Ext.getCmp('searchAlarmForm').getForm().reset();
	}
});

var alarmSearchStore;
Jinpeng.carHiddenAnalysis.CarHiddenAnalysisPanel = Ext.extend(Ext.grid.GridPanel,{
	id : 'carHiddenAnalysisPanel',
	border : false,
	frame : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		// 所需数据
		alarmSearchStore = new Ext.data.JsonStore({
			url : rootpath + "/nightAndDazed/queryNightAndDazed.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			remoteSort : true,
			fields : [ {
				name : 'dazedCounts'
			}, {
				name : 'nightCounts'
			}, {
				name : 'kkmc'
			}, {
				name : 'hphm'
			}, {
				name : 'controlFlag'
			}, {
				name : 'alarmTimes'
			}]
		});
		Ext.apply(this,{
			store : alarmSearchStore,
			cm : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
						new Ext.ux.grid.PagingRowNumberer({width : 40}),
						{
							header : '车牌号码',
							dataIndex : 'hphm',
							renderer: function(val, metaData, record) {
								var str = "";
								var counts = 10;
								if (val != '-' && val != '无车牌' && val != '无牌' && val != '车牌' && val != null && val != '—' && val != 'null') {
									str = "<a href='#' onclick=\"showCarPlace('" + val + "','" + counts + "')\">" + val + "</a>";
								} else {
									str = '无';
								}
								return str;
							}
						},{
							header : '白天出现次数',
							dataIndex : 'dazedCounts'
						},{
							header : '夜间出现次数',
							dataIndex : 'nightCounts'
						},{
							header : '是否布控车牌',
							width : 180,
							dataIndex : 'controlFlag',
							renderer: function(val, metaData, record) {
								var str = "";
								if (val == '1') {
									str = "是";
								} else {
									str = '否';
								}
								return str;
							}
						},{
							header : '告警次数',
							dataIndex : 'alarmTimes'
						} ]
			}),
			bbar : new Jinpeng.widget.PagingToolbarNoPage( {
				id : 'PagingToolbar',
				store : alarmSearchStore,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			}),
		});
		Jinpeng.carHiddenAnalysis.CarHiddenAnalysisPanel.superclass.initComponent.apply(this);
	}
});

function showCarPlace(carNum, counts) {
	var orgId ='';
	var orgType = '';
	var kkbhs = '';
	var startTime = Ext.getCmp('startdate').getValue() + " 00:00:00";
	var endTime = Ext.getCmp('enddate').getValue() + " 23:59:59";
	var mainParam = {
		'orgId' : orgId,
		'orgType' : orgType,
		'kkbhs' : kkbhs,
		'startTime' : startTime,
		'endTime' : endTime,
		'carNum' : carNum,
		'counts' : 500
	};
	var win = new Jinpeng.trackSearch.TrackSeachWindow({
		cls : 'system_mod',
		modal : true,
		mainParam : mainParam
	});
	win.init(mainParam);
	win.show();
}

Ext.reg('carHiddenFormPanel', Jinpeng.carHiddenAnalysis.CarHiddenAnalysisFormPanel);
Ext.reg('carHiddenDataPanel', Jinpeng.carHiddenAnalysis.CarHiddenAnalysisPanel);