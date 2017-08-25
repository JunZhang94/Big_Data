<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
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
<title>初次入城分析结果</title>
<%@ include file="/global/base-lib.jsp" %>
<script type="text/javascript"> 
	var ipAdress = "<%= ipAdress %>";
</script>
<!-- 所需js包 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/toolBox.js"></script>
<!-- 日期js组件 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/My97DatePicker/WdatePicker.js"></script>
<!-- 车辆轨迹 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/search/carTrackSearch.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/analyze/carFirsttimeIncityResult.js"></script> 
<!-- 字典js包 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/Dictionary.js"></script>
<script type="text/javascript"> 
    window.dictionary  = new Dictionary();
</script>
</head>
<body >	
</body>
</html>
