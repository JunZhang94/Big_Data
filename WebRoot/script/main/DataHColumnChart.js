Ext.ns("Jinpeng.dataChart");
/**
 * ColumnChart
 * 
 * @class Jinpeng.dataChart.DataHColumnChart
 */
Jinpeng.dataChart.DataHColumnChart = Ext.extend(Ext.Container, {
	chartIDPrefix : "hChart_",
	storeConfig : null,
	series : [ {
		name : '异常'
	},{
		name : '正常'
	} ],
	stateful : false,
	yText : '百分比',
	transformData : function(store) {
		var cats = [];
		var values = [];
		var totals = [];
		store.each(function(record) {
			var period = record.get("PERIOD");
			var count = record.get("COUNT");
			var total = record.get("OUT");
			cats.push(period);
			values.push([ period, parseInt(count) ]);
			totals.push([ period, parseInt(total) ]);
		});
		return [ cats, [ totals,values ] ];
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
			dataColumntStore = new Ext.data.JsonStore(this.storeConfig);
			Ext.apply(this, {
				store : dataColumntStore
			});
		}
		Jinpeng.dataChart.DataHColumnChart.superclass.initComponent.apply(this);
	},
	afterRender : function() {
		this.el.dom.innerHTML = "<div id='" + this.chartIDPrefix + "ColumnHightsChart' >&nbsp;</div>";
		Jinpeng.dataChart.DataHColumnChart.superclass.afterRender.apply(this);
		this.initHightCharts();
		this.firstResized = true;
	},
	onResize : function(adjWidth, adjHeight, rawWidth, rawHeight) {
		if (this.firstResized) {
			this.firstResized = false;
		} else {
			this.dataColumnChart.setSize(adjWidth, !adjHeight ? Ext.getBody().getHeight() - 110 : adjHeight);
		}
	},
	refreshHChartData : function(store) {
		var r = this.transformData(store);
		this.doRefresh(r);
	},
	doRefresh : function(r) {
		if (this.dataColumnChart) {
			this.dataColumnChart.xAxis[0].setCategories(r[0], false);
			for ( var i = 0; i < r[1].length; i++) {
				this.dataColumnChart.series[i].setData(r[1][i], false);
				if (r[0].length <= 5) {
					this.dataColumnChart.series[i].options.pointWidth = 30;
				}
				/*switch (i) {
					case 0 : 
						this.dataColumnChart.series[i].color = '#FF0000';
						this.dataColumnChart.legend.allItems[i].color = '#FF0000';
						break;
					case 1 : `
						this.dataColumnChart.series[i].color = '#0000FF';
						this.dataColumnChart.legend.allItems[i].color = '#0000FF';
						break;
				}*/
			}

			this.dataColumnChart.redraw();
			// --- Enforce a Maximum bar width
			// if (this.dataColumnChart.series[0].data.length) {
			// if (this.dataColumnChart.series[0].data[0].plotX >= 40) {
			// this.dataColumnChart.series[0].options.pointWidth = 20;
			// }else{
			// this.dataColumnChart.series[0].options.pointWidth = null;
			// }
			// }
			// var w=Ext.get("colorColumnHightsChart").getComputedWidth();
			// var h=Ext.get("colorColumnHightsChart").getComputedHeight();
			// this.dataColumnChart.setSize(w,h);
			// alert(Ext.get("colorColumnHightsChart").getComputedWidth());
			// alert(Ext.get("colorColumnHightsChart").getComputedHeight());
		}
	},
	initHightCharts : function() {
		var h = Ext.getBody().getHeight();
		this.dataColumnChart = new Highcharts.Chart({
			chart : {
				renderTo : this.chartIDPrefix + 'ColumnHightsChart',
				reflow : false,
				height : h / 2 - 50,
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
					//rotation : -15,
					align : 'center',
					style: {
						fontWeight: 'bold'
					}
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
				layout : 'horizontal',
				align : 'center',
				verticalAlign : 'bottom',
				borderWidth : 0,
				labelFormatter : function(options) {
					var label = this.name;
					if (label == '异常') {
						this.color = '#FF0000'
					}
					if (label == '正常') {
						this.color = '#2BD56F'
					}
					return label;
				}
			},
			plotOptions: {
	            column: {
	                stacking: 'percent'
	            }
	        },

			tooltip : {
				formatter : function() {
	        		var desc = '';
	        		if (this.points[1] != null) {
	        			desc = '<b>' + this.x + '</b><br/><b>总数: ' + (this.points[0].y + this.points[1].y) + '</b></br><b>' + this.points[0].series.name + '</b>: <b>' + this.points[0].y + '</b> (' + this.points[0].percentage.toFixed(1) + '%)<br>' +
						'<b>' + this.points[1].series.name + '</b>: <b>' + this.points[1].y + '</b> (' + this.points[1].percentage.toFixed(1) + '%)<br>';
	        		} else {
	        			desc = '<b>' + this.x + '</b><br/><b>' + this.points[0].series.name + '</b>: <b>' + this.points[0].y + '</b><br>';
	        		}
					return desc;
				},
				shared: true
			},
			exporting : {
				enabled : false
			},
			series : this.series
		});

	}
});

Ext.reg('dataColumnChart', Jinpeng.dataChart.DataHColumnChart);