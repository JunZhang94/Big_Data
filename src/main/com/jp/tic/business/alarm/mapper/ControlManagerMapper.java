package com.jp.tic.business.alarm.mapper;

import java.util.List;
import java.util.Map;

import com.jp.tic.framework.mybatis.BaseSqlMapper;

@SuppressWarnings("unchecked")
public interface ControlManagerMapper extends BaseSqlMapper {

	/**
	 * 初始化修改数据的详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> loadControlDetailInfo(Map<String, String> param);
	
	/**
	 * 布控时，检查是否存在此布控信息，精确布控
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> checkControlCarNum(Map<String, String> param);
	
	/**
	 * 更新布控信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateControlInfo(Map<String, String> param);
	
	/**
	 * 删除布控信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteControlInfo(Map<String, String> param);
}
