package com.jp.tic.analyze.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.jp.tic.app.carSearch.ws.CarTypeSearchWS;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@Scope("prototype")
@RequestMapping("/similarity")
public class SimilarityCarAnalyzeController extends AbstractController  {

	@Autowired
	private CarTypeSearchWS carTypeSearchWS;
	
	/*
	 * 相似车辆串并界面
	 * @return 页面映射
	 */
	@RequestMapping("/similarityQueryPage")
	public String similarityQueryPageLoad() {
		return "/search/similarity-car-query";
	}
	
	/**
	 * 相似车辆串并
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/similarityCarSearch")
	@ResponseBody
	public Object similarityCarSearchInfo(HttpServletRequest request, HttpServletResponse response) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String jsonParam = JSON.toJSONString(searchParam);//查询条件
		String jsonStr = carTypeSearchWS.similaritySearchInfo(jsonParam);
		Map<String, Object> datas = JsonUtil.jsonToMap(jsonStr);
		int amounts = StringUtil.toInt(datas.get("total"));
		List<CarTake> results = (List<CarTake>) datas.get("rows");
		if (results == null) {
			results = new ArrayList<CarTake>();
			amounts = 0;
		}
		return ResponseUtils.sendList(results, amounts);
	}
}
