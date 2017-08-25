package com.jp.tic.business.oneNumManyCar.dao;

import java.util.List;
import java.util.Map;

import com.jp.tic.system.entity.CarTake;

public interface OneNumManyCarDao {

	/**
	 * 一牌多车
	 * @param json
	 * @param map
	 * @return
	 */
	Map<String, List<CarTake>> queryDatasForPages(String json);

}
