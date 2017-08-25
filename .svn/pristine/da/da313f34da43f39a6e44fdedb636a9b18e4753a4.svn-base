package com.jp.tic.business.device.mapper;

import java.util.List;
import java.util.Map;

import com.jp.tic.framework.mybatis.BaseSqlMapper;

@SuppressWarnings("unchecked")
public interface BayonetManagerMapper extends BaseSqlMapper {
	
	/**
	 * 分页查询设备卡口基本信息
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryBayonetInfoByPage(Map<String, String> param);
	
	/**
	 * 统计设备卡口基本信息
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> countBayonetInfoDatas(Map<String, String> param);
	
	/**
	 * 添加设备卡口基本信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addBayonetInfo(Map<String, String> param);
	
	/**
	 * 添加待修改的设备卡口基本信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addBayonetEditInfo(Map<String, String> param);
	
	/**
	 * 删除设备卡口基本信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteBayonetInfo(Map<String, String> param);
	
	/**
	 * 更新设备卡口基本信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateBayonetInfo(Map<String, String> param);
	
	/**
	 * 更新设备卡口基本信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int goUpdateBayonetInfo(Map<String, String> param);
	
	/**
	 * 修改设备卡口基本信息数据，加载要修改的数据信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initBayonetDetailInfo(Map<String, String> param);
	
	/**
	 * 检查是否已经存在此卡点信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> checkBayonetInfo(Map<String, String> param);
	
	/**
	 * 关联删除卡口数据接收状态表基本信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteTimeStatusInfo(Map<String, String> param);

}
