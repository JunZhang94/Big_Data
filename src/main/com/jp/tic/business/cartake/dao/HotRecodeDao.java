package com.jp.tic.business.cartake.dao;

import java.util.List;
import java.util.Map;

public interface HotRecodeDao {
	
	/**
	 * 查询红名单数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryHotRecodes(Map<String, String> param);
	
	/**
	 * 分页查询红名单信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryHotRecodeInfo(Map<String, String> param);
	
	/**
	 * 统计红名单信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countHotRecodeInfo(Map<String, String> param);
	
	/**
	 * 添加红名单记录
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addHotRecodeInfo(Map<String, String> param);
	
	/**
	 * 删除红名单记录
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteHotRecodeInfo(Map<String, String> param);
	
	/**
	 * 更新红名单记录
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateHotRecodeInfo(Map<String, String> param);
	
	/**
	 * 修改红名单记录，加载要修改的数据信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initHotRecodeDetailInfo(Map<String, String> param);
	
	/**
	 * 检查数据是否存在
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> checkHotRecodeInfo(Map<String, String> param);
	
	/**
	 * 根据卡口名称查询
	 * @param kkmc 卡口名次
	 * @return 查询结果
	 */
	public List<Map<String, String>> findMountByKkmc(String kkmc);
	
	/**
	 * 根据卡口编号查询
	 * @param kkbh 卡口编号
	 * @return 查询结果
	 */
	public List<Map<String, String>> findMountByKkbh(String kkbhStr);
}
