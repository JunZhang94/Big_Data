package com.jp.tic.business.carHiddenAnaly.controller;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.business.carHiddenAnaly.service.CarHiddenAnalyService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/carHiddenAnaly")
public class CarHiddenAnalyController extends AbstractController{
	@Autowired
	CarHiddenAnalyService service;
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/carHiddenAnalyPage")
	public String carHiddenAnalyQueryLoad() {
		return "/analyze/car-hiddenAnaly";
	}
	/**
	 * 加载查询结果展现页面
	 * @return 页面映射
	 */
	@RequestMapping("/carHiddenAnalyResult")
	public String carHiddenAnalyResultLoad() {
		return "/analyze/car-hiddenAnalyResult";
	}
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/carTestAnalyPage")
	public String testPageLoad() {
		return "/analyze/car-testAnaly";
	}
	
	@RequestMapping("/doAnalyHiddenCar")
	@ResponseBody
	public Object doAnalyHiddenCar(Model model, HttpServletRequest request) throws ParseException{

		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		
		Map<String,Object> result=service.AnalyHiddenCarInfors(searchParam);
		List<Map<String, String>> resultData=(List<Map<String, String>>) result.get("dataList");
		int total=StringUtil.toInt(result.get("total"));
		
		return ResponseUtils.sendList(resultData, total);
	}

}
