package com.jp.tic.business.platformmonitor.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.platformmonitor.dao.DataNodeMetaDao;
import com.jp.tic.business.platformmonitor.dao.HMasterMetaDao;
import com.jp.tic.business.platformmonitor.dao.JobTrackerMetaDao;
import com.jp.tic.business.platformmonitor.dao.NameNodeMetaDao;
import com.jp.tic.business.platformmonitor.dao.RegionServerMetaDao;
import com.jp.tic.business.platformmonitor.dao.TaskTrackerMetaDao;
import com.jp.tic.business.platformmonitor.service.HadoopStatusService;

@Service
public class HadoopStatusServiceImpl implements HadoopStatusService {
	@Autowired
	private DataNodeMetaDao dataNodeMetaDao;
	
	@Autowired
	private HMasterMetaDao hMasterMetaDao;
	
	@Autowired
	private JobTrackerMetaDao jobTrackerMetaDao;
	
	@Autowired
	private NameNodeMetaDao nameNodeMetaDao;
	
	@Autowired
	private RegionServerMetaDao regionServerMetaDao;
	
	@Autowired
	private TaskTrackerMetaDao taskTrackerMetaDao;
}
