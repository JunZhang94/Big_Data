package com.jp.tic.analyze.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.jp.tic.analyze.service.PictureToSearchService;
import com.jp.tic.analyze.util.HttpWebserviceUtil;
import com.jp.tic.analyze.util.SimMatch;
import com.jp.tic.app.carSearch.service.CarTypeSearchService;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.StringUtil;

/** 
 * PictureToSearchServiceImpl.java Create on 2016-10-26 上午09:57:16      
 * Copyright (c) 2016-10-26 by jinpeng         
 * @author lsg     
 * @version 1.0 
 */
@SuppressWarnings("unchecked")
@Service
public class PictureToSearchServiceImpl implements PictureToSearchService {
	
	@Autowired
	private CarTypeSearchService carTypeSearchService;
	
	public List<List<CarTake>> mounteRsults = new ArrayList<List<CarTake>>();
	public List<CarTake> filteDatas = new ArrayList<CarTake>();
	public int realThreadNumber = 0;
	public List<CarTake> carTakeTemsps = null;
	public String similatyTemp = "";
	public String targetImate = "";
	public volatile int counts = 0;
	public int dealCounts = 0;
	public String lock = "0";
	public volatile int faildCounts = 0;
	public boolean exitBool = false;
	public boolean searchFlag = false;
	public int amounts = 0;
	public byte[] targetImages = null;
	public float[] rects = null;
	//public boolean partFlag = false;

	/**
	 * 加载车辆识别详细信息
	 * @return
	 */
	public Map<String, String> loadCarDetailInfo(String targetImage) {
		String jsonResult = HttpWebserviceUtil.loadCarOwnerPic(targetImage);
		Map<String, String> resultMap = HttpWebserviceUtil.loadPictureInfo(jsonResult);
		return resultMap;
	}
	
	/**
	 * 定时检查图片识别任务
	 * @return
	 */
	public Map<String, Object> checkImageStatus() {
		Map<String, Object>  datas = new HashMap<String, Object>();
		//没有数据的情况
		if (searchFlag && amounts == 0) {
			datas.put("percent", 1);
			datas.put("counts", 0);
		    return datas;
		}
		if (dealCounts == 0 || amounts == 0) {
			datas.put("percent", 0);
		    return datas;
		}
		float percent = (float) dealCounts / amounts;
		datas.put("percent", percent);
		if (dealCounts == amounts) {
			if (!exitBool) {
				try {
					exitBool = true;
				} catch (Exception e) {
					System.out.println("图片关闭服务失败");
					e.printStackTrace();
				}
				System.out.println("后台任务已执行完成，页面将重新刷新数据！");
				datas.put("counts", filteDatas.size());
			    return datas;
			} else {
				System.out.println("图片分析已经完成,清理多余动作！");
				Map<String, Object>  tesmps = new HashMap<String, Object>();
			    return tesmps;
			}
		} else {
			System.out.println("定时调度任务，获取后台执行情况,当前进度：" + percent);
			datas.put("percent", percent);
		    return datas;
		}
	}
	
