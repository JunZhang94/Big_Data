package com.jp.tic.system.service;

import java.util.List;
import java.util.Map;

import com.jp.tic.system.entity.OrgEntity;

/**
 * 组织结构类
 * 
 * @author lsg
 * 
 */

public interface OrganizationService {
    
    /**
     * 获取组织结构树形映射数据
     * 
     * 树形映射数据包含属性项目：id - ID, text - 标签文字, data - 组织结构数据Map形式, children - 子数据  , coding - 组织编码
     * 
     * @param ids
     *            需要过滤的组织结构ID，NULL时表示不过滤
     * @param removeUnchecked
     *            是否移除未选中的节点
     * @param deviceFlag 是否展示设备节点
     * @return 树形结构映射数据
     * 
     * @author Teon
     */
    public Map<String, Object> getOrganizationTreeMap(List<Long> ids,
            boolean removeUnchecked, boolean deviceFlag);
    
    /**
     * 获取组织结构数据列表
     * @param deviceFlag 树是否加载设备
     * @param orgFlag 是否加载卡点
     * @return 组织结构数据列表
     * @author lsg
     */
    public List<OrgEntity> getOrganizations(boolean deviceFlag, boolean orgFlag);
    /**
     * 获取组织结构数据列表中的 卡口反向
     * @param deviceFlag
     * @param orgFlag
     * @return
     */
    public List<OrgEntity> getOgnDirection(boolean deviceFlag, boolean orgFlag, boolean userFlag, String orgId);
    /**
     * 加载所有的部门信息
     * @return 查询结果
     */
    public List<Map<String, String>> loadAllOrgInfo();
    
    /**
	 * 分页查询机构部门基本信息
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryOrgInfoByPage(Map<String, String> param);
	
	/**
	 * 统计机构部门基本信息
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> countOrgInfoDatas(Map<String, String> param);
	
	/**
	 * 添加机构部门基本信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addOrgInfo(Map<String, String> param);
	
	/**
	 * 删除机构部门基本信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteOrgInfo(Map<String, String> param);
	
	/**
	 * 更新机构部门基本信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateOrgInfo(Map<String, String> param);
	
	/**
	 * 检查是否已经存在此部门信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> checkOrgInfo(Map<String, String> param);
	
	/**
	 * 获取区域编号
	 * @return 查询结果
	 */
	public List<Map<String, String>> loadOrgData();
	
	/**
     * 加载部门到卡口之间所有数据的名称
     * param orgName卡口或者组织名称
     * @return 查询结果
     */
    public List<Map<String, String>> findAllOrgName(String[] orgName);
    
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
     * 获取只含组织的树形组织结构数据（剔除卡口）,通过卡口模糊名称过滤一次包含此模糊卡口的部门
     * @param ids
     * @param kkmc
     * @return
     * lyj
     */
    public Map<String,Object> getOnlyOrgTreeByKkmcMap(List<Long> ids, String kkmc);
    
    /**
     * 加载部门到卡口之间所有数据的名称，直接查询数据库，汉字模糊匹配
     * param orgName卡口或者组织名称
     * @return 查询结果
     */
    public List<Map<String, String>> findAllOrgNameNoCache(String[] orgName);
    
    /**
     * 从缓存获取组织结构数据列表
     * @param kkmc 卡口名称
     * @return 组织结构数据列表
     * @author lsg
     */
    public List<Map<String, String>> getOrganizationsByCache();
    
    /**
     * 获取只含组织的树形组织结构数据（剔除卡口）,数据查询来自缓存
     * @param ids
     * @param list
     * @return
     * lsg
     */
    public Map<String,Object> getOnlyOrgTreeCacheMap(List<Long> ids, List<OrgEntity> list);
    
    /**
     * 获取组织结构数据列表,通过卡口模糊名称过滤一次包含此模糊卡口的部门
     * @param kkmc 卡口名称
     * @return 组织结构数据列表
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
     * param kkbh
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
    public List<OrgEntity> getDeptHavingDirection();
    
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
     * 根据orgType查找组织结构信息
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> findOrgInfoByOrgTypenew(Map<String, String> param);
    
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
     * 加载区域表数据
     * @return
     */
    public List<Map<String, String>> loadAreaTabTwo();
}
