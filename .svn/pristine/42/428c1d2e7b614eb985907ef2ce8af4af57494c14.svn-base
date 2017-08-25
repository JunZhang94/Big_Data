package com.jp.tic.business.analyStopCar.service;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.jp.tic.business.analyStopCar.entity.Mount;
import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.system.entity.CarTake;

public interface AnalyStopCarService {
	
	/**
	 * 业务逻辑处理入口
	 * @param searchParam
	 * @return
	 * @throws ParseException
	 */
	Map<String,Object> AnalyStopCarQuery(Map<String, String> searchParam)throws ParseException;
	/**
	 * 初始化分析
	 * @param searchParam
	 */
	public void InitAnalyStopCar(Map<String, String> searchParam);
	/**
	 * 导出数据
	 * @param searchParam
	 */
	public Map<String,Object> ExportStopCar(Map<String, String> searchParam);
	/**
	 * 根据页面钻取条件获取过车明细
	 * @param searchParam
	 * @return
	 */
	public Map<String, Object> getCarList(Map<String, String> searchParam);
	

}
