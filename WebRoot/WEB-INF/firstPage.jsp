<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="java.util.*"%>
<%@ taglib prefix="ui" uri="/WEB-INF/tlds/ui.tld"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
    Map<String, Object> user = (Map<String, Object>) request.getSession().getAttribute("userInfo");
    String userCode = (user.get("USER_CODE") == null || user.get("USER_CODE") == "")?"" : user.get("USER_CODE").toString();
    String userName = (user.get("USER_NAME") == null || user.get("USER_NAME") == "")?"" : user.get("USER_NAME").toString();
%>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>首页</title>
	<%@ include file="/global/base-info.jsp" %>
	<%@ include file="/global/base-lib.jsp" %>
	<%@ include file="/tags/mq-lib.jsp" %>
	<script type="text/javascript"	src="${pageContext.request.contextPath}/js/toolBox.js"></script>
	<!-- <script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/alarm/realTimeAlarm.js"></script> -->
	<script>
	var historyFlag = '${historyFlag}';
	var datas;
	var currentPage = "";
	$(document).ready(function() {
	   var url = '';
	   $('a').hover(function(){
		   var sourceImg = $(this).children("img").attr("src");
		   if(sourceImg != undefined){
		   		var hoverImg = sourceImg.replace("_A", "_B");
		   		$(this).children("img").attr("src",hoverImg); 
		   }
	   },function(){
		   var sourceImg = $(this).children("img").attr("src");
		   if(sourceImg != undefined){
		   		var hoverImg = sourceImg.replace("_B", "_A");
		   		$(this).children("img").attr("src",hoverImg); 
		   }
	   });
	   $('#userInfo').hover(function(){
		   $(this).removeClass('user-name').addClass('user-name-hover');
	   },function(){
		   $(this).removeClass('user-name-hover').addClass('user-name');
	   });
	   $('#exitInfo').hover(function(){
		   $(this).removeClass('exit-system').addClass('exit-system-hover');
	   },function(){
		   $(this).removeClass('exit-system-hover').addClass('exit-system');
	   });
	   $('#userInfo').tooltip({
			content: function() {
					return '<%= userName %>';
	  	 	}
	   });
	   $.ajax({ 
			url: rootpath + "/user/findActions.mvc", 
			data:{},
			success: function(data){
				datas = data.data;
				/*if (data != null) {
					$("a").each(function() {
						var htmlId = $(this).attr("id");
						for (var i = 0; i < datas.length; i++) {
							if (htmlId == datas.TYPE) {
								//window.open(rootpath + url);
								//$(this)
							}
						}
					}) 
				} */
     		}
     	});
     	//布控告警开启的MQ监听
 		//monitoryData();
	});
	
	//定义菜单的数组  分别代表：车辆查询(A 0)、分析研判(B 1)、布控告警(D 4)、卡口设备管理(C 3)、系统管理(F 5)、平台监控管理(E 6)
	var menuArray = new Array(6);
	menuArray[0] = [['历史过车'],['实时过车'],['车辆库'],['无车牌查询'],['假牌车查询'],['GIS管理'],['落脚点分析'],['类别查询'],['按品牌查询'],['相似车辆串并'],['车辆特征筛选'],['车流量统计']];
	menuArray[1] = [['临近点分析'], ['跟随车分析'], ['套牌车分析'], ['车辆汇聚'], ['区域碰撞'], ['车辆频度'], ['分析任务'],['初次入城'],['匿名车辆'],['一牌多车'],['一车多牌'],['遮挡面部检测'],['时间比对']];
	menuArray[2] = [['布控查询'], ['布控审核'], ['布控撤销'], ['撤控审核'], ['告警查询']];
	menuArray[3] = [['故障告警'], ['供应商管理'], ['卡口设备'], ['卡口审核'], ['故障统计'], ['巡检统计'], ['故障登记'], ['故障确认'], ['故障处理']];
	menuArray[4] = [['角色管理'],['用户管理'],['系统管理'],['字典管理'],['日志管理']];
	menuArray[5] = [['集群状态'],['节点监控'],['负载均衡'],['平台节点'],['服务器监控']];
	
	function forwardPage(value) {
		var valueTemp1 = value.substring(0,1);
		var valueTemp2 = value.substring(1,3);
		if(valueTemp1 =="A"){
			currentPage = "<span style='font-size:18px;color:#FFFFFF;'>车辆查询&nbsp>&nbsp</span><a href='#' style='font-size:16px;color: #FFFFFF;text-decoration:none;' onclick='currentPages()'>"+menuArray[0][valueTemp2-1]+"</a>";
		}else if(valueTemp1 =="B"){
			currentPage = "<span style='font-size:18px;color:#FFFFFF;'>分析研判&nbsp>&nbsp</span><a href='#' style='font-size:16px;color: #FFFFFF;text-decoration:none;' onclick='currentPages()'>"+menuArray[1][valueTemp2-1]+"</a>";
		}else if(valueTemp1 =="C"){-1
			currentPage = "<span style='font-size:18px;color:#FFFFFF;'>卡口设备管理&nbsp>&nbsp</span><a href='#' style='font-size:16px;color: #FFFFFF;text-decoration:none;' onclick='currentPages()'>"+menuArray[3][valueTemp2-1]+"</a>";
		}else if(valueTemp1 =="D"){
			currentPage = "<span style='font-size:18px;color:#FFFFFF;'>布控告警&nbsp>&nbsp</span><a href='#' style='font-size:16px;color: #FFFFFF;text-decoration:none;' onclick='currentPages()'>"+menuArray[2][valueTemp2-1]+"</a>";
		}else if(valueTemp1 =="E"){
			currentPage = "<span style='font-size:18px;color:#FFFFFF;'>平台监控管理&nbsp>&nbsp</span><a href='#' style='font-size:16px;color: #FFFFFF;text-decoration:none;' onclick='currentPages()'>"+menuArray[5][valueTemp2-1]+"</a>";
		}else if(valueTemp1 =="F"){
			currentPage = "<span style='font-size:18px;color:#FFFFFF;'>系统管理&nbsp>&nbsp</span><a href='#' style='font-size:16px;color: #FFFFFF;text-decoration:none;' onclick='currentPages()'>"+menuArray[4][valueTemp2-1]+"</a>";
		}
		var url = '';
		var title = '';
		if (datas != null) {
			for (var i = 0; i < datas.length; i++) {
				if (datas[i].TYPE == value) {
					title = datas[i].NAME;
					if (datas[i].OPEN_TYPE == 'html') {
						url = datas[i].URL;
					} else {
						url = rootpath + "/" + datas[i].URL;
					}
				}
			}
		}
		//this.location.href = rootpath + "/user/toMainInfo.mvc?urlStr=" + url + "&title=" + encodeURI(title) + "&historyFlag=" + historyFlag;
		var win = window.open(rootpath + "/user/toMainInfo.mvc");
		var bodyText = '<html><body>';  
		bodyText = '<form action="' + rootpath + '/user/toMainInfo.mvc" method="post">';  
		bodyText += '<input type="hidden" name="urlStr" value="'+ url +'" />';  
		bodyText += '<input type="hidden" name="title" value="'+ title +'" />';  
		bodyText += '<input type="hidden" name="historyFlag" value="'+ historyFlag +'" />';  
		bodyText += '</form></body></html>';  
		win.document.write(bodyText);  
		win.document.forms[0].submit(); //打开url新页面，然后直接post提交form，并且传递参数  
		win.focus();
	}
	
	function forwarAlarm(){
		var url=rootpath +"/deviceinfo/toRealTimeAlarm.mvc";
		var title="实时告警信息管理";
		//window.open(rootpath + "/user/toMainInfo.mvc?urlStr=" + url + "&title=" + title);
		this.location.href = rootpath + "/user/toMainInfo.mvc?urlStr=" + url + "&title=" + encodeURI(title) + "&historyFlag=" + historyFlag;
		/*var win = window.open(rootpath + "/user/toMainInfo.mvc");
		var bodyText = '<html><body>';  
		bodyText = '<form action="' + rootpath + '/user/toMainInfo.mvc" method="post">';  
		bodyText += '<input type="hidden" name="urlStr" value="'+ url +'" />';  
		bodyText += '<input type="hidden" name="title" value="'+ title +'" />';  
		bodyText += '<input type="hidden" name="historyFlag" value="'+ historyFlag +'" />';  
		bodyText += '</form></body></html>';  
		win.document.write(bodyText);  
		win.document.forms[0].submit(); //打开url新页面，然后直接post提交form，并且传递参数  
		win.focus();*/
	}
	function setAlarmNum(alarmNum){
		var contentText=document.getElementById("aIndex").innerHTML;
		document.getElementById("aIndex").innerHTML="实时告警汇总："+alarmNum;
	}
	function getAlarmNum(){alert("getAlarmNum");
		var contentText=document.getElementById("aIndex").innerHTML;
		var alarmNum=contentText.split("：")[1];
		return alarmNum;
	}

	//功能导航菜单
	function geoGPS(flag) {
		if (flag == 'firstPage') {
			$('#first').css("display","block");
			$('#search').css("display","none");
			$('#analyze').css("display","none");
			$('#control').css("display","none");
			$('#mounts').css("display","none");
			$('#systems').css("display","none");
			$('#monitor').css("display","none");
		}
		if (flag == 'searchPage') {
			$('#first').css("display","none");
			$('#search').css("display","block");
			$('#analyze').css("display","none");
			$('#control').css("display","none");
			$('#mounts').css("display","none");
			$('#systems').css("display","none");
			$('#monitor').css("display","none");
		}
		if (flag == 'analyzePage') {
			$('#first').css("display","none");
			$('#search').css("display","none");
			$('#analyze').css("display","block");
			$('#control').css("display","none");
			$('#mounts').css("display","none");
			$('#systems').css("display","none");
			$('#monitor').css("display","none");
		}
		if (flag == 'controlPage') {
			$('#first').css("display","none");
			$('#search').css("display","none");
			$('#analyze').css("display","none");
			$('#control').css("display","block");
			$('#mounts').css("display","none");
			$('#systems').css("display","none");
			$('#monitor').css("display","none");
		}
		if (flag == 'mountsPage') {
			$('#first').css("display","none");
			$('#search').css("display","none");
			$('#analyze').css("display","none");
			$('#control').css("display","none");
			$('#mounts').css("display","block");
			$('#systems').css("display","none");
			$('#monitor').css("display","none");
		}
		if (flag == 'systemsPage') {
			$('#first').css("display","none");
			$('#search').css("display","none");
			$('#analyze').css("display","none");
			$('#control').css("display","none");
			$('#mounts').css("display","none");
			$('#systems').css("display","block");
			$('#monitor').css("display","none");
		}
		if (flag == 'monitorPage') {
			$('#first').css("display","none");
			$('#search').css("display","none");
			$('#analyze').css("display","none");
			$('#control').css("display","none");
			$('#mounts').css("display","none");
			$('#systems').css("display","none");
			$('#monitor').css("display","block");
		}
	}
	</script>
	<style type="text/css">
    .picBut:hover { 
		/* background-color : yellow; */
		onmouseover:this.style.cursor='hand';
	}
	.pagePig { 
		height:122px;
		background: url(${pageContext.request.contextPath}/images/main_top.png) no-repeat;
		background-size:100% 100%; 
		padding:10px;
		overflow:hidden;
	}
	.headerInfo{
	    padding-left:25px;height:35px;width:63px;line-height:26px;margin-left:20px;float:left;
	    font-size: 15px;
	    font-weight: bold;
	}
	.exit-system{
	    background:url(${pageContext.request.contextPath}/images/btnQuit_a.png) no-repeat;
	}
	.exit-system-hover{
	    background:url(${pageContext.request.contextPath}/images/btnQuit_b.png) no-repeat;
	}
	.user-name{
	    background:url(${pageContext.request.contextPath}/images/btnUser_a.png) no-repeat;
	}
	.user-name-hover{
	    background:url(${pageContext.request.contextPath}/images/btnUser_b.png) no-repeat;
	}
    </style>
