package com.jp.tic.utils.exception;

import java.util.Map;

public class BaseRuntimeException extends RuntimeException {

	private static final long serialVersionUID = -7825204695876541053L;
	private Throwable cause;
	private String[] sArgs;// 以数组的方式传附带信息
	private Map mArgs;// 以map的方式传附带信息（目前已经用到三个键:sDataSource，sSql，sPath）
	private String mKey;// 通过此键从conf/i18n_zh_CN.properties取异常描述，返回到页面。

	/**
	 * @param cause
	 *            原始异常对象
	 * @param mArgs
	 *            自定义异常信息
	 */
	public BaseRuntimeException(Throwable cause, Map mArgs) {
		// 如果传入的本身就是一个BaseRuntimeException对象，记录最原始异常对象
		if (cause != null && cause instanceof BaseRuntimeException) {
			this.cause = ((BaseRuntimeException) cause).cause;
			this.mArgs = ((BaseRuntimeException) cause).mArgs;
		} else {
			this.cause = cause;
		}
		if (this.mArgs != null && mArgs != null) {// 追加新自定议信息,或用新自定议信息覆盖旧信息
			this.mArgs.putAll(mArgs);
		} else {
			this.mArgs = mArgs;
		}
	}

	/**
	 * 建议只用此构造
	 * 
	 * @param cause
	 *            原始异常对象
	 * @param mArgs
	 *            自定义异常信息
	 */
	public BaseRuntimeException(Throwable cause, Map mArgs, String mKey,
			String[] sArgs) {
		// 如果传入的本身就是一个BaseRuntimeException对象，记录最原始异常对象
		this(cause,mArgs);
		this.mKey = mKey;
		this.sArgs = sArgs;
	}

	public String[] getSArgs() {
		return sArgs;
	}

	public void setSArgs(String[] args) {
		sArgs = args;
	}

	public Throwable getCause() {
		return cause;
	}

	public void setCause(Throwable cause) {
		this.cause = cause;
	}

	public Map getMArgs() {
		return mArgs;
	}

	public void setMArgs(Map args) {
		mArgs = args;
	}

	public String getMKey() {
		return mKey;
	}

	public void setMKey(String key) {
		mKey = key;
	}
}
