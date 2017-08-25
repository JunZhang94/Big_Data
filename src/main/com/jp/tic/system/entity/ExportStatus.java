package com.jp.tic.system.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * 导出状态
 * @author lsg
 *
 */
public class ExportStatus implements Serializable {
	
	private static final long serialVersionUID = -5849440571042660123L;
	
    public static Integer PROCESSING_STATUS = 0;
    public static Integer END_STATUS = 1;
    public static Integer ERROR_STATUS = 2;
    public static Integer CANCEL_STATUS = 3;
    
    public static String EXPORT_TYPE_ASYN = "ASYN";
    public static String EXPORT_TYPE_SYN = "SYN";
    
    
    private String id;
    private Long userID;
    private Date startTime;
    private Date endTime; 
    private Integer status;
    private String msg;
    private String type;
    private String fileName;
    
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public Long getUserID() {
        return userID;
    }
    public void setUserID(Long userID) {
        this.userID = userID;
    }
    public Date getStartTime() {
        return startTime;
    }
    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }
    public Date getEndTime() {
        return endTime;
    }
    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }
    public Integer getStatus() {
        return status;
    }
    public void setStatus(Integer status) {
        this.status = status;
    }
    public String getMsg() {
        return msg;
    }
    public void setMsg(String msg) {
        this.msg = msg;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getFileName() {
        return fileName;
    }
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
}
