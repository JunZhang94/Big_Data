Ext.ns("Jinpeng.kkDirection");

var deviceDirConfig = {
	combURL : rootpath + '/provider/jsonProviderInCombo.mvc',
	dicURL : rootpath + '/dictionary/jsonDictsInCombo.mvc'
};

// 车辆详细信息弹出窗口
Jinpeng.kkDirection.AddNewKkDirectionWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	layout : "fit",
	width : 710,
	title : "修改卡口方向",
	height : 300,
	stateful : false,
	closeAction : "close",
	stateful : false,
	plain : true,
	modal : true,
	border : false,
	addNewFlag : false,
	parentId :'',
	initComponent : function() {
		var comboBoxTree = new Ext.ux.OrgComboBoxTree({
			fieldLabel : '卡口名称',
			name : 'KKMC',
			id : 'parentId',
			allowBlank:false,
			emptyText : '请选择...',
			blankText : '请选择卡口',
			anchor : '90%',
			editable : false,
			treeUrl : '',
			dataType : 'device',
			callback : function(id, text, coding, orgType) {
				Ext.getCmp('deviceDirDetailForm').form.findField('orgId').setValue(id);
				Ext.getCmp('deviceDirDetailForm').form.findField('orgType').setValue(orgType);
				var num = Ext.get("orgType").getValue();
				if(num =="0" || num =="1"){
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = "请正确选择卡口......";
					win.show();
					Ext.getCmp('parentId').setValue();
				}else{
					Ext.getCmp('KKBH').setValue(id);
				}
				
					
			}
			
		});
	    //0-正常 1-故障 2-报废 3-停用
	    //设备使用状态
		//[['0','正常'],['1','故障'],['2','报废'],['3','停用']];
 		var acceptWaysStore =new Ext.data.JsonStore({
 			root:'data',
 			fields:['id','text'],
 			baseParams :　{
 			　　code : 'DEVICE_STATUS'
 			},
 			url : deviceDirConfig.dicURL
 		
 		});
 		//方向类型,1-上行/进城/环线顺时针、2-下行/出城/环线逆时针、0-不表示进出。
 		//设备的方向
 		//[['0','未知方向'],['1','上行/进城/环线顺时针'],['2','下行/出城/环线逆时针']];
 		var directionTypeStore =new Ext.data.JsonStore({
 			root : 'data',
 			fields : ['id','text'],
 			baseParams : {
 			  code : 'DIRECTION_TYPE'
 			},
 			url : deviceDirConfig.dicURL
 		});
		//设备类型
		var deviceTypeStore = new Ext.data.JsonStore({
			root : 'data',
			fields : [ 'id', 'text' ],
			baseParams : {
				code : 'DeviceType'
			},
			url : deviceDirConfig.dicURL
		});
		
		//设备类型
		var deviceStateStore = new Ext.data.JsonStore({
			root : 'data',
			fields : [ 'id', 'text' ],
			baseParams : {
				code : 'DEVICE_STATUS'
			},
			url : deviceDirConfig.dicURL
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
					id : 'deviceDirDetailForm',
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
								xtype : 'hidden',
								name:'ID',
								id : 'ID'
							},{
								xtype : 'textfield',
								fieldLabel : '卡口方向编号',
								name : 'DIRECTION_NUMBER',
								allowBlank : false,
								blankText : '卡口方向编号不为空',
								regex : /^[0-9]{1,7}$/,
								regexText : '最大长度7位数字',
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '卡口方向名称',
								name : 'DIRECTION_NAME',
								allowBlank : false,
								blankText : '卡口方向名称不为空',
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'combo',
								fieldLabel : '卡口设备类型',
								allowBlank : false,
								blankText : '请选择卡口设备类型',
								name : 'MOUNT_DEVICE_TYPE',
								anchor : '90%',
								
								emptyText : '请选择...',
								editable : false,
								triggerAction : 'all',
								mode : "local",
								store : deviceTypeStore,
								valueField : 'id',
								displayField : 'text'
							},{
								xtype : 'textfield',
								fieldLabel : '运维责任人',
								name : 'OPERATION_PERSON',
								allowBlank : true,
								anchor : '90%'
							}]
						}, {
							columnWidth : 0.5,
							layout : 'form',
							border : false,
							items : [{
								xtype : 'hidden',
								name:'KKBH',
								id : 'KKBH'
							},{
								fieldLabel : '卡口设备方向',
								allowBlank:false,
								blankText:'请选择方向类型',
								xtype : 'tcombo',
								name : 'dates',
								id : 'TYPE',
								name: 'TYPE',
								selectOnFocus : true,
								forceSelection : true,
								triggerAction : 'all',
								emptyText : '请选择方向类型',
								anchor : '90%',
								//value:3,
								store : directionTypeStore,
								valueField : 'id',
								displayField : 'text'
							},/*{
								fieldLabel : '卡口名称',
								allowBlank:false,
								blankText:'请选择卡口',
								anchor : '95%',
								items : [comboBoxTree]
							},*/{
								fieldLabel : '监控状态',
								allowBlank:false,
								blankText:'请选择监控状态',
								xtype : 'tcombo',
								name : 'dates',
								id : 'MONITOR_STATE',
								name: 'MONITOR_STATE',
								selectOnFocus : true,
								forceSelection : true,
								triggerAction : 'all',
//								emptyText : '请选择监控状态',
								anchor : '90%',
								//value:3,
								store : acceptWaysStore,
								valueField : 'id',
								displayField : 'text'
							},{
								xtype : 'textfield',
								fieldLabel : '运维手机号码',
								name : 'OPERATION_PHONE',
								regex : /^[0-9]{11}$/,
								regexText : '只能输入11位数字',
								anchor : '90%'
							},{
								xtype : 'numberfield',
								fieldLabel : '车道总数',
								name : 'DRIVEWAY_MOUNT',
								id : 'DRIVEWAY_MOUNT',
								
								minValue : 0,
								maxValue : 65535,
								autoCreate : {
									tag : 'input',
									type : 'text',
									autocomplete : 'off',
									maxlength : '5'
								},
								anchor : '90%'
							} ]
						} ]
					},{
						xtype : 'textarea',
						fieldLabel : '备注',
						name : 'REMARK',
						maxLength : 25,
						anchor : '95%'
					} ,{
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
				} ]
			},{
				xtype : 'hidden',
				id : 'deviceDesc'
			}],
			buttonAlign : 'center',
			buttons : [ {
				xtype : 'button',
				text : '&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;',
				scope : this,
				id : 'confirmBtn',
				handler : this.addNewDeviceDirHandler
			}, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', {
				xtype : 'button',
				text : '&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;',
				scope : this,
				id : 'cancelBtn',
				handler : function() {
					this.close();
				}
			} ],
			listeners : {
				afterrender : function() {
					deviceTypeStore.load();
					deviceStateStore.load();
					acceptWaysStore.load();
					directionTypeStore.load();
				}
			}
		});
		Jinpeng.kkDirection.AddNewKkDirectionWindow.superclass.initComponent.apply(this);
	},
	addNewDeviceDirHandler : function(btn) {
		var formPanel = Ext.getCmp('deviceDirDetailForm');

		if (formPanel.getForm().isValid()) {
			var deviceDirectionData = formPanel.getForm().getFieldValues();

			var listChannelData = [];
			
			var actionFn = Ext.emptyFn;
			
			if (this.addNewFlag) {
				actionFn = this.doAddDeviceDirection.createDelegate(this, [deviceDirectionData, listChannelData, btn]);
			} else {
				actionFn = this.doModifyDeviceDirection.createDelegate(this,[deviceDirectionData, listChannelData, btn]);
			}
			
			this.saveOrUpdateWithCheckEncode(actionFn,deviceDirectionData);
		}

	},
	doAddDeviceDirection : function(kkDirectionData, channelData, btn) {
		btn.disable();
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"DIRECTION_NUMBER" :kkDirectionData.DIRECTION_NUMBER,
				"DIRECTION_NAME" : kkDirectionData.DIRECTION_NAME,
				"MOUNT_DEVICE_TYPE" : kkDirectionData.MOUNT_DEVICE_TYPE,
				"OPERATION_PERSON" : kkDirectionData.OPERATION_PERSON,
				"TYPE" : kkDirectionData.TYPE,
				"KKBH" : "440" + this.parentId,//"440"+kkDirectionData.KKBH
				"MONITOR_STATE" : kkDirectionData.MONITOR_STATE,
				"OPERATION_PHONE" : kkDirectionData.OPERATION_PHONE,
				"DRIVEWAY_MOUNT" : kkDirectionData.DRIVEWAY_MOUNT,
				"REMARK" : kkDirectionData.REMARK,
				"CREATE_TIME":kkDirectionData.CREATE_TIME,
			}),
			url : rootpath + '/device/addDeviceDirection.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == '1' || result == 1) {
					msg = "添加卡口方向成功！";
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
					msg = "卡口方向编号已存在";
				} else {
					msg = "添加卡口方向失败";
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
	doModifyDeviceDirection : function(kkDirectionData, channelData, btn) {
		btn.disable();
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"ID":kkDirectionData.ID,
				"DIRECTION_NUMBER" :kkDirectionData.DIRECTION_NUMBER,
				"DIRECTION_NAME" : kkDirectionData.DIRECTION_NAME,
				"MOUNT_DEVICE_TYPE" : kkDirectionData.MOUNT_DEVICE_TYPE,
				"OPERATION_PERSON" : kkDirectionData.OPERATION_PERSON,
				"TYPE" : kkDirectionData.TYPE,
				"KKBH" : kkDirectionData.KKBH,
				"MONITOR_STATE" : kkDirectionData.MONITOR_STATE,
				"OPERATION_PHONE" : kkDirectionData.OPERATION_PHONE,
				"DRIVEWAY_MOUNT" : kkDirectionData.DRIVEWAY_MOUNT,
				"REMARK" : kkDirectionData.REMARK,
				//"CREATE_TIME":kkDirectionData.CREATE_TIME,
			}),
			url : rootpath + '/device/updateDeviceDirInfo.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == 1) {
					msg = "更新卡口方向成功！";
					var grid = Ext.getCmp("deviceRecordGridPanel");
					var tree = Ext.getCmp("orgTreeWestPanel");
					if(grid){
						tree.refresh();
						grid.publish("clearGridSelections",[]);
						grid.store.reload();
						
					}
					
						
					this.close();
				} else {
					msg = "更新卡口方向失败";
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
		Ext.getCmp('deviceDirDetailForm').load({
			url : rootpath + '/device/initDeviceDirDetail.mvc?ID=' + id,
			success : function(from, action) {
				var detailForm = Ext.getCmp('deviceDirDetailForm');
				detailForm.updateFlag = true;
				var obj = Ext.util.JSON.decode(action.response.responseText);
				// 重置设备复杂字段
				detailForm.form.findField('ID').setValue(obj.data[0].ID);
				detailForm.form.findField('DIRECTION_NUMBER').setValue(obj.data[0].DIRECTION_NUMBER);
				detailForm.form.findField('DIRECTION_NUMBER').setDisabled(true);
				detailForm.form.findField('DIRECTION_NAME').setValue(obj.data[0].DIRECTION_NAME);
				
				detailForm.form.findField('MOUNT_DEVICE_TYPE').setValue(obj.data[0].MOUNT_DEVICE_TYPE);
				detailForm.form.findField('OPERATION_PERSON').setValue(obj.data[0].OPERATION_PERSON);
				
				detailForm.form.findField('TYPE').setValue(obj.data[0].TYPE);
				detailForm.form.findField('KKBH').setValue(obj.data[0].KKBH);
				detailForm.form.findField('KKBH').setDisabled(true);
				//window.dictionary.getValue("DeviceType",data.get("cwhpys")) 
				detailForm.form.findField('MONITOR_STATE').setValue(obj.data[0].MONITOR_STATE);
				detailForm.form.findField('OPERATION_PHONE').setValue(obj.data[0].OPERATION_PHONE);
				detailForm.form.findField('DRIVEWAY_MOUNT').setValue(obj.data[0].DRIVEWAY_MOUNT);
				detailForm.form.findField('REMARK').setValue(obj.data[0].REMARK);
//				var date = new Date(obj.data[0].CREATE_TIME).format('Y-m-d H:i:s');
//				detailForm.form.findField('CREATE_TIME').setValue(date);				
			},
			failure : function() {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '无法加载指定卡口设备方向信息！';
				win.show();
			}
		});
		this.show();
	},
	saveOrUpdateWithCheckEncode :function(actionFn,deviceData){
			actionFn();
	}
});
