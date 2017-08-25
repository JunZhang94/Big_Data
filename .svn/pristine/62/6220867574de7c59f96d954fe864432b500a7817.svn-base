package com.jp.tic.business.cartake.controller;

import java.util.Calendar;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.jp.tic.app.carSearch.ws.CarTypeSearchWS;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.service.SystemConfigService;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@Scope("prototype")
@RequestMapping("/nightAndDazed")
public class NightAndDazedController extends AbstractController {

	@Autowired
	private CarTypeSearchWS carTypeSearchWS;
	
	@Autowired
	private SystemConfigService systemConfigService;
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/nightAndDazedPage")
	public String nightAndDazedPageLoad() {
		return "/analyze/night-dazed-condition";
	}
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/nightDazedResultPage")
	public String nightDazedResultPageLoad() {
		return "/analyze/night-dazed-result";
	}
	
	@RequestMapping("/queryNightAndDazed")
	@ResponseBody
	public Object queryNightAndDazedData(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> limits = systemConfigService.findAllNightAndDazedDatas();
		/*int dazedStart = StringUtil.toInt(searchParam.get("dazedStart"));
		int dazedEnd = StringUtil.toInt(searchParam.get("dazedEnd"));
		int nightStart = StringUtil.toInt(searchParam.get("nightStart"));
		int nightEnd = StringUtil.toInt(searchParam.get("nightEnd"));*/
		int dazedStart = 0;
		int dazedEnd = 0;
		int nightStart = 0;
		int nightEnd = 0;
		String dazedMax = "0";
		String nightMax = "0";
		for (Map<String, String> configMap : limits) {
		    if (StringUtil.equals(configMap.get("CODE"), "condtion_dazedStart")) {
		    	dazedStart = StringUtil.toInt(configMap.get("VALUE"));
			} else if (StringUtil.equals(configMap.get("CODE"), "condtion_dazedEnd")) {
				dazedEnd = StringUtil.toInt(configMap.get("VALUE"));
			} else if (StringUtil.equals(configMap.get("CODE"), "condtion_nightStart")) {
				nightStart = StringUtil.toInt(configMap.get("VALUE"));
			} else if (StringUtil.equals(configMap.get("CODE"), "condtion_nightEnd")) {
				nightEnd = StringUtil.toInt(configMap.get("VALUE"));
			} else if (StringUtil.equals(configMap.get("CODE"), "condtion_MinNumber")) {
				dazedMax = configMap.get("VALUE");
			} else if (StringUtil.equals(configMap.get("CODE"), "condtion_MaxNumber")) {
				nightMax = configMap.get("VALUE");
			}
		}
		searchParam.put("dazedMax", dazedMax);
		searchParam.put("nightMax", nightMax);
		String dazedTimeStart = dazedStart + ":00:00";
		String dazedTimeEnd = dazedEnd + ":59:59";
		String nightTimeStart = nightStart + ":00:00";
		String nightTimeEnd = nightEnd + ":59:59";
		//因为solr对时间，白天和夜晚时间段做查询无法直接用语法实现，因此这里打算对页面上输入的时间天数，采用OR的方式连接
		String startDateStr = searchParam.get("startdate");
		String endDateStr = searchParam.get("enddate");
		int days = DateUtil.getTwoTimeDay(startDateStr + " 00:00:00", endDateStr + " 23:59:59");
		String centerDazedTime = startDateStr;
		String centerNightTime = startDateStr;
		Calendar cal = Calendar.getInstance();
		StringBuffer startDazedBuffer = new StringBuffer();
		StringBuffer endDazeduffer = new StringBuffer();
		StringBuffer startNightBuffer = new StringBuffer();
		StringBuffer endNightduffer = new StringBuffer();
		for (int i = 0; i <= days; i++) {
			//添加白天开始时间和结束时间，时间范围都是一天以内0-23小时,白天开始时间小于白天结束时间
			if (DateUtil.parseToDate(endDateStr, "yyyy-MM-dd").getTime() - DateUtil.parseToDate(centerDazedTime, "yyyy-MM-dd").getTime() >= 0) {
				if (StringUtil.checkObj(startDazedBuffer) && StringUtil.checkObj(endDazeduffer)) {
					startDazedBuffer.append(",");
					endDazeduffer.append(",");
				}
				startDazedBuffer.append(centerDazedTime + " " + dazedTimeStart);
				endDazeduffer.append(centerDazedTime + " " + dazedTimeEnd);
				cal.setTime(DateUtil.parseToDate(centerDazedTime, "yyyy-MM-dd"));
				cal.add(Calendar.DAY_OF_YEAR, 1);
				centerDazedTime = DateUtil.parseToString(cal.getTime(), "yyyy-MM-dd");
			}
			//添加夜晚开始时间和结束时间，开始时间可能会选到凌晨的时间，因此这要特殊处理,夜晚开始时间小于夜晚结束时间
			if (DateUtil.parseToDate(endDateStr, "yyyy-MM-dd").getTime() - DateUtil.parseToDate(centerNightTime, "yyyy-MM-dd").getTime() >= -1) {
				if (StringUtil.checkObj(startNightBuffer) && StringUtil.checkObj(endNightduffer)) {
					startNightBuffer.append(",");
					endNightduffer.append(",");
				}
				//选择的是凌晨,以6点位标准,都选的是凌晨
				if (nightStart > 0 && nightEnd < 6 && nightStart < nightEnd) {
					cal = Calendar.getInstance();
					cal.setTime(DateUtil.parseToDate(centerNightTime, "yyyy-MM-dd"));
					cal.add(Calendar.DAY_OF_YEAR, 1);
					centerNightTime = DateUtil.parseToString(cal.getTime(), "yyyy-MM-dd");
					startNightBuffer.append(centerNightTime + " " + nightTimeStart);
					endNightduffer.append(centerNightTime + " " + nightTimeEnd);
				} else if (nightStart < 24 && nightEnd < 6) {
					//结束时间在凌晨
					startNightBuffer.append(centerNightTime + " " + nightTimeStart);
					cal = Calendar.getInstance();
					cal.setTime(DateUtil.parseToDate(centerNightTime, "yyyy-MM-dd"));
					cal.add(Calendar.DAY_OF_YEAR, 1);
					//String nextDayTime = "";
					centerNightTime = DateUtil.parseToString(cal.getTime(), "yyyy-MM-dd");
					endNightduffer.append(centerNightTime + " " + nightTimeEnd);
					
				} else if (nightStart < 24 && nightEnd < 24) {
					//都不在凌晨
					startNightBuffer.append(centerNightTime + " " + nightTimeStart);
					endNightduffer.append(centerNightTime + " " + nightTimeEnd);
					cal.setTime(DateUtil.parseToDate(centerNightTime, "yyyy-MM-dd"));
					cal.add(Calendar.DAY_OF_YEAR, 1);
					centerNightTime = DateUtil.parseToString(cal.getTime(), "yyyy-MM-dd");
				}
			}
		}
		searchParam.put("dazedTimeStart", startDazedBuffer.toString());
		searchParam.put("dazedTimeEnd", endDazeduffer.toString());
		searchParam.put("startNightStart", startNightBuffer.toString());
		searchParam.put("endNightEnd", endNightduffer.toString());
		String jsonParam = JSON.toJSONString(searchParam);//查询条件
		String jsonStr = carTypeSearchWS.queryNightAndDazedData(jsonParam);
		Map<String, List<Map<String, String>>> datas = JsonUtil.jsonToMap(jsonStr);
		List<Map<String, String>> results = (List<Map<String, String>>) datas.get("rows");
		return ResponseUtils.sendList(results, 0);
	}
}
