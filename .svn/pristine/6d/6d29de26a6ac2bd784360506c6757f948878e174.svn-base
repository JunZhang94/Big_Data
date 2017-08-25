package com.jp.tic.analyze.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.analyze.dao.GatherStatisticsDao;
import com.jp.tic.analyze.service.GatherStatisticsService;

@Service
public class GatherStatisticsServiceImpl implements GatherStatisticsService {
	
	@Autowired
	GatherStatisticsDao gatherStatisticsDao;
	
	/**
	 * 汇聚统计数据查询
	 * @param param 查询参数
	 * @param mounts 卡点
	 * @return 返回结果
	 */
	public List<Map<String, String>> gatherStatisticsInfo(Map<String, String> param, List<Map<String, String>> mounts) {
		return gatherStatisticsDao.gatherStatisticsInfo(param, mounts);
	}
	
	/**
	 * 汇聚统计统计总数量
	 * @param param 查询参数
	 * @param mounts 卡点
	 * @return 返回结果
	 */
	public List<Map<String, String>> gatherStatisticsAmounts(Map<String, String> param, List<Map<String, String>> mounts) {
		return gatherStatisticsDao.gatherStatisticsAmounts(param, mounts);
	}
	
	/**
	 * 汇聚统计统计总数量,柱状图数据
	 * @param param 查询参数
	 * @param mounts 卡点
	 * @return 返回结果
	 */
	public List<Map<String, String>> gatherStatisticsChartInfo(Map<String, String> param, List<Map<String, String>> mounts) {
		return gatherStatisticsDao.gatherStatisticsChartInfo(param, mounts);
	}
}
