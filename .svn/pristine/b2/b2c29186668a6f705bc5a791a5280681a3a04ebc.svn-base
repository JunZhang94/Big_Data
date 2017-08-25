package com.jp.tic.business.device.controller;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.app.carSearch.ws.DeviceManagerWS;
import com.jp.tic.business.device.service.BayonetManagerService;
import com.jp.tic.business.device.service.DeviceManagerService;
import com.jp.tic.business.device.service.KkDirectionInfoService;
import com.jp.tic.business.user.service.UserService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.core.annotation.Log;
import com.jp.tic.system.service.OrganizationService;
import com.jp.tic.system.util.ConstantUtil;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/device")
public class DeviceManagerController extends AbstractController {
	
	@Autowired
	DeviceManagerService deviceManagerService;
	@Autowired
	BayonetManagerService bayonetManagerService;
	@Autowired
	OrganizationService organizationService;
	@Autowired
	UserService userService;
	@Autowired
	KkDirectionInfoService kkDirectionService;
	@Autowired
	DeviceManagerWS deviceManagerWS;
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/devicemgr")
	public String deviceLoad() {
		return "/device/main-device";
	}
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/deviceMonitory")
	public String deviceMonitoryLoad() {
		return "/device/device-monitory";
	}
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/deviceTroublePage")
	public String deviceTroubleLoad() {
		return "/device/device-trouble-register";
	}
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/deviceTroubleSearchPage")
	public String deviceTroubleSearchLoad() {
		return "/device/device-trouble-search";
	}
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/troubleVerifyPage")
	public String troubleVerifyLoad() {
		return "/device/device-trouble-verify";
	}
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/troubleDealWithPage")
	public String troubleDealWithPageLoad() {
		return "/device/device-trouble-dealWith";
	}
	
	/**
	 * 设备统计
	 * @return 页面映射
	 */
	@RequestMapping("/deviceStatusStatisticsPage")
	public String deviceStatusStatisticsPageLoad() {
		return "/device/device-status-statistics";
	}
	
	/**
	 * 故障统计
	 * @return 页面映射
	 */
	@RequestMapping("/deviceTroubleStatisticsPage")
	public String deviceTroubleStatisticsPageLoad() {
		return "/device/device-trouble-statistics";
	}
	
	/**
	 * 车牌识别率
	 * @return 页面映射
	 */
	@RequestMapping("/queryRecognitionRatePage")
	public String queryRecognitionRatePageLoad() {
		return "/device/license-recognition-rate";
	}
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/deviceOperationPage")
	public String deviceOperationLoad() {
		return "/device/device-status-operation";
	}
	
