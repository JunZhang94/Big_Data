Ext.ns('Jinpeng.system.setting');

/**
 * 系统设置管理
 */
Ext.onReady(function(){
	new Jinpeng.system.setting.AlarmSettingViewport({
		cls : 'system_mod'
	});
});

/**
 * @class Jinpeng.system.setting.AlarmSettingViewport
 * @extends Ext.Viewport
 * @author lsg
 * 告警设置
 */
Jinpeng.system.setting.AlarmSettingViewport = Ext.extend(Ext.Viewport, {
	id : 'warnViewport',
	layout : 'fit',
	constructor : function(config) {
		Ext.apply(this, config);
		//界面编辑区域 
		this.main = new Jinpeng.system.setting.SettingPanel({});
		this.items = [ this.main ];
		Jinpeng.system.setting.AlarmSettingViewport.superclass.constructor.apply(this, arguments);

	},
	//渲染后加载数据
	afterRender : function() {
		//operationTypeStore.load();
		Jinpeng.system.setting.AlarmSettingViewport.superclass.afterRender.apply(this, arguments);
		this.main.reload();
	}
});

//这是调节器控件(默认值为5最大值为100)
var timeSpinner = new Ext.ux.form.SpinnerField({
    name : 'onlineState',
	id : 'onlineState',
	fieldLabel : '&nbsp;&nbsp在线状态时间',
	width : 60,
	tooltip : {
		text : ""
	},
	cellWidth : 210,
	minValue : 0,
	maxValue : 100,
	allowBlank : false,
	allowDecimals : false,
	incrementValue : 1,
	accelerate : true
});

//卡口在线状态Hbase多线程个数调节器控件(默认值为50，最小值为10，最大值为100)
var statuNumberSpinner = new Ext.ux.form.SpinnerField({
    name : 'statuNumber',
	id : 'statuNumber',
	fieldLabel : '&nbsp;&nbsp卡口在线状态单线程并发执行数量',
	width : 60,
	tooltip : {
		text : ""
	},
	cellWidth : 250,
	minValue : 10,
	maxValue : 100,
	allowBlank : false,
	allowDecimals : false,
	incrementValue : 5,
	accelerate : true
});

//这是过车查询时间调节器控件(最大值为2000)
var carTimeSpinner = new Ext.ux.form.SpinnerField({
    name : 'carTime',
	id : 'carTime',
	fieldLabel : '&nbsp;&nbsp;过车查询时间',
	width : 80,
	tooltip : {
		text : ""
	},
	cellWidth : 280,
	minValue : 0,
	maxValue : 2000,
	allowBlank : false,
	allowDecimals : false,
	incrementValue : 1,
	accelerate : true
});

//这是告警查询时间调节器控件(最大值为2000)
var alarmTimeSpinner = new Ext.ux.form.SpinnerField({
    name : 'alarmTime',
	id : 'alarmTime',
	fieldLabel : '&nbsp;&nbsp;告警查询时间',
	width : 80,
	tooltip : {
		text : ""
	},
	cellWidth : 280,
	minValue : 0,
	maxValue : 2000,
	allowBlank : false,
	allowDecimals : false,
	incrementValue : 1,
	accelerate : true
});

//系统巡检计划维护(最大值为1000)
var pollingSpinner = new Ext.ux.form.SpinnerField({
    name : 'pollingTime',
	id : 'pollingTime',
	fieldLabel : '&nbsp;&nbsp;巡检计划维护',
	width : 80,
	tooltip : {
		text : ""
	},
	cellWidth : 210,
	value : 30,
	minValue : 1,
	maxValue : 1000,
	allowBlank : false,
	allowDecimals : false,
	incrementValue : 1,
	accelerate : true
});

//假牌车每次分析的数据量，最大为10W
var fakeCountsSpinner = new Ext.ux.form.SpinnerField({
    name : 'fakeCounts',
	id : 'fakeCounts',
	fieldLabel : '&nbsp;&nbsp;分析数据量',
	width : 80,
	tooltip : {
		text : ""
	},
	cellWidth : 210,
	minValue : 0,
	maxValue : 100000,
	allowBlank : false,
	allowDecimals : false,
	incrementValue : 1000,
	accelerate : true
});

