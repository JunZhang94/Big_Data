package com.jp.tic.system.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.service.OperationLogService;
import com.jp.tic.system.service.SystemConfigService;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/operationLog")
public class OperationLogController extends AbstractController {
	
	@Autowired
	OperationLogService operationLogService;
	@Autowired
	SystemConfigService systemConfigService;

	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/operationLogPage")
	public String operationLogPageLoad() {
		return "/system/operation-log";
	}
	
	/**
	 * 分页查询人操作日志数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/queryOperationLog")
	@ResponseBody
	public Object queryOperationLogInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String usingFlag = "0"; //默认操作日志设置没有生效
		searchParam.put("start", searchParam.get("page.start"));
		searchParam.put("limit", searchParam.get("page.limit"));
		String startTime = DateUtil.parseToString(searchParam.get("startTime"), "yyyy-MM-dd HH:mm:ss");
		String endTime = DateUtil.parseToString(searchParam.get("endTime"), "yyyy-MM-dd HH:mm:ss");
		searchParam.put("startTime", startTime);
		searchParam.put("endTime", endTime);
		String startPoint = "0", endPoint = "24";
		
		List<Map<String, String>> logSettings = systemConfigService.findConfigByCode("log_setting");
		if (StringUtil.equals(searchParam.get("unusualLog"), "1")) { //勾选只查异常行为日志记录
			if (StringUtil.equals(logSettings.get(0).get("VALUE"), "true")) { //系统日常行为日志是否启用,启用了，此查询才会生效
				List<Map<String, String>> operationList = systemConfigService.findUsingLogConfig();
				if (operationList != null && operationList.size() > 0) {//异常设置字典结果集
					if (StringUtil.checkStr(searchParam.get("operationType"))) {
						for (Map<String, String> settingMap : operationList) {
							if (StringUtil.equals(settingMap.get("REMARK"), searchParam.get("operationType"))) {
								startPoint = settingMap.get("VALUE").split("-")[0];
								endPoint = settingMap.get("VALUE").split("-")[1];
								searchParam.put("startPoint", startPoint);
								searchParam.put("endPoint", StringUtil.toString(StringUtil.toInt(endPoint) - 1));
								usingFlag = settingMap.get("PERSON");
								searchParam.put("startDate", searchParam.get("startTime").split(" ")[0] + "00:00:00");
								searchParam.put("endDate", searchParam.get("endTime").split(" ")[0] + "23:59:59");
							}
						}
					} else {
						//操作类型
						StringBuffer str = new StringBuffer();
						for (int i = 0; i < operationList.size() - 1; i++) {
							str.append("(LOG_TYPE = '" + operationList.get(i).get("REMARK") + "' and to_char(GENERATETIME, 'HH24') " +
									"between " + operationList.get(i).get("VALUE").split("-")[0] + " and " + StringUtil.toString(StringUtil.toInt(operationList.get(i).get("VALUE").split("-")[1]) - 1) + ")");
							str.append(" OR ");
						}
						str.append("(LOG_TYPE = '" + operationList.get(operationList.size() - 1).get("REMARK") + "' and to_char(GENERATETIME, 'HH24') " +
								"between " + operationList.get(operationList.size() - 1).get("VALUE").split("-")[0] + " and " + StringUtil.toString(StringUtil.toInt(operationList.get(operationList.size() - 1).get("VALUE").split("-")[1]) - 1) + ")");
						searchParam.put("operations", str.toString());
					}
				} else {
					//只查异常操作信息，那么所有操作类型如果没有勾选启用，直接返回空
					return ResponseUtils.sendList(new ArrayList<Map<String, String>>(), 0);
				}
			}
		}
		searchParam.put("usingFlag", usingFlag); //是否启用
		List<Map<String, String>> results = operationLogService.queryOperationLogInfo(searchParam);
		List<Map<String, String>> counts = operationLogService.countOperationLogDatas(searchParam);
		if (results != null && results.size() > 0) {
			for (Map<String, String> map : results) {
				map.put("GENERATETIME", StringUtil.toString(map.get("GENERATETIME")));
			}
		}
		int amounts = StringUtil.toInt(StringUtil.toString(counts.get(0).get("COUNTS")));
		return ResponseUtils.sendList(results, amounts);
	}
}
