package com.jp.tic.business.batch.service;

import java.util.List;
import java.util.Map;

public interface BatchInfoService {
	public List<Map<String,Object>> findAllJobs();
}
