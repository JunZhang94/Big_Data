<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>平台设备监控</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<script type="text/javascript">
		function onchange1(url){
			document.getElementById("page").src=url;
			document.getElementById("node_app").selectedIndex=0;
			temp=url;
		}

		function onchange2(url){
			document.getElementById("page").src=url;
			document.getElementById("node_collect").selectedIndex=0;
			temp=url;
		}

		var temp;
		function reflesh(){
			if(temp){
				document.getElementById("page").src=temp+"?a"+Math.random();
			}
		}
	</script>

  </head>
  
  <body>
    <h3>平台设备监控</h3>
    <br/>
    <div>
    	选择数据接收节点:
    	<select id="node_collect" onchange="onchange1(this.value)">
    		<option></option>
    		<option value="http://10.235.34.60:8088/iVMS_DataStore/system/status.mvc">JP.CLOUD.IVMS.APP1</option>
    		<option value="http://10.235.34.61:8088/iVMS_DataStore/system/status.mvc">JP.CLOUD.IVMS.APP2</option>
    		<option value="http://10.235.34.62:8088/iVMS_DataStore/system/status.mvc">JP.CLOUD.IVMS.APP3</option>
    	</select>
    	
    	选择应用服务器节点:
    	<select id="node_app" onchange="onchange2(this.value)">
    		<option></option>
    		<option value="http://10.235.34.80:1158">数据库服务器</option>
    		<option value="http://10.235.34.81:8161/">MQ服务器</option>
    		<option value="">分析服务器1</option>
    		<option value="">分析服务器2</option>
    		<option value="">分析服务器3</option>
    	</select>
    </div>
    
    <div align="right" style="width: 100%">
    	<input type="button" value="刷新" onclick="reflesh()"/>
    </div>
    
    <br/>
    <div style="width=100%;height=100%">
    	<iframe id="page" src="" style="border: 0" height="100%" width="100%"></iframe>
    </div>
  </body>
</html>
