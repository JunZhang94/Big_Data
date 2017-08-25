package com.jp.tic.system.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.system.dao.OrganizationDao;
import com.jp.tic.system.service.OrgTreeService;

@Service
public class OrgTreeServiceImpl implements OrgTreeService {
	
	@Autowired
	OrganizationDao organizationDAO;

	/**
	 * 查询所有的所有数据的组织结构树
	 * @return 查询结果
	 */
	  public List<Long> loadOrgTopestData() {
	    	List<Map<String, String>> datas = organizationDAO.loadOrgTopestData();
	    	List<Long> ids = new ArrayList<Long>();
	    	if (datas != null && datas.size() > 0) {
	    		for (Map<String, String> map : datas) {
	    			ids.add(Long.parseLong(map.get("ID")));
	    		}
	    	}
	    	return ids;
	    }
	  
	  public List<Long> loadOrgTopestRole() {
	    	List<Map<String, String>> datas = organizationDAO.loadOrgTopestRole();
	    	List<Long> ids = new ArrayList<Long>();
	    	if (datas != null && datas.size() > 0) {
	    		for (Map<String, String> map : datas) {
	    			ids.add(Long.parseLong(map.get("ID")));
	    		}
	    	}
	    	return ids;
	    }

	public Map<String, String> loadOnlyTopOrgTreeMap() {
		List<Map<String, String>> datas = organizationDAO.loadOrgTopestData();
    	Map<String,String> ids = new HashMap<String, String>();
    	if (datas != null && datas.size() > 0) {
    		for (Map<String, String> map : datas) {
    			ids.put("id", map.get("ID"));
    			ids.put("text", map.get("QYMC"));
    		}
    	}
		return ids;
	}

}
