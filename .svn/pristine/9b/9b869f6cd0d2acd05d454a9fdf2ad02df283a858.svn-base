package com.jp.tic.business.cartake.controller;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.tools.zip.ZipOutputStream;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.support.ServletContextResource;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.alibaba.fastjson.JSON;
import com.jp.tic.analyze.entity.CarAssemble;
import com.jp.tic.analyze.entity.PageEntity;
import com.jp.tic.analyze.entity.SliceEntity;
import com.jp.tic.analyze.service.CarTakeService;
import com.jp.tic.app.carSearch.service.CarTypeSearchService;
import com.jp.tic.app.carSearch.ws.CarTypeSearchWS;
import com.jp.tic.business.cartake.entity.QueryParam;
import com.jp.tic.business.cartake.enums.BasicDataType;
import com.jp.tic.business.cartake.service.BasicDataService;
import com.jp.tic.business.cartake.service.CarQueryStatService;
import com.jp.tic.business.cartake.service.CarTakeWSService;
import com.jp.tic.business.cartake.service.FullTextSearchService;
import com.jp.tic.business.cartake.service.HotRecodeService;
import com.jp.tic.business.config.ConfigManager;
import com.jp.tic.business.device.service.BayonetManagerService;
import com.jp.tic.business.device.service.DeviceManagerService;
import com.jp.tic.business.system.entity.GatherStatisticsTreeGridNode;
import com.jp.tic.business.user.service.UserService;
import com.jp.tic.common.entity.Tree;
import com.jp.tic.common.util.BeanIntrospectorUtils;
import com.jp.tic.common.util.MapGetUtils;
import com.jp.tic.common.zip.CompressHelper;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.core.annotation.Log;
import com.jp.tic.system.entity.CarCategory;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.entity.EnumItem;
import com.jp.tic.system.entity.ExportStatus;
import com.jp.tic.system.service.BusinessExportService;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.system.service.ExcelExportService;
import com.jp.tic.system.service.SystemConfigService;
import com.jp.tic.system.service.impl.ExcelExportServiceImpl;
import com.jp.tic.system.service.impl.OrgTreeServiceImpl;
import com.jp.tic.system.service.impl.OrganizationServiceImpl;
import com.jp.tic.utils.BaseException;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.carinfo.CarInfoUtils;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;
import com.opensymphony.oscache.general.GeneralCacheAdministrator;

