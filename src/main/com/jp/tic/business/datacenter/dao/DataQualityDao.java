package com.jp.tic.business.datacenter.dao;

import java.util.List;
import java.util.Map;

public interface DataQualityDao {

	/**
	 * 数据质量管理
	 * @param param 查询参数
	 * @param dept 部门
	 * @return 返回结果
	 */
	public List<Map<String, String>> dataQualityInfo(Map<String, String> param, List<Map<String, String>> dept);
	
	/**
	 * 数据质量管理数量
	 * @param param 查询参数
	 * @param dept 部门
	 * @return 返回结果
	 */
	public List<Map<String, String>> dataQualityAmounts(Map<String, String> param, List<Map<String, String>> dept);
	
	/**
	 * 导出数据质量信息数据
	 * @param partIds 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> exportDataQualityById(String[] partIds);
	
	/**
	 * 根据查询条件导出查询数据
	 * @param param 查询参数
	 * @param dept 部门
	 * @return 查询结果
	 */
	public String exportQuerySql(Map<String, String> param, List<Map<String, String>> dept);
}
