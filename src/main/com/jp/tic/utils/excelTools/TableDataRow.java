package com.jp.tic.utils.excelTools;

import java.math.BigDecimal;
import java.util.LinkedList;
import java.util.List;

/**
 * @Author: 梁石光
 * @Date: 13-5-30
 */
public class TableDataRow {
    private LinkedList<TableDataCell> cells;

    private TableData table;

    private int rowStyle = TableData.STYLE_TYPE_STRING;

    public void addCell(TableDataCell cell) {
        cells.add(cell);
    }

    public void addCell(String value) {
        TableDataCell cell = new TableDataCell(this);
        cell.setValue(value);
        cell.setCellStyle(rowStyle);
        addCell(cell);
    }

    public void addCell(Integer value) {
        TableDataCell cell = new TableDataCell(this);
        cell.setValue(value);
        cell.setCellStyle(rowStyle);
        addCell(cell);
    }

    public void addCell(Double value) {
        TableDataCell cell = new TableDataCell(this);
        cell.setValue(value);
        cell.setCellStyle(rowStyle);
        addCell(cell);
    }

    public void addCell(Object value) {
        if (value instanceof String) {
            addCell((String) value);
        } else if (value instanceof Integer) {
            addCell((Integer) value);
        } else if (value instanceof Double) {
            addCell((Double) value);
        } else if (value instanceof BigDecimal) {
            addCell(value.toString());
        } else if (value instanceof Long) {
            addCell(value.toString());
        } else if(value == null){
            addCell("");
        }
    }

    public TableDataCell getCellAt(int index) {
        return cells.get(index);
    }

    public List<TableDataCell> getCells() {
        return cells;
    }

    public TableData getTable() {
        return table;
    }

    public TableDataRow(TableData table) {
        cells = new LinkedList<TableDataCell>();
        this.table = table;
    }

    public void setRowStyle(int rowStyle) {
        this.rowStyle = rowStyle;
    }

    public int getRowStyle() {
        return rowStyle;
    }
}
