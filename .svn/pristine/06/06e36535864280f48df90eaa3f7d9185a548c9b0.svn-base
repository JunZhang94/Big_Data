package com.jp.tic.business.analyStopCar.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.system.entity.CarTake;

public interface AnalyStopCarDao {
	
	/**
	 * 根据正则匹配法则查询该时段的所有过车信息
	 * @param regexHphm
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	List<CarTake> regexQueryCarList(String regexHphm,Date startDate,Date endDate)throws Exception;
	/**
	 * 查询指定车牌号码某一时间段经过所有卡口的若干条最新数据
	 * @param hphm
	 * @param startDate
	 * @param endDate
	 * @param count
	 * @return
	 */
	public List<CarTake> QueryCarList(String hphm, Date startDate, Date endDate,int count)throws Exception;
	
	public int CountCarList(String hphm, Date startDate, Date endDate);
	
	/**
	 * 获取过车的solr索引表
	 * @param hphm
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	List<CarTakeSolr> QuerySolrCarList(String hphm,Date startDate,Date endDate);
	/**
	 * 获取过车的solr索引表
	 * @param hphm
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	List<CarTakeSolr> QuerySolrCarList(String query);
	/**
	 * 分组统计
	 * @param query
	 * @param groupId
	 * @return
	 */
	public Map<String, Long> getCarByGroup(String hphm,Date startDate,Date endDate);
	//通过rowkey查询Hbase数据库信息
	public List<CarTake> QueryCarByRowkey(List<String> rowkeyList);

}
