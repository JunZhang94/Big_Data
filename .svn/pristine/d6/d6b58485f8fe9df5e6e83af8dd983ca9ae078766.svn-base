package com.jp.tic.utils.excel;

import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

import com.google.common.collect.Lists;
import com.jp.tic.utils.lang.StringUtil;

/**
 * Excel导出工具类
 * User: 梁石光
 * Date: 2013-5-30
 */
public class ExcelUtils {
    /**
     * 创建表头
     *
     * @param workbook
     * @param sheet
     * @param exportSetInfo
     */
    public static void createHeader(Workbook workbook, Sheet sheet, ExportSetInfo exportSetInfo) {
        //从导出设置对象中获取表头
        String[] headNames = exportSetInfo.getHeadNames();

        CellStyle cellStyle = workbook.createCellStyle();
        Font font = workbook.createFont();

        createCellStyle(cellStyle, HSSFCellStyle.BORDER_THIN);
        createFont(font, cellStyle, Font.BOLDWEIGHT_BOLD, (short) 280);

        Row row = sheet.getRow(0);
        for (int i = 0; i < headNames.length; i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(headNames[i]);
            cell.setCellStyle(cellStyle);
        }
    }

    /**
     * 创建表格体
     *
     * @param workbook
     * @param exportSetInfo
     */
    public static void createBody(Workbook workbook, ExportSetInfo exportSetInfo) {

        List list = exportSetInfo.getDataList();
        String title = exportSetInfo.getTitle();
        String[] headNames = exportSetInfo.getHeadNames();
        int sheetSize = exportSetInfo.getSheetSize();

        CellStyle cellStyle = workbook.createCellStyle();
        Font font = workbook.createFont();

        createCellStyle(cellStyle, CellStyle.BORDER_DOTTED);
        createFont(font, cellStyle, Font.BOLDWEIGHT_NORMAL, (short) 250);

        List subLists = Lists.partition(list, sheetSize);

        for (int i = 0; i < subLists.size(); i++) {
            List lis = (List)subLists.get(i);

            //每页记录开始和结束行
            int start = i * sheetSize + 1, end = i * sheetSize + lis.size();

            Sheet sheet = workbook.createSheet(title + (i + 1) + " (" + start + "~" + end + ")");
            sheet.createFreezePane(0,1);

            Row headRow = sheet.createRow(0);
            headRow.setHeightInPoints(20f);
            createHeader(workbook, sheet, exportSetInfo);

            for (int j = 0, n = lis.size(); j < n; j++) {
                Row row = sheet.createRow(j + 1);
                row.setHeightInPoints(18.75f);

                Map<String, Object> map = (Map) list.get(j);
                int index = 0;
                for (Map.Entry<String, Object> m : map.entrySet()) {
                    Cell cell = row.createCell(index);
                    cell.setCellValue(StringUtil.toString(m.getValue()));
                    cell.setCellStyle(cellStyle);
                    index++;
                }
            }

            for (int j = 0, n = headNames.length; j < n; j++) {
                sheet.autoSizeColumn(j, true);
            }
        }
    }

    /**
     * 创建样式
     *
     * @param cellStyle
     * @param border
     */
    public static void createCellStyle(CellStyle cellStyle, short border) {
        cellStyle.setAlignment(CellStyle.ALIGN_CENTER);
        cellStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);

        cellStyle.setBorderLeft(border);
        cellStyle.setBorderRight(border);
        cellStyle.setBorderTop(border);
        cellStyle.setBorderBottom(border);
    }

    /**
     * 创建字体
     *
     * @param font
     * @param cellStyle
     * @param boldweight
     * @param fontHeight
     */
    public static void createFont(Font font, CellStyle cellStyle, short boldweight, short fontHeight) {
        font.setBoldweight(boldweight);
        font.setFontName("宋体");
        font.setFontHeight(fontHeight);
        cellStyle.setFont(font);
    }
}
