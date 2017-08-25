package com.jp.tic.business.system.entity;

import com.jp.tic.business.util.ConstantUtil;




/**
 * ext树节点
 * 
 * 
 * @author abe
 */

public class TreeNode {
	
	public static final int NODE_TYPE_ORG = 1;
	public static final int NODE_TYPE_FRONTEQUIPMENT = 2;
	
	public static final int NODE_TYPE_MENU_NORMAL = 1;
	public static final int NODE_TYPE_MENU_OPERATE = 2;
	
	private String id;
	private String text;
	private boolean leaf = true;
	private String nodePath;
	private int nodeStatus;
    private String icon;
	private String iconCls;
	private String cls;
	private Integer type;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	
	public String getCls() {
		return cls;
	}
	public void setCls(String cls) {
		this.cls = cls;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	
	
	public String getNodePath() {
		return nodePath;
	}
	public void setNodePath(String nodePath) {
		this.nodePath = nodePath;
	}
	public int getNodeStatus() {
        return nodeStatus;
    }
    public void setNodeStatus(int nodeStatus) {
        this.nodeStatus = nodeStatus;
    }
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
	    if(type == ConstantUtil.NODE_TYPE_REGION||type == ConstantUtil.NODE_TYPE_KAKOU||type == ConstantUtil.NODE_TYPE_DERECTION){
	        this.type = type; 
	    }else{
	        if(type == 0 ){
	            this.type = ConstantUtil.NODE_TYPE_REGION;
	        }else if(type == 1){
	            this.type = ConstantUtil.NODE_TYPE_KAKOU;
	        }else if(type == 2){
	            this.type = ConstantUtil.NODE_TYPE_DERECTION;
	        }
	    }
	}
	
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}	

}