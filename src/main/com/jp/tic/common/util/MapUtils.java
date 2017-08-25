package com.jp.tic.common.util;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringUtils;

import com.google.common.base.Predicate;
import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;


/**
 * <b>function:</b> Map工具类
 * @author hoojo
 * @createDate 2012-2-10 上午10:08:14
 * @file MapUtils.java
 * @package com.jp.tic.common.util
 * @project SHMB
 * @version 1.0
 */
public abstract class MapUtils {

	/**
	 * <b>function:</b> 检查Map的空值，剔除存在空值的key-value
	 * @author hoojo
	 * @createDate 2012-2-10 上午10:12:37
	 * @param params
	 * @return
	 */
	@SuppressWarnings({ "unused", "unchecked" })
	public static Map<String, Object> checkMapValue(Map<String, Object> params) {

		if (params == null) {
			return Collections.emptyMap();
		}
		
		Map<String, Object> newParams = new HashMap<String, Object>();

		for (String key : params.keySet()) {

			Object o = params.get(key);
			if (o == null) {
				// skip
			} else if (String.class.isInstance(o)) {
				if (StringUtils.isBlank((String) o)) {
					// skip
				} else {
					newParams.put(key, StringUtils.trim((String) o));
				}
			} else if (o.getClass().isArray()) {

				if (o.getClass().getComponentType().isPrimitive()) {
					newParams.put(key, o);
				} else {
					Object[] newObjectArray = ArrayUtils.removeElement((Object[]) o, null);

					if (newObjectArray.length > 0) {
						newParams.put(key, newObjectArray);
					}
				}
			} else if (Iterable.class.isInstance(o)) {
				
				List<Object> list = Lists.newArrayList(Iterables.filter((Iterable<Object>) o, new Predicate<Object>() {
					public boolean apply(Object input) {
						return input != null;
					}
				}));
				if (list.size() > 0) {
					newParams.put(key, list);
				}
			} else {
				newParams.put(key, o);
			}
		}
		return newParams;
	}
	
	/**
	 * <b>function:</b> 将一个JavaObject、JavaEntity转换成Map对象
	 * @author hoojo
	 * @createDate 2012-2-10 上午10:16:42
	 * @param object JavaObject、JavaEntity
	 * @return 返回转换后的Map对象
	 */
	public static Map<String, ?> toMap(Object object) {
		return BeanIntrospectorUtils.desc(object);
	}
}
