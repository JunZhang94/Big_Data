package com.jp.tic.business.batch.entity;

import com.jp.tic.system.entity.AbstractEntity;

public class TaskQueryParam  extends AbstractEntity{
	private Long jobId;
	private Integer pageNo;
	private Integer pageSzie;
	public Long getJobId() {
		return jobId;
	}
	public void setJobId(Long jobId) {
		this.jobId = jobId;
	}
	public Integer getPageNo() {
		return pageNo;
	}
	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}
	public Integer getPageSzie() {
		return pageSzie;
	}
	public void setPageSzie(Integer pageSzie) {
		this.pageSzie = pageSzie;
	}
	
	
}
