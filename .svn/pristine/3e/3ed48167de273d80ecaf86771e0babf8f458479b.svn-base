package com.jp.tic.common.util;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.commons.codec.EncoderException;
import org.apache.commons.codec.net.URLCodec;
import org.apache.commons.lang.ObjectUtils;

/**
 * <b>function:</b> 将两个Map对象的值拼接成一个URL查询参数
 * @author hoojo
 * @createDate 2012-2-10 下午01:55:00
 * @file ViewUrlUtils.java
 * @package com.jp.tic.common.util
 * @project SHMB
 * @version 1.0
 */
public class ViewUrlUtils {

	@SuppressWarnings("unused")
	private static URLCodec codec = new URLCodec("utf-8");

	public static String makeQueryString(Map<String, ? extends Object> m1, Map<String, ? extends Object> m2) throws EncoderException {

		StringBuilder sb = new StringBuilder();

		Map<String, Object> m = new HashMap<String, Object>();
		if (m1 != null)
			m.putAll(m1);
		if (m2 != null)
			m.putAll(m2);

		Set<Entry<String, Object>> es = m.entrySet();

		for (Entry<String, Object> entry : es) {

			if (sb.length() > 0)
				sb.append('&');

			sb.append(codec.encode(entry.getKey())).append('=').append(codec.encode(ObjectUtils.toString(entry.getValue(), "")));
			//sb.append(entry.getKey()).append('=').append(ObjectUtils.toString(entry.getValue(), ""));
		}
		return sb.toString();
	}
}
