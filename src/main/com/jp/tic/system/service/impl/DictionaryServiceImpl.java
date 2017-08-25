package com.jp.tic.system.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.system.dao.DictionaryDao;
import com.jp.tic.system.entity.CarBrandItem;
import com.jp.tic.system.entity.CarCategory;
import com.jp.tic.system.entity.EnumItem;
import com.jp.tic.system.entity.IllegalType;
import com.jp.tic.system.mapper.DictionaryMapper;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.view.RequestUtil;

/**
 * 字典类
 * @author lsg
 *
 */
@SuppressWarnings("unchecked")
@Service
public class DictionaryServiceImpl implements DictionaryService {

	@Autowired
	DictionaryDao dictionaryDao;
	
	@Autowired
	DictionaryMapper mapper;
	
	/**
	 * 加载字典数据项
	 * @param param type参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> findDictionaryData(Map<String, String> param) {
		return dictionaryDao.findDictionaryData(param);
	}
	
	/**
	 * 根据枚举编号取得枚举列表,缓存字典信息
	 * @return
	 */
	public List<EnumItem> getEnumListByCode(String code) {
		Map Enummap = dictionaryDao.cachePubEnumData();
		List<EnumItem> list = (List<EnumItem>) Enummap.get(code);
		return list;
	}
	/**
	 * 根据号牌号码取得枚举列表,缓存字典信息
	 * @return
	 */
	public List<EnumItem> getEnumListByHPHM(String code) {
		Map Enummap = dictionaryDao.cachePubEnumHPHM();
		List<EnumItem> list = (List<EnumItem>) Enummap.get(code);
		return list;
	}
	
	/**
	 * 分页查询字典信息数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryDictionaryInfo(Map<String, String> param) {
		return mapper.queryDictionaryInfo(param);
	}
	
	/**
	 * 统计字典信息数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countDictionaryDatas(Map<String, String> param) {
		return mapper.countDictionaryDatas(param);
	}
	
	/**
	 * 添加字典信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addDictionaryInfo(Map<String, String> param) {
		return mapper.addDictionaryInfo(param);
	}
	
	/**
	 * 删除字典信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteDictionaryInfo(Map<String, String> param) {
		return mapper.deleteDictionaryInfo(param);
	}
	
	/**
	 * 更新字典信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateDictionaryInfo(Map<String, String> param) {
		return mapper.updateDictionaryInfo(param);
	}
	
	/**
	 * 修改字典信息，加载要修改的数据信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initDictionaryDetailInfo(Map<String, String> param) {
		return mapper.initDictionaryDetailInfo(param);
	}
	
	/**
	 * 加载角色数据项
	 * @param param type参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> findRoleData(Map<String, String> param) {
		return dictionaryDao.findRoleData(param);
	}
	
	/**
	 * 查询所有的字典数据信息
	 * @return 查询结果
	 */
	public List<Map<String, String>> getAllDictionsInfo() {
		return dictionaryDao.getAllDictionsInfo();
	}
	
	/**
	 * 导出字典信息数据
	 * @param partIds 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> exportDictionaryItemById(String[] partIds) {
		return dictionaryDao.exportDictionaryItemById(partIds);
	}
	
	/**
	 * 根据查询条件导出查询数据
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public String exportQuerySql(Map<String, String> param) {
		return dictionaryDao.exportQuerySql(param);
	}
	
	/**
	 * 加载角色信息
	 * @param roleId参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> findRoleInfo(String roleId) {
		return dictionaryDao.findRoleInfo(roleId);
	}
	
	/**
	 * 加载所有角色数据项
	 * @param param type参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> findAllRoleData(Map<String, String> param) {
		return dictionaryDao.findAllRoleData(param);
	}
	
	@Override
	public List<Map<String, String>> findCarBrand() {
		List<CarBrandItem> carBrandList=new ArrayList<CarBrandItem>();
		List<Map<String, String>> results = new ArrayList<Map<String, String>>();
		if(carBrandList.size()==0){
			carBrandList = dictionaryDao.findCarBrand();
		}
		for (CarBrandItem item : carBrandList) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("id", item.getValue());
			map.put("text", item.getKey());
			results.add(map);
		}
		return results;
		// TODO Auto-generated method stub
		//return dictionaryDao.findCarBrand();
	}
	
	public List<CarBrandItem> findCarBrandTemp() {
		return dictionaryDao.findCarBrand();
	}

	@Override
	public List<CarBrandItem> findCarType() {
		// TODO Auto-generated method stub
		return dictionaryDao.findCarType();
	}

	@Override
	public List<CarBrandItem> findCarYear() {
		// TODO Auto-generated method stub
		return dictionaryDao.findCarYear();
	}

	@Override
	public List<CarCategory> findCarCategory() {
		return dictionaryDao.findCarCategory();
	}
	
	/**
	 * 加载车辆品牌车辆类型树信息
	 */
	public List<CarBrandItem> findCarTypeTreeData() {
		return dictionaryDao.findCarTypeTreeData();
	}
	
	/**
	 * 加载车辆品牌车辆类型多选下拉框信息
	 */
	public List<Map<String, String>> findCarTypeCombox(String carBrand) {
		List<Map<String, String>> datas = new ArrayList<Map<String,String>>();
		if (StringUtil.checkStr(carBrand)) {
			datas =  dictionaryDao.findCarTypeCombox(carBrand);
		}
		return datas;
		//return dictionaryDao.findCarTypeCombox(carBrand);
	}
	
	/**
	 * 加载品牌年款车辆类型多选下拉框信息
	 */
	public List<Map<String, String>> findCarYearCombox(String carType) {
		List<Map<String, String>> datas = new ArrayList<Map<String,String>>();
		if (StringUtil.checkStr(carType)) {
			datas = dictionaryDao.findCarYearCombox(carType);
		}
		return datas;
		//return dictionaryDao.findCarYearCombox(carType);
	}

	/**
	 * 根据菜单名获取URI
	 */
	public String findMenuByName(String name) {
		return dictionaryDao.findMenuByName(name);
	}

	@Override
	public String getStoreValueByName(String settingName, String displayName) {
		String storeValue="";
		List<EnumItem> list = this.getEnumListByCode(settingName);
		if (list != null) {
			for (EnumItem en : list) {
				Map<String, String> map = new HashMap<String, String>();
				if(en.getItemName().equals(displayName)){
					storeValue=en.getItemValue();
					break;
				}
			}
		}
		return storeValue;
	}

	@Override
	public List<IllegalType> findIllegalType() {
		return dictionaryDao.findIllegalType();
	}
}
