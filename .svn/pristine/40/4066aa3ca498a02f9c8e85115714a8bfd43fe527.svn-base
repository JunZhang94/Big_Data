/**
 * 假牌车辆库查询
 */
Ext.ns('Jinpeng.carQurey');

var viewPort = null;

var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();

Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'north',
			height : 75,
			border : false,
			xtype : 'fakeCarNumFormPanel'
		}, {
			region : 'center',
			border : false,
			xtype : 'fakeCarNumGridPanel'
		}]
	});
});

//这是调节器控件(默认值为5最大值为100)
var gccsSpinner = new Ext.ux.form.SpinnerField({
    name : 'amounts',
	id : 'amounts',
	fieldLabel : '&nbsp;&nbsp过车次数',
	width : 60,
	tooltip : {
		text : ""
	},
	cellWidth : 210,
	minValue : 0,
	maxValue : 100,
	allowBlank : true,
	allowDecimals : false,
	incrementValue : 1,
	accelerate : true
});

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
	Ext.getCmp('passStation').setValue(data.text);
	Ext.getCmp('directions').setValue(data.id);
	Ext.getCmp('mywin').hide();
};
var cancelKK=function(data){
	Ext.getCmp('passStation').setValue("");
	Ext.getCmp('directions').setValue("");
	Ext.getCmp('mywin').hide();
};
/**
 * 车辆库查询--Form
 */
