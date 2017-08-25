package com.jp.tic.system.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
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

import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.core.annotation.Log;
import com.jp.tic.system.entity.CarBrandItem;
import com.jp.tic.system.entity.CarCategory;
import com.jp.tic.system.entity.EnumItem;
import com.jp.tic.system.entity.IllegalType;
import com.jp.tic.system.service.BusinessExportService;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.system.service.SystemConfigService;
import com.jp.tic.system.service.impl.ExcelExportServiceImpl;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/dictionary")
@Scope("prototype")
public class DictionaryItemController extends AbstractController  {
	
	@Autowired
	DictionaryService dictionaryService;
	@Autowired
	SystemConfigService systemConfigService;
	@Autowired
	BusinessExportService businessExportService;
	
	private InputStream inputStream; // 文件流
	
	private String excelFileName; //Excel导出文件名
	
	//private List<CarBrandItem> carBrandList=new ArrayList<CarBrandItem>();
	private List<CarBrandItem> carTypeList=new ArrayList<CarBrandItem>();
	private List<CarBrandItem> carYearList=new ArrayList<CarBrandItem>();
	private List<CarCategory> carCategoryList=new ArrayList<CarCategory>();
	private List<IllegalType> illegalTypeList=new ArrayList<IllegalType>();
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/dictionaryPage")
	public String dictionaryLoad() {
		return "/system/dictionary-item";
	}
	
	/**
     * JSON根据字典类别获取字典项目列表的功能（用于下拉框）
     * @return 组装结果
     * @author lsg
     */
	@RequestMapping("/jsonDictsInCombo")
	@ResponseBody
    public Object findDictionaryData(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
        /*List<Map<String, String>> datas = dictionaryService.findDictionaryData(searchParam);
        List<Map<String, String>> results = new ArrayList<Map<String,String>>();
        if (datas != null && datas.size() > 0) {
        	Map<String, String> map = null;
	        for (Map<String, String> dataMap : datas) {
	            map = new HashMap<String, String>();
	            map.put("text", dataMap.get("DISPLAYVALUE"));
	            map.put("id", dataMap.get("STOREVALUE"));
	            map.put("extra", dataMap.get("NOTES"));
	            results.add(map);
	        }
        }*/
		
		List<EnumItem> list = dictionaryService.getEnumListByCode(searchParam.get("code"));
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		if (list != null) {
			for (EnumItem en : list) {
				Map<String, String> map = new HashMap<String, String>();
				map.put("text", en.getItemName());
				map.put("id", en.getItemValue());
				results.add(map);
			}
		}
        this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;

    }
	
	
	/**
     * JSON根据字典车牌号码获取字典项目列表的功能（用于下拉框）
     * @return 组装结果
     * @author lsg
     */
	@RequestMapping("/HPHMDictsInComboHPHM")
	@ResponseBody
    public Object HPHMDictionaryData(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<EnumItem> list = dictionaryService.getEnumListByCode(searchParam.get("code"));
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		if (list != null) {
			for (EnumItem en : list) {
				Map<String, String> map = new HashMap<String, String>();
				map.put("text", en.getItemName());
				map.put("id", en.getItemValue());
				results.add(map);
			}
		}
        this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
    }
	
	/**
     * 获取字段数字对应的名称
     * @return 组装结果
     * @author lsg
     */
	@RequestMapping("/jsonDictsFields")
	@ResponseBody
    public Object findColumeName(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
        List<Map<String, String>> datas = dictionaryService.findDictionaryData(searchParam);
        List<Map<String, String>> results = new ArrayList<Map<String,String>>();
        if (datas != null && datas.size() > 0) {
        	Map<String, String> map = null;
	        for (Map<String, String> dataMap : datas) {
	            map = new HashMap<String, String>();
	            map.put("text", dataMap.get("DISPLAYVALUE"));
	            map.put("id", dataMap.get("STOREVALUE"));
	            map.put("extra", dataMap.get("NOTES"));
	            results.add(map);
	        }
        }
        this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;

    }
	
