package com.jp.tic.business.system.entity;

import java.util.List;

public class GatherStatisticsTreeGridNode extends TreeNode {

	private boolean expanded = false;
    private List<GatherStatisticsTreeGridNode> children;
    private int onlineCount;
    private int outOnlineCount;
    private int allCount;
    private int totalCars;
    
    public boolean isExpanded() {
        return expanded;
    }
    public void setExpanded(boolean expanded) {
        this.expanded = expanded;
    }
    public List<GatherStatisticsTreeGridNode> getChildren() {
        return children;
    }
    public void setChildren(List<GatherStatisticsTreeGridNode> children) {
        this.children = children;
    }
	/**
	 * @return the onlineCount
	 */
	public int getOnlineCount() {
		if(null ==children ||children.isEmpty()){
            return onlineCount;
        }
        int total = 0;
        for(GatherStatisticsTreeGridNode node :children){
            total += node.getOnlineCount();
        }
        return total;
	}
	/**
	 * @param onlineCount the onlineCount to set
	 */
	public void setOnlineCount(int onlineCount) {
		this.onlineCount = onlineCount;
	}
	/**
	 * @return the outOnlineCount
	 */
	public int getOutOnlineCount() {
		if(null ==children ||children.isEmpty()){
            return outOnlineCount;
        }
        int total = 0;
        for(GatherStatisticsTreeGridNode node :children){
            total += node.getOnlineCount();
        }
        return total;
	}
	/**
	 * @param outOnlineCount the outOnlineCount to set
	 */
	public void setOutOnlineCount(int outOnlineCount) {
		this.outOnlineCount = outOnlineCount;
	}
	/**
	 * @return the allCount
	 */
	public int getAllCount() {
		if(null ==children ||children.isEmpty()){
            return allCount;
        }
        int total = 0;
        for(GatherStatisticsTreeGridNode node :children){
            total += node.getOnlineCount();
        }
        return total;
	}
	/**
	 * @param allCount the allCount to set
	 */
	public void setAllCount(int allCount) {
		this.allCount = allCount;
	}
	/**
	 * @return the totalCars
	 */
	public int getTotalCars() {
		return this.getAllCount();
	}
	/**
	 * @param totalCars the totalCars to set
	 */
	public void setTotalCars(int totalCars) {
		this.totalCars = totalCars;
	}
    
	 @Override
    public boolean isLeaf() {
        if(null == this.children || this.children.isEmpty()){
            return true;
        }
        return false;
	 }
}
