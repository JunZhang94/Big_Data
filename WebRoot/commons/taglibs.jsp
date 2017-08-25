<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<c:set var="req" value="${pageContext.request}"/>
<c:set var="fullPath" value="${req.serverName}"/>
<script type="text/javascript">
    var ctx = '${ctx}';
</script>