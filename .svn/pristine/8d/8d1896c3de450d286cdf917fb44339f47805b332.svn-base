package com.jp.tic.analyze.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.analyze.dao.FollowCarLocalDao;
import com.jp.tic.analyze.service.CarTakeService;
import com.jp.tic.analyze.service.FollowCarLocalService;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;

@Service
public class FollowCarLocalServiceImpl implements FollowCarLocalService {

	@Autowired 
	private FollowCarLocalDao followCarLocalDao;
	
	@Autowired
	private CarTakeService carTakeService;
	
	private String styleStr = "yyyy-MM-dd HH:mm:ss";
	/**
	 * 批量保存查询出来的数据
	 * @param carTakes 数据集
	 * @return 保存结果
	 */
	public int saveCarDatas(List<CarTake> carTakes) {
		return followCarLocalDao.saveCarDatas(carTakes);
	}
	
	/**
	 * 分析本地跟随车情况
	 * @param searchParam 页面分析条件
	 * @return 分析结果
	 * @throws Exception 异常
	 */
	public List<Map<String, String>> alyzeLocalFollowCarInfo(Map<String, String> searchParam) throws Exception {
		List<CarTake> allTargetCars = new ArrayList<CarTake>(); //某一辆车所通过所有卡点数据
		//String startTimeStr = searchParam.get("startTime");
		//String endTimeStr = searchParam.get("endTime");
		//Date startDate = DateUtil.parseToDate(startTimeStr, styleStr);
		//Date endDate = DateUtil.parseToDate(endTimeStr, styleStr);
		//String[] kkbhs = searchParam.get("mounts").split(",");
		//String hphm = searchParam.get("carFNum");
		//限制目标车一天的时间单位数据量内
		List<CarTake> targetCars = null;
		//targetCars = carTakeService.queryCarTake(null, startDate, endDate, hphm, 1000, true);
		//查询主车1000条数据
		searchParam.put("hphm", searchParam.get("carFNum"));
		searchParam.put("limit", "1000");
		targetCars = followCarLocalDao.searchFollowInfo(searchParam);
		if (targetCars == null || (targetCars!= null && targetCars.size() == 0)) {
			return null;
		}
		allTargetCars.addAll(targetCars);
		//Collections.sort(allTargetCars);
		//查询出来的数据应该是已经按过车时间降序
		//去掉这段时间目标车重复经过的卡点，也就是说取一次经过这个卡点的数据
		if (allTargetCars != null && allTargetCars.size() > 0) {
            for (int i = 0; i < allTargetCars.size(); i++) { 
                String temp = allTargetCars.get(i).getKkbh(); 
                for (int j = allTargetCars.size() - 1 ; j > i; j-- )  
                {  
                    if (StringUtil.equals(temp, allTargetCars.get(j).getKkbh())) {
                    	allTargetCars.remove(j);   
                    }
                }
            }
        }
        List<CarTake> allFollowCars = new ArrayList<CarTake>(); //跟随车所通过所有卡点数据
        List<CarTake> followCars = null;
        Date followStartDate = null;
        Date followEndDate = null;
        if (allTargetCars != null && allTargetCars.size() > 0) {
        	Map<String, String> paramMap = null;
        	for (CarTake carTake : allTargetCars) {
        		followStartDate = DateUtil.parseToDate(
        				getDateTimeByMillisecondStart(carTake.getJgsj().getTime(), StringUtil.toInt(searchParam.get("vilidTime"))), styleStr);
        		followEndDate = DateUtil.parseToDate(
        				getDateTimeByMillisecondEnd(carTake.getJgsj().getTime(), StringUtil.toInt(searchParam.get("vilidTime"))), styleStr);
        		//一个卡口目标车经过时间的前后N（页面输入的跟车时间单位）时间内的跟车数据
        		//followCars = carTakeService.queryCarTake(carTake.getKkbh(), followStartDate, followEndDate, null, 10000, true);
        		paramMap = new HashMap<String, String>();
        		paramMap.put("startTime", DateUtil.parseToString(followStartDate, styleStr));
        		paramMap.put("endTime", DateUtil.parseToString(followEndDate, styleStr));
        		paramMap.put("kkbh", carTake.getKkbh());
        		paramMap.put("limit", "10000");
        		followCars = followCarLocalDao.searchFollowInfo(paramMap);
        		if (followCars != null && followCars.size() > 0) {
        			allFollowCars.addAll(followCars);
        		}
        	}
        }
        if (allFollowCars != null && allFollowCars.size() > 0) {
        	//去掉空车牌
        	List<CarTake> nullCarNums = new ArrayList<CarTake>();
        	for (int i = 0; i < allFollowCars.size(); i++) { 
        		if (!StringUtil.checkStr(allFollowCars.get(i).getHphm()) ||
        				StringUtil.equals(allFollowCars.get(i).getHphm(), "-") ||
        				StringUtil.equals(allFollowCars.get(i).getHphm(), "—") ||
        				StringUtil.equals(allFollowCars.get(i).getHphm(), "无牌") ||
        				StringUtil.equals(allFollowCars.get(i).getHphm(), "车牌") ||
        				StringUtil.equals(allFollowCars.get(i).getHphm(), "无车牌") ||
        				StringUtil.equals(allFollowCars.get(i).getHphm(), "null")) {
        			nullCarNums.add(allFollowCars.get(i));
        		}
        	}
        	allFollowCars.removeAll(nullCarNums);
            Collections.sort(allFollowCars, new Comparator<CarTake>(){
                public int compare(CarTake item1,CarTake item2){
                	//System.out.println("===" + item1.getHphm() + ",==" + item2.getHphm());
                    return item1.getHphm().compareTo(item2.getHphm());  
                }
            });
        }
        
        //伴随车数据去重，没错的话，伴随车数据已经根据车牌和时间进行了排序，所谓的重复，其实最大可能只是多拍了些没用的数据，最后取的是哪条数据，不能确定
        String followCarDevName = null;
        String followCarNum = null;
        if (allFollowCars != null && allFollowCars.size() > 0) {
            for (int i = 0; i < allFollowCars.size(); i++) { 
                followCarDevName = allFollowCars.get(i).getKkbh(); 
                followCarNum = allFollowCars.get(i).getHphm();
                for (int j = allFollowCars.size() - 1; j > i; j--)
                {  
                    if (StringUtil.equals(followCarDevName, allFollowCars.get(j).getKkbh())
                            && StringUtil.equals(followCarNum, allFollowCars.get(j).getHphm())) {
                        allFollowCars.remove(j);   
                    }
                }
            }
        }
        //int followTimes = allTargetCars.size(); //跟随次数，为主车所经过的卡点数
        List<Map<String, String>> followResultCars = this.packagePicRecordData(allFollowCars, searchParam);
        List<Map<String, String>> removeRecords = new ArrayList<Map<String, String>>();
        if (followResultCars != null && followResultCars.size() > 0) {
            for (Map<String, String> record : followResultCars) {
                //针对查询条件的过滤
                if (StringUtil.checkStr(searchParam.get("vilidTime")) && StringUtil.toInt(searchParam.get("vilidTime")) > 0) {
                    if (StringUtil.toInt(record.get("alongTime")) > StringUtil.toInt(searchParam.get("vilidTime"))) {
                        removeRecords.add(record);
                    }
                }
                if (StringUtil.checkStr(searchParam.get("kakouTimes")) && StringUtil.toInt(searchParam.get("kakouTimes")) > 0) {
                    if (StringUtil.toInt(record.get("trakTimes")) < StringUtil.toInt(searchParam.get("kakouTimes"))) {
                        removeRecords.add(record);
                    }
                } else {
                    if (StringUtil.toInt(record.get("trakTimes")) <= 2) {
                        removeRecords.add(record);
                    }
                }
            }
        }
        if (removeRecords != null && removeRecords.size() > 0) {
            followResultCars.removeAll(removeRecords);
        }
        return followResultCars;
	}
	
