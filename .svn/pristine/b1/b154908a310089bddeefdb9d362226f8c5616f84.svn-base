package com.jp.tic.utils;


import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import com.jp.tic.utils.cons.Constants;
import com.jp.tic.utils.lang.StringUtil;

/**
 * 公共类
 *
 * @author 梁石光
 * @datetime 2013-05-30
 */
@SuppressWarnings("unchecked")
public class CommonUtils {

    /**
     * 根据正则表达式，查找字符串，然后再拼接指标字符串
     * 如果没有匹配到，则返回原始字符串
     */
    public static String getResultByRegex4Split(String regex, String src, String appendStr) {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(src);
        String result = src;
        while (matcher.find()) {
            result = result.replaceAll(matcher.group(), matcher.group() + appendStr);
        }
        return result;
    }

    /**
     * 根据Map中查询条件，转换为查询SQL的Where条件
     */
    @SuppressWarnings("unchecked")
    public static String getConditions(Map<String, String> map) {
        StringBuffer conditions = new StringBuffer();
        int index = 1;
        for (Map.Entry entry : map.entrySet()) {
            String key = StringUtil.toString(entry.getKey());
            String value = StringUtil.toString(entry.getValue());
            //排除分页的两个参数
            if ("page".equals(key) || "rows".equals(key))
                continue;
            if (index == 1) {
                conditions.append(" where ").append(key + " = '" + value + "'");
            } else {
                conditions.append(" and ").append(key + " = '" + value + "'");
            }
            index++;
        }
        return conditions.toString();
    }

    /**
     * 根据传入的参数生成Sql条件,不需要转换为字符分割
     */
    public static String genSqlCondition(Map map, String col, String fiterModel) {
        return genSqlCondition(map, col, fiterModel, false);
    }

    /**
     * 根据传入的参数生成Sql条件
     */
    public static String genSqlCondition(Map map, String col, String fiterModel, boolean convert) {
        StringBuffer sql = new StringBuffer();
        String column = "";
        if (convert) {
            column = convertString(StringUtil.toString(map.get(col)));
        } else {
            column = StringUtil.toString(map.get(col));
        }

        if (StringUtil.checkObj(column)) {
            sql.append(" and " + col);
            if (Constants.SQL_FITER_EQ.equals(fiterModel)) {
                sql.append(" = '").append(column).append("'");
            }
            if (Constants.SQL_FITER_IN.equals(fiterModel)) {
                sql.append(" in (").append(column).append(")");
            }
            if (Constants.SQL_FITER_LIKE.equals(fiterModel)) {
                sql.append(" like '").append(column).append("'");
            }
        }
        return sql.toString();
    }

    /**
     * 把例如1,2,3,4转换为'1','2','3','4'
     */
    public static String convertString(String value) {
        String[] vlaueArray = StringUtil.split(value, ",");
        String result = "";
        for (int i = 0; i < vlaueArray.length; i++) {
            if (i == 0) {
                result = "'" + vlaueArray[i] + "'";
            } else {
                result += ",'" + vlaueArray[i] + "'";
            }
        }
        return result;
    }

    /**
     * 获取真实的IP地址
     */
    public static String getIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

    /**
     * 深度清除对象引用
     *
     * @param list
     */
    public static void deepClear(List<Map> list) {
        if (null == list)
            return;
        for (Object obj : list) {
            if (obj instanceof Map) {
                ((Map) obj).clear();
            } else if (obj instanceof List) {
                deepClear((List) obj);
            } else {
                obj = null;
            }
        }
        list.clear();
    }
}
