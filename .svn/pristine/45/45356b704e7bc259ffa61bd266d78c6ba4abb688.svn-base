package com.jp.tic.common.util;

import java.nio.charset.Charset;
import java.util.Hashtable;
import java.util.Map;

public class ByteUtils {
	public static byte[] getBytes(short data) {
		byte[] bytes = new byte[2];
		bytes[0] = (byte) (data & 0xff);
		bytes[1] = (byte) ((data & 0xff00) >> 8);
		return bytes;
	}

	public static byte[] getBytes(char data) {
		byte[] bytes = new byte[2];
		bytes[0] = (byte) (data);
		bytes[1] = (byte) (data >> 8);
		return bytes;
	}

	public static byte[] getBytes(int data) {
		byte[] bytes = new byte[4];
		bytes[0] = (byte) (data & 0xff);
		bytes[1] = (byte) ((data & 0xff00) >> 8);
		bytes[2] = (byte) ((data & 0xff0000) >> 16);
		bytes[3] = (byte) ((data & 0xff000000) >> 24);
		return bytes;
	}

	public static byte[] getBytes(long data) {
		byte[] bytes = new byte[8];
		bytes[0] = (byte) (data & 0xff);
		bytes[1] = (byte) ((data >> 8) & 0xff);
		bytes[2] = (byte) ((data >> 16) & 0xff);
		bytes[3] = (byte) ((data >> 24) & 0xff);
		bytes[4] = (byte) ((data >> 32) & 0xff);
		bytes[5] = (byte) ((data >> 40) & 0xff);
		bytes[6] = (byte) ((data >> 48) & 0xff);
		bytes[7] = (byte) ((data >> 56) & 0xff);
		return bytes;
	}

	public static byte[] getBytes(float data) {
		int intBits = Float.floatToIntBits(data);
		return getBytes(intBits);
	}

	public static byte[] getBytes(double data) {
		long intBits = Double.doubleToLongBits(data);
		return getBytes(intBits);
	}

	public static byte[] getBytes(String data, String charsetName) {
		Charset charset = Charset.forName(charsetName);
		return data.getBytes(charset);
	}

	public static byte[] getBytes(String data) {
		return getBytes(data, "UTF-8");
	}

	public static short getShort(byte[] bytes) {
		return (short) ((0xff & bytes[0]) | (0xff00 & (bytes[1] << 8)));
	}

	public static char getChar(byte[] bytes) {
		return (char) ((0xff & bytes[0]) | (0xff00 & (bytes[1] << 8)));
	}

	public static int getInt(byte[] bytes) {
		return (0xff & bytes[0]) | (0xff00 & (bytes[1] << 8))
				| (0xff0000 & (bytes[2] << 16))
				| (0xff000000 & (bytes[3] << 24));
	}

