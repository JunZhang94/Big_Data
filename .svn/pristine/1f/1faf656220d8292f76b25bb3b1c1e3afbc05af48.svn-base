package com.jp.tic.utils.sql;

import java.util.List;

import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.util.Assert;

import com.jp.tic.utils.lang.StringUtil;

public class SQLUtil {

    /**
     * 拼接指定字段的in条件（in 最大支持1000个表达式，如果超了 这里做or处理）
     * 
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
     * 将String[]转换为一个String,返回一个由","连接的String.
     * @param values
     * @return
     * @author hdh
     */
    public static String in(String[] values) {
        StringBuffer buffer = new StringBuffer();
        for(String s : values) {
            buffer.append(",'").append(s).append("'");
        }
        String str = buffer.toString();
        str = str.substring(1, str.length());
        return str;
    }

    public static String in(String field, List values) {
        return in(field, values == null?null:values.toArray());
    }
    
    public static String likeStart(String field,String value){
        if(null == value) return "";
        return " and "+field+" like '%"+value.toString()+"' ";
        
    }
    
    public static String likeEnd(String field,String value){
        if(null == value) return "";
        return " and "+field+" like '"+value.toString()+"%' ";
    }
    
    public static String likeAny(String field,String value){
        if(null == value) return "";
        return " and "+field+" like '%"+value.toString()+"%' ";
    }
    
    public static String eq(String field,String value,boolean isVarchar){
        if(null == value) return " and "+field+" is NULL";
        if(isVarchar){
            value ="'"+value+"'";
        }
        return " and "+field+ "= "+value;
    }
    
    public static String lt(String field,String value,boolean isVarchar){
        if(null == value) return "";
        if(isVarchar){
            value ="'"+value+"'";
        }
        return " and "+field+ "< "+value;
    }
    
    public static String le(String field,String value,boolean isVarchar){
        if(null == value) return "";
        if(isVarchar){
            value ="'"+value+"'";
        }
        return " and "+field+ "<= "+value;
    }
    
    public static String gt(String field,String value,boolean isVarchar){
        if(null == value) return "";
        if(isVarchar){
            value ="'"+value+"'";
        }
        return " and "+field+ "> "+value;
    }
    
    public static String ge(String field,String value,boolean isVarchar){
        if(null == value) return "";
        if(isVarchar){
            value ="'"+value+"'";
        }
        return " and "+field+ ">= "+value;
    }
    
    /**
     * 车牌模糊匹配条件拼装
     * @param carFNum
     * @param carBNum
     * @return carNum
     * @author hdh
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
     * @author hdh
     */
    public static String getCarNumLikeCondition(String fullCarNum) {
        if (StringUtil.checkObj(fullCarNum)) {
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
    
    /**
     * 生成过滤红名单的查询条件
     * @return 
     */
    public static String getWhitelistFilterCondition(String carNumField){
        StringBuffer sb = new StringBuffer(" ");
        sb.append(" not exists (from BlockCar w where w.carNum = ").append(carNumField).append(" and w.status = 1 and w.endDate > sysdate)");
        return sb.toString();
    }
    
    
    public static SQLQuery getEqOperationBindingVariablesSQLQuery(Session session,String sql ,String[] names,Object[] values){
        
        StringBuffer sb = new StringBuffer(sql);
        SQLQuery query = null;
        if(null != names && names.length > 0){
            
            if(null !=values && values.length > 0 && null != names && names.length > 0){
                for(int i=0 ;i<values.length ;i++){
                    if(null != values[i] && !"".equals(values[i].toString().trim())){
                        sb.append(" and ").append(names[i]).append("=").append("?");
                    }
                }
//                System.out.println("==>"+sb.toString());
                query = session.createSQLQuery(sb.toString());
                int j = 0;
                for(int i=0 ;i<values.length ;i++){
                    if(null != values[i] && !"".equals(values[i].toString().trim())){
                        query.setParameter(j++, values[i]);
//                        System.out.println("value =>"+values[i]);
                    }
                }
            }
        }
        return query;
    }
    
    public static void main(String[] args) {
        int length = 2000;
        StringBuffer sb = new StringBuffer();
        String[] values = new String[length];
        for (int i = 0; i < length; i++) {
            values[i] = i + "";
        }
        System.out.println( in("XXXX", values));
    }
}
