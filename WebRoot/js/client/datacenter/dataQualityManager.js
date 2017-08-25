/**
 * 数据质量管控
 */
Ext.ns('Jinpeng.dataQuality');

var viewPort = null;
var viewPort = null;
var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();
var kwin1 =new Jinpeng.widget.GeneralWindow({
	id: "mywin1",
	title: "",
	constrain : true,
	constrainHeader : true,
	width: ww * 2 / 3,
	height: hh * 3 / 4,
	layout: "fit",
	//autoShow: true,
	closeAction:'hide',
	html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="/Big_Data/zTree/demo/cn/excheck/multiSelectTreeGzsInc.html"></iframe>'
});

var setKKValue=function(data){
	//alert(data.org_type);
	var orgId;
	orgId = data.id;
	if(data.org_type == 2 ){
		orgId = (data.id).substring(3);
	}
	Ext.getCmp('DataQualityForm').form.findField('orgId').setValue(orgId);
	//parseInt(data.org_type) 这里要转换一下，否则是字符串，后台controller取不到传递的参数
	Ext.getCmp('DataQualityForm').form.findField('orgType').setValue(parseInt(data.org_type));
	Ext.getCmp('orgName').setValue(data.text);
	Ext.getCmp('mywin1').hide();
};
Ext.onReady(function() {
	Ext.useShims = true;
	viewPort =  new Ext.Viewport({
		layout : 'border',
		items : [{
			region : 'north',
			height : 45,
			border : false,
			xtype : 'dataQualityForm'
		}, {
			region : 'center',
			border : false,
			xtype : 'dataQualityGrid'
		}]
	});
});

/**
 * 数据质量管理FormOrgComboBoxTree
 */
Jinpeng.dataQuality.DataQualityFormPanel = Ext.extend(Ext.Panel, {
	initComponent : function() {
		var comboBoxTree = new Ext.ux.OrgComboBoxTree({
			fieldLabel : '组织结构',
			name : 'orgName',
			emptyText : '请选择...',
			blankText : '请选择组织结构',
			anchor : '95%',
			editable : false,
			treeUrl : '',
			dataType : 'device',
			callback : function(id, text, coding, orgType) {
				Ext.getCmp('DataQualityForm').form.findField('orgId').setValue(id);
				Ext.getCmp('DataQualityForm').form.findField('orgType').setValue(orgType);
			}
		});
		
		var endTime = Date.parseDate(Ext.util.Format.date(
			new Date(), 'Y-m-d')
			+ " " + "23:59:59", 'Y-m-d H:i:s');
		
		//错误类型
		var errorTypeStore = new Ext.data.JsonStore({
			url : rootpath
					+ "/dictionary/jsonDictsInCombo.mvc?code=ERROR_TYPE",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false
		});
		
		//错误等级
		var errorLevelStore = new Ext.data.JsonStore({
			url : rootpath
					+ "/dictionary/jsonDictsInCombo.mvc?code=ERROR_LEVEL",
			root : "data",
			fields : [ 'id', 'text' ],
			autoLoad : false
		});
	
		Ext.apply(this, {
			items : [{
				xtype : 'form',
				id : 'DataQualityForm',
				border : false,
				frame : true,
				labelAlign : 'right',
				cls : 'blue-button-ct',
				
				layout : 'table',
				defaults : {
					width : 330,
					layout : 'form'
				},
				layoutConfig : {
					columns : 4
				},
				
				bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
				items : [{
					//items : [comboBoxTree]
					width:400,
					items : [ {
							xtype : 'compositefield',
							items : [ {
								flex : 0.5,
								fieldLabel : '组织结构',
								xtype : 'tooltiptextfield',
								disabled : true,
								allowBlank : false,
								name : 'orgName',
								id : 'orgName',
								width : 150,
								emptyText : '请选择...'
							}, {
								flex : 0.5,
								owner : this,
								labelAlign : 'right',
								xtype : 'button',
								text : '选择',
								id:'choosekkBtn',
								handler : function(){
									kwin1.show();
								}
							}]
					}]	
										
				}, {
					items : [ {
						xtype : 'tcombo',
						id : 'errorType',
						name : 'errorType',
						fieldLabel : '错误类型',
						store : errorTypeStore,
						mode : 'local',
						emptyText : '全部',
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'text',
						anchor : '94%'
					} ]
				}, {
					items : [ {
						xtype : 'tcombo',
						id : 'errorLevel',
						name : 'errorLevel',
						fieldLabel : '错误等级',
						store : errorLevelStore,
						mode : 'local',
						emptyText : '全部',
						triggerAction : 'all',
						valueField : 'id',
						displayField : 'text',
						anchor : '94%'
					} ]
				}, {
					items : [{
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;',
						id : 'searchBut',
						handler : this.deviceCheck
					}]
				},{
					items : [{
						xtype : 'hidden',
						id : 'orgId',
						name : 'orgId'
					}]
				},{
					items : [{
						xtype : 'hidden',
						id : 'orgType',
						name : 'orgType'
					}]
				}]
			}],
			listeners : {
				afterrender : function() {
					//错误类型
					errorTypeStore.load();
					//错误等级
					errorLevelStore.load();
				}
			}
		});
		Jinpeng.dataQuality.DataQualityFormPanel.superclass.initComponent.apply(this);
	},
	deviceCheck : function() {
		var form = Ext.getCmp('DataQualityForm');
		if(form.getForm().isValid()) {
			var grid = Ext.getCmp('DataQualityDataGrid');
			grid.store.baseParams = {};
			var baseparams = {
				'orgId' : Ext.getCmp('orgId').getValue(),
				'orgType' : Ext.getCmp('orgType').getValue(),
				'errorType' : Ext.getCmp('errorType').getValue(),
				'errorLevel' : Ext.getCmp('errorLevel').getValue()
			};
			grid.store.baseParams = baseparams;
			grid.store.load({
				params : {'page.start' : 0, 'page.limit' : Jinpeng.PageSize}
			});
		}
	}
});

