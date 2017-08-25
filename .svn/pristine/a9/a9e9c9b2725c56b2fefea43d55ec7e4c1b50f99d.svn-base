package com.jp.tic.security.service;

import java.util.List;
import java.util.Map;

import com.jp.tic.common.entity.Tree;
import com.jp.tic.framework.service.Service;
import com.jp.tic.security.entity.RoleGroup;
import com.jp.tic.security.entity.UserRole;

/**
 * <b>function:</b> 用户角色关联表Service服务层接口
 * @author hoojo
 * @createDate 2014-3-12 上午10:53:39
 * @file UserRoleService.java
 * @package com.jp.tic.security.service
 * @project ZHSICS-Server
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 * @param <T>
 */
public interface UserRoleService<T extends UserRole> extends Service<UserRole> {
	
	/**
	 * <b>function:</b> 通过roleid得到权限列表
	 * @createDate 2014-3-12 上午10:53:39
	 * @param param Map<String, Object> 查询Map
	 * @return List<T> 返回List列表
	 * @throws Exception
	 */
	public List<T> findRolesById(Map<String, Object> param) throws Exception;
	
	public List<Map> queryRoles() throws Exception;
	
	public boolean addGroupRole(RoleGroup roleGroup) throws Exception;

	public int addRole(Map<String, String> param)throws Exception;
	public int updateRole(Map<String, String> param)throws Exception;
	
	public boolean editGroupRole(RoleGroup roleGroup) throws Exception;
	
	public Tree loadTreeData(String userRoleId, Tree tree) throws Exception;
	
	/**
	 * 新增角色
	 * @param param 页面参数
	 * @param userMap 用户参数
	 * @return 处理结果
	 */
	public int addRoleInfo(Map<String, String> param, Map<String, String> userMap);
	
	/**
	 * 查询已选的菜单项
	 * @param param 页面参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> findCheckedModuleInfo(Map<String, String> param);
	
	/**
	 * 初始化待修改的角色数据
	 * @param param 页面参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> initRoleUpdateData(Map<String, String> param);
	
	/**
	 * 修改角色信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateRoleInfo(Map<String, String> param);
	
	/**
	 * 获取视频编辑按钮状态
	 * @param userCode 用户账号
	 * @return 返回结果，0表示未授权，1表示已授权
	 */
	public String[] getEditVediaoStatus(String userCode);
}
