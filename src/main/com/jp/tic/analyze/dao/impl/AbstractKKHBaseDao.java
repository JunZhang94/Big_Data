package com.jp.tic.analyze.dao.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.hadoop.hbase.KeyValue;
import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.client.ResultScanner;
import org.apache.hadoop.hbase.client.Scan;
import org.apache.hadoop.hbase.filter.FilterList;
import org.apache.hadoop.hbase.filter.PageFilter;
import org.apache.hadoop.hbase.util.Bytes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.hadoop.hbase.ResultsExtractor;
import org.springframework.data.hadoop.hbase.RowMapper;

import com.jp.tic.analyze.entity.PageEntity;
import com.jp.tic.analyze.entity.SliceEntity;
import com.jp.tic.analyze.util.ResultConvertUtils;
import com.jp.tic.common.hbase.utils.BytesUtils;
import com.jp.tic.framework.hbase.JPHbaseTemplate;
import com.jp.tic.framework.hbase.JPHbaseTemplate.HBaseIterator;
import com.jp.tic.system.entity.AbstractEntity;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.hbase.JPControlKeyHelper;
import com.jp.tic.system.hbase.SysHBaseConstants;

public abstract class AbstractKKHBaseDao {
	private static Logger logger=LoggerFactory.getLogger(AbstractKKHBaseDao.class);
	
	@Autowired
	protected JPHbaseTemplate template;
	
	protected JPControlKeyHelper keyHelper=new JPControlKeyHelper();
	
	public Long getCount(final String tableName,Scan scan) throws Exception {
		
		Long count=template.find(tableName, scan, new ResultsExtractor<Long>() {
			
			@Override
			public Long extractData(ResultScanner resultScanner) throws Exception {
				long count=0;

				Iterator<Result> it = resultScanner.iterator();
				while(it.hasNext()){
					Result result = it.next();
					if(result.getRow()!=null){
						count++;
						if(count%1000==0){
							System.out.println("1k more for count:"+tableName+" count:"+count);
						}
					}
				}

				return count;
			}
		});
		
		return count;
	}
	
	public Long[] getCounts(final String tableName,Scan scan) throws Exception {
		
		Long[] count=template.find(tableName, scan, new ResultsExtractor<Long[]>() {
			
			@Override
			public Long[] extractData(ResultScanner resultScanner) throws Exception {
				long count=0;
				long hphmCount=0;
				long nonHphmCount=0;

				Iterator<Result> it = resultScanner.iterator();
				while(it.hasNext()){
					Result result = it.next();
					if(result.getRow()!=null){
						count++;
						
						String hphm=ResultConvertUtils.toRowKeyHphm(tableName, result.getRow());
						if(StringUtils.isNotEmpty(hphm)&&hphm.length()>3){
							hphmCount++;
						}
						else{
							nonHphmCount++;
						}
						
						if(count%1000==0){
							System.out.println("1k more for count:"+tableName+" count:"+count);
						}
					}
				}

				return new Long[]{count,hphmCount,nonHphmCount};
			}
		});
		
		return count;
	}
	
	public CarTake getTakeWithKey(byte[] rowkey) throws Exception {
		//query detail table
		CarTake result = template.get(SysHBaseConstants.TABLE_NAME_CAR_TAKE, rowkey, new RowMapper<CarTake>() {

			@Override
			public CarTake mapRow(Result rs, int i) throws Exception {
				CarTake data = ResultConvertUtils.toTake(rs);
				logger.debug(i + "#" + data);
				return data;
			}
		});
		return result;
	}
	
	public List<CarTake> getTakesWithKeys(List<byte[]> rowkeys) throws Exception {
		//query detail table
		List<CarTake> result = template.get(SysHBaseConstants.TABLE_NAME_CAR_TAKE, rowkeys, new RowMapper<CarTake>() {

			@Override
			public CarTake mapRow(Result rs, int i) throws Exception {
				CarTake data = ResultConvertUtils.toTake(rs);
				logger.debug(i + "#" + data);
				return data;
			}
		});
		return result;
	}
	
	public List<CarTake> getTakesWithScan(Scan scan) throws Exception {
		//query detail table
		List<CarTake> result = template.find(SysHBaseConstants.TABLE_NAME_CAR_TAKE, scan, new RowMapper<CarTake>() {

			@Override
			public CarTake mapRow(Result rs, int i) throws Exception {
				CarTake data = ResultConvertUtils.toTake(rs);
				logger.debug(i + "#" + data);
				return data;
			}
		});
		return result;
	}
	
