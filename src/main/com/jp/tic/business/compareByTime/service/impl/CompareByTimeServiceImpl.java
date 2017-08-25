package com.jp.tic.business.compareByTime.service.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.compareByTime.dao.CompareByTimeDao;
import com.jp.tic.business.compareByTime.service.CompareByTimeService;
import com.jp.tic.business.device.service.BayonetManagerService;
import com.jp.tic.business.device.service.DeviceManagerService;
import com.jp.tic.system.entity.CarCategory;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.entity.EnumItem;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.system.service.OrganizationService;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.StringUtil;

@Service
public class CompareByTimeServiceImpl implements CompareByTimeService {

	@Autowired
	private CompareByTimeDao compareByTimeDao;
	@Autowired
	private DictionaryService dictionaryService;
	@Autowired
    private OrganizationService orgService;
	@Autowired
	private DeviceManagerService deviceManagerService;
	@Autowired
	private BayonetManagerService bayonetManagerService;
	
	/**
	 * 时间比对
	 */
	public Map<String, Object> compareByTimeQueryForpages(String json) {
		Map<String, String> param = JsonUtil.jsonToMap(json);
		Map<String, Object> resultMap=compareByTimeDao.compareByTimeQueryForpages(json);
		List<CarTake> results=(List<CarTake>) resultMap.get("rows");
		if (results == null) {
			results = new ArrayList<CarTake>();
		}else{
			//相关车辆属性转换
			List<Map<String, String>> directionDatas = orgService.findAllDirectionInfo();
			List<Map<String, String>> deviceDatas = deviceManagerService.findAllDeviceInfo();
			List<Map<String, String>> mountDatas = bayonetManagerService.loadAllMountInfos();
			List<EnumItem> carNumColorlist = dictionaryService.getEnumListByCode("LicPlateColor"); //车牌颜色
			List<EnumItem> carNumTypelist = dictionaryService.getEnumListByCode("LicPlateType"); //号牌种类
			List<CarCategory> carCategoryList = dictionaryService.findCarCategory();//车辆种类
			if (results != null && results.size() > 0) {
				String hpysmc = "";
				String hpzlmc = "";
				String clzlmc="";
				List<CarTake> filteCarTakes = new ArrayList<CarTake>();
				for(CarTake take : results){
					if (take == null) {
						filteCarTakes.add(take);
					} else {
						clzlmc=fitCategoryName(take.getClzl(),carCategoryList);
						hpysmc = findDictionaryName(carNumColorlist, take.getHpys());
						hpzlmc = findDictionaryName(carNumTypelist, take.getHpzl());
						take.setClzl(clzlmc);
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
			if (StringUtil.equals(groupFlag, "carNum") || StringUtil.equals(groupFlag, "carType") || StringUtil.equals(groupFlag, "mounts")|| StringUtil.equals(groupFlag, "brands")) {
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
					if (StringUtil.equals(groupFlag, "brands")) {
						Map<String, List<CarTake>> brandMap = new LinkedHashMap<String, List<CarTake>>();
						for (CarTake carTake : results) {
							if (carTake != null) {
								if(!brandMap.containsKey(carTake.getBrand())){
									brandMap.put(carTake.getBrand(), new ArrayList<CarTake>()); //主键为车辆品牌
								}
								brandMap.get(carTake.getBrand()).add(carTake);
							}
						}
						Iterator it = brandMap.keySet().iterator();
						List<CarTake> values = null;
						String key = null;
						while(it.hasNext()){
							key = (String) it.next();
							values = brandMap.get(key);
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
		}
		return resultMap;
	}
	
	/**
	 * 车辆类型页面名称与数据库值转换
	 * @param clzl
	 * @param carCategoryList
	 * @return
	 */
	private String fitCategoryName(String clzl,List<CarCategory> carCategoryList) {
		if(!StringUtil.checkStr(clzl)){
			return "";
		}
		if(null!=carCategoryList&&carCategoryList.size()>0){
			for(CarCategory cargory:carCategoryList){
				if(clzl.equals(cargory.getStoreValue())){
					return cargory.getDisplayValue();
				}
			}
		}
		return "";
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
