var hphmData;
$(function(){
	initSearchLable();
	initDatagrid();
});

//初始化查询条件
function initSearchLable() {
	var data = {};
	data.carType = '别克';
	data.searchTime = '2015-02-10 00:00:00 至 2015-02-10 23:59:59';
	$('#carType').html(data.carType);
	$('#searchTime').html(data.searchTime);
}

//初始化datagrid数据
function initDatagrid(){
	var columns = [[
	    {
			field: 'hphm',
			title:'车牌号码',
	        align: 'left',
	        width: 100
	    },{
	    	field: 'kkmc',
	    	title:'卡口名称',
	        align: 'left',
	        width: 200
	    }, {
	    	field: 'cllx',
	    	title:'车辆类型',
	        align: 'left',
	        width: 100
	    }, {
	        field: 'clsd',
	        title:'车辆速度',
	        align: 'left',
	        width: 100
		}, {
	        field: 'jgsj',
	        title:'经过时间',
	        align: 'left',
	        width: 150
		}
    ]];
	var options = {
      	url:rootpath + "/carType/testCarSearch.mvc",
	 	fitColumns: true,
        singleSelect : false,
        loadMsg:'数据加载中..',
        nowrap:false,
        pagination: true,
        columns: columns,
        remoteSort:false,
        pageSize : 15,
        pageList: [10,15, 20, 25, 30],
        //loadFilter:pagerFilter,
        queryParams : {
			startTime : '2015-09-30 00:00:00',
			endTime : '2015-11-05 23:59:59',
			flag : "query"
		},
        toolbar: [{
        	text:'默认',
        	handler: function(){
				searchByDefault("");
			}
    	},'-',{
    		text:'按车牌分组',
    		handler: function(){
    			searchByType("按车牌分组");
    		
    		}
    	},'-',{
    		text:'按车型分组',
    		handler: function(){
    			searchByType("按车型分组");
    		}
    	},'-',{
    		text:'按卡口分组',
    		handler: function(){
    			searchByType("按卡口分组");
    		}
    	},'-',{
    		text:'数据导出',
    		handler: function(){
    			alert('export')
    		}
    	}],
        onDblClickRow:showDetail
    };
 	var opts = $('#datagrid').datagrid(options);
 	var page = $('#datagrid').datagrid('getPager');  
 	$(page).pagination({  
        beforePageText: '第',//页数文本框前显示的汉字  
        afterPageText: '页    共 {pages} 页'
 		//layout:['first','prev','next','last'],
        //displayMsg: ''
    });
}

function pagerFilter(data){
	//var data = pageDatas.beans;
	//var amouns = pageDatas.amounts;
	var flag = (data[0] == undefined);
	var amount = flag ? data.total : data[0].amount;
	data = {
		total: amount,
		rows: data
	}
	var dg = $(this);
	var opts = dg.datagrid('options');
	opts.pageSize = 15;
	var pager = dg.datagrid('getPager');
	pager.pagination({
		onSelectPage:function(pageNum, pageSize){
			opts.pageNumber = pageNum;
			opts.pageSize = pageSize;
			pager.pagination('refresh',{
				pageNumber:pageNum,
				pageSize:pageSize
			});
			dg.datagrid('loadData',data);
		}
	});
	/*if (!data.originalRows){
		data.originalRows = (data.rows);
	}*/
	var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
	var end = start + parseInt(opts.pageSize);
	//data.rows = (data.originalRows.slice(start, end));
	return data;
}

function doSearch(){
	$('#datagrid').datagrid('reload'); 
}

//默认查询
function searchByDefault() {
	$('#datagrid').datagrid('load',{
		startTime : '2015-10-01 00:00:00',
		endTime : '2015-10-29 23:59:59',
		flag : "query"
	});
}

//分组查询
function searchByType(label){
	$('#datagrid').datagrid('load',{
		carType : '01',
		startTime : '2015-10-22 00:00:00',
		endTime : '2015-10-29 23:59:59',
		flag : "query"
	});

	/*var options = {
		url:rootpath + "/carType/carTypeSearch.mvc",
		fitColumns: true,
        singleSelect : false,
        loadMsg:'数据加载中..',
        nowrap:false,
        pagination: true,
        columns: columns,
        remoteSort:false
	};
	$('#datagrid').datagrid(options);*/
}

function openImage(url){
	window.open(url);
}

function showDetail(rowIndex, rowData){
	alert("ddd"+rowData.HPHM);
}

function dataFormat(val, row){
	if(val==undefined || val==""){
		return val;
	}
	var cx="奥迪-Q3-2015进口越野型";
	var tt='<a href="#" onclick=openImage("'+val+'")><img src="'+val+'" width="250px" height="150px"/></a><br>';
	tt+='位置：神州路9号<br>';
	tt+='抓拍时间:2015-08-31 10:00:12<br>';
	tt+='号牌号码:粤A12345<br>';
	tt+='识别车型:'+cx+'<br>'
	tt+='<a href="#" onclick=openImage("'+val+'")>查看关联信息</a>'+'   <a href="#" onclick=openImage("'+val+'")>加入布控</a>';
	return tt;
}