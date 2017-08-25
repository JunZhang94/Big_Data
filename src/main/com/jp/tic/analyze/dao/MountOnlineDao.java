package com.jp.tic.analyze.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface MountOnlineDao {

	/**
	 * 卡口在线统计
	 * @param mounts 卡点
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOnlineStatisticsInfo(List<Map<String, String>> mounts, Map<String, String> param);
	
	/**
	 * 卡口在线状态查询
	 * @param mounts 卡点
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOnlienStatusInfo(List<Map<String, String>> mounts, Map<String, String> param);
	/**
	 * 卡口在线状态查询（新）
	 * @param mounts 卡点
	 * @param param 查询参数
	 * @return 返回结果
	 * 
	 */
	public List<Map<String, String>> mountOnlienStatusInfoNewByfx(List<Map<String, String>> mounts, Map<String, String> param)throws Exception;
	/**
	 * 卡口在线状态查询（新）
	 * @param mounts 卡点
	 * @param param 查询参数
	 * @return 返回结果
	 * 
	 */
	public List<Map<String, String>> mountOnlienStatusInfoNew(Map<String, String> mounts, Map<String, String> param)throws Exception;
	/**
	 * 卡口在线状态图表查询
	 * @param mounts 卡点
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOnlineChartInfo(List<Map<String, String>> mounts, Map<String, String> param);
	
	/**
	 * 卡口离线状态统计
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOutOnlineChartInfo(Map<String, String> param);
	
	/**
	 * 卡口在线状态,趋势图查询
	 * @param mounts 卡点
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOnlineTrendChartInfo(List<Map<String, String>> mounts, Map<String, String> param);
	
	/**
	 * 卡口离线状态统计,趋势图查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOutOnlineTrendChartInfo(Map<String, String> param);
	
	/**
	 * 卡口在线状态查询,只查询首页柱状图
	 * @param mounts 卡点
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountStatusOnlyCulumnInfo(List<Map<String, String>> mounts, Map<String, String> param);
	
	/**
	 * 卡口在线状态,趋势图查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOnlineTrendChartOnlyLineInfo(Map<String, String> param);
	
	public void updatesql(List<String> sql);
	
	/**
	 * 首页卡口在线状态柱状图重新设计，根据hbase数据作为判断标准
	 * @param mounts 卡点
	 * @return 返回结果
	 */
	public List<Map<String, String>> firstPageMountStatus(List<Map<String, String>> mounts) throws Exception;
	
	/**
	 * 定时调度卡口在线状态数据，统计一个小时内的卡口在线状态，根据hbase数据作为判断标准
	 * @param mounts 卡口集合
	 * @return 处理结果
	 * @throws Exception 异常
	 */
	public List<Map<String, String>> historyMountStatus(Map<String, String> mounts, Date startDate, Date endDate) throws Exception;
	
	/**
	 * 添加卡口接收状态时时数据
	 * @param datas 查询参数
	 * @return 返回结果
	 */
	public int addMountStatusInfo(List<Map<String, String>> datas);
	
	/**
	 * 查询卡口在线历史最新数据
	 * @return 查询结果
	 */
	public List<Map<String, String>> findNewistData();
}
