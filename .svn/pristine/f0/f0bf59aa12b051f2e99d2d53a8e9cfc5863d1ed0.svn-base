<%@ page language="java" pageEncoding="UTF-8" import="java.util.*"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%

    String path = request.getContextPath();

    String panelFlag = request.getAttribute("panelFlag").toString();
    
    String historyFlag = request.getAttribute("historyFlag").toString();

    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

    Map<String, Object> user = (Map<String, Object>) request.getSession().getAttribute("userInfo");
   
    String userCode = (user.get("USER_CODE") == null || user.get("USER_CODE") == "")?"" : user.get("USER_CODE").toString();
    String userName = (user.get("USER_NAME") == null || user.get("USER_NAME") == "")?"" : user.get("USER_NAME").toString();
    String userOrg = (user.get("DWMC") == null || user.get("DWMC") == "")?"" : user.get("DWMC").toString();
    String iframeUrl = "";

    //iframeUrl = "/Big_Data/mountOnline/mountChartStatusPage.mvc";

    if (panelFlag.equals("panel")) {

    	iframeUrl = "/Big_Data/mountOnline/mountChartStatusPage.mvc?maxFlag=min";

    } else if (panelFlag.equals("portal")) {

    	iframeUrl = "/Big_Data/mountOnline/mountStatusColumnPage.mvc?maxFlag=max";

    } else {

    	iframeUrl = "/Big_Data/fullTextSearch/fullTextSearchPage.mvc";

    }

%>

<!DOCTYPE html>

<html lang="zh-CN">

<head>

    <meta http-equiv="X-UA-Compatible" content="IE=9;IE=8;IE=edge" />

    <meta http-equiv="content-type" content="text/html;charset=UTF-8" />

    <title>综合联网缉查大数据平台</title>

    <base href="<%=basePath%>">

    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />

    <link rel="stylesheet" type="text/css" href="webLib/jquery-easyui-1.4.1/themes/icon.css"/>

    <link rel="stylesheet" type="text/css" href="webLib/jquery-easyui-1.4.1/themes/default/easyui.css"/>

    <link rel="stylesheet" type="text/css" href="css/default.css">
    
    <style type="text/css">
    .panel-body { 
		overflow : hidden !important;
	}
    </style>

</head>
<body style="overflow: hidden;">
<!--初始化动画-->

<!-- <div id="startMask" style="background:#024461;height: 100%;position: absolute;left: 0;top: 0;width: 100%;z-index: 20000;"></div>

<div id="startTips" style="width:100%;height:100%;line-height:500px;margin:0 auto;text-align:center;font-size:50px;height: auto;position: absolute;padding: 2px;z-index: 20001;">

<span style="color:#ffffff;">正在执行初始化......</span>

</div> -->

<!--页面整体布局-->

