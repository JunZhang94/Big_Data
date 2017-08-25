package com.jp.tic.analyze.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.jp.tic.analyze.entity.PageEntity;
import com.jp.tic.analyze.service.CarTakeService;
import com.jp.tic.analyze.service.FollowCarLocalService;
import com.jp.tic.analyze.service.RegionCrashService;
import com.jp.tic.app.carSearch.ws.CarTypeSearchWS;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/region")
public class RegionGrashController extends AbstractController {

	public final SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	@Autowired
	private CarTakeService takeService;
	
	@Autowired
	private FollowCarLocalService followCarLocalService;
	
	@Autowired
	private RegionCrashService regionCrashService;
	
	@Autowired
	private CarTypeSearchWS carTypeSearchWS;
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/regionCrashPage")
	public String regionCrashPageLoad() {
		return "/analyze/region-crash";
	}
	
	/**
	 * 加载查询页面-新改造页面
	 * @return 页面映射
	 */
	@RequestMapping("/regionCrashNewPage")
	public String regionCrashNewPageLoad() {
		return "/analyze/region-crash-condition";
	}
	
	/**
	 * 加载查询页面-新改造页面
	 * @return 页面映射
	 */
	@RequestMapping("/regionCrashResultPage")
	public String regionCrashResultPageLoad() {
		return "/analyze/region-crash-result";
	}
	
