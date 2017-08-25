package com.jp.tic.business.datacenter.service;

import java.util.List;
import java.util.Map;

public interface DataStatisticsService {

	/**
	 * 卡口车流量统计,按卡口统计详细信息
	 * @param searchParam
	 * @return 查询结果
	 * @throws Exception
	 */
	public List<Map<String, String>> mountDataStatisticsInfo(Map<String, String> searchParam) throws Exception;
	
	/**
	 * 卡口车流量统计,按单位统计详细信息
	 * @param searchParam
	 * @return 查询结果
	 * @throws Exception
	 */
	public List<Map<String, String>> deptDataStatisticsInfo(Map<String, String> searchParam) throws Exception;
	
	/**
	 * 定时查询solr分组数据
	 */
	public void querySolrFacetData();
	
	/**
	 * 车流量统计曲线图
	 * @param searchParam
	 * @return
	 */
	public List<Map<String, String>> statisticsCarDatas(Map<String, String> searchParam);
	
	/**
	 * 加载所有的solr数据总量
	 * @return
	 */
	public int loadALLDataMounts();
}
