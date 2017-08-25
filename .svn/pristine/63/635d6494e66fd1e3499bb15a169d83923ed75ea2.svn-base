package com.jp.tic.framework.dao;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import org.hibernate.Session;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate3.HibernateTemplate;

/**
 * <b>function:</b> 增删改查组件通用规范接口
 * @author hoojo
 * @createDate 2010-8-2 下午05:20:38
 * @file BaseDao.java
 * @package com.jp.tic.framework.dao
 * @project SHMB
 * @version 1.0
 * @param <T> 操作实体类型
 */
public interface BaseDao {
	
	/**
	 * <b>function:</b> 增加一个entity对象，返回是否添加成功
	 * @createDate 2010-8-2 下午05:28:38
	 * @author hoojo
	 * @param entity 对象
	 * @param <T> 操作实体类型
	 * @return boolean true/false
	 * @throws Exception
	 */
	public <T> boolean add(T entity) throws DataAccessException;
	
	/**
	 * <b>function:</b> 添加一个entity对象，返回添加对象的Integer类型的主键
	 * @createDate 2010-8-2 下午05:29:39
	 * @author hoojo
	 * @param entity 将要添加的对象
	 * @param <T> 操作实体类型 
	 * @return Integer 返回主键
	 * @throws DataAccessException
	 */
	public <T> Integer addAndGetId4Integer(T entity) throws DataAccessException;
	
	/**
	 * <b>function:</b> 添加一个对象并且返回该对象的String类型的主键
	 * @createDate 2010-8-2 下午05:31:32
	 * @author hoojo
	 * @param entity 将要添加的对象
	 * @param <T> 操作实体类型
	 * @return String 返回的主键
	 * @throws DataAccessException
	 */
	public <T> String addAndGetId4String(T entity) throws DataAccessException;
	
	/**
	 * <b>function:</b> 执行原生态的sql语句，添加、删除、修改语句
	 * @createDate 2010-8-2 下午05:33:42
	 * @author hoojo
	 * @param sql 将要执行的sql语句
	 * @return int
	 * @throws DataAccessException
	 */
	public int executeBySql(String sql) throws DataAccessException;
	
	/**
	 * <b>function:</b> 传入hql语句执行
	 * @createDate 2010-8-2 下午04:42:26
	 * @author hoojo
	 * @param hql String hql语句
	 * @return int 影响行数
	 * @throws DataAccessException
	 */
	public int executeByHql(String hql) throws DataAccessException;
	
	/**
	 * <b>function:</b> 传入sql语句执行查询，返回list集合
	 * @createDate 2010-8-3 上午10:00:34
	 * @author hoojo
	 * @param sql 查询的sql语句
	 * @param <T> 操作实体类型
	 * @return List集合
	 * @throws DataAccessException
	 */
	public <T> List<T> findBySql(String sql) throws DataAccessException;
	
	/**
	 * <b>function:</b> 修改entity对象，返回是否修改成功
	 * @createDate 2010-8-2 下午05:35:47
	 * @author hoojo
	 * @param entity 将要修改的对象
	 * @param <T> 操作实体类型
	 * @return boolean true/false 是否修改成功
	 * @throws DataAccessException
	 */
	public <T> boolean edit(T entity) throws DataAccessException;
	
	/**
	 * <b>function:</b> 传入hql语句执行修改，返回是否修改成功
	 * @createDate 2010-8-2 下午05:36:31
	 * @author hoojo
	 * @param hql 查询的hql语句
	 * @return boolean true/false 返回是否修改成功
	 * @throws DataAccessException
	 */
	public boolean edit(String hql) throws DataAccessException;
	
	/**
	 * <b>function:</b> 执行修改的hql语句，返回修改的行数
	 * @createDate 2010-8-2 下午05:38:58
	 * @author hoojo
	 * @param hql 修改语句
	 * @return int 返回修改的行数
	 * @throws DataAccessException
	 */
	public int editByHql(String hql) throws DataAccessException;
	
	/**
	 * <b>function:</b> 如果不存在就添加该对象，存在该对象就修改该对象
	 * @author hoojo
	 * @createDate 2012-2-9 上午11:29:14
	 * @param <T> 对象类型
	 * @param entity
	 * @return 是否修改成功
	 * @throws DataAccessException
	 */
	public <T> boolean saveOrUpdate(T entity) throws DataAccessException;
	
	/**
	 * <b>function:</b> merge是先在缓存中查找，缓存中没有相应数据，就到数据库去查询，
	 * 然后再合并数据，如果数据是一样的，
	 * 那么merge方法不会去做修改，如果数据有不一样的地方，merge才真正修改数据库
	 * @author hoojo
	 * @createDate 2012-10-19 下午01:23:12
	 * @param <T>
	 * @param entity
	 * @return
	 * @throws DataAccessException
	 */
	public <T> boolean merge(T entity) throws DataAccessException;
	
	/**
	 * <b>function:</b> 如果不存在就添加该集合对象，存在该对象就修改该集合对象
	 * @author hoojo
	 * @createDate 2012-2-9 上午11:29:42
	 * @param <T> 集合中保存的对象类型
	 * @param entities
	 * @return 是否修改成功
	 * @throws DataAccessException
	 */
	public <T> boolean saveOrUpdate(Collection<T> entities) throws DataAccessException;
	
