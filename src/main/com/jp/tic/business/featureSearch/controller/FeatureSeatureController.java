package com.jp.tic.business.featureSearch.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jp.tic.framework.controller.AbstractController;

@Controller
@RequestMapping("/featureSearch")
public class FeatureSeatureController extends AbstractController {
	
	/**
	 * 加载页面
	 * @return
	 */
	@RequestMapping("/featureQueryPage")
	public String featureQueryPageLoad() {
		return "/search/feature-car-query";
	}
	
}



