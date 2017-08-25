package com.jp.tic.system.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.system.dao.ProviderDao;
import com.jp.tic.utils.lang.StringUtil;

@SuppressWarnings("unchecked")
@Repository
public class ProviderDaoImpl extends BaseDao implements ProviderDao {

	/**
	 * 分页查询供应商信息数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryProviderInfo(Map<String, String> param) {
		int pageStart = StringUtil.toInteger(param.get("page.start"));
        int rows = StringUtil.toInteger(param.get("page.limit"));
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from J_PROVIDER where 1=1");
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
	 * 统计供应商数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countProviderDatas(Map<String, String> param) {
		List<Map<String, String>> counts = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select count(*) as COUNTS from J_PROVIDER where 1=1");
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
		if (StringUtil.checkObj(param.get("providerName"))) {
			buffer.append(" and name like '%" + param.get("providerName") + "%'");
		}
		if (StringUtil.checkObj(param.get("id"))) {
			buffer.append(" and ID = '" + param.get("id") + "'");
		}
		return buffer.toString();
	}
	
	/**
	 * 添加设备
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addProviderInfo(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("insert into J_PROVIDER(ID,NAME,CANTACT_WAY,CANTACT_ADREES,REMARK,OPERATE_TIME) values (");
		buffer.append("SEQ_J_PROVIDER.NEXTVAL");
		if (StringUtil.checkObj(param.get("providerName"))) {
			buffer.append(",'" + param.get("providerName") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("cantactWay"))) {
			buffer.append(",'" + param.get("cantactWay") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("cantactAdrees"))) {
			buffer.append(",'" + param.get("cantactAdrees") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("remark"))) {
			buffer.append(",'" + param.get("remark") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("operateTime"))) {
			buffer.append(",to_date('" + param.get("operateTime") + "','yyyy-MM-dd HH24:mi:ss')");
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
	 * 删除供应商
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteProviderInfo(Map<String, String> param) {
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
		buffer.append("delete from J_PROVIDER where ID in (" + idStr + ")");
		try {
			deleteFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return deleteFlag;
	}
	
	/**
	 * 更新供应商
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateProviderInfo(Map<String, String> param) { 
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update J_PROVIDER set");
		if (StringUtil.checkObj(param.get("providerName"))) {
			buffer.append(" NAME = '" + param.get("providerName") + "'");
		} 
		if (StringUtil.checkObj(param.get("cantactWay"))) {
			buffer.append(", CANTACT_WAY = '" + param.get("cantactWay") + "'");
		}
		if (StringUtil.checkObj(param.get("cantactAdrees"))) {
			buffer.append(", CANTACT_ADREES = '" + param.get("cantactAdrees") + "'");
		}
		if (StringUtil.checkObj(param.get("remark"))) {
			buffer.append(", REMARK = '" + param.get("remark") + "'");
		}
		if (StringUtil.checkObj(param.get("contactAddress"))) {
			buffer.append(", CONTACT_ADDRESS = '" + param.get("contactAddress") + "'");
		}
		if (StringUtil.checkObj(param.get("operateTime"))) {
			buffer.append(", OPERATE_TIME = to_date('" + param.get("operateTime") + "','yyyy-MM-dd HH24:mi:ss')");
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
	 * 修改供应商，加载要修改的数据信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initProviderDetailInfo(Map<String, String> param) {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from J_PROVIDER where 1=1");
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
	 * 填充供应商下拉框
	 * @return 查询结果
	 */
	public List<Map<String, String>> findProviderData() {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select ID,NAME,CANTACT_WAY,CANTACT_ADREES from J_PROVIDER");
		try {
			datas = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 检查是否存在此供应商信息
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> checkProviderInfo(Map<String, String> param) {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from J_PROVIDER where ID = " + param.get("id"));
		try {
			datas = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
}
