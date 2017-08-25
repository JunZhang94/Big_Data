package com.jp.tic.business.cartake.mapper;

import java.util.List;
import java.util.Map;

import com.jp.tic.framework.mybatis.BaseSqlMapper;
import com.jp.tic.system.entity.Gate;

/**
 * <b>function:</b> 基础数据查询接口
 * @author hoojo
 * @createDate 2014-5-27 上午10:17:22
 * @file BasisDataQueryMapper.java
 * @package com.jp.tic.business.cartake.mapper
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public interface BasicDataQueryMapper<E extends Map<String, Object>> extends BaseSqlMapper<E> {

	
	public List<E> findAreas() throws Exception;
	/**
	 * <b>function:</b> 根据区域编号查询部门编号、部门名称
	 * @author hoojo
	 * @createDate 2013-5-8 下午03:06:30
	 * @param areaCode 区域编号
	 * @return 部门编号、部门名称 map集合
	 * @throws Exception
	 */
	public List<E> findDeptsByAreaCode(String areaCode) throws Exception;
	
	public List<E> findDepts() throws Exception;
	
	/**
	 * <b>function:</b> 根据部门编号查询卡口编号、卡口名称
	 * @author hoojo
	 * @createDate 2013-5-8 下午03:08:30
	 * @param deptCode 部门编号
	 * @return 卡口编号、卡口名称 map集合
	 * @throws Exception
	 */
	public List<E> findMountsByDeptCode(String deptCode) throws Exception;
	
	/**
	 * <b>function:</b> 查询设备导航树形菜单数据
	 * @author hoojo
	 * @createDate 2013-5-8 下午03:08:30
	 * @return 卡口编号、卡口名称 map集合
	 * @throws Exception
	 */
	public List<E> getNavTreeData() throws Exception;
	
	public E findMountById(E param) throws Exception;
	
	public String findWordbookByType(E param) throws Exception;
	
	public List<E> findWordbookByName(String typeName) throws Exception;
	
	public List<Gate> findAllMounts() throws Exception;
	
	public List<Gate> findAllMounts4Gis() throws Exception;
	
	public int updateMountTabXY(Map<String,String> updatePram) throws Exception;
}
