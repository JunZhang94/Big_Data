<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="java.util.*"%>
<%@ taglib prefix="ui" uri="/WEB-INF/tlds/ui.tld"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>操作页面</title>
	<%@ include file="/global/base-info.jsp" %>
	<script>
	var title = '${title}';
	document.title = title;

	function backMainPage() {
		this.location.href = rootpath + "/user/to/main.mvc";
	}
	</script>
	<style type="text/css">
	body,html{
		margin: 0px;
		padding: 0px;
	}
    </style>
</head>
<body>
	 <div style="position:absolute;right:10px; top:5px;">
		<a href="#" onclick="backMainPage()" hidefocus="true" style="color:#000; text-decoration:none;font-size:20px;">返回</a>
	</div>
	<div id="mainGrid" data-options="region:'center',border:false; height: 100%; width: 100%;" style="padding:0px;">
        <div data-options="fit:true">
            <iframe id="scrollIframe" src="${urlStr}" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="yes" allowtransparency="yes"></iframe>
        </div>
    </div>
    <script>
		var h = document.documentElement.clientHeight;
		document.getElementById('scrollIframe').height = h-2;
	</script>
</body>
</html>