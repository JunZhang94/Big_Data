Ext.ns("Jinpeng.mountChart");
/**
 * ColumnChart
 * 
 * @class Jinpeng.mountChart.MountHColumnChart
 */
Jinpeng.mountChart.MountHColumnChart = Ext.extend(Ext.Container, {
	chartIDPrefix : "hChart_",
	storeConfig : null,
	series : [ {
		name : '离线'
	},{
		name : '在线'
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
			mountColumnStore = new Ext.data.JsonStore(this.storeConfig);
			Ext.apply(this, {
				store : mountColumnStore
			});
		}
		Jinpeng.mountChart.MountHColumnChart.superclass.initComponent.apply(this);
	},
	afterRender : function() {
		this.el.dom.innerHTML = "<div id='" + this.chartIDPrefix + "ColumnHightsChart' >&nbsp;</div>";
		Jinpeng.mountChart.MountHColumnChart.superclass.afterRender.apply(this);
		this.initHightCharts();
		this.firstResized = true;
	},
	onResize : function(adjWidth, adjHeight, rawWidth, rawHeight) {
		if (this.firstResized) {
			this.firstResized = false;
		} else {
			this.mountColumnChart.setSize(adjWidth, !adjHeight ? Ext.getBody().getHeight() - 110 : adjHeight);
		}
	},
	refreshHChartData : function(store) {
		var r = this.transformData(store);
		this.doRefresh(r);
	},
	doRefresh : function(r) {
		if (this.mountColumnChart) {
			this.mountColumnChart.xAxis[0].setCategories(r[0], false);
			for ( var i = 0; i < r[1].length; i++) {
				this.mountColumnChart.series[i].setData(r[1][i], false);
				//if (r[0].length <= 5) {
					this.mountColumnChart.series[i].options.pointWidth = 30;
				//}
				/*switch (i) {
					case 0 : 
						this.mountColumnChart.series[i].color = '#FF0000';
						//this.mountColumnChart.legend.itemStyle.color = '#FF0000';
						this.mountColumnChart.legend.allItems[i].color = '#FF0000';
						break;
					case 1 : 
						this.mountColumnChart.series[i].color = '#0000FF';
						//this.mountColumnChart.legend.itemStyle.color = '#0000FF';
						this.mountColumnChart.legend.allItems[i].color = '#0000FF';
						break;
				}*/
			}

			this.mountColumnChart.redraw();
			// --- Enforce a Maximum bar width
			// if (this.mountColumnChart.series[0].data.length) {
			// if (this.mountColumnChart.series[0].data[0].plotX >= 40) {
			// this.mountColumnChart.series[0].options.pointWidth = 20;
			// }else{
			// this.mountColumnChart.series[0].options.pointWidth = null;
			// }
			// }
			// var w=Ext.get("colorColumnHightsChart").getComputedWidth();
			// var h=Ext.get("colorColumnHightsChart").getComputedHeight();
			// this.mountColumnChart.setSize(w,h);
			// alert(Ext.get("colorColumnHightsChart").getComputedWidth());
			// alert(Ext.get("colorColumnHightsChart").getComputedHeight());
		}
	},
	initHightCharts : function() {
		var h = Ext.getBody().getHeight();
		var _this = this;
		this.mountColumnChart = new Highcharts.Chart({
			chart : {
				renderTo : this.chartIDPrefix + 'ColumnHightsChart',
				reflow : false,
				//height : Ext.getBody().getHeight() - 50,
				height : hh - 50,
				width : wmount - 50,
				type : 'column'
			},
			title : {
				text : ''
			},
			xAxis : {
				labels : {
					//rotation : -15,
					align : 'center',
					style: {
						fontWeight: 'bold',
						fontSize : '13px'
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
					if (label == '离线') {
						this.color = '#FF0000'
					}
					if (label == '在线') {
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
	        	/*pointFormat: '<b>' + this.x + '</b>: <b>' + this.y + '</b> (' + this.percentage + '%)<br>',
	            shared: true*/

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

Ext.reg('mountColumnChart', Jinpeng.mountChart.MountHColumnChart);