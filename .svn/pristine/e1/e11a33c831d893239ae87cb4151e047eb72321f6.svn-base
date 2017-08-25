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
			$(function () {
				$(".submit").click(function () {
					$("form:eq(0)").submit();
				});
				
			});
			
			var submitForm = function () {
				$("form:eq(0)").submit();
			};
			
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
			    <form id="search_from" action="${pageContext.request.contextPath}/user/to/user.mvc?search=true" method="post">
			    	<table class="search" style="*width: 104%; display: block;">
			    		<tr style="height:30px;">
			    			<td align="right" style="width: 70xp; text-align: right;">用户名称：</td>
			    			<td style="padding: 5px 20px 0 20px;">
			    				<input type="text" name="keyword" class="input w210">
			    				&nbsp;&nbsp;&nbsp;&nbsp;
				    			<img src="${pageContext.request.contextPath}/res/img/search_menu.png" class="submit" />&nbsp;&nbsp;&nbsp;&nbsp;
							</td>							
			    		</tr>
			    	</table>
					<div style="margin-top: 5px;"></div>
				    <table class="tab">    	
				    	<thead>
				    		<tr align="center" style="background: none repeat-x;height:23px; line-height:23px;">
				    			<th>序号</th>
				    			<th>用户账号</th>
				    			<th>用户名称</th>
				    			<th>用户密码</th> 
				    			<th>性别</th> 
				    			<th>手机号</th>
				    			<th>身份证号</th>
				    			<th>操作</th>
				    		</tr>
				    	</thead>
				    	<tbody>
				    		<c:forEach items="${users}" var="item" varStatus="st">
				    			<tr class="pro" style="background-color: ${(st.index % 2 == 0) ? '#f4f4f4' : '#fff'}" val="${item }">   
				    				<td>${st.index + 1 }</td> 				
				    				<td align="center">${item.userCode } </td>
				    				<td align="center">${item.userName } </td>
				    				<td align="center">${item.password } </td>
				    				<td align="center">${item.sex == 1 ? '男' : '女' } </td>
				    				<td align="center">${item.phone } </td>
				    				<td align="center">${item.idCard } </td>
				    				<td align="center"><a href="${pageContext.request.contextPath}/user/remove.mvc?userId=${item.userId }">删除</a> </td>
				       			</tr>
				       		</c:forEach>	
				    	</tbody>
				    </table>
				
			    </form>
			</div>
		</div>
	</body>
</html>