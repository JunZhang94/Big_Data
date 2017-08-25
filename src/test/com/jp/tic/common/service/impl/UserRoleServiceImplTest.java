package com.jp.tic.common.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.jp.tic.base.tester.BaseTest;
import com.jp.tic.common.entity.Tree;
import com.jp.tic.security.entity.UserRole;
import com.jp.tic.security.service.UserRoleService;

/**
 * <b>function:</b>
 * @author hoojo
 * @createDate 2014-8-11 下午02:55:37
 * @file UserRoleServiceImplTest.java
 * @package com.jp.tic.common.service.impl
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public class UserRoleServiceImplTest extends BaseTest {

	@Autowired
	private UserRoleService<UserRole> service;
	
	@Test
	public void testFind() throws Exception {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("roleId", "1,2");
		
		Tree tree = new Tree();
		tree.setId("0");
		service.loadTreeData("3", tree);
		
		System.out.println(tree);
	}
}
