package com.jp.tic.business.device.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.business.device.service.BayonetManagerService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.core.annotation.Log;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/bayonet")
public class BayonetManagerController extends AbstractController {
	
	@Autowired
	BayonetManagerService bayonetManagerService;
	@Autowired
	DictionaryService dictionaryService;
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/bayoneVerifyPage")
	public String deviceMonitoryLoad() {
		return "/device/bayone-verify";
	}
	
	/**
	 * 添加设备卡口基本信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/addBayonet")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'新增卡口基本信息'",content="'卡口编号:' + getWebParamInfo().get('KKBH')",needPersist= true,operation="ADD")
	public Object addBayonetInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int saveFlag = 0;
		String curentTime = DateUtil.getCurrentDateTime();
		searchParam.put("CJSJ", curentTime);
		searchParam.put("GXSJ", curentTime);
		searchParam.put("OPTION_TYPE", "1");//操作类型：新增
		saveFlag = this.bayonetManagerService.addBayonetInfo(searchParam);
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}

	/**
	 * 检查是否存已存在设备卡口基本信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/checkBayonet")
	@ResponseBody
	public Object checkBayonetInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		Map<String, String> newParam = new HashedMap();
		newParam.put("KKBH", searchParam.get("KKBH"));
		List<Map<String, String>> oldResults = bayonetManagerService.checkBayonetInfo(newParam);
		int saveFlag = 0;
		if (oldResults != null && oldResults.size() > 0) {
			saveFlag = -1;
		}
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 初始化修改设备卡口基本信息数据的详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/initBayonetDetail")
	@ResponseBody
	public Object initBayonetDetailInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = bayonetManagerService.checkBayonetInfo(searchParam);
		this.jsonResult.setData(results);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 修改设备卡口基本信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/updateBayonet")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'修改卡口基本信息'",content="'卡口编号:' + getWebParamInfo().get('KKBH')",needPersist= true,operation="UPDATE")
	public Object updateBayonetInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		
		String curentTime = DateUtil.getCurrentDateTime();
		searchParam.put("CJSJ", curentTime);
		searchParam.put("GXSJ", curentTime);
		searchParam.put("OPTION_TYPE", "2");//操作类型：修改
		this.bayonetManagerService.dealwithEditBayonet(searchParam); //如果已经存在了修改的记录,先删除此记录
		int updateFlag = this.bayonetManagerService.addBayonetEditInfo(searchParam);
		
		//int updateFlag = this.bayonetManagerService.goUpdateBayonetInfo(searchParam);
		
		/*int updateFlag = 0;
		String curentTime = DateUtil.getCurrentDateTime();
		searchParam.put("GXSJ", curentTime);
		searchParam.put("OPTION_TYPE", "2");//操作类型：修改
		updateFlag = this.bayonetManagerService.updateBayonetInfo(searchParam);*/
		
		this.jsonResult.setData(updateFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 删除设备卡口基本信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/deleteBayonet")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'删除卡口基本信息'",content="'卡口编号:' + getWebParamInfo().get('KKBHS')",needPersist= true,operation="DELETE")
	public Object deleteBayonetInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		searchParam.put("OPTION_TYPE", "3");//操作类型：删除
		
		searchParam.put("KKBH", searchParam.get("KKBHS"));
		this.bayonetManagerService.dealwithEditBayonet(searchParam); //如果已经存在了删除的记录,先删除此记录
		int updateFlag = this.bayonetManagerService.addBayonetDeleteInfo(searchParam);
		
		//deleteFlag = this.bayonetManagerService.deleteBayonetInfo(searchParam);
		this.jsonResult.setData(updateFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 删除设备卡口基本信息,走审核路线
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/goDeleteBayonet")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'删除卡口基本信息'",content="'卡口编号:' + getWebParamInfo().get('KKBHS')",needPersist= true,operation="DELETE")
	public Object goDeleteBayonetInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int deleteFlag = 0;
		
		this.bayonetManagerService.deleteBayonetInfo(searchParam);
		deleteFlag = this.bayonetManagerService.verifyUpdateDeleteBayonenet(searchParam);
		
