package com.jp.tic.business.device.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.device.dao.DeviceManagerDao;
import com.jp.tic.business.device.dao.MountManagerDao;
import com.jp.tic.business.device.mapper.DeviceManagerMapper;
import com.jp.tic.business.device.service.DeviceManagerService;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.opensymphony.oscache.general.GeneralCacheAdministrator;

@Service
public class DeviceManagerServiceImpl implements DeviceManagerService {
	
	@Autowired
	DeviceManagerDao deviceManagerDao;
	@Autowired
	DeviceManagerMapper deviceManagerMapper;
	
	@Autowired
	MountManagerDao mountManagerDao;
	
	private GeneralCacheAdministrator admin = new GeneralCacheAdministrator();
	private Logger logger = LoggerFactory.getLogger(DeviceManagerServiceImpl.class);
	
	/**
	 * 分页查询设备信息数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryDeviceInfo(Map<String, String> param) {
		if (StringUtil.checkObj(param.get("code"))) {
			//param.put("code", "440" + param.get("code"));
			param.put("code","440" + param.get("code"));
		}
		return deviceManagerMapper.queryDeviceInfo(param);
	}
	
	/**
	 * 统计设备数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countDeviceDatas(Map<String, String> param) {
		return deviceManagerMapper.countDeviceDatas(param);
	}
	
	/**
	 * 添加设备
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addDeviceInfo(Map<String, String> param) {
		return deviceManagerMapper.addDeviceInfo(param);
	}
	
	/**
	 * 删除设备
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteDeviceInfo(Map<String, String> param) {
		return deviceManagerMapper.deleteDeviceInfo(param);
	}
	
	/**
	 * 查询设备状态信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryDeviceState(Map<String, String> param) {
		return deviceManagerMapper.queryDeviceState(param);
	}
	
	/**
	 * 查询设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryDeviceTroubleState(Map<String, String> param) {
		return deviceManagerMapper.queryDeviceTroubleState(param);
	}
	
	/**
	 * 更新设备信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateDeviceInfo(Map<String, String> param) {
		return deviceManagerMapper.updateDeviceInfo(param);
	}
	
	/**
	 * 统计设备状态数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countDeviceStateCounts(Map<String, String> param) {
		return deviceManagerMapper.countDeviceStateCounts(param);
	}
	
	/**
	 * 统计设备故障数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countDeviceTroubleCounts(Map<String, String> param) {
		return deviceManagerMapper.countDeviceTroubleCounts(param);
	}
	
	/**
	 * 修改设备数据，加载要修改的数据信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initDeviceDetailInfo(Map<String, String> param) {
		return deviceManagerMapper.initDeviceDetailInfo(param);
	}
	
	/**
	 * 获取所有的设备信息，因为没有引入权限控制
	 * 重写该方法，加入缓存控制
	 * @return 查询结果
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, String>> findAllDeviceInfo() {
		boolean updated = false;
		List<Map<String, String>> results = null;
		try {
			results = (List<Map<String, String>>)(((Map<String, List<Map<String, String>>> )admin.getFromCache("DEVICE", 7200)).get("deviceInfos"));
			logger.debug("设备翻译信息来自缓存");
		} catch (Exception e) {
			logger.debug("设备翻译信息来自数据库");
			try {
				List<Map<String, String>> deviceInfos = deviceManagerMapper.findAllDeviceInfo();
				Map<String, List<Map<String, String>>> dataMap= new HashMap<String, List<Map<String, String>>>();
				dataMap.put("deviceInfos", deviceInfos);
				admin.putInCache("DEVICE", dataMap);
				results = deviceInfos;
				updated = true;
			} finally {
				if (!updated) {
					admin.cancelUpdate("DEVICE");
				}
			}
		}
		return results;
	}
	
	/**
	 * 保存设备监听的设备状态信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int saveDeviceInfo(Map<String, String> param) {
		return deviceManagerDao.saveDeviceInfo(param);
	}
	
	/**
	 * 分页查询人工登记的设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryDeviceTroubleInfo(Map<String, String> param) {
		return deviceManagerMapper.queryDeviceTroubleInfo(param);
	}
	
	/**
	 * 统计人工登记的设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countDeviceTroubleDatas(Map<String, String> param) {
		return deviceManagerMapper.countDeviceTroubleDatas(param);
	}
	
	/**
	 * 添加设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addDeviceTroubleInfo(Map<String, String> param) {
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
		return deviceManagerDao.addDeviceTroubleInfo(param);
	}
	
	/**
	 * 检查是否存在此设备的故障信息
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> checkDeviceTroubleInfo(Map<String, String> param) {
		return deviceManagerDao.checkDeviceTroubleInfo(param);
	}
	
	/**
	 * 更新设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateDeviceTroubleInfo(Map<String, String> param) {
		return deviceManagerDao.updateDeviceTroubleInfo(param);
	}
	
	/**
	 * 修改设备数据，加载要修改的数据信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initDeviceTroubleDetailInfo(Map<String, String> param) {
		return deviceManagerDao.initDeviceTroubleDetailInfo(param);
	}
	
	/**
	 * 删除设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteDeviceTroubleInfo(Map<String, String> param) {
		return deviceManagerDao.deleteDeviceTroubleInfo(param);
	}
	
	/**
	 * 人工确认设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addTroubleVerifyInfo(Map<String, String> param) {
		return deviceManagerDao.addTroubleVerifyInfo(param);
	}
	
	/**
	 * 人工确认设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addTroubleDealWithInfo(Map<String, String> param) {
		return deviceManagerDao.addTroubleDealWithInfo(param);
	}
	
	/**
	 * 统计设备状态信息
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryDeviceStatisticsInfo(Map<String, String> param) {
		return deviceManagerDao.queryDeviceStatisticsInfo(param);
	}
	
	/**
	 * 统计设备故障信息
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryTroubleStatisticsInfo(Map<String, String> param) {
		return deviceManagerDao.queryTroubleStatisticsInfo(param);
	}
	
	/**
	 * 车牌识别率
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryRecognitionRateInfo(Map<String, String> param) {
		return deviceManagerDao.queryRecognitionRateInfo(param);
	}

	@Override
	public Map<String,String> editDevices(String jsonParam) {
		Map<String,String> result=new HashMap<String,String>();
		Map<String, String> param = JsonUtil.jsonToMap(jsonParam);
		int operFlag=0;
		String sbzt="";
		String srcSbbh=param.get("SBBH");
		param.put("SRCBH", srcSbbh);
		String action=param.get("ACTION").trim();
		if(action.equals("1")){
			sbzt="0";
		}else if(action.equals("2")){
			sbzt="3";
		}else if(action.equals("3")){
			sbzt="3";
		}else if(action.equals("4")){
			sbzt="0";
		}
		param.put("SBZT", sbzt);
		if(StringUtil.checkObj(param.get("SBBH"))){
			if (srcSbbh.length() <= 18) {
				param.put("SBBH", srcSbbh);
				param.put("KKBH", srcSbbh);
				param.put("SSKKBH", srcSbbh);
			} else {
				String sbbh=srcSbbh.substring(0, 13) + srcSbbh.substring(15);
				param.put("SBBH", sbbh);
				param.put("KKBH", sbbh);
				param.put("SSKKBH", sbbh);
			}
		}
		//DWBH存的是三屏的区域编号信息，需做转换，单位编号默认赋给科技通信处
		if(StringUtil.checkObj(param.get("DWBH"))){
			param.put("XZQH", param.get("DWBH"));
			param.put("DWBH", "440100000000");
		}
		else{
			param.put("DWBH", "440100000000");
		}
		int updateNum=deviceManagerDao.updateDeviceInfo(param);
		if(sbzt.equals("0")){
			if(updateNum>0){
				operFlag=mountManagerDao.updateVMountInfo(param);
				//表示虚拟卡口表中不存在此记录
				if(operFlag == 0){
					operFlag=mountManagerDao.addVMountInfo(param);
				}
			} else {
				//表示不存在此设备记录
				operFlag=deviceManagerDao.addDeviceInfo(param);
				if(operFlag >0){
					operFlag=mountManagerDao.addVMountInfo(param);
					if(operFlag == 0){//增加 不成功则更新处理
						operFlag=mountManagerDao.updateVMountInfo(param);
					}
				}
			}
		}else{
			if(updateNum>0){
				operFlag=mountManagerDao.updateVMountInfo(param);
			}else{
				operFlag=0;
			}
		}
		if(operFlag>0){
			result.put("result", "0");
			result.put("desc", "操作成功");
		}else{
			result.put("result", "1");
			result.put("desc", "操作失败");
			if(!sbzt.equals("0")){
				result.put("desc", "设备信息不存在");
			}
		}
		return result;
	}
}
