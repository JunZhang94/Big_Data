/**
 * 车辆频度统计
 */
Ext.ns('Jinpeng.statistics');

var viewPort = null;
var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
var kwin =new Jinpeng.widget.GeneralWindow({
	id: "mywin",
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
	var orgId = data.id;
	//alert(data.id);
	Ext.getCmp('carFrequencyStatisticsForm').form.findField('orgId').setValue(orgId);
	Ext.getCmp('carFrequencyStatisticsForm').form.findField('orgType').setValue(2);
	Ext.getCmp('passStation').setValue(data.text);
	Ext.getCmp('mywin').hide();
};

function showCarPlace(carNum,passTimes){
	//alert(carNum + "   " +passTimes);
	var orgId = Ext.getCmp('orgId').getValue();
	var orgType = Ext.getCmp('orgType').getValue();
	var kkbhs = Ext.getCmp('orgId').getValue();
	var startTime = Ext.getCmp('startdate').getValue();
	var endTime = Ext.getCmp('enddate').getValue();
	//var recode = grid.store.getAt(rowIndex);
	var mainParam = {
		'orgId' : orgId,
		'orgType' : orgType,
		'kkbhs' : kkbhs,
		'startTime' : startTime,
		'endTime' : endTime,
		'carNum' : carNum,
		'counts' : passTimes
	};
	
	var win = new Jinpeng.trackSearch.TrackSeachWindow({
		cls : 'system_mod',
		modal : true,
		mainParam : mainParam
	});
	win.init(mainParam);
	win.show();
}

Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'north',
			height : 75,
			border : false,
			xtype : 'carFrequencyStatisticsForm'
		}, {
			region : 'center',
			border : false,
			xtype : 'carFrequencyStatisticsGrid'
		}]
	});
});

/**
 * 车辆频度统计--Form
 */
