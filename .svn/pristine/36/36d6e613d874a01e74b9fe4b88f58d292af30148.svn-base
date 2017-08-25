package com.jp.tic.utils;

import org.springframework.beans.BeansException;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 * 获取Spring Context的工具获,通过{@link SpringContextUtils}.getApplicationContext()得到
 * @author Abe
 */
public class SpringContextUtils implements ApplicationContextAware {
	
	private static ApplicationContext ctx;
	
	
	@Override
	public void setApplicationContext(ApplicationContext applicationContext)
			throws BeansException {
		ctx = applicationContext;

	}
	/**
	 * 
	 * @return
	 */
	public static ApplicationContext getApplicationContext(){
		return ctx;
	}
	/**
	 * 
	 * @param key
	 * @return
	 */
	public static String getSystemProperty(String key){
//		return ((SystemPropertiesConfigurer)ctx.getBean("configurer")).getSystemProperties().getProperty(key);
		return null;
	}
}
