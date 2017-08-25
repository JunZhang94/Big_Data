<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@page import="com.jp.tic.framework.controller.AbstractController"%>
<%
	String successStr = (String) request.getAttribute("isSuccess");
	boolean isSuccess = false;
	if (successStr != null && !successStr.equals("")) {
		isSuccess = Boolean.valueOf(successStr).booleanValue();
	}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>乌鲁木齐卡口整合平台</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta content="IE=EmulateIE7" http-equiv="X-UA-Compatible" />
		<meta content="IE=7" http-equiv="X-UA-Compatible" />
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
		<style type="text/css">
			.bodytxt {height:25px;font-size: 12px;text-decoration: none;background-color:#DBE5D1;padding-left: 6px;}
			.bodynotxt {height:25px;font-size: 12px;text-decoration: none;}
			.menutxt {font-size: 14px;text-decoration: none;font-weight: normal;padding-right: 0px;padding-left: 0px;padding-top: 8px;padding-bottom: 0px;}
			.menu2txt{
				height:25;
				font-size:12px;
				font-weight: bold;
				text-decoration: none;
			}
			.listtxt {height:25px;font-size: 12px;padding-left: 6px;background-color:#DBE5D1;}
			.listmenutxt {height:25px;font-size: 12px;padding-left: 6px;background-color:#BED1AC;}
			.listnotxt {height:25px;font-size: 12px;background-color:#DBE5D1;}
			a:link {color:#6D8258;font-weight: bold;text-decoration: none;}
			a:hover {color: #FF0000;font-weight: bold;text-decoration: none;}
			a:active {color:#FF7800;text-decoration: none;font-weight: bold;}
			a:visited {color:#435B2C;font-weight: bold;text-decoration: none;}
		</style>
	</head>
	
	<body topmargin="0" leftmargin="0">
		<center>
		<table width="70%" border="0" cellpadding="0" cellspacing="1" bgcolor="#7D8873">
			<tr><td class="listmenutxt" colspan="3">结果</td></tr>
			<tr class="listtxt">
				<td width="10%">身份认证：</td>
				<td width="90%" colspan="2"><%=isSuccess ? "成功" : "失败" %></td>
			</tr>
			<%
			if(isSuccess) { 
				Map attributeNodeMap = (Map)request.getAttribute("attributeNodeMap");
				request.getSession().setAttribute("idCard",attributeNodeMap.get("idCard"));
				//request.getSession().setAttribute("idCard","223134534454354345");
				request.getSession().setAttribute("userName","超级管理员");
				//request.getSession().setAttribute("hehe","");
				Iterator entries = attributeNodeMap.entrySet().iterator();
				while (entries.hasNext()) {
				    Map.Entry entry = (Map.Entry) entries.next();
 			  %>
				<tr class="listtxt">
					<td width="10%"><%=entry.getKey()%>：</td>
					<td colspan="2" width="90%" 
					    style="width: 680px; word-wrap: break-word; margin: 5 auto; line-height: 22px;">
					<%=entry.getValue()%>
					</td>
			 	</tr>
			  <%  
			  	} 
			  } else {
				String errCode = (String)request.getAttribute("errCode");
				String errDesc = (String)request.getAttribute("errDesc");
				if(errCode!=null&&!errCode.equals("")) {%>
					<tr class="listtxt">
						<td>错误码：</td>
						<td><%=errCode%></td>
					</tr>
				<%} if(errDesc!=null&&!errDesc.equals("")) {%>
					<tr class="listtxt">
						<td>错误描述：</td>
						<td><%=errDesc%></td>
					</tr>
			<%	}
			} 
			%>
			<tr class="listtxt">
				<td colspan="3">
					<a href="${pageContext.request.contextPath}/user/to/authlogin.mvc">3秒跳转到操作界面</a>
				</td>
			</tr>
			<script>
				window.setTimeout(function () {
					window.location = "${pageContext.request.contextPath}/user/to/authlogin.mvc";
				}, 0);
			</script>
		</table>
	</center>
	</body>
</html>
