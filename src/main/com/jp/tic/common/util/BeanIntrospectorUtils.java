package com.jp.tic.common.util;

import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.BeanWrapper;
import org.springframework.beans.MutablePropertyValues;
import org.springframework.beans.PropertyAccessorFactory;
import org.springframework.core.convert.ConversionService;
import org.springframework.validation.DataBinder;

/**
 * <b>function:</b> JavaObject<-->Map转换工具类
 * @author hoojo
 * @createDate 2012-2-9 下午05:47:54
 * @file BeanIntrospectorUtils.java
 * @package com.jp.tic.common.util
 * @project SHMB
 * @version 1.0
 */
public abstract class BeanIntrospectorUtils {

	/**
	 * <b>function:</b> 将一个JavaObject转换成一个Map对象
	 * @author hoojo
	 * @createDate 2012-2-9 下午05:47:54
	 * @param obj 将要转换的对象
	 * @return Map
	 */
	public static Map<String, Object> desc(Object obj) {

		BeanWrapper wrapper = PropertyAccessorFactory.forBeanPropertyAccess(obj);

		PropertyDescriptor[] pds = wrapper.getPropertyDescriptors();
		HashMap<String, Object> ps = new HashMap<String, Object>();

		for (PropertyDescriptor pd : pds) {

			Method readMethod = pd.getReadMethod();
			if (readMethod == null || pd.getName().equals("class")) {
				continue;
			}
			try {
				ps.put(pd.getName(), readMethod.invoke(obj));
			} catch (IllegalArgumentException e) {
				// noop
			} catch (IllegalAccessException e) {
				// noop
			} catch (InvocationTargetException e) {
				// noop
			}
		}
		return ps;
	}
	
	/**
	 * <b>function:</b> 将Map对象的值绑定到指定的Entity中
	 * @author hoojo
	 * @createDate 2012-2-10 下午12:42:06
	 * @param <T>
	 * @param conversionService ConversionService；
	 * 注入即可，@Inject private ConversionService conversionService;
	 * @param entityMap 被绑定Map对象
	 * @param entity 绑定的对象
	 * @return 绑定值的对象
	 */
	public static <T> T asc(ConversionService conversionService, Map<String, ? extends Object> entityMap, T entity) {
		DataBinder db = new DataBinder(entity);
		db.setConversionService(conversionService);
		db.bind(new MutablePropertyValues(entityMap));
		return entity;
	}
}
