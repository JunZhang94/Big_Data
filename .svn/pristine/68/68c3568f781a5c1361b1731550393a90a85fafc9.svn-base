package com.jp.tic.business.datacenter.dao;

import java.util.List;
import java.util.Map;
/**
 * 定时任务管理
 * @author jzxie
 * @time 2014-09-25 18:30
 */
public interface TimeTaskManageDao {
	/**
	 * 获取定时数据管理信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String,String>> taskManageInfo(Map<String,String> param);
	
	/**
	 * 获取定时数据管理的数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String,String>> taskManageCount(Map<String,String> param);
	
	/**
     * 提交跟随车分析任务
     * @param param 查询参数
     * @return 处理结果
     */
    public int commitTaskInfo(Map<String ,String> param);
}
