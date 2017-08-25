package com.jp.tic.analyze.service;

import java.util.HashMap;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.jp.tic.base.tester.BaseTest;

/**
 * <b>function:</b> test
 * @author hoojo
 * @createDate 2014-5-23 下午06:30:14
 * @file QueryAnalyzeStatServiceTest.java
 * @package com.jp.tic.analyze.service
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public class QueryAnalyzeStatServiceTest extends BaseTest {

	@Autowired
	@Qualifier("queryAnalyzeStatServiceImpl")
	private QueryAnalyzeStatService<Map<String,Object>> service;
	
	@Test
	public void testQueryCar() {
		try {
			Map<String, Object> param = new HashMap<String, Object>();
			//param.put("mount", "440100000000");
			//param.put("plateNo", "粤A7");
			param.put("startDate", "2014-04-01 00:00:00");
			param.put("endDate", "2014-05-12 00:00:00");
			
			System.out.println(service.queryCar(param).size());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Test
	public void testQueryRate() {
		try {
			Map<String, Object> param = new HashMap<String, Object>();
			param.put("mount", "440100000000");
			param.put("startDate", "2014-04-01 00:00:00");
			param.put("endDate", "2014-05-12 00:00:00");
			
			System.out.println(service.analyzeRate(param));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Test
	public void testAnalyzeFakePlateVehicles() {
		try {
			Map<String, Object> param = new HashMap<String, Object>();
			param.put("startDate", "2014-04-01 00:00:00");
			param.put("endDate", "2014-05-29 00:00:00");
			
			System.out.println(service.analyzeFakePlateVehicles(param));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Test
	public void testAnalyzePointPosition() {
		try {
			Map<String, Object> param = new HashMap<String, Object>();
			param.put("startDate", "2014-04-01 00:00:00");
			param.put("endDate", "2014-05-29 00:00:00");
			param.put("type", "hour");
			param.put("mount", "440100000000");
			
			System.out.println(service.analyzePointPosition(param));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
