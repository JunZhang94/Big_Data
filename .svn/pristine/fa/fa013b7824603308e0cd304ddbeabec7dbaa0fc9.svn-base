package com.jp.tic.business.datacenter.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.net.URLEncoder;
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
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.business.cartake.service.CarQueryStatService;
import com.jp.tic.business.datacenter.service.DataQualityService;
import com.jp.tic.business.datacenter.service.DataRecieveService;
import com.jp.tic.business.datacenter.service.TimeTaskManageService;
import com.jp.tic.business.user.service.UserService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.service.BusinessExportService;
import com.jp.tic.system.service.OrganizationService;
import com.jp.tic.system.service.impl.ExcelExportServiceImpl;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@Scope("prototype")
@RequestMapping("/dc")
public class DataRecieveController extends AbstractController {
	
	@Autowired
	DataRecieveService dataRecieveService;
	

	@Autowired
	DataQualityService dataQualityService;
	

	@Autowired
	CarQueryStatService carqyery;
	
	@Autowired
	TimeTaskManageService taskService;
	
	@Autowired
	OrganizationService organizationService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	BusinessExportService businessExportService;
	
	private InputStream inputStream; // 文件流
	
	private String excelFileName; //Excel导出文件名
	
	
	@RequestMapping("/dataAcceptPage")
	public String dataAcceptPageLoad() throws Exception {
		return "/datacenter/data-accept-status";
	}
	
	@RequestMapping("/dataQualityPage")
	public String dataQualityPageLoad() throws Exception {
		return "/datacenter/data-quality-manager";
	}
    @RequestMapping("/taskPage")
    public String timeJobsLoad()throws Exception{
    	return "/datacenter/data-timeJobs-manager";
    	//return "/control/mywork-control-manager";
    }
	@RequestMapping("/recieve/status")
	public String toRecieveStatus() throws Exception {
		
		return "/datacenter/data-recieve-status";
	}
	
	@RequestMapping("/data/qa")
	public String toQa() throws Exception {
		return "/datacenter/data-qa";
	}
	
	@RequestMapping("/trafficTatisticsPage")
	public String trafficTatisticsPageLoad() throws Exception {
		return "/datacenter/bayonet-traffic-statistics";
	}
	
	@RequestMapping("/dataAcceptColumnPage")
	public String toDataAcceptColumnPage() throws Exception {
		return "/datacenter/data-accept-column";
	}
	
	@RequestMapping("/dataAcceptLinePage")
	public String toDataAcceptLinePage() throws Exception {
		return "/datacenter/data-accept-line";
	}
	
