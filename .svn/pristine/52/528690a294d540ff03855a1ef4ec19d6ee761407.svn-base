Ext.ns('Jinpeng.user.passwordUpdate');

/**
 * 用户密码修改
 */
Ext.onReady(function(){
	new Jinpeng.user.passwordUpdate.SettingViewport({
		cls : 'system_mod'
	});
});

/**
 * 用户密码修改视图
 */
Jinpeng.user.passwordUpdate.SettingViewport = Ext.extend(Ext.Viewport, {
	/**
	 * 布局
	 */
	layout : 'fit',
	constructor : function(config) {
		Ext.apply(this, config);
		/* 主要工作区域 */
		this.main = new Jinpeng.user.passwordUpdate.UserPanel({});
		/* 视口元素 */
		this.items = [ this.main ];
		Jinpeng.user.passwordUpdate.SettingViewport.superclass.constructor.apply(this, arguments);
	},
	/**
	 * 渲染后自动加载数据
	 */
	afterRender : function() {
		Jinpeng.user.passwordUpdate.SettingViewport.superclass.afterRender.apply(this, arguments);
	}
});

/**
 * 用户密码修改主面板
 */
Jinpeng.user.passwordUpdate.UserPanel = Ext.extend(Ext.Panel, {
	/**
	 * {Boolean} [border=false] 是否具有边框
	 */
	border : true,
	/**
	 * 内边距
	 */
	padding : '10',
	/**
	 * @cfg {Boolean} [autoScrool=true] 自动滚屏
	 */
	autoScroll : true,
	defaults : {
		border : false,
		bodyCssClass : 'area1',
		style : 'margin-bottom:10px;',
		padding : 5
	},
	constructor : function(config) {
		Ext.apply(this, config);
		var panel = this;
		var userPanel = new Ext.Panel({
			title : '密码修改',
			layout : 'ttable',
			labelWidth : 120,
			labelAlign : 'right',
			layoutConfig : {
				columns : 1
			},
			items : [ {
				xtype : 'textfield',
				fieldLabel : '用户账号',
				id : 'USER_CODE',
				allowBlank : false,
				maxLength : 25,
				anchor : '90%'
			},{
				xtype : 'textfield',
				inputType: 'password',
				fieldLabel : '原密码',
				id : 'OLD_PASSWORD',
				allowBlank : false,
				maxLength : 25,
				anchor : '90%'
			}, {
				xtype : 'textfield',
				inputType: 'password',
				fieldLabel : '新密码',
				id : 'NEW_PASSWORD',
				allowBlank : false,
				maxLength : 25,
				anchor : '90%'
			}, {
				xtype : 'textfield',
				inputType: 'password',
				fieldLabel : '确认新密码',
				id : 'NEW_PASSWORDSS',
				allowBlank : false,
				maxLength : 25,
				anchor : '90%'
			}]
		});


		this.items = [ userPanel, {
			border : false,
			cls : 'blue-button-ct',
			bodyCssClass : null,
			items : [ {
				style : 'margin-left:165;',
				name : '确定',
				xtype : 'button',
				text : '&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;',
				handler : this.updatePasswordHandler
			} ]
		} ];

		Jinpeng.user.passwordUpdate.UserPanel.superclass.constructor.apply(this, arguments);

	},
	updatePasswordHandler : function(btn) {
		var panel = btn.ownerCt.ownerCt;
		var userData = {
			'USER_CODE' : Ext.getCmp('USER_CODE').getValue(),
			'OLD_PASSWORD' : Ext.getCmp('OLD_PASSWORD').getValue(),
			'NEW_PASSWORD' : Ext.getCmp('NEW_PASSWORD').getValue(),
			'NEW_PASSWORDSS' : Ext.getCmp('NEW_PASSWORDSS').getValue()
		};
		if (userData.USER_CODE == '') {
			var win = new Jinpeng.widget.MessageWindow();
			win.msg = '用户账号为空!';
			win.show();
			return false;
		}
		if (userData.OLD_PASSWORD == '') {
			var win = new Jinpeng.widget.MessageWindow();
			win.msg = '原密码为空!';
			win.show();
			return false;
		}
		if (userData.NEW_PASSWORD == '') {
			var win = new Jinpeng.widget.MessageWindow();
			win.msg = '新密码为空';
			win.show();
			return false;
		}
		if (userData.NEW_PASSWORDSS=='') {
			var win = new Jinpeng.widget.MessageWindow();
			win.msg = '确认密码不能为空';
			win.show();
			return false;
		}
		if (userData.NEW_PASSWORD!=userData.NEW_PASSWORDSS) {
			var win = new Jinpeng.widget.MessageWindow();
			win.msg = '确认密码输入不一致';
			win.show();
			return false;
		}
		var listChannelData = [];
		var actionFn = Ext.emptyFn;
		actionFn = panel.doSaveAction.createDelegate(this, [userData, listChannelData, btn]);
		panel.saveOrUpdateWithCheckEncode(actionFn,userData);
	},
	/**
	 * 确定
	 * @param btn 确定按钮
	 * @private
	 */
	doSaveAction : function(userData, channelData, btn) {
		var panel = btn.ownerCt.ownerCt;
		Ext.Ajax.request({
			url : rootpath + '/user/reUpdatePassword.mvc',
			params : userData,
			success : function(response, options) {
				json = response.responseText;
				var o = response.responseData || Ext.decode(json);
				if (o && o.success) {
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = '操作成功';
					win.show();
				}
			}
		});
	},
	saveOrUpdateWithCheckEncode : function(actionFn,userData){
		var flag = this.isEncodeUnique(userData);
		if(this.isEncodeUnique(userData) == 0){
			Ext.Msg.confirm("提示", "原密码与系统原始密码不一致，且只能修改自己的账号密码，请重新输入!" , function(id) {
				if ("yes" == id) {
					return false;
					//actionFn();
				}
			}, this);
		}else{
			actionFn();
		}
	},
	isEncodeUnique : function(userData){
		var result = 0;
		Ext.Ajax.request({
			url : rootpath + '/user/checkPassword.mvc',
			async : false,
			params :{
				"OLD_PASSWORD" : userData.OLD_PASSWORD,
				"USER_CODE" : userData.USER_CODE
			},
			success : function(r,o) {
				var response = Ext.decode(r.responseText);
				result = response.data;
			},
			scope : this
		});
		return result;
	}
});