/**
 * @Copyright (C) 2013 广州金鹏集团有限公司.
 * 本系统是商用软件,未经授权擅自复制或传播本程序的部分或全部将是非法的.
 * @文件名称:JsonUtil.java
 * @描述:Json解析辅助类
 * @创建人:王晓东
 * @创建时间:2013-8-7下午01:33:05
 * @版本: V1.0
 */
package com.jp.tic.utils.jsonUtil;

import java.lang.reflect.Method;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.JSONUtils;

import org.apache.log4j.Logger;

import com.jp.tic.utils.jsonUtil.processor.JsonDateValueProcessor;
import com.jp.tic.utils.jsonUtil.processor.JsonDateValueProcessorForSIP;
import com.jp.tic.utils.jsonUtil.processor.TimestampMorpher;

/**
 * @类功能说明:Json解析辅助类
 * @创建人:王晓东
 * @创建时间: 2013-8-7下午01:33:05
 */
@SuppressWarnings( { "deprecation", "unchecked" })
public class JsonUtil {
	private static Logger logger = Logger.getLogger(JsonUtil.class);

	// static {
	// logger.setJpJDBCByLvLog();
	// }
	/**
	 * @方法功能说明:设定日期转换格式
	 * @创建人:王晓东
	 * @创建时间: 2013-8-7下午04:17:01
	 * @参数:
	 * @返回类型:void
	 * @异常类型
	 */
	private static void setDataFormatToObject() {
		String[] formats = { "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd" };
		JSONUtils.getMorpherRegistry()
				.registerMorpher(new DateMorpher(formats));
		JSONUtils.getMorpherRegistry().registerMorpher(
				new TimestampMorpher(formats));

	}

	/**
	 * @方法功能说明:从一个JSON 对象字符格式中得到一个java对象，形如： {"id" : idValue, "name" :
	 *                 nameValue, "aBean" : {"aBeanId" : aBeanIdValue, ...}}
	 * @创建人:王晓东
	 * @创建时间: 2013-8-7下午02:02:05
	 * @参数:@param jsonString json字符串
	 * @参数:@param clazz 要转换的目标对象类型
	 * @参数:@return
	 * @返回类型:Object
	 * @异常类型
	 */
	public static Object jsonToObject(String jsonString, Class clazz) {
		// JsonConfig jsonConfig = new JsonConfig();
		// jsonConfig.registerJsonBeanProcessor(Timestamp.class,
		// new JsonDateBeanProcessor());
		// jsonConfig.registerJsonBeanProcessor(Date.class,
		// new JsonDateBeanProcessor());
		Object obj = null;
		try {
			setDataFormatToObject();
			JSONObject jsonObject = JSONObject.fromObject(jsonString);
			obj = JSONObject.toBean(jsonObject, clazz);
		} catch (Exception e) {
			// e.printStackTrace();
			logger.error("转换失败：" + e);
		}
		return obj;
	}

	/**
	 * @方法功能说明:从一个JSON 对象字符格式中得到一个java对象，其中beansList是一类的集合，形如： {"id" : idValue,
	 *                 "name" : nameValue, "aBean" : {"aBeanId" : aBeanIdValue,
	 *                 ...}, beansList:[{},{},...]}
	 * @创建人:王晓东
	 * @创建时间: 2013-8-7下午03:03:22
	 * @参数:@param jsonString json字符串
	 * @参数:@param clazz 要转换的目标对象类型
	 * @参数:@param map 集合属性的类型 (key : 集合属性名, value : 集合属性类型class) eg:
	 *            ("beansList" : Bean.class)
	 * @参数:@return
	 * @返回类型:Object 传入的对象类型，如果转换失败（如非json或传入的clazz不匹配），返回空
	 * @异常类型
	 */
	public static Object jsonToObject(String jsonString, Class clazz, Map map) {

		// JsonConfig jsonConfig = new JsonConfig();
		// jsonConfig.registerJsonBeanProcessor(Timestamp.class,
		// new JsonDateBeanProcessor());
		// jsonConfig.registerJsonBeanProcessor(Date.class,
		// new JsonDateBeanProcessor());
		Object obj = null;
		try {
			setDataFormatToObject();
			JSONObject jsonObject = JSONObject.fromObject(jsonString);
			obj = JSONObject.toBean(jsonObject, clazz, map);
		} catch (Exception e) {
			// e.printStackTrace();
			logger.error("转换失败：" + e);
		}
		return obj;
	}

