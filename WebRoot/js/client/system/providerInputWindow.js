Ext.ns("Jinpeng.provider");

// 供应商详细信息弹出窗口
Jinpeng.provider.AddNewProviderWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	layout : "fit",
	width : 650,
	title : "供应商",
	height : 290,
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
					id : 'providerDetailForm',
					defaults : {
						margins : '5 2 5 2'
					},
					items : [ {
						layout : 'column',
						border : false,
						items : [ {
							columnWidth : 1.0,
							layout : 'form',
							border : false,
							items : [ {
								xtype : 'textfield',
								fieldLabel : '供应商名称',
								name : 'providerName',
								allowBlank : false,
								emptyText : '请输入供应商名称',
								blankText:'供应商名称不能为空',
								maxLength : 25,
								anchor : '94%'
							}, {
								xtype : 'textfield',
								fieldLabel : '联系号码',
								name : 'cantactWay',
								id : "cantactWay",
								maxLength : 25,
								anchor : '94%',
								regex: /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,
								regexText : '输入正确的联系电话'
							}, {
								xtype : 'textarea',
								fieldLabel : '联系地址',
								name : 'cantactAdrees',
								maxLength : 25,
								anchor : '94%',
								maxLength : 500,
								maxLengthText : '不能超过500个字符'
							}, {
								xtype : 'textarea',
								fieldLabel : '备注',
								name : 'remark',
								maxLength : 25,
								anchor : '94%',
								maxLength : 500,
								maxLengthText : '不能超过500个字符'
							}, {
								xtype : 'hidden',
								id : 'id'
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
				handler : this.addProviderHandler
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
		Jinpeng.provider.AddNewProviderWindow.superclass.initComponent.apply(this);
	},
	addProviderHandler : function(btn) {
		var formPanel = Ext.getCmp('providerDetailForm');

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
				"providerName" : deviceData.providerName,
				"cantactWay" : deviceData.cantactWay,
				"cantactAdrees" : deviceData.cantactAdrees,
				"remark" : deviceData.remark
			}),
			url : rootpath + '/provider/addProvider.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == '1' || result == 1) {
					var grid = Ext.getCmp("providerRecordGridPanel");
					if(grid){
						grid.publish("clearGridSelections",[]);
						grid.store.reload();
					}
					msg = "添加供应商成功！";
					this.close();
				} else {
					msg = "添加供应商失败";
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
				"id" : deviceData.id,
				"providerName" : deviceData.providerName,
				"cantactWay" : deviceData.cantactWay,
				"cantactAdrees" : deviceData.cantactAdrees,
				"remark" : deviceData.remark
			}),
			url : rootpath + '/provider/updateProvider.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == 1) {
					msg = "更新供应商成功！";
				    var grid = Ext.getCmp("providerRecordGridPanel");
					if(grid){
						grid.publish("clearGridSelections",[]);
						grid.store.reload();
					}
					this.close();
				} else {
					msg = "更新供应商失败";
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
		Ext.getCmp('providerDetailForm').load({
			url : rootpath + '/provider/initProviderDetail.mvc?id=' + id,
			success : function(from, action) {
				var detailForm = Ext.getCmp('providerDetailForm');
				detailForm.updateFlag = true;
				var obj = Ext.util.JSON.decode(action.response.responseText);
				detailForm.form.findField('id').setValue(obj.data[0].ID);
				detailForm.form.findField('providerName').setValue(obj.data[0].NAME);
				detailForm.form.findField('cantactWay').setValue(obj.data[0].CANTACT_WAY);
				detailForm.form.findField('cantactAdrees').setValue(obj.data[0].CANTACT_ADREES);
				detailForm.form.findField('remark').setValue(obj.data[0].REMARK);
			},
			failure : function() {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg ='无法加载指定供应商信息！';
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
			url : rootpath + '/provider/checkProvider.mvc',
			async : false,
			params :{"id" : deviceData.id},
			success : function(r,o) {
				var response = Ext.decode(r.responseText);
				result = response.data;
			},
			scope : this
		});
		return result;
	}
});
