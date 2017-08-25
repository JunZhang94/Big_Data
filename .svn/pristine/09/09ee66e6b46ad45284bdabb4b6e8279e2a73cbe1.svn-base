package com.jp.tic.business.device.dao;

import java.util.List;
import java.util.Map;

public interface BayonetManagerDao {
	
	/**
	 * 分页查询设备卡口审核信息
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryBayonetVerifyInfo(Map<String, String> param);
	
	/**
	 * 统计卡口审核数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countBayonetVerifyInfo(Map<String, String> param);
	
	/**
	 * 卡口审核的详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initBayoneVerifyDetail(Map<String, String> param);
	
	/**
	 * 审核卡口信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateBayoneVerifyInfo(Map<String, String> param);
	
	/**
	 * 首页查询卡口基本信息数据的详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> searchBayonetDetailInfo(Map<String, String> param);
	
	/**
	 * 处理待修改的卡口信息数据
	 * @param param 参数
	 */
	public void dealwithEditBayonet(Map<String, String> param);
	
	/**
	 * 对新增的卡口审核时候做处理
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int verifyUpdateAddBayonenet(Map<String, String> param);
	
	/**
	 * 对修改的卡口审核时候做处理
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int verifyUpdateEditBayonenet(Map<String, String> param);
	
	/**
	 * 对删除的卡口审核时候做处理
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int verifyUpdateDeleteBayonenet(Map<String, String> param);
	
	/**
	 * 删除卡口准备状态，数据先迁移
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addBayonetDeleteInfo(Map<String, String> param);
	
	/**
	 * 加载所有的卡口信息
	 * @return 查询结果
	 */
	public List<Map<String, String>> loadAllMountInfos();
	
	/**
	 * 根据卡口ID获取卡口名称信息
	 * @param kkbh
	 * @return
	 */
	public String getKkmcById(String kkbh);
	
	/**
	 * 加载所有的虚拟卡口信息,
	 * 重写该方法，加入缓存控制
	 * @return 查询结果
	 */
	public List<Map<String, String>> loadAllVirtualMountInfos(String flag);
	
	/**
	 * 加载所有的虚拟卡口信息,
	 * 重写该方法，加入缓存控制
	 * @return 查询结果
	 */
	public String loadAllVirtualDeptInfos();
	
	/**
	 * 加载所有的实体卡口信息,
	 * 重写该方法，加入缓存控制
	 * @return 查询结果
	 */
	public String loadAllDeptMountsInfos();
}
