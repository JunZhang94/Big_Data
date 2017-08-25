package com.jp.tic.business.device.dao;

import java.util.List;
import java.util.Map;

public interface DeviceManagerDao {

	/**
	 * 分页查询设备信息数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryDeviceInfo(Map<String, String> param);
	
	/**
	 * 统计设备数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countDeviceDatas(Map<String, String> param);
	
	/**
	 * 添加设备
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addDeviceInfo(Map<String, String> param);
	
	/**
	 * 删除设备
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteDeviceInfo(Map<String, String> param);
	
	/**
	 * 查询设备状态信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryDeviceState(Map<String, String> param);
	
	/**
	 * 查询设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryDeviceTroubleState(Map<String, String> param);
	
	/**
	 * 更新设备信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateDeviceInfo(Map<String, String> param);
	
	/**
	 * 统计设备状态数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countDeviceStateCounts(Map<String, String> param);
	
	/**
	 * 统计设备故障数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countDeviceTroubleCounts(Map<String, String> param);
	
	/**
	 * 修改设备数据，加载要修改的数据信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initDeviceDetailInfo(Map<String, String> param);
	
	/**
	 * 获取所有的设备信息，因为没有引入权限控制
	 * @return 查询结果
	 */
	public List<Map<String, String>> findAllDeviceInfo();
	
	/**
	 * 保存设备监听的设备状态信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int saveDeviceInfo(Map<String, String> param);
	
	/**
	 * 添加设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addDeviceTroubleInfo(Map<String, String> param);
	
	/**
	 * 检查是否存在此设备的故障信息
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> checkDeviceTroubleInfo(Map<String, String> param);
	
	/**
	 * 更新设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateDeviceTroubleInfo(Map<String, String> param);
	
	/**
	 * 修改设备数据，加载要修改的数据信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initDeviceTroubleDetailInfo(Map<String, String> param);
	
	/**
	 * 删除设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteDeviceTroubleInfo(Map<String, String> param);
	
	/**
	 * 人工确认设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addTroubleVerifyInfo(Map<String, String> param);
	
	/**
	 * 人工确认设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addTroubleDealWithInfo(Map<String, String> param);
	
	/**
	 * 统计设备状态信息
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryDeviceStatisticsInfo(Map<String, String> param);
	
	/**
	 * 统计设备故障信息
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryTroubleStatisticsInfo(Map<String, String> param);
	
	/**
	 * 车牌识别率
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryRecognitionRateInfo(Map<String, String> param);
}
