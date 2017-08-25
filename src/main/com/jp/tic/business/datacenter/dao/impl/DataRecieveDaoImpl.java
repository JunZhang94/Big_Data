package com.jp.tic.business.datacenter.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jp.tic.business.datacenter.dao.DataRecieveDao;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.sun.org.apache.bcel.internal.generic.IF_ACMPEQ;

@SuppressWarnings("unchecked")
@Repository
public class DataRecieveDaoImpl extends BaseDao implements DataRecieveDao {

	/**
	 * 数据接收状态查询
	 * @param mounts 卡点
	 * @return 返回结果
	 */
	public List<Map<String, String>> dataRecieveStatusInfo(List<Map<String, String>> mounts) {
		List<Map<String, String>> results = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select a.KKBH,c.KKMC,a.start_time,a.end_time,a.reciever_ip,a.status,m.dwmc,m.dwbh from DIS_GATE_TIME_STATUS a, " +
				"MOUNT_TAB c, MGMTDEPT_TAB m, " +
				"(select KKBH,max(END_TIME) NEW_TIME from DIS_GATE_TIME_STATUS group by KKBH) b " +
				"where a.KKBH=b.KKBH and a.KKBH = c.KKBH and c.dwbh = m.dwbh and a.END_TIME=b.NEW_TIME and c.VERIFY_STATUS = 1");
		StringBuffer mountStr = new StringBuffer();
		sqlBuffer.append(" and (");
		for (int i = 0; i < mounts.size(); i++) {
			if (StringUtil.checkObj(mountStr)) {
				mountStr.append(" or ");
			}
			mountStr.append("a.KKBH = '" + mounts.get(i).get("KKBH") + "'");
		}
		sqlBuffer.append(mountStr);
		sqlBuffer.append(")");
		try {
			results = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		//遍历所有的卡点，看是否存在卡点不在表DIS_GATE_TIME_STATUS中，表示异常
		List<Map<String, String>> outLines = new ArrayList<Map<String,String>>();
		List<Map<String, String>> filterResults = this.removeDuplicateWithOrder(results);
		outLines.addAll(filterResults);
		boolean havingFlag = false;
		for (Map<String, String> mountMap : mounts) {
			for (Map<String, String> dataMap : filterResults) {
				if (StringUtil.equals(mountMap.get("KKBH"), dataMap.get("KKBH"))) {
					havingFlag = true;
					break;
				}
			}
			if (!havingFlag) {
				mountMap.put("DWMC", mountMap.get("DWMC"));
				mountMap.put("STATUS", "0");
				mountMap.put("KKMC", mountMap.get("KKMC"));
				outLines.add(mountMap);
			}
			havingFlag = false;
		}
		return outLines;
	}
	
	/**
	 * 数据去重
	 * @param results 目标结果集
	 * @return 处理后结果集
	 */
	public List<Map<String, String>> removeDuplicateWithOrder(List<Map<String, String>> results) {     
		if (results != null && results.size() > 0) {
			for (int i = 0 ; i < results.size() - 1 ; i ++ ) {
				for (int  j = results.size() -  1 ; j > i; j -- ) {
					if (StringUtil.equals(results.get(i).get("KKBH"), results.get(j).get("KKBH"))) {
						results.remove(j);
					}
				}
			}
		}
		return results;
	}

