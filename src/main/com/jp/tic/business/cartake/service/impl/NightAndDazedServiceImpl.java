package com.jp.tic.business.cartake.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.cartake.dao.NightAndDazedDao;
import com.jp.tic.business.cartake.service.NightAndDazedService;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.StringUtil;

@Service
public class NightAndDazedServiceImpl implements NightAndDazedService {

	@Autowired
	private NightAndDazedDao nightAndDazedDao;
	
	/**
	 * 统计分析昼伏夜出数据
	 * @param jsonParam 参数
	 * @return 查询结果
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> queryNightAndDazedData(String jsonParam) {
		Map<String, String> param = JsonUtil.jsonToMap(jsonParam);
		List<Map<String, String>> dazedDatas = nightAndDazedDao.queryDazedData(param);
		List<String> hphmList = new ArrayList<String>();
		List<Map<String, String>> results = new ArrayList<Map<String,String>>();
        if (dazedDatas != null && dazedDatas.size() > 0) {
        	for (Map<String, String> dataMap : dazedDatas) {
        		hphmList.add(dataMap.get("carNum"));
        	}
        	List<Map<String, String>> nightDatas = nightAndDazedDao.queryNightData(hphmList, param);
        	if (nightDatas != null && nightDatas.size() > 0) {
        		Map<String, String> resultMap = null;
        		for (Map<String, String> dazedMap : dazedDatas) {
        			for (Map<String, String> nightMap : nightDatas) {
        				if (StringUtil.equals(dazedMap.get("carNum"), nightMap.get("carNum"))) {
        					resultMap = new HashMap<String, String>();
        					resultMap.put("hphm", dazedMap.get("carNum"));
        					resultMap.put("dazedCounts", dazedMap.get("passTimes"));
        					resultMap.put("nightCounts", nightMap.get("passTimes"));
        					resultMap.put("controlFlag", "0");
        					resultMap.put("alarmTimes", "");
        					results.add(resultMap);
        				}
        			}
        		}
        	}
        }
        List<String> carNumList = new ArrayList<String>();
        if (results !=null && results.size() > 0) {
        	for (Map<String, String> dataMap : results) {
        		carNumList.add(dataMap.get("hphm"));
        	}
        	List<Map<String, String>> controlDatas = nightAndDazedDao.queryControlDatas(carNumList);
            List<Map<String, String>> alarmDatas = nightAndDazedDao.countsControlAlarmDatas(carNumList);
            if (controlDatas != null && controlDatas.size() > 0) {
            	for (Map<String, String> map : results) {
                	for (Map<String, String> controlMap : controlDatas) {
                		if (StringUtil.equals(map.get("hphm"), controlMap.get("HPHM"))) {
                			map.put("controlFlag", "1");
                		}
                	}
                	for (Map<String, String> alarmMap : alarmDatas) {
                		if (StringUtil.equals(map.get("hphm"), alarmMap.get("HPHM"))) {
                			map.put("alarmTimes", alarmMap.get("COUNTS"));
                		}
                	}
            	}
            }
        }
        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("rows", results);
		return resultMap;
	}
}
