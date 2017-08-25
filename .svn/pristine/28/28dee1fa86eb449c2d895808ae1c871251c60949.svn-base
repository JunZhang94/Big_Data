package com.jp.tic.framework.cxfws.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElements;
import javax.xml.bind.annotation.XmlRootElement;

import com.jp.tic.common.pagination.PageHolder;
import com.jp.tic.common.pagination.Paginator;
import com.jp.tic.framework.entity.BaseEntity;

/**
 * <b>function:</b> WebService 返回分页对象结果集
 * @author hoojo
 * @createDate 2012-4-16 下午02:42:13
 * @file WSPageResult.java
 * @version 1.0
 */
@XmlRootElement
public class WSPageResult<T> extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 4762275559606104670L;
	/** 返回分页数据 */
	private List<T> data = new ArrayList<T>();
	/** 总行数 */
	private int totalCount;// 总行数
	/** 每页行数 */
	private int rowsPerPage;// 每页行数
	/** 当前页数,index从1开始 */
	private int currentPage;// 当前页数,index从1开始
	/** 总页数 */
	private int totalPage;
	
	public WSPageResult() {
	}

	public WSPageResult(PageHolder<T> pageHolder) {
		if (pageHolder != null) {
			Paginator page = pageHolder.getPaginator();
			this.totalCount = page.getTotalRows();
			this.currentPage = page.getCurrentPageNo();
			this.rowsPerPage = page.getPageSize();
			this.data = pageHolder.getItems();
		}
	}
	
	public WSPageResult(List<T> data) {
		this.data = data;
	}
	
	public WSPageResult(List<T> data, int totalCount, int rowsPerPage, int currentPage) {
		this.data = data;
		this.totalCount = totalCount;
		this.rowsPerPage = rowsPerPage;
		this.currentPage = currentPage;
	}
	
	/** 总页数 */
	public int getTotalPage() {
		try {
			if (totalCount % rowsPerPage == 0) {
				totalPage = totalCount / rowsPerPage;
			} else {
				totalPage = (totalCount / rowsPerPage) + 1;
			}
		} catch (Exception e) {
		}
		return totalPage;
	}

	/** 总页数 */
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	@XmlElements({ 
		@XmlElement(name = "ClauseType", type = Object.class),
	})
	
	/** 返回分页数据 */
	public List<T> getData() {
		return data;
	}

	/** 返回分页数据 */
	public void setData(List<T> data) {
		this.data = data;
	}

	/** 总行数 */
	public int getTotalCount() {
		return totalCount;
	}

	/** 总行数 */
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	/** 每页行数 */
	public int getRowsPerPage() {
		return rowsPerPage;
	}

	/** 每页行数 */
	public void setRowsPerPage(int rowsPerPage) {
		this.rowsPerPage = rowsPerPage;
	}

	/** 当前页数,index从1开始 */
	public int getCurrentPage() {
		return currentPage;
	}

	/** 当前页数,index从1开始 */
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
}