Ext.ns("Jinpeng.dictionary");

// 车辆详细信息弹出窗口
Jinpeng.dictionary.AddNewDictionaryWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	layout : "fit",
	width : 400,
	title : "字典信息",
	height : 200,
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
					id : 'dictionaryDetailForm',
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
								fieldLabel : '显示名称',
								name : 'DISPLAYVALUE',
								allowBlank : false,
								maxLength : 25,
								anchor : '94%'
							}, {
								xtype : 'textfield',
								fieldLabel : '编码',
								name : 'SETTINGNAME',
								id : "SETTINGNAME",
								maxLength : 25,
								anchor : '94%'
							}, {
								xtype : 'textfield',
								fieldLabel : '存储值',
								name : 'STOREVALUE',
								id : "STOREVALUE",
								maxLength : 25,
								anchor : '94%'
							}, {
								xtype : 'textfield',
								fieldLabel : '描述',
								name : 'NOTES',
								id : "NOTES",
								maxLength : 25,
								anchor : '94%'
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
					handler : this.addDictionaryHandler
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
		Jinpeng.dictionary.AddNewDictionaryWindow.superclass.initComponent.apply(this);
	},
	addDictionaryHandler : function(btn) {
		var formPanel = Ext.getCmp('dictionaryDetailForm');
		if (formPanel.getForm().isValid()) {
			var deviceData = formPanel.getForm().getFieldValues();
			var listChannelData = [];
			if (this.addNewFlag) {
				this.doAddDitionary(deviceData, listChannelData, btn);
			} else {
				this.doModifyDitionary(deviceData, listChannelData, btn);
			}
		}
	},
	doAddDitionary : function(deviceData, channelData, btn) {
		btn.disable();
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"DISPLAYVALUE" : deviceData.DISPLAYVALUE,
				"SETTINGNAME" : deviceData.SETTINGNAME,
				"STOREVALUE" : deviceData.STOREVALUE,
				"NOTES" : deviceData.NOTES
			}),
			url : rootpath + '/dictionary/addDictionary.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == '1' || result == 1) {
					msg = "添加字典项成功！";
					var grid = Ext.getCmp("dictionaryRecordGridPanel");
					if(grid){
						grid.publish("clearGridSelections",[]);
						grid.store.reload();
					}
					this.close();
				} else {
					msg = "添加字典项失败";
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
	doModifyDitionary : function(deviceData, channelData, btn) {
		btn.disable();
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"id" : deviceData.id,
				"DISPLAYVALUE" : deviceData.DISPLAYVALUE,
				"SETTINGNAME" : deviceData.SETTINGNAME,
				"STOREVALUE" : deviceData.STOREVALUE,
				"NOTES" : deviceData.NOTES
			}),
			url : rootpath + '/dictionary/updateDictionary.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == 1) {
					msg = "更新字典项成功！";
					//dispatchDitionaryMessage(result[1]);
					var grid = Ext.getCmp("dictionaryRecordGridPanel");
					if(grid){
						grid.publish("clearGridSelections",[]);
						grid.store.reload();
					}
					this.close();
				} else {
					msg = "更新字典项失败";
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
		Ext.getCmp('dictionaryDetailForm').load({
			url : rootpath + '/dictionary/initDictionaryDetail.mvc?id=' + id,
			success : function(from, action) {
				var detailForm = Ext.getCmp('dictionaryDetailForm');
				detailForm.updateFlag = true;
				var obj = Ext.util.JSON.decode(action.response.responseText);
				detailForm.form.findField('id').setValue(obj.data[0].ID);
				detailForm.form.findField('DISPLAYVALUE').setValue(obj.data[0].DISPLAYVALUE);
				detailForm.form.findField('SETTINGNAME').setValue(obj.data[0].SETTINGNAME);
				detailForm.form.findField('STOREVALUE').setValue(obj.data[0].STOREVALUE);
				detailForm.form.findField('NOTES').setValue(obj.data[0].NOTES);
			},
			failure : function() {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '无法加载指定字典项信息！';
				win.show();
			}
		});
		this.show();
	}
});
