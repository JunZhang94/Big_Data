/**
 * \ * 入口
 */
Ext.ns("Jinpeng.common.util");

var objIframe = null;
var re = null;
var pic = null;

/**
 * 图片下载操作窗体。
 */
Jinpeng.common.progressWindow = Ext.extend(Jinpeng.widget.GeneralWindow, {
	width : 500,
	height : 80,
	title : '提示',
	closeAction : 'close',
	stateful : false,
	border : false,
	initComponent : function() {
		Ext.apply(this, {
			items : [ {
				xtype : 'form',
				id : 'progressRegWin',
				region : 'center',
				labelAlign : 'right',
				border : false,
				cls : 'blue-button-ct',
				defaults : {
					layout : 'form'
				},
				items : [ {
					layout : 'column',
					defaults : {
						bodyStyle : 'padding-top:10px;margin-right:1px;'
					},
					items : [ {
						columnWidth : 1,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							name : 'save_path_textfield',
							id : 'savepath',
							fieldLabel : '保存路径',
							allowBlank : false,
							blankText : '保存路径不能为空！',
						    regex:/^[c-fC-F]{1}\:[\\{1}[^\w\u4E00-\u9FA5\uF900-\uFA2D]*]*$/,
							regexText:'保存的本地路径输入有误...', 
                        
							// 默认值为用户保存在Cookies中的路径
							value : Ext.util.Cookies.get('savepath') == null ? 'D:\\TrafficePicture' : Ext.util.Cookies.get('savepath'),
							anchor : '96%',
							readOnly : false
						} ]
					},{
					  items : [ {
						    columnWidth : .3,
							xtype : 'button',
							text : '&nbsp;&nbsp;&nbsp;下载&nbsp;&nbsp;&nbsp;',
							id : 'downbutton',
							scope : this,
							handler : this.downbuttonHandler
					   }]
						
					},{
						items:[{
							 columnWidth : .3,
							xtype : 'button',
							text : '&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;',
							id : 'cancelBtn',
							scope : this,
							handler : this.cancelDownloadHandler
						 }]
					}]
				} ]
				/*bbar : {
					buttonAlign : 'right',
					items : [ {
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;下载&nbsp;&nbsp;&nbsp;',
						id : 'downbutton',
						scope : this,
						handler : this.downbuttonHandler
					}, {
						xtype : 'tbspacer',
						width : 5
					}, {
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;',
						id : 'cancelBtn',
						scope : this,
						handler : this.cancelDownloadHandler
					} ]
				}*/
			} ]
		});
		Jinpeng.common.progressWindow.superclass.initComponent.apply(this);
		//此处接收pictureMonitor.js往TOP层级发送的OCX消息。
		this.subscribe('progressmessage', this.progressmessageHandler, this);
	},
	/* 开始按钮点击事件 */
	downbuttonHandler : function() {
		if (Ext.getCmp('progressRegWin').getForm().isValid()) {
			Ext.getCmp('downbutton').setDisabled(true);
			/* 调用下载方法 */
			//var path =(/^[a-zA-Z]:[\\]((?! )(?![^\\/]*\s+[\\/])[\w -]+[\\/])*(?! )(?![^.]*\s+\.)[\w -]+$/);
			this.savepic();
		}
	},
	/* 取消图片下载 */
	cancelDownloadHandler : function() {
		this.close();
	},
	savepic : function() {
		var ids = this.config.ids;
		var httpUrl = this.config.httpUrl;
		var httpUrlString = httpUrl ? httpUrl.join(','):"";
		//var reg = /^([a-zA-Z]{1}/:[//[^x00-xff]*//]*)$/;
		
		var idString = ids ? ids.join(',') : '';
		
		var url = Ext.getCmp("savepath").getValue();
		var customerIdsUrl = this.config.customerIdsUrl;
		if ('' != idString) {
			Ext.Ajax.request({
				// 将id组合成字符串传递到后台
				url : customerIdsUrl,
				method : 'POST',
				params : {'idstr': idString,'url' :　url,'imageUrl':httpUrlString},
				success : function(resp, opts) {
					var txt = Ext.util.JSON.decode(resp.responseText);
					var data = txt.data;
					if(data){
						downPictureWindow.close();
						var win = new Jinpeng.widget.MessageWindow();
						win.msg ="图片下载成功...";
						win.show();
					}
					var dataMarked = [];
					for ( var i = 0; i < data.length; i++) {
						dataMarked[dataMarked.length] = "\"" + data[i] + "\"";
					}
					urls = dataMarked.join(',');
					// 用户选择本地路径功能
					if(Ext.getCmp('savepath')!= null){
						var path = Ext.getCmp('savepath');
					}
					
					// Ext.debug(path);
					if (!path) {
						return;
					}
					if (document.all.a1 == null) {         
						 objIframe = document.createElement("IFRAME");       
						 document.body.insertBefore(objIframe);           
						 objIframe.outerHTML = "<iframe name='a1' style='width:400px;hieght:300px' src=" + data[0] + "></iframe>";   
						 //re = setTimeout("savepic()", 1)          
					 } else {         
						 clearTimeout(re)      
						 pic = window.open(data[0], "a1")      
						 pic.document.execCommand("SaveAs")              
						 document.all.a1.removeNode(true)            
					 } 
					
					// 下载失败！关闭下载窗口。
					downPictureWindow.close();
				},
				failure : function(resp, opts) {
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = "下载失败！请重试！";
					win.show();
					// 下载失败！关闭下载窗口。
					downPictureWindow.close();
				}
			});
		}
	},
	/* 下载 */
	download : function() {
		
	},
	/* 更新下载进度 */
	progressmessageHandler : function(message) {
		// 更新下载状态
		var proBar = Ext.getCmp('progressRegBarId');
		if (100 == message.progress || -1 == message.progress) {
			// downPictrueWindow对象为发起“图片下载”(点击图片下载按钮时)时创建的全局对象
			if (downPictureWindow) {
				downPictureWindow.close();
			}
			var win = new Jinpeng.widget.MessageWindow();
			win.msg = message.status;
			win.show();

		}
		if (proBar) {
			// 更新滚动条进度，提示下载实时信息。
			proBar.updateProgress(message.progress/100, "", true);
		}
		// 转发信息
		//sendMessage('progressmessage', message);
	}
});

