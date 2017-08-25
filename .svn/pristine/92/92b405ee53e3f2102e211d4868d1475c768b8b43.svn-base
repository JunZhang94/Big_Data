Ext.ns("Jinpeng.organization");

// 卡口信息弹出窗口
Jinpeng.organization.AddNewOrganizationWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	layout : "fit",
	width : 680,
	title : "组织机构信息",
	height : 220,
	stateful : false,
	closeAction : "close",
	stateful : false,
	plain : true,
	modal : true,
	border : false,
	addNewFlag : false,
	parentId : '',
	parentName : '',
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
					id : 'organizationDetailForm',
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
								fieldLabel : '单位编号',
								name : 'DWBH',
								maxLength : 12,
								allowBlank : false,
								blankText : '单位编号不为空',
								emptyText : '请输入单位编号',
								regex : /^[0-9]{1,12}$/,
								anchor : '90%'
							}, {
								xtype : 'hidden',
								fieldLabel : '城镇名称',
								name : 'CZDM',
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'hidden',
								fieldLabel : '父IP',
								name : 'DWXZQH',
								maxLength : 25,
								anchor : '90%',
								regex: /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/,  
               					regexText:'请正确填写IP地址'
							}, {
								xtype : 'textfield',
								fieldLabel : 'IP地址',
								name : 'IPDZ',
								maxLength : 25,
								anchor : '90%',
								regex: /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/,  
               					regexText:'请正确填写IP地址'  
							}, {
								xtype : 'textfield',
								fieldLabel : '备用IP地址',
								name : 'BYIPDZ',
								maxLength : 25,
								anchor : '90%',
								regex: /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/,  
               					regexText:'请正确填写IP地址'
							}, {
								xtype : 'textfield',
								fieldLabel : '管辖单位经度',
								name : 'GXDWJD',
								maxLength : 25,
								anchor : '90%',
								regex:  /^((\d|[1-8]\d)[°](\d|[0-5]\d)[′](\d|[0-5]\d)(\.\d{1,2})?[\″]?[N]|[S]$)|(90[°]0[′]0[\″]?[N]|[S]$)/,  
               					regexText:'请正确填写经度'
							}, {
								xtype : 'textfield',
								fieldLabel : '网络服务名',
								name : 'WLFWM',
								maxLength : 25,
								anchor : '90%'
							}]
						},{
							columnWidth : 0.5,
							layout : 'form',
							border : false,
							items : [{
								xtype : 'textfield',
								fieldLabel : '单位名称',
								allowBlank : false,
								blankText : '单位名称不为空',
								emptyText : '请输入单位名称',
								name : 'DWMC',
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '联系人',
								name : 'LXR',
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '联系电话',
								name : 'LXDH',
								maxLength : 25,
								anchor : '90%',
								regex: /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,  
               					regexText:'请正确填写联系电话'      
							}, {
								xtype : 'textfield',
								fieldLabel : '管辖单位纬度',
								name : 'GXDWWD',
								maxLength : 25,
								anchor : '90%',
								regex: /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/,  
               					regexText:'请正确填写纬度'
							}]
						} ]
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
				handler : this.addNewOrganizationHandler
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
		Jinpeng.organization.AddNewOrganizationWindow.superclass.initComponent.apply(this);
	},
	addNewOrganizationHandler : function(btn) {
		var formPanel = Ext.getCmp('organizationDetailForm');

		if (formPanel.getForm().isValid()) {
			var organizationData = formPanel.getForm().getFieldValues();

			var listChannelData = [];
			
			var actionFn = Ext.emptyFn;
			
			if (this.addNewFlag) {
				actionFn = this.doAddOrganization.createDelegate(this, [organizationData, listChannelData, btn]);
			} else {
				actionFn = this.doModifyOrganization.createDelegate(this,[organizationData, listChannelData, btn]);
			}
			
			this.saveOrUpdateWithCheckEncode(actionFn,organizationData);
		}

	},
	doAddOrganization : function(organizationData, channelData, btn) {
		btn.disable();
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"DWBH" : organizationData.DWBH,
				"DWMC" : organizationData.DWMC,
				"CZDM" : this.parentName,
				"IPDZ" : organizationData.IPDZ,
				"DWXZQH" : this.parentId,
				"BYIPDZ" : organizationData.BYIPDZ,
				"LXR" : organizationData.LXR,
				"LXDH" : organizationData.LXDH,
				"GXDWWD" : organizationData.GXDWWD,
				"GXDWJD" : organizationData.GXDWJD,
				"WLFWM" : organizationData.WLFWM
			}),
			url : rootpath + '/systemOrg/addOrganization.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == '1' || result == 1) {
					msg = "添加部门成功！";
					var grid = Ext.getCmp("deviceRecordGridPanel");
					var tree = Ext.getCmp("orgTreeWestPanel");
					if(grid){
						tree.refresh();
						grid.publish("clearGridSelections",[]);
						grid.store.reload();
					}
					this.close();
				} else if (result == '-1' || result == -1) {
					msg = "部门编码已经存在";
				} else {
					msg = "添加部门失败";
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
	doModifyOrganization : function(organizationData, channelData, btn) {
		btn.disable();
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"DWBH" : organizationData.DWBH,
				"DWMC" : organizationData.DWMC,
				"CZDM" : this.parentName,
				"IPDZ" : organizationData.IPDZ,
				"DWXZQH" : this.parentId,
				"BYIPDZ" : organizationData.BYIPDZ,
				"LXR" : organizationData.LXR,
				"LXDH" : organizationData.LXDH,
				"GXDWWD" : organizationData.GXDWWD,
				"GXDWJD" : organizationData.GXDWJD,
				"WLFWM" : organizationData.WLFWM
			}),
			url : rootpath + '/systemOrg/updateOrganization.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == 1) {
					//更新数据时刷新页面
					var grid = Ext.getCmp("deviceRecordGridPanel");
					var tree = Ext.getCmp("orgTreeWestPanel");
					if(grid){
						tree.refresh();
						grid.publish("clearGridSelections",[]);
						grid.store.reload();
					}
					msg = "更新部门成功！";
					//dispatchOrganizationMessage(result[1]);
					this.close();
				} else {
					msg = "更新部门失败";
				}
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = msg;
				win.show();

				//var grid = Ext.getCmp('organizationListGridPanel');
			},
			failure : function(response, options) {
				btn.enable();
			},
			scope : this
		});
	},
	loadRecordById : function(id) {
		Ext.getCmp('organizationDetailForm').load({
			url : rootpath + '/systemOrg/initOrganizationDetail.mvc?DWBH=' + id,
			success : function(from, action) {
				var detailForm = Ext.getCmp('organizationDetailForm');
				detailForm.updateFlag = true;
				var obj = Ext.util.JSON.decode(action.response.responseText);
				detailForm.form.findField('DWBH').setValue(obj.data[0].DWBH);
				detailForm.form.findField('DWMC').setValue(obj.data[0].DWMC);
				detailForm.form.findField('DWBH').setDisabled(true);
				detailForm.form.findField('DWMC').setDisabled(true);
				detailForm.form.findField('CZDM').setValue(obj.data[0].CZDM);
				detailForm.form.findField('IPDZ').setValue(obj.data[0].IPDZ);
				detailForm.form.findField('DWXZQH').setValue(obj.data[0].DWXZQH);
				detailForm.form.findField('BYIPDZ').setValue(obj.data[0].BYIPDZ);
				detailForm.form.findField('LXR').setValue(obj.data[0].LXR);
				detailForm.form.findField('LXDH').setValue(obj.data[0].LXDH);
				detailForm.form.findField('GXDWWD').setValue(obj.data[0].GXDWWD);
				detailForm.form.findField('GXDWJD').setValue(obj.data[0].GXDWJD);
				detailForm.form.findField('WLFWM').setValue(obj.data[0].WLFWM);
			},
			failure : function() {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '无法加载指定卡口信息！';
				win.show();
			}
		});

		this.show();
	},
	loadEmptyRecord : function(orgInfo) {
		
		if (orgInfo && orgInfo['isDirection']) {
			Ext.getCmp('organizationDetailForm').form.findField('org.orgName').callback(orgInfo['id'], orgInfo['text'], orgInfo['coding'],orgInfo['longitude'],orgInfo['latitude']);
		}

		this.createUniqueOrganizationNo();
		// 设置默认登录名和密码
		// Ext.getCmp('loginPassWD').setValue("admin");
		// Ext.getCmp('loginName').setValue("admin");
		var detailForm = Ext.getCmp('organizationDetailForm');
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
			name : "relOrganization"
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
	createUniqueOrganizationNo : function() {
		Ext.Ajax.request({
			url : rootpath + '/client/organization/getOrganizationNo.action',
			success : function(response) {
				var result = Ext.decode(response.responseText);
				var form = Ext.getCmp('organizationDetailForm').form;
				if (result) {
					if (result == "-999") {
						/*
						 * Ext.getCmp('organizationDetailForm').form .findField('organizationId').setReadOnly(false)
						 */
					} else {
						form.findField('organizationId').setValue(result);
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
	saveOrUpdateWithCheckEncode :function(actionFn,organizationData){
		var flag = this.isEncodeUnique(organizationData);
//		if(this.isEncodeUnique(organizationData) == -1){
//			Ext.Msg.confirm("提示", "部门编号已经存在,请重新输入!" , function(id) {
//				if ("yes" == id) {
//					return false;
//					//actionFn();
//				}
//			}, this);
//		}else{
			actionFn();
//		}
	},
	isEncodeUnique : function(organizationData){
		var result = 0;
		Ext.Ajax.request({
			url : rootpath + '/systemOrg/checkOrganization.mvc',
			async : false,
			params :{"DWBH" : organizationData.DWBH},
			success : function(r,o) {
				var response = Ext.decode(r.responseText);
				result = response.data;
			},
			scope : this
		});
		return result;
	}
});
