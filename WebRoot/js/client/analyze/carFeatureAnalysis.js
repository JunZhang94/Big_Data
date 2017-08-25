/**
 * 车辆特征分析入口
 */
Ext.ns("Jinpeng.carFeature");

var viewPortObj = null;
var downPictureWindow = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport({
		layout : 'border',
		items : [ {
			region : 'north',
			border : false,
			height : 40,
			xtype : 'alarmSearchNorthFormPanel'
		}, {
			region : 'center',
			border : false,
			xtype : 'alarmSearchCenterDataPanel'
		} ]
	});
});

/**
 * 查询条件FORM
 */
Jinpeng.carFeature.CarFeatureNorthFormPanel = Ext.extend(Ext.Panel,{
		initComponent : function() {
			//车牌号
			var carNumStore = new Ext.data.JsonStore({
				url : rootpath
						+ "/dictionary/jsonDictsInCombo.mvc?code=LicPlate",
				root : "data",
				fields : [ 'id', 'text' ],
				autoLoad : false
			});
			var endTime = Date.parseDate(Ext.util.Format.date(
					new Date(), 'Y-m-d')
					+ " " + "23:59:59", 'Y-m-d H:i:s');
			
			Ext.apply(this,{
				items : [ {
					// form表单
					xtype : 'form',
					id : 'searchAlarmForm',
					border : false,
					frame : true,
					cls : 'blue-button-ct',

					layout : 'table',
					defaults : {
						layout : 'form',
						width : 280
					},
					layoutConfig : {
						columns : 4
					},
					bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
					items : [{
							// 第一行
							items :[{
								xtype: 'compositefield',
								anchor : '94%',
				                items: [{
				                    	flex : 0.4,
				                    	xtype : 'tcombo',
										id : 'carfnum',
										name:'carfnum',
										fieldLabel : '车牌号码',
										editable : false,
										store : carNumStore,
										mode : 'local',
										emptyText : '全部',
										triggerAction : 'all',
										valueField : 'id',
										displayField : 'text'
				                    }, {
				                    	flex : 0.6,
				                    	xtype : 'textfield',
										id : 'carbnum',
										name : 'carbnum',
										emptyText : '请输入车牌',
										//"?"代替一个位置
										vtype:'carNumSuffix'
				                    }]
								}]
							},{
								items : [ {
									xtype : 'datetimefield',
									name : 'startTime',
									id : 'startdate',
									fieldLabel : '经过时间',
									editable : false,
									// 默认时间为当天的0点
									value : new Date().format('Y-m-d'),
									vtype: 'beginEndDate',
									endDateField : 'enddate',
									anchor : '94%'
								} ]
							},{
								items : [ {
									xtype : 'datetimefield',
									name : 'endTime',
									id : 'enddate',
									fieldLabel : '至',
									editable : false,
									value : endTime,
									vtype: 'beginEndDate',
									startDateField : 'startdate',
									anchor : '94%'
								} ]
							},{
								bodyStyle : 'padding-left:115px',
								items : [{
									xtype : 'button',
									text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
									id : "searchBut",
									handler : this.alarmSearch
								}]
							},{
								items : [{
									xtype : 'hidden',
									id : 'passport'
								}]
							}], 
							buttons: [{
					            text: 'test',
					            handler: function(){
								}
					        }]
				} ],
				listeners : {
					afterrender : function() {
						/*车牌省Store*/
						carNumStore.load();
					}
				}
			});
			Jinpeng.carFeature.CarFeatureNorthFormPanel.superclass.initComponent.apply(this);
		},
		/* 响应查询按钮 */
		alarmSearch : function() {
			var form = Ext.getCmp('searchAlarmForm');
			if (form.getForm().isValid()) {
				var grid = Ext.getCmp('alarmGridPanel');
				grid.store.baseParams = {};// 重置
				/** 将参数传入后台 */
				var baseparams = {
					"carFNum" : (Ext.get('carfnum').getValue() =='全部'? '': Ext.get('carfnum').getValue()),
					"carBNum" : Ext.getCmp('carbnum').getValue(),
					"startTime" : Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'),
					"endTime" : Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d H:i:s')
				};
				grid.store.baseParams = baseparams;
				/*刷新选中*/
				this.publish("clearGridSelections",[]);
				grid.store.load({
					params : {
						'page.start' : 0,
						'page.limit' : Jinpeng.PageSize
					}
				});
			}
		}
	});