	/**
	 * @方法功能说明: 从json数组中得到相应java数组 json，多用于字符串数组类型的json转换，形如：["123", "456"]
	 * @创建人:王晓东
	 * @创建时间: 2013-8-7下午04:28:24
	 * @参数:@param jsonString json字符串
	 * @参数:@return
	 * @返回类型:Object[] 传入的对象类型的数组，如果转换失败（如非json或传入的clazz不匹配），返回空
	 * @异常类型
	 */
	public static Object[] jsonToArray(String jsonString) {
		try {
			JSONArray jsonArray = JSONArray.fromObject(jsonString);
			return jsonArray.toArray();
		} catch (Exception e) {
			// e.printStackTrace();
			logger.error("转换失败：" + e);
		}
		return null;
	}

	/**
	 * @方法功能说明:从一个JSON数组得到一个java对象数组，形如： [{"id" : idValue, "name" : nameValue},
	 *                                   {"id" : idValue, "name" : nameValue},
	 *                                   ...]
	 * @创建人:王晓东
	 * @创建时间: 2013-8-7下午03:06:48
	 * @参数:@param jsonString json字符串
	 * @参数:@param clazz 要转换的目标对象类型
	 * @参数:@return
	 * @返回类型:Object[] 对象数组，如果转换失败（如非json或传入的clazz不匹配），返回空
	 * @异常类型
	 */
	public static Object[] jsonToArray(String jsonString, Class clazz) {
		return jsonToArray(jsonString, clazz, null);
	}

	/**
	 * @方法功能说明:从一个JSON数组得到一个java对象数组，形如： [{"id" : idValue, "name" : nameValue},
	 *                                   {"id" : idValue, "name" : nameValue},
	 *                                   ...]
	 * @创建人:王晓东
	 * @创建时间: 2013-8-7下午03:06:48
	 * @参数:@param jsonString json字符串
	 * @参数:@param clazz 要转换的目标对象类型
	 * @参数:@param map 集合属性的类型
	 * @参数:@return
	 * @返回类型:Object[] 对象数组，如果转换失败（如非json或传入的clazz不匹配），返回空
	 * @异常类型
	 */
	public static Object[] jsonToArray(String jsonString, Class clazz, Map map) {
		Object[] obj = null;
		try {
			setDataFormatToObject();
			JSONArray jsonArray = JSONArray.fromObject(jsonString);
			obj = new Object[jsonArray.size()];
			for (int i = 0; i < jsonArray.size(); i++) {
				JSONObject jsonObject = jsonArray.getJSONObject(i);
				if (map == null) {
					obj[i] = JSONObject.toBean(jsonObject, clazz);
				} else {
					obj[i] = JSONObject.toBean(jsonObject, clazz, map);
				}
			}
		} catch (Exception e) {
			// e.printStackTrace();
			logger.error("转换失败：" + e);
		}
		return obj;
	}

	/**
	 * @方法功能说明:从一个JSON数组得到一个String集合，多用于字符串数组类型的json转换，形如：['aaa','bbb','ccc']。
	 * @创建人:王晓东
	 * @创建时间: 2013-8-29下午03:55:01
	 * @参数:@param jsonString
	 * @参数:@return
	 * @返回类型:List
	 * @异常类型
	 */

	public static List jsonToList(String jsonString) {
		List list = null;
		try {
			setDataFormatToObject();
			JSONArray jsonArray = JSONArray.fromObject(jsonString);
			// for (Iterator iter = jsonArray.iterator(); iter.hasNext();) {
			// String str = (String) iter.next();
			// list.add(jsonObject.toString());
			// }
			list = JSONArray.toList(jsonArray);
		} catch (Exception e) {
			// e.printStackTrace();
			logger.error("转换失败：" + e);
		}
		return list;
	}

	/**
	 * @方法功能说明:从一个JSON数组得到一个java对象集合
	 * @创建人:王晓东
	 * @创建时间: 2013-8-7下午04:04:54
	 * @参数:@param jsonString json字符串
	 * @参数:@param clazz 要转换的目标对象类型
	 * @参数:@return
	 * @返回类型:List 传入的对象类型的集合，如果转换失败（如非json或传入的clazz不匹配），返回空
	 * @异常类型
	 */
	public static List jsonToList(String jsonString, Class clazz) {
		return jsonToList(jsonString, clazz, null);
	}