	/**
	 * 车辆比对
	 * @param searchParam
	 * @throws Exception 
	 */
	public Map<String, Object> pictureCompareInfo(String jsonParam) throws Exception {
		Map<String, Object> resultsMap = new HashMap<String, Object>();
		Map<String, String> param = JsonUtil.jsonToMap(jsonParam);
		//处理分页问题
		int start = StringUtil.toInt(param.get("page.start"));
		if (start > 0) {
			return this.loadLastDatas(param);
		}
		//数据初始化
		this.initDatas();
		//先查询数据量
		System.out.println(jsonParam);
		Map<String, Object> mountsMap = carTypeSearchService.dealWithCarTypeData(jsonParam);
		amounts = StringUtil.toInt(mountsMap.get("total"));
		searchFlag = true;
		System.out.println("本次查询数据量为：" + amounts);
		String rectStr = param.get("rects");
		String carRectStr = param.get("carRects");
		System.out.println("*********carRectStr======="+carRectStr);
		if (StringUtil.checkStr(rectStr)&& carRectStr !=null && carRectStr.length()>0) {
			String[] carRects = carRectStr.split(",");
			JsonParser parser = new JsonParser();
			JsonElement jsonEle = parser.parse(rectStr);
			JsonArray rectInfo = jsonEle.getAsJsonObject().get("Rects").getAsJsonArray().get(0).getAsJsonObject().get("Rect").getAsJsonArray();
			float x = rectInfo.get(0).getAsFloat();
			float y = rectInfo.get(1).getAsFloat();
			float width = rectInfo.get(2).getAsFloat();
			float height = rectInfo.get(3).getAsFloat();
			//rects = new float[] { x, y, width, height };
			//下面注释的部分传的是图片的宽和高，貌似传错了
			/*int imageWidth = StringUtil.toInt(param.get("imageWidth"));
			int imageHeight = StringUtil.toInt(param.get("imageHeight"));
			float relativeWidht = width/imageWidth;
			float relativeHeight = height/imageHeight;*/
			//改为传车筐的宽和高
			int imageWidth = StringUtil.toInt(carRects[2]);
			int imageHeight = StringUtil.toInt(carRects[3]);
			float relativeWidht = width/imageWidth;
			float relativeHeight = height/imageHeight;
			//partFlag = true;
			rects = new float[] { (x - Float.parseFloat(carRects[0]))/imageWidth,(y - Float.parseFloat(carRects[1]))/imageHeight, relativeWidht, relativeHeight };
		} else {
			//partFlag = false;
			rects = new float[] { 0, 0, 1, 1 };
		}
		param.put("page.limit", amounts + "");
		jsonParam = JSON.toJSONString(param);//查询条件
		Map<String, Object> resultMap = carTypeSearchService.dealWithCarTypeData(jsonParam);
		List<CarTake> results = (List<CarTake>) resultMap.get("rows");
		if (results != null && results.size() > 0) {
			//采用多线程方式去做图片比对服务
			Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
			//页面配置的线程数，实际执行线程加1个
			int threadNumber = StringUtil.toInt(MapGetUtils.getString(config, "image.server.thread.numbers"));
			List<CarTake> childList = new ArrayList<CarTake>();
			//当线程数大于实际分析数量是，线程数就是查询结果数
			int oneThreadCounts = results.size();
			if(results.size()>threadNumber){
				oneThreadCounts = results.size()/ threadNumber;
			}
			for(int m = 0; m < results.size(); m++){
				childList.add(results.get(m));
				if (m != 0 && m%oneThreadCounts == 0) {
					mounteRsults.add(childList);
					childList = new ArrayList<CarTake>();
				}
			}
			if (childList != null && childList.size() > 0) {
				mounteRsults.add(childList);	
			}
			realThreadNumber = mounteRsults.size();
			similatyTemp = param.get("similaty");
			targetImate = param.get("imageStr");
			targetImages = HttpWebserviceUtil.loadPictureFeature(targetImate);
			new Thread(){
				 public void run(){
					 for (int j = 0; j < realThreadNumber; j++) {
						 carTakeTemsps = mounteRsults.get(j);
						 dealCompareInfo(carTakeTemsps, similatyTemp, targetImate, rects);
					 }
				 }
			}.start();
		}
		while (true) {
			//System.out.println("同步执行状态,当前处理情况:,已处理" + dealCounts + "条，总共：" + amounts + ",筛选出 " + counts);
			if (amounts > 0) {
				if (dealCounts == amounts) {
					if (counts <= 15) {
						System.out.println("后台分析完成，数据量总共小于15条，直接返回结果展示");
						resultsMap.put("pageDatas", filteDatas);
						resultsMap.put("counts", counts);
						return resultsMap;
					}
				} else if (counts == 15) {
					System.out.println("后台分析完成，数据量总共等于15条，直接返回结果展示");
					resultsMap.put("pageDatas", filteDatas);
					resultsMap.put("counts", counts);
					return resultsMap;
				}
			}else{
				System.out.println("无符合条件的数据");
				List<CarTake> tmpDatas = new ArrayList<CarTake>();
				resultsMap.put("pageDatas", tmpDatas);
				resultsMap.put("counts", 0);
				return resultsMap;
			}
		}
	}
	
