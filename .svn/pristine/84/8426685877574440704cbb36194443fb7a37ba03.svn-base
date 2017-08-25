var hphmData;
$(function(){
	//alert('unto');
	initSearch();
});

function initSearch(){
	var columns = [[{
		field: 'TX1',
     //   title: '<div><tr><td ><font size="15" color="red">按车牌号码分组：</font></td></tr></div>',
     //   width: 80,
        align: 'left',
        formatter:function(val,rec){
		if(val==undefined || val==""){
			return val;
		}
		var cx="奥迪-Q3-2015进口越野型";
    	var tt='<a href="#" onclick=openImage("'+val+'")><img src="'+val+'" width="250px" height="150px"/></a><br>';
    	tt+='位置：神州路9号<br>';
    	tt+='抓拍时间:2015-08-31 10:00:12<br>';
    	tt+='号牌号码:<a href="#" onclick=openImage("'+val+'")>粤A12345</a><br>';
    	tt+='识别车型:'+cx+'<br>'
    	tt+='<a href="#" onclick=openImage("'+val+'")>查看关联信息</a>'+'   <a href="#" onclick=openImage("'+val+'")>加入布控</a>';
    	return tt;
    }
    },{
    	field: 'TX2',
      //  title: '过车图片',
    //    width: 80,
        align: 'left',
        formatter:function(val,rec){
    	if(val==undefined || val==""){
    		return val;
    	}
    	var cx="奥迪-Q3-2015进口越野型";
    	var tt='<a href="#" onclick=openImage("'+val+'")><img src="'+val+'" width="250px" height="150px"/></a><br>';
    	tt+='位置：神州路9号<br>';
    	tt+='抓拍时间:2015-08-31 10:00:12<br>';
    	tt+='号牌号码:<a href="#" onclick=openImage("'+val+'")>粤A12345</a><br>';
    	tt+='识别车型:'+cx+'<br>'
    	tt+='<a href="#" onclick=openImage("'+val+'")>查看关联信息</a>'+'   <a href="#" onclick=openImage("'+val+'")>加入布控</a>';
    	return tt;
    }
    }, {
    	field: 'TX3',
     //   title: '过车图片',
     //   width: 80,
        align: 'left',
        formatter:function(val,rec){
    	if(val==undefined || val==""){
    		return val;
    	}
    	var cx="奥迪-Q3-2015进口越野型";
    	var tt='<a href="#" onclick=openImage("'+val+'")><img src="'+val+'" width="250px" height="150px"/></a><br>';
    	tt+='位置：神州路9号<br>';
    	tt+='抓拍时间:2015-08-31 10:00:12<br>';
    	tt+='号牌号码:<a href="#" onclick=openImage("'+val+'")>粤A12345</a><br>';
    	tt+='识别车型:'+cx+'<br>'
    	tt+='<a href="#" onclick=openImage("'+val+'")>查看关联信息</a>'+'   <a href="#" onclick=openImage("'+val+'")>加入布控</a>';
    	return tt;
    }
    }, {
        field: 'TX4',
       // title: '过车图片',
     //   width: 80,
        align: 'left',
        formatter:function(val,rec){
    	if(val==undefined || val==""){
    		return val;
    	}
    	var cx="奥迪-Q3-2015进口越野型";
    	var tt='<a href="#" onclick=openImage("'+val+'")><img src="'+val+'" width="250px" height="150px"/></a><br>';
    	tt+='位置：神州路9号<br>';
    	tt+='抓拍时间:2015-08-31 10:00:12<br>';
    	tt+='号牌号码:<a href="#" onclick=openImage("'+val+'")>粤A12345</a><br>';
    	tt+='识别车型:'+cx+'<br>'
    	tt+='<a href="#" onclick=openImage("'+val+'")>查看关联信息</a>'+'   <a href="#" onclick=openImage("'+val+'")>加入布控</a>';
    	return tt;
    }
    }]];
 var frozenColumns= 
		 [[{
		        field: 'ck',
		        checkbox:true,
		        width: 8
		    }]];
 var options = {
	      	url:ctx+"/datas/carPics.txt",
		 	fitColumns: true,
	        singleSelect : false,
	        loadMsg:'数据加载中..',
	        rownumbers: true,
	        nowrap:false,
	        pagination: true,
	        columns: columns,
	        remoteSort:false,
	        toolbar: [{
	        	text:'分组'//,
	    		//iconCls: 'icon-search',
	    		//handler: function(){alert('group by')}
	    	},'-',{
	    		text:'按车牌分组',
	    		iconCls: 'icon-edit',
	    		handler: function(){
//	    			$.getJSON(ctx+"/datas/carByhphm.txt",function(data){
//	    			searchByhphm(data);;
//	    		});
	    		searchByType("按车牌分组",ctx+"/datas/carByhphm.txt");
	    		
	    		}
	    	},'-',{
	    		text:'按车型分组',
	    		iconCls: 'icon-edit',
	    		handler: function(){
	    		searchByType("按车型分组",ctx+"/datas/carByhphm.txt");
	    		}
	    	},'-',{
	    		text:'按卡口分组',
	    		iconCls: 'icon-edit',
	    		handler: function(){
	    		searchByType("按卡口分组",ctx+"/datas/carByhphm.txt");
	    		}
	    	},'-',{
	    		text:'<a href="#">数据导出</a>',
	    		iconCls: 'icon-edit',
	    		handler: function(){alert('export')}
	    	}],
	        onDblClickRow:showDetail
	    };
 	$('#datagrid').datagrid(options);
}

