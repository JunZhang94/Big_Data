package com.jp.tic.system.mapper;

import java.util.List;
import java.util.Map;

import com.jp.tic.framework.mybatis.BaseSqlMapper;

@SuppressWarnings("unchecked")
public interface DictionaryMapper extends BaseSqlMapper {

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
}
