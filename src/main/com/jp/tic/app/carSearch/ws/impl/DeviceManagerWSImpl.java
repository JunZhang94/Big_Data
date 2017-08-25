package com.jp.tic.app.carSearch.ws.impl;

import java.util.HashMap;
import java.util.Map;

import javax.jws.WebService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.jp.tic.app.carSearch.ws.DeviceManagerWS;
import com.jp.tic.business.device.service.DeviceManagerService;
import com.jp.tic.utils.jsonUtil.JsonUtil;

@WebService(endpointInterface="com.jp.tic.app.carSearch.ws.DeviceManagerWS", serviceName="DeviceManagerWS")
@Controller
public class DeviceManagerWSImpl implements DeviceManagerWS{
	@Autowired
	DeviceManagerService service;
	
	@Override
	public String editDevices(String jsonParam) {
		// TODO Auto-generated method stub
//		Map<String,String> mapParam=new HashMap<String,String>();
//		mapParam.put("ACTION", "2");
//		mapParam.put("SBBH", "44010467001310000079");
//		mapParam.put("SBMC", "4079环市东路广工设计学院对出");
//		mapParam.put("JD", "113.294222");
//		mapParam.put("WD", "23.137172");
//		mapParam.put("DWBH", "440100000000");
//		Map<String,String> resultMap=service.editDevices(JsonUtil.objToJson(mapParam));
		Map<String,String> resultMap=service.editDevices(jsonParam);
		return JsonUtil.objToJson(resultMap);
	}

}
