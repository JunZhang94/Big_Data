package com.jp.tic.analyze.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.analyze.service.DataTimelyService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/dataTimely")
public class DataTimelyController extends AbstractController {

	@Autowired
	private DataTimelyService dataTimelyService;
	
	@RequestMapping("/dataTimelyPage")
	public String dataTimelyPageLoad() throws Exception {
		return "/datacenter/data-timely";
	}
	
	/**
	 * 数据及时率统计
	 * @param model 模型
	 * @param request 请求
	 * @return 查询结果
	 */
	@RequestMapping("/dataTimelyGrouping")
	@ResponseBody
	public Object dataTimelyStatistic(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		if (!StringUtil.checkStr(searchParam.get("orgId"))) {
			return null;
		}
		List<Map<String, String>> results = dataTimelyService.dataTimelyStatistic(searchParam);
        this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
	}
}
