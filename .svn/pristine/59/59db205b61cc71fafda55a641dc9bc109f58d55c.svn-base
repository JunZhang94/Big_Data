package com.jp.tic.analyze.dao.impl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.jp.tic.analyze.dao.DeckCarAnalysisDao;
import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.system.entity.CarLibrary;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;

@SuppressWarnings("unchecked")
@Repository
public class DeckCarAnalysisDaoImpl extends BaseDao implements DeckCarAnalysisDao {

	private Logger log = LoggerFactory.getLogger(this.getClass());
	
	/**
	 * 保存套牌车数据
	 * @param clsd 车辆平均速度
	 * @return 返回条数
	 */
	public int saveDeckCarToDb(List<CarTake> records) {
		int saveCounts = 0;
		StringBuffer sqlBuffer = null;
		List<String> sqlList = new ArrayList<String>();
		 /*Collections.sort(records, new Comparator<CarTake>(){
             public int compare(CarTake item1,CarTake item2){
            	 return (int) (item1.getJgsj().getTime() - item2.getJgsj().getTime());
             }
         });*/
		for (int i = 0; i < records.size(); i++) {
			if ((i + 1) < records.size()) {
				if (StringUtil.equals(records.get(i).getHphm(), records.get(i + 1).getHphm())) {
					sqlBuffer = new StringBuffer();
					sqlBuffer.append("insert into DIS_FAKE_LOCAL_PLATE(ID,HPHM,KKBH1,JGSJ1,KKBH2,JGSJ2,TX1,TX2,CLSD) values (");
					sqlBuffer.append("SEQ_DIS_FAKE_LOCAL_PLATE.NEXTVAL");
					if (StringUtil.checkStr(records.get(i).getHphm())) {
						sqlBuffer.append(",'" + records.get(i).getHphm() + "'");
					} else {
						sqlBuffer.append(",''");
					}
					//因为数据是按按时间降序排列的，所以這里保存数据相反里
					if (StringUtil.checkStr(records.get(i + 1).getKkbh())) {
						sqlBuffer.append(",'" + records.get(i + 1).getKkbh() + "'");
					} else {
						sqlBuffer.append(",''");
					}
					sqlBuffer.append(",to_date('" +  DateUtil.parseToString(records.get(i + 1).getJgsj(), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss')");
					if (StringUtil.checkStr(records.get(i).getKkbh())) {
						sqlBuffer.append(",'" + records.get(i).getKkbh() + "'");
					} else {
						sqlBuffer.append(",''");
					}
					sqlBuffer.append(",to_date('" +  DateUtil.parseToString(records.get(i).getJgsj(), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss')");
					if (StringUtil.checkStr(records.get(i + 1).getTx1())) {
						sqlBuffer.append(",'" + records.get(i + 1).getTx1() + "'");
					} else {
						sqlBuffer.append(",''");
					}
					if (StringUtil.checkStr(records.get(i).getTx1())) {
						sqlBuffer.append(",'" + records.get(i).getTx1() + "'");
					} else {
						sqlBuffer.append(",''");
					}
					sqlBuffer.append("," + records.get(i).getClsd());
					sqlBuffer.append(")");
					sqlList.add(sqlBuffer.toString());
				} else {
					continue;
				}
			}
		}
		String[] sqlArray = sqlList.toArray(new String[]{});
		if (sqlArray != null && sqlArray.length > 0) {
			saveCounts = sqlArray.length;
			this.updateBatchSql(sqlArray);
		}
		return saveCounts;
	}
	
	/**
	 * 查出数据库中所有的套牌车数据
	 * @return 查询结果
	 */
	public List<Map<String, String>> loadAllCarnumInfo() {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select * from DIS_FAKE_LOCAL_PLATE");
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 检查数据库表中是否已经存在套牌车记录
	 * @param carNum 车牌号码
	 * @return 查询结果
	 */
	public boolean checkCarnumInfo(String carNum) {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select * from DIS_FAKE_LOCAL_PLATE where HPHM = '" + carNum + "'");
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return false;
		}
		boolean boo = false;
		if (datas != null && datas.size() > 0) {
			boo = true;
		}
		return boo;
	}
	
	/**
	 * 加载所有的卡口之间的距离数据
	 * @return 查询结果
	 * @throws ClassNotFoundException 
	 */
	public Map<String, String> loadAllMountDistance() throws Exception {
		Map<String, String> mapData = new HashMap<String, String>();
		StringBuffer sqlBuffer = new StringBuffer();
		Class.forName("oracle.jdbc.OracleDriver");
		Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
		String urlStr = MapGetUtils.getString(config, "oracle.datasource.url");
		String username = MapGetUtils.getString(config, "oracle.datasource.username");
		String password = MapGetUtils.getString(config, "oracle.datasource.password");
		//String urlStr = "jdbc:oracle:thin:@172.31.108.194:1521:SICSDB";
		Connection conn = DriverManager.getConnection(urlStr, username, password);
		Statement st = null;
		ResultSet rs = null;
		try {
			sqlBuffer.append("select * from MOUNT_DISTANCE_TAB");
			st = conn.createStatement();
			rs = st.executeQuery(sqlBuffer.toString());
			ResultSetMetaData meta = rs.getMetaData();
			int columnCount = meta.getColumnCount();
			Map<String, String> map = null;
			while (rs.next()) {
				map = new LinkedHashMap<String, String>();
				for (int i = 1; i <= columnCount; i++) {
					String colName = meta.getColumnLabel(i);
                    String colValue = rs.getString(i);
					map.put(colName, colValue);
				}
				mapData.put(map.get("KKBH1") + "-" + map.get("KKBH2"), map.get("DISTANCE"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, st, rs);
		}
		return mapData;
	}
	
	/**
	 * 查出数据库中所有的套牌车数据
	 * @return 查询结果
	 * @throws Exception 
	 */
	public Map<String, String> loadAllCarnumInfo2() throws Exception {
		Map<String, String> mapData = new HashMap<String, String>();
		StringBuffer sqlBuffer = new StringBuffer();
		Class.forName("oracle.jdbc.OracleDriver");
		Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
		String urlStr = MapGetUtils.getString(config, "oracle.datasource.url");
		String username = MapGetUtils.getString(config, "oracle.datasource.username");
		String password = MapGetUtils.getString(config, "oracle.datasource.password");
		//String urlStr = "jdbc:oracle:thin:@172.31.108.194:1521:SICSDB";
		Connection conn = DriverManager.getConnection(urlStr, username, password);
		Statement st = null;
		ResultSet rs = null;
		try {
			sqlBuffer.append("select * from DIS_FAKE_LOCAL_PLATE");
			st = conn.createStatement();
			rs = st.executeQuery(sqlBuffer.toString());
			ResultSetMetaData meta = rs.getMetaData();
			int columnCount = meta.getColumnCount();
			Map<String, String> map = null;
			while (rs.next()) {
				map = new LinkedHashMap<String, String>();
				for (int i = 1; i <= columnCount; i++) {
					String colName = meta.getColumnLabel(i);
                    String colValue = rs.getString(i);
					map.put(colName, colValue);
				}
				mapData.put(map.get("HPHM"), map.get("HPHM"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, st, rs);
		}
		return mapData;
	}
	
	/**
	 * 加载所有的卡口数据
	 * @return 查询结果
	 * @throws ClassNotFoundException 
	 */
	public Map<String, Map<String, String>> loadAllMountInfo() throws Exception {
		Map<String, Map<String, String>> mapData = new HashMap<String, Map<String, String>>();
		StringBuffer sqlBuffer = new StringBuffer();
		Class.forName("oracle.jdbc.OracleDriver");
		Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
		String urlStr = MapGetUtils.getString(config, "oracle.datasource.url");
		String username = MapGetUtils.getString(config, "oracle.datasource.username");
		String password = MapGetUtils.getString(config, "oracle.datasource.password");
		Connection conn = DriverManager.getConnection(urlStr, username, password);
		Statement st = null;
		ResultSet rs = null;
		try {
			sqlBuffer.append("select KKBH,KKMC,KKJD,KKWD from MOUNT_TAB union all " +
					"select KKBH,KKMC,KKJD,KKWD from MOUNT_VIRTUAL_TAB");
			st = conn.createStatement();
			rs = st.executeQuery(sqlBuffer.toString());
			ResultSetMetaData meta = rs.getMetaData();
			int columnCount = meta.getColumnCount();
			Map<String, String> map = null;
			while (rs.next()) {
				map = new LinkedHashMap<String, String>();
				for (int i = 1; i <= columnCount; i++) {
					String colName = meta.getColumnLabel(i);
                    String colValue = rs.getString(i);
					map.put(colName, colValue);
				}
				mapData.put(map.get("KKBH"), map);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, st, rs);
		}
		return mapData;
	}
	/**
	 * 加载无效套牌计算无用的卡口信息
	 * @return 查询结果
	 * @throws ClassNotFoundException 
	 */
	public Map<String, Map<String, String>> loadInValidMountInfo() throws Exception{
		Map<String, Map<String, String>> mapData = new HashMap<String, Map<String, String>>();
		StringBuffer sqlBuffer = new StringBuffer();
		Class.forName("oracle.jdbc.OracleDriver");
		Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
		String urlStr = MapGetUtils.getString(config, "oracle.datasource.url");
		String username = MapGetUtils.getString(config, "oracle.datasource.username");
		String password = MapGetUtils.getString(config, "oracle.datasource.password");
		Connection conn = DriverManager.getConnection(urlStr, username, password);
		
		Statement st = null;
		ResultSet rs = null;
		try {
			sqlBuffer.append("select t.kkbh1,t.kkbh2 from INVALIDMOUNT_TAB t ");
			st = conn.createStatement();
			rs = st.executeQuery(sqlBuffer.toString());
			ResultSetMetaData meta = rs.getMetaData();
			int columnCount = meta.getColumnCount();
			Map<String, String> map = null;
			while (rs.next()) {
				map = new LinkedHashMap<String, String>();
				for (int i = 1; i <= columnCount; i++) {
					String colName = meta.getColumnLabel(i);
                    String colValue = rs.getString(i);
					map.put(colName, colValue);
				}
				mapData.put(map.get("KKBH1")+"_"+map.get("KKBH2"), map);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, st, rs);
		}
		return mapData;
	}
	
	/**
	 * 保存卡口之间的距离
	 * @param sqlArray
	 * @return
	 */
	public int saveDistanceInfo(String[] sqlArray) {
		int saveCounts = this.updateBatchSql(sqlArray);
		return saveCounts;
	}
	
	/**
	 * 查询一个时间段内的套牌车数据
	 */
	public List<Map<String, String>> seleteTaopaiData() {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select count(1) as counts,KKBH1,KKBH2 from DIS_FAKE_LOCAL_PLATE group by KKBH1,KKBH2");
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 查询一个时间段内的套牌车数据
	 */
	public List<Map<String, String>> seleteTaopaiData(String kkbh1,String kkbh2){
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select * from DIS_FAKE_LOCAL_PLATE t where t.jgsj1>=trunc(sysdate) ");
		if(kkbh1 !=null && kkbh1.length()>0){
			sqlBuffer.append(" and t.kkbh1='"+kkbh1+"' ");
		}
		if(kkbh2 !=null && kkbh2.length()>0){
			sqlBuffer.append(" and t.kkbh2='"+kkbh2+"' ");
		}
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 清理掉一个小时前前两个小时内没用的套牌车数据
	 * @param ids ID
	 * @return 查询结果
	 */
	public int deleteTaopaiData(String[] ids) {
		int deleteFlag = 0;
		if (ids != null && ids.length > 0) {
			String idStr = "";
			for (int i = 0; i < ids.length; i++) {
				if (idStr != "") {
					idStr += ",";
				}
				idStr += ids[i];
			}
			StringBuffer sqlBuffer = new StringBuffer();
			sqlBuffer.append("delete * from DIS_FAKE_LOCAL_PLATE where ID in (" + idStr + ")");
			try {
				deleteFlag = this.updateBySql(sqlBuffer.toString());
			} catch (Exception e) {
				e.printStackTrace(); 
			}
		}
		return deleteFlag;
	}
	
	public int deleteTaopaiData(String kkbh1,String kkbh2){
		int deleteFlag = 0;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("delete  from DIS_FAKE_LOCAL_PLATE t where t.jgsj1>=trunc(sysdate) ");
		if(kkbh1 !=null && kkbh1.length()>0){
			sqlBuffer.append(" and t.kkbh1='"+kkbh1+"' ");
		}
		if(kkbh2 !=null && kkbh2.length()>0){
			sqlBuffer.append(" and t.kkbh2='"+kkbh2+"' ");
		}
		try {
			deleteFlag = this.updateBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		return deleteFlag;
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

	@Override
	public List<Map<String, String>> getLocatCarLibrary(List<CarTake> objectList) {
		StringBuffer sqlBuffer=new StringBuffer();
		sqlBuffer.append("select t.xh,t.hphm,t.clpp1 clpp,t.cllx,t.csys from g_Jdcl t ");
		StringBuffer hphmSql=new StringBuffer();
		for(int i=0;i<objectList.size();i++){
			String hphm=(String) objectList.get(i).getHphm();
			if(i>0){
				hphmSql.append(",");
			}
			hphmSql.append("'"+hphm+"'");
		}
		if(hphmSql.length()>0){
			sqlBuffer.append(" where t.hphm in("+hphmSql.toString()+")");
		}
		List<Map<String, String>> datas = null;
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	@Override
	public List<Map<String, String>> getRemoteCarLibrary(List<CarTake> objectList,String dburl,String dbtab,String username,String password) {
		StringBuffer sqlBuffer=new StringBuffer();
		sqlBuffer.append("select t.xh,t.hphm,t.clpp1 clpp,t.cllx,t.csys from "+dbtab+" t ");
		StringBuffer hphmSql=new StringBuffer();
		for(int i=0;i<objectList.size();i++){
			String hphm=(String) objectList.get(i).getHphm();
			if(i>0){
				hphmSql.append(",");
			}
			hphmSql.append("'"+hphm+"'");
		}
		if(hphmSql.length()>0){
			sqlBuffer.append(" where t.hphm in("+hphmSql.toString()+")");
		}
		Statement st = null;
		ResultSet rs = null;
		List<Map<String, String>> datas = new ArrayList<Map<String, String>>();
		Connection conn = null;
		try {
			Class.forName("oracle.jdbc.OracleDriver");
			conn = DriverManager.getConnection(dburl, username,password);
			st = conn.createStatement();
			rs = st.executeQuery(sqlBuffer.toString());
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
				datas.add(map);
			}
		} catch (ClassNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			free(conn, st, rs);
		}
		return datas;
	}

	@Override
	public int saveCompareTaopai(List<CarTake> records) {
		StringBuffer sqlBuffer = null;
		List<String> sqlList = new ArrayList<String>();
		int saveCounts=0;
		for (int i = 0; i < records.size(); i++) {
			sqlBuffer = new StringBuffer();
			sqlBuffer.append("insert into DIS_FAKE_LOCAL_PLATE(ID,HPHM,KKBH1,JGSJ1,TX1,CLSD,DIFFERENT_FIELDS,ANALY_TYPE) values (");
			sqlBuffer.append("SEQ_DIS_FAKE_LOCAL_PLATE.NEXTVAL");
			if (StringUtil.checkStr(records.get(i).getHphm())) {
				sqlBuffer.append(",'" + records.get(i).getHphm() + "'");
			} else {
				sqlBuffer.append(",''");
			}
			if (StringUtil.checkStr(records.get(i).getKkbh())) {
				sqlBuffer.append(",'" + records.get(i).getKkbh() + "'");
			} else {
				sqlBuffer.append(",''");
			}
			sqlBuffer.append(",to_date('" +  DateUtil.parseToString(records.get(i).getJgsj(), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss')");
			if (StringUtil.checkStr(records.get(i).getTx1())) {
				sqlBuffer.append(",'" + records.get(i).getTx1() + "'");
			} else {
				sqlBuffer.append(",''");
			}
			sqlBuffer.append("," + records.get(i).getClsd());
			sqlBuffer.append("," + records.get(i).getBrand());
			sqlBuffer.append(",1");
			sqlBuffer.append(")");
			sqlList.add(sqlBuffer.toString());
		}
		String[] sqlArray = sqlList.toArray(new String[]{});
		if (sqlArray != null && sqlArray.length > 0) {
			saveCounts = sqlArray.length;
			this.updateBatchSql(sqlArray);
		}
		return saveCounts;
	}

	@Override
	public int saveInvalidMount(String kkbh1, String kkbh2) {
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("insert into INVALIDMOUNT_TAB(KKBH1,KKBH2,DETAIL,CREATETIME) values(");
		sqlBuffer.append("'"+kkbh1+"','"+kkbh2+"','卡口设备时间不同步',sysdate)");
		return this.updateBySql(sqlBuffer.toString());
	}
}