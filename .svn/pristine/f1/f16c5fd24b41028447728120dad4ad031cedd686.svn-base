<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="java.util.*,test.*,java.lang.reflect.*"%>
<% 		
	request.setCharacterEncoding("UTF-8");
	response.setCharacterEncoding("UTF-8");	
	 
    String methodName = request.getParameter("method");
    
       
    Class[] argsClass = new Class[2]; 
    argsClass[0] = HttpServletRequest.class;
    argsClass[1] = HttpServletResponse.class;
    
    Class cls = this.getClass();   
    Method method = cls.getMethod(methodName, argsClass);   
    
    Object[] args = new Object[2];
    args[0] = request;
    args[1] = response;   
    method.invoke(this, args);     
   	
%>
<%!


public void getKKTreeData(HttpServletRequest request, HttpServletResponse response) throws Exception{
	List<HashMap<String, String>> result = new Tree4kkMaster().getKKTree();
	String json = JSON.Encode(result);
	json=json.replace("PID","pId").replace("（","(").replace("）",")").replace("\t","").replace("ID","id").replace("NAME", "name").replace("ORG_TYPE","org_type");
    response.getWriter().write(json);    
}

public void getKKTreeGzsIncData(HttpServletRequest request, HttpServletResponse response) throws Exception{
	List<HashMap<String, String>> result = new Tree4kkMaster().getKKTreeGzsInc();
	String json = JSON.Encode(result);
	json=json.toLowerCase().replace("pid","pId").replace("（","(").replace("）",")").replace("\t","");
    response.getWriter().write(json);    
}

public void getDirectionTree(HttpServletRequest request, HttpServletResponse response) throws Exception{
	List<HashMap<String, String>> result = new Tree4kkMaster().getDirectionTree();
	String json = JSON.Encode(result);
	json=json.toLowerCase().replace("pid","pId").replace("（","(").replace("）",")").replace("\t","");
    response.getWriter().write(json);    
}

public void getBeyonetTreeData(HttpServletRequest request, HttpServletResponse response) throws Exception{
	List<HashMap<String, String>> result = new Tree4kkMaster().getBeyonetTree();
	String json = JSON.Encode(result);
	json=json.toLowerCase().replace("pid","pId").replace("（","(").replace("）",")").replace("\t","");
    response.getWriter().write(json);    
}

public void getVirtualKKTreeData(HttpServletRequest request, HttpServletResponse response) throws Exception{
	List<HashMap<String, String>> result = new Tree4kkMaster().getVirtualKKTree();
	String json = JSON.Encode(result);
	json=json.replace("PID","pId").replace("（","(").replace("）",")").replace("\t","").replace("ID","id").replace("NAME", "name").replace("ORG_TYPE","org_type");
    response.getWriter().write(json);    
}
%> 