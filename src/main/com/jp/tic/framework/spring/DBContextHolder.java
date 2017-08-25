package com.jp.tic.framework.spring;

public class DBContextHolder{   
    public static final String DATA_SOURCE_INNER = "inner";   
    public static final String DATA_SOURCE_CENTER = "center";   
       
    private static final ThreadLocal<String> contextHolder = new ThreadLocal<String>();   
       
    public static void setDBType(String dbType) {   
        contextHolder.set(dbType);   
    }   
       
    public static String getDBType() {   
        return contextHolder.get();   
    }   
       
    public static void clearDBType() {   
        contextHolder.remove();   
    }   
}  
