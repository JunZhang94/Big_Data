package com.jp.tic.business.device.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.business.device.service.BayonetReportService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.core.annotation.Log;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/bayonetReport")
public class BayonetReportController extends AbstractController {
	
	@Autowired
	private BayonetReportService bayonetReportService;

	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/bayoneReportPage")
	public String deviceMonitoryLoad() {
		return "/device/bayonet-report";
	}
	
	/**
	 * 查询全部卡口报备信息
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/queryBayonetReport")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'查询卡口报备信息'",content="'卡口名称：' + getWebParamInfo().get('bayonetName')",needPersist= true,operation="SEARCH")
	public Object queryBayonetReportInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = bayonetReportService.queryBayonetReportInfo(searchParam);
		this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
	}
	
	/**
	 * 提交报备更新
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/commitReport")
	@ResponseBody
	public Object commitReportInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int updateFlag = this.bayonetReportService.commitReportInfo(searchParam);
		this.jsonResult.setData(updateFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 初始化修改数据的详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/initBayonetReportDetail")
	@ResponseBody
	public Object initBayonetReportDetailInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = bayonetReportService.initBayonetReportDetailInfo(searchParam);
		this.jsonResult.setData(results);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
}
