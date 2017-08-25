Ext.define('Ext.jp.tic.stat.CarTimeRangeAnalyzeResultGrid', {
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
			{name: 'plateNo'},
         	{name: 'type',  type: 'text'},
         	{name: 'carColor', type: 'text'},
         	'carPlateType', 'img'
      	]
  	}),
    stripeRows: true,
    columnLines: true,
    columns: [{
    	id       :'plateNo',
        text   : '车牌号码',
        flex: 1,
        sortable : true,
        dataIndex: 'plateNo'
	}, {
		id       :'type',
        text   : '车辆类型',
        flex: 1,
        sortable : true,
        dataIndex: 'type'
    }, {
		id       :'carColor',
        text   : '车身颜色',
        flex: 1,
        sortable : true,
        dataIndex: 'carColor'
    }, {
		id       :'carPlateType',
        text   : '车牌颜色',
        flex: 1,
        sortable : true,
        dataIndex: 'carPlateType'
    }, {
		id       :'carPlateType',
        text   : '车牌颜色',
        flex: 1,
        sortable : true,
        dataIndex: 'carPlateType',
        renderer: function (val) {
        	return "<img src='" + val + "' width='100' height='100'/>";
        }
    }],

    initComponent: function(){
        this.callParent(arguments);
    }
});
