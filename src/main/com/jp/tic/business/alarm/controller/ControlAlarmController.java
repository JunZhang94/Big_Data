package com.jp.tic.business.alarm.controller;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tools.zip.ZipOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.jp.tic.business.alarm.service.ControlAlarmService;
import com.jp.tic.common.zip.CompressHelper;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.core.annotation.Log;
import com.jp.tic.system.service.BusinessExportService;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.system.service.SystemConfigService;
import com.jp.tic.system.service.impl.ExcelExportServiceImpl;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/controlAlarm")
public class ControlAlarmController extends AbstractController {
	
	@Autowired
	ControlAlarmService controlAlarmService;
	@Autowired
	BusinessExportService businessExportService;
	@Autowired
	DictionaryService dictionaryService;
	@Autowired
	SystemConfigService systemConfigService;
	
	private InputStream inputStream; // 文件流
	
	private String excelFileName; //Excel导出文件名
	
	private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/controlAlarmPage")
	public String controlAlarmLoad() {
		return "/control/control-alarm-search";
	}
	
	/**
	 * 加载告警提醒页面
	 * @return 页面映射
	 */
	@RequestMapping("/alarmWarnPage")
	public String alarmWarnLoad() {
		return "/control/alarm-warn-search";
	}

	/**
	 * 分页告警信息数据
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/queryControlAlarm")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'查询告警信息'",content="'时间范围:' + getWebParamInfo().get('startTime') + '到' + getWebParamInfo().get('endTime') + ',查询车牌:' + getWebParamInfo().get('carBNum')",needPersist= true,operation="SEARCH")
	public Object queryControlAlarmInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = controlAlarmService.queryControlAlarmInfo(searchParam);
		List<Map<String, String>> counts = controlAlarmService.countControlAlarmDatas(searchParam);
		int amounts = StringUtil.toInt(counts.get(0).get("COUNTS"));
		return ResponseUtils.sendList(results, amounts);
	}
	
	/**
	 * 统计告警信息数据
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/countControlAlarm")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'统计告警信息'",content="'时间范围:' + getWebParamInfo().get('startTime') + '到' + getWebParamInfo().get('endTime')",needPersist= true,operation="EXPORT")
	public Object countControlAlarmInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> counts = controlAlarmService.countControlAlarmDatas(searchParam);
		int amounts = StringUtil.toInt(counts.get(0).get("COUNTS"));
		this.jsonResult.setData(amounts);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	/**
	 * 统计告警信息数据
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/statisticsAlarmByReport")
	@ResponseBody
	public Object StatisticsAlarmByReport(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request); 
		String startTime=searchParam.get("startTime");
		String endTime=searchParam.get("endTime");
		String reportType=searchParam.get("reportType");
		if(reportType !=null){
			if(reportType.equals("0")){
				startTime=startTime+" 00:00:00";
				endTime=endTime+" 23:59:59";
			}
			if(reportType.equals("1")){
				startTime=startTime+" 00:00:00";
				endTime=endTime+" 23:59:59";
			}
			if(reportType.equals("2")){
			    try {
			    	startTime=startTime+"-01 00:00:00";
					Calendar calendar = new GregorianCalendar();  
				    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM", Locale.ENGLISH); 
					calendar.setTime(sdf.parse(endTime));
					 /** 开始用的这个方法获取实际月的最大天数* */  
				    int num = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);  
				    endTime=endTime+"-"+num+" 23:59:59";
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			   
			}
			searchParam.put("startTime", startTime);
			searchParam.put("endTime", endTime);
		}
		List<Map<String, Object>> datasList = controlAlarmService.getAlarmDatasByGroup(searchParam);
		this.jsonResult.setData(datasList);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	/**
	 * 统计布控告警信息数据
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/countControl")
	@ResponseBody
	public Object CountControl(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		Date endTime=new Date();
		searchParam.put("blken", dateFormat.format(endTime));
		searchParam.put("bkkssj", dateFormat.format(endTime));
		List<Map<String, Object>> datasList = controlAlarmService.getValidControlByGroup(searchParam);
		this.jsonResult.setData(datasList);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 查询告警信息数据的详细信息
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/alarmControlDetail")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'查询告警信息'",content="'时间范围:' + getWebParamInfo().get('startdate') + '到' + getWebParamInfo().get('enddate')",needPersist= true,operation="EXPORT")
	public Object alarmControlDetailInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = controlAlarmService.alarmControlDetail(searchParam);
		this.jsonResult.setData(results);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 报警查询导出功能
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/exportControlAlarm")
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'报警查询导出'",content="'时间范围:' + getWebParamInfo().get('startdate') + '到' + getWebParamInfo().get('enddate') + ',告警编号:' + getWebParamInfo().get('widths')",needPersist= true,operation="EXPORT")
	public String exportControlAlarmInfos(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		//在共用的基础上增加私有的信息
        request.setAttribute(ExcelExportServiceImpl.EXCEL_PROCESSOR,"businessExportService");
        request.setAttribute(ExcelExportServiceImpl.EXCEL_FILENAME,"报警查询信息");
        //定义导出的字段名称
        String[] texts = new String[] {"车牌号码","车牌颜色","车尾号牌号码","车尾号牌颜色","车牌一致","通过时间","卡点方向",
                "车辆类型","速度","告警地点","告警类型","处理状态", "签收标记"};
        //设定Excel单元格宽度
        int[] widths = new int[] {10, 10, 15, 15, 10, 30, 10, 10, 10, 30, 10, 10, 10};
        String idstr = searchParam.get("idstr");
        if (StringUtil.isNotBlank(idstr)) {
            String partIds[] = idstr.split(",");
            List<Map<String, String>> exportData = this.exportControlAlarmById(partIds);
            /* 输出成为Excel */
            this.setExcelFileName(URLEncoder.encode("报警查询信息", "UTF-8"));
            File file = File.createTempFile("alarm" + new Date().getTime() + "_", "tmp");
            response.setContentType("application/vnd.ms-excel");      
            response.setHeader("content-disposition", "attachment;filename=" + excelFileName + ".xls");    
            response.setBufferSize(2048);
            OutputStream stream = response.getOutputStream();
            Object[] dataSource = businessExportService.exportAlarmDataSource(exportData);
            this.businessExportService.outputToExcel(exportData, stream, texts, widths, dataSource);
            this.inputStream = new FileInputStream(file);
            return "";
        } else {
        	String exportQuerySql = controlAlarmService.exportQuerySql(searchParam);
        	request.setAttribute(ExcelExportServiceImpl.EXCEL_SQL, exportQuerySql);
        	request.setAttribute(ExcelExportServiceImpl.EXCEL_EXPORTTYPE, searchParam.get("exportType"));
        	request.setAttribute(ExcelExportServiceImpl.TITLE_TEXTS,texts);
        	request.setAttribute(ExcelExportServiceImpl.TITLE_WITHS,widths);
        	request.setAttribute(ExcelExportServiceImpl.EXPORT_FLAG,"alarm");
        	return "forward:/excelExport/export.mvc";
        }
    }
	
	/**
	 * 分页告警信息数据
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/firstPageAlarm")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'查询告警信息'",content="'时间范围:' + getWebParamInfo().get('startTime') + '到' + getWebParamInfo().get('endTime') + ',查询车牌:' + getWebParamInfo().get('carBNum')",needPersist= true,operation="SEARCH")
	public Object firstPageAlarmInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request); 
		String carFNum = searchParam.get("carNum").substring(0, 1);
		String carBNum = searchParam.get("carNum").substring(1, searchParam.get("carNum").length());
		searchParam.put("carFNum", carFNum);
		searchParam.put("carBNum", carBNum);
		List<Map<String, String>> datas = systemConfigService.loadAlarmSettingInfo();
		String alarmDays = "0";
		for (Map<String, String> data : datas) {
			if (StringUtil.equals(data.get("CODE"), "first_page_alarm_days")) {
				alarmDays = data.get("VALUE");
				break;
			}
		}
		Calendar cal = Calendar.getInstance();
		Date endDate = cal.getTime();
		cal.add(Calendar.DATE, -1);
		Date beginDate = cal.getTime();
		String beginTime = DateUtil.parseToString(beginDate, "yyyy-MM-dd") + " 00:00:00";
		String endTime = DateUtil.parseToString(endDate, "yyyy-MM-dd") + " 23:59:59";
		searchParam.put("startTime", beginTime);
		searchParam.put("endTime", endTime);
		List<Map<String, String>> results = controlAlarmService.firstPageAlarmInfo(searchParam);
		return ResponseUtils.sendList(results, 1000);
	}
	
	/**
	 * 获取导出数据
	 * @param partIds
	 * @return
	 */
	public List<Map<String, String>> exportControlAlarmById(String[] partIds) {
		List<Map<String, String>> exportResults = controlAlarmService.exportControlAlarmById(partIds);
		return exportResults;
	}
	
	 /**
     * 通过用户勾选图片的ID，获取图片URL
     * @author jzxie
     * @date 2014-10-28 9:35am
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/loadImgUrlByIds")
	@ResponseBody
    public Object loadImgUrlByIds(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		
		//这是获取session
	    request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		Map<String, Object> userMap = (Map<String, Object>)(request.getSession().getAttribute(AbstractController.SESSION_USER));
		String userCode = userMap.get("USER_CODE").toString();//USER_NAME=超级管理员
		//生成UUID
		String uuid = UUID.randomUUID().toString();
		String uidSub =  uuid.substring(0,8)+uuid.substring(9,13)+uuid.substring(14,18)+uuid.substring(19,23)+uuid.substring(24); 
		//生成时间和格式化时间
		SimpleDateFormat time=new SimpleDateFormat("yyyyMMddHHmmss");
		String date =time.format(new Date()); 
		
		//获取tomcat的根目录webapp目录
		String downLoadUrl = this.getClass().getClassLoader().getResource("").getPath();
		//保存文件夹的拼接和创建
		String saveZipUrl = new File(downLoadUrl).getParentFile().getParentFile().getParentFile()+File.separator+userCode+File.separator+uidSub;
		
		searchParam.put("SEARCH", "BY_ID");
        List<Map<String, String>> urlList=this.controlAlarmService.loadImgUrlByIds(searchParam);
        List<String> imageUrls = new ArrayList<String>();
        List<String> carNumber = new ArrayList<String>();
        if (urlList != null && urlList.size() > 0) {
        	for (Map<String, String> urlMap : urlList) {
        		imageUrls.add(urlMap.get("BJXXBH")+"|"+urlMap.get("TXMC1"));
        		carNumber.add(urlMap.get("HPHM"));
        	}
        	String httpUrl = null;
        	String saveUrl =null;
        	File file= new File(saveZipUrl);
        	if(!file.exists()){
        		file.mkdirs();
        	}
        	//压缩保存的路径
        	ZipOutputStream out = new ZipOutputStream(new FileOutputStream(saveZipUrl+File.separator+date+".zip"));
        	InputStream in = null;
        	CompressHelper helperZip = new CompressHelper();
        	for(int i= 0;i<imageUrls.size();i++){
        		httpUrl = imageUrls.get(i).substring(imageUrls.get(i).lastIndexOf("|")+1);
        		//httpUrl="http://172.31.108.182:8080/a/应用.jpg";
        		if(httpUrl.lastIndexOf(".jpg")==-1 && httpUrl.lastIndexOf(".JPG")==-1){
        			httpUrl=httpUrl+".jpg";
        		}
        		saveUrl = imageUrls.get(i).substring(0,imageUrls.get(i).lastIndexOf("|"))+"-"+carNumber.get(i)+httpUrl.substring(httpUrl.lastIndexOf("."));
        		 String fileName =httpUrl.substring(httpUrl.lastIndexOf("/")+1,httpUrl.lastIndexOf("."));
        		 String headUrl=httpUrl.substring(0,httpUrl.lastIndexOf("/")+1);
        		 String newUrl=headUrl+java.net.URLEncoder.encode(fileName,"utf-8")+".jpg";
        		HttpURLConnection conn= (HttpURLConnection) new URL(newUrl).openConnection();
				int state = conn.getResponseCode();
				if(state !=404){
	        		in = conn.getInputStream();
	        	   
	        		helperZip.zip(out, in,"Image/", saveUrl);
	                out.flush();
				}
        	}
        	in.close();
            out.close();
        }
            String fanwenUrl = "http://"+request.getLocalAddr()+":"+request.getLocalPort()+"/"+userCode+File.separator+uidSub+File.separator+date+".zip";
            return fanwenUrl;
	}
	
	 /**
     * 通过查询条件获取图片URL
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/loadImgUrlByCondition")
	@ResponseBody
	public Object loadImgUrlByCondition(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception{
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		searchParam.put("SEARCH", "BY_CONDITION");
		List<Map<String, String>> urlList=this.controlAlarmService.loadImgUrlByIds(searchParam);
		List<String> imageUrls = new ArrayList<String>();
        if (urlList != null && urlList.size() > 0) {
        	for (Map<String, String> urlMap : urlList) {
        		imageUrls.add(urlMap.get("TXMC1"));
        	}
        }
        this.jsonResult.setData(imageUrls);
        this.jsonResult.setNeedAlert(true);
        return jsonResult;
      
    }
	 
	/**
	 * @return the inputStream
	 */
	public InputStream getInputStream() {
		return inputStream;
	}

	/**
	 * @paramam inputStream the inputStream to set
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
