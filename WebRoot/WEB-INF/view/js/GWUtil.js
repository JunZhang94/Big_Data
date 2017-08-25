// 根据原文和证书产生认证数据包
// 参数说明：initParam：vctk控件初始化参数
// 参数说明：authContent：认证原文
// 参数说明：signSubject：证书版发者主题
function detachSignStr(initParam,authContent,signSubject){
	// 验证认证原文不能为空
	if(authContent == ""){
		alert("认证原文不能为空!");
		return false;
	}else{
		// 初始化vctk控件
	    JITDSignOcx.Initialize(initParam);
	    if (JITDSignOcx.GetErrorCode() != 0) {
	    	alert("初始化失败，错误码："+JITDSignOcx.GetErrorCode()+" 错误信息："+JITDSignOcx.GetErrorMessage(JITDSignOcx.GetErrorCode()));
	        JITDSignOcx.Finalize();
	        return false;
	    }
	    
		// 控制证书为一个时，不弹出证书选择框
		JITDSignOcx.SetCertChooseType(1);	
		
		// 调用SetCert方法,设置签名、加密、解密或验签名证书
		// SetCert参数说明(证书的类型,证书主题,证书序列号,证书主题中的Email项,证书颁发者主题,证书的BASE64编码)
		JITDSignOcx.SetCert("SC","","","",signSubject,"");
		if(JITDSignOcx.GetErrorCode()!=0){
			alert("错误码："+JITDSignOcx.GetErrorCode()+"　错误信息："+JITDSignOcx.GetErrorMessage(JITDSignOcx.GetErrorCode()));
			JITDSignOcx.Finalize();
			return false;
		}else {
			 // 生成签名信息 
			 var sign_Result = JITDSignOcx.DetachSignStr("",authContent);
			 if(JITDSignOcx.GetErrorCode()!=0){
					alert("错误码："+JITDSignOcx.GetErrorCode()+"　错误信息："+JITDSignOcx.GetErrorMessage(JITDSignOcx.GetErrorCode()));
					JITDSignOcx.Finalize();
					return false;
			 }
 
			 // 释放资源
			 JITDSignOcx.Finalize();
			 
			 // 返回签名结果
			 return sign_Result;
		// 如果Get请求，需要放开下面注释部分
		//	 while(temp_DSign_Result.indexOf('+')!=-1) {
		//		 temp_DSign_Result=temp_DSign_Result.replace("+","%2B");
		//	 }
		}
	}
}