<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>系统异常</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
  </head>
  
  <body>
  	<center>系统异常，请联系管理员!</center>
  	<% Exception ex = (Exception) request.getAttribute("exception"); %> 
	<a href="javascript: document.getElementById('exception').style.display = 'block';return false;"><h2>Exception: <% ex.getMessage();%></h2></a>
	<p id="exception"> 
		<% ex.printStackTrace(new java.io.PrintWriter(out)); %>
	</p> 
  </body>
</html>
