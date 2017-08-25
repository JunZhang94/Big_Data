package com.jp.tic.system.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.system.mapper.OperationLogMapper;
import com.jp.tic.system.service.OperationLogService;

@Service
public class OperationLogServiceImpl implements OperationLogService {
	
	 @Autowired
	 OperationLogMapper mapper;

	/**
	 * 分页查询操作日志数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryOperationLogInfo(Map<String, String> param) {
		return mapper.queryOperationLogInfo(param);
	}
	
	/**
	 * 统计操作日志数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countOperationLogDatas(Map<String, String> param) {
		return mapper.countOperationLogDatas(param);
	}

}
