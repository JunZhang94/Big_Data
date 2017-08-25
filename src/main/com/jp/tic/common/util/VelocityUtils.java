package com.jp.tic.common.util;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * <b>function:</b> 测速工具类，通过经纬度测量距离
 * 
 * @author hoojo
 * @createDate 2013-11-15 上午11:47:40
 * @file VelocityUtils.java
 * @package com.jp.tic.zhsics.velocitymeasurement
 * @project ZHSICS-Server
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public abstract class VelocityUtils {
	
	private static final double EARTH_RADIUS = 6378.137;// 地球半径

	private static double rad(double d) {
		return d * Math.PI / 180.0;
	}

	/**
	 * <b>function:</b> 根据经纬度两点位置 计算距离
	 * @author hoojo
	 * @createDate 2013-11-15 上午11:53:19
	 * @param lat1 纬度
	 * @param lng1 经度
	 * @param lat2 纬度2
	 * @param lng2 经度2
	 * @return 千米km 距离
	 */
	public static double getDistance(double lat1, double lng1, double lat2, double lng2) throws Exception {
		double radLat1 = rad(lat1);
		double radLat2 = rad(lat2);
		double a = radLat1 - radLat2;
		double b = rad(lng1) - rad(lng2);

		double s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) 
				* Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
		s = s * EARTH_RADIUS;
		s = Math.round(s * 10000) / 10000;
		return s;
	}

	/**
	 * <b>function:</b> 根据时间求速度
	 * @author hoojo
	 * @createDate 2013-11-15 下午02:45:20
	 * @param start 起始时间
	 * @param end 结束时间
	 * @param distance 距离 km
	 * @return 速度
	 * @throws Exception
	 */
	public static String getSpeed(Date start, Date end, double distance) throws Exception {
		
		long time = start.getTime() - end.getTime();
		time = Math.abs(time);
		
		double min = time / (60 * 1000); // 分
		min = Math.max(min, 1);
		double speed = distance / min * 60; // 小时速度
		//speed = Math.round(speed * 100) * 0.01d;
		return String.format("%.2f", speed) + "km/h";
	}
	
	public static double getVelocity(Date start, Date end, double distance) throws Exception {

		long time = start.getTime() - end.getTime();
		time = Math.abs(time);
		
		double min = time / (60 * 1000); // 分
		min = Math.max(min, 1);
		double speed = distance / min * 60; // 小时速度
		speed = Math.round(speed * 100) * 0.01d;
		return speed;
	}
	
	public static void main(String[] args) throws Exception {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		java.util.Date now = df.parse("2004-01-02 13:31:40");
		java.util.Date date = df.parse("2004-01-02 10:30:24");
		System.out.println(getSpeed(now, date, 11));
		System.out.println(Math.round(5.264 * 100) * 0.01d);
		System.out.println(String.format("%.2f", 5.264));
		System.out.println(new java.text.DecimalFormat("#000,000.00").format(213233.1475926));
	}
}