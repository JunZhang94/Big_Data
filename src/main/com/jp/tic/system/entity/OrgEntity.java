package com.jp.tic.system.entity;

import java.io.Serializable;

/**
 * 组织机构entity
 * 
 * @author WanKeZhong
 * 
 */

public class OrgEntity implements Serializable {
	
	private static final long serialVersionUID = 8971126657720329123L;

    public final static Long DEFAULT_DOMAIN_ID = Long.valueOf(0);
    public final static Long DEFAULT_ORG_TYPE = Long.valueOf(0);
    public final static String DEFAULT_EN_CODE = "";
    public final static Long DEFAULT_FAST = Long.valueOf(0);
    public final static Long DEFAULT_ORDER_ORG = Long.valueOf(1);
    public final static String DEFAULT_MEM = "";

    private Long id;
    private Long pid;
    private String orgName;
    private String enCode = DEFAULT_EN_CODE;
    private String coding;
    private String mem = DEFAULT_MEM;
    private Long fast = DEFAULT_FAST;
    private Long domainId = DEFAULT_DOMAIN_ID;
    private Long orgType = DEFAULT_ORG_TYPE;
    private Long orderOrg = DEFAULT_ORDER_ORG;
    private Integer nodeType;
    private String path;
    private Boolean leaf;
    private String longitude;                   //经度
    private String latitude;                    //纬度
    //private Date createTime;
    private String directionCode;     //方向编码
    //private List<DevicesEntity> devices;
    //private List<OrgRole> orgRoles;
    private String flag;
    
    public OrgEntity() {
        super();
    }
    
    public String getDirectionCode() {
        return directionCode;
    }


    public void setDirectionCode(String directionCode) {
        this.directionCode = directionCode;
    }


    //添加构造函数(用于加载组织下拉列表)
    public OrgEntity(Long id, String orgName) {
        super();
        this.id = id;
        this.orgName = orgName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPid() {
        return pid;
    }

    public void setPid(Long pid) {
        this.pid = pid;
    }

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public String getEnCode() {
        return enCode;
    }

    public void setEnCode(String enCode) {
        this.enCode = enCode;
    }

    public String getCoding() {
        return coding;
    }

    public void setCoding(String coding) {
        this.coding = coding;
    }

    public String getMem() {
        return mem;
    }

    public void setMem(String mem) {
        this.mem = mem;
    }

    public Long getFast() {
        return fast;
    }

    public void setFast(Long fast) {
        this.fast = fast;
    }

    public Long getDomainId() {
        return domainId;
    }

    public void setDomainId(Long domainId) {
        this.domainId = domainId;
    }

    public Long getOrgType() {
        return orgType;
    }

    public void setOrgType(Long orgType) {
        this.orgType = orgType;
    }

    public Long getOrderOrg() {
        return orderOrg;
    }

    public void setOrderOrg(Long orderOrg) {
        this.orderOrg = orderOrg;
    }


    public Integer getNodeType() {
        return nodeType;
    }

    public void setNodeType(Integer nodeType) {
        this.nodeType = nodeType;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Boolean getLeaf() {
        return leaf;
    }

    public void setLeaf(Boolean leaf) {
        this.leaf = leaf;
    }


    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }
    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

	/**
	 * @return the flag
	 */
	public String getFlag() {
		return flag;
	}

	/**
	 * @param flag the flag to set
	 */
	public void setFlag(String flag) {
		this.flag = flag;
	}
    
}