/**
 * <b>function:</b> 车辆统计、分析查询
 * @author hoojo
 * @createDate 2014-5-26 上午10:02:16
 * @file CarQueryAnalyzeStatController.java
 * @package com.jp.tic.business.controller
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
@Controller
@Scope("prototype")
@RequestMapping("/car")
public class CarQueryAnalyzeStatController<E extends Map<String,Object>> extends AbstractController {

	public final SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	@Autowired
	private CarTypeSearchService carTypeSearchService;
	
	@Autowired
	SystemConfigService systemConfigService;
	@Autowired
	private CarQueryStatService<E> service;
	
	@Autowired
	private CarTakeService takeService;
	
	@Autowired
	private BasicDataService<E> basicDataService;
	
	@Autowired
	private CarTakeWSService carTakeWSService;
	
	@Autowired
	private BusinessExportService businessExportService;
	
	@Autowired
    private OrganizationServiceImpl orgService;
	
	@Autowired
    private OrgTreeServiceImpl orgTreeService;
	
	@Autowired
    private FullTextSearchService fullTextSearchService;
	
	@Autowired
    private ExcelExportService exportService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
    private HotRecodeService hotRecodeService;
	
	@Autowired
	private DictionaryService dictionaryService;
	
	@Autowired
	private DeviceManagerService deviceManagerService;
	
	@Autowired
	private BayonetManagerService bayonetManagerService;
	
	@Autowired
	private CarTypeSearchWS carTypeSearchWS;
	
	private InputStream inputStream; // 文件流
	
	private String excelFileName; //Excel导出文件名
	
	private static GeneralCacheAdministrator admin = new GeneralCacheAdministrator();
	
	public String lastPage = "data";
	
	public String optFlag = "";
	
	/**
	 * 加载车辆频度查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/rateStatisticsPage")
	public String rateStatisticsPageLoad() {
		return "/analyze/car-frequency-condition";
	}
	
	/**
	 * 加载车辆频度结果集页面
	 * @return 页面映射
	 */
	@RequestMapping("/carFrequencyResultPage")
	public String carFrequencyResultLoad() {
		return "/analyze/car-frequency-result";
	}
	
	/**
	 * 加载频繁过车查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/rateCarPage")
	public String rateCarPageLoad() {
		return "/analyze/car-frequency-query";
		//return "/analyze/car-rate-statistics";
	}
	
	/**
	 * 车辆特征查询
	 * @return 页面映射
	 */
	@RequestMapping("/analyze/carfeature")
	public String carAnalyzePage(){
		return "/analyze/car-featue-analyze";
	}
	
	/**
	 * 疑似套牌车分析
	 * @return 页面映射
	 */
	@RequestMapping("/taopaichePage")
	public String taopaichePageLoad() {
		return "/analyze/taopai-che";
		//return "/analyze/car-rate-statistics";
	}
	
	/**
	 * 疑似套牌车分析-本地套牌车分析
	 * @return 页面映射
	 */
	@RequestMapping("/taopaicheLocalPage")
	public String taopaicheLocalPageLoad() {
		return "/analyze/fake-plate-condition";
	}
	
	/**
	 * 疑似套牌车分析-本地套牌车分析结果集
	 * @return 页面映射
	 */
	@RequestMapping("/taopaicheResultPage")
	public String taopaicheResultPageLoad() {
		return "/analyze/fake-plate-result";
	}
	
	/**
	 * 临近检测点差异分析 
	 * @return 页面映射
	 */
	@RequestMapping("/queryLinJinPage")
	public String linjinjiancedianPageLoad() {
		return "/analyze/linjinjiance-dian";
		//return "/analyze/car-rate-statistics";
	}
	
	/*
	 * 历史查询车辆
	 * @return 页面映射
	 */
	@RequestMapping("/historyQueryPage")
	public String historyQueryPageLoad(Model model, HttpServletRequest request) {
		Map<Object, Object> config = ConfigManager.getInstance().getAllConfig();
		String hiddenFlag = MapGetUtils.getString(config, "history.car.search.illegal.hidden.flag");
		model.addAttribute("hiddenFlag", hiddenFlag);
		return "/search/history-car-query";
	}
	/*
	 * 历史查询车辆
	 * @return 页面映射
	 */
	@RequestMapping("/historyQueryResult")
	public String historyQueryResultLoad() {
		return "/search/historyCarQueryResult";
	}
	
	/*
	 * 历史查询多方向车辆
	 * @return 页面映射
	 */
	@RequestMapping("/manyDirectionQueryPage")
	public String manyDirectionQueryPageLoad() {
		return "/search/history-many-direction-query";
	}
	
	/*
	 * 历史查询车辆
	 * @return 页面映射
	 */
	@RequestMapping("/realTimeQueryPage")
	public String realTimeQueryPageLoad() {
		return "/search/realTime-car-query";
	}
	/*
	 * 单卡口实时过车
	 * @return 页面映射
	 */
	@RequestMapping("/realTimeOneQueryPage")
	public String realTimeOneQueryPageLoad() {
		return "/search/realTime-one-query";
	}
	/*
	 * 历史查询车辆
	 * @return 页面映射
	 */
	@RequestMapping("/historyOneMountQueryPage")
	public String historyOneMountQueryPageLoad() {
		return "/search/history-one-mount-query";
	}
	/*
	 * 历史查询车辆嵌4G系统
	 * @return 页面映射
	 */
	@RequestMapping("/historyQuery4GPage")
	public String historyQuery4GPageLoad() {
		return "/search/history-query-4G";
	}
	
	/*
	 * 历史查询车辆
	 * @return 页面映射
	 */
	@RequestMapping("/oneDirectionQueryPage")
	public String oneDirectionQueryPageLoad() {
		return "/search/history-one-direction-query";
	}
	
	/*
	 * 车辆信息库查询界面
	 * @return 页面映射
	 */
	@RequestMapping("/carNumSourcePage")
	public String carNumSourcePageLoad() {
		return "/search/carnum-source";
	}
	
	/**
	 * 加载无车牌查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/nullCarNumPage")
	public String nullCarNumPageLoad() {
		return "/search/null-car-query";
	}
	
	/**
	 * 加载假车牌查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/fakeCarNumPage")
	public String fakeCarNumPageLoad() {
		return "/search/fake-carnum-query";
	}
	
	/**
	 * 加载测试页面
	 * @return 页面映射
	 */
	@RequestMapping("/testJs")
	public String testJsPageLoad() {
		return "/analyze/testJs";
	}
	
	/**
	 * 加载测试页面
	 * @return 页面映射
	 */
	@RequestMapping("/downloadPage")
	public String downloadPage() {
		return "/search/download-page";
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping("/query")
	public String queryCar(QueryParam param, Model model) throws Exception {
		debug("start date:"+param.getStartDate()+" end date:"+param.getEndDate());
		if(param.getEndDate()==null||"".equals(param.getEndDate())){
	    	param.setEndDate(formatter.format(new Date()));
	    	debug("set default end date");
	    }
	    if(param.getStartDate()==null||"".equals(param.getStartDate())){
	    	Calendar now=Calendar.getInstance();
	    	now.add(Calendar.MINUTE, -60);
	    	param.setStartDate(formatter.format(now.getTime()));
	    	debug("set default start date");
	    }
	    
		debug(">>>car query param:" + param);
	    List depts = this.service.queryBasicData(BasicDataType.DEPTS, null);
	    List mounts = null;
	    if (!StringUtils.isEmpty(param.getDept())) {
	      mounts = this.service.queryBasicData(BasicDataType.MOUNT, StringUtils.defaultIfEmpty(param.getDept(), ""));
	    }

	    model.addAttribute("depts", depts);
	    model.addAttribute("mounts", mounts);
	    model.addAttribute("queryParam", param);
	    model.addAttribute("param", param);
	    
	    E queryParam = (E) BeanIntrospectorUtils.desc(param);
	    List result = null;
	    if (!StringUtils.isEmpty(param.getMount())) {
	      result = this.service.queryCar(queryParam);
	    }
	    model.addAttribute("data", result);
	    if ((result != null) && (!result.isEmpty())) {
	      model.addAttribute("lastKey", ((Map)result.get(result.size() - 1)).get("rowkey"));
	      if(result.size()>param.getPageSize()){
	    	  result.remove(result.size() - 1);
	      }
	    }
	    //return "/main-query";
	    return "/search/main-query";
	}
	
	
	/**
	 * 首页全文检索车辆历史查询
	 * @param model 模型
	 * @param request 请求
	 * @return 查询结果
	 * @throws Exception 异常
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/firstPageCarQuery")
	@ResponseBody
	public Object firstPageCarQueryInfo(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		PageEntity page = new PageEntity();
		page.setPageNo(1);
		page.setPageSize(100);
		List<Map<String, String>> datas = systemConfigService.loadAlarmSettingInfo();
		String carDays = "0";
		for (Map<String, String> data : datas) {
			if (StringUtil.equals(data.get("CODE"), "first_page_car_days")) {
				carDays = data.get("VALUE");
				break;
			}
		}
		Calendar cal = Calendar.getInstance();
		Date endDate = cal.getTime();
		cal.add(Calendar.DATE, -1);
		Date beginDate=cal.getTime();
		String beginTime = DateUtil.parseToString(beginDate, "yyyy-MM-dd") + " 00:00:00";
		String endTime = DateUtil.parseToString(endDate, "yyyy-MM-dd") + " 23:59:59";
		Date startDate1 = DateUtil.parseToDate(beginTime, "yyyy-MM-dd HH:mm:ss");
		Date endDate1 = DateUtil.parseToDate(endTime, "yyyy-MM-dd HH:mm:ss");;
		List<String> mountList = new ArrayList<String>();
		List<String> platesList = new ArrayList<String>();
		platesList.add(searchParam.get("carNum"));
		page = takeService.queryCarTake(startDate1, endDate1, mountList, platesList, page);
		return ResponseUtils.sendList(page.getResult(), 0);
	}
	/*
	 * 车辆频度统计
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/analyze/rate")
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'车辆频度统计'",content="'查询时间:' + getWebParamInfo().get('startdate') + '到' + getWebParamInfo().get('enddate')",needPersist= true,operation="SEARCH")
	public String analyzeRate(QueryParam param, Model model) throws Exception {
		E queryParam = (E) BeanIntrospectorUtils.desc(param);

	    List depts = this.service.queryBasicData(BasicDataType.DEPTS, null);
	    List mounts = null;
	    if (!StringUtils.isEmpty(param.getDept())) {
	      mounts = this.service.queryBasicData(BasicDataType.MOUNT, StringUtils.defaultIfEmpty(param.getDept(), ""));
	    }

	    List result = null;
	    if (!StringUtils.isEmpty(param.getMount())) {
	      result = this.service.analyzeRate(queryParam);
	    }

	    model.addAttribute("depts", depts);
	    model.addAttribute("mounts", mounts);
	    if ((result != null) && (!result.isEmpty()))
	      model.addAttribute("data", ((Map)result.get(0)).values());
	    else {
	      model.addAttribute("data", new ArrayList());
	    }
	    return "/analyze/main-analyze-rate";
	}
	
	//ext4
	@SuppressWarnings("deprecation")
	@RequestMapping("/query/data")
	@ResponseBody
	public Object queryCarData(QueryParam param, PageEntity page) throws Exception {
		
		Date startDate = null;
		if (StringUtils.isNotEmpty(param.getStartDate())) {
			startDate = formatter.parse(param.getStartDate());
		}
		Date endDate = null;
		if (StringUtils.isNotEmpty(param.getEndDate())) {
			endDate = formatter.parse(param.getEndDate());
		}
		
		page.goNext();
		page.goLast();
		
		String[] mounts = StringUtils.split(param.getMount(), ",");
		List<String> mountList = new ArrayList<String>();
		for (String mount : mounts) {
			mountList.add(mount);
		}
		
		String[] plates = StringUtils.split(param.getPlateNo(), ",");
		List<String> platesList = new ArrayList<String>();
		for (String plateNo : plates) {
			platesList.add(plateNo);
		}
		
		page = takeService.queryCarTake(startDate, endDate, mountList, platesList, page);
		page.setTotalCount(300);
	    //return ResponseUtils.sendList(page.getResult(), page.getPageSize());
		return page;
	}
	
	//ext4
	@SuppressWarnings("deprecation")
	@RequestMapping("/query/slicedata")
	@ResponseBody
	public Object queryCarSliceData(QueryParam param, SliceEntity page) throws Exception {
		
		Date startDate = null;
		if (StringUtils.isNotEmpty(param.getStartDate())) {
			startDate = formatter.parse(param.getStartDate());
		}
		Date endDate = null;
		if (StringUtils.isNotEmpty(param.getEndDate())) {
			endDate = formatter.parse(param.getEndDate());
		}
		
		String[] mounts = StringUtils.split(param.getMount(), ",");
		List<String> mountList = new ArrayList<String>();
		if (mounts != null) {
			for (String mount : mounts) {
				if(mount.length()==18){
					mountList.add(mount);
				}
			}
		}
		
		String[] plates = StringUtils.split(param.getPlateNo(), ",");
		List<String> platesList = new ArrayList<String>();
		if (plates != null) {
			for (String plateNo : plates) {
				platesList.add(plateNo);
			}
		}
		
		page = takeService.queryCarTake(startDate, endDate, mountList, platesList, page);
		
		return page;
	}
	
	//ext4
	@SuppressWarnings("unchecked")
	@RequestMapping("/analyze/rate/data")
	@ResponseBody
	public Object analyzeRateData(QueryParam param) throws Exception {
		E queryParam = (E) BeanIntrospectorUtils.desc(param);
		
		List<E> result = new ArrayList<E>();
		if (!StringUtils.isEmpty(param.getMount())) {
			result.addAll(this.service.queryAnalyzeCarPlateRate(queryParam));
		}
		
		return result;
	}
	
	
	/**
	 * 车牌识别率
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/analyze/rate/cpcxl")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'车牌识别率'",content="'查询时间:' + getWebParamInfo().get('startdate') + '到' + getWebParamInfo().get('enddate')",needPersist= true,operation="SEARCH")
	public Object cpcxl(Map<String, String> param,HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		if(StringUtil.checkObj(searchParam.get("dates"))){
			int dateType =StringUtil.toInt(searchParam.get("dates"));
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
		E queryParam = this.loadQueryCodition(param, searchParam);
		List<E> result = new ArrayList<E>();
		result.addAll(this.service.queryAnalyzeCarPlateRates(queryParam));
		int a =	this.service.queryAnalyzeCarcpcxl(queryParam);
		return ResponseUtils.sendList(result, a);
	}
	
	
	@SuppressWarnings("unchecked")
	@RequestMapping("/analyze/huijutongji")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'汇聚统计'",content="'查询时间:' + getWebParamInfo().get('startdate') + '到' + getWebParamInfo().get('enddate')",needPersist= true,operation="SEARCH")
	public Object huijutongji(Map<String, String> param,HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		if(StringUtil.checkObj(searchParam.get("dates"))){
			int dateType =StringUtil.toInt(searchParam.get("dates"));
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
		
		E queryParam = this.loadQueryCodition(param, searchParam);
		List<E> result = new ArrayList<E>();
		result.addAll(this.service.huijutongjis(queryParam));
		int a =	this.service.huijutongjiss(queryParam);
		return ResponseUtils.sendList(result, a);
		//return this.service.;
	}
	
	/**
	 * 卡口在线状态，按部门和时间分组
	 * @param param
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/analyze/huijutongjiGrouping")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'汇聚统计'",content="'查询时间:' + getWebParamInfo().get('startdate') + '到' + getWebParamInfo().get('enddate')",needPersist= true,operation="SEARCH")
	public Object huijutongjiByOrg(Map<String, String> param,HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		E queryParam = this.loadQueryCodition(param, searchParam);
		List<E> result = new ArrayList<E>();
		result.addAll(this.service.huijutongjis(queryParam));
		this.jsonResult.setData(result);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
	}
	
	/**
	 * 采用treegrid展示汇聚统计的数据
	 * @param request 上下文
	 * @return 返回查询结果
	 */
	@SuppressWarnings("unchecked")
	public Object gatherTreeGridDataInfo(Map<String, String> param, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		E queryParam = this.loadQueryCodition(param, searchParam);
		List<E> result = new ArrayList<E>();
		result.addAll(this.service.huijutongjis(queryParam));
		
		String deviceInfo = searchParam.get("deviceFlag");
		boolean deviceFlag = false;
		if (StringUtil.equals(deviceInfo, "devicePolling")) {
			deviceFlag = true;
		}
        Map<String, Object> data = null;
        List<Long> authOrgIds = orgTreeService.loadOrgTopestData();
        //data = orgService.getOrganizationTreeMap(authOrgIds, true, deviceFlag);
        //List<Map<String, String>> orgEntitys = ( List<Map<String, String>>) data.get("children"); //组织结构树
		return null;
	}
	
	public Map<String,GatherStatisticsTreeGridNode> initStatisticsTreeGridData(List<Map> list) {
		Map<String,GatherStatisticsTreeGridNode> lookupMap = new HashMap<String,GatherStatisticsTreeGridNode>();
		 for(Map m:list){
             String coding = m.get("KKBH").toString();
             String plate = m.get("KKMC").toString();
             int couns = Integer.parseInt(m.get("COUNS").toString());
             int hphm_couns = Integer.parseInt(m.get("HPHM_COUNS").toString());
             int non_hphm_couns = Integer.parseInt(m.get("NON_HPHM_COUNS").toString());
             GatherStatisticsTreeGridNode node = lookupMap.get(coding);
             if(null == node){
                 node =  new GatherStatisticsTreeGridNode();
                 node.setId(coding);
                 node.setText(plate);
                 //node.set
                 //node.setType(ConstantUtil.NODE_TYPE_DERECTION);
                 //lookupMap.put(coding, node);
             }
            // setCarsCountPropertity(plate, count, node);
             
         }
         return lookupMap;
	}
	
	/**
	 * 构造一颗空树
	 * @param data
	 * @param node
	 */
	@SuppressWarnings("unchecked")
	private void initStatisticsTreeGridChildrenNodeByPlace(Map<String, Object> data, GatherStatisticsTreeGridNode node) {
		List<GatherStatisticsTreeGridNode> childNodeList = new ArrayList<GatherStatisticsTreeGridNode>();
		node.setChildren(childNodeList);
		List<Map<String, Object>> orgEntitys = ( List<Map<String, Object>>) data.get("children"); //组织结构树
		for (Map<String, Object> orgMap : orgEntitys) {
			GatherStatisticsTreeGridNode childNode = new GatherStatisticsTreeGridNode();
			childNode.setId(StringUtil.toString(orgMap.get("ID")));
			childNode.setText(StringUtil.toString(orgMap.get("ORGNAME")));
		    childNode.setType(StringUtil.toInt(orgMap.get("TYPE")));
		    childNode.setLeaf(false);
		    childNodeList.add(childNode);
		    initStatisticsTreeGridChildrenNodeByPlace(orgMap,childNode);
		}
		
        /*List<OrgEntity> list = orgService.getChildrenOrgList(orgEntity.getId());
        if(null != list){
            List<CarStatisticsTreeGridNode> childNodeList = new ArrayList<CarStatisticsTreeGridNode>();
            node.setChildren(childNodeList);
            for(OrgEntity org : list){
                if(!isOrgAuthorized(org.getPath(),paths)) continue;
                CarStatisticsTreeGridNode childNode = new CarStatisticsTreeGridNode();
                childNode.setId(org.getCoding());
                childNode.setText(org.getOrgName());
                childNode.setType(org.getOrgType().intValue());
                childNode.setLeaf(false);
                childNodeList.add(childNode);
                initStatisticsTreeGridChildrenNodeByPlace(org,childNode,paths);
            }
        }*/
    }
	
	/*
	 * 疑似套牌车分析
	 */
	//@SuppressWarnings("unchecked")
	@RequestMapping("/alarmControlDetailTaopaiche")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'疑似套牌车分析'",content="'查询时间:' + getWebParamInfo().get('startdate') + '到' + getWebParamInfo().get('enddate')",needPersist= true,operation="SEARCH")
	public Object alarmControlDetailTaopaiche(Map<String, String> param,HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		E queryParam = this.alarmControlDetailTaopaiches(param, searchParam);
		List<E> result = new ArrayList<E>();
		result.addAll(this.service.queryAnalyzeTaopaichess(queryParam));
		return ResponseUtils.sendList(result, 0);
		//return this.service.;
	}
	
	/*
	 * 疑似套牌车分析详细信息
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/taopaicheDetail")
	@ResponseBody
	public Object taopaicheDetailInfo(Map<String, String> param,HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		E queryParam = this.alarmControlDetailTaopaiches(param, searchParam);
		List<E> result = new ArrayList<E>();
		result.addAll(this.service.queryAnalyzeTaopaicheLocal(queryParam));
		return ResponseUtils.sendList(result, 0);
		//return this.service.;
	}
	
	/**
	 * 查询套牌车信息数据的详细信息
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	//@RequestMapping("/alarmControlDetailTaopaiche")

	@SuppressWarnings("unchecked")
	public E alarmControlDetailTaopaiches(Map<String, String> param, Map<String, String> searchParam) {
		E queryParam = (E) BeanIntrospectorUtils.desc(param);
		String ID = searchParam.get("ID");
		queryParam.put("ID", ID);
		return queryParam;
	}
	/**
	 * 组装汇聚统计查询语句
	 * @param param
	 * @param searchParam
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public E loadQueryCodition(Map<String, String> param, Map<String, String> searchParam) {
		E queryParam = (E) BeanIntrospectorUtils.desc(param);
	//	List<Map<String, String>> mounts = organizationService.findOrgInfoByOrgType(searchParam);
		StringBuffer buffer = new StringBuffer();
		
		int pageStart = StringUtil.toInteger(searchParam.get("page.start"));
        int rows = StringUtil.toInteger(searchParam.get("page.limit"));
		String dates = searchParam.get("dates");
		String orgType = searchParam.get("orgType");
		String orgId = searchParam.get("orgId");
		String startdate = searchParam.get("startdate");
		String enddate = searchParam.get("enddate");
		if("0".equals(orgType)){
			queryParam.put("sss3", "c.qydm = '" + orgId + "'");
		}else if("1".equals(orgType)){
			queryParam.put("sss3", "b.dwbh = '" + orgId + "'");
		}else {
			queryParam.put("sss3", "a.kkbh = '440" + orgId + "'");
		}
		Map<String,Object> mapParam = new HashMap<String, Object>();
		if("0".equals(dates)){
			queryParam.put("startDate", "to_char(start_time,'yyyy-MM-dd HH24')||':00-'||to_char(start_time,'HH24')||':59'");
			queryParam.put("startDates", "yyyy-MM-dd 24HH");
				queryParam.put("shijian", "to_date(startT,'yyyy-MM-dd HH24')+1/24");
			queryParam.put("endShijian", "HH24");
		}else if("1".equals(dates)){
			queryParam.put("startDate", "to_char(start_time,'yyyy-MM-dd')");
			queryParam.put("startDates", "to_char(start_time,'yyyy-MM-dd')");
			queryParam.put("shijian", "to_date(startT,'yyyy-MM-dd')+1");
			queryParam.put("endShijian", "dd");
		}else{
			queryParam.put("startDate", "to_char(start_time,'yyyy-mm')");
			queryParam.put("startDates", "to_char(start_time,'yyyy-mm')");
			queryParam.put("shijian", "to_date(startT,'yyyy-mm')+1");
			queryParam.put("endShijian", "mm");
		}
		if (pageStart == 0) {
			queryParam.put("sss1","select * from (");
			queryParam.put("sss2",buffer.toString() + ") row_ where rownum <=" + rows);
        } else {
            int nextStart = pageStart + rows;
            queryParam.put("sss1","select * from ( select row_.*, rownum rownum_ from (");
            queryParam.put("sss2",buffer.toString() + ") row_ where rownum <= " + nextStart +") where rownum_ > " + pageStart);
        }
		queryParam.put("orgId", orgId);
		queryParam.put("orgType", orgType);
		queryParam.put("startdates", startdate);
		queryParam.put("enddate", enddate);
		return queryParam;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping("/gatherStatisticsUserChart")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'汇聚统计'",content="'查询时间:' + getWebParamInfo().get('startdate') + '到' + getWebParamInfo().get('enddate')",needPersist= true,operation="SEARCH")
	public Object gatherStatisticsChartInfo(Map<String, String> param,HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		E queryParam = this.loadQueryCodition(param, searchParam);
		List<E> result = new ArrayList<E>();
		result.addAll(this.service.huijutongjis(queryParam));
		List<Map<String, String>> results = new ArrayList<Map<String,String>>();
		Map<String, String> dataMap = null;
		if (result != null && result.size() > 0) {
			for (E data : result) {
				dataMap = new HashMap<String, String>();
				dataMap.put("COUNT", StringUtil.toString(data.get("COUNS")));
				dataMap.put("PERIOD", StringUtil.toString(data.get("KKMC")) + " " + StringUtil.toString(data.get("JIESHUSHIJIAN")));
				results.add(dataMap);
			}
		}
		this.jsonResult.setData(results);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	//ext4套牌车
	@SuppressWarnings("unchecked")
	@RequestMapping("/analyze/fakeplate/data")
	@ResponseBody
	public Object analyzeFakePlateVehicles(QueryParam param) throws Exception {
		E queryParam = (E) BeanIntrospectorUtils.desc(param);
		
		return this.service.queryAnalyzeFakePlate(queryParam);
	}
	
	
	/*
	 * 套牌车
	 * */
	@SuppressWarnings("unchecked")
	@RequestMapping("/taopaiche")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'疑似套牌车分析'",content="'查询时间:' + getWebParamInfo().get('startdate') + '到' + getWebParamInfo().get('enddate')",needPersist= true,operation="SEARCH")
	public Object taopaiche(Map<String, String> param,HttpServletRequest request) throws Exception {

		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		E queryParam = this.taopaiches(param, searchParam);
		List<E> result = new ArrayList<E>();
		int a =	this.service.queryAnalyzeTaopaiche(queryParam);
		result.addAll(this.service.queryAnalyzeFakePlates(queryParam));
		return ResponseUtils.sendList(result, a);
		
	}
	
	/**
	 * 本地套牌车量分析
	 * @param param
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/taopaiLocalCar")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'疑似套牌车分析'",content="'查询时间:' + getWebParamInfo().get('startdate') + '到' + getWebParamInfo().get('enddate')",needPersist= true,operation="SEARCH")
	public Object taopaiLocalCarInfo(Map<String, String> param,HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request); 
		String jsonParam = JSON.toJSONString(searchParam);//查询条件
		Map<String, Object> resultMap = service.taopaiLocalCarInfo(jsonParam);
		List<E> result = new ArrayList<E>();
		result.addAll((List<E>) resultMap.get("result"));
		return ResponseUtils.sendList(result, StringUtil.toInt(resultMap.get("counts")));
		/*Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		E queryParam = this.taopaiches(param, searchParam);
		List<E> result = new ArrayList<E>();
		int a =	this.service.queryAnalyzeTaopaiLocalCar(queryParam);
		result.addAll(this.service.queryAnalyzeFakeiLocalCar(queryParam));
		return ResponseUtils.sendList(result, a);*/
	}
	
	
	/**
	 * 套牌车确认
	 * @param param
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/confimTaopai")
	@ResponseBody
	public Object confimTaopaiInfo(Map<String, String> param,HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int saveFlag = 0;
		String[] ids = searchParam.get("idstr").split(",");
		String idStr = "";
		if (ids != null && ids.length > 0) {
			for (int i = 0; i < ids.length; i++) {
				if (StringUtil.checkStr(idStr)) {
					idStr = idStr + ",";
				}
				idStr = idStr + ids[i];
			}
			searchParam.put("IDS", idStr);
		}
		saveFlag = this.service.confimTaopaiInfo(searchParam);
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
		
	}
	
	/**
	 * 本地套牌车确认
	 * @param param
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/confimLocalTaopai")
	@ResponseBody
	public Object confimLocalTaopaiInfo(Map<String, String> param,HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int saveFlag = 0;
		String[] ids = searchParam.get("idstr").split(",");
		String idStr = "";
		if (ids != null && ids.length > 0) {
			for (int i = 0; i < ids.length; i++) {
				if (StringUtil.checkStr(idStr)) {
					idStr = idStr + ",";
				}
				idStr = idStr + ids[i];
			}
			searchParam.put("IDS", idStr);
		}
		saveFlag = this.service.confimLocalTaopaiInfo(searchParam);
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
		
	}
	
	/**
	 * 假牌车确认
	 * @param param
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/confimFake")
	@ResponseBody
	public Object confimFake(Map<String, String> param,HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int saveFlag = 0;
		String[] ids = searchParam.get("idstr").split(",");
		String idStr = "";
		if (ids != null && ids.length > 0) {
			for (int i = 0; i < ids.length; i++) {
				if (StringUtil.checkStr(idStr)) {
					idStr = idStr + ",";
				}
				idStr = idStr + ids[i];
			}
			searchParam.put("IDS", idStr);
		}
		saveFlag = this.service.confimFakeInfo(searchParam);
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
		
	}
	
	/**
	 * 套牌车组装汇聚统计查询语句
	 * @param param
	 * @param searchParam
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public E taopaiches(Map<String, String> param, Map<String, String> searchParam) {
		E queryParam = (E) BeanIntrospectorUtils.desc(param);
	//	List<Map<String, String>> mounts = organizationService.findOrgInfoByOrgType(searchParam);
		StringBuffer buffer = new StringBuffer();
		//dates	2
//		orgId	42011300
		int pageStart = StringUtil.toInteger(searchParam.get("page.start"));
        int rows = StringUtil.toInteger(searchParam.get("page.limit"));
        int carSpeed =  StringUtil.toInteger(searchParam.get("carSpeed")); 
		String startdate = searchParam.get("startdate");
		String enddate = searchParam.get("enddate");
		if (StringUtil.checkStr(searchParam.get("carNum"))) {
			queryParam.put("carNum", searchParam.get("carNum"));
		}
		if (StringUtil.checkStr(searchParam.get("carNumList"))) {
			String carList="'"+searchParam.get("carNumList").replace(",", "','")+"'";
			queryParam.put("carNumList", carList);
		}
		if (pageStart == 0) {
			queryParam.put("sss1","select * from (");
			queryParam.put("sss2",buffer.toString() + ") row_ where rownum <=" + rows);
        } else {
            int nextStart = pageStart + rows;
            queryParam.put("sss1","select * from ( select row_.*, rownum rownum_ from (");
            queryParam.put("sss2",buffer.toString() + ") row_ where rownum <= " + nextStart +") where rownum_ > " + pageStart);
        }
		queryParam.put("carSpeed", carSpeed);
		queryParam.put("confimFlag", searchParam.get("confimFlag"));
		queryParam.put("startdate", startdate);
		queryParam.put("enddate", enddate);
		if (StringUtil.checkStr(searchParam.get("mounts"))) {
			String mountStr = "";
			String[] mounts = searchParam.get("mounts").split(",");
			for (int i = 0; i < mounts.length; i++) {
				if (StringUtil.checkStr(mountStr)) {
					mountStr += ",";
				}
				mountStr += "'" + mounts[i] + "'";
			}
			queryParam.put("mounts", mountStr);
		}
		return queryParam;
	}
	
	/**
	 * 加载临近点结果页面
	 * @return 页面映射
	 */
	@RequestMapping("/analyzeClosetPointResult")
	public String analyzeClosetPointResult() {
		return "/analyze/linjindian-result";
	}
	
	/**
	 * 临近监测点差异分析 
	 * EditBy zh.h
	 * @param param
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/analyzeClosetPoint")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'临近监测点差异分析'",content="'时间范围:' + getWebParamInfo().get('startTime') + '到' + getWebParamInfo().get('endTime')",needPersist= true,operation="SEARCH")
	public Object analyzeClosetPointInfo(QueryParam param, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		String json=JsonUtil.objToJson(searchParam);
		
		List<Map<String,String>> resultList=new ArrayList<Map<String,String>>();
		List<CarTake> closeList=new ArrayList<CarTake>();
		closeList=carTypeSearchWS.analyzeClosetPointquery(json);
		if(closeList.size()>0){
		
			String kkbh1="";
			String kkbh2="";
//			if(searchParam.get("kkbh1").length()==18){
//				kkbh1=searchParam.get("kkbh1");
//			}else{
//				kkbh1="440"+searchParam.get("kkbh1");
//			}
//			if(searchParam.get("kkbh2").length()==18){
//				kkbh2=searchParam.get("kkbh2");
//			}else{
//				kkbh2="440"+searchParam.get("kkbh2");
//			}
			kkbh1=searchParam.get("kkbh1");
			kkbh2=searchParam.get("kkbh2");
			int oneCount=0;
			int twoCount=0;
			for(CarTake carTake:closeList){
				if(kkbh1.equals(carTake.getKkbh())){
					Map<String,String> map1=new HashMap<String, String>();
					map1.put("hphm", carTake.getHphm());
					map1.put("hpys", carTake.getHpysmc());
					map1.put("pinpai", carTake.getBrand()+"_"+carTake.getType()+"_"+carTake.getCaryear());
					map1.put("clzl", carTake.getClzl());
					map1.put("kkmc1", carTake.getKkmc());
					map1.put("xxbh", carTake.getXxbh());
					map1.put("jgsj", DateUtil.parseToString(carTake.getJgsj(), "yyyy-MM-dd HH:mm:ss"));
					oneCount++;
					resultList.add(map1);
				}
				if(kkbh2.equals(carTake.getKkbh())){
					Map<String,String> map2=new HashMap<String, String>();
					map2.put("hphm", carTake.getHphm());
					map2.put("hpys", carTake.getHpysmc());
					map2.put("pinpai", carTake.getBrand()+"-"+carTake.getType()+"-"+carTake.getCaryear());
					map2.put("clzl", carTake.getClzl());
					map2.put("kkmc2", carTake.getKkmc());
					map2.put("xxbh", carTake.getXxbh());
					map2.put("jgsj", DateUtil.parseToString(carTake.getJgsj(), "yyyy-MM-dd HH:mm:ss"));
					twoCount++;
					resultList.add(map2);
				}
			}
			Collections.sort(resultList, new Comparator<Map<String,String>>() {
				public int compare(Map<String,String> o1, Map<String,String> o2) {
					Date date1=DateUtil.parseToDate(o1.get("jgsj"), "yyyy-MM-dd HH:mm:ss");
					Date date2=DateUtil.parseToDate(o2.get("jgsj"), "yyyy-MM-dd HH:mm:ss");
					if(date2.after(date1)){
						return 1;
					}
					return -1;
				}
			});
			resultList.get(0).put("oneCounts", oneCount + "");
			resultList.get(0).put("twoCounts", twoCount + "");
		}else{
			resultList.add((Map<String, String>) new HashMap().put("oneCounts", 0 + ""));
			resultList.add((Map<String, String>) new HashMap().put("twoCounts", 0 + ""));
		}
		return ResponseUtils.sendList(resultList, closeList.size());
	}
	
	//车辆信息查询（Ext4）
	@SuppressWarnings("unchecked")
	@RequestMapping("/analyze/carfeature/data")
	@ResponseBody
	public Object queryCarFeature(QueryParam param, String csys, String cllx, String clpp, String hpzl, SliceEntity slice) throws Exception {
		Date startDate = null;
		if (StringUtils.isNotEmpty(param.getStartDate())) {
			startDate = formatter.parse(param.getStartDate());
		}
		Date endDate = null;
		if (StringUtils.isNotEmpty(param.getEndDate())) {
			endDate = formatter.parse(param.getEndDate());
		}
		slice = this.takeService.queryCarTake(startDate, endDate, csys, cllx, clpp, hpzl, slice);
		slice.setCount(100);
		
		return slice;
		
	}
	//车辆特征查询（新）(Ext3.4.0)
	//带有分页查询
	@SuppressWarnings("unchecked")
	@RequestMapping("/analyze/carfeature/dataResult")
	@ResponseBody
	public Object queryCarFeatureNew(Model model,HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request); 
		List<CarTake> newResult = this.carFeatureQueryData(searchParam);
		int count =0;
		for(int i=0;i>=0;i++){
			int j=15;
			if(newResult.size()==15){
				count = 15;
				break ;
			}
			if(i>=1){
				if(newResult.size()>(j*(i+1))){
					   count = (j*(i+1));	
					   break ;
				}
			}
			
		}
		return ResponseUtils.sendList(newResult, count);
	}
	
	@RequestMapping("/cascade")
	@ResponseBody
	public List<E> queryBasicData(String type, String code) throws Exception {
		BasicDataType dataType = BasicDataType.AREA;
		try {
			dataType = BasicDataType.valueOf(type);
		} catch (Exception e) {
		}
		List<E> result = service.queryBasicData(dataType , code);
		
		return result;
	}
	//ext4
	@RequestMapping("/query/dept")
	@ResponseBody
	public List<E> queryDeptData(String code) throws Exception {
		List<E> result = this.service.queryBasicData(BasicDataType.DEPT, null);
		return result;
	}
	
	//ext4
	@RequestMapping("/query/wordbook")
	@ResponseBody
	public List<E> queryWordbookByName(String type) throws Exception {
		List<E> result = this.basicDataService.queryWordbookByName(type);
		
		return result;
	}
	
	//ext4
	@RequestMapping("/query/tree/data")
	@ResponseBody
	public List<Tree> loadTreeData(String code) throws Exception {
		
		List<Tree> trees = new ArrayList<Tree>();
		//List<E> result = this.service.queryBasicData(BasicDataType.DEPT, code);
		List<E> depts = this.service.queryBasicData(BasicDataType.DEPT, null);
		for (E item : depts) {
			Tree tree = new Tree();
			tree.setId(MapUtils.getString(item, "dwbh"));
			tree.setText(MapUtils.getString(item, "dwmc"));
			tree.setLeaf(false);
			tree.setNodeId(MapUtils.getString(item, "dwbh"));
			
			List<E> mounts = this.service.queryBasicData(BasicDataType.MOUNT, tree.getId());
			for (E mount : mounts) {
				Tree node = new Tree();
				node.setId(MapUtils.getString(mount, "kkbh"));
				node.setText(MapUtils.getString(mount, "kkmc"));
				node.setLeaf(true);
				node.setNodeId(MapUtils.getString(mount, "kkbh"));
				tree.getChildren().add(node);
			}
			trees.add(tree);
		}
		
		return trees;
	}
	
	//ext4
	@SuppressWarnings("unchecked")
	@RequestMapping("/query/mulit/plate")
	@ResponseBody
	public List<E> queryMulitCarPlate(String code) throws Exception {
		
		List<E> data = new ArrayList<E>();
		E map = (E) new HashMap<String, Object>();
		map.put("plateNumber", "粤A45653");
		map.put("plateColor", "蓝色");
		data.add(map);
		map = (E) new HashMap<String, Object>();
		map.put("plateNumber", "粤A43251");
		map.put("plateColor", "蓝色");
		data.add(map);
		
		return data ;
	}
	
	/**
	 * 历史车辆数据查询
	 * @param param
	 * @param page
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/query/historyQuery")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'历史过车信息'",content="'车牌号码:' + getWebParamInfo().get('carNum')",needPersist= true,operation="SEARCH")
	public Object historyCarQueryData(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		optFlag = "query";
		Map<String, Object> userMap = (Map<String, Object>) request.getSession().getAttribute(AbstractController.SESSION_USER);
		if(userMap !=null){//联网平台修改
			if (StringUtil.checkObj(userMap.get("USER_CODE"))) {
				searchParam.put("userCode", StringUtil.toString(userMap.get("USER_CODE")));
			} else {
				searchParam.put("userCode", "KEYS");
			}
		}else{
			searchParam.put("userCode", "admin");
		}
		PageEntity page = this.historyQueryData(searchParam);
		int counts = 0;
		if (page.getResult().size() < StringUtil.toInt(searchParam.get("page.limit"))) {
			counts = 0;
		} else {
			counts = StringUtil.toInt(searchParam.get("page.start")) + StringUtil.toInt(searchParam.get("page.limit")) + 1;
		}
		List<Map<String, String>> hotRecodes = hotRecodeService.queryHotRecodes(null);
		List<CarTake> filteTakes = new ArrayList<CarTake>();	
		List<Map<String, String>> roleInfos=null;
		if(userMap !=null){//联网平台放权限修改
			String roleId = userMap.get("ROLE_ID").toString();
			roleInfos = dictionaryService.findRoleInfo(roleId);
		}
		if (page != null) {
			for (int i = 0; i < page.getResult().size(); i++) {
				if (page.getResult().get(i) != null) {
					page.getResult().get(i).setTxsl(Long.parseLong(searchParam.get("page.start"))); //用图像数量来替换分页开始位置
					page.getResult().get(i).setSsdq(lastPage); //用所属地区代替是否翻到了最后一页的标志
				}
			}
		}
		if (page != null && roleInfos != null && roleInfos != null && roleInfos.size() > 0 && !roleInfos.get(0).get("ROLE_NAME").contains("超级管理员")) {
			if (page.getResult() != null && page.getResult().size() > 0) {
				Date jgsjDate = null;
				String jgsjTime = "";
				String startTime = "";
				String endTime = ""; 
				for (int i = 0; i < page.getResult().size(); i++) {
					jgsjDate = page.getResult().get(i).getJgsj();
					jgsjTime = DateUtil.parseToString(jgsjDate, "yyyy-MM-dd HH:mm:ss");
					if (hotRecodes != null && hotRecodes.size() > 0) {
						for (Map<String, String> hotMap : hotRecodes) {
							startTime = hotMap.get("START_DATE");
							endTime = hotMap.get("END_DATE");
							int startFlag = this.getTwoTimeMin(startTime, jgsjTime);
							int endFlag = this.getTwoTimeMin(jgsjTime, endTime);
							if (StringUtil.equals(page.getResult().get(i).getHphm(), hotMap.get("CAR_NUM"))
									&& startFlag >= 0 && endFlag >= 0) {
								if (!StringUtil.checkStr(hotMap.get("KKBHS"))) {
									//多个红名单记录的情况，可能出现重复，因此，重复记录不再追加进去
									if (!filteTakes.contains(page.getResult().get(i))) {
										filteTakes.add(page.getResult().get(i));
									}
								} else {
									if (StringUtil.checkStr(page.getResult().get(i).getKkbh())) {
										if (hotMap.get("KKBHS").indexOf(page.getResult().get(i).getKkbh()) != -1) {
											if (!filteTakes.contains(page.getResult().get(i))) {
												filteTakes.add(page.getResult().get(i));
											}
										}
									}
								}
							}
						}
					}
					//page.getResult().get(i).setCscd(Long.parseLong(page.getResult().size() + "")); //以车上长度代表数据量
				}
			}
			page.getResult().removeAll(filteTakes);
		}
		
		return ResponseUtils.sendList(page.getResult(), counts);
		/*List<CarTake> newResult = this.historyDataList(searchParam);
		return ResponseUtils.sendList(newResult, 1000);*/
	}
	
	/**
	 * 两个时间相差时间,相差秒
	 * @param startTime
	 * @param endTime
	 *            endTime>startTime
	 * @return 返回XX秒
	 */
	public int getTwoTimeMin(String startTime, String endTime) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date starDate = null;
		Date endDate = null;
		try {
			starDate = df.parse(startTime);
			endDate = df.parse(endTime);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		long l = endDate.getTime() - starDate.getTime();
		return StringUtil.toInteger(l / 1000);
	}
	
	/**
	 * 实时车辆查询
	 * @param param
	 * @param page
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/query/realTimeQuery")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'实时过车信息'",content="'车牌号码:' + getWebParamInfo().get('carNum')",needPersist= true,operation="SEARCH")
	public Object realTimeCarQueryData(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		String json= JsonUtil.objToJson(searchParam);
		List<CarTake> statuResults=carTypeSearchWS.dealWithRealTimeDatas(json);
		return ResponseUtils.sendList(statuResults, statuResults.size());
	}
	
	
	/**
	 * 获取历史过车查询数据信息
	 * @return 返回结果
	 */
	private List<CarTake> historyDataList(Map<String, String> searchParam) throws Exception {
		SliceEntity page = new SliceEntity();
		if (!StringUtil.equals(searchParam.get("flag"), "query")) {
			return null;
		}
		
		page.setCount(StringUtil.toInt(searchParam.get("page.start")) + StringUtil.toInt(searchParam.get("page.limit")));
		Date startDate = null;
		if (StringUtils.isNotEmpty(searchParam.get("startTime"))) {
			String startTime = searchParam.get("startTime").replace("T", " ");
			startDate = formatter.parse(startTime);
		}
		Date endDate = null;
		if (StringUtils.isNotEmpty(searchParam.get("endTime"))) {
			String endTime = searchParam.get("endTime").replace("T", " ");
			endDate = formatter.parse(endTime);
		}
		
		//searchParam.put("Mounts", "440100,440113,440113000000000004,440113000000000002,440113000000000001,440113000000000003");
		String[] mounts = StringUtils.split(searchParam.get("mounts"), ",");
		
		List<String> mountList = new ArrayList<String>();
		if (mounts != null) {
			for (String mount : mounts) {
				if(mount.length()==15){
					mountList.add("440" + mount);
				}
			}
		}
		
		String[] plates = StringUtils.split(searchParam.get("carNum"), ",");
		List<String> platesList = new ArrayList<String>();
		if (plates != null) {
			for (String plateNo : plates) {
				platesList.add(plateNo);
			}
		}
		page = takeService.queryCarTake(startDate, endDate, mountList, platesList, page);
		
		
		
		List<CarTake> newResult = new ArrayList<CarTake>();
		if (page != null) {
			if (page.getResult() != null && page.getResult().size() > 0) {
				for (int i = StringUtil.toInt(searchParam.get("page.start")); i < page.getResult().size(); i++) {
					page.getResult().get(i).setTxsl(Long.parseLong(searchParam.get("page.start"))); //用图像数量来替换分页开始位置
					newResult.add(page.getResult().get(i));
				}
			}
		}
		return newResult;
	}
	/**
	 * 获取车辆特征车查询数据信息,新增正式分页功能
	 * @author jzxie
	 * @update Date 2014/12/08 14:20
	 * @param searchParam 前端传入的查询条件
	 * @return 车辆特征查询结果
	 * @throws Exception
	 */
	@SuppressWarnings("unused")
	private List<CarTake> carFeatureQueryData(Map<String,String> searchParam) throws Exception{
		
		SliceEntity slice = new SliceEntity();
		String csys =null;
        String hpzl =null;
        String clpp =null;
        String startTime = null;
        String endTime = null;
        String cllx = null;
        Date startDate = null;
        Date endDate = null;
        if (!StringUtil.equals(searchParam.get("flag"), "query")) {
			return null;
		}
        slice.setCount( StringUtil.toInt(searchParam.get("page.limit")));
        //参数的转换
		 csys = searchParam.get("csys");
		 cllx = searchParam.get("cllx");
	     clpp =searchParam.get("clpp");
		if (StringUtils.isNotEmpty(searchParam.get("startTime"))) {
			 startTime =  searchParam.get("startTime").replaceAll("T",  " ");
			 startDate = formatter.parse(startTime);
		}
		if (StringUtils.isNotEmpty(searchParam.get("endTime"))) {
			endTime = searchParam.get("endTime").replaceAll("T",  " ");
			endDate = formatter.parse(endTime);
		}
		slice = takeService.queryCarTake(startDate, endDate, csys, cllx, clpp, hpzl, slice);
		List<CarTake> newResult = new ArrayList<CarTake>();
		if (slice != null) {
			if (slice.getResult() != null && slice.getResult().size() > 0) {
				for (int i = StringUtil.toInt(searchParam.get("page.start")); i < slice.getResult().size(); i++) {
					if(i>0){
						//判断信息编号是否重复
						if(slice.getResult().get(i-1).getXxbh()==slice.getResult().get(i).getXxbh()){
							slice.setCount(0);
						}else{
							slice.getResult().get(i).setTxsl(Long.parseLong(searchParam.get("page.start"))); //用图像数量来替换分页开始位置
							newResult.add(slice.getResult().get(i));
						}
					}else{
					  slice.getResult().get(i).setTxsl(Long.parseLong(searchParam.get("page.start"))); //用图像数量来替换分页开始位置
					  newResult.add(slice.getResult().get(i));
					}
				}
			}
		}
		List<CarTake> result = new ArrayList<CarTake>();
		for(int i=0;i<newResult.size();i++){
			String csysnew = newResult.get(i).getCsys()==null?"":newResult.get(i).getCsys();
			String cllxnew = newResult.get(i).getCllx()==null?"":newResult.get(i).getCllx();
			String clppnew = newResult.get(i).getClpp()==null?"":newResult.get(i).getClpp();
			if((csys.equals("")||csys.equals(csysnew))&&(cllx.equals("")||cllx.equals(cllxnew))&&(clpp.equals("")||clpp.equals(clppnew))){
				//newResult.remove(i);
				result.add(newResult.get(i));
			}
		}
		return result;
	}
	
	/**
	 * 获取历史过车查询数据信息,新增正式分页功能
	 * @return 返回结果
	 */
	private PageEntity historyQueryData(Map<String, String> searchParam) throws Exception {
		PageEntity page = new PageEntity();
		//测试
		//hdfs.upFile("/home/app/file01/liang.txt", "cccc.txt");
		/*page.setCurrentStartKey(searchParam.get("startKey"));
		page.setCurrentEndKey(searchParam.get("endKey"));*/
		Map<String, Object> dataMap= new HashMap<String, Object>();
		int pageNo = (StringUtil.toInt(searchParam.get("page.start")) / StringUtil.toInt(searchParam.get("page.limit"))) + 1;
		page.setPageNo(pageNo);
		page.setPageSize( StringUtil.toInt(searchParam.get("page.limit")));
		
		String historyFlag = "";
		List<Map<String, String>> configList = systemConfigService.findConfigByCode("historyFlag");
		if (configList != null && configList.size() > 0) {
			historyFlag = configList.get(0).get("VALUE");
		} else {
			historyFlag = "mounts"; //确实默认
		}
		
		if (!StringUtil.equals(searchParam.get("flag"), "query")) {
			return new PageEntity();
		}
		Date startDate = null;
		if (StringUtils.isNotEmpty(searchParam.get("startTime"))) {
			String startTime = searchParam.get("startTime").replace("T", " ");
			startDate = formatter.parse(startTime);
		}
		Date endDate = null;
		if (StringUtils.isNotEmpty(searchParam.get("endTime"))) {
			String endTime = searchParam.get("endTime").replace("T", " ");
			endDate = formatter.parse(endTime);
		}
		
		//searchParam.put("Mounts", "440100,440113,440113000000000004,440113000000000002,440113000000000001,440113000000000003");
		String[] mounts = StringUtils.split(searchParam.get("mounts"), ",");
		
		List<String> mountList = new ArrayList<String>();
		List<String> directionList = new ArrayList<String>();
		if (mounts != null) {
			for (String mount : mounts) {
				if(mount.length()==15){
					mountList.add("440" + mount);
				} else {
					directionList.add(mount);
				}
			}
		}
		String[] plates = StringUtils.split(searchParam.get("carNum"), ",");
		
		List<String> platesList = new ArrayList<String>();
		if(plates != null ){
			//无牌车查询
			if("nullCar".equals(searchParam.get("searchType"))){
				if( plates.length == 1 && "-1".equals(plates[0])){
					//plates = {"-","无牌","无车牌", "—","车牌" };
					//添加所有无车牌的类型
					platesList.add("-");
					platesList.add("无牌");
					platesList.add("无车牌");
					platesList.add("—");
					platesList.add("车牌");
				}
				else  {
					for (String plateNo : plates) {
						platesList.add(plateNo);
					}
				}
			}
			else {
				for (String plateNo : plates) {
					platesList.add(plateNo);
				}
			}
		}
		
		List<String> kyeStrs = null;
		String hpys = searchParam.get("carNumColor");
		String carBrand=searchParam.get("carBrand");
		String carType=searchParam.get("carType");
		String carYear=searchParam.get("carYear");
		
		lastPage = "data";	
		if (StringUtil.equals(searchParam.get("page.start"), "0")) {
			if (StringUtil.equals(historyFlag, "mounts")) {
				page = takeService.queryCarTake(startDate, endDate, mountList, platesList, directionList, hpys,carBrand,carType,carYear, page);
			} else {
				page = takeService.queryCarTakeWithFxbh(startDate, endDate, mountList, platesList, directionList, hpys,carBrand,carType,carYear, page);
			}
			if (page.getPageStartKeys().size() == 1) {
				lastPage = "last";
			} else {
				dataMap.put("startKeys", page.getPageStartKeys());
				if (!StringUtil.equals(optFlag, "export") && !StringUtil.equals(optFlag, "image")) {
					if(searchParam.get("userCode")!=null){
						admin.putInCache(searchParam.get("userCode"), dataMap);
					}
				}
			}
		} else {
			try {
				kyeStrs = (List<String>)(((Map<String, Object> )admin.getFromCache(searchParam.get("userCode"), 3600)).get("startKeys"));
				int preSize = kyeStrs.size();
				page.setPageStartKeys(kyeStrs);
				page.goNext();
				page.goLast();
				boolean endKeyFlag = false;
				if (StringUtil.equals(page.getCurrentEndKey(), "*")) {
					endKeyFlag = true;
				}
				if (StringUtil.equals(historyFlag, "mounts")) {
					page = takeService.queryCarTake(startDate, endDate, mountList, platesList, directionList, hpys,carBrand,carType,carYear,page);
				} else {
					page = takeService.queryCarTakeWithFxbh(startDate, endDate, mountList, platesList, directionList, hpys,carBrand,carType,carYear,page);
				}
				int nowSize = page.getPageStartKeys().size();
				if (preSize == nowSize && endKeyFlag) {
					lastPage = "last";
				}
				dataMap.put("startKeys", page.getPageStartKeys());
				admin.putInCache(searchParam.get("userCode"), dataMap);
			}catch (Exception e) {
				int preSize = kyeStrs.size();
				boolean endKeyFlag = false;
				if (StringUtil.equals(page.getCurrentEndKey(), "*")) {
					endKeyFlag = true;
				}
				if (StringUtil.equals(historyFlag, "mounts")) {
					page = takeService.queryCarTake(startDate, endDate, mountList, platesList, directionList, hpys,carBrand,carType,carYear, page);
				} else {
					page = takeService.queryCarTakeWithFxbh(startDate, endDate, mountList, platesList, directionList, hpys,carBrand,carType,carYear, page);
				}
				int nowSize = page.getPageStartKeys().size();
				if (preSize == nowSize && endKeyFlag) {
					lastPage = "last";
				}
				dataMap.put("startKeys", page.getPageStartKeys());
				admin.putInCache(searchParam.get("userCode"), dataMap);
			}
		}
		
		//如果是无牌车查询，过滤查询结果中有车牌的车
		if("nullCar".equals(searchParam.get("searchType"))){
			List<CarTake> carTakes = page.getResult();
			int carTakesCount = carTakes.size();
			List<CarTake> nullCarTakes = new ArrayList<CarTake>();
			for(int i = 0 ; i < carTakesCount; i++){
				//- 无牌 无车牌 — 车牌
				CarTake carTake = carTakes.get(i);
				String hpbm = carTake.getHphm();
				if(hpbm.startsWith("-") || hpbm.startsWith("无牌") || hpbm.startsWith("无车牌") || hpbm.startsWith("—") || hpbm.startsWith("车牌") ){
					nullCarTakes.add(carTake);
					//System.out.println(hpbm);
				}
			}
			page.setResult(nullCarTakes);
		}
	
		
		
		return page;
	}
	
	/**
	 * 车库查询
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/query/mulit/historyCarSource")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'车库查询'",content="'车牌号码:' + getWebParamInfo().get('carFNum')",needPersist= true,operation="SEARCH")
	public Object queryHistoryCarSource(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> dataList = null;
		List<Map<String, String>> amounts = null;
		boolean havingFlag = false;
		//先验证是查询本地库还是全国库
		if (StringUtil.checkStr(searchParam.get("CLPP1")) || StringUtil.checkStr(searchParam.get("carColor"))  || StringUtil.checkStr(searchParam.get("carType"))) {
			havingFlag = true;
		}
		if (havingFlag) {
			dataList = fullTextSearchService.queryLoaclCarInfos(searchParam);
			amounts = fullTextSearchService.countLoaclCarInfos(searchParam);
		} else {
			if (StringUtil.checkStr(searchParam.get("carNum")) && searchParam.get("carNum").contains("粤A")) {
				dataList = fullTextSearchService.queryLoaclCarInfos(searchParam);
				amounts = fullTextSearchService.countLoaclCarInfos(searchParam);
			} else {
				Map<String, String> conditions = new HashMap<String, String>();
				if (StringUtil.checkStr(searchParam.get("carNum"))) {
					conditions.put("HPHM", searchParam.get("carNum"));
				}
				/*if (StringUtil.checkStr(searchParam.get("CLPP1"))) {
					conditions.put("CLPP1", searchParam.get("CLPP1"));
				}*/
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
				String xml = CarInfoUtils.QueryCarInfoByHPHM(conditions);
				if (StringUtil.checkStr(xml)) {
					Document doc = DocumentHelper.parseText(xml);  
					Element root = doc.getRootElement();
					Element Value = root.element("Method").element("Items").element("Item").element("Value");  
					List<Element> Rows = Value.elements("Row");  
					List<Element> Datas = null;  
					List<Map<String, String>> results = new ArrayList<Map<String, String>>();
			        Map<String, String> dataMap= null;
			        
			        int limit = StringUtil.toInt(searchParam.get("page.limit"));
			        int start = StringUtil.toInt(searchParam.get("page.start"));
			        List<Map<String, String>> filteResults = new ArrayList<Map<String, String>>();
			        
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
			        			break;
			        		}
			        	}
			        	results.add(dataMap);
			        }
			        int counts = 0;
			        if (results != null && results.size() > 0) {
			        	int endLimits = start + limit;
			        	if (results.size() > start && results.size() < (start + limit)) {
		        			endLimits = results.size();
			        	}
			        	for (int i = start; i < endLimits; i++) {
			        		filteResults.add(results.get(i));
			        	}
			        	counts = results.size();
			        } else {
			        	//如果全国库查不到就查本地库
			        	if (!StringUtil.checkStr(searchParam.get("carNum"))) {
			        		Map<String, String> param = new HashMap<String, String>();  
			        		param.put("SFZH", searchParam.get("SFZH"));
			        		param.put("JDCSYR", searchParam.get("JDCSYR"));
			        		param.put("HPZL", searchParam.get("HPZL"));
			        		param.put("CLSBDH", searchParam.get("CLSBDH"));
			        		param.put("page.start", searchParam.get("page.start"));
			        		param.put("page.limit", searchParam.get("page.limit"));
			        		List<Map<String, String>> resultDbs = fullTextSearchService.queryLoaclCarInfos(param);
			        		if (resultDbs != null && resultDbs.size() > 0) {
			        			filteResults.addAll(resultDbs);
			        		}
			        		List<Map<String, String>> countDbs = fullTextSearchService.countLoaclCarInfos(param);
			        		if (countDbs != null && countDbs.size() > 0) {
			        			counts = StringUtil.toInt(countDbs.get(0).get("COUNTS"));
			        		}
						}
			        }
			        return ResponseUtils.sendList(filteResults, counts);
				} else {
					return ResponseUtils.sendList(new ArrayList<Map<String, String>>(), 0);
				}
			}
		}
		int counts = StringUtil.toInt(amounts.get(0).get("COUNTS"));
		return ResponseUtils.sendList(dataList, counts);
	}
	
	/**
	 * 车库查询
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/query/historyCarDetail")
	@ResponseBody
	public Object queryHistoryCarSourceDetail(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		if (StringUtil.checkStr(searchParam.get("carNum")) && searchParam.get("carNum").contains("粤A")) {
			searchParam.put("carNum", searchParam.get("carNum"));
			searchParam.put("page.start", "0");
			searchParam.put("page.limit", "1");
			List<Map<String, String>> dataList = fullTextSearchService.queryLoaclCarInfos(searchParam);
			this.jsonResult.setData(dataList);
		    this.jsonResult.setNeedAlert(false);
		    return jsonResult;
		} else {
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
			String xml = CarInfoUtils.QueryCarInfoByHPHM(conditions);
			List<Map<String, String>> results = new ArrayList<Map<String, String>>();
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
	}
	/**
	 * 车库查询
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/query/getCarOperatorFlag")
	@ResponseBody
	public Object getCarOperatorFlag(Model model, HttpServletRequest request){
		Map<String,String> results=fullTextSearchService.getCarOperatorFlag(request);
		this.jsonResult.setData(results);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	
	/**
	 * 车库查询,供用户直接查询车牌库
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/query/carNumSource")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'车库查询'",content="'车牌号码:' + getWebParamInfo().get('carFNum')",needPersist= true,operation="SEARCH")
	public Object carNumSourceQuery(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> dataList = null;
		List<Map<String, String>> amounts = null;
		boolean havingFlag = false;
		//先验证是查询本地库还是全国库
		if (StringUtil.checkStr(searchParam.get("CLPP1")) || StringUtil.checkStr(searchParam.get("carColor"))  || StringUtil.checkStr(searchParam.get("carType"))) {
			havingFlag = true;
		}
		if (havingFlag) {
			dataList = fullTextSearchService.queryLoaclCarInfos(searchParam);
			amounts = fullTextSearchService.countLoaclCarInfos(searchParam);
		} else {
			if (StringUtil.checkStr(searchParam.get("carNum")) && searchParam.get("carNum").contains("粤A")) {
				String carFNum = searchParam.get("carNum").substring(0, 1);
				String carBNum = searchParam.get("carNum").substring(1, searchParam.get("carNum").length());
				searchParam.put("carFNum", carFNum);
				searchParam.put("carBNum", carBNum);
				searchParam.put("fuzzyFlag", "fuzzy");
				dataList = fullTextSearchService.queryLoaclCarInfos(searchParam);
				amounts = fullTextSearchService.countLoaclCarInfos(searchParam);
			} else {
				Map<String, String> conditions = new HashMap<String, String>();
				if (StringUtil.checkStr(searchParam.get("carNum"))) {
					conditions.put("HPHM", searchParam.get("carNum"));
				}
				/*if (StringUtil.checkStr(searchParam.get("CLPP1"))) {
					conditions.put("CLPP1", searchParam.get("CLPP1"));
				}*/
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
				String xml = CarInfoUtils.QueryCarInfoByHPHM(conditions);
				if (StringUtil.checkStr(xml)) {
					Document doc = DocumentHelper.parseText(xml);  
					Element root = doc.getRootElement();
					Element Value = root.element("Method").element("Items").element("Item").element("Value");  
					List<Element> Rows = Value.elements("Row");  
					List<Element> Datas = null;  
					List<Map<String, String>> results = new ArrayList<Map<String, String>>();
			        Map<String, String> dataMap= null;
			        
			        int limit = StringUtil.toInt(searchParam.get("page.limit"));
			        int start = StringUtil.toInt(searchParam.get("page.start"));
			        List<Map<String, String>> filteResults = new ArrayList<Map<String, String>>();
			        
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
			        int counts = 0;
			        if (results != null && results.size() > 0) {
			        	int endLimits = start + limit;
			        	if (results.size() > start && results.size() < (start + limit)) {
		        			endLimits = results.size();
			        	}
			        	for (int i = start; i < endLimits; i++) {
			        		filteResults.add(results.get(i));
			        	}
			        	counts = results.size();
			        } else {
			        	//如果全国库查不到就查本地库
			        	if (!StringUtil.checkStr(searchParam.get("carNum"))) {
			        		Map<String, String> param = new HashMap<String, String>();  
			        		param.put("SFZH", searchParam.get("SFZH"));
			        		param.put("JDCSYR", searchParam.get("JDCSYR"));
			        		param.put("HPZL", searchParam.get("HPZL"));
			        		param.put("CLSBDH", searchParam.get("CLSBDH"));
			        		param.put("page.start", searchParam.get("page.start"));
			        		param.put("page.limit", searchParam.get("page.limit"));
			        		List<Map<String, String>> resultDbs = fullTextSearchService.queryLoaclCarInfos(param);
			        		if (resultDbs != null && resultDbs.size() > 0) {
			        			filteResults.addAll(resultDbs);
			        		}
			        		List<Map<String, String>> countDbs = fullTextSearchService.countLoaclCarInfos(param);
			        		if (countDbs != null && countDbs.size() > 0) {
			        			counts = StringUtil.toInt(countDbs.get(0).get("COUNTS"));
			        		}
						}
			        }
			        return ResponseUtils.sendList(filteResults, counts);
				} else {
					return ResponseUtils.sendList(new ArrayList<Map<String, String>>(), 0);
				}
			}
		}
		int counts = StringUtil.toInt(amounts.get(0).get("COUNTS"));
		return ResponseUtils.sendList(dataList, counts);
	}
	
	 /*
	  * 跟随车分析
	  */
	@SuppressWarnings("unchecked")
	@RequestMapping("/query/findFollowCar")
	@ResponseBody
	public Object findFollowCarInfo(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		Date startDate = null;
		if (StringUtils.isEmpty(searchParam.get("mounts"))) {
			return null;
		}
		if (StringUtils.isNotEmpty(searchParam.get("startTime"))) {
			String startTime = searchParam.get("startTime").replace("T", " ");
			startDate = formatter.parse(startTime);
		}
		Date endDate = null;
		if (StringUtils.isNotEmpty(searchParam.get("endTime"))) {
			String endTime = searchParam.get("endTime").replace("T", " ");
			endDate = formatter.parse(endTime);
		}
		String carNum = "";
		if (StringUtil.checkStr(searchParam.get("carFNum"))) {
			carNum = carNum + searchParam.get("carFNum");
		}
		if (StringUtil.checkStr(searchParam.get("carBNum"))) {
			carNum = carNum + searchParam.get("carBNum");
		}
		int mintueOffset = 0;
		if (StringUtil.checkStr(searchParam.get("vilidTime"))) {
			mintueOffset = StringUtil.toInt(searchParam.get("vilidTime"));
		}
		String[] mounts = searchParam.get("mounts").split(",");
		List<String> kkbhs = new ArrayList<String>();
		for (int i = 0; i < mounts.length;  i++) {
			if (StringUtil.checkStr(mounts[i])) {
				kkbhs.add("440" + mounts[i]);
			}
		}
		int kakouTimes = StringUtil.toInt(searchParam.get("kakouTimes"));
		/*Map<String,List<CarTake>> resultMap = carTakeWSService.getFollowingCarWithOuterWS(startDate, endDate, carNum, kkbhs, mintueOffset, 0, kakouTimes); 
		Iterator it = resultMap.keySet().iterator();
		String key = null;
		List<CarTake> values = null;
		Map<String, String> map = null;
		String placeAndTime = "";
		List<Map<String, String>> results = new ArrayList<Map<String,String>>();
		Map<String, String> targetMap = new HashMap<String, String>();
		targetMap.put("carNum", carNum);
		results.add(targetMap);
		List<CarTake> targetCarInfos = resultMap.get(carNum);
		int space = 0;
		int spaceAmount = 0;
		while(it.hasNext()){
			spaceAmount = 0;
			placeAndTime = "";
			key = (String) it.next();
			values = resultMap.get(key);
			int i  = 0;
			if (values != null && values.size() > 0) {
				map = new HashMap<String, String>();
				map.put("carNum", key);
				for (int m = 0; m < values.size(); m++) {
					for (int j = 0; j < targetCarInfos.size(); j++) {
						if (StringUtil.equals(values.get(m).getKkmc(), targetCarInfos.get(j).getKkmc())) {
							space = j - (m + spaceAmount);
							break;
						}
					}
					spaceAmount = spaceAmount + space;
					i = i + 1 + space;
					map.put("image" + i, values.get(m).getTx1());
					if (StringUtil.checkStr(placeAndTime)) {
						placeAndTime += ",";
					}
					placeAndTime += values.get(m).getKkmc() + " " + DateUtil.parseToString(values.get(m).getJgsj(), "yyyy-MM-dd HH:mm:ss");
				}
				
				map.put("placeAndTime", placeAndTime);
				if (StringUtil.equals(key, results.get(0).get("carNum"))) {
					for (int j = 1; j <= values.size(); j++) {
						results.get(0).put("image" + j, map.get("image" + j));
					}
					results.get(0).put("placeAndTime", placeAndTime);
				} else {
					results.add(map);
				}
			}
		}
		if (results.size() == 1 && StringUtil.equals(results.get(0).get("carNum"), carNum)) {
			results = new ArrayList<Map<String,String>>();
		}*/
		//return ResponseUtils.sendList(results, results.size());
		return ResponseUtils.sendList(null, 0);
	}
	
	/**
	 * 重写过车频度查询
	 * @param model 模型
	 * @param request 请求
	 * @return 查询结果
	 * @throws Exception 异常
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/frequencyStatistics")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'过车频度查询'",content="'时间范围:' + getWebParamInfo().get('startTime') + '到' + getWebParamInfo().get('endTime')",needPersist= true,operation="SEARCH")
	public Object carFrequencyStatisticsInfo(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		List<Map<String, String>> resultList = this.loadAnalyzeRate(searchParam);
	    return ResponseUtils.sendList(resultList, resultList.size());
	}
	
	/**
	 * 车辆频度查询过车详细数据
	 * @param model 模型
	 * @param request 请求
	 * @return 查询结果
	 * @throws Exception 异常
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/carFrequencyDetail")
	@ResponseBody
	public Object carFrequencyDetailInfo(QueryParam param, Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		searchParam.put("carNum", searchParam.get("carNum").toUpperCase());
		Map resultMap = takeService.testSearchInfo(searchParam);
		/*int counts = 0;
		if (page.getResult().size() < StringUtil.toInt(searchParam.get("page.limit"))) {
			counts = 0;
		} else {
			counts = (StringUtil.toInt(searchParam.get("page.start")) + 1) * StringUtil.toInt(searchParam.get("page.limit")) + 1;
		}
		if (page != null) {
			if (page.getResult() != null && page.getResult().size() > 0) {
				for (int i = 0; i < page.getResult().size(); i++) {
					page.getResult().get(i).setTxsl(Long.parseLong(searchParam.get("page.start"))); //用图像数量来替换分页开始位置
				}
			}
		}*/
		List<CarTake> results = (List<CarTake>) resultMap.get("rows");
		int amounts=StringUtil.toInt(resultMap.get("total"));
		if (results == null) {
			results = new ArrayList<CarTake>();
			amounts = 0;
		}else{
			//相关车辆属性转换
			List<Map<String, String>> directionDatas = orgService.findAllDirectionInfo();
			List<Map<String, String>> deviceDatas = deviceManagerService.findAllDeviceInfo();
			List<Map<String, String>> mountDatas = bayonetManagerService.loadAllMountInfos();
			List<EnumItem> carNumColorlist = dictionaryService.getEnumListByCode("LicPlateColor"); //车牌颜色
			List<EnumItem> carNumTypelist = dictionaryService.getEnumListByCode("LicPlateType"); //号牌种类
			List<CarCategory> carCategoryList = dictionaryService.findCarCategory();//车辆种类
			if (results != null && results.size() > 0) {
				String hpysmc = "";
				String hpzlmc = "";
				String clzlmc="";
				List<CarTake> filteCarTakes = new ArrayList<CarTake>();
				for(CarTake take : results){
					if (take == null) {
						filteCarTakes.add(take);
					} else {
						clzlmc=fitCategoryName(take.getClzl(),carCategoryList);
						hpysmc = findDictionaryName(carNumColorlist, take.getHpys());
						hpzlmc = findDictionaryName(carNumTypelist, take.getHpzl());
						take.setClzl(clzlmc);
						take.setHpysmc(hpysmc);
						take.setHpzlmc(hpzlmc);
						if (mountDatas != null && mountDatas.size() > 0) {
							for (Map<String, String> dataMap : mountDatas) {
								if (StringUtil.equals(take.getKkbh(), dataMap.get("KKBH"))) {
									take.setKkmc(dataMap.get("KKMC"));
									take.setDwmc(dataMap.get("DWMC"));
									break;
								}
							}
						}
						if (directionDatas != null && directionDatas.size() > 0) {
							for (Map<String, String> dataMap : directionDatas) {
								if (StringUtil.equals(take.getFxbh(), dataMap.get("DIRECTION_NUMBER"))) {
									take.setFxmc(dataMap.get("DIRECTION_NAME"));
									break;
								}
							}
						}
						if (deviceDatas != null && deviceDatas.size() > 0) {
							for (Map<String, String> dataMap : deviceDatas) {
								if (StringUtil.equals(take.getSbbh(), dataMap.get("SBBH"))) {
									take.setSbmc(dataMap.get("SBMC"));
									break;
								}
							}
						}
					}
				}
				if (filteCarTakes != null && filteCarTakes.size() > 0) {
					results.removeAll(filteCarTakes);	
				}
			}
			resultMap.put("rows", results);
		}
		return ResponseUtils.sendList(results, amounts);
	}
	
	/**
	 * 车辆类型页面名称与数据库值转换
	 * @param clzl
	 * @param carCategoryList
	 * @return
	 */
	private String fitCategoryName(String clzl,List<CarCategory> carCategoryList) {
		if(!StringUtil.checkStr(clzl)){
			return "";
		}
		if(null!=carCategoryList&&carCategoryList.size()>0){
			for(CarCategory cargory:carCategoryList){
				if(clzl.equals(cargory.getStoreValue())){
					return cargory.getDisplayValue();
				}
			}
		}
		return "";
	}

	/**
     * 获取到了对应的字典code对应的集合后，再根据值来获取对应的中文名称
     * @param list code对应的集合
     * @param value 值
     * @return 处理结果
     */
    public String findDictionaryName(List<EnumItem> list, String value) {
    	String dicName = "";
    	if (!StringUtil.checkStr(value)) {
    		return dicName;
    	}
    	if (list != null && list.size() > 0) {
			for (EnumItem en : list) {
				if (StringUtil.equals(en.getItemValue(), value)) {
					dicName = en.getItemName();
				}
			}
    	}
    	return dicName;
	}

	
	/**
	 * 车辆频度查询，查询详细数据实现
	 * @return 返回结果
	 */
	private PageEntity carFrequencyDetailData(Map<String, String> searchParam) throws Exception {
		PageEntity page = new PageEntity();
		if(searchParam.get("page.start")!=null && searchParam.get("page.limit")!=null){
		int pageNo = (StringUtil.toInt(searchParam.get("page.start")) / StringUtil.toInt(searchParam.get("page.limit"))) + 1;
		page.setPageNo(pageNo);
		page.setPageSize( StringUtil.toInt(searchParam.get("page.limit")));
		}
		Date startDate = null;
		Date endDate = null;
		if (StringUtil.equals(searchParam.get("flag"), "fullQuery")) {
			List<Map<String, String>> configs = systemConfigService.findConfigByCode("first_page_car_days");
			if (configs != null && configs.size() > 0) {
				String days = configs.get(0).get("VALUE");
				Calendar calendar = Calendar.getInstance();
				Date nowTime = calendar.getTime();
				String nowTimeStr = DateUtil.parseToString(nowTime, "yyyy-MM-dd HH:mm:ss");
				calendar.add(Calendar.DATE, -StringUtil.toInt(days));
				Date startTime = calendar.getTime();
				String startTimeStr = DateUtil.parseToString(startTime, "yyyy-MM-dd HH:mm:ss");
				searchParam.put("startTime", startTimeStr);
				searchParam.put("endTime", nowTimeStr);
				//DateUtil.parseToDate(s, style)
			}
		} else {
			if (!StringUtil.equals(searchParam.get("flag"), "query")) {
				return new PageEntity();
			}
		}
		boolean timeFlag = false;
		String[] timesArr = searchParam.get("startTime").split(" ");
		if (timesArr.length > 1) {
			if (timesArr[1].split(":").length == 3) {
				timeFlag = true;
				startDate = DateUtil.parseToDate(searchParam.get("startTime"), "yyyy-MM-dd HH:mm:ss");
				endDate = DateUtil.parseToDate(searchParam.get("endTime"), "yyyy-MM-dd HH:mm:ss");
			}
		}
		
		//对于时间的控制由于时间只能显示到时，故对开始时间和结束时间加上分秒的拼接
		if (StringUtils.isNotEmpty(searchParam.get("startTime")) && !timeFlag) {
			//String startTime = searchParam.get("startTime").replace("T", " ");
			String startTime = searchParam.get("startTime")+":00:00";
			startDate = formatter.parse(startTime);
		}
		if (StringUtils.isNotEmpty(searchParam.get("endTime")) && !timeFlag) {
			//String endTime = searchParam.get("endTime").replace("T", " ");
			String endTime = searchParam.get("endTime")+":59:59";
			endDate = formatter.parse(endTime);
		}
		String[] mounts = StringUtils.split(searchParam.get("mounts"), ",");
		List<String> mountList = new ArrayList<String>();
		if (mounts != null) {
			for (String mount : mounts) {
				if(mount.length()==15){
					mountList.add("440" + mount);
				}
			}
		}
		String[] plates = StringUtils.split(searchParam.get("carNum"), ",");
		List<String> platesList = new ArrayList<String>();
		if (plates != null) {
			for (String plateNo : plates) {
				platesList.add(plateNo);
			}
		}
		page = takeService.queryCarTake(startDate, endDate, mountList, platesList, page);
		return page;
	}
	
	/**
	 * 历史过车数据导出功能
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/exportHistoryData")
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'导出历史过车查询数据'",content="'时间范围:' + getWebParamInfo().get('startTime') + '到' + getWebParamInfo().get('endTime') + ',车牌号码:' + getWebParamInfo().get('carNum')",needPersist= true,operation="EXPORT")
	public String exportHistoryDataInfos(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		Map<String,Object> exportData=null;
		request.setAttribute(ExcelExportServiceImpl.EXCEL_PROCESSOR,"businessExportService");
	    request.setAttribute(ExcelExportServiceImpl.EXCEL_FILENAME,"历史过车信息");
	    //定义导出的字段名称
	    String[] texts = new String[] {"车牌号码","车牌颜色","车辆速度","卡口名称","方向名称","单位名称","经过时间","图像"};
	    //设定Excel单元格宽度
	    int[] widths = new int[] {10, 10, 15, 30, 30, 30, 30, 100};
	    String idstr = searchParam.get("idstr");
	     
	    if (StringUtil.isNotBlank(idstr)) {//勾选导出
	    	searchParam = RequestUtil.getMapByRequest(request);  
	 		String jsonParam = JSON.toJSONString(searchParam);//查询条件
	 		exportData=carTypeSearchService.dealWithCarTypeData(jsonParam);
	    }else{
	    	String exportType = searchParam.get("exportType");
        	if (StringUtil.checkStr(exportType)) {
        		request.setAttribute(ExcelExportServiceImpl.EXCEL_EXPORTTYPE, searchParam.get("exportType"));
        		request.setAttribute(ExcelExportServiceImpl.EXPORT_FLAG,"query");
            	request.setAttribute(ExcelExportServiceImpl.TITLE_TEXTS,texts);
            	request.setAttribute(ExcelExportServiceImpl.TITLE_WITHS,widths);
            	request.setAttribute(ExcelExportServiceImpl.CONDITION_PARAM,searchParam);
            	return "forward:/excelExport/export.mvc";
        	}
	    }
	    if(null!=exportData){
	    	List<CarTake> list=(List<CarTake>) exportData.get("rows");
		    if(list.size()>0){
		    	List<Map<String,String>> exportDatas=transDatas4Export(list);
			    this.setExcelFileName(URLEncoder.encode("导出过车信息", "UTF-8"));
			    File file = File.createTempFile("ExportDatas_" + new Date().getTime(), "tmp");
			    response.setContentType("application/vnd.ms-excel");      
			    String curentTime = DateUtil.getCurrentDateTime();
			    response.setHeader("content-disposition", "attachment;filename=ExportDatas_"+curentTime+".xls");    
			    response.setBufferSize(4096);
			    OutputStream stream = response.getOutputStream();
			    Object[] dataSource = businessExportService.exportHistoryDataSource(exportDatas);
			    this.businessExportService.outputToExcel(exportDatas, stream, texts, widths, dataSource);
			    this.inputStream = new FileInputStream(file);
		    }
	    }
	    return "";
	}
	
	/**
     * 集合数据转换
     */
	public List<Map<String,String>> transDatas4Export(List<CarTake> newResult){
    	List <Map<String,String>> datas=new ArrayList<Map<String,String>>();
    	List<EnumItem> carNumColorlist = dictionaryService.getEnumListByCode("LicPlateColor"); //车牌颜色
		Map<String, String> dataMap = null;
		if (newResult != null && newResult.size() > 0) {
			for (CarTake carTake : newResult) {
				dataMap = new HashMap<String, String>();
				dataMap.put("XXBH", carTake.getXxbh());
				dataMap.put("HPHM", carTake.getHphm());
				dataMap.put("HPYSMC", findDictionaryName(carNumColorlist,carTake.getHpys()));
				dataMap.put("CLSD", StringUtil.toString(carTake.getClsd()));
				dataMap.put("KKMC", carTake.getKkmc());
				dataMap.put("FXMC", carTake.getFxmc());
				dataMap.put("DWMC", carTake.getDwmc());
				dataMap.put("JGSJ", DateUtil.parseToString(carTake.getJgsj(), "yyyy-MM-dd HH:mm:ss"));
				dataMap.put("tx1", carTake.getTx1());
				datas.add(dataMap);
			}
		} 
		return datas;
    }
	
	/**
	 * 历史过车数据导出功能
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/exportHistoryData1")
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'导出历史过车查询数据'",content="'时间范围:' + getWebParamInfo().get('startTime') + '到' + getWebParamInfo().get('endTime') + ',车牌号码:' + getWebParamInfo().get('carNum')",needPersist= true,operation="EXPORT")
	public String exportHistoryDataInfos1(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		optFlag = "export";
		//在共用的基础上增加私有的信息
        request.setAttribute(ExcelExportServiceImpl.EXCEL_PROCESSOR,"businessExportService");
        request.setAttribute(ExcelExportServiceImpl.EXCEL_FILENAME,"历史过车信息");
        //定义导出的字段名称
        String[] texts = new String[] {"车牌号码","车牌颜色","车辆速度","卡口名称","方向名称","单位名称","经过时间","图像"};
        //设定Excel单元格宽度
        int[] widths = new int[] {10, 10, 15, 30, 30, 30, 30, 100};
        String idstr = searchParam.get("idstr");
        List<Map<String, String>> exportData = null;
        searchParam.put("page.start", searchParam.get("start"));
        searchParam.put("page.limit", searchParam.get("limit"));
        if (StringUtil.isNotBlank(idstr)) {
        	 String partIds[] = idstr.split(",");
        	 String carNums[] = searchParam.get("carNumStr").split(",");
        	 List<String> list = new ArrayList<String>();
        	 for (int  i = 0; i < carNums.length; i++) {
        		 if (!list.contains(carNums[i])) {
        			 list.add(carNums[i]);
        		 }
        	 }
        	 String carNumStr = "";
        	 for (int j = 0; j < list.size(); j++) {
        		 if (carNumStr != "") {
        			 carNumStr += ",";
        		 }
        		 carNumStr += list.get(j);
        	 }
        	 searchParam.put("carNum", carNumStr);
             exportData = this.exportHistoryDataByXxbh(searchParam, partIds, request);
        } else {
        	String exportType = searchParam.get("exportType");
        	if (StringUtil.checkStr(exportType) && StringUtil.equals(exportType, "async")) {
        		request.setAttribute(ExcelExportServiceImpl.EXCEL_EXPORTTYPE, searchParam.get("exportType"));
            	request.setAttribute(ExcelExportServiceImpl.TITLE_TEXTS,texts);
            	request.setAttribute(ExcelExportServiceImpl.TITLE_WITHS,widths);
            	request.setAttribute(ExcelExportServiceImpl.CONDITION_PARAM,searchParam);
            	return "forward:/excelExport/export.mvc";
        	}
        	exportData = this.exportHistoryDataByXxbh(searchParam, null, request);
        }
        /* 输出成为Excel */
        this.setExcelFileName(URLEncoder.encode("历史过车信息", "UTF-8"));
        File file = File.createTempFile("history" + new Date().getTime() + "_", "tmp");
        response.setContentType("application/vnd.ms-excel");      
        String curentTime = DateUtil.getCurrentDateTime();
        response.setHeader("content-disposition", "attachment;filename=" + excelFileName + curentTime + ".xls");    
        response.setBufferSize(4096);
        OutputStream stream = response.getOutputStream();
