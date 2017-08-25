package com.jp.tic.system.service.impl;
import java.net.InetAddress;

import org.apache.commons.lang.StringUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.jp.tic.business.user.service.UserService;
import com.jp.tic.common.util.SpringApplicationContextUtils;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.base.BaseService;
import com.jp.tic.system.core.annotation.Log;
import com.jp.tic.system.entity.BasicLog;
import com.jp.tic.system.entity.UserLog;
import com.jp.tic.utils.BaseException;
import com.jp.tic.utils.lang.StringUtil;


@Service
public class LoggingAspectProcessorImpl extends LoggingAspectProcessor {

	private SpelExpressionParser parser = new SpelExpressionParser();

	@Override
	public Object process(ProceedingJoinPoint pjp) throws Throwable{
	    Object ret = null;
        Log annotationLog = ((MethodSignature) pjp.getSignature()).getMethod().getAnnotation(Log.class);
        
        //UserService userService = SpringContextUtils.getApplicationContext().getBean(UserService.class);
        //Map<String, Object> userMap = userService.getCurrentUser();
        //Map<String, Object> userMap = new HashMap<String, Object>();
        AbstractController  targetAction = null;
        //BaseActionSupport targetAction = null;
        
        String content = null;
        if (pjp.getTarget() instanceof AbstractController) {
            targetAction = (AbstractController) pjp.getTarget();
        }
        //创建日志实体
        BasicLog basicLog = null;
        if(annotationLog.entityClazz().equals(Integer.class)){//默认处理
            basicLog = new UserLog();
        //}else{
            //basicLog = (BasicLog) annotationLog.entityClazz().newInstance(); 
        }
        //日志类型
        basicLog.setLogType(annotationLog.operation());
        try {
            ret = pjp.proceed();
            if (annotationLog != null) {
                content = parser.parseExpression(annotationLog.value()).getValue(targetAction)+"";
                String importentInfo = parser.parseExpression(annotationLog.content()).getValue(targetAction)+"";
                basicLog.setContent(importentInfo);
                //当日志信息过长时，超过90个数字之后用省略号代替。
                content = StringUtils.abbreviate(content, 90)+ "成功。";
                //交给日志实体处理
                basicLog = basicLog.processSuccess(annotationLog, basicLog, pjp);
                basicLog.setRemark(content);
//                InetAddress addr = InetAddress.getLocalHost();
//                String userIp = addr.getHostAddress().toString();
//                basicLog.setUserIp(userIp);
                //处理http线程情况
                if(targetAction != null){
                    basicLog.setUserName(StringUtil.toString(targetAction.getCurrentUser().get("USER_NAME")));
                    //targetAction.getJsonResult().setMessage(content);
                    basicLog.setUserIp(StringUtil.toString(targetAction.getCurrentUser().get(AbstractController.SESSION_ID)));
                }
                //调用对应的service类保存日志实体
                if(annotationLog.needPersist() == true && !annotationLog.onlyLogException()){//处理只有当需要持久与不是只记录异常情况
                    //if(annotationLog.serviceClazz().equals(BaseService.class)){//默认处理
                	UserService userService = (UserService)SpringApplicationContextUtils.getContext().getBean("userService");
                	//UserService userService = SpringContextUtils.getApplicationContext().getBean(UserService.class);
                	userService.saveUserInfo((UserLog) basicLog);
                    //}else
                        //((BaseService)SpringContextUtils.getApplicationContext().getBean(annotationLog.serviceClazz())).save(basicLog);
                }
            }
        } catch (Exception ex) { 
            ex.printStackTrace();
            if (annotationLog != null) {
                content = parser.parseExpression(annotationLog.value()).getValue(targetAction)+ "失败。";
                if (ex instanceof BaseException) {
                    ((BaseException) ex).setMessage(ex.getMessage());
                }
                //basicLog.setErrorReason(ex.getMessage());
                basicLog.setRemark(content);
                String importentInfo = parser.parseExpression(annotationLog.content()).getValue(targetAction)+"";
                basicLog.setContent(importentInfo);
//                InetAddress addr = InetAddress.getLocalHost();
//                String userIp = addr.getHostAddress().toString();
//                basicLog.setUserIp(userIp);
                if(targetAction != null){
                    //处理http线程情况
                	basicLog.setUserName(StringUtil.toString(targetAction.getCurrentUser().get("USER_NAME")));
                    /*basicLog.setUserName(targetAction instanceof LoginAction ? parser.parseExpression("user.loginName").getValue(
                                targetAction).toString() : targetAction.getCurrentUser().getLoginName());*/
                    //targetAction.getJsonResult().setMessage(ex.getMessage());
                	basicLog.setUserIp(StringUtil.toString(targetAction.getCurrentUser().get(AbstractController.SESSION_ID)));
                }
                //交给日志实体处理
                basicLog = basicLog.processException(annotationLog, basicLog,ex,pjp);
                //处理只有当需要持久与不是只记录正常操作情况
                if(annotationLog.needPersist() == true && !annotationLog.onlyLogSuccess()){
                    if(annotationLog.serviceClazz().equals(BaseService.class)){//默认处理
                    	UserService userService = (UserService)SpringApplicationContextUtils.getContext().getBean("userService");
                    	//UserService userService = SpringContextUtils.getApplicationContext().getBean(UserService.class);
                    	userService.saveUserInfo((UserLog) basicLog);
                    //}else
                        //((BaseService)SpringContextUtils.getApplicationContext().getBean(annotationLog.serviceClazz())).save(basicLog);
                    }
                }
            }
            throw ex;
        }
		return ret;
	}
}
