Ext.form.TriggerField.override({   
    afterRender: function() {   
         Ext.form.TriggerField.superclass.afterRender.call(this);   
    }   
});  

var buttonFlag = '1';//默认为提交任务

/**
 * 命名空间
 */
Ext.ns('Jinpeng.followCar');

var viewPort = null;
var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
var kwin =new Jinpeng.widget.GeneralWindow({
	id: "mywin",
	title: "",
	constrain : true,
	constrainHeader : true,
	width: ww * 2 / 3,
	height: hh * 3 / 4,
	layout: "fit",
	//autoShow: true,
	closeAction:'hide',
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/Big_Data/zTree/demo/cn/excheck/multiSelectTree1.html"></iframe>'
});
var setKKValue=function(data){
	Ext.getCmp('kkmcs').setValue(data.text);
	var kkbhs = "";
	var kkbhs_array = (data.id).split(",");
	//alert(kkbhs_array.length);
	for(var i = 0; i < kkbhs_array.length; i++){
		//alert(kkbhs_array[i].substring(3));
		kkbhs += kkbhs_array[i].substring(3) +","
	}
	kkbhs = kkbhs.substring(0,kkbhs.length-1);
	Ext.getCmp('kkbhs').setValue(kkbhs);
	Ext.getCmp('passStation').setValue(data.text);
//	Ext.getCmp('directions').setValue(data.id);
	Ext.getCmp('mywin').hide();
};

function showFollowPage(id, carNum, validTimes, followTimes, startTime, endTime, kkbhs, kkmcs) {
	var win = new Jinpeng.followCar.FollowCarWindow({
		id : 'followCarResult',
		title : '跟随车分析结果'
	});
	//alert(kkbhs);
	win.datas = {
		'id' : id,
		'carNum' : carNum,
		'validTimes' : validTimes,
		'followTimes' : followTimes,
		'startTime' : startTime,
		'endTime' : endTime,
		'kkbhs' : kkbhs,
		'kkmcs' : kkmcs
	};
	win.show();
}
Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'north',
			height : 95,
			border : false,
			xtype : 'searchFollowCarForm'
		}, {
			region : 'center',
			border : false,
			//xtype : 'searchFollowCarGrid'
			xtype: 'taskStatisticsGrid'
		}]
	});
});

//结束时间
var endTime = Date.parseDate(Ext.util.Format.date(
	new Date(), 'Y-m-d')
	+ " " + "23:59:59", 'Y-m-d H:i:s');

/**
 * 伴随车查询--Form
 */
