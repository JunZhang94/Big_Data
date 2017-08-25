package com.jp.tic.business.device.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import test.JSON;
import test.Tree4kkMaster;

import com.jp.tic.business.device.dao.BayonetManagerDao;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.utils.lang.StringUtil;
import com.opensymphony.oscache.general.GeneralCacheAdministrator;

@SuppressWarnings("unchecked")
@Repository
public class BayonetManagerDaoImpl extends BaseDao implements BayonetManagerDao {
	

	List<Map<String, String>> mountDatas = null;
	
	private GeneralCacheAdministrator admin = new GeneralCacheAdministrator();

	/**
	 * 分页查询设备卡口审核信息
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryBayonetVerifyInfo(Map<String, String> param) {
		int pageStart = StringUtil.toInteger(param.get("page.start"));
        int rows = StringUtil.toInteger(param.get("page.limit"));
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from MOUNT_TAB_EDIT where 1=1");
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
	 * 组装查询语句
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public String packageSeachSql(Map<String, String> param) {
		StringBuffer buffer = new StringBuffer();
		if (StringUtil.checkObj(param.get("kkmc"))) {
			buffer.append(" and KKMC like '%" + param.get("kkmc") + "%'");
		}
		if (StringUtil.checkObj(param.get("id"))) {
			buffer.append(" and KKBH = '" + param.get("id") + "'");
		}
		// 未审核
		buffer.append(" and VERIFY_STATUS = 0 or VERIFY_STATUS = 2");
		return buffer.toString();
	}
	
	/**
	 * 统计卡口审核数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countBayonetVerifyInfo(Map<String, String> param) {
		List<Map<String, String>> counts = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select count(*) as COUNTS from MOUNT_TAB_EDIT where 1=1");
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
	 * 卡口审核的详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initBayoneVerifyDetail(Map<String, String> param) {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from MOUNT_TAB_EDIT where 1=1");
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
	 * 审核卡口信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateBayoneVerifyInfo(Map<String, String> param) { 
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update MOUNT_TAB_EDIT set");
		if (StringUtil.toInt(param.get("verifyFlag")) == 1) {
			buffer.append(" VERIFY_STATUS = 1"); // 审核通过
		}
		if (StringUtil.toInt(param.get("verifyFlag")) == 0) {
			buffer.append(" VERIFY_STATUS = 2"); //审核不通过
		}
		if (StringUtil.checkObj(param.get("verifyDesc"))) {
			buffer.append(", VERIFY_DESC = '" + param.get("verifyDesc") + "'");
		}
		buffer.append(" where KKBH = '" + param.get("id") + "'");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 首页查询卡口基本信息数据的详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> searchBayonetDetailInfo(Map<String, String> param) {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select a.kkbh, a.kkmc, b.dwmc, a.dwbh, a.xzqhmc, a.kklx, a.dwdm, a.gabh, a.lxdh, a.lxdz, a.jklj, a.xzb, a.yzb, a.kkjd, a.kkwd, a.gxsj, a.bz, " +
				"case when a.sflj = '0' then '否' else '是' end sflj, case when a.sfbjkk = '0' then '否' else '是' end sfbjkk, a.kklx2, " +
				"a.kkdz, a.kkxz, case when a.sftgtzcp = '0' then '否' else '是' end sftgtzcp, " +
				"case when a.sfjbspgn = '0' then '否' else '是' end sfjbspgn, case when a.sfjgkk = '0' then '否' else '是' end sfjgkk, " +
				"case when a.sfwfzp = '0' then '否' else '是' end sfwfzp, case when a.sfcs = '0' then '否' else '是' end sfcs, a.qgkdbh, a.kkzt, " +
				"a.dllx, a.dldm, a.lkh, a.dlms, a.dlmc, a.cjsj, case when a.sfkh = '0' then '否' else '是' end sfkh, a.sjscms, a.kkwz, a.sbgys, " +
				"a.rjkfs, a.jgbm, a.dlwzdm, a.byzd2, a.xzqh, a.verify_status, a.verify_desc from MOUNT_TAB a,MGMTDEPT_TAB b where a.dwbh = b.dwbh " +
				"and a.KKMC LIKE '%" + param.get("condition") + "%'");
		try {
			datas = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 处理待修改的卡口信息数据
	 * @param param 参数
	 */
	public void dealwithEditBayonet(Map<String, String> param) {
		String[] kkbhs = param.get("KKBH").split(",");
		String kkbhStr = "";
		for (int i = 0; i < kkbhs.length; i++) {
			if (StringUtil.checkStr(kkbhStr)) {
				kkbhStr += ",";
			}
			kkbhStr += "'" + kkbhs[i] + "'";
		}
		StringBuffer buffer = new StringBuffer();
		buffer.append("delete FROM MOUNT_TAB_EDIT where KKBH in (" + kkbhStr + ")");
		try {
			this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
		}
	}
	
