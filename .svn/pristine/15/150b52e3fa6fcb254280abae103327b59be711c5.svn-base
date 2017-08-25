package com.jp.tic.analyze.service.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.analyze.dao.SimilarityCarAnalyzeDao;
import com.jp.tic.analyze.service.CarTakeService;
import com.jp.tic.analyze.service.SimilarityCarAnalyzeService;
import com.jp.tic.business.device.dao.BayonetManagerDao;
import com.jp.tic.business.device.service.DeviceManagerService;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.entity.EnumItem;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.system.service.OrganizationService;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.StringUtil;

@Service
public class SimilarityCarAnalyzeServiceImpl implements
		SimilarityCarAnalyzeService {

	@Autowired
	private DictionaryService dictionaryService;
	@Autowired
	private CarTakeService takeService;
	@Autowired
    private OrganizationService orgService;
	@Autowired
	private DeviceManagerService deviceManagerService;
	@Autowired
	private BayonetManagerDao bayonetManagerDao;
	@Autowired
	private SimilarityCarAnalyzeDao similarityCarAnalyzeDao;
	
	/**
	 * 相似车辆串并
	 * @param jsonParam 查询条件
	 * @return 查询结果
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> dealWithSimilarityCarData(String jsonParam) {
		Map<String, String> param = JsonUtil.jsonToMap(jsonParam);
		Map<String, Object> resultMap = similarityCarAnalyzeDao.dealWithSimilarityCarData(param);
		List<CarTake> results = (List<CarTake>) resultMap.get("rows");
		List<Map<String, String>> directionDatas = orgService.findAllDirectionInfo();
		List<Map<String, String>> deviceDatas = deviceManagerService.findAllDeviceInfo();
		List<Map<String, String>> mountDatas = bayonetManagerDao.loadAllMountInfos();
		List<EnumItem> carNumColorlist = dictionaryService.getEnumListByCode("LicPlateColor"); //车牌颜色
		List<EnumItem> carNumTypelist = dictionaryService.getEnumListByCode("LicPlateType"); //号牌种类
		if (results != null && results.size() > 0) {
			String hpysmc = "";
			String hpzlmc = "";
			List<CarTake> filteCarTakes = new ArrayList<CarTake>();
			for(CarTake take : results){
				if (take == null) {
					filteCarTakes.add(take);
				} else {
					hpysmc = findDictionaryName(carNumColorlist, take.getHpys());
					hpzlmc = findDictionaryName(carNumTypelist, take.getHpzl());
					take.setHpysmc(hpysmc);
					take.setHpzlmc(hpzlmc);
					if (mountDatas != null && mountDatas.size() > 0) {
						for (Map<String, String> dataMap : mountDatas) {
							if (StringUtil.equals(take.getKkbh(), dataMap.get("KKBH"))) {
								take.setKkmc(dataMap.get("KKMC"));
								take.setDwmc(dataMap.get("DWMC"));
								break;
							}
						}
					}
					if (directionDatas != null && directionDatas.size() > 0) {
						for (Map<String, String> dataMap : directionDatas) {
							if (StringUtil.equals(take.getFxbh(), dataMap.get("DIRECTION_NUMBER"))) {
								take.setFxmc(dataMap.get("DIRECTION_NAME"));
								break;
							}
						}
					}
					if (deviceDatas != null && deviceDatas.size() > 0) {
						for (Map<String, String> dataMap : deviceDatas) {
							if (StringUtil.equals(take.getSbbh(), dataMap.get("SBBH"))) {
								take.setSbmc(dataMap.get("SBMC"));
								break;
							}
						}
					}
				}
			}
			if (filteCarTakes != null && filteCarTakes.size() > 0) {
				results.removeAll(filteCarTakes);	
			}
		}
		//针对分组数据处理
		String groupFlag = param.get("groupFlag");
		if (StringUtil.equals(groupFlag, "carNum") || StringUtil.equals(groupFlag, "carType") || StringUtil.equals(groupFlag, "mounts")) {
			if (results != null && results.size() > 1) {
				/*if (StringUtil.equals(results.get(0).getHphm(), results.get(2).getHphm())) {
					results.get(0).setSsdq("equals");//用所属地区来存第一条记录和第二条记录的车牌号码是否相同的标志
				} else {
					results.get(0).setSsdq("notequals");
				}*/
				//可以把空车牌过滤掉，显示在最后面
				List<CarTake> nullDatas = new ArrayList<CarTake>();
				for (CarTake carTake : results) {
					if (StringUtil.equals(carTake.getHphm(), "-") ||
	        				StringUtil.equals(carTake.getHphm(), "—") ||
	        				StringUtil.equals(carTake.getHphm(), "无牌") ||
	        				StringUtil.equals(carTake.getHphm(), "车牌") ||
	        				StringUtil.equals(carTake.getHphm(), "无车牌") ||
	        				StringUtil.equals(carTake.getHphm(), "null")) {
						nullDatas.add(carTake);
					}
				}
				results.removeAll(nullDatas);
				if (nullDatas != null && nullDatas.size() > 0) {
					nullDatas.get(0).setSsdq("equals");
				}
				List<CarTake> dealResults = new ArrayList<CarTake>();
				if (StringUtil.equals(groupFlag, "carNum")) {
					Map<String, List<CarTake>> hphmMap = new LinkedHashMap<String, List<CarTake>>();
					for (CarTake carTake : results) {
						if (carTake != null) {
							if(!hphmMap.containsKey(carTake.getHphm())){
								hphmMap.put(carTake.getHphm(), new ArrayList<CarTake>()); //主键为车牌号码
							}
							hphmMap.get(carTake.getHphm()).add(carTake);
						}
					}
					Iterator it = hphmMap.keySet().iterator();
					List<CarTake> values = null;
					String key = null;
					while(it.hasNext()){
						key = (String) it.next();
						values = hphmMap.get(key);
						if (values != null && values.size() > 1) {
							for (int i = 0; i < values.size() - 1; i++) {
								values.get(i).setSsdq("equals");
							}
						}
						dealResults.addAll(values);
					}
				}
				if (StringUtil.equals(groupFlag, "mounts")) {
					Map<String, List<CarTake>> mountMap = new LinkedHashMap<String, List<CarTake>>();
					for (CarTake carTake : results) {
						if (carTake != null) {
							if(!mountMap.containsKey(carTake.getKkbh())){
								mountMap.put(carTake.getKkbh(), new ArrayList<CarTake>()); //主键为车牌号码
							}
							mountMap.get(carTake.getKkbh()).add(carTake);
						}
					}
					Iterator it = mountMap.keySet().iterator();
					List<CarTake> values = null;
					String key = null;
					while(it.hasNext()){
						key = (String) it.next();
						values = mountMap.get(key);
						if (values != null && values.size() > 1) {
							for (int i = 0; i < values.size() - 1; i++) {
								values.get(i).setSsdq("equals");
							}
						}
						dealResults.addAll(values);
					}
				}
				if (StringUtil.equals(groupFlag, "carType")) {
					Map<String, List<CarTake>> clzlMap = new LinkedHashMap<String, List<CarTake>>();
					for (CarTake carTake : results) {
						if (carTake != null) {
							if(!clzlMap.containsKey(carTake.getClzl())){
								clzlMap.put(carTake.getClzl(), new ArrayList<CarTake>()); //主键为车牌号码
							}
							clzlMap.get(carTake.getClzl()).add(carTake);
						}
					}
					Iterator it = clzlMap.keySet().iterator();
					List<CarTake> values = null;
					String key = null;
					while(it.hasNext()){
						key = (String) it.next();
						values = clzlMap.get(key);
						if (values != null && values.size() > 1) {
							for (int i = 0; i < values.size() - 1; i++) {
								values.get(i).setSsdq("equals");
							}
						}
						dealResults.addAll(values);
					}
				}
				results = dealResults;
			}
		}
		resultMap.put("rows", results);
		return resultMap;
	}
	
	/**
     * 获取到了对应的字典code对应的集合后，再根据值来获取对应的中文名称
     * @param list code对应的集合
     * @param value 值
     * @return 处理结果
     */
    public String findDictionaryName(List<EnumItem> list, String value) {
    	String dicName = "";
    	if (!StringUtil.checkStr(value)) {
    		return dicName;
    	}
    	if (list != null && list.size() > 0) {
			for (EnumItem en : list) {
				if (StringUtil.equals(en.getItemValue(), value)) {
					dicName = en.getItemName();
				}
			}
    	}
    	return dicName;
	}
}
