<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>  
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
response.setHeader("Pragma","no-cache");
response.setHeader("Cache-Control","no-cache");
response.setHeader("Expires","0");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">

		<title>My JSP 'CarTakeQuery.jsp' starting page</title>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">

		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/res/jslib/jquery/jquery-1.10.2.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/res/jslib/jquery/jquery-1.10.2.min.js"></script>
		<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
		<link type="text/css" rel="stylesheet"
			href="${pageContext.request.contextPath}/css/dhtmlgoodies_calendar.css?random=20051112"
			media="screen"></link>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/js/dhtmlgoodies_calendar.js?random=20060118"></script>
	<script type="text/javascript">
		$(function(){
       addHover('mytab');
 		});
		function addHover(tab){
    	$('#'+tab+' tr').hover(
     	  function(){
      	    $(this).find('td').addClass('hover');
     	  },
   		 function(){
    	   $(this).find('td').removeClass('hover');
   		 }
   		 );
 		}
 		function nextPage(){
 			document.getElementById('stopKey').value=null;
 			document.getElementById("form1").submit();
 		}
 		function Pageup(){
 			document.getElementById('lastKey').value=null;
 			document.getElementById("form1").submit();
 		}
 		
 		function queryCars(){
 			document.getElementById('lastKey').value=null;
 			document.getElementById("form1").submit();
 			
 		}
	</script>
	<script type="text/javascript" >    
		$(document).ready( function() {
			if("${querypagesize}"!="0"){
				document.getElementById("pagesize").value = "${querypagesize}";
			}
			if("${theDate1}"!=""){
				document.getElementById("date1").value = "${theDate1}";
			}
			if("${theDate2}"!=""){
				document.getElementById("date2").value = "${theDate2}";
			}
			if("${kkbh}"!=""){
				document.getElementById("kkbh").value = "${kkbh}";
			}
			if("${hphm}"!=""){
				document.getElementById("hphm").value = "${hphm}";
			}
			var arr = "tjcx"+"${radiovalue}";
			if("${radiovalue}"!=""){
				document.getElementById(arr).checked = true;
				if("${radiovalue}"=="1"){
					showIt('sjtext','kkbhtext','hphmtext');
				}else if("${radiovalue}"=="2"){
					showIt('kkbhtext','sjtext','hphmtext');
				}else{
					showIt('hphmtext','sjtext','kkbhtext');
				}
			}
		}); 
		function altRows(id){
			if(document.getElementsByTagName){  
				
				var table = document.getElementById(id);  
				var rows = table.getElementsByTagName("tr"); 
				 
				for(i = 0; i < rows.length; i++){          
					if(i % 2 == 0){
						rows[i].className = "evenrowcolor";
					}else{
						rows[i].className = "oddrowcolor";
					}      
				}
			}
		}
		
		function showIt(id1,id2,id3) {
			document.getElementById(id1).style.display = "";	
			document.getElementById(id2).style.display = "none";	
			document.getElementById(id3).style.display = "none";	
		}
		
 	 </script>
	<style type="text/css">  
		table.imagetable {
		font-family: verdana,arial,sans-serif;
		font-size:11px;
		color:#333333;
		border-width: 1px;
		border-color: #a9c6c9;
		border-collapse: collapse;
		}
		table.imagetable th {
		font-size:14px;
		border-width: 1px;
		padding: 8px;
		border-style: solid;
		border-color: #a9c6c9;
		background-color:#99CCFF;
		}
		table.imagetable td {
		border-width: 1px;
		padding: 8px;
		border-style: solid;
		border-color: #a9c6c9;
		}
		.oddrowcolor{
		background-color:#CCCCCC;
		}
		.evenrowcolor{
		background-color:#FFFFFF;
		}
        .divlabel{
        	border: 1px solid #B1CDE3;  
            background: #fff;  
            font-size:12px;  
            padding: 3px 3px 3px 8px;  
            color: #4f6b72;  
        }  
		td{
 		height:20px;
 		fount-size:20px;
		}
		.headtr {
		 background-image: url(th_bg1.gif);
		 background-repeat::repeat-x;
 		height:30px;
		}
		table.imagetable td,.headtr{
		 border:1px solid #cad9ea;
		 padding:0 1em 0;
		}
		table.imagetable tr{
		 background-color:#f5fafe;
		}
        .hover{
  		 background-color:#FEECAE;
		}
		.title { background: #FFF; border: 1px solid #9DB3C5; padding: 1px; width:90%;margin:20px auto; }
 		.title h1 { line-height: 31px; text-align:center;  background: #2F589C url(th_bg2.gif); 
 			background-repeat: repeat-x; background-position: 0 0; color: #FFF; }
	</style>  

	</head>
	
	<body>
	<div>
		<h1>过车查询</h1>
	</div>
		<form action="temp/act.mvc" method="post" name="queryCarForm" id="form1" >
			<table>
				<tr>
					<td>
<%--					<input type="radio" name="tjcx" value="1" id="tjcx1" checked="checked" onchange="showIt('sjtext','kkbhtext','hphmtext');">指定过车时间段&nbsp;--%>
					<input type="radio" name="tjcx" value="2"  id="tjcx2" checked="checked" onchange="showIt('kkbhtext','sjtext','hphmtext');">指定卡口&nbsp;
					<input type="radio" name="tjcx" value="3"  id="tjcx3"  onchange="showIt('hphmtext','sjtext','kkbhtext');">指定精确车牌号码&nbsp;
<%--					<input type="radio" name="tjcx" value="4"  onclick="showIt('hphmtext','sjtext','kkbhtext');">模糊车牌号码&nbsp;--%>
					</td>
				</tr>
				<tr>
					<td id="sjtext"  style="display:none">
					<label>
					开始时间：
					</label>
					<input type="text" value="2014/01/01 11:11:11" name="theDate1" id="date1" onfocus="WdatePicker({dateFmt:'yyyy/MM/dd HH:mm:ss'})" class="Wdate" style="width:160px"/>
					<label>
					结束时间：
					</label>
					<input type="text"  value="2014/05/01 11:11:11"  name="theDate2" id="date2" onfocus="WdatePicker({dateFmt:'yyyy/MM/dd HH:mm:ss'})" class="Wdate" style="width:160px"/>
					</td>
					<td id="kkbhtext" >
						<label>
						卡口编号：
						</label>
						<input type="text" name="kkbh" id="kkbh" />
					</td>
					<td id="hphmtext" style="display:none">
						<label>
						车牌号码：
						</label>
						<input type="text" name="hphm" id="hphm"/>
					</td>
					<td>
						<input type="hidden" id="lastKey" name="lastKey" value="${lastKey}"/>
						<input type="hidden" id="stopKey" name="stopKey" value="${stopKey}"/>
						<input type="hidden" id="lastKey" name="lastkey" value="${lastkey}"/>
						<input type="hidden" id="hidden" name="pagesizenext" value ="${pagesize}"/>
					</td>
					<td>
						<input type="button" onclick="queryCars();"  value="查询"/>
					</td>
				</tr>
			</table>
			<table width="100%">
			<tr align="right">
				<td width="100%"  align="right">
					<label>
						每页条数：
					</label>
					<select name="pagesize" id="pagesize">
							 <option value="10" selected="selected">10</option>
							 <option value="20">20</option> 
							 <option value="50">50</option> 
							 <option value="100">100</option> 
							 <option value="200">200</option> 
					</select>
					<input type="button" value="下一页" onclick="nextPage();"/>
					<input type="button" value="上一页" onclick="Pageup();"/>
				</td>
			</tr>
		</table>
		<table border="1" cellspacing="1" cellpadding="1" style="border-collapse:collapse" width="100%" id="mytab" class="imagetable">
			<tr class="headtr">
				<th  width="15%">
					车牌号码
				</th>
				<th width="20%">
					经过时间
				</th>
				<th width="20%">
					卡口名称
				</th>
				<th width="15%">
					卡口编号
				</th>
				<th width="30%">
					图片
				</th>
			</tr>
			<c:forEach items="${data}" varStatus="i" var="item" >
			<tr>
				<td>  
               	 ${item.hphm}
            	</td>  
            	<td>  
            		<fmt:formatDate value="${ item.jgsj }"  type="both" dateStyle="default"/>
            	</td>  
            	<td>  
               	 ${item.kkmc}
            	</td>  
            	<td>  
               	 ${item.kkbh}
            	</td>  
            	<td>  
               	 <img src="${item.tx1}">
            	</td>  
			</tr>
			</c:forEach>
		</table>
		<table width="100%">
			<tr align="right">
				<td width="100%"  align="right">
					<input type="button" value="下一页" onclick="nextPage();"/>
				</td>
			</tr>
		</table>
		</form>
	</body>
</html>
