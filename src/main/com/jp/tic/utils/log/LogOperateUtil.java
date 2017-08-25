package com.jp.tic.utils.log;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jp.tic.utils.exception.BaseRuntimeException;



/**
 * 日志操作类
 * @author 梁石光
 * @datetime 2013-05-30
 */
public class LogOperateUtil {
	private static Logger log = LoggerFactory.getLogger(LogOperateUtil.class);

	/**
	 * 获取执行路径
	 * 
	 * @return
	 */
	public static String logCallStack() {
		StackTraceElement[] ste = new Throwable().getStackTrace();
		StringBuffer CallStack = new StringBuffer();
		for (int i = 1; i < ste.length; i++) {
			if (ste[i].toString().startsWith("com.yuhui.qos.util.log.LogOperateUtil"))
				continue;
			if (!ste[i].toString().startsWith("com.yuhui.qos"))
				break;
			CallStack.append(ste[i].toString() + " | ");
		}
		ste = null;
		return CallStack.toString();
	}

	/**
	 * 日志记录SQL执行前的信息
	 */
	public static String logSQLBefore(String sql, String sMd5) {
		String path = logCallStack().toString();
		log.info(sMd5 + "执行路径：" + path);
		log.info(sMd5 + "执行脚本：" + sql);
		return path;
	}

	/**
	 * 日志记录SQL执行后的信息
	 */
	public static Long logSQLAfter(String sql, String sMd5, long timeBefore) {
		long timeDiff = System.currentTimeMillis() - timeBefore;
		String timeDiffResult = timeDiff < 1000 ? timeDiff + "毫秒!" : (timeDiff / 1000) + "秒钟!";
		log.info(sMd5 + "执行时间：" + timeDiffResult + "\n");
		return timeDiff;
	}

	/**
	 * 处理SQL异常信息，日志记录、打印、抛异常
	 */
	public static BaseRuntimeException logSQLError(Exception e, String sql, String path) {
		e.printStackTrace();
		Map<String, String> m = new HashMap<String, String>();
		m.put("sSql", sql);
		m.put("sPath", path);
		throw new BaseRuntimeException(e, m);
	}
}
