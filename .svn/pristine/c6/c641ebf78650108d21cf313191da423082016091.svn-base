package com.jp.tic.framework.entity;

import java.io.Serializable;

import javax.persistence.Transient;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

/**
 * <b>function:</b> BaseEntity 所有的实体类都继承该对象
 * @author hoojo
 * @createDate 2012-2-8 下午05:56:13
 * @file BaseEntity.java
 * @package com.jp.tic.framework.entity
 * @project SHMB
 * @version 1.0
 */
public abstract class BaseEntity implements Serializable {

	private static final long serialVersionUID = 5940540419379112813L;

	/** 删除对象用的 ids */
	@Transient
	private String ids;
	
	/** 查询传递的查询条件 */
	@Transient
	private String searchConditions;

	public String getSearchConditions() {
		return searchConditions;
	}

	public void setSearchConditions(String searchConditions) {
		this.searchConditions = searchConditions;
	}

	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}
	
	@Override
	public String toString() {
		return ReflectionToStringBuilder.toString(this, ToStringStyle.SHORT_PREFIX_STYLE);
	}
}
