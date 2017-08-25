package com.jp.tic.system.service;

import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import jxl.write.WritableSheet;

import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.entity.EnumItem;
import com.jp.tic.utils.exception.ExportFailedException;

@SuppressWarnings("unchecked")
public interface BusinessExportService {

	public void process(WritableSheet sheet,List data, String[] texts, int[] widths, Object[] dataSource) throws Exception;
	
	/**
     * 输出用户信息成为Excel格式
     * @param drecords
     * @return
     * @throws ExportFailedException
     * @author lsg
     */
    public OutputStream outputToExcel(List<Map<String,String>> records, OutputStream stream, 
    		String[] texts, int[] widths, Object[] dataSource) throws ExportFailedException;
    /**
     * 获取到了对应的字典code对应的集合后，再根据值来获取对应的中文名称
     * @param list code对应的集合
     * @param value 值
     * @return 处理结果
     */
    public String findDictionaryName(List<EnumItem> list, String value);
    
    /**
	 * 封装布控告警导出的数据
	 * @param records 查询记录
	 * @return 处理结果
	 */
	public Object[] exportAlarmDataSource(List<Map<String, String>> records);
	
	 /**
	 * 封装布控导出的数据
	 * @param records 查询记录
	 * @return 处理结果
	 */
	public Object[] exportControlDataSource(List<Map<String, String>> records);
	
	/**
	 * 封装历史查询导出的数据
	 * @param records 查询记录
	 * @return 处理结果
	 */
	public Object[] exportHistoryDataSource(List<Map<String, String>> records);
	
	/**
	 * 封装字典导出的数据
	 * @param records 查询记录
	 * @return 处理结果
	 */
	public Object[] exportDictionaryDataSource(List<Map<String, String>> records);
	
	/**
	 * 封装数据质量导出的数据
	 * @param records 查询记录
	 * @return 处理结果
	 */
	public Object[] exportDataQualitySource(List<Map<String, String>> records);
	
	/**
	 * 封装过车频度导出的数据
	 * @param records 查询记录
	 * @return 处理结果
	 */
	public Object[] exportAnalyzeDataSource(List<Map<String, String>> records);
	
	/**
	 * 封装汇聚统计按卡口导出的数据
	 * @param records 查询记录
	 * @return 处理结果
	 */
	public Object[] exportStatisticsDataSource(List<Map<String, String>> records);
	
	/**
	 * 封装汇聚统计按部门导出的数据
	 * @param records 查询记录
	 * @return 处理结果
	 */
	public Object[] exportDeptStatisticsDataSource(List<Map<String, String>> records);
	/**
	 * 封装布控告警导出的数据
	 * @param records 查询记录
	 * @return 处理结果
	 */
	public Object[] exportAnalyStopCarSource(List<Map<String, String>> records);

	/**
	 * 类似查询相关同步导出
	 * @param data
	 * @return
	 */
	public Object[] exportQueryDataSource(List<CarTake> data);
	
}
