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
<title>系统首页</title>
<%@ include file="/global/base-lib.jsp" %>
<style type="text/css"> 
.highcharts-axis span, .highcharts-axis-labels span {
 background-color: #ffffff;
}
.x-fieldset LEGEND {
	color:#fff;
}
</style>
<script type="text/javascript"> 
	var ipAdress = "<%= ipAdress %>";
</script>
<!-- 所需js包 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/toolBox.js"></script>
<script type="text/javascript"  src="${pageContext.request.contextPath}/js/twidget-all-debug.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/jquery/jquery-1.7.2.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/jquery/hightCharts/highcharts.src.js"></script>
<!-- 卡口在线状态 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/datacenter/MountHColumnChart.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/search/bayonetColumnChart.js"></script>
<!-- 车流量统计 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/datacenter/dataStatisticsHLine.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/control/TreeComboField.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/datacenter/dataStatisticsChart.js"></script>

<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/datacenter/homeFormsPage.js"></script>
</head>
<body >	
</body>
</html>