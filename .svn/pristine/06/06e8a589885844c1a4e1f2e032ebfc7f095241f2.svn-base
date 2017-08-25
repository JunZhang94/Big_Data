package com.jp.tic.utils.view;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Request工具类
 * @author 梁石光
 * @datetime 2013-05-30
 */
public class RequestUtil {
    
	//异步请求返回
	public static void responseOut(String encoding, String data, HttpServletResponse response) {
		response.setContentType("text/html; charset=" + encoding);
		try {
			PrintWriter pw = response.getWriter();
			pw.print(data);
	        pw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	//获取request对象中所有参数，并设置到map中
	public static Map getMapByRequest(HttpServletRequest request) {
		Map<String, String> map = new HashMap<String, String>();
		Enumeration enu = request.getParameterNames();
		while(enu.hasMoreElements()) {
            String paraName = (String)enu.nextElement();   
            String paraValue = request.getParameter(paraName); 
            if(paraValue!=null && !"".equals(paraValue)){
            	map.put(paraName, paraValue);
            }           
		}	
		return map;
	}
	
	/**
     * 获取request对象中所有参数，并设置到map中
     * @return
     */
    @SuppressWarnings("unchecked")
    public static Map getMapByRequest(){
        HttpServletRequest request=Struts2Utils.getRequest();
        Enumeration enu = request.getParameterNames();
        Map<String, String> map = new HashMap<String, String>();
        while(enu.hasMoreElements()) {
            String paraName = (String)enu.nextElement();   
            String paraValue = request.getParameter(paraName); 
            if(paraValue!=null && !"".equals(paraValue)){
                map.put(paraName, paraValue);
            }           
        }   
        return map;
    }
	
	//根据KEY获取session对应的对象
	public static Object getSessionObject(HttpServletRequest request, String key) {
		HttpSession session = request.getSession();
		return session.getAttribute(key);
	}
	
}