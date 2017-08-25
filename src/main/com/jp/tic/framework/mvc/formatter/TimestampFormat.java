package com.jp.tic.framework.mvc.formatter;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * <b>function:</b> 时间戳格式注解
 * @author hoojo
 * @createDate 2012-11-29 下午02:53:06
 * @file TimestampFormat.java
 * @package com.jp.tic.framework.mvc.formatter
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
@Retention(RetentionPolicy.RUNTIME)
@Target( { ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER })
public @interface TimestampFormat {

	String pattern(); //default { "yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd hh:mm:ss" };
}
