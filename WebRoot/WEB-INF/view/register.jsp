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
				if (!$(":text[name='userCode']:eq(0)").val()) {
					alert("用户账号不能为空！");
					return;
				} else if (!$(":text[name='userName']:eq(0)").val()) {
					alert("用户名称不能为空！");
					return;
				} else if (!$(":password[name='password']:eq(0)").val()) {
					alert("用户密码不能为空！");
					return;
				} else if ($(":password[name='password']:eq(0)").val() != $(":password[name='repassword']:eq(0)").val()) {
					alert("两次输入密码不一致！");
					return;
				} else if (!$(":text[name='phone']:eq(0)").val() || $(":text[name='phone']:eq(0)").val().length != 11) {
					alert("手机号码不能为空或长度不是11位！");
					return;
				} else if (!$(":text[name='idCard']:eq(0)").val() || $(":text[name='idCard']:eq(0)").val().length != 18) {
					alert("身份证号码不能为空或长度不是18位！");
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
				<a class="brand" href="javascript: void(0);"><img class="" src="${pageContext.request.contextPath}/res/img/main/jh.png" />广州市卡口整合平台</a>
				<ul class="nav" id="main-menu">
					<li class="active"><a href="javascript: void(0);">用户注册</a></li>
				</ul>
			</div>
		</div>
		<!-- menu 结束 -->

		<div class="content">
			<div class="tabbable tabs-custom">
				<ul class="nav nav-tabs">
					<li class="active"><a data-toggle="tab" href="javascript: void(0);">用户注册</a></li>
				</ul>
				
				<div class="tab-content" style="overflow-y: auto;">
					<div id="no1" class="tab-pane fade in active">
						<div class="row-fluid">
							<div class="span9" style="width: 350px;">
							<div class="well widget">

									<!-- widget content -->
									<div class="widget-content">
										<form  id="search_from" action="${pageContext.request.contextPath}/user/register.mvc" method="post">
											<fieldset>
												<label>
													*登录账号：
												</label>
												<input type="text" name="userCode" maxlength="20" class="input w210" value="${user.userCode }">
												<label>
													*用户名：
												</label>
												<input type="text" name="userName" maxlength="20" class="input w210" value="${user.userName }">
												<label>
													*密码：
												</label>
												<input type="password" name="password" maxlength="20" class="input w210">
												<label>
													*确认密码：
												</label>
												<input type="password" name="repassword" class="input w210">
												<label>
													性别：
												</label>
												<select name="sex" class="input w210">
													<option value="1">男</option>
													<option value="0">女</option>
												</select>
												<label>
													手机号：
												</label>
												<input type="text" name="phone" maxlength="11" class="input w210" value="${user.phone }">
												<label>
													身份证号：
												</label>
												<input type="text" name="idCard" maxlength="18" class="input w210" value="${user.idCard }">
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
							<div class="span3">
								
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

		<!-- footer 结束
		<script src="js/layout.js"></script> -->
	</body>
</html>
