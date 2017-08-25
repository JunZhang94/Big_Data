package com.jp.tic.framework.hibernate;

import org.hibernate.cfg.ImprovedNamingStrategy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;

/**
 * <b>function:</b> 当前系统数据库Entity映射默认前缀
 * @author hoojo
 * @createDate 2012-10-31 下午01:30:23
 * @file PrefixedNamingStrategy.java
 * @package com.jp.tic.framework.hibernate
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public class PrefixedNamingStrategy extends ImprovedNamingStrategy {

	private static final long serialVersionUID = 6741560685615255041L;

	private final Logger log = LoggerFactory.getLogger(PrefixedNamingStrategy.class);

	@Value("#{systemConfig['db.table.prefix']}")
	private String tablePrefix = "";

	@Value("#{systemConfig['db.table.suffix']}")
	private String tableSuffix = "";


	@Override
	public String classToTableName(String className) {
		String tableName = tablePrefix + className + tableSuffix;
		log.info("#class# {}, #tableName# {}", className, tableName);
		return tableName;
	}
	
	@Override
	public String tableName(String tableName) {
		String newTableName = tablePrefix + tableName + tableSuffix;
		log.info("#tableName# {}, #newTableName# {}", tableName, newTableName);
		return newTableName;
	}
	
	public void setTableSuffix(String tableSuffix) {
		log.trace("setting table suffix to [{}]", tableSuffix);
		this.tableSuffix = tableSuffix;
	}
	
	public void setTablePrefix(String prefix) {
		log.trace("setting table prefix to [{}]", prefix);
		tablePrefix = prefix;
	}
}
