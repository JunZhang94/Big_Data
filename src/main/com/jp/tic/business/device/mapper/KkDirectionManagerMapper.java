package com.jp.tic.business.device.mapper;

import java.util.List;
import java.util.Map;

import com.jp.tic.framework.mybatis.BaseSqlMapper;

@SuppressWarnings("unchecked")
public interface KkDirectionManagerMapper extends BaseSqlMapper {
	
	public List<Map<String, String>> queryDeviceDirInfo(Map<String, String> param);
	/**
	 * 修改卡口设备方向数据，加载要修改的数据信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> initDeviceDirDetailInfo(Map<String, String> param);
	public List<Map<String, String>> countDeviceDirDatas(Map<String, String> param);
	public int addDeviceDirInfo(Map<String, String> param);
	public int deleteDeviceDirInfo(Map<String, String> param);
	public int updateDeviceDirInfo(Map<String, String> param);
	
}
