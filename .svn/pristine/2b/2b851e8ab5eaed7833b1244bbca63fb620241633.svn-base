var searchCount=0;
var url=ctx + "/eysSearch/searchByType/"
$(function(){
	initForm();
	initSearch();
});

function clickEvent(object){
$(object).datepicker();
}

function doSearch(){
	var queryParams=serializeForm("#searchForm");
	alert(queryParams.pinpai+'/'+queryParams.type);
}
function initSearch(){
	var columns = [[{
        field: 'ID',
        title: 'ID',
        width: 50,
        align: 'left',
       hidden:true
    },{
        field: 'HPHM',
        title: '车牌号码',
        width: 50,
        align: 'left',
        sortable:true
    }, {
    	field: 'TYPE',
        title: '车辆型号',
        width: 50,
        align: 'left',
        sortable:true
    }, {
        field: 'YS',
        title: '颜色',
        width: 50,
        align: 'right',
        sortable:true
    }]];
 var frozenColumns= 
		 [[{
		        field: 'ck',
		        checkbox:true,
		        width: 8
		    }]];
 var options = {
		 	data:[{"ID":"1","HPHM":"粤A12341","TYPE":"别克","YS":"黑色"},
	          	{"ID":"2","HPHM":"粤A12342","TYPE":"别克","YS":"红色"},
	        	{"ID":"3","HPHM":"粤A12343","TYPE":"别克","YS":"黄色"},
	        	{"ID":"4","HPHM":"粤A12344","TYPE":"别克","YS":"银色"}] ,
	    //   	url:ctx + '/eysSearch/searchByType/doSearch.mvc',
		 	fitColumns: true,
	        singleSelect : true,
	        loadMsg:'数据加载中..',
	        rownumbers: true,
	        nowrap:false,
	        pagination: false,
	        columns: columns,
	        remoteSort:false
	    };
 	$('#datagrid').datagrid(options);
}

function initForm(){
	$("#pinpai").yhDropDown({
		url:ctx+"/datas/pinpaiData.txt",
		post:"id",
		checkbox:false,
		noChild: true,
		selectAll:true
	});
	$("#type").yhDropDown({
		url:ctx+"/datas/type.txt",
		post:"id",
		checkbox:false,
		noChild: true,
		selectAll:true
	});
	$("#year").yhDropDown({
		url:ctx+"/datas/year.txt",
		post:"id",
		checkbox:false,
		noChild: true,
		selectAll:true
	});
	$("#hpys").yhDropDown({
		url:ctx+"/datas/ys.txt",
		post:"id",
		checkbox:false,
		noChild: true,
		selectAll:false
	});
//	$("#startTime").datepicker();
//	$("#endTime").datepicker();
}