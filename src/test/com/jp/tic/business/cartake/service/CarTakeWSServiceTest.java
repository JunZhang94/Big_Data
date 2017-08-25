package com.jp.tic.business.cartake.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.jp.tic.base.tester.BaseTest;
import com.jp.tic.system.entity.CarTake;

public class CarTakeWSServiceTest extends BaseTest {
	private static SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	@Autowired
	private CarTakeWSService carTakeWSService;
	
	@Test
	public void testGetFollowingCarWithOuterWS() throws Exception{
		Date startDate=formatter.parse("2014-08-01 00:00:00");
		Date endDate=formatter.parse("2014-09-01 00:00:00");
		
		String hphm="粤A87655";
		int mintueOffset=500;
		
		List<String> kkbhs=new ArrayList<String>();
		kkbhs.add("440183302610013800");
		kkbhs.add("440183202560068100");
		kkbhs.add("440183203550041000");
		
		int minCount=kkbhs.size();
		
		Map<String, List<com.jp.tic.business.cartake.entity.CarTake>> result = carTakeWSService.getFollowingCarWithInnerWS(startDate, endDate, hphm, kkbhs, mintueOffset, minCount);
		
		for(String key:result.keySet()){
			for(com.jp.tic.business.cartake.entity.CarTake take:result.get(key)){
				System.out.println(take);;
			}
		}
	}
}
