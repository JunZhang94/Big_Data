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
		<link href="${pageContext.request.contextPath}/res/css/style.css" rel="stylesheet" type="text/css">
		<%@ include file="/tags/jquery-lib.jsp"%>
		
		<script type="text/javascript">
			$(function () {
			
				$(".pro").click(function () {
					var carData = $(this).attr("val").replace("\{", "").replace("\}", "").split(",");
					var $record = {};
					$.each(carData, function (i, item) {
						var data = item.split("=");
						$record[$.trim(data[0])] = data[1];
					});
					$(".widget-content input, .span12").each(function (i, item) {
						$(this).val($record[$(this).attr("id")]);
					});
					$("#carImg").attr("src", $(this).attr("img"));
					$("#tx1").attr("value", $(this).attr("img"));
				}).dblclick(function () {
				
					var carData = $(this).attr("val").replace("{", "").replace("}", "").split(",");
					var $record = {};
					$.each(carData, function (i, item) {
						var data = item.split("=");
						$record[$.trim(data[0])] = data[1];
					});
					
					window.open($(this).attr("img"), "_blank");
				});
			});
		</script>
	</head>

	<body>
		<!-- menu 开始 -->
		<div class="navbar navbar-inverse">
			<div class="navbar-inner">
				<a class="brand" href="javascript: void(0);"><img style="margin-top: 5px;" src="${pageContext.request.contextPath}/res/img/main/jh.png" />广州市卡口整合平台</a>
				<ul class="nav" id="main-menu">
					<li class="active"><a href="javascript: void(0);">车辆查询</a></li>
				</ul>
				<ul class="nav" id="main-menu" style="display: ${sessionScope.userInfo.USER_CODE != 'admin' ? 'block' : 'none'};">
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
					<li class="active"><a data-toggle="tab" href="javascript: void(0);">车辆查询</a></li>
					<li><a href="${pageContext.request.contextPath}/car/analyze/rate.mvc">车辆频度统计</a></li>
					<li><a href="${pageContext.request.contextPath}/temp/act.mvc">卡口车辆查询</a></li>
					<li><a href="${pageContext.request.contextPath}/queryhphm/queryplateno.mvc">车牌车辆查询</a></li>
					<li><a href="${pageContext.request.contextPath}/device/openRealTime.mvc">设备状态查询</a></li>
					<li><a href="${pageContext.request.contextPath}/device/devicemgr.mvc">设备信息查询</a></li>
					<li><a href="${pageContext.request.contextPath}/devicePolling/devicePollingPage.mvc">人工登记巡检</a></li>
					<li><a href="${pageContext.request.contextPath}/systemConfig/alarmSetting.mvc">报警设置</a></li>
					<li><a href="${pageContext.request.contextPath}/controlAlarm/devicePollingPage.mvc">告警查询</a></li>
					<li><a href="${pageContext.request.contextPath}/controlManager/controlManagerPage.mvc">布控查询</a></li>
					<li><a href="${pageContext.request.contextPath}/provider/providerPage.mvc">供应商</a></li>
					<li><a href="${pageContext.request.contextPath}/controlManager/controlVerifyPage.mvc">布控审核</a></li>
					<li><a href="${pageContext.request.contextPath}/provider/userMgrPage.mvc">用户管理</a></li>
					<li><a href="${pageContext.request.contextPath}/dictionary/dictionaryPage.mvc">字典管理</a></li>
				</ul>
				
				<div class="tab-content" style="overflow-y: auto;">
					<div id="no1" class="tab-pane fade in active">
						<div class="row-fluid">
							<div class="span9" style="padding: 0 0 5px 5px;">
								<jsp:include page="car-query.jsp"/>
							</div>
							<div class="span3" style="padding: 0 5px 5px 0; margin-left: 10px; width: 27.5%;">
								<div class="well widget">

									<!-- widget content -->
									<div class="widget-content">
										<form>
											<fieldset style="text-align: center;">
												<img class="span12" id="carImg" style="width: 280px; height: 300px;"/>
												<br/>
												<br/>
												<label>1信息编号：</label>
												<input type="text" id="xxbh" class="input disInput" readonly="readonly">
												
												<br/>
												<br/>
												<label>2卡口编号：</label>
												<input type="text" id="kkbh" class="input disInput" readonly="readonly">
												
												<br/>
												<br/>
												<label>3设备编号：</label>
												<input type="text" id="sbbh" class="input disInput" readonly="readonly">
												
												<br/>
												<br/>
												<label>4方向编号：</label>
												<input type="text" id="fxbh" class="input disInput" readonly="readonly">
												
												<br/>
												<br/>
												<label>5过车时间：</label>
												<input type="text" id="jgsj" class="input disInput" readonly="readonly">
												
												<br/>
												<br/>													
												<label>6车道编号：</label>
												<input type="text" id="cdbh" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>7车道类型：</label>
												<input type="text" id="cdlx" class="input disInput" readonly="readonly">
												
												<br/>
												<br/>
												<label>8号牌号码：</label>
												<input type="text" id="hphm" class="input disInput" readonly="readonly">
												
												<br/>
												<br/>
												<label>9号牌颜色：</label>
												<input type="text" id="hpys" class="input disInput" readonly="readonly">
												<br/><input type="text" id="hpys2" class="input disInput" readonly="readonly">
												
												<br/>
												<br/>
												<label>10车尾号牌号码：</label>
												<input type="text" id="cwhphm" class="input disInput" readonly="readonly">
												
												<br/>
												<br/>
												<label>11车尾号牌颜色：</label>
												<input type="text" id="cwhpys" class="input disInput" readonly="readonly">
												
												<br/>
												<br/>
												<label>12号牌一致：</label>
												<input type="text" id="hpyz" class="input disInput" readonly="readonly">
												
												<br/>
												<br/>
												<label>13车辆速度：</label>
												<input type="text" id="clsd" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>14车辆限速：</label>
												<input type="text" id="clxs" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>15车身长度：</label>
												<input type="text" id="cscd" class="input disInput" readonly="readonly">
												
												<br/>
												<br/>
												<label>16行驶状态：</label>
												<input type="text" id="xszt" class="input disInput" readonly="readonly">
												
												<br/>
												<br/>
												<label>17违法状态：</label>
												<input type="text" id="wfzt" class="input disInput" readonly="readonly">
												
												<br/>
												<br/>
												<label>18车辆品牌：</label>
												<input type="text" id="clpp" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>19车辆外形：</label>
												<input type="text" id="clwx" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>20车身颜色：</label>
												<input type="text" id="csys" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>21车辆类型：</label>
												<input type="text" id="cllx" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>22号牌种类：</label>
												<input type="text" id="hpzl" class="input disInput" readonly="readonly">
												<br/><input type="text" id="hpzl2" class="input disInput" readonly="readonly">
												
												<br/>
												<br/>
												<label>23图像数量：</label>
												<input type="text" id="txsl" class="input disInput" readonly="readonly">
												
												<br/>
												<br/>
												<label>图像1：</label>
												<input type="text" id="tx1" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>图像2：</label>
												<input type="text" id="tx2" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>图像3：</label>
												<input type="text" id="tx3" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>图像4：</label>
												<input type="text" id="tx4" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>图像5：</label>
												<input type="text" id="tx5" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>图像6：</label>
												<input type="text" id="tx6" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>图像7：</label>
												<input type="text" id="tx7" class="input disInput" readonly="readonly">
												<br/>
												<br/>
												<label>图像8：</label>
												<input type="text" id="tx8" class="input disInput" readonly="readonly">
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
