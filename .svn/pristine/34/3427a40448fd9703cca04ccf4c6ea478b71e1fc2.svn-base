<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="ui" uri="/WEB-INF/tlds/ui.tld"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "
http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'dateJsp.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<%@ include file="/global/base-lib.jsp" %>
	<!-- 所需js包 -->
	<script type="text/javascript"	src="${pageContext.request.contextPath}/js/toolBox.js"></script>
	<script type="text/javascript"	src="${pageContext.request.contextPath}/js/My97DatePicker/WdatePicker.js"></script>
	<script>
		function testDownLoad() {
			Ext.Ajax.request({
				// 将id组合成字符串传递到后台
				url : rootpath +'/testData/downLoadUrlImage.mvc',
				method : 'POST',
				params : {},
				success : function(resp, opts) {
					alert("success");
				},
				failure : function(resp, opts) {
					alert("failure");
				}
			});
		}
	</script>
  </head>
  
  <body>
    This is my JSP page. <br>
    <input id="d11" type="text" onClick="WdatePicker()"/> <br>
    <input id="d12" type="text"/>
	<img onclick="WdatePicker({el:'d12'})" src="${pageContext.request.contextPath}/js/My97DatePicker/skin/datePicker.gif" width="16" height="22" align="absmiddle">
    
    <input type="button" value="图片" onclick="testDownLoad()"/>
  </body>
</html>
