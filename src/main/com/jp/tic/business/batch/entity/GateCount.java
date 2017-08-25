package com.jp.tic.business.batch.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "DIS_GATE_COUNT")
public class GateCount {
	@Id
	private long id;
	private String kkbh;
	private Date startTime;
	private Date endTime;
	private Long count;
	private Long hphmCount;
	private Long nonHphmCount;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getKkbh() {
		return kkbh;
	}
	public void setKkbh(String kkbh) {
		this.kkbh = kkbh;
	}
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public Long getCount() {
		return count;
	}
	public void setCount(Long count) {
		this.count = count;
	}
	public Long getHphmCount() {
		return hphmCount;
	}
	public void setHphmCount(Long hphmCount) {
		this.hphmCount = hphmCount;
	}
	public Long getNonHphmCount() {
		return nonHphmCount;
	}
	public void setNonHphmCount(Long nonHphmCount) {
		this.nonHphmCount = nonHphmCount;
	}
	
	
}
