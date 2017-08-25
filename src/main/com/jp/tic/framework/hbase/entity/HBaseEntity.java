package com.jp.tic.framework.hbase.entity;

import org.apache.hadoop.hbase.util.Bytes;

import com.jp.tic.framework.entity.BaseEntity;

/**
 * <b>function:</b> hbase 基类
 * @author hoojo
 * @createDate 2014-5-29 上午09:23:39
 * @file HBaseEntity.java
 * @package com.jp.tic.framework.hbase.entity
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public class HBaseEntity extends BaseEntity {

	private static final long serialVersionUID = 1L;
	
	private byte[] rowkey;
	private String key;
	
	public byte[] getRowkey() {
		if (rowkey == null) {
			rowkey = Bytes.toBytes(key);
		}
		return rowkey;
	}
	public void setRowkey(byte[] rowkey) {
		this.rowkey = rowkey;
	}
	public String getKey() {
		if (key == null) {
			key = Bytes.toString(rowkey);
		}
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}

}
