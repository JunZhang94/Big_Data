<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="ui" uri="/WEB-INF/tlds/ui.tld"%>
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
<title>落脚点分析</title>
<%@ include file="/global/base-lib.jsp" %>
<script type="text/javascript"> 
	var ipAdress = "<%= ipAdress %>";
</script>
<!-- 所需js包 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/toolBox.js"></script>
<!-- 日期js组件 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/analyze/stopAnalysis.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/analyze/stopAnalyList.js"></script>
<style type="text/css"> 
.x-grid3-row {
  height: auto; !important;
}
.x-grid3-cell-inner, .x-grid3-hd-inner { white-space:normal !important; } 
</style>
</head>
<body >	
</body>
</html>