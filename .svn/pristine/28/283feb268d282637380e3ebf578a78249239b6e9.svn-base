package com.jp.tic.utils.json;

import java.io.IOException;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.jp.tic.utils.lang.StringUtil;

/**
 * JSON工具类
 * @author 梁石光
 * @datetime 2013-05-30
 */
public class JackJson {

	//jackson方式转换JSON
	@SuppressWarnings("deprecation")
	public static String getBasetJsonData4Jackson(Object obj) {
		StringWriter writer = new StringWriter();
		if (obj != null) {
			ObjectMapper mapper = new ObjectMapper();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
			mapper.getSerializationConfig().setDateFormat(sdf);
			try {
				mapper.writeValue(writer, obj);
			} catch (JsonGenerationException e) {
				e.printStackTrace();
			} catch (JsonMappingException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return writer.toString();

	}

	//fastJson方式转换JSON
	@SuppressWarnings("deprecation")
	public static String getBasetJsonData(Object obj) {
		StringWriter writer = new StringWriter();
		if (obj != null) {
			writer.write(JSON.toJSONString(obj, SerializerFeature.WriteDateUseDateFormat));
		}
		return writer.toString();

	}

	/**
	 * @param args
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonGenerationException 
	 */
	@SuppressWarnings("unchecked")
	public static void main(String[] args) throws JsonGenerationException, JsonMappingException, IOException {
		Date d1 = new Date();
		Map map = new HashMap();
		map.put("a", "tes1");
		map.put("b", "12");
		List list = new ArrayList();
		list.add(map);
		Date d2 = new Date();
		System.out.println("装载对象：" + StringUtil.getTimeInMillis(d1, d2));

		//jackson
		Date d3 = new Date();
		String jackson = getBasetJsonData4Jackson(list);
		Date d4 = new Date();
		System.out.println("jackson转换json：" + StringUtil.getTimeInMillis(d3, d4) + jackson);

		//fastjson
		Date d5 = new Date();
		String fastjson = getBasetJsonData(list);
		Date d6 = new Date();
		System.out.println("fastjson转换json：" + StringUtil.getTimeInMillis(d5, d6) + fastjson);
	}
}