package com.jp.tic.analyze.service.impl;

import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.analyze.dao.DeckCarAnalysisDao;
import com.jp.tic.analyze.dao.FollowCarLocalDao;
import com.jp.tic.analyze.dao.MountDistanceDao;
import com.jp.tic.analyze.service.CarTakeService;
import com.jp.tic.analyze.service.DeckCarAnalysisService;
import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.business.firstTimeInCity.dao.FirstTimeInCityDao;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.system.entity.CarLibrary;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.entity.EnumItem;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.system.service.SystemConfigService;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.opensymphony.oscache.base.NeedsRefreshException;
import com.opensymphony.oscache.general.GeneralCacheAdministrator;

@SuppressWarnings("unchecked")
@Service
public class DeckCarAnalysisServiceImpl implements DeckCarAnalysisService {
	
	@Autowired
	private CarTakeService carTakeService;
	@Autowired
	private DeckCarAnalysisDao deckCarAnalysisDao;
	@Autowired
	private SystemConfigService systemConfigService;
	@Autowired
	private MountDistanceDao mountDistanceDao;
	@Autowired 
	private FollowCarLocalDao followCarLocalDao;
	@Autowired 
	private FirstTimeInCityDao firstTimeInCityDao;
	
	@Autowired
	private DictionaryService dictionaryService;
	
	private Logger log = LoggerFactory.getLogger(this.getClass());
	
	//临时保存最新N分钟（5分钟）的所有过车数据
	private List<CarTake> newTempCarTakes = new ArrayList<CarTake>();
	//一直维持N分钟（10分钟）的所有过车数据
	private List<List<CarTake>> allCarTakesGroup = new ArrayList<List<CarTake>>();
	private List<CarTake> allCarTakes = new ArrayList<CarTake>();
	private List<CarTakeSolr> solrCarTakes = new ArrayList<CarTakeSolr>();
	
	//过滤后存在套牌车的数据
	private List<CarTake> filterDatas = new ArrayList<CarTake>();
	
	//套牌车最大限制速度,米/秒
	private double limitSpeed = 150d;
	
	private String styleStr = "yyyy-MM-dd HH:mm:ss";
	
	//所有卡口之间的距离数据
	Map<String, String> distanceMap = new HashMap<String, String>();
	
	//所有卡口数据
	Map<String, Map<String, String>> allMountsMap = new HashMap<String, Map<String, String>>();
	//无效卡口数据
	Map<String, Map<String, String>> invalidMountsMap = new HashMap<String, Map<String, String>>();
	//
	Map<String,String> mountsDisMap=new HashMap<String,String>();
	
	private int intervalTime = 5;
	private int intervalHour = 1;
	private boolean usingFlag = false;
	private boolean compareFlag=false;
	private boolean initFlag=false;
	
	private int compareDataNum;
	private boolean compareLocat = false;
	private String remoteDbUrl;
	private String remoteDbUName;
	private String remoteDbPass;
	private String remoteDbTab;
	
	//所有已近存在的套牌车
	List<Map<String, String>> deckSaveDatas = new ArrayList<Map<String,String>>();
	
	//所有已近存在的套牌车
	Map<String, String> deckSaveDatas2 = new HashMap<String, String>();
	
	List<EnumItem> taopaiDatas;
	private boolean hphmFlag=false;
	private boolean clppFlag=false;
	private boolean cllxFlag=false;
	private boolean csysFlag=false;
	
	private static GeneralCacheAdministrator admin = new GeneralCacheAdministrator();
	private static final String DISTANCE_KEY_SYS = "cacheDistanceData";
	private static final String DECK_KEY_SYS = "cacheDeckData";
	private static final String MOUNT_KEY_SYS = "cacheMountData";
	private static final int MY_DISTANCE_PERIOD = 7200;
	
	/**
	 * 启动套牌分析任务
	 */
	public void startAnalysis(String analyType) {

		if(!initFlag){
			this.initConfig();
		}
		if (analyType.equals("count")&& usingFlag) {
			String curentTimeOne = DateUtil.getCurrentDateTime();
			log.info("套牌车算法分析启动,当前时间" + curentTimeOne);
			try {
				queryHbaseDatas();
			} catch (Exception e) {
				e.printStackTrace();
			}
			String curentTimeTwo = DateUtil.getCurrentDateTime();
			int runtTime = getTwoTimeforMinite(curentTimeOne, curentTimeTwo);
			log.info("套牌车算法分析结束,当前时间" + DateUtil.getCurrentDateTime() + ",本次分析耗时" + runtTime + "秒");
		}
		if(analyType.equals("compare")&& compareFlag){
			String curentTimeOne = DateUtil.getCurrentDateTime();
			log.info("套牌车辆库比对分析启动,当前时间" + curentTimeOne);
			try {
				this.compareDeckDatas();
			} catch (Exception e) {
				e.printStackTrace();
			}
			String curentTimeTwo = DateUtil.getCurrentDateTime();
			int runtTime = getTwoTimeforMinite(curentTimeOne, curentTimeTwo);
			log.info("套牌车辆库比对分析结束,当前时间" + DateUtil.getCurrentDateTime() + ",本次分析耗时" + runtTime + "秒");
		}
	}