Jinpeng.carQurey.FakeCarNumFormPanel = Ext.extend(Ext.Panel, {
	initComponent : function() {
	
		//车牌号
		var carNumStore = new Ext.data.JsonStore({
			url : rootpath
					+ "/dictionary/jsonDictsInCombo.mvc?code=LicPlate",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false
		});
	
		//车牌颜色
			var carNumColorStore = new Ext.data.JsonStore({
						url : rootpath
								+ "/dictionary/jsonDictsInCombo.mvc?code=LicPlateColor",
						root : "data",
						fields : [ 'id', 'text' ],
						autoLoad : false
		});
		//车辆类型
			var carTypeStore = new Ext.data.JsonStore({
						url : rootpath
								+ "/dictionary/jsonDictsInCombo.mvc?code=CarType",
						root : "data",
						fields : [ 'id', 'text' ],
						autoLoad : false
					});
		//alert("heihei!!");
		//设置默认值
		Ext.getCmp('amounts').setValue(2);
		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'fakeCarNumForm',
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
					columns : 3
				},
				
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
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
							triggerAction : 'all',
							valueField : 'id',
							displayField : 'text'
	                    }, {
	                    	flex : 0.6,
	                    	xtype : 'textfield',
							id : 'carbnum',
							name : 'carbnum',
							emptyText : '请输入车牌',
							// 支持?代替一个位置
							vtype:'trackCarNum'
	                    }]
					}]
				},{
						//colspan:3,
						width:350,
						items : [{
							xtype : 'compositefield',
							items : [ {
								flex : 0.5,
								fieldLabel : '卡点',
								xtype : 'tooltiptextfield',
								name : 'passStation',
								id : 'passStation',
								width : 150,
								emptyText : '请选择卡点'
							}, {
								flex : 0.5,
								owner : this,
								labelAlign : 'right',
								xtype : 'button',
								text : '选择卡口',
								id:'choosekkBtn',
								handler : function(){
								
								
									/*var treePanel = new Ext.tree.TreePanel({
									    width:568,
									    height:300,
									    checkModel: 'cascade',   //对树的级联多选
									    onlyLeafCheckable: false,//对树所有结点都可选
									    animate: false,
									    rootVisible: false,
									    autoScroll:true,
									    loader: new Ext.tree.TreeLoader({
										   	url  :rootpath + '/systemOrg/onlyOrgTreeByKkmc.mvc',
										    baseAttrs: { uiProvider: Ext.ux.TreeCheckNodeUI } //添加 uiProvider 属性
									    }),
									    root: new Ext.tree.AsyncTreeNode({ id:'440100' })
									});*/
								
									/*var kkwin = new Ext.Window({
										title : '选择卡口',
										closable : true,
										width : 700,
										height : 500,
										closeAction : "close",
										layout : 'fit',
										padding : 50,
										modal : true,
										items : [treePanel]
									});
									kkwin.show();*/
									//alert('sss');
									
									kwin.show();
								}
							
							} ]
						}]
					}, {
					items : [{
						xtype: 'compositefield',
						anchor : '94%',
						items: [ {
				        	xtype : 'checkbox',
							id : 'confimFlag',
							fieldLabel: '已确认',
							name : 'confimFlag',
							value : false,
							checked : false
				        }]
					}]
				    }/*, {
						xtype : 'spacer'
					}, {
					items : [ {
						xtype : 'tcombo',
						id : 'carnumcolor',
						name : 'carnumcolor',
						fieldLabel : '车牌颜色',
						store : carNumColorStore,
						mode : 'local',
						emptyText : '全部',
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'text',
						anchor : '94%'
					} ]
				}*/, {
					items : [ {
						xtype : 'tcombo',
						id : 'cartype',
						name : 'cartype',
						fieldLabel : '车辆类型',
						store : carTypeStore,
						mode : 'local',
						emptyText : '全部',
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'text',
						anchor : '94%'
					} ]
				},/*{
					items: [ {
                    	//flex : 0.6,
                    	xtype : 'textfield',
                    	fieldLabel : '过车次数',
						id : 'amounts',
						name : 'amounts',
						emptyText : '请输入过车次数',
						// 支持?代替一个位置
						vtype:'carNumSuffix'
                    }]
				 },*/ {
				//表单
			//	xtype : 'form',
			//	id : 'faultStateForm',
			//	labelAlign : 'right',
			//	border : false,
				//frame : true,
			//	cls : 'blue-button-ct',
				//bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD ;margin-top:6px;',
				items : [{
				xtype: 'compositefield',
				anchor : '94%',
		         items: [ gccsSpinner, {
	                   flex : 0.6,
	                   xtype : 'label',
	                   text : '次'
	                  }]
				},{
					
				}]
			},
				{
					items : [{
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
						id : 'searchBut',
						handler : this.deviceCheck
					}]
				},{
					items : [{
						xtype : 'hidden',
						id : 'directions',
						name : 'directions'
					}]
				}]
			}],
			listeners : {
				afterrender : function() {
				carNumStore.load();
				/*车牌颜色Store*/
				carNumColorStore.load();
				/*车辆类型Store*/
				carTypeStore.load();
				}
			}
		});
		Jinpeng.carQurey.FakeCarNumFormPanel.superclass.initComponent.apply(this);
	},
	alarmSearch : function() {
			var form = Ext.getCmp('searchAlarmForm');
			if (form.getForm().isValid()) {
				var grid = Ext.getCmp('alarmGridPanel');
				grid.store.baseParams = {};// 重置
				/** 将参数传入后台 */
				var baseparams = {
					"carFNum" : (Ext.getCmp('carfnum').getValue() =='全部'? '': Ext.getCmp('carfnum').getValue()),
					"carBNum" : Ext.getCmp('carbnum').getValue(),
					//"carNumColor" : (Ext.getCmp('carnumcolor').getValue() == '' ? -1 : Ext.getCmp('carnumcolor').getValue()),
					"carType" : (Ext.getCmp('cartype').getValue() == '' ? -1 : Ext.getCmp('cartype').getValue()),
					"passStation" : Ext.getCmp('passport').getValue(),
					"startTime" : Ext.getCmp('startdate').getValue(),//Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'),
					"endTime" : Ext.getCmp('enddate').getValue(),//Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d H:i:s'),
					//"alarmDealStatus" : (Ext.getCmp('alarmdealstatus').getValue() == '' ? -1 : Ext.getCmp('alarmdealstatus').getValue()),
					"alarmType" : (Ext.getCmp('alarmType').getValue() == '' ? -1 : Ext.getCmp('alarmType').getValue()),
					'sort' : 'capDate',
					'dir' : 'DESC'
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
		},
		resetMethod :  function() {
			Ext.getCmp('searchAlarmForm').getForm().reset();
		},
	deviceCheck : function() {
		var form = Ext.getCmp('fakeCarNumForm');
		if(form.getForm().isValid()) {
			var grid = Ext.getCmp('fakeCarNumDataGrid');
			grid.store.baseParams = {};
			var baseparams = {
				"carFNum" : (Ext.getCmp('carfnum').getValue() =='全部'? '': Ext.getCmp('carfnum').getValue()),
				"carBNum" : Ext.getCmp('carbnum').getValue(),
			  //"carNumColor" : (Ext.getCmp('carnumcolor').getValue() == '' ? -1 : Ext.getCmp('carnumcolor').getValue()),
					
			  
			  "carType" : (Ext.getCmp('cartype').getValue() == '' ? -1 : Ext.getCmp('cartype').getValue()),
			 //卡口编号
			  "kkbhs" : Ext.getCmp('directions').getValue(),
			  //过车次数
			  "amounts":Ext.getCmp('amounts').getValue() == '' ? -1 : Ext.getCmp('amounts').getValue(),
					//"passStation" : Ext.getCmp('passport').getValue(),
					//"startTime" : Ext.getCmp('startdate').getValue(),//Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s'),
					//"endTime" : Ext.getCmp('enddate').getValue()//Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d H:i:s'),
			  'confimFlag' : Ext.getCmp('confimFlag').getValue() == false ? '0' : '1'
					
			};
			grid.store.baseParams = baseparams;
			grid.store.load({
				params : {'page.start' : 0, 'page.limit' : Jinpeng.PageSize}
			});
		}
	}
});

/**
 * 车辆库查询--Grid
 */
