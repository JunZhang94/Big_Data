package com.jp.tic.system.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.system.auxiliary.AbstractTree;
import com.jp.tic.system.dao.OrganizationDao;
import com.jp.tic.system.entity.OrgEntity;
import com.jp.tic.system.mapper.OrganizationMapper;
import com.jp.tic.system.service.BaseService;
import com.jp.tic.system.service.OrganizationService;
import com.jp.tic.system.util.ConstantUtil;
import com.jp.tic.utils.lang.StringUtil;

/**
 * 组织结构类
 * 
 * @author lsg
 * 
 */
@Service
public class OrganizationServiceImpl extends BaseService<OrgEntity, Long> implements OrganizationService {
    
    public static final String ORG_NAME_CACHE = "ORG_NAME_CACHE";
    
    @Autowired
	OrganizationDao organizationDao;
    
    @Autowired
    OrganizationMapper mapper;
    
    /**
     * 组织结构树（辅助类）
     * 
     * @author Teon
     * 
     */
    class OrgTree extends AbstractTree<OrgEntity, Long> {
        
        public String coding;
        public String orgType;//组织类型
        public String longitude;//经度
        public String latitude;//纬度
        public String flag;//虚拟卡口类型

        @Override
        protected AbstractTree<OrgEntity, Long> createChild(OrgEntity data) {
            OrgTree tree = new OrgTree();
            tree.setData(data);
            return tree;
        }

        @Override
        protected Long getDataId(OrgEntity data) {
            return data == null ? null : data.getId();
        }

        @Override
        protected Long getDataPid(OrgEntity data) {
            return data == null ? null : data.getPid();
        }

        @Override
        public Long getId() {
            return data == null ? null : data.getId();
        }

        @Override
        public String getText() {
            return data == null ? "" : data.getOrgName();
        }

        @Override
        protected boolean isEqual(Long id1, Long id2) {
            return id1 == null ? id2 == null : id1.equals(id2);
        }

        public OrgTree removeUnchecked() {
            return (OrgTree) super.removeUnchecked();
        }
        
        /**
         * @author xlg
         * @return 组织编码
         */
        public String getCoding(){
            return data==null?"":data.getCoding();
        }
         
        /**
         * @author lyj
         * @return 组织类型
         */
        public String getOrgType(){
            return data==null ?"":data.getOrgType().toString();
        }
        
        
        public String getLongitude() {
            return data==null ?"":data.getLongitude();
        }

        public String getLatitude() {
            return data==null ?"":data.getLatitude();
        }

        /**
		 * @return the flag
		 */
		public String getFlag() {
			// return data==null ?"":data.getFlag().toString();
			if(data==null || data.getFlag()==null){
				return "";
			}else{
				return data.getFlag().toString();
			}
		}

		/**
		 * @param flag the flag to set
		 */
		public void setFlag(String flag) {
			this.flag = flag;
		}

		/**
         * 覆盖父类的setData，加入组织编码coding
         */
        @Override
        public void setData(OrgEntity data) {
                this.data = data;
                this.id = getId();
                this.text = getText();
                this.coding = getCoding();
                this.orgType=getOrgType();
                this.longitude = getLongitude();
                this.latitude = getLatitude();
                this.flag = getFlag();
        }
        
        @Override
        public String testMethod(String a) {
        	String aa = "11111111111111";
        	return aa;
        }
        
        /**
         * 覆盖父类tomap方法  加入组织编码  coding
         * @author xlg
         */
        @Override
        public Map<String, Object> toMap(boolean removeUnchecked) {
            
            if (removeUnchecked && UNCHECKED.equals(this.checked))
                return null;

            Map<String, Object> map = new HashMap<String, Object>();
            map.put("id", id);
            map.put("text", text);
            map.put("checked", checked);
            map.put("coding",coding);
            if (flag != null) {
            	map.put("flag",flag);
            }
           if(orgType!=null){
           if(orgType.equals(ConstantUtil.ORG_KAKOU.toString())){
                map.put("type", ConstantUtil.NODE_TYPE_KAKOU);
                map.put("longitude",longitude);
                map.put("latitude",latitude);
            }else if(orgType.equals(ConstantUtil.ORG_DERECTION.toString())){
                map.put("type", ConstantUtil.NODE_TYPE_DERECTION);
            }else{
                map.put("type", ConstantUtil.NODE_TYPE_REGION);
            }
           }
          // map.put("type", ConstantUtil.NODE_TYPE_REGION);
           map.put("orgType", orgType);

            List<Map<?, ?>> list = new ArrayList<Map<?, ?>>();
            if (this.children != null)
                for (AbstractTree<OrgEntity, Long> child : this.children) {
                    Map<String, Object> submap =((OrgTree)child).toMap(removeUnchecked);
                    if (submap != null)
                        list.add(submap);
                }
            map.put("children", list);

            return map;

        }
    }
    