Jinpeng.followCar.searchFollowCarForm = Ext.extend(Ext.Panel, {
	initComponent : function() {
	  
		//车牌号
		var carNumStore = new Ext.data.JsonStore({
			url : rootpath
					+ "/dictionary/jsonDictsInCombo.mvc?code=LicPlate",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false
		});
		
		var testStore = new Ext.data.JsonStore({
			//storeId:'pigOwnerStore',   
	        url: rootpath + "/dictionary/jsonDictsInCombo.mvc?code=ApprovalState",   
	        root: 'data',   
	        //totalProperty: 'totalCount',   
	        //remoteSort: true,   
	        fields: ['id','text'],
	        autoLoad : false
		});
		
		var timeSpinner = new Ext.ux.form.SpinnerField({
			name : 'vilidTime',
			id : 'vilidTime',
			fieldLabel : '&nbsp;&nbsp;有效时间',
			width : 60,
			value : '5',
			tooltip : {
				text : "有效时间指的是主车跟伴随车经过同一个卡口的时间差"
			},
			cellWidth : 210,
			minValue : 1,
			maxValue : 30,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		
		var kakouSpinner = new Ext.ux.form.SpinnerField({
			name : 'kakouTimes',
			id : 'kakouTimes',
			fieldLabel : '&nbsp;&nbsp;跟随卡口数',
			width : 60,
			value : '3',
			tooltip : {
				text : "跟随卡口数指的是跟随车跟随主车所经过的卡口总数"
			},
			cellWidth : 210,
			minValue : 2,
			maxValue : 8,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		
		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'searchFollowCarForm',
				border : false,
				frame : true,
				labelAlign : 'right',
				cls : 'blue-button-ct',
				layout : 'table',
				defaults : {
					width : 280,
					layout : 'form'
				},
				layoutConfig : {
					columns : 4
				},
				
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;border-bottom-color:#F7F7F7;',
				items : [/*{
					items : [{
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
								allowBlank : false,
								triggerAction : 'all',
								valueField : 'id',
								displayField : 'text'
		                    }, {
		                    	flex : 0.6,
		                    	xtype : 'textfield',
								id : 'carbnum',
								allowBlank : false,
								name : 'carbnum',
								emptyText : '请输入车牌',
								// 支持?代替一个位置
								vtype:'trackCarNum'
		                    }]
					}]
				},*/{
					items : [{
                    	xtype : 'tcombo',
						id : 'carfnum',
						name:'carfnum',
						fieldLabel : '车牌号码',
						editable : true,
						store : carNumStore,
						mode : 'local',
						emptyText : '全部',
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'text',
						vtype:'carNumUpper',
						anchor : '94%'
					}]
				},{
					items : [ {
						xtype : 'textfield',
						name : 'startTime',
						id : 'startdate',
						fieldLabel : '开始时间',
						value : new Date().format('Y-m-d') + ' 00:00:00',
						anchor : '96%',
						allowBlank : false,
						editable : false,
						style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
						listeners  : {   
			            	'focus':function(field){  
							    var endDate = Ext.getCmp("enddate").getValue();
								var endTime = Ext.util.Format.date(
										new Date(), 'Y-m-d H:i:s');
								//alert(endTime);
								//  日期时间的默认参数      
							    var defaultDateTimeParams = new function()   
							    {   
							        this.readOnly   = true;           //  不允许在文本输入框中修改时间   
							        this.startDate  = endTime;    //  开始时间   
							        this.maxDate = endDate;
							        this.dateFmt    = 'yyyy-MM-dd HH:mm:ss';  //  格式化时间   
							        this.autoPickDate = true; this.isShowWeek = false;                  //  默认不显示周   
							        this.alwaysUseStartDate = false;           //  默认使用初始时间   
							    };  
			                    WdatePicker(defaultDateTimeParams);   
			                    field.blur();
			             	}   
						}  
						
					} ]
				},{
					items : [ {
						xtype : 'textfield',
						name : 'endTime',
						id : 'enddate',
						fieldLabel : '结束时间',
						allowBlank : false,
						editable : false,
						value : new Date().format('Y-m-d') + ' 23:59:59',
						anchor : '96%',
						style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}, 
						listeners  : {   
			            	'focus':function(field){  
								var endTime = Ext.util.Format.date(
										new Date(), 'Y-m-d H:i:s');
								var startdate = Ext.getCmp("startdate").getValue();
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
					} ]
				}, {
					items : [{
						xtype : 'spacer'
					}]
				}, {
					items : [{
						xtype: 'compositefield',
						anchor : '94%',
		                items: [ timeSpinner, {
	                    	flex : 0.6,
	                    	xtype : 'label',
	                    	text : '分钟'
	                    }]
					}]
				}, {
					items : [{
						xtype: 'compositefield',
						anchor : '94%',
		                items: [ kakouSpinner, {
	                    	flex : 0.6,
	                    	xtype : 'label',
	                    	text : '个'
	                    }]
					}]
				}, {
					items : [{
						xtype : 'spacer'
					}]
				}, {
					items : [{
						xtype : 'spacer'
					}]
				}, {
					/*
					colspan:2,
					width:620,
					items : [{
						fieldLabel : '卡口名称',
						xtype : 'mountSelector',
						name : 'passStation',
						id : 'passStation',
						allowBlank : false,
						colspan:2,
						width:640,
						editable : false,
						emptyText : '请选择卡口',
						defaults : {
							width : 580,
							layout : 'form'
						},
						anchor : '94%',
						callBackFun:function(data){
							var phones = '';
							var kkmcs= '';
							var dataLength = data.length;
							if (data.length > 8) {
								dataLength = 8;
							}
							for ( var i = 0; i < dataLength; i++) {
								if (phones != '') {
									phones += ',';
								}
								if (kkmcs != '') {
									kkmcs += ',';
								}
								if (data[i].id != '' && data[i].id != 'null') {
									phones += data[i].id;
									kkmcs += data[i].text;
								}
							}
							if (data.length > 8) {
								var win = new Jinpeng.widget.MessageWindow();
								win.msg = '超过八个卡口，建议选择八个卡口以内！';
								win.show();
							}
							Ext.getCmp('kkmcs').setValue(kkmcs);
							Ext.getCmp('kkbhs').setValue(phones);
						}
					}]
					*/
					
					colspan:2,
					width:800,
					items : [{
						xtype : 'compositefield',
						items : [ {
							flex : 0.5,
							fieldLabel : '卡口名称',
							xtype : 'tooltiptextfield',
							name : 'passStation',
							id : 'passStation',
							width : 500,
							emptyText : '请选择卡点'
						}, {
							flex : 0.5,
							owner : this,
							labelAlign : 'right',
							xtype : 'button',
							text : '选择卡口',
							id:'choosekkBtn',
							handler : function(){
								kwin.show();
							}
						} ]
					}]
				}, {
					bodyStyle : 'padding-left:10px',
					xtype : 'compositefield',
					items : [{
						flex : 31,
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
						id : "searchBut",
						handler : this.followCarTaskSearch
					},{
						flex : 31,
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;提交任务&nbsp;&nbsp;&nbsp;',
						id : "commitBut",
						handler : this.followCarCheck
					},{
						flex : 31,
						xtype : 'button',
						id : "resetBut",
						text : '&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;',
						handler : this.resetMethod
					}]
				},{
					items : [{
						xtype : 'hidden',
						id : 'kkmcs',
						name : 'kkmcs'
					}]
				},{
					items : [{
						xtype : 'hidden',
						id : 'kkbhs',
						name : 'kkbhs'
					}]
				}]
			}],
			listeners : {
				afterrender : function() {
					//车牌省Store
					carNumStore.load();
				}
			}
		});
		Jinpeng.followCar.searchFollowCarForm.superclass.initComponent.apply(this);
	},
	
	followCarTaskSearch : function(){
       	var grid = Ext.getCmp('TaskStatisticsFormPanel');
		grid.store.baseParams = {};
		var baseparams = {
			'car_num':(Ext.get('carfnum').getValue() =='全部'? '': Ext.get('carfnum').getValue()),
			'valid_time':Ext.getCmp('vilidTime').getValue(),
			'follow_times':Ext.getCmp('kakouTimes').getValue(),
			'mounts_name':Ext.getCmp('passStation').getValue(),
			'taskName':'跟随车分析',
			'startTime' : Ext.getCmp('startdate').getValue(), //Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'),
			'endTime' : Ext.getCmp('enddate').getValue(), //Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d H:i:s'),
			'page.start':0,
			'page.limit': Jinpeng.PageSize 
			
		};
		grid.store.baseParams = baseparams;
		grid.store.load({
		});
	},
	
	followCarCheck : function() {
		var form = Ext.getCmp('searchFollowCarForm');
		if(form.getForm().isValid()) {
			commitTaskStore.baseParams = {};
			var baseparams = {
				"carFNum" : (Ext.get('carfnum').getValue() =='全部'? '': Ext.get('carfnum').getValue()),
				//"carBNum" : Ext.getCmp('carbnum').getValue(),
				"startTime" : Ext.getCmp('startdate').getValue(), //Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'),
				"endTime" : Ext.getCmp('enddate').getValue(), //Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d H:i:s'),
				"vilidTime" : Ext.getCmp('vilidTime').getValue(),
				"kakouTimes" : Ext.getCmp('kakouTimes').getValue(),
				"mounts" : Ext.getCmp('kkbhs').getValue(),
				"kkmcs" : Ext.getCmp('kkmcs').getValue()
			};
			commitTaskStore.baseParams = baseparams;
			commitTaskStore.load({
				callback : function(o,response,success) {
					if (o != null && o != 'undefined' && o.length > 0) {
						saveFlag = o[0].data.saveFlag;
						var win = new Jinpeng.widget.MessageWindow();
						if (saveFlag == '1') {
							win.msg = '任务提交成功，请耐心等待分析结果完成后再查询！';
						} else {
							win.msg = '任务提交失败，请重新提交或者咨询管理员！';
						}
						win.show();
						
					}
				}
				
			}); 
		}
	},
	
	resetMethod :  function() {
		Ext.getCmp("searchFollowCarForm").getForm().reset();
	}
});

var commitTaskdataFields = [
  {name : 'id'},
  {name : 'carNum'},
  {name : 'placeAndTime'},
  {name : 'image1'},
  {name : 'image2'},
  {name : 'image3'},
  {name : 'image4'},
  {name : 'image5'},
  {name : 'image6'},
  {name : 'image7'},
  {name : 'image8'},
  {name : 'image9'},
  {name : 'saveFlag'}
];


var dataFields = [
  {name : 'id'},
  {name : 'FOLLOW_CAR_NUM'},
  {name : 'placeAndTime'},
  {name : 'followTimes'},
  {name : 'image1'},
  {name : 'image2'},
  {name : 'image3'},
  {name : 'image4'},
  {name : 'image5'},
  {name : 'image6'},
  {name : 'image7'},
  {name : 'image8'},
  {name : 'image9'}
];

var commitTaskStore = new Ext.data.JsonStore({
	url : rootpath+ "/followCar/query/commitTask.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	fields : commitTaskdataFields
});


var commuServerStore = new Ext.data.JsonStore({
	url : rootpath+ "/followCar/query/findFollowCarFromDb.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	fields : dataFields
});

var colM = [
    new Ext.ux.grid.PagingRowNumberer({ width : 40, height : 50}),
    //sm,
    {header : '车牌号码', dataIndex : 'carNum',width : 30},
    {header : '卡口信息', dataIndex : 'placeAndTime',width : 100,align : 'left',
 	   renderer: function(val) {
 	   	   var datas = val.split(',');
 	   	   var newDada = "";
 	   	   for (var i = 0; i < datas.length; i++) {
 	   		   newDada += datas[i] + '<br>';
 	   	   }
 	   	   return newDada;
    	   }
    }
 ];

 
 /**
 * 伴随车数据列表--Grid
 */
Jinpeng.followCar.searchFollowCarGrid = Ext.extend(Ext.grid.GridPanel, {
	id : 'searchFollowCarDataGrid',
	border : false,
	pageSize : 5,
	autoScroll : true,
	width : 1000,
	initComponent : function() {
		var _panel = this;
		var sm = new Ext.grid.CheckboxSelectionModel();
		Ext.apply(this, {
			store :  commuServerStore,
			selModel : sm,
			colModel :  new Ext.grid.ColumnModel({
					defaults : {
					sortable : false,
					autoHeight:true
				},
				columns : colM
			}),
			bbar : new Jinpeng.widget.PagingToolbar( {
				id : 'PagingToolbarCar',
				store : commuServerStore,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			}),
			listeners : {
				afterrender : function() {
					_panel.store.data.length = 0;
					var datas = this.ownerCt.ownerCt.datas;
					//alert(datas.id);
					var baseparams = {
						"taskId" : datas.id,
						"carNum" : datas.carNum,
						"page.start" : 0,
						"page.limit" : 5
					};
					commuServerStore.baseParams = baseparams;
					commuServerStore.load({
						params : {'page.start' : 0, 'page.limit' : 5},
						callback : function(o,response,success) {
							//alert(o.length );
							if (o != null && o != 'undefined' && o.length > 0) {
								var rowData = o[0].data.placeAndTime.split(";");
								var carNum = datas.carNum;
								var realTimes = o[0].data.followTimes;
								//var maxLength = datas.kkbhs.split(',').length;
								var maxLength = datas.followTimes;
								/*if (realTimes > maxLength) {
									maxLength = realTimes;
								}*/
								/*for (var i = 0; i < o.length; i++) {
									if (maxLength < o[i].data.placeAndTime.split(";").length && carNum != o[i].data.carNum) {
										maxLength = o[i].data.placeAndTime.split(";").length;
										rowData = o[i].data.placeAndTime.split(";");
									}
								}*/
								var fields = new Array(maxLength);
								var columns = new Array(maxLength);
								var imageWH = 16*maxLength;
								var imageData = '';
								var data = null;
								var filedO = {}, columnsO = {};
								for (var j = 0; j < o.length; j++) {
									for (var i = 0; i < maxLength; i++) {
										//imageData = o[j].data.image + 'i';
										data = rowData[i].split(',');
										filedO.name = "image" + (i + 1) ; 	
										columnsO.header = data[0];
										columnsO.dataIndex = "image" + (i + 1);
										columnsO.width = 50;
										columnsO.renderer = function(imageData) {
											if (imageData != '' && imageData != null && imageData!= "null") {
												return '<img src="' + imageData + '" width="' + imageWH + '" height="' + imageWH + '"/>';
											} else {
												return '<img src="' + rootpath + '/themes/client/blue/images/null.jpg" width="' + imageWH + '" height="' + imageWH + '"/>';
											}
							    	    };
										fields[i] = filedO;
										columns[i] = columnsO;
										filedO = {}, columnsO = {}; //重置
									}
								}
								var columns = columns;
								var fields = fields;
								colM.length = 0; //清空数组
								colM.push( new Ext.ux.grid.PagingRowNumberer({ width : 40, height : 50}));
								colM.push( {header : '车牌号码', dataIndex : 'FOLLOW_CAR_NUM',width : 30,
									renderer: function(val) {
										var str = val;
										if (val == carNum) {
											str = '<span style="color:red;">' + val + '</span>';
										}
							            return str;
							      	}
								});
								colM.push( {header : '通过卡口及通过时间', dataIndex : 'placeAndTime',width : 100,align : 'left',
								 	   renderer: function(val) {
								 	   	   var datas = val.split(';');
								 	   	   var newDada = "";
								 	   	   for (var i = 0; i < datas.length; i++) {
								 	   		   newDada += datas[i] + '<br>';
								 	   	   }
								 	   	   return newDada;
							    	   }
							    });
								for ( var i = 0; i < fields.length; i++) {
									dataFields.push(fields[i]);
									colM.push(columns[i]);
								}
								Ext.getCmp('searchFollowCarDataGrid').reconfigure(commuServerStore, new Ext.grid.ColumnModel(colM));
							}
						}
					});
				}
			}
		});
		//图片放大事件 
		this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
			var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
			var recode = grid.store.getAt(rowIndex);
			var image = '';
			if (fieldName == 'image1' || fieldName == 'image2' || fieldName == 'image3' || fieldName == 'image4' 
				|| fieldName == 'image5' || fieldName == 'image6' || fieldName == 'image7' || fieldName == 'image8') {
				if (recode) {
					if (fieldName == 'image1' && recode.data.image1 != "null") {
						image = recode.get("image1");
					}
					if (fieldName == 'image2' && recode.data.image2 != "null") {
						image = recode.get("image2");
					}
					if (fieldName == 'image3' && recode.data.image3 != "null") {
						image = recode.get("image3");	
					}
					if (fieldName == 'image4' && recode.data.image4 != "null") {
						image = recode.get("image4");
					}
					if (fieldName == 'image5' && recode.data.image5 != "null") {
						image = recode.get("image5");
					}
					if (fieldName == 'image6' && recode.data.image6 != "null") {
						image = recode.get("image6");
					}
					if (fieldName == 'image7' && recode.data.image7 != "null") {
						image = recode.get("image7");
					}
					if (fieldName == 'image8' && recode.data.image8 != "null") {
						image = recode.get("image8");
					}
					this.showPicWindow(image, rowIndex, columnIndex);
				}
			}
		});
		Jinpeng.followCar.searchFollowCarGrid.superclass.initComponent.apply(this);
	},
	//图片放大显示
	showPicWindow : function(image, rowIndex, colIndex, item, event) {
		if (image != undefined && image != null && image != '') {
			//创建window窗体
			var win = new Jinpeng.followCar.ShowPictureWindow();
			win.image = image;
			win.show();
		}
	}
});
 
 

