package com.jp.tic.utils.db;

import com.alibaba.druid.pool.DruidDataSource;
import com.jp.tic.utils.ConfigInit;
import com.jp.tic.utils.security.BlowfishEncrypt;

/**
 * 用于拦截数据库spring datasource，将配置文件中密文形式的账号密码进行解密
 * @author 梁石光
 * @datetime 2013-05-30
 */
@SuppressWarnings("serial")
public class SelfDataSource4Druid extends DruidDataSource {

	@Override
	public void setUsername(String username) {
		BlowfishEncrypt.getKey(ConfigInit.getProperties4j("desKey"));
		String user = BlowfishEncrypt.getDesString(username);
		super.setUsername(user);
	}

	@Override
	public void setPassword(String password) {
		BlowfishEncrypt.getKey(ConfigInit.getProperties4j("desKey"));
		String pwd = BlowfishEncrypt.getDesString(password);
		super.setPassword(pwd);
	}
}