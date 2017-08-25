package com.jp.tic.business.device.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.business.device.entity.DeviceInfo;
import com.jp.tic.business.device.service.DeviceInfoService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.utils.view.RequestUtil;

/**
 * <b>function:</b> 设备控制器
 * @author hoojo
 * @createDate 2014-7-16 下午03:51:04
 * @file DeviceController.java
 * @package com.jp.tic.business.device
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
@Controller
@RequestMapping("/deviceinfo")
public class DeviceController extends AbstractController {

	@Autowired
	private DeviceInfoService<DeviceInfo> deviceInfoService;
	
	public List<Map<String, String>> findDeptByAreaCode(String areaCode) throws Exception {
		try {
			return deviceInfoService.findDeptByAreaCode(areaCode);
		} catch (RuntimeException e) {
			error(e);
			throw e;
		}
	}

	public List<Map<String, String>> findMountByDeptCode(String deptCode) throws Exception {
		try {
			return deviceInfoService.findMountByDeptCode(deptCode);
		} catch (RuntimeException e) {
			error(e);
			throw e;
		}
	}

	@RequestMapping("/navtree")
	@ResponseBody
	public List<DeviceInfo> getNavTreeData() throws Exception {
		try {
			return deviceInfoService.getNavTreeData();
		} catch (RuntimeException e) {
			error(e);
			throw e;
		}
	} 
	
	@SuppressWarnings("unchecked")
	@RequestMapping("/findDeviceByKkbh")
	@ResponseBody
	public Object findDeviceByKkbh(Model model, HttpServletRequest request) throws Exception{
		Map<String,String> result=new HashMap<String,String>();
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String sskkbh=searchParam.get("kkbh");
		List<DeviceInfo> list=deviceInfoService.findDeviceByMountCode(sskkbh);
		if(list.size()>0){
			DeviceInfo deviceInfo=list.get(0);
			String sbmc=deviceInfo.getSbmc();
			//video deviceNum
			String sbbh=deviceInfo.getDlmc();
			double jd=deviceInfo.getJd();
			double wd=deviceInfo.getWd();
			result.put("kkmc", sbmc);
			result.put("deviceNum", sbbh);
			result.put("jd", jd+"");
			result.put("wd", wd+"");
		}
		this.jsonResult.setData(result);
	    this.jsonResult.setNeedAlert(false);
		return jsonResult;
	}
	@RequestMapping("/toRealTimeAlarm")
	public String toRealTimeAlarmPage(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String urlStr = searchParam.get("urlStr");
		String title = searchParam.get("title");
		model.addAttribute("urlStr", urlStr);
		model.addAttribute("title", title);
		return "forward:/WEB-INF/app/eyeSearch/realTimeAlarm.jsp";
	}
}
