<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">

		<title>广州卡口整合平台</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
		<link href="${pageContext.request.contextPath}/res/css/main.css" rel="stylesheet" type="text/css">
		<%@ include file="/tags/jquery-lib.jsp"%>
	</head>

	<body>

		<div class="content">
			<div class="tabbable tabs-custom">
				<div class="tab-content" style="overflow-y: auto;">
					<div id="no1" class="tab-pane fade in active">
						<div class="row-fluid">
							<div class="span9" style="width: 100%; padding: 0 5px 5px 5px;">
								<jsp:include page="car-analyze-rate.jsp"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- end content -->

		<!-- footer 开始 -->
		<div class="footer">
			<div class="tishi" >提示：欢迎登陆使用系统!</div>
			<div class="copyright">&copy;2013 金鹏 领先的数字化城市服务提供商</div>
			<div class="light">
				<a href="#"><img src="${pageContext.request.contextPath}/res/img/main/light.png" width="68" height="26" alt="light"></a>
			</div>
		</div>
	</body>
</html>