// 中心右区域数据显示中心
var alarmSearchStore = new Ext.data.JsonStore({
	//数据请求地址url
	url : "",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	remoteSort : true,
	fields : [ {
			name : 'BJXXBH'
		}, {
			name : 'JGSK'
		}, {
			name : 'HPHM'
		}, {
			name : 'HPYS'
		}, {
			name : 'CWHPHM'
		}, {
			name : 'CWHPYS'
		}, {
			name : 'HPYZ'
		}, {
			name : 'CLPP'
		}, {
			name : 'CLWX'
		}, {
			name : 'CSYS'
		}, {
			name : 'CLLX'
		}, {
			name : 'CLLX'
		}, {
			name : 'CLSD'
		}, {
			name : 'CLBJ'
		}, {
			name : 'BJLX'
		}, {
			name : 'BJDD'
		}, {
			name : 'QSBJ'
		}]
});
Jinpeng.carFeature.CarFeatureCenterDataPanel = Ext.extend(Ext.grid.GridPanel,{
		id : 'alarmGridPanel',
		border : false,
		frame : false,
		pageSize : Jinpeng.PageSize,
		initComponent : function() {
			var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
			Ext.apply(this,{
				store : alarmSearchStore,
				cm : new Ext.grid.ColumnModel({
					defaults : {
						sortable : true,
					},
					columns : [
							new Ext.ux.grid.PagingRowNumberer({width : 40}),
							sm,
							{
								header : '车牌号码',
								dataIndex : 'HPHM'
							},{
								header : '车牌颜色',
								dataIndex : 'HPYS',
								renderer : function(key) {
									return window.dictionary.getValue("LicPlateColor", key);
								}
							},{
								header : '车尾号牌号码',
								dataIndex : 'CWHPHM'
							},{
								header : '车尾号牌颜色',
								dataIndex : 'CWHPYS',
								renderer : function(key) {
									return window.dictionary.getValue("LicPlateColor", key);
								}
							},{
								header : '号牌一致',
								dataIndex : 'HPYZ'
							},{
								header : '通过时间',
								width : 180,
								dataIndex : 'JGSK'
							},{
								header : '卡口方向',
								dataIndex : 'FXBH'/*,
								renderer : function(key) {
									return window.dictionary.getValue("DIRECT", key);
								}*/
							},{
								header : '车辆类型',
								dataIndex : 'CLLX',
								renderer : function(key) {
									return window.dictionary.getValue("CarType", key);
								}
							},{
								header : '速度',
								dataIndex : 'CLSD'
							},{
								header : '告警地点',
								dataIndex : 'BJDD'
							},{
								header : '告警类型',
								dataIndex : 'BJLX',
								renderer : function(key) {
									return window.dictionary.getValue("AlertType", key);
								}
							},{
								header : '处理状态',
								dataIndex : 'CLBJ',
								renderer : function(key) {
									return window.dictionary.getValue("VerfiyMark",key);
								}
							},{
								header : '签收标记',
								dataIndex : 'QSBJ'/*,
								renderer : function(key) {
									return window.dictionary.getValue("ALARM_PROCESS_STATUS",key);
								}*/
							},
							{
								header : '操作', dataIndex : 'operate',
						    	xtype : 'actioncolumn',
		                    	width : 100,
		                    	align : 'center',
		                    	items : [{
									icon : rootpath
											+ '/themes/client/blue/images/system/check.gif',
									tooltip : '查看'
								}]
							} ]
				}),
				selModel : sm,
				tbar : {
					items : [ {
						xtype : 'button',
						id : 'exportRecordBtn',
						titletooltip : {
							text : Jinpeng.Message.EXPORT_BUTTON_TOOLTIP
						},
						text : '&nbsp;&nbsp;&nbsp;导出&nbsp;&nbsp;&nbsp;',
						/* 调用导出Excel数据格式方法 */
						handler : this.outputExcelDataMethod
					},{
						xtype : 'tbspacer',
						width : 30
					},{
						xtype : 'button',
						id : 'picDownloadBtn',
						disabled : true,
						titletooltip : {
							text : " 默认按查询条件下载,如果选中则只下载选中记录的图片！"
						},
						text : '图片下载',
						handler : this.customerDownLoadPicture
					} ]
				},
				bbar : new Jinpeng.widget.PagingToolbar( {
					id : 'PagingToolbar',
					store : alarmSearchStore,
					//displayInfo : true,
					pageSize : this.pageSize,
					displayMsg : '{0} - {1} of 共{2}条',
					emptyMsg : "无数据"
				}),
				listeners : {
					afterrender : function() {
						/** 组件加载完成后，再加载数据 */
						//页面初始数据需要按当前查询条件，以保证数据条数的一致性。
						alarmSearchStore.baseParams["advancedSearch.startTime"] = Date.parseDate(Ext.util.Format
								.date(new Date(), 'Y-m-d')
								+ " " + "00:00:00", 'Y-m-d H:i:s');
						alarmSearchStore.baseParams["advancedSearch.endTime"] = Date.parseDate(Ext.util.Format
								.date(new Date(), 'Y-m-d')
								+ " " + "23:59:59", 'Y-m-d H:i:s');
						//默认不查询红名单
						alarmSearchStore.baseParams["advancedSearch.white"] = 0;
						alarmSearchStore.baseParams['advancedSearch.sort'] = 'capDate';
						alarmSearchStore.baseParams['advancedSearch.dir'] = 'DESC';
						alarmSearchStore.load({
							params : {
								'page.start' : 0,
								'page.limit' : this.pageSize
							}
						});
						//控制权限
						//this.privilegeControl_grid();
					},
					/*双击查看*/
					rowdblclick : function(grid, rowIndex, e ) {
						var data = grid.getStore().getAt(rowIndex).data;
						var win = new Jinpeng.carFeature.CheckShowDetailWindow();
						//将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
						win.loadId = data.BJXXBH;
						win.show();
					},
					/*排序点击事件*/
					headerclick : function ( grid, columnIndex, e) {
						var dataIndex = grid.colModel.columns[columnIndex].dataIndex;
						//屏蔽操作列和空列的点击事件
						if ("" == dataIndex || 'operate' == dataIndex) {
							return;
						}
						alarmSearchStore.baseParams['advancedSearch.sort'] = dataIndex;
						if (alarmSearchStore.baseParams['advancedSearch.dir'] == 'DESC') {
							alarmSearchStore.baseParams['advancedSearch.dir'] = 'ASC';
						} else {
							alarmSearchStore.baseParams['advancedSearch.dir'] = 'DESC';
						}
						alarmSearchStore.load({
							params : {
								'page.start' : 0,
								'page.limit' : this.pageSize
							}
						});
					}
				}
			});
			/* 响应最后一列查看点击事件 */
			this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
				// var record =
				// Ext.getCmp('alarmGridPanel').getStore().getAt(rowIndex);
				var fieldName = grid.getColumnModel()
						.getDataIndex(columnIndex);
				if (fieldName == 'operate') {
					if (typeof this.checkHref == 'function')
						/* 调用查看超链接方法 */
						this.checkHref(grid, rowIndex, columnIndex);
				}
			});

			Jinpeng.carFeature.CarFeatureCenterDataPanel.superclass.initComponent.apply(this);
		},
		/**
		 * 导出，下载权限控制
		 */
		privilegeControl_grid : function() {
			// 导出权限控制
			/*right = getRight("DataExport"); //数据导出权
			if(right) {
				Ext.getCmp('exportRecordBtn').setDisabled(false);
			};	*/
			/*picRight = getRight("PictureLoad"); //图片下载权
			if(picRight) {
				Ext.getCmp('picDownloadBtn').setDisabled(false);
			};*/
		},
		/* 响应查看超链接的方法 */
		checkHref : function(grid, rowIndex, colIndex, item, event) {
			var recode = grid.store.getAt(rowIndex);
			if (recode) {
				// 创建一个window对象
				var win = new Jinpeng.carFeature.CheckShowDetailWindow();
				// 传入当前ID，并加载数据。
				win.loadId = recode.get("BJXXBH");
				win.show();
			}
		},
		/**
		 * 下载图片
		 * @param path
		 */
		customerDownLoadPicture : function() {
			//调用下载,如果返回值为1，表示当前系统有下载进程正在运行，0则没有
			var result = globalOcxComm.isDownloading();
			if (1 == result) {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = "系统检测下载正在进行，请稍后重试！";
				win.show();
			} else {
				refDownloadPicture();
			}
		},
		/* 导出Excel格式数据方法 */
		outputExcelDataMethod : function() {
			var records = Ext.getCmp('alarmGridPanel').getSelectionModel().getSelections();

			var config = {
				totalURL : rootpath + "/carFeature/countControlAlarm.mvc",
				selectExportURL : rootpath + "/carFeature/exportControlAlarm.mvc",
				queryExportURL : rootpath + "/carFeature/exportControlAlarm.mvc"
			};
			// 得到选中的ids
			var ids = [];
			for ( var i = 0; i < records.length; i++) {
				ids[ids.length] = records[i].get('BJXXBH');
			}
			config.ids = ids;
			var param = getQueryParams();
			config.queryCondition = param.join("&");
			var ExportHelper = new Jinpeng.ExportHelper(config);
			ExportHelper.startExport(true);
		}
	});