	protected Iterator<CarTake> getTakeItWithKeyIt(final Iterator<byte[]> rowkeyIt) throws Exception {
		Iterator<CarTake> detailIt=new Iterator<CarTake>() {
			
			@Override
			public void remove() {
				rowkeyIt.remove();
			}
			
			@Override
			public CarTake next() {
				byte[] rowkey=rowkeyIt.next();
				if(rowkey!=null){
					//query detail table
					CarTake take=template.get(SysHBaseConstants.TABLE_NAME_CAR_TAKE, rowkey, new RowMapper<CarTake>() {

						@Override
						public CarTake mapRow(Result rs, int i) throws Exception {
							CarTake data = ResultConvertUtils.toTake(rs);
							logger.debug(i + "#" + data);
							return data;
						}
					});
					return take;
				}
				return null;
			}
			
			@Override
			public boolean hasNext() {
				return rowkeyIt.hasNext();
			}
		};
		
		return detailIt;
	}
	
	protected List<byte[]> queryIndexRowKeyBytes(String indexTableName,Scan scan) throws Exception {
		//query index table
		List<byte[]> rowkeys = template.find(indexTableName, scan, new RowMapper<byte[]>() {
			@Override
			public byte[] mapRow(Result rs, int i) throws Exception {
				return rs.getRow();
			}
		});
		
		return rowkeys;
	}
	
	protected List<KKRowKey> queryIndexRowKey(final String indexTableName,Scan scan) throws Exception {
		//query index table
		List<KKRowKey> rowkeys = template.find(indexTableName, scan, new RowMapper<KKRowKey>() {
			@Override
			public KKRowKey mapRow(Result rs, int i) throws Exception {
				KKRowKey key=ResultConvertUtils.toRowKey(indexTableName, rs.getRow());
				
				return key;
			}
		});
		
		return rowkeys;
	}
	
	protected Iterator<KKRowKey> queryIndexRowKeyIt(final String indexTableName,Scan scan) throws Exception {
		return template.findIt(indexTableName, scan, new RowMapper<KKRowKey>() {

			@Override
			public KKRowKey mapRow(Result rs, int i) throws Exception {
				KKRowKey key=ResultConvertUtils.toRowKey(indexTableName, rs.getRow());
				return key;
			}
		});
	}
	
	protected List<KKRowKey> queryDetailRowKey(Scan scan) throws IOException{
		//query detail table
		List<KKRowKey> rowkeys = template.find(SysHBaseConstants.TABLE_NAME_CAR_TAKE, scan, new RowMapper<KKRowKey>() {

			@Override
			public KKRowKey mapRow(Result rs, int i) throws Exception {
				KKRowKey key=ResultConvertUtils.toRowKey(SysHBaseConstants.TABLE_NAME_CAR_TAKE, rs.getRow());
				
				return key;
			}
		});
		
		return rowkeys;
	}
	
	protected Iterator<KKRowKey> getDetailRowKeyIt(Scan scan) throws IOException{
		return template.findIt(SysHBaseConstants.TABLE_NAME_CAR_TAKE, scan, new RowMapper<KKRowKey>() {

			@Override
			public KKRowKey mapRow(Result rs, int i) throws Exception {
				KKRowKey key=ResultConvertUtils.toRowKey(SysHBaseConstants.TABLE_NAME_CAR_TAKE, rs.getRow());
				return key;
			}
		});
	}
	
	protected HBaseIterator<Object[]> getIndexAndDetailRowKeyIt(final String indexTableName, Scan scan) throws IOException{
		return template.findIt(indexTableName, scan, new RowMapper<Object[]>() {

			@Override
			public Object[] mapRow(Result rs, int i) throws Exception {
				for (KeyValue kv : rs.raw()) {
					String columnName=Bytes.toString(kv.getQualifier());
					if(SysHBaseConstants.CF_INDEX_NAME_STR.equals(columnName)){
						return new Object[]{kv.getRow(),kv.getValue()};
					}
				}
				return null;
			}
		});
	}
	
	protected List<KKRowKey> queryDetailRowKeyWithIndex(final String indexTableName, Scan scan) throws Exception {
		//query index table
		List<KKRowKey> rowkeys = template.find(indexTableName, scan, new RowMapper<KKRowKey>() {

			@Override
			public KKRowKey mapRow(Result rs, int i) throws Exception {
				for (KeyValue kv : rs.raw()) {
					String columnName=Bytes.toString(kv.getQualifier());
					if(SysHBaseConstants.CF_INDEX_NAME_STR.equals(columnName)){
						KKRowKey key=ResultConvertUtils.toRowKey(indexTableName, kv.getValue());
						
						return key;
					}
				}
				return null;
			}
		});
		
		return rowkeys;
	}
	
