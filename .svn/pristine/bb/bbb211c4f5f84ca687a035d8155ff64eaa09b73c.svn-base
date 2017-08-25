package com.jp.tic.analyze.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.Map.Entry;

import org.apache.commons.lang.StringUtils;
import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.client.Scan;
import org.apache.hadoop.hbase.filter.Filter;
import org.apache.hadoop.hbase.filter.FilterList;
import org.apache.hadoop.hbase.filter.PageFilter;
import org.apache.hadoop.hbase.filter.SingleColumnValueFilter;
import org.apache.hadoop.hbase.filter.FilterList.Operator;
import org.apache.hadoop.hbase.util.Bytes;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrQuery.ORDER;
import org.apache.solr.client.solrj.impl.CloudSolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.params.GroupParams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.hadoop.hbase.RowMapper;
import org.springframework.stereotype.Repository;

import com.jp.tic.analyze.dao.CarTakeDao;
import com.jp.tic.analyze.entity.PageEntity;
import com.jp.tic.analyze.entity.SliceEntity;
import com.jp.tic.analyze.rule.FummyCarRule;
import com.jp.tic.analyze.util.ResultConvertUtils;
import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.common.hbase.query.JPHBaseFilterHelper;
import com.jp.tic.common.hbase.utils.BytesUtils;
import com.jp.tic.common.util.DataUtils;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.common.util.SolrUtils;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.hbase.JPControlKeyHelper;
import com.jp.tic.system.hbase.SysHBaseConstants;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.sun.corba.se.spi.orb.StringPair;

@Repository
public class CarTakeDaoImpl extends AbstractKKHBaseDao implements CarTakeDao {
	private static Logger logger=LoggerFactory.getLogger(CarTakeDaoImpl.class);
	
	private JPControlKeyHelper keyHelper=new JPControlKeyHelper();
	@Autowired
	DataUtils dataUtil;
	
	/**
	 * 查询车辆行驶轨迹
	 * @param 车牌号码
	 * @param 开始时间
	 * @param 结束时间
	 * @param 记录数量
	 * @return 车辆行驶轨迹
	 * @throws Exception
	 */
	public List<CarTake> getCarTrace(String hphm, Date startDate, Date endDate, int count) throws Exception {
		Scan scan = new Scan();
		
		scan.setBatch(100);
		
		FilterList filterList=new FilterList();
		filterList.addFilter(JPHBaseFilterHelper.getPrefixFilter(keyHelper.getHphm4RowKeyPrefix(hphm)));
		if(count<=0){
			count=10;
		}
		filterList.addFilter(new PageFilter(count));
		scan.setFilter(filterList);
		
		byte[] hphmBytes = keyHelper.getHphm4RowKeyPrefix(hphm);
		
		if(startDate!=null){
			byte[] timeBytes = getTimeByte(startDate);
			byte[] stopKey = Bytes.add(hphmBytes, timeBytes);
			scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
		}
		else{
			scan.setStopRow(BytesUtils.padTail(hphmBytes, 100, (byte)255));
		}
		
		if(endDate!=null){
			byte[] timeBytes = getTimeByte(endDate);
			byte[] startKey = Bytes.add(hphmBytes, timeBytes);
			scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
		}
		else{
			scan.setStartRow(BytesUtils.padTail(hphmBytes, 100, (byte)0));
		}
		
		logger.debug("scan:"+scan);
		
		List<CarTake> result = super.queryDetailWithIndex(SysHBaseConstants.TABLE_NAME_INDEX_HPHM, scan);
		
		return result;
	}
	
	/**
	 * 查询一个卡口一段时间内的最新若干条记录
	 * @param 卡口编号
	 * @param 开始时间
	 * @param 结束时间
	 * @param 记录数量
	 * @return 卡口过车记录快照
	 * @throws Exception
	 */
	public List<CarTake> getMountSnapshot(String kkbh, Date startDate, Date endDate, int count) throws Exception {
		Scan scan = new Scan();
		
		scan.setBatch(100);
		
		FilterList filterList=new FilterList();
		filterList.addFilter(JPHBaseFilterHelper.getPrefixFilter(keyHelper.getKkbh4RowKeyPrefix(kkbh)));
		if(count<=0){
			count=10;
		}
		filterList.addFilter(new PageFilter(count));
		scan.setFilter(filterList);
		
		byte[] kkbhBytes = keyHelper.getKkbh4RowKeyPrefix(kkbh);
		
		if(startDate!=null){
			byte[] timeBytes = getTimeByte(startDate);
			byte[] stopKey = Bytes.add(kkbhBytes, timeBytes);
			scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
		}
		else{
			scan.setStopRow(BytesUtils.padTail(kkbhBytes, 100, (byte)255));
		}
		
		if(endDate!=null){
			byte[] timeBytes = getTimeByte(endDate);
			byte[] startKey = Bytes.add(kkbhBytes, timeBytes);
			scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
		}
		else{
			scan.setStartRow(BytesUtils.padTail(kkbhBytes, 100, (byte)0));
		}
		
		logger.debug("scan:"+scan);
		
		List<CarTake> result = super.queryDetailWithIndex(SysHBaseConstants.TABLE_NAME_INDEX_KKBH, scan);
		
		return result;
	}
	/**
	 * 查询一个卡口一段时间内的最新若干条记录
	 * @param 卡口编号
	 * @param 开始时间
	 * @param 结束时间
	 * @param 记录数量
	 * @return 卡口过车记录快照
	 * @throws Exception
	 */
	public List<CarTake> getMountSnapshotByfx(String kkbh,String fxbh, Date startDate, Date endDate, int count) throws Exception {
		Scan scan = new Scan();
		scan.setBatch(100);
		
		FilterList filterList=new FilterList();
		filterList.addFilter(JPHBaseFilterHelper.getPrefixFilter(keyHelper.getKkbh4RowKeyPrefix(kkbh)));
		if(count<=0){
			count=10;
		}
		filterList.addFilter(new PageFilter(count));
		scan.setFilter(filterList);
		
		byte[] kkbhBytes = keyHelper.getKkbh4RowKeyPrefix(kkbh);
		
		if(startDate!=null){
			byte[] timeBytes = getTimeByte(startDate);
			byte[] stopKey = Bytes.add(kkbhBytes, timeBytes);
			scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
		}
		else{
			scan.setStopRow(BytesUtils.padTail(kkbhBytes, 100, (byte)255));
		}
		
		if(endDate!=null){
			byte[] timeBytes = getTimeByte(endDate);
			byte[] startKey = Bytes.add(kkbhBytes, timeBytes);
			scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
		}
		else{
			scan.setStartRow(BytesUtils.padTail(kkbhBytes, 100, (byte)0));
		}
		
		Filter fxbhFilter = getFxbhFilter(fxbh, SysHBaseConstants.TABLE_NAME_INDEX_KKBH);
		if(fxbhFilter!=null){
			filterList.addFilter(fxbhFilter);
		}
		
		logger.debug("scan:"+scan);
		
		List<CarTake> result = super.queryDetailWithIndex(SysHBaseConstants.TABLE_NAME_INDEX_KKBH, scan);
		
		return result;
	}
	
	/**
	 * 查询多个卡口在一个时间段内的最新的若干记录，并合并结果集
	 * @param 卡口编号列表
	 * @param 开始时间
	 * @param 结束时间
	 * @param 每个卡口过车记录数量
	 * @return 卡口过车记录快照
	 * @throws Exception
	 */
	public List<CarTake> getMountSnapshot(List<String> kkbhs, Date startDate, Date endDate, int count) throws Exception {
		List<CarTake> takes=new ArrayList<CarTake>();
		
		for(String kkbh:kkbhs){
			takes.addAll(this.getMountSnapshot(kkbh, startDate, endDate, count));
		}
		
		return takes;
	}
	
	/**
	 * 查询多个卡口在一个时间段内的最新的若干记录，并合并结果集
	 * @param 方向编号列表
	 * @param 开始时间
	 * @param 结束时间
	 * @param 每个卡口过车记录数量
	 * @return 卡口过车记录快照
	 * @throws Exception
	 */
	public List<CarTake> getMountSnapshotByfx(String kkbh,List<String> fxbhs, Date startDate, Date endDate, int count) throws Exception {
		List<CarTake> takes=new ArrayList<CarTake>();
		
		for(String fxbh:fxbhs){
			takes.addAll(this.getMountSnapshotByfx(kkbh, fxbh,startDate, endDate, count));
		}
		
		return takes;
	}
	/**
	 * 查询多个车牌号码在一个时间段内若干(总的)过车记录
	 * @param 车牌号码列表
	 * @param 开始时间
	 * @param 结束时间
	 * @param 总记录数量
	 * @return 车辆记录快照
	 * @throws Exception
	 */
	public List<CarTake> getCarSnapshot(List<String> hphms, Date startDate, Date endDate, int count) throws Exception {
		Scan scan = new Scan();
		
		scan.setBatch(100);
		
		TreeSet<String> set=new TreeSet<String>(hphms);
		FilterList filterList=new FilterList();
		FilterList hphmFilterList=new FilterList(Operator.MUST_PASS_ONE);
		for(String kkbh:set){
			hphmFilterList.addFilter(JPHBaseFilterHelper.getPrefixFilter(keyHelper.getHphm4RowKeyPrefix(kkbh)));
		}
		if(count<=0){
			count=10;
		}
		filterList.addFilter(hphmFilterList);
		filterList.addFilter(new PageFilter(count));
		scan.setFilter(filterList);
		
		if(startDate!=null){
			byte[] hphmBytes = keyHelper.getHphm4RowKeyPrefix(set.last());
			byte[] timeBytes = getTimeByte(startDate);
			byte[] stopKey = Bytes.add(hphmBytes, timeBytes);
			scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
		}
		
		if(endDate!=null){
			byte[] hphmBytes = keyHelper.getHphm4RowKeyPrefix(set.first());
			byte[] timeBytes = getTimeByte(endDate);
			byte[] startKey = Bytes.add(hphmBytes, timeBytes);
			scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
		}
		
		logger.debug("scan:"+scan);
		
		List<CarTake> result = super.queryDetailWithIndex(SysHBaseConstants.TABLE_NAME_INDEX_HPHM, scan);
		
		return result;
	}
	
	/**
	 * 对一定时间段内的套牌车分析
	 * @param 开始时间
	 * @param 结束时间
	 * @return 套牌车结果集
	 * @throws Exception
	 */
	public List<CarTake[]> getDummyCar(Date startDate, Date endDate, FummyCarRule rule) throws Exception {
		if(startDate==null||endDate==null){
			return null;
		}
		
		Scan scan = new Scan();
		
		scan.setBatch(100);
		
		FilterList filterList=new FilterList();
		scan.setFilter(filterList);
		
		if(startDate!=null){
			byte[] timeBytes = getTimeByte(startDate);
			scan.setStopRow(BytesUtils.padTail(timeBytes, 100, (byte)255));
		}
		
		if(endDate!=null){
			byte[] timeBytes = getTimeByte(endDate);
			scan.setStartRow(BytesUtils.padTail(timeBytes, 100, (byte)0));
		}
		
		Iterator<CarTake> it = super.queryDetailItWithIndex(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ, scan);

		List<CarTake[]> list=new ArrayList<CarTake[]>();
		
		CarTake lastMatch=null;
		
		CarTake last=null;
		Map<String, CarTake> hphms=new HashMap<String, CarTake>();
		while(it.hasNext()){
			CarTake take = it.next();
			
			//由于号牌种类影响,可能会出现大量误报的情况,所以要使用号牌种类和号牌作为同一辆车的标识
			String key=take.getHphm()+"_"+take.getHpzl();
			
			logger.trace(key+" "+take.getJgsj());
			
			if(hphms.containsKey(key)){
				//same hphm and hpzl
				last=hphms.get(key);
			}
			else{
				if(last!=null && take.getHphm()!=null && take.getHphm().equals(last.getHphm())){
					//new hpzl
					hphms.put(key,take);
					logger.debug("update hphm_hpzl :"+key);
					continue;
				}
				else{
					//new hphm;
					hphms.put(key,take);
					logger.debug("update hphm:"+key);
					continue;
				}
			}
			
			logger.debug(take.getHphm()+" now:"+take.getJgsj()+" last:"+last.getJgsj());
			
			Map<String, Object> map = rule.filter(take, last);
			if(map!=null){
				//新发现套牌车
				CarTake temp = new CarTake();
				temp.setClsd((Double)map.get("clsd"));
				list.add(new CarTake[]{last,take,temp});
				
				logger.info("new fake hphm:"+take.getHphm()+" speed:"+temp.getClsd());
				hphms.remove(key);
			}
			else{
				hphms.put(key, take);
			}
		}
		
		return list;
	}
	
