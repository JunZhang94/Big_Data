package com.jp.tic.framework.service.impl;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.jp.tic.framework.dao.BaseDao;
import com.jp.tic.framework.service.Service;

/**
 * <b>function:</b> Service 基类扩展继承实现，服务类增删改业务接口实现，提供快速创建生成服务对象。
 * <pre>
 * 	调用方法:
 * 	implements:
 * 	public class DeviceInfoServiceImpl&lt;T extends DeviceInfo> extends GeneratorServiceImpl&lt;DeviceInfo> implements DeviceInfoService&lt;T> {
 * 		public DeviceInfoServiceImpl() {
 *			super(DeviceInfo.class);
 *		}
 * 	}
 * 注意：DeviceInfoService接口继承Service这个顶级接口
 * 
 * </pre>
 * @author hoojo
 * @createDate 2013-4-25 下午04:21:23
 * @file GeneratorService.java
 * @package com.jp.tic.framework.service.impl
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public class GeneratorServiceImpl<T> extends AbstractService implements Service<T> {

	@Autowired
	private BaseDao dao;
	
	protected final Class<T> clazz;

	public GeneratorServiceImpl(Class<T> clazz) {
		this.clazz = clazz;
	}
	
	@Override
	public boolean add(T entity) throws Exception {
		boolean flag = false;
		try {
			flag = dao.add(entity);
		} catch (Exception e) {
			error(e);
			throw e;
		}
		return flag;
	}

	@Override
	public Integer addAndGetId4Integer(T entity) throws Exception {
		Integer result = null;
		try {
			result = dao.addAndGetId4Integer(entity);
		} catch (Exception e) {
			error(e);
			throw e;
		}
		return result;
	}

	@Override
	public String addAndGetId4String(T entity) throws Exception {
		String result = null;
		try {
			result = dao.addAndGetId4String(entity);
		} catch (Exception e) {
			error(e);
			throw e;
		}
		return result;
	}

	@Override
	public boolean edit(T entity) throws Exception {
		boolean flag = false;
		try {
			flag = dao.edit(entity);
		} catch (Exception e) {
			error(e);
			throw e;
		}
		return flag;
	}

	@Override
	public T get(Serializable id) throws Exception {
		T result = null;
		try {
			result = dao.get(clazz, id);
		} catch (Exception e) {
			error(e);
			throw e;
		}
		return result;
	}

	@Override
	public T getById(String id) throws Exception {
		T result = null;
		try {
			result = dao.get(clazz, id);
		} catch (Exception e) {
			error(e);
			throw e;
		}
		return result;
	}

	@Override
	public T getById(long id) throws Exception {
		T result = null;
		try {
			result = dao.get(clazz, id);
		} catch (Exception e) {
			error(e);
			throw e;
		}
		return result;
	}

	@Override
	public T getById(Integer id) throws Exception {
		T result = null;
		try {
			result = dao.getById(clazz, id);
		} catch (Exception e) {
			error(e);
			throw e;
		}
		return result;
	}

	@Override
	public T load(Serializable id) throws Exception {
		T result = null;
		try {
			result = dao.load(clazz, id);
		} catch (Exception e) {
			error(e);
			throw e;
		}
		return result;
	}

	@Override
	public List<T> loadAll() throws Exception {
		List<T> result = null;
		try {
			result = dao.loadAll(clazz);
		} catch (Exception e) {
			error(e);
			throw e;
		}
		return result;
	}

	@Override
	public boolean merge(T entity) throws Exception {
		boolean flag = false;
		try {
			flag = dao.merge(entity);
		} catch (Exception e) {
			error(e);
			throw e;
		}
		return flag;
	}

	@Override
	public boolean persist(T entity) throws Exception {
		boolean flag = false;
		try {
			flag = dao.persist(entity);
		} catch (Exception e) {
			error(e);
			throw e;
		}
		return flag;
	}

	@Override
	public boolean refresh(T entity) throws Exception {
		boolean flag = false;
		try {
			flag = dao.refresh(entity);
		} catch (Exception e) {
			error(e);
			throw e;
		}
		return flag;
	}

	@Override
	public boolean remove(T entity) throws Exception {
		boolean flag = false;
		try {
			flag = dao.remove(entity);
		} catch (Exception e) {
			error(e);
			throw e;
		}
		return flag;
	}

	@Override
	public boolean removeAll(Collection<T> entities) throws Exception {
		boolean flag = false;
		try {
			flag = dao.removeAll(entities);
		} catch (Exception e) {
			error(e);
			throw e;
		}
		return flag;
	}

	@Override
	public boolean removeByIds(String idName, Object... ids) throws Exception {
		boolean flag = false;
		try {
			flag = dao.removeByIds(clazz, idName, ids);
		} catch (Exception e) {
			error(e);
			throw e;
		}
		return flag;
	}

	@Override
	public boolean saveOrUpdate(T entity) throws Exception {
		boolean flag = false;
		try {
			flag = dao.saveOrUpdate(entity);
		} catch (Exception e) {
			error(e);
			throw e;
		}
		return flag;
	}

	@Override
	public boolean saveOrUpdate(Collection<T> entities) throws Exception {
		boolean flag = false;
		try {
			flag = dao.saveOrUpdate(entities);
		} catch (Exception e) {
			error(e);
			throw e;
		}
		return flag;
	}
}