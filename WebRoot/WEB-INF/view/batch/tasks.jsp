<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>Hadoop节点监控</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<script type="text/javascript">
		function onchange1(url){
			document.getElementById("page").src=url;
			document.getElementById("node_hbase").selectedIndex=0;
			document.getElementById("node_mp").selectedIndex=0;
		}

		function onchange2(url){
			document.getElementById("page").src=url;
			document.getElementById("node_hadoop").selectedIndex=0;
			document.getElementById("node_mp").selectedIndex=0;
		}
		function onchange3(url){
			document.getElementById("page").src=url;
			document.getElementById("node_hadoop").selectedIndex=0;
			document.getElementById("node_hbase").selectedIndex=0;
		}
	</script>

  </head>
  
  <body>
    <h3>Hadoop节点监控</h3>
    <br/>
    <div>
    	选择Hadoop节点:
    	<select id="node_hadoop" onchange="onchange1(this.value)">
    		<option></option>
    		<option value="http://10.235.34.50:50070">JP.CLOUD.IVMS.NN1(Nod)</option>
    		<option value="http://10.235.34.51:50070">JP.CLOUD.IVMS.NN2</option>
    		
    		<option value="http://10.235.34.52:50075">JP.CLOUD.IVMS.DN1</option>
    		<option value="http://10.235.34.53:50075">JP.CLOUD.IVMS.DN2</option>
    		<option value="http://10.235.34.54:50075">JP.CLOUD.IVMS.DN3</option>
    		<option value="http://10.235.34.55:50075">JP.CLOUD.IVMS.DN4</option>
    		<option value="http://10.235.34.56:50075">JP.CLOUD.IVMS.DN5</option>
    		<option value="http://10.235.34.57:50075">JP.CLOUD.IVMS.DN6</option>
    		<option value="http://10.235.34.58:50075">JP.CLOUD.IVMS.DN7</option>
    		<option value="http://10.235.34.59:50075">JP.CLOUD.IVMS.DN8</option>
    	</select>
    	选择MapReduce节点:
    	<select id="node_mp" onchange="onchange3(this.value)">
    		<option></option>
    		<option value="http://10.235.34.50:50031">JP.CLOUD.IVMS.NN1</option>
    		<option value="http://10.235.34.51:50031">JP.CLOUD.IVMS.NN2</option>
    		
    		<option value="http://10.235.34.52:50060">JP.CLOUD.IVMS.DN1</option>
    		<option value="http://10.235.34.53:50060">JP.CLOUD.IVMS.DN2</option>
    		<option value="http://10.235.34.54:50060">JP.CLOUD.IVMS.DN3</option>
    		<option value="http://10.235.34.55:50060">JP.CLOUD.IVMS.DN4</option>
    		<option value="http://10.235.34.56:50060">JP.CLOUD.IVMS.DN5</option>
    		<option value="http://10.235.34.57:50060">JP.CLOUD.IVMS.DN6</option>
    		<option value="http://10.235.34.58:50060">JP.CLOUD.IVMS.DN7</option>
    		<option value="http://10.235.34.59:50060">JP.CLOUD.IVMS.DN8</option>
    	</select>
    	选择HBase节点:
    	<select id="node_hbase" onchange="onchange2(this.value)">
    		<option></option>
    		<option value="http://10.235.34.50:60010">JP.CLOUD.IVMS.NN1</option>
    		<option value="http://10.235.34.51:60010">JP.CLOUD.IVMS.NN2</option>
    		
    		<option value="http://10.235.34.52:60030">JP.CLOUD.IVMS.DN1</option>
    		<option value="http://10.235.34.53:60030">JP.CLOUD.IVMS.DN2</option>
    		<option value="http://10.235.34.54:60030">JP.CLOUD.IVMS.DN3</option>
    		<option value="http://10.235.34.55:60030">JP.CLOUD.IVMS.DN4</option>
    		<option value="http://10.235.34.56:60030">JP.CLOUD.IVMS.DN5</option>
    		<option value="http://10.235.34.57:60030">JP.CLOUD.IVMS.DN6</option>
    		<option value="http://10.235.34.58:60030">JP.CLOUD.IVMS.DN7</option>
    		<option value="http://10.235.34.59:60030">JP.CLOUD.IVMS.DN8</option>
    	</select>
    </div>
    <br/>
    <div style="width=100%;height=100%">
    	<iframe id="page" src="" style="border: 0" height="100%" width="100%"></iframe>
    </div>
  </body>
</html>
