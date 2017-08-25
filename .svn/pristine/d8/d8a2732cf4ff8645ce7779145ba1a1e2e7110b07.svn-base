package com.jp.tic.system.mapper;

import java.util.List;
import java.util.Map;

import com.jp.tic.framework.mybatis.BaseSqlMapper;

@SuppressWarnings("unchecked")
public interface OperationLogMapper extends BaseSqlMapper {
	/**
	 * 分页查询人操作日志数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryOperationLogInfo(Map<String, String> param);
	
	/**
	 * 统计操作日志数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countOperationLogDatas(Map<String, String> param);
}
