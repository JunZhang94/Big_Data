package com.jp.tic.framework.mvc.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.framework.log.ApplicationLogging;

/**
 * <b>function:</b> 权限验证拦截器
 * @author hoojo
 * @createDate 2012-10-23 下午01:14:06
 * @file AuthVaildInterceptor.java
 * @package com.jp.tic.framework.interceptor
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public class AuthVaildInterceptor extends ApplicationLogging implements HandlerInterceptor {

	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception e) throws Exception {
		info("AuthVaildInterceptor->afterCompletion");
	}

	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView mav) throws Exception {
		info("AuthVaildInterceptor->postHandle");
		trace("ModelAndView: {}", mav);
	}

	/**
	 * @see org.springframework.web.servlet.HandlerInterceptor#preHandle(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object)
	 * <b>function:</b> 验证用户登录
	 * @author hoojo
	 * @createDate 2012-12-15 上午10:22:28
	 */
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		info("AuthVaildInterceptor->preHandle");
		
		String requestURL = request.getRequestURI();
		trace("request url: {}", requestURL);
		
		if (isValid(requestURL)) {
			return true;
		}
		
		Object user = request.getSession().getAttribute(AbstractController.SESSION_USER);
		trace("user login: {}", user);
		if (user == null) {
			response.sendRedirect(request.getContextPath() + "/index.jsp");
			return false;
		}
		return true;
	}
	
	/**
	 * <b>function:</b> 验证该url是否为需要验证url
	 * @author hoojo
	 * @createDate 2012-12-15 上午10:22:45
	 * @param url 当前请求url
	 * @return 是否验证通过
	 */
	private boolean isValid(String url) {
		
		String[] validURLs = {
			"/upload", "/download", "/image/view", "/download/view", "/login.mvc",
			"/to/register", "/to/login", "/user/login", "/user/register", "/user/"
		};
		for (String temp : validURLs) {
			if (url.contains(temp)) {
				return true;
			}
		}
		return false;
	}
}
