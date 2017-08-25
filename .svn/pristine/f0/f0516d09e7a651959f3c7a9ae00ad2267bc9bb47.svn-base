package com.jp.tic.system.dao;

import java.util.List;
import java.util.Map;

public interface OrganizationDao {

	/**
     * 获取组织结构数据列表
     * @param deviceFlag 树是否加载设备
     * @param orgFlag 是否加载卡点
     * @return 组织结构数据列表
     * @author lsg
     */
    public List<Map<String, String>> getOrganizations(boolean deviceFlag, boolean orgFlag);
    
    /**
     * 获取组织结构数据列表,只加载分局
     * @return 组织结构数据列表
     * @author lsg
     */
    public List<Map<String, String>> onlyOrgTreeInfo();
    
    /**
     * 获取组织结构数据列表中的 卡口反向
     * @param deviceFlag
     * @param orgFlag
     * @return
     */
    public List<Map<String,String>> getOgnDirection(boolean deviceFlag, boolean orgFlag, boolean userFlag, String orgId);
    public List<Map<String, String>> loadOrgTopestData();

    public List<Map<String, String>> loadOrgTopestRole();
    
    /**
     * 加载所有的部门信息
     * @return 查询结果
     */
    public List<Map<String, String>> loadAllOrgInfo();
    
    /**
     * 加载部门到卡口之间所有数据的名称
     * param orgName卡口或者组织名称
     * @return 查询结果
     */
    public List<Map<String, String>> findAllOrgName(String[] orgName);
    /**
     * 根据orgType查找组织结构信息
     * @param param 查询参数
     * @return 查询结果
     * xushuxin
     */
    public List<Map<String, String>> findOrgInfoByOrgTypenew(Map<String, String> param);
    /**
     * 查询被选中的卡口信息
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> findHavingData(Map<String, String> param);
    
    /**
     * 根据orgType查找组织结构信息
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> findOrgInfoByOrgType(Map<String, String> param);
    
    /**
     * 根据orgType查找所有部门信息
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> findDeptInfoByOrgType(Map<String, String> param);
    
    /**
     * 关联到卡口获取组织结构树，通过卡口查询条件，找到对应存在的部门
     * @param kkmc 卡口名称
     * @param orgFlag 是否加载卡点
     * @return 剔除卡点的组织结构树
     * @author lsg
     */
    public List<Map<String, String>> getOrganizationsByKkmc(String kkmc);
    
    /**
     * 加载部门到卡口之间所有数据的名称，直接查询数据库，汉字模糊匹配
     * param orgName卡口或者组织名称
     * @return 查询结果
     */
    public List<Map<String, String>> findAllOrgNameNoCache(String[] orgName);
    
    /**
     * 关联到卡口获取组织结构树，通过卡口查询条件，找到对应存在的部门
     * @param kkmc 卡口名称
     * @param orgFlag 是否加载卡点
     * @return 剔除卡点的组织结构树
     * @author lsg
     */
    public List<Map<String, String>> getOrganizationsByKkmcNocache(String kkmc);
    
    /**
     * 加载所有的卡口信息
     * @return 查询结果
     */
    public List<Map<String, String>> loadAllMountInfo();
    
    /**
     * 查询所有的设备信息
     * @return 查询结果
     * @author lsg
     */
    public List<Map<String, String>> findAllDeviceInfo();
    
    /**
     * 查询所有的方向信息
     * @return 查询结果
     * @author lsg
     */
    public List<Map<String, String>> findAllDirectionInfo();
    
    /**
     * 根据orgType查找组织结构信息,只显示正常在线的卡口
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> findOnlineMountInfo(Map<String, String> param);
    
    /**
     * 查询所有的方向信息,数据保存至缓存
     * param orgName 方向参数
     * @return 查询结果
     */
    public List<Map<String, String>> findAllDirection(String[] orgName);
    
    /**
     * 查询所有的方向信息,数据保存至缓存
     * param kkbh 方向参数
     * @return 查询结果
     */
    public List<Map<String, String>> findAllDirectionNew(String kkbh);
    
    /**
     * 根据输入方向参数加载部门到方向之间所有数据的名称,数据保存至缓存
     * param orgName 方向参数
     * @return 查询结果
     */
    public List<Map<String, String>> findDirectionByName(String[] orgName);
    
    /**
     * 只查询方向信息
     * param orgName 方向参数
     * @return 查询结果
     */
    public List<Map<String, String>> findOnlyDirection(String[] orgName);
    
    /**
     * 查询被勾选的方向
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> findCheckedDirectionsInfo(Map<String, String> param);
    
    /**
     * 获取组织结构数据列表
     * @return 组织结构数据列表
     * @author lsg
     */
    public List<Map<String, String>> getDeptHavingDirection();
    
    /**
     * 关联到卡口获取组织结构树，通过方向名称查询条件，找到对应存在的部门
     * @param directionName 方向名称
     * @return 剔除方向的组织结构树
     * @author lsg
     */
    public List<Map<String, String>> getOrgByDirectionNumberNocache(String directionName);
    
    /**
     * 根据名称查询所有的方向数据，汉字模糊匹配
     * param orgName卡口或者组织名称
     * @return 查询结果
     */
    public List<Map<String, String>> findDirectionByNameNoCache(String[] orgName);
    
    /**
     * 卡口数量统计
     * @return 查询结果
     */
    public List<Map<String, String>> countOrgMountsInfo();
    
    /**
     * 过滤正常且审核通过的卡口数量统计
     * @return 查询结果
     */
    public List<Map<String, String>> countUsringOrgMountsInfo();
    
    /**
     * 过滤正常且审核通过的卡口数量统计,数据范围包含广州市
     * @return 查询结果
     */
    public List<Map<String, String>> countAllOrgMountsInfo();
    
    /**
     * 查询所有的部门
     * @return 查询结果
     */
    public List<Map<String, String>> allOrgInfo();
    
    /**
     * 获取所有部门（用于下拉框）
     * @return 组装结果
     * @author lsg
     */
    public Map<String, List<Map<String, String>>> loadOllOrgInfo();
    
    /**
	 * 缓存枚举表
	 */
	public Map cachePubOrgData();
	
	/**
	 * 加载所有的卡口信息
	 * @return 查询结果
	 */
	public List<Map<String, String>> loadAllMountInfos();
	
	/**
     * 加载所有的虚拟卡口信息
     * @param param 查询参数
     * @return
     */
    public List<Map<String, String>> findVulMountInfos(Map<String, String> param);
    
    /**
     * 加载所有的卡口信息
     * @return 查询结果
     */
    public List<Map<String, String>> loadAllMountInfoTwo();
    
    /**
     * 加载区域表数据
     * @return
     */
    public List<Map<String, String>> loadAreaTabTwo();
}
