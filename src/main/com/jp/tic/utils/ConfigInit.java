package com.jp.tic.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.apache.commons.configuration.CompositeConfiguration;
import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.log4j.Logger;

/**
 * 初始基础配置参数
 * @author 梁石光
 * @datetime 2013-05-30
 */
@SuppressWarnings("serial")
public class ConfigInit extends HttpServlet {

	public static Logger logger = Logger.getLogger(ConfigInit.class);
	public static Properties Config = new Properties();

	/**
	 * 通过在web.xml中配置读取的属性文件
	 */
	public void init(ServletConfig config) throws ServletException {
		String prefix = config.getServletContext().getRealPath("/");
		String file = config.getInitParameter("config");
		String filePath = prefix + file;
		try {
			//基础配置
			FileInputStream istream = new FileInputStream(filePath);
			Config.load(istream);
			istream.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取配置属性文件中的属性
	 * 该方法读取的属性文件是写死的，不建议使用，只用做测试
	 */
	public static String getProperties4j(String properties) {
		CompositeConfiguration config = new CompositeConfiguration();
		try {
			config.addConfiguration(new PropertiesConfiguration("config.properties"));
		} catch (ConfigurationException e) {
			e.printStackTrace();
		}
		return config.getString(properties);
	}
	
	/**
	 * 获取配置属性文件中的属性
	 * 该方法读取的属性文件是写死的，不建议使用，只用做测试
	 */
	public static String getProperties4j(String properties,String defaultValue) {
		CompositeConfiguration config = new CompositeConfiguration();
		try {
			config.addConfiguration(new PropertiesConfiguration("config.properties"));
		} catch (ConfigurationException e) {
			e.printStackTrace();
		}
		return config.getString(properties, defaultValue);
	}

	public static void main(String[] args) {
		System.out.println(getProperties4j("isValidCode"));
	}
}