	protected Iterator<KKRowKey> queryDetailRowKeyItWithIndex(final String indexTableName,Scan scan) throws Exception {
		return template.findIt(indexTableName, scan, new RowMapper<KKRowKey>() {

			@Override
			public KKRowKey mapRow(Result rs, int i) throws Exception {
				for (KeyValue kv : rs.raw()) {
					String columnName=Bytes.toString(kv.getQualifier());
					if(SysHBaseConstants.CF_INDEX_NAME_STR.equals(columnName)){
						KKRowKey key=ResultConvertUtils.toRowKey(SysHBaseConstants.TABLE_NAME_CAR_TAKE, kv.getValue());
						return key;
					}
				}
				return null;
			}
		});
	}
	
	protected List<byte[]> queryDetailRowKeyBytesWithIndex(String indexTableName,Scan scan) throws Exception {
		//query index table
		List<byte[]> rowkeys = template.find(indexTableName, scan, new RowMapper<byte[]>() {

			@Override
			public byte[] mapRow(Result rs, int i) throws Exception {
				for (KeyValue kv : rs.raw()) {
					String columnName=Bytes.toString(kv.getQualifier());
					if(SysHBaseConstants.CF_INDEX_NAME_STR.equals(columnName)){
						return kv.getValue();
					}
				}
				return null;
			}
		});
		
		return rowkeys;
	}
	
	protected Iterator<byte[]> queryDetailRowKeyBytesItWithIndex(String indexTableName,Scan scan) throws Exception {
		return template.findIt(indexTableName, scan, new RowMapper<byte[]>() {

			@Override
			public byte[] mapRow(Result rs, int i) throws Exception {
				for (KeyValue kv : rs.raw()) {
					String columnName=Bytes.toString(kv.getQualifier());
					if(SysHBaseConstants.CF_INDEX_NAME_STR.equals(columnName)){
						return kv.getValue();
					}
				}
				return null;
			}
		});
	}
	
	protected List<CarTake> queryDetailWithIndex(String indexTableName,Scan scan) throws Exception {
		//query index table
		List<byte[]> rowkeys = this.queryDetailRowKeyBytesWithIndex(indexTableName, scan);
		
		//query detail table
		List<CarTake> result = this.getTakesWithKeys(rowkeys);
		
		return result;
	} 
	
	protected Iterator<CarTake> queryDetailItWithIndex(String indexTableName,Scan scan) throws Exception {
		//query index table
		final Iterator<byte[]> rowkeyIt=queryDetailRowKeyBytesItWithIndex(indexTableName, scan);
		
		Iterator<CarTake> detailIt=this.getTakeItWithKeyIt(rowkeyIt);
		
		return detailIt;
	} 
	
	public PageEntity queryDetailPage(String indexTableName, Scan scan, PageEntity page) throws Exception {
		FilterList filterList=new FilterList();
		
		if(scan.getFilter() instanceof FilterList){
			filterList=(FilterList) scan.getFilter();
		}
		else{
			filterList.addFilter(scan.getFilter());
		}
		
		boolean maxLoading=page.isMaxLoading();
		
		if(maxLoading){
			//一次性查询较大量的数据
			filterList.addFilter(new PageFilter(page.getMaxQueryLoadPageSize()*page.getPageSize()+1));
		}
		else{
			//一次只查一页数据
			filterList.addFilter(new PageFilter(page.getPageSize()+1));
		}
		
		scan.setFilter(filterList);
		
		logger.debug("scan:"+scan);
		
		if(page.hasStartKey()){
			byte[] startKey=page.getStartKey();
			if(startKey!=null){
				//以分页实体中的start key作为start row
				scan.setStartRow(startKey);
				logger.debug("page query reset start key :"+BytesUtils.toValueString(startKey));
			}
		}
		
		if(page.hasEndKey()){
			byte[] endKey=page.getEndKey();
			if(endKey!=null){
				//以分页实体中的end key作为stop row
				scan.setStopRow(endKey);
				logger.debug("page query reset stop key :"+BytesUtils.toValueString(endKey));
			}
		}
		
		//query index table
		List<Object[]> tempKeys = template.find(indexTableName, scan, new RowMapper<Object[]>() {

			@Override
			public Object[] mapRow(Result rs, int i) throws Exception {
				for (KeyValue kv : rs.raw()) {
					String columnName=Bytes.toString(kv.getQualifier());
					if(SysHBaseConstants.CF_INDEX_NAME_STR.equals(columnName)){
						return new Object[]{kv.getRow(),kv.getValue()};
					}
				}
				return null;
			}
		});
		
		List<byte[]> rowKeys=new ArrayList<byte[]>();
		List<byte[]> indexKeys=new ArrayList<byte[]>();
		for(int i=0;i<tempKeys.size();i++){
			if(tempKeys.get(i)!=null){
				indexKeys.add((byte[])tempKeys.get(i)[0]);
				
				if(page.isCacheAllData()){
					//内存分页时,查询所有记录
					rowKeys.add((byte[])tempKeys.get(i)[1]);
				}
				else{
					if(i<page.getPageSize()){
						//预加载时,查询单页记录
						rowKeys.add((byte[])tempKeys.get(i)[1]);
					}
				}
			}
		}
		
		//query detail table
		List<CarTake> result = this.getTakesWithKeys(rowKeys);
		
		page.addQueryResult(result, indexKeys);
		
		return page;
	}
	
