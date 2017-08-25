package com.jp.tic.utils.db;

import org.apache.commons.dbcp.BasicDataSource;

import com.jp.tic.utils.ConfigInit;
import com.jp.tic.utils.security.BlowfishEncrypt;

/**
 * 用于拦截数据库spring datasource，将配置文件中密文形式的账号密码进行解密
 * @author 梁石光
 * @datetime 2013-05-30
 */
public class SelfDataSource extends BasicDataSource {

	@Override
	public synchronized void setUsername(String username) {
		BlowfishEncrypt.getKey(ConfigInit.getProperties4j("desKey"));
		String user = BlowfishEncrypt.getDesString(username);
		BlowfishEncrypt.getDesString(username);
		super.setUsername(user);
	}

	@Override
	public synchronized void setPassword(String password) {
		BlowfishEncrypt.getKey(ConfigInit.getProperties4j("desKey"));
		String pwd = BlowfishEncrypt.getDesString(password);
		super.setPassword(pwd);
	}
}