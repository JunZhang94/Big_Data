package com.jp.tic.system.dao.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.system.dao.OrganizationDao;
import com.jp.tic.utils.lang.StringUtil;
import com.opensymphony.oscache.base.NeedsRefreshException;
import com.opensymphony.oscache.general.GeneralCacheAdministrator;

@SuppressWarnings("unchecked")
@Repository
public class OrganizationDaoImpl extends BaseDao implements OrganizationDao {
	
	private static GeneralCacheAdministrator admin = new GeneralCacheAdministrator();
	
	private static final String ENUM_KEY_ORG = "cacheOrgData";
	private static final int REFRESH_PERIOD = 3600;
	
	/**
	 * 专用于卡口/设备管理中的卡口显示反向
	 * @param deviceFlag
	 * @param orgFlag
	 * @return
	 */
	public List<Map<String,String>> getOgnDirection(boolean deviceFlag, boolean orgFlag, boolean userFlag, String orgId){
		List<Map<String,String>> listResult = new ArrayList<Map<String,String>>();
		StringBuffer buffer = new StringBuffer("select A.QYDM as id,'-1' as pid,A.Qymc as orgName,'0' as orgType,'00' as KKZT,'0' as flag from AREA_TAB A");
		if (userFlag && StringUtil.checkStr(orgId)) {
			buffer.append(",SYS_T_USER U where A.QYDM = U.ORGAN_ID and U.ORGAN_ID = '" + orgId + "'");
		}
		buffer.append(" union select B.DWBH as id, B.Dwxzqh as pid, B.DWMC as orgName,'1' as orgType,'11' as KKZT,'0' as flag from MGMTDEPT_TAB B");
		if (!userFlag && StringUtil.checkStr(orgId)) {
			buffer.append(",SYS_T_USER U where B.DWBH = U.ORGAN_ID and U.ORGAN_ID = '" + orgId + "'");
		}
		if (orgFlag) {
			buffer.append(" union select substr(C.KKBH,4,15) as id, C.Dwbh as pid,C.KKMC AS orgName,'2' as orgType,C.KKZT,'0' as flag from MOUNT_TAB C");
			buffer.append(" union select substr(C.KKBH,4,15) as id, '440111100000' as pid,C.KKMC AS orgName,'2' as orgType,C.KKZT,'1' as flag from MOUNT_VIRTUAL_TAB C");
		}
    	if (deviceFlag) {
    		buffer.append(" union select D.SBBH as id, substr(D.SSKKBH,4,15) as pid, D.SBMC as orgName,'3' as orgType,'33' as KKZT,'0' as flag from deviceinfo_tab D");
    	}
    	/*buffer.append(" union select E.Direction_Number as id,substr(E.Kkbh,4,15) as pid,E.Direction_Name as orgName,'4' as orgType,'44' as kkzt from c_direction_tab E");
    	buffer.append(" order by id asc");*/
    	try {
    		listResult = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listResult;
	}

	/**
     * 获取组织结构数据列表
     * @param deviceFlag 树是否加载设备
     * @param orgFlag 是否加载卡点
     * @return 组织结构数据列表
     * @author lsg
     */
    public List<Map<String, String>> getOrganizations(boolean deviceFlag, boolean orgFlag) {
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	StringBuffer buffer = new StringBuffer();
    	//orgType = 0表示选择的是部门
    	buffer.append("select A.QYDM as id,'-1' as pid,A.Qymc as orgName,'0' as orgType,'00' as KKZT from AREA_TAB A union " +
    			"select B.DWBH as id, B.Dwxzqh as pid, B.DWMC as orgName,'1' as orgType,'11' as KKZT from MGMTDEPT_TAB B");
		if (orgFlag) {
			buffer.append(" union select substr(C.KKBH,4,15) as id, C.Dwbh as pid,C.KKMC AS orgName,'2' as orgType,C.KKZT from MOUNT_TAB C");
			//buffer.append(" union select E.Direction_Number as id,substr(E.Kkbh,4,15) as pid,E.Direction_Name as orgName,'4' as orgType,'44' as kkzt from c_direction_tab E");
		}
    	if (deviceFlag) {
    		buffer.append(" union select D.SBBH as id, substr(D.SSKKBH,4,15) as pid, D.SBMC as orgName,'3' as orgType,'33' as KKZT from deviceinfo_tab D");
    		buffer.append(" order by id asc");
    	}
    	try {
			list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
       /* DetachedCriteria dc = DetachedCriteria.forClass(OrgEntity.class);
        if (parentId != null)
            dc.add(Restrictions.eq("pid", parentId));
        
        dc.addOrder(Order.asc("coding"));
        List<OrgEntity> list = this.findByCriteria(dc);
*/
        return list;
    }
    
    /**
     * 获取组织结构数据列表,只加载分局
     * @return 组织结构数据列表
     * @author lsg
     */
    public List<Map<String, String>> onlyOrgTreeInfo() {
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	StringBuffer buffer = new StringBuffer();
    	//orgType = 0表示选择的是部门
    	buffer.append("select A.QYDM as id,'-1' as pid,A.Qymc as orgName,'0' as orgType,'00' as KKZT from AREA_TAB A union " +
    			"select B.DWBH as id, B.Dwxzqh as pid, B.DWMC as orgName,'1' as orgType,'11' as KKZT from J_ONLY_ORG B union " +
    			"select J.ORG_CODE as id, J.Dwbh as pid, J.Org_Name as orgName, '2' as orgType, '22' as KKZT from J_DEPT_ORG_MAP J");
    	try {
			list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
    }
    
    @Override
	public List<Map<String, String>> findOrgInfoByOrgTypenew(
			Map<String, String> param) {
		// TODO Auto-generated method stub
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select a.KKBH,a.KKMC,a.LXDH,a.LXDZ,b.DWBH,b.DWMC,c.QYDM,c.QYMC from MOUNT_TAB a,MGMTDEPT_TAB b,AREA_TAB c where a.dwbh = b.dwbh and b.dwxzqh = c.qydm and a.kkzt=0");
	    if (StringUtil.equals(param.get("orgType"), "0")) {
	    	buffer.append(" and c.qydm = '" + param.get("orgId") + "'");
    		
	    }
	    if (StringUtil.equals(param.get("orgType"), "1")) {
	    	buffer.append(" and b.dwbh = '" + param.get("orgId") + "'");
    		
	    }
	    if (StringUtil.equals(param.get("orgType"), "2")) {
	    	buffer.append(" and a.kkbh = '440" + param.get("orgId") + "'");
    		
	    }
		try {
			list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
    
    /**
     * 加载所有的虚拟卡口信息
     * @param param 查询参数
     * @return
     */
    public List<Map<String, String>> findVulMountInfos(Map<String, String> param) {
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select a.KKBH,a.KKMC,a.LXDH,a.LXDZ,a.XNKK_STATUS,b.DWBH,b.DWMC,c.QYDM,c.QYMC from MOUNT_VIRTUAL_TAB a,MGMTDEPT_TAB b,AREA_TAB c where a.dwbh = b.dwbh and b.dwxzqh = c.qydm and a.kkzt=0");
	    if (StringUtil.equals(param.get("orgType"), "0")) {
	    	buffer.append(" and c.qydm = '" + param.get("orgId") + "'");
    		
	    }
	    if (StringUtil.equals(param.get("orgType"), "1")) {
	    	buffer.append(" and b.dwbh = '" + param.get("orgId") + "'");
    		
	    }
	    if (StringUtil.equals(param.get("orgType"), "2")) {
	    	buffer.append(" and a.kkbh = '440" + param.get("orgId") + "'");
    		
	    }
		try {
			list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
    public List<Map<String, String>> loadOrgTopestData() {
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select QYDM AS ID,QYMC FROM AREA_TAB order by id desc");
    	try {
			list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
    
    public List<Map<String, String>> loadOrgTopestRole() {
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	StringBuffer buffer = new StringBuffer();
    	buffer.append(" select b.parentid as id,b.id as pid,b.name as orgName from sys_action b where id in ( select distinct a.parentid  from sys_action a )");
    	try {
			list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
    
    /**
     * 加载所有的部门信息
     * @return 查询结果
     */
    public List<Map<String, String>> loadAllOrgInfo() {
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select * FROM MGMTDEPT_TAB");
    	try {
			list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
    }
    
    /**
     * 加载所有的卡口信息
     * @return 查询结果
     */
    public List<Map<String, String>> loadAllMountInfo() {
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select KKBH,KKMC FROM MOUNT_TAB");
    	try {
			list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
    }
    
    /**
     * 加载部门到卡口之间所有数据的名称,数据保存至缓存
     * param orgName卡口或者组织名称
     * @return 查询结果
     */
    public List<Map<String, String>> findAllOrgName(String[] orgName) {
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select C.KKBH, substr(C.KKBH,4,15) as id, C.Dwbh as pid,D.dwmc,D.DWXZQH, C.KKMC AS orgName,'2' as orgType, KKZT FROM MOUNT_TAB C left join MGMTDEPT_TAB D on C.DWBH = D.DWBH");
    	buffer.append(" where");
    	buffer.append(" VERIFY_STATUS = 1");
    	StringBuffer condition = new StringBuffer();
    	if (orgName != null && orgName.length > 0) {
    		if (StringUtil.checkStr(orgName[0]) && !StringUtil.equals(orgName[0], "null") ) {
    			buffer.append(" and ");
    			for (int i = 0; i < orgName.length; i++) {
        			if (StringUtil.checkStr(orgName[i])) {
    	    			if (StringUtil.checkStr(condition.toString())) {
    	    				condition.append(" or ");
    	    			}
    	    			condition.append(" C.KKMC like '%" + orgName[i] + "%'");
        			}
        		}
    		}
    	}
    	if (StringUtil.checkStr(condition.toString())) {
    		buffer.append(condition);
    	}
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	boolean updated = false;
    	try {
    		list = (List<Map<String, String>>) admin.getFromCache("SYSTEM_KAKOU");
			logger.debug("卡口信息来自缓存");
		} catch (Exception e) {
			logger.debug("卡口信息来自数据库");
			try {
				list = this.queryBySql(buffer.toString());
				admin.putInCache("SYSTEM_KAKOU", list);
				updated = true;
			} finally {
				if (!updated) {
					admin.cancelUpdate("SYSTEM_KAKOU");
				}
			}
		}
		return list;
    }
    
    /**
     * 查询所有的方向信息,数据保存至缓存
     * param orgName 方向参数
     * @return 查询结果
     */
    public List<Map<String, String>> findAllDirection(String[] orgName) {
    	StringBuffer buffer = new StringBuffer();
    	//orgType = 0表示选择的是部门
    	buffer.append("select A.QYDM as id,'-1' as pid,A.Qymc as orgName,'0' as orgType,'00' as KKZT from AREA_TAB A union " +
    			"select B.DWBH as id, B.Dwxzqh as pid, B.DWMC as orgName,'1' as orgType,'11' as KKZT from MGMTDEPT_TAB B union " +
    			"select substr(C.KKBH,4,15) as id, C.Dwbh as pid,C.KKMC AS orgName,'2' as orgType,C.KKZT from MOUNT_TAB C where C.VERIFY_STATUS = 1 and C.KKZT = '0'");
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	boolean updated = false;
    	try {
    		list = (List<Map<String, String>>) admin.getFromCache("DEPT_KAKOU");
			logger.debug("部门卡口信息来自缓存");
		} catch (Exception e) {
			logger.debug("部门卡口信息来自数据库");
			try {
				list = this.queryBySql(buffer.toString());
				admin.putInCache("DEPT_KAKOU", list);
				updated = true;
			} finally {
				if (!updated) {
					admin.cancelUpdate("DEPT_KAKOU");
				}
			}
		}
		return list;
    }
    /**
     * 查询所有的方向信息,数据保存至缓存
     * param kkbh
     * @return 查询结果
     */
    public List<Map<String, String>> findAllDirectionNew(String kkbh) {
    	StringBuffer buffer = new StringBuffer();
    	//orgType = 0表示选择的是部门
    	buffer.append("select a.kkbh as KKBH,a.direction_number as FXBH,a.direction_name as FXMC, c.dwmc as DWMC from C_DIRECTION_TAB a right join MOUNT_TAB b on a.kkbh=b.kkbh right join MGMTDEPT_TAB c on b.dwbh=c.dwbh where a.kkbh ='"+kkbh+"'");
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	list = this.queryBySql(buffer.toString());	
		return list;
    }
    /**
     * 只查询方向信息
     * param orgName 方向参数
     * @return 查询结果
     */
    public List<Map<String, String>> findOnlyDirection(String[] orgName) {
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select C.KKBH, substr(C.KKBH,4,15) as id, C.KKMC, D.DIRECTION_NUMBER, " +
    			"D.DIRECTION_NAME, '4' as orgType, D.MONITOR_STATE, C.KKZT FROM MOUNT_TAB C, " +
    			"C_DIRECTION_TAB D where C.KKBH = D.KKBH and C.VERIFY_STATUS = 1 and C.KKZT = '0'");
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	boolean updated = false;
    	try {
    		list = (List<Map<String, String>>) admin.getFromCache("KAKOU_DIRECTION");
			logger.debug("卡口方向信息来自缓存");
		} catch (Exception e) {
			logger.debug("卡口方向信息来自数据库");
			try {
				list = this.queryBySql(buffer.toString());
				admin.putInCache("KAKOU_DIRECTION", list);
				updated = true;
			} finally {
				if (!updated) {
					admin.cancelUpdate("KAKOU_DIRECTION");
				}
			}
		}
		return list;
    }
    
    /**
     * 根据输入方向参数加载部门到方向之间所有数据的名称,数据保存至缓存
     * param orgName 方向参数
     * @return 查询结果
     */
    public List<Map<String, String>> findDirectionByName(String[] orgName) {
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select C.KKBH, substr(C.KKBH,4,15) as id, C.KKMC, D.DIRECTION_NUMBER, D.DIRECTION_NAME, '3' as orgType, D.MONITOR_STATE, C.KKZT FROM MOUNT_TAB C left join C_DIRECTION_TAB D on C.KKBH = D.KKBH");
    	buffer.append(" where");
    	buffer.append(" C.VERIFY_STATUS = 1 and C.KKZT = '0'");
    	StringBuffer condition = new StringBuffer();
    	if (orgName != null && orgName.length > 0) {
    		if (StringUtil.checkStr(orgName[0]) && !StringUtil.equals(orgName[0], "null") ) {
    			buffer.append(" and ");
    			for (int i = 0; i < orgName.length; i++) {
        			if (StringUtil.checkStr(orgName[i])) {
    	    			if (StringUtil.checkStr(condition.toString())) {
    	    				condition.append(" or ");
    	    			}
    	    			condition.append(" C.KKMC like '%" + orgName[i] + "%'");
        			}
        		}
    		}
    	}
    	if (StringUtil.checkStr(condition.toString())) {
    		buffer.append(condition);
    	}
    	List<Map<String, String>> list = null;
    	try {
    		list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
    }
    
    /**
     * 加载部门到卡口之间所有数据的名称，直接查询数据库，汉字模糊匹配
     * param orgName卡口或者组织名称
     * @return 查询结果
     */
    public List<Map<String, String>> findAllOrgNameNoCache(String[] orgName) {
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select C.KKBH, substr(C.KKBH,4,15) as id, C.Dwbh as pid,C.KKMC AS orgName,'2' as orgType FROM MOUNT_TAB C");
    	StringBuffer condition = new StringBuffer();
    	if (orgName != null && orgName.length > 0) {
    		if (StringUtil.checkStr(orgName[0]) && !StringUtil.equals(orgName[0], "null") ) {
    			buffer.append(" where ");
    			for (int i = 0; i < orgName.length; i++) {
        			if (StringUtil.checkStr(orgName[i])) {
    	    			if (StringUtil.checkStr(condition.toString())) {
    	    				condition.append(" or ");
    	    			}
    	    			condition.append(" C.KKMC like '%" + orgName[i] + "%'");
        			}
        		}
    		}
    	}
    	if (StringUtil.checkStr(condition.toString())) {
    		buffer.append(condition);
    	}
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	try {
			list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
    }
    
    /**
     * 查询被选中的卡口信息
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> findHavingData(Map<String, String> param) {
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	StringBuffer buffer = new StringBuffer();
	    if (param.get("phones") != null) {
	    	buffer.append("select C.KKBH, substr(C.KKBH,4,15) as id, C.Dwbh as pid,C.KKMC AS orgName,'2' as orgType FROM MOUNT_TAB C");
    		buffer.append(" where KKBH in (");
    		String[] kkbhs = param.get("phones").split(",");
    		for (int i = 0; i < kkbhs.length - 1; i++) {
    			if (StringUtil.isNotBlank(kkbhs[i])) {
    				buffer.append("'").append("440" + kkbhs[i]).append("',");
    			}
    		}
    		if (StringUtil.isNotBlank(kkbhs[kkbhs.length - 1])) {
				buffer.append("'").append("440" + kkbhs[kkbhs.length - 1]);
			}
			buffer.append("')");
    		try {
    			list = this.queryBySql(buffer.toString());
    		} catch (Exception e) {
    			e.printStackTrace();
    		}
    	}
		return list;
    }
    
    /**
     * 根据orgType查找组织结构信息
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> findOrgInfoByOrgType(Map<String, String> param) {
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select a.KKBH,a.KKMC,b.DWBH,b.DWMC from MOUNT_TAB a,MGMTDEPT_TAB b,AREA_TAB c where a.dwbh = b.dwbh and b.dwxzqh = c.qydm");
	    if (StringUtil.equals(param.get("orgType"), "0")) {
	    	buffer.append(" and c.qydm = '" + param.get("orgId") + "'");
    		
	    }
	    if (StringUtil.equals(param.get("orgType"), "1")) {
	    	buffer.append(" and b.dwbh = '" + param.get("orgId") + "'");
    		
	    }
	    if (StringUtil.equals(param.get("orgType"), "2")) {
	    	buffer.append(" and a.kkbh = '440" + param.get("orgId") + "'");
    		
	    }
	    buffer.append(" and VERIFY_STATUS = 1");
	    System.out.println("#####----findOrgInfoByOrgType sql========"+buffer.toString());
		try {
			list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
    }
    
    /**
     * 根据orgType查找组织结构信息,只显示正常在线的卡口
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> findOnlineMountInfo(Map<String, String> param) {
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select a.KKBH,a.KKMC,b.DWBH,b.DWMC from MOUNT_TAB a,MGMTDEPT_TAB b,AREA_TAB c where a.dwbh = b.dwbh and b.dwxzqh = c.qydm and KKZT = '0'");
	    if (StringUtil.equals(param.get("orgType"), "0")) {
	    	buffer.append(" and c.qydm = '" + param.get("orgId") + "'");
    		
	    }
	    if (StringUtil.equals(param.get("orgType"), "1")) {
	    	buffer.append(" and b.dwbh = '" + param.get("orgId") + "'");
    		
	    }
	    if (StringUtil.equals(param.get("orgType"), "2")) {
	    	buffer.append(" and a.kkbh = '440" + param.get("orgId") + "'");
    		
	    }
		try {
			list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
    }
    
    /**
     * 根据orgType查找所有部门信息
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> findDeptInfoByOrgType(Map<String, String> param) {
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select distinct b.DWBH,b.DWMC from MOUNT_TAB a, MGMTDEPT_TAB b,AREA_TAB c where a.dwbh = b.dwbh and b.dwxzqh = c.qydm");
	    if (StringUtil.equals(param.get("orgType"), "0")) {
	    	buffer.append(" and c.qydm = '" + param.get("orgId") + "'");
    		
	    }
	    if (StringUtil.equals(param.get("orgType"), "1")) {
	    	buffer.append(" and b.dwbh = '" + param.get("orgId") + "'");
    		
	    }
	    if (StringUtil.equals(param.get("orgType"), "2")) { 
	    	buffer.append(" and a.kkbh = '440" + param.get("orgId") + "'");
    		
	    }
		try {
			list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
    }
    
    /**
     * 关联到卡口获取组织结构树，通过卡口查询条件，找到对应存在的部门
     * @param kkmc 卡口名称
     * @param orgFlag 是否加载卡点
     * @return 剔除卡点的组织结构树
     * @author lsg
     */
    public List<Map<String, String>> getOrganizationsByKkmc(String kkmc) {
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select A.QYDM as id, '-1' as pid, A.Qymc as orgName, '0' as orgType from AREA_TAB A union ");
    	buffer.append("select D.* from (select A.QYDM as id,'-1' as pid,A.Qymc as orgName,'0' as orgType from AREA_TAB A union " +
    			"select B.DWBH as id, B.Dwxzqh as pid, B.DWMC as orgName,'1' as orgType from MGMTDEPT_TAB B) D");
    	if (StringUtil.checkStr(kkmc)) {
    		buffer.append(" where D.ID in (select C.Dwbh as pid from MOUNT_TAB C where C.KKMC like '%" + kkmc + "%')");
    	}
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	try {
    		list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
        return list;
    }
    
    /**
     * 关联到卡口获取组织结构树，通过卡口查询条件，找到对应存在的部门
     * @param kkmc 卡口名称
     * @param orgFlag 是否加载卡点
     * @return 剔除卡点的组织结构树
     * @author lsg
     */
    public List<Map<String, String>> getOrganizationsByKkmcNocache(String kkmc) {
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select A.QYDM as pid, '-1' as Dwxzqh, A.Qymc as DWMC, '0' as orgType from AREA_TAB A union ");
    	buffer.append("select D.* from (select B.DWBH as pid, B.Dwxzqh, B.DWMC, '1' as orgType from MGMTDEPT_TAB B) D");
    	if (StringUtil.checkStr(kkmc)) {
    		buffer.append(" where D.pid in (select C.Dwbh as pid from MOUNT_TAB C where C.KKMC like '%" + kkmc + "%')");
    	}
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	try {
    		list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
        return list;
    }
    
    /**
     * 查询所有的设备信息
     * @return 查询结果
     * @author lsg
     */
    public List<Map<String, String>> findAllDeviceInfo() {
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select kkbh,kkmc from AREA_TAB");
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	try {
    		list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
        return list;
    }
    
    /**
     * 查询所有的方向信息
     * @return 查询结果
     * @author lsg
     */
    public List<Map<String, String>> findAllDirectionInfo() {
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select DIRECTION_NUMBER,DIRECTION_NAME from C_DIRECTION_TAB");
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	try {
    		list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
        return list;
    }
    
    /**
     * 查询被勾选的方向
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> findCheckedDirectionsInfo(Map<String, String> param) {
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	StringBuffer buffer = new StringBuffer();
	    if (param.get("phones") != null) {
	    	String[] directions = param.get("phones").split(",");
	    	List<String> mountList = new ArrayList<String>();
			List<String> directionList = new ArrayList<String>();
			if (directions != null) {
				for (String direction : directions) {
					if(direction.length()==15){
						mountList.add("440" + direction);
					} else {
						directionList.add(direction);
					}
				}
			}
			if (directionList.size() > 0) {
				buffer.append("select substr(D.KKBH,4,15) as id,D.DIRECTION_NUMBER, D.DIRECTION_NAME, '3' as orgType, D.MONITOR_STATE from C_DIRECTION_TAB D");
	    		buffer.append(" where D.DIRECTION_NUMBER in (");
	    		for (int i = 0; i < directionList.size() - 1; i++) {
	    			if (StringUtil.isNotBlank(directionList.get(i))) {
	    				buffer.append("'").append(directionList.get(i)).append("',");
	    			}
	    		}
	    		if (StringUtil.isNotBlank(directionList.get(directionList.size() - 1))) {
					buffer.append("'").append(directionList.get(directionList.size() - 1));
				}
				buffer.append("')");
			}
			if (mountList.size() > 0) {
				if (directionList.size() > 0) {
					buffer.append(" union ");
				}
				buffer.append("select C.Dwbh as id, substr(C.KKBH,4,15) as DIRECTION_NUMBER,C.KKMC as DIRECTION_NAME,'2'  as orgType, '' as MONITOR_STATE FROM MOUNT_TAB C");
	    		buffer.append(" where C.KKBH in (");
	    		for (int i = 0; i < mountList.size() - 1; i++) {
	    			if (StringUtil.isNotBlank(mountList.get(i))) {
	    				buffer.append("'").append(mountList.get(i)).append("',");
	    			}
	    		}
	    		if (StringUtil.isNotBlank(mountList.get(mountList.size() - 1))) {
					buffer.append("'").append(mountList.get(mountList.size() - 1));
				}
				buffer.append("')");
			}
    		try {
    			list = this.queryBySql(buffer.toString());
    		} catch (Exception e) {
    			e.printStackTrace();
    		}
    	}
		return list;
    }
    
    /**
     * 获取组织结构数据列表
     * @return 组织结构数据列表
     * @author lsg
     */
    public List<Map<String, String>> getDeptHavingDirection() {
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select A.QYDM as id,'-1' as pid,A.Qymc as orgName,'0' as orgType,'00' as KKZT from AREA_TAB A union " +
    			"select DISTINCT B.DWBH as id, B.Dwxzqh as pid, B.DWMC as orgName,'1' as orgType,'11' as KKZT " +
    			"from MGMTDEPT_TAB B,MOUNT_TAB M,C_DIRECTION_TAB C where B.DWBH =M.DWBH and M.KKBH = C.KKBH and M.VERIFY_STATUS = 1 and M.KKZT = '0'");
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	boolean updated = false;
    	try {
    		list = (List<Map<String, String>>) admin.getFromCache("DEPT_KAKOU_DIRECTION");
			logger.debug("部门卡口方向信息来自缓存");
		} catch (Exception e) {
			logger.debug("部门卡口方向信息来自数据库");
			try {
				list = this.queryBySql(buffer.toString());
				admin.putInCache("DEPT_KAKOU_DIRECTION", list);
				updated = true;
			} finally {
				if (!updated) {
					admin.cancelUpdate("DEPT_KAKOU_DIRECTION");
				}
			}
		}
		return list;
    }
    
    /**
     * 关联到卡口获取组织结构树，通过方向名称查询条件，找到对应存在的部门
     * @param directionName 方向名称
     * @return 剔除方向的组织结构树
     * @author lsg
     */
    public List<Map<String, String>> getOrgByDirectionNumberNocache(String directionName) {
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select A.QYDM as id, '-1' as pid, A.Qymc as orgName, '0' as orgType from AREA_TAB A union ");
    	buffer.append("select B.DWBH as id, B.Dwxzqh as pid, B.DWMC  as orgName, '1' as orgType from MGMTDEPT_TAB B " +
    			"where B.DWBH in (select  C.Dwbh from MOUNT_TAB C where C.KKBH in (select DISTINCT D.KKBH from C_DIRECTION_TAB D " +
    			"where D.DIRECTION_NAME like '%" + directionName + "%')) union ");
    	buffer.append("select substr(C.KKBH,4,15) as id, C.Dwbh as pid,C.KKMC AS orgName,'2' as orgType from MOUNT_TAB C");
    	if (StringUtil.checkStr(directionName)) {
    		buffer.append(" where  C.VERIFY_STATUS = 1 and C.KKZT = '0' and C.KKBH in " +
    				"(select DISTINCT D.KKBH  from C_DIRECTION_TAB D where D.DIRECTION_NAME like '%" + directionName + "%')");
    	}
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	try {
    		list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
        return list;
    }
    
    /**
     * 根据名称查询所有的方向数据，汉字模糊匹配
     * param orgName卡口或者组织名称
     * @return 查询结果
     */
    public List<Map<String, String>> findDirectionByNameNoCache(String[] orgName) {
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select C.KKBH, substr(C.KKBH,4,15) as id, '4' as orgType, C.DIRECTION_NUMBER, " +
    			"C.DIRECTION_NAME, C.MONITOR_STATE FROM C_DIRECTION_TAB C");
    	StringBuffer condition = new StringBuffer();
    	if (orgName != null && orgName.length > 0) {
    		if (StringUtil.checkStr(orgName[0]) && !StringUtil.equals(orgName[0], "null") ) {
    			buffer.append(" where ");
    			for (int i = 0; i < orgName.length; i++) {
        			if (StringUtil.checkStr(orgName[i])) {
    	    			if (StringUtil.checkStr(condition.toString())) {
    	    				condition.append(" or ");
    	    			}
    	    			condition.append(" C.DIRECTION_NAME like '%" + orgName[i] + "%'");
        			}
        		}
    		}
    	}
    	if (StringUtil.checkStr(condition.toString())) {
    		buffer.append(condition);
    	}
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	try {
			list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
    }
    
    /**
     * 卡口数量统计
     * @return 查询结果
     */
    public List<Map<String, String>> countOrgMountsInfo() {
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select g.DWMC as PERIOD,count(1) as COUNT from (select a.KKBH,a.KKMC,b.DWBH,b.DWMC from MOUNT_TAB a, MGMTDEPT_TAB b,AREA_TAB c where a.dwbh = b.dwbh and b.dwxzqh = c.qydm) g group by DWMC");
		try {
			list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
    }
    
    /**
     * 过滤正常且审核通过的卡口数量统计
     * @return 查询结果
     */
    public List<Map<String, String>> countUsringOrgMountsInfo() {
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select g.DWMC as PERIOD,count(1) as COUNT from (select a.KKBH,a.KKMC,b.DWBH,b.DWMC from MOUNT_TAB a, MGMTDEPT_TAB b,AREA_TAB c where a.dwbh = b.dwbh and b.dwxzqh = c.qydm and VERIFY_STATUS = 1) g group by DWMC");
		try {
			list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
    }
    
    /**
     * 过滤正常且审核通过的卡口数量统计,数据范围包含广州市
     * @return 查询结果
     */
    public List<Map<String, String>> countAllOrgMountsInfo() {
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select g.DWMC as PERIOD,count(1) as COUNT from (select a.KKBH,a.KKMC,b.DWBH,b.DWMC from MOUNT_TAB a, " +
    			"MGMTDEPT_TAB b,AREA_TAB c where a.dwbh = b.dwbh and b.dwxzqh = c.qydm and VERIFY_STATUS = 1) g group by DWMC union " +
    			"select f.qymc as PERIOD, sum(f.AMOUNTS) as COUNT from (select g.DWMC, g.qymc, count(1) as AMOUNTS from " +
    			"(select a.KKBH, a.KKMC, b.DWBH, b.DWMC,c.qymc from MOUNT_TAB a, MGMTDEPT_TAB b, AREA_TAB c where a.dwbh = b.dwbh " +
    			"and b.dwxzqh = c.qydm and VERIFY_STATUS = 1) g group by g.DWMC,g.qymc) f group by f.qymc");
		try {
			list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
    }
    
    /**
     * 查询所有的部门
     * @return 查询结果
     */
    public List<Map<String, String>> allOrgInfo() {
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select b.DWBH,b.DWMC,c.QYDM,c.QYMC from MGMTDEPT_TAB b,AREA_TAB c where b.dwxzqh = c.qydm");
		try {
			list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
    
	/**
	 * 缓存枚举表
	 */
	public Map cachePubOrgData() {
		boolean updated = false;
		Map mp = null;
		try {
			mp = (Map) admin.getFromCache(ENUM_KEY_ORG, REFRESH_PERIOD);
			logger.debug("cacheOrgData部门枚举翻译来自缓存");
		} catch (NeedsRefreshException nre) {
			logger.debug("cacheOrgData部门枚举翻译来自数据库");
			try {
				mp = loadOllOrgInfo();
				admin.putInCache(ENUM_KEY_ORG, mp);
				updated = true;
			} finally {
				if (!updated) {
					admin.cancelUpdate(ENUM_KEY_ORG);
				}
			}
		}
		return mp;
	}
	
    /**
     * 获取所有部门（用于下拉框）
     * @return 组装结果
     * @author lsg
     */
    public Map<String, List<Map<String, String>>> loadOllOrgInfo() {
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select b.DWBH,b.DWMC from MGMTDEPT_TAB b");
		try {
			list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		Map<String, List<Map<String, String>>> dataMap = new HashMap<String, List<Map<String,String>>>();
		dataMap.put("ORG_INFO", list);
		return dataMap;
    }
    
    /**
	 * 加载所有的卡口信息
	 * @return 查询结果
	 */
	public List<Map<String, String>> loadAllMountInfos() {
		List<Map<String, String>> results = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select m.kkmc,m.kkbh,m.kkjd,m.kkwd,d.dwbh,d.dwmc from MOUNT_TAB2 m,MGMTDEPT_TAB d where m.dwbh = d.dwbh");
		try {
			results = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return results;
	}
	
	/**
     * 加载所有的卡口信息
     * @return 查询结果
     */
    public List<Map<String, String>> loadAllMountInfoTwo() {
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select KKBH,KKMC,KKJD,KKWD FROM MOUNT_TAB");
    	try {
			list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
    }
    
    /**
     * 加载区域表数据
     * @return
     */
    public List<Map<String, String>> loadAreaTabTwo() {
    	List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("select * FROM AREA_TAB");
    	try {
			list = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
    }
}
