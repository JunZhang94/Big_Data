var CarQueryResultGrid_DATA_URL = "./car/query/data.mvc";

var viewImg = function (target) {
	window.open(target.getAttribute("src"), "_blank");
};

Ext.define('Ext.jp.tic.search.CarQueryResultGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.querycargrid',
    requireds: [ "Ext.ux.RowExpander" ],
    
    title: "查询结果",
    flex: 1,
    autoHeight: true,
    minSize: 300,
    maxSize: 600,
    height: 200,
    loadMask: false, 
    store: Ext.create('Ext.data.Store', {
        /*pageSize: 30,
        remoteSort: false,
        autoLoad: false,*/
        fields: [
            'hphm', 'hpys2', 'hpzl2', 'kkmc', 'dwmc',
            {name: 'clsd', type: 'string'},
            {name: 'jgsj', type: 'string'},
            {name: 'xxbh', type: 'string'}, {name: 'kkbh', type: 'string'}, {name: 'sbbh', type: 'string'},
            {name: 'fxbh', type: 'string'}, {name: 'cdbh', type: 'string'}, {name: 'cdlx', type: 'string'},
            {name: 'hpyz', type: 'string'}, {name: 'cscd', type: 'number'}, {name: 'clxs', type: 'float'},
            'cwhphm', 'cwhpys', 'xszt', 'wfzt', 'clpp', 'clwx', 'cllx', 'clpp', 'hpzlmc', 'hpysmc',
            'tx1', 'tx2', 'tx3', 'tx4'
        ]/*,
        proxy: {
            type: 'ajax',
            timeout: 3000000,
            url: CarQueryResultGrid_DATA_URL,
	        actionMethods: {read: "POST"},
            limitParam: "pageSize",
            startParam: "start",
            pageParam: "pageNo",
            reader: {
            	type: "json",
                root: 'result',
                totalProperty: 'totalCount'
            },
            simpleSortMode: false
        }*/
    }),
    stripeRows: true,
    columnLines: true,
    columns: [{
    	id       :'hphm',
        text   : '车牌号码',
        width    : 95,
        sortable : true,
        dataIndex: 'hphm'
	}, {
		id       :'hpys2',
        text   : '号牌颜色',
        width    : 95,
        sortable : true,
        dataIndex: 'hpysmc'
    }, {
        text   : '号牌种类',
        width    : 95,
        sortable : true,
        dataIndex: 'hpzlmc'
    }, {
        text   : '车辆速度',
        width    : 55,
        sortable : true,
        dataIndex: 'clsd',
        renderer: function(val) {
	    	val = ~~val;
	        if (val > 20) {
	            return '<span style="color:green;">' + val + '</span>';
	        } else if (val < 10) {
	            return '<span style="color:red;">' + val + '</span>';
	        }
	        return val;
	    }
    }, {
        text   : '卡口名称',
        flex    : 1,
        sortable : true,
        dataIndex: 'kkmc'
    }, {
        text   : '单位名称',
        width    : 225,
        sortable : true,
        dataIndex: 'dwmc'
    }, {
        text   : '经过时间',
        width    : 155,
        sortable : true,
        dataIndex: 'jgsj',
        renderer: function (val) {
        	if (val) {
        		return Ext.util.Format.date(new Date(Number(val)), 'Y-m-d H:i:s');
        	}
        	return "";
        }
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
	                '<p><img src="{tx1}" width="100" height="100" onclick="viewImg(this)"/></p>'
	            ],
	            grid: _grid
        	})/*,
        	bbar: Ext.create('Ext.PagingToolbar', {
		        store: this.store,
		        displayInfo: true
		    })*/
    	});
        this.callParent(arguments);
        
        
    }
});
