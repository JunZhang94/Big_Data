package com.jp.tic.analyze.service;

import java.util.Map;

/** 
 * PictureToSearchService.java Create on 2016-10-26 上午09:56:59      
 * Copyright (c) 2016-10-26 by jinpeng         
 * @author lsg     
 * @version 1.0 
 */
public interface PictureToSearchService {
	
	/**
	 * 定时检查图片识别任务
	 * @return
	 */
	public Map<String, Object> checkImageStatus();

	/**
	 * 加载车辆识别详细信息
	 * @return
	 */
	public Map<String, String> loadCarDetailInfo(String targetImage);
	
	/**
	 * 车辆比对
	 * @param searchParam
	 */
	public Map<String, Object> pictureCompareInfo(String jsonParam) throws Exception ;
	
	/**
	 * 加载最后分析完成的数据
	 * @return 查询结果
	 * @throws Exception 
	 */
	public Map<String, Object> loadLastDatas(Map<String, String> searchParam) throws Exception;
}
