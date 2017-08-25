Ext.ns("Jinpeng.chart");
/**
 * ColumnChart
 * 
 * @class Jinpeng.chart.HColumnChart
 */
Jinpeng.chart.HColumnChart = Ext.extend(Ext.Container, {
	chartIDPrefix : "hChart_",
	storeConfig : null,
	series : [ {
		name : '统计'
	} ],
	stateful : false,
	yText : '数量',
	transformData : function(store) {
		var cats = [];
		var values = [];
		store.each(function(record) {
			var period = record.get("PERIOD");
			var count = record.get("COUNT");
			cats.push(period);
			values.push([ period, parseInt(count) ]);
		});
		return [ cats, [ values ] ];
	},
	initComponent : function() {
		Ext.each(this.series, function(item, index, all) {
			item['dataLabels'] = {
				enabled : true,
				color : 'black',
				align : 'center',
				style : {
					fontSize : '13px',
					fontFamily : 'Verdana, sans-serif',
					textShadow : '0 0 3px black'
				},
				formatter : function() {
					return this.y == 0 ? "" : this.y;
				}
			};
		});

		var _this = this;
		if (this.storeConfig) {
			this.storeConfig['listeners'] = {
				'datachanged' : function(store) {
					if (store.newLoaded) {
						store.newLoaded = false;
						return;
					}
					_this.refreshHChartData.defer(1000, _this, [ store ]);
				},
				'beforeload' : function(store) {
					store.newLoaded = true;
				}
			};
			columnChartStore = new Ext.data.JsonStore(this.storeConfig);
			Ext.apply(this, {
				store : columnChartStore
			});
		}
		Jinpeng.chart.HColumnChart.superclass.initComponent.apply(this);
	},
	afterRender : function() {
		this.el.dom.innerHTML = "<div id='" + this.chartIDPrefix + "ColumnHightsChart' >&nbsp;</div>";
		Jinpeng.chart.HColumnChart.superclass.afterRender.apply(this);
		this.initHightCharts();
		this.firstResized = true;
	},
	onResize : function(adjWidth, adjHeight, rawWidth, rawHeight) {
		if (this.firstResized) {
			this.firstResized = false;
		} else {
			this.myColumnChart.setSize(adjWidth, !adjHeight ? Ext.getBody().getHeight() - 110 : adjHeight);
		}
	},
	refreshHChartData : function(store) {
		var r = this.transformData(store);
		this.doRefresh(r);
	},
	doRefresh : function(r) {
		if (this.myColumnChart) {
			this.myColumnChart.xAxis[0].setCategories(r[0], false);

			for ( var i = 0; i < r[1].length; i++) {
				this.myColumnChart.series[i].setData(r[1][i], false);
				if (r[0].length <= 5) {
					this.myColumnChart.series[i].options.pointWidth = 30;
				}
			}

			this.myColumnChart.redraw();
			// --- Enforce a Maximum bar width
			// if (this.myColumnChart.series[0].data.length) {
			// if (this.myColumnChart.series[0].data[0].plotX >= 40) {
			// this.myColumnChart.series[0].options.pointWidth = 20;
			// }else{
			// this.myColumnChart.series[0].options.pointWidth = null;
			// }
			// }
			// var w=Ext.get("colorColumnHightsChart").getComputedWidth();
			// var h=Ext.get("colorColumnHightsChart").getComputedHeight();
			// this.myColumnChart.setSize(w,h);
			// alert(Ext.get("colorColumnHightsChart").getComputedWidth());
			// alert(Ext.get("colorColumnHightsChart").getComputedHeight());
		}
	},
	initHightCharts : function() {
		this.myColumnChart = new Highcharts.Chart({
			chart : {
				renderTo : this.chartIDPrefix + 'ColumnHightsChart',
				reflow : false,
				height : Ext.getBody().getHeight() - 130,
				type : 'column',
				events : {
					load : function() {
					}
				}
			},
			title : {
				text : ''
			},
			xAxis : {
				labels : {
					rotation : -15,
					align : 'right'
				}
			},
			yAxis : {
				title : {
					text : this.yText
				},
				allowDecimals : false,
				tickPositioner : function(dataMin, dataMax) {
					dataMin = 0;
					if (dataMin == dataMax) {
						return [ 0 ];
					}
					var positions = [], tick = Math.floor(dataMin), increment = Math.ceil((dataMax - dataMin) / 10);
					if (tick < 0) {
						tick = 0;
					}
					for (; tick - increment <= dataMax; tick += increment) {
						positions.push(tick);
					}
					positions.push(tick);
					return positions;
				},
				stackLabels : {
					enabled : true,
					style : {
						color : (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
					}
				}
			},
			legend : {
				layout : 'vertical',
				align : 'right',
				verticalAlign : 'top',
				y : 100,
				borderWidth : 0
			},
			tooltip : {
				formatter : function() {
					return '<b>' + this.x + '</b><br/>' + this.y;
				}
			},
			exporting : {
				enabled : false
			},
			series : this.series
		});

	}
});

Ext.reg('myColumnChart', Jinpeng.chart.HColumnChart);