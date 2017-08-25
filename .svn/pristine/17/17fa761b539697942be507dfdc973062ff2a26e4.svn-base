package com.jp.tic.app.carSearch.service;

import java.util.List;
import java.util.Map;

import com.jp.tic.system.entity.CarTake;

public interface CarTypeSearchService {

	/**
	 * 处理按品牌特征查询出的数据
	 * @param jsonParam 查询条件
	 * @return 查询结果
	 */
	public Map<String, Object> dealWithCarTypeData(String jsonParam);
	
	/**
	 * 翻译查询结果数据
	 * @param results 结果集
	 * @param param 参数
	 * @return 翻译结果
	 */
	public List<CarTake> trancateDataNames(List<CarTake> results, Map<String, String> param);
	
	/**
	 * 实时过车solr-HBase整合查询
	 * @param json
	 * @return
	 * @throws Exception
	 */
	public List<CarTake> realCarQuery(String json)throws Exception ;

	/**
	 * 临近点分析solr-HBase查询
	 * @param json
	 * @return
	 */
	public List<CarTake> analyzeClosetPointquery(String json);
	
	/**
	 * 查询过车数据，没有翻译
	 * @param jsonParam 查询条件
	 * @return 查询结果
	 */
	public List<CarTake> queryRealTimeData(String jsonParam);
	
	/**
	 * 查询所有的套牌车数据
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryAllTaopaiInfo();
}
