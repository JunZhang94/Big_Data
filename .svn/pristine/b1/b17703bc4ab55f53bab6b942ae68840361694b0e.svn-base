package com.jp.tic.framework.mybatis;

import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;

/**
 * <b>function:</b> BaseSqlMapper继承SqlMapper，对Mapper进行接口封装，提供常用的增删改查组件； 
 * 也可以对该接口进行扩展和封装
 * @author hoojo
 * @createDate 2011-4-14 上午11:36:41
 * @file BaseSqlMapper.java
 * @package com.jp.tic.framework.mapper
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public interface BaseSqlMapper<T> extends SqlMapper {
	
	/**
	 * <b>function:</b> 传入一个entity对象Class和String型主键，返回该对象
	 * @createDate 2010-8-2 下午05:44:53
	 * @author hoojo
	 * @param <T> 操作实体类型
	 * @param id 主键
	 * @return T 返回传入类型对象
	 * @throws DataAccessException
	 */
	public T getById(String id) throws DataAccessException;

	/**
	 * <b>function:</b> 查询单个对象
	 * @createDate 2010-8-2 下午05:49:31
	 * @author hoojo
	 * @param <T> 操作实体类型
	 * @param hql 查询的hql语句
	 * @return 对象T
	 * @throws DataAccessException
	 */
	public T get() throws DataAccessException;
	
	/**
	 * <b>function:</b> 通过entity对象条件，执行一条select语句
	 * @author hoojo
	 * @createDate 2012-10-18 下午05:58:39
	 * @param entity entity对象
	 * @return 对象T
	 * @throws DataAccessException
	 */
	public T get(T entity) throws DataAccessException;
	
	/**
	 * <b>function:</b> 通过Map对象参数，执行一条select语句
	 * @author hoojo
	 * @createDate 2012-10-18 下午05:59:42
	 * @param params Map
	 * @return 对象T
	 * @throws DataAccessException
	 */
	public T getByMap(Map<String, ?> params) throws DataAccessException;

	/**
	 * <b>function:</b> 动态查询
	 * @createDate 2010-8-3 上午10:53:37
	 * @author hoojo
	 * @return list集合
	 * @throws DataAccessException
	 */
	public List<T> getList() throws DataAccessException;
	
	/**
	 * <b>function:</b> 通过hql语句查询List集合
	 * @createDate 2010-8-2 下午05:51:05
	 * @author hoojo
	 * @param <T> 操作实体类型
	 * @param hql 查询hql语句
	 * @return List<?>
	 * @throws DataAccessException
	 */
	public List<T> getList(T entity) throws DataAccessException;
	
	/**
	 * <b>function:</b> 通过Map条件执行一条select语句
	 * @author hoojo
	 * @createDate 2012-10-18 下午06:01:10
	 * @param params Map参数
	 * @return List集合
	 * @throws DataAccessException
	 */
	public List<T> getListByMap(Map<String, ?> params) throws DataAccessException;
	
	/**
	 * <b>function:</b> 获取记录条数
	 * @author hoojo
	 * @createDate 2012-10-23 上午09:09:04
	 * @param <T> 操作实体类型
	 * @return 条数
	 * @throws DataAccessException
	 */
	public int getCount(T entity) throws DataAccessException;
	
}
