package com.jp.tic.business.cartake.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.analyze.entity.PageEntity;
import com.jp.tic.analyze.service.CarTakeService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.core.annotation.Log;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.service.BusinessExportService;
import com.jp.tic.system.service.SystemConfigService;
import com.jp.tic.system.service.impl.ExcelExportServiceImpl;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.carinfo.CarInfoUtils;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;
import com.opensymphony.oscache.general.GeneralCacheAdministrator;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/fullTextSearch")
public class FullTextSearchController extends AbstractController {
	
	public final SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	private static GeneralCacheAdministrator admin = new GeneralCacheAdministrator();

	@Autowired
	private CarTakeService takeService;
	
	@Autowired
	private BusinessExportService businessExportService;
	
	@Autowired
	private SystemConfigService systemConfigService;
	
	private InputStream inputStream; // 文件流
	
	private String excelFileName; //Excel导出文件名
	
	public String lastPage = "data";
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/fullTextSearchPage")
	public String fullTextSearchPageLoad() {
		return "/search/full-text-search";
	}
	
	/**
	 * 全文检索根据卡口查询一天以内的过车记录
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/searCarData")
	@ResponseBody
	public Object historyCarQueryData(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		PageEntity page = this.searCarDataInfo(searchParam);
		int counts = 0;
		if (page.getResult().size() < StringUtil.toInt(searchParam.get("page.limit"))) {
			counts = 0;
		} else {
			counts = (StringUtil.toInt(searchParam.get("page.start")) + 1) * StringUtil.toInt(searchParam.get("page.limit")) + 1;
		}
		if (page != null) {
			if (page.getResult() != null && page.getResult().size() > 0) {
				for (int i = 0; i < page.getResult().size(); i++) {
					page.getResult().get(i).setTxsl(Long.parseLong(searchParam.get("page.start"))); //用图像数量来替换分页开始位置
					page.getResult().get(i).setSsdq(lastPage); //用所属地区代替是否翻到了最后一页的标志
				}
			}
		}
		return ResponseUtils.sendList(page.getResult(), counts);
	}
	
	/**
	 * 数据处理
	 * @param searchParam 查询参数
	 * @return 返回结果
	 * @throws Exception 异常
	 */
	private PageEntity searCarDataInfo(Map<String, String> searchParam) throws Exception {
		PageEntity page = new PageEntity();
		Map<String, Object> dataMap= new HashMap<String, Object>();
		int pageNo = (StringUtil.toInt(searchParam.get("page.start")) / StringUtil.toInt(searchParam.get("page.limit"))) + 1;
		page.setPageNo(pageNo);
		page.setPageSize( StringUtil.toInt(searchParam.get("page.limit")));
		Date endDate = new Date();
		String endDateStr = DateUtil.parseToString(endDate, "yyyy-MM-dd HH:mm:ss");
		//默认查询30分钟以内的数据
		Date startTime = this.getTime(-1);
		String startDateStr = DateUtil.parseToString(startTime, "yyyy-MM-dd HH:mm:ss");
		String startTimeStr = startDateStr.split(" ")[0] + " " + endDateStr.split(" ")[1];
		Date startDate = DateUtil.parseToDate(startTimeStr, "yyyy-MM-dd HH:mm:ss");
		List<String> mountList = new ArrayList<String>();
		List<String> directionList = new ArrayList<String>();
		directionList.add(searchParam.get("mounts"));
		
		List<String> platesList = new ArrayList<String>();
		List<String> kyeStrs = null;
		String hpys = searchParam.get("carNumColor");
		lastPage = "data";
		if (StringUtil.equals(searchParam.get("page.start"), "0")) {
			//page = takeService.queryCarTake(startDate, endDate, mountList, platesList, page);
			if (directionList.size() > 0 && mountList.size() >= 0) {
				page = takeService.queryCarTake(startDate, endDate, null, platesList, directionList, hpys,null,null,null, page);
			} else if (mountList.size() > 0 && directionList.size() == 0) {
				page = takeService.queryCarTake(startDate, endDate, mountList, platesList, null, hpys,null,null,null, page);
			} else {
				page = takeService.queryCarTake(startDate, endDate, mountList, platesList, directionList, hpys,null,null,null, page);
			}
			
			dataMap.put("startKeys", page.getPageStartKeys());
			if (!StringUtil.equals(searchParam.get("exportFlag"), "export")) {
				admin.putInCache("FULLS", dataMap);
			}
		} else {
			try {
				kyeStrs = (List<String>)(((Map<String, Object> )admin.getFromCache("FULLS", 3600)).get("startKeys"));
				int preSize = kyeStrs.size();
				page.setPageStartKeys(kyeStrs);
				page.goNext();
				page.goLast();
				if (directionList.size() > 0 && mountList.size() >= 0) {
					page = takeService.queryCarTake(startDate, endDate, null, platesList, directionList, hpys,null,null,null, page);
				} else if (mountList.size() > 0 && directionList.size() == 0) {
					page = takeService.queryCarTake(startDate, endDate, mountList, platesList, null, hpys,null,null,null, page);
				} else {
					page = takeService.queryCarTake(startDate, endDate, mountList, platesList, directionList, hpys,null,null,null, page);
				}
				int nowSize = page.getPageStartKeys().size();
				if (preSize == nowSize) {
					lastPage = "last";
				}
				dataMap.put("startKeys", page.getPageStartKeys());
				admin.putInCache("FULLS", dataMap);
			}catch (Exception e) {
				int preSize = kyeStrs.size();
				if (directionList.size() > 0 && mountList.size() >= 0) {
					page = takeService.queryCarTake(startDate, endDate, null, platesList, directionList, hpys,null,null,null, page);
				} else if (mountList.size() > 0 && directionList.size() == 0) {
					page = takeService.queryCarTake(startDate, endDate, mountList, platesList, null, hpys,null,null,null, page);
				} else {
					page = takeService.queryCarTake(startDate, endDate, mountList, platesList, directionList, hpys,null,null,null, page);
				}
				int nowSize = page.getPageStartKeys().size();
				if (preSize == nowSize) {
					lastPage = "last";
				}
				dataMap.put("startKeys", page.getPageStartKeys());
				admin.putInCache("FULLS", dataMap);
			}
		}
		return page;
	}
	
