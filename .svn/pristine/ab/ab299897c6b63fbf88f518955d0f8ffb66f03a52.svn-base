package com.jp.tic.system.dao;

import java.util.List;
import java.util.Map;

/**
 * 系统配置表对应类
 * @author lsg
 */

public interface SystemConfigDao {
	
	/**
	 * 数据不多，一次性加载所有的系统配置信息
	 * @return 查询结果
	 */
	public List<Map<String, String>> findAllConfigDatas();
	
	/**
     * 加载配置信息
     * @return 查询结果
     * @author lsg
     */
	public List<Map<String, String>> loadAlarmSettingInfo();
	
	/**
	 * 保存或者更新设置信息
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int saveOrUpdateAlarmSettingInfo(Map<String, String> param);
	
	/**
	 * 更新是否启用报警设置复选框值
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateTroubleCheck(Map<String, String> param);
	
	/**
     * 查询操作日志配置
     * @return 查询结果
     * @author lsg
     */
	public List<Map<String, String>> findOperationLogConfig();
	
	/**
	 * 保存或者更新设置信息
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateOperationSettingInfo(Map<String, String> param);
	
	/**
	 * 更新是否启用操作类型复选框值
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateOperationCheck(Map<String, String> param);
	
	/**
     * 根据code查询配置信息
     * @return 查询结果
     * @author lsg
     */
	public List<Map<String, String>> findConfigByCode(String code);
	
	/**
     * 查询已启用操作日志
     * @return 查询结果
     * @author lsg
     */
	public List<Map<String, String>> findUsingLogConfig();
	
	/**
	 * 更新首页展示方式标识
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateFirstPanelFlag(Map<String, String> param);
	
	/**
	 * 更新卡口在线状态时间
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateOnlineStateTime(Map<String, String> param);
	
	/**
	 * 历史首页过车查询时间
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateCarTime(Map<String, String> param);
	
	/**
	 * 更新首页告警查询时间
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateAlarmTime(Map<String, String> param);
	
	/**
	 * 使用用户表config_flag字段
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateUserConfigFlag(Map<String, String> param);
	
	/**
	 * 假牌车分析一次分析的最大数据量
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateFakeCounts(Map<String, String> param);
	
	/**
	 * 假牌车分析分析一次的时间长度
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateFakeTimes(Map<String, String> param);
	
	/**
     * 查询系统配置的假牌查询最大数据量
     * @return 查询结果
     * @author lsg
     */
	public List<Map<String, String>> findFakeCounts();
	
	/**
     * 查询系统配置的假牌查询的时间设置
     * @return 查询结果
     * @author lsg
     */
	public List<Map<String, String>> findFakeTimes();
	
	/**
	 * 临近点分析一次性读取hbase数据总量
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateClosetLimit(Map<String, String> param);
	
	/**
	 * 卡口在线状态查询单线程分配的卡口数量
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateStatuNumber(Map<String, String> param);
	
	/**
	 * 更新历史过车查询方式状态
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateHistoryFlag(Map<String, String> param);
	
	/**
	 * 数据不多，一次性加载所有的昼伏夜出系统配置信息
	 * @return 查询结果
	 */
	public List<Map<String, String>> findAllNightAndDazedDatas();

	/**
	 * 获取饱和度
	 * @return
	 */
	public List<Map<String, String>> getSaturations()throws Exception;
}
