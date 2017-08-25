package com.jp.tic.framework.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.dao.DataAccessException;

/**
 * <b>function:</b> 增删改查泛型对象操作接口（仅提供参考，请勿使用）
 * @author hoojo
 * @createDate 2012-10-18 下午05:00:48
 * @file MapperDao.java
 * @package com.jp.tic.framework.dao
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 * @param <T>
 */
@Deprecated
public interface MapperDao<T> {

	/**
	 * <b>function:</b> 增加一个entity对象，返回是否添加成功
	 * @createDate 2010-8-2 下午05:28:38
	 * @author hoojo
	 * @param entity 对象
	 * @param <T> 操作实体类型
	 * @return boolean true/false
	 * @throws Exception
	 */
	public boolean add(T entity) throws DataAccessException;

	/**
	 * <b>function:</b> 传入指定mapper 方法名 执行
	 * @createDate 2010-8-2 下午04:42:26
	 * @author hoojo
	 * @param methodName 指定mapper 方法名
	 * @return int 影响行数
	 * @throws DataAccessException
	 */
	public int execute(String methodName) throws DataAccessException;
	
	/**
	 * <b>function:</b> 传入指定mapper 方法名 执行
	 * @createDate 2010-8-2 下午04:42:26
	 * @author hoojo
	 * @param methodName 指定mapper 方法名
	 * @param entity 执行参数
	 * @return int 影响行数
	 * @throws DataAccessException
	 */
	public int execute(String methodName, T entity) throws DataAccessException;
	
	/**
	 * <b>function:</b> 修改entity对象，返回是否修改成功
	 * @createDate 2010-8-2 下午05:35:47
	 * @author hoojo
	 * @param entity 将要修改的对象
	 * @param 操作实体类型
	 * @return boolean true/false 是否修改成功
	 * @throws DataAccessException
	 */
	public boolean edit(T entity) throws DataAccessException;

	/**
	 * <b>function:</b> 执行一条update语句
	 * @createDate 2010-8-2 下午05:35:47
	 * @author hoojo
	 * @return 修改记录条数
	 * @throws DataAccessException
	 */
	public int edit() throws DataAccessException;

	/**
	 * <b>function:</b> 传入一个将要删除的entity对象，执行delete sql语句，返回删除是否成功
	 * @createDate 2010-8-2 下午05:42:02
	 * @author hoojo
	 * @param entity 将要传入的对象
	 * @param <T> 操作实体类型
	 * @return boolean true/false
	 * @throws DataAccessException
	 */
	public boolean remove(T entity) throws DataAccessException;
	
	/**
	 * <b>function:</b> 执行delete sql语句 执行删除方法
	 * @author hoojo
	 * @createDate 2012-10-18 下午05:52:13
	 * @return
	 * @throws DataAccessException
	 */
	public boolean remove() throws DataAccessException;
	
	/**
	 * <b>function:</b> 传入一个Map参数执行删除操作
	 * @author hoojo
	 * @createDate 2012-10-18 下午06:03:12
	 * @param params Map
	 * @return 是否删除成功
	 * @throws DataAccessException
	 */
	public boolean removeByMap(Map<String, ?> params) throws DataAccessException;

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
	 * @param params
	 * @return
	 * @throws DataAccessException
	 */
	public List<T> getListByMap(Map<String, ?> params) throws DataAccessException;
	
	/**
	 * <b>function:</b> 暴露基类SqlSession供用户使用
	 * @createDate 2010-8-3 上午11:59:54
	 * @author hoojo
	 * @return Session
	 */
	public SqlSession getSession();
}
