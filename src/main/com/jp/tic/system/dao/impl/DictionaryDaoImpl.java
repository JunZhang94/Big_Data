package com.jp.tic.system.dao.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.system.dao.DictionaryDao;
import com.jp.tic.system.entity.CarBrandItem;
import com.jp.tic.system.entity.CarCategory;
import com.jp.tic.system.entity.EnumItem;
import com.jp.tic.system.entity.IllegalType;
import com.jp.tic.utils.lang.StringUtil;
import com.opensymphony.oscache.base.NeedsRefreshException;
import com.opensymphony.oscache.general.GeneralCacheAdministrator;

/**
 * 字典类
 * @author lsg
 *
 */

@SuppressWarnings("unchecked")
@Repository
public class DictionaryDaoImpl extends BaseDao implements DictionaryDao {
	
	private Logger logger = LoggerFactory.getLogger(DictionaryDao.class);

	private static final String ENUM_KEY_SYS = "cachePubEnumData";
	private static final int MY_REFRESH_PERIOD = 3600;
	
	private static GeneralCacheAdministrator admin = new GeneralCacheAdministrator();
	
	/**
	 * 加载字典数据项
	 * @param param type参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> findDictionaryData(Map<String, String> param) {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select DISPLAYVALUE,STOREVALUE,NOTES from SYS_SETTING_TAB ");
		sqlBuffer.append(" where SETTINGNAME = '" + param.get("code") + "'");
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		return datas;
	}
	
	/**
	 * 缓存枚举表
	 */
	public Map cachePubEnumData() {

		boolean updated = false;
		Map mp = null;
		try {
			mp = (Map) admin.getFromCache(ENUM_KEY_SYS, MY_REFRESH_PERIOD);
			logger.debug("cachePubEnumData枚举翻译来自缓存");
		} catch (NeedsRefreshException nre) {
			logger.debug("cachePubEnumData枚举翻译来自数据库");
			try {
				mp = getEnum();
				admin.putInCache(ENUM_KEY_SYS, mp);
				updated = true;
			} finally {
				if (!updated) {
					admin.cancelUpdate(ENUM_KEY_SYS);
				}
			}
		}
		return mp;
	}
	
	
	/**
	 * 缓存枚举表
	 */
	public Map cachePubEnumHPHM() {

		boolean updated = false;
		Map mp = null;
		try {
			mp = (Map) admin.getFromCache(ENUM_KEY_SYS, MY_REFRESH_PERIOD);
			logger.debug("cachePubEnumData枚举翻译来自缓存");
		} catch (NeedsRefreshException nre) {
			logger.debug("cachePubEnumData枚举翻译来自数据库");
			try {
				mp = getHPHM();
				admin.putInCache(ENUM_KEY_SYS, mp);
				updated = true;
			} finally {
				if (!updated) {
					admin.cancelUpdate(ENUM_KEY_SYS);
				}
			}
		}
		return mp;
	}

	/**
	 * 查询数据库获取枚举列表
	 */
	public Map getEnum() {
		List<EnumItem> list = null;
		Map mp = null;
		String sql = " SELECT ID,DISPLAYVALUE,STOREVALUE,NOTES,SETTINGNAME from SYS_SETTING_TAB order by notes asc, ID asc";
		List tempList = this.queryBySql(sql);
		if (tempList != null) {
			Iterator it = tempList.iterator();
			mp = new HashMap<String, List>();

			String lastCata = "";
			while (it.hasNext()) {
				Map m = (Map) it.next();
				if (m.get("SETTINGNAME") == null || m.get("STOREVALUE") == null
						|| m.get("DISPLAYVALUE") == null) {
					continue;
				}
				String itemCode = StringUtil.toString(m.get("SETTINGNAME"));
				String itemValue = StringUtil.toString(m.get("STOREVALUE"));
				String itemName = StringUtil.toString(m.get("DISPLAYVALUE"));
				EnumItem en = new EnumItem();
				en.setItemCode(itemCode);
				en.setItemValue(itemValue);
				en.setItemName(itemName);
				if (!lastCata.equals(itemCode)) {
					lastCata = itemCode;
					list = new ArrayList<EnumItem>();
					list.add(en);
					mp.put(itemCode, list);
				} else {
					list.add(en);
				}
			}
		}
		sql = null;
		return mp;
	}
	
