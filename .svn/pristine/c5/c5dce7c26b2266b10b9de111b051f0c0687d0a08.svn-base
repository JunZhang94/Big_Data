package com.jp.tic.business.device.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.device.dao.BayonetReportDao;

@Service
public class BayonetReportService implements
		com.jp.tic.business.device.service.BayonetReportService {
	
	@Autowired
	private BayonetReportDao bayonetReportDao;

	/**
	 * 查询全部卡口报备信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryBayonetReportInfo(Map<String, String> param) {
		return this.bayonetReportDao.queryBayonetReportInfo(param);
	}
	
	/**
	 * 统计卡口报备信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countBayonetReportDatas(Map<String, String> param) {
		return this.bayonetReportDao.countBayonetReportDatas(param);
	}
	
	/**
	 * 提交报备更新
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int commitReportInfo(Map<String, String> param) {
		return this.bayonetReportDao.commitReportInfo(param);
	}
	
	/**
	 * 初始化修改数据的详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initBayonetReportDetailInfo(Map<String, String> param) {
		return this.bayonetReportDao.initBayonetReportDetailInfo(param);
	}
}
