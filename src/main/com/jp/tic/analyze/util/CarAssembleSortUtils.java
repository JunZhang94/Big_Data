package com.jp.tic.analyze.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.jp.tic.analyze.entity.CarAssemble;

/**
 * <b>function:</b>
 * 
 * @author hoojo
 * @createDate 2014-5-28 下午05:14:01
 * @file CarAssembleSortUtils.java
 * @package com.jp.tic.analyze.util
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public abstract class CarAssembleSortUtils {

	@SuppressWarnings("unchecked")
	public static Map<String, Object> sortMapByValue(Map<String, CarAssemble> oriMap) {

		Map<String, Object> sortedMap = new LinkedHashMap<String, Object>();
		if (oriMap != null && !oriMap.isEmpty()) {
			List<Map.Entry<String, CarAssemble>> entryList = new ArrayList<Map.Entry<String, CarAssemble>>(oriMap.entrySet());
			Collections.sort(entryList, new Comparator<Map.Entry<String, CarAssemble>>() {
				public int compare(Entry<String, CarAssemble> entry1, Entry<String, CarAssemble> entry2) {
					int value1 = 0, value2 = 0;
					try {
						value1 = entry1.getValue().getNumber();
						value2 = entry2.getValue().getNumber();
					} catch (NumberFormatException e) {
						value1 = 0;
						value2 = 0;
					}
					return value2 - value1;
				}
			});
			Iterator<Map.Entry<String, CarAssemble>> iter = entryList.iterator();
			Map.Entry<String, CarAssemble> tmpEntry = null;
			while (iter.hasNext()) {
				tmpEntry = iter.next();
				sortedMap.put(tmpEntry.getKey(), tmpEntry.getValue());
			}
		}
		return sortedMap;
	}
}