function doSearch(){
	$('#datagrid').datagrid('reload'); 
}
function searchByhphm(data){
	var len=data.length;
	 var columns = "[[";
    for(var i = 0; i < 4; i++){
    	if(i==0){
    		 columns += "{field:'TX"+(i+1)+"',title:'<b>按车牌分组</b>',align:'left',formatter:hphmFormat}";
    	}else{
    		columns += ",{field:'TX"+(i+1)+"',align:'left',formatter:hphmFormat}";
    	}
    	
    }
    columns +="]]";
   // alert("error=="+columns);
    columns = eval('(' + columns + ')');
    var frozenColumns= 
		 [[{
		        field: 'ck',
		        checkbox:true,
		        width: 8
		    }]];
var options = {
	      	url:ctx+"/datas/carByhphm.txt",
			//data:data,
		 	fitColumns: true,
	        singleSelect : true,
	        loadMsg:'数据加载中..',
	        rownumbers: true,
	        nowrap:false,
	        pagination: true,
	        columns: columns,
	        remoteSort:false,
	        onDblClickRow:showDetail
		};
$('#datagrid').datagrid(options);
}
function searchByType(label,url){
	 var columns = "[[";
	    for(var i = 0; i < 4; i++){
	    	if(i==0){
	    		 columns += "{field:'TX"+(i+1)+"',title:'<b>"+label+"</b>',align:'left',formatter:hphmFormat}";
	    	}else{
	    		columns += ",{field:'TX"+(i+1)+"',align:'left',formatter:hphmFormat}";
	    	}
	    	
	    }
	    columns +="]]";
	   // alert("error=="+columns);
	    columns = eval('(' + columns + ')');
	    var frozenColumns= 
			 [[{
			        field: 'ck',
			        checkbox:true,
			        width: 8
			    }]];
	var options = {
		      	url:url,
				//data:data,
			 	fitColumns: true,
		        singleSelect : true,
		        loadMsg:'数据加载中..',
		        rownumbers: true,
		        nowrap:false,
		        pagination: true,
		        columns: columns,
		        remoteSort:false,
		        onDblClickRow:showDetail
			};
	$('#datagrid').datagrid(options);
}

function openImage(url){
	window.open(url);
}
function showDetail(rowIndex, rowData){
	alert("ddd"+rowData.HPHM);
}
function hphmFormat(val,rec){
	if(val==undefined || val==""){
		return val;
	}
	var cx="奥迪-Q3-2015进口越野型";
	var tt='<a href="#" onclick=openImage("'+val+'")><img src="'+val+'" width="250px" height="150px"/></a><br>';
	tt+='位置：神州路9号<br>';
	tt+='抓拍时间:2015-08-31 10:00:12<br>';
	tt+='号牌号码:<a href="#" onclick=openImage("'+val+'")>粤A12345</a><br>';
	tt+='识别车型:'+cx+'<br>'
	tt+='<a href="#" onclick=openImage("'+val+'")>查看关联信息</a>'+'   <a href="#" onclick=openImage("'+val+'")>加入布控</a>';
	return tt;
}