	/**
	 * 执行图片比对服务
	 */
	public void dealCompareInfo(List<CarTake> results, String similaty, String targetImate, float[] rects) {  
		String imageStr = "";
		String jsonResult = "";
		byte[] features = null;
		//float similatyParam = 0;
    	for (CarTake carTake : results) {
    		float[] score = new float[1];
    		imageStr = carTake.getTx1();
    		jsonResult = HttpWebserviceUtil.loadCarOwnerPic(imageStr);
    		features = HttpWebserviceUtil.initFeatureBytes(jsonResult);
    		if (features != null) {
    			try {
        			SimMatch.Seemo_SimilarMatch(targetImages, features, score, rects);
            		System.out.println("similarMatch success,result score is: " + score[0]);
            		synchronized (lock) {
            			dealCounts += 1;
    					System.out.println("当前处理第" + dealCounts + "条记录,本次分析信息编号:" + carTake.getXxbh() + "车牌号码:" + carTake.getHphm());
            		}
        		} catch (Exception e) {
        			faildCounts++;
    				System.out.println("图片比对服务失败,信息编号为：" + carTake.getXxbh());
    				e.printStackTrace();
        		}
        		System.out.println("#################################-----score[0]========="+score[0]);
        		//兼容得分是0-2范围还是0-100范围的版本
        		if(score[0]>0 && score[0]<2){
        			score[0]=score[0]*100;
        		}
        		if (score[0] >= StringUtil.toInt(similaty)) {
        			//违法状态代替相似度
        			//carTake.setWfzt(score[0] + "%");
        			//保留小数点后一位
        			carTake.setWfzt(Math.round(score[0]*10)/10.0+"%");
    				synchronized (filteDatas) {
    					filteDatas.add(carTake);
    					counts++;
    					System.out.println("当前处理了：" + dealCounts + "条数据，处理异常导致失败：" + faildCounts + "条数据,其中符合标准的数据量为：" + counts);
    				}
        		}
    		} else {
    			dealCounts += 1;
			}
		}
    }
	public void initDatas() {
		exitBool = false;
		searchFlag = false;
		dealCounts = 0;
		faildCounts = 0;
		counts = 0;
		amounts = 0;
		filteDatas = new ArrayList<CarTake>();
		mounteRsults = new ArrayList<List<CarTake>>();
	}
	
	/**
	 * 加载最后分析完成的数据
	 * @return 查询结果
	 * @throws Exception 
	 */
	public Map<String, Object> loadLastDatas(Map<String, String> searchParam) throws Exception {
		List<CarTake> resultDatas = new ArrayList<CarTake>();
		Collections.sort(filteDatas, new Comparator<CarTake>() {
			public int compare(CarTake item1, CarTake item2) {
				return item2.getWfzt().compareTo(item1.getWfzt());
			}
		});
		if (StringUtil.equals(filteDatas.get(filteDatas.size() - 1).getWfzt(), "100.0%")) {
			resultDatas.add(filteDatas.get(filteDatas.size() - 1));
			filteDatas.remove(filteDatas.get(filteDatas.size() - 1));
		}
		resultDatas.addAll(filteDatas);
		List<CarTake> pageDatas = new ArrayList<CarTake>();
		int start = StringUtil.toInt(searchParam.get("page.start"));
		int limit = StringUtil.toInt(searchParam.get("page.limit"));
		if (counts > limit) {
			for (int i = start; i < limit + start; i++) {
				if (i >= counts) {
					break;
				}
				pageDatas.add(resultDatas.get(i));
			}
		} else {
			pageDatas.addAll(resultDatas);
		}
		Map<String, Object> resultsMap = new HashMap<String, Object>();
		resultsMap.put("pageDatas", pageDatas);
		resultsMap.put("counts", counts);
		return resultsMap;
	}
}
