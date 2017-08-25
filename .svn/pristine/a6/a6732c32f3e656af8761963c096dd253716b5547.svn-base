package com.jp.tic.framework.log;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * <b>function:</b> 系统调试、操作、错误日志基类
 * @author hoojo
 * @createDate 2012-2-9 上午11:46:30
 * @file ApplicationLogging.java
 * @package com.jp.tic.framework.global
 * @project SHMB
 * @version 1.0
 */
public abstract class ApplicationLogging {

	protected final Logger log;

	public ApplicationLogging() {
		super();
		log = LoggerFactory.getLogger(this.getClass());
	}

	protected final void debug(Object o) {

		log.debug(String.valueOf(o));
	}

	protected final void debug(String msg) {

		log.debug(msg);
	}

	protected final void debug(String msg, Object... objects) {

		log.debug(msg, objects);
	}

	protected final void debug(Throwable ex) {

		log.debug(ex.getMessage(), ex);
		Throwable re = ExceptionUtils.getRootCause(ex);
		if (re != null && ex != re) {
			log.debug("root cause", re);
		}

	}

	protected final void error(String msg) {

		log.error(msg);
	}

	protected final void error(String msg, Object... objects) {

		log.error(msg, objects);
	}

	protected final void error(Throwable ex) {

		log.error(ex.getMessage(), ex);
		Throwable re = ExceptionUtils.getRootCause(ex);
		if (re != null && ex != re) {
			log.error("root cause", re);
		}
	}

	protected final void info(String msg) {

		log.info(msg);
	}

	protected final void info(String msg, Object... objects) {

		log.info(msg, objects);
	}

	protected final void info(Throwable ex) {

		log.info(ex.getMessage(), ex);
		Throwable re = ExceptionUtils.getRootCause(ex);
		if (re != null && ex != re) {
			log.info("root cause", re);
		}
	}

	protected final void trace(Object o) {

		log.trace(String.valueOf(o));
	}

	protected final void trace(String msg) {

		log.trace(msg);
	}

	protected final void trace(String msg, Object... objects) {

		log.trace(msg, objects);
	}

	protected final void trace(Throwable ex) {

		log.trace(ex.getMessage(), ex);
		Throwable re = ExceptionUtils.getRootCause(ex);
		if (re != null && ex != re) {
			log.trace("root cause", re);
		}
	}

	protected final void warn(String msg) {

		log.warn(msg);
	}

	protected final void warn(String msg, Object... objects) {

		log.warn(msg, objects);
	}

	protected final void warn(Throwable ex) {

		log.warn(ex.getMessage(), ex);
		Throwable re = ExceptionUtils.getRootCause(ex);
		if (re != null && ex != re) {
			log.warn("root cause", re);
		}
	}
}