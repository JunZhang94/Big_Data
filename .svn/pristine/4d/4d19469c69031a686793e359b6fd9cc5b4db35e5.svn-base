package com.jp.tic.business.batch.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.analyze.service.CarTakeService;
import com.jp.tic.business.batch.dao.BatchInforDao;
import com.jp.tic.business.batch.dao.FakePlateDao;
import com.jp.tic.business.batch.entity.FakePlate;
import com.jp.tic.business.batch.entity.Task;
import com.jp.tic.business.batch.service.FakePlateService;
import com.jp.tic.business.cartake.mapper.BasicDataQueryMapper;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.business.gis.service.GisService;
import com.jp.tic.common.net.ws.SimpleAxisClient;
import com.jp.tic.framework.log.ApplicationLogging;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.entity.Gate;

@Service
public class FakePlateServiceImpl extends ApplicationLogging implements FakePlateService {
	private static SimpleDateFormat formatter=new SimpleDateFormat("yyyyMMdd-HHmmss");
	@Autowired
	private CarTakeService carTakeService;
	
	@Autowired
	private GisService gisService;
	
	@Autowired
	private FakePlateDao fakePlateDao;
	
	@Autowired
	private BasicDataQueryMapper<Map<String, Object>> mapper;
	
	@Autowired
	private BatchInforDao batchInforDao;
	
	@Override
	public boolean analyzeFakeHphm(Date startDate, Date endDate) {
		try {
			Date startTime=new Date();
			
			Task task=new Task();
			task.setJobId(ConfigManager.getInstance().getInt("batch.task.gate.count.job.id"));
			task.setTaskName(ConfigManager.getInstance().getString("batch.task.gate.count.job.name")+formatter.format(startTime));
			
			task.setStartTime(startTime);
			task.setStatus("开始");
			task.setStatusUpdateTime(new Date());
			
			batchInforDao.saveTask(task);
			
			List<String> kkbhs=new ArrayList<String>();
			
			List<Gate> gates = mapper.findAllMounts4Gis();
			for(Gate gate:gates){
				kkbhs.add(gate.getKkbh());
				info("kkbh:"+gate.getKkbh());
			}
			
			task.setStatus("读取所有卡口信息");
			task.setStatusUpdateTime(new Date());
			
			batchInforDao.saveTask(task);
			
			gisService.addGates(gates);
			//Map<String,Integer> distances = gisService.getPathDistnace(kkbhs);
			Map<String,Integer> distances = gisService.getLineDistnace(kkbhs);
			
			info("distances:"+distances);
			
			task.setStatus("计算所有卡口之间的距离");
			task.setStatusUpdateTime(new Date());
			
			batchInforDao.saveTask(task);
			
			int maxSpeed=ConfigManager.getInstance().getInt("batch.task.fake.plate.max.speed");
			List<CarTake[]> hphms = carTakeService.getDummyCar(startDate, endDate, distances, maxSpeed);
			
			task.setStatus("完成套牌车分析");
			task.setStatusUpdateTime(new Date());
			
			batchInforDao.saveTask(task);
			
			for(CarTake[] takes:hphms){
				FakePlate plate=new FakePlate();
				
				plate.setHphm(takes[0].getHphm());
				plate.setKkbh1(takes[0].getKkbh());
				plate.setKkbh2(takes[1].getKkbh());
				plate.setJgsj1(takes[0].getJgsj());
				plate.setJgjs2(takes[1].getJgsj());
				plate.setClsd(takes[2].getClsd().longValue());
				plate.setRowKey1(takes[0].getId());
				plate.setRowKey2(takes[1].getId());
				plate.setTx1(takes[0].getTx1());
				plate.setTx2(takes[1].getTx1());
				
				fakePlateDao.saveFakePlate(plate);
				info("fake plate:"+plate);
			}
			
			task.setStatus("结束");
			task.setStatusUpdateTime(new Date());
			task.setEndTime(new Date());
			
			batchInforDao.saveTask(task);
			
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return false;
	}

	@SuppressWarnings("unchecked")
	@Override
	public boolean analyzeFakeHphmWithWS(Date startDate, Date endDate) {
		String jobId=ConfigManager.getInstance().getString("batch.task.fake.plate.job.id"); 
		String jobName=ConfigManager.getInstance().getString("batch.task.fake.plate.job.name"); 
		String maxSpeed=ConfigManager.getInstance().getString("batch.task.fake.plate.max.speed");
		String endPoint=ConfigManager.getInstance().getString("batch.fake.plate.service.endpoint");
		SimpleAxisClient client = new SimpleAxisClient(endPoint);
		
		String[] names=new String[]{
			"arg0",
			"arg1",
			"arg2",
			"arg3",
			"arg4",
			"arg5"
		};
		Object[] params=new Object[]{
			jobId,
			jobName,
			"",
			maxSpeed,
			startDate,
			endDate	
		};
		
		Date start=new Date();
		Object result=client.send("http://hbase.com/", "taopaichefenxi", names , params, 1000*60*60*20);
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
