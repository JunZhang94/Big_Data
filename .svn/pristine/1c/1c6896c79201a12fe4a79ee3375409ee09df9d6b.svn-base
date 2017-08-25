Ext.ns('Jinpeng.carNum');

Jinpeng.carNum.UploadWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	/**
	 * 允许上传的文件类型
	 */
	allowFileType : [ ".xls" ],
	/**
	 * 上传地址
	 */
	uploadURL : null,
	/**
	 * 上传成功后回调
	 */
	callbackFn : Ext.emptyFn,
	/**
	 * 上传文件对应后台的字段名
	 */
	fileName : 'file',
	/**
	 * 模板下载URL
	 */
	templateURL : null,

	initComponent : function() {
		var _this = this;
		Ext.apply(this, {
			title : this.title || '请选择上传文件',
			layout : 'border',
			width : 350,
			cls : 'blue-button-ct',
			height : 100,
			modal : true,
			items : {
				ref : 'uploadFileForm',
				xtype : 'form',
				id : 'carnumFileForm',
				region : 'center',
				fileUpload : true,
				border : false,
				labelWidth : 65,
				labelAlign : 'right',
				padding : 5,
				items : [ {
					fieldLabel : '上传文件',
					xtype : 'fileuploadfield',
					name : this.fileName,
					anchor : '-30',
					emptyText : this.emptyText || '请选择要上传的文件',
					validate : function() {
						var vFlag = false;
						var filePath = this.getValue();
						if (null != filePath && "" != filePath) {
							var surfix = filePath.substring(filePath.lastIndexOf("."));
							if (_this.allowFileType.indexOf(surfix.toLowerCase()) != -1) {
								vFlag = true;
							}
						}
						vFlag ? this.clearInvalid() : this.markInvalid();
						return vFlag;
					},
					invalidText : '文件类型不正确，允许类型(' + _this.allowFileType.join("|") + ')',
					buttonText : '选择文件'
				} ]
			},
			buttons : [ {
				xtype : 'button',
				text : '确定',
				handler : function(btn, event) {
					var window = btn.ownerCt.ownerCt;
					//var form = window.uploadFileForm.getForm();
					var form = Ext.getCmp('carnumFileForm').getForm();
					// debugger
					if (form.isValid()) {
						btn.setDisabled(true);
						form.submit({
							url : _this.uploadURL,
							success : function(form, action) {
							},
							failure : function(form, action) {
								btn.setDisabled(false);
								var carNumStr = action.response.responseText;
								var win = new Jinpeng.widget.MessageWindow();
								var msg = "";
								if (carNumStr) {
									var carNumSize = carNumStr.split(",").length;
									msg = '导入车牌号码成功,您一共导入了' + carNumSize + '个车牌号码。';
								} else {
									msg = '导入车牌号码失败！';
								}
								win.msg = msg;
								win.show();
								window.close();
								// 回调
								_this.callbackFn(carNumStr);
							}
						});
					}
				}
			}, {
				xtype : 'button',
				text : '取消',
				handler : function(btn, even) {
					btn.ownerCt.ownerCt.close();
				}
			} ]
		});
		Jinpeng.carNum.UploadWindow.superclass.initComponent.apply(this, arguments);
	},
	afterRender : function() {
		Jinpeng.carNum.UploadWindow.superclass.afterRender.apply(this, arguments);
		if (this.templateURL) {
			this.getFooterToolbar().add("<span class='tpl_download'><a href='" + this.templateURL + "'>模板下载</a>");
		}
	}

});