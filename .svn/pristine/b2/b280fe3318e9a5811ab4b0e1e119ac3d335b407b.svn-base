package com.jp.tic.business.cartake.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.jp.tic.business.cartake.entity.CarTake;

public interface CarTakeWSService {
	
	/**
	 * 查询伴随车，引用华工外部的webservice;
	 * @param startDate 开始时间
	 * @param endDate 结束时间
	 * @param hphm 车牌号码
	 * @param kkbhs 卡口编号
	 * @param mintueOffset 跟车时间
	 * @param minCount 条数
	 * @param kakouTimes 跟随卡点数
	 * @return 分析结果
	 * @throws Exception 异常
	 */
	public Map<String,List<CarTake>> getFollowingCarWithOuterWS(Date startDate, Date endDate, String hphm,List<String> kkbhs, int mintueOffset, int minCount, int kakouTimes) throws Exception;
	
	/**
	 * 外部跟随车接口
	 * 调用华工跟随车分析接口
	 * @param 开始时间
	 * @param 结束时间
	 * @param 号牌号码
	 * @param 卡口编号列表
	 * @param 有效时间
	 * @param minCount（暂时无用）
	 * @return
	 * @throws Exception
	 */
	public Map<String,List<CarTake>> getFollowingCarWithInnerWS(Date startDate, Date endDate, String hphm,List<String> kkbhs, int mintueOffset, int minCount) throws Exception;
	
	public Map<String,List<CarTake>> getFollowingCarWithOuterWSByAxis(Date startDate, Date endDate, String hphm,List<String> kkbhs, int mintueOffset, int minCount) throws Exception;
	
	/**
	 * 查询伴随车，引用华工外部的webservice;直接返回查询结果，查询结果中为车辆信息数据中文，无需在查询hbase
	 * @param startDate 开始时间
	 * @param endDate 结束时间
	 * @param hphm 车牌号码
	 * @param kkbhs 卡口编号
	 * @param mintueOffset 跟车时间
	 * @param minCount 条数
	 * @param kakouTimes 跟随卡点数
	 * @return 分析结果
	 * @throws Exception 异常
	 */
	public Map<String,List<CarTake>> getFollowingCarWithOuterWSNoHbase(Date startDate, Date endDate, String hphm,List<String> kkbhs, int mintueOffset, int minCount, int kakouTimes) throws Exception;
	
	/**
	 * 提交跟随车查询任务
	 * @param jobId 任务ID
	 * @param startDate 开始时间
	 * @param endDate 结束时间
	 * @param hphm 车牌号码
	 * @param kkbhs 卡口编号
	 * @param mintueOffset 跟车时间
	 * @param kakouTimes 跟随卡点数
	 * @throws Exception 异常
	 */
	public void commitFollowTaskWS(int jobId, String userCode, Date startDate, Date endDate, String hphm,List<String> kkbhs, int mintueOffset, int kakouTimes) throws Exception;
}
