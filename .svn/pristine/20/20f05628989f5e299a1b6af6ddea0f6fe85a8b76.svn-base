/**
 * @Copyright (C) 2013 广州金鹏集团有限公司.
 * 本系统是商用软件,未经授权擅自复制或传播本程序的部分或全部将是非法的.
 * @文件名称:ResultEntity.java
 * @描述:TODO
 * @创建人:张晨
 * @创建时间:2013-8-21下午07:37:44
 * @版本: V1.0
 */
package com.jp.tic.utils.jsonUtil;

/**
 * @类功能说明: 结果集实体
 * @创建人:张晨
 * @创建时间: 2013-8-21下午07:37:44
 */
public class ResultEntity {

	private String result;
	private String message;
	private Object data;
	private String flag;

	public ResultEntity() {
	}

	public ResultEntity(String result, String message, Object data) {
		this.setResult(result);
		this.setMessage(message);
		this.setData(data);
	}

	public void setValue(String result, String message, Object data) {
		this.setResult(result);
		this.setMessage(message);
		this.setData(data);
	}

	public ResultEntity(String result, String message, Object data, String flag) {
		super();
		this.result = result;
		this.message = message;
		this.data = data;
		this.flag = flag;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	@Override
	public String toString() {
		return result + ":" + message + ":" + data + ":" + flag;
	}
}
