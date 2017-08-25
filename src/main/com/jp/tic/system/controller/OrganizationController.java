package com.jp.tic.system.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.business.user.service.UserService;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.core.annotation.Log;
import com.jp.tic.system.dao.DictionaryDao;
import com.jp.tic.system.entity.OrgEntity;
import com.jp.tic.system.service.impl.OrgTreeServiceImpl;
import com.jp.tic.system.service.impl.OrganizationServiceImpl;
import com.jp.tic.system.util.PinyinUtil;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;
import com.opensymphony.oscache.general.GeneralCacheAdministrator;

@Controller
@SuppressWarnings("unchecked")
@RequestMapping("/systemOrg")
public class OrganizationController extends AbstractController {
	
	 @Autowired
     private OrganizationServiceImpl orgService;
	 @Autowired
	 private OrgTreeServiceImpl orgTreeService;
	 @Autowired
	 private UserService userService;
	 
	 private Logger logger = LoggerFactory.getLogger(DictionaryDao.class);
	 
	 private static GeneralCacheAdministrator admin = new GeneralCacheAdministrator();

	/**
     * JSON获取组织结构树形数据（用于树控件）
     * @return
     * @author lsg
     */
	@RequestMapping("/orgTreeMap")
	@ResponseBody
    public Object loadOrgTreeMap(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String deviceInfo = searchParam.get("deviceFlag");
		boolean deviceFlag = false;
		if (StringUtil.equals(deviceInfo, "devicePolling")) {
			deviceFlag = true;
		}
        Map<String, Object> data = null;
        List<Long> authOrgIds = orgTreeService.loadOrgTopestData();
        data = orgService.getOrganizationTreeMap(authOrgIds, true, deviceFlag);
        this.jsonResult.setData(data == null ? null : data.get("children"));
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
    }
	/**
	 * JSON 获取组织结构树形数据的方向
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping("/orgDirectionTreeMap")
	@ResponseBody
	public Object LoadOgnDirectionTreeMap(Model model, HttpServletRequest request){
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String deviceInfo = searchParam.get("deviceFlag");
		boolean deviceFlag = false;
		if (StringUtil.equals(deviceInfo, "devicePolling")) {
			deviceFlag = true;
		}
        Map<String, Object> data = null;
        List<Long> authOrgIds = orgTreeService.loadOrgTopestData();
        
        Map<String, Object> userMap = userService.getCurrentUser(request);
        String orgId = "";
		if (StringUtil.checkObj(userMap.get("ORGAN_ID"))) {
			orgId = StringUtil.toString(userMap.get("ORGAN_ID"));
		}
		boolean userFlag = false;
		if (StringUtil.equals(orgId, "440100")) {
			userFlag = true;
		} else {
			userFlag = false;
		}
        data = orgService.getOgnDirectionTreeMap(authOrgIds, true, deviceFlag, userFlag, orgId);
        this.jsonResult.setData(data == null ? null : data.get("children"));
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
	}
	
	/**
     * 只加载部门结构树
     * @return 查询结果
     */
	@RequestMapping("/onlyOrgTreeMap")
	@ResponseBody
    public Object loadOnlyOrgTreeMap(Model model, HttpServletRequest request){
        Map<String, Object> data = null;
        List<Long> authOrgIds = orgTreeService.loadOrgTopestData();
        data = orgService.getOnlyOrgTreeMap(authOrgIds, true);
        this.jsonResult.setData(data == null ? null : data.get("children"));
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
    }
	
	/**
     * 只加载一级部门结构树
     * @return 查询结果
     */
	@RequestMapping("/loadOnlyTopOrgTreeMap")
	@ResponseBody
    public Object loadOnlyTopOrgTreeMap(Model model, HttpServletRequest request){
        Map<String, String> data = orgTreeService.loadOnlyTopOrgTreeMap();
        this.jsonResult.setData(data == null ? null : data);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
    }
	
	/**
     * 只加载部门结构树,用于用户管理功能
     * @return 查询结果
     */
	@RequestMapping("/onlyOrgTreeForUser")
	@ResponseBody
    public Object onlyOrgTreeForUser(Model model, HttpServletRequest request){
        Map<String, Object> data = null;
        List<Long> authOrgIds = orgTreeService.loadOrgTopestData();
        data = orgService.onlyOrgTreeForUser(authOrgIds);
        this.jsonResult.setData(data == null ? null : data.get("children"));
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
    }
	
