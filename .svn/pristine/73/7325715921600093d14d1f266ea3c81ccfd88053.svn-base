package com.jp.tic.business.cartake.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.cartake.dao.HotRecodeDao;
import com.jp.tic.business.cartake.service.HotRecodeService;

@Service
public class HotRecodeServiceImpl implements HotRecodeService {
	
	@Autowired
	private HotRecodeDao hotRecodeDao;

	/**
	 * 查询红名单数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryHotRecodes(Map<String, String> param) {
		return hotRecodeDao.queryHotRecodes(param);
	}
	
	/**
	 * 分页查询红名单信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryHotRecodeInfo(Map<String, String> param) {
		return hotRecodeDao.queryHotRecodeInfo(param);
	}
	
	/**
	 * 统计红名单信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countHotRecodeInfo(Map<String, String> param) {
		return hotRecodeDao.countHotRecodeInfo(param);
	}
	
	/**
	 * 添加红名单记录
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addHotRecodeInfo(Map<String, String> param) {
		return hotRecodeDao.addHotRecodeInfo(param);
	}
	
	/**
	 * 删除红名单记录
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteHotRecodeInfo(Map<String, String> param) {
		return hotRecodeDao.deleteHotRecodeInfo(param);
	}
	
	/**
	 * 更新红名单记录
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateHotRecodeInfo(Map<String, String> param) {
		return hotRecodeDao.updateHotRecodeInfo(param);
	}
	
	/**
	 * 修改红名单记录，加载要修改的数据信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initHotRecodeDetailInfo(Map<String, String> param) {
		return hotRecodeDao.initHotRecodeDetailInfo(param);
	}
	
	/**
	 * 检查数据是否存在
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> checkHotRecodeInfo(Map<String, String> param) {
		return hotRecodeDao.checkHotRecodeInfo(param);
	}
	
	/**
	 * 根据卡口名称查询
	 * @param kkmc 卡口名次
	 * @return 查询结果
	 */
	public List<Map<String, String>> findMountByKkmc(String kkmc) {
		return hotRecodeDao.findMountByKkmc(kkmc);
	}
	
	/**
	 * 根据卡口编号查询
	 * @param kkbh 卡口编号
	 * @return 查询结果
	 */
	public List<Map<String, String>> findMountByKkbh(String kkbhStr) {
		return hotRecodeDao.findMountByKkbh(kkbhStr);
	}
}
