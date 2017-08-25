Ext.ns("Jinpeng.hotRecode");

var hhwin = Ext.getBody().getHeight();
var wwwin = Ext.getBody().getWidth();
var treeUrlWin = '/Big_Data/zTree/demo/cn/excheck/multiSelectTreeHot.html';
//多卡口选择树
var kwindown =new Jinpeng.widget.GeneralWindow({
	id: "mywindown",
	title: "",
	constrain : true,
	constrainHeader : true,
	width: wwwin * 2 / 3,
	height: hhwin * 3 / 4,
	layout: "fit",
	//autoShow: true,
	closeAction:'hide',
	html:'<iframe id="ifrmwin" scrolling="auto" frameborder="0" width="100%" height="100%" src="' + treeUrlWin + '"></iframe>'
});
var setKKValueWin=function(data){
	Ext.getCmp('kkmcs').setValue(data.text);
	Ext.getCmp('kkbhs').setValue(data.id);
	Ext.getCmp('mywindown').hide();
};
var cancelKKWin=function(data){
	Ext.getCmp('kkmcs').setValue("");
	Ext.getCmp('kkbhs').setValue("");
	Ext.getCmp('mywindown').hide();
};

// 车辆详细信息弹出窗口
Jinpeng.hotRecode.AddNewHotRecodeWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	layout : "fit",
	width : 650,
	title : "红名单窗口",
	height : 230,
	stateful : false,
	closeAction : "close",
	stateful : false,
	plain : true,
	modal : true,
	border : false,
	addNewFlag : false,
	initComponent : function() {
		var _panel = this;
		//车牌号
		var carNumStore = new Ext.data.JsonStore({
			url : rootpath
					+ "/dictionary/HPHMDictsInComboHPHM.mvc?code=LicPlate",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false
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
				items : [ {
					xtype : 'form',
					labelWidth : 120,
					id : 'hotRecodeDetailForm',
					cls : 'blue-button-ct',
					defaults : {
						margins : '5 2 5 2'
					},
					items : [ {
						layout : 'column',
						border : false,
						items : [{
							columnWidth : 0.5,
							layout : 'form',
							border : false,
							items : [ {
								xtype : 'combo',
								id : 'hphm',
								name:'hphm',
								fieldLabel : '车牌号码',
								allowBlank : false,
								editable : true,
								width:155,
								store : carNumStore,
								mode : 'local',
								emptyText : '全部',
								triggerAction : 'all',
								valueField : 'id',
								displayField : 'text',
								vtype:'carNumUpper',
								anchor : '95%',
								listeners : {
									select : function () {
											Ext.getCmp("carNum").focus(false, 100);   
										}
									}
							}, {
								xtype : 'textfield',
								fieldLabel : '结束时间',
								allowBlank : false,
								blankText :　'结束时间不为空',
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
							columnWidth : 0.5,
							layout : 'form',
							border : false,
							items : [ {
								xtype : 'textfield',
								name : 'startDate',
								id : 'bDate',
							    fieldLabel : '开始时间',
							    width:145,
							    allowBlank : false,
							    blankText :　'开始时间不为空',
							    editable : false,
								value : new Date().format('Y-m-d') + ' 00:00:00',
								anchor : '94%',
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
							}, {
								xtype : 'hidden',
								id : 'id'
							}]
						} ]
					}, {
						xtype : 'compositefield',
						anchor : '98%',
						items : [ {
							flex : 0.8,
							fieldLabel : '卡口',
							xtype : 'tooltiptextfield',
							name : 'kkmcs',
							id : 'kkmcs',
							width : 400,
							emptyText : '请选择卡口'
						}, {
							flex : 0.2,
							owner : this,
							labelAlign : 'right',
							xtype : 'button',
							text : '选择卡口',
							id:'choosekkBtn',
							handler : function(){
								_panel.showWin();
							}
						} ]
					}, {
						xtype : 'textarea',
						fieldLabel : '描述',
						name : 'remarck',
						maxLength : 25,
						anchor : '97.5%',
						maxLength : 500,
						maxLengthText : '描述不能超过500个字符'
					}, {
						xtype : 'hidden',
						id : 'kkbhs'
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
					handler : this.addHotRecodeHandler
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
					/*车牌省Store*/
					carNumStore.load();
				}
			}
		});
		Jinpeng.hotRecode.AddNewHotRecodeWindow.superclass.initComponent.apply(this);
	},
	showWin : function() {
		kwindown.show();
	},
	addHotRecodeHandler : function(btn) {
		var formPanel = Ext.getCmp('hotRecodeDetailForm');
		if (formPanel.getForm().isValid()) {
			var hotData = formPanel.getForm().getFieldValues();
			var listChannelData = [];
			var actionFn = Ext.emptyFn;
			if (this.addNewFlag) {
				actionFn = this.doAddHotRecode.createDelegate(this, [hotData, listChannelData, btn]);
				this.saveOrUpdateWithCheckEncode(actionFn,hotData);
			} else {
				this.doModifyHotRecode(hotData, listChannelData, btn);
			}
		}

	},
	doAddHotRecode : function(hotData, channelData, btn) {
		btn.disable();
		//var date = Ext.util.Format.date(hotData.troubleTime, 'Y-m-d');
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"carNum" : hotData.hphm,
				"kkbhs" : hotData.kkbhs,
				"startTime" : hotData.startDate,
				"endTime" : hotData.endDate,
				"remark" : hotData.remarck
			}),
			url : rootpath + '/hotRecode/addHotRecode.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == '1' || result == 1) {
					//添加数据之后刷新页面的数据
					var grid = Ext.getCmp("hotRecodeRecordGridPanel");
					if(grid){
						grid.publish("clearGridSelections",[]);
						grid.store.reload();
					}
					msg = "添加红名单信息成功！";
					this.close();
				} else {
					msg = "添加红名单信息失败";
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
	doModifyHotRecode : function(hotData, channelData, btn) {
		btn.disable();
		var date = Ext.util.Format.date(hotData.troubleTime, 'Y-m-d');
		Ext.Ajax.request({
			method : "POST",
			params : Util.param({
				"id" : hotData.id,
				"carNum" : hotData.hphm,
				"kkbhs" : hotData.kkbhs,
				"startTime" : hotData.startDate,
				"endTime" : hotData.endDate,
				"remark" : hotData.remarck
			}),
			url : rootpath + '/hotRecode/updateHotRecode.mvc',
			success : function(response, options) {
				btn.enable();
				var o = response.responseData || Ext.decode(response.responseText);
				var result = o.data;
				var msg = "";
				if (result == 1) {
					//更新之后刷新页面
					var grid = Ext.getCmp("hotRecodeRecordGridPanel");
					if(grid){
						grid.publish("clearGridSelections",[]);
						grid.store.reload();
					}
					msg = "更新故障信息成功！";
					//dispatchDeviceMessage(result[1]);
					this.close();
				} else {
					msg = "更新故障信息失败";
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
		Ext.getCmp('hotRecodeDetailForm').load({
			url : rootpath + '/hotRecode/initHotRecodeDetail.mvc?id=' + id,
			success : function(from, action) {
				var detailForm = Ext.getCmp('hotRecodeDetailForm');
				var obj = Ext.util.JSON.decode(action.response.responseText);
				detailForm.form.findField('hphm').setValue(obj.data[0].CAR_NUM);
				detailForm.form.findField('hphm').setDisabled(true);
				var startTime = obj.data[0].START_DATE.split(".")[0];
				detailForm.form.findField('startDate').setValue(startTime);
				var endTime = obj.data[0].END_DATE.split(".")[0];
				detailForm.form.findField('endDate').setValue(endTime);
				detailForm.form.findField('remarck').setValue(obj.data[0].REMARK);
				detailForm.form.findField('id').setValue(obj.data[0].ID);
				detailForm.form.findField('kkmcs').setValue(obj.data[0].KKMCS);
				Ext.getCmp('kkbhs').setValue(obj.data[0].KKBHS);
			},
			failure : function() {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '无法加载指定红名单信息！';
				win.show();	
			}
		});
		this.show();
	},
	saveOrUpdateWithCheckEncode :function(actionFn,hotData){
		var flag = this.isEncodeUnique(hotData);
		if(flag == -1){
			Ext.Msg.confirm("提示", "该车牌已存在红名单记录,确认继续操作？" , function(id) {
				if ("yes" == id) {
					actionFn();
				}
			}, this);
		}else{
			actionFn();
		}
		
	},
	isEncodeUnique : function(hotData){
		var result = 0;
		Ext.Ajax.request({
			url : rootpath + '/hotRecode/checkHotRecode.mvc',
			async : false,
			params :{"carNum" : hotData.hphm},
			success : function(r,o) {
				var response = Ext.decode(r.responseText);
				result = response.data;
			},
			scope : this
		});
		return result;
	}
});
