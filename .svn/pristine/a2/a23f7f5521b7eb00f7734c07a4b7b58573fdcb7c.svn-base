<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>按车型查询结果</title>
	<%@include file="/commons/taglibs.jsp" %>
	<%@ include file="/global/base-info.jsp" %>
	<script type="text/javascript" src = '${ctx}/app/carSearch/carImgTypeSearch.js'></script>
</head>
<body class="easyui-layout">
	 <div data-options="region:'east'" id="globleGis" style="width:250px;"></div>
	 <div data-options="region:'center'" class="dataCenter">
	 	<div id="p" title="查询条件" class="easyui-panel search-info" style="width:100%;height:15%;">
			<label style="width: 200px;">车辆类型：</label>
			<label id="carType" class="text-display" style="width: 200px;">全部</label>
			<label style="width: 200px;">车牌颜色：</label>
			<label id="carNumColor" class="text-display" style="width: 200px;">全部</label>
			<label>查询时段：</label>
			<label id="searchTime" class="text-display" style="width: 300px;"></label>
		</div>
		<table id="datagrid" style="height: 85%" title="查询结果"/>
	 </div>
</body>
</html>