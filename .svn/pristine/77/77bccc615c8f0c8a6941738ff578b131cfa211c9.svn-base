Ext.ns("Jinpeng.bayonet");

var config = {
	combURL : rootpath + '/dictionary/jsonDictsInCombo.mvc'
};

// 卡口信息弹出窗口
Jinpeng.bayonet.AddNewBayonetWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	layout : "fit",
	width : 980,
	title : "卡口信息",
	height : 520,
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
	
		//卡口类型
		Ext.onReady(function(){ 
		new Ext.ToolTip({ 
		        target: 'districtNo', 
		        html: '第一个框只能是6个数字', 
		        title: 'test', 
		        autoHide: false, 
		        closable: true, 
		        draggable:true 
		    }); 

		}); 
		var bayonetTypeStore = new Ext.data.JsonStore({
			root : 'data',
			fields : [ 'id', 'text' ],
			baseParams : {
				code : 'BAYONET_TYPE'
			},
			url : config.combURL
		});
		
		//卡口类型2
		var bayonetTypeTwoStore = new Ext.data.JsonStore({
			root : 'data',
			fields : [ 'id', 'text' ],
			baseParams : {
				code : 'BAYONET_TYPE_TWO'
			},
			url : config.combURL
		});
		
		//卡口性质
		var bayonetNatureStore = new Ext.data.JsonStore({
			root : 'data',
			fields : [ 'id', 'text' ],
			baseParams : {
				code : 'BAYONET_NATURE'
			},
			url : config.combURL
		});
		
		//卡口状态
		var bayonetStatusStore = new Ext.data.JsonStore({
			root : 'data',
			fields : [ 'id', 'text' ],
			baseParams : {
				code : 'BAYONET_STATUS'
			},
			url : config.combURL
		});
		
		//数据上传模式
		var dataModoStore = new Ext.data.JsonStore({
			root : 'data',
			fields : [ 'id', 'text' ],
			baseParams : {
				code : 'DATA_MODO'
			},
			url : config.combURL
		});
		
		//供应商
		var providerStore = new Ext.data.JsonStore({
			root : 'data',
			fields : [ 'id', 'text' ],
			baseParams : {
				code : 'DEVICE_MANUFAC'
			},
			url : deviceConfig.combURL
		});
		
		//所有部门
		var orgStore = new Ext.data.JsonStore({
			root : 'data',
			fields : [ 'id', 'text' ],
			url : rootpath + '/systemOrg/loadOllOrg.mvc'
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
				cls:'blue-button-ct',
				items : [ {
					xtype : 'form',
					labelWidth : 120,
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
								xtype : 'compositefield',
								msgTarget : 'side',
								fieldLabel : '卡口编号',
								anchor : '90%',
								items : [{
									flex : 0.2,
									xtype : 'label',
									text : '440',
									name : 'preKkbh',
									id : 'preKkbh'
								},{
									flex : 0.8,
									xtype : 'textfield',
									name : 'lastKkbh',
									id : "lastKkbh",
									maxLength : 15,
									minLength : 15,
									regex : /^(\d{15,15})$/,
									allowBlank : false,
									anchor : '30%',
									listeners: {  
						            render: function(c) {  
						              Ext.QuickTips.register({  
						                target: c.getEl(),  
						                text: '长度为15位数字'  
						              });  
						            }  
						          } 
								}]
							}, {
								xtype : 'tcombo',
								fieldLabel : '卡口类型',
								name : 'BAYONET_TYPE',
								id : 'BAYONET_TYPE',
								anchor : '90%',
								emptyText : '请选择...',
								editable : false,
								triggerAction : 'all',
								mode : "local",
								store : bayonetTypeStore,
								valueField : 'id',
								displayField : 'text'
							}, {
								xtype : 'tcombo',
								fieldLabel : '数据上传模式',
								name : 'SJSCMS',
								anchor : '90%',
								emptyText : '请选择...',
								editable : false,
								triggerAction : 'all',
								mode : "local",
								store : dataModoStore,
								valueField : 'id',
								displayField : 'text'
							}, {
								xtype : 'textfield',
								fieldLabel : '卡口经度',
								name : 'KKJD',
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '道路代码',
								name : 'DLDM',
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '道路名称',
								name : 'DLMC',
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '全国备案卡口编号',
								name : 'QGKDBH',
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'radiogroup',
								items : [ {
									boxLabel : '是',
									name : 'SFLJ',
									inputValue : 1
								}, {
									boxLabel : '否',
									name : 'SFLJ',
									checked : true,
									inputValue : 0
								} ],
								fieldLabel : '是否具备拦截',
								id : 'SFLJ_RESULT',
								anchor : '90%'
							}, {
								xtype : 'radiogroup',
								items : [ {
									boxLabel : '是',
									name : 'SFBJKK',
									inputValue : 1
								}, {
									boxLabel : '否',
									name : 'SFBJKK',
									checked : true,
									inputValue : 0
								} ],
								fieldLabel : '是否边界卡口',
								id : 'SFBJKK_RESULT',
								anchor : '90%'
							}, {
								xtype : 'radiogroup',
								items : [ {
									boxLabel : '是',
									name : 'SFKH',
									inputValue : 1
								}, {
									boxLabel : '否',
									checked : true,
									name : 'SFKH',
									inputValue : 0
								} ],
								fieldLabel : '是否纳入考核',
								id : 'SFKH_RESULT',
								anchor : '90%'
							}, {
								xtype : 'hidden',
								fieldLabel : '所属单位ID',
								name : 'DWBH',
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'hidden',
								fieldLabel : '所属单位名称',
								name : 'DWDM',
								maxLength : 25,
								anchor : '90%'
							}, {
								allowBlank : false,
								xtype : 'hidden',
								fieldLabel : '卡口编号',
							}]
						},{
							columnWidth : 0.33,
							layout : 'form',
							border : false,
							items : [{
								xtype : 'textfield',
								fieldLabel : '卡口名称',
								name : 'KKMC',
								allowBlank : false,
								blankText : '卡口名称不为空',
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'tcombo',
								fieldLabel : '卡口类型',
								name : 'KKLX2',
								anchor : '90%',
								emptyText : '请选择...',
								editable : false,
								triggerAction : 'all',
								mode : "local",
								store : bayonetTypeTwoStore,
								valueField : 'id',
								displayField : 'text'
							}, {
								xtype : 'tcombo',
								fieldLabel : '卡口性质',
								name : 'KKXZ',
								anchor : '90%',
								emptyText : '请选择...',
								editable : false,
								triggerAction : 'all',
								mode : "local",
								store : bayonetNatureStore,
								valueField : 'id',
								displayField : 'text'
							}, {
								xtype : 'textfield',
								fieldLabel : '卡口纬度',
								name : 'KKWD',
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'combo',
								fieldLabel : '卡口状态',
								name : 'KKZT',
								anchor : '90%',
								emptyText : '请选择...',
								editable : false,
								triggerAction : 'all',
								mode : "local",
								allowBlank : false,
								blankText : '请选择卡口状态',
								store : bayonetStatusStore,
								valueField : 'id',
								displayField : 'text'
							}, {
								xtype : 'textfield',
								fieldLabel : '卡口所在位置',
								name : 'KKWZ',
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '上传软件开发商',
								name : 'RJKFS',
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'radiogroup',
								items : [ {
									boxLabel : '是',
									name : 'SFTGTZCP',
									inputValue : 1
								}, {
									boxLabel : '否',
									name : 'SFTGTZCP',
									checked : true,
									inputValue : 0
								} ],
								fieldLabel : '是否提供特征车牌',
								id : 'SFTGTZCP_RESULT',
								anchor : '90%'
							}, {
								xtype : 'radiogroup',
								items : [ {
									boxLabel : '是',
									name : 'SFJBSPGN',
									inputValue : 1
								}, {
									boxLabel : '否',
									name : 'SFJBSPGN',
									checked : true,
									inputValue : 0
								} ],
								fieldLabel : '是否具备视频功能',
								id : 'SFJBSPGN_RESULT',
								anchor : '90%'
							}, {
								xtype : 'radiogroup',
								items : [ {
									boxLabel : '是',
									name : 'SFJGKK',
									inputValue : 1
								}, {
									boxLabel : '否',
									name : 'SFJGKK',
									checked : true,
									inputValue : 0
								} ],
								fieldLabel : '是否交管卡口',
								id : 'SFJGKK_RESULT',
								anchor : '90%'
							}]
						},{
							columnWidth : 0.34,
							layout : 'form',
							border : false,
							items : [{
								xtype : 'textfield',
								fieldLabel : '行政区划',
								name : 'XZQHMC',
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '联系电话',
								name : 'CONTACT_NUMBER',
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '公安编号',
								name : 'GABH',
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '路段类型',
								name : 'DLLX',
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'textfield',
								fieldLabel : '道路米数',
								name : 'DLMS',
								maxLength : 25,
								anchor : '90%'
							}, {
								xtype : 'combo',
								fieldLabel : '供应商',
								name : 'SBGYS',
								anchor : '90%',
								emptyText : '请选择...',
								editable : false,
								triggerAction : 'all',
								mode : "local",
								store : providerStore,
								valueField : 'id',
								displayField : 'text',
								anchor : '90%'
							}, {
								xtype : 'combo',
								fieldLabel : '所属部门',
								name : 'orgIds',
								id : 'orgIds',
								anchor : '90%',
								allowBlank : false,
								emptyText : '请选择...',
								editable : false,
								triggerAction : 'all',
								mode : "local",
								store : orgStore,
								valueField : 'id',
								displayField : 'text',
								anchor : '90%'
							}, {
								xtype:'panel',
								border:0,
								height:28
							}, {
								xtype : 'radiogroup',
								items : [ {
									boxLabel : '是',
									name : 'SFWFZP',
									inputValue : 1
								}, {
									boxLabel : '否',
									name : 'SFWFZP',
									checked : true,
									inputValue : 0
								} ],
								fieldLabel : '具备违法抓拍功能',
								id : 'SFWFZP_RESULT',
								anchor : '90%'
							}, {
								xtype : 'radiogroup',
								items : [ {
									boxLabel : '是',
									name : 'SFCS',
									inputValue : 1
								}, {
									boxLabel : '否',
									name : 'SFCS',
									checked : true,
									inputValue : 0
								} ],
								fieldLabel : '具备测速功能',
								id : 'SFCS_RESULT',
								anchor : '90%'
							}]
						} ]
					},{
						xtype : 'textarea',
						name : 'KKDZ',
						id : 'KKDZ',
						fieldLabel : '卡口地址',
						anchor : '95%',
						maxLength : 300,
						maxLengthText : '联系地址不能超过300个字符',
						height : 45
					},{
						xtype : 'textarea',
						name : 'CONTACT_ADDRESS',
						id : 'CONTACT_ADDRESS',
						fieldLabel : '联系地址',
						anchor : '95%',
						maxLength : 300,
						maxLengthText : '联系地址不能超过300个字符',
						height : 45
					},{
						xtype : 'textarea',
						name : 'REMARK',
						id : 'REMARK',
						fieldLabel : '备注',
						anchor : '95%',
						maxLength : 300,
						maxLengthText : '备注不能超过300个字符',
						height : 45
					} ]
				} ],
				bbar : {
					buttonAlign : 'center',
					buttons : [ {
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;',
						scope : this,
						id : 'confirmBtn',
						handler : this.addNewBayonetHandler
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
					//卡口类型1
					bayonetTypeStore.load();
					//卡口类型2
					bayonetTypeTwoStore.load();
					//卡口性质
					bayonetNatureStore.load();
					//卡口状态
					bayonetStatusStore.load();
					//数据上传模式
					dataModoStore.load();
					//供应商
					providerStore.load();
					//所有部门
					orgStore.load();
				}
			}
		});
		Jinpeng.bayonet.AddNewBayonetWindow.superclass.initComponent.apply(this);
	},
	afterRender : function(ct, position) {
		Jinpeng.bayonet.AddNewBayonetWindow.superclass.afterRender.apply(this, arguments);
		if (this.parentId) {
			setTimeout(function() {
				Ext.getCmp('orgIds').setValue(this.parentId);
			},500);
		}
	},
	addNewBayonetHandler : function(btn) {
		var formPanel = Ext.getCmp('bayonetDetailForm');

		if (formPanel.getForm().isValid()) {
			var bayonetData = formPanel.getForm().getFieldValues();

			var listChannelData = [];
			
			var actionFn = Ext.emptyFn;
			var lastKkbh = Ext.getCmp("lastKkbh").getValue();
			var kakouCode = '440' + lastKkbh;
			bayonetData.KKBH = kakouCode;
			if (this.addNewFlag) {
				actionFn = this.doAddBayonet.createDelegate(this, [bayonetData, listChannelData, btn]);
				this.saveOrUpdateWithCheckEncode(actionFn,bayonetData);
			} else {
				this.doModifyBayonet(bayonetData, listChannelData, btn);
			}
			
		}

	},
	doAddBayonet : function(bayonetData, channelData, btn) {
		btn.disable();
		var lastKkbh = Ext.getCmp("lastKkbh").getValue();
		var kakouCode = '440' + lastKkbh;
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"KKBH" : kakouCode,
				"BAYONET_TYPE" : bayonetData.BAYONET_TYPE,
				"SJSCMS" : bayonetData.SJSCMS,
				"KKJD" : bayonetData.KKJD,
				"DLDM" : bayonetData.DLDM,
				"DLMC" : bayonetData.DLMC,
				"QGKDBH" : bayonetData.QGKDBH,
				//"DWBH" : this.parentId,
				//"DWDM" : this.parentName,
				"DWBH" : bayonetData.orgIds,
				"KKMC" : bayonetData.KKMC,
				"KKLX2" : bayonetData.KKLX2,
				"KKXZ" : bayonetData.KKXZ,
				"KKWD" : bayonetData.KKWD,
				"KKZT" : bayonetData.KKZT,
				"KKWZ" : bayonetData.KKWZ,
				"RJKFS" : bayonetData.RJKFS,
				"XZQHMC" : bayonetData.XZQHMC,
				"CONTACT_NUMBER" : bayonetData.CONTACT_NUMBER,
				"GABH" : bayonetData.GABH,
				"DLLX" : bayonetData.DLLX,
				"DLMS" : bayonetData.DLMS,
				"SBGYS" : bayonetData.SBGYS,
				"KKDZ" : bayonetData.KKDZ,
				"CONTACT_ADDRESS" : bayonetData.CONTACT_ADDRESS,
				"REMARK" : bayonetData.REMARK,
				"SFLJ_RESULT" : Ext.getCmp('SFLJ_RESULT').getValue().getGroupValue(),
				"SFBJKK_RESULT" : Ext.getCmp('SFBJKK_RESULT').getValue().getGroupValue(),
				"SFKH_RESULT" : Ext.getCmp('SFKH_RESULT').getValue().getGroupValue(),
				"SFTGTZCP_RESULT" : Ext.getCmp('SFTGTZCP_RESULT').getValue().getGroupValue(),
				"SFJBSPGN_RESULT" : Ext.getCmp('SFJBSPGN_RESULT').getValue().getGroupValue(),
				"SFJGKK_RESULT" : Ext.getCmp('SFJGKK_RESULT').getValue().getGroupValue(),
				"SFWFZP_RESULT" : Ext.getCmp('SFWFZP_RESULT').getValue().getGroupValue(),
				"SFCS_RESULT" : Ext.getCmp('SFCS_RESULT').getValue().getGroupValue()
			}),
			url : rootpath + '/bayonet/addBayonet.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == '1' || result == 1) {
					msg = "卡口进入待新增状态,请先对其审核！";
					var grid = Ext.getCmp("deviceRecordGridPanel");
					var tree = Ext.getCmp("orgTreeWestPanel");
					if(grid){
						tree.refresh();
						grid.publish("clearGridSelections",[]);
						grid.store.reload();
					}
					//dispatchBayonetMessage(result);
					this.close();
				} else if (result == '-1' || result == -1) {
					msg = "卡口编码已经存在";
				} else {
					msg = "添加卡口失败";
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
	doModifyBayonet : function(bayonetData, channelData, btn) {
		btn.disable();
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"KKBH" : bayonetData.KKBH,
				"BAYONET_TYPE" : bayonetData.BAYONET_TYPE,
				"SJSCMS" : bayonetData.SJSCMS,
				"KKJD" : bayonetData.KKJD,
				"DLDM" : bayonetData.DLDM,
				"DLMC" : bayonetData.DLMC,
				"QGKDBH" : bayonetData.QGKDBH,
				//"DWBH" : this.parentId,
				//"DWDM" : this.parentName,
				"DWBH" : bayonetData.orgIds,
				"KKMC" : bayonetData.KKMC,
				"KKLX2" : bayonetData.KKLX2,
				"KKXZ" : bayonetData.KKXZ,
				"KKWD" : bayonetData.KKWD,
				"KKZT" : bayonetData.KKZT,
				"KKWZ" : bayonetData.KKWZ,
				"RJKFS" : bayonetData.RJKFS,
				"XZQHMC" : bayonetData.XZQHMC,
				"CONTACT_NUMBER" : bayonetData.CONTACT_NUMBER,
				"GABH" : bayonetData.GABH,
				"DLLX" : bayonetData.DLLX,
				"DLMS" : bayonetData.DLMS,
				"SBGYS" : bayonetData.SBGYS,
				"KKDZ" : bayonetData.KKDZ,
				"CONTACT_ADDRESS" : bayonetData.CONTACT_ADDRESS,
				"REMARK" : bayonetData.REMARK,
				"SFLJ_RESULT" : Ext.getCmp('SFLJ_RESULT').getValue().getGroupValue(),
				"SFBJKK_RESULT" : Ext.getCmp('SFBJKK_RESULT').getValue().getGroupValue(),
				"SFKH_RESULT" : Ext.getCmp('SFKH_RESULT').getValue().getGroupValue(),
				"SFTGTZCP_RESULT" : Ext.getCmp('SFTGTZCP_RESULT').getValue().getGroupValue(),
				"SFJBSPGN_RESULT" : Ext.getCmp('SFJBSPGN_RESULT').getValue().getGroupValue(),
				"SFJGKK_RESULT" : Ext.getCmp('SFJGKK_RESULT').getValue().getGroupValue(),
				"SFWFZP_RESULT" : Ext.getCmp('SFWFZP_RESULT').getValue().getGroupValue(),
				"SFCS_RESULT" : Ext.getCmp('SFCS_RESULT').getValue().getGroupValue(),
			}),
			url : rootpath + '/bayonet/updateBayonet.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == 1) {
					msg = "卡口进入待修改状态,请先对其审核！";
					var grid = Ext.getCmp("deviceRecordGridPanel");
					var tree = Ext.getCmp("orgTreeWestPanel");
					if(grid){
						tree.refresh();
						grid.publish("clearGridSelections",[]);
						grid.store.reload();
						
					}
					//dispatchBayonetMessage(result[1]);
					this.close();
				} else {
					msg = "更新卡口失败";
				}
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = msg;
				win.show();

				//var grid = Ext.getCmp('bayonetListGridPanel');
			},
			failure : function(response, options) {
				btn.enable();
			},
			scope : this
		});
	},
	loadRecordById : function(id) {
		Ext.getCmp('bayonetDetailForm').load({
			url : rootpath + '/bayonet/initBayonetDetail.mvc?KKBH=' + id,
			success : function(from, action) {
				var detailForm = Ext.getCmp('bayonetDetailForm');
				detailForm.updateFlag = true;
				var obj = Ext.util.JSON.decode(action.response.responseText);
				detailForm.form.findField('lastKkbh').setValue(obj.data[0].LAST_KKBH);
				detailForm.form.findField('SJSCMS').setValue(obj.data[0].SJSCMS);
				detailForm.form.findField('KKJD').setValue(obj.data[0].KKJD);
				detailForm.form.findField('DLDM').setValue(obj.data[0].DLDM);
				detailForm.form.findField('DLMC').setValue(obj.data[0].DLMC);
				detailForm.form.findField('QGKDBH').setValue(obj.data[0].QGKDBH);
				detailForm.form.findField('DWBH').setValue(obj.data[0].DWBH);
				detailForm.form.findField('DWDM').setValue(obj.data[0].DWDM);
				detailForm.form.findField('orgIds').setValue(obj.data[0].DWBH);
				detailForm.form.findField('KKMC').setValue(obj.data[0].KKMC);
				detailForm.form.findField('KKLX2').setValue(obj.data[0].KKLX2);
				detailForm.form.findField('KKXZ').setValue(obj.data[0].KKXZ);
				detailForm.form.findField('KKWD').setValue(obj.data[0].KKWD);
				detailForm.form.findField('KKZT').setValue(obj.data[0].KKZT);
				detailForm.form.findField('KKWZ').setValue(obj.data[0].KKWZ);
				detailForm.form.findField('RJKFS').setValue(obj.data[0].RJKFS);
				detailForm.form.findField('XZQHMC').setValue(obj.data[0].XZQHMC);
				detailForm.form.findField('CONTACT_NUMBER').setValue(obj.data[0].LXDH);
				detailForm.form.findField('GABH').setValue(obj.data[0].GABH);
				detailForm.form.findField('DLLX').setValue(obj.data[0].DLLX);
				detailForm.form.findField('DLMS').setValue(obj.data[0].DLMS);
				detailForm.form.findField('SBGYS').setValue(obj.data[0].SBGYS);
				detailForm.form.findField('KKDZ').setValue(obj.data[0].KKDZ);
				detailForm.form.findField('CONTACT_ADDRESS').setValue(obj.data[0].LXDZ);
				detailForm.form.findField('REMARK').setValue(obj.data[0].BZ);
				detailForm.form.findField('SFLJ_RESULT').setValue(obj.data[0].SFLJ);
				detailForm.form.findField('SFBJKK_RESULT').setValue(obj.data[0].SFBJKK);
				detailForm.form.findField('SFKH_RESULT').setValue(obj.data[0].SFKH);
				detailForm.form.findField('SFTGTZCP_RESULT').setValue(obj.data[0].SFTGTZCP);
				detailForm.form.findField('SFJBSPGN_RESULT').setValue(obj.data[0].SFJBSPGN);
				detailForm.form.findField('SFJGKK_RESULT').setValue(obj.data[0].SFJGKK);
				detailForm.form.findField('SFWFZP_RESULT').setValue(obj.data[0].SFWFZP);
				detailForm.form.findField('SFCS_RESULT').setValue(obj.data[0].SFCS);
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
			Ext.getCmp('bayonetDetailForm').form.findField('org.orgName').callback(orgInfo['id'], orgInfo['text'], orgInfo['coding'],orgInfo['longitude'],orgInfo['latitude']);
		}

		this.createUniqueBayonetNo();
		// 设置默认登录名和密码
		// Ext.getCmp('loginPassWD').setValue("admin");
		// Ext.getCmp('loginName').setValue("admin");
		var detailForm = Ext.getCmp('bayonetDetailForm');
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
			name : "relBayonet"
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
	createUniqueBayonetNo : function() {
		Ext.Ajax.request({
			url : rootpath + '/client/bayonet/getBayonetNo.action',
			success : function(response) {
				var result = Ext.decode(response.responseText);
				var form = Ext.getCmp('bayonetDetailForm').form;
				if (result) {
					if (result == "-999") {
						/*
						 * Ext.getCmp('bayonetDetailForm').form .findField('bayonetId').setReadOnly(false)
						 */
					} else {
						form.findField('bayonetId').setValue(result);
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
	saveOrUpdateWithCheckEncode :function(actionFn,bayonetData){
		var flag = this.isEncodeUnique(bayonetData);
		if(this.isEncodeUnique(bayonetData) == -1){
			Ext.Msg.confirm("提示", "卡口编号已经存在,请重新输入!" , function(id) {
				if ("yes" == id) {
					return false;
					//actionFn();
				}
			}, this);
		}else{
			actionFn();
		}
	},
	isEncodeUnique : function(bayonetData){
		var result = 0;
		Ext.Ajax.request({
			url : rootpath + '/bayonet/checkBayonet.mvc',
			async : false,
			params :{"KKBH" : bayonetData.KKBH},
			success : function(r,o) {
				var response = Ext.decode(r.responseText);
				result = response.data;
			},
			scope : this
		});
		return result;
	}
});
