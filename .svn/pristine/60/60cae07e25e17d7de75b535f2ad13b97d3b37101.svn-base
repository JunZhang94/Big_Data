package com.jp.tic.analyze.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jp.tic.analyze.dao.ChartStatusDao;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.utils.db.DatabaseUtil;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;

@SuppressWarnings("unchecked")
@Repository
public class ChartStatusDaoImpl extends BaseDao implements ChartStatusDao {

	/**
	 * 卡口在线状态查询,查询首页柱状图
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountCulumnStatusInfo(Map<String, String> param) {
		List<Map<String, String>> results = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select f.dwmc as PERIOD, count(1) as COUNT from (select d.dwmc, case when ceil((sysdate - d.JGSJ) * 24 * 60) > " +
				"(select j.value from j_Sys_Config j where j.code = 'FaultState') then '0' else '1' end as ONLINE_STATUS " +
				"from DIS_GATE_TIME_STATUS_NEW d) f where f.ONLINE_STATUS = '1' group by f.dwmc");
		try {
			results = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return results;
	}
	
	/**
	 * 数据接收率查询,查询首页柱状图
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> dataColumnAcceptInfo(Map<String, String> param) {
		List<Map<String, String>> results = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select f.dwmc as PERIOD, count(1) as COUNT from DIS_GATE_TIME_STATUS_NEW f where f.status = '1' group by dwmc");
		try {
			results = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return results;
	}
	
	/**
	 * 卡口在线状态,趋势图查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountStatusLine(Map<String, String> param) {
		String sql = this.initTrendChartMountLineSql(param);
	    List<Map<String, String>> results = null;
		try {
			results = this.queryBySql(sql);
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
	    return results;
	}
	
	/**
	 * 组装趋势图卡口在线状态sql语句
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public String initTrendChartMountLineSql(Map<String, String> param) {
		StringBuffer sqlBuffer = new StringBuffer();
		if (StringUtil.equals(param.get("orgType"), "0")) { //选的是广州市
			if (StringUtil.equals(param.get("timeType"), "1")) { //日:查询24小时以内的数据
				sqlBuffer.append("select f.qymc as dwmc, sum(f.amounts) as count, f.PERIOD from " +
					"(select a.qymc, a.amounts, to_char(a.analyze_hour, 'yyyy-mm-dd hh24') as PERIOD " +
					"from DIS_GATE_TIME_STATUS_HISTORY a where a.analyze_hour between " +
					"to_date('" + DateUtil.parseToString(param.get("startTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss') and " +
					"to_date('" + DateUtil.parseToString(param.get("endTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss')) f " +
					"group by f.qymc, f.PERIOD order by PERIOD");
			}
			if (StringUtil.equals(param.get("timeType"), "2") || StringUtil.equals(param.get("timeType"), "3")) { //周或者月
				sqlBuffer.append("select f.qymc as dwmc, sum(f.amounts) as count, f.PERIOD from " +
						"(select a.qymc, a.amounts, to_char(a.analyze_hour, 'mm-dd') as PERIOD " +
						"from DIS_GATE_TIME_STATUS_HISTORY a where a.analyze_hour between " +
						"to_date('" + DateUtil.parseToString(param.get("startTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss') and " +
						"to_date('" + DateUtil.parseToString(param.get("endTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss')) f group by f.qymc, f.PERIOD order by PERIOD");
				/*sqlBuffer.append("select f.qymc as dwmc, sum(f.amounts) as count, f.PERIOD from " +
					"(select a.qymc, a.amounts, to_char(a.analyze_day, 'mm-dd') as PERIOD " +
					"from DIS_GATE_TIME_STATUS_DAY a where a.analyze_day between " +
					"to_date('" + DateUtil.parseToString(param.get("startTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss') and " +
					"to_date('" + DateUtil.parseToString(param.get("endTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss')) f group by f.qymc, f.PERIOD order by PERIOD");*/
			}
		} else {
			if (StringUtil.equals(param.get("timeType"), "1")) { //日:查询24小时以内的数据
				sqlBuffer.append("select a.dwmc, a.amounts as count, to_char(a.analyze_hour, 'yyyy-mm-dd hh24') as PERIOD " +
					"from DIS_GATE_TIME_STATUS_HISTORY a where a.dwbh = '" + param.get("orgId") + "' and a.analyze_hour between " +
					"to_date('" + DateUtil.parseToString(param.get("startTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss') and " +
					"to_date('" + DateUtil.parseToString(param.get("endTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss') order by PERIOD");
			}
			if (StringUtil.equals(param.get("timeType"), "2") || StringUtil.equals(param.get("timeType"), "3")) { //周或者月
				sqlBuffer.append("select f.dwmc, sum(f.amounts) as count, f.PERIOD from " +
						"(select a.dwmc, a.amounts, to_char(a.analyze_hour, 'mm-dd') as PERIOD " +
						"from DIS_GATE_TIME_STATUS_HISTORY a where a.dwbh = '" + param.get("orgId") + "' and a.analyze_hour between " +
						"to_date('" + DateUtil.parseToString(param.get("startTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss') and " +
						"to_date('" + DateUtil.parseToString(param.get("endTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss')) f group by f.dwmc, f.PERIOD order by PERIOD");
				/*sqlBuffer.append("select a.dwmc, a.amounts as count, to_char(a.analyze_day, 'mm-dd') as PERIOD " +
					"from DIS_GATE_TIME_STATUS_DAY a where a.dwbh = '" + param.get("orgId") + "' and a.analyze_day between " +
					"to_date('" + DateUtil.parseToString(param.get("startTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss') and " +
					"to_date('" + DateUtil.parseToString(param.get("endTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss') order by PERIOD");*/
			}
		}
	    return sqlBuffer.toString();
	}
	
	/**
	 * 数据接收状态,趋势图查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> dataAcceptLineInfo(Map<String, String> param) {
		String sql = this.initTrendChartDataLineSql(param);
	    List<Map<String, String>> results = null;
		try {
			results = this.queryBySql(sql);
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
	    return results;
	}
	
	/**
	 * 组装趋势图数据接收状态sql语句
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public String initTrendChartDataLineSql(Map<String, String> param) {
		StringBuffer sqlBuffer = new StringBuffer();
		if (StringUtil.equals(param.get("orgType"), "0")) { //选的是广州市
			if (StringUtil.equals(param.get("timeType"), "1")) { //日:查询24小时以内的数据
				sqlBuffer.append("select f.qymc as dwmc, sum(f.amounts) as count, f.PERIOD from " +
					"(select a.qymc, a.amounts, to_char(a.analyze_hour, 'yyyy-mm-dd hh24') as PERIOD " +
					"from DIS_GATE_DATA_STATUS_HISTORY a where a.analyze_hour between " +
					"to_date('" + DateUtil.parseToString(param.get("startTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss') and " +
					"to_date('" + DateUtil.parseToString(param.get("endTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss')) f " +
					"group by f.qymc, f.PERIOD order by PERIOD");
			}
			if (StringUtil.equals(param.get("timeType"), "2") || StringUtil.equals(param.get("timeType"), "3")) { //周或者月
				sqlBuffer.append("select f.qymc as dwmc, sum(f.amounts) as count, f.PERIOD from " +
					"(select a.qymc, a.amounts, to_char(a.analyze_day, 'mm-dd') as PERIOD " +
					"from DIS_GATE_DATA_STATUS_DAY a where a.analyze_day between " +
					"to_date('" + DateUtil.parseToString(param.get("startTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss') and " +
					"to_date('" + DateUtil.parseToString(param.get("endTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss')) f group by f.qymc, f.PERIOD order by PERIOD");
			}
		} else {
			if (StringUtil.equals(param.get("timeType"), "1")) { //日:查询24小时以内的数据
				sqlBuffer.append("select a.dwmc, a.amounts as count, to_char(a.analyze_hour, 'yyyy-mm-dd hh24') as PERIOD " +
					"from DIS_GATE_DATA_STATUS_HISTORY a where a.dwbh = '" + param.get("orgId") + "' and a.analyze_hour between " +
					"to_date('" + DateUtil.parseToString(param.get("startTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss') and " +
					"to_date('" + DateUtil.parseToString(param.get("endTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss') order by PERIOD");
			}
			if (StringUtil.equals(param.get("timeType"), "2") || StringUtil.equals(param.get("timeType"), "3")) { //周或者月
				sqlBuffer.append("select a.dwmc, a.amounts as count, to_char(a.analyze_day, 'mm-dd') as PERIOD " +
					"from DIS_GATE_DATA_STATUS_DAY a where a.dwbh = '" + param.get("orgId") + "' and a.analyze_day between " +
					"to_date('" + DateUtil.parseToString(param.get("startTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss') and " +
					"to_date('" + DateUtil.parseToString(param.get("endTime"), "yyyy-MM-dd HH:mm:ss") + "','yyyy-MM-dd HH24:mi:ss') order by PERIOD");
			}
		}
	    return sqlBuffer.toString();
	}
	
	/**
	 * 调用卡口在线统计和数据接收统计存储过程
	 * @param domain
	 * @return
	 */
	public void makeDisMountDatas() {
		this.loadMountDataStatusProc();
	}
	
	/**
	 * 调用卡口在线统计和数据接收统计存储过程
	 * @param dateStr 时间格式：yyyy-mm-dd HH
	 * @return
	 */
	public void statisticsCharStatusProc(String dateStr) {
		this.statisticsMountAndDataProc(dateStr);
	}
	
	/**
	 * 调用卡口在线统计和数据接收统计存储过程,按天统计
	 * @param dateStr 时间格式：yyyy-mm-dd HH
	 * @return
	 */
	public void statisticsCharStatusDayProc(String dateStr) {
		this.statisticsMountAndDataDayProc(dateStr);
	}
}
