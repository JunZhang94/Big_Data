 $(function(){
	 initForm();
 });
 
 function initForm(){alert('intow54'+ctx);
	 $("#pinpai").combogrid({
		 panelWidth: 330,
		 panelHeight: 200,
		 idField:'id', ,
		 multiple:true,
			url:ctx+"/datas/pinpaiData.txt"
		});
 }