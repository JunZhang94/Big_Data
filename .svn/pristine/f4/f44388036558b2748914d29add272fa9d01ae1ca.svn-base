package com.jp.tic.business.firstTimeInCity.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.hadoop.hbase.client.Scan;
import org.apache.hadoop.hbase.util.Bytes;
import org.springframework.stereotype.Repository;

import com.jp.tic.analyze.dao.impl.AbstractKKHBaseDao;
import com.jp.tic.analyze.dao.impl.AbstractKKSolrDao;
import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.business.firstTimeInCity.dao.FirstTimeInCityDao;
import com.jp.tic.common.hbase.utils.BytesUtils;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.hbase.SysHBaseConstants;
import com.jp.tic.utils.lang.DateUtil;

@Repository
public class FirstTimeInCityDaoImpl extends AbstractKKSolrDao implements FirstTimeInCityDao{

	@Override
	public List<CarTake> QueryCarList(Date startDate, Date endDate)
			throws Exception {
		List<CarTake> result=null;
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        String startTime = format.format(startDate);
        String endTime = format.format(endDate);
		String query="jgsj:["+startTime+" TO "+endTime+"]";
		List<CarTakeSolr> carTakes=this.QueryCloudSolrCarList(query,0,0,0);
		 List<String> rowkeyList = new ArrayList<String>();
	        if (carTakes != null && carTakes.size() > 0) {
	        	for (CarTakeSolr carTake : carTakes) {
	        		rowkeyList.add(carTake.getRowkey());
	        	}
	        }
	        if (rowkeyList.size() > 0) {
	        	List<byte[]> rowKeys=new ArrayList<byte[]>();
	        	byte[] rowkey = null;
	        	for (String str : rowkeyList) {
	        		rowkey = Bytes.toBytes(str);
	        		rowKeys.add(rowkey);
	        	}
	        	try {
					result = this.getTakesWithKeys(rowKeys);
				} catch (Exception e) {
					e.printStackTrace();
				}
	        }
		return result;
	}

	@Override
	public List<CarTakeSolr> QuerySolrCarList(String hphm, Date startDate, Date endDate)
			throws Exception {
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        String startTime = format.format(startDate);
        String endTime = format.format(endDate);
		StringBuffer query=new StringBuffer();
		query.append("jgsj:["+startTime+" TO "+endTime+"]");
		query.append(" AND hphm:"+hphm);
		
		List<CarTakeSolr> carTakes=this.QueryCloudSolrCarList(query.toString(),0,15,0);
		
		return carTakes;
	}

	@Override
	public List<CarTakeSolr> QuerySolrCarList(Date startDate, Date endDate,int start,int limit,String[] orderIndexs,int orderFlag)
			throws Exception {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        String startTime = format.format(startDate);
        String endTime = format.format(endDate);
		StringBuffer query=new StringBuffer();
		query.append("jgsj:["+startTime+" TO "+endTime+"]");
		
		List<CarTakeSolr> carTakes=this.QuerySolrCarList(query.toString(),start,limit,orderIndexs,orderFlag);
		
		return carTakes;
	}

	@Override
	public int getCarCount(String hphm, Date startDate, Date endDate) {

		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        String startTime = format.format(startDate);
        String endTime = format.format(endDate);
		StringBuffer query=new StringBuffer();
		query.append("jgsj:["+startTime+" TO "+endTime+"]");
		query.append(" AND hphm:"+hphm);
		
		return this.countCarList(query.toString());
	}

	@Override
	public Map<String, Long> getCarByGroup(String query) {
		
		return this.getSolrCarByGroup(query, "hphm", 1, 0);
	}

	@Override
	public CarTake QueryCarByRowkey(String rowKeyStr) {

		List<byte[]> rowKeys=new ArrayList<byte[]>();
		CarTake resultObject=null;
		byte[] rowkey = null;
		rowkey = Bytes.toBytes(rowKeyStr);
		rowKeys.add(rowkey);
		try {
			List<CarTake> result = this.getTakesWithKeys(rowKeys);
			System.out.println("++++++++++++++++++++++++++++++result===="+result.size());
			for(CarTake take : result){
				System.out.println("++++++++++++++++++++++++++++++take===="+take);
			}
			if(result.size()>0){
				resultObject= result.get(0);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("++++++++++++++++++++++++++++++resultObject===="+resultObject);
		return resultObject;
	}

	@Override
	public List<CarTakeSolr> QuerySolrCarList(String query) {
		
		List<CarTakeSolr> carTakes=this.QueryCloudSolrCarList(query,0,0,1);
		
		return carTakes;
	}

	@Override
	public List<CarTake> QueryCarByRowkey(List<String> rowkeyList) {
		List<CarTake> results = new ArrayList<CarTake>();
        if (rowkeyList.size() > 0) {
        	List<byte[]> rowKeys=new ArrayList<byte[]>();
        	byte[] rowkey = null;
        	for (String str : rowkeyList) {
        		rowkey = Bytes.toBytes(str);
        		rowKeys.add(rowkey);
        		System.out.println("++++++++++++++++++rowkey="+rowkey);
        	}
        	try {
        		System.out.println("++++++++++++++++++rowKeys="+rowKeys.size());
        		results = this.getTakesWithKeys(rowKeys);
			} catch (Exception e) {
				e.printStackTrace();
			}
        	
        }
		return results;
	}

}
