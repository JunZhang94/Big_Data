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
<title>历史车辆查询</title>
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
.x-grid-panel{
	border:1px solid #99bbe8 !important;
}

#phones ul li {
	 height: 290px !important;
}
</style>
<%@ include file="/global/base-lib.jsp" %>
<script type="text/javascript"> 
	var ipAdress = "<%= ipAdress %>";
</script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/lib/ext/ux/css/fileuploadfield.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/lib/ext/animated-dataview.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/lib/ext/DataViewTransition.js"></script>
<!-- 所需js包 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/toolBox.js"></script>

<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/search/carTrackSearch.js"></script>
<!-- <script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/control/constants.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/control/controlInputWindow.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/control/TreeComboField.js"></script>  -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/search/generalQueryResult.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/lib/ext/ux/FileUploadField.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/search/carNumFile.js"></script>
<!-- 字典js包 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/Dictionary.js"></script>
<script type="text/javascript"> 
    window.dictionary  = new Dictionary();
</script>
<script id="resultScript" type="text/javascript" src=""/>
<style type="text/css"> 
	.x-form-item {
		margin-bottom: 10px;
	}
</style>
</head>
<body >	
</body>
</html>