//假牌车分析的长度时间设置，最长15分钟
var fakeTimeSpinner = new Ext.ux.form.SpinnerField({
    name : 'fakeTimes',
	id : 'fakeTimes',
	fieldLabel : '&nbsp;&nbsp;分析时间间隔',
	width : 80,
	tooltip : {
		text : ""
	},
	cellWidth : 210,
	minValue : 0,
	maxValue : 15,
	allowBlank : false,
	allowDecimals : false,
	incrementValue : 1,
	accelerate : true
});

//临近点分析一次性读取hbase数据总量，最多10000
var closetCountsSpinner = new Ext.ux.form.SpinnerField({
    name : 'closetCounts',
	id : 'closetCounts',
	fieldLabel : '&nbsp;&nbsp;分析数据量',
	width : 80,
	tooltip : {
		text : ""
	},
	cellWidth : 210,
	minValue : 0,
	maxValue : 10000,
	allowBlank : false,
	allowDecimals : false,
	incrementValue : 500,
	accelerate : true
});

var warnTypeStore = new Ext.data.JsonStore({
	url:rootpath+ "/dictionary/jsonTroubleFields.mvc?code=FaultState",
	root : "data",
	fields:['id','text','alarm_type','person_name'],
	autoLoad:false
});

var operationTypeStore = new Ext.data.JsonStore({
	url : rootpath + "/dictionary/jsonOprationFields.mvc?code=OPERATION_TYPE",
	root : "data",
	fields : [ 'id', 'text','startPoint', 'endPoint', 'usingFlag' ],
	autoLoad : false
});

/**
 * @class Jinpeng.system.setting.SettingPanel
 * @extends Ext.Panel
 * @author lsg
 */
