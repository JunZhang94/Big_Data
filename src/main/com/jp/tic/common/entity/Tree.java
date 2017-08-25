package com.jp.tic.common.entity;

import java.util.ArrayList;
import java.util.List;

import com.jp.tic.framework.entity.BaseEntity;

public class Tree extends BaseEntity {
	private static final long serialVersionUID = -1424188168218049571L;
	private String id;
	private String text;
	private boolean leaf;
	private Integer nodeLevel;
	private String nodeId;
	private String parentId;
	private boolean checked;
	private String url;
	private String type;
	private String openType;
	
	//private String uiProvider = "col";
	private List<Tree> children = new ArrayList<Tree>();
	
	public List<Tree> getChildren() {
		return children;
	}

	public void setChildren(List<Tree> children) {
		this.children = children;
	}

	public boolean isLeaf() {
		return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public String getNodeId() {
		return nodeId;
	}

	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

	public String getPid() {
		return parentId;
	}

	public void setPid(String pid) {
		this.parentId = pid;
	}

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

	public Tree(){
	}
	
	public Tree(String text, String id, String nodeId, String parentId, Integer nodeLevel) {
		this.id = id;
		this.text = text;
		this.parentId = parentId;
		this.nodeId = nodeId;
		this.nodeLevel = nodeLevel;
		/*if (nodeLevel < 3) {
			this.leaf = false;
		} else {
			this.leaf = true;
		}*/
	}

	public Integer getNodeLevel() {
		return nodeLevel;
	}

	public void setNodeLevel(Integer nodeLevel) {
		this.nodeLevel = nodeLevel;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getOpenType() {
		return openType;
	}

	public void setOpenType(String openType) {
		this.openType = openType;
	}

	/*public String getUiProvider() {
		return uiProvider;
	}

	public void setUiProvider(String uiProvider) {
		this.uiProvider = uiProvider;
	}*/
}