	/**
	 * 定时读取hbase中的最新N=5分钟内的最新过车记录，一直维持集合中N=10分钟内的数据
	 * @throws Exception 异常
	 */
	public void queryHbaseDatas() throws Exception {
		String currentTime = DateUtil.getCurrentDateTime();
		Date currentDate = DateUtil.parseToDate(currentTime, styleStr);
		Calendar cal = Calendar.getInstance();
		cal.setTime(currentDate);
		cal.add(Calendar.HOUR, -intervalHour);//当前时间前intervalHour小时
		cal.add(Calendar.MINUTE, -intervalTime);//当前时间前intervalTime分钟
		Date startDate = cal.getTime();
		
		//针对测试使用
		//startDate = DateUtil.parseToDate("2016-9-9 15:06:00", styleStr);
		//currentDate = DateUtil.parseToDate("2016-9-9 16:11:00", styleStr);
		log.info("套牌车分析查询时间段" + DateUtil.parseToString(startDate, styleStr) + "至" + DateUtil.parseToString(currentDate, styleStr));
		if (carTakeService == null) {
			carTakeService = new CarTakeServiceImpl();
		}
		solrCarTakes = this.QuerySolrCarList(startDate,currentDate);
		//去掉空车牌和Unknown车牌
    	List<CarTakeSolr> nullCarNums = new ArrayList<CarTakeSolr>();
    	for (int i = 0; i < solrCarTakes.size(); i++) { 
    		if (!StringUtil.checkStr(solrCarTakes.get(i).getHphm()) ||
    				StringUtil.equals(solrCarTakes.get(i).getHphm(), "-") ||
    				StringUtil.equals(solrCarTakes.get(i).getHphm(), "—") ||
    				StringUtil.equals(solrCarTakes.get(i).getHphm(), "无牌") ||
    				StringUtil.equals(solrCarTakes.get(i).getHphm(), "车牌") ||
    				StringUtil.equals(solrCarTakes.get(i).getHphm(), "无车牌") ||
    				StringUtil.equals(solrCarTakes.get(i).getHphm(), "WJ") ||
    				StringUtil.equals(solrCarTakes.get(i).getHphm(), "null") ||
    				StringUtil.equals(solrCarTakes.get(i).getHphm(), "Unknown")) {
    			nullCarNums.add(solrCarTakes.get(i));
    		}
    	}
    	if(nullCarNums.size()>0){
    		allCarTakes.removeAll(nullCarNums);
    	}
		
		this.analysisDeckCar();
	}
	//套牌车分析
	public void analysisDeckCar() throws Exception{
		
		if (solrCarTakes != null && solrCarTakes.size() > 0) {
			CarTake hbaseCarTake1=null;
			CarTake hbaseCarTake2=null;
			CarTakeSolr carTake = null;
			CarTakeSolr nextCarTake = null;
			 long deltaTime = 0l;//相邻过车时间差，时间单位秒
			 int distance =0; //两个卡口之间的距离
			 double averageSpeed = 0d;
			 int sameCarNumCounts = 0;
			 for (int i = 0; i < solrCarTakes.size(); i++) {
				 carTake = solrCarTakes.get(i);
				 for(int j=i+1;j<solrCarTakes.size(); j++){
					 nextCarTake = solrCarTakes.get(j);
					 if(!StringUtil.equals(carTake.getHphm(), nextCarTake.getHphm())){
						 break;
					 }
					 String kkbh1=carTake.getKkbh();
					 String kkbh2=nextCarTake.getKkbh();
					
					 if (StringUtil.equals(carTake.getHphm(), nextCarTake.getHphm()) && 
							 !StringUtil.equals(kkbh1, kkbh2)) {
						 sameCarNumCounts = sameCarNumCounts + 1;
						 //先过滤掉同一辆车被多抓拍的情况 
						 log.info("测试打印数据时间1：" + DateUtil.parseToString(carTake.getJgsj(), styleStr) + ",时间2：" + DateUtil.parseToString(nextCarTake.getJgsj(), styleStr));
						 deltaTime = Math.abs((carTake.getJgsj().getTime() - nextCarTake.getJgsj().getTime())/1000);
						 //时间无偏差，则判定为同一过车被多次抓拍处理
						 if(deltaTime == 0){
							 continue;
						 }
						 //剔除无效的套牌计算卡口
						 if(this.invalidMountsMap.containsKey(kkbh1+"_"+kkbh2)|| this.invalidMountsMap.containsKey(kkbh2+"_"+kkbh1)){
							 continue;
						 }
						 if(mountsDisMap.containsKey(kkbh1+"_"+kkbh2)){
							 distance=Integer.parseInt(mountsDisMap.get(kkbh1+"_"+kkbh2));
						 }else{
							 distance=this.getMountsDistance(kkbh1, kkbh2);
							 mountsDisMap.put(kkbh1+"_"+kkbh2, distance+"");
						 }
						if(distance==0){
							continue;
						}
						//计算平均速度
						 averageSpeed = distance / deltaTime;
						 if (averageSpeed > limitSpeed) {
							 //判定是否为无效的套牌数据
							 if(this.isValidTaopai(kkbh1,kkbh2)){
								 //转换cartake对象并存储
								 hbaseCarTake1=this.firstTimeInCityDao.QueryCarByRowkey(carTake.getRowkey());
								 hbaseCarTake2=this.firstTimeInCityDao.QueryCarByRowkey(nextCarTake.getRowkey());
								 //使用车辆速度代替平均速度
								 hbaseCarTake1.setClsd(averageSpeed);
								 hbaseCarTake2.setClsd(averageSpeed);
								 filterDatas.add(hbaseCarTake1);
								 filterDatas.add(hbaseCarTake2);
							 }
						 }
				 } 
			 }
		 }
		 if (filterDatas.size() > 0) {
			 String msg = this.saveDeckCarToDb2();
			 log.info("保存套牌车记录描述：" + msg);
			 log.info("本次套牌车分析，总数据量：" + solrCarTakes.size() + ",分析出的结果集大小为：" + filterDatas.size()/2 + ",存在相同的车牌数量：" + sameCarNumCounts);
			 filterDatas.clear();
		 } else {
			 log.info("本次套牌车分析，总数据量：" + solrCarTakes.size() + ",分析出的结果集大小为0" + ",存在相同的车牌数量或者频繁出现的卡口：" + sameCarNumCounts);
		 }
	}
		
}
/**
 * 
 * @param kkbh1
 * @param kkbh2
 * @return
 */
int getMountsDistance(String kkbh1,String kkbh2){
		int distance=0;
		 Map<String, String> mountMapTemp = null;
		 Map<String, String> mountMapNextTemp = null;
		 //为GIS调用服务
		 String kkjd1 = "", kkwd1 = "", kkjd2 = "", kkwd2 = "";
		 mountMapTemp = allMountsMap.get(kkbh1);
		 mountMapNextTemp = allMountsMap.get(kkbh2);
		 if (mountMapTemp != null && mountMapNextTemp != null) {
			 kkjd1 = mountMapTemp.get("KKJD");
			 kkwd1 = mountMapTemp.get("KKWD");
			 kkjd2 = mountMapNextTemp.get("KKJD");
			 kkwd2 = mountMapNextTemp.get("KKWD");
			 if (StringUtil.checkStr(kkjd1) && StringUtil.checkStr(kkwd1) &&
					 StringUtil.checkStr(kkjd2) && StringUtil.checkStr(kkwd2)) {
				 distance = mountDistanceDao.calculateDistance(kkjd1, kkwd1, kkjd2, kkwd2);
			 }
		 } 
		
		return distance;
}
	
	
	/**
	 * 分析套牌车数据,
	 * 第一：由于存在设备时钟的问题，导致套牌车数量出现大量数据，因此此过滤方法，暂时不考虑，
	 * 避免服务器挂死,要产生重复数据就产生重复数据吧,因此此优化方案暂时不采用
	 * 第二：本想做好数据重叠过滤套牌车，增加套牌分析的准确率，谁想，
	 * 因为时钟的不准确，导致每次分析都出现大量的套牌车数据，因此此优化方案再次不考虑
	 * @throws Exception 异常
	 */
	public void analysisDeckDatas() throws Exception {
		filterDatas = new ArrayList<CarTake>();
		//一直维持N分钟（10分钟）的所有过车数据
		/*if (allCarTakesGroup.size() == 3) {
			//避免同步数据出现碰撞
			Thread.sleep(500);
		}*/
		log.info("总集合管理长度:" + allCarTakesGroup.size());
		List<Map<String, String>> datas = systemConfigService.loadAlarmSettingInfo();
		String deckDistance = "gis";
		for (Map<String, String> data : datas) {
			if (StringUtil.equals(data.get("CODE"), "deck_distance")) {
				deckDistance = data.get("VALUE");
				break;
			}
		}
		if (StringUtil.equals(deckDistance, "gis")) {
			//allMountsMap = this.loadAllMountInfo();
			allMountsMap = this.loadAllMountInfo();
		} else {
			if (distanceMap.isEmpty() || distanceMap.size() == 0) {
				distanceMap = this.loadAllMountDistance();
				//allMountsMap = this.dealWithAllMountInfo();
			}
		}
		/*if (deckSaveDatas2.isEmpty() || deckSaveDatas2.size() == 0) {
			deckSaveDatas2 = this.loadAllCarnumInfo2();
		}*/
		/*if (deckSaveDatas == null || deckSaveDatas.size() == 0) {
			deckSaveDatas = this.loadAllCarnumInfo();
		}*/
		/*if (allCarTakesGroup.size() > 0) {
			allCarTakes = new ArrayList<CarTake>();
			for (int i = 0; i < allCarTakesGroup.size(); i++) {
				allCarTakes.addAll(allCarTakesGroup.get(i));
			}
		}*/
		if (allCarTakes != null && allCarTakes.size() > 0) {
			 //对所有数据按车牌进行排序
			 Collections.sort(allCarTakes, new Comparator<CarTake>(){
				 public int compare(CarTake item1,CarTake item2){
	                    return item1.getHphm().compareTo(item2.getHphm());  
	                }
			 });
			 CarTake carTake = null;
			 CarTake nextCarTake = null;
			 long deltaTime = 0l;//相邻过车时间差，时间单位秒
			 long distance = 0l; //两个卡口之间的距离
			 //String kkbhKey = null;
			 double averageSpeed = 0d;
			 //String distanceTemp = null;
			 //为GIS调用服务
			 String kkjd1 = "", kkwd1 = "", kkjd2 = "", kkwd2 = "";
			 Map<String, String> mountMapTemp = null;
			 Map<String, String> mountMapNextTemp = null;
			 int sameCarNumCounts = 0;
			 boolean dealFlag = false;
			 for (int j = 0; j < allCarTakes.size(); j++) {
				 carTake = allCarTakes.get(j);
				 /*if (StringUtil.equals(deckDistance, "gis")) {
					 kkjd1 = allMountsMap.get(carTake.getKkbh()).get("KKJD");
					 kkwd1 = allMountsMap.get(carTake.getKkbh()).get("KKWD");
				 }*/
				 //避免集合越界
				 if ((j + 1) < allCarTakes.size()) {
					 nextCarTake = allCarTakes.get(j + 1);
					 /*kkbhKey = carTake.getKkbh() + "-" + nextCarTake.getKkbh();
					 distanceTemp = distanceMap.get(kkbhKey);
					 //因为有些过车数据的卡口不在卡口表里面
					 if (StringUtil.checkStr(distanceTemp)) {
						 distance = Long.parseLong(distanceMap.get(kkbhKey));
					 } else {
						 //这种情况默认不套牌
						 distance = 0l;
					 }*/
					 if (StringUtil.equals(carTake.getHphm(), nextCarTake.getHphm()) && 
							 !StringUtil.equals(carTake.getKkbh(), nextCarTake.getKkbh()) && 
							 StringUtil.equals(carTake.getHpys(), nextCarTake.getHpys())) {
						 sameCarNumCounts = sameCarNumCounts + 1;
						 if (StringUtil.equals(deckDistance, "gis")) {
							 dealFlag = this.dealWithTargetMountInfo(nextCarTake.getKkbh(), carTake.getKkbh());
							 //表示出现了多次重复出现的卡口数据（问题数据）
							 if (dealFlag) {
								 continue;
							 }
							 mountMapTemp = allMountsMap.get(carTake.getKkbh());
							 mountMapNextTemp = allMountsMap.get(nextCarTake.getKkbh());
							 if (mountMapTemp != null && mountMapNextTemp != null) {
								 kkjd1 = mountMapTemp.get("KKJD");
								 kkwd1 = mountMapTemp.get("KKWD");
								 kkjd2 = mountMapNextTemp.get("KKJD");
								 kkwd2 = mountMapNextTemp.get("KKWD");
							 } else {
								 continue;
							 }
							 if (!StringUtil.checkStr(kkjd1) || !StringUtil.checkStr(kkwd1) ||
									 !StringUtil.checkStr(kkjd2) || !StringUtil.checkStr(kkwd2)) {
								 //出现经度或者纬度为空的情况，跳过本次执行
								 continue;
								 //distance = 0;
							 } else {
								 distance = mountDistanceDao.calculateDistance(kkjd1, kkwd1, kkjd2, kkwd2);
								 //distance = 100000;
								 //出现两个卡口之间的距离计算异常，跳过本次执行
								 if (distance == 0) {
									 continue;
								 }
							 }
						 }
						 log.info("测试打印数据时间1：" + DateUtil.parseToString(carTake.getJgsj(), styleStr) + ",时间2：" + DateUtil.parseToString(nextCarTake.getJgsj(), styleStr));
						 deltaTime = Math.abs((carTake.getJgsj().getTime() - nextCarTake.getJgsj().getTime())/1000);
						 //可能是设备时钟有问题，时间刚刚撞上一起
						 if (deltaTime == 0) {
							 continue;
						 }
						 averageSpeed = distance / deltaTime;
						 log.info("测试大部分分析出来的套牌速度是多少：" + averageSpeed);
						 if (averageSpeed > limitSpeed) {
							 //使用车辆速度代替平均速度
							 carTake.setClsd(averageSpeed);
							 nextCarTake.setClsd(averageSpeed);
							 filterDatas.add(carTake);
							 filterDatas.add(nextCarTake);
						 }
					 } else {
						 continue;
					 }
				 }
			 }
			 if (filterDatas.size() > 0) {
				 String msg = this.saveDeckCarToDb2();
				 //String msg = "暂时不要保存，测试用的";
				 log.info("保存套牌车记录描述：" + msg);
				 log.info("本次套牌车分析，总数据量：" + allCarTakes.size() + ",分析出的结果集大小为：" + filterDatas.size() + ",存在相同的车牌数量：" + sameCarNumCounts);
			 } else {
				 log.info("本次套牌车分析，总数据量：" + allCarTakes.size() + ",分析出的结果集大小为0" + ",存在相同的车牌数量或者频繁出现的卡口：" + sameCarNumCounts);
			 }
		}
	}
	
