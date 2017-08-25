package com.jp.tic.system.controller;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.jp.tic.business.user.service.UserService;
import com.jp.tic.system.core.annotation.Log;

public class UserTest {
	
	
	/**
     * @param args
     */ 
	@Test
	@Log(value = "'用户新增布控信息'",needPersist= true,operation="ADD")
    public void testAopUser() { 
		//ApplicationContext ctx = SpringApplicationContextUtils.getContext();
		//UserService userService = (UserService)ctx.getBean("userService");
    	//UserService userService = SpringContextUtils.getApplicationContext().getBean(UserService.class);
        ApplicationContext context=new ClassPathXmlApplicationContext("resource/applicationContext-commons.xml"); 
        UserService userService = (UserService)context.getBean("userService");
        //UserDao dao=(UserDao)context.getBean("userDao"); 
        //dao.addUser(); 
    	userService.saveUserTest();
    	System.out.println("==================================");
    } 

}
