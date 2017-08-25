package com.jp.tic.business.cartake.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.business.cartake.service.HotRecodeService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.core.annotation.Log;
import com.jp.tic.system.service.OrganizationService;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/hotRecode")
public class HotRecodeController extends AbstractController {

	@Autowired
	private HotRecodeService hotRecodeService;
	
	@Autowired
	private OrganizationService organizationService;
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/hotRecodePage")
	public String hotInfoPageLoad() {
		return "/analyze/hot-recode";
	}
	
	/**
	 * 分页查询红名单信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/queryHotRecode")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'红名单管理查询'",content="'车牌号码:' + getWebParamInfo().get('carNum') + ',卡口编号:' + getWebParamInfo().get('mounts')",needPersist= true,operation="SEARCH")
	public Object queryHotRecodeInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = hotRecodeService.queryHotRecodeInfo(searchParam);
		if (results != null) {
			List<Map<String, String>> mountsList = hotRecodeService.findMountByKkmc(null);
			String kkbhStr = "";
			String[] kkbhs = null;
			String kkmcStr = "";
			for (Map<String, String> dataMap : results) {
				kkbhStr = dataMap.get("KKBHS");
				kkmcStr = "";
				if (StringUtil.checkStr(kkbhStr)) {
					kkbhs = kkbhStr.split(",");
					for (int i = 0; i < kkbhs.length; i++) {
						for (Map<String, String> mountMap : mountsList) {
							if (StringUtil.equals(kkbhs[i], mountMap.get("KKBH"))) {
								if (StringUtil.checkStr(kkmcStr)) {
									kkmcStr = kkmcStr + ",";
								}
								kkmcStr = kkmcStr + mountMap.get("KKMC");
								break;
							}
						}
					}
					dataMap.put("KKMCS", kkmcStr);
				}
			}
		}
		List<Map<String, String>> counts = hotRecodeService.countHotRecodeInfo(searchParam);
		int amounts = StringUtil.toInt(counts.get(0).get("COUNTS"));
		return ResponseUtils.sendList(results, amounts);
	}
	
	/**
	 * 添加红名单记录
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/addHotRecode")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'新增红名单信息'",content="'车牌号码:' + getWebParamInfo().get('carNum')",needPersist= true,operation="ADD")
	public Object addHotRecodeInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int saveFlag = 0;
		saveFlag = this.hotRecodeService.addHotRecodeInfo(searchParam);
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 初始化修改数据的详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/initHotRecodeDetail")
	@ResponseBody
	public Object initHotRecodeDetailInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = hotRecodeService.initHotRecodeDetailInfo(searchParam);
		if (results != null && results.size() > 0) {
			String kkbhStr = results.get(0).get("KKBHS");
			String kkmcStr = "";
			if (StringUtil.checkStr(kkbhStr)) {
				List<Map<String, String>> allMounts = hotRecodeService.findMountByKkbh(kkbhStr);
				for (Map<String, String> mountMap : allMounts) {
					if (StringUtil.checkStr(kkmcStr)) {
						kkmcStr = kkmcStr + ",";
					}
					kkmcStr = kkmcStr + mountMap.get("KKMC");
				}
				results.get(0).put("KKMCS", kkmcStr);
			}
		}
		this.jsonResult.setData(results);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 检查数据是否存在
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/checkHotRecode")
	@ResponseBody
	public Object checkHotRecodeInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = hotRecodeService.checkHotRecodeInfo(searchParam);
		int saveFlag = 0;
		if (results != null && results.size() > 0) {
			saveFlag = -1;
		}
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 修改红名单记录
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/updateHotRecode")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'修改红名单信息'",content="'车牌号码:' + getWebParamInfo().get('carNum')",needPersist= true,operation="UPDATE")
	public Object updateHotRecodeInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int updateFlag = 0;
		updateFlag = this.hotRecodeService.updateHotRecodeInfo(searchParam);
		this.jsonResult.setData(updateFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 删除红名单记录
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/deleteHotRecode")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'删除红名单信息'",content="'删除编号:' + getWebParamInfo().get('idStr')",needPersist= true,operation="DELETE")
	public Object deleteHotRecodeInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int deleteFlag = 0;
		deleteFlag = this.hotRecodeService.deleteHotRecodeInfo(searchParam);
		this.jsonResult.setData(deleteFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
}
