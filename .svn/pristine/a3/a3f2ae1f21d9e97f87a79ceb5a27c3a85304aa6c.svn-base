Ext.ns("Jinpeng.troubleVerify");

// 车辆详细信息弹出窗口
Jinpeng.troubleVerify.AddNewTroubleVerifyWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
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
					id : 'troubleVerifyDetailForm',
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
								xtype : 'displayfield',
								fieldLabel : '设备名称',
								name : 'deviceName',
								anchor : '95%'
							}, {
								xtype : 'displayfield',
								fieldLabel : '故障时间',
								name : 'troubleTime',
								id : "troubleTime",
								format : 'Y-m-d',
								maxLength : 25,
								anchor : '94%'
							}]
						}, {
							columnWidth : 0.5,
							layout : 'form',
							border : false,
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '故障类型',
								name : 'troubleType',
								anchor : '94%'
							}, {
								xtype : 'hidden',
								id : 'id'
							}]
						} ]
					}, {
						xtype : 'displayfield',
						fieldLabel : '故障描述',
						name : 'troubleRemarck',
						anchor : '97.5%',
					} ]
				} ]
			} ],
			buttonAlign : 'center',
			buttons : [ {
				xtype : 'button',
				text : '&nbsp;&nbsp;&nbsp;确认&nbsp;&nbsp;&nbsp;',
				scope : this,
				id : 'confirmBtn',
				handler : this.addTroubleVerifyHandler
			}, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', {
				xtype : 'button',
				text : '&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;',
				scope : this,
				id : 'cancelBtn',
				handler : function() {
					this.close();
				}
			} ]
		});
		Jinpeng.troubleVerify.AddNewTroubleVerifyWindow.superclass.initComponent.apply(this);
	},
	addTroubleVerifyHandler : function(btn) {
		var formPanel = Ext.getCmp('troubleVerifyDetailForm');
		var deviceData = formPanel.getForm().getFieldValues();
		
		this.doAddTroubleVerify(deviceData, btn);
	},
	doAddTroubleVerify : function(deviceData, btn) {
		btn.disable();
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"id" : deviceData.id,
				"veriry" : "1"
			}),
			url : rootpath + '/device/addTroubleVerify.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == '1' || result == 1) {
					msg = "故障信息确认成功！";
					//troubleVerifyRecordGridPanel
					var grid = Ext.getCmp('troubleVerifyRecordGridPanel');
					if(grid){
						grid.publish("clearGridSelections",[]);
						grid.store.reload();
					}
					this.close();
				} else {
					msg = "故障信息确认失败";
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
		Ext.getCmp('troubleVerifyDetailForm').load({
			url : rootpath + '/device/initDeviceTroubleDetail.mvc?id=' + id,
			success : function(from, action) {
				var detailForm = Ext.getCmp('troubleVerifyDetailForm');
				var obj = Ext.util.JSON.decode(action.response.responseText);
				detailForm.form.findField('deviceName').setValue(obj.data[0].DEVICE_NAME);
				var troubleType = window.dictionary.getValue("FaultState",obj.data[0].GZZT1);
				detailForm.form.findField('troubleType').setValue(troubleType);
				var troubleTime = obj.data[0].GZSJ.split(" ")[0];
				detailForm.form.findField('troubleTime').setValue(troubleTime);
				detailForm.form.findField('troubleRemarck').setValue(obj.data[0].REMARCK);
				detailForm.form.findField('id').setValue(obj.data[0].ZTXH);
			},
			failure : function() {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '无法加载指定故障信息！';
				win.show();
			}
		});
		this.show();
	}
});
