package com.jp.tic.system.core.annotation;


import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.jp.tic.system.base.BaseService;


/**
 * 
 * 日志接口实体内容
 * @author Abe
 *
 */

@Target({ElementType.METHOD, ElementType.TYPE,ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface Log {
    
    public static int LOG_TYPE_LOGIN = 1;//登录日志
    public static int LOG_TYPE_OPERATE = 2;//操作日志
    
    /**用户登录名**/
    String loginName() default "";
    /**用户名**/
    String userName() default "";
    /**机构名**/
    String userOrgName() default "";
    /**设备机构名**/
    String deviceOrgName() default "";
    /**操作范围**/
    String scope() default "";
    /**操作对象**/
    String object() default "";
    /**操作**/
    String operation() default "";
    /**操作内容**/
    String value() default "";
    /**日志等级**/
    int level() default 1;
    /**日志类型**/
    int type() default LOG_TYPE_OPERATE;
    /**需要处理的日志类型*/
    Class<?> entityClazz() default Integer.class;
    /**需要保存的日志的服务类*/
    Class<?> serviceClazz() default BaseService.class;
    /**是否需要持久化,默认否*/
    boolean needPersist() default false;
    
    boolean onlyLogSuccess() default false;;

    boolean onlyLogException() default false;;
    
    //操作主要类容
    String content() default "";
}

