package com.jp.tic.system.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.system.dao.ExcelExportDao;
import com.jp.tic.system.entity.ExportStatus;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;

@SuppressWarnings("unchecked")
@Repository
public class ExcelExportDaoImpl extends BaseDao implements ExcelExportDao {

	/**
	 * 通过JDBC，sql查询出要导出的数据
	 * @param sql 查询语句
	 * @return 返回结果
	 */
	public List<Map<String, String>> loadExportDataSQL(String sql) {
		List<Map<String, String>> datas = null;
		try {
			datas = this.queryBySql(sql);
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		return datas;
	}
	
	/**
     *  保存导出状态
     * @param param 查询参数
     */
     public int saveAsynExportStatus(Map<String, String> param) {
    	int saveFlag = 0;
 		StringBuffer buffer = new StringBuffer();
 		buffer.append("insert into J_EXPORT_STATUS(ID,USER_CODE,START_TIME,STATUS,TYPE,FILE_NAME) values (");
 		buffer.append("'" + param.get("uniqueId") + "'");
 		buffer.append(",'" + param.get("userId") + "'");
 		buffer.append(",to_date('" + param.get("startTime") + "','yyyy-MM-dd HH24:mi:ss')");
 		buffer.append("," + param.get("status"));
 		buffer.append(",'" + param.get("type") + "'");
 		buffer.append(",'" + param.get("fileName") + "'");
 		buffer.append(")"); 
 		try {
 			saveFlag = this.updateBySql(buffer.toString());
 		} catch (Exception e) {
 			e.printStackTrace();
 		}
 		return saveFlag;
     }
     
     /**
      * 保存图片下载状态
      * @param param 查询参数
      */
      public int saveAsynDownloadImage(Map<String, String> param) {
     	int saveFlag = 0;
  		StringBuffer buffer = new StringBuffer();
  		buffer.append("insert into J_DOWNLOAD_IMAGE(ID,USER_CODE,START_TIME,STATUS,TYPE,FILE_NAME) values (");
  		buffer.append("'" + param.get("id") + "'");
  		buffer.append(",'" + param.get("userCode") + "'");
  		buffer.append(",to_date('" + param.get("startTime") + "','yyyy-MM-dd HH24:mi:ss')");
  		buffer.append("," + param.get("status"));
  		buffer.append(",'" + param.get("type") + "'");
  		buffer.append(",'" + param.get("fileName") + "'");
  		buffer.append(")"); 
  		try {
  			saveFlag = this.updateBySql(buffer.toString());
  		} catch (Exception e) {
  			e.printStackTrace();
  		}
  		return saveFlag;
      }
     
     /**
  	 * 通过JDBC，sql查询出要导出的数据
  	 * @param sql 查询语句
  	 * @param start 开始位置
  	 * @param limit 结束位置
  	 * @return 返回结果
  	 */
  	 public List<Map<String, String>> loadPageDataSQL(String sql, int start, int limit) {
  		List<Map<String, String>> datas = null;
  		String pageSql = this.initPageSql(start, limit, sql);
		try {
			datas = this.queryBySql(pageSql);
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		return datas;
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
  	  * 根据ID取的导数状态表数据
  	  * @param id 主键
  	  * @return 查询结果
  	  */
  	 public List<Map<String, String>> getInfoById(String id) {
  		List<Map<String, String>> datas = null;
  		StringBuffer sqlStr = new StringBuffer();
  		sqlStr.append("select STATUS from J_EXPORT_STATUS where ID = '" + id + "'");
  		try {
			datas = this.queryBySql(sqlStr.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		return datas;
  	 }
  	 
  	/**
  	  * 根据ID取得下载状态表数据
  	  * @param id 主键
  	  * @return 查询结果
  	  */
  	 public List<Map<String, String>> getImageStatusById(String id) {
  		List<Map<String, String>> datas = null;
  		StringBuffer sqlStr = new StringBuffer();
  		sqlStr.append("select * from J_DOWNLOAD_IMAGE where ID = '" + id + "'");
  		try {
			datas = this.queryBySql(sqlStr.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		return datas;
  	 }
  	 
  	/**
      * 更新保存状态
      * @param exportStatus 状态信息对象
      */
     public void updateExport(ExportStatus exportStatus) {
  		StringBuffer buffer = new StringBuffer();
  		buffer.append("update J_EXPORT_STATUS set STATUS = " + exportStatus.getStatus());
  		buffer.append(", END_TIME = to_date('" + DateUtil.parseToString(exportStatus.getEndTime(), "yyyy-MM-dd HH:mm:ss") + "','yyyy-mm-dd hh24:mi:ss')");
  		if (StringUtil.checkStr(exportStatus.getMsg())) {
  			buffer.append(",MSG = '" + exportStatus.getMsg() + "'");
  		}
  		buffer.append(" where ID = '" + exportStatus.getId() + "'");
  		try {
  			this.updateBySql(buffer.toString());
  		} catch (Exception e) {
  			e.printStackTrace();
  		}
     }
     
     /**
      * 更新图片下载保存状态
      * @param param 状态信息对象
      */
     public void updateDownloadImag(Map<String, String> param) {
  		StringBuffer buffer = new StringBuffer();
  		buffer.append("update J_DOWNLOAD_IMAGE set STATUS = " + param.get("status"));
  		buffer.append(", END_TIME = to_date('" + param.get("endTime") + "','yyyy-mm-dd hh24:mi:ss')");
  		if (StringUtil.checkStr(param.get("msg"))) {
  			buffer.append(",MSG = '" + param.get("msg") + "'");
  		}
  		buffer.append(" where ID = '" + param.get("id") + "'");
  		try {
  			this.updateBySql(buffer.toString());
  		} catch (Exception e) {
  			e.printStackTrace();
  		}
     }
     
	/**
	 * 删除导出状态
	 * @param id
	 * @throws Exception
	 */
	public void deleteExportItems(String id) throws Exception {
		StringBuffer sqlStr = new StringBuffer();
		sqlStr.append("delete J_EXPORT_STATUS where ID = '" + id + "'");
		try {
		    this.updateBySql(sqlStr.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 查询导出状态
	 */
	public List<Map<String, String>> findExportItems(String id) throws Exception {
		List<Map<String, String>> datas = null;
		StringBuffer sqlStr = new StringBuffer();
		sqlStr.append("select * from J_EXPORT_STATUS where ID = '" + id + "'");
		try {
			datas = this.queryBySql(sqlStr.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return datas;
	}
	
	/**
     * 更新导出状态
     * @param exportStatus 状态信息对象
     */
    public void updateExportStatus(Map<String, String> param) {
 		StringBuffer buffer = new StringBuffer();
 		buffer.append("update J_EXPORT_STATUS set STATUS = " + param.get("STATUS"));
 		buffer.append(" where ID = '" + param.get("ID") + "'");
 		try {
 			this.updateBySql(buffer.toString());
 		} catch (Exception e) {
 			e.printStackTrace();
 		}
    }
    
    /**
     * 更新下载状态
     * @param exportStatus 状态信息对象
     */
    public void updateDownloadStatus(Map<String, String> param) {
 		StringBuffer buffer = new StringBuffer();
 		buffer.append("update J_DOWNLOAD_IMAGE set STATUS = " + param.get("STATUS"));
 		buffer.append(" where ID = '" + param.get("ID") + "'");
 		try {
 			this.updateBySql(buffer.toString());
 		} catch (Exception e) {
 			e.printStackTrace();
 		}
    }
    
    
    /**
	 * 清空导出状态
	 * @param id
	 * @throws Exception
	 */
	public void clearnExportInfo(String ids, String userCode) throws Exception {
		StringBuffer sqlStr = new StringBuffer();
		if (!StringUtil.checkObj(ids)) {
			if (StringUtil.checkObj(userCode)) {
				sqlStr.append("delete J_EXPORT_STATUS where USER_CODE = '" + userCode + "'");
			}
		} else {
			sqlStr.append("delete J_EXPORT_STATUS where ID in (" + ids + ")");
		}
		try {
		    this.updateBySql(sqlStr.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 清空下载数据
	 * @param id
	 * @throws Exception
	 */
	public void clearnDownloadInfo(String ids, String userCode) throws Exception {
		StringBuffer sqlStr = new StringBuffer();
		if (!StringUtil.checkObj(ids)) {
			if (StringUtil.checkObj(userCode)) {
				sqlStr.append("delete J_DOWNLOAD_IMAGE where USER_CODE = '" + userCode + "'");
			}
		} else {
			sqlStr.append("delete J_DOWNLOAD_IMAGE where ID in (" + ids + ")");
		}
		try {
		    this.updateBySql(sqlStr.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 查询导出状态
	 */
	public List<Map<String, String>> findAllExportItems(String ids) throws Exception {
		List<Map<String, String>> datas = null;
		StringBuffer sqlStr = new StringBuffer();
		sqlStr.append("select * from J_EXPORT_STATUS where ID in (" + ids + ")");
		try {
			datas = this.queryBySql(sqlStr.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return datas;
	}
	
	/**
	 * 查询所有图片下载数据
	 */
	public List<Map<String, String>> findAllDownloadItems(String ids) throws Exception {
		List<Map<String, String>> datas = null;
		StringBuffer sqlStr = new StringBuffer();
		sqlStr.append("select * from J_DOWNLOAD_IMAGE where ID in (" + ids + ")");
		try {
			datas = this.queryBySql(sqlStr.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return datas;
	}
	
	/**
	 * 查询用户对应的导出数据
	 */
	public List<Map<String, String>> findDataByUserCode(String user_code) throws Exception {
		List<Map<String, String>> datas = null;
		StringBuffer sqlStr = new StringBuffer();
		sqlStr.append("select * from J_EXPORT_STATUS where USER_CODE = '" + user_code + "'");
		try {
			datas = this.queryBySql(sqlStr.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return datas;
	}
	
	/**
	 * 查询用户对应的图片下载数据
	 */
	public List<Map<String, String>> findDownloadDataByUserCode(String user_code) throws Exception {
		List<Map<String, String>> datas = null;
		StringBuffer sqlStr = new StringBuffer();
		sqlStr.append("select * from J_DOWNLOAD_IMAGE where USER_CODE = '" + user_code + "'");
		try {
			datas = this.queryBySql(sqlStr.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return datas;
	}
	
	/**
	 * 删除下载文件
	 * @param id
	 * @throws Exception
	 */
	public void deleteDownloadItems(String id) throws Exception {
		StringBuffer sqlStr = new StringBuffer();
		sqlStr.append("delete J_DOWNLOAD_IMAGE where ID = '" + id + "'");
		try {
		    this.updateBySql(sqlStr.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
