package com.jp.tic.utils.filter;

import java.io.IOException;
import java.util.Iterator;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 通过Filter过滤器来防SQL注入攻击
 */
public class SQLFilter implements Filter {

	private String inj_str;

	protected FilterConfig filterConfig = null;
	/**
	 * Should a character encoding specified by the client be ignored?
	 */
	protected boolean ignore = true;

	public void init(FilterConfig config) throws ServletException {
		this.filterConfig = config;
		this.inj_str = "|and|exec|insert|select|delete|update|count|*|%|chr|mid|master|truncate|char|declare|; |or|-|+|,|'|<|>";
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		Iterator values = req.getParameterMap().values().iterator();// 获取所有的表单参数
		while (values.hasNext()) {
			String[] value = (String[]) values.next();
			for (int i = 0; i < value.length; i++) {
				if (sql_inj(value[i])) {
					// TODO这里发现sql注入代码的业务逻辑代码
					return;
				}
			}
		}
		chain.doFilter(request, response);
	}

	@Override
	public void destroy() {

	}

	public boolean sql_inj(String str) {
		// System.out.println(getInj_str() + ".........................");
		String[] inj_stra = inj_str.split("\\|");
		for (int i = 0; i < inj_stra.length; i++) {
			if (str.indexOf(" " + inj_stra[i] + " ") >= 0) {
				return true;
			}
		}
		return false;
	}

	public String getInj_str() {
		return inj_str;
	}

	public void setInj_str(String inj_str) {
		this.inj_str = inj_str;
	}
}
