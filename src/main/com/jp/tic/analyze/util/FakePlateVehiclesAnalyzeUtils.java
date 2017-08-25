package com.jp.tic.analyze.util;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import org.apache.commons.collections.MapUtils;

import com.jp.tic.common.util.VelocityUtils;


/**
 * <b>function:</b> 区间测速分析、套牌车分析工具类
 * @author hoojo
 * @createDate 2014-5-24 下午05:22:29
 * @file FakePlateVehiclesAnalyzeUtils.java
 * @package com.jp.tic.analyze.util
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public abstract class FakePlateVehiclesAnalyzeUtils {
	
	private static final SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	public static Map<String, List<Map<String, Object>>> transformMap(Map<String, List<Map<String, Object>>> data) throws Exception {
		Map<String, List<Map<String, Object>>> result = new HashMap<String, List<Map<String,Object>>>();
		if (data != null) {
			
			Set<Entry<String, List<Map<String, Object>>>> set = data.entrySet();
			Iterator<Entry<String, List<Map<String, Object>>>> iter = set.iterator();
			while (iter.hasNext()) {
				Entry<String, List<Map<String, Object>>> entry = iter.next();
				String hphm = entry.getKey();
				List<Map<String, Object>> items = entry.getValue();
				
				for (int i = 0, len = items.size(); i < len; i++) {
					for (int j = 0; j < len; j++) {
						Map<String, Object> v1 = items.get(i);
						Map<String, Object> v2 = items.get(j);
						if (!v1.equals(v2)) {
							v1.put("kkwd2", MapUtils.getDouble(v2, "kkwd"));
							v1.put("kkjd2", MapUtils.getDouble(v2, "kkjd"));
							v1.put("jgsj2", MapUtils.getString(v2, "jgsj"));
						}
						if (result.containsKey(hphm)) {
							List<Map<String, Object>> list = result.get(hphm);
							list.add(v1);
							result.put(hphm, list);
						} else {
							List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
							list.add(v1);
							result.put(hphm, list);
						}
					}
				}
				
			}
		}
		
		return result;
	}
	
	public static Map<String, List<Map<String, Object>>> analyzeSpeed(Map<String, List<Map<String, Object>>> map) throws Exception {
		Map<String, List<Map<String, Object>>> result = new HashMap<String, List<Map<String,Object>>>();
		
		if (map != null) {
			Set<Entry<String, List<Map<String, Object>>>> set = map.entrySet();
			Iterator<Entry<String, List<Map<String, Object>>>> iter = set.iterator();
			
			while (iter.hasNext()) {
				Entry<String, List<Map<String, Object>>> entry = iter.next();
				List<Map<String, Object>> items = new ArrayList<Map<String,Object>>();
				
				List<Map<String, Object>> list = entry.getValue();
				
				for (Map<String, Object> item : list) {
					Double kkjd = MapUtils.getDouble(item, "kkwd"), kkwd = MapUtils.getDouble(item, "kkjd");
					Double kkjd2 = MapUtils.getDouble(item, "kkwd2"), kkwd2 = MapUtils.getDouble(item, "kkjd2");
					
					if (kkjd != null && kkwd != null && kkjd2 != null && kkwd2 != null) {
						double distance = VelocityUtils.getDistance(kkwd, kkjd, kkwd2, kkjd2);
						
						double speed = VelocityUtils.getVelocity(
								formatter.parse(MapUtils.getString(item, "jgsj")), 
								formatter.parse(MapUtils.getString(item, "jgsj2")), distance);
						item.put("speed", speed);
						if (speed > 200) {
							items.add(item);
						}
					}
				}
				if (!items.isEmpty()) {
					result.put(entry.getKey(), items);
				}
			}
		}
		return result;
	}

}
