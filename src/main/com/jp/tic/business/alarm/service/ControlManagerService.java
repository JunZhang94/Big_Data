package com.jp.tic.business.alarm.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface ControlManagerService {

	/**
	 * 分页查询布控信息数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryControlInfo(Map<String, String> param);
	
	/**
	 * 统计布控信息数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countControlDatas(Map<String, String> param);
	
	/**
	 * 保存布控信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int saveControlInfo(Map<String, String> param);
	
	/**
	 * 布控时，检查是否存在此布控信息，精确布控
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> checkControlCarNum(Map<String, String> param);
	
	/**
	 * 初始化修改数据的详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> loadControlDetailInfo(Map<String, String> param);
	
	/**
	 * 更新布控信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateControlInfo(Map<String, String> param);
	
	/**
	 * 删除布控信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteControlInfo(Map<String, String> param);
	
	/**
	 * 更新布控信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int verifyControlInfo(Map<String, String> param);
	
	/**
	 * 撤控布控信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int revokeControlInfo(Map<String, String> param);
	
	/**
	 * 撤控布控审核信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int revokeVerifyControlInfo(Map<String, String> param);
	
	/**
	 * 导出布控信息数据
	 * @param partIds 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> exportControlInfoById(String[] partIds);
	
	/**
	 * 根据查询条件导出查询数据
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public String exportQuerySql(Map<String, String> param);
	/**
	 * 根据查询条件获取布控列表
	 * @param sqlStr
	 * @return
	 */
	public Map<String, Object> doQuery(String sqlStr);
	
	public Object[] getExportList(Map<String, String> searchParam);
	
	/**
	 * 分页查询黑名单数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryBlackListInfo(Map<String, String> param);
	
	/**
	 * 统计黑名单数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countBlackList(Map<String, String> param);
	
	/**
     * 解析文件得到carNum的list
     * @param file
     * @return ArrayList<DevicesEntity>
     * @throws Exception
     */
	public List<Map<String, String>> parseblackListExcel(MultipartFile file) throws Exception;
	
	/**
	 * 保存黑名单信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int saveBlackListInfo(List<Map<String, String>> param, String userName, String listType);
}