	/**
	 * 查询设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/queryDevice")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'查询卡口设备信息'",content="'编号:' + getWebParamInfo().get('code') + ',设备名称：' + getWebParamInfo().get('deviceName')",needPersist= true,operation="SEARCH")
	public Object queryDeviceInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = null;
		List<Map<String, String>> counts = null;
		searchParam.put("start", searchParam.get("page.start"));
		searchParam.put("limit", searchParam.get("page.limit"));
		String queryType = searchParam.get("queryType");
		if (!StringUtil.checkStr(queryType)) {
			if (StringUtil.equals(searchParam.get("orgType"), "0")) {
				results = organizationService.queryOrgInfoByPage(searchParam);
				counts = organizationService.countOrgInfoDatas(searchParam);
			}
			else if (StringUtil.equals(searchParam.get("orgType"), "1")) {
				results = bayonetManagerService.queryBayonetInfoByPage(searchParam);
				counts = bayonetManagerService.countBayonetInfoDatas(searchParam);
			}
			else if (StringUtil.equals(searchParam.get("orgType"), "2")) {
				results = deviceManagerService.queryDeviceInfo(searchParam);
				counts = deviceManagerService.countDeviceDatas(searchParam);
				/*results = kkDirectionService.queryDeviceDirInfo(searchParam);
				counts = kkDirectionService.countDeviceDirDatas(searchParam);*/
			} else if (StringUtil.equals(searchParam.get("orgType"), "4")) {
				results = deviceManagerService.queryDeviceInfo(searchParam);
				counts = deviceManagerService.countDeviceDatas(searchParam);
			} else {
				results = organizationService.queryOrgInfoByPage(searchParam);
				counts = organizationService.countOrgInfoDatas(searchParam);
			}
		} else {
			String queryFlag = searchParam.get("queryFlag") == null ? "click" : searchParam.get("queryFlag");
			if (StringUtil.equals(queryFlag, "search")) {
				searchParam.remove("code");
				if (StringUtil.equals(searchParam.get("queryType"), "0")) {
					results = organizationService.queryOrgInfoByPage(searchParam);
					counts = organizationService.countOrgInfoDatas(searchParam);
				}
				else if (StringUtil.equals(searchParam.get("queryType"), "1")) {
					results = bayonetManagerService.queryBayonetInfoByPage(searchParam);
					counts = bayonetManagerService.countBayonetInfoDatas(searchParam);
				}
				else if (StringUtil.equals(searchParam.get("queryType"), "2")) {
					results = deviceManagerService.queryDeviceInfo(searchParam);
					counts = deviceManagerService.countDeviceDatas(searchParam);
				} else {
					results = organizationService.queryOrgInfoByPage(searchParam);
					counts = organizationService.countOrgInfoDatas(searchParam);
				}
			} else {
				if (StringUtil.equals(searchParam.get("queryType"), "0")) {
					results = organizationService.queryOrgInfoByPage(searchParam);
					counts = organizationService.countOrgInfoDatas(searchParam);
				} else if (StringUtil.equals(searchParam.get("queryType"), "1")) {
					results = bayonetManagerService.queryBayonetInfoByPage(searchParam);
					counts = bayonetManagerService.countBayonetInfoDatas(searchParam);
				} else {
					results = deviceManagerService.queryDeviceInfo(searchParam);
					counts = deviceManagerService.countDeviceDatas(searchParam);
				}
			}
		}
		int amounts = StringUtil.toInt(StringUtil.toString(counts.get(0).get("COUNTS")));
		return ResponseUtils.sendList(results, amounts);          
	}
	
	/**
	 * 分页查询人工登记的设备故障信息
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/queryDeviceTrouble")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'查询人工登记设备故障信息'",content="'设备名称：' + getWebParamInfo().get('deviceName')",needPersist= true,operation="SEARCH")
	public Object queryDeviceToubleInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		searchParam.put("start", searchParam.get("page.start"));
		searchParam.put("limit", searchParam.get("page.limit"));
		if (!StringUtil.checkObj(searchParam.get("queryType"))) {
			searchParam.put("registerFlag", "1"); //人工登记故障查询
		}
		if (StringUtil.equals(searchParam.get("queryType"), "verify")) { //故障确认查询
			searchParam.put("verifyFlag", "0");
		}
		if (StringUtil.equals(searchParam.get("queryType"), "dealWith")) { //故障处理查询
			searchParam.put("verifyFlag", "1");
			searchParam.put("dealWithFlag", "0"); 
		}
		if (StringUtil.equals(searchParam.get("queryType"), "autoAlarm")) { //故障告警查询
			searchParam.put("autoAlarm", "autoAlarm"); //标识故障告警查询
		}
		List<Map<String, String>> results = deviceManagerService.queryDeviceTroubleInfo(searchParam);
		if (results != null && results.size() > 0 ) {
			for (Map<String, String> map : results) {
				map.put("SCSJ", StringUtil.toString(map.get("SCSJ")));
				map.put("GZSJ", StringUtil.toString(map.get("GZSJ")));
			}
		}
		List<Map<String, String>> counts = deviceManagerService.countDeviceTroubleDatas(searchParam);
		int amounts = StringUtil.toInt(StringUtil.toString(counts.get(0).get("COUNTS")));
		return ResponseUtils.sendList(results, amounts);
	}
	/**
	 * 添加设备
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/addDevice")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'新增设备信息'",content="'设备编号:' + getWebParamInfo().get('SBBH')",needPersist= true,operation="ADD")
	public Object addDeviceInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int saveFlag = 0;
		String curentTime = DateUtil.getCurrentDateTime();
		searchParam.put("updateDate", curentTime);
		if (StringUtil.checkObj(searchParam.get("SBCJ"))) {
			String[] proderStr = searchParam.get("SBCJ").split("_");
			searchParam.put("SBCJ", proderStr[0]);
			searchParam.put("CONTACT_NUMBER", proderStr[1]);
			searchParam.put("CONTACT_ADDRESS", proderStr[2]);
		}
		saveFlag = this.deviceManagerService.addDeviceInfo(searchParam);
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	/**
	 * 添加卡口设备方向
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/addDeviceDirection")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'新增卡口设备方向信息'",content="'设备编号:' + getWebParamInfo().get('KKBH')",needPersist= true,operation="ADD")
	public Object addDeviceDirectionInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int saveFlag = 0;
		
		searchParam.put("CREATE_TIME", StringUtil.getNowTime());
		searchParam.put("ID","SEQ_C_DIRECTION_TAB.nextval");
		saveFlag = this.kkDirectionService.addDeviceDirInfo(searchParam);
		
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 检查是否存已存在设备
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/checkDevice")
	@ResponseBody
	public Object checkDeviceInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		Map<String, String> newParam = new HashedMap();
		newParam.put("deviceNumber", searchParam.get("SBBH"));
		List<Map<String, String>> oldResults = deviceManagerService.queryDeviceInfo(newParam);
		int saveFlag = 0;
		if (oldResults != null && oldResults.size() > 0) {
			saveFlag = -1;
		}
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 初始化修改数据的详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/initDeviceDetail")
	@ResponseBody
	public Object initDeviceDetailInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = deviceManagerService.initDeviceDetailInfo(searchParam);
		results.get(0).put("USING_DATE", StringUtil.toString(results.get(0).get("USING_DATE")));
		results.get(0).put("STOP_DATE", StringUtil.toString(results.get(0).get("STOP_DATE")));
		results.get(0).put("SCRAP_DATE", StringUtil.toString(results.get(0).get("SCRAP_DATE")));
		this.jsonResult.setData(results);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	/**
	 * 初始化修改卡口设备方向数据的详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/initDeviceDirDetail")
	@ResponseBody
	public Object initDeviceDirDetailInfo(Model model, HttpServletRequest request){
		Map<String,String> searchParam = RequestUtil.getMapByRequest(request);
		List<Map<String,String>> resultList = kkDirectionService.initDeviceDirDetailInfo(searchParam);
		this.jsonResult.setData(resultList);
		this.jsonResult.setNeedAlert(false);
		return jsonResult;
	}
	/**
	 * 修改卡口设备方向
	 * @param request 参数
	 * @return 结果
	 */
	@RequestMapping("/updateDeviceDirInfo")
	@ResponseBody
	public Object updateDeviceDirInfo(Model model,HttpServletRequest request){
		Map<String,String> searchParam = RequestUtil.getMapByRequest(request);
		int updateDirection=0;
		searchParam.put("CREATE_TIME", StringUtil.getNowTime());
		updateDirection = kkDirectionService.updateDeviceDirInfo(searchParam);
		this.jsonResult.setData(updateDirection);
		this.jsonResult.setNeedAlert(false);
		return jsonResult;
	}
	/**
	 * 删除卡口设备方向
	 * @param request 参数
	 * @return 结果
	 */
	@RequestMapping("/deleteDeviceDirInfo")
	@ResponseBody
	public Object deleteDeviceDirInfo(Model model,HttpServletRequest request){
		Map<String,String> searchParam = RequestUtil.getMapByRequest(request);
		int deleteDirection =0;
		deleteDirection = kkDirectionService.deleteDeviceDirInfo(searchParam);
		this.jsonResult.setData(deleteDirection);
		this.jsonResult.setNeedAlert(false);
		return jsonResult;
		
	}
	/**
	 * 修改设备
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/updateDevice")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'修改设备信息'",content="'设备编号:' + getWebParamInfo().get('SBBH')",needPersist= true,operation="UPDATE")
	public Object updateDeviceInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int updateFlag = 0;
		String curentTime = DateUtil.getCurrentDateTime();
		searchParam.put("updateDate", curentTime);
		updateFlag = this.deviceManagerService.updateDeviceInfo(searchParam);
		this.jsonResult.setData(updateFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 加载实时设备查询
	 * @return 页面映射
	 */
	@RequestMapping("/openRealTime")
	public String deviceStateLoad() {
		return "/device/realtime-device-info";
	}
	
	/**
	 * 删除设备
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/deleteDevice")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'删除设备信息'",content="'设备编号:' + getWebParamInfo().get('KKBHS')",needPersist= true,operation="DELETE")
	public Object deleteDeviceInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int deleteFlag = 0;
		deleteFlag = this.deviceManagerService.deleteDeviceInfo(searchParam);
		this.jsonResult.setData(deleteFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 查询设备状态信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/queryDeviceState")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'查询实时设备状态信息'",content="'设备编号:' + getWebParamInfo().get('deviceStateNumber')",needPersist= true,operation="SEARCH")
	public Object queryDeviceState(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		searchParam.put("start", searchParam.get("page.start"));
		searchParam.put("limit", searchParam.get("page.limit"));
		List<Map<String, String>> results = deviceManagerService.queryDeviceState(searchParam);
		List<Map<String, String>> counts = deviceManagerService.countDeviceStateCounts(searchParam);
		if (results != null && results.size() > 0) {
			for (Map<String, String> map : results) {
				map.put("SCSJ", StringUtil.toString(map.get("SCSJ")));
			}
		}
		int amounts = StringUtil.toInt(StringUtil.toString(counts.get(0).get("COUNTS")));
		return ResponseUtils.sendList(results, amounts);
	}
	
	/**
	 * 查询设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/queryDeviceTroubleState")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'查询实时设备故障信息'",content="'设备编号:' + getWebParamInfo().get('deviceNumber')",needPersist= true,operation="SEARCH")
	public Object queryDeviceTroubleState(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		searchParam.put("start", searchParam.get("page.start"));
		searchParam.put("limit", searchParam.get("page.limit"));
		List<Map<String, String>> results = deviceManagerService.queryDeviceTroubleState(searchParam);
		List<Map<String, String>> counts = deviceManagerService.countDeviceTroubleCounts(searchParam);
		if (results != null && results.size() > 0) {
			for (Map<String, String> map : results) {
				map.put("GZSJ", StringUtil.toString(map.get("GZSJ")));
				map.put("SCSJ", StringUtil.toString(map.get("SCSJ")));
			}
		}
		int amounts = StringUtil.toInt(StringUtil.toString(counts.get(0).get("COUNTS")));
		return ResponseUtils.sendList(results, amounts);
	}
	
	/**
	 * 获取所有的设备信息，因为没有引入权限控制
	 * @return 查询结果
	 */
	@RequestMapping("/findAllDevice")
	@ResponseBody
	public Object findAllDeviceInfo() {
		List<Map<String, String>> deviceDataList = deviceManagerService.findAllDeviceInfo();
		/* 重新封装分页数据，增加所属部门信息 */
        List<Map<String, Object>> resultMap = new ArrayList<Map<String, Object>>();
		if(deviceDataList != null && deviceDataList.size() > 0){
            //获取所有的通道数据
            //Map<String,List<ExtTreeNode>> channelMap = channelService.getAllChannel();
            for(Map<String, String> item : deviceDataList){
                /* 重新封装数据 */
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("id", item.get("SBBH") == null ? "-1" : "device_"+item.get("SBBH")); //防止id重复导致树无法展开
                map.put("deviceID", item.get("SBBH"));
                map.put("text", item.get("SBMC"));
                map.put("type", "3");
                //map.put("status", item.getStatus());
                map.put("ip",item.get("IPDZ"));
                map.put("port", item.get("DKH"));
                map.put("longitude", item.get("JD"));
                map.put("latitude", item.get("WD"));
                if (StringUtil.checkObj(item.get("SSKKBH"))) {
                    map.put("orgId", item.get("SSKKBH"));
                }
                /*List<ExtTreeNode> channels = channelMap.get(item.getDeviceId());
                if(channels != null&&channels.size()>0){
//                如果设备不在线，在认为通道不在线 将通道状态设置为0 如果设备在线 认为通道全在线
                  ExtTreeNode channel = channels.get(0);
                  map.put("channelPKId", channel.getId());
                  map.put("channelId", channel.getChannelId());
                  map.put("channelNum", channel.getChannelNum());
                  map.put("direct", channel.getDirect());
                  map.put("lane", channel.getLane());*/
                //}
                //将通道信息放到设备中（揭阳需求一个设备只有一个通道，并且设备树不显示通道）
                resultMap.add(map);
            }
        }
		this.jsonResult.setData(resultMap);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 保存设备监听的设备状态信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/saveDeviceInfo")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'保存设备监听的设备状态信息'",content="'设备描述:' + getWebParamInfo().get('deviceDesc')",needPersist= true,operation="ADD")
	public Object saveDeviceInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int saveFlag = 0;
		String curentTime = DateUtil.getCurrentDateTime();
		searchParam.put("updateDate", curentTime);
		saveFlag = this.deviceManagerService.saveDeviceInfo(searchParam);
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 添加设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/addDeviceTrouble")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'新增设备故障信息'",content="'设备描述:' + getWebParamInfo().get('deviceDesc')",needPersist= true,operation="ADD")
	public Object addDeviceTroubleInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		Map<String, Object> userMap = userService.getCurrentUser(request);
		if (StringUtil.checkObj(userMap.get("USER_NAME"))) {
			searchParam.put("userName", StringUtil.toString(userMap.get("USER_NAME")));
		}
		if (StringUtil.checkObj(userMap.get("PHONE"))) {
			searchParam.put("linkPhone", StringUtil.toString(userMap.get("PHONE")));
		}
		String updateDate = DateUtil.getCurrentDateTime();
		searchParam.put("updateDate", updateDate);
		int saveFlag = 0;
		saveFlag = this.deviceManagerService.addDeviceTroubleInfo(searchParam);
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 检查是否存已存在设备
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/checkDeviceTrouble")
	@ResponseBody
	public Object checkDeviceTroubleInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> oldResults = deviceManagerService.checkDeviceTroubleInfo(searchParam);
		int saveFlag = 0;
		if (oldResults != null && oldResults.size() > 0) {
			saveFlag = -1;
		}
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 修改设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/updateDeviceTrouble")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'修改设备故障信息'",content="'设备描述:' + getWebParamInfo().get('deviceDesc')",needPersist= true,operation="UPDATE")
	public Object updateDeviceTroubleInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int updateFlag = 0;
		updateFlag = this.deviceManagerService.updateDeviceTroubleInfo(searchParam);
		this.jsonResult.setData(updateFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 初始化修改数据的详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/initDeviceTroubleDetail")
	@ResponseBody
	public Object initDeviceTroubleDetailInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = deviceManagerService.initDeviceTroubleDetailInfo(searchParam);
		this.jsonResult.setData(results);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 删除设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/deleteDeviceTrouble")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'删除设备故障信息'",content="'设备编号:' + getWebParamInfo().get('idStr')",needPersist= true,operation="DELETE")
	public Object deleteDeviceTroubleInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int deleteFlag = 0;
		deleteFlag = this.deviceManagerService.deleteDeviceTroubleInfo(searchParam);
		this.jsonResult.setData(deleteFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 人工确认设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/addTroubleVerify")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'确认设备故障信息'",content="'状态序号:' + getWebParamInfo().get('id')",needPersist= true,operation="UPDATE")
	public Object addTroubleVerifyInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int saveFlag = 0;
		saveFlag = this.deviceManagerService.addTroubleVerifyInfo(searchParam);
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 人工处理设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/addTroubleDealWith")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'处理设备故障信息'",content="'状态序号:' + getWebParamInfo().get('id')",needPersist= true,operation="UPDATE")
	public Object addTroubleDealWithInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int saveFlag = 0;
		saveFlag = this.deviceManagerService.addTroubleDealWithInfo(searchParam);
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	

	/**
	 * 统计设备状态信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/queryDeviceStatistics")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'统计设备信息'",content="'部门ID:' + getWebParamInfo().get('orgId')",needPersist= true,operation="SEARCH")
	public Object queryDeviceStatisticsInfo(Model model, HttpServletRequest request) {
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
			results = deviceManagerService.queryDeviceStatisticsInfo(searchParam);
		}
		if (results != null && results.size() > 0) {
			Map<String, String> amountMap = new HashedMap();
			int workAmounts = 0;
			int falilAmounts = 0;
			for (Map<String, String> map : results) {
				workAmounts = workAmounts + StringUtil.toInt(map.get("WORKING"));
				falilAmounts = falilAmounts + StringUtil.toInt(map.get("FALIL"));
			}
			amountMap.put("FALIL", "非正常总数:" + falilAmounts);
			amountMap.put("WORKING", "正常总数:" + workAmounts);
			results.add(amountMap);
		}
		return ResponseUtils.sendList(results, 0);
	}
	
	/**
	 * 统计设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/queryTroubleStatistics")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'统计设备故障信息'",content="'部门ID:' + getWebParamInfo().get('orgId')",needPersist= true,operation="SEARCH")
	public Object queryTroubleStatisticsInfo(Model model, HttpServletRequest request) {
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
			results = deviceManagerService.queryTroubleStatisticsInfo(searchParam);
		}
		if (results != null && results.size() > 0) {
			Map<String, String> amountMap = new HashedMap();
			int workAmounts = 0;
			int falilAmounts = 0;
			for (Map<String, String> map : results) {
				workAmounts = workAmounts + StringUtil.toInt(map.get("NORMAL"));
				falilAmounts = falilAmounts + StringUtil.toInt(map.get("UN_NORMAL"));
			}
			amountMap.put("UN_NORMAL", "故障总数:" + falilAmounts);
			amountMap.put("NORMAL", "正常总数:" + workAmounts);
			results.add(amountMap);
		}
		return ResponseUtils.sendList(results, 0);
	}
	
	/**
	 * 车牌识别率
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/queryRecognitionRate")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'车牌识别率统计'",content="'时间范围:' + getWebParamInfo().get('startTime') + '到' + getWebParamInfo().get('endTime')",needPersist= true,operation="SEARCH")
	public Object queryRecognitionRateInfo(Model model, HttpServletRequest request) {
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
			results = deviceManagerService.queryRecognitionRateInfo(searchParam);
		}
		if (results != null && results.size() > 0) {
			Map<String, String> amountMap = new HashedMap();
			int havenotRecognition = 0;
			double recognition = 0d;
			String recognitionRate = "";
			//获取格式化对象
			NumberFormat nt = NumberFormat.getPercentInstance();
			nt.setMinimumFractionDigits(2);
			int alreadAmounts = 0; //已识别总量
			int haveNotAmounts = 0; //未识别总量
			int totalAmounts = 0; //过车总量
			double recognitionAll = 0; //总识别率
			String recognitionRateAll = "";
			for (Map<String, String> map : results) {
				havenotRecognition = StringUtil.toInt(map.get("CARNUM")) - StringUtil.toInt(map.get("CARCHECKNUM"));
				recognition = StringUtil.toInt(map.get("CARCHECKNUM")) / StringUtil.toInt(map.get("CARNUM"));
				recognitionRate = nt.format(recognition);
				map.put("havenotRecognition", havenotRecognition + "");
				map.put("recognitionRate", recognitionRate);
				alreadAmounts = alreadAmounts + StringUtil.toInt(map.get("CARCHECKNUM"));
				haveNotAmounts = haveNotAmounts + havenotRecognition;
				totalAmounts = totalAmounts + StringUtil.toInt(map.get("CARNUM"));
				recognitionAll = alreadAmounts / totalAmounts;
				recognitionRateAll =  nt.format(recognitionAll);
			}
			amountMap.put("CARCHECKNUM", "已识别总数量:" + alreadAmounts);
			amountMap.put("havenotRecognition", "未识别总数量:" + haveNotAmounts);
			amountMap.put("CARNUM", "过车总数量:" + totalAmounts);
			amountMap.put("recognitionRate", recognitionRateAll);
			results.add(amountMap);
		}
		return ResponseUtils.sendList(results, 0);
	}
	
	/**
	 * 注册设备
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/registerDevice")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'注册设备信息'",content="'设备编号:' + getWebParamInfo().get('SBBHS')",needPersist= true,operation="UPDATE")
	public Object registerDeviceInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int updateFlag = 0;
		String[] sbbhs = searchParam.get("SBBHS").split(",");
		String[] sbmcs = searchParam.get("SBMCS").split(",");
		String[] jds = searchParam.get("JDS").split(",");
		String[] wds = searchParam.get("WDS").split(",");
		for (int i = 0; i < sbbhs.length; i++) {
			Map<String,String> mapParam=new HashMap<String,String>();
			mapParam.put("ACTION", "1");
			mapParam.put("SBBH", sbbhs[i]);
			mapParam.put("SBMC", sbmcs[i]);
			mapParam.put("JD", jds[i]);
			mapParam.put("WD", wds[i]);
			String jsonParam = JsonUtil.objToJson(mapParam);
			deviceManagerWS.editDevices(jsonParam);
			updateFlag += 1;
		}
		this.jsonResult.setData(updateFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 注销设备
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/logoutDevice")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'注销设备信息'",content="'设备编号:' + getWebParamInfo().get('SBBHS')",needPersist= true,operation="UPDATE")
	public Object logoutDeviceInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int updateFlag = 0;
		String[] sbbhs = searchParam.get("SBBHS").split(",");
		String[] sbmcs = searchParam.get("SBMCS").split(",");
		String[] jds = searchParam.get("JDS").split(",");
		String[] wds = searchParam.get("WDS").split(",");
		for (int i = 0; i < sbbhs.length; i++) {
			Map<String,String> mapParam = new HashMap<String,String>();
			mapParam.put("ACTION", "2");
			mapParam.put("SBBH", sbbhs[i]);
			mapParam.put("SBMC", sbmcs[i]);
			mapParam.put("JD", jds[i]);
			mapParam.put("WD", wds[i]);
			String jsonParam = JsonUtil.objToJson(mapParam);
			deviceManagerWS.editDevices(jsonParam);
			updateFlag += 1;
		}
		this.jsonResult.setData(updateFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
}
