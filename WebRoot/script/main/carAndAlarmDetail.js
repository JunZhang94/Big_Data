//弹出窗口历史过车详细信息
Ext.jp.tic.main.CarDetailWindow = Ext.extend(Ext.Window,{
	width : 940,
	height : 510,
	closeAction : "close",
	title : '过车详细信息',
	plain : true,
	modal : true,
	border : false,
	clickFlag : false,
	loadId : '',
	recode : null,
	initComponent : function() {
		Ext.apply(this, {
			items : [ {
				xtype : 'form',
				id : 'detailWindowForm',
				region : 'center',
				autoScroll : true,
				labelAlign : 'right',
				layout : 'column',
				cls : 'blue-button-ct',
				items : [{
					columnWidth : .45,
					items : [{
						//图形组件
						xtype : 'pictureShowBox',
						width : 420,
						height : 440
					} ]
				},
				{
					columnWidth : .55,
					layout : 'form',
					items : [{xtype : 'fieldset',
							title : '基本信息',
							layout : "table",
							defaults : {
								width : 250,
								layout : 'form'
							},
							layoutConfig : {
								columns : 2
							},
							items : [{
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车牌号码',
									id:'carNum',
									name : 'hphm',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '行驶状态',
									name : 'xszt',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '卡口编号',
									name : 'kkbh',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '卡口名称',
									name : 'kkmc',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '方向编号',
									name : 'fxbh',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '方向名称',
									name : 'fxmc',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '设备名称',
									name : 'sbmc',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车尾号牌颜色',
									name : 'cwhpys',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '号牌一致',
									name : 'hpyz',
									anchor : '96%'
								} ]
							}]
						},{xtype : 'fieldset',
							title : '车辆信息',
							layout : "table",
							bodyStyle : 'padding-top : 5px;',
							defaults : {
								width : 250,
								layout : 'form'
							},
							layoutConfig : {
								columns : 2
							},
							items : [{
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车辆速度(km/h)',
									name : 'clsd',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车辆限速(km/h)',
									name : 'clxs',
									anchor : '96%'
								} ]
							}/*, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车身长度(cm)',
									name : 'cscd',
									anchor : '96%'
								} ]
							}*/, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车尾号牌',
									name : 'cwhphm',
									anchor : '96%'
								} ]
							}/*, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '违法状态',
									name : 'wfzt',
									anchor : '96%'
								} ]
							}*/, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车辆品牌',
									name : 'clpp',
									anchor : '96%'
								} ]
							}/*, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车辆外形',
									name : 'clwx',
									anchor : '96%'
								} ]
							}*/, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车身颜色',
									name : 'csys',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车辆类型',
									name : 'cllx',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '号牌种类',
									name : 'hpzl',
									anchor : '96%'
								} ]
							},{
								items : [ {
									xtype : 'hidden',
									name : 'xxbh',
									id:'xxbh',
									anchor : '96%'
								} ]
							},{
								items : [ {
									xtype : 'hidden',
									name : 'tx1',
									id:'tx1',
									anchor : '96%'
								} ]
							}]
						}]
				} ]
			} ],
			bbar : {
				buttonAlign : 'center',
				buttons : [/*{
          	  		xtype : 'button',
					text : '下载图片',
					id : 'picdownloadbtn',
					handler : function() {
					
						var win = new Ext.jp.tic.main.FilePathWindow();
						win.show();
						//获取当前记录的id
						var id = Ext.getCmp('xxbh').getValue();
						var httpUrl = Ext.getCmp('tx1').getValue();
						var carNum = Ext.getCmp('carNum').getValue();
						//alert(carNum);
						//根据Id下载图片
						linkDownloadPicture(id,httpUrl,carNum);
					}
				},*/{
          	  		xtype : 'button',
					text : '&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;',
					scope : this,
					handler : this.close
				} ]
			}
		});
		Ext.jp.tic.main.CarDetailWindow.superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Ext.jp.tic.main.CarDetailWindow.superclass.afterRender.call(this);
		//根据点击记录时设置的记录ID加载数据
		this.loadRecordById(this.recode);
	},
	/**
	 * 根据ID，detailRegStore加载该条记录的信息。
	 * @param xxbh 信息编号
	 */
	loadRecordById : function(data,carnum) {
		var carNumber ;
		if(carnum != undefined && carnum >0 ){
			carNumber = carQueryStore.getAt(carnum-1).get('hphm');
		}
		if(carnum ==0){
			carNumber = carQueryStore.getAt(carnum).get('hphm');
		}
		var record = {};
		// 加载数据		
		record.hphm = data.get("hphm");
		record.tx1 = data.get("tx1");
		record.xxbh = data.get("xxbh");
		record.kkbh = data.get("kkbh");
		record.kkmc = data.get("kkmc");
		record.sbmc = data.get("sbmc");
		record.fxbh = data.get("fxbh");
		record.fxmc = data.get("fxmc");
		record.cwhphm = data.get("cwhphm");
		record.cwhpys = window.dictionary.getValue("LicPlateColor",data.get("cwhpys"));
		record.hpyz = window.dictionary.getValue("LicenseVerfiy",data.get("hpyz"));//号牌一致，
		record.clsd = Ext.util.Format.substr(data.get("clsd"),0,3);
		record.clxs = Ext.util.Format.substr(data.get("clxs"),0,3);	
		record.xszt = window.dictionary.getValue("DriverType", data.get("xszt"));//行驶状态，
		record.clpp = window.dictionary.getValue("CarBrand", data.get("clpp")); //车辆厂牌编码（自行编码）。
		record.csys = window.dictionary.getValue("CarColor", data.get("csys"));
		record.cllx = window.dictionary.getValue("CarType", data.get("cllx"));
		record.hpzl = window.dictionary.getValue("LicPlateType", data.get("hpzl"));
		//反向将数据加载到form表单中
		Ext.getCmp('detailWindowForm').getForm().setValues(record);
		record.CARIMGURL = data.get("tx1");
		this.publish('loadPictures', record);
	}
});

