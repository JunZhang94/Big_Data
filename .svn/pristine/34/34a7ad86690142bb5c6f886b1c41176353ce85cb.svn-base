/*
 * 文件名：JsGridReportBase.java
 * 版权：
 * 描述：
 * 修改人：
 * 修改时间：
 * 修改内容：
 */
package com.jp.tic.utils.excelTools;

import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.util.CellRangeAddress;

import com.jp.tic.utils.lang.StringUtil;


/**
 * @Author: 梁石光
 * @Date: 13-5-30
 */
public class BaseExport {
	public SimpleDateFormat timeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	private HttpServletResponse response;

	private HttpSession session;

	private ServletOutputStream out;

	public BaseExport() {

	}

	public BaseExport(HttpServletRequest request, HttpServletResponse response) throws Exception {
		this.response = response;
		session = request.getSession();
		init(this.session);
	}

	private void init(HttpSession session) throws Exception {
		out = response.getOutputStream();
	}

	/**
	 * 停止分组
	 * @param
	 * @return void
	 */
	private void stopGrouping(HSSFSheet sheet, HashMap<Integer, String> word, HashMap<Integer, Integer> counter, int i,
			int size, int rownum, HSSFCellStyle style) {
		String w = word.get(i);
		if (w != null) {
			int len = counter.get(i);
			CellRangeAddress address = new CellRangeAddress(rownum - len, rownum - 1, i, i);
			sheet.addMergedRegion(address);
			fillMergedRegion(sheet, address, style);
			word.remove(i);
			counter.remove(i);
		}
		if (i + 1 < size) {
			stopGrouping(sheet, word, counter, i + 1, size, rownum, style);
		}
	}

	/**
	 * 生成列
	 * @param
	 * @return void
	 */
	private void generateColumn(HSSFSheet sheet, TableColumn tc, int maxlevel, int rownum, int colnum,
			HSSFCellStyle headerstyle) {
		HSSFRow row = sheet.getRow(rownum);
		if (row == null)
			row = sheet.createRow(rownum);

		HSSFCell cell = row.createCell(colnum);
		cell.setCellValue(tc.getDisplay());

		if (headerstyle != null)
			cell.setCellStyle(headerstyle);
		if (tc.isComplex()) {
			CellRangeAddress address = new CellRangeAddress(rownum, rownum, colnum, colnum + tc.getLength() - 1);
			sheet.addMergedRegion(address);
			fillMergedRegion(sheet, address, headerstyle);

			int cn = colnum;
			for (int i = 0; i < tc.getChildren().size(); i++) {
				if (i != 0) {
					cn = cn + tc.getChildren().get(i - 1).getLength();
				}
				generateColumn(sheet, tc.getChildren().get(i), maxlevel, rownum + 1, cn, headerstyle);
			}
		} else {
			CellRangeAddress address = new CellRangeAddress(rownum, rownum + maxlevel - tc.level, colnum, colnum);
			sheet.addMergedRegion(address);
			fillMergedRegion(sheet, address, headerstyle);
		}
		sheet.autoSizeColumn(colnum, true);
	}

	/**
	 * 填充合并
	 * @param
	 * @return void
	 */
	private void fillMergedRegion(HSSFSheet sheet, CellRangeAddress address, HSSFCellStyle style) {
		for (int i = address.getFirstRow(); i <= address.getLastRow(); i++) {
			HSSFRow row = sheet.getRow(i);
			if (row == null)
				row = sheet.createRow(i);
			for (int j = address.getFirstColumn(); j <= address.getLastColumn(); j++) {
				HSSFCell cell = row.getCell(j);
				if (cell == null) {
					cell = row.createCell(j);
					if (style != null)
						cell.setCellStyle(style);
				}
			}
		}
	}

