<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/tags/jstl-lib.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<style>
		</style>
		<title>车辆查询</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
    	<link href="${pageContext.request.contextPath }/res/css/global.car.css" rel="stylesheet" type="text/css" />
		<link href="${pageContext.request.contextPath }/res/css/main.car.css" rel="stylesheet" type="text/css" />
    	<%@ include file="/tags/jquery-lib.jsp"%>
    	<%@ include file="/tags/date.picker-lib.jsp"%>
		<script type="text/javascript">
			$(function () {
				$(".submit").click(function () {
					$("form:eq(0)").submit();
				});
				
				$("#dept").val("${param.dept}");
				$("#mount").val("${param.mount}");
				
				if (!!"${param.pageSize}") {
					$("#pageSize").val("${param.pageSize}");
				}
				
				$("#dept").change(function () {
					$("#mount option").remove();
					
					var $mount = $("#mount");
					$mount.append('<option value="">请选择卡口</option>');
					
					if (!!$(this).val()) {
						var url = "${pageContext.request.contextPath}/car/cascade.mvc?code=" + $(this).val();
						$.post(url, {"type": "MOUNT"}, function (data) {
							$.each(data, function (i, item) {
								$mount.append("<option value='" + item.kkbh + "'>" + item.kkmc + "</option>");
							});
						});
					}
				});
			});
			
			var submitForm = function () {
				$("form:eq(0)").submit();
			};
			
			var next = function (rowkey) {
				$(":input[name='startKey']:eq(0)").val(rowkey);
				submitForm();
			};
		</script>
	</head>
	<body>
		<div class="content-box" style="*width: 96.2%;">
			<h2 style="*width: 104%; display: none;"><span>车辆模糊查询</span></h2>
			<div class="text-area" style="*min-height: 460px; *height: 460px; *width: 100%;">
			    <div class="toolbar" style="*width: 104%; display: none;">
				    <input id="search" type="image" src="${pageContext.request.contextPath}/res/img/search_menu.png" style="float: right;"/>
				    <span >模糊搜索</span>
				</div>
			    <form id="search_from" action="${pageContext.request.contextPath}/car/query.mvc?search=true" method="post">
			    	<table class="search" style="*width: 104%; display: block;">
			    		<tr style="height:30px;">
			    			<td align="right" class="td-label">部门单位：</td>
			    			<td>
			    				<select id="dept" name="dept" style="width: 210px;">
			    					<option value="">请选择部门单位</option>
			    					<c:forEach items="${depts}" var="item">
			    						<option value="${item.dwbh }">${item.dwmc }</option>
			    					</c:forEach>
			    				</select>
			    			</td>
			    			<td align="right" class="td-label">卡口：</td>
			    			<td colspan="3">
			    				<select id="mount" name="mount" style="width: 475px;">
			    					<option value="">请选择卡口</option>
			    					<c:forEach items="${mounts}" var="item">
			    						<option value="${item.kkbh }">${item.kkmc }</option>
			    					</c:forEach>
			    				</select>
			    			</td>
			    		</tr>
			    		<tr style="height:30px;">
			    			<td align="right" class="td-label">车牌号码：</td>
			    			<td><input class="input_text" name="plateNo" value="${param.plateNo }"/></td>
			    			<td align="right" class="td-label">开始时间：</td>
			    			<td>
			    				<input id="startDate" type="text" name="startDate" value="${param.startDate==null ? queryParam.startDate : param.startDate}" class="Wdate"
			    					onclick="WdatePicker({skin:'whyGreen',minDate:'2000-01-01',dateFmt:'yyyy-MM-dd HH:mm:ss'})" 
			    					style="width: 153px;" maxlength="20" readonly="true"/>
			    			</td>
			    			<td align="right" class="td-label">结束时间：</td>
			    			<td>
			    				<input id="endDate" type="text" name="endDate" value="${param.endDate==null ? queryParam.endDate : param.endDate }" class="Wdate"
			    					onclick="WdatePicker({skin:'whyGreen', minDate:'2000-01-01',dateFmt:'yyyy-MM-dd HH:mm:ss'})" 
			    					style="width: 153px;" maxlength="20" readonly="true"/>
			    			</td>
			    		</tr>
			    		
			    		<tr style="height:40px;">
			    			<td align="right" colspan="5">
							</td>							
			    			<td align="right">
				    			<img src="${pageContext.request.contextPath}/res/img/search_menu.png" class="submit" />&nbsp;&nbsp;&nbsp;&nbsp;
								<img src="${pageContext.request.contextPath}/res/img/cz_menu.png" onclick="search_from.reset()" style="cursor:hand"/>
							</td>							
			    		</tr>
			    	</table>
					<div style="margin-top: 5px;"></div>
				    <table class="tab">    	
				    	<thead>
				    		<tr align="center" style="background: none repeat-x;height:23px; line-height:23px;">
				    			<th>序号</th>
				    			
				    			<th>车牌号码</th>
				    			<th>号牌颜色</th>
							<!--<th>车辆速度</th>-->
                                                        <!--   
				    			<th>号牌种类</th>
				    			-->
				    			<th>卡口名称</th>
				    			
				    			<th>过车时间</th>
				    			<th>单位名称</th>
				    		</tr>
				    	</thead>
				    	<tbody>
				    		<c:forEach items="${data}" var="item" varStatus="st">
				    			<tr class="pro" style="background-color: ${(st.index % 2 == 0) ? '#f4f4f4' : '#fff'}" img="${item.tx1 }" val="${item }">
				    				<td align="center">${st.index + 1 }</td> 		
				    			   
				    				<td align="center">${item.hphm }</td>
					    			<td align="center">${item.hpys2 }</td>
					    		<!--	<td align="center">${item.clsd }km/h</td> -->
				    			<!--
                 						<td align="center">${item.hpzl2 }</td>
				    			-->	
					    			<td align="center">${item.kkmc }</td>					    			
					    			
					    			<td align="center"><fm:formatDate value="${item.jgsj}" pattern="yyyy-MM-dd HH:mm:ss"/></td>	
					    			<td align="center">${item.dwmc }</td>
					    			
					    			
				       			</tr>
				       		</c:forEach>	
				    	</tbody>
				    </table>
				
					<div style="text-align: center;">
					   	<a href="javascript: submitForm(null, '${pageContext.request.contextPath}/homepage/products.mvc?pageNo=');">上一页</a>
					   	<input type="hidden" name="startKey" />
					    <a href="javascript: next('${lastKey }')">下一页</a>    	
					    &nbsp;&nbsp;&nbsp;&nbsp;
					   	 每页显示 
					   	<select onchange="submitForm()" id="pageSize" name="pageSize" style="width: 60px;">
							<option value="10">10</option>
							<option value="20" selected="selected">20</option>
							<option value="50">50</option>
							<option value="100">100</option>
						</select>条
				    </div>
			    </form>
			</div>
		</div>
	</body>
</html>
