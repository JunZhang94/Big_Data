package com.jp.tic.business.user.service;

import java.util.List;
import java.util.Map;

import com.jp.tic.business.user.entity.User;
import com.jp.tic.framework.service.Service;

/**
 * <b>function:</b> user service
 * @author hoojo
 * @createDate 2014-5-31 上午11:16:40
 * @file UserAccountService.java
 * @package com.jp.tic.business.cartake.service
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public interface UserAccountService<T extends com.jp.tic.business.user.entity.User> extends Service<User> {

	public List<T> getList(User user) throws Exception;
	
	public Map<String,Object> findUser(Map<String,Object> param) throws Exception;
}
