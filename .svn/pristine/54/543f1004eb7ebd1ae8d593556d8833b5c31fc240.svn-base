/*###########################临近点位分析#############################*/
Ext.define("Ext.jp.tic.stat.CarAnalyzePointPositionChart", {
    extend: 'Ext.chart.Chart',
    style: 'background:#fff',
    animate: true,
    shadow: true,
    flex: 1,
    layout: 'fit',
    store: Ext.create('Ext.data.JsonStore', {
        fields: ['name', 'data']
    }),
    axes: [{
        type: 'Numeric',
        position: 'left',
        fields: ['data'],
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title: '过车数量',
        grid: true,
        minimum: 0
    }, {
        type: 'Category',
        position: 'bottom',
        fields: ['name'],
        title: ''
    }],
    series: [{
        type: 'column',
        axis: 'left',
        highlight: true,
        tips: {
          trackMouse: true,
          width: 140,
          height: 28,
          renderer: function(storeItem, item) {
            this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data'));
          }
        },
        label: {
          display: 'insideEnd',
          'text-anchor': 'middle',
            field: 'data1',
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'vertical',
            color: '#333'
        },
        xField: 'name',
        yField: 'data'
    }]
});