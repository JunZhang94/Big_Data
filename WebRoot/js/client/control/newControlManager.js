/**
 * 布控功能。布控查询及布控设防
 */
Ext.ns("Jinpeng.newControl");

var params;//查询条件
var exportParams;//导出查询条件参数结构
var conditions;//页面查询组件
var showKkmcs; //用逗号分隔显示的卡口名称
var viewPortObj = null;
var treeLable = '';
var textLable = '';
var buttonLable = '';
var treeUrl = '/Big_Data/zTree/demo/cn/excheck/multiSelectTree1.html';
var dataUrl="";
var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
var gisHeight = hh - 60;
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
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="' + treeUrl + '"></iframe>'
	});

var setKKValue=function(data){
	showKkmcs = data.text;
	var kkmcs = showKkmcs.replace(/,/g,'\n');
	Ext.getCmp('passStation').setValue(kkmcs);
	Ext.getCmp('directions').setValue(data.id);
	Ext.getCmp('mywin').hide();
	};

Ext.onReady(function() { 
	Ext.useShims = true;
	var hh = Ext.getBody().getHeight();
	if (typeof(parent.cotrolWin) != 'undefined') {
		hh = parent.cotrolWin.height - 35;
	}
	viewPortObj = new Ext.Viewport({
		layout : 'border',
		items : [{
				region : 'west',
				border : false,
				height : 115,
				// 自定标签
				xtype : 'formPanel'
				},{
				region : 'center',
				border : false,
				xtype : 'panel',
				items : [{
					html: "<iframe id='gisInfoIframe' src='http://" + ipAdress + "/PGISViewer/PGISViewer.html' width='100%' height='" + hh + "' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
					}]
				}]
		});
	});
/**
 * north区域表单部份
 */
