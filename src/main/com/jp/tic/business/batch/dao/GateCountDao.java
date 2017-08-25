package com.jp.tic.business.batch.dao;

import java.util.List;

import com.jp.tic.business.batch.entity.GateCount;

public interface GateCountDao {
	public List<GateCount> searchGateCounts();
	
	public void saveGateCount(GateCount count); 
}
