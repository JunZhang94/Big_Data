Ext.define('Ext.jp.tic.stat.AnalyzeFakePlateVehiclesResultGrid', {
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
			{name: 'HPHM'}, 'KKBH1', 'KKBH2', 'ID', 'ROW_KEY1', 'ROW_KEY2',
         	{name: 'KKMC1',  type: 'text'}, {name: 'KKMC2',  type: 'text'},
         	{name: 'JGSJ_A',  type: 'text'}, {name: 'JGSJ_B',  type: 'text'},
         	{name: 'CLSD', type: 'number'}, 'TX1', 'TX2'
      	]/*,
      	proxy: {
	    	type: 'ajax',
	        url: GRID_DATA_URL,
	        reader: {
	        	type: 'json'
	        }
	    },
	    autoLoad: false*/
  	}),
    stripeRows: true,
    columnLines: true,
    columns: [{
    	id       :'plateNo',
        text   : '车牌号码',
        width: 100,
        align: 'center',
        sortable : true,
        dataIndex: 'HPHM'
	}, {
		id       :'kkmc',
        text   : '经过卡口',
        flex: 1,
        align: 'center',
        sortable : true,
        xtype: 'templatecolumn',
        tpl: "{KKMC1} — {KKMC2}"
    }, {
		id       :'jgsj',
        text   : '经过时间',
        flex: 1,
        align: 'center',
        sortable : true,
        xtype: 'templatecolumn',
        tpl: "{JGSJ_A} — {JGSJ_B}"
    }, {
        text   : '行驶速度',
        width    : 75,
        sortable : true,
        renderer: function(val) {
	    	val = ~~val;
	        if (val > 80) {
	            return '<span style="color:green;">' + val + '</span>';
	        } else if (val < 50) {
	            return '<span style="color:red;">' + val + '</span>';
	        }
	        return val;
	    },
        dataIndex: 'CLSD'
    }, {
		id       :'tx1',
        text   : '图像1',
        width: 70,
        sortable : true,
        dataIndex: 'TX1',
        xtype: 'templatecolumn',
        tpl: '<img src="{TX1}" width="50" height="50"/>',
	    listeners: {
	    	dblclick: function (e, a, o) {
	    		var sm = e.getSelectionModel();
	    		var record = sm.getSelection()[0].data;
	    		window.open(record.TX1, "_blank");
	    	}
	    }
	    
    }, {
		id       :'tx2',
        text   : '图像2',
        width: 70,
        sortable : true,
        dataIndex: 'TX2',
        renderer: function(val) {
			return '<img src="' + val + '" width="50" height="50"/>';
	    },
	    listeners: {
	    	dblclick: function (e, a, o) {
	    		var sm = e.getSelectionModel();
	    		var record = sm.getSelection()[0].data;
	    		window.open(record.TX2, "_blank");
	    	}
	    }
    }],

    initComponent: function(){
        this.callParent(arguments);
    }
});