<div class="easyui-layout" data-options="fit:true">

    <div data-options="region:'north',border:false" style="height:112px;overflow:hidden;">

        <div id="header">

            <div style="float:right;height:68px;margin-right: 15px;color:#ffffff;">

                <ul style="list-style: none;margin-top:5px;">

                    <li style="text-align:right;">

                        <ul style="list-style: none;height:32px;">

                            <li class="headerInfo org-name" style="cursor:default;"><%= userOrg %></li>
                            <li class="headerInfo user-name" style="cursor:default;"><%= userName %></li>
							<li class="headerInfo but-down" style="cursor:pointer; margin-left: 0px;" id="downInfo">下载中心</li>
                            <li class="headerInfo exit-system" onclick="document.location.href='${pageContext.request.contextPath }/user/to/login.mvc';" style="cursor:pointer;">退出</li>

                        </ul>

                    </li>

                    <li style="text-align:right;">

                        <!-- <input class="easyui-textbox" data-options="buttonText:'&nbsp;查询&nbsp;&nbsp;',buttonIcon:'icon-search',prompt:'请输入查询内容...'" style="width:200px;height:24px;"> -->

                    </li>

                </ul>

            </div>

            <h1 style="margin:15px 0 0 17px;float:left;width:319px;height:48px;background:url(images/banner.jpg) no-repeat;text-indent:-2000px;">综合联网缉查大数据平台</h1>

        </div>
        
        <div style="display:none;">
        	<div id="win" class="easyui-window" title="下载中心" data-options="modal:true,closed:true,iconCls:'icon-save'" style="width:500px;height:400px;">
				<iframe src="/Big_Data/down-center.jsp" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>
			</div>
        </div>

        <div style="height:42px;background:url(images/navBg.png) repeat-x;">

            <ul style="list-style: none;margin:0;padding:15px 0 0 0;margin-left:225px;">

                <li class="first-nav first-nav-active" title="车辆查询">

                    <div class="search-icon-active">车辆查询</div>

                </li>

                <li class="first-nav" title="分析研判">

                    <div class="hand-icon">分析研判</div>

                </li>
				
				<li class="first-nav" title="数据中心">

                    <div class="chat-icon">数据中心</div>

                </li> 
				
                <li class="first-nav" title="布控告警">

                    <div class="light-icon">布控告警</div>

                </li>

                <li class="first-nav" title="设备管理">

                    <div class="calendar-icon">设备管理</div>

                </li>            
             
                <li class="first-nav" title="平台监控">

                    <div class="camera-icon">平台监控</div>

                </li>
				
				<li class="first-nav" title="系统管理">

                    <div class="config-icon">系统管理</div>

                </li>

                <!-- <li class="first-nav" title="我的工作台">

                    <div class="user-title">我的工作台</div>

                </li>

                <li class="first-nav" title="关于">

                    <div class="heart-icon">关于</div>

                </li> -->

            </ul>

        </div>

    </div>

    <div id="second-nav-container" data-options="region:'west'" title="&nbsp;&nbsp;" style="width:240px;">

        <div class="one easyui-accordion" title="车辆查询" data-options="fit:true,border:false">

            <div class="second-nav" title="车辆查询" data-options="iconCls:'search-icon',collapsible:false" style="overflow:auto;padding:10px;">

                <c:forEach items="${tree.children}" var="item">

                    <c:if test="${item.type == 'menu'}">

                            <c:if test="${item.url =='search-nav'}">

                                <c:forEach items="${item.children}" var="node">

                                    <c:if test="${node.checked == true}">
                                    	<c:if test="${node.url == 'http://10.235.34.82:8085/PGISViewer/PGISViewer.html'}">
                                    		<p url="${node.url}?userCode=<%= userCode %>" type="${node.type}" text="${node.text}">${node.text}</p>
                                    	</c:if>
										<c:if test="${node.url != 'http://10.235.34.82:8085/PGISViewer/PGISViewer.html'}">
                                    		<p url="${node.url}" type="${node.type}" text="${node.text}">${node.text}</p>
                                    	</c:if>
						
                                    </c:if>

                                </c:forEach>

                            </c:if>

                    </c:if>

                </c:forEach>

            </div>

        </div>

        <div class="one easyui-accordion" title="分析研判" data-options="fit:true,border:false" style="visibility:hidden;">

            <div class="second-nav" title="分析研判" data-options="iconCls:'hand-icon',collapsible:false" style="padding:10px;font-size:18px;">

                <c:forEach items="${tree.children}" var="item">

                    <c:if test="${item.type == 'menu'}">

                            <c:if test="${item.url =='judged-nav'}">

                                <c:forEach items="${item.children}" var="node">

                                    <c:if test="${node.checked == true}">

                                        <p url="${node.url}" type="${node.type}" text="${node.text}">${node.text}</p>

                                    </c:if>

                                </c:forEach>

                            </c:if>

                    </c:if>

                </c:forEach>

            </div>

        </div>

        <div class="one easyui-accordion" title="布控告警" data-options="fit:true,border:false" style="visibility:hidden;">

            <div class="second-nav" title="布控告警" data-options="iconCls:'light-icon',collapsible:false" style="padding:10px;">

                <c:forEach items="${tree.children}" var="item">

                    <c:if test="${item.type == 'menu'}">

                            <c:if test="${item.url =='control-nav'}">

                                <c:forEach items="${item.children}" var="node">

                                    <c:if test="${node.checked == true}">

                                        <p url="${node.url}" type="${node.type}" text="${node.text}">${node.text}</p>

                                    </c:if>

                                </c:forEach>    

                            </c:if>         

                    </c:if>

                </c:forEach>

            </div>

        </div>

        <div class="one easyui-accordion" title="设备管理" data-options="fit:true,border:false" style="visibility:hidden;">

            <div class="second-nav" title="设备管理" data-options="iconCls:'calendar-icon',collapsible:false" style="padding:10px;">

                <c:forEach items="${tree.children}" var="item">

                    <c:if test="${item.type == 'menu'}">

                            <c:if test="${item.url =='kkdevice-nav'}">

                                <c:forEach items="${item.children}" var="node">

                                    <c:if test="${node.checked == true}">

                                        <p url="${node.url}" type="${node.type}" text="${node.text}">${node.text}</p>

                                    </c:if>

                                </c:forEach>    

                            </c:if>         

                    </c:if>

                </c:forEach>

            </div>

        </div>

        <div class="one easyui-accordion" title="数据中心" data-options="fit:true,border:false" style="visibility:hidden;">

            <div class="second-nav" title="数据中心" data-options="iconCls:'chat-icon',collapsible:false" style="padding:10px;">

                <c:forEach items="${tree.children}" var="item">

                    <c:if test="${item.type == 'menu'}">

                            <c:if test="${item.url =='datacenter-nav'}">

                                <c:forEach items="${item.children}" var="node">

                                    <c:if test="${node.checked == true}">

                                        <p url="${node.url}" type="${node.type}" text="${node.text}">${node.text}</p>

                                    </c:if>

                                </c:forEach>    

                            </c:if>         

                    </c:if>

                </c:forEach>

            </div>

        </div>

        <div class="one easyui-accordion" title="系统管理" data-options="fit:true,border:false" style="visibility:hidden;">

            <div class="second-nav" title="系统管理" data-options="iconCls:'config-icon',collapsible:false" style="padding:10px;">

                <c:forEach items="${tree.children}" var="item">

                    <c:if test="${item.type == 'menu'}">

                            <c:if test="${item.url =='system-manager-nav'}">

                                <c:forEach items="${item.children}" var="node">

                                    <c:if test="${node.checked == true}">

                                        <p url="${node.url}" type="${node.type}" text="${node.text}">${node.text}</p>

                                    </c:if>

                                </c:forEach>    

                            </c:if>         

                    </c:if>

                </c:forEach>

            </div>

        </div>

        <div class="one easyui-accordion" title="平台监控" data-options="fit:true,border:false" style="visibility:hidden;">

            <div class="second-nav" title="平台监控" data-options="iconCls:'camera-icon',collapsible:false" style="padding:10px;">

                <c:forEach items="${tree.children}" var="item">

                    <c:if test="${item.type == 'menu'}">

                            <c:if test="${item.url =='platform-monitor-nav'}">

                                <c:forEach items="${item.children}" var="node">

                                    <c:if test="${node.checked == true}">

                                        <p url="${node.url}" type="${node.type}" text="${node.text}">${node.text}</p>

                                    </c:if>

                                </c:forEach>    

                            </c:if>         

                    </c:if>

                </c:forEach>

            </div>

        </div>

        <div class="two easyui-accordion" title="我的工作台" data-options="fit:true,border:false" style="visibility:hidden;">

            <div class="second-nav" title="我的工作台" data-options="iconCls:'user-icon',collapsible:false" style="padding:10px;diaplay:none;">

                <c:forEach items="${tree.children}" var="item">

                    <c:if test="${item.type == 'menu'}">

                            <c:if test="${item.url =='destop-nav'}">

                                <c:forEach items="${item.children}" var="node">

                                    <c:if test="${node.checked == true}">

                                        <p url="${node.url}" type="${node.type}" text="${node.text}">${node.text}</p>

                                    </c:if>

                                </c:forEach>    

                            </c:if>         

                    </c:if>

                </c:forEach>

            </div>

        </div>

        <div class="three easyui-accordion" title="关于" data-options="fit:true,border:false" style="visibility:hidden;">

            <div class="second-nav" title="关于" data-options="iconCls:'heart-icon',collapsible:false" style="padding:10px;diaplay:none;">

                <c:forEach items="${tree.children}" var="item">

                    <c:if test="${item.type == 'menu'}">

                            <c:if test="${item.url =='help-nav'}">

                                <c:forEach items="${item.children}" var="node">

                                    <c:if test="${node.checked == true}">

                                        <p url="${node.url}" type="${node.type}" text="${node.text}">${node.text}</p>

                                    </c:if>

                                </c:forEach>    

                            </c:if>         

                    </c:if>

                </c:forEach>

            </div>

        </div>

    </div>

    <div data-options="region:'center',border:false" style="padding:10px 0 0 10px;">

        <div id="main-tab" class="easyui-tabs" data-options="fit:true">

            <div title="首页" style="overflow:hidden;">

                <iframe id="scrollIframe" src="<%= iframeUrl %>" width="" height="" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>

            </div>

        </div>

    </div>

</div>



<!--脚本加载-->

<script data-main="js/main/main.js?v=12" src="webLib/requirejs/require-2.1.14.js"></script>

<script>
	var historyFlag = '${historyFlag}';
	
	var h = document.documentElement.clientHeight;

	var w = document.documentElement.clientWidth;

	var height = h - 142;

	var width = w -252;

	document.getElementById('scrollIframe').height = height;

	document.getElementById('scrollIframe').width = width;

</script>

</body>

</html>

