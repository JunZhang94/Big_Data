//区域碰撞查询结果集页面
Ext.ns("Jinpeng.followLocalCar");

var praParams;//查询条件
var config = {
	queryUrl : rootpath + parent.window.opener.queryUrl
};
Ext.onReady(function() {
	var resultScript = document.getElementById("resultScript"); 
	resultScript.src="http://" + ipAdress + "/PGISViewer/PGISViewer.html";//域B的链接 
	praParams = parent.window.opener.params;
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport( {
		layout : 'border',
		id : 'portBody',
		items : [{
			//表单
			region : 'north',
			border : false,
			height : 0,
			xtype : 'northFormPanel'
		}, {
			//列表数据
			region : 'center',
			border : false,
			xtype : 'gisDataPanel'
		}]
	});
});

//表单
Jinpeng.followLocalCar.NorthFormPanel = Ext.extend(Ext.Panel,{
	id : 'resultPanel',
	initComponent : function() {
		var _panel = this;
		Ext.apply(this,{
			items : [ {} ],
			listeners : {
				afterrender : function() {
					this.resultQueryMethod();
				}
			}
		});
		Jinpeng.followLocalCar.NorthFormPanel.superclass.initComponent.apply(this);
	},
	//查询
	resultQueryMethod : function() {
		var grid = Ext.getCmp('searchFollowCarDataGrid');
		grid.store.data.length = 0;
		var datas = praParams;
		var baseparams = {
			"taskId" : datas.id,
			"carNum" : datas.carNum
		};
		grid.store.baseParams = baseparams;
		/*刷新选中*/
		this.publish("clearGridSelections",[]);
		grid.store.load({
			params : {'page.start' : 0, 'page.limit' : 8},
			callback : function(o,response,success) {
				if (o != null && o != 'undefined' && o.length > 0) {
					var rowData = o[0].data.placeAndTime.split(";");
					var carNum = datas.carNum;
					var realTimes = o[0].data.followTimes;
					//var maxLength = datas.followTimes;
					var maxLength = rowData.length;
					var fields = new Array(maxLength);
					var columns = new Array(maxLength);
					var imageWH = 100;
					var imageData = '';
					var data = null;
					var filedO = {}, columnsO = {};
					for (var i = 0; i < maxLength; i++) {
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
					colM.push( {header : '有效时间', dataIndex : 'validTime',width : 30,align : 'left',
				 	   renderer: function(value, metadata, record) {
				 	   	   var datas = record.get('placeAndTime').split(';');
 	   	                   var endDate = new Date(datas[0].split(',')[1].replace(/-/g,"/"));
 	   	                   var startDate = new Date(datas[datas.length - 1].split(',')[1].replace(/-/g,"/"));
 	   	                   //计算出相差天数
 	   	                   var times = endDate.valueOf() - startDate.valueOf();
 	   	                   var day = Math.floor(times/(1 * 24 * 60 * 60 * 1000)); //天
 	   	                   //计算出小时数
 	   	                   var leave1 = times%(1 * 24 * 60 * 60 * 1000)    //计算天数后剩余的毫秒数
 	   	                   var hours = Math.floor(Math.floor(leave1/(3600*1000))); //时
 	   	                   //计算相差分钟数
 	   	                   var leave2 = leave1%(3600*1000)        //计算小时数后剩余的毫秒数
 	   	                   var minutes = Math.floor(leave2/(60*1000))
 	   	                   var timeStr = "";
 	   	                   if (day == 0) {
 	   	                	   if (hours == 0) {
 	   	                		   timeStr = minutes + "分"
 	   	                	   } else {
 	   	                		   timeStr = hours + "时" + minutes + "分"
 	   	                	   }
 	   	                   } else {
   	                		   timeStr = day + "天" + hours + "时" + minutes + "分"
 	   	                   }
 	   	                   return timeStr;
			    	   }
				    });
					for ( var i = 0; i < fields.length; i++) {
						colM.push(columns[i]);
					}
					Ext.getCmp('searchFollowCarDataGrid').reconfigure(commuServerStore, new Ext.grid.ColumnModel(colM));
				}
			}
		});
	}
});

//字段定义
var dataFields = [
  {name : 'id'},
  {name : 'FOLLOW_CAR_NUM'},
  {name : 'placeAndTime'},
  {name : 'followTimes'},
  {name : 'MOUNTS_NUMBER'},
  {name : 'validTime'},
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

//数据源store
var commuServerStore = new Ext.data.JsonStore({
	url : rootpath+ "/followCar/query/findFollowCarFromDb.mvc",
	root : 'result',
	idProperty : 'id',
	totalProperty : 'totalCount',
	autoLoad : false,
	fields : dataFields
});

//标题定义
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
Jinpeng.followLocalCar.FollowCarGridPanel = Ext.extend(Ext.grid.GridPanel, {
	id : 'searchFollowCarDataGrid',
	border : false,
	frame:false,
	pageSize : 8,
	autoScroll : true,
	height :  Ext.getBody().getHeight(),
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
				rowclick : function(grid, rowIndex, e) {
					var data = grid.store.getAt(rowIndex);
					var placeAndTime = data.get("placeAndTime");
					var image1 = data.get("image1");
					var image2 = data.get("image2");
					var image3 = data.get("image3");
					var image4 = data.get("image4");
					var image5 = data.get("image5");
					var image6 = data.get("image6");
					var image7 = data.get("image7");
					var image8 = data.get("image8");
					var carNum = data.get("FOLLOW_CAR_NUM");
					if (placeAndTime != null && placeAndTime != '') {
						var datas = placeAndTime.split(';');
						//window.carDisIframe.GIS_Clear();//清除选择
						//window.carDisIframe.GIS_ZoomTo();
					}
				}
			}
		});
		//图片放大事件 
		this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
			var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
			var recode = grid.store.getAt(rowIndex);
			var image = '';
			var curTime=Ext.util.Format.date(new Date(), 'Y-m-d H:i:s');
			var carNum=recode.get("FOLLOW_CAR_NUM");
			var mountStr = recode.get("MOUNTS_NUMBER").split(',');
			if (fieldName == 'image1' || fieldName == 'image2' || fieldName == 'image3' || fieldName == 'image4' 
				|| fieldName == 'image5' || fieldName == 'image6' || fieldName == 'image7' || fieldName == 'image8') {
				if (recode) {
					var kkbh = '';
					if (fieldName == 'image1' && recode.data.image1 != "null") {
						image = recode.get("image1");
						kkbh = mountStr[0];
					}
					if (fieldName == 'image2' && recode.data.image2 != "null") {
						image = recode.get("image2");
						kkbh = mountStr[1];
					}
					if (fieldName == 'image3' && recode.data.image3 != "null") {
						image = recode.get("image3");
						kkbh = mountStr[2];
					}
					if (fieldName == 'image4' && recode.data.image4 != "null") {
						image = recode.get("image4");
						kkbh = mountStr[3];
					}
					if (fieldName == 'image5' && recode.data.image5 != "null") {
						image = recode.get("image5");
						kkbh = mountStr[4];
					}
					if (fieldName == 'image6' && recode.data.image6 != "null") {
						image = recode.get("image6");
						kkbh = mountStr[5];
					}
					if (fieldName == 'image7' && recode.data.image7 != "null") {
						image = recode.get("image7");
						kkbh = mountStr[6];
					}
					if (fieldName == 'image8' && recode.data.image8 != "null") {
						image = recode.get("image8");
						kkbh = mountStr[7];
					}
					this.showPicWindow(carNum,image,curTime,kkbh,rowIndex, columnIndex);
					window.carDisIframe.GIS_Clear();//清除选择
					window.carDisIframe.GIS_ZoomTo(kkbh);
				}
			}
		});
		Jinpeng.followLocalCar.FollowCarGridPanel.superclass.initComponent.apply(this);
	},
	//图片放大显示
	showPicWindow : function(carNum,image,curTime,kkbh, rowIndex, colIndex, item, event) {
		if (image != undefined && image != null && image != '') {
			//创建window窗体
			var win = new Jinpeng.followLocalCar.ShowPictureWindow();
			win.id=colIndex+""+rowIndex;
			win.carNum=carNum;
			win.image = image;
			win.curTime = curTime;
			win.kkbh = kkbh;
			win.show();
		}
	}
});

