package com.jp.tic.analyze.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.system.entity.CarLibrary;
import com.jp.tic.system.entity.CarTake;

public interface DeckCarAnalysisService {
	
	/**
	 * 启动套牌分析任务
	 */
	public void startAnalysis(String analyType);
	
	public void analysisDeckCar() throws Exception;
	
	public void compareDeckDatas();
	
	public void initConfig();
	/**
	 * 获取车辆库信息
	 * @param hphmList
	 * @return
	 */
	public Map<String,CarLibrary> getCarLibrary(List<CarTake> hphmList);
	/**
	 * 处理车辆库比对
	 * @param hphmList
	 */
	public void handleCompareCar(List<CarTake> objectList);
	/**
	 * 查询该时间段内所有过车
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public List<CarTakeSolr> QuerySolrCarList(Date startDate, Date endDate);
}
