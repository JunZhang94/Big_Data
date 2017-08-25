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
<title>频繁过车</title>
<%@ include file="/global/base-lib.jsp" %>

<!-- 日期js组件 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/My97DatePicker/WdatePicker.js"></script>

<!-- 所需js包 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/toolBox.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/ttoolBox.js"></script>
<!-- comboTree 的文件-->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/search/carTrackSearch.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/analyze/CarFrequency.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/control/TreeComboField.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/analyze/carFrequencyStatistics.js"></script>
<!-- 字典js包 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/Dictionary.js"></script>
<script type="text/javascript"> 
    window.dictionary  = new Dictionary();
</script>

</head>
<body >	
</body>
</html>