package com.jp.tic.analyze.dao;

import java.util.List;
import java.util.Map;

import com.jp.tic.system.entity.CarTake;

public interface FollowCarLocalDao {

	/**
	 * 批量保存查询出来的数据
	 * @param carTakes 数据集
	 * @return 保存结果
	 */
	public int saveCarDatas(List<CarTake> carTakes);
	
	/**
	 * 更新任务分析状态
	 * @param taskId 任务ID
	 * @param flag 分析结果状态
	 * @param havingFlag 是否存在跟随车数据
	 * @return 更新结果
	 */
	public int updateFollowTask(String taskId, String flag, String havingFlag);
	
	/**
	 * 分析数据入库
	 * @param resultDatas 分析结果数据
	 * @param param 页面参数
	 * @return 入库条数
	 */
	public int saveDbFollowData(List<Map<String, String>> resultDatas, Map<String, String> param);
	
	/**
	 * solr与hbase整合查询
	 * @param param
	 */
	public List<CarTake> searchFollowInfo(Map<String, String> param);
}
