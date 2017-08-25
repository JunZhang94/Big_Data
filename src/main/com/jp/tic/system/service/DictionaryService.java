package com.jp.tic.system.service;

import java.util.List;
import java.util.Map;

import com.jp.tic.system.entity.CarBrandItem;
import com.jp.tic.system.entity.CarCategory;
import com.jp.tic.system.entity.EnumItem;
import com.jp.tic.system.entity.IllegalType;

public interface DictionaryService {
	
	/**
	 * 加载字典数据项
	 * @param param type参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> findDictionaryData(Map<String, String> param);
	
	/**
	 * 根据枚举编号取得枚举列表,缓存字典信息
	 * @param code 编码
	 * @return 查询结果
	 */
	public List<EnumItem> getEnumListByCode(String code);
	
	/**
	 * 根据号牌号码取得枚举列表,缓存字典信息
	 * @param code 编码
	 * @return 查询结果
	 */
	public List<EnumItem> getEnumListByHPHM(String code);
	
	/**
	 * 分页查询字典信息数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryDictionaryInfo(Map<String, String> param);
	
	/**
	 * 统计字典信息数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countDictionaryDatas(Map<String, String> param);
	
	/**
	 * 添加字典信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addDictionaryInfo(Map<String, String> param);
	
	/**
	 * 删除字典信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteDictionaryInfo(Map<String, String> param);
	
	/**
	 * 更新字典信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateDictionaryInfo(Map<String, String> param);
	
	/**
	 * 修改字典信息，加载要修改的数据信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initDictionaryDetailInfo(Map<String, String> param);
	
	/**
	 * 加载角色数据项
	 * @param param type参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> findRoleData(Map<String, String> param);
	
	/**
	 * 查询所有的字典数据信息
	 * @return 查询结果
	 */
	public List<Map<String, String>> getAllDictionsInfo();
	
	/**
	 * 导出字典信息数据
	 * @param partIds 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> exportDictionaryItemById(String[] partIds);
	
	/**
	 * 根据查询条件导出查询数据
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public String exportQuerySql(Map<String, String> param);
	
	/**
	 * 加载角色信息
	 * @param roleId参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> findRoleInfo(String roleId);
	
	/**
	 * 加载所有角色数据项
	 * @param param type参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> findAllRoleData(Map<String, String> param);
	/**
	 * 加载所有车辆品牌信息
	 * @return
	 */
	public List<Map<String, String>> findCarBrand();
	
	public List<CarBrandItem> findCarBrandTemp();
	
	/**
	 * 加载所有车辆类型信息
	 * @return
	 */
	public List<CarBrandItem> findCarType();
	/**
	 * 加载所有车辆年款信息
	 * @return
	 */
	public List<CarBrandItem> findCarYear();
	/**
	 * 加载所有车辆类别
	 * @return
	 */
	public List<CarCategory> findCarCategory();
	
	/**
	 * 加载车辆品牌车辆类型树信息
	 */
	public List<CarBrandItem> findCarTypeTreeData();
	
	/**
	 * 加载车辆品牌车辆类型多选下拉框信息
	 */
	public List<Map<String, String>> findCarTypeCombox(String carBrand);
	
	/**
	 * 加载品牌年款车辆类型多选下拉框信息
	 */
	public List<Map<String, String>> findCarYearCombox(String carType);

	/**
	 * 根据菜单名获取URI
	 * @param name
	 * @return
	 */
	public String findMenuByName(String name);
	
	public String getStoreValueByName(String settingName,String displayName);
	
	/**
	 * 加载所有违章类型
	 * @return
	 */
	public List<IllegalType> findIllegalType();
}
