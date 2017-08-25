package com.jp.tic.utils.filters;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Repository;

import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;



/**
 * <b>function:</b> implements
 * @author hoojo
 * @createDate 2014-5-23 下午02:17:55
 * @file CarQueryDaoImpl.java
 * @package com.jp.tic.analyze.dao.impl
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
@Repository
public class UtilFilterImpl implements UtilFilter {

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
		FilterChain filterchain) throws IOException, ServletException {
////			String head = ((HttpServletRequest) request).getHeader("x-requested-with");//(获得extjs session过期值)  
//			//String sessionUser = (String)((HttpServletRequest) request).getSession().getAttribute("user");
//			
//			String path = ((HttpServletRequest) request).getServletPath(); 
//			if(!"/user/to/login.mvc".equals(path) && !"/user/login.mvc".equals(path))
//			{
//
//				HttpSession session = ((HttpServletRequest) request).getSession(false);
//				if(session==null){
////					((HttpServletResponse) response).sendRedirect(((HttpServletRequest) request).getHeader("Referer"));
//					request.getRequestDispatcher("/user/to/login.mvc").forward(request, response);
////					request.getRequestDispatcher("./login.mvc").forward(request,response); 
////					StringBuilder activateHide = new StringBuilder();
////					activateHide.append("<script language='javascript'>");             
////					activateHide.append("parent.location.href='/user/to/login.mvc'");
////					activateHide.append("</script>");
//					return;
////					 filterchain.doFilter(request, response);   
//				}else
//				{
//				Map<String, Object> userMap2 = (Map<String, Object>) session.getAttribute(AbstractController.SESSION_USER);
////			   if (head == null && (head.equalsIgnoreCase("XMLHttpRequest")))
////				{   
//					if (userMap2 == null) {   
//						
//						
////						request.getRequestDispatcher("./login.mvc").forward(request,response); 
//						StringBuilder activateHide = new StringBuilder();
//						activateHide.append("<script language='javascript'>");             
//						activateHide.append("document.location.href='${pageContext.request.contextPath }/user/to/login.mvc';");
//						activateHide.append("</script>");
//						return;
//					}  
//					else{  
//					 filterchain.doFilter(request, response);   
//					 return;
//					}  
////				}
//
//			}
//			}
//			filterchain.doFilter(request, response); 
//			return;
		 doFilters(request, response, filterchain);
		}

	@Override
	@SuppressWarnings("unchecked")
	public void doFilters(ServletRequest request, ServletResponse response,
			FilterChain filterchain) throws IOException, ServletException {
		String path = ((HttpServletRequest) request).getServletPath(); 
		Map<String, String> searchParam = RequestUtil.getMapByRequest((HttpServletRequest) request); 
		//单点登入问题
		if (StringUtil.checkStr(searchParam.get("id")) && StringUtil.checkStr(searchParam.get("timestamp")) && StringUtil.checkStr(searchParam.get("md"))) {
			String id = (searchParam.get("id") == null) ? "" : searchParam.get("id");
			HttpSession sessionTemp = ((HttpServletRequest) request).getSession(true);
			Map<String, String> userMapTemp = new HashMap<String, String>();
			userMapTemp.put("USER_CODE", id);
			userMapTemp.put("USER_NAME", "知识城");
			userMapTemp.put("loginFlag", "outLogin");
			sessionTemp.setAttribute(AbstractController.SESSION_USER, userMapTemp);
		}
		if (StringUtil.checkStr(searchParam.get("load")) && StringUtil.checkStr(searchParam.get("text"))) {
			if (StringUtil.equals(path, "/user/to/main.mvc")) {
				HttpSession sessionNew = ((HttpServletRequest) request).getSession(true);
				Map<String, String> userMapNew = new HashMap<String, String>();
				userMapNew.put("USER_CODE", searchParam.get("load"));
				String userName = URLDecoder.decode(searchParam.get("text"),"UTF-8");
				userMapNew.put("USER_NAME", userName);
				if (StringUtil.checkStr(searchParam.get("orgCode"))) {
					userMapNew.put("ORG_CODE", searchParam.get("orgCode"));
				}
				sessionNew.setAttribute(AbstractController.SESSION_USER, userMapNew);
			}
		}
		//开放对布控告警的权限控制，联网平台过车查询
		if(!"/user/to/login.mvc".equals(path) && !"/user/login.mvc".equals(path)
				&& (!path.startsWith("/control")&& !path.startsWith("/dictionary")
						&& !path.startsWith("/systemOrg")
						&& !"/car/carFrequencyDetail.mvc".equals(path))
						&& !path.startsWith("/car")
						&& !path.startsWith("/deviceinfo")
						&& !path.startsWith("/firstTimeInCity")
						&& !path.startsWith("/carHiddenAnaly")
						&& !path.startsWith("/stopAnalysis")
						&& !path.startsWith("/analyStopCar")) {
			String ajax = ((HttpServletRequest) request).getHeader("x-Requested-with");  
			HttpSession session = ((HttpServletRequest) request).getSession(false);
			if(ajax != null && ajax.equals("Ext.basex")){   
				Map<String, Object> userMap2 = null;
				try {
					userMap2 = (Map<String, Object>) session.getAttribute(AbstractController.SESSION_USER);
				} catch (Exception e) {
					((HttpServletResponse) response).setHeader("LoginRequired", "timeout");
				}
				if(session == null || userMap2 == null){
					((HttpServletResponse) response).setHeader("LoginRequired", "timeout"); 
				}
			}/* else {
				if(session == null){
					request.getRequestDispatcher("/user/to/login.mvc").forward(request, response);
				}
			}*/
		}
		filterchain.doFilter(request, response); 
	}
}
