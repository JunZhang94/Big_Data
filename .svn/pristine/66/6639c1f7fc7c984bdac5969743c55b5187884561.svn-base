var hphmData;
$(function(){
	initSearchLable();
	initDatagrid();
	loadPigInfo();
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
			field: 'TX1',
	        align: 'left',
	        formatter:dataFormat
	    },{
	    	field: 'TX2',
	        align: 'left',
	        formatter:dataFormat
	    }, {
	    	field: 'TX3',
	        align: 'left',
	        formatter:dataFormat
	    }, {
	        field: 'TX4',
	        align: 'left',
	        formatter:dataFormat
		}
    ]];
	var options = {
      	url:rootpath + "/carType/carImgTypeSearch.mvc",
	 	fitColumns: true,
        singleSelect : false,
        loadMsg:'数据加载中..',
        nowrap:false,
        pagination: true,
        columns: columns,
        remoteSort:false,
        queryParams : {
			carType : '别克',
			startTime : '2015-10-29 00:00:00',
			endTime : '2015-10-29 23:59:59',
			flag : "query"
		},
        toolbar: [{
    		text:'数据导出',
    		iconCls: 'icon-edit',
    		handler: function(){
    			alert('export')
    		}
    	}],
        onDblClickRow:showDetail
    };
 	$('#datagrid').datagrid(options);
 	var page = $('#datagrid').datagrid('getPager');  
 	$(page).pagination({  
        //pageList: [10,15, 20],//可以设置每页记录条数的列表  
        //beforePageText: '第',//页数文本框前显示的汉字  
        //afterPageText: '页    共 {pages} 页',  
 		layout:['first','prev','next'],
        displayMsg: ''
    });
}

function doSearch(){
	$('#datagrid').datagrid('reload'); 
}

function openImage(url){
	window.open(url);
}

function showDetail(rowIndex, rowData){
	alert("ddd"+rowData.HPHM);
}

//处理返回的数据
function dataFormat(val, row){
	if(val==undefined || val==""){
		return val;
	}
	var dataImg = val.split(',');
	var cx = dataImg[3];
	var tt='<a href="#" onclick=openImage("'+dataImg[0]+'")><img src="'+dataImg[0]+'" width="250px" height="150px"/></a><br>';
	tt+= '位置：' + dataImg[4] + '<br>';
	tt+='抓拍时间:' + dataImg[2] + '<br>';
	tt+='号牌号码:' + dataImg[1] + '<br>';
	tt+='识别车型:'+cx+'<br>'
	tt+='<a href="#" onclick=openImage("'+dataImg[0]+'")>查看关联信息</a>'+'   <a href="#" onclick=openImage("'+dataImg[0]+'")>加入布控</a>';
	return tt;
}

//加载地图
function loadPigInfo() {
	var iframeStr = '<iframe src="http://map.baidu.com/" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>';
	$('#globleGis').html(iframeStr);
}