Ext.define('Ext.jp.tic.search.RealTimeMonitorCarGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.monitorcargrid',
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
    }
});
