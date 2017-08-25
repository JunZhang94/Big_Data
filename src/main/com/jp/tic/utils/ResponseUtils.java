package com.jp.tic.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ResponseUtils {

	public static <T> Map<String, Object> sendList(List<T> T,int amounts) {  
	    Map<String, Object> map = new HashMap<String, Object>();  
	    map.put("result", T);  
	    map.put("totalCount", amounts);  
	    map.put("success", true);  
	    return map;  
	}  

}
