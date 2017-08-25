package com.jp.tic.utils.lang;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.apache.commons.beanutils.BeanUtils;

public class MapToBean {

	private static List<Method> setMethods;
	private static List<String> Fields;
	
	/**
	 * @param m
	 * @param o； bean 里的属性必须全都是String类型
	 */
	public static void mapToBean(Map m, Object o) {
		if (setMethods == null) {
			// 保存对应关系
			setMethods = new ArrayList<Method>();
			Fields = new ArrayList<String>();

			// 获取所有方法
			java.lang.reflect.Method[] ms = o.getClass().getMethods();

			for (Method method : ms) {
				// 过滤所有set方法
				String methodName = method.getName();
				if (methodName.startsWith("set")) {
					// 根据set方法获取属性名称
					StringBuffer fieldName = new StringBuffer(methodName.substring(3));
					Object value = m.get(fieldName);
					if (value == null) {
						char ch = fieldName.charAt(0);
						// 转换第一个字符的大小写
						ch = (char) (ch >= 'A' && ch <= 'Z' ? ch + 32 : ch - 32);
						fieldName.setCharAt(0, ch);
						value = m.get(fieldName.toString());
						
						if (value == null) {
							value = m.get(fieldName.toString().toUpperCase());
						}
					}
					if (value != null) {
						try {
							// 保存对应关系
							setMethods.add(method);
							Fields.add(fieldName.toString());
							method.invoke(o, new Object[] { value.toString() });
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}
		} else {
			// 直接从缓存取
			for (int i = 0; i < setMethods.size(); i++) {
				Method mt = setMethods.get(i);
				String fieldName = Fields.get(i);
				Object value = m.get(fieldName);
				if (value == null)
					value = m.get(fieldName.toUpperCase());
				if (value != null) {
					try {
						mt.invoke(o, new Object[] { value.toString() });
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
	}
	
	public static void mapToObj(Object obj, Map map) throws IllegalAccessException, InvocationTargetException {
		BeanUtils.populate(obj, map);
	}

	public static void main(String[] args) throws IllegalAccessException, InvocationTargetException {

	}
}