	/**
	 * 保存套牌车数据
	 * @return 保存条数
	 */
	public String saveDeckCarToDb() {
		String msg = "";
		List<CarTake> filteDeckCars = new ArrayList<CarTake>();
		if (deckSaveDatas != null && deckSaveDatas.size() > 0) {
			for (CarTake carTake : filterDatas) {
				for (Map<String, String> dataMap : deckSaveDatas) {
					if (StringUtil.equals(dataMap.get("HPHM"), carTake.getHphm())) {
						filteDeckCars.add(carTake);
						break;
					}
				}
			}
		}
		filterDatas.removeAll(filteDeckCars);
		if (filterDatas.size() > 0) {
			int counts = deckCarAnalysisDao.saveDeckCarToDb(filterDatas);
			msg = "存在套牌车记录，保存条数：" + counts + "条";
			log.info(msg);
		} else {
			msg = "套牌车重复刷选，剔除此次套牌车的保存数据";
		}
		return msg;
	}
	
	/**
	 * 保存套牌车数据
	 * @return 保存条数
	 * @throws Exception 
	 */
	public String saveDeckCarToDb2() throws Exception {
		String msg = "";
		if (filterDatas.size() > 0) {
			int counts = deckCarAnalysisDao.saveDeckCarToDb(filterDatas);
			msg = "存在套牌车记录，保存条数：" + counts + "条";
			log.info(msg);
		} else {
			msg = "本次分析不存在套牌车数据";
		}
		return msg;
	}
	
