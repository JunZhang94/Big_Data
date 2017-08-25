Ext.ns("Jinpeng.controlRevokeVerify");
var config = {
	combURL : rootpath + '/dictionary/jsonDictsInCombo.mvc'
};
// 布控信息详细页面
Jinpeng.controlRevokeVerify.ControlRevokeVerifyDetailWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	layout : "fit",
	width : 680,
	height : 460,
	closeAction : "close",
	resizable : true,
	stateful : false,
	plain : true,
	modal : true,
	border : false,
	url : null,
	operPanel : null,
	disableBtn : true,
	ControlID : null,
	initComponent : function() {
		Ext.apply(this, {
			items : [ {
				xtype : 'panel',
				framse : true,
				border : false,
				bodyStyle : {
					"margin-top" : '5px'
				},
				labelAlign : 'right',
				items : [ {
					xtype : 'form',
					labelWidth : 100,
					// title : '布控信息',
					id : 'ControlRevokeVerifyDetailForm',
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
								fieldLabel : '车牌号码',
								msgTarget : 'side',
								xtype : 'displayfield',
								name : 'carNum',
								id : 'carNum',
								anchor : '95%'
									
//							}, {
//								xtype : 'displayfield',
//								fieldLabel : '布控等级',
//								name : 'surLevel',
//								anchor : '95%'
							}, {
								xtype : 'displayfield',
								fieldLabel : '&nbsp;车辆品牌',
								name : 'clpp',
								maxLength : 25,
								anchor : '95%'
							},{
								xtype : 'displayfield',
								fieldLabel : '车辆类别',
								name : 'carCategory',
								anchor : '95%'
							},{
								xtype : 'displayfield',
								fieldLabel : '&nbsp;布控类型',
								name : 'surType',
								anchor : '95%'
//							}, {
//								xtype : 'displayfield',
//								fieldLabel : '车身颜色',
//								name : 'carColor',
//								anchor : '95%'
//							}, {
//								xtype : 'displayfield',
//								fieldLabel : '&nbsp;车辆类型',
//								name : 'carType',
//								anchor : '95%'
//							}, {
//								xtype : 'displayfield',
//								fieldLabel : '&nbsp;报警等级',
//								name : 'alarmLevel',
//								anchor : '95%'
//							}, {
//								xtype : 'displayfield',
//								fieldLabel : '&nbsp;车辆品牌',
//								name : 'clpp',
//								maxLength : 25,
//								anchor : '95%'
							}, {
								xtype : 'displayfield',
								name : 'endDate',
								fieldLabel : '失效时间',
								format : 'Y-m-d H:i:s',
								anchor : '95%'
							},{
								xtype : 'displayfield',
								name : 'ckyy',
								id : 'ckyy',
								fieldLabel : '&nbsp;&nbsp;撤控原因',
								anchor : '95%',
								height : 65
							} ]
						}, { // 第二列
							columnWidth : 0.5,
							layout : 'form',
							border : false,
							defaults : {
								xtype : 'displayfield',
								anchor : '95%'
							},
							items : [ {
//								xtype : 'displayfield',
//								fieldLabel : '&nbsp;车牌颜色',
//								name : 'carLicenseType',
//								anchor : '95%'
//							}, {
//								xtype : 'displayfield',
//								fieldLabel : '&nbsp;号牌种类',
//								name : 'carNumberType',
//								maxLength : 25
//							}, {
//								xtype : 'displayfield',
//								fieldLabel : '&nbsp;布控性质',
//								name : 'controlNature',
//								maxLength : 25
//							}, {
//								fieldLabel : '&nbsp;车辆外形',
//								name : 'attribution',
//								maxLength : 40
//							}, {
								fieldLabel : '&nbsp;联系人',
								name : 'linkMan',
								maxLength : 40
							}, {
								fieldLabel : '&nbsp;联系电话',
								name : 'linkManPhone',
								maxLength : 30
							}, {
								fieldLabel : '布控单位',
								name : 'orgName'
							}, {
								fieldLabel : '布控范围',
								name : 'passStation'
							},{
								xtype : 'displayfield',
								name : 'describer',
								id : 'describer',
								fieldLabel : '&nbsp;&nbsp;简要案情',
								height : 65
							}, {
								xtype : 'hidden',
								name : 'approveLevel'
							}, {
								xtype : 'hidden',
								name : 'status'
							}, {
								xtype : 'hidden',
								name : 'applyType'
							} ]
						} ]
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
							name : 'revokeVerifyResult'
						}, {
							boxLabel : '不同意',
							inputValue : '0',
							xtype : 'radio',
							name : 'revokeVerifyResult'
						} ]
					}, {
						xtype : 'textarea',
						name : 'suggestion',
						disabled : this.disableBtn,
						maxLength : 300,
						maxLengthText : '审核意见不能超过300个字符',
						anchor : '97.5% 18%',
						fieldLabel : '&nbsp;&nbsp;审核意见'
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
				disabled : this.disableBtn,
				handler : function() {

					var params = {};
					var detailForm = Ext.getCmp('ControlRevokeVerifyDetailForm');
					params['suggestion'] = detailForm.form.findField('suggestion').getValue();
					params['revokeVerifyResult'] = detailForm.form.findField('revokeVerifyResult').getValue() ? 1 : 0;
					params['ids'] = this.ControlID;
					params['carNums'] = detailForm.form.findField('carNum').getValue();

					var status = detailForm.form.findField('status').getValue();
					var approveLevel = detailForm.form.findField('approveLevel').getValue();
					var applyType = detailForm.form.findField('applyType').getValue();

					if (!detailForm.form.isValid())
						return;
					/* 手动提交表单 */
					Ext.Ajax.request({
						url : rootpath + '/controlManager/revokeVerifyControl.mvc',
						params : params,
						success : function(response, options) {
							json = response.responseText;
							var o = response.responseData || Ext.decode(json);
							var msg = "";
							if (o && o.data === 1) {
								var grid = Ext.getCmp('queryControlCarGridPanel');
								if(grid){
									grid.publish("clearGridSelections",[]);
									grid.store.reload();
								}
								msg = "审核成功";
							} else {
								msg = "审核失败";
							}
							var win = new Jinpeng.widget.MessageWindow();
							win.msg = msg;
							win.show();
							with(Ext.getCmp('ControlInfoGridPanel')) {
								publish("clearGridSelections", []);
								store.reload();
							}
						}
					});
					this.close();
				}
			},  {
			  		  xtype : 'tbspacer',
			  		  width : 10
			  },{
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

		Jinpeng.controlRevokeVerify.ControlRevokeVerifyDetailWindow.superclass.initComponent.apply(this);
	},
	loadRecordById : function(id) {
		var win = this;
		Ext.getCmp('ControlRevokeVerifyDetailForm').load({
			url : rootpath + '/controlManager/loadControlDetail.mvc?controlId=' + id,
			success : function(p_form, p_action) {
				var obj = Ext.util.JSON.decode(p_action.response.responseText);
				var detailForm = Ext.getCmp('ControlRevokeVerifyDetailForm');
				
				if (obj.data.status == Jinpeng.control.status.REVOKE_UNVERIFIED) {
					win.showRevokeReasonField();
				}
				//detailForm.form.findField('ControlOrgName').setValue(obj.data.ControlOrgName);
//				detailForm.form.findField('carNum').setValue(obj.data[0].HPHM);
//				detailForm.form.findField('surLevel').setValue(window.dictionary.getValue("ControlLevel", obj.data[0].BKJB));
//				detailForm.form.findField('surType').setValue(window.dictionary.getValue("ControlType", obj.data[0].BKLB));
//				detailForm.form.findField('carColor').setValue(window.dictionary.getValue("CarColor", obj.data[0].CSYS));
//				detailForm.form.findField('carType').setValue(window.dictionary.getValue("CarType", obj.data[0].CLLX));
//				detailForm.form.findField('alarmLevel').setValue(window.dictionary.getValue("Alertlevel", obj.data[0].BJDJ));
//				detailForm.form.findField('clpp').setValue(window.dictionary.getValue("CarBrand", obj.data[0].CLPP));
//				var endDate = obj.data[0].BKLEN.split(".")[0];
//				detailForm.form.findField('endDate').setValue(endDate);
//				detailForm.form.findField('carLicenseType').setValue(window.dictionary.getValue("LicPlateColor", obj.data[0].HPYS));
//				detailForm.form.findField('carNumberType').setValue(window.dictionary.getValue("LicPlateType", obj.data[0].HPZL));
//				detailForm.form.findField('controlNature').setValue(window.dictionary.getValue("ControlProperty", obj.data[0].BKSZ));
//				detailForm.form.findField('attribution').setValue(obj.data[0].CLWX);
//				detailForm.form.findField('linkMan').setValue(obj.data[0].CZ);
//				detailForm.form.findField('linkManPhone').setValue(obj.data[0].LXDH);
//				detailForm.form.findField('orgName').setValue(obj.data[0].BKDW);
//				detailForm.form.findField('describer').setValue(obj.data[0].AJMS);
//				detailForm.form.findField('ckyy').setValue(obj.data[0].CKYY);
				
				detailForm.form.findField('carNum').setValue(obj.data[0].HPHM);
				detailForm.form.findField('surType').setValue(window.dictionary.getValue("ControlType", obj.data[0].BKLX));
				detailForm.form.findField('clpp').setValue(obj.data[0].CLPP);
				detailForm.form.findField('carCategory').setValue(obj.data[0].CATEGORY);
				var endDate = obj.data[0].BKLEN.split(".")[0];
				detailForm.form.findField('endDate').setValue(endDate);
				detailForm.form.findField('linkMan').setValue(obj.data[0].CZ);
				detailForm.form.findField('linkManPhone').setValue(obj.data[0].LXDH);
				detailForm.form.findField('orgName').setValue(obj.data[0].BKDW);
				var bkfwdec = obj.data[0].BKFWDEC.replace(/,/g,'\n');
				detailForm.form.findField('passStation').setValue(bkfwdec);
				detailForm.form.findField('describer').setValue(obj.data[0].AJMS);
				detailForm.form.findField('ckyy').setValue(obj.data[0].CKYY);
				
			}
		});
		this.show();
	},
	showRevokeReasonField : function() {
		Ext.getCmp('describer').setHeight(65);
		Ext.getCmp('ckyy').setVisible(true);
	},
});