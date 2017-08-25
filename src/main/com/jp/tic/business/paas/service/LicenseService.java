package com.jp.tic.business.paas.service;


public interface LicenseService {
	public String register(String code);
	public boolean isAuthorized(String function, String license);
}
