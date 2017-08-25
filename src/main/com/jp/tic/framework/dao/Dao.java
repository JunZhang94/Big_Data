package com.jp.tic.framework.dao;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import org.hibernate.Session;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate3.HibernateTemplate;

/**
 * <b>function:</b> 增删改查泛型对象操作接口
 * @author hoojo
 * @createDate 2012-2-9 上午10:01:13
 * @file Dao.java
 * @package com.jp.tic.framework.dao
 * @project SHMB
 * @version 1.0
 * @param <T>
 */
public interface Dao<T> {

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
	 * <b>function:</b> 添加一个entity对象，返回添加对象的Integer类型的主键
	 * @createDate 2010-8-2 下午05:29:39
	 * @author hoojo
	 * @param entity 将要添加的对象
	 * @param <T> 操作实体类型
	 * @return Integer 返回主键
	 * @throws DataAccessException
	 */
	public Integer addAndGetId4Integer(T entity) throws DataAccessException;

	/**
	 * <b>function:</b> 添加一个对象并且返回该对象的String类型的主键
	 * @createDate 2010-8-2 下午05:31:32
	 * @author hoojo
	 * @param entity 将要添加的对象
	 * @param <T> 操作实体类型
	 * @return String 返回的主键
	 * @throws DataAccessException
	 */
	public String addAndGetId4String(T entity) throws DataAccessException;

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
	 * <b>function:</b> 执行原生态的sql语句，添加、删除、修改语句
	 * @createDate 2010-8-2 下午05:33:42
	 * @author hoojo
	 * @param sql 将要执行的sql语句
	 * @return int
	 * @throws DataAccessException
	 */
	public int executeBySql(String sql) throws DataAccessException;

	/**
	 * <b>function:</b> 传入sql语句执行查询，返回list集合
	 * @createDate 2010-8-3 上午10:00:34
	 * @author hoojo
	 * @param sql 查询的sql语句
	 * @param <T> 操作实体类型
	 * @return List集合
	 * @throws DataAccessException
	 */
	 public List<T> findBySql(String sql) throws DataAccessException;

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
	public boolean saveOrUpdate(T entity) throws DataAccessException;

	public boolean merge(T entity) throws DataAccessException;

	/**
	 * <b>function:</b> 如果不存在就添加该集合对象，存在该对象就修改该集合对象
	 * @author hoojo
	 * @createDate 2012-2-9 上午11:29:42
	 * @param <T> 集合中保存的对象类型
	 * @param entities
	 * @return 是否修改成功
	 * @throws DataAccessException
	 */
	public boolean saveOrUpdate(Collection<T> entities)
			throws DataAccessException;

	/**
	 * <b>function:</b> 传入一个将要删除的entity对象，返回删除是否成功
	 * @createDate 2010-8-2 下午05:42:02
	 * @author hoojo
	 * @param entity 将要传入的对象
	 * @param <T> 操作实体类型
	 * @return boolean true/false
	 * @throws DataAccessException
	 */
	public boolean remove(T entity) throws DataAccessException;

	/**
	 * <b>function:</b> 根据集合中的对象，删除这些对象的记录
	 * @author hoojo
	 * @createDate 2012-2-8 下午05:39:43
	 * @param entities 对象集合
	 * @param <T> 操作实体类型
	 * @return 是否删除成功
	 * @throws DataAccessException
	 */
	public boolean removeAll(Collection<T> entities) throws DataAccessException;

	/**
	 * <b>function:</b> 根据一组id，删除这些id的记录
	 * @author hoojo
	 * @createDate 2012-2-8 下午05:40:47
	 * @param clazz 删除的对象类型
	 * @param idName id的属性名称
	 * @param ids id参数集合数组
	 * @param 操作实体类型
	 * @return 是否删除成功
	 * @throws DataAccessException
	 */
	public boolean removeByIds(String idName, Object... ids)
			throws DataAccessException;

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
	public T getById(String id) throws DataAccessException;

	/**
	 * @param 传入long型主键 ，返回该对象
	 * @return<T> 操作实体类型
	 * @param clazz 对象Class
	 * @param id 主键
	 * @return T 返回传入类型对象
	 * @throws DataAccessException
	 */
	public T getById(long id) throws DataAccessException;

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
	public T getById(Integer id) throws DataAccessException;

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
	public T get(Serializable id) throws DataAccessException;

	/**
	 * <b>function:</b> 传入hql语句，查询对象
	 * @createDate 2010-8-2 下午05:49:31
	 * @author hoojo
	 * @param <T> 操作实体类型
	 * @param hql 查询的hql语句
	 * @return 对象T
	 * @throws DataAccessException
	 */
	public T get(String hql) throws DataAccessException;

	/**
	 * <b>function:</b> 传入删除的hql语句，删除记录
	 * @createDate 2010-8-3 上午09:53:49
	 * @author hoojo
	 * @param hql 将要被执行删除的hql语句
	 * @return 是否删除成功
	 * @throws DataAccessException
	 */
	public boolean remove(String hql) throws DataAccessException;
	
	public T load(Serializable id) throws DataAccessException;

	public List<T> loadAll() throws DataAccessException;
	
	public boolean persist(T entity ) throws DataAccessException;

	public boolean refresh(T entity) throws DataAccessException;

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