	/**
	 * 时间处理
	 * @param datas
	 * @return
	 */
	public Date getTime(int datas) {
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
	 * 车库查询,首页全文检索查询
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/carSource")
	@ResponseBody
	public Object carSourceInfo(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		
		Map<String, String> conditions = new HashMap<String, String>();
		if (StringUtil.checkStr(searchParam.get("carNum"))) {
			conditions.put("HPHM", searchParam.get("carNum"));
		}
		if (StringUtil.checkStr(searchParam.get("CLPP1"))) {
			conditions.put("CLPP1", searchParam.get("CLPP1"));
		}
		if (StringUtil.checkStr(searchParam.get("SFZH"))) {
			conditions.put("SFZH", searchParam.get("SFZH"));
		}
		if (StringUtil.checkStr(searchParam.get("JDCSYR"))) {
			conditions.put("JDCSYR", searchParam.get("JDCSYR"));
		}
		if (StringUtil.checkStr(searchParam.get("HPZL")) && !StringUtil.equals(searchParam.get("HPZL"), "-1")) {
			conditions.put("HPZL", searchParam.get("HPZL"));
		}
		if (StringUtil.checkStr(searchParam.get("CLSBDH"))) {
			conditions.put("CLSBDH", searchParam.get("CLSBDH"));
		}
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		String xml = CarInfoUtils.QueryCarInfoByHPHM(conditions);
		if (StringUtil.checkStr(xml)) {
			Document doc = DocumentHelper.parseText(xml);  
			Element root = doc.getRootElement();
			Element Value = root.element("Method").element("Items").element("Item").element("Value");  
			List<Element> Rows = Value.elements("Row");  
			List<Element> Datas = null;  
	        Map<String, String> dataMap= null;
	        for (int i = 2; i < Rows.size(); i++) {
	        	Datas = Rows.get(i).elements("Data");  
	        	dataMap = new HashMap<String, String>();
	        	for (int j = 0; j < Datas.size(); j++) {
	        		if (j == 4) {
	        			dataMap.put("SFZH", Datas.get(j).getText());
	        		}
	        		if (j == 7) {
	        			dataMap.put("LXFS", Datas.get(j).getText());
	        		}
	        		if (j == 9) {
	        			dataMap.put("JDCSYR", Datas.get(j).getText());
	        		}
	        		if (j == 10) {
	        			dataMap.put("HPZL", Datas.get(j).getText());
	        		}
	        		if (j == 11) {
	        			dataMap.put("HPHM", Datas.get(j).getText());
	        		}
	        		if (j == 18) {
	        			dataMap.put("DJZZXZ", Datas.get(j).getText());
	        		}
	        		if (j == 19) {
	        			dataMap.put("CSYS", Datas.get(j).getText());
	        		}
	        		if (j == 20) {
	        			dataMap.put("CLXH", Datas.get(j).getText());
	        		}
	        		if (j == 21) {
	        			dataMap.put("CLSBDH", Datas.get(j).getText());
	        		}
	        		if (j == 22) {
	        			dataMap.put("CLPP1", Datas.get(j).getText());
	        			break;
	        		}
	        	}
	        	results.add(dataMap);
	        }
		}
		this.jsonResult.setData(results);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 查询时间范围
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/timeRange")
	@ResponseBody
	public Object timeRangeInfo(Model model, HttpServletRequest request) throws Exception {
		List<Map<String, String>> configs = systemConfigService.findConfigByCode("first_page_car_days");
		Map<String, String> resultMap = RequestUtil.getMapByRequest(request);  
		if (configs != null && configs.size() > 0) {
			String days = configs.get(0).get("VALUE");
			Calendar calendar = Calendar.getInstance();
			Date nowTime = calendar.getTime();
			String nowTimeStr = DateUtil.parseToString(nowTime, "yyyy-MM-dd HH:mm:ss");
			calendar.add(Calendar.DATE, -StringUtil.toInt(days));
			Date startTime = calendar.getTime();
			String startTimeStr = DateUtil.parseToString(startTime, "yyyy-MM-dd HH:mm:ss");
			String timeDsc = startTimeStr + " 至 " + nowTimeStr;
			resultMap.put("timeDsc", timeDsc);
		}
		this.jsonResult.setData(resultMap);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 全文检索过车数据导出功能
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/exportCarData")
	public void exportCarDataInfos(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		//在共用的基础上增加私有的信息
        request.setAttribute(ExcelExportServiceImpl.EXCEL_PROCESSOR,"businessExportService");
        request.setAttribute(ExcelExportServiceImpl.EXCEL_FILENAME,"过车信息");
        //定义导出的字段名称
        String[] texts = new String[] {"车牌号码","车牌颜色","车辆速度","卡口名称","单位名称","经过时间","图像"};
        //设定Excel单元格宽度
        int[] widths = new int[] {10, 10, 15, 30, 30, 30, 100};
        String idstr = searchParam.get("idstr");
        List<Map<String, String>> exportData = null;
        searchParam.put("page.start", searchParam.get("start"));
        searchParam.put("page.limit", searchParam.get("limit"));
        if (StringUtil.isNotBlank(idstr)) {
        	 String partIds[] = idstr.split(",");
        	 String mounts[] = searchParam.get("carNumStr").split(",");
        	 List<String> list = new ArrayList<String>();
        	 for (int  i = 0; i < mounts.length; i++) {
        		 if (!list.contains(mounts[i])) {
        			 list.add(mounts[i]);
        		 }
        	 }
        	 String mountStr = "";
        	 for (int j = 0; j < list.size(); j++) {
        		 if (mountStr != "") {
        			 mountStr += ",";
        		 }
        		 mountStr += list.get(j);
        	 }
        	 searchParam.put("mounts", mountStr);
             exportData = this.exportCarDataByXxbh(searchParam, partIds);
        } else {
        	exportData = this.exportCarDataByXxbh(searchParam, null);
        }
        /* 输出成为Excel */
        this.setExcelFileName(URLEncoder.encode("过车信息", "UTF-8"));
        File file = File.createTempFile("history" + new Date().getTime() + "_", "tmp");
        response.setContentType("application/vnd.ms-excel");      
        response.setHeader("content-disposition", "attachment;filename=" + excelFileName + ".xls");    
        response.setBufferSize(4096);
        OutputStream stream = response.getOutputStream();
        Object[] dataSource = businessExportService.exportHistoryDataSource(exportData);
        this.businessExportService.outputToExcel(exportData, stream, texts, widths, dataSource);
        this.inputStream = new FileInputStream(file);
	}
	
	/**
	 * 通过信息编号获取导出的数据
	 * @param searchParam 查询条件
	 * @param partIds 信息编号
	 * @return 处理结果
	 */
	public List<Map<String, String>> exportCarDataByXxbh(Map<String, String> searchParam, String[] partIds) throws Exception {
		List<Map<String, String>> datas = new ArrayList<Map<String,String>>();
		searchParam.put("exportFlag", "export");
		List<CarTake> newResult = this.searCarDataInfo(searchParam).getResult();
		Map<String, String> dataMap = null;
		//String clsd = "0";
		if (newResult != null && newResult.size() > 0) {
			for (CarTake carTake : newResult) {
				if (partIds != null) {
					for (int i = 0; i < partIds.length; i++) {
						if (StringUtil.equals(carTake.getXxbh(), partIds[i])) {
							dataMap = new HashMap<String, String>();
							dataMap.put("HPHM", carTake.getHphm());
							dataMap.put("HPYSMC", carTake.getHpysmc());
							dataMap.put("CLSD", StringUtil.toString(carTake.getClsd()));
							dataMap.put("KKMC", carTake.getKkmc());
							dataMap.put("DWMC", carTake.getDwmc());
							dataMap.put("JGSJ", DateUtil.parseToString(carTake.getJgsj(), "yyyy-MM-dd HH:mm:ss"));
							dataMap.put("tx1", carTake.getTx1());
							datas.add(dataMap);
							break;
						}
					}
				} else {
					dataMap = new HashMap<String, String>();
					dataMap.put("HPHM", carTake.getHphm());
					dataMap.put("HPYSMC", carTake.getHpysmc());
					dataMap.put("CLSD", StringUtil.toString(carTake.getClsd()));
					dataMap.put("KKMC", carTake.getKkmc());
					dataMap.put("DWMC", carTake.getDwmc());
					dataMap.put("JGSJ", DateUtil.parseToString(carTake.getJgsj(), "yyyy-MM-dd HH:mm:ss"));
					dataMap.put("tx1", carTake.getTx1());
					datas.add(dataMap);
				}
			}
		}
		return datas;
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