/**
 * 数据质量管理Grid
 */
Jinpeng.dataQuality.DataQualityGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'DataQualityDataGrid',
	border : false,
	pageSize : Jinpeng.PageSize,
	initComponent : function() {
		var commuServerStore = new Ext.data.JsonStore({
			url : rootpath+ "/dc/dataQuality.mvc",
			root : 'result',
			idProperty : 'id',
			totalProperty : 'totalCount',
			autoLoad : false,
			fields : [
			      {name : 'ID'},
		          {name : 'DWBH'},
		          {name : 'DWMC'},
		          {name : 'ERROR_TYPE'},
		          {name : 'FIELD_NAME'},
		          {name : 'FIELD_VALUE'},
		          {name : 'VALEID_VALUE'},
		          {name : 'ERROR_LEVEL'},
		          {name : 'ERROR_DESC'},
		          {name : 'CREATE_DATE'},
		          {name : 'RECIEVER_IP'}
	          ]
		});
		var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
		Ext.apply(this, {
			store :  commuServerStore,
			colModel : new Ext.grid.ColumnModel({
				defaults : {
					sortable : false
				},
				columns : [
			           new Ext.ux.grid.PagingRowNumberer({ width : 40 }),
			           sm,
			           {
			        	   header : '单位名称', dataIndex : 'DWMC',
		                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
								//当文字过多的时候，鼠标移上去就给悬浮狂提示
						     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
							}
			           },
			           {
			        	   header : '错误类型', dataIndex : 'ERROR_TYPE', renderer : function(key) {
							return window.dictionary.getValue("ERROR_TYPE", key);
					       }
			           },
			           {header : '字段名称', dataIndex : 'FIELD_NAME'},
			           {header : '字段值', dataIndex : 'FIELD_VALUE'},
			           {header : '纠正值', dataIndex : 'VALEID_VALUE'},
			           {
			        	   header : '错误等级', dataIndex : 'ERROR_LEVEL',width : 40,
			        	   renderer : function(key) {
							return window.dictionary.getValue("ERROR_LEVEL", key);
					       }
			           },
			           {
			        	   header : '错误描述', dataIndex : 'ERROR_DESC',width : 200,
		                    renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
								//当文字过多的时候，鼠标移上去就给悬浮狂提示
						     	 return '<font ext:qtip="'+value+'">'+value+'</font>';
							}
			           },
			           {header : '报告时间', dataIndex : 'CREATE_DATE',width : 150,
			        	   renderer : function(value) {
			        	        return value.substring(0,value.indexOf("."));
						   }
			           },
			           {header : '接收服务器IP', dataIndex : 'RECIEVER_IP'}
	            ]
			}),
			selModel : sm,
			bbar : new Jinpeng.widget.PagingToolbar( {
				id : 'PagingToolbar',
				store : commuServerStore,
				pageSize : this.pageSize,
				displayMsg : '{0} - {1} of 共{2}条',
				emptyMsg : "无数据"
			}),
			tbar : {
				cls : 'blue-button-ct',
				items : [ {
					xtype : 'button',
					id : 'exportRecordBtn',
					titletooltip : {
						text : Jinpeng.Message.EXPORT_BUTTON_TOOLTIP
					},
					text : '&nbsp;&nbsp;&nbsp;导出&nbsp;&nbsp;&nbsp;',
					handler : this.importExcelData
				} ]
			},
			listeners : {
				afterrender : function() {
					commuServerStore.load({
						params : {'page.start' : 0, 'page.limit' : this.pageSize}
					});
				}
			}
		});
		Jinpeng.dataQuality.DataQualityGridPanel.superclass.initComponent.apply(this);
	},
	//导出Excel格式数据方法 
	importExcelData : function() {
		var records = Ext.getCmp('DataQualityDataGrid').getSelectionModel().getSelections();
		var config = {
			totalURL : rootpath + "/dc/countDataQuality.mvc",
			selectExportURL : rootpath + "/dc/exportDataQuality.mvc",
			queryExportURL : rootpath + "/dc/exportDataQuality.mvc"
		};
		// 得到选中的ids
		var ids = [];
		for ( var i = 0; i < records.length; i++) {
			ids[ids.length] = records[i].get('ID');
		}
		config.ids = ids;
		var param = [];
		param[param.length] = "orgId=" + Ext.getCmp('orgId').getValue();
		param[param.length] = "orgType=" + Ext.getCmp('orgType').getValue();
		param[param.length] = "errorType=" + Ext.getCmp('errorType').getValue();
		param[param.length] = "errorLevel=" + Ext.getCmp('errorLevel').getValue();
		config.queryCondition = param.join("&");
		var ExportHelper = new Jinpeng.ExportHelper(config);
		ExportHelper.startExport(true);
	}
});


Ext.reg('dataQualityForm', Jinpeng.dataQuality.DataQualityFormPanel);
Ext.reg('dataQualityGrid', Jinpeng.dataQuality.DataQualityGridPanel);
