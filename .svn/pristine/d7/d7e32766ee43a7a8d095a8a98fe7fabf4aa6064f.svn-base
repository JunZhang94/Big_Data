<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/tags/jstl-lib.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<style>
		</style>
		<title>车辆查询</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta content="IE=EmulateIE7" http-equiv="X-UA-Compatible"/>
    	<meta content="IE=7" http-equiv="X-UA-Compatible"/>
    	<link href="${pageContext.request.contextPath }/res/css/global.car.css" rel="stylesheet" type="text/css" />
		<link href="${pageContext.request.contextPath }/res/css/main.car.css" rel="stylesheet" type="text/css" />
    	<%@ include file="/tags/jquery-lib.jsp"%>
    	<%@ include file="/tags/date.picker-lib.jsp"%>
		<script type="text/javascript">
		$(document).ready( function() {
			if("${querypageSize}"!="0"){
				document.getElementById("pageSize").value = "${querypageSize}";
			}
			if("${plateNo}"!=""){
				document.getElementById("plateNo").value = "${plateNo}";
			}
		}); 
			function submitForm(){
	 			document.getElementById("search_from").submit();
			}
			
			$(function () {
				$(".submit").click(function () {
					$("form:eq(0)").submit();
				});
				
				$("#area").val("${param.area}");
				$("#dept").val("${param.dept}");
				$("#mount").val("${param.mount}");
				
				if (!!"${param.dept}") {
					$("#dept").append('<option value="${param.dept}" selected="selected">${param.deptText}</option>');
				}
				if (!!"${param.mount}") {
					$("#mount").append('<option value="${param.mount}" selected="selected">${param.mountText}</option>');
				}
				
				$("#area").change(function () {
					$("#dept option").remove();
					$("#mount option").remove();
					
					var $dept = $("#dept");
					$dept.append('<option value="">请选择部门</option>');
					var $mount = $("#mount");
					$mount.append('<option value="">请选择卡口</option>');
					
					if (!!$(this).val()) {
						var url = "${pageContext.request.contextPath}/car/cascade.mvc?code=" + $(this).val();
						$.post(url, {"type": "DEPT"}, function (data) {
							$.each(data, function (i, item) {
								$dept.append("<option value='" + item.dwbh + "'>" + item.dwmc + "</option>");
							});
						});
					}
				});
				
				$("#dept").change(function () {
					$("#mount option").remove();
					
					var $mount = $("#mount");
					$mount.append('<option value="">请选择卡口</option>');
					$("input[name='deptText']:eq(0)").val($(this).find(":selected").text());
					
					if (!!$(this).val()) {
						var url = "${pageContext.request.contextPath}/car/cascade.mvc?code=" + $(this).val();
						$.post(url, {"type": "MOUNT"}, function (data) {
							$.each(data, function (i, item) {
								$mount.append("<option value='" + item.kkbh + "'>" + item.kkmc + "</option>");
							});
						});
					}
				});
				
				$("#mount").change(function () {
					$(":input[name='mountText']:eq(0)").val($(this).find(":selected").text());
				});
			});
		</script>
	</head>
	<body>
		<div class="content-box" style="*width: 96.2%;">
			<h2 style="*width: 104%; display: none;"><span>车辆模糊查询</span></h2>
			<div class="text-area" style="*min-height: 460px; *height: 460px; *width: 100%;">
			    <div class="toolbar" style="*width: 104%; display: none;">
				    <input id="search" type="image" src="${pageContext.request.contextPath}/res/img/search_menu.png" style="float: right;"/>
				    <span >模糊搜索</span>
				</div>
			    <form id="search_from" action="${pageContext.request.contextPath}/queryhphm/queryplateno.mvc" method="post">
			    	<table class="search" style="*width: 104%;">
			    		<tr style="height:40px;">
			    			<td align="right" class="td-label">车牌号码：</td>
			    			<td width="200"><input class="input_text" name="plateNo" value="${param.plateNo }"/></td>
			    			<td align="left" style="padding-left: 4em;">
			    				<input type="hidden" name="deptText" value="${param.deptText}"/>
			    				<input type="hidden" name="mountText" value="${param.mountText}"/>
			    				<input type="hidden" id="lastKey" name="lastKey" value="${lastKey}"/>
			    				<input type="hidden" id="lastKey" name="lastkey" value="${lastkey}"/>
				    			<img src="${pageContext.request.contextPath}/res/img/search_menu.png" class="submit" />&nbsp;&nbsp;&nbsp;&nbsp;
								<img src="${pageContext.request.contextPath}/res/img/cz_menu.png" onclick="search_from.reset()" style="cursor:hand"/>
							</td>							
			    		</tr>
			    	</table>
					<div style="margin-top: 5px;"></div>
				    <table class="tab">    	
				    	<thead>
				    		<tr align="center" style="background:url(${pageContext.request.contextPath }/res/image/tt_bg.png) repeat-x;height:23px; line-height:23px;">
				    			<th>序号</th>
				    			<th>车牌号码</th>
				    			<th>经过时间</th>
				    			<th>卡口编号</th> 
				    			<th>设备编号</th> 
				    			<th>创建时间</th>
				    		</tr>
				    	</thead>
				    	<tbody>
				    		<c:forEach items="${data}" var="item" varStatus="st">
				    			<tr class="pro" style="background-color: ${(st.index % 2 == 0) ? '#f4f4f4' : '#fff'}" val="${item }" img="${item.tx1 }">    				
				    				<td>${st.index + 1 }</td> 			
				    				<td align="center">${item.hphm } </td>
				    				<td align="center">
				    				<fm:formatDate value="${item.jgsj}" pattern="yyyy-MM-dd hh:mm:ss"/>
				    				</td>
				    				<td align="center">${item.kkbh } </td>
				    				<td align="center">${item.sbbh } </td>
				    				<td align="center">
				    				<fm:formatDate value="${item.rksj}" pattern="yyyy-MM-dd hh:mm:ss"/>
				    				</td>
				       			</tr>
				       		</c:forEach>	
				    	</tbody>
				    </table>
				
					<div style="text-align: center;">
					   	<a href="javascript: submitForm(null, '${pageContext.request.contextPath}/homepage/products.mvc?pageNo=');">上一页</a>
					   
					    <a href="javascript: submitForm();">下一页</a>    	
					    &nbsp;&nbsp;&nbsp;&nbsp;
					    第1页，
					   	 每页显示 
					   	<select onchange="submitForm()" id="pageSize" name="pageSize" style="width: 60px;">
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="50">50</option>
						</select>条，共1003页，总共50000150条
				    </div>
			    </form>
			</div>
		</div>
	</body>
</html>