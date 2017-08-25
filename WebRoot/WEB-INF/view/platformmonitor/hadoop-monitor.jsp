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
			temp=url;
		}

		function onchange2(url){
			document.getElementById("page").src=url;
			document.getElementById("node_hadoop").selectedIndex=0;
			document.getElementById("node_mp").selectedIndex=0;
			temp=url;
		}
		
		function onchange3(url){
			document.getElementById("page").src=url;
			document.getElementById("node_hadoop").selectedIndex=0;
			document.getElementById("node_hbase").selectedIndex=0;
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
    <h3>Hadoop节点监控</h3>
    <br/>
    <div>
    	选择Hadoop节点:
    	<select id="node_hadoop" onchange="onchange1(this.value)">
    		<option></option>
    		<option value="http://10.235.34.50:50070">JP.CLOUD.IVMS.NN1(Name Node 1)</option>
    		<option value="http://10.235.34.51:50070">JP.CLOUD.IVMS.NN2(Name Node 2)</option>
    		
    		<option value="http://10.235.34.52:50075">JP.CLOUD.IVMS.DN1(Data Node 1)</option>
    		<option value="http://10.235.34.53:50075">JP.CLOUD.IVMS.DN2(Data Node 2)</option>
    		<option value="http://10.235.34.54:50075">JP.CLOUD.IVMS.DN3(Data Node 3)</option>
    		<option value="http://10.235.34.55:50075">JP.CLOUD.IVMS.DN4(Data Node 4)</option>
    		<option value="http://10.235.34.56:50075">JP.CLOUD.IVMS.DN5(Data Node 5)</option>
    		<option value="http://10.235.34.57:50075">JP.CLOUD.IVMS.DN6(Data Node 6)</option>
    		<option value="http://10.235.34.58:50075">JP.CLOUD.IVMS.DN7(Data Node 7)</option>
    		<option value="http://10.235.34.59:50075">JP.CLOUD.IVMS.DN8(Data Node 8)</option>
    	</select>
    	<br/>
    	选择MapReduce节点:
    	<select id="node_mp" onchange="onchange3(this.value)">
    		<option></option>
    		<option value="http://10.235.34.50:50031">JP.CLOUD.IVMS.NN1(Job Tracker 1)</option>
    		<option value="http://10.235.34.51:50031">JP.CLOUD.IVMS.NN2(Job Tracker 2)</option>
    		
    		<option value="http://10.235.34.52:50060">JP.CLOUD.IVMS.DN1(Task Tracker 1)</option>
    		<option value="http://10.235.34.53:50060">JP.CLOUD.IVMS.DN2(Task Tracker 2)</option>
    		<option value="http://10.235.34.54:50060">JP.CLOUD.IVMS.DN3(Task Tracker 3)</option>
    		<option value="http://10.235.34.55:50060">JP.CLOUD.IVMS.DN4(Task Tracker 4)</option>
    		<option value="http://10.235.34.56:50060">JP.CLOUD.IVMS.DN5(Task Tracker 5)</option>
    		<option value="http://10.235.34.57:50060">JP.CLOUD.IVMS.DN6(Task Tracker 6)</option>
    		<option value="http://10.235.34.58:50060">JP.CLOUD.IVMS.DN7(Task Tracker 7)</option>
    		<option value="http://10.235.34.59:50060">JP.CLOUD.IVMS.DN8(Task Tracker 8)</option>
    	</select>
    	<br/>
    	选择HBase节点:
    	<select id="node_hbase" onchange="onchange2(this.value)">
    		<option></option>
    		<option value="http://10.235.34.50:60010">JP.CLOUD.IVMS.NN1(HMaster 1)</option>
    		<option value="http://10.235.34.51:60010">JP.CLOUD.IVMS.NN2(HMaster 2)</option>
    		
    		<option value="http://10.235.34.52:60030">JP.CLOUD.IVMS.DN1(RegionServer 1)</option>
    		<option value="http://10.235.34.53:60030">JP.CLOUD.IVMS.DN2(RegionServer 2)</option>
    		<option value="http://10.235.34.54:60030">JP.CLOUD.IVMS.DN3(RegionServer 3)</option>
    		<option value="http://10.235.34.55:60030">JP.CLOUD.IVMS.DN4(RegionServer 4)</option>
    		<option value="http://10.235.34.56:60030">JP.CLOUD.IVMS.DN5(RegionServer 5)</option>
    		<option value="http://10.235.34.57:60030">JP.CLOUD.IVMS.DN6(RegionServer 6)</option>
    		<option value="http://10.235.34.58:60030">JP.CLOUD.IVMS.DN7(RegionServer 7)</option>
    		<option value="http://10.235.34.59:60030">JP.CLOUD.IVMS.DN8(RegionServer 8)</option>
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