	/**
	 * 加载所有的卡口之间的距离数据,数据保存在指定的缓存里面
	 * @return 查询结果
	 * @throws ClassNotFoundException 
	 */
	public Map<String, String> loadAllMountDistance() throws Exception {
		boolean updated = false;
		Map<String, String> mp = null;
		try {
			mp = (Map<String, String>) admin.getFromCache(DISTANCE_KEY_SYS, MY_DISTANCE_PERIOD);
			log.debug("loadAllMountDistance卡口距离数据来自缓存");
		} catch (NeedsRefreshException nre) {
			log.debug("loadAllMountDistance卡口距离数据来自数据库");
			try {
				mp = deckCarAnalysisDao.loadAllMountDistance();
				admin.putInCache(DISTANCE_KEY_SYS, mp);
				updated = true;
			} finally {
				if (!updated) {
					admin.cancelUpdate(DISTANCE_KEY_SYS);
				}
			}
		}
		return mp;
	}
	
	/**
	 * 针对dealWithAllMountInfo方法过滤频繁出现的卡口重新调整，因为下面那个方法不完善，或把一部分看绝对过滤掉，
	 * @return 处理结果
	 * @throws Exception 处理异常
	 */
	public boolean dealWithTargetMountInfo(String kkbh1, String kkbh2) throws Exception {
		List<Map<String, String>> datas = deckCarAnalysisDao.seleteTaopaiData();
		boolean dealFlag = false;
		Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
		int maxCounts = MapGetUtils.getIntValue(config, "deck.car.max.counts");
		if (datas != null && datas.size() > 0) {
			int counts = 0;
			for (Map<String, String> dataMap : datas) {
				counts = StringUtil.toInt(dataMap.get("COUNTS"));
				if (StringUtil.equals(dataMap.get("KKBH1"), kkbh1) && StringUtil.equals(dataMap.get("KKBH2"), kkbh2) && counts > maxCounts) {
					dealFlag = true;
					break;
				}
			}
		}
		return dealFlag;
	}
	
