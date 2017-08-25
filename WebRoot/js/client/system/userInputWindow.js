Ext.ns("Jinpeng.userMgr");

// 车辆详细信息弹出窗口
Jinpeng.userMgr.AddNewUserWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	layout : "fit",
	width : 680,
	title : "修改用户",
	height : 240,
	stateful : false,
	closeAction : "close",
	stateful : false,
	plain : true,
	modal : true,
	border : false,
	addNewFlag : false,
	parentId :'',
	initComponent : function() {
	
		var solrStatusStore = new Ext.data.JsonStore({
			url : rootpath + "/dictionary/jsonRoleInCombo.mvc",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false
	    });
		
		var startTimeSpinner = new Ext.ux.form.SpinnerField({
		    name : 'startTime',
			id : 'startTime',
			fieldLabel : '&nbsp;&nbsp有效时间',
			width : 60,
			tooltip : {
				text : ""
			},
			value : 8,
			cellWidth : 250,
			minValue : 0,
			maxValue : 24,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		
		var endTimeSpinner = new Ext.ux.form.SpinnerField({
		    name : 'endTime',
			id : 'endTime',
			fieldLabel : '&nbsp;&nbsp至',
			width : 60,
			tooltip : {
				text : ""
			},
			cellWidth : 250,
			value : 18,
			minValue : 0,
			maxValue : 24,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		
//		var solrStatusCombo = new Jinpeng.widget.MultiSelect({
//            renderTo: Ext.getBody(),
//            editable: false,
//            fieldLabel : '角色',
//            store: solrStatusStore,
//            id: 'ROLE_ID',
//            name: 'ROLE_ID',
//            valueField: 'id',
//            displayField: "text",
//            mode: 'local',
//            triggerAction: 'all',
//            allowBlank: false,
//            emptyText: '请选择',
//            maxHeight:200, //下拉框的最大高度
//            anchor : '90%'
//        });


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
					id : 'userDetailForm',
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
								fieldLabel : '登录账号',
								name : 'USER_CODE',
								allowBlank : false,
								maxLength : 25,
								anchor : '90%'
								
							}, {
								xtype : 'textfield',
								fieldLabel : '确认密码',
								name : 'RE_PASSWORD',
								inputType: 'password',
								allowBlank : false,
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '用户名称',
								name : 'USER_NAME',
								allowBlank : false,
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'combo',
								fieldLabel : '性别',
								name : 'SEX',
								anchor : '90%',
								emptyText : '请选择...',
								editable : false,
								triggerAction : 'all',
								mode : "local",
								valueField : 'id',
								value : 1,
								displayField : 'text',
								store : new Ext.data.ArrayStore({
									fields : [ 'id', 'text' ],
									data : [ [ 1, '男' ], [ 0, '女' ] ]
								})
							},{
								xtype : 'textfield',
								fieldLabel : '起始IP',
								name : 'IP1',
								id : "IP1",
								maxLength : 25,
								anchor : '90%',
								regex : /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
								regexText : '输入正确的IP',
								listeners  : { 
								/*
								'focus':function(field){
									//alert("ddd");
									 Ext.getCmp("IP2").setValue(Ext.getCmp("IP1").getValue());
									 field.blur();
									}
								*/
								}
							},startTimeSpinner, {
								xtype : 'hidden',
								fieldLabel : '所属部门ID',
								name : 'ORGAN_ID',
								id : "ORGAN_ID"
							}]
						}, {
							columnWidth : 0.5,
							layout : 'form',
							border : false,
							items : [ {
								xtype : 'textfield',
								fieldLabel : '登录密码',
								name : 'PASSWORD',
								inputType: 'password',
								allowBlank : false,
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '联系电话',
								name : 'PHONE',
								maxLength : 25,
								anchor : '90%',
								regex: /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,
								regexText : '输入正确的联系电话'
								
								
							}, {
								xtype : 'textfield',
								fieldLabel : '身份证号',
								name : 'ID_CARD',
								id : "ID_CARD",
								maxLength : 25,
								anchor : '90%',
								regex : /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
								regexText : '输入正确的身份号码'
							},	{
								xtype : 'combo',
								fieldLabel : '角色',
					            store: solrStatusStore,
					            id: 'ROLE_ID',
					            name: 'ROLE_ID',
					            valueField: 'id',
					            displayField: "text",
					            mode: 'local',
					            triggerAction: 'all',
					            allowBlank: false,
					            emptyText: '请选择',
					            maxHeight:200, //下拉框的最大高度
					            anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '结束IP',
								name : 'IP2',
								id : "IP2",
								maxLength : 25,
								anchor : '90%',
								regex : /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
								regexText : '输入正确的IP'
							}, endTimeSpinner,{
								xtype : 'hidden',
								fieldLabel : '用户ID',
								name : 'USER_ID',
								id : "USER_ID"
							}, {
								xtype : 'hidden',
								fieldLabel : '角色ID',
								name : 'ROLE_HIDDEN_ID',
								id : "ROLE_HIDDEN_ID"
							}]
						} ]
					} ]
				} ],
				bbar : {
					buttonAlign : 'center',
					buttons : [ {
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;',
						scope : this,
						id : 'confimBtn',
						handler : this.addNewUserHandler
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
					solrStatusStore.load();
				}
			}
		});
		Jinpeng.userMgr.AddNewUserWindow.superclass.initComponent.apply(this);
	},
	addNewUserHandler : function(btn) {
		var formPanel = Ext.getCmp('userDetailForm');
		if (formPanel.getForm().isValid()) {
			var userData = formPanel.getForm().getFieldValues();
			if (userData.PASSWORD != userData.RE_PASSWORD) {
				msg = "登录密码和确认密码不一致！";
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = msg;
				win.show();
				return false;
			}
			var listChannelData = [];
			
			var actionFn = Ext.emptyFn;
			
			if (this.addNewFlag) {
				actionFn = this.doAddUser.createDelegate(this, [userData, listChannelData, btn]);
				this.saveOrUpdateWithCheckEncode(actionFn,userData);
			} else {
				this.doModifyUser(userData, listChannelData, btn);
			}
			
		}

	},
	doAddUser : function(userData, channelData, btn) {
		//btn.disable();
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"USER_CODE" : userData.USER_CODE,
				"RE_PASSWORD" : userData.RE_PASSWORD,
				"USER_NAME" : userData.USER_NAME,
				"ORGAN_ID" : this.parentId==''?'440100':this.parentId,//如果树节点没被选中时，给定默认值'440100'即为布控单位为'广州市'
				"SEX" : userData.SEX,
				"PASSWORD" : userData.PASSWORD,
				"PHONE" : userData.PHONE,
				"ID_CARD" : userData.ID_CARD,
				"ROLE_ID" : userData.ROLE_ID,
				"IP1" : userData.IP1,
				"IP2" : userData.IP2,
				"startTime" : userData.startTime,
				"endTime" : userData.endTime
			}),
			url : rootpath + '/user/addUser.mvc',
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
					msg = "添加用户成功！";
					//dispatchUserMessage(result);
					this.close();
				} else if (result == '-1' || result == -1) {
					msg = "登录账号已经存在";
				} else {
					msg = "添加用户失败";
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
	doModifyUser : function(userData, channelData, btn) {
		btn.disable();
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"USER_CODE" : userData.USER_CODE,
				"RE_PASSWORD" : userData.RE_PASSWORD,
				"USER_NAME" : userData.USER_NAME,
				"SEX" : userData.SEX,
				"PASSWORD" : userData.PASSWORD,
				"PHONE" : userData.PHONE,
				"ID_CARD" : userData.ID_CARD,
				"USER_ID" : userData.USER_ID,
				"ROLE_ID" : userData.ROLE_ID,
				"IP1" : userData.IP1,
				"IP2" : userData.IP2,
				"startTime" : userData.startTime,
				"endTime" : userData.endTime,
				"ROLE_HIDDEN_ID" : userData.ROLE_HIDDEN_ID
			}),
			url : rootpath + '/user/updateUser.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == 1) {
					msg = "更新用户成功！";
					var grid = Ext.getCmp("userMgrRecordGridPanel");
					if(grid){
						grid.publish("clearGridSelections",[]);
						grid.store.reload();
					}
					//dispatchUserMessage(result[1]);
					this.close();
				} else {
					msg = "权限不够，更新用户失败";
				}
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = msg;
				win.show();

				//var grid = Ext.getCmp('userListGridPanel');
			},
			failure : function(response, options) {
				btn.enable();
			},
			scope : this
		});
	},
	loadRecordById : function(id) {
		Ext.getCmp('userDetailForm').load({
			url : rootpath + '/user/initUserDetail.mvc?USER_ID=' + id,
			success : function(from, action) {
				var detailForm = Ext.getCmp('userDetailForm');
				detailForm.updateFlag = true;
				var obj = Ext.util.JSON.decode(action.response.responseText);
				detailForm.form.findField('USER_CODE').setValue(obj.data[0].USER_CODE);
				detailForm.form.findField('USER_CODE').setDisabled(true);
				detailForm.form.findField('RE_PASSWORD').setValue(obj.data[0].PASSWORD);
				detailForm.form.findField('USER_NAME').setValue(obj.data[0].USER_NAME);
				detailForm.form.findField('SEX').setValue(obj.data[0].SEX);
				detailForm.form.findField('PASSWORD').setValue(obj.data[0].PASSWORD);
				detailForm.form.findField('PHONE').setValue(obj.data[0].PHONE);
				detailForm.form.findField('ID_CARD').setValue(obj.data[0].ID_CARD);
				detailForm.form.findField('USER_ID').setValue(obj.data[0].USER_ID);
				detailForm.form.findField('ROLE_ID').setValue(obj.data[0].ROLE_ID);
				detailForm.form.findField('IP1').setValue(obj.data[0].IP1);
				detailForm.form.findField('IP2').setValue(obj.data[0].IP2);
				detailForm.form.findField('startTime').setValue(obj.data[0].STARTTIME);
				detailForm.form.findField('endTime').setValue(obj.data[0].ENDTIME);
				detailForm.form.findField('ROLE_HIDDEN_ID').setValue(obj.data[0].ROLE_ID);
			},
			failure : function() {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg ='无法加载指定用户信息！';
				win.show();
			}
		});

		this.show();
	},
	saveOrUpdateWithCheckEncode :function(actionFn,userData){
		var flag = this.isEncodeUnique(userData);
		if(this.isEncodeUnique(userData) == -1){
			Ext.Msg.confirm("提示", "该登录账号已经存在,请重新输入!" , function(id) {
				if ("yes" == id) {
					return false;
					//actionFn();
				}
			}, this);
		}else{
			actionFn();
		}
	},
	isEncodeUnique : function(userData){
		var result = 0;
		Ext.Ajax.request({
			url : rootpath + '/user/checkUser.mvc',
			async : false,
			params :{"USER_CODE" : userData.USER_CODE},
			success : function(r,o) {
				var response = Ext.decode(r.responseText);
				result = response.data;
			},
			scope : this
		});
		return result;
	}
});

//还原窗口上的按钮为默认样式
function cancelWindowBtnStyle() {
	document.getElementById("confimBtn").className = "";
	document.getElementById("cancelBtn").className = "";
}
