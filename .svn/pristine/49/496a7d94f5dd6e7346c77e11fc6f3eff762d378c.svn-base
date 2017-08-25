package com.jp.tic.business.device.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.device.dao.DevicePollingDao;
import com.jp.tic.business.device.service.DevicePollingService;
import com.jp.tic.utils.lang.StringUtil;

@Service
public class DevicePollingServiceImpl implements DevicePollingService {

	@Autowired
	DevicePollingDao devicePollingDao;
	
	/**
	 * 分页查询人工巡检信息数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryDevicePollingInfo(Map<String, String> param) {
		return devicePollingDao.queryDevicePollingInfo(param);
	}
	
	/**
	 * 统计人工登记巡检数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countDevicePollingDatas(Map<String, String> param) {
		return devicePollingDao.countDevicePollingDatas(param);
	}
	
	/**
	 * 添加设备
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addDevicePollingInfo(Map<String, String> param) {
		String[] deviceArr = param.get("deviceDesc").split("=");
		String deviceNumber = "";
		String deviceName = "";
		if (StringUtil.checkObj(deviceArr[1])) {
			deviceNumber = deviceArr[1];
		}
		if (StringUtil.checkObj(deviceArr[2])) {
			deviceName = deviceArr[0];
		}
		param.put("deviceNumber", deviceNumber);
		param.put("deviceName", deviceName);
		return devicePollingDao.addDevicePollingInfo(param);
	}
	
	/**
	 * 删除人工巡检记录
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteDevicePollingInfo(Map<String, String> param) {
		return devicePollingDao.deleteDevicePollingInfo(param);
	}
	
	/**
	 * 更新人工巡检记录
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateDevicePollingInfo(Map<String, String> param) {
		return devicePollingDao.updateDevicePollingInfo(param);
	}
	
	/**
	 * 修改人工巡检记录，加载要修改的数据信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initDevicePollingDetailInfo(Map<String, String> param) {
		return devicePollingDao.initDevicePollingDetailInfo(param);
	}
	
	/**
	 * 统计设备巡检
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryPollingStatisticsInfo(Map<String, String> param) {
		return devicePollingDao.queryPollingStatisticsInfo(param);
	}
}
