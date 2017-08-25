package com.jp.tic.business.gis.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.gis.dao.GisDao;
import com.jp.tic.business.gis.service.GisService;
import com.jp.tic.system.entity.Gate;

@Service
public class GisServiceImpl implements GisService {
	@Autowired
	private GisDao gisDao;

	private Map<String,Gate> gates=new HashMap<String,Gate>();
	
	private Map<String,Integer> allLineDistances=new HashMap<String,Integer>();
	
	private Map<String,Integer> allPathDistances=new HashMap<String,Integer>();
	
	@Override
	public int getDistanceWithLine(double jd1, double wd1, double jd2, double wd2) {
		return gisDao.getDistanceWithLine(jd1, wd1, jd2, wd2);
	}

	@Override
	public int getDistanceWithPath(double jd1, double wd1, double jd2, double wd2) {
		return gisDao.getDistanceWithPath(jd1, wd1, jd2, wd2);
	}
	
	@Override
	public Map<String,Integer> getLineDistnace(List<String> kkbhs){
		Map<String,Integer> distances=new HashMap<String,Integer>();
		
		if(kkbhs!=null && kkbhs.size()>0){
			for(int i=0;i<kkbhs.size();i++){
				for(int j=0;j<kkbhs.size();j++){
					String kkbh1=kkbhs.get(i);
					String kkbh2=kkbhs.get(j);
					if(kkbh1.equals(kkbh2)==false){
						String key=kkbh1+"_"+kkbh2;
						distances.put(key,getLineDistnace(kkbh1,kkbh2));
					}
				}
			}
		}
		
		return distances;
	}
	
	@Override
	public int getLineDistnace(String kkbh1,String kkbh2){
		String key=kkbh1+"_"+kkbh2;
		if(allLineDistances.containsKey(key)==false){
			try{
				double jd1=Double.parseDouble(gates.get(kkbh1).getKkjd());
				double wd1=Double.parseDouble(gates.get(kkbh1).getKkwd());
				
				double jd2=Double.parseDouble(gates.get(kkbh2).getKkjd());
				double wd2=Double.parseDouble(gates.get(kkbh2).getKkwd());
				
				int distance=gisDao.getDistanceWithLine(jd1, wd1, jd2, wd2);
				allLineDistances.put(key,distance);
				
				//System.out.println("distance:"+key+"-"+distance);
			}
			catch(Exception ex){
				//ex.printStackTrace();
				return -1;
			}
		}
		
		return allLineDistances.get(key);
	}
	
	@Override
	public Map<String,Integer> getPathDistnace(List<String> kkbhs){
		Map<String,Integer> distances=new HashMap<String,Integer>();
		
		if(kkbhs!=null && kkbhs.size()>0){
			for(int i=0;i<kkbhs.size();i++){
				for(int j=0;j<kkbhs.size();j++){
					String kkbh1=kkbhs.get(i);
					String kkbh2=kkbhs.get(j);
					if(kkbh1.equals(kkbh2)==false){
						String key=kkbh1+"_"+kkbh2;
						distances.put(key,getPathDistnace(kkbh1,kkbh2));
					}
				}
			}
		}
		
		return distances;
	}
	
	@Override
	public int getPathDistnace(String kkbh1,String kkbh2){
		String key=kkbh1+"_"+kkbh2;
		if(allPathDistances.containsKey(key)==false){
			try{
				double jd1=Double.parseDouble(gates.get(kkbh1).getKkjd());
				double wd1=Double.parseDouble(gates.get(kkbh1).getKkwd());
				
				double jd2=Double.parseDouble(gates.get(kkbh2).getKkjd());
				double wd2=Double.parseDouble(gates.get(kkbh2).getKkwd());
				
				int distance=gisDao.getDistanceWithPath(jd1, wd1, jd2, wd2);
				allPathDistances.put(key,distance);
			}
			catch(Exception ex){
				//ex.printStackTrace();
				return -1;
			}
		}
		
		return allPathDistances.get(key);
	}

	@Override
	public void addGates(List<Gate> gates) {
		if(gates!=null){
			for(Gate gate:gates){
				this.gates.put(gate.getKkbh(), gate);
			}
		}
	}
}
