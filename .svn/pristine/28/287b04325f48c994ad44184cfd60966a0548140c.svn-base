package com.jp.tic.business.alarm.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.URLEncoder;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.jp.tic.business.alarm.service.ControlManagerService;
import com.jp.tic.business.cartake.service.HotRecodeService;
import com.jp.tic.business.user.service.UserService;
import com.jp.tic.common.util.DataUtils;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.core.annotation.Log;
import com.jp.tic.system.service.BusinessExportService;
import com.jp.tic.system.service.OrganizationService;
import com.jp.tic.system.service.impl.ExcelExportServiceImpl;
import com.jp.tic.utils.BaseException;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.exception.ExportFailedException;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/controlManager")
public class ControlManagerController extends AbstractController {
	
	@Autowired
	ControlManagerService controlManagerService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	OrganizationService organizationService;
	
	@Autowired
	BusinessExportService businessExportService;
	
	@Autowired
	HotRecodeService hotService;
	
	private InputStream inputStream; // 文件流
	
	private String excelFileName; //Excel导出文件名

	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/blackListPage")
	public String blackListLoad() {
		return "/control/black-list-manager";
	}

	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/controlManagerPage")
	public String controlAlarmLoad() {
		return "/control/control-manager";
	}
	/**
	 * 加载车牌精确布控页面
	 * @return 页面映射
	 */
	@RequestMapping("/exactControlManagerPage")
	public String exactControlLoad() {
		return "/control/exactControl-manager";
	}
	/**
	 * 加载车牌模糊布控页面
	 * @return 页面映射
	 */
	@RequestMapping("/matchControlManagerPage")
	public String matchControlLoad() {
		return "/control/matchControl-manager";
	}
	/**
	 * 加载车辆品牌布控页面
	 * @return 页面映射
	 */
	@RequestMapping("/brandControlManagerPage")
	public String brandControlLoad() {
		return "/control/brandControl-manager";
	}
	/**
	 * 加载车辆类别布控面
	 * @return 页面映射
	 */
	@RequestMapping("/categoryControlManagerPage")
	public String categoryControlLoad() {
		return "/control/categoryControl-manager";
	}
    /**
     *加载我的工作台的布控代办页面
     * @return
     */
	@RequestMapping("/myworkControlManagerPage")
	public String myControlManageLoad(){
		return "/control/mywork-control-manager";
		
	}
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/controlVerifyPage")
	public String controlVerifyLoad() {
		return "/control/control-verify";
	}
	/**
	 * 加载我的工作台查询页面(布控审核)
	 * @return页面映射
	 */
	@RequestMapping("/myworkControlVerifyPage")
	public String myworkControlVerifyLoad(){
		return "/control/mywork-control-verify";
	}
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/controlRevokePage")
	public String controlRevokeLoad() {
		return "/control/control-revoke";
	}
	/**
	 * 加载我的工作台查询页面(布控撤销)
	 * @return页面映射
	 */
	@RequestMapping("/myworkControlRevokePage")
	public String myworkControlRevokeLoad(){
		return "/control/mywork-control-revoke";
	}
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/controlRevokeVerifyPage")
	public String controlRevokeVerifyLoad() {
		return "/control/control-revoke-verify";
	}
	
	/**
	 * 加载我的工作台查询页面(撤控审核)
	 * @return 页面映射
	 */
	@RequestMapping("/myworkControlRevokeVerifyPage")
	public String myworkControlRevokeVerifyLoad() {
		return "/control/mywork-control-revoke-verify";
	}
	
