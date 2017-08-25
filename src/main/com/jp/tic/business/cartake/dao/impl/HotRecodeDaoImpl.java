package com.jp.tic.business.cartake.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jp.tic.business.cartake.dao.HotRecodeDao;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;

@SuppressWarnings("unchecked")
@Repository
public class HotRecodeDaoImpl extends BaseDao implements HotRecodeDao {
	
	/**
	 * 查询红名单数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryHotRecodes(Map<String, String> param) {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select t.* from J_HOT_RECODES t order by t.start_date asc");
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 分页查询红名单信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryHotRecodeInfo(Map<String, String> param) {
		int pageStart = StringUtil.toInteger(param.get("page.start"));
        int rows = StringUtil.toInteger(param.get("page.limit"));
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select t.* from J_HOT_RECODES t where 1=1");
		buffer.append(this.packageSeachSql(param));
		buffer.append(" order by t.UPDATE_TIME desc");
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
	 * 统计红名单信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countHotRecodeInfo(Map<String, String> param) {
		List<Map<String, String>> counts = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select count(1) as COUNTS from J_HOT_RECODES t where 1=1");
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
	    if (StringUtil.checkStr(param.get("carNum"))) {
	    	buffer.append(" and t.car_num = '" + param.get("carNum").toUpperCase() + "'");
	    }
	    StringBuffer mountBuffer = new StringBuffer();
	    if (StringUtil.checkObj(param.get("mounts"))) {
	    	String[] mounts = param.get("mounts").split(",");
	    	buffer.append(" and (");
	    	for (int i = 0; i < mounts.length; i++) {
	    		if (StringUtil.checkObj(mountBuffer)) {
	    			mountBuffer.append(" or");
	    		}
	    		mountBuffer.append(" kkbhs like '%" + mounts[i] + "%'");
	    	}
	    	if (StringUtil.checkObj(mountBuffer)) {
		    	buffer.append(mountBuffer);
		    }
	    	buffer.append(")");
	    }
		return buffer.toString();
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
	 * 根据卡口名称查询
	 * @param kkmc 卡口名次
	 * @return 查询结果
	 */
	public List<Map<String, String>> findMountByKkmc(String kkmc) {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select * from MOUNT_TAB t where 1=1");
		if (StringUtil.checkStr(kkmc)) {
			sqlBuffer.append(" and t.kkmc like '%" + kkmc + "%'");
		}
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 根据卡口编号查询
	 * @param kkbh 卡口编号
	 * @return 查询结果
	 */
	public List<Map<String, String>> findMountByKkbh(String kkbhStr) {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select * from MOUNT_TAB t where 1=1");
		if (StringUtil.checkStr(kkbhStr)) {
			String[] kkbhs = kkbhStr.split(",");
			StringBuffer kkbhBuffer = new StringBuffer();
			for (int i = 0; i < kkbhs.length; i++) {
				if (StringUtil.checkObj(kkbhBuffer)) {
					kkbhBuffer.append(",");
				}
				kkbhBuffer.append("'").append(kkbhs[i]).append("'");
			}
			sqlBuffer.append(" and t.kkbh in (" + kkbhBuffer.toString() + ")");
		}
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 添加红名单记录
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addHotRecodeInfo(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("insert into J_HOT_RECODES(ID,CAR_NUM,START_DATE,END_DATE,KKBHS,REMARK) values (");
		buffer.append("SEQ_J_HOT_RECODES.NEXTVAL");
		buffer.append(",'" + param.get("carNum").toUpperCase() + "'");
		if (StringUtil.checkObj(param.get("startTime"))) {
			buffer.append(",to_date('" + param.get("startTime") + "','yyyy-mm-dd hh24:mi:ss')");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("endTime"))) {
			buffer.append(",to_date('" + param.get("endTime") + "','yyyy-mm-dd hh24:mi:ss')");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("kkbhs"))) {
			buffer.append(",'" + param.get("kkbhs") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("remark"))) {
			buffer.append(",'" + param.get("remark") + "'");
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
	 * 删除红名单记录
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteHotRecodeInfo(Map<String, String> param) {
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
		buffer.append("delete from J_HOT_RECODES where id in (" + idStr + ")");
		try {
			deleteFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return deleteFlag;
	}
	
	/**
	 * 更新红名单记录
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateHotRecodeInfo(Map<String, String> param) { 
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update J_HOT_RECODES set");
		if (StringUtil.checkObj(param.get("carNum"))) {
			buffer.append(" CAR_NUM = '" + param.get("carNum") + "'");
		}
		if (StringUtil.checkObj(param.get("startTime"))) {
			buffer.append(", START_DATE = to_date('" + param.get("startTime") + "','yyyy-mm-dd hh24:mi:ss')");
		}
		if (StringUtil.checkObj(param.get("endTime"))) {
			buffer.append(", END_DATE = to_date('" + param.get("endTime") + "','yyyy-mm-dd hh24:mi:ss')");
		}
		if (StringUtil.checkObj(param.get("kkbhs"))) {
			buffer.append(", KKBHS = '" + param.get("kkbhs") + "'");
		}
		if (StringUtil.checkObj(param.get("remark"))) {
			buffer.append(", REMARK = '" + param.get("remark") + "'");
		}
		String nowStr = DateUtil.getCurrentDateTime();
		buffer.append(", UPDATE_TIME = to_date('" + nowStr + "','yyyy-mm-dd hh24:mi:ss')");
		buffer.append(" where id = '" + param.get("id") + "'");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 修改红名单记录，加载要修改的数据信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initHotRecodeDetailInfo(Map<String, String> param) {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from J_HOT_RECODES where id = " + param.get("id"));
		try {
			datas = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 检查数据是否存在
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> checkHotRecodeInfo(Map<String, String> param) {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from J_HOT_RECODES where car_num = '" + param.get("carNum") + "'");
		try {
			datas = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
}
