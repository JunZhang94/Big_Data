// 生成二维码
function generateQRCode(){
	clearTimeout(intervalID);
	$("#qrcode-succ").hide();
	$("#qrcode-msg").hide();
	$("#qrcode-box").show();
	
	// 图片刷新完成后再查询二维码状态
	$("#QRCode").attr("src","jitGWQrcode?" + new Date().getTime()).load(function(){
		intervalID = setTimeout(function(){getQRCodeState();}, 1000);
	});
}

// 查询二维码头状态
function getQRCodeState(){
    $.post("jitGWQrcode",{Service_Type:"qrcode_poll"},function(data){
    	var xml;
        if (typeof data == "string") {
            xml = new ActiveXObject("Microsoft.XMLDOM");
            xml.async = false;
            xml.loadXML(data);
        } else {  
            xml = data;  
        } 
        
        // 取得错误码
    	var errorcode = $(xml).find("result").attr("errorcode");
    	if(errorcode=="0"){
    		var qrcode_state = $(xml).find("qrcode_state").text();
    		var jit_token = $(xml).find("jit_token").text();
    		// 显示二维码图片
    		if(qrcode_state=="2" && !jit_token){
    			$("#qrcode-box").hide();
    			$("#cert-box").hide();
    			$("#auth-btn").hide();
    			$("#qrcode-succ").show();
    			intervalID = setTimeout(function(){getQRCodeState();}, 1000);
    		// 后台返回token，设置二维码认证，提交后台认证
    		}else if(!!jit_token){
	    		clearTimeout(intervalID);
	    		$("#authMode").val("QRCode");
	    		$("#token").val(jit_token);
	    		$("#QRAuth").submit();
    		}else{
    			intervalID = setTimeout(function(){getQRCodeState();}, 1000);
    		}
    	// 二维码过期
    	}else{
			clearTimeout(intervalID);
			$("#qrcode-box").hide();
			$("#qrcode-succ").hide();
    			$("#qrcode-msg").show();
			//generateQRCode();
    	}
    },"xml");
}
//读取cookies
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)){
		return unescape(arr[2]);
	}else{
		return null;
	}
} 

function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null){
    	document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    }
} 


// 开启二维码认证
if("true" == qrCodeAuth){
	delCookie("jit_qrcode");
	var intervalID;
	$(document).ready(function(){
		intervalID = setTimeout(function(){generateQRCode();}, 0001);
		});
}