var ALARM_DATA_RESULT_URL = "./controlManager/queryControl.mvc";

Ext.define('Ext.jp.tic.alarm.RealTimeMonitorAlarmCarGrid', {
    extend: 'Ext.grid.Panel',
    uses: [
        'Ext.data.ArrayStore'
    ],
    
    title: "实时数据",
    region: "south",
    height: 200,
    minSize: 75,
    maxSize: 250,
    myData: [
        ['4012100001', '广州萝岗神舟路A', 45.45, 60.00,  '粤A5846A', '蓝', '逆行',  '9/11 12:00am'],
        ['4012100002', '广州萝岗大观中路', 46.45, 60.00,  '粤A2846A', '蓝', '逆行',  '3/21 12:00am'],
        ['4012100003', '广州萝岗开创大道A', 75.45, 60.00,  '粤A5811', '蓝', '逆行',  '7/10 12:00am'],
        ['4012100004', '广州萝岗揽月路口', 85.45, 60.00,  '粤A5226A', '蓝', '逆行',  '6/5 12:00am'],
        ['4012100005', '广州萝岗科学城路口', 35.45, 60.00,  '粤A53456', '蓝', '正常',  '2014-07-21 14:55:21']
    ],

    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
    change: function(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '</span>';
        } else if (val < 0) {
            return '<span style="color:red;">' + val + '</span>';
        }
        return val;
    },

    initComponent: function(){

        var store = Ext.create('Ext.data.ArrayStore', {
            fields: [
               {name: 'deviceCode'},
               {name: 'deviceName',  type: 'text'},
               {name: 'speed', type: 'float'},
               {name: 'restrictSpeed', type: 'float'},
               {name: 'plateNumber'}, {name: 'plateColor'}, {name: "illegalType"},
               {name: 'passTime', type: 'string',  dateFormat: 'y-m-d H:i:s'}
            ],
            data: this.myData
        });

        Ext.apply(this, {
            //height: 300,
            height: this.height,
            store: store,
            stripeRows: true,
            columnLines: true,
            columns: [{
                id       :'deviceCode',
                text   : '设备编号',
                width: 120,
                sortable : true,
                dataIndex: 'deviceCode'
            },{
                id       :'deviceName',
                text   : '设备名称',
                //width: 120,
                flex: 1,
                sortable : true,
                dataIndex: 'deviceName'
            },{
                text   : '速度',
                width    : 75,
                sortable : true,
                renderer : this.change,
                dataIndex: 'speed'
            },{
                text   : '限制速度',
                width    : 75,
                sortable : true,
                dataIndex: 'restrictSpeed'
            },{
                text   : '车牌号码',
                width    : 75,
                sortable : true,
                dataIndex: 'plateNumber'
            },{
                text   : '车牌颜色',
                width    : 75,
                sortable : true,
                dataIndex: 'plateColor'
            },{
                text   : '违法类型',
                width    : 75,
                sortable : true,
                dataIndex: 'illegalType'
            },{
                text   : '经过时间',
                width    : 120,
                dataIndex: 'passTime'
            }]
        });

        this.callParent(arguments);
        
        var amq = org.activemq.Amq;
				 
		amq.init({
		    uri: "amq",
		    logging: true,
			timeout: 20,
			clientId: (new Date()).getTime().toString()
		});
		
	    
	    var grid = this; 
	    grid.getStore().on("add", function (store, records, index, eOpts) {
	    	if (store.getCount() > 10) {
	    		store.removeAt(10);
	    	}
	    });
	    
	    
	    amq.addListener("JP.SICS.Common", "topic://JP.SICS.Common", function (message) {
	    	
	    	var result = message.nodeValue.toString().split(",");
	    	
	    	if (result[0] == "A01") {
		    	/*['4012100001', '广州萝岗神舟路A', 45.45, 60.00,  '粤A5846A', '蓝', '逆行',  '9/11 12:00am'],*/
		    	
		    	Ext.Ajax.request({  
				    url: ALARM_DATA_RESULT_URL,  
				    method: 'POST',  
				    timeout: 10000,  
				    params: { 
				    	queryType: "revoke",
				    	"page.start": 1,
				    	"page.limit": 1000000
				    },  
				    success: function(response , options){  
				        console.log(Ext.decode(response.responseText));
				        
				        var controlDatas = Ext.decode(response.responseText).result;
				        for (var i in controlDatas) {
				        	if (controlDatas[i].HPHM == result[4]) {
						        grid.getStore().insert(0, [
						    		[result[11], result[2], result[8], result[5], result[4], result[6], result[7], result[8]]
						    	]);
						    	break;
				        	}
				        }
				    },  
				    failure: function(response, options){  
						var win = new Jinpeng.widget.MessageWindow();
						win.msg = "数据加载出现错误，请检查你的网络和服务器或是尝试刷新页面！";
						win.show();
				    }  
				});
	    	}
	    });
           
        var temp = [
        	"A01,123,kk11,cd23,%E7%B2%A55662,123,蓝色,绿色,2014-08-22 12:22:12,57,./tmp/1.jpg,123123,sb4011121112",
        	"A01,123,kk12,cd23,%E8%B1%ABG8L299,123,蓝色,绿色,2014-08-02 12:22:12,57,./tmp/2.jpg,123123,sb4011121112",
        	"A01,123,kk15,cd23,%E7%B2%A52222,123,蓝色,绿色,2014-08-12 12:22:12,57,./tmp/3.jpg,123123,sb4011121112",
        	"A01,123,kk14,cd23,%E7%B2%A53333,123,蓝色,绿色,2014-08-14 12:22:12,57,./tmp/4.jpg,123123,sb4011121112",
        	"A01,123,kk13,cd23,%E7%B2%A54444,123,蓝色,绿色,2014-08-16 12:22:12,57,./tmp/5.jpg,123123,sb4011121112"
        ];    
        
		//setInterval(function () {
			/*A01,123,kk12,cd23,粤A55662,123,蓝色,绿色,2014-08-22 12:22:12,57,1,123123,sb4011121112*/
			var i = Math.floor(Math.random()*5);
			amq.sendMessage("topic://JP.SICS.Common", temp[i]);
		//}, 5000);
    }
});
