Ext.define('Ext.jp.tic.stat.CarAnalyzeRateResultGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.monitorcargrid',
    uses: [
        'Ext.data.ArrayStore'
    ],
    
    title: "查询结果",
    flex: 1,
    autoHeight: true,
    minSize: 300,
    maxSize: 600,
    height: 200,
    store: Ext.create('Ext.data.ArrayStore', {
		fields: [
			{name: 'HPHM'}, 'ID', 'START_TIME', 'END_TIME', 'KKBH', 'KKMC', 'STARTDATE', 'ENDDATE',
         	{name: 'COUNT', type: 'number'}, {name: 'HPHM_COUNT', type: 'number'}, {name: 'NON_HPHM_COUNT', type: 'number'}
      	]
  	}),
    stripeRows: true,
    columnLines: true,
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
        hidden: true,
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
        hidden: true,
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
    }],

    initComponent: function(){
        this.callParent(arguments);
    }
});
