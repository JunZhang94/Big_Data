package com.jp.tic.business.cartake.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public interface FullTextSearchService {

	/**
	 * 查询本地车辆库信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryLoaclCarInfos(Map<String, String> param) throws Exception;
	
	/**
	 * 统计本地车辆库信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countLoaclCarInfos(Map<String, String> param) throws Exception;
	/**
	 * 判定人车是否一致
	 * @param request
	 * @return 返回超链接结果数据
	 */
	public Map<String,String> getCarOperatorFlag(HttpServletRequest request);
	/**
	 * 人脸识别，比对两张图片是否为同一人
	 * @param srcPicUrl 车主库大头照图片
	 * @param targetPicUrl 过车图片抠取出来的图片
	 * @return
	 */
	public boolean compareTwoPics(String srcPicUrl,String targetPicUrl);
}
