package com.jp.tic.business.batch.mapper;

import java.util.List;
import java.util.Map;

import com.jp.tic.framework.mybatis.BaseSqlMapper;

public interface BatchDataQueryMapper<E extends Map<String, Object>> extends BaseSqlMapper<E> {

	public List<E> findAllJobs() throws Exception;
	
	public List<E> findTasksByJobId(E params);
}
