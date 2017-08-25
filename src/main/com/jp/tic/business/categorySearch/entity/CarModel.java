package com.jp.tic.business.categorySearch.entity;

import java.util.Date;

import org.apache.solr.client.solrj.beans.Field;

public class CarModel {
	
	@Field
	private String rowkey;
	@Field
	private String id;
	@Field
	private String xxbh;
	@Field
	private String hphm;
	@Field
	private String kkbh;
	@Field
	private String fxbh;
	@Field
	private Date jgsj;
	@Field
	private String hpzl;
	@Field
	private int hpys;
	@Field
	private String brand;
	@Field
	private String type;
	@Field
	private String caryear;
	@Field
	private String clzl;

	public String getRowkey() {
		return rowkey;
	}

	public void setRowkey(String rowkey) {
		this.rowkey = rowkey;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getXxbh() {
		return xxbh;
	}

	public void setXxbh(String xxbh) {
		this.xxbh = xxbh;
	}

	public String getHphm() {
		return hphm;
	}

	public void setHphm(String hphm) {
		this.hphm = hphm;
	}

	public String getKkbh() {
		return kkbh;
	}

	public void setKkbh(String kkbh) {
		this.kkbh = kkbh;
	}

	public String getFxbh() {
		return fxbh;
	}

	public void setFxbh(String fxbh) {
		this.fxbh = fxbh;
	}

	public String getHpzl() {
		return hpzl;
	}

	public void setHpzl(String hpzl) {
		this.hpzl = hpzl;
	}

	public int getHpys() {
		return hpys;
	}

	public void setHpys(int hpys) {
		this.hpys = hpys;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getCaryear() {
		return caryear;
	}

	public void setCaryear(String caryear) {
		this.caryear = caryear;
	}

	public String getClzl() {
		return clzl;
	}

	public void setClzl(String clzl) {
		this.clzl = clzl;
	}

	public String getRowKey() {
		return rowkey;
	}

	public void setRowKey(String rowkey) {
		this.rowkey = rowkey;
	}
	
	public Date getJgsj() {
		return jgsj;
	}

	public void setJgsj(Date jgsj) {
		this.jgsj = jgsj;
	}

}
