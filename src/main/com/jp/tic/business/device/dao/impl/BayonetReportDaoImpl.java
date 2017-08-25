package com.jp.tic.business.device.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jp.tic.business.device.dao.BayonetReportDao;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.utils.lang.StringUtil;
import com.sun.xml.bind.v2.model.core.ID;

@SuppressWarnings("unchecked")
@Repository
public class BayonetReportDaoImpl extends BaseDao implements BayonetReportDao {

	/**
	 * 查询全部卡口报备信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryBayonetReportInfo(Map<String, String> param) {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select a.*,b.dwmc from MOUNT_TAB a, MGMTDEPT_TAB b where a.dwbh = b.dwbh");
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
	 * 统计卡口报备信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countBayonetReportDatas(Map<String, String> param) {
		List<Map<String, String>> counts = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select count(*) as COUNTS from MOUNT_TAB where 1=1");
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
		if (StringUtil.checkObj(param.get("mounts"))) {
			String[] mounts = param.get("mounts").split(",");
			String mountStr = "";
			for (int i = 0; i < mounts.length; i++) {
				if (StringUtil.checkStr(mountStr)) {
					mountStr += ",";
				}
				mountStr += "'" + mounts[i] + "'";
			}
			buffer.append(" and KKBH in (" + mountStr + ")");
		}
		if (StringUtil.checkObj(param.get("status")) && !StringUtil.equals(param.get("status"), "2")) {
			buffer.append(" and BYZD2 = '" + param.get("status") + "'");
		}
		return buffer.toString();
	}
	
	/**
	 * 提交报备更新
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int commitReportInfo(Map<String, String> param) {
		int saveFlag = 0;
		String param_kkbhStr = param.get("kkbhs");
		String[] kkbhs = null;
		if (StringUtil.checkStr(param_kkbhStr)) {
			kkbhs = param.get("kkbhs").split(",");
		} else {
			List<Map<String, String>> datas = this.queryKkbhByConditions(param);
			if (datas != null && datas.size() > 0) {
				kkbhs = new String[datas.size()];
				for (int i = 0; i < datas.size(); i++) {
					kkbhs[i] = datas.get(i).get("KKBH");
				}
			}
		}
		String kkbhStr = "";
		if (StringUtil.checkObj(kkbhs)) {
			for (int i = 0; i < kkbhs.length; i++) {
				if (StringUtil.checkStr(kkbhStr)) {
					kkbhStr += ",";
				}
				kkbhStr += "'" + kkbhs[i] + "'";
			}
		}
		StringBuffer buffer = new StringBuffer();
		String flag = param.get("flag");
		if (StringUtil.equals(flag, "commit")) {
			buffer.append("update MOUNT_TAB set BYZD2 = '1'");
			if (StringUtil.checkObj(param.get("remark"))) {
				buffer.append(" ,BZ = '" + param.get("remark") + "'");
			} else {
				buffer.append(" ,BZ = ''");
			}
		} else {
			buffer.append("update MOUNT_TAB set BYZD2 = '0'");
			if (StringUtil.checkObj(param.get("remark"))) {
				buffer.append(" ,BZ = '" + param.get("remark") + "'");
			} else {
				buffer.append(" ,BZ = ''");
			}
		}
		if (StringUtil.checkObj(kkbhs)) {
			buffer.append(" where KKBH in (" + kkbhStr + ")");
		}
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 根据查询条件查询数据
	 * @param param 参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryKkbhByConditions(Map<String, String> param) {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from MOUNT_TAB where 1=1");
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
	 * 初始化修改数据的详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initBayonetReportDetailInfo(Map<String, String> param) {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from MOUNT_TAB where KKBH = '" + param.get("kkbh") + "'");
		try {
			datas = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
			return null;
		}
		return datas;
	}
}
