<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*,com.jp.tic.system.dao.impl.DictionaryDaoImpl"%>
<%@ taglib prefix="ui" uri="/WEB-INF/tlds/ui.tld"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	Map<String, Object> user = (Map<String, Object>) request.getSession().getAttribute("userInfo");
    String roldId = (user.get("ROLE_ID") == null || user.get("ROLE_ID") == "")?"" : user.get("ROLE_ID").toString();
    String userCode = (user.get("USER_CODE") == null || user.get("USER_CODE") == "")?"" : user.get("USER_CODE").toString();
    DictionaryDaoImpl dicDao = new DictionaryDaoImpl();
    List<Map<String, String>> roles = dicDao.findRoleInfo(roldId);
    String roleName = "";
    if (roles != null && roles.size() > 0) {
    	roleName = roles.get(0).get("ROLE_NAME");
    }
    request.setAttribute("loginRoleName", roleName);
    request.setAttribute("loginUserCode", userCode);
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "
http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>用户信息管理</title>
<%@ include file="/global/base-lib.jsp" %>
<script>
	var loginRoleName = '${loginRoleName}';
	var loginUserCode = '${loginUserCode}';
</script>
<!--  所需js包  -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/toolBox.js"></script>
<!-- 日期js组件 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/ttoolBox.js"></script>

<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/system/userManager.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/system/userInputWindow.js"></script>


<!-- 字典js包 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/Dictionary.js"></script>
<script type="text/javascript"> 
    window.dictionary  = new Dictionary();
</script>

</head>
<body >	
</body>
</html>