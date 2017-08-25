package com.jp.tic.analyze.service.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.analyze.dao.MountOnlineDao;
import com.jp.tic.analyze.service.MountOnlineService;
import com.jp.tic.system.dao.OrganizationDao;
import com.jp.tic.system.dao.SystemConfigDao;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;

@Service
public class MountOnlineServiceImpl implements MountOnlineService {
	
	@Autowired
	MountOnlineDao mountOnlineDao;
	
	@Autowired
	OrganizationDao organizationDao;
	
	@Autowired
	SystemConfigDao systemConfigDao;
	
	Date endDate = null;
	
	Date startDate = null;
	
	List<Map<String, String>> results = new ArrayList<Map<String,String>>();

	/**
	 * 卡口在线统计
	 * @param mounts 卡点
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOnlineStatisticsInfo(List<Map<String, String>> mounts, Map<String, String> param) {
		return mountOnlineDao.mountOnlineStatisticsInfo(mounts, param); 
	}
	
	/**
	 * 卡口在线状态查询
	 * @param mounts 卡点
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOnlienStatusInfo(Map<String, String> mounts, Map<String, String> param) {
		try {
			return mountOnlineDao.mountOnlienStatusInfoNew(mounts, param);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		} 
	}
	/**
	 * 卡口在线状态查询
	 * @param mounts 方向
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOnlienStatusInfoByfx(List<Map<String, String>> mounts, Map<String, String> param) {
		try {
			return mountOnlineDao.mountOnlienStatusInfoNewByfx(mounts, param);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		} 
	}
	/**
	 * 卡口在线状态图表查询
	 * @param mounts 卡点
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOnlineChartInfo(List<Map<String, String>> mounts, Map<String, String> param) {
		return mountOnlineDao.mountOnlineChartInfo(mounts, param); 
	}
	
	/**
	 * 卡口离线状态统计
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOutOnlineChartInfo(Map<String, String> param) {
		return mountOnlineDao.mountOutOnlineChartInfo(param); 
	}
	
	/**
	 * 卡口在线状态,趋势图查询
	 * @param mounts 卡点
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOnlineTrendChartInfo(List<Map<String, String>> mounts, Map<String, String> param) {
		return mountOnlineDao.mountOnlineTrendChartInfo(mounts, param); 
	}
	
	/**
	 * 卡口离线状态统计,趋势图查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOutOnlineTrendChartInfo(Map<String, String> param) {
		return mountOnlineDao.mountOutOnlineTrendChartInfo(param); 
	}
	
	/**
	 * 卡口在线状态查询,只查询首页柱状图
	 * @param mounts 卡点
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountStatusOnlyCulumnInfo(List<Map<String, String>> mounts, Map<String, String> param) {
		return mountOnlineDao.mountStatusOnlyCulumnInfo(mounts, param); 
	}
	
	/**
	 * 卡口在线状态,趋势图查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> mountOnlineTrendChartOnlyLineInfo(Map<String, String> param) {
		return mountOnlineDao.mountOnlineTrendChartOnlyLineInfo(param); 
	}

	@Override
	public void updatesql(List<String> sql) {
		// TODO Auto-generated method stub
		mountOnlineDao.updatesql(sql);
	}
	
	/**
	 * 首页卡口在线状态柱状图重新设计，根据hbase数据作为判断标准
	 * @param mounts 卡点
	 * @return 返回结果
	 * @throws Exception 
	 */
	public List<Map<String, String>> firstPageMountStatus(List<Map<String, String>> mounts) throws Exception {
		return mountOnlineDao.firstPageMountStatus(mounts);
	}
	
	/**
	 * 定时调度卡口在线状态数据，统计一个小时内的卡口在线状态，根据hbase数据作为判断标准
	 * @throws Exception 异常
	 */
	public void addMountsStatusInfo() throws Exception {
		List<Map<String, String>> datas = this.historyMountStatus();
		if (datas != null && datas.size() > 0) {
			mountOnlineDao.addMountStatusInfo(datas);
		}
	}
	
