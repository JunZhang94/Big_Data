package com.jp.tic.business.device.service.impl;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.business.device.entity.DeviceInfo;
import com.jp.tic.business.device.mapper.DeviceInfoMapper;
import com.jp.tic.business.device.service.DeviceInfoService;
import com.jp.tic.common.entity.IDGenerator;
import com.jp.tic.common.enums.IdType;
import com.jp.tic.common.pagination.PageHolder;
import com.jp.tic.common.pagination.PageQueryExecutor;
import com.jp.tic.common.service.IDGeneratorService;
import com.jp.tic.framework.service.impl.GeneratorServiceImpl;

/**
 * <b>function:</b> 机柜设备服务器接口实现
 * @author hoojo
 * @createDate 2013-4-25 下午04:49:22
 * @file DeviceInfoServiceImpl.java
 * @package com.jp.tic.zhsics.device.entity
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
@Service
public class DeviceInfoServiceImpl<T extends DeviceInfo> extends GeneratorServiceImpl<DeviceInfo> implements DeviceInfoService<T> {

	@Autowired
	private DeviceInfoMapper<T> mapper;
	
	@Autowired
	private IDGeneratorService<IDGenerator> IDGenerator;
	
	public DeviceInfoServiceImpl() {
		super(DeviceInfo.class);
	}
	
	@Override
	public boolean add(T deviceInfo) throws Exception {
		if (deviceInfo != null) {
			IdType idType = IdType.DEVICEINFO_ID;
			String sbbh = IDGenerator.executeGeneratorId(idType);
			trace("sbbh: {}", sbbh);
			
			sbbh = String.format("%0" + 15 + "d", NumberUtils.toInt(sbbh));
			deviceInfo.setSbbh(sbbh);
			trace("deviceInfo: {}", deviceInfo);
		}
		return super.add(deviceInfo);
	}
	
	@Override
	public List<T> findAll() throws Exception {
		return mapper.getList();
	}

	@Override
	public PageHolder<T> queryPage(T entity) throws Exception {
		return new PageQueryExecutor().query(mapper, entity);
	}

	@Override
	public List<Map<String, String>> findDeptByAreaCode(String areaCode) throws Exception {
		return mapper.findDeptByAreaCode(areaCode);
	}

	@Override
	public List<Map<String, String>> findMountByDeptCode(String deptCode) throws Exception {
		return mapper.findMountByDeptCode(deptCode);
	}

	@Override
	public List<T> getNavTreeData() throws Exception {
		return mapper.getNavTreeData();
	}

	@Override
	public List<T> findDeviceByMountCode(String sskkbh) throws Exception {
		// TODO Auto-generated method stub
		List<T> iList=mapper.findDeviceByMountCode(sskkbh);
		return iList;
	}

}
