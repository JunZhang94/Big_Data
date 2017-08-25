package com.jp.tic.business.datacenter.service;

import java.util.List;
import java.util.Map;

public interface DataRecieveService {

	/**
	 * 数据接收状态查询
	 * @param mounts 卡点
	 * @return 返回结果
	 */
	public List<Map<String, String>> dataRecieveStatusInfo(List<Map<String, String>> mounts);
	
	/**
     * 卡口车流量统计
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> trafficStatisticsInfo(Map<String, String> param);
    
    /**
	 * 数据接收率查询,只查询首页柱状图
	 * @param mounts 卡点
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> dataAcceptOnlyColumnInfo(List<Map<String, String>> mounts, Map<String, String> param);
	
	/**
	 * 数据接收率,趋势图查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> dataAcceptTrendChartOnlyLineInfo(Map<String, String> param);
}