	protected SliceEntity queryDetailSlice(String indexTableName, Scan scan, SliceEntity slice, FilterList filterList) throws Exception {
		logger.debug("scan:"+scan);
		
		byte[] startKey=slice.getEndKeyBytes();
		if(startKey!=null){
			//以分页实体中的start key作为start row
			scan.setStartRow(startKey);
			logger.debug("page query reset start key :"+BytesUtils.toValueString(startKey));
		}
		
		HBaseIterator<Object[]> keysIt = getIndexAndDetailRowKeyIt(indexTableName, scan);
		
		int index=0;
		ArrayList<CarTake> result = new ArrayList<CarTake>();
		
		while(keysIt.hasNext()){
			Object[] keys=keysIt.next();			
			
			CarTake take=null;
			
			if(filterList!=null){
				Scan temp=new Scan();
				
				temp.setStartRow((byte[]) keys[1]);
				temp.setStopRow((byte[]) keys[1]);
				//scan.setFilter(filterList);
				temp.setFilter(filterList);
				
				List<CarTake> takes = getTakesWithScan(temp);
				if(takes!=null&&takes.size()>0){
					take=takes.get(0);
				}
				
				if(takes.size()>1){
					logger.error(">>>>>>>>>>>>>>>>>>get by key get two row"+slice);
				}
			}
			else{
				take=getTakeWithKey((byte[]) keys[1]);
			}
			
			
			if(take!=null){
				index++;
				
				if(index<=slice.getCount()){
					result.add(take);
				}
				
				if(index>=slice.getCount()+1){
					slice.addResult(result, (byte[]) keys[0]);
					keysIt.close();
					break;
				}
			}
		}
		if(index<slice.getCount()+1){
			//less than count records
			slice.addResult(result, null);
		}
		
		return slice;
	}
	
	public static class KKRowKey extends AbstractEntity{
		private byte[] rawkey;
		private String kkbh;
		private String hphm;
		private String hpzl;
		private Date jgsj;
		private String sbbh;
		private String fxbh;
		private String cdbh;
		private String hpys;
		
		public byte[] getRawkey() {
			return rawkey;
		}
		public void setRawkey(byte[] rawkey) {
			this.rawkey = rawkey;
		}
		public String getKkbh() {
			return kkbh;
		}
		public void setKkbh(String kkbh) {
			this.kkbh = kkbh;
		}
		public String getHphm() {
			return hphm;
		}
		public void setHphm(String hphm) {
			this.hphm = hphm;
		}
		public String getHpzl() {
			return hpzl;
		}
		public void setHpzl(String hpzl) {
			this.hpzl = hpzl;
		}
		public Date getJgsj() {
			return jgsj;
		}
		public void setJgsj(Date jgsj) {
			this.jgsj = jgsj;
		}
		public String getSbbh() {
			return sbbh;
		}
		public void setSbbh(String sbbh) {
			this.sbbh = sbbh;
		}
		public String getFxbh() {
			return fxbh;
		}
		public void setFxbh(String fxbh) {
			this.fxbh = fxbh;
		}
		public String getCdbh() {
			return cdbh;
		}
		public void setCdbh(String cdbh) {
			this.cdbh = cdbh;
		}
		public String getHpys() {
			return hpys;
		}
		public void setHpys(String hpys) {
			this.hpys = hpys;
		}
	}
}
