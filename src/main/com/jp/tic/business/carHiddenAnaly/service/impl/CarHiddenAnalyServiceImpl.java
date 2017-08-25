package com.jp.tic.business.carHiddenAnaly.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.CountDownLatch;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.apache.commons.lang.StringUtils;

import com.jp.tic.business.carHiddenAnaly.dao.CarHiddenAnalyDao;
import com.jp.tic.business.carHiddenAnaly.service.CarHiddenAnalyService;
import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.business.device.dao.BayonetManagerDao;
import com.jp.tic.common.util.DataUtils;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.entity.EnumItem;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.lang.StringUtil;
/**
 * 匿名车辆查询功能业务场景：潜伏期出现次数非常频繁，逃逸期出现次数明显减少
 * 搜索结果展现的是潜伏期大于或等于潜伏期频度，逃逸期小于或等于逃逸频度的车辆数据
 * @author ligf
 *
 */
@Service
public class CarHiddenAnalyServiceImpl implements CarHiddenAnalyService{
	
	public final SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public final SimpleDateFormat solrFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
	@Autowired
	CarHiddenAnalyDao dao;
	@Autowired
	private BayonetManagerDao bayonetManagerDao;
	@Autowired
	DataUtils dataUtil;
	@Autowired
	DictionaryService dictionaryService;
	
	Map<String, Long> beforeCarMap=null;
	Map<String, Long> afterCarMap=null;
	int resultCount=0;
	

