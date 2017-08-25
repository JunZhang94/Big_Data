package com.jp.tic.business.device.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.device.mapper.KkDirectionManagerMapper;
import com.jp.tic.business.device.service.KkDirectionInfoService;
import com.jp.tic.utils.lang.StringUtil;
@Service
public class KkDirectionInfoServiceImpl implements KkDirectionInfoService {
	@Autowired
	private KkDirectionManagerMapper kkDirectionMapper;
    /**
     * 添加设备方向
     */
	@Override
	public int addDeviceDirInfo(Map<String, String> param) {
		return kkDirectionMapper.addDeviceDirInfo(param);
	}
    /**
     * 计算数据的量
     */
	@Override
	public List<Map<String, String>> countDeviceDirDatas(
			Map<String, String> param) {
		return kkDirectionMapper.countDeviceDirDatas(param);
	}
	/**
	 * 删除卡口设备方向
	 */
	@Override
	public int deleteDeviceDirInfo(Map<String, String> param) {
		return kkDirectionMapper.deleteDeviceDirInfo(param);
	}
    /**
     * 查询卡口设备方向的信息
     */
	@Override
	public List<Map<String, String>> queryDeviceDirInfo(
			Map<String, String> param) {
		if (StringUtil.checkObj(param.get("code"))) {
			param.put("code", "440" + param.get("code"));
		}
		return kkDirectionMapper.queryDeviceDirInfo(param);
	}
    /**
     * 修改卡口设备方向
     */
	@Override
	public int updateDeviceDirInfo(Map<String, String> param) {
		return kkDirectionMapper.updateDeviceDirInfo(param);
	}
	/**
	 * 加载要修改的行中的详细信息(卡口设备方向信息)
	 */
	@Override
	public List<Map<String, String>> initDeviceDirDetailInfo(
			Map<String, String> param) {
		return kkDirectionMapper.initDeviceDirDetailInfo(param);
	}

}
