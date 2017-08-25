package com.jp.tic.utils.db;

import java.sql.Connection;

import javax.sql.DataSource;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.orm.hibernate3.LocalSessionFactoryBean;

import com.jp.tic.common.util.SpringApplicationContextUtils;
import com.jp.tic.utils.cons.Constants;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.log.LogOperateUtil;

/**
 * 数据库连接工具类
 * @author 梁石光
 * @datetime 2013-05-30
 */
public class DatabaseConnection {

	private static ApplicationContext ctx; //上下文
	private static DataSource defaultDataSource; //默认数据源
	private static DataSource reportDataSource; //默认数据源
	private static DataSource nsDataSource; //默认数据源

	/**
	 * 加载applicationcontext.xml
	 */
	static {
	    //ctx = WebApplicationContextUtils.getWebApplicationContext(ServletActionContext.getServletContext());
	    //ctx = SpringContextUtils.getApplicationContext();
	    //System.out.println("====================================+++");
		//ctx = new ClassPathXmlApplicationContext("resource/applicationContext-commons.xml");
		ctx = SpringApplicationContextUtils.getContext();
	}

	/**
	 * 获取默认的数据源
	 * @return
	 */
	public static synchronized Connection getConnection() {
		String CallStack = LogOperateUtil.logCallStack();
		try {
			if (defaultDataSource == null) {
				defaultDataSource = (DataSource) ctx.getBean("centerDataSource");
			}
			return defaultDataSource.getConnection();
		} catch (Exception e) {
			e.printStackTrace();
			LogOperateUtil.logSQLError(e, "", CallStack);
		}
		return null;
	}
	
	/**
	 * 获取默认的报表服务器数据源
	 * @return
	 */
	public static synchronized Connection getReportConnection() {
		String CallStack = LogOperateUtil.logCallStack();
		try {
			if (reportDataSource == null) {
			reportDataSource=null;
				reportDataSource = (DataSource) ctx.getBean("reportDataResource");
			}
			return reportDataSource.getConnection();
		} catch (Exception e) {
			e.printStackTrace();
			LogOperateUtil.logSQLError(e, "", CallStack);
		}
		return null;
	}
	
	/**
	 * 获取默认的报表服务器数据源
	 * @return
	 */
	public static synchronized Connection getNsDBConnection() {
		String CallStack = LogOperateUtil.logCallStack();
		try {
			if (nsDataSource == null) {
				nsDataSource = (DataSource) ctx.getBean("centerDataSource");
			}
			return nsDataSource.getConnection();
		} catch (Exception e) {
			e.printStackTrace();
			LogOperateUtil.logSQLError(e, "", CallStack);
		}
		return null;
	}

	/**
	 * @Description      根据传入的属于获取属性值  
	 * @param @param     property
	 * @return String    属性值 
	 * @throws
	 */
	public static synchronized String getApplicationContextProperty(String bean, String property) {
		try {
			LocalSessionFactoryBean sf = (LocalSessionFactoryBean) ctx.getBean(bean);
			return sf.getHibernateProperties().getProperty(property);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public static synchronized String getHibernateDialect() {
		String dialect = getApplicationContextProperty("&sessionFactory", "hibernate.dialect");

		if (StringUtil.contains(dialect, "Oracle")) {
			return Constants.DATABASE_TYPE_ORACLE;
		} else if (StringUtil.contains(dialect, "Sybase")) {
			return Constants.DATABASE_TYPE_SYSBASE;
		} else if (StringUtil.contains(dialect, "MySQL")) {
			return Constants.DATABASE_TYPE_MYSQL;
		}
		return null;
	}

	public static void main(String[] args) {
		System.out.println(getConnection());
	}
}