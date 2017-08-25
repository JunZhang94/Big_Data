package com.jp.tic.system.service.impl;

import java.io.OutputStream;
import java.text.DecimalFormat;
import java.util.List;
import java.util.Map;

import jxl.Workbook;
import jxl.format.Border;
import jxl.format.BorderLineStyle;
import jxl.format.Colour;
import jxl.format.UnderlineStyle;
import jxl.write.Label;
import jxl.write.NumberFormats;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.entity.EnumItem;
import com.jp.tic.system.service.BusinessExportService;
import com.jp.tic.system.service.DictionaryService;
import com.jp.tic.utils.exception.ExportFailedException;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;

@SuppressWarnings("unchecked")
@Service("businessExportService")
public class BusinessExportServiceImpl implements BusinessExportService {
	
	@Autowired
	DictionaryService dictionaryService;
	
	protected Logger logger = LoggerFactory.getLogger(getClass());
	
	@Override
    public void process(WritableSheet sheet, List data, String[] texts, int[] widths, Object[] dataSource) throws Exception {
        setSheetContent(data, sheet, texts, widths, dataSource);
    }
	
	 /**
     * 输出用户信息成为Excel格式
     * @param drecords
     * @return
     * @throws ExportFailedException
     * @author lsg
     */
    public OutputStream outputToExcel(List<Map<String,String>> records, OutputStream stream, String[] texts, int[] widths, Object[] dataSource)
            throws ExportFailedException {
        //FileOutputStream stream = new FileOutputStream();
        try {
            /* 创建Excel、创建工作簿 */
            WritableWorkbook wb = Workbook.createWorkbook(stream);
            WritableSheet sheet = wb.createSheet("data", 0);
            //添加导出内容
            setSheetContent(records, sheet, texts, widths, dataSource);
            wb.write();
            wb.close();
            stream.close();
        } catch (Exception e) {
            logger.warn(e.getMessage(), e);
            throw new ExportFailedException();
        }
        return stream;
    }
    
    
    /**
     * 添加导出内容
     * @param records
     * @param sheet
     * @throws WriteException
     * @throws RowsExceededException
     * @author lsg
     */
    private void setSheetContent(List<Map<String,String>> records, WritableSheet sheet, String[] texts, int[] widths, Object[] dataSource)
            throws WriteException, RowsExceededException {
        Label label = null;
        /* 写入标题 */
        {
            /* 设定单元格格式 */
            WritableFont font = new WritableFont(WritableFont.ARIAL, 11,
                    WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE,
                    Colour.BLACK);
            WritableCellFormat format = new WritableCellFormat(font,
                    NumberFormats.TEXT);
            format.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);

            /* 写入标题 */
            for (int i = 0; i < texts.length; i++) {
                int col = i;// 列
                int row = 0;// 行
                sheet.setColumnView(col, widths[i]);
                label = new Label(col, row, texts[i], format);
                sheet.addCell(label);
            }
        }

        /* 逐次写入数据 */
        if (records != null && records.size() > 0) {

            /* 设定单元格格式 */
            WritableFont font = new WritableFont(WritableFont.ARIAL, 10,
                    WritableFont.NO_BOLD, false,
                    UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
            WritableCellFormat format = new WritableCellFormat(font,
                    NumberFormats.TEXT);
            format.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
            /* 写入用户数据 */
            for (int i = 0; i < records.size(); i++) {
                for (int t = 0; t < ((Object[])dataSource[i]).length; t++) {
                    int col = t; // 列
                    int row = i + 1; // 行
                    label = new Label(col, row, ((Object[])dataSource[i])[t] == null ? ""
                            :((Object[])dataSource[i])[t].toString(), format);
                    sheet.addCell(label);
                }
            }
        }
    }
    
    /**
     * 获取到了对应的字典code对应的集合后，再根据值来获取对应的中文名称
     * @param list code对应的集合
     * @param value 值
     * @return 处理结果
     */
    public String findDictionaryName(List<EnumItem> list, String value) {
    	String dicName = "";
    	if (!StringUtil.checkStr(value)) {
    		return dicName;
    	}
    	if (list != null && list.size() > 0) {
			for (EnumItem en : list) {
				if (StringUtil.equals(en.getItemValue(), value)) {
					dicName = en.getItemName();
				}
			}
    	}
    	return dicName;
	}
    
