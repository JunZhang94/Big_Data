package com.jp.tic.system.main.controller;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jp.tic.framework.controller.AbstractController;

@Controller
@RequestMapping("/common")
public class MainController extends AbstractController {

	@RequestMapping("/index")
	public String index() throws Exception {
		return "main/" + "main" ;
	}
	
	@RequestMapping("/frame/{page}")
	public String frame(@PathVariable String page) throws Exception {
		return "main/" + page;
	}
	
	@RequestMapping("/view/{page}")
	public String view(@PathVariable String page) throws Exception {
		if (StringUtils.contains(page, "|")) {
			page = StringUtils.replace(page, "|", "/");
			return page;
		}
		return page;
	}
	
	@RequestMapping("/go/{view}")
	public String go(@PathVariable String view) throws Exception {
		if (StringUtils.contains(view, "|")) {
			view = StringUtils.replace(view, "|", "/");
			return "forward:/" + view + ".mvc";
		}
		return view;
	}
}
