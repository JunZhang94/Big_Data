package com.jp.tic.business.cartake.service;

import java.util.Map;

public interface NightAndDazedService {

	/**
	 * 统计分析昼伏夜出数据
	 * @param jsonParam 参数
	 * @return 查询结果
	 */
	public Map<String, Object> queryNightAndDazedData(String jsonParam);
}
