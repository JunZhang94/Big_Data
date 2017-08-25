package com.jp.tic.app.carSearch.ws.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jws.WebService;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;
import com.jp.tic.analyze.service.MountOnlineService;
import com.jp.tic.analyze.service.RegionCrashService;
import com.jp.tic.analyze.service.SimilarityCarAnalyzeService;
import com.jp.tic.app.carSearch.entity.CarRercord;
import com.jp.tic.app.carSearch.entity.Saturation;
import com.jp.tic.app.carSearch.service.CarTypeSearchService;
import com.jp.tic.app.carSearch.ws.CarTypeSearchWS;
import com.jp.tic.business.alarm.service.ControlManagerService;
import com.jp.tic.business.cartake.service.CarQueryStatService;
import com.jp.tic.business.cartake.service.NightAndDazedService;
import com.jp.tic.business.compareByTime.service.CompareByTimeService;
import com.jp.tic.business.device.service.BayonetManagerService;
import com.jp.tic.business.oneCarManyNum.service.OneCarManyNumService;
import com.jp.tic.business.oneNumManyCar.service.OneNumManyCarService;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.system.service.SystemConfigService;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;

@WebService(endpointInterface="com.jp.tic.app.carSearch.ws.CarTypeSearchWS", serviceName="CarTypeSearchWS")
@Controller
public class CarTypeSearchWSImpl implements CarTypeSearchWS {
	
	@Autowired
	private CarTypeSearchService carTypeSearchService;
	
	@Autowired
	private SimilarityCarAnalyzeService similarityCarAnalyzeService;

	@Autowired
	private OneNumManyCarService oneNumManyCarService;
	@Autowired
	private OneCarManyNumService oneCarManyNumService;
	
	@Autowired
	private NightAndDazedService nightAndDazedService;
	
	@Autowired
	private CompareByTimeService compareByTimeService;
	
	@Autowired
	private ControlManagerService controlManagerService;
	
	@Autowired
	private SystemConfigService systemConfigService;
	
	@Autowired
	private RegionCrashService regionCrashService;
	
	@Autowired
	private CarQueryStatService service;
	
	@Autowired
	private MountOnlineService mountOnlineService;
	
	@Autowired
	private DictionaryService dictionaryService;
	
	@Autowired
	private BayonetManagerService bayonetManagerService;
	
	/**
	 * 接口-solr查询历史过车
	 */
	public Map<String, Object> testSearchInfo(CarRercord rercord) {
		//Map<String, Object> resultMap = carTypeSearchService.dealWithCarTypeData(rercord);
		return null;
	}
	
	/**
	 * 接口-solr按车辆特征查询,采用json-lib
	 * @return
	 */
	public String carTypeSeachInfo(String jsonParam) {
		Map<String, Object> resultMap = carTypeSearchService.dealWithCarTypeData(jsonParam);
		String jsonStr = JsonUtil.objToJson(resultMap);
		return jsonStr;
	}
	
	/**
	 * 接口-solr按车辆特征查询,采用fastjson,号称效率最好的
	 * @return
	 */
	public String carSearchInfo(String jsonParam) {
		Map<String, Object> resultMap = carTypeSearchService.dealWithCarTypeData(jsonParam);
		String jsonStr = JSON.toJSONString(resultMap);
		return jsonStr;
	}

	/**
	 * 实时过车
	 */
	public List<CarTake> dealWithRealTimeDatas(String json) throws Exception {
		return carTypeSearchService.realCarQuery(json);
	}

	/**
	 * 临近点分析
	 */
	public List<CarTake> analyzeClosetPointquery(String json) {
		return carTypeSearchService.analyzeClosetPointquery(json);
	}
	
	/**
	 * 相似车辆串并
	 * @return
	 */
	public String similaritySearchInfo(String jsonParam) {
		Map<String, Object> resultMap = similarityCarAnalyzeService.dealWithSimilarityCarData(jsonParam);
		String jsonStr = JSON.toJSONString(resultMap);
		return jsonStr;
	}

	/**
	 * 一牌多车查询
	 */
	public Map<String, List<CarTake>> queryDatasForPages(String json) {
		return oneNumManyCarService.queryDatasForPages(json);
	}
	
	/**
	 * 一车多牌查询
	 */
	public Map<String, Object> queryOneCarManyNumForPages(String json) {
		Map<String, Object> resultMap=oneCarManyNumService.queryOneCarManyNumForPages(json);
		return resultMap;
	}
	
	/**
	 * 昼伏夜出
	 * @return
	 */
	public String queryNightAndDazedData(String jsonParam) {
		Map<String, Object> resultMap = nightAndDazedService.queryNightAndDazedData(jsonParam);
		String jsonStr = JSON.toJSONString(resultMap);
		return jsonStr;
	}

	/**
	 * 时间比对
	 */
	public Map<String, Object> compareByTimeQueryForpages(String json) {
		Map<String, Object> resultMap=compareByTimeService.compareByTimeQueryForpages(json);
		return resultMap;
	}

	/**
	 * 
	 * 布控查询
	 */
	public Map<String, Object> queryControlInfoWS(Map<String, String> searchParam) {
		Map<String, Object> map=new HashMap<String, Object>();
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
		map.put("results", results);
		map.put("rows", amounts);
		return map;
	}

	/**
	 * 
	 * 新增布控
	 */
	public int saveControlInfoWS(Map<String, String> searchParam) {
		return controlManagerService.saveControlInfo(searchParam);
	}

	/**
	 * 布控详细数据加载
	 * @param searchParam
	 * @return
	 */
	public List<Map<String, String>> loadControlDetailInfoWS(Map<String, String> searchParam) {
		return controlManagerService.loadControlDetailInfo(searchParam);
	}