	/**
	 * 查询一个卡口，一天里24小时的的车流量，共24个数字
	 * @param 卡口编号
	 * @param 时间
	 * @return 返回指定卡口编号一天里,24小时每个小时的车流量
	 * @throws Exception
	 */
	public Map<Date[],Long[]> getCount4MountCount(String kkbh,Date date) throws Exception{
		if(date==null){
			return null;
		}
		
		Map<Date[],Long[]> counts=new HashMap<Date[], Long[]>();
		
		Calendar cal=Calendar.getInstance();
		cal.setTime(date);
		
		for(int i=0;i<24;i++){
			//每一小时查询一次
			Calendar start=((Calendar)cal.clone());
			Calendar end=((Calendar)cal.clone());
			start.add(Calendar.HOUR_OF_DAY, i);
			end.add(Calendar.HOUR_OF_DAY, i+1);
			
			Scan scan = new Scan();
			
			scan.setBatch(100);
			
			FilterList filterList=new FilterList();
			filterList.addFilter(JPHBaseFilterHelper.getPrefixFilter(keyHelper.getKkbh4RowKeyPrefix(kkbh)));
			filterList.addFilter(JPHBaseFilterHelper.getCountFilter());
			scan.setFilter(filterList);
			
			byte[] kkbhBytes = keyHelper.getKkbh4RowKeyPrefix(kkbh);
			
			if(start!=null){
				byte[] timeBytes = getTimeByte(start.getTime());
				byte[] stopKey = Bytes.add(kkbhBytes, timeBytes);
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			
			if(end!=null){
				byte[] timeBytes = getTimeByte(end.getTime());
				byte[] startKey = Bytes.add(kkbhBytes, timeBytes);
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			
			Long[] count = super.getCounts(SysHBaseConstants.TABLE_NAME_INDEX_KKBH, scan);
			counts.put(new Date[]{start.getTime(),end.getTime()}, count);
		}
		
		return counts;
	}
	
	/**
	 * 多条件无分页查询
	 * @param kkbh
	 * @param startDate
	 * @param endDate
	 * @param hphm
	 * @param count
	 * @return
	 * @throws Exception
	 */
	public List<CarTake> queryCarTake(String kkbhStr,Date startDate,Date endDate, String hphmStr, int count, boolean fummyHphm) throws Exception {
		Scan scan=new Scan();
		
		FilterList filterList=new FilterList();
		scan.setFilter(filterList);
		
		filterList.addFilter(new PageFilter(count));
		
		List<String> fxbhs = new ArrayList<String>();
		if (StringUtil.checkStr(kkbhStr)) {
			fxbhs.add(kkbhStr);
		}
		List<String> hphms = new ArrayList<String>();
		if (StringUtil.checkStr(hphmStr)) {
			hphms.add(hphmStr);
		}
		List<String> kkbhs = new ArrayList<String>();
		if(hphms.size()==1&&hphms.get(0).length()>=7){
			String hphm = hphms.get(0);
			//String kkbh = kkbhs.get(0);
			byte[] startKey=this.getBytes4Hphm(endDate, hphm, null, false);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			
			//stop
			byte[] stopKey=this.getBytes4Hphm(startDate, hphm, null, false);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			
			//Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_HPHM);
			//if(kkbhFilter!=null){
			//	filterList.addFilter(kkbhFilter);
			//}
			if(kkbhs!=null && kkbhs.size()>0){
				FilterList kkbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String kkbh:kkbhs){
					Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
					if(kkbhFilter!=null){
						kkbhFilterList.addFilter(kkbhFilter);
					}
				}
				filterList.addFilter(kkbhFilterList);
			}
			if(fxbhs!=null && fxbhs.size()>0){
				FilterList fxbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String fxbh:fxbhs){
					Filter fxbhFilter = getFxbhFilter(fxbh, SysHBaseConstants.TABLE_NAME_INDEX_HPHM);
					if(fxbhFilter!=null){
						fxbhFilterList.addFilter(fxbhFilter);
					}
				}
				filterList.addFilter(fxbhFilterList);
			}
			Filter hphmFilter=getHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_HPHM,false);
			if(hphmFilter!=null){
				filterList.addFilter(hphmFilter);
			}
			return super.queryDetailWithIndex(SysHBaseConstants.TABLE_NAME_INDEX_HPHM, scan);
		} else if (fxbhs.size() == 1) {
			String kkbh = fxbhs.get(0);
			
			byte[] startKey=this.getBytes4Kkbh(endDate, null, kkbh, false);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			if(hphms!=null && hphms.size()>0){
				FilterList hphmFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String hphm:hphms){
					Filter hphmFilter=getRegHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
					if(hphmFilter!=null){
						hphmFilterList.addFilter(hphmFilter);
					}
				}
				filterList.addFilter(hphmFilterList);
			}
			byte[] stopKey=this.getBytes4Kkbh(startDate, null, kkbh, false);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			return super.queryDetailWithIndex(SysHBaseConstants.TABLE_NAME_INDEX_KKBH, scan);
		} else{
			//使用JGSJ索引,因为其是预分区,所以离散性较好,性能较高
			
			//start 
			byte[] startKey=this.getBytes4Jgsj(endDate, null, null, false);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			
			//stop
			byte[] stopKey=this.getBytes4Jgsj(startDate, null, null, false);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			
			if(kkbhs!=null && kkbhs.size()>0){
				FilterList kkbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String kkbh:kkbhs){
					Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
					if(kkbhFilter!=null){
						kkbhFilterList.addFilter(kkbhFilter);
					}
				}
				filterList.addFilter(kkbhFilterList);
			}
			
			if(hphms!=null && hphms.size()>0){
				FilterList hphmFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String hphm:hphms){
					Filter hphmFilter=getHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_JGSJ,false);
					if(hphmFilter!=null){
						hphmFilterList.addFilter(hphmFilter);
					}
				}
				filterList.addFilter(hphmFilterList);
			}
			if(fxbhs!=null && fxbhs.size()>0){
				FilterList fxbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String fxbh:fxbhs){
					Filter fxbhFilter = getFxbhFilter(fxbh, SysHBaseConstants.TABLE_NAME_INDEX_HPHM);
					if(fxbhFilter!=null){
						fxbhFilterList.addFilter(fxbhFilter);
					}
				}
				filterList.addFilter(fxbhFilterList);
			}
			return super.queryDetailWithIndex(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ, scan);
		}
		
	}
	
	/**
	 * 多条件分页查询
	 * @param 卡口编号
	 * @param 开始时间
	 * @param 结束时间
	 * @param 号牌号码
	 * @param 分页对象
	 * @return 分页结果
	 * @throws Exception
	 */
	public PageEntity queryCarTake(String kkbh,Date startDate,Date endDate, String hphm, PageEntity page) throws Exception {
		return this.queryCarTake(kkbh, startDate, endDate, hphm, page, false);
	}
	
	/**
	 * 多条件分页查询
	 * @param 卡口编号
	 * @param 开始时间
	 * @param 结束时间
	 * @param 号牌号码
	 * @param 分页对象
	 * @param 是否模糊匹配
	 * @return 分页结果
	 * @throws Exception
	 */
	public PageEntity queryCarTake(String kkbh,Date startDate,Date endDate, String hphm, PageEntity page, boolean fummyHphm) throws Exception {
		Scan scan=new Scan();
		
		FilterList filterList=new FilterList();
		scan.setFilter(filterList);
		
		if(startDate!=null&&endDate!=null){
			//使用JGSJ索引,因为其是预分区,所以离散性较好,性能较高
			
			//start 
			byte[] startKey=this.getBytes4Jgsj(endDate, hphm, kkbh, fummyHphm);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			
			//stop
			byte[] stopKey=this.getBytes4Jgsj(startDate, hphm, kkbh, fummyHphm);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			
			Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
			if(kkbhFilter!=null){
				filterList.addFilter(kkbhFilter);
			}
			
			Filter hphmFilter=getHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_JGSJ,fummyHphm);
			if(hphmFilter!=null){
				filterList.addFilter(hphmFilter);
			}
			
			return super.queryDetailPage(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ, scan, page);
		}
		else if(kkbh!=null){
			//使用KKBH索引
			
			//start 
			byte[] startKey=this.getBytes4Kkbh(endDate, hphm, kkbh, fummyHphm);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			
			//stop
			byte[] stopKey=this.getBytes4Kkbh(startDate, hphm, kkbh, fummyHphm);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			
			Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_KKBH);
			if(kkbhFilter!=null){
				filterList.addFilter(kkbhFilter);
			}
			
			Filter hphmFilter=getHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_KKBH,fummyHphm);
			if(hphmFilter!=null){
				filterList.addFilter(hphmFilter);
			}
			
			return super.queryDetailPage(SysHBaseConstants.TABLE_NAME_INDEX_KKBH, scan, page);
		}
		else if(hphm!=null&&fummyHphm==false){
			//使用HPHM索引
			
			//start 
			byte[] startKey=this.getBytes4Hphm(endDate, hphm, kkbh, fummyHphm);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			
			//stop
			byte[] stopKey=this.getBytes4Hphm(startDate, hphm, kkbh, fummyHphm);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			
			Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_HPHM);
			if(kkbhFilter!=null){
				filterList.addFilter(kkbhFilter);
			}
			
			Filter hphmFilter=getHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_HPHM,fummyHphm);
			if(hphmFilter!=null){
				filterList.addFilter(hphmFilter);
			}
			
			return super.queryDetailPage(SysHBaseConstants.TABLE_NAME_INDEX_HPHM, scan, page);
		}
		else{
			//使用JGSJ索引
			
			//start 
			byte[] startKey=this.getBytes4Jgsj(endDate, hphm, kkbh, fummyHphm);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			
			//stop
			byte[] stopKey=this.getBytes4Jgsj(startDate, hphm, kkbh, fummyHphm);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			
			Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
			if(kkbhFilter!=null){
				filterList.addFilter(kkbhFilter);
			}
			
			Filter hphmFilter=getHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_JGSJ,fummyHphm);
			if(hphmFilter!=null){
				filterList.addFilter(hphmFilter);
			}
			
			return super.queryDetailPage(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ, scan, page);
		}
	}
	
	@Override
	public PageEntity queryCarTake(Date startDate, Date endDate, List<String> kkbhs, List<String> hphms, PageEntity page) throws Exception {
		Scan scan=new Scan();
		
		FilterList filterList=new FilterList();
		scan.setFilter(filterList);
		 
		if(hphms.size()==1&&hphms.get(0).length()>=7){
			String hphm = hphms.get(0);
			//String kkbh = kkbhs.get(0);
			byte[] startKey=this.getBytes4Hphm(endDate, hphm, null, false);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			
			//stop
			byte[] stopKey=this.getBytes4Hphm(startDate, hphm, null, false);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			
			//Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_HPHM);
			//if(kkbhFilter!=null){
			//	filterList.addFilter(kkbhFilter);
			//}
			if(kkbhs!=null && kkbhs.size()>0){
				FilterList kkbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String kkbh:kkbhs){
					Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
					if(kkbhFilter!=null){
						kkbhFilterList.addFilter(kkbhFilter);
					}
				}
				filterList.addFilter(kkbhFilterList);
			}
			
			Filter hphmFilter=getHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_HPHM,false);
			if(hphmFilter!=null){
				filterList.addFilter(hphmFilter);
			}
			
			return super.queryDetailPage(SysHBaseConstants.TABLE_NAME_INDEX_HPHM, scan, page);
		}else{
			//使用JGSJ索引,因为其是预分区,所以离散性较好,性能较高
			
			//start 
			byte[] startKey=this.getBytes4Jgsj(endDate, null, null, false);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			
			//stop
			byte[] stopKey=this.getBytes4Jgsj(startDate, null, null, false);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			
			if(kkbhs!=null && kkbhs.size()>0){
				FilterList kkbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String kkbh:kkbhs){
					Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
					if(kkbhFilter!=null){
						kkbhFilterList.addFilter(kkbhFilter);
					}
				}
				filterList.addFilter(kkbhFilterList);
			}
			
			if(hphms!=null && hphms.size()>0){
				FilterList hphmFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String hphm:hphms){
					Filter hphmFilter=getHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_JGSJ,false);
					if(hphmFilter!=null){
						hphmFilterList.addFilter(hphmFilter);
					}
				}
				filterList.addFilter(hphmFilterList);
			}
			
			return super.queryDetailPage(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ, scan, page);
		}
	}
	/**
	 * 
	 * 原有条件加方向编号
	 */
	@Override
	public PageEntity queryCarTake4fxbh(Date startDate, Date endDate,
			List<String> kkbhs, List<String> hphms, List<String> fxbhs,
			String hpys,String carBrand,String carType,String carYear, PageEntity page) throws Exception {
		// TODO Auto-generated method stub
		Scan scan=new Scan();
		
		FilterList filterList=new FilterList();
		scan.setFilter(filterList);
		 
		if(hphms.size()==1&&hphms.get(0).length()>=7 && !StringUtil.checkStr(hpys)&& !StringUtil.checkStr(carBrand)){
			String hphm = hphms.get(0);
			//String kkbh = kkbhs.get(0);
			byte[] startKey=this.getBytes4Hphm(endDate, hphm, null, false);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			
			//stop
			byte[] stopKey=this.getBytes4Hphm(startDate, hphm, null, false);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			
			//Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_HPHM);
			//if(kkbhFilter!=null){
			//	filterList.addFilter(kkbhFilter);
			//}
			if(kkbhs!=null && kkbhs.size()>0){
				FilterList kkbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String kkbh:kkbhs){
					Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
					if(kkbhFilter!=null){
						kkbhFilterList.addFilter(kkbhFilter);
					}
				}
				filterList.addFilter(kkbhFilterList);
			}
			if(fxbhs!=null && fxbhs.size()>0){
				FilterList fxbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String fxbh:fxbhs){
					Filter fxbhFilter = getFxbhFilter(fxbh, SysHBaseConstants.TABLE_NAME_INDEX_HPHM);
					if(fxbhFilter!=null){
						fxbhFilterList.addFilter(fxbhFilter);
					}
				}
				filterList.addFilter(fxbhFilterList);
			}
			Filter hphmFilter=getHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_HPHM,false);
			if(hphmFilter!=null){
				filterList.addFilter(hphmFilter);
			}
			return super.queryDetailPage(SysHBaseConstants.TABLE_NAME_INDEX_HPHM, scan, page);
		} else if (fxbhs.size() == 1 && !StringUtil.checkStr(hpys)&& !StringUtil.checkStr(carBrand)) {
			String kkbh = fxbhs.get(0);
			
			byte[] startKey=this.getBytes4Kkbh(endDate, null, kkbh, false);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			if(hphms!=null && hphms.size()>0){
				FilterList hphmFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String hphm:hphms){
					Filter hphmFilter=getRegHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
					if(hphmFilter!=null){
						hphmFilterList.addFilter(hphmFilter);
					}
				}
				filterList.addFilter(hphmFilterList);
			}
			byte[] stopKey=this.getBytes4Kkbh(startDate, null, kkbh, false);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			return super.queryDetailPage(SysHBaseConstants.TABLE_NAME_INDEX_KKBH, scan, page);
		} else if (StringUtil.checkStr(hpys)&& !StringUtil.checkStr(carBrand)) {
			//start 
			byte[] startKey=this.getBytes4Hpys(hpys, endDate, null, null, false);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			
			//stop
			byte[] stopKey=this.getBytes4Hpys(hpys, startDate, null, null, false);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			
			if(kkbhs!=null && kkbhs.size()>0){
				FilterList kkbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String kkbh:kkbhs){
					Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
					if(kkbhFilter!=null){
						kkbhFilterList.addFilter(kkbhFilter);
					}
				}
				filterList.addFilter(kkbhFilterList);
			}
			
			if(hphms!=null && hphms.size()>0){
				FilterList hphmFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String hphm:hphms){
					Filter hphmFilter=getRegHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
					if(hphmFilter!=null){
						hphmFilterList.addFilter(hphmFilter);
					}
				}
				filterList.addFilter(hphmFilterList);
			}
			if(fxbhs!=null && fxbhs.size()>0){
				FilterList fxbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String fxbh:fxbhs){
					Filter fxbhFilter = getFxbhFilter(fxbh, SysHBaseConstants.TABLE_NAME_INDEX_HPHM);
					if(fxbhFilter!=null){
						fxbhFilterList.addFilter(fxbhFilter);
					}
				}
				filterList.addFilter(fxbhFilterList);
			}
			Filter hpysFilter= JPHBaseFilterHelper.getPrefixFilter(hpys);
			if(hpysFilter!=null){
				filterList.addFilter(hpysFilter);
			}
			return super.queryDetailPage(SysHBaseConstants.TABLE_NAME_INDEX_HPYS, scan, page);
		}
		else if (StringUtil.checkStr(carBrand)&& !StringUtil.checkStr(carType)) {
			
			byte[] startKey=this.getBytes4CarBrand(endDate, carBrand);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			byte[] stopKey=this.getBytes4CarBrand(startDate, carBrand);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			//对卡口编号的过滤
			if(kkbhs!=null && kkbhs.size()>0){
				FilterList kkbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String kkbh:kkbhs){
					Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
					if(kkbhFilter!=null){
						kkbhFilterList.addFilter(kkbhFilter);
					}
				}
				filterList.addFilter(kkbhFilterList);
			}
			//号牌号码过滤
			if(hphms!=null && hphms.size()>0){
				FilterList hphmFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String hphm:hphms){
					Filter hphmFilter=getRegHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
					if(hphmFilter!=null){
						hphmFilterList.addFilter(hphmFilter);
					}
				}
				filterList.addFilter(hphmFilterList);
			}
			//方向编号过滤
			if(fxbhs!=null && fxbhs.size()>0){
				FilterList fxbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String fxbh:fxbhs){
					Filter fxbhFilter = getFxbhFilter(fxbh, SysHBaseConstants.TABLE_NAME_INDEX_HPHM);
					if(fxbhFilter!=null){
						fxbhFilterList.addFilter(fxbhFilter);
					}
				}
				filterList.addFilter(fxbhFilterList);
			}
			return super.queryDetailPage(SysHBaseConstants.TABLE_NAME_INDEX_BR, scan, page);
		}else if (StringUtil.checkStr(carType)) {
			
			byte[] startKey=this.getBytes4CarBt(endDate, carBrand,carType);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			byte[] stopKey=this.getBytes4CarBt(startDate,carBrand,carType);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			//对卡口编号的过滤
			if(kkbhs!=null && kkbhs.size()>0){
				FilterList kkbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String kkbh:kkbhs){
					Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
					if(kkbhFilter!=null){
						kkbhFilterList.addFilter(kkbhFilter);
					}
				}
				filterList.addFilter(kkbhFilterList);
			}
			//号牌号码过滤
			if(hphms!=null && hphms.size()>0){
				FilterList hphmFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String hphm:hphms){
					Filter hphmFilter=getRegHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
					if(hphmFilter!=null){
						hphmFilterList.addFilter(hphmFilter);
					}
				}
				filterList.addFilter(hphmFilterList);
			}
			//方向编号过滤
			if(fxbhs!=null && fxbhs.size()>0){
				FilterList fxbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String fxbh:fxbhs){
					Filter fxbhFilter = getFxbhFilter(fxbh, SysHBaseConstants.TABLE_NAME_INDEX_HPHM);
					if(fxbhFilter!=null){
						fxbhFilterList.addFilter(fxbhFilter);
					}
				}
				filterList.addFilter(fxbhFilterList);
			}
			return super.queryDetailPage(SysHBaseConstants.TABLE_NAME_INDEX_BT, scan, page);
		} 
		else{
			//使用JGSJ索引,因为其是预分区,所以离散性较好,性能较高
			
			//start 
			byte[] startKey=this.getBytes4Jgsj(endDate, null, null, false);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			
			//stop
			byte[] stopKey=this.getBytes4Jgsj(startDate, null, null, false);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			
			if(kkbhs!=null && kkbhs.size()>0){
				FilterList kkbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String kkbh:kkbhs){
					Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
					if(kkbhFilter!=null){
						kkbhFilterList.addFilter(kkbhFilter);
					}
				}
				filterList.addFilter(kkbhFilterList);
			}
			
			if(hphms!=null && hphms.size()>0){
				FilterList hphmFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String hphm:hphms){
					Filter hphmFilter=getHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_JGSJ,false);
					if(hphmFilter!=null){
						hphmFilterList.addFilter(hphmFilter);
					}
				}
				filterList.addFilter(hphmFilterList);
			}
			if(fxbhs!=null && fxbhs.size()>0){
				FilterList fxbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String fxbh:fxbhs){
					Filter fxbhFilter = getFxbhFilter(fxbh, SysHBaseConstants.TABLE_NAME_INDEX_HPHM);
					if(fxbhFilter!=null){
						fxbhFilterList.addFilter(fxbhFilter);
					}
				}
				filterList.addFilter(fxbhFilterList);
			}
			return super.queryDetailPage(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ, scan, page);
		}
	}
	
	/**
	 * 按方向编号查询
	 */
	@Override
	public PageEntity queryCarTakeByfxbh(Date startDate, Date endDate,
			List<String> kkbhs, List<String> hphms, List<String> fxbhs,
			String hpys,String carBrand,String carType,String carYear, PageEntity page) throws Exception {
		Scan scan=new Scan();
		FilterList filterList=new FilterList();
		scan.setFilter(filterList);
		if(hphms.size()==1&&hphms.get(0).length()>=7 && !StringUtil.checkStr(hpys)){
			String hphm = hphms.get(0);
			byte[] startKey=this.getBytes4Hphm(endDate, hphm, null, false);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			//stop
			byte[] stopKey=this.getBytes4Hphm(startDate, hphm, null, false);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			if(fxbhs!=null && fxbhs.size()>0){
				FilterList fxbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String fxbh:fxbhs){
					Filter fxbhFilter = getFxbhFilter(fxbh, SysHBaseConstants.TABLE_NAME_INDEX_HPHM);
					if(fxbhFilter!=null){
						fxbhFilterList.addFilter(fxbhFilter);
					}
				}
				filterList.addFilter(fxbhFilterList);
			}
			Filter hphmFilter=getHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_HPHM,false);
			if(hphmFilter!=null){
				filterList.addFilter(hphmFilter);
			}
			return super.queryDetailPage(SysHBaseConstants.TABLE_NAME_INDEX_HPHM, scan, page);
		} else if (fxbhs.size() == 1 && !StringUtil.checkStr(hpys)) {
			String kkbh = fxbhs.get(0);
			
			byte[] startKey=this.getBytes4Fxbh(endDate, null, kkbh, false);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			byte[] stopKey=this.getBytes4Fxbh(startDate, null, kkbh, false);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			if(hphms!=null && hphms.size()>0){
				FilterList hphmFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String hphm:hphms){
					Filter hphmFilter=getRegHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
					if(hphmFilter!=null){
						hphmFilterList.addFilter(hphmFilter);
					}
				}
				filterList.addFilter(hphmFilterList);
			}
			return super.queryDetailPage(SysHBaseConstants.TABLE_NAME_INDEX_FXBH, scan, page);
		} else if (StringUtil.checkStr(hpys)) {
			//start 
			byte[] startKey=this.getBytes4Hpys(hpys, endDate, null, null, false);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			
			//stop
			byte[] stopKey=this.getBytes4Hpys(hpys, startDate, null, null, false);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			
			if(hphms!=null && hphms.size()>0){
				FilterList hphmFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String hphm:hphms){
					Filter hphmFilter=getRegHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
					if(hphmFilter!=null){
						hphmFilterList.addFilter(hphmFilter);
					}
				}
				filterList.addFilter(hphmFilterList);
			}
			if(fxbhs!=null && fxbhs.size()>0){
				FilterList fxbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String fxbh:fxbhs){
					Filter fxbhFilter = getFxbhFilter(fxbh, SysHBaseConstants.TABLE_NAME_INDEX_HPHM);
					if(fxbhFilter!=null){
						fxbhFilterList.addFilter(fxbhFilter);
					}
				}
				filterList.addFilter(fxbhFilterList);
			}
			Filter hpysFilter= JPHBaseFilterHelper.getPrefixFilter(hpys);
			if(hpysFilter!=null){
				filterList.addFilter(hpysFilter);
			}
			return super.queryDetailPage(SysHBaseConstants.TABLE_NAME_INDEX_HPYS, scan, page);
		} else{
			//使用JGSJ索引,因为其是预分区,所以离散性较好,性能较高
			//start 
			byte[] startKey=this.getBytes4Jgsj(endDate, null, null, false);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			
			//stop
			byte[] stopKey=this.getBytes4Jgsj(startDate, null, null, false);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			if(hphms!=null && hphms.size()>0){
				FilterList hphmFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String hphm:hphms){
					Filter hphmFilter=getHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_JGSJ,false);
					if(hphmFilter!=null){
						hphmFilterList.addFilter(hphmFilter);
					}
				}
				filterList.addFilter(hphmFilterList);
			}
			if(fxbhs!=null && fxbhs.size()>0){
				FilterList fxbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String fxbh:fxbhs){
					Filter fxbhFilter = getFxbhFilter(fxbh, SysHBaseConstants.TABLE_NAME_INDEX_HPHM);
					if(fxbhFilter!=null){
						fxbhFilterList.addFilter(fxbhFilter);
					}
				}
				filterList.addFilter(fxbhFilterList);
			}
			return super.queryDetailPage(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ, scan, page);
		}
	}
	
	//查询报备卡口信息
	public PageEntity queryBaobeiCarTake(Date startDate,Date endDate,List<String> kkbhs, List<String> hphms, PageEntity page) throws Exception {
		Scan scan=new Scan();
		FilterList filterList=new FilterList();
		scan.setFilter(filterList);
		if(hphms.size()==1&&hphms.get(0).length()>=7){
			String hphm = hphms.get(0);
			byte[] startKey=this.getBytes4Hphm(endDate, hphm, null, false);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			//stop
			byte[] stopKey=this.getBytes4Hphm(startDate, hphm, null, false);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			if(kkbhs!=null && kkbhs.size()>0){
				FilterList fxbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String fxbh:kkbhs){
					Filter fxbhFilter = getFxbhFilter(fxbh, SysHBaseConstants.TABLE_NAME_INDEX_HPHM);
					if(fxbhFilter!=null){
						fxbhFilterList.addFilter(fxbhFilter);
					}
				}
				filterList.addFilter(fxbhFilterList);
			}
			/*Filter hphmFilter=getHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_HPHM_BAOBEI,false);
			if(hphmFilter!=null){
				filterList.addFilter(hphmFilter);
			}*/
			return super.queryDetailPage(SysHBaseConstants.TABLE_NAME_INDEX_HPHM_BAOBEI, scan, page);
		}
		if (kkbhs.size() == 1) {
			String kkbh = kkbhs.get(0);
			byte[] startKey=this.getBytes4Kkbh(endDate, null, kkbh, false);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			if(hphms!=null && hphms.size()>0){
				FilterList hphmFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String hphm:hphms){
					Filter hphmFilter=getRegHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
					if(hphmFilter!=null){
						hphmFilterList.addFilter(hphmFilter);
					}
				}
				filterList.addFilter(hphmFilterList);
			}
			byte[] stopKey=this.getBytes4Kkbh(startDate, null, kkbh, false);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			return super.queryDetailPage(SysHBaseConstants.TABLE_NAME_INDEX_KKBH, scan, page);
		} else {
			//使用JGSJ索引,因为其是预分区,所以离散性较好,性能较高
			//start 
			byte[] startKey = this.getBytes4Jgsj(endDate, null, null, false);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			//stop
			byte[] stopKey=this.getBytes4Jgsj(startDate, null, null, false);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			
			if(hphms!=null && hphms.size()>0){
				FilterList hphmFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String hphm:hphms){
					Filter hphmFilter=getHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_JGSJ,false);
					if(hphmFilter!=null){
						hphmFilterList.addFilter(hphmFilter);
					}
				}
				filterList.addFilter(hphmFilterList);
			}
			if(kkbhs!=null && kkbhs.size()>0){
				FilterList fxbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
				for(String fxbh:kkbhs){
					Filter fxbhFilter = getFxbhFilter(fxbh, SysHBaseConstants.TABLE_NAME_INDEX_HPHM);
					if(fxbhFilter!=null){
						fxbhFilterList.addFilter(fxbhFilter);
					}
				}
				filterList.addFilter(fxbhFilterList);
			}
			return super.queryDetailPage(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ_BAOBEI, scan, page);
		}
	}
	
	
	@Override
	public SliceEntity queryCarTake(String kkbh, Date startDate, Date endDate, String hphm, SliceEntity slice) throws Exception {
		return queryCarTake(kkbh, startDate, endDate, hphm, slice, false);
	}

	@Override
	public SliceEntity queryCarTake(String kkbh, Date startDate, Date endDate, String hphm, SliceEntity slice, boolean fummyHphm) throws Exception {
		Scan scan=new Scan();
		
		FilterList filterList=new FilterList();
		scan.setFilter(filterList);
		
		if(startDate!=null&&endDate!=null){
			//使用JGSJ索引,因为其是预分区,所以离散性较好,性能较高
			
			//start 
			byte[] startKey=this.getBytes4Jgsj(endDate, hphm, kkbh, fummyHphm);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			
			//stop
			byte[] stopKey=this.getBytes4Jgsj(startDate, hphm, kkbh, fummyHphm);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			
			Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
			if(kkbhFilter!=null){
				filterList.addFilter(kkbhFilter);
			}
			
			Filter hphmFilter=getHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_JGSJ,fummyHphm);
			if(hphmFilter!=null){
				filterList.addFilter(hphmFilter);
			}
			
			return super.queryDetailSlice(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ, scan, slice, null);
		}
		else if(kkbh!=null){
			//使用KKBH索引
			
			//start 
			byte[] startKey=this.getBytes4Kkbh(endDate, hphm, kkbh, fummyHphm);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			
			//stop
			byte[] stopKey=this.getBytes4Kkbh(startDate, hphm, kkbh, fummyHphm);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			
			Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_KKBH);
			if(kkbhFilter!=null){
				filterList.addFilter(kkbhFilter);
			}
			
			Filter hphmFilter=getHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_KKBH,fummyHphm);
			if(hphmFilter!=null){
				filterList.addFilter(hphmFilter);
			}
			
			return super.queryDetailSlice(SysHBaseConstants.TABLE_NAME_INDEX_KKBH, scan, slice, null);
		}
		else if(hphm!=null&&fummyHphm==false){
			//使用HPHM索引
			
			//start 
			byte[] startKey=this.getBytes4Hphm(endDate, hphm, kkbh, fummyHphm);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			
			//stop
			byte[] stopKey=this.getBytes4Hphm(startDate, hphm, kkbh, fummyHphm);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			
			Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_HPHM);
			if(kkbhFilter!=null){
				filterList.addFilter(kkbhFilter);
			}
			
			Filter hphmFilter=getHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_HPHM,fummyHphm);
			if(hphmFilter!=null){
				filterList.addFilter(hphmFilter);
			}
			
			return super.queryDetailSlice(SysHBaseConstants.TABLE_NAME_INDEX_HPHM, scan, slice, null);
		}
		else{
			//使用JGSJ索引
			
			//start 
			byte[] startKey=this.getBytes4Jgsj(endDate, hphm, kkbh, fummyHphm);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			
			//stop
			byte[] stopKey=this.getBytes4Jgsj(startDate, hphm, kkbh, fummyHphm);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			
			Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
			if(kkbhFilter!=null){
				filterList.addFilter(kkbhFilter);
			}
			
			Filter hphmFilter=getHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_JGSJ,fummyHphm);
			if(hphmFilter!=null){
				filterList.addFilter(hphmFilter);
			}
			
			return super.queryDetailSlice(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ, scan, slice, null);
		}
	}

	@Override
	public SliceEntity queryCarTake(Date startDate, Date endDate, List<String> kkbhs, List<String> hphms, SliceEntity slice) throws Exception {
		Scan scan=new Scan();
		
		FilterList filterList=new FilterList();
		scan.setFilter(filterList);
		
		//使用JGSJ索引,因为其是预分区,所以离散性较好,性能较高
		
		//start 
		byte[] startKey=this.getBytes4Jgsj(endDate, null, null, false);
		if(startKey!=null){
			scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
		}
		
		//stop
		byte[] stopKey=this.getBytes4Jgsj(startDate, null, null, false);
		if(stopKey!=null){
			scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
		}
		
		if(kkbhs!=null && kkbhs.size()>0){
			FilterList kkbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
			for(String kkbh:kkbhs){
				Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
				if(kkbhFilter!=null){
					kkbhFilterList.addFilter(kkbhFilter);
				}
			}
			filterList.addFilter(kkbhFilterList);
		}
		
		if(hphms!=null && hphms.size()>0){
			FilterList hphmFilterList = new FilterList(Operator.MUST_PASS_ONE);
			for(String hphm:hphms){
				Filter hphmFilter=getHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_JGSJ,false);
				if(hphmFilter!=null){
					hphmFilterList.addFilter(hphmFilter);
				}
			}
			filterList.addFilter(hphmFilterList);
		}
		
		return super.queryDetailSlice(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ, scan, slice, null);
	}
	
	/**
	 * 车辆特征筛选
	 * @param 开始时间
	 * @param 结束时间
	 * @param 车身颜色
	 * @param 车辆类型
	 * @param 车辆品牌
	 * @param 号牌种类
	 * @param endKey
	 * @return 切片实体
	 * @throws 异常
	 */
	@Override
	public SliceEntity queryCarTake(Date startDate, Date endDate, String csys, String cllx, String clpp, String hpzl, SliceEntity slice) throws Exception {
		Scan scan=new Scan();
		
		//使用JGSJ索引
		
		//start 
		byte[] startKey=this.getBytes4Jgsj(endDate, null, null, false);
		if(startKey!=null){
			scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
		}
		
		//stop
		byte[] stopKey=this.getBytes4Jgsj(startDate, null, null, false);
		if(stopKey!=null){
			scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
		}
		
		FilterList filterList=new FilterList();
		if(StringUtils.isNotEmpty(csys)){
			SingleColumnValueFilter filter = JPHBaseFilterHelper.getValueFilter("take,csys,"+csys);
			filterList.addFilter(filter);
		}
		if(StringUtils.isNotEmpty(cllx)){
			SingleColumnValueFilter filter = JPHBaseFilterHelper.getValueFilter("take,cllx,"+cllx);
			filterList.addFilter(filter);
		}
		if(StringUtils.isNotEmpty(clpp)){
			SingleColumnValueFilter filter = JPHBaseFilterHelper.getValueFilter("take,clpp,"+clpp);
			filterList.addFilter(filter);
		}
		if(StringUtils.isNotEmpty(hpzl)){
			SingleColumnValueFilter filter = JPHBaseFilterHelper.getValueFilter("take,hpzl,"+hpzl);
			filterList.addFilter(filter);
		}
		
		return super.queryDetailSlice(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ, scan, slice, filterList);
	}
	
	/**
	 * 跟随车分析
	 * 虽然号牌种类可能会引起部分误判,但误判率低,不作处理
	 * @param startDate
	 * @param endDate
	 * @param hphm
	 * @param mintueOffset
	 * @param minCount
	 * @return
	 * @throws Exception
	 */

	public Map<String,List<CarTake>> getFollowingCar(Date startDate, Date endDate, String hphm, int mintueOffset, int minCount) throws Exception{
		Set<String> kkbhs=new HashSet<String>();
		Map<String,CarTake> kkbhTakeMap=new HashMap<String, CarTake>();
		
		if(startDate!=null&&endDate!=null){
			Scan scan=new Scan();
			FilterList all = new FilterList();
			scan.setFilter(all);
			
			//使用JGSJ索引,因为其是预分区,所以离散性较好,性能较高
			
			//start 
			byte[] startKey=this.getBytes4Jgsj(endDate, hphm, null, false);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			
			//stop
			byte[] stopKey=this.getBytes4Jgsj(startDate, hphm, null, false);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			
			Filter hphmFilter=getHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_JGSJ,false);
			if(hphmFilter!=null){
				all.addFilter(hphmFilter);
			}
			
			//get the takes of followed car
			List<CarTake> takes = super.queryDetailWithIndex(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ, scan);
			
			
			for(CarTake take:takes){
				kkbhs.add(take.getKkbh());
				kkbhTakeMap.put(take.getKkbh(), take);
			}
		}
		
		if(kkbhs.size()>0){
			return this.getFollowingCar(startDate, endDate, hphm, mintueOffset, minCount, kkbhs, kkbhTakeMap);
		}
		
		return null;
	}
	
	/**
	 * 跟随车分析
	 * @param startDate
	 * @param endDate
	 * @param hphm
	 * @param kkbhs
	 * @param mintueOffset
	 * @param minCount
	 * @return
	 * @throws Exception
	 */
	public Map<String,List<CarTake>> getFollowingCar(Date startDate, Date endDate, String hphm,List<String> kkbhs, int mintueOffset, int minCount) throws Exception{
		Set<String> refKkbhs=new HashSet<String>();
		Map<String,CarTake> kkbhTakeMap=new HashMap<String, CarTake>();
		
		if(startDate!=null&&endDate!=null){
			Scan scan=new Scan();
			FilterList all = new FilterList();
			scan.setFilter(all);
			
			//使用JGSJ索引,因为其是预分区,所以离散性较好,性能较高
			
			//start 
			byte[] startKey=this.getBytes4Jgsj(endDate, hphm, null, false);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			
			//stop
			byte[] stopKey=this.getBytes4Jgsj(startDate, hphm, null, false);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			
			FilterList filterList=new FilterList(Operator.MUST_PASS_ONE);
			for(String kkbh:kkbhs){
				Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
				if(kkbhFilter!=null){
					filterList.addFilter(kkbhFilter);
				}
			}
			all.addFilter(filterList);
			
			Filter hphmFilter=getHphmFilter(hphm,SysHBaseConstants.TABLE_NAME_INDEX_JGSJ,false);
			if(hphmFilter!=null){
				all.addFilter(hphmFilter);
			}
			
			//get the takes of followed car
			List<CarTake> takes = super.queryDetailWithIndex(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ, scan);
			
			for(CarTake take:takes){
				refKkbhs.add(take.getKkbh());
				kkbhTakeMap.put(take.getKkbh(), take);
			}
		}
		
		if(kkbhs.size()>0){
			return this.getFollowingCar(startDate, endDate, hphm, mintueOffset, minCount, refKkbhs, kkbhTakeMap);
		}
		
		return null;
	}
	
	/**
	 * 查询得到参考过车记录后,再查询跟随车
	 * @param startDate
	 * @param endDate
	 * @param hphm
	 * @param mintueOffset
	 * @param minCount
	 * @param kkbhs
	 * @param kkbhTakeMap
	 * @return
	 * @throws Exception
	 */
	private Map<String,List<CarTake>> getFollowingCar(Date startDate, Date endDate, String hphm, int mintueOffset, int minCount,Set<String> kkbhs, Map<String,CarTake> kkbhTakeMap) throws Exception{
		if(kkbhs.size()>0){
			Scan scan=new Scan();
			
			//使用JGSJ索引,因为其是预分区,所以离散性较好,性能较高
			
			//start 
			byte[] startKey=this.getBytes4Jgsj(endDate, null, null, false);
			if(startKey!=null){
				scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
			}
			
			//stop
			byte[] stopKey=this.getBytes4Jgsj(startDate, null, null, false);
			if(stopKey!=null){
				scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
			}
			
			FilterList filterList=new FilterList(Operator.MUST_PASS_ONE);
			for(String kkbh:kkbhs){
				Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
				if(kkbhFilter!=null){
					filterList.addFilter(kkbhFilter);
				}
			}
			scan.setFilter(filterList);
			
			//get the takes of followed car
			Iterator<CarTake> it = super.queryDetailItWithIndex(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ, scan);
			
			Map<String,List<CarTake>> result=new HashMap<String, List<CarTake>>();
			
			String currentHphm=null;
			List<CarTake> followTakes=null;
			
			while(it.hasNext()){
				CarTake take = it.next();
				if(hphm!=null&&hphm.equals(currentHphm)){
					//ignore self records
					continue;
				}
				
				if(currentHphm==null){
					currentHphm=take.getHphm();
					followTakes=new ArrayList<CarTake>();
				}
				
				if(currentHphm!=null&&currentHphm.length()>4){
					//hphm is not empty
					
					if(currentHphm.equals(take.getHphm())==false){
						//different hphm
						
						//add result
						if(followTakes.size()>minCount){
							result.put(hphm, followTakes);
						}
						
						//init new hphm
						hphm=take.getHphm();
						followTakes=new ArrayList<CarTake>();
					}
				}
				
				if(currentHphm!=null&&currentHphm.length()>4){
					//hphm is not empty
					
					if(kkbhTakeMap.containsKey(take.getKkbh())){
						CarTake reference=kkbhTakeMap.get(take.getKkbh());
						
						long offset=take.getJgsj().getTime()-reference.getJgsj().getTime();
						if(Math.abs(offset) <= 1000 * 60 * mintueOffset){
							//follow car in kkbh
							followTakes.add(take);
						}
						
						if(followTakes.size()==kkbhs.size()){
							//found one hphm
							result.put(hphm, followTakes);
						}
					}
				}
			}
			
			return result;
		}
		return null;
	}
	
	/**
	 * 轨迹碰撞，用于查询同一段时间内经过若干点的车辆
	 * 小时间跨度的轨迹碰撞
	 * @param startTime
	 * @param endTime
	 * @param kkbhs
	 * @param minCount
	 * @return
	 * @throws Exception
	 */
	public Map<String,List<CarTake>> getTraceImpact(Date startTime, Date endTime, List<String> kkbhs, int minCount)throws Exception{
		Scan scan=new Scan();
		
		//使用JGSJ索引
		
		//start 
		byte[] startKey=this.getBytes4Jgsj(endTime, null, null, false);
		if(startKey!=null){
			scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
		}
		
		//stop
		byte[] stopKey=this.getBytes4Jgsj(startTime, null, null, false);
		if(stopKey!=null){
			scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
		}
		
		FilterList filterList=new FilterList(Operator.MUST_PASS_ONE);
		for(String kkbh:kkbhs){
			Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
			if(kkbhFilter!=null){
				filterList.addFilter(kkbhFilter);
			}
		}
		scan.setFilter(filterList);
		
		Iterator<CarTake> it = super.queryDetailItWithIndex(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ, scan);
		
		Map<String,Integer> kkbhMap=new HashMap<String,Integer>();
		for(String kkbh:kkbhs){
			kkbhMap.put(kkbh, 1);
		}
		
		Map<String,List<CarTake>> result=new HashMap<String, List<CarTake>>();
		
		String hphm=null;
		List<CarTake> matchTakes=null;
		
		while(it.hasNext()){
			CarTake take = it.next();
			if(hphm==null){
				hphm=take.getHphm();
				matchTakes=new ArrayList<CarTake>();
			}
			
			if(hphm!=null&&hphm.length()>4){
				//hphm is not empty
				
				if(hphm.equals(take.getHphm())==false){
					//different hphm
					
					//add result
					if(matchTakes.size()>minCount){
						result.put(hphm, matchTakes);
					}
					
					//init new hphm
					hphm=take.getHphm();
					matchTakes=new ArrayList<CarTake>();
					
					kkbhMap=new HashMap<String,Integer>();
					for(String kkbh:kkbhs){
						kkbhMap.put(kkbh, 1);
					}
				}
			}
			
			if(hphm!=null&&hphm.length()>4){
				//hphm is not empty
				
				if(hphm.equals(take.getHphm())){
					if(kkbhMap.containsKey(take.getKkbh())){
						matchTakes.add(take);
						
						//to reduce count generate by same kkbh
						kkbhMap.remove(take.getKkbh());
					}
				}
			}
		}
		
		return result;
	}
	
	/**
	 * 轨迹碰撞，用于同时查询经过若干点的车辆
	 * 大时间跨度的轨迹碰撞
	 * 注意内存可能溢出
	 * @param kkbhs
	 * @param minCount
	 * @return
	 * @throws Exception
	 */
	public Map<String,List<CarTake>> getTraceImpact(Map<String,Date[]> kkbhs, int minCount)throws Exception{
		if(kkbhs!=null){
			Map<String,List<CarTake>> result=new HashMap<String, List<CarTake>>();
			
			for(String kkbh:kkbhs.keySet()){
				Date startTime=kkbhs.get(kkbh)[0];
				Date endTime=kkbhs.get(kkbh)[1];
				
				Scan scan=new Scan();
				
				FilterList filterList=new FilterList();
				scan.setFilter(filterList);
				
				//使用KKBH索引
				
				//start 
				byte[] startKey=this.getBytes4Kkbh(endTime, kkbh, null, false);
				if(startKey!=null){
					scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
				}
				
				//stop
				byte[] stopKey=this.getBytes4Kkbh(startTime, kkbh, null, false);
				if(stopKey!=null){
					scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
				}
				
				Iterator<CarTake> it = super.queryDetailItWithIndex(SysHBaseConstants.TABLE_NAME_INDEX_KKBH, scan);
				
				while(it.hasNext()){
					CarTake take=it.next();
					
					if(take.getHphm()!=null&&take.getHphm().length()>4){
						if(result.containsKey(take.getHphm())==false){
							result.put(take.getHphm(),new ArrayList<CarTake>());
						}
						
						result.get(take.getHphm()).add(take);
					}
				}
			}
			
			Set<String> keys=new HashSet<String>();
			keys.addAll(result.keySet());
			for(String hphm:keys){
				if(result.get(hphm).size()<minCount){
					result.remove(hphm);
				}
			}
			
			return result;
		}
		return null;
	}
	/**
	 * 临近检测点差异性分析 指定车牌范围
	 * 查询轨迹异常车辆，经过卡口1，应该同时经过卡口2
	 * @param startTime
	 * @param endTime
	 * @param kkbh1
	 * @param kkbh2
	 * @return hphms
	 * @throws Exception
	 */
	public Map<String,List<CarTake>> getNearByPointCarException(Date startTime, Date endTime, String kkbh1, String kkbh2,List<String> hphms)throws Exception{
		List<String> kkbhs=new ArrayList<String>();
		kkbhs.add(kkbh1);
		kkbhs.add(kkbh2);
		
		return getNearByPointCarException(startTime, endTime, kkbhs, 2,hphms);
	}
	
	public Map<String,List<CarTake>> getNearByPointCarException(Date startTime, Date endTime, List<String> kkbhs, int minCount,List<String> hphms)throws Exception{
		//程序查询几乎完全与小时间跨度轨迹碰撞一样,只有取结果集的比较条件不一样
		Scan scan=new Scan();
		
		//使用JGSJ索引
		
		//start 
		byte[] startKey=this.getBytes4Jgsj(endTime, null, null, false);
		if(startKey!=null){
			scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
		}
		
		//stop
		byte[] stopKey=this.getBytes4Jgsj(startTime, null, null, false);
		if(stopKey!=null){
			scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
		}
		//使用Operator.MUST_PASS_ONE说明list里面每一个都必须进行filter
		FilterList filterList=new FilterList(Operator.MUST_PASS_ONE);
		for(String kkbh:kkbhs){
			Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
			if(kkbhFilter!=null){
				filterList.addFilter(kkbhFilter);
			}
		}
		scan.setFilter(filterList);
		
		Iterator<CarTake> it = super.queryDetailItWithIndex(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ, scan);
		
		Map<String,Integer> kkbhMap=new HashMap<String,Integer>();
		for(String kkbh:kkbhs){
			kkbhMap.put(kkbh, 1);
		}
		
		Map<String,List<CarTake>> result=new HashMap<String, List<CarTake>>();
		
		String hphm=null;
		List<CarTake> matchTakes=null;
		
		while(it.hasNext()){
			CarTake take = it.next();
			if(hphm==null){
				hphm=take.getHphm();
				matchTakes=new ArrayList<CarTake>();
			}
			
			if(hphm!=null&&hphm.length()>4){
				//hphm is not empty
				
				if(hphm.equals(take.getHphm())==false){
					//different hphm
					
					//add result
					if(matchTakes.size()<minCount){//不同于小时间跨度轨迹碰撞,取反向条件
						if(hphms.contains(hphm)){//是否在指定车牌范围内
							result.put(hphm, matchTakes);
						}
						
					}
					
					//init new hphm
					hphm=take.getHphm();
					matchTakes=new ArrayList<CarTake>();
					
					kkbhMap=new HashMap<String,Integer>();
					for(String kkbh:kkbhs){
						kkbhMap.put(kkbh, 1);
					}
				}
			}
			
			if(hphm!=null&&hphm.length()>4){
				//hphm is not empty
				
				if(hphm.equals(take.getHphm())){
					if(kkbhMap.containsKey(take.getKkbh())){
						matchTakes.add(take);
						
						//to reduce count generate by same kkbh
						kkbhMap.remove(take.getKkbh());
					}
				}
			}
		}
		
		return result;
	}
	
	/**
	 * 临近检测点差异性分析
	 * 查询轨迹异常车辆，经过卡口1，应该同时经过卡口2
	 * @param startTime
	 * @param endTime
	 * @param kkbh1
	 * @param kkbh2
	 * @return
	 * @throws Exception
	 */
	public Map<String,List<CarTake>> getTrannelException(Date startTime, Date endTime, String kkbh1, String kkbh2)throws Exception{
		List<String> kkbhs=new ArrayList<String>();
		kkbhs.add(kkbh1);
		kkbhs.add(kkbh2);
		
		return getTrannelException(startTime, endTime, kkbhs, 2);
	}
	
	public Map<String,List<CarTake>> getTrannelException(Date startTime, Date endTime, List<String> kkbhs, int minCount)throws Exception{
		//程序查询几乎完全与小时间跨度轨迹碰撞一样,只有取结果集的比较条件不一样
		Scan scan=new Scan();
		
		//使用JGSJ索引
		
		//start 
		byte[] startKey=this.getBytes4Jgsj(endTime, null, null, false);
		if(startKey!=null){
			scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
		}
		
		//stop
		byte[] stopKey=this.getBytes4Jgsj(startTime, null, null, false);
		if(stopKey!=null){
			scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
		}
		//使用Operator.MUST_PASS_ONE说明list里面每一个都必须进行filter
		FilterList filterList=new FilterList(Operator.MUST_PASS_ONE);
		for(String kkbh:kkbhs){
			Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
			if(kkbhFilter!=null){
				filterList.addFilter(kkbhFilter);
			}
		}
		scan.setFilter(filterList);
		
		Iterator<CarTake> it = super.queryDetailItWithIndex(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ, scan);
		
		Map<String,Integer> kkbhMap=new HashMap<String,Integer>();
		for(String kkbh:kkbhs){
			kkbhMap.put(kkbh, 1);
		}
		
		Map<String,List<CarTake>> result=new HashMap<String, List<CarTake>>();
		
		String hphm=null;
		List<CarTake> matchTakes=null;
		
		while(it.hasNext()){
			CarTake take = it.next();
			if(hphm==null){
				hphm=take.getHphm();
				matchTakes=new ArrayList<CarTake>();
			}
			
			if(hphm!=null&&hphm.length()>1){
				//hphm is not empty
				
				if(hphm.equals(take.getHphm())==false){
					//different hphm
					
					//add result
					if(matchTakes.size()<minCount){//不同于小时间跨度轨迹碰撞,取反向条件
						result.put(hphm, matchTakes);
					}
					
					//init new hphm
					hphm=take.getHphm();
					matchTakes=new ArrayList<CarTake>();
					
					kkbhMap=new HashMap<String,Integer>();
					for(String kkbh:kkbhs){
						kkbhMap.put(kkbh, 1);
					}
				}
			}
			
			if(hphm!=null&&hphm.length()>1){
				//hphm is not empty
				
				if(hphm.equals(take.getHphm())){
					if(kkbhMap.containsKey(take.getKkbh())){
						matchTakes.add(take);
						
						//to reduce count generate by same kkbh
						kkbhMap.remove(take.getKkbh());
					}
				}
			}
		}
		
		return result;
	}
	
	/**
	 * 全表扫描ROW KEY
	 * @param 表名
	 * @return ROW KEY迭代器
	 * @throws Exception
	 */
	public Iterator<KKRowKey> getRowkeyIt(String talbeName) throws Exception{
		Scan scan=new Scan();
		scan.setFilter(JPHBaseFilterHelper.getCountFilter());
		return super.queryIndexRowKeyIt(talbeName, scan);
	}
	
	private byte[] getBytes4Jgsj(Date date,String hphm,String kkbh, boolean fummyHphm) throws Exception{
		if(date!=null){
			byte[] timeBytes=getTimeByte(date);
			if(hphm!=null&&fummyHphm==false){
				if(kkbh!=null){
					byte[] temp=BytesUtils.add(timeBytes, keyHelper.getHphm4RowKeySubstring(hphm));
					return BytesUtils.add(temp, keyHelper.getKkbh4RowKeySubstring(kkbh));
				}
				else{
					return BytesUtils.add(timeBytes, keyHelper.getHphm4RowKeySubstring(hphm));
				}
			}
			else{
				return timeBytes;
			}
		}
		else{
			return null;
		}
	}
	
	private byte[] getBytes4Kkbh(Date date,String hphm,String kkbh, boolean fummyHphm) throws Exception{
		if(kkbh!=null){
			byte[] kkbhBytes=keyHelper.getKkbh4RowKeyPrefix(kkbh);
			if(date!=null){
				if(hphm!=null&&fummyHphm==false){
					byte[] temp=BytesUtils.add(kkbhBytes, getTimeByte(date));
					return BytesUtils.add(temp, keyHelper.getHphm4RowKeySubstring(hphm)); 
				}
				else{
					return BytesUtils.add(kkbhBytes, getTimeByte(date));
				}
			}
			else{
				return kkbhBytes;
			}
		}
		else{
			return null;
		}
	}
	private byte[] getBytes4CarBrand(Date date,String carbrand) throws Exception{
		if(carbrand!=null){
			byte[] carbrandBytes=keyHelper.getBytes4Pinpai(carbrand);
			if(date!=null){
				return BytesUtils.add(carbrandBytes, getTimeByte(date));
			}
			else{
				return carbrandBytes;
			}
		}
		else{
			return null;
		}
	}
	private byte[] getBytes4CarBt(Date date,String carbrand,String cartype) throws Exception{
		if(carbrand!=null){
			byte[] carbrandBytes=keyHelper.getBytes4Pinpai(carbrand);
			if(date!=null){
				if(cartype!=null){
					byte[] cartypeBytes=keyHelper.getBytes4Pinpai(cartype);
					byte[] temp=BytesUtils.add(carbrandBytes, cartypeBytes);
					return BytesUtils.add(temp,getTimeByte(date)); 
				}
				else{
					return BytesUtils.add(carbrandBytes, getTimeByte(date));
				}
			}
			else{
				return carbrandBytes;
			}
		}
		else{
			return null;
		}
	}
	
	private byte[] getBytes4Fxbh(Date date,String hphm,String fxbh, boolean fummyHphm) throws Exception{
		if(fxbh!=null){
			byte[] fxbhBytes=keyHelper.getFxbh4RowKeyPrefix(fxbh);
			if(date!=null){
				return BytesUtils.add(fxbhBytes, getTimeByte(date));
			} else{
				return fxbhBytes;
			}
		}
		else{
			return null;
		}
	}
	
	private byte[] getBytes4Hphm(Date date,String hphm,String kkbh, boolean fummyHphm) throws Exception{
		if(hphm!=null&&fummyHphm==false){
			byte[] hphmBytes=keyHelper.getHphm4RowKeyPrefix(hphm);
			if(date!=null){
				if(kkbh!=null){
					byte[] temp=BytesUtils.add(hphmBytes, getTimeByte(date));
					return BytesUtils.add(temp,keyHelper.getKkbh4RowKeySubstring(kkbh));
				}
				else{
					return BytesUtils.add(hphmBytes, getTimeByte(date));
				}
			}
			else{
				return hphmBytes;
			}
		}
		else{
			return null;
		}
	}
	
	private byte[] getBytesJgsjAndHphm(Date date,String hphm, boolean fummyHphm) throws Exception{
		if(hphm!=null&&fummyHphm==false){
			byte[] hphmBytes=keyHelper.getHphm4RowKey(hphm);
			if(date!=null){
				return BytesUtils.add(getTimeByte(date), hphmBytes);
			}
			else{
				return hphmBytes;
			}
		}
		else{
			return null;
		}
	}
	
	private byte[] getTimeByte(Date datetime) throws Exception {
		if (datetime != null) {
			return keyHelper.getBytes4Jgsj(keyHelper.formatter.format(datetime));
		} 
		return null;
	}
	
	private Filter getHphmFilter(String hphm, String tableName, boolean fummy){
		if(StringUtils.isEmpty(hphm)==false){
			if(fummy){
				if(SysHBaseConstants.TABLE_NAME_INDEX_HPHM.equals(tableName)){
					String temp=new StringBuffer(hphm).reverse().toString();
//					int start=0;
//					int end=start+15;
//					return new RowKeyByteRangeSeqFilter(start, end, BytesUtils.toBytes(temp));
					
					return JPHBaseFilterHelper.getSubRowFilter(temp);
				}
				else if(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ.equals(tableName)){
//					int start=9;
//					int end=start+15;
//					return new RowKeyByteRangeSeqFilter(start, end, BytesUtils.toBytes(hphm));
					
					return JPHBaseFilterHelper.getSubRowFilter(hphm);
				}
				else if(SysHBaseConstants.TABLE_NAME_INDEX_KKBH.equals(tableName)){
//					int start=0;//int start=27;
//					int end=start+150;//int end=start+15;
//					return new RowKeyByteRangeSeqFilter(start, end, BytesUtils.toBytes(hphm));
					
					return JPHBaseFilterHelper.getSubRowFilter(hphm);
				}
				else{
					//nothing
				}
			}
			else{
				if(SysHBaseConstants.TABLE_NAME_INDEX_HPHM.equals(tableName)){
					String temp=new StringBuffer(hphm).reverse().toString();
					return JPHBaseFilterHelper.getPrefixFilter(temp);
				}
				else{
					return JPHBaseFilterHelper.getSubRowFilter(hphm);
					//String temp = "粤[A-Z]{1}[A-Z0-9]{3}25";
					//String temp2 = "[\\u4E00-\\u9FFF]{1}[A-Z]{1}[A-Z0-9]{3}25";
					//return JPHBaseFilterHelper.getRegRowFilter(temp2);
				}
			}
		}
		return null;
	}
	
	private Filter getKkbhFilter(String kkbh, String tableName){
		if(StringUtils.isEmpty(kkbh)==false){
			if(SysHBaseConstants.TABLE_NAME_INDEX_KKBH.equals(tableName)){
				String temp=new StringBuffer(kkbh).reverse().toString();
				//获取有相同前缀的row
				return JPHBaseFilterHelper.getPrefixFilter(temp);
			}
			else{
				return JPHBaseFilterHelper.getSubRowFilter(kkbh);
			}
		}
		return null;
	}
	
	private Filter getFxbhFilter(String fxbh,String tableName){
		if(StringUtils.isEmpty(fxbh)==false){
			return JPHBaseFilterHelper.getRegRowFilter(fxbh);
		}
		return null;
	}

	private Filter getRegHphmFilter(String hphm,String tableName){
		if(StringUtils.isEmpty(hphm)==false){
			return JPHBaseFilterHelper.getRegRowFilter(hphm);
		}
		return null;
	}
	
	@Override
	public CarTake getTake(byte[] rowKey) {
		try {
			return super.getTakeWithKey(rowKey);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<CarTake> getTakes(List<byte[]> rowKeys) {
		try {
			return super.getTakesWithKeys(rowKeys);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 临近检测点差异性分析：根据两个卡口，选定车牌范围和时间段，返回所选时间段内分别经过两个卡口的车辆
	 * @param startDate
	 * @param endDate
	 * @param hphmList 车牌列表
	 * @param kkbma 卡口a
	 * @param kkhmb 卡口b
	 * (non-Javadoc)
	 * @see com.jp.tic.analyze.dao.CarTakeDao#getNearByPointDiffCar(java.util.Date, java.util.Date, java.util.List, java.lang.String, java.lang.String)
	 */
	@Override
	public Map<String, List<CarTake>> getNearByPointDiffCar(Date startDate,
			Date endDate, List<String> hphmList, String kkbma, String kkhmb)
			throws Exception {
		// TODO Auto-generated method stub
		
		return null;
	}

	
	/**
	 * 一时间内经过所有卡口的数据
	 */
	public PageEntity getMountSnapshotand(List<String> kkbhs, Date startDate, Date endDate, PageEntity page) throws Exception {
		Scan scan=new Scan();
		
		FilterList filterList=new FilterList();
		byte[] startKey=this.getBytes4Jgsj(endDate, null, null, false);
		if(startKey!=null){
			scan.setStartRow(BytesUtils.padTail(startKey, 100, (byte)0));
		}
		
		//stop
		byte[] stopKey=this.getBytes4Jgsj(startDate, null, null, false);
		if(stopKey!=null){
			scan.setStopRow(BytesUtils.padTail(stopKey, 100, (byte)255));
		}
		
		if(kkbhs!=null && kkbhs.size()>0){
			FilterList kkbhFilterList = new FilterList(Operator.MUST_PASS_ONE);
			for(String kkbh:kkbhs){
				Filter kkbhFilter=getKkbhFilter(kkbh, SysHBaseConstants.TABLE_NAME_INDEX_JGSJ);
				if(kkbhFilter!=null){
					kkbhFilterList.addFilter(kkbhFilter);
				}
			}
			filterList.addFilter(kkbhFilterList);
		}
		scan.setFilter(filterList);
		return super.queryDetailPage(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ, scan, page);
	}
	
	private byte[] getBytes4Hpys(String hpys, Date date,String hphm,String kkbh, boolean fummyHphm) throws Exception{
		if (hpys != null) {
			byte[] hpysBytes=keyHelper.getHpys4RowKeyPrefix(hpys);
			if(date!=null){
				byte[] temp=BytesUtils.add(hpysBytes, getTimeByte(date));
				if(hphm!=null&&fummyHphm==false){
					byte[] hphmBytes=keyHelper.getHphm4RowKey(hphm);
					BytesUtils.add(temp,hphmBytes);
				}
				if (kkbh!=null) {
					BytesUtils.add(temp,keyHelper.getKkbh4RowKeySubstring(kkbh));
				}
				return temp;
			} else {
				return null;
			}
			/*if(hphm!=null&&fummyHphm==false){
				if(date!=null){
					if(kkbh!=null){
						byte[] temp=BytesUtils.add(hphmBytes, getTimeByte(date));
						return BytesUtils.add(temp,keyHelper.getKkbh4RowKeySubstring(kkbh));
					}
					else{
						return BytesUtils.add(hphmBytes, getTimeByte(date));
					}
				}
				else{
					return hphmBytes;
				}
			} else {
				return null;
			}*/
		} else {
			return null;
		}
	}
	
	/**
	 * 测试solr与hbase整合查询
	 * @param param
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> testSearchInfo(Map<String, String> param) {
		List<String> colList = new ArrayList<String>();
		List<String> valList = new ArrayList<String>();
        String carFnum = "";
        String carBnum = "";
        Object[] carNameObj = null, carValuesObj = null;
        String carNum=param.get("carNum");
		if (StringUtil.checkStr(carNum)) {
			if(carNum.contains(";")){
				String[] carArray=carNum.split(";");
				param.put("carNum", carArray[0]);
				param.put("pageFlag", carArray[1]);
			}
			String[] carNums = param.get("carNum").split(",");
			carNameObj = new Object[carNums.length];
			carValuesObj = new Object[carNums.length];
			for (int j = 0; j < carNums.length; j++) {
				List<String> carNames = new ArrayList<String>();
		        List<String> varValues = new ArrayList<String>();
				if (StringUtil.equals(carNums[j], "-") ||
        				StringUtil.equals(carNums[j], "—") ||
        				StringUtil.equals(carNums[j], "无牌") ||
        				StringUtil.equals(carNums[j], "车牌") ||
        				StringUtil.equals(carNums[j], "无车牌") ||
        				StringUtil.equals(carNums[j], "null")) {
					 carNames.add("hphm"); //六位长度字段
                     varValues.add(carNums[j]);
				} else {
					String carFirstNum = carNums[j].substring(0, 1);
					String regex = "^[\u4E00-\u9FA5]+$"; //匹配中文
			    	boolean firstBoo = carFirstNum.matches(regex);
			    	String curNumStr = "";
			    	if (firstBoo) {
			    		curNumStr = carNums[j].substring(1, carNums[j].length());
					} else {
						carFirstNum = "";
						curNumStr = carNums[j];
					}
			        //车牌号码算法组合，目前以车牌号码6位数字来算，不包含中文的部分
			        if (firstBoo || StringUtil.checkStr(curNumStr)) {
			            if (firstBoo && !StringUtil.checkStr(curNumStr)) {
			                carFnum = carFirstNum;
			            } else if (!firstBoo && StringUtil.checkStr(curNumStr)) {
			                carBnum = curNumStr.trim();
			            } else {
			                carFnum = carFirstNum;
			                carBnum = curNumStr.trim();
			            }
			            int poa = carBnum.indexOf("*");
			            int pob = carBnum.indexOf("?");
			            if (StringUtil.isNotBlank(carFnum) && StringUtil.isBlank(carBnum)) {
			                carNames.add("carGNum");
			                varValues.add(carFnum);
			            } else if (StringUtil.isBlank(carFnum) && StringUtil.isNotBlank(carBnum)) {//粤A12345
			                if (poa == 0 || pob == 0) { //用户“*”或者“？”加在车牌号码前面的情况，需要特殊处理。
			                    if (carBnum.length() < 6) {   //不是完整的车牌查询
			                        //用户植入“*"或者“？”愚弄的情况下，排除掉，什么都不用写
			                        String[] carNumAsterisk = carBnum.split("\\*");
			                        //String[] carNumQuestion = carBnum.split("?");
			                        if (carBnum.length() == 5) { //*2345
			                            carNames.add("carCNum"); //四位长度字段
			                            String carCNum = carBnum.substring(1, 5);
			                            boolean boo = carBnum.endsWith("*");
			                            if (carNumAsterisk.length > 2 || carBnum.endsWith("*")) { //*234*,*2*45等，这情况必须符合三个字符以上
			                                carNames.add("carBNum"); 
			                                carNames.add("carDNum"); //三位长度字段
			                                varValues.add(carCNum);
			                                varValues.add(carCNum);
			                                varValues.add(carCNum);
			                            } else {
			                                varValues.add(carCNum);
			                            }
			                        }
			                        if (carBnum.length() == 4) { //*345
			                            carNames.add("carDNum"); //四位长度字段
			                            String carDNum = carBnum.substring(1, 4);
			                            if (carNumAsterisk.length > 2 || carBnum.endsWith("*")) {//*34*,*3*4
			                                carNames.add("carBNum"); 
			                                carNames.add("carCNum"); 
			                                carNames.add("carENum"); 
			                                varValues.add(carDNum);
			                                varValues.add(carDNum);
			                                varValues.add(carDNum);
			                                varValues.add(carDNum);
			                            } else {
			                                varValues.add(carDNum);
			                            }
			                        }
			                        if (carBnum.length() == 3) { //*45
			                            carNames.add("carENum"); //四位长度字段
			                            String carENum = carBnum.substring(1, 3);
			                            if (carNumAsterisk.length > 2 || carBnum.endsWith("*")) { //*4*
			                                carNames.add("carBNum"); 
			                                carNames.add("carCNum"); 
			                                carNames.add("carDNum");
			                                carNames.add("carFNum"); 
			                                varValues.add(carENum);
			                                varValues.add(carENum);
			                                varValues.add(carENum);
			                                varValues.add(carENum);
			                                varValues.add(carENum);
			                            } else {
			                                varValues.add(carENum);
			                            }
			                        }
			                        if (carBnum.length() == 2) { //*4
			                            carNames.add("carFNum"); //四位长度字段
			                            String carFNum = carBnum.substring(1, 2);
			                            varValues.add(carFNum);
			                        } 
			                        
			                    } else {  //长度为6，完整车牌查询,如“*12345”或者“*1234*”，“*123*5”
			                        carNames.add("carBNum"); //五位长度字段
			                        carNames.add("carCNum");
			                        String carBNum = carBnum.substring(1, carBnum.length());
			                        varValues.add(carBNum);
			                        varValues.add(carBNum);
			                    }
			                } else { //车牌号码第一位不是“*”或者“？”,甚至车牌号码中没有*和？。
			                    if (carBnum.length() < 6) {
			                        carNames.add("carANum"); //六位长度字段
			                        //过滤字符串存在“*”“？”的情况，并过滤“*”“？”存在车牌后面的情况
			                        String carBNum = "";
			                        if (carBnum.indexOf("*") >= 0 || carBnum.indexOf("?") >= 0) {
			                            carBNum = carBnum;
			                        } else {
			                            carBNum = carBnum + "*";
			                        }
			                        varValues.add(carBNum); 
			                    } else {
			                        carNames.add("carANum"); //六位长度字段
			                        varValues.add(carBnum); //六位长度或者多余六位可包含
			                    }
			                }
			            } else {
			                //粤A12345
			                if (poa == 0 || pob == 0) { //“*”或者“？”加在车牌号码前面的情况，需要特殊处理。
			                    carNames.add("carGNum"); 
			                    varValues.add(carFnum);
			                    if (carBnum.length() < 6) {   //不是完整的车牌查询
			                        //用户植入“*"或者“？”愚弄的情况下，排除掉，什么都不用写
			                        String[] carNumAsterisk = carBnum.split("\\*");
			                        //String[] carNumQuestion = carBnum.split("?");
			                        if (carBnum.length() == 5) { //*2345
			                            carNames.add("carCNum"); //四位长度字段
			                            String carCNum = carBnum.substring(1, 5);
			                            boolean  boo = carBnum.endsWith("*");
			                            if (carNumAsterisk.length > 2 || carBnum.endsWith("*")) { //*234*,*2*45等，这情况必须符合三个字符以上
			                                carNames.add("carBNum"); 
			                                carNames.add("carDNum"); //三位长度字段
			                                varValues.add(carCNum);
			                                varValues.add(carCNum);
			                                varValues.add(carCNum);
			                            } else {
			                                varValues.add(carCNum);
			                            }
			                        }
			                        if (carBnum.length() == 4) { //*345
			                            carNames.add("carDNum"); //四位长度字段
			                            String carDNum = carBnum.substring(1, 4);
			                            if (carNumAsterisk.length > 2 || carBnum.endsWith("*")) {//*34*,*3*4
			                                carNames.add("carBNum"); 
			                                carNames.add("carCNum"); 
			                                carNames.add("carENum"); 
			                                varValues.add(carDNum);
			                                varValues.add(carDNum);
			                                varValues.add(carDNum);
			                                varValues.add(carDNum);
			                            } else {
			                                varValues.add(carDNum);
			                            }
			                        }
			                        if (carBnum.length() == 3) { //*45
			                            carNames.add("carENum"); //四位长度字段
			                            String carENum = carBnum.substring(1, 3);
			                            if (carNumAsterisk.length > 2 || carBnum.endsWith("*")) { //*4*
			                                carNames.add("carBNum"); 
			                                carNames.add("carCNum"); 
			                                carNames.add("carDNum");
			                                carNames.add("carFNum"); 
			                                varValues.add(carENum);
			                                varValues.add(carENum);
			                                varValues.add(carENum);
			                                varValues.add(carENum);
			                                varValues.add(carENum);
			                            } else {
			                                varValues.add(carENum);
			                            }
			                        }
			                        if (carBnum.length() == 2) { //*4
			                            carNames.add("carFNum"); //四位长度字段
			                            String carFNum = carBnum.substring(1, 2);
			                            varValues.add(carFNum);
			                        } 
			                        
			                    } else {  //长度为6，完整车牌查询,如“*12345”或者“*1234*”，“*123*5”
			                        carNames.add("carBNum"); //五位长度字段
			                        carNames.add("carCNum");
			                        String carBNum = carBnum.substring(1, carBnum.length());
			                        varValues.add(carBNum);
			                        varValues.add(carBNum);
			                    }
			                } else { //车牌号码第一位不是“*”或者“？”,甚至车牌号码中没有*和？。
			                    if (carBnum.length() < 6) {
			                        carNames.add("hphm"); //六位长度字段
			                        //过滤字符串存在“*”“？”的情况，并过滤“*”“？”存在车牌后面的情况
			                        String carBNum = "";
			                        if (carBnum.indexOf("*") >= 0 || carBnum.indexOf("?") >= 0) {
			                            carBNum = carFnum + carBnum;
			                        } else {
			                            carBNum = carFnum + carBnum + "*";
			                        }
			                        varValues.add(carBNum); 
			                    } else {
			                        carNames.add("hphm"); //六位长度字段
			                        varValues.add(carFnum + carBnum); //六位长度或者多余六位可包含
			                    }
			                }
			            
			            }
			        }
				}
		        carNameObj[j] = carNames;
		        carValuesObj[j] = varValues;
			}
		}
		if (StringUtil.checkStr(param.get("mounts"))) {
			//这里判断页面上选的是卡口还是方向
			String[] kkbhs = param.get("mounts").split(",");
			String queryFlag = "mount"; //默认按卡口编号查询
			for (int i = 0; i < kkbhs.length; i++) {
				if (kkbhs[i].length() == 18 || kkbhs[i].length() == 4) {
					queryFlag = "mount";
					break;
				}
				if (kkbhs[i].length() == 10) {
					queryFlag = "direction";
					break;
				}
			}
			//至少会走其中的一个，默认走卡口查询
			if (StringUtil.equals(queryFlag, "mount")) {
				colList.add("kkbh");
			} 
			if (StringUtil.equals(queryFlag, "direction")) {
				colList.add("fxbh");
			}
			valList.add(param.get("mounts"));
		}
		if(StringUtil.checkStr(param.get("idstr"))){
			colList.add("xxbh");
			valList.add(param.get("idstr"));
		}
		//车辆品牌不为空,类型,年款为空的情况
		if (StringUtil.checkStr(param.get("carBrand")) && !StringUtil.checkStr(param.get("carType")) && !StringUtil.checkStr(param.get("carYear"))) {
			colList.add("brand");
			valList.add(param.get("carBrand"));
		} 
		//车辆品牌,类型不为空,年款为空的情况
		List<String> brandList = null;//剩下多余的勾选品牌
		List<String> typeList = null; //品牌_类型
		List<String> yearList = null; //品牌_类型_年款
		if (StringUtil.checkStr(param.get("carBrand")) && StringUtil.checkStr(param.get("carType"))  && !StringUtil.checkStr(param.get("carYear"))) {
			String[] praCarBrands = param.get("carBrand").split(",");
			brandList = new ArrayList<String>();
			for (int i = 0; i < praCarBrands.length; i++) {
				brandList.add(praCarBrands[i]);
			}
			String[] brandTypes = param.get("carType").split(",");
			typeList = new ArrayList<String>();
			List<String> carBrands = new ArrayList<String>();
			for (int i = 0; i < brandTypes.length; i++) {
				typeList.add(brandTypes[i]);
				carBrands.add(brandTypes[i].split("_")[0]);
			}
			if (carBrands != null) {
				brandList.removeAll(carBrands);
			}
		} 
		//车辆品牌,类型,年款不为空的情况
		if (StringUtil.checkStr(param.get("carBrand")) && StringUtil.checkStr(param.get("carType"))  && StringUtil.checkStr(param.get("carYear"))) {
			String[] praCarBrands = param.get("carBrand").split(",");
			brandList = new ArrayList<String>();
			for (int i = 0; i < praCarBrands.length; i++) {
				brandList.add(praCarBrands[i]);
			}
			String[] brandTypes = param.get("carType").split(",");
			typeList = new ArrayList<String>();
			List<String> carBrands = new ArrayList<String>();
			for (int i = 0; i < brandTypes.length; i++) {
				typeList.add(brandTypes[i]);
				carBrands.add(brandTypes[i].split("_")[0]);
			}
			String[] brandTypeYears = param.get("carYear").split(",");
			List<String> carTypes = new ArrayList<String>();
			yearList = new ArrayList<String>();
			for (int i = 0; i < brandTypeYears.length; i++) {
				yearList.add(brandTypeYears[i]);
				carTypes.add(brandTypeYears[i].split("_")[0] + "_" + brandTypeYears[i].split("_")[1]);
			}
			if (carTypes != null) {
				typeList.removeAll(carTypes);
			}
			if (carBrands != null) {
				brandList.removeAll(carBrands);
			}
		}
		//违章类型-->edit by zh.h(类别查询页面)
		if (StringUtil.checkStr(param.get("illegalType"))) {
			colList.add("xszt");
			valList.add(param.get("illegalType"));
		}
		//车辆类别、车身颜色、号牌颜色-->edit by zh.h(类别查询页面)
		if (StringUtil.checkStr(param.get("carCategory"))) {
			colList.add("clzl");
			valList.add(param.get("carCategory"));
		}
		if (StringUtil.checkStr(param.get("carColor"))) {
			colList.add("csys");
			valList.add(param.get("carColor"));
		}
		if (StringUtil.checkStr(param.get("hpys"))) {
			colList.add("hpys");
			valList.add(param.get("hpys"));
		}

		//各种特征---->Edit by zh.h(特征查询页面)
		if (StringUtil.checkStr(param.get("dropNum"))) {
			colList.add("dropnum");
			valList.add(param.get("dropNum"));
		}
		if (StringUtil.checkStr(param.get("boxNum"))) {
			colList.add("boxnum");
			valList.add(param.get("boxNum"));
		}
		if (StringUtil.checkStr(param.get("sunflag"))) {
			colList.add("sunflag");
			valList.add(param.get("sunflag"));
		}
		//安全带标识
		if (StringUtil.checkStr(param.get("seatbelt"))&& param.get("seatbelt").equals("1")) {
			colList.add("seatbelt");
			valList.add("0*");
		}
		/*if (StringUtil.checkStr(param.get("hpys"))) {
			colList.add("hpys");
			valList.add(param.get("hpys"));
		}*/
		if (StringUtil.checkStr(param.get("tagNum"))) {
			colList.add("tagnum");
			String operate=param.get("operate");
			if("<".equals(operate)){
				valList.add("[0 TO "+param.get("tagNum")+"}");
			}else if(">".equals(operate)){
				valList.add("{"+param.get("tagNum")+" TO 100]");
			}else{
				valList.add(param.get("tagNum"));
			}
		}
		
		if(StringUtil.checkStr(param.get("pageFlag"))&& (param.get("pageFlag").equals("carHidden")||param.get("pageFlag").equals("CARHIDDEN"))){
			colList.add("jgsj");
			String jgsjQuery=dataUtil.getCarHiddenSolrQuery(param.get("startTime"),param.get("endTime"));
			valList.add(jgsjQuery);
		}else{
			if (StringUtil.checkStr(param.get("startTime")) && StringUtil.checkStr(param.get("endTime"))) {
				colList.add("jgsj");
				String[] startTimes = param.get("startTime").split(",");
				String[] endTimes = param.get("endTime").split(",");
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
				String timeStr = "";
				Date startDate = null;
				Date endDate = null;
				for (int i = 0; i < startTimes.length; i++) {
					if (StringUtil.checkStr(timeStr)) {
						timeStr += ",";
					}
					startDate = DateUtil.parseToDate(startTimes[i], "yyyy-MM-dd HH:mm:ss");
					endDate = DateUtil.parseToDate(endTimes[i], "yyyy-MM-dd HH:mm:ss");
					String startTime = format.format(startDate);
		            String endTime = format.format(endDate);
		            timeStr  += "[" + startTime + " TO " + endTime + "]";
		            
				}
	            valList.add(timeStr);
			}
		}
		String[] field = new String[10];
        String[] key = new String[10];
        if (colList.size() == 0) {
            field[0] = "*";
            key[0] = "*";
        } else {
            for (int i = 0; i < colList.size(); i++) {
                field[i] = colList.get(i);
                key[i] = valList.get(i);
            }
        }
        //int pageStart = (StringUtil.toInt(param.get("page")) - 1) * StringUtil.toInt(param.get("rows"));
        int start=StringUtil.toInt(param.get("page.start"));
        int limit=StringUtil.toInt(param.get("page.limit"));
        if(StringUtil.checkStr(param.get("flag"))){//导出数据；导出最大为1000；后台导出最大为20000，异步；
        	start = StringUtil.toInt(param.get("page.start"));
        	limit = StringUtil.toInt(param.get("page.limit"));
        	if(StringUtil.checkStr(param.get("idstr"))){//勾选导出
        		String[] tmp=param.get("idstr").split(",");
        		limit=tmp.length;
        	}
        }
        Map<String, Object> itemMap = this.searhSolrData(field, key, limit, start, carNameObj, carValuesObj, carFnum, param.get("groupFlag"),brandList,typeList,yearList);
        List<CarTakeSolr> carTakes = (List<CarTakeSolr>) itemMap.get("rows");
        List<String> rowkeyList = new ArrayList<String>();
        if (carTakes != null && carTakes.size() > 0) {
        	for (CarTakeSolr carTake : carTakes) {
        		rowkeyList.add(carTake.getRowkey());
        	}
        }
        List<CarTake> result = null;
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
        itemMap.put("rows", result);
        return itemMap;
	}
	
	/**
	 * 数据去重
	 * @param datas
	 * @return
	 */
	public String dealReplyData(List<String> datas) {
		List<String> tempList= new ArrayList<String>();  
	    for(String str : datas){  
	        if(!tempList.contains(str)){  
	            tempList.add(str);  
	        }  
	    }  
	    String carBrandStr = "";
	    for (String brandStr : tempList) {
	    	if (StringUtil.checkStr(carBrandStr)) {
	    		carBrandStr += ",";
	    	}
	    	carBrandStr += brandStr;
	    }
	    return carBrandStr;
	}
	
	/**
	 * 查询solr中的数据
	 * @return 查询结果
	 */
	public Map<String, Object> searhSolrData(String[] field, String[] key, int limit, int start, 
			Object[] carNameObj, Object[] carValuesObj, String carFnum, String groupFlag,
			List<String> brandList,List<String> typeList,List<String> yearList) {
		//检测输入是否合法
        if (null == field || null == key || field.length != key.length) {
            return null;
        }
        SolrQuery query = new SolrQuery();
        Map<String, Object> resultMap = new HashMap<String, Object>();
        try {
        	Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
    		String solrFlag = MapGetUtils.getString(config, "solr.cloud.flag");
    		HttpSolrClient solrServer = null;
    		CloudSolrClient solrCloud = null;
    		if (StringUtil.equals(solrFlag, "single")) {
    			solrServer = SolrUtils.initSolr();
    		} else {
    			solrCloud = SolrUtils.initSolrCloud();
			}
        	StringBuffer buffer = new StringBuffer();
        	String[] mounts = null;
        	StringBuffer mountBuffer = new StringBuffer();
        	if (carNameObj != null && carValuesObj != null) {
        		List<String> carNames = null;
		        List<String> varValues = null;
		        StringBuffer carBuffer = new StringBuffer();
		        boolean startflag = true;
		        boolean nullFlag = true;
        		for (int m = 0; m < carNameObj.length; m++) {
        			carNames = (ArrayList<String>) carNameObj[m];
    		        varValues = (ArrayList<String>) carValuesObj[m];
    		        if (StringUtil.equals(varValues.get(0), "-") ||
	        				StringUtil.equals(varValues.get(0), "—") ||
	        				StringUtil.equals(varValues.get(0), "无牌") ||
	        				StringUtil.equals(varValues.get(0), "车牌") ||
	        				StringUtil.equals(varValues.get(0), "无车牌") ||
	        				StringUtil.equals(varValues.get(0), "null")) {
    		        	if (nullFlag) {
    		        		carBuffer.append("-" + carNames.get(0)+ ":['' TO *]");
    		        		buffer.append(carBuffer);
    		        		nullFlag = false;
    		        	}
		        	} else {
		        		if (startflag) {
		        			 buffer.append("(");
		        			 startflag = false;
	        			}
	    		        if (carNames != null && carNames.size() > 0) {
	    		        	if (StringUtil.checkStr(carBuffer.toString())) {
	    		        		carBuffer.append(" OR ");
	        				}
	    	                if (StringUtil.isNotBlank(carFnum)) {
	    	                    carBuffer.append(carNames.get(0) + ":" + varValues.get(0));
	    	                    if (carNames.size() > 2) { //至少两个查询条件
	    	                        carBuffer.append(" AND ");
	    	                        carBuffer.append("(");
	    	                        for (int i = 1; i < varValues.size() - 1 ; i++) {
	    	                            carBuffer.append(carNames.get(i) + ":" + varValues.get(i));
	    	                            carBuffer.append(" OR ");
	    	                        }
	    	                        if (StringUtil.isNotBlank(carNames.get(varValues.size() - 1))) {
	    	                            carBuffer.append(carNames.get(varValues.size() - 1) + ":" + varValues.get(varValues.size() - 1));
	    	                        }
	    	                        carBuffer.append(")");
	    	                    } else {
	    	                        if (carNames.size() > 1) {
	    	                            carBuffer.append(" AND ");
	    	                            carBuffer.append(carNames.get(1) + ":" + varValues.get(1));
	    	                        }
	    	                    }
	    	                } else {
	    	                    if (carNames.size() > 1) { //至少两个查询条件
	    	                        carBuffer.append("(");
	    	                        for (int i = 0; i < varValues.size() - 1; i++) {
	    	                            carBuffer.append(carNames.get(i) + ":" + varValues.get(i));
	    	                            carBuffer.append(" OR ");
	    	                        }
	    	                        if (StringUtil.isNotBlank(carNames.get(varValues.size() - 1))) {
	    	                            carBuffer.append(carNames.get(varValues.size() - 1) + ":" + varValues.get(varValues.size() - 1));
	    	                        }
	    	                        carBuffer.append(")");
	    	                    } else {
	    	                        carBuffer.append(carNames.get(0) + ":" + varValues.get(0));
	    	                    }
	    	                }
	    	            }
        			}
        		}
 		        if (!startflag) {
 		        	 buffer.append(carBuffer);
 		        	 buffer.append(")");
 		        }
        	}
        	StringBuffer brandBuffer = new StringBuffer();
        	if (brandList != null && typeList != null) {
        		if (StringUtil.checkStr(buffer.toString())) {
					buffer.append(" AND ");
				}
        		brandBuffer.append("(");
    			for (int i = 0; i < brandList.size(); i++) {
					brandBuffer.append("brand:" + brandList.get(i) + " OR ");
    			}
    			String[] brandTypes = null;
    			for (int j = 0; j < typeList.size(); j++) {
    				brandTypes = typeList.get(j).split("_");
    				if (j == typeList.size() - 1) {
    					brandBuffer.append("(brand:" + brandTypes[0] + " AND type:" + brandTypes[1] + ")");
					} else {
						brandBuffer.append("(brand:" + brandTypes[0] + " AND type:" + brandTypes[1] + ") OR ");
					}
        		}
    			if (yearList != null) {
    				if (brandList.size() > 0 || typeList.size() > 0) {
    					brandBuffer.append(" OR ");
    				}
    				String[] typeYear = null;
    				for (int m = 0; m < yearList.size(); m++) {
    					typeYear = yearList.get(m).split("_");
    					if (m == yearList.size() - 1) {
        					brandBuffer.append("(brand:" + typeYear[0] + " AND type:" + typeYear[1] + " AND caryear:" + typeYear[2] + ")");
    					} else {
    						brandBuffer.append("(brand:" + typeYear[0] + " AND type:" + typeYear[1] + " AND caryear:" + typeYear[2] + ") OR ");
    					}
    				}
    			}
        		brandBuffer.append(")");
        	}
        	if (StringUtil.checkObj(brandBuffer)) {
        		buffer.append(brandBuffer);
        	}
        	for (int i = 0; i < field.length; i++) {
        		if (StringUtil.isNotBlank(field[i])) {
        			if (StringUtil.equals(field[i], "kkbh")) {
        				mounts = key[i].split(",");
        				if (StringUtil.checkStr(buffer.toString())) {
        					buffer.append(" AND ");
        				}
        				buffer.append("(");
        				for (int j = 0; j < mounts.length; j++) {
        					if (StringUtil.checkStr(mountBuffer.toString())) {
        						mountBuffer.append(" OR ");
                    		}
        					mountBuffer.append(field[i] + ":" + mounts[j]);
        				}
        				buffer.append(mountBuffer);
        				buffer.append(")");
        			} else {
        				if (StringUtil.checkStr(buffer.toString())) {
                			buffer.append(" AND ");
                		}
        				if(key[i].indexOf(",")>0){
        					buffer.append("( ");
        					String[] str=key[i].split(",");
        					for(int j=0;j<str.length;j++){
        						if(j==str.length-1){
        							buffer.append(field[i] + ":" + str[j]+" ) ");
        						}else{
        							buffer.append(field[i] + ":" + str[j] +" OR ");
        						}
        					}
        				}else{
        					buffer.append(field[i] + ":" + key[i]);
        				}//hpys=0,1,2
					}
        		}
        	} 
        	
        	if (StringUtil.checkObj(buffer)) {
                query.setQuery(buffer.toString());
            }
            //设置起始位置与返回结果数
            query.setStart(start);
            query.setRows(limit);
            //设置排序
            if (StringUtil.equals(groupFlag, "carNum")) {
            	query.addSort("hphm", SolrQuery.ORDER.desc);
            	query.addSort("jgsj", SolrQuery.ORDER.desc);
            } else if (StringUtil.equals(groupFlag, "carType")) {
            	query.addSort("clzl", SolrQuery.ORDER.desc);
            	query.addSort("jgsj", SolrQuery.ORDER.desc);
            } else if (StringUtil.equals(groupFlag, "mounts")) {
            	/*query.setParam(GroupParams.GROUP, "true");
            	query.setParam(GroupParams.GROUP_FIELD, "kkbh");
            	query.setParam(GroupParams.GROUP_LIMIT, 20 + "");
            	query.setParam(GroupParams.GROUP_SORT, "jgsj desc");
            	query.setParam(GroupParams.GROUP_MAIN, "true");*/
	           	query.addSort("kkbh", SolrQuery.ORDER.desc);
	           	query.addSort("jgsj", SolrQuery.ORDER.desc);
            } else {
            	query.addSort("jgsj", SolrQuery.ORDER.desc);
			}
            QueryResponse rsp = null;
            try {
            	if (StringUtil.equals(solrFlag, "single")) {
            		rsp = solrServer.query(query);
        		} else {
        			rsp = solrCloud.query(query);
    			}
            } catch (Exception e) {
            	e.printStackTrace();
            }
            long amounts = rsp.getResults().getNumFound();
            //SolrDocumentList docs = rsp.getResults();
            List<CarTakeSolr> beans = rsp.getBeans(CarTakeSolr.class);
            resultMap.put("total", amounts);
            resultMap.put("rows", beans);
            //返回查询结果
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultMap;
	}
	
	/**
	 * 实时过车solr和HBase查询，各卡点均取最新一条数据
	 * 以jgsj作为排序
	 */
	public List<CarTake> dealWithRealCarData(List<String> statuMounts, Date startDate, Date endDate) {
		List<CarTake> list=new ArrayList<CarTake>();
		List<String> indexList=new ArrayList<String>();
		//StringBuffer sb=new StringBuffer();
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
		if(statuMounts.size()>0){
			StringBuffer buffer = null;
			String timeStr = "";
			if (startDate != null && endDate != null) {
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
	            String startTime = format.format(startDate);
	            String endTime = format.format(endDate);
	            timeStr = "jgsj:[" + startTime + " TO " + endTime + "]";
			}
			for(String str:statuMounts){
				buffer = new StringBuffer();
				if(str.length()==18 || str.length()==12){
					buffer.append("kkbh:" + str);
				}else{
					buffer.append("kkbh:440" + str);
				}
				if (StringUtil.checkStr(timeStr)) {
					buffer.append(" AND " + timeStr);
				}
				query.setQuery(buffer.toString());
				query.setSort("jgsj", ORDER.desc);
				query.setStart(0);
				query.setRows(1);
				
				try {
					if (StringUtil.equals(solrFlag, "single")) {
	            		rsp = solrServer.query(query);
	        		} else {
	        			rsp = solrCloud.query(query);
	    			}

				} catch (Exception e) {
					e.printStackTrace();
				}
				if(rsp.getBeans(CarTakeSolr.class).size()>0){
					indexList.add(rsp.getBeans(CarTakeSolr.class).get(0).getRowkey());
				}
			}
		}
		if(indexList.size()>0){
			List<byte[]> rowKeys=new ArrayList<byte[]>();
			for(String str:indexList){
				rowKeys.add(Bytes.toBytes(str));
			}
			list=this.getDatasByKeys(rowKeys);
		}
		return list;
	}
	
	/**
	 * 临近点分析solr和HBase查询
	 * 以jgsj作为排序
	 */
	@Override
	public List<CarTake> analyzeClosetPointquery(String json) {
		Map<String, String> searchParam=JsonUtil.jsonToMap(json);
		List<CarTake> list=new ArrayList<CarTake>();		
		List<CarTakeSolr> list_index=new ArrayList<CarTakeSolr>();
		if(searchParam.containsKey("kkbh1")&&searchParam.containsKey("kkbh2")){
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
//			--------------solr组装begin-----------------------
			StringBuffer sb=new StringBuffer();
			List<CarTakeSolr> solrList=new ArrayList<CarTakeSolr>();
//			if(searchParam.get("kkbh1").length()!=18){
//				searchParam.put("kkbh1","440"+searchParam.get("kkbh1"));
//			}
//			if(searchParam.get("kkbh2").length()!=18){
//				searchParam.put("kkbh2","440"+searchParam.get("kkbh2"));
//			}
			searchParam.put("kkbh1",searchParam.get("kkbh1"));
			searchParam.put("kkbh2",searchParam.get("kkbh2"));
			
	        sb.append("(kkbh:"+searchParam.get("kkbh1")+" OR kkbh:"+searchParam.get("kkbh2")+") AND ");
			
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
			Date startDate = DateUtil.parseToDate(searchParam.get("startdate"), "yyyy-MM-dd HH:mm:ss");
			Date endDate = DateUtil.parseToDate(searchParam.get("enddate"), "yyyy-MM-dd HH:mm:ss");
	        String startTime = format.format(startDate);
	        String endTime = format.format(endDate);
	        sb.append("jgsj:[" + startTime + " TO " + endTime + "] AND ");
	        sb.append("!hphm:\"\" AND ");
	        if(searchParam.containsKey("fxbh")){
	        	sb.append("fxbh:"+searchParam.get("fxbh"));
	        }
	        String str=sb.toString();
			if(str.lastIndexOf("AND")>str.lastIndexOf(":")){
				str=str.substring(0, str.lastIndexOf("AND"));
			}
			query.setQuery(str);
			if(searchParam.containsKey("page.start")){
				query.setStart(Integer.parseInt(searchParam.get("page.start")));
			}else{
				query.setStart(0);
			}
//			if(searchParam.containsKey("page.limit")){
//				query.setRows(Integer.parseInt(searchParam.get("page.limit")));
//			}else{
//				query.setRows(Integer.MAX_VALUE);
				query.setRows(10000);
//			}
//			SortClause s=new SortClause("jgsj","hphm");//多条件排序
			query.setSort("jgsj", ORDER.desc);
//			--------------solr组装end-----------------------
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
			Map<String,List<CarTakeSolr>> map=this.compareByMounts(solrList,searchParam.get("kkbh1"),searchParam.get("kkbh2"));
			//map=this.mathBySpeed(map,max_speed);
			list_index=map.get("fault");//取出所有违规数据
			if(list_index.size()>0){
				List<byte[]> rowKeys=new ArrayList<byte[]>();
				for(CarTakeSolr carTakeSolr:list_index){
					rowKeys.add(Bytes.toBytes(carTakeSolr.getRowkey()));
				}
				list=this.getDatasByKeys(rowKeys);
				/*测试
					int i=0;
					int j=0;
					for(CarTake c:list){
						if(c.getHphm().equals("粤C29107")){
							i++;
						}
						if(c.getHphm().equals("粤CLQ232")){
							j++;
						}
					}
					System.out.println("粤C29107 重复次数》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》"+i);
					System.out.println("粤CLQ232 重复次数》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》"+j);
				 */
				//倒序排列
				Collections.sort(list, new Comparator<CarTake>() {
					public int compare(CarTake o1, CarTake o2) {
						if(o2.getJgsj().after(o1.getJgsj())){
							return 1;
						}
						return -1;
					}
				});
			}
		}
		return list;
	}
	
	/**
	 * 过滤最高卡口经过速度不能超过最高限速
	 * @param map
	 * @param max_speed
	 * @return
	 */
	public Map<String,List<CarTakeSolr>> mathBySpeed(Map<String,List<CarTakeSolr>> map,String max_speed){
		List<CarTakeSolr> faultdata=map.get("fault");
		List<CarTakeSolr> nomaldata=map.get("nomal");
		float MAX_speed=Float.parseFloat(max_speed);
		if(nomaldata.size()>0){
			for(CarTakeSolr carTakeSolr:nomaldata){
				float speed=carTakeSolr.getClsd();
				if(MAX_speed<speed){
					faultdata.add(carTakeSolr);
					nomaldata.remove(carTakeSolr);
				}
			}
		}
		map.put("nomal", nomaldata);
		map.put("fault", faultdata);
		return map;
	}
	
	/**
	 * 通过经过卡口的时间排序后进行对比，筛选违规、正常数据。
	 * EditBy zh.h
	 * @param list
	 * A为起始卡口，B为终点卡口
	 * @return
	 */
	
	public Map<String,List<CarTakeSolr>> compareByMounts(List<CarTakeSolr> list,String kkbh1,String kkbh2){
		Map<String,List<CarTakeSolr>> map=new HashMap<String, List<CarTakeSolr>>();
		Map<Object,List<CarTakeSolr>> map_=new HashMap<Object, List<CarTakeSolr>>();
		List<CarTakeSolr> faultdata=new ArrayList<CarTakeSolr>();
		if(list.size()>0){
			for(CarTakeSolr carTakeSolr:list){
				//按车牌分组
				if(map_.containsKey(carTakeSolr.getHphm())){
					map_.get(carTakeSolr.getHphm()).add(carTakeSolr);
				}else{
					List<CarTakeSolr> list_=new ArrayList<CarTakeSolr>();
					list_.add(carTakeSolr);
					map_.put(carTakeSolr.getHphm(), list_);
				}
			}
			
			Iterator<Entry<Object, List<CarTakeSolr>>> it=map_.entrySet().iterator();
			while(it.hasNext()){
				Entry<Object, List<CarTakeSolr>> e=(Entry<Object, List<CarTakeSolr>>) it.next();
				String hphm=(String) e.getKey();
				List<CarTakeSolr> list_=(List<CarTakeSolr>) e.getValue(); 
//				if(hphm.equals("粤CLQ232")){
//					System.out.println("@!@#!@#!@"+list_.size()+">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
//				}
//				-------------------------车牌未被识别时----------------------------
				if(null==hphm||"".equalsIgnoreCase(hphm.trim())||"-".equals(hphm)||"——".equals(hphm)){
					if(list_.size()>0){
						for(int j=0;j<list_.size();j++){
							CarTakeSolr carTakeSolr=list_.get(j);
							faultdata.add(carTakeSolr);
							list.remove(carTakeSolr);
							list_.remove(carTakeSolr);
						}
					}
				}
//				-------------------------车牌可识别----------------------------
				if(list_.size()>0&&list_.size()==1){//获取时间范围内，同一车辆只经过A卡口或B卡口的数据
					faultdata.add(list_.get(0));
					list.remove(list_.get(0));
				}else{
//				--------同一辆车，后一次与前一次行车记录同时出现在同一个卡口---------
					String kkbh_=null;
					for(int i=0;i< list_.size();i++){
						CarTakeSolr carTakeSolr=list_.get(i);
						if(null!=kkbh_&&kkbh_.equals(carTakeSolr.getKkbh())){
							faultdata.add(list_.get(i-1));
							list.remove(list_.get(i-1));
							list_.remove(list_.get(i-1));
							if(i==list_.size()-1){
								faultdata.add(carTakeSolr);
								list.remove(carTakeSolr);
								list_.remove(carTakeSolr);
							}
						}
						kkbh_=carTakeSolr.getKkbh();
					}
//				-----------同一车辆经过A、B卡口的次数由奇转为偶进行分类判断--------
					if(list_.size()>0){
						if(list_.size()%2!=0){//奇数
							String kkbh=list_.get(0).getKkbh();
							if(kkbh.equals(kkbh1)){//同一车辆经过记录最后为A时
								faultdata.add(list_.get(0));
								list.remove(list_.get(0));
							}else{//同一车辆经过记录最后为B时
								faultdata.add(list_.get(list_.size()-1));
								list.remove(list_.get(list_.size()-1));
							}
						}
					}
				}
			}
			
		}
		map.put("nomal", list);
		map.put("fault", faultdata);
		return map;
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
	

	/**
	 * test
	 * @param args
	 */
	public static void main(String[] args) {
		String str="((brand:\"雪铁龙\" AND type:\"飞扬皮卡\" AND caryear:\"2014\") OR (brand:\"猎豹\" AND type:\"丘比特\")) AND jgsj:[2015-10-01T00:00:00Z TO 2015-10-01T10:33:06Z]";
		List<CarTakeSolr> solrList=new ArrayList<CarTakeSolr>();
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
		query.setQuery(str);
//		SortClause s=new SortClause("jgsj","hphm");//多条件排序
		query.setSort("jgsj", ORDER.desc);
//		--------------solr组装end-----------------------
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
		for(CarTakeSolr CarTakeSolr:solrList){
			System.out.println(CarTakeSolr.getBrand());
		}
	}

}
