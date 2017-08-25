Ext.ns("Jinpeng.device");

var deviceConfig = {
	combURL : rootpath + '/provider/jsonProviderInCombo.mvc',
	dicURL : rootpath + '/dictionary/jsonDictsInCombo.mvc'
};

var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
var kwin1 =new Ext.Window({
	id: "mywin1",
	title: "",
	constrain : true,
	constrainHeader : true,
	width: ww * 2 / 3,
	height: hh * 3 / 4,
	layout: "fit",
	//autoShow: true,
	closeAction:'hide',
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/Big_Data/zTree/demo/cn/excheck/multiSelectTree2.html"></iframe>'
});
var setKKValue=function(data){
	Ext.getCmp('passStation').setValue(data.text);
	Ext.getCmp('kkbhs').setValue(data.id);
	Ext.getCmp('mywin1').hide();
};
var cancelKK=function(data){
	Ext.getCmp('passStation').setValue("");
	Ext.getCmp('kkbhs').setValue("");
	Ext.getCmp('mywin1').hide();
};

// 车辆详细信息弹出窗口
Jinpeng.device.AddNewDeviceWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	layout : "fit",
	width : 700,
	title : "修改设备",
	height : 440,
	stateful : false,
	closeAction : "close",
	stateful : false,
	plain : true,
	modal : true,
	border : false,
	addNewFlag : false,
	parentId :'',
	initComponent : function() {
		//供应商
		var providerStore = new Ext.data.JsonStore({
			root : 'data',
			fields : [ 'id', 'text' ],
			baseParams : {
				code : 'DEVICE_MANUFAC'
			},
			url : deviceConfig.combURL
		});
		
		//设备类型
		var deviceTypeStore = new Ext.data.JsonStore({
			root : 'data',
			fields : [ 'id', 'text' ],
			baseParams : {
				code : 'DeviceType'
			},
			url : deviceConfig.dicURL
		});
		
		//设备类型
		var deviceStateStore = new Ext.data.JsonStore({
			root : 'data',
			fields : [ 'id', 'text' ],
			baseParams : {
				code : 'DEVICE_STATUS'
			},
			url : deviceConfig.dicURL
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
				cls:'blue-button-ct',
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
								blankText : '设备编号不为空',
								// readOnly : true,
								regex : /^[0-9]{1,18}$/,
								regexText : '最大长度18位数字',
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '设备名称',
								name : 'SBMC',
								allowBlank : false,
								blankText : '设备名称不为空',
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'combo',
								fieldLabel : '设备类型',
								name : 'SBLX',
								anchor : '90%',
								
								emptyText : '请选择...',
								editable : false,
								triggerAction : 'all',
								mode : "local",
								store : deviceTypeStore,
								valueField : 'id',
								displayField : 'text'
							}, {
								xtype : 'combo',
								fieldLabel : '供应商',
								name : 'SBCJ',
								anchor : '90%',
								
								emptyText : '请选择...',
								editable : false,
								triggerAction : 'all',
								mode : "local",
								store : providerStore,
								valueField : 'id',
								displayField : 'text'
							}, {
								xtype : 'combo',
								fieldLabel : '拦截条件',
								name : 'INTERCEPT',
								anchor : '90%',
								
								emptyText : '请选择...',
								editable : false,
								triggerAction : 'all',
								mode : "local",
								valueField : 'id',
								value : 0,
								displayField : 'text',
								store : new Ext.data.ArrayStore({
									fields : [ 'id', 'text' ],
									data : [ [ 0, '具备' ], [ 1, '不具备' ] ]
								})
							}, {
								xtype : 'combo',
								fieldLabel : '设备状态',
								name : 'SBZT',
								anchor : '90%',
								allowBlank : false,
								bankText : '请选择设备状态',
								emptyText : '请选择...',
								editable : false,
								triggerAction : 'all',
								mode : "local",
								store : deviceStateStore,
								valueField : 'id',
								displayField : 'text'
							}, {
								xtype : 'hidden',
								fieldLabel : '设备卡口编号',
								name : 'SSKKBH',
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
							},{
								xtype : 'textfield',
								fieldLabel : '地点',
								name : 'DEVICE_ADRESS',
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '启用日期',
								id : 'usingDate',
								allowBlank : false,
								blankText : '启用日期不为空',
			                    editable : false,
								name : 'usingDate',
								//value : new Date().format('Y-m-d') + ' 00:00:00',
								anchor : '90%',
								style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
								listeners  : {   
					            	'focus':function(field){  
										var endTime = Ext.util.Format.date(
												new Date(), 'Y-m-d H:i:s');
										
										//  日期时间的默认参数      
									    var defaultDateTimeParams = new function()   
									    {   
									        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
									        this.startDate  = endTime;  //开始时间
									        this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';  //  格式化时间   
									        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
									        this.alwaysUseStartDate = false;           //  默认使用初始时间   
									    };  
					                    WdatePicker(defaultDateTimeParams);   
					                    field.blur();
					             	}   
								}  
								
//								xtype : 'datetimefield',
//								name : 'usingDate',
//								fieldLabel : '启用日期',
//								
//								format : 'Y-m-d H:i:s',
//								editable : false,
//								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '停用日期',
								id : 'stopeDate',
								allowBlank : false,
								blankText : '停用日期不为空',
			                    editable : false,
								name : 'stopeDate',
								//value : new Date().format('Y-m-d') + ' 00:00:00',
								anchor : '90%',
								style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
								listeners  : {   
					            	'focus':function(field){  
										var endTime = Ext.util.Format.date(
												new Date(), 'Y-m-d H:i:s');
										
										//  日期时间的默认参数      
									    var defaultDateTimeParams = new function()   
									    {   
									        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
									        this.startDate  = endTime;  //开始时间
									        this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';  //  格式化时间   
									        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
									        this.alwaysUseStartDate = false;           //  默认使用初始时间   
									    };  
					                    WdatePicker(defaultDateTimeParams);   
					                    field.blur();
					             	}   
								}  
//								
//								xtype : 'datetimefield',
//								name : 'stopeDate',
//								fieldLabel : '停用日期',
//								
//								format : 'Y-m-d H:i:s',
//								editable : false,
//								anchor : '90%'
							}]
						}, {
							columnWidth : 0.5,
							layout : 'form',
							border : false,
							items : [ {
								xtype : 'textfield',
								fieldLabel : 'IP地址',
								name : 'IPDZ',
								
								maxLength : 25,
								vtype : 'IP',
								anchor : '90%'
							}, {
								xtype : 'numberfield',
								fieldLabel : '端口号',
								name : 'DKH',
								id : 'DKH',
								
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
								fieldLabel : '设备型号',
								name : 'DEVICE_MODEL',
								id : "DEVICE_MODEL",
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '登录名称',
								name : 'DLMC',
								id : "DLMC",
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
								fieldLabel : '管理部门',
								name : 'SSDW',
								
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'hidden',
								fieldLabel : '所属方向',
								name : 'SBFX',
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
							},{
								xtype : 'textfield',
								fieldLabel : '桩米数',
								name : 'PILE_METERS',
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '报废日期',
								id : 'scrapDate',
								allowBlank : false,
								blankText : '报废日期不为空',
			                    editable : false,
								name : 'scrapDate',
								//value : new Date().format('Y-m-d') + ' 00:00:00',
								anchor : '90%',
								style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
								listeners  : {   
					            	'focus':function(field){  
										var endTime = Ext.util.Format.date(
												new Date(), 'Y-m-d H:i:s');
										
										//  日期时间的默认参数      
									    var defaultDateTimeParams = new function()   
									    {   
									        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
									        this.startDate  = endTime;  //开始时间
									        this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';  //  格式化时间   
									        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
									        this.alwaysUseStartDate = false;           //  默认使用初始时间   
									    };  
					                    WdatePicker(defaultDateTimeParams);   
					                    field.blur();
					             	}   
								}  
								
//								xtype : 'datetimefield',
//								name : 'scrapDate',
//								fieldLabel : '报废日期',
//								format : 'Y-m-d H:i:s',
//								
//								editable : false,
//								anchor : '90%'
							}]
						} ]
					},{
						xtype : 'compositefield',
						items : [ {
							flex : 0.5,
							fieldLabel : '卡点',
							xtype : 'tooltiptextfield',
							allowBlank : false,
							name : 'passStation',
							id : 'passStation',
							width : 430,
							emptyText : '请选择卡点'
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
						} ]
					},{
						xtype : 'textarea',
						fieldLabel : '备注',
						name : 'REMARK',
						maxLength : 25,
						anchor : '95%'
					},{
						xtype : 'hidden',
						id : 'kkbhs',
						name : 'kkbhs'
					} ]
				} ],
				bbar : {
					buttonAlign : 'center',
					buttons : [ {
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;',
						scope : this,
						id : 'confirmBtn',
						handler : this.addNewDeviceHandler
					}, {
						xtype : 'tbspacer',
						width : 10
					}, {
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;',
						scope : this,
						id : 'cancelBtn',
						handler : function() {
							this.close();
						}
					} ]
				}
			} ],
			listeners : {
				afterrender : function() {
					providerStore.load();
					deviceTypeStore.load();
					deviceStateStore.load();
				}
			}
		});
		Jinpeng.device.AddNewDeviceWindow.superclass.initComponent.apply(this);
	},
	addNewDeviceHandler : function(btn) {
		var formPanel = Ext.getCmp('deviceDetailForm');

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
//		var usingDate = Ext.util.Format.date(deviceData.usingDate, 'Y-m-d H:i:s');
//		var stopeDate = Ext.util.Format.date(deviceData.stopeDate, 'Y-m-d H:i:s');
//		var scrapDate = Ext.util.Format.date(deviceData.scrapDate, 'Y-m-d H:i:s');
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"SBBH" : deviceData.SBBH,
				"SBMC" : deviceData.SBMC,
				"SBLX" : deviceData.SBLX,
				"SBCJ" : deviceData.SBCJ,
				"SBZT" : deviceData.SBZT,
				//"SSKKBH" : '440' + this.parentId,
				"SSKKBH" : Ext.getCmp('kkbhs').getValue(),
				"IPDZ" : deviceData.IPDZ,
				"DKH" : deviceData.DKH,
				"DLMC" : deviceData.DLMC,
				"DLMM" : deviceData.DLMM,
				"SSDW" : deviceData.SSDW,
				//"SBFX" : deviceData.SBFX,
				"JD" : deviceData.JD,
				"WD" : deviceData.WD,
				"INTERCEPT" : deviceData.INTERCEPT,
				"DEVICE_MODEL" : deviceData.DEVICE_MODEL,
				"DEVICE_ADRESS" : deviceData.DEVICE_ADRESS,
				"PILE_METERS" : deviceData.PILE_METERS,
				"usingDate" : deviceData.usingDate,
				"stopeDate" : deviceData.stopeDate,
				"scrapDate" : deviceData.scrapDate,
				"DIRECTION_NUMBER":this.parentId
			}),
			url : rootpath + '/device/addDevice.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == '1' || result == 1) {
					msg = "添加设备成功！";
					var grid = Ext.getCmp("deviceRecordGridPanel");
					var tree = Ext.getCmp("orgTreeWestPanel");
					if(grid){
						tree.refresh();
						grid.publish("clearGridSelections",[]);
						grid.store.reload();
						
					}
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
//		var usingDate = Ext.util.Format.date(deviceData.usingDate, 'Y-m-d H:i:s');
//		var stopeDate = Ext.util.Format.date(deviceData.stopeDate, 'Y-m-d H:i:s');
//		var scrapDate = Ext.util.Format.date(deviceData.scrapDate, 'Y-m-d H:i:s');
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"SBBH" : deviceData.SBBH,
				"SBMC" : deviceData.SBMC,
				"SBLX" : deviceData.SBLX,
				"SBCJ" : deviceData.SBCJ,
				"SBZT" : deviceData.SBZT,
				"SSKKBH" : Ext.getCmp('kkbhs').getValue(),
				"IPDZ" : deviceData.IPDZ,
				"DKH" : deviceData.DKH,
				"DLMC" : deviceData.DLMC,
				"DLMM" : deviceData.DLMM,
				"SSDW" : deviceData.SSDW,
				//"SBFX" : deviceData.SBFX,
				"JD" : deviceData.JD,
				"WD" : deviceData.WD,
				"INTERCEPT" : deviceData.INTERCEPT,
				"DEVICE_MODEL" : deviceData.DEVICE_MODEL,
				"DEVICE_ADRESS" : deviceData.DEVICE_ADRESS,
				"PILE_METERS" : deviceData.PILE_METERS,
				"usingDate" : deviceData.usingDate,
				"stopeDate" : deviceData.stopeDate,
				"scrapDate" : deviceData.scrapDate
			}),
			url : rootpath + '/device/updateDevice.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == 1) {
					msg = "更新设备成功！";
					var grid = Ext.getCmp("deviceRecordGridPanel");
					var tree = Ext.getCmp("orgTreeWestPanel");
					if(grid){
						tree.refresh();
						grid.publish("clearGridSelections",[]);
						grid.store.reload();
						
					}
					this.close();
				} else {
					msg = "更新设备失败";
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
	loadRecordById : function(id) {
		Ext.getCmp('deviceDetailForm').load({
			url : rootpath + '/device/initDeviceDetail.mvc?deviceNumber=' + id,
			success : function(from, action) {
				var detailForm = Ext.getCmp('deviceDetailForm');
				detailForm.updateFlag = true;
				var obj = Ext.util.JSON.decode(action.response.responseText);
				// 重置设备复杂字段
				detailForm.form.findField('SBBH').setValue(obj.data[0].SBBH);
				detailForm.form.findField('SBBH').setDisabled(true);
				detailForm.form.findField('SBMC').setValue(obj.data[0].SBMC);
				
				detailForm.form.findField('SBLX').setValue(obj.data[0].SBLX);
				detailForm.form.findField('SBCJ').setValue(obj.data[0].SBCJ);
				
				detailForm.form.findField('SBZT').setValue(obj.data[0].SBZT);
				//detailForm.form.findField('SSKKBH').setValue(obj.data[0].SSKKBH);
				detailForm.form.findField('JD').setValue(obj.data[0].JD);
				detailForm.form.findField('IPDZ').setValue(obj.data[0].IPDZ);
				detailForm.form.findField('DKH').setValue(obj.data[0].DKH);
				detailForm.form.findField('DLMC').setValue(obj.data[0].DLMC);
				detailForm.form.findField('DLMM').setValue(obj.data[0].DLMM);
				detailForm.form.findField('SSDW').setValue(obj.data[0].SSDW);
				//detailForm.form.findField('SBFX').setValue(obj.data[0].SBFX);
				detailForm.form.findField('WD').setValue(obj.data[0].WD);
				
				detailForm.form.findField('INTERCEPT').setValue(obj.data[0].INTERCEPT);
				detailForm.form.findField('DEVICE_MODEL').setValue(obj.data[0].DEVICE_MODEL);
				detailForm.form.findField('DEVICE_ADRESS').setValue(obj.data[0].DEVICE_ADRESS);
				detailForm.form.findField('PILE_METERS').setValue(obj.data[0].PILE_METERS);
				detailForm.form.findField('REMARK').setValue(obj.data[0].REMARK);
				if(obj.data[0].USING_DATE!="" ){
					var usingDate = obj.data[0].USING_DATE;
					usingDate = usingDate.substring(0,usingDate.lastIndexOf("."));
					detailForm.form.findField('usingDate').setValue(usingDate);
				}
				if(obj.data[0].STOP_DATE != "" ){
					 var stopeDate = obj.data[0].STOP_DATE;
					 stopeDate = stopeDate.substring(0,stopeDate.lastIndexOf("."));
					 detailForm.form.findField('stopeDate').setValue(stopeDate);
				}
				if(obj.data[0].SCRAP_DATE != ""){
				    var scrapDate = obj.data[0].SCRAP_DATE;
				    scrapDate = scrapDate.substring(0,scrapDate.lastIndexOf("."));
					detailForm.form.findField('scrapDate').setValue(scrapDate);
				}
				
				
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
			Ext.getCmp('deviceDetailForm').form.findField('org.orgName').callback(orgInfo['id'], orgInfo['text'], orgInfo['coding'],orgInfo['longitude'],orgInfo['latitude']);
		}

		this.createUniqueDeviceNo();
		// 设置默认登录名和密码
		// Ext.getCmp('loginPassWD').setValue("admin");
		// Ext.getCmp('loginName').setValue("admin");
		var detailForm = Ext.getCmp('deviceDetailForm');
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
				var form = Ext.getCmp('deviceDetailForm').form;
				if (result) {
					if (result == "-999") {
						/*
						 * Ext.getCmp('deviceDetailForm').form .findField('deviceId').setReadOnly(false)
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
//		var flag = this.isEncodeUnique(deviceData);
//		if(this.isEncodeUnique(deviceData) == -1){
//			Ext.Msg.confirm("提示", "设备编号已经存在,确认使用该编号？" , function(id) {
//				if ("yes" == id) {
//					actionFn();
//				}
//			}, this);
//		}else{
			actionFn();
//		}
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
