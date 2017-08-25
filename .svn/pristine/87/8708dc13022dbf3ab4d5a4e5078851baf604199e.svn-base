package com.jp.tic.analyze.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.apache.commons.lang.time.DateUtils;
import org.apache.hadoop.hbase.filter.FilterList;
import org.apache.hadoop.hbase.filter.PageFilter;
import org.apache.hadoop.hbase.util.Bytes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.analyze.dao.CarQueryDao;
import com.jp.tic.analyze.service.QueryAnalyzeStatService;
import com.jp.tic.analyze.util.FakePlateVehiclesAnalyzeUtils;
import com.jp.tic.common.hbase.query.JPHBaseFilterHelper;
import com.jp.tic.common.hbase.query.ScanRowKeyParam;
import com.jp.tic.framework.service.impl.AbstractService;
import com.jp.tic.system.hbase.JPControlKeyHelper;

/**
 * <b>function:</b> QueryAnalyzeStatService IMPLEMENTS
 * @author hoojo
 * @createDate 2014-5-23 下午06:20:36
 * @file QueryAnalyzeStatServiceImpl.java
 * @package com.jp.tic.analyze.service.impl
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
@Service
public class QueryAnalyzeStatServiceImpl<E extends Map<String, Object>> extends AbstractService implements QueryAnalyzeStatService<E> {

	@Autowired
	private CarQueryDao<E> dao;
	
	private final static JPControlKeyHelper helper = new JPControlKeyHelper();
	
	@SuppressWarnings("unchecked")
	@Override
	public E analyzePointPosition(E params) throws Exception {
		
		ScanRowKeyParam param = new ScanRowKeyParam();
		param.setList(new FilterList());
		
		byte[] mount = helper.getKkbh4RowKeyPrefix(MapUtils.getString(params, "mount", ""));
		Date start = getTime(params, "startDate");
		Date end = getTime(params, "endDate");
		if (start != null) {
			byte[] timeByte = getTimeByte(start, null, null);
			byte[] stopKey = Bytes.add(mount, timeByte);
			param.setStopKey(Bytes.add(stopKey, new byte[60 - stopKey.length]));
		} else {
			param.setStartKey(Bytes.add(mount, new byte[60 - mount.length]));
		}
		if (end != null) {
			byte[] startKey = Bytes.add(mount, getTimeByte(end, null, null));
			param.setStartKey(Bytes.add(startKey, new byte[60 - startKey.length]));
		} else {
			//param.setStopKey(Bytes.add(mount, new byte[64 - mount.length]));
		}
		
		if (start != null && end != null) {
			param.setTimeRange(new long[] { DateUtils.addHours(start, -1).getTime(), DateUtils.addHours(end, 1).getTime() });
		}
		
		Map data = dao.analyzePointPosition(param, MapUtils.getString(params, "type"));
		
		return (E) data;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public E analyzeFakePlateVehicles(E params) throws Exception {

		ScanRowKeyParam param = new ScanRowKeyParam();
		param.setList(new FilterList());
		param.getList().addFilter(new PageFilter(500));
		
		//param.getList().addFilter(JPHBaseFilterHelper.getSubRowFilter(plateNo));
		
		Date start = getTime(params, "startDate");
		Date end = getTime(params, "endDate");
		if (start != null) {
			byte[] timeByte = getTimeByte(start, null, null);
			param.setStopKey(Bytes.add(timeByte, new byte[60 - timeByte.length]));
		} else {
		}
		if (end != null) {
			byte[] startKey =  getTimeByte(end, null, null);
			param.setStartKey(Bytes.add(startKey, new byte[60 - startKey.length]));
		} else {
		}
		
		if (start != null && end != null) {
			param.setTimeRange(new long[] { DateUtils.addHours(start, -1).getTime(), DateUtils.addHours(end, 1).getTime() });
		}
		
		Map data = dao.analyzeFakePlateVehicles(param);
		
		Map<String, List<Map<String, Object>>> map = FakePlateVehiclesAnalyzeUtils.transformMap(data);
		Map item = FakePlateVehiclesAnalyzeUtils.analyzeSpeed(map);
		
		return (E) item;
	}

	@Override
	public List<E> analyzeRate(E params) throws Exception {

		ScanRowKeyParam param = new ScanRowKeyParam();
		param.setList(new FilterList());
		param.getList().addFilter(new PageFilter(10000));
		
		byte[] mount = helper.getKkbh4RowKeyPrefix(MapUtils.getString(params, "mount", ""));
		Date start = getTime(params, "startDate");
		Date end = getTime(params, "endDate");
		if (start != null) {
			byte[] timeByte = getTimeByte(start, null, null);
			byte[] stopKey = Bytes.add(mount, timeByte);
			param.setStopKey(Bytes.add(stopKey, new byte[60 - stopKey.length]));
		} else {
			param.setStartKey(Bytes.add(mount, new byte[60 - mount.length]));
		}
		if (end != null) {
			byte[] startKey = Bytes.add(mount, getTimeByte(end, null, null));
			param.setStartKey(Bytes.add(startKey, new byte[60 - startKey.length]));
		} else {
			//param.setStopKey(Bytes.add(mount, new byte[64 - mount.length]));
		}
		
		if (start != null && end != null) {
			param.setTimeRange(new long[] { DateUtils.addHours(start, -1).getTime(), DateUtils.addHours(end, 1).getTime() });
		}
		
		return dao.analyzeRate(param);
	}

	@Override
	public List<E> queryCar(E params) throws Exception {

		ScanRowKeyParam param = new ScanRowKeyParam();
		param.setList(new FilterList());
		param.getList().addFilter(new PageFilter(MapUtils.getIntValue(params, "pageSize", 20) + 1));
		String plateNo = MapUtils.getString(params, "plateNo", "");
		param.getList().addFilter(JPHBaseFilterHelper.getSubRowFilter(plateNo));
		String kkbh=MapUtils.getString(params, "mount", "");
		param.getList().addFilter(JPHBaseFilterHelper.getPrefixFilter(kkbh));
		
		Object beginKey = MapUtils.getObject(params, "startKey", new byte[0]);
		Object endKey =  MapUtils.getObject(params, "stopKey", new byte[0]);
		
		byte[] startKeyByte = (byte[]) beginKey;
		byte[] stopKeyByte = (byte[]) endKey;
		
		Date start = getTime(params, "startDate");
		Date end = getTime(params, "endDate");
		
		byte[] mount = helper.getKkbh4RowKeyPrefix(kkbh);
		
		if(startKeyByte.length > 10){
			//分页中的开始
			param.setStartKey(startKeyByte);
		}
		else{
			if (end != null) {
				//结束时间不为空时,以卡口+结束时间+0数组为startkey
				byte[] timeByte = getTimeByte(end, null, null);
				byte[] startKey = Bytes.add(mount, timeByte);
				
				param.setStartKey(Bytes.add(startKey, new byte[60 - startKey.length]));
			} else {
				//结束时间为空时,以卡口编号+0数据为startkey
				param.setStartKey(Bytes.add(mount, new byte[64 - mount.length]));
			}
		}
		
		if (stopKeyByte.length > 10) {
			//分页中的结束
			param.setStopKey(stopKeyByte);
		}
		else{
			byte[] s255=new byte[100];
			for(int i=0;i<s255.length;i++){
				s255[i]=(byte)255;
			}
			
			if (start != null) {
				//开始时间不为空时,以卡口+开始时间+255数组为stopkey
				byte[] timeByte = getTimeByte(start, null, null);
				byte[] stopKey = Bytes.add(mount, timeByte);
				
				param.setStopKey(Bytes.add(stopKey, s255));
			} else {
				//开始时间为空时,以卡口编号+255数组为stopkey
				//param.setStopKey(Bytes.add(mount, s255));
			}
		}
		
		if (start != null && end != null) {
			//param.setTimeRange(new long[] { DateUtils.addHours(start, -1).getTime(), DateUtils.addHours(end, 1).getTime() });
		}
		
		log.info(ReflectionToStringBuilder.toString(param, ToStringStyle.SHORT_PREFIX_STYLE));
		return dao.queryCar(param);
	}
	
	private Date getTime(E params, String timeKey) throws Exception {
		String date = MapUtils.getString(params, timeKey);
		if (date == null || date.length() == 0) {
			return null;
		} else {
			return DateUtils.parseDate(date, new String[] { "yyyy-MM-dd HH:mm:ss" });
		}
	}

	private byte[] getTimeByte(Date datetime, E params, String timeKey) throws Exception {
		if (datetime == null) {
			datetime = getTime(params, timeKey);
		} else {
			return helper.getBytes4Jgsj(helper.formatter.format(datetime));
		}
		return null;
	}
}
