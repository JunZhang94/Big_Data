package com.jp.tic.analyze.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.analyze.service.GatherStatisticsService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.service.OrganizationService;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/gather")
public class GatherStatisticsController extends AbstractController {

	@Autowired
	GatherStatisticsService gatherStatisticsService;
	
	@Autowired
	OrganizationService organizationService;
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/gatherPage")
	public String gatherPageLoad() {
		return "/analyze/gather-statistics";
	}
	
	/**
	 * 汇聚统计查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/gatherStatistics")
	@ResponseBody
	public Object gatherStatisticsInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		if (!StringUtil.checkStr(searchParam.get("orgId"))) {
			return null;
		}
		List<Map<String, String>> mounts = organizationService.findOrgInfoByOrgType(searchParam);
		List<Map<String, String>> results = gatherStatisticsService.gatherStatisticsInfo(searchParam, mounts);
		List<Map<String, String>> counts = gatherStatisticsService.gatherStatisticsAmounts(searchParam, mounts);
		int amounts = StringUtil.toInt(counts.get(0).get("COUNTS"));
		return ResponseUtils.sendList(results, amounts);         
	}
	
	/**
	 * 汇聚统计查询,柱状图数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/gatherStatisticsChart")
	@ResponseBody
	public Object gatherStatisticsChartInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		if (!StringUtil.checkStr(searchParam.get("orgId"))) {
			return null;
		}
		
		String dates = searchParam.get("dates");
		if("0".equals(dates)){
			searchParam.put("startDate", "yyyy-mm-dd HH24");
			searchParam.put("shijian", "to_date(startT,'yyyy-mm-dd HH24')+1/24");
			searchParam.put("endShijian", "HH24");
		}else if("1".equals(dates)){
			searchParam.put("startDate", "yyyy-mm-dd");
			searchParam.put("shijian", "to_date(startT,'yyyy-mm-dd')+1");
			searchParam.put("endShijian", "dd");
		}else{
			searchParam.put("startDate", "yyyy-mm");
			searchParam.put("shijian", "to_date(startT,'yyyy-mm')+1");
			searchParam.put("endShijian", "mm");
		}
		
		List<Map<String, String>> mounts = organizationService.findOrgInfoByOrgType(searchParam);
		List<Map<String, String>> results = gatherStatisticsService.gatherStatisticsChartInfo(searchParam, mounts);
		this.jsonResult.setNeedAlert(false);
		this.jsonResult.setData(results);
		return jsonResult;       
	}
}
