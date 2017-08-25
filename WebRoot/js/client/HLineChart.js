Ext.ns("Jinpeng.chart");
/**
 * HLineChart
 * 
 * @class Jinpeng.chart.HLineChart
 */
Jinpeng.chart.HLineChart = Ext.extend(Ext.Container, {
	chartIDPrefix : "hChart_",
	storeConfig : null,
	series : [ {
		name : '统计'
	} ],
	yText : '数量',
	stateful : false,
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
		var _this = this;
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
			lineChartStore = new Ext.data.JsonStore(this.storeConfig);
			Ext.apply(this, {
				store : lineChartStore
			});
		}
		Jinpeng.chart.HLineChart.superclass.initComponent.apply(this);
	},
	afterRender : function() {
		this.el.dom.innerHTML = "<div id='" + this.chartIDPrefix + "LineHightsChart' >&nbsp;</div>";
		Jinpeng.chart.HLineChart.superclass.afterRender.apply(this);
		this.initHightCharts();
		this.firstResized = true;
	},
	onResize : function(adjWidth, adjHeight, rawWidth, rawHeight) {
		if (this.firstResized) {
			this.firstResized = false;
		} else {
			this.HLineChart.setSize(adjWidth, !adjHeight ? Ext.getBody().getHeight() - 110 : adjHeight);
		}
	},
	refreshHChartData : function(store) {
		var r = this.transformData(store);
		this.doRefresh(r);
	},
	doRefresh : function(r) {
		if (this.HLineChart) {
			this.HLineChart.xAxis[0].setCategories(r[0], false);
			for ( var i = 0; i < r[1].length; i++) {
				this.HLineChart.series[i].setData(r[1][i], false);
			}
			this.HLineChart.redraw();
			// --- Enforce a Maximum bar width
			// if (this.HLineChart.series[0].data.length) {
			// if (this.HLineChart.series[0].data[0].plotX >= 40) {
			// this.HLineChart.series[0].options.pointWidth = 20;
			// }else{
			// this.HLineChart.series[0].options.pointWidth = null;
			// }
			// }
			// var w=Ext.get("colorLineHightsChart").getComputedWidth();
			// var h=Ext.get("colorLineHightsChart").getComputedHeight();
			// this.HLineChart.setSize(w,h);
			// alert(Ext.get("colorLineHightsChart").getComputedWidth());
			// alert(Ext.get("colorLineHightsChart").getComputedHeight());
		}
	},
	initHightCharts : function() {
		this.HLineChart = new Highcharts.Chart({
			chart : {
				renderTo : this.chartIDPrefix + 'LineHightsChart',
				reflow : false,
				height : Ext.getBody().getHeight() - 130,
				type : 'line',
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

Ext.reg('hLineChart', Jinpeng.chart.HLineChart);