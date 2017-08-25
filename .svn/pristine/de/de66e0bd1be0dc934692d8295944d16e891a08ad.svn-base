package com.jp.tic.business.device.service;

import java.util.List;
import java.util.Map;

import com.jp.tic.business.device.entity.DeviceInfo;
import com.jp.tic.common.pagination.PageHolder;
import com.jp.tic.framework.service.Service;

/**
 * <b>function:</b> 机柜设备信息服务层接口
 * @author hoojo
 * @createDate 2013-4-25 下午04:51:02
 * @file DeviceInfoService.java
 * @package com.jp.tic.zhsics.device.entity
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public interface DeviceInfoService<T extends DeviceInfo> extends Service<DeviceInfo> {

	/**
	 * <b>function:</b> 添加机柜设备信息
	 * @author hoojo
	 * @createDate 2013-4-26 下午09:58:43
	 * @param entity T DeviceInfo机柜设备实体对象
	 * @return boolean 是否添加成功
	 * @throws Exception
	 */
	public boolean add(T entity) throws Exception;

	/**
	 * <b>function:</b> 查找所有机柜设备信息
	 * @author hoojo
	 * @createDate 2013-4-26 下午09:58:04
	 * @return List<T> 机柜设备集合列表
	 * @throws Exception
	 */
	public List<T> findAll() throws Exception;
	
	/**
	 * <b>function:</b> 机柜设备信息分页
	 * @author hoojo
	 * @createDate 2013-4-26 下午09:59:51
	 * @param entity 机柜设备对象实体
	 * @return 分页对象 PageHolder
	 * @throws Exception
	 */
	public PageHolder<T> queryPage(T entity) throws Exception;
	
	/**
	 * <b>function:</b> 根据区域编号查询部门编号、部门名称
	 * @author hoojo
	 * @createDate 2013-5-8 下午03:06:30
	 * @param areaCode
	 * @return
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
	/**
	 * 根据卡口编号查询设备信息
	 * @param sskkbh
	 * @return
	 * @throws Exception
	 */
	public List<T> findDeviceByMountCode(String sskkbh)throws Exception;

}
