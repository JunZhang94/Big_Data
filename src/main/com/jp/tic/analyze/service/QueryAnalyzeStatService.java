package com.jp.tic.analyze.service;

import java.util.List;
import java.util.Map;

/**
 * <b>function:</b> 查询 分析 统计服务
 * @author hoojo
 * @createDate 2014-5-23 下午06:18:15
 * @file QueryAnalyzeStatService.java
 * @package com.jp.tic.analyze.service
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public interface QueryAnalyzeStatService<E extends Map<String, Object>> {

	/**
	 * <b>function:</b> 车辆查询
	 * @author hoojo
	 * @createDate 2014-5-23 下午01:55:36
	 * @param row 过车时间段 + 卡口；过车时间段 + 卡口 + 车牌（模糊或精确）；卡口 + 车牌（模糊或精确）
	 * @return
	 * @throws Exception
	 */
	public List<E> queryCar(E param) throws Exception;
	
	
	/**
	 * <b>function:</b> 套牌车分析
	 * @author hoojo
	 * @createDate 2014-5-23 下午02:05:18
	 * @param param 车辆特征；同一时间，不同地点（通过时间、卡口距离，比较行车速度）判断统计
	 * @return
	 * @throws Exception
	 */
	public E analyzeFakePlateVehicles(E param) throws Exception; 

	/**
	 * <b>function:</b>车辆频度分析
	 * @author hoojo
	 * @createDate 2014-5-23 下午02:07:29
	 * @param row 时间段、卡口；时间周期（N天）、固定次数，对所有卡口、时间段统计
	 * @return
	 * @throws Exception
	 */
	public List<E> analyzeRate(E param) throws Exception; 
	
	/**
	 * <b>function:</b> 按检测点统计 点位统计 （小时 天 月）
	 * @author hoojo
	 * @createDate 2014-8-15 下午03:44:56
	 * @param param （小时 天 月）
	 * @return
	 * @throws Exception
	 */
	public E analyzePointPosition(E param) throws Exception;
	
}
