package com.jp.tic.framework.mvc.formatter;

import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.context.EmbeddedValueResolverAware;
import org.springframework.format.AnnotationFormatterFactory;
import org.springframework.format.Parser;
import org.springframework.format.Printer;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.util.StringUtils;
import org.springframework.util.StringValueResolver;

import com.jp.tic.framework.log.ApplicationLogging;

public class SimpleDateTimeFormatAnnotationFormatterFactory extends ApplicationLogging implements AnnotationFormatterFactory<DateTimeFormat>, EmbeddedValueResolverAware {

	private String defaultPattern = "yyyy-MM-dd hh:mm:ss";
	private StringValueResolver embeddedValueResolver;
	private final Set<Class<?>> fieldTypes;

	public SimpleDateTimeFormatAnnotationFormatterFactory() {

		Set<Class<?>> types = new HashSet<Class<?>>();
		types.add(Date.class);
		fieldTypes = Collections.unmodifiableSet(types);
	}

	public Set<Class<?>> getFieldTypes() {
		return fieldTypes;
	}

	public Parser<?> getParser(DateTimeFormat dateTimeFormat, Class<?> clz) {
		if (StringUtils.hasText(dateTimeFormat.pattern())) {
			return new DateFormatter(resolveEmbeddedValue(dateTimeFormat.pattern()));
		} else {
			return new DateFormatter(defaultPattern);
		}

	}

	public Printer<?> getPrinter(DateTimeFormat dateTimeFormat, Class<?> clz) {
		if (StringUtils.hasText(dateTimeFormat.pattern())) {
			return new DateFormatter(resolveEmbeddedValue(dateTimeFormat.pattern()));
		} else {
			return new DateFormatter(defaultPattern);
		}
	}

	public void setEmbeddedValueResolver(StringValueResolver embeddedValueResolver) {
		this.embeddedValueResolver = embeddedValueResolver;
	}

	protected String resolveEmbeddedValue(String value) {
		return embeddedValueResolver != null ? embeddedValueResolver.resolveStringValue(value) : value;
	}
}
