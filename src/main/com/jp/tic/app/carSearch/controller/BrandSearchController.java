package com.jp.tic.app.carSearch.controller;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jp.tic.framework.controller.AbstractController;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/brandSearch")
@Scope("prototype")
public class BrandSearchController extends AbstractController {

	/*
	 * 安车牌品牌查询界面
	 * @return 页面映射
	 */
	@RequestMapping("/brandQueryPage")
	public String brandQueryPageLoad() {
		return "/search/brand-car-query";
	}
}
