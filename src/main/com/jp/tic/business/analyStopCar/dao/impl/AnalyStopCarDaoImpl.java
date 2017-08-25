package com.jp.tic.business.analyStopCar.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.hadoop.hbase.client.Scan;
import org.apache.hadoop.hbase.filter.FilterList;
import org.apache.hadoop.hbase.filter.PageFilter;
import org.apache.hadoop.hbase.util.Bytes;
import org.springframework.stereotype.Repository;

import com.jp.tic.analyze.dao.impl.AbstractKKHBaseDao;
import com.jp.tic.analyze.dao.impl.AbstractKKSolrDao;
import com.jp.tic.business.analyStopCar.dao.AnalyStopCarDao;
import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.common.hbase.query.JPHBaseFilterHelper;
import com.jp.tic.common.hbase.utils.BytesUtils;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.hbase.SysHBaseConstants;

@Repository
public class AnalyStopCarDaoImpl extends AbstractKKSolrDao implements AnalyStopCarDao{


	public List<CarTake> QueryCarList2(String hphm, Date startDate,
			Date endDate, int count) throws Exception {
		Scan scan = new Scan();
		//指定最多返回的Cell数目。用于防止一行中有过多的数据，导致OutofMemory错误
	
		/**
		 * 过滤器部分
		 */
		FilterList filterList=new FilterList();
		scan.setFilter(filterList);
		
		//加查询的车牌号及时间范围过滤
		byte[] hphmBytes=keyHelper.getHphm4RowKeyPrefix(hphm);
		if(endDate!=null){
			byte[] startKey = BytesUtils.add(hphmBytes, getTimeByte(endDate));
			scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
		}	
		
		if(startDate!=null){
			byte[] stopKey = BytesUtils.add(hphmBytes, getTimeByte(startDate));
			scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)0));
		}
		
		//当指定值>0才加返回数量的过滤
		if(count>0){
			filterList.addFilter(new PageFilter(count));
		}
		
		
		//使用JGSJ索引,因为其是预分区,所以离散性较好,性能较高
		List<CarTake> result = super.queryDetailWithIndex(SysHBaseConstants.TABLE_NAME_INDEX_HPHM, scan);
		
		return result;
	}
	private byte[] getTimeByte(Date datetime) throws Exception {
		if (datetime != null) {
			return keyHelper.getBytes4Jgsj(keyHelper.formatter.format(datetime));
		} 
		return null;
	}
	@Override
	public List<CarTake> regexQueryCarList(String regexHphm, Date startDate,
			Date endDate) throws Exception {
		Scan scan = new Scan();
		//指定最多返回的Cell数目。用于防止一行中有过多的数据，导致OutofMemory错误
	//	scan.setBatch(100);
		/**
		 * 过滤器部分
		 */
		FilterList filterList=new FilterList();
		scan.setFilter(filterList);
		
		//加查询的时间范围过滤

		if(endDate!=null){
			byte[] startKey = getTimeByte(endDate);
			scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
		}	
		
		if(startDate!=null){
			byte[] stopKey = getTimeByte(startDate);
			scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)0));
		}
		
		//加车牌号码的过滤,通过正则表达式匹配实现模糊过滤
		if(regexHphm !=null && regexHphm !=""){
			//一重替换：单字符替换
			regexHphm=regexHphm.replaceAll("\\?", ".");
			//二重替换：多字符匹配的替换
			regexHphm=regexHphm.replaceAll("\\*", ".\\*");
			filterList.addFilter(JPHBaseFilterHelper.getRegRowFilter(regexHphm));
		}	
		
		//使用JGSJ索引,因为其是预分区,所以离散性较好,性能较高
		List<CarTake> result = super.queryDetailWithIndex(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ, scan);
		
		return result;
	}
	@Override
	public List<CarTake> QueryCarList(String hphm, Date startDate,Date endDate, int count) throws Exception {
		
		List<CarTake> result=null;
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        String startTime = format.format(startDate);
        String endTime = format.format(endDate);
		String query="jgsj:["+startTime+" TO "+endTime+"]";
		List<CarTakeSolr> carTakes=this.QueryCloudSolrCarList(query,0,0,1);
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
	public int CountCarList(String hphm, Date startDate, Date endDate) {
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        String startTime = format.format(startDate);
        String endTime = format.format(endDate);
		StringBuffer query=new StringBuffer();
		query.append("jgsj:["+startTime+" TO "+endTime+"]");
		
		if(hphm !=null && hphm.length()>0){
			query.append(" AND hphm:"+hphm);
		}
		int result=this.countCarList(query.toString());
		
		return result;
	}
	@Override
	public List<CarTakeSolr> QuerySolrCarList(String hphm, Date startDate,Date endDate) {
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        String startTime = format.format(startDate);
        String endTime = format.format(endDate);
		StringBuffer query=new StringBuffer();
		query.append("jgsj:["+startTime+" TO "+endTime+"]");
		
		if(hphm !=null && hphm.length()>0){
			query.append(" AND hphm:"+hphm);
		}
		return this.QueryCloudSolrCarList(query.toString(), 0, 0, 1);
	}
	@Override
	public Map<String, Long> getCarByGroup(String hphm,Date startDate,Date endDate) {
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        String startTime = format.format(startDate);
        String endTime = format.format(endDate);
		StringBuffer query=new StringBuffer();
		query.append("jgsj:["+startTime+" TO "+endTime+"]");
		
		if(hphm !=null && hphm.length()>0){
			query.append(" AND hphm:"+hphm);
		}
		return this.getSolrCarByGroup(query.toString(), "hphm", 1, 0);
	}
	@Override
	public List<CarTakeSolr> QuerySolrCarList(String query) {
		
		return this.QueryCloudSolrCarList(query, 0, 0, 1);
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
        	}
        	try {
        		results = this.getTakesWithKeys(rowKeys);
			} catch (Exception e) {
				e.printStackTrace();
			}
        	
        }
		return results;
	}

}
