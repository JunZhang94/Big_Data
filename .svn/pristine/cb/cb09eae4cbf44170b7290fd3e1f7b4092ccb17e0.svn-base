package com.jp.tic.business.batch.servlet;

import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jp.tic.business.batch.service.FakePlateService;
import com.jp.tic.business.batch.service.GateCountService;
import com.jp.tic.business.batch.task.FakePlateAnalyzeTask;
import com.jp.tic.business.batch.task.GateCountAnalyzeTask;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.common.timer.ScheduleTask;
import com.jp.tic.common.timer.TimerManager;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.common.util.SpringApplicationContextUtils;

public class BatchTaskInitServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private static Logger logger=LoggerFactory.getLogger(BatchTaskInitServlet.class);
	
	private TimerManager timerManager;
	
	private GateCountService gateCountService;
	private FakePlateService fakeHphmService;
	
	@Override
	public void init() throws ServletException {
		logger.info("BatchTaskInitServlet start to init>>>>>>>>>>>>>");
		
		super.init();
		
		gateCountService=SpringApplicationContextUtils.getContext().getBean("gateCountServiceImpl", GateCountService.class);
		fakeHphmService=SpringApplicationContextUtils.getContext().getBean("fakePlateServiceImpl", FakePlateService.class);
		
		timerManager=new TimerManager();
		ScheduleTask countTask = this.getCountTask();
		if(countTask!=null){
			timerManager.addTask(countTask);
			logger.info("add count taks");
		}
		
		ScheduleTask plateTask = this.getFakePlateTask();
		if(plateTask!=null){
			timerManager.addTask(plateTask);
			logger.info("add fake plate task");
		}
		
		logger.info("BatchTaskInitServlet inited complete>>>>>>>>>>>>>");
	}
	
	private ScheduleTask getCountTask(){
		Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
		if(MapGetUtils.getBooleanValue(config, "batch.task.gate.count.enabled")){
			int dayOffset=MapGetUtils.getIntValue(config, "batch.task.gate.count.date.range");
			String mode=MapGetUtils.getString(config, "batch.task.gate.count.mode");
			
			ScheduleTask gateCountAnalyzeTask=new ScheduleTask();
			gateCountAnalyzeTask.setTaskName("GateCountAnalyzeTask");
			gateCountAnalyzeTask.setTask(new GateCountAnalyzeTask(gateCountService, dayOffset, mode));
			
			gateCountAnalyzeTask.setTaskType(ScheduleTask.TYPE_DAILY);
			gateCountAnalyzeTask.setFobidTaskRunAfterInit(true);
			int hour=MapGetUtils.getIntValue(config, "batch.task.gate.count.hour");
			gateCountAnalyzeTask.setHour(hour);
			int mintue=MapGetUtils.getIntValue(config, "batch.task.gate.count.mintue");
			gateCountAnalyzeTask.setMinute(mintue);
			int second=MapGetUtils.getIntValue(config, "batch.task.gate.count.second");
			gateCountAnalyzeTask.setSecond(second);
			
			return gateCountAnalyzeTask;
		}
		
		return null;
	}
	
	private ScheduleTask getFakePlateTask(){
		Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
		if(MapGetUtils.getBooleanValue(config, "batch.task.fake.plate.enabled")){
			int dayOffset=MapGetUtils.getIntValue(config, "batch.task.fake.plate.date.range");
			String mode=MapGetUtils.getString(config, "batch.task.gate.count.mode");
			
			ScheduleTask fakePlateAnalyzeTask=new ScheduleTask();
			fakePlateAnalyzeTask.setTaskName("GateCountAnalyzeTask");
			fakePlateAnalyzeTask.setTask(new FakePlateAnalyzeTask(fakeHphmService, dayOffset, mode));
			
			fakePlateAnalyzeTask.setTaskType(ScheduleTask.TYPE_DAILY);
			fakePlateAnalyzeTask.setFobidTaskRunAfterInit(true);
			int hour=MapGetUtils.getIntValue(config, "batch.task.fake.plate.hour");
			fakePlateAnalyzeTask.setHour(hour);
			int mintue=MapGetUtils.getIntValue(config, "batch.task.fake.plate.mintue");
			fakePlateAnalyzeTask.setMinute(mintue);
			int second=MapGetUtils.getIntValue(config, "batch.task.fake.plate.second");
			fakePlateAnalyzeTask.setSecond(second);
			
			return fakePlateAnalyzeTask;
		}
		
		return null;
	}

	@Override
	public void destroy() {
		if(timerManager!=null){
			timerManager.cancelAllTask();
		}
		
		super.destroy();
	}
}