    /**
     * 获取组织结构树形映射数据
     * 
     * 树形映射数据包含属性项目：id - ID, text - 标签文字, data - 组织结构数据Map形式, children - 子数据  , coding - 组织编码
     * 
     * @param ids
     *            需要过滤的组织结构ID，NULL时表示不过滤
     * @param removeUnchecked
     *            是否移除未选中的节点
     * @param deviceFlag 是否展示设备节点
     * @return 树形结构映射数据
     * 
     * @author Teon
     */
    public Map<String, Object> getOrganizationTreeMap(List<Long> ids,
            boolean removeUnchecked, boolean deviceFlag) {

        /* 根ID */
        Long rootId = Long.valueOf(-1);

        /* 获取全部数据 */
        List<OrgEntity> list = this.getOrganizations(deviceFlag, true);

        /* 计算树形结构 */
        OrgTree tree = new OrgTree();
        tree.makeTree(rootId, list);

        /* 过滤选中 */
        if (ids != null&&!ids.isEmpty()) {
            tree.filter(ids);
            tree = tree.removeUnchecked();
        }
        String str = tree.testMethod("aaa");
        
        /* 转为Map */
        Map<String, Object> map = tree.toMap(ids != null);
        return map;

    }
    /**
     * 获取组织结构树形映射数据(卡口方向)
     * 
     * 树形映射数据包含属性项目：id - ID, text - 标签文字, data - 组织结构数据Map形式, children - 子数据  , coding - 组织编码
     * 
     * @param ids
     *            需要过滤的组织结构ID，NULL时表示不过滤
     * @param removeUnchecked
     *            是否移除未选中的节点
     * @param deviceFlag 是否展示设备节点
     * @return 树形结构映射数据
     * 
     * @author jzxie
     */
    public Map<String, Object> getOgnDirectionTreeMap(List<Long> ids,
            boolean removeUnchecked, boolean deviceFlag, boolean userFlag, String orgId) {

        /* 根ID */
        Long rootId = Long.valueOf(-1);

        /* 获取全部数据 */
        List<OrgEntity> list = this.getOgnDirection(deviceFlag, true, userFlag, orgId);

        /* 计算树形结构 */
        OrgTree tree = new OrgTree();
        tree.makeTree(rootId, list);

        /* 过滤选中 */
        if (ids != null&&!ids.isEmpty()) {
            tree.filter(ids);
            tree = tree.removeUnchecked();
        }
        String str = tree.testMethod("aaa");
        
        /* 转为Map */
        Map<String, Object> map = tree.toMap(ids != null);
        return map;

    }
    /**
     * 获取只含组织的树形组织结构数据（剔除卡口）
     * @param ids
     * @param removeUnchecked
     * @return
     * lyj
     */
    public Map<String,Object> getOnlyOrgTreeMap(List<Long> ids, boolean removeUnchecked){

        /* 根ID */
        Long rootId = Long.valueOf(-1);

        /* 获取全部数据 */
        List<OrgEntity> list = this.getOrganizations(false, false);
        /* 计算树形结构 */
        OrgTree tree = new OrgTree();
        tree.makeTree(rootId, list);

        /* 过滤选中 */
        if (ids != null&&!ids.isEmpty()) {
            tree.filter(ids);
            tree = tree.removeUnchecked();
        }

        /* 转为Map */
        Map<String, Object> map = tree.toMap(ids != null);
        return map;
         
    }
    
