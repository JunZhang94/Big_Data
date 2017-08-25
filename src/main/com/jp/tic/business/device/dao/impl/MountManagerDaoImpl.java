package com.jp.tic.business.device.dao.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jp.tic.business.device.dao.MountManagerDao;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.utils.lang.StringUtil;

@Repository
public class MountManagerDaoImpl extends BaseDao implements MountManagerDao{

	@Override
	public int addVMountInfo(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("insert into MOUNT_VIRTUAL_TAB(KKBH,KKMC,DWBH,KKJD,KKWD,LXDZ,XZQH,KKZT) values ('" + param.get("KKBH") + "'");
		if (StringUtil.checkObj(param.get("SBMC"))) {
			buffer.append(",'" + param.get("SBMC") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("DWBH"))) {
			buffer.append(",'" + param.get("DWBH") + "'");
		} else {
			buffer.append(",''");
		}
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
		if (StringUtil.checkObj(param.get("SRCBH"))) {
			buffer.append("," + param.get("SRCBH"));
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("XZQH"))) {
			buffer.append("," + param.get("XZQH"));
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("SBZT"))) {
			buffer.append(",'" + param.get("SBZT") + "'");
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

	@Override
	public int updateVMountInfo(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update MOUNT_VIRTUAL_TAB set");
		if (StringUtil.checkObj(param.get("SBMC"))) {
			buffer.append(" KKMC = '" + param.get("SBMC") + "'");
		} 
		if (StringUtil.checkObj(param.get("DWBH"))) {
			buffer.append(" ,DWBH = '" + param.get("DWBH") + "'");
		} 
		if (StringUtil.checkObj(param.get("JD"))) {
			buffer.append(" ,KKJD = '" + param.get("JD") + "'");
		} 
		if (StringUtil.checkObj(param.get("WD"))) {
			buffer.append(" ,KKWD = '" + param.get("WD") + "'");
		}
		if (StringUtil.checkObj(param.get("XZQH"))) {
			buffer.append(" ,XZQH = '" + param.get("XZQH") + "'");
		}
		if (StringUtil.checkObj(param.get("SBZT"))) {
			buffer.append(" ,KKZT = '" + param.get("SBZT") + "'");
		}
		buffer.append(" where KKBH = '" + param.get("KKBH") + "'");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}

}
