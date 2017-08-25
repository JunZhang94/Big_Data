package com.jp.tic.business.cartake.mapper;

import java.util.List;
import java.util.Map;

import com.jp.tic.framework.mybatis.BaseSqlMapper;

/**
 * <b>function:</b> 查询、分析、统计车辆信息
 * @author hoojo
 * @createDate 2014-8-13 下午05:26:13
 * @file CarQueryAnalyzeStatMapper.java
 * @package com.jp.tic.business.cartake.mapper
 * @project iVMS_Business
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
public interface CarQueryAnalyzeStatMapper<E extends Map<String, Object>> extends BaseSqlMapper<E> {

	/**
	 * <b>function:</b> 查询套牌车分析结果
	 * @author hoojo
	 * @createDate 2014-8-14 上午11:41:55
	 * @return
	 * @throws Exception
	 */
	public List<E> queryAnalyzeFakePlate(E param) throws Exception;
	public List<E> queryAnalyzeFakePlates(E param) throws Exception;
	public List<E> queryAnalyzeFakeiLocalCar(E param) throws Exception;
	public Integer queryAnalyzeTaopaiche(E param) throws Exception;
	public Integer queryAnalyzeTaopaiLocalCar(E param) throws Exception;
	public List<E> queryAnalyzeTaopaichess(E param) throws Exception;
	public List<E> queryAnalyzeTaopaicheLocal(E param) throws Exception;
	
	/**
	 * <b>function:</b> 过车频度统计、识别率统计
	 * @author hoojo
	 * @createDate 2014-8-14 下午04:27:39
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public List<E> queryAnalyzeCarPlateRate(E param) throws Exception;
	public List<E> queryAnalyzeCarPlateRates(E param) throws Exception;
	public List<E> huijutongjis(E param) throws Exception;
	public List<E> queryAnalchepaishibielv(E param) throws Exception;
	public Integer queryAnalyzeCarcpcxl(E param) throws Exception;
	public Integer huijutongjiss(E param) throws Exception;
	public Integer queryAnalyzecheliuliang(E param) throws Exception;
	public List<E> areaStatisticsGrouppingInfo(E param) throws Exception;
	public List<E> deptStatisticsGrouppingInfo(E param) throws Exception;
	public List<E> queryAnalyzecheliuliangs(E param) throws Exception;
	public List<E> queryAnalyzeCarPlateRatess(E param) throws Exception;
	
	/**
	 * <b>function:</b>获取过车查询中的信息ID和图像1、图像2等的地址
	 * @author jzxie
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public List<Map<String,String>> getPictureURLInCarQuery(Map<String,String> param)throws Exception;
}
