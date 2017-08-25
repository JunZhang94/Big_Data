<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="ui" uri="/WEB-INF/tlds/ui.tld"%>
<%
	String path = request.getContextPath();
	String maxFlag = request.getAttribute("maxFlag").toString();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "
http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>卡口在线状态柱状图</title>
<%@ include file="/global/base-lib.jsp" %>
<script>
	var clickFlag = '<%=maxFlag%>';
</script>
<!-- 所需js包 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/toolBox.js"></script>
<!-- 日期js组件 -->
<script type="text/javascript" src="${pageContext.request.contextPath}/jquery/jquery-1.7.2.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/jquery/hightCharts/highcharts.src.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/script/main/MainHColumnChart.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/script/main/DataHColumnChart.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/datacenter/mountStatusColumn.js"></script>

</head>
<body >	
</body>
</html>