	/**
	 * @方法功能说明:从一个JSON数组得到一个java对象集合，其中对象中包含有集合属性
	 * @创建人:王晓东
	 * @创建时间: 2013-8-7下午04:04:54
	 * @参数:@param jsonString json字符串
	 * @参数:@param clazz 要转换的目标对象类型
	 * @参数:@param map 集合属性的类型
	 * @参数:@return
	 * @返回类型:List 传入的对象类型的集合，如果转换失败（如非json或传入的clazz不匹配），返回空
	 * @异常类型
	 */
	public static List jsonToList(String jsonString, Class clazz, Map map) {
		List list = new ArrayList();
		try {
			setDataFormatToObject();
			JSONArray jsonArray = JSONArray.fromObject(jsonString);
			for (Iterator iter = jsonArray.iterator(); iter.hasNext();) {
				JSONObject jsonObject = (JSONObject) iter.next();
				if (map == null) {
					list.add(JSONObject.toBean(jsonObject, clazz));
				} else {
					list.add(JSONObject.toBean(jsonObject, clazz, map));
				}
			}
		} catch (Exception e) {
			// e.printStackTrace();
			logger.error("转换失败：" + e);
		}
		return list;
	}

	/**
	 * @方法功能说明:从json HASH表达式中获取一个map，该map支持嵌套功能 形如：{"code" : "00000001",
	 *               "message"
	 *               :"xxxx"};注意commons-collections.jar的版本，必须包含org.apache
	 *               .commons. collections.map.MultiKeyMap
	 * @创建人:王晓东
	 * @创建时间: 2013-8-7下午04:17:47
	 * @参数:@param jsonString json字符串
	 * @参数:@return
	 * @返回类型:Map 返回map值，如果转换失败（如非json或传入的clazz不匹配），返回空
	 * @异常类型
	 */
	public static Map jsonToMap(String jsonString) {
		Map map = new HashMap();
		try {
			setDataFormatToObject();
			JSONObject jsonObject = JSONObject.fromObject(jsonString);
			for (Iterator iter = jsonObject.keys(); iter.hasNext();) {
				String key = (String) iter.next();
				map.put(key, jsonObject.get(key));
			}
		} catch (Exception e) {
			// e.printStackTrace();
			logger.error("转换失败：" + e);
		}
		return map;
	}

	/**
	 * @方法功能说明:把数据对象转换成json字符串 DTO对象形如：{"id" : idValue, "name" : nameValue,
	 *                         ...};数组对象形如：[{}, {}, {}, ...] map对象形如：{key1 :
	 *                         {"id" : idValue, "name" : nameValue, ...}, key2 :
	 *                         {}, ...}
	 * @see date为“2013-12-22T23:34:56”格式
	 * @创建人:王晓东
	 * @创建时间: 2013-8-7下午04:38:31
	 * @参数:@param object 需转换的对象
	 * @参数:@return
	 * @参数:@throws Exception
	 * @返回类型:String json串
	 * @异常类型
	 */
	public static String objToJsonForSIP(Object object) {
		String jsonString = null;
		try { // 日期值处理器
			JsonConfig jsonConfig = new JsonConfig();
			jsonConfig.registerJsonValueProcessor(Timestamp.class,
					new JsonDateValueProcessorForSIP());
			jsonConfig.registerJsonValueProcessor(Date.class,
					new JsonDateValueProcessorForSIP());
			if (object != null) {
				if (object instanceof Collection || object instanceof Object[]) {
					jsonString = JSONArray.fromObject(object, jsonConfig)
							.toString();
				} else {
					jsonString = JSONObject.fromObject(object, jsonConfig)
							.toString();
				}
			}
		} catch (Exception e) {
			// e.printStackTrace();
			logger.error("转换失败：" + e);
		}
		return jsonString == null ? "{}" : jsonString;
	}

	/**
	 * @方法功能说明:把数据对象转换成json字符串 DTO对象形如：{"id" : idValue, "name" : nameValue,
	 *                         ...};数组对象形如：[{}, {}, {}, ...] map对象形如：{key1 :
	 *                         {"id" : idValue, "name" : nameValue, ...}, key2 :
	 *                         {}, ...}
	 * @创建人:王晓东
	 * @创建时间: 2013-8-7下午04:38:31
	 * @参数:@param object 需转换的对象
	 * @参数:@return
	 * @参数:@throws Exception
	 * @返回类型:String json串
	 * @异常类型
	 */
	public static String objToJson(Object object) {
		String jsonString = null;
		try { // 日期值处理器
			JsonConfig jsonConfig = new JsonConfig();
			jsonConfig.registerJsonValueProcessor(Timestamp.class,
					new JsonDateValueProcessor());
			jsonConfig.registerJsonValueProcessor(Date.class,
					new JsonDateValueProcessor());
			if (object != null) {
				if (object instanceof Collection || object instanceof Object[]) {
					jsonString = JSONArray.fromObject(object, jsonConfig)
							.toString();
				} else {
					jsonString = JSONObject.fromObject(object, jsonConfig)
							.toString();
				}
			}
		} catch (Exception e) {
			// e.printStackTrace();
			logger.error("转换失败：" + e);
		}
		return jsonString == null ? "{}" : jsonString;
	}

