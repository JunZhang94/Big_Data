package com.jp.tic.framework.dao.impl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;

import com.jp.tic.framework.dao.MapperDao;

/**
 * <b>function:</b> 增删改查泛型对象操作接口 （仅提供参考，请勿使用）
 * @author hoojo
 * @createDate 2012-10-18 下午05:11:44
 * @file AbstractMapperDaoImpl.java
 * @package com.jp.tic.framework.dao.impl
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 * @param <T>
 */
@Deprecated
public abstract class AbstractMapperDaoImpl<T> extends SqlSessionDaoSupport implements MapperDao<T> {

	@SuppressWarnings("unused")
	@Autowired
	private SqlSessionFactory sqlSessionFactory;
	
	protected final String namespace;

	public AbstractMapperDaoImpl(String namespace) {
		this.namespace = namespace;
	}

	public boolean add(T entity) throws DataAccessException {
		return this.getSession().insert(namespace + ".add", entity) > 0 ? true : false;
	}

	public boolean edit(T entity) throws DataAccessException {
		return this.getSession().update(namespace + ".edit", entity) > 0 ? true : false;
	}
	
	public int edit() throws DataAccessException {
		return this.getSession().update(namespace + ".edit");
	}

	public int execute(String methodName) throws DataAccessException {
		return this.getSession().update(namespace + "." + methodName);
	}

	public int execute(String methodName, T entity) throws DataAccessException {
		return this.getSession().update(namespace + "." + methodName, entity);
	}

	public T get() throws DataAccessException {
		return this.getSession().selectOne(namespace + ".get");
	}
	
	public T get(T entity) throws DataAccessException {
		return this.getSession().selectOne(namespace + ".get", entity);
	}
	
	public T getByMap(Map<String, ?> params) throws DataAccessException {
		return this.getSession().selectOne(namespace + ".getByMap", params);
	}

	public T getById(String id) throws DataAccessException {
		return this.getSession().selectOne(namespace + ".get", id);
	}

	public List<T> getList() throws DataAccessException {
		return this.getSession().selectList(namespace + ".getList");
	}

	public List<T> getList(T entity) throws DataAccessException {
		return this.getSession().selectList(namespace + ".getList", entity);
	}

	public SqlSession getSession() {
		return this.getSqlSession();
	}

	public boolean remove() throws DataAccessException {
		return this.getSession().delete(namespace + ".remove") > 0 ? true : false;
	}
	
	public boolean remove(T entity) throws DataAccessException {
		return this.getSession().delete(namespace + ".remove", entity) > 0 ? true : false;
	}
	
	public boolean removeByMap(Map<String, ?> params) throws DataAccessException {
		return this.getSession().delete(namespace + ".removeByMap", params) > 0 ? true : false;
	}

	public List<T> getListByMap(Map<String, ?> params) throws DataAccessException {
		return this.getSession().selectList(namespace + ".getListByMap", params);
	}
}
