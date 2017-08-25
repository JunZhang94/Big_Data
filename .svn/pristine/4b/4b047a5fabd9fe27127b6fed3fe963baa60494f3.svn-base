Ext.ns("Jinpeng.deviceTrouble");

// 车辆详细信息弹出窗口
Jinpeng.deviceTrouble.AddNewDeviceTroubleWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	layout : "fit",
	width : 650,
	title : "故障窗口",
	height : 230,
	stateful : false,
	closeAction : "close",
	stateful : false,
	plain : true,
	modal : true,
	border : false,
	addNewFlag : false,
	initComponent : function() {
		//故障类型
		var toubleTypeStore = new Ext.data.JsonStore({
			url : rootpath
					+ "/dictionary/jsonDictsInCombo.mvc?code=FaultState",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false
		});

		Ext.apply(this, {
			bodyStyle : {
				"padding-top" : '5px'
			},
			items : [ {
				xtype : 'panel',
				framse : true,
				// labelWidth: 100,
				autoScroll : true,
				labelAlign : 'right',
				items : [ {
					xtype : 'form',
					labelWidth : 120,
					id : 'deviceTroubleDetailForm',
					defaults : {
						margins : '5 2 5 2'
					},
					items : [ {
						layout : 'column',
						border : false,
						items : [ {
							xtype : 'hidden',
							name : 'SBBH',
							id : 'SBBH'
						}, {
							columnWidth : 0.5,
							layout : 'form',
							border : false,
							items : [ {
								fieldLabel : '卡口信息',
								xtype : 'placeSelector',
								name : 'passStation',
								id : 'portId',
								emptyText : '请选择卡口信息',
								allowBlank : false,
								blankText:'卡口设备选择不能为空',
								editable : false,
								anchor : '94%',
								callBackFun:function(data){
//									if(data.id !=440100 && data.id !=440100000000 && data.id!=440100230000 && data.id!= 440113000000 && data.id!= 440114000000 && data.id!= 440115000000 && data.id!= 440116000000 && data.id!= 440183000000 && data.id!= 440184000000 ){}
									if(data.type==3){
								         Ext.getCmp('deviceDesc').setValue(data.name+"="+data.id+"="+data.text);
									     Ext.getCmp('SBBH').setValue(data.id);
									  }else{
										  data.name = '';
										  Ext.getCmp('portId').setValue(data.name);
										  var win = new Jinpeng.widget.MessageWindow();
										  win.msg = '请选择卡口下面具体的设备....';
										  win.show();
									  }
									
								}
							}, {
//								xtype : 'datefield',
//								fieldLabel : '故障时间',
//								name : 'troubleTime',
//								id : "troubleTime",
//								format : 'Y-m-d',
//								maxLength : 25,
//								anchor : '94%'
								
								xtype : 'textfield',
								fieldLabel : '故障时间',
								id : 'troubleTime',
								allowBlank : false,
								blankText : '故障时间不为空',
			                    editable : false,
								name : 'troubleTime',
								value : new Date().format('Y-m-d'),
								anchor : '94%',
								style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
								listeners  : {   
					            	'focus':function(field){  
										var endTime = Ext.util.Format.date(
												new Date(), 'Y-m-d H:i:s');
										//  日期时间的默认参数      
									    var defaultDateTimeParams = new function()   
									    {   
									        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
									        this.startDate  = endTime;    //  开始时间   
									        this.maxDate = endTime;
									        this.dateFmt    = 'yyyy-MM-dd';  //  格式化时间   
									        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
									        this.alwaysUseStartDate = false;           //  默认使用初始时间   
									    };  
					                    WdatePicker(defaultDateTimeParams);   
					                    field.blur();
					             	}   
								} 
							}]
						}, {
							columnWidth : 0.5,
							layout : 'form',
							border : false,
							items : [ {
								xtype : 'tcombo',
								id : 'troubleType',
								name : 'troubleType',
								fieldLabel : '故障类型',
								store : toubleTypeStore,
								allowBlank : false,
								blankText : '请选择设备状态',
								mode : 'local',
								emptyText : '全部',
								triggerAction : 'all',
								valueField : 'id',
								displayField : 'text',
								anchor : '94%'
							}, {
								xtype : 'hidden',
								id : 'deviceDesc'
							}, {
								xtype : 'hidden',
								id : 'id'
							}]
						} ]
					}, {
						xtype : 'textarea',
						fieldLabel : '故障描述',
						name : 'troubleRemarck',
						maxLength : 25,
						anchor : '97.5%',
						maxLength : 500,
						maxLengthText : '故障描述不能超过500个字符'
					} ]
				} ]
			} ],
			buttonAlign : 'center',
			
			bbar : {
			cls : 'blue-button-ct',
			buttonAlign : 'center',
			buttons : [ {
					xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;',
					scope : this,
					id : 'confirmBtn',
					handler : this.addDeviceTroubleHandler
				}, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', {
					xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;',
					scope : this,
					id : 'cancelBtn',
					handler : function() {
						this.close();
					}
				} ]
			},
			
			listeners : {
				afterrender : function() {
					/*故障类型Store*/
					toubleTypeStore.load();
				}
			}
		});
		Jinpeng.deviceTrouble.AddNewDeviceTroubleWindow.superclass.initComponent.apply(this);
	},
	addDeviceTroubleHandler : function(btn) {
		var formPanel = Ext.getCmp('deviceTroubleDetailForm');

		if (formPanel.getForm().isValid()) {
			var deviceData = formPanel.getForm().getFieldValues();

			var listChannelData = [];
			
			var actionFn = Ext.emptyFn;
			
			if (this.addNewFlag) {
				actionFn = this.doAddDeviceTrouble.createDelegate(this, [deviceData, listChannelData, btn]);
			} else {
				actionFn = this.doModifyDeviceTrouble.createDelegate(this,[deviceData, listChannelData, btn]);
			}
			
			this.saveOrUpdateWithCheckEncode(actionFn,deviceData);
		}

	},
	doAddDeviceTrouble : function(deviceData, channelData, btn) {
		btn.disable();
		//var date = Ext.util.Format.date(deviceData.troubleTime, 'Y-m-d');
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"deviceDesc" : deviceData.deviceDesc,
				"troubleType" : deviceData.troubleType,
				"troubleTime" : deviceData.troubleTime +" 00:00:00",
				"troubleRemarck" : deviceData.troubleRemarck
			}),
			url : rootpath + '/device/addDeviceTrouble.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == '1' || result == 1) {
					//添加数据之后刷新页面的数据
					var grid = Ext.getCmp("deviceTroubleRecordGridPanel");
					if(grid){
						grid.publish("clearGridSelections",[]);
						grid.store.reload();
					}
					msg = "添加故障信息成功！";
					this.close();
				} else {
					msg = "添加故障信息失败";
				}
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = msg;
				win.show();
			},
			failure : function(response, options) {
				btn.enable();
			},
			scope : this
		});
	},
	doModifyDeviceTrouble : function(deviceData, channelData, btn) {
		btn.disable();
		var date = Ext.util.Format.date(deviceData.troubleTime, 'Y-m-d');
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"id" : deviceData.id,
				"troubleType" : deviceData.troubleType,
				"troubleTime" : Ext.getCmp("troubleTime").getValue()+" 00:00:00",
				"troubleRemarck" : deviceData.troubleRemarck
			}),
			url : rootpath + '/device/updateDeviceTrouble.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == 1) {
					//更新之后刷新页面
					var grid = Ext.getCmp("deviceTroubleRecordGridPanel");
					if(grid){
						grid.publish("clearGridSelections",[]);
						grid.store.reload();
					}
					msg = "更新故障信息成功！";
					//dispatchDeviceMessage(result[1]);
					this.close();
				} else {
					msg = "更新故障信息失败";
				}
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = msg;
				win.show();

				//var grid = Ext.getCmp('deviceListGridPanel');
			},
			failure : function(response, options) {
				btn.enable();
			},
			scope : this
		});
	},
	loadRecordById : function(id) {
		Ext.getCmp('deviceTroubleDetailForm').load({
			url : rootpath + '/device/initDeviceTroubleDetail.mvc?id=' + id,
			success : function(from, action) {
				var detailForm = Ext.getCmp('deviceTroubleDetailForm');
				detailForm.updateFlag = true;
				var obj = Ext.util.JSON.decode(action.response.responseText);
				detailForm.form.findField('portId').setValue(obj.data[0].DEVICE_NAME);
				detailForm.form.findField('portId').setDisabled(true);
				var deviceDesc = obj.data[0].DEVICE_NAME + "=" + obj.data[0].SBBH;
				detailForm.form.findField('deviceDesc').setValue(deviceDesc);
				detailForm.form.findField('troubleType').setValue(obj.data[0].GZZT1);
				var troubleTime = obj.data[0].GZSJ.split(" ")[0];
				detailForm.form.findField('troubleTime').setValue(troubleTime);
				detailForm.form.findField('troubleRemarck').setValue(obj.data[0].REMARCK);
				detailForm.form.findField('SBBH').setValue(obj.data[0].SBBH);
				detailForm.form.findField('id').setValue(obj.data[0].ZTXH);
			},
			failure : function() {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '无法加载指定故障信息！';
				win.show();
			}
		});
		this.show();
	},
	saveOrUpdateWithCheckEncode :function(actionFn,deviceData){
		var flag = this.isEncodeUnique(deviceData);
			actionFn();
		
	},
	isEncodeUnique : function(deviceData){
		var result = 0;
		Ext.Ajax.request({
			url : rootpath + '/device/checkDeviceTrouble.mvc',
			async : false,
			params :{"SBBH" : deviceData.SBBH},
			success : function(r,o) {
				var response = Ext.decode(r.responseText);
				result = response.data;
			},
			scope : this
		});
		return result;
	}
});
