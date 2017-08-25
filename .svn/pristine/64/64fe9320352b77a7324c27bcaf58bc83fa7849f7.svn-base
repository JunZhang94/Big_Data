Ext.ns("Jinpeng.control");
// 添加布控信息弹出窗口
var userPhone = '';
Jinpeng.control.ControlInputWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	layout : "fit",
	width : 750,
	height : 510,
	resizable : false,
	closeAction : "close",
	stateful:false,
	plain : true,
	modal : true,
	border : false,
	url : rootpath + '/controlManager/saveControl.mvc',
	applyType:null,
	updateFlag : false,
	initComponent : function() {
		var _window = this;
		var comboBoxTree = new Ext.ux.OrgComboBoxTree({
			fieldLabel : '布控单位',
			name : 'orgName',
			id:'orgName',
			allowBlank : false,
			emptyText : '请选择...',
			blankText : '请选择布控单位',
			anchor : '95%',
			editable : false,
			dataType : 'control',
			treeUrl : '',
			callback : function(id, text, coding) {
				Ext.getCmp('surveyCarDetailForm').form.findField('surveyOrgId').setValue(id);
			}
		});
		
		//布控等级
		var controlLevelStore = new Ext.data.JsonStore({
			url : rootpath + '/dictionary/jsonDictsInCombo.mvc',
			baseParams : {
				code : 'ControlLevel'
			},
			root : 'data',
			fields : [ 'id', 'text' ]
		});
		
		//布控类型
		var controlTypeStore = new Ext.data.JsonStore({
			url : rootpath + '/dictionary/jsonDictsInCombo.mvc',
			baseParams : {
				code : 'ControlType'
			},
			root : 'data',
			fields : [ 'id', 'text' ]
		});

		//车辆颜色
		var carColorStore =  new Ext.data.JsonStore({
			url : rootpath + '/dictionary/jsonDictsInCombo.mvc',
			baseParams : {
				code : 'CarColor'
			},
			root : 'data',
			fields : [ 'id', 'text' ]
		}); 
		
		//车辆类型
		var carTypeStore = new Ext.data.JsonStore({
			url : rootpath + '/dictionary/jsonDictsInCombo.mvc',
			baseParams : {
				code : 'CarType'
			},
			root : 'data',
			fields : [ 'id', 'text' ]
		});
		
		//报警等级
		var alertlevelStore = new Ext.data.JsonStore({
			url : rootpath + '/dictionary/jsonDictsInCombo.mvc',
			baseParams : {
				code : 'Alertlevel'
			},
			root : 'data',
			fields : [ 'id', 'text' ]
		});
		
		//车牌颜色
		var licPlateColorStore = new Ext.data.JsonStore({
			url : rootpath + '/dictionary/jsonDictsInCombo.mvc',
			baseParams : {
				code : 'LicPlateColor'
			},
			root : 'data',
			fields : [ 'id', 'text' ]
		});
		
		//号牌种类
		var licPlateTypeStore =  new Ext.data.JsonStore({
			url : rootpath + '/dictionary/jsonDictsInCombo.mvc',
			baseParams : {
				code : 'LicPlateType'
			},
			root : 'data',
			fields : [ 'id', 'text' ]
		});
		
		//布控性质
		var controlPropertyStore = new Ext.data.JsonStore({
			url : rootpath + '/dictionary/jsonDictsInCombo.mvc',
			baseParams : {
				code : 'ControlProperty'
			},
			root : 'data',
			fields : [ 'id', 'text' ]
		});
		
		//车辆品牌
		var carBrandStore = new Ext.data.JsonStore({
			url : rootpath
					+ "/dictionary/jsonCarBrandInCombo.mvc",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false           
		});
		
		Ext.apply(this, {
			items : [ {
				xtype : 'panel',
				framse : true,
				autoScroll : true,
				labelAlign : 'right',
				bodyStyle : {
					"margin-top" : '5px'
				},
				items : [ {
					xtype : 'form',
					labelWidth : 100,
					id : 'surveyCarDetailForm',
					defaults : {
						margins : '5 2 5 2'
					},
					items : [ {
						layout : 'column',
						border : false,
						items : [ {
							xtype : 'fieldset',
							title : '车辆信息',
							layout : "table",
							cls : 'window-margin-left',
							bodyStyle : 'padding-top : 5px;',
							id : 'c1',
							defaults : {
								width : 350,
								layout : 'form'
							},
							layoutConfig : {
								columns : 2
							},
							items : [ {
								items : [ {
									xtype : 'textfield',
									id : 'carNum',
									fieldLabel : '&nbsp;车牌号码',
									name : 'carNum',
									allowBlank : false,
									blankText : "请输入车牌号码",
									vtype : 'controlCarNum',
									anchor : '95%'
								}]
							},{
								items : [ {
									xtype : 'combo',
									fieldLabel : '&nbsp;车牌颜色',
									allowBlank : false,
									blankText : '请选择车牌颜色',
									editable : false,
									mode : 'local',
									name : 'carLicenseType',
									emptyText : '请选择...',
									valueField : 'id',
									triggerAction : 'all',
									displayField : 'text',
									store : licPlateColorStore,
									anchor : '95%'
								}]
							},{
								items : [ {
									xtype : 'combo',
									fieldLabel : '&nbsp;号牌种类',
									allowBlank : false,
									blankText : '号牌种类不为空',
									editable : false,
									mode : 'local',
									name : 'carNumberType',
									emptyText : '请选择...',
									valueField : 'id',
									triggerAction : 'all',
									displayField : 'text',
									store : licPlateTypeStore,
									anchor : '95%'
								}]
							}, {
								items : [ {
									xtype : 'combo',
									fieldLabel : '&nbsp;车身颜色',
									editable : false,
									mode : 'local',
									name : 'carColor',
									valueField : 'id',
									displayField : 'text',
									emptyText : '请选择...',
									triggerAction : 'all',
									allowBlank : false,
									blankText : '请选择车身颜色',
									store : carColorStore,
									anchor : '95%'
								}]
							}, {
								items : [ {
									xtype : 'tcombo',
									fieldLabel : '&nbsp;车辆类型',
									name : 'carType',
									allowBlank : false,
									blankText : '请选择车辆类型',
									anchor : '95%',
									mode : 'local',
									editable : false,
									selectOnFocus : true,
									forceSelection : true,
									triggerAction : 'all',
									valueField : 'id',
									displayField : 'text',
									emptyText : '请选择...',
									store : carTypeStore
								}]
							}, {
								items : [ {
									xtype : 'tcombo',
									fieldLabel : '&nbsp;报警等级',
									editable : false,
									mode : 'local',
									name : 'alarmLevel',
									id : 'alarmLevel',
									valueField : 'id',
									displayField : 'text',
									emptyText : '请选择...',
									triggerAction : 'all',
									allowBlank : false,
									blankText : '请选择报警等级',
									store : alertlevelStore,
									anchor : '95%'
								}]
							},{
								items: [ {
						        	xtype : 'tcombo',
									id : 'carBrandWin',
									name:'carBrandWin',
									fieldLabel: '车辆品牌',
									store: carBrandStore,
									emptyText:'请选择车辆品牌',
									editable : false,
									selectOnFocus : true,
									forceSelection : true,
									displayField : 'text',
									valueField:'id',
									anchor : '95%',
									mode : 'local',
									triggerAction : 'all',
									listeners : {
									     select : function(combo, record2, index) {
											var carTypeMode = new Ext.data.JsonStore({
												url : encodeURI(rootpath+"/dictionary/jsonCarTypeInCombo.mvc?carBrand="+record2.data['text']),
												root : "data",
												fields : [ 'id', 'text' ],
												autoLoad:false,
												autoSync:true
											});
											carTypeMode.load({
											    scope: this,
												    callback: function(records, operation, success) {
												        var listRecord = new Array();
														if(carTypeMode instanceof Ext.data.Store){  
															carTypeMode.each(function(result){  
													        	listRecord.push(result.data['text']);  
													        }); 
														 }
														Ext.getCmp('brandTypeWin').clearValue();
														Ext.getCmp('carYearWin').clearValue();
														Ext.getCmp('brandTypeWin').getStore().loadData(listRecord);
												    }
											});

									     }
									}
						        }]
							}, {
								items: [ {
						        	xtype : 'tcombo',
									id : 'brandTypeWin',
									name:'brandTypeWin',
									fieldLabel: '型号',
									emptyText:'请选择车辆型号',
									editable : false,
									selectOnFocus : true,
									forceSelection : true,
									store: [],
									anchor : '95%',
									displayField : 'text',
									valueField:'id',
									mode : 'local',
									triggerAction : 'all',
									listeners : {
									     select : function(combo, record, index) {
											var carYearStore = new Ext.data.JsonStore({
												url : encodeURI(rootpath+"/dictionary/jsonCarYearInCombo.mvc?carType="+combo.value+"&carBrand="+Ext.getCmp('carBrandWin').value),
												root : "data",
												fields : [ 'id', 'text' ],
												autoLoad:false,
												autoSync:true
											});
											carYearStore.load({
											    scope: this,
												    callback: function(records, operation, success) {
												        var yearRecord = new Array();
														if(carYearStore instanceof Ext.data.Store){  
															carYearStore.each(function(result){  
													        	yearRecord.push(result.data['text']);  
													        }); 
														 }
														Ext.getCmp('carYearWin').clearValue();
														Ext.getCmp('carYearWin').getStore().loadData(yearRecord);
												    }
											});
											
									     }
									}
						        }]
							}, {
								items: [ {
						        	xtype : 'tcombo',
									id : 'carYearWin',
									name:'carYearWin',
									fieldLabel: '年款',
									anchor : '95%',
									editable : false,
									selectOnFocus : true,
									forceSelection : true,
									emptyText:'请选择车辆年款',
									store: [],
									displayField : 'text',
									valueField:'id',
									mode : 'local',
									triggerAction : 'all'
						        }]
							}, {
								items : [ {
									xtype : 'textfield',
									fieldLabel : '&nbsp;联系人',
									name : 'linkMan',
									maxLength : 10,
									anchor : '95%'
								}]
							}, {
								items : [ {
									xtype : 'textfield',
									fieldLabel : '&nbsp;联系电话',
									name : 'linkManPhone',
									maxLength : 20,
									regex:/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})))$/,
									regexText:'输入正确的联系电话',
									anchor : '95%'
								}]
							}, {
								items : [ {
									xtype : 'textfield',
									fieldLabel : '&nbsp;车辆外形',
									name : 'attribution',
									maxLength : 7,
									anchor : '95%'
								}]
							},{
								items : [ {
									xtype : 'hidden',
									name : 'id'
								}]
							}, {
								items : [ {
									xtype : 'hidden',
									name : 'surveyOrgId'
								}]
							}, {
								items : [ {
									xtype : 'hidden',
									name : 'status',
									value : 0
								}]
							}]
						}, {
							xtype : 'fieldset',
							title : '布控信息',
							layout : "table",
							cls : 'window-margin-left',
							bodyStyle : 'padding-top : 5px;',
							id : 'c2',
							defaults : {
								width : 350,
								layout : 'form'
							},
							layoutConfig : {
								columns : 2
							},
							items : [ {
								items : [ {
									xtype : 'tcombo',
									fieldLabel : '&nbsp;布控等级',
									name : 'surLevel',
									blankText : '请选择布控等级',
									anchor : '95%',
									mode : 'local',
									editable : false,
									selectOnFocus : true,
									allowBlank : false,
									blankText :　'请选择布控等级',
									forceSelection : true,
									triggerAction : 'all',
									valueField : 'id',
									displayField : 'text',
									emptyText : '请选择...',
									store : controlLevelStore
								}]
							}, {
								items : [ {
									xtype : 'tcombo',
									fieldLabel : '&nbsp;布控类型',
									name : 'surType',
									//id : 'surType',
									blankText : '请选择布控类型',
									anchor : '95%',
									mode : 'local',
									editable : false,
									selectOnFocus : true,
									allowBlank : false,
									forceSelection : true,
									triggerAction : 'all',
									valueField : 'id',
									displayField : 'text',
									emptyText : '请选择...',
									store : controlTypeStore
								}]
							}, {
								items : [ {
									xtype : 'combo',
									fieldLabel : '&nbsp;布控性质',
									editable : false,
									mode : 'local',
									name : 'controlNature',
									emptyText : '请选择...',
									valueField : 'id',
									triggerAction : 'all',
									displayField : 'text',
									store : controlPropertyStore,
									anchor : '95%'
								}]
							}, {
								items : [ comboBoxTree ]
							}, {
								items : [ {
//									xtype : 'datetimefield',
//									name : 'startDate',
//									fieldLabel : '布控时间',
//									value : new Date(),
//									format : 'Y-m-d H:i:s',
//									editable : false,
//									anchor : '95%'
									
									xtype : 'textfield',
									name : 'startDate',
									id : 'bDate',
								    fieldLabel : '布控时间',
								    width:145,
								    allowBlank : false,
								    blankText :　'布控时间不为空',
								    editable : false,
									value : new Date().format('Y-m-d') + ' 00:00:00',
									anchor : '95%',
									style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center;padding-top:5px;'}, 
									listeners  : {   
						            	'focus':function(field){  
											var endTime = Ext.util.Format.date(
													new Date(), 'Y-m-d H:i:s');
											var endDate = Ext.getCmp("lDate").getValue();
											//  日期时间的默认参数      
										    var defaultDateTimeParams = new function()   
										    {   
										        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
										        this.startDate  = endTime;    //  开始时间   
										        this.maxDate  = endDate;
										        this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';  //  格式化时间   
										        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
										        this.alwaysUseStartDate = false;           //  默认使用初始时间   
										    };  
						                    WdatePicker(defaultDateTimeParams);   
						                    field.blur();
						             	}   
									} 
								}]
							}, {
								items : [ {
//									xtype : 'datetimefield',
//									name : 'endDate',
//									fieldLabel : '失效时间',
//									value : new Date().add(Date.MONTH, 1),
//									minValue : new Date(),
//									format : 'Y-m-d H:i:s',
//									editable : false,
//									anchor : '95%'
									
									xtype : 'textfield',
									fieldLabel : '失效时间',
									allowBlank : false,
									blankText :　'失效时间不为空',
				                    editable : false,
									id : 'lDate',
									name : 'endDate',
									value : new Date().add(Date.MONTH, 1).format('Y-m-d') + ' 23:59:59',
									anchor : '95%',
									style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
									listeners  : {   
						            	'focus':function(field){  
											var endTime = Ext.util.Format.date(
													new Date(), 'Y-m-d H:i:s');
											var startdate = Ext.getCmp("bDate").getValue();
											//  日期时间的默认参数      
										    var defaultDateTimeParams = new function()   
										    {   
										        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
										        this.startDate  = endTime;    //  开始时间  
										        this.minDate = startdate;
										        this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';  //  格式化时间   
										        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
										        this.alwaysUseStartDate = false;           //  默认使用初始时间   
										    };  
						                    WdatePicker(defaultDateTimeParams);   
						                    field.blur();
						             	}   
									}
											
								}]
							}, {
								items : [ {
									xtype : 'textfield',
									fieldLabel : '&nbsp;撤控人',
									name : 'revokeMan',
									id : 'revokeMan',
									maxLength : 10,
									hidden : true,
									disabled : true,
									anchor : '95%'
								}]
							}, {
								items : [ {
									xtype : 'textfield',
									fieldLabel : '&nbsp;撤控单位',
									name : 'revokeOrg',
									id : 'revokeOrg',
									hidden : true,
									disabled : true,
									maxLength : 10,
									anchor : '95%'
								}]
							}, {
								items : [ {
									xtype : 'datetimefield',
									name : 'revokeEndDate',
									id : 'revokeEndDate',
									fieldLabel : '撤控时间',
									value : new Date().add(Date.MONTH, 1),
									minValue : new Date(),
									format : 'Y-m-d H:i:s',
									disabled : true,
									editable : false,
									hidden : true,
									anchor : '95%'
								}]
							}, {
								items : [ {
									xtype : 'radiogroup',
									name : 'applyType',
									disabled : true,
									hidden : true,
									fieldLabel : '申请类别',
									items: [{boxLabel: '本级布控', name: 'applyTypeItem', inputValue: Jinpeng.control.ControlApplyType.NORMAL}],
									anchor : '95%'
								}]
							}, {
								items : [ {
									xtype : 'hidden',
									name : 'isDelete'
								}]
							}]
						}, {
							xtype : 'fieldset',
							title : '信息描述',
							layout : "table",
							cls : 'window-margin-left',
							bodyStyle : 'padding-top : 5px;',
							id : 'c3',
							defaults : {
								width : 350,
								layout : 'form'
							},
							layoutConfig : {
								columns : 2
							},
							items : [ {
								items : [ {
									xtype : 'textarea',
									name : 'describer',
									id : 'describer',
									fieldLabel : '&nbsp;&nbsp;简要案情',
									anchor : '95%',
									maxLength : 300,
									maxLengthText : '简要案情不能超过300个字符',
									height : 70
								}]
							}, {
								items : [ {
									xtype : 'textarea',
									name : 'surveyVerifyMsg',
									id : 'surveyVerifyMsg',
									hidden : true,
									disabled : true,
									fieldLabel : '&nbsp;&nbsp;布控审核结果',
									anchor : '95%',
									height : 70
								}]
							}, {
								items : [ {
									xtype : 'textarea',
									name : 'ckyy',
									id : 'ckyy',
									hidden : true,
									disabled : true,
									fieldLabel : '&nbsp;&nbsp;撤控原因',
									anchor : '95%',
									height : 70
								}]
							}, {
								items : [ {
									xtype : 'textarea',
									name : 'revokeVerifyMsg',
									id : 'revokeVerifyMsg',
									hidden : true,
									disabled : true,
									fieldLabel : '&nbsp;&nbsp;撤控审核结果',
									anchor : '95%',
									height : 70
								}]
							}, { 
								items : [ {
									// 存储图片路径
									xtype : "hidden",
									name : 'imgUrl',
									id : 'imgUrl'
								}]
							}]
						}]
					} ]
				} ]
			} ],
			bbar : {
				cls : 'blue-button-ct',
				buttonAlign : 'center',
				buttons : [ {
					xtype : 'button',
					text : '继续添加',
					id : 'continueBtn',
					scope : this,
					hidden : this.updateFlag,
					handler : this.addNewControlHandler
				}, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', {
					xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;',
					scope : this,
					id : 'confirmBtn',
					handler : this.addNewControlHandler
				}, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', {
					xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;',
					scope : this,
					id : 'cancelBtn',
					handler : function() {
						this.close();
					}
				} ]
			},
			listeners : {
				afterrender : function() {
					controlLevelStore.load();
					controlTypeStore.load();
					carColorStore.load();
					carTypeStore.load();
					alertlevelStore.load();
					licPlateColorStore.load();
					licPlateTypeStore.load();
					controlPropertyStore.load();
					carBrandStore.load();
				}
			}
		});

		Jinpeng.control.ControlInputWindow.superclass.initComponent.apply(this);

	},
	addNewControlHandler : function(btn, e) {
		var formPanel = Ext.getCmp('surveyCarDetailForm');
		var currentWin = this;
		var actionFn = this.saveOrUpdateControl.createDelegate(this,[btn, e]);
		var form = formPanel.getForm();
		var id = form.findField("id").getValue() ;
		var carNumber = form.findField("carNum").getValue();
		//var carNum = carNum;
		if (form.isValid()) {
			if (this.updateFlag) {
				// 如果是更新，则提示用户
//				Ext.MessageBox.confirm("确认", "您是否要修改该布控信息？", function(v) {
//					if ("yes" == v) {
						currentWin.saveOrUpdateWithCheckCarNum(actionFn,carNumber,id);
//					}
//				});
			} else {
				this.saveOrUpdateWithCheckCarNum(actionFn,carNumber,id);
			}
		}
	},
	saveOrUpdateControl : function(btn, e) {
		var formPanel = Ext.getCmp('surveyCarDetailForm');
		var controlCarData = formPanel.getForm().getFieldValues();
		controlCarData.startDate = Ext.util.Format.date(controlCarData.startDate, 'Y-m-d H:i:s');
		controlCarData.endDate = Ext.util.Format.date(controlCarData.endDate, 'Y-m-d H:i:s');
		delete controlCarData.surveyVerifyMsg;
		delete controlCarData.ckyy;
		var carNum = formPanel.getForm().findField("carNum").getValue();
		//var carNum = carNum;
		btn.disable();
		Ext.Ajax.request({
			method : "POST",
			params : {
				"id" : controlCarData.id,
				"carNum" : carNum,
				"surLevel" : controlCarData.surLevel,
				"surType" : controlCarData.surType,
				"carColor" : controlCarData.carColor,
				"carType" : controlCarData.carType,
				"alarmLevel" : controlCarData.alarmLevel,
				//"clpp" : controlCarData.clpp,
				"startDate" : Ext.getCmp("bDate").getValue(),//controlCarData.startDate,
				"endDate" : Ext.getCmp("lDate").getValue(),//controlCarData.endDate,
				"carLicenseType" : controlCarData.carLicenseType,
				"carNumberType" : controlCarData.carNumberType,
				"attribution" : controlCarData.attribution,
				"linkMan" : controlCarData.linkMan,
				"linkManPhone" : controlCarData.linkManPhone,
				"orgName" : controlCarData.orgName,
				//"surveyOrgId" : controlCarData.surveyOrgId,
				"describer" : controlCarData.describer,
				"controlNature" : controlCarData.controlNature,
				"carBrandWin" : controlCarData.carBrandWin,
				"brandTypeWin" : controlCarData.brandTypeWin,
				"carYearWin" : controlCarData.carYearWin
			},
			url : this.url,
			success : function(response, options) {
				btn.enable();
				var grid = Ext.getCmp('queryControlCarGridPanel');
				if(grid){
					grid.publish("clearGridSelections",[]);
					grid.store.reload();
				}
				
				if (btn.id == "continueBtn") {

					var win = new Jinpeng.control.HistoryCarDetailWindow();
					win.show();
					this.resetForm();
					Ext.getDom("carImg").src = "";

				} else {
					this.close();
					var win = new Jinpeng.control.HistoryCarDetailWindow();
					win.show();
				}
			},
			failure : function(response, options) {
				btn.enable();
			},
			scope : this
		});
	},
	resetForm : function() {
		Ext.getCmp('surveyCarDetailForm').form.reset();
		if(this.applyType == Jinpeng.control.ControlApplyType.RAPID){
			this.loadEmptyRapidControl();
		}else if(this.applyType == Jinpeng.control.ControlApplyType.CASCADE){
			this.loadEmptyCascadeControl();
		}else if(this.applyType == Jinpeng.control.ControlApplyType.NORMAL){
			this.loadLocalEmptyControl();
		}
		this.setDefaultValues();
	},
	loadRecordById : function(id) {
		var win = this;
		Ext.getCmp('surveyCarDetailForm').load({
			url : rootpath + '/controlManager/loadControlDetail.mvc?controlId=' + id,
			success : function(from, action) {
				var detailForm = Ext.getCmp('surveyCarDetailForm');
				var obj = Ext.util.JSON.decode(action.response.responseText);
				var carNum = obj.data[0].HPHM;
				detailForm.form.findField('carNum').setValue(carNum);
				detailForm.form.findField('id').setValue(obj.data[0].BKXXBH);
				detailForm.form.findField('surLevel').setValue(obj.data[0].BKJB);
				detailForm.form.findField('surType').setValue(obj.data[0].BKLB);
				detailForm.form.findField('carColor').setValue(obj.data[0].CSYS);
				detailForm.form.findField('carType').setValue(obj.data[0].CLLX);
				detailForm.form.findField('alarmLevel').setValue(obj.data[0].BJDJ);
				detailForm.form.findField('clpp').setValue(obj.data[0].CLPP);
				var startDate = obj.data[0].BKSK.split(".")[0];
				var endDate = obj.data[0].BKLEN.split(".")[0];
				detailForm.form.findField('startDate').setValue(startDate);
				detailForm.form.findField('endDate').setValue(endDate);
				detailForm.form.findField('carLicenseType').setValue(obj.data[0].HPYS);
				detailForm.form.findField('carNumberType').setValue(obj.data[0].HPZL);
				detailForm.form.findField('controlNature').setValue(obj.data[0].BKSZ);
				detailForm.form.findField('attribution').setValue(obj.data[0].CLWX);
				detailForm.form.findField('linkMan').setValue(obj.data[0].CZ);
				detailForm.form.findField('linkManPhone').setValue(obj.data[0].LXDH);
				detailForm.form.findField('orgName').setValue(obj.data[0].BKDW);
				detailForm.form.findField('describer').setValue(obj.data[0].AJMS);
				if ((obj.data[0].SHZT == Jinpeng.control.status.VEFIFY_UNPASSED || obj.data[0].SHZT == Jinpeng.control.status.VEFIFY_PASSED)) {
					win.showControlVerifyMsgField(obj.data[0]);
				}
				if (obj.data[0].SHZT == Jinpeng.control.status.REVOKED) {
					win.showRevokeReasonField(obj.data[0]);
				}
				if (obj.data[0].SHZT == Jinpeng.control.status.REVOKED_VEFIFY_PASSED || obj.data[0].SHZT == Jinpeng.control.status.REVOKE_VEFIFY_UNVERIFIED) {
					win.showRevokeVerifyField(obj.data[0]);
				}
				if(!(obj.data[0].SHZT == Jinpeng.control.status.UNVERIFIED)){
					detailForm.form.findField('carNum').setDisabled("true");
					detailForm.form.findField('surLevel').setDisabled("true");
					detailForm.form.findField('surType').setDisabled("true");
					detailForm.form.findField('carColor').setDisabled("true");
					detailForm.form.findField('carType').setDisabled("true");
					detailForm.form.findField('alarmLevel').setDisabled("true");
					detailForm.form.findField('clpp').setDisabled("true");
					detailForm.form.findField('startDate').setDisabled("true");
					detailForm.form.findField('endDate').setDisabled("true");
					detailForm.form.findField('carLicenseType').setDisabled("true");
					detailForm.form.findField('carNumberType').setDisabled("true");
					detailForm.form.findField('controlNature').setDisabled("true");
					detailForm.form.findField('attribution').setDisabled("true");
					detailForm.form.findField('linkMan').setDisabled("true");
					detailForm.form.findField('linkManPhone').setDisabled("true");
					detailForm.form.findField('orgName').setDisabled("true");
					detailForm.form.findField('describer').setDisabled("true");
					Ext.getCmp('confirmBtn').setVisible(false);
					Ext.getCmp("cancelBtn").setText("&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;");
				}
			
			},
			failure : function() {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '无法加载指定布控信息！';
				win.show();
			}
		});

		this.show();
	},
	uploadImgHandler : function() {

		new Jinpeng.widget.GeneralWindow({
			title : '请选择上传文件',
			layout : 'border',
			width : 350,
			height : 100,
			modal : true,
			items : {
				itemId : 'uploadImgForm',
				xtype : 'form',
				region : 'center',
				fileUpload : true,
				border : false,
				labelWidth : 65,
				labelAlign : 'right',
				padding : 5,
				items : [ {
					fieldLabel : '上传文件',
					xtype : 'fileuploadfield',
					name : 'image',
					anchor : '-30',
					emptyText : '请选择一个图像文件',
					validate : function() {
						var vFlag = false;
						var filePath = this.getValue();
						if (null != filePath && "" != filePath) {
							var surfix = filePath.substring(filePath.lastIndexOf("."));
							if ([ ".jpg", ".bmp", ".gif", ".png" ].indexOf(surfix.toLowerCase()) != -1) {
								vFlag = true;
							}
						}
						vFlag ? this.clearInvalid() : this.markInvalid();
						return vFlag;
					},
					invalidText : '请选择一个图像文件,类型为.jpg,.bmp,.gif,.png',
					buttonText : '选择文件'
				} ]
			},
			buttons : [ {
				text : '确定',
				handler : function(btn, event) {
					var window = btn.ownerCt.ownerCt;
					var form = window.getComponent('uploadImgForm').getForm();
					// debugger
					if (form.isValid()) {
						form.submit({
							url : rootpath + "/client/check/uploadControlImg.action",
							success : function(form, action) {
								var filaPath = action.result.data;
								if (filaPath) {
									Ext.getDom("carImg").src = rootpath + "/" + filaPath;
									Ext.getCmp("imgUrl").setValue(filaPath);
									window.close();
								}
							}
						});
					}
				}
			}, {
				text : '取消',
				handler : function(btn, even) {
					btn.ownerCt.ownerCt.close();
				}
			} ]
		}).show();
	},
	// 对comb加载
	loadEmptyRecord : function(carInfo) {
		var detailForm = Ext.getCmp('surveyCarDetailForm');
		Ext.each(detailForm.findByType("combo"), function(item, index, allItems) {
			if (item.name != "orgName" && item.name != 'brandTypeWin' && item.name != 'carYearWin') {
				item.store.load({
					callback : function() {
						if (item.name == 'surLevel') {
							item.setValue(1);
						}
						if (item.name == 'surType') {
							item.setValue(4);
						}
						/*if(item.name == 'carLicenseType'){
							item.setValue();
						}*/
						if(item.name == 'carNumberType'){
							item.setValue(2);
						}
						if(item.name == 'alarmLevel'){
							item.setValue(2);
						}
						if(item.name == 'brandTypeWin'){
							alert('111');
						}
						if(item.name == 'carYearWin'){
							alert('234');
						}
						if(carInfo&&(typeof carInfo[item.name])!='undefined'){
							item.setValue(carInfo[item.name]);
						}
					}
				});
			}
		});
		this.setDefaultValues();
	},
	loadByCarInfo : function(carInfo){
		this.defaultValues = [{key:'applyType',value:Jinpeng.control.ControlApplyType.NORMAL,disabled:false},{key:'carNum',value:carInfo.carNum,disabled:false}];
		
		if(!getDomainFlag()){
			Ext.getCmp('surveyCarDetailForm').form.findField("applyType").show();
		}
		
		Ext.getCmp('continueBtn').hide();
		carInfo.carLicenseType = carInfo.plateType;
		
		if(null != carInfo.imgUrl && carInfo.imgUrl.indexOf("http://") == 0){
			Ext.defer( function(){
				Ext.getDom("carImg").src =  Util.processEmptyImgUrl(carInfo.imgUrl);
				Ext.getCmp("imgUrl").setValue(carInfo.imgUrl);
			}, 500 ) ;
			
		}
		
		this.loadEmptyRecord(carInfo);
	},	
	setCarNum : function(carInfo) {
		Ext.getCmp('carNum').setValue(carInfo);
	},
	loadEmptyRapidControl : function(){
		this.applyType = Jinpeng.control.ControlApplyType.RAPID;
		this.defaultValues = [{key:'applyType',value:Jinpeng.control.ControlApplyType.RAPID,disabled:true},{key:'surLevel',value:1,disabled:true},
		                      {key:'surType',value:10,disabled:true},{key:'endDate',value:new Date().add(Date.DAY,3),disabled:true}];
		this.loadEmptyRecord({'surLevel':1,'surType':10});// 1 拦截类 10 临时布控
	},
	loadEmptyCascadeControl : function(){
		this.applyType = Jinpeng.control.ControlApplyType.CASCADE;
		this.defaultValues = [{key:'applyType',value:Jinpeng.control.ControlApplyType.CASCADE,disabled:true}];
		this.loadEmptyRecord();
	},
	loadLocalEmptyControl : function(){
		this.applyType = Jinpeng.control.ControlApplyType.NORMAL;
		this.defaultValues = [{key:'applyType',value:Jinpeng.control.ControlApplyType.NORMAL,disabled:true}];
		this.loadEmptyRecord();
	},
	showControlVerifyMsgField : function(data) {
		Ext.getCmp('describer').setHeight(65);
		Ext.getCmp('surveyVerifyMsg').setValue(data.VERIFY_CONTENT);
		Ext.getCmp('surveyVerifyMsg').setVisible(true);
	},
	showRevokeReasonField : function(data) {
		Ext.getCmp('describer').setHeight(65);
		Ext.getCmp('surveyVerifyMsg').setValue(data.VERIFY_CONTENT);
		Ext.getCmp('surveyVerifyMsg').setVisible(true);
		Ext.getCmp('ckyy').setValue(data.CKYY);
		Ext.getCmp('ckyy').setVisible(true);
	},
	showRevokeVerifyField : function(data) {
		Ext.getCmp('describer').setHeight(65);
		Ext.getCmp('ckyy').setValue(data.CKYY);
		Ext.getCmp('ckyy').setVisible(true);
		Ext.getCmp('surveyVerifyMsg').setValue(data.VERIFY_CONTENT);
		Ext.getCmp('surveyVerifyMsg').setVisible(true);
		Ext.getCmp('revokeVerifyMsg').setValue(data.REVOKE_VERIFY_CONTENT);
		Ext.getCmp('revokeVerifyMsg').setVisible(true);
		Ext.getCmp('revokeOrg').setValue(data.ORGNAME);
		Ext.getCmp('revokeOrg').setVisible(true);
		Ext.getCmp('revokeMan').setValue(data.CKR);
		Ext.getCmp('revokeMan').setVisible(true);
		var revokeEndDate = data.CKSJ.split(".")[0];
		Ext.getCmp('revokeEndDate').setValue(revokeEndDate);
		Ext.getCmp('revokeEndDate').setVisible(true);
		
	},
	setDefaultValues:function(){
		var detailForm = Ext.getCmp('surveyCarDetailForm');
		Ext.each(this.defaultValues,function(item,index,all){
			var field = detailForm.form.findField(item.key);
			if(field){
				field.setValue(item.value);
				field.setDisabled(item.disabled===true);
			}
		},this);
	},
	saveOrUpdateWithCheckCarNum :function(actionFn,carNum,id){
		
		if('-1' === this.isCarNumExists(carNum,id)){
			Ext.Msg.confirm("提示", "该车牌号码已经布控，确认重复布控？" , function(id) {
				if ("yes" == id) {
					actionFn();
				}
			}, this);
		}else{
			actionFn();
		}
	},
	isCarNumExists: function(carNum,id){
		var result = true;
		Ext.Ajax.request({
			url : rootpath + '/controlManager/checkCarNum.mvc',
			async : false,
			params :{"carNum" : carNum,"controId" : id},
			success : function(r,o) {
				var response = Ext.decode(r.responseText);
				result = response.data[0];
			},
			scope : this
		});
		return result;
	}
});

