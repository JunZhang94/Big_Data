package com.jp.tic.business.cartake.service;

import java.util.List;
import java.util.Map;

import com.jp.tic.business.cartake.enums.BasicDataType;

/**
 * <b>function:</b> 基础数据服务
 * @author hoojo
 * @createDate 2014-5-28 下午07:34:11
 * @file BasicDataService.java
 * @package com.jp.tic.business.cartake.service
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public interface BasicDataService<E extends Map<String, Object>> {

	public List<E> queryBasicData(BasicDataType dataType, String code) throws Exception;
	
	public List<E> queryWordbookByName(String dataType) throws Exception;
	
	public E findUser(E param) throws Exception;
}
