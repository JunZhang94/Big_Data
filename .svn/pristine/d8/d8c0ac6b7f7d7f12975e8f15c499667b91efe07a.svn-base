package com.jp.tic.system.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.system.dao.SystemConfigDao;
import com.jp.tic.utils.lang.StringUtil;

/**
 * 系统配置表对应类
 * @author lsg
 */

@SuppressWarnings("unchecked")
@Repository
public class SystemConfigDaoImpl extends BaseDao implements SystemConfigDao {

	/**
	 * 数据不多，一次性加载所有的系统配置信息
	 * @return 查询结果
	 */
	public List<Map<String, String>> findAllConfigDatas() {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select * from J_SYS_CONFIG where CODE LIKE 'FaultState_%'");
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		return datas;
	}
	
	/**
     * 加载配置信息
     * @return 查询结果
     * @author lsg
     */
	public List<Map<String, String>> loadAlarmSettingInfo() {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select * from J_SYS_CONFIG ");
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		return datas;
	}
	
	/**
	 * 保存或者更新设置信息
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int saveOrUpdateAlarmSettingInfo(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		if (StringUtil.equals(param.get("trouble_setting"), "true")) {
			if (StringUtil.checkObj(param.get("alarm_type_data"))) {
				String condition = this.packgeAlarmSettingUpdateSql(param);
				if (StringUtil.checkObj(condition)) {
					buffer.append("update J_SYS_CONFIG set");
					buffer.append(condition);
					buffer.append(" where code = 'FaultState_" + param.get("alarm_type_data") + "'");
				}
			}
		}
		try {
			if (!StringUtil.checkObj(buffer)) {
				saveFlag = 0;
			} else {
				saveFlag = this.updateBySql(buffer.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 组装更新条件语句
	 * @param param 请求参数
	 * @return 处理结果
	 */
	public String packgeAlarmSettingUpdateSql(Map<String, String> param) {
		StringBuffer buffer = new StringBuffer();
		if (StringUtil.checkObj(param.get("person_name"))) {
			buffer.append(" person = '" + param.get("person_name") + "'");
		}
		if (StringUtil.checkObj(param.get("alarm_type"))) {
			if (StringUtil.checkObj(param.get("person_name"))) {
				buffer.append(", value = '" + param.get("alarm_type") + "'");
			} else {
				buffer.append(" value = '" + param.get("alarm_type") + "'");
			}
		}
		return buffer.toString();
	}
	
	/**
	 * 更新是否启用报警设置复选框值
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateTroubleCheck(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update J_SYS_CONFIG set value = '" + param.get("trouble_setting") + "'");
		buffer.append(" where code = 'trouble_setting'");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
     * 查询操作日志配置
     * @return 查询结果
     * @author lsg
     */
	public List<Map<String, String>> findOperationLogConfig() {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select * from J_SYS_CONFIG where CODE LIKE 'operation%'");
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		return datas;
	}
	
	/**
     * 查询已启用操作日志
     * @return 查询结果
     * @author lsg
     */
	public List<Map<String, String>> findUsingLogConfig() {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select * from J_SYS_CONFIG where CODE LIKE 'operation%' and PERSON = '1'");
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		return datas;
	}
	
	/**
     * 根据code查询配置信息
     * @return 查询结果
     * @author lsg
     */
	public List<Map<String, String>> findConfigByCode(String code) {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select * from J_SYS_CONFIG where CODE = '" + code + "'");
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		return datas;
	}
	
	/**
	 * 保存或者更新设置信息
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateOperationSettingInfo(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		if (StringUtil.equals(param.get("log_setting"), "true")) {
			if (StringUtil.checkStr(param.get("operation_type"))) {
				String condition = this.packgeOperationUpdateSql(param);
				if (StringUtil.checkObj(condition)) {
					buffer.append("update J_SYS_CONFIG set");
					buffer.append(condition);
					buffer.append(" where code = 'operation_" + param.get("operation_type").toLowerCase() + "'");
				}
			}
		}
		try {
			if (!StringUtil.checkObj(buffer)) {
				saveFlag = 0;
			} else {
				saveFlag = this.updateBySql(buffer.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 组装更新条件语句
	 * @param param 请求参数
	 * @return 处理结果
	 */
	public String packgeOperationUpdateSql(Map<String, String> param) {
		StringBuffer buffer = new StringBuffer();
		if (StringUtil.checkStr(param.get("startTime"))) {
			if (StringUtil.checkStr(param.get("endTime"))) {
				String valueStr = param.get("startTime") + "-" + param.get("endTime");
				buffer.append(" VALUE = '" + valueStr + "'");
			}
		}
		if (StringUtil.checkStr(param.get("usingFlag"))) {
			String usingFlag = "0";
			if (StringUtil.equals(param.get("usingFlag"), "true")) {
				usingFlag = "1";
			}
			buffer.append(" ,PERSON = '" + usingFlag + "'");
		}
		return buffer.toString();
	}
	
