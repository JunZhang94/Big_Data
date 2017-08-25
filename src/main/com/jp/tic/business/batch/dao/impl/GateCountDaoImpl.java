package com.jp.tic.business.batch.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.jp.tic.business.batch.dao.GateCountDao;
import com.jp.tic.business.batch.entity.GateCount;
import com.jp.tic.framework.dao.BaseDao;
import com.jp.tic.framework.jdbc.JdbcDao;

@Repository
public class GateCountDaoImpl implements GateCountDao {

	@Autowired
	@Qualifier("baseDaoImpl")
	private BaseDao baseDao;
	
	@Autowired
	private JdbcDao centerJdbcDao;
	
	@Override
	public void saveGateCount(GateCount count) {
		baseDao.saveOrUpdate(count);
	}

	@Override
	public List<GateCount> searchGateCounts() {
		// TODO Auto-generated method stub
		return null;
	}

}
