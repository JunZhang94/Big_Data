package com.jp.tic.business.cartake.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.java.dev.jaxb.array.StringArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hbase.GenCheGuanLianDelegate;
import com.hbase.GenCheGuanLianService;
import com.jp.tic.analyze.service.CarTakeService;
import com.jp.tic.business.cartake.entity.CarTake;
import com.jp.tic.business.cartake.service.CarTakeWSService;
import com.jp.tic.business.cartake.util.DateUtils;
import com.jp.tic.framework.log.ApplicationLogging;
import com.jp.tic.utils.lang.StringUtil;

@Service
public class CarTakeWSServiceImpl extends ApplicationLogging implements CarTakeWSService {
	@Autowired
	private CarTakeService carTakeService;
	
	@SuppressWarnings("unchecked")
	public Map<String,List<CarTake>> getFollowingCarWithOuterWSByAxis(Date startDate, Date endDate, String hphm,List<String> kkbhs, int mintueOffset, int minCount) throws Exception{
		/*Map<String, List<CarTake>> map=new HashMap<String, List<CarTake>>();
		
		String endPoint=ConfigManager.getInstance().getString("search.follow.car.endpoint");
		SimpleAxisClient client = new SimpleAxisClient(endPoint);
		
		String[] names=new String[]{
			"arg0",
			"arg1",
			"arg2",
			"arg3",
			"arg4"
		};
		Object[] params=new Object[]{
			hphm,
			""+mintueOffset,
			startDate,
			endDate,
			//kkbhs
			kkbhs.toArray(new String[]{})
		};
		
		Date start=new Date();
		Object result=client.send("http://hbase.com/", "genCheGuanLianFenXi", names , params, 1000*60*60*20);
		Date end=new Date();
		info(""+result+" start:"+start+" end:"+end);
		if(result instanceof List){
			List temp=(List)result;
			for(Object item:temp){
				String[] rowKeys=(String[])item;
				for(String key:rowKeys){
					byte[] rowKey=BytesUtils.parseValueString(key);
					CarTake take = carTakeService.getTake(rowKey);
					
					if(map.containsKey(take.getHphm())){
						map.put(take.getHphm(), new ArrayList<CarTake>());
					}
					
					map.get(take.getHphm()).add(take);
				}
			}
		}
		
		return map;*/
		return null;
	}
	
	/**
	 * 查询伴随车，引用华工外部的webservice;
	 * @param startDate 开始时间
	 * @param endDate 结束时间
	 * @param hphm 车牌号码
	 * @param kkbhs 卡口编号
	 * @param mintueOffset 跟车时间
	 * @param minCount 条数
	 * @param kakouTimes 跟随卡点数
	 * @return 分析结果
	 * @throws Exception 异常
	 */
	@Override
	public Map<String,List<CarTake>> getFollowingCarWithOuterWS(Date startDate, Date endDate, String hphm,List<String> kkbhs, int mintueOffset, int minCount, int kakouTimes) throws Exception{
		/*GenCheGuanLianService gs = new GenCheGuanLianService();
		GenCheGuanLianDelegate gd = gs.getGenCheGuanLianPort();	
		List<StringArray> result = gd.genCheGuanLianFenXi(hphm, mintueOffset, DateUtils.dateToXmlDate(startDate), DateUtils.dateToXmlDate(endDate), kkbhs, kakouTimes);
		*/
		Map<String, List<CarTake>> map=new HashMap<String, List<CarTake>>();
		/*for(StringArray item:result){
			List<String> rowKeys=item.getItem();
			for(String key:rowKeys){
				byte[] rowKey=BytesUtils.parseValueString(key);
				CarTake take = carTakeService.getTake(rowKey);
				System.out.println("车牌号码：" + take.getHphm());
				if(map.containsKey(take.getHphm())==false){
					map.put(take.getHphm(), new ArrayList<CarTake>());
				}
				
				map.get(take.getHphm()).add(take);
			}
		}*/
		
		return map;
	}

