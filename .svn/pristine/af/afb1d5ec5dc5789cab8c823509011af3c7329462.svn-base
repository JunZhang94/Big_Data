package com.jp.tic.utils.lang;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {

	/**
	 * 获得当天日期
	 * 
	 * @return yyyy-mm-dd
	 */
	public static String getCurrentDateStr() {
		String curDateStr = "";

		Calendar cal = Calendar.getInstance();
		int year = cal.get(Calendar.YEAR);
		int month = cal.get(Calendar.MONTH) + 1;
		int day = cal.get(Calendar.DAY_OF_MONTH);

		curDateStr = String.valueOf(year) + "-";
		curDateStr += ((month < 10) ? "0" + String.valueOf(month) : String
				.valueOf(month))
				+ "-";
		curDateStr += ((day < 10) ? "0" + String.valueOf(day) : String
				.valueOf(day));

		return curDateStr;
	}

	/**
	 * 获得当前时间，精度到毫秒
	 * 
	 * @return hh:mm:ss
	 */
	public static String getCurrentTimeStr() {
		String curTimeSr = "";

		Calendar cal = Calendar.getInstance();
		int hour = cal.get(Calendar.HOUR_OF_DAY);
		int minute = cal.get(Calendar.MINUTE);
		int second = cal.get(Calendar.SECOND);
		int milliSecond = cal.get(Calendar.MILLISECOND);
		curTimeSr = ((hour < 10) ? "0" + String.valueOf(hour) : String
				.valueOf(hour))
				+ ":";
		curTimeSr += ((minute < 10) ? "0" + String.valueOf(minute) : String
				.valueOf(minute))
				+ ":";
		curTimeSr += ((second < 10) ? "0" + String.valueOf(second) : String
				.valueOf(second));
		curTimeSr += "." + String.valueOf(milliSecond);

		return curTimeSr;
	}
	
	/**
	 * 获得当前时间，精度到秒
	 * 
	 * @return hh:mm:ss
	 */
	public static String getCurrentTime() {
		String curTimeSr = "";

		Calendar cal = Calendar.getInstance();
		int hour = cal.get(Calendar.HOUR_OF_DAY);
		int minute = cal.get(Calendar.MINUTE);
		int second = cal.get(Calendar.SECOND);
		//int milliSecond = cal.get(Calendar.MILLISECOND);
		curTimeSr = ((hour < 10) ? "0" + String.valueOf(hour) : String
				.valueOf(hour))
				+ ":";
		curTimeSr += ((minute < 10) ? "0" + String.valueOf(minute) : String
				.valueOf(minute))
				+ ":";
		curTimeSr += ((second < 10) ? "0" + String.valueOf(second) : String
				.valueOf(second));
		//curTimeSr += "." + String.valueOf(milliSecond);

		return curTimeSr;
	}
	
	/**
	 * 获得当天时间，精度到秒
	 * 
	 * @return yyyy-mm-dd hh-mm-ss
	 */
	public static String getCurrentDateTime() {
		String curDateTimeStr = "";
		curDateTimeStr = getCurrentDateStr() + " " + getCurrentTime();
		return curDateTimeStr;
	}

	/**
	 * 获得当天时间，精度到毫秒
	 * 
	 * @return yyyy-mm-dd hh-mm-ss
	 */
	public static String getCurrentDateTimeStr() {
		String curDateTimeStr = "";
		curDateTimeStr = getCurrentDateStr() + " " + getCurrentTimeStr();
		return curDateTimeStr;
	}

	/**
	 * 格式化字符串为日期
	 * 
	 * @param s
	 * @param style
	 * @return
	 */
	public static Date parseToDate(String s, String style) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat();
		simpleDateFormat.applyPattern(style);
		Date date = null;
		if (s == null || s.length() < 8)
			return null;
		try {
			date = simpleDateFormat.parse(s);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}

	/**
	 * 格式化字符口中为日期字符串
	 * 
	 * @param s
	 * @param style
	 * @return
	 */
	public static String parseToString(String s, String style) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat();
		simpleDateFormat.applyPattern(style);
		Date date = null;
		String str = null;
		if (s == null || s.length() < 8)
			return null;
		try {
			date = simpleDateFormat.parse(s);
			str = simpleDateFormat.format(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return str;
	}
	
	public static String parseToString(String s, String srcStyle,String targetStyle){
		SimpleDateFormat srcDf = new SimpleDateFormat(srcStyle);
		//srcDf.applyPattern(srcStyle);
		SimpleDateFormat targetDf = new SimpleDateFormat(targetStyle);
		//targetDf.applyPattern(targetStyle);
		Date date = null;
		String str = null;
		if (s == null || s.length() < 8)
			return null;
		try {
			date = srcDf.parse(s);
			str = targetDf.format(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return str;
	}

	/**
	 * 格式化日期为字符串日期
	 * 
	 * @param date
	 * @param style
	 * @return
	 */
	public static String parseToString(Date date, String style) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat();
		simpleDateFormat.applyPattern(style);
		String str = null;
		if (date == null)
			return null;
		str = simpleDateFormat.format(date);
		return str;
	}

	/**
	 * 两个时间相差时间
	 * 
	 * @param startTime
	 * @param endTime
	 *            endTime>startTime
	 * @return 返回XX天
	 */
	public static int getTwoTimeDay(String startTime, String endTime) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date starDate = null;
		Date endDate = null;
		try {
			starDate = df.parse(startTime);
			endDate = df.parse(endTime);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		long l = endDate.getTime() - starDate.getTime();
		return StringUtil.toInteger(l / (24 * 60 * 60 * 1000));
	}

	/**
	 * 两个时间相差时间
	 * 
	 * @param startTime
	 * @param endTime
	 *            endTime>startTime
	 * @return 返回XX小时
	 */
	public static int getTwoTimeDayforHour(String startTime, String endTime) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date starDate = null;
		Date endDate = null;
		try {
			starDate = df.parse(startTime);
			endDate = df.parse(endTime);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		long l = endDate.getTime() - starDate.getTime();
		return StringUtil.toInteger(l / (2 * 60 * 60 * 1000));
	}

	public static void main(String[] args) {
		System.out.println(getTwoTimeDay("2012-12-06 09:45:12",
				"2012-12-06 10:45:12"));
	}
	
	
	/**
     * 从现在开始减去固定年数后，过去的时间
     * @return yyyy-mm-dd
     */
    public static String getPastDateStr(int amount) {
        String curDateStr = "";

        Calendar cal = Calendar.getInstance();
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;
        int day = cal.get(Calendar.DAY_OF_MONTH);

        curDateStr = String.valueOf(year - amount) + "-";
        curDateStr += ((month < 10) ? "0" + String.valueOf(month) : String
                .valueOf(month))
                + "-";
        curDateStr += ((day < 10) ? "0" + String.valueOf(day) : String
                .valueOf(day));

        return curDateStr;
    }
    
    /**
     * 现在的时间
     * @return yyyy-mm-dd hh-mm-ss
     */
    public static String getNowDateTimeStr() {
        String curDateTimeStr = "";
        curDateTimeStr = getCurrentDateStr() + "T" + getCurrentTimeStr() + "Z";
        return curDateTimeStr;
    }
    
    /**
     * 从现在开始减去固定年数后，过去的时间
     * @return yyyy-mm-dd hh-mm-ss
     */
    public static String getPastDateTimeStr(int amount) {
        String curDateTimeStr = "";
        curDateTimeStr = getPastDateStr(amount) + "T" + getCurrentTimeStr() + "Z";
        return curDateTimeStr;
    }
    
}