    /**
     * 只加载部门结构树,用于用户管理功能
     * @param ids
     * @return
     * lsg
     */
    public Map<String,Object> onlyOrgTreeForUser(List<Long> ids){
        /* 根ID */
        Long rootId = Long.valueOf(-1);
        /* 获取全部数据 */
        List<OrgEntity> list = this.onlyOrgTreeInfo();
        /* 计算树形结构 */
        OrgTree tree = new OrgTree();
        tree.makeTree(rootId, list);
        /* 过滤选中 */
        if (ids != null&&!ids.isEmpty()) {
            tree.filter(ids);
            tree = tree.removeUnchecked();
        }
        /* 转为Map */
        Map<String, Object> map = tree.toMap(ids != null);
        return map;
         
    }
    
    /**
     * 获取组织结构数据列表
     * @param deviceFlag 树是否加载设备
     * @param orgFlag 是否加载卡点
     * @return 组织结构数据列表
     * @author lsg
     */
    public List<OrgEntity> getOrganizations(boolean deviceFlag, boolean orgFlag) {
    	List<Map<String, String>> results = organizationDao.getOrganizations(deviceFlag, orgFlag);
    	OrgEntity org = null;
    	List<OrgEntity> list = new ArrayList<OrgEntity>();
    	if (results != null && results.size() > 0) {
    		for (Map<String, String> map : results) {
    			org = new OrgEntity();
    			org.setId(Long.parseLong(map.get("ID")));
    			org.setOrgName(map.get("ORGNAME"));
    			org.setOrgType(Long.parseLong(map.get("ORGTYPE")));
    			org.setPid(Long.parseLong(map.get("PID")));
    			list.add(org);
    		}
    	}
    	return list;
    }
    
    /**
     * 获取组织结构数据列表,只加载分局
     * @return 组织结构数据列表
     * @author lsg
     */
    public List<OrgEntity> onlyOrgTreeInfo() {
    	List<Map<String, String>> results = organizationDao.onlyOrgTreeInfo();
    	OrgEntity org = null;
    	List<OrgEntity> list = new ArrayList<OrgEntity>();
    	if (results != null && results.size() > 0) {
    		for (Map<String, String> map : results) {
    			org = new OrgEntity();
    			org.setId(Long.parseLong(map.get("ID")));
    			org.setOrgName(map.get("ORGNAME"));
    			org.setOrgType(Long.parseLong(map.get("ORGTYPE")));
    			org.setPid(Long.parseLong(map.get("PID")));
    			list.add(org);
    		}
    	}
    	return list;
    }
    
    /**
     * 获取组织结构数据列表,通过卡口模糊名称过滤一次包含此模糊卡口的部门
     * @param kkmc 卡口名称
     * @return 组织结构数据列表
     * @author lsg
     */
    public List<OrgEntity> getOrganizationsByKkmc(String kkmc) {
    	List<Map<String, String>> results = organizationDao.getOrganizationsByKkmc(kkmc);
    	OrgEntity org = null;
    	List<OrgEntity> list = new ArrayList<OrgEntity>();
    	if (results != null && results.size() > 0) {
    		for (Map<String, String> map : results) {
    			org = new OrgEntity();
    			org.setId(Long.parseLong(map.get("ID")));
    			org.setOrgName(map.get("ORGNAME"));
    			org.setOrgType(Long.parseLong(map.get("ORGTYPE")));
    			org.setPid(Long.parseLong(map.get("PID")));
    			list.add(org);
    		}
    	}
    	return list;
    }
    
    /**
     * 获取组织结构数据列表,通过卡口模糊名称过滤一次包含此模糊卡口的部门
     * @param kkmc 卡口名称
     * @return 组织结构数据列表
     * @author lsg
     */
    public List<Map<String, String>> getOrganizationsByKkmcNocache(String kkmc) {
    	List<Map<String, String>> results = organizationDao.getOrganizationsByKkmcNocache(kkmc);
    	return results;
    }
    
