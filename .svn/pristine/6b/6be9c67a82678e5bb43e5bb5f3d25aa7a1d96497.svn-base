Ext.ns("Jinpeng.check");
var config = {
	combURL : rootpath + '/dictionary/jsonDictsInCombo.mvc'
};
// 布控信息详细页面
Jinpeng.check.ControlRevokeDetailWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	layout : "fit",
	width : 680,
	height : 400,
	closeAction : "close",
	stateful : false,
	resizable : true,
	plain : true,
	modal : true,
	border : false,
	url : null,
	operPanel : null,
	disableBtn : false,
	controlID : null,
//	controlType : 1,// 默认是布控中
	initComponent : function() {
		Ext.apply(this, {
			items : [{
				xtype : 'panel',
				framse : true,
				border : false,
				labelAlign : 'right',
				bodyStyle : {
					"margin-top" : '5px'
				},
				items : [ {
					xtype : 'form',
					labelWidth : 100,
					id : 'controlRevokeDetailForm',
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
							},{
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
							},{
								xtype : 'displayfield',
								name : 'endDate',
								fieldLabel : '失效时间',
								format : 'Y-m-d H:i:s',
								anchor : '95%'
							}]
						},{ // 第二列
							columnWidth : 0.5,
							layout : 'form',
							border : false,
							defaults : {
								xtype : 'displayfield',
								anchor : '95%'
								},
							items : [ {
								fieldLabel : '&nbsp;联系人',
								name : 'linkMan',
								maxLength : 40
								},{
								fieldLabel : '&nbsp;联系电话',
								name : 'linkManPhone',
								maxLength : 30
								},{
								fieldLabel : '布控单位',
								name : 'orgName'
								},{
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
						xtype : 'textarea',
						name : 'suggestion',
						maxLength : 300,
						maxLengthText : '撤控原因不能超过300个字符',
						anchor : '97.5% 20%',
						disabled : this.disableBtn,
						fieldLabel : '&nbsp;&nbsp;撤控原因'
					}]
				}]
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
					var detailForm = Ext.getCmp('controlRevokeDetailForm');
					if (!detailForm.form.isValid())
						return;
					params['suggestion'] = detailForm.form.findField('suggestion').getValue();
					params['ids'] = this.controlID;
					params['carNums'] = detailForm.form.findField('carNum').getValue();

					var status = detailForm.form.findField('status').getValue();
					var approveLevel = detailForm.form.findField('approveLevel').getValue();
					var applyType = detailForm.form.findField('applyType').getValue();

					/* 手动提交表单 */
					Ext.Ajax.request({
						url : rootpath + '/controlManager/revokeControl.mvc',
						params : params,
						success : function(response, options) {

							json = response.responseText;
							var o = response.responseData || Ext.decode(json);
							var msg = "";
							if (o && o.data === 1) {
								msg = "撤控成功";
								var grid = Ext.getCmp('queryControlCarGridPanel');
								if(grid){
									grid.publish("clearGridSelections",[]);
									grid.store.reload();
								}
							} else {
								msg = "撤控失败,";
							}
							var win = new Jinpeng.widget.MessageWindow();
							win.msg = msg;
							win.show();
							try{
								with (Ext.getCmp('ControlInfoGridPanel')) {
									publish("clearGridSelections", []);
									store.reload();
								}
							}catch(e){}
							
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

	Jinpeng.check.ControlRevokeDetailWindow.superclass.initComponent.apply(this);
	},
	loadRecord : function(param,isID) {
		var url;
		var win = this;
		url = rootpath + '/controlManager/loadControlDetail.mvc?controlId=' + param;
		Ext.getCmp('controlRevokeDetailForm').load({
			url : url,
			success : function(p_form, p_action) {
				var obj = Ext.util.JSON.decode(p_action.response.responseText);
				var detailForm = Ext.getCmp('controlRevokeDetailForm');
				win.controlID = obj.data[0].BKXXBH;
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
				},
			failure:function(){
				}
			});
		this.show();
	}
});