package com.jp.tic.business.analyStopCar.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.analyze.entity.PageEntity;
import com.jp.tic.business.analyStopCar.service.AnalyStopCarService;
import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.service.BusinessExportService;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.exception.ExportFailedException;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/analyStopCar")
public class AnalyStopCarController extends AbstractController{
	
	public final SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	@Autowired
	AnalyStopCarService analyStopCarService;
	@Autowired
	private BusinessExportService businessExportService;
	
	//private InputStream inputStream; // 文件流
	
	@RequestMapping("/doAnalyStopCar")
	@ResponseBody
	public Object doAnalyStopCar(Model model, HttpServletRequest request) throws ParseException{
		
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		//调业务逻辑处理
		Map<String,Object> result=analyStopCarService.AnalyStopCarQuery(searchParam);
		List<Map<String, String>> resultData=(List<Map<String, String>>) result.get("dataList");
		int total=StringUtil.toInt(result.get("total"));
		
		return ResponseUtils.sendList(resultData, total);
	}
	@RequestMapping("/doExportStopCar")
	@ResponseBody
	public Object doExportStopCar(Model model, HttpServletRequest request, HttpServletResponse response) throws ParseException{
		
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		//调业务逻辑处理
		Map<String,Object> result=analyStopCarService.ExportStopCar(searchParam);
		List<Map<String, String>> resultData=(List<Map<String, String>>) result.get("dataList");
		Object[] dataSource = businessExportService.exportAnalyStopCarSource(resultData);
		//excel文档名称
		String excelFileName="落脚点分析";
		
		//定义导出的字段名称
        String[] texts = new String[] {"卡口名称","出行次数","落脚次数"};
        //设定Excel单元格宽度
        int[] widths = new int[] {30, 10, 10};
		// File file;
		try {
			excelFileName = new String(excelFileName.getBytes("GBK"), "ISO8859_1");
			//file = File.createTempFile("history" + new Date().getTime() + "_", "tmp");
			 response.setContentType("application/vnd.ms-excel");      
	        String curentTime = DateUtil.getCurrentDateTime();
	        response.setHeader("content-disposition", "attachment;filename=" + excelFileName + curentTime + ".xls");    
	        response.setBufferSize(4096);
	        OutputStream stream = response.getOutputStream();
		
			this.businessExportService.outputToExcel(resultData, stream, texts, widths, dataSource);	
			//this.inputStream = new FileInputStream(file);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}catch (ExportFailedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	       
		
		return "";
	}
	
	@RequestMapping("/getCarList")
	@ResponseBody
	public Object getCarList(Model model, HttpServletRequest request) throws ParseException{
		
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		//调业务逻辑处理
		Map<String,Object> result=analyStopCarService.getCarList(searchParam);
		List<Map<String, String>> resultData=(List<Map<String, String>>) result.get("dataList");
		int total=StringUtil.toInt(result.get("total"));
		
		return ResponseUtils.sendList(resultData, total);
	}
}
