package com.jp.tic.common.pagination;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang.ObjectUtils;
import org.apache.commons.lang.math.NumberUtils;

import com.jp.tic.common.pagination.PageQueryMapper.PageEntityQueryMapper;
import com.jp.tic.common.util.MapUtils;
import com.jp.tic.framework.entity.PageEntity;
import com.jp.tic.framework.log.ApplicationLogging;

/**
 * <b>function:</b> 分页查询器，查询分页通用对象
 * @author hoojo
 * @createDate 2012-10-20 下午09:29:39
 * @file PageQueryExecutor.java
 * @package com.jp.tic.common.pagination
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public class PageQueryExecutor extends ApplicationLogging {

	// 默认页面显示记录条数
	private final int defaultPageSize = 10;
	// 默认查询起始页
	private final int defaultPageNo = 1;

	/**
	 * <b>function:</b> 传递PageQueryMapper接口实现类和queryParams查询参数，完成查询分页
	 * @author hoojo
	 * @param <T>
	 * @param mapper PageQueryMapper 接口实现类
	 * @param queryParams 查询参数，至少要包含key {pageSize， pageNo}
	 * @return PageHolder 可以获取返回结果集、分页对象
	 */
	public <T> PageHolder<T> query(PageQueryMapper<T> mapper, Map<String, Object> queryParams) {

		Map<String, Object> params = MapUtils.checkMapValue(queryParams);
		trace("query page param: {}", params);
		Integer rowCount = mapper.totalCount(params);

		if (rowCount == null)
			throw new IllegalStateException("Row count returned null, check the query.");

		Paginator paginator = new Paginator();

		paginator.setTotalRows(rowCount);
		paginator.setPageSize(NumberUtils.toInt(ObjectUtils.toString(params.get("pageSize")), defaultPageSize));
		paginator.setCurrentPage(NumberUtils.toInt(ObjectUtils.toString(params.get("pageNo")), defaultPageNo));

		params.put("offset", paginator.getOffset());
		params.put("offsetLast", paginator.getOffsetLast());
		
		List<T> items = mapper.queryPage(params);
		return new PageHolder<T>(items, paginator);
	}
	
	/**
	 * <b>function:</b> 通过继承PageEntity实体的参数对象，调用PageEntityQueryMapper的接口实现类完成查询分页
	 * @author hoojo
	 * @param <T>
	 * @param entity 查询参数对象
	 * @return PageHolder 可以获取返回结果集、分页对象
	 */
	@SuppressWarnings("unchecked")
	public <T extends PageEntity> PageHolder<T> query(PageEntityQueryMapper<T> mapper, T entity) {
		trace("query entity param: {}", entity);
		Integer rowCount = mapper.totalCount(entity);

		if (rowCount == null) {
			throw new IllegalStateException("Row count returned null, check the query.");
		}
		Paginator paginator = new Paginator();
		paginator.setTotalRows(rowCount);
		
		if (entity == null) {
			entity = (T) new PageEntity();
			paginator.setPageSize(defaultPageSize);
			paginator.setCurrentPage(defaultPageNo);
		} else {
			paginator.setPageSize(entity.getPageSize());
			paginator.setCurrentPage(entity.getPageNo());
		}
		
		entity.setOffset(paginator.getOffset());
		entity.setOffsetLast(paginator.getOffsetLast());
		
		List<T> items = mapper.queryPage(entity);
		return new PageHolder<T>(items, paginator);
	}
}
