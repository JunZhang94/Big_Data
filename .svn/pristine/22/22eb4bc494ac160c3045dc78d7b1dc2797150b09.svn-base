package com.jp.tic.business.datacenter.mapper;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.jp.tic.base.tester.BaseTest;

public class GateCountStatusMapperTest extends BaseTest {
	private static SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	@Autowired
	private GateCountStatusMapper mapper;
	
	private void printMap(List<Map<String, Object>> result){
		for(Map<String,Object> item:result){
			System.out.println(">>>>>>>>>>>>>>"+item);
		}
	}
	
	@Test
	public void testFindCount4GateTime() throws Exception{
		Map<String,Object> param=new HashMap<String, Object>();
		param.put("kkbh", "440119999999999999");
		
		Date startDate=formatter.parse("2014-08-01 00:00:00");
		Date endDate=formatter.parse("2014-09-01 00:00:00");
		param.put("start_time", startDate);
		param.put("end_time", endDate);
		
		List<Map<String, Object>> result = mapper.findCount4GateTime(param);
		this.printMap(result);
	}
	
	public void testFindCount4SenderTime() throws Exception{
		Map<String,Object> param=new HashMap<String, Object>();
		param.put("sender_ip", "127.0.0.1");
		
		Date startDate=formatter.parse("2014-08-01 00:00:00");
		Date endDate=formatter.parse("2014-09-01 00:00:00");
		param.put("start_time", startDate);
		param.put("end_time", endDate);
		
		List<Map<String, Object>> result = mapper.findCount4SenderTime(param);
		this.printMap(result);
	}
	
	public void testFindCount4RecieverTime() throws Exception{
		Map<String,Object> param=new HashMap<String, Object>();
		param.put("reciever_ip", "127.0.0.1");
		
		Date startDate=formatter.parse("2014-08-01 00:00:00");
		Date endDate=formatter.parse("2014-09-01 00:00:00");
		param.put("start_time", startDate);
		param.put("end_time", endDate);
		
		List<Map<String, Object>> result = mapper.findCount4RecieverTime(param);
		this.printMap(result);
	}

	public void testSumCount4Gate() throws Exception{
		Map<String,Object> param=new HashMap<String, Object>();
		
		Date startDate=formatter.parse("2014-08-01 00:00:00");
		Date endDate=formatter.parse("2014-09-01 00:00:00");
		param.put("start_time", startDate);
		param.put("end_time", endDate);
		
		List<Map<String, Object>> result = mapper.sumCount4Gate(param);
		this.printMap(result);
	}
	
	public void testSumCount4Sender() throws Exception{
		Map<String,Object> param=new HashMap<String, Object>();
		
		Date startDate=formatter.parse("2014-08-01 00:00:00");
		Date endDate=formatter.parse("2014-09-01 00:00:00");
		param.put("start_time", startDate);
		param.put("end_time", endDate);
		
		List<Map<String, Object>> result = mapper.sumCount4Sender(param);
		this.printMap(result);
	}

	public void testSumCount4Reciever() throws Exception{
		Map<String,Object> param=new HashMap<String, Object>();
		
		Date startDate=formatter.parse("2014-08-01 00:00:00");
		Date endDate=formatter.parse("2014-09-01 00:00:00");
		param.put("start_time", startDate);
		param.put("end_time", endDate);
		
		List<Map<String, Object>> result = mapper.sumCount4Reciever(param);
		this.printMap(result);
	}
}
