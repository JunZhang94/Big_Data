package com.jp.tic.business.user.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.user.entity.User;
import com.jp.tic.business.user.mapper.UserQueryMapper;
import com.jp.tic.business.user.service.UserAccountService;
import com.jp.tic.framework.service.impl.GeneratorServiceImpl;

/**
 * <b>function:</b> user service impl
 * @author hoojo
 * @createDate 2014-5-31 上午11:19:03
 * @file UserAccountServiceImpl.java
 * @package com.jp.tic.business.service.impl
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
@Service
public class UserAccountServiceImpl<T extends User> extends GeneratorServiceImpl<User> implements UserAccountService<T> {

	@Autowired
	private UserQueryMapper<Map<String,Object>> mapper;
	
	public UserAccountServiceImpl() {
		super(User.class);
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<T> getList(User user) throws Exception {
		return (List<T>) mapper.getUserList(user);
	}

	@Override
	public Map<String,Object> findUser(Map<String,Object> param) throws Exception {
		return mapper.findUser(param);
	}
}
