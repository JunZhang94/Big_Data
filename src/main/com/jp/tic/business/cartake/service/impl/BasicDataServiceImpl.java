package com.jp.tic.business.cartake.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.cartake.enums.BasicDataType;
import com.jp.tic.business.cartake.mapper.BasicDataQueryMapper;
import com.jp.tic.business.cartake.service.BasicDataService;
import com.jp.tic.business.user.mapper.UserQueryMapper;
import com.jp.tic.framework.service.impl.AbstractService;

/**
 * <b>function:</b> 基础数据操作服务
 * @author hoojo
 * @createDate 2014-5-28 下午07:41:21
 * @file BasicDataServiceImpl.java
 * @package com.jp.tic.business.cartake.service.impl
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
@Service
public class BasicDataServiceImpl<E extends Map<String, Object>> extends AbstractService implements BasicDataService<E> {

	@Autowired
	private BasicDataQueryMapper<E> mapper;
	
	@Autowired
	private UserQueryMapper<E> userMapper;
	
	@Override
	public E findUser(E param) throws Exception {
		return userMapper.findUser(param);
	}
	
	@Override
	public List<E> queryBasicData(BasicDataType dataType, String code) throws Exception {
		if (dataType == BasicDataType.AREA) {
			return mapper.findAreas();
		} else if (dataType == BasicDataType.DEPT) {
			return mapper.findDeptsByAreaCode(code);
		} else if (dataType == BasicDataType.MOUNT) {
			return mapper.findMountsByDeptCode(code);
		} else if (dataType == BasicDataType.DEPTS) {
			return mapper.findDepts();
		}
		return null;
	}

	@Override
	public List<E> queryWordbookByName(String dataType) throws Exception {
		return mapper.findWordbookByName(dataType);
	}
}
