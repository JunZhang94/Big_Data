/**
 * \ * 入口
 */
Ext.ns("Jinpeng.deviceMonitory");

var viewPortObj = null;
var downPictureWindow = null;
Ext.onReady(function() {
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport({
		layout : 'border',
		items : [ {
			// 数据显示区域
			region : 'center',
			border : false,
			// 自定标签
			xtype : 'deviceMonitoryInfoCenterGridPanel'
		} ]
	});
	monitoryData();
});

/**
 * 列表数据Store
 */
var deviceMonitoryInfoStore = new Ext.data.ArrayStore({
	fields : [
		      {name : 'ID'},
	          {name : 'ALARM_TYPE',type: 'text'},
	          {name : 'ALARM_TIME'},
	          {name : 'ALARM_ADREES',type: 'text'}
	      ],
	      data: [
	          ['1111','设备1','2014-05-22 12:22:12','龙洞'],
		      ['2222','设备2','2014-05-22 12:22:12','天河客运站'],
		      ['3333','设备3','2014-05-22 12:22:12','迁岗村'],
		      ['4444','设备4','2014-05-22 12:22:12','神舟路'],
		      ['5555','设备5','2014-05-22 12:22:12','科学大道']
	      ]
});

//查询表单
Jinpeng.deviceMonitory.NorthFormPanel = Ext.extend(Ext.Panel,{
	
	initComponent : function() {
	Ext.apply(this,{
	items : [{
		// form表单
		xtype : 'form',
		id : 'carFeatureForm',
		//labelAlign : 'right',
		border : false,
		frame : true,
		cls : 'blue-button-ct',
	//	allowBlank : false,
		layout : 'table',
		defaults : {
			layout : 'form',
			//统一宽度
			width : 280
		},
		layoutConfig : {
			columns : 3
		},

		bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
		items : [{ 
		    bodyStyle : 'margin-left:400px;',
			xtype : 'compositefield',
			items : [{  
				xtype : 'button',
				flex : 31,
				id : "searchBut",
				text : '&nbsp;&nbsp;&nbsp;联网告警&nbsp;&nbsp;&nbsp;',
				handler : this.alarmMethod
			  },{
				xtype : 'button',
				flex : 31,
				id : "searchBut",
				text : '&nbsp;&nbsp;&nbsp;智能分控&nbsp;&nbsp;&nbsp;',
				handler : this.alarmMethod  
			  }]
			}]
       }]
     });
	Jinpeng.deviceMonitory.NorthFormPanel.superclass.initComponent.apply(this);
   },
  alarmMethod:function(){
	alert('ff');
  }

});
/**
 * 中心右区域数据显示中心
 */ 
