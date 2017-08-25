package com.jp.tic.business.alarm.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jp.tic.business.alarm.dao.FollowCarDao;
import com.jp.tic.system.dao.BaseDao;

@SuppressWarnings("unchecked")
@Repository
public class FollowCarDaoImpl extends BaseDao implements FollowCarDao {

	/**
	 * 跟随车分析,查询数据库获取结果集
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> findFollowCarFromDbInfo(Map<String, String> param) {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from J_FOLLOW_CAR where task_id = " + param.get("taskId") + " order by id desc");
		try {
			datas = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}

}
