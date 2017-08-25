package com.jp.tic.system.service;

import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.scheduling.annotation.Async;
import org.springframework.transaction.annotation.Transactional;

import com.jp.tic.system.entity.ExportStatus;

public interface ExcelExportService {

	/**
     * 采用JDBC sql同步导出
     * @param processorName
     * @param hql
     * @return 导出的文件
     */
    public void doExportSyncSQL(String processorName, OutputStream stream, String[] texts, int[] widths, List data, String exportFlag);
    
    /**
     *  保存导出状态
     * @param fileName 文件名称
     * @param userCode 用户ID
     */
     public ExportStatus saveAsynExportStatus(String fileName, String userCode);
     
     /**
   	  * 通过JDBC，sql查询出要导出的数据
   	  * @param sql 查询语句
   	  * @param start 开始位置
   	  * @param limit 结束位置
   	  * @return 返回结果
   	  */
   	 public List<Map<String, String>> loadPageDataSQL(String sql, int start, int limit);
   	 
   	/**
      * 是否取消导出
      * @param id 状态ID
      * @return true 取消  false 未取消
      */
     @Transactional
     public boolean isUserCancelExport(String id);
     
     /**
      * 更新保存状态
      * @param exportStatus 状态信息对象
      */
     public void updateExport(ExportStatus exportStatus);
     
     /**
      * 异步导出查询数据
      * @param processorName 实例对象
      * @param sql 查询语句
      * @param name 文件名称
      * @param userCode 用户ID
      * @param httpSession 会话
      */
     public void doExportAsyncSQL(String processorName, Map<String, String> param,String name, Map<String, Object> userMap,HttpSession httpSession, String[] texts, int[] widths);
     
     /**
 	 * 通过JDBC，sql查询出要导出的数据
 	 * @param sql 查询语句
 	 * @return 返回结果
 	 */
 	public List<Map<String, String>> loadExportDataSQL(String sql);
 	
 	/**
 	 * 删除导出状态
 	 * @param id
 	 * @param session
 	 * @throws Exception
 	 */
    public void deleteExport(String id, HttpSession session) throws Exception;
    
    /**
     * 查询导出状态
     * @param id
     * @throws Exception
     */
    public List<Map<String, String>> findExportItemsById(String id) throws Exception;
    
    /**
     * 更新导出状态
     * @param exportStatus 状态信息对象
     */
    public void updateExportStatus(Map<String, String> param);
    
    /**
	 * 清空导出数据
	 * @param ids
	 * @param session
	 * @throws Exception
	 */
    @Transactional
    public void clearnExportInfo(String ids, HttpServletRequest request, HttpSession session) throws Exception;
    
    /**
	 * 清空图片下载数据
	 * @param ids
	 * @param session
	 * @throws Exception
	 */
    @Transactional
    public void clearnDownloadInfo(String ids, HttpServletRequest request, HttpSession session) throws Exception;
    
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
     public boolean isUserCancelDownload(String id);
     
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
 	 * @param session
 	 * @throws Exception
 	 */
     @Transactional
     public void deleteDownload(String id, HttpSession session) throws Exception;
}
