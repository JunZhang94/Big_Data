package com.jp.tic.framework.controller;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.jp.tic.framework.log.ApplicationLogging;
import com.jp.tic.utils.SuccessJSONResult;
import com.jp.tic.utils.view.RequestUtil;

/**
 * <b>function:</b> 抽象控制台，提供所有控制器继承使用，方便控制器统一控制扩展
 * @author hoojo
 * @createDate 2012-10-20 下午10:47:36
 * @file AbstractController.java
 * @package com.jp.tic.framework.controller
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public class AbstractController extends ApplicationLogging {
	
	protected SuccessJSONResult jsonResult = new SuccessJSONResult();
	
	//验证码保存字符串
	protected final static String SESSION_CHECKCODE = "session_checkcode";

	public final static String SESSION_USER = "userInfo";
	
	public final static String SESSION_ID = "sessionId";
	
	@ExceptionHandler(Exception.class)
	public String exception(Exception e, HttpServletRequest request) {
		request.setAttribute("exception", e);
		error(e);
		return "forward:/global/exception.jsp";
	}

	/*
	 * 在请求的url中含有.mvc的且不能找到正确的请求，就会执行此方法
	 */
	@RequestMapping({ "/*.mvc" })
	public String notFound() {
		return "redirect:/global/error-404.jsp";
	}
	
	/**
	 * <b>function:</b> 转换request 参数map集合（参数带数组） 为普通的map集合
	 * @author hoojo
	 * @createDate 2013-7-23 下午03:45:36
	 * @param request HttpServletRequest
	 * @return 转换后的map参数
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	protected Map<String, Object> transformRequestMap(HttpServletRequest request) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		
		Map<String, Object> params = request.getParameterMap();
		Iterator<String> keys = params.keySet().iterator();
		while (keys.hasNext()) {
			String key = keys.next();
			Object item = params.get(key);
			if (item != null) {
				Object[] items = (Object[]) item;
				result.put(key, items[0]);
			}
		}
		return result;
	}

	/**
	 * 获取当前用户
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> getCurrentUser(){
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		Map<String, Object> userMap = (Map<String, Object>)(request.getSession().getAttribute(AbstractController.SESSION_USER));
		if (userMap == null) {
			userMap = new HashMap<String, Object>();
		}
		userMap.put(SESSION_ID, getClientIpAddress(request));
		return userMap;
	}
	
	/**
	 * 获取页面传递的参数
	 * @return 接收结果
	 */
	@SuppressWarnings("unchecked")
	public Map<String, String> getWebParamInfo() {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		return searchParam;
	}
	
	/**
	 * 获取客户端中的这是IP地址
	 * 通过多级代理处理来获取客户端真实的IP
	 * @author jzxie
	 * @param request
	 * @return
	 */
	public String getClientIpAddress(HttpServletRequest request) { 
	       String ip = request.getHeader("x-forwarded-for"); 
	       if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	           ip = request.getHeader("Proxy-Client-IP"); 
	       } 
	       if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	           ip = request.getHeader("WL-Proxy-Client-IP"); 
	       } 
	       if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	           ip = request.getRemoteAddr(); 
	       } 
	       return ip; 
	   }
}