/**
 * 告警详细信息Store
 */
var alarmDetailStore = new Ext.data.JsonStore({
	url : rootpath + "/carFeature/alarmControlDetail.mvc",
	root :  'data',
    idProperty : 'id',
    totalProperty : 'total',
    autoLoad : false
});

/**
 * 弹出窗口显示违章详细信息
 */
Jinpeng.carFeature.CheckShowDetailWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
		width : 970,
		height : 550,
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
					cls:'blue-button-ct',
					border : false,
					//bodyStyle : 'padding-top : 5px;',
					
					items : [ {
						/* 左边图片显示区域 */
						columnWidth : .45,
						items : [ {
							//引用图片显示组件,widget.js
							xtype : 'pictureShowBox',
							width : 420,
							height : 420
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
									id : 'detailId',
									name : 'id'
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
							text : '上一条',
							id : 'prevButton',
							scope : this,
							handler : function() {
								// 调用方法获取下一条记录id
								var id = this.getDetailRecordId(this.loadId, false);
								// 如果不为空，则进行数据加载
								if (id != null) {
									this.loadDetailById(id);
									//同步"上一条","下一条"按钮状态.
									this.synchronUpOrDown(id);
								}
							}
						},{
							xtype : 'tbspacer',
							width : 10
						},{
							xtype : 'button',
							text : '下一条',
							id : 'nextButton',
							scope : this,
							handler : function() {
								// 调用方法获取下一条记录id
								var id = this.getDetailRecordId(this.loadId, true);
								// 如果不为空，则进行数据加载
								if (id != null) {
									this.loadDetailById(id);
									//同步"上一条","下一条"按钮状态.
									this.synchronUpOrDown(id);
								}
							}
						},{
			          		  xtype : 'tbspacer',
			          		  width : 10
		          	  	},{
		          	  		xtype : 'button',
							text : '下载图片',
							id : 'picdownloadbtn',
			          	  	disabled : true,
							handler : function() {
								//获取当前记录的id
								var id = Ext.getCmp('detailId').getValue();
								//调用下载,如果返回值为1，表示当前系统有下载进程正在运行，0则没有
								var result = globalOcxComm.isDownloading();
								if (1 == result) {
									var win = new Jinpeng.widget.MessageWindow();
									win.msg = "系统检测下载正在进行，请稍后重试！";
									win.show();
								} else {
									refDownloadPicture(id);
								}
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
			Jinpeng.carFeature.CheckShowDetailWindow.superclass.initComponent.apply(this);
		},
		afterRender : function() {
			Jinpeng.carFeature.CheckShowDetailWindow.superclass.afterRender.call(this);
			//根据点击记录时设置的记录ID加载数据
			this.loadDetailById(this.loadId);
			//同步"上一条","下一条"按钮状态.
			this.synchronUpOrDown(this.loadId);
			//权限控制
			this.privilegeControl_window();
		},
		//加载数据
		loadDetailById : function(id) {
			alarmDetailStore.load({
				params : {'id' : id},
				scope : this,
				callback : function(records, options, success) {
					//if(success) {
						record = alarmDetailStore.reader.jsonData.data[0];
						// 按字典转换数据(车牌类型，违法类型，卡口方向)，多级数据进行转换。
						/*record.fxbh = window.dictionary.getValue("DIRECT", record.fxbh);
						record.carNumColor = window.dictionary.getValue("PLATE_COLOR", record.carNumColor);
						record.carType = window.dictionary.getValue("CAR_TYPE", record.carType);
						record.alarmType = window.dictionary.getValue("SURVEY_LEVEL", record.alarmType);
						record.surveyType = window.dictionary.getValue("SURVEY_TYPE", record.surveyType);*/
						//反向将数据加载到form表单中
						//Ext.getCmp('alarmDetailForm').getForm().setValues(record);
						Ext.getCmp('carNum').setValue(record.HPHM);
						Ext.getCmp('capDate').setValue(record.JGSK);
						Ext.getCmp('carNumColor').setValue(window.dictionary.getValue("LicPlateColor", record.HPYS));
						Ext.getCmp('carType').setValue(window.dictionary.getValue("CarType", record.CLLX));
						Ext.getCmp('fxbh').setValue(record.FXBH);
						Ext.getCmp('carSpeed').setValue(record.CLSD);
						Ext.getCmp('devChnName').setValue(record.BJDD);
						Ext.getCmp('surveyOrgName').setValue(record.BKDW);
						Ext.getCmp('surveyUreaName').setValue(record.BKR);
						Ext.getCmp('surveyDate').setValue(record.BKSK);
						//Ext.getCmp('linkOrg').setValue(record.CZ);
						Ext.getCmp('linkMMan').setValue(record.CZ);
						Ext.getCmp('linkPPhone').setValue(record.LXDH);
						Ext.getCmp('alarmTypeName').setValue(window.dictionary.getValue("ControlLevel", record.BKJB));
						Ext.getCmp('surveyTypeName').setValue(window.dictionary.getValue("ControlType", record.BKLB));
						Ext.getCmp('surveyDescrible').setValue(record.AJMS);
						Ext.getCmp('processDescribe').setValue(record.BZ);
						//展示处理信息
						this.setProcessDescribe(record);
						//将加载地址publish
						//this.publish('loadPictures', rootpath+ "/client/check/getPicWantedById.action?wantedid="+ id);
					//}
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
		},
		/**
		 * 计算点击"上一条","下一条"按钮后，记录Id。
		 * @param id
		 * @param upOrDown
		 * @returns
		 */
		getDetailRecordId : function(id, upOrDown) {
			var nextId = null;
			//拿该数据在当前store中的id数组所在的序号
			var k = 0;
			for ( var i = 0; i < alarmSearchStore.getCount(); i++) {
				if (this.loadId == alarmSearchStore.getAt(i).get('BJXXBH')) {
					k = i;
					break;
				}
			}
			if (upOrDown == false && k > 0) {
				nextId = alarmSearchStore.getAt(k - 1).get('BJXXBH');
			}
			if (upOrDown == true
					&& k < alarmSearchStore.getCount() - 1) {
				nextId = alarmSearchStore.getAt(k + 1).get('BJXXBH');
			}
			if(nextId) {
				this.loadId = nextId;
			}
			return nextId;
		},
		/**
		 * 同步"上一条","下一条"按钮状态.
		 */
		synchronUpOrDown : function(id) {
			var count = alarmSearchStore.getCount();
			var index = 0;
			for ( var i = 0; i < count; i++) {
				if (id == alarmSearchStore.getAt(i).get('BJXXBH')) {
					index = i;
					break;
				}
			}
			//更改状态
			if (count == 1) {
				Ext.getCmp('nextButton').disable();
				Ext.getCmp('prevButton').disable();
			} else if(index == 0) {
				Ext.getCmp('prevButton').disable();
				if(count == 2) {
					Ext.getCmp('nextButton').enable();
				}
			} else if (index == (count-1)) {
				Ext.getCmp('nextButton').disable();
				if(count == 2) {
					Ext.getCmp('prevButton').enable();
				}
			} else {
				Ext.getCmp('prevButton').enable();
				Ext.getCmp('nextButton').enable();
			}
		},
		/**
		 * 下载，布控权限控制
		 */
		privilegeControl_window : function() {
			/*picRight = getRight("PictureLoad"); //图片下载权
			if(picRight) {
				Ext.getCmp('picdownloadbtn').setDisabled(false);
			};*/
		}
	});

/**
 * 调用下载
 */
function refDownloadPicture(id){
	var config = {
			customerCountUrl : rootpath + "/client/check/countExportData.action",
			customerIdsUrl : rootpath + "/client/check/getImgUrlByIds.action",
			customerConditionUrl : rootpath + "/client/check/getWantedImgUrlByCondition.action"
	};
	var ids = [];
	if(id) {
		ids[ids.length] = id;
	} else {
		var records = Ext.getCmp('alarmGridPanel').getSelectionModel().getSelections();
		if (records != "")
			for ( var i = 0; i < records.length; i++)
				ids[ids.length] = records[i].get('id');
	}
	config.ids = ids;
	var param = getQueryParams();
	config.param = param.join("&");
	
	//调用图片下载弹出框，创建全局窗体对象。
	downPictureWindow = new Jinpeng.kakou.progressWindow();
	downPictureWindow.config = config;
	downPictureWindow.show();
}

/**
 * 获取当前查询条件参数，并封装为数组
 * @returns {Array}
 */
function getQueryParams() {
	/** 将查询参数传递到后台，并在后台获取要导出的数据 */
	var param = [];
	param[param.length] = "carFNum=" +  (Ext.get('carfnum').getValue() =='全部'? '': Ext.get('carfnum').getValue());
	param[param.length] = "carBNum=" + Ext.getCmp('carbnum').getValue();
	param[param.length] = "carNumColor=" + (Ext.getCmp('carnumcolor').getValue() == '' ? -1 : Ext.getCmp('carnumcolor').getValue());
	param[param.length] = "carType=" + (Ext.getCmp('cartype').getValue() == '' ? -1 : Ext.getCmp('cartype').getValue());
	param[param.length] = "passStation=" + Ext.getCmp('passport').getValue();
	param[param.length] = "startTime=" + Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s');
	param[param.length] = "endTime=" + Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d H:i:s');
	param[param.length] = "alarmDealStatus=" + (Ext.getCmp('alarmdealstatus').getValue() == '' ? -1 : Ext.getCmp('alarmdealstatus').getValue());
	param[param.length] = "alarmType=" + (Ext.getCmp('alarmType').getValue() == '' ? -1 : Ext.getCmp('alarmType').getValue());
	param[param.length] = 'sort=' +alarmSearchStore.baseParams['sort'];
	param[param.length] = 'dir=' +alarmSearchStore.baseParams['dir'];
	return param;
}


Ext.reg('alarmSearchNorthFormPanel', Jinpeng.carFeature.CarFeatureNorthFormPanel);
Ext.reg('alarmSearchCenterDataPanel', Jinpeng.carFeature.CarFeatureCenterDataPanel);