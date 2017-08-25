package com.jp.tic.business.batch.task;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimerTask;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jp.tic.business.batch.service.GateCountService;

public class GateCountAnalyzeTask extends TimerTask{
	private static Logger logger=LoggerFactory.getLogger(GateCountAnalyzeTask.class);
	
	private static SimpleDateFormat formatter=new SimpleDateFormat("yyyyMMdd");
	private GateCountService gateCountService;

	private int dayOffset;
	
	private String mode;
	
	public GateCountAnalyzeTask(GateCountService gateCountService,int dayOffset, String mode){
		this.gateCountService=gateCountService;
		this.dayOffset=dayOffset;
		this.mode=mode;
	}
	
	@Override
	public void run() {
		if(gateCountService!=null){
			try{
				Calendar now=Calendar.getInstance();
				now.setTime(formatter.parse(formatter.format(now.getTime())));
				
				now.add(Calendar.DAY_OF_YEAR, -1*dayOffset);
				Date startDate=now.getTime();
				
				Calendar now1=Calendar.getInstance();
				//now.add(Calendar.DAY_OF_YEAR, -1);
				Date endDate=now1.getTime();
				
				if("inner".equals(mode)){
					gateCountService.analyzeGateCount(startDate, endDate);
				}
				else if("ws".equals(mode)){
					gateCountService.analyzeGateCountWithWS(startDate, endDate);
				}
				else{
					logger.error("invalid mode :"+mode+" 4 GateCountAnalyzeTask");
				}
			}
			catch(Exception ex){
				ex.printStackTrace();
			}
		}
		
		logger.info("GateCountAnalyzeTask runned");
	}
}