		//deleteFlag = this.bayonetManagerService.deleteBayonetInfo(searchParam);
		this.jsonResult.setData(deleteFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 卡口审核信息查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/queryBayonetVerify")
	@ResponseBody
	//@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'查询卡口审核'",content="'卡口名称:' + getWebParamInfo().get('kkmc')",needPersist= true,operation="SEARCH")
	public Object queryBayonetVerifyInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results  = bayonetManagerService.queryBayonetVerifyInfo(searchParam);
		List<Map<String, String>> counts = bayonetManagerService.countBayonetVerifyInfo(searchParam);
		int amounts = StringUtil.toInt(StringUtil.toString(counts.get(0).get("COUNTS")));
		return ResponseUtils.sendList(results, amounts);          
	}
	
	/**
	 * 初始化修改卡口审核的详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/initBayoneVerifyDetail")
	@ResponseBody
	public Object initBayoneVerifyDetail(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = bayonetManagerService.initBayoneVerifyDetail(searchParam);
		this.jsonResult.setData(results);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 审核卡口信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/updateBayoneVerify")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'审核卡口信息'",content="'设备编号:' + getWebParamInfo().get('SBBH')",needPersist= true,operation="UPDATE")
	public Object updateBayoneVerifyInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int updateFlag = 0;
		if (StringUtil.equals(searchParam.get("verifyFlag"), "1")) {
			if (StringUtil.equals(searchParam.get("optionType"), "1")) {//对新增操作
				updateFlag = this.bayonetManagerService.verifyUpdateAddBayonenet(searchParam);
			}
			if (StringUtil.equals(searchParam.get("optionType"), "2")) {//对修改操作
				updateFlag = this.bayonetManagerService.verifyUpdateEditBayonenet(searchParam);
			}
			if (StringUtil.equals(searchParam.get("optionType"), "3")) {
				searchParam.put("KKBHS", searchParam.get("id"));
				updateFlag = this.bayonetManagerService.verifyUpdateDeleteBayonenet(searchParam);
			}
		} else {
			updateFlag = this.bayonetManagerService.updateBayoneVerifyInfo(searchParam);
		}
		this.jsonResult.setData(updateFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 首页查询卡口基本信息数据的详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/searchBayonetDetail")
	@ResponseBody
	public Object searchBayonetDetailInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = bayonetManagerService.searchBayonetDetailInfo(searchParam);
		List<Map<String, String>> dicResults = dictionaryService.getAllDictionsInfo();
		if (results != null && results.size() > 0) {
			for (Map<String, String> map : results) {
				for (Map<String, String> dic : dicResults) {
					//卡口类型1
					if (StringUtil.equals(dic.get("SETTINGNAME"), "BAYONET_TYPE")) {
						if (StringUtil.equals(map.get("KKLX"), dic.get("STOREVALUE"))) {
							map.put("KKLX", dic.get("DISPLAYVALUE"));
						}
					}
					//卡口类型2
					if (StringUtil.equals(dic.get("SETTINGNAME"), "BAYONET_TYPE_TWO")) {
						if (StringUtil.equals(map.get("KKLX2"), dic.get("STOREVALUE"))) {
							map.put("KKLX2", dic.get("DISPLAYVALUE"));
						}
					}
					//卡口性质
					if (StringUtil.equals(dic.get("SETTINGNAME"), "BAYONET_NATURE")) {
						if (StringUtil.equals(map.get("KKXZ"), dic.get("STOREVALUE"))) {
							map.put("KKXZ", dic.get("DISPLAYVALUE"));
						}
					}
					//卡口状态
					if (StringUtil.equals(dic.get("SETTINGNAME"), "BAYONET_STATUS")) {
						if (StringUtil.equals(map.get("KKZT"), dic.get("STOREVALUE"))) {
							map.put("KKZT", dic.get("DISPLAYVALUE"));
						}
					}
					//数据上传模式
					if (StringUtil.equals(dic.get("SETTINGNAME"), "DATA_MODO")) {
						if (StringUtil.equals(map.get("SJSCMS"), dic.get("STOREVALUE"))) {
							map.put("SJSCMS", dic.get("DISPLAYVALUE"));
						}
					}
					//供应商
					if (StringUtil.equals(dic.get("SETTINGNAME"), "DEVICE_MANUFAC")) {
						if (StringUtil.equals(map.get("SBGYS"), dic.get("STOREVALUE"))) {
							map.put("SBGYS", dic.get("DISPLAYVALUE"));
						}
					}
				}
			}
		}
		return ResponseUtils.sendList(results, 100);          
	}
}
