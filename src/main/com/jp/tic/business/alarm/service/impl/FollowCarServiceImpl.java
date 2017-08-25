package com.jp.tic.business.alarm.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.alarm.dao.FollowCarDao;
import com.jp.tic.business.alarm.service.FollowCarService;

@Service
public class FollowCarServiceImpl implements FollowCarService {
	
	@Autowired
	private FollowCarDao followCarDao;

	/**
	 * 跟随车分析,查询数据库获取结果集
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> findFollowCarFromDbInfo(Map<String, String> param) {
		return this.followCarDao.findFollowCarFromDbInfo(param);
	}

}
