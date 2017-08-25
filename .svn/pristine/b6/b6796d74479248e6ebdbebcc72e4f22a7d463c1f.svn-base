package com.jp.tic.business.batch.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.jp.tic.base.tester.BaseTest;

public class GateCountServiceTest extends BaseTest {
	private static SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	@Autowired
	private GateCountService service;
	
	@Test
	public void testWS() throws ParseException{
		Date startDate=formatter.parse("2014-07-01 00:00:00");
		Date endDate=formatter.parse("2014-08-01 00:00:00");
		
		service.analyzeGateCountWithWS(startDate, endDate);
	}
}