	/**
	 * 更新是否启用操作类型复选框值
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateOperationCheck(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update J_SYS_CONFIG set value = '" + param.get("log_setting") + "'");
		buffer.append(" where code = 'log_setting'");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 更新首页展示方式标识
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateFirstPanelFlag(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update J_SYS_CONFIG set ");
		if (StringUtil.toInt(param.get("showPanel")) == 1) {
			buffer.append("value = 'panel'");
		} else if (StringUtil.toInt(param.get("showPanel")) == 2) {
			buffer.append("value = 'portal'");
		} else {
			buffer.append("value = 'search'");
		}
		buffer.append(" where code = 'tabPanelFlag'");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 使用用户表config_flag字段
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateUserConfigFlag(Map<String, String> param) {
		int updateFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update SYS_T_USER set ");
		if (StringUtil.toInt(param.get("showPanel")) == 1) {
			buffer.append("config_flag = 'panel'");
		} else if (StringUtil.toInt(param.get("showPanel")) == 2) {
			buffer.append("config_flag = 'portal'");
		} else {
			buffer.append("config_flag = 'search'");
		}
		buffer.append(" where user_code = '" + param.get("userCode") + "'");
		try {
			updateFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return updateFlag;
	}
	
	/**
	 * 更新卡口在线状态时间
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateOnlineStateTime(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update J_SYS_CONFIG set value = '" + param.get("onlineState") + "' where code = 'FaultState'");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 历史首页过车查询时间
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateCarTime(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update J_SYS_CONFIG set value = '" + param.get("carTime") + "' where code = 'first_page_car_days'");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 更新首页告警查询时间
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateAlarmTime(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update J_SYS_CONFIG set value = '" + param.get("alarmTime") + "' where code = 'first_page_alarm_days'");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	/**
	 * 假牌车分析一次分析的最大数据量
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateFakeCounts(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update J_SYS_CONFIG set value = '" + param.get("fakeCounts") + "' where code = 'fake_counts'");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 假牌车分析分析一次的时间长度
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateFakeTimes(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update J_SYS_CONFIG set value = '" + param.get("fakeTimes") + "' where code = 'fake_times'");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
     * 查询系统配置的假牌查询最大数据量
     * @return 查询结果
     * @author lsg
     */
	public List<Map<String, String>> findFakeCounts() {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select * from J_SYS_CONFIG where CODE = 'fake_counts'");
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		return datas;
	}
	
	/**
     * 查询系统配置的假牌查询的时间设置
     * @return 查询结果
     * @author lsg
     */
	public List<Map<String, String>> findFakeTimes() {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select * from J_SYS_CONFIG where CODE = 'fake_times'");
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		return datas;
	}
	
	/**
	 * 临近点分析一次性读取hbase数据总量
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateClosetLimit(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update J_SYS_CONFIG set value = '" + param.get("closetCounts") + "' where code = 'closet_limit'");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 卡口在线状态查询单线程分配的卡口数量
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateStatuNumber(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update J_SYS_CONFIG set value = '" + param.get("statuNumber") + "' where code = 'statuNumber'");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 更新历史过车查询方式状态
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateHistoryFlag(Map<String, String> param) {
		int updateFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update J_SYS_CONFIG set ");
		if (StringUtil.toInt(param.get("showDirectionPanel")) == 1) {
			buffer.append("value = 'mounts'");
		} else {
			buffer.append("value = 'directions'");
		}
		buffer.append(" where code = 'historyFlag'");
		try {
			updateFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return updateFlag;
	}
	
	/**
	 * 数据不多，一次性加载所有的昼伏夜出系统配置信息
	 * @return 查询结果
	 */
	public List<Map<String, String>> findAllNightAndDazedDatas() {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select * from J_SYS_CONFIG where CODE LIKE 'condtion_%'");
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		return datas;
	}

	@Override
	public List<Map<String, String>> getSaturations() throws Exception {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select distinct SERVER_IP,MAX_PROCESS_COUNT,PROCESSING_COUNT," +
				"WORKING_COUNT,CPU_USED_RATE from DEVICE_PROCESS_SERVER_INFO");
		datas = this.queryBySql(sqlBuffer.toString());
		return datas;
	}
}
