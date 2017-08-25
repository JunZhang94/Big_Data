package com.jp.tic.common.service;

import com.jp.tic.common.entity.IDGenerator;
import com.jp.tic.common.enums.IdType;

/**
 * <b>function:</b> IDGenerator id生成器服务接口
 * @author hoojo
 * @createDate 2012-12-26 下午01:06:56
 * @file IDGeneratorService.java
 * @package com.jp.tic.common.service
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public interface IDGeneratorService<T extends IDGenerator> {

	/**
	 * <b>function:</b> 传递IdType 枚举 返回该枚举类型对应生成id
	 * @author hoojo
	 * @createDate 2012-12-26 下午01:55:17
	 * @param idType IdType 枚举
	 * @return 生成id
	 * @throws Exception
	 */
	public String executeGeneratorId(IdType idType) throws Exception;
	
	/**
	 * <b>function:</b> 传递IDGenerator实体 生成id
	 * @author hoojo
	 * @createDate 2012-12-26 下午01:54:35
	 * @param generator IDGenerator实体
	 * @return id
	 * @throws Exception
	 */
	public String executeGeneratorId(IDGenerator generator) throws Exception;
}
