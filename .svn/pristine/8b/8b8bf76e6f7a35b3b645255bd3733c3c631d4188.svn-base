<!DOCTYPE HTML>
<%@ page contentType="text/html; charset=utf-8" %>
<html>
  <head>
  <title>自定义碰撞</title>
  <%@include file="/commons/taglibs.jsp" %>
    <link rel="stylesheet" type="text/css" href="${ctx}/css/easyui.css">
   <link rel="stylesheet"  type="text/css"  href="${ctx}/skin/jqueryUI.css"/> 
  <link rel="stylesheet"  type="text/css"  href="${ctx}/skin/yhSkinBlue.css"/> 
    <link rel="stylesheet"  type="text/css"  href="${ctx}/skin/yhStructure.css"/>  
    <script type="text/javascript" src="${ctx}/commons/jquery-1.7.2.min.js"></script> 
      <script type="text/javascript" src="${ctx}/commons/jquery-ui.min.js"></script> 
      <script type="text/javascript" src="${ctx}/commons/jquery.yhDropDown.js"></script>
       <script type="text/javascript" src="${ctx}/commons/yhLibary.js"></script>
        <script type="text/javascript" src="${ctx}/commons/yhCore.js"></script>
        <script type="text/javascript" src="${ctx}/commons/jquery.ztree.all.js"></script> 
         <script type="text/javascript" src="${ctx}/commons/common.js"></script> 
          <script type="text/javascript" src="${ctx}/commons/ajax-request.js"></script> 
          <script type="text/javascript" src="${ctx}/commons/jquery.easyui.utils.1.0.js"></script> 
          <script type="text/javascript" src="${ctx}/jquery/jquery.easyui.min.js"></script>
           <script type="text/javascript"	src="${ctx}/js/My97DatePicker/WdatePicker.js"></script>
  		<script type="text/javascript" src = '${ctx}/app/largeDataHandle/selfDefine.js'></script>
 
</head> 
<body >  
	<div class="ui-layout-north" style="font-size:13px">
		<div class="ui-layout-east">
			<form class = "yhFormField" id="searchForm" style="font-size:13px">
				<table class="yhFormField-table">
					<tr><td>起始时间</td><td><input type="text" id="startTime" onfocus="WdatePicker({dateFmt:' yyyy-MM-dd HH:mm:ss'})" class="Wdate" style="width:150px"  ></td></tr>
					<tr><td>结束时间</td><td><input type="text" id="endTime" onfocus="WdatePicker({dateFmt:' yyyy-MM-dd HH:mm:ss'})" class="Wdate" style="width:150px"  ></td></tr>
					<tr><td>目标车型：</td>
					<td><input id="pinpai" name="pinpai" placeholder="请选择或输入品牌">
					<input id="type" name="type" placeholder="请选择车辆的型号" readonly="readonly">
					<input id="year" name="year" placeholder="请选择车辆的年数" readonly="readonly"></td>
					</tr>
					<tr><td>目标颜色</td><td><input id="hpys" name="hpys" placeholder="请选择车辆的颜色" readonly="readonly"></td></tr>
					<tr><td>车牌号</td><td><input id="hphm" name="hphm" placeholder="可模糊查询"></td></tr>
				</table>
			</form>
			<div align='center'>
				<input type="button" value="搜索" onclick="doSearch()">
			</div>
			</div>
		</div>
		<div class="ui-layout-north" style="font-size:13px">
		<table class="easyui-datagrid" id="datagrid" title="自定义碰撞结果" > </table>
	</div>
  </body>
</html>
