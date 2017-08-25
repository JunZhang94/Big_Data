$(function(){ 
　　setComboxTest();
}); 

function loadComboxData() {
	$.ajax({ 
	    type: 'POST', 
	    url: rootpath + '/systemConfig/loadComboxData.mvc', 
	    success: setComboxTest, 
	    dataType: 'json' 
	});
}

function setComboxTest() {
	$('#language').combobox({   
		    url: rootpath + '/multity/loadComboxData.mvc',   
		    valueField:'id',   
		    textField:'text'  
		}
	);
}