	public static int getInt(byte[] bytes, int startIndex) {
		try {
			byte[] data = new byte[4];
			System.arraycopy(bytes, startIndex, data, 0, data.length);
			return getInt(data);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -1;
	}
	
	public static long getLong(byte[] bytes) {
		return (0xffL & (long) bytes[0]) | (0xff00L & ((long) bytes[1] << 8))
				| (0xff0000L & ((long) bytes[2] << 16))
				| (0xff000000L & ((long) bytes[3] << 24))
				| (0xff00000000L & ((long) bytes[4] << 32))
				| (0xff0000000000L & ((long) bytes[5] << 40))
				| (0xff000000000000L & ((long) bytes[6] << 48))
				| (0xff00000000000000L & ((long) bytes[7] << 56));
	}

	public static float getFloat(byte[] bytes) {
		return Float.intBitsToFloat(getInt(bytes));
	}

	public static double getDouble(byte[] bytes) {
		long l = getLong(bytes);
		return Double.longBitsToDouble(l);
	}

	public static String getString(byte[] bytes, String charsetName) {
		return new String(bytes, Charset.forName(charsetName));
	}

	public static String getString(byte[] bytes) {
		return getString(bytes, "UTF-8");
	}
	
	public static byte[] addHead(byte[] bytes,byte[] head){
		return null;
	}
	
	public static byte[] addTail(byte[] bytes,byte[] head){
		return null;
	}
	
	public static byte[] addHeadAndTail(byte[] bytes,byte[] head,byte[] tail){
		return null;
	}

	public static String[] getStrings(byte[] bytes, int[] startLocations, int[] lengths) {
		return getStrings(bytes,startLocations,lengths,"UTF-8");
	}
	
	public static String[] getStrings(byte[] bytes, int[] startLocations, int[] lengths,String charsetName) {
		if(bytes!=null&&bytes.length>0&&startLocations!=null&&startLocations.length>0&&startLocations.length==lengths.length){
			String[] fields=new String[startLocations.length];
			for(int i=0;i<fields.length;i++){
				try {
					fields[i]=new String(bytes,startLocations[i],lengths[i],charsetName);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			return fields;
		}
		return null;
	}
	public static float[] getFloats(byte[] bytes, int[] startLocations) {
		if(bytes!=null&&bytes.length>0&&startLocations!=null&&startLocations.length>0){
			float[] fields=new float[startLocations.length];
			for(int i=0;i<fields.length;i++){
				try {
					byte[] data=new byte[4];
					System.arraycopy(bytes, startLocations[i], data, 0, data.length);
					fields[i]=getFloat(data);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			return fields;
		}
		return null;
	}
	
	public static double[] getDoubles(byte[] bytes, int[] startLocations) {
		if(bytes!=null&&bytes.length>0&&startLocations!=null&&startLocations.length>0){
			double[] fields=new double[startLocations.length];
			for(int i=0;i<fields.length;i++){
				try {
					byte[] data=new byte[8];
					System.arraycopy(bytes, startLocations[i], data, 0, data.length);
					fields[i]=getDouble(data);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			return fields;
		}
		return null;
	}
	
	public static int[] getInts(byte[] bytes, int[] startLocations) {
		if(bytes!=null&&bytes.length>0&&startLocations!=null&&startLocations.length>0){
			int[] fields=new int[startLocations.length];
			for(int i=0;i<fields.length;i++){
				try {
					byte[] data=new byte[4];
					System.arraycopy(bytes, startLocations[i], data, 0, data.length);
					fields[i]=getInt(data);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			return fields;
		}
		return null;
	}
	
	public static short[] getShorts(byte[] bytes, int[] startLocations) {
		if(bytes!=null&&bytes.length>0&&startLocations!=null&&startLocations.length>0){
			short[] fields=new short[startLocations.length];
			for(int i=0;i<fields.length;i++){
				try {
					byte[] data=new byte[2];
					System.arraycopy(bytes, startLocations[i], data, 0, data.length);
					fields[i]=getShort(data);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			return fields;
		}
		return null;
	}
	
	
	public static char[] getChars(byte[] bytes, int[] startLocations) {
		if(bytes!=null&&bytes.length>0&&startLocations!=null&&startLocations.length>0){
			char[] fields=new char[startLocations.length];
			for(int i=0;i<fields.length;i++){
				try {
					byte[] data=new byte[2];
					System.arraycopy(bytes, startLocations[i], data, 0, data.length);
					fields[i]=getChar(data);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			return fields;
		}
		return null;
	}
	
	public static byte[] getBytes(byte[] bytes, int[] startLocations) {
		if(bytes!=null&&bytes.length>0&&startLocations!=null&&startLocations.length>0){
			byte[] fields=new byte[startLocations.length];
			for(int i=0;i<fields.length;i++){
				try {
					byte data=bytes[startLocations[i]];
					fields[i]=data;
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			return fields;
		}
		return null;
	}
	
	
	public static Map<Integer, byte[]> splitBytes(byte[] bytes, int[] startLocations) {
		if(bytes!=null&&bytes.length>0&&startLocations!=null&&startLocations.length>0){
			Map<String, byte[]> fields=new Hashtable<String, byte[]>();
			
			int locationIndex=0;
			byte[] data=null;
			int fieldBegin=-1;
			String fieldKey="";
			for(int start=0;start<bytes.length;start++){
				if(locationIndex<startLocations.length && locationIndex+1<startLocations.length && start==startLocations[locationIndex]){
					//add one field to result
					if(data!=null){
						fields.put(fieldKey, data);
					}
					
					//new a field
					int length=startLocations[locationIndex+1]-startLocations[locationIndex];
					data=new byte[length];
					fieldBegin=start;
					fieldKey=startLocations[locationIndex+1]+"-"+startLocations[locationIndex];
					
					locationIndex++;
				}
				
				if(data!=null){
					data[start-fieldBegin]=bytes[start];
				}
			}
		}
		return null;
	}
	
	public static Map<Integer, byte[]> splitBytes(byte[] bytes, String spliter) {
		return splitBytes(bytes, getBytes(spliter));
	}
	
	public static Map<Integer, byte[]> splitBytes(byte[] bytes, byte[] spliterBytes) {
		Map<Integer, byte[]> fields = new Hashtable<Integer, byte[]>();
		int count = 0;
		int start = 0;
		
		int index = 0;
		for (; index < bytes.length; index++) {
			if (bytes[index] == spliterBytes[0]) {
				boolean matched=true;
				for (int j = 0; j < spliterBytes.length; j++) {
					if (bytes[index + j] != spliterBytes[j]) {
						matched=false;
						break;
					}
				}

				if (matched) {
					byte[] fieldBytes = new byte[index - start];
					System.arraycopy(bytes, start, fieldBytes, 0, fieldBytes.length);
					fields.put(count, fieldBytes);
					count++;
					
					start=start+spliterBytes.length+fieldBytes.length;
				}
			}
			
		}
		
		//last field
		byte[] newByte = new byte[index - start];
		System.arraycopy(bytes, start, newByte, 0, newByte.length);
		fields.put(count, newByte);
		
		return fields;
	}
	
	public static void main(String[] args) {
		short s = 122;
		int i = 122;
		long l = 1222222;

		char c = 'a';

		float f = 122.22f;
		double d = 122.22;

		String string = "Hello world";
		System.out.println(s);
		System.out.println(i);
		System.out.println(l);
		System.out.println(c);
		System.out.println(f);
		System.out.println(d);
		System.out.println(string);

		System.out.println("**************");

		System.out.println(getShort(getBytes(s)));
		System.out.println(getInt(getBytes(i)));
		System.out.println(getLong(getBytes(l)));
		System.out.println(getChar(getBytes(c)));
		System.out.println(getFloat(getBytes(f)));
		System.out.println(getDouble(getBytes(d)));
		System.out.println(getString(getBytes(string)));
		System.out.println(getBytes(1808)[0]+"---"+getBytes(1808)[1]+"---"+getBytes(1808)[2]+"---"+getBytes(1808)[3]);
	}
}
