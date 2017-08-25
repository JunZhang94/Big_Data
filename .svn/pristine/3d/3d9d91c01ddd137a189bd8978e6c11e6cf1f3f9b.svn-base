package com.jp.tic.system.service.impl;

import java.util.List;
import java.util.Map;

import org.apache.poi.ss.formula.functions.T;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.system.dao.ProviderDao;
import com.jp.tic.system.service.ProviderService;
import com.jp.tic.utils.lang.DateUtil;


@Service
public class ProviderServiceImpl implements ProviderService<T> {
	
	@Autowired
	ProviderDao providerDao;

	/**
	 * 分页查询供应商信息数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryProviderInfo(Map<String, String> param) {
		return providerDao.queryProviderInfo(param);
	}
	
	/**
	 * 统计供应商数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countProviderDatas(Map<String, String> param) {
		return providerDao.countProviderDatas(param);
	}
	
	/**
	 * 添加供应商
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addProviderInfo(Map<String, String> param) {
		String nowTime = DateUtil.getCurrentDateTime();
		param.put("operateTime", nowTime);
		return providerDao.addProviderInfo(param);
	}
	
	/**
	 * 删除供应商
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteProviderInfo(Map<String, String> param) {
		return providerDao.deleteProviderInfo(param);
	}
	
	/**
	 * 更新供应商
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateProviderInfo(Map<String, String> param) {
		String nowTime = DateUtil.getCurrentDateTime();
		param.put("operateTime", nowTime);
		return providerDao.updateProviderInfo(param);
	}
	
	/**
	 * 修改供应商，加载要修改的数据信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initProviderDetailInfo(Map<String, String> param) {
		return providerDao.initProviderDetailInfo(param);
	}
	
	/**
	 * 填充供应商下拉框
	 * @return 查询结果
	 */
	public List<Map<String, String>> findProviderData() {
		return providerDao.findProviderData();
	}
	
	/**
	 * 检查是否存在此供应商信息
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> checkProviderInfo(Map<String, String> param) {
		return providerDao.checkProviderInfo(param);
	}
}
