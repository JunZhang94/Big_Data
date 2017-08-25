package com.jp.tic.analyze.rule;

import java.util.HashMap;
import java.util.Map;

import com.jp.tic.system.entity.CarTake;

public class FummyCarRule {
	private Map<String,Integer> distances;
	private int maxSpeed;
	
	public FummyCarRule(Map<String,Integer> distances,int maxSpeed){
		this.distances=distances;
		this.maxSpeed=maxSpeed;
	}
	
	public Map<String,Object> filter(CarTake take1,CarTake take2){
		String key=take1.getKkbh()+"_"+take2.getKkbh();
		
		if(distances.containsKey(key)==false){
			return null;
		}
		
		int distance=distances.get(key);
		
		System.out.println(">>>>>>>>>>>>>>>>>>kk_kk:"+key+" distance:"+distance);
		
		if(distance!=-1){
			double time=take1.getJgsj().getTime()-take2.getJgsj().getTime();
			time=Math.abs(time/(1000 * 60 * 60));//小时
			
			double speed=distance/1000/time;
			
			System.out.println(">>>>>>>>>>>>>>>>>>time:"+time+" speed:"+speed);
			
			if(speed>maxSpeed){
				Map<String,Object> result=new HashMap<String, Object>();
				
				result.put("fummy", true);
				result.put("clsd", speed);
				
				return result;
			}
		}
		
		return null;
	}
}
