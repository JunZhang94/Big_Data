package com.jp.tic.business.compareByTime.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.app.carSearch.ws.CarTypeSearchWS;
import com.jp.tic.business.system.entity.ServerCache;
import com.jp.tic.business.user.service.UserService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@Scope("prototype")
@RequestMapping("/compareByTime")
public class CompareByTimeController extends AbstractController{

	@Autowired
	private CarTypeSearchWS carTypeSearchWS;
	
	@Autowired
	private UserService userService;
	
	/**
	 * 加载页面
	 * @return 页面映射
	 */
	@RequestMapping("/compareByTimePage")
	public String compareByTimePageLoad() {
		return "/analyze/compareByTimePage";
	}
	
	/**
	 * 结果展示页面
	 * @return 页面映射
	 */
	@RequestMapping("/compareByTimeResult")
	public String compareByTimeResult() {
		return "/analyze/compareByTimeResult";
	}
	
	/**
	 * 时间比对分析
	 * @param model
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/compareByTimeQuery")
	@ResponseBody
	public Object compareByTimeQuery(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		String json= JsonUtil.objToJson(searchParam);
		
		Map<String,Object> resultMap=new HashMap<String, Object>();
		Map<String, Object> userMap=userService.getCurrentUser(request);
		String user=StringUtil.toString(userMap.get("USER_CODE"));
		
		if("0".equals(searchParam.get("page.start"))){//首次查询
			resultMap=carTypeSearchWS.compareByTimeQueryForpages(json);
			if (StringUtil.checkObj(userMap.get("USER_CODE"))) {
				ServerCache.staticMap.put(user+"compareByTime", resultMap);
			}
		}else{
			resultMap=(Map<String, Object>) ServerCache.staticMap.get(user+"compareByTime");
		}
		List<CarTake> results = (List<CarTake>) resultMap.get("rows");
		if(null==results||results.size()==0){
			results=new ArrayList<CarTake>();
			return ResponseUtils.sendList(results, results.size());
		}
		int curPage=Integer.parseInt(searchParam.get("page.start"))/15+1;
		int firstIndex =Integer.parseInt(searchParam.get("page.start"));
		int	toIndex = 15*curPage;
		if(toIndex>=results.size()){  
			toIndex=results.size();  
		}
		if(firstIndex>toIndex){
			firstIndex=0;
		}
		List courseList=results.subList(firstIndex, toIndex);  
		if (courseList == null) {
			courseList = new ArrayList<CarTake>();
		}
		return ResponseUtils.sendList(courseList, results.size());
	}
}
