<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">

		<title>乌鲁木齐卡口整合平台</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta content="IE=EmulateIE7" http-equiv="X-UA-Compatible" />
		<meta content="IE=7" http-equiv="X-UA-Compatible" />
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />

		<object classid="clsid:707C7D52-85A8-4584-8954-573EFCE77488" id="JITDSignOcx" width="0" codebase="./JITDSign.cab#version=2,0,24,19"></object>
		<script type="text/javascript">
			
			//根据原文和证书产生认证数据包
			function doDataProcess(){
				var Auth_Content = '${original}';
				var DSign_Subject = document.getElementById("RootCADN").value;
				if (Auth_Content == ""){
					alert("认证原文不能为空!");
				} else {
					//控制证书为一个时，不弹出证书选择框
					JITDSignOcx.SetCertChooseType(1);
					JITDSignOcx.SetCert("SC", "", "", "", DSign_Subject, "");
					if (JITDSignOcx.GetErrorCode() != 0){
						alert("错误码："+JITDSignOcx.GetErrorCode() + "　错误信息：" + JITDSignOcx.GetErrorMessage(JITDSignOcx.GetErrorCode()));
						return false;
					} else {
						 var temp_DSign_Result = JITDSignOcx.DetachSignStr("", Auth_Content);
						 if(JITDSignOcx.GetErrorCode()!=0){
								alert("错误码："+JITDSignOcx.GetErrorCode()+"　错误信息：" + JITDSignOcx.GetErrorMessage(JITDSignOcx.GetErrorCode()));
								return false;
						 }
						//如果Get请求，需要放开下面注释部分
						//while(temp_DSign_Result.indexOf('+')!=-1) {
						//	 temp_DSign_Result=temp_DSign_Result.replace("+","%2B");
						//}
						document.getElementById("signed_data").value = temp_DSign_Result;
					}
				}
				document.getElementById("original_jsp").value = Auth_Content;
				document.forms[0].submit();
			}
			
		</script>
	</head>

	<body onload="doDataProcess()">
		<center>
			<form method="post" action="${pageContext.request.contextPath }/auth">
				颁发者DN：
				<input type="text" id="RootCADN" value="" width="30" />
				<font color="red">(过滤证书选择框中的证书)</font>
				<input type="hidden" id="signed_data" name="signed_data" />
				<input type="hidden" id="original_jsp" name="original_jsp" />
				<!-- <input type="button" name="b_refer1" onclick="doDataProcess();" value="认证" /> -->
			</form>
			<div><a href = '${pageContext.request.contextPath }/JIT/JITDsignSetup.exe'>控件下载</a></div>
		</center>
	</body>
</html>
