Ext.ns("Jinpeng.mountLineChart");
/**
 * HLineChart
 * 
 * @class Jinpeng.mountLineChart.MountHLineChart
 */
Jinpeng.mountLineChart.MountHLineChart = Ext.extend(Ext.Container, {
	chartIDPrefix : "hChart_",
	storeConfig : null,
	/*series : [ {
		name : '统计'
	}],*/
	yText : '数量',
	stateful : false,
	transformData : function(store) {
		var cats = [];
		var values = [];
		var lines = []; //单位名称
		var allValues = [];
		var countSeries = [];
		var result = [];
		var allSeries = [];
		store.each(function(record) {
			var period = record.get("PERIOD");
			var count = record.get("COUNT");
			var lineName = record.get("DWMC");
			var reseteFlag = false;
			for (var m = 0; m < cats.length; m++) {
				if (cats[m] == period) {
					reseteFlag = true;
				}
			}
			if (!reseteFlag) { //避免重复
				cats.push(period);
			}
			var flag = false;
			var position = 0;
			for (var i = 0; i < allValues.length; i++) {
				if (allValues[i][0] == lineName) {
					flag = true;
					position = i;
				}
			}
			if (!flag) { //不存在列表当中，则新加进去
				//allSeries.push( { name : lineName });
				var temps = [];
				temps.push([ period, parseInt(count) ]);
				allValues.push([lineName, temps]);
			} else { //如果存在则更新其数据
				var temporarys = [];
				allValues[position][1].push([ period, parseInt(count) ]);
			}
		});
		//this.series = allSeries;
		//this.mountLineChart.addSeries();
		
		return [ cats, allValues ];
		
		/*for (var j = 0; j < allValues.length; j++) {
			result.push(allValues[j][1]);
		}
		return [ cats, result ];*/
		
		//return [ cats, [ values ] ];
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
			mountChartStore = new Ext.data.JsonStore(this.storeConfig);
			Ext.apply(this, {
				store : mountChartStore
			});
		}
		Jinpeng.mountLineChart.MountHLineChart.superclass.initComponent.apply(this);
	},
	afterRender : function() {
		this.el.dom.innerHTML = "<div id='" + this.chartIDPrefix + "LineHightsChart' >&nbsp;</div>";
		Jinpeng.mountLineChart.MountHLineChart.superclass.afterRender.apply(this);
		this.initHightCharts();
		this.firstResized = true;
	},
	onResize : function(adjWidth, adjHeight, rawWidth, rawHeight) {
		if (this.firstResized) {
			this.firstResized = false;
		} else {
			this.mountLineChart.setSize(adjWidth, !adjHeight ? Ext.getBody().getHeight() - 110 : adjHeight);
		}
	},
	refreshHChartData : function(store) {
		var r = this.transformData(store);
		this.doRefresh(r);
	},
	doRefresh : function(r) {
		if (this.mountLineChart) {
			/*var arr1 = ['2014-10-13','2014-10-14','2014-10-15','2014-10-23'];
			var arr2 = [[['2014-10-13',67],['2014-10-14',66],['2014-10-15',75],['2014-10-23',334]],[['2014-10-13',50],['2014-10-14',42],['2014-10-15',55],['2014-10-23',250]]];
			var data = [arr1,arr2];*/
			this.mountLineChart.xAxis[0].setCategories(r[0], false);
			//this.mountLineChart.addSeries({ name : '金鹏'});
			var data = r[1];
			var sereisLength = this.mountLineChart.series.length;
			if (sereisLength > 0) {
				for (var m = sereisLength - 1; m >= 0; m--) {
					this.mountLineChart.series[m].remove(false);
				}
			}
			for (var i = 0; i < data.length; i++) {
				var lineName = data[i][0];
				var values = data[i][1];
				if (this.mountLineChart.series.length < data.length) {
					this.mountLineChart.addSeries({ name : lineName});
				}
				this.mountLineChart.series[i].setData(values, false);
				/*switch (i){
					case 0 : 
						this.mountLineChart.series[i].color = '#8bbc21';
						this.mountLineChart.legend.allItems[i].color = '#8bbc21';
						break;
					case 1 : 
						this.mountLineChart.series[i].color = '#910000';
						this.mountLineChart.legend.allItems[i].color = '#910000';
						break;
					case 2 : 
						this.mountLineChart.series[i].color = '#1aadce';
						this.mountLineChart.legend.allItems[i].color = '#1aadce';
						break;
					case 3 : 
						this.mountLineChart.series[i].color = '#492970';
						this.mountLineChart.legend.allItems[i].color = '#492970';
						break;
					case 4 : 
						this.mountLineChart.series[i].color = '#f28f43';
						this.mountLineChart.legend.allItems[i].color = '#f28f43';
						break;
					case 5 : 
						this.mountLineChart.series[i].color = '#77a1e5';
						this.mountLineChart.legend.allItems[i].color = '#77a1e5';
						break;
					case 6 : 
						this.mountLineChart.series[i].color = '#c42525';
						this.mountLineChart.legend.allItems[i].color = '#c42525';
						break;
					case 7 : 
						this.mountLineChart.series[i].color = '#a6c96a';
						this.mountLineChart.legend.allItems[i].color = '#a6c96a';
						break;
					case 8 : 
						this.mountLineChart.series[i].color = '#FF0000';
						this.mountLineChart.legend.allItems[i].color = '#FF0000';
						break;
					case 9 : 
						this.mountLineChart.series[i].color = '#8B008B';
						this.mountLineChart.legend.allItems[i].color = '#8B008B';
						break;
				}*/
			}
			/*for ( var i = 0; i < r[1].length; i++) {
				this.mountLineChart.series[i].setData(r[1][i], false);
			}*/
			this.mountLineChart.redraw();
			
			/*this.HLineChart.series[0].name='测试1';
			this.HLineChart.series[1].name='测试2';*/
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
		var h = Ext.getBody().getHeight();
		this.mountLineChart = new Highcharts.Chart({
			chart : {
				renderTo : this.chartIDPrefix + 'LineHightsChart',
				reflow : false,
				height : Ext.getBody().getHeight() - 80,
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
					this.color = '#2BD56F'
					return label;
				}
			},
			tooltip : {
				formatter : function() {
					return '<b>' + this.x + '</b><br/><b>在线: </b>' + this.y;
				}
			},
			exporting : {
				enabled : false
			},
			series : this.series
		});

	}
});

Ext.reg('mountLineChart', Jinpeng.mountLineChart.MountHLineChart);