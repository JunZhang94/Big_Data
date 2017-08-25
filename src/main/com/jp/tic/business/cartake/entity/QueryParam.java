package com.jp.tic.business.cartake.entity;

import com.jp.tic.framework.entity.BaseEntity;

/**
 * <b>function:</b> 查询参数对象
 * @author hoojo
 * @createDate 2014-5-26 上午10:07:27
 * @file QueryParam.java
 * @package com.jp.tic.business.cartake.entity
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public class QueryParam extends BaseEntity {

	private static final long serialVersionUID = 4652218020017881226L;
	
	private String startDate;
	private String endDate;
	private String mount;
	private String dept;
	private String plateNo;
	private String type;
	
	private Integer pageSize;
	private byte[] startKey;
	private byte[] stopKey;
	
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	public byte[] getStartKey() {
		return startKey;
	}
	public void setStartKey(byte[] startKey) {
		this.startKey = startKey;
	}
	public byte[] getStopKey() {
		return stopKey;
	}
	public void setStopKey(byte[] stopKey) {
		this.stopKey = stopKey;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getMount() {
		return mount;
	}
	public void setMount(String mount) {
		this.mount = mount;
	}
	public String getPlateNo() {
		return plateNo;
	}
	public void setPlateNo(String plateNo) {
		this.plateNo = plateNo;
	}
	public String getDept() {
		return dept;
	}
	public void setDept(String dept) {
		this.dept = dept;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
}