/**
 * 弹出窗口显示图片信息
 */
Jinpeng.followCar.ShowPictureWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
		width : 425,
		height : 480,
		title : '图片信息',
		closeAction : "close",
		plain : true,
		modal : true,
		border : false,
		image : '',
		initComponent : function() {
			var panels = this; 
			Ext.apply(this,{
				items : [ {
					xtype : 'form',
					region : 'center',
					id : 'pictureForm',
					layout : 'column',
					labelAlign : 'right',
					cls:'blue-button-ct',
					border : false,
					items : [ {
						//左边图片显示区域 
						columnWidth : 1.0,
						items : [ {
							//引用图片显示组件
							xtype : 'onlyShowBox',
							width : 420,
							height : 450
						}]
						
					}],
					
					bbar : {
						buttonAlign : 'center',
						buttons : [{
							xtype : 'button',
							text : '下载图片',
							id : 'picdownloadbtn',
							handler : function() {
								//获取当前记录的id
								var picUrl = panels.image;
								//根据Id下载图片
								linkDownloadPicture(picUrl);
								
								
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
			Jinpeng.followCar.ShowPictureWindow.superclass.initComponent.apply(this);
		},
		afterRender : function() {
			Jinpeng.followCar.ShowPictureWindow.superclass.afterRender.call(this);
			this.loadDetailById();
		},
		//加载数据
		loadDetailById : function() {
			var record = {};
			record.CARIMGURL = this.image;
			this.publish('loadPictures', record);
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
				url : rootpath +'/followCar/downLoadFollowCarImages.mvc',
				method : 'POST',
				params : {'idstr': idString},
				success : function(resp, opts) {
					var txt = Ext.util.JSON.decode(resp.responseText);
					//var data = txt.data;
					if(txt){
						window.open (txt,'_black');
						var win = new Jinpeng.widget.MessageWindow();
						win.msg = "图片下载成功...";
						win.show();
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

  

/**
 * 定时任务管理统计Grid
 */
Jinpeng.followCar.TaskStatisticsGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'TaskStatisticsFormPanel',
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var _panel = this;
		var commuServerStore = new Ext.data.JsonStore({
			url : rootpath+ "/dc/taskInfo.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
		          {name : 'ID'},
		          {name : 'TASK_NAME'},
		          {name : 'START_TIME'},
		          {name : 'END_TIME'},
		          {name : 'FOLLOW_START_TIME'},
		          {name : 'FOLLOW_END_TIME'},
		          {name : 'STATUS'},
		          {name : 'TASK_UPDATE_TIME'},
		          {name : 'TASK_PARAM'},
		          {name : 'CAR_NUM'},
		          {name : 'VALID_TIME'},
		          {name : 'FOLLOW_TIMES'},
		          {name : 'START_TIME'},
		          {name : 'END_TIME'},
		          {name : 'MOUNTS_NUMBER'},
		          {name : 'MOUNTS_NAME'},
		          {name : 'RESULT'}
	          ]
		});
		var sm = new Ext.grid.CheckboxSelectionModel();
		Ext.apply(this, {
			store :  commuServerStore,
			selModel : sm,
			colModel : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
		           new Ext.ux.grid.PagingRowNumberer({ width : 40 }),
		           {
		        	   header : '任务名称', 
		        	   dataIndex : 'TASK_NAME',
		        	   renderer : function(value, metaData, record, rowIndex, colIndex, store) {
		        	   		var str = "";
		        	   		if (value == '跟随车分析') {
		        	   			str = value;
		        	   		} else {
		        	   			str = value.substring(0,value.indexOf(2));
		        	   		}
		        	   		var id = record.data.ID;
		        	   		var carNum = record.data.CAR_NUM;
		        	   		var validTimes = record.data.VALID_TIME;
		        	   		var followTimes = record.data.FOLLOW_TIMES;
		        	   		var startTime = record.data.FOLLOW_START_TIME;
		        	   		var endTime = record.data.FOLLOW_END_TIME;
		        	   		var kkmcs = record.data.MOUNTS_NAME;
		        	   		var kkbhs = record.data.MOUNTS_NUMBER;
		        	   		var state = record.data.STATUS;
		        	   		var result = record.data.RESULT;
		        	   		if (str == '跟随车分析' && result == '分析完成') {
		        	   			if (state == '完成' || state == '结束' ) {
		        	   			str = "<a href='#' onclick=\"showFollowPage('" + id + "','" + carNum + "','" + validTimes + "','" + followTimes + "','" + startTime + "','" + endTime + "','" + kkbhs + "','" + kkmcs + "')\">" + str + "</a>"
		        	   			//str = "<a href='#' onclick=\"showFollowPage()\">" + str + "</a>";
		        	   			}
	        	   			}
		        	        return str;
					   } 
		           },
		           {header : '分析车牌', dataIndex : 'CAR_NUM'},
		           {header : '状态', dataIndex : 'STATUS'},
		           {header : '分析状态', dataIndex : 'RESULT'},
		           {header : '分析开始时间', dataIndex : 'FOLLOW_START_TIME',
		        	   renderer : function(value) {
		          			return value.substring(0,value.indexOf("."));
				   }},
		           {header : '分析结束时间', dataIndex : 'FOLLOW_END_TIME',
					   renderer : function(value) {
	          			  return value.substring(0,value.indexOf("."));
				   }},
		           {header : '任务启动时间', dataIndex : 'TASK_UPDATE_TIME',
					   renderer : function(value) {
					   		if (value) {
					   			return value.substring(0,value.indexOf("."));
					   		} else {
					   			return '';
					   		}
	          		   }
		           }/*,
		           {
		        	   header : '执行参数', dataIndex : 'TASK_PARAM',
	                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
		        	   		var str = '';
		        	   		if (value != '' && value != null && value != 'null') {
								//当文字过多的时候，鼠标移上去就给悬浮狂提示
		        	   			str = '<font ext:qtip="'+value+'">'+value+'</font>';
		           			}
		        	   		return str;
						}
		        	   
		           }*/
	            ]
			}),
			bbar : new Jinpeng.widget.PagingToolbar( {
				id : 'PagingToolbar',
				store : commuServerStore,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			}),
			listeners : {
				afterrender : function() {
					var baseparams = {
						'startTime' : Ext.getCmp('startdate').getValue(),
						'endTime' : Ext.getCmp('enddate').getValue()
					};
					commuServerStore.baseParams = baseparams;
					
					commuServerStore.load({
						params : {'taskName':'跟随车分析', 'page.start' : 0, 'page.limit' : this.pageSize}
					});
					
				}
			}
		});
		Jinpeng.followCar.TaskStatisticsGridPanel.superclass.initComponent.apply(this);
	}
});


/*
 *跟随车弹出窗口 
 */

Jinpeng.followCar.FollowCarWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	layout : "fit",
	width : 950,
	height : 400,
	resizable : false,
	closeAction : "close",
	stateful:false,
	plain : true,
	modal : true,
	border : false,
	datas : {},
	initComponent : function() {
		Ext.apply(this, {
			items : [ {
				xtype : 'followCarFormPanel'
			} ]
		});
		Jinpeng.followCar.FollowCarWindow.superclass.initComponent.apply(this);
	}
});


/**
 * north区域表单部份
 */
Jinpeng.followCar.FollowCarFormPanel = Ext.extend(Ext.Panel,{
	callBackFun : null,
	height : 500,
	initComponent : function() {
	
		/*
		//车牌号
		var carNumStore = new Ext.data.JsonStore({
			url : rootpath
					+ "/dictionary/jsonDictsInCombo.mvc?code=LicPlate",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false
		});
		
		var testStore = new Ext.data.JsonStore({
			//storeId:'pigOwnerStore',   
	        url: rootpath + "/dictionary/jsonDictsInCombo.mvc?code=ApprovalState",   
	        root: 'data',   
	        //totalProperty: 'totalCount',   
	        //remoteSort: true,   
	        fields: ['id','text'],
	        autoLoad : false
		});
		
		var timeSpinner = new Ext.ux.form.SpinnerField({
			name : 'vilidTime',
			id : 'vilidTime',
			fieldLabel : '&nbsp;&nbsp;有效时间',
			disabled: true,
			width : 60,
			value : '5',
			tooltip : {
				text : "有效时间指的是主车跟伴随车经过同一个卡口的时间差"
			},
			cellWidth : 210,
			minValue : 1,
			maxValue : 30,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
		
		var kakouSpinner = new Ext.ux.form.SpinnerField({
			name : 'kakouTimes',
			id : 'kakouTimes',
			fieldLabel : '&nbsp;&nbsp;跟随卡口数',
			disabled: true,
			width : 60,
			value : '3',
			tooltip : {
				text : "跟随卡口数指的是跟随车跟随主车所经过的卡口总数"
			},
			cellWidth : 210,
			minValue : 2,
			maxValue : 8,
			allowBlank : false,
			allowDecimals : false,
			incrementValue : 1,
			accelerate : true
		});
	    */
		/** 设定参数 */
		Ext.apply(	this,{
			layout : 'border',
			border : false,
			defaults : {
				margins : '0 0 0 0'
			},
			items : [{
				region : 'center',
				margins:'10 0 0 0',
				height : 570,
				xtype : 'searchFollowCarGrid',
				ref : "../grid"
			}],
			listeners : {
				afterrender : function() {
					
				}
			}
		});
		Jinpeng.followCar.FollowCarFormPanel.superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Jinpeng.followCar.FollowCarFormPanel.superclass.afterRender.call(this);
	}
});




Ext.reg('searchFollowCarForm', Jinpeng.followCar.searchFollowCarForm);
Ext.reg('searchFollowCarGrid', Jinpeng.followCar.searchFollowCarGrid);
Ext.reg('taskStatisticsGrid', Jinpeng.followCar.TaskStatisticsGridPanel);
Ext.reg('followCarFormPanel', Jinpeng.followCar.FollowCarFormPanel);
//Ext.reg('followCarGridPanel',Jinpeng.followCar.searchFollowCarGrid);