	/**
	 * 分页查询布控信息
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/queryControl")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'查询布控信息'",content="'查询时间:' + getWebParamInfo().get('beginDate') + '到' + getWebParamInfo().get('endDate')",needPersist= true,operation="SEARCH")
	public Object queryControlInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		if (!StringUtil.checkStr(searchParam.get("verifyStatus")) && StringUtil.equals(searchParam.get("queryType"), "verify")) { //新增布控待审核查询
			searchParam.put("verifyStatus", "1");//查询布控中（待审核）的数据
		}
		if (!StringUtil.checkStr(searchParam.get("verifyStatus")) && StringUtil.equals(searchParam.get("queryType"), "revokeVerify")) { //撤控待审核查询
			searchParam.put("verifyStatus", "4");//查询布控中（待审核）的数据
		}
		if (StringUtil.equals(searchParam.get("queryType"), "revoke")) {
			searchParam.put("verifyStatus", "2");//审核通过的数据，看是否要执行撤销
		}
		List<Map<String, String>> results = controlManagerService.queryControlInfo(searchParam);
		
		List<Map<String, String>> counts = controlManagerService.countControlDatas(searchParam);
		int amounts = StringUtil.toInt(counts.get(0).get("COUNTS"));
		return ResponseUtils.sendList(results, amounts);
	}
	
	/**
	 * 分页查询黑名单数据
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/queryBlackList")
	@ResponseBody
	public Object queryBlackListInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = controlManagerService.queryBlackListInfo(searchParam);
		List<Map<String, String>> counts = controlManagerService.countBlackList(searchParam);
		int amounts = StringUtil.toInt(counts.get(0).get("COUNTS"));
		return ResponseUtils.sendList(results, amounts);
	}
	
	/**
	 * 数据导入
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/importDataModel")
	@ResponseBody
	public void importDataModel(Model model, MultipartHttpServletRequest request, HttpServletResponse response) throws Exception {
		MultipartFile file = (MultipartFile) request.getFile("blackListExcel");
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String listType = searchParam.get("listType");
		List<Map<String, String>> datas = null;
		try {
			// 解析文件，得到 List
			datas = this.controlManagerService.parseblackListExcel(file);
		} catch (Exception e) {
			e.printStackTrace();
			BaseException baseException = new BaseException();
            baseException.setMessage("文件格式错误,错误代码如下：<br>" + e.getMessage());
            throw baseException;
		}
		datas.get(0).put("msg", "导入黑名单成功,您一共导入了" + datas.size() + "条记录。");
		response.reset();
		response.setContentType("text/html;charset=UTF-8");  
		PrintWriter out = response.getWriter();
		Map<String, Object> userMap = userService.getCurrentUser(request);
		String userName = StringUtil.toString(userMap.get("USER_NAME"));
		int savecounts = 0;
		if (datas != null && datas.size() > 0) {
			savecounts = this.controlManagerService.saveBlackListInfo(datas, userName, listType);
		}
		out.print(datas.size());
		out.flush();
		out.close();
	}
	
	/**
	 * 保存布控信息:增加联网平台直接访问布控的功能
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/saveControl")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'新增布控信息'",content="'布控车牌:' + getWebParamInfo().get('carNum')",needPersist= true,operation="ADD")
	public Object saveControlInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		Map<String, Object> userMap = userService.getCurrentUser(request);
		if(userMap !=null){
			if (StringUtil.checkObj(userMap.get("USER_NAME"))) {
				searchParam.put("userName", StringUtil.toString(userMap.get("USER_NAME")));
			}
		}else{
			searchParam.put("userName", "联网平台");
		}
		/*String startDate = DateUtil.getCurrentDateTime();
		searchParam.put("startDate", startDate);*/
		int saveFlag = 0;
		saveFlag = this.controlManagerService.saveControlInfo(searchParam);
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	

