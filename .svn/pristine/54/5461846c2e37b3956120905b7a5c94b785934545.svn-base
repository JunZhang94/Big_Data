package com.jp.tic.business.batch.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.business.batch.entity.TaskQueryParam;
import com.jp.tic.business.batch.service.BatchInfoService;
import com.jp.tic.framework.controller.AbstractController;

@Controller
@RequestMapping("/batch")
public class BatchController extends AbstractController {
	@Autowired
	private BatchInfoService batchInfoService;
	
	@RequestMapping("/job/query")
	@ResponseBody
	public Object queryJob() throws Exception {
	    return batchInfoService.findAllJobs();
	}
	
	@RequestMapping("/task/search")
	@ResponseBody
	public Object queryCarData(TaskQueryParam param) throws Exception {
		debug(">>>car query param:" + param);
	    
		Map<String, Object> data = new HashMap<String, Object>();
		
	    return data;
	}
}
