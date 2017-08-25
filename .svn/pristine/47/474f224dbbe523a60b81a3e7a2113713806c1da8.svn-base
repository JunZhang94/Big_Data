package com.jp.tic.business.analyStopCar.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.analyStopCar.dao.AnalyStopCarDao;
import com.jp.tic.business.analyStopCar.entity.Mount;
import com.jp.tic.business.analyStopCar.service.AnalyStopCarService;
import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.business.cartake.util.DateUtils;
import com.jp.tic.business.device.dao.BayonetManagerDao;
import com.jp.tic.common.util.DataUtils;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.utils.lang.StringUtil;

@Service
public class AnalyStopCarServiceImpl implements AnalyStopCarService{
	
	@Autowired
	AnalyStopCarDao analyStopCarDao;
	@Autowired
	DataUtils dataUtil;
	@Autowired
	private BayonetManagerDao bayonetManagerDao;
	
	Map<String, Long> srcRecordMap=null;
	Map<String, Long> targetRecordMap=null;
	Map<String,Integer> starKKMap=null;
	Map<String,Integer> stopKKMap=null;
	//存储出行明细
	Map<String,List<String>> startList=null;
	//存储落脚明细
	Map<String,List<String>> stopList=null;
	List<String> totalList=null;
	int resultCount=0;
	
	public final SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public final SimpleDateFormat solrFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

