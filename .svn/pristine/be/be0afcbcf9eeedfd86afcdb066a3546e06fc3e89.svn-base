package com.jp.tic.business.batch.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.jp.tic.business.batch.dao.BatchInforDao;
import com.jp.tic.business.batch.entity.Job;
import com.jp.tic.business.batch.entity.Task;
import com.jp.tic.framework.dao.BaseDao;
import com.jp.tic.framework.jdbc.JdbcDao;

@Repository
public class BatchInforDaoImpl implements BatchInforDao {

	@Autowired
	@Qualifier("baseDaoImpl")
	private BaseDao baseDao;
	
	@Autowired
	private JdbcDao centerJdbcDao;
	
	@Override
	public List<Job> getAllEnabledJobs() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Job> getAllJobs() {
		return baseDao.loadAll(Job.class);
	}

	@Override
	public void saveJob(Job job) {
		baseDao.saveOrUpdate(job);
	}

	@Override
	public void saveTask(Task task) {
		//baseDao.saveOrUpdate(task);
	}

	@Override
	public List<Task> searchTasks() {
		// TODO Auto-generated method stub
		return null;
	}

}
