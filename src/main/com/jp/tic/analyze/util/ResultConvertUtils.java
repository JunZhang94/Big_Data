package com.jp.tic.analyze.util;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import org.apache.commons.lang.ArrayUtils;
import org.apache.hadoop.hbase.KeyValue;
import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.client.ResultScanner;
import org.apache.hadoop.hbase.util.Bytes;
import org.springframework.util.ReflectionUtils;

import com.jp.tic.analyze.dao.impl.AbstractKKHBaseDao.KKRowKey;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.hbase.JPControlKeyHelper;
import com.jp.tic.system.hbase.SysHBaseConstants;

/**
 * <b>function:</b> Result 转换工具类
 * @author hoojo
 * @createDate 2014-5-23 下午02:49:00
 * @file ResultConvertUtils.java
 * @package com.jp.tic.analyze.util
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public abstract class ResultConvertUtils {

	public static Map<String, Object> desc(Result rs, Boolean capitalized) throws Exception {
		Map<String, Object> item = new HashMap<String, Object>();
		for (KeyValue kv : rs.raw()) {
			try {
				if (!"".equals(new String(kv.getRow()))) {
					
					String name = Bytes.toString(kv.getQualifier());
					Object value = valueOf(CarTake.class, name, kv.getValue(), "rksj", "jgsj");
					if (capitalized == null) {
					} else if (capitalized) {
						name = name.toUpperCase();
					} else if (!capitalized) {
						name = name.toLowerCase();
					}
					if (value == null) {
						value = Bytes.toString(kv.getValue());
					}
					item.put(name, value);
					
					//System.out.println(Bytes.toString(kv.getFamily()) + "-" + Bytes.toString(kv.getQualifier()) + "#" +  value);
				}
			} catch (Exception ex) {
				throw ex;
			}
		}
		return item;
	}
	
	public static Map<String, Object> desc(Result rs, Boolean capitalized, Class<?> targetClass, Object... exceptional) throws Exception {
		Map<String, Object> item = new HashMap<String, Object>();
		for (KeyValue kv : rs.raw()) {
			try {
				if (!"".equals(new String(kv.getRow()))) {
					
					String name = Bytes.toString(kv.getQualifier());
					Object value = valueOf(targetClass, name, kv.getValue(), exceptional);
					if (capitalized == null) {
					} else if (capitalized) {
						name = name.toUpperCase();
					} else if (!capitalized) {
						name = name.toLowerCase();
					}
					if (value == null) {
						value = Bytes.toString(kv.getValue());
					}
					item.put(name, value);
					
					//System.out.println(Bytes.toString(kv.getFamily()) + "-" + Bytes.toString(kv.getQualifier()) + "#" +  value);
				}
			} catch (Exception ex) {
				throw ex;
			}
		}
		return item;
	}
	
	public static Map<String, Object> desc(Result rs, String familyName, Boolean capitalized, Object... exceptional) throws Exception {
		Map<String, Object> item = new HashMap<String, Object>();
		byte[] family = Bytes.toBytes(familyName);
		Set<Entry<byte[], byte[]>> set = rs.getFamilyMap(family).entrySet();
		
		for (Entry<byte[], byte[]> kv : set) {
			try {
				String name = Bytes.toString(kv.getKey());
				Object value = valueOf(CarTake.class, name, kv.getValue(), exceptional);
				if (capitalized == null) {
				} else if (capitalized) {
					name = name.toUpperCase();
				} else if (!capitalized) {
					name = name.toLowerCase();
				}
				if (value == null) {
					value = Bytes.toString(kv.getValue());
				}
				item.put(name, value);
			} catch (Exception ex) {
				throw ex;
			}
		}
		return item;
	}
	
	public static Map<String, Object> desc(Result rs, String familyName, Boolean capitalized, Class<?> targetClass, Object... exceptional) throws Exception {
		Map<String, Object> item = new HashMap<String, Object>(); 
		byte[] family = Bytes.toBytes(familyName);
		Set<Entry<byte[], byte[]>> set = rs.getFamilyMap(family).entrySet();
		
		for (Entry<byte[], byte[]> kv : set) {
			try {
				String name = Bytes.toString(kv.getKey());
				Object value = valueOf(targetClass, name, kv.getValue(), exceptional);
				if (capitalized == null) {
				} else if (capitalized) {
					name = name.toUpperCase();
				} else if (!capitalized) {
					name = name.toLowerCase();
				}
				if (value == null) {
					value = Bytes.toString(kv.getValue());
				}
				item.put(name, value);
			} catch (Exception ex) {
				throw ex;
			}
		}
		return item;
	}
	
	public static Map<String, byte[]> asc(Result rs, String familyName, Boolean capitalized) throws Exception {
		Map<String, byte[]> item = new HashMap<String, byte[]>();
		byte[] family = Bytes.toBytes(familyName);
		Set<Entry<byte[], byte[]>> set = rs.getFamilyMap(family).entrySet();

		for (Entry<byte[], byte[]> kv : set) {
			try {
				String name = Bytes.toString(kv.getKey());
				if (capitalized == null) {
				} else if (capitalized) {
					name = name.toUpperCase();
				} else if (!capitalized) {
					name = name.toLowerCase();
				}
				item.put(name, kv.getValue());
			} catch (Exception ex) {
				throw ex;
			}
		}
		return item;
	}
	
	public static Map<String, byte[]> asc(Result rs, Boolean capitalized) throws Exception {
		Map<String, byte[]> item = new HashMap<String, byte[]>();
		for (KeyValue kv : rs.raw()) {
			try {
				if (!"".equals(new String(kv.getRow()))) {

					String name = Bytes.toString(kv.getQualifier());
					if (capitalized == null) {
					} else if (capitalized) {
						name = name.toUpperCase();
					} else if (!capitalized) {
						name = name.toLowerCase();
					}
					item.put(name, kv.getValue());
				}
			} catch (Exception ex) {
				throw ex;
			}
		}
		return item;
	}

	public static Object valueOf(Class<?> clazz, String fieldName, byte[] data, Object... timed) throws Exception {

		Field field = ReflectionUtils.findField(clazz, fieldName);
		if (field == null) {
			return null;
		}
		Class<?> type = field.getType();
		Object result = null;
		boolean exceptional = ArrayUtils.contains(timed, fieldName);
		
		try {
			String value = new String(data, "UTF-8");
			if (type == String.class) {
				result = value;
			} else if (type == int.class || type == Integer.class) {
				result = Bytes.toInt(data);
			} else if (type == float.class || type == float.class) {
				result = Bytes.toFloat(data);// NumberUtils.toFloat(StringUtils.trim(value), -1.0F);
			} else if (type == double.class || type == Double.class) {
				result = Bytes.toDouble(data);//NumberUtils.toDouble(value, -1.00D);
			} else if (type == Date.class && exceptional) {
				result = new Date(Bytes.toLong(data));
			} else if (type == Date.class) {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
				try {
					result = sdf.parse(value);
				} catch (Exception e) {
					result = sdf.parse("0000-00-00 00:00:00.000");
				}
			} else if (type == Long.class || type == long.class) {
				result = Bytes.toLong(data);
			} else {
				result = value;
			}
		} catch (Exception e) {
			throw new Exception(type + ", val : " + result + " valOf exception: ", e);
		}
		//System.out.println(type + "#" + result);
		return result;
	}

	public static List<CarTake> toTakes(ResultScanner resultScanner){
		List<CarTake> list=new ArrayList<CarTake>();
		for(Result result:resultScanner){
			list.add(toTake(result));
		}
		return list;
	}
	
	public static CarTake toTake(Result result){
		if(result==null){
			return null;
		}
		if(result.getRow()==null){
			return null;
		}
		
		CarTake take=new CarTake();
		
		for (KeyValue kv : result.raw()) {
			try{
				if(isValidKV(kv)){
					String columnName=Bytes.toString(kv.getQualifier());
					
					if(SysHBaseConstants.QN_XXBH_STR.equals(columnName)){
						take.setXxbh(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_KKBH_STR.equals(columnName)){
						take.setKkbh(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_SBBH_STR.equals(columnName)){
						take.setSbbh(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_FXBH_STR.equals(columnName)){
						take.setFxbh(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_JGSJ_STR.equals(columnName)){
						take.setJgsj(getDateValue(kv.getValue()));
						continue;
					}
					
					if(SysHBaseConstants.QN_CDBH_STR.equals(columnName)){
						take.setCdbh(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_HPHM_STR.equals(columnName)){
						take.setHphm(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_HPYS_STR.equals(columnName)){
						take.setHpys(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_CWHPHM_STR.equals(columnName)){
						take.setCwhphm(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_CWHPYS_STR.equals(columnName)){
						take.setCwhpys(getStringValue(kv.getValue()));
						continue;
					}
					
					if(SysHBaseConstants.QN_HPYZ_STR.equals(columnName)){
						take.setHpyz(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_CLSD_STR.equals(columnName)){
						take.setClsd(getDoubleValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_CLXS_STR.equals(columnName)){
						take.setClxs(getDoubleValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_CSCD_STR.equals(columnName)){
						take.setCscd(getLongValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_XSZT_STR.equals(columnName)){
						take.setXszt(getStringValue(kv.getValue()));
						continue;
					}
					
					if(SysHBaseConstants.QN_WFZT_STR.equals(columnName)){
						take.setWfzt(getStringValue(kv.getValue()));
						continue;
					}
					
					if(SysHBaseConstants.QN_HPYZ_STR.equals(columnName)){
						take.setHpyz(getStringValue(kv.getValue()));
						continue;
					}
					
					if(SysHBaseConstants.QN_CLPP_STR.equals(columnName)){
						take.setClpp(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_CLWX_STR.equals(columnName)){
						take.setClwx(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_CSYS_STR.equals(columnName)){
						take.setCsys(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_HPZL_STR.equals(columnName)){
						take.setHpzl(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_CLLX_STR.equals(columnName)){
						take.setCllx(getStringValue(kv.getValue()));
						continue;
					}
					
					if(SysHBaseConstants.QN_TXSL_STR.equals(columnName)){
						take.setTxsl(getLongValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_TX1_STR.equals(columnName)){
						take.setTx1(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_TX2_STR.equals(columnName)){
						take.setTx2(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_TX3_STR.equals(columnName)){
						take.setTx3(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_TX4_STR.equals(columnName)){
						take.setTx4(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_TX5_STR.equals(columnName)){
						take.setTx5(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_TX6_STR.equals(columnName)){
						take.setTx6(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_TX7_STR.equals(columnName)){
						take.setTx7(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_TX8_STR.equals(columnName)){
						take.setTx8(getStringValue(kv.getValue()));
						continue;
					}
					
					if(SysHBaseConstants.QN_YLXXLX_STR.equals(columnName)){
						take.setYlxxlx(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_YLXX_STR.equals(columnName)){
						take.setYlxx(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_CJ_STR.equals(columnName)){
						take.setCj(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_RKSJ_STR.equals(columnName)){
						take.setRksj(getDateValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_JSSJ_STR.equals(columnName)){
						take.setJssj(getDateValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_QYDM_STR.equals(columnName)){
						take.setQydm(getStringValue(kv.getValue()));
						continue;
					}
					
					if(SysHBaseConstants.QN_QYMC_STR.equals(columnName)){
						take.setQymc(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_SBMC_STR.equals(columnName)){
						take.setSbmc(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_DWBH_STR.equals(columnName)){
						take.setDwbh(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_DWMC_STR.equals(columnName)){
						take.setDwmc(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_FXMC_STR.equals(columnName)){
						take.setFxmc(getStringValue(kv.getValue()));
						continue;
					}
					
					if(SysHBaseConstants.QN_CDMC_STR.equals(columnName)){
						take.setCdmc(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_WFBS_STR.equals(columnName)){
						take.setWfbs(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_WFXWBH_STR.equals(columnName)){
						take.setWfxwbh(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_WFCLBJ_STR.equals(columnName)){
						take.setWfclbj(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_CARBRAND_STR.equals(columnName)){
						take.setBrand(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_CARTYPE_STR.equals(columnName)){
						take.setType(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_CARYEAR_STR.equals(columnName)){
						take.setCaryear(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_SCORE_STR.equals(columnName)){
						//take.setXxbh(getStringValue(kv.getValue()));
						take.setScore(Integer.parseInt(getStringValue(kv.getValue())));
						continue;
					}
					if(SysHBaseConstants.QN_CLZL_STR.equals(columnName)){
						//take.setXxbh(getStringValue(kv.getValue()));
						take.setClzl(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_DROPNUM_STR.equals(columnName)){
						//take.setXxbh(getStringValue(kv.getValue()));
						take.setDropnum(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_BOXNUM_STR.equals(columnName)){
						//take.setXxbh(getStringValue(kv.getValue()));
						take.setBoxnum(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_SUNFLAG_STR.equals(columnName)){
						//take.setXxbh(getStringValue(kv.getValue()));
						take.setSunflag(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_TAGNUM_STR.equals(columnName)){
						//take.setXxbh(getStringValue(kv.getValue()));
						take.setTagnum(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_SEATBELT_STR.equals(columnName)){
						//take.setXxbh(getStringValue(kv.getValue()));
						take.setSeatbelt(getStringValue(kv.getValue()));
						continue;
					}
					if(SysHBaseConstants.QN_RECT_STR.equals(columnName)){
						//take.setXxbh(getStringValue(kv.getValue()));
						take.setRect(getStringValue(kv.getValue()));
						continue;
					}
				}
			}
			catch(Exception ex){
				ex.printStackTrace();
			}
		}
		
		try {
			take.setId(new String(result.getRow(),"ISO-8859-1"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		return take;
	}
	
	private static JPControlKeyHelper ROW_KEY_HELPER=new JPControlKeyHelper();
	
	public static String toRowKeyHphm(String tableName,byte[] rowKeyBtyes){
		if(tableName==null||rowKeyBtyes==null){
			return null;
		}
		
		Map<String,Object> map=null;
		if(SysHBaseConstants.TABLE_NAME_CAR_TAKE.equals(tableName)){
			map=ROW_KEY_HELPER.getDetailProperties(rowKeyBtyes);
		}
		if(SysHBaseConstants.TABLE_NAME_INDEX_HPHM.equals(tableName)){
			map=ROW_KEY_HELPER.getHphmIndexProperties(rowKeyBtyes);
		}
		if(SysHBaseConstants.TABLE_NAME_INDEX_KKBH.equals(tableName)){
			map=ROW_KEY_HELPER.getKkbhIndexProperties(rowKeyBtyes);	
		}
		if(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ.equals(tableName)){
			map=ROW_KEY_HELPER.getJgsjIndexProperties(rowKeyBtyes);
		}
		
		if(map!=null){
			return (String)map.get(SysHBaseConstants.QN_HPHM_STR);
		}
		
		return null;
	}
	
	public static KKRowKey toRowKey(String tableName,byte[] rowKeyBtyes){
		if(tableName==null||rowKeyBtyes==null){
			return null;
		}
		KKRowKey rowkey=new KKRowKey();
		
		Map<String,Object> map=null;
		if(SysHBaseConstants.TABLE_NAME_CAR_TAKE.equals(tableName)){
			map=ROW_KEY_HELPER.getDetailProperties(rowKeyBtyes);
		}
		if(SysHBaseConstants.TABLE_NAME_INDEX_HPHM.equals(tableName)){
			map=ROW_KEY_HELPER.getHphmIndexProperties(rowKeyBtyes);
		}
		if(SysHBaseConstants.TABLE_NAME_INDEX_KKBH.equals(tableName)){
			map=ROW_KEY_HELPER.getKkbhIndexProperties(rowKeyBtyes);	
		}
		if(SysHBaseConstants.TABLE_NAME_INDEX_JGSJ.equals(tableName)){
			map=ROW_KEY_HELPER.getJgsjIndexProperties(rowKeyBtyes);
		}
		
		if(map!=null){
			rowkey.setCdbh((String)map.get(SysHBaseConstants.QN_CDBH_STR));
			rowkey.setFxbh((String)map.get(SysHBaseConstants.QN_FXBH_STR));
			rowkey.setHphm((String)map.get(SysHBaseConstants.QN_HPHM_STR));
			rowkey.setHpys((String)map.get(SysHBaseConstants.QN_HPYS_STR));
			rowkey.setHpzl((String)map.get(SysHBaseConstants.QN_HPZL_STR));
			rowkey.setJgsj((Date)map.get(SysHBaseConstants.QN_JGSJ_STR));
			rowkey.setKkbh((String)map.get(SysHBaseConstants.QN_KKBH_STR));
			rowkey.setSbbh((String)map.get(SysHBaseConstants.QN_SBBH_STR));
			rowkey.setRawkey(rowKeyBtyes);
			return rowkey;
		}
		
		return null;
	}
	
	private static String INVALID_ROW="";
	
	private static boolean isValidKV(KeyValue kv){
		if (INVALID_ROW.equals(new String(kv.getRow()))) {
			return false;
		}
		return true;
	}
	
	private static Date getDateValue(byte[] value){
		if(value!=null){
			long time= Bytes.toLong(value);
			Date date=new Date();
			date.setTime(time);
			return date;
		}
		return null;
	}
	
	private static String getStringValue(byte[] value){
		if(value!=null){
			return Bytes.toString(value);
		}
		return null;
	}
	
	private static Long getLongValue(byte[] value){
		if(value!=null){
			return Bytes.toLong(value);
		}
		return null;
	}
	
	private static Double getDoubleValue(byte[] value){
		if(value!=null){
			return Bytes.toDouble(value);
		}
		return null;
	}
	
	
	/**
	 * <b>function:</b>
	 * 
	 * @author hoojo
	 * @createDate 2014-5-23 下午02:49:00
	 * @param args
	 */
	public static void main(String[] args) {

		try {
			System.out.println(valueOf(CarTake.class, "kkbh", Bytes.toBytes("哈哈")));
			System.out.println(valueOf(CarTake.class, "jgsj", Bytes.toBytes(new Date().getTime())));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
