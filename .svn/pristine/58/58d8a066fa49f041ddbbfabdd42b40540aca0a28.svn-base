package com.jp.tic.business.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import com.jp.tic.utils.lang.DateUtil;

public class SolrSQLUtils {
	
	public static String DateFomatterAndFinishSQL(Map<String, String> searchParam,StringBuffer sb){
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
		Date startDate = DateUtil.parseToDate(searchParam.get("startTime"), "yyyy-MM-dd HH:mm:ss");
		Date endDate = DateUtil.parseToDate(searchParam.get("endTime"), "yyyy-MM-dd HH:mm:ss");
        String startTime = format.format(startDate);
        String endTime = format.format(endDate);
        sb.append("jgsj:[" + startTime + " TO " + endTime + "] AND ");
        
        String str=sb.toString();
		if(str.lastIndexOf("AND")>str.lastIndexOf(":")){
			str=str.substring(0, str.lastIndexOf("AND"));
		}
        return str;
	}
}
