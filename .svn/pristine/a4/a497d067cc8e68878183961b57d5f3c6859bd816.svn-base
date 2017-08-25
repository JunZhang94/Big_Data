package com.jp.tic.business.batch.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.jp.tic.business.batch.dao.FakePlateDao;
import com.jp.tic.business.batch.entity.FakePlate;
import com.jp.tic.framework.dao.BaseDao;
import com.jp.tic.framework.jdbc.JdbcDao;

@Repository
public class FakePlateDaoImpl implements FakePlateDao {

	@Autowired
	@Qualifier("baseDaoImpl")
	private BaseDao baseDao;
	
	@Autowired
	private JdbcDao centerJdbcDao;

	@Override
	public void saveFakePlate(FakePlate plate) {
		//baseDao.saveOrUpdate(plate);
	}

	@Override
	public List<FakePlate> searchFakePlates() {
		// TODO Auto-generated method stub
		return null;
	}
	

}
