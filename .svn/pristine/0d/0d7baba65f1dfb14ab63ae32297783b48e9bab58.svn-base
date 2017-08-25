package com.jp.tic.business.alarm.service;

import java.util.List;
import java.util.Map;

public interface ControlAlarmService {

	/**
	 * 分页查询布控告警信息数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryControlAlarmInfo(Map<String, String> param);
	

	public List<Map<String, String>> queryControlAlarmInfos(Map<String, String> param);
	
	/**
	 * 统计布控告警信息数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countControlAlarmDatas(Map<String, String> param);
	
	/**
	 * 根据时间段参数统计布控告警信息数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int getTotalAlarmDatas(Map<String, String> param);
	/**
	 * 根据时间段参数按分局统计告警数据量
	 * @param param
	 * @return
	 */
	public List<Map<String,Object>> getAlarmDatasByGroup(Map<String, String> param);
	/**
	 * 统计目前有效的按分局统计布控告警分布情况
	 * @param param
	 * @return
	 */
	public List<Map<String,Object>> getValidControlByGroup(Map<String, String> param);
	
	/**
	 * 查询布控告警详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> alarmControlDetail(Map<String, String> param);
	
	/**
	 * 导出布控告警信息数据
	 * @param partIds 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> exportControlAlarmById(String[] partIds);
	
	/**
	 * 根据查询条件导出查询数据
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public String exportQuerySql(Map<String, String> param);
	
	/**
	 * 通过用户勾选图片的ID，获取图片URL
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> loadImgUrlByIds(Map<String, String> param);
	
	/**
	 * 首页全文检索查询布控告警信息数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> firstPageAlarmInfo(Map<String, String> param);
}
