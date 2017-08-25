package com.jp.tic.system.entity;

import java.util.Date;

import org.aspectj.lang.ProceedingJoinPoint;

import com.jp.tic.system.core.annotation.Log;


/**
 * 基本日志类
 * @author HP
 *
 */
public abstract class BasicLog {
    public static int LOG_TYPE_LOGIN = 1;//登录日志类
    public static int LOG_TYPE_OPERATE = 2;//操作日志类
    
    public static final int LEVEL_INFO = 1;//信息等级
    public static final int LEVEL_WARN = 2;//警告等级
    public static final int LEVEL_ERROR = 3;//错误等级
    
    /**ip地址*/
    private String userIp;
    /**用户名*/
    private String userName;
    /**日志等级*/
    private int level = LEVEL_INFO;
    /**日志类型*/
    private String logType;
    /**日志时间*/
    private Date logDate;
    /**日志内容*/
    private String remark;
    /**错误原因*/
    private String errorReason;
    //重要查询条件
    private String content;
    
    /**
     * 操作成功后的日志的处理函数
     * @param annotationLog
     * @param basicLog
     * @param pjp
     * @return
     */
    public BasicLog processSuccess(Log annotationLog,BasicLog basicLog,ProceedingJoinPoint pjp){
        //basicLog.setRemark(basicLog.getRemark().substring(0,basicLog.getRemark().length()-3));
//        if(ActionContext.getContext() != null){
//            basicLog.setUserIp(ServletActionContext.getRequest().getRemoteAddr());
//            basicLog.setUserName(((User)ActionContext.getContext().getSession().get(User.CURRENT_USER)).getLoginName());
//        }
        //basicLog.setLevel(annotationLog.level() == 0 ? OperationLog.LEVEL_DEBUG : annotationLog.level());
        basicLog.setLogDate(new Date());
        return doProcessSuccess(annotationLog,basicLog,pjp);
    };
    /**
     * 操作成功后的日志的处理函数,交给子类完成
     * @param annotationLog
     * @param basicLog
     * @param pjp
     * @return
     */
    public abstract BasicLog doProcessSuccess(Log annotationLog,BasicLog basicLog,ProceedingJoinPoint pjp);
    /**
     * 操作失败后的日志的处理函数
     * @param annotationLog
     * @param basicLog
     * @param ex
     * @param pjp
     * @return
     */
    public BasicLog processException(Log annotationLog,BasicLog basicLog,Exception ex,ProceedingJoinPoint pjp){
        //basicLog.setRemark(basicLog.getRemark().substring(0,basicLog.getRemark().length()-3));
        basicLog.setLogDate(new Date());
        return doProcessException(annotationLog,basicLog,ex,pjp);
    };
    /**
     * 操作失败后的日志的处理函数，交给子类完成
     * @param annotationLog
     * @param basicLog
     * @param ex
     * @param pjp
     * @return
     */
    public abstract BasicLog doProcessException(Log annotationLog,BasicLog basicLog,Exception ex,ProceedingJoinPoint pjp);
    public String getUserIp() {
        return userIp;
    }
    public void setUserIp(String userIp) {
        this.userIp = userIp;
    }
    public int getLevel() {
        return level;
    }
    public void setLevel(int level) {
        this.level = level;
    }
    public Date getLogDate() {
        return logDate;
    }
    public void setLogDate(Date logDate) {
        this.logDate = logDate;
    }
    public String getRemark() {
        return remark;
    }
    public void setRemark(String remark) {
        this.remark = remark;
    }
    public String getLogType() {
        return logType;
    }
    public void setLogType(String logType) {
        this.logType = logType;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public String getErrorReason() {
        return errorReason;
    }
    public void setErrorReason(String errorReason) {
        this.errorReason = errorReason;
    }
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
    
}