	/**
	 * 修改布控信息
	 * @param searchParam
	 * @return
	 */
	public int updateControlInfoWS(Map<String, String> searchParam) {
		return controlManagerService.updateControlInfo(searchParam);
	}

	/**
	 * 删除布控
	 * @param searchParam
	 * @return
	 */
	public int deleteControlInfoWS(Map<String, String> searchParam) {
		return controlManagerService.deleteControlInfo(searchParam);
	}

	/**
	 * 审核布控
	 * @param searchParam
	 * @return
	 */
	public int verifyControlInfoWS(Map<String, String> searchParam) {
		return controlManagerService.verifyControlInfo(searchParam);
	}

	/**
	 * 撤销布控
	 * @param searchParam
	 * @return
	 */
	public int revokeControlInfoWS(Map<String, String> searchParam) {
		String curentTime = DateUtil.getCurrentDateTime();
		searchParam.put("revokeTime", curentTime);
		return controlManagerService.revokeControlInfo(searchParam);
	}

	/**
	 * 撤销审核
	 * @param searchParam
	 * @return
	 */
	public int revokeVerifyControlInfoWS(Map<String, String> searchParam) {
		return controlManagerService.revokeVerifyControlInfo(searchParam);
	}
	
	/**
	 * 获取饱和度
	 * @return
	 */
	public String getSaturations(){
		List<Map<String, String>> datas;
		List<JSONObject> list=new ArrayList<JSONObject>();
		Map<String,Object> map_=new HashMap<String, Object>();
		JSONObject array_=null;
		try {
			datas = systemConfigService.getSaturations();
			if(!datas.isEmpty()){
				for(Map<String, String> map:datas){
					Saturation saturation=new Saturation();
					saturation.setServerIp(map.get("SERVER_IP"));
					saturation.setMax_process_count(StringUtil.toInt(map.get("MAX_PROCESS_COUNT")));
					saturation.setProcess_count(StringUtil.toInt(map.get("PROCESSING_COUNT")));
					saturation.setWorking_count(StringUtil.toInt(map.get("WORKING_COUNT")));
					saturation.setCpu_used_rate(Double.parseDouble(map.get("CPU_USED_RATE")));
					JSONObject json=new JSONObject(saturation);
					list.add(json);
				}
				JSONArray array=new JSONArray(list);
				map_.put("message", "sucessfully");
				map_.put("code",0);//0-服务端响应正常
				map_.put("result", array);
			}else{
				map_.put("message", "sucessfully");
				map_.put("code",0);//0-服务端响应正常
				map_.put("result", "null");
			}
			array_=new JSONObject(map_);
		} catch (Exception e) {
			e.printStackTrace();
			map_.put("message", "sucessfully");
			map_.put("code",1);//1-服务端出现异常
			map_.put("result", "null");
			array_=new JSONObject(map_);
		}
		return array_.toString();
	}
	
	public static void main(String[] args) {
		CarTypeSearchWSImpl s=new CarTypeSearchWSImpl();
		System.out.println(s.getSaturations());
	}

	
	/**
	 * 区域碰撞查询接口
	 * @param jsonParam
	 * @return
	 */
	public String regionCrashQuery(String jsonParam) {
		List<Map<String, String>> results = new ArrayList<Map<String,String>>();
		try {
			results = regionCrashService.regionCrashQuery(jsonParam);
		} catch (Exception e) {
			e.printStackTrace();
		}
		String jsonStr = JSON.toJSONString(results);
		return jsonStr;
	}
	
	/**
	 * 套牌车
	 * @param jsonParam
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String taopaiLocalCarInfo(String jsonParam) {
		String jsonStr = "{}";
		try {
			Map<String, Object> resultMap = service.taopaiLocalCarInfo(jsonParam);
			jsonStr = JSON.toJSONString(resultMap);
			return jsonStr;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonParam;
	}
	
	/**
	 * 卡口在线状态
	 * @param jsonParam
	 * @return
	 */
	public String mountStatusGroupping(String jsonParam) {
		List<Map<String, String>> results = mountOnlineService.mountStatusGroupping(jsonParam);
		String jsonStr = JSON.toJSONString(results);
		return jsonStr;
	}
	
	/**
	 * 加载所有车辆品牌信息
	 * @return
	 */
	public String findCarBrand() {
		List<Map<String, String>> results = dictionaryService.findCarBrand();
		String jsonStr = JSON.toJSONString(results);
		return jsonStr;
	}
	
	/**
	 * 加载车辆品牌车辆类型多选下拉框信息
	 */
	public String findCarTypeCombox(String carBrand) {
		List<Map<String, String>> results = dictionaryService.findCarTypeCombox(carBrand);
		String jsonStr = JSON.toJSONString(results);
		return jsonStr;
	}
	
	/**
	 * 加载品牌年款车辆类型多选下拉框信息
	 */
	public String findCarYearCombox(String carType) {
		List<Map<String, String>> results = dictionaryService.findCarYearCombox(carType);
		String jsonStr = JSON.toJSONString(results);
		return jsonStr;
	}
	
	/**
	 * 查询所有虚拟卡口
	 * @return
	 */
	public String findAllVirturalMounts(String flag) {
		List<Map<String, String>> results = bayonetManagerService.loadAllVirtualMountInfos(flag);
		String jsonStr = JSON.toJSONString(results);
		return jsonStr;
	}
	
	/**
	 * 查询所有虚拟卡口
	 * @return
	 */
	public String findAllVirturalDepts() {
		String jsonStr  = bayonetManagerService.loadAllVirtualDeptInfos();
		return jsonStr;
	}
	
	/**
	 * 查询所有实体卡口
	 * @return
	 */
	public String findAllDeptMounts() {
		String jsonStr  = bayonetManagerService.loadAllDeptMountsInfos();
		return jsonStr;
	}
}