    /**
	 * 封装布控告警导出的数据
	 * @param records 查询记录
	 * @return 处理结果
	 */
	public Object[] exportAlarmDataSource(List<Map<String, String>> records) {
		List<EnumItem> carNumColorlist = dictionaryService.getEnumListByCode("LicPlateColor"); //车牌颜色
        List<EnumItem> carTypelist = dictionaryService.getEnumListByCode("CarType"); //车辆类型
        List<EnumItem> alertTypelist = dictionaryService.getEnumListByCode("AlertType"); //告警类型
        List<EnumItem> verfiyMarklist = dictionaryService.getEnumListByCode("VerfiyMark"); //处理状态
        Object[] textDatas = new Object[records.size()];
        Object[] texts = null;
        /* 写入用户数据 */
        for (int i = 0; i < records.size(); i++) {
        	texts = new Object[]{
                "NULL".equals(records.get(i).get("HPHM"))?"无":records.get(i).get("HPHM"),
        		findDictionaryName(carNumColorlist, records.get(i).get("HPYS")),
                !StringUtil.checkStr(records.get(i).get("CWHPHM"))?"无" : records.get(i).get("CWHPHM"),
        		findDictionaryName(carNumColorlist, records.get(i).get("CWHPYS")),
                !StringUtil.checkStr(records.get(i).get("HPYZ"))?"" : records.get(i).get("HPYZ"),
        		!StringUtil.checkStr(records.get(i).get("JGSK"))?"" : records.get(i).get("JGSK").substring(0, records.get(i).get("JGSK").lastIndexOf(".")),
				!StringUtil.checkStr(records.get(i).get("FXBH"))?"" : records.get(i).get("FXBH"),
				findDictionaryName(carTypelist, records.get(i).get("CLLX")),
                !StringUtil.checkStr(records.get(i).get("CLSD"))?"" : records.get(i).get("CLSD"),
        		!StringUtil.checkStr(records.get(i).get("BJDD"))?"" : records.get(i).get("BJDD"),
				findDictionaryName(alertTypelist, records.get(i).get("BJLX")),
				findDictionaryName(verfiyMarklist, records.get(i).get("CLBJ")),
                !StringUtil.checkStr(records.get(i).get("QSBJ"))?"" : records.get(i).get("QSBJ")
        	};
        	textDatas[i] = texts;
        }
        return textDatas;
	}
	
	
	/**
	 * 封装历史过车导出的数据
	 * @param records 查询记录
	 * @return 处理结果
	 */
	public Object[] exportHistoryDataSource(List<Map<String, String>> records) {
        Object[] textDatas = new Object[records.size()];
        //数据格式化
        DecimalFormat df = new DecimalFormat("#.00");
        Object[] texts = null;
        /* 写入用户数据 */
        for (int i = 0; i < records.size(); i++) {
        	texts = new Object[]{
                "NULL".equals(records.get(i).get("HPHM"))?"无":records.get(i).get("HPHM"),
                records.get(i).get("HPYSMC"),
        		df.format(Double.valueOf((records.get(i).get("CLSD") == null || records.get(i).get("CLSD") == "") ? "0" : records.get(i).get("CLSD"))),
        		records.get(i).get("KKMC"),
        		records.get(i).get("FXMC"),
        		records.get(i).get("DWMC"),
        		DateUtil.parseToString(records.get(i).get("JGSJ"), "yyyy-MM-dd HH:mm:ss"),
        		records.get(i).get("tx1")
        	};
        	textDatas[i] = texts;
        }
        return textDatas;
	}
	