	/**
     * JSON获取组织结构树形数据（用于树控件）,加载到卡口
     * @return
     * @author lsg
     */
	@RequestMapping("/orgTreeMountMap")
	@ResponseBody
    public Object loadOrgTreeMountMap(Model model, HttpServletRequest request) {
        Map<String, Object> data = null;
        List<Long> authOrgIds = orgTreeService.loadOrgTopestData();
    	boolean updated = false;
    	try {
    		data = (Map<String, Object>) admin.getFromCache("KAKOU_INFO");
    		logger.debug("卡口信息来自缓存");
		} catch (Exception e) {
			logger.debug("卡口信息来自数据库");
			try {
				data = orgService.getOrganizationTreeMap(authOrgIds, true, false);
				admin.putInCache("KAKOU_INFO", data);
				updated = true;
			} finally {
				if (!updated) {
					admin.cancelUpdate("KAKOU_INFO");
				}
			}
		}
        this.jsonResult.setData(data == null ? null : data.get("children"));
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
    }
	
	/**
     * 只加载部门结构树,通过卡口模糊名称过滤一次包含此模糊卡口的部门
     * @return 查询结果
     */
	@RequestMapping("/onlyOrgTreeByKkmc")
	@ResponseBody
    public Object loadOnlyOrgTreeByKkmcMap(Model model, HttpServletRequest request){
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		/*String kkmc = searchParam.get("kkmcStr");
        Map<String, Object> data = null;
        List<Long> authOrgIds = orgTreeService.loadOrgTopestData();
        data = orgService.getOnlyOrgTreeByKkmcMap(authOrgIds, kkmc);
        this.jsonResult.setData(data == null ? null : data.get("children"));
        this.jsonResult.setNeedAlert(false);*/
        
		//List<Map<String, String>> list = orgService.getOrganizationsByCache();
		
		List<Map<String, String>> list = orgService.findAllOrgName(null);
		
		//查询结果集中添加拼音存储信息，这里的部门信息为所有的部门信息，不知道性能怎么样，有时间要放到缓存中去。
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		boolean hanziDataFlag = false; //采用汉字查询的时候，结果集是否有值的标准
		
		//拼音首字母检索
		if (StringUtil.checkStr(searchParam.get("kkmcStr"))) {
			String[] codes = searchParam.get("kkmcStr").split(",");
			for (int i = 0; i < codes.length; i++) {
				//判断查询条件中是否存在汉字，如果存在汉字就采用汉字查询方式，如果不存在，直接使用拼音检索
				if (codes[i].getBytes().length == codes[i].length()) { //相等为无汉字，否则有汉字
					if (list != null && list.size() > 0) {
						for (Map<String, String> dataMap : list) {
							String pinyin = PinyinUtil.converterToFirstSpell(dataMap.get("ORGNAME"));
							if (pinyin.contains(codes[i])) {
								results.add(dataMap);
							}
						}
					}
				} else { //采用汉字的方式查询，模糊查询数据库
					List<Map<String, String>> datas = orgService.getOrganizationsByKkmcNocache(searchParam.get("kkmcStr"));
					results.addAll(datas);
				}
			}
			//全拼检索
			if (results != null && results.size() == 0 && !hanziDataFlag) {
				if (StringUtil.checkStr(searchParam.get("kkmcStr"))) {
					String[] allcodes = searchParam.get("kkmcStr").split(",");
					for (int i = 0; i < codes.length; i++) {
						//判断查询条件中是否存在汉字，如果存在汉字就采用汉字查询方式，如果不存在，直接使用拼音检索
						if (allcodes[i].getBytes().length == allcodes[i].length()) { //相等为无汉字，否则有汉字
							if (list != null && list.size() > 0) {
								for (Map<String, String> dataMap : list) {
									String pinyin = PinyinUtil.converterToSpell(dataMap.get("ORGNAME"));
									if (pinyin.contains(allcodes[i])) {
										results.add(dataMap);
									}
								}
							}
						}
					}
				}
			}
		} else {
			results.addAll(list);
		}
		
		List<Map<String, String>> datas = this.dataToHeavy(results);
		
		OrgEntity org = null;
    	List<OrgEntity> orgList = new ArrayList<OrgEntity>();
		boolean flag = false;
    	if (datas != null && datas.size() > 0) {
    		for (Map<String, String> map : datas) {
    			if (StringUtil.equals(map.get("DWXZQH"), "-1")) {
    				flag = true;
    			}
    			if (StringUtil.checkStr(map.get("DWMC"))) {
	    			org = new OrgEntity();
	    			org.setId(Long.parseLong(map.get("PID")));
	    			org.setOrgName(map.get("DWMC"));
	    			org.setPid(Long.parseLong(map.get("DWXZQH")));
	    			orgList.add(org);
    			}
    		}
    	}
    	if (!flag) {
			OrgEntity firstOrg = new OrgEntity(); 
	    	firstOrg.setId(Long.parseLong("440100"));
	    	firstOrg.setOrgName("广州市");
	    	firstOrg.setPid(Long.parseLong("-1"));
			orgList.add(firstOrg);
		}
    	Map<String, Object> data = null;
        List<Long> authOrgIds = orgTreeService.loadOrgTopestData();
        data = orgService.getOnlyOrgTreeCacheMap(authOrgIds, orgList);
        this.jsonResult.setData(data == null ? null : data.get("children"));
        this.jsonResult.setNeedAlert(false);
		
        /*this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);*/
        
        return jsonResult;
    }
	
