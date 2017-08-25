package com.jp.tic.business.paas.service.impl;

import java.util.Date;
import java.util.Hashtable;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.paas.dao.LicenseDao;
import com.jp.tic.business.paas.entity.License;
import com.jp.tic.business.paas.service.LicenseService;

@Service
public class LicenseServiceImpl implements LicenseService {
	@Autowired
	private LicenseDao licenseDao;
	
	private Map<String, License> licenses=new Hashtable<String, License>();
	
	@Override
	public boolean isAuthorized(String function, String license) {
		//for test
		if(function!=null){
			return true;
		}
		
		License temp = null;
		if(licenses.containsKey(license)){
			temp=licenses.get(license);
		}
		else{
			licenseDao.parse(license);
		}
		
		//time range
		Date now=new Date();
		if(temp.getStartDate()!=null && temp.getEndDate()!=null){
			if(now.after(temp.getEndDate())||now.before(temp.getStartDate())){
				return false;
			}
		}
		else{
			return false;
		}
		
		//all count
		if(temp.getCount()<=0){
			return false;
		}
		
		//function counts
		if(temp.getFunctionCounts().containsKey(function) && temp.getFunctionCounts().get(function)>0){
			return false;
		}
		
		if(licenseDao.reduceCount(temp, function)==false){
			return false;
		}
		
		return true;
	}

	@Override
	public String register(String code) {
		License license = licenseDao.getLicense(code);
		return licenseDao.formatLicense(license);
	}

}
