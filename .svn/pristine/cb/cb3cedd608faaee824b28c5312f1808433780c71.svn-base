package com.jp.tic.framework.mvc.formatter;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Locale;
import java.util.TimeZone;

import org.springframework.format.Formatter;

/**
 * <b>function:</b> 将时间戳日期格式成字符串
 * @author hoojo
 * @createDate 2012-11-29 下午02:03:37
 * @file TimestampFormatter.java
 * @package com.jp.tic.framework.mvc.formatter
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public class TimestampFormatter implements Formatter<Timestamp> {

	private String pattern;
	private int style = 2;
	private TimeZone timeZone;
	private boolean lenient = false;

	public TimestampFormatter() {
	}

	public TimestampFormatter(String pattern) {
		this.pattern = pattern;
	}

	public void setPattern(String pattern) {
		this.pattern = pattern;
	}

	public void setStyle(int style) {
		this.style = style;
	}

	public void setTimeZone(TimeZone timeZone) {
		this.timeZone = timeZone;
	}

	public void setLenient(boolean lenient) {
		this.lenient = lenient;
	}

	public String print(Timestamp timestamp, Locale locale) {

		// return this.getDateFormat(locale).format(new Date(timestamp.getTime()));
		return this.getDateFormat(locale).format(timestamp);
	}

	public Timestamp parse(String source, Locale locale) throws ParseException {
		return new Timestamp(this.getDateFormat(locale).parse(source).getTime());
	}

	/**
	 * <b>function:</b> 返回指定的时间转换格式
	 * @author hoojo
	 * @createDate 2012-11-29 下午02:14:29
	 * @param locale Locale
	 * @return DateFormat
	 */
	protected DateFormat getDateFormat(Locale locale) {
		DateFormat dateFormat;
		if (this.pattern != null) {
			dateFormat = new SimpleDateFormat(this.pattern, locale);
		} else {
			dateFormat = DateFormat.getDateInstance(this.style, locale);
		}
		if (this.timeZone != null) {
			dateFormat.setTimeZone(this.timeZone);
		}
		dateFormat.setLenient(this.lenient);
		return dateFormat;
	}
}
