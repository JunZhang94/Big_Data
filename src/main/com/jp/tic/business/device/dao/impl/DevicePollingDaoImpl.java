package com.jp.tic.business.device.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jp.tic.business.device.dao.DevicePollingDao;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.utils.lang.StringUtil;

@SuppressWarnings("unchecked")
@Repository
public class DevicePollingDaoImpl extends BaseDao implements DevicePollingDao {
	
	/**
	 * 分页查询人工巡检信息数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryDevicePollingInfo(Map<String, String> param) {
		int pageStart = StringUtil.toInteger(param.get("page.start"));
        int rows = StringUtil.toInteger(param.get("page.limit"));
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select j.id,j.device_id,j.device_name,"+
		"j.job_number,j.polling_name,j.polling_time,j.phone_number,j.contact_address,j.poling_remarck from"+
		" J_DEVICE_POLLING J, mount_tab a, MGMTDEPT_TAB b, AREA_TAB c,DEVICEINFO_TAB d where"+
		" J.DEVICE_ID = d.sbbh and d.sskkbh = a.kkbh and a.dwbh = b.dwbh and  b.dwxzqh = c.qydm ");
		buffer.append(this.packageSeachSql(param));
		String pageSql = this.initPageSql(pageStart, rows, buffer.toString());
		try {
			datas = this.queryBySql(pageSql);
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 统计人工登记巡检数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countDevicePollingDatas(Map<String, String> param) {
		List<Map<String, String>> counts = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select count(*) as COUNTS from (select j.id,j.device_id,j.device_name,"+
		"j.job_number,j.polling_name,j.polling_time,j.phone_number,j.contact_address,j.poling_remarck from"+
		" J_DEVICE_POLLING J, mount_tab a, MGMTDEPT_TAB b, AREA_TAB c,DEVICEINFO_TAB d where"+
		" J.DEVICE_ID = d.sbbh and d.sskkbh = a.kkbh and a.dwbh = b.dwbh and  b.dwxzqh = c.qydm ");
		sqlBuffer.append(this.packageSeachSql(param));
		sqlBuffer.append(")");
		try {
			counts = this.queryBySql(sqlBuffer.toString());
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
	 * 组装查询语句
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public String packageSeachSql(Map<String, String> param) {
		StringBuffer buffer = new StringBuffer();
		if (StringUtil.equals(param.get("orgType"), "0")) {
			buffer.append(" and c.qydm = '" + param.get("code") + "'");
    		
	    }
	    if (StringUtil.equals(param.get("orgType"), "1")) {
	    	buffer.append(" and b.dwbh = '" + param.get("code") + "'");
    		
	    }
	    if (StringUtil.equals(param.get("orgType"), "2")) {
	    	buffer.append(" and d.sskkbh = '440" + param.get("code") + "'");
    		
	    }
	    if (StringUtil.equals(param.get("orgType"), "3")) {
	    	buffer.append(" and j.device_id = '" + param.get("code") + "'");
    		
	    }
	    if (StringUtil.checkStr(param.get("userName"))) {
	    	buffer.append(" and j.polling_name = '" + param.get("userName") + "'");
    		
	    }
		return buffer.toString();
	}
	
	/**
	 * 添加设备
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addDevicePollingInfo(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("insert into J_DEVICE_POLLING(ID,DEVICE_ID,DEVICE_NAME,JOB_NUMBER,POLLING_NAME,POLLING_TIME," +
				"PHONE_NUMBER,CONTACT_ADDRESS,POLING_REMARCK) values (");
		buffer.append("SEQ_J_DEVICE_POLLING.NEXTVAL");
		buffer.append(",'" + param.get("deviceNumber") + "'");
		buffer.append(",'" + param.get("deviceName") + "'");
		if (StringUtil.checkObj(param.get("jobNumber"))) {
			buffer.append(",'" + param.get("jobNumber") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("pollingName"))) {
			buffer.append(",'" + param.get("pollingName") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("pollingTime"))) {
			buffer.append(",to_date('" + param.get("pollingTime") + "','YYYY-MM-DD')");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("phoneNumber"))) {
			buffer.append(",'" + param.get("phoneNumber") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("contactAddress"))) {
			buffer.append(",'" + param.get("contactAddress") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("polingRemarck"))) {
			buffer.append(",'" + param.get("polingRemarck") + "'");
		} else {
			buffer.append(",''");
		}
		buffer.append(")"); 
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 删除人工巡检记录
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteDevicePollingInfo(Map<String, String> param) {
		int deleteFlag = 0;
		StringBuffer buffer = new StringBuffer();
		String[] ids = param.get("idStr").split(",");
		String idStr = "";
		for (int i = 0; i < ids.length; i++) {
			if (StringUtil.checkStr(idStr)) {
				idStr += ",";
			}
			idStr += ids[i];
		}
		buffer.append("delete from J_DEVICE_POLLING where id in (" + idStr + ")");
		try {
			deleteFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return deleteFlag;
	}
	
	/**
	 * 更新人工巡检记录
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateDevicePollingInfo(Map<String, String> param) { 
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update J_DEVICE_POLLING set");
		if (StringUtil.checkObj(param.get("pollingName"))) {
			buffer.append(" POLLING_NAME = '" + param.get("pollingName") + "'");
		}
		if (StringUtil.checkObj(param.get("jobNumber"))) {
			buffer.append(",JOB_NUMBER = '" + param.get("jobNumber") + "'");
		} 
		if (StringUtil.checkObj(param.get("pollingTime"))) {
			buffer.append(", POLLING_TIME = to_date('" + param.get("pollingTime") + "','YYYY-MM-DD')");
		}
		if (StringUtil.checkObj(param.get("phoneNumber"))) {
			buffer.append(", PHONE_NUMBER = '" + param.get("phoneNumber") + "'");
		}
		if (StringUtil.checkObj(param.get("contactAddress"))) {
			buffer.append(", CONTACT_ADDRESS = '" + param.get("contactAddress") + "'");
		}
		if (StringUtil.checkObj(param.get("polingRemarck"))) {
			buffer.append(", POLING_REMARCK = '" + param.get("polingRemarck") + "'");
		}
		buffer.append(" where id = '" + param.get("id") + "'");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 修改人工巡检记录，加载要修改的数据信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initDevicePollingDetailInfo(Map<String, String> param) {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from J_DEVICE_POLLING where 1=1");
		buffer.append(this.packageSeachSql(param));
		try {
			datas = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 统计设备巡检
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryPollingStatisticsInfo(Map<String, String> param) {
		param.put("produce", "sp_device_polling(?,?,?,?,?,?)");
		List<Map<String, String>> datas =  this.queryDeviceStatisticsReport(param);
		return datas;
	}
}
