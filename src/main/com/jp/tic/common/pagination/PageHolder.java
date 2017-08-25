package com.jp.tic.common.pagination;

import java.util.List;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

/**
 * <b>function:</b> 分页组件支持类
 * @author hoojo
 * @createDate 2012-2-9 下午10:08:39
 * @file PageHolder.java
 * @package com.jp.tic.common.pagination
 * @version 1.0
 * @param <T> 返回结果集集合泛型类型
 */

public class PageHolder<T> {

	public PageHolder() {
		
	}
	private List<T> items;

	// 分页组件对象
	private Paginator paginator;

	public PageHolder(List<T> items, Paginator paginator) {
		this.items = items;
		this.paginator = paginator;
	}
	
	public List<T> getItems() {
		return items;
	}

	public Paginator getPaginator() {
		return paginator;
	}

	public void setItems(List<T> items) {
		this.items = items;
	}

	public void setPaginator(Paginator paginator) {
		this.paginator = paginator;
	}

	@Override
	public String toString() {
		return ReflectionToStringBuilder.toString(this, ToStringStyle.MULTI_LINE_STYLE);
	}
}
