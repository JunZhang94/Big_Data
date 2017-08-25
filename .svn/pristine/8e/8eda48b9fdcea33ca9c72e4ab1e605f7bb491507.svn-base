package com.jp.tic.security.service;

import java.util.List;
import java.util.Map;

import com.jp.tic.common.entity.Tree;
import com.jp.tic.framework.service.Service;
import com.jp.tic.security.entity.UserAction;
/**
 * <b>function:</b> 用户权限信息表Service服务层接口
 * @author hoojo
 * @createDate 2014-3-12 上午10:51:40
 * @file UserActionService.java
 * @package com.jp.tic.security.service
 * @project ZHSICS-Server
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 * @param <T>
 */
public interface UserActionService<T extends UserAction> extends Service<UserAction> {
	
	/**
	 * <b>function:</b> 得到权限列表
	 * @createDate 2014-3-12 上午10:51:40
	 * @param param Map<String, Object> 查询Map
	 * @return List<T> 返回List列表
	 * @throws Exception
	 */
	public List<T> getList(Map<String, Object> param) throws Exception;

	public List<Map<String, String>>  xiangxi(Map<String, String>  param) throws Exception;
	public int  roleDelete(Map<String, String>  param) throws Exception;
	public List<Tree> getListByParentId(Map<String, Object> param) throws Exception;
	
	/**
	 * <b>function:</b> 得到已经存在的权限列表
	 * @createDate 2014-3-12 上午10:51:40
	 * @param param Map<String, Object> 查询Map
	 * @return List<Map<String, String>> 返回List列表
	 * @throws Exception
	 */
	public List<Map<String, String>> getGroupList(Map<String, Object> param) throws Exception;
	
}