	 /**
	 * 封装布控导出的数据
	 * @param records 查询记录
	 * @return 处理结果
	 */
	public Object[] exportControlDataSource(List<Map<String, String>> records) {
		List<EnumItem> carTypelist = dictionaryService.getEnumListByCode("CarType"); //车辆类型
		List<EnumItem> carNumColorlist = dictionaryService.getEnumListByCode("LicPlateColor"); //车牌颜色
        List<EnumItem> controlLevellist = dictionaryService.getEnumListByCode("ControlLevel"); //布控等级
        List<EnumItem> controlTypelist = dictionaryService.getEnumListByCode("ControlType"); //布控类型
        List<EnumItem> controlStatelist = dictionaryService.getEnumListByCode("ControlState"); //布控状态
        List<EnumItem> approvalStatelist = dictionaryService.getEnumListByCode("ApprovalState"); //审核状态
        Object[] textDatas = new Object[records.size()];
        Object[] texts = null;
        /* 写入用户数据 */
        for (int i = 0; i < records.size(); i++) {
        	texts = new Object[] {
                "NULL".equals(records.get(i).get("HPHM"))?"无":records.get(i).get("HPHM"),
        		findDictionaryName(carTypelist, records.get(i).get("CLLX")),
        		findDictionaryName(carNumColorlist, records.get(i).get("HPYS")),
        		findDictionaryName(controlLevellist, records.get(i).get("BKJB")),
        		findDictionaryName(controlTypelist, records.get(i).get("BKLB")),
        		findDictionaryName(controlStatelist, records.get(i).get("BKZT")),
        		findDictionaryName(approvalStatelist, records.get(i).get("SHZT")),
                !StringUtil.checkStr(records.get(i).get("BKSK"))?"" : records.get(i).get("BKSK").substring(0,records.get(i).get("BKSK").lastIndexOf(".")),
        		!StringUtil.checkStr(records.get(i).get("BKLEN"))?"" : records.get(i).get("BKLEN").substring(0, records.get(i).get("BKLEN").lastIndexOf(".")),
				!StringUtil.checkStr(records.get(i).get("BKDW"))?"" : records.get(i).get("BKDW"),
                !StringUtil.checkStr(records.get(i).get("BKR"))?"" : records.get(i).get("BKR")
        	};
        	textDatas[i] = texts;
        }
        return textDatas;
	}
	
	 /**
	 * 封装字典导出的数据
	 * @param records 查询记录
	 * @return 处理结果
	 */
	public Object[] exportDictionaryDataSource(List<Map<String, String>> records) {
        Object[] textDatas = new Object[records.size()];
        Object[] texts = null;
        /* 写入用户数据 */
        for (int i = 0; i < records.size(); i++) {
        	texts = new Object[] {
                !StringUtil.checkStr(records.get(i).get("DISPLAYVALUE"))?"" : records.get(i).get("DISPLAYVALUE"),
        		!StringUtil.checkStr(records.get(i).get("SETTINGNAME"))?"" : records.get(i).get("SETTINGNAME"),
				!StringUtil.checkStr(records.get(i).get("STOREVALUE"))?"" : records.get(i).get("STOREVALUE"),
                !StringUtil.checkStr(records.get(i).get("NOTES"))?"" : records.get(i).get("NOTES")
        	};
        	textDatas[i] = texts;
        }
        return textDatas;
	}
	
	/**
	 * 封装数据质量导出的数据
	 * @param records 查询记录
	 * @return 处理结果
	 */
	public Object[] exportDataQualitySource(List<Map<String, String>> records) {
		List<EnumItem> errorTypeList = dictionaryService.getEnumListByCode("ERROR_TYPE"); //错误类型
        List<EnumItem> errorLevelList = dictionaryService.getEnumListByCode("ERROR_LEVEL"); //错误等级
        Object[] textDatas = new Object[records.size()];
        Object[] texts = null;
        /* 写入用户数据 */
        for (int i = 0; i < records.size(); i++) {
        	texts = new Object[] {
    			!StringUtil.checkStr(records.get(i).get("DWMC"))?"" : records.get(i).get("DWMC"),
        		findDictionaryName(errorTypeList, records.get(i).get("ERROR_TYPE")),
        		!StringUtil.checkStr(records.get(i).get("FIELD_NAME"))?"" : records.get(i).get("FIELD_NAME"),
				!StringUtil.checkStr(records.get(i).get("FIELD_VALUE"))?"" : records.get(i).get("FIELD_VALUE"),
				!StringUtil.checkStr(records.get(i).get("VALEID_VALUE"))?"" : records.get(i).get("VALEID_VALUE"),
        		findDictionaryName(errorLevelList, records.get(i).get("ERROR_LEVEL")),
        		!StringUtil.checkStr(records.get(i).get("ERROR_DESC"))?"" : records.get(i).get("ERROR_DESC"),
                !StringUtil.checkStr(records.get(i).get("CREATE_DATE"))?"" : records.get(i).get("CREATE_DATE").substring(0,records.get(i).get("CREATE_DATE").lastIndexOf(".")),
                !StringUtil.checkStr(records.get(i).get("RECIEVER_IP"))?"" : records.get(i).get("RECIEVER_IP")
        	};
        	textDatas[i] = texts;
        }
        return textDatas;
	}
	
