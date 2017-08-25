package com.jp.tic.business.platformmonitor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jp.tic.business.platformmonitor.service.DeviceStatusService;
import com.jp.tic.business.platformmonitor.service.HadoopStatusService;
import com.jp.tic.business.platformmonitor.service.ServiceStatusService;
import com.jp.tic.framework.controller.AbstractController;

@Controller
@RequestMapping("/plat")
public class PlatformMonitorController extends AbstractController {

	@Autowired
	private DeviceStatusService deviceStatusService;
	
	@Autowired
	private HadoopStatusService hadoopStatusService;
	
	@Autowired
	private ServiceStatusService serviceStatusService;
	
	@RequestMapping("/server/status")
	public String toServerStatus() throws Exception {
		
		return "/platformmonitor/server-status";
	}
	
	@RequestMapping("/service/status")
	public String toServiceStatus() throws Exception {
		
		return "/platformmonitor/service-status";
	}
	
	@RequestMapping("/hadoop/status")
	public String toHadoopStatus() throws Exception {
		
		return "/platformmonitor/hadoop-status";
	}

	@RequestMapping("/hadoop/monitor")
	public String toHadoopMonitor() throws Exception {
		
		return "/platformmonitor/hadoop-monitor";
	}
	
	@RequestMapping("/server/monitor")
	public String toServerMonitor() throws Exception {
		
		return "/platformmonitor/server-monitor";
	}
}
