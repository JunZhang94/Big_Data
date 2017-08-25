package com.jp.tic.analyze.controller;

import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.analyze.service.MountOnlineService;
import com.jp.tic.business.device.service.BayonetReportService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.service.OrganizationService;
import com.jp.tic.system.service.SystemConfigService;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/mountOnline")
@Scope("prototype")
public class MountOnlineController extends AbstractController {
	
	@Autowired
	MountOnlineService mountOnlineService;
	
	@Autowired
	OrganizationService organizationService;
	
	@Autowired
	SystemConfigService systemConfigService;
	
	@Autowired
	private BayonetReportService bayonetReportService;
	
	List<Map<String, String>> allResults = new ArrayList<Map<String,String>>();
	
	List<Map<String, String>> statuResults = new ArrayList<Map<String,String>>();
	
	List<Map<String, String>> vitrulStatuResults = new ArrayList<Map<String,String>>();
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/mountOnlinePage")
	public String mountOnlinePageLoad() {
		return "/analyze/mount-online";
	}
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/mountOnlineStatusPage")
	public String mountOnlineStatusPageLoad() {
		return "/datacenter/mount-online-status";
	}
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/bayonetColumnChartPage")
	public String bayonetColumnChartPageLoad() {
		return "/search/bayonet-column-chart";
	}
	