Ext.jp.tic.main.FilePathWindow = Ext.extend(Ext.Window,{
	width : 450,
	height : 100,
	title : '图片下载',
	closeAction : "close",
	plain : true,
	modal : true,
	border : false,
	initComponent : function() {
		Ext.apply(this,{
			items : [ {
				xtype : 'form',
				region : 'center',
				layout : 'table',
				labelAlign : 'right',
				border : false,
				defaults : {
					layout : 'form',
					//统一宽度
					width : 280
				},
				layoutConfig : {
					columns : 2
				},
				items : [ {
					layout : 'form',
					bodyStyle : 'padding:10px',
					defaultType : 'textfield',
					labelWidth : 120,
					width : 400,
					buttonAlign : 'center',
					items : [ {
						fieldLabel : '请选择要上传的文件',
						name : 'fileName',
						id : 'fileId',
						anchor : '95%',
						allowBlank : false,
						inputType : 'file'
					} ]
				},{
					bodyStyle : 'padding-left:10px',
					items : [{
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;',
						id : "confimBut"
					}]
				}]
			} ]
		});
		Ext.jp.tic.main.FilePathWindow.superclass.initComponent.apply(this);
	}
});

/**
 * 告警详细信息Store
 */
var alarmDetailStore = new Ext.data.JsonStore({
	url : rootpath + "/controlAlarm/alarmControlDetail.mvc",
	root :  'data',
    idProperty : 'id',
    totalProperty : 'total',
    autoLoad : false
});

/**
 * 弹出窗口显示违章详细信息
 */
