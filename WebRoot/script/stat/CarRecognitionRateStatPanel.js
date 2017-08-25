var DEPT_DATA_URL = "./car/query/dept.mvc?code=440100";
var MOUNT_DATA_URL = "./car/cascade.mvc";
var SUBMIT_RESULT_GRID_DATA_URL = "./car/analyze/rate/data.mvc";

Ext.define("Ext.jp.tic.stat.CarRecognitionRateStatPanel", {
	extend: "Ext.jp.tic.stat.CarAnalyzeRatePanel",
	
	requireds: [ "Ext.jp.tic.stat.CarAnalyzeRateResultGrid" ],
	
	initComponent: function(){
		this.callParent(arguments);
		
		this.items.removeAt(1);/*删除CarAnalyzeRateResultGrid*/
		this.items.add(Ext.create("Ext.jp.tic.stat.CarAnalyzeRateResultGrid", {
			columns: [{
		        text   : '卡口名称',
		        flex: 1,
		        align: 'center',
		        sortable : true,
		        dataIndex: 'KKMC'
		    }, {
		        text   : '时间区域',
		        flex: 1,
		        align: 'center',
		        sortable : true,
		        xtype: 'templatecolumn',
		        tpl: "{STARTDATE} — {ENDDATE}"
		    }, {
		        text   : '正确识别率',
		        width    : 75,
		        sortable : true,
		        renderer: function(val, metaData, record, rowIndex, colIndex, store) {
		        	
			    	val = (record.data.HPHM_COUNT / record.data.COUNT).toFixed(2) * 100;
			        if (val > 85) {
			            return '<span style="color:green;">' + val + '%</span>';
			        } else if (val < 50) {
			            return '<span style="color:red;">' + val + '%</span>';
			        }
			        return val + '%';
			    }
		    }, {
		        text   : '失败识别率',
		        width    : 75,
		        sortable : true,
		        renderer: function(val, metaData, record, rowIndex, colIndex, store) {
		        	
			    	val = (record.data.NON_HPHM_COUNT / record.data.COUNT).toFixed(2) * 100;
			        if (val > 85) {
			            return '<span style="color:green;">' + val + '%</span>';
			        } else if (val < 50) {
			            return '<span style="color:red;">' + val + '%</span>';
			        }
			        return val + '%';
			    }
		    }, {
		        text   : '过车数量',
		        width    : 75,
		        sortable : true,
		        renderer: function(val) {
			    	val = ~~val;
			        if (val > 50) {
			            return '<span style="color:green;">' + val + '</span>';
			        } else if (val < 10) {
			            return '<span style="color:red;">' + val + '</span>';
			        }
			        return val;
			    },
		        dataIndex: 'COUNT'
		    }, {
		        text   : '识别车牌数量',
		        width    : 75,
		        sortable : true,
		        renderer: function(val) {
			    	val = ~~val;
			        if (val > 50) {
			            return '<span style="color:green;">' + val + '</span>';
			        } else if (val < 10) {
			            return '<span style="color:red;">' + val + '</span>';
			        }
			        return val;shi识别率
			    },
		        dataIndex: 'HPHM_COUNT'
		    }, {
		        text   : '未识别车牌数量',
		        width    : 75,
		        sortable : true,
		        renderer: function(val) {
			    	val = ~~val;
			        if (val > 50) {
			            return '<span style="color:green;">' + val + '</span>';
			        } else if (val < 10) {
			            return '<span style="color:red;">' + val + '</span>';
			        }
			        return val;
			    },
		        dataIndex: 'NON_HPHM_COUNT'
		    }]
		}));
	}
});