	/**
	 * 区域碰撞查询
	 * @param param 查询参数
	 * @return 返回结果
	 * @throws ParseException 
	 */
	@RequestMapping("/regionQuery")
	@ResponseBody
	public Object regionQueryInfo(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		PageEntity page1 = new PageEntity();
		page1.setPageNo(1);
		page1.setPageSize(5000);
		PageEntity page2 = new PageEntity();
		page2.setPageNo(1);
		page2.setPageSize(5000);
		PageEntity page3 = new PageEntity();
		page3.setPageNo(1);
		page3.setPageSize(5000);
		List<Map<String, String>> results = new ArrayList<Map<String,String>>();
		Date startDate1 = null;
		if (StringUtils.isNotEmpty(searchParam.get("startdate"))) {
			String startTime1 = searchParam.get("startdate").replace("T", " ");
			startDate1 = formatter.parse(startTime1);
		}
		Date endDate1 = null;
		if (StringUtils.isNotEmpty(searchParam.get("enddate"))) {
			String endTime1 = searchParam.get("enddate").replace("T", " ");
			endDate1 = formatter.parse(endTime1);
		}
		Date startDate2 = null;
		if (StringUtils.isNotEmpty(searchParam.get("startdate2"))) {
			String startTime2 = searchParam.get("startdate2").replace("T", " ");
			startDate2 = formatter.parse(startTime2);
		}
		Date endDate2 = null;
		if (StringUtils.isNotEmpty(searchParam.get("enddate2"))) {
			String endTime2 = searchParam.get("enddate2").replace("T", " ");
			endDate2 = formatter.parse(endTime2);
		}
		Date startDate3 = null;
		if (StringUtils.isNotEmpty(searchParam.get("startdate3"))) {
			String startTime3 = searchParam.get("startdate3").replace("T", " ");
			startDate3 = formatter.parse(startTime3);
		}
		Date endDate3 = null;
		if (StringUtils.isNotEmpty(searchParam.get("enddate3"))) {
			String endTime3 = searchParam.get("enddate3").replace("T", " ");
			endDate3 = formatter.parse(endTime3);
		}
		List<String> kkbhs1 = new ArrayList<String>();
		List<String> kkbhs2 = new ArrayList<String>();
		List<String> kkbhs3 = new ArrayList<String>();
		String kkbh1 = "440" + searchParam.get("kkbh1");
		String kkbh2 = "440" + searchParam.get("kkbh2");
		String kkbh3 = "";
		kkbhs1.add(kkbh1);
		kkbhs2.add(kkbh2);
		page1 = takeService.getMountSnapshotand(kkbhs1, startDate1, endDate1, page1);
		page2 = takeService.getMountSnapshotand(kkbhs2, startDate2, endDate2, page2);
		if (StringUtil.checkStr(searchParam.get("kkbh3"))) {
			kkbh3 = "440" + searchParam.get("kkbh3");
			kkbhs3.add(kkbh3);
			page3 = takeService.getMountSnapshotand(kkbhs3, startDate3, endDate3, page3);
		}
		List<CarTake> carTakeDatas = new ArrayList<CarTake>();
		if (!StringUtil.checkStr(searchParam.get("kkbh3"))) { //卡口3为空的情况
			if (page1.getResult() != null && page2.getResult() != null) {
				for (CarTake carTake1 : page1.getResult()) {
					for (CarTake carTake2 : page2.getResult()) {
						if (StringUtil.equals(carTake1.getHphm(), carTake2.getHphm())) {
							carTakeDatas.add(carTake1);
							break;
						}
					}
				}
				for (CarTake carTake2 : page2.getResult()) {
					for (CarTake carTake1 : page1.getResult()) {
						if (StringUtil.equals(carTake2.getHphm(), carTake1.getHphm())) {
							carTakeDatas.add(carTake2);
							break;
						}
					}
				}
			}
		} else {
			if (page1.getResult() != null && page2.getResult() != null && page3.getResult() != null) {
				List<CarTake> oneCarTakes = new ArrayList<CarTake>();
				//三个卡口集合的情况，卡口一比对，好复杂
				for (CarTake carTake1 : page1.getResult()) {
					for (CarTake carTake2 : page2.getResult()) {
						if (StringUtil.equals(carTake1.getHphm(), carTake2.getHphm())) {
							oneCarTakes.add(carTake1);
							break;
						}
					}
				}
				if (oneCarTakes != null && oneCarTakes.size() > 0) {
					for (CarTake carTake : oneCarTakes) {
						for (CarTake carTake3 : page3.getResult()) {
							if (StringUtil.equals(carTake.getHphm(), carTake3.getHphm())) {
								carTakeDatas.add(carTake);
								break;
							}
						}
					}
				}
				//三个卡口集合的情况，卡口二比对，好复杂
				List<CarTake> twoCarTakes = new ArrayList<CarTake>();
				for (CarTake carTake2 : page2.getResult()) {
					for (CarTake carTake1 : page1.getResult()) {
						if (StringUtil.equals(carTake2.getHphm(), carTake1.getHphm())) {
							twoCarTakes.add(carTake2);
							break;
						}
					}
				}
				if (twoCarTakes != null && twoCarTakes.size() > 0) {
					for (CarTake carTake0 : twoCarTakes) {
						for (CarTake carTake3 : page3.getResult()) {
							if (StringUtil.equals(carTake0.getHphm(), carTake3.getHphm())) {
								carTakeDatas.add(carTake0);
								break;
							}
						}
					}
				}
				//三个卡口集合的情况，卡口三比对，好复杂
				List<CarTake> threeCarTakes = new ArrayList<CarTake>();
				for (CarTake carTake3 : page3.getResult()) {
					for (CarTake carTake1 : page1.getResult()) {
						if (StringUtil.equals(carTake3.getHphm(), carTake1.getHphm())) {
							threeCarTakes.add(carTake3);
							break;
						}
					}
				}
				if (threeCarTakes != null && threeCarTakes.size() > 0) {
					for (CarTake carTake0 : threeCarTakes) {
						for (CarTake carTake2 : page2.getResult()) {
							if (StringUtil.equals(carTake0.getHphm(), carTake2.getHphm())) {
								carTakeDatas.add(carTake0);
								break;
							}
						}
					}
				}
			}
		}
		//先把相同车牌号码的数据放到同一个list里面
		Map<String, List<CarTake>> filteMap = new HashMap<String, List<CarTake>>();
		if (carTakeDatas != null && carTakeDatas.size() > 0) {
			for (int i = 0; i < carTakeDatas.size(); i++) {
				if(filteMap.containsKey(carTakeDatas.get(i).getHphm())==false){
					filteMap.put(carTakeDatas.get(i).getHphm(), new ArrayList<CarTake>());
				}
				filteMap.get(carTakeDatas.get(i).getHphm()).add(carTakeDatas.get(i));
			}
		}
		
		List<Map<String, String>> resultDatas = new ArrayList<Map<String,String>>();
		Map<String, String> resultMap = null;
		Iterator it = filteMap.keySet().iterator();
		String keys = null;
		List<CarTake> values = null;
		
		/*String kkbh1 = "12345";
		String kkbh2 = "23456";
		String kkbh3 = "34567";*/
		while(it.hasNext()){
			keys = (String) it.next();
			values = filteMap.get(keys);
			if (values != null && values.size() > 0) {
				resultMap = new HashMap<String, String>();
				for (int m = 0; m < values.size(); m++) {
					if (StringUtil.checkStr(kkbh3)) {
						if (resultMap.containsKey("kkmc1") && resultMap.containsKey("kkmc2") && resultMap.containsKey("kkmc3")) {
							resultDatas.add(resultMap);
							resultMap = new HashMap<String, String>();
						}
					} else {
						if (resultMap.containsKey("kkmc1") && resultMap.containsKey("kkmc2")) {
							resultDatas.add(resultMap);
							resultMap = new HashMap<String, String>();
						}
					}
					if (StringUtil.equals(values.get(m).getKkbh(), kkbh1)) {
						if (resultMap.containsKey("kkmc1") == false) {
							resultMap.put("carNum", values.get(m).getHphm());
							resultMap.put("kkmc1", values.get(m).getKkmc());
							resultMap.put("kkmcTime1", DateUtil.parseToString(values.get(m).getJgsj(), "yyyy-MM-dd HH:mm:ss"));
						}
					}
					if (StringUtil.equals(values.get(m).getKkbh(), kkbh2)) {
						if (resultMap.containsKey("kkmc2") == false) {
							resultMap.put("carNum", values.get(m).getHphm());
							resultMap.put("kkmc2", values.get(m).getKkmc());
							resultMap.put("kkmcTime2", DateUtil.parseToString(values.get(m).getJgsj(), "yyyy-MM-dd HH:mm:ss"));
						}
					}
					if (StringUtil.equals(values.get(m).getKkbh(), kkbh3)) {
						if (resultMap.containsKey("kkmc3") == false) {
							resultMap.put("carNum", values.get(m).getHphm());
							resultMap.put("kkmc3", values.get(m).getKkmc());
							resultMap.put("kkmcTime3", DateUtil.parseToString(values.get(m).getJgsj(), "yyyy-MM-dd HH:mm:ss"));
						}
					}
				}
				resultDatas.add(resultMap);
			}
		}
		return ResponseUtils.sendList(resultDatas, 0);         
	}
	
