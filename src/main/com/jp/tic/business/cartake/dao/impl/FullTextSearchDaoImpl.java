package com.jp.tic.business.cartake.dao.impl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jp.tic.business.cartake.dao.FullTextSearchDao;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.system.util.SQLUtil;
import com.jp.tic.utils.lang.StringUtil;

@SuppressWarnings("unchecked")
@Repository
public class FullTextSearchDaoImpl extends BaseDao implements FullTextSearchDao {

	/**
	 * 查询本地车辆库信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryLoaclCarInfos(Map<String, String> param) throws Exception {
		int pageStart = StringUtil.toInteger(param.get("page.start"));
        int rows = StringUtil.toInteger(param.get("page.limit"));
        String urlStr = "jdbc:oracle:thin:@10.235.36.161:1521:GZDB011";
        String userName="KK";
        String password="KK";
        String tableName="JC_BAZY_G.G_JDCL";
        Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
 		Boolean localFlag = MapGetUtils.getBoolean(config, "carNum.local");
 		if(localFlag){
 			urlStr = MapGetUtils.getString(config, "carNum.dburl");
 			userName=MapGetUtils.getString(config, "carNum.userName");
 			password=MapGetUtils.getString(config, "carNum.password");
 			tableName=MapGetUtils.getString(config, "carNum.table");
 		}
		Class.forName("oracle.jdbc.OracleDriver");
		Connection conn = DriverManager.getConnection(urlStr, userName,password);
		Statement st = null;
		ResultSet rs = null;
		List<Map<String, String>> dataList = new ArrayList<Map<String,String>>();
		try {
			StringBuffer sqlBuffer = new StringBuffer();
			sqlBuffer.append("select t.HPHM,t.CSYS,t.HPZL,t.CLLX as CLXH,t.SYR as JDCSYR,t.LXDH as LXFS,t.SFZMHM as SFZH, " +
					"t.CLSBDH,t.CLPP1,t.ZZXXDZ as DJZZXZ from "+tableName+" t where 1=1");
			if (StringUtil.checkStr(param.get("fuzzyFlag")) && StringUtil.equals(param.get("fuzzyFlag"), "fuzzy")) {
				if (StringUtil.checkStr(param.get("carNum"))) {
					if (!param.get("carNum").contains("*") && !param.get("carNum").contains("?")) {
						sqlBuffer.append(" and t.HPHM like '" + param.get("carNum") + "%'");
					}
					sqlBuffer.append(" and regexp_like(t.HPHM, " + SQLUtil.getCarNumLikeCondition(param.get("carFNum"), param.get("carBNum")) + ")");
				}
			} else {
				if (StringUtil.checkStr(param.get("carNum"))) {
					sqlBuffer.append(" and t.HPHM = '" + param.get("carNum") + "'");
				}
			}
			if (StringUtil.checkStr(param.get("CLPP1"))) {
				sqlBuffer.append(" and t.CLPP1 = '" + param.get("CLPP1") + "'");
			}
			if (StringUtil.checkStr(param.get("carColor"))) {
				sqlBuffer.append(" and t.CSYS = '" + param.get("carColor") + "'");
			}
			if (StringUtil.checkStr(param.get("carType"))) {
				sqlBuffer.append(" and t.CLLX = '" + param.get("carType") + "'");
			}
			if (StringUtil.checkStr(param.get("SFZH"))) {
				sqlBuffer.append(" and t.SFZMHM = '" + param.get("SFZH") + "'");
			}
			if (StringUtil.checkStr(param.get("JDCSYR"))) {
				sqlBuffer.append(" and t.SYR = '" + param.get("JDCSYR") + "'");
			}
			if (StringUtil.checkStr(param.get("HPZL")) && !StringUtil.equals(param.get("HPZL"), "-1")) {
				sqlBuffer.append(" and t.HPZL = '" + param.get("HPZL") + "'");
			}
			if (StringUtil.checkStr(param.get("CLSBDH"))) {
				sqlBuffer.append(" and t.CLSBDH = '" + param.get("CLSBDH") + "'");
			}
			/*sqlBuffer.append("select t.HPHM,t.CSYS,t.HPZL,t.CLLX as CLXH,t.SYR as JDCSYR,t.LXDH as LXFS,t.SFZMHM as SFZH, " +
					"t.CLSBDH,t.CLPP1,t.ZZXXDZ as DJZZXZ from G_JDCL t where 1=1");
			if (StringUtil.checkStr(param.get("carNum"))) {
				sqlBuffer.append(" and t.HPHM like '%" + param.get("carNum") + "%'");
			}
			if (StringUtil.checkStr(param.get("CLPP1"))) {
				sqlBuffer.append(" and t.CLPP1 = '" + param.get("CLPP1") + "'");
			}
			if (StringUtil.checkStr(param.get("carColor"))) {
				sqlBuffer.append(" and t.CSYS = '" + param.get("carColor") + "'");
			}
			if (StringUtil.checkStr(param.get("carType"))) {
				sqlBuffer.append(" and t.CLLX = '" + param.get("carType") + "'");
			}
			if (StringUtil.checkStr(param.get("SFZH"))) {
				sqlBuffer.append(" and t.SFZMHM = '" + param.get("SFZH") + "'");
			}
			if (StringUtil.checkStr(param.get("JDCSYR"))) {
				sqlBuffer.append(" and t.SYR = '" + param.get("JDCSYR") + "'");
			}
			if (StringUtil.checkStr(param.get("HPZL")) && !StringUtil.equals(param.get("HPZL"), "-1")) {
				sqlBuffer.append(" and t.HPZL = '" + param.get("HPZL") + "'");
			}
			if (StringUtil.checkStr(param.get("CLSBDH"))) {
				sqlBuffer.append(" and t.CLSBDH = '" + param.get("CLSBDH") + "'");
			}*/
			String pageSql = this.initPageSql(pageStart, rows, sqlBuffer.toString());
			st = conn.createStatement();
			rs = st.executeQuery(pageSql.toString());
			ResultSetMetaData meta = rs.getMetaData();
			int columnCount = meta.getColumnCount();
			Map<String, String> map = null;
			while (rs.next()) {
				map = new LinkedHashMap<String, String>();
				for (int i = 1; i <= columnCount; i++) {
					String colName = meta.getColumnLabel(i);
					String columeTypeName = meta.getColumnTypeName(i);
                    String colValue = "datetime".equalsIgnoreCase(columeTypeName) ? StringUtil.formatDateTime(rs.getString(i)) : rs.getString(i);
					map.put(colName, colValue);
				}
				dataList.add(map);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, st, rs);
		}
		return dataList;
	}
	
	/**
	 * 统计本地车辆库信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countLoaclCarInfos(Map<String, String> param) throws Exception {
//		Class.forName("oracle.jdbc.OracleDriver");
//		String urlStr = "jdbc:oracle:thin:@10.235.36.161:1521:GZDB011";
//		//String urlStr = "jdbc:oracle:thin:@172.31.100.28:1521:SICSDB";
//		Connection conn = DriverManager.getConnection(urlStr, "KK", "KK");
//		//Connection conn = DriverManager.getConnection(urlStr, "si01", "jp2011");
		 String urlStr = "jdbc:oracle:thin:@10.235.36.161:1521:GZDB011";
	        String userName="KK";
	        String password="KK";
	        String tableName="JC_BAZY_G.G_JDCL";
	        Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
	 		Boolean localFlag = MapGetUtils.getBoolean(config, "carNum.local");
	 		if(localFlag){
	 			urlStr = MapGetUtils.getString(config, "carNum.dburl");
	 			userName=MapGetUtils.getString(config, "carNum.userName");
	 			password=MapGetUtils.getString(config, "carNum.password");
	 			tableName=MapGetUtils.getString(config, "carNum.table");
	 		}
			Class.forName("oracle.jdbc.OracleDriver");
			Connection conn = DriverManager.getConnection(urlStr, userName,password);
		Statement st = null;
		ResultSet rs = null;
		List<Map<String, String>> dataList = new ArrayList<Map<String,String>>();
		try {
			StringBuffer sqlBuffer = new StringBuffer();
			sqlBuffer.append("select count(1) as COUNTS from "+tableName+" t where 1=1");
			if (StringUtil.checkStr(param.get("fuzzyFlag")) && StringUtil.equals(param.get("fuzzyFlag"), "fuzzy")) {
				if (StringUtil.checkStr(param.get("carNum"))) {
					if (!param.get("carNum").contains("*") && !param.get("carNum").contains("?")) {
						sqlBuffer.append(" and t.HPHM like '" + param.get("carNum") + "%'");
					}
					sqlBuffer.append(" and regexp_like(t.HPHM, " + SQLUtil.getCarNumLikeCondition(param.get("carFNum"), param.get("carBNum")) + ")");
				}
			} else {
				if (StringUtil.checkStr(param.get("carNum"))) {
					sqlBuffer.append(" and t.HPHM = '" + param.get("carNum") + "'");
				}
			}
			if (StringUtil.checkStr(param.get("CLPP1"))) {
				sqlBuffer.append(" and t.CLPP1 = '" + param.get("CLPP1") + "'");
			}
			if (StringUtil.checkStr(param.get("carColor"))) {
				sqlBuffer.append(" and t.CSYS = '" + param.get("carColor") + "'");
			}
			if (StringUtil.checkStr(param.get("carType"))) {
				sqlBuffer.append(" and t.CLLX = '" + param.get("carType") + "'");
			}
			if (StringUtil.checkStr(param.get("SFZH"))) {
				sqlBuffer.append(" and t.SFZMHM = '" + param.get("SFZH") + "'");
			}
			if (StringUtil.checkStr(param.get("JDCSYR"))) {
				sqlBuffer.append(" and t.SYR = '" + param.get("JDCSYR") + "'");
			}
			if (StringUtil.checkStr(param.get("HPZL")) && !StringUtil.equals(param.get("HPZL"), "-1")) {
				sqlBuffer.append(" and t.HPZL = '" + param.get("HPZL") + "'");
			}
			if (StringUtil.checkStr(param.get("CLSBDH"))) {
				sqlBuffer.append(" and t.CLSBDH = '" + param.get("CLSBDH") + "'");
			}
			/*sqlBuffer.append("select count(1) as COUNTS from G_JDCL t where 1=1");
			if (StringUtil.checkStr(param.get("carNum"))) {
				sqlBuffer.append(" and t.HPHM like '%" + param.get("carNum") + "%'");
			}
			if (StringUtil.checkStr(param.get("CLPP1"))) {
				sqlBuffer.append(" and t.CLPP1 = '" + param.get("CLPP1") + "'");
			}
			if (StringUtil.checkStr(param.get("carColor"))) {
				sqlBuffer.append(" and t.CSYS = '" + param.get("carColor") + "'");
			}
			if (StringUtil.checkStr(param.get("carType"))) {
				sqlBuffer.append(" t.CLLX = '" + param.get("carType") + "'");
			}
			if (StringUtil.checkStr(param.get("SFZH"))) {
				sqlBuffer.append(" and t.SFZMHM = '" + param.get("SFZH") + "'");
			}
			if (StringUtil.checkStr(param.get("JDCSYR"))) {
				sqlBuffer.append(" and t.SYR = '" + param.get("JDCSYR") + "'");
			}
			if (StringUtil.checkStr(param.get("HPZL")) && !StringUtil.equals(param.get("HPZL"), "-1")) {
				sqlBuffer.append(" and t.HPZL = '" + param.get("HPZL") + "'");
			}
			if (StringUtil.checkStr(param.get("CLSBDH"))) {
				sqlBuffer.append(" and t.CLSBDH = '" + param.get("CLSBDH") + "'");
			}*/
			st = conn.createStatement();
			rs = st.executeQuery(sqlBuffer.toString());
			ResultSetMetaData meta = rs.getMetaData();
			int columnCount = meta.getColumnCount();
			Map<String, String> map = null;
			while (rs.next()) {
				map = new LinkedHashMap<String, String>();
				for (int i = 1; i <= columnCount; i++) {
					String colName = meta.getColumnLabel(i);
					String columeTypeName = meta.getColumnTypeName(i);
                    String colValue = "datetime".equalsIgnoreCase(columeTypeName) ? StringUtil.formatDateTime(rs.getString(i)) : rs.getString(i);
					map.put(colName, colValue);
				}
				dataList.add(map);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, st, rs);
		}
		return dataList;
	}
	
	/**
	 * 组装分页查询语句
	 * @param pageStart 开始位置
	 * @param rows 每行显示多少数据量
	 * @param seachSql 数据查询语句
	 * @return 分页语句
	 */
	public String initPageSql(int pageStart, int rows, String seachSql) {
		StringBuffer pageSql = new StringBuffer(); 
		if (pageStart == 0) {
            pageSql.append("select * from (");
            pageSql.append(seachSql + ") row_ where rownum <=" + rows);
        } else {
            int nextStart = pageStart + rows;
            pageSql.append(" select * from ( select row_.*, rownum rownum_ from (");
            pageSql.append(seachSql + ") row_ where rownum <= " + nextStart +") where rownum_ > " + pageStart);
        }
		return pageSql.toString();
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
	
	/**
	 * 套牌车确认
	 * @param param
	 * @return
	 */
	public int confimTaopaiInfo(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update DIS_FAKE_PLATE set OPERATE_STATUS = 1");
		buffer.append(" where ID in (" + param.get("IDS") + ")");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 本地套牌车确认
	 * @param param
	 * @return
	 */
	public int confimLocalTaopaiInfo(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update DIS_FAKE_LOCAL_PLATE set OPERATE_STATUS = 1");
		buffer.append(" where ID in (" + param.get("IDS") + ")");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 假牌车确认
	 * @param param
	 * @return
	 */
	public int confimFakeInfo(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update J_FAKE_RECORD set OPERATE_STATUS = 1");
		buffer.append(" where ID in (" + param.get("IDS") + ")");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 导出管理查询
	 * @param param
	 * @return
	 */
	public List<Map<String,String>> exportMangerQuery(Map<String,String> param) {
		int pageStart = StringUtil.toInteger(param.get("page.start"));
        int rows = StringUtil.toInteger(param.get("page.limit"));
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from j_export_status where 1=1");
		if (StringUtil.checkStr(param.get("userCode"))) {
			buffer.append(" and USER_CODE = '" + param.get("userCode") + "'");
		}
		buffer.append(" order by START_TIME desc");
		String pageSql = this.initPageSql(pageStart, rows, buffer.toString());
		try {
			datas = this.queryBySql(pageSql);
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 统计导出管理数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countExportMangerDatas(Map<String, String> param) {
		List<Map<String, String>> counts = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select count(*) as COUNTS from j_export_status where 1=1");
		if (StringUtil.checkStr(param.get("userCode"))) {
			sqlBuffer.append(" and USER_CODE = '" + param.get("userCode") + "'");
		}
		try {
			counts = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return counts;
	}
	
	/**
	 * 下载管理查询
	 * @param param
	 * @return
	 */
	public List<Map<String,String>> imageMangerQuery(Map<String,String> param) {
		int pageStart = StringUtil.toInteger(param.get("page.start"));
        int rows = StringUtil.toInteger(param.get("page.limit"));
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from J_DOWNLOAD_IMAGE where 1=1");
		if (StringUtil.checkStr(param.get("userCode"))) {
			buffer.append(" and USER_CODE = '" + param.get("userCode") + "'");
		}
		buffer.append(" order by START_TIME desc");
		String pageSql = this.initPageSql(pageStart, rows, buffer.toString());
		try {
			datas = this.queryBySql(pageSql);
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 统计下载管理数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countimageMangerDatas(Map<String, String> param) {
		List<Map<String, String>> counts = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select count(*) as COUNTS from J_DOWNLOAD_IMAGE where 1=1");
		if (StringUtil.checkStr(param.get("userCode"))) {
			sqlBuffer.append(" and USER_CODE = '" + param.get("userCode") + "'");
		}
		try {
			counts = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return counts;
	}
}
