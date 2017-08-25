package com.jp.tic.business.compareByTime.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.util.Bytes;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrQuery.ORDER;
import org.apache.solr.client.solrj.impl.CloudSolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.hadoop.hbase.RowMapper;
import org.springframework.stereotype.Repository;

import com.jp.tic.analyze.dao.impl.AbstractKKHBaseDao;
import com.jp.tic.analyze.dao.impl.CarTakeDaoImpl;
import com.jp.tic.analyze.util.ResultConvertUtils;
import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.business.compareByTime.dao.CompareByTimeDao;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.common.util.SolrUtils;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.hbase.SysHBaseConstants;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;

@Repository
public class CompareByTimeDaoImpl extends AbstractKKHBaseDao implements CompareByTimeDao {

	private static Logger logger=LoggerFactory.getLogger(CarTakeDaoImpl.class);
	
	@Override
	public Map<String, Object> compareByTimeQueryForpages(String json) {
		Map<String, String> searchParam=JsonUtil.jsonToMap(json);
		Map<String,Object> resultMap=new HashMap<String, Object>();
		List<CarTake> resultList=new ArrayList<CarTake>();
		//--------------------------solr配置-----------------------------------
		Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
		String solrFlag = MapGetUtils.getString(config, "solr.cloud.flag");
		HttpSolrClient solrServer = null;
		CloudSolrClient solrCloud = null;
		if (StringUtil.equals(solrFlag, "single")) {
			solrServer = SolrUtils.initSolr();
		} else {
			solrCloud = SolrUtils.initSolrCloud();
		}
		SolrQuery query=new SolrQuery();
		QueryResponse rsp = null;
		//--------------------------solr结束-----------------------------------
		
		int count=0;
		
		if(searchParam.containsKey("kkbh1")){
			String kkbh="";
			List<CarTake> list=new ArrayList<CarTake>();
			if(searchParam.get("kkbh1").length()==15){
				kkbh="440"+searchParam.get("kkbh1");
			}else{
				kkbh=searchParam.get("kkbh1");
			}
			String startDate=searchParam.get("startdate1");
			String endDate=searchParam.get("enddate1");
			list=getDataForMounts(kkbh, startDate, endDate, solrServer, solrCloud, solrFlag, query, rsp, searchParam);
			resultList.addAll(list);
			count++;
		}
		if(searchParam.containsKey("kkbh2")){
			String kkbh="";
			List<CarTake> list=new ArrayList<CarTake>();
			if(searchParam.get("kkbh2").length()==15){
				kkbh="440"+searchParam.get("kkbh2");
			}else{
				kkbh=searchParam.get("kkbh2");
			}
			String startDate=searchParam.get("startdate2");
			String endDate=searchParam.get("enddate2");
			list=getDataForMounts(kkbh, startDate, endDate, solrServer, solrCloud, solrFlag, query, rsp, searchParam);
			resultList.addAll(list);
			count++;
		}
		if(searchParam.containsKey("kkbh3")){
			String kkbh="";
			List<CarTake> list=new ArrayList<CarTake>();
			if(searchParam.get("kkbh3").length()==15){
				kkbh="440"+searchParam.get("kkbh3");
			}else{
				kkbh=searchParam.get("kkbh3");
			}
			String startDate=searchParam.get("startdate3");
			String endDate=searchParam.get("enddate3");
			list=getDataForMounts(kkbh, startDate, endDate, solrServer, solrCloud, solrFlag, query, rsp, searchParam);
			resultList.addAll(list);
			count++;
		}
		if(searchParam.containsKey("kkbh4")){
			String kkbh="";
			List<CarTake> list=new ArrayList<CarTake>();
			if(searchParam.get("kkbh4").length()==15){
				kkbh="440"+searchParam.get("kkbh4");
			}else{
				kkbh=searchParam.get("kkbh4");
			}
			String startDate=searchParam.get("startdate4");
			String endDate=searchParam.get("enddate4");
			list=getDataForMounts(kkbh, startDate, endDate, solrServer, solrCloud, solrFlag, query, rsp, searchParam);
			resultList.addAll(list);
			count++;
		}
		if(searchParam.containsKey("kkbh5")){
			String kkbh="";
			List<CarTake> list=new ArrayList<CarTake>();
			if(searchParam.get("kkbh5").length()==15){
				kkbh="440"+searchParam.get("kkbh5");
			}else{
				kkbh=searchParam.get("kkbh5");
			}
			String startDate=searchParam.get("startdate5");
			String endDate=searchParam.get("enddate5");
			list=getDataForMounts(kkbh, startDate, endDate, solrServer, solrCloud, solrFlag, query, rsp, searchParam);
			resultList.addAll(list);
			count++;
		}
		if(searchParam.containsKey("kkbh6")){
			String kkbh="";
			List<CarTake> list=new ArrayList<CarTake>();
			if(searchParam.get("kkbh6").length()==15){
				kkbh="440"+searchParam.get("kkbh6");
			}else{
				kkbh=searchParam.get("kkbh6");
			}
			String startDate=searchParam.get("startdate6");
			String endDate=searchParam.get("enddate6");
			list=getDataForMounts(kkbh, startDate, endDate, solrServer, solrCloud, solrFlag, query, rsp, searchParam);
			resultList.addAll(list);
			count++;
		}
		Map<String,List<CarTake>> map =new HashMap<String, List<CarTake>>();
		if(resultList.size()>0){
			for(CarTake carTake:resultList){
				if(map.containsKey(carTake.getHphm())){
					map.get(carTake.getHphm()).add(carTake);
				}else{
					List<CarTake> list=new ArrayList<CarTake>();
					list.add(carTake);
					map.put(carTake.getHphm(), list);
				}
			}
			resultList.clear();
			if(map.size()>0){
				Iterator<Entry<String, List<CarTake>>> it=map.entrySet().iterator();
				while(it.hasNext()){
					Entry<String, List<CarTake>> e=(Entry<String, List<CarTake>>) it.next();
					List<CarTake> list=(List<CarTake>) e.getValue(); 
					if(list.size()==count){
						resultList.addAll(list);
					}
				}
			}
			if(resultList.size()>0){
				Collections.sort(resultList, new Comparator<CarTake>() {
					public int compare(CarTake o1, CarTake o2) {
						if(o2.getJgsj().after(o1.getJgsj())){
							return 1;
						}
						return -1;
					}
				});
			}
			resultMap.put("rows", resultList);
		}
		return resultMap;
	}
	