    /**
     * 从缓存获取组织结构数据列表
     * @param kkmc 卡口名称
     * @return 组织结构数据列表
     * @author lsg
     */
    public List<Map<String, String>> getOrganizationsByCache() {
    	List<Map<String, String>> results = organizationDao.findAllOrgName(null);
    	List<Map<String, String>> datas = new ArrayList<Map<String,String>>();
    	datas.add(results.get(0));
    	boolean flag = false;
    	//Map<String, String> map = null;
    	if (results != null && results.size() > 0) {
    		for (Map<String, String> resultMap : results) {
    			flag = false;
    			for (Map<String, String> dataMap : datas) {
    				if (StringUtil.equals(resultMap.get("PID"), dataMap.get("PID"))) {
    					flag = true;
    					break;
    				} 
    			}
    			if (!flag) {
    				datas.add(resultMap);
    			}
    		}
    	}
    	return datas;
    	/*OrgEntity org = null;
    	List<OrgEntity> list = new ArrayList<OrgEntity>();
    	String orgName = "";
    	String dwxzqh = "";
    	if (datas != null && datas.size() > 0) {
    		for (Map<String, String> map : datas) {
    			org = new OrgEntity();
    			org.setId(Long.parseLong(map.get("PID")));
    			if (!StringUtil.checkStr(map.get("DWMC"))) {
    				orgName = "广州市";
    			} else {
    				orgName = map.get("DWMC");
				}
    			org.setOrgName(orgName);
    			if (!StringUtil.checkStr(map.get("DWXZQH"))) {
    				dwxzqh = "-1";
    			} else {
    				dwxzqh = map.get("DWXZQH");
    			}
    			//org.setOrgType(Long.parseLong(map.get("ORGTYPE")));
    			org.setPid(Long.parseLong(dwxzqh));
    			list.add(org);
    		}
    	}
    	return list;*/
    	
    	/*List<Map<String, String>> results = organizationDao.getOrganizationsByKkmc(kkmc);
    	OrgEntity org = null;
    	List<OrgEntity> list = new ArrayList<OrgEntity>();
    	if (results != null && results.size() > 0) {
    		for (Map<String, String> map : results) {
    			org = new OrgEntity();
    			org.setId(Long.parseLong(map.get("ID")));
    			org.setOrgName(map.get("ORGNAME"));
    			org.setOrgType(Long.parseLong(map.get("ORGTYPE")));
    			org.setPid(Long.parseLong(map.get("PID")));
    			list.add(org);
    		}
    	}
    	return list;*/
    }
    
    /**
     * 加载所有的部门信息
     * @return 查询结果
     */
    public List<Map<String, String>> loadAllOrgInfo() {
    	return organizationDao.loadAllOrgInfo();
    }
    
    /**
	 * 分页查询机构部门基本信息
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> queryOrgInfoByPage(Map<String, String> param) {
		return mapper.queryOrgInfoByPage(param);
	}
	
	/**
	 * 统计机构部门基本信息
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> countOrgInfoDatas(Map<String, String> param) {
		return mapper.countOrgInfoDatas(param);
	}
	
	/**
	 * 添加机构部门基本信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int addOrgInfo(Map<String, String> param) {
		return mapper.addOrgInfo(param);
	}
	
	/**
	 * 删除机构部门基本信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteOrgInfo(Map<String, String> param) {
		return mapper.deleteOrgInfo(param);
	}
	
	/**
	 * 更新机构部门基本信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateOrgInfo(Map<String, String> param) {
		return mapper.updateOrgInfo(param);
	}
	
	/**
	 * 检查是否已经存在此部门信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> checkOrgInfo(Map<String, String> param) {
		return mapper.checkOrgInfo(param);
	}
	
	/**
	 * 获取区域编号
	 * @return 查询结果
	 */
	public List<Map<String, String>> loadOrgData() {
		return organizationDao.loadOrgTopestData();
	}
	
	/**
     * 加载部门到卡口之间所有数据的名称
     * param orgName卡口或者组织名称
     * @return 查询结果
     */
    public List<Map<String, String>> findAllOrgName(String[] orgName) {
    	return organizationDao.findAllOrgName(orgName);
    }
    
