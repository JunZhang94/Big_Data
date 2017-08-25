Ext.ns("Jinpeng.monitoryDevice");

var config = {
	combURL : rootpath + '/provider/jsonProviderInCombo.mvc'
};

// 车辆详细信息弹出窗口
Jinpeng.monitoryDevice.AddNewDeviceWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	layout : "fit",
	width : 680,
	title : "监控点设备信息",
	height : 255,
	stateful : false,
	closeAction : "close",
	stateful : false,
	plain : true,
	modal : true,
	border : false,
	addNewFlag : false,
	initComponent : function() {
	
		var providerStore = new Ext.data.JsonStore({
			root : 'data',
			fields : [ 'id', 'text' ],
			baseParams : {
				code : 'DEVICE_MANUFAC'
			},
			url : config.combURL
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
					id : 'deviceDetailForm',
					defaults : {
						margins : '5 2 5 2'
					},
					items : [ {
						layout : 'column',
						border : false,
						items : [ {
							columnWidth : 0.5,
							layout : 'form',
							border : false,
							items : [ {
								xtype : 'textfield',
								fieldLabel : '设备编号',
								name : 'SBBH',
								allowBlank : false,
								// readOnly : true,
								regex : /^[a-zA-Z0-9]{1,64}$/,
								regexText : '最大长度64且只能包含字母和数字',
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '设备名称',
								name : 'SBMC',
								allowBlank : false,
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '设备类型',
								name : 'SBLX',
								allowBlank : false,
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'combo',
								fieldLabel : '设备厂家',
								name : 'SBCJ',
								anchor : '90%',
								allowBlank : false,
								emptyText : '请选择...',
								editable : false,
								triggerAction : 'all',
								mode : "local",
								store : providerStore,
								valueField : 'id',
								displayField : 'text'
							}, {
								xtype : 'textfield',
								fieldLabel : '设备状态',
								name : 'SBZT',
								allowBlank : false,
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '设备卡口编号',
								name : 'SSKKBH',
								allowBlank : false,
								maxLength : 25,
								anchor : '90%'
							},{
								xtype : 'numberfield',
								anchor : '90%',
								maxValue : 180,
								minValue : -180,
								maxLength : 15,
								decimalPrecision : 8,
								fieldLabel : '经度',
								name : 'JD'
							} ]
						}, {
							columnWidth : 0.5,
							layout : 'form',
							border : false,
							items : [ {
								xtype : 'textfield',
								fieldLabel : 'IP地址',
								name : 'IPDZ',
								allowBlank : false,
								maxLength : 25,
								vtype : 'IP',
								anchor : '90%'
							}, {
								xtype : 'numberfield',
								fieldLabel : '端口号',
								name : 'DKH',
								id : 'DKH',
								allowBlank : false,
								minValue : 0,
								maxValue : 65535,
								autoCreate : {
									tag : 'input',
									type : 'text',
									autocomplete : 'off',
									maxlength : '5'
								},
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '登录名称',
								name : 'DLMC',
								id : "DLMC",
								allowBlank : false,
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '&nbsp;登录密码',
								name : 'DLMM',
								id : 'DLMM',
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '所属单位',
								name : 'SSDW',
								allowBlank : false,
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '所属方向',
								name : 'SBFX',
								allowBlank : false,
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'numberfield',
								maxValue : 180,
								minValue : -180,
								maxLength : 15,
								decimalPrecision : 8,
								anchor : '90%',
								fieldLabel : '纬度',
								name : 'WD'
							} ]
						} ]
					} ]
				} ]
			} ],
			buttonAlign : 'center',
			buttons : [ {
				text : '确定',
				scope : this,
				handler : this.addNewDeviceHandler
			}, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', {
				text : '取消',
				scope : this,
				handler : function() {
					this.close();
				}
			} ],
			listeners : {
				afterrender : function() {
					providerStore.load();
				}
			}
		});
		Jinpeng.monitoryDevice.AddNewDeviceWindow.superclass.initComponent.apply(this);
	},
	addNewDeviceHandler : function(btn) {
		var formPanel = top.Ext.getCmp('deviceDetailForm');

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
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"SBBH" : deviceData.SBBH,
				"SBMC" : deviceData.SBMC,
				"SBLX" : deviceData.SBLX,
				"SBCJ" : deviceData.SBCJ,
				"SBZT" : deviceData.SBZT,
				"SSKKBH" : deviceData.SSKKBH,
				"IPDZ" : deviceData.IPDZ,
				"DKH" : deviceData.DKH,
				"DLMC" : deviceData.DLMC,
				"DLMM" : deviceData.DLMM,
				"SSDW" : deviceData.SSDW,
				"SBFX" : deviceData.SBFX,
				"JD" : deviceData.JD,
				"WD" : deviceData.WD
			}),
			url : rootpath + '/device/addDevice.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == '1' || result == 1) {
					msg = "添加设备成功！";
					//dispatchDeviceMessage(result);
					this.close();
				} else if (result == '-1' || result == -1) {
					msg = "设备编码已经存在";
				} else {
					msg = "添加设备失败";
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
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"SBBH" : deviceData.SBBH,
				"SBMC" : deviceData.SBMC,
				"SBLX" : deviceData.SBLX,
				"SBCJ" : deviceData.SBCJ,
				"SBZT" : deviceData.SBZT,
				"SSKKBH" : deviceData.SSKKBH,
				"IPDZ" : deviceData.IPDZ,
				"DKH" : deviceData.DKH,
				"DLMC" : deviceData.DLMC,
				"DLMM" : deviceData.DLMM,
				"SSDW" : deviceData.SSDW,
				"SBFX" : deviceData.SBFX,
				"JD" : deviceData.JD,
				"WD" : deviceData.WD
			}),
			url : rootpath + '/device/updateDevice.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == 1) {
					msg = "更新设备成功！";
					//dispatchDeviceMessage(result[1]);
					this.close();
				} else {
					msg = "更新设备失败";
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
		top.Ext.getCmp('deviceDetailForm').load({
			url : rootpath + '/device/initDeviceDetail.mvc?deviceNumber=' + id,
			success : function(from, action) {
				var detailForm = top.Ext.getCmp('deviceDetailForm');
				detailForm.updateFlag = true;
				var obj = Ext.util.JSON.decode(action.response.responseText);
				// 重置设备复杂字段
				detailForm.form.findField('SBBH').setValue(obj.data[0].SBBH);
				detailForm.form.findField('SBMC').setValue(obj.data[0].SBMC);
				
				detailForm.form.findField('SBLX').setValue(obj.data[0].SBLX);
				detailForm.form.findField('SBCJ').setValue(obj.data[0].SBCJ);
				
				detailForm.form.findField('SBZT').setValue(obj.data[0].SBZT);
				detailForm.form.findField('SSKKBH').setValue(obj.data[0].SSKKBH);
				detailForm.form.findField('JD').setValue(obj.data[0].JD);
				detailForm.form.findField('IPDZ').setValue(obj.data[0].IPDZ);
				detailForm.form.findField('DKH').setValue(obj.data[0].DKH);
				detailForm.form.findField('DLMC').setValue(obj.data[0].DLMC);
				detailForm.form.findField('DLMM').setValue(obj.data[0].DLMM);
				detailForm.form.findField('SSDW').setValue(obj.data[0].SSDW);
				detailForm.form.findField('SBFX').setValue(obj.data[0].SBFX);
				detailForm.form.findField('WD').setValue(obj.data[0].WD);
				
			},
			failure : function() {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '无法加载指定设备信息！';
				win.show();
			}
		});

		this.show();
	},
	loadEmptyRecord : function(orgInfo) {
		
		if (orgInfo && orgInfo['isDirection']) {
			top.Ext.getCmp('deviceDetailForm').form.findField('org.orgName').callback(orgInfo['id'], orgInfo['text'], orgInfo['coding'],orgInfo['longitude'],orgInfo['latitude']);
		}

		this.createUniqueDeviceNo();
		// 设置默认登录名和密码
		// top.Ext.getCmp('loginPassWD').setValue("admin");
		// top.Ext.getCmp('loginName').setValue("admin");
		var detailForm = top.Ext.getCmp('deviceDetailForm');
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
				var form = top.Ext.getCmp('deviceDetailForm').form;
				if (result) {
					if (result == "-999") {
						/*
						 * top.Ext.getCmp('deviceDetailForm').form .findField('deviceId').setReadOnly(false)
						 */
					} else {
						form.findField('deviceId').setValue(result);
						// form.findField('encode').setReadOnly(false);
						form.findField('encode').setValue(result);
					}

				}
			},
			failure : function() {
				top.Ext.MessageBox.alert("提示", "请求失败!");
			},
			scope : this
		});
	},
	saveOrUpdateWithCheckEncode :function(actionFn,deviceData){
		var flag = this.isEncodeUnique(deviceData);
		if(this.isEncodeUnique(deviceData) == -1){
			top.Ext.Msg.confirm("提示", "设备编号已经存在,确认使用该编号？" , function(id) {
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
