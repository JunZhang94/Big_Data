package com.jp.tic.business.batch.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.jp.tic.system.entity.AbstractEntity;

@Entity
@Table(name = "DIS_FAKE_PLATE")
public class FakePlate extends AbstractEntity {
	@Id
	private long id;
	private String hphm;
	private String kkbh1;
	private Date jgsj1;
	private String kkbh2;
	private Date jgjs2;
	private String rowKey1;
	private String rowKey2;
	private String tx1;
	private String tx2;
	private Long clsd;
	private String differentFields;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getHphm() {
		return hphm;
	}
	public void setHphm(String hphm) {
		this.hphm = hphm;
	}
	public String getKkbh1() {
		return kkbh1;
	}
	public void setKkbh1(String kkbh1) {
		this.kkbh1 = kkbh1;
	}
	public Date getJgsj1() {
		return jgsj1;
	}
	public void setJgsj1(Date jgsj1) {
		this.jgsj1 = jgsj1;
	}
	public String getKkbh2() {
		return kkbh2;
	}
	public void setKkbh2(String kkbh2) {
		this.kkbh2 = kkbh2;
	}
	public Date getJgjs2() {
		return jgjs2;
	}
	public void setJgjs2(Date jgjs2) {
		this.jgjs2 = jgjs2;
	}
	public String getRowKey1() {
		return rowKey1;
	}
	public void setRowKey1(String rowKey1) {
		this.rowKey1 = rowKey1;
	}
	public String getRowKey2() {
		return rowKey2;
	}
	public void setRowKey2(String rowkey2) {
		this.rowKey2 = rowkey2;
	}
	public String getTx1() {
		return tx1;
	}
	public void setTx1(String tx1) {
		this.tx1 = tx1;
	}
	public String getTx2() {
		return tx2;
	}
	public void setTx2(String tx2) {
		this.tx2 = tx2;
	}
	public Long getClsd() {
		return clsd;
	}
	public void setClsd(Long clsd) {
		this.clsd = clsd;
	}
	public String getDifferentFields() {
		return differentFields;
	}
	public void setDifferentFields(String differentFields) {
		this.differentFields = differentFields;
	}
	
}
