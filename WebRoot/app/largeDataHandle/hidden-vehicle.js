$(function(){
	$('#select_brand').combo({
		editable:false
	});
	$('#sp').appendTo($('#select_brand').combo('panel'));
	$('#sp input').click(function(){
		var v = $(this).val();
		for(var i=0;i<11;i++){
			if(i == v)
				$("#"+i).css("display","block");
			else
				$("#"+i).css("display","none");
		}
		var s = $(this).next('span').text();
		$('#select_brand').combo('setValue', v).combo('setText', s).combo('hidePanel');
	});
});