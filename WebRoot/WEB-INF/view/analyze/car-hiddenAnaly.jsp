<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String ipStr = request.getLocalAddr();
	int ipPort = request.getLocalPort();
	String ipAdress = ipStr + ":" + ipPort;
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "
http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>隐匿车辆</title>
<%@ include file="/global/base-lib.jsp" %>
<script type="text/javascript"> 
	var ipAdress = "<%= ipAdress %>";
</script>
<style type="text/css"> 
.x-box-inner {
  	overflow: hidden;
	zoom: 1;
	position: left !important;
	left: 0;
	top: 0;
}
.form-lable {
 color: red;
}
.labelalign2 {
	left: 290px !important;
}
.labelalign3 {
	left: 330px !important;
}
.labelalign4 {
	left: 370px !important;
}
.labelalign5 {
	left: 410px !important;
}
.labelalign6 {
	left: 450px !important;
}
.buttunsearch {
	left: 150px !important;
}
.buttunreset {
	left: 250px !important;
}
</style>
<!-- 所需js包 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/toolBox.js"></script>
<!-- 日期js组件 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/search/carTrackSearch.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/analyze/carHiddenAnalyQuery.js"></script>
</head>
<body >	
</body>
</html>
