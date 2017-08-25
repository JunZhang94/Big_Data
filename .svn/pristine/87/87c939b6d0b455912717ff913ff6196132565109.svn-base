package com.jp.tic.system.controller;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.jp.tic.system.service.impl.LoggingAspectProcessor;


/**
 * 日志切面，对声明了{@link com.gosun.core.aop.annotation.Log}的方法进行业务日志记录。其中要填写内容为Log的内容
 * 
 * 默认对记录当前用户，当前时间，当前IP，所操作的业务内容(为SpringEl表达式语法)，无论成功与否都会记录。
 * 
 * <br>具体实现委托了{@link com.jp.tic.system.core.annotation.LoggingAspectProcessor},如果需要二次开发就需要继承LoggingAspectProcessor
 * 
 * @author Abe
 */
@Aspect
public class LoggingAspect {
	
	@Autowired
	@Qualifier("loggingAspectProcessorImpl")
	private LoggingAspectProcessor processor;

	@Around("@annotation(com.jp.tic.system.core.annotation.Log)")
//	@Around("execution( * cn.tisson.pms.dao..*(..))")
	public Object log(ProceedingJoinPoint pjp) throws Throwable {
		return processor.process(pjp);
	}
}