Jinpeng.statistics.CarFrequencyStatisticsPanelForm = Ext.extend(Ext.Panel, {
	initComponent : function() {
		var comboBoxTree = new Ext.ux.OrgComboBoxTree({
			fieldLabel : '卡口名称',
			name : 'passStation',
			id : 'passStation',
			allowBlank:false,
			emptyText : '请选择...',
			blankText : '请选择卡口',
			anchor : '96%',
			editable : false,
			treeUrl : '',
			dataType : 'device',
			callback : function(id, text, coding, orgType) {
				Ext.getCmp('carFrequencyStatisticsForm').form.findField('orgId').setValue(id);
				Ext.getCmp('carFrequencyStatisticsForm').form.findField('orgType').setValue(orgType);
				var num = Ext.get("orgType").getValue();
				if(num =="0" || num =="1"){
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = "请正确选择卡口......";
					win.show();
					Ext.getCmp('passStation').setValue();
				}
					
			}
			
		});
		
		var countSpinner = new Ext.ux.form.SpinnerField({
			name : 'carCounts',
			id : 'carCounts',
			fieldLabel : '&nbsp;&nbsp;过车数量',
			width : 60,
			value : '1',
			cellWidth : 210,
			minValue : 1,
			maxValue : 10,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		
		//开始时间
		var beginDate = new Date();
		
		var endTime = Date.parseDate(Ext.util.Format.date(
			new Date(), 'Y-m-d')
			+ " " + "23:59:59", 'Y-m-d H:i:s');
	
		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'carFrequencyStatisticsForm',
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
					//items : [ comboBoxTree]
					width:440,
					items : [ {
							xtype : 'compositefield',
							items : [ {
								flex : 0.5,
								fieldLabel : '卡点',
								xtype : 'tooltiptextfield',
								name : 'passStation',
								id : 'passStation',
								width : 250,
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
					
				}, {
					items : [{
						xtype: 'compositefield',
						anchor : '94%',
		                items: [ countSpinner, {
	                    	flex : 0.6,
	                    	xtype : 'label',
	                    	text : '次'
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
//						editable : false,
//						value : new Date().format('Y-m-d'),
//						vtype: 'beginEndDate',
//						endDateField : 'enddate',
//						anchor : '94%'
						
						xtype : 'textfield',
						name : 'startTime',
						id : 'startdate',
						allowBlank : false,
						editable : false,
						fieldLabel : '开始时间',
						value :new Date().format('Y-m-d')+' 00',//(beginDate.setTime((beginDate.getTime() - 24*1000*60*60))).format('Y-m-d H'),
						anchor : '96%',
						style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
						listeners  : {   
			            	'focus':function(field){  
								var endTime = Ext.util.Format.date(
										new Date(), 'Y-m-d H:i:s');
								var endDate = Ext.getCmp("enddate").getValue();

								//  日期时间的默认参数      
							    var defaultDateTimeParams = new function()   
							    {   
							        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
							        this.startDate  = endTime;    //  开始时间   
							        this.maxDate = endDate;
							        this.dateFmt    = 'yyyy-MM-dd HH';  //  格式化时间   
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
//						value : endTime,
//						fieldLabel : '结束时间',
//						editable : false,
//						vtype: 'beginEndDate',
//						startDateField : 'startdate',
//						anchor : '94%'
						
						xtype : 'textfield',
						fieldLabel : '结束时间',
						allowBlank : false,
						editable : false,
						name : 'endTime',
						id : 'enddate',
						value : new Date().format('Y-m-d') + ' 23',
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
							        this.dateFmt    = 'yyyy-MM-dd HH';  //  格式化时间   
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
						handler : this.statisticsSeacher
					}]
				},{
					items : [{
						xtype : 'hidden',
						id : 'kkbhs',
						name : 'kkbhs'
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
			}]
		});
		Jinpeng.statistics.CarFrequencyStatisticsPanelForm.superclass.initComponent.apply(this);
	},
	statisticsSeacher : function() {
		var beginTime = Ext.getCmp("startdate").getValue();
		var endTime = Ext.getCmp("enddate").getValue();
		var num = Ext.getCmp('orgType').getValue();
		if(num != "0" && num != "1"){
			var form = Ext.getCmp('carFrequencyStatisticsForm');
			if(form.getForm().isValid()) {
				var grid = Ext.getCmp('gridPanel');
				grid.store.baseParams = {};
				var baseparams = {
					'orgId' : Ext.getCmp('orgId').getValue(),
					'orgType' : Ext.getCmp('orgType').getValue(),
					'kkbhs' :Ext.getCmp('orgId').getValue(), //卡口编号...
					"carCounts" : Ext.getCmp('carCounts').getValue(),
					'startTime' :beginTime,
					'endTime' :endTime
				};
				grid.store.baseParams = baseparams;
				grid.store.load({
					params : {'page.start' : 0, 'page.limit' : Jinpeng.PageSize}
				});
		    }
		}else{
			var win = new Jinpeng.widget.MessageWindow();
			win.msg = "请选择卡口.....";
			win.show();
		}
	}
});

var commuServerStore;

/**
 * 车辆频度统计--Grid
 */
Jinpeng.statistics.CarFrequencyStatisticsPanelGrid = Ext.extend(Ext.grid.GridPanel, {
	id : 'gridPanel',
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		commuServerStore = new Ext.data.JsonStore({
			url : rootpath+ "/frequency/frequencyStatistics.mvc?search=true",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
		          {name : 'carNum'},
		          {name : 'carType'},
		          {name : 'passTimes'},
		          {name : 'lastFlag'}
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
		           {header : '车牌号码', dataIndex : 'carNum',
			           renderer: function(val, metaData, record) {
			           			//alert(record.data.passTimes);
								var str = "";
								str = "<a href='#' onclick=\"showCarPlace('" + val + "','"+record.data.passTimes+"')\">" + val + "</a>";
								return str;
						}
		           },
		           {header : '经过次数', dataIndex : 'passTimes'}
	            ]
			}),
			tbar : {
				cls : 'blue-button-ct',
				items : [ {
					xtype : 'tbspacer',
					width : 12
				},{
					xtype : 'button',
					id : 'exportRecordBtn',
					text : '&nbsp;&nbsp;&nbsp;导出&nbsp;&nbsp;&nbsp;',
					handler : this.importExcelData
				}]
			},
			bbar : new Jinpeng.widget.PagingToolbarNoPage( {
				id : 'PagingToolbar',
				store : commuServerStore,
				//displayInfo : true,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			}),
			listeners : {
				/*双击查看*/
				rowdblclick : function(grid, rowIndex, e ) {
					var recode = grid.store.getAt(rowIndex);
					var mainParam = {
						'orgId' : Ext.getCmp('orgId').getValue(),
						'orgType' : Ext.getCmp('orgType').getValue(),
						'kkbhs' : Ext.getCmp('orgId').getValue(),
						'startTime' : Ext.getCmp('startdate').getValue(),
						'endTime' : Ext.getCmp('enddate').getValue(),
						'carNum' : recode.data.carNum,
						'counts' : recode.data.passTimes
					};
					var win = new Jinpeng.trackSearch.TrackSeachWindow({
							cls : 'system_mod',
							modal : true,
							mainParam : mainParam
						});
						win.init(mainParam);
						win.show();
				}
			}
		});
		Jinpeng.statistics.CarFrequencyStatisticsPanelGrid.superclass.initComponent.apply(this);
	},
	//导出Excel格式数据方法 
	importExcelData : function() {
		var records = Ext.getCmp('gridPanel').getSelectionModel().getSelections();
		var config = {
			selectExportURL : rootpath + "/car/exportFrequencyData.mvc",
			queryExportURL : rootpath + "/car/exportFrequencyData.mvc"
		};
		// 得到选中的ids
		var ids = [];
		var carNums = [];
		for ( var i = 0; i < records.length; i++) {
			ids[ids.length] = records[i].get('carNum');
			carNums[carNums.length] = records[i].get('carNum');
		}
		config.carNums = carNums;
		config.ids = ids;
		config.count = 1000; //默认最大导出1000条
		var param = getQueryParams();
		config.queryCondition = param.join("&");
		var ExportHelper = new Jinpeng.HistoryExportHelper(config);
		ExportHelper.startExport(true);
	}
});

//获取当前查询条件参数，并封装为数组
function getQueryParams() {
	//将查询参数传递到后台，并在后台获取要导出的数据 
	var param = [];
	param[param.length] = "orgId=" + Ext.getCmp('orgId').getValue();
	param[param.length] = "orgType=" + Ext.getCmp('orgType').getValue();
	param[param.length] = "kkbhs=" + Ext.getCmp('orgId').getValue();
	param[param.length] = "carCounts=" + Ext.getCmp('carCounts').getValue();
	param[param.length] = "startTime=" + Ext.getCmp('startdate').getValue();
	param[param.length] = "endTime=" + Ext.getCmp('enddate').getValue();
	return param;
}

Ext.reg('carFrequencyStatisticsForm', Jinpeng.statistics.CarFrequencyStatisticsPanelForm);
Ext.reg('carFrequencyStatisticsGrid', Jinpeng.statistics.CarFrequencyStatisticsPanelGrid);
