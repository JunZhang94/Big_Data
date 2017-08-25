Ext.ns("Jinpeng.bayoneVerify");

// 车辆详细信息弹出窗口
Jinpeng.bayoneVerify.AddNewBayoneVerifyWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	layout : "fit",
	width : 650,
	title : "审核窗口",
	height : 300,
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
				cls:'blue-button-ct',
				items : [ {
					xtype : 'form',
					labelWidth : 120,
					id : 'bayoneVerifyWithDetailForm',
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
								fieldLabel : '卡口编号',
								name : 'bayoneNumber',
								id : "bayoneNumber",
								anchor : '94%'
							}, {
								xtype : 'displayfield',
								fieldLabel : '经度',
								name : 'longitude',
								id : "longitude",
								anchor : '94%'
							}, {
								xtype : 'displayfield',
								fieldLabel : '卡口状态',
								name : 'bayoneStatus',
								id : "bayoneStatus",
								anchor : '94%'
							}]
						}, {
							columnWidth : 0.5,
							layout : 'form',
							border : false,
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '卡口名称',
								name : 'bayoneName',
								id : "bayoneName",
								anchor : '94%'
							},{
								xtype : 'displayfield',
								fieldLabel : '纬度',
								name : 'latitude',
								id : "latitude",
								anchor : '94%'
							}, {
								xtype : 'hidden',
								fieldLabel : '操作类型',
								name : 'optionType',
								id : "optionType"
							}]
						} ]
					}, {
						xtype : 'displayfield',
						fieldLabel : '备注',
						name : 'remarck',
						anchor : '97.5%',
					}, {
						xtype : 'compositefield',
						fieldLabel : '*',
						labelStyle : 'color:red',
						labelSeparator : "",
						blankText : "请选择同意或不同意",
						anchor : '-30',
						msgTarget : "side",
						defaults : {
							height : '20'
						},
						validateValue : function(value, preventMark) {
							var valid = false;
							this.eachItem(function(field) {
								// 只要有一个选中即可
								if (field.getValue())
									valid = true;
							});
							if (!valid)
								this.markInvalid(this.blankText);
							return valid;
						},
						items : [ {
							boxLabel : '同意',
							xtype : 'radio',
							inputValue : '1',
							checked : true,
							name : 'verifyFlag'
						}, {
							boxLabel : '不同意',
							inputValue : '0',
							xtype : 'radio',
							name : 'verifyFlag'
						} ]
					}, {
						xtype : 'textarea',
						fieldLabel : '审核意见',
						name : 'verifyDesc',
						anchor : '97.5%',
						maxLength : 500,
						maxLengthText : '审核描述不能超过500个字符'
					}  ]
				} ],
				bbar : {
					buttonAlign : 'center',
					buttons : [ {
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;确认&nbsp;&nbsp;&nbsp;',
						scope : this,
						id : 'confirmBtn',
						handler : this.addBayoneVerifyHandler
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
			} ],
		});
		Jinpeng.bayoneVerify.AddNewBayoneVerifyWindow.superclass.initComponent.apply(this);
	},
	addBayoneVerifyHandler : function(btn) {
		var formPanel = Ext.getCmp('bayoneVerifyWithDetailForm');
		var bayoneData = formPanel.getForm().getFieldValues();
		
		this.doUpdateBayoneVerify(bayoneData, btn);
	},
	doUpdateBayoneVerify : function(bayoneData, btn) {
		btn.disable();
		var detailForm = Ext.getCmp('bayoneVerifyWithDetailForm');
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"id" : bayoneData.bayoneNumber,
				"verifyFlag" : detailForm.form.findField('verifyFlag').getValue() ? 1 : 0,
				"verifyDesc" : bayoneData.verifyDesc,
				"optionType" : detailForm.form.findField('optionType').getValue(),
			}),
			url : rootpath + '/bayonet/updateBayoneVerify.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == '1' || result == 1) {
					msg = "卡口信息审核成功！";
					var grid = Ext.getCmp('bayoneVerifyRecordGridPanel');
					if(grid){
						grid.publish("clearGridSelections",[]);
						grid.store.reload();
					}
					this.close();
				} else {
					msg = "卡口信息审核失败";
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
	loadRecordById : function(id, optionType) {
		Ext.getCmp('bayoneVerifyWithDetailForm').load({
			url : rootpath + '/bayonet/initBayoneVerifyDetail.mvc?id=' + id,
			success : function(from, action) {
				var detailForm = Ext.getCmp('bayoneVerifyWithDetailForm');
				var obj = Ext.util.JSON.decode(action.response.responseText);
				detailForm.form.findField('bayoneNumber').setValue(obj.data[0].KKBH);
				detailForm.form.findField('bayoneName').setValue(obj.data[0].KKMC);
				//卡口状态
				var bayoneStatus = window.dictionary.getValue("BAYONET_STATUS",obj.data[0].KKZT);
				detailForm.form.findField('bayoneStatus').setValue(bayoneStatus);
				detailForm.form.findField('longitude').setValue(obj.data[0].KKJD);
				detailForm.form.findField('latitude').setValue(obj.data[0].KKWD);
				detailForm.form.findField('remarck').setValue(obj.data[0].BZ);
				detailForm.form.findField('optionType').setValue(optionType);
			},
			failure : function() {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '无法加载指定的卡口信息！';
				win.show();
			}
		});
		this.show();
	}
});
