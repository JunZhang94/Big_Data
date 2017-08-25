package com.jp.tic.system.base;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;

/**
 * 基础服务类的基类，提供了服务业务层的基础与方法
 * @author Abe
 * @param <T>
 * @param <PK>
 */
public interface BaseService<T, PK extends Serializable> {
	
	/**
	 * 根据id得到对应的实体对象
	 * @param id
	 * @return
	 */
	public T get(final PK id);
	
	/**
	 * 得到全部的实体对象
	 * @return
	 */
	public List<T> getAll();
	
	/**
	 * 更新实体对象
	 * @param entity
	 * @throws Exception
	 */
	@Transactional
	public void update(final T entity) throws Exception;
	/**
	 * 新增实体对象
	 * @param entity
	 * @throws Exception
	 */
	@Transactional
	public void save(final T entity) throws Exception;
	/**
	 * 根据id删除实体对象
	 * @param id
	 * @throws Exception
	 */
	@Transactional
	public void delete(final PK id) throws Exception;
	/**
	 * 根据实体删除实体对象
	 * @param entity
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public T delete(T entity) throws Exception;
	/**
	 * 刷新实体对象
	 * @param entity
	 */
	public void refresh(final T entity);
	/**
	 * 批量插入实体对象
	 * @param collection
	 */
	@Transactional
	public void batchIntert(Collection<T> collection);
	/**
	 * 批量删除实体对象
	 * @param collection
	 * @throws Exception
	 */
	@Transactional
	public void batchDelete(Collection<T> collection) throws Exception;
	/**
	 * 得到对应的数据访问类
	 * @return
	 */
	//public BaseDAO<T, PK> getEntityDao();

}