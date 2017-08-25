package com.jp.tic.framework.mvc.formatter;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.format.AnnotationFormatterFactory;
import org.springframework.format.Parser;
import org.springframework.format.Printer;

import com.jp.tic.framework.log.ApplicationLogging;

/**
 * <b>function:</b> 时间戳日期格式对象工程
 * @author hoojo
 * @createDate 2012-11-29 下午02:53:41
 * @file TimestampFormatterFactory.java
 * @package com.jp.tic.framework.mvc.formatter
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public class TimestampFormatterFactory extends ApplicationLogging implements AnnotationFormatterFactory<TimestampFormat> {

	private final Set<Class<?>> fieldTypes;

	public TimestampFormatterFactory() {
		Set<Class<?>> types = new HashSet<Class<?>>();
		types.add(Timestamp.class);
		fieldTypes = Collections.unmodifiableSet(types);
	}

	public Set<Class<?>> getFieldTypes() {
		return fieldTypes;
	}

	public Parser<?> getParser(TimestampFormat format, Class<?> clazz) {
		return new TimestampFormatter(format.pattern());
	}

	public Printer<?> getPrinter(TimestampFormat format, Class<?> clazz) {
		return new TimestampFormatter(format.pattern());
	}
}
