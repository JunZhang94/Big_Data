package com.jp.tic.security.mapper;

import java.util.List;
import java.util.Map;

import com.jp.tic.common.pagination.PageQueryMapper.PageEntityQueryMapper;
import com.jp.tic.security.entity.UserRole;

/**
 * <b>function:</b> 权限角色关联表MyBatis查询接口
 * @author hoojo
 * @createDate 2014-3-12 上午11:01:22
 * @file UserRoleMapper.java
 * @package com.jp.tic.security.mapper
 * @project ZHSICS-Server
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 * @param <T>
 */
public interface UserRoleMapper<T extends UserRole> extends PageEntityQueryMapper<T> {
	
	/**
	 * <b>function:</b> 通过roleid得到权限列表
	 * @createDate 2014-3-12 上午11:01:22
	 * @param param Map<String, Object> 查询Map
	 * @return List<T> 返回List列表
	 * @throws Exception
	 */
	public List<T> getRolesByRoleId(Map<String, Object> param) throws Exception;

	public List<Map> queryRoles() throws Exception;
	

	public int addRole(Map<String, String> param) throws Exception;
	public int updateRole(Map<String, String> param) throws Exception;
	
	
}