	/**
	 * 数据接收状态查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/dataRecieveStatus")
	@ResponseBody
	public Object dataRecieveStatusInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		if (!StringUtil.checkStr(searchParam.get("orgId"))) {
			return null;
		}
		List<Map<String, String>> mounts = organizationService.findOrgInfoByOrgType(searchParam);
		List<Map<String, String>> results = dataRecieveService.dataRecieveStatusInfo(mounts);
		return ResponseUtils.sendList(results, 0);         
	}
	
	/**
	 * 数据接收状态查询,按部门分组展示
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
		List<Map<String, String>> mounts = organizationService.findOrgInfoByOrgType(searchParam);
		List<Map<String, String>> results = dataRecieveService.dataRecieveStatusInfo(mounts);
        this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
    }
	 
	/**
	 * 数据质量管理
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/dataQuality")
	@ResponseBody
	public Object dataQualityInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		if (!StringUtil.checkStr(searchParam.get("orgId"))) {
			return null;
		}
		List<Map<String, String>> depts = organizationService.findDeptInfoByOrgType(searchParam);
		List<Map<String, String>> results = dataQualityService.dataQualityInfo(searchParam, depts);
		List<Map<String, String>> counts = dataQualityService.dataQualityAmounts(searchParam, depts);
		int amounts = StringUtil.toInt(counts.get(0).get("COUNTS"));
		return ResponseUtils.sendList(results, amounts);    
	}
	
	/**
	 * 定时任务管理
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/taskInfo")
	@ResponseBody
	public Object timeTaskInfo(Model model,HttpServletRequest request){
		Map<String,String> searchParam = RequestUtil.getMapByRequest(request);
		Map<String, Object> userMap = userService.getCurrentUser(request);
		if (StringUtil.checkObj(userMap.get("USER_CODE"))) {
			searchParam.put("userCode", StringUtil.toString(userMap.get("USER_CODE")));
		}
		List<Map<String,String>> result = taskService.taskManageInfo(searchParam);
		List<Map<String,String>> counts = taskService.taskManageCount(searchParam);
		int amounts = StringUtil.toInt(counts.get(0).get("COUNTS"));
		return ResponseUtils.sendList(result, amounts);
	}
	
	/**
	 * 卡口车流量统计
	 * @param param 查询参数
	 * @return 返回结果
	 * @throws Exception 
	 */
	@RequestMapping("/trafficStatistics")
	@ResponseBody
	public Object trafficStatisticsInfo(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request); 
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
		int pageStart = StringUtil.toInteger(searchParam.get("page.start"));
        int rows = StringUtil.toInteger(searchParam.get("page.limit"));  
		String orgId = searchParam.get("orgId");
        String orgType = searchParam.get("orgType");
		StringBuffer buffer = new StringBuffer();
		String startdate = searchParam.get("startdate");
		String enddate = searchParam.get("enddate");
		if ("0".equals(dates)) {
			searchParam.put("startDateType", "yyyy-mm-dd HH24");
			searchParam.put("statisticalTime", "to_date(startT,'yyyy-mm-dd HH24')+1/24");
			searchParam.put("endShijian", "HH24");
		} else if ("1".equals(dates)){
			searchParam.put("startDateType", "yyyy-mm-dd");
			searchParam.put("statisticalTime", "to_date(startT,'yyyy-mm-dd')+1");
			searchParam.put("endShijian", "dd");
		} else {
			searchParam.put("startDateType", "yyyy-mm");
			searchParam.put("statisticalTime", "to_date(startT,'yyyy-mm')+1");
			searchParam.put("endShijian", "mm");
		}
		if (pageStart == 0) {
			searchParam.put("sss1","select * from (");
			searchParam.put("sss2",buffer.toString() + ") row_ where rownum <=" + rows);
        } else {
            int nextStart = pageStart + rows;
            searchParam.put("sss1","select * from ( select row_.*, rownum rownum_ from (");
            searchParam.put("sss2",buffer.toString() + ") row_ where rownum <= " + nextStart +") where rownum_ > " + pageStart);
        }
		searchParam.put("startdate", startdate);
		searchParam.put("enddate", enddate);
		searchParam.put("orgId", orgId);
		
		if("0".equals(orgType)){
			searchParam.put("sss3", "and area.qydm = '" + orgId + "'");
		}else if("1".equals(orgType)){
			searchParam.put("sss3", "and dept.dwbh = '" + orgId + "'");
		}else {
			searchParam.put("sss3", "and dgc.kkbh = '440" + orgId + "'");
		}
		int a=0;
		try {
			 a = carqyery.queryAnalyzecheliuliang(searchParam);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		List<Map<String, String>> results = carqyery.queryAnalyzecheliuliangs(searchParam);
		return ResponseUtils.sendList(results,a);         
	}
	
