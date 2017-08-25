package com.jp.tic.business.device.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.business.device.service.DevicePollingService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.core.annotation.Log;
import com.jp.tic.system.util.ConstantUtil;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/devicePolling")
public class DevicePollingController extends AbstractController {

	@Autowired
	DevicePollingService devicePollingService;
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/devicePollingPage")
	public String devicePolingLoad() {
		return "/device/device-polling";
	}
	
	/**
	 * 加载巡检统计页面
	 * @return 页面映射
	 */
	@RequestMapping("/pollingStatisticsPage")
	public String pollingStatisticsPageLoad() {
		return "/device/device-polling-statistics";
	}
	
	/**
	 * 分页查询人工巡检信息数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/queryDevicePolling")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'查询人工登记巡检信息'",content="'设备名称:' + getWebParamInfo().get('deviceName') + ',组织编号:' + getWebParamInfo().get('code')",needPersist= true,operation="SEARCH")
	public Object queryDevicePollingInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = devicePollingService.queryDevicePollingInfo(searchParam);
		List<Map<String, String>> counts = devicePollingService.countDevicePollingDatas(searchParam);
		int amounts = StringUtil.toInt(counts.get(0).get("COUNTS"));
		return ResponseUtils.sendList(results, amounts);
	}
	
	/**
	 * 添加人工巡检记录
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/addDevicePolling")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'新增人工登记巡检信息'",content="'设备描述:' + getWebParamInfo().get('deviceDesc')",needPersist= true,operation="ADD")
	public Object addDevicePollingInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int saveFlag = 0;
		saveFlag = this.devicePollingService.addDevicePollingInfo(searchParam);
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 初始化修改数据的详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/initDevicePollingDetail")
	@ResponseBody
	public Object initDevicePollingDetailInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = devicePollingService.initDevicePollingDetailInfo(searchParam);
		this.jsonResult.setData(results);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 修改人工巡检记录
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/updateDevicePolling")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'修改人工登记巡检信息'",content="'设备描述:' + getWebParamInfo().get('deviceDesc')",needPersist= true,operation="UPDATE")
	public Object updateDevicePollingInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int updateFlag = 0;
		updateFlag = this.devicePollingService.updateDevicePollingInfo(searchParam);
		this.jsonResult.setData(updateFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 删除人工巡检记录
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/deleteDevicePolling")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'删除人工登记巡检信息'",content="'删除编号:' + getWebParamInfo().get('idStr')",needPersist= true,operation="DELETE")
	public Object deleteDevicePollingInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int deleteFlag = 0;
		deleteFlag = this.devicePollingService.deleteDevicePollingInfo(searchParam);
		this.jsonResult.setData(deleteFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 统计设备巡检
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/queryPollingStatistics")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'统计设备巡检'",content="'部门ID:' + getWebParamInfo().get('orgId')",needPersist= true,operation="SEARCH")
	public Object queryPollingStatisticsInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		if (StringUtil.equals(searchParam.get("orgType"), ConstantUtil.AREA_ORG_TYPE)) { //选的是区域
			searchParam.put("areaId", searchParam.get("orgId"));
		}
		if (StringUtil.equals(searchParam.get("orgType"), ConstantUtil.DEPT_ORG_TYPE)) { //选的是部门
			searchParam.put("deptId", searchParam.get("orgId"));
		}
		if (StringUtil.equals(searchParam.get("orgType"), ConstantUtil.MOUNT_ORG_TYPE)) { //选的是卡点
			searchParam.put("mountId", ConstantUtil.MOUNT_CODE_PRDFIX + searchParam.get("orgId"));
		}
		List<Map<String, String>> results = null;
		if (!StringUtil.checkObj(searchParam.get("orgId"))) {
			results = new ArrayList<Map<String,String>>();
		} else {
			results = devicePollingService.queryPollingStatisticsInfo(searchParam);
		}
		if (results != null && results.size() > 0) {
			Map<String, String> amountMap = new HashedMap();
			int pollingAllTimes = 0;
			for (Map<String, String> map : results) {
				pollingAllTimes = pollingAllTimes + StringUtil.toInt(map.get("POLLING_TIMES"));
			}
			amountMap.put("POLLING_TIMES", "巡检总数:" + pollingAllTimes);
			results.add(amountMap);
		}
		return ResponseUtils.sendList(results, 0);
	}
}