	/**
     * 组装结果集
     * @param carInfos
     * @return
     */
    public List<Map<String, String>> packagePicRecordData(List<CarTake> carInfos, Map<String, String> searchParam) {
    	Map<String, String> dataMap = null;
    	String kkmcStr = ""; //跟随卡口名称连接字符串，如：卡口1,时间1;卡口2,时间2;卡口3,时间3
    	String kkbhStr = ""; //跟随卡口编号,如：kkbh1,kkbh2,kkbh3,kkbh4
    	String imgStr = ""; //跟随的卡口图片字符串，如:img1,img2,img3,img4 如果出现跟车途中中断卡口，用null字符串代替
    	String jgsj ="";
    	long alongTime = 0l;//时间单位，毫秒
        long reTime = 0l;//时间单位，分
        int trakTimes = 0;
    	List<Map<String, String>> picRecords = new ArrayList<Map<String, String>>();
    	CarTake carTake = null;
    	if (carInfos != null && carInfos.size() > 0) {
    		for (int i = 0; i < carInfos.size(); i++) {
    			carTake = carInfos.get(i);
    			if (StringUtil.isBlank(kkmcStr)) {
    				kkmcStr = carTake.getKkmc() + "," + DateUtil.parseToString(carTake.getJgsj(), styleStr);
    				kkbhStr = carTake.getKkbh();
    				imgStr = carTake.getTx1();
    				jgsj = DateUtil.parseToString(carTake.getJgsj(), styleStr);
                }
    			if (picRecords != null && picRecords.size() > 0) {
    				if (StringUtil.equals(carTake.getHphm(), carInfos.get(i-1).getHphm())) {
    					if (StringUtil.isNotBlank(kkmcStr)) {
    						kkmcStr = kkmcStr + ";";
    						kkbhStr = kkbhStr + ",";
    						imgStr = imgStr + ",";
                        } 
    					kkmcStr = kkmcStr + carTake.getKkmc() + "," + DateUtil.parseToString(carTake.getJgsj(), styleStr);
    					kkbhStr = kkbhStr + carTake.getKkbh();
    					imgStr = imgStr + carTake.getTx1();
    					dataMap.put("kkmcStr", kkmcStr);
    					dataMap.put("kkbhStr", kkbhStr);
    					dataMap.put("imgStr", imgStr);
    					//dataMap.put("jgsj", DateUtil.parseToString(carTake.getJgsj(), styleStr));
    					alongTime = DateUtil.parseToDate(picRecords.get(picRecords.size() - 1).get("endJgsj"), styleStr).getTime()
	                        - DateUtil.parseToDate(picRecords.get(picRecords.size() - 1).get("startJgsj"), styleStr).getTime();
		                reTime = alongTime / (1000 * 60);
		                picRecords.get(picRecords.size() - 1).put("alongTime", reTime + "");
		                picRecords.get(picRecords.size() - 1).put("trakTimes", 
		                		StringUtil.toInt(picRecords.get(picRecords.size() - 1).get("trakTimes")) + 1 + "");
    				} else {
    					if (trakTimes != 0) {
                            trakTimes = 1;
                        }
    					if (StringUtil.isNotBlank(kkmcStr)) {
    						kkmcStr = carTake.getKkmc() + "," + DateUtil.parseToString(carTake.getJgsj(), styleStr);
    						kkbhStr = carTake.getKkbh();
    						imgStr = carTake.getTx1();
                        }
    					dataMap = new HashMap<String, String>();
    					dataMap.put("carNum", searchParam.get("carFNum"));
    					dataMap.put("followCarNum", carTake.getHphm());
    					dataMap.put("kkmcStr", kkmcStr);
    					dataMap.put("kkbhStr", kkbhStr);
    					dataMap.put("imgStr", imgStr);
    					dataMap.put("jgsj", DateUtil.parseToString(carTake.getJgsj(), styleStr));
    					dataMap.put("startJgsj", DateUtil.parseToString(carTake.getJgsj(), styleStr));
    					dataMap.put("endJgsj", DateUtil.parseToString(carTake.getJgsj(), styleStr));
    					dataMap.put("trakTimes", trakTimes + "");
    					dataMap.put("alongTime", "0");
    					dataMap.put("taskId", searchParam.get("taskId"));
    					picRecords.add(dataMap);
					}
    			} else {
    				if (trakTimes == 0) {
                        trakTimes = 1;
                    }
    				dataMap = new HashMap<String, String>();
    				dataMap.put("carNum", searchParam.get("carFNum"));
    				dataMap.put("followCarNum", carTake.getHphm());
					dataMap.put("kkmcStr", kkmcStr);
					dataMap.put("kkbhStr", kkbhStr);
					dataMap.put("imgStr", imgStr);
					dataMap.put("jgsj", DateUtil.parseToString(carTake.getJgsj(), styleStr));
					dataMap.put("startJgsj", DateUtil.parseToString(carTake.getJgsj(), styleStr));
					dataMap.put("endJgsj", DateUtil.parseToString(carTake.getJgsj(), styleStr));
					dataMap.put("trakTimes", trakTimes + "");
					dataMap.put("alongTime", "0");
					dataMap.put("taskId", searchParam.get("taskId"));
					picRecords.add(dataMap);
				}
    		}
    	}
    	return picRecords;
    }
	
