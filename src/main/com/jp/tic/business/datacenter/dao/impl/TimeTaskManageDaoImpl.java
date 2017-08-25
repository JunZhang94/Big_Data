package com.jp.tic.business.datacenter.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import com.jp.tic.business.datacenter.dao.TimeTaskManageDao;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
/**
 * 定时任务管理
 * @author jzxie
 * @time 2014-09-25 14:01
 */

@SuppressWarnings("unchecked")
@Repository
public class TimeTaskManageDaoImpl extends BaseDao implements TimeTaskManageDao {

	/**
	 * 获取定时任务管理信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> taskManageInfo(Map<String, String> param) {
		List<Map<String,String>> result = null;
		int pageStarte = StringUtil.toInteger(param.get("page.start"));
		int rows = StringUtil.toInteger(param.get("page.limit"));
		StringBuffer strbuffer = new StringBuffer();
		strbuffer.append("select a.* from dis_task a where 1=1");
		strbuffer.append(this.packageSeachSql(param));
        String strSql = this.initPageSql(pageStarte, rows, strbuffer.toString());
        try {
        	result = this.queryBySql(strSql);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return result;
	}
	
	/**
	 * 获取定时任务管理的数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> taskManageCount(Map<String, String> param) {
		List<Map<String,String>> counts = null;
		StringBuffer sqlbuffer = new StringBuffer();
		sqlbuffer.append("select count(1) as COUNTS from dis_task a where 1=1");
		sqlbuffer.append(this.packageSeachSql(param));
		try {
			String sqlstr = sqlbuffer.toString();
			counts = this.queryBySql(sqlstr);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
		return counts;
	}
	/**
	 * 组装分页查询语句
	 * @param pageStart 开始位置
	 * @param rows 每行显示多少数据量
	 * @param seachSql 数据查询语句
	 * @return 分页语句
	 */
	public String initPageSql(int pageStart, int rows, String seachSql) {
		StringBuffer pageSql = new StringBuffer(); 
		if (pageStart == 0) {
            pageSql.append("select * from (");
            pageSql.append(seachSql + ") row_ where rownum <=" + rows);
        } else {
            int nextStart = pageStart + rows;
            pageSql.append(" select * from ( select row_.*, rownum rownum_ from (");
            pageSql.append(seachSql + ") row_ where rownum <= " + nextStart +") where rownum_ > " + pageStart);
        }
		return pageSql.toString();
	}
	
	/**
	 * 公用的条件语句
	 * @param param 查询条件
	 * @return 返回结果
	 */
    public String packageSeachSql(Map<String ,String> param){
    	StringBuffer buffer = new StringBuffer();
    
    	//车牌号
    	if(StringUtil.checkStr(param.get("car_num"))){
			buffer.append(" and a.car_num =UPPER('"+param.get("car_num")+"')");
		}
    	
    	/*
		//有效时间
		if(StringUtil.checkStr(param.get("valid_time"))){
			buffer.append(" and a.valid_time <="+param.get("valid_time"));
		}
		
    	//跟随卡口数
    	if(StringUtil.checkStr(param.get("follow_times"))){
			buffer.append(" and a.follow_times <="+param.get("follow_times"));
		}
    	*/
    	
    	//卡口编号， 只要存在一个，就可以搜索出来
    	String mounts_number = param.get("mounts_number");
    	if(StringUtil.checkStr(mounts_number)){
    		String[] mounts_number_array = mounts_number.split(",");
    		for(int i = 0; i < mounts_number_array.length; i++){
    			if(i == 0){
    				buffer.append(" and (a.mounts_number like '%"+mounts_number_array[i]+"%'");
    			}else{
    				buffer.append(" or a.mounts_number like '%"+mounts_number_array[i]+"%'");
    			}
    		}
    		buffer.append(") ");
			//buffer.append(" and a.mounts_name ='"+param.get("mounts_name")+"'");
		}
    	
    	
    	//任务名称
        if(StringUtil.checkStr(param.get("taskName")) && !StringUtil.equals(param.get("taskName"), "-1")){
    		buffer.append(" and a.task_name like '"+(param.get("taskName"))+"%'");
    	}
        //状态
        if(StringUtil.checkStr(param.get("status")) && !StringUtil.equals(param.get("status"), "-1")){
        	if(!StringUtil.equals(param.get("status"), "其他")){
            	buffer.append(" and a.status = '"+param.get("status")+"'");
        	}else{
        		buffer.append(" and a.status not in ('启动','结束')");
        	}
        }
        if (StringUtil.checkStr(param.get("userCode"))) {
    		buffer.append(" and (user_code = '" + param.get("userCode") + "' or user_code is null)");
    	}
        //时间
    	if(StringUtil.checkStr(param.get("startTime")) && StringUtil.checkStr(param.get("endTime"))){
    		buffer.append(" and a.FOLLOW_START_TIME >=to_date('"+param.get("startTime")+"','yyyy-MM-dd HH24:mi:ss') and a.FOLLOW_END_TIME <= to_date('"+param.get("endTime")+"','yyyy-MM-dd HH24:mi:ss') order by a.id desc");
    	}
    	return buffer.toString();
    }
    