	/**
	 * 区域碰撞查询-根据新界面重新改造
	 * @param param 查询参数
	 * @return 返回结果
	 * @throws ParseException 
	 */
	@RequestMapping("/regionQueryNew")
	@ResponseBody
	public Object regionQueryNewInfo(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String[] kkbhs = searchParam.get("kkbhs").split(",");
		String[] startTimes = searchParam.get("startTimes").split(",");
		String[] endTimes = searchParam.get("endTimes").split(",");
		PageEntity page1 = new PageEntity();
		page1.setPageNo(1);
		page1.setPageSize(5000);
		PageEntity page2 = new PageEntity();
		page2.setPageNo(1);
		page2.setPageSize(5000);
		PageEntity page3 = new PageEntity();
		page3.setPageNo(1);
		page3.setPageSize(5000);
		Date startDate1 = null;
		if (StringUtils.isNotEmpty(startTimes[0])) {
			String startTime1 = startTimes[0].replace("T", " ");
			startDate1 = formatter.parse(startTime1);
		}
		Date endDate1 = null;
		if (StringUtils.isNotEmpty(endTimes[0])) {
			String endTime1 = endTimes[0].replace("T", " ");
			endDate1 = formatter.parse(endTime1);
		}
		Date startDate2 = null;
		if (StringUtils.isNotEmpty(startTimes[1])) {
			String startTime2 = startTimes[1].replace("T", " ");
			startDate2 = formatter.parse(startTime2);
		}
		Date endDate2 = null;
		if (StringUtils.isNotEmpty(endTimes[1])) {
			String endTime2 = endTimes[1].replace("T", " ");
			endDate2 = formatter.parse(endTime2);
		}
		Date startDate3 = null;
		if (startTimes.length > 2 && StringUtils.isNotEmpty(startTimes[2])) {
			String startTime3 = startTimes[2].replace("T", " ");
			startDate3 = formatter.parse(startTime3);
		}
		Date endDate3 = null;
		if (endTimes.length > 2 && StringUtils.isNotEmpty(endTimes[2])) {
			String endTime3 = endTimes[2].replace("T", " ");
			endDate3 = formatter.parse(endTime3);
		}
		List<String> kkbhs1 = new ArrayList<String>();
		List<String> kkbhs2 = new ArrayList<String>();
		List<String> kkbhs3 = new ArrayList<String>();
		String kkbh1 = "440" + kkbhs[0];
		String kkbh2 = "440" + kkbhs[1];
		String kkbh3 = "";
		kkbhs1.add(kkbh1);
		kkbhs2.add(kkbh2);
		page1 = takeService.getMountSnapshotand(kkbhs1, startDate1, endDate1, page1);
		page2 = takeService.getMountSnapshotand(kkbhs2, startDate2, endDate2, page2);
		if (kkbhs.length > 2 && StringUtil.checkStr(kkbhs[2])) {
			kkbh3 = "440" + kkbhs[2];
			kkbhs3.add(kkbh3);
			page3 = takeService.getMountSnapshotand(kkbhs3, startDate3, endDate3, page3);
		}
		List<CarTake> carTakeDatas = new ArrayList<CarTake>();
		if (kkbhs.length == 2) { //卡口3为空的情况
			if (page1.getResult() != null && page2.getResult() != null) {
				List<CarTake> carTakesTemp = new ArrayList<CarTake>();
				for (CarTake carTake1 : page1.getResult()) {
					for (CarTake carTake2 : page2.getResult()) {
						if (StringUtil.equals(carTake1.getHphm(), carTake2.getHphm())) {
							carTakeDatas.add(carTake1);
							break;
						}
					}
				}
				carTakesTemp.addAll(carTakeDatas);
				for (CarTake carTake1 : carTakesTemp) {
					for (CarTake carTake2 : page2.getResult()) {
						if (StringUtil.equals(carTake1.getHphm(), carTake2.getHphm())) {
							carTakeDatas.add(carTake2);
							break;
						}
					}
				}
			}
		} else {
			if (page1.getResult() != null && page2.getResult() != null && page3.getResult() != null) {
				List<CarTake> oneCarTakes = new ArrayList<CarTake>();
				//三个卡口集合的情况，卡口一比对，好复杂
				for (CarTake carTake1 : page1.getResult()) {
					for (CarTake carTake2 : page2.getResult()) {
						if (StringUtil.equals(carTake1.getHphm(), carTake2.getHphm())) {
							oneCarTakes.add(carTake1);
							break;
						}
					}
				}
				if (oneCarTakes != null && oneCarTakes.size() > 0) {
					for (CarTake carTake : oneCarTakes) {
						for (CarTake carTake3 : page3.getResult()) {
							if (StringUtil.equals(carTake.getHphm(), carTake3.getHphm())) {
								carTakeDatas.add(carTake);
								break;
							}
						}
					}
				}
				//三个卡口集合的情况，卡口二比对，好复杂
				List<CarTake> twoCarTakes = new ArrayList<CarTake>();
				for (CarTake carTake2 : page2.getResult()) {
					for (CarTake carTake1 : page1.getResult()) {
						if (StringUtil.equals(carTake2.getHphm(), carTake1.getHphm())) {
							twoCarTakes.add(carTake2);
							break;
						}
					}
				}
				if (twoCarTakes != null && twoCarTakes.size() > 0) {
					for (CarTake carTake0 : twoCarTakes) {
						for (CarTake carTake3 : page3.getResult()) {
							if (StringUtil.equals(carTake0.getHphm(), carTake3.getHphm())) {
								carTakeDatas.add(carTake0);
								break;
							}
						}
					}
				}
				//三个卡口集合的情况，卡口三比对，好复杂
				List<CarTake> threeCarTakes = new ArrayList<CarTake>();
				for (CarTake carTake3 : page3.getResult()) {
					for (CarTake carTake1 : page1.getResult()) {
						if (StringUtil.equals(carTake3.getHphm(), carTake1.getHphm())) {
							threeCarTakes.add(carTake3);
							break;
						}
					}
				}
				if (threeCarTakes != null && threeCarTakes.size() > 0) {
					for (CarTake carTake0 : threeCarTakes) {
						for (CarTake carTake2 : page2.getResult()) {
							if (StringUtil.equals(carTake0.getHphm(), carTake2.getHphm())) {
								carTakeDatas.add(carTake0);
								break;
							}
						}
					}
				}
			}
		}
		//先把相同车牌号码的数据放到同一个list里面
		Map<String, List<CarTake>> filteMap = new HashMap<String, List<CarTake>>();
		if (carTakeDatas != null && carTakeDatas.size() > 0) {
			for (int i = 0; i < carTakeDatas.size(); i++) {
				if(filteMap.containsKey(carTakeDatas.get(i).getHphm())==false){
					filteMap.put(carTakeDatas.get(i).getHphm(), new ArrayList<CarTake>());
				}
				filteMap.get(carTakeDatas.get(i).getHphm()).add(carTakeDatas.get(i));
			}
		}
		
		List<Map<String, String>> resultDatas = new ArrayList<Map<String,String>>();
		Map<String, String> resultMap = null;
		Iterator it = filteMap.keySet().iterator();
		String keys = null;
		List<CarTake> values = null;
		
		/*String kkbh1 = "12345";
		String kkbh2 = "23456";
		String kkbh3 = "34567";*/
		while(it.hasNext()){
			keys = (String) it.next();
			values = filteMap.get(keys);
			if (values != null && values.size() > 0) {
				resultMap = new HashMap<String, String>();
				for (int m = 0; m < values.size(); m++) {
					if (StringUtil.checkStr(kkbh3)) {
						if (resultMap.containsKey("kkmc1") && resultMap.containsKey("kkmc2") && resultMap.containsKey("kkmc3")) {
							resultDatas.add(resultMap);
							resultMap = new HashMap<String, String>();
						}
					} else {
						if (resultMap.containsKey("kkmc1") && resultMap.containsKey("kkmc2")) {
							resultDatas.add(resultMap);
							resultMap = new HashMap<String, String>();
						}
					}
					if (StringUtil.equals(values.get(m).getKkbh(), kkbh1)) {
						if (resultMap.containsKey("kkmc1") == false) {
							resultMap.put("carNum", values.get(m).getHphm());
							resultMap.put("kkmc1", values.get(m).getKkmc());
							resultMap.put("kkmcTime1", DateUtil.parseToString(values.get(m).getJgsj(), "yyyy-MM-dd HH:mm:ss"));
						}
					}
					if (StringUtil.equals(values.get(m).getKkbh(), kkbh2)) {
						if (resultMap.containsKey("kkmc2") == false) {
							resultMap.put("carNum", values.get(m).getHphm());
							resultMap.put("kkmc2", values.get(m).getKkmc());
							resultMap.put("kkmcTime2", DateUtil.parseToString(values.get(m).getJgsj(), "yyyy-MM-dd HH:mm:ss"));
						}
					}
					if (StringUtil.equals(values.get(m).getKkbh(), kkbh3)) {
						if (resultMap.containsKey("kkmc3") == false) {
							resultMap.put("carNum", values.get(m).getHphm());
							resultMap.put("kkmc3", values.get(m).getKkmc());
							resultMap.put("kkmcTime3", DateUtil.parseToString(values.get(m).getJgsj(), "yyyy-MM-dd HH:mm:ss"));
						}
					}
				}
				resultDatas.add(resultMap);
			}
		}
		return ResponseUtils.sendList(resultDatas, 0);         
	}
	
