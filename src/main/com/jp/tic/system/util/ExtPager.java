package com.jp.tic.system.util;

import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;



/**
 * 与具体ORM实现无关的分页参数及查询结果封装.
 * 
 * @param <T> Page中记录的类型.
 * @author abe
 */
@Component("page")
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
public  class ExtPager<T> extends AbstractPager<T> {
	
	public static String PAGE_START = "start";
	public static String PAGE_LIMIT = "limit";
	public static String PAGE_SORT_DIR = "dir";
	public static String PAGE_SORT_COLUMN = "sort";
	
	private int start ;
	private int limit;
	private String dir;
	private String sort;
	
	public ExtPager() {
		super();
	}

	public ExtPager(final int pageSize) {
		setPageSize(pageSize);
	}

	public ExtPager(final int pageSize, final boolean autoCount) {
		setPageSize(pageSize);
		this.autoCount = autoCount;
	}

	
	public String getDir() {
		return dir;
	}

	public void setDir(String dir) {
		this.dir = dir;
	}

	public String getSort() {
		return sort;
	}
	public String getActualSort(){
		if(this.sort != null){
			if(this.sort.indexOf(".") >= 0)
				return this.sort.substring(this.sort.indexOf(".")+1);
			else 
				return this.sort;
		}
		return null;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}
	
	@Override
	public void setPageNo(int pageNo){
		this.pageNo = pageNo;
	}
	
	@Override
	public int getPageNo(){
		if(this.pageNo == -1)
			return -1;
		else{
			if(this.limit != 0)
				return (this.start/this.limit)+1;
			else
				return 0;
		}
	}
	@Override
	public int getPageSize(){
		return this.limit;
	}
}
