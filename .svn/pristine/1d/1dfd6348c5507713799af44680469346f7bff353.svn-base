package com.jp.tic.business.gis.service;

import java.util.List;
import java.util.Map;

import com.jp.tic.system.entity.Gate;

public interface GisService {
	public int getDistanceWithLine(double jd1,double wd1,double jd2,double wd2);
	public int getDistanceWithPath(double jd1,double wd1,double jd2,double wd2);
	
	public int getLineDistnace(String kkbh1,String kkbh2);
	public Map<String,Integer> getLineDistnace(List<String> kkbhs);
	
	public int getPathDistnace(String kkbh1,String kkbh2);
	public Map<String,Integer> getPathDistnace(List<String> kkbhs);
	
	public void addGates(List<Gate> gates);
}
