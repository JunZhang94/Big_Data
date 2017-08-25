package com.jp.tic.business.cartake.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.cartake.dao.CarFrequencyDao;
import com.jp.tic.business.cartake.service.CarFrequencyService;
import com.jp.tic.business.device.dao.BayonetManagerDao;
import com.jp.tic.utils.lang.StringUtil;

@Service
public class CarFrequencyServiceImpl implements CarFrequencyService {

	@Autowired
	private CarFrequencyDao carFrequencyDao;
	
	@Autowired
	private BayonetManagerDao bayonetManagerDao;
	
	/**
	 * 过车频度查询-分析solr数据
	 * @param param 查询条件
	 * @return 查询结果
	 * @throws Exception 异常
	 */
	public List<Map<String, Object>> carFrequencyStatisticsInfo(Map<String, String> param) throws Exception {
		List<Map<String, String>> results = carFrequencyDao.carFrequencyStatisticsInfo(param);
		List<Map<String, Object>> resultObj = new ArrayList<Map<String,Object>>();
		Map<String, Object> objMap = null;
		if (results != null && results.size() > 0) {
			List<Map<String, String>> mountDatas = bayonetManagerDao.loadAllMountInfos();
			for (Map<String, String> dataMap : results) {
				objMap = new HashMap<String, Object>();
				if (mountDatas != null && mountDatas.size() > 0) {
					for (Map<String, String> mountMap : mountDatas) {
						if (StringUtil.equals(dataMap.get("kkbh"), mountMap.get("KKBH"))) {
							objMap.put("carNum", dataMap.get("carNum"));
							objMap.put("kkbh", dataMap.get("kkbh"));
							objMap.put("kkmc", mountMap.get("KKMC"));
							objMap.put("passTimes", StringUtil.toInt(dataMap.get("passTimes")));
							resultObj.add(objMap);
							//dataMap.put("kkmc", mountMap.get("KKMC"));
							break;
						}
					}
				}
			}
		}
		return resultObj;
		/*Map<String, Object> results = carFrequencyDao.carFrequencyStatisticsInfo(param);
		List<Map<String, String>> datas = new ArrayList<Map<String,String>>();
		Map<String, String> dataMap = null;
		if(null != results){
            Set<String> keys = results.keySet();
            for(String key : keys){
            	dataMap = new HashMap<String, String>();
            	dataMap.put("carNum", key);
            	dataMap.put("passTimes", results.get(key).toString());
            	datas.add(dataMap);
            }
		}
		return datas;*/
	}
}
