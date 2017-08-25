package com.jp.tic.business.datacenter.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.datacenter.dao.DataRecieveDao;
import com.jp.tic.business.datacenter.service.DataRecieveService;

@Service
public class DataRecieveServiceImpl implements DataRecieveService {
	
	@Autowired
	DataRecieveDao dataRecieveDao;
	
	/**
	 * 数据接收状态查询
	 * @param mounts 卡点
	 * @return 返回结果
	 */
	public List<Map<String, String>> dataRecieveStatusInfo(List<Map<String, String>> mounts) {
		return dataRecieveDao.dataRecieveStatusInfo(mounts); 
	}
	
	/**
     * 卡口车流量统计
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> trafficStatisticsInfo(Map<String, String> param) {
    	return dataRecieveDao.trafficStatisticsInfo(param);
    }
    
    /**
	 * 数据接收率查询,只查询首页柱状图
	 * @param mounts 卡点
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> dataAcceptOnlyColumnInfo(List<Map<String, String>> mounts, Map<String, String> param) {
		return dataRecieveDao.dataAcceptOnlyColumnInfo(mounts, param);
	}
	
	/**
	 * 数据接收率,趋势图查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> dataAcceptTrendChartOnlyLineInfo(Map<String, String> param) {
		return dataRecieveDao.dataAcceptTrendChartOnlyLineInfo(param);
	}
}