	/**
     * 加载到卡口的结构树,通过方向模糊名称过滤一次包含此模糊方向组织结构
     * 此方法加载到卡口树，新改造
     * @return 查询结果
     */
	@RequestMapping("/loadMountTreeByDirection")
	@ResponseBody
    public Object loadMountTreeByDirectionMap(Model model, HttpServletRequest request){
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> list = orgService.findOnlyDirection(null);
		//查询结果集中添加拼音存储信息，这里的部门信息为所有的部门信息，不知道性能怎么样，有时间要放到缓存中去。
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		boolean hanziDataFlag = false; //采用汉字查询的时候，结果集是否有值的标准
		//拼音首字母检索
		if (StringUtil.checkStr(searchParam.get("kkmcStr"))) {
			String[] codes = searchParam.get("kkmcStr").split(",");
			for (int i = 0; i < codes.length; i++) {
				//判断查询条件中是否存在汉字，如果存在汉字就采用汉字查询方式，如果不存在，直接使用拼音检索
				if (codes[i].getBytes().length == codes[i].length()) { //相等为无汉字，否则有汉字
					if (list != null && list.size() > 0) {
						for (Map<String, String> dataMap : list) {
							String pinyin = PinyinUtil.converterToFirstSpell(dataMap.get("DIRECTION_NAME"));
							if (pinyin.contains(codes[i])) {
								results.add(dataMap);
							}
						}
					}
				} else { //采用汉字的方式查询，模糊查询数据库
					List<Map<String, String>> datas = orgService.getOrgByDirectionNumberNocache(searchParam.get("kkmcStr"));
					results.addAll(datas);
					hanziDataFlag = true;
				}
			}
			//全拼检索
			if (results != null && results.size() == 0 && !hanziDataFlag) {
				if (StringUtil.checkStr(searchParam.get("kkmcStr"))) {
					String[] allcodes = searchParam.get("kkmcStr").split(",");
					for (int i = 0; i < codes.length; i++) {
						//判断查询条件中是否存在汉字，如果存在汉字就采用汉字查询方式，如果不存在，直接使用拼音检索
						if (allcodes[i].getBytes().length == allcodes[i].length()) { //相等为无汉字，否则有汉字
							if (list != null && list.size() > 0) {
								for (Map<String, String> dataMap : list) {
									String pinyin = PinyinUtil.converterToSpell(dataMap.get("DIRECTION_NAME"));
									if (pinyin.contains(allcodes[i])) {
										results.add(dataMap);
									}
								}
							}
						}
					}
				}
			}
		} else {
			results.addAll(list);
		}
		List<Map<String, String>> allDirections = orgService.findAllDirection(null);
		List<Map<String, String>> filteDatas = new ArrayList<Map<String,String>>();
		if (StringUtil.checkStr(searchParam.get("kkmcStr"))) {
			//组织结构树过滤
			for (Map<String, String> derectionMap : allDirections) {
				for (Map<String, String> resultMap : results) {
					if (StringUtil.equals(derectionMap.get("ID"), resultMap.get("ID"))) {
						filteDatas.add(derectionMap);
						break;
					}
				}
			}
		} else {
			filteDatas.addAll(allDirections);
		}
		OrgEntity org = null;
    	List<OrgEntity> orgList = new ArrayList<OrgEntity>();
    	if (filteDatas != null && filteDatas.size() > 0) {
    		for (Map<String, String> map : filteDatas) {
    			if (StringUtil.checkStr(map.get("ORGNAME"))) {
	    			org = new OrgEntity();
	    			org.setId(Long.parseLong(map.get("ID")));
	    			org.setOrgName(map.get("ORGNAME"));
	    			org.setOrgType(Long.parseLong(map.get("ORGTYPE")));
	    			org.setPid(Long.parseLong(map.get("PID")));
	    			orgList.add(org);
    			}
    		}
    	}
    	List<OrgEntity> depts = orgService.getDeptHavingDirection();
    	List<OrgEntity> felteDepts = new ArrayList<OrgEntity>();
    	if (!hanziDataFlag && StringUtil.checkStr(searchParam.get("kkmcStr"))) {
    		//根据拼音查询的时候,隐藏掉没有被搜索到的部门
    		if (StringUtil.checkStr(searchParam.get("kkmcStr"))) {
    			felteDepts.add(depts.get(0));
    			for (OrgEntity orgEntity : depts) {
        			for (Map<String, String> resultMap : filteDatas) {
        				if (StringUtil.equals(StringUtil.toString(orgEntity.getId()), resultMap.get("PID"))) {
        					felteDepts.add(orgEntity);
        					break;
        				}
        			}
        		}
    			orgList.addAll(felteDepts);
    		} else {
    			orgList.addAll(depts);
    		}
    	}
    	Map<String, Object> data = null;
        List<Long> authOrgIds = orgTreeService.loadOrgTopestData();
        data = orgService.getOnlyOrgTreeCacheMap(authOrgIds, orgList);
        this.jsonResult.setData(data == null ? null : data.get("children"));
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
    }
	
