package com.jp.tic.analyze.service;

import java.util.List;
import java.util.Map;

public interface ChartStatusService {

	/**
	 * 卡口在线状态查询,查询首页柱状图
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountCulumnStatusInfo(Map<String, String> param);
	
	/**
	 * 数据接收率查询,查询首页柱状图
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> dataColumnAcceptInfo(Map<String, String> param);
	
	/**
	 * 卡口在线状态,趋势图查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountStatusLine(Map<String, String> param);
	
	/**
	 * 数据接收状态,趋势图查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> dataAcceptLineInfo(Map<String, String> param);
	
	/**
	 * 调用卡口在线统计和数据接收统计存储过程
	 * @param domain
	 * @return
	 */
	public void makeDisMountDatas();
	
	/**
	 * 调用卡口在线统计和数据接收统计存储过程
	 * @param dateStr 时间格式：yyyy-mm-dd HH
	 */
	public void statisticsCharStatusProc();
	
	/**
	 * 调用卡口在线统计和数据接收统计存储过程,按天统计
	 * @param dateStr 时间格式：yyyy-mm-dd
	 * @return
	 */
	public void statisticsCharStatusDayProc();
}
