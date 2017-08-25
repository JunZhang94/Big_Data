package com.jp.tic.business.cartake.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jp.tic.business.cartake.service.PurpleFaceService;
import com.jp.tic.framework.controller.AbstractController;

@Controller
@Scope("prototype")
@SuppressWarnings("unchecked")
@RequestMapping("/purpleFace")
public class PurpleFaceController extends AbstractController {

	@Autowired
	private PurpleFaceService purpleFaceService;
	
	/*
	 * 安车牌品牌查询界面
	 * @return 页面映射
	 */
	@RequestMapping("/purpleFacePage")
	public String brandQueryPageLoad() {
		return "/search/purple-face";
	}
}
