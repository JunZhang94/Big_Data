package com.jp.tic.security.dao;

import java.util.List;
import java.util.Map;

import com.jp.tic.utils.lang.StringUtil;

/**
 * 菜单模块
 * @author lsg
 *
 */
public interface ModuleDao {

	/**
	 * 查询所有的菜单数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> findAllModuleDatas(String userCode);
	
	/**
	 * 新增角色
	 * @param param 页面参数
	 * @param userMap 用户参数
	 * @return 处理结果
	 */
	public int addRoleInfo(Map<String, String> param, Map<String, String> userMap);
	
	/**
	 * 删除角色
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteRoleInfo(Map<String, String> param);
	
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
	 * @param roleId 角色ID
	 * @return 返回结果，0表示未授权，1表示已授权
	 */
	public String getEditVediaoStatus(String roleId);
}
