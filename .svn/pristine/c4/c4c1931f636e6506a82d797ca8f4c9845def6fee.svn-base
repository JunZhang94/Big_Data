package com.jp.tic.business.batch.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.batch.mapper.BatchDataQueryMapper;
import com.jp.tic.business.batch.service.BatchInfoService;

@Service
public class BatchInfoServiceImpl implements BatchInfoService {
	@Autowired
	private BatchDataQueryMapper<Map<String,Object>> mapper;
	
	public List<Map<String,Object>> findAllJobs(){
		try {
			return mapper.findAllJobs();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
