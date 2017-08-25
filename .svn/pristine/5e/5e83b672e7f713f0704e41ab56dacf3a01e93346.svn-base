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
		<meta content="IE=EmulateIE7" http-equiv="X-UA-Compatible" />
		<meta content="IE=7" http-equiv="X-UA-Compatible" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
		<link href="${pageContext.request.contextPath}/res/css/main.css" rel="stylesheet" type="text/css">
		<%@ include file="/tags/jquery-lib.jsp"%>
		<script type="text/javascript">
			var submitForm = function () {
				if (!$(":input[name='password']:eq(0)").val()) {
					alert("新密码不能为空！");
					return;
				} else if ($(":input[name='pass']:eq(0)").val() != $(":input[name='oldpassword']:eq(0)").val()) {
					alert("原密码输入错误！");
					return;
				} else if ($(":input[name='password']:eq(0)").val() == $(":input[name='repassword']:eq(0)").val()) {
					alert("两次输入密码一致！");
					return;
				} 
				$("form:eq(0)").submit();
			};
		</script>
	</head>

	<body>
		<!-- menu 开始 -->
		<div class="navbar navbar-inverse">
			<div class="navbar-inner">
				<a class="brand" href="#"><img class="" src="${pageContext.request.contextPath}/res/img/main/jh.png" />广州市卡口整合平台</a>
				<ul class="nav" id="main-menu">
					<li><a href="${pageContext.request.contextPath}/car/query.mvc">车辆查询</a></li>
				</ul>
				<ul class="nav" id="main-menu">
					<li class="active"><a href="${pageContext.request.contextPath}/user/to/user.mvc">用户管理</a></li>
				</ul>
			</div>
		</div>
		<!-- menu 结束 -->

		<div class="content">
			<div class="tabbable tabs-custom">
				<ul class="nav nav-tabs">
					<li class="active"><a data-toggle="tab" href="javascript: void(0);">密码修改</a></li>
				</ul>
				
				<div class="tab-content" style="overflow-y: auto;">
					<div id="no1" class="tab-pane fade in active">
						<div class="row-fluid">
							<div class="span9">
							<div class="well widget">

									<!-- widget content -->
									<div class="widget-content">
										<form  id="search_from" action="${pageContext.request.contextPath}/user/updatePassword.mvc" method="post">
											<fieldset>
												<label>
													*用户名：
												</label>
												<input type="hidden" name="userId" value="${sessionScope.userInfo.USER_ID}" class="span12">
												<input type="password" style="display: none;" name="pass" value="${sessionScope.userInfo.PASSWORD}" class="span12">
												<input type="text" readonly="readonly" name="userCode" value="${sessionScope.userInfo.USER_NAME}" class="input disInput">
												<label>
													*原密码：
												</label>
												<input type="password" name="oldpassword" class="input w210">
												<label>
													*新密码：
												</label>
												<input type="password" name="password" class="input w210" maxlength="20">
												注：带“*”号的为必填栏目！
												<label>${message }</label>
												<hr>
												<button class="btn" type="button" onclick="submitForm()">
													<i class=" icon-ok"></i>确定
												</button>
												<button class="btn" type="reset">
													<i class=" icon-remove"></i>重置
												</button>
											</fieldset>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- end content -->

		<!-- footer 开始 -->
		<div class="footer">
			<div class="tishi">提示：请选择用户进行编辑或分配角色!</div>
			<div class="copyright">&copy;2013 金鹏 领先的数字化城市服务提供商</div>
			<div class="light">
				<a href="#"><img src="${pageContext.request.contextPath}/res/img/main/light.png" width="68" height="26" alt="light"></a>
			</div>
		</div>
	</body>
</html>
