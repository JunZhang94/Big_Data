package com.jp.tic.analyze.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jp.tic.analyze.dao.GatherStatisticsDao;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;

@SuppressWarnings("unchecked")
@Repository
public class GatherStatisticsDaoImpl extends BaseDao implements GatherStatisticsDao {

	/**
	 * 分页查询汇聚统计数据查询
	 * @param param 查询参数
	 * @param mounts 卡点
	 * @return 返回结果
	 */
	public List<Map<String, String>> gatherStatisticsInfo(Map<String, String> param, List<Map<String, String>> mounts) {
		int pageStart = StringUtil.toInteger(param.get("page.start"));
        int rows = StringUtil.toInteger(param.get("page.limit"));
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from DIS_GATE_COUNT where 1=1");
		buffer.append(this.packageSeachSql(param, mounts));
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
	 * 汇聚统计统计总数量
	 * @param param 查询参数
	 * @param mounts 卡点
	 * @return 返回结果
	 */
	public List<Map<String, String>> gatherStatisticsAmounts(Map<String, String> param, List<Map<String, String>> mounts) {
		List<Map<String, String>> counts = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select count(*) as COUNTS from DIS_GATE_COUNT where 1=1");
		sqlBuffer.append(this.packageSeachSql(param, mounts));
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
	 * @param mounts 卡点
	 * @return 返回结果
	 */
	public String packageSeachSql(Map<String, String> param, List<Map<String, String>> mounts) {
		StringBuffer buffer = new StringBuffer();
		buffer.append(" and KKBH in (");
		StringBuffer mountsStr = new StringBuffer();
		for (int i = 0; i < mounts.size(); i++) {
			if (StringUtil.checkObj(mountsStr)) {
				mountsStr.append(",");
			}
			mountsStr.append("'" + mounts.get(i).get("KKBH") + "'");
		}
		buffer.append(mountsStr.toString() + ")");
		if (StringUtil.checkObj(param.get("startTime"))) {
			buffer.append(" and START_TIME > to_date('"
                    + DateUtil.parseToString(param.get("startTime"), "yyyy-MM-dd HH:mm:ss")
                    + "','yyyy-MM-dd HH24:mi:ss')");
		}
		if (StringUtil.checkObj(param.get("endTime"))) {
			buffer.append(" and END_TIME < to_date('"
                    + DateUtil.parseToString(param.get("endTime"), "yyyy-MM-dd HH:mm:ss")
                    + "','yyyy-MM-dd HH24:mi:ss')");
		}
		return buffer.toString();
	}
	
	/**
	 * 汇聚统计统计总数量,柱状图数据
	 * @param param 查询参数
	 * @param mounts 卡点
	 * @return 返回结果
	 */
	public List<Map<String, String>> gatherStatisticsChartInfo(Map<String, String> param, List<Map<String, String>> mounts) {
    	List<Map<String, String>> results = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select startT as statistical_time,kkmc,couns,hphm_couns,non_hphm_couns from (" +
				"select to_char(start_time, '" + param.get("startDateType") + "') startT,mt.kkmc kkmc,sum(dgc.recieve_count) couns," +
				"sum(dgc.hphm_count) hphm_couns,sum(dgc.non_hphm_count) non_hphm_couns " +
				"from DIS_GATE_COUNT_STATUS dgc, mount_tab mt,mgmtdept_tab dept,area_tab area " +
				"where mt.kkbh = dgc.kkbh and mt.dwbh = dept.dwbh and dept.dwxzqh = area.qydm");
		if (StringUtil.equals(param.get("orgType"), "0")) {
			sqlBuffer.append(" and area.qydm = '" + param.get("orgId") + "'");
    		
	    }
	    if (StringUtil.equals(param.get("orgType"), "1")) {
	    	sqlBuffer.append(" and dept.dwbh = '" + param.get("orgId") + "'");
    		
	    }
	    if (StringUtil.equals(param.get("orgType"), "2")) {
	    	sqlBuffer.append(" and dgc.kkbh = '440" + param.get("orgId") + "'");
    		
	    }
		sqlBuffer.append(" and start_time between to_date('" + param.get("startdate") + "', 'yyyy-MM-dd hh24:mi:ss')" +
				" and to_date('" + param.get("enddate") + "', 'yyyy-MM-dd hh24:mi:ss') " +
				"group by to_char(start_time, '" + param.get("startDateType") + "'),mt.kkmc) t");
		try {
			results = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return results;
	}
	
	/**
	 * 组装分页查询语句,指定查询字段
	 * @param pageStart 开始位置
	 * @param rows 每行显示多少数据量
	 * @param seachSql 数据查询语句
	 * @return 分页语句
	 */
	public String initPageSqlForField(int pageStart, int rows, String seachSql) {
		StringBuffer pageSql = new StringBuffer(); 
		if (pageStart == 0) {
            pageSql.append("select COUNT,START_TIME as period from (");
            pageSql.append(seachSql + ") row_ where rownum <=" + rows);
        } else {
            int nextStart = pageStart + rows;
            pageSql.append(" select * from ( select row_.*, rownum rownum_ from (");
            pageSql.append(seachSql + ") row_ where rownum <= " + nextStart +") where rownum_ > " + pageStart);
        }
		return pageSql.toString();
	}
}
