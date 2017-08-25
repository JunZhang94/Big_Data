package com.jp.tic.system.entity;

import java.io.Serializable;
import java.util.Date;

import javax.servlet.http.HttpSession;

import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.googlecode.jsonplugin.annotations.JSON;
import com.jp.tic.system.core.annotation.Log;
import com.jp.tic.system.util.Constants;
/**
 * 用户日志
 * @author hdh
 *
 */
public class UserLog extends BasicLog implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = -3542398130408713503L;
    public static final int RESULT_SUCCESS = Constants.OPER_RESULT_SUCCESS;
    
    private Long id;                            //id
    private Date logDate;                       //记录日期
    private String userName;                     //用户名
    private String userIp;                      //用户IP
    private String logType;                    //日志类型
    private String remark;                      //备注
    private String errorReason;
    private String content;                    //重要查询条件

    @Override
    public BasicLog doProcessSuccess(Log annotationLog, BasicLog basicLog,
            ProceedingJoinPoint pjp) {
        try{
        	HttpSession httpSession = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest().getSession();
            //HttpSession httpSession = ServletActionContext.getRequest().getSession();
            basicLog.setUserName("测试人员...");
            basicLog.setUserIp((String)httpSession.getAttribute("userIP"));
        }catch(NullPointerException e){
            
        }
       return basicLog;
    }

    @Override
    public BasicLog doProcessException(Log annotationLog, BasicLog basicLog,
            Exception ex, ProceedingJoinPoint pjp) {
        try {
        	HttpSession httpSession = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest().getSession();
            //HttpSession httpSession = ServletActionContext.getRequest().getSession();
            basicLog.setUserIp((String)httpSession.getAttribute("userIP"));
        } catch (NullPointerException e) {
            
        }
        return basicLog;
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    @JSON(format="yyyy-MM-dd HH:mm:ss")
    public Date getLogDate() {
        return logDate;
    }

    public void setLogDate(Date logDate) {
        this.logDate = logDate;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserIp() {
        return userIp;
    }

    public void setUserIp(String userIp) {
        this.userIp = userIp;
    }

    public String getLogType() {
        return logType;
    }

    public void setLogType(String logType) {
        this.logType = logType;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getErrorReason() {
        return errorReason;
    }

    public void setErrorReason(String errorReason) {
        this.errorReason = errorReason;
    }

	/**
	 * @return the content
	 */
	public String getContent() {
		return content;
	}

	/**
	 * @param content the content to set
	 */
	public void setContent(String content) {
		this.content = content;
	}
    
    
}