	/**
	 * 重新整理所有的卡口数据，过滤掉不断重复套牌的卡口(此方法有缺陷)
	 * @return
	 * @throws Exception
	 */
	public Map<String, Map<String, String>> dealWithAllMountInfo() throws Exception {
		List<Map<String, String>> datas = deckCarAnalysisDao.seleteTaopaiData();
		Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
		int maxCounts = MapGetUtils.getIntValue(config, "deck.car.max.counts");
		Map<String, Map<String, String>> allMountsMapTemp = this.loadAllMountInfo();
		boolean dealFlag = false;
		if (datas != null && datas.size() > 0) {
			int counts = 0;
			List<Map<String, String>> filetMountList = new ArrayList<Map<String,String>>();
			int removeCounts = 0;
			for (Map<String, String> dataMap : datas) {
				counts = StringUtil.toInt(dataMap.get("COUNTS"));
				if (counts > maxCounts) {
					filetMountList.add(dataMap);
				}
			}
			if (filetMountList != null && filetMountList.size() > 0) {
				for (Map<String, String> filetMap : filetMountList) {
					if (allMountsMapTemp.containsKey(filetMap.get("KKBH1"))) {
						dealFlag = true;
						removeCounts =+1;
						allMountsMapTemp.remove(filetMap.get("KKBH1"));
						log.info("卡口编号" + filetMap.get("KKBH1") + "被移除");
					}
				}
				log.info("数据大于maxCounts的数据量：" + filetMountList.size() + ",卡口被被移除了" + removeCounts + "次");
			}
		}
		if (dealFlag) {
			//重新放入缓存
			admin.putInCache(MOUNT_KEY_SYS, allMountsMapTemp);
		}
		return allMountsMapTemp;
	}
	