Jinpeng.newControl.FormPanel = Ext.extend(Ext.Panel,{
	id:'formId',
	url :rootpath + '/controlManager/saveControl.mvc',
	window : null,
	initComponent : function() {
		this.window = this;
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
			callback : function(id, text, coding){
				Ext.getCmp('surveyCarDetailForm').form.findField('surveyOrgId').setValue(id);
				},
			listeners : {
				afterRender: function(combo) {
						Ext.Ajax.request({
							method : "POST",
							async:false,
							url : rootpath + "/systemOrg/loadOnlyTopOrgTreeMap.mvc",
							success :function(response, options) {
								var data=response.responseJSON.data.text;
								Ext.getCmp('orgName').setValue(data);
						}
					});
				}
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
			url : rootpath + "/dictionary/jsonCarBrandInCombo.mvc",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false           
			});
		//车辆类别
		var carCategoryStore = new Ext.data.JsonStore({
			url : rootpath
					+ "/dictionary/jsonCarCategoryInCombo.mvc",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false
			});
		
		Ext.apply(this,{
			items : [ {
				// form表单
				xtype : 'form',
				id : 'surveyCarDetailForm',
				border : false,
				frame : true,
				cls : 'blue-button-ct',
				layout : 'form',
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				height : Ext.getBody().getHeight(),
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
					xtype : 'fieldset',
					layout : "table",
					width : 650,
					title : '布控信息',
					defaults : {
						width : 300,
						layout : 'form'
					 },
					 layoutConfig : {
						columns : 2
					 },
					 items : [{
						id : 'hphmItem1',
						hidden :true,
						items : [ {
							xtype : 'textfield',
							id : 'carNum',
							fieldLabel : '&nbsp;精确车牌号码',
							name : 'carNum',
							allowBlank : true,
							blankText : "请输入车牌号码",
							vtype : 'exactCarNum',
							anchor : '95%'
							}]
						},{
							xtype : 'tbspacer'
			          	},{
							id : 'hphmItem2',
							hidden :true,
							items : [ {
								xtype : 'textfield',
								id : 'carNum2',
								fieldLabel : '&nbsp;模糊车牌号码',
								name : 'carNum2',
								allowBlank : true,
								blankText : "请输入车牌号码",
								vtype : 'controlCarNum',
								anchor : '95%'
								}]
			          	},{
							xtype : 'tbspacer'
			          	},{
							id : 'brandItem',
							hidden :true,
							items: [ {
								xtype : 'jplovcombo',
								fieldLabel : '&nbsp;车辆品牌',
								allowBlank : true,
								blankText : '请选择车辆品牌',
								editable : false,
								mode : 'local',
								id : 'carBrandWin',
								name : 'carBrandWin',
								emptyText : '请选择...',
								valueField : 'id',
								triggerAction : 'all',
								displayField : 'text',
								store : carBrandStore,
								anchor : '95%'
					        	}]
			          	},{
			          		xtype : 'tbspacer'
			          	},{
		          	  		id : 'lbItem',
		          	  		hidden :true,
		          	  		items : [ {
								xtype : 'jplovcombo',
								id : 'carCategory',
								name : 'carCategory',
								fieldLabel : '车辆类别',
								store : carCategoryStore,
								mode : 'local',
								emptyText : '全部',
								autoSelect : true,
								showSelectAll: true,
								triggerAction : 'all',
								valueField : 'text',
								displayField : 'text',
								anchor : '95%'
		          	  			}]
			          	},{
			          		items : [{
								xtype : 'hidden',
								name : 'bkCategory'
								}]
			          	},{
							items : [{
								xtype : 'hidden',
								name : 'id'
								}]
			          	},{
							items : [{
								xtype : 'hidden',
								name : 'surveyOrgId'
								}]
			          	},{
							items : [{
								xtype : 'tcombo',
								fieldLabel : '&nbsp;布控类型',
								name : 'controlType',
								//id : 'surType',
								blankText : '请选择布控类型',
								anchor : '95%',
								mode : 'local',
								editable : false,
								selectOnFocus : true,
								allowBlank : true,
								forceSelection : true,
								triggerAction : 'all',
								valueField : 'id',
								displayField : 'text',
								emptyText : '请选择...',
								store : controlTypeStore
								}]
			          	},{
			          		items : [ comboBoxTree ]
			          	},{
							items : [{
								xtype : 'textfield',
								fieldLabel : '&nbsp;联系人',
								name : 'linkMan',
								maxLength : 60,
								anchor : '95%'
								}]
			          	},{
							items : [{
								xtype : 'textfield',
								fieldLabel : '&nbsp;联系电话',
								name : 'linkManPhone',
								maxLength : 50,
							//	regex:/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})))$/,
							//	regexText:'输入正确的联系电话',
								anchor : '95%'
								}]
			          	},{
							colspan:2,
							width:650,
							items : [{
								xtype : 'textarea',
								name : 'describer',
								id : 'describer',
								fieldLabel : '&nbsp;&nbsp;简要案情',
								anchor : '95%',
								maxLength : 300,
								maxLengthText : '简要案情不能超过300个字符',
								height : 70
								}]
			          	}]
					},{
						xtype : 'fieldset',
						layout : "table",
						width : 650,
						title : '时间信息',
						defaults : {
							width : 300,
							layout : 'form'
						},
						layoutConfig : {
							columns : 2
						},
						items : [{
							items : [{
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
									    var defaultDateTimeParams = new function(){   
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
							},{
							items : [{
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
									    var defaultDateTimeParams = new function(){   
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
						}]
					},{
						xtype : 'fieldset',
						layout : "table",
						width : 650,
						title : '空间信息',
						defaults : {
							width : 300,
							layout : 'form'
						},
						layoutConfig : {
							columns : 2
						},
						items : [{
							colspan:2,
							width:610,
							items : [{
							xtype : 'compositefield',
							items : [{
								flex : 0.2,
								owner : this,
								xtype : 'button',
								text : '选择卡口',
								id:'choosekkBtn',
								handler : function(){	
									kwin.show();
									}
								},{
								flex : 0.15,
								cls : 'labelalign2',
								xtype : 'displayfield',
								id : 'select_point',
								html : "<img id='selectPoint' onmouseover=\"IMG_INFO.overRepalceImg(0)\" onmouseout=\"IMG_INFO.outRepalceImg(0)\" onclick=\"rectSelect(0)\" src='" + rootpath + "/images/buttons/select_point.png'\>"
								},{
								flex : 0.15,
								cls : 'labelalign3',
								xtype : 'displayfield',
								id : 'select_rect',
								html : "<img id='selectRect' onmouseover=\"IMG_INFO.overRepalceImg(1)\" onmouseout=\"IMG_INFO.outRepalceImg(1)\" onclick=\"rectSelect(2)\" src='" + rootpath + "/images/buttons/Select_Rect.png'>"
								},{
								flex : 0.15,
								cls : 'labelalign4',
								xtype : 'displayfield',
								id : 'select_circle',
								html : "<img id='selectCircle' onmouseover=\"IMG_INFO.overRepalceImg(2)\" onmouseout=\"IMG_INFO.outRepalceImg(2)\" onclick=\"rectSelect(2)\" src='" + rootpath + "/images/buttons/Select_Circle.png'>"
								},{
								flex : 0.15,
								cls : 'labelalign5',
								xtype : 'displayfield',
								id : 'select_multiRect',
								html : "<img id='selectMultiRect' onmouseover=\"IMG_INFO.overRepalceImg(3)\" onmouseout=\"IMG_INFO.outRepalceImg(3)\" onclick=\"rectSelect(1)\" src='" + rootpath + "/images/buttons/Select_MultiRect.png'>"
								},{
								flex : 0.2,
								cls : 'labelalign6',
								xtype : 'displayfield',
								id : 'clear_select',
								html : "<img id='clearSelect' onmouseover=\"IMG_INFO.overRepalceImg(4)\" onmouseout=\"IMG_INFO.outRepalceImg(4)\" onclick=\"cleanSelect()\" src='" + rootpath + "/images/buttons/Select_Layer.png'>"
								}]
							}]
						},{
							colspan:2,
							width:650,
							items : [{
								fieldLabel : treeLable,
								xtype : 'textarea',
								height : 250,
								readOnly : 'ture',
								name : 'passStation',
								id : 'passStation',
								width : 470,
								emptyText : textLable
							}]
						},{
							colspan:2,
							width:650,
							items : [{
								xtype : 'compositefield',
								bodyStyle : 'padding-right:30px',
								items : [{
									xtype : 'button',
									flex : 31,
									region : "center",
									cls : 'buttunsearch',
									id : "submitBut",
									text : '&nbsp;&nbsp;&nbsp;提交&nbsp;&nbsp;&nbsp;',
									handler : this.addNewControlHandler
									},{
									flex : 31,
									xtype : 'button',
									cls : 'buttunreset',
									region : "center",
									id : "resetBut",
									text : '&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;',
									handler : this.resetForm
									}]
								}]
						},{
							items : [{
								xtype : 'hidden',
								id : 'directions',
								name : 'directions'
								}]
				       }]
				 }]
				}],
			listeners : {
				afterrender : function() {
					this.controlView(bkCategory);
					controlTypeStore.load();
					carBrandStore.load();
					carCategoryStore.load();
					if(editId !=null && editId!= 'null'){
						loadRecordById(editId);
					}
					if (typeof(parent.congtolCarNum) != 'undefined') {
						Ext.getCmp('carNum').setValue(parent.congtolCarNum);
						}
					}
				}
			});
		Jinpeng.newControl.FormPanel.superclass.initComponent.apply(this);
		},
		controlView : function(bkCategory){
			if(bkCategory==1){
				Ext.getCmp('hphmItem1').setVisible(true);
				Ext.getCmp('carNum').allowBlank =false;
			}else if(bkCategory==2){
				Ext.getCmp('hphmItem2').setVisible(true);
				Ext.getCmp('carNum2').allowBlank =false;
			}else if(bkCategory==3){
				Ext.getCmp('brandItem').setVisible(true);
				Ext.getCmp('carBrandWin').allowBlank =false;
			}else if(bkCategory==4){
				Ext.getCmp('lbItem').setVisible(true);
				Ext.getCmp('carCategory').allowBlank =false;
			}else{
				Ext.getCmp('hphmItem1').setVisible(true);
				Ext.getCmp('carNum').allowBlank =false;
			}
		  },
		addNewControlHandler : function(btn, e) { 
			var formPanel = Ext.getCmp('surveyCarDetailForm');
			var window = Ext.getCmp('formId');
			var form = formPanel.getForm();
			var id = form.findField("id").getValue() ;
			var actionFn = window.saveOrUpdateControl.createDelegate(window,[btn, e,id]);
			//校验必填项
			if(form.isValid()){
				var carNumber = form.findField("carNum").getValue();
				window.saveOrUpdateWithCheckCarNum(actionFn,carNumber,id);
			}
		},
		saveOrUpdateControl : function(btn, e,id) {
			var tmpParam=this.getPageParms();
			btn.disable();
			if(id !=null && id.length>0){
				this.url=rootpath + '/controlManager/updateControl.mvc';
			}
			Ext.Ajax.request({
				method : "POST",
				params : tmpParam,
				url : this.url,
				success : function(response, options) {
					btn.enable();
					var msg="布控成功！请到布控管理页面确认！";
					if(id !=null && id.length>0){
						msg = '修改成功！请到布控管理页面确认！';
					}
					Ext.MessageBox.alert("温馨提示",msg,this.callBack);
				},
				failure : function(response, options) {
					btn.enable();
				},
				scope : this
				});
			},
		saveOrUpdateWithCheckCarNum :function(actionFn,carNum,id){
			if(id !=null && id.length>0){
				actionFn();
			}else{
				if(-1 === this.isCarNumExists(carNum,id)){
					Ext.Msg.confirm("提示", "该布控已经存在，确认重复布控？" , function(id) {
						if ("yes" == id) {
							actionFn();
						}
					}, this);
				}else{
					actionFn();
				}
			}
		},
		isCarNumExists: function(carNum,id){
			var result = true;
			var tmpParam=this.getPageParms();
			Ext.Ajax.request({
				url : rootpath + '/controlManager/checkCarNum.mvc',
				async : false,
				params :tmpParam,
				success : function(r,o) {
					var response = Ext.decode(r.responseText);
					result = response.data;
				},
				scope : this
			});
			return result;
		},
		getPageParms: function(){
			var formPanel = Ext.getCmp('surveyCarDetailForm');
			var controlCarData = formPanel.getForm().getFieldValues();
			var carNum = formPanel.getForm().findField("carNum").getValue();
			if(bkCategory==2){
				carNum = formPanel.getForm().findField("carNum2").getValue();
			}
			var params = {
				"id" : controlCarData.id,
				"carNum" : carNum,
				"controlType" : controlCarData.controlType,
				"startDate" : Ext.getCmp("bDate").getValue(),//controlCarData.startDate,
				"endDate" : Ext.getCmp("lDate").getValue(),//controlCarData.endDate,
				"linkMan" : controlCarData.linkMan,
				"linkManPhone" : controlCarData.linkManPhone,
				"orgName" : controlCarData.orgName,
				"describer" : controlCarData.describer,
				"carBrandWin" : controlCarData.carBrandWin,
				"carCategory" : controlCarData.carCategory,
				"bkfw" : controlCarData.directions,
				"bkCategory" : bkCategory
			};
			return params;
		},
		loadEmptyRapidControl : function(){
			this.applyType = Jinpeng.control.ControlApplyType.RAPID;
			this.defaultValues = [{key:'applyType',value:Jinpeng.control.ControlApplyType.RAPID,disabled:true},{key:'surLevel',value:1,disabled:true},
			                      {key:'controlType',value:10,disabled:true},{key:'endDate',value:new Date().add(Date.DAY,3),disabled:true}];
			this.loadEmptyRecord({'surLevel':1,'controlType':10});// 1 拦截类 10 临时布控
		},
		loadEmptyCascadeControl : function(){
			this.applyType = Jinpeng.control.ControlApplyType.CASCADE;
			this.defaultValues = [{key:'applyType',value:Jinpeng.control.ControlApplyType.CASCADE,disabled:true}];
			this.loadEmptyRecord();
		},
		callBack : function(){
			if (typeof(parent.win) != 'undefined') {
				parent.closeControlWin();
			} else {
				document.location.reload();
			}
		},
		resetForm : function() {
			Ext.getCmp('surveyCarDetailForm').form.reset();
			}
		});
	var IMG_INFO = {
			overRepalceImg : function(value) {
				if (value == 0) {
					var pic = Ext.getCmp('select_point');
					//pic.html = "<div id='selectRect' onmouseover=\"IMG_INFO.overRepalceImg(1)\" onmouseout=\"IMG_INFO.outRepalceImg(1)\" onclick=\"rectSelect(2)\"><img src='" + rootpath + "/images/buttons/Select_Rect.png'></div>";
					var a = '';
				}
			},
			outRepalceImg : function(value) {
				if (value == 0) {
					
				}
			}
		};
//地图卡口选择
function rectSelect(type) {
	cleanSelect();
	window.gisInfoIframe.GIS_StartSelectCamera(type,function(values) {
		var datas = Ext.decode(values);
		var length = datas.length;
		var source = datas.source;
		var kkbhStr = "";
		var kkmcStr = "";
		for (var i = 0; i < length; i++) {
			if (kkbhStr != "") {
				kkbhStr += ",";
				kkmcStr += ",";
			}
			kkbhStr += source[i].kkbh;
			kkmcStr += source[i].kkmc;
		}
		showKkmcs = kkmcStr;
		var textKkmcs = showKkmcs.replace(/,/g,'\n');
		Ext.getCmp('passStation').setValue(textKkmcs);
		Ext.getCmp('directions').setValue(kkbhStr);
	});
};
//清空选择的卡口数据
function cleanSelect(){
	if (Ext.getCmp('passStation').getValue() != "") {
		showKkmcs = "";
		Ext.getCmp('passStation').setValue("");
		Ext.getCmp('directions').setValue("");
		window.gisInfoIframe.GIS_Clear();//清除选择
	}
};

function loadRecordById(id){
	Ext.getCmp('surveyCarDetailForm').load({
		url : rootpath + '/controlManager/loadControlDetail.mvc?controlId=' + id,
		success : function(from, action) {
			var formPanel = Ext.getCmp('surveyCarDetailForm');
			var detailForm=formPanel.getForm();
			var obj = Ext.util.JSON.decode(action.response.responseText);
			//加载修改的对象信息
			detailForm.findField('id').setValue(obj.data[0].BKXXBH);
			detailForm.findField('bkCategory').setValue(obj.data[0].BKLB);
			var carNum = obj.data[0].HPHM;
			if(bkCategory==1){
				detailForm.findField('carNum').setValue(carNum);
			}else if(bkCategory==2){
				detailForm.findField('carNum2').setValue(carNum);
				}
			detailForm.findField('carBrandWin').setValue(obj.data[0].CLPP);
			detailForm.findField('carCategory').setValue(obj.data[0].CATEGORY);
			detailForm.findField('controlType').setValue(obj.data[0].BKLX);
			detailForm.findField('orgName').setValue(obj.data[0].BKDW);
			detailForm.findField('linkMan').setValue(obj.data[0].CZ);
			detailForm.findField('linkManPhone').setValue(obj.data[0].LXDH);
			detailForm.findField('describer').setValue(obj.data[0].AJMS);
			
			var startDate = obj.data[0].BKSK.split(".")[0];
			var endDate = obj.data[0].BKLEN.split(".")[0];
			detailForm.findField('startDate').setValue(startDate);
			detailForm.findField('endDate').setValue(endDate);
			
			var bkfwdec = obj.data[0].BKFWDEC.replace(/,/g,'\n');
			detailForm.findField('passStation').setValue(bkfwdec);
			
			var shzt=obj.data[0].SHZT;
			if(shzt !=1){
				detailForm.findField('carNum').setDisabled("true");
				detailForm.findField('carNum2').setDisabled("true");
				detailForm.findField('controlType').setDisabled("true");
				detailForm.findField('carBrandWin').setDisabled("true");
				detailForm.findField('carCategory').setDisabled("true");
				detailForm.findField('orgName').setDisabled("true");
				detailForm.findField('linkMan').setDisabled("true");
				detailForm.findField('linkManPhone').setDisabled("true");
				detailForm.findField('describer').setDisabled("true");
				detailForm.findField('startDate').setDisabled("true");
				detailForm.findField('endDate').setDisabled("true");
				detailForm.findField('passStation').setDisabled("true");
				//隐藏按钮
				Ext.getCmp('choosekkBtn').setVisible(false);
				Ext.getCmp('select_point').setVisible(false);
				Ext.getCmp('select_rect').setVisible(false);
				Ext.getCmp('select_circle').setVisible(false);
				Ext.getCmp('select_multiRect').setVisible(false);
				Ext.getCmp('clear_select').setVisible(false);
				Ext.getCmp('submitBut').setVisible(false);
				Ext.getCmp('resetBut').setVisible(false);
				}
			},
		failure : function() {
				var msg="信息加载失败！请重新加载！";
				Ext.MessageBox.alert("温馨提示",msg);
			}
		});
}

Ext.reg('formPanel', Jinpeng.newControl.FormPanel);