Ext.jp.tic.main.AlarmDetailWindow = Ext.extend(Ext.Window,{
	width : 970,
	height : 540,
	title : '告警详细信息',
	closeAction : "close",
	plain : true,
	modal : true,
	border : false,
	loadId : '',
	initComponent : function() {
		Ext.apply(this,{
			items : [ {
				xtype : 'form',
				region : 'center',
				id : 'alarmDetailForm',
				layout : 'column',
				labelAlign : 'right',
				border : false,
				items : [ {
					//左边图片显示区域 
					columnWidth : .45,
					items : [ {
						//引用图片显示组件
						xtype : 'pictureShowBox',
						width : 420,
						height : 450
					} ]
				}, {
					/* 右边车辆信息和布控信息显示 */
					columnWidth : .55,
					layout : 'form',
					items : [ {
						/* 车辆信息显示 */
						xtype : 'fieldset',
						title : '车辆信息',
						layout : "table",
						bodyStyle : 'padding-top : 5px;',
						defaults : {
							width : 250,
							layout : 'form'
						},
						layoutConfig : {
							columns : 2
						},
						items : [{
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '车牌号码',
								id : 'carNum',
								name : 'carNum',
								anchor : '96%'
							} ]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '通过时间',
								name : 'capDate',
								id : 'capDate',
								anchor : '96%'
							} ]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '车牌颜色',
								name : 'carNumColor',
								id : 'carNumColor',
								anchor : '96%'
							} ]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '车辆类型',
								name : 'carType',
								id : 'carType',
								anchor : '96%'
							} ]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '卡口方向',
								name : 'fxbh',
								id : 'fxbh',
								anchor : '96%'
							} ]
						}, {
							items : [ {
								xtype : 'compositefield',
								anchor : '96%',
								items : [{
										flex : 0.5,
										xtype : 'displayfield',
										fieldLabel : '速度',
										name : 'carSpeed',
										id : 'carSpeed'
									}, {
										flex : 0.5,
										xtype : 'displayfield',
										value : '公里/小时'
									} ]
							} ]
						}, {
							colspan : 2,
							width : 520,
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '告警地点',
								name : 'devChnName',
								id : 'devChnName',
								anchor : '96%'
							} ]
						}, {
							items : [{
								xtype : 'hidden',
								id : 'xxbh',
								name : 'xxbh'
							}]
						} ]
					}, {
						/* 布控信息显示区域 */
						xtype : 'fieldset',
						title : '布控信息',
						layout : "table",
						bodyStyle : 'padding-top : 5px;',
						defaults : {
							width : 250,
							layout : 'form'
						},
						layoutConfig : {
							columns : 2
						},
						items : [ {
							items : [ {
								xtype : 'displayfield',
								id : 'surveyOrgName',
								name : 'surveyOrgName',
								fieldLabel : '布控单位',
								anchor : '96%'
							} ]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '布控人',
								id : 'surveyUreaName',
								name : 'optUser',
								anchor : '96%'
							} ]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '布控时间',
								id : 'surveyDate',
								name : 'surveyDate',
								anchor : '96%'
							} ]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '联系单位',
								id : 'linkOrg',
								name:'linkOrg',
								anchor : '96%'
							} ]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '联系人',
								id : 'linkMMan',
								name : 'linkMMan',
								anchor : '96%'
							} ]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '联系电话',
								id : 'linkPPhone',
								name : 'linkPPhone',
								anchor : '96%'
							} ]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '布控等级',
								id : 'alarmTypeName',
								name : 'alarmTypeName',
								anchor : '96%'
							} ]
						}, {
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '布控类型',
								id : 'surveyTypeName',
								name : 'surveyTypeName',
								anchor : '96%'
							} ]
						}, {
							colspan : 2,
							width : 520,
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '简要案情',
								id : 'surveyDescrible',
								height : 35,
								name : 'surveyDescrible',
								anchor : '96%'
							} ]
						} ]
					},{
						/* 布控信息显示区域 */
						xtype : 'fieldset',
						title : '告警处理信息',
						id : 'processArea',
						defaults : {
							layout : 'form'
						},
						items : [ {
							items : [{
								xtype : 'displayfield',
								fieldLabel : '处理详情',
								id : 'processDescribe',
								height : 50,
								name : 'processDescribe',
								anchor : '96%'
							}]
						} ]
					}]
				} ],
				bbar : {
					buttonAlign : 'center',
					buttons : [{
	          	  		xtype : 'button',
						text : '下载图片',
						id : 'picdownloadbtn',
						handler : function() {
							//获取当前记录的id
							var id = Ext.getCmp('xxbh').getValue();
							//根据Id下载图片
							linkDownloadPicture(id);
							
							
						}
					}, {
						xtype : 'tbspacer',
						width : 10
					}, {
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;',
						id : 'closeBtn',
						scope : this,
						handler : this.close
					} ]
				}
			} ]
		});
		Ext.jp.tic.main.AlarmDetailWindow.superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Ext.jp.tic.main.AlarmDetailWindow.superclass.afterRender.call(this);
		//根据点击记录时设置的记录ID加载数据
		this.loadDetailById(this.loadId);
	},
	//加载数据
	loadDetailById : function(id) {
		alarmDetailStore.load({
			params : {'id' : id},
			scope : this,
			callback : function(records, options, success) {
				record = alarmDetailStore.reader.jsonData.data[0];
				//将数据加载到form表单中
				Ext.getCmp("xxbh").setValue(record.BJXXBH);
				Ext.getCmp('carNum').setValue(record.HPHM);
				//Ext.getCmp('capDate').setValue(record.JGSK.substring(0,record.JGSK.indexOf(".")); 
				Ext.getCmp('capDate').setValue(record.JGSK.substring(0,record.JGSK.indexOf(".")));
				Ext.getCmp('carNumColor').setValue(window.dictionary.getValue("LicPlateColor", record.HPYS));
				Ext.getCmp('carType').setValue(window.dictionary.getValue("CarType", record.CLLX));
				Ext.getCmp('fxbh').setValue(window.dictionary.getValue("DIRECTION_TYPE",record.FXBH));//卡口方向DIRECTION_TYPE
				Ext.getCmp('carSpeed').setValue(record.CLSD);
				Ext.getCmp('devChnName').setValue(record.BJDD);
				Ext.getCmp('surveyOrgName').setValue(record.BKDW);
				Ext.getCmp('surveyUreaName').setValue(record.BKR);
				//Ext.getCmp('surveyDate').setValue(record.BKSK);
				if (record.BKSK) {
					Ext.getCmp('surveyDate').setValue(record.BKSK.substring(0,record.BKSK.indexOf(".")));
				}
				//Ext.getCmp('linkOrg').setValue(record.CZ);
				Ext.getCmp('linkMMan').setValue(record.CZ);//联系人
				//Ext.getCmp('linkMMan').setValue(record.LXR);//联系人
				Ext.getCmp('linkPPhone').setValue(record.LXDH);
				Ext.getCmp('alarmTypeName').setValue(window.dictionary.getValue("ControlLevel", record.BKJB));
				Ext.getCmp('surveyTypeName').setValue(window.dictionary.getValue("ControlType", record.BKLB));
				Ext.getCmp('surveyDescrible').setValue(record.AJMS);
				Ext.getCmp('processDescribe').setValue(record.BZ);
				//展示处理信息
				this.setProcessDescribe(record);
				//将加载地址publish
				//this.publish('loadPictures', rootpath+ "/client/check/getPicWantedById.action?wantedid="+ id);
				this.publish('loadPictures', record);
			}
		});
	},
	/**
	 * 当前告警记录处理信息展示
	 * @param data
	 */
	setProcessDescribe : function(data) {
		var PROCESS_RECORD_TPL = '';
		//未签
		if (0 == data.alarmDealStatus) {
			PROCESS_RECORD_TPL = '未签收';
		}
		//已签收
		if (data.alarmDealStatus >= 1) {
			PROCESS_RECORD_TPL = PROCESS_RECORD_TPL + "====签收栏====\r\n\r\n签收人：{0}，签收时间：{1}\r\n\r\n";
		}
		//已确认
		if (data.alarmDealStatus >= 2) {
			PROCESS_RECORD_TPL = PROCESS_RECORD_TPL + "====确认栏====\r\n\r\n确认人：{2}，确认时间：{3}\r\n确认意见：{4}\r\n\r\n";
		}
		//已取消
		if (data.alarmDealStatus == 3) {
			PROCESS_RECORD_TPL = PROCESS_RECORD_TPL + '***已取消告警***';
		}
		//已处理
		if (data.alarmDealStatus >= 4) {
			PROCESS_RECORD_TPL = PROCESS_RECORD_TPL + "====处理栏====\r\n\r\n处理人：{5}，处理时间：{6}\r\n处理动作：{7}\r\n处理意见：{8}\r\r\n";
		}
		//已反馈	
		if (data.alarmDealStatus >= 5) {
			PROCESS_RECORD_TPL = PROCESS_RECORD_TPL + "====反馈栏====\r\n\r\n反馈人：{9}，反馈时间：{10}\r\n反馈意见：{11}";
		}
		Ext.getCmp("processDescribe").setValue(String.format(PROCESS_RECORD_TPL, 
				data.signPersonName, data.signTime, 
				data.confirmPersonName, data.confirmTime, (data.confirmSuggest == null ? '无' : data.confirmSuggest), 
				data.processPersonName, data.processTime, 
				window.dictionary.getValue("ALARM_PROCESS_ACTION", data.processAction),
				(data.processSuggest == null ? '无' : data.processSuggest),
				data.feedbackPersonName,data.feedbackTime,data.feedbackContent));
	}
});

