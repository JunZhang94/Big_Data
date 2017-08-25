package com.jp.tic.analyze.dao.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang.ClassUtils;
import org.apache.hadoop.hbase.client.Get;
import org.apache.hadoop.hbase.client.HTableInterface;
import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.client.Scan;
import org.apache.hadoop.hbase.util.Bytes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.hadoop.hbase.RowMapper;
import org.springframework.data.hadoop.hbase.TableCallback;
import org.springframework.stereotype.Repository;

import com.jp.tic.analyze.dao.CarQueryDao;
import com.jp.tic.analyze.entity.CarAssemble;
import com.jp.tic.analyze.util.CarAssembleSortUtils;
import com.jp.tic.analyze.util.ResultConvertUtils;
import com.jp.tic.business.cartake.mapper.BasicDataQueryMapper;
import com.jp.tic.common.hbase.query.ScanRowKeyParam;
import com.jp.tic.framework.hbase.JPHbaseTemplate;
import com.jp.tic.framework.log.ApplicationLogging;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.hbase.SysHBaseConstants;

/**
 * <b>function:</b> implements
 * @author hoojo
 * @createDate 2014-5-23 下午02:17:55
 * @file CarQueryDaoImpl.java
 * @package com.jp.tic.analyze.dao.impl
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
@Repository
public class CarQueryDaoImpl<E extends Map<String, Object>> extends ApplicationLogging implements CarQueryDao<E> {

	@Autowired
	private JPHbaseTemplate template;
	
	@Autowired
	private BasicDataQueryMapper<E> mapper;
	
	@SuppressWarnings("unchecked")
	@Override
	public E analyzePointPosition(ScanRowKeyParam param, final String type) throws Exception {
		
		Scan scan = new Scan();
		scan.addFamily(SysHBaseConstants.CF_INDEX_NAME);
		scan.setFilter(param.getList());
		if (param.getTimeRange() != null) {
			scan.setTimeRange(param.getTimeRange()[0], param.getTimeRange()[1]);
		}
		
		final E result = (E) new HashMap<String, Object>();
		template.find("index_jgsj2", scan, new RowMapper<E>() {
			
			@Override
			@SuppressWarnings("unchecked")
			public E mapRow(Result rs, int i) throws Exception {
				
				Map<String, byte[]> index = ResultConvertUtils.asc(rs, null);
				final byte[] rowkey = index.get(SysHBaseConstants.CF_INDEX_NAME_STR);
				
				
				E data = template.get(SysHBaseConstants.TABLE_NAME_CAR_TAKE, rowkey, new RowMapper<E>() {
					@Override
					public E mapRow(Result result, int i) throws Exception {
						E item = (E) ResultConvertUtils.desc(result, false);
						return item;
					}
				});
				
				Date jgsj = (Date) MapUtils.getObject(data, SysHBaseConstants.QN_JGSJ_STR);
				Calendar cal = Calendar.getInstance();
				cal.setTime(jgsj);
				
				statCount(cal, type, result);
				return data;
			}
		});
		
		return result;
	}
	
	@SuppressWarnings("unchecked")
	private void statCount(Calendar cal, String type, E yearMap) {
		
		String monthKey = cal.get(Calendar.MONTH) + "月";
		E monthMap = null;
		if (!"month".equals(type)) {
			if (yearMap.containsKey(monthKey) && ClassUtils.isAssignable(yearMap.get(monthKey).getClass(), Map.class)){
				monthMap = (E) yearMap.get(monthKey);
			} else {
				monthMap = (E) new HashMap<String, Object>();
				if ("week".equals(type) || "day".equals(type)) {
					initMapData(type, monthMap);
				} 
				yearMap.put(monthKey, monthMap);
			}
		} else {
			if (!yearMap.containsKey(type)) {
				initMapData(type, yearMap);
			}
		}
		
		
		String key = "";
		if ("hour".equals(type)) {
			key = cal.get(Calendar.DAY_OF_MONTH) + "日";
			
			E dayMap = null;
			if (monthMap.containsKey(key) && ClassUtils.isAssignable(monthMap.get(key).getClass(), Map.class)) {
				dayMap = (E) monthMap.get(key);
			} else {
				dayMap = (E) new HashMap<String, Object>();
				initMapData(type, dayMap);
				monthMap.put(key, dayMap);
			}
			
			key =  cal.get(Calendar.HOUR_OF_DAY) + "时";
			sum(type, key, dayMap);
			
		} else if ("day".equals(type)) {
			key = cal.get(Calendar.DAY_OF_MONTH) + "日";
			sum(type, key, monthMap);
		} else if ("week".equals(type)) {
			key = cal.get(Calendar.DAY_OF_WEEK_IN_MONTH) + "周";
			sum(type, key, monthMap);
		} else if ("month".equals(type)) {
			sum(type, monthKey, yearMap);
		}
	}
	
	@SuppressWarnings({ "unused", "unchecked" })
	private void sum(String type, String key, E countMap) {
		List<E> items = (List<E>) countMap.get(type);
		boolean flag = false;
		for (E item : items) {
			if (key.equals(item.get("name"))) {
				item.put("data", Integer.parseInt(item.get("data").toString()) + 1);
				flag = true;
				break;
			}
		}
		if (!flag) {
			Map<String, Object> item = new HashMap<String, Object>();
			item.put("name", key);
			item.put("data", 1);
			items.add((E) item);
		}
	}
	
	@SuppressWarnings("unchecked")
	private void initMapData(String type, E data) {
		List<E> items = new ArrayList<E>();
		if ("hour".equals(type)) {
			for (int i = 0; i < 24; i++) {
				Map<String, Object> item = new HashMap<String, Object>();
				item.put("name", i + "时");
				item.put("data", 0);
				items.add((E) item);
			}
			
		} else if ("day".equals(type)) {
			for (int i = 1; i <= 31; i++) {
				Map<String, Object> item = new HashMap<String, Object>();
				item.put("name", i + "日");
				item.put("data", 0);
				items.add((E) item);
			}
		} else if ("week".equals(type)) {
			for (int i = 1; i <= 5; i++) {
				Map<String, Object> item = new HashMap<String, Object>();
				item.put("name", i + "周");
				item.put("data", 0);
				items.add((E) item);
			}
		} else {
			for (int i = 1; i <= 12; i++) {
				Map<String, Object> item = new HashMap<String, Object>();
				item.put("name", i + "月");
				item.put("data", 0);
				items.add((E) item);
			}
		}
		data.put(type, items);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public E analyzeFakePlateVehicles(ScanRowKeyParam param) throws Exception {
		
		Scan scan = new Scan();
		scan.addFamily(SysHBaseConstants.CF_INDEX_NAME);
		scan.setFilter(param.getList());
		if (param.getTimeRange() != null) {
			scan.setTimeRange(param.getTimeRange()[0], param.getTimeRange()[1]);
		}
		
		final E result = (E) new HashMap<String, Object>();
		template.find("index_jgsj2", scan, new RowMapper<E>() {

			@Override
			@SuppressWarnings("unchecked")
			public E mapRow(Result rs, int i) throws Exception {
				
				Map<String, byte[]> index = ResultConvertUtils.asc(rs, null);
				final byte[] rowkey = index.get(SysHBaseConstants.CF_INDEX_NAME_STR);
				
				
				E data = template.get(SysHBaseConstants.TABLE_NAME_CAR_TAKE, rowkey, new RowMapper<E>() {
					@Override
					public E mapRow(Result result, int i) throws Exception {
						E item = (E) ResultConvertUtils.desc(result, false);
						E mount = mapper.findMountById(item);
						if (mount != null) {
							item.putAll(mount);
						}
						return item;
					}
				});
				
				String hphm = MapUtils.getString(data, SysHBaseConstants.QN_HPHM_STR);
				if (result.containsKey(hphm)) {
					List<E> item = (List<E>) result.get(hphm);
					item.add(data);
					result.put(hphm, item);
				} else {
					List<E> item = new ArrayList<E>();
					item.add(data);
					result.put(hphm, item);
				}
				
				return data;
			}
		});
		
		return result;
	}

	/*
	 * 疑似套牌车分析
	 * */
	@SuppressWarnings("unchecked")
	@Override
	public E analyzeFakePlateVehicless(ScanRowKeyParam param) throws Exception {
		
		Scan scan = new Scan();
		scan.addFamily(SysHBaseConstants.CF_INDEX_NAME);
		scan.setFilter(param.getList());
		if (param.getTimeRange() != null) {
			scan.setTimeRange(param.getTimeRange()[0], param.getTimeRange()[1]);
		}
		
		final E result = (E) new HashMap<String, Object>();
		template.find("index_jgsj2", scan, new RowMapper<E>() {

			@Override
			@SuppressWarnings("unchecked")
			public E mapRow(Result rs, int i) throws Exception {
				
				Map<String, byte[]> index = ResultConvertUtils.asc(rs, null);
				final byte[] rowkey = index.get(SysHBaseConstants.CF_INDEX_NAME_STR);
				
				
				E data = template.get(SysHBaseConstants.TABLE_NAME_CAR_TAKE, rowkey, new RowMapper<E>() {
					@Override
					public E mapRow(Result result, int i) throws Exception {
						E item = (E) ResultConvertUtils.desc(result, false);
						E mount = mapper.findMountById(item);
						if (mount != null) {
							item.putAll(mount);
						}
						return item;
					}
				});
				
				String hphm = MapUtils.getString(data, SysHBaseConstants.QN_HPHM_STR);
				if (result.containsKey(hphm)) {
					List<E> item = (List<E>) result.get(hphm);
					item.add(data);
					result.put(hphm, item);
				} else {
					List<E> item = new ArrayList<E>();
					item.add(data);
					result.put(hphm, item);
				}
				
				return data;
			}
		});
		
		return result;
	}
	
	
	@SuppressWarnings("unchecked")
	@Override
	public List<E> analyzeRate(ScanRowKeyParam param) throws Exception {
		Scan scan = new Scan();
		scan.addFamily(SysHBaseConstants.CF_INDEX_NAME);
		scan.setFilter(param.getList());
		if (param.getTimeRange() != null) {
			scan.setTimeRange(param.getTimeRange()[0], param.getTimeRange()[1]);
		}
		
		if (param.getStartKey() != null) {
			scan.setStartRow(param.getStartKey());
		}
		if (param.getStopKey() != null) {
			scan.setStopRow(param.getStopKey());
		}
		
		final Map<String, CarAssemble> statCount = new HashMap<String, CarAssemble>();
		
		template.find(SysHBaseConstants.TABLE_NAME_INDEX_KKBH, scan, new RowMapper<E>() {
			
			
			@Override
			public E mapRow(Result rs, int i) throws Exception {
				Map<String, byte[]> index = ResultConvertUtils.asc(rs, null);
				final byte[] rowkey = index.get(SysHBaseConstants.CF_INDEX_NAME_STR);
				
				E data = template.execute(SysHBaseConstants.TABLE_NAME_CAR_TAKE, new TableCallback<E>() {
					@SuppressWarnings("unchecked")
					@Override
					public E doInTable(HTableInterface table) throws Throwable {

						Get key = new Get(rowkey);
						key.addColumn(SysHBaseConstants.CF_CAR_TAKE_NAME, SysHBaseConstants.QN_HPHM);
						key.addColumn(SysHBaseConstants.CF_CAR_TAKE_NAME, SysHBaseConstants.QN_CLLX);
						Result result = table.get(key);
						E data = (E) ResultConvertUtils.desc(result, false);
						
						return data;
					}
				});
				
				String hphm = MapUtils.getString(data, SysHBaseConstants.QN_HPHM_STR);
				if (statCount.containsKey(hphm)) {
					CarAssemble car = (CarAssemble) statCount.get(hphm);
					car.setNumber(car.getNumber() + 1);
					statCount.put(hphm, car);
				} else {
					statCount.put(hphm, new CarAssemble(hphm, MapUtils.getString(data, SysHBaseConstants.QN_CLLX_STR), 1));
					/*Map<String, Object> hpzl = new HashMap<String, Object>();
					hpzl.put("val", MapUtils.getString(data, SysHBaseConstants.QN_CLLX_STR, ""));
					hpzl.put("type", "CarType");
					//String cllx = mapper.findWordbookByType((E) hpzl);
					
					statCount.put(hphm, new CarAssemble(hphm, null, 1));*/
				}
				return null;
			}
		});
		
		Map<String, Object> result = CarAssembleSortUtils.sortMapByValue(statCount);
		System.out.println(result);
		List<E> statResult = new ArrayList<E>();
		statResult.add((E)result);
		return statResult;
	}

	@Override
	public List<E> queryCar(ScanRowKeyParam param) throws Exception {
		Scan scan = new Scan();
		scan.addFamily(SysHBaseConstants.CF_INDEX_NAME);
		scan.setFilter(param.getList());
		if (param.getTimeRange() != null) {
			scan.setTimeRange(param.getTimeRange()[0], param.getTimeRange()[1]);
		}
		//scan.setBatch(100);//XXX
		//scan.setCaching(100);
		
		scan.setStartRow(param.getStartKey());
		scan.setStopRow(param.getStopKey());
		
		List<E> result = template.find(SysHBaseConstants.TABLE_NAME_INDEX_KKBH, scan, new RowMapper<E>() {
			
			@SuppressWarnings("unchecked")
			@Override
			public E mapRow(Result rs, int i) throws Exception {
				Map<String, byte[]> index = ResultConvertUtils.asc(rs, null);
				final byte[] rowkey = index.get(SysHBaseConstants.CF_INDEX_NAME_STR);
				
				E data = template.execute(SysHBaseConstants.TABLE_NAME_CAR_TAKE, new TableCallback<E>() {
					@SuppressWarnings("unchecked")
					@Override
					public E doInTable(HTableInterface table) throws Throwable {

						Get key = new Get(rowkey);
						Result result = table.get(key);
						
						CarTake take=ResultConvertUtils.toTake(result);
						E data = (E) com.jp.tic.common.util.MapUtils.toMap(take);
						//E data = (E) ResultConvertUtils.desc(result, false);
						
						return data;
					}
				});
				data.put("rowkey", Bytes.toString(rs.getRow()));
				
				data.put("kkbh", MapUtils.getString(data, "kkbh", ""));
				E mount = mapper.findMountById(data);
				if (mount != null) {
					data.putAll(mount);
				}
				
				Map<String, Object> hpys = new HashMap<String, Object>();
				hpys.put("val", MapUtils.getString(data, "hpys", ""));
				hpys.put("type", "LicPlateColor");
				data.put("hpys2", mapper.findWordbookByType((E) hpys));
				
				Map<String, Object> hpzl = new HashMap<String, Object>();
				hpzl.put("val", MapUtils.getString(data, "hpzl", ""));
				hpzl.put("type", "LicPlateType");
				data.put("hpzl2", mapper.findWordbookByType((E) hpzl));
				
				Set<String> keys=new HashSet<String>(data.keySet());
				for(String key:keys){
					if(data.get(key)==null){
						data.remove(key);
					}
				}
				
				return data;
			}
		});
		
		return result;
	}
}
