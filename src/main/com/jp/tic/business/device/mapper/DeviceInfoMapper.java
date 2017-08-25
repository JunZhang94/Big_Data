package com.jp.tic.business.device.mapper;

import java.util.List;
import java.util.Map;

import com.jp.tic.business.device.entity.DeviceInfo;
import com.jp.tic.common.pagination.PageQueryMapper.PageEntityQueryMapper;
import com.jp.tic.framework.mybatis.BaseSqlMapper;

/**
 * <b>function:</b> 机柜设备信息查询接口
 * @author hoojo
 * @createDate 2013-4-25 下午06:07:21
 * @file DeviceInfoMapper.java
 * @package com.jp.tic.zhsics.device.mapper
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public interface DeviceInfoMapper<T extends DeviceInfo> extends PageEntityQueryMapper<T>, BaseSqlMapper<T> {

	
	public List<T> findList(T entity) throws Exception;
	
	/**
	 * <b>function:</b> 根据区域编号查询部门编号、部门名称
	 * @author hoojo
	 * @createDate 2013-5-8 下午03:06:30
	 * @param areaCode 区域编号
	 * @return 部门编号、部门名称 map集合
	 * @throws Exception
	 */
	public List<Map<String, String>> findDeptByAreaCode(String areaCode) throws Exception;
	
	/**
	 * <b>function:</b> 根据部门编号查询卡口编号、卡口名称
	 * @author hoojo
	 * @createDate 2013-5-8 下午03:08:30
	 * @param deptCode 部门编号
	 * @return 卡口编号、卡口名称 map集合
	 * @throws Exception
	 */
	public List<Map<String, String>> findMountByDeptCode(String deptCode) throws Exception;
	
	/**
	 * <b>function:</b> 查询设备导航树形菜单数据
	 * @author hoojo
	 * @createDate 2013-5-8 下午03:08:30
	 * @return 卡口编号、卡口名称 map集合
	 * @throws Exception
	 */
	public List<T> getNavTreeData() throws Exception;
	
	public List<T> findDeviceByMountCode(String sskkbh)throws Exception;
}
