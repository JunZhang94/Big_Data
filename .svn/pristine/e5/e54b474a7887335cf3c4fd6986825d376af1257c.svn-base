package com.jp.tic.business.datacenter.dao;

import java.util.List;
import java.util.Map;

public interface DataStatisticsDao {

	/**
	 * 卡口车流量统计,按卡口统计详细信息
	 * @param searchParam
	 * @return 查询结果
	 * @throws Exception
	 */
	public List<Map<String, String>> mountDataStatisticsInfo(Map<String, String> searchParam);
	
	/**
	 * 定时查询solr分组数据
	 * @param carFnum 车辆查询条件
	 */
	public List<Map<String, String>> querySolrFacetData(String carFnum);
	
	/**
	 * 保存查询数据
	 * @param datas 查询结果
	 * @return
	 */
	public int saveQueryResult(List<Map<String, String>> datas);
	
	/**
	 * 保存外地车查询数据
	 * @param datas 查询结果
	 * @return
	 */
	public int saveQueryProResult(List<Map<String, String>> datas);
	
	/**
	 * 保存内地车查询数据
	 * @param datas 查询结果
	 * @return
	 */
	public int saveQueryLocalResult(List<Map<String, String>> datas);
	
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
