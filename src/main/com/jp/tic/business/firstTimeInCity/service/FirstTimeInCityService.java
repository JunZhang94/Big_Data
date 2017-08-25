package com.jp.tic.business.firstTimeInCity.service;

import java.text.ParseException;
import java.util.Date;
import java.util.Map;


public interface FirstTimeInCityService {
	/**
	 * 响应页面查询获取初次入城的结果集
	 * @param searchParam
	 * @return
	 */
	public Map<String,Object> QueryFirstIncityCar(Map<String, String> searchParam);
	/**
	 * 根据页面查询获取汇总结果总数量
	 * @param searchParam
	 * @return
	 * @throws ParseException
	 */
	public int getCarCount(Map<String, String> searchParam) throws ParseException;
	
	/**
	 * 导出数据
	 * @param searchParam
	 */
	public Object[] ExportCarList(Map<String, String> searchParam);

}
