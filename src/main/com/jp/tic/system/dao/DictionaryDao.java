package com.jp.tic.system.dao;

import java.util.List;
import java.util.Map;

import com.jp.tic.system.entity.CarBrandItem;
import com.jp.tic.system.entity.CarCategory;
import com.jp.tic.system.entity.IllegalType;

/**
 * 字典类
 * @author lsg
 *
 */

public interface DictionaryDao {
	
	/**
	 * 加载字典数据项
	 * @param param type参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> findDictionaryData(Map<String, String> param);
	
	/**
	 * 缓存字典信息
	 * @return 查询结果
	 */
	public Map cachePubEnumData();
	
	/**
	 * 缓存字典信息
	 * @return 查询结果
	 */
	public Map cachePubEnumHPHM();
	
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
	public List<CarBrandItem> findCarBrand();
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
	 * @param code
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

	public List<IllegalType> findIllegalType();
}
