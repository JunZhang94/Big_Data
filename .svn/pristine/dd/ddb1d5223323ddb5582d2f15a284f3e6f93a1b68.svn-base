package com.jp.tic.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import com.jp.tic.common.enums.IdType;
import com.jp.tic.framework.entity.BaseEntity;

/**
 * <b>function:</b> id生成器实体
 * @author hoojo
 * @createDate 2012-12-26 上午11:29:46
 * @file IDGenerator.java
 * @package com.jp.tic.common.entity
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
@Entity
@Table(name = "ID_Generator")
public class IDGenerator extends BaseEntity {

	private static final long serialVersionUID = 6645777039129710229L;
	
	@Id
	@Column(name = "id_Type")
	@Enumerated(EnumType.STRING)
	private IdType idType;
	
	private String name;
	@Column(name = "start_Val")
	private long startVal = 0;
	private long val = 0;
	private int step = 1;
	private String prefix;
	private String suffix;
	
	public IDGenerator() {
	}
	
	public IDGenerator(IdType idType, String name, long startVal, int step, String prefix, String suffix) {
		this(idType, startVal, step, prefix, suffix);
		this.name = idType.getName();
	}
	
	public IDGenerator(IdType idType, long startVal, int step, String prefix, String suffix) {
		this(idType, startVal, step);
		this.prefix = prefix;
		this.suffix = suffix;
	}
	
	public IDGenerator(IdType idType, long startVal, int step) {
		this(idType, startVal);
		this.step = Math.max(step, 1);
	}
	
	public IDGenerator(IdType idType, long startVal) {
		this(idType);
		this.startVal = startVal;
	}
	
	public IDGenerator(IdType idType) {
		super();
		this.idType = idType;
		this.name = idType.getName();
	}
	
	public IdType getIdType() {
		return idType;
	}
	public void setIdType(IdType idType) {
		this.idType = idType;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public long getStartVal() {
		return startVal;
	}
	public void setStartVal(long startVal) {
		this.startVal = startVal;
	}
	public long getVal() {
		return val;
	}
	public void setVal(long val) {
		this.val = val;
	}
	public int getStep() {
		return step;
	}
	public void setStep(int step) {
		this.step = Math.max(step, 1);
	}
	public String getPrefix() {
		return prefix;
	}
	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}
	public String getSuffix() {
		return suffix;
	}
	public void setSuffix(String suffix) {
		this.suffix = suffix;
	}
}
