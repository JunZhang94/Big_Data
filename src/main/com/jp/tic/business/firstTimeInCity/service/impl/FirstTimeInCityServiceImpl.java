package com.jp.tic.business.firstTimeInCity.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.analyStopCar.dao.AnalyStopCarDao;
import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.business.device.dao.BayonetManagerDao;
import com.jp.tic.business.firstTimeInCity.dao.FirstTimeInCityDao;
import com.jp.tic.business.firstTimeInCity.service.FirstTimeInCityService;
import com.jp.tic.common.util.DataUtils;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.utils.lang.StringUtil;

@Service
public class FirstTimeInCityServiceImpl implements FirstTimeInCityService{
	@Autowired
	FirstTimeInCityDao dao;
	@Autowired
	AnalyStopCarDao analyStopCarDao;
	@Autowired
	private BayonetManagerDao bayonetManagerDao;
	@Autowired
	DataUtils dataUtil;
	//目标查询结果集
	Map<String, Long> srcRecordMap=null;
	List<String> srcList=null;
	//回溯查询结果集
	Map<String, Long> targetRecordMap=null;
	//记录结果总数量
	int resultCount=0;
	
	public final SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public final SimpleDateFormat solrFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
	
/**
 * 在回溯时间段内查询不再出现的车辆才是符合初次入城业务数据，存resultList返回
 */
	@Override
	public Map<String, Object> QueryFirstIncityCar(Map<String, String> searchParam) {
		List<CarTake> resultList=new ArrayList<CarTake>();
		Map<String,Object> tmpMap=new HashMap<String,Object>();
		List<String> rowKeys=new ArrayList<String>();
		try {
			 int pageStart = StringUtil.toInt(searchParam.get("page.start"));
		     int pageLimit = StringUtil.toInt(searchParam.get("page.limit"));
			
			if(pageStart==0){
				resultCount=this.getCarCount(searchParam);
			}
			for(int i=pageStart;i<srcList.size();i++){
				String keyHphm=srcList.get(i);
				searchParam.put("keyHphm", keyHphm);
				List<CarTakeSolr> tmpList=dao.QuerySolrCarList(this.getPageParams(searchParam, 0));
				CarTakeSolr tmpSolrObj=tmpList.get(0);
				String rowKey=tmpSolrObj.getRowkey();
				rowKeys.add(rowKey);
				if(rowKeys.size()>=pageLimit){
					break;
				}
			}
		 if(rowKeys.size()>0){
			//通过rowkeys列表获取对象集
			resultList=dao.QueryCarByRowkey(rowKeys);
			//获取页面名称信息
			for(int i=0;i<resultList.size();i++){
				CarTake tmpCarTake=resultList.get(i);
				if(tmpCarTake !=null){
					if(tmpCarTake.getKkbh() !=null){
						tmpCarTake.setKkmc(bayonetManagerDao.getKkmcById(tmpCarTake.getKkbh()));
					}
					//获取号牌颜色名称
					if(tmpCarTake.getHpys() !=null){
						tmpCarTake.setHpysmc(dataUtil.getDicNameByValue("LicPlateColor", tmpCarTake.getHpys()));
					}
					//组装车辆品牌的页面展现效果
					if(tmpCarTake.getBrand() !=null){
						String brand=tmpCarTake.getBrand();
						String type=tmpCarTake.getType();
						String caryear=tmpCarTake.getCaryear();
						if(type !=null){
							if(caryear !=null){
								tmpCarTake.setBrand(brand+"/"+type+"/"+caryear);
							}else{
								tmpCarTake.setBrand(brand+"/"+type);
							}
						}
					}
				}
			}
		 }
		} catch (Exception e) {
			e.printStackTrace();
		}
		tmpMap.put("total", resultCount);
		tmpMap.put("dataList", resultList);
		return tmpMap;
	}
	
