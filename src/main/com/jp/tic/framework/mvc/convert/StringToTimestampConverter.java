package com.jp.tic.framework.mvc.convert;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.apache.commons.lang.StringUtils;
import org.springframework.core.convert.converter.Converter;

import com.jp.tic.framework.log.ApplicationLogging;

/**
 * <b>function:</b> Spring MVC 字符串到时间戳类型转换器
 * @author hoojo
 * @createDate 2012-11-29 下午12:12:56
 * @file StringToTimestampConverter.java
 * @package com.jp.tic.framework.interceptor
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public class StringToTimestampConverter extends ApplicationLogging implements Converter<String, Timestamp> {

	private final static String REGEX = "\\d{4}-\\d{1,2}-\\d{1,2} \\d{1,2}:\\d{1,2}:\\d{1,2}";
	private final static String REGEX_DATE = "\\d{4}-\\d{1,2}-\\d{1,2}";
	private final static String REGEX_TIME = "\\d{4}:\\d{1,2}:\\d{1,2}";
	
	private String pattern = "yyyy-MM-dd hh:mm:ss";
	private String patternDate = "yyyy-MM-dd";
	private String patternTime = "hh:mm:ss";
	private DateFormat df;
	
	public Timestamp convert(String target) {
		if (StringUtils.isNotEmpty(target)) {
			if (target.matches(REGEX)) {
				df = new SimpleDateFormat(pattern); 
			} else if (target.matches(REGEX_DATE)) {
				df = new SimpleDateFormat(patternDate); 
			} else if (target.matches(REGEX_TIME)) {
				df = new SimpleDateFormat(patternTime); 
			} else {
				error("string target {} convert Timestamp formater error: {}", target);
			}
			try {
				return new Timestamp(df.parse(target).getTime());
			} catch (ParseException e) {
				error("string target {} convert Timestamp error: {}", target, e);
				return null;
			}
		}
		return null;
	}

	public void setPattern(String pattern) {
		this.pattern = pattern;
	}

	public void setPatternDate(String patternDate) {
		this.patternDate = patternDate;
	}

	public void setPatternTime(String patternTime) {
		this.patternTime = patternTime;
	}
}
