package com.jp.tic.utils.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;



public interface UtilFilter extends Filter{

	public void destroy();

	public void init(FilterConfig arg0) throws ServletException;
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain filterchain) throws IOException, ServletException ;

	public void doFilters(ServletRequest request, ServletResponse response,
			FilterChain filterchain) throws IOException, ServletException ;
	}
