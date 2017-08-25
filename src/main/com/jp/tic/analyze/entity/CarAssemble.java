package com.jp.tic.analyze.entity;

import com.jp.tic.framework.entity.BaseEntity;

/**
 * <b>function:</b>
 * 
 * @author hoojo
 * @createDate 2014-5-28 下午04:06:31
 * @file CarAssemble.java
 * @package com.jp.tic.analyze.entity
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
@SuppressWarnings("unchecked")
public class CarAssemble<T extends CarAssemble> extends BaseEntity implements Comparable<T> {

	private static final long serialVersionUID = 1L;
	private String plateNo;
	private String type;
	private int number;

	public String getPlateNo() {
		return plateNo;
	}

	public void setPlateNo(String plateNo) {
		this.plateNo = plateNo;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

	public CarAssemble(String plateNo, int number) {
		this.plateNo = plateNo;
		this.number = number;
	}

	public int compareTo(T target) {
		if (target instanceof CarAssemble) {
			int cmp = Double.compare(number, target.number);
			if (cmp != 0) {
				return cmp;
			}
			return plateNo.compareTo(target.plateNo);
		}
		throw new ClassCastException("Cannot compare Pair with " + target.getClass().getName());
	}

	public CarAssemble(String plateNo, String type, int number) {
		super();
		this.plateNo = plateNo;
		this.type = type;
		this.number = number;
	}
}
