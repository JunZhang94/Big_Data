<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="ui" uri="/WEB-INF/tlds/ui.tld"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>相似车牌串并</title>
	<%@ include file="/global/base-info.jsp" %>
	<script type="text/javascript" src = '${pageContext.request.contextPath}/app/largeDataHandle/similar-licensePlate.js'></script>
</head>
<body class="easyui-layout">
	<div data-options="region:'north',border:false" style="height:60px;background:#B3DFDA;padding:10px">卡口整合项目</div>
	<div data-options="region:'west',split:true,title:'相似车牌串并'" style="width:350px;padding:10px;">
		    <div class="" style="text-align:padding:5px">
		    	<p style="color:gray;">&nbsp;提示：该功能为在同车型下进行相似车牌串并</p>
		    	<table>
		    		<tr>
		    			<td>车牌号</td>
		    			<td>
		    				<input class="easyui-textbox" type="text" name="plate" style="width:150px;"></input>
		    			</td>
		    		</tr>
		    		<tr>
		    			<td>车牌相差</td>
		    			<td>
		    				<input class="easyui-textbox" type="text" name="num" style="width:80px;"></input>
		    				&nbsp;&nbsp;位
		    			</td>
		    		</tr>
		    		<tr>
		    			<td>行车时间&nbsp;&nbsp;</td>
		    			<td>
		    				<input class="easyui-datetimebox" style="width:150px">
		    			</td>
		    		</tr>
		    		<tr>
		    			<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;至</td>
		    			<td>
		    				<input class="easyui-datetimebox" style="width:150px">
		    			</td>
		    		</tr>
		    	</table>
		    </div>
		    <div class="" style="text-align:center;padding:5px">
		    	选择区域（默认为全部区域）
		    	
		    </div>
		    <div class="" style="text-align:padding:5px">
		    	<p>&nbsp;限定车辆信息</p>
		    	<table>
		    		<tr>
		    			<td>品牌&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
		    			<td>
		    				<select id="select_brand" style="width:150px"></select>
							<div id="sp">
								<div style="padding:10px">
									<input type="radio" name="lang" value="1"><span>奥迪</span><br/>
									<input type="radio" name="lang" value="2"><span>别克</span><br/>
									<input type="radio" name="lang" value="3"><span>本田</span><br/>
									<input type="radio" name="lang" value="4"><span>宝马</span><br/>
									<input type="radio" name="lang" value="5"><span>比亚迪</span><br/>
									<input type="radio" name="lang" value="6"><span>奔驰</span><br/>
									<input type="radio" name="lang" value="7"><span>标致</span><br/>
									<input type="radio" name="lang" value="8"><span>大众</span><br/>
									<input type="radio" name="lang" value="9"><span>保时捷</span><br/>
									<input type="radio" name="lang" value="10"><span>法拉利</span>
								</div>
							</div>
		    			</td>
		    		</tr>
		    		<tr>
		    			<td>型号</td>
		    			<td>
		    				<div id="0">
			    				<select class="easyui-combogrid" style="width:150px" readonly="readonly"></select>
			    			</div>
		    				<div id="1" style="display:none;">
		    					<select class="easyui-combogrid" style="width:150px" data-options=
			    				"
										panelWidth: 150,
										multiple: true,
										textField: 'carModel',
										url: '${pageContext.request.contextPath}/app/largeDataHandle/carModel_1_data.json',
										method: 'get',
										columns: [[
											{field:'ck',checkbox:true},
											{field:'carModel',title:'全选',width:100}
										]],
									">
								</select>
		    				</div>
		    				<div id="2" style="display:none;">
		    					<select class="easyui-combogrid" style="width:150px" data-options=
			    				"
										panelWidth: 150,
										multiple: true,
										textField: 'carModel',
										url: '${pageContext.request.contextPath}/app/largeDataHandle/carModel_2_data.json',
										method: 'get',
										columns: [[
											{field:'ck',checkbox:true},
											{field:'carModel',title:'全选',width:100}
										]],
									">
								</select>
		    				</div>
		    				<div id="3" style="display:none;">
		    					<select class="easyui-combogrid" style="width:150px" data-options=
			    				"
										panelWidth: 150,
										multiple: true,
										textField: 'carModel',
										url: '${pageContext.request.contextPath}/app/largeDataHandle/carModel_3_data.json',
										method: 'get',
										columns: [[
											{field:'ck',checkbox:true},
											{field:'carModel',title:'全选',width:100}
										]],
									">
								</select>
		    				</div>
		    				<div id="4" style="display:none;">
		    					<select class="easyui-combogrid" style="width:150px" data-options=
			    				"
										panelWidth: 150,
										multiple: true,
										textField: 'carModel',
										url: '${pageContext.request.contextPath}/app/largeDataHandle/carModel_4_data.json',
										method: 'get',
										columns: [[
											{field:'ck',checkbox:true},
											{field:'carModel',title:'全选',width:100}
										]],
									">
								</select>
		    				</div>
		    				<div id="5" style="display:none;">
		    					<select class="easyui-combogrid" style="width:150px" data-options=
			    				"
										panelWidth: 150,
										multiple: true,
										textField: 'carModel',
										url: '${pageContext.request.contextPath}/app/largeDataHandle/carModel_5_data.json',
										method: 'get',
										columns: [[
											{field:'ck',checkbox:true},
											{field:'carModel',title:'全选',width:100}
										]],
									">
								</select>
		    				</div>
		    				<div id="6" style="display:none;">
		    					<select class="easyui-combogrid" style="width:150px" data-options=
			    				"
										panelWidth: 150,
										multiple: true,
										textField: 'carModel',
										url: '${pageContext.request.contextPath}/app/largeDataHandle/carModel_6_data.json',
										method: 'get',
										columns: [[
											{field:'ck',checkbox:true},
											{field:'carModel',title:'全选',width:100}
										]],
									">
								</select>
		    				</div>
		    				<div id="7" style="display:none;">
		    					<select class="easyui-combogrid" style="width:150px" data-options=
			    				"
										panelWidth: 150,
										multiple: true,
										textField: 'carModel',
										url: '${pageContext.request.contextPath}/app/largeDataHandle/carModel_7_data.json',
										method: 'get',
										columns: [[
											{field:'ck',checkbox:true},
											{field:'carModel',title:'全选',width:100}
										]],
									">
								</select>
		    				</div>
		    				<div id="8" style="display:none;">
		    					<select class="easyui-combogrid" style="width:150px" data-options=
			    				"
										panelWidth: 150,
										multiple: true,
										textField: 'carModel',
										url: '${pageContext.request.contextPath}/app/largeDataHandle/carModel_8_data.json',
										method: 'get',
										columns: [[
											{field:'ck',checkbox:true},
											{field:'carModel',title:'全选',width:100}
										]],
									">
								</select>
		    				</div>
		    				<div id="9" style="display:none;">
		    					<select class="easyui-combogrid" style="width:150px" data-options=
			    				"
										panelWidth: 150,
										multiple: true,
										textField: 'carModel',
										url: '${pageContext.request.contextPath}/app/largeDataHandle/carModel_9_data.json',
										method: 'get',
										columns: [[
											{field:'ck',checkbox:true},
											{field:'carModel',title:'全选',width:100}
										]],
									">
								</select>
		    				</div>
		    				<div id="10" style="display:none;">
		    					<select class="easyui-combogrid" style="width:150px" data-options=
			    				"
										panelWidth: 150,
										multiple: true,
										textField: 'carModel',
										url: '${pageContext.request.contextPath}/app/largeDataHandle/carModel_10_data.json',
										method: 'get',
										columns: [[
											{field:'ck',checkbox:true},
											{field:'carModel',title:'全选',width:100}
										]],
									">
								</select>
		    				</div>
		    			</td>
		    		</tr>
		    		<tr>
		    			<td>年款</td>
		    			<td>
		    				<select class="easyui-combogrid" style="width:150px" data-options="
									panelWidth: 150,
									multiple: true,
									textField: 'carModelYear',
									url: '${pageContext.request.contextPath}/app/largeDataHandle/carModelYear_data.json',
									method: 'get',
									columns: [[
										{field:'ck',checkbox:true},
										{field:'carModelYear',title:'全选',width:100}
									]],
								">
							</select>
		    			</td>
		    		</tr>
		    		<tr>
		    			<td>颜色</td>
		    			<td>
		    				<select class="easyui-combogrid" style="width:150px" data-options="
									panelWidth: 150,
									multiple: true,
									textField: 'carColor',
									url: '${pageContext.request.contextPath}/app/largeDataHandle/carColor_data.json',
									method: 'get',
									columns: [[
										{field:'ck',checkbox:true},
										{field:'carColor',title:'全选',width:100}
									]],
								">
							</select>
		    			</td>
		    		</tr>
		    	</table>
		    </div>
		    <div style="text-align:center;padding:5px">
		    	<a href="#" class="easyui-linkbutton" onclick="SearchForm()">开始分析</a>
		    </div>
	</div>
	<div data-options="region:'south',border:false" style="height:50px;background:#A9FACD;padding:10px;">logo背景</div>
	<div data-options="region:'center',title:'地图'">
		<object data="${ctx}/onLineMapYY.html" style="width:950px; height:600px;overflow:auto"></object>
	</div>
</body>
</html>