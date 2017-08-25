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
	<title>按照片搜车</title>
	<%@ include file="/global/base-info.jsp" %>
	<script type="text/javascript" src = '${pageContext.request.contextPath}/app/largeDataHandle/searchByPhoto.js'></script>
</head>
<body class="easyui-layout">
	<div data-options="region:'north',border:false" style="height:60px;background:#B3DFDA;padding:10px">卡口整合项目</div>
	<div data-options="region:'west',split:true,title:'按照片搜车'" style="width:350px;padding:10px;">
		    <div style="text-align:center;padding:5px">
				选择待查询车型照片<br/><br/>
				<input type=file name="doc" id="doc" onchange="AddPicture()"> 
 				<div style="padding-top:20px;padding-left:50px;" id="localImag"><img id="preview" width=-1 height=-1 style="diplay:none" /></div> 
		    </div>
		    <div class="" style="text-align:padding:5px">
		    	<table>
		    	<br/>
		    		<tr>
		    			<td>数据源</td>
		    			<td>
			    			<input type="radio" name="radioDataSource" value="全部" checked="checked">全部
			    			<input type="radio" name="radioDataSource" value="卡口">卡口
			    			<input type="radio" name="radioDataSource" value="电警">电警
		    			</td>
		    		</tr>
		    		<tr>
		    			<td>颜色</td>
		    			<td>
		    				<select class="easyui-combogrid" style="width:150px" data-options="
									panelWidth: 150,
									multiple: true,
									textField: 'carColor',
									url: '${pageContext.request.contextPath}/app/largeDataHandle/carColor_data.json',
									method: 'get',
									columns: [[
										{field:'ck',checkbox:true},
										{field:'carColor',title:'全选',width:100}
									]],
								">
							</select>
		    			</td>
		    		</tr>
		    		<tr>
		    			<td>起始</td>
		    			<td>
		    				<input class="easyui-datetimebox" style="width:150px">
		    			</td>
		    		</tr>
		    		<tr>
		    			<td>结束</td>
		    			<td>
		    				<input class="easyui-datetimebox" style="width:150px">
		    			</td>
		    		</tr>
		    	</table>
		    </div>
		     <div class="" style="text-align:center;padding:5px">
		    	选择拍摄位置（默认为全部区域）
		    	
		    </div>
		    <div style="text-align:center;padding:5px">
		    	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="SearchForm()">搜索</a>
		    </div>
	</div>
	<div data-options="region:'south',border:false" style="height:50px;background:#A9FACD;padding:10px;">logo背景</div>
	<div data-options="region:'center',title:'地图'">
		<object data="${ctx}/onLineMapYY.html" style="width:950px; height:600px;overflow:auto"></object>
	</div>
</body>
</html>