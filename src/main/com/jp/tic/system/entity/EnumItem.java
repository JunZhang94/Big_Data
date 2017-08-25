package com.jp.tic.system.entity;

import java.io.Serializable;

public class EnumItem implements Serializable {
	
	private static final long serialVersionUID = 2823943773522769764L;
	
	private String itemCode;
	private String itemName;
	private String itemValue;
	
	public String getItemCode() {
		return itemCode;
	}
	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public String getItemValue() {
		return itemValue;
	}
	public void setItemValue(String itemValue) {
		this.itemValue = itemValue;
	}

}