	/**
	 * 对新增的卡口审核时候做处理
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int verifyUpdateAddBayonenet(Map<String, String> param) {
		this.verifyStatusUpdate(param);
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("insert into MOUNT_TAB select * from MOUNT_TAB_EDIT");
		buffer.append(" where KKBH = '" + param.get("id") + "'");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		param.put("KKBHS", param.get("id"));
		this.deleteBayoenetEditInfo(param);
		return saveFlag;
	}
	
	/**
	 * 对修改的卡口审核时候做处理
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int verifyUpdateEditBayonenet(Map<String, String> param) {
		this.verifyStatusUpdate(param);
		int deleteFlag = 0;
		deleteFlag = this.deleteBayoenetInfo(param);
		int saveFlag = 0;
		if (deleteFlag > 0) {
			saveFlag = this.verifyUpdateAddBayonenet(param);
		}
		param.put("KKBHS", param.get("id"));
		this.deleteBayoenetEditInfo(param);
		return saveFlag;
	}
	
	/**
	 * 对删除的卡口审核时候做处理
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int verifyUpdateDeleteBayonenet(Map<String, String> param) {
		int deleteFlag = 0;
		String[] kkbhs = param.get("KKBHS").split(",");
		String kkbhStr = "";
		for (int i = 0; i < kkbhs.length; i++) {
			if (StringUtil.checkStr(kkbhStr)) {
				kkbhStr += ",";
			}
			kkbhStr += "'" + kkbhs[i] + "'";
		}
		StringBuffer buffer = new StringBuffer();
		buffer.append("delete from MOUNT_TAB");
		buffer.append(" where KKBH in (" + kkbhStr + ")");
		try {
			this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		deleteFlag = this.deleteBayoenetEditInfo(param);
		return deleteFlag;
	}
	
	/**
	 * 在对修改卡口前，先删除已经存在的卡口
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteBayoenetInfo(Map<String, String> param) {
		int deleteFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("delete from MOUNT_TAB");
		buffer.append(" where KKBH = '" + param.get("id") + "'");
		try {
			deleteFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return deleteFlag;
	}
	
	/**
	 * 卡口审核完以后,对卡口临时表数据删除
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteBayoenetEditInfo(Map<String, String> param) {
		int deleteFlag = 0;
		String[] kkbhs = param.get("KKBHS").split(",");
		String kkbhStr = "";
		for (int i = 0; i < kkbhs.length; i++) {
			if (StringUtil.checkStr(kkbhStr)) {
				kkbhStr += ",";
			}
			kkbhStr += "'" + kkbhs[i] + "'";
		}
		StringBuffer buffer = new StringBuffer();
		buffer.append("delete from MOUNT_TAB_EDIT");
		buffer.append(" where KKBH in (" + kkbhStr + ")");
		try {
			deleteFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return deleteFlag;
	}
	
	/**
	 * 对新增或者修改的的卡口审核状态做处理
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int verifyStatusUpdate(Map<String, String> param) {
		int updateFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update MOUNT_TAB_EDIT set VERIFY_STATUS = 1");
		buffer.append(" where KKBH = '" + param.get("id") + "'");
		try {
			updateFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return updateFlag;
	}
	
	/**
	 * 删除卡口准备状态，数据先迁移
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addBayonetDeleteInfo(Map<String, String> param) {
		int saveFlag = 0;
		String[] kkbhs = param.get("KKBHS").split(",");
		String kkbhStr = "";
		for (int i = 0; i < kkbhs.length; i++) {
			if (StringUtil.checkStr(kkbhStr)) {
				kkbhStr += ",";
			}
			kkbhStr += "'" + kkbhs[i] + "'";
		}
		StringBuffer buffer = new StringBuffer();
		buffer.append("insert into MOUNT_TAB_EDIT select * from MOUNT_TAB");
		buffer.append(" where KKBH in (" + kkbhStr + ")");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (saveFlag > 0) {
			this.verifyAndOptionStatusUpdate(param);
		}
		return saveFlag;
	}
	
	/**
	 * 更新待删除的数据的审核状态及操作类型
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public void verifyAndOptionStatusUpdate(Map<String, String> param) {
		String[] kkbhs = param.get("KKBHS").split(",");
		String kkbhStr = "";
		for (int i = 0; i < kkbhs.length; i++) {
			if (StringUtil.checkStr(kkbhStr)) {
				kkbhStr += ",";
			}
			kkbhStr += "'" + kkbhs[i] + "'";
		}
		StringBuffer buffer = new StringBuffer();
		buffer.append("update MOUNT_TAB_EDIT set VERIFY_STATUS = 0, OPTION_TYPE = 3");
		buffer.append(" where KKBH in (" + kkbhStr + ")");
		try {
			this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 加载所有的卡口信息,
	 * 重写该方法，加入缓存控制
	 * @return 查询结果
	 */
	public List<Map<String, String>> loadAllMountInfos() {
		boolean updated = false;
		List<Map<String, String>> mounts = null;
		try {
			mounts = (List<Map<String, String>>)(((Map<String, List<Map<String, String>>> )admin.getFromCache("ALLMOUNTS", 7200)).get("deviceInfos"));
			logger.debug("卡口翻译信息来自缓存");
		} catch (Exception e) {
			logger.debug("卡口翻译信息来自数据库");
			try {
				List<Map<String, String>> results = null;
				StringBuffer buffer = new StringBuffer();
				buffer.append("select m.kkmc,m.kkbh,m.kkjd,m.kkwd,d.dwbh,d.dwmc from MOUNT_TAB m,MGMTDEPT_TAB d where m.dwbh = d.dwbh");
				buffer.append(" union all ");
				buffer.append("select m.kkmc,m.kkbh,m.kkjd,m.kkwd,d.dwbh,d.dwmc from mount_virtual_tab m,MGMTDEPT_TAB d where m.dwbh = d.dwbh");
				try {
					results = this.queryBySql(buffer.toString());
				} catch (Exception exc) {
					exc.printStackTrace();
				}
				Map<String, List<Map<String, String>>> dataMap= new HashMap<String, List<Map<String, String>>>();
				dataMap.put("deviceInfos", results);
				admin.putInCache("ALLMOUNTS", dataMap);
				mounts = results;
				updated = true;
			} finally {
				if (!updated) {
					admin.cancelUpdate("ALLMOUNTS");
				}
			}
		}
		return mounts;
	}
	/**
	 * 根据卡口ID获取卡口名称信息
	 * @param kkbh
	 * @return
	 */
	public String getKkmcById(String kkbh){
		String kkmc="";
		if(mountDatas ==null){
			mountDatas = this.loadAllMountInfos();
		}
		for (Map<String, String> dataMap : mountDatas) {
			if (StringUtil.equals(kkbh, dataMap.get("KKBH"))) {
				kkmc=dataMap.get("KKMC");
				break;
			}
		}
		return kkmc;
	}
	
