<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/tags/jstl-lib.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<style>
		</style>
		<title>车辆查询</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
    	<link href="${pageContext.request.contextPath }/res/css/global.car.css" rel="stylesheet" type="text/css" />
		<link href="${pageContext.request.contextPath }/res/css/main.car.css" rel="stylesheet" type="text/css" />
    	<%@ include file="/tags/jquery-lib.jsp"%>
    	<%@ include file="/tags/date.picker-lib.jsp"%>
		<script type="text/javascript">
			$(function () {
				$("#savedata").click(function () {
					$("form:eq(0)").submit();
				});
			});
			
			
		</script>
	</head>
	<body>
		<div class="content-box" style="*width: 96.2%;">
			<h2 style="*width: 104%; display: none;"><span>新增设备</span></h2>
			<div class="text-area" style="*min-height: 460px; *height: 460px; *width: 100%;">
			    <div class="toolbar" style="*width: 104%; display: none;">
				    <input id="search" type="image" src="${pageContext.request.contextPath}/res/img/search_menu.png" style="float: right;"/>
				    <span >新增设备</span>
				</div>
			    <form id="search_from" action="${pageContext.request.contextPath}/device/addDevice.mvc" method="post">
			    	<table class="search" style="*width: 104%; display: block;">
			    		<tr style="height:30px;">
			    			<td align="right" class="td-label">设备编号：</td>
			    			<td><input class="input_text" name="SBBH" value="${SBBH }"/></td>
			    			<td align="right" class="td-label">设备名称：</td>
			    			<td><input class="input_text" name="SBMC" value="${SBMC }"/></td>
			    			<td align="right" class="td-label">设备状态：</td>
			    			<td><input class="input_text" name="SBZT" value="${SBZTSBZT }"/></td>
			    		</tr>
			    		<tr style="height:30px;">
			    			<td align="right" class="td-label">IP地址：</td>
			    			<td><input class="input_text" name="IPDZ" value="${IPDZ }"/></td>
			    			<td align="right" class="td-label">端口号：</td>
			    			<td><input class="input_text" name="DKH" value="${DKH }"/></td>
			    			<td align="right" class="td-label">设备类型：</td>
			    			<td><input class="input_text" name="SBLX" value="${SBLX }"/></td>
			    		</tr>
			    		<tr style="height:30px;">
			    			<td align="right" class="td-label">登录名称：</td>
			    			<td><input class="input_text" name="DLMC" value="${DLMC }"/></td>
			    			<td align="right" class="td-label">登录密码：</td>
			    			<td><input class="input_text" name="DLMM" value="${DLMM }"/></td>
			    			<td align="right" class="td-label">设备厂家：</td>
			    			<td><input class="input_text" name="SMCJ" value="${SMCJ }"/></td>
			    		</tr>
			    		<tr style="height:30px;">
			    			<td align="right" class="td-label">所属单位：</td>
			    			<td><input class="input_text" name="SSDW" value="${SSDW }"/></td>
			    			<td align="right" class="td-label">设备方向：</td>
			    			<td><input class="input_text" name="SBFX" value="${SBFX }"/></td>
			    			<td align="right" class="td-label">卡口编号：</td>
			    			<td><input class="input_text" name="SBKKBH" value="${SBKKBH }"/></td>
			    		</tr>
			    		<tr style="height:30px;">
			    			<td align="right" class="td-label">经度：</td>
			    			<td><input class="input_text" name="JD" value="${JD }"/></td>
			    			<td align="right" class="td-label">纬度：</td>
			    			<td><input class="input_text" name="WD" value="${WD }"/></td>
			    			
			    		</tr>
			    		<tr style="height:40px;">
			    			<td align="center" colspan="5">
							</td>							
			    			<td align="center">
				    			<input type="button" value="提交" id="savedata"> &nbsp;&nbsp;&nbsp;&nbsp;
								
							</td>							
			    		</tr>
			    	</table>
					
			    </form>
			</div>
		</div>
	</body>
</html>