	/**
	 * <b>function:</b> 传入一个将要删除的entity对象，返回删除是否成功
	 * @createDate 2010-8-2 下午05:42:02
	 * @author hoojo
	 * @param entity 将要传入的对象
	 * @param <T> 操作实体类型
	 * @return boolean true/false
	 * @throws DataAccessException
	 */
	public <T> boolean remove(T entity) throws DataAccessException;
	
	/**
	 * <b>function:</b> 根据集合中的对象，删除这些对象的记录
	 * @author hoojo
	 * @createDate 2012-2-8 下午05:39:43
	 * @param entities 对象集合
	 * @param <T> 操作实体类型
	 * @return 是否删除成功
	 * @throws DataAccessException
	 */
	public <T> boolean removeAll(Collection<T> entities) throws DataAccessException;
	
	/**
	 * <b>function:</b> 根据一组id，删除这些id的记录
	 * @author hoojo
	 * @createDate 2012-2-8 下午05:40:47
	 * @param clazz 删除的对象类型
	 * @param idName id的属性名称
	 * @param ids id参数集合数组
	 * @param <T> 操作实体类型
	 * @return 是否删除成功
	 * @throws DataAccessException
	 */
	public <T> boolean removeByIds(Class<T> clazz, String idName, Object... ids) throws DataAccessException;
	
	/**
	 * <b>function:</b> 传入一个entity对象Class和String型主键，返回该对象
	 * @createDate 2010-8-2 下午05:44:53
	 * @author hoojo
	 * @param <T> 操作实体类型
	 * @param clazz 对象Class
	 * @param id 主键
	 * @return T 返回传入类型对象
	 * @throws DataAccessException
	 */
	public <T> T getById(Class<T> clazz, String id) throws DataAccessException;
	
	public <T> T getById(Class<T> clazz, long id) throws DataAccessException;
	
	/**
	 * <b>function:</b> 传入一个entity对象Class和Integer类型主键，返回该对象
	 * @createDate 2010-8-2 下午05:47:20
	 * @author hoojo
	 * @param <T> 操作实体类型
	 * @param clazz 对象Class
	 * @param id 主键
	 * @return T 返回该类型的对象
	 * @throws DataAccessException
	 */
	public <T> T getById(Class<T> clazz, Integer id) throws DataAccessException;
	
	/**
	 * <b>function:</b> 传入一个entity对象Class和Serializable类型主键，返回该对象
	 * @createDate 2010-8-2 下午05:48:36
	 * @author hoojo
	 * @param <T> 操作实体类型
	 * @param clazz 对象Class
	 * @param id 主键
	 * @return T 返回该类型的对象
	 * @throws DataAccessException
	 */
	public <T> T get(Class<T> clazz, Serializable id) throws DataAccessException;
	
	/**
	 * <b>function:</b> 传入hql语句，查询对象
	 * @createDate 2010-8-2 下午05:49:31
	 * @author hoojo
	 * @param <T> 操作实体类型
	 * @param hql 查询的hql语句
	 * @return 对象T
	 * @throws DataAccessException
	 */
	public <T> T get(String hql) throws DataAccessException;
	
	/**
	 * <b>function:</b> 传入删除的hql语句，删除记录
	 * @createDate 2010-8-3 上午09:53:49
	 * @author hoojo
	 * @param hql 将要被执行删除的hql语句
	 * @return 是否删除成功
	 * @throws DataAccessException
	 */
	public boolean remove(String hql) throws DataAccessException;
	
	/**
	 * <b>function:</b> 传入一个entity对象Class和Serializable类型主键，加载该对象
	 * @author hoojo
	 * @createDate 2012-10-20 上午10:20:30
	 * @param <T> 操作实体类型
	 * @param clazz 对象Class
	 * @param id 主键
	 * @return T 返回该类型的对象
	 * @throws DataAccessException
	 */
	public <T> T load(Class<T> clazz, Serializable id) throws DataAccessException;

	/**
	 * <b>function:</b> 传入一个entity对象Class 加载该对象所有数据
	 * @author hoojo
	 * @createDate 2012-10-20 上午10:24:34
	 * @param <T> 操作实体类型
	 * @param clazz 对象Class
	 * @return T List集合
	 * @throws DataAccessException
	 */
	public <T> List<T> loadAll(Class<T> clazz) throws DataAccessException;
	
	public <T>  boolean persist(T entity ) throws DataAccessException;

	public <T>  boolean refresh(T entity) throws DataAccessException;
	
	/**
	 * <b>function:</b> 暴露基类session供用户使用
	 * @createDate 2010-8-3 上午11:59:54
	 * @author hoojo
	 * @return Session
	 */
	public Session session();
	
	/**
	 * <b>function:</b> 暴露HibernateTemplate模板，当基类（增删改查组件）方法不够用可以用模板进行操作
	 * @createDate 2010-8-3 上午11:58:51
	 * @author hoojo
	 * @return HibernateTemplate
	 */
	public HibernateTemplate getTemplate();
}
