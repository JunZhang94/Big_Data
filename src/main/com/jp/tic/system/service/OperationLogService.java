package com.jp.tic.system.service;

import java.util.List;
import java.util.Map;

public interface OperationLogService {

	/**
	 * 分页查询操作日志数据
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
