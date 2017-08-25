package com.jp.tic.business.oneNumManyCar.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.device.service.BayonetManagerService;
import com.jp.tic.business.device.service.DeviceManagerService;
import com.jp.tic.business.oneNumManyCar.dao.OneNumManyCarDao;
import com.jp.tic.business.oneNumManyCar.service.OneNumManyCarService;
import com.jp.tic.system.entity.CarCategory;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.entity.EnumItem;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.system.service.OrganizationService;
import com.jp.tic.utils.lang.StringUtil;

@Service
public class OneNumManyCarServiceImpl implements OneNumManyCarService{

	@Autowired OneNumManyCarDao oneNumManyCarDao;
	@Autowired
	private DictionaryService dictionaryService;
	@Autowired
    private OrganizationService orgService;
	@Autowired
	private DeviceManagerService deviceManagerService;
	@Autowired
	private BayonetManagerService bayonetManagerService;
	/**
	 * 一牌多车查询
	 */
	public Map<String, List<CarTake>> queryDatasForPages(String json) {
		Map<String, List<CarTake>> map=oneNumManyCarDao.queryDatasForPages(json);
		List<CarTake> results=map.get("rows");
		
		
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
			map.put("rows", results);
		}
		return map;
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