	/**
	 * 封装过车频度导出的数据
	 * @param records 查询记录
	 * @return 处理结果
	 */
	public Object[] exportAnalyzeDataSource(List<Map<String, String>> records) {
        Object[] textDatas = new Object[records.size()];
        //数据格式化
        Object[] texts = null;
        /* 写入用户数据 */
        for (int i = 0; i < records.size(); i++) {
        	texts = new Object[]{
                "NULL".equals(records.get(i).get("carNum"))?"无":records.get(i).get("carNum"),
        		records.get(i).get("passTimes")
        	};
        	textDatas[i] = texts;
        }
        return textDatas;
	}
	
	/**
	 * 封装汇聚统计导出的数据
	 * @param records 查询记录
	 * @return 处理结果
	 */
	public Object[] exportStatisticsDataSource(List<Map<String, String>> records) {
        Object[] textDatas = new Object[records.size()];
        //数据格式化
        Object[] texts = null;
        /* 写入用户数据 */
        for (int i = 0; i < records.size(); i++) {
        	texts = new Object[]{
                "NULL".equals(records.get(i).get("KKMC"))?"无":records.get(i).get("KKMC"),
        		records.get(i).get("STATISTICAL_TIME"),
        		records.get(i).get("COUNS"),
        		records.get(i).get("NON_HPHM_COUNS"),
        		records.get(i).get("HPHM_COUNS")
        	};
        	textDatas[i] = texts;
        }
        return textDatas;
	}
	
	/**
	 * 封装汇聚统计按部门导出的数据
	 * @param records 查询记录
	 * @return 处理结果
	 */
	public Object[] exportDeptStatisticsDataSource(List<Map<String, String>> records) {
		Object[] textDatas = new Object[records.size()];
        //数据格式化
        Object[] texts = null;
        /* 写入用户数据 */
        for (int i = 0; i < records.size(); i++) {
        	texts = new Object[]{
                "NULL".equals(records.get(i).get("DWMC"))?"无":records.get(i).get("DWMC"),
        		records.get(i).get("STATISTICAL_TIME"),
        		records.get(i).get("COUNS"),
        		records.get(i).get("NON_HPHM_COUNS"),
        		records.get(i).get("HPHM_COUNS")
        	};
        	textDatas[i] = texts;
        }
        return textDatas;
	}

	@Override
	public Object[] exportAnalyStopCarSource(List<Map<String, String>> records) {
		Object[] textDatas = new Object[records.size()];
        //数据格式化
        Object[] texts = null;
        /* 写入用户数据 */
        for (int i = 0; i < records.size(); i++) {
        	texts = new Object[]{
                "".equals(records.get(i).get("kkmc"))?"无":records.get(i).get("kkmc"),
        		records.get(i).get("startCount"),
        		records.get(i).get("stopCount")
        	};
        	textDatas[i] = texts;
        }
        return textDatas;
	}

	/**
	 * 类似查询同步导出
	 */
	public Object[] exportQueryDataSource(List<CarTake> data) {
		DecimalFormat df = new DecimalFormat("#.00");
        List<EnumItem> carNumColorlist = dictionaryService.getEnumListByCode("LicPlateColor"); //车牌颜色
        Object[] textDatas = new Object[data.size()];
        Object[] texts = null;
        /* 写入用户数据 */
        for (int i = 0; i < data.size(); i++) {
        	texts = new Object[] {
        		"NULL".equals(data.get(i).getHphm())?"无":data.get(i).getHphm(),
        		findDictionaryName(carNumColorlist,data.get(i).getHpys()),
        		data.get(i).getClsd() == null  ? "0" : df.format(data.get(i).getClsd()),
        		data.get(i).getKkmc(),
        		data.get(i).getFxmc(),
        		data.get(i).getDwmc(),
        		DateUtil.parseToString(data.get(i).getJgsj(), "yyyy-MM-dd HH:mm:ss"),
        		data.get(i).getTx1()
        	};
        	textDatas[i] = texts;
        }
		return textDatas;
	}
}
