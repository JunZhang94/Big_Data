package com.jp.tic.business.carHiddenAnaly.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.system.entity.CarTake;


public interface CarHiddenAnalyDao {

	/**
	 * 查询满足条件的hbase过车信息
	 * @param kkbhs
	 * @param hphm
	 * @param startDate
	 * @param endDate
	 * @param count
	 * @return
	 * @throws Exception
	 */
	public List<CarTake> queryCarTake(List<String> kkbhs,String hphm, Date startDate, Date endDate, int count)throws Exception;
	/**
	 * 查询满足条件范围内的solr索引列表信息
	 * @param kkbhs
	 * @param hphm
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public List<CarTakeSolr> querySolrCarTake(List<String> kkbhs,String hphm,Date startDate, Date endDate);
	/**
	 * 分组查询满足条件范围内统计数量在[minCount,maxCount]区间内的所有数据
	 * @param kkbhs
	 * @param startDate
	 * @param endDate
	 * @param groupId
	 * @param minCount
	 * @param maxCount
	 * @return
	 */
	public Map<String,Long> getCarByGroup(List<String> kkbhs,Date startDate, Date endDate,String groupId,int minCount,int maxCount);
	
	public Map<String,Long> getCarByGroup(String query,String groupId,int minCount,int maxCount);
}
