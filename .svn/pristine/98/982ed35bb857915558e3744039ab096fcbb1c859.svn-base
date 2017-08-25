package com.jp.tic.business.oneCarManyNum.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.app.carSearch.ws.CarTypeSearchWS;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.core.annotation.Log;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.view.RequestUtil;

/**
 * 一车多牌
 * @author zh.h
 *
 */
@Controller
@RequestMapping("/oneCarManyNum")
public class OneCarManyNumController extends AbstractController{

	@Autowired
	private CarTypeSearchWS carTypeSearchWS;
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/oneCarManyNumPage")
	public String oneCarManyNumPageLoad() {
		return "/search/oneCarManyNum-page";
	}
	
	/**
	 * 分页车辆类型列表数据
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/queryOneCarManyNum")
	@ResponseBody
	public Object queryOneCarManyNumCarPage(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		String json= JsonUtil.objToJson(searchParam);
		Map<String, Object> resultMap=carTypeSearchWS.queryOneCarManyNumForPages(json);
		List<CarTake> results = (List<CarTake>) resultMap.get("rows");
		if (results == null) {
			results = new ArrayList<CarTake>();
		}
		return ResponseUtils.sendList(results, results.size());
	}
}