	 /**
     * 或者设备故障类型（用于下拉框）
     * @return
     * @author lsg
     */
	@RequestMapping("/jsonTroubleFields")
	@ResponseBody
    public Object findTroubleDicInfo(Model model, HttpServletRequest request) {
    	Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
        List<Map<String, String>> dicDatas = dictionaryService.findDictionaryData(searchParam);
        List<Map<String, String>> configDatas = systemConfigService.findAllConfigDatas();
        List<Map<String, String>> results = new ArrayList<Map<String,String>>();
        if (dicDatas != null && dicDatas.size() > 0 && configDatas != null && configDatas.size() > 0) {
        	Map<String, String> map = null;
	        for (Map<String, String> dicMap : dicDatas) {
	        	for (Map<String, String> configMap : configDatas) {
	        		if (StringUtil.equals(dicMap.get("STOREVALUE"), configMap.get("CODE").split("_")[1])) {
	        			map = new HashMap<String, String>();
	    	            map.put("text", dicMap.get("DISPLAYVALUE"));
	    	            map.put("id", dicMap.get("STOREVALUE"));
	    	            map.put("alarm_type", configMap.get("VALUE"));
	    	            map.put("person_name", configMap.get("PERSON"));
	    	            results.add(map);
	        		}
	        	}
	        }
        }
        this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
    }
	
	/**
     * 加载操作类型（用于下拉框）
     * @return
     * @author lsg
     */
	@RequestMapping("/jsonOprationFields")
	@ResponseBody
    public Object findOprationDicInfo(Model model, HttpServletRequest request) {
    	Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
        List<Map<String, String>> dicDatas = dictionaryService.findDictionaryData(searchParam);
        List<Map<String, String>> configDatas = systemConfigService.findOperationLogConfig();
        List<Map<String, String>> results = new ArrayList<Map<String,String>>();
        if (dicDatas != null && dicDatas.size() > 0 && configDatas != null && configDatas.size() > 0) {
        	Map<String, String> map = null;
	        for (Map<String, String> dicMap : dicDatas) {
	        	for (Map<String, String> configMap : configDatas) {
	        		if (StringUtil.equals(dicMap.get("STOREVALUE"), configMap.get("REMARK"))) {
	        			map = new HashMap<String, String>();
	    	            map.put("text", dicMap.get("DISPLAYVALUE"));
	    	            map.put("id", dicMap.get("STOREVALUE"));
	    	            map.put("startPoint", configMap.get("VALUE").split("-")[0]);
	    	            map.put("endPoint", configMap.get("VALUE").split("-")[1]);
	    	            map.put("usingFlag", configMap.get("PERSON"));
	    	            results.add(map);
	        		}
	        	}
	        }
        }
        this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
    }
	
	/**
	 * 分页查询字典信息数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/queryDictionary")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'查询字典信息'",content="'关键字:' + getWebParamInfo().get('dictionaryName')",needPersist= true,operation="SEARCH")
	public Object queryDictionaryInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		searchParam.put("start", searchParam.get("page.start"));
		searchParam.put("limit", searchParam.get("page.limit")); 
		List<Map<String, String>> results = dictionaryService.queryDictionaryInfo(searchParam);
		List<Map<String, String>> counts = dictionaryService.countDictionaryDatas(searchParam);
		int amounts = StringUtil.toInt(StringUtil.toString(counts.get(0).get("COUNTS")));
		return ResponseUtils.sendList(results, amounts);
	}
	
	/**
	 * 添加字典信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/addDictionary")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'新增字典信息'",content="'显示名称:' + getWebParamInfo().get('DISPLAYVALUE')",needPersist= true,operation="ADD")
	public Object addDictionaryInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int saveFlag = 0;
		saveFlag = this.dictionaryService.addDictionaryInfo(searchParam);
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	

	/**
	 * 初始化修改数据的详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/initDictionaryDetail")
	@ResponseBody
	public Object initDictionaryDetailInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = dictionaryService.initDictionaryDetailInfo(searchParam);
		this.jsonResult.setData(results);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 修改字典信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/updateDictionary")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'修改字典信息'",content="'显示名称:' + getWebParamInfo().get('DISPLAYVALUE')",needPersist= true,operation="UPDATE")
	public Object updateDictionaryInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int updateFlag = 0;
		updateFlag = this.dictionaryService.updateDictionaryInfo(searchParam);
		this.jsonResult.setData(updateFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 删除字典信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/deleteDictionary")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'删除字典信息'",content="'字典ID:' + getWebParamInfo().get('ids')",needPersist= true,operation="DELETE")
	public Object deleteDictionaryInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int deleteFlag = 0;
		deleteFlag = this.dictionaryService.deleteDictionaryInfo(searchParam);
		this.jsonResult.setData(deleteFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
     * 查询角色信息（用于下拉框）
     * @return 组装结果
     * @author lsg
     */
	@RequestMapping("/jsonRoleInCombo")
	@ResponseBody
    public Object findRoleData(Model model, HttpServletRequest request) {
		Map<String, String> user = (Map<String, String>) request.getSession().getAttribute(AbstractController.SESSION_USER);
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String roleId = StringUtil.toString(user.get("ROLE_ID"));
		searchParam.put("roleId", roleId);
		List<Map<String, String>> list = dictionaryService.findRoleData(searchParam);
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		if (list != null) {
			for (Map<String, String> roleMap : list) {
				Map<String, String> map = new HashMap<String, String>();
				map.put("text", roleMap.get("ROLE_NAME"));
				map.put("id", roleMap.get("ROLE_ID"));
				results.add(map);
			}
		}
        this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;

    }
	
