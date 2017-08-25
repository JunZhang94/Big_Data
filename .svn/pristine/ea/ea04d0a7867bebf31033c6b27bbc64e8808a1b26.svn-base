package com.jp.tic.framework.dao.impl;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.jp.tic.framework.dao.BaseDao;

/**
 * <b>function:</b> 增删改查组件规范接口实现类
 * @author hoojo
 * @createDate 2012-2-8 下午05:13:20
 * @file BaseDaoImpl.java
 * @package com.jp.tic.framework.dao.impl
 * @project SHMB
 * @version 1.0
 */
@Repository
@SuppressWarnings("unchecked")
public class BaseDaoImpl extends HibernateDaoSupport implements BaseDao {

	@Autowired
	public final void setSuperSessionFactory(SessionFactory sessionFactory) {
		this.setSessionFactory(sessionFactory);
	}

	/**
	 * <b>function:</b> 增加一个entity对象，返回是否添加成功
	 * @createDate 2010-8-2 下午05:28:38
	 * @author hoojo
	 * @param <T> 对象类型
	 * @param entity 对象
	 * @return boolean true/false
	 * @throws Exception
	 */
	public <T> boolean add(T entity) throws DataAccessException {
		boolean bo = false;
		try {
			Serializable io = this.getTemplate().save(entity);
			if (io != null) {
				bo = true;
			}
		} catch (DataAccessException e) {
			bo = false;
			throw e;
		}
		return bo;
	}

	/**
	 * <b>function:</b> 添加一个entity对象，返回添加对象的Integer类型的主键
	 * @createDate 2010-8-2 下午05:29:39
	 * @author hoojo
	 * @param <T> 对象类型
	 * @param entity 将要添加的对象
	 * @return Integer 返回主键
	 * @throws DataAccessException
	 */
	public <T> Integer addAndGetId4Integer(T entity) throws DataAccessException {
		Integer id = null;
		try {
			id = Integer.parseInt(String.valueOf(this.getTemplate().save(entity)));
		} catch (DataAccessException e) {
			throw e;
		}
		return id;
	}

	/**
	 * <b>function:</b> 添加一个对象并且返回该对象的String类型的主键
	 * @createDate 2010-8-2 下午05:31:32
	 * @author hoojo
	 * @param <T> 对象类型
	 * @param entity 将要添加的对象
	 * @return String 返回的主键
	 * @throws DataAccessException
	 */
	public <T> String addAndGetId4String(T entity) throws DataAccessException {
		String id = null;
		try {
			id = String.valueOf(this.getTemplate().save(entity));
		} catch (DataAccessException e) {
			throw e;
		}
		return id;
	}

	/**
	 * <b>function:</b> 修改entity对象，返回是否修改成功
	 * @createDate 2010-8-2 下午05:35:47
	 * @author hoojo
	 * @param 对象类型
	 * @param entity 将要修改的对象
	 * @return boolean true/false 是否修改成功
	 * @throws DataAccessException
	 */
	public <T> boolean edit(T entity) throws DataAccessException {
		boolean bo = false;
		try {
			this.getTemplate().update(entity);
			bo = true;
		} catch (DataAccessException e) {
			bo = false;
			throw e;
		}
		return bo;
	}

	/**
	 * <b>function:</b> 传入hql语句执行修改，返回是否修改成功
	 * @createDate 2010-8-2 下午05:36:31
	 * @author hoojo
	 * @param hql 查询的hql语句
	 * @return boolean true/false 返回是否修改成功
	 * @throws DataAccessException
	 */
	public boolean edit(String hql) throws DataAccessException {
		boolean bo = false;
		try {
			int count = this.getTemplate().bulkUpdate(hql);
			bo = count > 0 ? true : false;
		} catch (DataAccessException e) {
			bo = false;
			throw e;
		}
		return bo;
	}

	/**
	 * <b>function:</b> 执行修改的hql语句，返回修改的行数
	 * @createDate 2010-8-2 下午05:38:58
	 * @author hoojo
	 * @param hql 修改语句
	 * @return int 返回修改的行数
	 * @throws DataAccessException
	 */
	public int editByHql(String hql) throws DataAccessException {
		int count = 0;
		try {
			count = this.getTemplate().bulkUpdate(hql);
		} catch (DataAccessException e) {
			throw e;
		}
		return count;
	}

