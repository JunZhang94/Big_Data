Ext.ns("XG.Control.ComboBoxTree");  
jinpeng.system.permgroup.PermGroupModificationWindow = ext.extend(jinpeng.widget.GeneralWindow, {
	/**
	 * @cfg {Number} [width=400] 窗口宽度
	 */
	width : 400,
	/**
	 * @cfg {Number} [height=400] 窗口高度
	 */
	height : 400,
	/**
	 * @cfg {Function} [callback=ext.emptyFn] 窗口关闭后的回调函数，参数如下：
	 */
	callback : ext.emptyFn,
	

	buttons : [ {
		text : '确定',
		id:'permGroupButton',
		handler : function(btn, event) {
			var window = btn.ownerCt.ownerCt;
			window.okHandler(btn, event);
		}
	}, {
		text : '关闭',
		handler : function(btn, event) {
			var window = btn.ownerCt.ownerCt;
			window.closeHandler(btn, event);
		}
	} ],
	constructor : function(config) {

		ext.apply(this, config);

		var window = this;
		var comboBoxTree = new ext.ux.OrgComboBoxTree({
			fieldLabel : '所属组织',
			name : 'orgName',
			allowBlank : false,
			emptyText : '请选择...',
			blankText : '请选择所属组织',
			anchor : '-30',
			//hidden:true,
			editable : false,
			treeUrl : _app.contextPath
					+ '/client/device/getOrgTree.action',
			callback : function(id, text, coding) {
				var form = top.ext.getCmp('permForm').getForm();
				form.findField('coding').setValue(coding);
			}
		});
		/* 用户列表 */
		this.userGrid = new top.jinpeng.widget.SimpleUserGrid({
			region : 'center',
			smtype : 'row',
			store : new ext.data.JsonStore({
				root : 'data',
				idProperty : 'id',
				totalProperty : 'totalCount',
				autoLoad : false,
				fields : [ 'id', 'loginName', 'realName', 'orgName' ]
			}),
			paging : false,
			init : function(data) {
				var store = this.getStore();
				store.loadData({
					data : data
				});
			}
		});

		/* 权限树 */
		if (this.type == 'func') {
			this.mainComponent = this.moduleTree = new top.jinpeng.widget.GeneralTree({
				region : 'center',
				dataUrl : _app.contextPath + '/client/system/jsonAllModuleTreeMap.action',
				processResponseData : function(data) {
					try {
						var arr = data ? (ext.isArray(data) ? data : [ data ]) : [];
						for ( var i = 0; i < arr.length; i++) {
							var node = arr[i];
							if (node.readonly)
								node.uiProvider = jinpeng.widget.TTreeNodeUI;
						}
						return data;
					} catch (e) {
						ext.debug("Exception occured : %o", e);
						return [];
					}
				}
			});
		} else if (this.type == 'org') {
			this.mainComponent = this.orgTree = new top.jinpeng.widget.OrganizationTree({
				showCheckbox : true,
				dataUrl : _app.contextPath + '/client/system/allOrgTreeMap.action',
				region : 'center'
			});
		}else if(this.type == 'data'){

			this.mainComponent = this.dataMenueTree = new top.jinpeng.widget.GeneralTree({
				region : 'center',
				dataUrl : _app.contextPath + '/client/system/jsonAllDataMenueTreeMap.action',
				processResponseData : function(data) {
					try {
						var arr = data ? (ext.isArray(data) ? data : [ data ]) : [];
						for ( var i = 0; i < arr.length; i++) {
							var node = arr[i];
							if (node.readonly)
								node.uiProvider = jinpeng.widget.TTreeNodeUI;
						}
						return data;
					} catch (e) {
						ext.debug("Exception occured : %o", e);
						return [];
					}
				}
			});
		}
		/* 选项卡 */
		this.tab = new top.ext.TabPanel({
			region : 'center',
			border : true,
			margins : '5',
			activeTab : 0,
			items : [ {
				title : '拥有权限',
				layout : 'border',
				border : false,
				items : [ this.mainComponent ]
			}/**, {
				title : '授权账户',
				layout : 'border',
				border : false,
				items : [ {
					region : 'north',
					xtype : 'toolbar',
					border : false,
					autoHeight : true,
					margins : '5',
					items : [ '->', {
						owner : this,
						xtype : 'button',
						text : '选择用户',
						handler : this.chooseUserHandler
					} ]
				}, this.userGrid ]
			} 暂时屏蔽**/]
		});
	  if (this.type == 'org'){
			/* 表单 */
			this.fp = new top.ext.form.FormPanel({
				id:'permForm',
				xtype : 'form',
				region : 'north',
				border : false,
				autoHeight : 'auto',
				margins : '5',
				labelAlign : 'right',
				labelWidth : 100,
				items : [ {
					xtype : 'hidden',
					name : 'id'
				}, {
					fieldLabel : '权限集名称',
					xtype : 'textfield',
					name : 'name',
					id:'codeName',
					anchor : '-30',
					allowBlank : false,
					blankText : '请填写权限名称',
					emptyText : '请填写权限名称',
					regex : /^.{2,50}$/,
					regexText : '功能权限名称限定为2~50个字符'
				},comboBoxTree,{
					fieldLabel : '描述',
					xtype : 'textarea',
					name : 'remark',
					height : 50,
					anchor : '-30',
					regex : /^.{0,500}$/,
					regexText : '功能权限名称限定为500个字符'
				},{
					xtype : 'hidden',
					name : 'coding'		
				} ]
			});
		 }else if(this.type == 'func'){
				/* 表单 */
				this.fp = new top.ext.form.FormPanel({
					id:'permForm',
					xtype : 'form',
					region : 'north',
					border : false,
					autoHeight : 'auto',
					margins : '5',
					labelAlign : 'right',
					labelWidth : 100,
					items : [ {
						xtype : 'hidden',
						name : 'id'
					}, {
						fieldLabel : '权限集名称',
						xtype : 'textfield',
						name : 'name',
						id:'codeName',
						anchor : '-30',
						allowBlank : false,
						blankText : '请填写权限名称',
						emptyText : '请填写权限名称',
						regex : /^.{2,50}$/,
						regexText : '功能权限名称限定为2~50个字符'
					},{
						xtype:'combo',
						hiddenName:'permgroupRole',
						id:'permgroupRole',
						fieldLabel :'权限角色',
						editable :false,
						store:new ext.data.JsonStore({
							url:_app.contextPath+"/client/system/jsonDictsInCombo.action?code=PERMGROUP_ROLE",
							root : "data",
							fields:['id','text'],
							autoLoad:true
		                }),
		                mode:'local',
		                emptyText:'请选择权限角色',
		                triggerAction : 'all',
		                valueField:'id',
		                displayField:'text',
		                allowBlank : false,
		                editable:false,
		                anchor : '-30'
		            },{
						fieldLabel : '描述',
						xtype : 'textarea',
						name : 'remark',
						height : 50,
						anchor : '-30',
						regex : /^.{0,500}$/,
						regexText : '功能权限名称限定为500个字符'
					},{
						xtype : 'hidden',
						name : 'coding'		
					} ]
				});
		 }else{
			 /* 表单 */
				this.fp = new top.ext.form.FormPanel({
					id:'permForm',
					xtype : 'form',
					region : 'north',
					border : false,
					autoHeight : 'auto',
					margins : '5',
					labelAlign : 'right',
					labelWidth : 100,
					items : [ {
						xtype : 'hidden',
						name : 'id'
					}, {
						fieldLabel : '权限集名称',
						xtype : 'textfield',
						name : 'name',
						id:'codeName',
						anchor : '-30',
						allowBlank : false,
						blankText : '请填写权限名称',
						emptyText : '请填写权限名称',
						regex : /^.{2,50}$/,
						regexText : '功能权限名称限定为2~50个字符'
					},{
						fieldLabel : '描述',
						xtype : 'textarea',
						name : 'remark',
						height : 50,
						anchor : '-30',
						regex : /^.{0,500}$/,
						regexText : '功能权限名称限定为500个字符'
					},{
						xtype : 'hidden',
						name : 'coding'		
					} ]
				});
		 }
		/* 控件元素 */
		this.items = [ this.fp, this.tab ];

		jinpeng.system.permgroup.PermGroupModificationWindow.superclass.constructor.apply(this, arguments);
	},
	/**
	 * 初始化权限集数据
	 * @param {Object} data
	 * @private
	 */
	init : function(data) {

		var window = this;

		var mc = window.mainComponent;

		if (data) {

			var url = null;
			if (window.type == 'func')
				url = _app.contextPath + '/client/system/jsonLoadRole.action';
			else if (window.type == 'org')
				url = _app.contextPath + '/client/system/jsonLoadOrgRole.action';
			else if(window.type=='data')
				url = _app.contextPath + '/client/system/loadDataRole.action';

			this.fp.getForm().load({
				url : url,
				params : data,
				success : function(form, action) {
					if (action && action.result && action.result.data) {

						var data = action.result.data;

						// 设定用户
						var users = data.users || [];
						window.userGrid.init(users);

						// 设定树数据
						var mainData = null;
						if (window.type == 'func')
							mainData = data.modules;
						else if (window.type == 'org')
							mainData = data.organizations;
						if(window.type=='data')
							mainData = data.modules;
						mc.init(mainData);

					}
				}
			});

		} else {
//			if (window.type == 'org'){
//				top.ext.getCmp("permForm").getForm().findField("orgName").setValue();
//				top.ext.getCmp("permForm").getForm().findField("orgName").show();
//				top.ext.getCmp("permForm").getForm().findField("permgroupRole").setValue("1"); //默认随便设置一个值供验证
//				top.ext.getCmp("permForm").getForm().findField("permgroupRole").hide();
//			}		
			mc.reload();
		}

	},
	/**
	 * 选择用户行为
	 * 
	 * @private
	 */
	chooseUserHandler : function(btn, event) {
		var window = btn.owner;
		var store = window.userGrid.getStore();
		var records = store.getRange();
		var data = [];
		if (records)
			for ( var i = 0; i < records.length; i++)
				data.push(records[i].data);
		var chooser = new top.jinpeng.system.user.UserChooseWindow({
			cls : 'system_mod',
			modal : false,
			callback : function(result) {
				if (result.data) {
					var grid = window.userGrid;
					var store = grid.getStore();
					store.loadData(result);
				}
			}
		});
		chooser.init(data);
		chooser.show();
	},
	/**
	 * 确定处理器
	 * 
	 * @private
	 */
	okHandler : function() {

		var window = this;
		var formPanel = this.fp;
		var form = formPanel.getForm();

		var params = {};

		/* 计算选择的用户 */
		var records = window.userGrid.getStore().getRange();
		var uids = [];
		for ( var i = 0; i < records.length; i++)
			uids.push(records[i].get('id'));
		if (uids.length > 0)
			params.uids = uids;

		/* 计算选择的模块 */
		if (window.moduleTree) {
			mids = window.moduleTree.getChecked('id');
			if (mids.length > 0)
				params.mids = mids;
		}
		//计算数据菜单模块
        if(window.dataMenueTree){
        	mids = window.dataMenueTree.getChecked('id');
			if (mids.length > 0)
				params.mids = mids;
        }
		/* 计算选择的组织结构 */
		if (window.orgTree) {
			oids = window.orgTree.getChecked('id');
			if (oids.length > 0)
				params.oids = oids;
		}

		//var p = form.getFieldValues();
		if (form.isValid()) {
			var p = form.getFieldValues();
			delete p.orgName;
			top.ext.getCmp('permGroupButton').setDisabled(true);  
			/* 重新封装参数 */
			{
				var prefix = '';
				if (this.type == 'func')
					prefix = 'role.';
				else if (this.type == 'org'){
					delete p.permgroupRole;
					prefix = 'orgRole.';
					}				
				else if(this.type=='data')
					prefix='dataRole.';
				for ( var i in p)
					params[prefix + i] = p[i];
				 
			}

			var valid = true;
			/* 判断是否选择了模块 */
			if (this.type == 'func' && (!params.mids || params.mids.length == 0)) {
				valid = false; 
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '请至少选择一个模块';
				win.show();
			}
			/* 判断是否选择了数据模块 */
			if (this.type == 'data' && (!params.mids || params.mids.length == 0)) {
				valid = false;
				top.ext.getCmp('permGroupButton').setDisabled(false);  
				var win = new Jinpeng.widget.MessageWindow();
				win.msg ='请至少选择一个数据模块';
				win.show();
			}
			/* 判断是否选择了组织 */
			if (this.type == 'org' && (!params.oids || params.oids.length == 0)) {
				valid = false;
				top.ext.getCmp('permGroupButton').setDisabled(false);  
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '请至少选择一个组织';
				win.show();
			}

			/* 手动提交表单 */
			if (valid) {
				/* 分析URL */
				var url = null;
				if (this.type == 'func') {
					if (p.id)
						url = _app.contextPath + '/client/system/jsonUpdateRole.action';
					else
						url = url = _app.contextPath + '/client/system/jsonCreateRole.action';
				} else if(this.type=='org') {
					if (p.id)
						url = _app.contextPath + '/client/system/jsonUpdateOrgRole.action';
					else
						url = url = _app.contextPath + '/client/system/jsonCreateOrgRole.action';
				}else{
					//数据菜单选项处理
					if (p.id)
						url = _app.contextPath + '/client/system/updateDateRole.action';
					else
						url = url = _app.contextPath + '/client/system/createDateRole.action';
				}
				//var myType=this.type;
				/* 提交数据 */
				ext.Ajax.request({
					url : url,
					params : params,
					success : function(response, options) {
						json = response.responseText;
						var o = response.responseData || ext.decode(json);
						if (o && o.success) {
							if (window)
								window.close();
							//if(myType == 'func'){
								if(p.id){
									//广播功能权限修改事件
								    var ids=params.uids;
								    if(ids){ 
								for ( var i = 0; i < ids.length; i++) { 
									top.broadcastEvent('userorgchangeevent', function() {
									}, {
										userId : ids[i]
									});
								}
								    }
								}
							
							//}
							window.callback('ok'); 
						}
					}
				});
			}
		}

	},
	/**
	 * 关闭处理
	 * 
	 * @private
	 */
	closeHandler : function() {
		var window = this;
		window.close();
		window.callback('cancel');
	}
});

Ext.reg('xcomboboxtree',XG.Control.ComboBoxTree);  