	/**
	 * 按各卡点、时间段分别进行查询
	 * @param sb
	 * @param kkbh
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public List<CarTake> getDataForMounts(String kkbh,String startDate,String endDate,
			HttpSolrClient solrServer,CloudSolrClient solrCloud,String solrFlag,
			SolrQuery query,QueryResponse rsp,Map<String, String> searchParam){
		StringBuffer sb=new StringBuffer();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
		List<CarTakeSolr> solrList=new ArrayList<CarTakeSolr>();
		List<CarTake> list=new ArrayList<CarTake>();
		
		sb.append("(kkbh:"+kkbh+" AND ");
		Date start= DateUtil.parseToDate(startDate, "yyyy-MM-dd HH:mm:ss");
		Date end= DateUtil.parseToDate(endDate, "yyyy-MM-dd HH:mm:ss");
        String startTime = format.format(start);
        String endTime = format.format(end);
		sb.append("jgsj:["+startTime+" TO "+endTime+"])");
		
		query.setQuery(sb.toString());
		if(searchParam.containsKey("page.start")){
			query.setStart(Integer.parseInt(searchParam.get("page.start")));
		}else{
			query.setStart(0);
		}
		query.setRows(5000);//按单卡口最高峰过车数量
		query.setSort("jgsj", ORDER.desc);
		try {
			if (StringUtil.equals(solrFlag, "single")) {
        		rsp = solrServer.query(query);
    		} else {
    			rsp = solrCloud.query(query);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		solrList=rsp.getBeans(CarTakeSolr.class);
		if(solrList.size()>0){
			List<byte[]> rowKeys=new ArrayList<byte[]>();
			for(CarTakeSolr carTakeSolr:solrList){
				rowKeys.add(Bytes.toBytes(carTakeSolr.getRowkey()));
			}
			list=this.getDatasByKeys(rowKeys);
		}
		
		return list;
	}
	
	public List<CarTake> getDatasByKeys(List<byte[]> rowKeys) {
		List<CarTake> result = template.get(SysHBaseConstants.TABLE_NAME_CAR_TAKE, rowKeys, new RowMapper<CarTake>() {

			@Override
			public CarTake mapRow(Result rs, int i) throws Exception {
				CarTake data = ResultConvertUtils.toTake(rs);
				logger.debug(i + "#" + data);
				return data;
			}
		});
		return result;
	}

}
