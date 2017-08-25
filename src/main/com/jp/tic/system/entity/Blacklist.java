package com.jp.tic.system.entity;

import java.util.Date;


public class Blacklist implements java.io.Serializable {

	private static final long serialVersionUID = 8971126657720329417L;

	private String id;
	private String hphm;
	private String cpys;
	private String csys;
	private String cllx;
	private String hpzl;
	private String clpp;
	private String cljs;
	private Date llsj;
	private String bjjb;
	
	/**
	 * @return 序号
	 */
	public String getId() {
		return id;
	}
	/**
	 * @param 序号
	 */
	public void setId(String id) {
		this.id = id;
	}
	
	/**
	 * @return 车牌号码
	 */
	public String getHphm() {
		return hphm;
	}
	/**
	 * @param 车牌号码
	 */
	public void setHphm(String hphm) {
		this.hphm = hphm;
	}
	
	/**
	 * @return 车牌颜色
	 */
	public String getCpys() {
		return cpys;
	}
	/**
	 * @param 车牌颜色
	 */
	public void setCpys(String cpys) {
		this.cpys = cpys;
	}
	
	/**
	 * @return 车身颜色
	 */
	public String getCsys() {
		return csys;
	}
	/**
	 * @param 车身颜色
	 */
	public void setCsys(String csys) {
		this.csys = csys;
	}
	
	/**
	 * @return 车辆类型
	 */
	public String getCllx() {
		return cllx;
	}
	/**
	 * @param 车辆类型
	 */
	public void setCllx(String cllx) {
		this.cllx = cllx;
	}
	
	/**
	 * @return 号牌种类
	 */
	public String getHpzl() {
		return hpzl;
	}
	/**
	 * @param 号牌种类
	 */
	public void setHpzl(String hpzl) {
		this.hpzl = hpzl;
	}
	
	/**
	 * @return 车辆品牌
	 */
	public String getClpp() {
		return clpp;
	}
	/**
	 * @param 车辆品牌
	 */
	public void setClpp(String clpp) {
		this.clpp = clpp;
	}
	
	/**
	 * @return 车辆简述
	 */
	public String getCljs() {
		return cljs;
	}
	/**
	 * @param 车辆简述
	 */
	public void setCljs(String cljs) {
		this.cljs = cljs;
	}
	
	/**
	 * @return 录入时间
	 */
	public Date getLlsj() {
		return llsj;
	}
	/**
	 * @param 录入时间
	 */
	public void setLlsj(Date llsj) {
		this.llsj = llsj;
	}
	
	/**
	 * @return 报警级别
	 */
	public String getBjjb() {
		return bjjb;
	}
	/**
	 * @param 报警级别
	 */
	public void setBjjb(String bjjb) {
		this.bjjb = bjjb;
	}

}