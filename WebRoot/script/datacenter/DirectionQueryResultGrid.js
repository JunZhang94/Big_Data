DirectionQueryResultGrid_DATA_URL = "./batch/task/search.mvc";
Ext.define('Ext.jp.tic.datacenter.DirectionQueryResultGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.querycargrid',
    requireds: [ "Ext.ux.RowExpander" ],
    
    title: "查询结果",
    flex: 1,
    autoHeight: true,
    minSize: 300,
    maxSize: 600,
    height: 200,
    loadMask: {msg: "数据加载中，请稍等..."}, 
    store: Ext.create('Ext.data.Store', {
        pageSize: 50,
        remoteSort: true,
        autoLoad: true,
        fields: [
            'id', 'jobId', 'jobName', 'taskName',
            {name: 'startTime', type: 'date', dateFormat: 'timestamp'},
            {name: 'endTime', type: 'date', dateFormat: 'timestamp'},
            'taskParam','status',
            {name: 'statusUpdateTime', type: 'date', dateFormat: 'timestamp'}
        ],
        proxy: {
            type: 'ajax',
            method: "POST",
            timeout: 30000,
            url: DirectionQueryResultGrid_DATA_URL,
            /*extraParams: {a: 1, b: 2},*/
            limitParam: "pageSize",
            reader: {
            	type: "json",
                root: 'data',
                totalProperty: 'totalCount'
            },
            simpleSortMode: true
        }/*,
        sorters: [{
            property: 'jgsj',
            direction: 'DESC'
        }]*/
    }),
    stripeRows: true,
    columnLines: true,
    columns: [{
    	id       :'taskName',
        text   : '方向编号',
        width    : 95,
        sortable : true,
        dataIndex: 'taskName'
	}, {
		id       :'startTime',
        text   : '方向名称',
        width    : 95,
        sortable : true,
        dataIndex: 'startTime'
    }, {
    	id		 : 'endTime',
        text   	 : '类型',
        width    : 95,
        sortable : true,
        dataIndex: 'endTime'
    }, {
        text   : '所属单位',
        width    : 55,
        sortable : true,
        dataIndex: 'status'
    }],

	
    initComponent: function(){
    	var _grid = this;
    	Ext.apply(this, {
    		plugins: Ext.create("Ext.ux.RowExpander", {
            	rowBodyTpl : [
	                '<p><b>信息编号：</b>{xxbh} &nbsp;&nbsp; <b>卡口编号：</b> {kkbh} &nbsp;&nbsp; <b>设备编号：</b> {sbbh}</p>',
	                '<p><b>方向编号：</b>{fxbh} &nbsp;&nbsp; <b>车道编号：</b> {cdbh} &nbsp;&nbsp; <b>车尾号牌：</b> {cwhphm} &nbsp;&nbsp; <b>车尾号牌颜色：</b> {cwhpys} &nbsp;&nbsp; <b>号牌一致：</b> {hpyz}</p>',
	                '<p><b>车辆速度：</b>{clsd} &nbsp;&nbsp; <b>车辆限速：</b> {clxs} &nbsp;&nbsp; <b>车身长度：</b> {cscd} &nbsp;&nbsp; <b>行驶状态：</b> {xszt} &nbsp;&nbsp; <b>违法状态：</b> {wfzt}</p>',
	                '<p><b>车辆品牌：</b>{clpp} &nbsp;&nbsp; <b>车辆外形：</b> {clwx} &nbsp;&nbsp; <b>车身颜色：</b> {csys} &nbsp;&nbsp; <b>车辆类型：</b> {cllx} &nbsp;&nbsp; <b>号牌种类：</b> {hpzl}</p>',
	                '<p><img src="{tx1}"/></p>'
	            ],
	            grid: _grid
        	}),
      
    		bbar: Ext.create('Ext.PagingToolbar', {
		        store: this.store,
		        displayInfo: true
		    })
    	});
        this.callParent(arguments);
    },
    change: function(val) {
    	val = ~~val;
        if (val > 20) {
            return '<span style="color:green;">' + val + '</span>';
        } else if (val < 10) {
            return '<span style="color:red;">' + val + '</span>';
        }
        return val;
    }
});