	/**
	 * 区域碰撞查询-根据新界面重新改造
	 * 针对不断追加卡口的情况下，上面的方法会越来越复复杂，越来越难以控制
	 * 因此出现了此方法，暂时使用此房发去分析碰撞
	 * @param param 查询参数
	 * @return 返回结果
	 * @throws ParseException 
	 */
	@RequestMapping("/regionCrashQuery")
	@ResponseBody
	public Object regionCrashQuery(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String jsonParam = JSON.toJSONString(searchParam);//查询条件
		List<Map<String, String>> results = regionCrashService.regionCrashQuery(jsonParam);
		return ResponseUtils.sendList(results, 0);    
	}
	
	/**
	 * 区域碰撞查询-根据新界面重新改造
	 * 针对不断追加卡口的情况下，上面的方法会越来越复复杂，越来越难以控制
	 * 因此出现了此方法，暂时使用此房发去分析碰撞
	 * @param param 查询参数
	 * @return 返回结果
	 * @throws ParseException 
	 */
	@RequestMapping("/regionQueryNewTwo")
	@ResponseBody
	public Object regionQueryNewTwoInfo(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String[] kkbhs = searchParam.get("kkbhs").split(",");
		for (int m = 0; m < kkbhs.length; m++) {
			kkbhs[m] = "440" + kkbhs[m];
		}
		String[] startTimes = searchParam.get("startTimes").split(",");
		String[] endTimes = searchParam.get("endTimes").split(",");
		List<String> kkbhsTemp = null;
		PageEntity pageTemp = null;
		String startTimeTemp = null;
		Date startDateTemp = null;
		String endTimeTemp = null;
		Date endDateTemp = null;
		List<CarTake> carTakeDatas = new ArrayList<CarTake>();
		List<CarTake> results = null;
		for (int i = 0; i < kkbhs.length; i++) {
			pageTemp = new PageEntity();
			pageTemp.setPageNo(1);
			pageTemp.setPageSize(5000);
			kkbhsTemp = new ArrayList<String>();
			kkbhsTemp.add(kkbhs[i]);
			startTimeTemp = startTimes[i].replace("T", " ");
			startDateTemp = formatter.parse(startTimeTemp);
			endTimeTemp = endTimes[i].replace("T", " ");
			endDateTemp = formatter.parse(endTimeTemp);
			//pageTemp = takeService.getMountSnapshotand(kkbhsTemp, startDateTemp, endDateTemp, pageTemp);
			Map paramMap = new HashMap<String, String>();
			paramMap.put("startTime", DateUtil.parseToString(startDateTemp, "yyyy-MM-dd HH:mm:ss"));
			paramMap.put("endTime", DateUtil.parseToString(endDateTemp, "yyyy-MM-dd HH:mm:ss"));
			paramMap.put("kkbh", kkbhs[i]);
			paramMap.put("limit", "5000");
			List<CarTake> allCarTakes = followCarLocalService.searchFollowInfo(paramMap);
			//去空车牌
			results = this.removeNullCarNum(allCarTakes);
			//数据去重
			this.dataDeduplication(results);
			carTakeDatas.addAll(results);
		}
		//因数据去重后，方便操作
		Map<String, List<CarTake>> filteMap = new HashMap<String, List<CarTake>>();
		if (carTakeDatas != null && carTakeDatas.size() > 0) {
			for (int i = 0; i < carTakeDatas.size(); i++) {
				if(filteMap.containsKey(carTakeDatas.get(i).getHphm())==false){
					filteMap.put(carTakeDatas.get(i).getHphm(), new ArrayList<CarTake>());
				}
				filteMap.get(carTakeDatas.get(i).getHphm()).add(carTakeDatas.get(i));
			}
		}
		Iterator it = filteMap.keySet().iterator();
		String keys = null;
		List<CarTake> values = null;
		Map<String, String> resultMap = null;
		List<Map<String, String>> resultDatas = new ArrayList<Map<String,String>>();
		while(it.hasNext()){
			keys = (String) it.next();
			values = filteMap.get(keys);
			if (values != null && values.size() == kkbhs.length) {
				resultMap = new HashMap<String, String>();
				for (int m = 0; m < values.size(); m++) {
					if (StringUtil.equals(values.get(m).getKkbh(), kkbhs[m])) {
						if (resultMap.containsKey("kkmc" + (m + 1)) == false) {
							resultMap.put("carNum", values.get(m).getHphm());
							resultMap.put("kkmc" + (m + 1), values.get(m).getKkmc());
							resultMap.put("kkmcTime" + (m + 1), DateUtil.parseToString(values.get(m).getJgsj(), "yyyy-MM-dd HH:mm:ss"));
						}
					}
				}
				resultDatas.add(resultMap);
			}
		}
		List<Map<String, String>> subList = new ArrayList<Map<String,String>>();
		if (resultDatas != null && resultDatas.size() > 0) {
			//避免无效碰撞查询，直接查询出大量的数据而导致下面查询方法慢，而限制取前面100条数据
			int subInt = 100;
			if (resultDatas.size() < subInt) {
				subInt = resultDatas.size();
			}
			for (int i = 0; i < subInt; i++) {
				if (resultDatas.get(i) != null) {
					subList.add(resultDatas.get(i));
				}
			}
			resultDatas.removeAll(subList);
			StringBuffer carNumStr = new StringBuffer();
			for (int i = 0; i < subList.size(); i++) {
				if (StringUtil.checkObj(carNumStr)) {
					carNumStr = carNumStr.append(",");
				}
				carNumStr.append(subList.get(i).get("carNum"));
			}
			Map paramMap = new HashMap<String, String>();
			paramMap.put("hphm", carNumStr.toString());
			//针对前面分离的最多100条数据，如果存在100条数据，则要一个一个车牌查询100次，才能查询出每个车牌的一条数据，
			//有点繁琐，因此，这里直接查询出里面100个车牌的所有数据，因为碰撞是发生在1个小时以内，以500条数据为基准，平均一个小时一个车牌查询5条数据，其实是满足条件的
			paramMap.put("limit", "500");
			List<CarTake> subCarTakes = followCarLocalService.searchFollowInfo(paramMap);
			for (Map<String, String> dataMap : subList) {
				for (CarTake take : subCarTakes) {
					if (StringUtil.equals(dataMap.get("carNum"), take.getHphm())) {
						dataMap.put("lastJgsj", DateUtil.parseToString(take.getJgsj(), "yyyy-MM-dd HH:mm:ss"));
						dataMap.put("lastKkmc", take.getKkmc());
						break;
					}
				}
			}
			subList.addAll(resultDatas);
		}
		return ResponseUtils.sendList(subList, 0);    
	}
	
