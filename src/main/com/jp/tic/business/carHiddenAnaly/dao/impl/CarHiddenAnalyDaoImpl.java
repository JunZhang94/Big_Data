package com.jp.tic.business.carHiddenAnaly.dao.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.hadoop.hbase.client.Scan;
import org.apache.hadoop.hbase.filter.Filter;
import org.apache.hadoop.hbase.filter.FilterList;
import org.apache.hadoop.hbase.filter.PageFilter;
import org.apache.hadoop.hbase.filter.FilterList.Operator;
import org.springframework.stereotype.Repository;

import com.jp.tic.analyze.dao.impl.AbstractKKHBaseDao;
import com.jp.tic.analyze.dao.impl.AbstractKKSolrDao;
import com.jp.tic.business.carHiddenAnaly.dao.CarHiddenAnalyDao;
import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.common.hbase.query.JPHBaseFilterHelper;
import com.jp.tic.common.hbase.utils.BytesUtils;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.hbase.SysHBaseConstants;
import com.jp.tic.utils.lang.StringUtil;

@Repository
public class CarHiddenAnalyDaoImpl extends AbstractKKSolrDao implements CarHiddenAnalyDao{

	@Override
	public List<CarTake> queryCarTake(List<String> kkbhs, String hphm,Date startDate, Date endDate, int count) throws Exception {
		
		Scan scan=new Scan();
		
		FilterList filterList=new FilterList();
		scan.setFilter(filterList);
		
		filterList.addFilter(new PageFilter(count));
		String iHphm="";
		if(hphm !=null && hphm !="" && hphm.length()>=7){
			iHphm=hphm;
		}
		//通过index_hphm索引表查询
		if(iHphm !=""){
			//加查询的车牌号及时间范围过滤
			byte[] hphmBytes=keyHelper.getHphm4RowKeyPrefix(hphm);
			byte[] startKey;
			byte[] stopKey;
			if(endDate!=null){
				startKey = BytesUtils.add(hphmBytes,getTimeByte(endDate));
			}else{
				startKey =hphmBytes;
			}
			scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			
			if(startDate!=null){
				stopKey = BytesUtils.add(hphmBytes, getTimeByte(startDate));
			}else{
				stopKey=hphmBytes;
			}
			scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)0));
			
			
			if(kkbhs!=null && kkbhs.size()>0){
				//使用Operator.MUST_PASS_ONE等价于or
				FilterList kkbhFilterList=new FilterList(Operator.MUST_PASS_ONE);
				for(String kkbh:kkbhs){
					Filter kkbhFilter=JPHBaseFilterHelper.getSubRowFilter(kkbh);
					if(kkbhFilter!=null){
						kkbhFilterList.addFilter(kkbhFilter);
					}
				 }
				filterList.addFilter(kkbhFilterList);
			}
			return super.queryDetailWithIndex(SysHBaseConstants.TABLE_NAME_INDEX_HPHM, scan);
		}else{
			//start 
			byte[] startKey=this.getTimeByte(endDate);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			
			//stop
			byte[] stopKey=this.getTimeByte(startDate);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			if(kkbhs!=null && kkbhs.size()>0){
				//使用Operator.MUST_PASS_ONE等价于or
				FilterList kkbhFilterList=new FilterList(Operator.MUST_PASS_ONE);
				for(String kkbh:kkbhs){
					Filter kkbhFilter=JPHBaseFilterHelper.getSubRowFilter(kkbh);
					if(kkbhFilter!=null){
						kkbhFilterList.addFilter(kkbhFilter);
					}
				 }
				filterList.addFilter(kkbhFilterList);
			}
			return super.queryDetailWithIndex(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ, scan);
		}
	}
	private byte[] getTimeByte(Date datetime) throws Exception {
		if (datetime != null) {
			return keyHelper.getBytes4Jgsj(keyHelper.formatter.format(datetime));
		} 
		return null;
	}
	@Override
	public List<CarTakeSolr> querySolrCarTake(List<String> kkbhs,String hphm,Date startDate, Date endDate) {
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        String startTime = format.format(startDate);
        String endTime = format.format(endDate);
		StringBuffer query=new StringBuffer();
		query.append("jgsj:["+startTime+" TO "+endTime+"]");
		if(kkbhs.size()>0){
			query.append(" AND kkbh:("+kkbhs.get(0));
			for(int i=1;i<kkbhs.size();i++){
				query.append(" OR "+kkbhs.get(i));
			}
			query.append(")");
		}
		if(hphm !=null && hphm.length()>0){
			query.append(" AND hphm:"+hphm);
		}
		
		List<CarTakeSolr> carTakes=this.QueryCloudSolrCarList(query.toString(),0,0,1);
		return carTakes;
	}
	@Override
	public Map<String, Long> getCarByGroup(List<String> kkbhs,Date startDate, Date endDate,String groupId,int minCount,int maxCount) {
		
		Map<String, Long> resultMap = new HashMap<String, Long>();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        String startTime = format.format(startDate);
        String endTime = format.format(endDate);
		StringBuffer query=new StringBuffer();
		query.append("jgsj:["+startTime+" TO "+endTime+"]");
		if(kkbhs.size()>0){
			query.append(" AND kkbh:("+kkbhs.get(0));
			for(int i=1;i<kkbhs.size();i++){
				query.append(" OR "+kkbhs.get(i));
			}
			query.append(")");
		}
		resultMap=this.getSolrCarByGroup(query.toString(),groupId,minCount,maxCount);
		
		return resultMap;
	}
	@Override
	public Map<String, Long> getCarByGroup(String query, String groupId,int minCount, int maxCount) {
	
		Map<String, Long> resultMap = new HashMap<String, Long>();
		resultMap=this.getSolrCarByGroup(query.toString(),groupId,minCount,maxCount);
		
		return resultMap;
	}

}
