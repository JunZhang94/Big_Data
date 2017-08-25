package com.jp.tic.security.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jp.tic.security.dao.ModuleDao;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;

@SuppressWarnings("unchecked")
@Repository
public class ModuleDaoImpl extends BaseDao implements ModuleDao {

	/**
	 * 查询所有的菜单数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> findAllModuleDatas(String userCode) {
		List<Map<String, String>> results = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select d.* from sys_t_user a,sys_t_roles b,sys_role c,j_sys_menu d " +
				"where a.role_id=b.role_id and a.user_code='"+userCode+"' and b.role_id=c.roleid "+
	       "and c.actionid=d.id and d.isvalid=1");
//		sqlBuffer.append("select * from j_sys_menu where 1=1 and isvalid = 1");
		try {
			results = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return results;
	}
	
	/**
	 * 新增角色
	 * @param param 页面参数
	 * @param userMap 用户参数
	 * @return 处理结果
	 */
	public int addRoleInfo(Map<String, String> param, Map<String, String> userMap) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		String curentTime = DateUtil.getCurrentTime();
		String[] times = curentTime.split(":");
		String perimeryId = times[0] + times[1] + times[2]; //以当前时间的时分秒作为主键
		buffer.append("insert into SYS_T_ROLES(ROLE_ID,ROLE_CODE,ROLE_NAME,CREATE_DATE,CREATE_USER, ADD_ROLE, EDIT_ROLE, DELETE_ROLE, USEING_FLAG, EDIT_VEDIAO) values (");
		buffer.append(perimeryId);
		buffer.append(",'" + param.get("role.permgroupRole") + "'");
		buffer.append(",'" + param.get("role.name") + "'");
		buffer.append(",to_date('" + param.get("updateDate") + "','yyyy-MM-dd HH24:mi:ss')");
		buffer.append(",'" + userMap.get("USER_NAME") + "'");
		buffer.append("," + param.get("addBut"));
		buffer.append("," + param.get("editBut"));
		buffer.append("," + param.get("deleteBut"));
		buffer.append("," + param.get("unsingFlag"));
		buffer.append("," + param.get("editVediao"));
		buffer.append(")"); 
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		this.addRoleUserMap(param, perimeryId);
		return saveFlag;
	}
	
	/**
	 * 生成功能权限角色与用户的关系数据,批量生成
	 * @param param 页面参数
	 * @param perimeryId 生成的主键
	 */
	public void addRoleUserMap(Map<String, String> param, String perimeryId) {
		String roleIdStr = param.get("mids");
		String[] roleIds = roleIdStr.split(",");
		String[] sqls = new String[roleIds.length];
		StringBuffer sqlBuffer = null;
		for (int i = 0; i < roleIds.length; i++) {
			sqlBuffer = new StringBuffer();
			sqlBuffer.append("insert into SYS_ROLE(ID,ACTIONID,ROLEID,CREATEDT) values (");
			sqlBuffer.append("SEQ_SYS_ROLE.NEXTVAL");
			sqlBuffer.append("," + roleIds[i]);
			sqlBuffer.append("," + perimeryId);
			sqlBuffer.append(",to_date('" + param.get("updateDate") + "','yyyy-MM-dd HH24:mi:ss')");
			sqlBuffer.append(")"); 
			sqls[i] = sqlBuffer.toString();
		}
		try {
			this.updateBatchSql(sqls);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 删除角色
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteRoleInfo(Map<String, String> param) {
		int deleteFlag = 0;
		StringBuffer buffer = new StringBuffer();
		String[] ids = param.get("USER_IDS").split(",");
		String idStr = "";
		for (int i = 0; i < ids.length; i++) {
			if (StringUtil.checkStr(idStr)) {
				idStr += ",";
			}
			idStr += ids[i];
		}
		buffer.append("delete sys_t_roles where role_Id in (" + idStr + ")");
		try {
			deleteFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		this.deleteRoleUserMap(ids);
		return deleteFlag;
	}
	
	/**
	 * 删除角色关系表中无用的关联数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteRoleUserMap(String[] ids) {
		int deleteFlag = 0;
		StringBuffer buffer = new StringBuffer();
		String idStr = "";
		for (int i = 0; i < ids.length; i++) {
			if (StringUtil.checkStr(idStr)) {
				idStr += ",";
			}
			idStr += ids[i];
		}
		buffer.append("delete sys_role where roleid in (" + idStr + ")");
		try {
			deleteFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return deleteFlag;
	}
	
	/**
	 * 查询已选的菜单项
	 * @param param 页面参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> findCheckedModuleInfo(Map<String, String> param) {
		List<Map<String, String>> results = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select r.*,a.name from sys_role r,J_SYS_MENU a where r.actionid = a.id and roleid = " + param.get("id"));
		try {
			results = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return results;
	}
	
	/**
	 * 初始化待修改的角色数据
	 * @param param 页面参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> initRoleUpdateData(Map<String, String> param) {
		List<Map<String, String>> results = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select * from SYS_T_ROLES where role_id = " + param.get("id"));
		try {
			results = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return results;
	}
	
	/**
	 * 修改角色信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateRoleInfo(Map<String, String> param) { 
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update SYS_T_ROLES set");
		if (StringUtil.checkObj(param.get("role.name"))) {
			buffer.append(" ROLE_NAME = '" + param.get("role.name") + "'");
		} 
		if (StringUtil.checkObj(param.get("role.permgroupRole"))) {
			buffer.append(", ROLE_CODE = '" + param.get("role.permgroupRole") + "'");
		}
		buffer.append(", ADD_ROLE = " + param.get("addBut"));
		buffer.append(", EDIT_ROLE = " + param.get("editBut"));
		buffer.append(", DELETE_ROLE = " + param.get("deleteBut"));
		buffer.append(", USEING_FLAG = " + param.get("unsingFlag"));
		buffer.append(", EDIT_VEDIAO = " + param.get("editVediao"));
		buffer.append(" where ROLE_ID = '" + param.get("role.id") + "'");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		this.updateRoleUserMap(param);
		return saveFlag;
	}
	
	/**
	 * 修改角色关系表的数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public void updateRoleUserMap(Map<String, String> param) { 
		String[] ids = param.get("role.id").split(","); //其实长度只有1
		this.deleteRoleUserMap(ids);
		String curentTime = DateUtil.getCurrentDateTime();
		param.put("updateDate", curentTime);
		this.addRoleUserMap(param, param.get("role.id"));
	}
	
	/**
	 * 获取视频编辑按钮状态
	 * @param roleId 角色ID
	 * @return 返回结果，0表示未授权，1表示已授权
	 */
	public String getEditVediaoStatus(String roleId) {
		List<Map<String, String>> results = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select * from SYS_T_ROLES where role_id = " + roleId);
		try {
			results = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		String status = "0";
		if (results != null && results.size() > 0) {
			status = results.get(0).get("EDIT_VEDIAO");
		}
		return status;
	}
}