	/**
	 * 查询数据库获取枚举列表
	 */
	public Map getHPHM() {
		List<EnumItem> list = null;
		Map mp = null;
		String sql = " SELECT DISPLAYVALUE,STOREVALUE,NOTES,SETTINGNAME from SYS_SETTING_TAB order by notes, STOREVALUE asc";
		List tempList = this.queryBySql(sql);
		if (tempList != null) {
			Iterator it = tempList.iterator();
			mp = new HashMap<String, List>();

			String lastCata = "";
			while (it.hasNext()) {
				Map m = (Map) it.next();
				if (m.get("SETTINGNAME") == null || m.get("STOREVALUE") == null
						|| m.get("DISPLAYVALUE") == null) {
					continue;
				}
				String itemCode = StringUtil.toString(m.get("SETTINGNAME"));
				String itemValue = StringUtil.toString(m.get("STOREVALUE"));
				String itemName = StringUtil.toString(m.get("DISPLAYVALUE"));
				EnumItem en = new EnumItem();
				en.setItemCode(itemCode);
				en.setItemValue(itemValue);
				en.setItemName(itemName);
				if (!lastCata.equals(itemCode)) {
					lastCata = itemCode;
					list = new ArrayList<EnumItem>();
					list.add(en);
					mp.put(itemCode, list);
				} else {
					list.add(en);
				}
			}
		}
		sql = null;
		return mp;
	}
	
	/**
	 * 加载角色数据项
	 * @param param type参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> findRoleData(Map<String, String> param) {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		String roleId = param.get("roleId");
		List<Map<String, String>> roles = this.findRoleInfo(roleId);
		String roleName = "";
		if (roles != null && roles.size() > 0) {
			roleName = roles.get(0).get("ROLE_NAME");
		}
		if (StringUtil.equals(roleName, "超级管理员权限")) {
			sqlBuffer.append("select ROLE_NAME,ROLE_ID from SYS_T_ROLES ");
		}
		if (roleName.contains("管理员") && !StringUtil.equals(roleName, "超级管理员权限")) {
			sqlBuffer.append("select ROLE_NAME,ROLE_ID from SYS_T_ROLES where USEING_FLAG = 1 and ROLE_NAME not like '%管理员%'");
		}
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		return datas;
	}
	
	/**
	 * 加载所有角色数据项
	 * @param param type参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> findAllRoleData(Map<String, String> param) {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select ROLE_NAME,ROLE_ID from SYS_T_ROLES");
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		return datas;
	}
	
	/**
	 * 加载角色信息
	 * @param roleId参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> findRoleInfo(String roleId) {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select ROLE_NAME from SYS_T_ROLES where ROLE_ID = '" + roleId + "'");
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		return datas;
	}
	
	/**
	 * 查询所有的字典数据信息
	 * @return 查询结果
	 */
	public List<Map<String, String>> getAllDictionsInfo() {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select * from SYS_SETTING_TAB");
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		return datas;
	}
	
