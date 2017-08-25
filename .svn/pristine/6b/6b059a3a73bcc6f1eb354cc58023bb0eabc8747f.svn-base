package com.jp.tic.app.carSearch.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.jp.tic.analyze.entity.PageEntity;
import com.jp.tic.analyze.service.CarTakeService;
import com.jp.tic.app.carSearch.service.CarTypeSearchService;
import com.jp.tic.app.carSearch.util.CarFeatureUtils;
import com.jp.tic.app.carSearch.ws.CarTypeSearchWS;
import com.jp.tic.business.cartake.service.HotRecodeService;
import com.jp.tic.business.system.entity.SysSetting;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.core.annotation.Log;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.system.service.SystemConfigService;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;
import com.opensymphony.oscache.base.NeedsRefreshException;
import com.opensymphony.oscache.general.GeneralCacheAdministrator;

@Controller
@Scope("prototype")
@RequestMapping("/carType")
public class CarTypeSearchController extends AbstractController {
	
	private Logger logger = LoggerFactory.getLogger(CarTypeSearchController.class);
	
	public final SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	private static final String ENUM_ALL_TAOPAI = "ALL_TAOPAI";
	
	@Autowired
    private HotRecodeService hotRecodeService;
	@Autowired
	private DictionaryService dictionaryService;
	@Autowired
	SystemConfigService systemConfigService;
	@Autowired
	private CarTakeService takeService;
	
	@Autowired
	private CarTypeSearchService carTypeSearchService;
	
	@Autowired
	private CarTypeSearchWS carTypeSearchWS;
	
	private CarFeatureUtils carFeatureUtils = new CarFeatureUtils();
	
	private static GeneralCacheAdministrator admin = new GeneralCacheAdministrator();

	public String optFlag = "";
	public String lastPage = "data";
	
	public List<CarTake> filteDatas = new ArrayList<CarTake>();
	public volatile int counts = 0;
	
	/**
	 * 加载按车型查询页面,加载图片展示列表
	 * @return 页面映射
	 */
	@RequestMapping("/typeConditionPage")
	public String typeConditionPageLoad() {
		return "forward:/WEB-INF/app/carSearch/type-query-condition.jsp";
	}
	
	/**
	 * 加载按车型查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/carTypePage")
	public String carTypePageLoad() {
		return "forward:/WEB-INF/app/carSearch/car-type-search.jsp";
	}
	
	/**
	 * 加载按车型查询页面,加载图片展示列表
	 * @return 页面映射
	 */
	@RequestMapping("/carImgTypePage")
	public String carImgTypePageLoad() {
		return "forward:/WEB-INF/app/carSearch/carimg-type-search.jsp";
	}
	
	/**
	 * 加载按车型查询页面,加载图片展示列表
	 * @return 页面映射
	 */
	@RequestMapping("/generalQueryResultPage")
	public String generalQueryResultPageLoad() {
		return "/search/general-query-result";
	}
	
