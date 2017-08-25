Ext.ns("Jinpeng.bayonet");
var config = {
	combURL : rootpath + '/dictionary/jsonDictsInCombo.mvc'
};
//卡口详细信息
Jinpeng.bayonet.BayonetDetailWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	layout : "fit",
	width : 800,
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
				id : 'bayonetDetailForm',
				defaults : {
					margins : '5 2 5 2'
				},
				items : [ {
					layout : 'column',
					border : false,
					items : [ {
						columnWidth : 0.33,
						layout : 'form',
						border : false,
						items : [ {
							xtype : 'displayfield',
							fieldLabel : '卡口编号',
							name : 'KKBH',
							anchor : '95%'
						}, {
							xtype : 'displayfield',
							fieldLabel : '卡口类型1',
							name : 'KKLX',
							anchor : '95%'
						}, {
							xtype : 'displayfield',
							fieldLabel : '数据上传模式',
							name : 'SJSCMS',
							anchor : '95%'
						}, {
							xtype : 'displayfield',
							fieldLabel : '卡口经度',
							name : 'KKJD',
							anchor : '95%'
						}, {
							xtype : 'displayfield',
							fieldLabel : '道路代码',
							name : 'DLDM',
							anchor : '95%'
						}, {
							xtype : 'displayfield',
							fieldLabel : '道路名称',
							name : 'DLMC',
							anchor : '95%'
						}, {
							xtype : 'displayfield',
							fieldLabel : '全国备案卡口编号',
							name : 'QGKDBH',
							anchor : '95%'
						}, {
							xtype : 'displayfield',
							name : 'SFLJ',
							fieldLabel : '是否具备拦截',
							anchor : '95%'
						},{
							xtype : 'displayfield',
							name : 'SFBJKK',
							fieldLabel : '是否边界卡口',
							anchor : '95%',
						}, {
							xtype : 'displayfield',
							fieldLabel : '是否纳入考核',
							name : 'SFKH',
							anchor : '95%'
						} ]
					}, {
						// 第二列
						columnWidth : 0.33,
						layout : 'form',
						border : false,
						defaults : {
							xtype : 'displayfield',
							anchor : '95%'
						},
						items : [ {
							xtype : 'displayfield',
							fieldLabel : '卡口名称',
							name : 'KKMC',
							anchor : '95%'
						}, {
							xtype : 'displayfield',
							fieldLabel : '卡口类型2',
							name : 'KKLX2',
							anchor : '95%'
						}, {
							xtype : 'displayfield',
							fieldLabel : '卡口性质',
							name : 'KKXZ',
							anchor : '95%'
						}, {
							xtype : 'displayfield',
							fieldLabel : '卡口纬度',
							name : 'KKWD',
							maxLength : 40
						}, {
							xtype : 'displayfield',
							fieldLabel : '卡口状态',
							name : 'KKZT',
							anchor : '95%'
						}, {
							xtype : 'displayfield',
							fieldLabel : '卡口所在位置',
							name : 'KKWZ',
							anchor : '95%'
						}, {
							xtype : 'displayfield',
							fieldLabel : '上传软件开发商',
							name : 'RJKFS',
							anchor : '95%'
						}, {
							xtype : 'displayfield',
							name : 'SFTGTZCP',
							fieldLabel : '是否提供特征车牌',
							anchor : '95%'
						}, {
							xtype : 'displayfield',
							name : 'SFJBSPGN',
							fieldLabel : '是否具备视频功能',
							anchor : '95%'
						}, {
							xtype : 'displayfield',
							name : 'SFJGKK',
							fieldLabel : '是否交管卡口',
							anchor : '95%'
						} ]
					}, {
						 // 第三列
						columnWidth : 0.34,
						layout : 'form',
						border : false,
						defaults : {
							xtype : 'displayfield',
							anchor : '95%'
						},
						items : [ {
							xtype : 'displayfield',
							fieldLabel : '单位名称',
							name : 'DWDM',
							anchor : '95%'
						}, {
							xtype : 'displayfield',
							fieldLabel : '行政区划',
							name : 'XZQHMC',
							anchor : '95%'
						}, {
							xtype : 'displayfield',
							fieldLabel : '联系电话',
							name : 'LXDH',
							anchor : '95%'
						}, {
							xtype : 'displayfield',
							fieldLabel : '公安编号',
							name : 'GABH',
							anchor : '95%'
						}, {
							xtype : 'displayfield',
							fieldLabel : '路段类型',
							name : 'DLLX',
							maxLength : 40
						}, {
							xtype : 'displayfield',
							fieldLabel : '道路米数',
							name : 'DLMS',
							anchor : '95%'
						}, {
							xtype : 'displayfield',
							fieldLabel : '供应商',
							name : 'SBGYS',
							anchor : '95%'
						}, {
							xtype : 'displayfield',
							name : 'SFWFZP',
							fieldLabel : '具备违法抓拍功能',
							anchor : '95%'
						}, {
							xtype : 'displayfield',
							name : 'SFCS',
							fieldLabel : '具备测速功能',
							anchor : '95%'
						} ]
					}]
				}, {
					xtype : 'displayfield',
					name : 'KKDZ',
					anchor : '97.5%',
					fieldLabel : '卡口地址'
				}, {
					xtype : 'displayfield',
					name : 'LXDZ',
					anchor : '97.5%',
					fieldLabel : '联系地址'
				}, {
					xtype : 'displayfield',
					name : 'BZ',
					anchor : '97.5%',
					fieldLabel : '备注'
				} ]
			} ]
		} ],
		bbar : {
			cls : 'blue-button-ct',
			buttonAlign : 'center',
			buttons : [ {
				xtype : 'button',
				text : '&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;',
				scope : this,
				id : 'cancelBtn',
				handler : function() {
					this.close();
				}
			} ]
		}
	});
	Jinpeng.bayonet.BayonetDetailWindow.superclass.initComponent.apply(this);
	},
	loadRecordById : function(id) {
		var win = this;
		Ext.getCmp('bayonetDetailForm').load({
			url : rootpath + '/bayonet/initBayonetDetail.mvc?KKBH=' + id,
			success : function(from, action) {
				var detailForm = Ext.getCmp('bayonetDetailForm');
				detailForm.updateFlag = true;
				var obj = Ext.util.JSON.decode(action.response.responseText);
				detailForm.form.findField('KKBH').setValue(obj.data[0].KKBH);
				detailForm.form.findField('KKLX').setValue(window.dictionary.getValue("BAYONET_TYPE",obj.data[0].KKLX));
				detailForm.form.findField('SJSCMS').setValue(window.dictionary.getValue("DATA_MODO",obj.data[0].SJSCMS));
				detailForm.form.findField('KKJD').setValue(obj.data[0].KKJD);
				detailForm.form.findField('DLDM').setValue(obj.data[0].DLDM);
				detailForm.form.findField('DLMC').setValue(obj.data[0].DLMC);
				detailForm.form.findField('QGKDBH').setValue(obj.data[0].QGKDBH);
				//detailForm.form.findField('DWBH').setValue(obj.data[0].DWBH);
				detailForm.form.findField('DWDM').setValue(obj.data[0].DWMC);
				detailForm.form.findField('KKMC').setValue(obj.data[0].KKMC);
				detailForm.form.findField('KKLX2').setValue(window.dictionary.getValue("BAYONET_TYPE_TWO",obj.data[0].KKLX2));
				detailForm.form.findField('KKXZ').setValue(window.dictionary.getValue("BAYONET_NATURE",obj.data[0].KKXZ));
				detailForm.form.findField('KKWD').setValue(obj.data[0].KKWD);
				detailForm.form.findField('KKZT').setValue(window.dictionary.getValue("BAYONET_STATUS",obj.data[0].KKZT));
				detailForm.form.findField('KKWZ').setValue(obj.data[0].KKWZ);
				detailForm.form.findField('RJKFS').setValue(obj.data[0].RJKFS);
				detailForm.form.findField('XZQHMC').setValue(obj.data[0].XZQHMC);
				detailForm.form.findField('LXDH').setValue(obj.data[0].LXDH);
				detailForm.form.findField('GABH').setValue(obj.data[0].GABH);
				detailForm.form.findField('DLLX').setValue(obj.data[0].DLLX);
				detailForm.form.findField('DLMS').setValue(obj.data[0].DLMS);
				detailForm.form.findField('SBGYS').setValue(obj.data[0].SBGYS);
				detailForm.form.findField('KKDZ').setValue(obj.data[0].KKDZ);
				detailForm.form.findField('LXDZ').setValue(obj.data[0].LXDZ);
				detailForm.form.findField('BZ').setValue(obj.data[0].BZ);
				detailForm.form.findField('SFLJ').setValue(obj.data[0].SFLJ == 1 ? '是' : '否');
				detailForm.form.findField('SFBJKK').setValue(obj.data[0].SFBJKK == 1 ? '是' : '否');
				detailForm.form.findField('SFKH').setValue(obj.data[0].SFKH == 1 ? '是' : '否');
				detailForm.form.findField('SFTGTZCP').setValue(obj.data[0].SFTGTZCP == 1 ? '是' : '否');
				detailForm.form.findField('SFJBSPGN').setValue(obj.data[0].SFJBSPGN == 1 ? '是' : '否');
				detailForm.form.findField('SFJGKK').setValue(obj.data[0].SFJGKK == 1 ? '是' : '否');
				detailForm.form.findField('SFWFZP').setValue(obj.data[0].SFWFZP == 1 ? '是' : '否');
				detailForm.form.findField('SFCS').setValue(obj.data[0].SFCS == 1 ? '是' : '否');
			}
		});
		this.show();
	},
	showRevokeReasonField : function() {
		Ext.getCmp('describer').setHeight(65);
		Ext.getCmp('ckyy').setVisible(true);
	},
});