	/*
	 * 权限
	 */
	@RequestMapping("/onlyOrgTreeByQuanxian")
	@ResponseBody
    public Object loadOnlyOrgTreeByQuanxian(Model model, HttpServletRequest request){
    	List<OrgEntity> orgList = new ArrayList<OrgEntity>();
    	Map<String, Object> data = null;
        List<Long> authOrgIds = orgTreeService.loadOrgTopestRole();
        data = orgService.getOnlyOrgTreeCacheMap(authOrgIds, orgList);
        this.jsonResult.setData(data == null ? null : data.get("children"));
        this.jsonResult.setNeedAlert(false);
		
        /*this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);*/
        
        return jsonResult;
    }
	
	/**
     * 数据去重
     * @param results 数据集合
     * @return 组织结构数据列表
     * @author lsg
     */
    public List<Map<String, String>> dataToHeavy(List<Map<String, String>> results ) {
    	List<Map<String, String>> datas = new ArrayList<Map<String,String>>();
    	boolean flag = false;
    	//Map<String, String> map = null;
    	if (results != null && results.size() > 0) {
    		datas.add(results.get(0));
    		for (Map<String, String> resultMap : results) {
    			flag = false;
    			for (Map<String, String> dataMap : datas) {
    				if (StringUtil.equals(resultMap.get("PID"), dataMap.get("PID"))) {
    					flag = true;
    					break;
    				} 
    			}
    			if (!flag) {
    				datas.add(resultMap);
    			}
    		}
    	}
    	return datas;
    }
	