//GisPanel区域
Jinpeng.followLocalCar.GisDataPanel = Ext.extend(Ext.Panel,{
	frame:true,
    collapsible:true,
    layout:'fit',
	initComponent : function() {
		var hh = Ext.getBody().getHeight();
		Ext.apply(this,{
			layout : 'border',
			border : false,
			defaults : {
				margins : '0 0 0 0'
			},
			items : [ {
				region : 'center',
				layout : 'column',
				items : [{
					columnWidth : 0.5,
					xtype : 'gisGridPanel'
				}, {
					columnWidth : 0.5,
					id : 'gisShow',
					xtype : 'panel',
					items : [{
						html : "<iframe id='carDisIframe' class='carDisIframe' src='http://" + ipAdress + "/PGISViewer/PGISViewer.html' width='99.5%' height='" + hh + "' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>"
					}]
				}]
			}]
		});
		Jinpeng.followLocalCar.GisDataPanel.superclass.initComponent.apply(this);
	}
});

/**
 * 弹出窗口显示图片信息
 */
Jinpeng.followLocalCar.ShowPictureWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
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
							var id = panels.id;
							var carNum = panels.carNum;
							var picUrl = panels.image;
							var curTime = panels.curTime;
							var kkbh = panels.kkbh;
							linkDownloadPicture(id,carNum,picUrl,curTime,kkbh);
							//根据Id下载图片
							//linkDownloadPicture(picUrl);
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
		Jinpeng.followLocalCar.ShowPictureWindow.superclass.initComponent.apply(this);
	},
	afterRender : function() {
		Jinpeng.followLocalCar.ShowPictureWindow.superclass.afterRender.call(this);
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
function linkDownloadPicture(id,carNum,httpUrl,curTime,kkbh){

	var params = {'idstr': id,'url':httpUrl,'carNum':carNum,'jgsj':curTime,'kkbh':kkbh};

		Ext.Ajax.request({
			// 将id组合成字符串传递到后台
			url : rootpath + '/car/loadCarQueryAnalyzeImgUrlByIds.mvc',
			method : 'POST',
			params : params,
			success : function(resp, opts) {
				var txt = Ext.util.JSON.decode(resp.responseText);
				if(txt != "faild" && txt != "success"){
					window.open (txt,'_black');
				}else{
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = "图片路径无法访问，下载失败！请重试！";
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
Ext.reg('northFormPanel', Jinpeng.followLocalCar.NorthFormPanel);
Ext.reg('gisDataPanel', Jinpeng.followLocalCar.GisDataPanel);
Ext.reg('gisGridPanel', Jinpeng.followLocalCar.FollowCarGridPanel);