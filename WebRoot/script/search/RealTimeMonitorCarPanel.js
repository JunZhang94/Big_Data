/*#############实时过车监控############*/

Ext.define("Ext.jp.tic.search.RealTimeMonitorCarPanel", {
	extend: Ext.container.Container,
	
	requireds: [ "Ext.jp.tic.component.SystemDeviceTreePanel", "Ext.jp.tic.search.RealTimeMonitorCarGrid" ],
	
	alias: "realtimemonitorcarpanel",
	border: 0,
	layout: "border",
	defaults: {
	    collapsible: false,
	    split: false,
	    bodyStyle: "padding:0",
	    border: 0
	},
	items: [
		Ext.create("Ext.jp.tic.search.RealTimeMonitorCarGrid"),    
		Ext.create("Ext.jp.tic.component.SystemDeviceTreePanel", {region: "west", width: 275, autoScroll: true})
	, {
	    title: "实时图像",
	    region:"center",
	    border: "1 1 0 0",
	    html: "<img src='./tmp/1.jpg' id='carImg' width='875' height='450'/>"
	}],
	initComponent: function(){
		this.callParent(arguments);
		
		var amq = org.activemq.Amq;
				 
		amq.init({
		    uri: "amq",
		    logging: true,
			timeout: 20,
			clientId: (new Date()).getTime().toString()
		});
		
	    
	    var _this = this;   
	    var grid = this.items.getAt(0); 
	    grid.getStore().on("add", function (store, records, index, eOpts) {
	    	if (store.getCount() > 10) {
	    		store.removeAt(10);
	    	}
	    });
	    
	    amq.addListener("JP.SICS.Common", "topic://JP.SICS.Common", function (message) {
	    	
	    	var result = message.nodeValue.toString().split(",");
	    	var checkNodeId = _this.items.getAt(1).getCheckedNode().child[0];
	    	
	    	//if (result[0] == "A01" && checkNodeId == result[11]) {
	    	if (result[0] == "A01") {
		    	/*['4012100001', '广州萝岗神舟路A', 45.45, 60.00,  '粤A5846A', '蓝', '逆行',  '9/11 12:00am'],*/
		    	
		    	Ext.query("img[id=carImg]")[0].setAttribute("src", result[10]);
		    	
		    	/*grid.getStore().loadData([
		    		[result[11], result[2], result[8], result[5], result[4], result[6], result[7], result[8]]
		    	], true);*/
		    	grid.getStore().insert(0, [
		    		[result[11], result[2], result[8], result[5], result[4], result[6], result[7], result[8]]
		    	]);
	    	}
	    });
           
        var temp = [
        	"A01,123,kk11,cd23,%E7%B2%A55662,123,蓝色,绿色,2014-08-22 12:22:12,57,./tmp/1.jpg,123123,sb4011121112",
        	"A01,123,kk12,cd23,%E8%B1%ABG8L299,123,蓝色,绿色,2014-08-02 12:22:12,57,./tmp/2.jpg,123123,sb4011121112",
        	"A01,123,kk15,cd23,%E7%B2%A52222,123,蓝色,绿色,2014-08-12 12:22:12,57,./tmp/3.jpg,123123,sb4011121112",
        	"A01,123,kk14,cd23,%E7%B2%A53333,123,蓝色,绿色,2014-08-14 12:22:12,57,./tmp/4.jpg,123123,sb4011121112",
        	"A01,123,kk13,cd23,%E7%B2%A54444,123,蓝色,绿色,2014-08-16 12:22:12,57,./tmp/5.jpg,123123,sb4011121112"
        ];    
        
		setInterval(function () {
			/*A01,123,kk12,cd23,粤A55662,123,蓝色,绿色,2014-08-22 12:22:12,57,1,123123,sb4011121112*/
			var i = Math.floor(Math.random()*5);
			amq.sendMessage("topic://JP.SICS.Common", temp[i]);
		}, 5000);
	}
});