	/**
     * 查询所有角色信息（用于下拉框）
     * @return 组装结果
     * @author lsg
     */
	@RequestMapping("/jsonAllRoleInCombo")
	@ResponseBody
    public Object findAllRoleData(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> list = dictionaryService.findAllRoleData(searchParam);
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		if (list != null) {
			for (Map<String, String> roleMap : list) {
				Map<String, String> map = new HashMap<String, String>();
				map.put("text", roleMap.get("ROLE_NAME"));
				map.put("id", roleMap.get("ROLE_ID"));
				results.add(map);
			}
		}
        this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
    }
	
	/**
	 * 统计字典信息数据
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/countDictionaryItem")
	@ResponseBody
	public Object countDictionaryItemInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> counts = dictionaryService.countDictionaryDatas(searchParam);
		int amounts = StringUtil.toInt(StringUtil.toString(counts.get(0).get("COUNTS")));
		this.jsonResult.setData(amounts);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 字典查询导出功能
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/exportDictionaryItem")
	public String exportDictionaryItemInfos(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		//在共用的基础上增加私有的信息
        request.setAttribute(ExcelExportServiceImpl.EXCEL_PROCESSOR,"businessExportService");
        request.setAttribute(ExcelExportServiceImpl.EXCEL_FILENAME,"字典信息");
        //定义导出的字段名称
        String[] texts = new String[] {"显示名称","编码","存储值","描述"};
        //设定Excel单元格宽度
        int[] widths = new int[] {30, 10, 10, 10};
        String idstr = searchParam.get("idstr");
        if (StringUtil.isNotBlank(idstr)) {
            String partIds[] = idstr.split(",");
            List<Map<String, String>> exportData = dictionaryService.exportDictionaryItemById(partIds);
            /* 输出成为Excel */
            this.setExcelFileName(URLEncoder.encode("字典信息", "UTF-8"));
            File file = File.createTempFile("alarm" + new Date().getTime() + "_", "tmp");
            response.setContentType("application/vnd.ms-excel");      
            response.setHeader("content-disposition", "attachment;filename=" + excelFileName + ".xls");    
            response.setBufferSize(2048);
            OutputStream stream = response.getOutputStream();
            Object[] dataSource = businessExportService.exportDictionaryDataSource(exportData);
            this.businessExportService.outputToExcel(exportData, stream, texts, widths, dataSource);
            this.inputStream = new FileInputStream(file);
            return "";
        } else {
        	String exportQuerySql = dictionaryService.exportQuerySql(searchParam);
        	request.setAttribute(ExcelExportServiceImpl.EXCEL_SQL, exportQuerySql);
        	request.setAttribute(ExcelExportServiceImpl.EXCEL_EXPORTTYPE, searchParam.get("exportType"));
        	request.setAttribute(ExcelExportServiceImpl.TITLE_TEXTS,texts);
        	request.setAttribute(ExcelExportServiceImpl.TITLE_WITHS,widths);
        	request.setAttribute(ExcelExportServiceImpl.EXPORT_FLAG,"dictionary");
        	return "forward:/excelExport/export.mvc";
        }
    }
	/**
	 * 加载车辆品牌下拉信息
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping("/jsonCarBrandInCombo")
	@ResponseBody
    public Object findCarBrandData(Model model, HttpServletRequest request) {
		/*List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		if(this.carBrandList.size()==0){
			this.carBrandList = dictionaryService.findCarBrand();
		}
		for (CarBrandItem item : carBrandList) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("id", item.getValue());
			map.put("text", item.getKey());
			results.add(map);
		}*/
		List<Map<String, String>> results = dictionaryService.findCarBrand();
        this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
    }
	/**
	 * 根据车辆品牌加载车辆型号下拉信息
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping("/jsonCarTypeInCombo")
	@ResponseBody
    public Object findCarTypeData(Model model, HttpServletRequest request) {
		
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		String carBrand=searchParam.get("carBrand");
		if(this.carTypeList.size()==0){
			this.carTypeList = dictionaryService.findCarType();
		}
		for (CarBrandItem item : carTypeList) {
			if(item.getParentid().equals(carBrand)){
				Map<String, String> map = new HashMap<String, String>();
				map.put("id", item.getValue());
				map.put("text", item.getKey());
				results.add(map);
			}
		}
        this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
    }
	
	/**
	 * 加载车辆品牌车辆类型树信息
	 */
	@RequestMapping("/jsonCarTypeTreeData")
	@ResponseBody
	public Object findCarTypeTreeData(Model model, HttpServletRequest request, HttpServletResponse response) {
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		String carBrand=searchParam.get("carBrand");
		if(this.carTypeList.size()==0){
			this.carTypeList = dictionaryService.findCarTypeTreeData();
		}
		for (CarBrandItem item : carTypeList) {
			String[] carBrands = carBrand.split(",");
			for (int i = 0; i < carBrands.length; i++) {
				if(item.getParentid().equals(carBrands[i])){
					Map<String, String> map = new HashMap<String, String>();
					map.put("id", item.getValue());
					map.put("text", item.getKey());
					results.add(map);
				}
			}
		}
		this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
	}
	
	/**
	 * 加载车辆品牌车辆类型多选下拉框信息
	 */
	@RequestMapping("/findCarTypeCombox")
	@ResponseBody
	public Object findCarTypeCombox(Model model, HttpServletRequest request) {
		/*Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		String carBrand=searchParam.get("carBrand");
		List<Map<String, String>> datas = new ArrayList<Map<String,String>>();
		if (StringUtil.checkStr(carBrand)) {
			datas = dictionaryService.findCarTypeCombox(carBrand);
		}*/
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		String carBrand=searchParam.get("carBrand");
		List<Map<String, String>> datas = dictionaryService.findCarTypeCombox(carBrand);
		
		this.jsonResult.setData(datas);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
	}
	
	/**
	 * 加载品牌年款车辆类型多选下拉框信息
	 */
	@RequestMapping("/findCarYearCombox")
	@ResponseBody
	public Object findCarYearCombox(Model model, HttpServletRequest request) {
		/*Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		String carType=searchParam.get("carType");
		List<Map<String, String>> datas = new ArrayList<Map<String,String>>();
		if (StringUtil.checkStr(carType)) {
			datas = dictionaryService.findCarYearCombox(carType);
		}*/
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		String carType=searchParam.get("carType");
		List<Map<String, String>> datas =  dictionaryService.findCarYearCombox(carType);
		
		this.jsonResult.setData(datas);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
	}
	
	/**
	 * 根据车辆品牌和车辆型号加载车辆年款下拉信息
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping("/jsonCarYearInCombo")
	@ResponseBody
    public Object findCarYearData(Model model, HttpServletRequest request) {
		
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		String carBrand=searchParam.get("carBrand");
		String carType=searchParam.get("carType");
		String parentId=carBrand+"_"+carType;
		if(this.carYearList.size()==0){
			this.carYearList = dictionaryService.findCarYear();
		}
		for (CarBrandItem item : carYearList) {
			if(item.getParentid().equals(parentId)){
				Map<String, String> map = new HashMap<String, String>();
				map.put("id", item.getValue());
				map.put("text", item.getKey());
				results.add(map);
			}
		}
        this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
    }
	
	/***
	 * 查询所有车辆类别信息
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping("/jsonCarCategoryInCombo")
	@ResponseBody
	public Object findCarCategoryData(Model model, HttpServletRequest request) {
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		if(this.carCategoryList.size()==0){
			this.carCategoryList = dictionaryService.findCarCategory();
		}
		for (CarCategory item : carCategoryList) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("id", item.getStoreValue());
			map.put("text", item.getDisplayValue());
			results.add(map);
		}
		
		this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
	}
	
	/***
	 * 查询所有车辆类别信息
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping("/jsonIllegalTypeInCombo")
	@ResponseBody
	public Object findIllegalTypeData(Model model, HttpServletRequest request) {
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		if(this.illegalTypeList.size()==0){
			this.illegalTypeList = dictionaryService.findIllegalType();
		}
		for (IllegalType item : illegalTypeList) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("id", item.getStoreValue());
			map.put("text", item.getDisplayValue());
			results.add(map);
		}
		
		this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
	}
	
	/**
	 * 根据类型，获取某个菜单
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping("/findMenuByName")
	@ResponseBody
	public Object findMenuByName(Model model, HttpServletRequest request){
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request); 
		String name=searchParam.get("name");
		String uri=dictionaryService.findMenuByName(name);
		this.jsonResult.setData(uri);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
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