Jinpeng.system.setting.SettingPanel = Ext.extend(Ext.Panel, {
	border : false,
	padding : '10',
	autoScroll : true,
	defaults : {
		border : false,
		bodyCssClass : 'area1',
		style : 'margin-bottom:10px;',
		padding : 5
	},
	constructor : function(config) {
		Ext.apply(this, config);
		var panel = this;
		var acceptWays = [ [ '0', '声音' ], [ '1', '邮件' ], [ '2', '短信' ] ];
		this.items = [ {
			border : false,
			layout : 'ttable',
			style : 'margin-bottom:0px;',
			bodyCssClass : null,
			items : {
				xtype : 'checkbox',
				name : 'trouble_setting',
				boxLabel : '故障报警设置',
				cellWidth : 200
			}
		}, {
			items : [ {
				//表单
				xtype : 'form',
				id : 'searchDeviceForm',
				labelAlign : 'right',
				border : false,
				frame : true,
				cls : 'blue-button-ct',
				//设置默认
				layout : 'table',
				defaults : {
					layout : 'form',
					width : 290
				},
				layoutConfig : {
					columns : 4
				},
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD',
				items : [{
					// 第一行
						items : [ {
							fieldLabel : '故障设置',
							xtype : 'tcombo',
							name : 'alarm_type_data',
							id : 'alarm_type_data',
							selectOnFocus : true,
							forceSelection : true,
							triggerAction : 'all',
							emptyText : '请选择',
							store : warnTypeStore,
							valueField : 'id',
							displayField : 'text',
							anchor : '94%',
							listeners : {
								select : function(combo,record,index) {
									if(index >=0 ) { 
										this.alarmSearchMethod(combo,record,index);
									}
								},
								scope : this
							}
						} ]
					},{
						items :[{
							fieldLabel : '接收人',
							xtype : 'textfield',
							name : 'person_name',
							id : 'person_name',
							emptyText : '请选择人员',
							anchor : '94%'
						}]
					},{
						items : [ {
							fieldLabel : '报警方式',
							xtype : 'tcombo',
							name : 'alarm_type',
							id : 'alarm_type',
							selectOnFocus : true,
							forceSelection : true,
							triggerAction : 'all',
							emptyText : '请选择',
							anchor : '94%',
							store : acceptWays.clone()
						} ]
					},{
						items : [ {
							xtype : 'spacer',
						} ]
					}]
			}]
		}, {
			border : false,
			layout : 'ttable',
			style : 'margin-bottom:0px;',
			bodyCssClass : null,
			items : {
				xtype : 'checkbox',
				name : 'log_setting',
				boxLabel : '异常行为操作设置',
				cellWidth : 200
			}
		}, {
			items : [ {
				//表单
				xtype : 'form',
				id : 'logSettingForm',
				labelAlign : 'right',
				border : false,
				frame : true,
				cls : 'blue-button-ct',
				//设置默认
				layout : 'table',
				defaults : {
					layout : 'form',
					width : 290
				},
				layoutConfig : {
					columns : 4
				},
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD',
				items : [{
					items : [ {
						fieldLabel : '操作类型',
						xtype : 'tcombo',
						name : 'operation_type',
						id : 'operation_type',
						selectOnFocus : true,
						forceSelection : true,
						triggerAction : 'all',
						emptyText : '请选择',
						store : operationTypeStore,
						valueField : 'id',
						displayField : 'text',
						anchor : '94%',
						listeners : {
							select : function(combo,record,index) {
								if(index >=0 ) { 
									this.logSearchMethod(combo,record,index);
								}
							},
							scope : this
						}
					} ]
				},{
					items :[{
						xtype : 'tcombo',
						store : new Ext.data.ArrayStore({
							fields : [ 'id', 'text' ],
							data : [ [ '0', '0' ], [ '1', '1' ], [ '2', '2' ], [ '3', '3' ], [ '4', '4' ], [ '5', '5' ], [ '6', '6' ], [ '7', '7' ]
							       , [ '8', '8' ], [ '9', '9' ], [ '10', '10' ], [ '11', '11' ], [ '12', '12' ], [ '13', '13' ], [ '14', '14' ]
							       , [ '15', '15' ], [ '16', '16' ], [ '17', '17' ], [ '18', '18' ], [ '19', '19' ], [ '20', '20' ], [ '21', '21' ]
							       , [ '22', '22' ], [ '23', '23' ]]
						}),
						id : 'startTime',
						mode : 'local',
						name : 'startTime',
						fieldLabel : '时间段',
						emptyText : '请选择时间点',
						triggerAction : 'all',
						editable : false,
						valueField : 'id',
						displayField : 'text',
						anchor : '94%'
					}]
				},{
					items :[{
						xtype : 'tcombo',
						store : new Ext.data.ArrayStore({
							fields : [ 'id', 'text' ],
							data : [ [ '0', '0' ], [ '1', '1' ], [ '2', '2' ], [ '3', '3' ], [ '4', '4' ], [ '5', '5' ], [ '6', '6' ], [ '7', '7' ]
						         , [ '8', '8' ], [ '9', '9' ], [ '10', '10' ], [ '11', '11' ], [ '12', '12' ], [ '13', '13' ], [ '14', '14' ]
							     , [ '15', '15' ], [ '16', '16' ], [ '17', '17' ], [ '18', '18' ], [ '19', '19' ], [ '20', '20' ], [ '21', '21' ]
							     , [ '22', '22' ], [ '23', '23' ]]
						}),
						id : 'endTime',
						mode : 'local',
						name : 'endTime',
						fieldLabel : '至',
						emptyText : '请选择时间点',
						triggerAction : 'all',
						editable : false,
						valueField : 'id',
						displayField : 'text',
						anchor : '94%'
					}]
					
				},{
				   items : [{
				      xtype : 'checkbox',
					  fieldLabel: '启用',
					  id : 'usingFlag',
				      name : 'usingFlag',
					  value : false,
					  checked : false,
					  anchor : '94%'
				   }]
				}]
			},{
				//表单
				xtype : 'form',
				id : 'faultStateForm',
				labelAlign : 'right',
				border : false,
				frame : true,
				cls : 'blue-button-ct',
				//设置默认
				layout : 'column',
				defaults : {
					width : 290
				},
				layoutConfig : {
					columns : 2
				},
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD',
				items : [{
					columnWidth : .45,
					layout : 'form',
					items : [{
						xtype: 'compositefield',
						anchor : '94%',
						// 第一行
						items : [ timeSpinner, {
		                   flex : 0.6,
		                   xtype : 'label',
		                   text : '分'
		                  } ]
					}] 
				},{
					columnWidth : .45,
					layout : 'form',
					items : [{
						xtype: 'compositefield',
						anchor : '94%',
						items :[statuNumberSpinner, {
		                   flex : 0.6,
		                   xtype : 'label',
		                   text : '个'
		                  }]
					}]
				}]
			}, {
				//表单
				xtype : 'form',
				id : 'panelShowForm',
				labelAlign : 'right',
				border : false,
				frame : true,
				cls : 'blue-button-ct',
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD ;margin-top:6px;',
				items : [{
					xtype: 'radiogroup',
					id : 'showPanel',
				    name:'showPanel',
					fieldLabel: "首页展示方式",
					width : 200,
					anchor : '94%',
					items : [ {
						boxLabel : '以滚动条大图展示',
						xtype : 'radio',
						inputValue : '1',
						checked : true,
						name : 'showFlag'
					}, {
						boxLabel : '以网格多图展示',
						xtype : 'radio',
						inputValue : '2',
						name : 'showFlag'
					}, {
						boxLabel : '以全文检索方式展示',
						xtype : 'radio',
						inputValue : '3',
						name : 'showFlag'
					}]
				}]
			}]
		}, {
			border : false,
			layout : 'ttable',
			style : 'margin-bottom:0px;',
			bodyCssClass : null,
			items : [{
				xtype : 'tbspacer',
				width : 20
			},{
				xtype : 'label',
				name : 'first_page_setting',
				text : '全文检索时间设置',
				cellWidth : 200
			}]
		}, {
			items : [ {
				//表单
				xtype : 'form',
				id : 'firstPageForm',
				labelAlign : 'right',
				border : false,
				frame : true,
				cls : 'blue-button-ct',
				//设置默认
				layout : 'column',
				defaults : {
					width : 290
				},
				layoutConfig : {
					columns : 2
				},
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD',
				items : [{
					columnWidth : .45,
					layout : 'form',
					items : [{
						xtype: 'compositefield',
						anchor : '94%',
						// 第一行
						items : [ carTimeSpinner, {
		                   flex : 0.6,
		                   xtype : 'label',
		                   text : '天'
		                  } ]
					}] 
				},{
					columnWidth : .45,
					layout : 'form',
					items : [{
						xtype: 'compositefield',
						anchor : '94%',
						items :[alarmTimeSpinner, {
		                   flex : 0.6,
		                   xtype : 'label',
		                   text : '天'
		                  }]
					}]
				}]
			}]
		}, {
			items : [ {
				//表单
				xtype : 'form',
				id : 'firstPageForm',
				labelAlign : 'right',
				border : false,
				frame : true,
				cls : 'blue-button-ct',
				//设置默认
				layout : 'column',
				defaults : {
					width : 290
				},
				layoutConfig : {
					columns : 2
				},
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD',
				items : [{
					columnWidth : .45,
					layout : 'form',
					items : [{
						xtype: 'compositefield',
						anchor : '94%',
						// 第一行
						items : [ pollingSpinner, {
		                   flex : 0.4,
		                   xtype : 'label',
		                   text : '天'
		                  } ]
					}] 
				},{
					columnWidth : .45,
					layout : 'form',
					items : [{
						xtype: 'compositefield',
						anchor : '94%',
						items :[{
							xtype : 'tcombo',
							store : new Ext.data.ArrayStore({
								fields : [ 'id', 'text' ],
								data : [ [ '0', '正常' ], [ '1', '故障' ], [ '2', '报废' ], [ '3', '停用' ]]
							}),
							id : 'deviceState',
							mode : 'local',
							value :　'1',
							name : 'deviceState',
							fieldLabel : '设备状态报警参数',
							emptyText : '请选择状态参数',
							triggerAction : 'all',
							editable : false,
							valueField : 'id',
							displayField : 'text',
							anchor : '94%'
						}]
					}]
				}]
			}]
		}, {
			border : false,
			layout : 'ttable',
			style : 'margin-bottom:0px;',
			bodyCssClass : null,
			items : [{
				xtype : 'tbspacer',
				width : 20
			},{
				xtype : 'label',
				name : 'first_page_setting',
				text : '假牌车分析设置(分析数据量：分析时间段内的最大数据量，分析时间间隔：系统分析操作的当前时间减去当前设置的值的时间段)',
				cellWidth : 1000
			}]
		}, {
			items : [ {
				//表单
				xtype : 'form',
				id : 'fakePageForm',
				labelAlign : 'right',
				border : false,
				frame : true,
				cls : 'blue-button-ct',
				//设置默认
				layout : 'column',
				defaults : {
					width : 290
				},
				layoutConfig : {
					columns : 2
				},
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD',
				items : [{
					columnWidth : .45,
					layout : 'form',
					items : [{
						xtype: 'compositefield',
						anchor : '94%',
						// 第一行
						items : [ fakeCountsSpinner, {
		                   flex : 0.6,
		                   xtype : 'label',
		                   text : '条'
		                  } ]
					}] 
				},{
					columnWidth : .45,
					layout : 'form',
					items : [{
						xtype: 'compositefield',
						anchor : '94%',
						items :[fakeTimeSpinner, {
		                   flex : 0.6,
		                   xtype : 'label',
		                   text : '分钟'
		                  }]
					}]
				}]
			}]
		}, {
			border : false,
			layout : 'ttable',
			style : 'margin-bottom:0px;',
			bodyCssClass : null,
			items : [{
				xtype : 'tbspacer',
				width : 20
			},{
				xtype : 'label',
				name : 'closet_point_setting',
				text : '临近点分析设置（一次性读取hbase数据量）',
				cellWidth : 1000
			}]
		}, {
			items : [ {
				//表单
				xtype : 'form',
				id : 'closetPointForm',
				labelAlign : 'right',
				border : false,
				frame : true,
				cls : 'blue-button-ct',
				//设置默认
				layout : 'column',
				defaults : {
					width : 290
				},
				layoutConfig : {
					columns : 2
				},
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD',
				items : [{
					columnWidth : .45,
					layout : 'form',
					items : [{
						xtype: 'compositefield',
						anchor : '94%',
						// 第一行
						items : [ closetCountsSpinner, {
		                   flex : 1.0,
		                   xtype : 'label',
		                   text : '条'
		                  } ]
					}] 
				}]
			}]
		}, {
			border : false,
			layout : 'ttable',
			style : 'margin-bottom:0px;',
			bodyCssClass : null,
			items : [{
				xtype : 'tbspacer',
				width : 20
			},{
				xtype : 'label',
				name : 'history_point_setting',
				text : '历史过车查询查询方式',
				cellWidth : 1000
			}]
		}, {
			//表单
			xtype : 'form',
			id : 'panelDirectionForm',
			labelAlign : 'right',
			border : false,
			frame : true,
			cls : 'blue-button-ct',
			bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD ;margin-top:6px;',
			items : [{
				xtype: 'radiogroup',
				id : 'showDirectionPanel',
			    name:'showDirectionPanel',
				width : 200,
				anchor : '94%',
				items : [ {
					boxLabel : '以卡口树展示(按卡口查询)',
					xtype : 'radio',
					inputValue : '1',
					checked : true,
					name : 'historyFlag'
				}, {
					boxLabel : '以方向树展示(按方向查询)',
					xtype : 'radio',
					inputValue : '2',
					name : 'historyFlag'
				}]
			}]
		}, {
			border : false,
			cls : 'blue-button-ct',
			bodyCssClass : null,
			items : [ {
				style : 'margin:auto auto;',
				xtype : 'button',
				name : 'ok',
				id : 'confimBtn',
				text : '&nbsp;&nbsp;&nbsp;保存&nbsp;&nbsp;&nbsp;',
				handler : this.doSaveAction
			} ]
		} ];

		Jinpeng.system.setting.SettingPanel.superclass.constructor.apply(this, arguments);

		this.disableComponents();

	},
	//通过选项值查询
	alarmSearchMethod : function(combo, record, index) {
		// 将数据从store中取出
		if (index > 0) {
			var selStore = Ext.getCmp('alarm_type_data').store
					.getAt(index-1);
			var alarm_type = selStore.get("alarm_type");
			var person_name = selStore.get("person_name");
			Ext.getCmp('alarm_type').setValue(alarm_type);
			Ext.getCmp('person_name').setValue(person_name);
		} else {
			Ext.getCmp('alarm_type').setValue('');
			Ext.getCmp('person_name').setValue('');
		}
	},
	//通过选项值查询
	logSearchMethod : function(combo, record, index) {
		if (index > 0) {
			var selStore = Ext.getCmp('operation_type').store
					.getAt(index-1);
			var startPoint = selStore.get("startPoint");
			var endPoint = selStore.get("endPoint");
			var usingFlag = selStore.get("usingFlag");
			Ext.getCmp('startTime').setValue(startPoint);
			Ext.getCmp('endTime').setValue(endPoint);
			Ext.getCmp('usingFlag').setValue(usingFlag);
		} else {
			Ext.getCmp('startTime').setValue('');
			Ext.getCmp('startTime').setValue('');
			Ext.getCmp('usingFlag').setValue('0');
		}
	},
	
	//各种控件实现启用、禁用效果
	disableComponents : function() {
		var panel = this;
		this.find('name', 'trouble_setting').first().on('check', function(node, checked) {
			var names = [ 'alarm_type_data', 'alarm_type','person_name' ];
			for ( var i = 0; i < names.length; i++) {
				var name = names[i];
				panel.find('name', name).first().setDisabled(!checked);
			}
		});
		this.find('name', 'log_setting').first().on('check', function(node, checked) {
			var names = [ 'operation_type', 'startTime','endTime','usingFlag' ];
			for ( var i = 0; i < names.length; i++) {
				var name = names[i];
				panel.find('name', name).first().setDisabled(!checked);
			}
		});
	},
	//重新加载数据
	reload : function() {
		var panel = this;
		Ext.Ajax.request({
			url : rootpath + '/systemConfig/loadAlarmSetting.mvc',
			scope : this,
			success : function(response, options) {
				json = response.responseText;
				var o = response.responseData || Ext.decode(json);
				if (o && o.success) {
					panel.init(o.data || {});
				}
			}
		});
	},
	/**
	 * 初始化数据
	 * @param data 待初始化的数据
	 */
	init : function(data) {
		var arr = [ 'trouble_setting', 'log_setting'];
		for ( var i = 0; i < arr.length; i++) {
			var key = arr[i];
			if (data && typeof data[key] != 'undefined')
				this.find('name', key).first().setValue(data[key]);
		}
		//设定默认值
	    Ext.getCmp('onlineState').setValue(data["onlineState"]);
		var node = this.find('name', 'trouble_setting').first();
		node.fireEvent('check', node, node.getValue());
		var node = this.find('name', 'log_setting').first();
		node.fireEvent('check', node, node.getValue());
		if (data['showPanel'] == '1') {
			Ext.getCmp('panelShowForm').form.findField('showPanel').setValue(1);
		} else if (data['showPanel'] == '2') {
			Ext.getCmp('panelShowForm').form.findField('showPanel').setValue(2);
		} else {
			Ext.getCmp('panelShowForm').form.findField('showPanel').setValue(3);
		}
		Ext.getCmp('carTime').setValue(data["carTime"]);
		Ext.getCmp('alarmTime').setValue(data["alarmTime"]);
		Ext.getCmp('fakeCounts').setValue(data["fakeCounts"]);
		Ext.getCmp('fakeTimes').setValue(data["fakeTimes"]);
		Ext.getCmp('closetCounts').setValue(data["closetCounts"]);
		Ext.getCmp('statuNumber').setValue(data["statuNumber"]);
		if (data['showDirectionPanel'] == '1') {
			Ext.getCmp('panelDirectionForm').form.findField('showDirectionPanel').setValue(1);
		} else {
			Ext.getCmp('panelDirectionForm').form.findField('showDirectionPanel').setValue(2);
		}
	},
	/**
	 * 保存数据
	 * @param btn 保存按钮
	 */
	doSaveAction : function(btn) {
		var panel = btn.ownerCt.ownerCt;
		var arr = [ 'alarm_type_data', 'alarm_type', 'trouble_setting', 'person_name', 'operation_type', 'startTime', 'endTime', 'usingFlag', 'log_setting', 'showPanel', 'showDirectionPanel' ];
		var params = {};
		for ( var i = 0; i < arr.length; i++) {
			var key = arr[i];
			if (arr[i] == 'showPanel') {
				var panelFlag = Ext.getCmp('showPanel').getValue().getGroupValue();
				params[key] = panelFlag;
			} else if (arr[i] == 'showDirectionPanel') {
				var historyFlag = Ext.getCmp('showDirectionPanel').getValue().getGroupValue();
				params[key] = historyFlag;
			} else {
				var val = panel.find('name', key).first().getValue();
				params[key] = val;
			}
		}
		params['onlineState'] = Ext.getCmp('onlineState').getValue();
		params['statuNumber'] = Ext.getCmp('statuNumber').getValue();
		params['carTime'] = Ext.getCmp('carTime').getValue();
		params['alarmTime'] = Ext.getCmp('alarmTime').getValue();
		params['fakeCounts'] = Ext.getCmp('fakeCounts').getValue();
		params['fakeTimes'] = Ext.getCmp('fakeTimes').getValue();
		params['closetCounts'] = Ext.getCmp('closetCounts').getValue();
		Ext.Ajax.request({
			url : rootpath + '/systemConfig/saveOrUpdate.mvc',
			params : params,
			success : function(response, options) {
				json = response.responseText;
				var o = response.responseData || Ext.decode(json);
				if (o && o.success) {
					panel.reload();
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = '操作成功';
					win.show();
				}
			}
		});
	}
});
