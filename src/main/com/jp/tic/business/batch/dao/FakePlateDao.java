package com.jp.tic.business.batch.dao;

import java.util.List;

import com.jp.tic.business.batch.entity.FakePlate;

public interface FakePlateDao {
	public List<FakePlate> searchFakePlates();
	
	public void saveFakePlate(FakePlate task); 
}
