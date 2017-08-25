package com.jp.tic.business.oneCarManyNum.dao;

import java.util.List;
import java.util.Map;

import com.jp.tic.system.entity.CarTake;

public interface  OneCarManyNumDao {

	/**
	 * 一车多牌
	 * @param json
	 * @return
	 */
	Map<String, Object> queryOneCarManyNumForPages(String json);

	
}