	@Override
	public Map<String, Object> AnalyStopCarQuery(Map<String, String> searchParam) throws ParseException {
		Map<String,Map<String,String>> resultRecordMap=new HashMap<String,Map<String,String>>();
		int pageStart = StringUtil.toInt(searchParam.get("page.start"));
	    int pageLimit = StringUtil.toInt(searchParam.get("page.limit"));
		
		if(pageStart==0){
			this.InitAnalyStopCar(searchParam);
		}
		for(int i=pageStart;i<resultCount;i++){
			String kkbh=totalList.get(i);
			String startNum="0";
			String stopNum="0";
			if(starKKMap.containsKey(kkbh)){
				startNum=starKKMap.get(kkbh)+"";
			}
			if(stopKKMap.containsKey(kkbh)){
				stopNum=stopKKMap.get(kkbh)+"";
			}
			Map<String,String> tmpMap=new HashMap<String,String>();
			tmpMap.put(startNum, stopNum);
			resultRecordMap.put(kkbh,tmpMap);
			if(resultRecordMap.size()>=pageLimit){
				break;
			}
		}
		return AnalyStopResult(resultRecordMap);
	}
	/**
	 * 封装页面展现效果集
	 * @param paramMap
	 * @return
	 */
	public Map<String, Object> AnalyStopResult(Map paramMap){
		Map<String, Object> resultMap=new HashMap<String,Object>();
		List<Map<String, String>> result=new ArrayList<Map<String, String>>();
		Iterator inter=paramMap.entrySet().iterator();
		while(inter.hasNext()){
			Map.Entry<Object, Object> entry=(Entry<Object, Object>) inter.next();
			String kkbh=(String) entry.getKey();
			String kkmc=bayonetManagerDao.getKkmcById(kkbh);
			Map<String,String> countMap=(Map<String, String>) entry.getValue();
			Iterator countInter=countMap.entrySet().iterator();
			Map.Entry<Object, Object> countEntry=(Entry<Object, Object>) countInter.next();
			String startCount=(String) countEntry.getKey();
			String stopCount=(String) countEntry.getValue();
			Map<String,String> tmpMap=new HashMap<String,String>();
			tmpMap.put("kkbh", kkbh);
			tmpMap.put("kkmc", kkmc);
			tmpMap.put("startCount", startCount);
			tmpMap.put("stopCount", stopCount+"");
			result.add(tmpMap);
		}
		resultMap.put("total", resultCount);
		resultMap.put("dataList", result);
		return resultMap;
	}
	/**
	 * 根据参数拼凑solr的查询语句
	 * @param searchParam
	 * @param flag
	 * @return
	 */
	private String getPageParams(Map<String, String> searchParam){
		
		StringBuffer paramsStr=new StringBuffer();
		String startDateStr=searchParam.get("startdate");
		String endDateStr=searchParam.get("enddate");
		String carBrand=searchParam.get("carBrand");
		String carType=searchParam.get("carType");
		String carYear=searchParam.get("carYear");
		String hphm=searchParam.get("hphm");
		String hpys=searchParam.get("hpys");
		
		try {
			String startTime = solrFormat.format(formatter.parse(startDateStr));
			String endTime = solrFormat.format(formatter.parse(endDateStr));
			paramsStr.append("jgsj:["+startTime+" TO "+endTime+"]");
			if(hphm !=null && hphm !=""){
				String query=dataUtil.getSolrOrQuery("hphm", hphm);
				paramsStr.append(" AND "+query);
			}
			if(hpys !=null && hpys !=""){
				paramsStr.append(" AND (");
				String[] hpysArray =hpys.split(",");
				for(int i=0;i<hpysArray.length;i++){
					if(i>0){
						paramsStr.append(" OR hpys:"+hpysArray[i]);
					}else{
						paramsStr.append(" hpys:"+hpysArray[i]);
					}
				}
				paramsStr.append(" )");
			}
			if(carBrand !=null && carBrand !=""){
				paramsStr.append(" AND "+dataUtil.getCarBrandSql(carBrand,carType,carYear));
			}
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return paramsStr.toString();
	}
	@Override
	public Map<String,Object> ExportStopCar(Map<String, String> searchParam) {
		Map<String,Map<String,String>> resultRecordMap=new HashMap<String,Map<String,String>>();
		String paramKkbh=searchParam.get("kkbh");
		if(paramKkbh !=null){
			String[] kkbhArray=paramKkbh.split(",");
			for(int i=0;i<kkbhArray.length;i++){
				String tmpKkbh=kkbhArray[i];
				String startNum="0";
				String stopNum="0";
				if(starKKMap.containsKey(tmpKkbh)){
					startNum=starKKMap.get(tmpKkbh)+"";
				}
				if(stopKKMap.containsKey(tmpKkbh)){
					stopNum=stopKKMap.get(tmpKkbh)+"";
				}
				Map<String,String> tmpMap=new HashMap<String,String>();
				tmpMap.put(startNum, stopNum);
				resultRecordMap.put(tmpKkbh,tmpMap);
			}
		}else{
			if(totalList ==null ||totalList.size()==0){
				this.InitAnalyStopCar(searchParam);
			}
			for(int i=0;i<resultCount;i++){
				String kkbh=totalList.get(i);
				String startNum="0";
				String stopNum="0";
				if(starKKMap.containsKey(kkbh)){
					startNum=starKKMap.get(kkbh)+"";
				}
				if(stopKKMap.containsKey(kkbh)){
					stopNum=stopKKMap.get(kkbh)+"";
				}
				Map<String,String> tmpMap=new HashMap<String,String>();
				tmpMap.put(startNum, stopNum);
				resultRecordMap.put(kkbh,tmpMap);
			}
		}
		return AnalyStopResult(resultRecordMap);
	}
	@Override
	public void InitAnalyStopCar(Map<String, String> searchParam) {
		
		totalList=new ArrayList<String>();
		starKKMap=new HashMap<String,Integer>();
		stopKKMap=new HashMap<String,Integer>();
		startList=new HashMap<String,List<String>>();
		stopList=new HashMap<String,List<String>>();
		
		int stopTimeLen=0;
		if(searchParam.get("stopTimeLen") !=null){
			stopTimeLen=Integer.parseInt(searchParam.get("stopTimeLen"));
		}
		//查询结果按经过时间降序排序
		List<CarTakeSolr> tmpList=analyStopCarDao.QuerySolrCarList(this.getPageParams(searchParam));
		for(int i=0;i<tmpList.size()-1;i++){
			CarTakeSolr bigObject=tmpList.get(i);
			CarTakeSolr smallObject=tmpList.get(i+1);
			Date bigJgsj=bigObject.getJgsj();
			Date smallJgsj=smallObject.getJgsj();
			//形成比对时间
			Calendar calendar=Calendar.getInstance();   
			calendar.setTime(bigJgsj); 
			//小时间隔
			calendar.add(Calendar.HOUR_OF_DAY,-stopTimeLen);
			Date srcDate=calendar.getTime();
			if(srcDate.getTime()>smallJgsj.getTime()){
				List<String> tmpSList=null;
				if(starKKMap.get(bigObject.getKkbh()) !=null){
					Integer count=starKKMap.get(bigObject.getKkbh());
					starKKMap.put(bigObject.getKkbh(), count+1);
				}else{
					starKKMap.put(bigObject.getKkbh(),1);
				}
				if(stopKKMap.get(smallObject.getKkbh()) !=null){
					Integer count=stopKKMap.get(smallObject.getKkbh());
					stopKKMap.put(smallObject.getKkbh(), count+1);
				}else{
					stopKKMap.put(smallObject.getKkbh(),1);
				}
				if(!totalList.contains(bigObject.getKkbh())){
					totalList.add(bigObject.getKkbh());
				}
				if(!totalList.contains(smallObject.getKkbh())){
					totalList.add(smallObject.getKkbh());
				}
				//增加明细信息记录
				if(startList.get(bigObject.getKkbh())!=null){
					tmpSList=startList.get(bigObject.getKkbh());
					tmpSList.add(bigObject.getRowkey());
					
				}else{
					tmpSList=new ArrayList<String>();
					tmpSList.add(bigObject.getRowkey());
					startList.put(bigObject.getKkbh(), tmpSList);
				}
				if(stopList.get(smallObject.getKkbh())!=null){
					tmpSList=stopList.get(smallObject.getKkbh());
					tmpSList.add(smallObject.getRowkey());
					
				}else{
					tmpSList=new ArrayList<String>();
					tmpSList.add(smallObject.getRowkey());
					stopList.put(smallObject.getKkbh(), tmpSList);
				}
			}
		}
		resultCount=totalList.size();
	}
	@Override
	public Map<String, Object> getCarList(Map<String, String> searchParam) {
		Map<String, Object> resultMap=new HashMap<String,Object>();
		List<String> rowKeys=null;
		List<String> tmpRowKeys=null;
		int toIndex=0;
		List<CarTake> resultList=new ArrayList<CarTake>();
		int pageStart = StringUtil.toInt(searchParam.get("page.start"));
	    int pageLimit = StringUtil.toInt(searchParam.get("page.limit"));
		String paramKkbh=searchParam.get("kkbh");
		String paramFlag=searchParam.get("flag");
		toIndex=pageStart+pageLimit;
		if(paramFlag.equals("start")){
			rowKeys=this.startList.get(paramKkbh);
		}else{
			rowKeys=this.stopList.get(paramKkbh);
		}
		if(rowKeys.size()>toIndex){
			tmpRowKeys=rowKeys.subList(pageStart, toIndex);
		}else{
			tmpRowKeys=rowKeys.subList(pageStart, rowKeys.size());
		}

		resultList=analyStopCarDao.QueryCarByRowkey(tmpRowKeys);
		resultMap.put("total", rowKeys.size());
		resultMap.put("dataList", resultList);
		return resultMap;
	}

}
