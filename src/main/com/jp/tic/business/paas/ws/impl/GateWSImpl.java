package com.jp.tic.business.paas.ws.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jws.WebService;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;
import com.jp.tic.analyze.dao.MountOnlineDao;
import com.jp.tic.analyze.entity.PageEntity;
import com.jp.tic.analyze.service.CarTakeService;
import com.jp.tic.analyze.service.MountOnlineService;
import com.jp.tic.analyze.service.MountWsStatusService;
import com.jp.tic.analyze.service.RegionCrashService;
import com.jp.tic.app.carSearch.entity.Saturation;
import com.jp.tic.business.cartake.mapper.BasicDataQueryMapper;
import com.jp.tic.business.cartake.service.CarQueryStatService;
import com.jp.tic.business.cartake.service.HotRecodeService;
import com.jp.tic.business.device.service.BayonetManagerService;
import com.jp.tic.business.paas.service.LicenseService;
import com.jp.tic.business.paas.ws.GateWS;
import com.jp.tic.common.hbase.utils.BytesUtils;
import com.jp.tic.security.entity.UserRole;
import com.jp.tic.security.service.UserRoleService;
import com.jp.tic.system.dao.OrganizationDao;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.entity.Gate;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.system.service.SystemConfigService;
import com.jp.tic.utils.carinfo.CarInfoUtils;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;

@WebService(endpointInterface="com.jp.tic.business.paas.ws.GateWS", serviceName="GateWS")
@Controller
public class GateWSImpl implements GateWS {
	@Autowired
	private CarTakeService carTakeService;
	
	@Autowired
	private BasicDataQueryMapper<Map<String, Object>> mapper;
	
	@Autowired
	private SystemConfigService systemConfigService;
	
	@Autowired
	private LicenseService licenseService;
	
	@Autowired
	private OrganizationDao organizationDao;
	
	@Autowired
	private MountOnlineDao mountOnlineDao;
	
	@Autowired
	private UserRoleService<UserRole> userRoleService;
	
	@Autowired
    private HotRecodeService hotRecodeService;
	
	@Autowired
	private RegionCrashService regionCrashService;
	
	@Autowired
	private CarQueryStatService service;
	
	@Autowired
	private MountOnlineService mountOnlineService;
	
	@Autowired
	private MountWsStatusService mountWsStatusService;
	
	@Autowired
	private CarQueryStatService<Map<String, Object>> carQueryStatService;
	
	@Autowired
	private BayonetManagerService bayonetManagerService;
	
	@Autowired
	private DictionaryService dictionaryService;
	