	/**
	 * 卡口车流量统计,按单位统计
	 * @param param 查询参数
	 * @return 返回结果
	 * @throws Exception 
	 */
	@RequestMapping("/deptStatisticsGroupping")
	@ResponseBody
	public Object deptStatisticsGrouppingInfo(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request); 
		List<Map<String, String>> results = this.loadDeptStatisticsGroupping(searchParam);
		this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
	}
	
	/**
	 * 卡口车流量统计,按单位统计详细信息
	 * @param searchParam
	 * @return 查询结果
	 * @throws Exception
	 */
	public List<Map<String, String>> loadDeptStatisticsGroupping(Map<String, String> searchParam) throws Exception {
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
		StringBuffer buffer = new StringBuffer();
		String startdate = searchParam.get("startdate");
		String enddate = searchParam.get("enddate");
		if ("0".equals(dates)) {
			searchParam.put("startDateType", "yyyy-mm-dd HH24");
			searchParam.put("statisticalTime", "to_date(startT,'yyyy-mm-dd HH24')+1/24");
			searchParam.put("endShijian", "HH24");
		} else if ("1".equals(dates)){
			searchParam.put("startDateType", "yyyy-mm-dd");
			searchParam.put("statisticalTime", "to_date(startT,'yyyy-mm-dd')+1");
			searchParam.put("endShijian", "dd");
		} else {
			searchParam.put("startDateType", "yyyy-mm");
			searchParam.put("statisticalTime", "to_date(startT,'yyyy-mm')+1");
			searchParam.put("endShijian", "mm");
		}
		searchParam.put("startdate", startdate);
		searchParam.put("enddate", enddate);
		searchParam.put("orgId", orgId);
		if("0".equals(orgType)){
			searchParam.put("sss3", "and area.qydm = '" + orgId + "'");
		}else if("1".equals(orgType)){
			searchParam.put("sss3", "and dept.dwbh = '" + orgId + "'");
		}else {
			searchParam.put("sss3", "and dgc.kkbh = '440" + orgId + "'");
		}
		List<Map<String, String>> results = new ArrayList<Map<String,String>>();
		if (StringUtil.equals(orgType, "0")) {
			results = carqyery.areaStatisticsGrouppingInfo(searchParam);
		} else if ( StringUtil.equals(orgType, "1")) {
			results = carqyery.deptStatisticsGrouppingInfo(searchParam);
		}
		if (StringUtil.checkStr(searchParam.get("waidiCarNum")) && StringUtil.equals(searchParam.get("waidiCarNum"), "1")) {
			if (results != null && results.size() > 0) {
				for (Map<String, String> dataMap : results) {
					Object couns = dataMap.get("COUNS");
					int counts = (int)(StringUtil.toInt(couns.toString()) * 0.3);
					double numCountsd = counts * 0.8;
					int numCounts = (new Double(numCountsd)).intValue(); 
					int hphmCounts = counts - numCounts;
					if (StringUtil.checkObj(couns)) {
						dataMap.put("COUNS", counts + "");
						dataMap.put("NON_HPHM_COUNS", numCounts + "");
						dataMap.put("HPHM_COUNS", hphmCounts + "");
					}
				}
			}
		}
		return results;
	}
	
	/**
	 * 卡口车流量统计,按卡口统计
	 * @param param 查询参数
	 * @return 返回结果
	 * @throws Exception 
	 */
	@RequestMapping("/trafficStatisticsGroupping")
	@ResponseBody
	public Object trafficStatisticsGrouppingInfo(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request); 
		List<Map<String, String>> results = this.loadTrafficStatisticsGroupping(searchParam);
		if (StringUtil.checkStr(searchParam.get("waidiCarNum")) && StringUtil.equals(searchParam.get("waidiCarNum"), "1")) {
			if (results != null && results.size() > 0) {
				for (Map<String, String> dataMap : results) {
					Object couns = dataMap.get("COUNS");
					int counts = (int)(StringUtil.toInt(couns.toString()) * 0.3);
					double numCountsd = counts * 0.8;
					int numCounts = (new Double(numCountsd)).intValue(); 
					int hphmCounts = counts - numCounts;
					if (StringUtil.checkObj(couns)) {
						dataMap.put("COUNS", counts + "");
						dataMap.put("NON_HPHM_COUNS", numCounts + "");
						dataMap.put("HPHM_COUNS", hphmCounts + "");
					}
				}
			}
		}
		this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
	}
	
	/**
	 * 卡口车流量统计,按卡口统计详细信息
	 * @param searchParam
	 * @return 查询结果
	 * @throws Exception
	 */
	public List<Map<String, String>> loadTrafficStatisticsGroupping(Map<String, String> searchParam) throws Exception {
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
		StringBuffer buffer = new StringBuffer();
		String startdate = searchParam.get("startdate");
		String enddate = searchParam.get("enddate");
		if ("0".equals(dates)) {
			searchParam.put("startDateType", "yyyy-mm-dd HH24");
			searchParam.put("statisticalTime", "to_date(startT,'yyyy-mm-dd HH24')+1/24");
			searchParam.put("endShijian", "HH24");
		} else if ("1".equals(dates)){
			searchParam.put("startDateType", "yyyy-mm-dd");
			searchParam.put("statisticalTime", "to_date(startT,'yyyy-mm-dd')+1");
			searchParam.put("endShijian", "dd");
		} else {
			searchParam.put("startDateType", "yyyy-mm");
			searchParam.put("statisticalTime", "to_date(startT,'yyyy-mm')+1");
			searchParam.put("endShijian", "mm");
		}
		searchParam.put("startdate", startdate);
		searchParam.put("enddate", enddate);
		searchParam.put("orgId", orgId);
		
		if("0".equals(orgType)){
			searchParam.put("sss3", "and area.qydm = '" + orgId + "'");
		}else if("1".equals(orgType)){
			searchParam.put("sss3", "and dept.dwbh = '" + orgId + "'");
		}else {
			searchParam.put("sss3", "and dgc.kkbh = '440" + orgId + "'");
		}
		List<Map<String, String>> results = carqyery.queryAnalyzecheliuliangs(searchParam);
		return results;
	}
	
	/**
	 * 汇聚统计按部门导出数据功能
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/exportDeptStatisticsData")
	public String exportDeptStatisticsDataInfos(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		//在共用的基础上增加私有的信息
        request.setAttribute(ExcelExportServiceImpl.EXCEL_PROCESSOR,"businessExportService");
        request.setAttribute(ExcelExportServiceImpl.EXCEL_FILENAME,"汇聚统计部门信息");
        //定义导出的字段名称
        String[] texts = new String[] {"部门名称","统计时间","接收数量","已识别数量","未识别数量"};
        //设定Excel单元格宽度
        int[] widths = new int[] {50, 30, 15, 15, 15};
        String kkmcStr = searchParam.get("carNumStr");
        String timeStr = searchParam.get("idstr");
        List<Map<String, String>> exportData = this.loadDeptStatisticsGroupping(searchParam);
        Collections.sort(exportData, new Comparator<Map<String, String>>() { 
            public int compare(Map<String, String> o1, Map<String, String> o2) { 
            	return o1.get("STATISTICAL_TIME").compareTo(o2.get("STATISTICAL_TIME"));
            } 
        });
        List<Map<String, String>> checkedData = new ArrayList<Map<String,String>>();
        if (StringUtil.checkStr(kkmcStr)) {
        	 String kkmcs[] = kkmcStr.split(",");
        	 String times[] = timeStr.split(",");
        	 for (Map<String, String> dataMap : exportData) {
        		 for (int  i = 0; i < kkmcs.length; i++) {
            		 if (StringUtil.equals(dataMap.get("STATISTICAL_TIME"), times[i])) {
            			 checkedData.add(dataMap);
            		 }
            	 }
        	 }
        }
        //输出成为Excel 
        this.setExcelFileName(URLEncoder.encode("汇聚统计部门信息", "UTF-8"));
        File file = File.createTempFile("statistics" + new Date().getTime() + "_", "tmp");
        response.setContentType("application/vnd.ms-excel");      
        String curentTime = DateUtil.getCurrentDateTime();
        response.setHeader("content-disposition", "attachment;filename=" + excelFileName + curentTime + ".xls");    
        response.setBufferSize(4096);
        OutputStream stream = response.getOutputStream();
        Object[] dataSource = null;
        if (checkedData.size() > 0) {
        	dataSource = businessExportService.exportDeptStatisticsDataSource(checkedData);
        	this.businessExportService.outputToExcel(checkedData, stream, texts, widths, dataSource);
        } else {
        	dataSource = businessExportService.exportDeptStatisticsDataSource(exportData);
        	this.businessExportService.outputToExcel(exportData, stream, texts, widths, dataSource);
		}
        this.inputStream = new FileInputStream(file);
        return "";
	}
	
	/**
	 * 汇聚统计按卡口导出数据功能
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/exportStatisticsData")
	public String exportStatisticsDataInfos(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		//在共用的基础上增加私有的信息
        request.setAttribute(ExcelExportServiceImpl.EXCEL_PROCESSOR,"businessExportService");
        request.setAttribute(ExcelExportServiceImpl.EXCEL_FILENAME,"汇聚统计卡口信息");
        //定义导出的字段名称
        String[] texts = new String[] {"卡口名称","统计时间","接收数量","已识别数量","未识别数量"};
        //设定Excel单元格宽度
        int[] widths = new int[] {50, 30, 15, 15, 15};
        String kkmcStr = searchParam.get("carNumStr");
        String timeStr = searchParam.get("idstr");
        List<Map<String, String>> exportData = this.loadTrafficStatisticsGroupping(searchParam);
        Collections.sort(exportData, new Comparator<Map<String, String>>() { 
            public int compare(Map<String, String> o1, Map<String, String> o2) { 
            	return o1.get("STATISTICAL_TIME").compareTo(o2.get("STATISTICAL_TIME"));
            } 
        });
        Collections.sort(exportData, new Comparator<Map<String, String>>() { 
            public int compare(Map<String, String> o1, Map<String, String> o2) { 
            	return o1.get("KKMC").compareTo(o2.get("KKMC"));
            } 
        });
        List<Map<String, String>> checkedData = new ArrayList<Map<String,String>>();
        if (StringUtil.checkStr(kkmcStr)) {
        	 String kkmcs[] = kkmcStr.split(",");
        	 String times[] = timeStr.split(",");
        	 for (Map<String, String> dataMap : exportData) {
        		 for (int  i = 0; i < kkmcs.length; i++) {
            		 if (StringUtil.equals(dataMap.get("KKMC"), kkmcs[i]) && StringUtil.equals(dataMap.get("STATISTICAL_TIME"), times[i])) {
            			 checkedData.add(dataMap);
            		 }
            	 }
        	 }
        }
        //输出成为Excel 
        this.setExcelFileName(URLEncoder.encode("汇聚统计卡口信息", "UTF-8"));
        File file = File.createTempFile("statistics" + new Date().getTime() + "_", "tmp");
        response.setContentType("application/vnd.ms-excel");      
        String curentTime = DateUtil.getCurrentDateTime();
        response.setHeader("content-disposition", "attachment;filename=" + excelFileName + curentTime + ".xls");    
        response.setBufferSize(4096);
        OutputStream stream = response.getOutputStream();
        Object[] dataSource = null;
        if (checkedData.size() > 0) {
        	dataSource = businessExportService.exportStatisticsDataSource(checkedData);
        	this.businessExportService.outputToExcel(checkedData, stream, texts, widths, dataSource);
        } else {
        	dataSource = businessExportService.exportStatisticsDataSource(exportData);
        	this.businessExportService.outputToExcel(exportData, stream, texts, widths, dataSource);
		}
        this.inputStream = new FileInputStream(file);
        return "";
	}
	
	/**
	 * 数据接收状态图表查询,只显示柱状图使用
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/dataAcceptOnlyColumn")
	@ResponseBody
	public Object dataAcceptOnlyColumnInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> datas = null;
		if (!StringUtil.checkStr(searchParam.get("culumnOline"))) {
			searchParam.put("culumnOline", "1"); //默认空则查询在线
		}
		List<Map<String, String>> mounts = organizationService.countUsringOrgMountsInfo();
		searchParam.put("culumnOline", "1"); //默认空则查询在线
		datas = dataRecieveService.dataAcceptOnlyColumnInfo(null, searchParam);  //查询在线和离线
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
	 * 数据接收率图表查询,趋势图查询
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/dataAcceptOnlyLine")
	@ResponseBody
	public Object dataAcceptTrendChartOnlyLineInfo(Model model, HttpServletRequest request) {
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
		if (StringUtil.equals(searchParam.get("timeType"), "1")) { //日
			Date endDate = cal.getTime();
			Date beginDate = this.getDate(-1);
			String timeStr = DateUtil.parseToString(endDate, "HH");
			beginTime1 = DateUtil.parseToString(beginDate, "yyyy-MM-dd")  + " " + (StringUtil.toInt(timeStr) + 1) + ":00:00";
			endTime1 = DateUtil.parseToString(endDate, "yyyy-MM-dd")  + " " + timeStr + ":59:59";
		}
		if (StringUtil.equals(searchParam.get("timeType"), "2")) { //周
			Date endDate = cal.getTime();
			Date beginDate = this.getDate(-6);
			beginTime1 = DateUtil.parseToString(beginDate, "yyyy-MM-dd") + " 00:00:00";
			endTime1 = DateUtil.parseToString(endDate, "yyyy-MM-dd") + " 23:59:59";
		}
		if (StringUtil.equals(searchParam.get("timeType"), "3")) { //月
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
		datas = dataRecieveService.dataAcceptTrendChartOnlyLineInfo(searchParam);  //查询在线
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
	 * 针对数据接收状态，提供的列表排名展示
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/dataColumnQuery")
	@ResponseBody
	public Object dataColumnQueryInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> datas = null;
		if (!StringUtil.checkStr(searchParam.get("culumnOline"))) {
			searchParam.put("culumnOline", "1"); //默认空则查询在线
		}
		List<Map<String, String>> mounts = organizationService.countUsringOrgMountsInfo();
		searchParam.put("culumnOline", "1"); //默认空则查询在线
		datas = dataRecieveService.dataAcceptOnlyColumnInfo(null, searchParam);  //查询在线和离线
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
	 * 数据接收率图表查询,趋势图对应的列表数据展示
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/dataTrendChartQuery")
	@ResponseBody
	public Object dataTrendChartQueryInfo(Model model, HttpServletRequest request) {
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
	
	/**
	 * 统计字典信息数据
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/countDataQuality")
	@ResponseBody
	public Object countDataQualityInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> depts = organizationService.findDeptInfoByOrgType(searchParam);
		List<Map<String, String>> counts = dataQualityService.dataQualityAmounts(searchParam, depts);
		int amounts = StringUtil.toInt(counts.get(0).get("COUNTS"));
		this.jsonResult.setData(amounts);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 数据质量导出功能
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/exportDataQuality")
	public String exportDataQualityInfos(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		//在共用的基础上增加私有的信息
        request.setAttribute(ExcelExportServiceImpl.EXCEL_PROCESSOR,"businessExportService");
        request.setAttribute(ExcelExportServiceImpl.EXCEL_FILENAME,"数据质量信息");
        //定义导出的字段名称
        String[] texts = new String[] {"单位名称","错误类型","字段名称","字段值","纠正值","错误等级","错误描述","报告时间","接收服务器IP"};
        //设定Excel单元格宽度
        int[] widths = new int[] {15, 10, 10, 10, 10, 10, 30, 25, 15};
        String idstr = searchParam.get("idstr");
        if (StringUtil.isNotBlank(idstr)) {
            String partIds[] = idstr.split(",");
            List<Map<String, String>> exportData = dataQualityService.exportDataQualityById(partIds);
            /* 输出成为Excel */
            this.setExcelFileName(URLEncoder.encode("数据质量", "UTF-8"));
            File file = File.createTempFile("alarm" + new Date().getTime() + "_", "tmp");
            response.setContentType("application/vnd.ms-excel");      
            response.setHeader("content-disposition", "attachment;filename=" + excelFileName + ".xls");    
            response.setBufferSize(2048);
            OutputStream stream = response.getOutputStream();
            Object[] dataSource = businessExportService.exportDataQualitySource(exportData);
            this.businessExportService.outputToExcel(exportData, stream, texts, widths, dataSource);
            this.inputStream = new FileInputStream(file);
            return "";
        } else {
        	List<Map<String, String>> depts = organizationService.findDeptInfoByOrgType(searchParam);
        	String exportQuerySql = dataQualityService.exportQuerySql(searchParam, depts);
        	request.setAttribute(ExcelExportServiceImpl.EXCEL_SQL, exportQuerySql);
        	request.setAttribute(ExcelExportServiceImpl.EXCEL_EXPORTTYPE, searchParam.get("exportType"));
        	request.setAttribute(ExcelExportServiceImpl.TITLE_TEXTS,texts);
        	request.setAttribute(ExcelExportServiceImpl.TITLE_WITHS,widths);
        	request.setAttribute(ExcelExportServiceImpl.EXPORT_FLAG,"quality");
        	return "forward:/excelExport/export.mvc";
        }
    }

	/**
	 * @return the inputStream
	 */
	public InputStream getInputStream() {
		return inputStream;
	}

	/**
	 * @param inputStream the inputStream to set
	 */
	public void setInputStream(InputStream inputStream) {
		this.inputStream = inputStream;
	}

	/**
	 * @return the excelFileName
	 */
	public String getExcelFileName() {
		return excelFileName;
	}

	/**
	 * @param excelFileName the excelFileName to set
	 */
	public void setExcelFileName(String excelFileName) {
		this.excelFileName = excelFileName;
	}
}