	/**
	 * 检查是否存已存在设备
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/checkOrganization")
	@ResponseBody
	public Object checkOrganizationInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> oldResults = orgService.checkOrgInfo(searchParam);
		int saveFlag = 0;
		if (oldResults != null && oldResults.size() > 0) {
			saveFlag = -1;
		}
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 添加组织机构
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/addOrganization")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'新增单位信息'",content="'单位名称:' + getWebParamInfo().get('DWMC')",needPersist= true,operation="ADD")
	public Object addOrganizationInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int saveFlag = 0;
		List<Map<String, String>> results = orgService.loadOrgData();
		if (!StringUtil.checkStr(searchParam.get("CZDM"))) {
			searchParam.put("CZDM", results.get(0).get("QYMC"));
		}
		if (!StringUtil.checkStr(searchParam.get("DWXZQH"))) {
			searchParam.put("DWXZQH", results.get(0).get("ID"));
		}
		saveFlag = this.orgService.addOrgInfo(searchParam);
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 初始化修改设备卡口基本信息数据的详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/initOrganizationDetail")
	@ResponseBody
	public Object initOrganizationDetailInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> results = orgService.checkOrgInfo(searchParam);
		this.jsonResult.setData(results);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}
	
	/**
	 * 修改组织机构
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/updateOrganization")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'修改单位信息'",content="'单位名称:' + getWebParamInfo().get('DWMC')",needPersist= true,operation="UPDATE")
	public Object updateOrganizationInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int updateFlag = 0;
		String curentTime = DateUtil.getCurrentDateTime();
		searchParam.put("updateDate", curentTime);
		updateFlag = this.orgService.updateOrgInfo(searchParam);
		this.jsonResult.setData(updateFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 删除组织机构
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/deleteOrganization")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('USER_CODE')+'删除单位信息'",content="'单位编号:' + getWebParamInfo().get('KKBHS')",needPersist= true,operation="DELETE")
	public Object deleteOrganizationInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int deleteFlag = 0;
		deleteFlag = this.orgService.deleteOrgInfo(searchParam);
		this.jsonResult.setData(deleteFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
     * JSON根据字典类别获取字典项目列表的功能（用于下拉框）
     * @return 组装结果
     * @author lsg
     */
	@RequestMapping("/jsonOrgFileds")
	@ResponseBody
    public Object findOrgFiledsData(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> list = orgService.findAllOrgName(null);
		//查询结果集中添加拼音存储信息，这里的部门信息为所有的部门信息，不知道性能怎么样，有时间要放到缓存中去。
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		boolean hanziDataFlag = false; //采用汉字查询的时候，结果集是否有值的标准
		
		//拼音首字母检索
		if (StringUtil.checkStr(searchParam.get("code"))) {
			searchParam.get("code").replaceAll("，", ",");
			String[] codes = searchParam.get("code").split(",");
			List<Map<String, String>> datas = orgService.findAllOrgName(codes);
			for (int i = 0; i < codes.length; i++) {
				//判断查询条件中是否存在汉字，如果存在汉字就采用汉字查询方式，如果不存在，直接使用拼音检索
				if (codes[i].getBytes().length == codes[i].length()) { //相等为无汉字，否则有汉字
					if (list != null && list.size() > 0) {
						for (Map<String, String> dataMap : list) {
							String pinyin = PinyinUtil.converterToFirstSpell(dataMap.get("ORGNAME"));
							if (pinyin.contains(codes[i])) {
								Map<String, String> map = new HashMap<String, String>();
								map.put("text", dataMap.get("ORGNAME"));
								map.put("id", dataMap.get("ID"));
								map.put("type", dataMap.get("ORGTYPE"));
								results.add(map);
							}
						}
					}
				} else { //采用汉字的方式查询，模糊查询数据库
					if (datas != null && datas.size() > 0) {
						for (Map<String, String> nameMap : datas) {
							Map<String, String> map = new HashMap<String, String>();
							map.put("text", nameMap.get("ORGNAME"));
							map.put("id", nameMap.get("ID"));
							map.put("type", nameMap.get("ORGTYPE"));
							results.add(map);
							hanziDataFlag = true;
						}
					}
				}
			}
		}
		//全拼检索
		if (results != null && results.size() == 0 && !hanziDataFlag) {
			if (StringUtil.checkStr(searchParam.get("code"))) {
				String[] codes = searchParam.get("code").split(",");
				for (int i = 0; i < codes.length; i++) {
					//判断查询条件中是否存在汉字，如果存在汉字就采用汉字查询方式，如果不存在，直接使用拼音检索
					if (codes[i].getBytes().length == codes[i].length()) { //相等为无汉字，否则有汉字
						if (list != null && list.size() > 0) {
							for (Map<String, String> dataMap : list) {
								String pinyin = PinyinUtil.converterToSpell(dataMap.get("ORGNAME"));
								if (pinyin.contains(codes[i])) {
									Map<String, String> map = new HashMap<String, String>();
									map.put("text", dataMap.get("ORGNAME"));
									map.put("id", dataMap.get("ID"));
									map.put("type", dataMap.get("ORGTYPE"));
									results.add(map);
								}
							}
						}
					}
				}
			}
		}
        this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
    }
	
