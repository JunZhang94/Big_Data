package com.jp.tic.security.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jp.tic.security.dao.ModuleDao;
import com.jp.tic.security.entity.Module;
import com.jp.tic.system.auxiliary.AbstractTree;
import com.jp.tic.system.service.BaseService;

/**
 * 模块(功能菜单)服务
 * @author lsg
 */
@Service
@Transactional(readOnly = true)
public class ModuleService extends BaseService<Module, Long> {
	
	 @Autowired
	 private ModuleDao moduleDao;

     class ModuleTree extends AbstractTree<Module, Long> {

        @Override
        protected AbstractTree<Module, Long> createChild(Module data) {
            ModuleTree tree = new ModuleTree();
            tree.setData(data);
            return tree;
        }

        @Override
        protected Long getDataId(Module data) {
            return data == null ? null : data.getId();
        }

        @Override
        protected Long getDataPid(Module data) {
            return data == null ? null : data.getPid();
        }

        @Override
        public Long getId() {
            return data == null ? null : data.getId();
        }

        @Override
        public String getText() {
            return data == null ? null : data.getName();
        }

        @Override
        protected boolean isEqual(Long id1, Long id2) {
            return id1 == null ? id2 == null : id1.equals(id2);
        }
    }
    
    /**
     * 获取模块树
     */
    public Map<String, Object> getModuleTreeMapButPermGroup(Long rootId, List<Long> ids,
            boolean hookData,String userCode) {
        /* 获取全部数据 */
        List<Module> list = this.dealAllMOduleDatas(userCode);
        /* 计算树形结构 */
        ModuleTree tree = new ModuleTree();
        tree.makeTree(rootId, list);
        /* 过滤选中 */
        if (ids != null) {
            tree.filter(ids);
        }
        /* 转为Map */
        Map<String, Object> map = tree.toMap(ids != null, hookData);
        return map;

    }
    
    /**
	 * 查询所有的菜单数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Module> dealAllMOduleDatas(String userCode) {
        List<Map<String, String>> results = moduleDao.findAllModuleDatas(userCode);
        Module module = null;
        List<Module> list = new ArrayList<Module>();
    	if (results != null && results.size() > 0) {
    		for (Map<String, String> map : results) {
    			module = new Module();
    			module.setId(Long.parseLong(map.get("ID")));
    			module.setName(map.get("NAME"));
    			module.setPid(Long.parseLong(map.get("PARENTID")));
    			list.add(module);
    		}
    	}
    	return list;
	}
}
