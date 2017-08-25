package com.jp.tic.business.firstTimeInCity.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.business.cartake.entity.CarTakeSolr;
import com.jp.tic.business.firstTimeInCity.service.FirstTimeInCityService;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.service.BusinessExportService;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.exception.ExportFailedException;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/firstTimeInCity")
public class FirstTimeInCityController {
	
	public final SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	@Autowired	
	FirstTimeInCityService firstTimeInCityService;
	@Autowired
	private BusinessExportService businessExportService;
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/firstTimeInCityPage")
	public String firstTimeInCityPageLoad() {
		return "/analyze/car-firstTimeIncity";
	}
	/**
	 * 加载结果展现页面
	 * @return 页面映射
	 */
	@RequestMapping("/firstTimeInCityResult")
	public String firstTimeInCityResultLoad() {
		return "/analyze/car-firstTimeIncityResult";
	}
	/**
	 * 响应页面查询请求
	 * @param model
	 * @param request
	 * @return
	 * @throws ParseException
	 */
	@RequestMapping("/doQueryFirstIncityCar")
	@ResponseBody
	public Object doQueryFirstIncityCar(Model model, HttpServletRequest request) throws ParseException{
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		
		Map<String,Object> result=firstTimeInCityService.QueryFirstIncityCar(searchParam);
		List<CarTake> resultData=(List<CarTake>) result.get("dataList");
		int total=StringUtil.toInt(result.get("total"));
		
		return ResponseUtils.sendList(resultData, total);
	}
	@RequestMapping("/doExportCarList")
	@ResponseBody
	public Object doExportCarList(Model model, HttpServletRequest request, HttpServletResponse response) throws ParseException{
		
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		
		Object[] dataSource = firstTimeInCityService.ExportCarList(searchParam);
		//excel文档名称
		String excelFileName="初次入城";
		
		//定义导出的字段名称
        String[] texts = new String[] {"车牌号","初次入城时间","最新地点","品牌/型号/年款","颜色"};
        //设定Excel单元格宽度
        int[] widths = new int[] {20, 30, 40, 30, 10};
		try {
			excelFileName = new String(excelFileName.getBytes("GBK"), "ISO8859_1");
			 response.setContentType("application/vnd.ms-excel");      
	        String curentTime = DateUtil.getCurrentDateTime();
	        response.setHeader("content-disposition", "attachment;filename=" + excelFileName + curentTime + ".xls");    
	        response.setBufferSize(4096);
	        OutputStream stream = response.getOutputStream();
	        List resultData=new ArrayList(dataSource.length);
	        Collections.addAll(resultData, dataSource);
			this.businessExportService.outputToExcel(resultData, stream, texts, widths, dataSource);	
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}catch (ExportFailedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	       
		
		return "";
	}

}
