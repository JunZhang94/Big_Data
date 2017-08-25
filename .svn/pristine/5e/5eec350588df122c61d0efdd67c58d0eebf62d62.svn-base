<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/tags/jstl-lib.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<style>
		</style>
		<title>车辆频率分析统计</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta content="IE=EmulateIE7" http-equiv="X-UA-Compatible"/>
    	<meta content="IE=7" http-equiv="X-UA-Compatible"/>
    	<link href="${pageContext.request.contextPath }/res/css/global.car.css" rel="stylesheet" type="text/css" />
		<link href="${pageContext.request.contextPath }/res/css/main.car.css" rel="stylesheet" type="text/css" />
		<style type="text/css">
			.input_text, select {
				border:1px solid #c5c5c5;
				padding:0 3px;
			    line-height:25px;
			    height:22px;
		    }
		</style>
    	<%@ include file="/tags/jquery-lib.jsp"%>
    	<%@ include file="/tags/date.picker-lib.jsp"%>
		<script type="text/javascript">
			$(function () {
				
				$(".submit").click(function () {
					$("form:eq(0)").submit();
				});
				
				$("#dept").val("${param.dept}");
				$("#mount").val("${param.mount}");
				
				$("#dept").change(function () {
					$("#mount option").remove();
					
					var $mount = $("#mount");
					$mount.append('<option value="">请选择卡口</option>');
					
					if (!!$(this).val()) {
						var url = "${pageContext.request.contextPath}/car/cascade.mvc?code=" + $(this).val();
						$.post(url, {"type": "MOUNT"}, function (data) {
							$.each(data, function (i, item) {
								$mount.append("<option value='" + item.kkbh + "'>" + item.kkmc + "</option>");
							});
						});
					}
				});
				
			});
		</script>
	</head>
	<body>
		<div class="content-box" style="*width: 96.2%;">
			<h2 style="*width: 104%; display: none;"><span>车辆查询</span></h2>
			<div class="text-area" style="*min-height: 460px; *height: 460px; *width: 100%;">
			    <div class="toolbar" style="*width: 104%; display: none;">
				    <input id="search" type="image" src="${pageContext.request.contextPath}/res/img/search_menu.png" style="float: right;"/>
				</div>
			    <form id="search_from" action="${pageContext.request.contextPath}/car/analyze/rate.mvc?search=true" method="post">
			    	<table class="search" style="*width: 104%; display: block;"">
			    		<tr style="height:30px;">
			    			<td align="right" class="td-label">部门单位：</td>
			    			<td>
			    				<select id="dept" name="dept" style="width: 210px;">
			    					<option value="">请选择部门单位</option>
			    					<c:forEach items="${depts}" var="item">
			    						<option value="${item.dwbh }">${item.dwmc }</option>
			    					</c:forEach>
			    				</select>
			    			</td>
			    			<td align="right" class="td-label">卡口：</td>
			    			<td colspan="3">
			    				<select id="mount" name="mount" style="width: 435px;">
			    					<option value="">请选择卡口</option>
			    					<c:forEach items="${mounts}" var="item">
			    						<option value="${item.kkbh }">${item.kkmc }</option>
			    					</c:forEach>
			    				</select>
			    			</td>
			    		</tr>
			    		<tr style="height:40px;">
			    			<td width="15%" align="right" class="td-label">开始时间：</td>
			    			<td>
			    				<input id="startDate" type="text" name="startDate" value="${param.startDate }" class="Wdate"
			    					onclick="WdatePicker({skin:'whyGreen',minDate:'2000-01-01',dateFmt:'yyyy-MM-dd HH:mm:ss'})" 
			    					style="width: 153px;" maxlength="20" readonly="true"/>
			    			</td>
			    			<td width="15%" align="right" class="td-label">结束时间：</td>
			    			<td colspan="3">
			    				<input id="endDate" type="text" name="endDate" value="${param.endDate }" class="Wdate"
			    					onclick="WdatePicker({skin:'whyGreen', minDate:'2000-01-01',dateFmt:'yyyy-MM-dd HH:mm:ss'})" 
			    					style="width: 153px;" maxlength="20" readonly="true"/>
			    			</td>
			    		</tr>
			    		
			    		<tr style="height:40px;">
			    			<td align="right" colspan="5">
			    			</td>							
			    			<td align="right">
				    			<img src="${pageContext.request.contextPath}/res/img/search_menu.png" class="submit" />&nbsp;&nbsp;&nbsp;&nbsp;
								<img src="${pageContext.request.contextPath}/res/img/cz_menu.png" onclick="search_from.reset()" style="cursor:hand"/>
							</td>							
			    		</tr>
			    	</table>
					<div style="margin-top: 5px;"></div>
				    <table class="tab">    	
				    	<thead>
				    		<tr align="center" style="background: none repeat-x;height:23px; line-height:23px;">
				    			<th>车牌号码</th>
				    			<th>车辆类型</th> 
				    			<th>经过次数</th>
				    		</tr>
				    	</thead>
				    	<tbody>
				    		<c:forEach items="${data}" var="item" varStatus="st">
				    			<tr class="pro" style="background-color: ${(st.index % 2 == 0) ? '#f4f4f4' : '#fff'}">    				
				    				<td align="center">${item.plateNo } </td>
				    				<td align="center">${item.type } </td>
				    				<td align="center">${item.number } </td>
				       			</tr>
				       		</c:forEach>	
				    	</tbody>
				    </table>
			    </form>
			</div>
		</div>
	</body>
</html>