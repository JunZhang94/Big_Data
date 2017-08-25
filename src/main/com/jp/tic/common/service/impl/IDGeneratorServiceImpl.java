package com.jp.tic.common.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.common.entity.IDGenerator;
import com.jp.tic.common.enums.IdType;
import com.jp.tic.common.service.IDGeneratorService;
import com.jp.tic.framework.dao.BaseDao;
import com.jp.tic.framework.service.impl.AbstractService;

/**
 * <b>function:</b> IDGenerator id生成器服务
 * @author hoojo
 * @createDate 2012-12-26 下午01:08:13
 * @file IDGeneratorServiceImpl.java
 * @package com.jp.tic.common.service.impl
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
@Service
public class IDGeneratorServiceImpl<T extends IDGenerator> extends AbstractService implements IDGeneratorService<T> {

	@Autowired
	private BaseDao dao;
	
	
	public String executeGeneratorId(IdType idType) throws Exception {
		
		try {
			IDGenerator generator = dao.get(IDGenerator.class, idType);
			if (generator == null) {
				generator = new IDGenerator(idType);
				generator.setVal(generator.getStartVal() + generator.getStep());
				dao.add(generator);
			} else {
				generator.setVal(generator.getVal() + generator.getStep());
				dao.edit(generator);
			}
			String id = StringUtils.defaultString(generator.getPrefix()) + generator.getVal() + StringUtils.defaultString(generator.getSuffix());
			return id;
		} catch (Exception e) {
			error(e);
			throw e;
		}
	}
	
	public String executeGeneratorId(IDGenerator generator) throws Exception {
		
		if (generator == null) {
			throw new Exception(IDGenerator.class.getSimpleName() + " param is null, check your code!");
		}
		try {
			IDGenerator id = dao.get(IDGenerator.class, generator.getIdType());
			if (id == null) {
				generator.setVal(generator.getStartVal() + generator.getStep());
				dao.add(generator);
				id = generator;
			} else {
				id.setVal(id.getVal() + id.getStep());
				dao.edit(id);
			}
			String idKey = StringUtils.defaultString(id.getPrefix()) + id.getVal() + StringUtils.defaultString(id.getSuffix());
			return idKey;
		} catch (Exception e) {
			error(e);
			throw e;
		}
	}
}