</head>
<body class="easyui-layout">
	<div class="pagePig" data-options="region:'north',border:false">
		<div style="float:right;height:68px;margin-right: 15px;color:#ffffff;">
            <ul style="list-style: none;margin-top:5px;">
                <li style="text-align:right;">
                    <ul style="list-style: none;height:32px;">
                        <li id="userInfo" class="headerInfo user-name" style="cursor:default;"></li>
                        <li id="exitInfo" class="titleInfo headerInfo exit-system" onclick="document.location.href='${pageContext.request.contextPath }/user/to/login.mvc';" style="cursor:pointer;"></li>
                    </ul>
                </li>
            </ul>
        </div>
		<div style="text-align: center;">
			<div style="align:center;margin-top:80px;">
				<table style="margin:auto;">
					<tr>
						<td class="menuBtn">
							<a href="#" onclick="geoGPS('firstPage')" hidefocus="true" style="color:#000; text-decoration:none;"><img src="${pageContext.request.contextPath}/images/menu1_A.png" style="border:0"/></a>
						</td>
						<td class="menuBtn">
							<a href="#" onclick="geoGPS('searchPage')" hidefocus="true" style="color:#000; text-decoration:none;"><img src="${pageContext.request.contextPath}/images/menu2_A.png" style="border:0"/></a>
						</td>
						<td class="menuBtn">
							<a href="#" onclick="geoGPS('analyzePage')" hidefocus="true" style="color:#000; text-decoration:none;"><img src="${pageContext.request.contextPath}/images/menu3_A.png" style="border:0"/></a>
						</td>
						<td class="menuBtn">
							<a href="#" onclick="geoGPS('controlPage')" hidefocus="true" style="color:#000; text-decoration:none;"><img src="${pageContext.request.contextPath}/images/menu4_A.png" style="border:0"/></a>
						</td>
						<!--  屏蔽卡口设备管理
						<td class="menuBtn">
							<a href="#" onclick="geoGPS('mountsPage')" hidefocus="true" style="color:#000; text-decoration:none;"><img src="${pageContext.request.contextPath}/images/menu5_A.png" style="border:0"/></a>
						</td>
						-->
						<!-- 
						<td class="menuBtn">
							<a href="#" onclick="geoGPS('dataPage')" style="color:#000; text-decoration:none;"><img src="${pageContext.request.contextPath}/images/menu_6a.png" style="border:0"/></a>
						</td>
						 -->
						<td class="menuBtn">
							<a href="#" onclick="geoGPS('systemsPage')" hidefocus="true" style="color:#000; text-decoration:none;"><img src="${pageContext.request.contextPath}/images/menu7_A.png" style="border:0"/></a>
						</td>
						<td class="menuBtn">
							<a href="#" onclick="geoGPS('monitorPage')" hidefocus="true" style="color:#000; text-decoration:none;"><img src="${pageContext.request.contextPath}/images/menu8_A.png" style="border:0"/></a>
						</td>
						<td class="menuBtn">
							<!--  <MARQUEE id='AlarmInfor' scrollAmount=2 behavior=alternate onmouseover=this.stop() onmouseout=this.start()><a id="aIndex" href="#" onclick="forwarAlarm()" hidefocus="true" style="color:red;font-size:18px">实时告警汇总：0</a></MARQUEE>  
					
						 <td id='AlarmInfor'><a id="aIndex" href="#" onclick="forwarAlarm()" hidefocus="true" style="color:red;font-size:18px">告警信息汇总：0</a></td>	
						 
						</td>	 -->
					</tr>
				</table>
			</div>
		</div>
	</div>
	<div data-options="region:'center',title:''" style="overflow:auto !important; background: url(${pageContext.request.contextPath}/images/main_bottomn.png) no-repeat;background-size:100% 100%;border-left-width: 0px; border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px;">
		<!-- 所有菜单模块 -->
		<div id="first" style="text-align:center;margin-top:50px">
			<table align=center>
				<tr>
					<td>
						<div style="margin-top: 30px;">
							<table>
								<tr>
									<td>
										<div class="picBut">
											<a href="#" id="A1" hidefocus="true" onclick="forwardPage('A1')"><img src="${pageContext.request.contextPath}/images/buttons/A1_A.png" style="border:0;outline:none;"/></a>
										</div>
										
									</td>
									<td>
										<div class="picBut">
											<a href="#" id="A2" hidefocus="true" onclick="forwardPage('A2')"><img src="${pageContext.request.contextPath}/images/buttons/A2_A.png" style="border:0;"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" id="A3" hidefocus="true" onclick="forwardPage('A3')"><img src="${pageContext.request.contextPath}/images/buttons/A3_A.png" style="border:0;"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#"  id="A4" hidefocus="true" onclick="forwardPage('A4')"><img src="${pageContext.request.contextPath}/images/buttons/A4_A.png" style="border:0;"/></a>
										</div>
									</td>
									
									<%--<td>
										<div class="picBut">
											<a href="#"  id="A5" hidefocus="true" onclick="forwardPage('A5')"><img src="${pageContext.request.contextPath}/images/buttons/A5_A.png" style="border:0"/></a>
										</div>
									</td>
									
									--%><td>
										<div class="picBut">
											<a href="#"  id="A6" hidefocus="true" onclick="forwardPage('A6')"><img src="${pageContext.request.contextPath}/images/buttons/A6_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#"  id="A7" hidefocus="true" onclick="forwardPage('A7')"><img src="${pageContext.request.contextPath}/images/buttons/A7_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#"  id="A8" title="类别查询" hidefocus="true" onclick="forwardPage('A8')"><img src="${pageContext.request.contextPath}/images/buttons/A8_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#"  id="A9" hidefocus="true" title="按品牌查询" onclick="forwardPage('A9')"><img src="${pageContext.request.contextPath}/images/buttons/A9_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#"  id="A10" hidefocus="true" title="相似车辆串并" onclick="forwardPage('A10')"><img src="${pageContext.request.contextPath}/images/buttons/A10_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#"  id="A11" hidefocus="true" title="车辆特征筛选" onclick="forwardPage('A11')"><img src="${pageContext.request.contextPath}/images/buttons/A11_A.png" style="border:0"/></a>
										</div>
									</td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div style="margin-left: 60px; margin-top: -30px;">
							<table>
								<tr>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('B1')"><img src="${pageContext.request.contextPath}/images/buttons/B1_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('B2')"><img src="${pageContext.request.contextPath}/images/buttons/B2_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('B3')"><img src="${pageContext.request.contextPath}/images/buttons/B3_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('B4')"><img src="${pageContext.request.contextPath}/images/buttons/B4_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('B5')"><img src="${pageContext.request.contextPath}/images/buttons/B5_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('B6')"><img src="${pageContext.request.contextPath}/images/buttons/B6_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('B7')"><img src="${pageContext.request.contextPath}/images/buttons/B7_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('B8')"><img src="${pageContext.request.contextPath}/images/buttons/B8_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('B9')"><img src="${pageContext.request.contextPath}/images/buttons/B9_A.png" style="border:0"/></a>
										</div>
									</td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
				<!-- 
				<tr>
					<td>
						<div style="margin-left: 240px; margin-top: -30px;">
							<table>
								<tr>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('C1')"><img src="${pageContext.request.contextPath}/images/buttons/C1_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('C2')"><img src="${pageContext.request.contextPath}/images/buttons/C2_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('C3')"><img src="${pageContext.request.contextPath}/images/buttons/C3_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('C4')"><img src="${pageContext.request.contextPath}/images/buttons/C4_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('C5')"><img src="${pageContext.request.contextPath}/images/buttons/C5_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('C6')"><img src="${pageContext.request.contextPath}/images/buttons/C6_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('C7')"><img src="${pageContext.request.contextPath}/images/buttons/C7_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('C8')"><img src="${pageContext.request.contextPath}/images/buttons/C8_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('C9')"><img src="${pageContext.request.contextPath}/images/buttons/C9_A.png" style="border:0"/></a>
										</div>
									</td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
				 -->
				<tr>
					<td>
						<div style="margin-left: 130px; margin-top: -30px;">
							<table>
								<tr>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('D1')"><img src="${pageContext.request.contextPath}/images/buttons/D1_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('D2')"><img src="${pageContext.request.contextPath}/images/buttons/D2_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('D3')"><img src="${pageContext.request.contextPath}/images/buttons/D3_A.png" style="border:0"/></a>
										</div>
									</td>
									<!-- 
									<td>
										<div class="picBut">
											<a href="#"><img src="${pageContext.request.contextPath}/images/buttons/D4_A.png" style="border:0"/></a>
										</div>
									</td>
									 -->
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('D5')"><img src="${pageContext.request.contextPath}/images/buttons/D5_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('D6')"><img src="${pageContext.request.contextPath}/images/buttons/D6_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" title="一牌多车" onclick="forwardPage('B10')"><img src="${pageContext.request.contextPath}/images/buttons/B10_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" title="一车多牌" onclick="forwardPage('B11')"><img src="${pageContext.request.contextPath}/images/buttons/B11_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" title="车流量统计" onclick="forwardPage('A12')"><img src="${pageContext.request.contextPath}/images/buttons/A12_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" title="遮挡面部" onclick="forwardPage('B12')"><img src="${pageContext.request.contextPath}/images/buttons/B12_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" title="时间比对" onclick="forwardPage('B13')"><img src="${pageContext.request.contextPath}/images/buttons/B13_A.png" style="border:0"/></a>
										</div>
									</td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div style="margin-left: 180px; margin-top: -30px;">
							<table>
								<tr>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('E1')"><img src="${pageContext.request.contextPath}/images/buttons/E1_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('E2')"><img src="${pageContext.request.contextPath}/images/buttons/E2_A.png" style="border:0"/></a>
										</div>
									</td>
									<!--  屏蔽负载均衡
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('E3')"><img src="${pageContext.request.contextPath}/images/buttons/E3_A.png" style="border:0"/></a>
										</div>
									</td>
									-->
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('E4')"><img src="${pageContext.request.contextPath}/images/buttons/E4_A.png" style="border:0"/></a>
										</div>
									</td>
									<!--  屏蔽服务器监控
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('E5')"><img src="${pageContext.request.contextPath}/images/buttons/E5_A.png" style="border:0"/></a>
										</div>
									</td>
									-->
								</tr>
							</table>
						</div>
					</td>
				</tr>
				<!-- 
				<tr>
					<td>
						<div style="margin-left: 180px; margin-top: -30px;">
							<table>
								<tr>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('F1')"><img src="${pageContext.request.contextPath}/images/buttons/F1_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('F2')"><img src="${pageContext.request.contextPath}/images/buttons/F2_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('F3')"><img src="${pageContext.request.contextPath}/images/buttons/F3_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('F4')"><img src="${pageContext.request.contextPath}/images/buttons/F4_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('F5')"><img src="${pageContext.request.contextPath}/images/buttons/F5_A.png" style="border:0"/></a>
										</div>
									</td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
				 -->
			</table>
		</div>
		
		<!-- 各导航菜单单独功能模块-车辆查询 -->
		<div id="search" style="text-align:center; display: none;">
			<table align="center">
				<tr>
					<td>
						<div style="margin-top: 160px;">
							<table>
								<tr>
									<td>
										<div class="picBut">
											<a href="#" id="A1" hidefocus="true" onclick="forwardPage('A1')"><img src="${pageContext.request.contextPath}/images/buttons/A1_A.png" style="border:0;outline:none;"/></a>
										</div>
										
									</td>
									<td>
										<div class="picBut">
											<a href="#" id="A2" hidefocus="true" onclick="forwardPage('A2')"><img src="${pageContext.request.contextPath}/images/buttons/A2_A.png" style="border:0;"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" id="A3" hidefocus="true" onclick="forwardPage('A3')"><img src="${pageContext.request.contextPath}/images/buttons/A3_A.png" style="border:0;"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#"  id="A4" hidefocus="true" onclick="forwardPage('A4')"><img src="${pageContext.request.contextPath}/images/buttons/A4_A.png" style="border:0;"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#"  id="A5" hidefocus="true" onclick="forwardPage('A5')"><img src="${pageContext.request.contextPath}/images/buttons/A5_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#"  id="A6" hidefocus="true" onclick="forwardPage('A6')"><img src="${pageContext.request.contextPath}/images/buttons/A6_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#"  id="A7" hidefocus="true" onclick="forwardPage('A7')"><img src="${pageContext.request.contextPath}/images/buttons/A7_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#"  id="A5" hidefocus="true" title="类别查询" onclick="forwardPage('A5')"><img src="${pageContext.request.contextPath}/images/buttons/A3_A.png" style="border:0"/></a>
										</div>
									</td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<!-- 各导航菜单单独功能模块-分析研判 -->
		<div id="analyze" style="text-align:center; display: none;">
			<table align="center">
				<tr>
					<td>
						<div style="margin-top:160px;">
							<table>
								<tr>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('B1')"><img src="${pageContext.request.contextPath}/images/buttons/B1_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('B2')"><img src="${pageContext.request.contextPath}/images/buttons/B2_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('B3')"><img src="${pageContext.request.contextPath}/images/buttons/B3_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('B4')"><img src="${pageContext.request.contextPath}/images/buttons/B4_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('B5')"><img src="${pageContext.request.contextPath}/images/buttons/B5_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('B6')"><img src="${pageContext.request.contextPath}/images/buttons/B6_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('B7')"><img src="${pageContext.request.contextPath}/images/buttons/B7_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('B8')"><img src="${pageContext.request.contextPath}/images/buttons/B8_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('B9')"><img src="${pageContext.request.contextPath}/images/buttons/B9_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" title="一牌多车" onclick="forwardPage('B10')"><img src="${pageContext.request.contextPath}/images/buttons/B10_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" title="一车多牌" onclick="forwardPage('B11')"><img src="${pageContext.request.contextPath}/images/buttons/B11_A.png" style="border:0"/></a>
										</div>
									</td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<!-- 各导航菜单单独功能模块-布控告警-->
		<div id="control" style="text-align:center; display: none;">
			<table align="center">
				<tr>
					<td>
						<div style="margin-top: 160px;">
							<table>
								<tr>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('D1')"><img src="${pageContext.request.contextPath}/images/buttons/D1_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('D2')"><img src="${pageContext.request.contextPath}/images/buttons/D2_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('D3')"><img src="${pageContext.request.contextPath}/images/buttons/D3_A.png" style="border:0"/></a>
										</div>
									</td>
									<!-- 
									<td>
										<div class="picBut">
											<a href="#"><img src="${pageContext.request.contextPath}/images/buttons/D4_A.png" style="border:0"/></a>
										</div>
									</td>
									 -->
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('D5')"><img src="${pageContext.request.contextPath}/images/buttons/D5_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('D6')"><img src="${pageContext.request.contextPath}/images/buttons/D6_A.png" style="border:0"/></a>
										</div>
									</td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<!-- 各导航菜单单独功能模块-卡口设备管理-->
		<div id="mounts" style="text-align:center; display: none;">
			<table align="center">
				<tr>
					<td>
						<div style="margin-top: 160px;">
							<table>
								<tr>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('C1')"><img src="${pageContext.request.contextPath}/images/buttons/C1_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('C2')"><img src="${pageContext.request.contextPath}/images/buttons/C2_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('C3')"><img src="${pageContext.request.contextPath}/images/buttons/C3_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('C4')"><img src="${pageContext.request.contextPath}/images/buttons/C4_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('C5')"><img src="${pageContext.request.contextPath}/images/buttons/C5_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('C6')"><img src="${pageContext.request.contextPath}/images/buttons/C6_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('C7')"><img src="${pageContext.request.contextPath}/images/buttons/C7_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('C8')"><img src="${pageContext.request.contextPath}/images/buttons/C8_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('C9')"><img src="${pageContext.request.contextPath}/images/buttons/C9_A.png" style="border:0"/></a>
										</div>
									</td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<!-- 各导航菜单单独功能模块-系统管理-->
		<div id="systems" style="text-align:center; display: none;">
			<table align="center">
				<tr>
					<td>
						<div style="margin-top: 160px;">
							<table>
								<tr>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('F1')"><img src="${pageContext.request.contextPath}/images/buttons/F1_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('F2')"><img src="${pageContext.request.contextPath}/images/buttons/F2_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('F3')"><img src="${pageContext.request.contextPath}/images/buttons/F3_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('F4')"><img src="${pageContext.request.contextPath}/images/buttons/F4_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('F5')"><img src="${pageContext.request.contextPath}/images/buttons/F5_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('F6')"><img src="${pageContext.request.contextPath}/images/buttons/C3_A.png" style="border:0"/></a>
										</div>
									</td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<!-- 各导航菜单单独功能模块-平台监控管理-->
		<div id="monitor" style="text-align:center; display: none;">
			<table align="center">
				<tr>
					<td>
						<div style="margin-top: 160px;">
							<table>
								<tr>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('E1')"><img src="${pageContext.request.contextPath}/images/buttons/E1_A.png" style="border:0"/></a>
										</div>
									</td>
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('E2')"><img src="${pageContext.request.contextPath}/images/buttons/E2_A.png" style="border:0"/></a>
										</div>
									</td>
									<!-- 
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('E3')"><img src="${pageContext.request.contextPath}/images/buttons/E3_A.png" style="border:0"/></a>
										</div>
									</td>
									 -->
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('E4')"><img src="${pageContext.request.contextPath}/images/buttons/E4_A.png" style="border:0"/></a>
										</div>
									</td>
									<!--  
									<td>
										<div class="picBut">
											<a href="#" hidefocus="true" onclick="forwardPage('E5')"><img src="${pageContext.request.contextPath}/images/buttons/E5_A.png" style="border:0"/></a>
										</div>
									</td>
									-->
								</tr>
							</table>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</div>
</body>
</html>