	/**
	 * 导出字典信息数据
	 * @param partIds 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> exportDictionaryItemById(String[] partIds) {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from SYS_SETTING_TAB where ");
		String idStr = "";
		for (int i = 0; i < partIds.length; i++) {
			if (StringUtil.checkStr(idStr)) {
				idStr += ",";
			}
			idStr += partIds[i];
		}
		buffer.append("ID in (" + idStr + ")");
		try {
			datas = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 根据查询条件导出查询数据
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public String exportQuerySql(Map<String, String> param) {
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from SYS_SETTING_TAB");
		if (StringUtil.checkStr(param.get("dictionaryName"))) {
			buffer.append(" where DISPLAYVALUE like '%" + param.get("dictionaryName") + "%'");
			buffer.append(" OR NOTES like '%" + param.get("dictionaryName") + "%'");
			buffer.append(" OR SETTINGNAME like '%" + param.get("dictionaryName") + "%'");
		}
		return buffer.toString();
	}

	@Override
	public List<CarBrandItem> findCarBrand() {
		List<CarBrandItem> resultList=new ArrayList<CarBrandItem>();
		StringBuffer sql = new StringBuffer(" select '-1' parentid,t1.brand key,t1.brand value from sys_setting_tab t1 ");
		sql.append("where t1.notes='车辆品牌' ");
		sql.append("group by t1.brand ");
		sql.append("order by t1.brand ");
		
		List tempList = this.queryBySql(sql.toString());
		if (tempList != null) {
			Iterator it = tempList.iterator();
			while (it.hasNext()) {
				Map m = (Map) it.next();
				String parentid = StringUtil.toString(m.get("PARENTID"));
				String key = StringUtil.toString(m.get("KEY"));
				String value = StringUtil.toString(m.get("VALUE"));
				CarBrandItem item = new CarBrandItem();
				item.setParentid(parentid);
				item.setKey(key);
				item.setValue(value);
				resultList.add(item);
			}
		}
		return resultList;
	}

	@Override
	public List<CarBrandItem> findCarType() {
		List<CarBrandItem> resultList=new ArrayList<CarBrandItem>();
		StringBuffer sql = new StringBuffer(" select t2.brand parentid,t2.type key,t2.type value from sys_setting_tab t2 ");
		sql.append("where t2.notes='车辆品牌' ");
		sql.append("group by t2.brand,t2.type ");
		sql.append("order by t2.brand,t2.type ");
		
		List tempList = this.queryBySql(sql.toString());
		if (tempList != null) {
			Iterator it = tempList.iterator();
			while (it.hasNext()) {
				Map m = (Map) it.next();
				String parentid = StringUtil.toString(m.get("PARENTID"));
				String key = StringUtil.toString(m.get("KEY"));
				String value = StringUtil.toString(m.get("VALUE"));
				CarBrandItem item = new CarBrandItem();
				item.setParentid(parentid);
				item.setKey(key);
				item.setValue(value);
				resultList.add(item);
			}
		}
		return resultList;
	}
	
	/**
	 * 加载车辆品牌车辆类型树信息
	 */
	public List<CarBrandItem> findCarTypeTreeData() {
		List<CarBrandItem> resultList=new ArrayList<CarBrandItem>();
		StringBuffer sql = new StringBuffer("select distinct '-1' as parentid,t1.brand key,t1.brand value from sys_setting_tab t1 " +
				"where t1.brand is not null union all " +
				"select distinct t2.brand parentid,t2.type key,t2.type value from sys_setting_tab t2 where t2.type is not null");
		List tempList = this.queryBySql(sql.toString());
		if (tempList != null) {
			Iterator it = tempList.iterator();
			while (it.hasNext()) {
				Map m = (Map) it.next();
				String parentid = StringUtil.toString(m.get("PARENTID"));
				String key = StringUtil.toString(m.get("KEY"));
				String value = StringUtil.toString(m.get("VALUE"));
				CarBrandItem item = new CarBrandItem();
				item.setParentid(parentid);
				item.setKey(key);
				item.setValue(value);
				resultList.add(item);
			}
		}
		return resultList;
	}
	