	/**
	 * 去掉空车牌
	 * @param results
	 */
	public List<CarTake> removeNullCarNum(List<CarTake> carTakes) {
		List<CarTake> results = carTakes;
		if (results != null && results.size() > 0) {
			//去掉空车牌
	    	List<CarTake> nullCarNums = new ArrayList<CarTake>();
	    	for (int i = 0; i < results.size(); i++) { 
	    		if (!StringUtil.checkStr(results.get(i).getHphm()) ||
	    				StringUtil.equals(results.get(i).getHphm(), "-") ||
	    				StringUtil.equals(results.get(i).getHphm(), "—") ||
	    				StringUtil.equals(results.get(i).getHphm(), "无牌") ||
	    				StringUtil.equals(results.get(i).getHphm(), "车牌") ||
	    				StringUtil.equals(results.get(i).getHphm(), "无车牌") ||
	    				StringUtil.equals(results.get(i).getHphm(), "null")) {
	    			nullCarNums.add(results.get(i));
	    		}
	    	}
	    	results.removeAll(nullCarNums);
		}
		return results;
	}
	
	/**
	 * 数据去重
	 * @param results
	 */
	public void dataDeduplication(List<CarTake> results) {
		if (results != null && results.size() > 0) {
			String temp = "";
            for (int i = 0; i < results.size(); i++) { 
                temp = results.get(i).getHphm(); 
                for (int j = results.size() - 1 ; j > i; j-- )  
                {  
                    if (StringUtil.equals(temp, results.get(j).getHphm())) {
                    	results.remove(j);   
                    }
                }
            }
        }
	}
}
