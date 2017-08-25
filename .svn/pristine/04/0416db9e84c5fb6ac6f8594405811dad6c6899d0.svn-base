package com.jp.tic.system.dao;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.jp.tic.utils.db.DatabaseUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.security.MD5Tool;
/**
 * IO工具类
 * @author 梁石光
 * @datetime 2013-05-30
 */
@SuppressWarnings("serial")
@Repository
public class BaseDao extends HibernateDaoSupport {

	private static final Logger log = Logger.getLogger(BaseDao.class);

	@Resource(name="sessionFactory")
	public void setSuperSessionFactory(SessionFactory sessionFactory) {
	super.setSessionFactory(sessionFactory);
	}

	
	/**
	 * POJO保存
	 * 
	 * @param pojo
	 */
	public void save(Object pojo) {
		StackTraceElement[] ste = new Throwable().getStackTrace();
		StringBuffer CallStack = new StringBuffer();
		for (int i = 0; i < ste.length; i++) {
			CallStack.append(ste[i].toString() + " | ");
			if (i > 1)
				break;
		}
		ste = null;
		String press = MD5Tool.getMD5String();
		log.info(press + "执行路径：" + CallStack.toString());
		log.info(press + "保存：" + pojo.getClass().getName());
		Date startDate = new Date();
		try {
			getHibernateTemplate().save(pojo);
		} catch (RuntimeException re) {
			log.error("保存异常", re);
			throw re;
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate) + "\n");
	}

	/**
	 * POJO删除
	 * 
	 * @param pojo
	 */
	public void delete(Object pojo) {
		StackTraceElement[] ste = new Throwable().getStackTrace();
		StringBuffer CallStack = new StringBuffer();
		for (int i = 0; i < ste.length; i++) {
			CallStack.append(ste[i].toString() + " | ");
			if (i > 1)
				break;
		}
		ste = null;
		String press = MD5Tool.getMD5String();
		log.info(press + "执行路径：" + CallStack.toString());
		log.info(press + "删除：" + pojo.getClass().getName());
		Date startDate = new Date();
		try {
			getHibernateTemplate().delete(pojo);
		} catch (RuntimeException re) {
			log.error("删除异常", re);
			throw re;
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate) + "\n");
	}

	/**
	 * 查询POJO主键ID的记录
	 * 
	 * @param pojo
	 * @param id
	 * @param pojoPackage
	 * @return
	 */
	public Object findById(Serializable id, String pojoPackage) {
		StackTraceElement[] ste = new Throwable().getStackTrace();
		StringBuffer CallStack = new StringBuffer();
		for (int i = 0; i < ste.length; i++) {
			CallStack.append(ste[i].toString() + " | ");
			if (i > 1)
				break;
		}
		ste = null;
		String press = MD5Tool.getMD5String();
		log.info(press + "执行路径：" + CallStack.toString());
		log.info(press + "查询" + pojoPackage + "主键为" + id + "记录");
		Date startDate = new Date();
		Object obj = null;
		try {
			obj = getHibernateTemplate().get(pojoPackage, id);
		} catch (RuntimeException re) {
			log.error("查询" + pojoPackage + "主键为" + id + "记录异常", re);
			throw re;
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate) + "\n");
		return obj;
	}

	/**
	 * 查询POJO所有记录
	 * 
	 * @param pojoName
	 * @return
	 */
	public List findAll(String pojoName) {
		StackTraceElement[] ste = new Throwable().getStackTrace();
		StringBuffer CallStack = new StringBuffer();
		for (int i = 0; i < ste.length; i++) {
			CallStack.append(ste[i].toString() + " | ");
			if (i > 1)
				break;
		}
		ste = null;
		String press = MD5Tool.getMD5String();
		log.info(press + "执行路径：" + CallStack.toString());
		log.info(press + "查询" + pojoName + "所有记录");
		Date startDate = new Date();
		List list = null;
		try {
			String queryString = "from " + pojoName;
			list = getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("查询" + pojoName + "所有记录异常", re);
			throw re;
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate) + "\n");
		return list;
	}

	/**
	 * 更新POJO
	 * 
	 * @param pojo
	 * @return
	 */
	public Object update(Object pojo) {
		StackTraceElement[] ste = new Throwable().getStackTrace();
		StringBuffer CallStack = new StringBuffer();
		for (int i = 0; i < ste.length; i++) {
			CallStack.append(ste[i].toString() + " | ");
			if (i > 1)
				break;
		}
		ste = null;
		String press = MD5Tool.getMD5String();
		log.info(press + "执行路径：" + CallStack.toString());
		log.info(press + "更新：" + pojo.getClass().getName());
		Date startDate = new Date();
		Object obj = null;
		try {
			obj = getHibernateTemplate().merge(pojo);
		} catch (RuntimeException re) {
			log.error("更新" + pojo.getClass().getName() + "异常", re);
			throw re;
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate) + "\n");
		return obj;
	}

	/**
	 * 普通SQL查询
	 * 
	 * @param sql
	 * @return
	 */
	public List queryBySql(String sql) {
		return DatabaseUtil.queryForList(sql);
	}
	
	/**
	 * 普通SQL查询
	 * 
	 * @param sql
	 * @return
	 */
	public List queryBySql1(String sql) {
		return DatabaseUtil.queryForList1(sql);
	}

	/**
	 * 分页SQL查询,如果是比较复杂的sql,或者是数据量比较多的表，建议不要使用此方法
	 * 否则执行效率可能会变慢，建议自己写方法，根据情况，改善自己的查询
	 * @param sql
	 * @return
	 */
	public List queryPageListBySql(String sql, int page, int limit) {
		return DatabaseUtil.queryForListByPage(sql, page, limit);
	}

	/**
	 * 获取表字段信息  
	 * 
	 * @param tbName
	 * @return
	 */
	public List queryColumnsForList(String sql) {
		return DatabaseUtil.queryColumnsForList(sql);
	}

	/**
	 * 执行SQL,把单行结果以Map类型返回
	 * @param sql
	 * @return
	 */
	public Map queryForMap(String sql) {
		return DatabaseUtil.queryForMap(sql);
	}

	/**
	 * 单条更新
	 * 
	 * @param sql
	 * @return
	 */
	public int updateBySql(String sql) throws RuntimeException {
		return DatabaseUtil.updateDateBase(sql);
	}

	/**
	 * 批量更新
	 * @param sqlArray  SQL数组
	 * @return
	 * @throws RuntimeException
	 */
	public int updateBatchSql(String[] sqlArray) throws RuntimeException {
		return DatabaseUtil.updateBatchBase(sqlArray);
	}

	/**
	 * 调用获取主键存储过程
	 * 
	 */
	public String callIdGenratorProc2(String tableName) {
		return DatabaseUtil.getKeyId(tableName);
	}
	
	/**
	 * 调用获取主键存储过程，根据规则生成流水号
	 * 对应的规则表在T_SYS_SN_RULE
	 */
	public String callIdGenratorProc(String ruleId) {
		return DatabaseUtil.getKeyByRule(ruleId);
	}
	
	/**
	 * 获取设备统计信息（私有）
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List queryDeviceStatisticsReport(Map<String, String> param) {
		return DatabaseUtil.queryDeviceStatisticsReport(param);
	}
	
	/**
	 * 调用卡口在线统计和数据接收统计存储过程
	 * @param domain
	 * @return
	 */
	public void loadMountDataStatusProc() {
		DatabaseUtil.loadMountDataStatusProc();
	}
	
	/**
	 * 调用卡口在线统计和数据接收统计存储过程
	 * @param dateStr 时间格式：yyyy-mm-dd HH
	 * @return
	 */
	public void statisticsMountAndDataProc(String dateStr) {
		DatabaseUtil.statisticsMountAndDataProc(dateStr);
	}
	
	/**
	 * 调用卡口在线统计和数据接收统计存储过程,按天统计
	 * @param dateStr 时间格式：yyyy-mm-dd
	 * @return
	 */
	public void statisticsMountAndDataDayProc(String dateStr) {
		DatabaseUtil.statisticsMountAndDataDayProc(dateStr);
	}
	
	/**
	 * 数据转移
	 */
	public void transferData() {
		DatabaseUtil.transferData();
	}
}