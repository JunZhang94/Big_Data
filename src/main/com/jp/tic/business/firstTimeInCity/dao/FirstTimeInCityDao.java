package com.jp.tic.business.firstTimeInCity.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.system.entity.CarTake;

public interface FirstTimeInCityDao {
	/**
	 * 查询该时间段的所有过车信息
	 * @param startDate
	 * @param endDate
	 * @return
	 * @throws Exception
	 */
	public List<CarTake> QueryCarList(Date startDate, Date endDate)throws Exception;
	
	/**
	 * 查询该时间段的所有过车信息
	 * @param startDate
	 * @param endDate
	 * @return
	 * @throws Exception
	 */
	public List<CarTakeSolr> QuerySolrCarList(Date startDate, Date endDate,int start,int limit,String[] orderIndexs,int orderFlag)throws Exception;
	
	/**
	 * 查询指定车牌号码某一时间段经过所有卡口的若干条最新数据
	 * @param hphm
	 * @param startDate
	 * @param endDate
	 * @param count
	 * @return
	 */
	public List<CarTakeSolr> QuerySolrCarList(String hphm, Date startDate, Date endDate)throws Exception;
	
	public List<CarTakeSolr> QuerySolrCarList(String query);
	/**
	 * 获取指定车牌某段时间内经过所有卡口的总数据量
	 * @param hphm
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public int getCarCount(String hphm, Date startDate, Date endDate);
	
	/**
	 * 分组统计
	 * @param query
	 * @param groupId
	 * @return
	 */
	public Map<String, Long> getCarByGroup(String query);
	
	
	public CarTake QueryCarByRowkey(String rowKeyStr);
	
	public List<CarTake> QueryCarByRowkey(List<String> rowkeyList);
	
	

}
