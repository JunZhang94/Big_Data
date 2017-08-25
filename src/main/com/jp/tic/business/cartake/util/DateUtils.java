package com.jp.tic.business.cartake.util;


import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;

public class DateUtils {
	
	/**
	 * 将Date类转换为XMLGregorianCalendar
	 * @param date
	 * @return 
	 */
	public static XMLGregorianCalendar dateToXmlDate(Date date){
			Calendar cal = Calendar.getInstance();
			cal.setTime(date);
			DatatypeFactory dtf = null;
		     try {
				dtf = DatatypeFactory.newInstance();
			} catch (DatatypeConfigurationException e) {
			}
			XMLGregorianCalendar dateType = dtf.newXMLGregorianCalendar();
		    dateType.setYear(cal.get(Calendar.YEAR));
		    //由于Calendar.MONTH取值范围为0~11,需要加1
		    dateType.setMonth(cal.get(Calendar.MONTH)+1);
		    dateType.setDay(cal.get(Calendar.DAY_OF_MONTH));
		    dateType.setHour(cal.get(Calendar.HOUR_OF_DAY));
		    dateType.setMinute(cal.get(Calendar.MINUTE));
		    dateType.setSecond(cal.get(Calendar.SECOND));
		    return dateType;
		} 

	/**
	 * 将XMLGregorianCalendar转换为Date
	 * @param cal
	 * @return 
	 */
	public static Date xmlDate2Date(XMLGregorianCalendar cal){
		return cal.toGregorianCalendar().getTime();
	}
	
	/**
     * 比较两个日期的大小 date1和date2格式:yyyy-mm-dd hh:mi
     * Jul 6, 2009 9:29:37 AM tian 
     * @param date1
     * @param date2
     * @return
     */
      public static boolean compareTime(String date1, String date2) {
        boolean flag = false;
        if (covertTimeToLong(date1) < covertTimeToLong(date2)) {
            flag = false;
        } else if (covertTimeToLong(date1) >= covertTimeToLong(date2)) {
            flag = true;
        }
        return flag;
    }
/**
       * 将字符串日期2009-7-3 01:01转换成long型毫秒数
       * Jul 3, 2009 2:52:32 PM tian 
         * @param time
         * @return
         */
/** 两个GregorianCalendar的构造函数可以用来处理时间。前者创建一个表示日期，小时和分钟的对象： 

* GregorianCalendar(int year, int month, int date, int hour, int minute)
* 第二个创建一个表示一个日期，小时，分钟和秒：

* GregorianCalendar(int year, int month, int date, int hour, int minute, int second)

*/

    public static long covertTimeToLong(String time){
        long ll=0l;
        int yy=0;
        int mm=0;
        int dd=0;
        int hh=0;
        int mi=0;
        if(time!=null&&!"".equals(time)){//可以根据自己的参数进行判断控制
            yy=Integer.parseInt(time.substring(0,4));
            mm=Integer.parseInt(time.substring(5,time.lastIndexOf("-")));
            dd=Integer.parseInt(time.substring(time.lastIndexOf("-")+1,time.length()-6));
            hh=Integer.parseInt(time.substring(time.length()-5,time.indexOf(":")));
            mi=Integer.parseInt(time.substring(time.length()-2));
            GregorianCalendar gc = new GregorianCalendar(yy, mm, dd, hh, mi);
            Date d = gc.getTime();
            ll = d.getTime();
        }else{
            ll=Long.MAX_VALUE;
        }
        return ll;
      }
}

