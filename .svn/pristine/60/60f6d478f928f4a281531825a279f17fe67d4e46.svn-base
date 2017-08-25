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
	      {name : 'IP'},
          {name : 'NAME',type: 'text'},
          {name : 'CPU'},
          {name : 'MEMORY',type: 'text'},
          {name : 'DISK', type: 'text'},
          {name : 'LISTENING_PORTS', type: 'text'}
      ],
      data: [
          ['192.168.0.1','设备1','intel i3','ABC','机械硬盘','0'],
	      ['192.168.0.1','设备2','intel i3','ABC','机械硬盘','1'],
	      ['192.168.0.1','设备3','intel i3','CCD','机械硬盘','2'],
	      ['192.168.0.1','设备4','intel i3','CDC','机械硬盘','3'],
	      ['192.168.0.1','设备5','intel i3','WE','机械硬盘','0']
      ]
});
/**
 * 中心右区域数据显示中心
 */ 
Jinpeng.deviceMonitory.DeviceInfoCenterGridPanel = Ext.extend(Ext.grid.GridPanel,{
		id : 'deviceMonitoryRecordGridPanel',
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
							{
								header : "IP", dataIndex : 'IP'
							}, {
								header : "NAME", dataIndex : 'NAME'
							}, {
								header : "CPU", dataIndex : 'CPU'
							}, {
								header : "Memory", dataIndex : 'MEMORY'
							}, {
								header : "Disk", dataIndex : 'DISK'
							},{
								header : "Listening Ports", dataIndex : 'LISTENING_PORTS',
							} ]
						})
			});
			Jinpeng.deviceMonitory.DeviceInfoCenterGridPanel.superclass.initComponent.apply(this);
		}
	});

//设备状态数据监控
function monitoryData() {
	var amq = org.activemq.Amq;
	 
	amq.init({
	    uri: "../amq",
	    logging: true,
		timeout: 20,
		clientId: (new Date()).getTime().toString()
	});
	var results = new Array();
	var counts = 0;
    //var grid = Ext.getCmp('deviceMonitoryRecordGridPanel');
    amq.addListener("test", "topic://test", function (message) {
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
    	/*"1111,设备1,2014-05-22 12:22:12,龙洞,0",
    	"2222,设备2,2014-06-02 12:22:12,天河客运站,1",
    	"3333,设备3,2014-07-12 12:22:12,迁岗村,2",
    	"4444,设备4,2014-07-14 14:22:12,神舟路,3",
    	"5555,设备5,2014-07-16 16:22:12,科学大道,0"*/
    ];    
    
	setInterval(function () {
		var i = Math.floor(Math.random()*5);
		amq.sendMessage("topic://test", tempa[i]);
	}, 5000);
}
Ext.reg('deviceMonitoryInfoCenterGridPanel',Jinpeng.deviceMonitory.DeviceInfoCenterGridPanel);
