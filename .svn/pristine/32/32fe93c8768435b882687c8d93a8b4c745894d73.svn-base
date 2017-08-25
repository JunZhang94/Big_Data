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
			$(function () {
			
				$(".pro").click(function () {
					var carData = $(this).attr("val").replace("{", "").replace("}", "").split(",");
					var $record = {};
					$.each(carData, function (i, item) {
						var data = item.split("=");
						$record[$.trim(data[0])] = data[1];
					});
					$(".widget-content input, .span12").each(function (i, item) {
						$(this).val($record[$(this).attr("id")]);
					});
					$("#carImg").attr("src", $(this).attr("img"));
				});
			});
		</script>
	</head>

	<body>
		<!-- menu 开始 -->
		<div class="navbar navbar-inverse">
			<div class="navbar-inner">
				<a class="brand" href="javascript: void(0);"><img class="" src="${pageContext.request.contextPath}/res/img/main/jh.png" />广州市卡口整合平台</a>
				<ul class="nav" id="main-menu">
					<li class="active"><a href="javascript: void(0);">车辆查询</a></li>
				</ul>
				<ul class="nav" id="main-menu" style="display: ${sessionScope.userInfo.USER_CODE != 'admin' ? 'block' : 'none'}">
					<li><a href="${pageContext.request.contextPath}/user/to/user.mvc">用户管理</a></li>
				</ul>
				<div class="nav-collapse collapse secondary-menu">
       			 <ul class="nav" id="secondary-menu">
          			<li class=""> <a href="${pageContext.request.contextPath}/user/to/updatePassword.mvc">帐户</a> </li>
        		</ul>
     		   </div>
			</div>
		</div>
		<!-- menu 结束 -->

		<div class="content">
			<div class="tabbable tabs-custom">
				<ul class="nav nav-tabs">
					<li><a href="${pageContext.request.contextPath}/car/query.mvc">车辆查询</a></li>
					<li><a href="${pageContext.request.contextPath}/car/analyze/rate.mvc">车辆频度统计</a></li>
					<li><a href="${pageContext.request.contextPath}/temp/act.mvc">卡口车辆查询</a></li>
					<li class="active"><a data-toggle="tab" href="javascript: void(0);">车牌车辆查询</a></li>
				</ul>
				
				<div class="tab-content" style="overflow-y: auto;">
					<div id="no1" class="tab-pane fade in active">
						<div class="row-fluid">
							<div class="span9" style="padding: 0 5px 5px 0;">
								<jsp:include page="car-query-by-plateno.jsp"/>
							</div>
							<div class="span3" style="padding: 0 5px 5px 0; margin-left: 10px; width: 27.5%;">
								<div class="well widget">

									<!-- widget content -->
									<div class="widget-content">
										<form>
											<fieldset style="text-align: center;">
												<img class="span12" id="carImg" style="width: 280px; height: 300px;"/>
												<br/>
												<label>车道编号：</label>
												<input type="text" id="cdbh" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>车道类型：</label>
												<input type="text" id="cdlx" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>方向编号：</label>
												<input type="text" id="fxbh" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>号牌颜色：</label>
												<input type="text" id="hpys" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>车尾号牌号码：</label>
												<input type="text" id="cwhphm" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>车尾号牌颜色：</label>
												<input type="text" id="cwhpys" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>车辆速度：</label>
												<input type="text" id="clsd" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>车辆限速：</label>
												<input type="text" id="clxs" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>车身长度：</label>
												<input type="text" id="cscd" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>行驶状态：</label>
												<input type="text" id="xszt" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>车辆品牌：</label>
												<input type="text" id="clpp" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>车辆外形：</label>
												<input type="text" id="clwx" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>车身颜色：</label>
												<input type="text" id="csys" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>车辆类型：</label>
												<input type="text" id="cllx" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>号牌种类：</label>
												<input type="text" id="hpzl" class="input disInput" readonly="readonly">
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
			<div class="tishi">提示：欢迎登陆使用系统!</div>
			<div class="copyright">&copy;2013 金鹏 领先的数字化城市服务提供商</div>
			<div class="light">
				<a href="#"><img src="${pageContext.request.contextPath}/res/img/main/light.png" width="68" height="26" alt="light"></a>
			</div>
		</div>

	</body>
</html>
