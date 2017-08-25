package com.jp.tic.system.controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSON;
import com.jp.tic.app.carSearch.service.CarTypeSearchService;
import com.jp.tic.business.alarm.service.ControlAlarmService;
import com.jp.tic.business.compareByTime.service.CompareByTimeService;
import com.jp.tic.business.oneCarManyNum.service.OneCarManyNumService;
import com.jp.tic.business.user.service.UserService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.service.ExcelExportService;
import com.jp.tic.system.service.impl.ExcelExportServiceImpl;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/excelExport")
@Scope("prototype")
public class ExcelExportController extends AbstractController {
	
	@Autowired
    private ExcelExportService service;
	
	@Autowired
	UserService userService;
	
	@Autowired
	ControlAlarmService controlAlarmService;
	
	@Autowired
	private CarTypeSearchService carTypeSearchService;
	
	@Autowired
	private CompareByTimeService compareByTimeService;
	
	@Autowired
	private OneCarManyNumService oneCarManyNumService;
	/**
     * 导出流
     */
    private InputStream inputStream;
    
	/**
     * 导出文件名
     */
    private String fileName;
    
    private String exportType;
    
    public String processorName_p;
    
    public Map<String, String> param_p;
    
    public String oriFileName_p;
    
    public Map<String, Object> userMap_p;
    
    public HttpSession session_p;
    
    public String[] texts_p;
    
    public int[] widths_p;
	
	/**
     * 根据request中的参数导出文件
     * @return
     * @throws IOException
     */
	@RequestMapping("/export")
    public void export(Model model, HttpServletRequest request, HttpServletResponse response) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		String jsonParam = JSON.toJSONString(searchParam);
        try{
            String processorName = (String)request.getAttribute(ExcelExportServiceImpl.EXCEL_PROCESSOR);
//            String sql = (String)request.getAttribute(ExcelExportServiceImpl.EXCEL_SQL);
            String oriFileName = (String)request.getAttribute(ExcelExportServiceImpl.EXCEL_FILENAME);
            String exportFlag = (String)request.getAttribute(ExcelExportServiceImpl.EXPORT_FLAG);
            String[] texts = (String[])request.getAttribute(ExcelExportServiceImpl.TITLE_TEXTS);
            int[] widths = (int[])request.getAttribute(ExcelExportServiceImpl.TITLE_WITHS);
            Map<String, String> param = (Map<String, String>)request.getAttribute(ExcelExportServiceImpl.CONDITION_PARAM);
            exportType = (String)request.getAttribute(ExcelExportServiceImpl.EXCEL_EXPORTTYPE);
            fileName =  java.net.URLEncoder.encode(oriFileName, "UTF-8");
            boolean isAsync = "async".equals(exportType)?true:false;
            Map<String, Object> userMap = userService.getCurrentUser(request);
            if (isAsync) {
                Map result = new HashMap();
                {
                	this.processorName_p = processorName;
                	this.param_p = param;
                	this.oriFileName_p = oriFileName;
                	this.userMap_p = userMap;
                	this.texts_p = texts;
                	this.widths_p = widths;
                	this.session_p = request.getSession();
        			new Thread(){
        				 public void run(){
        					 try {
        						 service.doExportAsyncSQL(processorName_p, param_p, oriFileName_p, 
        								 userMap_p, session_p, texts_p, widths_p);
        					 } catch (Exception e) {
        						e.printStackTrace();
        					 }
        				 }
        				}.start();
                    result.put("result", "success");
                    result.put("msg", "后台导出已启动，请到下载中心查看进度！");
                }
                this.jsonResult.setData(result);
                this.jsonResult.setNeedAlert(false); 
            } else {
            	File file = File.createTempFile(UUID.randomUUID().toString().replace("-", ""), ".tmp");
                response.setContentType("application/vnd.ms-excel");      
                response.setHeader("content-disposition", "attachment;filename=ExportDatas_"+DateUtil.getCurrentDateTime()+".xls");    
                response.setBufferSize(4096);
                OutputStream stream = response.getOutputStream();
                Map<String,Object> map=new HashMap<String, Object>();
                /*按模块导出功能标示*/
                String modelExportType=searchParam.get("modelExportType");
    	    	if(StringUtil.checkStr(modelExportType)&&"compareByTime".equalsIgnoreCase(modelExportType)){
    	    		map=compareByTimeService.compareByTimeQueryForpages(jsonParam);
    	    	}else if(StringUtil.checkStr(modelExportType)&&"oneCarManyNum".equalsIgnoreCase(modelExportType)){
    	    		map=oneCarManyNumService.queryOneCarManyNumForPages(jsonParam);
    	    	}else{
    	    		map = carTypeSearchService.dealWithCarTypeData(jsonParam);
    	    	}
                List<CarTake> datas=(List<CarTake>) map.get("rows");
                if(datas !=null && datas.size()>0){
                	service.doExportSyncSQL(processorName, stream, texts, widths, datas, exportFlag);
                	this.inputStream = FileUtils.openInputStream(file);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            Map result = new HashMap();
            result.put("result", "fail");
            result.put("msg", e.getMessage());
            this.jsonResult.setData(result);
        }
    }

	/**
	 * @return the fileName
	 */
	public String getFileName() {
		return fileName;
	}

	/**
	 * @param fileName the fileName to set
	 */
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	/**
	 * @return the exportType
	 */
	public String getExportType() {
		return exportType;
	}

	/**
	 * @param exportType the exportType to set
	 */
	public void setExportType(String exportType) {
		this.exportType = exportType;
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
	
	
}
