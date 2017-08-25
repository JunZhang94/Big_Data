package com.jp.tic.security.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.common.entity.Tree;
import com.jp.tic.framework.service.impl.GeneratorServiceImpl;
import com.jp.tic.security.dao.ModuleDao;
import com.jp.tic.security.entity.UserAction;
import com.jp.tic.security.mapper.UserActionMapper;
import com.jp.tic.security.service.UserActionService;

/**
 * <b>function:</b> 用户权限信息表Service实现
 * @author hoojo
 * @createDate 2014-3-12 上午11:10:44
 * @file UserActionServiceImpl.java
 * @package com.jp.tic.security.service.impl
 * @project ZHSICS-Server
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 * @param <T>
 */
@Service
public class UserActionServiceImpl<T extends UserAction> extends GeneratorServiceImpl<UserAction> implements UserActionService<T> {
	
	@Autowired
	private UserActionMapper<T> mapper;
	@Autowired
	private ModuleDao moduleDao;
	
	public UserActionServiceImpl() {
		super(UserAction.class);
	}
	
	@Override
	public List<T> getList(Map<String, Object> param) throws Exception{
		return mapper.getList(param);
	}
	@Override
	public List<Map<String, String>> xiangxi(Map<String, String> param) throws Exception{
		return mapper.xiangxi(param);
	}
	
	/**
	 * 删除角色信息
	 */
	@Override
	public int roleDelete(Map<String, String> param) throws Exception{
		return moduleDao.deleteRoleInfo(param);
	}

	@Override
	public List<Map<String, String>> getGroupList(Map<String, Object> param) throws Exception {
		return mapper.getActionGroupList(param);
	}

	@Override
	public List<Tree> getListByParentId(Map<String, Object> param) throws Exception {
		return mapper.getListByParentId(param);
	}
}
