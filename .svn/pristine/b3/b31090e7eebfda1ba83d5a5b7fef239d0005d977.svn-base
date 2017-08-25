package com.jp.tic.framework.mvc.convert;

import java.sql.Timestamp;
import java.util.Date;

import org.springframework.core.convert.converter.Converter;

import com.jp.tic.framework.log.ApplicationLogging;


/**
 * <b>function:</b> Date 日期类型转换为时间戳类型
 * @author hoojo
 * @createDate 2013-7-15 下午12:13:12
 * @file DateToTimestampConverter.java
 * @package com.jp.tic.framework.mvc.convert
 * @project JTZHJK-Server
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public class DateToTimestampConverter extends ApplicationLogging implements Converter<Date, Timestamp> {

	@Override
	public Timestamp convert(Date date) {
		if (date != null) {
			return new Timestamp(date.getTime());
		}
		return null;
	}

}
