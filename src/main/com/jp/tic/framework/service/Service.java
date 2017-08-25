package com.jp.tic.framework.service;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import org.springframework.dao.DataAccessException;

/**
 * <b>function:</b> Service 顶级接口，提供给所有Service服务层接口继承，
 * 	其默认实现类为GeneratorServiceImpl实现，可以快速帮助我们创建服务。
 * <pre>
 * interface:
 * 	public interface DeviceInfoService&lt;T extends DeviceInfo> extends Service&lt;DeviceInfo> {
 * 	}
 * 
 * implements:
 * 	public class DeviceInfoServiceImpl&lt;T extends DeviceInfo> extends GeneratorServiceImpl&lt;DeviceInfo> implements DeviceInfoService&lt;T> {
 * 		public DeviceInfoServiceImpl() {
 *			super(DeviceInfo.class);
 *		}
 * 	}
 * </pre>
 * @author hoojo
 * @createDate 2013-4-25 下午04:15:41
 * @file Service.java
 * @package com.jp.tic.framework.service
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public interface Service<T> {

	/**
	 * <b>function:</b> 增加一个entity对象，返回是否添加成功
	 * @createDate 2010-8-2 下午05:28:38
	 * @author hoojo
	 * @param entity 对象
	 * @param <T> 操作实体类型
	 * @return boolean true/false
	 * @throws Exception
	 */
	public boolean add(T entity) throws Exception;

	/**
	 * <b>function:</b> 添加一个entity对象，返回添加对象的Integer类型的主键
	 * @createDate 2010-8-2 下午05:29:39
	 * @author hoojo
	 * @param entity 将要添加的对象
	 * @param <T> 操作实体类型
	 * @return Integer 返回主键
	 * @throws DataAccessException
	 */
	public Integer addAndGetId4Integer(T entity) throws Exception;

	/**
	 * <b>function:</b> 添加一个对象并且返回该对象的String类型的主键
	 * @createDate 2010-8-2 下午05:31:32
	 * @author hoojo
	 * @param entity 将要添加的对象
	 * @param <T> 操作实体类型
	 * @return String 返回的主键
	 * @throws Exception
	 */
	public String addAndGetId4String(T entity) throws Exception;

	/**
	 * <b>function:</b> 修改entity对象，返回是否修改成功
	 * @createDate 2010-8-2 下午05:35:47
	 * @author hoojo
	 * @param entity 将要修改的对象
	 * @param 操作实体类型
	 * @return boolean true/false 是否修改成功
	 * @throws Exception
	 */
	public boolean edit(T entity) throws Exception;

	/**
	 * <b>function:</b> 如果不存在就添加该对象，存在该对象就修改该对象
	 * @author hoojo
	 * @createDate 2012-2-9 上午11:29:14
	 * @param <T> 对象类型
	 * @param entity
	 * @return 是否修改成功
	 * @throws Exception
	 */
	public boolean saveOrUpdate(T entity) throws Exception;

	public boolean merge(T entity) throws Exception;

	/**
	 * <b>function:</b> 如果不存在就添加该集合对象，存在该对象就修改该集合对象
	 * @author hoojo
	 * @createDate 2012-2-9 上午11:29:42
	 * @param <T> 集合中保存的对象类型
	 * @param entities
	 * @return 是否修改成功
	 * @throws Exception
	 */
	public boolean saveOrUpdate(Collection<T> entities) throws Exception;

	/**
	 * <b>function:</b> 传入一个将要删除的entity对象，返回删除是否成功
	 * @createDate 2010-8-2 下午05:42:02
	 * @author hoojo
	 * @param entity 将要传入的对象
	 * @param <T> 操作实体类型
	 * @return boolean true/false
	 * @throws Exception
	 */
	public boolean remove(T entity) throws Exception;

	/**
	 * <b>function:</b> 根据集合中的对象，删除这些对象的记录
	 * @author hoojo
	 * @createDate 2012-2-8 下午05:39:43
	 * @param entities 对象集合
	 * @param <T> 操作实体类型
	 * @return 是否删除成功
	 * @throws Exception
	 */
	public boolean removeAll(Collection<T> entities) throws Exception;

	/**
	 * <b>function:</b> 根据一组id，删除这些id的记录
	 * @author hoojo
	 * @createDate 2012-2-8 下午05:40:47
	 * @param clazz 删除的对象类型
	 * @param idName id的属性名称
	 * @param ids id参数集合数组
	 * @param 操作实体类型
	 * @return 是否删除成功
	 * @throws Exception
	 */
	public boolean removeByIds(String idName, Object... ids) throws Exception;

	/**
	 * <b>function:</b> 传入一个entity对象Class和String型主键，返回该对象
	 * @createDate 2010-8-2 下午05:44:53
	 * @author hoojo
	 * @param <T> 操作实体类型
	 * @param clazz 对象Class
	 * @param id 主键
	 * @return T 返回传入类型对象
	 * @throws Exception
	 */
	public T getById(String id) throws Exception;

	/**
	 * @param 传入long型主键 ，返回该对象
	 * @return<T> 操作实体类型
	 * @param clazz 对象Class
	 * @param id 主键
	 * @return T 返回传入类型对象
	 * @throws Exception
	 */
	public T getById(long id) throws Exception;

	/**
	 * <b>function:</b> 传入一个entity对象Class和Integer类型主键，返回该对象
	 * @createDate 2010-8-2 下午05:47:20
	 * @author hoojo
	 * @param <T> 操作实体类型
	 * @param clazz 对象Class
	 * @param id 主键
	 * @return T 返回该类型的对象
	 * @throws Exception
	 */
	public T getById(Integer id) throws Exception;

	/**
	 * <b>function:</b> 传入一个entity对象Class和Serializable类型主键，返回该对象
	 * @createDate 2010-8-2 下午05:48:36
	 * @author hoojo
	 * @param <T> 操作实体类型
	 * @param clazz 对象Class
	 * @param id 主键
	 * @return T 返回该类型的对象
	 * @throws Exception
	 */
	public T get(Serializable id) throws Exception;

	public T load(Serializable id) throws Exception;

	public List<T> loadAll() throws Exception;

	public boolean persist(T entity) throws Exception;

	public boolean refresh(T entity) throws Exception;

}