	public <T> boolean saveOrUpdate(T entity) throws DataAccessException {
		boolean flog = false;
		try {
			this.getTemplate().saveOrUpdate(entity);
			flog = true;
		} catch (DataAccessException e) {
			flog = false;
			throw e;
		}
		return flog;
	}

	public <T> boolean merge(T entity) throws DataAccessException {
		boolean flog = false;
		try {
			this.getTemplate().merge(entity);
			flog = true;
		} catch (DataAccessException e) {
			flog = false;
			throw e;
		}
		return flog;
	}

	public <T> boolean saveOrUpdate(Collection<T> entities) throws DataAccessException {
		boolean flog = false;
		try {
			this.getTemplate().saveOrUpdateAll(entities);
			flog = true;
		} catch (DataAccessException e) {
			flog = false;
			throw e;
		}
		return flog;
	}

	/**
	 * <b>function:</b> 传入hql语句执行
	 * @createDate 2010-8-2 下午04:42:26
	 * @author hoojo
	 * @param hql String hql语句
	 * @return int 影响行数
	 * @throws DataAccessException
	 */
	public int executeByHql(String hql) throws DataAccessException {
		try {
			return this.getTemplate().bulkUpdate(hql);
		} catch (DataAccessException e) {
			throw e;
		}
	}

	/**
	 * <b>function:</b> 执行原生态的sql语句，添加、删除、修改语句
	 * @createDate 2010-8-2 下午05:33:42
	 * @author hoojo
	 * @param sql 将要执行的sql语句
	 * @return int
	 * @throws DataAccessException
	 */
	public int executeBySql(String sql) throws DataAccessException {
		try {
			return this.getSession().createSQLQuery(sql).executeUpdate();
		} catch (DataAccessException e) {
			throw e;
		}
	}

	/**
	 * <b>function:</b> 传入sql语句执行查询，返回list集合
	 * @createDate 2010-8-3 上午10:00:34
	 * @author hoojo
	 * @param sql 查询的sql语句
	 * @return List集合
	 * @throws DataAccessException
	 */
	public <T> List<T> findBySql(String sql) throws DataAccessException {
		List list = null;
		try {
			list = (List<T>) this.getSession().createSQLQuery(sql).list();
			
		} catch (DataAccessException e) {
			throw e;
		}
		return list;
	}
    
	/**
	 * <b>function:</b> 传入一个entity对象Class和Serializable类型主键，返回该对象
	 * @createDate 2010-8-2 下午05:48:36
	 * @author hoojo
	 * @param <T> 返回、传入对象类型
	 * @param clazz 对象Class
	 * @param id 主键
	 * @return T 返回该类型的对象
	 * @throws DataAccessException
	 */
	public <T> T get(Class<T> clazz, Serializable id) throws DataAccessException {
		T entity = null;
		try {
			entity = (T) this.getTemplate().get(clazz, id);
		} catch (DataAccessException e) {
			throw e;
		}
		return entity;
	}

	/**
	 * <b>function:</b> 传入hql语句，查询对象
	 * @createDate 2010-8-2 下午05:49:31
	 * @author hoojo
	 * @param 返回对象类型
	 * @param hql 查询的hql语句
	 * @return 对象T
	 * @throws DataAccessException
	 */
	public <T> T get(String hql) throws DataAccessException {
		T entity = null;
		try {
			entity = (T) this.getSession().createQuery(hql).setMaxResults(1).uniqueResult();
		} catch (DataAccessException e) {
			throw e;
		}
		return entity;
	}

	/**
	 * <b>function:</b> 传入一个entity对象Class和Integer类型主键，返回该对象
	 * @createDate 2010-8-2 下午05:47:20
	 * @author hoojo
	 * @param clazz 对象Class
	 * @param id 主键
	 * @return T 返回该类型的对象
	 * @throws DataAccessException
	 */
	public <T> T getById(Class<T> clazz, Integer id) throws DataAccessException {
		T entity = null;
		try {
			entity = (T) this.getTemplate().get(clazz, id);
		} catch (DataAccessException e) {
			throw e;
		}
		return entity;
	}

	/**
	 * <b>function:</b> 传入一个entity对象Class和String型主键，返回该对象
	 * @createDate 2010-8-2 下午05:44:53
	 * @author hoojo
	 * @param clazz 对象Class
	 * @param id 主键
	 * @return T 返回传入类型对象
	 * @throws DataAccessException
	 */
	public <T> T getById(Class<T> clazz, String id) throws DataAccessException {
		T entity = null;
		try {
			entity = (T) this.getTemplate().get(clazz, id);
		} catch (DataAccessException e) {
			throw e;
		}
		return entity;
	}