	/**
     * 卡口车流量统计
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> trafficStatisticsInfo(Map<String, String> param) {
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
	 * 数据接收率查询,只查询首页柱状图
	 * @param mounts 卡点
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> dataAcceptOnlyColumnInfo(List<Map<String, String>> mounts, Map<String, String> param) {
		List<Map<String, String>> results = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select dwmc as PERIOD, count(1) as COUNT from (select f.dwmc, KKBH, KKMC from (" +
				"select a.KKBH, c.KKMC, d.dwbh, d.dwmc, a.status from DIS_GATE_TIME_STATUS a, (" +
				"select KKBH, max(start_time) NEW_TIME from DIS_GATE_TIME_STATUS group by KKBH) b, MOUNT_TAB c, MGMTDEPT_TAB d, AREA_TAB e " +
				"where a.start_time = b.NEW_TIME and a.kkbh = b.kkbh and a.kkbh = c.kkbh and c.dwbh = d.dwbh " +
				"and d.dwxzqh = e.qydm and e.qydm = '440100' and c.VERIFY_STATUS = 1) f where ");
		if (StringUtil.equals(param.get("culumnOline"), "1")) {
			sqlBuffer.append("status = '" + param.get("culumnOline") + "'");
		} else {
			sqlBuffer.append("(status = '0' or status = '3')");
		}
		sqlBuffer.append(" group by dwmc, KKBH, KKMC) group by dwmc");
		try {
			results = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return results;
	}
	
	/**
	 * 组装趋势图sql语句
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public String initTrendChartOnlyLineSql(Map<String, String> param) {
		StringBuffer sqlBuffer = new StringBuffer();
		if (StringUtil.equals(param.get("orgType"), "0")) { //选的是广州市
			sqlBuffer.append("select qymc as dwmc, count(1) as COUNT, datatime as PERIOD from (");
		} 
		if (StringUtil.equals(param.get("orgType"), "1")) { //选的是分局
			sqlBuffer.append("select dwmc, count(1) as COUNT, datatime as PERIOD from (");
		} 
		sqlBuffer.append("select ");
		if (StringUtil.equals(param.get("orgType"), "0")) {
			sqlBuffer.append(" f.qymc,");
		}
		sqlBuffer.append("f.dwmc,KKBH,KKMC,datatime from (");
		sqlBuffer.append("select ");
		if (StringUtil.equals(param.get("orgType"), "0")) {
			sqlBuffer.append(" e.qymc,");
		}
		sqlBuffer.append("a.KKBH,c.KKMC,d.dwmc,");
		if (StringUtil.equals(param.get("timeType"), "1")) { //查询24小时的数据
			sqlBuffer.append("to_char(start_time, 'yyyy-mm-dd hh24') || ':00 - ' || to_char(start_time, 'hh24') || ':59' as datatime");
		}
		if (StringUtil.equals(param.get("timeType"), "2")) { //查询7的数据
			sqlBuffer.append("to_char(start_time, 'MM-dd') as datatime");
		}
		if (StringUtil.equals(param.get("timeType"), "3")) { //查询一个月的数据
			sqlBuffer.append("to_char(start_time, 'MM-dd') as datatime");
		}
		if (StringUtil.equals(param.get("timeType"), "4")) { //查询一年的数据
			sqlBuffer.append("to_char(start_time, 'MM') as datatime");
		}
		sqlBuffer.append(", a.status from DIS_GATE_TIME_STATUS a,MOUNT_TAB c");
		if (StringUtil.equals(param.get("orgType"), "0")) {
			sqlBuffer.append(",MGMTDEPT_TAB d,AREA_TAB e");
	    }
	    if (StringUtil.equals(param.get("orgType"), "1")) {
	    	sqlBuffer.append(",MGMTDEPT_TAB d");
	    }
	    sqlBuffer.append(" where a.kkbh = c.kkbh");
		if (StringUtil.equals(param.get("orgType"), "0")) {
			sqlBuffer.append(" and c.dwbh = d.dwbh and d.dwxzqh = e.qydm and e.qydm = '" + param.get("orgId") + "'");
	    }
	    if (StringUtil.equals(param.get("orgType"), "1")) {
	    	sqlBuffer.append(" and c.dwbh = d.dwbh and d.dwbh = '" + param.get("orgId") + "'");
	    }
	    if (StringUtil.equals(param.get("orgType"), "2")) {
	    	sqlBuffer.append(" and c.kkbh = '440" + param.get("orgId") + "'");
	    }
	    if (StringUtil.checkStr(param.get("startTime")) && StringUtil.checkStr(param.get("endTime"))) {
	    	sqlBuffer.append(" and a.start_time between " +
	    			"to_date('" + DateUtil.parseToString(param.get("startTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss') and " +
					"to_date('" + DateUtil.parseToString(param.get("endTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss') and " +
					"c.VERIFY_STATUS = 1");
	    }
	    sqlBuffer.append(") f where ");
	    if (StringUtil.equals(param.get("culumnOline"), "1")) {
			sqlBuffer.append("status = '" + param.get("culumnOline") + "'");
		} else {
			sqlBuffer.append("(status = '0' or status = '3')");
		}
		sqlBuffer.append(" group by");
	    if (StringUtil.equals(param.get("orgType"), "0")) {
			sqlBuffer.append(" qymc,");
		}
	    sqlBuffer.append(" dwmc,KKBH,KKMC,datatime");
	    sqlBuffer.append(") group by");
	    if (StringUtil.equals(param.get("orgType"), "0")) {
			sqlBuffer.append(" qymc, datatime");
		} else {
			sqlBuffer.append(" dwmc, datatime");
		}
    	sqlBuffer.append(" order by datatime");
	    return sqlBuffer.toString();
	}
	
	/**
	 * 数据接收率,趋势图查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> dataAcceptTrendChartOnlyLineInfo(Map<String, String> param) {
		String sql = this.initTrendChartOnlyLineSql(param);
	    List<Map<String, String>> results = null;
		try {
			results = this.queryBySql(sql);
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
	    return results;
	}
}