	/**
	 * 写入工作表
	 * @param wb Excel工作簿
	 * @param title Sheet工作表名称
	 * @param styles 表头样式
	 * @param creator 创建人
	 * @param tableData 表格数据
	 * @throws Exception
	 */
	public HSSFWorkbook writeSheet(HSSFWorkbook wb, String title, HashMap<String, HSSFCellStyle> styles,
			String creator, TableData tableData) throws Exception {

		SimpleDateFormat formater = new SimpleDateFormat("yyyy年MM月dd日 HH时mm分");
		String create_time = formater.format(new Date());

		HSSFSheet sheet = wb.createSheet(title);// 在Excel工作簿中建一工作表
		sheet.setDisplayGridlines(false);// 设置表标题是否有表格边框

		HSSFRow row = sheet.createRow(0);// 创建新行
		HSSFCell cell = row.createCell(0);// 创建新列
		int rownum = 0;
		cell.setCellValue(new HSSFRichTextString(title));
		HSSFCellStyle style = styles.get("TITLE");
		if (style != null)
			cell.setCellStyle(style);

		TableHeaderMetaData headerMetaData = tableData.getTableHeader();// 获得HTML的表头元素
		sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, headerMetaData.getColumnCount() - 1));
		row = sheet.createRow(1);

		cell = row.createCell(0);
		cell.setCellValue(new HSSFRichTextString("创建人:"));
		style = styles.get("SUB_TITLE");
		if (style != null)
			cell.setCellStyle(style);

		cell = row.createCell(1);
		cell.setCellValue(new HSSFRichTextString(creator));
		style = styles.get("SUB_TITLE2");
		if (style != null)
			cell.setCellStyle(style);

		cell = row.createCell(2);
		cell.setCellValue(new HSSFRichTextString("创建时间:"));
		style = styles.get("SUB_TITLE");
		if (style != null)
			cell.setCellStyle(style);

		cell = row.createCell(3);
		style = styles.get("SUB_TITLE2");
		cell.setCellValue(new HSSFRichTextString(create_time));
		if (style != null)
			cell.setCellStyle(style);

		rownum = 1;// 如果rownum = 1，则去掉创建人、创建时间等副标题

		HSSFCellStyle headerstyle = styles.get("TABLE_HEADER");

		int colnum = 0;
		for (int i = 0; i < headerMetaData.getOriginColumns().size(); i++) {
			TableColumn tc = headerMetaData.getOriginColumns().get(i);
			if (i != 0) {
				colnum += headerMetaData.getOriginColumns().get(i - 1).getLength();
			}
			generateColumn(sheet, tc, headerMetaData.maxlevel, rownum, colnum, headerstyle);
		}
		rownum += headerMetaData.maxlevel;

		List<TableDataRow> dataRows = tableData.getRows();

		HashMap<Integer, Integer> counter = new HashMap<Integer, Integer>();
		HashMap<Integer, String> word = new HashMap<Integer, String>();
		int index = 0;
		if (dataRows != null && dataRows.size() > 0) {
			for (TableDataRow dataRow : dataRows) {
				row = sheet.createRow(rownum);

				List<TableDataCell> dataCells = dataRow.getCells();
				int size = headerMetaData.getColumns().size();
				index = -1;
				for (int i = 0; i < size; i++) {
					TableColumn tc = headerMetaData.getColumns().get(i);
					if (!tc.isVisible())
						continue;
					index++;

					String value = dataCells.get(i).getValue();
					if (tc.isGrouped()) {
						String w = word.get(index);
						if (w == null) {
							word.put(index, value);
							counter.put(index, 1);
							createCell(row, tc, dataCells, i, index, styles);
						} else {
							if (w.equals(value)) {
								counter.put(index, counter.get(index) + 1);
							} else {
								stopGrouping(sheet, word, counter, index, size, rownum, styles.get("STRING"));

								word.put(index, value);
								counter.put(index, 1);
								createCell(row, tc, dataCells, i, index, styles);
							}
						}
					} else {
						createCell(row, tc, dataCells, i, index, styles);
					}
				}
				rownum++;
			}
			// 设置前两列根据数据自动列宽
			for (int c = 0; c <= headerMetaData.getColumns().size(); c++) {
				sheet.autoSizeColumn((short) c, true);
			}
		}

		stopGrouping(sheet, word, counter, 0, index, rownum, styles.get("STRING"));
		sheet.setGridsPrinted(true);

		return wb;
	}

	/**
	 * 导出Excel(多工作表)
	 *
	 * @param title 文件名
	 * @param creator 创建人
	 * @param tableDataLst 各工作格数据(注意：每个tableData要设置sheet名称，否则按默认呈现)
	 * @return void
	 */
	public void exportToExcel(String title, String creator, List<TableData> tableDataLst, InputStream modulePath,TableHeaderMetaData excelHeader)
			throws Exception {

		if (!StringUtil.checkObj(title))
			title = StringUtil.getNowTimeNoFormat();

		HSSFWorkbook wb = new HSSFWorkbook();// 创建新的Excel 工作簿
		HashMap<String, HSSFCellStyle> styles = initStyles(wb, modulePath);// 初始化表头样式

		int i = 1;
		if (tableDataLst != null && tableDataLst.size() > 0) {
			for (TableData tableData : tableDataLst) {
				String sheetTitle = tableData.getSheetTitle();
				sheetTitle = sheetTitle == null || sheetTitle.equals("") ? "Sheet" + i : sheetTitle;
				wb = writeSheet(wb, tableData.getSheetTitle(), styles, creator, tableData);//写入工作表
				i++;
			}
		}else{
			TableData tableData = new TableData();
			tableData.setHeader(excelHeader);
			wb = writeSheet(wb, title, styles, creator, tableData);//写入工作表
		}

		String sFileName = title + ".xls";
		response.setHeader("Content-Disposition", "attachment;filename=".concat(String.valueOf(URLEncoder.encode(
				sFileName, "UTF-8"))));
		response.setHeader("Connection", "close");
		response.setHeader("Content-Type", "application/vnd.ms-excel");

		wb.write(response.getOutputStream());
	}

	/**
	 * 创建单元格（带隔行背景色）
	 *
	 * @param
	 * @return void
	 */
	private void createCell(HSSFRow row, TableColumn tc, List<TableDataCell> data, int i, int index,
			HashMap<String, HSSFCellStyle> styles) {
		TableDataCell dc = data.get(i);
		HSSFCell cell = row.createCell(index);
		switch (tc.getColumnType()) {
		case TableColumn.COLUMN_TYPE_INTEGER:
			cell.setCellValue(dc.getIntValue());
			HSSFCellStyle style = styles.get("INT");
			if (row.getRowNum() % 2 != 0)
				style = styles.get("INT_C");
			if (style != null)
				cell.setCellStyle(style);
			break;
		case TableColumn.COLUMN_TYPE_FLOAT_2:
			cell.setCellValue(dc.getDoubleValue());
			style = styles.get("D2");
			if (row.getRowNum() % 2 != 0)
				style = styles.get("D2_C");
			if (style != null)
				cell.setCellStyle(style);
			break;
		case TableColumn.COLUMN_TYPE_FLOAT_3:
			cell.setCellValue(dc.getDoubleValue());
			style = styles.get("D3");
			if (row.getRowNum() % 2 != 0)
				style = styles.get("D3_C");
			if (style != null)
				cell.setCellStyle(style);
			break;
		case TableColumn.COLUMN_TYPE_RED_BG:
			cell.setCellValue(dc.getValue());
			style = styles.get("RED_BG");
			if (style != null)
				cell.setCellStyle(style);
			break;
		case TableColumn.COLUMN_TYPE_YELLOW_BG:
			cell.setCellValue(dc.getValue());
			style = styles.get("YELLOW_BG");
			if (style != null)
				cell.setCellStyle(style);
			break;
		case TableColumn.COLUMN_TYPE_GREEN_BG:
			cell.setCellValue(dc.getValue());
			style = styles.get("GREEN_BG");
			if (style != null)
				cell.setCellStyle(style);
			break;
		default:
			if (dc.getValue().equalsIgnoreCase("&nbsp;"))
				cell.setCellValue("");
			else
				cell.setCellValue(dc.getValue());
			style = styles.get("STRING");
			if (row.getRowNum() % 2 != 0)
				style = styles.get("STRING_C");
			if (style != null)
				cell.setCellStyle(style);
		}
	}

	/**
	 * 初始化表格样式
	 *
	 * @param
	 * @return HashMap<String,HSSFCellStyle>
	 */
	public HashMap<String, HSSFCellStyle> initStyles(HSSFWorkbook wb, InputStream modulePath) {
		HashMap<String, HSSFCellStyle> ret = new HashMap<String, HSSFCellStyle>();
		try {
			POIFSFileSystem fs = new POIFSFileSystem(modulePath);

			HSSFWorkbook src = new HSSFWorkbook(fs);
			HSSFSheet sheet = src.getSheetAt(0);

			buildStyle(wb, src, sheet, 0, ret, "TITLE");
			buildStyle(wb, src, sheet, 1, ret, "SUB_TITLE");
			buildStyle(wb, src, sheet, 2, ret, "SUB_TITLE2");

			buildStyle(wb, src, sheet, 4, ret, "TABLE_HEADER");
			buildStyle(wb, src, sheet, 5, ret, "STRING");
			buildStyle(wb, src, sheet, 6, ret, "INT");
			buildStyle(wb, src, sheet, 7, ret, "D2");
			buildStyle(wb, src, sheet, 8, ret, "D3");

			buildStyle(wb, src, sheet, 10, ret, "STRING_C");
			buildStyle(wb, src, sheet, 11, ret, "INT_C");
			buildStyle(wb, src, sheet, 12, ret, "D2_C");
			buildStyle(wb, src, sheet, 13, ret, "D3_C");

			buildStyle(wb, src, sheet, 15, ret, "RED_BG");
			buildStyle(wb, src, sheet, 16, ret, "YELLOW_BG");
			buildStyle(wb, src, sheet, 17, ret, "GREEN_BG");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ret;
	}

	/**
	 * 构建样式
	 * @param wb 工作薄
	 * @param src
	 * @param sheet
	 * @param index
	 * @param ret
	 * @param key
	 */
	private void buildStyle(HSSFWorkbook wb, HSSFWorkbook src, HSSFSheet sheet, int index,
			HashMap<String, HSSFCellStyle> ret, String key) {
		HSSFRow row = sheet.getRow(index);
		HSSFCell cell = row.getCell(1);
		HSSFCellStyle nstyle = wb.createCellStyle();
		ExcelUtils.copyCellStyle(wb, nstyle, src, cell.getCellStyle());
		ret.put(key, nstyle);
	}

	/**
	 * 工具方法，将一个字符串转换为UTF-8编码
	 *
	 * @param string 需要转换的字符串
	 * @return String 转换后的UTF-8字符串
	 */
	protected String getUTF8String(String string) {
		if (string == null) {
			return null;
		} else {
			try {
				String str = new String(string.getBytes("ISO8859-1"), "UTF-8");
				return str;
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
				return string;
			}
		}
	}

	/**
	 * 工具方法，将一个字符串转换为GBK编码
	 *
	 * @param string 需要转换的字符串
	 * @return String 转换后的GBK字符串
	 */
	protected String getGBKString(String string) {
		if (string == null) {
			return null;
		} else {
			try {
				String str = new String(string.getBytes("ISO8859-1"), "GBK");
				return str;
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
				return string;
			}
		}
	}

	/**
	 * 单元格值为空处理
	 *
	 * @param value 单元格值
	 * @return String 如果单元格值为空，则返回"&nbsp;"，否则返回原值
	 */
	public String fieldRender(String value) {
		if (value == null) {
			return "&nbsp;";
		} else {
			return value;
		}
	}

}