	/**
	 * 统计一个小时内的卡口在线状态，根据hbase数据作为判断标准
	 * @return 处理结果
	 * @throws Exception 异常
	 */
	public List<Map<String, String>> historyMountStatus() throws Exception {
		Map<String, String> searchParam = new HashMap<String, String>();
		searchParam.put("orgType", "0");
		searchParam.put("orgId", "440100");
		String endDataStr = this.getCurrentDateStr(":59:59");
		endDate = DateUtil.parseToDate(endDataStr, "yyyy-MM-dd HH:mm:ss");
		String startDataStr = this.getCurrentDateStr(":00:00");
		List<Map<String, String>> newDatas = mountOnlineDao.findNewistData();
		if (newDatas != null && newDatas.size() > 0) {
			if (StringUtil.equals(newDatas.get(0).get("ANALYZE_HOUR"), startDataStr)) {
				return null;
			}
		}
		startDate = DateUtil.parseToDate(startDataStr, "yyyy-MM-dd HH:mm:ss");
		List<Map<String, String>> allMounts = organizationDao.findOrgInfoByOrgTypenew(searchParam);
		List<Map<String, String>> limits = systemConfigDao.findConfigByCode("statuNumber");
		int statuNumber = 0;
		if (limits != null && limits.size() > 0) {
			statuNumber = StringUtil.toInt(limits.get(0).get("VALUE"));
		} else {
			statuNumber = 50;
		}
		List<List<Map<String, String>>> mounteRsults = new ArrayList<List<Map<String, String>>>();
		List<Map<String, String>> childList = new ArrayList<Map<String,String>>();
		for(int m = 0; m < allMounts.size(); m++){
			childList.add(allMounts.get(m));
			if (m != 0 && m%statuNumber == 0) {
				mounteRsults.add(childList);
				childList = new ArrayList<Map<String,String>>();
			}
		}
		if (childList != null && childList.size() > 0) {
			mounteRsults.add(childList);	
		}
		
		int threadNum = mounteRsults.size();
		if (threadNum > 0) {
			if (results != null && results.size() > 0) {
				results = new ArrayList<Map<String,String>>();
			}
			CountDownLatch latch=new CountDownLatch(threadNum);//threadNum个线程并发执行
			HistoryWorker worker = null;
			for (int i = 0; i < threadNum; i++) {
				worker =new HistoryWorker(mounteRsults.get(i), latch);  
				worker.start();
			}
	        latch.await();//等待所有线程完成工作  
		}
		
		Map<String, Integer> countsMap = new HashMap<String, Integer>();
		if (results != null && results.size() > 0) {
			int amounts = 1;
			for (Map<String, String> dataMap : results) {
				amounts = 1;
				//统计在线数目
				if (dataMap != null && StringUtil.equals(dataMap.get("ONLINE_STATUS"), "1")) {
					if (countsMap.containsKey(dataMap.get("DWBH"))) {
						amounts = countsMap.get(dataMap.get("DWBH")) + 1;
						countsMap.put(dataMap.get("DWBH"), amounts);
					} else {
						countsMap.put(dataMap.get("DWBH"), amounts);
					}
				}
			}
			List<Map<String, String>> allOrgs = organizationDao.allOrgInfo();
			for (Map<String, String> orgMap : allOrgs) {
				orgMap.put("ANALYZE_HOUR", startDataStr);
				orgMap.put("AMOUNTS", (countsMap.get(orgMap.get("DWBH")) == null ? 0 : countsMap.get(orgMap.get("DWBH"))) + "");
			}
			return allOrgs;
		}
		return null;
	}
	
	/**
	 * 获得日期，精确到时
	 * @param times :00:00或者：59:59
	 * @return
	 */
	public String getCurrentDateStr(String times) {
		String curDateStr = "";
		Calendar cal = Calendar.getInstance();
		int year = cal.get(Calendar.YEAR);
		int month = cal.get(Calendar.MONTH) + 1;
		int day = cal.get(Calendar.DAY_OF_MONTH);
		int hour = cal.get(Calendar.HOUR_OF_DAY) - 1;
		curDateStr = String.valueOf(year) + "-";
		curDateStr += ((month < 10) ? "0" + String.valueOf(month) : String
				.valueOf(month))
				+ "-";
		curDateStr += ((day < 10) ? "0" + String.valueOf(day) : String
				.valueOf(day))
				+ " ";
		curDateStr += ((hour < 10) ? "0" + String.valueOf(hour) : String
				.valueOf(hour))
				+ times;
		return curDateStr;
	}
	
	//并发执行hbase数据查询
	class HistoryWorker extends Thread{  
		List<Map<String, String>> allmounts;
        CountDownLatch historylatch;  
        public HistoryWorker(List<Map<String, String>> allMounts ,CountDownLatch latch){  
        	this.allmounts = allMounts;
            this.historylatch = latch;  
        }  
        public void run(){  
        	doHistoryWork();//工作
        	historylatch.countDown();//完成工作，计数器减一  
  
        }  
        private void doHistoryWork(){  
    		List<Map<String, String>> result = null;
            try {  
            	for(Map<String,String> mount : allmounts){
        			result = mountOnlineDao.historyMountStatus(mount, startDate, endDate);
        			if (result != null) {
        				synchronized (results) {
        					results.addAll(result);
						}
        			}
        		}
            } catch (Exception e) {  
                e.printStackTrace();  
            }  
        }  
    }  
	
	/**
	 * 卡口在线状态接口查询
	 * @param searchParam 参数详细说明，（orgType，单位类型，取值：0代表选择为广州市一级别，最顶级别，1代表选的是分局这级别，及第二级别，
	 * 					  2代表选的是卡口这一级别，及第三级别），（orgId：选择的节点ID，如选择的是广州市为440100，如选择的是分局440116000000，
	 * 					    需要注意点，选择的是卡口的时候，因为卡口是18位数字长度，转Long类型会报错，因此特对卡口的长度进行了截取，截取掉了前面3位数字长度，
	 * 					   如：京珠北太和收费站以北路段：440192000040001000，截取后变成：192000040001000，请麻烦做下处理吧，这边确实没弄好。），
	 * @return 查询处理结果
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, String>> mountStatusGroupping(String jsonParam) {
		Map<String, String> searchParam = JsonUtil.jsonToMap(jsonParam);
		List<Map<String, String>> mounts = organizationDao.findOrgInfoByOrgType(searchParam);
		List<Map<String, String>> results = mountOnlineDao.mountOnlienStatusInfo(mounts, searchParam);
		return results;
	}
}
