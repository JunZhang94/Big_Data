package com.jp.tic.business.datacenter.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.business.datacenter.dao.DataStatisticsDao;
import com.jp.tic.business.datacenter.service.DataStatisticsService;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;

@Service
public class DataStatisticsServiceImpl implements DataStatisticsService {
	
	@Autowired
	private DataStatisticsDao dataStatisticsDao;

	//Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
	
	/**
	 * 卡口车流量统计,按卡口统计详细信息
	 * @param searchParam
	 * @return 查询结果
	 * @throws Exception
	 */
	public List<Map<String, String>> mountDataStatisticsInfo(Map<String, String> searchParam) throws Exception {
		this.searchCondition(searchParam);
		searchParam.put("queryFlag", "mounts");
		List<Map<String, String>> results = dataStatisticsDao.mountDataStatisticsInfo(searchParam);
		return results;
	}
	
	/**
	 * 卡口车流量统计,按单位统计详细信息
	 * @param searchParam
	 * @return 查询结果
	 * @throws Exception
	 */
	public List<Map<String, String>> deptDataStatisticsInfo(Map<String, String> searchParam) throws Exception {
        String orgType = searchParam.get("orgType");
        this.searchCondition(searchParam);
        searchParam.put("queryFlag", "dept");
        List<Map<String, String>> results = null;
        if (StringUtil.equals(orgType, "0") || StringUtil.equals(orgType, "1")) {
        	results = dataStatisticsDao.mountDataStatisticsInfo(searchParam);
        }
		return results;
	}
	
	public void searchCondition(Map<String, String> searchParam) {
		//对不同时间类型的处理
		String dates = searchParam.get("dates");
		if(StringUtil.checkObj(dates)){
			int dateType =StringUtil.toInt(dates);
			String begintime = searchParam.get("startdate");
			String endtime = searchParam.get("enddate");
			if(dateType == 0){
				searchParam.put("startdate", begintime+":00:00");
				searchParam.put("enddate", endtime +":59:59");
			}else if(dateType==1){
				searchParam.put("startdate", begintime+" 00:00:00");
				searchParam.put("enddate", endtime +" 23:59:59");
			}else if(dateType==2){
				searchParam.put("startdate", begintime+"-01 00:00:00");
				searchParam.put("enddate", endtime +"-12 23:59:59");
			}
		}
		String orgId = searchParam.get("orgId");
        String orgType = searchParam.get("orgType");
		if ("0".equals(dates)) {
			searchParam.put("startDateType", "yyyy-mm-dd HH24");
		} else if ("1".equals(dates)){
			searchParam.put("startDateType", "yyyy-mm-dd");
		} else {
			searchParam.put("startDateType", "yyyy-mm");
		}
		if("0".equals(orgType) && StringUtil.checkStr(orgId) && !StringUtil.equals(orgId, "null")){
			searchParam.put("sss3", "and area.qydm = '" + orgId + "'");
		}else if("1".equals(orgType) && StringUtil.checkStr(orgId) && !StringUtil.equals(orgId, "null")){
			searchParam.put("sss3", "and dept.dwbh = '" + orgId + "'");
		} else if("2".equals(orgType) && StringUtil.checkStr(orgId) && !StringUtil.equals(orgId, "null")) {
			searchParam.put("sss3", "and j.kkbh = '440" + orgId + "'");
		}
	}
	