//下载图片方法
function linkDownloadPicture(id){
	var ids=[];
	if(id){
		ids[ids.length]=id;
	}else{
		var records = Ext.getCmp('alarmGridPanel').getSelectionModel().getSelections();
		if (records != "") {
			for ( var i = 0; i < records.length; i++) {
				ids[ids.length] = records[i].get('BJXXBH');
			}
		}
	}
	var idString = ids ? ids.join(',') : '';
	if(idString!=''){
		Ext.Ajax.request({
				// 将id组合成字符串传递到后台
				url : rootpath +'/controlAlarm/loadImgUrlByIds.mvc',
				method : 'POST',
				params : {'idstr': idString},
				success : function(resp, opts) {
					var txt = Ext.util.JSON.decode(resp.responseText);
					//var data = txt.data;
					if(txt){
						window.open (txt,'_black');
						//downPictureWindow.close();
					}
				},
				failure : function(resp, opts) {
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = "下载失败！请重试！";
					win.show();
				}
			});
	}
}

//卡口管理画廊显示效果
Ext.jp.tic.main.PictureShowBox = Ext.extend(Ext.Panel, {
	width : 420,
	height : 465,
	initComponent : function() {
		Ext.apply(this, {
			layout : 'form',
			items : [ {
				xtype : 'fieldset',
				width : this.width,
				height : this.height,
				layout : 'fit',
				title : '图片',
				items : [
				{
					xtype : 'box',
					inputType : "image",
					align : 'center',
					id : 'imgBox',
					autoEl : {
						tag : 'img'
					}
				}]
			}]
		});
		Ext.jp.tic.main.PictureShowBox.superclass.initComponent.apply(this);
		//监听消息
		this.subscribe('loadPictures', this.refreshData, this);
	},
	// 取消监听,避免再次publish时,之前的subcribe仍然有效。
	destroy : function() {
		this.unsubscribe('loadPictures', this.refreshData, this);
		Ext.jp.tic.main.PictureShowBox.superclass.destroy.apply(this);
	},
	// 渲染图片，和放大图片
	refreshData : function(event, eventName) {
		var record = event;
		var url = Util.processEmptyImgUrl(record.CARIMGURL);
		Ext.getCmp('imgBox').getEl().dom.src = url;
		// 为大图片添加放大功能
		var imgDom = Ext.getCmp('imgBox').getEl().dom;
		(new qsoft.PopBigImage(imgDom, 20, 0, 450, 380)).render();
	}
});