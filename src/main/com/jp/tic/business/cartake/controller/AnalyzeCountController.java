package com.jp.tic.business.cartake.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.framework.controller.AbstractController;

@Controller
@RequestMapping("/count")
public class AnalyzeCountController<E extends Map<String,Object>> extends AbstractController {

	public final SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	@RequestMapping("/queryRecognitionRate")
	@ResponseBody
	public List<E> queryBasicData(String type, String code) throws Exception {
		List<E> result = null;
		try {
			Date start = formatter.parse("");
			Date end = formatter.parse("");
			//service.queryBasicData(dataType , code);
		} catch (Exception e) {
		}
		
		return result;
	}
}
