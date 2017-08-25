package com.jp.tic.business.batch.task;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimerTask;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jp.tic.business.batch.service.FakePlateService;

public class FakePlateAnalyzeTask extends TimerTask {
	private static Logger logger=LoggerFactory.getLogger(FakePlateAnalyzeTask.class);
	
	private static SimpleDateFormat formatter=new SimpleDateFormat("yyyyMMdd");
	private FakePlateService fakePlateService;

	private int dayOffset;
	
	private String mode;
	
	public FakePlateAnalyzeTask(FakePlateService fakePlateService,int dayOffset, String mode){
		this.fakePlateService=fakePlateService;
		this.dayOffset=dayOffset;
		this.mode=mode;
	}
	
	@Override
	public void run() {
		if(fakePlateService!=null){
			try{
				Calendar now=Calendar.getInstance();
				now.setTime(formatter.parse(formatter.format(now.getTime())));
				
				now.add(Calendar.DAY_OF_YEAR, -1*dayOffset);
				Date startDate=now.getTime();
				
				Calendar now1=Calendar.getInstance();
				//now.add(Calendar.DAY_OF_YEAR, -1);
				Date endDate=now1.getTime();
				
				if("inner".equals(mode)){
					fakePlateService.analyzeFakeHphm(startDate, endDate);
				}
				else if("ws".equals(mode)){
					fakePlateService.analyzeFakeHphmWithWS(startDate, endDate);
				}
				else{
					logger.error("invalid mode :"+mode+" 4 FakePlateAnalyzeTask");
				}
			}
			catch(Exception ex){
				ex.printStackTrace();
			}
		}
		logger.info("FakePlateAnalyzeTask runned");
	}
}