    /**
     * 查询被选中的卡口信息
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> findHavingData(Map<String, String> param) {
    	return organizationDao.findHavingData(param);
    }
    
    /**
     * 根据orgType查找组织结构信息
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> findOrgInfoByOrgType(Map<String, String> param) {
    	return organizationDao.findOrgInfoByOrgType(param);
    }
    
    /**
     * 根据orgType查找所有部门信息
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> findDeptInfoByOrgType(Map<String, String> param) {
    	return organizationDao.findDeptInfoByOrgType(param);
    }
    
    /**
     * 获取只含组织的树形组织结构数据（剔除卡口）,通过卡口模糊名称过滤一次包含此模糊卡口的部门
     * @param ids
     * @param kkmc
     * @return
     * lyj
     */
    public Map<String,Object> getOnlyOrgTreeByKkmcMap(List<Long> ids, String kkmc){

        /* 根ID */
        Long rootId = Long.valueOf(-1);

        /* 获取全部数据 */
        List<OrgEntity> list = this.getOrganizationsByKkmc(kkmc);
        /* 计算树形结构 */
        OrgTree tree = new OrgTree();
        tree.makeTree(rootId, list);

        /* 过滤选中 */
        if (ids != null&&!ids.isEmpty()) {
            tree.filter(ids);
            tree = tree.removeUnchecked();
        }

        /* 转为Map */
        Map<String, Object> map = tree.toMap(ids != null);
        return map;
         
    }
    
    /**
     * 获取只含组织的树形组织结构数据（剔除卡口）,数据查询来自缓存
     * @param ids
     * @param list
     * @return
     * lyj
     */
    public Map<String,Object> getOnlyOrgTreeCacheMap(List<Long> ids, List<OrgEntity> list){

        /* 根ID */
        Long rootId = Long.valueOf(-1);

        /* 计算树形结构 */
        OrgTree tree = new OrgTree();
        tree.makeTree(rootId, list);

        /* 过滤选中 */
        if (ids != null&&!ids.isEmpty()) {
            tree.filter(ids);
            tree = tree.removeUnchecked();
        }

        /* 转为Map */
        Map<String, Object> map = tree.toMap(ids != null);
        return map;
         
    }
    
    /**
     * 加载部门到卡口之间所有数据的名称，直接查询数据库，汉字模糊匹配
     * param orgName卡口或者组织名称
     * @return 查询结果
     */
    public List<Map<String, String>> findAllOrgNameNoCache(String[] orgName) {
    	return organizationDao.findAllOrgNameNoCache(orgName);
    }
    
    /**
     * 加载所有的卡口信息
     * @return 查询结果
     */
    public List<Map<String, String>> loadAllMountInfo() {
    	return organizationDao.loadAllMountInfo();
    }
    
    /**
     * 查询所有的设备信息
     * @return 查询结果
     * @author lsg
     */
    public List<Map<String, String>> findAllDeviceInfo() {
    	return organizationDao.findAllDeviceInfo();
    }
    
    /**
     * 查询所有的方向信息
     * @return 查询结果
     * @author lsg
     */
    public List<Map<String, String>> findAllDirectionInfo() {
    	return organizationDao.findAllDirectionInfo();
    }
    
    /**
     * 根据orgType查找组织结构信息,只显示正常在线的卡口
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> findOnlineMountInfo(Map<String, String> param) {
    	return organizationDao.findOnlineMountInfo(param);
    }
    /**
     *显示卡口方向
     */
	@Override
	public List<OrgEntity> getOgnDirection(boolean deviceFlag, boolean orgFlag, boolean userFlag, String orgId) {
		List<Map<String, String>> results = organizationDao.getOgnDirection(deviceFlag, orgFlag, userFlag, orgId);
    	OrgEntity org = null;
    	List<OrgEntity> Arraylist = new ArrayList<OrgEntity>();
    	if (results != null && results.size() > 0) {
    		for (Map<String, String> map : results) {
    			org = new OrgEntity();
    			org.setId(Long.parseLong(map.get("ID")));
    			org.setOrgName(map.get("ORGNAME"));
    			org.setOrgType(Long.parseLong(map.get("ORGTYPE")));
    			if (StringUtil.checkObj(map.get("FLAG"))) {
    				org.setFlag(map.get("FLAG"));
    			}
    			org.setPid(Long.parseLong(map.get("PID")));
    			Arraylist.add(org);
    		}
    	}
    	return Arraylist;
		
	}
    
    /**
     * 查询所有的方向信息,数据保存至缓存
     * param orgName 方向参数
     * @return 查询结果
     */
    public List<Map<String, String>> findAllDirection(String[] orgName) {
    	return organizationDao.findAllDirection(orgName);
    }
    