	/**
     * JSON只加载卡点树（用于下拉框）
     * @return 组装结果
     * @author lsg
     */
	@RequestMapping("/jsonMountsTree")
	@ResponseBody
    public Object loadMountsTree(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> list = orgService.findAllOrgName(null);
		//查询结果集中添加拼音存储信息，这里的部门信息为所有的部门信息，不知道性能怎么样，有时间要放到缓存中去。
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		boolean hanziDataFlag = false; //采用汉字查询的时候，结果集是否有值的标准
		
		//拼音首字母检索
		if (StringUtil.checkStr(searchParam.get("orgName"))) {
			//searchParam.get("orgName").replaceAll("，", ",");
			String[] codes = searchParam.get("orgName").split(",");
			for (int i = 0; i < codes.length; i++) {
				//判断查询条件中是否存在汉字，如果存在汉字就采用汉字查询方式，如果不存在，直接使用拼音检索
				if (codes[i].getBytes().length == codes[i].length()) { //相等为无汉字，否则有汉字
					if (list != null && list.size() > 0) {
						for (Map<String, String> dataMap : list) {
							String pinyin = PinyinUtil.converterToFirstSpell(dataMap.get("ORGNAME"));
							if (pinyin.contains(codes[i])) {
								Map<String, String> map = new HashMap<String, String>();
								map.put("id", dataMap.get("ID"));
								map.put("orgId", dataMap.get("PID"));
								map.put("kkbh", dataMap.get("KKBH"));
								map.put("text", dataMap.get("ORGNAME"));
								map.put("realName", dataMap.get("ORGNAME"));
								map.put("orgType", dataMap.get("ORGTYPE"));
								map.put("state", "0");
								map.put("kkzt", dataMap.get("KKZT"));
								results.add(map);
							}
						}
					}
				} else { //采用汉字的方式查询，模糊查询数据库
					List<Map<String, String>> datas = orgService.findAllOrgNameNoCache(codes);
					if (datas != null && datas.size() > 0) {
						for (Map<String, String> nameMap : datas) {
							Map<String, String> map = new HashMap<String, String>();
							map.put("id", nameMap.get("ID"));
							map.put("orgId", nameMap.get("PID"));
							map.put("kkbh", nameMap.get("KKBH"));
							map.put("text", nameMap.get("ORGNAME"));
							map.put("realName", nameMap.get("ORGNAME"));
							map.put("orgType", nameMap.get("ORGTYPE"));
							map.put("state", "0");
							map.put("kkzt", nameMap.get("KKZT"));
							results.add(map);
							hanziDataFlag = true;
						}
					}
				}
			}
			//全拼检索
			if (results != null && results.size() == 0 && !hanziDataFlag) {
				if (StringUtil.checkStr(searchParam.get("orgName"))) {
					String[] allcodes = searchParam.get("orgName").split(",");
					for (int i = 0; i < codes.length; i++) {
						//判断查询条件中是否存在汉字，如果存在汉字就采用汉字查询方式，如果不存在，直接使用拼音检索
						if (allcodes[i].getBytes().length == allcodes[i].length()) { //相等为无汉字，否则有汉字
							if (list != null && list.size() > 0) {
								for (Map<String, String> dataMap : list) {
									String pinyin = PinyinUtil.converterToSpell(dataMap.get("ORGNAME"));
									if (pinyin.contains(allcodes[i])) {
										Map<String, String> map = new HashMap<String, String>();
										map.put("id", dataMap.get("ID"));
										map.put("orgId", dataMap.get("PID"));
										map.put("kkbh", dataMap.get("KKBH"));
										map.put("text", dataMap.get("ORGNAME"));
										map.put("realName", dataMap.get("ORGNAME"));
										map.put("orgType", dataMap.get("ORGTYPE"));
										map.put("state", "0");
										map.put("kkzt", dataMap.get("KKZT"));
										results.add(map);
									}
								}
							}
						}
					}
				}
			}
		} else {
			String orgName = searchParam.get("orgName");
			String[] orgNames = new String[1];
			orgNames[0] = orgName;
			List<Map<String, String>> datalist = orgService.findAllOrgName(orgNames);
            //重新封装分页数据，增加所属部门信息 
	        //List<Map<String, String>> mapList = new ArrayList<Map<String, String>>();
	        for (Map<String, String> map : datalist) {
	        //重新封装数据 
	            Map<String, String> resultMap = new HashMap<String, String>();
	            resultMap.put("id", map.get("ID"));
	            resultMap.put("orgId", map.get("PID"));
	            resultMap.put("kkbh", map.get("KKBH"));
	            resultMap.put("text", map.get("ORGNAME"));
	            resultMap.put("realName", map.get("ORGNAME"));
	            resultMap.put("orgType", map.get("ORGTYPE"));
	            resultMap.put("state", "0");
	            resultMap.put("kkzt", map.get("KKZT"));
	            results.add(resultMap);
	        }
		}
        this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
		/*Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		String orgName = searchParam.get("orgName");
		String[] orgNames = new String[1];
		orgNames[0] = orgName;
		List<Map<String, String>> list = orgService.findAllOrgName(orgNames);
                    重新封装分页数据，增加所属部门信息 
        List<Map<String, String>> mapList = new ArrayList<Map<String, String>>();
        for (Map<String, String> map : list) {
                     重新封装数据 
            Map<String, String> resultMap = new HashMap<String, String>();
            resultMap.put("id", map.get("ID"));
            resultMap.put("orgId", map.get("PID"));
            resultMap.put("kkbh", map.get("KKBH"));
            resultMap.put("text", map.get("ORGNAME"));
            resultMap.put("realName", map.get("ORGNAME"));
            resultMap.put("state", "0");

            mapList.add(resultMap);
        }
        this.jsonResult.setData(mapList);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;*/
	}
	
