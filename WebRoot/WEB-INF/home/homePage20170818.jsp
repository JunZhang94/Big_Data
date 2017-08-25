<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="java.util.*"%>
<%@ taglib prefix="ui" uri="/WEB-INF/tlds/ui.tld"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
    Map<String, Object> user = (Map<String, Object>) request.getSession().getAttribute("userInfo");
    Map<String, List> menu= (Map<String, List>) request.getSession().getAttribute("menu");
    String userCode = (user.get("USER_CODE") == null || user.get("USER_CODE") == "")?"" : user.get("USER_CODE").toString();
    String userName = (user.get("USER_NAME") == null || user.get("USER_NAME") == "")?"" : user.get("USER_NAME").toString();
    String ipStr = request.getLocalAddr();
	int ipPort = request.getLocalPort();
	String ipAdress = ipStr + ":" + ipPort;
%>
<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<meta name="keywords" content="综合联网缉查大数据平台" />
		<meta name="description" content="综合联网缉查大数据平台" />
		<%@ include file="/global/base-lib.jsp" %>
		<link href="${pageContext.request.contextPath}/home/css/css.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="${pageContext.request.contextPath}/home/js/jquery-1.8.0.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/home/js/move.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath }/res/jslib/jquery/jquery.md5.js"></script>
		<script>
		var webroot=document.location.href;
	    webroot=webroot.substring(webroot.indexOf('//')+2,webroot.length);
	    webroot=webroot.substring(webroot.indexOf('/')+1,webroot.length);
	    webroot=webroot.substring(0,webroot.indexOf('/'));
	    var rootpath="/"+webroot;
	    var ipAdress = "<%= ipAdress %>";
	    var userCode="<%= userCode %>";

	    var hh = $(window).height() - 80;
	    var ww = $(window).width();
	    var title = '';
		var historyFlag = '${historyFlag}';
		var datas;
		var currentPage = "";
		$(document).ready(function() {
			if ('${homePageFlag}'  == 'jiangan') {
				document.title = "江岸公安卡口大数据查控平台";
			} else if ('${homePageFlag}'  == 'zhuhai') {
				document.title = "珠海市车辆稽查布控系统";
			} else {
				document.title = "综合联网缉查大数据平台";
			}
			
			loginXTSystem();
			showAlarmWin();
			$("#menu2 li a").wrapInner( '<span class="out"></span>' );
			$("#menu2 li a").each(function() {
				var title = $(this).text();
				$( '<span class="over">' +  title + '</span>' ).appendTo( this );
				$( '<span class="test">' +  title + '</span>' ).appendTo( this );
			});
			$("#menu2 li a").hover(function() {
				$(".out",	this).stop().animate({'top':	'50px'},	300); // move down - hide
				$(".over",	this).stop().animate({'top':	'0px'},		300); // move down - show
			}, function() {
				$(".out",	this).stop().animate({'top':	'0px'},		300); // move up - show
				$(".over",	this).stop().animate({'top':	'-50px'},	300); // move up - hide
			});
			if("admin"!=userCode){
				$("#nbtn5").hide();
				//$("#nbtn6").hide();
			}
			//首页默认选中
			$("#nbtn0").find(".test").stop().animate({'top':	'0px'}, 0); // move down - show
			
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
			$.ajax({ 
				url: rootpath + "/user/findMenus.mvc", 
				data:{},
				success: function(data){
					datas = data.data;
	     		}
	     	});
			$(".lscreen").children("div:first-child").children("div:first-child").width(ww - 20);
			$(".firstPage").html("<iframe id='firstPageIframe' src='http://" + ipAdress +"/Big_Data/homePage/loadHomePage.mvc' width='100%' height='" + hh + "' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'/>");
		});

		
		var menuArray = new Array(1);
		menuArray[0] = [['历史过车'],['实时过车'],['车辆库'],['无车牌查询'],['假牌车查询'],['类别查询'],['品牌查询'],['车辆特征']];
		menuArray[1] = [['轨迹回放'], ['相似车辆串并'], ['跟随车分析'], ['套牌车分析'], ['临近点分析'], ['区域碰撞分析'], ['车辆频度统计'],['空'],['初次入城'],['隐匿车辆'],['落脚点分析'],['昼伏夜出'],['一牌多车'],['一车多牌'],['遮挡面部'],['汇聚统计'],['以图搜图'],['时间比对'],['车流量统计'],['时空分析']];
		menuArray[2] = [['布控查询'], ['布控审核'], ['布控撤销'], ['撤控审核'], ['告警查询'], ['车牌精确布控'], ['车牌模糊布控'], ['车辆品牌布控'], ['车辆类别布控'],['黑白名单管理']];
		menuArray[3] = [['故障告警查询'], ['供应商管理'], ['卡口/设备管理'], ['卡口审核'], ['故障统计'], ['巡检统计'], ['故障登记'], ['故障确认'], ['故障处理']];
		menuArray[4] = [['角色管理'],['用户管理'],['系统设置'],['字典管理'],['日志管理'],['任务管理'],['设备运维'],['下载中心']];
		menuArray[5] = [['集群状态'],['节点监控'],['负载均衡'],['平台节点监控'],['服务器监控']];
		function forwardPage(value) {
			var valueTemp1 = value.substring(0,1);
			var valueTemp2 = value.substring(1,3);
			if(valueTemp1 =="A"){
				currentPage = "<span style='font-size:18px;color:#FFFFFF;'>车辆查询&nbsp>>&nbsp</span><a href='#' style='font-size:16px;color: #FFFFFF;text-decoration:none;' onclick='currentPages()'>"+menuArray[0][valueTemp2-1]+"</a>";
			}else if(valueTemp1 =="B"){
				currentPage = "<span style='font-size:18px;color:#FFFFFF;'>分析研判&nbsp>>&nbsp</span><a href='#' style='font-size:16px;color: #FFFFFF;text-decoration:none;' onclick='currentPages()'>"+menuArray[1][valueTemp2-1]+"</a>";
			}else if(valueTemp1 =="D"){
				currentPage = "<span style='font-size:18px;color:#FFFFFF;'>卡口设备管理&nbsp>>&nbsp</span><a href='#' style='font-size:16px;color: #FFFFFF;text-decoration:none;' onclick='currentPages()'>"+menuArray[3][valueTemp2-1]+"</a>";
			}else if(valueTemp1 =="C"){
				currentPage = "<span style='font-size:18px;color:#FFFFFF;'>布控告警&nbsp>>&nbsp</span><a href='#' style='font-size:16px;color: #FFFFFF;text-decoration:none;' onclick='currentPages()'>"+menuArray[2][valueTemp2-1]+"</a>";
			}else if(valueTemp1 =="E"){
				currentPage = "<span style='font-size:18px;color:#FFFFFF;'>系统管理&nbsp>>&nbsp</span><a href='#' style='font-size:16px;color: #FFFFFF;text-decoration:none;' onclick='currentPages()'>"+menuArray[4][valueTemp2-1]+"</a>";
			}else if(valueTemp1 =="F"){
				currentPage = "<span style='font-size:18px;color:#FFFFFF;'>平台监控管理&nbsp>>&nbsp</span><a href='#' style='font-size:16px;color: #FFFFFF;text-decoration:none;' onclick='currentPages()'>"+menuArray[5][valueTemp2-1]+"</a>";
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
			//window.open(url);
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

		//对接第三方厂家登入问题
		function loginXTSystem(){
			//单点登入约定密码，可以写在配置文件中，但是每次修改要重启，而直接写在js里面可以不用重启，至于安全性，此密码没多大用处，就是一个比对验证而。
			var keyword = '${keyword}';
			var id = '${id}';
			var timestamp = '${timestamp}';
			var mdStr = '${md}';
			var loginFlag = '${loginFlag}';
			var md5Str = $.md5(id+timestamp+keyword)
			if (mdStr != md5Str && loginFlag == 'outLogin') {
				window.location.href = 'http://' + ipAdress +  '/Big_Data/user/to/login.mvc';
			}
		}

		function showAlarmWin(){
			var childUrl=rootpath + "/controlAlarm/alarmWarnPage.mvc";
			var win = new Ext.Window({
				width:400,
				height:300,
				//layout: "fit",
				title:"告警提醒",
			//	maximizable:true,
			//	minimizable: true,
			//	plain:true,	  
				html:'<iframe id="ifrm" scrolling="auto" frameborder="0" width="100%" height="100%" src='+childUrl+'></iframe>'
				});
				win.setPagePosition(document.body.clientWidth-400,document.body.clientHeight-300);
				win.show();
		}
				
		</script>
	</head>
	<body style="background-image: url(${pageContext.request.contextPath}/home/images/bg.jpg)">
		<div class="top">
			<div class="logo">
				<c:if test="${homePageFlag == 'all'}">
					<img src="${pageContext.request.contextPath}/home/images/logo_all.png" />
				</c:if>
				<c:if test="${homePageFlag == 'jiangan'}">
					<img src="${pageContext.request.contextPath}/home/images/logo_jiangan.png" />
				</c:if>
				<c:if test="${homePageFlag == 'zhuhai'}">
					<img src="${pageContext.request.contextPath}/home/images/logo_zhuhai.png" />
				</c:if>
			</div>
			<div id="menu2" class="menu">
				<ul>
					<!-- <li id="nbtn0"><a href="#" onclick="">首页</a></li>  -->
					<c:forEach var="obj" items="${menu['0']}" varStatus="status">
						<li id="nbtn${status.index}">
							<a href="#">${obj.name}</a>
						</li>
					</c:forEach>
				</ul>
			</div>
		</div>
		<div class="frame">
			<div class="lscreen">
				<c:if test="${menu['0']!= null}"><!-- 首页 -->
					<c:forEach var="obj0" items="${menu['0']}" >
						<c:if test="${obj0.name == '首页'}">
							<div class="screen" style="top : 50px !important;">
								<div class="pcells" style="width: 100% !important;margin-top: -130px;">
									<div class="firstPage">
									</div>
								</div>
							</div>
						</c:if>
					</c:forEach>
				</c:if>
				<c:if test="${menu['1']!=null}"><!-- 车辆查询 -->
				<div class="screen">
					<div class="pcells_temp">
						<c:forEach var="obj1" items="${menu['1']}" >
							<div class="pcell">
								<a href="#" onclick="forwardPage('${obj1.type}')"><img src="${pageContext.request.contextPath}${obj1.iconName}">
								</a>
							</div>
						</c:forEach>
						<div class="clear"></div>
					</div>
				</div>
				</c:if>
				<c:if test="${menu['2']!=null}"><!-- 分析研判 -->
				<div class="screen">
					<div class="pcells">
						<c:forEach var="obj2" items="${menu['2']}" >
							<div class="pcell">
								<a href="#" onclick="forwardPage('${obj2.type}')"><img src="${pageContext.request.contextPath}${obj2.iconName}">
								</a>
							</div>
						</c:forEach>
						<div class="clear"></div>
					</div>
				</div>
				</c:if>
				<c:if test="${menu['3']!=null}"><!-- 布控告警 -->
				<div class="screen">
					<div class="pcells">
						<c:forEach var="obj3" items="${menu['3']}" >
							<div class="pcell">
								<a href="#" onclick="forwardPage('${obj3.type}')"><img src="${pageContext.request.contextPath}${obj3.iconName}">
								</a>
							</div>
						</c:forEach>
						<div class="clear"></div>
					</div>
				</div>
				</c:if>
				<c:if test="${menu['4']!=null}"><!-- 统计管理 -->
				<div class="screen">
					<div class="pcells">
						<c:forEach var="obj4" items="${menu['4']}" >
							<div class="pcell">
								<a href="#" onclick="forwardPage('${obj4.type}')"><img src="${pageContext.request.contextPath}${obj4.iconName}">
								</a>
							</div>
						</c:forEach>
						<div class="clear"></div>
					</div>
				</div>
				</c:if>
				<c:if test="${menu['5']!=null}"><!-- 系统管理 -->
				<div class="screen">
					<div class="pcells">
						<c:forEach var="obj5" items="${menu['5']}" varStatus="status">
							<div class="pcell">
								<a href="#" onclick="forwardPage('${obj5.type}')"><img src="${pageContext.request.contextPath}${obj5.iconName}">
								</a>
							</div>
						</c:forEach>
						<div class="pcell">
							<a href="#" onclick="document.location.href='${pageContext.request.contextPath }/user/to/login.mvc';"><img src="${pageContext.request.contextPath}/home/images/F6_A.png">
							</a>
						</div>
						<div class="clear"></div>
					</div>
				</div>
			</c:if>
				<c:if test="${menu['6']!=null}"><!-- 平台监控 -->
				<div class="screen">
					<div class="pcells">
						<c:forEach var="obj6" items="${menu['6']}" >
							<div class="pcell">
								<a href="#" onclick="forwardPage('${obj6.type}')"><img src="${pageContext.request.contextPath}${obj6.iconName}">
								</a>
							</div>
						</c:forEach>
						<div class="clear"></div>
					</div>
				</div>
				</c:if>
			</div>
			<div class="banner_pre"></div>
			<div class="banner_next"></div>
		</div>
		<div class="bottom">
			<div style="color:#fff;font-size:13px" align="center">
				 请使用IE8.0以上浏览器，最佳显示分辨率1440×900 版权所有 © 2016 金鹏集团 地址：广州市科学城神舟路9号 联系电话： 020-85571601 当前用户：<%= userName %>
			</div>
		</div>
	</body>
</html>