Jinpeng.deviceMonitory.DeviceInfoCenterGridPanel = Ext.extend(Ext.grid.GridPanel,{
		id : 'deviceMonitoryInfoCenterGridPanel',
		autoLoad : false,
		totalLength : null,
		stripeRows : true,
		enableHdMenu : false,
		pageSize : 10,
		border : false,
		initComponent : function() {
			var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
			Ext.apply(this,{
				store : deviceMonitoryInfoStore,
				colModel : new Ext.grid.ColumnModel({
					defaults : {
						sortable : false
					},
					columns : [
							new Ext.ux.grid.PagingRowNumberer({ width : 40}),
							sm,
							{
								header : "告警编号", dataIndex : 'ID'
							}, {
								header : "告警类型", dataIndex : 'ALARM_TYPE'
							}, {
								header : "告警时间", dataIndex : 'ALARM_TIME'
							}, {
								header : "告警地点", dataIndex : 'ALARM_ADREES'
							/*}, {
								header : "告警类型", dataIndex : 'ALARM_TYPE',
								renderer:function(value){    
			        			  return  window.dictionary.getValue("Alertlevel", value);
			        	   }*/
							},{
								header : '操作', dataIndex : 'operate',
						    	xtype : 'actioncolumn',
		                    	width : 100,
		                    	align : 'center',
		                    	items : [{
									icon : rootpath + '/themes/client/blue/images/system/check.gif',
									tooltip : '查看',
									handler:this.operteObject
								}]
							} ]
						}),
						selModel : sm,//多选框
						tbar : {
							cls : 'blue-button-ct',
							items : [ {
								xtype : 'tbspacer',
								width : 12
							},{
								xtype : 'button',
								id : 'sendAram',
								text : '联网告警',
								handler : this.sendAlarm2MQ
							},{
								xtype : 'tbspacer',
								width : 10
							},{
								xtype : 'button',
								id : 'sendControl',
								text : '智能分控',
								handler : this.sendControl2MQ
							}]
						}
			});
			Jinpeng.deviceMonitory.DeviceInfoCenterGridPanel.superclass.initComponent.apply(this);
		},
		sendAlarm2MQ:function(){
			var records =Ext.getCmp('deviceMonitoryInfoCenterGridPanel').getSelectionModel().getSelections();
			var amq = org.activemq.Amq;
			for(var i=0;i<records.length;i++){
				var alarmObj=records[i];
			//alert(records+"/"+records.length+"/"+records[1].get('ALARM_TYPE'));
				var kkbh=alarmObj.ALARM_KKBH;
				kkbh="440111670351022001";
				var params = {'kkbh': kkbh};
				Ext.Ajax.request({
					// 将id组合成字符串传递到后台
					url : rootpath+'/deviceinfo/findDeviceByKkbh.mvc',
					method : 'POST',
					params : params,
					success : function(resp, opts) {
						//var o=resp.responseData;
						var o = resp.responseData || Ext.decode(resp.responseText);
						var result=o.data;alert(result.kkmc+"/"+result.jd+"/"+result.wd);
						alarmObj.kkmc=result.kkmc;
						alarmObj.longitude=result.jd;
						alarmObj.latitude=result.wd;
						//var message="mqSend,设备2,2014-06-02 12:22:12,天河客运站";
						var message=this.getAlarmMqMsg(alarmObj);alert("hh=="+message);
						amq.sendMessage("topic://JP.SICS.Common",message);
					},
					failure : function(resp, opts) {
						var win = new Jinpeng.widget.MessageWindow();
						win.msg = "图片路径无法访问，下载失败！请重试！";
						win.show();
					},
					scope : this
				});
			}
		},
		sendControl2MQ:function(){
			alert("sendControl2MQ");
			
		},
		operteObject:function(){
			alert("operteObject");
		},
		getAlarmMqMsg:function(alarmObj){alert(alarmObj.kkbh+"/"+alarmObj.kkmc);
			var msg={	"action": "202",
					    "data": {
							"flag":"B01",
						    "bjxxbh":"",
						    "bkxxbh":alarmObj.bkxxbh,
						    "hphm":alarmObj.hphm,
						    "passtime":alarmObj.jgsj,
						    "kkbh":alarmObj.kkbh,
						    "bjlx":"布控告警",
						    "tx1":alarmObj.tx1,
						    "bjsk":alarmObj.bjsk,
						    "lxdh":"",
						    "kkmc":alarmObj.kkmc,
						    "dxfsbs":"",
						    "direction":"",
						    "lane":"",
						    "clxxbh":"",
							"longitude":alarmObj.jd,
							"latitude":alarmObj.wd
							}
					};
					return msg;
		}
	});

//设备状态数据监控
function monitoryData() {
	var amq = org.activemq.Amq;
	 
	amq.init({
	    uri: "amq",
	    logging: true,
		timeout: 20,
		clientId: (new Date()).getTime().toString()
	});
	var results = new Array();
	var counts = 0;
    //var grid = Ext.getCmp('deviceMonitoryRecordGridPanel');
    amq.addListener("JP.SICS.Common", "topic://JP.SICS.Common", function (message) {
    	var result = message.nodeValue.toString().split(",");
    	//results.push(result);
    	var newResults = [result[0], result[1], result[2], result[3], result[4]];
    	results.unshift(newResults);
    	deviceMonitoryInfoStore.loadData(results, false);
    	counts = counts + 1;
    	if (counts > 5) {
    		results = [];
    		counts = 0;
    	}
    	/*Ext.Ajax.request({
			url : rootpath + '/device/saveDeviceInfo.mvc',
			async : false,
			params :{"ID" : result[0],"NAME" : result[1],"PASS_TIME" : result[2], "PASS_ADREES" : result[3], "ALARM_TYPE" : result[4]},
			success : function(r,o) {
			}
		});*/
    });
       
    var tempa = [
    	"1111,设备1,2014-05-22 12:22:12,龙洞",
    	"2222,设备2,2014-06-02 12:22:12,天河客运站",
    	"3333,设备3,2014-07-12 12:22:12,迁岗村",
    	"4444,设备4,2014-07-14 14:22:12,神舟路",
    	"5555,设备5,2014-07-16 16:22:12,科学大道"
    ];    
    
//	setInterval(function () {
//		var i = Math.floor(Math.random()*5);
//		amq.sendMessage("topic://test", tempa[i]);
//	}, 5000);
}
Ext.reg('deviceMonitoryInfoCenterGridPanel',Jinpeng.deviceMonitory.DeviceInfoCenterGridPanel);
//Ext.reg('northFormPanel',Jinpeng.deviceMonitory.NorthFormPanel);
