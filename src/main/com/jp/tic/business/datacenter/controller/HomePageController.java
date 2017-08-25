package com.jp.tic.business.datacenter.controller;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jp.tic.framework.controller.AbstractController;

@Controller
@SuppressWarnings("unchecked")
@Scope("prototype")
@RequestMapping("/homePage")
public class HomePageController extends AbstractController {

	@RequestMapping("/loadHomePage")
	public String loadHomePage() throws Exception {
		return "/datacenter/home-forms-page";
	}
	
}
