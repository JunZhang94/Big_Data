package com.jp.tic.system.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.business.user.service.UserService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.service.SystemConfigService;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/systemConfig")
public class SystemConfigController extends AbstractController {
	
	@Autowired
	SystemConfigService systemConfigService;
	
	@Autowired
	UserService userService;
	
	/**
	 * 加载报警设置页面
	 * @return 页面映射
	 */
	@RequestMapping("/alarmSetting")
	public String deviceLoad() {
		return "/system/system-setting";
	}

	/**
     * 加载配置信息
     * @return 查询结果
     * @author lsg
     */
	@RequestMapping("/loadAlarmSetting")
	@ResponseBody
    public Object loadAlarmSettingInfo(Model model, HttpServletRequest request) {
		Map<String, Object> userMap = userService.getCurrentUser(request);
		List<Map<String, String>> results = systemConfigService.loadAlarmSettingInfo();
		Map<String, String> dataMap = new HashMap<String, String>();
		if (results != null && results.size() > 0) {
			for (Map<String, String> configMap : results) {
			    if (StringUtil.equals(configMap.get("CODE"), "trouble_setting")) {
					String troubleSetting = "0";
					if (StringUtil.equals(configMap.get("VALUE"), "true")) {
						troubleSetting = "1";
					}
					dataMap.put("trouble_setting", troubleSetting);
				}
			    if (StringUtil.equals(configMap.get("CODE"), "log_setting")) {
					String log_setting = "0";
					if (StringUtil.equals(configMap.get("VALUE"), "true")) {
						log_setting = "1";
					}
					dataMap.put("log_setting", log_setting);
				}
			    if (StringUtil.equals(configMap.get("CODE"), "FaultState")) {
			    	String onlineState= configMap.get("VALUE");
			    	dataMap.put("onlineState", onlineState);
			    }
			    if (StringUtil.equals(configMap.get("CODE"), "statuNumber")) {
			    	String statuNumber= configMap.get("VALUE");
			    	dataMap.put("statuNumber", statuNumber);
			    }
			    if (StringUtil.equals(configMap.get("CODE"), "tabPanelFlag")) {
			    	//String showPanel= configMap.get("VALUE");
			    	String showPanel = StringUtil.toString(userMap.get("CONFIG_FLAG"));
			    	String showPanelFlag = "";
			    	if (StringUtil.equals(showPanel, "panel")) {
			    		showPanelFlag = "1";
			    	} else if (StringUtil.equals(showPanel, "portal")){
			    		showPanelFlag = "2";
			    	} else {
			    		showPanelFlag = "3";
			    	}
			    	dataMap.put("showPanel", showPanelFlag);
			    }
			    if (StringUtil.equals(configMap.get("CODE"), "first_page_car_days")) {
			    	String carTime= configMap.get("VALUE");
			    	dataMap.put("carTime", carTime);
			    }
			    if (StringUtil.equals(configMap.get("CODE"), "first_page_alarm_days")) {
			    	String alarmTime= configMap.get("VALUE");
			    	dataMap.put("alarmTime", alarmTime);
			    }
			    if (StringUtil.equals(configMap.get("CODE"), "fake_counts")) {
			    	String carTime= configMap.get("VALUE");
			    	dataMap.put("fakeCounts", carTime);
			    }
			    if (StringUtil.equals(configMap.get("CODE"), "fake_times")) {
			    	String alarmTime= configMap.get("VALUE");
			    	dataMap.put("fakeTimes", alarmTime);
			    }
			    if (StringUtil.equals(configMap.get("CODE"), "closet_limit")) {
			    	String closetLimit= configMap.get("VALUE");
			    	dataMap.put("closetCounts", closetLimit);
			    }
			    if (StringUtil.equals(configMap.get("CODE"), "historyFlag")) {
			    	String historyPanel= configMap.get("VALUE");
			    	String showHistoryFlag = "";
			    	if (StringUtil.equals(historyPanel, "mounts")) {
			    		showHistoryFlag = "1";
			    	} else {
			    		showHistoryFlag = "2";
			    	}
			    	dataMap.put("showDirectionPanel", showHistoryFlag);
			    }
			}
		}
        this.jsonResult.setData(dataMap);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
    }
	
	/**
     * 保存设置数据
     * @return 处理结果
     * @author lsg
     */
	@RequestMapping("/saveOrUpdate")
	@ResponseBody
    public Object saveOrUpdateAlarmSettingInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		Map<String, Object> userMap = userService.getCurrentUser(request);
		if (StringUtil.checkObj(userMap.get("USER_CODE"))) {
			searchParam.put("userCode", StringUtil.toString(userMap.get("USER_CODE")));
		}
		int saveFlag = 0;
		saveFlag = this.systemConfigService.saveOrUpdateAlarmSettingInfo(searchParam);
		saveFlag += this.systemConfigService.updateOperationSettingInfo(searchParam);
		saveFlag += this.systemConfigService.updateTroubleCheck(searchParam);
		saveFlag += this.systemConfigService.updateOnlineStateTime(searchParam);
		saveFlag += this.systemConfigService.updateFirstPanelFlag(searchParam);
		saveFlag += this.systemConfigService.updateCarTime(searchParam);
		saveFlag += this.systemConfigService.updateAlarmTime(searchParam);
		saveFlag += this.systemConfigService.updateFakeCounts(searchParam);
		saveFlag += this.systemConfigService.updateFakeTimes(searchParam);
		saveFlag += this.systemConfigService.updateClosetLimit(searchParam);
		saveFlag += this.systemConfigService.updateStatuNumber(searchParam);
		saveFlag += this.systemConfigService.updateHistoryFlag(searchParam);
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 初始化下载中心数据
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/downCenterData")
	@ResponseBody
	public Object downCenterDataInfo(Model model, HttpServletRequest request) {
		List<Map<String, String>> results = new ArrayList<Map<String,String>>();
		Map<String, String> map1 = new HashMap<String, String>();
		map1.put("NAME", "用户手册");
		map1.put("REMARK", "了解系统如何使用");
		map1.put("TYPE", "pdf");
		map1.put("URL", "/resources/manual_v1.1.pdf");
		Map<String, String> map2 = new HashMap<String, String>();
		map2.put("NAME", "车牌号码模板");
		map2.put("REMARK", "规范车牌号码格式");
		map2.put("TYPE", "xls");
		map2.put("URL", "/resources/car_num.xls");
		results.add(map1);
		results.add(map2);
		return ResponseUtils.sendList(results, 0);
	}
}
