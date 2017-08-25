<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>按车辆类型查询</title>
	<%@include file="/commons/taglibs.jsp" %>
	<%@ include file="/global/base-info.jsp" %>
	<script type="text/javascript" src="${ctx}/app/global.js"></script>
	<script type="text/javascript" src="${ctx}/app/carSearch/typeQueryCondition.js"></script>
</head>
<body class="easyui-layout">
	 <div data-options="region:'west'" title="神眼搜车=>按车型搜车" class="titleBc">
	 	<div class="viewForm">
	 		 <form id="carTypeForm" method="post">
		 	 	<table cellpadding="5">
		 	 		<tr>
		    			<td>品牌:</td>
		    			<td><input class="easyui-combobox" id="carBrand" style="width:200px;" name="carBrand"></input></td>
		    		</tr>
		    		<tr>
		    			<td>型号:</td>
		    			<td><input class="easyui-combobox" id="carType" style="width:200px;" name="carType"></input></td>
		    		</tr>
		    		<tr>
		    			<td>年款:</td>
		    			<td><input class="easyui-combobox" id="carOfYear" style="width:200px;" name="carOfYear"></input></td>
		    		</tr>
		    		<tr>
		    			<td>号牌号码:</td>
		    			<td><input class="easyui-textbox" style="width:200px;" type="text" name="carNum"></input></td>
		    		</tr>
		    		<tr>
		    			<td>车牌颜色:</td>
		    			<td><input class="easyui-combobox" style="width:200px;" id="carNumColor" name="carNumColor"></input></td>
		    		</tr>
		    		<tr>
		    			<td>开始时间:</td>
		    			<td><input class="easyui-datetimebox" style="width:200px;" id="startTime"></input></td>
		    		</tr>
		    		<tr>
		    			<td>结束时间:</td>
		    			<td><input class="easyui-datetimebox" style="width:200px;" id="endTime"></input></td>
		    		</tr>
		 	 	</table>
	 	 	</form>
 		    <div class="buttonInfo">
		    	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="submitForm()">&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;</a>
		    	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="clearForm()">&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;</a>
		    </div>
	 	</div>
	 </div>
	 <div data-options="region:'center'" id="mountGis" style="padding:5px;">
	 </div>
</body>
</html>