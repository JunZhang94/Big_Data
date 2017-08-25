package com.jp.tic.common.util;

import java.util.Calendar;
import java.util.Date;

/**
 * <b>function:</b> 数字、日期转换工具类
 * @author hoojo
 * @createDate 2012-11-28 下午04:05:47
 * @file NumberUtils.java
 * @package com.chinawidth.unit
 * @project newchinawidth
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public class NumberUtils {
	
	// 日期转化为大小写
	public static String dataToUpper(Date date) {
		Calendar ca = Calendar.getInstance();
		ca.setTime(date);
		int year = ca.get(Calendar.YEAR);
		int month = ca.get(Calendar.MONTH) + 1;
		int day = ca.get(Calendar.DAY_OF_MONTH);
		return numToUpper(year) + "年" + monthToUppder(month) + "月" + dayToUppder(day) + "日";
	}

	/*******************************************************************************************************************
	 * <b>function:</b> 将数字转化为大写
	 * @createDate 2010-5-27 上午10:28:12
	 * @param num 数字
	 * @return 转换后的大写数字
	 */
	public static String numToUpper(int num) {
		// String u[] = {"零","壹","贰","叁","肆","伍","陆","柒","捌","玖"};
		// String u[] = {"零", "一", "二", "三", "四", "五", "六", "七", "八", "九"};
		String u[] = { "○", "一", "二", "三", "四", "五", "六", "七", "八", "九" };
		char[] str = String.valueOf(num).toCharArray();
		String rstr = "";
		for (int i = 0; i < str.length; i++) {
			rstr = rstr + u[Integer.parseInt(str[i] + "")];
		}
		return rstr;
	}
	
	public static String numberToUpper(int num) {
		// String u[] = {"零","壹","贰","叁","肆","伍","陆","柒","捌","玖"};
		// String u[] = {"零", "一", "二", "三", "四", "五", "六", "七", "八", "九"};
		String u[] = { "○", "一", "二", "三", "四", "五", "六", "七", "八", "九" };
		char[] str = String.valueOf(num).toCharArray();
		String rstr = "";
		for (int i = 0; i < str.length; i++) {
			rstr = rstr + u[Integer.parseInt(str[i] + "")];
		}
		return rstr;
	}
	
	/*******************************************************************************************************************
	 * <b>function:</b> 月转化为大写
	 * @createDate 2010-5-27 上午10:41:42
	 * @param month 月份
	 * @return 返回转换后大写月份
	 */
	public static String monthToUppder(int month) {
		if (month < 10) {
			return numToUpper(month);
		} else if (month == 10) {
			return "十";
		} else {
			return "十" + numToUpper(month - 10);
		}
	}

	/*******************************************************************************************************************
	 * <b>function:</b> 日转化为大写
	 * @createDate 2010-5-27 上午10:43:32
	 * @param day 日期
	 * @return 转换大写的日期格式
	 */
	public static String dayToUppder(int day) {
		if (day < 20) {
			return monthToUppder(day);
		} else {
			char[] str = String.valueOf(day).toCharArray();
			if (str[1] == '0') {
				return numToUpper(Integer.parseInt(str[0] + "")) + "十";
			} else {
				return numToUpper(Integer.parseInt(str[0] + "")) + "十" + numToUpper(Integer.parseInt(str[1] + ""));
			}
		}
	}
}
