package com.jp.tic.business.cartake.dao;

import java.util.List;
import java.util.Map;

public interface NightAndDazedDao {
	
	/**
	 * 统计查询白天的数据量信息
	 * @param param 参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryDazedData(Map<String, String> param);

	/**
	 * 统计查询晚上的数据量信息
	 * @param param 参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryNightData(List<String> hphmList, Map<String, String> param);
	
	/**
	 * 查看是否存在布控信息
	 * @param carNumList
	 * @return
	 */
	public List<Map<String, String>> queryControlDatas(List<String> carNumList);
	
	/**
	 * 统计车牌号码告警次数
	 * @param carNumList
	 * @return
	 */
	public List<Map<String, String>> countsControlAlarmDatas(List<String> carNumList);
}