	/**
	 * @方法功能说明:把数据对象转换成json字符串 DTO对象形如：{"id" : idValue, "name" : nameValue,
	 *                         ...};数组对象形如：[{}, {}, {}, ...] map对象形如：{key1 :
	 *                         {"id" : idValue, "name" : nameValue, ...}, key2 :
	 *                         {}, ...}
	 * @创建人:王晓东
	 * @创建时间: 2013-8-7下午04:38:31
	 * @参数:@param object 需转换的对象
	 * @参数:@return
	 * @参数:@throws Exception
	 * @返回类型:String json串
	 * @异常类型
	 */
	public static String objToJson(Object object, JsonConfig jsonConfig) {
		String jsonString = null;
		try {
			if (jsonConfig == null) {
				jsonConfig = new JsonConfig();
			}
			// 日期值处理器
			jsonConfig.registerJsonValueProcessor(Timestamp.class,
					new JsonDateValueProcessor());
			jsonConfig.registerJsonValueProcessor(Date.class,
					new JsonDateValueProcessor());
			if (object != null) {
				if (object instanceof Collection || object instanceof Object[]) {
					jsonString = JSONArray.fromObject(object, jsonConfig)
							.toString();
				} else {
					jsonString = JSONObject.fromObject(object, jsonConfig)
							.toString();
				}
			}
		} catch (Exception e) {
			// e.printStackTrace();
			logger.error("转换失败：" + e);
		}
		return jsonString == null ? "{}" : jsonString;
	}

	/**
	 * @方法功能说明:用于信令封装时使用的解析方法（具有局限性，其他代码谨慎调用）
	 * @创建人:王晓东
	 * @创建时间: 2013-8-19下午06:09:29
	 * @参数:@param jsonString json
	 * @参数:@param clazz 根部的类
	 * @参数:@param dataClazz data中的类
	 * @参数:@param flag
	 *            如果为true：data部分使用List；如果为false：data部分使用object,如果有多个数据，只获取第一个。
	 * @参数:@return
	 * @返回类型:Object
	 * @异常类型
	 */
	public static Object jsonToObjectForSip(String jsonString, Class clazz,
			Class dataClazz, boolean flag) {
		Object obj = null;
		try {
			setDataFormatToObject();
			JSONObject jsonObject = JSONObject.fromObject(jsonString);

			// 将形如user_uri的参数转换为userUri；
			makeHump(jsonObject);

			JSONArray jsonArray = jsonObject.getJSONArray("data");
			jsonObject.remove("data");

			// 将根对象转换
			obj = JSONObject.toBean(jsonObject, clazz);

			if (jsonArray != null) {
				if (flag) {// data部分使用List
					List dataList = new ArrayList();
					for (int i = 0; i < jsonArray.size(); i++) {
						JSONObject jsonObj = jsonArray.getJSONObject(i);
						changeTimeFormat(jsonObj);
						dataList.add(JSONObject.toBean(jsonObj, dataClazz));
					}
					if (obj != null) {
						Method[] methods = clazz.cast(obj).getClass()
								.getDeclaredMethods();
						for (int k = 0; k < methods.length; k++) {
							if (methods[k].getName() == "setData") {
								methods[k].invoke(obj, dataList);
								break;
							}
						}
					}
				} else {
					if (jsonArray.size() > 0) {
						JSONObject jsonObj = jsonArray.getJSONObject(0);
						changeTimeFormat(jsonObj);
						Object dataObj = JSONObject.toBean(jsonObj, dataClazz);
						if (dataObj != null && obj != null
								&& clazz.cast(obj) != null) {
							Method[] methods = clazz.cast(obj).getClass()
									.getDeclaredMethods();
							for (int k = 0; k < methods.length; k++) {
								if (methods[k].getName() == "setData") {
									methods[k].invoke(obj, dataObj);
									break;
								}
							}
						}
					}
				}
			}

		} catch (Exception e) {
			// e.printStackTrace();
			logger.error("转换失败：" + e);
		}
		return obj;
	}

