package com.jp.tic.framework.entity;

import javax.persistence.Transient;

/**
 * <b>function:</b> 继承分页实体对象，需要分页的对象继承该对象
 * @author hoojo
 * @createDate 2012-2-10 上午09:48:42
 * @file PageEntity.java
 * @package com.jp.tic.framework.entity
 * @project SHMB
 * @version 1.0
 */
public class PageEntity extends BaseEntity {
	private static final long serialVersionUID = -5204810978929904732L;
	
	@Transient
	private String orderBy;
	@Transient
	private String orderDir;
	
	@Transient
	private Integer pageNo = 1;
	@Transient
	private Integer pageSize = 10;
	
	@Transient
	private Integer offset = 0;
	@Transient
	private Integer offsetLast = 1;
	
	public Integer getOffset() {
		return offset;
	}
	public void setOffset(Integer offset) {
		this.offset = offset;
	}
	
	public Integer getOffsetLast() {
		return offsetLast;
	}
	public void setOffsetLast(Integer offsetLast) {
		this.offsetLast = offsetLast;
	}
	
	public String getOrderBy() {
		return orderBy;
	}
	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}
	public String getOrderDir() {
		return orderDir;
	}
	public void setOrderDir(String orderDir) {
		this.orderDir = orderDir;
	}
	public Integer getPageNo() {
		return pageNo;
	}
	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
}
