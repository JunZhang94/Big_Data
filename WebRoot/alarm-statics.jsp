<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>告警统计饼图</title>
<%@ include file="/global/base-lib.jsp" %>
<style type="text/css"> 
.highcharts-axis span, .highcharts-axis-labels span {
 background-color: #ffffff;
}
div{float:left; 
	display:inline;
	min-width:380px;
	height:300px;
	}
</style>
   <!-- 所需js包 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/toolBox.js"></script>
<!-- 日期js组件-->
<script type="text/javascript" src="${pageContext.request.contextPath}/jquery/jquery-1.7.2.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/jquery/hightCharts/highcharts.src.js"></script>
   <script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/report/alarmStatic.js"></script> 
</head>
	
<body>
   <div id="controlContainer"></div>
   <div id="alarmContainer" ></div>
</body>
</html>