package com.jp.tic.business.datacenter.service.impl;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.analyze.entity.PageEntity;
import com.jp.tic.analyze.service.CarTakeService;
import com.jp.tic.business.datacenter.dao.FakeCarNumDao;
import com.jp.tic.business.datacenter.service.FakeCarNumService;
import com.jp.tic.system.dao.DictionaryDao;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.service.SystemConfigService;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.opensymphony.oscache.base.NeedsRefreshException;
import com.opensymphony.oscache.general.GeneralCacheAdministrator;
import com.sun.org.apache.bcel.internal.generic.IF_ACMPEQ;

@Service
public class FakeCarNumServiceImpl implements FakeCarNumService {

	private Logger logger = LoggerFactory.getLogger(DictionaryDao.class);
	
	@Autowired
	private FakeCarNumDao fakeCarNumDao;
	
	@Autowired
	private CarTakeService takeService;
	
	@Autowired
	private SystemConfigService systemConfigService;
	
	private static GeneralCacheAdministrator generalAdmin = new GeneralCacheAdministrator();
	
	/**
	 * 假牌车分析
	 * @throws Exception 
	 */
	public void fakeCarNumStatistics() throws Exception {
		PageEntity page = new PageEntity();
		List<Map<String, String>> fakeCounts = systemConfigService.findFakeCounts();
		page.setPageNo(1);
		page.setPageSize(StringUtil.toInt(fakeCounts.get(0).get("VALUE"))); //每次分析最大量五万条数据,标准大于系统设置的时间
		Date nowDate = new Date();
		Date endDate = nowDate;
		String endDateStr = DateUtil.parseToString(endDate, "yyyy-MM-dd HH:mm:ss");
		System.out.println(endDateStr);
		List<Map<String, String>> fakeTimes = systemConfigService.findFakeTimes();
		nowDate.setMinutes(endDate.getMinutes() - StringUtil.toInt(fakeTimes.get(0).get("VALUE"))); //时间可在系统设置里设置
		Date startDate = nowDate;	
		String startDateStr = DateUtil.parseToString(startDate, "yyyy-MM-dd HH:mm:ss");
		System.out.println(startDateStr);
		List<String> directionList = new ArrayList<String>();
		List<String> platesList = new ArrayList<String>();
		platesList.add("粤A");
		String startTime1 = DateUtil.getCurrentDateTime();
		startDate = DateUtil.parseToDate(startDateStr, "yyyy-MM-dd HH:mm:ss");
		endDate = DateUtil.parseToDate(endDateStr, "yyyy-MM-dd HH:mm:ss");
		page = takeService.queryCarTake(startDate, endDate, null, platesList, directionList, "",null,null,null, page);
		List<CarTake> results = page.getResult();
		
		//源数据测试
		/*List<CarTake> results = new ArrayList<CarTake>();
		CarTake testCarTake = new CarTake();
		testCarTake.setHphm("粤A11111");
		testCarTake.setKkbh("440112816120004300");
		testCarTake.setKkmc("赤坎桥入口");
		CarTake testCarTake1 = new CarTake();
		testCarTake1.setHphm("粤A11111");
		testCarTake1.setKkbh("440112816120004305");
		testCarTake1.setKkmc("赤坎桥出口");
		CarTake testCarTake2 = new CarTake();
		testCarTake2.setHphm("粤A54321");
		testCarTake2.setKkbh("440112816120004305");
		testCarTake2.setKkmc("赤坎桥出口");
		CarTake testCarTake3 = new CarTake();
		testCarTake3.setHphm("粤A12345");
		testCarTake3.setKkbh("440112816120004305");
		testCarTake3.setKkmc("赤坎桥出口");
		results.add(testCarTake);
		results.add(testCarTake1);
		results.add(testCarTake2);
		results.add(testCarTake3);*/
		
		String endTime1 = DateUtil.getCurrentDateTime();
		int seconds1 = this.getTwoTimeDay(startTime1, endTime1);
		logger.info("第一步、查询Hbase数据完成，总条数：" + results.size() + "条，耗时：" + seconds1 + "秒");
		
		//车辆信息库数据
		Map<String, String> dbDatasMap = this.searchCarNumSource();
		
		List<CarTake> filteList = new ArrayList<CarTake>();
		String startTime3 = DateUtil.getCurrentDateTime();
		//识别出假牌，并额外保存在另外一个集合里面
		if (results != null && results.size() > 0) {
			if (dbDatasMap != null) {
				/*String key = null;
				boolean havingFlag = false;*/
				for (CarTake carTake : results) {
					//havingFlag = false;
					if (!StringUtil.equals(carTake.getHphm(), "-") && !StringUtil.equals(carTake.getHphm(), "无牌") 
							&& !StringUtil.equals(carTake.getHphm(), "车牌") && StringUtil.checkStr(carTake.getKkmc())
							&& !StringUtil.equals(carTake.getHphm(), "无车牌")) {
						if (!dbDatasMap.containsKey(carTake.getHphm())) {
							filteList.add(carTake);
						}
						/*for (Map<String, String> dataMap : dbDatas) {
							if (StringUtil.equals(carTake.getHphm(), dataMap.get("HPHM"))) {
								havingFlag = true;
								break;
							}
						}*/
						//表示如果是假牌
						/*if (!havingFlag) {
							filteList.add(carTake);
						}*/
					}
				}
			}
		}
		String endTime3 = DateUtil.getCurrentDateTime();
		int seconds3 = this.getTwoTimeDay(startTime3, endTime3);
		logger.info("第三步、源数据与车辆信息库车牌比对完成，存在假牌数量：" + filteList.size() + "条，耗时：" + seconds3 + "秒");
		
		//已存在的假拍车数据
		List<Map<String, String>> oraDatas = this.fakeCarNumDao.fakeCarNumSearch();
		List<Map<String, String>> updateDatas = new ArrayList<Map<String,String>>();//待更新的集合数据
		List<Map<String, String>> saveDatas = new ArrayList<Map<String,String>>();//待新增的集合数据
		String startTime4 = DateUtil.getCurrentDateTime();
		if (filteList != null && filteList.size() > 0) {
			Map<String, String> newDataMap = null;
			boolean dataFlag = false;
			for (CarTake carTake0 : filteList) {
				dataFlag = false;
				if (oraDatas != null && oraDatas.size() > 0) {
					for (Map<String, String> oraMap : oraDatas) {
						//计数统计
						if (StringUtil.equals(carTake0.getHphm(), oraMap.get("HPHM"))) {
							if (StringUtil.equals(carTake0.getKkbh(), oraMap.get("KKBH"))) {
								dataFlag = true; //根据车牌及对应的卡口表示存在此条记录
								oraMap.put("AMOUNTS", StringUtil.toString(StringUtil.toInt(oraMap.get("AMOUNTS")) + 1));//加1
								updateDatas.add(oraMap);
							}
						} 
					}
				}
				//假牌库中还不存在此记录
				if (!dataFlag) {
					newDataMap = new HashMap<String, String>();
					newDataMap.put("HPHM", carTake0.getHphm());
					newDataMap.put("HPZL", carTake0.getHpzl());
					newDataMap.put("CLLX", carTake0.getCllx());
					newDataMap.put("CSYS", carTake0.getCsys());
					newDataMap.put("CLPP", carTake0.getClpp());
					newDataMap.put("KKBH", carTake0.getKkbh());
					newDataMap.put("KKMC", carTake0.getKkmc());
					newDataMap.put("DWBH", carTake0.getDwbh());
					newDataMap.put("DWMC", carTake0.getDwmc());
					newDataMap.put("AMOUNTS", "1");
					saveDatas.add(newDataMap);
				}
			}
		}
		this.fakeCarNumDao.updateOrSaveRecords(updateDatas, saveDatas);
		String endTime4 = DateUtil.getCurrentDateTime();
		int seconds4 = this.getTwoTimeDay(startTime4, endTime4);
		logger.info("第四步、假牌车数据入库完成,旧数据：" + updateDatas.size() + "条，新数据：" + saveDatas.size() + "条，耗时：" + seconds4 + "秒");
		int seconds5 = this.getTwoTimeDay(startTime1, endTime4);
		logger.info("假牌车数据分析完成,总耗时：" + seconds5 + "秒");
	}
	
