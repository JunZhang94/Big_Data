package com.jp.tic.business.cartake.entity;

import com.jp.tic.framework.entity.BaseEntity;

public class QueryCarByMountParam extends BaseEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String mount;
	private String plateNo;
	private int pageSize;
	private byte[] lastKey;
	private byte[] stopKey;
	private String lastkey;
	private String deptText;
	private String mountText;
	


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


	public String getDeptText() {
		return deptText;
	}


	public void setDeptText(String deptText) {
		this.deptText = deptText;
	}


	public String getMountText() {
		return mountText;
	}


	public void setMountText(String mountText) {
		this.mountText = mountText;
	}


	public byte[] getStopKey() {
		return stopKey;
	}


	public void setStopKey(byte[] stopKey) {
		this.stopKey = stopKey;
	}


	public String getLastkey() {
		return lastkey;
	}


	public void setLastkey(String lastkey) {
		this.lastkey = lastkey;
	}

	public byte[] getLastKey() {
		return lastKey;
	}


	public void setLastKey(byte[] lastKey) {
		this.lastKey = lastKey;
	}

	public int getPageSize() {
		return pageSize;
	}


	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
