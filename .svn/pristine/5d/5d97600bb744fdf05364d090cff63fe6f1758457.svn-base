package com.jp.tic.business.device.dao;

import java.util.List;
import java.util.Map;

public interface DevicePollingDao {
	
	/**
	 * 分页查询人工巡检信息数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryDevicePollingInfo(Map<String, String> param);
	
	/**
	 * 统计人工登记巡检数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countDevicePollingDatas(Map<String, String> param);
	
	/**
	 * 添加设备
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addDevicePollingInfo(Map<String, String> param);
	
	/**
	 * 删除人工巡检记录
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteDevicePollingInfo(Map<String, String> param);
	
	/**
	 * 更新人工巡检记录
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateDevicePollingInfo(Map<String, String> param);
	
	/**
	 * 修改人工巡检记录，加载要修改的数据信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initDevicePollingDetailInfo(Map<String, String> param);
	
	/**
	 * 统计设备巡检
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryPollingStatisticsInfo(Map<String, String> param);
}