	/**
	 * 加载所有的卡口数据,数据保存在指定的缓存里面
	 * @return 查询结果
	 * @throws ClassNotFoundException 
	 */
	public Map<String, Map<String, String>> loadAllMountInfo() throws Exception {
		boolean updated = false;
		Map<String, Map<String, String>> mp = null;
		try {
			mp = (Map<String, Map<String, String>>) admin.getFromCache(MOUNT_KEY_SYS, MY_DISTANCE_PERIOD);
			log.debug("loadAllMountDistance卡口数据来自缓存");
		} catch (NeedsRefreshException nre) {
			log.debug("loadAllMountDistance卡口数据来自数据库");
			try {
				mp = deckCarAnalysisDao.loadAllMountInfo();
				admin.putInCache(MOUNT_KEY_SYS, mp);
				updated = true;
			} finally {
				if (!updated) {
					admin.cancelUpdate(MOUNT_KEY_SYS);
				}
			}
		}
		return mp;
	}
	
	/**
	 * 加载所有的已经存在的套牌车数据,数据保存在指定的缓存里面
	 * @return 查询结果
	 * @throws ClassNotFoundException 
	 */
	public List<Map<String, String>> loadAllCarnumInfo() throws Exception {
		boolean updated = false;
		Map<String, List<Map<String, String>>> dataMap = new HashMap<String, List<Map<String,String>>>();
		List<Map<String, String>> carNumDatas = null;
		try {
			dataMap = (Map<String, List<Map<String, String>>>) admin.getFromCache(DECK_KEY_SYS, MY_DISTANCE_PERIOD);
			log.debug("loadAllMountDistance套牌车数据源数据来自缓存");
		} catch (NeedsRefreshException nre) {
			log.debug("loadAllMountDistance套牌车数据源数据来自数据库");
			try {
				carNumDatas = deckCarAnalysisDao.loadAllCarnumInfo();
				dataMap.put("DeckNums", carNumDatas);
				admin.putInCache(DECK_KEY_SYS, dataMap);
				updated = true;
			} finally {
				if (!updated) {
					admin.cancelUpdate(DECK_KEY_SYS);
				}
			}
		}
		if (carNumDatas != null) {
			return carNumDatas;
		} else {
			return dataMap.get("DeckNums");
		}
	}
	
