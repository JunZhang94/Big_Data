package com.jp.tic.analyze.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.formula.functions.Now;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.analyze.dao.ChartStatusDao;
import com.jp.tic.analyze.service.ChartStatusService;
import com.jp.tic.utils.lang.DateUtil;

@Service
public class ChartStatusServiceImpl implements ChartStatusService {
	
	@Autowired
	ChartStatusDao chartStatusDao;

	/**
	 * 卡口在线状态查询,查询首页柱状图
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountCulumnStatusInfo(Map<String, String> param) {
		return chartStatusDao.mountCulumnStatusInfo(param); 
	}
	
	/**
	 * 数据接收率查询,查询首页柱状图
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> dataColumnAcceptInfo(Map<String, String> param) {
		return chartStatusDao.dataColumnAcceptInfo(param); 
	}
	
	/**
	 * 卡口在线状态,趋势图查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountStatusLine(Map<String, String> param) {
		return chartStatusDao.mountStatusLine(param); 
	}
	
	/**
	 * 数据接收状态,趋势图查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> dataAcceptLineInfo(Map<String, String> param) {
		return chartStatusDao.dataAcceptLineInfo(param); 
	}
	
	/**
	 * 调用卡口在线统计和数据接收统计存储过程
	 * @param domain
	 */
	public void makeDisMountDatas() {
		chartStatusDao.makeDisMountDatas(); 
	}
	
	/**
	 * 调用卡口在线统计和数据接收统计存储过程
	 */
	public void statisticsCharStatusProc() {
		Date now = new Date();
		String dateStr = DateUtil.parseToString(now, "yyyy-MM-dd HH");
		chartStatusDao.statisticsCharStatusProc(dateStr); 
	}
	
	/**
	 * 调用卡口在线统计和数据接收统计存储过程,按天统计
	 * @param dateStr 时间格式：yyyy-mm-dd
	 * @return
	 */
	public void statisticsCharStatusDayProc() {
		Date now = new Date();
		String dateStr = DateUtil.parseToString(now, "yyyy-MM-dd");
		chartStatusDao.statisticsCharStatusDayProc(dateStr); 
	}
}
