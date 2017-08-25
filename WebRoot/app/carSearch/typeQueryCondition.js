$(function(){
	loadCheckBox();
	initTimeInfo();
	loadPigInfo();
});

//加载地图
function loadPigInfo() {
	var iframeStr = '<iframe src="http://map.baidu.com/" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>';
	$('#mountGis').html(iframeStr);
}

//初始化时间设置
function initTimeInfo() {
	var startTime = initDateTime('00:00:00');
	var endTime = initDateTime('23:59:59');
	$('#startTime').datetimebox('setValue', startTime);
	$('#endTime').datetimebox('setValue', endTime);
}

//车牌颜色
function loadCheckBox() {
    $('#carNumColor').combobox({
        url:rootpath + "/systemApp/findDicData.mvc?code=LicPlateColor",
        valueField:'id',
        textField:'text'
    });
    
    $('#carBrand').combobox({
        url:rootpath + "/systemApp/jsonCarBrandInCombo.mvc",
        valueField:'id',
        textField:'text',
        onSelect : function(record) {
	    	$('#carType').combobox({
	            url:rootpath + "/systemApp/jsonCarTypeInCombo.mvc?carBrand=" + record.text,
	            valueField:'id',
	            textField:'text',
	            onSelect : function(options) {
		    		$('#carOfYear').combobox({
			            url:rootpath + "/systemApp/jsonCarYearInCombo.mvc?carType=" + options.text + "&carBrand=" + record.text,
			            valueField:'id',
			            textField:'text'
			        });
	    		}
	        });
    	}
    });
    
}

//初始化时间
function initDateTime(times) {
    var mydate = new Date();
    var str = "" + mydate.getFullYear() + "-";
    str += (mydate.getMonth()+1) + "-";
    str += mydate.getDate();
    return str + " " + times;
}

function submitForm() {
	//异步请求
	$('#carTypeForm').form({
		url:rootpath + "/carType/carImgTypePage.mvc",
	    onSubmit: function(param){
			var isValid = $(this).form('validate');
			param.startTime = $('#carNum').val();
			param.startTime = $('#carNumColor').val();
			param.startTime = $('#startTime').val();
			param.startTime = $('#startTime').val();
			return isValid;	
	    },
	    success:function(data){
	    	window.open(rootpath + "/carType/carImgTypePage.mvc");
	    }
	});

	//提交查询
	$('#carTypeForm').submit();
}

function clearForm() {
	$('#carTypeForm').form('reset');
	initTimeInfo();
}