Jinpeng.control.HistoryCarDetailWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
	width : 300,
	height : 105,
	closeAction : "close",
	title : '提示',
	border : false,
	clickFlag : false,
	loadId : '',
	recode : null,
	initComponent : function() {
		Ext.apply(this, {
			items : [ {
				xtype : 'form',
				region : 'center',
				items : [
				{
					columnWidth : 105,
					layout : 'form',
					region : 'center',
					items : [{xtype : 'fieldset',
							layoutConfig : {
								columns : 1
							},
							items : [{
								region : 'center',
								items : [ {
									region : 'center',
									xtype : 'displayfield',
									fieldLabel : '',
									id:'sss',
									name : 'sss',
									anchor : '96%',
									cls:'qwqqq'
								} ]
							}]
						}]
				} ]
			} ],
				buttonAlign : 'center',
				buttons : [{
          	  		xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;',
					scope : this,
					handler : this.close
				} ]
		});
		Jinpeng.control.HistoryCarDetailWindow .superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Jinpeng.control.HistoryCarDetailWindow .superclass.afterRender.call(this);
		//根据点击记录时设置的记录ID加载数据
		this.loadRecordById(this.msg);
	}
	,
	loadRecordById : function(msg) {
		var record = {};
		msg = '布控操作成功';
		Ext.getCmp("sss").setValue(msg);
	}
	
});