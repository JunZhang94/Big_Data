package com.jp.tic.system.util;

import org.apache.commons.lang.StringUtils;
import org.springframework.util.Assert;

public class SQLUtil {

    /**
     * 拼接指定字段的in条件（in 最大支持1000个表达式，如果超了 这里做or处理）
     * @param field
     * @param values
     * @return 拼接完成的In条件
     */
    public static String in(String field, Object[] values) {
        Assert.notNull(field);
        StringBuffer sb = new StringBuffer();
        if (null == values || values.length == 0) {
            sb.append(" and ").append(field).append(" in ('-9999')");
            return sb.toString();
        }

        sb.append(" and (  ");
        for (int i = 0; i < values.length; i++) {
            if (i % 1000 == 0) {
                sb.append(field).append(" in ('").append(values[i]).append("'");
                if (i == values.length - 1) {
                    sb.append(")");
                } else {
                    sb.append(",");
                }
            } else if (i % 1000 == 999) {
                sb.append("'").append(values[i]).append("'").append(") ");
                if (i < values.length - 1) {
                    sb.append(" or ");
                }
            } else {
                sb.append("'").append(values[i]).append("'");
                if (i == values.length - 1) {
                    sb.append(")");
                } else {
                    sb.append(",");
                }
            }
        }
        sb.append(")");
        return sb.toString();
    }
    
    /**
     * 车牌模糊匹配条件拼装
     * @param carFNum
     * @param carBNum
     * @return carNum
     * @author lsg
     */
    public static String getCarNumLikeCondition(String carFNum, String carBNum) {
        String result = "";
        // 判断用户是否在车牌号第一位输入了“*”号。
        if (null != carBNum && carBNum.length() > 0) {
            if ("*".equals(carBNum.substring(0, 1))) {
                result = getCarNumLikeCondition(carBNum);
            } else {
                result = "(.)*" + getCarNumLikeCondition(carBNum);
            }
        }
        // 如果车牌省份简称不为空，则附加到车牌号的前面。
        if (null != carFNum) {
            result = carFNum + result;
        }
        return "'" + result + "'";
    }
    
    /**
     * 生成车牌模糊查询条件
     * @param fullCarNum
     * @return
     * @author lsg
     */
    public static String getCarNumLikeCondition(String fullCarNum) {
        if (!StringUtils.isEmpty(fullCarNum)) {
            // 支持"*"号匹配0至多个任意字符
            if (fullCarNum.contains("*")) {
                fullCarNum = fullCarNum.replace("*", "(.)*");
            }
            // 支持"?"匹配任意一个字符
            if (fullCarNum.contains("?")) {
                fullCarNum = fullCarNum.replace("?", ".");
            }
            // 以下是容错匹配
            if (fullCarNum.contains("Z") || fullCarNum.contains("2")) {
                fullCarNum = fullCarNum.replaceAll("[Z2]", "[Z2]");
            }
            if (fullCarNum.contains("B") || fullCarNum.contains("8")
                    || fullCarNum.contains("S")) {
                fullCarNum = fullCarNum.replaceAll("[SB8]", "[SB8]");
            }
            if (fullCarNum.contains("I") || fullCarNum.contains("1")) {
                fullCarNum = fullCarNum.replaceAll("[I1]", "[I1]");
            }
            if (fullCarNum.contains("O") || fullCarNum.contains("Q")
                    || fullCarNum.contains("0")) {
                fullCarNum = fullCarNum.replaceAll("[OQ0]", "[O0Q]");
            }
        }
        return fullCarNum;
    }
}
