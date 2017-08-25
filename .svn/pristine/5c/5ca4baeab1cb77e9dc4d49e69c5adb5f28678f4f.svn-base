Ext.ns('Jinpeng.uplowdPictrue');

Jinpeng.uplowdPictrue.UploadWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	/**
	 * 允许上传的文件类型
	 */
	allowFileType : [ ".jpg" ],
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

	initComponent : function() {
		var _this = this;
		Ext.apply(this, {
			title : this.title || '请选择上传图片',
			layout : 'border',
			width : 550,
			cls : 'blue-button-ct',
			height : 100,
			modal : true,
			items : {
				ref : 'uploadFileForm',
				xtype : 'form',
				region : 'center',
				fileUpload : true,
				border : false,
				labelWidth : 65,
				labelAlign : 'right',
				padding : 5,
				items : [ {
					fieldLabel : '上传图片',
					xtype : 'fileuploadfield',
					name : this.fileName,
					id : 'pictureUrl',
					anchor : '-30',
					emptyText : this.emptyText || '请选择要上传的图片',
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
					invalidText : '图片类型不正确，允许类型(' + _this.allowFileType.join("|") + ')',
					buttonText : '选择图片'
				} ]
			},
			buttons : [ {
				xtype : 'button',
				text : '确定',
				handler : function(btn, event) {
					var window = btn.ownerCt.ownerCt;
					var form = window.uploadFileForm.getForm();
					// debugger
					if (form.isValid()) {
						btn.setDisabled(true);
						// 回调
						var fileName = Ext.getCmp('pictureUrl').getValue();
						_this.callbackFn(fileName);
						btn.ownerCt.ownerCt.close();
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
		Jinpeng.uplowdPictrue.UploadWindow.superclass.initComponent.apply(this, arguments);
	}
});