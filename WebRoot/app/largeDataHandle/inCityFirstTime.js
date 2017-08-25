var searchCount=0;

$(function(){
	initForm();
});


function doSearch(){
	var queryParams=serializeForm("#searchForm");
	alert(queryParams.type+'/'+queryParams.pinpai);
}

function initForm(){
	$("#pinpai").yhDropDown({
		url:ctx+"/datas/pinpaiData.txt",
		post:"id",
		noChild: true,
		selectAll:true
	});
	$("#type").yhDropDown({
		url:ctx+"/datas/type.txt",
		post:"id",
		checkbox:true,
		noChild: true,
		selectAll:true
	});
	$("#year").yhDropDown({
		url:ctx+"/datas/year.txt",
		post:"id",
		checkbox:true,
		noChild: true,
		selectAll:true
	});
	$("#hpys").yhDropDown({
		url:ctx+"/datas/ys.txt",
		post:"id",
		noChild: true,
		selectAll:false
	});
	//$("#startTime").datepicker();
//	$("#startTime").WdatePicker({dateFmt:' yyyy-MM-dd HH:mm:ss'});
//	$("#endTime").WdatePicker({dateFmt:' yyyy-MM-dd HH:mm:ss'});
}