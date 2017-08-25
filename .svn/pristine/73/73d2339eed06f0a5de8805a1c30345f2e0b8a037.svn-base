package com.jp.tic.analyze.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.analyze.service.MountOnlineService;
import com.jp.tic.analyze.service.MountWsStatusService;
import com.jp.tic.system.service.OrganizationService;
import com.jp.tic.system.service.SystemConfigService;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.StringUtil;

@Service
public class MountWsStatusServiceImpl implements MountWsStatusService {
	
	@Autowired
	MountOnlineService mountOnlineService;
	@Autowired
	SystemConfigService systemConfigService;
	@Autowired
	OrganizationService organizationService;
	
	List<Map<String, String>> vitrulStatuResults = new ArrayList<Map<String,String>>();

	@SuppressWarnings("unchecked")
	public String mountStatusSearch(String jsonStr) throws Exception {
		Map<String, String> searchParam = JsonUtil.jsonToMap(jsonStr);
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
		if (vitrulStatuResults != null && vitrulStatuResults.size() > 0) {
			for (Map<String, String> dataMap : vitrulStatuResults) {
				dataMap.put("END_TIME", dataMap.get("JGSJ"));
			}
		}
		String resultJson = JsonUtil.objToJson(vitrulStatuResults);
		return resultJson;
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
}
