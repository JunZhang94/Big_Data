package com.jp.tic.business.cartake.entity;

import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.util.Bytes;

public class CarTake {
	private long jgsj;
	private String kkbh;
	private String hphm;
	private String hpys;
	private String tx;
	private byte[] rowkey;

	public CarTake(Result r) {
		this.jgsj = Bytes.toLong(r.getValue(Bytes.toBytes("take"),
				Bytes.toBytes("jgsj")));
		this.kkbh = Bytes.toString(r.getValue(
				Bytes.toBytes("take"), Bytes.toBytes("kkbh")));
		this.hphm = Bytes.toString(r.getValue(
				Bytes.toBytes("take"), Bytes.toBytes("hphm")));
		this.hpys = Bytes.toString(r.getValue(
				Bytes.toBytes("take"), Bytes.toBytes("hpys")));
		this.tx = Bytes.toString(r.getValue(
				Bytes.toBytes("take"), Bytes.toBytes("tx1")));
		this.rowkey = r.getRow();
		hphm = hphm==null?"":hphm;
		hpys = hpys==null?"":hpys;
	}
	
	public CarTake(){
		this.jgsj = 0;
		this.kkbh = "";
		this.hphm = "";
		this.rowkey = null;
	}
	
	public long getJgsj(){
		return this.jgsj;
	}
	
	public String getKkbh(){
		return this.kkbh;
	}
	
	public String getHphm(){
		return this.hphm;
	}
	
	public byte[] getRowkey(){
		return this.rowkey;
	}
	
	public String getHpys(){
		return this.hpys;
	}
	
	public String getTx(){
		return this.tx;
	}

	/**
	 * @param jgsj the jgsj to set
	 */
	public void setJgsj(long jgsj) {
		this.jgsj = jgsj;
	}

	/**
	 * @param kkbh the kkbh to set
	 */
	public void setKkbh(String kkbh) {
		this.kkbh = kkbh;
	}

	/**
	 * @param hphm the hphm to set
	 */
	public void setHphm(String hphm) {
		this.hphm = hphm;
	}

	/**
	 * @param hpys the hpys to set
	 */
	public void setHpys(String hpys) {
		this.hpys = hpys;
	}

	/**
	 * @param tx the tx to set
	 */
	public void setTx(String tx) {
		this.tx = tx;
	}
	
}
