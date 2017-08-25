package com.jp.tic.analyze.controller;

import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.analyze.service.ChartStatusService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.service.OrganizationService;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/chartStatus")
public class ChartStatusController extends AbstractController {
	
	@Autowired
	ChartStatusService chartStatusService;
	
	@Autowired
	OrganizationService organizationService;
	
	/**
	 * 同能经过改造后，加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/dataLineChat")
	public String dataLineChatLoad() {
		return "/datacenter/data-line-chat";
	}

	/**
	 * 卡口在线状态图表查询,只显示柱状图使用
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/mountCulumnStatus")
	@ResponseBody
	public Object mountCulumnStatusInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> datas = null;
		if (!StringUtil.checkStr(searchParam.get("culumnOline"))) {
			searchParam.put("culumnOline", "1"); //默认空则查询在线
		}
		List<Map<String, String>> mounts = organizationService.countUsringOrgMountsInfo();
		datas = chartStatusService.mountCulumnStatusInfo(searchParam);  //查询在线和离线
		String dwmcStr = "";
		List<Map<String, String>> outAlls = new ArrayList<Map<String,String>>();
		Map<String, String> newDataMap = null;
		boolean havingFlag = false;
		for (Map<String, String> mountMap : mounts) {
			havingFlag = false;
			for (Map<String, String> dataMap : datas) {
				if (StringUtil.equals(dataMap.get("PERIOD").trim(), mountMap.get("PERIOD").trim())) {
					dataMap.put("OUT", StringUtil.toString(StringUtil.toInt(mountMap.get("COUNT")) - StringUtil.toInt(dataMap.get("COUNT"))));
					dataMap.put("AMOUNT", mountMap.get("COUNT"));
					havingFlag = true;
					break;
				}
			}
			if (!havingFlag) {
				newDataMap = new HashMap<String, String>();
				newDataMap.put("PERIOD", mountMap.get("PERIOD"));
				newDataMap.put("COUNT", "0");
				newDataMap.put("OUT", mountMap.get("COUNT"));
				newDataMap.put("AMOUNT", mountMap.get("COUNT"));
				outAlls.add(newDataMap);
			}
		}
		List<Map<String, String>> reList = new ArrayList<Map<String,String>>(); 
		List<Map<String, String>> resultList = new ArrayList<Map<String,String>>(); 
		Map<String, String> policeMap = new HashMap<String, String>();
		Map<String, String> trafficPoliceMap = new HashMap<String, String>();
		if (outAlls.size() > 0) {
			datas.addAll(outAlls);
		}
		if (datas != null && datas.size() > 0) {
			for (Map<String, String> dataMap : datas) {
				String orgPolice = "科技通信处";
				String orgTrafficPolice = "交警支队";
				if (StringUtil.equals(dataMap.get("PERIOD").trim(), orgPolice)) {
					//dwmcStr = orgPolice.substring(2, orgPolice.length());
					policeMap = dataMap;
					dwmcStr = "科技通信处";
				} else if (StringUtil.equals(dataMap.get("PERIOD").trim(), orgTrafficPolice)) {
					//dwmcStr = orgTrafficPolice.substring(6, 10);
					trafficPoliceMap = dataMap;
					dwmcStr = "交警";
				} else {
					reList.add(dataMap);
					dwmcStr = dataMap.get("PERIOD").trim().substring(0, 2);
				}
				dataMap.put("PERIOD", dwmcStr);
			}
			resultList.add(policeMap);
			resultList.add(trafficPoliceMap);
			Collections.sort(reList, new Comparator<Map<String, String>>() { 
	            public int compare(Map<String, String> o1, Map<String, String> o2) { 
	                int map1value = StringUtil.toInt(o1.get("AMOUNT")); 
	                int map2value = StringUtil.toInt(o2.get("AMOUNT")); 
	                return map2value - map1value; 
	            } 
	        });
			resultList.addAll(reList);
		}
		this.jsonResult.setData(resultList);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 数据接收状态图表查询,显示柱状图使用
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/dataColumnAccept")
	@ResponseBody
	public Object dataColumnAcceptInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> datas = null;
		if (!StringUtil.checkStr(searchParam.get("culumnOline"))) {
			searchParam.put("culumnOline", "1"); //默认空则查询在线
		}
		List<Map<String, String>> mounts = organizationService.countUsringOrgMountsInfo();
		searchParam.put("culumnOline", "1"); //默认空则查询在线
		datas = chartStatusService.dataColumnAcceptInfo(searchParam);  //查询在线和离线
		String dwmcStr = "";
		List<Map<String, String>> outAlls = new ArrayList<Map<String,String>>();
		Map<String, String> newDataMap = null;
		boolean havingFlag = false;
		for (Map<String, String> mountMap : mounts) {
			havingFlag = false;
			for (Map<String, String> dataMap : datas) {
				if (StringUtil.equals(dataMap.get("PERIOD").trim(), mountMap.get("PERIOD").trim())) {
					dataMap.put("OUT", StringUtil.toString(StringUtil.toInt(mountMap.get("COUNT")) - StringUtil.toInt(dataMap.get("COUNT"))));
					dataMap.put("AMOUNT", mountMap.get("COUNT"));
					havingFlag = true;
					break;
				}
			}
			if (!havingFlag) {
				newDataMap = new HashMap<String, String>();
				newDataMap.put("PERIOD", mountMap.get("PERIOD"));
				newDataMap.put("COUNT", "0");
				newDataMap.put("OUT", mountMap.get("COUNT"));
				newDataMap.put("AMOUNT", mountMap.get("COUNT"));
				outAlls.add(newDataMap);
			}
		}
		List<Map<String, String>> reList = new ArrayList<Map<String,String>>(); 
		List<Map<String, String>> resultList = new ArrayList<Map<String,String>>(); 
		Map<String, String> policeMap = new HashMap<String, String>();
		Map<String, String> trafficPoliceMap = new HashMap<String, String>();
		if (outAlls.size() > 0) {
			datas.addAll(outAlls);
		}
		if (datas != null && datas.size() > 0) {
			for (Map<String, String> dataMap : datas) {
				String orgPolice = "科技通信处";
				String orgTrafficPolice = "交警支队";
				if (StringUtil.equals(dataMap.get("PERIOD").trim(), orgPolice)) {
					//dwmcStr = orgPolice.substring(2, orgPolice.length());
					policeMap = dataMap;
					dwmcStr = "科技通信处";
				} else if (StringUtil.equals(dataMap.get("PERIOD").trim(), orgTrafficPolice)) {
					//dwmcStr = orgTrafficPolice.substring(6, 10);
					trafficPoliceMap = dataMap;
					dwmcStr = "交警";
				} else {
					reList.add(dataMap);
					dwmcStr = dataMap.get("PERIOD").trim().substring(0, 2);
				}
				dataMap.put("PERIOD", dwmcStr);
			}
			resultList.add(policeMap);
			resultList.add(trafficPoliceMap);
			Collections.sort(reList, new Comparator<Map<String, String>>() { 
	            public int compare(Map<String, String> o1, Map<String, String> o2) { 
	                int map1value = StringUtil.toInt(o1.get("AMOUNT")); 
	                int map2value = StringUtil.toInt(o2.get("AMOUNT")); 
	                return map2value - map1value; 
	            } 
	        });
			resultList.addAll(reList);
		}
		this.jsonResult.setData(resultList);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 针对卡口在线状态，提供的列表排名展示
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/mountColumnGridQuery")
	@ResponseBody
	public Object mountColumnGridQueryInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> datas = null;
		if (!StringUtil.checkStr(searchParam.get("culumnOline"))) {
			searchParam.put("culumnOline", "1"); //默认空则查询在线
		}
		List<Map<String, String>> mounts = organizationService.countUsringOrgMountsInfo();
		datas = chartStatusService.mountCulumnStatusInfo(searchParam);  //查询在线和离线
		String dwmcStr = "";
		List<Map<String, String>> outAlls = new ArrayList<Map<String,String>>();
		Map<String, String> newDataMap = null;
		boolean havingFlag = false;
		NumberFormat nt = NumberFormat.getPercentInstance();
		nt.setMinimumFractionDigits(1);
		double percent = 0d;
		for (Map<String, String> mountMap : mounts) {
			havingFlag = false;
			for (Map<String, String> dataMap : datas) {
				if (StringUtil.equals(dataMap.get("PERIOD").trim(), mountMap.get("PERIOD").trim())) {
					dataMap.put("COUNT_DESC", mountMap.get("COUNT") + "（" + dataMap.get("COUNT")  + "）");
					percent = Double.parseDouble(dataMap.get("COUNT")) / Double.parseDouble(mountMap.get("COUNT"));
					dataMap.put("PERCENTAGE", nt.format(percent));
					havingFlag = true;
					break;
				}
			}
			if (!havingFlag) {
				newDataMap = new HashMap<String, String>();
				newDataMap.put("PERIOD", mountMap.get("PERIOD"));
				newDataMap.put("COUNT", "0");
				newDataMap.put("COUNT_DESC", mountMap.get("COUNT") + "（0）");
				newDataMap.put("PERCENTAGE", "0%");
				outAlls.add(newDataMap);
			}
		}
		if (outAlls.size() > 0) {
			datas.addAll(outAlls);
		}
		if (datas != null && datas.size() > 0) {
			for (Map<String, String> dataMap : datas) {
				String orgPolice = "科技通信处";
				String orgTrafficPolice = "交警支队";
				if (StringUtil.equals(dataMap.get("PERIOD").trim(), orgPolice)) {
					dwmcStr = "科技通信处";
				} else if (StringUtil.equals(dataMap.get("PERIOD").trim(), orgTrafficPolice)) {
					//dwmcStr = orgTrafficPolice.substring(6, 10);
					dwmcStr = "交警";
				} else {
					dwmcStr = dataMap.get("PERIOD").trim().substring(0, 2);
				}
				dataMap.put("PERIOD", dwmcStr);
			}
			Collections.sort(datas, new Comparator<Map<String, String>>() { 
	            public int compare(Map<String, String> o1, Map<String, String> o2) { 
	            	int map1value = StringUtil.toInt(Math.round(Float.parseFloat(o1.get("PERCENTAGE").replaceAll("%", ""))) * 10); 
	                int map2value = StringUtil.toInt(Math.round(Float.parseFloat(o2.get("PERCENTAGE").replaceAll("%", ""))) * 10);
	                return map2value - map1value; 
	            } 
	        });
		}
		return ResponseUtils.sendList(datas, datas.size());
	}
	
	/**
	 * 针对数据接收状态，提供的列表排名展示
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/dataColumnGridQuery")
	@ResponseBody
	public Object dataColumnGridQueryInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> datas = null;
		if (!StringUtil.checkStr(searchParam.get("culumnOline"))) {
			searchParam.put("culumnOline", "1"); //默认空则查询在线
		}
		List<Map<String, String>> mounts = organizationService.countUsringOrgMountsInfo();
		searchParam.put("culumnOline", "1"); //默认空则查询在线
		datas = chartStatusService.dataColumnAcceptInfo(searchParam);  //查询在线和离线
		String dwmcStr = "";
		List<Map<String, String>> outAlls = new ArrayList<Map<String,String>>();
		Map<String, String> newDataMap = null;
		boolean havingFlag = false;
		NumberFormat nt = NumberFormat.getPercentInstance();
		nt.setMinimumFractionDigits(1);
		double percent = 0d;
		for (Map<String, String> mountMap : mounts) {
			havingFlag = false;
			for (Map<String, String> dataMap : datas) {
				if (StringUtil.equals(dataMap.get("PERIOD").trim(), mountMap.get("PERIOD").trim())) {
					dataMap.put("COUNT_DESC", mountMap.get("COUNT") + "（" + dataMap.get("COUNT")  + "）");
					percent = Double.parseDouble(dataMap.get("COUNT")) / Double.parseDouble(mountMap.get("COUNT"));
					dataMap.put("PERCENTAGE", nt.format(percent));
					havingFlag = true;
					break;
				}
			}
			if (!havingFlag) {
				newDataMap = new HashMap<String, String>();
				newDataMap.put("PERIOD", mountMap.get("PERIOD"));
				newDataMap.put("COUNT", "0");
				newDataMap.put("COUNT_DESC", mountMap.get("COUNT") + "（0）");
				newDataMap.put("PERCENTAGE", "0%");
				outAlls.add(newDataMap);
			}
		}
		if (outAlls.size() > 0) {
			datas.addAll(outAlls);
		}
		if (datas != null && datas.size() > 0) {
			for (Map<String, String> dataMap : datas) {
				String orgPolice = "科技通信处";
				String orgTrafficPolice = "交警支队";
				if (StringUtil.equals(dataMap.get("PERIOD").trim(), orgPolice)) {
					dwmcStr = "科技通信处";
				} else if (StringUtil.equals(dataMap.get("PERIOD").trim(), orgTrafficPolice)) {
					//dwmcStr = orgTrafficPolice.substring(6, 10);
					dwmcStr = "交警";
				} else {
					dwmcStr = dataMap.get("PERIOD").trim().substring(0, 2);
				}
				dataMap.put("PERIOD", dwmcStr);
			}
			Collections.sort(datas, new Comparator<Map<String, String>>() { 
	            public int compare(Map<String, String> o1, Map<String, String> o2) { 
	            	int map1value = StringUtil.toInt(Math.round(Float.parseFloat(o1.get("PERCENTAGE").replaceAll("%", ""))) * 10); 
	                int map2value = StringUtil.toInt(Math.round(Float.parseFloat(o2.get("PERCENTAGE").replaceAll("%", ""))) * 10);
	                return map2value - map1value; 
	            } 
	        });
		}
		return ResponseUtils.sendList(datas, datas.size());
	}
	
	/**
	 * 卡口在线状态图表查询,趋势图查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/mountStatusLine")
	@ResponseBody
	public Object mountStatusLine(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> datas = this.initMountTrendChartData(searchParam);
		this.jsonResult.setData(datas);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 卡口在线状态,处理趋势图查询结果数据
	 * @param searchParam 查询参数
	 * @return 处理结果
	 */
	public List<Map<String, String>> initMountTrendChartData(Map<String, String> searchParam) {
		if (!StringUtil.checkStr(searchParam.get("timeType"))) { //默认查询日
			searchParam.put("timeType", "1");
		}
		if (!StringUtil.checkStr(searchParam.get("culumnOline"))) {
			searchParam.put("culumnOline", "1"); //默认空则查询在线
		}
		if (!StringUtil.checkStr(searchParam.get("orgId"))) {
			searchParam.put("orgId", "440100"); //默认广州市
			searchParam.put("orgType", "0"); 
		}
		String beginTime1 = null;
		String endTime1 = null;
		Calendar cal = Calendar.getInstance();
		if (StringUtil.equals(searchParam.get("timeType"), "1")) { //日:查询24小时以内的数据
			Date endDate = cal.getTime();
			Date beginDate = this.getDate(-1);
			String timeStr = DateUtil.parseToString(endDate, "HH");
			beginTime1 = DateUtil.parseToString(beginDate, "yyyy-MM-dd") + " " + timeStr + ":00:00";
			endTime1 = DateUtil.parseToString(endDate, "yyyy-MM-dd")  + " " + (StringUtil.toInt(timeStr) - 1) + ":59:59";
		}
		if (StringUtil.equals(searchParam.get("timeType"), "2")) { //周
			Date endDate = this.getDate(-1);
			Date beginDate = this.getDate(-7);
			beginTime1 = DateUtil.parseToString(beginDate, "yyyy-MM-dd") + " 00:00:00";
			endTime1 = DateUtil.parseToString(endDate, "yyyy-MM-dd") + " 23:59:59";
		}
		if (StringUtil.equals(searchParam.get("timeType"), "3")) { //月,往后推30天
			Date endDate = this.getDate(-1);
			Date beginDate = this.getDate(-30);
			beginTime1 = DateUtil.parseToString(beginDate, "yyyy-MM-dd") + " 00:00:00";
			endTime1 = DateUtil.parseToString(endDate, "yyyy-MM-dd") + " 23:59:59";
		}
		if (StringUtil.equals(searchParam.get("timeType"), "4")) { //年
			Date endDate = cal.getTime();
			cal.set(Calendar.YEAR,cal.get(Calendar.YEAR)-1); 
			Date beginDate = cal.getTime();
			beginTime1=DateUtil.parseToString(beginDate, "yyyy-MM-dd") + " 00:00:00";  
	        endTime1=DateUtil.parseToString(endDate, "yyyy-MM-dd") + " 23:59:59";  
		}
        searchParam.put("startTime", beginTime1);
        searchParam.put("endTime", endTime1);
		List<Map<String, String>> datas = null;
		datas = chartStatusService.mountStatusLine(searchParam);  //查询在线
		if (StringUtil.equals(searchParam.get("timeType"), "1")) { //日,特殊处理
			if (datas != null && datas.size() > 0) {
				for (Map<String, String> dataMap : datas) {
					dataMap.put("PERIOD", dataMap.get("PERIOD").split(" ")[1]);
				}
			}
		}
		return datas;
	}
	
