package com.jp.tic.business.user.mapper;

import java.util.List;
import java.util.Map;

import com.jp.tic.business.user.entity.User;
import com.jp.tic.framework.mybatis.BaseSqlMapper;

/**
 * <b>function:</b> 基础数据查询接口
 * @author hoojo
 * @createDate 2014-5-27 上午10:17:22
 * @file BasisDataQueryMapper.java
 * @package com.jp.tic.business.cartake.mapper
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public interface UserQueryMapper<E extends Map<String, Object>> extends BaseSqlMapper<E> {

	public E findUser(E param) throws Exception;
	
	public List<User> getUserList(User user) throws Exception;
	
	public String findWordbookByType(E param) throws Exception;
	
	/**
	 * 分页查询用户信息数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryUserInfo(Map<String, String> param);
	
	/**
	 * 统计用户信息数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countUserDatas(Map<String, String> param);
	
	/**
	 * 添加用户信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addUserInfo(Map<String, String> param);
	
	/**
	 * 删除用户信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteUserInfo(Map<String, String> param);
	
	/**
	 * 更新用户信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateUserInfo(Map<String, String> param);
	
	/**
	 * 修改用户信息，加载要修改的数据信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initUserDetailInfo(Map<String, String> param);
	
	/**
	 * 检查是否已经存在此用户信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> checkUserInfo(Map<String, String> param);
}
