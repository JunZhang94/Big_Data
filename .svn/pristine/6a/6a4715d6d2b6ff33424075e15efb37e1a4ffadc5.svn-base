package com.jp.tic.utils;

/**
 * 业务逻辑异常类
 * @author lsg
 *
 */
@SuppressWarnings("serial")
public class BaseException extends Exception {
	protected int code = -1;//一般错误代码
	protected String message;
	/**是否需要在界面显示的标志位**/
	private boolean needAlert = true;
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getMessage() {
		return this.message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public boolean isNeedAlert() {
		return needAlert;
	}
	public void setNeedAlert(boolean needAlert) {
		this.needAlert = needAlert;
	}
}