	/**
	 * 加载车辆品牌车辆类型多选下拉框信息
	 */
	public List<Map<String, String>> findCarTypeCombox(String carBrand) {
		List<Map<String, String>> resultList=new ArrayList<Map<String, String>>();
		StringBuffer sql = new StringBuffer("select distinct t.brand || '_' || t.type as id, t.brand || '_' || t.type as text " +
				"from SYS_SETTING_TAB t where t.settingname = 'CarBrand'");
		if (StringUtil.checkStr(carBrand)) {
			String[] carBrands = carBrand.split(",");
			sql.append(" and t.brand in (");
			for (int i = 0; i < carBrands.length - 1; i++) {
				if (StringUtil.isNotBlank(carBrands[i])) {
					sql.append("'").append(carBrands[i]).append("',");
				}
			}
			if (StringUtil.isNotBlank(carBrands[carBrands.length - 1])) {
				sql.append("'").append(carBrands[carBrands.length - 1]).append("'");
			}
			sql.append(")");
		}
		sql.append(" order by text");
		try {
			resultList = this.queryBySql(sql.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultList;
	}
	
	/**
	 * 加载品牌年款车辆类型多选下拉框信息
	 */
	public List<Map<String, String>> findCarYearCombox(String carType) {
		List<Map<String, String>> resultList=new ArrayList<Map<String, String>>();
		StringBuffer sql = new StringBuffer("select distinct t.brand || '_' || t.type || '_' || " +
				"t.caryear as id,t.brand || '_' || t.type || '_' || t.caryear " +
				"as text from SYS_SETTING_TAB t where t.caryear is not null");
		if (StringUtil.checkStr(carType)) {
			String[] carTypes = carType.split(",");
			StringBuffer brandSql = new StringBuffer();
			StringBuffer typeSql = new StringBuffer();
			brandSql.append(" and t.brand in (");
			typeSql.append(" and t.type in (");
			String[] brandTypes = null;
			for (int i = 0; i < carTypes.length - 1; i++) {
				if (StringUtil.isNotBlank(carTypes[i])) {
					brandTypes = carTypes[i].split("_");
					brandSql.append("'").append(brandTypes[0]).append("',");
					typeSql.append("'").append(brandTypes[1]).append("',");
				}
			}
			if (StringUtil.isNotBlank(carTypes[carTypes.length - 1])) {
				brandTypes = carTypes[carTypes.length - 1].split("_");
				brandSql.append("'").append(brandTypes[0]).append("'");
				typeSql.append("'").append(brandTypes[1]).append("'");
			}
			brandSql.append(")");
			typeSql.append(")");
			sql.append(brandSql).append(typeSql);
		}
		sql.append(" order by text");
		try {
			resultList = this.queryBySql(sql.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultList;
	}

	@Override
	public List<CarBrandItem> findCarYear() {
		List<CarBrandItem> resultList=new ArrayList<CarBrandItem>();
		StringBuffer sql = new StringBuffer(" select t3.brand||'_'||t3.type parentid,t3.caryear key,t3.caryear value from sys_setting_tab t3 ");
		sql.append("where t3.notes='车辆品牌' ");
		sql.append("group by t3.brand,t3.type,t3.caryear ");
		sql.append("order by t3.brand,t3.type,t3.caryear ");
		
		List tempList = this.queryBySql(sql.toString());
		if (tempList != null) {
			Iterator it = tempList.iterator();
			while (it.hasNext()) {
				Map m = (Map) it.next();
				String parentid = StringUtil.toString(m.get("PARENTID"));
				String key = StringUtil.toString(m.get("KEY"));
				String value = StringUtil.toString(m.get("VALUE"));
				CarBrandItem item = new CarBrandItem();
				item.setParentid(parentid);
				item.setKey(key);
				item.setValue(value);
				resultList.add(item);
			}
		}
		return resultList;
	}

	@Override
	public List<CarCategory> findCarCategory() {
		List<CarCategory> resultList=new ArrayList<CarCategory>();
		StringBuffer sql=new StringBuffer();
		sql.append("select t.displayvalue,t.storevalue from sys_setting_car_tab t");
		sql.append(" where t.settingname='CarCategory' order by t.storevalue asc");
		
		List tempList=this.queryBySql(sql.toString());
		if (tempList != null) {
			Iterator it = tempList.iterator();
			while (it.hasNext()) {
				Map m = (Map) it.next();
				String displayValue = StringUtil.toString(m.get("DISPLAYVALUE"));
				String storeValue = StringUtil.toString(m.get("STOREVALUE"));
				CarCategory item = new CarCategory();
				item.setDisplayValue(displayValue);
				item.setStoreValue(storeValue);
				resultList.add(item);
			}
		}
		return resultList;
	}

	/**
	 * 根据菜单名获取URI
	 */
	public String findMenuByName(String name) {
		StringBuffer sql=new StringBuffer();
		sql.append("select code from j_sys_menu where name like '"+name+"%'");
		List<String> list=this.queryBySql(sql.toString());
		String uri="";
		if (list != null) {
			Iterator it = list.iterator();
			while (it.hasNext()) {
				Map m = (Map) it.next();
				uri = StringUtil.toString(m.get("CODE"));
			}
		}
		return uri;
	}
	
	public static void main(String[] args) {
		new DictionaryDaoImpl().findMenuByName("GIS管理");
	}

	@Override
	public List<IllegalType> findIllegalType() {
		List<IllegalType> resultList=new ArrayList<IllegalType>();
		StringBuffer sql=new StringBuffer();
		sql.append("select t.id,t.code,t.name from sys_car_illegal_tab t");
		sql.append(" order by id asc");
		
		List tempList=this.queryBySql(sql.toString());
		if (tempList != null) {
			Iterator it = tempList.iterator();
			while (it.hasNext()) {
				Map m = (Map) it.next();
				String displayValue = StringUtil.toString(m.get("NAME"));
				String storeValue = StringUtil.toString(m.get("CODE"));
				IllegalType item = new IllegalType();
				item.setDisplayValue(displayValue);
				item.setStoreValue(storeValue);
				resultList.add(item);
			}
		}
		return resultList;
	}
}
