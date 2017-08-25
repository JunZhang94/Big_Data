package com.jp.tic.analyze.service;

import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.jp.tic.analyze.dao.impl.AbstractKKHBaseDao.KKRowKey;
import com.jp.tic.analyze.entity.PageEntity;
import com.jp.tic.analyze.entity.SliceEntity;
import com.jp.tic.system.entity.CarTake;

public interface CarTakeService {
	public CarTake getTake(byte[] rowKey);
	public List<CarTake> getTakes(List<byte[]> rowKeys);
	
	public List<CarTake> getCarTrace(String hphm, Date startDate, Date endDate, int count) throws Exception;
	
	/**
	 * 查询地图轨迹数据
	 * @param hphm 号牌号码
	 * @param startDate 开始时间
	 * @param endDate 结束时间
	 * @param count
	 * @return
	 * @throws Exception
	 */
	public List<CarTake> getCarTraceForSolr(String hphm, Date startDate, Date endDate, int count) throws Exception;
	
	public List<CarTake> getCarSnapshot(List<String> hphms, Date startDate, Date endDate, int count) throws Exception; 
	public List<CarTake> getMountSnapshot(String kkbh, Date startDate, Date endDate, int count) throws Exception;
	public List<CarTake> getMountSnapshot(List<String> kkbhs, Date startDate, Date endDate, int count) throws Exception; 
	
	/**
	 * 查询实时过车数据，数据查询方式为solr查询
	 * @param kkbhs
	 * @param startDate
	 * @param endDate
	 * @param count
	 * @return
	 * @throws Exception
	 */
	public List<CarTake> getRealtimeTakes(List<String> kkbhs, Date startDate, Date endDate, int count) throws Exception; 
	
	public List<CarTake[]> getDummyCar(Date startDate, Date endDate, Map<String,Integer> distances, int maxSpeed) throws Exception;
	public Map<Date[],Long[]> getCount4MountCount(String kkbh,Date date) throws Exception;
	
	public List<CarTake> queryCarTake(String kkbh,Date startDate,Date endDate, String hphm, int count, boolean fummyHphm) throws Exception;
	
	public PageEntity queryCarTake(String kkbh,Date startDate,Date endDate, String hphm, PageEntity page) throws Exception ;
	
	/**
	 * 分页查询时空分析数据,及历史过车数据
	 * @param kkbh
	 * @param startDate
	 * @param endDate
	 * @param hphm
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public PageEntity getHistoryCarTakes(String kkbh, Date startDate, Date endDate, String hphm, PageEntity page) throws Exception;
	
	public PageEntity queryCarTake(String kkbh,Date startDate,Date endDate, String hphm, PageEntity page, boolean fummyHphm) throws Exception;
	public PageEntity queryCarTake(Date startDate,Date endDate, String csys, String cllx, String clpp, String hpzl, PageEntity page) throws Exception ;
	public PageEntity queryCarTake(Date startDate,Date endDate,List<String> kkbhs, List<String> hphms, PageEntity page) throws Exception ;
	
	public SliceEntity queryCarTake(String kkbh,Date startDate,Date endDate, String hphm, SliceEntity slice) throws Exception ;
	public SliceEntity queryCarTake(String kkbh,Date startDate,Date endDate, String hphm, SliceEntity slice, boolean fummyHphm) throws Exception;
	
	public SliceEntity queryCarTake(Date startDate,Date endDate,List<String> kkbhs, List<String> hphms, SliceEntity slice) throws Exception ;
	
	public SliceEntity queryCarTake(Date startDate,Date endDate, String csys, String cllx, String clpp, String hpzl, SliceEntity slice) throws Exception ;
	
	public Iterator<KKRowKey> getRowkeyIt(String talbeName) throws Exception;
	
	public Map<String,List<CarTake>> getFollowingCar(Date startDate, Date endDate, String hphm, int mintueOffset, int minCount) throws Exception;
	public Map<String,List<CarTake>> getFollowingCar(Date startDate, Date endDate, String hphm,List<String> kkbhs, int mintueOffset, int minCount) throws Exception;
	//临近点，返回<号牌号码，过车数据列表>
	public Map<String,List<CarTake>> getTrannelException(Date startTime, Date endTime, String kkbh1, String kkbh2)throws Exception;
	
	//加方向编号;增加车辆品牌接口carBrand,carType,carYear
	public PageEntity queryCarTake(Date startDate,Date endDate,List<String> kkbhs, List<String> hphms, List<String> fxbhs, String hpys,String carBrand,String carType,String carYear,PageEntity page) throws Exception ;
	
	//同时符合经过所有可卡口的数据
	public PageEntity getMountSnapshotand(List<String> kkbhs, Date startDate, Date endDate, PageEntity page) throws Exception;
	
	/**
	 * 真正按方向编号进行查询;增加车辆品牌接口carBrand,carType,carYear
	 */
	public PageEntity queryCarTakeWithFxbh(Date startDate,Date endDate,List<String> kkbhs, List<String> hphms, List<String> fxbhs, String hpys,String carBrand,String carType,String carYear,PageEntity page) throws Exception ;
	
	//查询报备卡口信息
	public PageEntity queryBaobeiCarTake(Date startDate,Date endDate,List<String> kkbhs, List<String> hphms,PageEntity page) throws Exception;
	
	/**
     * 解析文件得到carNum的list
     * @param file
     * @return ArrayList<DevicesEntity>
     * @throws Exception
     */
	public List<Map<String, String>> parseCarNumExcel(MultipartFile file) throws Exception;
	
	/**
	 * 测试solr与hbase整合查询
	 * @param rercord
	 */
	public Map<String, Object> testSearchInfo(Map<String, String> param);
	
	/**
	 * 实时过车solr查询
	 * @param statuMounts
	 * @return
	 */
	public List<CarTake> dealWithRealCarData(List<String> statuMounts, Date startDate, Date endDate);
	
	/**
	 * 临近点分析solr-Hbase查询
	 * @param json
	 * @return
	 */
	public List<CarTake> analyzeClosetPointquery(String json);
}
