package com.jp.tic.business.batch.service.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.analyze.dao.CarTakeDao;
import com.jp.tic.business.batch.dao.GateCountDao;
import com.jp.tic.business.batch.entity.GateCount;
import com.jp.tic.business.batch.service.GateCountService;
import com.jp.tic.business.cartake.mapper.BasicDataQueryMapper;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.common.net.ws.SimpleAxisClient;
import com.jp.tic.framework.log.ApplicationLogging;
import com.jp.tic.system.entity.Gate;

@Service
public class GateCountServiceImpl extends ApplicationLogging implements GateCountService {
	@Autowired
	private CarTakeDao carTakeDao;
	
	@Autowired
	private GateCountDao gateCountDao;
	
	@Autowired
	private BasicDataQueryMapper<Map<String, Object>> mapper;
	
	@Override
	public boolean analyzeGateCount(Date startDate, Date endDate) {
		try{
			List<Gate> gates = mapper.findAllMounts();
			
			for(Gate gate:gates){
				Calendar cal=Calendar.getInstance();
				
				cal.setTime(startDate);
				while(cal.getTime().compareTo(endDate)<=0){
					Map<Date[], Long[]> counts = carTakeDao.getCount4MountCount(gate.getKkbh(), startDate);
					
					for(Date[] key:counts.keySet()){
						GateCount status=new GateCount();
						
						status.setCount(counts.get(key)[0]);
						status.setKkbh(gate.getKkbh());
						status.setStartTime(key[0]);
						status.setStartTime(key[1]);
						
						gateCountDao.saveGateCount(status);
					}
					
					cal.add(Calendar.DAY_OF_YEAR,1);
				}
			}
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
		return false;
	}

	@SuppressWarnings("unchecked")
	@Override
	public boolean analyzeGateCountWithWS(Date startDate, Date endDate) {
		String jobId=ConfigManager.getInstance().getString("batch.task.gate.count.job.id"); 
		String jobName=ConfigManager.getInstance().getString("batch.task.gate.count.job.name"); 
		String endPoint=ConfigManager.getInstance().getString("batch.gate.count.service.endpoint");
		SimpleAxisClient client = new SimpleAxisClient(endPoint);
		
		String[] names=new String[]{
			"arg0",
			"arg1",
			"arg2",
			"arg3"
		};
		Object[] params=new Object[]{
			jobId,
			jobName,
			startDate,
			endDate
		};
		
		Date start=new Date();
		Object result=client.send("http://hbase.com/", "QueryBySeperatedHours", names , params, 1000*60*60*20);
		Date end=new Date();
		info(""+result+" start:"+start+" end:"+end);
		if(result instanceof List){
			String status=""+((List)result).get(0);
			if("1".equals(status)){
				return true;
			}
			else{
				return false;
			}
		}
		return false;
	}

}