Jinpeng.common.util.HistoryCarDetailWindows = Ext.extend(Jinpeng.widget.GeneralWindow,{
	width : 300,
	height : 105,
	closeAction : "close",
	title : '提示',
	border : false,
	clickFlag : false,
	loadId : '',
	recode : null,
	initComponent : function() {
		Ext.apply(this, {
			items : [ {
				xtype : 'form',
				region : 'center',
				items : [
				{
					columnWidth : 85,
					layout : 'form',
					region : 'center',
					items : [{xtype : 'fieldset',
							layoutConfig : {
								columns : 1
							},
							items : [{
								region : 'center',
								items : [ {
									region : 'center',
									xtype : 'displayfield',
									fieldLabel : '',
									id:'carNum',
									name : 'carNum',
									anchor : '96%',
									cls:'qwqqq'
								} ]
							}]
						}]
				} ]
			} ],
				cls : 'blue-button-sadsact',
				buttonAlign : 'center',
				buttons : {
					cls : 'blue-button-cssst',
					items : [ {
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;',
						id:'id1',
						height : 20,
						width : 55,
						scope : this,
						handler : this.fengshow
					},{
						xtype : 'button',
						text : '&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;',
						id:'id2',
						height : 20,
						width : 55,
						scope : this,
						handler : this.close
					}]
				}
				
		});
		Jinpeng.common.util.HistoryCarDetailWindows .superclass.initComponent.apply(this);
	},fengshow : function(){
		var records = zhi;
		this.close();
		var ids = this.config.ids;
        if(this.config.httpUrl!=""){
        	var httpUrl = this.config.httpUrl;
        	alert(httpUrl);
        }
		if (this.config.singleImgUrl) {
			var path = Ext.getCmp('savepath').getValue();
			if (!path) {
				return;
			}
		} else if (ids.length > 0) {
			var idString = ids ? ids.join(',') : '';
			var customerIdsUrl = this.config.customerIdsUrl;
			if ('' != idString) {
				Ext.Ajax.request({
					// 将id组合成字符串传递到后台
					url : customerIdsUrl + "?idstr=" + idString,
					method : 'POST',
					params : null,
					success : function(resp, opts) {
						var txt = Ext.util.JSON.decode(resp.responseText);
						var data = txt.data;
						var dataMarked = [];
						for ( var i = 0; i < data.length; i++) {
							dataMarked[dataMarked.length] = "\"" + data[i] + "\"";
						}
						urls = dataMarked.join(',');
						// 用户选择本地路径功能
						var path = Ext.getCmp('savepath').getValue();
						// Ext.debug(path);
						if (!path) {
							return;
						}
					},
					failure : function(resp, opts) {
						
						var win = new Jinpeng.widget.MessageWindow();
						win.msg = "下载失败！请重试！";
						win.show();
						// 下载失败！关闭下载窗口。
						downPictureWindow.close();
					}
				});
			}
		} else {
			// 当前查询条件的参数对象
			var query = this.config.param;
			// 以当前查询条件从后台获取图上URL的字符串
			var downUrl = this.config.customerConditionUrl;
			// 将查询条件传递到后台，计算用户将要导出数据的总数
			Ext.Ajax.request({
				url : this.config.customerCountUrl + "?" + query,
				params : null,
				// 在回调函数中，让用户确认再导出数据
				success : function(resp, opts) {
					// 数据总数
					var txt = Ext.util.JSON.decode(resp.responseText);
					var data = txt.data;
					if (data > 5000) {
						var win = new Jinpeng.widget.MessageWindow();
						win.msg = "当前查询条件检索出记录超过<font color='red' size = 3>5000</font>条，请缩小查询范围分批下载。";
						win.show();
						// 超过最大上限，关闭下载窗口。
						downPictureWindow.close();
					} else if (data <= 5000 && data > 0) {
										Ext.Ajax.request({
											url : downUrl + "?" + query + "&historyAmount=" + data,
											params : null,
											success : function(resp, opts) {
												// 将返回结果封装为json格式的数据，并调用OCX进行图片下载。
												var txt = Ext.util.JSON.decode(resp.responseText);
												var data = txt.data;
												var dataMarked = [];
												for ( var i = 0; i < data.length; i++) {
													dataMarked[dataMarked.length] = "\"" + data[i] + "\"";
												}
												urls = dataMarked.join(',');
												// 用户选择本地路径功能
												var path = Ext.getCmp('savepath').getValue();
												if (!path) {
													return;
												}
												path = path.replace(/\\/g, '\\\\');

												var pictureUrlList = "{\"" + "packFileName\" : \"" + new Date().format('Ymdgis') + "\"," + "\"targetDir\" : \"" + path + "\"," + "\"urls\" : [" + urls
														+ "]" + "}";
												// 调用 OCX,下载图片。
												// broadcastEvent('downloadlotpictureevent',function() {},pictureUrlList);
												var result = globalOcxComm.downloadPictures(pictureUrlList);
												if (-1 == result) {
													var win = new Jinpeng.widget.MessageWindow();
													win.msg = '系统检测下载正在进行，请稍后重试！';
													win.show();

												}
											},
											failure : function(resp, opts) {
												var win = new Jinpeng.widget.MessageWindow();
												win.msg = "下载失败！请重试！";
												win.show();
												// 关闭下载窗口。
												downPictureWindow.close();
											}
										});
					} else {
						var win = new Jinpeng.widget.MessageWindow();
						win.msg = "当前查询条件检索出<font color='red' size = 3>" + data + "</font>条,请重试！";
						win.show();
						// 数据为0条，关闭下载窗口。
						downPictureWindow.close();
					}
				},
				failure : function(resp, opts) {
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = "下载失败！请重试！";
					win.show();
					// 关闭下载窗口。
					downPictureWindow.close();
				}
			});
		}
	},
	afterRender : function() {
		Jinpeng.common.util.HistoryCarDetailWindows .superclass.afterRender.call(this);
		//根据点击记录时设置的记录ID加载数据
		this.loadRecordById(this.msg);
	}
	,
	loadRecordById : function(msg) {
		var record = {};
		// 加载数据		
		record.carNum = msg;
		Ext.getCmp("carNum").setValue(msg);
	}
	
});