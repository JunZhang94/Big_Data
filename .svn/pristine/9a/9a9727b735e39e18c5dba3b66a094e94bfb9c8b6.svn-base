var chart; 
$(function () { 
	initControlPieData();
	initAlarmPieData();
	});
 function loadControlPies(dataAray){
	$('#controlContainer').highcharts({
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false
	        },
	        title: {
	            text: '系统各区布控量分布情况',
	            style: {//设置标题颜色
                  //  color: 'red',
                    font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
                 }
	        },
	        tooltip: {
	    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	        		size:'50%',
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    color: '#000000',
	                    connectorColor: '#000000',
	                    format: '<b>{point.name}</b>: {point.percentage:.1f}%'
	                }
	            }
	        },
	        series: [{
	            type: 'pie',
	            name: '布控数量',
	            data:dataAray
	        }]
	    });
 }
 
 function loadAlarmPies(dataAray){
		var chart= $('#alarmContainer').highcharts({
		        chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false
		        },
		        title: {
		            text: '系统各区告警量分布情况',
		            style: {//设置标题颜色
		                  //  color: 'red',
		                    font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
		                 }
		        },
		        tooltip: {
		    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
		            pie: {
		        		size:'50%',
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    color: '#000000',
		                    connectorColor: '#000000',
		                    format: '<b>{point.name}</b>: {point.percentage:.1f}%'
		                }
		            }
		        },
		        series: [{
		            type: 'pie',
		            name: '告警数量',
		            data:dataAray
		        }]
		    });
		 return chart;
	 }
 
 function initAlarmPieData(){
	 var pieData=[];
	 var pageParams=window.parent.getPageParams();
	 $.ajax({
	      type: "post",
	      url: rootpath + "/controlAlarm/statisticsAlarmByReport.mvc", 
	      dataType: "json",
	      data:	pageParams,
	      success : function(resultData){
	     var result = resultData.data;
	     for(var i=0;i<result.length;i++){
	    	  var tmp=result[i];
	    	  var item=[tmp.name,tmp.value];
	    	  pieData.push(item);
	      }
	     loadAlarmPies(pieData);
	      }
	    });
 }
 function initControlPieData(){
	 var pieData=[];
	 $.ajax({
	      type: "post",
	    //  url: rootpath + "/mountOnline/getAlarmData.mvc", 
	      url: rootpath + "/controlAlarm/countControl.mvc", 
	      dataType: "json",
	     // data:	window.parent.pageParams,//{"reportType":"tt","startDate":"erer"},
	      success : function(resultData){//alert("into=="+resultData.data.length);
	     var result = resultData.data;
	     for(var i=0;i<result.length;i++){
	    	  var tmp=result[i];
	    	  var item=[tmp.name,tmp.value];
	    	  pieData.push(item);
	      }
	     loadControlPies(pieData);
	      }
	    });
 }
 