<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html; charset=utf-8" %>
<html>
  <head>
  <title>按车型搜车</title>
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
  		<script type="text/javascript" src = '${ctx}/app/eyeSearch/searchByType.js'></script>
 
</head> 
<body >  
<div class="left">
<form class = "yhFormField" id="searchForm">
<table class="yhFormField-table">
<tr><td>数据源</td><td>
<input name="dataSrc" type="radio" value="" checked /><label for="all">全部</label>
<input name="dataSrc" type="radio" value="1" /><label for="kakou">卡口</label>
<input name="dataSrc" type="radio" value="2"  /><label for="dianjing">电警</label>
</td></tr>
<tr><td>品牌</td><td><input type="text" id="pinpai" name="pinpai" readonly="readonly"></td></tr>
<tr><td>型号</td><td><input id="type" readonly="readonly"></td></tr>
<tr><td>年数</td><td><input id="year" readonly="readonly"></td></tr>
<tr><td>车牌颜色</td><td>
<input name="hpys" type="radio" value="lanse" checked /><label for="lanse">蓝牌</label>
<input name="hpys" type="radio" value="huangse" /><label for="huangse">黄牌</label>
<input name="hpys" type="radio" value="heise"  /><label for="heise">黑牌</label>
</td></tr>
<tr><td>
<input name="hpInfor" type="radio" value="chepai" checked /><label for="chepai">车牌</label></td>
<td><input id="hphm" ></td></tr>
<tr><td>
<input name="hpInfor" type="radio" value="wupai" /><label for="wupai">无车牌</label>
</td></tr>
<tr><td>颜色</td><td><input id="ys" ></td></tr>
<tr><td>起始时间</td><td><input type="text" id="startTime" onfocus="WdatePicker({dateFmt:' yyyy-MM-dd HH:mm:ss'})" class="Wdate" style="width:150px" ></td></tr>
<tr><td>结束时间</td><td><input type="text" id="endTime" onfocus="WdatePicker({dateFmt:' yyyy-MM-dd HH:mm:ss'})" class="Wdate" style="width:150px" ></td></tr>
</table>
</form>
<div align='center'>
<input type="button" value="搜索" onclick="doSearch()">
</div>
</div>
<div class="right">
<object data="${ctx}/BigDataMap.html" style="width:950px; height:600px;overflow:auto"></object>
</div> 
  </body>
</html>