	@Override
	public Map<String,Object> AnalyHiddenCarInfors(Map<String, String> queryParam) {
		
		List<Map<String, String>> result=new ArrayList<Map<String, String>>();
		Map<String,Object> resultMap=new HashMap<String,Object>();
		int afterTimes=1;//Integer.parseInt(queryParam.get("afterTimes"));
		int beforeDataLen=2;
		int afterDataLen=2;
		beforeDataLen  = Integer.parseInt(dictionaryService.getStoreValueByName("CarHidden","回溯天数"));
		afterDataLen  = Integer.parseInt(dictionaryService.getStoreValueByName("CarHidden","延后天数"));
		afterTimes  = Integer.parseInt(dictionaryService.getStoreValueByName("CarHidden","延后时长次数"));
		int pageStart = StringUtil.toInt(queryParam.get("page.start"));
	    int pageLimit = StringUtil.toInt(queryParam.get("page.limit"));
		String[] mounts = StringUtils.split(queryParam.get("mounts"), ",");
		String startdate=queryParam.get("startTime");
		String enddate=queryParam.get("endTime");
		try {
		//形成案发前查询的开始时间
		Calendar calendar=Calendar.getInstance();   
		calendar.setTime(formatter.parse(startdate)); 
		calendar.add(5, -beforeDataLen);
		Date backStartDate=calendar.getTime();
		queryParam.put("backStartDate", formatter.format(backStartDate));
		//形成案发后查询的结束时间
		calendar.setTime(formatter.parse(enddate)); 
		calendar.add(5, afterDataLen);
		Date afterEndDate=calendar.getTime();
		queryParam.put("afterEndDate",formatter.format(afterEndDate));
		
		List<String> kkbhs = new ArrayList<String>();
		if (mounts != null) {
			for (String mount : mounts) {
				kkbhs.add(mount);
			}
		}
		if(pageStart==0){
			resultCount=this.getCarCount(queryParam);
		}
			Iterator tt=beforeCarMap.entrySet().iterator();
			while(tt.hasNext()){
				Map.Entry<String,Object> o=(Entry<String, Object>) tt.next();
				String tmpHphm=o.getKey();
				Long count=(Long) o.getValue();
				if(count>0){
					//只针对有效车牌的分析
					if(dataUtil.checkHphmValid(tmpHphm)){
						//逃逸期里出现0次或者小于等于afterTimes次数的车辆才进一步确认查询
						if(!afterCarMap.containsKey(tmpHphm)||(afterCarMap.containsKey(tmpHphm)&& afterCarMap.get(tmpHphm)<=afterTimes)){
							List<CarTakeSolr> tmpList=dao.querySolrCarTake(kkbhs, tmpHphm, backStartDate, formatter.parse(startdate));
							if(tmpList.size()>0){
								Map<String, String> tmpMap=new HashMap<String, String>();
								CarTakeSolr tmpCarTake=tmpList.get(0);
								Calendar cal=java.util.Calendar.getInstance();
								cal.setTime(tmpCarTake.getJgsj());
								cal.add(java.util.Calendar.HOUR_OF_DAY,-8);
								tmpCarTake.setJgsj(cal.getTime());
								tmpMap.put("hphm", tmpCarTake.getHphm());
								tmpMap.put("jgsj", formatter.format(tmpCarTake.getJgsj()));
								tmpMap.put("kkbh", tmpCarTake.getKkbh());
								tmpMap.put("beforeTimes",beforeCarMap.get(tmpCarTake.getHphm())+"");
								String afterCount="0";
								if(afterCarMap.containsKey(tmpCarTake.getHphm())){
									afterCount=afterCarMap.get(tmpCarTake.getHphm())+"";
								}
								tmpMap.put("afterTimes",afterCount);
								if(tmpCarTake.getKkbh() !=null){
									tmpMap.put("kkmc", bayonetManagerDao.getKkmcById(tmpCarTake.getKkbh()));
								}
								result.add(tmpMap);
								if(result.size()>=pageLimit){
									break;
								}
							}
						}
					}
					//标识为已分析
				 beforeCarMap.put(tmpHphm, new Long(0));
				}
			}
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		resultMap.put("total", resultCount);
		resultMap.put("dataList", result);
		return resultMap;
		
	}
	//统计数据总量
	private int getCarCount(Map<String, String> queryParam){
		int count=0;
		int beforeTimes=1;
		int afterTimes=1;
		beforeTimes  = Integer.parseInt(dictionaryService.getStoreValueByName("CarHidden","回溯时长次数"));
		afterTimes  = Integer.parseInt(dictionaryService.getStoreValueByName("CarHidden","延后时长次数"));
		
		//通过hphm分组查询频度大于等于beforeTimes的车辆数据
		beforeCarMap=dao.getCarByGroup(getPageParams(queryParam,0),"hphm",beforeTimes,0);
		//通过hphm分组查询逃逸期的车辆数据
		afterCarMap=dao.getCarByGroup(getPageParams(queryParam,1),"hphm",0,0);
		Iterator tt=beforeCarMap.entrySet().iterator();
		while(tt.hasNext()){
			Map.Entry<String,Integer> o=(Entry<String, Integer>) tt.next();
			String tmpHphm=o.getKey();
			//只针对有效车牌的分析
			if(dataUtil.checkHphmValid(tmpHphm)){
				//逃逸期里出现0次或者小于等于afterTimes次数的车辆才进一步确认查询
				if(!afterCarMap.containsKey(tmpHphm)||(afterCarMap.containsKey(tmpHphm)&& afterCarMap.get(tmpHphm)<=afterTimes)){
					count++;
				}
			}
		}
		
		return count;
	}
	/**
	 * 根据参数拼凑solr的查询语句
	 * @param searchParam
	 * @param flag
	 * @return
	 */
	private String getPageParams(Map<String, String> searchParam,int flag){
		
		StringBuffer paramsStr=new StringBuffer();
		String startDateStr=searchParam.get("startTime");
		String endDateStr=searchParam.get("endTime");
		String backStartDateStr=searchParam.get("backStartDate");
		String afterEndDateStr=searchParam.get("afterEndDate");
		String carBrand=searchParam.get("carBrand");
		String carType=searchParam.get("carType");
		String carYear=searchParam.get("carYear");
		String carColors=searchParam.get("carColor");
		String kkbhs=searchParam.get("mounts");
		
		try {
			String startTime = solrFormat.format(formatter.parse(backStartDateStr));
			String endTime = solrFormat.format(formatter.parse(startDateStr));
			if(flag==1){//案发后查询
				startTime = solrFormat.format(formatter.parse(endDateStr));
				endTime = solrFormat.format(formatter.parse(afterEndDateStr));
			}
			paramsStr.append("jgsj:["+startTime+" TO "+endTime+"]");
			
			if(carBrand !=null && carBrand !=""){
				paramsStr.append(" AND "+dataUtil.getCarBrandSql(carBrand,carType,carYear));
			}
			if(carColors !=null && carColors !=""){
				String query=dataUtil.getSolrOrQuery("csys", carColors);
				paramsStr.append(" AND "+query);
			}
			if(kkbhs !=null && kkbhs !=""){
				String query=dataUtil.getSolrOrQuery("kkbh", kkbhs);
				paramsStr.append(" AND "+query);
			}
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return paramsStr.toString();
	}
	
}
		