	/**
	 * 定时查询solr分组数据
	 */
	public void querySolrFacetData() {
		//统计包含外地车统计和整体车辆统计及本地车统计
		//所有车辆统计
		String localCarNum = ConfigManager.getInstance().getString("statistic.local.carnum");
		//String localCarNum = MapGetUtils.getString(config, "statistic.local.carnum");
		//System.out.println("车牌:" + localCarNum);
		String timeStartAll1 = DateUtil.getCurrentDateTime();
		List<Map<String, String>> results = dataStatisticsDao.querySolrFacetData("");
		if (results != null && results.size() > 0) {
			dataStatisticsDao.saveQueryResult(results);
			String timeEndAll2 = DateUtil.getCurrentDateTime();
			int usedTimeAll1 = this.getTwoTimeforMinite(timeStartAll1, timeEndAll2);
			System.out.println("本次统计所有车流量数据耗时：" + usedTimeAll1 + "秒");
		} else {
			System.out.println("本次所有车流量统计为空");
		}
		//外地车统计
		String timeStartPro2 = DateUtil.getCurrentDateTime();
		//List<Map<String, String>> resultPros = dataStatisticsDao.querySolrFacetData("!hphm:粤C*");
		List<Map<String, String>> resultPros = dataStatisticsDao.querySolrFacetData("!hphm:" + localCarNum);
		if (resultPros != null && resultPros.size() > 0) {
			dataStatisticsDao.saveQueryProResult(resultPros);
			String timeEndPro2 = DateUtil.getCurrentDateTime();
			int usedTimePro2 = this.getTwoTimeforMinite(timeStartPro2, timeEndPro2);
			System.out.println("本次统计外地车流量数据耗时：" + usedTimePro2 + "秒");
		} else {
			System.out.println("本次外地车流量统计为空");
		}
		//本地车统计
		String timeStartLocal3 = DateUtil.getCurrentDateTime();
		//List<Map<String, String>> resultLocals = dataStatisticsDao.querySolrFacetData("hphm:粤C*");
		List<Map<String, String>> resultLocals = dataStatisticsDao.querySolrFacetData("hphm:" + localCarNum);
		if (resultLocals != null && resultLocals.size() > 0) {
			dataStatisticsDao.saveQueryLocalResult(resultLocals);
			String timeEndLocal3 = DateUtil.getCurrentDateTime();
			int usedTimeLocal3 = this.getTwoTimeforMinite(timeStartLocal3, timeEndLocal3);
			System.out.println("本次统计本地车流量数据耗时：" + usedTimeLocal3 + "秒");
		} else {
			System.out.println("本次本地车流量统计为空");
		}
	}
	
	public int getTwoTimeforMinite(String startTime, String endTime) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date starDate = null;
		Date endDate = null;
		try {
			starDate = df.parse(startTime);
			endDate = df.parse(endTime);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		long l = endDate.getTime() - starDate.getTime();
		return StringUtil.toInteger(l / 1000);
	}
	
	/**
	 * 车流量统计曲线图
	 * @param searchParam
	 * @return
	 */
	public List<Map<String, String>> statisticsCarDatas(Map<String, String> searchParam) {
		 String orgType = searchParam.get("orgType");
         this.initCondition(searchParam);
         searchParam.put("queryFlag", "dept");
         List<Map<String, String>> results = null;
         if (StringUtil.equals(orgType, "0") || StringUtil.equals(orgType, "1")) {
        	 results = dataStatisticsDao.statisticsCarDatas(searchParam);
         }
		 return results;
	}
	
	public void initCondition(Map<String, String> searchParam) {
		//对不同时间类型的处理
		String timeType = searchParam.get("timeType");
		String orgId = searchParam.get("orgId");
        String orgType = searchParam.get("orgType");
		if ("1".equals(timeType)) {
			//按日
			searchParam.put("startDateType", "yyyy-mm-dd");
		} else if ("2".equals(timeType)){
			//按周
			searchParam.put("startDateType", "ww");
		} else {
			//按月
			searchParam.put("startDateType", "yyyy-mm");
		}
		if("0".equals(orgType) && StringUtil.checkStr(orgId) && !StringUtil.equals(orgId, "null")){
			searchParam.put("sss3", "and area.qydm = '" + orgId + "'");
		}else if("1".equals(orgType) && StringUtil.checkStr(orgId) && !StringUtil.equals(orgId, "null")){
			searchParam.put("sss3", "and dept.dwbh = '" + orgId + "'");
		} else if("2".equals(orgType) && StringUtil.checkStr(orgId) && !StringUtil.equals(orgId, "null")) {
			searchParam.put("sss3", "and j.kkbh = '440" + orgId + "'");
		}
	}
	
	/**
	 * 加载所有的solr数据总量
	 * @return
	 */
	public int loadALLDataMounts() { 
		return dataStatisticsDao.loadALLDataMounts();
	}
}
