<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="java.util.*"%>
<%@ taglib prefix="ui" uri="/WEB-INF/tlds/ui.tld"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>首页</title>
	<%@ include file="/global/base-info.jsp" %>
	<script>
	$(document).ready(function() {
	   
	});
	var mainInfo = {
		toUrlPage : function(url, title, openType) {
			if (openType != 'html') {
				url = rootpath + "/" + url;
			}
			window.location.href = rootpath + "/user/toMainInfo.mvc?urlStr=" + url + "&title=" + encodeURI(title);
			//window.location.href = rootpath + "/" + url;
		}
	};
	</script>
	<style type="text/css">
	.titleName {
		text-align:right; 
		font-size: 20px; 
		font-weight: bold;
	}
	.contentName {
		text-align:center;
		width: 150px;
		height: 50px;
	}
	.hrefStyle {
		font-size: 15px; 
	}
	a {
		text-decoration: none;
	}
    </style>
</head>
<body>
	<div style="text-align:center; margin-top: 200px;">
		<table style="margin:auto;">
			<tr>
				<td class="titleName">车辆查询&nbsp;&nbsp;&nbsp;&nbsp;</td>
				 <c:forEach items="${allActions}" var="item">
		 			<c:if test="${item.type == 'A'}">
		 				<td class="contentName">
		 					<a href="#" onclick="mainInfo.toUrlPage('${item.url}', '${item.text}', '${item.openType}')" class="hrefStyle"><c:out value="${item.text}"></c:out></a>
			 			</td>
		 			</c:if>
				 </c:forEach>
			</tr>
			<tr>
				<td class="titleName">分析研判&nbsp;&nbsp;&nbsp;&nbsp;</td>
				<c:forEach items="${allActions}" var="item">
		 			<c:if test="${item.type == 'B'}">
		 				<td class="contentName">
			 				<a href="#" onclick="mainInfo.toUrlPage('${item.url}', '${item.text}', '${item.openType}')" class="hrefStyle"><c:out value="${item.text}"></c:out></a>
			 			</td>
		 			</c:if>
				 </c:forEach>
			</tr>
			<tr>
				<td class="titleName">
					布控告警&nbsp;&nbsp;&nbsp;&nbsp;
				</td>
				<c:forEach items="${allActions}" var="item">
		 			<c:if test="${item.type == 'D'}">
		 				<td class="contentName">
			 				<a href="#" onclick="mainInfo.toUrlPage('${item.url}', '${item.text}', '${item.openType}')" class="hrefStyle"><c:out value="${item.text}"></c:out></a>
			 			</td>
		 			</c:if>
				 </c:forEach>
			</tr>
			<tr>
				<td class="titleName">
					系统管理&nbsp;&nbsp;&nbsp;&nbsp;
				</td>
				<c:forEach items="${allActions}" var="item">
		 			<c:if test="${item.type == 'F'}">
		 				<td class="contentName">
			 				<a href="#" onclick="mainInfo.toUrlPage('${item.url}', '${item.text}', '${item.openType}')" class="hrefStyle"><c:out value="${item.text}"></c:out></a>
			 			</td>
		 			</c:if>
				 </c:forEach>
			</tr>
			<tr>
				<td class="titleName">
					平台监控管理&nbsp;&nbsp;&nbsp;&nbsp;
				</td>
				<c:forEach items="${allActions}" var="item">
		 			<c:if test="${item.type == 'E'}">
		 				<td class="contentName">
			 				<a href="#" onclick="mainInfo.toUrlPage('${item.url}', '${item.text}', '${item.openType}')" class="hrefStyle"><c:out value="${item.text}"></c:out></a>
			 			</td>
		 			</c:if>
				 </c:forEach>
			</tr>
		</table>
	</div>
</body>
</html>