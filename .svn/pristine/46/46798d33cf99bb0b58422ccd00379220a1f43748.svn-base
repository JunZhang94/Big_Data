package com.jp.tic.business.device.dao.impl;

import java.util.List;
import java.util.Map;

import org.aspectj.weaver.ast.Var;
import org.springframework.stereotype.Repository;

import com.jp.tic.business.device.dao.DeviceManagerDao;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.system.util.ConstantUtil;
import com.jp.tic.utils.lang.StringUtil;

@SuppressWarnings("unchecked")
@Repository
public class DeviceManagerDaoImpl extends BaseDao implements DeviceManagerDao {

	/**
	 * 分页查询设备信息数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryDeviceInfo(Map<String, String> param) {
		int pageStart = StringUtil.toInteger(param.get("page.start"));
        int rows = StringUtil.toInteger(param.get("page.limit"));
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from DEVICEINFO_TAB where 1=1");
		buffer.append(this.packageSeachSql(param));
		StringBuffer pageSql = new StringBuffer(); 
		if (pageStart == 0) {
            pageSql.append("select * from (");
            pageSql.append(buffer.toString() + ") row_ where rownum <=" + rows);
        } else {
            int nextStart = pageStart + rows;
            pageSql.append(" select * from ( select row_.*, rownum rownum_ from (");
            pageSql.append(buffer.toString() + ") row_ where rownum <= " + nextStart +") where rownum_ > " + pageStart);
        }
		try {
			datas = this.queryBySql(pageSql.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 统计设备数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countDeviceDatas(Map<String, String> param) {
		List<Map<String, String>> counts = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select count(*) as COUNTS from DEVICEINFO_TAB where 1=1");
		sqlBuffer.append(this.packageSeachSql(param));
		try {
			counts = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return counts;
	}
	
	/**
	 * 组装查询语句
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public String packageSeachSql(Map<String, String> param) {
		StringBuffer buffer = new StringBuffer();
		if (StringUtil.checkObj(param.get("deviceNumber"))) {
			buffer.append(" and sbbh = '" + param.get("deviceNumber") + "'");
		}
		if (StringUtil.checkObj(param.get("deviceName"))) {
			buffer.append(" and sbmc like '%" + param.get("deviceName") + "%'");
		}
		if (StringUtil.checkObj(param.get("code"))) {
			buffer.append(" and SSKKBH = '440" + param.get("code") + "'");
		}
		return buffer.toString();
	}
	
	/**
	 * 添加设备
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addDeviceInfo(Map<String, String> param) { 
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("insert into DEVICEINFO_TAB(SBBH,JD,WD,SBMC,SBZT,IPDZ,DKH,SBLX,DLMC,DLMM,SBCJ,SSDW,SBFX,SSKKBH) values ('" + param.get("SBBH") + "'");
		if (StringUtil.checkObj(param.get("JD"))) {
			buffer.append("," + param.get("JD"));
		} else {
			buffer.append(",");
		}
		if (StringUtil.checkObj(param.get("WD"))) {
			buffer.append("," + param.get("WD"));
		} else {
			buffer.append(",");
		}
		if (StringUtil.checkObj(param.get("SBMC"))) {
			buffer.append(",'" + param.get("SBMC") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("SBZT"))) {
			buffer.append(",'" + param.get("SBZT") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("IPDZ"))) {
			buffer.append(",'" + param.get("IPDZ") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("DKH"))) {
			buffer.append(",'" + param.get("DKH") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("SBLX"))) {
			buffer.append(",'" + param.get("SBLX") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("DLMC"))) {
			buffer.append(",'" + param.get("DLMC") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("DLMM"))) {
			buffer.append(",'" + param.get("DLMM") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("SBCJ"))) {
			buffer.append(",'" + param.get("SBCJ") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("SSDW"))) {
			buffer.append(",'" + param.get("SSDW") + "'");
		} else {
			buffer.append(",''");
		}
		
		if (StringUtil.checkObj(param.get("SBFX"))) {
			buffer.append(",'" + param.get("SBFX") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("KKBH"))) {
			buffer.append(",'" + param.get("KKBH") + "'");
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
	 * 删除设备
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteDeviceInfo(Map<String, String> param) {
		int deleteFlag = 0;
		StringBuffer buffer = new StringBuffer();
		String[] SBBHS = param.get("SBBHS").split(",");
		String idStr = "";
		for (int i = 0; i < SBBHS.length; i++) {
			if (StringUtil.checkStr(idStr)) {
				idStr += ",";
			}
			idStr += "'" + SBBHS[i] + "'";
		}
		buffer.append("delete from DEVICEINFO_TAB where SBBH in (" + idStr + ")");
		try {
			deleteFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return deleteFlag;
	}
	
	/**
	 * 查询设备状态信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryDeviceState(Map<String, String> param) {
		int pageStart = StringUtil.toInteger(param.get("page.start"));
        int rows = StringUtil.toInteger(param.get("page.limit"));
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append(this.packageStateSeachSql(param));
		StringBuffer pageSql = new StringBuffer(); 
		if (pageStart == 0) {
            pageSql.append("select * from (");
            pageSql.append(buffer.toString() + ") row_ where rownum <=" + rows);
        } else {
            int nextStart = pageStart + rows;
            pageSql.append(" select * from ( select row_.*, rownum rownum_ from (");
            pageSql.append(buffer.toString() + ") row_ where rownum <= " + nextStart +") where rownum_ > " + pageStart);
        }
		try {
			datas = this.queryBySql(pageSql.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 统计设备状态数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countDeviceStateCounts(Map<String, String> param) {
		List<Map<String, String>> counts = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select count(*) as COUNTS from (");
		sqlBuffer.append(this.packageStateSeachSql(param));
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
	 * 组装设备状态查询语句
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public String packageStateSeachSql(Map<String, String> param) {
		StringBuffer buffer = new StringBuffer();
		buffer.append("select a.ztxh, a.sbbh, a.scsj, a.dqzt,a.gzsj from DEVICESTATE_TAB a, (select max(SCSJ) maxtime,SBBH from DEVICESTATE_TAB where 1 = 1");
		if (StringUtil.checkObj(param.get("deviceStateNumber"))) {
			buffer.append(" and SBBH = '" + param.get("deviceStateNumber") + "'");
		}
		if (StringUtil.checkObj(param.get("deviceState"))) {
			buffer.append(" and DQZT like '%" + param.get("deviceState") + "%'");
		}
		buffer.append(" group by SBBH ) b where a.SCSJ=b.maxtime and a.SBBH=B.SBBH");
		return buffer.toString();
	}
	
	/**
	 * 查询设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryDeviceTroubleState(Map<String, String> param) {
		int pageStart = StringUtil.toInteger(param.get("page.start"));
        int rows = StringUtil.toInteger(param.get("page.limit"));
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append(this.packageTroubleSeachSql(param));
		StringBuffer pageSql = new StringBuffer(); 
		if (pageStart == 0) {
            pageSql.append("select * from (");
            pageSql.append(buffer.toString() + ") row_ where rownum <=" + rows);
        } else {
            int nextStart = pageStart + rows;
            pageSql.append(" select * from ( select row_.*, rownum rownum_ from (");
            pageSql.append(buffer.toString() + ") row_ where rownum <= " + nextStart +") where rownum_ > " + pageStart);
        }
		try {
			datas = this.queryBySql(pageSql.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 统计设备故障数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countDeviceTroubleCounts(Map<String, String> param) {
		List<Map<String, String>> counts = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select count(*) as COUNTS from (");
		sqlBuffer.append(this.packageTroubleSeachSql(param));
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
	 * 组装设备故障查询语句
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public String packageTroubleSeachSql(Map<String, String> param) {
		StringBuffer buffer = new StringBuffer();
		buffer.append("select a.ztxh, a.sbbh, a.scsj, a.gzzt1,a.gzsj from DEVICESTATE_TAB a, (select max(GZSJ) maxtime,SBBH from DEVICESTATE_TAB where 1 = 1");
		if (StringUtil.checkObj(param.get("deviceNumber"))) {
			buffer.append(" and SBBH = '" + param.get("deviceNumber") + "'");
		}
		if (StringUtil.checkObj(param.get("troubleState"))) {
			buffer.append(" and GZZT1 like '%" + param.get("troubleState") + "%'");
		}
		buffer.append(" group by SBBH ) b where a.GZSJ=b.maxtime and a.SBBH=B.SBBH and A.GZZT1 IS NOT NULL");
		return buffer.toString();
	}
	
	/**
	 * 更新设备信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateDeviceInfo(Map<String, String> param) { 
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update DEVICEINFO_TAB set");
		if (StringUtil.checkObj(param.get("SBMC"))) {
			buffer.append(" SBMC = '" + param.get("SBMC") + "'");
		} 
		if (StringUtil.checkObj(param.get("JD"))) {
			buffer.append(", JD = " + param.get("JD"));
		}
		if (StringUtil.checkObj(param.get("WD"))) {
			buffer.append(", WD = " + param.get("WD"));
		}
		if (StringUtil.checkObj(param.get("SBZT"))) {
			buffer.append(", SBZT = '" + param.get("SBZT") + "'");
		}
		if (StringUtil.checkObj(param.get("IPDZ"))) {
			buffer.append(", IPDZ = '" + param.get("IPDZ") + "'");
		}
		if (StringUtil.checkObj(param.get("DKH"))) {
			buffer.append(", DKH = '" + param.get("DKH") + "'");
		}
		if (StringUtil.checkObj(param.get("SBLX"))) {
			buffer.append(", SBLX = '" + param.get("SBLX") + "'");
		}
		if (StringUtil.checkObj(param.get("DLMC"))) {
			buffer.append(", DLMC = '" + param.get("DLMC") + "'");
		}
		if (StringUtil.checkObj(param.get("DLMM"))) {
			buffer.append(", DLMM = '" + param.get("DLMM") + "'");
		}
		if (StringUtil.checkObj(param.get("SBCJ"))) {
			buffer.append(", SBCJ = '" + param.get("SBCJ") + "'");
		}
		if (StringUtil.checkObj(param.get("SSDW"))) {
			buffer.append(", SSDW = '" + param.get("SSDW") + "'");
		}
		
		if (StringUtil.checkObj(param.get("SBFX"))) {
			buffer.append(", SBFX = '" + param.get("SBFX") + "'");
		}
		if (StringUtil.checkObj(param.get("KKBH"))) {
			buffer.append(", SSKKBH = '" + param.get("KKBH") + "'");
		}
		buffer.append(" where SBBH = '" + param.get("SBBH") + "'");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 修改设备数据，加载要修改的数据信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initDeviceDetailInfo(Map<String, String> param) {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from DEVICEINFO_TAB where 1=1");
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
	 * 获取所有的设备信息，因为没有引入权限控制
	 * @return 查询结果
	 */
	public List<Map<String, String>> findAllDeviceInfo() {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from DEVICEINFO_TAB");
		try {
			datas = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 保存设备监听的设备状态信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int saveDeviceInfo(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("insert into DEVICESTATE_TAB(ZTXH,SBBH,SCSJ,DQZT,GZSJ) values (SEQ_DEVICESTATE_TAB.NEXTVAL");
		if (StringUtil.checkObj(param.get("ID"))) {
			buffer.append("," + param.get("ID"));
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("updateDate"))) {
			buffer.append(",to_date('" + param.get("updateDate") + "','yyyy-MM-dd HH24:mi:ss')");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("ALARM_TYPE"))) {
			buffer.append(",'" + param.get("ALARM_TYPE") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("PASS_TIME"))) {
			buffer.append(",to_date('" + param.get("PASS_TIME") + "','yyyy-MM-dd HH24:mi:ss')");
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
	 * 添加设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addDeviceTroubleInfo(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("insert into DEVICESTATE_TAB(ZTXH,SBBH,DEVICE_NAME,REGISTER_PERSON,LINK_PHONE,REGISTER_FLAG,SCSJ,GZSJ,GZZT1,REMARCK) values (SEQ_DEVICESTATE_TAB.NEXTVAL");
		if (StringUtil.checkObj(param.get("deviceNumber"))) {
			buffer.append(",'" + param.get("deviceNumber") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("deviceName"))) {
			buffer.append(",'" + param.get("deviceName") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("userName"))) {
			buffer.append(",'" + param.get("userName") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("linkPhone"))) {
			buffer.append(",'" + param.get("linkPhone") + "'");
		} else {
			buffer.append(",''");
		}
		buffer.append(",1"); //标记为人工登记
		if (StringUtil.checkObj(param.get("updateDate"))) {
			buffer.append(",to_date('" + param.get("updateDate") + "','yyyy-MM-dd HH24:mi:ss')");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("troubleTime"))) {
			buffer.append(",to_date('" + param.get("troubleTime") + "','yyyy-MM-dd HH24:mi:ss')");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("troubleType"))) {
			buffer.append(",'" + param.get("troubleType") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("troubleRemarck"))) {
			buffer.append(",'" + param.get("troubleRemarck") + "'");
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
	 * 检查是否存在此设备的故障信息
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> checkDeviceTroubleInfo(Map<String, String> param) {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from DEVICESTATE_TAB where SBBH = '" + param.get("SBBH") + "'");
		try {
			datas = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 更新设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateDeviceTroubleInfo(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update DEVICESTATE_TAB set");
		if (StringUtil.checkObj(param.get("troubleType"))) {
			buffer.append(" GZZT1 = '" + param.get("troubleType") + "'");
		} 
		if (StringUtil.checkObj(param.get("troubleTime"))) {
			buffer.append(", GZSJ = to_date('" + param.get("troubleTime") + "','yyyy-MM-dd HH24:mi:ss')");
		}
		if (StringUtil.checkObj(param.get("troubleRemarck"))) {
			buffer.append(", REMARCK = '" + param.get("troubleRemarck") + "'");
		}
		buffer.append(" where ZTXH = '" + param.get("id") + "'");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 修改设备数据，加载要修改的数据信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initDeviceTroubleDetailInfo(Map<String, String> param) {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from DEVICESTATE_TAB where ZTXH = '" + param.get("id") + "'");
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
	 * 删除设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteDeviceTroubleInfo(Map<String, String> param) {
		int deleteFlag = 0;
		StringBuffer buffer = new StringBuffer();
		String[] ZTXHS = param.get("idStr").split(",");
		String idStr = "";
		for (int i = 0; i < ZTXHS.length; i++) {
			if (StringUtil.checkStr(idStr)) {
				idStr += ",";
			}
			idStr += "'" + ZTXHS[i] + "'";
		}
		buffer.append("delete from DEVICESTATE_TAB where ZTXH in (" + idStr + ")");
		try {
			deleteFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return deleteFlag;
	}
	
	/**
	 * 人工确认设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addTroubleVerifyInfo(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update DEVICESTATE_TAB set");
		buffer.append(" VERIFY_STATUS = " + param.get("veriry"));
		buffer.append(" where ZTXH = '" + param.get("id") + "'");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 人工确认设备故障信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addTroubleDealWithInfo(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update DEVICESTATE_TAB set");
		buffer.append(" DEAL_WITH_FLAG = " + param.get("dealWith"));
		if (StringUtil.checkStr(param.get("dealWith"))) {
			buffer.append(", DEAL_WITH_CONTENT = '" + param.get("dealWith") + "'");
		}
		buffer.append(" where ZTXH = '" + param.get("id") + "'");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 统计设备状态信息
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryDeviceStatisticsInfo(Map<String, String> param) {
		param.put("produce", "sp_DeviceStat(?,?,?,?,?,?)");
		List<Map<String, String>> datas =  this.queryDeviceStatisticsReport(param);
		return datas;
		//return null;
	}
	
	/**
	 * 统计设备状态信息
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryTroubleStatisticsInfo(Map<String, String> param) {
		param.put("produce", "sp_troubleStat(?,?,?,?,?,?)");
		List<Map<String, String>> datas =  this.queryDeviceStatisticsReport(param);
		return datas;
		//return null;
	}
	
	/**
	 * 车牌识别率
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryRecognitionRateInfo(Map<String, String> param) {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		String startTime = param.get("startTime").replaceAll("T", " ");
		String endTime = param.get("endTime").replaceAll("T", " ");
		if (StringUtil.equals(param.get("orgType"), ConstantUtil.MOUNT_ORG_TYPE)) {
			buffer.append("select t.kkbh, t.kkmc,t.sbmc,t.sbbh, count(t.kkbh) carnum," +
					"count(t.kkbh) - sum(DECODE(t.hphm, '无车牌', 1, 0)) - sum(DECODE(t.hphm, 'Unknown', 1, 0)) " +
					"carCheckNum from v_cars t where t.kkbh in ('" + param.get("mountId") + "') and t.jgsj " +
					"between to_date('" + startTime + "', 'yyyy-mm-dd hh24:mi:ss') and to_date('" + endTime + "', 'yyyy-mm-dd hh24:mi:ss') " +
					"group by t.KKBH, t.KKMC, t.sbmc,t.sbbh");
		}
		if (StringUtil.equals(param.get("orgType"), ConstantUtil.DEPT_ORG_TYPE)) {
			buffer.append("select t.kkbh, t.kkmc,t.sbmc,t.sbbh, count(t.kkbh) carnum," +
					"count(t.kkbh)-sum(DECODE(t.hphm, '无车牌', 1, 0))-sum(DECODE(t.hphm, 'Unknown', 1, 0))  " +
					"carCheckNum from v_cars t where  t.dwbh = '" + param.get("deptId") + "' and t.jgsj " +
					"between to_date('" + startTime + "', 'yyyy-mm-dd hh24:mi:ss') and to_date('" + endTime + "', 'yyyy-mm-dd hh24:mi:ss') " +
					"group by t.KKBH, t.KKMC, t.sbmc,t.sbbh");
		}
		if (StringUtil.equals(param.get("orgType"), ConstantUtil.AREA_ORG_TYPE)) { //选的是区域
			buffer.append("select t.kkbh, t.kkmc,t.sbmc,t.sbbh, count(t.kkbh) carnum," +
					"count(t.kkbh)-sum(DECODE(t.hphm, '无车牌', 1, 0))-sum(DECODE(t.hphm, 'Unknown', 1, 0))  " +
					"carCheckNum from v_cars t where  t.dwbh in (select dwbh FROM MGMTDEPT_TAB where DWXZQH = '" + param.get("areaId") +"') and t.jgsj " +
					"between to_date('" + startTime + "', 'yyyy-mm-dd hh24:mi:ss') and to_date('" + endTime + "', 'yyyy-mm-dd hh24:mi:ss') " +
					"group by t.KKBH, t.KKMC, t.sbmc,t.sbbh");
		}
		try {
			datas = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
}