	/**
	 * @方法功能说明:用于信令封装时使用的解析方法,data部分自动选择object/List（具有局限性，其他代码谨慎调用）
	 * @创建人:王晓东
	 * @创建时间: 2013-8-19下午04:58:04
	 * @参数:@param jsonString json
	 * @参数:@param clazz 根部的类
	 * @参数:@param dataClazz data中的类
	 * @参数:@return
	 * @返回类型:Object
	 * @异常类型
	 */
	public static Object jsonToObjectForSip(String jsonString, Class clazz,
			Class dataClazz) {
		Object obj = null;
		try {
			setDataFormatToObject();
			JSONObject jsonObject = JSONObject.fromObject(jsonString);

			// 将形如user_uri的参数转换为userUri；
			makeHump(jsonObject);

			JSONArray jsonArray = jsonObject.getJSONArray("data");
			jsonObject.remove("data");

			// 将根对象转换
			obj = JSONObject.toBean(jsonObject, clazz);

			if (jsonArray != null) {
				if (jsonArray.size() == 1) {// 生成单一的object
					JSONObject jsonObj = jsonArray.getJSONObject(0);
					changeTimeFormat(jsonObj);
					Object dataObj = JSONObject.toBean(jsonObj, dataClazz);
					if (dataObj != null && obj != null
							&& clazz.cast(obj) != null) {
						Method[] methods = clazz.cast(obj).getClass()
								.getDeclaredMethods();
						for (int k = 0; k < methods.length; k++) {
							if (methods[k].getName() == "setData") {
								methods[k].invoke(obj, dataObj);
								break;
							}
						}
					}
				} else if (jsonArray.size() > 1) {
					List dataList = new ArrayList();
					for (int i = 0; i < jsonArray.size(); i++) {
						JSONObject jsonObj = jsonArray.getJSONObject(i);
						changeTimeFormat(jsonObj);
						dataList.add(JSONObject.toBean(jsonObj, dataClazz));
					}
					if (obj != null) {
						Method[] methods = clazz.cast(obj).getClass()
								.getDeclaredMethods();
						for (int k = 0; k < methods.length; k++) {
							if (methods[k].getName() == "setData") {
								methods[k].invoke(obj, dataList);
								break;
							}
						}
					}
				}
			}

		} catch (Exception e) {
			// e.printStackTrace();
			logger.error("转换失败：" + e);
		}
		return obj;
	}

	/**
	 * @方法功能说明:将JSONArray中的形如user_uri的键名改为驼峰形式
	 * @创建人:王晓东
	 * @创建时间: 2013-8-19下午04:36:29
	 * @参数:@param jsonArray
	 * @返回类型:void
	 * @异常类型
	 */
	private static void makeHump(JSONArray jsonArray) {
		for (int jaSize = 0; jaSize < jsonArray.size(); jaSize++) {
			JSONObject jsonObj = jsonArray.getJSONObject(jaSize);
			makeHump(jsonObj);
		}
	}

	/**
	 * @方法功能说明:将JSONObject中的形如user_uri的键名改为驼峰形式
	 * @创建人:王晓东
	 * @创建时间: 2013-8-19下午04:37:57
	 * @参数:@param jsonObj
	 * @返回类型:void
	 * @异常类型
	 */
	private static void makeHump(JSONObject jsonObj) {
		Set<String> set = jsonObj.keySet();
		List<String> list = new ArrayList<String>();// 存放修改过的需要更新的节点
		Map addMap = new HashMap();// 存放需要删除的节点

		Iterator<String> it = set.iterator();
		while (it.hasNext()) {
			String keyStr = it.next();
			// 递归子节点
			try {
				jsonObj.getJSONObject(keyStr);
				if (!jsonObj.getJSONObject(keyStr).isNullObject()) {
					makeHump(jsonObj.getJSONObject(keyStr));
				}
			} catch (Exception e) {
				// "子节点不是JSONObject，" + e
			}
			try {
				jsonObj.getJSONArray(keyStr);
				makeHump(jsonObj.getJSONArray(keyStr));
			} catch (Exception e) {
				// "子节点不是JSONArray，" + e
			}

			String[] oldStr = keyStr.split("_");
			String newKeyStr = "";
			for (int keyStrSize = 0; keyStrSize < oldStr.length; keyStrSize++) {
				if (keyStrSize > 0) {
					newKeyStr += oldStr[keyStrSize].substring(0, 1)
							.toUpperCase().trim()
							+ oldStr[keyStrSize].substring(1).trim();
				} else {
					newKeyStr += oldStr[keyStrSize].trim();
				}
			}
			if (newKeyStr.length() <= 0) {
				newKeyStr = keyStr;// 分割变形失败时使用原参数
			}
			if (newKeyStr != keyStr) {
				addMap.put(newKeyStr, jsonObj.get(keyStr));
				list.add(keyStr);// 将冗余的数据项纪录
			}
		}

		// 将旧的数据删除
		for (int temp = 0; temp < list.size(); temp++) {
			jsonObj.remove(list.get(temp));
		}
		// 增加新的数据
		Set<String> key = addMap.keySet();
		Iterator<String> ite = key.iterator();
		while (ite.hasNext()) {
			String s = ite.next();
			jsonObj.put(s, addMap.get(s));
		}
	}

