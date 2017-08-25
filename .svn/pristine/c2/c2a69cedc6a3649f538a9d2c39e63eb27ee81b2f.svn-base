package com.jp.tic.framework.hibernate;

import java.io.Serializable;
import java.util.Properties;
import java.util.UUID;

import org.hibernate.HibernateException;
import org.hibernate.engine.SessionImplementor;
import org.hibernate.id.Configurable;
import org.hibernate.id.IdentifierGenerator;
import org.hibernate.id.UUIDHexGenerator;
import org.hibernate.type.StringType;

import com.jp.tic.framework.log.ApplicationLogging;

/**
 * <b>function:</b> hibernate Entity主键uuid 生成器
 * @author hoojo
 * @createDate 2012-10-31 下午01:53:21
 * @file UuidGenerator.java
 * @package com.jp.tic.framework.hibernate
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public class UuidGenerator extends ApplicationLogging implements IdentifierGenerator {

	public Serializable generate(SessionImplementor session, Object target) throws HibernateException {
		return UUID.randomUUID().toString().replace("-", "");
	}

	public static void main(String[] args) {
		System.out.println(UUID.fromString(UUID.randomUUID().toString()));
		System.out.println(UUID.randomUUID());
		System.out.println(UUID.nameUUIDFromBytes(String.valueOf(System.currentTimeMillis()).getBytes()));

		Properties props = new Properties();
		props.setProperty("separator", "#");
		IdentifierGenerator gen = new UUIDHexGenerator();
		((Configurable) gen).configure(StringType.INSTANCE, props, null);
		IdentifierGenerator gen2 = new UUIDHexGenerator();
		((Configurable) gen2).configure(StringType.INSTANCE, props, null);

		for (int i = 0; i < 5; ++i) {
			String id = (String) gen.generate(null, null);
			System.out.println(id);
			String id2 = (String) gen2.generate(null, null);
			System.out.println(id2);
		}
	}
}
