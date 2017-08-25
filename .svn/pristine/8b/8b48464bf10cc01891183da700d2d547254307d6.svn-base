<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html; charset=utf-8" %>
<html>
  <head>
  <title>初次入城</title>
  <%@include file="/commons/taglibs.jsp" %>
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
  		<script type="text/javascript" src = '${ctx}/app/largeDataHandle/inCityFirstTime.js'></script>
 
</head> 
<body >  
<div class="left" style="width:20%">
<form class = "yhFormField" id="searchForm">
<table class="yhFormField-table">
<div>
<tr><td>起始时间</td><td><input type="text" id="startTime" onfocus="WdatePicker({dateFmt:' yyyy-MM-dd HH:mm:ss'})" class="Wdate" style="width:150px" ></td></tr>
<tr><td>结束时间</td><td><input type="text" id="endTime" onfocus="WdatePicker({dateFmt:' yyyy-MM-dd HH:mm:ss'})" class="Wdate" style="width:150px" ></td></tr>
<tr><td>回溯时长</td><td><input type="text" id="timeLen" placeholder="最多可填365">天</td></tr>
</div>
<tr><td>目标车辆信息</td>
<td>
<input name="type" type="radio" value="byType" checked /><label for="byType">按车型</label>
<input name="type" type="radio" value="byCategory" /><label for="byCategory">按类别</label>
</td></tr>
<tr><td>品牌</td><td><input id="pinpai" name="pinpai" placeholder="请选择或输入品牌"></td></tr>
<tr><td>型号</td><td><input id="type" name="type" placeholder="请选择车辆的型号" readonly="readonly"></td></tr>
<tr><td>年款</td><td><input id="year" name="year" placeholder="请选择车辆的年款" readonly="readonly"></td></tr>
<tr><td>颜色</td><td><input id="hpys" name="hpys" placeholder="请选择车辆的颜色" readonly="readonly"></td></tr>
<tr><td>车牌号</td><td><input id="hphm" name="hphm" placeholder="可模糊查询"></td></tr>
<tr><td>排除车牌</td><td><input id="exHphm" placeholder="请输入车牌号"></td></tr>
</table>
<div align='center'>
<input type="button" value="搜索" onclick="doSearch()">
</div>
</form>
</div>
<div class="right" style="width:80%">
<object data="${ctx}/onLineMapYY.html" style="width:950px; height:600px;overflow:auto"></object>
</div> 
  </body>
</html>
