Ext.ns("Jinpeng.devicePolling");

// 车辆详细信息弹出窗口
Jinpeng.devicePolling.AddNewDevicePollingWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	layout : "fit",
	width : 680,
	title : "修改巡检",
	height : 240,
	stateful : false,
	closeAction : "close",
	stateful : false,
	plain : true,
	modal : true,
	border : false,
	addNewFlag : false,
	initComponent : function() {

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
					id : 'devicePollingDetailForm',
					defaults : {
						margins : '5 2 5 2'
					},
					items : [ {
						layout : 'column',
						border : false,
						items : [ {
							xtype : 'hidden',
							id : 'SBBH'
						}, {
							columnWidth : 0.5,
							layout : 'form',
							border : false,
							items : [ {
								fieldLabel : '巡检设备名称',
								xtype : 'placeSelector',
								name : 'passStation',
								id : 'portId',
								emptyText : '请选择巡检设备名称',
								blankText : '设备名称选择不能为空',
								anchor : '94%',
								editable : false,
								allowBlank:false,
								callBackFun:function(data){
//								  if(data.id !=440100 && data.id !=440100000000 && data.id!=440100230000 && data.id!= 440113000000 && data.id!= 440114000000 && data.id!= 440115000000 && data.id!= 440116000000 && data.id!= 440183000000 && data.id!= 440184000000 ){}
								  if(data.type==3){
									  Ext.getCmp('deviceDesc').setValue(data.name+"="+data.id+"="+data.text);
									  Ext.getCmp('SBBH').setValue(data.id);
								  }else{
									  data.name = '';
									  Ext.getCmp('portId').setValue(data.name);
									  var win = new Jinpeng.widget.MessageWindow();
									  win.msg = "请选择卡口下面具体的设备....";
									  win.show();

									  
								  }
									
								}
							}, {
								xtype : 'textfield',
								fieldLabel : '工号',
								name : 'jobNumber',
								maxLength : 25,
								anchor : '94%',
								regex: /^[0-9]*$/,
								regexText : '只能输入数字'
									
							}, {
//								xtype : 'datefield',
//								fieldLabel : '巡检时间',
//								name : 'pollingTime',
//								id : "pollingTime",
//								format : 'Y-m-d',
//								allowBlank : false,
//								maxLength : 25,
//								anchor : '94%'
								
								xtype : 'textfield',
								fieldLabel : '巡检时间',
								id : 'pollingTime',
								allowBlank : false,
								blankText : '巡检时间不为空',
			                    editable : false,
								name : 'pollingTime',
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
							}, {
								xtype : 'textarea',
								fieldLabel : '巡检记录',
								name : 'polingRemarck',
								maxLength : 25,
								anchor : '94%',
								maxLength : 500,
								maxLengthText : '巡检记录不能超过500个字符'
							}]
						}, {
							columnWidth : 0.5,
							layout : 'form',
							border : false,
							items : [ {
								xtype : 'textfield',
								fieldLabel : '巡检人',
								name : 'pollingName',
								emptyText : '请输入巡检人',
								allowBlank : false,
								blankText : '巡检人不能为空',
								maxLength : 25,
								anchor : '94%'
							}, {
								xtype : 'textfield',
								fieldLabel : '联系方式',
								name : 'phoneNumber',
								maxLength : 25,
								anchor : '94%',
								regex: /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,
								regexText : '输入正确的联系方式'
								
							}, {
								xtype : 'textfield',
								fieldLabel : '联系地址',
								name : 'contactAddress',
								emptyText : '请输入联系地址',
								allowBlank : false,
								blankText : '联系地址不能为空',
								maxLength : 25,
								anchor : '94%'
							}, {
								xtype : 'hidden',
								id : 'deviceDesc'
							}, {
								xtype : 'hidden',
								id : 'id'
							}]
						} ]
					} ]
				} ]
			} ],
			bbar : {
				cls : 'blue-button-ct',
				buttonAlign : 'center',
				buttons : [ {
					xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;',
					scope : this,
					id : 'confirmBtn',
					handler : this.addDevicePollingHandler
				}, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', {
					xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;',
					scope : this,
					id : 'cancelBtn',
					handler : function() {
						this.close();
					}
				} ]
			}
		});
		Jinpeng.devicePolling.AddNewDevicePollingWindow.superclass.initComponent.apply(this);
	},
	addDevicePollingHandler : function(btn) {
		var formPanel = Ext.getCmp('devicePollingDetailForm');

		if (formPanel.getForm().isValid()) {
			var deviceData = formPanel.getForm().getFieldValues();

			var listChannelData = [];
			
			var actionFn = Ext.emptyFn;
			
			if (this.addNewFlag) {
				actionFn = this.doAddDevice.createDelegate(this, [deviceData, listChannelData, btn]);
			} else {
				actionFn = this.doModifyDevice.createDelegate(this,[deviceData, listChannelData, btn]);
			}
			
			this.saveOrUpdateWithCheckEncode(actionFn,deviceData);
		}

	},
	doAddDevice : function(deviceData, channelData, btn) {
		btn.disable();
		//alert(deviceData.pollingTime);
		//var date = Ext.util.Format.date(deviceData.pollingTime, 'Y-m-d');
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"deviceDesc" : deviceData.deviceDesc,
				"jobNumber" : deviceData.jobNumber,
				"pollingTime" : deviceData.pollingTime,//date,
				"polingRemarck" : deviceData.polingRemarck,
				"pollingName" : deviceData.pollingName,
				"phoneNumber" : deviceData.phoneNumber,
				"contactAddress" : deviceData.contactAddress
			}),
			url : rootpath + '/devicePolling/addDevicePolling.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == '1' || result == 1) {
					var grid = Ext.getCmp("userMgrRecordGridPanel");
					if(grid){
						grid.publish("clearGridSelections",[]);
						grid.store.reload();
					}
					msg = "添加巡检记录成功！";
					this.close();
				} else {
					msg = "添加巡检记录失败";
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
	doModifyDevice : function(deviceData, channelData, btn) {
		btn.disable();
		var date = Ext.util.Format.date(deviceData.pollingTime, 'Y-m-d');
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"id" : deviceData.id,
				"deviceDesc" : deviceData.deviceDesc,
				"jobNumber" : deviceData.jobNumber,
				"pollingTime" : deviceData.pollingTime,//date,
				"polingRemarck" : deviceData.polingRemarck,
				"pollingName" : deviceData.pollingName,
				"phoneNumber" : deviceData.phoneNumber,
				"contactAddress" : deviceData.contactAddress
			}),
			url : rootpath + '/devicePolling/updateDevicePolling.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == 1) {
					//更新之后刷新页面
					var grid = Ext.getCmp("devicePollingRecordGridPanel");
					if(grid){
						grid.publish("clearGridSelections",[]);
						grid.store.reload();
					}
					msg = "更新巡检信息成功！";
					//dispatchDeviceMessage(result[1]);
					this.close();
				} else {
					msg = "更新巡检信息失败";
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
		Ext.getCmp('devicePollingDetailForm').load({
			url : rootpath + '/devicePolling/initDevicePollingDetail.mvc?id=' + id,
			success : function(from, action) {
				var detailForm = Ext.getCmp('devicePollingDetailForm');
				detailForm.updateFlag = true;
				var obj = Ext.util.JSON.decode(action.response.responseText);
				detailForm.form.findField('id').setValue(obj.data[0].ID);
				detailForm.form.findField('portId').setValue(obj.data[0].DEVICE_NAME);
				detailForm.form.findField('portId').setDisabled(true);
				detailForm.form.findField('jobNumber').setValue(obj.data[0].JOB_NUMBER);
				var deviceDesc = obj.data[0].DEVICE_NAME + "=" + obj.data[0].ID;
				detailForm.form.findField('deviceDesc').setValue(deviceDesc);
				var pollingTime = obj.data[0].POLLING_TIME.split(" ")[0];
				detailForm.form.findField('pollingTime').setValue(pollingTime);
				detailForm.form.findField('polingRemarck').setValue(obj.data[0].POLING_REMARCK);
				
				detailForm.form.findField('pollingName').setValue(obj.data[0].POLLING_NAME);
				detailForm.form.findField('phoneNumber').setValue(obj.data[0].PHONE_NUMBER);
				detailForm.form.findField('contactAddress').setValue(obj.data[0].CONTACT_ADDRESS);
				
			},
			failure : function() {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = "无法加载指定巡检信息信息！";
				win.show();

			}
		});

		this.show();
	},
	loadEmptyRecord : function(orgInfo) {
		
		if (orgInfo && orgInfo['isDirection']) {
			Ext.getCmp('devicePollingDetailForm').form.findField('org.orgName').callback(orgInfo['id'], orgInfo['text'], orgInfo['coding'],orgInfo['longitude'],orgInfo['latitude']);
		}

		this.createUniqueDeviceNo();
		// 设置默认登录名和密码
		// Ext.getCmp('loginPassWD').setValue("admin");
		// Ext.getCmp('loginName').setValue("admin");
		var detailForm = Ext.getCmp('devicePollingDetailForm');
		detailForm.updateFlag = false;
		
		var combNames = [ {
			name : "type",
			value : 1
		}, {
			name : "manuFac",
			value : 1
		}, {
			name : "model",
			value : 14
		}, {
			name : "server.serverId"
		}, {
			name : "laneNo"
		}, {
			name : "direct"
		}, {
			name : "relDevice"
		} ];
		Ext.each(combNames, function(item, index, allItems) {
			var comb = detailForm.form.findField(item.name);
			if ((typeof item.value) != 'undefined') {
				comb.store.load({
					callback : function() {
						comb.setValue(item.value);
						if (item.name == 'model') {
							comb.selectByValue(item.value, true);
							comb.setDefalutParam(comb);
						}

					}
				});
			} else {
				comb.store.load();
			}
		});
	},
	createUniqueDeviceNo : function() {
		Ext.Ajax.request({
			url : rootpath + '/client/device/getDeviceNo.action',
			success : function(response) {
				var result = Ext.decode(response.responseText);
				var form = Ext.getCmp('devicePollingDetailForm').form;
				if (result) {
					if (result == "-999") {
						/*
						 * Ext.getCmp('devicePollingDetailForm').form .findField('deviceId').setReadOnly(false)
						 */
					} else {
						form.findField('deviceId').setValue(result);
						// form.findField('encode').setReadOnly(false);
						form.findField('encode').setValue(result);
					}

				}
			},
			failure : function() {
				Ext.MessageBox.alert("提示", "请求失败!");
			},
			scope : this
		});
	},
	saveOrUpdateWithCheckEncode :function(actionFn,deviceData){
		var flag = this.isEncodeUnique(deviceData);
		if(this.isEncodeUnique(deviceData) === '-1'){
			Ext.Msg.confirm("提示", "巡检信息编号已经存在,确认使用该编号？" , function(id) {
				if ("yes" == id) {
					actionFn();
				}
			}, this);
		}else{
			actionFn();
		}
	},
	isEncodeUnique : function(deviceData){
		var result = 0;
		Ext.Ajax.request({
			url : rootpath + '/device/checkDevice.mvc',
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
