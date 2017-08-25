package com.jp.tic.analyze.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.analyze.entity.PageEntity;
import com.jp.tic.analyze.service.FollowCarLocalService;
import com.jp.tic.analyze.service.RegionCrashService;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;

/** 
 * RegionCrashServiceImpl.java Create on 2016-10-12 上午11:02:41      
 * Copyright (c) 2016-10-12 by jinpeng         
 * @author lsg     
 * @version 1.0 
 */
@Service
public class RegionCrashServiceImpl implements RegionCrashService {
	
	@Autowired
	private FollowCarLocalService followCarLocalService;
	
	public final SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@SuppressWarnings("unchecked")
	public List<Map<String, String>> regionCrashQuery(String jsonParam) throws Exception {
		Map<String, String> searchParam = JsonUtil.jsonToMap(jsonParam);
		String[] kkbhs = searchParam.get("kkbhs").split(",");
		for (int m = 0; m < kkbhs.length; m++) {
			//kkbhs[m] = "440" + kkbhs[m];
			System.out.println("************************************************8kkbhs[m]===="+kkbhs[m]);
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
		return subList; 
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