	/**
	 * 初始化修改数据的详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/loadControlDetail")
	@ResponseBody
	public Object loadControlDetailInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = controlManagerService.loadControlDetailInfo(searchParam);
		results.get(0).put("BKSK", StringUtil.toString(results.get(0).get("BKSK")));
		results.get(0).put("BKLEN", StringUtil.toString(results.get(0).get("BKLEN")));
		results.get(0).put("CKSJ", StringUtil.toString(results.get(0).get("CKSJ")));
		//组装页面布控范围信息
		if(results.get(0).containsKey("BKFW")&&null!=results.get(0).get("BKFW")){
			String bkfw=results.get(0).get("BKFW");
			List<Map<String, String>> allMounts=hotService.findMountByKkbh(bkfw);
			String kkmcStr="";
			for (Map<String, String> mountMap : allMounts) {
				if (StringUtil.checkStr(kkmcStr)) {
					kkmcStr = kkmcStr + ",";
				}
				kkmcStr = kkmcStr + mountMap.get("KKMC");
			}
			results.get(0).put("BKFWDEC", kkmcStr);
		}else{
			results.get(0).put("BKFWDEC", "");
		}
		
		this.jsonResult.setData(results);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 检查是否存已存在布控信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/checkCarNum")
	@ResponseBody
	public Object checkControlCarNumInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> oldResults = controlManagerService.checkControlCarNum(searchParam);
		int saveFlag = 0;
		if (oldResults != null && oldResults.size() > 0) {
			saveFlag = -1;
		}
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	

	/**
	 * 修改布控信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/updateControl")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'修改布控信息'",content="'布控车牌:' + getWebParamInfo().get('carNum')",needPersist= true,operation="UPDATE")
	public Object updateControlInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int updateFlag = 0;
		updateFlag = this.controlManagerService.updateControlInfo(searchParam);
		this.jsonResult.setData(updateFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 删除布控信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/deleteControl")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'删除布控信息'",content="'删除布控编号:' + getWebParamInfo().get('controlIds')",needPersist= true,operation="DELETE")
	public Object deleteControlInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		int deleteFlag = 0;
		//传递一个Map的参数在后台一次性用IN读取出来删掉匹配的数据
	    deleteFlag = this.controlManagerService.deleteControlInfo(searchParam);
		this.jsonResult.setData(deleteFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 审核布控信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/verifyControl")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'审核布控信息'",content="'布控车牌:' + getWebParamInfo().get('carNum')",needPersist= true,operation="UPDATE")
	public Object verifyControlInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int updateFlag = 0;
		updateFlag = this.controlManagerService.verifyControlInfo(searchParam);
		this.jsonResult.setData(updateFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 撤销布控信息,增加联网平台的撤控功能
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/revokeControl")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'撤销布控信息'",content="'布控车牌:' + getWebParamInfo().get('carNum')",needPersist= true,operation="UPDATE")
	public Object revokeControlInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int updateFlag = 0;
		Map<String, Object> userMap = userService.getCurrentUser(request);
		if(userMap !=null){
			if (StringUtil.checkObj(userMap.get("USER_NAME"))) {
				searchParam.put("userName", StringUtil.toString(userMap.get("USER_NAME")));
			}
			if (StringUtil.checkObj(userMap.get("ORGAN_ID"))) {
				searchParam.put("organId", StringUtil.toString(userMap.get("ORGAN_ID")));
			}
		}else{
			searchParam.put("userName", "联网平台");
			searchParam.put("organId","440100");
		}
//		if (StringUtil.checkObj(userMap.get("USER_NAME"))) {
//			searchParam.put("userName", StringUtil.toString(userMap.get("USER_NAME")));
//		}
		
		String curentTime = DateUtil.getCurrentDateTime();
		searchParam.put("revokeTime", curentTime);
		updateFlag = this.controlManagerService.revokeControlInfo(searchParam);
		this.jsonResult.setData(updateFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 撤销布控审核信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/revokeVerifyControl")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'撤销审核布控信息'",content="'布控车牌:' + getWebParamInfo().get('carNum')",needPersist= true,operation="UPDATE")
	public Object revokeVerifyControlInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int updateFlag = 0;
		updateFlag = this.controlManagerService.revokeVerifyControlInfo(searchParam);
		this.jsonResult.setData(updateFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 统计布控信息数据
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/countExports")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'统计布控信息数据'",content="'布控车牌:' + getWebParamInfo().get('carNum')",needPersist= true,operation="UPDATE")
	public Object countExportsInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> counts = controlManagerService.countControlDatas(searchParam);
		int amounts = StringUtil.toInt(counts.get(0).get("COUNTS"));
		this.jsonResult.setData(amounts);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 布控根据查询条件导出功能
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/exportControlToExcel")
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'导出布控信息'",content="'时间范围:' + getWebParamInfo().get('beginDate') + '到' + getWebParamInfo().get('endDate') + ',布控编号:' + getWebParamInfo().get('idstr')",needPersist= true,operation="EXPORT")
	public String exportControlToExcelInfos(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		//在共用的基础上增加私有的信息
        request.setAttribute(ExcelExportServiceImpl.EXCEL_PROCESSOR,"businessExportService");
        request.setAttribute(ExcelExportServiceImpl.EXCEL_FILENAME,"布控查询信息");
        //定义导出的字段名称
        String[] texts = new String[] {"车牌号码","车辆类型","车牌颜色","布控等级","布控类型","布控状态","审核状态",
                "布控时间","失效时间","布控单位","布控人"};
        //设定Excel单元格宽度
        int[] widths = new int[] {10, 10, 10, 10, 10, 10, 10, 30, 30, 20, 15};
        String idstr = searchParam.get("idstr");
        if (StringUtil.isNotBlank(idstr)) {
            String partIds[] = idstr.split(",");
            List<Map<String, String>> exportData = this.exportControlInfoById(partIds);
            //输出成为Excel 
            this.setExcelFileName(URLEncoder.encode("布控查询信息", "UTF-8"));
            File file = File.createTempFile("alarm" + new Date().getTime() + "_", "tmp");
            response.setContentType("application/vnd.ms-excel");      
            response.setHeader("content-disposition", "attachment;filename=" + excelFileName + ".xls");    
            response.setBufferSize(2048);
            OutputStream stream = response.getOutputStream();
            Object[] dataSource = businessExportService.exportControlDataSource(exportData);
            this.businessExportService.outputToExcel(exportData, stream, texts, widths, dataSource);
            this.inputStream = new FileInputStream(file);
            return "";
        } else {
        	String exportQuerySql = controlManagerService.exportQuerySql(searchParam);
        	request.setAttribute(ExcelExportServiceImpl.EXCEL_SQL, exportQuerySql);
        	request.setAttribute(ExcelExportServiceImpl.EXCEL_EXPORTTYPE, searchParam.get("exportType"));
        	request.setAttribute(ExcelExportServiceImpl.TITLE_TEXTS,texts);
        	request.setAttribute(ExcelExportServiceImpl.TITLE_WITHS,widths);
        	request.setAttribute(ExcelExportServiceImpl.EXPORT_FLAG,"control");
        	return "forward:/excelExport/export.mvc";
        }
    }
	
	@RequestMapping("/doExport")
	@ResponseBody
	public Object doExport(Model model, HttpServletRequest request, HttpServletResponse response) throws ParseException{
		
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		
		Object[] dataSource = controlManagerService.getExportList(searchParam);
		//excel文档名称
		String excelFileName="布控信息";
		
		//定义导出的字段名称
        String[] texts = new String[] {"车牌号","车辆品牌","车辆类别","布控类型","布控类别","审核状态","布控时间","失效时间","布控单位","布控人"};
        //设定Excel单元格宽度
        int[] widths = new int[] {20, 10, 10, 10, 20, 20, 30, 30, 10, 10};
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
			e.printStackTrace();
		}catch (ExportFailedException e) {
			e.printStackTrace();
		}
	       
		
		return "";
	}
	
	/**
	 * 获取导出数据
	 * @param partIds 每项的ID
	 * @return 数据结果集
	 */
	public List<Map<String, String>> exportControlInfoById(String[] partIds) {
		List<Map<String, String>> exportResults = controlManagerService.exportControlInfoById(partIds);
		return exportResults;
	}
	
	/**
	 * 根据条件导出数据
	 * @param searchParam 查询条件
	 * @param request 上下文请求
	 * @return 转向地址
	 */
	public String exportControlByCondition(Map<String, String> searchParam, HttpServletRequest request) {
		String exportQuerySql = controlManagerService.exportQuerySql(searchParam);
    	request.setAttribute(ExcelExportServiceImpl.EXCEL_SQL, exportQuerySql);
    	request.setAttribute(ExcelExportServiceImpl.EXCEL_EXPORTTYPE, searchParam.get("exportType"));
    	return "forward:/excelExport/export.mvc";
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
