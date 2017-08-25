package com.jp.tic.analyze.service;

import java.util.List;
import java.util.Map;

/** 
 * RegionCrashService.java Create on 2016-10-12 上午11:06:04      
 * Copyright (c) 2016-10-12 by jinpeng         
 * @author lsg     
 * @version 1.0 
 */
public interface RegionCrashService {

	public List<Map<String, String>> regionCrashQuery(String jsonParam) throws Exception;
}