    /**
     * 提交跟随车分析任务
     * @param param 查询参数
     * @return 处理结果
     */
    public int commitTaskInfo(Map<String ,String> param) {
    	int saveFlag = 0;
    	String[] dateStr = param.get("startTime").split(" ")[0].split("-");
		String[] timeStr = param.get("startTime").split(" ")[1].split(":");
		String timesDesc = dateStr[0] + dateStr[1] + dateStr[2] + "-" + timeStr[0] + timeStr[1] + timeStr[2];
		StringBuffer buffer = new StringBuffer();
		buffer.append("insert into DIS_TASK(ID,JOB_ID,TASK_NAME,START_TIME,END_TIME,FOLLOW_START_TIME,FOLLOW_END_TIME,STATUS,TASK_UPDATE_TIME,USER_CODE,CAR_NUM,VALID_TIME,FOLLOW_TIMES,MOUNTS_NUMBER,MOUNTS_NAME,RESULT) " +
				"values (" + param.get("taskId"));
		buffer.append(",6");
		buffer.append(",'跟随车分析" + timesDesc + "'");
		buffer.append(",to_date('" + param.get("startTime") + "','yyyy-mm-dd HH24:mi:ss')");
		buffer.append(",to_date('" + param.get("endTime") + "','yyyy-mm-dd HH24:mi:ss')");
		buffer.append(",to_date('" + param.get("startTime") + "','yyyy-mm-dd HH24:mi:ss')");
		buffer.append(",to_date('" + param.get("endTime") + "','yyyy-mm-dd HH24:mi:ss')");
		buffer.append(",'启动'");
		String nowTime = DateUtil.getCurrentDateTime();
		buffer.append(",to_date('" + nowTime + "','yyyy-mm-dd HH24:mi:ss')");
		buffer.append(",'" + param.get("userCode") + "'");
		if (StringUtil.checkObj(param.get("carNum"))) {
			buffer.append(",'" + (param.get("carNum")).toUpperCase() + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("vilidTime"))) {
			buffer.append("," + param.get("vilidTime"));
		} else {
			buffer.append(",");
		}
		if (StringUtil.checkObj(param.get("kakouTimes"))) {
			buffer.append("," + param.get("kakouTimes"));
		} else {
			buffer.append(",");
		}
		if (StringUtil.checkObj(param.get("kkbhs"))) {
			buffer.append(",'" + param.get("kkbhs") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("kkmcs"))) {
			buffer.append(",'" + param.get("kkmcs") + "'");
		} else {
			buffer.append(",''");
		}
		buffer.append(",'正在分析'");
		buffer.append(")"); 
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
    }
}
