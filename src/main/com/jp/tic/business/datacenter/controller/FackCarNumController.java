package com.jp.tic.business.datacenter.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.business.datacenter.service.FakeCarNumService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/fackCarNum")
public class FackCarNumController extends AbstractController {

	@Autowired
	private FakeCarNumService fakeCarNumService;
	/**
	 * 假牌车查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/fackCarNumSearch")
	@ResponseBody
	public Object fackCarNumSearchInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = fakeCarNumService.fackCarNumSearchInfo(searchParam);
		List<Map<String, String>> counts = fakeCarNumService.countfackCarNumDatas(searchParam);
		int amounts = StringUtil.toInt(counts.get(0).get("COUNTS"));
		return ResponseUtils.sendList(results, amounts);
	}
}