	/**
	 * 假牌车分析,第二算法
	 * @throws Exception 
	 */
	public void fakeCarNumStatistics_two() throws Exception {
		PageEntity page = new PageEntity();
		List<Map<String, String>> fakeCounts = systemConfigService.findFakeCounts();
		page.setPageNo(1);
		page.setPageSize(StringUtil.toInt(fakeCounts.get(0).get("VALUE"))); //每次分析最大量五万条数据,标准大于系统设置的时间
		Date nowDate = new Date();
		Date endDate = nowDate;
		String endDateStr = DateUtil.parseToString(endDate, "yyyy-MM-dd HH:mm:ss");
		System.out.println(endDateStr);
		List<Map<String, String>> fakeTimes = systemConfigService.findFakeTimes();
		nowDate.setMinutes(endDate.getMinutes() - StringUtil.toInt(fakeTimes.get(0).get("VALUE"))); //时间可在系统设置里设置
		Date startDate = nowDate;	
		String startDateStr = DateUtil.parseToString(startDate, "yyyy-MM-dd HH:mm:ss");
		System.out.println(startDateStr);
		List<String> directionList = new ArrayList<String>();
		List<String> platesList = new ArrayList<String>();
		platesList.add("粤A");
		String startTime1 = DateUtil.getCurrentDateTime();
		startDate = DateUtil.parseToDate(startDateStr, "yyyy-MM-dd HH:mm:ss");
		endDate = DateUtil.parseToDate(endDateStr, "yyyy-MM-dd HH:mm:ss");
		List<String> mountList = new ArrayList<String>();
		page = takeService.queryCarTake(startDate, endDate, mountList, platesList, directionList, "",null,null,null, page);
		List<CarTake> results = page.getResult();
		
		//源数据测试
		/*List<CarTake> results = new ArrayList<CarTake>();
		CarTake testCarTake = new CarTake();
		testCarTake.setHphm("粤A11111");
		testCarTake.setKkbh("440112816120004300");
		testCarTake.setKkmc("赤坎桥入口");
		CarTake testCarTake1 = new CarTake();
		testCarTake1.setHphm("粤AAAA4D");
		testCarTake1.setKkbh("440112816120004305");
		testCarTake1.setKkmc("赤坎桥出口");
		CarTake testCarTake2 = new CarTake();
		testCarTake2.setHphm("粤AG4800");
		testCarTake2.setKkbh("440112816120004305");
		testCarTake2.setKkmc("赤坎桥出口");
		CarTake testCarTake3 = new CarTake();
		testCarTake3.setHphm("粤A12345");
		testCarTake3.setKkbh("440112816120004305");
		testCarTake3.setKkmc("赤坎桥出口");
		results.add(testCarTake);
		results.add(testCarTake1);
		results.add(testCarTake2);
		results.add(testCarTake3);*/
		
		String endTime1 = DateUtil.getCurrentDateTime();
		int seconds1 = this.getTwoTimeDay(startTime1, endTime1);
		logger.info("第一步、查询Hbase数据完成，总条数：" + results.size() + "条，耗时：" + seconds1 + "秒");
		
		//车辆信息库数据
		//Map<String, String> dbDatasMap = this.searchCarNumSource();
		
		List<CarTake> filteList = new ArrayList<CarTake>();
		String startTime3 = DateUtil.getCurrentDateTime();
		//识别出假牌，并额外保存在另外一个集合里面
		filteList = this.fakeCarNumDao.filteCarNumInfo(results);
			
		String endTime3 = DateUtil.getCurrentDateTime();
		int seconds3 = this.getTwoTimeDay(startTime3, endTime3);
		logger.info("第二步、源数据与车辆信息库车牌比对完成，存在假牌数量：" + filteList.size() + "条，耗时：" + seconds3 + "秒");
		
		//已存在的假拍车数据
		List<Map<String, String>> oraDatas = this.fakeCarNumDao.fakeCarNumSearch();
		List<Map<String, String>> updateDatas = new ArrayList<Map<String,String>>();//待更新的集合数据
		List<Map<String, String>> saveDatas = new ArrayList<Map<String,String>>();//待新增的集合数据
		String startTime4 = DateUtil.getCurrentDateTime();
		if (filteList != null && filteList.size() > 0) {
			Map<String, String> newDataMap = null;
			boolean dataFlag = false;
			for (CarTake carTake0 : filteList) {
				dataFlag = false;
				if (oraDatas != null && oraDatas.size() > 0) {
					for (Map<String, String> oraMap : oraDatas) {
						//计数统计
						if (StringUtil.equals(carTake0.getHphm(), oraMap.get("HPHM"))) {
							if (StringUtil.equals(carTake0.getKkbh(), oraMap.get("KKBH"))) {
								dataFlag = true; //根据车牌及对应的卡口表示存在此条记录
								oraMap.put("AMOUNTS", StringUtil.toString(StringUtil.toInt(oraMap.get("AMOUNTS")) + 1));//加1
								updateDatas.add(oraMap);
							}
						} 
					}
				}
				//假牌库中还不存在此记录
				if (!dataFlag) {
					newDataMap = new HashMap<String, String>();
					newDataMap.put("HPHM", carTake0.getHphm());
					newDataMap.put("HPZL", carTake0.getHpzl());
					newDataMap.put("CLLX", carTake0.getCllx());
					newDataMap.put("CSYS", carTake0.getCsys());
					newDataMap.put("CLPP", carTake0.getClpp());
					newDataMap.put("KKBH", carTake0.getKkbh());
					newDataMap.put("KKMC", carTake0.getKkmc());
					newDataMap.put("DWBH", carTake0.getDwbh());
					newDataMap.put("DWMC", carTake0.getDwmc());
					newDataMap.put("AMOUNTS", "1");
					saveDatas.add(newDataMap);
				}
			}
		}
		this.fakeCarNumDao.updateOrSaveRecords(updateDatas, saveDatas);
		String endTime4 = DateUtil.getCurrentDateTime();
		int seconds4 = this.getTwoTimeDay(startTime4, endTime4);
		logger.info("第三步、假牌车数据入库完成,旧数据：" + updateDatas.size() + "条，新数据：" + saveDatas.size() + "条，耗时：" + seconds4 + "秒");
		int seconds5 = this.getTwoTimeDay(startTime1, endTime4);
		logger.info("假牌车数据分析完成,总耗时：" + seconds5 + "秒");
	}
	
