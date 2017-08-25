package com.jp.tic.business.datacenter.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.datacenter.dao.TimeTaskManageDao;
import com.jp.tic.business.datacenter.service.TimeTaskManageService;

@Service
public class TimeTaskManageServiceImpl implements TimeTaskManageService{
	
	@Autowired
    TimeTaskManageDao timeTaskManageDao ;
    
    /**
	 * 获取定时数据管理的数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> taskManageCount(Map<String, String> param) {
		return timeTaskManageDao.taskManageCount(param);
	}

	/**
	 * 获取定时任务管理信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> taskManageInfo(Map<String, String> param) {
		
		return timeTaskManageDao.taskManageInfo(param);
	}
	
	/**
     * 提交跟随车分析任务
     * @param param 查询参数
     * @return 处理结果
     */
    public int commitTaskInfo(Map<String ,String> param) {
    	return timeTaskManageDao.commitTaskInfo(param);
    }

}
