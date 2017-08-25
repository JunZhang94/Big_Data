package com.jp.tic.business.datacenter.dao.impl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;

import com.jp.tic.business.datacenter.dao.FakeCarNumDao;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.utils.db.DatabaseUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.sql.SQLUtil;

@SuppressWarnings("unchecked")
@Repository
public class FakeCarNumDaoImpl extends BaseDao implements FakeCarNumDao {

	private static final Log log = LogFactory.getLog(DatabaseUtil.class);
	
	/**
	 * 假牌车查询
	 */
	public List<Map<String, String>> fakeCarNumSearch() {
		List<Map<String,String>> datas = null;
		StringBuffer sqlbuffer = new StringBuffer();
		sqlbuffer.append("select * from J_FAKE_RECORD");
		try {
			String sqlstr = sqlbuffer.toString();
			datas = this.queryBySql(sqlstr);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return datas;
	}
	
	/**
	 * 更新假牌车的统计数或者保存新的记录数，可是操作起来麻烦，因此，建议直接先把数据删掉，在重新插入数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateOrSaveRecords(List<Map<String, String>> updateDatas, List<Map<String, String>> saveDatas) {
		int updateFlag = 0;
		updateFlag = this.updateFakeRecord(updateDatas);
		updateFlag += this.saveFakeRecord(saveDatas);
		return updateFlag;
	}
	
	/**
	 * 更新已存在的假牌数据
	 * @param saveDatas 假牌车数据集合
	 * @return 操作结果
	 */
	public int updateFakeRecord(List<Map<String, String>> updateDatas) {
		int updateFlag = 0;
		String[] saveSqls = new String[updateDatas.size()];
		StringBuffer buffer = null;
		for (int i = 0; i < updateDatas.size(); i++) {
			buffer = new StringBuffer();
			buffer.append("update J_FAKE_RECORD set AMOUNTS =" + updateDatas.get(i).get("AMOUNTS") + 
					" where ID = " + updateDatas.get(i).get("ID"));
			saveSqls[i] = buffer.toString();
		}
		try {
			updateFlag = this.updateBatchSql(saveSqls);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return updateFlag;
	}
	
	/**
	 * 保存新增的假牌车数据
	 * @param saveDatas 假牌车数据集合
	 * @return 操作结果
	 */
	public int saveFakeRecord(List<Map<String, String>> saveDatas) {
		int saveFlag = 0;
		String[] saveSqls = new String[saveDatas.size()];
		StringBuffer buffer = null;
		for (int i = 0; i < saveDatas.size(); i++) {
			buffer = new StringBuffer();
			buffer.append("insert into J_FAKE_RECORD(ID,HPHM,HPZL,CLLX,CSYS,CLPP," +
			"KKBH,AMOUNTS,KKMC,DWBH,DWMC) values (");
			buffer.append("SEQ_FIKE_RECORD.NEXTVAL");
			buffer.append(",'" + saveDatas.get(i).get("HPHM") + "'");
			if (StringUtil.checkObj(saveDatas.get(i).get("HPZL"))) {
				buffer.append(",'" + saveDatas.get(i).get("HPZL") + "'");
			} else {
				buffer.append(",''");
			}
			if (StringUtil.checkObj(saveDatas.get(i).get("CLLX"))) {
				buffer.append(",'" + saveDatas.get(i).get("CLLX") + "'");
			} else {
				buffer.append(",''");
			}
			if (StringUtil.checkObj(saveDatas.get(i).get("CSYS"))) {
				buffer.append(",'" + saveDatas.get(i).get("CSYS") + "'");
			} else {
				buffer.append(",''");
			}
			if (StringUtil.checkObj(saveDatas.get(i).get("CLPP"))) {
				buffer.append(",'" + saveDatas.get(i).get("CLPP") + "'");
			} else {
				buffer.append(",''");
			}
			buffer.append(",'" + saveDatas.get(i).get("KKBH") + "'");
			buffer.append("," + saveDatas.get(i).get("AMOUNTS"));
			buffer.append(",'" + saveDatas.get(i).get("KKMC") + "'");
			buffer.append(",'" + saveDatas.get(i).get("DWBH") + "'");
			buffer.append(",'" + saveDatas.get(i).get("DWMC") + "'");
			buffer.append(")"); 
			saveSqls[i] = buffer.toString();
		}
		try {
			saveFlag = this.updateBatchSql(saveSqls);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
     * 假牌车查询
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> fackCarNumSearchInfo(Map<String, String> param) {
    	int pageStart = StringUtil.toInteger(param.get("page.start"));
        int rows = StringUtil.toInteger(param.get("page.limit"));
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select t.id,t.hphm,t.hpzl,t.cllx,t.csys,t.kkbh,t.kkmc,t.dwbh,t.dwmc,t.amounts,a.all_amounts,b.sum_amounts,t.operate_status " +
				"from J_FAKE_RECORD t,(select sum(t.amounts) as all_amounts,t.dwbh,t.hphm from J_FAKE_RECORD t where 1 = 1");
		buffer.append(this.packageSeachSql(param));
		buffer.append(" group by t.dwbh,t.hphm) a," +
				"(select sum(t.amounts) as sum_amounts, t.hphm from J_FAKE_RECORD t " +
				"where 1 = 1");
		buffer.append(this.packageSeachSql(param));
		buffer.append("group by t.hphm) b where 1 = 1");
		buffer.append(this.packageSeachSql(param));
		buffer.append(" and t.dwbh = a.dwbh and t.hphm = a.hphm and t.hphm = b.hphm order by b.sum_amounts DESC");
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
     * 假牌车数量统计
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> countfackCarNumDatas(Map<String, String> param) {
    	List<Map<String, String>> counts = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select count(*) as COUNTS from J_FAKE_RECORD t where 1=1");
		sqlBuffer.append(this.packageSeachSql(param));
		try {
			counts = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return counts;
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
	 * 组装查询语句
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public String packageSeachSql(Map<String, String> param) {
		StringBuffer buffer = new StringBuffer();
		//过滤警车和学车
		 buffer.append(" and t.HPHM not like '%警' and t.HPHM not like '%学'");
		 //获取车牌信息 
        if(StringUtil.checkStr(param.get("carFNum")) || StringUtil.checkStr(param.get("carBNum"))) {
            buffer.append(" and regexp_like(t.HPHM, "+SQLUtil.getCarNumLikeCondition(param.get("carFNum"), param.get("carBNum"))+")");
          
        }
        //车牌颜色
		if (StringUtil.checkStr(param.get("carNumColor")) && !StringUtil.equals(param.get("carNumColor"), "-1")) {
			buffer.append(" and t.CSYS = '" + param.get("carNumColor") + "'");
		}
		//车辆类型
		if (StringUtil.checkStr(param.get("carType")) && !StringUtil.equals(param.get("carType"), "-1")) {
			buffer.append(" and t.CLLX = '" + param.get("carType") + "'");
		}	
		//卡口编号
		if(StringUtil.checkStr(param.get("kkbhs"))){
			String kkbhstr = param.get("kkbhs");
			String[] kkbhsArray = kkbhstr.split(",");
			String kkbhs = "";
			for(int i = 0; i < kkbhsArray.length; i++){
				kkbhs += "'"+kkbhsArray[i]+"'"+",";
			}
			kkbhs = kkbhs.substring(0, kkbhs.length()-1);
			buffer.append(" and t.KKBH in ("+kkbhs+")");
			
		}
		
		//是否已确认
		if(StringUtil.checkStr(param.get("confimFlag")) && StringUtil.equals(param.get("confimFlag"), "1")){
			buffer.append(" and t.operate_status = "+param.get("confimFlag"));
		}
		//过车次数
		if(StringUtil.checkStr(param.get("amounts")) && !StringUtil.equals(param.get("amounts"), "-1")){
			buffer.append(" and t.AMOUNTS >= "+param.get("amounts"));
		}
	
		return buffer.toString();
	}
	
	/**
	 * 查询车辆库信息
	 * @return 查询结果
	 * @throws Exception 
	 */
	public Map<String, String> queryCarSourceInfo() throws Exception {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select t.HPHM from JC_G.G_JDCL t");
		//sqlBuffer.append("select t.HPHM from J_FAKE_RECORD t");
		Class.forName("oracle.jdbc.OracleDriver");
		String urlStr = "jdbc:oracle:thin:@10.235.36.161:1521:GZDB011";
		//String urlStr = "jdbc:oracle:thin:@10.235.34.80:1521:GZSICSDB";
		Connection conn = DriverManager.getConnection(urlStr, "KK", "KK");
		//Connection conn = DriverManager.getConnection(urlStr, "si01", "jp2011");
		Statement st = null;
		ResultSet rs = null;
		//List<Map> tempList = new ArrayList<Map>();
		Map<String, String> mapData = new HashMap<String, String>();
		Date startDate = new Date();
		try {
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
				//tempList.add(map);
				mapData.put(map.get("HPHM"), map.get("HPHM"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, st, rs);
		}
		Date endDate = new Date();
		log.info("执行时间：" + StringUtil.getTimeInMillis(startDate, endDate));
		/*Map<String, String> mapData = new HashMap<String, String>();
		if (datas != null && datas.size() > 0) {
			for (Map<String, String> carMap : datas) {
				mapData.put(carMap.get("HPHM"), carMap.get("HPHM"));
			}
		}*/
		return mapData;
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
     * 第二种算法，查询出存在的车牌数据
     * @param hbaseDatas 数据源
     * @return 查询结果
	 * @throws Exception 
     */
    public List<CarTake> filteCarNumInfo(List<CarTake> hbaseDatas) throws Exception {
		StringBuffer sqlBuffer = new StringBuffer();
		StringBuffer whereBuffer = new StringBuffer();
		if (hbaseDatas != null && hbaseDatas.size() > 0) {
			List<CarTake> filteDatas = new ArrayList<CarTake>();
			for (CarTake filteData : hbaseDatas) {
				if (StringUtil.equals(filteData.getHphm(), "-") || StringUtil.equals(filteData.getHphm(), "—")
						|| StringUtil.equals(filteData.getHphm(), "无牌") || StringUtil.equals(filteData.getHphm(), "null")
						|| StringUtil.equals(filteData.getHphm(), "车牌") || StringUtil.equals(filteData.getHphm(), "无车牌")) {
					filteDatas.add(filteData);
				}
			}
			hbaseDatas.removeAll(filteDatas);
			if (hbaseDatas != null && hbaseDatas.size() > 0) {
				sqlBuffer.append("select t.HPHM from JC_G.G_JDCL t where ");
				for (CarTake carHbase : hbaseDatas) {
					if (StringUtil.checkStr(whereBuffer.toString())) {
						whereBuffer.append(" OR ");
					}
					whereBuffer.append("HPHM = '" + carHbase.getHphm() + "'");
				}
				sqlBuffer.append(whereBuffer);
			}
		}
		Class.forName("oracle.jdbc.OracleDriver");
		String urlStr = "jdbc:oracle:thin:@10.235.36.161:1521:GZDB011";
		Connection conn = DriverManager.getConnection(urlStr, "KK", "KK");
		Statement st = null;
		ResultSet rs = null;
		//List<Map> tempList = new ArrayList<Map>();
		Map<String, String> mapData = new HashMap<String, String>();
		Date startDate = new Date();
		try {
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
				//tempList.add(map);
				mapData.put(map.get("HPHM"), map.get("HPHM"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			free(conn, st, rs);
		}
		Date endDate = new Date();
		log.info("执行时间：" + StringUtil.getTimeInMillis(startDate, endDate));
		List<CarTake> datas = new ArrayList<CarTake>();
		if (hbaseDatas != null && hbaseDatas.size() > 0) {
			for (CarTake cartake : hbaseDatas) {
				if (mapData.containsKey(cartake.getHphm())) {
					datas.add(cartake);
				}
			}
		}
		hbaseDatas.removeAll(datas);
		return hbaseDatas;
    }
    
    /**
	 * 查询所有的套牌车数据
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryAllTaopaiInfo() {
		List<Map<String, String>> results = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select t.hphm from DIS_FAKE_LOCAL_PLATE t where t.OPERATE_STATUS = 1");
		try {
			results = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return results;
	}
}
