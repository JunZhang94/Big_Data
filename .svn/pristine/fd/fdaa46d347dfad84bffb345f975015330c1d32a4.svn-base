package com.jp.tic.system.mapper;

import java.util.List;
import java.util.Map;

import com.jp.tic.framework.mybatis.BaseSqlMapper;

@SuppressWarnings("unchecked")
public interface OrganizationMapper extends BaseSqlMapper {

	 /**
	 * 分页查询机构部门基本信息
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryOrgInfoByPage(Map<String, String> param);
	
	/**
	 * 统计机构部门基本信息
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> countOrgInfoDatas(Map<String, String> param);
	
	/**
	 * 添加机构部门基本信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addOrgInfo(Map<String, String> param);
	
	/**
	 * 删除机构部门基本信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteOrgInfo(Map<String, String> param);
	
	/**
	 * 更新机构部门基本信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateOrgInfo(Map<String, String> param);
	
	/**
	 * 检查是否已经存在此部门信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> checkOrgInfo(Map<String, String> param);
}