	/**
	 * 获取车辆库信息，并放到缓存里面
	 * @return 查询结果
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	public Map<String, String> searchCarNumSource() throws Exception {
		boolean updated = false;
		Map<String, String> findDataMap = null;
		String startTime2 = DateUtil.getCurrentDateTime();
		try {
			//缓存时间为1小时
			findDataMap = (Map<String, String>) generalAdmin.getFromCache("SOURCE", 3600);
			logger.debug("车辆信息库读取数据来自缓存，设定缓存有效时间1小时");
		} catch (NeedsRefreshException nre) {
			logger.debug("车辆信息库读取数据来自数据库接口查询");
			try {
				//车辆信息库数据
				//List<Map<String, String>> dbDatas = new ArrayList<Map<String,String>>();
				
				//车辆库测试数据
				//Map<String, String> dbMap = new HashMap<String, String>();
				
				findDataMap = this.fakeCarNumDao.queryCarSourceInfo();
				
				/*findDataMap = new HashMap<String, String>();
				findDataMap.put("粤A12345", "粤A12345");
				findDataMap.put("粤B12345", "粤B12345");
				findDataMap.put("粤A98765", "粤A98765");*/
				
				generalAdmin.putInCache("SOURCE", findDataMap);
				updated = true;
			} finally {
				if (!updated) {
					generalAdmin.cancelUpdate("SOURCE");
				}
			}
		}
		//List<Map<String, String>> sourceDatas = findDataMap.get("carSource");
		String endTime2 = DateUtil.getCurrentDateTime();
		int seconds2 = this.getTwoTimeDay(startTime2, endTime2);
		logger.info("第二步、车辆信息数据获取完成，总条数： 420W条，耗时：" + seconds2 + "秒");
		return findDataMap;
	}
	
	/**
	 * 两个时间相差时间 endTime > startTime
	 * @param startTime
	 * @param endTime
	 * @return 返回XX秒
	 */
	public int getTwoTimeDay(String startTime, String endTime) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date starDate = null;
		Date endDate = null;
		try {
			starDate = df.parse(startTime);
			endDate = df.parse(endTime);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		long l = endDate.getTime() - starDate.getTime();
		return StringUtil.toInteger(l / 1000);
	}
	
	/**
     * 假牌车查询
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> fackCarNumSearchInfo(Map<String, String> param) {
    	return fakeCarNumDao.fackCarNumSearchInfo(param);
    }
    
    /**
     * 假牌车数量统计
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> countfackCarNumDatas(Map<String, String> param) {
    	return fakeCarNumDao.countfackCarNumDatas(param);
    }
}