	/**
	 * @方法功能说明:用于信令封装DeviceStatus返回值的解析方法（具有局限性，其他代码谨慎调用）
	 * @创建人:王晓东
	 * @创建时间: 2013-8-26上午09:26:34
	 * @参数:@param jsonString
	 * @参数:@param clazz
	 * @参数:@param dataClazz
	 * @参数:@param alarmClass
	 * @参数:@return
	 * @返回类型:Object
	 * @异常类型
	 */
	public static Object jsonToObjectForDeviceStatus(String jsonString,
			Class clazz, Class dataClazz, Class alarmClass) {
		Object obj = null;
		try {
			setDataFormatToObject();
			JSONObject jsonObject = JSONObject.fromObject(jsonString);
			// 将形如user_uri的参数转换为userUri；
			makeHump(jsonObject);
			JSONArray jsonArray = jsonObject.getJSONArray("data");
			jsonObject.remove("data");

			// 将根对象转换
			obj = JSONObject.toBean(jsonObject, clazz);

			if (jsonArray != null && jsonArray.size() > 0) {
				JSONObject jsonObj = jsonArray.getJSONObject(0);
				for (Object key : jsonObj.keySet()) {
					String s = key.toString();
					if ("time".equals(s) || "startTime".equals(s)
							|| "endTime".equals(s)) {
						String o = (String) jsonObj.get(key);
						o = o.replace("T", " ");
						jsonObj.put(key, o);
					}
				}
				JSONArray jsonArr = jsonObj.getJSONArray("alarm");
				jsonObj.remove("alarm");
				Object dataObj = JSONObject.toBean(jsonObj, dataClazz);
				if (jsonArr != null && jsonArr.size() > 0) {
					List alarmList = new ArrayList();
					for (int i = 0; i < jsonArr.size(); i++) {
						JSONObject jo = jsonArr.getJSONObject(i);
						for (Object key : jo.keySet()) {
							String s = key.toString();
							if ("time".equals(s) || "startTime".equals(s)
									|| "endTime".equals(s)) {
								String o = (String) jo.get(key);
								o = o.replace("T", " ");
								jo.put(key, o);
							}
						}
						alarmList.add(JSONObject.toBean(jo, alarmClass));
					}
					if (alarmList != null && dataObj != null
							&& alarmList.size() > 0) {
						Method[] methods = dataClazz.cast(dataObj).getClass()
								.getDeclaredMethods();
						for (int k = 0; k < methods.length; k++) {
							if (methods[k].getName() == "setAlarm") {
								methods[k].invoke(dataObj, alarmList);
								break;
							}
						}
					}
				}

				if (dataObj != null && obj != null && clazz.cast(obj) != null) {
					Method[] methods = clazz.cast(obj).getClass()
							.getDeclaredMethods();
					for (int k = 0; k < methods.length; k++) {
						if (methods[k].getName() == "setData") {
							methods[k].invoke(obj, dataObj);
							break;
						}
					}
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			logger.error("转换失败：" + e);
		}
		return obj;
	}

	public static void changeTimeFormat(JSONObject jsonObj) {
		for (Object key : jsonObj.keySet()) {// 改变时间字符串格式
			String s = key.toString();
			if ("time".equals(s) || "startTime".equals(s)
					|| "endTime".equals(s)) {
				String o = (String) jsonObj.get(key);
				if ("0-0-0T0:0:0".equals(o)||"0000-00-00T00:00:00".equals(o)||"00-00-00T00:00:00".equals(o)) {
					jsonObj.put(key, "null");
				} else {
					o = o.replace("T", " ");
					jsonObj.put(key, o);
				}
			}
		}
	}
}
