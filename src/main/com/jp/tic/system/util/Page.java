package com.jp.tic.system.util;

import java.util.List;

public interface Page<T> {

	/**
	 * 获得当前页的页号,序号从1开始,默认为1.
	 */
	public  int getPageNo();

	/**
	 * 设置当前页的页号,序号从1开始,低于1时自动调整为1.
	 */
	public  void setPageNo(final int pageNo);

	/**
	 * 获得每页的记录数量,默认为10.
	 */
	public  int getPageSize();

	/**
	 * 设置每页的记录数量,超出MIN_PAGESIZE与MAX_PAGESIZE范围时会自动调整.
	 */
	public  void setPageSize(final int pageSize);

	/**
	 * 根据pageNo和pageSize计算当前页第一条记录在总结果集中的位置,序号从0开始.
	 */
	public  int getFirst();

	/**
	 * 设置分页参数的组合字符串.
	 * 将多个分页参数组合成一个字符串方便在页面上的传递,格式为pageNo|orderBy|order.
	 */
	public  void setPageRequest(final String pageRequest);

	/**
	 * 取得总记录数,默认值为-1.
	 */
	public  int getTotalCount();

	public  void setTotalCount(final int totalCount);

	/**
	 * 根据pageSize与totalCount计算总页数,默认值为-1.
	 */
	public  int getTotalPages();

	/**
	 * 是否还有下一页.
	 */
	public  boolean isHasNext();

	/**
	 * 取得下页的页号,序号从1开始.
	 */
	public  int getNextPage();

	/**
	 * 是否还有上一页. 
	 */
	public  boolean isHasPre();

	/**
	 * 取得上页的页号,序号从1开始.
	 */
	public  int getPrePage();

	public void setResult(List<T> result);
	public List<T> getResult();

}