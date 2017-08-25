package com.jp.tic.utils.db;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.jp.tic.utils.cons.Constants;
import com.jp.tic.utils.json.JackJson;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.security.MD5Tool;

public class DatabaseUtil {
	private static final Log log = LogFactory.getLog(DatabaseUtil.class);

	/**
	 * 获取链接
	 * @param domain
	 * @return
	 */
	public static synchronized Connection getConnection(String domain) {
		Connection connection = null;
		try {
			connection = DatabaseConnection.getConnection();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return connection;
	}

	/**
	 * 处理SQL异常信息，日志记录、打印、抛异常
	 */
	public static void logSQLError(String message, Exception e, String press) {
		log.error(press + message + ": " + e.getMessage());
		e.printStackTrace();
	}

	/**
	 * 处理SQL异常信息，日志记录、打印、抛异常
	 */
	public static void logSQLErrorForPage(String message, String press) {
		log.error(press + message);
	}

	/**
	 * 简单SQL查询  
	 * 
	 * @param sql
	 * @return
	 */
	public static List queryForList(String sql, String domain) {
		StackTraceElement[] ste = new Throwable().getStackTrace();
		StringBuffer CallStack = new StringBuffer();
		for (int i = 0; i < ste.length; i++) {
			CallStack.append(ste[i].toString() + " | ");
			if (i > 1)
				break;
		}
		ste = null;
		String press = MD5Tool.getMD5String();
		printPressAndSql(CallStack,press,sql);
		Date startDate = new Date();
		Connection conn = null;
		Statement st = null;
		ResultSet rs = null;
		List<Map> tempList = new ArrayList<Map>();
		try {
			conn = getConnection(domain);
			st = conn.createStatement();
			rs = st.executeQuery(sql);
			ResultSetMetaData meta = rs.getMetaData();
			int columnCount = meta.getColumnCount();
			while (rs.next()) {
				Map<String, String> map = new LinkedHashMap<String, String>();
				for (int i = 1; i <= columnCount; i++) {
					String colName = meta.getColumnLabel(i);
					String columeTypeName = meta.getColumnTypeName(i);
                    String colValue = "datetime".equalsIgnoreCase(columeTypeName) ? StringUtil.formatDateTime(rs.getString(i)) : rs.getString(i);
					map.put(colName, colValue);
				}
				tempList.add(map);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, st, rs);
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate));
		return tempList;
	}

