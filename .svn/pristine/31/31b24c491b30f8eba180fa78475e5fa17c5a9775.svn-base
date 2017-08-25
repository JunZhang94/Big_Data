package com.jp.tic.system.service.impl;

import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.stereotype.Service;

/**
 *  记录系统业务逻辑的处理器类，通过继承些类实现对业务日志的业务逻辑
 * @author Abe
 *
 */
@Service
public class LoggingAspectProcessor {
	public Object process(ProceedingJoinPoint pjp) throws Throwable{
		return pjp.proceed();
	}
}
