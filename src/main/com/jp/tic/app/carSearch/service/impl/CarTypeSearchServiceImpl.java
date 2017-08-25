package com.jp.tic.app.carSearch.service.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.analyze.service.CarTakeService;
import com.jp.tic.app.carSearch.service.CarTypeSearchService;
import com.jp.tic.business.datacenter.dao.FakeCarNumDao;
import com.jp.tic.business.device.dao.BayonetManagerDao;
import com.jp.tic.business.device.service.DeviceManagerService;
import com.jp.tic.system.entity.CarCategory;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.entity.EnumItem;
import com.jp.tic.system.entity.IllegalType;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.system.service.OrganizationService;
import com.jp.tic.system.service.SystemConfigService;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.StringUtil;

@Service
public class CarTypeSearchServiceImpl implements CarTypeSearchService {
	
	@Autowired
	private DictionaryService dictionaryService;
	@Autowired
	private CarTakeService takeService;
	@Autowired
    private OrganizationService orgService;
	@Autowired
	private DeviceManagerService deviceManagerService;
	@Autowired
	private SystemConfigService systemConfigService;
	@Autowired
	private BayonetManagerDao bayonetManagerDao;
	
	@Autowired
	private FakeCarNumDao fakeCarNumDao;

	public List<CarTake> Results = new ArrayList<CarTake>();
	