	/**
     * 只加方向的树
     * @return 组装结果
     * @author lsg
     */
	@RequestMapping("/jsonDirectionsTree")
	@ResponseBody
    public Object loadDirectionsTree(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> list = orgService.findOnlyDirection(null);
		//查询结果集中添加拼音存储信息，这里的部门信息为所有的部门信息，不知道性能怎么样，有时间要放到缓存中去。
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		boolean hanziDataFlag = false; //采用汉字查询的时候，结果集是否有值的标准
		//拼音首字母检索
		if (StringUtil.checkStr(searchParam.get("orgName"))) {
			String[] codes = searchParam.get("orgName").split(",");
			for (int i = 0; i < codes.length; i++) {
				//判断查询条件中是否存在汉字，如果存在汉字就采用汉字查询方式，如果不存在，直接使用拼音检索
				if (codes[i].getBytes().length == codes[i].length()) { //相等为无汉字，否则有汉字
					if (list != null && list.size() > 0) {
						for (Map<String, String> dataMap : list) {
							String pinyin = PinyinUtil.converterToFirstSpell(dataMap.get("DIRECTION_NAME"));
							if (pinyin.contains(codes[i])) {
								Map<String, String> map = new HashMap<String, String>();
								map.put("id", dataMap.get("DIRECTION_NUMBER"));
								map.put("orgId", dataMap.get("ID"));
								map.put("directionNumber", dataMap.get("DIRECTION_NUMBER"));
								map.put("text", dataMap.get("DIRECTION_NAME"));
								map.put("realName", dataMap.get("DIRECTION_NAME"));
								map.put("orgType", dataMap.get("ORGTYPE"));
								map.put("state", "0");
								map.put("monitorState", dataMap.get("MONITOR_STATE"));
								results.add(map);
							}
						}
					}
				} else { //采用汉字的方式查询，模糊查询数据库
					List<Map<String, String>> datas = orgService.findDirectionByNameNoCache(codes);
					if (datas != null && datas.size() > 0) {
						for (Map<String, String> nameMap : datas) {
							Map<String, String> map = new HashMap<String, String>();
							map.put("id", nameMap.get("DIRECTION_NUMBER"));
							map.put("orgId", nameMap.get("ID"));
							map.put("directionNumber", nameMap.get("DIRECTION_NUMBER"));
							map.put("text", nameMap.get("DIRECTION_NAME"));
							map.put("realName", nameMap.get("DIRECTION_NAME"));
							map.put("orgType", nameMap.get("ORGTYPE"));
							map.put("state", "0");
							map.put("monitorState", nameMap.get("MONITOR_STATE"));
							results.add(map);
							hanziDataFlag = true;
						}
					}
				}
			}
			//全拼检索
			if (results != null && results.size() == 0 && !hanziDataFlag) {
				if (StringUtil.checkStr(searchParam.get("orgName"))) {
					String[] allcodes = searchParam.get("orgName").split(",");
					for (int i = 0; i < codes.length; i++) {
						//判断查询条件中是否存在汉字，如果存在汉字就采用汉字查询方式，如果不存在，直接使用拼音检索
						if (allcodes[i].getBytes().length == allcodes[i].length()) { //相等为无汉字，否则有汉字
							if (list != null && list.size() > 0) {
								for (Map<String, String> dataMap : list) {
									String pinyin = PinyinUtil.converterToSpell(dataMap.get("DIRECTION_NAME"));
									if (pinyin.contains(allcodes[i])) {
										Map<String, String> map = new HashMap<String, String>();
										map.put("id", dataMap.get("DIRECTION_NUMBER"));
										map.put("orgId", dataMap.get("ID"));
										map.put("directionNumber", dataMap.get("DIRECTION_NUMBER"));
										map.put("text", dataMap.get("DIRECTION_NAME"));
										map.put("realName", dataMap.get("DIRECTION_NAME"));
										map.put("orgType", dataMap.get("ORGTYPE"));
										map.put("state", "0");
										map.put("monitorState", dataMap.get("MONITOR_STATE"));
										results.add(map);
									}
								}
							}
						}
					}
				}
			}
		} else {
			/*String orgName = searchParam.get("orgName");
			String[] orgNames = new String[1];
			orgNames[0] = orgName;
			List<Map<String, String>> datalist = orgService.findOnlyDirection(orgNames);*/
            //重新封装分页数据，增加所属部门信息 
	        //List<Map<String, String>> mapList = new ArrayList<Map<String, String>>();
	        for (Map<String, String> map : list) {
	        //重新封装数据 
	            Map<String, String> resultMap = new HashMap<String, String>();
	            resultMap.put("id", map.get("DIRECTION_NUMBER"));
	            resultMap.put("orgId", map.get("ID"));
	            resultMap.put("directionNumber", map.get("DIRECTION_NUMBER"));
	            resultMap.put("text", map.get("DIRECTION_NAME"));
	            resultMap.put("realName", map.get("DIRECTION_NAME"));
	            resultMap.put("orgType", map.get("ORGTYPE"));
	            resultMap.put("state", "0");
	            resultMap.put("monitorState", map.get("MONITOR_STATE"));
	            results.add(resultMap);
	        }
		}
        this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
	}
	
