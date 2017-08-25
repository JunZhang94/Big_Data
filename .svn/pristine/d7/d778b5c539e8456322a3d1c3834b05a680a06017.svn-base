package com.jp.tic.business.cartake.dao;

import java.util.List;
import java.util.Map;

public interface FullTextSearchDao {

	/**
	 * 查询本地车辆库信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryLoaclCarInfos(Map<String, String> param) throws Exception;
	
	/**
	 * 统计本地车辆库信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countLoaclCarInfos(Map<String, String> param) throws Exception;
	
	/**
	 * 本地套牌车确认
	 * @param param
	 * @return
	 */
	public int confimLocalTaopaiInfo(Map<String, String> param);
	
	/**
	 * 套牌车确认
	 * @param param
	 * @return
	 */
	public int confimTaopaiInfo(Map<String, String> param);
	
	/**
	 * 套牌车确认
	 * @param param
	 * @return
	 */
	public int confimFakeInfo(Map<String, String> param);
	
	/**
	 * 导出管理查询
	 * @param param
	 * @return
	 */
	public List<Map<String,String>> exportMangerQuery(Map<String,String> param);
	
	/**
	 * 统计导出管理数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countExportMangerDatas(Map<String, String> param);
	
	/**
	 * 下载管理查询
	 * @param param
	 * @return
	 */
	public List<Map<String,String>> imageMangerQuery(Map<String,String> param);
	
	/**
	 * 统计下载管理数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countimageMangerDatas(Map<String, String> param);
}