	/**
     * 毫秒转日期字符串，所进过卡点减去followTime分钟
     * @param str
     * @return
     */
    public String getDateTimeByMillisecondStart(long str, int followTime) {
        Date date = new Date(str - followTime * 60 * 1000);
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = format.format(date);
        return time;
    }
    
    /**
     * 毫秒转日期字符串，所进过卡点加上followTime分钟
     * @param str
     * @return
     */
    public String getDateTimeByMillisecondEnd(long str, int followTime) {
        Date date = new Date(str + followTime * 60 * 1000);
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = format.format(date);
        return time;
    }
    
    /**
	 * 更新任务分析状态
	 * @param taskId 任务ID
	 * @param flag 分析结果状态
	 * @param havingFlag 是否存在跟随车数据
	 * @return 更新结果
	 */
	public int updateFollowTask(String taskId, String flag, String havingFlag) {
		return followCarLocalDao.updateFollowTask(taskId, flag, havingFlag);
	}
	
	/**
	 * 分析数据入库
	 * @param resultDatas 分析结果数据
	 * @param param 页面参数
	 * @return 入库条数
	 */
	public int saveDbFollowData(List<Map<String, String>> resultDatas, Map<String, String> param) {
		return followCarLocalDao.saveDbFollowData(resultDatas, param);
	}
	
	/**
	 * solr与hbase整合查询
	 * @param param
	 */
	public List<CarTake> searchFollowInfo(Map<String, String> param) {
		return followCarLocalDao.searchFollowInfo(param);
	}
}
