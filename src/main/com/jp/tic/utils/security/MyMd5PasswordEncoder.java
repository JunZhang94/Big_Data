package com.jp.tic.utils.security;

import org.springframework.dao.DataAccessException;
import org.springframework.security.providers.encoding.PasswordEncoder;

/**
 * 自定义加密
 * @author 梁石光
 * @datetime 2013-05-30
 */
public class MyMd5PasswordEncoder implements PasswordEncoder {

    @Override
    public String encodePassword(String rawPass, Object salt) throws DataAccessException {
        String salted = MD5Tool.MD5Encrypt(rawPass) + "{" + salt.toString() + "}";
        return MD5Tool.MD5Encrypt(salted);
    }

    @Override
    public boolean isPasswordValid(String encPass, String rawPass, Object salt) throws DataAccessException {
        if (encPass.equals(encodePassword(rawPass, salt))) {
            return true;
        }
        return false;
    }
}
