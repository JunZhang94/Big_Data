package com.jp.tic.analyze.service;

import java.util.List;
import java.util.Map;

public interface DataTimelyService {
	
	/**
	 * 数据及时率统计
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> dataTimelyStatistic(Map<String, String> param);
	
	/**
	 * 数据转移
	 */
	public void startTransferData();
}
