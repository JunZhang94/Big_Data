package com.jp.tic.system.auxiliary;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 抽象树（辅助类）
 * 
 * @author Teon
 * 
 */
public abstract class AbstractTree<DataType, IDType> {

    public static final Integer CHECKED = 1;

    public static final Integer UNCHECKED = 0;

    public static final Integer HALF_CHECKED = 2;

    /**
     * 节点ID
     */
    public IDType id;

    /**
     * 节点文字
     */
    public String text;

    /**
     * 节点数据
     */
    public DataType data;

    /**
     * 选中状态
     */
    public Integer checked = UNCHECKED;

    /**
     * 子节点列表
     */
    public List<AbstractTree<DataType, IDType>> children;

    public AbstractTree() {
        this.id = null;
        this.text = "";
        this.data = null;
        this.children = new ArrayList<AbstractTree<DataType, IDType>>();
    }

    protected abstract AbstractTree<DataType, IDType> createChild(DataType data);

    public abstract String getText();

    public abstract IDType getId();

    public List<AbstractTree<DataType, IDType>> getChildren() {
        return this.children;
    }

    protected abstract IDType getDataId(DataType data);

    protected abstract IDType getDataPid(DataType data);

    protected abstract boolean isEqual(IDType id1, IDType id2);

    /**
     * 过滤树节点（或称标记树节点选中状态）
     * 
     * @param ids
     *            被选中的节点ID列表
     * @param forceChecked
     *            是否强制选中
     * 
     * @author Teon
     */
    private void filter(List<IDType> ids, boolean forceChecked) {

        boolean find = false;
        boolean allChecked = true, allUnchecked = true;

        /* 当前节点被标记为强制选中 */
        if (forceChecked)
            find = true;
        /* 判断当前节点是否被选中 */
        else
            for (IDType id : ids) {
                if (this.id == null) {
                    if (id == null) {
                        find = true;
                        break;
                    }
                } else if (this.id.equals(id)) {
                    find = true;
                    break;
                }
            }

        /* 若当前节点被选中则子节点被选中 */
        if (this.children != null && !this.children.isEmpty()) {
            if (find) {
                for (AbstractTree<DataType, IDType> child : this.children)
                    child.filter(ids, true);
                allUnchecked = false;
            }
            /* 若当期那节点未被选中，则需根据子节点的选中状态计算当前节点的选中状态 */
            else
                for (AbstractTree<DataType, IDType> child : this.children) {
                    child.filter(ids);
                    if (!UNCHECKED.equals(child.checked))
                        allUnchecked = false;
                    else if (!CHECKED.equals(child.checked))
                        allChecked = false;
                }
        } else {
            allChecked = find;
            allUnchecked = !find;
        }

        /* 计算当前节点选中状态 */
        if (allChecked)
            this.checked = CHECKED;
        else if (allUnchecked)
            this.checked = UNCHECKED;
        else
            this.checked = HALF_CHECKED;

    }

    public void filter(List<IDType> ids) {

        this.filter(ids, false);

    }

    public AbstractTree<DataType, IDType> removeUnchecked() {
        if (CHECKED.equals(this.checked) || HALF_CHECKED.equals(this.checked)) {
            if (this.children != null) {
                List<AbstractTree<DataType, IDType>> newChildren = new ArrayList<AbstractTree<DataType, IDType>>();
                for (AbstractTree<DataType, IDType> child : children) {
                    AbstractTree<DataType, IDType> newChild = child
                            .removeUnchecked();
                    if (newChild != null)
                        newChildren.add(newChild);
                }
                this.children = newChildren;
            }
            return this;
        } else {
            return null;
        }
    }

    public void setData(DataType data) {
        this.data = data;
        this.id = getId();
        this.text = getText();
    }

