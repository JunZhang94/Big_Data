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
		<title>广州卡口整合平台</title>
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
				if (isSuccess) {
					Map<String, Object> userRecord = new HashMap<String, Object>();
					// 取得用户身份证号，到数据库查询用户信息，放入session中
					request.getSession().setAttribute(AbstractController.SESSION_USER, userRecord);
			%>
			<tr class="listtxt">
				<td colspan="3">
					<a href="${pageContext.request.contextPath}/user/to/main.mvc">3秒跳转到操作界面</a>
				</td>
			</tr>
			<script>
				window.setTimeout(function () {
					window.location = "${pageContext.request.contextPath}/user/to/authlogin.mvc";
				}, 100);
			</script>
			<%
				}
			%>
			
			<%
			if(isSuccess) { 
				Map attributeNodeMap = (Map)request.getAttribute("attributeNodeMap");
				Iterator iter = attributeNodeMap.entrySet().iterator(); 
				
			    while (iter.hasNext()){ 
			    	
			        Map.Entry entry = (Map.Entry) iter.next(); 
			        
			        Object key = entry.getKey(); 
			        String [] keys = null;
			        if(key != null && !key.equals("")){
			        	keys = (String[]) key;
			        	Object val = entry.getValue(); 
			        	request.getSession().setAttribute(key.toString(),val.toString());
			        	if(val !=null ){
			  %>
			  <tr class="listtxt">
					<td width="10%">属性名：</td>
				
			  <%
					if(keys[1]!=null){
			  %>
					<td width="60%"> <%=keys[0] %></td>
					<td width="30%">
					上级机构：<%=keys[1] %>
						</td>
				<%	
						}else{
						%>
						<td colspan="2" width="90%"> <%=keys[0] %></td>
						<%	
						}
						%>
					</tr>
					<tr class="listtxt">
						<td width="10%">属性值：</td>
						<td colspan="2" width="90%" 
						    style="width: 680px; word-wrap: break-word; margin: 5 auto; line-height: 22px;">
						<%=val.toString() %>
						</td>
						 
			 </tr>
			  <%   
			  	if(val.toString().split(",")[0].split(" ").length>1){   
				  	if(val.toString().split(",")[0].split(" ")[1].length()==18){
				  		request.getSession().setAttribute("idCard",val.toString().split(",")[0].split(" ")[1]);
				  		
				  	}
				  	String userName = "";
				  	if(val.toString().split(",")[0].split(" ")[0].split("=")[1] != null && val.toString().split(",")[0].split(" ")[0].split("=")[1] != ""){
				  		userName = val.toString().split(",")[0].split(" ")[0].split("=")[1];
				  		request.getSession().setAttribute("userName", userName);
				  		
				  	}
				  	String[] codes = val.toString().split(",");
			  		String orgCode = codes[6].split("=")[1] + codes[5].split("=")[1] + codes[4].split("=")[1] + codes[3].split("=")[1] + codes[2].split("=")[1] + codes[1].split("=")[1];
			  		request.getSession().setAttribute("orgCode",orgCode);	
			  	}
			        	}
			        }
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
		</table>
	</center>
	</body>
</html>
