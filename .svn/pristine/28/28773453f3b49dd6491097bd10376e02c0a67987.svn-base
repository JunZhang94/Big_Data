package com.jp.tic.system.dao;

import java.util.List;
import java.util.Map;

import com.jp.tic.system.entity.ExportStatus;

public interface ExcelExportDao {

	/**
	 * 通过JDBC，sql查询出要导出的数据
	 * @param sql 查询语句
	 * @return 返回结果
	 */
	public List<Map<String, String>> loadExportDataSQL(String sql);
	
	/**
     *  保存导出状态
     * @param param 查询参数
     */
     public int saveAsynExportStatus(Map<String, String> param);
     
     /**
   	  * 通过JDBC，sql查询出要导出的数据
   	  * @param sql 查询语句
   	  * @param start 开始位置
   	  * @param limit 结束位置
   	  * @return 返回结果
   	  */
   	 public List<Map<String, String>> loadPageDataSQL(String sql, int start, int limit);
   	 
   	 /**
   	  * 根据ID取的导数状态表数据
   	  * @param id 主键
   	  * @return 查询结果
   	  */
   	 public List<Map<String, String>> getInfoById(String id);
   	 
   	/**
      * 更新保存状态
      * @param exportStatus 状态信息对象
      */
     public void updateExport(ExportStatus exportStatus);
     
     /**
      * 删除导出状态
      * @param id
      * @throws Exception
      */
     public void deleteExportItems(String id) throws Exception;
     
     /**
      * 查询导出状态
      * @param id
      * @throws Exception
      */
     public List<Map<String, String>> findExportItems(String id) throws Exception;
     
     /**
      * 更新导出状态
      * @param exportStatus 状态信息对象
      */
     public void updateExportStatus(Map<String, String> param);
     
     /**
 	 * 清空导出状态
 	 * @param id
 	 * @throws Exception
 	 */
 	public void clearnExportInfo(String ids, String userCode) throws Exception;
 	
 	/**
	 * 查询导出状态
	 */
	public List<Map<String, String>> findAllExportItems(String ids) throws Exception;
	
	/**
	 * 查询用户对应的导出数据
	 */
	public List<Map<String, String>> findDataByUserCode(String user_code) throws Exception;
	
	/**
     * 保存图片下载状态
     * @param param 查询参数
     */
     public int saveAsynDownloadImage(Map<String, String> param);
     
     /**
      * 更新图片下载保存状态
      * @param param 状态信息对象
      */
     public void updateDownloadImag(Map<String, String> param);
     
     /**
  	  * 根据ID取得下载状态表数据
  	  * @param id 主键
  	  * @return 查询结果
  	  */
  	 public List<Map<String, String>> getImageStatusById(String id);
  	 
  	/**
      * 更新下载状态
      * @param exportStatus 状态信息对象
      */
     public void updateDownloadStatus(Map<String, String> param);
     
     /**
      * 删除下载文件
      * @param id
      * @throws Exception
      */
     public void deleteDownloadItems(String id) throws Exception;
     
     /**
 	 * 查询所有图片下载数据
 	 */
 	public List<Map<String, String>> findAllDownloadItems(String ids) throws Exception;
 	
 	/**
	 * 查询用户对应的图片下载数据
	 */
	public List<Map<String, String>> findDownloadDataByUserCode(String user_code) throws Exception;
	
	/**
	 * 清空下载数据
	 * @param id
	 * @throws Exception
	 */
	public void clearnDownloadInfo(String ids, String userCode) throws Exception;
}