	@Override
	public Map<String, List<CarTake>> getFollowingCarWithInnerWS(Date startDate, Date endDate, String hphm, List<String> kkbhs, int mintueOffset, int minCount) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	
	/**
	 * 查询伴随车，引用华工外部的webservice;直接返回查询结果，查询结果中为车辆信息数据中文，无需在查询hbase
	 * @param startDate 开始时间
	 * @param endDate 结束时间
	 * @param hphm 车牌号码
	 * @param kkbhs 卡口编号
	 * @param mintueOffset 跟车时间
	 * @param minCount 条数
	 * @param kakouTimes 跟随卡点数
	 * @return 分析结果
	 * @throws Exception 异常
	 */
	@Override
	public Map<String,List<CarTake>> getFollowingCarWithOuterWSNoHbase(Date startDate, Date endDate, String hphm,List<String> kkbhs, int mintueOffset, int minCount, int kakouTimes) throws Exception{
		GenCheGuanLianService gs = new GenCheGuanLianService();
		GenCheGuanLianDelegate gd = gs.getGenCheGuanLianPort();	
		//List<StringArray> result = gd.genCheGuanLianFenXi(hphm, mintueOffset, DateUtils.dateToXmlDate(startDate), DateUtils.dateToXmlDate(endDate), kkbhs, kakouTimes);
		List<StringArray> result = new ArrayList<StringArray>();
		Map<String, List<CarTake>> map = new HashMap<String, List<CarTake>>();
		CarTake carTake;
		String[] carInfos;
		for(StringArray item : result){
			List<String> items = item.getItem();
			for(String str : items){
				carTake = new CarTake();
				System.out.println("数据信息：" + str);
				
				carInfos = str.split(";");
				System.out.println("行数据长度：" + carInfos.length);
				if (StringUtil.checkStr(carInfos[0])) {
					carTake.setHphm(carInfos[0].split("==")[1]);
				}
				if (StringUtil.checkStr(carInfos[1])) {
					carTake.setKkbh(carInfos[1].split("==")[1]);
				}
				if (StringUtil.checkStr(carInfos[2])) {
					carTake.setJgsj(Long.parseLong(carInfos[2].split("==")[1]));
				}
				if (StringUtil.checkStr(carInfos[3])) {
					carTake.setTx(carInfos[3].split("==")[1]);
				}
				/*for (int i = 0; i < carInfos.length; i++) {
					carTake.
				}*/
				/*byte[] rowKey=BytesUtils.parseValueString(key);
				CarTake take = carTakeService.getTake(rowKey);*/
				if (StringUtil.checkStr(carInfos[0])) {
					System.out.println("车牌号码：" + carInfos[0].split("==")[1]);
				}
				if(map.containsKey(carInfos[0].split("==")[1])==false){
					map.put(carInfos[0].split("==")[1], new ArrayList<CarTake>()); //主键为车牌号码
				}
				map.get(carTake.getHphm()).add(carTake);
			}
		}
		
		return map;
	}
	
	/**
	 * 提交跟随车查询任务
	 * @param jobId 任务ID
	 * @param startDate 开始时间
	 * @param endDate 结束时间
	 * @param hphm 车牌号码
	 * @param kkbhs 卡口编号
	 * @param mintueOffset 跟车时间
	 * @param kakouTimes 跟随卡点数
	 * @throws Exception 异常
	 */
	public void commitFollowTaskWS(int jobId, String userCode, Date startDate, Date endDate, String hphm,List<String> kkbhs, int mintueOffset, int kakouTimes) throws Exception {
		GenCheGuanLianService gs = new GenCheGuanLianService();
		GenCheGuanLianDelegate gd = gs.getGenCheGuanLianPort();	
		gd.genCheGuanLianFenXi(jobId, hphm, mintueOffset, DateUtils.dateToXmlDate(startDate), DateUtils.dateToXmlDate(endDate), kkbhs, kakouTimes);
	}
}
