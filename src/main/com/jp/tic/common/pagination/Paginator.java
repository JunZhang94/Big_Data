package com.jp.tic.common.pagination;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import com.jp.tic.common.util.MathUtils;

/**
 * <b>function:</b> 分页组件实体对象； 注意：getXXX()返回真正的值，而getXXXNo()则返回在真正的值上 + 1的； 如：第一页：实际值是0，而看到的是1；
 * @author hoojo
 * @createDate 2012-2-9 下午09:04:42
 * @file Paginator.java
 * @package com.jp.tic.common.pagination
 * @project SHMB
 * @version 1.0
 */
public final class Paginator {

	public static void main(String[] args) {
		Paginator page = new Paginator(100, 1001, 1);
		page.setCurrentPage(2);
		System.out.println(page.getNextPageNo());
		System.out.println(page.getPrevPageNo());
		System.out.println(page.isFirst());
		System.out.println(page.getCurrentPage());
		System.out.println(page.getCurrentPageNo());
		System.out.println(page.getOffset());
		System.out.println(page.getOffsetLast());
		System.out.println(ReflectionToStringBuilder.toString(page, ToStringStyle.SHORT_PREFIX_STYLE));
	}

	// 当前页
	private int currentPage;

	// 是否第一页
	private boolean first;

	// 第一页
	private int firstPage;

	// 是否最后一页
	private boolean last;

	// 最后一页
	private int lastPage;

	// 下一页
	private int nextPage;

	// 取得当前查询数据的区间
	private int offset;

	private int offsetLast;

	// 每页显示记录条数
	private int pageSize;

	// 前一页
	private int prevPage;

	// 总页数
	private int totalPage;

	// 总记录条数
	private int totalRows;

	public Paginator() {
		init(0, 0, 1);
	}

	public Paginator(int pageSize, int totalRows, int currPage) {
		init(pageSize, totalRows, currPage);
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public int getCurrentPageNo() {
		return currentPage;
	}

	public int getFirstPage() {
		return firstPage;
	}

	public int getFirstPageNo() {
		return firstPage;
	}

	public int getLastPage() {
		return lastPage;
	}

	public int getLastPageNo() {
		return lastPage;
	}

	public int getNextPage() {
		return nextPage;
	}

	public int getNextPageNo() {
		return nextPage;
	}

	public int getOffset() {
		return offset;
	}

	public int getOffsetLast() {
		return offsetLast;
	}

	public int getPageSize() {
		return pageSize;
	}

	public int getPrevPage() {
		return prevPage;
	}

	public int getPrevPageNo() {
		return prevPage;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public int getTotalRows() {
		return totalRows;
	}

	public boolean isFirst() {
		return first;
	}

	public boolean isLast() {
		return last;
	}

	public void setCurrentPage(int currPage) {
		init(pageSize, totalRows, currPage);
	}

	public void setFirst(boolean first) {
		throw new UnsupportedOperationException();
	}

	public void setFirstPage(int firstPage) {
		throw new UnsupportedOperationException();
	}

	public void setFirstPageNo(int i) {
		throw new UnsupportedOperationException();
	}

	public void setLast(boolean last) {
		throw new UnsupportedOperationException();
	}

	public void setLastPage(int lastPage) {
		throw new UnsupportedOperationException();
	}

	public void setLastPageNo(int i) {
		throw new UnsupportedOperationException();
	}

	public void setNextPage(int nextPage) {
		throw new UnsupportedOperationException();
	}

	public void setNextPageNo(int i) {
		throw new UnsupportedOperationException();
	}

	public void setOffset(int offset) {
		throw new UnsupportedOperationException();
	}

	public void setOffsetLast(int offsetLast) {
		throw new UnsupportedOperationException();
	}

	public void setPageSize(int pageSize) {
		init(pageSize, totalRows, currentPage);
	}

	public void setPrevPage(int prevPage) {
		throw new UnsupportedOperationException();
	}

	public void setPrevPageNo(int i) {
		throw new UnsupportedOperationException();
	}

	public void setTotalPage(int totalPage) {
		throw new UnsupportedOperationException();
	}

	public void setTotalRows(int totalRows) {

		init(pageSize, totalRows, currentPage);
	}

	@Override
	public String toString() {
		return ReflectionToStringBuilder.toString(this, ToStringStyle.SHORT_PREFIX_STYLE);
	}

	private void init(int page_size, int total_rows, int current_page) {

		pageSize = Math.max(page_size, 1);
		totalRows = total_rows;

		totalPage = MathUtils.divCeil(total_rows, pageSize);

		lastPage = Math.max(totalPage, 0);
		firstPage = 1;

		currentPage = Math.min(Math.max(current_page, firstPage), lastPage);
		prevPage = Math.max(currentPage - 1, firstPage);
		nextPage = Math.min(currentPage + 1, lastPage);

		offset = (currentPage - 1) * pageSize;
		offsetLast = MathUtils.clip(offset + pageSize, offset, totalRows);

		first = currentPage == firstPage;
		last = currentPage == lastPage;
	}
}
