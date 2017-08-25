package com.jp.tic.business.oneNumManyCar.service;

import java.util.List;
import java.util.Map;

import com.jp.tic.system.entity.CarTake;

public interface OneNumManyCarService {

	/**
	 * 一牌多车查询
	 * @param json
	 * @param map
	 * @return
	 */
	Map<String, List<CarTake>> queryDatasForPages(String json);

}
