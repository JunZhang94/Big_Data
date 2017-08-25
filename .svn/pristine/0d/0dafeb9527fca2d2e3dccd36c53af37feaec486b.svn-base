package com.jp.tic.framework.exception;


/**
 * <b>function:</b> 自定义异常
 * 
 * @author hoojo
 * @createDate 2013-4-25 上午11:17:52
 * @file RootException.java
 * @package com.jp.tic.framework.exception
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public class RootException extends Exception {

	private static final long serialVersionUID = 427689987731226066L;

	protected final String id = getClass().getSimpleName().toUpperCase();

	public String getId() {
		return id;
	}

	public RootException() {
		super();
	}

	public RootException(String message) {
		super(message);
	}

	public RootException(String message, Throwable cause) {
		super(message, cause);
	}

	public RootException(Throwable cause) {
		super(cause);
	}
}