	/**
     * JSON只加载卡点树（用于下拉框）
     * @return 组装结果
     * @author lsg
     */
	@RequestMapping("/findHavingData")
	@ResponseBody
    public Object findHavingDataInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> list = orgService.findHavingData(searchParam);
        /* 重新封装分页数据，增加所属部门信息 */
        List<Map<String, String>> mapList = new ArrayList<Map<String, String>>();
        for (Map<String, String> map : list) {
            /* 重新封装数据 */
            Map<String, String> resultMap = new HashMap<String, String>();
            resultMap.put("id", map.get("ID"));
            resultMap.put("kkbh", map.get("KKBH"));
            resultMap.put("orgId", map.get("PID"));
            resultMap.put("text", map.get("ORGNAME"));
            resultMap.put("realName", map.get("ORGNAME"));
            resultMap.put("orgType", map.get("ORGTYPE"));
            resultMap.put("state", "0");

            mapList.add(resultMap);
        }
        this.jsonResult.setData(mapList);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
		
	}
	
	/**
     * 查询被勾选的方向
     * @return 组装结果
     * @author lsg
     */
	@RequestMapping("/findCheckedDirections")
	@ResponseBody
    public Object findCheckedDirectionsInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> list = orgService.findCheckedDirectionsInfo(searchParam);
        /* 重新封装分页数据，增加所属部门信息 */
        List<Map<String, String>> mapList = new ArrayList<Map<String, String>>();
        for (Map<String, String> map : list) {
            /* 重新封装数据 */
            Map<String, String> resultMap = new HashMap<String, String>();
            resultMap.put("id", map.get("DIRECTION_NUMBER"));
            resultMap.put("orgId", map.get("ID"));
            resultMap.put("directionNumber", map.get("DIRECTION_NUMBER"));
            resultMap.put("text", map.get("DIRECTION_NAME"));
            resultMap.put("realName", map.get("DIRECTION_NAME"));
            resultMap.put("orgType", map.get("ORGTYPE"));
            resultMap.put("state", "0");
            resultMap.put("monitorState", map.get("MONITOR_STATE"));
            mapList.add(resultMap);
        }
        this.jsonResult.setData(mapList);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
	}
	
	/**
     * 获取所有部门（用于下拉框）
     * @return 组装结果
     * @author lsg
     */
	@RequestMapping("/loadOllOrg")
	@ResponseBody
    public Object loadOllOrgInfo(Model model, HttpServletRequest request) {
		Map mapDatas = orgService.cachePubOrgData();
		List<Map<String, String>> datas = (List<Map<String,String>>) mapDatas.get("ORG_INFO");
		List<Map<String, String>> results = new ArrayList<Map<String,String>>();
		if (datas != null && datas.size() > 0) {
			for (Map<String, String> dataMap : datas) {
				Map<String, String> map = new HashMap<String, String>();
				map.put("text", dataMap.get("DWMC"));
				map.put("id", dataMap.get("DWBH"));
				results.add(map);
			}
		}
        this.jsonResult.setData(results);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
    }
}
