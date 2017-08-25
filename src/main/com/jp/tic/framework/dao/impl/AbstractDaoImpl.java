package com.jp.tic.framework.dao.impl;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate3.HibernateTemplate;

import com.jp.tic.framework.dao.BaseDao;
import com.jp.tic.framework.dao.Dao;
import com.jp.tic.framework.log.ApplicationLogging;

/**
 * <b>function:</b> 增删改查泛型对象操作接口
 * @author hoojo
 * @createDate 2012-2-8 下午05:13:20
 * @file AbstractDaoImpl.java
 * @package com.jp.tic.framework.dao.impl
 * @project SHMB
 * @version 1.0
 */
public abstract class AbstractDaoImpl<T> extends ApplicationLogging implements Dao<T> {

	@Autowired
	@Qualifier("baseDaoImpl")
	private BaseDao dao;

	protected final Class<T> clazz;

	public AbstractDaoImpl(Class<T> clazz) {
		this.clazz = clazz;
	}

	public T get(Serializable id) throws DataAccessException {
		return dao.get(clazz, id);
	}

	public T getById(String id) throws DataAccessException {
		return dao.getById(clazz, id);
	}

	public T getById(long id) throws DataAccessException {
		return dao.getById(clazz, id);
	}

	public T getById(Integer id) throws DataAccessException {
		return dao.getById(clazz, id);
	}

	public boolean removeByIds(String idName, Object... ids) throws DataAccessException {
		return dao.removeByIds(clazz, idName, ids);
	}

	public boolean add(T entity) throws DataAccessException {
		return dao.add(entity);
	}

	public Integer addAndGetId4Integer(T entity) throws DataAccessException {
		return dao.addAndGetId4Integer(entity);
	}

	public String addAndGetId4String(T entity) throws DataAccessException {
		return dao.addAndGetId4String(entity);
	}

	public boolean edit(T entity) throws DataAccessException {
		return dao.edit(entity);
	}

	public boolean edit(String hql) throws DataAccessException {
		return dao.edit(hql);
	}

	public int editByHql(String hql) throws DataAccessException {
		return dao.editByHql(hql);
	}

	public int executeBySql(String sql) throws DataAccessException {
		return dao.executeBySql(sql);
	}

	public List<T> findBySql(String sql) throws DataAccessException {
		return dao.findBySql(sql);
	}

	public T get(String hql) throws DataAccessException {
		return dao.get(hql);
	}

	public HibernateTemplate getTemplate() {
		return dao.getTemplate();
	}

	public boolean remove(T entity) throws DataAccessException {
		return dao.remove(entity);
	}

	public boolean remove(String hql) throws DataAccessException {
		return dao.remove(hql);
	}

	public boolean removeAll(Collection<T> entities) throws DataAccessException {
		return dao.removeAll(entities);
	}

	public Session session() {
		return dao.session();
	}

	public boolean saveOrUpdate(T entity) throws DataAccessException {
		return dao.saveOrUpdate(entity);
	}

	public boolean merge(T entity) throws DataAccessException {
		return dao.merge(entity);
	}

	public boolean saveOrUpdate(Collection<T> entities) throws DataAccessException {
		return dao.saveOrUpdate(entities);
	}

	public int executeByHql(String hql) throws DataAccessException {
		return dao.executeBySql(hql);
	}

	public T load(Serializable id) throws DataAccessException {
		return dao.load(clazz, id);
	}

	public List<T> loadAll() throws DataAccessException {
		return dao.loadAll(clazz);
	}

	public boolean persist(T entity) throws DataAccessException {
		return dao.persist(entity);
	}

	public boolean refresh(T entity) throws DataAccessException {
		return dao.refresh(entity);
	}
}
