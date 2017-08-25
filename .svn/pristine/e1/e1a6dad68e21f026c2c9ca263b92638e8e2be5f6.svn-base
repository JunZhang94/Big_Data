package com.jp.tic.common.util;

import org.springframework.beans.BeansException;

import org.springframework.context.ApplicationContext;

import org.springframework.context.ApplicationContextAware;

public class SpringApplicationContextUtils implements ApplicationContextAware {

	private static ApplicationContext context;

	public void setApplicationContext(ApplicationContext contex) throws BeansException {
		context = contex;
	}

	public static ApplicationContext getContext() {
		return context;
	}

}