Jinpeng.carQurey.FakeCarNumGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'fakeCarNumDataGrid',
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var _panel = this;
		var commuServerStore = new Ext.data.JsonStore({
			url : rootpath+ "/fackCarNum/fackCarNumSearch.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
				  {name:'ID'},
		          {name : 'HPHM'},
		          {name : 'CSYS'},
		          {name : 'HPZL'},
		          {name : 'CLLX'},
		          {name : 'CLPP'},
		          {name : 'KKBH'},
		          {name : 'KKMC'},
		          {name : 'DWMC'},
		          {name : 'SUM_AMOUNTS'},
		          {name : 'ALL_AMOUNTS'},
		          {name : 'AMOUNTS'},
		           {name : 'OPERATE_STATUS'}
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
			           sm,
			           {header : '车牌号码', dataIndex : 'HPHM', renderer : function(val) {
							var str = "";
							if (val != '-' && val != '无车牌' && val != '无牌') {
								str = "<a href='#' onclick=\"showCarPlace('" + val + "')\">" + val + "</a>";
							} else {
								str = val;
							}
							return str;
						}},
			           {header : '车身颜色', dataIndex : 'CSYS',renderer : function(value) {
							return window.dictionary.getValue("CarColor", value);
						}},
			           {header : '号牌种类', dataIndex : 'HPZL', renderer : function(key) {
							return window.dictionary.getValue("LicPlateType", key);
						}},
			           {header : '车辆类型', dataIndex : 'CLLX',renderer : function(key) {
							return window.dictionary.getValue("CarType", key);
						}},
					   {header : '单位名称', dataIndex : 'DWMC',renderer : function(key) {
						    var str = '';
							if (key == '' || key == 'null') {
								str = '无';
							} else {
								str = key;
							}
							return str;
						}},
			           {header : '卡口名称', dataIndex : 'KKMC',renderer : function(key) {
						    var str = '';
							if (key == '' || key == 'null') {
								str = '无';
							} else {
								str = key;
							}
							return str;
						}},
						{header : '出现总次数', dataIndex : 'SUM_AMOUNTS'},
						{header : '分局出现次数', dataIndex : 'ALL_AMOUNTS'},
						{header : '卡口出现次数', dataIndex : 'AMOUNTS'},
						{header : '操作状态', dataIndex : 'OPERATE_STATUS',renderer:function(value){
			        	   var str = '';
			        	   if (value == '1') {
			        		   str = "已确认";
			        	   } else {
			        		   str = "未确认";
			        	   }
			        	   return str;
			           }}
	            ]
			}),
			tbar : {
				cls : 'blue-button-ct',
				items : [{
					xtype : 'tbspacer',
					width : 10
				},  {
					xtype : 'button',
					id : 'confimBtn',
					text : '确认',
					handler : function(){
						if (Ext.getCmp('fakeCarNumDataGrid').getSelectionModel().getSelections()=='') {
							var win = new Jinpeng.widget.MessageWindow();
							win.msg = '请勾选需要确认的记录！';
							win.show();
						}else{
							_panel.confimFake();
						}	
					}
				}]
				
			},
			bbar : new Jinpeng.widget.PagingToolbar( {
				id : 'PagingToolbar',
				store : commuServerStore,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			})
		});
		Jinpeng.carQurey.FakeCarNumGridPanel.superclass.initComponent.apply(this);
	},
	confimFake : function(){
		var ids = [];
		var records = Ext.getCmp('fakeCarNumDataGrid').getSelectionModel().getSelections();
		//alert(records.length);
		if (records != "") {
			for ( var i = 0; i < records.length; i++) {
				var status = records[i].get('OPERATE_STATUS');
				if (status == '0') {
					ids[ids.length] = records[i].get('ID');
				}
			}
		}
		var idString = ids ? ids.join(',') : '';
		if(idString!=''){
			Ext.Ajax.request({
					// 将id组合成字符串传递到后台
					url : rootpath + '/car/confimFake.mvc',
					method : 'POST',
					params : {'idstr': idString},
					success : function(resp, opts) {
						var win = new Jinpeng.widget.MessageWindow();
						win.msg = "确认成功！";
						win.show();
						var grid = Ext.getCmp('fakeCarNumDataGrid');
						grid.publish("clearGridSelections", []);
						grid.store.reload();
					},
					failure : function(resp, opts) {
						var win = new Jinpeng.widget.MessageWindow();
						win.msg = "确认失败！请重试！";
						win.show();
					}
				});
		 }
	},
});

function showCarPlace(carNum) {
	var orgId ='';
	var orgType = '';
	var kkbhs = '';
	var dateStr = new Date().format('Y-m-d');
	var startTime = dateStr + ' 00:00:00';
	var endTime = dateStr + ' 23:59:59';
	var mainParam = {
		'orgId' : orgId,
		'orgType' : orgType,
		'kkbhs' : kkbhs,
		'startTime' : startTime,
		'endTime' : endTime,
		'carNum' : carNum,
		'counts' : 500
	};
	var win = new Jinpeng.trackSearch.TrackSeachWindow({
		cls : 'system_mod',
		modal : true,
		mainParam : mainParam
	});
	win.init(mainParam);
	win.show();
}

Ext.reg('fakeCarNumFormPanel', Jinpeng.carQurey.FakeCarNumFormPanel);
Ext.reg('fakeCarNumGridPanel', Jinpeng.carQurey.FakeCarNumGridPanel);