    /**
     * 查询所有的方向信息,数据保存至缓存
     * param orgName 方向参数
     * @return 查询结果
     */
    public List<Map<String, String>> findAllDirectionNew(String kkbh) {
    	return organizationDao.findAllDirectionNew(kkbh);
    }
    
    /**
     * 根据输入方向参数加载部门到方向之间所有数据的名称,数据保存至缓存
     * param orgName 方向参数
     * @return 查询结果
     */
    public List<Map<String, String>> findDirectionByName(String[] orgName) {
    	return organizationDao.findDirectionByName(orgName);
    }
    
    /**
     * 只查询方向信息
     * param orgName 方向参数
     * @return 查询结果
     */
    public List<Map<String, String>> findOnlyDirection(String[] orgName) {
    	return organizationDao.findOnlyDirection(orgName);
    }
    
    /**
     * 查询被勾选的方向
     * @param param 查询参数
     * @return 查询结果
     */
    public List<Map<String, String>> findCheckedDirectionsInfo(Map<String, String> param) {
    	return organizationDao.findCheckedDirectionsInfo(param);
    }
    
    /**
     * 获取组织结构数据列表
     * @return 组织结构数据列表
     * @author lsg
     */
    public List<OrgEntity> getDeptHavingDirection() {
    	List<Map<String, String>> results = organizationDao.getDeptHavingDirection();
    	OrgEntity org = null;
    	List<OrgEntity> list = new ArrayList<OrgEntity>();
    	if (results != null && results.size() > 0) {
    		for (Map<String, String> map : results) {
    			org = new OrgEntity();
    			org.setId(Long.parseLong(map.get("ID")));
    			org.setOrgName(map.get("ORGNAME"));
    			org.setOrgType(Long.parseLong(map.get("ORGTYPE")));
    			org.setPid(Long.parseLong(map.get("PID")));
    			list.add(org);
    		}
    	}
    	return list;
    }
    @Override
	public List<Map<String, String>> findOrgInfoByOrgTypenew(
			Map<String, String> param) {
		// TODO Auto-generated method stub
    	return organizationDao.findOrgInfoByOrgTypenew(param);
	}
    /**
     * 关联到卡口获取组织结构树，通过方向名称查询条件，找到对应存在的部门
     * @param directionName 方向名称
     * @return 剔除方向的组织结构树
     * @author lsg
     */
    public List<Map<String, String>> getOrgByDirectionNumberNocache(String directionName) {
    	return organizationDao.getOrgByDirectionNumberNocache(directionName);
    }
    
    /**
     * 根据名称查询所有的方向数据，汉字模糊匹配
     * param orgName卡口或者组织名称
     * @return 查询结果
     */
    public List<Map<String, String>> findDirectionByNameNoCache(String[] orgName) {
    	return organizationDao.findDirectionByNameNoCache(orgName);
    }

    /**
     * 卡口数量统计
     * @return 查询结果
     */
    public List<Map<String, String>> countOrgMountsInfo() {
    	return organizationDao.countOrgMountsInfo();
    }
    
    /**
     * 过滤正常且审核通过的卡口数量统计
     * @return 查询结果
     */
    public List<Map<String, String>> countUsringOrgMountsInfo() {
    	return organizationDao.countUsringOrgMountsInfo();
    }
    
    /**
     * 过滤正常且审核通过的卡口数量统计,数据范围包含广州市
     * @return 查询结果
     */
    public List<Map<String, String>> countAllOrgMountsInfo() {
    	return organizationDao.countAllOrgMountsInfo();
    }
    
    /**
	 * 获取所有部门（用于下拉框）
	 */
	public Map cachePubOrgData() {
		return organizationDao.cachePubOrgData();
	}
	
	/**
	 * 加载所有的卡口信息
	 * @return 查询结果
	 */
	public List<Map<String, String>> loadAllMountInfos() {
		return organizationDao.loadAllMountInfos();
	}
	
	/**
     * 加载所有的虚拟卡口信息
     * @param param 查询参数
     * @return
     */
    public List<Map<String, String>> findVulMountInfos(Map<String, String> param) {
    	return organizationDao.findVulMountInfos(param);
    }
    
    /**
     * 加载区域表数据
     * @return
     */
    public List<Map<String, String>> loadAreaTabTwo() {
    	return organizationDao.loadAreaTabTwo();
    }
}