	/**
	 * 根据页面参数汇总数据总量
	 * @param searchParam
	 * @return
	 * @throws ParseException
	 */
	public int getCarCount(Map<String, String> searchParam) throws ParseException{
		int count=0;
		String startDateStr=searchParam.get("startdate");
		Date startDate = formatter.parse(startDateStr);
		srcList=new ArrayList<String>();
		int backTimeLen=0;
		if(searchParam.get("backTimeLen") !=null){
			backTimeLen=Integer.parseInt(searchParam.get("backTimeLen"));
		}
		//比对源数据信息
		String queryStr=getPageParams(searchParam,0);
		srcRecordMap=dao.getCarByGroup(queryStr);
		
		//形成二次查询的开始时间,结束时间即为一次查询的开始时间
		Calendar calendar=Calendar.getInstance();   
		calendar.setTime(startDate); 
		//天间隔
		calendar.add(5, -backTimeLen);
		Date backStartDate=calendar.getTime();
		searchParam.put("backStartDate", formatter.format(backStartDate));
		searchParam.put("backEndDate",startDateStr);
		
		//获取回溯时长内的所有过车信息
		queryStr=getPageParams(searchParam,1);
		targetRecordMap=dao.getCarByGroup(queryStr);
		
		Iterator inter=srcRecordMap.entrySet().iterator();
		while(inter.hasNext()){
			Map.Entry<Object, Object> entry=(Entry<Object, Object>) inter.next();
			String keyHphm=(String) entry.getKey();
			if(dataUtil.checkHphmValid(keyHphm)){
				if(!targetRecordMap.containsKey(keyHphm)){
					count++;
					srcList.add(keyHphm);
				}
			}else{
				System.out.println("");
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
		String startDateStr=searchParam.get("startdate");
		String endDateStr=searchParam.get("enddate");
		String carBrand=searchParam.get("carBrand");
		String carType=searchParam.get("carType");
		String carYear=searchParam.get("carYear");
		String hphm=searchParam.get("hphm");
		String exceptHphm=searchParam.get("exceptHphm");
		String keyHphm=searchParam.get("keyHphm");
		String kkbhs=searchParam.get("kkbh");
		
		try {
			String startTime = solrFormat.format(formatter.parse(startDateStr));
			String endTime = solrFormat.format(formatter.parse(endDateStr));
			if(flag==1){//回溯查询
				startTime = solrFormat.format(formatter.parse(searchParam.get("backStartDate")));
				endTime = solrFormat.format(formatter.parse(searchParam.get("backEndDate")));
			}
			paramsStr.append("jgsj:["+startTime+" TO "+endTime+"]");
			if(hphm !=null && hphm !=""){
				String query=dataUtil.getSolrOrQuery("hphm", hphm);
				paramsStr.append(" AND "+query);
			}
			if(keyHphm !=null && keyHphm !=""){
				paramsStr.append(" AND hphm:"+keyHphm);
			}
			if(exceptHphm !=null && exceptHphm !=""){
				String[] exceptHphms=exceptHphm.split(",");
				for(int i=0;i<exceptHphms.length;i++){
					paramsStr.append(" AND !hphm:"+exceptHphms[i]);
				}
			}
			if(carBrand !=null && carBrand !=""){
				paramsStr.append(" AND "+dataUtil.getCarBrandSql(carBrand,carType,carYear));
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

	@Override
	public Object[] ExportCarList(Map<String, String> searchParam) {
		Object[] textDatas =null;
		Object texts=null;
		List<CarTake> resultList=new ArrayList<CarTake>();
		String nodeList=searchParam.get("nodeList");
		if(nodeList !=null){
			nodeList=nodeList.replace("null", "");
			//勾选页面的导出处理
			String[] nodeArray=nodeList.split(";");
			//创建数组对象
			textDatas=new Object[nodeArray.length];
			for(int i=0;i<nodeArray.length;i++){
				String[] objectArray=nodeArray[i].split(",");
				textDatas[i]=objectArray;
			}
		}else{
			//通过查询条件查询出来的导出处理
			List<String> rowKeys=new ArrayList<String>();
			for(int i=0;i<srcList.size();i++){
				String keyHphm=srcList.get(i);
				searchParam.put("keyHphm", keyHphm);
				List<CarTakeSolr> tmpList=dao.QuerySolrCarList(this.getPageParams(searchParam, 0));
				CarTakeSolr tmpSolrObj=tmpList.get(0);
				String rowKey=tmpSolrObj.getRowkey();
				rowKeys.add(rowKey);
			}
			if(rowKeys.size()>0){
				//通过rowkeys列表获取对象集
				resultList=dao.QueryCarByRowkey(rowKeys);
				//创建数组对象
				textDatas=new Object[resultList.size()];
				//获取页面名称信息
				for(int i=0;i<resultList.size();i++){
					CarTake tmpCarTake=resultList.get(i);
					if(tmpCarTake !=null){
						if(tmpCarTake.getKkbh() !=null){
						 tmpCarTake.setKkmc(bayonetManagerDao.getKkmcById(tmpCarTake.getKkbh()));
						}
						//获取号牌颜色名称
						if(tmpCarTake.getHpys() !=null){
							tmpCarTake.setHpysmc(dataUtil.getDicNameByValue("LicPlateColor", tmpCarTake.getHpys()));
						}
						//组装车辆品牌的页面展现效果
						if(tmpCarTake.getBrand() !=null){
						    String brand=tmpCarTake.getBrand();
							String type=tmpCarTake.getType();
							String caryear=tmpCarTake.getCaryear();
							if(type !=null){
								if(caryear !=null){
								  tmpCarTake.setBrand(brand+"/"+type+"/"+caryear);
								}else{
								  tmpCarTake.setBrand(brand+"/"+type);
								}
							}
						}
						texts = new Object[]{
								tmpCarTake.getHphm(),
								formatter.format(tmpCarTake.getJgsj()),
								tmpCarTake.getKkmc(),
								tmpCarTake.getBrand(),
								tmpCarTake.getHpysmc()
				        	};
				       textDatas[i] = texts;
				  }
				}
			 }
			}
		return textDatas;
	}
}