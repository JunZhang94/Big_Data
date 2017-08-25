<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="ui" uri="/WEB-INF/tlds/ui.tld"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "
http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>定时任务</title>
<%@ include file="/global/base-lib.jsp" %>
<!-- 所需js包 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/toolBox.js"></script>
<style type="text/css"> 
.x-grid3-row {
  height: auto; !important;
}
.x-grid3-cell-inner, .x-grid3-hd-inner { white-space:normal !important; } 
.x-grid3-header {
 	height: auto;
 	background: url("images/table_bg1.jpg") repeat-x scroll 0 0 transparent;
 	padding : 0px;
 	border-bottom: 1px solid #DBDBDB;
 	border-top: 1px solid #DBDBDB;
}
</style>
<!-- 日期js组件 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/My97DatePicker/WdatePicker.js"></script>

<script type="text/javascript"	src="${pageContext.request.contextPath}/js/ttoolBox.js"></script>

<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/control/TreeComboField.js"></script>

<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/datacenter/timeJobsManages.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/datacenter/FollowCarResult.js"></script>


</head>
<body >	
</body>
</html>