	/**
	 * 处理按品牌特征查询出的数据
	 * @param jsonParam 查询条件
	 * @return 查询结果
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> dealWithCarTypeData(String jsonParam) {
		Map<String, String> param = JsonUtil.jsonToMap(jsonParam);
		Map<String, Object> resultMap = takeService.testSearchInfo(param);
		List<CarTake> datas = (List<CarTake>) resultMap.get("rows");
		List<CarTake> results = this.trancateDataNames(datas, param);
		resultMap.put("rows", results);
		return resultMap;
	}
	
	/**
	 * 翻译查询结果数据
	 * @param results 结果集
	 * @param param 参数
	 * @return 翻译结果
	 */
	@SuppressWarnings("unchecked")
	public List<CarTake> trancateDataNames(List<CarTake> results, Map<String, String> param) {
		List<Map<String, String>> directionDatas = orgService.findAllDirectionInfo();
		List<Map<String, String>> deviceDatas = deviceManagerService.findAllDeviceInfo();
		List<Map<String, String>> mountDatas = bayonetManagerDao.loadAllMountInfos();
		List<EnumItem> carNumColorlist = dictionaryService.getEnumListByCode("LicPlateColor"); //车牌颜色
		List<EnumItem> carNumTypelist = dictionaryService.getEnumListByCode("LicPlateType"); //号牌种类
		List<CarCategory> carCategoryList = dictionaryService.findCarCategory();//车辆种类
		List<IllegalType> illegalTypeList = dictionaryService.findIllegalType();//车辆种类
		if (results != null && results.size() > 0) {
			String hpysmc = "";
			String hpzlmc = "";
			String clzlmc="";
			String illegalTypeName="";
			List<CarTake> filteCarTakes = new ArrayList<CarTake>();
			for(CarTake take : results){
				if (take == null) {
					filteCarTakes.add(take);
				} else {
					illegalTypeName=fitTllegalTypeName(take.getXszt(),illegalTypeList);
					clzlmc=fitCategoryName(take.getClzl(),carCategoryList);
					hpysmc = findDictionaryName(carNumColorlist, take.getHpys());
					hpzlmc = findDictionaryName(carNumTypelist, take.getHpzl());
					take.setXszt(illegalTypeName);
					take.setHpysmc(hpysmc);
					take.setHpzlmc(hpzlmc);
					take.setClzl(clzlmc);
					if (!StringUtil.checkStr(take.getClzl()) && StringUtil.checkStr(take.getCllx())) {
						take.setClzl(take.getCllx());
					}
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
		return results;
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
	
    /**
     * 实时过车查询
     * @throws Exception 
     */
	@Override
	public List<CarTake> realCarQuery(String json) throws Exception {
		Map<String, String> searchParam=JsonUtil.jsonToMap(json);
		String[] mounts = StringUtils.split(searchParam.get("mounts"), ",");
		//读取oracle字典查询
		List<Map<String, String>> limits = systemConfigService.findConfigByCode("statuNumber");
		int statuNumber = 0;
		if (limits != null && limits.size() > 0) {
			statuNumber = StringUtil.toInt(limits.get(0).get("VALUE"));
		} else {
			statuNumber = 50;
		}
		if(null!=mounts){
			List<List<String>> list=new ArrayList<List<String>>();
			List<String> subList=new ArrayList<String>();
			for(int i=0;i<mounts.length;i++){
				subList.add(mounts[i]);
				if(i!=0&&i%statuNumber==0){
					List<String> list_=new ArrayList<String>();
					list_.addAll(subList);
					list.add(list_);
					subList.clear();
				}
			}
			if(subList.size()!=0){
				list.add(subList);
			}
			int threadNum=list.size();
			if(threadNum>0){
				if (Results != null && Results.size() > 0) {
					Results = new ArrayList<CarTake>();
				}
				CountDownLatch statuLatch = new CountDownLatch(threadNum);//threadNumber个线程并发执行
				StatusWorker statusWorker = null;
				for(int i = 0; i < threadNum; i++){
					statusWorker = new StatusWorker(list.get(i), statuLatch);
					statusWorker.run();
				}
				statuLatch.await();//等待所有线程完成工作  
			}
			List<Map<String, String>> mountDatas = bayonetManagerDao.loadAllMountInfos();
			List<EnumItem> carNumColorlist = dictionaryService.getEnumListByCode("LicPlateColor"); //车牌颜色
			
			for(CarTake take : Results){
				if (take!=null){
					if (mountDatas != null && mountDatas.size() > 0) {
						for (Map<String, String> dataMap : mountDatas) {
							if (StringUtil.equals(take.getKkbh(), dataMap.get("KKBH"))) {
								take.setKkmc(dataMap.get("KKMC"));
								take.setDwmc(dataMap.get("DWMC"));
								break;
							}
						}
					}
					take.setHpzlmc(findDictionaryName(carNumColorlist, take.getHpys()));
				}
			}
		}else{
			return new ArrayList<CarTake>();
		}
		return Results;
	}

	 class StatusWorker implements Runnable {
		List<String> statuMounts;
	    CountDownLatch downlatch;  
	    
	    public StatusWorker(List<String> allMounts ,CountDownLatch latch){  
	    	this.statuMounts = allMounts;
	        this.downlatch = latch;  
	    }  
	    
		@Override
		public void run() {
			statuDoWork();//工作
		}
	
		private void statuDoWork(){  
			List<CarTake> statuResult = null;
	        try {  
	        	statuResult = takeService.dealWithRealCarData(statuMounts, null, null);
	        	synchronized (Results) {
	        		Results.addAll(statuResult);
				}
	        } catch (Exception e) {  
	            e.printStackTrace();  
	        } finally{
	        	downlatch.countDown();//完成工作，计数器减一  
	        }
	    }  
	}

	/**
	 * 临近点分析
	 */
	public List<CarTake> analyzeClosetPointquery(String json) {
		List<Map<String, String>> mountDatas = bayonetManagerDao.loadAllMountInfos();
		List<EnumItem> carNumColorlist = dictionaryService.getEnumListByCode("LicPlateColor"); //车牌颜色
		List<CarCategory> carCategoryList = dictionaryService.findCarCategory();//车辆种类
		List<CarTake> list=takeService.analyzeClosetPointquery(json);
		for(CarTake take : list){
			if (take!=null){
				String hpysmc = findDictionaryName(carNumColorlist, take.getHpys());
				String clzlmc=fitCategoryName(take.getClzl(),carCategoryList);
				take.setHpysmc(hpysmc);
				take.setClzl(clzlmc);
				if (mountDatas != null && mountDatas.size() > 0) {
					for (Map<String, String> dataMap : mountDatas) {
						if (StringUtil.equals(take.getKkbh(), dataMap.get("KKBH"))) {
							take.setKkmc(dataMap.get("KKMC"));
							take.setDwmc(dataMap.get("DWMC"));
							break;
						}
					}
				}
			}
		}
		return list;
	}
	
	/**
	 * 查询过车数据，没有翻译
	 * @param jsonParam 查询条件
	 * @return 查询结果
	 */
	@SuppressWarnings("unchecked")
	public List<CarTake> queryRealTimeData(String jsonParam) {
		Map<String, String> param = JsonUtil.jsonToMap(jsonParam);
		Map<String, Object> resultMap = takeService.testSearchInfo(param);
		List<CarTake> datas = (List<CarTake>) resultMap.get("rows");
		return datas;
	}
	
	/**
	 * 车辆类型页面名称与数据库值转换
	 * @param clzl
	 * @param carCategoryList
	 * @return
	 */
	private String fitTllegalTypeName(String xszt,List<IllegalType> illegalTypeList) {
		if(!StringUtil.checkStr(xszt)){
			return "";
		}
		if(null!=illegalTypeList&&illegalTypeList.size()>0){
			for(IllegalType illegalType:illegalTypeList){
				if(xszt.equals(illegalType.getStoreValue())){
					return illegalType.getDisplayValue();
				}
			}
		}
		return "";
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
	 * 查询所有的套牌车数据
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryAllTaopaiInfo() {
		return fakeCarNumDao.queryAllTaopaiInfo();
	}
}