	/**
	 * 加载所有的已经存在的套牌车数据,数据保存在指定的缓存里面
	 * @return 查询结果
	 * @throws ClassNotFoundException 
	 */
	public Map<String, String> loadAllCarnumInfo2() throws Exception {
		boolean updated = false;
		Map<String, String> mp = null;
		try {
			mp = (Map<String, String>) admin.getFromCache(DECK_KEY_SYS, MY_DISTANCE_PERIOD);
			log.debug("loadAllMountDistance套牌车数据源数据来自缓存");
		} catch (NeedsRefreshException nre) {
			log.debug("loadAllMountDistance套牌车数据源数据来自数据库");
			try {
				mp = deckCarAnalysisDao.loadAllCarnumInfo2();
				admin.putInCache(DECK_KEY_SYS, mp);
				updated = true;
			} finally {
				if (!updated) {
					admin.cancelUpdate(DECK_KEY_SYS);
				}
			}
		}
		return mp;
	}
	
	/**
	 * 时间差
	 * @param startTime
	 * @param endTime
	 * @return
	 */
	public int getTwoTimeforMinite(String startTime, String endTime) {
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
     * 从现在开始减去小时后得到的时间
     * @return date
     */
    public Date getPastDateStr(int amount) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.HOUR, -amount);
        Date date = cal.getTime();
        return date;
    }

	/**
	 * 套牌车分析：直接跟车辆库比对
	 */
	@Override
	public void compareDeckDatas() {
		String currentTime = DateUtil.getCurrentDateTime();
		Date currentDate = DateUtil.parseToDate(currentTime, styleStr);
		Calendar cal = Calendar.getInstance();
		cal.setTime(currentDate);
		cal.add(Calendar.HOUR, -intervalHour);//当前时间前intervalHour小时
		cal.add(Calendar.MINUTE, -intervalTime);//当前时间前intervalTime分钟
		Date startDate = cal.getTime();
		
		if (carTakeService == null) {
			carTakeService = new CarTakeServiceImpl();
		}
		Map paramMap = new HashMap<String, String>();
		paramMap.put("hphm", "粤A*");
		paramMap.put("startTime", DateUtil.parseToString(startDate, styleStr));
		paramMap.put("endTime", DateUtil.parseToString(currentDate, styleStr));
		paramMap.put("limit", "10000");
		allCarTakes = followCarLocalDao.searchFollowInfo(paramMap);
		if(allCarTakes !=null){
			List<CarTake> tmpObjectList=new ArrayList<CarTake>();
			CarTake tmpObject=null;
			for(int i=0;i<allCarTakes.size();i++){
				tmpObject=allCarTakes.get(i);
				tmpObjectList.add(tmpObject);
				if(tmpObjectList.size()>=compareDataNum){
					this.handleCompareCar(tmpObjectList);
					tmpObjectList.clear();
				}
			}
			//处理遗漏的数据
			if(tmpObjectList.size()>=0){
				this.handleCompareCar(tmpObjectList);
				tmpObjectList.clear();
			}
		}
	}

	@Override
	public void initConfig() {
		Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
		intervalTime = MapGetUtils.getIntValue(config, "deck.car.analysis.interval");
		intervalHour = MapGetUtils.getIntValue(config, "deck.car.analysis.interval.hour");
		limitSpeed = MapGetUtils.getIntValue(config, "deck.car.limit.speed");
		usingFlag = MapGetUtils.getBooleanValue(config, "deck.car.analysis.usingflag");
		compareFlag = MapGetUtils.getBooleanValue(config, "deck.car.compare.flag");
		compareDataNum=MapGetUtils.getIntValue(config, "deck.car.compare.dataNum");
		compareLocat=MapGetUtils.getBooleanValue(config, "deck.car.compare.local");
		
		if(!compareLocat){
			remoteDbUrl = MapGetUtils.getString(config, "carLibrary.dburl");
			remoteDbUName=MapGetUtils.getString(config, "carLibrary.userName");
			remoteDbPass=MapGetUtils.getString(config, "carLibrary.password");
			remoteDbTab=MapGetUtils.getString(config, "carLibrary.table");
		}
		this.getTaopaiDataConfig();
		//获取卡口信息
		try {
			allMountsMap = this.loadAllMountInfo();
			invalidMountsMap=deckCarAnalysisDao.loadInValidMountInfo();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		initFlag=true;	
	}
	//获取车辆库比对元素的字典表信息
	public void getTaopaiDataConfig(){
		taopaiDatas = dictionaryService.getEnumListByCode("taopai");
		for(int k=0;k<taopaiDatas.size();k++){
			EnumItem tmpItem=taopaiDatas.get(k);
			if(tmpItem.getItemName().equals("hphm")&& tmpItem.getItemValue().equals("1")){
				hphmFlag=true;
			}else if(tmpItem.getItemName().equals("clpp")&& tmpItem.getItemValue().equals("1")){
				clppFlag=true;
			}else if(tmpItem.getItemName().equals("cllx")&& tmpItem.getItemValue().equals("1")){
				cllxFlag=true;
			}else if(tmpItem.getItemName().equals("csys")&& tmpItem.getItemValue().equals("1")){
				csysFlag=true;
			}
		}
	}

	@Override
	public void handleCompareCar(List<CarTake> objectList) {
		
		Map<String, CarLibrary> libraryMap=this.getCarLibrary(objectList);
		List<CarTake> taopaiList=new ArrayList<CarTake>();
		CarTake tmpObject=null;
		CarLibrary libraryObject=null;
		for(int i=0;i<objectList.size();i++){
			boolean taopaiFlag=false;
			String brand=null;
			String carType=null;
			String carYear=null;
			String ppMatchStr=null;
			tmpObject=objectList.get(i);
			libraryObject=libraryMap.get(tmpObject.getHphm());
			if(libraryObject !=null){
				if(this.clppFlag){
					brand=tmpObject.getBrand();
					carType=tmpObject.getType();
					carYear=tmpObject.getCaryear();
					ppMatchStr=brand+"-"+carType+"-"+carYear;
					//能识别车辆品牌的才比对
					if(brand !=null && brand.length()>0){
						if(!ppMatchStr.contains(libraryObject.getClpp().substring(0, 2))){
							taopaiFlag=true;
							tmpObject.setDetaildesc(ppMatchStr);
						}
					}
				}if(this.cllxFlag){
					if(tmpObject.getCllx() !=null && !libraryObject.getCllx().equals(tmpObject.getCllx())){
						taopaiFlag=true;
					}
				}if(this.csysFlag){
					if(tmpObject.getCsys() !=null && !libraryObject.getCsys().equals(tmpObject.getCsys())){
						taopaiFlag=true;
					}
				}
				if(taopaiFlag){
					taopaiList.add(tmpObject);
				}
			}
		}
		if(taopaiList.size()>0){
			deckCarAnalysisDao.saveCompareTaopai(taopaiList);	
		}
	}

	@Override
	public Map<String, CarLibrary> getCarLibrary(List<CarTake> objectList) {
		Map<String, CarLibrary> resultMap=new HashMap<String, CarLibrary>();
		List<Map<String, String>> mapList=null;
		if(compareLocat){
			mapList=deckCarAnalysisDao.getLocatCarLibrary(objectList);
		}else{
			mapList=deckCarAnalysisDao.getRemoteCarLibrary(objectList,this.remoteDbUrl,this.remoteDbTab,this.remoteDbUName,this.remoteDbPass);
		}
		for(int i=0;i<mapList.size();i++){
			CarLibrary tmpObject=new CarLibrary();
			Map<String, String> tmpMap=mapList.get(i);
			tmpObject.setHphm(tmpMap.get("HPHM"));
			tmpObject.setClpp(tmpMap.get("CLPP"));
			tmpObject.setCllx(tmpMap.get("CLLX"));
			tmpObject.setCsys(tmpMap.get("CSYS"));
			resultMap.put(tmpObject.getHphm(), tmpObject);
		}
		
		return resultMap;
	}
	
	public boolean isValidTaopai(String kkbh1,String kkbh2){
		boolean result=true;
		Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
		int maxCounts = MapGetUtils.getIntValue(config, "deck.car.max.counts");
		List<Map<String, String>> resultList=deckCarAnalysisDao.seleteTaopaiData(kkbh1,kkbh2);
		if(resultList.size()>maxCounts){
			result=false;
			//内存记录无效卡口信息
			this.invalidMountsMap.put(kkbh1+"_"+kkbh2, null);
			//数据库保存无效卡口信息
			this.deckCarAnalysisDao.saveInvalidMount(kkbh1, kkbh2);
			//删除无效卡口产生的套牌车数据
			this.deckCarAnalysisDao.deleteTaopaiData(kkbh1, kkbh2);
		}
		return result;
	}
	
	@Override
	public List<CarTakeSolr> QuerySolrCarList(Date startDate, Date endDate) {
		
		List<CarTakeSolr> carTakes=new ArrayList<CarTakeSolr>();
		String[] orderIndexs=new String[]{"hphm","jgsj"};
		try {
			carTakes = firstTimeInCityDao.QuerySolrCarList(startDate,endDate,0,0,orderIndexs,0);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
		
		return carTakes;
	}

}
