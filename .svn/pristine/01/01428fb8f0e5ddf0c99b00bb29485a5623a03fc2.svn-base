package com.jp.tic.system.controller;

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

import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.core.annotation.Log;
import com.jp.tic.system.service.ProviderService;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/provider")
public class ProviderController extends AbstractController {

	@Autowired
	ProviderService providerService;
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/providerPage")
	public String devicePolingLoad() {
		return "/system/provider-info";
	}
	
	@RequestMapping("/userMgrPage")
	public String toUserMgrPage() throws Exception {
		return "/system/user-manager";
	}
	
	/**
	 * 分页查询供应商信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/queryProvider")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'查询供应商信息'",content="'供应商名称:' + getWebParamInfo().get('providerName')",needPersist= true,operation="SEARCH")
	public Object queryProviderInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = providerService.queryProviderInfo(searchParam);
		List<Map<String, String>> counts = providerService.countProviderDatas(searchParam);
		int amounts = StringUtil.toInt(counts.get(0).get("COUNTS"));
		return ResponseUtils.sendList(results, amounts);
	}
	
	/**
	 * 添加人供应商
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/addProvider")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_NAME')+'新增供应商信息'",content="'供应商名称:' + getWebParamInfo().get('providerName')",needPersist= true,operation="ADD")
	public Object addProviderInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int saveFlag = 0;
		saveFlag = this.providerService.addProviderInfo(searchParam);
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 初始化修改数据的详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/initProviderDetail")
	@ResponseBody
	public Object initProviderDetailInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = providerService.initProviderDetailInfo(searchParam);
		this.jsonResult.setData(results);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 修改人供应商
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/updateProvider")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_NAME')+'修改供应商信息'",content="'供应商名称:' + getWebParamInfo().get('providerName')",needPersist= true,operation="UPDATE")
	public Object updateProvider(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int updateFlag = 0;
		updateFlag = this.providerService.updateProviderInfo(searchParam);
		this.jsonResult.setData(updateFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 删除供应商
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/deleteProvider")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_NAME')+'删除供应商信息'",content="'供应商ID:' + getWebParamInfo().get('idStr')",needPersist= true,operation="DELETE")
	public Object deleteProviderInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int deleteFlag = 0;
		deleteFlag = this.providerService.deleteProviderInfo(searchParam);
		this.jsonResult.setData(deleteFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
     * JSON根据供应商信息（用于下拉框）
     * @return 组装结果
     * @author lsg
     */
	@RequestMapping("/jsonProviderInCombo")
	@ResponseBody
    public Object findProviderData(Model model, HttpServletRequest request) {
        List<Map<String, String>> datas = providerService.findProviderData();
        List<Map<String, String>> results = new ArrayList<Map<String,String>>();
        if (datas != null && datas.size() > 0) {
        	Map<String, String> map = null;
	        for (Map<String, String> dataMap : datas) {
	            map = new HashMap<String, String>();
	            map.put("text", dataMap.get("NAME"));
	            map.put("id", dataMap.get("NAME") + "_" + dataMap.get("CANTACT_WAY") + "_" + dataMap.get("CANTACT_ADREES"));
	            results.add(map);
	        }
        }
        this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;

    }
	
	/**
	 * 检查是否存已存在设备
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/checkProvider")
	@ResponseBody
	public Object checkProviderInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> oldResults = providerService.checkProviderInfo(searchParam);
		int saveFlag = 0;
		if (oldResults != null && oldResults.size() > 0) {
			saveFlag = -1;
		}
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
}