	/**
	 * 加载所有的虚拟卡口信息,
	 * 重写该方法，加入缓存控制
	 * @return 查询结果
	 */
	public List<Map<String, String>> loadAllVirtualMountInfos(String flag) {
		List<Map<String, String>> results = null;
		StringBuffer buffer = new StringBuffer();
		if (StringUtil.checkStr(flag) && StringUtil.equals(flag, "entity")) {
			buffer.append("select m.kkbh,m.kkmc,m.dwbh,m.kkjd,m.kkwd from MOUNT_TAB m");
		} else {
			buffer.append("select m.kkbh,m.kkmc,m.dwbh,m.xzqhmc,m.kkjd,m.kkwd from mount_virtual_tab m");
		}
		try {
			results = this.queryBySql(buffer.toString());
		} catch (Exception exc) {
			exc.printStackTrace();
		}
		return results;
	}
	
	/**
	 * 加载所有的虚拟卡口信息,
	 * 重写该方法，加入缓存控制
	 * @return 查询结果
	 */
	public String loadAllVirtualDeptInfos() {
		List<HashMap<String, String>> result = new Tree4kkMaster().getVirtualKKTree();
		String json = JSON.Encode(result);
		json=json.replace("PID","pId").replace("（","(").replace("）",")").replace("\t","").replace("ID","id").replace("NAME", "name").replace("ORG_TYPE","org_type");
		return json;
	}
	
	/**
	 * 加载所有的实体卡口信息,
	 * 重写该方法，加入缓存控制
	 * @return 查询结果
	 */
	public String loadAllDeptMountsInfos() {
		List<HashMap<String, String>> result = new Tree4kkMaster().getKKTree();
		String json = JSON.Encode(result);
		json=json.replace("PID","pId").replace("（","(").replace("）",")").replace("\t","").replace("ID","id").replace("NAME", "name").replace("ORG_TYPE","org_type");
		return json;
	}
}