    /**
     * 转换为Map形式
     * 
     * @param removeUnchecked
     *            是否移除未选中节点
     * @param hookData
     *            是否挂载数据树形
     * @return Map形式数据
     * 
     * @author Teon
     */
    public Map<String, Object> toMap(boolean removeUnchecked, boolean hookData) {

        if (removeUnchecked && UNCHECKED.equals(this.checked))
            return null;

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("id", id);
        map.put("text", text);
        map.put("checked", checked);
        if (hookData)
            map.put("data", data);

        List<Map<?, ?>> list = new ArrayList<Map<?, ?>>();
        if (this.children != null)
            for (AbstractTree<DataType, IDType> child : this.children) {
                Map<String, Object> submap = child.toMap(removeUnchecked,
                        hookData);
                if (submap != null)
                    list.add(submap);
            }
        map.put("children", list);

        return map;

    }
    
    public String testMethod(String a) {
    	String aa = "22222222222";
    	return aa;
    }
    
    /**
     * 转换为Map形式
     * 
     * @param removeUnchecked
     *            是否移除未选中节点
     * @return Map形式数据
     * 
     * @author Teon
     */
    public Map<String, Object> toMap(boolean removeUnchecked) {

        return toMap(removeUnchecked, false);

    }

    /**
     * 转为Map形式
     * 
     * @return Map形式数据
     * 
     * @author Teon
     */
    public Map<String, Object> toMap() {
        return toMap(false);
    }

    /**
     * 创建子节点树列表
     * 
     * @param parentId
     *            父节点ID
     * @param candidates
     *            组织结构数据候选项
     * @return 子节点树列表
     * 
     * @author Teon
     * @throws IllegalAccessException
     * @throws InstantiationException
     */
    private List<AbstractTree<DataType, IDType>> makeChildren(IDType parentId,
            List<DataType> candidates) {

        List<AbstractTree<DataType, IDType>> list = new ArrayList<AbstractTree<DataType, IDType>>();

        for (int i = 0; i < candidates.size(); i++) {

            DataType candidate = candidates.get(i);
            IDType pid = getDataPid(candidate);

            if (isEqual(parentId, pid)) {

                AbstractTree<DataType, IDType> item = createChild(candidate);

                IDType id = getDataId(candidate);
                List<AbstractTree<DataType, IDType>> children = this
                        .makeChildren(id, candidates);
                item.children = children;

                list.add(item);

            }
        }

        return list;

    }

    /**
     * 根据组织结构候选项建立一棵树
     * 
     * @param candidates
     *            组织结构数据候选项
     * 
     * @author Teon
     * @throws IllegalAccessException
     * @throws InstantiationException
     */
    public void makeTree(IDType rootId, List<DataType> candidates) {
        this.children = makeChildren(rootId, candidates);
    }

    /**
     * 形成树形结构的Map列表。
     * 
     * 本方法提供向文字增加前缀功能，每个节点将根据其层级增加相应的前缀，层级越大，增加的前缀也多。
     * 
     * @param level
     *            当前的层级
     * @param prefix
     *            前缀。
     * @return 树形结构的Map列表
     * 
     * @author Teon
     */
    private List<Map<String, Object>> toMapList(int level, String prefix) {

        String preText = "";
        for (int i = 0; i < level; i++)
            preText = preText + prefix;
        this.text = preText + this.text;

        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        list.add(this.toMap());

        if (children != null && children.size() > 0)
            for (int i = 0; i < this.children.size(); i++) {
                AbstractTree<DataType, IDType> child = children.get(i);
                List<Map<String, Object>> sublist = child.toMapList(level + 1,
                        prefix);
                list.addAll(sublist);
            }
        return list;

    }

    /**
     * 形成树形结构的Map列表。
     * 
     * 本方法提供向文字增加前缀功能，每个节点将根据其层级增加相应的前缀，层级越大，增加的前缀也多。
     * 
     * @param prefix
     *            前缀。
     * @return 树形结构的Map列表
     * 
     * @author Teon
     */
    public List<Map<String, Object>> toMapList(String prefix) {
        return this.toMapList(0, prefix);
    }

}
