package com.jp.tic.analyze.util;

public class StringUtils {

	private static String EMPTY_STR = "";
	public static boolean isEmptyString(String s){
		if(s==null || s.trim().length() == 0){
			return true;
		}
		return false;
	}
	
	public static boolean isEmptyString(Object s){
		if(s==null || EMPTY_STR.equals(s)){
			return true;
		}
		return false;
	}
	
	public static String toString(Object s){
		if(s==null){
			return EMPTY_STR;
		}
		return String.valueOf(s);
	}
	/** Trims a given String. An empty String will be returned if the given String is null.
	 * @param s The String to be Trimmed.
	 * @return The String trimmed.
	 */	
	public static String trim(String s) {
		if (s==null) return EMPTY_STR;
		else return s.trim();
	}
	
	/** Trims a given String and then verifies its size against the specified size. If the sizes do not match, null will be returned.
	 * @param s The String to be trimmed and verified.
	 * @param size The size for the verification.
	 * @return The trimmed String or null if the size verification failed.
	 */	
	public static String trimAndVerifySize(String s, int size) {
		
		s = trim(s);
				
		if (s.length()!=size) return null;
		else return s;
	}
	/** Checks if a given String contains only digits.
	 * @param s A String to be checked.
	 * @return <PRE>true</PRE> if the given String contains only digits, <PRE>false</PRE> otherwise.
	 */	
	public static boolean isAllDigit(String s) {
		if (s==null || s.equals(EMPTY_STR)) return false;
		else {
			for (int i=0; i<s.length(); i++) {
				char c = s.charAt(i);
				if (!Character.isDigit(c)) return false;
			}
			return true;
		}
	}
	/** Repeats a given String in the specified number of times, then concatenates and returns it.
	 * @param s A String to be repeated and concatenated.
	 * @param occurs The number of times of the given String to be repeated.
	 * @return The concatenated String.
	 */	
	public static String repeatString(String s, int occurs) {
		StringBuffer result = new StringBuffer();
		if (s!=null && occurs>0) {
			for (int i=0; i<occurs; i++) {
				result.append(s);
			}
		}
		return result.toString();
	}
	
	/**
	 * sĳlength,ԣlength-sĳȣprefix.
	 * @param length
	 * @param prefix
	 * @param s
	 * @return
	 */
	public static String addStringPrefix(int length, String prefix,String s) {
		int strLen = null == s? 0:s.length();
		int needPrefixNum = length - strLen;
		StringBuffer result = new StringBuffer();
		for (int i = 0; i < needPrefixNum; i++) {
			result.append(prefix);
		}
		result.append(s);
		return result.toString();
	}
	
	public static String[] split(String str, char separatorChar) {
		return org.apache.commons.lang.StringUtils.split(str, separatorChar);
	}
	
	public static String byteToString(byte[] bytes){
		if(bytes==null||bytes.length==0){
			return null;
		}
		
		String values="";
		for(int i=0;i<bytes.length;i++){
			values=values+","+bytes[i];
		}
		
		return values.substring(1);
	}
	
	public static byte[] stringToByte(String value){
		if(value==null||value.length()==0){
			return null;
		}
		
		String[] values=value.split(",");
		byte[] bytes=new byte[values.length];
		for(int i=0;i<values.length;i++){
			bytes[i]=Byte.parseByte(values[i]);
		}
		
		return bytes;
	}
}