	/**
	 * @param 传入long型主键 ，返回该对象
	 * @return<T> 操作实体类型
	 * @param clazz 对象Class
	 * @param id 主键
	 * @return T 返回传入类型对象
	 * @throws DataAccessException
	 */
	public <T> T getById(Class<T> clazz, long id) throws DataAccessException {
		T entity = null;
		try {
			entity = (T) this.getTemplate().get(clazz, id);
		} catch (DataAccessException e) {
			throw e;
		}
		return entity;
	}

	/**
	 * <b>function:</b> 传入一个将要删除的entity对象，返回删除是否成功
	 * @createDate 2010-8-2 下午05:42:02
	 * @author hoojo
	 * @param <T> 传入对象类型
	 * @param entity 将要传入的对象
	 * @return boolean true/false
	 * @throws DataAccessException
	 */
	public <T> boolean remove(T entity) throws DataAccessException {
		boolean bo = false;
		try {
			this.getTemplate().delete(entity);
			bo = true;
		} catch (DataAccessException e) {
			bo = false;
			throw e;
		}
		return bo;
	}

	/**
	 * <b>function:</b> 传入删除的hql语句，删除记录
	 * @createDate 2010-8-3 上午09:53:49
	 * @author hoojo
	 * @param hql 将要被执行删除的hql语句
	 * @return 是否删除成功
	 * @throws DataAccessException
	 */
	public boolean remove(String hql) throws DataAccessException {
		try {
			return this.executeByHql(hql) > 0 ? true : false;
		} catch (DataAccessException e) {
			throw e;
		}
	}

	/**
	 * <b>function:</b> 根据集合中的对象，删除这些对象的记录
	 * @author hoojo
	 * @createDate 2012-2-8 下午05:39:43
	 * @param entities 对象集合
	 * @param <T> 操作实体类型
	 * @return 是否删除成功
	 * @throws DataAccessException
	 */
	public <T> boolean removeAll(Collection<T> entities) throws DataAccessException {
		boolean bo = false;
		try {
			this.getTemplate().deleteAll(entities);
			bo = true;
		} catch (DataAccessException e) {
			bo = false;
			throw e;
		}
		return bo;
	}

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
	public <T> boolean removeByIds(Class<T> clazz, String idName, Object... ids) throws DataAccessException {
		String entityName = clazz.getSimpleName();
		String hql = "DELETE FROM " + entityName + " E WHERE E." + idName + " IN (:ids)";
		Query q = this.getSession().createQuery(hql).setParameterList("ids", ids);
		return q.executeUpdate() > 0 ? true : false;
	}

	/**
	 * <b>function:</b> 暴露基类session供用户使用
	 * @createDate 2010-8-3 上午11:59:54
	 * @author hoojo
	 * @return Session
	 */
	public Session session() {
		return this.getSession();
	}

	/**
	 * <b>function:</b> 暴露HibernateTemplate模板，当基类（增删改查组件）方法不够用可以用模板进行操作
	 * @createDate 2010-8-3 上午11:58:51
	 * @author hoojo
	 * @return HibernateTemplate
	 */
	public HibernateTemplate getTemplate() {
		return this.getHibernateTemplate();
	}

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
	public <T> T load(Class<T> clazz, Serializable id) throws DataAccessException {
		return this.getTemplate().load(clazz, id);
	}

	/**
	 * <b>function:</b> 传入一个entity对象Class 加载该对象所有数据
	 * @author hoojo
	 * @createDate 2012-10-20 上午10:24:34
	 * @param <T> 操作实体类型
	 * @param clazz 对象Class
	 * @return T List集合
	 * @throws DataAccessException
	 */
	public <T> List<T> loadAll(Class<T> clazz) throws DataAccessException {
		return this.getTemplate().loadAll(clazz);
	}

	public <T> boolean persist(T entity) throws DataAccessException {
		boolean bo = false;
		try {
			this.getTemplate().persist(entity);
			bo = true;
		} catch (DataAccessException e) {
			bo = false;
			throw e;
		}
		return bo;
	}

	public <T> boolean refresh(T entity) throws DataAccessException {
		boolean bo = false;
		try {
			this.getTemplate().refresh(entity);
			bo = true;
		} catch (DataAccessException e) {
			bo = false;
			throw e;
		}
		return bo;
	}
}
