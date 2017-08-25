package com.jp.tic.common.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jp.tic.common.util.ByteUtils;
import com.jp.tic.framework.entity.BaseEntity;

public class FixedByteUtils {
	protected static final Logger log = LoggerFactory.getLogger(FixedByteUtils.class);
	
	//private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
	private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd/HH/mm/ss/SSS");
	
	public static Map<String, Object> getMap(List<Pack> CAR_PACK_DATA, int startIndex, byte[] data, boolean capitalized) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		
		startIndex = Math.max(startIndex, 0);
		result.put("startIndex", startIndex);
		
		for (int i = 0, len = CAR_PACK_DATA.size(); i < len; i++) {
			Pack pack = CAR_PACK_DATA.get(i);
			
			Object value=processFieldData(data, startIndex, pack, capitalized);
			result.put(pack.getName(), value);
			
			startIndex = startIndex + CAR_PACK_DATA.get(i).getLength();
			log.debug(startIndex + "#" + pack.getName() + pack.getTitle() + "#" + result.get(pack.getName()));
		}
		result.put("lastIndex", startIndex);
		return result;
	}
	
	public static Map<String, Object> getMap(List<Pack> CAR_PACK_DATA, int startIndex, byte[] data) throws Exception {
		return getMap(CAR_PACK_DATA, startIndex, data, false);
	}
	
	public static Map<String, Object> getMap(List<Pack> CAR_PACK_DATA, byte[] data) throws Exception {
		return getMap(CAR_PACK_DATA, 0, data, false);
	}
	
	private static Object processFieldData(byte[] data,int startIndex,Pack pack, boolean capitalized){
		if (capitalized) {
			pack.setName(pack.getName().toUpperCase());
		} else {
			pack.setName(pack.getName().toLowerCase());
		}
		
		if (pack.getType() == ObjectType.STRING) {
			String value = ByteUtils.getStrings(data, new int[]{startIndex}, new int[]{pack.length})[0];
			if(value!=null&&value.indexOf("\0")>-1){
				value=value.substring(0,value.indexOf("\0")).trim();
			}
			return value;
		} else if (pack.getType() == ObjectType.INT) {
			return ByteUtils.getInt(data, startIndex);
		} else if (pack.getType() == ObjectType.FLOAT) {
			return ByteUtils.getFloats(data, new int[]{startIndex})[0];
		} else if (pack.getType() == ObjectType.DOUBLE) {
			return ByteUtils.getDoubles(data, new int[]{startIndex})[0];
		} else if (pack.getType() == ObjectType.DATE) {
			try {
				String value = new String(data, startIndex, pack.getLength(), "UTF-8");
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd/HH/mm/ss/SSS");
				log.debug("date string:"+value);
				return sdf.parse(value);
			} catch (Exception e) {
				log.error("",e);
				return null;
			}
		} else {
			String value = ByteUtils.getStrings(data, new int[]{startIndex}, new int[]{pack.length})[0];
			return value;
		}
	}
	
	public static byte[] getBytes(int totalLenght, List<Pack> packData, Map<String, Object> entity) throws Exception {
		byte[] data=new byte[totalLenght];
		
		int startIndex=0;
		for (int i = 0, len = packData.size(); i < len; i++) {
			Pack pack = packData.get(i);
			byte[] fieldData=processField(entity, pack);
			System.arraycopy(fieldData, 0, data, startIndex, fieldData.length);
			
			if(fieldData.length!=pack.getLength()){
				log.debug(startIndex + "#" + pack.getName() + pack.getTitle() + "#" + entity.get(pack.getName())+"|config length"+fieldData.length+"|data length"+pack.getLength());
			}
			startIndex=startIndex+pack.getLength();
			
			log.debug(startIndex + "#" + pack.getName() + pack.getTitle() + "#" + entity.get(pack.getName())+" bytes:"+ReflectionToStringBuilder.toString(fieldData, ToStringStyle.SHORT_PREFIX_STYLE));
		}
		
		return data;		
	}
	
	private static byte[] processField(Map<String, Object> entity,Pack pack){
		if(entity.get(pack.getName())==null){
			return new byte[pack.getLength()];
		}
		
		if (pack.getType() == ObjectType.CHAR) {
			byte[] result=new byte[1];
			result[0]=(Byte)entity.get(pack.getName());
			return result;
		}
		else if (pack.getType() == ObjectType.SHORT) {
			byte[] result=ByteUtils.getBytes((Short)entity.get(pack.getName()));
			return result;
		}
		else if (pack.getType() == ObjectType.INT){
			int value=0;
			if(entity.get(pack.getName()) instanceof Integer){
				value=(Integer)entity.get(pack.getName());
			}
			else{
				value=new Integer(entity.get(pack.getName()).toString());
			}
			byte[] result=ByteUtils.getBytes(value);
			return result;
		} else if (pack.getType() == ObjectType.FLOAT) {
			float value=0;
			if(entity.get(pack.getName()) instanceof Float){
				value=(Float)entity.get(pack.getName());
			}
			else{
				value=new Float(entity.get(pack.getName()).toString());
			}
			byte[] result=ByteUtils.getBytes(value);
			return result;
		} else if (pack.getType() == ObjectType.DOUBLE) {
			byte[] result=ByteUtils.getBytes((Double)entity.get(pack.getName()));
			return result;
		} else if (pack.getType() == ObjectType.STRING) {
			String value="";
			if(entity.get(pack.getName())!=null){
				value=entity.get(pack.getName()).toString();
			}
			byte[] result=ByteUtils.getBytes(value);
			if(result.length<pack.getLength()){
				byte[] data=new byte[pack.getLength()];
				System.arraycopy(result, 0, data, 0, Math.min(data.length, result.length));
				//data[result.length]='\0';
				result=data;
			}
			return result;
		} else if (pack.getType() == ObjectType.DATE) {
			try {
				Object value=entity.get(pack.getName());
				if(value instanceof Date){
					String data=sdf.format((Date)entity.get(pack.getName()));
					byte[] result=ByteUtils.getBytes(data);
					return result;
				}
				return new byte[pack.getLength()];
			} catch (Exception e) {
				return new byte[pack.getLength()];
			}
		} else {
			byte[] result=ByteUtils.getBytes(entity.get(pack.getName()).toString());
			return result;
		}
	}
	
	public enum ObjectType {
		CHAR,STRING, DATE, SHORT, INT, DOUBLE, FLOAT
	}
	
	public static class Pack extends BaseEntity {
		private static final long serialVersionUID = 1L;
		
		private ObjectType type;
		private int length;
		private String name;
		private String title;
		
		public Pack() {
		}
		
		public Pack(String title, String name, ObjectType type, int length) {
			super();
			this.type = type;
			this.length = length;
			this.name = name;
			this.title = title;
		}

		public ObjectType getType() {
			return type;
		}

		public void setType(ObjectType type) {
			this.type = type;
		}

		public int getLength() {
			return length;
		}

		public void setLength(int length) {
			this.length = length;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}
	}
}