//        Object[] dataSource = businessExportService.exportHistoryDataSource(exportData);
//        this.businessExportService.outputToExcel(exportData, stream, texts, widths, dataSource);
        this.inputStream = new FileInputStream(file);
        return "";
    }
	
	/**
	 * 过车频度数据导出功能
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/exportFrequencyData")
	public String exportFrequencyDataInfos(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		//在共用的基础上增加私有的信息
        request.setAttribute(ExcelExportServiceImpl.EXCEL_PROCESSOR,"businessExportService");
        request.setAttribute(ExcelExportServiceImpl.EXCEL_FILENAME,"过车频度信息");
        //定义导出的字段名称
        String[] texts = new String[] {"车牌号码","经过次数"};
        //设定Excel单元格宽度
        int[] widths = new int[] {20, 15};
        String carNumStr = searchParam.get("carNumStr");
        List<Map<String, String>> exportData = this.loadAnalyzeRate(searchParam);
        Collections.sort(exportData, new Comparator<Map<String, String>>() { 
            public int compare(Map<String, String> o1, Map<String, String> o2) { 
            	return o2.get("passTimes").compareTo(o1.get("passTimes"));
            } 
        });
        List<Map<String, String>> checkedData = new ArrayList<Map<String,String>>();
        if (StringUtil.checkStr(carNumStr)) {
        	 String carNums[] = carNumStr.split(",");
        	 for (Map<String, String> dataMap : exportData) {
        		 for (int  i = 0; i < carNums.length; i++) {
            		 if (StringUtil.equals(dataMap.get("carNum"), carNums[i])) {
            			 checkedData.add(dataMap);
            		 }
            	 }
        	 }
        }
        /* 输出成为Excel */
        this.setExcelFileName(URLEncoder.encode("过车频度信息", "UTF-8"));
        File file = File.createTempFile("analyze" + new Date().getTime() + "_", "tmp");
        response.setContentType("application/vnd.ms-excel");      
        String curentTime = DateUtil.getCurrentDateTime();
        response.setHeader("content-disposition", "attachment;filename=" + excelFileName + curentTime + ".xls");    
        response.setBufferSize(4096);
        OutputStream stream = response.getOutputStream();
        Object[] dataSource = null;
        if (checkedData.size() > 0) {
        	dataSource = businessExportService.exportAnalyzeDataSource(checkedData);
//        	this.businessExportService.outputToExcel(checkedData, stream, texts, widths, dataSource);
        } else {
        	dataSource = businessExportService.exportAnalyzeDataSource(exportData);
//        	this.businessExportService.outputToExcel(exportData, stream, texts, widths, dataSource);
		}
        this.inputStream = new FileInputStream(file);
        return "";
	}
	
	/**
	 * 加载过车频度信息
	 * @param param
	 * @param request
	 * @return 查询结果
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, String>> loadAnalyzeRate(Map<String, String> searchParam) throws Exception {
		QueryParam param = new QueryParam();
		if (!StringUtil.checkStr(searchParam.get("kkbhs"))) {
			return null;
		}
		param.setMount("440" + searchParam.get("kkbhs"));
		param.setStartDate((searchParam.get("startTime")+":00:00"));
		param.setEndDate((searchParam.get("endTime")+":59:59"));
		E queryParam = (E) BeanIntrospectorUtils.desc(param);
		List result = null;
	    if (!StringUtils.isEmpty(param.getMount())) {
	    	result = this.service.analyzeRate(queryParam);
	    }
	    Collection datas = ((Map)result.get(0)).values();
	    List<Map<String, String>> resultList = new ArrayList<Map<String,String>>();
	    Map<String, String>  dataMap = null;
	    CarAssemble carAssemble = null;
	    if (datas != null && datas.size() > 0) {
	    	Iterator iterator = datas.iterator();
	    	while (iterator.hasNext()) {
	    		carAssemble = (CarAssemble) iterator.next();
	    		if (carAssemble.getNumber() >= StringUtil.toInt(searchParam.get("carCounts"))) {
		    		dataMap = new HashMap<String, String>();
		    		dataMap.put("carNum", carAssemble.getPlateNo());
		    		dataMap.put("carType", carAssemble.getType());
		    		dataMap.put("passTimes", StringUtil.toString(carAssemble.getNumber()));
		    		resultList.add(dataMap);
	    		}
			}
	    }
	    return resultList;
	}
	
	/**
	 * 通过信息编号获取导出的数据
	 * @param searchParam 查询条件
	 * @param partIds 信息编号
	 * @return 处理结果
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, String>> exportHistoryDataByXxbh(Map<String, String> searchParam, String[] partIds, HttpServletRequest request) throws Exception {
		List<Map<String, String>> datas = new ArrayList<Map<String,String>>();
		PageEntity page = this.historyQueryData(searchParam);
		List<Map<String, String>> hotRecodes = hotRecodeService.queryHotRecodes(null);
		List<CarTake> filteTakes = new ArrayList<CarTake>();
		//联网平台放权限修改
		List<Map<String, String>> roleInfos=null;
		Map<String, Object> userMap = (Map<String, Object>) request.getSession().getAttribute(AbstractController.SESSION_USER);
		if(userMap !=null && userMap.get("ROLE_ID")!=null){
			String roleId = userMap.get("ROLE_ID").toString();
			 roleInfos = dictionaryService.findRoleInfo(roleId);
		}
		if (page != null && roleInfos != null && roleInfos != null && roleInfos.size() > 0 && !roleInfos.get(0).get("ROLE_NAME").contains("超级管理员")) {
			if (page.getResult() != null && page.getResult().size() > 0) {
				Date jgsjDate = null;
				String jgsjTime = "";
				String startTime = "";
				String endTime = ""; 
				for (int i = 0; i < page.getResult().size(); i++) {
					jgsjDate = page.getResult().get(i).getJgsj();
					jgsjTime = DateUtil.parseToString(jgsjDate, "yyyy-MM-dd HH:mm:ss");
					if (hotRecodes != null && hotRecodes.size() > 0) {
						for (Map<String, String> hotMap : hotRecodes) {
							startTime = hotMap.get("START_DATE");
							endTime = hotMap.get("END_DATE");
							int startFlag = DateUtil.getTwoTimeDay(startTime, jgsjTime);
							int endFlag = DateUtil.getTwoTimeDay(jgsjTime, endTime);
							if (StringUtil.equals(page.getResult().get(i).getHphm(), hotMap.get("CAR_NUM"))
									&& startFlag >= 0 && endFlag >= 0) {
								if (!StringUtil.checkStr(hotMap.get("KKBHS"))) {
									filteTakes.add(page.getResult().get(i));
								} else if (hotMap.get("KKBHS").indexOf(page.getResult().get(i).getKkbh()) != -1) {
									filteTakes.add(page.getResult().get(i));
								}
							}
						}
					}
					page.getResult().get(i).setTxsl(Long.parseLong(searchParam.get("page.start"))); //用图像数量来替换分页开始位置
					page.getResult().get(i).setCscd(Long.parseLong(page.getResult().size() + "")); //以车上长度代表数据量
				}
			}
			page.getResult().removeAll(filteTakes);
		}
		List<CarTake> newResult = page.getResult();
		Map<String, String> dataMap = null;
		//String clsd = "0";
		if (newResult != null && newResult.size() > 0) {
			for (CarTake carTake : newResult) {
				if (partIds != null) {
					for (int i = 0; i < partIds.length; i++) {
						if (StringUtil.equals(carTake.getXxbh(), partIds[i])) {
							dataMap = new HashMap<String, String>();
							dataMap.put("XXBH", carTake.getXxbh());
							dataMap.put("HPHM", carTake.getHphm());
							dataMap.put("HPYSMC", carTake.getHpysmc());
							dataMap.put("CLSD", StringUtil.toString(carTake.getClsd()));
							dataMap.put("KKMC", carTake.getKkmc());
							dataMap.put("FXMC", carTake.getFxmc());
							dataMap.put("DWMC", carTake.getDwmc());
							dataMap.put("JGSJ", DateUtil.parseToString(carTake.getJgsj(), "yyyy-MM-dd HH:mm:ss"));
							dataMap.put("tx1", carTake.getTx1());
							datas.add(dataMap);
							break;
						}
					}
				} else {
					dataMap = new HashMap<String, String>();
					dataMap.put("XXBH", carTake.getXxbh());
					dataMap.put("HPHM", carTake.getHphm());
					dataMap.put("HPYSMC", carTake.getHpysmc());
					dataMap.put("CLSD", StringUtil.toString(carTake.getClsd()));
					dataMap.put("KKMC", carTake.getKkmc());
					dataMap.put("FXMC", carTake.getFxmc());
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
	 * 通过查询条件获取图片下载信息
	 * @param searchParam 查询条件
	 * @param partIds 信息编号
	 * @return 处理结果
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, String>> getPicturesByQuery(Map<String, String> searchParam) throws Exception {
		List<Map<String, String>> datas = new ArrayList<Map<String,String>>();
		Map<String, Object> resultMap = takeService.testSearchInfo(searchParam);
		List<CarTake> newResult = (List<CarTake>) resultMap.get("rows");;
		Map<String, String> dataMap = null;
		if (newResult != null && newResult.size() > 0) {
			for (CarTake carTake : newResult) {
				if(carTake !=null){
					dataMap = new HashMap<String, String>();
					dataMap.put("XXBH", carTake.getXxbh());
					dataMap.put("HPHM", carTake.getHphm());
					dataMap.put("HPYSMC", carTake.getHpysmc());
					dataMap.put("CLSD", StringUtil.toString(carTake.getClsd()));
					dataMap.put("KKBH", carTake.getKkbh());
					dataMap.put("KKMC", carTake.getKkmc());
					dataMap.put("FXMC", carTake.getFxmc());
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
	 * 过车数据导出管理页面
	 * @param model
	 * @param request
	 * @param response
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/exportManger")
	@ResponseBody
	public Object exportMangerQuery(Model model, HttpServletRequest request, HttpServletResponse response) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		Map<String, Object> userMap = userService.getCurrentUser(request);
		if (StringUtil.checkObj(userMap.get("USER_CODE"))) {
			searchParam.put("userCode", StringUtil.toString(userMap.get("USER_CODE")));
		}
		List<Map<String, String>> results = service.exportMangerQuery(searchParam);
		List<Map<String, String>> counts = service.countExportMangerDatas(searchParam);
		int amounts = StringUtil.toInt(counts.get(0).get("COUNTS"));
		return ResponseUtils.sendList(results, amounts);
	}
	
	/**
	 * 删除导出文件
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/deleteExport")
	@ResponseBody
	public Object deleteExportInfo(Model model, HttpServletRequest request, HttpServletResponse response) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String idStr = searchParam.get("id");
		try {
			this.exportService.deleteExport(idStr, request.getSession());
		} catch (Exception e) {
			this.jsonResult.setData(false);
		}
		this.jsonResult.setNeedAlert(false);
		this.jsonResult.setData(true);
		return jsonResult;
	}
	
	/**
	 * 删除下载文件
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/deleteDownload")
	@ResponseBody
	public Object deleteDownloadInfo(Model model, HttpServletRequest request, HttpServletResponse response) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String idStr = searchParam.get("id");
		try {
			this.exportService.deleteDownload(idStr, request.getSession());
		} catch (Exception e) {
			this.jsonResult.setData(false);
		}
		this.jsonResult.setNeedAlert(false);
		this.jsonResult.setData(true);
		return jsonResult;
	}

	/**
	 * 取消导出文件
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/stopExport")
	@ResponseBody
	public Object stopExportInfo(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String idStr = searchParam.get("id");
		Map<String, String> result = new HashMap<String, String>();
		List<Map<String, String>> itemDatas = this.exportService.findExportItemsById(idStr);
		Map<String, String> status = itemDatas.get(0);
		if (StringUtil.toInteger(status.get("STATUS")) != ExportStatus.PROCESSING_STATUS) {
			result.put("result", "fail");
			result.put("msg", "导出未处于进行状态，无法取消！");

		} else {
			status.put("STATUS", ExportStatus.CANCEL_STATUS + "");
			this.exportService.updateExportStatus(status);
			result.put("result", "success");
			result.put("msg", "取消成功！");
		}
		this.jsonResult.setNeedAlert(false);
		this.jsonResult.setData(result);
		return jsonResult;
	}
	
	/**
	 * 取消文件下载
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/stopDownload")
	@ResponseBody
	public Object stopDownloadInfo(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String idStr = searchParam.get("id");
		Map<String, String> result = new HashMap<String, String>();
		List<Map<String, String>> itemDatas = this.exportService.getImageStatusById(idStr);
		Map<String, String> status = itemDatas.get(0);
		if (StringUtil.toInteger(status.get("STATUS")) != 0) {
			result.put("result", "fail");
			result.put("msg", "导出未处于进行状态，无法取消！");

		} else {
			status.put("STATUS", "3");
			this.exportService.updateDownloadStatus(status);
			result.put("result", "success");
			result.put("msg", "取消成功！");
		}
		this.jsonResult.setNeedAlert(false);
		this.jsonResult.setData(result);
		return jsonResult;
	}

	/**
	 * 清空导出数据
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/clearnExport")
	@ResponseBody
	public Object clearnExportInfo(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String[] ids = null;
		if (StringUtil.checkStr(searchParam.get("ids"))) {
			ids = searchParam.get("ids").split(",");
		}
		String idStr = "";
		if (ids != null) {
			for (int i = 0; i < ids.length; i++) {
				if (StringUtil.checkStr(idStr)) {
					idStr = idStr + ",";
				}
				idStr = idStr + "'" + ids[i] + "'";
			}
		}
		this.exportService.clearnExportInfo(idStr, request, request.getSession());
		this.jsonResult.setNeedAlert(false);
		this.jsonResult.setData(true);
		return jsonResult;
	}
	
	/**
	 * 清空图片下载数据
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/clearnDownload")
	@ResponseBody
	public Object clearnDownloadInfo(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String[] ids = null;
		if (StringUtil.checkStr(searchParam.get("ids"))) {
			ids = searchParam.get("ids").split(",");
		}
		String idStr = "";
		if (ids != null) {
			for (int i = 0; i < ids.length; i++) {
				if (StringUtil.checkStr(idStr)) {
					idStr = idStr + ",";
				}
				idStr = idStr + "'" + ids[i] + "'";
			}
		}
		this.exportService.clearnDownloadInfo(idStr, request, request.getSession());
		this.jsonResult.setNeedAlert(false);
		this.jsonResult.setData(true);
		return jsonResult;
	}
	
	/**
	 * 导入车牌号码数据
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping("/importCarNumExcel")
	@ResponseBody
	public void importCarNumExcelInfo(Model model, MultipartHttpServletRequest request, HttpServletResponse response) throws Exception {
		MultipartFile file = (MultipartFile) request.getFile("carNumExcel");
		List<Map<String, String>> datas = null;
		try {
			// 解析文件，得到 List
			datas = this.takeService.parseCarNumExcel(file);
		} catch (Exception e) {
			e.printStackTrace();
			BaseException baseException = new BaseException();
            baseException.setMessage("文件格式错误,错误代码如下：<br>" + e.getMessage());
            throw baseException;
		}
		datas.get(0).put("msg", "导入车牌号码成功,您一共导入了" + datas.size() + "个车牌号码。");
		response.reset();
		response.setContentType("text/html;charset=UTF-8");  
		PrintWriter out = response.getWriter();
		String carNumStr = "";
		if (datas != null && datas.size() > 0) {
			for (Map<String, String> map : datas) {
				if (StringUtil.checkStr(carNumStr)) {
					carNumStr = carNumStr + ",";
				}
				carNumStr = carNumStr + map.get("carNumStr");
			}
		}
		out.print(carNumStr);
		out.flush();
		out.close();
	}
	
	/**
	 * 图片数据下载管理页面
	 * @param model
	 * @param request
	 * @param response
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/imageManger")
	@ResponseBody
	public Object imageMangerQuery(Model model, HttpServletRequest request, HttpServletResponse response) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		Map<String, Object> userMap = userService.getCurrentUser(request);
		if (StringUtil.checkObj(userMap.get("USER_CODE"))) {
			searchParam.put("userCode", StringUtil.toString(userMap.get("USER_CODE")));
		}
		List<Map<String, String>> results = service.imageMangerQuery(searchParam);
		List<Map<String, String>> counts = service.countimageMangerDatas(searchParam);
		int amounts = StringUtil.toInt(counts.get(0).get("COUNTS"));
		return ResponseUtils.sendList(results, amounts);
	}
	
	/**
     * 通过用户勾选图片的ID，获取图片URL
     * 传进啦的值只有carNum,id和图片下载路径
     * 这个是实现一天信息中只有单张图片的下载
     * @author jzxie
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/loadCarQueryAnalyzeImgUrlByIds")
	@ResponseBody
    public Object loadImgUrlByIds(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		//获取页面传进来的参数
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		optFlag = "image";
		//这是获取session
	    request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		Map<String, Object> userMap = (Map<String, Object>)(request.getSession().getAttribute(AbstractController.SESSION_USER));
		//联网平台放权限修改
		String userCode="admin";
		if(userMap !=null){
			userCode = userMap.get("USER_CODE").toString();//USER_NAME=超级管理员
		}
		//生成UUID
		//String uuid = UUID.randomUUID().toString();
		//String uidSub =  uuid.substring(0,8)+uuid.substring(9,13)+uuid.substring(14,18)+uuid.substring(19,23)+uuid.substring(24); 
		//生成时间和格式化时间
		SimpleDateFormat time=new SimpleDateFormat("yyyyMMddHHmmss");
		String date =time.format(new Date()); 
		
		//获取tomcat的根目录webapp目录
		String downLoadUrl = this.getClass().getClassLoader().getResource("").getPath();
		//保存文件夹的拼接和创建
		//String saveZipUrl = new File(downLoadUrl).getParentFile().getParentFile().getParentFile()+File.separator+userCode+File.separator+uidSub;
		String idstr = searchParam.get("idstr");
		String httpUrls = searchParam.get("url");
		String carNum= searchParam.get("carNum");
		String jgsj= searchParam.get("jgsj");
		String kkbh= searchParam.get("kkbh");
		//联网平台放权修改
		if(carNum ==null){
			carNum="";
		}
		String downFlag = searchParam.get("flag");
		if (StringUtil.equals(downFlag, "query")) {
			searchParam.put("page.start", "0");
	        searchParam.put("page.limit", "1000");
		//	List<Map<String, String>> queryData = this.exportHistoryDataByXxbh(searchParam, null, request);
	        List<Map<String, String>> queryData = this.getPicturesByQuery(searchParam);
			if (queryData != null && queryData.size() > 0) {
				idstr = "";
				carNum = "";
				httpUrls = "";
				jgsj="";
				kkbh="";
				
				for (Map<String, String> dataMap : queryData) {
					if (idstr != "") {
						idstr = idstr + ",";
						httpUrls = httpUrls + ",";
						carNum = carNum + ",";
						jgsj = jgsj + ",";
						kkbh = kkbh + ",";
					}
					idstr = idstr + dataMap.get("XXBH");
					httpUrls = httpUrls + dataMap.get("tx1");
					carNum = carNum + dataMap.get("HPHM");
					jgsj = jgsj + dataMap.get("JGSJ");
					kkbh = kkbh + dataMap.get("KKBH");
				}
			}
		}
		boolean flag = false;
		String dataFlag = "SYNC"; //默认同步导出
		Map<String, String> imageParam = new HashMap<String, String>();
		boolean isCancel = false;
		File file= this.createAndGetDownloadFolder(request.getSession());
		if (StringUtil.isNotBlank(idstr)) {
			if(StringUtil.isNotBlank(httpUrls)){
				//存储xxbh的数组
				String[] ids = idstr.trim().split(",");
				//存储图片地址的数组
				String[] imageUrls = httpUrls.trim().split(",");
				//汽车车牌
				String[] carNumber =carNum.split(",");
				//经过时间
				String[] jgsjArray =jgsj.split(",");
				
				//卡口编号
				String[] kkbhArray =kkbh.split(",");
				
				String httpUrl = null;
				String pictureId =null;
	        	//压缩保存的路径
	        	String fileUrl = date+".zip";
	        	ZipOutputStream out = new ZipOutputStream(new FileOutputStream(file.getPath()+File.separator + fileUrl));
	        	out.setEncoding("gb2312");
	        	InputStream in = null;
	        	CompressHelper helperZip = new CompressHelper();
	        	if  (ids.length > 15) {
	        		dataFlag = "ASYN";
	        		String uniqueId = UUID.randomUUID() + "";
	        		imageParam.put("id", uniqueId);
	        		imageParam.put("userCode", userCode);
	        		imageParam.put("status", "0"); //正在下载
	        		imageParam.put("type", dataFlag); //表示异步下载
	        		imageParam.put("fileName", fileUrl);
	        		imageParam.put("startTime", DateUtil.getCurrentDateTime());
	        		exportService.saveAsynDownloadImage(imageParam);
	        	}
	        	
	        	List<String[]> idRsults = new ArrayList<String[]>();
	        	List<String[]> urlRsults = new ArrayList<String[]>();
	        	List<String[]> carNumRsults = new ArrayList<String[]>();
	        	int arrLength = 15;
	        	String[] idsArr = new String[arrLength];
	        	String[] urlsArr = new String[arrLength];
	        	String[] carNumsArr = new String[arrLength];
	    		int imageNumber = 15;
	    		int count = 0;
	    		for(int m = 0; m < ids.length; m++){
	    			if (m != 0 && m%imageNumber == 0) {
	    				idRsults.add(idsArr);
	    				urlRsults.add(urlsArr);
	    				carNumRsults.add(carNumsArr);
	    				idsArr = new String[arrLength];
	    				urlsArr = new String[arrLength];
	    				carNumsArr = new String[arrLength];
	    				count = 0;
	    			}
	    			idsArr[count] = ids[m];
	    			urlsArr[count] = imageUrls[m];
	    			carNumsArr[count] = carNumber[m];
	    			count++;
	    		}
	    		if (idsArr != null && idsArr.length > 0) {
	    			idRsults.add(idsArr);
	    			urlRsults.add(urlsArr);
    				carNumRsults.add(carNumsArr);
	    		}
	    		//同步图片下载
	        	if (StringUtil.equals(dataFlag, "SYNC")) {
	        		if(ids.length>0 && imageUrls.length>0){
						//下载地址和保存地址的操作
			            for(int i=0;i<imageUrls.length;i++){
	            			//这是图片下载路径
	            			httpUrl = imageUrls[i];
	            			//保存之后的图片命名已经包括后缀名
	            			if(httpUrl.lastIndexOf(".jpg")==-1 && httpUrl.lastIndexOf(".JPG")==-1){
	            				httpUrl=httpUrl+".jpg";
	            			}
	            			if(jgsjArray[i]!=null){
		            			//时间转换yyyymmddHHmmss格式
		            			String numJgsj=DateUtil.parseToString(jgsjArray[i],"yyyy-MM-dd HH:mm:ss","yyyyMMddHHmmss");
		            			//下载之后的图片名称!
		            			pictureId = numJgsj+"-"+kkbhArray[i]+"-"+ids[i]+"-"+carNumber[i]+httpUrl.substring(httpUrl.lastIndexOf("."));
	            			}else{
	            				//下载之后的图片名称!
		            			pictureId = ids[i]+"-"+carNumber[i]+httpUrl.substring(httpUrl.lastIndexOf("."));
	            			}
	            			System.out.println("httpUrl=="+httpUrl);
	            			//图片写入流
	            			try {
	            				 String fileName =httpUrl.substring(httpUrl.lastIndexOf("/")+1,httpUrl.lastIndexOf("."));
	                    		 String headUrl=httpUrl.substring(0,httpUrl.lastIndexOf("/")+1);
	                    		 String newUrl=headUrl+java.net.URLEncoder.encode(fileName,"utf-8")+".jpg";
	            				HttpURLConnection conn= (HttpURLConnection) new URL(newUrl).openConnection();

//	            				conn.setDoInput(true);
//	            				conn.setUseCaches(false);
//	            				conn.setInstanceFollowRedirects(false);
	            				int state = conn.getResponseCode();
	            				if (state != 404) {
	            					//conn.getInputStream();
		            				in = conn.getInputStream();
			                		//打包成压缩包
			                		helperZip.zip(out, in,"Image/", pictureId);
			                		//刷新
			                		out.flush();
			                		flag = true;
	            				}
							} catch (Exception e) {
								flag = false;
								e.printStackTrace();
							}
			             }
			             if (in != null) {
			            	 in.close();
			             }
			             out.close();
					}
	        	} else {
					//异步图片下载
	        		int failCounts = 0;
	        		for (int j = 0; j < idRsults.size(); j++) {
	        			ids = idRsults.get(j);
	        			imageUrls = urlRsults.get(j);
	        			carNumber = carNumRsults.get(j);
	        			if(exportService.isUserCancelDownload(imageParam.get("id"))) {
                            isCancel = true;
                            break;
                        }
	        			if(ids.length>0 && imageUrls.length>0){
							//下载地址和保存地址的操作
				            for(int i=0;i<imageUrls.length;i++){
				            	if (imageUrls[i] != null) {
				            		//这是图片下载路径
			            			httpUrl = imageUrls[i];
			            			//保存之后的图片命名已经包括后缀名
			            			if(httpUrl.lastIndexOf(".jpg")==-1 && httpUrl.lastIndexOf(".JPG")==-1){
			            				httpUrl=httpUrl+".jpg";
			            			}
			            			//下载之后的图片名称
			            			pictureId = jgsjArray[i]+"-"+kkbhArray[i]+"-"+ids[i]+"-"+carNumber[i]+httpUrl.substring(httpUrl.lastIndexOf("."));
			                		//图片写入流
			            			try {
			            				String fileName =httpUrl.substring(httpUrl.lastIndexOf("/")+1,httpUrl.lastIndexOf("."));
			                    		String headUrl=httpUrl.substring(0,httpUrl.lastIndexOf("/")+1);
			                    		String newUrl=headUrl+java.net.URLEncoder.encode(fileName,"utf-8")+".jpg";
			            				HttpURLConnection conn= (HttpURLConnection) new URL(newUrl).openConnection();
			            				int state = conn.getResponseCode();
			            				if (state != 404) {
			            					//conn.getInputStream();
				            				in = conn.getInputStream();
					                		//打包成压缩包
					                		helperZip.zip(out, in,"Image/", pictureId);
					                		//刷新
					                		out.flush();
					                		flag = true;
			            				}
									} catch (Exception e) {
										flag = false;
										failCounts += 1;
										if (StringUtil.equals(dataFlag, "ASYN") && failCounts == 1) {
											imageParam.put("endTime", DateUtil.getCurrentDateTime());
											imageParam.put("status", "2"); //错误
											imageParam.put("msg", "图片下载失败或者只下载不完整，存在无法访问的图片"+e.getMessage());
											exportService.updateDownloadImag(imageParam);
										}
									}
				            	}
				             }
						}
	        		 }
	        		 if (in != null) {
		            	 in.close();
		             }
		             out.close();
				}
			}
        } 
		String fanwenUrl = "";
		if (flag && StringUtil.equals(dataFlag, "SYNC")) {
			fanwenUrl = "http://"+request.getLocalAddr()+":"+request.getLocalPort() + request.getContextPath() + "/" + "image/download/" +date+".zip";
			return fanwenUrl;
		} else if (StringUtil.equals(dataFlag, "ASYN")) {
			imageParam.put("endTime", DateUtil.getCurrentDateTime());
			if (isCancel) {
				imageParam.put("status", "3");
			} else {
				imageParam.put("status", "1");
			}
			exportService.updateDownloadImag(imageParam);
			return "success";
		} else {
			return "faild";
		}
	}
	
	/**
     * 初始化话文件对象
     * @param session 会话
     * @return 返回结果
     */
    public File createAndGetDownloadFolder(HttpSession session){
        ServletContextResource contextResource = new ServletContextResource(session.getServletContext(), "image/download");
        File folder =null;
        try {
            folder = contextResource.getFile();
            if (!folder.exists()) {
                folder.mkdirs();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return folder;
    }
    
	/**
     * 通过用户勾选图片的ID，获取图片URL
     * 只是根据id进行查询同时进行多张图片下载
     * 这个是针对同一行信息中的多张图片的下载
     * @author jzxie
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/CarQueryImgUrlById")
	@ResponseBody
    public Object loadImgUrlByIdInCar(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
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
		
		
		String idstr = searchParam.get("idstr");
		if (StringUtil.isNotBlank(idstr)) {
				//存储xxbh的数组
				String[] ids = idstr.trim().split(",");
				
				List<Map<String, String>> result = service.getPictureURLInCarQuery(searchParam);
				
					String txjpg =null;
					//判断路径是否存在，不存在就创建一个
		        	File file= new File(saveZipUrl);
		        	if(!file.exists()){
		        		file.mkdirs();//一次可创建一个或多个文件夹
		        	}
		        	//压缩保存的路径
		        	ZipOutputStream out = new ZipOutputStream(new FileOutputStream(saveZipUrl+File.separator+date+".zip"));
		        	InputStream in = null;
		        	CompressHelper helperZip = new CompressHelper();
		        	
					//执行下载和保存地址的操作
					for(Map<String,String> param:result){
							List<String> arryList = new ArrayList<String>();
							List<String> carNumber = new ArrayList<String>();
						    //将图片存入list中
							arryList.add(param.get("TX1").toString());
							arryList.add(param.get("TX2").toString());
							carNumber.add(param.get("HPHM").toString());
							int j = 0;
							for(int k=0;j<carNumber.size();j++){
								j=0;
								//将图片路径进行循环读取
				        		for(int i=0;i<arryList.size();i++){
				        			++j;
				        			//对图片后缀名缺失的处理
				        			String httpUrl = arryList.get(i).toString();
				        			int aa = httpUrl.lastIndexOf(".jpg");
				        			if(httpUrl.lastIndexOf(".jpg")==-1 && httpUrl.lastIndexOf(".JPG")==-1){
				        				httpUrl = httpUrl+".jpg";
				        			}
				        			//下载之后的图片名称
				        			txjpg = String.valueOf(param.get("ID"))+"TX"+j+"-"+carNumber.get(k).toString()+httpUrl.substring(httpUrl.lastIndexOf("."));
				        			//图片写入流
				        			in = new URL(arryList.get(i).toString()).openConnection().getInputStream();
				        			//要保存的路径
				        			//String urlTx =arryList.get(i).toString().substring(arryList.get(i).toString().lastIndexOf("/")+1,arryList.get(i).toString().lastIndexOf("."))+"-"+txjpg;
				        			//见图片压缩
				        			helperZip.zip(out, in,"Image/", txjpg);
				        		}
				        		//刷新
				                out.flush();
							}
							
					}
					in.close();
		            out.close();
				}
		 //动态后去用户计算机的端口和Ip地址
		 String fanwenUrl = "http://"+request.getLocalAddr()+":"+request.getLocalPort()+"/"+userCode+File.separator+uidSub+File.separator+date+".zip";
         return fanwenUrl;
		}
/**
 * 对识别车辆进行圈定设置	
 * @param request
 * @param response
 * @return
 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/editImage")
	@ResponseBody
	public boolean editImage(HttpServletRequest request, HttpServletResponse response){
		//获取页面传进来的参数
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);
		String picUrl=searchParam.get("url");
		String rect=searchParam.get("rect");
		int x=0;
		int y=0;
		int w=0;
		int h=0;
		if(picUrl ==null){
			picUrl="http://172.31.108.52:8080/Image/111.jpg";
		}
		if(rect !=null && rect.contains(",")){
			String[] rects=rect.split(",");
			x=Integer.parseInt(rects[0]);
			y=Integer.parseInt(rects[1]);
			w=Integer.parseInt(rects[2]);
			h=Integer.parseInt(rects[3]);
		}
		try {
			BufferedImage imageBuf = ImageIO.read(new URL(picUrl));
			if(x>0){
				Graphics2D g=imageBuf.createGraphics();
				g.setColor(Color.red);
				g.setStroke(new BasicStroke(5.0f));
				g.drawRect(x,y, w, h);
				g.dispose();
			}
			// 输出图象到页面
			return ImageIO.write(imageBuf, "JPEG", response.getOutputStream());
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return false;
	}
	/**
	 * 网咯下载图片的方法
	 * @author jzxie
	 * @param downLoadUrl
	 * @param saveUrl
	 * @return
	 */
//	public Boolean downLoadImage(String downLoadUrl,String saveUrl){
//		FileOutputStream  fs = null;
//		InputStream instream = null;
//		URL url = null;
//		HttpURLConnection conn = null;
//		try {
//			url = new URL(downLoadUrl);
//		    conn = (HttpURLConnection) url.openConnection();
//			conn.setRequestMethod("POST");
//			conn.setConnectTimeout(10*1000);
//		    instream = conn.getInputStream();
//			byte[] date = readInputStream(instream);
//			//获取网咯地址的图片名称
//			String httpPath = downLoadUrl.substring(downLoadUrl.lastIndexOf("/")+1,downLoadUrl.lastIndexOf("."));
//			//处理整合好的图片保存路径
//			String savePath = saveUrl.substring(0,saveUrl.lastIndexOf("/")+1);
//			//拼接路径和图片名称
//			String saveInComputerUrl = savePath + httpPath+"-"+saveUrl.substring(saveUrl.lastIndexOf("/")+1)+downLoadUrl.substring(downLoadUrl.lastIndexOf("."));
//			
//			File file = new File(savePath);
//			//检查该路径是否存在，如果不存在那么就创建路径
//			if(!file.exists()){
//			   file.mkdirs();	
//			}
//			fs = new FileOutputStream(saveInComputerUrl);
//			fs.write(date);
//			return true;
//		}catch (IOException e) {
//			System.out.println("下载异常 FileOutputStream："+e);
//			return false;
//		}finally{
//			try {
//				if(fs != null){
//					fs.close();
//				}
//			} catch (IOException e) {
//				fs = null;
//			}
//		}
//		
//		
//	}
//	/**
//	 * 下载读取图片的大小
//	 * @author jzxie
//	 * @param instream 输出流参数
//	 * @return 字节大小
//	 */
//   public static byte[] readInputStream(InputStream instream){
//		 try {
//				 ByteArrayOutputStream outStream = new ByteArrayOutputStream();
//				 byte[] buffer = new byte[1024];
//				//每次读取的字符串长度，如果为-1，代表全部读取完毕
//				 int len = 0;
//				//使用一个输入流从buffer里把数据读取出来
//				 while((len = instream.read(buffer))!= -1){
//					//用输出流往buffer里写入数据，中间参数代表从哪个位置开始读，len代表读取的长度
//					 outStream.write(buffer, 0, len);
//				 }
//				 //把outStream里的数据写入内存 
//				 return outStream.toByteArray();
//			} catch (IOException e) {
//				System.out.println("下载异常 InputStream :"+e);
//				return null;
//			}finally{
//				try {
//					if(instream != null){
//						instream.close();
//					}
//				} catch (IOException e) {
//					instream = null;
//				}
//				
//			}
//			
//		 
//	 }
//	/**
//	 * @return the inputStream
//	 */
//	public InputStream getInputStream() {
//		return inputStream;
//	}

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
