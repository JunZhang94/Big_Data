package com.jp.tic.system.util;

import java.util.Collections;
import java.util.List;

import org.apache.commons.lang.StringUtils;

public abstract class AbstractPager<T> implements Page<T> {

	public static final String ASC = "asc";
	public static final String DESC = "desc";
	public static final int PAGESIZE_MIN = 5;
	public static final int PAGESIZE_MAX = 200;
	protected int pageNo = 1;
	protected int pageSize = PAGESIZE_MIN;
	protected String orderBy = null;
	protected String order = null;
	protected boolean autoCount = true;
	protected List<T> result = Collections.emptyList();
	protected int totalCount = -1;

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(final int pageNo) {
		this.pageNo = pageNo;
	
		if (pageNo < 1) {
			this.pageNo = 1;
		}
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(final int pageSize) {
		this.pageSize = pageSize;
	
		if (pageSize < PAGESIZE_MIN) {
			this.pageSize = PAGESIZE_MIN;
		}
		if (pageSize > PAGESIZE_MAX) {
			this.pageSize = PAGESIZE_MAX;
		}
	}

	public int getFirst() {
		return ((pageNo - 1) * pageSize);
	}

	/**
	 * 获得排序字段,无默认值.多个排序字段时用','分隔,仅在Criterion查询时有效.
	 */
	public String getOrderBy() {
		return orderBy;
	}

	/**
	 * 设置排序字段.多个排序字段时用','分隔.仅在Criterion查询时有效.
	 */
	public void setOrderBy(final String orderBy) {
		this.orderBy = orderBy;
	}

	/**
	 * 是否已设置排序字段,仅在Criterion查询时有效.
	 */
	public boolean isOrderBySetted() {
		return StringUtils.isNotBlank(orderBy);
	}

	/**
	 * 获得排序方向,默认为asc,仅在Criterion查询时有效.
	 * 
	 * @param order 可选值为desc或asc,多个排序字段时用','分隔.
	 */
	public String getOrder() {
		return order;
	}

	/**
	 * 设置排序方式向,仅在Criterion查询时有效.
	 * 
	 * @param order 可选值为desc或asc,多个排序字段时用','分隔.
	 */
	public void setOrder(final String order) {
		//检查order字符串的合法值
		String[] orders = StringUtils.split(StringUtils.lowerCase(order), ',');
		for (String orderStr : orders) {
			if (!StringUtils.equals(DESC, orderStr) && !StringUtils.equals(ASC, orderStr))
				throw new IllegalArgumentException("排序方向" + orderStr + "不是合法值");
		}
	
		this.order = StringUtils.lowerCase(order);
	}

	/**
	 * 取得分页参数的组合字符串.
	 * 将多个分页参数组合成一个字符串方便在页面上的传递,格式为pageNo|orderBy|order.
	 */
	public String getPageRequest() {
		return getPageNo() + "|" + StringUtils.defaultString(getOrderBy()) + "|" + getOrder();
	}

	public void setPageRequest(final String pageRequest) {
	
		if (StringUtils.isBlank(pageRequest))
			return;
	
		String[] params = StringUtils.splitPreserveAllTokens(pageRequest, '|');
	
		if (StringUtils.isNumeric(params[0])) {
			setPageNo(Integer.valueOf(params[0]));
		}
	
		if (StringUtils.isNotBlank(params[1])) {
			setOrderBy(params[1]);
		}
	
		if (StringUtils.isNotBlank(params[2])) {
			setOrder(params[2]);
		}
	}

	/**
	 * 查询对象时是否自动另外执行count查询获取总记录数,默认为false,仅在Criterion查询时有效.
	 */
	public boolean isAutoCount() {
		return autoCount;
	}

	/**
	 * 查询对象时是否自动另外执行count查询获取总记录数,仅在Criterion查询时有效.
	 */
	public void setAutoCount(final boolean autoCount) {
		this.autoCount = autoCount;
	}

	/**
	 * 取得页内的记录列表.
	 */
	public List<T> getResult() {
		if(this.result == null)
	         this.result = Collections.EMPTY_LIST;//默认不能为null，否则store解析有问题
        return result;
	}

	public void setResult(List<T> result) {
		this.result = result;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(final int totalCount) {
		this.totalCount = totalCount;
	}

	public int getTotalPages() {
		if (totalCount < 0)
			return -1;
	
		int count = totalCount / pageSize;
		if (totalCount % pageSize > 0) {
			count++;
		}
		return count;
	}

	public boolean isHasNext() {
		return (pageNo + 1 <= getTotalPages());
	}

	public int getNextPage() {
		if (isHasNext())
			return pageNo + 1;
		else
			return pageNo;
	}

	public boolean isHasPre() {
		return (pageNo - 1 >= 1);
	}

	public int getPrePage() {
		if (isHasPre())
			return pageNo - 1;
		else
			return pageNo;
	}

	/**
	 * 获取任一页第一条数据在数据集的位置，每页条数使用默认值.
	 *
	 * @see #getStartOfPage(int,int)
	 */
	protected static int getStartOfPage(int pageNo) {
		return getStartOfPage(pageNo, PAGESIZE_MIN);
	}

	/**
	 * 获取任一页第一条数据在数据集的位置.
	 *
	 * @param pageNo   从1开始的页号
	 * @param pageSize 每页记录条数
	 * @return 该页第一条数据
	 */
	public static int getStartOfPage(int pageNo, int pageSize) {
		return (pageNo - 1) * pageSize;
	}
	
}