	/**
	 * 简单SQL查询  
	 * 
	 * @param sql
	 * @return
	 */
	public static List queryForList(String sql) {
		StackTraceElement[] ste = new Throwable().getStackTrace();
		StringBuffer CallStack = new StringBuffer();
		for (int i = 0; i < ste.length; i++) {
			CallStack.append(ste[i].toString() + " | ");
			if (i > 1)
				break;
		}
		ste = null;
		String press = MD5Tool.getMD5String();
		printPressAndSql(CallStack,press,sql);
		Date startDate = new Date();
		Connection conn = null;
		Statement st = null;
		ResultSet rs = null;
		List<Map> tempList = new ArrayList<Map>();
		try {
			conn = getConnection("");
			st = conn.createStatement();
			rs = st.executeQuery(sql);
			ResultSetMetaData meta = rs.getMetaData();
			int columnCount = meta.getColumnCount();
			int rowId = 1;
			while (rs.next()) {
				Map<String, String> map = new LinkedHashMap<String, String>();
				//map.put("rowId", rowId + "");
				for (int i = 1; i <= columnCount; i++) {
					String colName = meta.getColumnLabel(i);
					String columeTypeName = meta.getColumnTypeName(i);
                    String colValue = "datetime".equalsIgnoreCase(columeTypeName) ? StringUtil.formatDateTime(rs.getString(i)) : rs.getString(i);
					map.put(colName, colValue);
				}
				tempList.add(map);
				rowId++;
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, st, rs);
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate));
		return tempList;
	}
	
	/**
	 * 简单SQL查询  
	 * 
	 * @param sql
	 * @return
	 */
	public static List queryForList1(String sql) {
		StackTraceElement[] ste = new Throwable().getStackTrace();
		StringBuffer CallStack = new StringBuffer();
		for (int i = 0; i < ste.length; i++) {
			CallStack.append(ste[i].toString() + " | ");
			if (i > 1)
				break;
		}
		ste = null;
		String press = MD5Tool.getMD5String();
		printPressAndSql(CallStack,press,sql);
		Date startDate = new Date();
		Connection conn = null;
		Statement st = null;
		ResultSet rs = null;
		List<Map> tempList = new ArrayList<Map>();
		try {
			conn = getConnection("");
			st = conn.createStatement();
			rs = st.executeQuery(sql);
			ResultSetMetaData meta = rs.getMetaData();
			int columnCount = meta.getColumnCount();
			int rowId = 1;
			while (rs.next()) {
				Map<String, String> map = new LinkedHashMap<String, String>();
				//map.put("rowId", rowId + "");
				for (int i = 1; i <= columnCount; i++) {
					String colName = meta.getColumnLabel(i);
					String columeTypeName = meta.getColumnTypeName(i);
                    String colValue = "datetime".equalsIgnoreCase(columeTypeName) ? StringUtil.formatDateTime1(rs.getString(i)) : rs.getString(i);
					map.put(colName, colValue);
				}
				tempList.add(map);
				rowId++;
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, st, rs);
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate));
		return tempList;
	}

	/**
	 * 分页SQL查询
	 * @param sql
	 * @return
	 */
	public static List queryForListByPage(String sql, int page, int limit, String domain) {
		StackTraceElement[] ste = new Throwable().getStackTrace();
		StringBuffer CallStack = new StringBuffer();
		for (int i = 0; i < ste.length; i++) {
			CallStack.append(ste[i].toString() + " | ");
			if (i > 1)
				break;
		}
		ste = null;
		String press = MD5Tool.getMD5String();
		printPressAndSql(CallStack,press,sql);
		Date startDate = new Date();
		Connection conn = null;
		ResultSet rs = null;
		List<Map> tempList = new ArrayList<Map>();
		try {
			conn = getConnection(domain);
			conn.setAutoCommit(true);
			String dialect = DatabaseConnection.getHibernateDialect();

			if (Constants.DATABASE_TYPE_SYSBASE.equals(dialect) || Constants.DATABASE_TYPE_MYSQL.equals(dialect)) {/*sybase,mysql数据库执行存储过程*/
				CallableStatement callsta = conn.prepareCall("{call GetDataByPageEoms(?,?,?)}");
				callsta.setString(1, sql);
				callsta.setInt(2, (page - 1) * limit);
				callsta.setInt(3, limit);
				rs = callsta.executeQuery();
			}else {/*oracle数据库执行存储过程*/
				CallableStatement callsta = conn.prepareCall("{call GetDataByPageEoms(?,?,?,?)}");
				callsta.registerOutParameter(1, oracle.jdbc.OracleTypes.CURSOR);
				callsta.setString(2, sql);
				callsta.setInt(3, limit);
				callsta.setInt(4, page);
				callsta.execute();
				rs = (ResultSet) callsta.getObject(1);
			}
			ResultSetMetaData meta = rs.getMetaData();
			int columnCount = meta.getColumnCount();
			int rowId = 1;
			while (rs.next()) {
				Map<String, String> map = new LinkedHashMap<String, String>();
				//map.put("rowId", rowId + "");
				for (int i = 1; i <= columnCount; i++) {
					String colName = meta.getColumnLabel(i);
					String columeTypeName = meta.getColumnTypeName(i);
                    String colValue = "datetime".equalsIgnoreCase(columeTypeName) ? StringUtil.formatDateTime(rs.getString(i)) : rs.getString(i);
					map.put(colName, colValue);
				}
				tempList.add(map);
				rowId++;
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, null, rs);
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate));
		return tempList;
	}

	/**
	 * 分页SQL查询
	 * @param sql
	 * @return
	 */
	public static List queryForListByPage(String sql, int page, int limit) {
		StackTraceElement[] ste = new Throwable().getStackTrace();
		StringBuffer CallStack = new StringBuffer();
		for (int i = 0; i < ste.length; i++) {
			CallStack.append(ste[i].toString() + " | ");
			if (i > 1)
				break;
		}
		ste = null;
		String press = MD5Tool.getMD5String();

		printPressAndSql(CallStack,press,sql);
		Date startDate = new Date();
		Connection conn = null;
		ResultSet rs = null;
		List<Map> tempList = new ArrayList<Map>();
		try {
			conn = getConnection("");
			conn.setAutoCommit(true);
			String dialect = DatabaseConnection.getHibernateDialect();

			if (Constants.DATABASE_TYPE_SYSBASE.equals(dialect) || Constants.DATABASE_TYPE_MYSQL.equals(dialect)) {/*sybase,mysql数据库执行存储过程*/
				CallableStatement callsta = conn.prepareCall("{call GetDataByPageEoms(?,?,?)}");
				callsta.setString(1, sql);
				callsta.setInt(2, (page - 1) * limit);
				callsta.setInt(3, limit);
				rs = callsta.executeQuery();
			}else {/*oracle数据库执行存储过程*/
				CallableStatement callsta = conn.prepareCall("{call GetDataByPageEoms(?,?,?,?)}");
				callsta.registerOutParameter(1, oracle.jdbc.OracleTypes.CURSOR);
				callsta.setString(2, sql);
				callsta.setInt(3, limit);
				callsta.setInt(4, page);
				callsta.execute();
				rs = (ResultSet) callsta.getObject(1);
			}
			ResultSetMetaData meta = rs.getMetaData();
			int columnCount = meta.getColumnCount();
			while (rs.next()) {
				Map<String, String> map = new LinkedHashMap<String, String>();
				for (int i = 1; i <= columnCount; i++) {
					String colName = meta.getColumnLabel(i);
					String columeTypeName = meta.getColumnTypeName(i);
                    String colValue = "datetime".equalsIgnoreCase(columeTypeName) ? StringUtil.formatDateTime(rs.getString(i)) : rs.getString(i);
					map.put(colName, colValue);
				}
				tempList.add(map);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, null, rs);
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate));
		return tempList;
	}
	
	/**
	 * 调用统一打印的语句
	 * @param CallStack
	 * @param press
	 * @param sql
	 */
	private static void printPressAndSql(StringBuffer CallStack,String press, String sql) {
		log.info(press + "执行路径：" + CallStack.toString());
		log.info(press + "执行脚本：" + sql);
	}

	/**
	 * 19服务器的分页SQL查询
	 * @param sql
	 * @return
	 */
	public static List queryListByPageForReport(String sql, int page, int limit) {
		StackTraceElement[] ste = new Throwable().getStackTrace();
		StringBuffer CallStack = new StringBuffer();
		for (int i = 0; i < ste.length; i++) {
			CallStack.append(ste[i].toString() + " | ");
			if (i > 1)
				break;
		}
		ste = null;
		String press = MD5Tool.getMD5String();
		printPressAndSql(CallStack,press,sql);
		Date startDate = new Date();
		Connection conn = null;
		ResultSet rs = null;
		List<Map> tempList = new ArrayList<Map>();
		try {
			conn = DatabaseConnection.getReportConnection();
			conn.setAutoCommit(true);
			String dialect = DatabaseConnection.getHibernateDialect();

			if (Constants.DATABASE_TYPE_SYSBASE.equals(dialect) || Constants.DATABASE_TYPE_MYSQL.equals(dialect)) {/*sybase,mysql数据库执行存储过程*/
				CallableStatement callsta = conn.prepareCall("{call GetDataByPageEoms(?,?,?)}");
				callsta.setString(1, sql);
				callsta.setInt(2, (page - 1) * limit);
				callsta.setInt(3, limit);
				rs = callsta.executeQuery();
			} else {/*oracle数据库执行存储过程*/
				CallableStatement callsta = conn.prepareCall("{call GetDataByPageEoms(?,?,?,?)}");
				callsta.registerOutParameter(1, oracle.jdbc.OracleTypes.CURSOR);
				callsta.setString(2, sql);
				callsta.setInt(3, limit);
				callsta.setInt(4, page);
				callsta.execute();
				rs = (ResultSet) callsta.getObject(1);
			}
			ResultSetMetaData meta = rs.getMetaData();
			int columnCount = meta.getColumnCount();
			while (rs.next()) {
				Map<String, String> map = new LinkedHashMap<String, String>();
				for (int i = 1; i <= columnCount; i++) {
					String colName = meta.getColumnLabel(i);
					String columeTypeName = meta.getColumnTypeName(i);
                    String colValue = "datetime".equalsIgnoreCase(columeTypeName) ? StringUtil.formatDateTime(rs.getString(i)) : rs.getString(i);
					map.put(colName, colValue);
				}
				tempList.add(map);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, null, rs);
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate));
		return tempList;
	}

	/**
	 * 更新数据库
	 * @param sql
	 * @return
	 */
	public static int updateDateBase(String sql, String domain) {
		StackTraceElement[] ste = new Throwable().getStackTrace();
		StringBuffer CallStack = new StringBuffer();
		for (int i = 0; i < ste.length; i++) {
			CallStack.append(ste[i].toString() + " | ");
			if (i > 1)
				break;
		}
		ste = null;
		String press = MD5Tool.getMD5String();
		printPressAndSql(CallStack,press,sql);
		Date startDate = new Date();
		Connection conn = null;
		Statement st = null;
		int num = 0;
		try {
			conn = getConnection(domain);
			st = conn.createStatement();
			num = st.executeUpdate(sql);
			conn.commit();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, st, null);
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate));
		return num;
	}

	/**
	 * 更新数据库
	 * @param sql
	 * @return
	 */
	public static int updateDateBase(String sql) {
		StackTraceElement[] ste = new Throwable().getStackTrace();
		StringBuffer CallStack = new StringBuffer();
		for (int i = 0; i < ste.length; i++) {
			CallStack.append(ste[i].toString() + " | ");
			if (i > 1)
				break;
		}
		ste = null;
		String press = MD5Tool.getMD5String();
		printPressAndSql(CallStack,press,sql);
		Date startDate = new Date();
		Connection conn = null;
		Statement st = null;
		int num = 0;
		try {
			conn = getConnection("");
			st = conn.createStatement();
			num = st.executeUpdate(sql);
			conn.commit();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, st, null);
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate));
		return num;
	}

	/**
	 * 批量更新
	 * @param sqlArray
	 * @return
	 */
	public static int updateBatchBase(String[] sqlArray) {
		int flag = 1;
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
		Date startDate = new Date();
		Connection conn = null;
		Statement st = null;
		try {
			conn = getConnection("");
			st = conn.createStatement();
			conn.setAutoCommit(false);
			for (int i = 0; i < sqlArray.length; i++) {
				log.info(press + "执行脚本：" + sqlArray[i]);
				st.addBatch(sqlArray[i]);
			}
			st.executeBatch();
			conn.commit();
			conn.setAutoCommit(true);
		} catch (Exception e) {
			flag = 0;
			try {
				conn.rollback();
			} catch (SQLException e1) {
				e1.printStackTrace();
			}
		} finally {
			free(conn, st, null);
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate) + "\n");
		return flag;
	}

	/**
	 * 批量更新
	 * @param sqlArray
	 * @return
	 */
	public static int updateBatchBase(String[] sqlArray, String domain) {
		int flag = 1;
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
		log.info(press + "执行脚本：" + sqlArray[0]);
		Date startDate = new Date();
		Connection conn = null;
		Statement st = null;
		try {
			conn = getConnection(domain);
			st = conn.createStatement();
			conn.setAutoCommit(false);
			for (int i = 0; i < sqlArray.length; i++) {
				st.addBatch(sqlArray[i]);
			}
			st.executeBatch();
			conn.commit();
			conn.setAutoCommit(true);
		} catch (Exception e) {
			flag = 0;
			try {
				conn.rollback();
			} catch (SQLException e1) {
				e1.printStackTrace();
			}
		} finally {
			free(conn, st, null);
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate) + "\n");
		return flag;
	}

	/**
	 * 执行SQL,把单行结果以Map类型返回
	 * @param sql
	 * @return
	 */
	public static Map<String, Object> queryForMap(String sql, String domain) {
		StackTraceElement[] ste = new Throwable().getStackTrace();
		StringBuffer CallStack = new StringBuffer();
		for (int i = 0; i < ste.length; i++) {
			CallStack.append(ste[i].toString() + " | ");
			if (i > 1)
				break;
		}
		ste = null;
		String press = MD5Tool.getMD5String();
		printPressAndSql(CallStack,press,sql);
		Date startDate = new Date();
		Connection conn = null;
		Statement st = null;
		ResultSet rs = null;
		Map<String, Object> map = null;
		try {
			conn = getConnection(domain);
			st = conn.createStatement();
			rs = st.executeQuery(sql);
			if (rs.next()) {
				ResultSetMetaData meta = rs.getMetaData();
				int columnCount = meta.getColumnCount();
				map = new LinkedHashMap<String, Object>();
				for (int i = 1; i <= columnCount; i++) {
					String colName = meta.getColumnLabel(i);
					String colValue = rs.getString(i);
					map.put(colName, colValue);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			free(conn, st, rs);
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate));
		return map;
	}

	/**
	 * 执行SQL,把单行结果以Map类型返回
	 * @param sql
	 * @return
	 */
	public static Map<String, Object> queryForMap(String sql) {
		StackTraceElement[] ste = new Throwable().getStackTrace();
		StringBuffer CallStack = new StringBuffer();
		for (int i = 0; i < ste.length; i++) {
			CallStack.append(ste[i].toString() + " | ");
			if (i > 1)
				break;
		}
		ste = null;
		String press = MD5Tool.getMD5String();
		printPressAndSql(CallStack,press,sql);
		Date startDate = new Date();
		Connection conn = null;
		Statement st = null;
		ResultSet rs = null;
		Map<String, Object> map = null;
		try {
			conn = getConnection("");
			st = conn.createStatement();
			rs = st.executeQuery(sql);
			if (rs.next()) {
				ResultSetMetaData meta = rs.getMetaData();
				int columnCount = meta.getColumnCount();
				map = new LinkedHashMap<String, Object>();
				for (int i = 1; i <= columnCount; i++) {
					String colName = meta.getColumnLabel(i);
					String colValue = rs.getString(i);
					map.put(colName, colValue);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			free(conn, st, rs);
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate));
		return map;
	}

	/**
	 * 获取主键
	 * @param domain
	 * @return
	 */
	public static String getKeyId(String tableName) {
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
		log.info(press + "执行脚本：{call SP_GET_ID_EX()}");
		Date startDate = new Date();
		Connection conn = null;
		CallableStatement callsta = null;
		Statement st = null;
		ResultSet rs = null;
		String key = null;
		try {
			conn = getConnection("");
			conn.setAutoCommit(true);
			String dialect = DatabaseConnection.getHibernateDialect();

			if (Constants.DATABASE_TYPE_SYSBASE.equals(dialect) || Constants.DATABASE_TYPE_MYSQL.equals(dialect)) {/*sybase,mysql数据库获取主键*/
				callsta = conn.prepareCall("{call SP_GET_ID_EX(?)}");
				callsta.setString(1, tableName);
				rs = callsta.executeQuery();
			}else {/*oracle数据库获取主键*/
				st = conn.createStatement();
				rs = st.executeQuery("select SEQ_COMMON_ID.NEXTVAL from dual");
			}
			if (rs.next()) {
				key = rs.getString(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, st, rs);
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate));
		return key;
	}

	/**
	 * 获取主键
	 * @param domain
	 * @return
	 */
	public static String getKeyId(String domain, String tableName) {
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
		log.info(press + "执行脚本：{call SP_GET_ID_EX()}");
		Date startDate = new Date();
		Connection conn = null;
		CallableStatement callsta = null;
		Statement st = null;
		ResultSet rs = null;
		String key = null;
		try {
			conn = getConnection(domain);
			conn.setAutoCommit(true);
			String dialect = DatabaseConnection.getHibernateDialect();
			if (Constants.DATABASE_TYPE_SYSBASE.equals(dialect) || Constants.DATABASE_TYPE_MYSQL.equals(dialect)) {/*sybase数据库获取主键 mysql数据库获取主键*/
				callsta = conn.prepareCall("{call SP_GET_ID_EX(?)}");
				callsta.setString(1, tableName);
				rs = callsta.executeQuery();
			}else {/*oracle数据库获取主键*/
				st = conn.createStatement();
				rs = st.executeQuery("select SEQ_COMMON_ID.NEXTVAL from dual");
			}
			if (rs.next()) {
				key = rs.getString(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, null, rs);
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate));
		return key;
	}
	
	/**
	 * 获取主键
	 * @param domain
	 * @return
	 */
	public static String getKeyByRule(String ruleId) {
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
		log.info(press + "执行脚本：{call SP_GET_SN(?,?)}");
		Date startDate = new Date();
		Connection conn = null;
		CallableStatement callsta = null;
		Statement st = null;
		ResultSet rs = null;
		String key = null;
		try {
			conn = getConnection("");
			conn.setAutoCommit(true);
			String dialect = DatabaseConnection.getHibernateDialect();

			if (Constants.DATABASE_TYPE_SYSBASE.equals(dialect)) {/*sybase,mysql数据库获取主键*/
				callsta = conn.prepareCall("{call SP_GET_SN(?,?)}");
				callsta.setString(1, ruleId);
				callsta.registerOutParameter(2, java.sql.Types.VARCHAR);
				callsta.executeUpdate();
			}else {/*oracle数据库获取主键*/
				st = conn.createStatement();
				rs = st.executeQuery("select SEQ_COMMON_ID.NEXTVAL from dual");
			}
			key = callsta.getString(2);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, st, rs);
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate));
		return key;
	}

	/**
	 * 获取主键
	 * @param domain
	 * @return
	 */
	public static String getKeyByRule(String domain, String ruleId) {
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
		log.info(press + "执行脚本：{call SP_GET_SN(?,?)}");
		Date startDate = new Date();
		Connection conn = null;
		CallableStatement callsta = null;
		Statement st = null;
		ResultSet rs = null;
		String key = null;
		try {
			conn = getConnection(domain);
			conn.setAutoCommit(true);
			String dialect = DatabaseConnection.getHibernateDialect();
			if (Constants.DATABASE_TYPE_SYSBASE.equals(dialect)) {/*sybase,mysql数据库获取主键*/
				callsta = conn.prepareCall("{call SP_GET_SN(?,?)}");
				callsta.setString(1, ruleId);
				callsta.registerOutParameter(2, java.sql.Types.VARCHAR);
				callsta.executeUpdate();
			}else {/*oracle数据库获取主键*/
				st = conn.createStatement();
				rs = st.executeQuery("select SEQ_COMMON_ID.NEXTVAL from dual");
			}
			key = rs.getString(2);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, null, rs);
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate));
		return key;
	}

	/**
	 * 获取表字段信息  
	 * 
	 * @param sql
	 * @return
	 */
	public static List queryColumnsForList(String sql) {
		StackTraceElement[] ste = new Throwable().getStackTrace();
		StringBuffer CallStack = new StringBuffer();
		for (int i = 0; i < ste.length; i++) {
			CallStack.append(ste[i].toString() + " | ");
			if (i > 1)
				break;
		}
		ste = null;
		String press = MD5Tool.getMD5String();
		printPressAndSql(CallStack,press,sql);
		Date startDate = new Date();
		Connection conn = null;
		Statement st = null;
		ResultSet rs = null;
		List<Map> tempList = new ArrayList<Map>();
		try {
			conn = getConnection("");
			st = conn.createStatement();
			rs = st.executeQuery(sql);
			ResultSetMetaData meta = rs.getMetaData();
			int columnCount = meta.getColumnCount();
			for (int i = 1; i <= columnCount; i++) {
				Map<String, String> map = new LinkedHashMap<String, String>();
				String colName = meta.getColumnLabel(i);
				String colType = meta.getColumnTypeName(i);
				int colSize = meta.getColumnDisplaySize(i);
				int colPrecision = meta.getPrecision(i);
				int colScale = meta.getScale(i);
				int colNull = meta.isNullable(i);
				map.put("colName", colName);
				map.put("colType", colType);
				map.put("colSize", colSize + "");
				map.put("colPrecision", colPrecision + "");
				map.put("colScale", colScale + "");
				map.put("colNull", colNull + "");
				tempList.add(map);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, st, rs);
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate));
		return tempList;
	}

	/**  
	 * 关闭连接资源  
	 * @param conn  
	 */
	public static synchronized void free(Connection conn, Statement st, ResultSet rs) {
		if (rs != null) {
			try {
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		if (st != null) {
			try {
				st.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		if (conn != null) {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

	public static void main(String[] args) {
		List list = queryForList("select * from TB_SYS_MENU");
		String json = JackJson.getBasetJsonData(list);
		System.out.println(json);
	}

	/**
	 * 获取设备统计信息（私有）
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public static List queryDeviceStatisticsReport(Map<String, String> param) {
		StackTraceElement[] ste = new Throwable().getStackTrace();
		StringBuffer CallStack = new StringBuffer();
		for (int i = 0; i < ste.length; i++) {
			CallStack.append(ste[i].toString() + " | ");
			if (i > 1)
				break;
		}
		ste = null;
		String press = MD5Tool.getMD5String();
		Date startDate = new Date();
		Connection conn = null;
		ResultSet rs = null;
		List<Map> tempList = new ArrayList<Map>();
		try {
			conn = getConnection("");
			conn.setAutoCommit(true);
			CallableStatement callsta = conn.prepareCall("{call " + param.get("produce") + "}");
			callsta.setString(1, "");
			callsta.setString(2, "");
			callsta.setString(3, param.get("areaId"));
			callsta.setString(4, param.get("deptId"));
			callsta.setString(5, param.get("mountId"));
			callsta.registerOutParameter(6, oracle.jdbc.OracleTypes.CURSOR);
		    callsta.executeQuery();
			rs = (ResultSet) callsta.getObject(6);
			ResultSetMetaData meta = rs.getMetaData();
			int columnCount = meta.getColumnCount();
			while (rs.next()) {
				Map<String, String> map = new LinkedHashMap<String, String>();
				for (int i = 1; i <= columnCount; i++) {
					String colName = meta.getColumnLabel(i);
					String columeTypeName = meta.getColumnTypeName(i);
                    String colValue = "datetime".equalsIgnoreCase(columeTypeName) ? StringUtil.formatDateTime(rs.getString(i)) : rs.getString(i);
					map.put(colName, colValue);
				}
				tempList.add(map);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, null, rs);
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate));
		return tempList;
	}
	
	/**
	 * 制造假数据存储过程
	 * @return
	 */
	public static void loadMountDataStatusProc() {
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
		log.info(press + "执行脚本：{call TEST_MAKE_DATAS()}");
		Date startDate = new Date();
		Connection conn = null;
		CallableStatement callsta = null;
		Statement st = null;
		ResultSet rs = null;
		try {
			conn = getConnection("");
			conn.setAutoCommit(true);
			callsta = conn.prepareCall("{call TEST_MAKE_DATAS()}");
			callsta.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, st, rs);
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate));
	}
	
	/**
	 * 调用卡口在线统计和数据接收统计存储过程，按时统计
	 * @param dateStr 时间格式：yyyy-mm-dd HH
	 * @return
	 */
	public static void statisticsMountAndDataProc(String dateStr) {
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
		log.info(press + "执行脚本：{call JP_MOUNT_STATUS_STATISTICS(?)}");
		Date startDate = new Date();
		Connection conn = null;
		CallableStatement callsta = null;
		Statement st = null;
		ResultSet rs = null;
		try {
			conn = getConnection("");
			conn.setAutoCommit(true);
			callsta = conn.prepareCall("{call JP_MOUNT_STATUS_STATISTICS(?)}");
			callsta.setString(1, dateStr);
			callsta.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, st, rs);
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate));
	}
	
	/**
	 * 调用卡口在线统计和数据接收统计存储过程,按天统计
	 * @param dateStr 时间格式：yyyy-mm-dd
	 * @return
	 */
	public static void statisticsMountAndDataDayProc(String dateStr) {
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
		log.info(press + "执行脚本：{call JP_STATUS_DAY_STATISTICS(?)}");
		Date startDate = new Date();
		Connection conn = null;
		CallableStatement callsta = null;
		Statement st = null;
		ResultSet rs = null;
		try {
			conn = getConnection("");
			conn.setAutoCommit(true);
			callsta = conn.prepareCall("{call JP_STATUS_DAY_STATISTICS(?)}");
			callsta.setString(1, dateStr);
			callsta.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, st, rs);
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate));
	}
	
	/**
	 * 数据转移
	 * @param dateStr 时间格式：yyyy-mm-dd HH
	 * @return
	 */
	public static void transferData() {
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
		log.info(press + "执行脚本：{call JP_CAR_TEMP_DATAS}");
		Date startDate = new Date();
		Connection conn = null;
		CallableStatement callsta = null;
		Statement st = null;
		ResultSet rs = null;
		try {
			conn = getConnection("");
			conn.setAutoCommit(true);
			callsta = conn.prepareCall("{call JP_CAR_TEMP_DATAS}");
			callsta.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, st, rs);
		}
		Date endDate = new Date();
		log.info(press + "执行时间：" + StringUtil.getTimeInMillis(startDate, endDate));
	}
}
