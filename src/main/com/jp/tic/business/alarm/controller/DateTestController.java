package com.jp.tic.business.alarm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jp.tic.framework.controller.AbstractController;

@Controller
@RequestMapping("/dateTest")
public class DateTestController  extends AbstractController {

	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/toTestPage")
	public String toTestPageLoad() {
		return "/date-test";
	}
}
