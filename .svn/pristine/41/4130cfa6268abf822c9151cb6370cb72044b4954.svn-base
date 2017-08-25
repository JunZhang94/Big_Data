package com.jp.tic.business.datacenter.dao.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Repository;

import com.jp.tic.business.datacenter.dao.DataQualityDao;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.utils.lang.StringUtil;

@SuppressWarnings("unchecked")
@Repository
public class DataQualityDaoImpl extends BaseDao implements DataQualityDao {

	/**
	 * 数据质量管理
	 * @param param 查询参数
	 * @param dept 部门
	 * @return 返回结果
	 */
	public List<Map<String, String>> dataQualityInfo(Map<String, String> param, List<Map<String, String>> dept) {
		int pageStart = StringUtil.toInteger(param.get("page.start"));
        int rows = StringUtil.toInteger(param.get("page.limit"));
		List<Map<String, String>> results = null;
		List<Map<String, String>> result = new ArrayList<Map<String,String>>();
		/*Map<String,String> fixedMap= new HashMap<String, String>();
		fixedMap.put("车辆限度小于5km/h", "10");
		fixedMap.put("车辆速度小于10km/h", "10");
		Set<String> key=new HashSet<String>();
		key.add("车辆限度小于5km/h");
		key.add("车辆速度小于10km/h");*/
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select distinct a.ID,a.DWBH,c.DWMC,a.CREATE_DATE,a.ERROR_TYPE,a.FIELD_NAME,a.FIELD_VALUE,a.ERROR_LEVEL,a.ERROR_DESC,a.RECIEVER_IP,a.valeid_value " +
				"from DIS_TAKE_FIELD_STATUS a, MGMTDEPT_TAB c, (select DWBH,FIELD_NAME,max(CREATE_DATE) NEW_TIME from DIS_TAKE_FIELD_STATUS group by DWBH,FIELD_NAME) b " +
				"where a.DWBH=b.DWBH and a.DWBH = substr(c.DWBH,0,6) and a.CREATE_DATE=b.NEW_TIME");
		sqlBuffer.append(this.packageSeachSql(param, dept));
		String pageSql = this.initPageSql(pageStart, rows, sqlBuffer.toString());
		try {
			results = this.queryBySql(pageSql.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		for(int i=0;i<results.size();i++){
			if (StringUtil.equals(results.get(i).get("ERROR_DESC"), "车辆限度小于5km/h") || StringUtil.equals(results.get(i).get("ERROR_DESC"), "车辆速度小于10km/h")) {
				results.get(i).put("VALEID_VALUE", "10");
			}
		}
		/*for(int i=0;i<results.size();i++){
			if(key.contains(results.get(i).get("ERROR_DESC"))){
				Map<String,String> fixed=results.get(i);	
				fixed.put("VALEID_VALUE", fixedMap.get(results.get(i).get("ERROR_DESC")));
				result.add(fixed);
			}
		}*/
		return results;
	}
	
	/**
	 * 数据质量管理数量
	 * @param param 查询参数
	 * @param dept 部门
	 * @return 返回结果
	 */
	public List<Map<String, String>> dataQualityAmounts(Map<String, String> param, List<Map<String, String>> dept) {
		List<Map<String, String>> counts = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select count(*) as COUNTS from(select distinct a.ID from DIS_TAKE_FIELD_STATUS a, " +
				"(select DWBH,FIELD_NAME,max(CREATE_DATE) NEW_TIME from DIS_TAKE_FIELD_STATUS group by DWBH,FIELD_NAME) b " +
				"where a.DWBH=b.DWBH and a.CREATE_DATE=b.NEW_TIME");
		sqlBuffer.append(this.packageSeachSql(param, dept));
		sqlBuffer.append(")");
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
	 * @param dept 部门
	 * @return 返回结果
	 */
	public String packageSeachSql(Map<String, String> param, List<Map<String, String>> dept) {
		StringBuffer buffer = new StringBuffer();
		if (StringUtil.checkStr(param.get("errorType"))) {
			buffer.append(" and ERROR_TYPE = '" + param.get("errorType") + "'");
		}
		if (StringUtil.checkStr(param.get("errorLevel"))) {
			buffer.append(" and ERROR_LEVEL = '" + param.get("errorLevel") + "'");
		}
		StringBuffer deptStr = new StringBuffer();
		buffer.append(" and (");
		for (int i = 0; i < dept.size(); i++) {
			if (StringUtil.checkObj(deptStr)) {
				deptStr.append(" or ");
			}
			deptStr.append("a.DWBH = '" + dept.get(i).get("DWBH").substring(0,6) + "'");
		}
		buffer.append(deptStr);
		buffer.append(")");
		return buffer.toString();
	}
	
	/**
	 * 导出数据质量信息数据
	 * @param partIds 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> exportDataQualityById(String[] partIds) {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select d.*,m.dwmc from DIS_TAKE_FIELD_STATUS d, MGMTDEPT_TAB m where d.DWBH = substr(m.DWBH,0,6) ");
		String idStr = "";
		for (int i = 0; i < partIds.length; i++) {
			if (StringUtil.checkStr(idStr)) {
				idStr += ",";
			}
			idStr += partIds[i];
		}
		buffer.append(" and d.ID in (" + idStr + ")");
		try {
			datas = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 根据查询条件导出查询数据
	 * @param param 查询参数
	 * @param dept 部门
	 * @return 查询结果
	 */
	public String exportQuerySql(Map<String, String> param, List<Map<String, String>> dept) {
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select a.DWBH,c.DWMC,a.CREATE_DATE,a.ERROR_TYPE,a.FIELD_NAME,a.FIELD_VALUE,a.ERROR_LEVEL,a.ERROR_DESC,a.RECIEVER_IP " +
				"from DIS_TAKE_FIELD_STATUS a, MGMTDEPT_TAB c, (select DWBH,FIELD_NAME,max(CREATE_DATE) NEW_TIME from DIS_TAKE_FIELD_STATUS group by DWBH,FIELD_NAME) b " +
				"where a.DWBH=b.DWBH and a.DWBH = substr(c.DWBH,0,6) and a.CREATE_DATE=b.NEW_TIME");
		sqlBuffer.append(this.packageSeachSql(param, dept));
		return sqlBuffer.toString();
	}
}
