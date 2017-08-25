package com.jp.tic.security.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.MapUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jp.tic.business.user.service.UserService;
import com.jp.tic.common.entity.Tree;
import com.jp.tic.common.util.BeanIntrospectorUtils;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.framework.service.Service;
import com.jp.tic.security.entity.RoleGroup;
import com.jp.tic.security.entity.UserAction;
import com.jp.tic.security.entity.UserRole;
import com.jp.tic.security.service.UserActionService;
import com.jp.tic.security.service.UserRoleService;
import com.jp.tic.security.service.impl.ModuleService;
import com.jp.tic.system.core.annotation.Log;
import com.jp.tic.system.service.ProviderService;
import com.jp.tic.utils.ResponseUtils;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

/**
 * <b>function:</b> 权限角色
 * @author hoojo
 * @createDate 2014-8-6 下午02:18:20
 * @file UserRoleActionController.java
 * @package com.jp.tic.security.controller
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
@RequestMapping("/roleAction")
@Controller
public class UserRoleActionController<T extends UserAction,E extends Map<String,Object>, X extends UserRole> extends AbstractController {

	@Autowired
	private UserActionService<T> service;
	
	@Autowired
	private ProviderService<T> providerservice;
	
	@Autowired
	private UserRoleService<X> roleService;
	
	@Autowired
	private Service<RoleGroup> roleGroupService;
	
	@Autowired
	private ModuleService moduleServicel;
	
	@Autowired
	private UserService userService;

	public List<T> getActionsByRoleId(Map<String, Object> param) throws Exception {
		return (List<T>) service.getList(param);

	}

	public List<Map<String, String>> getActionGroupList(Map<String, Object> param) throws Exception {
		return service.getGroupList(param);
	}
	
	/**
	 * 加载查询页面
	 * @return 页面映射
	 */
	@RequestMapping("/roleMgrNew")
	public String devicePolingLoad() {
		return "/security/role-manager";
	}
	
	@RequestMapping("/tree")
	@ResponseBody
	public Tree loadTreeData(String userRoleId, Tree tree) throws Exception {
		return roleService.loadTreeData(userRoleId, tree);
	}
	
	//查询
	@SuppressWarnings("unchecked")
	@RequestMapping("/query/rolesNew")
	@ResponseBody
	public Object queryRoleDataNew(Map<String, String> param,HttpServletRequest request) throws Exception {
		List<Map> result =  this.roleService.queryRoles();
		return ResponseUtils.sendList(result, 0);
	}
	
	@RequestMapping("/query/roles")
	@ResponseBody
	public Object queryRoleData(Map<String, String> param,HttpServletRequest request) throws Exception {
		return roleService.queryRoles();
	}

	//查询
	@SuppressWarnings("unchecked")
	@RequestMapping("/RoleIDs")
	public Object reginXiangxi(Map<String, String> param,HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> result = service.xiangxi(searchParam);
		this.jsonResult.setData(result);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult; 
	}	
	
	//删除角色
	@SuppressWarnings("unchecked")
	@RequestMapping("/roleDeletes")
	@ResponseBody
		public Object jiaoseDelete(Map<String, String> param,HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int deleteFlag = 0;
		deleteFlag = this.service.roleDelete(searchParam);
		this.jsonResult.setData(deleteFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 角色详细信息
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	public Map<String, Object>  reilexiangxi(Map<String, String> param, Map<String, String> searchParam) {
		Map<String, Object> queryParam =  BeanIntrospectorUtils.desc(param);
		String ID = searchParam.get("id");
		 queryParam.put("id", ID);
		return queryParam;
	}

	/**
	 * 删除角色
	 * @param model 模型
	 * @param request 上下文请求
	 * @return 返回结果
	 */
	public Map<String, Object>  roleDelete(Map<String, String> param, Map<String, String> searchParam) {
		Map<String, Object> queryParam =  BeanIntrospectorUtils.desc(param);
		String ID = searchParam.get("id");
		 queryParam.put("id", ID);
		return queryParam;
	}
	
	/**
	 * 修改角色
	 * @param param 查询参数
	 * @return 返回结果
	 */
	@RequestMapping("/updateProvider")
	@ResponseBody
	@Log(value = "'用户'+getCurrentUser().get('roleName')+'修改角色信息'",needPersist= true,operation="UPDATE")
	public Object updateRole(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int updateFlag = 0;
		updateFlag = this.providerservice.updateProviderInfo(searchParam);
		this.jsonResult.setData(updateFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}

	/**
	 * 新增角色
	 * @param model
	 * @param request 上下文请求
	 * @return 处理结果
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/addRole")
	@ResponseBody
	public Object addRoleInfo(Model model, HttpServletRequest request) {
		Map<String, String> userMap = (Map<String, String>) request.getSession().getAttribute(AbstractController.SESSION_USER);
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int saveFlag = 0;
		String curentTime = DateUtil.getCurrentDateTime();
		searchParam.put("updateDate", curentTime);
		saveFlag = this.roleService.addRoleInfo(searchParam, userMap);
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping("/addRoles")
	public Object addUserInfo(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int saveFlag = 0;
		saveFlag = this.roleService.addRole(searchParam);
		this.jsonResult.setData(saveFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	/**
	 * 修改角色信息
	 * @param param 查询参数
	 * @return 返回结果
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/updateRole")
	@ResponseBody
	public Object updateRoleInfo(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		int updateFlag = 0;
		updateFlag = this.roleService.updateRoleInfo(searchParam);
		this.jsonResult.setData(updateFlag);
	    this.jsonResult.setNeedAlert(false);
	    return jsonResult;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping("/edit/role")
	@ResponseBody
	public boolean editRole(RoleGroup roleGroup, HttpServletRequest request) throws Exception {
		Map<String, String> user = (Map<String, String>) request.getSession().getAttribute(AbstractController.SESSION_USER);
		roleGroup.setCreateUser(MapUtils.getString(user, "USER_NAME"));
		return roleService.editGroupRole(roleGroup);
	}

	@SuppressWarnings("unchecked")
	@RequestMapping("/remove/role")
	@ResponseBody
	public boolean removeRole(RoleGroup roleGroup) throws Exception {
		if (roleService.removeByIds("roleId", roleGroup.getRoleId())) {
			return roleGroupService.remove(roleGroup);
		}
		return false;
	}
	
	/**
	 * 菜单功能权限管理,菜单结构树
	 * @return 处理结果
	 */
	@RequestMapping("/loadAllModuleTree")
	@ResponseBody
	public Object loadAllModuleTreeMap(HttpServletRequest request) {
        Map<String, Object> data = null;
        //TODO
        Map<String, String> user = (Map<String, String>) request.getSession().getAttribute(AbstractController.SESSION_USER);
        String userCode="";
        if (StringUtil.checkStr(user.get("USER_CODE"))) {
			userCode = user.get("USER_CODE");
		}
        data = moduleServicel.getModuleTreeMapButPermGroup(Long.valueOf(0), null, true,userCode);
        this.jsonResult.setData(data == null ? null : data.get("children"));
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
    }
	
	/**
	 * 查询已选的菜单项
	 * @param model 
	 * @param request 上下文请求
	 * @return 查询结果
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/findCheckedModule")
	@ResponseBody
	public Object findCheckedModuleInfo(Model model, HttpServletRequest request) {
		Map<String, String> searchParam = RequestUtil.getMapByRequest(request);  
		List<Map<String, String>> result = roleService.findCheckedModuleInfo(searchParam);
		List<Map<String, String>> roleDatas = roleService.initRoleUpdateData(searchParam);
		Map<String, String> map = null;
		List<Map<String, String>> moduleMaps = new ArrayList<Map<String, String>>();
		if (result != null && result.size() > 0) {
           for (Map<String, String> module : result) {
               map = new HashMap<String, String>();
               map.put("id", module.get("ACTIONID"));
           	   map.put("name", module.get("NAME"));
           	   moduleMaps.add(map);
           }
		}
		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("id", roleDatas.get(0).get("ROLE_ID"));
		dataMap.put("name", roleDatas.get(0).get("ROLE_NAME"));
		dataMap.put("permgroupRole", roleDatas.get(0).get("ROLE_CODE"));
		dataMap.put("modules", moduleMaps);
		dataMap.put("addBtn", roleDatas.get(0).get("ADD_ROLE"));
		dataMap.put("editBtn", roleDatas.get(0).get("EDIT_ROLE"));
		dataMap.put("deleteBtn", roleDatas.get(0).get("DELETE_ROLE"));
		dataMap.put("unsingFlag", roleDatas.get(0).get("USEING_FLAG"));
		dataMap.put("editVediao", roleDatas.get(0).get("EDIT_VEDIAO"));
		this.jsonResult.setData(dataMap);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
	}
	
	/**
	 * 查询已选的菜单项
	 * @param model 
	 * @param request 上下文请求
	 * @return 查询结果
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/findUserRoleInfo")
	@ResponseBody
	public Object findUserRoleInfo(Model model, HttpServletRequest request) throws Exception {
		Map<String, String> user = (Map<String, String>) request.getSession().getAttribute(AbstractController.SESSION_USER);
		String userCode = "";
		if (StringUtil.checkStr(user.get("USER_CODE"))) {
			userCode = user.get("USER_CODE");
		}
		List<Map<String, String>> userDatas = userService.findUserInfo(userCode);
		Map<String, String> param = new HashMap<String, String>();
		if (userDatas != null && userDatas.size() > 0) {
			param.put("id", userDatas.get(0).get("ROLE_ID"));
		}
		List<Map<String, String>> roleDatas = roleService.initRoleUpdateData(param);
		this.jsonResult.setData(roleDatas);
        this.jsonResult.setNeedAlert(false);
        return jsonResult;
	}
}
