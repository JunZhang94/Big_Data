package com.jp.tic.business.compareByTime.service;

import java.util.Map;


public interface CompareByTimeService {

	/**
	 * 时间比对
	 * @param json
	 * @return
	 */
	Map<String, Object> compareByTimeQueryForpages(String json);

}
