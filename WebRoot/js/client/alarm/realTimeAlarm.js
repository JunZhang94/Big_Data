var results = new Array();
/**
 * \ * 入口
 */
Ext.ns("Jinpeng.realTimeAlarmMonitory");

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
			xtype : 'alarmGridPanel'
		} ]
	});
	if(this.parent.window.opener){
		alert(this.parent.window.opener.results);
		this.results=this.parent.window.opener.results;
		initData(this.parent.window.opener.results);
	}
	monitoryData();
});

/**
 * 列表数据Store
 */
var dataListStore = new Ext.data.ArrayStore({
	fields : [
		      {name : 'bjxxbh'},
		      {name : 'bkxxbh'},
		      {name : 'kkbh'},
		      {name : 'sbbh'},
		      {name : 'tx1'},
		      {name : 'kkmc'},
		      {name : 'hphm',type: 'text'},
		      {name : 'passtime'},
		      {name : 'bjsk'},
	          {name : 'bjlx',type: 'text'}
	      ]
});
/**
 * 中心右区域数据显示中心
 */ 
Jinpeng.realTimeAlarmMonitory.dataGridPanel = Ext.extend(Ext.grid.GridPanel,{
		id : 'dataGridPanel',
		autoLoad : false,
		totalLength : null,
		stripeRows : true,
		enableHdMenu : false,
		pageSize : 10,
		border : false,
		initComponent : function() {
			var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
			Ext.apply(this,{
				store : dataListStore,
				colModel : new Ext.grid.ColumnModel({
					defaults : {
						sortable : false
					},
					columns : [
							new Ext.ux.grid.PagingRowNumberer({ width : 40}),
							sm,
								{
									header : "告警信息编号", dataIndex : 'bjxxbh',hidden:true
								}, {
									header : "布控信息编号", dataIndex : 'bkxxbh',hidden:true
									}, {
									header : "卡口编号", dataIndex : 'kkbh',hidden:true
									}, {
										header : "设备编号", dataIndex : 'sbbh',hidden:true
						/**			}, {
									header : "经度", dataIndex : 'longitude'
									}, {
									header : "纬度", dataIndex : 'latitude' */
									}, {
									header : "图片URL", dataIndex : 'tx1',hidden:true
									}, {
										header : "卡口名称", dataIndex : 'kkmc'
								}, {
									header : "号牌号码", dataIndex : 'hphm'
									}, {
									header : "经过时间", dataIndex : 'passtime'
									}, {
									header : "报警时间", dataIndex : 'bjsk'
								}, {
									header : "告警类型", dataIndex : 'bjlx'
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
								text : '智能封控',
								handler : this.sendControl2MQ
							},{
								xtype : 'tbspacer',
								width : 10
							},{
								xtype : 'button',
								id : 'delOperator',
								text : '删除',
								handler : this.deleteObjects
							}]
						}
			});
			Jinpeng.realTimeAlarmMonitory.dataGridPanel.superclass.initComponent.apply(this);
		},
		sendAlarm2MQ:function(){
			var records =Ext.getCmp('dataGridPanel').getSelectionModel().getSelections();
			if(records.length<=0){
				alert("请先选择联网告警信息，谢谢！");
				return;
			}
			var amq = org.activemq.Amq;
			for(var i=0;i<records.length;i++){
				var alarmObj=records[i];
				var kkbh=alarmObj.get("kkbh");
			//	kkbh="440111670351022001";
				var params = {'kkbh': kkbh};
				Ext.Ajax.request({
					// 将id组合成字符串传递到后台
					url : rootpath+'/deviceinfo/findDeviceByKkbh.mvc',
					method : 'POST',
					params : params,
					success : function(resp, opts) {
						//var o=resp.responseData;
						var o = resp.responseData || Ext.decode(resp.responseText);
						var result=o.data;//alert(result.kkmc+"/"+result.jd+"/"+result.wd);
						alarmObj.kkmc=result.kkmc;
						alarmObj.longitude=result.jd;
						alarmObj.latitude=result.wd;
						var message=getAlarmMqMsg(alarmObj);
						amq.sendMessage("topic://AlarmTopic",message);
						//amq.sendMessage("topic://\/topic/interactive",message);
						//alert("告警信息发送成功!");
					},
					failure : function(resp, opts) {
						var win = new Jinpeng.widget.MessageWindow();
						win.msg = "获取设备信息失败";
						win.show();
					},
					scope : this
				});
			}
			Ext.getCmp('dataGridPanel').getSelectionModel().clearSelections();
		},
		sendControl2MQ:function(){
			var records =Ext.getCmp('dataGridPanel').getSelectionModel().getSelections();
			if(records.length<=0){
				alert("请先选择智能封控信息，谢谢！");
				return;
			}
			var amq = org.activemq.Amq;
			for(var i=0;i<records.length;i++){
				var alarmObj=records[i];
				var kkbh=alarmObj.get("kkbh");
				var params = {'kkbh': kkbh};
				Ext.Ajax.request({
					// 将id组合成字符串传递到后台
					url : rootpath+'/deviceinfo/findDeviceByKkbh.mvc',
					method : 'POST',
					params : params,
					success : function(resp, opts) {
						var o = resp.responseData || Ext.decode(resp.responseText);
						var result=o.data;
						
						var message='{"action":"312","data":{"deviceNum":"'+result.deviceNum
									+'","longitude":"'+result.jd
									+'","latitude":"'+result.wd
									+'","area": "1000"}}';
						//alert(message);
						amq.sendMessage("topic://AlarmTopic",message);
						//amq.sendMessage("topic://\/topic/interactive",message);
						alert("封控信息发送成功!");
					},
					failure : function(resp, opts) {
						var win = new Jinpeng.widget.MessageWindow();
						win.msg = "获取设备信息失败";
						win.show();
					},
					scope : this
				});
			}
			Ext.getCmp('dataGridPanel').getSelectionModel().clearSelections();
		},	
		deleteObjects:function(){
			var grid=Ext.getCmp('dataGridPanel');
			var records =grid.getSelectionModel().getSelections();
			if(records.length<=0){
				alert("请先选择要删除的告警，谢谢！");
				return;
			}
			var newResult=new Array();
			var dataResult=parent.window.opener.results;
			//重建数组，只存储未被删除的数据
			for(var k=0;k<dataResult.length;k++){
				var bjxx=dataResult[k][0];
				var matchFlag=false;
				for(var i=0;i<records.length;i++){
					var alarmObj=records[i];
					var objxxbh=alarmObj.get("bjxxbh");
					if(objxxbh ==bjxx){
						matchFlag=true;
					}
				}
				if(!matchFlag){
					newResult.unshift(dataResult[k]);
				}
			}
			parent.window.opener.results=newResult;
			//alert(newResult.length);
			var alarmNum=newResult.length;
			parent.window.opener.setAlarmNum(alarmNum);
			initData(parent.window.opener.results);
			
		}
	});
function initData(initData){
	dataListStore.loadData(initData, false);
}

function getTotalAlarm3(){
	Ext.Ajax.request({
		// 将id组合成字符串传递到后台
		url : '/Big_Data/controlAlarm/countControlAlarm.mvc',
		method : 'POST',
		params : {'kkbh': '440100000000000001'},
		success : function(resp, opts) {
			
			
			//amq.sendMessage("topic://\/topic/interactive",message);
		},
		failure : function(resp, opts) {
			var win = new Jinpeng.widget.MessageWindow();
			win.msg = "获取初始列表失败";
			win.show();
		}
	});
}

//设备状态数据监控
function monitoryData() {
	var amq = org.activemq.Amq;
	 
	amq.init({
	    uri: "amq",
	    logging: true,
		timeout: 20,
		clientId: (new Date()).getTime().toString()
	});
//  amq.addListener("/topic/interactive", "topic://\/topic/interactive", function (message) {
	amq.addListener("JP.SICS.Common", "topic://JP.SICS.Common", function (message) {
	var resultStr=decodeUTF8(message.data.toString());
	alert("recv=========="+resultStr);
    var result = resultStr.split(",");
    var msgType=result[0];
    if(msgType=="B01"){
		if(this.parent.window.opener){
			dataListStore.loadData(this.parent.window.opener.results, false);
         
	    }else{
	    	var newResults = [result[1], result[2], result[3], result[4], result[5], result[6], result[7],result[8],result[9],"布控告警"];
	    	results.unshift(newResults);
		    var alarmNum=results.length;
		   alert("thisalarmNum=="+alarmNum);
		    dataListStore.loadData(newResults, false);
		   // setAlarmNum(alarmNum);
	    }
       }
    });
};
function getAlarmMqMsg(alarmObj){
var msg='{	"action": "202",'
		 +   '"data": {'
		 +		'"flag":"B01",'
		 +	    '"bjxxbh":"",'
		 +	    '"bkxxbh":"'+alarmObj.get("bkxxbh")+'",'
		 +	    '"hphm":"'+alarmObj.get("hphm")+'",'
		 +	    '"passtime":"'+alarmObj.get("passtime")+'",'
		 +	    '"kkbh":"'+alarmObj.deviceNum+'",'
		 +	    '"bjlx":"布控告警",'
		 +	    '"tx1":"'+alarmObj.get("tx1")+'",'
		 +	    '"bjsk":"'+alarmObj.get("bjsk")+'",'
		 +	    '"lxdh":"",'
		 +	    '"kkmc":"'+alarmObj.kkmc+'",'
		 +	    '"dxfsbs":"",'
		 +	    '"direction":"",'
		 +	    '"lane":"",'
		 +	    '"clxxbh":"",'
	     +		'"longitude":"'+alarmObj.longitude+'",'
		 +		'"latitude":"'+alarmObj.latitude+'"'
		 +		'}}';
		return msg;

};
function decodeUTF8(str){
	return str.replace(/(\\u)(\w{4}|\w{2})/gi, function($0,$1,$2){  
	    return String.fromCharCode(parseInt($2,16));  
	});
}
Ext.reg('alarmGridPanel',Jinpeng.realTimeAlarmMonitory.dataGridPanel);
//Ext.reg('northFormPanel',Jinpeng.deviceMonitory.NorthFormPanel);
