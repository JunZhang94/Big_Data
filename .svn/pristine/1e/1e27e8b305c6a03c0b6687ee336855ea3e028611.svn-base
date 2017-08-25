package com.jp.tic.common.pagination;

import java.util.List;
import java.util.Map;

import com.jp.tic.framework.entity.PageEntity;
import com.jp.tic.framework.mybatis.SqlMapper;

/**
 * <b>function:</b> 分页助手接口，需要分页的模块都需要实现该接口
 * @author hoojo
 * @createDate 2012-2-9 下午10:04:46
 * @file PageQueryMapper.java
 * @package com.jp.tic.common.pagination
 * @version 1.0
 */
public interface PageQueryMapper<T> extends SqlMapper {
	
	/**
	 * <b>function:</b> 根据Map参数查询分页，查询记录总条数
	 * @author hoojo
	 * @createDate 2012-2-9 下午10:15:32
	 * @param queryParams 查询参数，可以通过map对象转换成JavaEntity
	 * @return 总记录行数
	 */
	public int totalCount(Map<?, ?> queryParams);
	
	/**
	 * <b>function:</b> 根据Map参数查询分页，查询分页结果集
	 * @author hoojo
	 * @createDate 2012-2-9 下午10:17:02
	 * @param queryParams 查询参数，可以通过map对象转换成JavaEntity
	 * @return 返回查询结果集
	 */
	public List<T> queryPage(Map<?, ?> queryParams);
	
	/**
	 * <b>function:</b>
	 * @author hoojo
	 * @createDate 2012-10-20 下午08:30:14
	 * @file PageQueryMapper.java
	 * @package com.jp.tic.common.pagination
	 * @project SHMB
	 * @blog http://blog.csdn.net/IBM_hoojo
	 * @email hoojo_@126.com
	 * @version 1.0
	 * @param <E>
	 */
	public interface PageEntityQueryMapper<E extends PageEntity> extends SqlMapper {
		/**
		 * <b>function:</b> 记录总条数
		 * @author hoojo
		 * @createDate 2012-2-9 下午10:11:11
		 * @param entity
		 * @return 返回查询结果集
		 */
		public int totalCount(E entity);

		/**
		 * <b>function:</b> 当前分页结果集
		 * @author hoojo
		 * @createDate 2012-2-9 下午10:11:19
		 * @param entity
		 * @return 返回查询结果集
		 */
		public List<E> queryPage(E entity);
	}
}
