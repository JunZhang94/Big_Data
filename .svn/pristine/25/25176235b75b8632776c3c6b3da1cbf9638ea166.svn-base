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
<title>全文检索功能</title>
<style type="text/css"> 
.full-button-search {
	margin-top: 3px; !important;
}
#searchBut {
	margin-top: 3px; !important;
}
.time-form-lable {
 color: red;
}
</style>
<script>
	var webroot=document.location.href;
    webroot=webroot.substring(webroot.indexOf('//')+2,webroot.length);
    webroot=webroot.substring(webroot.indexOf('/')+1,webroot.length);
    webroot=webroot.substring(0,webroot.indexOf('/'));
    var rootpath="/"+webroot;
    
    function changeCss() {
    	var arr = document.getElementsByTagName('div');
    	var num = arr.length;
    	for (var i = 0; i < num; ++i) {
    		if (arr[i].className == 'x-grid3') {
    		
    		}
    	}
    }
</script>

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/lib/ext/ext-all-min.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/themes/client/blue/basic.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/themes/client/blue/spreads.css">

<!-- 所需样式 -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/themes/client/blue/custom.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/themes/client/blue/fullTextSearchShare.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/lib/ext/ux/css/ux-all.css">

<script type="text/javascript" src="${pageContext.request.contextPath}/lib/ext/ext-base-debug.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/lib/ext/ext-simple-debug.js"></script>
 <!--
<script type="text/javascript" src="${pageContext.request.contextPath}/lib/ext/ext-base-min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/lib/ext/ext-simple-min.js"></script>
 -->
<script type="text/javascript" src="${pageContext.request.contextPath}/js/utils.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/basic.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/spreads.js"></script>

<script type="text/javascript"	src="${pageContext.request.contextPath}/lib/ext/ux/ux-all.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/search/copyGrid.js"></script>
<!-- 所需js包 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/toolBox.js"></script>

<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/search/fullTextSearch.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/search/beforeDate.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/search/bayonetDetailWindow.js"></script>
<!-- 字典js包 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/Dictionary.js"></script>
<script type="text/javascript"> 
    window.dictionary  = new Dictionary();
</script>
</head>
<body >	
</body>
</html>