<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="ui" uri="/WEB-INF/tlds/ui.tld"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>综合联网缉查大数据平台</title>
	<%@ include file="/global/base-info.jsp" %>
	<script type="text/javascript" src="${pageContext.request.contextPath}/app/eyeSearch/mainInfo.js"></script>
</head>
<body class="easyui-layout">
	<div data-options="region:'north',border:false" style="height:60px;background:#B3DFDA;padding:10px">综合联网缉查大数据平台</div>
	<div data-options="region:'west',split:true,title:'表单'" style="width:350px;padding:10px;">
		    <form id="ff" method="post">
		    	<table cellpadding="5">
		    		<tr>
		    			<td>Name:</td>
		    			<td><input class="easyui-textbox" type="text" name="name" data-options="required:true"></input></td>
		    		</tr>
		    		<tr>
		    			<td>Email:</td>
		    			<td><input class="easyui-textbox" type="text" name="email" data-options="required:true,validType:'email'"></input></td>
		    		</tr>
		    		<tr>
		    			<td>Subject:</td>
		    			<td><input class="easyui-textbox" type="text" name="subject" data-options="required:true"></input></td>
		    		</tr>
					<input class="easyui-combobox" id="language" name="language"
							data-options="valueField:'id',textField:'text'">
		    		<tr>
		    			<td>Message:</td>
		    			<td><input class="easyui-textbox" name="message" data-options="multiline:true" style="height:60px"></input></td>
		    		</tr>
		    	</table>
		    </form>
		    <div style="text-align:center;padding:5px">
		    	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="submitForm()">Submit</a>
		    	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="clearForm()">Clear</a>
		    </div>
	</div>
	<div data-options="region:'south',border:false" style="height:50px;background:#A9FACD;padding:10px;">logo背景</div>
	<div data-options="region:'center',title:'地图'">
		<iframe id='gisInfo' src='${pageContext.request.contextPath}/onLineMapYY.html' width='100%' height='99.5%' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>
	</div>
</body>
</html>