	/**
	 * 数据接收率图表查询,趋势图查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/dataAcceptLine")
	@ResponseBody
	public Object dataAcceptTrendChartOnlyLineInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> datas = this.initTrendDataChartData(searchParam);
		this.jsonResult.setData(datas);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 处理趋势图查询结果数据
	 * @param searchParam 查询参数
	 * @return 处理结果
	 */
	public List<Map<String, String>> initTrendDataChartData(Map<String, String> searchParam) {
		if (!StringUtil.checkStr(searchParam.get("timeType"))) { //默认查询日
			searchParam.put("timeType", "1");
		}
		if (!StringUtil.checkStr(searchParam.get("culumnOline"))) {
			searchParam.put("culumnOline", "1"); //默认空则查询在线
		}
		if (!StringUtil.checkStr(searchParam.get("orgId"))) {
			searchParam.put("orgId", "440100"); //默认广州市
			searchParam.put("orgType", "0"); 
		}
		String beginTime1 = null;
		String endTime1 = null;
		Calendar cal = Calendar.getInstance();
		if (StringUtil.equals(searchParam.get("timeType"), "1")) { //日:查询24小时以内的数据
			Date endDate = cal.getTime();
			Date beginDate = this.getDate(-1);
			String timeStr = DateUtil.parseToString(endDate, "HH");
			beginTime1 = DateUtil.parseToString(beginDate, "yyyy-MM-dd") + " " + timeStr + ":00:00";
			endTime1 = DateUtil.parseToString(endDate, "yyyy-MM-dd")  + " " + (StringUtil.toInt(timeStr) - 1) + ":59:59";
		}
		if (StringUtil.equals(searchParam.get("timeType"), "2")) { //周
			Date endDate = this.getDate(-1);
			Date beginDate = this.getDate(-7);
			beginTime1 = DateUtil.parseToString(beginDate, "yyyy-MM-dd") + " 00:00:00";
			endTime1 = DateUtil.parseToString(endDate, "yyyy-MM-dd") + " 23:59:59";
		}
		if (StringUtil.equals(searchParam.get("timeType"), "3")) { //月,往后推30天
			Date endDate = this.getDate(-1);
			Date beginDate = this.getDate(-30);
			beginTime1 = DateUtil.parseToString(beginDate, "yyyy-MM-dd") + " 00:00:00";
			endTime1 = DateUtil.parseToString(endDate, "yyyy-MM-dd") + " 23:59:59";
		}
		if (StringUtil.equals(searchParam.get("timeType"), "4")) { //年
			Date endDate = cal.getTime();
			cal.set(Calendar.YEAR,cal.get(Calendar.YEAR)-1); 
			Date beginDate = cal.getTime();
			beginTime1=DateUtil.parseToString(beginDate, "yyyy-MM-dd") + " 00:00:00";  
	        endTime1=DateUtil.parseToString(endDate, "yyyy-MM-dd") + " 23:59:59";  
		}
        searchParam.put("startTime", beginTime1);
        searchParam.put("endTime", endTime1);
		List<Map<String, String>> datas = null;
		datas = chartStatusService.dataAcceptLineInfo(searchParam);  //查询在线
		if (StringUtil.equals(searchParam.get("timeType"), "1")) { //日,特殊处理
			if (datas != null && datas.size() > 0) {
				for (Map<String, String> dataMap : datas) {
					dataMap.put("PERIOD", dataMap.get("PERIOD").split(" ")[1]);
				}
			}
		}
		return datas;
	}
	
	/**
	 * 计算出离当前日期datas天的日期,若datas小于0表示当前日期之前datas天，若datas大于0表当前日期之后datas天
	 * @param 要计算的天数
	 * @return 得到日期
	 */
	public Date getDate(int datas) {
		GregorianCalendar calendar = new GregorianCalendar();
		calendar.add(GregorianCalendar.DATE, datas);
		String begin = new java.sql.Date(calendar.getTime().getTime())
				.toString();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date beginDate = null;
		try {
			beginDate = sdf.parse(begin);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return beginDate;
	}
}