	/**
	 * 历史车辆数据查询
	 * @param param
	 * @param page
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/carTypeSearch")
	public void historyCarQueryData(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request); 
		/*int pageStart = (StringUtil.toInt(searchParam.get("page")) - 1) * StringUtil.toInt(searchParam.get("rows"));
		searchParam.put("page.start", pageStart + "");
		searchParam.put("page.limit", searchParam.get("rows"));*/
		optFlag = "query";
		Map<String, Object> userMap = (Map<String, Object>) request.getSession().getAttribute(AbstractController.SESSION_USER);
		if(userMap !=null){//联网平台修改
			if (StringUtil.checkObj(userMap.get("USER_CODE"))) {
				searchParam.put("userCode", StringUtil.toString(userMap.get("USER_CODE")));
			} else {
				searchParam.put("userCode", "KEYS");
			}
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
				}
			}
			page.getResult().removeAll(filteTakes);
		}
		List<CarTake> results =  page.getResult();
		String jsonStr = JsonUtil.objToJson(results);
		response.setCharacterEncoding("UTF-8");  
		try {
			PrintWriter out = response.getWriter();
			out.print(jsonStr);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
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
	 * 把结果集转化为MAP方式返回
	 * @param datas
	 * @return
	 */
	public List<Map<String, String>> dealDataToMaps(List<CarTake> datas) {
		List<Map<String, String>> results = new ArrayList<Map<String,String>>();
		if (datas != null && datas.size() > 0) {
			Map<String, String> dataMap = null;
			for (CarTake take : datas) {
				dataMap = new HashMap<String, String>();
			}
		}
		return results;
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
	 * 按车辆类型查询功能
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	@RequestMapping("/carImgTypeSearch")
	public void carTypeSearchInfo(Model model, HttpServletRequest request, HttpServletResponse response) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String page = searchParam.get("page");
		String rows = searchParam.get("rows");
		List<Map<String, String>> datas = new ArrayList<Map<String,String>>();
		Map<String, String> dataMap1 = new HashMap<String, String>();
		dataMap1.put("HPHM", "粤A12341");
		dataMap1.put("KKMC", "石新路潮山村路段");
		dataMap1.put("KKBH", "440183203790015500");
		dataMap1.put("JGSJ", "2015-10-29 12:23:15");
		dataMap1.put("CLLXMC", "别克");
		dataMap1.put("clsd", "100");
		dataMap1.put("TX1", "http://localhost:8080/a/1.JPG");
		Map<String, String> dataMap2 = new HashMap<String, String>();
		dataMap2.put("HPHM", "粤A12342");
		dataMap2.put("KKMC", "石新路潮山村路段");
		dataMap2.put("KKBH", "440183203790015500");
		dataMap2.put("JGSJ", "2015-10-29 12:23:15");
		dataMap2.put("CLLXMC", "别克");
		dataMap2.put("clsd", "100");
		dataMap2.put("TX1", "http://localhost:8080/a/2.JPG");
		Map<String, String> dataMap3 = new HashMap<String, String>();
		dataMap3.put("HPHM", "粤A12343");
		dataMap3.put("KKMC", "石新路潮山村路段");
		dataMap3.put("KKBH", "440183203790015500");
		dataMap3.put("JGSJ", "2015-10-29 12:23:15");
		dataMap3.put("CLLXMC", "别克");
		dataMap3.put("clsd", "100");
		dataMap3.put("TX1", "http://localhost:8080/a/3.JPG");
		Map<String, String> dataMap4 = new HashMap<String, String>();
		dataMap4.put("HPHM", "粤A12344");
		dataMap4.put("KKMC", "石新路潮山村路段");
		dataMap4.put("KKBH", "440183203790015500");
		dataMap4.put("JGSJ", "2015-10-29 12:23:15");
		dataMap4.put("CLLXMC", "别克");
		dataMap4.put("clsd", "100");
		dataMap4.put("TX1", "http://localhost:8080/a/4.JPG");
		Map<String, String> dataMap5 = new HashMap<String, String>();
		dataMap5.put("HPHM", "粤A12341");
		dataMap5.put("KKMC", "石新路潮山村路段");
		dataMap5.put("KKBH", "440183203790015500");
		dataMap5.put("JGSJ", "2015-10-29 12:23:15");
		dataMap5.put("CLLXMC", "别克");
		dataMap5.put("clsd", "100");
		dataMap5.put("TX1", "http://localhost:8080/a/1.JPG");
		Map<String, String> dataMap6 = new HashMap<String, String>();
		dataMap6.put("HPHM", "粤A12342");
		dataMap6.put("KKMC", "石新路潮山村路段");
		dataMap6.put("KKBH", "440183203790015500");
		dataMap6.put("JGSJ", "2015-10-29 12:23:15");
		dataMap6.put("CLLXMC", "别克");
		dataMap6.put("clsd", "100");
		dataMap6.put("TX1", "http://localhost:8080/a/2.JPG");
		Map<String, String> dataMap7 = new HashMap<String, String>();
		dataMap7.put("HPHM", "粤A12343");
		dataMap7.put("KKMC", "石新路潮山村路段");
		dataMap7.put("KKBH", "440183203790015500");
		dataMap7.put("JGSJ", "2015-10-29 12:23:15");
		dataMap7.put("CLLXMC", "别克");
		dataMap7.put("clsd", "100");
		dataMap7.put("TX1", "http://localhost:8080/a/3.JPG");
		Map<String, String> dataMap8 = new HashMap<String, String>();
		dataMap8.put("HPHM", "粤A12344");
		dataMap8.put("KKMC", "石新路潮山村路段");
		dataMap8.put("KKBH", "440183203790015500");
		dataMap8.put("JGSJ", "2015-10-29 12:23:15");
		dataMap8.put("CLLXMC", "别克");
		dataMap8.put("clsd", "100");
		dataMap8.put("TX1", "http://localhost:8080/a/4.JPG");
		Map<String, String> dataMap9 = new HashMap<String, String>();
		dataMap9.put("HPHM", "粤A12341");
		dataMap9.put("KKMC", "石新路潮山村路段");
		dataMap9.put("KKBH", "440183203790015500");
		dataMap9.put("JGSJ", "2015-10-29 12:23:15");
		dataMap9.put("CLLXMC", "别克");
		dataMap9.put("clsd", "100");
		dataMap9.put("TX1", "http://localhost:8080/a/1.JPG");
		Map<String, String> dataMap10 = new HashMap<String, String>();
		dataMap10.put("HPHM", "粤A12342");
		dataMap10.put("KKMC", "石新路潮山村路段");
		dataMap10.put("KKBH", "440183203790015500");
		dataMap10.put("JGSJ", "2015-10-29 12:23:15");
		dataMap10.put("CLLXMC", "别克");
		dataMap10.put("clsd", "100");
		dataMap10.put("TX1", "http://localhost:8080/a/2.JPG");
		Map<String, String> dataMap11 = new HashMap<String, String>();
		dataMap11.put("HPHM", "粤A12343");
		dataMap11.put("KKMC", "石新路潮山村路段");
		dataMap11.put("KKBH", "440183203790015500");
		dataMap11.put("JGSJ", "2015-10-29 12:23:15");
		dataMap11.put("CLLXMC", "别克");
		dataMap11.put("clsd", "100");
		dataMap11.put("TX1", "http://localhost:8080/a/3.JPG");
		Map<String, String> dataMap12 = new HashMap<String, String>();
		dataMap12.put("HPHM", "粤A12344");
		dataMap12.put("KKMC", "石新路潮山村路段");
		dataMap12.put("KKBH", "440183203790015500");
		dataMap12.put("JGSJ", "2015-10-29 12:23:15");
		dataMap12.put("CLLXMC", "别克");
		dataMap12.put("clsd", "100");
		dataMap12.put("TX1", "http://localhost:8080/a/4.JPG");
		datas.add(dataMap1);
		datas.add(dataMap2);
		datas.add(dataMap3);
		datas.add(dataMap4);
		datas.add(dataMap5);
		datas.add(dataMap6);
		datas.add(dataMap7);
		datas.add(dataMap8);
		datas.add(dataMap9);
		datas.add(dataMap10);
		datas.add(dataMap11);
		datas.add(dataMap12);
		
		String recordStr = "";
		Map<String, String> dealMap = new HashMap<String, String>();
		int interval = 4;
		int imgFlag = 0;
		List<Map<String, String>> results = new ArrayList<Map<String,String>>();
		for (int i = 0; i < datas.size(); i++) {
			recordStr = "";
			imgFlag += 1;
			if (StringUtil.checkStr(recordStr)) {
				recordStr += ",";
			}
			recordStr += datas.get(i).get("TX1") + ",";
			recordStr += datas.get(i).get("HPHM") + ",";
			recordStr += datas.get(i).get("JGSJ") + ",";
			recordStr += datas.get(i).get("CLLXMC") + ",";
			recordStr += datas.get(i).get("KKMC") + ",";
			recordStr += datas.get(i).get("KKBH") + ",";
			recordStr += datas.get(i).get("clsd");
			dealMap.put("TX" + imgFlag, recordStr);
			if (i != 0 && (i + 1)%interval == 0) {
				imgFlag = 0;
				results.add(dealMap);
				dealMap = new HashMap<String, String>();
			}
		}
		results.add(dealMap);
		String jsonStr = JsonUtil.objToJson(results);
		response.setCharacterEncoding("UTF-8");  
		try {
			PrintWriter out = response.getWriter();
			out.print(jsonStr);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 测试solr与hbase整合查询,采用json-lib
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/testSearch")
	@ResponseBody
	public void testSearchInfo(HttpServletRequest request, HttpServletResponse response) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String jsonParam = JsonUtil.objToJson(searchParam);//查询条件
		String jsonStr = carTypeSearchWS.carTypeSeachInfo(jsonParam);
		response.setCharacterEncoding("UTF-8");  
		try {
			PrintWriter out = response.getWriter();
			out.print(jsonStr);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 测试solr与hbase整合查询,采用fastjson,号称效率最好的,建议可采用此方式
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/testCarSearch")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'过车综合信息'",content="'车牌号码:' + getWebParamInfo().get('carNum')",needPersist= true,operation="SEARCH")
	public Object testCarSearchInfo(HttpServletRequest request, HttpServletResponse response) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String jsonParam = JSON.toJSONString(searchParam);//查询条件
		String jsonStr = carTypeSearchWS.carSearchInfo(jsonParam);
		//测试
		/*Date startTime = DateUtil.parseToDate("2015-05-10 00:00:00", "");
		Date endTime = DateUtil.parseToDate("2016-05-10 00:00:00", "");
		PageEntity page = new PageEntity();
		page.setPageNo(1);
		page.setPageSize(15);
		gateWS.queryTakesWithKkbhHphmAndTimeRange("admin", "440400140000000010", startTime, endTime, "", page);*/
		
		Map<String, Object> datas = JsonUtil.jsonToMap(jsonStr);
		int amounts = StringUtil.toInt(datas.get("total"));
		List<Map<String, String>> results = (List<Map<String, String>>) datas.get("rows");
		if (results == null) {
			results = new ArrayList<Map<String, String>>();
			amounts = 0;
		}
		return ResponseUtils.sendList(results, amounts);
		/*response.setCharacterEncoding("UTF-8");  
		try {
			PrintWriter out = response.getWriter();
			out.print(jsonStr);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}*/
	}
	
}
