package com.jp.tic.framework.cxfws.adapter;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import javax.xml.bind.annotation.adapters.XmlAdapter;

/**
 * <b>function:</b> Timestamp 时间戳转换器 Adapter
 * @author hoojo
 * @createDate 2012-4-13 上午10:00:48
 * @file TimestampAdapter.java
 * @package com.jp.tic.framework.cxfws.adapter
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
@SuppressWarnings( { "static-access", "deprecation" })
public class TimestampAdapter extends XmlAdapter<String, Timestamp> {
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	public String marshal(Timestamp v) {
		if (v != null) {
			return sdf.format(new Date(v.getTime()));
		}
		return "";
	}

	public Timestamp unmarshal(String v) {
		if (v != null) {
			try {
				return new Timestamp(sdf.parse(v).getTime());
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		return null;
	}
}
