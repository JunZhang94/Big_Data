package com.jp.tic.business.cartake.entity;

import java.util.Date;

import org.apache.solr.client.solrj.beans.Field;

public class CarTakeSolr {
	
    @Field
    private String id;                    //id
    @Field
    private String hphm;             //号牌号码
    @Field
    private String kkbh;          //卡口编号
    @Field
    private String fxbh;              //方向编号
    @Field
    private String rowkey;         //rowkey
    @Field
    private String sbbh;        //设备编号
    @Field
    private String hpzl;        //号牌种类
    @Field
    private String hpys;        //号牌颜色
    @Field
    private Date jgsj;        //经过时间
    @Field
    private float clsd;		//车辆速度
    @Field
    private Integer dropnum; //吊坠个数
    @Field
    private Integer boxnum;  //纸巾盒个数
    @Field
    private Integer tagNum;  //年检标个数
	@Field
    private String csys;	//车身颜色
    @Field
    private String clzl;   //车辆种类
    @Field
    private String brand;	//车辆品牌
    @Field
    private String type;	//品牌款式
    @Field
    private String caryear;	//品牌年款
    
    
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
	public Integer getDropnum() {
		return dropnum;
	}
	public void setDropnum(Integer dropnum) {
		this.dropnum = dropnum;
	}
	public Integer getBoxnum() {
		return boxnum;
	}
	public void setBoxnum(Integer boxnum) {
		this.boxnum = boxnum;
	}
	public Integer getTagNum() {
		return tagNum;
	}
	public void setTagNum(Integer tagNum) {
		this.tagNum = tagNum;
	}
	public String getCsys() {
		return csys;
	}
	public void setCsys(String csys) {
		this.csys = csys;
	}
	public String getClzl() {
		return clzl;
	}
	public void setClzl(String clzl) {
		this.clzl = clzl;
	}
    public float getClsd() {
		return clsd;
	}
	public void setClsd(float clsd) {
		this.clsd = clsd;
	}
	public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getFxbh() {
        return fxbh;
    }
    public void setFxbh(String fxbh) {
        this.fxbh = fxbh;
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
	public String getRowkey() {
		return rowkey;
	}
	public void setRowkey(String rowkey) {
		this.rowkey = rowkey;
	}
	public String getSbbh() {
		return sbbh;
	}
	public void setSbbh(String sbbh) {
		this.sbbh = sbbh;
	}
	public String getHpzl() {
		return hpzl;
	}
	public void setHpzl(String hpzl) {
		this.hpzl = hpzl;
	}
	public String getHpys() {
		return hpys;
	}
	public void setHpys(String hpys) {
		this.hpys = hpys;
	}
	public Date getJgsj() {
		return jgsj;
	}
	public void setJgsj(Date jgsj) {
		this.jgsj = jgsj;
	}
	
}