	@Override
	public List<CarTake> queryCarTrace(String license, String hphm, Date startTime, Date endTime, int count) {
		if(licenseService.isAuthorized(license, "queryCarTrace")==false){
			return null;
		}
		try {
			//List<CarTake> takes = carTakeService.getCarTrace(hphm, startTime, endTime, count);
			//针对原来GIS代用地图轨迹这一接口，针对地图代码没发生变化，而本系统已经改版，因此这里需要更改调用方法
			List<CarTake> takes = carTakeService.getCarTraceForSolr(hphm, startTime, endTime, count);
			if(takes !=null && takes.size()>0){
				this.clearId(takes);
			}
			return takes;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	//实时过车
	@Override
	public List<CarTake> queryGateLatestTakes(String license, String kkbh, int count) {
		if(licenseService.isAuthorized(license, "queryLatestTakes")==false){
			return null;
		}
		
		List<CarTake> takes;
		try {
			//takes = carTakeService.getMountSnapshot(kkbh, null, null, count);
			//针对原来GIS代用地图轨迹这一接口，针对地图代码没发生变化，而本系统已经改版，因此这里需要更改调用方法
			List<String> kkbhs = new ArrayList<String>();
			kkbhs.add(kkbh);
			takes = carTakeService.getRealtimeTakes(kkbhs, null, null, count);
			if(takes !=null){
				this.clearId(takes);
			}
			return takes;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@Override
	public List<CarTake> queryGatesLatestTakes(String license, List<String> kkbhs) {
		if(licenseService.isAuthorized(license, "queryLatestTakes")==false){
			return null;
		}
		
		List<CarTake> takes;
		try {
			//takes = carTakeService.getMountSnapshot(kkbhs, null, null, 1);
			//针对原来GIS代用地图轨迹这一接口，针对地图代码没发生变化，而本系统已经改版，因此这里需要更改调用方法
			takes = carTakeService.getRealtimeTakes(kkbhs, null, null, 1);
			this.clearId(takes);
			return takes;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@Override
	public List<CarTake> queryGatesRealtimeTakes(String license, List<String> kkbhs, int mintue) {
		if(licenseService.isAuthorized("queryGateRealtimeTakes", license)==false){
			return null;
		}
		Calendar end=Calendar.getInstance();
		Calendar start=(Calendar) end.clone();
		start.add(Calendar.MINUTE, mintue);
		List<CarTake> takes;
		try {
			//takes = carTakeService.getMountSnapshot(kkbhs, start.getTime(), end.getTime(), 1);
			//针对原来GIS代用地图轨迹这一接口，针对地图代码没发生变化，而本系统已经改版，因此这里需要更改调用方法
			takes = carTakeService.getRealtimeTakes(kkbhs, start.getTime(), end.getTime(), 1);
			this.clearId(takes);
			return takes;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public PageEntity queryTakesWithKkbhHphmAndTimeRange(String license, String kkbh, Date startTime, Date endTime, String hphm, PageEntity page) {
		if(licenseService.isAuthorized("queryTakesPageWithKkbhHphmAndTimeRange", license)==false){
			return null;
		}
		try {
			System.out.println("第一次page参数打印pageNo:" + page.getPageNo() + " pageSize:" + page.getPageSize());
			page.goNext();
			page.goLast();
			System.out.println("第二次page参数打印pageNo:" + page.getPageNo() + " pageSize:" + page.getPageSize());
			//page=carTakeService.queryCarTake(kkbh, startTime, endTime, hphm, page);
			//针对原来GIS代用地图轨迹这一接口，针对地图代码没发生变化，而本系统已经改版，因此这里需要更改调用方法
			page=carTakeService.getHistoryCarTakes(kkbh, startTime, endTime, hphm, page);
			List<Map<String, String>> hotRecodes = hotRecodeService.queryHotRecodes(null);
			List<CarTake> filteTakes = new ArrayList<CarTake>();
			if (page != null) {
				if (page.getResult() != null && page.getResult().size() > 0) {
					Date jgsjDate = null;
					String jgsjTime = "";
					String startTimeRe = "";
					String endTimeRe = ""; 
					for (int i = 0; i < page.getResult().size(); i++) {
						jgsjDate = page.getResult().get(i).getJgsj();
						jgsjTime = DateUtil.parseToString(jgsjDate, "yyyy-MM-dd HH:mm:ss");
						if (hotRecodes != null && hotRecodes.size() > 0) {
							for (Map<String, String> hotMap : hotRecodes) {
								startTimeRe = hotMap.get("START_DATE");
								endTimeRe = hotMap.get("END_DATE");
								int startFlag = DateUtil.getTwoTimeDay(startTimeRe, jgsjTime);
								int endFlag = DateUtil.getTwoTimeDay(jgsjTime, endTimeRe);
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
					}
				}
				if (filteTakes != null) {
					page.getResult().removeAll(filteTakes);
				}
			}
			this.clearId(page.getPageData());
			return page;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<Gate> getAllGates(String license) {
		if(licenseService.isAuthorized("getAllGates", license)==false){
			return null;
		}
		
		try {
			return mapper.findAllMounts();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<Gate> getAllGates4Gis(String license) {
		if(licenseService.isAuthorized("getAllGates4Gis", license)==false){
			return null;
		}
		
		try {
			return mapper.findAllMounts4Gis();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public String getLicense(String code) {
		return licenseService.register(code);
	}
	
	private void clearId(List<CarTake> takes){
		for(CarTake take:takes){
			if (take != null) {
				clearId(take);
			}
		}
	}
	
	private void clearId(CarTake take){
		take.setId("");
	}

	@Override
	public CarTake getTake(String rowKey) {
		byte[] key=BytesUtils.parseValueString(rowKey);
		CarTake take = carTakeService.getTake(key);
		this.clearId(take);
		return take;
	}

	@Override
	public List<CarTake> getTake1(List<String> rowKeys) {
		List<byte[]> keys=new ArrayList<byte[]>();
		for(String rowKey:rowKeys){
			keys.add(BytesUtils.parseValueString(rowKey));
		}
		List<CarTake> takes = carTakeService.getTakes(keys);
		this.clearId(takes);
		return takes;
	}

	@Override
	public List<CarTake> queryTakesPageWithKkbhHphmAndTimeRange(String license, String kkbh, Date startTime, Date endTime, String hphm) {
		List<CarTake> takes;
		try {
			takes = carTakeService.queryCarTake(kkbh, startTime, endTime,  hphm,  999999999, false);
			this.clearId(takes);
			return takes;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 卡口在线状态接口查询
	 * @param searchParam 参数详细说明，（orgType，单位类型，取值：0代表选择为广州市一级别，最顶级别，1代表选的是分局这级别，及第二级别，
	 * 					  2代表选的是卡口这一级别，及第三级别），（orgId：选择的节点ID，如选择的是广州市为440100，如选择的是分局440116000000，
	 * 					    需要注意点，选择的是卡口的时候，因为卡口是18位数字长度，转Long类型会报错，因此特对卡口的长度进行了截取，截取掉了前面3位数字长度，
	 * 					   如：京珠北太和收费站以北路段：440192000040001000，截取后变成：192000040001000，请麻烦做下处理吧，这边确实没弄好。），
	 * @return 查询处理结果
	 */
	public List<Map<String, String>> mountStatusGroupping(Map<String, String> searchParam) {
		List<Map<String, String>> mounts = organizationDao.findOrgInfoByOrgType(searchParam);
		List<Map<String, String>> results = mountOnlineDao.mountOnlienStatusInfo(mounts, searchParam);
		return results;
	}
	@Override
	public List<Map<String, String>> queryCarInfoByhphm(String hphm) throws DocumentException {
		// TODO Auto-generated method stub
		Map<String, String> conditions = new HashMap<String, String>();
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		conditions.put("HPHM", hphm);
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
	        			break;
	        		}
	        	}
	        	results.add(dataMap);
	        }
		}
		return results;
	}
	
	/**
	 * 多卡口过车查询
	 * @param kkbhs 卡口编号集合
	 * @param startTime 开始时间
	 * @param endTime 结束时间
	 * @param hphms 车牌号码集合
	 * @param page 分页对象
	 * @return 查询结果
	 */
	@Override
	public PageEntity queryTakesManyKkbhs(List<String> kkbhs, Date startTime, Date endTime, List<String> hphms, PageEntity page) {
		try {
			if (page.getPageNo() != 1) {
				page.goNext();
				page.goLast();
			}
			//System.out.println("长度：" + kkbhs.size());
			List<String> kkbhList = null;
			if (kkbhs != null && kkbhs.size() > 0 && StringUtil.checkStr(kkbhs.get(0))) {
				kkbhList = kkbhs;
			} else {
				kkbhList = new ArrayList<String>();
			}
			List<String> hphmList = null;
			if (hphms != null && hphms.size() > 0 && StringUtil.checkStr(hphms.get(0))) {
				hphmList = hphms;
			} else {
				hphmList = new ArrayList<String>();
			}
			page = carTakeService.queryCarTake(startTime, endTime, null, hphms, kkbhs, "",null,null,null, page);
			
			List<Map<String, String>> hotRecodes = hotRecodeService.queryHotRecodes(null);
			List<CarTake> filteTakes = new ArrayList<CarTake>();
			if (page != null) {
				if (page.getResult() != null && page.getResult().size() > 0) {
					Date jgsjDate = null;
					String jgsjTime = "";
					String startTimeRe = "";
					String endTimeRe = ""; 
					for (int i = 0; i < page.getResult().size(); i++) {
						jgsjDate = page.getResult().get(i).getJgsj();
						jgsjTime = DateUtil.parseToString(jgsjDate, "yyyy-MM-dd HH:mm:ss");
						if (hotRecodes != null && hotRecodes.size() > 0) {
							for (Map<String, String> hotMap : hotRecodes) {
								startTimeRe = hotMap.get("START_DATE");
								endTimeRe = hotMap.get("END_DATE");
								int startFlag = DateUtil.getTwoTimeDay(startTimeRe, jgsjTime);
								int endFlag = DateUtil.getTwoTimeDay(jgsjTime, endTimeRe);
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
					}
				}
				page.getResult().removeAll(filteTakes);
			}
			
			this.clearId(page.getPageData());
			return page;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 多卡口过车查询,查询报备卡口信息
	 * @param kkbhs 卡口编号集合
	 * @param startTime 开始时间
	 * @param endTime 结束时间
	 * @param hphm 车牌号码集合
	 * @param page 分页对象
	 * @return 查询结果
	 */
	public PageEntity queryTakesManyBaobeiKkbhs(List<String> kkbhs, Date startTime, Date endTime, List<String> hphms, PageEntity page) {
		try {
			page.goNext();
			page.goLast();
			page = carTakeService.queryBaobeiCarTake(startTime, endTime, kkbhs, hphms, page);
			
			List<Map<String, String>> hotRecodes = hotRecodeService.queryHotRecodes(null);
			List<CarTake> filteTakes = new ArrayList<CarTake>();
			if (page != null) {
				if (page.getResult() != null && page.getResult().size() > 0) {
					Date jgsjDate = null;
					String jgsjTime = "";
					String startTimeRe = "";
					String endTimeRe = ""; 
					for (int i = 0; i < page.getResult().size(); i++) {
						jgsjDate = page.getResult().get(i).getJgsj();
						jgsjTime = DateUtil.parseToString(jgsjDate, "yyyy-MM-dd HH:mm:ss");
						if (hotRecodes != null && hotRecodes.size() > 0) {
							for (Map<String, String> hotMap : hotRecodes) {
								startTimeRe = hotMap.get("START_DATE");
								endTimeRe = hotMap.get("END_DATE");
								int startFlag = DateUtil.getTwoTimeDay(startTimeRe, jgsjTime);
								int endFlag = DateUtil.getTwoTimeDay(jgsjTime, endTimeRe);
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
					}
				}
				page.getResult().removeAll(filteTakes);
			}
			
			this.clearId(page.getPageData());
			return page;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 多卡口过车查询,查询报备卡口信息,时间传字符串
	 * @param kkbhs 卡口编号集合
	 * @param startTime 开始时间
	 * @param endTime 结束时间
	 * @param hphm 车牌号码集合
	 * @param page 分页对象
	 * @return 查询结果
	 */
	public PageEntity queryBaobeiKkbhs(List<String> kkbhs, String startTime, String endTime, List<String> hphms, PageEntity page) {
		try {
			page.goNext();
			page.goLast();
			Date startDate = DateUtil.parseToDate(startTime, "yyyy-MM-dd HH:mm:ss");
			Date endDate = DateUtil.parseToDate(endTime, "yyyy-MM-dd HH:mm:ss");
			if (kkbhs == null ) {
				kkbhs = new ArrayList<String>();
			}
			if (hphms == null ) {
				hphms = new ArrayList<String>();
			}
			page = carTakeService.queryBaobeiCarTake(startDate, endDate, kkbhs, hphms, page);
			List<Map<String, String>> hotRecodes = hotRecodeService.queryHotRecodes(null);
			List<CarTake> filteTakes = new ArrayList<CarTake>();
			if (page != null) {
				if (page.getResult() != null && page.getResult().size() > 0) {
					Date jgsjDate = null;
					String jgsjTime = "";
					String startTimeRe = "";
					String endTimeRe = ""; 
					for (int i = 0; i < page.getResult().size(); i++) {
						jgsjDate = page.getResult().get(i).getJgsj();
						jgsjTime = DateUtil.parseToString(jgsjDate, "yyyy-MM-dd HH:mm:ss");
						if (hotRecodes != null && hotRecodes.size() > 0) {
							for (Map<String, String> hotMap : hotRecodes) {
								startTimeRe = hotMap.get("START_DATE");
								endTimeRe = hotMap.get("END_DATE");
								int startFlag = DateUtil.getTwoTimeDay(startTimeRe, jgsjTime);
								int endFlag = DateUtil.getTwoTimeDay(jgsjTime, endTimeRe);
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
					}
				}
				page.getResult().removeAll(filteTakes);
			}
			
			this.clearId(page.getPageData());
			return page;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 获取视频编辑按钮状态
	 * @param userCode 用户账号
	 * @return 返回结果，元素1表示状态，0表示未授权，1表示已授权，元素2表示组织CODE
	 */
	public String[] getEditVediaoStatus(String userCode) {
		String[] status = userRoleService.getEditVediaoStatus(userCode);
		return status;
	}
	
	@Override
	public boolean updateMountTabXY(String license, String kkbh, String kkjd,String kkwd) {
		if(licenseService.isAuthorized("getAllGates4Gis", license)==false){
			return false;
		}
		Map<String,String> updatePram = new HashMap<String, String>();
		updatePram.put("kkbh", kkbh);
		updatePram.put("kkjd", kkjd);
		updatePram.put("kkwd", kkwd);
		try {
			int flag = mapper.updateMountTabXY(updatePram);
			if(flag>0){
				return true;
			}
			return false;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
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
	 * 套牌车查询接口 - 方正调用
	 * @param conjson
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String queryTaopaiches(String condjson) {
		String jsonStr = "{}";
		try {
			Map<String, Object> resultMap = service.taopaiLocalCarInfo(condjson);
			jsonStr = JSON.toJSONString(resultMap);
			return jsonStr;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return condjson;
	}
	
	/**
	 * 套牌车查询接口 - 方正调用--同步视频网方法
	 * @param conjson
	 * @return
	 */
	public String taopaiLocalCarInfo(String condjson) {
		String resultJson = "";
		try {
			Map<String, Object> map = carQueryStatService.taopaiLocalCarInfo(condjson);
			resultJson = JsonUtil.objToJson(map);
		} catch (Exception e) {
			resultJson = "";
			e.printStackTrace();
		}
		return resultJson;
	}
	
	/**
	 * 卡口在线状态
	 * @param jsonParam
	 * @return
	 */
	public String mountStatusSearch(String jsonParam) {
		String resultJson = "";
		try {
			resultJson = mountWsStatusService.mountStatusSearch(jsonParam);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultJson;
		/*List<Map<String, String>> results = mountOnlineService.mountStatusGroupping(jsonParam);
		String jsonStr = JSON.toJSONString(results);
		return jsonStr;*/
	}
	
	/**
	 * 测试接口
	 * @param str
	 * @return
	 */
	public String testGateWs(String str) {
		String infoStr = "测试返回信息打印，print：" + str;
		return infoStr;
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
	
	/**
	 * 查询所有虚拟卡口或者实体卡口信息
	 * @return
	 */
	public String findAllVirturalMountInfos(String flag) {
		List<Map<String, String>> results = bayonetManagerService.loadAllVirtualMountInfos(flag);
		String jsonStr = JSON.toJSONString(results);
		return jsonStr;
	}
	
	/**
	 * 查询所有虚拟卡口
	 * @return
	 */
	public String findAllVirturalMounts() {
		List<Map<String, String>> results = bayonetManagerService.loadAllVirtualMountInfos("virtural");
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
}
