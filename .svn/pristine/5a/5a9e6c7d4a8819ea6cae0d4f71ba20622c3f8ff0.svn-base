package com.jp.tic.framework.jdbc;

import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.support.JdbcDaoSupport;

public class JdbcDao extends JdbcDaoSupport {
	
	public List<Map<String,Object>> queryListBySql(String sql) {
		return this.getJdbcTemplate().queryForList(sql);
	}
}
