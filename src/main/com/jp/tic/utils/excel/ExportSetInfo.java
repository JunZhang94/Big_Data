package com.jp.tic.utils.excel;

import java.io.OutputStream;
import java.util.List;

/**
 * 导出设置信息
 * User: 梁石光
 * Date: 2013-5-30
 */
public class ExportSetInfo {
    private List dataList;
    private String title;
    private String[] headNames;
    private int sheetSize;
    private OutputStream out;

    public List getDataList() {
        return dataList;
    }

    public void setDataList(List dataList) {
        this.dataList = dataList;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String[] getHeadNames() {
        return headNames;
    }

    public void setHeadNames(String[] headNames) {
        this.headNames = headNames;
    }

    public int getSheetSize() {
        return sheetSize;
    }

    public void setSheetSize(int sheetSize) {
        this.sheetSize = sheetSize;
    }

    public OutputStream getOut() {
        return out;
    }

    public void setOut(OutputStream out) {
        this.out = out;
    }
}
