<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>服务状态</title>
    
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
    <h3>服务状态</h3>
    
    <div align="right" style="width: 100%">
    	<input type="button" value="刷新"/>
    </div>
    
    <br/>
    <h3>HDFS集群状态</h3>
    <br/>
    <div>
    	<table class="tab" width="600">  	
	    	<thead>
	    		<tr align="center" style="background: none repeat-x;height:23px; line-height:23px;">
	    			<th>IP</th>
	    			<th>Name</th>
	    			<th>Status</th>
	    			<th>Log</th>
	    		</tr>
	    	</thead>
	    	<tbody>
	    		<c:forEach items="${ips}" var="m" varStatus="st">
	    			<tr class="pro" style="background-color: ${(st.index % 2 == 0) ? '#f4f4f4' : '#fff'}">
	    				<td align="center">${m.key}</td> 		
	    				<td align="center">
	    					<c:forEach items="${m.value}" var="item" varStatus="st2">
							    ${(st2.index == 0) ? ' ' : ','}<c:out value="${item}" />
							</c:forEach>
	    				</td>
	       			</tr>
	       		</c:forEach>	
	    	</tbody>
	    </table>
    </div>
    
    <br/>
    <h3>MP集群状态</h3>
    <br/>
    <div>
    	<table class="tab" width="600">  	
	    	<thead>
	    		<tr align="center" style="background: none repeat-x;height:23px; line-height:23px;">
	    			<th>子平台编码</th>
	    			<th>接收IP列表</th>
	    		</tr>
	    	</thead>
	    	<tbody>
	    		<c:forEach items="${ips}" var="m" varStatus="st">
	    			<tr class="pro" style="background-color: ${(st.index % 2 == 0) ? '#f4f4f4' : '#fff'}">
	    				<td align="center">${m.key}</td> 		
	    				<td align="center">
	    					<c:forEach items="${m.value}" var="item" varStatus="st2">
							    ${(st2.index == 0) ? ' ' : ','}<c:out value="${item}" />
							</c:forEach>
	    				</td>
	       			</tr>
	       		</c:forEach>	
	    	</tbody>
	    </table>
    </div>
    
    <br/>
    <h3>HBase集群状态</h3>
    <br/>
    <div>
    	<table class="tab" width="600">  	
	    	<thead>
	    		<tr align="center" style="background: none repeat-x;height:23px; line-height:23px;">
	    			<th>子平台编码</th>
	    			<th>接收IP列表</th>
	    		</tr>
	    	</thead>
	    	<tbody>
	    		<c:forEach items="${ips}" var="m" varStatus="st">
	    			<tr class="pro" style="background-color: ${(st.index % 2 == 0) ? '#f4f4f4' : '#fff'}">
	    				<td align="center">${m.key}</td> 		
	    				<td align="center">
	    					<c:forEach items="${m.value}" var="item" varStatus="st2">
							    ${(st2.index == 0) ? ' ' : ','}<c:out value="${item}" />
							</c:forEach>
	    				</td>
	       			</tr>
	       		</c:forEach>	
	    	</tbody>
	    </table>
    </div>
  </body>
</html>
