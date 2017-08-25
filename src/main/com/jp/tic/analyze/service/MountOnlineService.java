package com.jp.tic.analyze.service;

import java.util.List;
import java.util.Map;

public interface MountOnlineService {

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
	public List<Map<String, String>> mountOnlienStatusInfo(Map<String, String> mounts, Map<String, String> param);
	
	/**
	 * 卡口在线状态查询
	 * @param mounts 方向
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOnlienStatusInfoByfx(List<Map<String, String>> mounts, Map<String, String> param);
	
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
	 * @throws Exception 异常
	 */
	public void addMountsStatusInfo() throws Exception;
	
	/**
	 * 统计一个小时内的卡口在线状态，根据hbase数据作为判断标准
	 * @return 处理结果
	 * @throws Exception 异常
	 */
	public List<Map<String, String>> historyMountStatus() throws Exception;
	
	/**
	 * 卡口在线状态接口查询
	 * @param searchParam 参数详细说明，（orgType，单位类型，取值：0代表选择为广州市一级别，最顶级别，1代表选的是分局这级别，及第二级别，
	 * 					  2代表选的是卡口这一级别，及第三级别），（orgId：选择的节点ID，如选择的是广州市为440100，如选择的是分局440116000000，
	 * 					    需要注意点，选择的是卡口的时候，因为卡口是18位数字长度，转Long类型会报错，因此特对卡口的长度进行了截取，截取掉了前面3位数字长度，
	 * 					   如：京珠北太和收费站以北路段：440192000040001000，截取后变成：192000040001000，请麻烦做下处理吧，这边确实没弄好。），
	 * @return 查询处理结果
	 */
	public List<Map<String, String>> mountStatusGroupping(String jsonParam);
}
