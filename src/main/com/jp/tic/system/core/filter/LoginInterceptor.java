package com.jp.tic.system.core.filter;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.utils.lang.StringUtil;

public class LoginInterceptor extends HandlerInterceptorAdapter {
	private static final String[] IGNORE_URI = {"/login.jsp", "/Login/","/login"}; 
	  
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception { 
        boolean flag = false; 
        String url = request.getRequestURL().toString(); 
        System.out.println(">>>: " + url); 
        for (String s : IGNORE_URI) { 
            if (url.contains(s)) { 
                flag = true; 
                break; 
            } 
        } 
        if (!flag) { 
        	@SuppressWarnings("unchecked")
        	Map<String, Object> userMap = (Map<String, Object>)(request.getSession().getAttribute(AbstractController.SESSION_USER));
        	String userCode = StringUtil.toString(userMap.get("USER_CODE"));
            if (userCode != null) flag = true; 
        } 
        return flag; 
    } 
  
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception { 
        super.postHandle(request, response, handler, modelAndView); 
    } 

}
