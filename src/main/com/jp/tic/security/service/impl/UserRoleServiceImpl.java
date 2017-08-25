package com.jp.tic.security.service.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.user.service.UserService;
import com.jp.tic.common.entity.Tree;
import com.jp.tic.framework.service.impl.GeneratorServiceImpl;
import com.jp.tic.security.dao.ModuleDao;
import com.jp.tic.security.entity.RoleGroup;
import com.jp.tic.security.entity.UserAction;
import com.jp.tic.security.entity.UserRole;
import com.jp.tic.security.mapper.UserRoleMapper;
import com.jp.tic.security.service.UserActionService;
import com.jp.tic.security.service.UserRoleService;
import com.jp.tic.utils.lang.StringUtil;

/**
 * <b>function:</b> 权限角色关联表Service实现
 * @author chengw
 * @createDate 2013-7-24 上午10:44:05
 * @file SysTRoleModuleServiceImpl.java
 * @package com.jp.tic.module.service.impl
 * @project JTZHJK-Server
 * @blog 
 * @email chengw@gzjp.cn
 * @version 1.0
 */
@Service
public class UserRoleServiceImpl<T extends UserRole> extends GeneratorServiceImpl<UserRole> implements UserRoleService<T> {
	
	@Autowired
	private UserRoleMapper<T> mapper;
	
	@Autowired
	private UserActionService<UserAction> service;
	
	@Autowired
	private com.jp.tic.framework.service.Service<RoleGroup> roleGroupService;
	
	@Autowired
	private ModuleDao moduleDao;
	
	@Autowired
	private UserService userService;
	
	public UserRoleServiceImpl() {
		super(UserRole.class);
	}
	
	@SuppressWarnings("unchecked")
	public void getTreeByParentId2Recursion(Tree entity, List<T> roles) throws Exception {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("parentId", entity.getId());
		List<Tree> child =  service.getListByParentId(param);
		if (child.size() > 0) {
			for (Tree item : child) {
				boolean checked = false;
				for (T role : roles) {
					if (Integer.parseInt(item.getId()) == role.getActionId()) {
						checked = true;
						roles.remove(role);
						break;
					}
				}
				item.setChecked(checked);
				this.getTreeByParentId2Recursion(item, roles);
			}
			entity.setChildren(child);
		} else {
			entity.setLeaf(true);
		}
	}
	
	public Tree loadTreeData(String userRoleId, Tree tree) throws Exception {
		
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("roleId", userRoleId);
		
		List<T> roles = findRolesById(param);
		this.getTreeByParentId2Recursion(tree, roles);
		
		return tree;
	}

	@Override
	public List<T> findRolesById(Map<String, Object> param) throws Exception {
		return mapper.getRolesByRoleId(param);
	}

	public List<Map> queryRoles() throws Exception {
		return mapper.queryRoles();
	}
	
	public int addRole(Map<String, String> param) throws Exception {
		return mapper.addRole(param);
	}
	
	public int updateRole(Map<String, String> param) throws Exception {
		return mapper.updateRole(param);
	}
	public boolean addGroupRole(RoleGroup roleGroup) throws Exception {
		roleGroup.setCreateDate(new Timestamp(System.currentTimeMillis()));
		try {
			int groupId = roleGroupService.addAndGetId4Integer(roleGroup);
			
			String[] actions = StringUtils.split(roleGroup.getIds(), ",");
			List<UserRole> roles = new ArrayList<UserRole>();
			for (String actionId : actions) {
				roles.add(new UserRole(NumberUtils.toInt(actionId), groupId, new Date()));
			}
			if (saveOrUpdate(roles)) {
				return true;
			} else {
				throw new Exception();
			}
		} catch (Exception e) {
			error(e);
			throw e;
		}
	}
	
	public boolean editGroupRole(RoleGroup roleGroup) throws Exception {
		
		try {
			if (roleGroupService.edit(roleGroup)) {
			
				if (this.removeByIds("roleId", roleGroup.getRoleId())) {
					
					String[] actions = StringUtils.split(roleGroup.getIds(), ",");
					List<UserRole> roles = new ArrayList<UserRole>();
					for (String actionId : actions) {
						roles.add(new UserRole(NumberUtils.toInt(actionId), roleGroup.getRoleId(), new Date()));
					}
					if (saveOrUpdate(roles)) {
						return true;
					} else {
						throw new Exception();
					}
				} else {
					throw new Exception();
				}
			}
			return false;
		} catch (Exception e) {
			error(e);
			throw e;
		}
	}
	
	/**
	 * 新增角色
	 * @param param 页面参数
	 * @param userMap 用户参数
	 * @return 处理结果
	 */
	public int addRoleInfo(Map<String, String> param, Map<String, String> userMap) {
		return moduleDao.addRoleInfo(param, userMap);
	}
	
	/**
	 * 查询已选的菜单项
	 * @param param 页面参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> findCheckedModuleInfo(Map<String, String> param) {
		return moduleDao.findCheckedModuleInfo(param);
	}
	
	/**
	 * 初始化待修改的角色数据
	 * @param param 页面参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> initRoleUpdateData(Map<String, String> param) {
		return moduleDao.initRoleUpdateData(param);
	}
	
	/**
	 * 修改角色信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateRoleInfo(Map<String, String> param) {
		return moduleDao.updateRoleInfo(param);
	}
	
	/**
	 * 获取视频编辑按钮状态
	 * @param userCode 用户账号
	 * @return 返回结果，0表示未授权，1表示已授权
	 */
	public String[] getEditVediaoStatus(String userCode) {
		String status = "0";
		String roleId = "";
		String orgStr = "";
		String[] userArr = new String[2];
		try {
			List<Map<String, String>> userInfos = userService.findUserInfo(userCode);
			String orgCode = "";
			if (userInfos != null && userInfos.size() > 0) {
				roleId = userInfos.get(0).get("ROLE_ID");
				orgCode = userInfos.get(0).get("ORG_CODE");
			}
			if (StringUtil.checkStr(orgCode)) {
				orgStr = orgCode.substring(0, 6);
				if (StringUtil.equals(orgStr, "440100")) {
					orgStr = orgCode.substring(0, 8);
					if (!StringUtil.equals(orgStr, "44010023")) {
						orgStr = orgCode.substring(0, 4);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		status = moduleDao.getEditVediaoStatus(roleId);
		userArr[0] = status;
		userArr[1] = orgStr;
		return userArr;
	}
}