package com.jp.tic.business.cartake.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.business.cartake.service.CarFrequencyService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.core.annotation.Log;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@Scope("prototype")
@SuppressWarnings("unchecked")
@RequestMapping("/frequency")
public class CarFrequencyController extends AbstractController {

	@Autowired
	private CarFrequencyService carFrequencyService;
	/**
	 * 过车频度查询-分析solr数据
	 * @param model 模型
	 * @param request 请求
	 * @return 查询结果
	 * @throws Exception 异常
	 */
	@RequestMapping("/frequencyStatistics")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'过车频度查询'",content="'时间范围:' + getWebParamInfo().get('startTime') + '到' + getWebParamInfo().get('endTime')",needPersist= true,operation="SEARCH")
	public Object carFrequencyStatisticsInfo(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		List<Map<String, Object>> resultList = this.loadAnalyzeRate(searchParam);
		int counts = 0 ;
		if (resultList.size() != 0) {
			for (Map<String, Object> objMap : resultList) {
				if (resultList.size() < StringUtil.toInt(searchParam.get("page.limit"))) {
					objMap.put("lastFlag", "last");
					counts = 0;
				} else {
					objMap.put("lastFlag", "data");
					counts = StringUtil.toInt(searchParam.get("page.start")) + StringUtil.toInt(searchParam.get("page.limit")) + 1;
				}
			}
		}
	    return ResponseUtils.sendList(resultList, counts);
	}
	
	/**
	 * 加载过车频度信息
	 * @param param
	 * @param request
	 * @return 查询结果
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> loadAnalyzeRate(Map<String, String> searchParam) throws Exception {
		if (!StringUtil.checkStr(searchParam.get("kkbhs"))) {
			return new ArrayList<Map<String,Object>>();
		}
		searchParam.put("kkbhs", searchParam.get("kkbhs"));
		searchParam.put("startTime", searchParam.get("startTime")+":00:00");
		searchParam.put("endTime", searchParam.get("endTime")+":59:59");
		List<Map<String, Object>> results = carFrequencyService.carFrequencyStatisticsInfo(searchParam);	
	    return results;
	}
}