	/**
	 * 同能经过改造后，加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/mountChartStatusPage")
	public String mountChartStatusPageLoad(HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		if (StringUtil.checkStr(searchParam.get("maxFlag"))) {
			if (StringUtil.equals(searchParam.get("maxFlag"), "max")) {
				request.setAttribute("maxFlag", "max");
			} else {
				request.setAttribute("maxFlag", "min");
			}
		}
		return "/datacenter/mount-chart-status";
	}
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/mountStatusColumnPage")
	public String mountStatusColumnPageLoad(HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		if (StringUtil.checkStr(searchParam.get("maxFlag"))) {
			if (StringUtil.equals(searchParam.get("maxFlag"), "max")) {
				request.setAttribute("maxFlag", "max");
			} else {
				request.setAttribute("maxFlag", "min");
			}
		}
		return "/datacenter/mount-status-column";
	}
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/mountStatusLinePage")
	public String mountStatusLinePageLoad(HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		if (StringUtil.checkStr(searchParam.get("maxLineFlag"))) {
			if (StringUtil.equals(searchParam.get("maxLineFlag"), "max")) {
				request.setAttribute("maxLineFlag", "max");
			} else {
				request.setAttribute("maxLineFlag", "min");
			}
		}
		return "/datacenter/mount-status-line";
	}
	
	/**
	 * 卡口在线统计
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/mountOnlineStatistics")
	@ResponseBody
	public Object mountOnlineStatisticsInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		if (!StringUtil.checkStr(searchParam.get("orgId"))) {
			return null;
		}
		List<Map<String, String>> mounts = organizationService.findOrgInfoByOrgType(searchParam);
		List<Map<String, String>> results = mountOnlineService.mountOnlineStatisticsInfo(mounts, searchParam);
		return ResponseUtils.sendList(results, 0);         
	}
	
	/**
	 * 卡口在线状态查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/mountOnlienStatus")
	@ResponseBody
	public Object mountOnlienStatusInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		if (!StringUtil.checkStr(searchParam.get("orgId"))) {
			return null;
		}
		List<Map<String, String>> mounts = organizationService.findOrgInfoByOrgType(searchParam);
		Map<String, String> mount = new HashMap<String, String>();
		//List<Map<String, String>> results = mountOnlineService.mountOnlienStatusInfo(mounts, searchParam);
		List<Map<String, String>> results = mountOnlineService.mountOnlienStatusInfo(mount, searchParam);
		Map<String, String> allAmountsMap = new HashMap<String, String>();
		int outOnline = 0; //离线总数
		int online = 0; //在线总数
		if (results != null && results.size() > 0) {
			for (Map<String, String> dataMap : results) {
				if (StringUtil.equals(dataMap.get("ONLINE_STATUS"), "0")) {
					outOnline +=1;
				}if (StringUtil.equals(dataMap.get("ONLINE_STATUS"), "1")) {
					online +=1;
				}
			}
		}
		allAmountsMap.put("KKMC", "");
		allAmountsMap.put("JGSJ", "");
		allAmountsMap.put("ONLINE_STATUS", "在线:(" + online + "),离线:(" + outOnline + ")");
		results.add(allAmountsMap);
		return ResponseUtils.sendList(results, 0);         
	}
	
	/**
	 * 卡口在线状态查询,按部门分组展示
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/byOrgGroupping")
	@ResponseBody
	public Object byOrgGrouppingInfo(Model model, HttpServletRequest request) throws Exception{
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		if (!StringUtil.checkStr(searchParam.get("orgId"))) {
			return null;
		}
		
		List<Map<String, String>> limits = systemConfigService.findConfigByCode("statuNumber");
		int statuNumber = 0;
		if (limits != null && limits.size() > 0) {
			statuNumber = StringUtil.toInt(limits.get(0).get("VALUE"));
		} else {
			statuNumber = 50;
		}
		List<Map<String, String>> allMounts = organizationService.findOrgInfoByOrgTypenew(searchParam);
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
		
		int threadNumber = mounteRsults.size();
		if (threadNumber > 0) {
			if (statuResults != null && statuResults.size() > 0) {
				statuResults = new ArrayList<Map<String,String>>();
			}
			CountDownLatch statuLatch=new CountDownLatch(threadNumber);//threadNumber个线程并发执行
			StatuWorker statuWorker = null;
			for (int i = 0; i < threadNumber; i++) {
				statuWorker =new StatuWorker(mounteRsults.get(i), statuLatch);  
				statuWorker.start();
			}
			statuLatch.await();//等待所有线程完成工作  
		}
		
		/*List<Map<String, String>> mounts = organizationService.findOrgInfoByOrgTypenew(searchParam);
		List<Map<String, String>> results = new ArrayList<Map<String,String>>();
		for(Map<String,String> mount:mounts){
			//查找每个卡口的数据
			List<Map<String, String>> result = mountOnlineService.mountOnlienStatusInfo(mount, searchParam);
			results.addAll(result);
		}*/
        this.jsonResult.setData(statuResults);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
    }
	
	/**
	 * 虚拟卡口在线状态查询,按部门分组展示
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/byVitrulOrgGroupping")
	@ResponseBody
	public Object byVitrulOrgGrouppingInfo(Model model, HttpServletRequest request) throws Exception{
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		if (!StringUtil.checkStr(searchParam.get("orgId"))) {
			return null;
		}
		List<Map<String, String>> limits = systemConfigService.findConfigByCode("statuNumber");
		int statuNumber = 0;
		if (limits != null && limits.size() > 0) {
			statuNumber = StringUtil.toInt(limits.get(0).get("VALUE"));
		} else {
			statuNumber = 50;
		}
		//所有的虚拟卡口
		List<Map<String, String>> allMounts = organizationService.findVulMountInfos(searchParam);
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
		
		int threadNumber = mounteRsults.size();
		if (threadNumber > 0) {
			if (vitrulStatuResults != null && vitrulStatuResults.size() > 0) {
				vitrulStatuResults = new ArrayList<Map<String,String>>();
			}
			CountDownLatch statuLatch=new CountDownLatch(threadNumber);//threadNumber个线程并发执行
			VitrulStatuWorker vitrulStatuWorker = null;
			for (int i = 0; i < threadNumber; i++) {
				vitrulStatuWorker =new VitrulStatuWorker(mounteRsults.get(i), statuLatch);  
				vitrulStatuWorker.start();
			}
			statuLatch.await();//等待所有线程完成工作  
		}
        this.jsonResult.setData(vitrulStatuResults);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
    }
	
	/**
	 * 查询全部卡口报备信息,按部门分组展示
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/loadBayonetReport")
	@ResponseBody
	public Object loadBayonetReportInfo(Model model, HttpServletRequest request) throws Exception{
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> limits = systemConfigService.findConfigByCode("statuNumber");
		int statuNumber = 0;
		if (limits != null && limits.size() > 0) {
			statuNumber = StringUtil.toInt(limits.get(0).get("VALUE"));
		} else {
			statuNumber = 50;
		}
		//List<Map<String, String>> allMounts = organizationService.findOrgInfoByOrgTypenew(searchParam);
		List<Map<String, String>> allMounts = bayonetReportService.queryBayonetReportInfo(searchParam);
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
		
		int threadNumber = mounteRsults.size();
		if (threadNumber > 0) {
			if (statuResults != null && statuResults.size() > 0) {
				statuResults = new ArrayList<Map<String,String>>();
			}
			CountDownLatch statuLatch=new CountDownLatch(threadNumber);//threadNumber个线程并发执行
			StatuWorker statuWorker = null;
			for (int i = 0; i < threadNumber; i++) {
				statuWorker =new StatuWorker(mounteRsults.get(i), statuLatch);  
				statuWorker.start();
			}
			statuLatch.await();//等待所有线程完成工作  
		}
		
		//List<Map<String, String>> results = bayonetReportService.queryBayonetReportInfo(searchParam);
		for (Map<String, String> sourceMap : allMounts) {
			sourceMap.put("ONLINE_STATUS", "1");
			for (Map<String, String> resultMap : statuResults) {
				if (StringUtil.equals(sourceMap.get("KKBH"), resultMap.get("KKBH")) && StringUtil.equals(resultMap.get("ONLINE_STATUS"), "0")) {
					sourceMap.put("ONLINE_STATUS", "0");
					break;
				}
			}
		}
		List<Map<String, String>> filtMounts = new ArrayList<Map<String,String>>();
		if (StringUtil.checkStr(searchParam.get("status")) && StringUtil.equals(searchParam.get("status"), "2")) { //故障卡口
			for (Map<String, String> dataMap : allMounts) {
				if (StringUtil.equals(dataMap.get("ONLINE_STATUS"), "0")) {
					filtMounts.add(dataMap);
				}
			}
		}
		if (filtMounts.size() > 0) {
			this.jsonResult.setData(filtMounts);
		} else {
			this.jsonResult.setData(allMounts);
		}
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
    }
	
	/**
	 * 首页卡口在线状态柱状图重新设计，根据hbase数据作为判断标准
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/firstPageStatus")
	@ResponseBody
	public Object firstPageMountStatus(Model model, HttpServletRequest request) throws Exception{
		Map<String, String> searchParam = new HashMap<String, String>();
		/*searchParam.put("orgType", "0");
		searchParam.put("orgId", "440100");*/
		List<Map<String, String>> allMounts = organizationService.findOrgInfoByOrgTypenew(searchParam);
		
		List<Map<String, String>> limits = systemConfigService.findConfigByCode("statuNumber");
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
			if (allResults != null && allResults.size() > 0) {
				allResults = new ArrayList<Map<String,String>>();
			}
			CountDownLatch latch=new CountDownLatch(threadNum);//threadNum个线程并发执行
			Worker worker = null;
			for (int i = 0; i < threadNum; i++) {
				worker =new Worker(mounteRsults.get(i), latch);  
				worker.start();
			}
	        latch.await();//等待所有线程完成工作  
		}
        
		Map<String, Integer> countsMap = new HashMap<String, Integer>();
		Map<String, Integer> outsMap = new HashMap<String, Integer>();
		List<Map<String, String>> countDatas = new ArrayList<Map<String,String>>();
		if (allResults != null && allResults.size() > 0) {
			int amounts = 1;
			for (Map<String, String> dataMap : allResults) {
				amounts = 1;
				//先统计在线数目
				if (dataMap != null && StringUtil.equals(dataMap.get("ONLINE_STATUS"), "1")) {
					if (countsMap.containsKey(dataMap.get("DWMC"))) {
						amounts = countsMap.get(dataMap.get("DWMC")) + 1;
						countsMap.put(dataMap.get("DWMC"), amounts);
					} else {
						countsMap.put(dataMap.get("DWMC"), amounts);
					}
				}
				//统计离线数目
				if (dataMap != null && StringUtil.equals(dataMap.get("ONLINE_STATUS"), "0")) {
					if (outsMap.containsKey(dataMap.get("DWMC"))) {
						amounts = outsMap.get(dataMap.get("DWMC")) + 1;
						outsMap.put(dataMap.get("DWMC"), amounts);
					} else {
						outsMap.put(dataMap.get("DWMC"), amounts);
					}
				}
			}
			String countKey = null;
			int countValues = 0;
			Iterator countIt = countsMap.keySet().iterator();
			Map<String, String> dataMap = null;
			NumberFormat nt = NumberFormat.getPercentInstance();
			nt.setMinimumFractionDigits(1);
			double percent = 0d;
			while(countIt.hasNext()){
				countKey = (String) countIt.next();
				countValues = countsMap.get(countKey);
				if (!outsMap.containsKey(countKey)) {
					outsMap.put(countKey, 0);
				}
				dataMap = new HashMap<String, String>();
				dataMap.put("PERIOD", countKey);
				dataMap.put("COUNT", countValues + "");
				countDatas.add(dataMap);
			}
			if (countDatas != null && countDatas.size() > 0) {
				Iterator outStatuIt = outsMap.keySet().iterator();
				boolean havingFlag = false;
				int allAmounts = 0;
				while(outStatuIt.hasNext()){
					havingFlag = false;
					countKey = (String) outStatuIt.next();
					countValues = outsMap.get(countKey);
					for (Map<String, String> map : countDatas) {
						if (StringUtil.equals(countKey, map.get("PERIOD"))) {
							havingFlag = true;
							allAmounts = StringUtil.toInt(map.get("COUNT")) + countValues;
							map.put("OUT", countValues + "");
							map.put("AMOUNT", allAmounts + "");
							map.put("COUNT_DESC", allAmounts + "(" + map.get("COUNT") + ")");
							percent = Double.parseDouble(map.get("COUNT")) / Double.parseDouble(allAmounts + "");
							map.put("DATA_NUMBER", percent + "");
							map.put("PERCENTAGE", nt.format(percent));
							break;
						}
					}
					if (!havingFlag) {
						dataMap = new HashMap<String, String>();
						dataMap.put("PERIOD", countKey);
						dataMap.put("COUNT", "0");
						dataMap.put("OUT", countValues + "");
						dataMap.put("AMOUNT", countValues + "");
						dataMap.put("COUNT_DESC", countValues + "(0)");
						dataMap.put("DATA_NUMBER", "0");
						dataMap.put("PERCENTAGE", "0%");
						countDatas.add(dataMap);
					}
				}
			} else {
				Iterator outIt = outsMap.keySet().iterator();
				while(outIt.hasNext()){
					countKey = (String) outIt.next();
					countValues = outsMap.get(countKey);
					dataMap = new HashMap<String, String>();
					dataMap.put("PERIOD", countKey);
					dataMap.put("COUNT", "0");
					dataMap.put("OUT", countValues + "");
					dataMap.put("AMOUNT", countValues + "");
					dataMap.put("COUNT_DESC", countValues + "(0)");
					dataMap.put("DATA_NUMBER", "0");
					dataMap.put("PERCENTAGE", "0%");
					countDatas.add(dataMap);
				}
			}
		}
		
		List<Map<String, String>> reList = new ArrayList<Map<String,String>>(); 
		List<Map<String, String>> resultList = new ArrayList<Map<String,String>>(); 
		Map<String, String> policeMap = new HashMap<String, String>();
		Map<String, String> trafficPoliceMap = new HashMap<String, String>();
		String dwmcStr = "";
		if (countDatas != null && countDatas.size() > 0) {
			for (Map<String, String> dataMap : countDatas) {
				String orgPolice = "科技通信处";
				String orgTrafficPolice = "交警支队";
				if (StringUtil.equals(dataMap.get("PERIOD").trim(), orgPolice)) {
					policeMap = dataMap;
					dwmcStr = "科技通信处";
				} else if (StringUtil.equals(dataMap.get("PERIOD").trim(), orgTrafficPolice)) {
					trafficPoliceMap = dataMap;
					dwmcStr = "交警";
				} else {
					reList.add(dataMap);
					dwmcStr = dataMap.get("PERIOD").trim().substring(0, 2);
				}
				dataMap.put("PERIOD", dwmcStr);
			}
			resultList.add(policeMap);
			resultList.add(trafficPoliceMap);
			Collections.sort(reList, new Comparator<Map<String, String>>() { 
	            public int compare(Map<String, String> o1, Map<String, String> o2) { 
	                int map1value = StringUtil.toInt(o1.get("AMOUNT")); 
	                int map2value = StringUtil.toInt(o2.get("AMOUNT")); 
	                return map2value - map1value; 
	            } 
	        });
			resultList.addAll(reList);
		}
		
		this.jsonResult.setData(resultList);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
	}
	
	//并发执行hbase数据查询
	class Worker extends Thread{  
		List<Map<String, String>> mounts;
        CountDownLatch latch;  
        public Worker(List<Map<String, String>> allMounts ,CountDownLatch latch){  
        	this.mounts = allMounts;
            this.latch = latch;  
        }  
        public void run(){  
            doWork();//工作
            latch.countDown();//完成工作，计数器减一  
  
        }  
        private void doWork(){  
    		List<Map<String, String>> result = null;
            try {  
    			result = mountOnlineService.firstPageMountStatus(mounts);
    			if (result != null) {
    				synchronized (allResults) {
    					allResults.addAll(result);
					}
    			}
            } catch (Exception e) {  
                e.printStackTrace();  
            }  
        }  
    }  
	
	
	//并发执行hbase数据查询,用于数据中心卡口在线状态查询
	class StatuWorker extends Thread{  
		List<Map<String, String>> statuMounts;
        CountDownLatch downlatch;  
        public StatuWorker(List<Map<String, String>> allMounts ,CountDownLatch latch){  
        	this.statuMounts = allMounts;
            this.downlatch = latch;  
        }  
        public void run(){  
            statuDoWork();//工作
            downlatch.countDown();//完成工作，计数器减一  
  
        }  
        private void statuDoWork(){  
    		List<Map<String, String>> statuResult = null;
            try {  
            	Map<String, String> param = new HashMap<String, String>();
            	param.put("tableName", "MOUNT_TAB");
            	for(Map<String,String> mount : statuMounts){
            		statuResult = mountOnlineService.mountOnlienStatusInfo(mount, param);
        			if (statuResult != null) {
        				synchronized (statuResults) {
        					statuResults.addAll(statuResult);
						}
        			}
        		}
            } catch (Exception e) {  
                e.printStackTrace();  
            }  
        }  
    }  
	
	//并发执行hbase数据查询,用于数据中心卡口在线状态查询
	class VitrulStatuWorker extends Thread{  
		List<Map<String, String>> vitrulStatuMounts;
        CountDownLatch vitrlDownlatch;  
        public VitrulStatuWorker(List<Map<String, String>> allMounts ,CountDownLatch latch){  
        	this.vitrulStatuMounts = allMounts;
            this.vitrlDownlatch = latch;  
        }  
        public void run(){  
            statuDoWork();//工作
            vitrlDownlatch.countDown();//完成工作，计数器减一  
  
        }  
        private void statuDoWork(){  
    		List<Map<String, String>> statuResult = null;
            try {  
            	Map<String, String> param = new HashMap<String, String>();
            	param.put("tableName", "MOUNT_VIRTUAL_TAB");
            	for(Map<String,String> mount : vitrulStatuMounts){
            		statuResult = mountOnlineService.mountOnlienStatusInfo(mount, param);
        			if (statuResult != null) {
        				synchronized (vitrulStatuResults) {
        					vitrulStatuResults.addAll(statuResult);
						}
        			}
        		}
            } catch (Exception e) {  
                e.printStackTrace();  
            }  
        }  
    }  
	
	/**
	 * 卡口在线状态图表查询,柱状图查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/mountOnlineChartCulumn")
	@ResponseBody
	public Object mountOnlineChartCulumnInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		if (!StringUtil.checkStr(searchParam.get("orgId"))) {
			return null;
		}
		if (!StringUtil.checkStr(searchParam.get("startTime"))) {
			searchParam.put("startTime", searchParam.get("startTime_culumn"));
		}
		if (!StringUtil.checkStr(searchParam.get("endTime"))) {
			searchParam.put("endTime", searchParam.get("endTime_culumn"));
		}
		List<Map<String, String>> datas = null;
		if (StringUtil.equals(searchParam.get("culumnOline"), "0")) {
			datas = mountOnlineService.mountOutOnlineChartInfo(searchParam); //查询离线
		} else {
			List<Map<String, String>> mounts = organizationService.findOrgInfoByOrgType(searchParam);
			datas = mountOnlineService.mountOnlineChartInfo(mounts, searchParam);  //查询在线
		}
		this.jsonResult.setData(datas);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 卡口在线状态图表查询,只显示柱状图使用
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/mountStatusOnlyCulumn")
	@ResponseBody
	public Object mountStatusOnlyCulumnInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> datas = null;
		if (!StringUtil.checkStr(searchParam.get("culumnOline"))) {
			searchParam.put("culumnOline", "1"); //默认空则查询在线
		}
		List<Map<String, String>> mounts = organizationService.countUsringOrgMountsInfo();
		datas = mountOnlineService.mountStatusOnlyCulumnInfo(null, searchParam);  //查询在线和离线
		String dwmcStr = "";
		List<Map<String, String>> outAlls = new ArrayList<Map<String,String>>();
		Map<String, String> newDataMap = null;
		boolean havingFlag = false;
		for (Map<String, String> mountMap : mounts) {
			havingFlag = false;
			for (Map<String, String> dataMap : datas) {
				if (StringUtil.equals(dataMap.get("PERIOD").trim(), mountMap.get("PERIOD").trim())) {
					dataMap.put("OUT", StringUtil.toString(StringUtil.toInt(mountMap.get("COUNT")) - StringUtil.toInt(dataMap.get("COUNT"))));
					dataMap.put("AMOUNT", mountMap.get("COUNT"));
					havingFlag = true;
					break;
				}
			}
			if (!havingFlag) {
				newDataMap = new HashMap<String, String>();
				newDataMap.put("PERIOD", mountMap.get("PERIOD"));
				newDataMap.put("COUNT", "0");
				newDataMap.put("OUT", mountMap.get("COUNT"));
				newDataMap.put("AMOUNT", mountMap.get("COUNT"));
				outAlls.add(newDataMap);
			}
		}
		List<Map<String, String>> reList = new ArrayList<Map<String,String>>(); 
		List<Map<String, String>> resultList = new ArrayList<Map<String,String>>(); 
		Map<String, String> policeMap = new HashMap<String, String>();
		Map<String, String> trafficPoliceMap = new HashMap<String, String>();
		if (outAlls.size() > 0) {
			datas.addAll(outAlls);
			if (datas != null && datas.size() > 0) {
				for (Map<String, String> dataMap : datas) {
					String orgPolice = "科技通信处";
					String orgTrafficPolice = "交警支队";
					if (StringUtil.equals(dataMap.get("PERIOD").trim(), orgPolice)) {
						//dwmcStr = orgPolice.substring(2, orgPolice.length());
						policeMap = dataMap;
						dwmcStr = "科技通信处";
					} else if (StringUtil.equals(dataMap.get("PERIOD").trim(), orgTrafficPolice)) {
						//dwmcStr = orgTrafficPolice.substring(6, 10);
						trafficPoliceMap = dataMap;
						dwmcStr = "交警";
					} else {
						reList.add(dataMap);
						dwmcStr = dataMap.get("PERIOD").trim().substring(0, 2);
					}
					dataMap.put("PERIOD", dwmcStr);
				}
			}
			resultList.add(policeMap);
			resultList.add(trafficPoliceMap);
			Collections.sort(reList, new Comparator<Map<String, String>>() { 
	            public int compare(Map<String, String> o1, Map<String, String> o2) { 
	                int map1value = StringUtil.toInt(o1.get("AMOUNT")); 
	                int map2value = StringUtil.toInt(o2.get("AMOUNT")); 
	                return map2value - map1value; 
	            } 
	        });
			resultList.addAll(reList);
		}
		this.jsonResult.setData(resultList);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 卡口在线状态图表查询,曲线图查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/mountOnlineChartLine")
	@ResponseBody
	public Object mountOnlineChartLineInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		if (!StringUtil.checkStr(searchParam.get("orgId"))) {
			return null;
		}
		if (!StringUtil.checkStr(searchParam.get("startTime"))) {
			searchParam.put("startTime", searchParam.get("startTime_line"));
		}
		if (!StringUtil.checkStr(searchParam.get("endTime"))) {
			searchParam.put("endTime", searchParam.get("endTime_line"));
		}
		List<Map<String, String>> datas = null;
		if (StringUtil.equals(searchParam.get("lineOline"), "0")) {
			datas = mountOnlineService.mountOutOnlineChartInfo(searchParam); //查询离线
		} else {
			List<Map<String, String>> mounts = organizationService.findOrgInfoByOrgType(searchParam);
			datas = mountOnlineService.mountOnlineChartInfo(mounts, searchParam);  //查询在线
		}
		this.jsonResult.setData(datas);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 卡口在线状态图表查询,趋势图查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/mountOnlineTrendChar")
	@ResponseBody
	public Object mountOnlineTrendChartInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		if (!StringUtil.checkStr(searchParam.get("orgId"))) {
			return null;
		}
		Calendar cal = Calendar.getInstance();   
		cal.set(Calendar.MONTH, StringUtil.toInt(searchParam.get("timeType")) - 1);
    	cal.set( Calendar.DATE, 1 );  
        cal.roll(Calendar.DATE, - 1 );  
        Date endTime=cal.getTime();  
        cal.set(GregorianCalendar.DAY_OF_MONTH, 1);   
        Date beginTime=cal.getTime();  
        String beginTime1=DateUtil.parseToString(beginTime, "yyyy-MM-dd") + " 00:00:00";  
        String endTime1=DateUtil.parseToString(endTime, "yyyy-MM-dd") + " 23:59:59";  
        searchParam.put("startTime", beginTime1);
        searchParam.put("endTime", endTime1);
		List<Map<String, String>> datas = null;
		if (StringUtil.equals(searchParam.get("lineOline"), "0")) {
			datas = mountOnlineService.mountOutOnlineTrendChartInfo(searchParam); //查询离线
		} else {
			List<Map<String, String>> mounts = organizationService.findOrgInfoByOrgType(searchParam);
			datas = mountOnlineService.mountOnlineTrendChartInfo(mounts, searchParam);  //查询在线
		}
		this.jsonResult.setData(datas);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 卡口在线状态图表查询,趋势图查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/mountStatusOnlyLine")
	@ResponseBody
	public Object mountStatusOnlyLineInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> datas = this.initTrendChartData(searchParam);
		this.jsonResult.setData(datas);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 处理趋势图查询结果数据
	 * @param searchParam 查询参数
	 * @return 处理结果
	 */
	public List<Map<String, String>> initTrendChartData(Map<String, String> searchParam) {
		if (!StringUtil.checkStr(searchParam.get("timeType"))) { //默认查询日
			searchParam.put("timeType", "1");
		}
		if (!StringUtil.checkStr(searchParam.get("culumnOline"))) {
			searchParam.put("culumnOline", "1"); //默认空则查询在线
		}
		if (!StringUtil.checkStr(searchParam.get("orgId"))) {
			searchParam.put("orgId", "440100"); //默认广州市
			searchParam.put("orgType", "0"); 
		}
		String beginTime1 = null;
		String endTime1 = null;
		Calendar cal = Calendar.getInstance();
		if (StringUtil.equals(searchParam.get("timeType"), "1")) { //日:查询24小时以内的数据
			Date endDate = cal.getTime();
			Date beginDate = this.getDate(-1);
			String timeStr = DateUtil.parseToString(endDate, "HH");
			beginTime1 = DateUtil.parseToString(beginDate, "yyyy-MM-dd") + " " + (StringUtil.toInt(timeStr) + 1) + ":00:00";
			endTime1 = DateUtil.parseToString(endDate, "yyyy-MM-dd")  + " " + timeStr + ":59:59";
		}
		if (StringUtil.equals(searchParam.get("timeType"), "2")) { //周
			Date endDate = cal.getTime();
			Date beginDate = this.getDate(-6);
			beginTime1 = DateUtil.parseToString(beginDate, "yyyy-MM-dd") + " 00:00:00";
			endTime1 = DateUtil.parseToString(endDate, "yyyy-MM-dd") + " 23:59:59";
		}
		if (StringUtil.equals(searchParam.get("timeType"), "3")) { //月,往后推30天
			Date endDate = cal.getTime();
			Date beginDate = this.getDate(-30);
			beginTime1 = DateUtil.parseToString(beginDate, "yyyy-MM-dd") + " 00:00:00";
			endTime1 = DateUtil.parseToString(endDate, "yyyy-MM-dd") + " 23:59:59";
		}
		if (StringUtil.equals(searchParam.get("timeType"), "4")) { //年
			Date endDate = cal.getTime();
			cal.set(Calendar.YEAR,cal.get(Calendar.YEAR)-1); 
			Date beginDate = cal.getTime();
			beginTime1=DateUtil.parseToString(beginDate, "yyyy-MM-dd") + " 00:00:00";  
	        endTime1=DateUtil.parseToString(endDate, "yyyy-MM-dd") + " 23:59:59";  
		}
        searchParam.put("startTime", beginTime1);
        searchParam.put("endTime", endTime1);
		List<Map<String, String>> datas = null;
		datas = mountOnlineService.mountOnlineTrendChartOnlyLineInfo(searchParam);  //查询在线
		if (StringUtil.equals(searchParam.get("timeType"), "1")) { //日,特殊处理
			if (datas != null && datas.size() > 0) {
				for (Map<String, String> dataMap : datas) {
					dataMap.put("PERIOD", dataMap.get("PERIOD").split(" ")[1]);
				}
			}
		}
		return datas;
	}
	
	/**
	 * 计算出离当前日期datas天的日期,若datas小于0表示当前日期之前datas天，若datas大于0表当前日期之后datas天
	 * 
	 * @param 要计算的天数
	 * @return 得到日期
	 */
	public static Date getDate(int datas) {
		GregorianCalendar calendar = new GregorianCalendar();
		calendar.add(GregorianCalendar.DATE, datas);
		String begin = new java.sql.Date(calendar.getTime().getTime())
				.toString();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date beginDate = null;
		try {
			beginDate = sdf.parse(begin);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return beginDate;
	}

	/**
	 * 针对卡口在线状态，提供的列表排名展示
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/mountColumnQuery")
	@ResponseBody
	public Object mountColumnQueryInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> datas = null;
		if (!StringUtil.checkStr(searchParam.get("culumnOline"))) {
			searchParam.put("culumnOline", "1"); //默认空则查询在线
		}
		List<Map<String, String>> mounts = organizationService.countUsringOrgMountsInfo();
		datas = mountOnlineService.mountStatusOnlyCulumnInfo(null, searchParam);  //查询在线和离线
		String dwmcStr = "";
		List<Map<String, String>> outAlls = new ArrayList<Map<String,String>>();
		Map<String, String> newDataMap = null;
		boolean havingFlag = false;
		for (Map<String, String> mountMap : mounts) {
			havingFlag = false;
			for (Map<String, String> dataMap : datas) {
				if (StringUtil.equals(dataMap.get("PERIOD").trim(), mountMap.get("PERIOD").trim())) {
					dataMap.put("COUNT_DESC", mountMap.get("COUNT") + "（" + dataMap.get("COUNT")  + "）");
					havingFlag = true;
					break;
				}
			}
			if (!havingFlag) {
				newDataMap = new HashMap<String, String>();
				newDataMap.put("PERIOD", mountMap.get("PERIOD"));
				newDataMap.put("COUNT", "0");
				newDataMap.put("COUNT_DESC", mountMap.get("COUNT") + "（0）");
				outAlls.add(newDataMap);
			}
		}
		if (outAlls.size() > 0) {
			datas.addAll(outAlls);
			if (datas != null && datas.size() > 0) {
				for (Map<String, String> dataMap : datas) {
					String orgPolice = "科技通信处";
					String orgTrafficPolice = "交警支队";
					if (StringUtil.equals(dataMap.get("PERIOD").trim(), orgPolice)) {
						dwmcStr = "科技通信处";
					} else if (StringUtil.equals(dataMap.get("PERIOD").trim(), orgTrafficPolice)) {
						//dwmcStr = orgTrafficPolice.substring(6, 10);
						dwmcStr = "交警";
					} else {
						dwmcStr = dataMap.get("PERIOD").trim().substring(0, 2);
					}
					dataMap.put("PERIOD", dwmcStr);
				}
				Collections.sort(datas, new Comparator<Map<String, String>>() { 
		            public int compare(Map<String, String> o1, Map<String, String> o2) { 
		                int map1value = StringUtil.toInt(o1.get("COUNT")); 
		                int map2value = StringUtil.toInt(o2.get("COUNT")); 
		                return map2value - map1value; 
		            } 
		        });
			}
		}
		return ResponseUtils.sendList(datas, datas.size());
	}
	
	/**
	 * 卡口在线状态图表查询,趋势图对应的列表数据展示
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/mountTrendChartQuery")
	@ResponseBody
	public Object mountTrendChartQueryInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> datas = this.initTrendChartData(searchParam);
		if (datas != null && datas.size() > 0) {
			List<Map<String, String>> mounts = organizationService.countAllOrgMountsInfo();
			Collections.sort(datas, new Comparator<Map<String, String>>() { 
	            public int compare(Map<String, String> o1, Map<String, String> o2) { 
	                int map1value = StringUtil.toInt(o1.get("COUNT")); 
	                int map2value = StringUtil.toInt(o2.get("COUNT")); 
	                return map2value - map1value; 
	            } 
	        });
			double percent = 0d;
			NumberFormat nt = NumberFormat.getPercentInstance();
			nt.setMinimumFractionDigits(2);
			for (Map<String, String> dataMap : datas) {
				for (Map<String, String> mountMap : mounts) {
					if (StringUtil.equals(dataMap.get("DWMC").trim(), mountMap.get("PERIOD").trim())) {
						percent = Double.parseDouble(dataMap.get("COUNT")) / Double.parseDouble(mountMap.get("COUNT"));
						dataMap.put("PERCENTAGE", nt.format(percent));
						break;
					}
				}
			}
		}
		return ResponseUtils.sendList(datas, datas.size());
	}
}
