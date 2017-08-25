package com.jp.tic.business.datacenter.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.business.datacenter.service.DataStatisticsService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.service.OrganizationService;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@Scope("prototype")
@RequestMapping("/dataStatistics")
public class DataStatisticsController extends AbstractController {
	
	@Autowired
	private DataStatisticsService dataStatisticsService;
	
	@Autowired
	private OrganizationService organizationService;

	/**
	 * 车流量统计
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/dataTatisticsPage")
	public String trafficTatisticsPageLoad() throws Exception {
		return "/datacenter/data-statistics";
	}
	
	/**
	 * 车流量统计
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/dataTatisticsChartPage")
	public String dataTatisticsChartPageLoad() throws Exception {
		return "/datacenter/data-statistics-chart";
	}
	
	/**
	 * 卡口车流量统计,按单位统计
	 * @param param 查询参数
	 * @return 返回结果
	 * @throws Exception 
	 */
	@RequestMapping("/deptDataStatistics")
	@ResponseBody
	public Object deptDataStatisticsInfo(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request); 
		List<Map<String, String>> results = dataStatisticsService.deptDataStatisticsInfo(searchParam);
		List<Map<String, Object>> datas = new ArrayList<Map<String,Object>>();
		if (results != null) {
			Map<String, Object> mapTemp= null;
			for (Map<String, String> dataMap : results) {
				mapTemp = new HashMap<String, Object>();
				mapTemp.put("STATISTICAL_TIME", dataMap.get("STATISTICAL_TIME"));
				mapTemp.put("DWMC", dataMap.get("DWMC"));
				mapTemp.put("CAR_0_COUNS", StringUtil.toInt(dataMap.get("CAR_0_COUNS")));
				mapTemp.put("CAR_1_COUNS", StringUtil.toInt(dataMap.get("CAR_1_COUNS")));
				mapTemp.put("CAR_2_COUNS", StringUtil.toInt(dataMap.get("CAR_2_COUNS")));
				mapTemp.put("CAR_3_COUNS", StringUtil.toInt(dataMap.get("CAR_3_COUNS")));
				mapTemp.put("CAR_4_COUNS", StringUtil.toInt(dataMap.get("CAR_4_COUNS")));
				mapTemp.put("CAR_5_COUNS", StringUtil.toInt(dataMap.get("CAR_5_COUNS")));
				mapTemp.put("CAR_6_COUNS", StringUtil.toInt(dataMap.get("CAR_6_COUNS")));
				mapTemp.put("CAR_7_COUNS", StringUtil.toInt(dataMap.get("CAR_7_COUNS")));
				mapTemp.put("CAR_8_COUNS", StringUtil.toInt(dataMap.get("CAR_8_COUNS")));
				mapTemp.put("CAR_9_COUNS", StringUtil.toInt(dataMap.get("CAR_9_COUNS")));
				mapTemp.put("CAR_10_COUNS", StringUtil.toInt(dataMap.get("CAR_10_COUNS")));
				mapTemp.put("CAR_11_COUNS", StringUtil.toInt(dataMap.get("CAR_11_COUNS")));
				mapTemp.put("CAR_12_COUNS", StringUtil.toInt(dataMap.get("CAR_12_COUNS")));
				mapTemp.put("CAR_13_COUNS", StringUtil.toInt(dataMap.get("CAR_13_COUNS")));
				mapTemp.put("CAR_14_COUNS", StringUtil.toInt(dataMap.get("CAR_14_COUNS")));
				mapTemp.put("CAR_15_COUNS", StringUtil.toInt(dataMap.get("CAR_15_COUNS")));
				mapTemp.put("CAR_16_COUNS", StringUtil.toInt(dataMap.get("CAR_16_COUNS")));
				mapTemp.put("CAR_17_COUNS", StringUtil.toInt(dataMap.get("CAR_17_COUNS")));
				mapTemp.put("CAR_18_COUNS", StringUtil.toInt(dataMap.get("CAR_18_COUNS")));
				mapTemp.put("CAR_19_COUNS", StringUtil.toInt(dataMap.get("CAR_19_COUNS")));
				mapTemp.put("CAR_20_COUNS", StringUtil.toInt(dataMap.get("CAR_20_COUNS")));
				mapTemp.put("CAR_21_COUNS", StringUtil.toInt(dataMap.get("CAR_21_COUNS")));
				mapTemp.put("ALL_COUNTS", StringUtil.toInt(dataMap.get("ALL_COUNTS")));
				datas.add(mapTemp);
			}
		}
		this.jsonResult.setData((datas == null) ? new ArrayList<Map<String, String>>() : datas);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
	}
	
	/**
	 * 卡口车流量统计,按卡口统计
	 * @param param 查询参数
	 * @return 返回结果
	 * @throws Exception 
	 */
	@RequestMapping("/mountDataStatistics")
	@ResponseBody
	public Object mountDataStatisticsInfo(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request); 
		List<Map<String, String>> results = dataStatisticsService.mountDataStatisticsInfo(searchParam);
		List<Map<String, Object>> datas = new ArrayList<Map<String,Object>>();
		if (results != null) {
			Map<String, Object> mapTemp= null;
			for (Map<String, String> dataMap : results) {
				mapTemp = new HashMap<String, Object>();
				mapTemp.put("STATISTICAL_TIME", dataMap.get("STATISTICAL_TIME"));
				mapTemp.put("KKMC", dataMap.get("KKMC"));
				mapTemp.put("CAR_0_COUNS", StringUtil.toInt(dataMap.get("CAR_0_COUNS")));
				mapTemp.put("CAR_1_COUNS", StringUtil.toInt(dataMap.get("CAR_1_COUNS")));
				mapTemp.put("CAR_2_COUNS", StringUtil.toInt(dataMap.get("CAR_2_COUNS")));
				mapTemp.put("CAR_3_COUNS", StringUtil.toInt(dataMap.get("CAR_3_COUNS")));
				mapTemp.put("CAR_4_COUNS", StringUtil.toInt(dataMap.get("CAR_4_COUNS")));
				mapTemp.put("CAR_5_COUNS", StringUtil.toInt(dataMap.get("CAR_5_COUNS")));
				mapTemp.put("CAR_6_COUNS", StringUtil.toInt(dataMap.get("CAR_6_COUNS")));
				mapTemp.put("CAR_7_COUNS", StringUtil.toInt(dataMap.get("CAR_7_COUNS")));
				mapTemp.put("CAR_8_COUNS", StringUtil.toInt(dataMap.get("CAR_8_COUNS")));
				mapTemp.put("CAR_9_COUNS", StringUtil.toInt(dataMap.get("CAR_9_COUNS")));
				mapTemp.put("CAR_10_COUNS", StringUtil.toInt(dataMap.get("CAR_10_COUNS")));
				mapTemp.put("CAR_11_COUNS", StringUtil.toInt(dataMap.get("CAR_11_COUNS")));
				mapTemp.put("CAR_12_COUNS", StringUtil.toInt(dataMap.get("CAR_12_COUNS")));
				mapTemp.put("CAR_13_COUNS", StringUtil.toInt(dataMap.get("CAR_13_COUNS")));
				mapTemp.put("CAR_14_COUNS", StringUtil.toInt(dataMap.get("CAR_14_COUNS")));
				mapTemp.put("CAR_15_COUNS", StringUtil.toInt(dataMap.get("CAR_15_COUNS")));
				mapTemp.put("CAR_16_COUNS", StringUtil.toInt(dataMap.get("CAR_16_COUNS")));
				mapTemp.put("CAR_17_COUNS", StringUtil.toInt(dataMap.get("CAR_17_COUNS")));
				mapTemp.put("CAR_18_COUNS", StringUtil.toInt(dataMap.get("CAR_18_COUNS")));
				mapTemp.put("CAR_19_COUNS", StringUtil.toInt(dataMap.get("CAR_19_COUNS")));
				mapTemp.put("CAR_20_COUNS", StringUtil.toInt(dataMap.get("CAR_20_COUNS")));
				mapTemp.put("CAR_21_COUNS", StringUtil.toInt(dataMap.get("CAR_21_COUNS")));
				mapTemp.put("ALL_COUNTS", StringUtil.toInt(dataMap.get("ALL_COUNTS")));
				datas.add(mapTemp);
			}
		}
		this.jsonResult.setData((datas == null) ? new ArrayList<Map<String, String>>() : datas);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
	}
	
	/**
	 * 车流量统计趋势图
	 * @param param 查询参数
	 * @return 返回结果
	 * @throws Exception 
	 */
	@RequestMapping("/dataStatisticsLine")
	@ResponseBody
	public Object dataStatisticsLineInfo(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> datas = this.initTrendDataChartData(searchParam);
		this.jsonResult.setData(datas);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 统计所有的数据量
	 * @param param 查询参数
	 * @return 返回结果
	 * @throws Exception 
	 */
	@RequestMapping("/loadALLDataMounts")
	@ResponseBody
	public Object loadALLDataMounts(Model model, HttpServletRequest request) throws Exception {
		int mounts = dataStatisticsService.loadALLDataMounts();
		this.jsonResult.setData(mounts);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 处理趋势图查询结果数据
	 * @param searchParam 查询参数
	 * @return 处理结果
	 * @throws Exception 
	 */
	public List<Map<String, String>> initTrendDataChartData(Map<String, String> searchParam) throws Exception {
		if (!StringUtil.checkStr(searchParam.get("timeType"))) { //默认查询日,10天内统计图，周为一个月内周统计图，月则为12个统计图
			searchParam.put("timeType", "1");
		}
		if (!StringUtil.checkStr(searchParam.get("orgId"))) {
			String orgId = "";
			List<Map<String, String>> orgInfo = organizationService.loadAreaTabTwo();
			if (orgInfo != null && orgInfo.size() > 0) {
				orgId = orgInfo.get(0).get("QYDM");
			} else {
				orgId = "440100"; //默认广州市
			}
			searchParam.put("orgId", orgId); 
			searchParam.put("orgType", "0"); 
		}
		String beginTime1 = null;
		String endTime1 = null;
		if (StringUtil.equals(searchParam.get("timeType"), "1")) { //日:查询10天内的数据
			Date endDate = this.getDate("day", 0);
			Date beginDate = this.getDate("day", -9);
			beginTime1 = DateUtil.parseToString(beginDate, "yyyy-MM-dd") + " 00:00:00";
			endTime1 = DateUtil.parseToString(endDate, "yyyy-MM-dd") + " 23:59:59";
		}
		if (StringUtil.equals(searchParam.get("timeType"), "2")) { //周，查询10个周以内的数据
			Date endDate = this.getDate("week", 0);
			Date beginDate = this.getDate("week", -6);
			beginTime1 = DateUtil.parseToString(beginDate, "yyyy-MM-dd") + " 00:00:00";
			endTime1 = DateUtil.parseToString(endDate, "yyyy-MM-dd") + " 23:59:59";
		}
		if (StringUtil.equals(searchParam.get("timeType"), "3")) { //月,查询12个月以内的数据
			Date endDate = this.getDate("mouth", 0);
			Date beginDate = this.getDate("mouth", -11);
			beginTime1 = DateUtil.parseToString(beginDate, "yyyy-MM-dd") + " 00:00:00";
			endTime1 = DateUtil.parseToString(endDate, "yyyy-MM-dd") + " 23:59:59";
		}
        searchParam.put("startdate", beginTime1);
        searchParam.put("enddate", endTime1);
        List<Map<String, String>> results = dataStatisticsService.statisticsCarDatas(searchParam);
        Map<String, List<Map<String, String>>> filteMap = new HashMap<String, List<Map<String,String>>>();
        if (results != null && results.size() > 0) {
        	String[] carCategorys = null;
        	if (StringUtil.checkStr(searchParam.get("carCategory"))) {
        		carCategorys = searchParam.get("carCategory").split(",");
        	} else {
        		carCategorys = new String[]{"1","11","8","0"};
			}
        	String[] codes = new String[carCategorys.length];
        	if (carCategorys != null && carCategorys.length > 0) {
        		for (int m = 0; m < carCategorys.length; m++) {
            		if (StringUtil.equals(carCategorys[m], "0")) {
            			codes[m] = "CAR_0_COUNS";
            		} else if (StringUtil.equals(carCategorys[m], "1")) {
            			codes[m] = "CAR_1_COUNS";
            		} else if (StringUtil.equals(carCategorys[m], "2")) {
            			codes[m] = "CAR_2_COUNS";
            		} else if (StringUtil.equals(carCategorys[m], "3")) {
            			codes[m] = "CAR_3_COUNS";
            		} else if (StringUtil.equals(carCategorys[m], "4")) {
            			codes[m] = "CAR_4_COUNS";
            		} else if (StringUtil.equals(carCategorys[m], "5")) {
            			codes[m] = "CAR_5_COUNS";
            		} else if (StringUtil.equals(carCategorys[m], "6")) {
            			codes[m] = "CAR_6_COUNS";
            		} else if (StringUtil.equals(carCategorys[m], "7")) {
            			codes[m] = "CAR_7_COUNS";
            		} else if (StringUtil.equals(carCategorys[m], "8")) {
            			codes[m] = "CAR_8_COUNS";
            		} else if (StringUtil.equals(carCategorys[m], "9")) {
            			codes[m] = "CAR_9_COUNS";
            		} else if (StringUtil.equals(carCategorys[m], "10")) {
            			codes[m] = "CAR_10_COUNS";
            		} else if (StringUtil.equals(carCategorys[m], "11")) {
            			codes[m] = "CAR_11_COUNS";
            		} else if (StringUtil.equals(carCategorys[m], "12")) {
            			codes[m] = "CAR_12_COUNS";
            		} else if (StringUtil.equals(carCategorys[m], "13")) {
            			codes[m] = "CAR_13_COUNS";
            		} else if (StringUtil.equals(carCategorys[m], "14")) {
            			codes[m] = "CAR_14_COUNS";
            		} else if (StringUtil.equals(carCategorys[m], "15")) {
            			codes[m] = "CAR_15_COUNS";
            		} else if (StringUtil.equals(carCategorys[m], "16")) {
            			codes[m] = "CAR_16_COUNS";
            		} else if (StringUtil.equals(carCategorys[m], "17")) {
            			codes[m] = "CAR_17_COUNS";
            		} else if (StringUtil.equals(carCategorys[m], "18")) {
            			codes[m] = "CAR_18_COUNS";
            		} else if (StringUtil.equals(carCategorys[m], "19")) {
            			codes[m] = "CAR_19_COUNS";
            		} 
            	}
        	}
        	List<Map<String, String>> filteDatas = null;
        	Map<String, String> tempMap = null;
        	for (Map<String, String> map : results) {
        		for (int i = 0; i < codes.length; i++) {
        			if (filteMap.containsKey(codes[i])) {
            			tempMap = this.loadDatas(map, codes[i], searchParam.get("timeType"));
            			filteMap.get(codes[i]).add(tempMap);
            		} else {
            			filteDatas = new ArrayList<Map<String,String>>();
            			tempMap = this.loadDatas(map, codes[i], searchParam.get("timeType"));
            			filteDatas.add(tempMap);
            			filteMap.put(codes[i], filteDatas);
    				}
        		}
        	}
        }
        Iterator it = filteMap.keySet().iterator();
        List<Map<String, String>> filteResults = new ArrayList<Map<String,String>>();
        String key = null;
        while(it.hasNext()){
        	key = (String) it.next();
        	filteResults.addAll(filteMap.get(key));
        }
		return filteResults;
	}
	
	public Map<String, String> loadDatas(Map<String, String> map, String code, String timeType) {
		Map<String, String> tempMap = new HashMap<String, String>();
		if (StringUtil.equals(timeType, "2")) {
			tempMap.put("PERIOD", "第" + map.get("STATISTICAL_TIME") + "周");
		} else {
			tempMap.put("PERIOD", map.get("STATISTICAL_TIME"));
		}
		if (StringUtil.equals(code, "CAR_1_COUNS")) {
			tempMap.put("CAR_TYPE", "轿车");
		} else if (StringUtil.equals(code, "CAR_2_COUNS")) {
			tempMap.put("CAR_TYPE", "越野车");
		} else if (StringUtil.equals(code, "CAR_3_COUNS")) {
			tempMap.put("CAR_TYPE", "商务车");
		} else if (StringUtil.equals(code, "CAR_4_COUNS")) {
			tempMap.put("CAR_TYPE", "面包车");
		} else if (StringUtil.equals(code, "CAR_5_COUNS")) {
			tempMap.put("CAR_TYPE", "皮卡");
		} else if (StringUtil.equals(code, "CAR_6_COUNS")) {
			tempMap.put("CAR_TYPE", "微型货车");
		} else if (StringUtil.equals(code, "CAR_7_COUNS")) {
			tempMap.put("CAR_TYPE", "轻型货车");
		} else if (StringUtil.equals(code, "CAR_8_COUNS")) {
			tempMap.put("CAR_TYPE", "货车");
		} else if (StringUtil.equals(code, "CAR_9_COUNS")) {
			tempMap.put("CAR_TYPE", "重型货车");
		} else if (StringUtil.equals(code, "CAR_10_COUNS")) {
			tempMap.put("CAR_TYPE", "轻型客");
		} else if (StringUtil.equals(code, "CAR_11_COUNS")) {
			tempMap.put("CAR_TYPE", "客车");
		} else if (StringUtil.equals(code, "CAR_12_COUNS")) {
			tempMap.put("CAR_TYPE", "大型客车");
		} else if (StringUtil.equals(code, "CAR_13_COUNS")) {
			tempMap.put("CAR_TYPE", "公交车");
		} else if (StringUtil.equals(code, "CAR_14_COUNS")) {
			tempMap.put("CAR_TYPE", "三轮车");
		} else if (StringUtil.equals(code, "CAR_15_COUNS")) {
			tempMap.put("CAR_TYPE", "摩托车");
		} else if (StringUtil.equals(code, "CAR_16_COUNS")) {
			tempMap.put("CAR_TYPE", "校车");
		} else if (StringUtil.equals(code, "CAR_17_COUNS")) {
			tempMap.put("CAR_TYPE", "泥头车");
		} else if (StringUtil.equals(code, "CAR_18_COUNS")) {
			tempMap.put("CAR_TYPE", "黄标车");
		} else if (StringUtil.equals(code, "CAR_19_COUNS")) {
			tempMap.put("CAR_TYPE", "挂车");
		} else if (StringUtil.equals(code, "CAR_0_COUNS")) {
			tempMap.put("CAR_TYPE", "其他");
		}
		tempMap.put("COUNT", map.get(code));
		return tempMap;
	}
	
	/**
	 * 计算出离当前日期datas天的日期,若datas小于0表示当前日期之前datas天，若datas大于0表当前日期之后datas天
	 * @param 要计算的天数
	 * @return 得到日期
	 */
	public Date getDate(String dataTyle, int datas) {
		GregorianCalendar calendar = new GregorianCalendar();
		if (datas != 0) {
			if (StringUtil.equals(dataTyle, "day")) {
				calendar.add(GregorianCalendar.DAY_OF_YEAR, datas);
			} else if (StringUtil.equals(dataTyle, "week")) {
				calendar.add(GregorianCalendar.WEEK_OF_YEAR, datas);
			} else if (StringUtil.equals(dataTyle, "mouth")) {
				calendar.add(GregorianCalendar.MONTH, datas);
			} 
		}
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
